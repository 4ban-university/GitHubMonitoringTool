<?php
session_start();
?>
<?php require_once '../../vendor/autoload.php';


    $client = new \Github\Client();

    $user = $client->authenticate($_SESSION['token'], null, Github\Client::AUTH_HTTP_TOKEN);

    $user = $_REQUEST['user'];
    $repo = $_REQUEST['repo'];

    $rep = $client->api('repo')->show($user, $repo);

    echo $rep['id'];

    //echo $rep['id'];
?>