function infoFilter(){
	/*
		Realization of filters functions.
	*/
	//----------Checkboxes for what information to show
	document.getElementById('commitsPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("commitsChart").style.display="none";
	    }
	    else document.getElementById("commitsChart").style.display="block";
	}

	document.getElementById('issuesPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("issuesChart").style.display="none";
	    }
	    else document.getElementById("issuesChart").style.display="block";
	}

	document.getElementById('commentsPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("commetsChart").style.display="none";
	    }
	    else document.getElementById("commetsChart").style.display="block";
	}

	//----------Radio buttons for how to display the information

	//Display data in text
	document.getElementById('TextData').onclick = function() {
	    if ( this.checked ) {

            $(".num-heading").css("text-align", "center");
            $("#commitsChart, #issuesChart, #commetsChart").find(".dataTable").css("float", "none");
	        document.getElementById("commitsCanvas").style.display="none"
	        document.getElementById("issuesCanvas").style.display="none"
	        document.getElementById("commentsCanvas").style.display="none"
	        document.getElementById("commitsTable").style.display="block"
	        document.getElementById("issuesTable").style.display="block"
	        document.getElementById("commentsTable").style.display="block"

	    }
	}

	//Display data in Charts
	document.getElementById('GraphicData').onclick = function() {
	    if ( this.checked ) {

            $(".num-heading").css("text-align", "center");
	    	$("#commitsChart, #issuesChart, #commetsChart").find(".canvas").css("float", "none");
	        document.getElementById("commitsTable").style.display="none"
	        document.getElementById("issuesTable").style.display="none"
	        document.getElementById("commentsTable").style.display="none"
	        document.getElementById("commitsCanvas").style.display="block"
	        document.getElementById("issuesCanvas").style.display="block"
	        document.getElementById("commentsCanvas").style.display="block"

	    }
	}

	//Display data in text and charts
	document.getElementById('MixedData').onclick = function() {
	    if ( this.checked ) {

            $("#commitsChart, #issuesChart, #commetsChart").find(".dataTable").css("float", "left");
            $("#commitsChart, #issuesChart, #commetsChart").find(".canvas").css("float", "right");
	        document.getElementById("commitsTable").style.display="block"
	        document.getElementById("issuesTable").style.display="block"
	        document.getElementById("commentsTable").style.display="block"
	        document.getElementById("commitsCanvas").style.display="block"
	        document.getElementById("issuesCanvas").style.display="block"
	        document.getElementById("commentsCanvas").style.display="block"

	    }
	}
}


function report(){
	/*
		Function to generate overall report.
		Creates canvases for charts.
		Realization of changing chart type fucntionality.
	*/
	document.getElementById('commitsCanvas').innerHTML += "<canvas id='commitsPerCollaborator' class='visible'></canvas>";
	document.getElementById('issuesCanvas').innerHTML += "<canvas id='issuesPerCollaborator' class='visible'></canvas>";
	document.getElementById('commentsCanvas').innerHTML += "<canvas id='commentsPerCollaborator' class='visible'></canvas>";

	commitsPerCollaborator(repo.commits, 'doughnut', false);
	issuesPerCollaborator(repo.issues, 'doughnut', false);
	commentsPerCollaborator(repo.comments, 'doughnut', false);

	//Choice of chart type for each section

	//Commits per collaborator section
	document.getElementById('doughnutCPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commitsCanvas').style.width="30%";
			commitsPerCollaboratorChart.destroy();
	        commitsPerCollaborator(repo.commits, 'doughnut', false);
	    }
	}
	document.getElementById('pieCPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commitsCanvas').style.width="30%";
			commitsPerCollaboratorChart.destroy();
	        commitsPerCollaborator(repo.commits, 'pie', false);
	    }
	}
	document.getElementById('barCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commitsCanvas').style.width="50%";
			commitsPerCollaboratorChart.destroy();
	        commitsPerCollaborator(repo.commits, 'bar', false);
	    }
	}
	document.getElementById('lineCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commitsCanvas').style.width="50%";
			commitsPerCollaboratorChart.destroy();
	        commitsPerCollaborator(repo.commits, 'line', true);
	    }
	}

	//Issues per collaborator section

	document.getElementById('doughnutIPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('issuesCanvas').style.width="30%";
	    	issuesPerCollaboratorChart.destroy();
	        issuesPerCollaborator(repo.issues, 'doughnut', false);
	    }
	}
	document.getElementById('pieIPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('issuesCanvas').style.width="30%";
	    	issuesPerCollaboratorChart.destroy();
	        issuesPerCollaborator(repo.issues,'pie', false);
	    }
	}
	document.getElementById('barIPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('issuesCanvas').style.width="50%";
	        issuesPerCollaboratorChart.destroy();
	        issuesPerCollaborator(repo.issues,'bar', false);
	    }
	}
	document.getElementById('lineIPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('issuesCanvas').style.width="50%";
	        issuesPerCollaboratorChart.destroy();
	        issuesPerCollaborator(repo.issues,'line', true);
	    }
	}

	//Comments per collaborator section

	document.getElementById('doughnutCoPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commentsCanvas').style.width="30%";
	    	commentsPerCollaboratorChart.destroy();
	        commentsPerCollaborator(repo.comments, 'doughnut', false);
	    }
	}
	document.getElementById('pieCoPC').onclick = function() {
	    if ( this.checked ) {
	    	document.getElementById('commentsCanvas').style.width="30%";
	    	commentsPerCollaboratorChart.destroy();
	        commentsPerCollaborator(repo.comments, 'pie', false);
	    }
	}
	document.getElementById('barCoPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commentsCanvas').style.width="50%";
	    	commentsPerCollaboratorChart.destroy();
	        commentsPerCollaborator(repo.comments, 'bar', false);
	    }
	}
	document.getElementById('lineCoPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('commentsCanvas').style.width="50%";
	    	commentsPerCollaboratorChart.destroy();
	        commentsPerCollaborator(repo.comments, 'line', true);
	    }
	}
}

