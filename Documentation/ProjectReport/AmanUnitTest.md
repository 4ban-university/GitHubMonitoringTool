<h4>Test File</h4> 
https://github.com/abhandal/SOEN341-G4/blob/master/test/unit/test.html

<h4>Code #1</h4>

```
repo.description.then(function(description) {
  QUnit.test("details", function(assert){ 
      assert.notEqual(description, "", "Description is not empty");
  });        
});
```

<h4>Description for Code #1</h4>
Performs a test to check if the description is empty. If the description is empty than it will return false, failing the test. Otherwise, it will return true which is a pass.

<h4>Code #2</h4>

```
repo.burndown.then(function(burndown) {
  QUnit.test("getBurndown", function(assert){ 
      assert.notEqual(burndown, "", "Burndown is not empty");
  });  
});
```

<h4>Description for Code #2</h4>
Performs a test to check if the burndown data is empty. If the burndown data is empty than it will return false, failing the test. Otherwise, it will return true which is a pass.

<h4>Code #3</h4>

```
repo.commits.then(function(commits) {
  QUnit.test("getCommits", function(assert){
      assert.notEqual(commits['abhandal'], 0, "Repo 'abhandal' has greater than 0 commits");
      assert.equal(commits['blablabla'], undefined, "Repo undefined returnes undefined");
      assert.notEqual(commits['abhandal'], -1, "Repo 'abhandal' does not have less than 0 commits");
  }); 
});
```

<h4>Description for Code #3</h4>
Since the GitHub authorization that is being used contains the user abhandal it will check the commits. If the user has 0 or less than 0 commits then the test will fail, since the user does have more than 0 commits in this SOEN341 repo. Additionally, if an undefined user is given then the test will pass as it ensures than an undefined user is caught. 

<h4>Code #4</h4>

```
repo.weeklyInfo.then(function(weeks){
  QUnit.test("getWeeklyInfo", function(assert){
      assert.notEqual(weeks[0]['abhandal'], -1, "Number of events in first week is not less than 0");
      assert.equal(weeks[-1], undefined, "Number of events in non-existant week is undefined");
  });
});
```

<h4>Description for Code #4</h4>
Tests whether there are less than 0 weeks in the first week and if a non-existent week returns undefined. 

<h4>Code #5</h4>

```
repo.collaborators.then(function(response){
 QUnit.test("getCollaborators", function(assert){
     assert.equal(response.length,10,"There are 10 collaborators in the SOEN341-G4 repo");
     assert.notEqual(response.length,-1,"There are not less than 0 collaborators in the SOEN341-G4 repo");
     assert.notEqual(response.length,0,"There are not 0 collaborators in the SOEN341-G4 repo");
  });
});
```

<h4>Description for Code #5</h4>
Tests whether there are 10 collaborators in the SOEN341-G4 repo, in this case there are exactly 10 users within the repo. Additionally, it checks whether there are 0 or less than 0  collaborators within the repo for which if it returns true then the test will fail. 
