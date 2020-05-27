import Logger from "./helpers/Logger";
import ExtensionMessage, {
	ExtensionMessageAction
} from "./helpers/ExtensionMessage";
import configureStore from "./redux-store/configureStore";
import {RootState} from "./redux-store/reducers";
import {ApiWrapper} from "./api/ApiWrapper";
import {AppPhase} from "./redux-store/AppTypes";
import {addTab, removeTab, setPhase, setTabCouponsAmount} from "./redux-store/AppActions";
import Tab = chrome.tabs.Tab;
import {Store as ReduxStore, wrapStore} from "webext-redux";
import Store from "./api/Store";
import Helpers from "./helpers/Helpers";
import Settings, {AppMode} from "./helpers/Settings";
import Affiliate from "./helpers/Affiliate";
import {CouponApplier} from "./coupon-applying/CouponApplier";
import {IDictionary} from "./helpers/IDictionary";
import "./helpers/chrome-extension-async/chrome-extension-async"
import moment from "moment";

export default class BackgroundController {

	reduxStore: ReduxStore<RootState>;

	supportedStores: Store[] = [];
	hostsToStoresMap: IDictionary<Store> = new IDictionary<Store>();

	couponAppliers: CouponApplier[] = [];

    constructor () {
        this.init();
    }

    init() {
        Logger.log(`app started\nMode: "${process.env.mode}" (${Settings.BASE_API_URI})\nScripts: "${process.env.script}" (${Settings.BASE_SCRIPT_URI})`);

		this.setAlarms();
		this.setOnIconClickAction();
		this.initMessages();
		this.initReduxStore();

		// dispose CouponAppliers for closed tabs
		chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
			if (this.couponAppliers[tabId]) {
				await this.couponAppliers[tabId].dispose();
				delete this.couponAppliers[tabId];
			}
		});
		chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
			if (!!changeInfo.url && !!this.couponAppliers[tabId]) {
				let supportedStore = this.hostsToStoresMap[new URL(tab.url).hostname];
				if (!supportedStore || this.couponAppliers[tabId].storeId !== supportedStore.id) {
					await this.couponAppliers[tabId].dispose();
					this.setTabIconState(false, tabId);
					delete this.couponAppliers[tabId];
				}
			}
		});
		chrome.browserAction.setBadgeBackgroundColor({
			color: "#7dc98c"
		});
    }

	setAlarms() {
    	Logger.log(`stores list updating each ${Settings.SUPPORTED_STORES_UPDATE_TIME} min.`);
		setInterval(() => {
			this.loadStoresFromAPI();
		}, Settings.SUPPORTED_STORES_UPDATE_TIME * 60 * 1000);
		this.loadStoresFromAPI();
	}

	async loadStoresFromAPI() {
		Logger.log(`loading supported stores...`);
		let getStoresListRequest = await ApiWrapper.stores.getList();
		if (getStoresListRequest instanceof Error) {
			return Logger.error(getStoresListRequest);
		}
		if (getStoresListRequest.errno > 0) {
			return Logger.error(getStoresListRequest.errmsg);
		}
		Logger.log(`supported stores loaded: ${getStoresListRequest.data.length}.`);
		this.supportedStores = getStoresListRequest.data;

		await this.updateHostsToStoresMap();
	}

	/**
	 * Updating event handlers for update store connectors list
	 */
	async updateHostsToStoresMap() {
		let newHostsToStoresMap: IDictionary<Store> = new IDictionary<Store>();
		for (let supportedStore of this.supportedStores) {
			for (let i = 0; i < supportedStore.domains.length; i++) {
				let host = supportedStore.domains[i];
				try {
					host = host.toLowerCase().trim();
					if (!Helpers.isValidDomain(host)) {
						Logger.warning(`BackgroundController.updateSupportedStoresListeners()\n - store "${supportedStore.name}#${supportedStore.id}"\n - invalid host "${host}"\n - example: "www.test.com"`);
						throw Error(null);
					}
					let permissionGranted = await chromep.permissions.contains({
						origins: [ `*://${host}/` ]
					});
					if (!permissionGranted) {
						Logger.warning(`BackgroundController.updateSupportedStoresListeners()\n - store "${supportedStore.name}#${supportedStore.id}"\n - no extension permission for host "${host}"`);
						throw Error(null);
					}
					if (!!newHostsToStoresMap[host]) {
						Logger.warning(`BackgroundController.updateSupportedStoresListeners()\n - store "${supportedStore.name}#${supportedStore.id}"\n - repeated host "${host}":\n   - binded  to store "${newHostsToStoresMap[host].name}#${newHostsToStoresMap[host].id}"\n   - binding to store "${supportedStore.name}#${supportedStore.id}"`);
						throw Error(null);
					}
					newHostsToStoresMap[host] = supportedStore;
				} catch (e) {
					supportedStore.domains.splice(i--, 1);
					if (e.message !== "null") {
						Logger.warning(`BackgroundController.updateSupportedStoresListeners()\n - store "${supportedStore.name}#${supportedStore.id}"\n - uncaught error when adding host "${host}"`, e);
					}
				}
			}
		}
		this.hostsToStoresMap = newHostsToStoresMap;
	}

	async onPageLoaded(tab: Tab) {
		if (Affiliate.processIfAffiliateTab(tab.id)) {
			return;
		}
		let supportedStore = this.hostsToStoresMap[new URL(tab.url).hostname];
		if (!supportedStore) {
			return;
		}
		try {
			let result = await this.updateStoreMetadataAndCoupons(supportedStore);
			if (!result) throw Error(" -> this.updateStoreMetadataAndCoupons() failed");
			result = await this.prepareReduxStore(tab.id, supportedStore);
			if (!result) throw Error(" -> this.prepareReduxStore() failed");
			result = await this.prepareCouponApplier(tab.id, supportedStore);
			if (!result) throw Error(" -> this.prepareCouponApplier() failed");
		} catch (e) {
			Logger.error("BackgroundController.updateSupportedStoresListeners()\n -> this.onTabLoaded()\n", e);
		}
	}

	async setTabIconState(state: boolean, tabId: number, store?: Store) {
		let iconState = state
			? "active"
			: "inactive";
		await Promise.all([
			chrome.browserAction.setIcon({
				tabId: tabId,
				path: {
					"16":  `assets/icons/${iconState}/16.png`,
					"32":  `assets/icons/${iconState}/32.png`,
					"48":  `assets/icons/${iconState}/48.png`,
					"64":  `assets/icons/${iconState}/64.png`,
					"128": `assets/icons/${iconState}/128.png`
				}
			}),
			chrome.browserAction.setTitle({
				tabId: tabId,
				title: state
					? store.coupons.length > 0
						? `${chrome.runtime.getManifest().name}: ${store.coupons.length.toString()} coupons for ${store.name}!`
						: `${chrome.runtime.getManifest().name}: ${store.name} doesn't have available coupons.`
					: chrome.runtime.getManifest().browser_action.default_title
			}),
			chrome.browserAction.setBadgeText({
				tabId: tabId,
				text: state
					? store.coupons.length.toString()
					: ""
			})
		]);
	}

	/**
	 * Update store metadata and coupons if needed
	 */
	async updateStoreMetadataAndCoupons(store: Store) {
		if (moment(store.lastTimeUpdatedFromServer).add(Settings.STORE_METADATA_AND_COUPONS_UPDATE_TIME, "minutes").valueOf() < Date.now()) {
			if (!store.lastTimeUpdatedFromServer) {
				Logger.log(`"${store.name}" store metadata and coupons empty, loading...`);
			} else {
				Logger.log(`"${store.name}" store metadata and coupons loaded more than ${Settings.STORE_METADATA_AND_COUPONS_UPDATE_TIME} min ago, updating...`);
			}
			let getStoreRequest = await ApiWrapper.stores.getStore(store.id);
			if (getStoreRequest instanceof Error) {
				Logger.error(getStoreRequest);
				return false;
			}
			if (getStoreRequest.errno > 0) {
				Logger.error(getStoreRequest.errmsg);
				return false;
			}
			store.metadata = getStoreRequest.data.metadata;
			store.coupons = getStoreRequest.data.coupons;
			store.localScript = getStoreRequest.data.localScript;
			store.lastTimeUpdatedFromServer = Date.now();
			Logger.log(`metadata and coupons updated.`);
		}
		return true;
	}

	/**
	 * Add tab state or find existing and check if storeId was changed
	 */
	prepareReduxStore(tabId: number, store: Store) {
		let tabState = this.getTabState(tabId);
		if (!tabState) {
			this.reduxStore.dispatch(addTab(tabId, store.id, store.name));
		} else {
			if (tabState.storeId !== store.id) {
				this.reduxStore.dispatch(removeTab(tabId));
				this.reduxStore.dispatch(addTab(tabId, store.id, store.name));
			}
		}
		this.reduxStore.dispatch(setTabCouponsAmount(tabId, store.coupons.length));
		return true;
	}

	/**
	 * Add tab state or find existing and check if storeId was changed
	 */
	async prepareCouponApplier(tabId: number, store: Store) {
		if (!!this.couponAppliers[tabId] && this.couponAppliers[tabId].storeId !== store.id) {
			await this.couponAppliers[tabId].dispose();
			delete this.couponAppliers[tabId];
		}
		if (!!this.couponAppliers[tabId]?.isDisposed) {
			delete this.couponAppliers[tabId];
		}
		if (!this.couponAppliers[tabId]) {
			this.couponAppliers[tabId] = new CouponApplier(tabId, store.id, this.reduxStore, store, this);
			Logger.log(`CouponApplier[${tabId}] init as "${store.name}"`);
		}
		this.setTabIconState(true, tabId, store);
		this.couponAppliers[tabId].onTabLoaded();
		return true;
	}

	/**
	 * Set handler for browser icon click
	 */
    setOnIconClickAction() {
		chrome.browserAction.onClicked.addListener((tab) => {
			if (this.getTabState(tab.id)?.phase === AppPhase.INACTIVE) {
				this.reduxStore.dispatch(setPhase(tab.id, AppPhase.SIDEBAR_SHOWN));
			}
		});
	}

	/**
	 * Init messages listener
	 */
	initMessages() {
		chrome.runtime.onMessage.addListener(async (message: ExtensionMessage<any, any>, sender, sendResponse) => {
			switch (message.action) {
				case ExtensionMessageAction.PageLoaded:
					if (sender.tab?.url) {
						this.onPageLoaded(sender.tab);
					}
					break;
				case ExtensionMessageAction.GetCurrentTab:
					sendResponse(sender.tab);
					break;
				case ExtensionMessageAction.StartApplyCouponsProcess:
					this.couponAppliers[sender.tab.id].startApplyingProcess();
					sendResponse(null);
					break;
				case ExtensionMessageAction.StopApplyCouponsProcess:
					await this.couponAppliers[sender.tab.id].stopApplyingProcess();
					sendResponse(null);
					break;
			}
			return false;
		});
	}

	initReduxStore() {
		// @ts-ignore
		this.reduxStore = configureStore();
		wrapStore(this.reduxStore, {
			portName: Settings.REDUX_PORT_NAME
		});
	}

	get reduxState() {
		return this.reduxStore.getState();
	}

	getTabState(tabId: number) {
		return this.reduxStore.getState().tabs[tabId];
	}
}

(window as any).controler = new BackgroundController();