function createTables(commitsPerCollaborator, commentsPerCollaborator, issuesPerCollaborator){
	/*
		Function to generate tables with data for collaborators in promises.
		:param commitsPerCollaborator: Number of commits per each collaborator
		:param issuesPerCollaborator: Number of issues per each collaborator
		:param commentsPerCollaborator: Number of comments per each collaborator
	*/

	//Creation of a table for the commits per collaborator section

	commitsPerCollaborator.then(function(commitsPerCollaborator){

		//Sort data in table for the sorted view
		var sortedCommits=sortData(commitsPerCollaborator);
		var commits = 0;
		for (var key in commitsPerCollaborator){
			commits += commitsPerCollaborator[key];
		}

		//Table creation 
		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of commits <a class='sortCommits' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
		for (var key in commitsPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+commitsPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(commitsPerCollaborator[key]*100/commits)+"%</td></tr>";
		}
		table+="</table>";
		document.getElementById('commitsTable').innerHTML += table;

		//Sort data in the table
		$(".sortCommits").click(function(){
			$(this).parents(".dataTable").find(".tbl").remove();
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of commits<a class='sortCommits' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
			for (var key in sortedCommits) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedCommits[key]+"</td><td class='td_s'>"+Math.round(sortedCommits[key]*100/commits)+"%</td></tr>";
			}
			table+="</table>";
			document.getElementById('commitsTable').innerHTML += table;
		})

	});

	//Creation of a table for the issues per collaborator section	

	issuesPerCollaborator.then(function(issuesPerCollaborator){
		
		//Sort data in table for the sorted view
		var sortedCommits=sortData(issuesPerCollaborator);
		var issues = 0;
		for (var key in issuesPerCollaborator){
			issues += issuesPerCollaborator[key];
		}
		//Table creation 
		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of issues<a class='sortIssues' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
		for (var key in issuesPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+issuesPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(issuesPerCollaborator[key]*100/issues)+"%</td></tr>";
		}
		table+="</table>";
		document.getElementById('issuesTable').innerHTML += table;

		//Sort data in the table
		$(".sortIssues").click(function(){
			$(this).parents(".dataTable").find(".tbl").remove()
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of issues<a class='sortIssues' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
			for (var key in sortedCommits) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedCommits[key]+"</td><td class='td_s'>"+Math.round(sortedCommits[key]*100/issues)+"%</td></tr>";
			}
			table+="</table>";
			document.getElementById('issuesTable').innerHTML += table;
		})
	});

	//Creation of a table for the comments per collaborator section

	commentsPerCollaborator.then(function(commentsPerCollaborator){

		//Sort data in table for the sorted view
		var sortedCommits=sortData(commentsPerCollaborator);
		var comments = 0;
		for (var key in commentsPerCollaborator){
			comments += commentsPerCollaborator[key];
		}

		//Table creation 
		var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of comments<a class='sortComments' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
		for (var key in commentsPerCollaborator) {
			table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+commentsPerCollaborator[key]+"</td><td class='td_s'>"+Math.round(commentsPerCollaborator[key]*100/comments)+"%</td></tr>";
		}
		table+="</table>";
		document.getElementById('commentsTable').innerHTML += table;

		//Sort data in the table
		$(".sortComments").click(function(){
			$(this).parents(".dataTable").find(".tbl").remove();
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of comments<a class='sortComments' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
			for (var key in sortedCommits) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedCommits[key]+"</td><td class='td_s'>"+Math.round(sortedCommits[key]*100/comments)+"%</td></tr>";
			}
			table+="</table>";
			document.getElementById('commentsTable').innerHTML += table;
		})
	});
}

	
function commitsPerCollaborator(commitsPerCollaborator, chartType, line){
	/*
		Function to generate commits per collaborator chart, data and options for it.
	*/
	var ctxCommitsPerCollaborator = document.getElementById('commitsPerCollaborator').getContext("2d");
	commitsPerCollaborator.then(function(commitsPerCollaborator){
		//Data and options for commits per collaborator
		var commitsPerCollaboratorData = commitsPerCollaboratorTransformation(commitsPerCollaborator, line);
		var commitsPerCollaboratorOptions = {};
		//commits per collaborators
		commitsPerCollaboratorChart = new Chart(ctxCommitsPerCollaborator, {
	        type: chartType,
	        data: commitsPerCollaboratorData,
	        options: commitsPerCollaboratorOptions
	    });
	});
}

