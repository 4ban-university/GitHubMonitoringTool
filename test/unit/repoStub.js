function Repo(owner, repo, oauth) {

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

}

/*
 Creating a Repo object that gets the data from the Github api;
 The variable are promises which are resolved with method calls.
 */

function isCommented(ob1){

}


function details(ob1){
    ob1.link.resolve("https://github.com/abhandal/SOEN341-G4");

}


function getCollaborators(ob1){

    var collabs = ["CharlesPhilippeLabbe", "abhandal", "b5n", "lyncis", "NikitaBaranov", "batouyehia", "tramyardg", "andypham29"];

    ob1.collaborators.resolve(collabs);

}


function getCommits(ob1){

}

    var commits = {"CharlesPhilippeLabbe": 200, "abhandal" : 10, "b5n" : 400, "lyncis": 150, "NikitaBaranov" : 69, "batouyehia": 50, "tramyardg": 100, "andypham29": 50};

    ob1.commits.resolve(commits);
    ob1.totalCommits.resolve(700);

}


function getComments(ob1){

    var comments = {"CharlesPhilippeLabbe": 100, "abhandal" : 15, "b5n" : 200, "lyncis": 50, "NikitaBaranov" : 9, "batouyehia": 5, "tramyardg": 10, "andypham29": 5};

    ob1.comments.resolve(comments);
    ob1.totalComments.resolve(440);


}


function getIssues(ob1){

    var issues = {"CharlesPhilippeLabbe": 400, "abhandal" : 150, "b5n" : 250, "lyncis": 100, "NikitaBaranov" : 90, "batouyehia": 50, "tramyardg": 90, "andypham29": 55};

    ob1.issues.resolve(issues);
    ob1.totalIssues.resolve(440);

}


function getWeeklyInfo(ob1){
    var oneWeek= 7*24*3600*1000;//miliseconds per week
    var today = new Date();
    var weeks;
    var creation;
    var promises = new Array();
    var collabs = ["CharlesPhilippeLabbe", "abhandal", "b5n", "lyncis", "NikitaBaranov", "batouyehia", "tramyardg", "andypham29"];

    for(var i = 0; i< weeks.length;i++){
        weeks[i] = new Array();
        collabs.forEach(function(value){
            weeks[i][value] = i * value.length;
        });
    }

    ob1.weeklyInfo.resolve(weeks);

}


function getBurndown(ob1){
   var burn = new Array();
    for(var i = 0; i< 61; i++){
        burn[i] = i * 2;
    }

    ob1.burndown.resolve(burn);


}
exports.Repo = Repo;
