/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ElementArrayFinder, ElementFinder } from 'protractor';
import { Locator } from 'protractor/built/locators';
import * as webdriver from 'selenium-webdriver';
/**
 * Wait for an element not to be present. Not present means that this element
 * does not exist in the DOM.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitToBeNotPresent(target: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element to be not displayed. An element which is not displayed
 * could still be part of the DOM, but is hidden by a css rule.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitToBeNotDisplayed(target: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element to be present. Present means the element is part of the
 * DOM, but still might be hidden by CSS rules.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitToBePresent(target: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element to be displayed. Displayed means that it is part of the
 * DOM **and** visible.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitToBeDisplayed(target: ElementFinder | Locator | string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element's text content to equal the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} value The string we are waiting for
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForTextToBe(target: ElementFinder | Locator | string, value: string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element's text content to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target
 * @param {RegExp} value The RegExp which the content of the target should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForTextMatch(target: ElementFinder | Locator | string, value: RegExp, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element's attribute to have the given value.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {string} value Value which the attribute should have
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForAttributeToBe(target: ElementFinder | Locator | string, attr: string, value: string, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for an element's attribute value to match a regular expression.
 *
 * @param {ElementFinder | Locator | string} target Target element
 * @param {string} attr Attribute name
 * @param {RegExp} value RegExp which the attribute's value should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForAttributeMatch(target: ElementFinder | Locator | string, attr: string, value: RegExp, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Wait for the browser's URL to match a regular expression.
 *
 * @param {RegExp} value RegExp which the URL should match
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForUrlMatch(value: RegExp, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Waits that a selector resolves to the expected number of elements. Useful
 * e.g. to verify that the expected number of items have been added to a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArryFinder
 * @param {number} expected Number of the expected elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForElementCountToBe(target: ElementArrayFinder | Locator | string, expected: number, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Waits that a selector resolves to more than the expected count of elements.
 * Useful e.g. to verify that at least some number of items have been added to
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForElementCountToBeGreaterThan(target: ElementArrayFinder | Locator | string, expected: number, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Waits that a selector resolves to less than the expected count of elements.
 * Useful e.g. to verify that at least some elements have been removed from
 * a list.
 *
 * @param {ElementFinder | Locator | string} target Target selector or ElementArrayFinder
 * @param {number} expected Should be less than the expected number of elements
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForElementCountToBeLessThan(target: ElementArrayFinder | Locator | string, expected: number, timeout?: number): webdriver.promise.Promise<boolean>;
/**
 * Waits for a window count. Useful e.g. for confirming that a popup window was opened.
 *
 * @param {number} count Expected number of windows
 * @param {number} timeout Timeout in milliseconds
 * @returns {promise.Promise<boolean>}
 */
export declare function waitForWindowCount(count: number, timeout?: number): webdriver.promise.Promise<boolean>;
