'use strict';

var path = require('path');
var helpers = require('./helpers');

function run(args, done) {
  return helpers.invokeMocha(
    ['--reporter', 'json', '-C'].concat(args),
    function(err, res) {
      if (err) {
        return done(err);
      }

      done(null, JSON.parse(res.output));
    }
  );
}

describe('include', function() {
  // --include **/*.spec.ts src/specfic.spec.ts -> run only specific
  // --include **/*.spec.ts -> run all
  it('should use include argument if no test files are given', function(done) {
    var args = [
      '--include',
      path.join(__dirname, 'fixtures/glob/**/*.spec.js')
    ];
    run(args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res.stats.failures, 'to be', 0);
      expect(res.stats.passes, 'to be', 2);
      done();
    });
  });

  it('should not use include argument if test files are given', function(done) {
    var args = [
      '--include',
      path.join(__dirname, 'fixtures/glob/**/*.spec.js'),
      path.join(__dirname, 'fixtures/glob/glob.spec.js')
    ];
    run(args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res.stats.failures, 'to be', 0);
      expect(res.stats.passes, 'to be', 1);
      done();
    });
  });
});
