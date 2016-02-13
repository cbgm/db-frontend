define([
	'controller/UserController',
	'util/Logger',
	'lib/jquery'
], function (
	UserController,
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
			_users;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='user'>" +
							"<div id='entries' class='section'>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		function update (callback){
//			var entries;
			_view.find('#entries').empty();

			UserController.getEntries(function (data) {
				_users = data;

				_view.find('#entries').empty();

				var result = "<div>" +
								"<div class='entry-add'>Add User</div>";

				if (_users.length > 0) {
					//pages add

					for (var i = 0; i < _users.length; i++) {
						result +=	"<div class='entry-admin'>" +
										"<div class='entry-id'>" + _users[i].username + "</div>" +
										"<div class='entry-title'>" + 
											"<div>" + _users[i].roles[0].role + "</div>" +
										"</div>" +
										"<div class='entry-delete' id='" + _users[i].username + "'>" +
											"<div class='delete-text'>Delete</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-edit' id='" + _users[i].username + "'>Edit</div>" +
										"<div style='clear: both;'></div>" +
									"</div>";
					}
				} 
				result += "</div>";

				_view.find('#entries').append(result);

				_view.find(".entry-delete").bind('click', function () {
					var username = this.id;
					jQuery(this).attr("pointer-events", "none");
					this.querySelector(".delete-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";

					UserController.deleteEntry(username, function (data) {

						if (data === "OK") {

							update( function (){
								jQuery(this).attr("pointer-events", "auto");
								Logger.log("reloading user entries done");
							});
						} else {
							_view.find(".delete-text").css("display", "block");
							_view.find(".loading-spinner").css("display", "none");
						}
					});
				});

				_view.find(".entry-add").bind('click', function () {
					window.location.hash = "#admin/users/add";
				});

				_view.find(".entry-edit").bind('click', function () {
					var username = this.id;
					window.location.hash = "#admin/users/" + username;
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
