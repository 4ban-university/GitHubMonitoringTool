repo.weeklyInfo.then(function(weeklyInfo){
	/*
		Promise generate weekly activity reports for all collaborators
		by commits + issues + comments.
	:param weeklyInfo: json object with activity data.
	*/
	var weeks = weeklyInfo.length;
	// Gererate html tabs like Week 1, week 2, week 3
	var tabs = '<div class="wrapper"><ul class="tabs clearfix" data-tabgroup="first-tab-group">'
	for (var w = 1; w <= weeks; w++){
		if (w == 1){
			tabs+='<li><a href="#tab'+w+'" class="active">Week '+w+'</a></li>'
		}
		else{
			tabs+='<li><a href="#tab'+w+'">Week '+w+'</a></li>'	
		}
	}
	tabs+='</ul><section id="first-tab-group" class="tabgroup">'
	for (var w = 1; w <= weeks; w++){
		tabs+='<div id="tab'+w+'"></div>'
	}
	tabs+='</section></div>'
	document.getElementById('report_weekly').innerHTML += tabs;

	// var charts = []
	// for (var week = 1; week <= weeks; week++){
	// 	charts.push({})
	// }
	// //console.log(charts)

	// Generating page under tabs
	// Filters, divs.
	for (var week = 1; week <= weeks; week++){
		var id = 'tab'+week
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
								    <input type="radio" id="weekly'+week+'_doughnutCPC" name="weekly'+week+'_chartType1" weekNumber='+week+' checked class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Doughnut</span>\
                                    <span class="mdl-radio__outer-circle outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_pieCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_pieCPC" name="weekly'+week+'_chartType1" weekNumber='+week+' class="mdl-radio__button">\
								    <span class="mdl-radio__label">Pie</span>\
								    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_barCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_barCPC" name="weekly'+week+'_chartType1" weekNumber='+week+' class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Bar</span>\
                                    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
                                <label class="mdl-radio mdl-js-radio is-upgraded chart-chooser" for="weekly'+week+'_lineCPC" data-upgraded=",MaterialRadio">\
								    <input type="radio" id="weekly'+week+'_lineCPC" name="weekly'+week+'_chartType1" weekNumber='+week+' class="mdl-radio__button">\
                                    <span class="mdl-radio__label">Line</span>\
                                    <span class="mdl-radio__outer-circle"></span>\
                                </label>\
							</div>		 \
						</div> \
					</div> \
					<!-- End of all weeks report --> '
		document.getElementById(id).innerHTML += page;
		
		weekly_filter(weeklyInfo[week-1], week);
		weekly_tables(weeklyInfo[week-1], week);
		var weekly_commitsPerCollaborator_chart=[]; 
		weekly_report(weeklyInfo[week-1], week, weekly_commitsPerCollaborator_chart);
	}
	// Additional functionss
	changeTabs()
	chart_plugin()
});

function changeTabs(){
	/*
		Realization of tab changing functions
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

function chart_plugin(){
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
};

function weekly_filter(weeklyInfo, week){
	/*
		Function realize filters functionality.
	*/
	// radio buttons for how to display the information
	document.getElementById('weekly'+week+'_TextData').onclick = function() {
	    if ( this.checked ) {
            $(".num-heading").css("text-align", "center");
        	$(".dataTable").css("float", "none");
            $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
	    	$(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="none"
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block"
	    }
	};

	document.getElementById('weekly'+week+'_GraphicData').onclick = function() {
	    if ( this.checked ) {
            $(".num-heading").css("text-align", "center");
	    	$(".chart").find("div.canvas").css("float", "none");
            $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsTable").style.display="none"
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block"
	    }
	};

	document.getElementById('weekly'+week+'_MixedData').onclick = function() {
	    if ( this.checked ) {
            $(".dataTable").css("float", "left");
            $(".chart").find("div.canvas").css("float", "right");
            $(".mdl-radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block"
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block"
	    }
	};
};

function weekly_tables(weeklyInfo, week){
	/*
		Function generate tables with activity data for each week
		and put it into right div
	*/
	var sortedWeeklyInfo=sortData(weeklyInfo)
	var activity = 0
	for (var key in weeklyInfo){
		activity+=weeklyInfo[key]
	}
	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeek sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>"
	for (var key in weeklyInfo) {
		table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+weeklyInfo[key]+"</td><td class='td_s'>"+Math.round(weeklyInfo[key]*100/activity)+"%</td></tr>"
	}
	table+="</table>"
	document.getElementById('weekly'+week+'_commitsTable').innerHTML += table;

	$(".sortWeekly"+week).click(function(){
		var tableId=$(this).parents(".dataTable").attr("id")
		$(this).parents(".dataTable").find(".tbl").remove()
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeek sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort</a></th><th class='th_s'>Percentage</th></tr>"
			for (var key in sortedWeeklyInfo) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedWeeklyInfo[key]+"</td><td class='td_s'>"+Math.round(sortedWeeklyInfo[key]*100/activity)+"%</td></tr>"
			}
			table+="</table>"
			document.getElementById(tableId).innerHTML += table;
	})
};

function weekly_report(weeklyInfo, week, weekly_commitsPerCollaborator_chart){
	/*
		Function generate charts with activity for each week.
		Realization functions of changing chart type.
	*/
	document.getElementById('weekly'+week+'_commitsCanvas').innerHTML += "<canvas id='weekly"+week+"_commitsPerCollaborator' class='visible'></canvas>"
	//console.log(charts)
	weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weekly_commitsPerCollaborator_chart);

	document.getElementById('weekly'+week+'_doughnutCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="40%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_pieCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="40%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'pie', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_barCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="40%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'bar', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_lineCPC').onclick = function() {
	    if ( this.checked ) {
            $(".chart-chooser").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="40%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'line', true, weekly_commitsPerCollaborator_chart);
	    }
	};
};
	
function weekly_commitsPerCollaborator(weeklyInfo, week, chartType, labels, weekly_commitsPerCollaborator_chart){
	/*
		Function generate right options and data for each chart.
	*/
	//console.log(week)
	var ctx_commitsPerCollaborator = document.getElementById('weekly'+week+'_commitsPerCollaborator').getContext("2d");
	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = weekly_commitsPerCollaboratorTransformation(weeklyInfo, labels);
	var commitsPerCollaborator_options = {}
	// commitsPerCollaborator_chart = new Chart
	weekly_commitsPerCollaborator_chart[week] = new Chart(ctx_commitsPerCollaborator, {
	//charts = new Chart(ctx_commitsPerCollaborator, {
        type: chartType,
        data: commitsPerCollaborator_data,
        options: commitsPerCollaborator_options
    });
};

function weekly_commitsPerCollaboratorTransformation (commitsPerCollaborator_data, labels_need){
	/*
		Function convert data to correct format.
	*/
	var keyNum=0
	if (labels_need == true){
		var labels=[]
		var colors = '#36A2EB'
	}
	else{
		var labels=[]
		var colors = ['#FF6384','#36A2EB','#FFCE56','#A997DF','#9CEC5B','#E0BAD7','#F2A541','#53F4FF','#F0F465','#533A71','#D16666','#5DD39E','#2978A0']
	}
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
            label: "Activity",
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commitsPerCollaborator_data;
};