<?php
    session_start();
    if(isset($_SESSION['token']))
        $token = $_SESSION['token'];
    else
        header("Location: login.php");


    //setting js variables
    if(isset($_GET['name']) && isset($_GET['owner'])) {
        $repoName = $_GET['name'];
        $owner = $_GET['owner'];
        echo "<script> 
        var auth = {token: '$token'};
        var owner = '$owner';
        var repoName = '$repoName';
    </script>";
    }
    else
        header("Location: admin.php");


?>

<!doctype html>
<html lang="en">
	<head id="head">
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
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.7/dialog-polyfill.min.js"></script>


        <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
	<!-- <link rel="canonical" href="http://www.example.com/"> -->

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.cyan-light_blue.min.css">
	<link rel="stylesheet" href="css/styles.css">
	<link rel="stylesheet" href="css/additional.css">
        <link rel="stylesheet" href="css/beautifier.css">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.4.7/dialog-polyfill.min.css" />


        <script src="js/GitHub.bundle.js" ></script>

        <script src="js/repo_list.js" defer></script>
        <script src="js/test.js" defer></script>
	<script src="js/Chart.bundle.js" defer></script>
	<script src="js/repo.js" defer></script>
	<script src="js/init.js" defer></script>
	<script src="js/general_info.js" defer></script>
	<script src="js/report.js" defer></script>
	<script src="js/report_weekly.js" defer></script>
    <script src="js/report_individually.js" defer></script>
	<script src="js/burndown.js" defer></script>
    <script src="js/commentSection.js" defer></script>


