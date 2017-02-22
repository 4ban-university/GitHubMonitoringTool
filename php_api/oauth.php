<?php
session_start();
?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
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

            function userData(data, method){

                var result = -1;
                getUserData(method,data,false,function(d){
                    result = d;
                });
                return result;

            }

            function drawchart(data){

              //  document.write(data);
                var set = new Array();
                data.forEach(function(value){

                   set.push( userData(value,"numberOfIssues")
                   +userData(value,"numberOfCommits")
                   +userData(value,"numberOfComments"));


                });

            var ctx = document.getElementById("chart");

            var data = {
                labels: data,
                datasets: [
                    {
                        data: set,
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
                    }
                }
            });






            }


           window.onload = function() {
                getRepoData("getCollaborators",true,drawchart);

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

        <p>HEY: <canvas id="chart" width="400" height="400"></canvas></p>


    </body>
</html>
