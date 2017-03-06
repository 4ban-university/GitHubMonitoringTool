$(document).ready(function () {

    //new repo button
    $("#new-repo-button").click(function(){
        $("#new-repo-modal").modal("show");
        
    });
    
    $("#add-repo-btn-modal").click(function(){
        var $repo_uri = $(this).parent().prev().children().find("#repo-url");
        var repoUri_val = $repo_uri.val();
        var user_name =  repoUri_val.substr(0, repoUri_val.indexOf("/"));
        var $repo_list_var = $("#repo-list");
        
        var repo_name = repoUri_val.substr(repoUri_val.indexOf("/")+1,repoUri_val.length);
        $(".repoList").removeClass("hidden");
        $("#repo-added-btn").addClass("hidden");
        $.ajax({
            url: "https://api.github.com/users/"+user_name+"/repos",
            success: function(data){
                var repo_array = new Array();
                var h = "";
                for(var i=0; i<data.length; i++){
                    for(var j=0; j<data.length; j++){
                        repo_array[i]=data[i]["name"];
                    }
                }
                h += '<p>'+user_name+' Repositories:</p>';
                for(var i=0; i<repo_array.length; i++){
                     h += checkbox_list(user_name, data[i]["name"], i);
                }
                
                
                var str_list = new Array();
                $("#repo-list .col-md-6").find("input[type=checkbox]:checked").map(function() {
                    //str_list += this.id;
                    str_list += $("#repo-list").find(".checked-value").eq(this.id).val();
                    $("#repo-added-btn").removeClass("hidden");
                    $(".repoList").addClass("hidden");
                });
                console.log(str_list.toString());
                
                $("#repo-list").empty();
                $("#repo-list").append(h);
               
            }
        });
         
        
        
    });
    
    
    
    // on click Edit button
    $("button[btn=edit]").click(function () {
        var $ele, $title, $description, editModalBody, editModalBodyContent;
        $ele = $(this);
        $title = $ele.parent().next();
        $description = $ele.parent().next().next();

        console.log($title.text() + " " + $description.text());
        editModalBody = $("#edit-modal").find(".modal-body");
        editModalBodyContent = editRepoModalBody($title.text(), $description.text());
        editModalBody.empty();
        editModalBody.append(editModalBodyContent);
        $("#edit-modal").modal("show");
    });

    // on click Delete button
    $("button[btn=delete]").click(function () {
        var $ele, $title, deleteModalBody, deleteModalBodyContent;
        $ele = $(this);
        $title = $ele.parent().next();
        console.log($title.text());
        deleteModalBody = $("#delete-modal").find(".modal-body");
        deleteModalBodyContent = deleteRepoModalBody($title.text(), "Are you sure you want to <strong>delete</strong> this repo?");
        deleteModalBody.empty();
        deleteModalBody.append(deleteModalBodyContent);
        $("#delete-modal").modal("show");
    });

    // on click sprint tabs toggle content view
    $("#sprint-nav-tabs").find("a").click(function () {
        var $sprintNavTabs = $("#sprint-nav-tabs"),
            $sprintTabContent = $("#sprint-tab-content");
        var listNumber = $(this).parent().index();
        console.log(listNumber);

        $sprintNavTabs.find("li").removeClass("active");
        $(this).parent().addClass("active");

        $sprintTabContent.find(".tab-pane").removeClass("active");
        $sprintTabContent.find(".tab-pane").eq(listNumber).addClass("active");
    });
});

function editRepoModalBody(title, description) {
    var h = "";
    h += '<div class="col-md-12 margin-top-1em">';
    h +=    '<div class="form-group">';
    h +=        '<label>Title:</label>';
    h +=        '<input type="text" class="form-control" value="'+title+'" aria-describedby="basic-addon1">';
    h +=    '</div>';
    h +=    '<div class="form-group">';
    h +=        '<label>Comment:</label>';
    h +=        '<textarea class="form-control" rows="5" id="comment">'+description+'</textarea>';
    h +=    '</div>';
    h += '</div>';
    return h;
}

function deleteRepoModalBody(title, message) {
    var h = "";
    h += '<div class="col-md-12 margin-top-1em">';
    h +=    '<label>Deleting Repo: '+title+'</label>';
    h +=    '<div class="alert alert-danger" role="alert">'+message+'</div>';
    h += '</div>';
    return h;
}

function checkbox_list(user_name,repo_name, checkBoxId){
   
    var h = "";
   
    h += '<div class="col-md-6 margin2-bottom">';
    h += '<div class="input-group">';
    h += '<span class="input-group-addon">';
    h += '<input type="checkbox" aria-label="..." id="'+checkBoxId+'">';
    h += '</span>';
    h += '<input type="text" class="form-control checked-value" aria-label="..." readonly value="'+repo_name+'">';
    h +=  '</div>';
    h +=   '</div>';
    return h;
}

