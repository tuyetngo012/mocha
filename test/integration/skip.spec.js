'use strict';

var run = require('./helpers').runMochaJSON;
var assert = require('assert');

describe('.skip()', function() {
  it('should not run tests that marked as `skip`', function(done) {
    run('skip.fixture.js', [], function(err, res) {
      if (err) {
        done(err);
        return;
      }
      assert.equal(res.stats.pending, 2);
      assert.equal(res.stats.passes, 1);
      assert.equal(res.stats.failures, 0);
      assert.equal(res.code, 0);
      done();
    });
  });

  it('should not run before hooks on tests that marked as `skip`', function(done) {
    run('skip.fixture.js', [], function(err, res) {
      if (err) {
        done(err);
        return;
      }
      assert.equal(res.stats.pending, 2);
      assert.equal(res.stats.passes, 1);
      assert.equal(res.stats.failures, 0);
      assert.equal(res.code, 0);
      done();
    });
  });
});
