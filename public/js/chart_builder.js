var repo = {"name": "SOEN341-G4",
			"description": "This repository works on keeping track of activities of each team member on each sprint to help the TAs evaluate the amount of work done as a whole team, and per team member.",
			"link": "https://github.com/abhandal/SOEN341-G4",
			"collaborators": {'1':'Aman Bhandal', '2':'Dmitry Kryukov', '3':'Charles-Philippe Labbe', '4':'Ksenia Popova', '5':'Nikita Baranov', '6':'Batoul Yehia', '7':'Raymart De Guzman', '8':'Andy Pham'},
			"issues": 75,
			"commits": 19198,
			"commitsPerCollaborator":{'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 42, 'Ksenia Popova': 18, 'Nikita Baranov': 11,'Batoul Yehia': 8, 'Raymart De Guzman': 10, 'Andy Pham': 13},
			"issuesPerCollaborator": {'Aman Bhandal': 8, 'Dmitry Kryukov': 10, 'Charles-Philippe Labbe': 29, 'Ksenia Popova': 10, 'Nikita Baranov': 12,'Batoul Yehia': 4, 'Raymart De Guzman': 1, 'Andy Pham': 1},
			"commentsPerCollaborator": {'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 20, 'Ksenia Popova': 24, 'Nikita Baranov': 21,'Batoul Yehia': 20, 'Raymart De Guzman': 22, 'Andy Pham': 24},
			"burndown" : {'1':35, '2':33, '3':33, '4':35, '5':33, '6':25, '7':23, '8':18, '9':15, '10':10, '11':7, '12':4, '13':1, '14':0, },
	};

// Chart js plugon for changing background color in charts. 
Chart.pluginService.register({
    beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
            var helpers = Chart.helpers;
            var ctx = chart.chart.ctx;
            var chartArea = chart.chartArea;
            ctx.save();
            ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
            ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
            ctx.restore();
        }
    }
});


function overAllInfo(){
	var commits = repo.commits;
	var issues = repo.issues;
	var collaborators = repo.collaborators;
	var name = repo.name;
	var description = repo.description;
	var link = repo.link;

	var collab = [];
	var i = 0;
	document.getElementById('collaborators').innerHTML += '<h2>Collaborators:</h2><ul class="demo-list-icon mdl-list">';
	for (var key in collaborators){
		document.getElementById('collaborators').innerHTML += '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"> <i class="material-icons mdl-list__item-icon">person</i>'+collaborators[key]+'</span></li>';
		i++
	}
	document.getElementById('collaborators').innerHTML += '</ul>';
	document.getElementById("commits").innerHTML += '<span class="mdl-badge" data-badge="'+commits+'">Total commits</span>';
	document.getElementById('issues').innerHTML += '<span class="mdl-badge" data-badge="'+issues+'">Total issues</span>';
	document.getElementById('repo_name').innerHTML += name;
	document.getElementById('repo_description').innerHTML += description;
	document.getElementById('repo_link').innerHTML += '<a href="'+link+'">Github</a>';
	
};

