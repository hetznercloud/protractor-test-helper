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

describe('flow protractor-test-helper matcher', () => {
    const waitsPage: WaitsPage = new WaitsPage();

    beforeEach(() => {
        waitsPage.navigateTo();
    });

    describe('toBeDisplayed', () => {
        it('should expect css selector string not to be present', () => {
            expect('.xe2easdfee').not.toBeDisplayed();
        });

        it('should expect element not to be displayed', () => {
            waitToBeNotDisplayed(waitsPage.waitToBeNotDisplayed);
            expect(waitsPage.waitToBeNotDisplayed).not.toBeDisplayed();
        });

        it('should expect element not to be when it is only present', () => {
            waitToBePresent(waitsPage.waitToBePresent);
            expect(waitsPage.waitToBePresent).not.toBeDisplayed();
        });

        it('should expect element to be displayed', () => {
            waitToBeDisplayed(waitsPage.waitToBeDisplayed);
            expect(waitsPage.waitToBeDisplayed).toBeDisplayed();
        });
    });

    describe('toBePresent', () => {
        it('should expect css selector string not to be present', () => {
            expect('.xe2easdfee').not.toBePresent();
        });

        it('should expect element not to be present', () => {
            waitToBeNotDisplayed(waitsPage.waitToBeNotPresent);
            expect(waitsPage.waitToBeNotPresent).not.toBePresent();
        });

        it('should expect element to be displayed', () => {
            waitToBeDisplayed(waitsPage.waitToBeDisplayed);
            expect(waitsPage.waitToBeDisplayed).toBePresent();
        });

        it('should expect element to be present', () => {
            waitToBePresent(waitsPage.waitToBePresent);
            expect(waitsPage.waitToBePresent).toBePresent();
        });
    });
});
