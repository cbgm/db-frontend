define( function () {
	requirejs.config({
		baseUrl: '.',
		paths: {
			lib: 'js/lib',
			model: 'js/app/model',
			interceptor: 'js/app/interceptor',
			controller: 'js/app/controller',
			state: 'js/app/state',
			util: 'js/app/util',
			view: 'js/app/view',
			canvas: 'js/app/view/canvas',
			partialview: 'js/app/view/partial',
			mainview : 'js/app/view/mainview'
		},
		map: {
			'lib/jqueryloader' : {
				'lib/jquery': 'lib/jquery.min'
			},
			'*' : {
				'lib/jquery' : 'lib/jqueryloader',
				jquery : 'lib/jqueryloader'
			}
		},
		shim : {
		},
		enforceDefine: false

	});

	require(['js/app/main']);
});
