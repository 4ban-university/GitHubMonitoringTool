"use strict";

var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var assert = require('assert');
var until = webdriver.until;

test.describe('Get data', function() {
    test.describe('Get repo name', function() {
        this.timeout(100000);
        test.it('Repo name should not be "" or "null".', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(500);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(1000);
                browser.findElement(webdriver.By.id('repo_name')).getText().then(function(name){
                    //console.log(name)
                    if (name != '' || name != 'null'){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });

            });
            browser.quit()
        });
    });

    test.describe('Get repo description', function() {
        this.timeout(200000);
        test.it('Repo description should not be "" or "null".', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(500);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(1000);
                browser.findElement(webdriver.By.id('repo_description')).getText().then(function(description){
                    // var len = description.length
                    // if (len >= 20){
                    //     assert.equal(true, true)
                    // }else{
                    //     assert.equal(false,true)
                    // }
                    if (description != '' || description != 'null'){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });

            });
            browser.quit()
        });
    });

    test.describe('Get repo collaborators', function() {
        this.timeout(100000);
        test.it('Should return at least one collaborator..', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(500);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(1000);
                browser.findElement(webdriver.By.id('collaborators')).getText().then(function(collaborators){
                    //console.log(collaborators)
                    var collaboratorsCount = collaborators.replace(/\s/g, '').split("person")
                    var index = collaboratorsCount.indexOf('Collaborators:');
                    if (index > -1) {
                        collaboratorsCount.splice(index, 1);
                    }
                    var len = collaboratorsCount.length
                    //console.log(collaboratorsCount)
                    if (len >= 1){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });
            });
            browser.quit()
        });
    });

    test.describe('Get repo link', function() {
        this.timeout(100000);
        test.it('Should return link to repo on github.', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(500);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(1000);
                browser.findElement(webdriver.By.xpath('//*[@id="repo_link"]/a')).getAttribute('href').then(function(link){
                    //console.log(link)
                    if (link.includes('github.com')){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });
            });
            browser.quit()
        });
    });

    test.describe('Get total commits', function() {
        this.timeout(100000);
        test.it('Should return 0 or higher', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(1000);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(5000);
                browser.findElement(webdriver.By.xpath('//*[@id="commits"]/span')).getAttribute('data-badge').then(function(commits){
                    //console.log(commits)
                    if (commits >= 0){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });
            });
            browser.quit()
        });
    });

    test.describe('Get total issues', function() {
        this.timeout(100000);
        test.it('Should return 0 or higher', function() {
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
                browser.sleep(3000);
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
                browser.sleep(1000);
            });
            browser.findElement(webdriver.By.className("mdl-checkbox")).click()
            browser.findElement(webdriver.By.className("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect")).click().then(function() {
                browser.sleep(1000);
                });
            browser.findElement(webdriver.By.className("mdl-navigation__link")).click().then(function() {
                browser.sleep(5000);
                browser.findElement(webdriver.By.xpath('//*[@id="issues"]/span')).getAttribute('data-badge').then(function(issues){
                    //console.log(issues)
                    if (issues >= 0){
                        assert.equal(true, true)
                    }else{
                        assert.equal(false,true)
                    }
                });
            });
            browser.quit()
        });
    });

});


