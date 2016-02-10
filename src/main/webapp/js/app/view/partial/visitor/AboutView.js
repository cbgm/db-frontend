define([
	'lib/i18n!partialview/nls/AboutView_strings',
	'lib/gallery-cb',
	'lib/jquery'
], function (
	Strings,
	gallery,
	jQuery
) {
	'use strict';

	/**
	 * Require with AMD class template
	 */
	return function () {
		//some vars
		var _view;

		_view = (function () {
			var $view = jQuery(
					"<div id='content' class='visitor'>" +
						"<div id='content-spacer' class='about'>" +
							"<div id='intro' class='begin-section'>" +
								"<h1>" +
									"So you're wondering &quotWho is this guy behind the website?&quot" +
								"</h1>" +
								"<div class='inner-container'>" +
									"Glad you aked! I'm the kind of person who had to fight for dreams. I'm a complex human being that needs the challenge in life. This also reflects in the variety of things I'm interested in, such as:" +
									"<ul class='taglist'>" +
										"<li><a href='#extreme_sports'>#Extreme sports</a></li>" +
										"<li><a href='#skateboarding'>#Skateboarding</a></li>" +
										"<li><a href='#snowboarding'>#Snowboarding</a></li>" +
										"<li><a href='#music'>#Music</a></li>" +
										"<li><a href='#keyboard'>#Keyboard</a></li>" +
										"<li><a href='#drums'>#Drums</a></li>" +
										"<li><a href='#technology'>#Technology</a></li>" +
										"<li><a href='#programming'>#Programming</a></li>" +
										"<li><a href='#design'>#Design</a></li>" +
										"<li><a href='#filming'>#Filming</a></li>" +
										"<li><a href='#editing'>#Editing</a></li>" +
//										"<li><a href='#remote_controled_vehicles'>#Remote controled vehicles</a></li>" +
									"</ul>" +
									"Not that I'm only interested in various things, although I have an <a href='#academic_career'><i>academic career</i></a> behind me." +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='extreme_sports'/>" +
							"<div id='extreme' class='descriptive-section'>" +
								"<h2>" +
									"#Extreme sports" +
								"</h2>" +
								"<div class='inner-container'>" +
									"First of all extreme sports. It's facinating what is possible with your body, " +
									"when you push yourself to the limit. You can't reach anything in these sports if you don't " +
									"put all of your energy and heart in. " +
								"</div>" +
								
							"</div>" +
							"<a class='anchor' id='skateboarding'/>" +
							"<div id='skateboard' class='section'>" +
								"<h3>" +
									"#Skateboarding" +
								"</h3>" +
								"<div class='inner-container'>" +
									"Especially skateboarding is my favorite one. Started fairly late in the age of 15, " +
									"it's still (dominating) my life, my energy saver and haven of peace. The originally trigger was " +
									"a video game that lead me into it. &quotWhat a video game? How can that be?&quot Even a video game can " +
									"show the energy flow, the attitude and community of a sport. Since I met skateboarding it helped me " +
									"through some rough times and made me find some of my best friends. Also the feeling of being free in what " +
									"you do is unbelievable and you never learn out. " +
									"<img id='sk8-img' src='img/skateboard_me.png' alt=''/>" +
									"</br></br>There are few documentations which may reflect the feeling on the four " +
									"rolls I can recommend, ...if you are interested. One of them is <i>'<a href='https://vimeo.com/1353988' target='_blank'>Born to skate</a>'</i>, documenting a road trip of two " +
									"german friends. This movie was also their Master-Thesis for Media School. Of course you can't expect anything back from " +
									"this sport if you don't do it with your heart, and yep ...there are times in real pain. But as it " +
									"is in life, with hard work it pays out. " +
									
									"</br></br>Talking about the community, there is no hate as " +
									"in other 'team sports'. You support and party with your friends when they land/master a hard " +
									"trick. There is no hard competition, even on professional nivau. It's all about having a good time with " +
									"people and friends who love what they do. " +
									"</br>Maybe now you can imagine why I'm addicted to it?. Thanks to my supporters! (<a href='http://www.darkstarskate.com/' target='_blank'>Darkstar</a>, <a href='http://www.sampleskate.com/' target='_blank'>Sample</a>)" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='snowboarding'/>" +
							"<div id='snowboard' class='section'>" +
								"<h3>" +
									"#Snowboarding" +
								"</h3>" +
								"<div class='inner-container'>" +
									"I would not go as far as to say, that snowboarding has the same importance as skateboarding. But " +
									"well, of course it is fun and the best alternative to me if there is no place to skate on some days in winter. " +
									"Especially if you live in a small town like me, with less indoor parks." +									
								"</div>" +
							"</div>" +
							"<a class='anchor' id='music'/>" +
							"<div id='Music' class='descriptive-section'>" +
							"<h2>" +
								"#Music" +
							"</h2>" +
								"<div class='inner-container'>" +
									"Of course everyone loves music but it's not only that I listen to it. First of all I don't like songs which don't make" +
									" sense and there are quiet alot of them. Furthermore I try to be creativ within my possibilities. And so today I play multiple instruments." +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='keyboard'/>" +
							"<div id='Keyboard' class='section'>" +
								"<h3>" +
									"#Keyboard" +
								"</h3>" +
								"<div class='inner-container'>" +
									"In the age of 7 I started playing keyboard with a bit influence of my grandpa ;), but I've never regretted that. " +
									"Since then I have fun with it but my play also changed into piano style. " +
									"Today I love to play pieces of Evanescence or Whitin Temptation but especially ballads. " +
									"They are in my opinion kind of it's own." +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='drums'/>" +
							"<div id='Drums' class='section'>" +
								"<h3>" +
									"#Drums" +
								"</h3>" +
								"<div class='inner-container'>" +
									"Since I was kid I always had a special bind to drums. If I'm honest I don't know exactly the reason. " +
									"But I couldn't forget this strong instrument until 2011. From this point I bought my first e-drum " +
									"and because I was a poor student there was no other solution than learning by doing. Luckily I found " +
									"a good webiste which helped me alot (<a href='http://www.freedrumlessons.com/' target='_blank'>freedrumlessons.com</a>). " +
									"With endurance and a lot of sweat I'm now able to play along songs of my favorite band (<a href='http://www.avengedsevenfold.com' target='_blank'>Avenged Sevenfold</a>), so it really paid out. " +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='technology'/>" +
							"<div id='Technology' class='descriptive-section'>" +
							"<h2>" +
								"#Technology" +
							"</h2>" +
								"<div class='inner-container'>" +
									"So now we're getting pretty close at the time in which the choice of study my direction was quit " +
									"clear, right? Maybe..., Gladly my parents were not afraid of technology. " +
									"So the first foreign-contact began with the gift of an electronic microcontroller, Cosmos Kit. " +
									"I had now the chance to built an alarm system, yay, that was fun. " +
									"</br>The next new experience I had was when my friends " +
									"and I tried to put our photos online that we shot at skating. At first with the help of Frontpage, which is pretty " +
									"crappy these days. But after some time I tried my best with HTML and Macromedia Flash (Actionscript), still love Flash though. " +
									"</br></br>After the years i came in contact with all kinds of technology, whether programming and it's " +
									"different languages, or hardware(-desgin). But actually programming and design, or distributed systems " +
									"are really interesting to me. I need to have diversity..." +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='programming'/>" +
							"<div id='Programming' class='section'>" +
							"<h3>" +
								"#Programming" +
							"</h3>" +
								"<div class='inner-container'>" +
									"So what kind of stuff did I do with my programming knowledge since day one? It all started with the first steps in web development, simple static html pages." +
									" After these steps I discovered Adobe Flash for me and tried my best to define my first dynamic single page with some animations. Then years after my apprenticeship " +
									"began and I dived into the C-Wolrd, databases and so on. Little programs like a file-manager or an automatic data update tool, held me up. Now I'm pretty much able" +
									" to write down everything I want - from complexe websites to mocap applications, thanks to my university study." +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='design'/>" +
							"<div id='Design' class='descriptive-section'>" +
							"<h2>" +
								"#Design" +
							"</h2>" +
								"<div class='inner-container'>" +
									"<p>I dont' want to say much at this point. Just watch the following gallery to see my process. I just have to say, I'm <u>not</u> a designer but I do my best.</p>" +
									"<div style='margin-top: 10px; text-align: center;'>" +
										"<img src='img/designs/banner-salzbad.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/c-enter.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/cad.jpg' rel='designs' alt=''/>" +
										"<img src='img/designs/construct-omg.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/holger-portfolio.jpg' rel='designs' alt=''/>" +
										"<img src='img/designs/logo-my-web.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/mystic-clan.jpg' style='display: none;' rel='designs' alt=''/>" +
										"<img src='img/designs/skate.jpg' rel='designs' alt=''/>" +
										"<img src='img/designs/high.jpg' style='display: none;' rel='designs' alt=''/>" +
									"</div>" +
									"<div style='clear: both;'></div>" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='filming'/>" +
							"<div id='Filming' class='descriptive-section'>" +
							"<h2>" +
								"#Filming" +
							"</h2>" +
								"<div class='inner-container'>" +
									"I got into filming through my pasion skateboarding. Of course when you achieve an new trick you want to bann it forever on tape." +
									" My current camcorder is a Canon Legria HF 200. You see it's not profesional equipment but it fits my needs. Examples will follow!" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='editing'/>" +
							"<div id='Editing' class='descriptive-section'>" +
							"<h2>" +
								"#Editing" +
							"</h2>" +
								"<div class='inner-container'>" +
									"Filming is not all. It's from time to time enjoyable to watch old tricks, but it gets more exiting if they are set into the correct light. " +
									"I just say baysteps with Winwos Movie Maker and for a few years now getting semi professional with Sony Vegas. Examples will follow!" +
								"</div>" +
							"</div>" +
							"<a class='anchor' id='academic_career'/>" +
							"<div id='work' class='begin-section'>" +
								"<div id='timeline' >" +
									"<h1>" +
										"So now that you now what drives me, something more about my academic career" +
									"</h1>" +
									"<div class='inner-container'>" +
										"<div class='timeline-container'>" +
										"<ul class='timeline'>" +
											"<li class='other'>" +
											"</li>" +
											"<li class='graduate'>" +
												"<p>" +
													"Training college, Lichtenfels</br> <i>Training for state-union tested " +
													"technical assistant for computer science</i>" +
												"</p>" +
												"<span>September 2005 - Juli 2007</span>" +
											"</li>" +
											"<li class='graduate'>" +
												"<p>" +
													"Vocational High School, Coburg</br> <i>Subject-specific university entrance</i>" +
												"</p>" +
												"<span>September 2007 - Juni 2008</span>" +
											"</li>" +
											"<li class='event'>" +
												"<p>" +
													"Started Bachelor Degree <i>computer science</i> at the University of Applied Sciences, " +
													"Coburg" +
												"</p>" +
												"<span>October 2008</span>" +
											"</li>" +
											"<li class='other'>" +
												"<p>" +
													"Fraunhofer IIS, Nuremberg</br> <i>Research Assistant / Intern</i>" +
												"</p>" +
												"<span>September 2010 - February 2011</span>" +
											"</li>" +
											"<li class='graduate'>" +
												"<p>" +
													"Finished Bachelor Degree <i>computer science</i> at the University of Applied " +
													"Sciences, Coburg</br><i>Bachelor of Science</i>" +
													"</br></br>Topic of final thesis: <i>Specification and implementation of an agent " +
													"monitoring system for the analysis and manipulation " +
													"of data for the mobile awiloc® technology</i>" +
												"</p>" +
												"<span>February 2012</span>" +
											"</li>" +
											"<li class='event'>" +
												"<p>" +
													"Started Master Degree <i>computer science</i> at the University of Applied Sciences, Coburg" +
												"</p>" +
												"<span>March 2012</span>" +
											"</li>" +
											"<li class='other'>" +
												"<p>" +
													"University of Applied Sciences Coburg and HUK Coburg, Coburg</br><i>Student Assistant " +
													"(Research project SecMine)</i>" +
												"</p>" +
												"<span>September 2010 - February 2011</span>" +
											"</li>" +
											"<li class='graduate'>" +
												"<p>" +
													"Finished Master Degree <i>computer science</i> at the University of Applied Sciences, " +
													"Coburg</br><i>Master of Science</i>" +
													"</br></br>Topic of final thesis: <i>Investigation of technical possibilities for " +
													"wireless detecting of movements on the body</i>" +
												"</p>" +
												"<span>October 2013</span>" +
											"</li>" +
											"<li class='event'>" +
												"<p>Fraunhofer IIS (Application Center Coburg), Coburg</br><i>Researcher</i></p>" +
												"<span>December 2013 - Mai 2014</span>" +
											"</li>" +
											"<li class='event'>" +
												"<p>ecsec GmbH, Michelau</br><i>Computer scientist</i></p>" +
												"<span>Juli 2014</span>" +
											"</li>" +
											"<li class='event'>" +
											"<p>DELL Software GmbH</br><i>Software Solutions Consultant</i></p>" +
											"<span>October 2015</span>" +
											"</li>" +
											"<li class='end'>" +
											"</li>" +
										"</ul>" +
										"</div>" +
									"</div>" +
								"</div>" +
							"</div>" +
							"<div id='Documents' class='descriptive-section'>" +
							"<h2>" +
								"#Documents" +
							"</h2>" +
								"<div class='inner-container'>" +
									"Last but no least some documents for you to download if you are interested in me. Thank you for visiting my website!</br>" +
									"<ul class='download'>" +
										"<li>" +
											"<a class='download-link' href=''>" +
												"&#9654; Bachelor certificate" +
											"</a>" +
										"</li>" +
										"<li>" +
											"<a class='download-link' href=''>" +
												"&#9654; Master certificate" +
											"</a>" +
										"</li>" +
										"<li>" +
											"<a class='download-link' href=''>" +
												"&#9654; Curriculum vitae" +
											"</a>" +
										"</li>" +
									"</ul>" +
								"</div>" +
							"</div>" +
						"</div>" +
					"</div>");

			return $view;
		})();

		this.get = function () {
			_view.galleryInit();
			return _view;
		};

		this.hide = function () {
			_view.hide();
		};

		this.show = function () {
			_view.show();
		};
	};
});
