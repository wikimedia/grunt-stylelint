'use strict';

const grunt = require('grunt');
const path = require('path');

module.exports.stylelint = {
  outputFile: function (test) {
    let actual;
    let expected;

    test.expect(1);

    actual = grunt.file.read(path.resolve(path.join(__dirname, '../tmp/outputFile/report.txt')));
    expected = grunt.file.read(path.resolve(path.join(__dirname, './expected/outputFile/report.txt')));

    test.equal(actual, expected, 'Should report to file.');
    test.done();
  }
};
