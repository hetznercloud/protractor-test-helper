/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */

declare namespace jasmine {
    interface Matchers<T> {
        /**
         * Assert that an element is present,
         * which means it has to be in the DOM
         */
        toBePresent(): Promise<void>;

        /**
         * Assert that an element is displayed,
         * which means that is has to be in the DOM
         * and is not hidden e.g. by an css rule
         */
        toBeDisplayed(): Promise<void>;
    }
}
