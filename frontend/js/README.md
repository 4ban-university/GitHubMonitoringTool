# Chart library

### Simple HTML5 Charts using the canvas element chartjs.org

The Chart.js include Chart.js and the accompanying color parsing library. If this version is used and you require the use of the time axis, Moment.js will need to be included before Chart.js.

The Chart.bundle.js build include Moment.js in a single file. This version should be used if you require time axes and want a single file to include, select this version.



## Documentation

You can find documentation at [www.chartjs.org/docs](http://www.chartjs.org/docs). 


## Usage


You can use Chart.js CDN


```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.js"></script>
<script>
    var myChart = new Chart({...})
</script>
```

```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
<script>
    var myChart = new Chart({...})
</script>
```

Or download library and connect manually.

```javascript
<script src="/path/to/Chart.js"></script>
<script>
    var myChart = new Chart({...})
</script>
```

```javascript
// Using CommonJS
var Chart = require('chart.js')
var myChart = new Chart({...})
```

```javascript
// ES6
import Chart from 'chart.js'
let myChart = new Chart({...})
```

```javascript
// Using requirejs
require(['path/to/Chartjs'], function(Chart){
 var myChart = new Chart({...})
})
```

## Chart

```javascript
<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
</script>
```
