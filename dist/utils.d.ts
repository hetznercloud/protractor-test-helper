/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ElementArrayFinder, ElementFinder } from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
/**
 * Constructs an ElementFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
export declare function getElementFinder(target: ElementFinder | Locator | string): ElementFinder;
/**
 * Constructs an ElementArrayFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
export declare function getElementArrayFinder(target: ElementArrayFinder | Locator | string): ElementArrayFinder;
/**
 * Logs a message to the console if debugging is enabled.
 *
 * @param {string} message Text to be logged to the console
 * @param {boolean} ignoreDebug Force log message to be logged, regardless of debug settings
 */
export declare function log(message: string, ignoreDebug?: boolean): void;
/**
 * Logs a message in the flow of protractor.
 * This means that the log message appears in the correct order
 * as the actions and tests are performed, and not like regular
 * log output at the test initialization.
 *
 * @param {string} message Text to be logged to the console in the control flow
 */
export declare function flowLog(message: string): webdriver.promise.Promise<void>;
/**
 * Performs a page reload and displays a message in the flow log why the reload
 * was necessary.
 *
 * @see flowLog
 * @param {string} reason Text to be logged to the flow log
 */
export declare function refresh(reason: string): webdriver.promise.Promise<void>;
/**
 * Performs a browser sleep. Normally it should be avoided because of its
 * performance impact, and replaced by one of the `waitTo…` functions wherever
 * possible. If `sleep` is still necessary, a reason can be displayed in the
 * flow log.
 *
 * @param {number} time Time in milliseconds to sleep
 * @param {string} message Text which explains why the sleep was necessary
 */
export declare function sleep(time: number, message?: string): webdriver.promise.Promise<void>;
