define([

], function (

) {
	'use strict';

	var _configuration = {
				DEBUG: true,
				LOG_USER: false,
//				API_URL: "/backend",
//				API_URL: "http://localhost:8080/backend",
				API_URL: "http://creativespace.ddns.net:8080/backend",

				LOADING_CANVAS_SPEED: 20
			};

	function get (identifier) {
		if(_configuration.hasOwnProperty(identifier)){
			return _configuration[identifier];
		}
	}

	return {
		get: get
	};
});
