define([
	'controller/NewsController',
	'controller/TagController',
	'util/Logger',
	'util/Locale',
	'lib/jquery-te',
	'lib/i18n!partialview/nls/NewsView_strings',
	'lib/jquery'
	
], function (
	NewsController,
	TagController,
	Logger,
	Locale,
	jqte,
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
			_news = {
				title: "",
				content: "",
				titleAlt: "",
				contentAlt: "",
//				date: '',
				tags: [],
			},
			_tags,
			_langSelect = "DE";
		
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
		
		function findTag(id) {

			for (var z = 0; z < _tags.length; z++) {

				if (_tags[z].tagId === id) {
					return _tags[z];
				}
			}
		}

		function update (callback){

			TagController.getEntries(function (data) {
				_tags = data;

				var result = "<div>";
				result +=		"<div>" +
									"<div class='entry-edit-content-holder'>" +
										"<div>" +
											"<select id='language-switch' name='languages'>" +
												"<option value='DE' selected>DE</option>" +
												"<option value='EN'>EN</option>" +
											"</select>" +
										"</div>" +
										"<div class='entry-title-edit'><input type='text' value='" + Strings.title_placeholder_text + "'></input></div>" +
										"<textarea id='jqtetext'>" + Strings.content_placeholder_text + "</textarea>" +
									"</div>" +
									"<ul class='taglist'>";
		
				for (var i = 0; i < _tags.length; i++) {					
										result += "<li class='tag' id='" + _tags[i].tagId + "'>#" + _tags[i].name + "</li>";
				}
				result +=			"</ul>" +
									"<div style='clear: both;'></div>" +
									"<div class='entry-post'>" +
										"<div class='post-text'>" + Strings.post_button_text + "</div>" +
										"<div class='spinner-container'>" +
											"<div class='loading-spinner white'></div>" +
										"</div>" +
									"</div>" +
									"<div class='entry-cancel'>" + Strings.cancel_button_text + "</div>"+
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);
				_view.find('textarea').jqte();

				_view.find(".entry-cancel").bind('click', function () {
					window.location.hash = "#admin/news";
				});

				_view.find('#language-switch').on('change', function() {
					var lang = _view.find('select[name=languages]').val();
					var text = _view.find('#jqtetext');
					var editor = jQuery('.jqte_editor');
					var title = _view.find('.entry-title-edit input');
					_langSelect = lang;

					if (lang !== "DE") {
						_news.content = text.val();
						_news.title = title.val();
						text.val((_news.contentAlt === ""? Strings.content_placeholder_text : _news.contentAlt));
						//because textarea is hidden, set also jqte area
						editor.html((_news.contentAlt === ""? Strings.content_placeholder_text : _news.contentAlt));
						title.val((_news.titleAlt === ""? Strings.title_placeholder_text : _news.titleAlt));
					} else {
						_news.contentAlt = text.val();
						_news.titleAlt = title.val();
						text.val((_news.content === ""? Strings.content_placeholder_text : _news.content));
						editor.html((_news.content === ""? Strings.content_placeholder_text : _news.content));
						title.val((_news.title === ""? Strings.title_placeholder_text : _news.title));
					}
				});

				_view.find(".entry-post").bind('click', function () {
					setValueByLanguage();
					this.querySelector(".post-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					NewsController.postEntry(_news, function (data) {

						if (data === "OK") {

							update( function (){
								Logger.log("update guestbook entries done");
								window.location.hash = "#admin/news";
							});
						} else {
							_view.find(".post-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
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

				function setValueByLanguage () {
					var text = _view.find('#jqtetext');
					var title = _view.find('.entry-title-edit input');

					if (_langSelect === "DE") {
						_news.content = text.val();
						_news.title = title.val();
					} else {
						_news.contentAlt = text.val();
						_news.titleAlt = title.val();
					}
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
