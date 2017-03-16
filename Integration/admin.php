<?php
session_start();
?>
<?php require_once 'php/vendor/autoload.php';
if(isset($_GET['code']) ) {
    $code = $_GET['code'];
    $c = new GuzzleHttp\Client();
    // Create a POST request
    $response = $c->request(
        'POST',
        'https://github.com/login/oauth/access_token',
        [
            'form_params' => [
                'client_id' => 'aa4b1b744188bfdc5bea',
                'client_secret' => 'b2de4848fea9b13995295817da5236cc77744c99',
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
    $_SESSION['token']= $token;
}
else if(!isset($_SESSION['token']) || !isset($_GET['code']) || (isset($_SESSION['token']) && $_SESSION['token'] === 'Bad verification code' ))
    header("login.php");
else
    $token = $_SESSION['token'] ;
echo "<script> var auth = {token: '$token'};</script>";

$repoList = array();
$repoList = json_encode($repoList);
echo "<script> var repoList = $repoList ;</script>";

?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <title>Material Design Lite</title>

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

        <script src="js/repo.js" defer></script>
        <script src="js/repo_list.js" defer></script>
        <script src="js/test.js" defer></script>
        <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
        <!--
        <link rel="canonical" href="http://www.example.com/">
        -->

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.cyan-light_blue.min.css">
        <link rel="stylesheet" href="css/styles.css">
        <link rel="stylesheet" href="css/additional.css">
 
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
                    <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                        <li class="mdl-menu__item">About</li>
                        <li class="mdl-menu__item">Contact</li>
                        <li class="mdl-menu__item">Legal information</li>
                    </ul>
                </div>
            </header>
            <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <header class="demo-drawer-header">
                    <img src="images/user.jpg" class="demo-avatar">
                    <div class="demo-avatar-dropdown">
                        <span style="padding-top:10px;">hello@example.com</span>
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
        </div>
    </body>
    <script src="js/test.js"></script>
</html>
