define([
	'util/Locale',
	'controller/LoginController',
	'lib/i18n!mainview/nls/NavigationView_strings',
	'lib/jquery'
], function (
	Locale,
	LoginController,
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
			_locales = Locale.getAvailableLocalizations();

		_view = (function () {
			var $view = jQuery(
					"<div id='navigation-shadowbox' class='admin'>" +
						"<div id='navigation-big'>" +
							"<div id='admin-logo'><img src='img/admin-logo.png' alt=''/></div>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a href='#admin/news'>" + Strings.news_button_text + "</a></li>" +
									"<li><a href='#admin/tags'>" + Strings.tags_button_text + "</a></li>" +
									"<li><a href='#admin/projects'>" + Strings.projects_button_text + "</a></li>" +
//									"<li><a href='#admin/guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/galleries'>" + Strings.galleries_button_text + "</a></li>" +
									"<li><a href='#admin/images'>" + Strings.images_button_text + "</a></li>" +
									"<li><a href='#admin/users'>" + Strings.users_button_text + "</a></li>" +
									"<li><a href='#news'></a></li>" +
									"<li><a class='user-logout'></a></li>" +
								"</ul>" +
							"</div>" +
							"<div class='locales locales-big'></div>" +
						"</div>" +
						"<div id='navigation-small'>" +
							"<div id='admin-logo'><img src='img/admin-logo.png' alt=''/></div>" +
							"<div id='navigation-small-button'>" +
								"<div id='navigation-small-stripe-container'>" +
									"<div class='navigation-small-stripe'></div>" +
									"<div class='navigation-small-stripe'></div>" +
									"<div class='navigation-small-stripe'></div>" +
								"</div>" +
							"</div>" +
							"<div id='navigation-small-divider'></div>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a id='bla' href='#admin/news'>" + Strings.news_button_text + "</a></li>" +
									"<li><a href='#admin/tags'>" + Strings.tags_button_text + "</a></li>" +
									"<li><a href='#admin/projects'>" + Strings.projects_button_text + "</a></li>" +
//									"<li><a href='#admin/guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/galleries'>" + Strings.galleries_button_text + "</a></li>" +
									"<li><a href='#admin/images'>" + Strings.images_button_text + "</a></li>" +
									"<li><a href='#admin/users'>" + Strings.users_button_text + "</a></li>" +
									"<li><a href='#news'>" + Strings.visitor_button_text + "</a></li>" +
									"<li><a class='user-logout'>" + Strings.logout_button_text + "</a></li>" +
									"<li class='locales locales-small'></li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>");

			for (var i = 0; i < _locales.length; i++) {

				if (i > 0) {
					$view.find('.locales').append("<span class='locale-delimiter'>|</span>");
				}

				var $localeButton = jQuery("<span class='locale-button'>" + _locales[i].toUpperCase() + "</span>")
						.on('click', (function (locale) {
							return function () {
								Locale.setLocale(locale);
							}
						})(_locales[i]));

				$view.find('.locales').append($localeButton);
			}

			$view.find(".user-logout").bind('click', function () {
				LoginController.doLogout(function (data) {

					if (data === "OK") {
						window.location.hash = "#news"
					}
				});	
			});

			var moved =false;
			jQuery('#navigation-container').addClass('bottom-shadow');
			$view.find('#navigation-small').mobileNavButton();
			jQuery(window).bind('scroll', function () {
				var num = jQuery('#header-container').height();

				if (jQuery(window).scrollTop() > num) {

					if(!moved){
						moved = true;

					}
					jQuery('#navigation-container').addClass('fixed');
				} else {

					if(moved){
						moved = false;
					}
					jQuery('#navigation-container').removeClass('fixed');

				}
			});
			

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
