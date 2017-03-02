

function Repo(owner, repo, oauth) {

    var auth = {token: oauth};

    var git = new GitHub(auth);

    var repo = git.getRepo(owner, repo);

    repo.getCollaborators().then((function(response){

        document.write(response.data[0].login);

        })
    );


}


