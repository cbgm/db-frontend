define([
	'controller/ArticleController',
	'util/Logger',
	'util/Configuration',
	'util/Locale',
	'lib/gallery-cb',
	'lib/i18n!partialview/nls/ArticleView_strings',
	'lib/highlight',
	'lib/jquery'
], function (
	ArticleController,
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
			_article;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='article'>" +
							"<div style='clear: both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
			var split = window.location.hash.split("/");
			var projectTitle = split[split.length-3];
			var articleTitle = split[split.length-1];

			ArticleController.getEntryByTitle(btoa(projectTitle), btoa(articleTitle), function (data) {
				_article = data;

				if (_article != null) {
					_view.find('#entries').empty();
					var articleTitle = Locale.setContentByLocale(_article.title, _article.titleAlt);
					var articleContent = Locale.setContentByLocale(_article.content, _article.contentAlt);

					var result =	"<div class='entry'>" +
										"<div><h2>" + Locale.setContentByLocale(_article.title, _article.titleAlt) + "</h2></div>" +
										"<ul class='taglist'>";
						var tags = _article.tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='to-project'>&#9654; &nbsp;<a href='#projects/" + projectTitle + "'>" + Strings.relatedproject_button_text + "</a></div>" +
										"<div class='section'>" + articleContent + "</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#projects/" + projectTitle + "/articles/" + articleTitle + "'>Permalink</a></div>" +
											"<div class='posted-date'>" + Strings.posted_text + ": " + _article.date + "</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
									"</div>";

					_view.find('#entries').append(result);
					_view.galleryInit({ originalPath: Configuration.get('API_URL') + "/img/" });
					_view.find('pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});
				}
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
