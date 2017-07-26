define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects", "projects",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			for (var i = 0; i < json.length; i++) {
				var articles = json[i].articles;
				articles.sort(SortByIDSub);
				json[i].articles = articles;
			}
			callback(json);
		});
	}

	function getPaginatedEntries(ix, callback) {

		Request.doGetWithParams(Configuration.get("API_URL")
				+ "/projects/page", "projects", "start=" + ((ix * 5) - 5) + "&end=" + (ix * 5) + "",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			for (var i = 0; i < json.length; i++) {
				var articles = json[i].articles;
				articles.sort(SortByIDSub);
				json[i].articles = articles;
			}
			callback(json);
		});
	}

	function postEntry(entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/projects/add",
				"project",
				json,

				function(data) {
					callback(data);
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/projects/" +id,
				"news entry",
				function(data) {
					callback(data);
				});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects/" + id,
				"projects",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.articles.sort(SortByIDSub);
			var articles = json.articles;
			articles.sort(SortByIDSub);
			json.articles = articles;
			callback(json);
		});
	}

	function getEntryByTitle(title, callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects/" + title,
				"projects",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.articles.sort(SortByIDSub);
			var articles = json.articles;
			articles.sort(SortByIDSub);
			json.articles = articles;
			callback(json);
		});
	}

	function updateEntry(id, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/projects/" + id,
				"project entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.projectId - x.projectId;
	}

	function SortByIDSub(x, y) {
		return  x.articleId - y.articleId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		getEntries : getEntries,
		deleteEntry: deleteEntry,
		updateEntry: updateEntry,
		getEntry: getEntry,
		getEntryByTitle: getEntryByTitle,
		getPaginatedEntries : getPaginatedEntries,
		postEntry : postEntry,
		endOfEntries: endOfEntries
	};
});
