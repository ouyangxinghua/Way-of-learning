const getCodes = params => {
  return params.map(function(obj) {
    return obj.code;
  });
};

const getIds = params => {
  return params.map(function(obj) {
    return obj.id;
  });
};

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// 向页面注入JS
const injectCustomJs = jsPath => {
  jsPath = jsPath || "../inject/inject.js";
  var temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript"); // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function() {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
};

const getCurrentSite = (currentUrl = "") => {
  const siteNames = Object.keys(AVAILABLE_SITES);
  let Name = FAKE_SITE;
  siteNames.forEach(item => {
    if (currentUrl.includes(item)) {
      Name = item;
    }
  });

  return Name;
};

const getCurrentUrl = () => {
  return window.location && window.location.href;
};

const sleep = m => {
  return new Promise(r => setTimeout(r, m));
};

const ajaxRequest = (url, method, postData) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: method || "POST",
      data: postData || {},
      dataType: "json",
      success: (data, textStatus, jqXHR) => {
        resolve(data);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        reject(errorThrown);
      }
    });
  });
};

const backgroundRequest = (postData = {}) => {
  return new Promise(async (resolve, reject) => {
    //add async here...
    chrome.runtime.sendMessage(postData, function(response) {
      // console.log('content收到来自后台的回复：'+ response);
      resolve(response);
    });
  });
};

const setBadget = bagdet => {
  chrome.browserAction.setBadgeText({ text: bagdet || "" });
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
};

const injectCouponPopup = params => {
  $.get(chrome.extension.getURL("inject/pop.html"), function(data) {
    console.log(data);
    // $(data).appendTo(document.body);
    // Or if you're using jQuery 1.8+:
    $($.parseHTML(data)).appendTo("body");
  });
};

const injectCouponMask = params => {
  $.get(chrome.extension.getURL("inject/mask.html"), function(data) {
    // console.log(data);
    // $(data).appendTo(document.body);
    // Or if you're using jQuery 1.8+:
    $($.parseHTML(data)).appendTo("body");
  });
};

const APPLY_FUNCTIONS = {};

APPLY_FUNCTIONS.applyPumaCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=couponCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(500);

    const applyBtn = "button.promo-code-btn";
    $(applyBtn).removeAttr("disabled");
    $(applyBtn).removeClass("isDisabled");

    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".coupon-promotion-relationship";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".coupon-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("%") !== -1) {
          // const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          // console.log(priceStr);
          // resolve(priceStr[0].replace("$", ""));
          resolve(29.95);
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyPumaCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=couponCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(500);

    const applyBtn = "button.promo-code-btn";
    $(applyBtn).removeAttr("disabled");
    $(applyBtn).removeClass("isDisabled");

    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".coupon-promotion-relationship";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".coupon-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("%") !== -1) {
          // const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          // console.log(priceStr);
          // resolve(priceStr[0].replace("$", ""));
          resolve(29.95);
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.apply1800contactsCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[data-selenium-id='txtCouponCode']";
    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon =
        "a[data-selenium-id='spanLnkHaveOrderCode']";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(500);

    const applyBtn = "button[data-selenium-id='btnApplyCouponCode']";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyBelkShoppingbag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=dwfrm_cart_couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(800);

    const applyBtn = "#add-coupon";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyC21storesCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(800);

    const applyBtn = ".promo-code-btn";
    $(applyBtn).removeAttr("disabled");
    await sleep(100);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyForeoCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=edit-coupon-redemption-code]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#edit-coupon-redemption-apply";
    // $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyKiplingusaCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=dwfrm_cart_couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyCrocsCartShow = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=couponFld]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#addcoup";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".couponAppliedItem  .cost";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponAppliedItem";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyElfcosmeticsShoppingbag = async (coupon, i) => {
  return await APPLY_FUNCTIONS.applyElfcosmeticsCart(coupon, i);
};

