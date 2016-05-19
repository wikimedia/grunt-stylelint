/*!
 * Run CSS files through stylelint and complain
 */

/*jshint node:true */
module.exports = function ( grunt ) {

	grunt.registerMultiTask( 'stylelint', function () {
		var options = this.options(),
			done = this.async(),
			styleLint = require( 'stylelint' );

		options.files = this.filesSrc.filter( function ( file ) {
			return grunt.file.isFile( file );
		} );
		options.formatter = 'string';

		styleLint.lint( options ).then( function ( data ) {
			data.results.forEach( function ( result ) {
				if ( !result.errored ) {
					grunt.verbose.ok( 'File ' + result.source + ' passes' );
				}
			} );

			if ( data.output ) {
				if ( data.errored ) {
					grunt.log.warn( data.output );
				} else {
					grunt.log.ok( data.output );
				}
			}

			if ( !data.errored ) {
				grunt.log.ok( 'Linted ' + options.files.length + ' files without errors' );
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
