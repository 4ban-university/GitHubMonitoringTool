<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Repository Overview </title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="../public/css/bootstrap.min.css" rel="stylesheet">
    <link href="../public/css/override.css" rel="stylesheet">
    <link href="../public/css/style.css" rel="stylesheet">

    <style>

        .loading {
            background-color: #ffffff;
            background-image: url("http://loadinggif.com/images/image-selection/3.gif");
            background-size: 25px 25px;
            background-position:center;
            background-repeat: no-repeat;
        }

    </style>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
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
                    </ul>
                </div>
                <div class="col-md-10 main">
                    <!-- Breadcrumbs -->
                    <ol class="breadcrumb">
                        <li class="active"><a href="admin.php">All Repositories</a></li>
                        <li><a href="RepositorySelection.php">SOEN341-G4</a></li>
                    </ol>
                    
                    

                    <h1 class="page-header">Repository: SOEN341-G4</h1>
                    <div class="col-md-8">
                      <h3>Description:</h3>
                    <p>This repository works on keeping track of activities of each team member on each sprint to help the TAs evaluate 
                        the amount of work done as a whole team, and per team member.</p>
                    </div>
                    <div class="col-md-4">
                      <h3>Team members</h3>
                    <ul id="collaborators">

                    </ul>

                    </div>
                    
                    
                  


                    <code>// By tabs is nicer</code>
                    <ul class="nav nav-tabs" id="sprint-nav-tabs">
                        <li class="active"><a href="#">All Sprints</a></li>
                        <li><a href="#">Sprint 1</a></li>
                        <li><a href="#">Sprint 2</a></li>
                        <li><a href="#">Sprint 3</a></li>
                        <li><a href="#">Sprint 4</a></li>
                        <li><a href="#">Sprint 5</a></li>
                        <li><a href="#">Sprint 6</a></li>
                    </ul>

                    <div class="tab-content clearfix" id="sprint-tab-content">
                        <div class="tab-pane active" tab-num="1">
                            <div id="chartContainer" style="height: 400px; width: 100%;">
                               <h3>OVERALL:</h3> <canvas id="chart" class="loading"></canvas>
                            </div>
                            <div id="chartContainer2" style="height: 400px; width: 100%;">
                                <h3>COMMITS:</h3> <canvas id="commits" class="loading"></canvas>
                            </div>
                            <div id="chartContainer3" style="height: 400px; width: 100%;">
                                <h3>ISSUES:</h3> <canvas id="issues" class="loading"></canvas>
                            </div>
                            <div id="chartContainer4" style="height: 400px; width: 100%;">
                                <h3>COMMENTS:</h3> <canvas id="comments" class="loading"></canvas>
                            </div>
                        </div>
                        <div class="tab-pane" tab-num="2">
                            <h3>Sprint 2</h3>
                        </div>
                        <div class="tab-pane">
                            <h3>Sprint 3</h3>
                        </div>
                        <div class="tab-pane">
                            <h3>Sprint 4</h3>
                        </div>
                        <div class="tab-pane">
                            <h3>Sprint 5</h3>
                        </div>
                        <div class="tab-pane">
                            <h3>Sprint 6</h3>
                        </div>
                        <div class="tab-pane">
                            <h3>All sprints</h3>
                            
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

<script src="../public/js/jquery-3.1.1.min.js"></script>
<script src="../public/js/bootstrap.min.js"></script>
<script src="../public/js/ie10-viewport-bug-workaround.js"></script>
<script src="../public/js/admin.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"></script>
<script src="js/charts.js"></script>
<script src="../public/js/canvasjs.min.js"></script>
<script src="../public/js/jquery.canvasjs.min.js"></script>
<script src="js/info.js"></script>
</body>
</html>