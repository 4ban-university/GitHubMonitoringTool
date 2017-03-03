var repo = {"collaborators": {'1':'Aman Bhandal', '2':'Dmitry Kryukov', '3':'Charles-Philippe Labbe', '4':'Ksenia Popova', '5':'Nikita Baranov', '6':'Batoul Yehia', '7':'Raymart De Guzman', '8':'Andy Pham'},
			"commitsPerCollaborator":{'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 42, 'Ksenia Popova': 18, 'Nikita Baranov': 11,'Batoul Yehia': 8, 'Raymart De Guzman': 10, 'Andy Pham': 13},
			"issues": 75,
			"commits": 191,
			"issuesPerCollaborator": {'Aman Bhandal': 8, 'Dmitry Kryukov': 10, 'Charles-Philippe Labbe': 29, 'Ksenia Popova': 10, 'Nikita Baranov': 12,'Batoul Yehia': 4, 'Raymart De Guzman': 1, 'Andy Pham': 1},
			"commentsPerCollaborator": {'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 20, 'Ksenia Popova': 24, 'Nikita Baranov': 21,'Batoul Yehia': 20, 'Raymart De Guzman': 22, 'Andy Pham': 24},
	};



charts(repo);

function charts(repo){
	//var visible = true;
	overAllInfo(repo.commits, repo.issues, repo.collaborators);
	//Define canvas
	var ctx_commitsPerCollaborator = document.getElementById('commitsPerCollaborator');
	var ctx_issuesPerCollaborator = document.getElementById('issuesPerCollaborator');
	var ctx_commentsPerCollaborator = document.getElementById('commentsPerCollaborator');

	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = commitsPerCollaboratorTransformation(repo.commitsPerCollaborator);
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

	var issuesPerCollaborator_chart = new Chart(ctx_issuesPerCollaborator, {
        type: 'doughnut',
        data: issuesPerCollaborator_data,
        options: issuesPerCollaborators_options
    });

	var commentsPerCollaborator_chart = new Chart(ctx_commentsPerCollaborator, {
        type: 'doughnut',
        data: commentsPerCollaborator_data,
        options: commentsPerCollaborators_options
    });


};

function overAllInfo(){
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
	
};

function commitsPerCollaboratorTransformation (commitsPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
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
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commitsPerCollaborator_data;
};

function commentsPerCollaboratorTransformation (commentsPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	for (var key in commentsPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in commentsPerCollaborator_data) {
		data[keyNum]=commentsPerCollaborator_data[key]
		keyNum++
	}

	commentsPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commentsPerCollaborator_data;

};

function issuesPerCollaboratorTransformation (issuesPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	for (var key in issuesPerCollaborator_data) {
		labels[keyNum]=key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in issuesPerCollaborator_data) {
		data[keyNum]=issuesPerCollaborator_data[key]
		keyNum++
	}

	issuesPerCollaborator_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return issuesPerCollaborator_data;

};