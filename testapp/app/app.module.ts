/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ActionsComponent } from './actions/actions.component';
import { CommonModule } from '@angular/common';
import { WaitsComponent } from './waits/waits.component';
import { HelperComponent } from './helper/helper.component';

@NgModule({
    declarations: [
        AppComponent,
        ActionsComponent,
        WaitsComponent,
        HelperComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