APPLY_FUNCTIONS.applyElfcosmeticsCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=dwfrm_cart_couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey =
        ".orders-summary-___discounts_and_surcharges__itemLevelPromos___1mYdS";
      const discountPriceEle = $(discountPriceKey);
      const currentPromoKey =
        ".orders-summary-___discounts_and_surcharges__itemLevelPromos___1mYdS";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("Promo") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyAmericanapparelCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[name=couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn =
      ".orders-promo_code-___promo_code_form__apply_button___3RyqC";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey =
        ".orders-summary-___discounts_and_surcharges__itemLevelPromos___1mYdS";
      const discountPriceEle = $(discountPriceKey);
      const currentPromoKey =
        ".orders-summary-___discounts_and_surcharges__itemLevelPromos___1mYdS";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("Promo") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyAcerCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[name=coupon_code]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#discount-coupon-form  button.action";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".r-payment-page__max-discount-container";
      const discountPriceEle = $(discountPriceKey);
      const currentPromoKey = ".r-payment-page__max-discount-container";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("applied") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyRakutenBuy = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[name=coupon_code_no_text]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".r-button.apply-btn";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".r-payment-page__max-discount-container";
      const discountPriceEle = $(discountPriceKey);
      const currentPromoKey = ".r-payment-page__max-discount-container";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("applied") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyHunterbootsCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[name=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".promo-code-form  button";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".order-summary  .order-summary__item";
      const discountPriceEle = $(discountPriceKey).eq(2);

      const currentPromoKey = ".order-summary  .order-summary__item";
      const currentPromoKeyEle = $(currentPromoKey).eq(2);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("-$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyKeenfootwearCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=dwfrm_cart_couponCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);

      const currentPromoKey = ".OrderSummary-voucher";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("Coupon") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyShoebaccaCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=coupon_code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".apply.action";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);

      const currentPromoKey = ".OrderSummary-voucher";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("Coupon") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyEastbayCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=input_text_voucherId]";
    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".c-checkout-promo-code .Link";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".c-checkout-promo-code .Button";
    $(applyBtn)
      .eq(2)
      .removeAttr("disabled");
    await sleep(10);
    $(applyBtn)
      .eq(2)
      .simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);

      const currentPromoKey = ".OrderSummary-voucher";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("Coupon") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyHotelsBookingInitialise = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=coupon-code-field]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#coupon-code-apply-btn";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".description-value-row.discount";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".description-value-row.discount";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Coupon") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyUggCOShipping = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=spc-coupon-code]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "#addCouponBtn";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".spc-coupon__form .button";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".cart-promos-list";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".cart-promos-list";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyTjxCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=promo-code]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "#addCouponBtn";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#accept-promotion";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".cart-promos-list";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".cart-promos-list";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyReiPayment = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=couponCodeInput]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "#addCouponBtn";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button.apply-coupon";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#orderSummaryContainer .summary-promo";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = "#orderSummaryContainer .summary-promo";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyRaybanShopCartDisplayView = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=D_CartPage_PromoCode_Input]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#D_CartPage_PromoCode_Apply";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#orderSummaryContainer .summary-promo";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = "#orderSummaryContainer .summary-promo";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applySneakersnstuffCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=checkoutcode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".checkout-code-form-button";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#orderSummaryContainer .summary-promo";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = "#orderSummaryContainer .summary-promo";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyJcrewShoppingbag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=promotionCode1]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#promoApply";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = "#orderSummaryContainer .summary-promo";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = "#orderSummaryContainer .summary-promo";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyTopshopPayment = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=promotionCode-text]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".PromotionCode-submit";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".applied.active";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".applied.active";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        resolve(25.99);
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyBebeCheckouts = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=checkout_reduction_code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[data-trekkie-id=apply_discount_button]";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".total-line--reduction ";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".total-line--reduction .reduction-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyJuicycoutureCheckouts = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=checkout_reduction_code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[data-trekkie-id=apply_discount_button]";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".total-line--reduction ";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".total-line--reduction .reduction-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyZippoCheckouts = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=checkout_reduction_code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[data-trekkie-id=apply_discount_button]";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".total-line--reduction ";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".total-line--reduction .reduction-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyLoftCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "input[aria-labelledby=promo-submit]";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".applied.active";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".applied.active";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        resolve(25.99);
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyGuessShoppingBag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[id=PromotionalCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#promotionForm .btn-cta-secondary";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".applied-promo-code";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".applied-promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyGapShopping_bag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[ng-model=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".apply-button";
    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".applied-promo-code";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".applied-promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyFossilShoppingbag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#discount_code_applied";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#applyDiscountCode";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-summary-item.promo-code";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".order-summary-item.promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        console.log(currentPromoKeyText);
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyFamousfootwearCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#PromoCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#submitPromoCode";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-summary-items-containers  .summary-item";
      const discountPriceEle = $(discountPriceKey).eq(1);

      const currentPromoKey = ".order-summary-items-containers  .summary-item";
      const currentPromoKeyEle = $(currentPromoKey).eq(1);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Applied") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyJimmyjazzCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#promotion_code";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".promotion_submit";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".promo-applied";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".promo-applied";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Discount") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyHibbettCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".OrderSummary-body .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const currentPromoKey = ".OrderSummary-body .OrderSummary-list";
      const currentPromoKeyEle = $(currentPromoKey).eq(2);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Coupon") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyDickssportinggoodsDSGPaymentViewCmd = async (
  coupon,
  i
) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#promoCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#WC_PromotionCodeDisplay_links_1";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".OrderSummary-body .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const currentPromoKey = ".OrderSummary-body .OrderSummary-list";
      const currentPromoKeyEle = $(currentPromoKey).eq(2);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Coupon") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyCartersCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".OrderSummary-body .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const currentPromoKey = ".OrderSummary-body .OrderSummary-list";
      const currentPromoKeyEle = $(currentPromoKey).eq(2);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Coupon") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyChampssportsCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#input_text_voucherId";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".c-checkout-promo-code .Link";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#PromoCode button";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".OrderSummary-body .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const currentPromoKey = ".OrderSummary-body .OrderSummary-list";
      const currentPromoKeyEle = $(currentPromoKey).eq(2);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (
          currentPromoKeyText.indexOf("$") !== -1 &&
          currentPromoKeyText.indexOf("Coupon") !== -1
        ) {
          const priceDollar = discountPriceEle.text();
          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyVitacostCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#IamMasterFrameYesIam_ctl02_txtPromotion";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#IamMasterFrameYesIam_ctl02_btnPromoUpdate";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#saved-amount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = "#saved-amount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyPatagoniaCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = ".jsNewCartPromoInput";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".new-cart-summary-promo-code-entry-submit";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#saved-amount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = "#saved-amount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyBackcountryCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#promo-code";
    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "#coupon-redemption-link";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#redeem-code";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = "#saved-amount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = "#saved-amount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("$") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyLoccitaneCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#coupon-input-desktop";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).val("");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon-desktop";
    $(applyBtn).attr("aria-disabled", "false");
    await sleep(100);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".cart-totals-right.discount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".cart-totals-right.discount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyLeviCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#js-voucher-code-text";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).val("");
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#js-voucher-apply-btn";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".cart-totals-right.discount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".cart-totals-right.discount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyToryburchCartShow = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "input[name=dwfrm_cart_couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).val("");
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[name=dwfrm_cart_addCoupon]";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".order-discount-total";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".coupon-code-container";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyKennethcoleCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".promo-code-btn";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-discount-total";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".coupon-code-container";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyTillysCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".discount.value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".discount.value";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyKatespadeShoppingbag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".discount.value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".discount.value";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyHmCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#txt-discount-code";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#btn-discount-code";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".price-calculator-cart-summary-couponSaved";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".price-calculator-cart-summary-couponSaved";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyLenovoCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#cart-summary-ecouponForm-button";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".price-calculator-cart-summary-couponSaved";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".price-calculator-cart-summary-couponSaved";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyDrmartensCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#js-voucher-code-text";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#js-voucher-apply-btn";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".cart-totals-right.discount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".cart-totals-right.discount";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyKiehlsCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".discount.value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".discount.value";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyEsteelauderCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#form--offer_code--field--OFFER_CODE";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "input[data-test-id=form_offer_code_apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".discount.value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".discount.value";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyBobbibrowncosmeticsCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#form--offer_code--field--OFFER_CODE";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "input[data-test-id=form_offer_code_apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".discount.value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".discount.value";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);
      if (currentPromoKeyEle.length) {
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyConverseShopcart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const inputPromo = "#dwfrm_cart_couponCode";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".applied-discounts  li  .applied-amount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".applied-discounts  li";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf(coupon) !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyKohlsCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyKohlsCheckout", coupon);
    const inputPromo = "#promo-kcInput";
    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".kohlscashapply";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(800);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#applyInputButton";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".applied-discounts  li  .applied-amount";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".applied-discounts  li";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf(coupon) !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyPacsunCartShow = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyPacsunCartshow", coupon);

    const inputPromo = "#dwfrm_cart_couponCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".promo-applied-discount.promo-code-value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".summary-section.promotion-applied";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("Promo Code Applied") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyAbercrombieOrderItemDisplayView = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyAbercrombieOrderItemDisplayView", coupon);

    const inputPromo = ".promos-content input";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".promos-content button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO
      const discountPriceKey = ".promo-applied-discount.promo-code-value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".summary-section.promotion-applied";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("Promo Code Applied") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyBloomingdalesMybag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyBloomingdalesMybag", coupon);

    const inputPromo = "input[id=promo-apply-input]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[id=promo-apply-button]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".promo-applied-discount.promo-code-value";
      const discountPriceEle = $(discountPriceKey).eq(0);

      const currentPromoKey = ".summary-section.promotion-applied";
      const currentPromoKeyEle = $(currentPromoKey).eq(0);

      if (currentPromoKeyEle.length) {
        const currentPromoKeyText = currentPromoKeyEle.text();
        if (currentPromoKeyText.indexOf("Promo Code Applied") !== -1) {
          const priceDollar = discountPriceEle.text();

          if (priceDollar.indexOf("$") !== -1) {
            const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
            console.log(priceStr);
            resolve(priceStr[0].replace("$", ""));
          } else {
            resolve(0);
          }
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyBathandbodyworksCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyBathandbodyworksCart", coupon);

    const inputPromo = "input[id=dwfrm_cart_couponCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[name=dwfrm_cart_addCoupon]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find coupon
      const discountPriceKey = ".Coupons_details";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".Coupons_details";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        resolve(20);
        /*   if (priceDollar.indexOf("$") !== -1) {
            
            const discountPriceArray = priceDollar.split('$');
            // console.log("discountPrice", discountPrice);
            if(discountPriceArray.length) {
            resolve(discountPriceArray[1]);
           }else{
             resolve (0);
           }
  
          } */
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyUltaBag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyUltaBag", coupon);

    const inputPromo = "input[id=couponID]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".Coupons__formInputField .Button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".Coupons_details";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".Coupons_details";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        resolve(20);
        /*   if (priceDollar.indexOf("$") !== -1) {
            
            const discountPriceArray = priceDollar.split('$');
            // console.log("discountPrice", discountPrice);
            if(discountPriceArray.length) {
            resolve(discountPriceArray[1]);
           }else{
             resolve (0);
           }
  
          } */
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applySephoraBasket = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applySephoraBasket", coupon);

    const inputPromo = "input[id=promoInput]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }
    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[data-at=apply_btn]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find coupon
      const discountPriceKey = ".youSaved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".currentPromoCode";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applySunglasshutAjaxOrderItemDisplayView = async (
  coupon,
  i
) => {
  return new Promise(async (resolve, reject) => {
    console.log(
      "输入哭胖开始 applySunglasshutAjaxOrderItemDisplayView",
      coupon
    );

    const inputPromo = "input[name=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "a[data-element-id=D_CartPage_PromoCode_Apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".youSaved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".currentPromoCode";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyTargetCocart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyTargetCocart", coupon);

    const inputPromo = "input[name=promoCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[data-test=apply-promo-code-button]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = "div[data-test=cart-summary-discounts]";
      const discountPriceEle = $(discountPriceKey);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNeimanmarcusCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyNeimanmarcusCheckout", coupon);

    const inputPromo = "input[id=i-promo]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#btn-promo_msk";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyColumbiaCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyColumbiaCart", coupon);
    const inputPromo = "input[name=csc-coupon-code]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[id=csc-btn-apply-coupon-code]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyThenorthfaceOrderItemDisplay = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyThenorthfaceOrderItemDisplay", coupon);
    const inputPromo = "input[name=promoCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[name=apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyCliniqueViewcart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyCliniqueViewcart", coupon);
    const inputPromo = "input[id=form--offer_code--field--OFFER_CODE]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "input[data-test-id=form_offer_code_apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyBestbuyCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyBestbuyCheckout", coupon);

    const inputPromo = "input[id='payment.promotionCode']";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const discountPriceKey = "gift-promo-code-link";
      const openInputPromoBoxIcon = $(`a[data-track='${discountPriceKey}']`);

      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".gift-promo-cards__apply-btn";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyEbayRxo = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyEbayRxo", coupon);

    const inputPromo = "input[name=redemptionCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".incentives--input-form-content  button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyAmazonBuy = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyAmazonBuy", coupon);

    const inputPromo = "input[name=claimCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#gcApplyButtonId";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyUrbanoutfittersCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyUrbanoutfittersCheckout", coupon);

    const inputPromo = "input[name=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".c-cart-add-promo__button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO find right code...
      const discountPriceKey = ".OrderSummary-body  .OrderSummary-list";
      const discountPriceEle = $(discountPriceKey).eq(2);
      const priceDollar = discountPriceEle.text();
      console.log(priceDollar);

      if (
        priceDollar.indexOf("$") !== -1 &&
        priceDollar.indexOf("Discounts") !== -1
      ) {
        const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
        console.log(priceStr);
        resolve(priceStr[0].replace("$", ""));
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyFootlockerCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyFootlockerCart", coupon);

    const inputPromo = "input[name=voucherId]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".c-checkout-promo-code  .Link";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(10);
    }

    $(inputPromo).focus();
    await sleep(10);
    $(inputPromo).sendkeys(coupon);
    await sleep(600);

    const applyBtn = ".c-checkout-promo-code  .Button";

    $(applyBtn).simulateClick();
    await sleep(4000);

    resolve(window.localStorage.getItem("applyFootlockerCart"));
  });
};

