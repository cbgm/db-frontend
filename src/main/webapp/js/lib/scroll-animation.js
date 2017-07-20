define([
	'lib/jquery'
], function (
	jQuery
) {
	'use strict';

	var inside = false,
		elements;

	jQuery.fn.scrollAnimationInit = function() {
		elements = jQuery(this).find('.animate');
		jQuery(elements).addClass('hide');
		requestAnimate(this);

		jQuery(document).scroll(function() {
			if (inside === false) {
				requestAnimate(this);
			}
		});

		function prepareElements(elements) {
			var ar = [];

			for (var i = 0; i < elements.length; i++) {
//				jQuery(elements).addClass('hide');
				elements[i].setAttribute('animation-id', i)
				
				var top_of_element = jQuery(elements[i]).offset().top;
				var bottom_of_element = jQuery(elements[i]).offset().top + jQuery(elements[i]).outerHeight();
				var id = elements[i].getAttribute("animation-id");
				var animation_type = elements[i].getAttribute("data-animation")

				var obj = {
					el : elements[i],
					id : id,
					animation_type : animation_type,
					top_of_element : top_of_element,
					bottom_of_element : bottom_of_element
				};

				ar.push(obj);
			}
			return ar;
		}

		function elementInView(el) {
			var bottom_of_screen = jQuery(window).scrollTop() + jQuery(window).height();
			var top_of_screen = jQuery(window).scrollTop();

			if ((bottom_of_screen > el.top_of_element) && (top_of_screen < el.bottom_of_element) && !jQuery(el).hasClass(el.animation_type)) {
				return true;
			}
			return false;
		}

		function doAnimate(element) {
			var elements = jQuery(element).find('.animate');
			var ar = prepareElements(elements);

			for (var i = 0; i < ar.length; i++) {

				if (elementInView(ar[i])) {
					inside = true;
					jQuery('[animation-id="' + ar[i].id + '"]').addClass(ar[i].animation_type);
					jQuery('[animation-id="' + ar[i].id + '"]').removeClass('hide');
				} else {
//					jQuery('[animation-id="' + ar[i].id + '"]').removeClass(ar[i].animation_type);
//					jQuery('[animation-id="' + ar[i].id + '"]').addClass('hide');
				}
			}
			inside = false;
		}

		function requestAnimate(obj) {
			requestAnimationFrame(function () {
				doAnimate(obj);
			});
		}
	}

	return this;
});
