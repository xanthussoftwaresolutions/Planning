﻿/*!@license
* Infragistics.Web.ClientUI infragistics.dv_dataseriesadapter.js 16.2.20162.2040
*
* Copyright (c) 2011-2016 Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends:
*     jquery-1.4.4.js
*     jquery.ui.core.js
*     jquery.ui.widget.js
*     infragistics.util.js
*     infragistics.ext_core.js
*     infragistics.ext_collections.js
*     infragistics.dv_core.js
*     infragistics.dv_datasource.js
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections","./infragistics.dv_core","./infragistics.dv_datasource"],factory)}else{factory(jQuery)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$x=$$t;$$0=$.ig.globalDefs.$$0;$$4=$.ig.globalDefs.$$4;$$1=$.ig.globalDefs.$$1;$$w=$.ig.globalDefs.$$w;$$y=$.ig.globalDefs.$$y;$$6=$.ig.globalDefs.$$6;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine(["IDataSeriesAdapterRule:b","DataSeriesAdapterRunContext:c","DataSeriesDataProviderAnalyzer:d","IExternalDataSeriesAdapter:k","DataSeriesAdapterImplementation:l","DataSeriesAdapterUpdateNotifier:m","DataSeriesAdapterRunEventHandler:n","DataSeriesAdapterRunEventArgs:o","DataSeriesAdapterRemovingDuplicatesEventHandler:p","DataSeriesAdapterRemovingDuplicatesEventArgs:q","SimpleScatterSeriesRule:t","SubCollectionsRule:u","SimpleCategorySeriesRule:v"]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.getBoxIfEnum,$e=$.ig.util.getDefaultValue,$f=$.ig.util.getEnumValue,$g=$.ig.util.getValue,$h=$.ig.util.intSToU,$i=$.ig.util.nullableEquals,$j=$.ig.util.nullableIsNull,$k=$.ig.util.nullableNotEquals,$l=$.ig.util.toNullable,$m=$.ig.util.toString$1,$n=$.ig.util.u32BitwiseAnd,$o=$.ig.util.u32BitwiseOr,$p=$.ig.util.u32BitwiseXor,$q=$.ig.util.u32LS,$r=$.ig.util.unwrapNullable,$s=$.ig.util.wrapNullable,$t=String.fromCharCode,$u=$.ig.util.castObjTo$t,$v=$.ig.util.compare,$w=$.ig.util.replace,$x=$.ig.util.stringFormat,$y=$.ig.util.stringFormat1,$z=$.ig.util.stringFormat2,$0=$.ig.util.stringCompare1,$1=$.ig.util.stringCompare2,$2=$.ig.util.stringCompare3,$3=$.ig.util.compareSimple,$4=$.ig.util.tryParseNumber,$5=$.ig.util.tryParseNumber1,$6=$.ig.util.numberToString,$7=$.ig.util.numberToString1,$8=$.ig.util.parseNumber;$c("DataSeriesAxisType:j","Enum",{init:function(v){this._v=v},$getName:function(v){switch(v){case 0:return"Category";case 1:return"Linear";case 2:return"Logarithmic";case 3:return"ContinuousDateTime";case 4:return"DiscreteDateTime";default:return v.toString()}},$value:function(){return this._v},$type:new $.ig.Type("DataSeriesAxisType",$.ig.$ep.$type)},true);$c("DataSeriesType:i","Enum",{init:function(v){this._v=v},$getName:function(v){switch(v){case 0:return"Line";case 1:return"Column";case 2:return"Area";case 3:return"Bar";case 4:return"StepLine";case 5:return"StepArea";case 6:return"Spline";case 7:return"SplineArea";case 8:return"Waterfall";case 9:return"Stacked";case 10:return"Point";case 11:return"ScatterPoint";case 12:return"ScatterLine";case 13:return"ScatterSpline";case 14:return"ScatterArea";case 15:return"ScatterContour";case 16:return"ScatterHighDensity";case 17:return"ScatterBubble";case 18:return"ShapePolygon";case 19:return"ShapePolyline";case 20:return"FinancialPrice";case 21:return"FinancialIndicator";case 22:return"FinancialOverlay";case 23:return"ValueOverlay";case 24:return"Unknown";default:return v.toString()}},$value:function(){return this._v},$type:new $.ig.Type("DataSeriesType",$.ig.$ep.$type)},true);$c("DataSeriesIntent:h","Enum",{init:function(v){this._v=v},$getName:function(v){switch(v){case 0:return"PrimarySeriesValue";case 1:return"SeriesX";case 2:return"SeriesY";case 3:return"SeriesFill";case 4:return"SeriesLabel";case 5:return"SeriesRadius";case 6:return"SeriesAngle";case 7:return"SeriesShape";case 8:return"SeriesValue";case 9:return"SeriesGroup";case 10:return"SeriesTitle";case 11:return"OpenSeriesValue";case 12:return"HighSeriesValue";case 13:return"LowSeriesValue";case 14:return"CloseSeriesValue";case 15:return"VolumeSeriesValue";case 16:return"AxisLabelValue";case 17:return"AxisDateValue";case 18:return"DontPlot";default:return v.toString()}},$value:function(){return this._v},$type:new $.ig.Type("DataSeriesIntent",$.ig.$ep.$type)},true);$c("IExternalDataSeriesAdapter:k","Object",{$type:new $.ig.Type("IExternalDataSeriesAdapter",null)},true);$c("DataSeriesAdapter:a","Object",{_e:null,f:null,init:function(){this.f=new $$4.v($$0.$e.$type.specialize($$t.$a.$type,Array),0);$.ig.$op.init.call(this);this._e=new $$t.l;this._e._p=this;var a=this._e.dataSeries();a.collectionChanged=$.ig.Delegate.prototype.combine(a.collectionChanged,this.k.runOn(this))},k:function(a,b){for(var c=0;c<this.f.count();c++){this.f.__inner[c](this,this.getDataSeries())}},i:null,dataSource:function(a){if(arguments.length===1){this._e.itemsSource(a);return a}else{return this._e.itemsSource()}},getDataProvider:function(a){return function(){var $ret=new $.ig.DataSourceLocalDataProvider;$ret.dataSource(a);return $ret}()},addDataSeriesChangedListener:function(a){this.f.add(a)},removeDataSeriesChangedListener:function(a){this.f.remove(a)},addDataSeries:function(a){this._e.dataSeries().add(a)},removeDataSeries:function(a){this._e.dataSeries().remove(a)},removeDataSeriesAt:function(a){this._e.dataSeries().removeAt(a)},getDataSeriesAt:function(a){return this._e.dataSeries().__inner[a]},getDataSeries:function(){var a=new Array(this._e.dataSeries().count());for(var b=0;b<this._e.dataSeries().count();b++){a[b]=this._e.dataSeries().__inner[b]}return a},clearDataSeriess:function(){this._e.dataSeries().clear()},insertDataSeries:function(a,b){this._e.dataSeries().insert(a,b)},getDataSeriessCount:function(){return this._e.dataSeries().count()},addRule:function(a){this._e.rules().add(a)},removeRule:function(a){this._e.rules().remove(a)},removeRuleAt:function(a){this._e.rules().removeAt(a)},getRuleAt:function(a){return this._e.rules().__inner[a]},clearRules:function(){this._e.rules().clear()},insertRule:function(a,b){this._e.rules().insert(a,b)},getRulesCount:function(){return this._e.rules().count()},getRules:function(){var a=new Array(this._e.rules().count());for(var b=0;b<this._e.rules().count();b++){a[b]=this._e.rules().__inner[b]}return a},notifyClearItems:function(a){this._e.notifyClearItems(a)},notifyInsertItem:function(a,b,c){this._e.notifyInsertItem(a,b,c)},notifyRemoveItem:function(a,b,c){this._e.notifyRemoveItem(a,b,c)},notifySetItem:function(a,b,c,d){this._e.notifySetItem(a,b,c,d)},$type:new $.ig.Type("DataSeriesAdapter",$.ig.$ot,[$$t.$k.$type])},true);$c("IDataSeriesAdapterRule:b","Object",{$type:new $.ig.Type("IDataSeriesAdapterRule",null)},true);$c("DataSeriesAdapterRunContext:c","Object",{_g:null,_analyzer:null,analyzer:function(a){if(arguments.length===1){this._analyzer=a;return a}else{return this._analyzer}},init:function(a){$.ig.$op.init.call(this);this._g=a;this.analyzer(new $$t.d(this));this.analyzer().includedProperties(this._g.includedProperties());this.analyzer().excludedProperties(this._g.excludedProperties());this.h=new $$t.r;this.k=new $$4.y($.ig.IDataSourceLocalDataProvider.prototype.$type);this.m=new $$4.y(String);this.l=new $$4.y(String);this.b=this._g.includedProperties();this.a=this._g.excludedProperties()},h:null,getSubProvider:function(a,b){var c=this._g.l(a);this.pushDataSource(c);this.pushPath(b);return c},popSubProvider:function(){this.popDataSource();this.popPath()},recurseRules:function(a,b,c){this._g.ah(this,a,b,c)},k:null,m:null,l:null,b:null,a:null,includedProperties:function(){return this.b},excludedProperties:function(){return this.a},getCurrentDataSource:function(){return this.k.peek()},pushDataSource:function(a){this.k.push(a)},popDataSource:function(){return this.k.pop()},getCurrentPathSegment:function(){return this.m.peek()},getCurrentPath:function(){var a="";var b=true;var d=this.m.getEnumerator();while(d.moveNext()){var c=d.current();if(b){b=false}else{a+="."}a+=c}return a},getParentTitle:function(){if(this.l.count()==0){return null}return this.l.peek()},pushPath:function(a){this.m.push(a)},popPath:function(){return this.m.pop()},pushParentTitle:function(a){this.l.push(a)},popParentTitle:function(){return this.l.pop()},y:function(a,b){if(a.priority()==-1){a.priority(b.priority())}if(a.dataPath()==null){a.dataPath(this.getCurrentPath())}if(a.data()==null){a.data(this.getCurrentDataSource().dataSource())}},addDataSeries:function(a,b){this.y(a,b);this.h.add(a)},removeDataSeries:function(a){this.h.remove(a)},insertDataSeries:function(a,b,c){this.y(b,c);this.h.insert(a,b)},clearDataSeries:function(){this.h.clear()},getDataSeriesCount:function(){return this.h.count()},getDataSeriesAt:function(a){return this.h.__inner[a]},$type:new $.ig.Type("DataSeriesAdapterRunContext",$.ig.$ot)},true);$c("DataSeriesDataProviderAnalyzer:d","Object",{init:function(a){this.ah=new $$4.o(String,0);this.aj=new $$4.v($$t.$e.$type,0);this.ag=new $$4.o(String,0);this.ai=new $$4.v($$t.$e.$type,0);$.ig.$op.init.call(this);this._m=a},_m:null,b:null,a:null,p:false,o:false,ah:null,aj:null,ag:null,ai:null,includedProperties:function(a){if(arguments.length===1){this.b=a;this.ah.clear();if(this.b==null){this.p=false}else{this.p=true;var d=this.b;for(var c=0;c<d.length;c++){var b=d[c];if($$t.$e.a(b)){this.aj.add(new $$t.e(b))}else{this.ah.add(b)}}}return a}else{return this.b}},excludedProperties:function(a){if(arguments.length===1){this.a=a;this.ag.clear();if(this.a==null){this.o=false}else{this.o=true;var d=this.a;for(var c=0;c<d.length;c++){var b=d[c];if($$t.$e.a(b)){this.ai.add(new $$t.e(b))}else{this.ag.add(b)}}}return a}else{return this.a}},getParentTitle:function(){return this._m.getParentTitle()},shouldIncludeProperty:function(a,b){if(!String.isNullOrEmpty(b)){a=b+"."+a}if(this.p&&!this.ah.contains(a)&&!this.v(a)){return false}if(this.o&&(this.ag.contains(a)||this.r(a))){return false}return true},r:function(a){for(var b=0;b<this.ai.count();b++){if(this.ai.__inner[b].b(a)){return true}}return false},v:function(a){for(var b=0;b<this.aj.count();b++){if(this.aj.__inner[b].b(a)){return true}}return false},hasStringProperties:function(){return this.getAllStringProperties().length>0},getAllStringProperties:function(){return this.k(function(a){return a==0},null)},isCollection:function(a){if($b($.ig.IEnumerable.prototype.$type,a)!==null||$b(Array,a)!==null){return true}return false},getAllPropertiesWithName:function(a){return this.k(null,function(b){return b==a})},getAllNumericProperties:function(){return this.k(this.ab.runOn(this),null)},getAllObjectProperties:function(){return this.k(this.ac.runOn(this),null)},getAllCollectionProperties:function(){var a=this.getAllObjectProperties();if(a.length==0){return new Array(0)}var b=this._m.getCurrentDataSource();var c=new $$4.v(String,0);for(var d=0;d<b.actualCount();d++){if(this.isCollection(b.getItemAtIndex(d))){c.add(b.actualSchema().propertyNames()[d])}}return c.toArray()},getFirstNumericProperty:function(){var a=this.getAllNumericProperties();if(a.length==0){return null}return a[0]},hasNumericProperties:function(){return this.getAllNumericProperties().length>0},y:function(a){if(a==8||a==9){return true}return false},n:function(a){var b=this._m.getCurrentDataSource();if(b==null){return 11}var c=b.actualSchema();if(c==null){return 11}var d=-1;for(var e=0;e<c.propertyNames().length;e++){if(c.propertyNames()[e].equals(a)){d=e;break}}if(d==-1){return 11}return c.propertyTypes()[d]},k:function(a,b){var c=this._m.getCurrentDataSource();var d=c.actualSchema();if(d==null){return new Array(0)}var e=this._m.getCurrentPath();var f=0;for(var g=0;g<d.propertyTypes().length;g++){if((a==null||a(d.propertyTypes()[g]))&&(b==null||b(d.propertyNames()[g]))&&this.af(d.propertyDataIntents(),g)&&this.shouldIncludeProperty(d.propertyNames()[g],e)){f++}}var h=new Array(f);f=0;for(var i=0;i<d.propertyTypes().length;i++){if((a==null||a(d.propertyTypes()[i]))&&(b==null||b(d.propertyNames()[i]))&&this.af(d.propertyDataIntents(),i)&&this.shouldIncludeProperty(d.propertyNames()[i],e)){h[f]=d.propertyNames()[i];f++}}return h},af:function(a,b){if(a==null){return true}return!this.q(a,b,"DontPlot")},q:function(a,b,c){if(a==null){return false}for(var d=0;d<a[b].length;d++){var e=a[b][d];if(String.equalsStatic(e.toLowerCase(),c.toLowerCase())){return true}}return false},getAllPropertiesWithIntent:function(a){var b=this._m.getCurrentDataSource();if(b==null){return new Array(0)}var c=b.actualSchema();if(c==null){return new Array(0)}var d=c.propertyDataIntents();if(d==null||c.propertyNames()==null){return new Array(0)}var e=0;for(var f=0;f<c.propertyNames().length;f++){for(var g=0;g<d[f].length;g++){var h=d[f][g];if(String.equalsStatic(a.toLowerCase(),h.toLowerCase())){e++}}}var i=new Array(e);e=0;for(var j=0;j<c.propertyNames().length;j++){for(var k=0;k<d[j].length;k++){var l=d[j][k];if(String.equalsStatic(a.toLowerCase(),l.toLowerCase())){i[e]=c.propertyNames()[j];e++}}}return i},getAllDateTimeProperties:function(){return this.k(this.y.runOn(this),null)},getFirstDateTimeProperty:function(){var a=this.getAllDateTimeProperties();if(a.length==0){return null}return a[0]},getFirstStringProperty:function(){var a=this.getAllStringProperties();if(a.length==0){return null}return a[0]},hasDateTimeProperties:function(){return this.getAllDateTimeProperties().length>0},ab:function(a){return a==1||a==3||a==4||a==7||a==5||a==6||a==10},ac:function(a){return a==11},isMonotonic:function(a,b,c){if(a==null){return false}var d=false;var e=false;var f=a.actualCount();for(var g=0;g<Math.min(f,c);g++){if(g==0){continue}var h=$$6.$f.q(a.getItemValue(a.getItemAtIndex(g-1),b));var i=$$6.$f.q(a.getItemValue(a.getItemAtIndex(g),b));if(!e&&h!=i){d=i>h;e=true}if(h==i){continue}if(e){var j=i>h;if(j!=d){return false}}}return true},ar:function(a,b,c){var d=this._m.getCurrentDataSource();var e=d.actualSchema();if(e==null){return null}var f=this.k(b,null);if(f.length==0){return null}if(d.actualCount()>a){return null}for(var g=0;g<f.length;g++){if(c(f[g],this.n(f[g]))){return f[g]}}return null},getFirstDistinctStringProperty:function(a){return this.ar(a,function(b){return b==0},this.ad.runOn(this))},getFirstDistinctNumericProperty:function(a){return this.ar(a,this.ab.runOn(this),this.aa.runOn(this))},getFirstDistinctMonotonicNumericProperty:function(a){var $self=this;var b=this._m.getCurrentDataSource();return this.ar(a,this.ab.runOn(this),function(c,d){return $self.aa(c,d)&&$self.isMonotonic(b,c,a)})},getFirstDistinctDateTimeProperty:function(a){return this.ar(a,this.y.runOn(this),this.x.runOn(this))},getFirstStringPropertyPreferringDistinct:function(a){var b=this.getFirstDistinctStringProperty(a);if(b!=null){return b}var c=this.getAllStringProperties();if(c.length==0){return null}return c[0]},getTitleString:function(a){var b=this._m.getCurrentDataSource();var c=null;if(c==null){var d=this.getAllPropertiesWithIntent($$t.$h.$getName(10));if(d!=null&&d.length>0){c=d[0];c=this.al(a,b,c)}}if(c==null){if(this.getParentTitle()!=null){c=this.getParentTitle()}}if(c==null&&a!=null){var e=this.getAllStringProperties();for(var g=0;g<e.length;g++){var f=e[g];if(f!=null&&(f.toLowerCase().equals("label")||f.toLowerCase().equals("title"))){c=f}}if(c!=null){c=this.al(a,b,c)}}return c},al:function(a,b,c){if(a!=null){var d=b.getItemValue(a,c);if(d!=null){c=d.toString()}}else{c=this.getNonNullPropertyValue(c).toString()}return c},getNonNullPropertyValue:function(a){var b=this._m.getCurrentDataSource();for(var c=0;c<b.actualCount();c++){var d=b.getItemValue(b.getItemAtIndex(c),a);if(d!=null){return d}}return null},ad:function(a,b){var c=this._m.getCurrentDataSource();var d=new $$4.o(String,0);for(var e=0;e<c.actualCount();e++){var f=c.getItemValue(c.getItemAtIndex(e),a);var g=f;if(d.contains(g)){return false}d.add(g)}return true},x:function(a,b){var c=this._m.getCurrentDataSource();var d=new $$4.o($.ig.Number.prototype.$type,0);for(var e=0;e<c.actualCount();e++){var f;var g=c.getItemValue(c.getItemAtIndex(e),a);if(g==null){f=$$0.$s.minValue()}else{f=g}if(d.contains(f.getTime())){return false}d.add(f.getTime())}return true},aa:function(a,b){var c=this._m.getCurrentDataSource();if(b==4||b==1||b==3){var d=new $$4.o($.ig.Number.prototype.$type,0);for(var e=0;e<c.actualCount();e++){var f;var g=c.getItemValue(c.getItemAtIndex(e),a);if(g==null){f=-0x8000000000000000}else{f=$$6.$f.x(g)}if(d.contains(f)){return false}d.add(f)}return true}if(b==7||b==5||b==6){var h=new $$4.o(Number,0);for(var i=0;i<c.actualCount();i++){var j;var k=c.getItemValue(c.getItemAtIndex(i),a);if(k==null){j=NaN}else{j=$$6.$f.q(k)}if(h.contains(j)){return false}h.add(j)}return true}return false},$type:new $.ig.Type("DataSeriesDataProviderAnalyzer",$.ig.$ot)},true);$c("Matcher:e","Object",{c:null,init:function(a){$.ig.$op.init.call(this);var patt_=$$t.$e.d(a);this.c=new RegExp(patt_)},b:function(a){return this.c.test(a)},a:function(a){return $$t.$e.d(a)!=null},d:function(a){if(a==null){return null}if(a.startsWith("/")&&a.endsWith("/",0)){return a.substr(1,a.length-2)}if(a.startsWith("Regex(")&&a.endsWith(")",0)){return a.substr(6,a.length-7)}if(a.startsWith("RegExp(")&&a.endsWith(")",0)){return a.substr(7,a.length-8)}if(a.contains("*")||a.contains("#")||a.contains("?")){a=$w(a,".","\\.");a=$w(a,"*",".*");a=$w(a,"#","\\d+");a=$w(a,"?",".+");a=$w(a,"[","\\[");a=$w(a,"]","\\]");return"^"+a+"$"}return null},$type:new $.ig.Type("Matcher",$.ig.$ot)},true);$c("DataSeries:f","Object",{init:function(){$.ig.$op.init.call(this);this.h=new $$4.v($$t.$g.$type,0)},h:null,_name:null,name:function(a){if(arguments.length===1){this._name=a;return a}else{return this._name}},_title:null,title:function(a){if(arguments.length===1){this._title=a;return a}else{return this._title}},_data:null,data:function(a){if(arguments.length===1){this._data=a;return a}else{return this._data}},_priority:0,priority:function(a){if(arguments.length===1){this._priority=a;return a}else{return this._priority}},_suggestedPrimaryAxis:0,suggestedPrimaryAxis:function(a){if(arguments.length===1){this._suggestedPrimaryAxis=a;return a}else{return this._suggestedPrimaryAxis}},_suggestedSecondaryAxis:0,suggestedSecondaryAxis:function(a){if(arguments.length===1){this._suggestedSecondaryAxis=a;return a}else{return this._suggestedSecondaryAxis}},_suggestedSeries:0,suggestedSeries:function(a){if(arguments.length===1){this._suggestedSeries=a;return a}else{return this._suggestedSeries}},_dataPath:null,dataPath:function(a){if(arguments.length===1){this._dataPath=a;return a}else{return this._dataPath}},addMemberPathHint:function(a){this.h.add(a)},removeMemberPathHint:function(a){this.h.remove(a)},clearMemberPathHints:function(){this.h.clear()},getMemberPathHintCount:function(){return this.h.count()},getMemberPathHintAt:function(a){return this.h.__inner[a]},findMatchingHint:function(a){for(var b=0;b<this.h.count();b++){if(this.h.__inner[b].intent()==a){return this.h.__inner[b]}}return null},g:function(){return this.h},equals:function(a){var b=$b($$t.$f.$type,a);if(b==null){return false}if(!String.equalsStatic(this.name(),b.name())){return false}if(!String.equalsStatic(this.title(),b.title())){return false}if(this.data()!=b.data()){return false}if(this.priority()!=b.priority()){return false}if(this.suggestedPrimaryAxis()!=b.suggestedPrimaryAxis()){return false}if(this.suggestedSecondaryAxis()!=b.suggestedSecondaryAxis()){return false}if(this.suggestedSeries()!=b.suggestedSeries()){return false}if(!String.equalsStatic(this.dataPath(),b.dataPath())){return false}var c=this.g();var d=b.g();if(c.count()!=d.count()){return false}for(var e=0;e<c.count();e++){if(!c.item(e).equals(d.item(e))){return false}}return true},$type:new $.ig.Type("DataSeries",$.ig.$ot)},true);$c("DataSeriesMemberPathHint:g","Object",{init:function(){$.ig.$op.init.call(this)},_path:null,path:function(a){if(arguments.length===1){this._path=a;return a}else{return this._path}},_intent:0,intent:function(a){if(arguments.length===1){this._intent=a;return a}else{return this._intent}},equals:function(a){var b=$b($$t.$g.$type,a);if(b==null){return false}if(!String.equalsStatic(this.path(),b.path())){return false}if(this.intent()!=b.intent()){return false}return true},toString:function(){return $$t.$h.getBox(this.intent())+" "+this.path()},update:function(a,b){this.path(String.isNullOrEmpty(b)?a:$w(b,"NAME",a))},hasPath:function(){return!String.isNullOrEmpty(this.path())},$type:new $.ig.Type("DataSeriesMemberPathHint",$.ig.$ot)},true);$c("SimpleScatterSeriesRule:t","Object",{init:function(){$.ig.$op.init.call(this);this.priority(9);this.monotonicCheckAmount(1e4)},_priority:0,priority:function(a){if(arguments.length===1){this._priority=a;return a}else{return this._priority}},_monotonicCheckAmount:0,monotonicCheckAmount:function(a){if(arguments.length===1){this._monotonicCheckAmount=a;return a}else{return this._monotonicCheckAmount}},evaluate:function(a){var b=a.analyzer().getAllNumericProperties();if(b.length==0){return}var c=a.getCurrentDataSource().actualCount();var d=a.analyzer().getTitleString(null);var e=new $$4.v(String,0);for(var f=0;f<b.length;f++){e.add(b[f])}var g=this.c(e);var h=this.d(e);var i=a.analyzer().getAllPropertiesWithIntent($$t.$h.$getName(1));var j=a.analyzer().getAllPropertiesWithIntent($$t.$h.$getName(2));if(i.length>0&&j.length>0&&i.length==j.length){g.clear();h.clear();e.clear();for(var k=0;k<i.length;k++){g.add(i[k]);h.add(j[k])}}var l=0;for(l=0;l<Math.min(g.count(),h.count());l++){this.f(a,g.__inner[l],h.__inner[l],d)}for(;l<g.count();l++){e.add(g.__inner[l])}for(;l<h.count();l++){e.add(h.__inner[l])}for(var m=0;m<e.count();m+=2){if(m+1>=e.count()){continue}this.f(a,e.__inner[m],e.__inner[m+1],d)}},d:function(a){var b=new $$4.v(String,0);for(var c=0;c<a.count();c++){if(this.b(a.__inner[c])){b.add(a.__inner[c]);a.removeAt(c);c--}}return b},b:function(a){if(String.equalsStatic(a.toLowerCase(),"y")||String.equalsStatic(a.toLowerCase(),"yvalue")){return true}return false},c:function(a){var b=new $$4.v(String,0);for(var c=0;c<a.count();c++){if(this.a(a.__inner[c])){b.add(a.__inner[c]);a.removeAt(c);c--}}return b},a:function(a){if(String.equalsStatic(a.toLowerCase(),"x")||String.equalsStatic(a.toLowerCase(),"xvalue")){return true}return false},f:function(a,b,c,d){var e=new $$t.f;e.name(b+"_"+c);if(d!=null){e.title(d)}else{e.title(b+" - "+c)}var f=new $$t.g;f.intent(1);f.path(b);var g=new $$t.g;g.intent(2);g.path(c);e.addMemberPathHint(f);e.addMemberPathHint(g);var h=a.getCurrentDataSource();var i=h.actualCount();if(i>this.monotonicCheckAmount()){e.suggestedSeries(11)}else{if(a.analyzer().isMonotonic(h,b,this.monotonicCheckAmount())){e.suggestedSeries(12)}else{e.suggestedSeries(11)}}e.suggestedPrimaryAxis(1);e.suggestedSecondaryAxis(1);a.addDataSeries(e,this)},$type:new $.ig.Type("SimpleScatterSeriesRule",$.ig.$ot,[$$t.$b.$type])},true);$c("SubCollectionsRule:u","Object",{init:function(){$.ig.$op.init.call(this);this.priority(0);this.collectionTransformationThreshold(50)},_priority:0,priority:function(a){if(arguments.length===1){this._priority=a;return a}else{return this._priority}},_collectionTransformationThreshold:0,collectionTransformationThreshold:function(a){if(arguments.length===1){this._collectionTransformationThreshold=a;return a}else{return this._collectionTransformationThreshold}},evaluate:function(a){var b=a.getCurrentDataSource();if(b==null){return}if(b.actualCount()==0||b.actualCount()>this.collectionTransformationThreshold()){return}var c=b.getItemAtIndex(0);if(a.analyzer().isCollection(c)){for(var d=0;d<b.actualCount();d++){if(a.analyzer().isCollection(b.getItemAtIndex(d))){var e=a.analyzer().getTitleString(b.getItemAtIndex(d));if(e!=null){a.pushParentTitle(e)}a.recurseRules(b.getItemAtIndex(d),"["+d+"]",false);if(e!=null){a.popParentTitle()}}}}},$type:new $.ig.Type("SubCollectionsRule",$.ig.$ot,[$$t.$b.$type])},true);$c("SimpleCategorySeriesRule:v","Object",{init:function(){$.ig.$op.init.call(this);this.priority(10);this.distinctCheckThreshold(5e4);this.useColumnThreshold(30)},_priority:0,priority:function(a){if(arguments.length===1){this._priority=a;return a}else{return this._priority}},_useColumnThreshold:0,useColumnThreshold:function(a){if(arguments.length===1){this._useColumnThreshold=a;return a}else{return this._useColumnThreshold}},_distinctCheckThreshold:0,distinctCheckThreshold:function(a){if(arguments.length===1){this._distinctCheckThreshold=a;return a}else{return this._distinctCheckThreshold}},evaluate:function(a){var b=null;var c=a.analyzer().getAllPropertiesWithIntent($$t.$h.$getName(16));if(c.length>0){b=c[0]}if(b==null){b=a.analyzer().getFirstDistinctStringProperty(this.distinctCheckThreshold())}if(b==null){b=a.analyzer().getFirstDistinctDateTimeProperty(this.distinctCheckThreshold())}if(b==null){b=a.analyzer().getFirstDistinctMonotonicNumericProperty(this.distinctCheckThreshold())}if(b==null){b=a.analyzer().getFirstDistinctNumericProperty(this.distinctCheckThreshold())}if(b==null){b=a.analyzer().getFirstStringProperty()}if(b==null){return}var d=a.analyzer().getTitleString(null);var e=null;var f=a.analyzer().getAllPropertiesWithIntent($$t.$h.$getName(0));if(f.length>0){e=f}if(e==null){e=a.analyzer().getAllNumericProperties()}if(e==null||e.length==0){return}var g=a.getCurrentDataSource().actualCount();for(var h=0;h<e.length;h++){if(e[h]==b){continue}var i=new $$t.f;var j=new $$t.g;j.intent(0);j.path(e[h]);var k=new $$t.g;k.intent(16);k.path(b);i.addMemberPathHint(j);i.addMemberPathHint(k);if(g>this.useColumnThreshold()){i.suggestedSeries(0)}else{i.suggestedSeries(1)}i.suggestedPrimaryAxis(0);i.suggestedSecondaryAxis(1);i.name(e[h]);if(d!=null){i.title(d)}else{i.title(e[h])}a.addDataSeries(i,this)}},$type:new $.ig.Type("SimpleCategorySeriesRule",$.ig.$ot,[$$t.$b.$type])},true);$c("DataSeriesAdapterImplementation:l","Object",{init:function(){this.m=new $$4.f($.ig.$op.$type,$.ig.IDataSourceLocalDataProvider.prototype.$type,0);this.c=null;this.b=null;this.a=null;$.ig.$op.init.call(this);this.rules(new $$t.s);this.dataSeries(new $$t.r);this.af(this.rules());var a=this.rules();a.collectionChanged=$.ig.Delegate.prototype.combine(a.collectionChanged,this.al.runOn(this))},af:function(a){a.add(new $$t.v);a.add(new $$t.t);a.add(new $$t.u)},al:function(a,b){this.refresh()},_p:null,g:function(){return this._p},m:null,n:null,propertyChanged:null,itemsSource:function(a){if(arguments.length===1){var b=this.n;this.n=a;if(b!=this.n){this.aa("ItemsSource",b,this.n)}return a}else{return this.n}},c:null,supportedSeriesTypes:function(a){if(arguments.length===1){var b=this.c;this.c=a;if(b!=this.c){this.aa("SupportedSeriesTypes",b,this.c)}return a}else{return this.c}},b:null,includedProperties:function(a){if(arguments.length===1){var b=this.b;this.b=a;if(b!=this.b){this.aa("IncludedProperties",b,this.b)}return a}else{return this.b}},a:null,excludedProperties:function(a){if(arguments.length===1){var b=this.a;this.a=a;if(b!=this.a){this.aa("ExcludedProperties",b,this.a)}return a}else{return this.a}},_rules:null,rules:function(a){if(arguments.length===1){this._rules=a;return a}else{return this._rules}},_dataSeries:null,dataSeries:function(a){if(arguments.length===1){this._dataSeries=a;return a}else{return this._dataSeries}},aa:function(a,b,c){this.ag(a,b,c);if(this.propertyChanged!=null){this.propertyChanged(this,new $$0.b9(a))}},ag:function(a,b,c){switch(a){case"ItemsSource":this.refresh();break;case"SupportedSeriesTypes":this.refresh();break;case"IncludedProperties":this.refresh();break;case"ExcludedProperties":this.refresh();break}},refresh:function(){this.v();var a=new $$t.c(this);var b=this.l(this.itemsSource());this.u(b,null,false);a.pushDataSource(b);this.an(a);this.ap(a)},v:function(){var b=this.m.keys().getEnumerator();while(b.moveNext()){var a=b.current();var c=this.m.item(a);c.updateNotifier(null)}this.m.clear()},ap:function(a){this.ak(a);this.aj(a);this.ao(a)},ak:function(a){var b=true;if(this.removingUnsupported!=null){var c=function(){var $ret=new $$t.o;$ret.runContext(a);return $ret}();this.removingUnsupported(this,c);b=!c.handled()}if(b){if(this.supportedSeriesTypes()==null){return}var d=new $$4.o($$t.$i.$type,0);for(var e=0;e<this.supportedSeriesTypes().length;e++){d.add(this.supportedSeriesTypes()[e])}for(var f=a.getDataSeriesCount()-1;f>=0;f--){var g=a.getDataSeriesAt(f);if(!d.contains(g.suggestedSeries())){a.removeDataSeries(g)}}}},ao:function(a){var b=0;for(;b<Math.min(this.dataSeries().count(),a.getDataSeriesCount());b++){if(!this.dataSeries().__inner[b].equals(a.getDataSeriesAt(b))){this.dataSeries().removeAt(b);b--}}for(;b<a.getDataSeriesCount();b++){this.dataSeries().insert(b,a.getDataSeriesAt(b))}for(;b<this.dataSeries().count();b++){this.dataSeries().removeAt(b);b--}},removingUnsupported:null,removingDuplicates:null,aj:function(a){var b=new $$4.f(String,$$4.$v.$type.specialize($$t.$f.$type),0);for(var c=0;c<a.getDataSeriesCount();c++){var d=a.getDataSeriesAt(c);var e=d.g();for(var f=0;f<e.count();f++){if(e.item(f).intent()==16||e.item(f).intent()==17){continue}var g=(d.dataPath()!=null?d.dataPath()+".":"")+e.item(f).path();if(!b.containsKey(g)){b.item(g,new $$4.v($$t.$f.$type,0))}b.item(g).add(d)}}var i=b.keys().getEnumerator();while(i.moveNext()){var h=i.current();if(b.item(h).count()>1){var j=new Array(b.item(h).count());var k=b.item(h);var l=k.count();for(var m=0;m<l;m++){j[m]=k.__inner[m]}var n=true;if(this.removingDuplicates!=null){var o=function(){var $ret=new $$t.q;$ret.duplicatePath(h);$ret.runContext(a);$ret.matchingSeries(j);return $ret}();n=!o.handled()}if(n){var p=-1;var q=null;k=b.item(h);l=k.count();for(var r=0;r<l;r++){var s=k.__inner[r];if(s.priority()>p){p=s.priority();q=s}}for(var t=0;t<l;t++){var u=k.__inner[t];if(u!=q){a.removeDataSeries(u)}}}}}},an:function(a){for(var b=0;b<this.rules().count();b++){this.am(a,this.rules().__inner[b])}},am:function(a,b){b.evaluate(a)},l:function(a){if(a!=null&&this.m.containsKey(a)){return this.m.item(a)}return this.g().getDataProvider(a)},ah:function(a,b,c,d){var e=this.l(b);this.u(e,a.getCurrentDataSource(),d);a.pushDataSource(e);a.pushPath(c);this.an(a);a.popPath();a.popDataSource()},u:function(a,b,c){if(a.dataSource()!=null){this.m.add(a.dataSource(),a)}if(b!=null){var d=new $$t.m(this,a);b.updateNotifier(d)}if(c){var e=new $$t.m(this,a);a.updateNotifier(e)}},ab:function(a){this.refresh()},ac:function(a,b,c){this.refresh()},ad:function(a,b,c){this.refresh()},ae:function(a,b,c,d){this.refresh()},notifyClearItems:function(a){if(this.m.containsKey(a)){this.m.item(a).notifyClearItems()}},notifyInsertItem:function(a,b,c){if(this.m.containsKey(a)){this.m.item(a).notifyInsertItem(b,c)}},notifyRemoveItem:function(a,b,c){if(this.m.containsKey(a)){this.m.item(a).notifyRemoveItem(b,c)}},notifySetItem:function(a,b,c,d){if(this.m.containsKey(a)){this.m.item(a).notifySetItem(b,c,d)}},$type:new $.ig.Type("DataSeriesAdapterImplementation",$.ig.$ot,[$$0.$b8.$type])},true);$c("DataSeriesAdapterUpdateNotifier:m","Object",{a:null,b:null,init:function(a,b){$.ig.$op.init.call(this);this.a=a;this.b=b},notifyClearItems:function(){this.a.ab(this.b)},notifyInsertItem:function(a,b){this.a.ac(this.b,a,b)},notifyRemoveItem:function(a,b){this.a.ad(this.b,a,b)},notifySetItem:function(a,b,c){this.a.ae(this.b,a,b,c)},$type:new $.ig.Type("DataSeriesAdapterUpdateNotifier",$.ig.$ot,[$.ig.IDataSourceDataProviderUpdateNotifier.prototype.$type])},true);$c("DataSeriesAdapterRunEventArgs:o","Object",{init:function(){$.ig.$op.init.call(this)},_runContext:null,runContext:function(a){if(arguments.length===1){this._runContext=a;return a}else{return this._runContext}},_handled:false,handled:function(a){if(arguments.length===1){this._handled=a;return a}else{return this._handled}},$type:new $.ig.Type("DataSeriesAdapterRunEventArgs",$.ig.$ot)},true);$c("DataSeriesAdapterRemovingDuplicatesEventArgs:q","Object",{init:function(){$.ig.$op.init.call(this)},_runContext:null,runContext:function(a){if(arguments.length===1){this._runContext=a;return a}else{return this._runContext}},_dataSourcePath:null,dataSourcePath:function(a){if(arguments.length===1){this._dataSourcePath=a;return a}else{return this._dataSourcePath}},_duplicatePath:null,duplicatePath:function(a){if(arguments.length===1){this._duplicatePath=a;return a}else{return this._duplicatePath}},_matchingSeries:null,matchingSeries:function(a){if(arguments.length===1){this._matchingSeries=a;return a}else{return this._matchingSeries
}},_handled:false,handled:function(a){if(arguments.length===1){this._handled=a;return a}else{return this._handled}},$type:new $.ig.Type("DataSeriesAdapterRemovingDuplicatesEventArgs",$.ig.$ot)},true);$c("DataSeriesCollection:r","ObservableCollection$1",{init:function(){$$4.$d.init.call(this,$$t.$f.$type,0)},$type:new $.ig.Type("DataSeriesCollection",$$4.$d.$type.specialize($$t.$f.$type))},true);$c("DataSeriesAdapterRuleCollection:s","ObservableCollection$1",{init:function(){$$4.$d.init.call(this,$$t.$b.$type,0)},$type:new $.ig.Type("DataSeriesAdapterRuleCollection",$$4.$d.$type.specialize($$t.$b.$type))},true);$$t.$j.category=0;$$t.$j.linear=1;$$t.$j.logarithmic=2;$$t.$j.continuousDateTime=3;$$t.$j.discreteDateTime=4;$$t.$i.line=0;$$t.$i.column=1;$$t.$i.area=2;$$t.$i.bar=3;$$t.$i.stepLine=4;$$t.$i.stepArea=5;$$t.$i.spline=6;$$t.$i.splineArea=7;$$t.$i.waterfall=8;$$t.$i.stacked=9;$$t.$i.point=10;$$t.$i.scatterPoint=11;$$t.$i.scatterLine=12;$$t.$i.scatterSpline=13;$$t.$i.scatterArea=14;$$t.$i.scatterContour=15;$$t.$i.scatterHighDensity=16;$$t.$i.scatterBubble=17;$$t.$i.shapePolygon=18;$$t.$i.shapePolyline=19;$$t.$i.financialPrice=20;$$t.$i.financialIndicator=21;$$t.$i.financialOverlay=22;$$t.$i.valueOverlay=23;$$t.$i.unknown=24;$$t.$h.primarySeriesValue=0;$$t.$h.seriesX=1;$$t.$h.seriesY=2;$$t.$h.seriesFill=3;$$t.$h.seriesLabel=4;$$t.$h.seriesRadius=5;$$t.$h.seriesAngle=6;$$t.$h.seriesShape=7;$$t.$h.seriesValue=8;$$t.$h.seriesGroup=9;$$t.$h.seriesTitle=10;$$t.$h.openSeriesValue=11;$$t.$h.highSeriesValue=12;$$t.$h.lowSeriesValue=13;$$t.$h.closeSeriesValue=14;$$t.$h.volumeSeriesValue=15;$$t.$h.axisLabelValue=16;$$t.$h.axisDateValue=17;$$t.$h.dontPlot=18;$$t.$l.s="ItemsSource";$$t.$l.t="SupportedSeriesTypes";$$t.$l.r="IncludedProperties";$$t.$l.q="ExcludedProperties"});(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);