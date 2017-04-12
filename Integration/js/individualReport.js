repo.weeklyInfo.then(function(weeklyInfo){
	/*
		Individual report for each collaborator
	*/

	//Set of all collaborators
	var names = [];
	for (var name in weeklyInfo[weeklyInfo.length-1]){
		names.push(name);
	}
	var individualCommitsPerCollaboratorChart=[];
	var ctxCommitsPerCollaborator=[];
	var commitsPerCollaboratorData=[];
	var commitsPerCollaboratorOptions=[];
	var data=[];

	//Generating of an individual report, html
	for (var name in names){
		var page = '<div class="chart_in" id="individual'+name+'_commitsChart">';
		page += '<h3>'+names[name]+'</h3><br>';
		page += '<div class="dataTable_in" id="individual'+name+'_commitsTable"></div>';
		page += '<div class="canvas_in" id="individual'+name+'_commitsCanvas">';
		page += '<div class="ChartType" style="display:block; text-align: center;"> \
						<label style="margin-right: 25%;" class="mdl-radio mdl-js-radio is-upgraded" for="individual'+name+'_lineCPC">\
							<input type="radio" id="individual'+name+'_lineCPC" name="individual'+name+'_chartType1" chartNumber='+name+' checked class="mdl-radio__button">\
							<span class="mdl-radio__label">Line</span>\
							<span class="mdl-radio__outer-circle outer-circle"></span>\
						</label>\
						<label class="mdl-radio mdl-js-radio is-upgraded" for="individual'+name+'_barCPC">\
							<input type="radio" id="individual'+name+'_barCPC" name="individual'+name+'_chartType1" chartNumber='+name+' class="mdl-radio__button">\
							<span class="mdl-radio__label">Bar</span>\
							<span class="mdl-radio__outer-circle"></span>\
						</label>\
				</div>';
		page +='</div>';
		page += '<hr width="100%" size="5" color="#454545">';
		page += '</div>';
		document.getElementById('report_individually').innerHTML += page;

		//Weekly data for each collaborator
		var dataForCollaborator = [];
		for (var week in weeklyInfo){
			dataForCollaborator.push(weeklyInfo[week][names[name]]);
		}
		data[name]=dataForCollaborator;
		createIndividualTables(name, names[name], dataForCollaborator);
	}

    $(".ind_radio").find("#individual_MixedData").next().next().addClass("outer-circle");
	individualDataFilter(name);
	individualReport(data, individualCommitsPerCollaboratorChart, ctxCommitsPerCollaborator, commitsPerCollaboratorData, commitsPerCollaboratorOptions);
	chartPlugin();
});

function individualDataFilter(num){
	//----------Radio buttons for how to display the information

	//Display data in text
	document.getElementById('individual_TextData').onclick = function() {
	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="none";
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block";
	    	}
	    }
	}

	//Display data in charts
	document.getElementById('individual_GraphicData').onclick = function() {
	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="none";
	       	 	document.getElementById("individual"+i+"_commitsCanvas").style.display="block";
	       	}
	    }
	}

	//Display data in text and charts
	document.getElementById('individual_MixedData').onclick = function() {
	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block";
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="block";
	        }
	    }
	}
}

function createIndividualTables(num, name, info){
	/*
		Function to generate table with data for each collaborator
	*/

	//Calculation of all activity of collaborator
	var individualActivity = 0;
		for (var key in info){
			individualActivity += info[key];
		}

	//Creating the table for report
	var table = '<table class="indr_tbl">';
	table +='<tr class="indr_tr_s"><th class="indr_th_s">Name</th>';
	var weekNumber;
	for (var week in info){
		weekNumber = parseInt(week)+1;
		table += '<th class="indr_th_s">Week '+weekNumber+'</th>';
	}
	table +='</tr><tr class="indr_tr_s">';
	table +='<td class="indr_td_s">'+name+'</td>';

	//Filling the table with the data
	for (var key in info) {
		table+="<td class='indr_td_s'>"+info[key]+" or <span style='color:#0074D9'>"+Math.round(info[key]*100/individualActivity)+"%</span></td>";
	}
	table+="</tr></table>";
	document.getElementById('individual'+num+'_commitsTable').innerHTML += table;
}

