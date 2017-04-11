﻿/*!@license
* Infragistics.Web.ClientUI infragistics.dv_geometry.JS 16.2.20162.2040
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
*     infragistics.ext_ui.js
*/
(function(factory){if(typeof define==="function"&&define.amd){define(["jquery","jquery-ui","./infragistics.util","./infragistics.ext_core","./infragistics.ext_collections","./infragistics.dv_core","./infragistics.ext_ui"],factory)}else{factory(jQuery)}})(function($){$.ig=$.ig||{};var $$t={};$.ig.globalDefs=$.ig.globalDefs||{};$.ig.globalDefs.$$r=$$t;$$0=$.ig.globalDefs.$$0;$$4=$.ig.globalDefs.$$4;$$1=$.ig.globalDefs.$$1;$$w=$.ig.globalDefs.$$w;$$6=$.ig.globalDefs.$$6;$$a=$.ig.globalDefs.$$a;$.ig.$currDefinitions=$$t;$.ig.util.bulkDefine(["ISmartPlaceable:p"]);var $a=$.ig.intDivide,$b=$.ig.util.cast,$c=$.ig.util.defType,$d=$.ig.util.getBoxIfEnum,$e=$.ig.util.getDefaultValue,$f=$.ig.util.getEnumValue,$g=$.ig.util.getValue,$h=$.ig.util.intSToU,$i=$.ig.util.nullableEquals,$j=$.ig.util.nullableIsNull,$k=$.ig.util.nullableNotEquals,$l=$.ig.util.toNullable,$m=$.ig.util.toString$1,$n=$.ig.util.u32BitwiseAnd,$o=$.ig.util.u32BitwiseOr,$p=$.ig.util.u32BitwiseXor,$q=$.ig.util.u32LS,$r=$.ig.util.unwrapNullable,$s=$.ig.util.wrapNullable,$t=String.fromCharCode,$u=$.ig.util.castObjTo$t,$v=$.ig.util.compareSimple,$w=$.ig.util.tryParseNumber,$x=$.ig.util.tryParseNumber1,$y=$.ig.util.numberToString,$z=$.ig.util.numberToString1,$0=$.ig.util.parseNumber;$c("SmartPosition:o","Enum",{init:function(v){this._v=v},$getName:function(v){switch(v){case 0:return"LeftTop";case 1:return"CenterTop";case 2:return"RightTop";case 3:return"LeftCenter";case 4:return"CenterCenter";case 5:return"RightCenter";case 6:return"LeftBottom";case 7:return"CenterBottom";case 8:return"RightBottom";default:return v.toString()}},$value:function(){return this._v},$type:new $.ig.Type("SmartPosition",$.ig.$ep.$type)},true);$c("Clipper:a","Object",{i:function(a){if(arguments.length===1){if(this.b!=null){this.b.clear()}this.b=null;this.h=a;var b=this.h;if(this.c!=null){this.c.dst(b);b=this.c;this.b=this.c}if(this.a!=null){this.a.dst(b);b=this.a;this.a.__nextClipper=this.b;this.b=this.a}if(this.d!=null){this.d.dst(b);b=this.d;this.d.__nextClipper=this.b;this.b=this.d}if(this.e!=null){this.e.dst(b);b=this.e;this.e.__nextClipper=this.b;this.b=this.e}this.g=b;return a}else{return this.h}},g:null,b:null,h:null,c:null,a:null,d:null,e:null,init:function(a,b,c){if(a>0){switch(a){case 1:this.init1.apply(this,arguments);break}return}$.ig.$op.init.call(this);this.c=function(){var $ret=new $$t.c;$ret._edge=b.left();$ret._isClosed=c;return $ret}();this.a=function(){var $ret=new $$t.d;$ret._edge=b.bottom();$ret._isClosed=c;return $ret}();this.d=function(){var $ret=new $$t.e;$ret._edge=b.right();$ret._isClosed=c;return $ret}();this.e=function(){var $ret=new $$t.f;$ret._edge=b.top();$ret._isClosed=c;return $ret}()},init1:function(a,b,c,d,e,f){$.ig.$op.init.call(this);this.c=!$.ig.util.isNaN(b)?function(){var $ret=new $$t.c;$ret._edge=b;$ret._isClosed=f;return $ret}():null;this.a=!$.ig.util.isNaN(c)?function(){var $ret=new $$t.d;$ret._edge=c;$ret._isClosed=f;return $ret}():null;this.d=!$.ig.util.isNaN(d)?function(){var $ret=new $$t.e;$ret._edge=d;$ret._isClosed=f;return $ret}():null;this.e=!$.ig.util.isNaN(e)?function(){var $ret=new $$t.f;$ret._edge=e;$ret._isClosed=f;return $ret}():null},j:function(a){this.g.add(a)},k:function(a,b){var c=a;var d=a.count();var e=new Array(4);e[0]=this.e;e[1]=this.d;e[2]=this.a;e[3]=this.c;var f=0;var g=0;var h=0;var i=0;if(this.e!=null){f=this.e._edge}if(this.d!=null){g=this.d._edge}if(this.a!=null){h=this.a._edge}if(this.c!=null){i=this.c._edge}var j=false;var k=false;var l;var m=e.length;var n=m+1;var o=null;var p;var q;var r=0;var s=new Array(16);var t=0;var u=new Array(16);var v=0;var w=1;var x;var y;if(b){v=d-1;w=-1}for(var z=v;z<d&&z>=0;z+=w){p=c.item(z);s[r]=p;r++;for(l=0;l<n;l++){if(l<m){o=e[l];if(o==null){continue}}for(q=0;q<r;q++){p=s[q];y=p.__x;x=p.__y;if(l>=m){this.h.add(p);continue}j=l==0&&x>=f||l==1&&y<=g||l==2&&x<=h||l==3&&y>=i;if(o.c){o.c=false;o.j=p}else{if(true){if(j){if(!o.g){u[t]=o.k(o.l,p);t++}else{if(!o._isClosed&&!o.f){u[t]=o.l;t++;o.f=true}}u[t]=p;t++}else{if(o.g){if(!o._isClosed&&!o.f){u[t]=o.l;t++;o.f=true}u[t]=o.k(o.l,p);t++}}}}o.l=p;o.g=j}var aa=s;s=u;u=aa;r=t;t=0}}},f:function(a){if(arguments.length===1){if(this.c!=null){this.c._isClosed=a}if(this.a!=null){this.a._isClosed=a}if(this.d!=null){this.d._isClosed=a}if(this.e!=null){this.e._isClosed=a}return a}else{return(this.c==null||this.c._isClosed)&&(this.a==null||this.a._isClosed)&&(this.d==null||this.d._isClosed)&&(this.e==null||this.e._isClosed)}},$type:new $.ig.Type("Clipper",$.ig.$ot)},true);$c("EdgeClipper:b","Object",{init:function(){this.c=true;this.f=false;$.ig.$op.init.call(this)},dst:function(a){if(arguments.length===1){if(this._dst!=a){this.c=true;this._dst=a}return a}else{return this._dst}},_dst:null,__nextClipper:null,nextClipper:function(a){if(arguments.length===1){this.__nextClipper=a;return a}else{return this.__nextClipper}},c:false,j:null,l:null,g:false,_isClosed:false,f:false,add:function(a){var b=this.e(a);if(this.c){this.c=false;this.j=a}else{if(true){if(b){if(!this.g){this._dst.add(this.k(this.l,a))}else{if(!this._isClosed&&!this.f){this._dst.add(this.l);this.f=true}}this._dst.add(a)}else{if(this.g){if(!this._isClosed&&!this.f){this._dst.add(this.l);this.f=true}this._dst.add(this.k(this.l,a))}}}}this.l=a;this.g=b},clear:function(){if(this._isClosed&&!this.c){this.add(this.j)}if(this.__nextClipper!=null){this.__nextClipper.clear()}this.c=true;this.f=false},e:function(a){},k:function(a,b){},getEnumerator:function(){return null},getEnumerator:function(){return null},isReadOnly:function(){return false},count:function(){return 0},remove:function(a){return false},removeAt:function(a){},copyTo:function(a,b){},contains:function(a){return false},item:function(a,b){if(arguments.length===2){return b}else{return{__x:0,__y:0,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}}},insert:function(a,b){},indexOf:function(a){return-1},$type:new $.ig.Type("EdgeClipper",$.ig.$ot,[$$0.$b0.$type.specialize($$a.$u.$type)])},true);$c("LeftClipper:c","EdgeClipper",{init:function(){$$t.$b.init.call(this)},_edge:0,e:function(a){return a.__x>=this._edge},k:function(a,b){return{__x:this._edge,__y:a.__y+(b.__y-a.__y)*(this._edge-a.__x)/(b.__x-a.__x),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},$type:new $.ig.Type("LeftClipper",$$t.$b.$type)},true);$c("BottomClipper:d","EdgeClipper",{init:function(){$$t.$b.init.call(this)},_edge:0,e:function(a){return a.__y<=this._edge},k:function(a,b){return{__x:a.__x+(b.__x-a.__x)*(this._edge-a.__y)/(b.__y-a.__y),__y:this._edge,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},$type:new $.ig.Type("BottomClipper",$$t.$b.$type)},true);$c("RightClipper:e","EdgeClipper",{init:function(){$$t.$b.init.call(this)},_edge:0,e:function(a){return a.__x<=this._edge},k:function(a,b){return{__x:this._edge,__y:a.__y+(b.__y-a.__y)*(this._edge-a.__x)/(b.__x-a.__x),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},$type:new $.ig.Type("RightClipper",$$t.$b.$type)},true);$c("TopClipper:f","EdgeClipper",{init:function(){$$t.$b.init.call(this)},_edge:0,e:function(a){return a.__y>=this._edge},k:function(a,b){return{__x:a.__x+(b.__x-a.__x)*(this._edge-a.__y)/(b.__y-a.__y),__y:this._edge,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},$type:new $.ig.Type("TopClipper",$$t.$b.$type)},true);$c("Flattener:g","Object",{init:function(){$.ig.$op.init.call(this)},l:function(a,b,c,d,e){if($.ig.util.isNaN(e)||e<=0){e=1}var f=new $$4.v(Number,0);var g=new $$4.y($$t.$i.$type);var h=(d-b)/(c-a);var i=b-h*a;var j=h*h;var k=i*i;var l=i*h;g.push(function(){var $ret=new $$t.i;$ret.a=0;$ret.b=1;return $ret}());while(g.count()!=0){var m=g.pop();var n=b+m.a*(d-b);var o=a+m.a*(c-a);var p=o*o;var q=p*o;var r=b+m.b*(d-b);var s=a+m.b*(c-a);var t=s*s;var u=t*s;var v;if(h==0){v=k*(s-o)/2+l*(t-p)/2+j*(u-q)/6}else{v=(Math.pow(i+h*s,3)-Math.pow(i+h*o,3))/(6*h)}var w=.5*n*r*Math.sin(s-o);if(v-w>e){var x=.5*(m.a+m.b);g.push(function(){var $ret=new $$t.i;$ret.a=x;$ret.b=m.b;return $ret}());g.push(function(){var $ret=new $$t.i;$ret.a=m.a;$ret.b=x;return $ret}())}else{f.add(m.a)}}f.add(1);return f},h:function(a,b,c,d){var e=new $$4.v($.ig.Number.prototype.$type,0);$$t.$g.g(e,b,c,0,a-1,d);return e},g:function(a,b,c,d,e,f){return $$t.$g.f(a,function(g){return g},b,c,d,e,f)},e:function(a,b,c,d,e,f,g){return $$t.$g.f(a,function(h){return b.item(h)},c,d,e,f,g)},f:function(a,b,c,d,e,f,g){if(e>f){return a}var h=c(b(e));var i=d(b(e));while(($.ig.util.isNaN(h)||$.ig.util.isNaN(i))&&e<f){++e;h=c(b(e));i=d(b(e))}var j=c(b(f));var k=d(b(f));while(($.ig.util.isNaN(j)||$.ig.util.isNaN(k))&&e<f){--f;j=c(b(f));k=d(b(f))}if(e==f){a.add(b(e));return a}a.add(b(e));$$t.$g.o(a,b,c,d,e,f,g);a.add(b(f));return a},i:function(a,b,c,d,e,f){if(d>e){return a}var g=b[d];var h=c[d];while(($.ig.util.isNaN(g)||$.ig.util.isNaN(h))&&d<e){++d;g=b[d];h=c[d]}var i=b[e];var j=c[e];while(($.ig.util.isNaN(i)||$.ig.util.isNaN(j))&&d<e){--e;i=b[e];j=c[e]}if(d==e){a.add(d);return a}a.add(d);$$t.$g.m(a,b,c,d,e,f);a.add(e);return a},c:function(a,b,c,d,e){var f;var g;if(c){f=0;g=1}else if(d){f=0;g=2}else{f=2;g=3}return $$t.$g.d(a,b,f,g,e)},b:function(a,b,c,d,e){var f=new $$4.v($.ig.Number.prototype.$type,0);var g=$$t.$g.a(f,b,c,d,0,a-1,e);return g},d:function(a,b,c,d,e){var f=new $$4.v($.ig.Number.prototype.$type,0);$$t.$g.k(f,b,c,d,0,a-1,e);return f},a:function(a,b,c,d,e,f,g){var h=$$t.$h.instance().chunkingAmount();if(f-e+1<=h){return $$t.$g.j(a,b,c,d,e,f,g)}var i=a;if(h<0){for(var j=e;j<=f;j++){i.add(j)}return i}var k=e;var l=f;var m=l-k+1;while(m>0){if(m<=h){$$t.$g.j(i,b,c,d,k,l,g);k=l+1}else{var n=k+h-1;$$t.$g.j(i,b,c,d,k,n,g);k=n+1}m=l-k+1}return i},j:function(a,b,c,d,e,f,g){var h;var i;if(c){h=0;i=1}else if(d){h=0;i=2}else{h=2;i=3}return $$t.$g.k(a,b,h,i,e,f,g)},k:function(a,b,c,d,e,f,g){if(e>f){return a}var h=b.__inner[e];var i,j;i=h[c];j=h[d];while(($.ig.util.isNaN(i)||$.ig.util.isNaN(j))&&e<f){++e;h=b.__inner[e];i=h[c];j=h[d]}var k=b.__inner[f];var l,m;l=k[c];m=k[d];while(($.ig.util.isNaN(l)||$.ig.util.isNaN(m))&&e<f){--f;k=b.__inner[f];l=k[c];m=k[d]}if(e==f){a.add(e);return a}a.add(e);$$t.$g.n(a,b,c,d,e,f,g);a.add(f);return a},m:function(a,b,c,d,e,f){var g=b[d];var h=c[d];while(($.ig.util.isNaN(g)||$.ig.util.isNaN(h))&&d<e){++d;g=b[d];h=c[d]}var i=b[e];var j=c[e];while(($.ig.util.isNaN(i)||$.ig.util.isNaN(j))&&d<e){--e;i=b[e];j=c[e]}if(d+1>=e){return}var k=-1;var l=f*f;var m;var n;m=i-g;n=j-h;var o=m*m+n*n;if(o==0){for(var p=d+1;p<e;++p){var q=b[p];var r=c[p];if($.ig.util.isNaN(q)||$.ig.util.isNaN(r)){continue}m=i-q;n=j-r;var s=m*m+n*n;if(s>=l){l=s;k=p}}}else{var t=i-g;var u=j-h;for(var v=d+1;v<e;++v){var w=b[v];var x=c[v];if($.ig.util.isNaN(w)||$.ig.util.isNaN(x)){continue}var y=NaN;var z=b[v]-g;var aa=c[v]-h;var ab=t*z+u*aa;if(ab<=0){m=g-w;n=h-x;y=m*m+n*n}else{var ac=t*t+u*u;if(ac<=ab){m=i-w;n=j-x;y=m*m+n*n}else{var ad=ab/ac;m=g+ad*t-w;n=h+ad*u-x;y=m*m+n*n}}if(y>=l){l=y;k=v}}}if(k!=-1){$$t.$g.m(a,b,c,d,k,f);a.add(k);$$t.$g.m(a,b,c,k,e,f)}return},n:function(a,b,c,d,e,f,g){var h=b.__inner[e];var i,j;i=h[c];j=h[d];while(i!=i||j!=j&&e<f){++e;h=b.__inner[e];i=h[c];j=h[d]}var k=b.__inner[f];var l,m;l=k[c];m=k[d];while(l!=l||m!=m&&e<f){--f;k=b.__inner[f];l=k[c];m=k[d]}if(e+1>=f){return}var n=-1;var o=g*g;var p;var q;p=l-i;q=m-j;var r=p*p+q*q;if(r==0){for(var s=e+1;s<f;++s){var t=b.__inner[s];var u,v;u=t[c];v=t[d];if(u!=u||v!=v){continue}p=l-u;q=m-v;var w=p*p+q*q;if(w>=o){o=w;n=s}}}else{var x=l-i;var y=m-j;for(var z=e+1;z<f;++z){var aa=b.__inner[z];var ab,ac;ab=aa[c];ac=aa[d];if(ab!=ab||ac!=ac){continue}var ad=NaN;var ae=ab-i;var af=ac-j;var ag=x*ae+y*af;if(ag<=0){p=i-ab;q=j-ac;ad=p*p+q*q}else{var ah=x*x+y*y;if(ah<=ag){p=l-ab;q=m-ac;ad=p*p+q*q}else{var ai=ag/ah;p=i+ai*x-ab;q=j+ai*y-ac;ad=p*p+q*q}}if(ad>=o){o=ad;n=z}}}if(n!=-1){$$t.$g.n(a,b,c,d,e,n,g);a.add(n);$$t.$g.n(a,b,c,d,n,f,g)}return},o:function(a,b,c,d,e,f,g){var h=c(b(e));var i=d(b(e));while(($.ig.util.isNaN(h)||$.ig.util.isNaN(i))&&e<f){++e;h=c(b(e));i=d(b(e))}var j=c(b(f));var k=d(b(f));while(($.ig.util.isNaN(j)||$.ig.util.isNaN(k))&&e<f){--f;j=c(b(f));k=d(b(f))}if(e+1>=f){return}var l=-1;var m=g;var n=$.ig.MathUtil.prototype.j(j-h,k-i);if(n==0){for(var o=e+1;o<f;++o){var p=c(b(o));var q=d(b(o));if($.ig.util.isNaN(p)||$.ig.util.isNaN(q)){continue}var r=$.ig.MathUtil.prototype.j(j-p,k-q);if(r>=m){m=r;l=o}}}else{var s=j-h;var t=k-i;for(var u=e+1;u<f;++u){var v=c(b(u));var w=d(b(u));if($.ig.util.isNaN(v)||$.ig.util.isNaN(w)){continue}var x=NaN;var y=c(b(u))-h;var z=d(b(u))-i;var aa=s*y+t*z;if(aa<=0){x=$.ig.MathUtil.prototype.j(h-v,i-w)}else{var ab=s*s+t*t;if(ab<=aa){x=$.ig.MathUtil.prototype.j(j-v,k-w)}else{var ac=aa/ab;x=$.ig.MathUtil.prototype.j(h+ac*s-v,i+ac*t-w)}}if(x>=m){m=x;l=u}}}if(l!=-1){$$t.$g.o(a,b,c,d,e,l,g);a.add(b(l));$$t.$g.o(a,b,c,d,l,f,g)}return},p:function(a,b,c){var d=new $$a.v(0);if(a<5){for(var e=0;e<a;++e){d.add({__x:b(e),__y:c(e),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName})}return d}d.add({__x:b(0),__y:c(0),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName});var f=a-1;var g;var h={__x:b(0),__y:c(0),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};var i={__x:b(0+1),__y:c(0+1),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};var j={__x:b(0+2),__y:c(0+2),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};var k;var l;var m={__x:i.__x-h.__x,__y:i.__y-h.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};var n=$.ig.MathUtil.prototype.j(m.__x,m.__y);var o={__x:j.__x-i.__x,__y:j.__y-i.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};var p=$.ig.MathUtil.prototype.j(o.__x,o.__y);var q;var r;var s=.1;var t=.3;{q={__x:j.__x-h.__x,__y:j.__y-h.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};{var u=$.ig.MathUtil.prototype.j(q.__x,q.__y);q.__x/=u;q.__y/=u}r=.5+(m.__x*o.__x+m.__y*o.__y)/(2*n*p);d.add({__x:i.__x-q.__x*(s+t*r)*n,__y:i.__y-q.__y*(s+t*r)*n,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName});d.add(i)}for(var v=1;v<f-1;++v){g=h;h=i;i=j;j={__x:b(v+2),__y:c(v+2),$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};k=m;l=n;m=o;n=p;o={__x:j.__x-i.__x,__y:j.__y-i.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};p=$.ig.MathUtil.prototype.j(o.__x,o.__y);var w=q;var x=r;q={__x:j.__x-h.__x,__y:j.__y-h.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};{var y=$.ig.MathUtil.prototype.j(q.__x,q.__y);q.__x/=y;q.__y/=y}r=.5+(m.__x*o.__x+m.__y*o.__y)/(2*n*p);d.add({__x:h.__x+w.__x*(s+t*x)*n,__y:h.__y+w.__y*(s+t*x)*n,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName});d.add({__x:i.__x-q.__x*(s+t*r)*n,__y:i.__y-q.__y*(s+t*r)*n,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName});d.add(i)}{g=h;h=i;i=j;k=m;l=n;m=o;n=p;var z=q;var aa=r;d.add({__x:h.__x+z.__x*(s+t*aa)*n,__y:h.__y+z.__y*(s+t*aa)*n,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName});d.add(i)}return d},$type:new $.ig.Type("Flattener",$.ig.$ot)},true);$c("FlattenerSettings:h","Object",{init:function(){$.ig.$op.init.call(this);this.chunkingAmount(3e3)},instance:function(){if($$t.$h.a==null){$$t.$h.a=new $$t.h}return $$t.$h.a},_chunkingAmount:0,chunkingAmount:function(a){if(arguments.length===1){this._chunkingAmount=a;return a}else{return this._chunkingAmount}},$type:new $.ig.Type("FlattenerSettings",$.ig.$ot)},true);$c("SpiralTodo:i","Object",{init:function(){$.ig.$op.init.call(this)},a:0,b:0,$type:new $.ig.Type("SpiralTodo",$.ig.$ot)},true);$c("GeometryUtil:j","Object",{init:function(){$.ig.$op.init.call(this)},g:function(a){if($.ig.util.isNaN(a)||Number.isInfinity(a)){return a}while(a>360){a-=360}while(a<0){a+=360}return a},c:function(a){return Math.atan(a)},h:function(a,b){return(b.__y-a.__y)/(b.__x-a.__x)},d:function(a){return 1-Math.pow(a.height()/2,2)/Math.pow(a.width()/2,2)},n:function(a,b,c,d,e){var f=Math.cos(a);var g=Math.sin(a);var h=Math.sqrt(d*d/(1-b*Math.pow(f,2)));h*=e;return{__x:h*f+c.__x,__y:h*g+c.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},j:function(a,b,c,d,e){var f;if(c){f=$$t.$j.k({__x:a/2,__y:b/2,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName},d,e)}else{f={__x:a/2,__y:b/2,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}}return f},k:function(a,b,c){b=b/180*Math.PI;var d=a.__y+c*Math.sin(b);var e=a.__x+c*Math.cos(b);return{__x:e,__y:d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},m:function(a,b,c){var d=b.__x-a.__x;var e=b.__y-a.__y;var f=Math.sqrt(d*d+e*e);d=d/f*c;e=e/f*c;return{__x:a.__x+d,__y:a.__y+e,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},f:function(a,b){var c=Math.abs(b.__x-a.__x);var d=Math.abs(b.__y-a.__y);return Math.sqrt(c*c+d*d)},l:function(a,b,c,d,e){return $.ig.CoreGeometryUtil.prototype.b(a,b,c,d,e)},e:function(a,b){var c=Math.sqrt(Math.pow(b.__x-a.__x,2)+Math.pow(b.__y-a.__y,2));var d=Math.acos((b.__x-a.__x)/c);if(b.__y-a.__y<0){d=2*Math.PI-d}return d},i:function(a,b,c,d){var e=a.__x-c.__x;var f=a.__y-c.__y;var g=b.__x-c.__x;var h=b.__y-c.__y;var i=g-e;var j=h-f;var k=Math.sqrt(i*i+j*j);var l=e*h-g*f;var m=d*d;var n=k*k;var o=l*l;var p=m*n-o;if(p<0){return new $$6.t($$a.$u.$type,$$a.$u.$type,{__x:NaN,__y:NaN,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName},{__x:NaN,__y:NaN,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName})}var q=1;if(j<0){q=-1}var r=(l*j+q*i*Math.sqrt(p))/n;var s=(l*j-q*i*Math.sqrt(p))/n;var t=(-1*l*i+Math.abs(j)*Math.sqrt(p))/n;var u=(-1*l*i-Math.abs(j)*Math.sqrt(p))/n;return new $$6.t($$a.$u.$type,$$a.$u.$type,{__x:r+c.__x,__y:t+c.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName},{__x:s+c.__x,__y:u+c.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName})},a:function(a,b,c,d){var e=d*d;var f=b.__x;var g=b.__y;var h=c.__x;var i=c.__y;var j=a.__x;var k=a.__y;if(g==i){var l=Math.abs(g-k)<d;var m=j>=Math.min(f,h)-d&&j<=Math.max(f,h)+d;if(l&&m){return true}else{return false}}if(f==h){var n=Math.abs(f-j)<d;var o=k>=Math.min(g,i)-d&&k<=Math.max(g,i)+d;if(n&&o){return true}else{return false}}var p=h-f;var q=i-g;var r=p*p+q*q;if(r==0){return(j-f)*(j-f)+(k-g)*(k-g)<e}var s=((j-f)*p+(k-g)*q)/r;s=s<0?0:s>1?1:s;var t=f+p*s;var u=g+q*s;var v=(t-j)*(t-j)+(u-k)*(u-k);if(v<e){return true}return false},b:function(a,b,c,d){var e;var f;var g=d*d;var h=c.count();if(h==0){return(a.__x-b.__x)*(a.__x-b.__x)+(a.__y-b.__y)*(a.__y-b.__y)<g}var i=a.__x;var j=a.__y;for(var k=0;k<h;k++){if(k==0){f=c.item(k);e=b}else{f=c.item(k);e=c.item(k-1)}var l=e.__x;var m=e.__y;var n=f.__x;var o=f.__y;if(m==o){var p=Math.abs(m-j)<d;var q=i>=Math.min(l,n)-d&&i<=Math.max(l,n)+d;if(p&&q){return true}else{continue}}if(l==n){var r=Math.abs(l-i)<d;var s=j>=Math.min(m,o)-d&&j<=Math.max(m,o)+d;if(r&&s){return true}else{continue}}var t=n-l;var u=o-m;var v=t*t+u*u;if(v==0){return(i-l)*(i-l)+(j-m)*(j-m)<g}var w=((i-l)*t+(j-m)*u)/v;w=w<0?0:w>1?1:w;var x=l+t*w;var y=m+u*w;var z=(x-i)*(x-i)+(y-j)*(y-j);if(z<g){return true}}return false},$type:new $.ig.Type("GeometryUtil",$.ig.$ot)},true);$c("PathFigureUtil:k","Object",{init:function(){$.ig.$op.init.call(this)},b:function(a){var b=new $$a.a4;var d=a.getEnumerator();while(d.moveNext()){var c=d.current();b.add($$t.$k.a(c))}return b},a:function(a){if(a==null){return null}var b=new $$a.a7;var d=a.__segments.getEnumerator();while(d.moveNext()){var c=d.current();switch(c.a()){case 4:var e=c;var f=new $$a.bc;f._b=e._b;f._e=e._e;f._c=e._c;f._f=e._f;f._d=e._d;b.add(f);break;case 0:var g=c;var h=new $$a.a8(1);h.c(g.c());b.add(h);break;case 3:var i=c;var j=new $$a.bb;var l=i.__points.getEnumerator();while(l.moveNext()){var k=l.current();j.__points.add(k)}b.add(j);break}}return function(){var $ret=new $$a.a3;$ret.isClosed(a.__isClosed);$ret.isFilled(a.__isFilled);$ret.startPoint(a.__startPoint);$ret.segments(b);return $ret}()},$type:new $.ig.Type("PathFigureUtil",$.ig.$ot)},true);$c("PolygonUtil:l","Object",{init:function(){$.ig.$op.init.call(this)},a:function(a,b){if(a==null){return false}var c=a.count();if(c<4){return false}var d=false;for(var e=0,f=c-1;e<c;f=e++){if(a.item(e).__y>b.__y!=a.item(f).__y>b.__y&&b.__x<(a.item(f).__x-a.item(e).__x)*(b.__y-a.item(e).__y)/(a.item(f).__y-a.item(e).__y)+a.item(e).__x){d=!d}}return d},$type:new $.ig.Type("PolygonUtil",$.ig.$ot)},true);$c("PolySimplification:m","Object",{init:function(){$.ig.$op.init.call(this)},b:function(a,b){var c=a._a;var d=a._b;if(c.length==0){return 0}var e=0;var f=0;var g=b*b;e++;var h;var i;var j;for(var k=0;k<c.length;k++){h=c[k]-c[f];i=d[k]-d[f];j=h*h+i*i;if(j>g){c[e]=c[k];d[e]=d[k];e++;f=k}}return e},a:function(a,b){var c=b.__x-a.__x;var d=b.__y-a.__y;return c*c+d*d},$type:new $.ig.Type("PolySimplification",$.ig.$ot)},true);$c("ISmartPlaceable:p","Object",{$type:new $.ig.Type("ISmartPlaceable",null)},true);$c("SmartPlaceableWrapper$1:n","Object",{$t:null,init:function($t){this.$t=$t;this.$type=this.$type.specialize(this.$t);this._j=new $$a.ab;$.ig.$op.init.call(this);this._f=false},_f:false,c:null,d:function(a){if(arguments.length===1){this.c=a;return a}else{return this.c}},_g:null,_i:null,getSmartPositions:function(){if(this._f){return this.$type.getStaticFields($$t.$n.$type).a}else{return this.$type.getStaticFields($$t.$n.$type).b}},_j:null,k:function(){return this._j},getSmartBounds:function(a){var b=this.k();var c=b.k();var d=b.j();var e;{e=this.h(a,c,d)}return new $$a.aa(0,this._i.__x+e.__x,this._i.__y+e.__y,c,d)},opacity:function(a){if(arguments.length===1){this.d().__opacity=a;return a}else{return this.d().__opacity}},smartPosition:function(a){if(arguments.length===1){this.e=a;var b=this.k();var c=b.j();var d=b.k();var e;{e=this.h(this.e,d,c)}this._g={__x:this._i.__x+e.__x,__y:this._i.__y+e.__y,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};return a}else{return this.e}},e:0,h:function(a,b,c){var d=.25;switch(a){case 0:return{__x:-b*d,__y:-c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 1:return{__x:0,__y:-c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 2:return{__x:b*d,__y:-c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 3:return{__x:-b*d,__y:0,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 4:return{__x:0,__y:0,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 5:return{__x:b*d,__y:0,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 6:return{__x:-b*d,__y:c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};case 7:return{__x:0,__y:c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName};default:return{__x:b*d,__y:c*d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}}},$type:new $.ig.Type("SmartPlaceableWrapper$1",$.ig.$ot,[$$t.$p.$type],function(){this.a=[4];this.b=[4,5,2,1,8,7,0,3,6]})},true);$c("SmartPlacer:q","Object",{init:function(){this.a=new $$4.v($$a.$aa.$type,0);$.ig.$op.init.call(this);this._e=$$a.$aa.empty();this._c=.3;this._b=2},_e:null,_c:0,_b:0,d:function(a){if(a==null){return}var b=1.7976931348623157e308;var c=$$a.$aa.empty();var d=7;var e=false;var h=a.getSmartPositions();for(var g=0;g<h.length;g++){var f=h[g];var i=a.getSmartBounds(f);if(this._e.isEmpty()||this._e.containsRect(i)){var j=0;var l=this.a.getEnumerator();while(l.moveNext()){var k=l.current();j+=$.ig.RectUtil.prototype.i(i,k)}if(j==0){b=j;d=f;c=i;e=true;break}if(j<b){b=j;d=f;c=i;e=true}}}var m=0;if(e){m=b/$.ig.RectUtil.prototype.e(c)}if(!e||m>this._c){a.opacity(0)}else{if(b>0){a.opacity(Math.pow(1-$.ig.MathUtil.prototype.c(0,m,1),this._b))}else{a.opacity(1)}a.smartPosition(d);this.a.add(c)}},a:null,$type:new $.ig.Type("SmartPlacer",$.ig.$ot)},true);$c("PointCollectionUtil:r","Object",{init:function(){$.ig.$op.init.call(this)},d:function(a,b,c){if(b==null){return}b.clear();if(a.count()>=2){var d=$$t.$g.h(a.count(),function(e){return a.item(e).__x},function(e){return a.item(e).__y},c);var f=d.getEnumerator();while(f.moveNext()){var e=f.current();b.add(a.item(e))}}},g:function(a){var b=Number.POSITIVE_INFINITY;var c=Number.POSITIVE_INFINITY;var d=Number.NEGATIVE_INFINITY;var e=Number.NEGATIVE_INFINITY;var g=a.getEnumerator();while(g.moveNext()){var f=g.current();b=Math.min(b,f.__x);c=Math.min(c,f.__y);d=Math.max(d,f.__x);e=Math.max(e,f.__y)}if(Number.isInfinity(b)||Number.isInfinity(c)||Number.isInfinity(c)||Number.isInfinity(e)){return $$a.$aa.empty()}return new $$a.aa(0,b,c,d-b,e-c)},h:function(a){var b=$$a.$aa.empty();var d=a.getEnumerator();while(d.moveNext()){var c=d.current();b.union($$t.$r.g(c))}return b},i:function(a){var b=Number.POSITIVE_INFINITY;var c=Number.POSITIVE_INFINITY;var d=Number.NEGATIVE_INFINITY;var e=Number.NEGATIVE_INFINITY;var f;for(var g=0;g<a.count();g++){f=a.item(g);b=Math.min(b,f.__x);c=Math.min(c,f.__y);d=Math.max(d,f.__x);e=Math.max(e,f.__y)}if(Number.isInfinity(b)||Number.isInfinity(c)||Number.isInfinity(c)||Number.isInfinity(e)){return $$a.$aa.empty()}return new $$a.aa(0,b,c,d-b,e-c)},j:function(a){var b=$$a.$aa.empty();var c;for(var d=0;d<a.count();d++){c=a.__inner[d];b.union($$t.$r.i(c))}return b},k:function(a){var b=$$a.$aa.empty();var c;for(var d=0;d<a.count();d++){c=a.__inner[d];b.union($$t.$r.i(c))}return b},c:function(a,b,c){var d=a.count();for(var e=0;e<d;e++){c.j(a.item(e))}c.i(null)},e:function(a){var b=0;var c=0;var d=0;var f=a.getEnumerator();while(f.moveNext()){var e=f.current();b+=e.__x;c+=e.__y;d+=1}return{__x:b/d,__y:c/d,$type:$.ig.Point.prototype.$type,getType:$.ig.Object.prototype.getType,getGetHashCode:$.ig.Object.prototype.getGetHashCode,typeName:$.ig.Object.prototype.typeName}},f:function(a){var b=new $$a.v(0);var d=a.getEnumerator();while(d.moveNext()){var c=d.current();b.add(c)}return b},b:function(a){var b=new $$4.v($$a.$u.$type,0);var d=a.getEnumerator();while(d.moveNext()){var c=d.current();b.add(c)}return b},a:function(a){var b=new $$4.v($$a.$v.$type,0);var c;var d=a.count();for(var e=0;e<d;e++){c=a.__inner[e];var f=new $$a.v(1,c);b.add(f)}return b},$type:new $.ig.Type("PointCollectionUtil",$.ig.$ot)},true);$$t.$o.leftTop=0;$$t.$o.centerTop=1;$$t.$o.rightTop=2;$$t.$o.leftCenter=3;$$t.$o.centerCenter=4;$$t.$o.rightCenter=5;$$t.$o.leftBottom=6;$$t.$o.centerBottom=7;$$t.$o.rightBottom=8;$$t.$h.a=null});(function($){$(document).ready(function(){var wm=$("#__ig_wm__").length>0?$("#__ig_wm__"):$("<div id='__ig_wm__'></div>").appendTo(document.body);wm.css({position:"fixed",bottom:0,right:0,zIndex:1e3}).addClass("ui-igtrialwatermark")})})(jQuery);