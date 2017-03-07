function repos(){

	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='repo_selection.html'>SOEn341-G4</a></td></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='#'>repo 2</a></td></tr>"
	table+="<tr class='tr_s'><td class='td_s'><a href='#'>repo 3</a></td></tr>"
	table+="</table>"
	document.getElementById('reposTable').innerHTML += table;

};
repos();