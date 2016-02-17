define([
	'lib/jquery'

], function (
	jQuery
) {
	'use strict';

	function isCanvasSupported(){
		var elem = document.createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	}

	function toHtml(string) {
		var entityMap = {
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				'"': '&quot;',
				"'": '&#39;',
				"/": '&#x2F;',
				"\n" : '<br>'
			};

		return string.replace(/[&<>"'\/]|[\n]/g, function (string) {
			return entityMap[string];
		});
	}

	return {
		isCanvasSupported: isCanvasSupported,
		toHtml: toHtml
	};
});
