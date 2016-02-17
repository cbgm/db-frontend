define([
	'controller/LoginController',
	'util/Logger',
	'lib/i18n!partialview/nls/CredentialView_strings',
	'lib/jquery'
], function (
	LoginController,
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
										"<h1>" + Strings.admin_text + "</h1>" +
										"<p>" + Strings.description_text + "</p>" +
										"<form>" +
											"<ul>" +
												"<li>" +
													"<input id='username' type='text' required placeholder='" + Strings.name_placeholder_text + "' />" +
												"</li>" +
												"<li>" +
													"<input id='password' type='password' required placeholder='" + Strings.password_placeholder_text + "' />" +
												"</li>" +
												"<li>" +
													"<div class='user-login'>" +
														"<div id='login-text'>" + Strings.login_button_text + "</div>" +
														"<div class='spinner-container'>" +
															"<div class='login-spinner'></div>" +
														"</div>" +
													"</div>" +
													"<div class='user-cancel'>" +
														"<div id='button-text'>" + Strings.cancel_button_text + "</div>" +
													"</div>" +
//													"<div class='user-go-register'>" +
//														"<div id='button-text'>Go to register</div>" +
//													"</div>" +
													"<div style='clear: both;'></div>" +
												"</li>" +
											"</ul>" +
										"</form>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<div id='register-container'>" +
								"<div class='form-container'>" +
									"<div class='size-container'>" +
										"<h1>Register User</h1>" +
//										"<p>For the adminstration of the website content, please login.  </p>" +
										"<form>" +
											"<ul>" +
												"<li>" +
													"<input id='username' type='text' required placeholder='Username' />" +
												"</li>" +
												"<li>" +
													"<input id='password' type='text' required placeholder='Password' />" +
												"</li>" +
												"<li>" +
													"<input id='masterkey' type='text' required placeholder='Role' />" +
												"</li>" +
												"<li>" +
													"<input id='masterkey' type='text' required placeholder='Masterkey' />" +
												"</li>" +
												"<li>" +
													"<div class='user-add'>" +
														"<div id='register-text'>Register</div>" +
														"<div class='spinner-container'>" +
															"<div class='login-spinner'></div>" +
														"</div>" +
													"</div>" +
													"<div class='user-cancel'>" +
														"<div id='button-text'>Cancel</div>" +
													"</div>" +
													"<div class='user-go-login'>" +
														"<div id='button-text'>Go to login</div>" +
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
					this.querySelector("#login-text").style.display = "none";
					this.querySelector(".login-spinner").style.display = "block";
					LoginController.doLogin(_user, function (data) {

						if (data === "OK") {
							window.location.hash = "#admin/news"
						} else {
							$view.find("#login-text").css("display", "block");
							$view.find(".login-spinner").css("display", "none");
						}
					});	
				}
			});

			$view.find(".user-cancel").bind('click', function () {
				window.location.hash = "#news";
			});

			$view.find(".user-go-register").bind('click', function () {
				$view.find("#login-container").css("display", "none");
				$view.find("#register-container").css("display", "block");
			});

			$view.find(".user-go-login").bind('click', function () {
				$view.find("#login-container").css("display", "block");
				$view.find("#register-container").css("display", "none");
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
