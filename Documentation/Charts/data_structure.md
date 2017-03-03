# Data examples for charts.

## Line chart
![Line chart](https://github.com/abhandal/SOEN341-G4/blob/master/Documentation/Charts/screenshots/line.png)

### Usage
```JS
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});
```

### Parameters

Define before chart call. 

```JS
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};
var options = { 
    hover: {
            mode: 'index'
}};
```
More info about options you can find in documentation: 
[Global options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options)
and 
[Line chart options](http://www.chartjs.org/docs/#line-chart-chart-options)

-------------
## Bar chart
![Bar chart](https://github.com/abhandal/SOEN341-G4/blob/master/Documentation/Charts/screenshots/bar.png)

### Usage
```JS
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});
```

### Parameters

Define before chart call. 

```JS
var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
};

var options = { };
```
More info about options you can find in documentation: 
[Global options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options)
and 
[Bar chart options](http://www.chartjs.org/docs/#bar-chart-chart-options)

-------------
## Radar chart
![Radar chart](https://github.com/abhandal/SOEN341-G4/blob/master/Documentation/Charts/screenshots/radar.png)

### Usage
```JS
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
});
```

### Parameters

Define before chart call. 

```JS
var data = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

var options = { };
```
More info about options you can find in documentation: 
[Global options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options)
and 
[Radar chart options](http://www.chartjs.org/docs/#radar-chart-chart-options)

-------------
## Polar area chart
![polar chart](https://github.com/abhandal/SOEN341-G4/blob/master/Documentation/Charts/screenshots/polar.png)

### Usage
```JS
new Chart(ctx, {
    data: data,
    type: 'polarArea',
    options: options
});
```

### Parameters

Define before chart call. 

```JS
var data = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3,
            14
        ],
        backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
        ],
        label: 'My dataset' // for legend
    }],
    labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
    ]
};

var options = { };
```
More info about options you can find in documentation: 
[Global options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options)
and 
[Polar chart options](http://www.chartjs.org/docs/#polar-area-chart-chart-options)

------------
## Pie chart
![Pie chart](https://github.com/abhandal/SOEN341-G4/blob/Charts_doc/Documentation/Charts/screenshots/pie.png)

### Usage
```JS
var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: options
});
```

### Parameters

Define before chart call. 

```JS
var data = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
};

var options = { };
```
More info about options you can find in documentation: 
[Global options](http://www.chartjs.org/docs/#chart-configuration-creating-a-chart-with-options)
and 
[Pie chart options](http://www.chartjs.org/docs/#doughnut-pie-chart-chart-options)

