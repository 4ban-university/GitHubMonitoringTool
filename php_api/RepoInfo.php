<?php
session_start();
?>
<?php
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
        echo $_SESSION['token'];
        $this->owner = $owner;
        $this->repo = $repo;
        $this->totalCollaborators = numberOfCollaborators($owner,$repo, true);
        $this->collaborators = getCollaborators($owner,$repo, true);
        $this->totalCommits = numberOfCommits($owner,$repo, true);
        $this->totalIssues = numberOfIssues($owner,$repo, true);
        $this->totalComments = numberOfComments($owner,$repo, true);

        echo $this->totalCommits;


    }


}