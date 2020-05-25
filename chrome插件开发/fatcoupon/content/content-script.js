// 注意，必须设置了run_at=document_start 此段代码才会生效

// document.addEventListener("DOMContentLoaded", async () => {});

(async () => {
  //获取当前网址
  const URL = getCurrentUrl();
  console.log("URL---content", URL);
  const SITE = getCurrentSite(URL);
  console.log("SITE---content", SITE);
  let isMatchedSite = !!AVAILABLE_SITES[SITE];
  let isMatchedUrl = false;
  let matchedSite = SITE;
  let matchedUrl = "";
  let isRefresh = false;

  if (isMatchedSite) {
    const match = AVAILABLE_SITES[SITE].match;
    const refresh = AVAILABLE_SITES[SITE].refresh || null;

    if (match.length) {
      match.forEach(element => {
        if (URL.indexOf(element) !== -1) {
          isMatchedUrl = true;
          matchedUrl = element; //cart/bag
        }
      });
    }
    console.log("matchedUrl", matchedUrl);
    if (refresh && refresh.includes(matchedUrl)) {
      isRefresh = true;
    }
  }

  const funcName = `apply${capitalizeFirstLetter(
    matchedSite
  )}${capitalizeFirstLetter(matchedUrl)}`
    .replace("-", "")
    .replace("-", "");
  console.log(funcName);

  if (!(isMatchedSite && isMatchedUrl)) {
    return;
  }

  const ACTION = "GET_COUPONS";
  var GET_COUPONS = [];
  if (SITE !== FAKE_SITE) {
    //请求数据库
    GET_COUPONS = await backgroundRequest({
      ACTION,
      SITE
    });
  }

  await sleep(100); //防止找不到元素 ,{code:'STDNT352475654425'}  STDNT352475654425
  // GET_COUPONS.push({code:'FATCOUPON'},{code:'STDNT352274555391'});

  //如果发现酷跑, 插入弹窗
  if (!GET_COUPONS.length) {
    return;
  } else {
    injectCouponPopup();
  }

  await sleep(1000); //防止找不到元素

  //开始POP
  const KUPANGZI_POP = "kupangzi-shadow"; //"kupangzi_pop";
  const KUPANGZI_POPELE = $(`.${KUPANGZI_POP}`);

  if (!KUPANGZI_POPELE.length) {
    console.log(`error: did not find element---->>${KUPANGZI_POP}`);
  }
  //POP上部分容器
  const TopContainerDiv = "top_container_div";
  const TopContainerDivEle = KUPANGZI_POPELE.find(
    `[data-kupangzi='${TopContainerDiv}']`
  );
  //POP下部分容器
  const BottomContainerDiv = "bottom_container_div";
  const BottomContainerDivEle = KUPANGZI_POPELE.find(
    `[data-kupangzi='${BottomContainerDiv}']`
  );

  //Coupon Number数量
  const CouponNumber = "coupon_number";
  const CouponNumberEle = KUPANGZI_POPELE.find(
    `[data-kupangzi='${CouponNumber}']`
  );

  //更新数量
  if (CouponNumberEle.length) {
    CouponNumberEle.text(`${GET_COUPONS.length}`);
  } else {
    console.log(`error: did not find element---->>${CouponNumber}`);
  }

  //关闭按钮
  const PopCloseSign = "pop_close_sign";
  const PopCloseSignEle = KUPANGZI_POPELE.find(
    `[data-kupangzi='${PopCloseSign}']`
  );
  PopCloseSignEle.click(async e => {
    e.preventDefault;
    KUPANGZI_POPELE.hide();
    // KUPANGZI_POPELE.parent().remove();
  });

  //开始应用 apply coupon button
  const ApplyCoupon = "apply_coupon";
  const ApplyCouponEle = KUPANGZI_POPELE.find(
    `[data-kupangzi='${ApplyCoupon}']`
  );
  await sleep(10);

  //接受来自popup的指令; 然后开始应用coupon
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if (request.cmd == "apply_coupon_from_popup") {
      //  console.log(request);
      ApplyCouponEle.simulateClick();
    }
    sendResponse(true);
    return true; //async..return...
  });

  const allCoupons = getCodes(GET_COUPONS);
  const allIds = getIds(GET_COUPONS);
  //window.localStorage.clear() ;
  console.log("allCoupons", allCoupons);
  console.log("URL---", URL);
  //window.location.reload();
  //let isRefresh= true;
  
  let foundPrice = window.localStorage.getItem("foundPrice") || 0.0;
  let foundCoupon = window.localStorage.getItem("foundCoupon") || "";
  let isFound = window.localStorage.getItem("isFound") || false;
  let isAffed = window.localStorage.getItem("isAffed") || false;

  let isContinue = window.localStorage.getItem("isContinue") || false;
  let currentIndex = parseInt(window.localStorage.getItem("currentIndex") || 0);
  if (currentIndex + 1 > allCoupons.length) {
    window.localStorage.setItem("currentIndex", 0);
    currentIndex = 0;
  }
  let currentCoupon = allCoupons[currentIndex];
  let currentId = allIds[currentIndex];
   
  console.log("currentIndex" + currentIndex);
  console.log("currentCoupon" + currentCoupon);
  console.log("isContinue" + isContinue);
  console.log("foundPrice" + foundPrice);
  console.log("foundCoupon" + foundCoupon);
  console.log("isFound" + isFound);
  console.log("isAffed" + isAffed);

  if (isRefresh) {
    //如果需要刷新和继续
    ApplyCouponEle.click(async e => {
      e.preventDefault;

      if (!isAffed && !currentIndex) {
        await backgroundRequest({
          ACTION: "JUMP_URL",
          URL: getCurrentUrl()
        });
        window.localStorage.setItem("isAffed", true);
      }
      //第一步关闭pop

      KUPANGZI_POPELE.hide();
      // KUPANGZI_POPELE.parent().remove(); //必须删除
      //第2步打开mask
      injectCouponMask();
      await sleep(200);

      //第3步初始化Ui
      //自定义开始 MASK;初始化根源
      const KUPANGZI_MASK = "kupangzi_mask";
      const KUPANGZI_MASKELE = $(`#${KUPANGZI_MASK}`);

      //错误提示,容器
      const LeftTopContainerError = "left_top_container_error";
      const LeftTopContainerErrorEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${LeftTopContainerError}']`
      );
      //Success提示,容器
      const SavedOrderPrice = "saved_order_price";
      const SavedOrderPriceEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${SavedOrderPrice}']`
      );
      //CheckoutButton,容器
      const CheckoutButton = "checkout_button";
      const CheckoutButtonEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${CheckoutButton}']`
      );
      await sleep(1);

       // CONTINUE TO CHECK OUT...
      CheckoutButtonEle.click(   params => {
        
        KUPANGZI_MASKELE.hide();
        KUPANGZI_MASKELE.parent().remove();

          window.localStorage.clear();
          window.location.reload();
      });

      //正在 APPLYING COUPONS
      if (LeftTopContainerErrorEle.length) {
        LeftTopContainerErrorEle.text(`Applying coupons now...`);
      } else {
        console.log(
          `error: did not find element---->>${LeftTopContainerError}`
        );
      }
      //progress进度条元素
      const LeftTopContainerProgress = "left_top_container_progress";
      const LeftTopContainerProgressEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${LeftTopContainerProgress}']`
      );
      const Progress = "progress";
      const ProgressEle = LeftTopContainerProgressEle.find(`.${Progress}`);

      //进度条初始化
      if (!ProgressEle.length) {
        console.log(`error: did not find element---->>${Progress}`);
        return;
      }

      ProgressEle.asProgress({
        namespace: "progress"
      });
      ProgressEle.asProgress("start");

      console.log("APPLY_FUNCTIONSREFRESH....", APPLY_FUNCTIONS);

      let percent = Math.round(((currentIndex + 1) / allCoupons.length) * 100);
      ProgressEle.asProgress("go", percent);

      try {
        if (currentIndex + 1 < allCoupons.length) {
          window.localStorage.setItem("isContinue", true);
          window.localStorage.setItem(
            "currentIndex",
            parseInt(currentIndex + 1)
          );
        } else {
          window.localStorage.setItem("isContinue", false);
          window.localStorage.setItem("currentIndex", 0);
        }

        var discountPrice = await APPLY_FUNCTIONS[funcName](
          currentCoupon,
          currentIndex
        );

        const UPDATE_TIMES = await backgroundRequest({
          ACTION: "UPDATE_TIMES",
          ID: allIds[i]
        });
        console.log(UPDATE_TIMES);

        if (discountPrice && discountPrice > 0) {
          SavedOrderPriceEle.text(
            `Coupon Works! You can save upto $${discountPrice}.`
          );
          ProgressEle.asProgress("go", 100);
          ProgressEle.asProgress("done");

          window.localStorage.setItem("isFound", true);
          window.localStorage.setItem("foundCoupon", currentCoupon);
          window.localStorage.setItem("isContinue", false);
        } else {
          if (currentIndex + 1 < allCoupons.length) {
            window.localStorage.setItem("isContinue", true);
            window.localStorage.setItem(
              "currentIndex",
              parseInt(currentIndex + 1)
            );

            window.location.reload();
          } else {
            window.localStorage.setItem("isContinue", false);
            window.localStorage.setItem("currentIndex", 0);
          }
        }
      } catch (error) {
        console.log("Something went wrong. Please try again.");
        window.location.reload();
      }

      // ProgressEle.asProgress("go", 100);
      // ProgressEle.asProgress("done");

      if (!discountPrice) {
        LeftTopContainerErrorEle.text(
          `Sorry! we've tried, but it didn't work.`
        );
      } else {
        LeftTopContainerErrorEle.text(``);
      }
    });

    if (isContinue) ApplyCouponEle.simulateClick();

  } else {

    ApplyCouponEle.click(async e => {
      e.preventDefault;

      const allowAff = true;
      if (allowAff) {
        await backgroundRequest({
          ACTION: "JUMP_URL",
          URL: getCurrentUrl()
        });
      }

      //第一步关闭pop
      KUPANGZI_POPELE.hide();
      // KUPANGZI_POPELE.parent().remove(); //必须删除
      //第2步打开mask
      injectCouponMask();
      await sleep(200);

      //第3步初始化Ui
      //自定义开始 MASK;初始化根源
      const KUPANGZI_MASK = "kupangzi_mask";
      const KUPANGZI_MASKELE = $(`#${KUPANGZI_MASK}`);

      //错误提示,容器
      const LeftTopContainerError = "left_top_container_error";
      const LeftTopContainerErrorEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${LeftTopContainerError}']`
      );
      //Success提示,容器
      const SavedOrderPrice = "saved_order_price";
      const SavedOrderPriceEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${SavedOrderPrice}']`
      );
      //CheckoutButton,容器
      const CheckoutButton = "checkout_button";
      const CheckoutButtonEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${CheckoutButton}']`
      );
      await sleep(1);
      CheckoutButtonEle.click(params => {
        KUPANGZI_MASKELE.hide();
        KUPANGZI_MASKELE.parent().remove();
        window.location.reload();

      });
      //正在 APPLYING COUPONS
      if (LeftTopContainerErrorEle.length) {
        LeftTopContainerErrorEle.text(`Applying coupons now...`);
      } else {
        console.log(
          `error: did not find element---->>${LeftTopContainerError}`
        );
      }
      //progress进度条元素
      const LeftTopContainerProgress = "left_top_container_progress";
      const LeftTopContainerProgressEle = KUPANGZI_MASKELE.find(
        `[data-kupangzi='${LeftTopContainerProgress}']`
      );
      const Progress = "progress";
      const ProgressEle = LeftTopContainerProgressEle.find(`.${Progress}`);

      //进度条初始化
      if (!ProgressEle.length) {
        console.log(`error: did not find element---->>${Progress}`);
        return;
      }

      ProgressEle.asProgress({
        namespace: "progress"
      });
      ProgressEle.asProgress("start");

      var isCouponFound = false;
      var FoundCoupon = "";
     
      console.log("APPLY_FUNCTIONS", APPLY_FUNCTIONS);

      for (let i = 0; i < allCoupons.length; i++) {

        let percent = Math.round(((i + 1) / allCoupons.length) * 100);
        ProgressEle.asProgress("go", percent);
         
        try {
          var discountPrice = await APPLY_FUNCTIONS[funcName](allCoupons[i], i);
          console.log(allCoupons[i]);

          console.log("object--" + i + "--" + discountPrice);

          const UPDATE_TIMES = await backgroundRequest({
            ACTION: "UPDATE_TIMES",
            ID: allIds[i]
          });
          console.log(UPDATE_TIMES);

          if (discountPrice && discountPrice > 0.0) {
            SavedOrderPriceEle.text(
              `Coupon Works! You can save upto $${discountPrice}.`
            );
            ProgressEle.asProgress("go", 100);
            ProgressEle.asProgress("done");
            isCouponFound = true;
            FoundCoupon = allCoupons[i];
            break;
          } else {
            //Not working then pass server for recording...
          }
        } catch (error) {
          console.log(error);
          console.log("Something went wrong. Please try again.");
        }
      }

      ProgressEle.asProgress("go", 100);
      ProgressEle.asProgress("done");

      if (!discountPrice) {
        LeftTopContainerErrorEle.text(
          `Sorry! we've tried, but it didn't work.`
        );
      } else {
        LeftTopContainerErrorEle.text(``);
      }
    }); //apply coupon按钮结束
  }

  injectCustomJs();
})();
