define([
	'lib/search-cb',
	'lib/i18n!mainview/nls/NavigationView_strings',
	'lib/jquery'
], function (
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
			_moved =false;

		_view = (function () {
			var $view = jQuery(
					"<div id='navigation-shadowbox' class='visitor'>" +
						"<div id='navigation'>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a href='#about'>" + Strings.home_button_text + "</a></li>" +
									"<li><a href='#news'>" + Strings.blog_button_text + "</a></li>" +
									"<li><a href='#projects'>" + Strings.projects_button_text + "</a></li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>");

			var location = window.location.hash;
			var highlightButton = "";

			if (location.indexOf("about") !== -1) {
				highlightButton = "#about";
			} else if (location.indexOf("projects") !== -1) {
				highlightButton = "#projects";
			} else if (location.indexOf("news") !== -1) {
				highlightButton = "#news";
			} else {
				highlightButton = "#none";
			}

			$view.find("#navigation a[href=" + highlightButton + "]").addClass('active-link');


			jQuery('#navigation-container').addClass('bottom-shadow');
			$view.find('#search-box input').initSearch("#content-container");

			$view.find("#navigation a").bind('click' , function() {
				var href = this.hash;
				jQuery("#navigation a").removeClass('active-link');
				jQuery("#navigation a[href=" + href + "]").addClass('active-link');
			});

			jQuery(window).bind('scroll', function () {
				var num = jQuery('#header-container').height();
				var currentScroll = jQuery(window).scrollTop();
				//back to top _moved here because not to have two scroll binds
				if (jQuery(window).scrollTop() > 500 ) {
					jQuery('#back-to-top').addClass('show');
				} else {
					jQuery('#back-to-top').removeClass('show');
				}
				//hiding header_moved here because not to have two scroll binds
				if (jQuery(window).scrollTop() > 50 ) {
					jQuery('#header').css('height',"0");
					jQuery('#header-base-container').css('display','none');
					jQuery("#navigation-container").css('margin-top','0px');
					jQuery("#navigation-container").css('background-color', 'white');
				} else {
					jQuery('#header').css('height',"auto");
					jQuery('#header-base-container').css('display','flex');
					jQuery("#navigation-container").css('margin-top','-54px');
					jQuery("#navigation-container").css('margin-top','-54px');
					jQuery("#navigation-container").css('background-color', 'rgba(255, 255, 255, 0.7)');
				}

				if (currentScroll > num) {

					if(!_moved){
						jQuery('#navigation-shadowbox').css('border-bottom','1px solid #01484F');
						_moved = true;
					}
					jQuery('#navigation-container').addClass('fixed');
				} else {

					if(_moved){
						_moved = false;
					}
					jQuery('#content-container').css('padding-top','180px');
					jQuery('#navigation-container').removeClass('fixed');
					jQuery('#search-box').css('visibility','hidden');
					jQuery('#navigation-shadowbox').css('border-bottom','3px solid #01484F');
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
