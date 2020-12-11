'use strict';

var baseReporter = require('../../../lib/reporters/base');
module.exports = simplereporter;

function simplereporter(runner, options) {
  baseReporter.call(this, runner);

  var prefix = '';

  if (options && options.reporterOptions && options.reporterOptions.name) {
    prefix = options.reporterOptions.name + ': ';
  }

  runner.on('suite', function(suite) {
    console.log(prefix + "on('suite') called");
  });

  runner.on('suite end', function(suite) {
    console.log(prefix + "on('suite end') called");
  });

  runner.on('test', function(test, err) {
    console.log(prefix + "on('test') called");
  });

  runner.on('fail', function(test, err) {
    console.log(prefix + "on('fail') called");
  });

  runner.on('pass', function(test) {
    console.log(prefix + "on('pass') called");
  });

  runner.on('test end', function(test, err) {
    console.log(prefix + "on('test end') called");
  });

  runner.on('hook', function(hook, err) {
    console.log(prefix + "on('" + hook.title + "') called");
  });

  runner.on('hook end', function(hook, err) {
    console.log(prefix + "on('" + hook.title + " end') called");
  });

  runner.on('start', function() {
    console.log(prefix + "on('start') called");
  });

  runner.on('end', function() {
    console.log(prefix + "on('end') called");
  });
}
