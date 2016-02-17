define([
	'lib/i18n!mainview/nls/FooterView_strings',
	'lib/jquery'
], function (
	Strings,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view;

		_view = (function () {
			var $view = jQuery(
					"<div id='footer'>" +
						"<div id='footer-overflow'>" +
							"<div id='like-container'>" +
								"<p>" + Strings.like_text + "</p>" +
								"<p>" + Strings.follow_text + "</p>" +
								"<div id='social-container'>" +
									"<div id='social-positioner'>" +
										"<div class='social-img-box'>" +
											"<a href='https://plus.google.com/103699542999127150153' target='_blank'><img src='img/googleplus-rnd.png' title='me on Google+' alt=''/></a>" +
										"</div>" +
										"<div class='social-img-box'>" +
											"<a href='https://www.xing.com/profile/Christian_Bergmann45' target='_blank'><img src='img/xing-rnd.png' title='me on Xing' alt=''/></a>" +
										"</div>" +
										"<div class='social-img-box'>" +
											"<a href='https://vimeo.com/user25141322' target='_blank'><img src='img/vimeo-rnd.png' title='me on Vimeo' alt=''/></a>" +
										"</div>" +
										"<div style='clear: both;'></div>" +
									"</div>" +
								"</div'>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

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
