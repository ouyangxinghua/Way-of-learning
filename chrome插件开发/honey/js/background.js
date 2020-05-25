/**
 * Set up an interface to communicate with the popup (honey.html) page
 */

// Message passing
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == 'getStorage') {
		sendResponse({storage: localStorage});
	} else {
		sendResponse({}); // snub them.
	}
});



/* Popout */
(function() {
    var _pop;
    window.popout = function() {
        if(_pop) {
            _pop.focus();                    
        } else {
            _pop = window.open('popup.html', 'popout', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=470,height=480,dialog=yes');
        }
    }
})();
