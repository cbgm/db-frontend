define([

], function (

) {
	'use strict';
	var _availableLocalization = [ 'de', 'en'],
		_defaultLocale = 'en',
		_locale = null;

	function setLocale(locale) {

		if (locale !== _locale && _availableLocalization.indexOf(locale) !== -1 && locale !== getLocale()) {

			try {
				localStorage.setItem('creativespace_locale', locale);
				window.location.reload();
			} catch (exception) {

			}
		}
	}

	function getDefaultLocale() {
		return _defaultLocale;
	}

	function getAvailableLocalizations() {
		return _availableLocalization;
	}

	function getLocale() {

		if (_locale === null) {

			try {
				_locale = localStorage.getItem('creativespace_locale');

				if (_locale !== null && _availableLocalization.indexOf(_locale) === -1) {
					localStorage.removeItem('creativespace_locale');
					window.location.reload();
					return;
				}
			} catch (exception) {

			}

			if (_locale === null) {
				_locale = (navigator.languages && navigator.languages[0]) ||
								navigator.language || navigator.userLanguage;
			}
		}

		return _locale;
	}
	
	function setContentByLocale(entry, entryAlt) {
		return ((getLocale() === "de") ? entry :entryAlt)
	}

	function getShortLocale() {
		var locale = getLocale();

		if (locale.indexOf('-') !== -1) {
			locale = locale.substring(0, locale.indexOf('-'));
		}

		return locale.toLowerCase();
	}


	return {
		setLocale: setLocale,
		setContentByLocale: setContentByLocale,
		getLocale: getLocale,
		getShortLocale: getShortLocale,
		getDefaultLocale: getDefaultLocale,
		getAvailableLocalizations: getAvailableLocalizations
	};
});