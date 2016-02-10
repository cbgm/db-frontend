define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/galleries", "gallery",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);
			callback(json);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/galleries/add",
				"gallery entry",
				json,

				function() {
					callback();
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/galleries/" +id,
				"gallery entry",

				function() {
					callback();
				});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/galleries/" + id,
				"gallery",

		function(data) {
			var json = jQuery.parseJSON(data);
			callback(json);
		});
	}

	function updateEntry(id, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/galleries/"+ id,
				"gallery entry",
				json,

				function() {
					callback();
				});
	}

	function SortByID(x, y) {
		return  y.galleryId - x.galleryId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		getEntries : getEntries,
		postEntry : postEntry,
		getEntry: getEntry,
		updateEntry: updateEntry,
		deleteEntry: deleteEntry,
		endOfEntries: endOfEntries
	};
});
