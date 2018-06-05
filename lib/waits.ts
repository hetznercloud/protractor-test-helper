/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
import { getElementArrayFinder, getElementFinder, log } from './utils';
import { DEFAULT_TIMEOUT } from './config';

/**
 * Wait for an element not to be present. Not present means that this element
 * does not exist in the DOM.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitToBeNotPresent(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const e: ElementFinder = getElementFinder(target);
    // Don't use EC.not(EC.presenceOf(e)) because it doesn't return a promise which we can catch
    return browser.wait(
        () => {
            return getElementFinder(target)
                .isPresent()
                .then((value: boolean) => !value, () => false);
        },
        timeout,
        `Element ${e.locator()} is still present`
    );
}

/**
 * Wait for an element to be not displayed. An element which is not displayed
 * could still be part of the DOM, but is hidden by a css rule.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitToBeNotDisplayed(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const e: ElementFinder = getElementFinder(target);
    // Don't use EC.invisibilityOf(e) because it doesn't return a promise which we can catch
    return browser.wait(
        () => {
            return getElementFinder(target)
                .isPresent()
                .then(result => {
                    if (!result) {
                        return false;
                    }

                    return e.isDisplayed();
                })
                .then((value: boolean) => !value, () => false);
        },
        timeout,
        `Element ${e.locator()} is still displayed`
    );
}

/**
 * Wait for an element to be present. Present means the element is part of the
 * DOM, but still might be hidden by CSS rules.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitToBePresent(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    let e: ElementFinder = getElementFinder(target);
    // don't use EC.presenceOf(e) because it doesn't return a promise which we can catch
    return browser.wait(
        (): webdriver.promise.Promise<boolean> => {
            e = getElementFinder(target);
            log(`Element ${e.locator()} waitToBePresent`);
            return e.isPresent().then((value: boolean) => value, () => false);
        },
        timeout,
        `Element ${e.locator()} is not present`
    );
}

/**
 * Wait for an element to be displayed. Displayed means that it is part of the
 * DOM **and** visible.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitToBeDisplayed(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    let e: ElementFinder = getElementFinder(target);
    // Don't use EC.visibilityOf(e), here because it doesn't return a promise which we can catch
    return browser.wait(
        (): webdriver.promise.Promise<boolean> => {
            e = getElementFinder(target);
            log(`Element ${e.locator()} waitToBeDisplayed`);
            return e
                .isPresent()
                .then((value: boolean) => {
                    if (!value) {
                        return false;
                    }
                    return e.isDisplayed();
                }, () => false)
                .then((value: boolean) => value, () => false);
        },
        timeout,
        `Element ${e.locator()} is not present nor displayed`
    );
}

/**
 * Wait for an element's text content to equal the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} value The string we are waiting for
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForTextToBe(
    target: ElementFinder | Locator | string,
    value: string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const e: ElementFinder = getElementFinder(target);

    // Don't use EC.textToBePresentInElement because it doesn't return a promise which we can catch
    return browser.wait(
        () => {
            return waitToBeDisplayed(e, timeout)
                .then(() => {
                    return getElementFinder(target).getText();
                })
                .then((text: string) => text === value, () => false);
        },
        timeout,
        `Error waiting for text in ${e.locator()} to be ${value}`
    );
}

/**
 * Wait for an element's text content to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {RegExp} value The RegExp which the content of the target should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForTextMatch(
    target: ElementFinder | Locator | string,
    value: RegExp,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    return browser.wait(
        () => {
            return waitToBeDisplayed(target, timeout)
                .then(() => getElementFinder(target).getText())
                .then((text: string) => !!text.match(value), () => false);
        },
        timeout,
        `Error waiting for text to match ${value}`
    );
}

/**
 * Wait for an element's attribute to have the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {string} value Value which the attribute should have
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForAttributeToBe(
    target: ElementFinder | Locator | string,
    attr: string,
    value: string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    return browser.wait(
        () => {
            return waitToBeDisplayed(target, timeout)
                .then(() => getElementFinder(target).getAttribute(attr))
                .then((text: string) => text === value, () => false);
        },
        timeout,
        `Error waiting for attribute ${attr} value to be ${value}`
    );
}

/**
 * Wait for an element's attribute value to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {RegExp} value RegExp which the attribute's value should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForAttributeMatch(
    target: ElementFinder | Locator | string,
    attr: string,
    value: RegExp,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    return browser.wait(
        () => {
            return waitToBeDisplayed(target, timeout)
                .then(() => getElementFinder(target).getAttribute(attr))
                .then((text: string) => !!text.match(value), () => false);
        },
        timeout,
        `Error waiting for attribute ${attr} value to match ${value}`
    );
}

/**
 * Wait for the browser's URL to match a regular expression.
 *
 * @param {RegExp} value RegExp which the URL should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForUrlMatch(
    value: RegExp,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    return browser.wait(
        () => {
            return browser
                .getCurrentUrl()
                .then((url: string) => !!url.match(value), () => false);
        },
        timeout,
        `URL has not changed to match ${value}`
    );
}

/**
 * Waits that a selector resolves to the expected number of elements. Useful
 * e.g. to verify that the expected number of items have been added to a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArryFinder
 * @param {number} expected Number of the expected elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForElementCountToBe(
    target: ElementArrayFinder | Locator | string,
    expected: number,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const es: ElementArrayFinder = getElementArrayFinder(target);

    return browser.wait(
        () => {
            return es
                .count()
                .then((count: number) => count === expected, () => false);
        },
        timeout,
        `Count of element list ${es.locator()} does not equal expected value ${expected}.`
    );
}

/**
 * Waits that a selector resolves to more than the expected count of elements.
 * Useful e.g. to verify that at least some number of items have been added to
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForElementCountToBeGreaterThan(
    target: ElementArrayFinder | Locator | string,
    expected: number,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const es: ElementArrayFinder = getElementArrayFinder(target);
    return browser.wait(
        () => {
            return es
                .count()
                .then((count: number) => count > expected, () => false);
        },
        timeout,
        `Count of element list ${es.locator()} is not greather than expected value ${expected}.`
    );
}

/**
 * Waits that a selector resolves to less than the expected count of elements.
 * Useful e.g. to verify that at least some elements have been removed from
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Should be less than the expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForElementCountToBeLessThan(
    target: ElementArrayFinder | Locator | string,
    expected: number,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const es: ElementArrayFinder = getElementArrayFinder(target);
    return browser.wait(
        () => {
            return es
                .count()
                .then((count: number) => count < expected, () => false);
        },
        timeout,
        `Count of element list ${es.locator()} is not less than expected value ${expected}.`
    );
}

/**
 * Waits for a window count. Useful e.g. for confirming that a popup window was opened.
 *
 * @param {number} count Expected number of windows
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<promise.Promise<boolean>>}
 */
export function waitForWindowCount(
    count: number,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    return browser.wait(() => {
        return browser
            .getAllWindowHandles()
            .then((handels: string[]) => {
                return handels.length;
            })
            .then((windows: number) => windows === count, () => false);
    }, timeout);
}
