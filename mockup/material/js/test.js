$( document ).ready(function() {
    getRepoList();
});


/*
    These are a collection of methods that display various types of modals
    ########################################################################
*/
$('#show-info').click(function () {
    showDialog({
        title: 'Information',
        text: ""
    })
});

$('#show-action').click(function () {
    getRepo();
});

$('#show-not-cancelable').click(function () {
    showDialog({
        title: 'Not cancelable',
        text: 'This dialog can only be closed by using one of the buttons.',
        negative: {
            title: 'Nope'
        },
        positive: {
            title: 'Yay'
        },
        cancelable: false
    });
});
$('#show-loading').click(function () {
    showLoading();
    setTimeout(function () {
        hideLoading();
    }, 3000);
});
//  ########################################################################

/*
    Retrives the list of repos associated with the user using the Github API
*/
function getRepo() {
	
	$.when( $.ajax("https://api.github.com/users/abhandal/repos")).done(function(data) {
		var repo_array = new Array();
		var h = "";
		var checkboxId = "checkbox-";
		for(var i=0; i<data.length; i++){
			for(var j=0; j<data.length; j++){
				repo_array[i]=data[i]["name"];
			}
		}
        
		for(var i=0; i<repo_array.length; i++){
			 h += checkbox_list(data[i]["name"], checkboxId += i );
		}
		showDialog({
			title: 'Add Repository<hr>',
			text: h,
			negative: {
				title: 'Cancel'
			},
			positive: {
				title: 'Save',
			}
		});
	});
}

/*
    Sends an array to the writeToJSON.php file which writes the array to a json file
*/
function writeToJSON(repo_array) {
    $.ajax({
        url: 'resources/writeToJSON.php',
        type: 'POST',
        data: {write:repo_array},
    });
}

/*
    Formats the output of text in the modal when the user clicks "+ Repo"
*/
function checkbox_list(repo_name, checkboxId){
   
    var h = "";
   
    h += '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="' +checkboxId+ '">';
    h += '<input type="checkbox" id="' +checkboxId+ '" class="mdl-checkbox__input repoSelection">';
    h += '<span class="mdl-checkbox__label">' +repo_name+ '</span>';
    h += '</label>';

    return h;
}


/*
    Retrives the list of repo names from the JSON file stored in resources by parsing it and appending the repo names to the index.html file
*/
function getRepoList() {
    $.getJSON("resources/userRepoSelection.json", function(data) {
        $('#repoSelection').html('');
        for(var i = 0; i < data["repoSelection"].length; i++) {
            $('#repoSelection').append('<a class="mdl-navigation__link" href="#" id="' +data["repoSelection"][i]["name"]+'"><i class="fa fa-github fa-2x" aria-hidden="true" role="presentation" style="margin-right: 10px;"></i>' +data["repoSelection"][i]["name"]+ '</a>')
        }
    });
}

/*
    Tracks changes in the checkbox when the add repo modal is open and pushes the changes to the JSON file
*/
$('#repoSelection').change(function() {
    console.log("i am here");
    //console.log($( this ).prop("checked").val());
});


/* 
    Modal Library -- Do not modify!
*/
function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false
    }, options);

    // remove existing dialogs
    $('.dialog-container').remove();
    $(document).unbind("keyup.dialog");

    $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp"></div></div>').appendTo("body");
    var dialog = $('#orrsDiag');
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<h5>' + options.title + '</h5>').appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if (options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: function () {
                    return false;
                }
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (!options.negative.onClick(e))
                    hideDialog(dialog)
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: function () {
                    return false;
                }
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (!options.positive.onClick(e))
                    hideDialog(dialog)
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function () {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}