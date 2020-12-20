'use strict';

var helpers = require('./helpers');

var args = ['--reporter=test/integration/fixtures/simple-reporter.js'];

function run(where, done, fn) {
  helpers.runMocha(
    'failing-with-log.fixture.js',
    args.concat(['--where', where]),
    function(err, res) {
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
          return line.indexOf('#') < 0;
        })
        .filter(function(line) {
          return line.length;
        })
        .slice(0, -1);

      fn(res.code, lines);
    }
  );
}

describe('reporter-events', function() {
  it('reports events in correct order when test is passing', function(done) {
    run('pass', done, function(code, lines) {
      expect(code, 'to equal', 0);
      expect(lines, 'to equal', [
        "on('start') called",
        "on('suite') called",
        "on('suite') called",
        'on(\'"before all" hook\') called',
        'on(\'"before all" hook end\') called',
        "on('test') called",
        'on(\'"before each" hook\') called',
        'on(\'"before each" hook end\') called',
        'on(\'"after each" hook\') called',
        'on(\'"after each" hook end\') called',
        "on('pass') called",
        "on('test end') called",
        'on(\'"after all" hook\') called',
        'on(\'"after all" hook end\') called',
        "on('suite end') called",
        "on('suite end') called"
      ]);
      done();
    });
  });

  it('reports events in correct order when test is failing', function(done) {
    run('test', done, function(code, lines) {
      expect(code, 'to equal', 1);
      expect(lines, 'to equal', [
        "on('start') called",
        "on('suite') called",
        "on('suite') called",
        'on(\'"before all" hook\') called',
        'on(\'"before all" hook end\') called',
        "on('test') called",
        'on(\'"before each" hook\') called',
        'on(\'"before each" hook end\') called',
        "on('fail') called",
        'on(\'"after each" hook\') called',
        'on(\'"after each" hook end\') called',
        "on('test end') called",
        'on(\'"after all" hook\') called',
        'on(\'"after all" hook end\') called',
        "on('suite end') called",
        "on('suite end') called"
      ]);
      done();
    });
  });

  it('reports events in correct order when before each hook is failing', function(done) {
    run('beforeEach', done, function(code, lines) {
      expect(code, 'to equal', 1);
      expect(lines, 'to equal', [
        "on('start') called",
        "on('suite') called",
        "on('suite') called",
        'on(\'"before all" hook\') called',
        'on(\'"before all" hook end\') called',
        "on('test') called",
        'on(\'"before each" hook\') called',
        "on('fail') called",
        'on(\'"before each" hook for "test1" end\') called',
        'on(\'"after each" hook\') called',
        'on(\'"after each" hook end\') called',
        "on('test end') called",
        'on(\'"after all" hook\') called',
        'on(\'"after all" hook end\') called',
        "on('suite end') called",
        "on('suite end') called"
      ]);
      done();
    });
  });

  it('reports events in correct order when after each hook is failing', function(done) {
    run('afterEach', done, function(code, lines) {
      expect(code, 'to equal', 1);
      expect(lines, 'to equal', [
        "on('start') called",
        "on('suite') called",
        "on('suite') called",
        'on(\'"before all" hook\') called',
        'on(\'"before all" hook end\') called',
        "on('test') called",
        'on(\'"before each" hook\') called',
        'on(\'"before each" hook end\') called',
        'on(\'"after each" hook\') called',
        "on('fail') called",
        'on(\'"after each" hook for "test1" end\') called',
        "on('pass') called",
        "on('test end') called",
        'on(\'"after all" hook\') called',
        'on(\'"after all" hook end\') called',
        "on('suite end') called",
        "on('suite end') called"
      ]);
      done();
    });
  });
});
