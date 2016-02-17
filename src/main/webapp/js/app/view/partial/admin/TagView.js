define([
	'controller/TagController',
	'util/Logger',
	'lib/i18n!partialview/nls/TagView_strings',
	'lib/jquery'
], function (
	TagController,
	Logger,
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
			_tags,
			_tag = {
				tagId: null,
				name: ""
			};

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='tags'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
			_view.find('#entries').empty();

			TagController.getEntries(function (data) {
				_tags = data;

				_view.find('#entries').empty();

				var result = "<div>" +
								"<ul class='taglist'>" +
									"<li class='tag entry-add'>" +
										"<input type='text' value='name'></input>" +
										"<div class='button-container'>" +
											"<div class='add-text'>" + Strings.add_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div style='clear: both;'></div>" +
									"</li>";

				if (_tags.length > 0) {

					for (var i = 0; i < _tags.length; i++) {
						result += 	"<li class='tag entry-delete' id='" + _tags[i].tagId + "'>" +
										"#" + _tags[i].name + " "+
										"<div id='" + _tags[i].tagId + "' class='button-container'>" +
											"<div class='delete-text'>" + Strings.delete_button_text + "</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div style='clear: both;'></div>"+
									"</li>";
					}
					
				}
				result += 		"</ul>" +
							"</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-delete").bind('click', function () {
					var tagId = this.id;
					jQuery(this).attr("pointer-events", "none");
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					TagController.deleteEntry(tagId, function (data) {

						if (data === "OK") {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading tag entries done");
							});
						} else {
							_view.find(".delete-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".entry-add div").bind('click', function () {
					_tag.name = _view.find('input').val();
					this.querySelector(".add-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";
					
					TagController.addEntry(_tag, function (data) {

						if (data === "OK") {

							update(function (){
								Logger.log("reloading tag entries done");
							});
						} else {
							_view.find(".add-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});
				Logger.log("reloading tag entries done");
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
