define([
    'controller/LoginController',
	'lib/jquery'
	
], function (
	LoginController,
	JQuery
) {
	'use strict';

	/**
	 * Router class
	 */
	return function (update, state) {
		//some vars
		var _update = update,
			_state = state,
			_check =false,
			_currentState = null,
			_stateUpdate = false,
			_routes = [
			           {hash: "#news"},
			           {hash: "#about"},
			           {hash: "#projects"},
			           {hash: "#guestbook"},
			           {hash: "#login"},
			           {hash: "#error"},
			           {hash: "#timeout"},
			           {hash: "#admin"}
			           ],
			_defaultRoute = "#news",
			_currentHash = '';

		//private functions
		this.startRouting = function(){
			window.location.hash = window.location.hash || _defaultRoute;
			setInterval(hashCheck, 100);
		}

		function hashCheck(){

			if (window.location.hash != _currentHash){

				for (var i = 0, currentRoute; currentRoute = _routes[i++];){

					if ((window.location.hash).indexOf(currentRoute.hash) !== -1) {

						if ((window.location.hash).indexOf("#admin") !== -1) {

							if (!_check) {
								_check = true;

								LoginController.checkLogin(function (data) {

									if (data === "OK") {

										if (_currentState !== "ADMIN") {
											_currentState = "ADMIN";
											_state("ADMIN");
										}
										_currentHash = window.location.hash;
										_update(window.location.hash);
										_check = false;
										return;
									} else {
										_currentState = "LOGIN";
										_state("LOGIN");
										window.location.hash = "#login";
										_currentHash = "#login";
										_update(window.location.hash);
										_check = false;
										return;
									}
								});
							}
						} else if ((window.location.hash).indexOf("#login") !== -1){

							if (_currentState !== "LOGIN") {
								_currentState = "LOGIN";
								_state("LOGIN");
							}
							_currentHash = window.location.hash;
							_update(window.location.hash);
							return;
						} else {

							if (_currentState !== "VISITOR") {
								_currentState = "VISITOR";
								_state("VISITOR");
//								}
							}
							_currentHash = window.location.hash;
							_update(window.location.hash);
							return;
						}
					}
				}
			}
		}
	};
});
