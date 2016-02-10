define([
	'controller/NewsController',
	'util/Logger',
	'lib/jquery'
], function (
	NewsController,
	Logger,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view,
//			pages,
//			currentPage = 1,
//			lastPageEntryCount = 0,
//			preEnd = false,
//			nextEnd = false,
			_news;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='news'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
//			var entries;
			NewsController.getEntries(function (data) {
				_news = data;

				if (_news.length > 0) {
					_view.find('#entries').empty();

					//pages add
					var result = "<div>" +
									"<div class='entry-add'>Add News</div>";
					for (var i = 0; i < _news.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _news[i].newsId + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _news[i].title + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _news[i].newsId + "'>Delete</div>" +
										"<div class='entry-edit' id='" + _news[i].newsId + "'>Edit</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
								
					}
					result += "</div>";;

					_view.find('#entries').append(result);

					_view.find(".entry-delete").bind('click', function () {
						var newsId = this.id;
						jQuery(this).attr("pointer-events", "none");

						NewsController.deleteEntry(newsId, function (data) {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading guestbook entries done");
							});
						});
					});

					_view.find(".entry-add").bind('click', function () {
						window.location.hash = "#admin/news/add";
					});

					_view.find(".entry-edit").bind('click', function () {
						var newsId = this.id;
						window.location.hash = "#admin/news/" + newsId;
					});
				} else {
					_view.find('#entries').empty();

					//pages add
					var result = "<div>" +
									"<div class='entry-add'>Add News</div>" +
								"</div>";

					_view.find('#entries').append(result);

					_view.find(".entry-add").bind('click', function () {
						window.location.hash = "#admin/news/add";
					});
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
