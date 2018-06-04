/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
})
export class ActionsComponent implements OnInit {
    showClickButton = false;
    showHoverButton = false;
    showSendKeysInput = false;
    showSelect = false;

    inputModel: string;

    hasBeenClicked = false;
    hasBeenHovered = false;

    selectOptions: string[] = ['option1', 'option2', 'option3'];
    selectedOption: string;

    constructor() {}

    ngOnInit() {
        const timeout = 1500;

        setTimeout(() => {
            this.showClickButton = true;
            this.showHoverButton = true;
            this.showSendKeysInput = true;
            this.showSelect = true;
        }, timeout);
    }
}
