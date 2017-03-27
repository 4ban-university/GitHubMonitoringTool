function submitComment(form){
    /* 
        Function for adding new comment into repository
    :param form: values from html form with comment text.
    */ 
    var today = new Date().toString();
    var content = $("#ta-comments-history").html();
    //console.log(content)
    content += "<span class='bubble'><p>"+ today +"<br>";
    content += form.comment.value;
    content += "</p></span>";

    repo.writeComment(repo, content);
    form.comment.value = "";
}

function getTAComment(ob1) {
    /*
        Function recieve all previous comments from repositories
        for creating comment history on website.
    :param ob1: main repo object.
    */
    ob1.commentBranch.then(function (response) {
        if (response) {
            //console.log("branch exists: Read file");
            ob1.repo.getContents("TA_Comments", "Comments/TA_Comments.md", true).then(function (response) {
                document.getElementById("ta-comments-history").innerHTML = response.data;
                var textarea = document.getElementById('ta-comments-history');
                textarea.scrollTop = textarea.scrollHeight;
            })
        }
    });
};

getTAComment(repo);
