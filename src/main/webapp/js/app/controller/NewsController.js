define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/news", "news",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);
			callback(json);
		});
	}

	function getPaginatedEntries(ix, callback) {

		Request.doGetWithParams(Configuration.get("API_URL")
				+ "/news/page", "news", "start=" + ((ix * 20) - 20) + "&end=" + (ix * 20) + "",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			callback(json);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/news/add",
				"news entry",
				json,

				function() {
					callback();
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/news/" +id,
				"news entry",

				function() {
					callback();
				});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/news/" + id,
				"news",

		function(data) {
			var json = jQuery.parseJSON(data);
			callback(json);
		});
	}

	function updateEntry(id, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/news/"+ id,
				"news entry",
				json,

				function() {
					callback();
				});
	}

	function SortByID(x, y) {
		return  y.newsId - x.newsId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		getEntries : getEntries,
		getPaginatedEntries : getPaginatedEntries,
		postEntry : postEntry,
		getEntry: getEntry,
		updateEntry: updateEntry,
		deleteEntry: deleteEntry,
		endOfEntries: endOfEntries
	};
});
