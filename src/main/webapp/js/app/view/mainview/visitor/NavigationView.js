define([
	'lib/search-cb',
	'lib/jquery'
], function (
	Search,
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
					"<div id='navigation-shadowbox' class='visitor'>" +
						"<div id='navigation-big'>" +
							"<div id='visitor-logo'><img src='img/visitor-logo.png' alt=''/></div>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a href='#news'>#News</a></li>" +
									"<li><a href='#about'>#About</a></li>" +
									"<li><a href='#projects'>#Projects</a></li>" +
									"<li><a href='#guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/news'></a></li>" +
									"<li><div id='search-box'><div><input type='text' id='text-search' placeholder='live search' autofocus/><img alt='' src='img/search-icon.png'></div></div></li>" +
								"</ul>" +
							"</div>" +
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
									"<li><a id='bla' href='#news'>#News</a></li>" +
									"<li><a href='#about'>#About</a></li>" +
									"<li><a href='#projects'>#Projects</a></li>" +
									"<li><a href='#guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/news'>#Admin</a></li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>");

			var moved =false;

			function neonSign(logo, speed){
				var speed=100; 

				logo.animate({'opacity':0},speed,function(){
					logo.animate({'opacity':1},speed);
				});
			}

			jQuery('#navigation-container').addClass('bottom-shadow');
			$view.find('#navigation-small').mobileNavButton();
			$view.find('#search-box input').initSearch("#content-container");
			
			jQuery(window).bind('scroll', function () {
				var num = jQuery('#header-container').height();
				var currentScroll = jQuery(window).scrollTop()
				//back to top moved herre because not to have two scroll binds
				if (jQuery(window).scrollTop() > 500 ) {
					jQuery('#back-to-top').addClass('show');
				} else {
					jQuery('#back-to-top').removeClass('show');
				}

				if (currentScroll > num) {

					if(!moved){
						jQuery("#content-container").css('padding-top',"100px");
						moved = true;
						var logo = jQuery("#visitor-logo");
						logo.show();
						logo.animate({'opacity':1},1500);
					}
					jQuery('#navigation-container').addClass('fixed');
					jQuery('#navigation-shadowbox').addClass('navigation-down');
				} else {

					if(moved){
						moved = false;
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
