'use strict';

var assert = require('assert');

describe('suite', function () {
  after(function () {
    console.log('hello after');
    assert(false);
  });

  it('test1', function () {
    console.log('hello test');
  });
});
