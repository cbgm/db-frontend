define([
	'controller/GalleryController',
	'util/Logger',
	'lib/i18n!partialview/nls/GalleryView_strings',
	'lib/jquery'
], function (
	GalleryController,
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
			_gallery;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='gallery'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
			_view.find('#entries').empty();

			GalleryController.getEntries(function (data) {
				_gallery = data;

				_view.find('#entries').empty();

				var result = "<div>" +
								"<div class='entry-add'>" + Strings.add_button_text + "</div>";

				if (_gallery.length > 0) {

					//pages add
					for (var i = 0; i < _gallery.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _gallery[i].galleryId + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _gallery[i].name + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _gallery[i].galleryId + "'>" +
											"<div class='delete-text'>" + Strings.delete_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-edit' id='" + _gallery[i].galleryId + "'>" + Strings.edit_button_text + "</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
								
					}
				}
				result += "</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-delete").bind('click', function () {
					var galleryId = this.id;
					jQuery(this).attr("pointer-events", "none");
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					GalleryController.deleteEntry(galleryId, function (data) {

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

				_view.find(".entry-add").bind('click', function () {
					window.location.hash = "#admin/galleries/add";
				});

				_view.find(".entry-edit").bind('click', function () {
					var galleryId = this.id;
					window.location.hash = "#admin/galleries/" + galleryId;
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
