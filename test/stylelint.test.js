var grunt = require( 'grunt' );

exports.stylelint = {
	outputFile: function ( test ) {
		var actual, expected;

		test.expect( 1 );

		actual = grunt.file.read( 'tmp/outputFile/report.txt' );
		expected = grunt.file.read( 'test/expected/outputFile/report.txt' );

		test.equal( actual, expected, 'Should report to file.' );
		test.done();
	}
};
