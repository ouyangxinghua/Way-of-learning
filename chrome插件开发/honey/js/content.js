chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action == 'scrape'){
			sendResponse(window.getSelection().toString());
		} else {
			sendResponse();
		}
	}
);
