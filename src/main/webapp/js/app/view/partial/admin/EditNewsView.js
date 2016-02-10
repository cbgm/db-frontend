define([
	'controller/NewsController',
	'controller/TagController',
	'util/Logger',
	'lib/jquery-te',
	'lib/jquery'
	
], function (
	NewsController,
	TagController,
	Logger,
	jqte,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view,
			_news,
			_tags;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='project'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function findTag(id) {

			for (var z = 0; z < _tags.length; z++) {

				if (_tags[z].tagId === id) {
					return _tags[z];
				}
			}
		}

		function hightlightTags() {

			for (var z = 0; z < _news.tags.length; z++) {
				var tag = findTag(_news.tags[z].tagId);
				if (tag !== null) {
					_view.find("#" + tag.tagId + "").css('border-color', '#498388');
				}
			}
		}
		
		function update (callback){
			var split = window.location.hash.split("/"); 
			var newsId = split[split.length-1];

			NewsController.getEntry(newsId, function (data1) {

				TagController.getEntries(function (data2) {
					_news = data1;
					_tags = data2;

					var result = "<div>";
						result +=	"<div>" +
										"<div class='entry-title-edit'><input type='text' value='" + _news.title + "'></input></div>" +
										"<textarea id='jqtetext'>" + _news.content + "</textarea>" +
										"<ul class='taglist'>";

					for (var i = 0; i < _tags.length; i++) {					
											result += "<li class='tag' id='" + _tags[i].tagId + "'>#" + _tags[i].name + "</li>";
					}
					result +=			"</ul>" +
										"<div style='clear: both;'></div>" +
										"<div class='entry-update'>update</div>"+ 
										"<div class='entry-cancel'>cancel</div>" +
										"<div style='clear: both;'></div>" +
									"</div>" +
								"</div>";

					_view.find('#entries').append(result);

					_view.find('textarea').jqte();
					//higtlight tags

					hightlightTags();

					_view.find(".entry-cancel").bind('click', function () {
						window.location.hash = "#admin/news";
					});

					_view.find(".entry-update").bind('click', function () {
						_news.title = _view.find('input').val();
						_news.content = _view.find('textarea').val();

						NewsController.updateEntry(_news.newsId, _news, function (data) {

							update( function (){
								Logger.log("update project entry done");
								window.location.hash = "#admin/news";
							});
						});
					});

					_view.find(".tag").bind('click', function () {
						var tagId = parseInt(this.id);

						for (var i = 0; i < _news.tags.length; i++) {

							if (tagId === _news.tags[i].tagId) {
								jQuery("#" + tagId + "").css('border-color', '#E3E3E3 ');
								_news.tags.splice(i, 1);
								return;
							}

							if (i == _news.tags.length-1) {
								_news.tags.push(findTag(tagId));
								jQuery("#" + tagId + "").css('border-color', '#498388');
								return;
							}
						}

						if (_news.tags.length === 0) {
							_news.tags.push(findTag(tagId));
							jQuery("#" + tagId + "").css('border-color', '#498388');
							return;
						}
					});
					callback();
				});
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
