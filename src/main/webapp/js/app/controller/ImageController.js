define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/images", "images",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			callback(json);
		});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/images/" + id, "image",

		function(data) {

			callback(data);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/images/upload",
				"image",
				json,
				
				function(data) {
					callback(data);
		});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/images/" +id,
				"image",
				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.imageId - x.imageId;
	}

	return {
		getEntries : getEntries,
		postEntry : postEntry,
		deleteEntry : deleteEntry,
		getEntry : getEntry,
	};
});
