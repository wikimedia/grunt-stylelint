/*!
 * Grunt file
 */

/*jshint node:true */
module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-jscs' );
	grunt.loadTasks( './tasks/' );

	grunt.initConfig( {
		jshint: {
			options: {
				jshintrc: true
			},
			all: [ '*.js', '{tasks,test}/**/*.js' ]
		},
		jscs: {
			src: '<%= jshint.all %>'
		},
		stylelint: {
			simple: {
				options: {
					configFile: 'test/simple/.stylelintrc',
					format: 'less'
				},
				src: 'test/simple/**/*.{css,less}'
			}
		},
		watch: {
			files: [ '<%= jshint.all %>', '.{jshintrc,jshintignore}' ],
			tasks: [ 'test' ]
		}
	} );

	grunt.registerTask( 'lint', [ 'jshint', 'jscs' ] );
	grunt.registerTask( 'test', [ 'lint', 'stylelint' ] );
	grunt.registerTask( 'default', 'test' );
};
