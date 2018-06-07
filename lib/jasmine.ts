/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */

declare namespace jasmine {
    interface Matchers<T> {
        toBePresent(): boolean;
        toBeDisplayed(): boolean;
    }
}
