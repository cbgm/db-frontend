define([
    'controller/LoginController',
	'lib/jquery'
], function (
	LoginController,
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
					"<div id='navigation-shadowbox' class='admin'>" +
						"<div id='navigation-big'>" +
							"<div id='admin-logo'><img src='img/admin-logo.png' alt=''/></div>" +
							"<div class='list'>" +
								"<ul>" +
									"<li><a href='#admin/news'>#News</a></li>" +
									"<li><a href='#admin/tags'>#Tags</a></li>" +
									"<li><a href='#admin/projects'>#Projects</a></li>" +
									"<li><a href='#admin/guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/galleries'>#Galleries</a></li>" +
									"<li><a href='#admin/images'>#Images</a></li>" +
									"<li><a href='#news'></a></li>" +
									"<li><a class='user-logout'></a></li>" +
								"</ul>" +
							"</div>" +
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
									"<li><a id='bla' href='#admin/news'>#News</a></li>" +
									"<li><a href='#admin/tags'>#Tags</a></li>" +
									"<li><a href='#admin/projects'>#Projects</a></li>" +
									"<li><a href='#admin/guestbook'>#Guestbook</a></li>" +
									"<li><a href='#admin/galleries'>#Galleries</a></li>" +
									"<li><a href='#admin/images'>#Images</a></li>" +
									"<li><a href='#news'>#Visitor</a></li>" +
									"<li><a class='user-logout'>#Logout</a></li>" +
								"</ul>" +
							"</div>" +
						"</div>" +
					"</div>");
			
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
