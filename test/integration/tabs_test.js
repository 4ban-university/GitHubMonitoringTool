"use strict";

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var until = webdriver.until;


test.describe('Tabs test', function() {
    this.timeout(100000);
    test.it('Should get uniq DOM from each tab', function() {
        var chromeCapabilities = webdriver.Capabilities.chrome();
        var chromeOptions = {'args': ['--start-maximized', '--incognito']};
        chromeCapabilities.set('chromeOptions', chromeOptions);
        var browser = new webdriver.Builder().usingServer().withCapabilities(chromeCapabilities).build();
        browser.manage().deleteAllCookies()
        browser.get('http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com/Integration/login.php');
        browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--raised mdl-button--colored")).click();
        browser.findElement(webdriver.By.name('login')).sendKeys('b8n');
        browser.findElement(webdriver.By.name('password')).sendKeys('qwertyuiop011010');
        browser.findElement(webdriver.By.name("commit")).click().then(function() {
            browser.sleep(4000);
            return browser.getCurrentUrl()
        }).then(function(current){
            if (current.includes('github.com/login/oauth/')){
                //console.log('Login need');
                browser.findElement(webdriver.By.name("authorize")).click()
            }else{
                return;
                //console.log('Logged');
            }
        });
        browser.findElement(webdriver.By.className("mdl-button mdl-js-button mdl-button--primary")).click().then(function() {
            //console.log('press repo button')
            browser.sleep(2000);
        });
        browser.findElement(webdriver.By.className("mdl-checkbox")).click()
        browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
            browser.sleep(2000);
        });
        browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
            browser.sleep(5000);
        });
        // click on general info tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[1]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="repo_name"]'))
        });
        // click on overall report tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[2]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="scroll-tab-2"]/div/div[1]/div[2]'))
        });
        // click on weekly report tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[3]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="report_weekly"]/div'))
        });
        // click on individual tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[4]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="report_individually"]/div[1]'))
        });
        // click on burndown tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[5]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="burndownChart"]'))
        });
        // click on comments tab
        browser.findElement(webdriver.By.xpath("/html/body/div/div/main/div/div/header/div/div[2]/a[6]")).click().then(function() {
            browser.sleep(500);
            browser.findElement(webdriver.By.xpath('//*[@id="commentSection"]'))
        });
        browser.quit()
    });
});
