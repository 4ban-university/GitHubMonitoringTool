function overAllInfo(commits, issues, collaborators, name, description, link){
	/*
		Function generate html code with data from json object received from github.
	:param commits: promise with number of commits
	:param issues: promise with number of issues
	:param collaborators: promise with collaborators list
	:param name: repository name
	:param description: promise with description
	:param link: repository link
	*/
	var i = 0;
	document.getElementById('collaborators').innerHTML += '<h2>Collaborators:</h2><ul class="demo-list-icon mdl-list">';
	collaborators.then(function(collaborators){
		for (var key in collaborators){
			document.getElementById('collaborators').innerHTML += '<li class="mdl-list__item">\
				<span class="mdl-list__item-primary-content"> \
				<i class="material-icons mdl-list__item-icon">person</i>'+collaborators[key]+'</span></li>';
			i++
		}
		document.getElementById('collaborators').innerHTML += '</ul>';
	});

	commits.then(function(commits){
		document.getElementById("commits").innerHTML = '<span class="mdl-badge" data-badge="'+commits+'">Total commits </span>';
	});

	issues.then(function(issues){
		document.getElementById('issues').innerHTML = '<span class="mdl-badge" data-badge="'+issues+'">Total issues </span>';
	});

	document.getElementById('repo_name').innerHTML += name;

	description.then(function(description){
		document.getElementById('repo_description').innerHTML += description;
	});
	
	link.then(function(link){
		document.getElementById('repo_link').innerHTML += '<a href="'+link+'">Github</a>';
	});
};
overAllInfo(repo.totalCommits, repo.totalIssues, repo.collaborators, repo.name, repo.description, repo.link);