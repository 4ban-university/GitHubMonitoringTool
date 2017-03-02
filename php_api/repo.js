

function Repo(owner, repo, collaborators){
    this.owner = owner;
    this.repo = repo;
    this.collaborators = collaborators;
    this.commits ='';
    this.issues = '';
    this.comments = '';
    this.events = '';

    construct(this);
    function construct(repo){
        if(repo.commits == '')
            repo.commits = getCommits(repo.owner,repo.repo,repo.collaborators);

        if(repo.issues == '')
            repo.issues = getIssues(repo.owner,repo.repo,repo.collaborators);

        if(repo.comments == '')
            repo.comments = getComments(repo.owner,repo.repo,repo.collaborators);

        if(repo.events == '')
            repo.events = getEvents(repo.owner,repo.repo,repo.collaborators);

    }

}

function getCommits(owner,repo,collaborators){
    var commits = new Array();

    collaborators.forEach(function(value){
        commits[value] = promiseUserData(owner,repo,'numberOfCommits', value);

    }) ;

    return commits;
}


function getIssues(owner,repo,collaborators){
    var issues = new Array();

    collaborators.forEach(function(value){
        issues[value] = promiseUserData(owner,repo,'numberOfIssues', value);

    }) ;

    return issues;
}


function getComments(owner,repo,collaborators){
    var comments = new Array();

    collaborators.forEach(function(value){
        comments[value] = promiseUserData(owner,repo,'numberOfComments', value);

    }) ;

    return comments;
}


function getEvents(owner,repo,collaborators){
    var events = new Array();

    collaborators.forEach(function(value){
        events[value] = promiseUserData(owner,repo,'numberOfEvents', value);

    }) ;

    return events;
}


function promiseRepoData(method){
    return $.ajax({
        url:"../Integration/php/getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method ,
        type: 'GET'
    });
}


function promiseUserData(owner,repo,method, collaborator){
    return $.ajax({
        url:"../Integration/php/getUserData.php?user="+owner+"&repo="+repo+"&method="+ method + "&collaborator=" + collaborator,
        type: 'GET'
    });
}


