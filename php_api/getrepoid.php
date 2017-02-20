<?php
session_start();
?>
<?php require_once '../../vendor/autoload.php';


    $client = new \Github\Client();

    $user = $client->authenticate($_SESSION['token'], null, Github\Client::AUTH_HTTP_TOKEN);

    $user = $_REQUEST['user'];
    $repo = $_REQUEST['repo'];
    $method = $_REQUEST['method'];

    $rep = $client->api('repo')->show($user, $repo);

    switch($method){
        case 'numberOfCollaborators': numberOfCollaborators($user, $repo);
            break;
        case 'numberOfCommits': numberOfCommits($user,$repo);
            break;
    }

    function numberOfCollaborators($user, $repo){

        $collaborators = $GLOBALS['client']->api('repo')->collaborators()->all($user,$repo);

        echo sizeof($collaborators);

    }

    function numberOfCommits($user, $repo){

        $path = $GLOBALS['client']->api('repo')->commits();
        $param = array($user, $repo, array());

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($path,'all',$param);

        echo sizeof($commits);

    }

    //echo $rep['id'];
?>