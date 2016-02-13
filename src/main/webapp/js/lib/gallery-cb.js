define([
 	'lib/jquery'
 
], function (
	jQuery
) {
	'use strict';

	jQuery.fn.galleryInit = function() {
		var body = jQuery('body');
		var affectedElement;
		var galleryOverlay;
		var galleryButtons;
		var closeButton;
		var nextButton;
		var preButton;
		var imageHolder;
		var galleryModal;
		var galleryImage;
		var images;
		var affectedGallery;
		var currentIndex = 0;
		var gallerySize = 0;
		var pictureInfo;
		var waterMark = (window.location.href).indexOf("creative--space.de") === -1 ? true: false; 
		
//		if (jQuery(".gallery-overlay").length === 0) {
		jQuery(".gallery-overlay").remove();
		var result = "<div class='gallery-overlay'>" +
						"<div class='gallery-modal'>" +
							"<div class='gallery-image'>" +
								"<span class='helper'></span>" +
								"<img src= ''>" +
							"</div>" +
							"<div class='gallery-button-close'></div>" +
							"<div class='gallery-button-left'></div>" +
							"<div class='gallery-button-right'></div>" +
							"<div class='gallery-info'>" +
								"<div class='picture-info'>16/12</div>";
		if (waterMark) {
			result += 			"<div class='watermark-info'>powered by <a href='http://creative--space.de'>creative--space.de</a></div>";
		}
		result +=			"</div>" +
						"</div>" +
					"</div>";
		body.append(result);

		affectedElement = jQuery(this);
		galleryOverlay =  body.find(".gallery-overlay");
		closeButton =  body.find(".gallery-button-close");
		nextButton =  body.find(".gallery-button-right");
		preButton =  body.find(".gallery-button-left");
		imageHolder =  body.find(".gallery-image");
		galleryModal =  body.find(".gallery-modal");
		galleryImage =  body.find(".gallery-image img");
		pictureInfo =  body.find(".picture-info");

		body.find(".watermark").show();

//		}

		images = affectedElement.find("img");

		closeButton.bind("click", function () {
			galleryOverlay.fadeToggle( "slow");
		});

		jQuery(window).on('resize', function(){
			doSizing();
		});

		nextButton.bind("click", function () {

				if (currentIndex < gallerySize-1) {
					currentIndex ++;
					doImageFade(affectedGallery[currentIndex].src);
					pictureInfo.html((currentIndex+1) + " / " + gallerySize);
					return;
				} else {
					currentIndex = 0;
					doImageFade(affectedGallery[currentIndex].src);
					pictureInfo.html((currentIndex+1) + " / " + gallerySize);
					return;
				}
			
		});

		preButton.bind("click", function () {

				if (currentIndex > 0) {
					currentIndex --;
					doImageFade(affectedGallery[currentIndex].src);

					pictureInfo.html((currentIndex+1) + " / " + gallerySize);
					return;
				} else {
					currentIndex = gallerySize-1;
					doImageFade(affectedGallery[currentIndex].src);
					pictureInfo.html((currentIndex+1) + " / " + gallerySize);
					return;
				}
		});

		images.unbind("click");
		images.bind("click", function () {
			doSizing();
			galleryImage.attr("src", this.src);
			loadImages(this);
			findCurrentIndex(this);
			pictureInfo.html((currentIndex+1) + " / " + gallerySize);
			galleryOverlay.fadeToggle( "slow");
		});
		
		function loadImages (clickedImage) {
			var rel = jQuery(clickedImage).attr('rel');
			if (typeof rel !== "undefined") {
				affectedGallery = affectedElement.find("img[rel='" + rel + "']");
				gallerySize = affectedGallery.length;
				preButton.show();
				nextButton.show();
			} else {
				affectedGallery = clickedImage;
				gallerySize = 1;
				preButton.hide();
				nextButton.hide();
			}

		}

		function findCurrentIndex(clickedImage) {

			for (var i = 0; i < affectedGallery.length; i++ ) {

				if (affectedGallery[i].src === clickedImage.src) {
					currentIndex = i;
					return;
				}
			}
			currentIndex = 0;
		}

		function doSizing() {
			var browserwidth = jQuery(window).width();
			var browserheight = jQuery(window).height();
			var modalWidth = browserwidth * 0.8;
			var modalHeight = browserheight * 0.8;

			//modal
			galleryModal.css('height', modalHeight)
			.css('width', modalWidth);

			if (modalWidth > 370) {
				//image holder
				var imageHolderHeight = modalHeight * 0.8;
				var imageHolderWidth = modalWidth * 0.8; 
				var imageLeft = (modalWidth -imageHolderWidth) / 2;
				var imageTop = (modalHeight - imageHolderHeight) / 2;
				imageHolder.css('height', imageHolderHeight)
					.css('width', imageHolderWidth)
					.css('margin-left', imageLeft)
					.css('margin-top', imageTop);

				//image
				galleryImage.css('max-height', imageHolderHeight);
				galleryImage.css('max-width', imageHolderWidth);
				preButton.css('margin-left', imageLeft-10-30);
				nextButton.css('margin-right', imageLeft-10-27-30);
				preButton.css('position', 'relative');
				nextButton.css('position', 'relative');
			} else {
				//image holder
				var imageHolderHeight = modalHeight * 0.8;
				var imageHolderWidth = modalWidth * 0.8; 
				var imageLeft = (modalWidth -imageHolderWidth) / 2;
				var imageTop = (modalHeight - imageHolderHeight) / 2;
				imageHolder.css('height', imageHolderHeight)
					.css('width', imageHolderWidth)
					.css('margin-left', imageLeft)
					.css('margin-top', imageTop);

				//image
				galleryImage.css('max-height', imageHolderHeight);
				galleryImage.css('max-width', imageHolderWidth);
				preButton.css('left', 0);
				nextButton.css('right', 0);
				preButton.css('position', 'absolute');
				nextButton.css('position', 'absolute');
			}
		}

		function doImageFade(src) {
			galleryImage.fadeOut(function() { 
				jQuery(this).load(function() { jQuery(this).fadeIn(function () {}); }); 
			galleryImage.attr("src", src);
			}); 
		}
	}
	return this;
});