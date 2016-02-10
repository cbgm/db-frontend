define([
	'controller/GalleryController',
	'util/Logger',
	'lib/jquery'
], function (
	GalleryController,
	Logger,
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
//			var entries;
			GalleryController.getEntries(function (data) {
				_gallery = data;

				if (_gallery.length > 0) {
					_view.find('#entries').empty();

					//pages add
					var result = "<div>" +
									"<div class='entry-add'>Add Gallery</div>";
					for (var i = 0; i < _gallery.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _gallery[i].galleryId + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _gallery[i].name + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _gallery[i].galleryId + "'>Delete</div>" +
										"<div class='entry-edit' id='" + _gallery[i].galleryId + "'>Edit</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
								
					}
					result += "</div>";;

					_view.find('#entries').append(result);

					_view.find(".entry-delete").bind('click', function () {
						var galleryId = this.id;
						jQuery(this).attr("pointer-events", "none");

						GalleryController.deleteEntry(galleryId, function (data) {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading guestbook entries done");
							});
						});
					});

					_view.find(".entry-add").bind('click', function () {
						window.location.hash = "#admin/galleries/add";
					});

					_view.find(".entry-edit").bind('click', function () {
						var galleryId = this.id;
						window.location.hash = "#admin/galleries/" + galleryId;
					});
				} else {
					_view.find('#entries').empty();

					//pages add
					var result = "<div>" +
									"<div class='entry-add'>Add Gallery</div>" +
								"</div>";

					_view.find('#entries').append(result);

					_view.find(".entry-add").bind('click', function () {
						window.location.hash = "#admin/galleries/add";
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
