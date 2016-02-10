define([
	'controller/ProjectController',
	'util/Logger',
	'lib/gallery-cb',
	'lib/jquery'
], function (
	ProjectController,
	Logger,
	gallery,
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
								"<div><h2>" + _project.title + "</h2></div>" +
								"<ul class='taglist'>";
				var tags = _project.tags;
								for (var x =0; x < tags.length; x++) {
									result += "<li><a href=''>#" + tags[x].name + "</a></li>";
								}
				result +=		"</ul>" +
								"<div class='section'>" + _project.description + "</div>" +
								"<div>" +
								"<p class='sub-entry-description'>Related articles:</p>";
				var articles = _project.articles;

				for (var x = 0; x < articles.length; x++) {
					result +=		"<div class='sub-sentry-holder'>" +
										"<div class='box'>&#9654; &nbsp;</div>" +
										"<div class='box'><a class='sub-entry-ref' id='" + _project.projectId + "/"  + articles[x].articleId + "'>" + articles[x].title + "</a></div>" +
										"<div style='clear: both;'></div>" +
									"</div>"; 
				}
				result +=		"</div>" +
								"<div class='entry-info'>" +
									"<div class='permalink'><a href='#projects/" + _project.projectId + "'>Permalink</a></div>" +
									"<div class='posted-date'>Posted: " + _project.date + "</div>" +
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);

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
