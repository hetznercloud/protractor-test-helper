/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-waits',
    templateUrl: './waits.component.html',
})
export class WaitsComponent implements OnInit {
    attrMatchValue = 'noMatch';
    greaterItems: string[] = ['value 1', 'value 2'];
    lessItems: string[] = ['value 1', 'value 2', 'value 3'];
    showWaitToBeDisplayed = false;
    hideWaitToBeNotDisplayed = false;
    showWaitToBeNotPresent = true;
    textToMatch = 'noMatch';

    constructor() {}

    ngOnInit() {
        const timeout = 1500;

        setTimeout(() => {
            this.attrMatchValue = 'match';
        }, timeout);

        setTimeout(() => {
            this.greaterItems.push('value 3');
        }, timeout);

        setTimeout(() => {
            this.lessItems.pop();
        }, timeout);

        setTimeout(() => {
            this.textToMatch = 'match';
        }, timeout);

        setTimeout(() => {
            this.showWaitToBeDisplayed = true;
        }, timeout);

        setTimeout(() => {
            this.hideWaitToBeNotDisplayed = true;
        }, timeout);

        setTimeout(() => {
            this.showWaitToBeNotPresent = false;
        }, timeout);
    }
}
