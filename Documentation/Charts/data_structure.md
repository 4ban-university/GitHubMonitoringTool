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
[Chart options](http://www.chartjs.org/docs/#line-chart-chart-options)