APPLY_FUNCTIONS.applyFinishlineCart = async (coupon, i) => {
  return APPLY_FUNCTIONS.applyFinishlineCheckout(coupon, i);
};

APPLY_FUNCTIONS.applyFinishlineCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyFinishlineCheckout", coupon);
    const inputPromo = "input.couponCodeInput";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(10);
    }

    $(inputPromo).focus();
    await sleep(10);
    $(inputPromo).sendkeys(coupon);
    await sleep(500);
    const applyBtn = "a.applyCouponCode";
    $(applyBtn).simulateClick();
    await sleep(1000);
   console.log('window.localStorage.getItem("applyFinishlineCheckout")', window.localStorage.getItem("applyFinishlineCheckout"));
    resolve(window.localStorage.getItem("applyFinishlineCheckout"));

    // setTimeout(params => {
    //   const discountPriceKey = "#checkoutOrderSummary .row";
    //   const discountPriceEle = $(discountPriceKey).eq(2);

    //   const currentPromoKey = "#checkoutOrderSummary .row";
    //   const currentPromoKeyEle = $(currentPromoKey).eq(2);

    //   if (
    //     currentPromoKeyEle.length &&
    //     currentPromoKeyEle.text().indexOf("coupon") !== "-1"
    //   ) {
    //     console.log("find discount length=" + discountPriceEle.length);
    //     const priceDollar = discountPriceEle.text();
    //     console.log(priceDollar);
    //     if (priceDollar.indexOf("$") !== -1) {
    //       const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
    //       const price = priceStr[0].replace("$", "");
    //       if(price > 0.0){
    //         resolve(price);
    //       }else{
    //         resolve(0);
    //       }

    //     }
    //   } else {
    //     resolve(0);
    //   }
    // }, 2345);
  });
};

