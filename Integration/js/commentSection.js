

function submitComment(form){
    var contents = form.comment.value;
    repo.writeComment(repo, contents);
    form.comment.value = "You can write something else";
}