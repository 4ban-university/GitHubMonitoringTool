<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login template</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="../public/css/bootstrap.min.css" rel="stylesheet">
    <link href="../public/css/style.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div class="container">

    <div class="col-md-12">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="panel panel-primary">
                <div class="panel-heading">GitHub Repo Monitoring tool sign in</div>
                <div class="panel-body margin-bottom-1em">

                    <form class="form-login">
                        <h3 class="form-login-heading">User login</h3>

                        <div class="col-md-12 padding-no-left-right">

                            <button class="btn btn-lg btn-success btn-block" type="submit">
                                <a href="https://github.com/login/oauth/authorize?client_id=7e84f9e2e7d65f484caa&scope=user public_repo repo repo_deployment gist read write admin&redirect_uri=http://debiancp.local/SOEN341/Integration/admin.php;">
                                    Sign in with GitHub</a></button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>

</div>

<script src="../public/js/jquery-3.1.1.min.js"></script>
<script src="../public/js/bootstrap.min.js"></script>
<script src="../public/js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
