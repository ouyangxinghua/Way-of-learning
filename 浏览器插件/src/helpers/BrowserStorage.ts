export class BrowserStorage {

    static load<T>(name: string): Promise<T>{
        return new Promise<T>(async (resolve, reject) => {
            chrome.storage.local.get(name, (data: any) => {
                resolve(data[name]);
            });
        });
    }

    static observe<T>(name: string, callback: (changes: T) => void): any {
        chrome.storage.onChanged.addListener((changes: any, areaName: string) => {
            if (areaName === "local" && !!changes[name]) {
                callback(changes[name].newValue);
            }
        });
    }

    static save(name: string, data: any) {
        return new Promise(async (resolve) => {
            let tempObj: any = {};
            if (name === null) {
                tempObj = [...data];
            } else {
                tempObj[name] = data;
            }
            chrome.storage.local.set(tempObj, () => {
                resolve(tempObj);
            });
        });
    }
}
