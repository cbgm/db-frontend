define([
 	'lib/jquery'
 
], function (
	jQuery
) {
	'use strict';

	jQuery.fn.mobileNavButton = function() {
		var temp = this;

		temp.bind( "click", function() {
			
			var nav = jQuery("#navigation-small .list");
			var vis = nav.is(":visible");
			nav.slideToggle("fast");
			var div = jQuery("#navigation-small-divider");

			if (vis) {
				div.css({"height": "0px"});
			} else {
				div.css({"height": "1px"});
			}
		});

		temp.bind( "mouseover", function() {
			var navbutton = jQuery(this).find("#navigation-small-button");
			var container = navbutton[0].children;
			var count = container[0].childElementCount;

			for (var i = 0; i < count ; i++) {
				var el = container[0].children[i];
				jQuery(el).css({"background-color": "gray"});
				var test;
			}
		});
		temp.bind( "mouseout", function() {
			var navbutton = jQuery(this).find("#navigation-small-button");
			var container = navbutton[0].children;
			var count = container[0].childElementCount;

			for (var i = 0; i < count ; i++) {
				var el = container[0].children[i];
				jQuery(el).css({"background-color": "#2D2D2D"});
				var test;
			}
		});
	}



	return this;
});