# @johanblumenberg/mocha

Fork of [mocha](https://www.npmjs.com/package/mocha), which will be kept until the following PRs are accepted, or similar functionality is added to mocha:

- [Ensure all after hooks are executed, even if one of them fail](https://github.com/mochajs/mocha/pull/3281)
- [Support for nested options in reporterOptions](https://github.com/mochajs/mocha/pull/3487)

## Added functionality in this fork

### Listen to events

It can be useful for a test to be able to know when a test starts, fails, passes, and so on.
The same events that are exposed to reporters are also exposed to tests to listen for.

Example:

```js
describe('test a web page', function () {
    var webdriver;

    before(function() {
        webdriver = ... // Set up a webdriver pointing to my web paage

        this.events.on('test', function (test) {
            webdriver.log('Starting test ' + test.fullTitle());
        });

        this.events.on('test end', function (test) {
            webdriver.log('Passing test ' + test.fullTitle());
        });

        this.events.on('fail', (test, err) => {
            webdriver.log('Failing test ' + test.fullTitle());

            let logs = webdriver.getLogs();
            console.log(logs);
        });
    });
});
```

This simple example is testing a web page using webdriver.
When a test starts and ends, a message is logged to the browser console, to make it easier to correlate the browser console log with the tests that are run. When a test fails, the browser console log is collected and logged to the test console.