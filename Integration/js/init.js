/*var auth;
$.ajax({
    type: 'POST',
    url: "https://github.com/login/oauth/access_token",
    data: {
        client_id:'7e84f9e2e7d65f484caa',
        client_secret:'bcda23ce654c82d76a4d35fbde17fefb14f638cd',
        code: tokenCode},
        success: function(data){
        auth = {token: data.token};
    },
    dataType: 'application/jsonp',
    asynch: false
});
*/
var repo = new Repo(owner,repoName, auth);

user.getProfile().then(function(response){
    var name = response.data.name;
    var login = response.data.login;
    var imageURL = response.data.avatar_url;
    $("#avatar-image").append(' <img src='+imageURL+' class="demo-avatar">');
    $("#username").append('<h5>'+ name +'</h5>('+ login + ')');

});