define([
	'lib/jquery.cookie',
	'lib/jquery',
	'util/Logger'
], function (
	cookie,
	jQuery,
	Logger
) {
	'use strict';

	jQuery.support.cors = true
	jQuery.ajaxSetup({
//		timeout: 25000,
		beforeSend: function(xhr) {
			var cookie = null;

			if (jQuery.cookie('cb-auth')){
				cookie = JSON.parse(jQuery.cookie('cb-auth'));
				xhr.setRequestHeader('X-CSRF-TOKEN', cookie.csrf);
			} else {
				xhr.setRequestHeader('X-CSRF-TOKEN', null);
			}

			//needed for csrf
			//needed for preflight request
			xhr.setRequestHeader('X-Requested-With');
		}
	});

	function doPost (url, log, data, callback) {

		jQuery.ajax({
			url:url,
			type:'POST',
			data: data,
			contentType: 'application/json',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
				updateCookie (jqXHR);
				Logger.log("finished posting " + log);
				callback("OK");

		}).fail (function (jqXHR, textStatus, errorThrown) {
				Logger.log("failure posting " +log);
				if (jqXHR.status === 401) {
					window.location.hash = "#login";
				} else {
					callback("FAIL");
				}
		});

	}

	function doLogin (url, log, data, callback) {

		jQuery.ajax({
			url:url,
			type: 'POST',
			data: data,
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("success " + log);
			callback("OK");

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure " + log);
			callback("FAIL");
		});
	}

	function doLogout (url, log, callback) {

		jQuery.ajax({
			url:url,
			type: 'POST',
			data: {},
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("success " + log);
			callback("OK");

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure " +log);
			callback("FAIL");
		});
	}

	function doUpdate (url, log, data, callback) {

		jQuery.ajax({
			url:url,
			type:'PUT',
			data: data,
			contentType: 'application/json',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("finished updating " + log);
			callback("OK");

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure updating " +log);
			callback("FAIL");
		});
	}

	function doGet (url, log, callback) {

		jQuery.ajax({
			url: url,
			type:'GET',
		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("finished loading " + log);
			callback(data);

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure loading " + log);
		});
	}
	
	function doAuth (url, log, callback) {

		jQuery.ajax({
			url: url,
			type:'GET',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("finished " + log);
			callback("OK");

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure " + log);

			if (jqXHR.status === 401) {
				callback("FAIL");
			}
		});
	}

	function doDelete (url, log, callback) {
		jQuery.ajax({
			url: url,
			type:'DELETE',
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("finished deleting " + log);
			callback("OK");

		}).fail (function (data, textStatus, jqXHR) {
			Logger.log("failure deleting " + log);
			callback("FAIL");
		});
	}

	function doGetWithParams (url, log, data, callback) {
		jQuery.ajax({
			url: url,
			type:'GET',
			data: data,

		}).done (function (data, textStatus, jqXHR) {
			updateCookie (jqXHR);
			Logger.log("finished loading " + log);
			callback(data);

		}).fail (function (jqXHR, textStatus, errorThrown) {
			Logger.log("failure loading " + log);

		});
	}

	function updateCookie (jqXHR) {
		var csrfToken = jqXHR.getResponseHeader('X-CSRF-TOKEN');

		if (csrfToken) {
			var cookie = null;
			if (jQuery.cookie('cb-auth')) {
				cookie = JSON.parse(jQuery.cookie('cb-auth'));
				cookie.csrf = csrfToken;
				jQuery.cookie('cb-auth', JSON.stringify(cookie));
			} else {
				cookie = JSON.stringify({method: 'GET', url: '/', csrf: csrfToken});
				jQuery.cookie('cb-auth', cookie);
			}
			
		}
	}

	return {
		doPost: doPost,
		doGet: doGet,
		doDelete: doDelete,
		doUpdate: doUpdate,
		doGetWithParams: doGetWithParams,
		doLogin: doLogin,
		doLogout: doLogout,
		doAuth: doAuth
	};
});
