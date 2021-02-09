const puppeteer = require('puppeteer');
const resemble = require('node-resemble-js');
const fse = require('fs-extra');

(async () => {
    let browser = await puppeteer.launch();
    const page = await browser.newPage();

    const screenFile = './images/screen/google.png';
    const refFile = './images/reference/google.png';
    const diffFile = './images/diff/google.png';

    await page.goto('http://www.google.com');

    await page.screenshot({type: 'png',path: screenFile,fullPage: true});

    if(!fse.existsSync(refFile)) {
        fse.copySync(screenFile, refFile)
    } else {
        resemble(screenFile)
        .compareTo(refFile)
        .onComplete(data => {
            console.log('Actual mismatchPercentage: ' + data.misMatchPercentage );
            fse.remove(diffFile, err => {
                if (!err) {
                    if (Number(data.misMatchPercentage) <= 0.1) {
                        console.log('Images Matched !');
                    } else {
                        const buffer = data.getDiffImageAsJPEG(20);
                        fse.writeFileSync(diffFile, buffer, null);
                        console.log('Creating diff : ' + diffFile);
                    }
                }
            });
        });
    }
    await browser.close();
})();
