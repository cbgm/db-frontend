define([
	'util/Configuration',
	'lib/i18n!partialview/nls/AboutView_strings',
	'lib/gallery-cb',
	'lib/scroll-animation',
	'lib/jquery'
], function (
	Configuration,
	Strings,
	gallery,
	ScrollAnimation,
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
							"<div id='intro' class='intro-section ' >" +
								"<h2>" + Strings.head_text + "</h2>" +
								"<div class='inner-container'>" +
									"<img src='img/me.png' alt=''>" +
									"<p>" + Strings.shortdescription_text + "</p>" +
									"<div id='cv-button'><a href='" + Configuration.get('API_URL') + "/download/bachelorcert'><img class='no-gallery' src='img/cv.png' alt=''>" + Strings.cv_text + "</a></div>" +
								"</div>" +
							"</div>" +
							"<div id='skill' class='skill-section'>" +
								"<h2><span>S</span>kills</h2>" +
								"<div class='inner-container'>" +
									"<div class='skill-wrapper'>" +
										"<div class='skill-container'>" +
											"<h4>Sprachen</h4>" +
											"<ul class='skill-list' style='list-style: none;'>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>C</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='c' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>C++</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='c' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Java</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='java' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>VB .Net</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='vb' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>(My)SQL</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='mysql' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
											"</ul>" +
										"</div>" +
										"<div class='skill-container'>" +
											"<h4>Web</h4>" +
											"<ul class='skill-list' style='list-style: none;'>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>HTML</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='html' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>(S)CSS</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='css' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>JQuery</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='js' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Ajax</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='ajax' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>JS</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='js' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
											"</ul>" +
										"</div>" +
										"<div class='skill-container'>" +
											"<h4>Frameworks</h4>" +
											"<ul class='skill-list'>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>Angular</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='angular' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>Spring</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='spring' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Hibernate</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='hibernate' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
											"</ul>" +
										"</div>" +
										"<div class='skill-container'>" +
											"<h4>Test</h4>" +
											"<ul class='skill-list' style='list-style: none;'>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>JUnit</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='junit' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>Selenium</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='selenium' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Silktest</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='silktest' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
											"</ul>" +
										"</div>" +
										"<div class='skill-container'>" +
											"<h4>Sonstiges</h4>" +
											"<ul class='skill-list' style='list-style: none;'>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>Git</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='git' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<div class='skill-name'>Bower</div>" +
														"<div class='skill-bar'>" +
															"<div data-animation='bower' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Maven</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='maven' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Grunt</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='grunt' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
												"<li>" +
													"<div class='skill'>" +
														"<span class='skill-name'>Android</span>" +
														"<div class='skill-bar'>" +
															"<div data-animation='android' class='fill animate'></div>" +
														"</div>" +
													"</div>" +
												"</li>" +
											"</ul>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='academic_career'/>" +
							"<div id='work' class='work-section ' >" +
								"<div id='timeline' >" +
									"<h2><span>E</span>ducation & experience</h2>" +
									"<div class='inner-container'>" + Strings.timeline + "</div>" +
							"<div id='interests' class='interests-section'>" +
								"<h2><span>I</span>nterests</h2>" +
								"<a class='anchor' id='extreme_sports'/>" +
								"<div id='extreme' class='descriptive-section '  >" +
									"<h3>" + Strings.extreme_head_text + "</h3>" +
									"<div class='inner-container'>" + Strings.extreme_text + "</div>" +
									
								"</div>" +
								"<a class='anchor' id='skateboarding'/>" +
								"<div id='skateboard' class='section ' >" +
									"<h4>" + Strings.skate_head_text + "</h4>" +
									"<div class='inner-container'>" + Strings.skate_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='snowboarding'/>" +
								"<div id='snowboard' class='section ' >" +
									"<h4>" + Strings.snow_head_text + "</h4>" +
									"<div class='inner-container'>" + Strings.snow_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='music'/>" +
								"<div id='Music' class='descriptive-section ' >" +
								"<h3>" + Strings.music_head_text + "</h3>" +
									"<div class='inner-container'>" + Strings.music_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='keyboard'/>" +
								"<div id='Keyboard' class='section ' >" +
									"<h4>" + Strings.keyboard_head_text + "</h4>" +
									"<div class='inner-container'>" + Strings.keyboard_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='drums'/>" +
								"<div id='Drums' class='section ' >" +
									"<h4>" + Strings.drums_head_text + "</h4>" +
									"<div class='inner-container'>" + Strings.drums_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='technology'/>" +
								"<div id='Technology' class='descriptive-section ' >" +
								"<h3>" + Strings.technology_head_text + "</h3>" +
									"<div class='inner-container'>" + Strings.technology_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='programming'/>" +
								"<div id='Programming' class='section ' >" +
								"<h4>" + Strings.programming_head_text + "</h4>" +
									"<div class='inner-container'>" + Strings.programming_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='design'/>" +
								"<div id='Design' class='descriptive-section ' >" +
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
								"<div id='Filming' class='descriptive-section ' >" +
								"<h3>" + Strings.filming_head_text + "</h3>" +
									"<div class='inner-container'>" + Strings.filming_text + "</div>" +
								"</div>" +
								"<a class='anchor' id='editing'/>" +
								"<div id='Editing' class='descriptive-section ' >" +
								"<h3>" + Strings.editing_head_text + "</h3>" +
									"<div class='inner-container'>" + Strings.editing_text + "</div>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>");

			$view.galleryInit(null);
			
			$view.scrollAnimationInit();
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
