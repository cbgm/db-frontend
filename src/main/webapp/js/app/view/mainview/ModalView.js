define([
	'lib/mobile-nav',
	'lib/jquery'
], function (
	MobileNav,
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
					"<div id='banner-container'>" +
						"<div id='banner'>" +
							"<div id='banner-logo'>" +
								"<img src='img/logo-test2.png' alt=''/>" +
							"</div>" +
							"<div id='banner-slogan'>" +
//								"I'm a <a style='color:white;' href='http://en.wikipedia.org/wiki/Developer'><span style='background:grey;'>developer</span></a> !<a style='color:white;' href='http://en.wikipedia.org/wiki/Designer'><span style='background:grey;'>designer</span></a>" +
//								"</br><span style='font-size: 0.8em;'>...but pretty much creative</span>" +
//								"</br><span style='font-size: 0.7em;'>...and this is my <b>_</b></span>" +
								"Because creativity is infinite" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div id='wrapper'>" +
						"<div id='header-container'>" +
						"</div>" +
						"<div id='navigation-container' class='bottom-shadow'>" +
						"</div>" +
						"<div id='content-container'>" +
						"</div>" +
						"<div id='footer-container'>" +
						"</div>" +
						"<div id='copy-container'>" +
						"</div>" +
						"<a href='#' id='back-to-top' title='Back to top'>&uarr;</a>" +
					"</div>");

			return $view;
		})();

		//public functions
		this.appendCopy = function (copy) {
			var copyContainer = _view.find('#copy-container');

			if (copy === null) {
				copyContainer.empty();
				return;
			}
			copyContainer.empty();
			copyContainer.append(copy.get());
		};

		this.appendFooter = function (footer) {
			var footerContainer = _view.find('#footer-container');

			if (footer === null) {
				footerContainer.empty();
				return;
			}
			footerContainer.empty();
			footerContainer.append(footer.get());
		};

		this.appendHeader = function (header) {
			var headerContainer = _view.find('#header-container');

			if (header === null) {
				headerContainer.empty();
				return;
			}
			headerContainer.empty();
			headerContainer.append(header.get());
		};
		
		this.appendNavigation = function (navigation) {
			var navigationContainer = _view.find('#navigation-container');

			if (navigation === null) {
				navigationContainer.empty();
				return;
			}
			navigationContainer.empty();
			navigationContainer.append(navigation.get());
		};
		
		this.appendContent = function (content) {
			var contentContainer = _view.find('#content-container');

			if (content === null) {
				contentContainer.empty();
				return;
			}
			contentContainer.empty();
			contentContainer.append(content.get());
		};

		this.get = function () {
			_view.find('#back-to-top').on('click', function (e) {
				e.preventDefault();
				jQuery('html,body').animate({
					scrollTop: 0
				}, 700);
			});
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
