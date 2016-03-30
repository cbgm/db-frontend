define([
	'lib/i18n!partialview/nls/ImprintView_strings',
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
						"<div id='content-spacer' class='about'>" +
							Strings.imprint_text +
						"</div>" +
					"</div>");

			$view.galleryInit(null);
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
