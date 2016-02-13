define([
	'controller/GuestbookController',
	'util/Logger',
	'util/Captcha',
	'lib/jquery'
], function (
	GuestbookController,
	Logger,
	Captcha,
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
								"<a class='prePage specialColor'>&#9664; older</a><a id='expand-new-entry-button' class='specialColor'>New entry &#9660;</a><a class='nextPage specialColor'>newer &#9654;</a>" +
								"<div id='new-entry-container' class='section'>" +
									"<div id='entry-form-container'>" +
										"<form class='entry-form' onsubmit='return false' autocomplete='on'>" +
											"<table>" +
												"<tr>" +
													"<td>" +
														"<input class='entry-name' name='author' type='text' placeholder='John Doe' pattern='.{3,}' required/>" +
													"</td>" +
												"</tr>" +
												"<tr>" +
													"<td>" +
														"<textarea class='entry-text' name='content' placeholder='Write something to me' required/>" +
													"</td>" +
												"</tr>" +
												"<tr>" +
													"<td style='text-align:right;'>" +
														"<input class='submit-entry' type='submit' value='Send' />" +
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
								"<a class='prePage specialColor'>&#9664; older</a><a class='nextPage specialColor'>newer &#9654;</a>" +
							"</div>" +
							"<div style='clear:both;'></div>" +
						"</div>" +
					"</div>");
			$view.find(".entry-form").captcha();

//			$view.find(".entry-name").keydown(function(e) {
//				var key = e.key;
//				key = key.replace(/[^a-zA-Z-äöüÄÖÜéàèÉÈß ]+/g,"");
//				if (key == "") {
//
//					e.preventDefault();
//					var position = this.selectionStart;
//					var field = this;
//					var value = field.value;
//
//					if (value.length == 0) {
//						value += key;
//					} else {
//						value = [value.slice(0, position), key, value.slice(position)].join('');
//					}	
//					$view.find(".entry-name").val(value);
//				}
//			});

//			$view.find(".entry-text").keydown(function(e) {
//				var key = e.key;
//				key = key.replace(/[^a-zA-Z-äöüÄÖÜéàèÉÈß,:/'". \d-#+]+/g,"");
//
//				if (key == "") {
//					e.preventDefault();
//					var position = this.selectionStart;
//					var field = this;
//					var value = field.value;
//
//					if (value.length == 0) {
//						value += key;
//					} else {
//						value = [value.slice(0, position), key, value.slice(position)].join('');
//					}
//					$view.find(".entry-text").val(value);
//				}
//
//			});

			$view.find(".entry-form").bind('submit', function () {
				var form = $view.find(".entry-form");
				var data = form.serializeArray();
//				data[0].value =  data[0].value.replace(/[^a-zA-Z-äöüÄÖÜéàèÉÈß ]+/g,"");
//				data[1].value =  data[1].value.replace(/[^a-zA-Z-äöüÄÖÜéàèÉÈß,:/'". \d-#+]+/g,"");

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

//			var result = updateEntries();
			$view.find("#expand-new-entry-button").on('click', function () {
				var button = jQuery(this);
				var content = $view.find("#new-entry-container");

				content.slideToggle(500, function () {

					button.html(function () {
						return content.is(":visible") ? "New entry &#9650;" : "New entry &#9660;";
					});
				});

			});

			$view.find(".nextPage").on('click', function () {

				if(!_preEnd){

					if (_nextEnd) {
						_nextEnd =false;
					}
					--_currentPage;

					update(_currentPage, function (){
						Logger.log("reloading guestbook entries done");
					});
				}
			});

			$view.find(".prePage").on('click', function () {

				if(!_nextEnd){

					if (_preEnd) {
						_preEnd =false;
					}
					++_currentPage;

					update(_currentPage, function (){
						Logger.log("reloading guestbook entries done");
					});
				}
			});
			return $view;
		})();

		function update (page, callback){

			GuestbookController.getPaginatedEntries(page, function (data) {
				_guestbook = data;

				if (_guestbook.length === 0) {
					_nextEnd = true;
					_currentPage--;
				}

				if (_guestbook.length < 20) {
					_nextEnd = true;
				}

				if (_currentPage === 1) {
					_preEnd = true;
				}

				if (_guestbook.length > 0) {
					_view.find('#entries').empty();
					//set pages count
					var result = "";
					//pages add
					for (var i = 0; i <_guestbook.length; i++) {
						result +=	"<div class='entry'>" +
										"<div>" +
											"<div style='float: left; font-weight: bold;'>" + _guestbook[i].guestbookEntryId + ".&nbsp;&nbsp;&nbsp;&nbsp;Author: " + _guestbook[i].author + "</div>" +
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
