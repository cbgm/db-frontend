define([
	'controller/NewsController',
	'util/Logger',
	'util/Configuration',
	'util/Locale',
	'lib/gallery-cb',
	'lib/i18n!partialview/nls/NewsView_strings',
	'lib/highlight',
	'lib/jquery'
], function (
	NewsController,
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
			_pages,
			_currentPage = 1,
			_lastPageEntryCount = 0,
			_preEnd = false,
			_nextEnd = false,
			_lastIndex = 0,
			_news;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='news'>" +
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
//			var entries;
			NewsController.getPaginatedEntries(page, function (data) {
				if (typeof _news !== "undefined") {
					_news = _news.concat(data);
				} else {
					_news = data;
				}
				if (_news.length === 0) {
					_nextEnd = true;
					_currentPage--;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (data.length < 5) {
					_nextEnd = true;
					_view.find("#entry-navigation-bottom").css("display", "none");
				}

				if (_news.length > 0) {

					var result =	"";
					
					//pages add
					for (var i = _lastIndex; i < _news.length; i++) {
						result +=	"<div class='entry'>" +
										"<div><h2>" + Locale.setContentByLocale(_news[i].title, _news[i].titleAlt) + "</h2></div>" +
										"<ul class='taglist'>";
						var tags = _news[i].tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='section'>" + Locale.setContentByLocale(_news[i].content, _news[i].contentAlt) + "</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#news/" + _news[i].newsId + "'>Permalink</a></div>" +
											"<div class='posted-date'>" + Strings.posted_text + ": " + _news[i].date + "</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
									"</div>";
						++_lastIndex;
					}

					var jres = jQuery(result);
					jres.find('pre.code').highlightCode({source:0, zebra:1, indent:'tabs', list:'ol'});
					_view.find('#entries').append(jres);
					_view.galleryInit({ originalPath: Configuration.get('API_URL') + "/img/" });

					_view.galleryInit();
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
