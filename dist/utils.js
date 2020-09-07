"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.refresh = exports.flowLog = exports.log = exports.getElementArrayFinder = exports.getElementFinder = void 0;
/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
var protractor_1 = require("protractor");
var config_1 = require("./config");
/**
 * Constructs an ElementFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
function getElementFinder(target) {
    if (typeof target === 'string') {
        return protractor_1.element(protractor_1.by.css(target));
    }
    if (target.hasOwnProperty('parentElementArrayFinder')) {
        return target;
    }
    return protractor_1.element(target);
}
exports.getElementFinder = getElementFinder;
/**
 * Constructs an ElementArrayFinder from various target types.
 *
 * @param {ElementFinder | Locator | string} target Target element
 */
function getElementArrayFinder(target) {
    if (typeof target === 'string') {
        return protractor_1.element.all(protractor_1.by.css(target));
    }
    if (target instanceof protractor_1.ElementArrayFinder) {
        return target;
    }
    return protractor_1.element.all(target);
}
exports.getElementArrayFinder = getElementArrayFinder;
/**
 * Logs a message to the console if debugging is enabled.
 *
 * @param {string} message Text to be logged to the console
 * @param {boolean} ignoreDebug Force log message to be logged, regardless of debug settings
 */
function log(message, ignoreDebug) {
    if (ignoreDebug === void 0) { ignoreDebug = false; }
    if (config_1.DEBUG || ignoreDebug) {
        // tslint:disable-next-line:no-console
        console.log(message);
    }
}
exports.log = log;
/**
 * Logs a message in the flow of protractor.
 * This means that the log message appears in the correct order
 * as the actions and tests are performed, and not like regular
 * log output at the test initialization.
 *
 * @param {string} message Text to be logged to the console in the control flow
 */
function flowLog(message) {
    var flow = protractor_1.browser.controlFlow(); // tslint:disable-line:no-any
    return flow.execute(function () {
        // tslint:disable-next-line:no-console
        console.log(message);
    });
}
exports.flowLog = flowLog;
/**
 * Performs a page reload and displays a message in the flow log why the reload
 * was necessary.
 *
 * @see flowLog
 * @param {string} reason Text to be logged to the flow log
 */
function refresh(reason) {
    flowLog("Page reload because of: " + reason);
    return protractor_1.browser.refresh();
}
exports.refresh = refresh;
/**
 * Performs a browser sleep. Normally it should be avoided because of its
 * performance impact, and replaced by one of the `waitTo…` functions wherever
 * possible. If `sleep` is still necessary, a reason can be displayed in the
 * flow log.
 *
 * @param {number} time Time in milliseconds to sleep
 * @param {string} message Text which explains why the sleep was necessary
 */
function sleep(time, message) {
    if (!message) {
        message = 'Sleeping';
    }
    message += ": " + (time / 1000).toFixed(2) + "s";
    if (time > 5000) {
        flowLog(message);
    }
    return protractor_1.browser.sleep(time);
}
exports.sleep = sleep;
