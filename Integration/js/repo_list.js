
/*
	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='repo_selection.php?name=SOEN341-G4&owner=abhandal'>SOEN341-G4</a></td></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='#'>repo 2</a></td></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='#'>repo 3</a></td></tr>"
	table+="</table>"
	document.getElementById('reposTable').innerHTML += table;*/

    var git = new GitHub(auth);
    var user = git.getUser();

    var repoList = getSaved();
saveSessionArray();
function saveSessionArray(){
	console.log(repoList);
    localStorage.setItem('repoList', JSON.stringify(repoList));
}

function getSaved(){
	var arr = localStorage.getItem('repoList');
	if(arr === null)
		return new Array();
	else{
		return JSON.parse(localStorage.getItem('repoList'));
	}

}