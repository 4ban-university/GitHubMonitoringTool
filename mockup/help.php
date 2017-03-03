<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Admin view</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/override.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">


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
                        <li><button type="button" class="btn btn-success" id = "new-repo-button">New Repository</button></li>
                        <li class="active"><a href="admin.php">All Repositories</a></li>
                        <li><a href="#">Deleted Repositories</a></li>
                    </ul>
                </div>
                
                <!-- *****************************ADD STUFF HERE******************************************************** --> 
                <div class="col-md-10">
                <div class="panel panel-info">
                    <div class="panel-heading"><h2>Help/About</h2></div>
                    <div class="panel-body">
                <h1>Help</h1>
                <h2>About us</h2>
                    <p>We are Concordia students working on a project to keep track of commits and all sorts of activities done in a project on Github. They will be stored and viewed by charts, divided by each sprint.</p>
                <h2>Frequently Asked Questions</h2>
                <h3>How do I add a repository?</h3>
                    <p>By clicking "New Repository" on the left side of the page, you can search for any repository available on
                    Github. If you want to search for all the repositories available by a particular person, search their Github username 
                    in the format of "username/" and all of their repos will be available to you. </p>
                    </div>
                </div>
                </div>
                
                <!-- **************************END OF THE ADD STUFF THING*********************************************** --> 
                
            
            <!-- NEW REPO MODAL -->
             <div class="modal fade" tabindex="-1" role="dialog" id="new-repo-modal">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Add New Repo</h4>
                        </div>
                        <div class="modal-body">
                           
                        <p>Add a new Repository URI</p>
                            
                                <div class="col-md-12 margin-top-bottom">
                                  <label for="basic-url">Format: Owner/Repo</label>
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon3">https://github.com/</span>
                                    <input type="text" class="form-control" id="repo-url" aria-describedby="basic-addon3" placeholder="user/repo">
                                        </div>
                                     <div class="alert alert-warning margin-top-bottom" role="alert" >Please enter a valid URI.</div>
                                    <div class="alert alert-warning margin-top-bottom" role="alert" >Repo does not exist.</div>
                                    <div class="alert alert-success margin-top-bottom hidden" role="alert" id="repo-added-btn" >Repo successfully added.</div>
                                    
                                </div>
                            <div class="col-md-12 margin-top-bottom repoList" id="repo-list">
                            </div>
                            
                            
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="add-repo-btn-modal">Add Repo</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-->

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

<script src="js/jquery-3.1.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/ie10-viewport-bug-workaround.js"></script>
<script src="js/admin.js"></script>
</body>
</html>