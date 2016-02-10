define([
	'lib/i18n!partialview/nls/AboutView_strings',
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
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='error'>" +
							"<div id='error-holder'>" +
								"<div id='error-text'>" +
									"<p id='error-code'><b>404 Error</b></p>" +
									"<dl>" +
										"<dt id='error-description'>The page you requested was not found, and I have a fine guess why.</dt>" +
										"<dd>" +
											"<ul >" +
												"<li>If you typed the URL directly, please make sure the spelling is correct.</li>" +
												"<li>If you clicked on a link to get here, the link is outdated.</li>" +
												"<li>If the link you clicked to get here included '.html' on the end, delete that and try again.</li>" +
											"</ul>" +
										"</dd>" +
									"</dl>" +
								"</div>" +
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
