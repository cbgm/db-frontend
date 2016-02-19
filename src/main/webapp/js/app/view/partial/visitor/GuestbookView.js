define([
	'controller/GuestbookController',
	'util/Logger',
	'util/Captcha',
	'lib/i18n!partialview/nls/GuestbookView_strings',
	'lib/jquery'
], function (
	GuestbookController,
	Logger,
	Captcha,
	Strings,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view,
			_pages,
			_currentPage = 1,
			_lastPageEntryCount = 0,
			_preEnd = false,
			_nextEnd = false,
			_guestbook;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='guestbook'>" +
							"<div id='entry-navigation-top' class='section'>" +
								"<a id='expand-new-entry-button' class='specialColor'>" + Strings.newentry_button_text + " &#9660;</a>" +
								"<div id='new-entry-container' class='section'>" +
									"<div id='entry-form-container'>" +
										"<form class='entry-form' onsubmit='return false' autocomplete='on'>" +
											"<table>" +
												"<tr>" +
													"<td>" +
														"<input class='entry-name' name='author' type='text' placeholder='" + Strings.author_placeholder_text + "' pattern='.{3,}' required/>" +
													"</td>" +
												"</tr>" +
												"<tr>" +
													"<td>" +
														"<textarea class='entry-text' name='content' placeholder='" + Strings.content_placeholder_text + "' required/>" +
													"</td>" +
												"</tr>" +
												"<tr>" +
													"<td style='text-align:right;'>" +
														"<input class='submit-entry' type='submit' value='" + Strings.send_button_text + "' />" +
													"</td>" +
												"</tr>" +
											"</table>" +
										"</form>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<div style='clear:both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div id='entry-navigation-bottom' class='section'>" +
								"<div id='center-box'>" +
									"<div id='spinner-holder'>" +
										"<div class='spinner-container'>" +
											"<div class='loadmore-spinner'></div>" +
										"</div>" +
									"</div>" +
									"<a class='loadMore'><span class='plus'>+</span>" + Strings.loadmore_button_text + "</a>" +
								"</div>" +
							"</div>" +
							"<div style='clear:both;'></div>" +
						"</div>" +
					"</div>");
			$view.find(".entry-form").captcha();

			$view.find(".entry-form").bind('submit', function () {
				var form = $view.find(".entry-form");
				var data = form.serializeArray();

				GuestbookController.postEntry (data, function (data) {
					_currentPage = 1;
					_preEnd = false;
					_nextEnd = false;
					form[0].reset();
					update(_currentPage, function (){
						Logger.log("reloading guestbook entries done");
						var content = $view.find("#new-entry-container");
						var button = $view.find("#expand-new-entry-button");
						content.slideToggle(500, function () {

							button.html(function () {
								return content.is(":visible") ? "New entry &#9650;" : "New entry &#9660;";
							});
						});
					});
				});
			});

			$view.find("#expand-new-entry-button").on('click', function () {
				var button = jQuery(this);
				var content = $view.find("#new-entry-container");

				content.slideToggle(500, function () {

					button.html(function () {
						return content.is(":visible") ? "" + Strings.newentry_button_text + " &#9650;" : "" + Strings.newentry_button_text + " &#9660;";
					});
				});

			});

			$view.find(".loadMore").on('click', function () {

				if(!_nextEnd){
					++_currentPage;
					$view.find(".plus").hide();
					$view.find("#spinner-holder").css("display", "inline-block");
					update(_currentPage, function (){
						Logger.log("reloading news entries done");
						$view.find("#spinner-holder").css("display", "none");
						$view.find(".plus").show();
					});
				}
			});
			return $view;
		})();

		function update (page, callback){

			GuestbookController.getPaginatedEntries(page, function (data) {
				_guestbook = data;
				_view.find("#entry-navigation-bottom").css("display", "inline-block");

				if (typeof _news !== "undefined") {
					_guestbook = _guestbook.concat(data);
				} else {
					_guestbook = data;
				}

				if (_guestbook.length === 0) {
					_nextEnd = true;
					_currentPage--;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (_guestbook.length < 15) {
					_nextEnd = true;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (_guestbook.length > 0) {
					//set pages count
					var result = "";
					//pages add
					for (var i = 0; i <_guestbook.length; i++) {
						result +=	"<div class='entry'>" +
										"<div>" +
											"<div style='float: left; font-weight: bold;'>" + _guestbook[i].guestbookEntryId + ".&nbsp;&nbsp;&nbsp;&nbsp;" + Strings.author_text + ": " + _guestbook[i].author + "</div>" +
											"<div style='float: right; font-weight: bold;'>" + _guestbook[i].date + "</div>" +
													"<div style='clear: both;'></div>" +
										"</div>" +
										"<div class='section'>" + _guestbook[i].content + "</div>" +
									"</div>";
					}
					_view.find('#entries').append(result);
				}
				callback();
			});
		}

		this.updateEntries = function (callback){

			update(_currentPage, function () {
				callback();
			});
		}

		this.get = function () {
			return _view;
		};

		this.hide = function () {
			_view.hide();
		};

		this.show = function () {
			_view.show();
		};
	};
});
