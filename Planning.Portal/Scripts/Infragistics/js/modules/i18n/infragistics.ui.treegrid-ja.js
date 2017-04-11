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
				fixedVirtualizationNotSupported: 'RowVirtualization に異なる virtualizationMode 設定を使用してください。virtualizationMode を "continuous" に設定してください。'
			}
		});

		$.ig.TreeGridPaging = $.ig.TreeGridPaging || {};

		$.extend($.ig.TreeGridPaging, {
			locale: {
				contextRowLoadingText: "読み込んでいます",
				contextRowRootText: "ルート",
				columnFixingWithContextRowNotSupported: "ColumnFixing に異なる contextRowMode 設定を使用してください。contextRowMode で ColumnFixing を有効にするために none に設定してください。"
			}
		});

		$.ig.TreeGridFiltering = $.ig.TreeGridFiltering || {};

		$.extend($.ig.TreeGridFiltering, {
			locale: {
				filterSummaryInPagerTemplate: "一致するレコード ${currentPageMatches} / ${totalMatches}"
			}
		});

		$.ig.TreeGridRowSelectors = $.ig.TreeGridRowSelectors || {};

		$.extend($.ig.TreeGridRowSelectors, {
			locale: {
			    multipleSelectionWithTriStateCheckboxesNotSupported: "複数セクションに他の checkBoxMode 設定を使用してください。checkBoxMode の複数セクションを有効にするために biState に設定してください。"
			}
		});
    }
}));// REMOVE_FROM_COMBINED_FILES
