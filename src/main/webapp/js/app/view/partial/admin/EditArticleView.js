define([
	'controller/ArticleController',
	'controller/TagController',
	'util/Logger',
	'lib/jquery-te',
	'lib/jquery'
	
], function (
	ArticleController,
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
			_article,
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

			for (var z = 0; z < _article.tags.length; z++) {
				var tag = findTag(_article.tags[z].tagId);

				if (tag !== null) {
					_view.find("#" + tag.tagId + "").css('border-color', '#498388');
				}
			}
		}

		function update (callback){
			var split = window.location.hash.split("/"); 
			var projectId = split[split.length-3];
			var articleId = split[split.length-1];

			ArticleController.getEntry(projectId, articleId, function (data1) {

				TagController.getEntries(function (data2) {
					_article = data1;
					_tags = data2;

					var result = "<div>";
						result +=	"<div>" +
										"<div class='entry-title-edit'><input type='text' value='" + _article.title + "'></input></div>" +
										"<textarea id='jqtetext'>" + _article.content + "</textarea>" +
										"<ul class='taglist'>";

					for (var i = 0; i < _tags.length; i++) {					
											result += "<li class='tag' id='" + _tags[i].tagId + "'>#" + _tags[i].name + "</li>";
					}
					result +=			"</ul>" +
										"<div style='clear: both;'></div>" +
										"<div class='entry-update'>" +
											"<div class='update-text'>Update</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner white'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-cancel'>cancel</div>" +
										"<div style='clear: both;'></div>" +
									"</div>" +
								"</div>";

					_view.find('#entries').append(result);
					_view.find('textarea').jqte();
					//higtlight tags
					hightlightTags();

					_view.find(".entry-cancel").bind('click', function () {
						window.location.hash = "#admin/projects";
					});

					_view.find(".entry-update").bind('click', function () {
						_article.title = _view.find('input').val();
						_article.content = _view.find('textarea').val();
						this.querySelector(".update-text").style.display = "none";
						this.querySelector(".loading-spinner").style.display = "block";

						ArticleController.updateEntry(_article.articleId, _article, function (data) {

							if (data === "OK") {

								update( function (){
									Logger.log("update project entry done");
									window.location.hash = "#admin/projects";
								});
							} else {
								_view.find(".update-text").css("display", "block");
								_view.find(".loading-spinner").css("display", "none");
							}
						});
					});

					_view.find(".tag").bind('click', function () {
						var tagId = parseInt(this.id);

						for (var i = 0; i < _article.tags.length; i++) {

							if (tagId === _article.tags[i].tagId) {
								jQuery("#" + tagId + "").css('border-color', '#E3E3E3 ');
								_article.tags.splice(i, 1);
								return;
							}

							if (i == _article.tags.length-1) {
								_article.tags.push(findTag(tagId));
								jQuery("#" + tagId + "").css('border-color', '#498388');
								return;
							}
						}

						if (_article.tags.length === 0) {
							_article.tags.push(findTag(tagId));
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
