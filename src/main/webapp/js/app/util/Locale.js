define([

], function (

) {
	'use strict';

	function findLocale() {
		var language = navigator.userLanguage;

		if (typeof language === 'undefined') {
			language = navigator.systemLanguage;
		}

		if (typeof loc === 'undefined') {
			language = navigator.language;
		}
		return language;
	}

	function findShortenLocale () {
		var language = guessLocale();

		if (language.indexOf('-') !== -1) {
			language = language.substring(0, language.indexOf('-'));
		}

		return language;
	}

	return {
		findLocale: findLocale,
		findShortenLocale: findShortenLocale
	};
});