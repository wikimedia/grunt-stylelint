/*!
 * Grunt file
 */

module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadTasks( './tasks/' );

	grunt.initConfig( {
		eslint: {
			all: [ '*.js', '{tasks,test}/**/*.js' ]
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
			files: [ '<%= eslint.all %>', '.{eslintrc.json}' ],
			tasks: [ 'test' ]
		}
	} );

	grunt.registerTask( 'test', [ 'eslint', 'stylelint' ] );
	grunt.registerTask( 'default', 'test' );
};
