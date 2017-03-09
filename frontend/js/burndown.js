var dueDate;
function burndown(burndown){
    burndown.then(function(burndown){
        var ctx_burndown = document.getElementById('burndown'); 
        var burndown_data = burndown;
        var burndown_options = {
                chartArea: {
                            backgroundColor: 'rgba(255, 255, 255, 1)'
                }
            };

        
        var keyNum=0;
        var labels=[];

        if(dueDate){
            keyNum = dueDate;
            for (var i = 0; i<keyNum; i++)
                labels[i]='Day '+i;
        }
        else {
            for (var key in burndown_data) {
                labels[keyNum] = 'Day ' + key;
                keyNum++
            }
        }
        var keyNum=0;
        var data=[];
        for (var key in burndown_data) {
            data[keyNum]=burndown_data[key];
            keyNum++
        }

        var i = 0;
        var ideal_data = [];
        ideal_data[0]=data[0];
        var firstIssues = data[0];
        var totalDays = labels.length;
        var idealIncrement = firstIssues/(totalDays-1);
        for (var i = 1; i < labels.length; i++){
            firstIssues-=idealIncrement;
            ideal_data[i]=firstIssues

            }
        ideal_data[ideal_data.length-1] = 0;

        burndown_data = {
            labels: labels,

            datasets: [
            {
                data: data,
                label: " Burndown chart",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(75,192,192,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 0,
                spanGaps: false
            },
            {   
                data: ideal_data,
                label: " Ideal burndown chart",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(114,208,114,0.4)",
                borderColor: "rgba(114,208,114,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(114,208,114,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(114,208,114,1)",
                pointHoverBorderColor: "rgba(114,208,114,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 0,
                spanGaps: false
            }]
            

        }


        var burndown_chart = new Chart(ctx_burndown, {
            type: 'line',
            data: burndown_data,
            options: burndown_options
        });
    });
};

function setDueDate(form){
     dueDate = form.in.value;
    burndown(repo.burndown);
}

burndown(repo.burndown);