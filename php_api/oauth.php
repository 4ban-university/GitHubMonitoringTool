<?php
session_start();
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" type="text/css" href="php_stylesheet.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
        <script   src="https://code.jquery.com/jquery-3.1.1.js"   integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA="   crossorigin="anonymous"></script>
        <script src="../mockup/js/jquery-3.1.1.min.js"></script>
        <script>



            function getRepoData(method,async, callback){
               // Access-Control-Allow-Origin: http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com
                var result;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                         callback(JSON.parse(this.response));
                    }
                };

                xmlhttp.open("GET", "getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method, async);


                xmlhttp.send();// respond to preflights


                return result;
            }

            function getUserData(method, collaborator,async, callback){

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        callback(JSON.parse(this.response));
                    }
                };
                xmlhttp.open("GET", "getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator, async);
                xmlhttp.send();
            }







            function promiseUserData(method, collaborator){
                return $.ajax({
                    url:"getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator,
                    type: 'GET'
                });
            }







            function drawOverall(data){
                drawComments(data);
                drawCommits(data);
                drawIssues(data);
                var promises = new Array();
                var set = new Array();
                var labels = new Array();
                data.forEach(function(value){
                    promises.push(promiseUserData("numberOfEvents",value).done(function(r){
                        set.push(r);
                        labels.push(value);
                    }));
                });

                //making sure all promises are finished

                Promise.all(promises).then(function(){
                    var ctx = document.getElementById("chart").getContext("2d");
                    drawchart(labels,set, ctx);

                }).catch(function(error){
                    document.write('error');
                });


            }

            function drawCommits(data){
                var promises = new Array();
                var set = new Array();
                var labels = new Array();
                data.forEach(function(value){
                    promises.push(promiseUserData("numberOfCommits",value).done(function(r){
                        set.push(r);
                        labels.push(value);
                    }));
                });

                //making sure all promises are finished

                Promise.all(promises).then(function(){
                        var ctx = document.getElementById("commits").getContext("2d");
                        drawchart(labels,set, ctx);

                }).catch(function(error){
                    document.write('error');
                });



            }

            function drawIssues(data){
                var promises = new Array();
                var set = new Array();
                var labels = new Array();
                data.forEach(function(value){
                    promises.push(promiseUserData("numberOfIssues",value).done(function(r){
                        set.push(r);
                        labels.push(value);
                    }));
                });

                //making sure all promises are finished

                Promise.all(promises).then(function(){
                    var ctx = document.getElementById("issues").getContext("2d");
                    drawchart(labels,set, ctx);

                }).catch(function(error){
                    document.write('error');
                });
            }

            function drawComments(data){
                var promises = new Array();
                var set = new Array();
                var labels = new Array();
                data.forEach(function(value){
                    promises.push(promiseUserData("numberOfComments",value).done(function(r){
                        set.push(r);
                        labels.push(value);
                    }));
                });

                //making sure all promises are finished

                Promise.all(promises).then(function(){
                    var ctx = document.getElementById("comments").getContext("2d");
                    drawchart(labels,set, ctx);

                }).catch(function(error){
                    document.write('error');
                });
            }



            function drawchart(labels, data, ctx){

                //  document.write(data);
                ctx.canvas.width = 300;
                ctx.canvas.height = 300;


                var data = {
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [
                                " #3399ff",
                                "#cc99ff",
                                "#ff99ff",
                                "#ff99cc",
                                "#ff9999",
                                "#ff9966",
                                "#ff9933",
                                "#cc6600"
                            ],
                            hoverBackgroundColor: [
                                " #3399ff",
                                "#cc99ff",
                                "#ff99ff",
                                "#ff99cc",
                                "#ff9999",
                                "#ff9966",
                                "#ff9933",
                                "#cc6600"
                            ]
                        }]
                };

                var myDoughnutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: data,
                    options: {
                        animation:{
                            animateScale:true
                        },
                        responsive: false,
                        maintainAspectRatio: true
                    }
                });






            }





           window.onload = function() {
                getRepoData("getCollaborators",true,drawOverall);

            }


        </script>
    </head>
    <body>


        <?php require_once '../../vendor/autoload.php';

        $code = $_GET['code'];


        // Initialize Guzzle client
        $c = new GuzzleHttp\Client();

        // Create a POST request
        $response = $c->request(
            'POST',
            'https://github.com/login/oauth/access_token',
            [
                'form_params' => [
                    'client_id' => '0abab00f9539752f1578',
                    'client_secret' => '4aaec98ffc90eba7cbb99314b1e6d8a373ef3b72',
                    'code' => $code
                ]
            ]
        );

        // Parse the response object, e.g. read the headers, body, etc.
       // $headers = $response->getHeaders();
        $body = $response->getBody();
        //echo $headers;
       $start =  strpos($body,"=") + 1;
       $length = strpos($body,'&') - $start;
       $token = substr($body, $start, $length);


       $_SESSION['token'] = $token;


    ?>
        <div class="loading">
        <p>OVERALL: <canvas id="chart" ></canvas>
            COMMITS:<canvas id="commits"></canvas>
            ISSUES:<canvas id="issues" ></canvas>
            COMMENTS:<canvas id="comments" ></canvas></p>
        </div>

    </body>
</html>
