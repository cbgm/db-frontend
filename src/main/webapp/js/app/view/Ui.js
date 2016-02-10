define([
	'util/Logger',
	'controller/Core',
	'controller/Router',
	'state/UiStateManager',
	'mainview/LoadingView',
	'mainview/ModalView',
	'lib/jquery'
	
], function (
	Logger,
	Core,
	Router,
	UiStateManager,
	LoadingView,
	ModalView,
	jQuery
	
) {
	'use strict';

	/**
	 * Ui class
	 */
	return function (core) {
		//some vars
		var _core = null,
			_router = null,
			_mainView = new ModalView(),
			_uiStateManager = new UiStateManager();

		if (core instanceof Core) {
			_core = core;
		} else {
			Logger.log("Core has not the right type", "ERROR");
		}

		//private functions
		function updateUi (route) {
			_uiStateManager.updateState(route);

		}

		function updateState (state) {

			_uiStateManager.initState(state, function (view) {
				_mainView = view;
				jQuery("#container").empty();
				jQuery("#container").append(_mainView.get());
				_mainView.show();
				jQuery('#search-box input').focus();
			});
		}

		this.init = function (callback) {
			_router = new Router(updateUi, updateState);
			_router.startRouting();
			_mainView = new ModalView();
			_mainView.hide();
			callback();
		};
	};
});
