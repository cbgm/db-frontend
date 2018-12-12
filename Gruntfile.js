module.exports = function(grunt) {

	/*
	 * ##################################################################################
	 * ##################### loading of grunt tasks #####################################
	 * ##################################################################################
	 */

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-rename-util');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-cache-bust');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	/*
	 * ##################################################################################
	 * ##################### grunt configuration ########################################
	 * ##################################################################################
	 */
	grunt.initConfig({

		/**
		 * This will load in our package.json file so we can have access
		 * to the project name and appVersion number.
		 */
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Constants for the Gruntfile so we can easily change the path for our environments.
		 */
		BASE_PATH: '',
//		DEVELOPMENT_PATH: 'target/grunt/',
		SOURCE_PATH: 'src/main/webapp/',
		PRODUCTION_PATH: 'target/grunt/',
		PRODUCTION_CSS: 'target/grunt/css/',
		PRODUCTION_JS: 'target/grunt/js/',
		
		/**
		 * Renames and copys libs.
		 */
		/*rename: {
			  main: {
			    files: [
			  		{src: ['<%= SOURCE_PATH %>js/lib/jquerytt.min.js'], dest: '<%= SOURCE_PATH %>js/lib/jquery.min.js'},
			  		{src: ['<%= BASE_PATH %>bower_components/jquery/dist/jquery.js'], dest: '<%= SOURCE_PATH %>js/lib/jquery.js'},
			  		{src: ['<%= BASE_PATH %>bower_components/requirejs-domready/domReady.js'], dest: '<%= SOURCE_PATH %>js/lib/domReady.js'},
			  		{src: ['<%= BASE_PATH %>bower_components/requirejs-i18n/i18n.js'], dest: '<%= SOURCE_PATH %>js/lib/i18n.js'},
			  		{src: ['<%= BASE_PATH %>bower_components/requirejs/require.js'], dest: '<%= SOURCE_PATH %>js/lib/require.js'}
			        ]
			  }
			},*/

		/**
		 * Cleans or deletes our production folder before we create a new production build.
		 */
		clean: {
			all: ['target'],
			js: ['<%= PRODUCTION_JS %>app', '<%= PRODUCTION_JS %>lib', '<%= PRODUCTION_JS %>app.js'],
			css: ['<%= PRODUCTION_CSS %>*.css', '!<%= PRODUCTION_CSS %>final-cb.min.css', '<%= PRODUCTION_CSS %>lib'],
			template: ['<%= PRODUCTION_PATH %>template'],
			psd: ['<%= PRODUCTION_PATH %>img/**/*.psd'],
		},
		
		env : {

			dev: {

				NODE_ENV : 'DEVELOPMENT'

			},

			prod : {

				NODE_ENV : 'PRODUCTION'

			}

		},
		
		preprocess : {

			all : {

				src : '<%= PRODUCTION_PATH %>index.html',
				dest : '<%= PRODUCTION_PATH %>index.html'

			},


		},

		/**
		 * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
		 */
		copy : {

			all : {
				expand : true,
				cwd : '<%= SOURCE_PATH %>',
				src : [ '**' ],
				dest : '<%= PRODUCTION_PATH %>'
			},
			
			libs : {
				files: [
					{src: '<%= BASE_PATH %>node_modules/@bower_components/jquery/dist/jquery.min.js', dest: '<%= SOURCE_PATH %>js/lib/jquery.min.js'},
					{src: '<%= BASE_PATH %>node_modules/@bower_components/jquery/dist/jquery.js', dest: '<%= SOURCE_PATH %>js/lib/jquery.js'},
			  		{src: '<%= BASE_PATH %>node_modules/@bower_components/requirejs-domready/domReady.js', dest: '<%= SOURCE_PATH %>js/lib/domReady.js'},
			  		{src: '<%= BASE_PATH %>node_modules/@bower_components/requirejs-i18n/i18n.js', dest: '<%= SOURCE_PATH %>js/lib/i18n.js'},
			  		{src: '<%= BASE_PATH %>bower_components/@bower_components/requirejs/require.js', dest: '<%= SOURCE_PATH %>js/lib/require.js'}
					]
			}

//			csslib : {
//				expand : true,
//				cwd : '<%= PRODUCTION_CSS %>/lib',
//				src : [ '**' ],
//				dest : '<%= PRODUCTION_CSS %>'
//			}
		},
		
		cacheBust : {

			js : {
				options : {
					baseDir : '<%= PRODUCTION_PATH %>',
					enableUrlFragmentHint : true,
					removeUrlFragmentHint : true,
					algorithm : 'md5',
					encoding : 'utf8',
					length : 16,
					rename : true,
					deleteOriginals: true
				},
				files : [{
					src : [
						'<%= PRODUCTION_PATH %>index.html'
					]
				}]
			},
		},

		concat: {

			css: {
				src: [
				      '<%= PRODUCTION_CSS %>*',
				      ],
				      dest: '<%= PRODUCTION_CSS %>final-cb.min.css'
			}
		},


		/**
		 * The RequireJS plugin that will use uglify2 to build and minify our JavaScript,
		 * templates and any other data we include in the require files.
		 */

		requirejs: {
			debug : {
				options : {
					baseUrl: '<%= PRODUCTION_PATH %>',                         // Path of source scripts, relative to this build file
					mainConfigFile: '<%= PRODUCTION_JS %>app.js',         // Path of shared configuration file, relative to this build file
					name: 'js/app/main',                                                           // Name of input script (.js extension inferred)
					out: '<%= PRODUCTION_JS %>final-cb.min.js',   
					optimize : 'uglify2',
					preserveLicenseComments : false, // will be done automatically with the @license comment
//					generateSourceMaps : true,
					locale : 'de',
					optimizeCss : 'none',
					uglify2 : {
						output : {
							beautify : false
						},
						compress : {
							sequences : false,
							global_defs : {
								DEBUG : true
							}
						},
						warnings : true,
						mangle : false
					},
					name : 'final',
					namespace : 'final',
					include : [ 'js/lib/require', 'js/app', 'js/app/main' ],
					insertRequire : [ 'js/app' ],
					create : true,
					keepBuildDir : false,
					removeCombined : true
				}
			}
		},
		cssmin: {
			target: {
				options: {
					keepSpecialComments: 0,
					target: 'commonDir',
					noAdvanced: true
				},
				files: [{
					expand: true,
					cwd: '<%= PRODUCTION_CSS %>',
					src: ['*.css', '!*.min.css'],
					dest: '<%= PRODUCTION_CSS %>',
					ext: '.min.css'
				}]
			}
		},

		/**
		 * Removes all comments from the production index.html file. I can also remove all whitespace if desired.
		 */
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: false
				},
				files: {
					'<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>' + 'index.html'
				}
			}
		},

		imagemin: {                          // Task
			dynamic: {                         // Another target
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: '<%= PRODUCTION_PATH %>img/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: '<%= PRODUCTION_PATH %>img/'                  // Destination path prefix
				}]
			}
		}
	});

//	grunt.registerTask('production', []);
	grunt.registerTask('production', ['clean:all', 'copy:libs', 'copy:all', 'env:prod', 'preprocess', 'concat', 'clean:css', 'requirejs','clean:js', 'clean:template', 'cacheBust', /*'imagemin', 'clean:psd'*/]);
//	grunt.registerTask('production', ['clean:all', 'bowercopy', 'copy', 'env:dev', 'preprocess']);


};