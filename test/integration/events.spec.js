'use strict';

var assert = require('assert');
var helpers = require('./helpers');
var args = ['--reporter', 'dot'];
var bang = require('../../lib/reporters/base').symbols.bang;

describe('events', function() {
  function run(fixture, done, fn) {
    helpers.runMocha(fixture, args, function(err, res) {
      if (err) {
        done(err);
        return;
      }

      var lines = res.output
        .split(helpers.splitRegExp)
        .map(function(line) {
          return line.trim();
        })
        .filter(function(line) {
          return line.length;
        })
        .slice(0, -1);

      fn(res.code, lines);
    });
  }

  it('are run in correct order', function(done) {
    run('events/hooks.fixture.js', done, function(code, lines) {
      var expected = [
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

      assert.equal(code, 1);
      done();
    });
  });

  it('next test is not started before async fail hook completes for failing test', function(done) {
    run('events/async-hooks-fail-test.fixture.js', done, function(code, lines) {
      var expected = [
        'before each',
        'TEST 1 fail',
        bang + 'event fail start',
        'event fail end',
        'after each',
        'before each',
        'TEST 2 pass',
        'after each'
      ];

      expected.forEach(function(line, i) {
        assert.equal(lines[i], line);
      });

      assert.equal(code, 1);
      done();
    });
  });

  it('next test is not started before async fail hook completes for failing after hook', function(done) {
    run('events/async-hooks-fail-after.fixture.js', done, function(
      code,
      lines
    ) {
      var expected = [
        'before each',
        'TEST 1 pass',
        'after each',
        bang + 'event fail start',
        'event fail end',
        'before each',
        'TEST 2 pass',
        'after each'
      ];

      expected.forEach(function(line, i) {
        assert.equal(lines[i], line);
      });

      assert.equal(code, 1);
      done();
    });
  });

  it('after hook is not started before async fail hook completes for failing before hook', function(done) {
    run('events/async-hooks-fail-before.fixture.js', done, function(
      code,
      lines
    ) {
      var expected = [
        'before each',
        bang + 'event fail start',
        'event fail end',
        'after each',
        'before each',
        'TEST 2 pass',
        'after each'
      ];

      expected.forEach(function(line, i) {
        assert.equal(lines[i], line);
      });

      assert.equal(code, 1);
      done();
    });
  });
});
