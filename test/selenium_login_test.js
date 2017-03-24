"use strict";

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');

test.describe('Selenium login', function() {
    test.describe('Correct login', function() {
        this.timeout(15000);
        test.it('should return "Authorize application" when the test passed', function() {
            var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
            browser.get('http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com/Integration/login.php');
            browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--raised mdl-button--colored")).click();
            browser.findElement(webdriver.By.name('login')).sendKeys('b8n');
            browser.findElement(webdriver.By.name('password')).sendKeys('qwertyuiop011010');
            browser.findElement(webdriver.By.name("commit")).click().then(function() {
                browser.sleep(3000);
            });
            var value = browser.findElement(webdriver.By.name('authorize'))
            value.getText().then(function(value) {
                assert.equal(value, 'Authorize application');
            });
            browser.quit()
        });
    });
    test.describe('Incorrect login', function() {
        this.timeout(15000);
        test.it('should return "true" when the password is incorrect', function() {
            var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
            browser.get('http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com/Integration/login.php');
            browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--raised mdl-button--colored")).click();
            browser.findElement(webdriver.By.name('login')).sendKeys('b8n');
            browser.findElement(webdriver.By.name('password')).sendKeys('incorrectPassword');
            browser.findElement(webdriver.By.name("commit")).click().then(function() {
                browser.sleep(500);
                if(browser.findElement(webdriver.By.className('flash flash-full flash-error')).isDisplayed() ){
                    assert.equal(true, true);
                }else{
                    assert.equal(false, true);
                };
            });
            browser.quit()
        });
    });
});
