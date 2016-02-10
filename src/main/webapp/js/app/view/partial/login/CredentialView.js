define([
	'controller/LoginController',
	'util/Logger',
	'lib/jquery'
], function (
	LoginController,
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
			_user = {
				name: "",
				password: ""
			};

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='login'>" +
						"<div id='content-spacer'>" +
							"<div id='login-container'>" +
								"<div class='form-container'>" +
									"<div class='size-container'>" +
										"<h1>Admin Login</h1>" +
										"<p>For the adminstration of the website content, please login.  </p>" +
										"<form>" +
											"<ul>" +
												"<li>" +
													"<input id='username' type='text' required placeholder='Username' />" +
												"</li>" +
												"<li>" +
													"<input id='password' type='password' required placeholder='Password' />" +
												"</li>" +
												"<li>" +
													"<div class='user-login'>" +
														"<div id='button-text'>Login</div>" +
														"<div class='spinner-container'>" +
															"<div class='login-spinner'></div>" +
														"</div>" +
													"</div>" +
													"<div class='user-cancel'>" +
														"<div id='button-text'>Cancel</div>" +
													"</div>" +
													"<div style='clear: both;'></div>" +
												"</li>" +
											"</ul>" +
										"</form>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");

			$view.find(".user-login").bind('click', function () {

				_user.name = $view.find("#username").val();
				_user.password = $view.find("#password").val();

				if (_user.name !== "" && _user.password !== "") {
					this.querySelector("#button-text").style.display = "none";
					this.querySelector(".login-spinner").style.display = "block";
					LoginController.doLogin(_user, function (data) {

						if (data === "OK") {
							window.location.hash = "#admin/news"
						} else {
							$view.find("#button-text").css("display", "block");
							$view.find(".login-spinner").css("display", "none");
						}
					});	
				}
			});

			$view.find(".user-cancel").bind('click', function () {
				window.location.hash = "#news";
			});
			return $view;
		})();


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
