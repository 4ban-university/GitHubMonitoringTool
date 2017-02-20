<?php require_once '../../vendor/autoload.php';


    $client = new \Github\Client();

    $user = $_REQUEST['user'];
    $repo = $_REQUEST['repo'];

    $rep = $client->api('repo')->show($user, $repo);

    echo $rep['id'];

    //echo $rep['id'];
?>