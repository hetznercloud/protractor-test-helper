/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    browser,
    by,
    element,
    ElementArrayFinder,
    ElementFinder,
} from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
import { DEBUG } from './config';

/**
 * Constructs an ElementFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
export function getElementFinder(
    target: ElementFinder | Locator | string
): ElementFinder {
    if (typeof target === 'string') {
        return element(by.css(target as string));
    }

    if (target.hasOwnProperty('parentElementArrayFinder')) {
        return target as ElementFinder;
    }
    return element(target as Locator);
}

/**
 * Constructs an ElementArrayFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
export function getElementArrayFinder(
    target: ElementArrayFinder | Locator | string
): ElementArrayFinder {
    if (typeof target === 'string') {
        return element.all(by.css(target as string));
    }

    if (target instanceof ElementArrayFinder) {
        return target;
    }

    return element.all(target as Locator);
}

/**
 * Logs a message to the console if debugging is enabled.
 *
 * @param {string} message Text to be logged to the console
 * @param {boolean} ignoreDebug Force log message to be logged, regardless of debug settings
 */
export function log(message: string, ignoreDebug: boolean = false): void {
    if (DEBUG || ignoreDebug) {
        // tslint:disable-next-line:no-console
        console.log(message);
    }
}

/**
 * Logs a message in the flow of protractor.
 * This means that the log message appears in the correct order
 * as the actions and tests are performed, and not like regular
 * log output at the test initialization.
 *
 * @param {string} message Text to be logged to the console in the control flow
 */
export function flowLog(message: string): webdriver.promise.Promise<void> {
    const flow: any = browser.controlFlow(); // tslint:disable-line:no-any

    return flow.execute(() => {
        // tslint:disable-next-line:no-console
        console.log(message);
    });
}
/**
 * Performs a page reload and displays a message in the flow log why the reload
 * was necessary.
 *
 * @see flowLog
 * @param {string} reason Text to be logged to the flow log
 */
export function refresh(reason: string): webdriver.promise.Promise<void> {
    flowLog(`Page reload because of: ${reason}`);
    return browser.refresh();
}

/**
 * Performs a browser sleep. Normally it should be avoided because of its
 * performance impact, and replaced by one of the `waitTo…` functions wherever
 * possible. If `sleep` is still necessary, a reason can be displayed in the
 * flow log.
 *
 * @param {number} time Time in milliseconds to sleep
 * @param {string} message Text which explains why the sleep was necessary
 */
export function sleep(
    time: number,
    message?: string
): webdriver.promise.Promise<void> {
    if (!message) {
        message = 'Sleeping';
    }
    message += `: ${(time / 1000).toFixed(2)}s`;
    if (time > 5000) {
        flowLog(message);
    }
    return browser.sleep(time);
}
