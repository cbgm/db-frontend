define([
	'controller/UserController',
	'util/Logger',
	'lib/jquery-te',
	'lib/jquery'
	
], function (
	UserController,
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
			_user = {
				username: "",
				password: "",
//				date: '',
				role: ""
			},
			_pwmatch = false,
			oldUser
		
		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='admin'>" +
						"<div id='content-spacer' class='user'>" +
							"<div id='entries' class='section'>" +
								"<div>" +
									"<div>" +
										"<div class='entry-name-edit' disabled><input type='text' placeholder='Input the username' disabled></input></div>" +
										"<div class='entry-pw-edit'><input type='password' placeholder='Input the password'></input></div>" +
										"<div class='entry-pwapprove-edit'><input type='password' placeholder='Input the password for approval'></input></div>" +
										"<div class='entry-role-edit'>" +
											"<select id='role-select' name='roles' size='3'>" +
												"<option value='ROLE_ADMIN'>ROLE_ADMIN</option>" +
												"<option value='ROLE_MODERATOR' selected>ROLE_MODERATOR</option>" +
												"<option value='ROLE_WATCHER'>ROLE_WATCHER</option>" +
											"</select></div>" +
										"<div class='entry-error'>The passwords do not match</div>" +
										"<div style='clear: both;'></div>" +
										"<div class='entry-update'>" +
											"<div class='update-text'>Post</div>" +
											"<div class='spinner-container'>" +
												"<div class='loading-spinner white'></div>" +
											"</div>" +
										"</div>" +
										"<div class='entry-cancel'>Cancel</div>"+
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
			
			$view.find(".entry-update").bind('click', function () {
				_user.username = $view.find('.entry-name-edit input').val();
				_user.password = $view.find('.entry-pw-edit input').val();
				_user.role = $view.find('select[name=roles]').val();

				if (_user.username !== "" && _user.password !== "" && _user.role !== "" && _pwmatch) {
					this.querySelector(".update-text").style.display = "none";
					this.querySelector(".loading-spinner").style.display = "block";
	
					UserController.updateEntry(_user.username, _user, function (data) {
	
						if (data === "OK") {
							window.location.hash = "#admin/users";
						} else {
							$view.find(".update-text").css("display", "block");
							$view.find(".loading-spinner").css("display", "none");
						}
					});
				}
			});

			return $view;
		})();

		function update (callback){
			var split = window.location.hash.split("/"); 
			var username = split[split.length-1];

			UserController.getEntry(username, function (data) {
				_view.find('.entry-name-edit input').val(data.username);
				_view.find(".entry-name-edit input").css("background", "white");
				_view.find('select[name=roles]').val(data.roles[0].role);
				callback();
			});
		}

		this.updateEntries = function (callback){

			update(function () {
				callback();
			});
		};

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
