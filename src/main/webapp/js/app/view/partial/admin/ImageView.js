define([
	'controller/ImageController',
	'util/Logger',
	'util/Configuration',
	'lib/i18n!partialview/nls/ImageView_strings',
	'lib/jquery'
], function (
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

			_view.find('#entries').empty();
			
			ImageController.getEntries(function (data) {
				_images = data;

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
								"<div class='entry-add'>" +
									"<div class='upload-text'>" + Strings.add_button_text + "</div>" +
									"<div class='spinner-container'>" +
										"<div class='loading-spinner white'></div>" +
									"</div>" +
								"</div>"; 

				if (_images.length > 0) {

					for (var i = 0; i < _images.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _images[i].imageId + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _images[i].name + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _images[i].imageId + "'>" +
											"<div class='delete-text'>" + Strings.delete_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-show' id='" + _images[i].imageId + "'>" +
											"<div class='show-text'>" + Strings.show_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
					}
				} 

				result += 	"</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-delete").bind('click', function () {
					var imageId= this.id;
					jQuery(this).attr("pointer-events", "none");
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					ImageController.deleteEntry(imageId, function (data) {

						if (data === "OK") {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading images entries done");
							});
						} else {
							_view.find(".delete-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".entry-add").bind('click', function () {

					if (_image.dataUrl !== "") {
						this.querySelector(".upload-text").style.display = "none";
						this.querySelector(".loading-spinner").style.display = "block";

						ImageController.postEntry(_image, function (data) {

							if (data === "OK") {

								update( function (){
									Logger.log("reloading images entries done");
								});
							} else {
								_view.find(".upload-text").css("display", "block");
								_view.find(".loading-spinner").css("display", "none");
							}
						});
					}
				});

				_view.find(".entry-show").bind('click', function () {
					var canvas = (_view.find(".imageShowPreview")).get(0);
					var ctx = canvas.getContext('2d');
					var imageObj = new Image();
					this.querySelector(".show-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					imageObj.onload = function() {
						ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
						_view.find(".show-text").css("display", "block");
						_view.find(".loading-spinner").css("display", "none");
					};
					imageObj.src = Configuration.get("API_URL") + "/images/" + this.id;
				});

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
							var maxHeight = 800;
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
