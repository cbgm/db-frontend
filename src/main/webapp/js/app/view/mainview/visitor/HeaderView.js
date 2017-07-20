define([
	'util/Locale',
	'lib/language-switch',
	'lib/i18n!mainview/nls/HeaderView_strings',
	'lib/scroll-animation',
	'lib/jquery'
], function (
	Locale,
	LanguageSwitch,
	Strings,
	ScrollAnimation,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view,
			_locales = Locale.getAvailableLocalizations();

		_view = (function () {
			var $view = jQuery(
					"<div id='header'>" +
						"<div id='header-base-container'>" +
							"<div id='header-logo'><img src='img/logo4.png' alt='' style='max-width: 120px; height: 100%' title='creative--space.de'/></div>" +
//							"<div id='header-contact'><a class='envelope' href='#'></a></div>" +
							"<div id='header-link-container'>" +
								"<div id='header-social-container'>" +
									"<a href='https://plus.google.com/103699542999127150153' target='_blank'><img src='img/googleplus-rnd-white.png' title='" + Strings.google_tip_text + "' alt=''/></a>" +
									"<a href='https://github.com/cbgm' target='_blank'><img src='img/github-rnd.png' title='" + Strings.github_tip_text + "' alt=''/></a>" +
									"<a href='https://plus.google.com/103699542999127150153' target='_blank'><img src='img/xing-rnd-white.png' title='" + Strings.xing_tip_text + "' alt=''/></a>" +
								"</div>" +
								"<div class='locales'></div>" +
							"</div>" +
							"<div class='noselect' id='header-phrase-container-sizer'>" +
								"<div id='phrase-container-sizer-left'>" +
//										"<img src='img/me.png' alt='' style='max-width: 200px; height: 100%'/>" +
								"</div>" +
								"<div id='phrase-container-sizer-right'>" +
									"<div id='sizer-right-container'>" +
										"<div id='sizer-right-container-heading'>" + Strings.shout_text + "</div>" +
											"<div id='sizer-right-container-words'>" +
												"<span>" + Strings.creative_text + "</span>" +
												"<span>" + Strings.developer_text + "</span>" +
												"<span>" + Strings.solver_text + "</span>" +
												"<span>" + Strings.right_text + "</span>" +
											"</div>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
//							"<div id='header-contact-container'>Contact</div>" +
						"</div>" +
					"</div>");

			$view.find('.locales').languageSwitchButton();

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
