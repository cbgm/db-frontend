define([
	'util/Logger',
	'state/VisitorState',
	'state/LoginState',
	'state/AdminState',
	'lib/jquery'
	
], function (
	Logger,
	VisitorState,
	LoginState,
	AdminState,
	jQuery
	
) {
	'use strict';

	/**
	 * VisitorState class
	 */
	return function () {
		//some vars
		var _currentState = null,
			_visitorState = new VisitorState(),
			_adminState = new AdminState(),
			_loginState = new LoginState();

		this.updateState =function (route) {
			_currentState.updateState(route);
		}

		this.initState = function (state, callback) {
			var tempView = null;

			if (state === "ADMIN"){
				_adminState.init(function (view) {
					tempView = view;
					_currentState = _adminState;
				});
			} else if (state === "VISITOR") {
				_visitorState.init(function (view) {
					tempView = view;
					_currentState = _visitorState;
				});
			} else {
				_loginState.init(function (view) {
					tempView = view;
					_currentState = _loginState;
				});
			}
			callback(tempView);
		};
		
	};
});
