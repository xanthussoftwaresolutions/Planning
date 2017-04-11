$.noConflict();
Date.prototype.getWeek = function () {
    var onejan = new Date(this.getFullYear(), 0, 2);
    var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
    var dayOfYear = ((today - onejan + 1) / 86400000);
    return Math.ceil(dayOfYear / 7)
};
var loading = $(".loading");
function ShowProgress() {
    var modal = $('<div />');
    modal.addClass("modal");
    $('body').append(modal);
    loading.show();
    var top = Math.max($(window).height() / 2 - loading[0].offsetHeight / 2, 0);
    var left = Math.max($(window).width() / 2 - loading[0].offsetWidth / 2, 0);
    loading.css({ top: top, left: left });
}
function LoadSubCategories(BaseCategoryIdval, isSubmit) {
    $(".SubCategory option[value]").remove();
    if (eval(BaseCategoryIdval) > 0) {
        $.getJSON("/Planning/GetCategories", { 'BaseCategoryId': BaseCategoryIdval }, function (data) {
            var dataNum = data.length;
            var counter = 1;
            var alreadySeleccted = "";
            $.each(data, function (i, data) {      // bind the dropdown list using json result
                if (eval(data.CategoryId) > 0) {
                    if (eval(data.IsDataExist) > 0 && eval(isSubmit) > 0) {
                        alreadySeleccted += ',' + data.IsDataExist;

                    }
                    else if (tmpSubCategoryId != 'null' && eval(isSubmit) == 0) {
                        alreadySeleccted = tmpSubCategoryId;

                    }
                    $('<option>',
                        {
                            value: data.CategoryId,
                            text: data.CategoryName
                        }).html(data.CategoryName).appendTo("#item_Category");
                }
                if (dataNum == counter) {
                    var categoryData = tmpSubCategoryId;
                    if (eval(categoryData) > 0) {
                        $('#item_Category').val(categoryData);
                        $("input").prop('disabled', false);
                    }
                    else {
                        $("input").prop('disabled', true);
                    }
                }
                counter++;
            });
            $('.SubCategory').multiselect('destroy');
            $('.SubCategory').multiselect({
                includeSelectAllOption: true, multiple: true, nonSelectedText: 'Select Sub Category',
                onDropdownHide: function (event) {
                    var selectedValue = '' + jQuery('.SubCategory').val() + '';
                    var splitVal = selectedValue.split(",")
                    $.each(splitVal, function (key, value) {
                        if (value === 'undefined' || value === '' || value === null || value == "null")
                            splitVal.splice(key, 1);
                    });
                    
                    if (eval(splitVal[0]) > 0 && selectedValue != tmpSubCategoryId) {

                        $('#PlanningForm').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + jQuery('#item_Category').val() + '" />');
                        $('#PlanningForm').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
                        ShowProgress();
                        $("#PlanningForm").submit();
                    }
                    else if (selectedValue == "null")
                    {
                        $("#gridParentContainer").hide();
                        $("#igGrid_container").hide();

                    }
                    else
                    {
                        $("#gridParentContainer").show();
                        $("#igGrid_container").show();
                    }


                    //   FillDevicesDropdown(jQuery('#availablePositions').val());
                    //alert(jQuery('.SubCategory').val());
                }

            });
            var dataarray = alreadySeleccted.split(",");
            var newdtarr = [];
            for (var i = 0; i < dataarray.length; i++) {

                if (dataarray[i] !== "" && dataarray[i] !== null && dataarray[i] !== 'null' && dataarray[i] !== 'undefined') {
                    newdtarr.push(dataarray[i]);
                }
            }

            $(".SubCategory").val(newdtarr);
            // Then refresh
            $(".SubCategory").multiselect("refresh");
            if (eval(newdtarr[0]) > 0 && eval(isSubmit) > 0) {
                $('#PlanningForm').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + jQuery('.SubCategory').val() + '" />');
                $('#PlanningForm').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
                ShowProgress();
                $("#PlanningForm").submit();
            }
        });
    }
    else {
        $('.SubCategory').multiselect('destroy');
        $('.SubCategory').multiselect({
            includeSelectAllOption: true, multiple: true, nonSelectedText: 'Select Sub Category',
            onDropdownHide: function (event) {
                //   FillDevicesDropdown(jQuery('#availablePositions').val());
                //alert(jQuery('.SubCategory').val());
            }

        });
    }
}
$("#saveChanges").click(function () {
    ShowProgress();
    $("#igGrid").igGrid("saveChanges");
    $("#igGrid").igGrid("saveChanges", function (data) {
        loading.hide();
        $(".usermsg").html("<div class='alert alert-success fade in style='padding:7px!important''><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Sucess!</strong> Saved successfully</div>").fadeIn(3000).fadeOut(4000);
    },
    function (jqXHR, textStatus, errorThrown) {
        $(".usermsg").html("<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Error!</strong> Error occurred</div>").fadeIn(3000).fadeOut(4000);
    });
});

$('.yes').click(function () {
    $('#confirm').removeClass('show').addClass('hide');
    $('#myDiv').removeClass('overlay');
    $('#PlanningForm').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + jQuery('.SubCategory').val() + '" />');
    $('#PlanningForm').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
    $('#PlanningForm').append('<input type="hidden" id="hdnfromDate" name="hdnfromDate" value="' + $.trim($('#fromDate').val()) + '" />');
    $('#PlanningForm').append('<input type="hidden" id="hdntoDate" name="hdntoDate" value="' + $.trim($('#toDate').val()) + '" />');
    ShowProgress();
    $("#PlanningForm").submit();
});

