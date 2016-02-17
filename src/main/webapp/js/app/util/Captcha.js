define([
	'lib/i18n!util/nls/Captcha_strings',
	'lib/jquery'
 
], function (
	Strings,
	jQuery
) {
	'use strict';	
	jQuery.fn.captcha = function(options){

		var element = this; 
		var submit = jQuery(this).find('input[type=submit]');
		jQuery('<label id="captchatext"></label>').insertBefore(submit);
		jQuery('<input type="text" class="textbox" id="captchainput"/><br/><br/>').insertBefore(submit);
		var input = this.find('#captchainput'); 
		var label = this.find('#captchatext'); 

		jQuery(element).find('input[type=submit]').attr('disabled','disabled'); 

		var randomNr1 = 0; 
		var randomNr2 = 0;
		var totalNr = 0;


		randomNr1 = Math.floor(Math.random()*10);
		randomNr2 = Math.floor(Math.random()*10);
		totalNr = randomNr1 + randomNr2;
		var texti = Strings.whatis_text + randomNr1+" + "+randomNr2;
		jQuery(label).text(texti);
	
		jQuery(input).keyup(function(){
			var nr = jQuery(this).val();

			if(nr==totalNr) {
				jQuery(element).find('input[type=submit]').removeAttr('disabled');				
			} else {
				jQuery(element).find('input[type=submit]').attr('disabled','disabled');
			}
		});

		jQuery(document).keypress(function(e) {

			if(e.which==13) {

				if((element).find('input[type=submit]').is(':disabled')==true) {
					e.preventDefault();
					return false;
				}
			}
		});
	}
	return this;
});