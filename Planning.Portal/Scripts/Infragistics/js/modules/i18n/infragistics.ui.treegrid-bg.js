﻿/*!@license
* Infragistics.Web.ClientUI Tree Grid localization resources 16.2.20162.2040
*
* Copyright (c) 2011-2016 Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global define, jQuery */
(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( ["jquery"], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.TreeGrid) {
        $.ig.TreeGrid = {};

        $.extend($.ig.TreeGrid, {
            locale: {
                fixedVirtualizationNotSupported: 'RowVirtualization изисква различна virtualizationMode настройка, virtualizationMode трябва да бъде зададен като "continuous".'
            }
        });

        $.ig.TreeGridPaging = $.ig.TreeGridPaging || {};

        $.extend($.ig.TreeGridPaging, {
            locale: {
                contextRowLoadingText: "Зарежда...",
                contextRowRootText: "Най-горно ниво",
                columnFixingWithContextRowNotSupported: 'ColumnFixing изисква различна настройка на contextRowMode. За да включите ColumnFixing contextRowMode трябва да бъде зададен като "none".'
            }
        });

        $.ig.TreeGridFiltering = $.ig.TreeGridFiltering || {};

        $.extend($.ig.TreeGridFiltering, {
            locale: {
                filterSummaryInPagerTemplate: "${currentPageMatches} от ${totalMatches} съвпадащи записи"
            }
        });

        $.ig.TreeGridRowSelectors = $.ig.TreeGridRowSelectors || {};

        $.extend($.ig.TreeGridRowSelectors, {
        	locale: {
        	    multipleSelectionWithTriStateCheckboxesNotSupported: "Множественото селектиране изисква различна настройка на checkBoxMode. checkBoxMode трябва да бъде зададен като biState. "
        	}
        });
    }
}));// REMOVE_FROM_COMBINED_FILES