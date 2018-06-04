/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { browser, by, element } from 'protractor';
import { ElementFinder, ElementArrayFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';

export class ActionsPage {
    readonly url: string = '/actions';
    readonly urlRegex: RegExp = /actions/;
    readonly selectSelector: string = '[data-test=select]';
    readonly optionSelector: string = 'option';

    navigateTo(): webdriver.promise.Promise<void> {
        return browser.get(this.url);
    }

    get clickBtn(): ElementFinder {
        return element(by.css('[data-test=click-btn]'));
    }

    get clickResult(): ElementFinder {
        return element(by.css('[data-test=click-result]'));
    }

    get hoverBtn(): ElementFinder {
        return element(by.css('[data-test=hover-btn]'));
    }

    get hoverResult(): ElementFinder {
        return element(by.css('[data-test=hover-result]'));
    }

    get sendKeysInput(): ElementFinder {
        return element(by.css('[data-test=send-keys-input]'));
    }

    get inputResult(): ElementFinder {
        return element(by.css('[data-test=input-result]'));
    }

    get select(): ElementFinder {
        return element(by.css(this.selectSelector));
    }

    get selectResult(): ElementFinder {
        return element(by.css('[data-test=select-result]'));
    }
}
