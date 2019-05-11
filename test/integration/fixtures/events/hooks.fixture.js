'use strict';

describe('events', function () {
  before(function () {
    this.events.on('pass', function () {
      console.log('event pass');
    });

    this.events.on('fail', function () {
      console.log('event fail');
    });
  });

  before(function () {
    console.log('before');
  });

  after(function () {
    console.log('after');
  });

  beforeEach(function () {
    console.log('before each');
  });

  afterEach(function () {
    console.log('after each');
  });

  it('should invoke events on pass', function () {
    console.log('TEST pass');
  });

  it('should invoke events on fail', function () {
    console.log('TEST fail');
    throw new Error('fail');
  });
});
