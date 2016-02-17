define([
	'lib/i18n!partialview/nls/ErrorView_strings',
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
									"<p id='error-code'><b>" + Strings.errorhead_text + "</b></p>" +
									"<dl>" +
										"<dt id='error-description'>" + Strings.errordescription_text + "</dt>" +
										"<dd>" +
											"<ul >" +
												"<li>" + Strings.errorhint_text + "</li>" +
												"<li>" + Strings.errorhint2_text + "</li>" +
												"<li>" + Strings.errorhint3_text + "</li>" +
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
