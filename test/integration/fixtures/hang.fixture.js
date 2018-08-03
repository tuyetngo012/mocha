'use strict';

describe('hanging test', function () {
    this.timeout(3000);

    afterEach(function (done) {
        console.log('async afterEach()');
        setTimeout(done, 100);
    });

    afterEach(function () {
        console.log('afterEach()');
    });

    after(function (done) {
        console.log('async after()');
        setTimeout(done, 100);
    });

    after(function () {
        console.log('after()');
    });

    it('should invoke after handlers when killed if --cleanup-after used', function (done) {
        console.log('it()');
        // not calling done, need to abort the test
    });

    it('should not run', function() {
        console.log('should not run');
    });
});
