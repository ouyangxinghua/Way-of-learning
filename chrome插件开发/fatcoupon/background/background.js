(async () => {
  /* 
  chrome.tabs.onCreated.addListener(function (tab) {
    // Only redirect if this is a blank new tab (not opened by clicking a link).
    if (tab.url.indexOf('redirect.viglink.com')!== -1) {  
      console.log(tab.url);
      // Show your website. This might highlight the omnibox,
      // but it's not guaranteed.
      chrome.tabs.update(tab.id, {url:'https://baidu.com', active:false});
    }
  }); 
  */
  chrome.storage.local.clear(params => {
    console.log("cleared");
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(SITE);
    setBadgetCount(tab.url);

    /* 
    chrome.tabs.executeScript( null, {code:"var  xxx = 10; document"},
    function(results){ console.log(results); } ); */

    if (AVAILABLE_SITES[SITE] && AVAILABLE_SITES[SITE].react) {
      const key = "oldUrl"; // `${tab.url}_loaded`;
      chrome.storage.local.get(key, function(result) {
        console.log("oldUrl", result[key]);
        if (tab.status === "complete" && result[key] !== tab.url) {
          console.log(tab.url);
          var code = "   window.location.reload();";
          chrome.tabs.executeScript(tab.id, { code });

          chrome.storage.local.set({ [key]: tab.url }, function() {
            console.log(key + " is set to " + tab.url);
          });
        }
      });
      console.log("react site...");
    }
  });

  //需要tabs权限;设置为0初始化; 实时检测TAB;设置badget
  chrome.tabs.onActivated.addListener(function(info) {
    chrome.tabs.get(info.tabId, function(tab) {
      console.log(tab);
      setBadgetCount(tab.url);
    });
  });

  function setBadgetCount(activeUrl) {
    //重置 RESET SITE...
    SITE = getCurrentSite(activeUrl);

    if (SITE === FAKE_SITE) {
      //不请求数据库
      setBadget();
      return;
    }
    console.log("background site", SITE);
    ajaxRequest(GET_COUPONS_API, "GET", {
      term: SITE,
      field: "link",
      sortProp:'id',
          sortOrder:'asc',
      pageNum: 1,
      pageSize: 50,
      status: COUPON_STATUS.ACTIVE
      // type: COUPON_TYPE.PUBLIC
    })
      .then(res => {
        const data = res.data && res.data.data;
        if (data.length) {
          setBadget(`${data.length}`);
        } else {
          setBadget();
        }
      })
      .catch(e => {});
  }

  //监听popup;长期监测
  chrome.extension.onConnect.addListener(port => {
    port.onMessage.addListener(request => {
      var tabId = request.tabId;
      console.log(request, tabId);
      if (request.ACTION == "GET_COUPONS") {
        // alert(SITE);
        ajaxRequest(GET_COUPONS_API, "GET", {
          term: SITE,
          field: "link",
          sortProp:'id',
          sortOrder:'asc',
          pageNum: 1,
          pageSize: 50,
          status: COUPON_STATUS.ACTIVE
          // type:  request.ACTION == "GET_PUBLIC_COUPONS" ? COUPON_TYPE.PUBLIC :COUPON_TYPE.EXCLUSIVE,
        })
          .then(res => {
            console.log("GET_COUPONS", res);
            const data = res.data && res.data.data;
            port.postMessage({
              type: "FOUND_COUPONS",
              data: data
            });
          })
          .catch(e => {
            port.postMessage({
              type: "ERROR",
              data: "Internet error."
            });
          });
      }
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.ACTION === "GET_COUPONS") {
      SITE = request.SITE; //重新设置SITE
      ajaxRequest(GET_COUPONS_API, "GET", {
        term: request.SITE,
        field: "link",
        sortProp:'id',
        sortOrder:'asc',
        pageNum: 1,
        pageSize: 50,
        status: COUPON_STATUS.ACTIVE
      })
        .then(res => {
          const data = res.data && res.data.data;
          setBadget(`${data.length}`);
          sendResponse(data);
          console.log(res);
        })
        .catch(e => {
          console.log(e);
          sendResponse({ error: "Request failure..." });
        });
    }

    if (request.ACTION === "UPDATE_TIMES") {     
      ajaxRequest(UPDATE_TIMES_API, "POST", {
      id: request.ID
      })
        .then(res => {
          const data = res.data && res.data.data;
          
          sendResponse(data);
          console.log(res);
         
        })
        .catch(e => {
          console.log(e);
          sendResponse({ error: "Request failure..." });
        });
    }

    if (request.ACTION === "DELETE_PUBLIC") {     
      ajaxRequest(DELETE_PUBLIC_API , "POST", {
      id: request.ID
      })
        .then(res => {
          const data = res.data && res.data.data;
          
          sendResponse(data);
          console.log(res);         
        })
        .catch(e => {
          console.log(e);
          sendResponse({ error: "Request failure..." });
        });
    }
    

    if (request.ACTION == "JUMP_URL") {
      const URL = request.URL;
      const VigLinksKey = "69197bf8ee3e492b08367fb5ebf9fff9";
      const urlEncodeViglinks = `http://redirect.viglink.com?u=${encodeURIComponent(
        URL
      )}&key=${VigLinksKey}`;

      const skimKey = "41807X1085706"; //41807X1085706 watter.com
      const xcust = "UID123";
      const urlEncodeSkim = `http://go.skimresources.com/?url=${encodeURIComponent(
        URL
      )}&id=${skimKey}&xcust=${xcust}`;

      // id=123X456&url=http%3A%2F%2Fnewegg.com%2F&sref=http%3A%2F%2Fyourdomain.com%2Fyourpage&xcust=yourtrackingid123

      chrome.tabs.create({ url: urlEncodeSkim, active: false }, function(tab) {
        setTimeout(params => {
          chrome.tabs.remove(tab.id, function() {
            console.log("closed!!");
          });
        }, 15000);
      });
      sendResponse(true);
    }
    return true; //async..return...
  });

  function popitup(url) {
    RightPosition = screen.width ? (screen.width - 800) / 2 : 0;
    TopPosition = screen.height ? (screen.height - 700) / 2 : 0;
    var sheight = screen.height * 0.9;
    var swidth = screen.width * 0.8;

    settings =
      "height=" +
      400 +
      ",width=" +
      200 +
      ",top=" +
      100 +
      ",left=" +
      20 +
      ",menubar=no,resizable=no,scrollbars=yes,location=no,toolbar=no";

    newwindow = window.open(url, "", settings);
    if (window.focus) {
      newwindow.focus();
    }
    return false;
  }

  $("#test_cors").click(e => {
    $.get("https://www.baidu.com", function(html) {
      console.log(html);
      alert("跨域调用成功！");
    });
  });

  $("#get_popup_title").click(e => {
    var views = chrome.extension.getViews({ type: "popup" });
    if (views.length > 0) {
      alert(views[0].document.title);
    } else {
      alert("popup未打开！");
    }
  });

  // 获取当前选项卡ID的URL
  function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (callback) callback(tabs.length ? tabs[0].id : null);
      let currTab = tabs[0];
      console.log(currTab.url);
      alert(currTab.url);
    });
  }

  // 获取当前选项卡ID
  function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (callback) callback(tabs.length ? tabs[0].id : null);
    });
  }

  // 当前标签打开某个链接
  function openUrlCurrentTab(url) {
    getCurrentTabId(tabId => {
      chrome.tabs.update(tabId, { url: url });
    });
  }

  // 新标签打开某个链接
  function openUrlNewTab(url) {
    chrome.tabs.create({ url: url });
  }

  // 预留一个方法给popup调用
  function testBackground() {
    alert("你好，我是background！");
  }
})();
