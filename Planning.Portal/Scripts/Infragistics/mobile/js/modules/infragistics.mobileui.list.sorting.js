﻿/*!@license
 * Infragistics.Web.MobileUI ListView Sorting 16.2.20162.2040
 *
 * Copyright (c) 2011-2016 Infragistics Inc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *  jquery-1.7.2.js
 *  jquery.mobile-1.2.0.js
 *  infragistics.mobileui.list.js
 *	infragistics.dataSource.js
 *  infragistics.ui.shared.js
 *	infragistics.util.js
 */
(function($){$.widget("mobile.igListViewSorting",$.mobile.widget,{css:{sortPresets:"ui-iglist-sort-presets",preset:"ui-btn-inline ui-iglist-preset ui-btn",presetSelected:"ui-iglist-preset-selected",presetHidden:"ui-iglist-preset-hidden",listDivider:"ui-li ui-li-divider ui-btn ui-bar-{0} ui-li-has-count",count:"ui-li-count ui-btn-up-{0} ui-btn-corner-all ui-btn",presetFooterText:"ui-iglist-tray-footer-item ig-tray-sort-preset",separatorFooterText:"ui-iglist-tray-footer-sep",insetDivider:"ui-corner-all",insetTopItem:"ui-corner-top",insetBottomItem:"ui-corner-bottom",collapsibleDivider:"ui-li-has-count",firstCollapsibleContainer:"ui-iglist-collapsible"},options:{type:null,caseSensitive:false,sortPresetsLabel:null,sortState:"default",sortUrlKey:null,sortUrlKeyAscValue:null,sortUrlKeyDescValue:null,customSortFunction:null,sortedFields:[{fieldName:"",direction:""}],showGrouping:false,groupComparerFunction:null,groupNameFunction:null,presets:[{text:"",sortedFields:[{fieldName:"",direction:""}],showGrouping:false,groupComparerFunction:null,groupNameFunction:null}],dividerTemplate:null,listDividerTheme:"b",countTheme:"c",presetTheme:"c",autoGenerateSortPresets:true,groupingSettings:{enableCollapsibleDividers:false,showCountBubble:true,initialExpandedState:"expanded",collapsedIcon:"plus",expandedIcon:"minus",expandedCueText:null,collapsedCueText:null}},events:{presetChanging:"presetChanging",presetChanged:"presetChanged"},_createWidget:function(){var options=this.options;options.sortedFields=[];options.presets=null;$.Widget.prototype._createWidget.apply(this,arguments)},_create:function(){var self=this,noCancel;this._presetTapHandler=function(evnt){var target=self.list._itemFromTarget(evnt.target,"li","idx"),state,$li,liLeft,liWidth,$div,divWidth,divScrollLeft,newLeft,preset;if(target&&target.getAttribute("sorted")===null){$li=$(target);state=$li.attr("idx");noCancel=self._trigger(self.events.presetChanging,null,{state:state,owner:self});if(noCancel){liLeft=$li.offset().left;liWidth=$li.outerWidth();$div=$li.parent().parent();divWidth=$div.outerWidth();divScrollLeft=$div.scrollLeft();$li.attr("sorted",1).addClass(self.css.presetSelected).siblings().attr("sorted",null).removeClass(self.css.presetSelected);self.options.sortState=state;self._clearGroupingInformation();if(liLeft+liWidth>divWidth){newLeft=divScrollLeft+liWidth;$div.animate({scrollLeft:newLeft},function(){self._refreshPresets($div)})}else if(liLeft<0){newLeft=divScrollLeft-liWidth;$div.animate({scrollLeft:newLeft},function(){self._refreshPresets($div)})}preset=self.options.presets[self.options.sortState];self._adjustTrayText(preset);$.mobile.loading("show");self._shouldFirePresetChanged=true;self._resort()}}};this._updateCss()},_setOption:function(key,value){var o=this.options,css=this.css,oldCss;if(o[key]===value){return}if(key==="groupingSettings"){this._cleanUpList()}$.Widget.prototype._setOption.apply(this,arguments);if(key==="type"||key==="autoGenerateSortPresets"||key==="presets"){throw new Error(this.list._locale("optionChangeNotSupported")+" "+key)}else if(key==="caseSensitive"){this.list.dataSource.settings.sorting.caseSensitive=this.options.caseSensitive}else if(key==="sortState"){o.sortState=value;this.list.container().find("."+css.sortPresets).find("[idx='"+value+"']").attr("sorted",1).addClass(css.presetSelected).siblings().attr("sorted",null).removeClass(css.presetSelected);this._adjustTrayText(o.presets[o.sortState]);this._resort()}else if(key==="dividerTemplate"||key==="countTheme"||key==="listDividerTheme"||(key==="groupComparerFunction"||key==="showGrouping"||key==="groupNameFunction")&&o.sortState==="default"){if(key.indexOf("Theme")>-1){this._updateCss()}this.list._rerenderAllData()}else if(key==="presetTheme"){oldCss=$.extend(true,{},this.css);this._updateCss();this.list.container().find("."+css.sortPresets).find("li").removeClass(oldCss.preset).addClass(css.preset)}else if(key==="sortPresetsLabel"){this.list.container().find("."+css.sortPresets).children("span").html(this._locale("sortPresetsLabel"))}else if(key==="sortedFields"&&o.sortState==="default"){this._resort()}else if(key==="groupingSettings"){if(this.list.options.inset){if(value.enableCollapsibleDividers&&this.list.listElement.hasClass(this.list.css.insetList.split(" ")[0])){this.list.listElement.removeClass(this.list.css.insetList)}else if(!value.enableCollapsibleDividers&&!this.list.listElement.hasClass(this.list.css.insetList.split(" ")[0])){this.list.listElement.addClass(this.list.css.insetList)}}this.list._rerenderAllData()}},_locale:function(key){var o=this.options,val=o[key];if((val===undefined||val===null)&&o.groupingSettings){val=o.groupingSettings[key]}if(val===undefined||val===null){val=$.ig.mobileListViewSorting&&$.ig.mobileListViewSorting.locale?$.ig.mobileListViewSorting.locale[key]:null}return val||""},_updateCss:function(){var css=$.extend(true,{},$.mobile.igListViewSorting.prototype.css),opts=this.options;css.count=css.count.replace("{0}",opts.countTheme);css.listDivider=css.listDivider.replace("{0}",opts.listDividerTheme);css.preset=css.preset.replace("{0}",opts.presetTheme);this.css=css},_adjustTrayText:function(preset){var showing,prevShown;if(this._presetSpan){if(preset){showing=this._presetSpan.text()==="";this._presetSpan.text(preset.text).prev().show();if(showing){$(this._presetSpan.prevAll("[data-trayRole='keyword']").get().reverse()).each(function(i){if(i>0&&$(this).text()&&prevShown){$(this).prev().prev().show();prevShown=false}if(!prevShown){prevShown=$(this).text().length>0}});if(prevShown){this._presetSpan.prev().prev().show()}this._presetSpan.nextAll("[data-trayRole='empty']").hide().next().hide()}}else{this._presetSpan.text("").prev().hide().prev().hide();$(this._presetSpan.prevAll("[data-trayRole='keyword']").get().reverse()).each(function(i){if(i>0&&!$(this).text()&&prevShown){$(this).prev().prev().hide();prevShown=false}if(!prevShown){prevShown=$(this).text().length>0}});if(!this._presetSpan.prevAll("[data-trayRole='keyword']").text()){this._presetSpan.nextAll("[data-trayRole='empty']").show().next().show()}}}},group:function(fields,defaultDirection,trayText,groupComparerFunction,groupNameFunction){if(fields&&fields.length>0){this._shouldGroup=true;this._grpFx=groupComparerFunction;this._nameFx=groupNameFunction;this._grpField=fields[0].fieldName}this._keepGrouping=true;this.sort(fields,defaultDirection,trayText)},sort:function(fields,defaultDirection,trayText){var x,index=0,sortedFields=[],options=this.options,css=this.css;for(x=0;fields&&x<fields.length;++x){sortedFields[index]={fieldName:fields[x].fieldName,dir:fields[x].direction};if(sortedFields[index].dir===undefined||sortedFields[index].dir===null){if(defaultDirection!==null&&defaultDirection!==undefined){sortedFields[index].dir=defaultDirection}else{sortedFields[index].dir="asc"}}index++}options.sortState="custom";if(options.presets&&options.presets.length>0){this.list.container().find("."+css.sortPresets).find("."+css.presetSelected).removeClass(css.presetSelected).attr("sorted",null);this._adjustTrayText(trayText?{text:trayText}:null)}if(!this._keepGrouping){this._clearGroupingInformation()}delete this._keepGrouping;this._resort(true,sortedFields)},_resort:function(renderData,sortedFields){var x,sorting=this.options.sortState,index=0,args,options=this.options,dataSource=this.list.dataSource;if(renderData===undefined){renderData=true}if(sortedFields===undefined){sortedFields=[]}if(sorting!==null&&sorting!==""){if(sorting==="default"){sorting=options.sortedFields}else if(sorting!=="custom"){index=parseInt(sorting,10);sorting=options.presets[index].sortedFields}if($.type(sorting)==="array"){index=0;for(x=0;x<sorting.length;++x){sortedFields[index]={fieldName:sorting[x].fieldName,dir:sorting[x].direction};if(sortedFields[index].dir===undefined||sortedFields[index].dir===null){sortedFields[index].dir="asc"}index++}}}dataSource.settings.paging.appendPage=false;if(dataSource.settings.paging.type==="remote"&&"local"===dataSource.settings.sorting.type){this._oldPagingIndex=dataSource.settings.paging.pageIndex;dataSource.settings.sorting.defaultFields=sortedFields}dataSource.settings.paging.pageIndex=0;this.list._requireRecordsClear=true;args={sortedFields:sortedFields};this._trigger("_sortChanging",null,args);if(this.list.options.bindings.isDividerKey&&!args.handled){this._filterOutDividers(sortedFields)}dataSource.settings.sorting.expressions=sortedFields;if(options.type==="local"){if(sortedFields.length>0){dataSource.sort(sortedFields,"asc")}else{dataSource.clearLocalSorting()}if(renderData){this.list._renderData()}dataSource.settings.paging.appendPage=true}else{if(renderData){dataSource.dataBind()}}},_filterOutDividers:function(sortedFields){var filterDividers=[],dataSource=this.list.dataSource;if(sortedFields.length>0){filterDividers[0]={fieldName:this.list.options.bindings.isDividerKey,cond:"false",logic:"And"}}dataSource.settings.filtering.expressions=filterDividers;if(this.options.type==="local"){if(filterDividers.length>0){dataSource.filter(filterDividers,"AND")}else{dataSource.settings.sorting.expressions=[];dataSource.clearLocalFilter()}}},_cmp:function(groupComparerFunction,val1,val2){if(groupComparerFunction){if(typeof groupComparerFunction==="function"){return groupComparerFunction(val1,val2)}return window[groupComparerFunction](val1,val2)}return val1===val2},_groupName:function(groupNameFunction,val){if(groupNameFunction){if(typeof groupNameFunction==="function"){return groupNameFunction(val)}return window[groupNameFunction](val)}return val},_getPresetByFirstFieldName:function(fieldName){var x,options=this.options,presets=options.presets;if(presets){for(x=0;x<presets.length;++x){if(presets[x].sortedFields&&presets[x].sortedFields.length>0&&presets[x].sortedFields[0].fieldName===fieldName){return presets[x]}}}return null},_renderingTray:function(e,ui){var self=this,wrapper,x,j=0,index,fields,fieldName,presets,sortedFields=[],dataSource=this.list.dataSource,options=this.options,css=this.css;if(e.target.id!==this.list.element[0].id){return}if(options.groupingSettings.enableCollapsibleDividers&&this.list.options.inset){this.list.listElement.removeClass(this.list.css.insetList)}if(options.autoGenerateSortPresets){if(options.presets===undefined||options.presets===null){options.presets=[]}fields=dataSource.schema()?dataSource.schema().fields():null;index=parseInt(options.sortState,10);for(x=0;fields&&x<fields.length;++x,++j){fieldName=fields[x].name;if(fieldName&&!this._getPresetByFirstFieldName(fieldName)){options.presets.push({text:fieldName,sortedFields:[{fieldName:fieldName}]});if(j===index){presets=options.presets[j].sortedFields}}}if(presets&&presets.length>0&&(!dataSource.settings.sorting.defaultFields||!dataSource.settings.sorting.defaultFields.length||dataSource.settings.sorting.defaultFields[0].fieldName!==presets[0].fieldName)){for(x=0;x<presets.length;++x){sortedFields[sortedFields.length]={fieldName:presets[x].fieldName,dir:presets[x].direction};if(sortedFields[x].dir===undefined||sortedFields[x].dir===null){sortedFields[x].dir="asc"}}dataSource.settings.sorting.defaultFields=sortedFields;dataSource.settings.sorting.expressions=sortedFields;if(this.list.options.bindings&&this.list.options.bindings.isDividerKey){if(sortedFields&&sortedFields.length>0){this._needToFilterDividers=sortedFields}}}}if(options.autoGenerateSortPresets||options.presets&&options.presets.length>0){ui.needTray=2;if(ui.css.indexOf("one")>-1){ui.css=ui.css.replace("one","two")}else{ui.css=ui.css+"-one"}wrapper=$("<div />").addClass(css.sortPresets).append("<span>"+this._locale("sortPresetsLabel")+"</span>").append("<div><ul></ul></div>").find("ul").bind("click",this._presetTapHandler);wrapper.append("<li class='"+css.preset+"' idx='default'>"+this._locale("sortDefaultStateText")+"</li>");for(x=0;options.presets&&x<options.presets.length;++x){wrapper.append($("<li class='"+css.preset+"' idx='"+x+"'>"+options.presets[x].text+"</li>"))}index=parseInt(options.sortState,10)+1;if(isNaN(index)){index=0}wrapper.children().eq(index).addClass(css.presetSelected);if(!ui.tray){ui.tray=$("<div />")}wrapper.children().eq(index).addClass(this.css.presetSelected);wrapper=wrapper.parent().bind({scroll:function(){self._refreshPresets()}});if(wrapper.scrollview){wrapper.scrollview()}else if(wrapper.igScroll){wrapper.igScroll({cancelStart:true})}wrapper.parent().appendTo(ui.tray)}},_renderedTray:function(){var self=this,$win=$(window);if(this.options.presets&&this.options.presets.length>0){this._refreshPresets();$win.bind("resize",function(){self._refreshPresets()});$win.bind("orientationchange",function(){self._refreshPresets()})}},_refreshPresets:function(parent){var activePage=$.mobile.activePage,listPage=this.list.element.closest(".ui-page"),css=this.css;if(activePage&&activePage[0]===listPage[0]){if(!parent){parent=this.list.container().find("."+css.sortPresets)}$(parent).find("li").removeClass(css.presetHidden).each(function(i,val){var $div=$(val.parentNode.parentNode),$li=$(val),liLeft=$li.offset().left,liWidth=$li.width(),divWidth=$div.outerWidth(),divLeft=Math.min(0,$div.offset().left);if(liLeft+liWidth>divWidth+divLeft||liLeft<divLeft){$li.addClass(css.presetHidden)}})}},_renderingTrayFooterBar:function(e,ui){var options=this.options,presets=options.presets,css=this.css;if(presets&&presets.length>0||options.autoGenerateSortPresets){ui.trayFooter.append("<span style='display:none;' class='"+css.separatorFooterText+"' data-trayRole='bullet'> &bull; </span>").append("<span class='"+css.separatorFooterText+"' style='display:none;'> "+this._locale("sortByLabel")+" </span>").append(this._presetSpan=$("<span data-trayRole='keyword' class='"+css.presetFooterText+"'></span>"));if(options.sortState!=="default"&&options.sortState!=="custom"&&presets[options.sortState]){this._presetSpan.text(presets[options.sortState].text).prev().show();if(this._presetSpan.prevAll("[data-trayRole='keyword']").text()){this._presetSpan.prev().prev().show()}}}},_itemsRendering:function(e,ui){var sortState=this.options.sortState,index,preset,css=this.css,groupingField,i=ui.index,ds=ui.dataView,lastItem,dividerCss=css.listDivider,wrapper,fields,fieldName,x,dataSource=this.list.dataSource,options=this.options,dividerTemplate=options.dividerTemplate,newUL,countBubble=options.groupingSettings&&options.groupingSettings.showCountBubble?"<span class='"+css.count+"'>{GCNT}</span>":"";if(!this.list._initialized&&options.autoGenerateSortPresets&&(!options.presets||options.presets.length===0)){if(options.presets===undefined||options.presets===null){options.presets=[]}fields=dataSource.schema()?dataSource.schema().fields():null;if(!fields||fields.length===0){fields=this.list.options.schema.fields}for(x=0;fields&&x<fields.length;++x){fieldName=fields[x].name;if(fieldName&&!this._getPresetByFirstFieldName(fieldName)){options.presets.push({text:fieldName,sortedFields:[{fieldName:fieldName}]})}}wrapper=this.list.container().find("."+css.sortPresets).find("ul");for(x=0;options.presets&&x<options.presets.length;++x){wrapper.append($("<li class='"+css.preset+"' idx='"+x+"'>"+options.presets[x].text+"</li>"))}index=parseInt(options.sortState,10);if(!isNaN(index)){dataSource.settings.paging.appendPage=false;dataSource._data=[];dataSource._dataView=[];this._setOption("sortState",index);return false}}if(this.list.options.inset&&css.insetDivider){dividerCss+=" "+css.insetDivider}if(dataSource.settings.paging.enabled&&dataSource.settings.paging.pageIndex>0&&dataSource.settings.paging.type===dataSource.settings.sorting.type){i=dataSource.settings.paging.pageSize*dataSource.settings.paging.pageIndex-1}if(this._oldPagingIndex!==undefined){dataSource.settings.paging.pageIndex=this._oldPagingIndex;delete this._oldPagingIndex}if(this._shouldGroup===undefined&&sortState!==null&&sortState!==""){if(sortState==="default"){if(options.showGrouping&&options.sortedFields.length>0){this._shouldGroup=true;this._nameFx=options.groupNameFunction;this._grpFx=options.groupComparerFunction;groupingField=this._grpField=options.sortedFields[0].fieldName}else{this._shouldGroup=false}}else if(sortState!=="custom"){index=parseInt(sortState,10);preset=options.presets[index];if(preset.showGrouping&&preset.sortedFields.length>0){this._shouldGroup=true;this._nameFx=preset.groupNameFunction;this._grpFx=preset.groupComparerFunction;groupingField=this._grpField=preset.sortedFields[0].fieldName}else{this._shouldGroup=false}}}else{groupingField=this._grpField}if(this._lastGroupCount===undefined){this._lastGroupCount=0}if(this._shouldGroup&&ds.length>0){if(ui.listElement.html()!==""){if(options.groupingSettings&&options.groupingSettings.enableCollapsibleDividers){this._lastGroup=ui.listElement.parent().prev()}else{this._lastGroup=ui.listElement.find("."+dividerCss.split(" ")[1]).last()}lastItem=ds[i];if(this._cmp(this._grpFx,lastItem[groupingField],ds[i+1][groupingField])){if(!this._lastGroupCount){this._lastGroupCount=parseInt(this._lastGroup.find(".ui-li-count").html(),10)}}else{this._lastGroup=null;this._lastGroupCount=0;this._addBackBottom=ui.listElement.children().last();if(options.groupingSettings.enableCollapsibleDividers){newUL=this.list.listElement.clone(true);newUL[0].id="";newUL[0].innerHTML="";this.list.listElement.parent().parent().after(newUL);this.list.listElement=$(newUL)}else{if(dividerTemplate!==null&&dividerTemplate!==undefined&&dividerTemplate!==""){ui.items+="<li class='"+dividerCss+"'>{TMPL}</li>"}else{ui.items+="<li class='"+dividerCss+"'>"+this._groupName(this._nameFx,ds[i+1][groupingField])+countBubble+"</li>"}}}}else{this._lastGroupCount=0;if(!(options.groupingSettings&&options.groupingSettings.enableCollapsibleDividers)){if(dividerTemplate!==null&&dividerTemplate!==undefined&&dividerTemplate!==""){ui.items+="<li class='"+dividerCss+"'>{TMPL}</li>"}else{ui.items+="<li class='"+dividerCss+"'>"+this._groupName(this._nameFx,ds[i][groupingField])+countBubble+"</li>"}}}}},_itemRendered:function(e,ui){var i=ui.index,ds=ui.dataView,val=ui.value,css=this.css,dividerCss=css.listDivider,itemCss,newUL,options=this.options,dividerTemplate=options.dividerTemplate,listOptions=this.list.options,groupingSettings=options.groupingSettings,groupName,hasTemplate=dividerTemplate!==null&&dividerTemplate!==undefined&&dividerTemplate!=="",content,countBubble=groupingSettings&&groupingSettings.showCountBubble?"<span class='"+css.count+"'>{GCNT}</span>":"";var tagName=this.list.options.numberedList?"ol":"ul";var rootElem=this.list.container().find(tagName+"[id!='']").last();if(listOptions.inset&&css.insetDivider){dividerCss+=" "+css.insetDivider}if(this._shouldGroup){this._lastGroupCount++;if(i<ds.length-1&&!this._cmp(this._grpFx,val[this._grpField],ds[i+1][this._grpField])){if(listOptions.inset){itemCss=css.insetBottomItem;if(this._lastGroupCount===1){itemCss=css.insetTopItem+" "+css.insetBottomItem}ui.items=ui.items.replace("{EXTRACSS}","{EXTRACSS} "+itemCss)}if(this._lastGroup){if(groupingSettings.enableCollapsibleDividers){newUL=this.list.listElement[0].cloneNode();newUL.id="";this.list.listElement.append(ui.items.replace("{EXTRACSS}",""));this._lastGroup.find(".ui-li-count").html(this._lastGroupCount.toString());this.list.listElement=$(newUL);ui.items=""}else{if(!hasTemplate){this._lastGroup.find(".ui-li-count").html(this._lastGroupCount.toString())}else{this._lastGroup.html($.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:this._groupName(this._nameFx,ds[i][this._grpField])},{}))}}this._lastGroup=null}else{if(groupingSettings.enableCollapsibleDividers){newUL=this.list.listElement.clone(true);newUL[0].id="";this.list.listElement=$(newUL);this.list.listElement.wrap("<div></div>");if(this.list.listElement[0].id===""&&!listOptions.inset){this.list.listElement.parent().addClass(css.firstCollapsibleContainer)}if(listOptions.inset&&this.list.listElement[0].id&&!this.list.listElement.parent().parent().hasClass("ui-collapsible-set")){this.list.listElement.parent().wrap("<div></div>").parent().collapsibleset().addClass(listOptions.inset?this.list.css.insetList.split(" ")[0]:"")}groupName=this._groupName(this._nameFx,ds[i][this._grpField]);content=groupName;if(hasTemplate){content=$.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:groupName},{})}this.list.listElement.before("<h2 class='"+css.collapsibleDivider+"'>"+content+"</h2>");rootElem.append(newUL.parent());this.list.listElement.parent().collapsible({theme:this.options.listDividerTheme,inset:listOptions.inset,collapsedIcon:groupingSettings.collapsedIcon,expandedIcon:groupingSettings.expandedIcon,expandCueText:this._locale("collapsedCueText").replace("{0}",groupName),collapseCueText:this._locale("expandedCueText").replace("{0}",groupName),collapsed:groupingSettings.initialExpandedState==="expanded"?false:true});this.list.listElement.html(ui.items.replace("{EXTRACSS}",""));this._addCorners();if(!hasTemplate&&groupingSettings.showCountBubble){this.list.listElement.parent().prev().append("<span style='z-index:1000;' class='"+css.count+"'>"+this._lastGroupCount+"</span>")}ui.items=""}else{if(hasTemplate){ui.items=ui.items.replace("{TMPL}",$.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:this._groupName(this._nameFx,ds[i][this._grpField])},{}))}else{ui.items=ui.items.replace("{GCNT}",this._lastGroupCount)}}}if(!groupingSettings.enableCollapsibleDividers){if(hasTemplate){ui.items+="<li class='"+dividerCss+"'>{TMPL}</li>"}else{ui.items+="<li class='"+dividerCss+"'>"+this._groupName(this._nameFx,ds[i+1][this._grpField])+countBubble+"</li>"}}this._lastGroupCount=0}else if(i===ds.length-1){if(listOptions.inset){if(this._lastGroupCount===1&&groupingSettings.enableCollapsibleDividers){ui.items=ui.items.replace("{EXTRACSS}","{EXTRACSS} "+this.css.insetTopItem)}ui.items=ui.items.replace("{EXTRACSS}","{EXTRACSS} "+this.css.insetBottomItem)}if(groupingSettings.enableCollapsibleDividers){newUL=this.list.listElement.clone(true);newUL[0].id="";this.list.listElement=$(newUL);this.list.listElement.wrap("<div></div>");groupName=this._groupName(this._nameFx,ds[i][this._grpField]);content=groupName;if(hasTemplate){content=$.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:groupName},{})}this.list.listElement.before("<h2 class='"+css.collapsibleDivider+"'>"+content+"</h2>");rootElem.append(newUL.parent());this.list.listElement.parent().collapsible({theme:this.options.listDividerTheme,inset:listOptions.inset,collapsedIcon:groupingSettings.collapsedIcon,expandedIcon:groupingSettings.expandedIcon,expandCueText:this._locale("collapsedCueText").replace("{0}",groupName),collapseCueText:this._locale("expandedCueText").replace("{0}",groupName),collapsed:groupingSettings.initialExpandedState==="expanded"?false:true});this.list.listElement.html(ui.items.replace("{EXTRACSS}",""));this._addCorners();if(!hasTemplate&&groupingSettings.showCountBubble){this.list.listElement.parent().prev().append("<span style='z-index:1000;' class='"+css.count+"'>"+this._lastGroupCount+"</span>")}ui.items=""}else{if(hasTemplate){ui.items=ui.items.replace("{TMPL}",$.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:this._groupName(this._nameFx,ds[i][this._grpField])},{}))}else{ui.items=ui.items.replace("{GCNT}",this._lastGroupCount)}}}if(this._lastGroupCount===1&&listOptions.inset){ui.items=ui.items.replace("{EXTRACSS}","{EXTRACSS} "+this.css.insetTopItem)}}},_itemsRendered:function(){var ds=this.list.dataSource.dataView(),i=ds.length-1,options=this.options,dividerTemplate=options.dividerTemplate;if(this._shouldGroup){if(this._addBackBottom){this._addBackBottom.addClass(this.css.insetBottomItem);delete this._addBackBottom}if(this._lastGroup){if(dividerTemplate===null||dividerTemplate===undefined||dividerTemplate===""){this._lastGroup.find(".ui-li-count").html(this._lastGroupCount.toString())}else{this._lastGroup.html($.ig.tmpl(dividerTemplate,{Count:this._lastGroupCount,LastValue:ds[i],Name:this._groupName(this._nameFx,ds[i][this._grpField])},{}))}}this._lastGroup=null;if(!options.groupingSettings.enableCollapsibleDividers){this._addCorners()}if(!this.list.options.itemTemplate&&dividerTemplate){this.list.listElement.trigger("create",{target:this.list.listElement.children(".ui-li-divider")})}}if(options.sortState!=="custom"){this._clearGroupingInformation()}if(this.options.dividerTemplate===""||!this.list._loadOnDemand){delete this._lastGroupCount}if(this._shouldFirePresetChanged){this._trigger(this.events.presetChanged,null,{state:this.options.sortState,owner:this});this._shouldFirePresetChanged=false}$.mobile.loading("hide")},_addCorners:function(){if(this.list.options.inset){if(this.css.insetTopItem.indexOf("ui-corner-top")>-1){this.list._addCorners(this.list.listElement.children(".ui-corner-top"),"top")}if(this.css.insetBottomItem.indexOf("ui-corner-bottom")>-1){this.list._addCorners(this.list.listElement.children(".ui-corner-bottom"),"bottom")}}},_clearGroupingInformation:function(){delete this._shouldGroup;delete this._nameFx;delete this._grpFx;delete this._grpField},_cancelButtonClicked:function(){var noCancel;if(this.options.sortState!=="default"){noCancel=this._trigger(this.events.presetChanging,null,{state:"default",owner:this});if(noCancel){$.mobile.loading("show");this._shouldFirePresetChanged=true;this._setOption("sortState","default");return false}}return true},_dataRendering:function(){if(this.list._dataBinding&&this.options.type==="local"&&this._needToFilterDividers){this._filterOutDividers(this._needToFilterDividers);delete this._needToFilterDividers}},_cleanUpList:function(){var tagName,mainUL,otherUL,collapsibleEl;if(this.options.groupingSettings&&this.options.groupingSettings.enableCollapsibleDividers&&this.list.listElement.parent().hasClass("ui-collapsible-content")){tagName=this.list.options.numberedList?"ol":"ul";mainUL=this.list.container().find(tagName+"[id!='']").last();otherUL=this.list.container().find(tagName+"[id='']");otherUL.parent().parent(".ui-collapsible").collapsible("destroy");otherUL.parent(".ui-collapsible-content").remove();collapsibleEl=mainUL.parent().parent();if(collapsibleEl.hasClass("ui-collapsible")){collapsibleEl.collapsible("destroy");mainUL.parent().parent().before(mainUL);collapsibleEl.remove()}mainUL.html("");this.list.listElement=mainUL;if(!this.list.options.inset&&mainUL.parent().hasClass("ui-collapsible-set")){collapsibleEl=mainUL.parent();collapsibleEl.after(mainUL);collapsibleEl.collapsibleset("destroy").remove()}return true}},_createHandlers:function(){this._renderingTrayHandler=$.proxy(this._renderingTray,this);this._renderedTrayHandler=$.proxy(this._renderedTray,this);this._itemsRenderingHandler=$.proxy(this._itemsRendering,this);this._renderingTrayFooterBarHandler=$.proxy(this._renderingTrayFooterBar,this);this._itemRenderedHandler=$.proxy(this._itemRendered,this);this._itemsRenderedHandler=$.proxy(this._itemsRendered,this);this._cancelButtonClickedHandler=$.proxy(this._cancelButtonClicked,this);this._dataRenderingHandler=$.proxy(this._dataRendering,this);this._cleanUpListHandler=$.proxy(this._cleanUpList,this)},_registerEvents:function(){var listElement=this.list.element;listElement.bind("iglistrenderingtray",this._renderingTrayHandler);listElement.bind("iglistrenderedtray",this._renderedTrayHandler);listElement.bind("iglistitemsrendering",this._itemsRenderingHandler);listElement.bind("iglistrenderingtrayfooterbar",this._renderingTrayFooterBarHandler);listElement.bind("iglist_itemrendered",this._itemRenderedHandler);listElement.bind("iglistitemsrendered",this._itemsRenderedHandler);listElement.bind("iglistviewfiltering_cancelbuttonclicked",this._cancelButtonClickedHandler);listElement.bind("iglistdatarendering",this._dataRenderingHandler);listElement.bind("iglist_cleanuplist",this._cleanUpListHandler)},_unregisterEvents:function(){var listElement=this.list.element;listElement.unbind("iglistrenderingtray",this._renderingTrayHandler);listElement.unbind("iglistrenderedtray",this._renderedTrayHandler);listElement.unbind("iglistrenderingtrayfooterbar",this._renderingTrayFooterBarHandler);listElement.unbind("iglistitemsrendering",this._itemsRenderingHandler);listElement.unbind("iglist_itemrendered",this._itemRenderedHandler);listElement.unbind("iglistitemsrendered",this._itemsRenderedHandler);listElement.unbind("iglistviewfiltering_cancelbuttonclicked",this._cancelButtonClickedHandler);listElement.unbind("iglistdatarendering",this._dataRenderingHandler);listElement.unbind("iglist_cleanuplist",this._cleanUpListHandler);delete this._renderingTrayHandler;delete this._renderedTrayHandler;delete this._itemsRenderingHandler;delete this._renderingTrayFooterBarHandler;delete this._itemRenderedHandler;delete this._itemsRenderedHandler;delete this._cancelButtonClickedHandler;delete this._dataRenderingHandler;delete this._cleanUpListHandler},_injectList:function(listInstance){var x,presets,sortedFields=[],options=this.options,sorting=listInstance.dataSource.settings.sorting;this.list=listInstance;if(options.type===null){options.type=this.list._inferOpType()}if(options.type){sorting.type=options.type}else{sorting.type="remote"}sorting.enabled=true;sorting.caseSensitive=options.caseSensitive;sorting.defaultFields=sorting.expressions;sorting.sortUrlKey=options.sortUrlKey;sorting.sortUrlAscValueKey=options.sortUrlKeyAscValue;sorting.sortUrlDescValueKey=options.sortUrlKeyDescValue;if($.type(options.customSortFunction)==="function"){sorting.customFunc=options.customSortFunction}presets=options.sortedFields;if(options.sortState!=="default"&&options.presets&&options.presets[options.sortState]){presets=options.presets[options.sortState].sortedFields}if(presets&&presets.length>0){for(x=0;x<presets.length;++x){sortedFields[sortedFields.length]={fieldName:presets[x].fieldName,dir:presets[x].direction};if(sortedFields[x].dir===undefined||sortedFields[x].dir===null){sortedFields[x].dir="asc"}}sorting.defaultFields=sortedFields;sorting.expressions=sortedFields}if(this.list.options.bindings&&this.list.options.bindings.isDividerKey){this.list.dataSource._filter=true;if(sortedFields&&sortedFields.length>0){this._needToFilterDividers=sortedFields}if(this.options.sortUrlKey&&this.options.filterExprUrlKey&&!this.list.dataSource.settings.filtering.filterExprUrlKey){this.list.dataSource.settings.filtering.filterExprUrlKey=this.options.filterExprUrlKey}}this._createHandlers();this._registerEvents()},destroy:function(){var ul,collapsible;this._clearGroupingInformation();delete this._lastGroupCount;if(this.options.groupingSettings.enableCollapsibleDividers){this._cleanUpList();ul=this.list.listElement;collapsible=ul.parent();if(collapsible.hasClass("ui-collapsible-set")){collapsible.collapsibleset("destroy");collapsible.parent().append(ul);collapsible.remove()}}if(this._presetSpan){this._presetSpan.prev().remove();this._presetSpan.prev().remove();this._presetSpan.remove();delete this._presetSpan}this.list.container().find("."+this.css.sortPresets).remove();this._unregisterEvents();$.Widget.prototype.destroy.call(this);this.options=[];this.list.dataSource.dataBind();return this}});function _addDash(c){return"-"+c.toLowerCase()}$(document).bind("_igListViewHtmlOptions",function(evnt,args){var elem=args.element,sorting,items,option,value;if(elem.jqmData("sorting")===true){if(!args.options.features){args.options.features=[]}sorting=args.options.features[args.options.features.length]={};sorting.name="Sorting";items=elem.children(":jqmData(role='dividerTemplate')");if(items.length>0){sorting.dividerTemplate=unescape(items.first().html())}else if(args.listElement){items=args.listElement.children(":jqmData(role='dividerTemplate')");if(items.length>0){sorting.dividerTemplate=unescape(items.first().html())}}for(option in $.mobile.igListViewSorting.prototype.options){if($.mobile.igListViewSorting.prototype.options.hasOwnProperty(option)){value=elem.jqmData("sorting-"+option.replace(/[A-Z]/g,_addDash));if(value!==undefined){sorting[option]=value}}}value=elem.jqmData("sorting-filter-expr-url-key");
if(value!==undefined){sorting.filterExprUrlKey=value}}});if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("ig.mobileui.list.sorting",["ig.mobileui.list"],function(){return $.mobile.igListViewSorting})}$.extend($.mobile.igListViewSorting,{version:"16.2.20162.2040"})})(jQuery);(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);