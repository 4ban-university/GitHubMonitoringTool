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



function promiseRepoData(method){
    return $.ajax({
        url:"../Integration/php/getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method ,
        type: 'GET'
    });
}


function promiseUserData(method, collaborator){
    return $.ajax({
        url:"../Integration/php/getUserData.php?user=abhandal&repo=SOEN341-G4&method="+ method + "&collaborator=" + collaborator,
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
        var ctx = document.getElementById("chart");
        $(ctx).removeClass("loading");
        drawchart(labels,set, ctx.getContext("2d"));

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
        var ctx = document.getElementById("commits");
        $(ctx).removeClass("loading");
        drawchart(labels,set, ctx.getContext("2d"));

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
        var ctx = document.getElementById("issues");
        $(ctx).removeClass("loading");
        drawchart(labels,set, ctx.getContext("2d"));

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
        var ctx = document.getElementById("comments");
        $(ctx).removeClass("loading");
        drawchart(labels,set, ctx.getContext("2d"));

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



window.onload = function(){
    getRepoData("getCollaborators",true,drawOverall);
}