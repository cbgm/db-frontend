define([
	'util/Util',
	'canvas/LoadingCanvas',
	'lib/jquery'
], function (
	Util,
	LoadingCanvas,
	jQuery
) {
	'use strict';

	/**
	 * LoadingView class
	 */
	return function () {
		var _loadingCanvas = null,
			_view;

		_view = (function () {
			var $loadingView = jQuery(
					"<div id='content'>" +
					"<div id='content-spacer' class='loading'>" +
						"<div class='canvas-container'>" +
							"<div id='spinner-holder'>" +
								"<div class='spinner-container'>" +
									"<div class='loading-spinner'></div>" +
								"</div>" +
							"</div>" +
						"</div>" +
						
					"</div>" +
				"</div>");

//			if (Util.isCanvasSupported()) {
//				_loadingCanvas = new LoadingCanvas();
//
//				$loadingView.find('.canvas-container').append(_loadingCanvas.get());
//			} else {
//				$loadingView.find('.canvas-container').append("<p>Loading...</p>");
//			}

			return $loadingView;
		})();

		// public methods

		this.get = function () {
//			var _loadingCanvas = new LoadingCanvas();
//
//			_view.find('#content-spacer').append(_loadingCanvas.get());
			return _view;
		};

		this.animate = function () {
//			if (Util.isCanvasSupported()) {
//				_loadingCanvas.animate();
//			}
		};
		
		this.disable = function () {
//			if (Util.isCanvasSupported()) {
//				_loadingCanvas.disable();
//			}
		};


	};
});
