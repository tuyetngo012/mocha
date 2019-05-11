'use strict';

var assert = require('assert');
var helpers = require('./helpers');
var args = ['--reporter', 'dot'];
var bang = require('../../lib/reporters/base').symbols.bang;

describe('events', function() {
  it('are run in correct order', function(done) {
    helpers.runMocha('events/hooks.fixture.js', args, function(err, res) {
      var lines, expected;

      if (err) {
        done(err);
        return;
      }

      lines = res.output
        .split(helpers.splitRegExp)
        .map(function(line) {
          return line.trim();
        })
        .filter(function(line) {
          return line.length;
        })
        .slice(0, -1);

      expected = [
        'before',
        'before each',
        'TEST pass',
        'after each',
        'event pass',
        'before each',
        'TEST fail',
        bang + 'event fail',
        'after each',
        'after'
      ];

      expected.forEach(function(line, i) {
        assert.equal(lines[i], line);
      });

      assert.equal(res.code, 1);
      done();
    });
  });
});
