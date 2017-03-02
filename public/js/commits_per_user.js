var ctx_line = document.getElementById("commits_per_user_line");
var ctx_bar = document.getElementById("commits_per_user_bar");
var ctx_radar = document.getElementById("commits_per_user_radar");
var ctx_polar = document.getElementById("commits_per_user_polar");
var ctx_pie = document.getElementById("commits_per_user_pie");
var ctx_doughnut = document.getElementById("commits_per_user_doughnut");

line_chart();

function line_chart(){

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
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
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
            }
        ]
    };
    var options = {};

    var chart = new Chart(ctx_line, {
        type: 'line',
        data: data,
        options: options
    });

};