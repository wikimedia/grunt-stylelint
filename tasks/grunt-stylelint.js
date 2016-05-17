/*!
 * Run CSS files through stylelint and complain
 */

/*jshint node:true */
module.exports = function ( grunt ) {

	grunt.registerMultiTask( 'stylelint', function () {
		var options = this.options(),
			done = this.async(),
			styleLint = require( 'stylelint' );

		options.files = this.filesSrc;

		styleLint.lint( options ).then( function ( data ) {
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
				grunt.log.ok( 'Linted ' + options.files.length + ' files without errors' );
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