APPLY_FUNCTIONS.applyMichaelkorsCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyMichaelkorsCheckout", coupon);
    const inputPromo = "input[name=couponCode]";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);
    const applyBtn = "input[id=claimCode]";
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO does not find code..
      const discountPriceKey = ".hbc-price-display__line-item--total-saved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".hbc-promo-code-display__promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyCoachColor = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyCoachColor", coupon);

    const inputPromo = "input[name=dwfrm_cart_couponCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[name=dwfrm_cart_addCoupon]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO does not find code..
      const discountPriceKey = ".hbc-price-display__line-item--total-saved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".hbc-promo-code-display__promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNordstromrackCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyNordstromrackCheckout", coupon);

    const inputPromo = "input[name=code]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".checkout-page__sub-container  button.cta-button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO does not find code..
      const discountPriceKey = ".hbc-price-display__line-item--total-saved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".hbc-promo-code-display__promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNordstromCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyNordstromCheckout", coupon);

    const inputPromo = "input[name=promotionCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "._3Pnxq";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button._2BW77";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //TODO does not find code..
      const discountPriceKey = ".hbc-price-display__line-item--total-saved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".hbc-promo-code-display__promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applySaksoff5thCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applySaksoff5thCheckout", coupon);

    const inputPromo = "input[name=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".hbc-promo-code__submit-btn";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".hbc-price-display__line-item--total-saved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".hbc-promo-code-display__promo-code";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
