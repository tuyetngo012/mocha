'use strict';

describe('looping test', function () {
    this.timeout(3000);

    after(function () {
        console.log('after()');
    });

    it('should invoke after handlers when killed if --cleanup-after used', function (done) {
        console.log('it()');
        // never returning, need to forcefully kill the test
        while(true);
    });

    it('should not run', function() {
        console.log('should not run');
    });
});
