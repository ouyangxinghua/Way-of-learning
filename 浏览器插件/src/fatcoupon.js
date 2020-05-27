chrome.runtime.sendMessage({action:0});
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "fatcoupon") {
        port.onMessage.addListener(onMessage);
    }
});
async function onMessage(message, port) {
    let disconnected = false;
    port.onDisconnect.addListener(() => {
        disconnected = true;
    });
    switch (message.action) {
        case "evalJS":
            try {
                let resolve = (res) => { port.postMessage(res) };
                let codeFunc = eval(`(async () => {
                    ${message.code}
                })`);
                //console.log(codeFunc);
                //debugger;
                await codeFunc();
            } catch(e) {
                // port can be disconnected in case of timeout or other cases
                // if port was closed - not needed to report back
                if (disconnected) return;
                debugger;
                console.warn("*** FATCOUPON WARNING ***\n", e, "\n*** FATCOUPON WARNING ***");
                port.postMessage({
                    error: {
                        message: e.message,
                        name: e.name,
                        stack: e.stack
                    }
                });
            }
            break;
    }
}
