function getRepoData(method,async, callback){
    // Access-Control-Allow-Origin: http://sample-env.emtpabv7s6.ca-central-1.elasticbeanstalk.com
    var result;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            callback(JSON.parse(this.response));
        }
    };

    xmlhttp.open("GET", "../Integration/php/getRepoData.php?user=abhandal&repo=SOEN341-G4&method="+ method, async);


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
    xmlhttp.open("GET", "../Integration/php/getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator, async);
    xmlhttp.send();
}
function userData(data, method){

    var result = -1;
    getUserData(method,data,false,function(d){
        result = d;
    });
    return result;

}

function drawOverall(data){
    drawComments(data);
    drawCommits(data);
    drawIssues(data);
    var set = new Array();
    data.forEach(function(value){

        set.push( userData(value,"numberOfIssues")
            +userData(value,"numberOfCommits")
            +userData(value,"numberOfComments"));

    });
    var ctx = document.getElementById("chart").getContext("2d");
    drawchart(data,set, ctx);
}

function drawCommits(data){
    var set = new Array();
    data.forEach(function(value){

        set.push(userData(value,"numberOfCommits"));

    });
    var ctx = document.getElementById("commits").getContext("2d");
    drawchart(data,set, ctx);
}

function drawIssues(data){
    var set = new Array();
    data.forEach(function(value){

        set.push( userData(value,"numberOfIssues"));

    });

    var ctx = document.getElementById("issues").getContext("2d");
    drawchart(data,set, ctx);
}

function drawComments(data){
    var set = new Array();
    data.forEach(function(value){

        set.push(userData(value,"numberOfComments"));

    });
    var ctx = document.getElementById("comments").getContext("2d");
    drawchart(data,set, ctx);
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



window.onload = function(){
    getRepoData("getCollaborators",true,drawOverall);
}