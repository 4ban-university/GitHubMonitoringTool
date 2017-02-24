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

    <title>Admin view</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="../mockup/css/bootstrap.min.css" rel="stylesheet">
    <link href="../mockup/css/override.css" rel="stylesheet">
    <link href="../mockup/css/style.css" rel="stylesheet">


    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

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
                'client_id' => '7e84f9e2e7d65f484caa',
                'client_secret' => 'bcda23ce654c82d76a4d35fbde17fefb14f638cd',
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
                        <li class="active"><a href="admin.html">All Repositories</a></li>
                        <li><a href="#">Deleted Repositories</a></li>
                    </ul>
                </div>
                <div class="col-md-10 main">
                    <!-- Breadcrumbs -->
                    <ol class="breadcrumb">
                        <li class="active"><a href="admin.html">All Repositories</a></li>
                    </ol>

                    <h1 class="page-header">All Repositories</h1>

                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Options</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Owner</th>
                            <th>Date Added</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            
            
                            <td>
                                <button type="button" class="btn btn-warning"  aria-label="Left Align" btn="edit">
                                    <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger" aria-label="Left Align" btn="delete">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                </button>
                            </td>
                            <td><a href="RepositorySelection.php">SOEN341-G4</a></td>
                            <td><p>Some description here 1.</p></td>
                            <td>abhandal</td>
                            <td>9th Feb 2017, 11:08 pm</td>
                        </tr>
                        <tr>
                            <td>
                                <button type="button" class="btn btn-warning" aria-label="Left Align" btn="edit">
                                    <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger" aria-label="Left Align" btn="delete">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                </button>
                            </td>
                            <td><a href="#">MyRepo1</a></td>
                            <td><p>Some description here 2.</p></td>
                            <td>You</td>
                            <td>9th Feb 2017, 11:08 pm</td>
                        </tr>
                        <tr>
                        
                            <td>
                                <button type="button" class="btn btn-warning" aria-label="Left Align" btn="edit">
                                    <span class="glyphicon glyphicon-scissors" aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-danger" aria-label="Left Align" btn="delete">
                                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                </button>
                            </td>
                            <td><a href="#" >MyRepo2</a></td>
                            <td><p>Some description here 3.</p></td>
                            <td>You</td>
                            <td>9th Feb 2017, 11:08 pm</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
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
                            <!--
                                <p>Abhandal Repositories:</p>
                            <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <input type="checkbox" aria-label="...">
                                    </span>
                                        <input type="text" class="form-control" aria-label="..." readonly value="repo1">
                                </div>
                            </div>
                                 <div class="col-md-6">
                                <div class="input-group">
                                    <span class="input-group-addon">
                                        <input type="checkbox" aria-label="...">
                                    </span>
                                        <input type="text" class="form-control" aria-label="..." readonly value="repo2">
                                </div>
                            </div> /.col-lg-6 -->
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

<script src="../mockup/js/jquery-3.1.1.min.js"></script>
<script src="../mockup/js/bootstrap.min.js"></script>
<script src="../mockup/js/ie10-viewport-bug-workaround.js"></script>
<script src="../mockup/js/admin.js"></script>
</body>
</html>