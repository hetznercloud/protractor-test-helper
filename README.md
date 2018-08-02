# Protractor Test Helper

[![Build Status](https://travis-ci.com/hetznercloud/protractor-test-helper.svg?branch=master)](https://travis-ci.com/hetznercloud/protractor-test-helper)
[![Greenkeeper badge](https://badges.greenkeeper.io/hetznercloud/protractor-test-helper.svg)](https://greenkeeper.io/)

This library provides functions which help to create robust and reliable end-to-end tests with protractor
and reduces the pain of end-to-end tests to a minimum.
All provided action helpers perform checks that the element is in the correct state before the actual task is performed.

**Features**

* Robust actions like `click`, `sendKeys` or `hover` which wait for their elements before the action is performed
* Lots of `waitfor…` functions to avoid `sleep`
* Helper to open and close windows, tabs, popups, etc
* Utilities like the `flowLog` function, which logs exactly in the moment when it is expected to log: when the previous web driver action was performed, and not when the `it` block is called.
* Most of the actions have a retry logic inside, which retries the action 3 (or configurable number of) times before an error is thrown
* Custom matcher like `.toBePresent()` or `toBeDisplayed()`; 
* Provides better error messages with more details
* All functions which interact with elements accept either `ElementFinder`, `Locator` or `string` as target parameter
* Ready for tests written with [`async` / `await`](https://github.com/angular/protractor/blob/master/docs/async-await.md) (every function returns a promise)
* Definition files are included for `TypeScript`

## Table of Contents
* [Example usage](#example)
* [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Matchers](#matchers)
* [API](#api)

<a id="example"></a>
## Example usage
```javascript
const { click, waitForTextToBe, sendKeys, getText } = require('protractor-test-helper');

describe('readme example', () => {
    // Simple example - better would be a Page Object
    const firstNumber = element(by.model('first'));
    const secondNumber = element(by.model('second'));
    const goButton = element(by.id('gobutton'));
    const latestResult = element(by.binding('latest'));

    beforeEach(() => {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should add one and two', () => {
        sendKeys(firstNumber, '1');
        sendKeys(secondNumber, '2');
        click(goButton);

        waitForTextToBe(latestResult, '3');
        expect(getText(latestResult), '3');
    });
});
```

For more examples please have a look into the `test` folder.

<a id="installation"></a>
## Installation
```bash
npm install @hetznercloud/protractor-test-helper --save-dev
```

or

```bash
yarn add @hetznercloud/protractor-test-helper -D
```

To use the matcher you have to call the install function in your `protractor.config`:

```js
exports.config = {
    onPrepare() {
        //...
        require('@hetznercloud/protractor-test-helper/').installMatcher();
    },
};
```

<a id="contributing"></a>
## Contributing
Pull requests are warmly welcome. Minor fixes will be merged as soon as possible.
Please ask before you make any significant changes (e.g. implementing new features, refactoring code, etc), 
otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

### Tests
Tests can be started with:

```bash
yarn test
```

After adding new functionality please add new test cases as well. The test app is located under `testapp/` and consists of a simple `Angular` application. 
You can simply start it with `yarn start`.

### Code Style
Please respect the linting rules and run `yarn pretty:write` after applying changes to the code. 
Prettier is an "opinionated code formatter". More information [about prettier](https://prettier.io/).

### Docs
The readme and docs are autogenerated. After adding or updating functions please run

```bash
yarn readme:update
```

The first part of the readme is stored under `_docs/README.base.md`.
Please do not make changes directly in the `README.md` file.

<a id="license"></a>
## License
MIT license

<a id="matchers"></a>

## Matchers
```js
expect(ElementFinder | Locator | string).toBeDisplayed();
expect(ElementFinder | Locator | string).toBePresent();
```

<a id="api"></a>
## API
### Actions 

<a id="click"></a>

####  click

▸ **click**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*, tryCount?: *`number`*): `Promise`<`void`>

Waits for an element to be displayed and clickable, and click on it. If the click fails, `tryCount` retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |
| `Default value` tryCount | `number` |  DEFAULT_RETRIES |  Retry counter for the recursion |

**Returns:** `Promise`<`void`>

___
<a id="hover"></a>

####  hover

▸ **hover**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`void`>

Waits for an element to be displayed and positions the pointer inside that element.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |

**Returns:** `Promise`<`void`>

___
<a id="selectoption"></a>

####  selectOption

▸ **selectOption**(option: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`void`>

Select an `<option>`. If the selection fails, 3 retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| option |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target <option> element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |

**Returns:** `Promise`<`void`>

___
<a id="selectoptionbyindex"></a>

####  selectOptionByIndex

▸ **selectOptionByIndex**(select: * `ElementFinder` &#124; `Locator` &#124; `string`*, index: *`number`*, timeout?: *`number`*): `Promise`<`void`>

Select an `<option>` ancestor of a particular `<select>` element by its index. All options are collected by `tagName === 'option'`, skipping `<optgroup>` or similar elements. After that the index is selected. If the selection fails, 3 retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| select |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Parent <select> element |
| index | `number` | - |  Index of the option which should be selected |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |

**Returns:** `Promise`<`void`>

___
<a id="selectoptionbytext"></a>

####  selectOptionByText

▸ **selectOptionByText**(select: * `ElementFinder` &#124; `Locator` &#124; `string`*, text: *`string`*, timeout?: *`number`*): `Promise`<`void`>

Select an `<option>` ancestor of a particular `<select>` element by its content. The option is identified by Protractor's `cssContainingText` (partial match: `selectOptionByText('bar')` matches `<option>foobar</option>` too). If the selection fails, 3 retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| select |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Parent <select> element |
| text | `string` | - |  Text of the option which should be selected |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |

**Returns:** `Promise`<`void`>

___
<a id="sendkeys"></a>

####  sendKeys

▸ **sendKeys**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, value: *`string`*, timeout?: *`number`*, tryCount?: *`number`*): `Promise`<`void`>

Wait for an `<input>` element to be displayed, then clear its content, and perform key strokes for the passed value. If sendKeys fails, `tryCount` retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| value | `string` | - |  Input value which should be sent as key inputs |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |
| `Default value` tryCount | `number` |  DEFAULT_RETRIES |  Retry counter for the recursion |

**Returns:** `Promise`<`void`>

___

### Waits 

<a id="waitforattributematch"></a>

####  waitForAttributeMatch

▸ **waitForAttributeMatch**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, attr: *`string`*, value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's attribute value to match a regular expression.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| attr | `string` | - |  Attribute name |
| value | `RegExp` | - |  RegExp which the attribute's value should match |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforattributetobe"></a>

####  waitForAttributeToBe

▸ **waitForAttributeToBe**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, attr: *`string`*, value: *`string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's attribute to have the given value.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| attr | `string` | - |  Attribute name |
| value | `string` | - |  Value which the attribute should have |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforelementcounttobe"></a>

####  waitForElementCountToBe

▸ **waitForElementCountToBe**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to the expected number of elements. Useful e.g. to verify that the expected number of items have been added to a list.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementArrayFinder` &#124; `Locator` &#124; `string`| - |  Target selector or ElementArryFinder |
| expected | `number` | - |  Number of the expected elements |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforelementcounttobegreaterthan"></a>

####  waitForElementCountToBeGreaterThan

▸ **waitForElementCountToBeGreaterThan**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to more than the expected count of elements. Useful e.g. to verify that at least some number of items have been added to a list.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementArrayFinder` &#124; `Locator` &#124; `string`| - |  Target selector or ElementArrayFinder |
| expected | `number` | - |  Expected number of elements |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforelementcounttobelessthan"></a>

####  waitForElementCountToBeLessThan

▸ **waitForElementCountToBeLessThan**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to less than the expected count of elements. Useful e.g. to verify that at least some elements have been removed from a list.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementArrayFinder` &#124; `Locator` &#124; `string`| - |  Target selector or ElementArrayFinder |
| expected | `number` | - |  Should be less than the expected number of elements |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitfortextmatch"></a>

####  waitForTextMatch

▸ **waitForTextMatch**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's text content to match a regular expression.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  - |
| value | `RegExp` | - |  The RegExp which the content of the target should match |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitfortexttobe"></a>

####  waitForTextToBe

▸ **waitForTextToBe**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, value: *`string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's text content to equal the given value.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| value | `string` | - |  The string we are waiting for |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforurlmatch"></a>

####  waitForUrlMatch

▸ **waitForUrlMatch**(value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for the browser's URL to match a regular expression.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| value | `RegExp` | - |  RegExp which the URL should match |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waitforwindowcount"></a>

####  waitForWindowCount

▸ **waitForWindowCount**(count: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits for a window count. Useful e.g. for confirming that a popup window was opened.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| count | `number` | - |  Expected number of windows |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waittobedisplayed"></a>

####  waitToBeDisplayed

▸ **waitToBeDisplayed**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be displayed. Displayed means that it is part of the DOM **and** visible.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  - |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waittobenotdisplayed"></a>

####  waitToBeNotDisplayed

▸ **waitToBeNotDisplayed**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be not displayed. An element which is not displayed could still be part of the DOM, but is hidden by a css rule.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waittobenotpresent"></a>

####  waitToBeNotPresent

▸ **waitToBeNotPresent**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element not to be present. Not present means that this element does not exist in the DOM.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  - |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___
<a id="waittobepresent"></a>

####  waitToBePresent

▸ **waitToBePresent**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be present. Present means the element is part of the DOM, but still might be hidden by CSS rules.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds |

**Returns:** `Promise`<`boolean`>

___

### Helper 

<a id="getelementattributevalue"></a>

####  getElementAttributeValue

▸ **getElementAttributeValue**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, attr: *`string`*, timeout?: *`number`*): `Promise`<`string`>

Waits for the element to be present, and resolves to the attribute's value.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| attr | `string` | - |  Attribute name to look for |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |

**Returns:** `Promise`<`string`>

___
<a id="gettext"></a>

####  getText

▸ **getText**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*, timeout?: *`number`*, tryCount?: *`number`*): `Promise`<`string`>

Wait for an element to be displayed, and resolves to the text in that element. If `getText` fails, `tryCount` retries are performed.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`| - |  Target element |
| `Default value` timeout | `number` |  DEFAULT_TIMEOUT |  Timeout in milliseconds to wait for the target |
| `Default value` tryCount | `number` |  DEFAULT_RETRIES |  Retry counter for the recursion |

**Returns:** `Promise`<`string`>

___
<a id="getwindowhandlescount"></a>

####  getWindowHandlesCount

▸ **getWindowHandlesCount**(): `Promise`<`number`>

Resolves to the current window count. Windows includes windows, tabs, etc.

**Returns:** `Promise`<`number`>

___

### Window 

<a id="closewindow"></a>

####  closeWindow

▸ **closeWindow**(index?: *`number`*): `Promise`<`void`>

Closes a browser window, popup, or tab identified by its zero-based index. If two windows are open and the second window is to be closed, the index should be 1.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` index | `number` | 0 |  The index of the Window |

**Returns:** `Promise`<`void`>

___
<a id="openurlinnewtab"></a>

####  openUrlInNewTab

▸ **openUrlInNewTab**(url: *`string`*): `Promise`<`boolean`>

Opens the passed URL in a new tab.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| url | `string` |  The URL to be opened in the window or tab |

**Returns:** `Promise`<`boolean`>

___
<a id="scrollbottom"></a>

####  scrollBottom

▸ **scrollBottom**(): `Promise`<`void`>

Scrolls to the bottom of the window.

**Returns:** `Promise`<`void`>

___
<a id="scrolltop"></a>

####  scrollTop

▸ **scrollTop**(): `Promise`<`void`>

Scrolls to the top of the window.

**Returns:** `Promise`<`void`>

___

### Utils 

<a id="flowlog"></a>

####  flowLog

▸ **flowLog**(message: *`string`*): `Promise`<`void`>

Logs a message in the flow of protractor. This means that the log message appears in the correct order as the actions and tests are performed, and not like regular log output at the test initialization.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| message | `string` |  Text to be logged to the console in the control flow |

**Returns:** `Promise`<`void`>

___
<a id="getelementarrayfinder"></a>

####  getElementArrayFinder

▸ **getElementArrayFinder**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*): `ElementArrayFinder`

Constructs an ElementArrayFinder from various target types.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target |  `ElementArrayFinder` &#124; `Locator` &#124; `string`|  Target element |

**Returns:** `ElementArrayFinder`

___
<a id="getelementfinder"></a>

####  getElementFinder

▸ **getElementFinder**(target: * `ElementFinder` &#124; `Locator` &#124; `string`*): `ElementFinder`

Constructs an ElementFinder from various target types.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| target |  `ElementFinder` &#124; `Locator` &#124; `string`|  Target element |

**Returns:** `ElementFinder`

___
<a id="log"></a>

####  log

▸ **log**(message: *`string`*, ignoreDebug?: *`boolean`*): `void`

Logs a message to the console if debugging is enabled.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| message | `string` | - |  Text to be logged to the console |
| `Default value` ignoreDebug | `boolean` | false |  Force log message to be logged, regardless of debug settings |

**Returns:** `void`

___
<a id="refresh"></a>

####  refresh

▸ **refresh**(reason: *`string`*): `Promise`<`void`>

Performs a page reload and displays a message in the flow log why the reload was necessary.
*__see__*: flowLog

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| reason | `string` |  Text to be logged to the flow log |

**Returns:** `Promise`<`void`>

___
<a id="sleep"></a>

####  sleep

▸ **sleep**(time: *`number`*, message?: *`string`*): `Promise`<`void`>

Performs a browser sleep. Normally it should be avoided because of its performance impact, and replaced by one of the `waitTo…` functions wherever possible. If `sleep` is still necessary, a reason can be displayed in the flow log.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| time | `number` |  Time in milliseconds to sleep |
| `Optional` message | `string` |  Text which explains why the sleep was necessary |

**Returns:** `Promise`<`void`>

___


