define([
	'controller/UserController',
	'util/Logger',
	'lib/jquery-te',
	'lib/i18n!partialview/nls/UserView_strings',
	'lib/jquery'
	
], function (
	UserController,
	Logger,
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
			_user = {
				username: "",
				password: "",
//				date: '',
				role: ""
			},
			_pwmatch = false;;
		
		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='user'>" +
							"<div id='entries' class='section'>" +
								"<div>" +
									"<div>" +
										"<div class='entry-name-edit'><input type='text' placeholder='" + Strings.name_placeholder_text + "'></input></div>" +
										"<div class='entry-pw-edit'><input type='password' placeholder='" + Strings.password_placeholder_text + "'></input></div>" +
										"<div class='entry-pwapprove-edit'><input type='password' placeholder='" + Strings.passwordapp_placeholder_text + "'></input></div>" +
										"<div class='entry-role-edit'>" +
											"<select id='role-select' name='roles'>" +
												"<option value='ROLE_ADMIN'>ROLE_ADMIN</option>" +
												"<option value='ROLE_MODERATOR' selected>ROLE_MODERATOR</option>" +
												"<option value='ROLE_WATCHER'>ROLE_WATCHER</option>" +
											"</select>" +
										"</div>" +
										"<div class='entry-error'>The passwords do not match</div>" +
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
								"</div>"+
							"</div>" +
							"<div style='clear: both;'></div>" +
						"</div>" +
					"</div>");
			
			$view.find(".entry-cancel").bind('click', function () {
				window.location.hash = "#admin/users";
			});

			$view.find(".entry-pwapprove-edit").keyup(function(e) {
				
				var pwa = $view.find('.entry-pwapprove-edit input').val();
				var pw = $view.find('.entry-pw-edit input').val();
				if (pw !== "") {
					if (pwa !== pw) {
						$view.find(".entry-error").css("display", "block");
						_pwmatch = false;
					} else {
						$view.find(".entry-error").css("display", "none");
						_pwmatch = true;
					}
				}
			});

			$view.find(".entry-pw-edit").keyup(function(e) {
				
				var pwa = $view.find('.entry-pwapprove-edit input').val();
				var pw = $view.find('.entry-pw-edit input').val();
				if (pwa !== "") {
					if (pwa !== pw) {
						$view.find(".entry-error").css("display", "block");
						_pwmatch = false;
					} else {
						$view.find(".entry-error").css("display", "none");
						_pwmatch = true;
					}
				}
			});
			
			$view.find(".entry-post").bind('click', function () {
				_user.username = $view.find('.entry-name-edit input').val();
				_user.password = $view.find('.entry-pw-edit input').val();
				_user.role = $view.find('select[name=roles]').val()

				if (_user.username !== "" && _user.password !== "" && _user.role !== "" && _pwmatch) {
					this.querySelector(".post-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";
	
					UserController.postEntry(_user, function (data) {
	
						if (data === "OK") {
							window.location.hash = "#admin/users";
						} else {
							$view.find(".post-text").css("display", "block");
							$view.find(".loading-spinner").css("display", "none");
						}
					});
				}
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
