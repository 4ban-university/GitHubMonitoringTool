var repo = {"collaborators": {'1':'Dima', '2':'Ksyusha', '3':'Nikita'},
			"commitsPerCollaborator":{'Dima':34, 'Ksyusha':345, 'Nikita':45},
			"issues": 45,
			"commits":345,
			"issuesPerCollaborator": {'Dima':43, 'Ksyusha':32,},
			"commentsPerCollaborator": {'Dima':444, 'Ksyusha':3442, 'Nikita':43},
	};

charts(repo);

function charts(repo){
	//var visible = true;
	var commits = repo.commits;
	var issues = repo.issues;
	var collaborators = repo.collaborators;
	document.getElementById("commits").innerHTML += commits;
	document.getElementById('issues').innerHTML += issues;
	document.getElementById('collaborators').innerHTML += collaborators[1]+collaborators[2];
	//Define canvas
	var ctx_commitsPerCollaborator = document.getElementById('commitsPerCollaborator');
	var ctx_issuesPerCollaborator = document.getElementById('issuesPerCollaborator');
	var ctx_commentsPerCollaborator = document.getElementById('commentsPerCollaborator');

	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = commitsPerCollaboratorTransformation(repo.commitsPerCollaborator);	// {'Dima':34, 'Ksyusha':345, 'Nikita':45}
	var commitsPerCollaborator_options = {}

	//Data and options for comments per collaborator
	var commentsPerCollaborator_data = commentsPerCollaboratorTransformation(repo.commentsPerCollaborator);	
	var commentsPerCollaborators_options = {}

	//Data and options for issues per collaborator
	var issuesPerCollaborator_data = issuesPerCollaboratorTransformation(repo.issuesPerCollaborator);	
	var issuesPerCollaborators_options = {}

	//commits per collaborators
	var commitsPerCollaborator_chart = new Chart(ctx_commitsPerCollaborator, {
        type: 'doughnut',
        data: commitsPerCollaborator_data,
        options: commitsPerCollaborator_options
    });
};