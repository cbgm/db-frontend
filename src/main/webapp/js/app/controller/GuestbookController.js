define([ 'util/Logger', 'util/Request', 'util/Configuration', 'lib/jquery'

], function (Logger, Request, Configuration, jQuery) {
	'use strict';

	function getEntries(callback) {

		Request.doGet(Configuration.get("API_URL") + "/guestbook", "guestbook",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			callback(json);
		});
	}

	function getPaginatedEntries(ix, callback) {

		Request.doGetWithParams(Configuration.get("API_URL")
				+ "/guestbook/page", "guestbook", "start=" + ((ix * 20) - 20) + "&end=" + (ix * 20) + "",

		function(data) {
			var json = jQuery.parseJSON(data);
			json.sort(SortByID);

			callback(json);
		});
	}

	function getEntry(id, callback) {

		Request.doGet(Configuration.get("API_URL") + "/guestbook/" + id, "guestbook",

		function(data) {
			var json = jQuery.parseJSON(data);

			callback(json);
		});
	}

	function updateEntry(id, entry, callback) {

		var json = JSON.stringify(entry);
		Request.doUpdate(Configuration.get("API_URL") + "/admin/guestbook/"+ id,
				"guestbook entry", '{"author":"' + entry.author
						+ '","content":"' + entry.content + '"}',

				function(data) {
					callback(data);
				});
	}

	function postEntry(entry, callback) {

		Request.doPost(Configuration.get("API_URL") + "/guestbook/add",
				"guestbook entry", '{"author":"' + entry[0].value
						+ '","content":"' + entry[1].value + '"}',

				function(data) {
					callback(data);
				});
	}

	function deleteEntry(id, callback) {

		Request.doDelete(Configuration.get("API_URL") + "/admin/guestbook/" +id,
				"guestbook",

				function(data) {
					callback(data);
				});
	}

	function SortByID(x, y) {
		return  y.guestbookEntryId - x.guestbookEntryId;
	}

	function endOfEntries(){
		return noMoreEntries;
	}

	return {
		getEntries : getEntries,
		getPaginatedEntries : getPaginatedEntries,
		postEntry : postEntry,
		deleteEntry : deleteEntry,
		getEntry : getEntry,
		updateEntry : updateEntry,
		endOfEntries: endOfEntries
	};
});
