/*!
 * Run CSS files through stylelint and complain
 */

/*jshint node:true */
module.exports = function ( grunt ) {

	grunt.registerMultiTask( 'stylelint', function () {
		var options = this.options( {
				stylelintrc: '.stylelintrc'
			} ),
			done = this.async(),
			files = this.filesSrc,
			styleLint = require( 'stylelint' );

		styleLint.lint( {
			configFile: options.stylelintrc,
			files: files
		} ).then( function ( data ) {
			data.results.forEach( function ( result ) {
				if ( !result.errored ) {
					grunt.verbose.ok( 'File ' + result.source + ' passes' );
				} else {
					grunt.log.error( result.source + ' failed:' );
					result.warnings.forEach( function ( warning ) {
						grunt.log.error(
							'Line ' + warning.line + ', column ' + warning.column + ': ' +
							warning.text + ' (' + warning.severity + ')'
						);
					} );
					grunt.log.writeln();
				}
			} );

			if ( !data.errored ) {
				grunt.log.ok( 'Linted ' + files.length + ' files without errors' );
				done();
			} else {
				done( false );
			}
		}, function ( promiseFailure ) {
			grunt.fail.warn( 'Running stylelint failed: ', promiseFailure );

			done( false );
		} );
	} );

};
