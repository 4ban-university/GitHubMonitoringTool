

function Repo(owner, repo, token){
    this.owner = owner;
    this.repo = repo;
    this.collaborators = getCollaborators(owner, repo, token);
    this.commits = getCommits(this.collaborators);

    function getCommits(collaborators){
        var commits = new Array();

        collaborators.done(function(data){
           data.forEach(function(value){
               commits[value.login] = promiseUserData('numberOfCommits', value.login);

           }) ;

           Object.defineProperty(Repo.prototype, 'commits',{value: commits});
        });

    }



    function getCollaborators(owner, repo, token){
        return $.ajax({
            url:"https://api.github.com/repos/"+owner+"/"+repo+"/collaborators"+"?access_token="+token,
            dataype:'jsonp',
            type:'GET'
        });
    }


}











function getRepoData(method,async, callback){
    // Access-Control-Allow-Origin: http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com
    var result;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            callback(JSON.parse(this.response));
        }
    };

    xmlhttp.open("GET", "../Integration/php/getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method, async);


    xmlhttp.send();// respond to preflights


    return result;
}

function getUserData(method, collaborator,async, callback){

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            callback(JSON.parse(this.response));
        }
    };
    xmlhttp.open("GET", "../Integration/php/getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator, async);
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