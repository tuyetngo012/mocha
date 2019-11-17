'use strict';

var path = require('path');
var helpers = require('./helpers');
var run = helpers.runMochaJSON;

describe('exclude-from', function() {
  it('should match json reporter format', function(done) {
    var args = [];
    run('exclude-from/before.fixture.js', args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res, 'to have passed')
        .and('to have passed test count', 3)
        .and(
          'to have passed test order',
          'first test',
          'second test',
          'third test'
        );

      // Make sure the json output matches what is expected in the next test
      expect(res.tests[0].title, 'to equal', 'first test');
      expect(
        res.tests[0].fullTitle,
        'to equal',
        'Suite 1 inner suite first test'
      );
      expect(res.tests[1].title, 'to equal', 'second test');
      expect(
        res.tests[1].fullTitle,
        'to equal',
        'Suite 1 inner suite second test'
      );
      expect(res.tests[2].title, 'to equal', 'third test');
      expect(res.tests[2].fullTitle, 'to equal', 'Suite 2 third test');

      done();
    });
  });

  it('should exclude tests from file', function(done) {
    var args = [
      '--exclude-from',
      path.join(__dirname, 'fixtures/exclude-from/before-results.json')
    ];
    run('exclude-from/after.fixture.js', args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res, 'to have passed')
        .and('to have passed test count', 2)
        .and('to have passed test order', 'fourth test', 'fifth test');
      done();
    });
  });
  it('should exclude tests from file', function(done) {
    var args = [
      '--exclude-from',
      path.join(__dirname, 'fixtures/exclude-from/before-results-skip.json')
    ];
    run('exclude-from/after.fixture.js', args, function(err, res) {
      if (err) {
        done(err);
        return;
      }
      expect(res, 'to have passed')
        .and('to have passed test count', 2)
        .and('to have passed test order', 'fourth test', 'fifth test');
      done();
    });
  });
});