APPLY_FUNCTIONS.applyShoesCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyShoesCart", coupon);

    const inputPromo = "input[id=crt-promoCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".crt-apply-new-promo";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".crt-submit-promo";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey =
        ".crt-summary-tbl  .crt-summary-val.crt-summary-val--dis";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".crt-summary-tbl .crt-promo-code-summary";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyUnderarmourCheckout = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyUnderarmourCheckout", coupon);

    const inputPromo = "input[name=promotionCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = "button.co-link-button";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).focus();
    await sleep(100);
    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = ".co-apply-button";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".co-summary-totals .co-summary-promo";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey =
        ".co-summary-totals .co-summary-promo .co-summary-discounts-value";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }

        if (priceDollar.indexOf("—") !== -1) {
          resolve(7.95); //free shipping
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyAsosSecure = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyAsosSecure", coupon);

    const inputPromo = "input[id=discountCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      const openInputPromoBoxIcon = ".expandable-heading-container";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button.apply-code";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".bag-totals .discount .l-rtc";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".bag-totals .discount .l-rtc";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyCalvinkleinAjaxOrderItemDisplayView = async (
  coupon,
  i
) => {
  return new Promise(async (resolve, reject) => {
    console.log(
      "输入哭胖开始 applyCalvinkleinAjaxOrderItemDisplayView",
      coupon
    );

    const inputPromo = "input[name=promoCode]";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#WC_PromotionCodeDisplay_links_1";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".youSaved";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".currentPromoCode";
      const currentPromoKeyEle = $(currentPromoKey);

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyAeCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyAeCart", coupon);

    const inputPromo = "input[name=discountCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      //打开按钮
      const openInputPromoBoxIcon = "button[name=show-form]";
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "button[name=apply]";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-subtotal-discounts-value";
      const discountPriceEle = $(discountPriceKey);

      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (
          priceDollar.indexOf("$") !== -1 &&
          priceDollar.indexOf("-") !== -1
        ) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyGncCartSubmitForm = async (coupon, i) => {
  return APPLY_FUNCTIONS.applyGncCart(coupon, i);
};

APPLY_FUNCTIONS.applyGncCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyGncCart", coupon);

    const inputPromo = "#dwfrm_cart_couponCode";

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#add-coupon";

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-discount discount";
      const discountPriceEle = $(discountPriceKey);

      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (
          priceDollar.indexOf("$") !== -1 &&
          priceDollar.indexOf("-") !== -1
        ) {
          const discountPriceArray = priceDollar.split("$");
          // console.log("discountPrice", discountPrice);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          } else {
            resolve(0);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyDellBuy = async (coupon, i) => {
  return APPLY_FUNCTIONS.applyDellCart(coupon, i);
};

//DellCart
APPLY_FUNCTIONS.applyDellCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyDellCart", coupon);

    const inputPromo = "#appendedInputButton"; //password hidden
    $(inputPromo).prop("type", "password");

    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtnKey = "#applyCouponButton";
    const applyBtn = $("div").find(applyBtnKey);

    $(applyBtn).simulateClick();
    await sleep(1000);

    // data-testid="discountsAndCouponsAmount"
    setTimeout(params => {
      const removePriceKey = "coupon-remove-link";
      const removePriceKeyEle = $("div").find(
        `[data-testid='${removePriceKey}']`
      );

      const totalsavingDivKey = "savingMessagePostSaveCart";
      const totalsavingDivKeyEle = $("div").find(
        `[data-testid='${totalsavingDivKey}']`
      );

      const discountPriceKey = "discountsAndCouponsAmount";
      const discountPriceEle = totalsavingDivKeyEle.find(
        `[data-testid='${discountPriceKey}']`
      );

      const hideCouponKey = "coupon-applied-message";
      const hideCouponKeyEle = $("div").find(
        `[data-testid='${hideCouponKey}']`
      );

      if (discountPriceEle.length && removePriceKeyEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (
          priceDollar.indexOf("$") !== -1 &&
          priceDollar.indexOf("-") !== -1
        ) {
          const discountPrice = priceDollar.replace("$", "").replace("-", "");
          console.log("discountPrice", discountPrice);
          hideCouponKeyEle.hide(); //隐藏coupon applied message
          resolve(discountPrice);
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};
//JourneysCart
APPLY_FUNCTIONS.applyJourneysCart = async coupon => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyJourneysCart", coupon);

    const inputPromo = "#CouponCode";
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtnKey = "#ApplyCoupon";
    const applyBtn = $("div").find(applyBtnKey);

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = "#orderdiscount";
      const discountPriceEle = $(discountPriceKey);

      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (
          priceDollar.indexOf("$") !== -1 &&
          priceDollar.indexOf("(") !== -1
        ) {
          const discountPrice = priceDollar
            .replace("$", "")
            .replace("(", "")
            .replace(")", "");
          console.log("discountPrice", discountPrice);
          resolve(discountPrice);
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyMaccosmeticsViewcart = async coupon => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyMaccosmeticsViewcart", coupon);

    const inputPromo = "#form--offer_code--field--OFFER_CODE";
    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtnKey = "form_offer_code_apply";
    const applyBtn = $("div").find(`[data-test-id='${applyBtnKey}']`);

    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = ".order-summary__subtotal-label";
      const discountPriceEle = $(discountPriceKey);
      // order-summary__subtotal-label
      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyForever21Basket = async coupon => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyForever21Basket", coupon);

    const inputPromo = "#txt_promoCode";

    /*   const openInputPromoBoxIcon = "#prepaidCard";
      var checked = $(openInputPromoBoxIcon).attr("aria-checked");
      await sleep(500);
      if (typeof checked !== undefined && checked != true) {
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(1000);
      } */

    //已经有了折扣码，则清空
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtn = "#btnPromoApply";
    // $(applyBtn).removeAttr("disabled");
    // await sleep(500);
    $(applyBtn).simulateClick();
    await sleep(1000);

    setTimeout(params => {
      const discountPriceKey = "#discountAmount";
      const discountPriceEle = $(discountPriceKey);

      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (
          priceDollar.indexOf("$") !== -1 &&
          priceDollar.indexOf("-") !== -1
        ) {
          const discountPrice = priceDollar.replace("$", "").replace("-", "");
          console.log("discountPrice", discountPrice);
          resolve(discountPrice);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNewbalanceCartShow = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyNewbalanceCartShow", coupon);

    const inputPromo = "#dwfrm_cart_couponCode";
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    await sleep(1000);

    const applyBtnKey = "dwfrm_cart_addCoupon";
    const applyBtnEle = $("div").find(`button[name='${applyBtnKey}']`);

    $(applyBtnEle).simulateClick();
    await sleep(2000);

    setTimeout(params => {
      const discountPriceKey = ".summary-totals .order-total .discount";
      const discountPriceEle = $(discountPriceKey);

      const currentPromoKey = ".couponapplicationctr";
      const currentPromoKeyEle = $(currentPromoKey).find(
        `[data-status='applied']`
      );

      if (currentPromoKeyEle.length) {
        console.log("find discount length=" + currentPromoKeyEle.length);

        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("- $") !== -1) {
          const discountPriceArray = priceDollar.split("- $");
          console.log("discountPriceArray", discountPriceArray);
          if (discountPriceArray.length) {
            resolve(discountPriceArray[1]);
          }
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyReebokCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyReebokCart", coupon);

    const inputPromo = "#coupon";
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    // $('#prepaidCardNumber').sendkeys('9398448');
    // $(inputPromo).val(coupon);
    await sleep(1000);

    const applyBtnKey = "glass-coupon-button-submit";
    const applyBtnEle = $("div").find(`[data-auto-id='${applyBtnKey}']`);

    // $(applyBtn).removeAttr("disabled");
    // await sleep(500);
    $(applyBtnEle).simulateClick();
    await sleep(2000);

    setTimeout(params => {
      //必须重复检测才可以!
      const discountDiv = "glass-cart-product-discounts";
      const discountDivEle = $("div").find(`[data-auto-id='${discountDiv}']`);
      let finalDiscount = 0;

      if (discountDivEle.length) {
        const discountPriceKey = "glass-cart-order-discounts-value";
        const discountPriceEle = discountDivEle.find(
          `[data-auto-id='${discountPriceKey}']`
        );

        discountPriceEle.each(function(index) {
          let priceDollar = $(this).text();

          if (
            priceDollar.indexOf("$") !== -1 &&
            priceDollar.indexOf("-") !== -1
          ) {
            let discountPrice = parseFloat(
              priceDollar.replace("$", "").replace("-", "")
            );
            finalDiscount =
              discountPrice > finalDiscount ? discountPrice : finalDiscount;
            // console.log("discountPrice", discountPrice);
          }
        });
      }

      resolve(finalDiscount);
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyAdidasCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyAdidasCart", coupon);
 

    const removeBtnKey = "glass-coupon-button-delete";
    const removeBtnKeyEle = $("div").find(`[data-auto-id='${removeBtnKey}']`);
    if ($(removeBtnKeyEle).length) {
      $(removeBtnKeyEle).simulateClick(); //打开coupon输入
      await sleep(1000);
    }

    const inputPromo = "#coupon";
    if ($(inputPromo).val() != "") {

      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
      $(inputPromo).val('');
    }

    $(inputPromo).sendkeys(coupon);
    // $('#prepaidCardNumber').sendkeys('9398448');
    // $(inputPromo).val(coupon);
    await sleep(1000);

    const applyBtnKey = "glass-coupon-button-submit";
    const applyBtnEle = $("div").find(`[data-auto-id='${applyBtnKey}']`);

    // $(applyBtn).removeAttr("disabled");
    // await sleep(500);
    $(applyBtnEle).simulateClick();
    await sleep(2000);

    setTimeout(params => {
      //必须重复检测才可以!
      const discountPriceKey = "glass-cart-order-discounts-value";
      const discountPriceEle = $("div")
        .find(`[data-auto-id='${discountPriceKey}']`)
        .eq(1);

      console.log("object", discountPriceEle);
      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPrice = priceDollar.replace("$", "").replace("-", "");
          console.log("discountPrice", discountPrice);
          resolve(discountPrice);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyMacysMybag = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyMacysMy_bag", coupon);

    const inputPromo = "#promo-apply-input";
    if ($(inputPromo).val() != "") {
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(500);
    }

    $(inputPromo).sendkeys(coupon);
    // $('#prepaidCardNumber').sendkeys('9398448');
    // $(inputPromo).val(coupon);
    await sleep(1000);

    const applyBtn = ".promo-apply-button.primaryBlack";

    $(applyBtn).removeAttr("disabled");
    await sleep(500);
    $(applyBtn).simulateClick();
    await sleep(2000);

    setTimeout(params => {
      //必须重复检测才可以!
      const discountPriceKey = ".promo-applied-discount";
      const discountPriceEle = $(discountPriceKey);
      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const discountPrice = priceDollar.replace("$", "").replace("-", "");
          console.log("discountPrice", discountPrice);
          resolve(discountPrice);
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNikeCheckout = async coupon => {
  return new Promise(async (resolve, reject) => {
    console.log("输入哭胖开始 applyNikeCheckout", coupon);

    const inputPromo = "#promoCode";
    const openInputPromoBoxIcon = "#prepaidCard";

    var checked = $(openInputPromoBoxIcon).attr("aria-checked");
    console.dir(checked);
    await sleep(10);
    // attribute exists?
    if (typeof checked !== undefined && checked != true) {
      $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
      await sleep(10);
    }

    if ($(inputPromo).val() != "") {
      //已经有了折扣码，则清空
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      await sleep(10);
    }

    $(inputPromo).sendkeys(coupon);
    // $('#prepaidCardNumber').sendkeys('9398448');
    // $(inputPromo).val(coupon);
    await sleep(100);

    const applyBtn = ".qa-promocode.mod-ncss-btn.ncss-btn-black";

    $(applyBtn).removeAttr("disabled");
    await sleep(10);
    $(applyBtn).simulateClick();
    await sleep(100);

    setTimeout(params => {
      //必须重复检测才可以!
      const discountPriceKey = ".discountTotal.u-bold";
      const discountPriceEle = $(discountPriceKey);

      if (discountPriceEle.length) {
        console.log("find discount length=" + discountPriceEle.length);
        const priceDollar = discountPriceEle.text();
        console.log(priceDollar);
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          console.log(priceStr);
          resolve(priceStr[0].replace("$", ""));
        }
      } else {
        resolve(0);
      }
    }, 2345);
  });
};

APPLY_FUNCTIONS.applyNikeCart = async (coupon, i) => {
  return new Promise(async (resolve, reject) => {
    const openInputPromoBoxIcon = ".css-1tt4fqo";
    const errorConfirm = ".css-yqc3ci.exls3jk1";

    if ($(errorConfirm).length) {
      $(errorConfirm).simulateClick(); //打开coupon输入
      await sleep(300);
    }

    const inputPromo = "input[name=promotionCode]";

    if (!$(inputPromo).length) {
      //没有输入需要打开
      if (!$(openInputPromoBoxIcon).length) {
        console.log(
          `openInputPromoBoxIcon find, length=  ` +
            $(openInputPromoBoxIcon).length
        );
        alert(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
        reject(
          "Promo code input field has not been found. Please refresh the page and try again!"
        );
      } else {
        //有打开按钮则打开
        $(openInputPromoBoxIcon).simulateClick(); //打开coupon输入
        await sleep(500);
      }
    }
    // $(inputPromo).prop("type", "password");
    if ($(inputPromo).val()) {
      //已经有了折扣码，则清空
      $(inputPromo).sendkeys("{del}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).sendkeys("{backspace}");
      $(inputPromo).focus();
    }

    await sleep(200);
    $(inputPromo).sendkeys(coupon);
    await sleep(getRandomInt(1000));
    // await sleep(20);
    // $(".e1mkeel41").removeAttr("disabled");
    await sleep(200);
    $(".e1mkeel41").simulateClick();
    await sleep(1000);

    setTimeout(params => {
      //必须重复检测才可以!
      const discountPriceKey = "summary-promo-discount";
      const discountPriceEle = $(`div[data-automation='${discountPriceKey}']`);
      const discountCodeKey = "promo-code-line-item";
      const discountCodeKeyEle = $(`div[data-automation='${discountCodeKey}']`);

      if (discountCodeKeyEle.length) {
        console.log("find discount length=" + discountCodeKeyEle.length);
        const priceDollar = discountPriceEle.text();
        if (priceDollar.indexOf("$") !== -1) {
          const priceStr = priceDollar.match(/\$\d+(\.\d+)?/gi);
          resolve(priceStr[0].replace("$", ""));
        } else {
          resolve(0);
        }
      } else {
        resolve(0);
      }
    }, 1100);
  });
};
