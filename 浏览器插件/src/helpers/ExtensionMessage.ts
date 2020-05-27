import Tab = chrome.tabs.Tab;

export enum ExtensionMessageAction {
    PageLoaded,

    GetCurrentTab,
    StartApplyCouponsProcess,
    StopApplyCouponsProcess,
}


export default class ExtensionMessage<TRequest, TResponse> {
    action: ExtensionMessageAction;
    data: TRequest;

    constructor(props: TRequest) {
        this.data = props;
    }

    async sendToBackend(): Promise<TResponse> {
        return new Promise<TResponse>((resolve) => {
            chrome.runtime.sendMessage(this, resolve);
        });
    }

    async sendToTab(tabId: number): Promise<TResponse> {
        return new Promise<TResponse>((resolve) => {
            chrome.tabs.sendMessage(tabId, this, resolve);
        });
    }
}



export class GetCurrentTabMessage extends ExtensionMessage<void, Tab> {
    action: ExtensionMessageAction = ExtensionMessageAction.GetCurrentTab;
}

export class StartApplyCouponsProcessMessage extends ExtensionMessage<void, void> {
    action: ExtensionMessageAction = ExtensionMessageAction.StartApplyCouponsProcess;
}

export class StopApplyCouponsProcessMessage extends ExtensionMessage<void, void> {
    action: ExtensionMessageAction = ExtensionMessageAction.StopApplyCouponsProcess;
}
