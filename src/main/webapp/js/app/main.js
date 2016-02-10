define([
	'controller/Core',
	'view/Ui',
	'lib/jquery',
	'lib/domReady!'
], function (
	Core,
	Ui,
	jQuery
) {
	'use strict';

	/**
	 * Main class
	 */
	var core = null,
		ui = null;

	jQuery(document).ready(function () {

		core = new Core();
		ui = new Ui(core);

		core.init(function (){
			ui.init(function (){
				core.start();
			});
		});
	});
});
