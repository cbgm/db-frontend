define([
	'controller/GuestbookController',
	'util/Logger',
	'lib/jquery-te',
	'lib/i18n!partialview/nls/GuestbookView_strings',
	'lib/jquery'
	
], function (
	GuestbookController,
	Logger,
	jqte,
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
			_guestbookEntry;

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
			var split = window.location.hash.split("/"); 
			var guestbookEntryId = split[split.length-1];

			GuestbookController.getEntry(guestbookEntryId, function (data) {
				_guestbookEntry = data;

					var result = "<div>";
						result +=	"<div>" +
										"<textarea class='entry-content'>" + _guestbookEntry.content + "</textarea>" +
										"<div class='entry-update'>" +
											"<div class='update-text'>" + Strings.update_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner white'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-cancel'>" + Strings.cancel_button_text + "</div>" +
									"</div>";

					result += "</div>";

					_view.find('#entries').append(result);
					_view.find('textarea').jqte();

					_view.find(".entry-cancel").bind('click', function () {
						window.location.hash = "#admin/guestbook";
					});

					_view.find(".entry-update").bind('click', function () {
						_guestbookEntry.content = _view.find('textarea').val();
						this.querySelector(".update-text").style.display = "none";
						this.querySelector(".loading-spinner").style.display = "block";

						GuestbookController.updateEntry(_guestbookEntry.guestbookEntryId, _guestbookEntry, function (data) {

							if (data === "OK") {
								window.location.hash = "#admin/guestbook";
							} else {
								_view.find(".update-text").css("display", "block");
								_view.find(".loading-spinner").css("display", "none");
							}
						});
					});
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
