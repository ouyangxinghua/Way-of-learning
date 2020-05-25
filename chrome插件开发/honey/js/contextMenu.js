var clickHandler = function(e) {

	var params = {
		type: 'url',
		url: e.pageUrl,
		title: '',
		body: ''
	};

	// Selected text on current page (save page url)
	if (e.selectionText) {
		params.body = e.selectionText;
	}
	
	// Saving a link
	if (e.linkUrl) {
		params.url = e.linkUrl;
	}
	

console.log(params);
return;


	$.ajax({
		url: 'https://staging.honey.is/post',
		data: params,
		type: 'POST',
		dataType: 'json',
	    crossDomain: true,		// for POST'ing 
		headers: {'X-Requested-With':'XMLHttpRequest'},	// why? Seems to be necessary
		timeout: 2500,
		error: function(xhr, type){ alert('Something went wrong') }
	})







};

// chrome.contextMenus.create({
// 	"title": "Save link to Honey",
// 	"contexts": ["link"],
// 	"onclick" : clickHandler
// });

// chrome.contextMenus.create({
// 	"title": "Save page to Honey",
// 	"contexts": ["page"],
// 	"onclick" : clickHandler
// });

chrome.contextMenus.create({
	"title": "Save selection to Honey",
	"contexts": ["selection"],
	"onclick" : clickHandler
});

