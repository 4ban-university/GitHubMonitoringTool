# Data examples for charts.

## Line chart
![Line chart](https://github.com/abhandal/SOEN341-G4/blob/Charts_doc/Documentation/Charts/screenshots/line.png)

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
![Bar chart](https://github.com/abhandal/SOEN341-G4/blob/Charts_doc/Documentation/Charts/screenshots/bar.png)

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
