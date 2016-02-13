define([
	'controller/ProjectController',
	'controller/TagController',
	'util/Logger',
	'lib/jquery-te',
	'lib/jquery'
	
], function (
		ProjectController,
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
			_project = {
				title: "",
				description: "",
//				date: '',
				tags: [],
			},
			_tags;
		
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
									"<div class='entry-title-edit'><input type='text' value='Input the project title'></input></div>" +
									"<textarea id='jqtetext'>Input the project description</textarea>" +
									"<ul class='taglist'>";
		
				for (var i = 0; i < _tags.length; i++) {					
										result += "<li class='tag' id='" + _tags[i].tagId + "'>#" + _tags[i].name + "</li>";
				}
				result +=			"</ul>" +
									"<div style='clear: both;'></div>" +
									"<div class='entry-post'>" +
										"<div class='post-text'>Update</div>" +
										"<div class='spinner-container'>" +
											"<div class='loading-spinner white'></div>" +
										"</div>" +
									"</div>" +
									"<div class='entry-cancel'>Cancel</div>"+
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>";

				_view.find('#entries').append(result);
				_view.find('textarea').jqte();

				_view.find(".entry-cancel").bind('click', function () {
					window.location.hash = "#admin/projects";
				});

				_view.find(".entry-post").bind('click', function () {
					_project.description = _view.find('textarea').val();
					_project.title = _view.find('input').val();
					this.querySelector(".post-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					ProjectController.postEntry(_project, function (data) {

						if (data === "OK") {

							update( function (){
								Logger.log("update guestbook entries done");
								window.location.hash = "#admin/projects";
							});
						} else {
							_view.find(".post-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".tag").bind('click', function () {
					var tagId = parseInt(this.id);

					for (var i = 0; i < _project.tags.length; i++) {

						if (tagId === _project.tags[i].tagId) {
							jQuery("#" + tagId + "").css('border-color', '#E3E3E3 ');
							_project.tags.splice(i, 1);
							return;
						}

						if (i == _project.tags.length-1) {
							_project.tags.push(findTag(tagId));
							jQuery("#" + tagId + "").css('border-color', '#498388');
							return;
						}
					}

					if (_project.tags.length === 0) {
						_project.tags.push(findTag(tagId));
						jQuery("#" + tagId + "").css('border-color', '#498388');
						return;
					}
				});
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
