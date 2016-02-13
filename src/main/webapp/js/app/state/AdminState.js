define([
	'util/Logger',
	'model/URLDefinition',
	'mainview/LoadingView',
	'mainview/admin/HeaderView',
	'mainview/admin/NavigationView',
	'mainview/admin/FooterView',
	'mainview/admin/CopyView',
	'mainview/ModalView',
	'partialview/admin/NewsView',
	'partialview/admin/EditNewsView',
	'partialview/admin/AddNewsView',
	'partialview/admin/GuestbookView',
	'partialview/admin/EditGuestbookView',
	'partialview/admin/ProjectView',
	'partialview/admin/EditProjectView',
	'partialview/admin/AddProjectView',
	'partialview/admin/AddArticleView',
	'partialview/admin/EditArticleView',
	'partialview/admin/TagView',
	'partialview/admin/ImageView',
	'partialview/admin/GalleryView',
	'partialview/admin/AddGalleryView',
	'partialview/admin/EditGalleryView',
	'partialview/admin/UserView',
	'partialview/admin/EditUserView',
	'partialview/admin/AddUserView',
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
	AdminNewsView,
	AdminEditNewsView,
	AdminAddNewsView,
	AdminGuestbookView,
	AdminEditGuestbookView,
	AdminProjectView,
	AdminEditProjectView,
	AdminAddProjectView,
	AdminAddArticleView,
	AdminEditArticleView,
	AdminTagView,
	AdminImageView,
	AdminGalleryView,
	AdminAddGalleryView,
	AdminEditGalleryView,
	AdminUsersView,
	AdminEditUsersView,
	AdminAddUsersView,
	jQuery
	
) {
	'use strict';

	/**
	 * AdminState class
	 */
	return function (URLMap) {
		//some vars
		var _mainView = null,
			_loadingView = null,
			_headerView = null,
			_navigationView = null,
			_footerView = null,
			_copyView = null,
			_contentView = null;

		//private functions
		this.updateState =function (route) {
			var newRoute = route;
			_loadingView = new LoadingView();

			if(URLDefinition.checkkUrl(route, "adminNewsOverview")) {
				_contentView = new AdminNewsView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
				
			}

			if(URLDefinition.checkkUrl(route, "adminNewsAdd")) {
				_contentView = new AdminAddNewsView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
					jQuery('.jqte_toolbar').append('<div class="jqte_tool jqte_tool_22 unselectable" role="button"><a class="jqte_tool_icon unselectable"></a></div>');
					jQuery('.jqte_tool_22 a').bind('click', function(){
						jQuery('[type=file]:enabled').click();
					});
				});
				return;
				
			}

			if(URLDefinition.checkkUrl(route, "adminNewsEdit")) {
				_contentView = new AdminEditNewsView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminTagsOverview")) {
				_contentView = new AdminTagView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminGuestbookOverview")) {
				_contentView = new AdminGuestbookView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminGuestbookEdit")) {
				_contentView = new AdminEditGuestbookView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminProjectsOverview")) {
				_contentView = new AdminProjectView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				
			}

			if(URLDefinition.checkkUrl(route, "adminProjectsAdd")) {
				_contentView = new AdminAddProjectView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminProjectsEdit")) {
				_contentView = new AdminEditProjectView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminArticlesAdd")) {
				_contentView = new AdminAddArticleView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminArticlesEdit")) {
				_contentView = new AdminEditArticleView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminImagesOverview")) {
				_contentView = new AdminImageView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				
			}

			if(URLDefinition.checkkUrl(route, "adminGalleriesOverview")) {
				_contentView = new AdminGalleryView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminGalleriesAdd")) {
				_contentView = new AdminAddGalleryView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				
			}

			if(URLDefinition.checkkUrl(route, "adminGalleriesEdit")) {
				_contentView = new AdminEditGalleryView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminUsersOverview")) {
				_contentView = new AdminUsersView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminUsersAdd")) {
				_contentView = new AdminAddUsersView();
				_mainView.appendContent(_contentView.get());
				return;
			}

			if(URLDefinition.checkkUrl(route, "adminUsersEdit")) {
				_contentView = new AdminEditUsersView();
				_mainView.appendContent(_loadingView);
				_loadingView.animate();
				_contentView.updateEntries(function(){
					_mainView.appendContent(_contentView.get());
					_loadingView.disable();
				});
				return;
			}
		}

		//public functions
		this.init = function (callback) {
			_mainView = new ModalView();
			_headerView = new AdminHeaderView();
			_mainView.appendHeader(null);
			_navigationView = new AdminNavigationView();
			_mainView.appendNavigation(_navigationView);
			_footerView =  new AdminFooterView();
			_mainView.appendFooter(null);
			_copyView =  new AdminCopyView();
			_mainView.appendCopy(_copyView);
			callback(_mainView);
		};
	};
});
