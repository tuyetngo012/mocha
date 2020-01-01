describe('suite 1', () => {
    beforeEach(() => { });

    it('should pass', () => {});
});

describe('suite 2', () => {
    before(() => {
        throw new Error('should not be run');
    })

    after(() => {
        throw new Error('should not be run');
    })

    beforeEach(() => {
        throw new Error('should not be run');
    });
    
    afterEach(() => {
        throw new Error('should not be run');
    });

    it.skip('should be skipped', () => {});
});

describe.skip('suite 3', () => {
    before(() => {
        throw new Error('should not be run');
    })

    after(() => {
        throw new Error('should not be run');
    })

    beforeEach(() => {
        throw new Error('should not be run');
    });
    
    afterEach(() => {
        throw new Error('should not be run');
    });

    it('should be skipped', () => {});
});
