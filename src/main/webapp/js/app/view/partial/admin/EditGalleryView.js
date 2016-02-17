define([
	'controller/GalleryController',
	'controller/ImageController',
	'util/Logger',
	'util/Configuration',
	'lib/i18n!partialview/nls/GalleryView_strings',
	'lib/jquery'
	
], function (
	GalleryController,
	ImageController,
	Logger,
	Configuration,
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
			_gallery,
			_images;

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

		function findImage(id) {

			for (var z = 0; z < _images.length; z++) {

				if (_images[z].imageId === id) {
					return _images[z];
				}
			}
		}

		function hightlightImages() {

			for (var z = 0; z < _gallery.images.length; z++) {
				var image = findImage(_gallery.images[z].imageId);
				if (image !== null) {
					_view.find("#" + image.imageId + "").css('border-color', '#498388');
				}
			}
		}
		
		function update (callback){
			var split = window.location.hash.split("/"); 
			var galleryId = split[split.length-1];

			GalleryController.getEntry(galleryId, function (data1) {

				ImageController.getEntries(function (data2) {
					_gallery = data1;
					_images = data2;

					var result = "<div>";
						result +=	"<div>" +
										"<ul class='imagelist'>";
						
					for (var i = 0; i < _images.length; i++) {					
											result += "<li><div class='image' id='" + _images[i].imageId + "'><img alt='' src='" + Configuration.get("API_URL") + "/images/" + _images[i].imageId + "'/><div></li>";
					}
					result +=			"</ul>" +
										"<div style='clear: both;'></div>" +
										"<div class='entry-update'>" +
											"<div class='update-text'>" + Strings.update_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner white'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-cancel'>" + Strings.cancel_button_text + "</div>" +
										"<div style='clear: both;'></div>" +
									"</div>" +
								"</div>";

					_view.find('#entries').append(result);

					//higtlight images

					hightlightImages();

					_view.find(".entry-cancel").bind('click', function () {
						window.location.hash = "#admin/galleries";
					});

					_view.find(".entry-update").bind('click', function () {
						this.querySelector(".update-text").style.display = "none";
						this.querySelector(".loading-spinner").style.display = "block";

						GalleryController.updateEntry(_gallery.galleryId, _gallery, function (data) {

							if (data === "OK") {

								update( function (){
									Logger.log("update gallery entry done");
									window.location.hash = "#admin/galleries";
								});
							} else {
								_view.find(".update-text").css("display", "block");
								_view.find(".loading-spinner").css("display", "none");
							}
						});
					});

					_view.find(".image").bind('click', function () {
						var imageId = parseInt(this.id);

						for (var i = 0; i < _gallery.images.length; i++) {

							if (imageId === _gallery.images[i].imageId) {
								jQuery("#" + imageId + "").css('border-color', '#E3E3E3 ');
								_gallery.images.splice(i, 1);
								return;
							}

							if (i == _gallery.images.length-1) {
								_gallery.images.push(findImage(imageId));
								jQuery("#" + imageId + "").css('border-color', '#498388');
								return;
							}
						}

						if (_gallery.images.length === 0) {
							_gallery.images.push(findImage(imageId));
							jQuery("#" + imageId + "").css('border-color', '#498388');
							return;
						}
					});
					callback();
				});
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
