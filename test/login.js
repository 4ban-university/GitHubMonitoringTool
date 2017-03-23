var GitHub = require('github-api')
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var assert = chai.assert;

//Write correct login and password for passing test
var user = { username: 'Lyncis',
            password: 'password' };

var gh = new GitHub(user)
var me = gh.getUser();

describe('User', function() {
    it('User Auth', function() {
       return me.getProfile().then(function(res) {
        return assert.eventually.equal( Promise.resolve(res.data.login), 'Lyncis') //Do not forget change login in this place
       })
  });
})
