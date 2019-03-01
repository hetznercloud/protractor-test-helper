"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
var protractor_1 = require("protractor");
var waits_1 = require("./waits");
var actions_1 = require("./actions");
/**
 * Scrolls to the top of the window.
 */
function scrollTop() {
    return protractor_1.browser.executeScript('window.scrollTo(0,0);');
}
exports.scrollTop = scrollTop;
/**
 * Scrolls to the bottom of the window.
 */
function scrollBottom() {
    return protractor_1.browser.executeScript('window.scrollTo(0, document.body.scrollHeight);');
}
exports.scrollBottom = scrollBottom;
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
        // tslint:disable-next-line:no-any
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
    var tempId = 'pth-openwindowlink';
    var windowLength;
    return (protractor_1.browser
        .getAllWindowHandles()
        // tslint:disable-next-line:no-any
        .then(function (handles) {
        windowLength = handles.length;
        // Create a DOM element, other solution with window.open doesn't work on every browser because it sometimes
        // get blocked by the popup blocker
        return protractor_1.browser.driver.executeScript(function (url, tempId) {
            var a = document.getElementById(tempId);
            if (!a) {
                a = document.createElement('a');
                a.target = '_blank';
                a.innerHTML = '.';
                a.id = tempId;
            }
            a.href = url;
            document.body.appendChild(a);
            return a;
        }, url, tempId);
    })
        .then(function () {
        return actions_1.click("#" + tempId);
    })
        .then(function () {
        return waits_1.waitForWindowCount(windowLength + 1);
    })
        .then(function () {
        return protractor_1.browser.getAllWindowHandles();
    })
        // tslint:disable-next-line:no-any
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
