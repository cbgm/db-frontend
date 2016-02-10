define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function doLogin(user, callback) {

		var data = "username=" + user.name + "&password=" + user.password + "";
		Request.doLogin(Configuration.get("API_URL") + "/login", "login", data,
				function(data) {

			callback(data);
		});

	}

	function doLogout(callback) {

		Request.doLogout(Configuration.get("API_URL") + "/logout", "logout",
				function(data) {

			callback(data);
		});
	}

	function checkLogin(callback) {

		Request.doAuth(Configuration.get("API_URL") + "/login-check", "user-validation",
				function(data) {

			callback(data);
		});
	}

	return {
		doLogin : doLogin,
		doLogout: doLogout,
		checkLogin: checkLogin
	};
});
