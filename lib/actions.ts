/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser, by, ElementFinder, protractor } from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
import { getElementFinder, sleep } from './utils';
import { waitToBeDisplayed } from './waits';
import { DEFAULT_RETRIES, DEFAULT_TIMEOUT } from './config';

/**
 * Waits for an element to be displayed and clickable, and click on it.
 * If the click fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 */
export function click(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT,
    tryCount: number = DEFAULT_RETRIES
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(target);

    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return browser.wait(
                protractor.ExpectedConditions.elementToBeClickable(e),
                timeout,
                `Element ${e.locator} not clickable`
            );
        })
        .then(() => e.click())
        .then(
            () => {},
            // tslint:disable-next-line:no-any
            (error: any) => {
                if (tryCount > 0) {
                    // tslint:disable-next-line:no-console
                    console.log(`Click error: ${error}`);
                    // tslint:disable-next-line:no-console
                    console.log(`Click retry ${tryCount} on target ${target}`);
                    tryCount = tryCount - 1;
                    click(target, timeout, tryCount);
                } else {
                    // tslint:disable-next-line:no-console
                    console.error(`Error while clicking on ${e.locator()}`);
                    throw error;
                }
            }
        );
}

/**
 * Waits for an element to be displayed and positions the pointer inside that
 * element.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export function hover(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(target);
    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return browser
                .actions()
                .mouseMove(e)
                .perform();
        })
        .then(() => {
            return sleep(500);
        });
}

/**
 * Wait for an `<input>` element to be displayed, then clear its content, and
 * perform key strokes for the passed value. If sendKeys fails, `tryCount`
 * retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} value Input value which should be sent as key inputs
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 */
export function sendKeys(
    target: ElementFinder | Locator | string,
    value: string,
    timeout: number = DEFAULT_TIMEOUT,
    tryCount: number = DEFAULT_RETRIES
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(target);
    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return e.clear();
        })
        .then(
            () => {
                e.sendKeys(value);
            },
            // tslint:disable-next-line:no-any
            (error: any) => {
                if (tryCount > 0) {
                    console.log(error);
                    // tslint:disable-next-line:no-console
                    console.log(
                        `Send keys retry ${tryCount} on target ${e.locator()}`
                    );
                    tryCount = tryCount - 1;
                    sendKeys(target, value, timeout, tryCount);
                } else {
                    // tslint:disable-next-line:no-console
                    console.error(`Error while sending keys on ${e.locator()}`);
                    throw error;
                }
            }
        );
}

/**
 * Select an `<option>`. If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} option Target <option> element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export function selectOption(
    option: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<void> {
    // Retry happens in click
    return click(option);
}

/**
 * Select an `<option>` ancestor of a particular `<select>` element by its
 * content. The option is identified by Protractor's `cssContainingText`
 * (partial match: `selectOptionByText('bar')` matches `<option>foobar</option>`
 * too). If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} select Parent <select> element
 * @param {string} text Text of the option which should be selected
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export function selectOptionByText(
    select: ElementFinder | Locator | string,
    text: string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(select);
    const option: ElementFinder = e.element(
        by.cssContainingText('option', text)
    );
    return selectOption(option, timeout);
}

/**
 * Select an `<option>` ancestor of a particular `<select>` element by its
 * index. All options are collected by `tagName === 'option'`, skipping
 * `<optgroup>` or similar elements. After that the index is selected.
 * If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} select Parent <select> element
 * @param {number} index Index of the option which should be selected
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export function selectOptionByIndex(
    select: ElementFinder | Locator | string,
    index: number,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<void> {
    const e: ElementFinder = getElementFinder(select)
        .all(by.tagName('option'))
        .get(index);
    return selectOption(e, timeout);
}
