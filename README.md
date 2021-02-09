# About

This repository demonstrates how third party tools like Cypress, Puppeteer, and Browserstack can be used to implement visual regression testing.

## Frameworks

### Cypress Visual Regression

**About**

* This framework is combination of `cypress` framework and its like plugin `cypress-visual-regression`. 
* You can add a test inside cypress/integration 
* Diffs are created inside /snapshots/diff
* You can read more about this library on https://github.com/mjhea0/cypress-visual-regression


**Installation**

Go to directory and install dependencies

```bash
cd cypress-vis-reg
npm install
```

**How to use**

* Run cypress to capture baseline screenshot with command `npm run cypress:vr:base`
* Run cypress to run regression with command `npm run cypress:vr:actual`

### Browserstack

**About**

* This uses browserstack libraries to launch a device and run a test
* This uses `node-resemble-js` to match screenshots
* Captures screenshot and stores locally then compares with baseline
* Diffs are created inside /images/diff

**Installation**

Go to directory and install dependencies

```bash
cd browserstack
npm install
```

**How to use**

* Update username and password of browserstack in /specs/test.spec.js
* Run first time to capture baseline with command `npm run test`
* Run second time to compare with baseline


### Puppeteer

**About**

* This uses chrome headless browser puppeteer
* This uses `node-resemble-js` to match screenshots
* Captures screenshot and stores locally then compares with baseline
* Diffs are created inside /images/diff

**Installation**

Go to directory and install dependencies

```bash
cd headless
npm install
```

**How to use**

* Run first time to capture baseline with command `npm run test`
* Run second time to compare with baseline


# Contributors
* Amjad Ali (amjadali_bb@hotmail.com)