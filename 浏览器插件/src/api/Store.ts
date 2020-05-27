import Coupon from "./Coupon";
import {StoreConnectorMetadata} from "../coupon-applying/StoreConnector";

export default class Store {
    id: string;
    name: string;
    domains: string[];
    localScript: string;

    metadata: StoreConnectorMetadata;
    coupons: Coupon[];

    lastTimeUpdatedFromServer: number = 0;

    constructor(id?: string, name?: string, domains?: string[]) {
        this.id = id;
        this.name = name;
        this.domains = domains;
    }

    match(domain: string) {
        for (let domainMatch of this.domains) {
            if (domain.match(domainMatch)) {
                return true;
            }
        }
        return false;
    }
}
