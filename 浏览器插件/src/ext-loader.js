import $ from "jquery";

const baseUrl = process.env.mode === "development"
    ? "http://47.101.69.249:8370/api/extension"
    : "https://apis.fatcoupon.com/api/extension";

function start() {
    // if we using "local" mode - load only once
    if (process.env.script === "local") {
        return loadLocal();
    }
    // set remote background.js updater
    setInterval(() => {
        fetchBackgroundScript();
    }, 30 * 60 * 1000);
    fetchBackgroundScript(true);
}

async function fetchBackgroundScript(initial = false) {
    if (!await loadRemote() && initial) {
        loadLocal();
    }
}

async function loadLocal() {
    console.warn("Loading local script");
    let script = await (await fetch(chrome.runtime.getURL("js/background.js"))).text();
    eval(script);
}

let lastRemoteScript;
async function loadRemote() {
    return new Promise((resolve) => {
        $.ajax({
            url: baseUrl + "/scripts/background",
            headers: {
                'Content-Type': 'text/plain'
            },
            timeout: 10000,
            cache: false,
            success: (response) => {
                if (response && response.errno) {
                    console.log(response.errmsg);
                    return resolve(false);
                }
                if (lastRemoteScript) {
                    if (lastRemoteScript === response) {
                        // script not updated, do nothing
                        return resolve(true);
                    } else {
                        // script was updated, reloading extension
                        chrome.runtime.reload();
                        return;
                    }
                } else {
                    lastRemoteScript = response;
                    try {
                        eval(lastRemoteScript);
                    } catch (e) {
                        console.warn("eval() failed", e);
                        return resolve(false);
                    }
                }
                return resolve(true);
            },
            error: (jqXHR) => {
                console.warn(jqXHR);
                return resolve(false);
            }
        });
    });
}

start();
