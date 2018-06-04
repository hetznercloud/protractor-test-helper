/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { WaitsComponent } from './waits/waits.component';
import { HelperComponent } from './helper/helper.component';

const routes: Routes = [
    {
        path: 'actions',
        component: ActionsComponent,
    },
    {
        path: 'waits',
        component: WaitsComponent,
    },
    {
        path: 'helpers',
        component: HelperComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
