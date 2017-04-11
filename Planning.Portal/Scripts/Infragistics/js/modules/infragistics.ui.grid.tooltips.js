﻿/*!@license
 * Infragistics.Web.ClientUI Grid Tooltips 16.2.20162.2040
 *
 * Copyright (c) 2011-2016 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	infragistics.ui.popover.js
 *	infragistics.ui.grid.framework.js
 */
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.ui.grid.framework","./infragistics.ui.popover"],factory)}else{factory(jQuery)}})(function($){"use strict";$.widget("ui.igGridTooltips",{options:{visibility:"overflow",style:"tooltip",showDelay:500,hideDelay:300,columnSettings:[{columnKey:null,columnIndex:-1,allowTooltips:true,maxWidth:null}],fadeTimespan:150,cursorLeftOffset:10,cursorTopOffset:15,inherit:false},css:{tooltip:"ui-iggrid-tooltip",tooltipContent:"ui-iggrid-tooltip-content"},events:{tooltipShowing:"tooltipShowing",tooltipShown:"tooltipShown",tooltipHiding:"tooltipHiding",tooltipHidden:"tooltipHidden"},_createWidget:function(){this.visible=false;this._canFadeIn=true;this._canFadeOut=true;$.Widget.prototype._createWidget.apply(this,arguments)},destroy:function(){this.grid.element.unbind(".tooltip");if(this.tooltip&&this._registered){if(this.tooltip.data("users")===1){this.tooltip.remove()}else{this.tooltip.data("users",this.tooltip.data("users")-1);this.tooltip.children("[id$='_content']").unbind("pointerenter."+this.grid.id()).unbind("MSPointerEnter."+this.grid.id()).unbind("pointerleave."+this.grid.id()).unbind("MSPointerLeave."+this.grid.id()).unbind("mouseenter."+this.grid.id()).unbind("mouseleave."+this.grid.id())}}if(this.ruler&&this._registered){if(this.ruler.data("users")===1){this.ruler.remove()}else{this.ruler.data("users",this.ruler.data("users")-1)}}this._registered=false;$.Widget.prototype.destroy.call(this);return this},id:function(){return this.tooltip[0].id},_injectGrid:function(gridInstance,isRebind){if(isRebind===true){return}this.grid=gridInstance;this._createHandlers();this._unregisterGridEvents();this._registerGridEvents()},_createTooltip:function(){var existingTooltip=this.grid._rootContainer().children("[id$='_tooltips']"),tooltipContent,closeButton=$.ig.util.isTouch;if(existingTooltip.length>0){this.tooltip=existingTooltip;this.tooltip.data("users",this.tooltip.data("users")+1)}else{if(this.options.style==="tooltip"){this.tooltip=$("<div></div>").attr("id",this.grid.id()+"_tooltips").attr("role","tooltip").addClass("ui-tooltip").addClass("ui-widget").addClass("ui-corner-all").addClass("ui-widget-content").addClass(this.css.tooltip).css({position:"absolute",display:"none","white-space":"normal","word-wrap":"break-word"});$("<div></div>").attr("id",this.id()+"_content").addClass("ui-tooltip-content").addClass(this.css.tooltipContent).appendTo(this.tooltip)}else if(this.options.style==="popover"){this.tooltip=$("<div><div>").attr("id",this.grid.id()+"_tooltips").igPopover({animationDuration:this.options.fadeTimespan,maxHeight:"auto",headerTemplate:{closeButton:closeButton}})}this.tooltip.data("users",1)}if(this.options.style==="tooltip"){tooltipContent=this.tooltip.children("[id$='_content']");if(window.navigator.msPointerEnabled||window.navigator.pointerEnabled){tooltipContent.bind("MSPointerEnter."+this.grid.id(),$.proxy(this._tooltipMouseEnter,this)).bind("pointerenter."+this.grid.id(),$.proxy(this._tooltipMouseEnter,this)).bind("MSPointerLeave."+this.grid.id(),$.proxy(this._tooltipMouseLeave,this)).bind("pointerleave."+this.grid.id(),$.proxy(this._tooltipMouseLeave,this))}else{tooltipContent.bind("mouseenter."+this.grid.id(),$.proxy(this._tooltipMouseEnter,this)).bind("mouseleave."+this.grid.id(),$.proxy(this._tooltipMouseLeave,this))}}this.tooltip.appendTo(this.grid._rootContainer())},_createRuler:function(){var existingRuler=this.grid._rootContainer().children("[id$='_ruler']");if(existingRuler.length>0){this.ruler=existingRuler;this.ruler.data("users",this.ruler.data("users")+1)}else{this.ruler=$("<div></div>").attr("id",this.id()+"_ruler").css({visibility:"hidden",position:"absolute"}).prependTo(this.grid._rootContainer());this.ruler.data("users",1)}},_displayOverflow:function(element){var ruler=this.ruler,cellTextHeight,dcell=element[0];ruler.text(element.text());ruler.css({"font-family":element.css("font-family"),"font-size":element.css("font-size"),"font-size-adjust":element.css("font-size-adjust"),"font-stretch":element.css("font-stretch"),"font-style":element.css("font-style"),"font-variant":element.css("font-variant"),"font-weight":element.css("font-weight"),"border-left":element.css("border-left"),"border-right":element.css("border-right"),"padding-left":element.css("padding-left"),"padding-top":element.css("padding-top"),"padding-right":element.css("padding-right"),"padding-bottom":element.css("padding-bottom"),overflow:element.css("overflow"),"white-space":element.css("white-space"),"word-break":element.css("word-break")});ruler.width(element.width());cellTextHeight=ruler.height();ruler.css({overflow:"visible","white-space":"normal","word-break":"break-all"});return dcell.offsetWidth<dcell.scrollWidth||dcell.scrollWidth>dcell.clientWidth||cellTextHeight<ruler.height()},_gridHeaderRendering:function(event,ui){if(ui.owner.id()!==this.grid.id()){return}this._createTooltip();this._createRuler();this._registered=true},_dataRendered:function(event,ui){var $tbody,$tbodyFixed;if(ui!==undefined){if($(ui.owner.element).attr("id")!==this.grid.id()){return}}if(!this.tooltip){this._createTooltip();this._createRuler();this._registered=true}$tbody=this.grid.element.children("tbody");this._registerMouseEvents($tbody);if(this.grid.hasFixedColumns()){$tbodyFixed=this.grid.fixedTable().find("tbody");this._registerMouseEvents($tbodyFixed)}if(this.grid.options.fixedHeaders===true){this._$thead=this.grid.headersTable().find("thead")}else{this._$thead=this.grid.container().find("#"+this.grid.id()+" thead")}},_rowsRendered:function(event,ui){var tbody;if(ui!==undefined){if($(ui.owner.element).attr("id")!==this.grid.id()){return}}tbody=this.grid.element.children("tbody");this._registerMouseEvents(tbody);if(this.grid.hasFixedColumns()){tbody=this.grid.fixedTable().find("tbody");this._registerMouseEvents(tbody)}},_registerMouseEvents:function(tbody){var binding;if(window.navigator.msPointerEnabled||window.navigator.pointerEnabled){binding={"MSPointerLeave.tooltip":this._gridMouseLeaveHandler,"pointerleave.tooltip":this._gridMouseLeaveHandler,"MSPointerMove.tooltip":this._gridMouseMoveHandler,"pointermove.tooltip":this._gridMouseMoveHandler};tbody.unbind(binding).bind(binding)}else{binding={"mouseleave.tooltip":this._gridMouseLeaveHandler,"mousemove.tooltip":this._gridMouseMoveHandler};tbody.unbind(binding).bind(binding)}},_gridMouseLeave:function(){clearTimeout(this.timeoutShowing);clearTimeout(this.timeoutHiding);if(this.tooltip.css("display")!=="none"){this._hideTooltip(true)}this._currentlyHovered=null},_gridMouseMove:function(event){var element=$(event.target).closest("td,th"),elementData,hidePrevious=true,shouldShow,hasFixedCols=this.grid.hasFixedColumns(),isFixedElement=this.grid._isFixedElement(element);if(element.closest("table").attr("id")!==this.grid.id()&&!isFixedElement||hasFixedCols&&isFixedElement&&element.closest("table").attr("id")!==this.grid.id()+"_fixed"){return}this.mouseX=event.pageX!==undefined?event.pageX:event.originalEvent.pageX;this.mouseY=event.pageY!==undefined?event.pageY:event.originalEvent.pageY;if(element[0]===this._currentlyHovered||element.length===0){return}elementData=this._getElementValue(element);if(elementData===undefined){hidePrevious=true}if(element[0]===this._currentlyDisplayed&&this.visible===true){hidePrevious=false;clearTimeout(this.timeoutHiding);return}this._currentlyHovered=element[0];this._previouslyHoveredData=this._currentlyHoveredData;this._currentlyHoveredData=elementData;clearTimeout(this.timeoutShowing);shouldShow=this._shouldShowForTarget(element)&&elementData!==undefined&&elementData!==""&&$(event.target).attr("unselectable")===undefined;if(this.visible===true&&hidePrevious===true){this._hideTooltip(!shouldShow)}if(shouldShow===true){this._currentlyDisplayed=this._currentlyHovered;this._showTooltip()}},_tooltipMouseEnter:function(){if(this.timeoutHiding!==null&&this.timeoutHiding!==undefined){clearTimeout(this.timeoutHiding)}},_tooltipMouseLeave:function(){this._hideTooltip()},_getColumnFixingInstance:function(){if(!this._columnFixing&&this.grid.element.data("igGridColumnFixing")){this._columnFixing=this.grid.element.data("igGridColumnFixing")}return this._columnFixing},_getRowIndex:function(element,row){return element.closest("tbody").children("tr:not([data-container='true'])").index(row)},_getElementValue:function(element){var col,val,tlog,i,tid,row=element.closest("tr"),key,hasFixedCols=this.grid.hasFixedColumns(),hskip=0,cf,rec,sri=this.grid._startRowIndex||0;if(this.grid.options.virtualization||this.grid.options.columnVirtualization){hskip=this.grid._startColIndex||0}if(hasFixedCols){cf=this._getColumnFixingInstance();if(element.is("th")||element.attr("data-skip")){col=-1}else{col=element.index();key=cf._getKeyByVisibleIndex(col,this.grid._isFixedElement(element))}}else{if(this._$thead.length>0){col=element.index()-this._$thead.children(":first").children("th[data-skip='true']").length+hskip}else{col=element.index()-element.parent().find("td[data-parent='true'],td[data-skip='true'],th").length+hskip}}if(col<0){return val}if(!key){key=this.grid._visibleColumns()[col].key}this._pRowIdx=this._rowIdx;this._rowIdx=this._getRowIndex(element,row);if(this.grid.options.virtualization||this.grid.options.rowVirtualization){this._rowIdx+=sri}tlog=this.grid.dataSource.pendingTransactions();tid=parseInt(element.parent().attr("data-id"),10);for(i=tlog.length-1;i>=0;i--){if(tlog[i].type==="deleterow"){continue}if(tlog[i].type==="cell"){if(tlog[i].rowId===tid&&tlog[i].col===key){rec=$.extend(true,{},this.grid.dataSource.findRecordByKey(tlog[i].rowId));rec[key]=tlog[i].value;val=this.grid.dataSource.getCellValue(key,rec);break}}else{if(tlog[i].rowId===tid){val=this.grid.dataSource.getCellValue(key,tlog[i].row);break}}}if(val===undefined&&this.grid._getDataView()[this._rowIdx]!==undefined){val=this.grid.dataSource.getCellValue(key,this.grid._getDataView()[this._rowIdx])}if($.type(val)==="date"){if(this.grid.options.enableUTCDates===true){val=$.ig.formatter(val,"date","dateTime",true,this.grid.options.enableUTCDates)}}return val},_shouldShowForTarget:function(element){var shouldShow=true,dataIdx,hasFixedColumns=this.grid.hasFixedColumns(),col;switch(this.options.visibility){case"always":break;case"never":shouldShow=false;break;case"overflow":shouldShow=this._displayOverflow(element);break}if(shouldShow===false){return false}dataIdx=element.parent().children("td:not([data-parent],[data-skip='true'])").index(element);this._pColumnIdx=this._columnIdx;if(this.grid._isMultiColumnGrid){this._columnIdx=dataIdx}else{if(hasFixedColumns&&element.closest("[data-fixed-container]").length===1){this._columnIdx=this.grid.fixedHeadersTable().find("thead th[id]").not("[data-skip='true']").eq(dataIdx).data("columnIndex")}else{this._columnIdx=this._$thead.find("th[id]").not("[data-skip='true']").eq(dataIdx).data("columnIndex")}}if(this._columnIdx===undefined||this._columnIdx===null){this._columnIdx=dataIdx}if(this._columnIdx<0||this._columnIdx>=this.grid.options.columns.length){return false}this._pColumnKey=this._columnKey;if(hasFixedColumns){col=this.grid.getColumnByTD(element);if(col){this._columnKey=col.column.key}}else{if(this.grid._isMultiColumnGrid){this._columnKey=this.grid._visibleColumns()[dataIdx].key}else{this._columnKey=this.grid.options.columns[this._columnIdx].key}}return shouldShow&&this._shouldShowForColumn()},_shouldShowForColumn:function(){var i,colSettings=this.options.columnSettings;for(i=0;i<colSettings.length;i++){if(colSettings[i].columnKey===this._columnKey||colSettings[i].columnIndex===this._columnIdx){return colSettings[i].allowTooltips!==undefined?colSettings[i].allowTooltips:true}}return true},_hideTooltip:function(current){var self=this,args,fn;args={owner:this,tooltip:current===true?String(this._currentlyHoveredData):String(this._previouslyHoveredData),value:current===true?this._currentlyHoveredData:this._previouslyHoveredData,element:this._currentlyDisplayed,columnKey:current===true?this._columnKey:this._pColumnKey,index:current===true?this._rowIdx:this._pRowIdx,columnIndex:current===true?this._columnIdx:this._pColumnIdx};fn=function(){var noCancel=self._trigger(self.events.tooltipHiding,self,args);if(noCancel===true){self._hideTooltipNoDelay();self._trigger(self.events.tooltipHidden,self,args)}};if($.ig.util.isTouch){fn()}else{clearTimeout(this.timeoutHiding);this.timeoutHiding=setTimeout(fn,this.options.hideDelay)}},_showTooltip:function(){var self=this,args,fn;args={owner:this,tooltip:String(this._currentlyHoveredData),value:this._currentlyHoveredData,element:this._currentlyDisplayed,columnKey:this._columnKey,index:this._rowIdx,columnIndex:this._columnIdx};fn=function(){var noCancel=self._trigger(self.events.tooltipShowing,self,args);if(noCancel===true){self._showTooltipNoDelay(args.tooltip);self._trigger(self.events.tooltipShown,self,args)}};if($.ig.util.isTouch){fn()}else{this.timeoutShowing=setTimeout(fn,this.options.showDelay)}},_hideTooltipNoDelay:function(){if(this.options.style==="tooltip"){if(this._canFadeOut===true){this._canFadeOut=false;this.tooltip.fadeOut(this.options.fadeTimespan,$.proxy(this._fadeOutEnd,this))}}else if(this.options.style==="popover"){this.tooltip.igPopover("hide")}this.visible=false},_showTooltipNoDelay:function(value){var tooltip;if(this._currentlyDisplayed===null){return}clearTimeout(this.timeoutHiding);tooltip=$("#"+this.id());if(this.options.style==="tooltip"){this._updateTooltip(value);if(this._canFadeIn===true){this._canFadeIn=false;tooltip.fadeIn(this.options.fadeTimespan,$.proxy(this._fadeInEnd,this))}}else if(this.options.style==="popover"){tooltip.igPopover("show",$(this._currentlyDisplayed),value)}this.visible=true},_fadeOutEnd:function(){this._canFadeOut=true},_fadeInEnd:function(){this._canFadeIn=true},_updateTooltip:function(value){var tooltipContent=this.tooltip.children("[id$='_content']");tooltipContent.text(value);tooltipContent.parent().css("max-width",this._getMaxWidth(this._columnKey,this._columnIdx,this._currentlyDisplayed));this._positionTooltip(tooltipContent.parent())},_getMaxWidth:function(colKey,colIdx,td){var colSettings=this.options.columnSettings,i;for(i=0;i<colSettings.length;i++){if(colSettings[i].columnKey===colKey||colSettings[i].columnIndex===colIdx){if(colSettings[i].maxWidth!==null&&colSettings[i].maxWidth!==undefined){return colSettings[i].maxWidth}break}}return $(td).width()},_positionTooltip:function(tooltip){var win=$(window),left,top,toffset,tfullw=tooltip.outerWidth(),tfullh=tooltip.outerHeight();toffset=$.ig.util.getRelativeOffset(tooltip);left=this.mouseX-toffset.left+this.options.cursorLeftOffset;top=this.mouseY-toffset.top+this.options.cursorTopOffset;if(left+tfullw+toffset.left>win.width()+win.scrollLeft()){left=win.width()-toffset.left-tfullw+win.scrollLeft()}if(top+tfullh+toffset.top>win.height()+win.scrollTop()){top=win.height()-toffset.top-tfullh+win.scrollTop()}tooltip.css({top:top,left:left})},_fixedColumnsChanged:function(fObj){var $tbodyFixed;if(fObj.isToFix&&fObj.isInit){$tbodyFixed=this.grid.fixedTable().find("tbody");this._registerMouseEvents($tbodyFixed)}},_createHandlers:function(){this._rowsRenderedHandler=$.proxy(this._rowsRendered,this);this._gridMouseLeaveHandler=$.proxy(this._gridMouseLeave,this);this._gridMouseMoveHandler=$.proxy(this._gridMouseMove,this);this._gridHeaderRenderingHandler=$.proxy(this._gridHeaderRendering,this)},_registerGridEvents:function(){this.grid.element.bind("iggridrowsrendered.tooltip",this._rowsRenderedHandler);this.grid.element.bind("iggridheaderrendering.tooltip",this._gridHeaderRenderingHandler)},_unregisterGridEvents:function(){this.grid.element.unbind("iggridrendered.tooltip",this._dataRenderedHandler);this.grid.element.unbind("iggridheaderrendering.tooltip",this._gridHeaderRenderingHandler)}});$.extend($.ui.igGridTooltips,{version:"16.2.20162.2040"});return $.ui.igGridTooltips});(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);