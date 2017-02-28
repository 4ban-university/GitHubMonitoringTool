

function Repo(owner, repo, collaborators, token){
    this.owner = owner;
    this.repo = repo;
    this.collaborators = collaborators;
    this.commits = getCommits(this.collaborators);


}

    function getCommits(collaborators){
        var commits = new Array();

           collaborators.forEach(function(value){
               commits[value] = promiseUserData('numberOfCommits', value);

           }) ;

         return commits;

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