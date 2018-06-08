/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import {
    getText,
    getElementAttributeValue,
    flowLog,
} from '@hetznercloud/protractor-test-helper';
import { HelpersPage } from '../pages/helpers.po';
import { browser } from 'protractor';

describe('flow helpers', () => {
    const helpersPage: HelpersPage = new HelpersPage();

    beforeEach(() => {
        helpersPage.navigateTo();
    });

    it('getText should wait for an element and resolve to the text of an element', () => {
        expect(getText(helpersPage.getText)).toBe('A long text to get');
    });

    it('getAttribute should wait for an element and should resolve to the requested attribute', () => {
        expect(
            getElementAttributeValue(
                helpersPage.getAttributeContainer,
                'data-value'
            )
        ).toBe('test-value');
    });
});
