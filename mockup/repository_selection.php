<?php
if(isset($_GET["repo_name"])) {
    $currentRepo = $_GET["repo_name"];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Repository Overview Page Mock-up</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/override.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">



    <script src="js/jquery-3.1.1.min.js"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>

        // an example of repository object to be used in the overview
        var soen341_g4 = {
            owner: "Abhandal",
            repoName: "SOEN341-G4",
            repoDesc: "This repository works on keeping track of activities of each team member on each sprint to help the TAs evaluate the amount of work done as a whole team, and per team member.",
            collaborators: [
                {
                    name: "Claudio Andre",
                    username: "claudio47",
                    email: "claudio@live.ca",
                    commits: {number: 33, lineAdded: 7480, lineDeleted: 2450},
                    issuesCreated: 7,
                    comments: 4,
                    lastCommit: "February 05, 2013 01:26"
                },
                {
                    name: "Johnny Boychuk",
                    username: "johnny_b",
                    email: "johnny@gmail.com",
                    commits: {number: 12, lineAdded: 2145, lineDeleted: 303},
                    issuesCreated: 5,
                    comments: 9,
                    lastCommit: "February 05, 2013 01:26"
                },
                {
                    name: "Matthew Teolis",
                    username: "matthewMan",
                    email: "matthew@hotmail.ca",
                    commits: {number: 12, lineAdded: 1978, lineDeleted: 829},
                    issuesCreated: 12,
                    comments: 11,
                    lastCommit: "February 05, 2013 01:26"
                },
                {
                    name: "Lucy Lou",
                    username: "lucy_lou",
                    email: "lucy_lou@encs.concordia.ca",
                    commits: {number: 9, lineAdded: 975, lineDeleted: 299},
                    issuesCreated: 10,
                    comments: 3,
                    lastCommit: "February 05, 2013 01:26"
                },
                {
                    name: "Leo Sanchez",
                    username: "leo_sanchez87",
                    email: "leo_sanchez87@yahoo.ca",
                    commits: {number: 6, lineAdded: 129, lineDeleted: 21},
                    issuesCreated: 3,
                    comments: 0,
                    lastCommit: "February 05, 2013 01:26"
                }
            ],
            branches: ["branch1", "branch2", "branch3", "branch4", "branch5"],
            totalCommits: 174,
            gitHubUrl: "https://github.com/abhandal/SOEN341-G4",
            projectUrl: "http://google.ca/"
        };

        // arrays of repository
        // you can have more than one
        var repositories = [
            soen341_g4
        ];


        $( document ).ready(function() {
            var $repoName = $("#repo-name"),
                $collaborators = $("#collaborators"),
                $repoDesc = $("#repo-desc"),
                $gitHubUrl = $("#gitHub-url"),
                $projectUrl = $("#project-url"),
                $totalCommits = $("#total-commits"),
                $numBranches = $("#num-branches"),
                $authorsTable = $("#authors-table");


                for(var i = 0; i < repositories.length; i++) {

                    var repoInUrl = location.search.substring(location.search.lastIndexOf("=")+1);
                    if(repositories[i].repoName.toLowerCase() == repoInUrl) {
                        console.log("yes");
                        $repoName.text(repositories[i].repoName);
                        for(var j = 0; j < repositories[i].collaborators.length; j++) {
                            $collaborators.map(function () {
                                $("#collaborators").append("<li>"+repositories[i].collaborators[j].name+"</li>");
                            });
                            $authorsTable.map(function () {

                                $("#authors-table").find("tbody").append(authorsRowTable(
                                    (j+1),
                                    repositories[i].collaborators[j].name,
                                    repositories[i].collaborators[j].commits.number,
                                    repositories[i].collaborators[j].commits.lineAdded,
                                    repositories[i].collaborators[j].commits.lineDeleted,
                                    repositories[i].collaborators[j].issuesCreated,
                                    repositories[i].collaborators[j].comments,
                                    repositories[i].collaborators[j].lastCommit
                                ))
                            });
                        }
                        $repoDesc.text(repositories[i].repoDesc);
                        $gitHubUrl.attr("href", (repositories[i].gitHubUrl));
                        $projectUrl.attr("href", (repositories[i].projectUrl));
                        $totalCommits.text(repositories[i].totalCommits);
                        $numBranches.text(repositories[i].branches.length);

                    }
                }


        });

        var authorsRowTable = function(rank, name, numCommits, linesAdded, linesDeleted, issues, comments, lastCommit) {
            var h = "";
            h += "<tr>";
                h += "<th>"+rank+"</th>";
                h += "<th>"+name+"</th>";
                h += "<td>"+numCommits+"</td>";
                h += "<td>"+linesAdded+"</td>";
                h += "<td>"+linesDeleted+"</td>";
                h += "<td>"+issues+"</td>";
                h += "<td>"+comments+"</td>";
                h += "<td>"+lastCommit+"</td>";
                h += "<td>";
                    h += '<a class="btn" href="claudio_andre/activity/by_date.html">Activity</a>';
                h += "</td>";
            h += "</tr>";
            return h;
        }

    </script>
</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top" id="adminNavbar">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav"></ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="../navbar/">Help</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">username</a></li>
                        <li><a href="#">Settings</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="#">Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>
<div class="container-fluid" id="content">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-2">
                    <ul class="nav nav-sidebar" id="nav-item">
                        <li><button type="button" class="btn btn-success">New Repository</button></li>
                        <li class="active"><a href="admin.php">All Repositories</a></li>
                        <li><a href="#">Deleted Repositories</a></li>
						<li>
                    </ul>
                </div>
                <div class="col-md-10 main">
                    <!-- Breadcrumbs -->
                    <ol class="breadcrumb">
                        <li class="active"><a href="admin.php">All Repositories</a></li>
                        <li><a href="repository_selection.php">SOEN341-G4</a></li>
                    </ol>

                    <ul class="nav nav-tabs" id="sprint-nav-tabs">
                        <li class="active"><a href="#">General Overview</a></li>
                        <li><a href="#">Authors</a></li>
                    </ul>

                    <div class="tab-content clearfix" id="sprint-tab-content">
                        <div class="tab-pane active" tab-num="1">
                            <h2 class="page-header" id="repo-name">SOEN341-G4</h2>
                            <div class="col-md-8">
                                <h3>Description</h3>
                                <p id="repo-desc"></p>
                            </div>
                            <div class="col-md-4">
                                <h3>Collaborators</h3>
                                <ul id="collaborators">
                                </ul>
                            </div>
                            <div class="col-md-4">
                                <h3>Links to</h3>
                                <div class="list-group">
                                    <a type="button" class="list-group-item" href="#" id="gitHub-url">GitHub</a>
                                    <a type="button" class="list-group-item" href="#" id="project-url">Project Homepage</a>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <h3>Repository details</h3>
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <span class="badge" id="total-commits">0</span>Total commits
                                    </li>
                                    <li class="list-group-item">
                                        <span class="badge" id="num-branches">0</span>Branches
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tab-pane ">
                            <h3>By Authors</h3>
                            <table class="table table-bordered table-hover" id="authors-table">
                                <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Author</th>
                                    <th>Commits</th>
                                    <th>Lines added</th>
                                    <th>Lines deleted</th>
                                    <th># Issues Created</th>
                                    <th># Comments</th>
                                    <th>last commit</th>
                                    <th></th>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>

            <!-- EDIT MODAL -->
            <div class="modal fade" tabindex="-1" role="dialog" id="edit-modal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Edit Repo</h4>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- DELETE MODAL -->
            <div class="modal fade" tabindex="-1" role="dialog" id="delete-modal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Delete Repo</h4>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary">Ok</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<script src="js/bootstrap.min.js"></script>
<script src="js/ie10-viewport-bug-workaround.js"></script>
<script src="js/admin.js"></script>
</body>
</html>