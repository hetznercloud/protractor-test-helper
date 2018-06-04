import * as webdriver from 'selenium-webdriver';
/**
 * Scrolls to the top of the window.
 */
export declare function scrollTop(): webdriver.promise.Promise<void>;
/**
 * Closes a browser window, popup, or tab identified by its zero-based index.
 * If two windows are open and the second window is to be closed, the index
 * should be 1.
 *
 * @param {index} index The index of the Window
 */
export declare function closeWindow(index?: number): webdriver.promise.Promise<void>;
/**
 * Opens the passed URL in a new tab.
 *
 * @param {string} url The URL to be opened in the window or tab
 */
export declare function openUrlInNewTab(url: string): webdriver.promise.Promise<webdriver.promise.Promise<boolean>>;
