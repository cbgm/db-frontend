define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects", "projects",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			for (var i = 0; i < json.lenth; i++) {
				json[i].articles.sort(SortByIDSub);
			}
			callback(json);
		});
	}

	function getPaginatedEntries(ix, callback) {

		Request.doGetWithParams(Configuration.get("API_URL")
				+ "/projects/page", "projects", "start=" + ((ix * 20) - 20) + "&end=" + (ix * 20) + "",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			for (var i = 0; i < json.lenth; i++) {
				json[i].articles.sort(SortByIDSub);
			}
			callback(json);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/projects/add",
				"project",
				json,

				function() {
					callback();
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/projects/" +id,
				"news entry",
				function() {
					callback();
				});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects/" + id,
				"projects",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.articles.sort(SortByIDSub);

			callback(json);
		});
	}

	function updateEntry(id, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/projects/" + id,
				"project entry",
				json,

				function() {
					callback();
				});
	}

	function SortByID(x, y) {
		return  y.projectId - x.projectId;
	}

	function SortByIDSub(x, y) {
		return  y.articleId - x.articleId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		getEntries : getEntries,
		deleteEntry: deleteEntry,
		updateEntry: updateEntry,
		getEntry: getEntry,
		getPaginatedEntries : getPaginatedEntries,
		postEntry : postEntry,
		endOfEntries: endOfEntries
	};
});
