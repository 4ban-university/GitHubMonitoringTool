repo.weeklyInfo.then(function(weeklyInfo){
	var weeks = weeklyInfo.length;
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
	for (var week = 1; week <= weeks; week++){
		var id = 'tab'+week
		var page = '<!-- Start of all weeks report --> \
					<h1>Week '+week+' report for all collaborators</h1> \
					<p> \
						<input type="radio" id="weekly'+week+'_TextData" name="weekly'+week+'_dataDisplayForm" >Show data only in tables<Br> \
						<input type="radio" id="weekly'+week+'_GraphicData" name="weekly'+week+'_dataDisplayForm" >Show data only in charts<Br> \
						<input type="radio" id="weekly'+week+'_MixedData" name="weekly'+week+'_dataDisplayForm" checked>Show data either in tables and charts<Br> \
					</p><hr> \
					<div class="chart" id="weekly'+week+'_commitsChart"> \
						<h2>Activity per collaborator</h2> \
						<div class="dataTable" id="weekly'+week+'_commitsTable"></div> \
						<div class="canvas" id="weekly'+week+'_commitsCanvas"> \
							<div class="ChartType" style="display:block"> \
								<input type="radio" id="weekly'+week+'_doughnutCPC" name="weekly'+week+'_chartType1" weekNumber='+week+' checked>Doughnut \
									<input type="radio" id="weekly'+week+'_pieCPC" name="weekly'+week+'_chartType1" weekNumber='+week+'>Pie \
									<input type="radio" id="weekly'+week+'_barCPC" name="weekly'+week+'_chartType1" weekNumber='+week+'>Bar \
									<input type="radio" id="weekly'+week+'_lineCPC" name="weekly'+week+'_chartType1" weekNumber='+week+'>Line \
							</div>		 \
						</div><hr width="95%" size="5" color="#454545"> \
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
// Additional functions
// Chart js plugon for changing background color in charts. 
function chart_plugin(){
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
	//----------radio buttons for how to display the information
	document.getElementById('weekly'+week+'_TextData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="none"
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block"
	    }
	};

	document.getElementById('weekly'+week+'_GraphicData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("weekly"+week+"_commitsTable").style.display="none"
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block"
	    }
	};

	document.getElementById('weekly'+week+'_MixedData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("weekly"+week+"_commitsTable").style.display="block"
	        document.getElementById("weekly"+week+"_commitsCanvas").style.display="block"
	    }
	};
};

function weekly_tables(weeklyInfo, week){
	var sortedWeeklyInfo=sortData(weeklyInfo)
	var activity = 0
	for (var key in weeklyInfo){
		activity+=weeklyInfo[key]
	}
	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort table</a></th><th class='th_s'>Percentage</th></tr>"
	for (var key in weeklyInfo) {
		table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+weeklyInfo[key]+"</td><td class='td_s'>"+Math.round(weeklyInfo[key]*100/activity)+"%</td></tr>"
	}
	table+="</table>"
	document.getElementById('weekly'+week+'_commitsTable').innerHTML += table;

	$(".sortWeekly"+week).click(function(){
		var tableId=$(this).parents(".dataTable").attr("id")
		$(this).parents(".dataTable").find(".tbl").remove()
			var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Activity <a class='sortWeekly"+week+"' style='width:50px; height:50px; cursor:pointer'>Sort table</a></th><th class='th_s'>Percentage</th></tr>"
			for (var key in sortedWeeklyInfo) {
				table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+sortedWeeklyInfo[key]+"</td><td class='td_s'>"+Math.round(sortedWeeklyInfo[key]*100/activity)+"%</td></tr>"
			}
			table+="</table>"
			document.getElementById(tableId).innerHTML += table;
	})
};

function weekly_report(weeklyInfo, week, weekly_commitsPerCollaborator_chart){
	document.getElementById('weekly'+week+'_commitsCanvas').innerHTML += "<canvas id='weekly"+week+"_commitsPerCollaborator' class='visible'></canvas>"
	//console.log(charts)
	weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weekly_commitsPerCollaborator_chart);

	document.getElementById('weekly'+week+'_doughnutCPC').onclick = function() {
	    if ( this.checked ) {
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="30%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_pieCPC').onclick = function() {
	    if ( this.checked ) {
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	    	document.getElementById('weekly'+week+'_commitsCanvas').style.width="30%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'pie', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_barCPC').onclick = function() {
	    if ( this.checked ) {
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="48%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'bar', false, weekly_commitsPerCollaborator_chart);
	    }
	};
	document.getElementById('weekly'+week+'_lineCPC').onclick = function() {
	    if ( this.checked ) {
	    	var weekNum=parseInt($(this).attr('weekNumber'))
	        document.getElementById('weekly'+week+'_commitsCanvas').style.width="48%"
			weekly_commitsPerCollaborator_chart[weekNum].destroy();
	        weekly_commitsPerCollaborator(weeklyInfo, week, 'line', true, weekly_commitsPerCollaborator_chart);
	    }
	};
};
	
function weekly_commitsPerCollaborator(weeklyInfo, week, chartType, labels, weekly_commitsPerCollaborator_chart){
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