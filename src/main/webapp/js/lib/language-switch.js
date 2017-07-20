define([
	'util/Locale',
 	'lib/jquery'
 
], function (
	Locale,
	jQuery
) {
	'use strict';

	jQuery.fn.languageSwitchButton = function() {
		var temp = this;
		var locales = Locale.getAvailableLocalizations();
		var tempLocales = new Array();
		var curLocale = Locale.getLocale();
		
		if (curLocale == locales[0]) {
			tempLocales[0] = locales[0];
			tempLocales[1] = locales[1];
		} else {
			tempLocales[0] = locales[1];
			tempLocales[1] = locales[0];
		}

		temp.append("<ul></ul>");

		appendLocale(tempLocales[0], false);
		appendLocale(tempLocales[1], true);
		
		temp.find('li').hover(function () {
			console.log("bla");
			jQuery(this).addClass('locales-hover');
		}, function () {
			jQuery(this).removeClass('locales-hover');
		});

		temp.bind( "mouseover", function() {
			var localebuttons = jQuery(this).find(".locale-button");

			for (var i = 0; i < localebuttons.length ; i++) {
				jQuery(localebuttons[i]).removeClass('locale-hidden');
			}
		});

		temp.bind( "mouseout", function() {
			var localebuttons = jQuery(this).find(".locale-button");
			var curLocale = Locale.getLocale();

			for (var i = 0; i < localebuttons.length ; i++) {

				if (curLocale.toUpperCase() !== localebuttons[i].innerText) {
					jQuery(localebuttons[i]).addClass('locale-hidden');
				}
			}
		});

		function appendLocale(localeToSet, isHidden) {
			var hide = (isHidden === true ? "locale-hidden" : "");
			var $localeButton = jQuery("<li class='locale-button " + hide + "'><span>" + localeToSet.toUpperCase() + "</span></li>")
			.on('click', (function (locale) {
				return function () {
					Locale.setLocale(locale);
				}
			})(localeToSet));

			temp.find('ul').append($localeButton);
		};
	}

	return this;
});