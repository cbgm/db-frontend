define([
	'lib/i18n!mainview/nls/ModalView_strings',
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
		var _view,
			 first_time = true;

		_view = (function () {
			var $view = jQuery(
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

			$view.find('#back-to-top').on('click', function (e) {
				e.preventDefault();
				jQuery('#header').css('height',"0");
				jQuery('#header-base-container').css('display','none');
				jQuery('html,body').animate({ scrollTop: 51 }, 'slow');
			});

			return $view;
		})();

		//public functions
		this.setDummy = function (show) {

			if (show === false) {

				if (first_time === false) {
					jQuery('#header').css('height',"0");
					jQuery('#header-base-container').css('display','none');
					jQuery('#content-container').css('padding-top','120px');
					jQuery(window).scrollTop(51)
				}
				first_time = false;
			}
		}

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
