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
    getWindowHandlesCount,
    getElementAttributeValue,
} from 'protractor-test-helper';
import { WaitsPage } from '../pages/waits.po';
import { ActionsPage } from '../pages/actions.po';
import { browser } from 'protractor';

describe('async protractor-test-helper waits', () => {
    const waitsPage: WaitsPage = new WaitsPage();

    beforeEach(async () => {
        await waitsPage.navigateTo();
    });

    it('waitForAttributeMatch should wait until an element has a attribute test which values matches /match/', async () => {
        const attr = 'test';
        await waitForAttributeMatch(waitsPage.waitForAttribute, attr, /match/);

        await expect(
            getElementAttributeValue(waitsPage.waitForAttribute, attr)
        ).toBe('match');
    });

    it('waitForAttributeToBe should wait until an element has a attribute test with the value match', async () => {
        const attr = 'test';
        await waitForAttributeToBe(waitsPage.waitForAttribute, attr, 'match');

        await expect(
            getElementAttributeValue(waitsPage.waitForAttribute, attr)
        ).toBe('match');
    });

    it('waitForElementcountToBe should wait until a list has 3 items', async () => {
        await waitForElementCountToBe(waitsPage.waitForElementCount, 3);

        await expect(waitsPage.waitForElementCount.count()).toBe(3);
    });

    it('waitForElementCountToBeGreaterThan should wait for until a list has more thatn 2 items', async () => {
        await waitForElementCountToBeGreaterThan(
            waitsPage.waitForElementCount,
            2
        );

        await expect(waitsPage.waitForElementCount.count()).toBe(3);
    });

    it('waitForElementCountToBeLessThan should wait until a list has less than 3 items', async () => {
        await waitForElementCountToBeLessThan(
            waitsPage.waitForElementCountToBeLess,
            3
        );

        await expect(waitsPage.waitForElementCountToBeLess.count()).toBe(2);
    });

    it('waitForTextMatch should wait that an element text matches an regex', async () => {
        await waitForTextMatch(waitsPage.waitForText, /match/);

        await expect(waitsPage.waitForText.getText()).toBe('match');
    });

    it('waitForTextToBe should wait for an element to contain a text', async () => {
        await waitForTextToBe(waitsPage.waitForText, 'match');

        await expect(waitsPage.waitForText.getText()).toBe('match');
    });

    it('waitToBeDisplayed should wait for an element to be displayed', async () => {
        await waitToBeDisplayed(waitsPage.waitToBeDisplayed);

        await expect(waitsPage.waitToBeDisplayed.isDisplayed()).toBe(true);
    });

    it('waitToBePresent should wait for an element to be present', async () => {
        await waitToBePresent(waitsPage.waitToBePresent);

        await expect(waitsPage.waitToBePresent.isPresent()).toBe(true);
    });

    it('waitToBeNotDisplayed should wait for an element not to be displayed', async () => {
        await waitToBeNotDisplayed(waitsPage.waitToBeNotDisplayed);

        await expect(waitsPage.waitToBeNotDisplayed.isDisplayed()).toBe(false);
    });

    it('waitToBeNotPresent should wait for an element not to be present', async () => {
        await waitToBePresent(waitsPage.waitToBePresent);

        await expect(waitsPage.waitToBeNotPresent.isPresent()).toBe(false);
    });

    it('waitForUrlMatch should wait for url to match', async () => {
        const actionPage: ActionsPage = new ActionsPage();
        await actionPage.navigateTo();
        await waitForUrlMatch(actionPage.urlRegex);
        await expect(browser.getCurrentUrl()).toBe(
            'http://localhost:49152/actions'
        );
    });

    it('waitForWindowCount should wait for window window number increase and decrease', async () => {
        const actionPage: ActionsPage = new ActionsPage();
        await openUrlInNewTab(actionPage.url);
        await waitForWindowCount(2);

        await expect(getWindowHandlesCount()).toBe(2);

        await closeWindow(1);
        await waitForWindowCount(1);

        await expect(getWindowHandlesCount()).toBe(1);
    });
});
