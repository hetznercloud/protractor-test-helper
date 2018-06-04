"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
var protractor_1 = require("protractor");
var waits_1 = require("./waits");
/**
 * Scrolls to the top of the window.
 */
function scrollTop() {
    return protractor_1.browser.executeScript('window.scrollTo(0,0);');
}
exports.scrollTop = scrollTop;
/**
 * Closes a browser window, popup, or tab identified by its zero-based index.
 * If two windows are open and the second window is to be closed, the index
 * should be 1.
 *
 * @param {index} index The index of the Window
 */
function closeWindow(index) {
    if (index === void 0) { index = 0; }
    return (protractor_1.browser
        .getAllWindowHandles()
        .then(function (handles) {
        if (!handles[index]) {
            throw new Error('Can not close window. Index not found');
        }
        protractor_1.browser.switchTo().window(handles[index]);
        protractor_1.browser.close();
        return protractor_1.browser.switchTo().window(handles[index - 1]);
    })
        .catch(function (e) {
        console.error("Error while closing window with index " + index);
        throw e;
    }));
}
exports.closeWindow = closeWindow;
/**
 * Opens the passed URL in a new tab.
 *
 * @param {string} url The URL to be opened in the window or tab
 */
function openUrlInNewTab(url) {
    // https://stackoverflow.com/a/47348858/621765
    return (protractor_1.browser.driver
        .executeScript(function () {
        return window.open(arguments[0], '_blank');
    }, url)
        .then(function () { return protractor_1.browser.getAllWindowHandles(); })
        .then(function (handles) {
        return protractor_1.browser.switchTo().window(handles[handles.length - 1]);
    })
        .then(function () {
        return waits_1.waitForUrlMatch(new RegExp(
        // Regex replace from https://stackoverflow.com/a/6969486/621765
        url.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')));
    }));
}
exports.openUrlInNewTab = openUrlInNewTab;
