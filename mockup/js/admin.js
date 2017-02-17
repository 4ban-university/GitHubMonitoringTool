$(document).ready(function () {

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

