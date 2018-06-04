/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    browser,
    by,
    element,
    ElementFinder,
    ElementArrayFinder,
} from 'protractor';
import * as webdriver from 'selenium-webdriver';

export class WaitsPage {
    navigateTo(): webdriver.promise.Promise<void> {
        return browser.get('/waits');
    }

    get waitForAttribute(): ElementFinder {
        return element(by.css('[data-test=waitForAttributeMatch]'));
    }

    get waitForElementCount(): ElementArrayFinder {
        return element.all(by.css('[data-test=waitForElementCount] li'));
    }

    get waitForElementCountToBeLess(): ElementArrayFinder {
        return element.all(
            by.css('[data-test=waitForElementCountToBeLess] li')
        );
    }

    get waitForText(): ElementFinder {
        return element(by.css('[data-test=waitForText]'));
    }

    get waitToBeDisplayed(): ElementFinder {
        return element(by.css('[data-test=waitToBeDisplayed]'));
    }

    get waitToBePresent(): ElementFinder {
        return element(by.css('[data-test=waitToBePresent]'));
    }

    get waitToBeNotDisplayed(): ElementFinder {
        return element(by.css('[data-test=waitToBeNotDisplayed]'));
    }

    get waitToBeNotPresent(): ElementFinder {
        return element(by.css('[data-test=waitToBeNotPresent]'));
    }
}
