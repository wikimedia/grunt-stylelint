/*!
 * Grunt file
 */

'use strict';

module.exports = function ( grunt ) {
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-nodeunit' );
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadTasks( './tasks/' );

	grunt.initConfig( {
		clean: {
			test: [ 'tmp' ]
		},
		eslint: {
			all: [ '*.js', '{tasks,test}/**/*.js' ]
		},
		nodeunit: {
			tests: [ 'test/*.test.js' ]
		},
		stylelint: {
			simple: {
				options: {
					configFile: 'test/simple/.stylelintrc'
				},
				src: 'test/simple/**/*.{css,less}'
			},
			empty: {
				options: {
					configFile: 'test/empty/.stylelintrc'
				},
				src: 'test/empty/**/*.{css,less}'
			},
			testOutputFile: {
				options: {
					outputFile: 'tmp/outputFile/report.txt',
					configFile: 'test/output/.stylelintrc',
					failOnError: false
				},
				src: 'test/output/**/*.{css,less}'
			}
		}
	} );

	grunt.registerTask( 'test', [ 'clean:test', 'eslint', 'stylelint', 'nodeunit' ] );
	grunt.registerTask( 'default', 'test' );
};
