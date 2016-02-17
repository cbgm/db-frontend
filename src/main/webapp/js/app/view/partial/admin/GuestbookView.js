define([
	'controller/GuestbookController',
	'util/Logger',
	'lib/i18n!partialview/nls/GuestbookView_strings',
	'lib/jquery'
], function (
	GuestbookController,
	Logger,
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
//			pages,
//			currentPage = 1,
//			lastPageEntryCount = 0,
//			preEnd = false,
//			nextEnd = false,
			_guestbook;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='guestbook'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
//			var entries;
			GuestbookController.getEntries(function (data) {
				_guestbook = data;

				if (_guestbook.length > 0) {
					_view.find('#entries').empty();

					//pages add
					var result = "<div>";
					for (var i = 0; i < _guestbook.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _guestbook[i].guestbookEntryId + "</div>" +
										"<div class='entry-author'>" + 
											"<div>" + _guestbook[i].author + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _guestbook[i].guestbookEntryId + "'>" +
											"<div class='delete-text'>" + Strings.delete_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-edit' id='" + _guestbook[i].guestbookEntryId + "'>" + Strings.edit_button_text + "</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
					}
					result += "</div>";

					_view.find('#entries').append(result);

					_view.find(".entry-delete").bind('click', function () {
						var guestbookEntryId = this.id;
						jQuery(this).attr("pointer-events", "none");
						this.querySelector(".delete-text").style.display = "none";
						this.querySelector(".loading-spinner").style.display = "block";

						GuestbookController.deleteEntry(guestbookEntryId, function (data) {

							if (data === "OK") {

								update( function (){
									jQuery(this).attr("pointer-events", "auto");
									Logger.log("reloading guestbook entries done");
								});
							} else {
								_view.find(".delete-text").css("display", "block");
								_view.find(".loading-spinner").css("display", "none");
							}
						});
					});

					_view.find(".entry-edit").bind('click', function () {
						var guestbookEntryId = this.id;
						window.location.hash = "#admin/guestbook/" + guestbookEntryId;
					});
				}
				callback();
			});
		}

		this.updateEntries = function (callback){

			update(function () {
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
