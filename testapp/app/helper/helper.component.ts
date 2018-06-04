/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-helper',
    templateUrl: './helper.component.html',
})
export class HelperComponent implements OnInit {
    showGetText = false;
    showGetAttribute = false;
    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.showGetText = true;
            this.showGetAttribute = true;
        }, 1500);
    }
}
