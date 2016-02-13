define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/tags", "tags",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			callback(json);
		});
	}

	function addEntry(entry, callback) {
		var json = JSON.stringify(entry);

		Request.doPost(Configuration.get("API_URL") + "/admin/tags/add",
				"tags entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/tags/" +id,
				"tags entry",

				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.projectId - x.projectId;
	}

	return {
		getEntries : getEntries,
		addEntry : addEntry,
		deleteEntry: deleteEntry
	};
});
