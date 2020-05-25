const PORT = chrome.extension.connect({
  name: "trackPopup"
});

const ACTION = "GET_COUPONS"; 


chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  var currentTab = tabs[0];
  console.log(currentTab);
  PORT.postMessage({
    ACTION,
    // SITE,
    tabId: currentTab.id
  });
});

PORT.onMessage.addListener(msg => {
  const { type, data } = msg;
  
  
  // alert(COUPON_TYPE.EXCLUSIVE);

  if (type == "FOUND_COUPONS") {
    const count = data.length;
    const popup_coupons = document.getElementById("popup_coupons");

    var newNode = document.createElement("div");
    newNode.className = "some-class";

    if (data.length) {
      
      newNode.innerHTML = `<button class="button" id="apply_popup_coupon">Apply ${count} Coupons</button>`;
      popup_coupons.append(newNode);
      data.forEach(item => {
        var tempNode = document.createElement("div");
        tempNode.className = "card";
        /*  tempNode.innerHTML = `<div class="code">${item.code.replace(
          item.code.slice(-2),
          "**"
        )}</div>`; */
        tempNode.innerHTML = `<div class="code">${item.type == COUPON_TYPE.EXCLUSIVE? '***** (exclusive coupon code)' : item.code}</div>`;

        popup_coupons.append(tempNode);
      });
    } else {
      newNode.innerHTML = `<H2>Sorry, no coupons found on this site yet.</H2>`;
      popup_coupons.append(newNode);
    }
  }
  if (type == "ERROR") {
    alert("Something went wrong!");
  }
});

$("#apply_popup_coupon").live("click", function() {
  sendMessageToContentScript(
    { cmd: "apply_coupon_from_popup", value: "你好，我是popup！" },
    null
  );
  window.close();
});




function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}
