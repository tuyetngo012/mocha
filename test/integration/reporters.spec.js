'use strict';

var os = require('os');
var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
var run = require('./helpers').runMocha;

describe('reporters', function() {
  describe('markdown', function() {
    var res;

    before(function(done) {
      run('passing.fixture.js', ['--reporter', 'markdown'], function(
        err,
        result
      ) {
        res = result;
        done(err);
      });
    });

    it('does not exceed maximum callstack (issue: 1875)', function() {
      expect(res.output, 'not to contain', 'RangeError');
    });

    it('contains spec src', function() {
      var src = ['```js', 'assert(true);', '```'].join('\n');

      expect(res.output, 'to contain', src);
    });
  });

  describe('xunit', function() {
    it('prints test cases with --reporter-options output (issue: 1864)', function(done) {
      var randomStr = crypto.randomBytes(8).toString('hex');
      var tmpDir = os.tmpdir().replace(new RegExp(path.sep + '$'), '');
      var tmpFile = tmpDir + path.sep + 'test-issue-1864-' + randomStr + '.xml';

      var args = [
        '--reporter=xunit',
        '--reporter-options',
        'output=' + tmpFile
      ];
      var expectedOutput = [
        '<testcase classname="suite" name="test1" time="',
        '<testcase classname="suite" name="test2" time="',
        '</testsuite>'
      ];

      run('passing.fixture.js', args, function(err, result) {
        if (err) return done(err);

        var xml = fs.readFileSync(tmpFile, 'utf8');
        fs.unlinkSync(tmpFile);

        expectedOutput.forEach(function(line) {
          expect(xml, 'to contain', line);
        });

        done(err);
      });
    });

    it('print stdout to xunit file', function(done) {
      var randomStr = crypto.randomBytes(8).toString('hex');
      var tmpDir = os.tmpdir().replace(new RegExp(path.sep + '$'), '');
      var tmpFile = tmpDir + path.sep + 'stdout-' + randomStr + '.xml';

      var args = [
        '--reporter=xunit',
        '--reporter-options',
        'output=' + tmpFile
      ];
      var expectedOutput = [
        '<system-out>hello world</system-out>',
        '</testsuite>'
      ];

      run('failing-with-log.fixture.js', args, function(err, result) {
        if (err) return done(err);

        var xml = fs.readFileSync(tmpFile, 'utf8');
        fs.unlinkSync(tmpFile);

        expectedOutput.forEach(function(line) {
          expect(xml, 'to contain', line);
        });

        done(err);
      });
    });

    it('print stdout to xunit file on hook failure', function(done) {
      var randomStr = crypto.randomBytes(8).toString('hex');
      var tmpDir = os.tmpdir().replace(new RegExp(path.sep + '$'), '');
      var tmpFile = tmpDir + path.sep + 'stdout-' + randomStr + '.xml';

      var args = [
        '--reporter=xunit',
        '--reporter-options',
        'output=' + tmpFile
      ];
      var expectedOutput = [
        '<system-out>hello after</system-out>',
        '</testsuite>'
      ];
      var unexpectedOutput = ['<system-out>hello test</system-out>'];

      run('failing-with-log-after.fixture.js', args, function(err, result) {
        if (err) return done(err);

        var xml = fs.readFileSync(tmpFile, 'utf8');
        fs.unlinkSync(tmpFile);

        expectedOutput.forEach(function(line) {
          expect(xml, 'to contain', line);
        });
        unexpectedOutput.forEach(function(line) {
          expect(xml, 'not to contain', line);
        });

        done(err);
      });
    });
  });

  describe('loader', function() {
    it('loads a reporter from a path relative to the current working directory', function(done) {
      var reporterAtARelativePath =
        'test/integration/fixtures/simple-reporter.js';

      var args = ['--reporter=' + reporterAtARelativePath];

      run('passing.fixture.js', args, function(err, result) {
        if (err) {
          done(err);
          return;
        }
        expect(result, 'to have passed');
        done();
      });
    });

    it('loads a reporter from an absolute path', function(done) {
      // Generates an absolute path string
      var reporterAtAnAbsolutePath = path.join(
        process.cwd(),
        'test/integration/fixtures/simple-reporter.js'
      );

      var args = ['--reporter=' + reporterAtAnAbsolutePath];

      run('passing.fixture.js', args, function(err, result) {
        if (err) {
          done(err);
          return;
        }
        expect(result, 'to have passed');
        done();
      });
    });
  });

  describe('multiple reporters', function() {
    it('can load multiple reporters', function(done) {
      var args = [
        '--reporter',
        'test/integration/fixtures/simple-reporter.js',
        '--reporter-option',
        'name=r1',
        '--reporter',
        'test/integration/fixtures/simple-reporter.js',
        '--reporter-option',
        'name=r2'
      ];

      run('passing.fixture.js', args, function(err, result) {
        if (err) {
          done(err);
          return;
        }

        expect(result.output, 'to contain', "r1: on('suite') called");
        expect(result.output, 'to contain', "r2: on('suite') called");
        done();
      });
    });

    it('will read the first reporters options in any order', function(done) {
      var args = [
        '--reporter-option',
        'name=r1',
        '--reporter',
        'test/integration/fixtures/simple-reporter.js',
        '--reporter',
        'test/integration/fixtures/simple-reporter.js',
        '--reporter-option',
        'name=r2'
      ];

      run('passing.fixture.js', args, function(err, result) {
        if (err) {
          done(err);
          return;
        }

        expect(result.output, 'to contain', "r1: on('suite') called");
        expect(result.output, 'to contain', "r2: on('suite') called");
        done();
      });
    });
  });
});
