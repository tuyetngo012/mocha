'use strict';

var assert = require('assert');
var yargs = require('yargs');

var where = yargs.argv.where;

describe('suite', function () {
  before(() => {
    console.log('#before()#');
    assert(where !== 'before');
  });

  beforeEach(() => {
    console.log('#beforeEach()#');
    assert(where !== 'beforeEach');
  });

  after(() => {
    console.log('#after()#');
    assert(where !== 'after');
  });

  afterEach(() => {
    console.log('#afterEach()#');
    assert(where !== 'afterEach');
  });

  it('test1', function () {
    console.log('#test()#');
    assert(where !== 'test');
  });
});