function issuesPerCollaborator(issuesPerCollaborator, chartType, line){
	/*
		Function to generate issues per collaborator chart, data and options for it.
	*/
	var ctxIssuesPerCollaborator = document.getElementById('issuesPerCollaborator').getContext("2d");
	issuesPerCollaborator.then(function(issuesPerCollaborator){
		//Data and options for issues per collaborator
		var issuesPerCollaboratorData = issuesPerCollaboratorTransformation(issuesPerCollaborator, line);	
		var issuesPerCollaboratorsOptions = {};

		issuesPerCollaboratorChart = new Chart(ctxIssuesPerCollaborator, {
	        type: chartType,
	        data: issuesPerCollaboratorData,
	        options: issuesPerCollaboratorsOptions
	    });
	});
}

function commentsPerCollaborator(commentsPerCollaborator, chartType, line){
	/*
		Function to generate comments per collaborator chart, data and options for it.
	*/
	var ctxCommentsPerCollaborator = document.getElementById('commentsPerCollaborator').getContext("2d");
	commentsPerCollaborator.then(function(commentsPerCollaborator){
		//Data and options for comments per collaborator
		var commentsPerCollaboratorData = commentsPerCollaboratorTransformation(commentsPerCollaborator, line);	
		var commentsPerCollaboratorsOptions = {};

		commentsPerCollaboratorChart = new Chart(ctxCommentsPerCollaborator, {
	        type: chartType,
	        data: commentsPerCollaboratorData,
	        options: commentsPerCollaboratorsOptions
	    });
	});
}

function commitsPerCollaboratorTransformation (commitsPerCollaboratorData, line){
	/*
		Function to convert commits per collaborator data to the right format.
	*/
	var keyNumber=0;
	var labels=[];

	//Colors set for charts
	if (line == true){
		var colors = '#FFCE56';
	}
	else{
		var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0'];
	}

	for (var key in commitsPerCollaboratorData) {
		labels[keyNumber]=key;
		keyNumber++;
	}

	var keyNumber=0;
	var data=[];

	for (var key in commitsPerCollaboratorData) {
		data[keyNumber]=commitsPerCollaboratorData[key];
		keyNumber++;
	}

	//Writing data in the right format
	commitsPerCollaboratorData = {
		labels: labels,

		datasets: [
        {
            data: data,
            label:'Commits',
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commitsPerCollaboratorData;
}

function commentsPerCollaboratorTransformation (commentsPerCollaboratorData, line){
	/*
		Function convert comments per collaborator data to right format.
	*/
	var keyNumber=0;
	var labels=[];

	//Colors set for charts
	if (line == true){
		var colors = '#FFCE56';
	}
	else{
		var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0'];
	}
	for (var key in commentsPerCollaboratorData) {
		labels[keyNumber]=key;
		keyNumber++;
	}

	var keyNumber=0;
	var data=[];
	for (var key in commentsPerCollaboratorData) {
		data[keyNumber]=commentsPerCollaboratorData[key];
		keyNumber++;
	}

	//Writing data in the right format
	commentsPerCollaboratorData = {
		labels: labels,

		datasets: [
        {
            data: data,
            label:'Comments',
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commentsPerCollaboratorData;
}

function issuesPerCollaboratorTransformation (issuesPerCollaboratorData, line){
	/*
		Function convert issues per collaborator data to right format.
	*/
	var keyNumber=0;
	var labels=[];

	//Colors set for charts
	if (line == true){
		var colors = '#FFCE56';
	}
	else{
		var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0'];
	}
	for (var key in issuesPerCollaboratorData) {
		labels[keyNumber]=key;
		keyNumber++;
	}

	var keyNumber=0;
	var data=[];
	for (var key in issuesPerCollaboratorData) {
		data[keyNumber]=issuesPerCollaboratorData[key];
		keyNumber++;
	}

	//Writing data in the right format
	issuesPerCollaboratorData = {
		labels: labels,

		datasets: [
        {
            data: data,
            label:'Issues',
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return issuesPerCollaboratorData;
}

infoFilter();
createTables(repo.commits, repo.comments, repo.issues);
var commitsPerCollaboratorChart;
var issuesPerCollaboratorChart;
var commentsPerCollaboratorChart;
report();

// Additional functions 
Chart.pluginService.register({
	/*
		Chart js library plugin for changing background color in charts.
	*/
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

function sortData(dataForSort){
	/*
		Realization of sorting for the tables
	*/
	var sortingArray=[];
	var i=0;

	for (var key in dataForSort){
		sortingArray[i]={name:key, value:dataForSort[key]};
		i++;
	}

	//Sorting of the array
	sortingArray.sort(function (a, b) {
  		return b.value-a.value;
	});

	var sortedCommits=new Object;

	//Object with sorted data
	for (var i in sortingArray) {
		Object.defineProperty(sortedCommits, sortingArray[i].name, {value: sortingArray[i].value, configurable: true, writable: true, enumerable: true });
	}

	return(sortedCommits);
}