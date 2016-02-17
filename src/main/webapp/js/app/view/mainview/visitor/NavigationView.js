define([
	'util/Locale',
	'lib/search-cb',
	'lib/i18n!mainview/nls/NavigationView_strings',
	'lib/jquery'
], function (
	Locale,
	Search,
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
			_moved =false,
			_locales = Locale.getAvailableLocalizations();

		_view = (function () {
			var $view = jQuery(
					"<div id='navigation-shadowbox' class='visitor'>" +
						"<div id='navigation-big'>" +
							"<div id='visitor-logo'><img src='img/visitor-logo.png' alt=''/></div>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a href='#news'>" + Strings.news_button_text + "</a></li>" +
									"<li><a href='#about'>" + Strings.about_button_text + "</a></li>" +
									"<li><a href='#projects'>" + Strings.projects_button_text + "</a></li>" +
									"<li><a href='#guestbook'>" + Strings.guestbook_button_text + "</a></li>" +
									"<li><a href='#admin/news'></a></li>" +
									"<li><div id='search-box'><div><input type='text' id='text-search' placeholder='" + Strings.livesearch_placeholder_text + "' autofocus/><img alt='' src='img/search-icon.png'></div></div></li>" +
//									"<li class='locales' style='width: 100%; display: inline-block; color: rgb(87, 87, 87); line-height: 50px; vertical-align: middle; background: white none repeat scroll 0% 0%;'></li>" +
								"</ul>" +
							"</div>" +
							"<div class='locales locales-big'></div>" +
						"</div>" +
						"<div id='navigation-small'>" +
							"<div id='static-logo'><img src='img/visitor-logo.png' alt=''/></div>" +
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
									"<li><a id='bla' href='#news'>" + Strings.news_button_text + "</a></li>" +
									"<li><a href='#about'>" + Strings.about_button_text + "</a></li>" +
									"<li><a href='#projects'>" + Strings.projects_button_text + "</a></li>" +
									"<li><a href='#guestbook'>" + Strings.guestbook_button_text + "</a></li>" +
									"<li><a href='#admin/news'>" + Strings.admin_button_text + "</a></li>" +
									"<li class='locales locales-small'></li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>");

			

			jQuery('#navigation-container').addClass('bottom-shadow');
			$view.find('#navigation-small').mobileNavButton();
			$view.find('#search-box input').initSearch("#content-container");

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

			jQuery(window).bind('scroll', function () {
				var num = jQuery('#header-container').height();
				var currentScroll = jQuery(window).scrollTop()
				//back to top _moved herre because not to have two scroll binds
				if (jQuery(window).scrollTop() > 500 ) {
					jQuery('#back-to-top').addClass('show');
				} else {
					jQuery('#back-to-top').removeClass('show');
				}

				if (currentScroll > num) {

					if(!_moved){
						jQuery("#content-container").css('padding-top',"100px");
						_moved = true;
						var logo = jQuery("#visitor-logo");
						logo.show();
						logo.animate({'opacity':1},1500);
					}
					jQuery('#navigation-container').addClass('fixed');
					jQuery('#navigation-shadowbox').addClass('navigation-down');
				} else {

					if(_moved){
						_moved = false;
						var logo = jQuery("#visitor-logo");
						logo.hide();
						logo.css({'opacity':'0'});
					}
					jQuery('#navigation-container').removeClass('fixed');
					jQuery('#navigation-shadowbox').removeClass('navigation-down');
					jQuery("#content-container").css('padding-top',"0px");
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
