repo.weeklyInfo.then(function(weeklyInfo){
	/*
		Promise generate weekly activity reports for all collaborators
		by commits + issues + comments.
	:param weeklyInfo: json object with activity data.
	*/
	var weeks = weeklyInfo.length;
	// Gererate html tabs like Week 1, week 2, week 3
	var tabs = '<div class="wrapper"><ul class="tabs clearfix" data-tabgroup="first-tab-group">';
	for (var w = 1; w <= weeks; w++){
		if (w == 1){
			tabs+='<li><a href="#tab'+w+'" class="active">Week '+w+'</a></li>';
		}
		else{
			tabs+='<li><a href="#tab'+w+'">Week '+w+'</a></li>';
		}
	}
	tabs+='</ul><section id="first-tab-group" class="tabgroup">';
	for (var w = 1; w <= weeks; w++){
		tabs+='<div id="tab'+w+'"></div>';
	}
	tabs+='</section></div>';
	document.getElementById('report_weekly').innerHTML += tabs;

	// Generating page under tabs
	// Filters, divs.
	for (var week = 1; week <= weeks; week++){
		var id = 'tab'+week;
		var page = '<!-- Start of all weeks report --> \
					<h2>Week '+week+' report for all collaborators</h2> \
					<div class="weekly_radio content-grid mdl-grid"> \
						<div class="mdl-cell mdl-cell--4-col">\
							<label class="mdl-radio mdl-js-radio is-upgraded" for="weekly'+week+'_TextData" data-upgraded=",MaterialRadio">\
								<input type="radio" id="weekly'+week+'_TextData" name="weekly'+week+'_dataDisplayForm" class="mdl-radio__button">\
								<span class="mdl-radio__label">Show data only in tables</span>\
								<span class="mdl-radio__outer-circle"></span>\
							</label>\
						</div>\
            			<div class="mdl-cell mdl-cell--4-col">\
							<label class="mdl-radio mdl-js-radio is-upgraded" for="weekly'+week+'_GraphicData" data-upgraded=",MaterialRadio">\
								<input type="radio" id="weekly'+week+'_GraphicData" name="weekly'+week+'_dataDisplayForm" class="mdl-radio__button">\
								<span class="mdl-radio__label">Show data only in charts</span>\
								<span class="mdl-radio__outer-circle"></span>\
							</label>\
						</div>\
						<div class="mdl-cell mdl-cell--4-col">\
							<label class="mdl-radio mdl-js-radio is-upgraded" for="weekly'+week+'_MixedData" data-upgraded=",MaterialRadio">\
								<input type="radio" id="weekly'+week+'_MixedData" name="weekly'+week+'_dataDisplayForm" class="mdl-radio__button" checked>\
								<span class="mdl-radio__label">Show data either in tables and charts</span>\
								<span class="mdl-radio__outer-circle outer-circle"></span>\
							</label>\
						</div>\
					</div> \
					<div class="chart" id="weekly'+week+'_commitsChart"> \
						<h3 class="num-heading">Activity per collaborator</h3> \
						<div class="dataTable" id="weekly'+week+'_commitsTable">\
						</div> \
						<div class="canvas" id="weekly'+week+'_commitsCanvas"> \
							<div class="ChartType chart-chooser-main" style="display:block"> \
								<label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_doughnutCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_doughnutCPC" name="weekly'+week+'_chartType1" weekNumberber='+week+' checked class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Doughnut</span>\
                                    <span class="mdl-radio__outer-circle outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_pieCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_pieCPC" name="weekly'+week+'_chartType1" weekNumberber='+week+' class="mdl-radio__button">\
								    <span class="mdl-radio__label">Pie</span>\
								    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_barCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_barCPC" name="weekly'+week+'_chartType1" weekNumberber='+week+' class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Bar</span>\
                                    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_lineCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_lineCPC" name="weekly'+week+'_chartType1" weekNumberber='+week+' class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Line</span>\
                                    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
							</div>		 \
						</div> \
					</div> \
					<!-- End of all weeks report --> ';

		document.getElementById(id).innerHTML += page;
		
		weeklyFilter(weeklyInfo[week-1], week);
		weeklyTables(weeklyInfo[week-1], week);
		var weeklyCommitsPerCollaboratorChart=[]; 
		weeklyReport(weeklyInfo[week-1], week, weeklyCommitsPerCollaboratorChart);
	}
	// Additional functionss
	changeTabs();
	chartPlugin();
});

function changeTabs(){
	/*
		Realization of tab changing function
	*/
	$('.tabgroup > div').hide();
	$('.tabgroup > div:first-of-type').show();
	$('.tabs a').click(function(e){
	  	e.preventDefault();
	  	var $this = $(this),
	  	tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
	  	others = $this.closest('li').siblings().children('a'),
	  	target = $this.attr('href');
	  	others.removeClass('active');
	  	$this.addClass('active');
	  	$(tabgroup).children('div').hide();
	  	$(target).show();
	})
}

