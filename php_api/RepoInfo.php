<?php
session_start();
?>
<?php  require_once '../public/php/vendor/autoload.php';
//require '../Integration/php/getUserData.php';
//require '../Integration/php/getRepoData.php';

/**
 * Created by PhpStorm.
 * User: supercharlotsport
 * Date: 2017-02-26
 * Time: 5:07 PM
 */



class RepoInfo{

    var $owner;
    var $repo;
    var $totalCollaborators;
    var $collaborators;
    var $totalCommits;
    var $totalIssues;
    var $totalComments;



    public function __construct($owner, $repo){

        $client = new \Github\Client();

        $user = $client->authenticate($_SESSION['token'], null, Github\Client::AUTH_HTTP_TOKEN);



        $collaborators = $client->api('repo')->collaborators()->all($owner, $repo);

        $collaborator = array();

        $count = 0;
        foreach($collaborators as $i)
            $collaborator[$count++] = $i['login'];


        $collaborators = json_encode($collaborator);

        $token = urlencode($_SESSION['token']);

        echo "
            <script>
            var collabs = $collaborators;
            var rep = new Repo('$owner','$repo',collabs);
            </script>
            ";

    }




}