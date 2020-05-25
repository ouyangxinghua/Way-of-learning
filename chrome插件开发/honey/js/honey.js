// Copyright (c) 2013 Huge. All rights reserved.

(function() {

	var apiUrl = 'https://honey.is/';
	if ( getGlblConfig( 'isDevMode' ) ) {
		apiUrl = 'http://local.honey.is/';
	}
	
	var Honey = {
		_uid: '',
		init: function(event) {
			if (typeof event !== 'undefined') this._popoverId = event.target.identifier;

			// Bind UI elements. Save, cancel, click this, that, here up up down down left right
			this.bindActions();

			// Load user data from cache
			// if (localStorage.getItem('Honey.user')) {
			// 	var user = localStorage.getItem('Honey.user');
			// 	$('#user').html(user.name);
			// 	$('#userImage img').attr('src', user.image);
			//	 Honey.fetchGroups();
			// } else {
			try {
				this.getUser(function(user){

					Honey.currentUser = user;
					$('#user').html(user.name_or_username);
					$('#userImage img').attr('src', apiUrl+'user/'+user.id+'/avatar.png?size=24');

					Honey.fetchGroups(undefined, user);

				});
			} catch(e) {  }

			// Scrape the page in order to populate title, desc., etc. info
			this.scrapePage();

		},

		getUser: function(callback) {
			Honey.api('account', function(result) {
				if (result && result.user.id) {
					// localStorage.setItem('_honeyUID', result.user.id);
					// localStorage.setItem('_honeyUser', result.user.name);
					Honey._uid = result.user.id;
					callback && callback(result.user);
				}
			});
		},


/*		unused functions for caching user ID / access token

		getAccessToken: function() {
			return localStorage._fbtoken || false;
		},

		setAccessToken: function(token) {
			if(token === false) {
				localStorage.removeItem('_fbtoken');
			} else {
				localStorage._fbtoken = token;
			}
		},

		getUserID: function() {
			return localStorage._uid || FB._uid;
		},
*/

		login: function() {
			this.log('Redirecting to login');
			Honey.openTab('https://honey.is/login');
			Honey.closePop();
		},


		bindActions: function(){
			// --- Cancel ---
			$('#cancel').click(function(e){
				e.preventDefault();
				Honey.closePop();
			});

			// --- Save ---
			//$('#submit').click(function(e){
			$('#new-post').submit(function() {
				//e.preventDefault();

				/*
var groups = (function(){ 
					return $('#groups option:selected').map(function(){ return $(this).val(); }).get().join();
				})(); 
*/

				// preserve carriage returns in textarea
				$.valHooks.textarea = {
					get: function( elem ) {
					return elem.value.replace( /\r?\n/g, "\r\n" );
					}
				};

				if (!$('#title').val()) {
					$('#title').tooltip({
			        	title: 'A title is required',
			        	placement: 'top',
			        	trigger: 'manual'
		        	});
		        	$('#title').tooltip('show');
		        	$('.tooltip.in').addClass('error');
					$('#title').change(function(){ 
						$(this).tooltip('destroy');
					});
				} else if (!$('#groups').val()) {
					$('#groups_chzn').tooltip({
			        	title: 'Please select at least 1 group',
			        	placement: 'top',
			        	trigger: 'manual'
		        	});
		        	$('#groups_chzn').tooltip('show');
		        	$('.tooltip.in').addClass('error');
				} else {
					Honey.sendPost();
				}
				
				return false;
			});
			
			// --- Post Title ---
			$('#title').keyup(function() {
				if ($(this).val()) $(this).tooltip('destroy'); 
			});

			// --- Textarea ---
			$('textarea').flexible({'height':64, 'max-height':112});
			if (typeof safari !== 'undefined') { // safari
				$('textarea').keyup(function() {
					safari.self.height = $(window).height();
				});
			}
			
			// --- Create Group ---
			$('body').on('click', '.create-group', function() {
				var $this = $(this);
				var $form = $this.closest('form');
				var $groupInp = $form.find('input[name="groups"]').first();
				var groupName = $this.attr('data-tname');
				
				if (!$this.hasClass('creating')) {
					$this.html('Creating...').addClass('creating');
					
					$.ajax({
			            type: 'POST',
			            url: apiUrl + 'group',
			            data: 'name=' + groupName + '&private=0',
			            crossDomain: true,
						headers: {'X-Requested-With':'XMLHttpRequest'},
			            success: function(response) {
			            	var newgid = $($.parseHTML(response)[1]).attr('data-gid');
							var groupArr = [newgid];
							
							$('#groups_chzn').find('.search-choice').each(function() {
					    		var gid = $(this).attr('data-gid');
						    	groupArr.push(gid);
					    	});
					    	
					    	Honey.fetchGroups(groupArr, Honey.currentUser);
			            },
			            error: function(response) {
			                $this.html('Error, try again').removeClass('creating');
			            }
			        });
				}
				
				return false;
			});
		},

		scrapePage: function() {
		
			// weird webkit bug
			$('#title').one('focus', function() {
				$(this).blur();
			});
		
			if (typeof chrome !== 'undefined') { // chrome
	
				this.getActiveTab(function(tab){
	
					$('#url').val(tab.url);
					$('#title').val(tab.title);
	
					chrome.tabs.sendMessage(tab.id, {action: 'scrape'}, function(response) {
						if (response){
							$('#description').val(response).trigger('updateHeight');
							// $('#groups').focus(); // there is no focus for this element, as it's no longer an input. Ratther:
	
							$('#groups').one('liszt:ready', function(){
								setTimeout(function(){	// ?? not sure why.
									$('.chzn-choices').mousedown();
								}, 100);
							});
	
	
						} else {
							$('#description').focus();
						}
					});
	
				});
					
			} else if (typeof safari !== 'undefined') { // safari
	
				this.getActiveTab(function(tab) {
					$('#url').val(tab.url);
					$('#title').val(tab.title);
				});
	
				safari.application.addEventListener('message', scrapedHandler, false);							// register listener for 'scrape'd response
				safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('scrape', null);		// send 'scrape' request to active tab
	
				function scrapedHandler(evt) {
					if (evt.name == 'scraped') {
						if (evt.message){
							$('#description').val(evt.message).trigger('updateHeight');
							// $('#groups').focus(); // there is no focus for this element, as it's no longer an input. Rather:
							$('#groups').one('liszt:ready', function(){
								setTimeout(function(){	// ?? not sure why.
									$('.chzn-choices').mousedown();
								}, 100);
							});
						} else {
							$('#description').focus();
						}
					}
				}
				
			}

			return;
		},

		fetchGroups: function(selGroups, currentUser){
			this.api('account/groups?type=postable&show=all', 'GET', function(data){

				// Fill lists from cache
				// var listCache = localStorage.getItem('kipptListCache');
				// var responseJSON = JSON.stringify(data.groups);
				// if (responseJSON !== listCache) {
				// 	Honey.updateGroups(response.objects);
				// 	// Save to cache
				// 	localStorage.setItem('kipptListCache', responseJSON);
				// }

				/*
				'%s/%s/%s_80x80.png' % (uuid[0:3], uuid[-3:], uuid[3:-3], size[0], size[1])

				first_3_uuid / last_3_uuid / the rest in the middle   _80x80.png

				default/168/group_80x80.png

				staging cdn: https://dsbpie2ffsceu.cloudfront.net
				prod cdn: https://d3hnco37krg3pu.cloudfront.net
				*/

				if (data.success) {
					var $groups = $('#groups');
					var groupListStr = '';
                    var fOptGroups = true; // !(Modernizr.touch && $.browser.webkit)
                    var showOrgName = currentUser.organizations.length > 1;

					Honey.availableGroups = {};

                	$.each(data.groups, function(k, group) {

					    Honey.availableGroups[group.id] = {
                            id: group.id,
                            name: group.name,
                            topics: group.topics
					    };

					    var groupName = group['default'] ? group.organization.name : group.name,
						    groupHeader = groupName + (showOrgName && !group['default'] ? ' | ' + group.organization.name : ''),
						    groupStr = (fOptGroups ? '<optgroup label="' + groupHeader + '">' : '<option value="" disabled="disabled">' + groupHeader + '</option>')
							   + '<option value="' + group.id + '" data-post-gid="' + group.id + '">' + groupName + ' - General</option>';

						    if (group.parent_id === null) {
                                $.each(group.topics, function(x, topic) {
                                    groupStr += '<option value="' 
                                            + topic.id 
                                            + '" data-post-gid="' 
                                            + topic.id 
                                            + '" data-gname="' 
                                            + groupName 
                                        + '">' 
                                            + groupName + ' - ' + topic.name 
                                        + '</option>';
                                });
						    }

						    if (fOptGroups) {
							    groupStr += '</optgroup>';
						    }

						    if (group.parent_id === null) {
                                if (!group['default'] && (group.is_member || group._adminable)) {
                                    groupListStr += groupStr;
                                }
						    }
					});

                    // in the event no groups are available
                    // show the groups image prompt
                    var groupsURL = getGlblConfig( 'groupsURL' );
                    if ( data.groups.length === 0 && groupsURL ) {
                        $('.addpostmode').hide();

                        $('.addgroupmode__link').attr('href', apiUrl+groupsURL );
                        $('.addgroupmode__link').attr('target', '_blank');

                        $('.addgroupmode').show();
                    }

					$groups.append(groupListStr);

					// [TODO]
					// we need to rewrite some functionality in Chosen in order to get toggling working
					/*
					AbstractChosen.prototype.choices_click = function(evt) {
						evt.preventDefault();

						if (!this.results_showing) {
							return this.results_show();
						} else {
							if (this.active_field) {
								return this.results_hide();
							}
						}
					};
					*/
					//$groups.chosen();		// make fancy list fancy
					var $chosenGroups = $groups.chosen({no_results_text: 'No group matched', enable_split_word_search: true}).change(function() {
					    if ($('.search-choice').length) $('#groups_chzn').tooltip('destroy');
					    if (typeof safari !== 'undefined') safari.self.height = $(window).height();
					});
					
					$chosenGroups.on('liszt:showing_dropdown', function() {
						$('.chzn-results').css('max-height', function() {
							var groupsPos = $('#groups_chzn').position();
							return $(document).height()-(groupsPos.top+$('#groups_chzn').outerHeight()+$('header').outerHeight())+'px';
						});
					});

					/*
$chosenGroups.data('chosen').no_results = function(terms) {
						var no_results_html;
						no_results_html = $('<li class="no-results">' + this.results_none_found + ' <b>' + terms + '</b><a href="#" class="create-group" data-tname="' + terms + '">+ CREATE</a></li>');
						return this.search_results.append(no_results_html);
					};
*/
					
					// Select groups if set
					if (typeof selGroups !== 'undefined') {
						for (var i in selGroups) {
			                $groups.find('option[value=' + selGroups[i] + ']').attr('selected', 'selected');
			            }
						$groups.trigger('liszt:updated');
						$('.search-field input').focus();
					}
					
					// Remove popup height restriction
					$('html,body').css('height', 'auto');
					$('#new-post').removeClass('out');

				}
			
			});
		},

		getActiveTab: function(callback) {
			if (typeof chrome !== 'undefined') { // chrome
				chrome.tabs.query({'active': true, 'currentWindow': true}, function(tabs){
					if (tabs.length) {
						if (tabs[0].url.indexOf('chrome://') == 0) {
							// ignore... or other action?
						} else {
							callback(tabs[0]);
						}
					}
				});
			} else if (typeof safari !== 'undefined') { // safari
				var win = safari.application.activeBrowserWindow;
				var tab = win.activeTab;
				callback(tab);
			}
		},

		openTab: function(url) {
			if (typeof chrome !== 'undefined') { // chrome
				chrome.tabs.create({url: url});
			} else if (typeof safari !== 'undefined') { // safari
				safari.application.activeBrowserWindow.openTab().url = url;
			}
		},

		closePop: function() {
			if (typeof chrome !== 'undefined') { // chrome
				window.close();
			} else if (typeof safari !== 'undefined') { // safari
				safari.self.hide();
				window.location.reload();
			}
		},

		adjustHeight: function(y) {
			// document.body.style.height="100px";
			document.getElementsByTagName("html")[0].style.height = y+"px";
		},

		/**
		 * Honey API
		 *
		 * @type {string} path
		 * @type {string} method, ie. post / get
		 * @type {object} params
		 * @type {function} callback
		 */
		api: function(path){

			var args = Array.prototype.slice.call(arguments, 1),
				callback = false,
				params = {},
				method = 'GET';

			for(var i in args) {
				switch(typeof args[i]) {
					case 'function':
						callback = args[i];
					break;
					case 'object':
						params = args[i];
					break;
					case 'string':
						method = args[i];
					break;
				}
			}

			if(!path) {
				return callback && callback(false);
			}

			Honey.loading(true);

			$.ajax({
				url: apiUrl + path,
				data: params,
				type: method,
				dataType: 'json',
			    crossDomain: true,		// for POST'ing 
				headers: {'X-Requested-With':'XMLHttpRequest'}	// why? Seems to be necessary
			})
			.done(function(res){

				// execute the callback
				if(typeof callback == 'function') {
					callback(res);
				}

				Honey.loading(false);
			})
			.fail(function(jqXHR, textStatus){

				Honey.loading(false);

				switch(jqXHR.status) {
					case 400:	// bad request. Shouldn't get here as missing fields should be caught beforehand
						Honey.log('Bad request.');
						break;

					case 401: 	// not logged in
						Honey.login();
						break;

					case 409:	// duplicate post error

						if( confirm('This is a duplicate post. Post anyway?')) {	// TODO. This line
							params.repost = true;
							Honey.api('post', params, 'POST', function(){			// try again
								Honey.closePop();
							});
						}
						break;

					case 500:	// server error. Likely trying to post from Localhost or Honey.is
						Honey.handleError('500 error. Are you posting from Honey.is or localhost ?');
						break;

					case 0:
						// alert('bad');

					default:
						Honey.log(jqXHR.status);
						Honey.log(textStatus);
						break;
				}
			});

			if (params.noFeedback) {
				Honey.loading(false);
				Honey.closePop;			// just close pop immediately
			}

		},
		
		sendPost: function() {
			var $subButton = $('#submit');
			$subButton.val('Posting...').attr('disabled', 'disabled');
			$('#new-post').addClass('fade');
			Honey.loading(true);
			$.ajax({
	            type: 'POST',
	            url: apiUrl + 'post',
	            data: $('#new-post').serialize() + '&url_source=' + encodeURIComponent($('#url').val()) + '&groups=' + $('#groups option:selected').map(function(){ return $(this).val(); }).get().join(),
	            crossDomain: true,
				headers: {'X-Requested-With':'XMLHttpRequest'},
	            success: function(response) {
	            	Honey.closePop();
	            },
	            error: function(err) {
	            	$('#new-post').removeClass('fade');
	            	Honey.loading(false);
	            	
	                if (err.status == 409) {
		        		var popHtml = '<div><a href="#" class="pop-close">&times</a><p>The URL has already been posted to Honey. Would you like to post it anyway?</p><a href="#" class="button repost blue">Post Anyway</a><a href="#" class="button dis-pop gray">cancel</a></div>';
			            $subButton.popover({'trigger':'manual','placement':'top','title':'Duplicate URL','content':popHtml,'animation':false,'html':true});
			            $subButton.popover('show');
			            $subButton.val('Duplicate');
			            $subButton.data('popover').$tip.find('a.repost').click(function(e) {
			                if (!$(this).hasClass('gray')) {
				             	 $('#post-repost').val('1');
				             	 Honey.sendPost();
				             	 $(this).html('Posting...').removeClass('blue').addClass('gray');
			                }
			                return false;
			            });
			            $subButton.data('popover').$tip.find('a.dis-pop').click(function(e) {
			                e.preventDefault();
			                e.stopPropagation();
			                Honey.closePop();
			            });
	                } else {
		                Honey.closePop();
	                }
	            }
	        });
		},

		handleError: function(err, el){
			Honey.log(el);
			if (arguments.length > 1) {
				$(el).addClass('warning');
				// document.getElementById(el).className = 'warning';
			}
 			// for now
 			Honey.log(err);
		},

		clearError: function(el){
			// we listen to 'this' (bound above) and remove class from el onChange
			Honey.log('clearError');
			Honey.log(el);
			$(el).unbind();
			$(el).removeClass('warning');
		},

		loading: function(loading){
			if (loading) {
				//$('#submit').attr('disabled', 'disabled');
				$('#loading').addClass('in');
				//$('form').addClass('out');
			} else {
				//$('#submit').removeAttr('disabled');
				//$('form').removeClass('out');
				$('#loading').removeClass('in');
			}
		},

		log: function(message){
			if (typeof chrome !== 'undefined') { // chrome
				chrome.extension.getBackgroundPage().console.log(message);
			} else if (typeof safari !== 'undefined') { // safari
				console.log(message);
			}
		}

	};

	window.Honey = Honey;
	
	if (typeof chrome !== 'undefined') { // chrome
		document.addEventListener('DOMContentLoaded', function() { Honey.init() });
	} else if (typeof safari !== 'undefined') { // safari
		safari.application.addEventListener("popover", function(event){ Honey.init(event) }, true);
	}

	function getGlblConfig( prop ) {
		if ( typeof _glbl_config === "undefined" ) {
			return 0;
		}

		return _glbl_config[ prop ];
	} // getGlblConfig

})();
