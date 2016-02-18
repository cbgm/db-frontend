define([
	'lib/mobile-nav',
	'lib/i18n!mainview/nls/ModalView_strings',
	'lib/highlight',
	'lib/jquery'
], function (
	MobileNav,
	Strings,
	highlight,
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
								"<img src='img/logo4.png' alt=''/>" +
							"</div>" +
							"<div id='banner-slogan'>" +
								Strings.developer_text +
								"</br><span style='font-size: 0.8em;'>" + Strings.creative_text + "</span>" +
								"</br><span style='font-size: 0.7em;'>" + Strings.space_text + "</span>" +
//								"Because creativity is infinite" +
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
			contentContainer.find('.visitor pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});

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
