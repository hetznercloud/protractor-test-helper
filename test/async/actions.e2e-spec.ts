/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { ActionsPage } from '../pages/actions.po';
import {
    click,
    waitToBeDisplayed,
    hover,
    sendKeys,
    waitForTextToBe,
    getText,
    selectOption,
    selectOptionByIndex,
    selectOptionByText,
} from '@hetznercloud/protractor-test-helper';
import { element, by, browser } from 'protractor';

describe('async actions', () => {
    const actionsPage: ActionsPage = new ActionsPage();

    beforeEach(async () => {
        await actionsPage.navigateTo();
    });

    it('click should click on the button', async () => {
        await click(actionsPage.clickBtn);
        await waitToBeDisplayed(actionsPage.clickResult);

        await expect(actionsPage.clickResult.isDisplayed()).toBe(true);
    });

    it('hover should hover on the button', async () => {
        await hover(actionsPage.hoverBtn);
        await waitToBeDisplayed(actionsPage.hoverResult);

        await expect(actionsPage.hoverResult.isDisplayed()).toBe(true);
    });

    it('sendKeys should send keys to input the button', async () => {
        const text = 'keys to send';
        await sendKeys(actionsPage.sendKeysInput, text);
        await waitForTextToBe(actionsPage.inputResult, text);

        await expect(getText(actionsPage.inputResult)).toBe(text);
    });

    it('selectOption should select an option', async () => {
        const option = 'option2';
        await selectOption(
            actionsPage.select.element(
                by.cssContainingText(actionsPage.optionSelector, option)
            )
        );
        await waitForTextToBe(actionsPage.selectResult, option);
        await expect(getText(actionsPage.selectResult)).toBe(option);
    });

    it('selectOptionByIndex should select an option', async () => {
        const option = 'option2';
        await selectOptionByIndex(actionsPage.select, 1);
        await waitForTextToBe(actionsPage.selectResult, option);
        await expect(getText(actionsPage.selectResult)).toBe(option);
    });

    it('selectOptionByText should select an option', async () => {
        const option = 'option2';
        await selectOptionByText(actionsPage.select, option);
        await waitForTextToBe(actionsPage.selectResult, option);
        await expect(getText(actionsPage.selectResult)).toBe(option);
    });
});
