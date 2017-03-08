repo.weeklyInfo.then(function(weeklyInfo){
	console.log(weeklyInfo)
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

	// Generating page under tabs
	for (var week = 1; week <= weeks; week++){
		var id = 'tab'+week
		var page = '<!-- Start of all weeks report --> \
					<h1>Week '+week+' report</h1> \
					<p> \
						<input type="checkbox" id="weekly'+week+'_commitsPerCollaboratorCheck" name="weekly'+week+'_commitsPerCollaborator" value="b1" checked>Commits per collaborator<Br> \
					</p> \
					<p> \
						<input type="radio" id="weekly'+week+'_TextData" name="weekly'+week+'_dataDisplayForm" >Show data only in tables<Br> \
						<input type="radio" id="weekly'+week+'_GraphicData" name="weekly'+week+'_dataDisplayForm" >Show data only in charts<Br> \
						<input type="radio" id="weekly'+week+'_MixedData" name="weekly'+week+'_dataDisplayForm" checked>Show data either in tables and charts<Br> \
					</p><hr> \
					<div class="chart" id="weekly'+week+'_commitsChart"> \
						<h2>Number of commits per collaborator</h2> \
						<div class="dataTable" id="weekly'+week+'_commitsTable"></div> \
						<div class="canvas" id="weekly'+week+'_commitsCanvas"> \
							<div class="ChartType" style="display:none"> \
								<input type="radio" id="weekly'+week+'_doughnutCPC" name="weekly'+week+'_chartType1" checked>Doughnut \
									<input type="radio" id="weekly'+week+'_pieCPC" name="weekly'+week+'_chartType1" >Pie \
									<input type="radio" id="weekly'+week+'_barCPC" name="weekly'+week+'_chartType1" >Bar \
									<input type="radio" id="weekly'+week+'_lineCPC" name="weekly'+week+'_chartType1" >Line \
							</div>		 \
						</div><hr width="95%" size="5" color="#454545"> \
					</div> \
					<!-- End of all weeks report --> '
		document.getElementById(id).innerHTML += page;
		
		weekly_filter(weeklyInfo[week-1], week);
		weekly_tables(weeklyInfo[week-1], week);
		//var weekly_commitsPerCollaborator_chart;
		weekly_report(weeklyInfo[week-1], week);
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
}


function weekly_filter(weeklyInfo, week){
	//----------checkboxes for what information to show
	document.getElementById('weekly'+week+'_commitsPerCollaboratorCheck').onclick = function() {
	    if ( !this.checked ) {
	        document.getElementById("weekly"+week+"_commitsChart").style.display="none"
	    }
	    else document.getElementById("weekly"+week+"_commitsChart").style.display="block"
	};
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
	var table = "<table class='tbl'><tr class='tr_s'><th class='th_s'>Name</th><th class='th_s'>Number of commits</th><th class='th_s'>Percentage</th></tr>"
	for (var key in weeklyInfo) {
		table+="<tr class='tr_s'><td class='td_s'>"+key+"</td><td class='td_s'>"+weeklyInfo[key]+"</td><td class='td_s'>"+Math.round(weeklyInfo[key]*100/191)+"%</td></tr>"
	}
	table+="</table>"
	document.getElementById('weekly'+week+'_commitsTable').innerHTML += table;
};

function weekly_report(weeklyInfo, week){
	document.getElementById('weekly'+week+'_commitsCanvas').innerHTML += "<canvas id='weekly"+week+"_commitsPerCollaborator' class='visible' width='500px' height='500px'></canvas>"
	
	weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut');

	// document.getElementById('weekly'+week+'_doughnutCPC').onclick = function() {
	//     if ( this.checked ) {
	//     	document.getElementById('weekly'+week+'_commitsCanvas').style.width="30%"
	// 		commitsPerCollaborator_chart.destroy();
	//         weekly_commitsPerCollaborator(weeklyInfo, week, 'doughnut');
	//     }
	// };
	// document.getElementById('weekly'+week+'_pieCPC').onclick = function() {
	//     if ( this.checked ) {
	//     	document.getElementById('weekly'+week+'_commitsCanvas').style.width="30%"
	// 		commitsPerCollaborator_chart.destroy();
	//         weekly_commitsPerCollaborator(weeklyInfo, week, 'pie');
	//     }
	// };
	// document.getElementById('weekly'+week+'_barCPC').onclick = function() {
	//     if ( this.checked ) {
	//         document.getElementById('weekly'+week+'_commitsCanvas').style.width="60%"
	// 		commitsPerCollaborator_chart.destroy();
	//         weekly_commitsPerCollaborator(weeklyInfo, week, 'bar');
	//     }
	// };
	// document.getElementById('weekly'+week+'_lineCPC').onclick = function() {
	//     if ( this.checked ) {
	//         document.getElementById('weekly'+week+'_commitsCanvas').style.width="70%"
	// 		commitsPerCollaborator_chart.destroy();
	//         weekly_commitsPerCollaborator(weeklyInfo, week, 'line');
	//     }
	// };
};
	
function weekly_commitsPerCollaborator(weeklyInfo, week, chartType){
	var ctx_commitsPerCollaborator = document.getElementById('weekly'+week+'_commitsPerCollaborator').getContext("2d");
	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = commitsPerCollaboratorTransformation(weeklyInfo);
	var commitsPerCollaborator_options = {}
	// commitsPerCollaborator_chart = new Chart
	var commitsPerCollaborator_chart = new Chart(ctx_commitsPerCollaborator, {
        type: chartType,
        data: commitsPerCollaborator_data,
        options: commitsPerCollaborator_options
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
