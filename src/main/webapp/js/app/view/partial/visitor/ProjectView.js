define([
	'controller/ProjectController',
	'util/Logger',
	'lib/gallery-cb',
	'lib/jquery'
], function (
	ProjectController,
	Logger,
	gallery,
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
			_projects;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='project'>" +
							"<div id='entry-navigation-top' class='section'>" +
								"<a class='prePage specialColor'>&#9664; older</a><a class='nextPage specialColor'>newer &#9654;</a>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div id='entry-navigation-bottom' class='section'>" +
								"<a class='prePage specialColor'>&#9664; older</a><a class='nextPage specialColor'>newer &#9654;</a>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			$view.find(".nextPage").on('click', function () {

				if(!_preEnd){

					if (_nextEnd) {
						_nextEnd = false;
					}
					--_currentPage;
					update(_currentPage, function (){
						Logger.log("reloading news project done");
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
						Logger.log("reloading project entries done");
					});
				}
			});

			return $view;
		})();
		
		function update (page, callback){

			ProjectController.getPaginatedEntries(page, function (data) {
				_projects = data;

				if (_projects.length === 0) {
					_nextEnd = true;
					_currentPage--;
				}

				if (_projects.length < 20) {
					_nextEnd = true;
				}

				if (_currentPage === 1) {
					_preEnd = true;
				}

				if (_projects.length > 0) {
					_view.find('#entries').empty();
					//set pages count
					var result =	"";
					//pages add
					for (var i = 0; i < _projects.length; i++) {
						result +=	"<div class='entry'>" +
										"<div><h2>" + _projects[i].title + "</h2></div>" +
										"<ul class='taglist'>";
						var tags = _projects[i].tags;
										for (var x =0; x < tags.length; x++) {
											result += "<li><a href=''>#" + tags[x].name + "</a></li>";
										}
						result +=		"</ul>" +
										"<div class='section'>" + _projects[i].description + "</div>" +
										"<div>" +
										"<p class='sub-entry-description'>Related articles:</p>";
						var articles = _projects[i].articles;

						for (var x = 0; x < articles.length; x++) {
							result +=		"<div class='sub-sentry-holder'>" +
												"<div class='box'>&#9654; &nbsp;</div>" +
												"<div class='box'><a class='sub-entry-ref' id='" + _projects[i].projectId + "/"  + articles[x].articleId + "'>" + articles[x].title + "</a></div>" +
												"<div style='clear: both;'></div>" +
											"</div>"; 
						}
						result +=		"</div>" +
										"<div class='entry-info'>" +
											"<div class='permalink'><a href='#projects/" + _projects[i].projectId + "'>Permalink</a></div>" +
											"<div class='posted-date'>Posted: " + _projects[i].date + "</div>" +
											"<div style='clear: both;'></div>" +
										"</div>" +
									"</div>";
					}

					_view.find('#entries').append(result);

					_view.find(".sub-entry-ref").bind('click', function () {
						var split = this.id.split("/"); 
						var projectId = split[0];
						var articleId = split[1];
						window.location.hash = "#projects/" + projectId + "/articles/" + articleId;
					});
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
			_view.galleryInit();
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
