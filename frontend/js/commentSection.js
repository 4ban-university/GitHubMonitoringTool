function submitComment(form){
    var today = new Date().toString();

    var content = form.history.value;
    content += "\n------------------\nComments > "+ today +"\n\n";
    content += form.comment.value;
    content += "\n\nComments > " + today +"\n------------------\n";

    repo.writeComment(repo, content);
    form.comment.value = "";
}

function getTAComment(ob1) {
    ob1.commentBranch.then(function (response) {
        if (response) {
            console.log("branch exists: Read file");
            ob1.repo.getContents("TA_Comments", "Comments/TA_Comments.txt", true).then(function (response) {
                console.log(response.data);
                document.getElementById("ta-comments-history").innerHTML = response.data;;
                var textarea = document.getElementById('ta-comments-history');
                textarea.scrollTop = textarea.scrollHeight;
            })
        }
    });
};

getTAComment(repo);
