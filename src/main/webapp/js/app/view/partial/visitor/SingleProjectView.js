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
			var projectId = split[split.length-1];

			ProjectController.getEntry(projectId, function (data) {
				_project = data;

				_view.find('#entries').empty();

				var result =	"<div class='entry'>" +
								"<div><h2>" + Locale.setContentByLocale(_project.title, _project.titleAlt) + "</h2></div>" +
								"<ul class='taglist'>";
				var tags = _project.tags;
								for (var x =0; x < tags.length; x++) {
									result += "<li><a href=''>#" + tags[x].name + "</a></li>";
								}
				result +=		"</ul>" +
								"<div class='section'>" + Locale.setContentByLocale(_project.description, _project.descriptionAlt) + "</div>" +
								"<div>" +
								"<p class='sub-entry-description'>" + Strings.relatedarticles_text + "</p>";
				var articles = _project.articles;

				for (var x = 0; x < articles.length; x++) {
					result +=		"<div class='sub-sentry-holder'>" +
										"<div class='box'>&#9654; &nbsp;</div>" +
										"<div class='box'><a class='sub-entry-ref' id='" + _project.projectId + "/"  + articles[x].articleId + "'>" + Locale.setContentByLocale(articles[x].title, articles[x].titleAlt) + "</a></div>" +
										"<div style='clear: both;'></div>" +
									"</div>"; 
				}
				result +=		"</div>" +
								"<div class='entry-info'>" +
									"<div class='permalink'><a href='#projects/" + _project.projectId + "'>Permalink</a></div>" +
									"<div class='posted-date'>" + Strings.posted_text + ": " + _project.date + "</div>" +
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);
				_view.find('pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});
				_view.galleryInit({ originalPath: Configuration.get('API_URL') + "/img/" });

				_view.find(".sub-entry-ref").bind('click', function () {
					var split = this.id.split("/"); 
					var projectId = split[0];
					var articleId = split[1];
					window.location.hash = "#projects/" + projectId + "/articles/" + articleId;
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