function chartPlugin(){
	/*
		Chart js library plugin for changing background color in charts. 
	*/
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

function weeklyFilter(weeklyInfo, week){
	/*
		Function realize filters functionality.
	*/
	// Radio buttons for how to display the information

	//Display data in text
	document.getElementById('weekly'+week+'_TextData').onclick = function() {
	    if ( this.checked ) {
            $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
	    	$(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="none";
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block";
	    }
	}

	//Display data in charts
	document.getElementById('weekly'+week+'_GraphicData').onclick = function() {
	    if ( this.checked ) {
            $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsTable").style.display="none";
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block";
	    }
	}

	//Display data in text and charts
	document.getElementById('weekly'+week+'_MixedData').onclick = function() {
	    if ( this.checked ) {
	        $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block";
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block";
	    }
	}
}

function weeklyTables(weeklyInfo, week){
	/*
		Function to generate tables with activity data for each week
		and put it into the right div
	*/

	//Sort data in table for the sorted view
	var sortedWeeklyInfo=sortData(weeklyInfo);

	var activity = 0;
	for (var key in weeklyInfo){
		activity+=weeklyInfo[key];
	}
	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeek sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
	for (var key in weeklyInfo) {
		table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+weeklyInfo[key]+"</td><td class='td_s'>"+Math.round(weeklyInfo[key]*100/activity)+"%</td></tr>";
	}
	table+="</table>";
	document.getElementById('weekly'+week+'_commitsTable').innerHTML += table;

	//Sort data in table
	$(".sortWeekly"+week).click(function(){
		var tableId=$(this).parents(".dataTable").attr("id");
		$(this).parents(".dataTable").find(".tbl").remove();
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeek sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>";
			for (var key in sortedWeeklyInfo) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedWeeklyInfo[key]+"</td><td class='td_s'>"+Math.round(sortedWeeklyInfo[key]*100/activity)+"%</td></tr>";
			}
			table+="</table>";
			document.getElementById(tableId).innerHTML += table;
	})
}

function weeklyReport(weeklyInfo, week, weeklyCommitsPerCollaboratorChart){
	/*
		Function to generate charts with activity for each week.
		Realization of function for changing chart type.
	*/
	document.getElementById('weekly'+week+'_commitsCanvas').innerHTML += "<canvas id='weekly"+week+"_commitsPerCollaborator' class='visible'></canvas>";
	weeklyCommitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weeklyCommitsPerCollaboratorChart);

	//Doughnut chart type
	document.getElementById('weekly'+week+'_doughnutCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");


	    	var weekNumber=parseInt($(this).attr('weekNumberber'));
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="40%";
			weeklyCommitsPerCollaboratorChart[weekNumber].destroy();
	        weeklyCommitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weeklyCommitsPerCollaboratorChart);

	    }
	}

	//Pie chart type
	document.getElementById('weekly'+week+'_pieCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");


	    	var weekNumber=parseInt($(this).attr('weekNumber'));
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="30%";
			weeklyCommitsPerCollaboratorChart[weekNumber].destroy();
	        weeklyCommitsPerCollaborator(weeklyInfo, week, 'pie', false, weeklyCommitsPerCollaboratorChart);


	    }
	}

	//Bar chart type
	document.getElementById('weekly'+week+'_barCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");


	    	var weekNumber=parseInt($(this).attr('weekNumber'));
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="50%";
			weeklyCommitsPerCollaboratorChart[weekNumber].destroy();
	        weeklyCommitsPerCollaborator(weeklyInfo, week, 'bar', false, weeklyCommitsPerCollaboratorChart);

	    }
	}

	//Line chart type
	document.getElementById('weekly'+week+'_lineCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");


	    	var weekNumber=parseInt($(this).attr('weekNumber'));
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="50%";
			weeklyCommitsPerCollaboratorChart[weekNumber].destroy();
	        weeklyCommitsPerCollaborator(weeklyInfo, week, 'line', true, weeklyCommitsPerCollaboratorChart);

	    }
	}
}
	
function weeklyCommitsPerCollaborator(weeklyInfo, week, chartType, labels, weeklyCommitsPerCollaboratorChart){
	/*
		Function to generate right options and data for each chart.
	*/
	var ctxCommitsPerCollaborator = document.getElementById('weekly'+week+'_commitsPerCollaborator').getContext("2d");
	//Data and options for commits per collaborator
	var commitsPerCollaboratorData = weeklyCommitsPerCollaboratorTransformation(weeklyInfo, labels);
	var commitsPerCollaboratorOptions = {};

	weeklyCommitsPerCollaboratorChart[week] = new Chart(ctxCommitsPerCollaborator, {
        type: chartType,
        data: commitsPerCollaboratorData,
        options: commitsPerCollaboratorOptions
    });
}

function weeklyCommitsPerCollaboratorTransformation (commitsPerCollaboratorData, labelsNeed){
	/*
		Function to convert data to the correct format.
	*/
	var keyNumber=0

	//Colors set for charts
	if (labelsNeed == true){
		var labels=[];
		var colors = '#36A2EB';
	}
	else{
		var labels=[]
		var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0', '#676766',
        '#f26522', '#ffe8af', '#add5d7', '#e0db25']

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

	//Data in the right format
	commitsPerCollaboratorData = {
		labels: labels,
		datasets: [
        {
            data: data,
            label: "Activity",
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
	}
	return commitsPerCollaboratorData;
}