define([
	'controller/NewsController',
	'util/Logger',
	'util/Locale',
	'lib/gallery-cb',
	'lib/jquery'
], function (
	NewsController,
	Logger,
	Locale,
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
			var newsId = split[split.length-1];

			NewsController.getEntry(newsId, function (data) {
				_news = data;

				if (_news != null) {
					_view.find('#entries').empty();

					var result =	"<div class='entry'>" +
										"<div><h2>" + Locale.setContentByLocale(_news.title, _news.titleAlt) + "</h2></div>" +										
										"<ul class='taglist'>";
						var tags = _news.tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='section'>" + Locale.setContentByLocale(_news.content, _news.contentAlt) + "</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#news/" + _news.newsId + "'>Permalink</a></div>" +
											"<div class='posted-date'>Posted: " + _news.date + "</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
									"</div>";

					_view.find('#entries').append(result);
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
