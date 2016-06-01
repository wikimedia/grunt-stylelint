/*!
 * Run CSS files through stylelint and complain
 */

require( 'color' );

/*jshint node:true */
module.exports = function ( grunt ) {

	grunt.registerMultiTask( 'stylelint', function () {
		var options = this.options(),
			done = this.async(),
			styleLint = require( 'stylelint' ),
			allWarnings = 0,
			allErrors = 0;

		options.files = this.filesSrc.filter( function ( file ) {
			return grunt.file.isFile( file );
		} );

		styleLint.lint( options ).then( function ( data ) {
			data.results.forEach( function ( result ) {
				var fileWarnings = 0,
					fileErrors = 0;

				if ( result.warnings.length === 0 ) {
					grunt.verbose.ok( 'File ' + result.source + ' passes' );
				} else {
					grunt.log.error( result.source + ' failed:' );
					result.warnings.forEach( function ( warning ) {
						if ( warning.severity === 'error' ) {
							allErrors++;
							fileErrors++;
							grunt.log.error( 'Line ' + warning.line + ', column ' + warning.column + ':\t' + warning.text + ( ' (' + warning.severity + ')' ).red );
						} else {
							allWarnings++;
							fileWarnings++;
							grunt.log.writeln( ( 'Line ' + warning.line + ', column ' + warning.column + ':\t' ).bold + warning.text + ( ' (' + warning.severity + ')' ).yellow );
						}
					} );
					grunt.log.writeln( ( fileErrors + fileWarnings ) + ' Problems (' + ( 'Errors: ' + fileErrors ).red + ' - ' + ( 'Warnings: ' + fileWarnings ).yellow + ')\n' );
				}
			} );

			grunt.log.writeln( ( 'Linted ' + options.files.length + ' files:' ).bold );
			grunt.log.writeln( ( allErrors + allWarnings ) + ' Problems (' + ( 'Errors: ' + allErrors ).red + ' - ' + ( 'Warnings: ' + allWarnings ).yellow + ')\n' );

			if ( !data.errored ) {
				done();
			} else {
				done( false );
			}
		}, function ( err ) {
			grunt.fail.warn( 'Running stylelint failed\n' + err.stack.toString() );

			done( false );
		} );
	} );

};
