repo.weeklyInfo.then(function(weeklyInfo){
	var names = []
	for (var name in weeklyInfo[weeklyInfo.length-1]){
		names.push(name)
	}

	for (var name in names){
		var page = '<div class="chart" id="individual'+name+'_commitsChart">'
		page += '<div class="dataTable" id="individual'+name+'_commitsTable"></div>'
		page += '<div class="canvas" id="individual'+name+'_commitsCanvas">'
		page += '<div class="ChartType" style="display:block"> \
					<input type="radio" id="individual'+name+'_lineCPC" name="individual'+name+'_chartType1" checked>Line \
					<input type="radio" id="individual'+name+'_barCPC" name="individual'+name+'_chartType1" >Bar \
				</div>'
		page +='</div>'
		page += '<hr width="95%" size="5" color="#454545">'
		page += '</div>'
		document.getElementById('report_individually').innerHTML += page
		var data = [];
		for (var week in weeklyInfo){
			data.push(weeklyInfo[week][names[name]])
		}
		individual_filter(name);
		individual_tables(name, names[name], data);
		var individual_commitsPerCollaborator_chart;
		individual_report(name, data)
	}
	chart_plugin()
});

function individual_tables(num, name, info){
	var table = '<table class="tbl">'
	table +='<tr class="tr_s"><th class="th_s">Name</th>'
	var w
	for (var week in info){
		w = parseInt(week)+1
		table += '<th class="th_s">Week '+w+'</th>'
	}
	table +='</tr><tr class="tr_s">'
	table +='<td class="td_s">'+name+'</td>'
	for (var key in info) {
		table+="<td class='td_s'>"+info[key]+"</td>"
	}
	table+="</tr></table>"
	document.getElementById('individual'+num+'_commitsTable').innerHTML += table;
};

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

function individual_report(num, info){
	document.getElementById('individual'+num+'_commitsCanvas').innerHTML += "<canvas id='individual"+num+"_commitsPerCollaborator' class='visible' width='500px' height='500px'></canvas>"
	
	individual_commitsPerCollaborator(num, info, 'line');

	document.getElementById('individual'+num+'_barCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('individual'+num+'_commitsCanvas').style.width="50%"
			individual_commitsPerCollaborator_chart.destroy();
	        individual_commitsPerCollaborator(num, info, 'bar');
	    }
	};
	document.getElementById('individual'+num+'_lineCPC').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById('individual'+num+'_commitsCanvas').style.width="50%"
			individual_commitsPerCollaborator_chart.destroy();
	        individual_commitsPerCollaborator(num, info, 'line');
	    }
	};
};
	
function individual_commitsPerCollaborator(num, info, chartType){
	var ctx_commitsPerCollaborator = document.getElementById('individual'+num+'_commitsPerCollaborator').getContext("2d");
	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = individual_commitsPerCollaboratorTransformation(info);
	var commitsPerCollaborator_options = {}
	
	individual_commitsPerCollaborator_chart = new Chart(ctx_commitsPerCollaborator, {
        type: chartType,
        data: commitsPerCollaborator_data,
        options: commitsPerCollaborator_options
    });
};

function individual_commitsPerCollaboratorTransformation (commitsPerCollaborator_data){
	var keyNum=0
	var labels=[]
	var colors = '#FF6384'
	var k;
	for (var key in commitsPerCollaborator_data) {
		k = parseInt(key)+1
		labels[keyNum]='Week '+k
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

function individual_filter(num){
	//----------radio buttons for how to display the information
	document.getElementById('individual_TextData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("individual"+num+"_commitsCanvas").style.display="none"
	        document.getElementById("individual"+num+"_commitsTable").style.display="block"
	    }
	};

	document.getElementById('individual_GraphicData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("individual"+num+"_commitsTable").style.display="none"
	        document.getElementById("individual"+num+"_commitsCanvas").style.display="block"
	    }
	};

	document.getElementById('individual_MixedData').onclick = function() {
	    if ( this.checked ) {
	        document.getElementById("individual"+num+"_commitsTable").style.display="block"
	        document.getElementById("individual"+num+"_commitsCanvas").style.display="block"
	    }
	};
};
