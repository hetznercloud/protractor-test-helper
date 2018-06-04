/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser, ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';
import { Locator } from 'protractor/built/locators';
import { getElementFinder } from './utils';
import { waitToBeDisplayed } from './waits';
import { DEFAULT_RETRIES, DEFAULT_TIMEOUT } from './config';

/**
 * Wait for an element to be displayed, and resolves to the text in that
 * element. If `getText` fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 * @returns {promise.Promise<string>}
 */
export function getText(
    target: ElementFinder | Locator | string,
    timeout: number = DEFAULT_TIMEOUT,
    tryCount: number = DEFAULT_RETRIES
): webdriver.promise.Promise<string> {
    const e: ElementFinder = getElementFinder(target);

    return waitToBeDisplayed(target, timeout)
        .then(() => {
            return e.getText();
        })
        .then(
            (value: string) => value,
            // tslint:disable-next-line:no-any
            (error: any) => {
                if (tryCount > 0) {
                    // tslint:disable-next-line:no-console
                    console.error(`Error while getting text on ${e.locator()}`);
                    throw error;
                }
                // tslint:disable-next-line:no-console
                console.log(`getText retry ${tryCount}`);
                tryCount = tryCount - 1;
                return getText(target, timeout, tryCount);
            }
        );
}

/**
 * Waits for the element to be present, and resolves to the attribute's value.
 *
 * @param {string} target Target element
 * @param {string} attr Attribute name to look for
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @returns {promise.Promise<string>}
 */
export function getElementAttributeValue(
    target: ElementFinder | Locator | string,
    attr: string,
    timeout: number = DEFAULT_TIMEOUT
): webdriver.promise.Promise<string> {
    return waitToBeDisplayed(target, timeout).then(() => {
        const e: ElementFinder = getElementFinder(target);
        return e.getAttribute(attr);
    });
}

/**
 * Resolves to the current window count.
 * Windows includes windows, tabs, etc.
 *
 * @returns {promise.Promise<number>}
 */
export function getWindowHandlesCount(): webdriver.promise.Promise<number> {
    return browser.getAllWindowHandles().then((handles: string[]) => {
        return handles.length;
    });
}
