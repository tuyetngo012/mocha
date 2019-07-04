'use strict';

describe('events', function () {
  before(function () {
    this.events.on('fail', function () {
      console.log('event fail start');

      return new Promise(function (resolve) {
        setTimeout(function() {
          console.log('event fail end');
          resolve();
        }, 10);
      });
    });
  });

  beforeEach(function () {
    console.log('before each');
  });

  afterEach(function () {
    console.log('after each');
  });

  it('test 1', function () {
    console.log('TEST 1 fail');
    throw new Error('fail');
  });

  it('stest 2', function () {
    console.log('TEST 2 pass');
  });
});
