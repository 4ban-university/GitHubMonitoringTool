var GitHub = require('github-api')
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
var assert = chai.assert;

var user = { username: 'b8n',
            password: 'qwertyuiop011010' };

var gh = new GitHub(user)
var me = gh.getUser();

describe('GitHub API library test', function() {
    it('User authentication', function() {
       return me.getProfile().then(function(res) {
        return assert.eventually.equal( Promise.resolve(res.data.login), 'b8n')
       })
  });
})
