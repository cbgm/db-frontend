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

	return {
		isCanvasSupported: isCanvasSupported,
	};
});