function burndown(){
	var ctx_burndown = document.getElementById('burndown');	
	var burndown_data = repo.burndown;
	var burndown_options = {
			chartArea: {
        				backgroundColor: 'rgba(255, 255, 255, 1)'
    		}
    	};

	
	var keyNum=0
	var labels=[]

	for (var key in burndown_data) {
		labels[keyNum]='Day '+key
		keyNum++
	}

	var keyNum=0
	var data=[]
	for (var key in burndown_data) {
		data[keyNum]=burndown_data[key]
		keyNum++
	}

	var i = 0;
	var ideal_data = [];
	ideal_data[0]=data[0]
	var firstIssues = data[0];
	var totalDays = labels.length;
	var idealIncrement = firstIssues/(totalDays-1)
	for (var i = 1; i < labels.length; i++){
		firstIssues-=idealIncrement;
		ideal_data[i]=firstIssues

		}
	ideal_data[ideal_data.length-1] = 0

	burndown_data = {
		labels: labels,

		datasets: [
        {
            data: data,
            label: " Burndown chart",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(75,192,192,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
        },
        {	
        	data: ideal_data,
        	label: " Ideal burndown chart",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(114,208,114,0.4)",
            borderColor: "rgba(114,208,114,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(114,208,114,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(114,208,114,1)",
            pointHoverBorderColor: "rgba(114,208,114,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
        }]
        

	}


	var burndown_chart = new Chart(ctx_burndown, {
        type: 'line',
        data: burndown_data,
        options: burndown_options
    });
};















var table = "<table><tr><th>Name</th><th>Number of commits</th><th>Percentage</th></tr>"
var commitsPerCollaborator=repo.commitsPerCollaborator
for (var key in commitsPerCollaborator) {
	table+="<tr><td>"+key+"</td><td>"+commitsPerCollaborator[key]+"</td><td>"+Math.round(commitsPerCollaborator[key]*100/191)+"%</td></tr>"
}
table+="</table>"
document.getElementById('commitsTable').innerHTML += table;

table = "<table><tr><th>Name</th><th>Number of issues</th><th>Percentage</th></tr>"
var issuesPerCollaborator=repo.issuesPerCollaborator
for (var key in issuesPerCollaborator) {
	table+="<tr><td>"+key+"</td><td>"+issuesPerCollaborator[key]+"</td><td>"+Math.round(issuesPerCollaborator[key]*100/75)+"%</td></tr>"
}
table+="</table>"
document.getElementById('issuesTable').innerHTML += table;

var table = "<table><tr><th>Name</th><th>Number of comments</th><th>Percentage</th></tr>"
var commentsPerCollaborator=repo.commentsPerCollaborator
for (var key in commentsPerCollaborator) {
	table+="<tr><td>"+key+"</td><td>"+commentsPerCollaborator[key]+"</td><td>"+Math.round(commentsPerCollaborator[key]*100/177)+"%</td></tr>"
}
table+="</table>"
document.getElementById('commentsTable').innerHTML += table;

charts(repo);


 //----------checkboxes for what information to show
 document.getElementById('commitsPerCollaboratorCheck').onclick = function() {
    if ( !this.checked ) {
        document.getElementById("commitsChart").style.display="none"
    }
    else document.getElementById("commitsChart").style.display="block"
};

 document.getElementById('issuesPerCollaboratorCheck').onclick = function() {
    if ( !this.checked ) {
        document.getElementById("issuesChart").style.display="none"
    }
    else document.getElementById("issuesChart").style.display="block"
};

 document.getElementById('commentsPerCollaboratorCheck').onclick = function() {
    if ( !this.checked ) {
        document.getElementById("commetsChart").style.display="none"
    }
    else document.getElementById("commetsChart").style.display="block"
};

 //----------radio buttons for how to display the information
document.getElementById('TextData').onclick = function() {
    if ( this.checked ) {
        document.getElementById("commitsCanvas").style.display="none"
        document.getElementById("issuesCanvas").style.display="none"
        document.getElementById("commentsCanvas").style.display="none"
        document.getElementById("commitsTable").style.display="block"
        document.getElementById("issuesTable").style.display="block"
        document.getElementById("commentsTable").style.display="block"
    }
};

 document.getElementById('GraphicData').onclick = function() {
    if ( this.checked ) {
        document.getElementById("commitsTable").style.display="none"
        document.getElementById("issuesTable").style.display="none"
        document.getElementById("commentsTable").style.display="none"
        document.getElementById("commitsCanvas").style.display="block"
        document.getElementById("issuesCanvas").style.display="block"
        document.getElementById("commentsCanvas").style.display="block"
    }
};

 document.getElementById('MixedData').onclick = function() {
    if ( this.checked ) {
        document.getElementById("commitsTable").style.display="block"
        document.getElementById("issuesTable").style.display="block"
        document.getElementById("commentsTable").style.display="block"
        document.getElementById("commitsCanvas").style.display="block"
        document.getElementById("issuesCanvas").style.display="block"
        document.getElementById("commentsCanvas").style.display="block"
    }
};





function charts(repo){
	//var visible = true;
	
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

