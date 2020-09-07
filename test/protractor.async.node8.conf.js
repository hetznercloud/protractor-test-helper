/**
 * Copyright (c) 2018 Hetzner Cloud GmbH
 *
 * SPDX-License-Identifier: MIT
 */
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./async/**/*.e2e-spec.ts'],
    capabilities: {
        browserName: 'chrome',
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {},
    },
    SELENIUM_PROMISE_MANAGER: false,
    onPrepare() {
        require('ts-node').register({
            project: 'test/tsconfig.e2e.json',
        });
        require('@hetznercloud/protractor-test-helper/').installMatcher();
        jasmine
            .getEnv()
            .addReporter(
                new SpecReporter({ spec: { displayStacktrace: true } })
            );
    },
};
