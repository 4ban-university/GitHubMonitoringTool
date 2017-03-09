<?php
session_start();
?>
<?php require_once '../../public/php/vendor/autoload.php';


    $client = new \Github\Client();

    $user = $client->authenticate($_SESSION['token'], null, Github\Client::AUTH_HTTP_TOKEN);

    if(isset($_GET['user']) && isset($_GET['repo']) && isset($_GET['method'])){
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

}

    //Getting the data from the repo

/**
 * @param $user
 * @param $repo
 */

    function numberOfCollaborators($user, $repo, $num = false){

        $collaborators = $GLOBALS['client']->api('repo')->collaborators()->all($user,$repo);

        if($num)
            return sizeof($collaborators);

        echo sizeof($collaborators);

    }

/**
 * @param $user
 * @param $repo
 */
    function getCollaborators($user, $repo, $a = false){
        $collaborators = $GLOBALS['client']->api('repo')->collaborators()->all($user, $repo);

        $collaborator = array();

        $count = 0;
        foreach($collaborators as $i)
            $collaborator[$count++] = $i['login'];

        if($a)
            return $collaborators;

        echo json_encode($collaborator);
    }

/**
 * @param $user
 * @param $repo
 */
    function numberOfCommits($user, $repo, $num = false){

        $path = $GLOBALS['client']->api('repo')->commits();
        $param = array($user, $repo, array());

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($path,'all',$param);

        if($num)
            return sizeof($commits);

        echo sizeof($commits);

    }

/**
 * @param $user
 * @param $repo
 */
    function numberOfIssues($user, $repo, $num = false){
        $path = $GLOBALS['client']->api('issue');
        $param = array($user, $repo, array('state'=>'all'));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $issues = $paginator->fetchAll($path,'all',$param);

        if($num)
            return sizeof($issues);

        echo sizeof($issues);

    }

    function numberOfComments($user, $repo, $num = false){
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
        if($num)
            return $count;

        echo $count;
    }
?>