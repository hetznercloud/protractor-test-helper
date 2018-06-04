/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser } from 'protractor';
import { waitForUrlMatch } from './waits';
import * as webdriver from 'selenium-webdriver';

/**
 * Scrolls to the top of the window.
 */
export function scrollTop(): webdriver.promise.Promise<void> {
    return browser.executeScript('window.scrollTo(0,0);');
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
    // https://stackoverflow.com/a/47348858/621765
    return (
        browser.driver
            .executeScript(function(): Window {
                return window.open(arguments[0], '_blank');
            }, url)
            .then(() => browser.getAllWindowHandles())
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
