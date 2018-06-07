/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ElementFinder, Locator } from 'protractor';
import { getElementFinder } from './utils';
import AsyncCustomMatcher = jasmine.AsyncCustomMatcher;

export function installMatcher(): void {
    beforeEach(function(): void {
        jasmine.addMatchers({
            toBePresent(): AsyncCustomMatcher {
                return {
                    compare(actual: ElementFinder | Locator | string): any {
                        const e: ElementFinder = getElementFinder(actual);
                        let pass: boolean;

                        return {
                            pass: e
                                .isPresent()
                                .then((_pass: boolean) => (pass = _pass)),
                            get message(): string {
                                if (pass) {
                                    return `Expected ${e.locator()} not to be present`;
                                }
                                return `Expected ${e.locator()} to be present`;
                            },
                        };
                    },
                };
            },
            toBeDisplayed(): AsyncCustomMatcher {
                return {
                    // tslint:disable-next-line no-any
                    compare(actual: ElementFinder | Locator | string): any {
                        const e: ElementFinder = getElementFinder(actual);
                        let pass: boolean;

                        return {
                            pass: e
                                .isPresent()
                                .then((result: boolean) => {
                                    if (!result) {
                                        return result;
                                    }

                                    return e.isDisplayed();
                                })
                                .then(
                                    (_pass: boolean) => (pass = _pass),
                                    () => false
                                ),
                            get message(): string {
                                if (pass) {
                                    return `Expected ${e.locator()} not to be displayed`;
                                }
                                return `Expected ${e.locator()} to be displayed`;
                            },
                        };
                    },
                };
            },
        });
    });
}
