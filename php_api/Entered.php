<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php

    ?>
</head>
<body>

    <?php require_once 'vendor/autoload.php';
        //require('entry.php');
    echo 'hi';
    $client = new \Github\Client();

    //$user = $client->authenticate($_SESSION['username'],$_SESSION['password'], Github\Client::AUTH_HTTP_PASSWORD);
  //  $user = $client->authenticate("0abab00f9539752f1578", "4aaec98ffc90eba7cbb99314b1e6d8a373ef3b72",Github\Client::AUTH_URL_CLIENT_ID );






    $repo = $_GET['repo'];
    $admin = $_GET['admin'];


    $collaborators = $client->api('repo')->collaborators()->all($admin, $repo);

    $collaborator = array();

    $count = 0;
    foreach($collaborators as $i)
        $collaborator[$count++] = $i['login'];

    $commits = array();
    $issues = array();

    for($count = 0; $count < sizeof($collaborator); $count++){

        $commits[$collaborator[$count]] = countCommits($collaborator[$count]);
        $issues[$collaborator[$count]] = countIssues($collaborator[$count]);
        $comments[$collaborator[$count]] = countComments($collaborator[$count]);

        echo "<b>$collaborator[$count]</b> committed ". $commits[$collaborator[$count]].
            " times and created " . $issues[$collaborator[$count]] . " issues " . " and commented " .
            $comments[$collaborator[$count]]. " times<br>";

    }


    function countCommits($c = null){


        $a = $GLOBALS['client']->api('repo')->commits();

        $param = array($GLOBALS['admin'], $GLOBALS['repo'], array('author'=>$c));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($a,'all',$param);

        $count = sizeof($commits);

        return $count;

    }

    function countIssues($c = null){


        $a = $GLOBALS['client']->api('issue');

        $param = array($GLOBALS['admin'], $GLOBALS['repo'], array('state'=>'all','creator'=>$c));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($a,'all',$param);

        $count = sizeof($commits);


        return $count;
    }

    function countComments($c = null){
        $page = 1;
        $count = 0;
        $com = $GLOBALS['client']->getHttpClient()->get("repos/".$GLOBALS['admin']."/".$GLOBALS['repo']."/issues/comments?page=$page");
        $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);

        while(sizeof($comments) > 0){
            for($j = 0; $j< sizeof($comments); $j++){
                if($comments[$j]['user']['login'] == $c)
                    $count++;
            }
            $page++;
            $com = $GLOBALS['client']->getHttpClient()->get("repos/".$GLOBALS['admin']."/".$GLOBALS['repo']."/issues/comments?page=$page");
            $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);
        }

        return $count;
    }


    ?>

</body>
</html>