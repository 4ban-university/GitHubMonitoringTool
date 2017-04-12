var dueDate;

function burndown(burndown){
    /*
        Function render burndown chart with capability to change time range.
        :param burndown: json object with data for burndown chart
    */
    burndown.then(function(burndown){
        var ctxBurndown = document.getElementById('burndown'); 
        var burndownData = burndown;
        // Generating default options object for chart.
        var burndownOptions = {
                chartArea: {
                            backgroundColor: 'rgba(255, 255, 255, 1)'
                }
        }

        
        var keyNumber=0;
        var labels=[];

        //Due date of burndown chart
        if(dueDate){
            keyNumber = dueDate;
            for (var i = 0; i<keyNumber; i++)
                labels[i]='Day '+i;
        }
        else {
            for (var key in burndownData) {
                labels[keyNumber] = 'Day ' + key;
                keyNumber++;
            }
        }

        var keyNumber=0;
        var data=[];
        for (var key in burndownData) {
            data[keyNumber]=burndownData[key];
            keyNumber++;
        }

        //Ideal chart for the burndown
        var i = 0;
        var idealData = [];
        idealData[0]=data[0];
        var firstIssues = data[0];
        var totalDays = labels.length;
        var idealIncrement = firstIssues/(totalDays-1);
        for (var i = 1; i < labels.length; i++){
            firstIssues-=idealIncrement;
            idealData[i]=firstIssues;
        }

        idealData[idealData.length-1] = 0;

        // Generate burndownData object for chart. 
        // Mostly options is default except data options.
        burndownData = {
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
                data: idealData,
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

        // Generating chart object with generated data and options.
        var burndownChart = new Chart(ctxBurndown, {
            type: 'line',
            data: burndownData,
            options: burndownOptions
        });
    });
}

function setDueDate(form){
    /*
        Function to process the due date of the burndown chart
    */
    dueDate = form.in.value;
    burndown(repo.burndown);
}

burndown(repo.burndown);