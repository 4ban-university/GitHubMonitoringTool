"use strict";

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

test.describe('Get repositories', function() {
    this.timeout(15000);
    test.it('should return "at least one label" when the test passed', function() {
        var chromeCapabilities = webdriver.Capabilities.chrome();
        var chromeOptions = {'args': ['--test-type', '--incognito']};
        chromeCapabilities.set('chromeOptions', chromeOptions);
        var browser = new webdriver.Builder().usingServer().withCapabilities(chromeCapabilities).build();
        browser.manage().deleteAllCookies()

        browser.get('http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com/Integration/login.php');
        browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--raised mdl-button--colored")).click();
        browser.findElement(webdriver.By.name('login')).sendKeys('b8n');
        browser.findElement(webdriver.By.name('password')).sendKeys('qwertyuiop011010');
        browser.findElement(webdriver.By.name("commit")).click().then(function() {
            browser.sleep(3000);
            return browser.getCurrentUrl()
        }).then(function(current){
            if (current.includes('github.com/login/oauth/')){
                console.log('Login need');
                browser.findElement(webdriver.By.name("authorize")).click()
            }else{
                console.log('Logged');
            }
        });
        browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--primary")).click().then(function() {
            browser.sleep(1000);
        });
        browser.findElement(webdriver.By.className("mdl-checkbox")).click()
        browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
            browser.sleep(500);
            if(browser.findElement(webdriver.By.className('mdl-navigation__link')).isDisplayed() ){
                assert.equal(true, true);
            }else{
                assert.equal(false, true);
            };
        });
        browser.quit()
    });
});





// var value = browser.findElement(webdriver.By.name('authorize'))
//         value.getText().then(function(value) {
//             assert.equal(value, 'Authorize application');
//         });

// test.describe('Incorrect login', function() {
//         this.timeout(15000);
//         test.it('should return "true" when the password is incorrect', function() {
//             var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
//             browser.get('http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com/Integration/login.php');
//             browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--raised mdl-button--colored")).click();
//             browser.findElement(webdriver.By.name('login')).sendKeys('b8n');
//             browser.findElement(webdriver.By.name('password')).sendKeys('incorrectPassword');
//             browser.findElement(webdriver.By.name("commit")).click().then(function() {
//                 browser.sleep(500);
//                 if(browser.findElement(webdriver.By.className('flash flash-full flash-error')).isDisplayed() ){
//                     assert.equal(true, true);
//                 }else{
//                     assert.equal(false, true);
//                 };
//             });
//             browser.quit()
//         });
//     });




 // if(browser.findElement(webdriver.By.className('oauth-review-permissions')).isDisplayed() ){
 //                console.log('need to authorize')
 //                browser.findElement(webdriver.By.name("authorize")).click()
 //                browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--primary")).click().then(function(){
 //                    if(browser.findElement(webdriver.By.className('mdl-checkbox__label')).isDisplayed() ){
 //                        assert.equal(true, true);
 //                    }else{
 //                        assert.equal(false, true);
 //                    };
 //                });
 //                browser.quit()
 //            }else{
 //                console.log('no need to auth')
 //                browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--primary")).click().then(function(){
 //                    if(browser.findElement(webdriver.By.className('mdl-checkbox__label')).isDisplayed() ){
 //                        assert.equal(true, true);
 //                    }else{
 //                        assert.equal(false, true);
 //                    };
 //                });
 //                browser.quit()
 //            };
