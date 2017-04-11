$.noConflict();
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
        $.getJSON("/Report/GetCategories", { 'BaseCategoryId': BaseCategoryIdval }, function (data) {
            var dataNum = data.length;
            var counter = 1;
            var alreadySeleccted = "";
            $.each(data, function (i, data) {      // bind the dropdown list using json result
                if (eval(data.CategoryId) > 0) {
                    if (eval(data.IsDataExist) > 0 && eval(isSubmit) > 0) {
                        $(".clsProcess").show();
                        alreadySeleccted += ',' + data.IsDataExist;
                    }
                    else if (tmpSubCategoryId != 'null' && eval(isSubmit) == 0) {
                        $(".clsProcess").show();
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

                    }
                    else {

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

                        $('#PlanningRequired').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + jQuery('#item_Category').val() + '" />');
                        $('#PlanningRequired').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
                        ShowProgress();
                        $("#PlanningRequired").submit();
                    }
                    else if (selectedValue == "null") {
                        $("#gridParentContainer").hide();
                        $("#igGrid_container").hide();

                    }
                    else {
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

                if (dataarray[i] !== "" && dataarray[i] != null && dataarray[i] != 'null' && dataarray[i] != 'undefined') {
                    newdtarr.push(dataarray[i]);
                }
            }
            $(".SubCategory").val(newdtarr);
            // Then refresh
            $(".SubCategory").multiselect("refresh");
            if (eval(newdtarr[0]) > 0 && eval(isSubmit) > 0) {
                $('#PlanningRequired').append('<input type="hidden" id="hdnitem_SubCategory" name="hdnitem_SubCategory" value="' + jQuery('.SubCategory').val() + '" />');
                $('#PlanningRequired').append('<input type="hidden" id="hdnitem_BaseCategory" name="hdnitem_BaseCategory" value="' + jQuery('.BaseCategory').val() + '" />');
                ShowProgress();
                $("#PlanningRequired").submit();
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

$(function () {
    $("#exportButton").hide();
    $("#gridParentContainer").hide();
    $("#igGrid_container").hide();

    var isGridHasRecord = tmpGridDataExist;
    if (isGridHasRecord === 'True') {
        $('#loading').igLoading().hide();
        $("#exportButton").show();
        $("#gridParentContainer").show();
        $("#igGrid_container").show();
        //$("#igGrid").igGridColumnFixing("fixColumn", "ModelName", false);
        //$("#igGrid").igGridColumnFixing("fixColumn", "AssemblyName", false);
    }
    else {
        $("#exportButton").hide();
        $("#gridParentContainer").hide();
        $("#igGrid_container").hide();
    }

    $.getJSON("/Report/GetBaseCategories", function (data) {
        ShowProgress();
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
                    $("#item_BaseCategory").val(baseCategoryData);
                    isGridHasRecord = tmpGridDataExist;
                    LoadSubCategories(baseCategoryData, 0);
                    if (isGridHasRecord === 'False') {
                        $('#loading').igLoading().hide();
                        $(".usermsg").html("<div class='alert alert-info fade in style='padding:7px!important''><a href='#' class='close' data-dismiss='alert'>&times;</a><strong>Info!</strong>Items Subtotal data not found</div>");
                    }
                    else if (isGridHasRecord === 'True') {
                        $("#gridParentContainer").show();
                        $("#igGrid_container").show();
                    }

                }
                else {
                    LoadSubCategories(baseCategoryData, 0);
                }
            }
            counter++;
        });
        loading.hide();
    });

    $(".BaseCategory option[value]").remove();
    $(".SubCategory option[value]").remove();
    $('#item_BaseCategory').on('change', function () {
        var optionValue = $("#item_BaseCategory").val()
        if (eval(optionValue) > 0) {
            //$('#loading').igLoading().show();
            //$('#loading').igLoading();
            //$('#PlanningRequired').append('<input type="hidden" id="hdnitem_Category" name="hdnitem_Category" value="' + $.trim($('select').val()) + '" />');
            //$("#PlanningRequired").submit();
            //ShowProgress();
            LoadSubCategories(optionValue, 1);
        }
        else {

            $("#exportButton").hide();
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
    $("#exportButton").click(function () {
        $.ig.GridExcelExporter.exportGrid(
                    $('#igGrid'),
                    {
                        fileName: 'Planning Items Subtotal',
                        worksheetName: 'Subtotal',
                    }
                );
    });

});
