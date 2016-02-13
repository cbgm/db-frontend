define([
	'lib/jquery'
], function (
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
						"<p id='copy-text'>Copyright &copy; " + new Date().getFullYear() + " &middot; All Rights Reserved &middot; <a href='http://creative--space.de/' >creative_</a>.</p>" +
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
