
/*
Creating a Repo object that gets the data from the Github api;
The variable are promises which are resolved with method calls.
 */
function Repo(owner, repo, oauth) {
    //var auth = {token: oauth};
    //github api
    this.owner = owner;
    this.name = repo;
    this.git = new GitHub(oauth);
    this.repo = this.git.getRepo(owner, repo);
    this.oauth = oauth;
    this.issue = this.git.getIssues(owner, repo);

    //repo details
    this.description = new $.Deferred();
    this.link = new $.Deferred();
    details(this);

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

    this.weeklyInfo = new $.Deferred();
    getWeeklyInfo(this);

    this.burndown = new $.Deferred();
    getBurndown(this);

    this.commentBranch = new $.Deferred();
    isCommented(this);

    this.writeComment = function (ob1, content) {
        this.commentBranch.then(function (response) {
            if (response) {
                //console.log("branch exists");
                ob1.repo.writeFile("TA_Comments", "Comments/TA_Comments.md", content, "DO NOT MERGE",{}).then(function (response) {
                    //console.log("write file - response" + response);
                    getTAComment(ob1);
                });
            }
            else {
                ob1.repo.createBranch("master", "TA_Comments").then(function (response) {
                    //console.log(" new branch ");
                    ob1.repo.writeFile("TA_Comments", "Comments/TA_Comments.md", content, "DO NOT MERGE",{}).then(function (response){
                        getTAComment(ob1);
                    });
                });
            }
        });
    };
}

function isCommented(ob1){
    ob1.repo.getBranch("TA_Comments").then(function(response){
        ob1.commentBranch.resolve(true);

    }).catch(function(fail){
        ob1.commentBranch.resolve(false);
    });
}


function details(ob1){
    ob1.repo.getDetails().then(function(list){

        ob1.description.resolve(list.data.description);
        ob1.link.resolve(list.data.html_url);

    });

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
        //keeping the same order for all
        c.forEach(function(value){
            commits[value] = 0;
        });
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
        //keeping the same order
        c.forEach(function(value){
            issues[value] = 0;
        });
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


function getWeeklyInfo(ob1){
    var oneWeek= 7*24*3600*1000;//miliseconds per week
    var today = new Date();
    var weeks;
    var creation;
    var promises = new Array();

    ob1.repo.getDetails().then(function(response){
        creation = Date.parse(response.data.created_at);
        creation = new Date(creation);

        var t = Math.ceil((today.getTime()-creation.getTime())/oneWeek);

        weeks = new Array(t);

        ob1.collaborators.then(function(c) {

            //setting up array of array of collaborators

            for(var i = 0; i< weeks.length;i++){
                weeks[i] = new Array();
                c.forEach(function(value){
                    weeks[i][value] = 0;
                });
            }


            c.forEach(function(author){
                var optCommits = {author: author, sort: 'created'};
                //commits
                promises.push(ob1.repo._requestAllPages("/repos/"+ob1.repo.__fullname+"/commits", optCommits).then(function(list){
                    list.data.forEach(function(l){
                        var current = new Date(l.commit.author.date);
                        var i = Math.floor((current.getTime() - creation.getTime()) / oneWeek);//getting the index of weeks[]
                        weeks[i][author] += 1;
                    });
                }));
            });



             //issues
             var optIssues = { state: 'all'};
             promises.push(ob1.issue.listIssues(optIssues).then(function(list){
                 list.data.forEach(function(l){
                     var current = new Date(l.created_at);
                     var i = Math.floor((current.getTime() - creation.getTime()) / oneWeek);//getting the index of weeks[]
                     weeks[i][l.user.login] += 1;
                 });
             }));


             //comments

             var optComments = {sort: 'created'};
             promises.push(ob1.issue._requestAllPages("/repos/"+ob1.repo.__fullname+"/issues/comments", optComments).then(function(list){
                 list.data.forEach(function(l){
                     var current = new Date(l.created_at);
                     var i = Math.floor((current.getTime() - creation.getTime()) / oneWeek);//getting the index of weeks[]
                     weeks[i][l.user.login] += 1;
                 });
             }));


            Promise.all(promises).then(function(){
                ob1.weeklyInfo.resolve(weeks);
            });

        });
    });
}


function getBurndown(ob1){
    var oneDay = 24*3600*1000;//milliseconds per day
    var today = new Date();
    var creation;
    var promises = new Array();
    var closed = new Array();


    ob1.repo.getDetails().then(function(response) {
        creation = Date.parse(response.data.created_at);
        creation = new Date(creation);

        var t = Math.floor((today.getTime()-creation.getTime())/oneDay);

        var temp = new Date(creation.getTime());
        for(var i = 0; i<=t; i++)
            closed[i] = 0;

        var opt = {state: 'closed'};
        ob1.issue.listIssues(opt).then(function(response){
            response.data.forEach(function(value){
                var temp = new Date(value.closed_at);
                var diff = Math.floor((temp.getTime() - creation.getTime())/oneDay);
                if(diff <= t)
                 closed[diff] +=1;
            });


            ob1.totalIssues.then(function(total){
                var burn = new Array();
                closed.forEach(function(value, index){
                    total -= value;
                    burn[index] = total;
                });

                ob1.burndown.resolve(burn);

            });

        });

    });

}
