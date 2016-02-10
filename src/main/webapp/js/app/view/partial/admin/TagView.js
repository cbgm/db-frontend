define([
	'controller/TagController',
	'util/Logger',
	'lib/jquery'
], function (
	TagController,
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

			TagController.getEntries(function (data) {
				_tags = data;

				if (_tags.length > 0) {
					_view.find('#entries').empty();

					var result = "<div>" +
									"<ul class='taglist'>" +
										"<li class='tag entry-add'>" +
											"<input type='text' value='name'></input>" +
											"<div>Add</div>" +
											"<div style='clear: both;'></div>" +
										"</li>";
					for (var i = 0; i < _tags.length; i++) {
						result += 		"<li class='tag entry-delete' id='" + _tags[i].tagId + "'>" +
											"#" + _tags[i].name + " "+
											"<div id='" + _tags[i].tagId + "'>Delete</div>" +
											"<div style='clear: both;'></div>"+
										"</li>";
					}
					result += 		"</ul>" +
								"</div>";

					_view.find('#entries').append(result);
					_view.find(".entry-delete").bind('click', function () {
						var tagId = this.id;
						jQuery(this).attr("pointer-events", "none");

						TagController.deleteEntry(tagId, function (data) {
							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading tag entries done");
							});
						});
					});

					_view.find(".entry-add div").bind('click', function () {
						_tag.name = _view.find('input').val();

						TagController.addEntry(_tag, function (data) {

							update(function (){
								Logger.log("reloading tag entries done");
							});
						});
					});
				}
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