$('.no').click(function () {
    $('#confirm').removeClass('show').addClass('hide');
    $('#myDiv').removeClass('overlay');
    return false;
});
$(".close").click(function () {
    $('.pageContainer').append($('#gridParentContainer')); // a
    $('.modal-body').html(''); // a
    $("#popLink").show();

});
$(document).on('keydown', function (e) {
    if (e.keyCode === 27) { // ESC
        $('.pageContainer').append($('#gridParentContainer')); // a
        $('.modal-body').html(''); // a
        $("#popLink").show();
    }
});

$("#popLink").click(function () {
    $("#popLink").hide();
    $('.modal-body').html(''); // a
    $('.modal-body').append($('#gridParentContainer')); // a
});

var FieldVisiblity = null;
$(function () {

    if (tmpFromDate != undefined || tmpFromDate != null || tmpFromDate != "") {
        $('#fromDate').val(tmpFromDate);
    }
    if (tmpToDate != undefined || tmpToDate != null || tmpToDate != "") {
        $('#toDate').val(tmpToDate);
    }
    // executes when complete page is fully loaded, including all frames, objects and images
    $.getJSON("/Planning/GetBaseCategories", function (data) {
        ShowProgress();
        $(".BaseCategory option[value]").remove();
        $(".SubCategory option[value]").remove();
        var dataNum = data.length;
        var counter = 1;
        $.each(data, function (i, data) {      // bind the dropdown list using json result
            $('<option>',
               {
                   value: data.BaseCategoryId,
                   text: data.BaseCategoryName
               }).html(data.BaseCategoryName).appendTo("#item_BaseCategory");
            if (dataNum == counter) {
                var baseCategoryData = tmpBaseCategoryId;
                if (eval(baseCategoryData) > 0) {
                    $('#item_BaseCategory').val(baseCategoryData);
                    $("input").prop('disabled', false);
                    LoadSubCategories(baseCategoryData, 0);
                }
                else {
                    $("input").prop('disabled', true);
                    LoadSubCategories(baseCategoryData, 0);
                }
            }
            counter++;
        });
        loading.hide();
    });

    $("#gridParentContainer").hide();
    $("#igGrid_container").hide();

    var isGridHasRecord = tmpGridDataExist;
    if (isGridHasRecord === 'True') {
        $("#gridParentContainer").show();
        $("#igGrid_container").show();

        //$("#igGrid").igGridColumnFixing("fixColumn", "ModelName", false);
        //$("#igGrid").igGridColumnFixing("fixColumn", "AssemblyName", false);
    }
    else {
        $("#gridParentContainer").hide();
        $("#igGrid_container").hide();
    }
    $('.BaseCategory').on('change', function () {
        var optionValue = $.trim($('#item_BaseCategory').val());
        $("#gridParentContainer").hide();
        $("#igGrid_container").hide();
        $("input").val('');
        if (eval(optionValue) > 0) {
            $("#fromDate").prop('disabled', false);
            $("#toDate").prop('disabled', false);
            //$('#PlanningForm').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + $.trim($('#item_Category').val()) + '" />');
            LoadSubCategories(optionValue, 1);
            //$("#PlanningForm").submit();
            //ShowProgress();
        }
        else {
            $("input").prop('disabled', true);
            $("#gridParentContainer").hide();
            $("#igGrid_container").hide();
            $(".SubCategory option[value]").remove();
            $('.SubCategory').multiselect('destroy');
            $('.SubCategory').multiselect({
                includeSelectAllOption: true, multiple: true, nonSelectedText: 'Select Sub Category',
            });

        }
        return false;
    })

    $("#fromDate").datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (date) {
            var date2 = $('#fromDate').datepicker('getDate');
            date2.setDate(date2.getDate() + 1);
            $('#toDate').datepicker('option', 'minDate', date2);
            $("#toDate").prop('disabled', false);
        }
    });
    $('#toDate').datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (date) {

            var isGridHasRecord = tmpGridDataExist;
            var existingFromWeek = new Date(tmpFromDate).getWeek();
            var existingToWeek = new Date(tmpToDate).getWeek();
            if (isGridHasRecord === 'True' && (eval(existingFromWeek) != eval((new Date($.trim($('#fromDate').val())).getWeek())) || eval(existingToWeek) != eval((new Date($.trim($('#toDate').val())).getWeek())))) {
                $('#confirm').removeClass('hide').addClass('show');
            }
            else if (isGridHasRecord === 'False' && $.trim($('#fromDate').val()) != '' && $.trim($('#toDate').val()) != '') {
                $('#PlanningForm').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + tmpSubCategoryId + '" />');
                $('#PlanningForm').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
                $('#PlanningForm').append('<input type="hidden" id="hdnfromDate" name="hdnfromDate" value="' + $.trim($('#fromDate').val()) + '" />');
                $('#PlanningForm').append('<input type="hidden" id="hdntoDate" name="hdntoDate" value="' + $.trim($('#toDate').val()) + '" />');

                $("#PlanningForm").submit();
            }
        },
        onClose: function () {
            var dt1 = $('#fromDate').datepicker('getDate');
            var dt2 = $('#toDate').datepicker('getDate');
            //check to prevent a user from entering a date below date of dt1
            if (dt2 <= dt1) {
                var minDate = $('#toDate').datepicker('option', 'minDate');
                //$('#toDate').datepicker('setDate', minDate);
            }
        }

    });
});

//jQuery('.SubCategory').multiselect({
//    nonSelectedText: 'Select positions',
//    includeSelectAllOption: true,
//    includeSelectAllIfMoreThan: 5,
//    selectAllText: 'Select all positions',
//    maxHeight: 300,
//    buttonWidth: '100%',
//    onDropdownHide: function (event) {
//        FillDevicesDropdown(jQuery('#availablePositions').val());
//    }
//});
