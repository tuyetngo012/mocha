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

  runner.on('fail', function(test, err) {
    console.log(prefix + "on('fail') called");
  });

  runner.on('pass', function(test) {
    console.log(prefix + "on('pass') called");
  });

  runner.on('test end', function(test, err) {
    console.log(prefix + "on('test end') called");
  });

  runner.on('end', function() {
    console.log(prefix + "on('end') called");
  });
}
