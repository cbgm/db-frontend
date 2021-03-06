define([
	'controller/ProjectController',
	'util/Logger',
	'util/Configuration',
	'util/Locale',
	'lib/gallery-cb',
	'lib/i18n!partialview/nls/ProjectView_strings',
	'lib/highlight',
	'lib/jquery'
], function (
	ProjectController,
	Logger,
	Configuration,
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
			_project;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='project'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
			var split = window.location.hash.split("/"); 
			var projectTitle = split[split.length-1];

			ProjectController.getEntryByTitle(btoa(projectTitle), function (data) {
				_project = data;
				var projectTitle = Locale.setContentByLocale(_project.title, _project.titleAlt)
				var projectContent = Locale.setContentByLocale(_project.description, _project.descriptionAlt);

				_view.find('#entries').empty();

				var result =	"<div class='entry'>" +
								"<div><h2>" + projectTitle + "</h2></div>" +
								"<ul class='taglist'>";
				var tags = _project.tags;
								for (var x =0; x < tags.length; x++) {
									result += "<li><a href=''>#" + tags[x].name + "</a></li>";
								}
				result +=		"</ul>" +
								"<div class='section'>" + projectContent + "</div>" +
								"<div>" +
								"<p class='sub-entry-description'>" + Strings.relatedarticles_text + "</p>";
				var articles = _project.articles;

				for (var x = 0; x < articles.length; x++) {
					var articleTitle = Locale.setContentByLocale(articles[x].title, articles[x].titleAlt);
					var articleContent = Locale.setContentByLocale(articles[x].content, articles[x].contentAlt);

					result +=		"<div class='sub-sentry-holder'>" +
										"<div class='box'>&#9654; &nbsp;</div>" +
										"<div class='box'><a class='sub-entry-ref' id='" + projectTitle + "/"  + articleTitle + "'>" + articleTitle + "</a></div>" +
										"<div style='clear: both;'></div>" +
									"</div>"; 
				}
				result +=		"</div>" +
								"<div class='entry-info'>" +
									"<div class='permalink'><a href='#projects/" + projectTitle + "'>Permalink</a></div>" +
									"<div class='posted-date'>" + Strings.posted_text + ": " + _project.date + "</div>" +
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);
				_view.find('pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});
				_view.galleryInit({ originalPath: Configuration.get('API_URL') + "/img/" });

				_view.find(".sub-entry-ref").bind('click', function () {
					var split = this.id.split("/"); 
					var projectTitle = split[0];
					var articleTitle = split[1];
					window.location.hash = "#projects/" + projectTitle + "/articles/" + articleTitle;
				});
				callback();
			});
		}

		this.updateEntries = function (callback){
			update(function () {
				callback();
			});
		}

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
