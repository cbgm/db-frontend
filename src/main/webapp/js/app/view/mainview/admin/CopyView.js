define([
	'lib/i18n!mainview/nls/CopyView_strings',
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
					"<div id='copy'>" +
						"<p id='copy-text'>Copyright &copy; " + new Date().getFullYear() + " &middot; " + Strings.rightsreserved_text + " &middot; <a href='http://creative--space.de/' >creative_</a>.</p>" +
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
