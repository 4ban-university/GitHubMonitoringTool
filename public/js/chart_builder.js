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
	overallInfo(repo.commits, repo.issues, repo.collaborators);
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

function overallInfo(){
	var commits = repo.commits;
	var issues = repo.issues;
	var collaborators = repo.collaborators;
	var collab = [];
	var i = 0;
	document.getElementById('collaborators').innerHTML += '<p>Collaborators:</p><ul>';
	for (var key in collaborators){
		document.getElementById('collaborators').innerHTML += '<li>'+collaborators[key]+'</li>';
		i++
	}
	document.getElementById('collaborators').innerHTML += '</ul>';



	document.getElementById("commits").innerHTML += commits;
	document.getElementById('issues').innerHTML += issues;
	
}
function commitsPerCollaboratorTransformation (commitsPerCollaborator_data){
	var keyNum=0
	var labels=[]

	for (var key in commitsPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in commitsPerCollaborator_data) {
		data[keyNum]=commitsPerCollaborator_data[key]
		keyNum++
	}

	commitsPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]

	}
	return commitsPerCollaborator_data;
};

function commentsPerCollaboratorTransformation (commentsPerCollaborator_data){

};

function issuesPerCollaboratorTransformation (issuesPerCollaborator_data){

};