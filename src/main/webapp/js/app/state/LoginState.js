define([
	'util/Logger',
	'model/URLDefinition',
	'mainview/LoadingView',
	'mainview/admin/HeaderView',
	'mainview/admin/NavigationView',
	'mainview/admin/FooterView',
	'mainview/admin/CopyView',
	'mainview/ModalView',
	'partialview/login/CredentialView',
	'lib/jquery'
	
], function (
	Logger,
	URLDefinition,
	LoadingView,
	AdminHeaderView,
	AdminNavigationView,
	AdminFooterView,
	AdminCopyView,
	ModalView,
	CredentialView,
	jQuery
	
) {
	'use strict';

	/**
	 * AdminState class
	 */
	return function () {
		//some vars
		var _mainView = null,
			_loadingView = new LoadingView(),
			_headerView = null,
			_navigationView = null,
			_footerView = null,
			_copyView = null,
			_contentView = null;

		//private functions
		this.updateState =function (route) {
			var newRoute = route;

			if(URLDefinition.checkkUrl(route, "login")) {
				_contentView = new CredentialView();
				_mainView.appendContent(_contentView.get());
				
			}
		}

		//public functions
		this.init = function (callback) {
			_mainView = new ModalView();
			_mainView.appendHeader(null);
			_mainView.appendNavigation(null);
			_mainView.appendFooter(null);
			_mainView.appendCopy(null);
			callback(_mainView);
		};
	};
});