</head>
    <body>
    <div
            class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header
                class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
            <div class="mdl-layout__header-row">

                <span class="mdl-layout-title">Overview</span>
                <div class="mdl-layout-spacer"></div>

                <button
                        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon"
                        id="hdrbtn">
                    <i class="material-icons">more_vert</i>
                </button>
                <ul
                        class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
                        for="hdrbtn">
                    <li class="mdl-menu__item mdl-button" type="button" id="about-btn-dialog" >About</li>
                    <li class="mdl-menu__item mdl-button" type="button" id="contact-btn-dialog" >Contact</li>
                </ul>
            </div>
        </header>

        <main class="mdl-layout__content mdl-color--grey-100"> <!-- Simple header with scrollable tabs. -->
            <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header class="mdl-layout__header">

                    <!-- Tabs -->
                    <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
                        <a href="#scroll-tab-1" class="mdl-layout__tab is-active">General info</a>
                        <a href="#scroll-tab-2" class="mdl-layout__tab">Overall Report</a>
                        <a href="#scroll-tab-3" class="mdl-layout__tab">Weekly report</a>
                        <a href="#scroll-tab-4" class="mdl-layout__tab">Individual activity report</a>
                        <a href="#scroll-tab-5" class="mdl-layout__tab">Burndown</a>
                        <a href="#scroll-tab-6" class="mdl-layout__tab">Comments</a>

                    </div>
                </header>

                <main class="mdl-layout__content">
                    <section class="mdl-layout__tab-panel is-active" id="scroll-tab-1">
                        <div class="page-content">
                            <!-- Your content goes here -->
                            <div class="mdl-grid">
                                <div class="mdl-cell mdl-cell--8-col mdl-cell--4-col-tablet" id="repo_description">
                                    <h2 id="repo_name"></h2>
                                </div>
                                <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet" id="collaborators"></div>

                            </div>
                            <div class="mdl-grid">
                                <div class="mdl-cell mdl-cell--6-col">
                                    <h3>Links to</h3>

                                    <table class="mdl-data-table mdl-js-data-table">
                                        <tr>
                                            <td class="mdl-data-table__cell--non-numeric" width="700px" id="repo_link"></td>
                                        </tr>
                                        <tr>
                                            <td class="mdl-data-table__cell--non-numeric" width="700px">Project Homepage</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="mdl-cell mdl-cell--6-col">
                                    <h3>Repository details</h3>

                                    <table class="mdl-data-table mdl-js-data-table">
                                        <tr>

                                            <td class="mdl-data-table__cell--non-numeric" width="700px" id="commits"></td>
                                        </tr>
                                        <tr>
                                            <td class="mdl-data-table__cell--non-numeric" width="700px" id="issues"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="mdl-layout__tab-panel" id="scroll-tab-2">
                        <div class="page-content">
                            <!-- Start of all weeks report -->
                            <h2>All weeks report</h2>
                            <div class="over_filters">
                                <div class="over_radio">
                                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="commitsPerCollaboratorCheck">
                                        <input type="checkbox" id="commitsPerCollaboratorCheck" name="commitsPerCollaborator" value="a1" class="mdl-checkbox__input" checked><span class="mdl-checkbox__label">Commits per collaborator</span></label><Br>
                                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="issuesPerCollaboratorCheck">
                                        <input type="checkbox" id="issuesPerCollaboratorCheck" name="issuesPerCollaborator" value="a2" class="mdl-checkbox__input" checked> <span class="mdl-checkbox__label">Issues per collaborator</span></label><Br>
                                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="commentsPerCollaboratorCheck">
                                        <input type="checkbox" id="commentsPerCollaboratorCheck" name="commentsPerCollaborator" value="a3" class="mdl-checkbox__input" checked><span class="mdl-checkbox__label">Comments per collaborator</span></label><Br>
                                </div>

                                <div class="over_radio">
                                    <label class="mdl-radio mdl-js-radio" for="TextData">
                                        <input type="radio" id="TextData" name="dataDisplayForm" class="mdl-radio__button"><span class="mdl-radio__label">Show data only in tables</span> </label><Br>
                                    <label class="mdl-radio mdl-js-radio" for="GraphicData">
                                        <input type="radio" id="GraphicData" name="dataDisplayForm" class="mdl-radio__button">
                                        <span class="mdl-radio__label">Show data only in charts</span></label><Br>
                                    <label class="mdl-radio mdl-js-radio" for="MixedData">
                                        <input type="radio" id="MixedData" name="dataDisplayForm" checked class="mdl-radio__button">
                                        <span class="mdl-radio__label">Show data both in tables and charts</span>
                                    </label><Br>
                                </div>

                            </div>

                            <div class="chart" id="commitsChart"  style="clear:left;">
                                <hr>
                                <h3>Number of commits per collaborator</h3>
                                <div class="dataTable" id="commitsTable"></div>
                                <div class="canvas" id="commitsCanvas">
                                    <div class="ChartType">
                                        <label class="mdl-radio mdl-js-radio" for="doughnutCPC">
                                            <input type="radio" id="doughnutCPC" name="chartType1" checked class="mdl-radio__button">
                                            <span class="mdl-radio__label">Doughnut</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="pieCPC">
                                            <input type="radio" id="pieCPC" name="chartType1" class="mdl-radio__button" >
                                            <span class="mdl-radio__label">Pie</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="barCPC">
                                            <input type="radio" id="barCPC" name="chartType1" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Bar</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="lineCPC">
                                            <input type="radio" id="lineCPC" name="chartType1" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Line</span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div class="chart" id="issuesChart" style="clear:left;">
                                <hr>
                                <h3>Number of issues per collaborator</h3>
                                <div class="dataTable" id="issuesTable"></div>
                                <div class="canvas" id="issuesCanvas">
                                    <div class="ChartType">
                                        <label class="mdl-radio mdl-js-radio" for="doughnutCPC">
                                            <input type="radio" id="doughnutIPC" name="chartType2" checked class="mdl-radio__button">
                                            <span class="mdl-radio__label">Doughnut</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="pieIPC">
                                            <input type="radio" id="pieIPC" name="chartType2" class="mdl-radio__button" >
                                            <span class="mdl-radio__label">Pie</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="barIPC">
                                            <input type="radio" id="barIPC" name="chartType2" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Bar</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="lineIPC">
                                            <input type="radio" id="lineIPC" name="chartType2" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Line</span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                            <div class="chart" id="commetsChart" style="clear:left;">
                                <hr>
                                <h3>Number of comments per collaborator</h3>
                                <div class="dataTable" id="commentsTable"></div>
                                <div class="canvas" id="commentsCanvas">
                                    <div class="ChartType">
                                        <label class="mdl-radio mdl-js-radio" for="doughnutCoPC">
                                            <input type="radio" id="doughnutCoPC" name="chartType3" checked class="mdl-radio__button">
                                            <span class="mdl-radio__label">Doughnut</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="pieCoPC">
                                            <input type="radio" id="pieCoPC" name="chartType3" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Pie</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="barCoPC">
                                            <input type="radio" id="barCoPC" name="chartType3" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Bar</span>
                                        </label>
                                        <label class="mdl-radio mdl-js-radio" for="lineCoPC">
                                            <input type="radio" id="lineCoPC" name="chartType3" class="mdl-radio__button">
                                            <span class="mdl-radio__label">Line</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <!-- End of all weeks report -->
                        </div>
                    </section>
                    <section class="mdl-layout__tab-panel" id="scroll-tab-3">
                        <div class="page-content" id="report_weekly">
                            <!-- Start weekly report -->


                        </div><!-- End of weekly report -->
                    </section>
                    <section class="mdl-layout__tab-panel" id="scroll-tab-4">
                        <div class="page-content" id="report_individually">
                            <!-- Start individual report -->
                            <h2>Individual activity report</h2>
                            <div class="ind_radio">
                                <label class="mdl-radio mdl-js-radio" for="individual_TextData">
                                    <input type="radio" id="individual_TextData" name="individual_dataDisplayForm" class="mdl-radio__button">
                                    <span class="mdl-radio__label">Show data only in tables</span>
                                </label>
                                <label class="mdl-radio mdl-js-radio" for="individual_GraphicData">
                                    <input type="radio" id="individual_GraphicData" name="individual_dataDisplayForm" class="mdl-radio__button">Show data only in charts<Br>
                                </label>
                                <label class="mdl-radio mdl-js-radio" for="individual_MixedData">
                                    <input type="radio" id="individual_MixedData" name="individual_dataDisplayForm" class="mdl-radio__button" checked>Show data both in tables and charts<Br>
                                </label>
                            </div><hr>

                        </div><!-- End of individual report -->
                    </section>
                    <section class="mdl-layout__tab-panel" id="scroll-tab-5">
                        <div class="page-content">
                            <!-- Your content goes here -->
                            <div class="chart" id="burndownChart">
                                <h2>Project burndown chart</h2>
                                <div class="burndownCanvas" id="burndownCanvas">
                                    <canvas id='burndown' class='visible'></canvas>
                                </div>
                                <div>
                                    <form name="due" action="" method="GET">Enter number of days:
                                        <input type="text" name="in" value="60">
                                        <input type="button" name="submit" value="click" onClick="setDueDate(this.form)">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="mdl-layout__tab-panel" id="scroll-tab-6">
                        <div class="page-content">
                            <!-- Your content goes here -->
                            <div class="comment" id="commentSection" align="center">
                                <h3>Comment</h3>
                                <form action="" method="GET">
                                    <div class="mdl-textfield mdl-js-textfield gray" margin>
                                        <textarea class="mdl-textfield__input" rows= "10" id="ta-comments" name="comment"></textarea>
                                        <label class="mdl-textfield__label" for="ta-comments"> Enter your comment here...</label>
                                    </div><br>
                                    <input class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="button" name="submit" value='comment' onClick="submitComment(this.form)">
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <dialog class="mdl-dialog" id="about-dialog">
                <h4 class="mdl-dialog__title">About</h4>
                <div class="mdl-dialog__content">
                    <p>
                        The GitHub repository monitoring tool will help the teaching assistants to monitor and grade each groups and students; by analyzing a repository and showing useful information in an easy-to-use and easy-to-understand way.
                    </p>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close">Close</button>
                </div>
            </dialog>

            <dialog class="mdl-dialog" id="contact-dialog">
                <h4 class="mdl-dialog__title">Contact</h4>
                <div class="mdl-dialog__content">
                    <p>
                        Address: 7141 Sherbrooke St W,<br>
                        Montreal, QC H4B 1R6<br>
                        Phone: (514) 848-2424<br>
                        Province: Québec
                    </p>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button close">Close</button>
                </div>
            </dialog>

        </main>
        <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <header class="demo-drawer-header">
                <span id="avatar-image"></span>
                <div class="demo-avatar-dropdown">
                    <span id="username" style="padding-top:10px;"></span>
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

            <div class="mdl-grid demo-content">
                <div class="reposTable" id="reposTable"></div>
            </div>

    </div>
    <script src="js/about_contact.js"></script>
    </body>
</html>
