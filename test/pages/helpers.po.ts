/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser, by, element } from 'protractor';
import { ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';

export class HelpersPage {
    readonly url: string = '/helpers';

    navigateTo(): webdriver.promise.Promise<void> {
        return browser.get(this.url);
    }

    get getText(): ElementFinder {
        return element(by.css('[data-test=getText]'));
    }

    get getAttributeContainer(): ElementFinder {
        return element(by.css('[data-test=getAttribute]'));
    }
}
