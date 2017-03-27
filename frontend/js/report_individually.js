repo.weeklyInfo.then(function(weeklyInfo){
	/*
		Promise generate report for each collaborator by activity,
		which consist of commits + issues + comments.
	:param weeklyInfo: Json object with data for each user activity.
	*/
	var names = []
	for (var name in weeklyInfo[weeklyInfo.length-1]){
		names.push(name)
	}
	var individual_commitsPerCollaborator_chart=[];	
	var ctx_commitsPerCollaborator=[]
	var commitsPerCollaborator_data=[]
	var commitsPerCollaborator_options=[]
	var data=[]
	// Generate empty divs, filter buttons for each collaborator.
	for (var name in names){
		var page = '<div class="chart_in" id="individual'+name+'_commitsChart">'
		page += '<h3>'+names[name]+'</h3><br>'
		page += '<div class="dataTable_in" id="individual'+name+'_commitsTable"></div>'
		page += '<div class="canvas_in" id="individual'+name+'_commitsCanvas">'
		page += '<div class="ChartType" style="display:block"> \
					<input type="radio" id="individual'+name+'_lineCPC" name="individual'+name+'_chartType1" chartNumber='+name+' checked>Line \
					<input type="radio" id="individual'+name+'_barCPC" name="individual'+name+'_chartType1" chartNumber='+name+' >Bar \
				</div>'
		page +='</div>'
		page += '<hr width="100%" size="5" color="#454545">'
		page += '</div>'
		document.getElementById('report_individually').innerHTML += page
		var dataForCollaborator = [];
		for (var week in weeklyInfo){
			dataForCollaborator.push(weeklyInfo[week][names[name]])
		}
		data[name]=dataForCollaborator
		
		individual_tables(name, names[name], dataForCollaborator);
	
	}
	individual_filter(name);
	individual_report(data, individual_commitsPerCollaborator_chart, ctx_commitsPerCollaborator, commitsPerCollaborator_data, commitsPerCollaborator_options)
	chart_plugin()
});

function individual_filter(num){
	/*
		Function generate functions for filters.
	*/
	document.getElementById('individual_TextData').onclick = function() {
	    if ( this.checked ) {
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="none"
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block"
	    	}
	    }
	};

	document.getElementById('individual_GraphicData').onclick = function() {

	    if ( this.checked ) {
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="none"
	       	 	document.getElementById("individual"+i+"_commitsCanvas").style.display="block"
	       	}
	    }
	};

	document.getElementById('individual_MixedData').onclick = function() {
	    if ( this.checked ) {
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block"
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="block"
	        }
	    }
	};
};

function individual_tables(num, name, info){
	/*
		Function generate tables with data
		and put it into empty, generated div.
	*/
	var com = 0;
		for (var key in info){
			com += info[key]
		}

	var table = '<table class="indr_tbl">'
	table +='<tr class="indr_tr_s"><th class="indr_th_s">Name</th>'
	var w
	for (var week in info){
		w = parseInt(week)+1
		table += '<th class="indr_th_s">Week '+w+'</th>'
	}
	table +='</tr><tr class="indr_tr_s">'
	table +='<td class="indr_td_s">'+name+'</td>'
	for (var key in info) {
		table+="<td class='indr_td_s'>"+info[key]+" or <span style='color:#0074D9'>"+Math.round(info[key]*100/com)+"%</span></td>"
	}
	table+="</tr></table>"
	document.getElementById('individual'+num+'_commitsTable').innerHTML += table;
	//document.getElementById('individual'+num+'_commitsTable')
};

// Additional functions 
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

//var ctx_commitsPerCollaborator=[]

function individual_report(data, individual_commitsPerCollaborator_chart, ctx_commitsPerCollaborator, commitsPerCollaborator_data, commitsPerCollaborator_options) {
	/*
		Function generate chart data, chart options, chart object
		and put it into empty, generated div.
	*/
	for (var i=0; i<data.length; i++){
		document.getElementById('individual'+i+'_commitsCanvas').innerHTML += "<canvas id='individual"+i+"_commitsPerCollaborator' class='visible' width='500px' height='500px'></canvas>"
		ctx_commitsPerCollaborator[i] = document.getElementById('individual'+i+'_commitsPerCollaborator').getContext("2d");
		//console.log(data)
		commitsPerCollaborator_data[i] = individual_commitsPerCollaboratorTransformation(data[i]);
		commitsPerCollaborator_options[i] = {}
		individual_commitsPerCollaborator_chart[i] = new Chart(ctx_commitsPerCollaborator[i], {
        	type: 'line',
        	data: commitsPerCollaborator_data[i],
        	options: commitsPerCollaborator_options[i]
    	});

		
	}

	for (var i=0; i<data.length-1; i++) {
		document.getElementById('individual'+i+'_barCPC').onclick = function() {
		    if ( this.checked ) {
		    	var chartNumber=parseInt($(this).attr("chartNumber"))
		        // document.getElementById('individual'+chartNumber+'_commitsCanvas').style.width="50%"
				individual_commitsPerCollaborator_chart[chartNumber].destroy();
		        individual_commitsPerCollaborator(chartNumber, data[chartNumber], 'bar', ctx_commitsPerCollaborator, individual_commitsPerCollaborator_chart);
		    }
		};
		document.getElementById('individual'+i+'_lineCPC').onclick = function() {
		    if ( this.checked ) {
		    	var chartNumber=parseInt($(this).attr("chartNumber"))
		        // document.getElementById('individual'+i+'_commitsCanvas').style.width="50%"
				individual_commitsPerCollaborator_chart[chartNumber].destroy();
		        individual_commitsPerCollaborator(chartNumber, data[chartNumber], 'line', ctx_commitsPerCollaborator, individual_commitsPerCollaborator_chart);
		    }
		};
	}
}

function individual_commitsPerCollaborator(num, info, chartType, ctx_commitsPerCollaborator, individual_commitsPerCollaborator_chart){
	/*
		Additional function for generating right chart data.
	*/
	num=parseInt(num)
	ctx_commitsPerCollaborator[num] = document.getElementById('individual'+num+'_commitsPerCollaborator').getContext("2d");
	
	//Data and options for commits per collaborator
	var commitsPerCollaborator_data = individual_commitsPerCollaboratorTransformation(info);
	var commitsPerCollaborator_options = {}
	individual_commitsPerCollaborator_chart[num] = new Chart(ctx_commitsPerCollaborator[num], {
        type: chartType,
        data: commitsPerCollaborator_data,
        options: commitsPerCollaborator_options
    });
    // var b=new Chart(ctx_commitsPerCollaborator2, {
    //     type: chartType,
    //     data: commitsPerCollaborator_data,
    //     options: commitsPerCollaborator_options
    // });
    // individual_commitsPerCollaborator_chart[num]=a
    console.log(num, individual_commitsPerCollaborator_chart[num])
};

function individual_commitsPerCollaboratorTransformation (commitsPerCollaborator_data){
	/*
		Additional function for transform data into right format.
	*/
	var keyNum=0
	var labels=[]
	var colors = '#14CCCC'
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
            label: 'Activity',
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]

	}
	return commitsPerCollaborator_data;
};
