const {
    click,
    waitForTextToBe,
    sendKeys,
    getText,
} = require('@hetznercloud/protractor-test-helper');

// If you change something here, please update _/docs/README.base.md, too
describe('readme example', () => {
    // Simple example - better would be a Page Object
    const firstNumber = element(by.model('first'));
    const secondNumber = element(by.model('second'));
    const goButton = element(by.id('gobutton'));
    const latestResult = element(by.binding('latest'));

    beforeEach(() => {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should add one and two', () => {
        sendKeys(firstNumber, '1');
        sendKeys(secondNumber, '2');
        click(goButton);

        waitForTextToBe(latestResult, '3');
        expect(getText(latestResult), '3');
    });
});
