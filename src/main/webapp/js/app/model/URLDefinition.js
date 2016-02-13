define([
	'lib/jquery'

], function (
	jQuery
) {
	'use strict';
	var _URLMap = new Map();
	//visitor
	_URLMap.set('newsSingle', '^#news\/[0-9]{1,}$');
	_URLMap.set('newsOverview', '^#news$');
	_URLMap.set('aboutOverview', '^#about$');
	_URLMap.set('projectsOverview', '^#projects$');
	_URLMap.set('projectsSingle', '^#projects\/[0-9]{1,}$');
	_URLMap.set('projectsArticleSingle', '^#projects\/[0-9]{1,}\/articles\/[0-9]{1,}$');
	_URLMap.set('login', '^#login$');
	_URLMap.set('error', '^#error$');
	_URLMap.set('timeout', '^#timeout$');
	_URLMap.set('guestbookOverview', '^#guestbook$');
	//admin
	_URLMap.set('adminNewsOverview', '^#admin\/news$');
	_URLMap.set('adminNewsAdd', '^#admin\/news\/add$');
	_URLMap.set('adminNewsEdit', '^#admin\/news\/[0-9]{1,}$');
	_URLMap.set('adminTagsOverview', '^#admin\/tags$');
	_URLMap.set('adminGuestbookOverview', '^#admin\/guestbook$');
	_URLMap.set('adminGuestbookEdit', '^#admin\/guestbook\/[0-9]{1,}$');
	_URLMap.set('adminProjectsOverview', '^#admin\/projects$');
	_URLMap.set('adminProjectsAdd', '^#admin\/projects\/add$');
	_URLMap.set('adminProjectsEdit', '^#admin\/projects\/[0-9]{1,}$');
	_URLMap.set('adminArticlesAdd', '^#admin\/projects\/[0-9]{1,}\/articles\/add$');
	_URLMap.set('adminArticlesEdit', '^#admin\/projects\/[0-9]{1,}\/articles\/[0-9]{1,}$');
	_URLMap.set('adminImagesOverview', '^#admin\/images$');
	_URLMap.set('adminGalleriesOverview', '^#admin\/galleries$');
	_URLMap.set('adminGalleriesAdd', '^#admin\/galleries\/add$');
	_URLMap.set('adminGalleriesEdit', '^#admin\/galleries\/[0-9]{1,}$');
	_URLMap.set('adminUsersOverview', '^#admin\/users$');
	_URLMap.set('adminUsersAdd', '^#admin\/users\/add$');
	_URLMap.set('adminUsersEdit', '^#admin\/users\/.{1,}$');

	function checkkUrl (hash, key) {
		var pattern = _URLMap.get(key);

		if (hash.match(pattern)) {
			return true;
		}
		return false;
	}

	return {
		checkkUrl: checkkUrl
	};
});
