define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function postEntry(projectId, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doPost(Configuration.get("API_URL") + "/admin/projects/" + projectId + "/articles/add",
				"article entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function deleteEntry(projectId, articleId, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/projects/" + projectId + "/articles/" +articleId,
				"article entry",

				function(data) {
					callback(data);
				});
	}

	function getEntry(projectId, articleId, callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects/" + projectId + "/articles/" + articleId,
				"article",

				function(data) {
					var json = jQuery.parseJSON(data);

					callback(json);
		});
	}

	function getEntryByTitle(projectTitle, articleTitle, callback) {

		Request.doGet(Configuration.get("API_URL") + "/projects/" + projectTitle + "/articles/" + articleTitle,
				"article",

				function(data) {
					var json = jQuery.parseJSON(data);

					callback(json);
		});
	}

	function updateEntry(projectId, entry, callback) {
		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/projects/" + projectId + "/articles/" + entry.articleId,
				"news entry",
				json,

				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.newsId - x.newsId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		postEntry : postEntry,
		getEntry: getEntry,
		getEntryByTitle: getEntryByTitle,
		updateEntry: updateEntry,
		deleteEntry: deleteEntry,
		endOfEntries: endOfEntries
	};
});
