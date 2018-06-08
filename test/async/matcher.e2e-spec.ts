/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    waitToBeDisplayed,
    waitToBePresent,
    waitToBeNotDisplayed,
    waitToBeNotPresent,
} from 'protractor-test-helper';
import { WaitsPage } from '../pages/waits.po';
import { ActionsPage } from '../pages/actions.po';
import { browser } from 'protractor';

describe('async protractor-test-helper matcher', () => {
    const waitsPage: WaitsPage = new WaitsPage();

    beforeEach(async () => {
        await waitsPage.navigateTo();
    });

    describe('toBeDisplayed', () => {
        it('should expect css selector string not to be present', async () => {
            await expect('.xe2easdfee').not.toBeDisplayed();
        });

        it('should expect element not to be displayed', async () => {
            await waitToBeNotDisplayed(waitsPage.waitToBeNotDisplayed);
            await expect(waitsPage.waitToBeNotDisplayed).not.toBeDisplayed();
        });

        it('should expect element not to be displayed when it is only present', async () => {
            await waitToBePresent(waitsPage.waitToBePresent);
            await expect(waitsPage.waitToBePresent).not.toBeDisplayed();
        });

        it('should expect element to be displayed', async () => {
            await waitToBeDisplayed(waitsPage.waitToBeDisplayed);
            await expect(waitsPage.waitToBeDisplayed).toBeDisplayed();
        });
    });

    describe('toBePresent', () => {
        it('should expect css selector string not to be present', async () => {
            await expect('.xe2easdfee').not.toBePresent();
        });

        it('should expect element not to be present', async () => {
            await waitToBeNotDisplayed(waitsPage.waitToBeNotPresent);
            await expect(waitsPage.waitToBeNotPresent).not.toBePresent();
        });

        it('should expect element to be present when it is displayed', async () => {
            await waitToBeDisplayed(waitsPage.waitToBeDisplayed);
            await expect(waitsPage.waitToBeDisplayed).toBePresent();
        });

        it('should expect element to be present', async () => {
            await waitToBePresent(waitsPage.waitToBePresent);
            await expect(waitsPage.waitToBePresent).toBePresent();
        });
    });
});
