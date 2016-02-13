define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/users", "users",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);
			callback(json);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/users/add",
				"user entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function deleteEntry(name, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/users/" + name,
				"user entry",

				function(data) {
					callback(data);
				});
	}

	function getEntry(name, callback) {

		Request.doGet(Configuration.get("API_URL") + "/users/" + name,
				"news",

		function(data) {
			var json = jQuery.parseJSON(data);
			callback(json);
		});
	}

	function updateEntry(name, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/users/"+ name,
				"user entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.userId - x.userId;
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
