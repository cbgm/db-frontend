define([
	'controller/NewsController',
	'util/Logger',
	'util/Locale',
	'lib/gallery-cb',
	'lib/i18n!partialview/nls/NewsView_strings',
	'lib/jquery'
], function (
	NewsController,
	Logger,
	Locale,
	gallery,
	Strings,
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
			_news;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='news'>" +
							"<div id='entry-navigation-top' class='section'>" +
								"<a class='prePage specialColor'>" + Strings.prepage_button_text + "</a><a class='nextPage specialColor'>" + Strings.nextpage_button_text + "</a>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div id='entry-navigation-bottom' class='section'>" +
								"<a class='prePage specialColor'>" + Strings.prepage_button_text + "</a><a class='nextPage specialColor'>" + Strings.nextpage_button_text + "</a>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			$view.find(".nextPage").on('click', function () {

				if(!preEnd){

					if (_nextEnd) {
						_nextEnd =false;
					}
					--_currentPage;
					update(_currentPage, function (){
						Logger.log("reloading news entries done");
					});
				}
			});

			$view.find(".prePage").on('click', function () {

				if(!_nextEnd){

					if (_preEnd) {
						_preEnd =false;
					}
					++_currentPage;
					update(_currentPage, function (){
						Logger.log("reloading news entries done");
					});
				}
			});

			return $view;
		})();
		
		function update (page, callback){
//			var entries;
			NewsController.getPaginatedEntries(page, function (data) {
				_news = data;
				if (_news.length === 0) {
					_nextEnd = true;
					_currentPage--;
				}

				if (_news.length < 20) {
					_nextEnd = true;
				}

				if (_currentPage === 1) {
					_preEnd = true;
				}

				if (_news.length > 0) {
					_view.find('#entries').empty();
					
					//set pages count
	
					var result =	"";
					
					//pages add
					for (var i = 0; i < _news.length; i++) {
						result +=	"<div class='entry'>" +
//										"<div><h4>" + entries[i].newsId + "</h4></div>" +
										"<div><h2>" + Locale.setContentByLocale(_news[i].title, _news[i].titleAlt) + "</h2></div>" +
//										"<h2>#" + entries[i].newsId + "&nbsp;&nbsp;|&nbsp;&nbsp;" + entries[i].title + "</h2>" +
										
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
					}

					_view.find('#entries').append(result);
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
