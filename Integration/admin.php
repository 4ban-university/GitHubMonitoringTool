<?php
session_start();
?>
<?php require_once 'php/vendor/autoload.php';

if(isset($_SESSION['token'])){


    if($_SESSION['token'] === 'bad_verification_code') {
        login();
    }

    if($_SESSION['token'] === 'bad_verification_code' )
        header("Location: login.php");

}

else{
    login();
}


$token = $_SESSION['token'] ;


echo "<script> var auth = {token: '$token'};
        var owner;
        var repoName;</script>";

$repoList = array();
$repoList = json_encode($repoList);

echo "<script> var repoList = $repoList ;</script>";



function login(){
    if(isset($_GET['code'])) {
        $code = $_GET['code'];
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
        $start = strpos($body, "=") + 1;
        $length = strpos($body, '&') - $start;
        $token = substr($body, $start, $length);
        $_SESSION['token'] = $token;
    }
    else{
        header("Location: login.php");
    }
}

?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <title>GitHub Monitoring Tool</title>

        <!-- Add to homescreen for Chrome on Android -->
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="icon" sizes="192x192" href="images/android-desktop.png">

        <!-- Add to homescreen for Safari on iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Material Design Lite">
        <link rel="apple-touch-icon-precomposed" href="images/ios-desktop.png">

        <!-- Tile icon for Win8 (144x144 + tile color) -->
        <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
        <meta name="msapplication-TileColor" content="#3372DF">

        <link rel="shortcut icon" href="images/favicon.png">
        <script src="js/jquery-3.1.1.min.js"></script>
        <script src="js/material.min.js"></script>

        <script src="js/GitHub.bundle.js"></script>

        <script src="https://unpkg.com/github-api/dist/GitHub.bundle.min.js" defer></script>
        <script src="js/repo.js" defer></script>
        <script src="js/repo_list.js" defer></script>
        <script src="js/test.js" defer></script>
        <script src="js/init.js" defer></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
        <!--
        <link rel="canonical" href="http://www.example.com/">
        -->

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.cyan-light_blue.min.css">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/additional.css">
        <link rel="stylesheet" href="css/beautifier.css">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">


    </head>
    <body>
        <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">Home</span>
                    <div class="mdl-layout-spacer"></div>
                    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                        <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                            <i class="material-icons">search</i>
                        </label>
                        <div class="mdl-textfield__expandable-holder">
                            <input class="mdl-textfield__input" type="text" id="search">
                            <label class="mdl-textfield__label" for="search">Enter your query...</label>
                        </div>
                    </div>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                        <i class="material-icons">more_vert</i>
                    </button>
                    <ul
                            class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
                            for="hdrbtn">
                        <li class="mdl-menu__item mdl-button" type="button" id="about-btn-dialog" data-toggle="modal" data-target="#about-dialog">About</li>
                        <li class="mdl-menu__item mdl-button" type="button" id="contact-btn-dialog" data-toggle="modal" data-target="#contact-dialog">Contact</li>
                    </ul>
                </div>
            </header>
            <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="demo-drawer-header">
                    <div id="avatar-image"></div>
                    <div class="demo-avatar-dropdown">
                        <div id="username" style="padding-top:10px;"></div>
                        <div class="mdl-layout-spacer"></div>
                    </div>
                </header>
                <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                    <button class="mdl-button mdl-js-button mdl-button--primary" id="show-action">
                        <i class="material-icons">add</i><span>Repo</span>
                    </button>
                    <div id="repoSelection"></div>
                    <div class="mdl-layout-spacer"></div>
                    <a class="mdl-navigation__link" href="#">
                        <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i>
                        <span class="">Help</span>
                    </a>
                </nav>
            </div>
            <main class="mdl-layout__content mdl-color--grey-100">
                <div class="mdl-grid demo-content">
                    <div class="reposTable" id="reposTable"></div>
                </div>
            </main>
            <div class="modal fade" tabindex="-1" role="dialog" id="about-dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">About</h4>
                        </div>
                        <div class="modal-body">
                            <p>The GitHub repository monitoring tool will help the teaching assistants to monitor and grade each groups and students; by analyzing a repository and showing useful information in an easy-to-use and easy-to-understand way.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" tabindex="-1" role="dialog" id="contact-dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">Contact</h4>
                        </div>
                        <div class="modal-body">
                            <p>
                                Address: 7141 Sherbrooke St W,<br>
                                Montreal, QC H4B 1R6<br>
                                Phone: (514) 848-2424<br>
                                Province: Québec
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script src="js/test.js"></script>
</html>
