define([
	'controller/GalleryController',
	'controller/ImageController',
	'util/Logger',
	'util/Configuration',
	'lib/jquery'
	
], function (
	GalleryController,
	ImageController,
	Logger,
	Configuration,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view,
			_gallery = {
				name: "",
				images: [],
			},
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

		function update (callback){

			ImageController.getEntries(function (data) {
				_images = data;

				var result = "<div>";
				result +=		"<div>" +
									"<div class='entry-title-edit'><input type='text' value='Input the gallery name'></input></div>" +
									"<ul class='imagelist'>";
		
				for (var i = 0; i < _images.length; i++) {					
										result += "<li><div class='image' id='" + _images[i].imageId + "'><img alt='' src='" + Configuration.get("API_URL") + "/images/" + _images[i].imageId + "'/><div></li>";
				}
				result +=			"</ul>" +
									"<div style='clear: both;'></div>" +
									"<div class='entry-post'>Post</div>" +
									"<div class='entry-cancel'>Cancel</div>"+
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-cancel").bind('click', function () {
					window.location.hash = "#admin/galleries";
				});

				_view.find(".entry-post").bind('click', function () {
					_gallery.name = _view.find('input').val();

					GalleryController.postEntry(_gallery, function (data) {

						update( function (){
							Logger.log("update gallery entries done");
							window.location.hash = "#admin/galleries";
						});
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
