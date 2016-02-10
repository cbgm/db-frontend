define([
	'controller/ImageController',
	'util/Logger',
	'lib/jquery'
], function (
		ImageController,
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
			_image = {
				name: "",
				dataUrl: ""
			},
			_images;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='image'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){

			ImageController.getEntries(function (data) {
				_images = data;

				if (_images.length > 0) {
					_view.find('#entries').empty();

					var result = "<div>" +
									"<div class='image-upload-preview'>" +
										"<div class='file-choose'>" +
											"<input type='file' id='imageLoader' name='imageLoader' accept='image/x-png, image/gif, image/jpeg' />" +
										"</div>" +
										"<div class='image-preview'>" +
											"<canvas id='imageCanvas' class='imageUploadPreview'></canvas>" +
										"</div>" +
										"<div class='image-show'>" +
											"<canvas id='imageCanvas' class='imageShowPreview'></canvas>" +
										"</div>" +
									"</div>" +
									"<div class='entry-add'>Upload Image</div>"; 

					for (var i = 0; i < _images.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _images[i].imageId + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _images[i].name + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _images[i].imageId + "'>Delete</div>" +
										"<div class='entry-show' id='" + _images[i].imageId + "'>Show</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
					}
					result += "</div>";

					_view.find('#entries').append(result);

					_view.find(".entry-delete").bind('click', function () {
						var imageId= this.id;
						jQuery(this).attr("pointer-events", "none");

						ImageController.deleteEntry(imageId, function (data) {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading images entries done");
							});
						});
					});

					_view.find(".entry-add").bind('click', function () {

						ImageController.postEntry(_image, function (data) {

							update( function (){
								Logger.log("reloading images entries done");
							});
						});
					});
					
					_view.find(".entry-show").bind('click', function () {
						var canvas = (_view.find(".imageShowPreview")).get(0);
						var ctx = canvas.getContext('2d');
						var imageObj = new Image();

						imageObj.onload = function() {
							ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
						};
						imageObj.src = "http://localhost:8080/backend/images/" + this.id;
					});
				} else {
					var result = "<div>" +
									"<label>Image File:</label><br/>" +
									"<input type='file' id='imageLoader' name='imageLoader'/>" +
									"<canvas style='width:80px;' id='imageCanvas'></canvas>" +
									"<div class='entry-add'>Upload Image</div>" +
								 "</div>";

					_view.find('#entries').append(result);

					_view.find(".entry-add").bind('click', function () {

						ImageController.postEntry(_image, function (data) {

							update( function (){
								Logger.log("reloading images entries done");
							});
						});
					});
				}

				_view.find("#imageLoader").on("change", function (e) {
					var reader = new FileReader();
					var canvas = (_view.find(".imageUploadPreview")).get(0);
					var ctx = canvas.getContext('2d');
					_image.name = e.currentTarget.files[0].name;

					reader.onload = function(event){
						var img = new Image();
						var canvasCopy = document.createElement("canvas");
						var copyContext = canvasCopy.getContext("2d");
						img.onload = function(){
							var ratio = 1;
							var maxWidth = 800;
							if(img.width > maxWidth)
								ratio = maxWidth / img.width;
							else if(img.height > maxHeight)
								ratio = maxHeight / img.height;

							canvasCopy.width = img.width;
							canvasCopy.height = img.height;
							copyContext.drawImage(img, 0, 0);

							canvas.width = img.width * ratio;
							canvas.height = img.height * ratio;
							ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);

							_image.dataUrl = canvas.toDataURL('image/png');
						}
						img.src = event.target.result;
					}
					reader.readAsDataURL(e.target.files[0]);
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
