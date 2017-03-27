repo.weeklyInfo.then(function(weeklyInfo){
	var names = []
	for (var name in weeklyInfo[weeklyInfo.length-1]){
		names.push(name)
	}
	var individual_commitsPerCollaborator_chart=[];	
	var ctx_commitsPerCollaborator=[]
	var commitsPerCollaborator_data=[]
	var commitsPerCollaborator_options=[]
	var data=[]
	for (var name in names){
		var page = '<div class="chart_in" id="individual'+name+'_commitsChart">'
		page += '<h3>'+names[name]+'</h3><br>'
		page += '<div class="dataTable_in" id="individual'+name+'_commitsTable"></div>'
		page += '<div class="canvas_in" id="individual'+name+'_commitsCanvas">'
		page += '<div class="ChartType" style="display:block; text-align: center;"> \
						<label style="margin-right: 25%;" class="mdl-radio mdl-js-radio" for="individual'+name+'_lineCPC">\
							<input type="radio" id="individual'+name+'_lineCPC" name="individual'+name+'_chartType1" chartNumber='+name+' checked class="mdl-radio__button">\
							<span class="mdl-radio__label">Line</span>\
						</label>\
						<label class="mdl-radio mdl-js-radio" for="individual'+name+'_barCPC">\
							<input type="radio" id="individual'+name+'_barCPC" name="individual'+name+'_chartType1" chartNumber='+name+' class="mdl-radio__button">\
							<span class="mdl-radio__label">Bar</span>\
						</label>\
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

    $(".ind_radio").find("#individual_MixedData").next().next().addClass("outer-circle");
	individual_filter(name);
	individual_report(data, individual_commitsPerCollaborator_chart, ctx_commitsPerCollaborator, commitsPerCollaborator_data, commitsPerCollaborator_options)
	chart_plugin()
});
function individual_filter(num){
	//----------radio buttons for how to display the information
	document.getElementById('individual_TextData').onclick = function() {
	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="none"
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block"
	    	}
	    }
	};

	document.getElementById('individual_GraphicData').onclick = function() {

	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="none"
	       	 	document.getElementById("individual"+i+"_commitsCanvas").style.display="block"
	       	}
	    }
	};

	document.getElementById('individual_MixedData').onclick = function() {
	    if ( this.checked ) {
            $(".ind_radio").find("input[type=radio]").next().next().removeClass("outer-circle");
            $(this).next().next().addClass("outer-circle");
	    	for (var i=0; i<=num; i++) {
	        	document.getElementById("individual"+i+"_commitsTable").style.display="block"
	        	document.getElementById("individual"+i+"_commitsCanvas").style.display="block"
	        }
	    }
	};
};

function individual_tables(num, name, info){
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

//var ctx_commitsPerCollaborator=[]

function individual_report(data, individual_commitsPerCollaborator_chart, ctx_commitsPerCollaborator, commitsPerCollaborator_data, commitsPerCollaborator_options) {
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
