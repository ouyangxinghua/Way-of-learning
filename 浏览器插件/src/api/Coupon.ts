export default class Coupon {
    id: string;
    code: string;
    isPrivate: boolean;

    constructor(id: string, code: string, isPrivate: boolean) {
        this.id = id;
        this.code = code;
        this.isPrivate = isPrivate;
    }
}
