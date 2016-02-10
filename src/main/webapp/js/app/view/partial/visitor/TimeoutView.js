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
									"<p id='error-code'><b>Server Error</b></p>" +
									"<dl>" +
										"<dt id='error-description'>Something went totally wrong, there was no response from the server.</dt>" +
										"<dd>" +
											"<ul >" +
												"<li>Please try again in a while or contact the administrator.</li>" +
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
