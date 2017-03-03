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
        case 'getCollaborators': getCollaborators($user,$repo);
            break;
        case 'numberOfCommits': numberOfCommits($user,$repo);
            break;
        case 'numberOfIssues': numberOfIssues($user,$repo);
            break;
        case 'numberOfComments': numberOfComments($user,$repo);
            break;



    }



    //Getting the data from the repo

/**
 * @param $user
 * @param $repo
 */

    function numberOfCollaborators($user, $repo){

        $collaborators = $GLOBALS['client']->api('repo')->collaborators()->all($user,$repo);

        echo sizeof($collaborators);

    }

/**
 * @param $user
 * @param $repo
 */
    function getCollaborators($user, $repo){
        $collaborators = $GLOBALS['client']->api('repo')->collaborators()->all($user, $repo);

        $collaborator = array();

        $count = 0;
        foreach($collaborators as $i)
            $collaborator[$count++] = $i['login'];

        echo json_encode($collaborator);
    }

/**
 * @param $user
 * @param $repo
 */
    function numberOfCommits($user, $repo){

        $path = $GLOBALS['client']->api('repo')->commits();
        $param = array($user, $repo, array());

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($path,'all',$param);

        echo sizeof($commits);

    }

/**
 * @param $user
 * @param $repo
 */
    function numberOfIssues($user, $repo){
        $path = $GLOBALS['client']->api('issue');
        $param = array($user, $repo, array('state'=>'all'));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $issues = $paginator->fetchAll($path,'all',$param);

        echo sizeof($issues);

    }

    function numberOfComments($user, $repo){
        $page = 1;
        $count = 0;
        $com = $GLOBALS['client']->getHttpClient()->get("repos/$user/$repo/issues/comments?page=$page");
        $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);

        while(sizeof($comments) > 0){
            $count += sizeof($comments);
            $page++;
            $com = $GLOBALS['client']->getHttpClient()->get("repos/$user/$repo/issues/comments?page=$page");
            $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);
        }

        echo $count;
    }
?>