/*!
 * Run CSS files through stylelint and complain
 */
var chalk = require( 'chalk' );

module.exports = function ( grunt ) {

	function pluralize( word, count ) {
		return ( count === 1 ? word : word + 's' );
	}

	function output( outputFile, report, func ) {
		if ( outputFile ) {
			grunt.file.write( outputFile, report );
			grunt.log.writeln( 'Report written to ' + outputFile );
		} else {
			func( report );
		}
	}

	grunt.registerMultiTask( 'stylelint', function () {
		var options = this.options(),
			done = this.async(),
			styleLint = require( 'stylelint' ),
			verbose = !!grunt.option( 'verbose' );

		options.failOnError = ( typeof options.failOnError !== 'undefined' ) ? options.failOnError : true;

		options.files = this.filesSrc.filter( function ( file ) {
			return grunt.file.isFile( file );
		} );
		options.formatter = options.formatter || ( verbose ? 'verbose' : 'string' );

		// Explicitly allow no files, as otherwise stylelint itself throws an error.
		options.allowEmptyInput = true;

		styleLint.lint( options ).then( function ( data ) {
			var warningsCount = 0;

			if ( data.output ) {
				if ( verbose ) {
					output( options.outputFile, data.output, grunt.log.write );
				} else if ( data.errored ) {
					output( options.outputFile, data.output, grunt.log.write );
				} else {
					output( options.outputFile, data.output, grunt.log.ok );
				}
			}

			warningsCount = data.results.reduce( function ( count, item ) {
				return ( count + item.warnings.length );
			}, 0 );

			if ( !data.errored ) {
				grunt.log.ok( 'Linted ' + options.files.length + ' files without errors' );
				done();
			} else {
				if ( options.failOnError && warningsCount > 0 ) {
					grunt.log.writeln( chalk.red.bold( [
						'\u2716 ', warningsCount, pluralize( ' problem', warningsCount ), '\n'
					].join( '' ) ) );
				}
				done( !options.failOnError );
			}
		}, function ( err ) {
			grunt.fail.warn( 'Running stylelint failed\n' + err.stack.toString() );

			done( false );
		} );
	} );

};
