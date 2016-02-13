define([
	'controller/ProjectController',
	'controller/ArticleController',
	'util/Logger',
	'lib/jquery'
], function (
	ProjectController,
	ArticleController,
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
			_projects;

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
		
		function update (callback){
			_view.find('#entries').empty();

			ProjectController.getEntries(function (data) {
				_projects = data;

				_view.find('#entries').empty();

				//pages add
				var result = "<div>" +
								"<div class='entry-add'>Add Project</div>";

				if (_projects.length > 0) {

					for (var i = 0; i < _projects.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-main'>" +
											"<div class='entry-id'>" + _projects[i].projectId + "</div>" +
											"<div class='entry-title'>" + 
												"<div>" + _projects[i].title + "</div>" +
											"</div>" +
											"<div class='entry-delete' id='" + _projects[i].projectId + "'>" +
												"<div class='delete-text'>Delete</div>" +
												"<div class='spinner-container'>" +
													"<div class='loading-spinner'></div>" +
												"</div>" +
											"</div>" +
											"<div class='entry-edit' id='" + _projects[i].projectId + "'>Edit</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
										"<div class='entry-show-table'>" +
											"<div class='entry-show-sub' id='ref" + _projects[i].projectId + "'>+</div>" +
											"<div class='sub-entry-holder'>" +
												"<div class='entry-add-sub' id='" + _projects[i].projectId + "'>Add Article</div>";
						var articles = _projects[i].articles;

						for (var x = 0; x < articles.length; x++) {
							result +=			"<div class='entry-sub ref" + _projects[i].projectId + "'>" +
													"<div class='entry-id'>" + articles[x].articleId + "</div>" +
													"<div class='entry-title'>" + 
														"<div>" + articles[x].title + "</div>" +
													"</div>" +
													"<div class='entry-delete-sub' id='" + _projects[i].projectId + "/"  + articles[x].articleId + "'" + articles[x].articleId + "'>" +
														"<div class='delete-text'>Delete</div>" +
														"<div class='spinner-container'>" +
															"<div class='loading-spinner'></div>" +
														"</div>" +
													"</div>" +
													"<div class='entry-edit-sub' id='" + _projects[i].projectId + "/"  + articles[x].articleId + "'" + articles[x].articleId + "'>Edit</div>" +
													"<div style='clear: both;'></div>" +
												"</div>";
						}						
						result +=			"</div>" +
										"</div>" +
									"</div>";
					}
				}
				result += "</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-delete").bind('click', function () {
					var projectId = this.id;
					jQuery(this).attr("pointer-events", "none");
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					ProjectController.deleteEntry(projectId, function (data) {

						if (data === "OK") {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading project entries done");
							});
						} else {
							_view.find(".delete-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".entry-delete-sub").bind('click', function () {
					var split = this.id.split("/"); 
					var projectId = split[0];
					var articleId = split[1];
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					ArticleController.deleteEntry(projectId, articleId, function (data) {

						if (data === "OK") {

							update( function (){
								Logger.log("reloading project entries done");
							});
						} else {
							_view.find(".delete-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".entry-add").bind('click', function () {
					window.location.hash = "#admin/projects/add";
				});

				_view.find(".entry-add-sub").bind('click', function () {
					window.location.hash = "#admin/projects/" + this.id + "/articles/add";
				});

				_view.find(".entry-show-sub").bind('click', function () {
					var classRef = this.id;
					var button = jQuery(this);

					if(jQuery("." + classRef + ":visible").length) {
						jQuery("." + classRef + "").hide();
						button.html("+");
					} else {
						jQuery("." + classRef + "").show();
						button.html("-");
					}
				});

				_view.find(".entry-edit-sub").bind('click', function () {
					var split = this.id.split("/"); 
					var projectId = split[0];
					var articleId = split[1];
					window.location.hash = "#admin/projects/" + projectId + "/articles/" + articleId;
				});

				_view.find(".entry-edit").bind('click', function () {
					var projectId = this.id;
					window.location.hash = "#admin/projects/" + projectId;
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
