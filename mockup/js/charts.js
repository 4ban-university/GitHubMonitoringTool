window.onload = function () {
    var lineChart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Line Chart"
        },
        axisX: {
            interval: 10
        },
        data: [{
            type: "line",
            dataPoints: [
                {x: 10, y: 45},
                {x: 20, y: 14},
                {x: 30, y: 20},
                {x: 40, y: 60},
                {x: 50, y: 50},
                {x: 60, y: 80},
                {x: 70, y: 40},
                {x: 80, y: 60},
                {x: 90, y: 10},
                {x: 100, y: 50},
                {x: 110, y: 40},
                {x: 120, y: 14},
                {x: 130, y: 70},
                {x: 140, y: 40},
                {x: 150, y: 90},
            ]
        }]
    });
    lineChart.render();

    var pieChart = new CanvasJS.Chart("chartContainer3",
    {
        title: {
            text: "Pie Chart"
        },
        data: [
            {
                type: "pie",
                dataPoints: [
                    {y: 4181563},
                    {y: 2175498},
                    {y: 3125844},
                    {y: 1176121},
                    {y: 1727161},
                    {y: 4303364},
                    {y: 1717786}
                ]
            }
        ]
    });
    pieChart.render();

    var areaChart = new CanvasJS.Chart("chartContainer2",
    {
        title: {
            text: "Monthly Downloads"
        },
        data: [
            {
                type: "area",
                dataPoints: [//array

                    {x: new Date(2012, 00, 1), y: 2600},
                    {x: new Date(2012, 01, 1), y: 3800},
                    {x: new Date(2012, 02, 1), y: 4300},
                    {x: new Date(2012, 03, 1), y: 2900},
                    {x: new Date(2012, 04, 1), y: 4100},
                    {x: new Date(2012, 05, 1), y: 4500},
                    {x: new Date(2012, 06, 1), y: 8600},
                    {x: new Date(2012, 07, 1), y: 6400},
                    {x: new Date(2012, 08, 1), y: 5300},
                    {x: new Date(2012, 09, 1), y: 6000}
                ]
            }
        ]
    });
    areaChart.render();

    var stepLineChart = new CanvasJS.Chart("chartContainer4", {
        title: {
            text: "Basic Step Line Chart"
        },
        axisY: {
            includeZero: false,
        },

        data: [
            {
                type: "stepArea",
                dataPoints: [
                    { x: new Date(2012, 1), y: 8.3 },
                    { x: new Date(2012, 2), y: 8.2 },
                    { x: new Date(2012, 3), y: 8.1 },
                    { x: new Date(2012, 4), y: 8.2 },
                    { x: new Date(2012, 5), y: 8.2 },
                    { x: new Date(2012, 6), y: 8.2 },
                    { x: new Date(2012, 7), y: 8.1 },
                    { x: new Date(2012, 8), y: 7.8 },
                    { x: new Date(2012, 9), y: 7.9 },
                    { x: new Date(2012, 10), y: 7.8 },
                    { x: new Date(2012, 11), y: 7.8 },
                    { x: new Date(2013, 0), y: 7.9 },
                    { x: new Date(2013, 1), y: 7.7 },
                    { x: new Date(2013, 2), y: 7.6 },
                    { x: new Date(2013, 3), y: 7.5 }
                ]
            }

        ]
    });
    stepLineChart.render();
};