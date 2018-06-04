/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';
import { Locator } from 'protractor/built/locators';
/**
 * Wait for an element to be displayed, and resolves to the text in that
 * element. If `getText` fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 * @returns {promise.Promise<string>}
 */
export declare function getText(target: ElementFinder | Locator | string, timeout?: number, tryCount?: number): webdriver.promise.Promise<string>;
/**
 * Waits for the element to be present, and resolves to the attribute's value.
 *
 * @param {string} target Target element
 * @param {string} attr Attribute name to look for
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @returns {promise.Promise<string>}
 */
export declare function getElementAttributeValue(target: ElementFinder | Locator | string, attr: string, timeout?: number): webdriver.promise.Promise<string>;
/**
 * Resolves to the current window count.
 * Windows includes windows, tabs, etc.
 *
 * @returns {promise.Promise<number>}
 */
export declare function getWindowHandlesCount(): webdriver.promise.Promise<number>;
