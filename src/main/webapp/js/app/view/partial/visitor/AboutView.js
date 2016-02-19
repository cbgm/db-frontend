define([
	'util/Configuration',
	'lib/i18n!partialview/nls/AboutView_strings',
	'lib/gallery-cb',
	'lib/jquery'
], function (
	Configuration,
	Strings,
	gallery,
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
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='about'>" +
							"<div id='intro' class='begin-section'>" +
								"<h2>" + Strings.head_text + "</h2>" +
								"<div class='inner-container'>" + Strings.shortdescription_text + Strings.anker + Strings.shortdescription2_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='extreme_sports'/>" +
							"<div id='extreme' class='descriptive-section'>" +
								"<h3>" + Strings.extreme_head_text + "</h3>" +
								"<div class='inner-container'>" + Strings.extreme_text + "</div>" +
								
							"</div>" +
							"<a class='anchor' id='skateboarding'/>" +
							"<div id='skateboard' class='section'>" +
								"<h4>" + Strings.skate_head_text + "</h4>" +
								"<div class='inner-container'>" + Strings.skate_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='snowboarding'/>" +
							"<div id='snowboard' class='section'>" +
								"<h4>" + Strings.snow_head_text + "</h4>" +
								"<div class='inner-container'>" + Strings.snow_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='music'/>" +
							"<div id='Music' class='descriptive-section'>" +
							"<h3>" + Strings.music_head_text + "</h3>" +
								"<div class='inner-container'>" + Strings.music_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='keyboard'/>" +
							"<div id='Keyboard' class='section'>" +
								"<h4>" + Strings.keyboard_head_text + "</h4>" +
								"<div class='inner-container'>" + Strings.keyboard_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='drums'/>" +
							"<div id='Drums' class='section'>" +
								"<h4>" + Strings.drums_head_text + "</h4>" +
								"<div class='inner-container'>" + Strings.drums_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='technology'/>" +
							"<div id='Technology' class='descriptive-section'>" +
							"<h3>" + Strings.technology_head_text + "</h3>" +
								"<div class='inner-container'>" + Strings.technology_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='programming'/>" +
							"<div id='Programming' class='section'>" +
							"<h4>" + Strings.programming_head_text + "</h4>" +
								"<div class='inner-container'>" + Strings.programming_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='design'/>" +
							"<div id='Design' class='descriptive-section'>" +
							"<h3>" + Strings.design_head_text + "</h3>" +
								"<div class='inner-container'>" +
									"<p>" + Strings.design_text + "" +
									"<div style='margin-top: 10px; text-align: center;'>" +
										"<img src='img/designs/banner-salzbad.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/c-enter.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/cad.jpg' rel='designs' alt=''/>" +
//										"<img src='img/designs/construct-omg.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/holger-portfolio.jpg' rel='designs' alt=''/>" +
//										"<img src='img/designs/logo-my-web.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/mystic-clan.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/skate.jpg' rel='designs' alt=''/>" +
//										"<img src='img/designs/high.jpg' style='display: none;' rel='designs' alt=''/>" +
									"</div>" +
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='filming'/>" +
							"<div id='Filming' class='descriptive-section'>" +
							"<h3>" + Strings.filming_head_text + "</h3>" +
								"<div class='inner-container'>" + Strings.filming_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='editing'/>" +
							"<div id='Editing' class='descriptive-section'>" +
							"<h3>" + Strings.editing_head_text + "</h3>" +
								"<div class='inner-container'>" + Strings.editing_text + "</div>" +
							"</div>" +
							"<a class='anchor' id='academic_career'/>" +
							"<div id='work' class='begin-section'>" +
								"<div id='timeline' >" +
									"<h2>" + Strings.academic_head_text + "</h2>" +
									"<div class='inner-container'>" + Strings.timeline + "</div>" +
							"<div id='Documents' class='descriptive-section'>" +
							"<h3>" + Strings.documents_head_text + "</h3>" +
								"<div class='inner-container'>" +
									"" + Strings.documents_text + "" +
									"<ul class='download'>" +
										"<li>" +
											"<a class='download-link' href='" + Configuration.get('API_URL') + "/download/bachelorcert'>" + Strings.master_button_text + "</a>" +
										"</li>" +
										"<li>" +
											"<a class='download-link' href='" + Configuration.get('API_URL') + "/download/mastercert'>" + Strings.bachelor_button_text + "</a>" +
										"</li>" +
										"<li>" +
											"<a class='download-link' href='" + Configuration.get('API_URL') + "/download/cv'>" + Strings.cv_button_text + "</a>" +
										"</li>" +
									"</ul>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		this.get = function () {
			_view.galleryInit();
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
