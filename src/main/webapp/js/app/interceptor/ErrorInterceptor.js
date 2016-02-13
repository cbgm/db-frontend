define([
	'lib/jquery.cookie',
	'lib/jquery'
	
], function (
	cookie,
	jQuery
) {
	'use strict';

	/**
	 * ErrorInterceptor class
	 */

	function init (callback) {

		//register 403 interceptor for forbidden actions
		jQuery.ajaxSetup({
			statusCode: {
				403: function (data, textStatus, jqxhr) {

					if (data.status === 403) {
						var modal = jQuery("#forbidden-overlay");

						modal.css('visibility', 'visible');

						setTimeout(function() {
							modal.css('visibility', 'hidden');
						}, 1000);
					}
				},
				404: function (data, textStatus, jqxhr) {

					if (data.status === 404) {
						window.location.hash = "#error";
					}
				},
				401: function (data, textStatus, jqXHR) {

					if (data.status === 401) {
						var cookie = JSON.stringify({method: 'GET', url: '/', csrf: data.getResponseHeader('X-CSRF-TOKEN')});
						if (cookie !== null)
							jQuery.cookie('cb-auth', cookie);
			 
						window.location.hash = '#login';
					}
				},
				0: function (data, textStatus, jqxhr) {

//					if(textStatus === "timeout") {
//						window.location.hash = '#timeout';
//					}
				}
				
			}
		});
		callback();
	}

	return {
		init: init
	}
});
