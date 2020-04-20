'use strict';

exports = module.exports = StdioWrapper;

function StdioWrapper() {
  var stdout = [];
  var stderr = [];

  if (typeof process !== 'undefined') {
    if (process.stdout) {
      var originalStdoutWrite = process.stdout.write;

      process.stdout.write = function(data) {
        stdout.forEach(function(f) {
          f(data.toString().replace(/\n$/, ''));
        });
        return originalStdoutWrite.apply(this, arguments);
      };
    }

    if (process.stderr) {
      var originalStderrWrite = process.stderr.write;
      process.stderr.write = function(data) {
        stderr.forEach(function(f) {
          f(data.toString().replace(/\n$/, ''));
        });
        return originalStderrWrite.apply(this, arguments);
      };
    }
  }

  this.on = function(o, e) {
    stdout.push(o);
    stderr.push(e);
  };

  this.off = function(o, e) {
    var i = stdout.indexOf(o);
    stdout = stdout.splice(i, 1);
    var j = stderr.indexOf(e);
    stderr = stderr.splice(j, 1);
  };
}
