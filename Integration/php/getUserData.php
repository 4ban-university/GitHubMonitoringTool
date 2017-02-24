<?php
session_start();
?>
<?php require_once '../../vendor/autoload.php';


    $client = new \Github\Client();

    $user = $client->authenticate($_SESSION['token'], null, Github\Client::AUTH_HTTP_TOKEN);

    $user = $_REQUEST['user'];
    $repo = $_REQUEST['repo'];
    $method = $_REQUEST['method'];
    $collaborator = $_REQUEST['collaborator'];

    switch($method){

        case 'numberOfCommits': numberOfCommits($user,$repo,$collaborator);
            break;
        case 'numberOfIssues': numberOfIssues($user,$repo,$collaborator);
            break;
        case 'numberOfComments': numberOfComments($user,$repo,$collaborator);
            break;

    }


    /**
     * @param $user
     * @param $repo
     */
    function numberOfCommits($user, $repo,$collaborator){

        $path = $GLOBALS['client']->api('repo')->commits();
        $param = array($user, $repo, array('author'=>$collaborator));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $commits = $paginator->fetchAll($path,'all',$param);

        echo sizeof($commits);

    }

    /**
     * @param $user
     * @param $repo
     */
    function numberOfIssues($user, $repo,$collaborator){
        $path = $GLOBALS['client']->api('issue');
        $param = array($user, $repo, array('state'=>'all','creator'=>$collaborator));

        $paginator = new Github\ResultPager($GLOBALS['client']);

        $issues = $paginator->fetchAll($path,'all',$param);

        echo sizeof($issues);

    }

    function numberOfComments($user, $repo,$collaborator){
        $page = 1;
        $count = 0;
        $com = $GLOBALS['client']->getHttpClient()->get("repos/$user/$repo/issues/comments?page=$page");
        $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);

        while(sizeof($comments) > 0){
            for($j = 0; $j< sizeof($comments); $j++){
                if($comments[$j]['user']['login'] == $collaborator)
                    $count++;
            }
            $page++;
            $com = $GLOBALS['client']->getHttpClient()->get("repos/$user/$repo/issues/comments?page=$page");
            $comments = Github\HttpClient\Message\ResponseMediator::getContent($com);
        }

        echo $count;
    }
?>