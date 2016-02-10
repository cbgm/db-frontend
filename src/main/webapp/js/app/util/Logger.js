define([
	'util/Configuration',
	'lib/jquery'

], function (
	Configuration,
	jQuery
) {
	'use strict';

	function log (message, type, clazz){
		if (Configuration.get("DEBUG") && typeof console !== "undefined"){
			if(type === "error"){
				console.log("ERROR: " + message + " : in" + clazz);
			} else {
				console.log(message);
			}
		}
	}

	return {
		log: log
	};
});
