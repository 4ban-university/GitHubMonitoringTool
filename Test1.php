<!DOCTYPE html>
<html>
<body>
	Github API:<br>	
	
	
	
	<?php 
	/*
	
	*/
	require_once 'vendor/autoload.php';
	//------------------------------------------------------Authentication--------------------------------------------
	$usernameOrToken = $_POST["username"];
	$password = $_POST["password"];
	$method = Github\Client::AUTH_HTTP_PASSWORD;
	
	/*
	The $method can contain one of the three allowed values:

	Github\Client::AUTH_URL_TOKEN
	Github\Client::AUTH_URL_CLIENT_ID
	Github\Client::AUTH_HTTP_TOKEN
	Github\Client::AUTH_HTTP_PASSWORD
	*/
	
	//authenticate the user
	$client = new \Github\Client();
	$client->authenticate($usernameOrToken, $password, $method);
	//---------------------------------------------Add TA into the repo---------------------------------------------------
	
	//TA will have access to the repo if he is a collaborator
	//This bypass if the repo is private
	//Should ask for a repo name and will add the username of the TA (previously authenticated) to the repo
	
	/*
	Add a collaborator to a repository

	$client->api('repo')->collaborators()->add('username', 'reponame', 'KnpLabs');
	Adds the 'username' user as collaborator to the 'reponame' repository.
	*/
	//----------------------------------------------Repositories-------------------------------------------
	$repos = $client->api('repo')->all();
	
	/*
	Simple call:
		$repos = $client->api('repo')->all();
		Start from a specific repository id

		$repos = $client->api('repo')->all(1337);
		Search repos by keyword

	Simple search:
		$repos = $client->api('repo')->find('symfony');
		Returns a list of repositories.
	*/
	
	//$repositories = $client->api('user')->repositories('ornicar');
	
	
	//---------------------------------------------------Commits--------------------------------------------
	
	
	//$commit = $client->api('repo')->commits()->show('KnpLabs', 'php-github-api', '839e5185da9434753db47959bee16642bb4f2ce4');
	
	
	/*
	List commits in a branch

	$commits = $client->api('repo')->commits()->all('KnpLabs', 'php-github-api', array('sha' => 'master'));
	Returns an array of commits.

	List commits for a file

	$commits = $client->api('repo')->commits()->all('KnpLabs', 'php-github-api', array('sha' => 'master', 'path' => 'README'));
	Returns an array of commits.
	*/
	foreach($commit as $value){
		echo $value;
		
	}
	
	?>

	
</body>
</html>
