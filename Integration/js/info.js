function getRepoData(method,async, callback){
    // Access-Control-Allow-Origin: http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            callback(JSON.parse(this.response));
        }
    };

    xmlhttp.open("GET", "../Integration/php/getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method, async);
    xmlhttp.send();

}
function promiseRepoData(method){
    return $.ajax({
        url:"../Integration/php/getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method ,
        type: 'GET'
    });
}


function promiseUserData(method, collaborator){
    return $.ajax({
        url:"../Integration/php/getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator,
        type: 'GET'

    });
}

function listCollaborators(collaborators){
    collaborators.forEach(function(value){
        promiseUserData("getName", value).done(function(name){
            $("#collaborators").append("<li>"+name + " ("+ value+")</li>");
        });

    });
}

$(document).ready(function(){

    getRepoData("getCollaborators",true, listCollaborators);

});