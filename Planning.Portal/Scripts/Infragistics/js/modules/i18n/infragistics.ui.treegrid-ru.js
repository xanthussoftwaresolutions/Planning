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
			    fixedVirtualizationNotSupported: 'Для RowVirtualization требуется другая установка virtualizationMode. Для virtualizationMode следует задать значение "continuous ".'
			}
		});

		$.ig.TreeGridPaging = $.ig.TreeGridPaging || {};

		$.extend($.ig.TreeGridPaging, {
			locale: {
			    contextRowLoadingText: "Загрузка...",
				contextRowRootText: "Корень",
				columnFixingWithContextRowNotSupported: 'Для ColumnFixing требуется другая установка contextRowMode. Для contextRowMode следует задать значение "none", чтобы включить ColumnFixing.'
			}
		});

		$.ig.TreeGridFiltering = $.ig.TreeGridFiltering || {};

		$.extend($.ig.TreeGridFiltering, {
			locale: {
			    filterSummaryInPagerTemplate: "${currentPageMatches} из ${totalMatches} соответствующих записей"
			}
		});

		$.ig.TreeGridRowSelectors = $.ig.TreeGridRowSelectors || {};

		$.extend($.ig.TreeGridRowSelectors, {
			locale: {
			    multipleSelectionWithTriStateCheckboxesNotSupported: "Для выбора нескольких элементов требуется другая установка checkBoxMode. Для checkBoxMode следует задать значение biState, чтобы включить функцию выбора нескольких элементов."
			}
		});
	}
}));// REMOVE_FROM_COMBINED_FILES