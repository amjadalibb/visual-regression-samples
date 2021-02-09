var webdriver = require('selenium-webdriver');
const resemble = require('node-resemble-js');
const fse = require('fs-extra');

var userName = "XXXX";
var accessKey = "XXXX"
var browserstackURL = 'https://' +  userName + ':' + accessKey + '@hub-cloud.browserstack.com/wd/hub';
const screenFile = './images/screen/facebook.png';
const refFile = './images/reference/facebook.png';
const diffFile = './images/diff/facebook.png';

var capabilities = {
  'os' : 'Windows',
  'os_version' : '10',
  'browserName' : 'Chrome',
  'browser_version' : '80',
  'name' : "amjadali9's First Test"
}

const runTest = function() { 
	var driver = new webdriver.Builder().
	usingServer(browserstackURL).
	withCapabilities(capabilities).
	build();
	driver.get('http://www.facebook.com')
	.then(function(){
		downloadScreenshot(driver)
		.then(compareScreenshots)
		.then(stopDriver);
	})
}

runTest();

const downloadScreenshot = (driver) =>
  new Promise((resolve, reject) => {
    driver.takeScreenshot().then(
        data => {
			fse.remove(screenFile, err => {
				if (!err) {
					var stream = fse.createWriteStream(screenFile);
					stream.write(new Buffer(data, 'base64'));
					stream.end(() => {
						if(!fse.existsSync(refFile)) {
							console.log('Screenshot Downloaded Successfully in Reference');
							fse.copySync(screenFile, refFile);
						}
						return resolve(driver);
					});
				} else 
					return reject(err);
			}
        );
    },
    err => {
        return reject(err);
    })
  });

const compareScreenshots = (driver) =>
  new Promise((resolve) => {
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
					return resolve(driver);
				}
			});
		});
  });
  
const stopDriver = (driver) =>
new Promise(async (resolve, reject) => {
	await driver.quit();
	return resolve(driver);
});
