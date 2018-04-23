/*!
 * Run CSS files through stylelint and complain
 */

'use strict';

const chalk = require('chalk');
const styleLint = require('stylelint');

module.exports = function (grunt) {

  function pluralize(word, count) {
    return count === 1 ? word : word + 's';
  }

  function output(outputFile, report, func) {
    if (outputFile) {
      grunt.file.write(outputFile, report);
      grunt.log.writeln('Report written to ' + outputFile);

    } else {
      func(report);
    }
  }

  grunt.registerMultiTask('stylelint', function () {
    let options = this.options();
    let done = this.async();
    let verbose = !!grunt.option('verbose');

    options.failOnError = options.failOnError ? options.failOnError : true;
    options.formatter = options.formatter || (verbose ? 'verbose' : 'string');
    options.files = this.filesSrc.filter(function (file) {
      return grunt.file.isFile(file);
    });

    styleLint
      .lint(options)
      .then(function (data) {
        if (data.output) {
          if (verbose || data.errored) {
            output(options.outputFile, data.output, grunt.log.write);

          } else {
            output(options.outputFile, data.output, grunt.log.ok);
          }
        }

        if (verbose) {
          grunt.log.writeln('Stylelint returned analysis');
          grunt.log.writeln(JSON.stringify(data.results, null, 3));
        }

        let warningsCount = data.results.reduce(function (count, item) {
          return count + item.warnings.length;
        }, 0);

        if (!data.errored) {
          grunt.log.ok('Linted ' + options.files.length + ' files without errors');
          done();

        } else {
          if (options.failOnError && warningsCount > 0) {
            grunt.log.writeln(chalk.red.bold([
              '\u2716 ', warningsCount, pluralize(' problem', warningsCount), '\n'
            ].join('')));
          }
          done(!options.failOnError);
        }
      })
      .catch(function (err) {
        grunt.fail.warn('Running stylelint failed\n' + err.stack.toString());
        done(false);
      });
  });
};