// Additional functions
// Chart js plugon for changing background color in charts.
function chartPlugin(){
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
}


function individualReport(data, individualCommitsPerCollaboratorChart, ctxCommitsPerCollaborator, commitsPerCollaboratorData, commitsPerCollaboratorOptions) {

	//Generating report in chart format
	for (var i=0; i<data.length; i++){
		document.getElementById('individual'+i+'_commitsCanvas').innerHTML += "<canvas id='individual"+i+"_commitsPerCollaborator' class='visible' width='500px' height='500px'></canvas>";
		ctxCommitsPerCollaborator[i] = document.getElementById('individual'+i+'_commitsPerCollaborator').getContext("2d");
		commitsPerCollaboratorData[i] = individualСommitsPerCollaboratorTransformation(data[i]);
		commitsPerCollaboratorOptions[i] = {};
		individualCommitsPerCollaboratorChart[i] = new Chart(ctxCommitsPerCollaborator[i], {
        	type: 'line',
        	data: commitsPerCollaboratorData[i],
        	options: commitsPerCollaboratorOptions[i]
    	});
	}

	//Changing the type of charts
	for (var i=0; i<data.length-1; i++) {

		//Changing for the Bar chart type
		document.getElementById('individual'+i+'_barCPC').onclick = function() {
	    	if ( this.checked ) {
            	$(this).parent().prev().find("input[type=radio]").next().next().removeClass("outer-circle");
            	$(this).next().next().addClass("outer-circle");
	    		var chartNumber=parseInt($(this).attr("chartNumber"));
				individualCommitsPerCollaboratorChart[chartNumber].destroy();
	        	individualСommitsPerCollaborator(chartNumber, data[chartNumber], 'bar', ctxCommitsPerCollaborator, individualCommitsPerCollaboratorChart);
	    	}
		}
		
		//Changing for the Line chart type
		document.getElementById('individual'+i+'_lineCPC').onclick = function() {
	    	if ( this.checked ) {
            	$(this).parent().next().find("input[type=radio]").next().next().removeClass("outer-circle");
            	$(this).next().next().addClass("outer-circle");
            	var chartNumber=parseInt($(this).attr("chartNumber"));
				individualCommitsPerCollaboratorChart[chartNumber].destroy();
	        	individualСommitsPerCollaborator(chartNumber, data[chartNumber], 'line', ctxCommitsPerCollaborator, individualCommitsPerCollaboratorChart);
	    	}
		}
	}
}

function individualСommitsPerCollaborator(num, info, chartType, ctxCommitsPerCollaborator, individualCommitsPerCollaboratorChart){
	/*
		Generation of the charts
	*/
	num=parseInt(num);
	ctxCommitsPerCollaborator[num] = document.getElementById('individual'+num+'_commitsPerCollaborator').getContext("2d");

	//Data and options for commits per collaborator
	var commitsPerCollaboratorData = individualСommitsPerCollaboratorTransformation(info);
	var commitsPerCollaboratorOptions = {};
	individualCommitsPerCollaboratorChart[num] = new Chart(ctxCommitsPerCollaborator[num], {
        type: chartType,
        data: commitsPerCollaboratorData,
        options: commitsPerCollaboratorOptions
    });
}

function individualСommitsPerCollaboratorTransformation (commitsPerCollaboratorData){
	/*
		Transformation of the data into the right format
	*/

	var keyNumber=0;
	var labels=[];
	var colors = '#14CCCC';
	var weekNumber;
	for (var key in commitsPerCollaboratorData) {
		weekNumber = parseInt(key)+1;
		labels[keyNumber]='Week '+weekNumber;
		keyNumber++;
	}

	var keyNumber=0;
	var data=[];
	for (var key in commitsPerCollaboratorData) {
		data[keyNumber]=commitsPerCollaboratorData[key];
		keyNumber++;
	}

	//Data in the right format
	commitsPerCollaboratorData = {
		labels: labels,
		datasets: [
        {
            data: data,
            label: 'Activity',
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
	}
	return commitsPerCollaboratorData;
}
