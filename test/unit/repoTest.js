var owner = 'abhandal';
var repoName = 'SOEN341-G4';
var auth = {username:"yourUserName", password:"yourPassword"};
//Instantiate your repo object
var repo = new Repo(owner, repoName, auth);
//^^this will start the process of getting all the data asynchronously

//if you want to access data you need JQuery promises
//let's say array of collaborators
repo.collaborators.then(function(response){//then means -> after you get the data, execute the following function

    //response will hold the array of collaborators
    console.log(response.length);//should be 10 (because of the TA and b8n

});

// all the other data works in similar ways... most are an associative 
// array of the collaborators with their corresponding data


//for example:
repo.commits.then(function(commits){
   
    console.log(commits['abhandal']);//this would give the total number of commits you have
    
});

//weekly info is a little different, but still similar
repo.weeklyInfo.then(function(weeks){
   
    console.log(weeks[0]['abhandal']);//would give the total number of events for the first week
    
});