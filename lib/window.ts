/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser } from 'protractor';
import { waitForUrlMatch, waitForWindowCount } from './waits';
import * as webdriver from 'selenium-webdriver';
import { click } from './actions';

/**
 * Scrolls to the top of the window.
 */
export function scrollTop(): webdriver.promise.Promise<void> {
    return browser.executeScript('window.scrollTo(0,0);');
}

/**
 * Scrolls to the bottom of the window.
 */
export function scrollBottom(): webdriver.promise.Promise<void> {
    return browser.executeScript('window.scrollTo(0, document.body.scrollHeight);');
}

/**
 * Closes a browser window, popup, or tab identified by its zero-based index.
 * If two windows are open and the second window is to be closed, the index
 * should be 1.
 *
 * @param {index} index The index of the Window
 */
export function closeWindow(
    index: number = 0
): webdriver.promise.Promise<void> {
    return (
        browser
            .getAllWindowHandles()
            // tslint:disable-next-line:no-any
            .then((handles: any[]) => {
                if (!handles[index]) {
                    throw new Error('Can not close window. Index not found');
                }
                browser.switchTo().window(handles[index]);
                browser.close();
                return browser.switchTo().window(handles[index - 1]);
            })
            .catch(e => {
                console.error(`Error while closing window with index ${index}`);
                throw e;
            })
    );
}

/**
 * Opens the passed URL in a new tab.
 *
 * @param {string} url The URL to be opened in the window or tab
 */
export function openUrlInNewTab(
    url: string
): webdriver.promise.Promise<webdriver.promise.Promise<boolean>> {
    const tempId: string = 'pth-openwindowlink';
    let windowLength: number;
    return (
        browser
            .getAllWindowHandles()
            // tslint:disable-next-line:no-any
            .then((handles: any[]) => {
                windowLength = handles.length;
                // Create a DOM element, other solution with window.open doesn't work on every browser because it sometimes
                // get blocked by the popup blocker
                return browser.driver.executeScript(
                    (url: string, tempId: string): HTMLElement => {
                        var a: HTMLAnchorElement = document.getElementById(
                            tempId
                        ) as HTMLAnchorElement;
                        if (!a) {
                            a = document.createElement('a');
                            a.target = '_blank';
                            a.innerHTML = '.';
                            a.id = tempId;
                        }
                        a.href = url;
                        document.body.appendChild(a);
                        return a;
                    },
                    url,
                    tempId
                );
            })
            .then(() => {
                return click(`#${tempId}`);
            })
            .then(() => {
                return waitForWindowCount(windowLength + 1);
            })
            .then(() => {
                return browser.getAllWindowHandles();
            })
            // tslint:disable-next-line:no-any
            .then((handles: any[]) => {
                return browser.switchTo().window(handles[handles.length - 1]);
            })
            .then(() =>
                waitForUrlMatch(
                    new RegExp(
                        // Regex replace from https://stackoverflow.com/a/6969486/621765
                        url.replace(
                            /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                            '\\$&'
                        )
                    )
                )
            )
    );
}
