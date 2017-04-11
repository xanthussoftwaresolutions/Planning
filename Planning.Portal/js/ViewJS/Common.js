$.noConflict();
function ShowProgress() {

    var modal = $('<div />');
    modal.addClass("modal");
    $('body').append(modal);
    var loading = $(".loading");
    loading.addClass("overlay");
    loading.show();
    var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
    var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
    loading.css({ top: top, left: left });

}

function ValidateExtension() {
    var allowedFiles = [".xls", ".xlsx", ".csv"];
    var fileUpload = document.getElementById("uploadfile");
    var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    if (!regex.test(fileUpload.value.toLowerCase())) {
        $(".usermsg").html("<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Error!</strong> Please upload files having extensions: <b>" + allowedFiles.join(', ') + " only</div>").fadeIn(3000);
        return false;
    }
    else {
        ShowProgress();
    }

    return true;
}
