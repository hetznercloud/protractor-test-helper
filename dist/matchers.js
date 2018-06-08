"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function installMatcher() {
    beforeEach(function () {
        jasmine.addMatchers({
            toBePresent: function () {
                return {
                    // tslint:disable-next-line no-any
                    compare: function (actual) {
                        var e = utils_1.getElementFinder(actual);
                        var pass;
                        return {
                            pass: e
                                .isPresent()
                                .then(function (_pass) { return (pass = _pass); }),
                            get message() {
                                if (pass) {
                                    return "Expected " + e.locator() + " not to be present";
                                }
                                return "Expected " + e.locator() + " to be present";
                            },
                        };
                    },
                };
            },
            toBeDisplayed: function () {
                return {
                    // tslint:disable-next-line no-any
                    compare: function (actual) {
                        var e = utils_1.getElementFinder(actual);
                        var pass;
                        return {
                            pass: e
                                .isPresent()
                                .then(function (result) {
                                if (!result) {
                                    return result;
                                }
                                return e.isDisplayed();
                            })
                                .then(function (_pass) { return (pass = _pass); }, function () { return false; }),
                            get message() {
                                if (pass) {
                                    return "Expected " + e.locator() + " not to be displayed";
                                }
                                return "Expected " + e.locator() + " to be displayed";
                            },
                        };
                    },
                };
            },
        });
    });
}
exports.installMatcher = installMatcher;
