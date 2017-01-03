[![NPM version](https://badge.fury.io/js/grunt-stylelint.svg)](http://badge.fury.io/js/grunt-stylelint)
[![Build Status](https://travis-ci.org/wikimedia/grunt-stylelint.svg?branch=master)](https://travis-ci.org/wikimedia/grunt-stylelint)
[![dependencies Status](https://david-dm.org/wikimedia/grunt-stylelint/status.svg)](https://david-dm.org/wikimedia/grunt-stylelint)
[![devDependencies Status](https://david-dm.org/wikimedia/grunt-stylelint/dev-status.svg)](https://david-dm.org/wikimedia/grunt-stylelint?type=dev)
[![NPM Downloads](https://img.shields.io/npm/dm/grunt-stylelint.svg)](https://www.npmjs.org/package/grunt-stylelint) 

# grunt-stylelint
> Grunt plugin for running Stylelint

## Getting started

If this is the first time you're using [Grunt](http://gruntjs.com/), the [getting started guide](http://gruntjs.com/getting-started) will show you how to get up and running.

Once you have that installed, with a [Gruntfile](http://gruntjs.com/sample-gruntfile) set for your code, you can install the plugin with:

<pre lang=shell>
npm install grunt-stylelint --save-dev
</pre>

In your Gruntfile, add the line:

<pre lang=js>
grunt.loadNpmTasks( 'grunt-stylelint' );
</pre>

## Stylelint task

_Run this task with the `grunt stylelint` command._

You can specify the targets and options for the task using the normal Grunt configuration – see Grunt's [guide on how to configure tasks](http://gruntjs.com/configuring-tasks) in general.

For more explanations of the lint errors Stylelint will throw at you please visit http://stylelint.io/.

### Usage examples

In this example, running `grunt stylelint:all` (or `grunt stylelint` because `stylelint` is a [multi task](http://gruntjs.com/configuring-tasks#task-configuration-and-targets)) will lint the project's CSS and SASS files in the `css` and `sass` directories and their subdirectories, using the default stylelint options or the options specified in the `.stylelintrc` in the root of the project. For an example config see http://stylelint.io/user-guide/example-config/.

```js
// Project configuration.
grunt.initConfig({
  stylelint: {
    all: ['css/**/*.css', 'sass/**/*.scss']
  }
});
```