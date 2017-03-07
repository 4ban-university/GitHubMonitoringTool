// var repo = {"name": "SOEN341-G4",
// 			"description": "This repository works on keeping track of activities of each team member on each sprint to help the TAs evaluate the amount of work done as a whole team, and per team member.",
// 			"link": "https://github.com/abhandal/SOEN341-G4",
// 			"collaborators": {'1':'Aman Bhandal', '2':'Dmitry Kryukov', '3':'Charles-Philippe Labbe', '4':'Ksenia Popova', '5':'Nikita Baranov', '6':'Batoul Yehia', '7':'Raymart De Guzman', '8':'Andy Pham'},
// 			"issues": 75,
// 			"commits": 19198,
// 			"commitsPerCollaborator":{'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 42, 'Ksenia Popova': 18, 'Nikita Baranov': 11,'Batoul Yehia': 8, 'Raymart De Guzman': 10, 'Andy Pham': 13},
// 			"issuesPerCollaborator": {'Aman Bhandal': 8, 'Dmitry Kryukov': 10, 'Charles-Philippe Labbe': 29, 'Ksenia Popova': 10, 'Nikita Baranov': 12,'Batoul Yehia': 4, 'Raymart De Guzman': 1, 'Andy Pham': 1},
// 			"commentsPerCollaborator": {'Aman Bhandal': 24, 'Dmitry Kryukov': 22, 'Charles-Philippe Labbe': 20, 'Ksenia Popova': 24, 'Nikita Baranov': 21,'Batoul Yehia': 20, 'Raymart De Guzman': 22, 'Andy Pham': 24},
// 			"burndown" : {'1':35, '2':33, '3':33, '4':35, '5':33, '6':25, '7':23, '8':18, '9':15, '10':10, '11':7, '12':4, '13':1, '14':0, },
// 	};
var auth = {username: 'b5n', password: 'Bn.011010/loop'};
var repo = new Repo('abhandal','SOEN341-G4', auth);


// Additional functions
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