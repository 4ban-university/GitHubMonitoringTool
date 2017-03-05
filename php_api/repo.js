
/*
Creating a Repo object that gets the data from the Github api;
The variable are promises which are resolved with method calls.
 */
function Repo(owner, repo, oauth) {
    //var auth = {token: oauth};
    //github api
    this.git = new GitHub(oauth);
    this.repo = this.git.getRepo(owner, repo);
    this.oauth = oauth;
    this.issue = this.git.getIssues(owner,repo);

    //data and collecting the data;
    this.collaborators = new $.Deferred();
    this.totalCollaborators = new $.Deferred();
    getCollaborators(this);

    this.commits = new $.Deferred();
    this.totalCommits = new $.Deferred();
    getCommits(this);

    this.issues = new $.Deferred();
    this.totalIssues = new $.Deferred();
    getIssues(this);

    this.comments = new $.Deferred();
    this.totalComments = new $.Deferred();
    getComments(this);


}


function getCollaborators(ob1){
    ob1.repo.getCollaborators().then(function(response){
            //resolving total amount
            ob1.totalCollaborators.resolve(response.data.length);
            var collabs = new Array();
            for(var i = 0; i< response.data.length; i++)
                collabs.push(response.data[i].login);

            ob1.collaborators.resolve(collabs);
        }
    );

}


function getCommits(ob1){
    var promises = new Array();

    ob1.collaborators.then(function(c){
        var commits = new Array();
        var total = 0;
        c.forEach(function(value){
            var opt = {author: value};
            //this way because multiple pages and all
            promises.push(ob1.repo._requestAllPages("/repos/"+ob1.repo.__fullname+"/commits", opt).then(function(response){
               commits[value] = response.data.length;
               total += response.data.length;
            }));
        });

        Promise.all(promises).then(function(){
           ob1.commits.resolve(commits);
           ob1.totalCommits.resolve(total);
        });
    });

}


function getComments(ob1){

    var comments = new Array();

    ob1.collaborators.then(function(c){
       //getting the comments in the same order as the others
        c.forEach(function(value){
            comments[value] = 0;
        });

        var opt = {sort: 'created'};
        ob1.issue._requestAllPages("/repos/"+ob1.repo.__fullname+"/issues/comments", opt).then(function(response){
            ob1.totalComments.resolve(response.data.length);
            response.data.forEach(function(comment){
               comments[comment.user.login] +=1;
                //document.write(comment.id + " " + comment.user.login + " " + comments[comment.user.login]+ "<br>");
           }) ;
          ob1.comments.resolve(comments);
        });
    });
}


function getIssues(ob1){

    var promises = new Array();

    ob1.collaborators.then(function(c){
        var issues = new Array();
        var total = 0;
        c.forEach(function(value){

           var opt = {creator: value, state: 'all'};
           promises.push(ob1.issue.listIssues(opt).then(function(response){
               issues[value] = response.data.length;
               total += response.data.length;
           }));
        });

        Promise.all(promises).then(function(){
            ob1.issues.resolve(issues);
            ob1.totalIssues.resolve(total);
        });
    });

}
