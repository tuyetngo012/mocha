'use strict';

var assert = require('assert');

describe('suite', function () {
  beforeEach(function () {
    console.log('hello before');
  });

  it('test1', function () {
    console.log('hello test');
    assert(false);
  });
});
