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

describe('flow actions', () => {
    const actionsPage: ActionsPage = new ActionsPage();

    beforeEach(() => {
        actionsPage.navigateTo();
    });

    it('click should click on the button', () => {
        click(actionsPage.clickBtn);
        waitToBeDisplayed(actionsPage.clickResult);

        expect(actionsPage.clickResult.isDisplayed()).toBe(true);
    });

    it('hover should hover on the button', () => {
        hover(actionsPage.hoverBtn);
        waitToBeDisplayed(actionsPage.hoverResult);

        expect(actionsPage.hoverResult.isDisplayed()).toBe(true);
    });

    it('sendKeys should send keys to input the button', () => {
        const text = 'keys to send';
        sendKeys(actionsPage.sendKeysInput, text);
        waitForTextToBe(actionsPage.inputResult, text);

        expect(getText(actionsPage.inputResult)).toBe(text);
    });

    it('selectOption should select an option', () => {
        const option = 'option2';
        selectOption(
            actionsPage.select.element(
                by.cssContainingText(actionsPage.optionSelector, option)
            )
        );
        waitForTextToBe(actionsPage.selectResult, option);
        expect(getText(actionsPage.selectResult)).toBe(option);
    });

    it('selectOptionByIndex should select an option', () => {
        const option = 'option2';
        selectOptionByIndex(actionsPage.select, 1);
        waitForTextToBe(actionsPage.selectResult, option);
        expect(getText(actionsPage.selectResult)).toBe(option);
    });

    it('selectOptionByText should select an option', () => {
        const option = 'option2';
        selectOptionByText(actionsPage.select, option);
        waitForTextToBe(actionsPage.selectResult, option);
        expect(getText(actionsPage.selectResult)).toBe(option);
    });
});
