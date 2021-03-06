define([
	'util/Logger',
	'model/URLDefinition',
	'mainview/LoadingView',
	'mainview/visitor/HeaderView',
	'mainview/visitor/NavigationView',
	'mainview/visitor/FooterView',
	'mainview/visitor/CopyView',
	'mainview/ModalView',
	'partialview/visitor/NewsView',
	'partialview/visitor/SingleNewsView',
	'partialview/visitor/AboutView',
	'partialview/visitor/GuestbookView',
	'partialview/visitor/ProjectView',
	'partialview/visitor/SingleProjectView',
	'partialview/visitor/ArticleView',
	'partialview/visitor/ImprintView',
	'partialview/visitor/ErrorView',
	'partialview/visitor/TimeoutView',
	'lib/jquery'
	
], function (
	Logger,
	URLDefinition,
	LoadingView,
	VisitorHeaderView,
	VisitorNavigationView,
	VisitorFooterView,
	VisitorCopyView,
	ModalView,
	VisitorNewsView,
	VisitorSingleNewsView,
	VisitorAboutView,
	VisitorGuestbookView,
	VisitorProjectView,
	VisitorSingleProjectView,
	VisitorArticleView,
	VisitorImprintView,
	ErrorView,
	TimeoutView,
	jQuery
	
) {
	'use strict';

	/**
	 * VisitorState class
	 */
	return function (URLMap) {
		//some vars
		var _mainView = null,
			_loadingView = new LoadingView(),
			_headerView = null,
			_navigationView = null,
			_footerView = null,
			_copyView = null,
			_contentView = null,
			_init = true;

		//private functions
		this.updateState =function (route) {
			var newRoute = route;

			if(URLDefinition.checkkUrl(route, 'guestbookOverview')) {
				_contentView = new VisitorGuestbookView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
			}

			if(URLDefinition.checkkUrl(route, 'aboutOverview')) {
				_contentView = new VisitorAboutView();
				_mainView.setDummy(true);
				_mainView.appendContent(_contentView.get());
				_mainView.setDummy(false);
			}

			if(URLDefinition.checkkUrl(route, 'imprintOverview')) {
				_contentView = new VisitorImprintView();
				_mainView.setDummy(true);
				_mainView.appendContent(_contentView.get());
				_mainView.setDummy(false);
			}

			if(URLDefinition.checkkUrl(route, 'newsSingle')) {
				_contentView = new VisitorSingleNewsView();
				_mainView.setDummy(true);
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					_mainView.setDummy(false);
				});
				
			}

			if(URLDefinition.checkkUrl(route, 'newsOverview')) {
				_contentView = new VisitorNewsView();
				_mainView.setDummy(true);
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					_mainView.setDummy(false);
				});
			}

			if(URLDefinition.checkkUrl(route, 'projectsOverview')) {
				_contentView = new VisitorProjectView();
				_mainView.setDummy(true);
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					_mainView.setDummy(false);

				});
			}

			if(URLDefinition.checkkUrl(route, 'projectsSingle')) {
				_contentView = new VisitorSingleProjectView();
				_mainView.setDummy(true);
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					_mainView.setDummy(false);
				});
			}

			if(URLDefinition.checkkUrl(route, 'projectsArticleSingle')) {
				_contentView = new VisitorArticleView();
				_mainView.setDummy(true);
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					_mainView.setDummy(false);
				});
			}

			if(URLDefinition.checkkUrl(route, 'error')) {
				_contentView = new ErrorView();
				_mainView.appendContent(_contentView.get());
			}

			if(URLDefinition.checkkUrl(route, 'timeout')) {
				_contentView = new TimeoutView();
				_mainView.appendContent(_contentView.get());
			}
		}

		//public functions
		this.init = function (callback) {
			_mainView = new ModalView();
			_headerView = new VisitorHeaderView();
			_mainView.appendHeader(_headerView);
			_navigationView = new VisitorNavigationView();
			_mainView.appendNavigation(_navigationView);
			_footerView =  new VisitorFooterView();
			_mainView.appendFooter(_footerView);
			_copyView =  new VisitorCopyView();
			_mainView.appendCopy(_copyView);
			jQuery('#content-container').scrollTop(0);

			callback(_mainView);
		};
	};
});
