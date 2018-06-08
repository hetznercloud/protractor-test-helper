/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    getText,
    getElementAttributeValue,
} from '@hetznercloud/protractor-test-helper';
import { HelpersPage } from '../pages/helpers.po';

describe('async helpers', () => {
    const helpersPage: HelpersPage = new HelpersPage();

    beforeEach(async () => {
        await helpersPage.navigateTo();
    });

    it('getText should wait for an element and resolve to the text of an element', async () => {
        await expect(getText(helpersPage.getText)).toBe('A long text to get');
    });

    it('getAttribute should wait for an element and should resolve to the requested attribute', async () => {
        await expect(
            getElementAttributeValue(
                helpersPage.getAttributeContainer,
                'data-value'
            )
        ).toBe('test-value');
    });
});
