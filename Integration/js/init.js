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
var repo = new Repo('abhandal','SOEN341-G4', auth);