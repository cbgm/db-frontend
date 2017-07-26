define([
	'controller/NewsController',
	'util/Logger',
	'util/Configuration',
	'util/Locale',
	'lib/gallery-cb',
	'lib/highlight',
	'lib/jquery'
], function (
	NewsController,
	Logger,
	Configuration,
	Locale,
	gallery,
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
			_news;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='news'>" +
							"<div style='clear: both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();
		
		function update (callback){
			var split = window.location.hash.split("/"); 
			var newsTitle = split[split.length-1];

			NewsController.getEntryByTitle(btoa(newsTitle), function (data) {
				_news = data;

				if (_news != null) {
					var newsTitle = Locale.setContentByLocale(_news.title, _news.titleAlt);
					var newsContent = Locale.setContentByLocale(_news.content, _news.contentAlt);
					_view.find('#entries').empty();

					var result =	"<div class='entry'>" +
										"<div><h2>" + newsTitle + "</h2></div>" +
										"<ul class='taglist'>";
						var tags = _news.tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='section'>" + newsContent + "</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#news/" + newsTitle + "'>Permalink</a></div>" +
											"<div class='posted-date'>Posted: " + _news.date + "</div>" +
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
