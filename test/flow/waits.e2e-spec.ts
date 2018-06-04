/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    waitForAttributeMatch,
    waitForAttributeToBe,
    waitForElementCountToBe,
    waitForElementCountToBeGreaterThan,
    waitForElementCountToBeLessThan,
    waitForTextMatch,
    waitForTextToBe,
    waitToBeDisplayed,
    waitToBePresent,
    waitToBeNotDisplayed,
    openUrlInNewTab,
    waitForWindowCount,
    closeWindow,
    waitForUrlMatch,
} from 'protractor-test-helper';
import { WaitsPage } from '../pages/waits.po';
import { ActionsPage } from '../pages/actions.po';
import { browser } from 'protractor';

describe('flow protractor-test-helper waits', () => {
    const waitsPage: WaitsPage = new WaitsPage();

    beforeEach(() => {
        waitsPage.navigateTo();
    });

    it('waitsForAttributeMatch should wait until an element has a attribute test which values matches /match/', () => {
        const attr = 'test';
        waitForAttributeMatch(waitsPage.waitForAttribute, attr, /match/);

        expect(waitsPage.waitForAttribute.getAttribute(attr)).toBe('match');
    });

    it('waitForAttributeToBe should wait until an element has a attribute test with the value match', () => {
        const attr = 'test';
        waitForAttributeToBe(waitsPage.waitForAttribute, attr, 'match');

        expect(waitsPage.waitForAttribute.getAttribute(attr)).toBe('match');
    });

    it('waitForElementcountToBe should wait until a list has 3 items', () => {
        waitForElementCountToBe(waitsPage.waitForElementCount, 3);

        expect(waitsPage.waitForElementCount.count()).toBe(3);
    });

    it('waitForElementCountToBeGreaterThan should wait for until a list has more thatn 2 items', () => {
        waitForElementCountToBeGreaterThan(waitsPage.waitForElementCount, 2);

        expect(waitsPage.waitForElementCount.count()).toBe(3);
    });

    it('waitForElementCountToBeLessThan should wait until a list has less than 3 items', () => {
        waitForElementCountToBeLessThan(
            waitsPage.waitForElementCountToBeLess,
            3
        );

        expect(waitsPage.waitForElementCountToBeLess.count()).toBe(2);
    });

    it('waitForTextMatch should wait that an element text matches an regex', () => {
        waitForTextMatch(waitsPage.waitForText, /match/);

        expect(waitsPage.waitForText.getText()).toBe('match');
    });

    it('waitForText should wait for an element to contain a text', () => {
        waitForTextToBe(waitsPage.waitForText, 'match');

        expect(waitsPage.waitForText.getText()).toBe('match');
    });

    it('waitToBeDisplayed should wait for an element to be displayed', () => {
        waitToBeDisplayed(waitsPage.waitToBeDisplayed);

        expect(waitsPage.waitToBeDisplayed.isDisplayed()).toBe(true);
    });

    it('waitToBePresent should wait for an element to be present', () => {
        waitToBePresent(waitsPage.waitToBePresent);

        expect(waitsPage.waitToBePresent.isPresent()).toBe(true);
    });

    it('waitToBeNotDisplayed should wait for an element not to be displayed', () => {
        waitToBeNotDisplayed(waitsPage.waitToBeNotDisplayed);

        expect(waitsPage.waitToBeNotDisplayed.isDisplayed()).toBe(false);
    });

    it('waitToBeNotPresent should wait for an element not to be present', () => {
        waitToBePresent(waitsPage.waitToBePresent);

        expect(waitsPage.waitToBeNotPresent.isPresent()).toBe(false);
    });

    it('waitForUrlMatch should wait for url to match', () => {
        const actionPage: ActionsPage = new ActionsPage();
        actionPage.navigateTo();
        waitForUrlMatch(actionPage.urlRegex);
        expect(browser.getCurrentUrl()).toBe('http://localhost:49152/actions');
    });

    it('waitForWindowCount should wait for window window number increase and decrease', () => {
        const actionPage: ActionsPage = new ActionsPage();
        openUrlInNewTab(actionPage.url);
        waitForWindowCount(2);
        closeWindow(1);
        waitForWindowCount(1);
    });
});
