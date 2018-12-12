define([
	'lib/i18n!mainview/nls/FooterView_strings',
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
					"<div id='footer'>" +
						"<div id='footer-personal'>" +
							"<div id='contact-container'>" +
								"<p>" + Strings.contact_head_text +"</p>" +
								"<div>" + Strings.work_with_text +"</div>" +
								"<a id='mailto-hint' class='noselect' href='mailto:christian.bergmann@kunstadt.de'>" + Strings.write_me_text +"<img src='img/envelope-icon.png' alt=''/></a>" +
							"</div>" +
							"<div id='sitemap-container'>" +
								"<p>" + Strings.nav_head_text +"</p>" +
								"<ul>" +
									"<li><a href='#about'>" + Strings.home_link_text +"</a></li>" +
									"<li><a href='#news'>" + Strings.blog_link_text +"</a></li>" +
									"<li><a href='#projects'>" + Strings.projects_link_text +"</a></li>" +
								"</ul>" +
							"</div>" +
							"<div id='social-container'>" +
								"<p>" + Strings.social_head_text +"</p>" +
								"<div class='social-img-box'>" +
									"<a href='https://plus.google.com/103699542999127150153' target='_blank'><img src='img/googleplus-rnd.png' title='" + Strings.google_tip_text +"' alt=''/></a>" +
								"</div>" +
								"<div class='social-img-box'>" +
									"<a href='https://github.com/cbgm' target='_blank'><img src='img/github-rnd.png' title='" + Strings.github_tip_text +"' alt=''/></a>" +
								"</div>" +
								"<div class='social-img-box'>" +
									"<a href='https://www.xing.com/profile/Christian_Bergmann45' target='_blank'><img src='img/xing-rnd.png' title='" + Strings.xing_tip_text +"' alt=''/></a>" +
								"</div>" +
							"</div>" +
						"</div>" +
//						"<div id='footer-tech'>" +
//							"<a target='_blank' href='https://jquery.com/' class='tech-img-box'>" +
//								"<img src='img/jquery-logo.png' alt=''/>" +
//							"</a>" +
//							"<a target='_blank' href='http://hibernate.org/' class='tech-img-box'>" +
//								"<img src='img/hibernate-logo.png' alt=''/>" +
//							"</a>" +
//							"<a target='_blank' href='https://spring.io/' class='tech-img-box'>" +
//								"<img src='img/spring-logo.png' alt=''/>" +
//							"</a>" +
//							"<a target='_blank' href='http://requirejs.org/' class='tech-img-box'>" +
//								"<img src='img/require-logo.png' alt=''/>" +
//							"</a>" +
//						"</div>" +
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
