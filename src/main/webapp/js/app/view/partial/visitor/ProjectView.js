define([
	'controller/ProjectController',
	'util/Logger',
	'util/Locale',
	'lib/gallery-cb',
	'lib/i18n!partialview/nls/ProjectView_strings',
	'lib/highlight',
	'lib/jquery'
], function (
	ProjectController,
	Logger,
	Locale,
	gallery,
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
		var _view,
			_pages,
			_currentPage = 1,
			_lastPageEntryCount = 0,
			_preEnd = false,
			_nextEnd = false,
			_projects;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='project'>" +
							"<div style='clear: both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div id='entry-navigation-bottom' class='section'>" +
								"<div id='center-box'>" +
									"<div id='spinner-holder'>" +
										"<div class='spinner-container'>" +
											"<div class='loadmore-spinner'></div>" +
										"</div>" +
									"</div>" +
									"<a class='loadMore'><span class='plus'>+</span>" + Strings.loadmore_button_text + "</a>" +
								"</div>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			$view.find(".loadMore").on('click', function () {

				if(!_nextEnd){
					++_currentPage;
					$view.find(".plus").hide();
					$view.find("#spinner-holder").css("display", "inline-block");
					update(_currentPage, function (){
						Logger.log("reloading news entries done");
						$view.find("#spinner-holder").css("display", "none");
						$view.find(".plus").show();
					});
				}
			});

			return $view;
		})();
		
		function update (page, callback){

			ProjectController.getPaginatedEntries(page, function (data) {
				_projects = data;

				if (_projects.length === 0) {
					_nextEnd = true;
					_currentPage--;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (_projects.length < 20) {
					_nextEnd = true;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (_projects.length > 0) {
					_view.find('#entries').empty();
					//set pages count
					var result =	"";
					//pages add
					for (var i = 0; i < _projects.length; i++) {
						result +=	"<div class='entry'>" +
										"<div><h2>" + Locale.setContentByLocale(_projects[i].title, _projects[i].titleAlt) + "</h2></div>" +
										"<ul class='taglist'>";
						var tags = _projects[i].tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='section'>" + Locale.setContentByLocale(_projects[i].description, _projects[i].descriptionAlt) + "</div>" +
										"<div>" +
										"<p class='sub-entry-description'>" + Strings.relatedarticles_text + "</p>";
						var articles = _projects[i].articles;

						for (var x = 0; x < articles.length; x++) {
							result +=		"<div class='sub-sentry-holder'>" +
												"<div class='box'>&#9654; &nbsp;</div>" +
												"<div class='box'><a class='sub-entry-ref' id='" + _projects[i].projectId + "/"  + articles[x].articleId + "'>" + Locale.setContentByLocale(articles[x].title, articles[x].titleAlt) + "</a></div>" +
												"<div style='clear: both;'></div>" +
											"</div>"; 
						}
						result +=		"</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#projects/" + _projects[i].projectId + "'>Permalink</a></div>" +
											"<div class='posted-date'>" + Strings.posted_text + ": " + _projects[i].date + "</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
									"</div>";
					}

					var jres = jQuery(result);
					jres.find('pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});
					_view.find('#entries').append(jres);

					_view.find(".sub-entry-ref").bind('click', function () {
						var split = this.id.split("/"); 
						var projectId = split[0];
						var articleId = split[1];
						window.location.hash = "#projects/" + projectId + "/articles/" + articleId;
					});
				}
				callback();
			});
		}

		this.updateEntries = function (callback){
			update(_currentPage, function () {
				callback();
			});
		}

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
