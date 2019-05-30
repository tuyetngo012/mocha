'use strict';

describe('hanging test', function () {
    this.timeout(3000);

    it('should complete with a hanging timer', function() {
        console.log('it()');
        setTimeout(function () {
            console.log('timer expired');
        }, 300);
    });
});
