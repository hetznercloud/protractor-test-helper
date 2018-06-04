/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ElementFinder } from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
/**
 * Waits for an element to be displayed and clickable, and click on it.
 * If the click fails, `tryCount` retries are performed.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 * @param {number} tryCount Retry counter for the recursion
 */
export declare function click(target: ElementFinder | Locator | string, timeout?: number, tryCount?: number): webdriver.promise.Promise<void>;
/**
 * Waits for an element to be displayed and positions the pointer inside that
 * element.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export declare function hover(target: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<void>;
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
export declare function sendKeys(target: ElementFinder | Locator | string, value: string, timeout?: number, tryCount?: number): webdriver.promise.Promise<void>;
/**
 * Select an `<option>`. If the selection fails, 3 retries are performed.
 *
 * @param {ElementFinder | Locator | string} option Target <option> element
 * @param {number} timeout Timeout in milliseconds to wait for the target
 */
export declare function selectOption(option: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<void>;
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
export declare function selectOptionByText(select: ElementFinder | Locator | string, text: string, timeout?: number): webdriver.promise.Promise<void>;
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
export declare function selectOptionByIndex(select: ElementFinder | Locator | string, index: number, timeout?: number): webdriver.promise.Promise<void>;
