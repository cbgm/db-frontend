define([
	'interceptor/ErrorInterceptor',
	'util/Logger',
	'lib/jquery'
	
], function (
	ErrorInterceptor,
	Logger,
	jQuery
) {
	'use strict';

	/**
	 * Core class
	 */
	return function () {

		//public functions
		this.init = function (callback) {

			ErrorInterceptor.init(function () {
				Logger.log("Success initializing interceptors", "success", "Core");
			});

			callback();
		};

		this.start = function () {
		};
	};
});
