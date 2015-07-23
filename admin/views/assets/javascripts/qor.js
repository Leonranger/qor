!function(t){"function"==typeof define&&define.amd?define("datepicker",["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"number"==typeof t}function i(t){return t%4===0&&t%100!==0||t%400===0}function n(t,e){return[31,i(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]}function a(t){var e,i,n=t.match(/[.\/\-\s].*?/)||"/",a=t.split(/\W+/);if(!a||0===a.length)throw new Error("Invalid date format.");for(t={separator:n[0],parts:a},e=a.length,i=0;e>i;i++)switch(a[i]){case"dd":case"d":t.day=!0;break;case"mm":case"m":t.month=!0;break;case"yyyy":case"yy":t.year=!0}return t}function s(t,e){var i,n,a,s,o,r,d;if(i="string"==typeof t&&t?t.split(e.separator):[],n=e.parts.length,t=new Date,a=t.getFullYear(),s=t.getDate(),o=t.getMonth(),i.length===n)for(d=0;n>d;d++)switch(r=parseInt(i[d],10)||1,e.parts[d]){case"dd":case"d":s=r;break;case"mm":case"m":o=r-1;break;case"yy":a=2e3+r;break;case"yyyy":a=r}return new Date(a,o,s,0,0,0,0)}function o(t,e){var i,n={d:t.getDate(),m:t.getMonth()+1,yy:t.getFullYear().toString().substring(2),yyyy:t.getFullYear()},a=[],s=e.parts.length;for(n.dd=(n.d<10?"0":"")+n.d,n.mm=(n.m<10?"0":"")+n.m,i=0;s>i;i++)a.push(n[e.parts[i]]);return a.join(e.separator)}var r=t(window),d=t(document),l="datepicker",h="click."+l,c="keyup."+l,u="focus."+l,p="resize."+l,f=function(e,i){this.$element=t(e),this.options=t.extend({},f.DEFAULTS,t.isPlainObject(i)&&i),this.visible=!1,this.isInput=!1,this.isInline=!1,this.init()};f.prototype={constructor:f,init:function(){var e,i=this.$element,n=this.options;this.$trigger=t(n.trigger||i),this.$picker=e=t(n.template),this.$years=e.find('[data-type="years picker"]'),this.$months=e.find('[data-type="months picker"]'),this.$days=e.find('[data-type="days picker"]'),this.isInput=i.is("input")||i.is("textarea"),this.isInline=n.inline&&(n.container||!this.isInput),this.isInline?(e.find(".datepicker-arrow").hide(),t(n.container||i).append(e)):(t(n.container||"body").append(e),this.place(),e.hide()),n.date&&i.data("date",n.date),this.format=a(n.dateFormat),this.fillWeek(),this.bind(),this.update(),this.isInline&&this.show()},bind:function(){var e=this.$element,i=this.options;this.$picker.on(h,t.proxy(this.click,this)),this.isInline||(this.isInput&&(e.on(c,t.proxy(this.update,this)),i.trigger||e.on(u,t.proxy(this.show,this))),this.$trigger.on(h,t.proxy(this.show,this)))},unbind:function(){var t=this.$element,e=this.options;this.$picker.off(h,this.click),this.isInline||(this.isInput&&(t.off(c,this.update),e.trigger||t.off(u,this.show)),this.$trigger.off(h,this.show))},showView:function(t){var e=this.format;if(e.year||e.month||e.day)switch(t){case 2:case"years":this.$months.hide(),this.$days.hide(),e.year?(this.fillYears(),this.$years.show()):this.showView(0);break;case 1:case"months":this.$years.hide(),this.$days.hide(),e.month?(this.fillMonths(),this.$months.show()):this.showView(2);break;default:this.$years.hide(),this.$months.hide(),e.day?(this.fillDays(),this.$days.show()):this.showView(1)}},hideView:function(){this.options.autoClose&&this.hide()},place:function(){var t=this.$trigger,e=t.offset();this.$picker.css({position:"absolute",top:e.top+t.outerHeight(),left:e.left,zIndex:this.options.zIndex})},show:function(){this.visible||(this.visible=!0,this.$picker.show(),this.isInline||(r.on(p,t.proxy(this.place,this)),d.on(h,t.proxy(function(t){t.target!==this.$element[0]&&this.hide()},this))),this.showView(this.options.viewStart))},hide:function(){this.visible&&(this.visible=!1,this.$picker.hide(),this.isInline||(r.off(p,this.place),d.off(h,this.hide)))},update:function(){var t=this.$element,e=t.data("date")||(this.isInput?t.prop("value"):t.text());this.date=e=s(e,this.format),this.viewDate=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this.fillAll()},change:function(){var t=this.$element,e=o(this.date,this.format);this.isInput?t.prop("value",e):this.isInline||t.text(e),t.data("date",e).trigger("change")},getMonthByNumber:function(t,i){var n=this.options,a=i?n.monthsShort:n.months;return a[e(t)?t:this.date.getMonth()]},getDayByNumber:function(t,i,n){var a=this.options,s=n?a.daysMin:i?a.daysShort:a.days;return s[e(t)?t:this.date.getDay()]},getDate:function(t){return t?o(this.date,this.format):new Date(this.date)},template:function(e){var i=this.options,n={text:"",type:"",selected:!1,disabled:!1};return t.extend(n,e),["<"+i.itemTag+" ",n.selected?'class="'+i.selectedClass+'"':n.disabled?'class="'+i.disabledClass+'"':"",n.type?' data-type="'+n.type+'"':"",">",n.text,"</"+i.itemTag+">"].join("")},fillAll:function(){this.fillYears(),this.fillMonths(),this.fillDays()},fillYears:function(){var t,e,i="",n=[],a=this.options.yearSuffix||"",s=this.date.getFullYear(),o=this.viewDate.getFullYear();for(i=o-5+a+" - "+(o+6)+a,e=-5;7>e;e++)t=o+e===s,n.push(this.template({text:o+e,type:t?"year selected":"year",selected:t,disabled:-5===e||6===e}));this.$picker.find('[data-type="years current"]').html(i),this.$picker.find('[data-type="years"]').empty().html(n.join(""))},fillMonths:function(){var t,e,i="",n=[],a=this.options.monthsShort,s=this.date.getFullYear(),o=this.date.getMonth(),r=this.viewDate.getFullYear();for(i=r.toString()+this.options.yearSuffix||"",e=0;12>e;e++)t=r===s&&e===o,n.push(this.template({text:a[e],type:t?"month selected":"month",selected:t}));this.$picker.find('[data-type="year current"]').html(i),this.$picker.find('[data-type="months"]').empty().html(n.join(""))},fillWeek:function(){var e,i=this.options,n=[],a=i.daysMin,s=parseInt(i.weekStart,10)%7;for(a=t.merge(a.slice(s),a.slice(0,s)),e=0;7>e;e++)n.push(this.template({text:a[e]}));this.$picker.find('[data-type="week"]').html(n.join(""))},fillDays:function(){var e,i,a,s,o,r,d="",l=[],h=[],c=[],u=[],p=this.options.monthsShort,f=this.options.yearSuffix||"",m=this.date.getFullYear(),y=this.date.getMonth(),g=this.date.getDate(),v=this.viewDate.getFullYear(),b=this.viewDate.getMonth(),w=parseInt(this.options.weekStart,10)%7;for(d=this.options.showMonthAfterYear?v+f+" "+p[b]:p[b]+" "+v+f,a=0===b?n(v-1,11):n(v,b-1),o=1;a>=o;o++)h.push(this.template({text:o,type:"day prev",disabled:!0}));for(s=new Date(v,b,1,0,0,0,0),r=(7+(s.getDay()-w))%7,r=r>0?r:7,h=h.slice(a-r),a=11===b?n(v+1,0):n(v,b+1),o=1;a>=o;o++)u.push(this.template({text:o,type:"day next",disabled:!0}));for(a=n(v,b),s=new Date(v,b,a,0,0,0,0),r=(7-(s.getDay()+1-w))%7,r=r>=42-(h.length+a)?r:r+7,u=u.slice(0,r),o=1;a>=o;o++)e=v===m&&b===y&&o===g,i=this.options.isDisabled(new Date(v,b,o)),c.push(this.template({text:o,type:i?"day disabled":e?"day selected":"day",selected:e,disabled:i}));t.merge(l,h),t.merge(l,c),t.merge(l,u),this.$picker.find('[data-type="month current"]').html(d),this.$picker.find('[data-type="days"]').empty().html(l.join(""))},click:function(e){var i,n,a,s,o,r=t(e.target),d=/^\d{2,4}$/,l=!1;if(e.stopPropagation(),e.preventDefault(),0!==r.length)switch(i=this.viewDate.getFullYear(),n=this.viewDate.getMonth(),a=this.viewDate.getDate(),o=r.data().type){case"years prev":case"years next":i="years prev"===o?i-10:i+10,s=r.text(),l=d.test(s),l&&(i=parseInt(s,10),this.date=new Date(i,n,Math.min(a,28),0,0,0,0)),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillYears(),l&&(this.showView(1),this.change());break;case"year prev":case"year next":i="year prev"===o?i-1:i+1,this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillMonths();break;case"year current":this.format.year&&this.showView(2);break;case"year selected":this.format.month?this.showView(1):this.hideView();break;case"year":i=parseInt(r.text(),10),this.date=new Date(i,n,Math.min(a,28),0,0,0,0),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.format.month?this.showView(1):this.hideView(),this.change();break;case"month prev":case"month next":n="month prev"===o?n-1:"month next"===o?n+1:n,this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.fillDays();break;case"month current":this.format.month&&this.showView(1);break;case"month selected":this.format.day?this.showView(0):this.hideView();break;case"month":n=r.parent().children().index(r),this.date=new Date(i,n,Math.min(a,28),0,0,0,0),this.viewDate=new Date(i,n,Math.min(a,28),0,0,0,0),this.format.day?this.showView(0):this.hideView(),this.change();break;case"day prev":case"day next":case"day":n="day prev"===o?n-1:"day next"===o?n+1:n,a=parseInt(r.text(),10),this.date=new Date(i,n,a,0,0,0,0),this.viewDate=new Date(i,n,a,0,0,0,0),this.fillDays(),"day"===o&&this.hideView(),this.change();break;case"day selected":this.hideView(),this.change();break;case"day disabled":this.hideView()}},destroy:function(){this.unbind(),this.$picker.remove(),this.$element.removeData(l)}},f.DEFAULTS={date:!1,dateFormat:"mm/dd/yyyy",disabledClass:"disabled",selectedClass:"selected",autoClose:!1,inline:!1,trigger:!1,container:!1,showMonthAfterYear:!1,zIndex:1,viewStart:0,weekStart:0,yearSuffix:"",days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],itemTag:"li",template:'<div class="datepicker-container" data-type="datepicker"><div class="datepicker-arrow"></div><div class="datepicker-content"><div class="content-years" data-type="years picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="years prev">&lsaquo;</li><li class="col-5" data-type="years current"></li><li class="datepicker-next" data-type="years next">&rsaquo;</li></ul><ul class="datepicker-years" data-type="years"></ul></div><div class="content-months" data-type="months picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="year prev">&lsaquo;</li><li class="col-5" data-type="year current"></li><li class="datepicker-next" data-type="year next">&rsaquo;</li></ul><ul class="datepicker-months" data-type="months"></ul></div><div class="content-days" data-type="days picker"><ul class="datepicker-title"><li class="datepicker-prev" data-type="month prev">&lsaquo;</li><li class="col-5" data-type="month current"></li><li class="datepicker-next" data-type="month next">&rsaquo;</li></ul><ul class="datepicker-week" data-type="week"></ul><ul class="datepicker-days" data-type="days"></ul></div></div></div>',isDisabled:function(){return!1}},f.setDefaults=function(e){t.extend(f.DEFAULTS,t.isPlainObject(e)&&e)},f.other=t.fn.datepicker,t.fn.datepicker=function(e){var i,n=[].slice.call(arguments,1);return this.each(function(){var a,s=t(this),o=s.data(l);if(!o){if(/destroy/.test(e))return;s.data(l,o=new f(this,e))}"string"==typeof e&&t.isFunction(a=o[e])&&(i=a.apply(o,n))}),"undefined"==typeof i?this:i},t.fn.datepicker.Constructor=f,t.fn.datepicker.setDefaults=f.setDefaults,t.fn.datepicker.noConflict=function(){return t.fn.datepicker=f.other,this}}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";t(function(){t(document).on("click.qor.alert",'[data-dismiss="alert"]',function(){t(this).closest(".qor-alert").remove()}),setTimeout(function(){t('.qor-alert[data-dismissible="true"]').remove()},3e3)})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.init()}var i="qor.chooser",n="enable."+i,a="disable."+i;return e.prototype={constructor:e,init:function(){var t=this.$element;t.prop("multiple")||t.prepend('<option value="" selected></option>'),t.chosen({allow_single_deselect:!0,disable_search_threshold:10,width:"100%"})},destroy:function(){this.$element.chosen("destroy")}},e.DEFAULTS={},e.plugin=function(n){return this.each(function(){var a,s=t(this),o=s.data(i);if(!o){if(!t.fn.chosen)return;if(/destroy/.test(n))return;s.data(i,o=new e(this,n))}"string"==typeof n&&t.isFunction(a=o[n])&&a.apply(o)})},t(function(){var i='select[data-toggle="qor.chooser"]';t(document).on(a,function(n){e.plugin.call(t(i,n.target),"destroy")}).on(n,function(n){e.plugin.call(t(i,n.target))}).triggerHandler(n)}),e}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";t(document).on("click.qor.confirmer","[data-confirm]",function(e){var i,n=t(this),a=n.data();a.confirm&&(window.confirm(a.confirm)?/DELETE/i.test(a.method)&&(e.preventDefault(),i=a.url||n.attr("href"),a=t.extend({},a,{_method:"DELETE"}),t.post(i,a,function(){window.location.reload()})):e.preventDefault())})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function i(e){var i,n={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(n[String(i).toLowerCase()]=e[i]);return n}function n(i){var n,a={};if(t.isPlainObject(i))for(n in i)i.hasOwnProperty(n)&&(a[e(n)]=i[n]);return a}function a(i,n){var a=String(n),s=a.toLowerCase(),o=a.toUpperCase(),r=e(a);return t.isPlainObject(i)?i[s]||i[r]||i[o]:void 0}var s=window.URL||window.webkitURL,o="qor.cropper",r="enable."+o,d="disable."+o,l="change."+o,h="click."+o,c="shown.bs.modal",u="hidden.bs.modal",p=/x|y|width|height/,f=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},f.DEFAULTS,t.isPlainObject(i)&&i),this.data=null,this.init()};return f.prototype={constructor:f,init:function(){var e,i,n=this.$element,a=this.options,s=n.closest(a.parent);s.length||(s=n.parent()),this.$parent=s,this.$output=e=s.find(a.output),this.$list=s.find(a.list),this.$modal=t(f.MODAL).appendTo("body");try{i=JSON.parse(t.trim(e.val()))}catch(o){}this.data=t.extend(i||{},a.data),this.build(),this.bind()},build:function(){var t,e=this.$list;e.find("li").append(f.TOGGLE),t=e.find("img"),t.wrap(f.CANVAS),this.center(t)},unbuild:function(){var e=this.$list;e.find(".qor-cropper-toggle").remove(),e.find(".qor-cropper-canvas").each(function(){var e=t(this);e.before(e.html()).remove()})},bind:function(){this.$element.on(l,t.proxy(this.read,this)),this.$list.on(h,t.proxy(this.click,this)),this.$modal.on(c,t.proxy(this.start,this)).on(u,t.proxy(this.stop,this))},unbind:function(){this.$element.off(l,this.read),this.$list.off(h,this.click),this.$modal.off(c,this.start).off(u,this.stop)},click:function(e){var i,n=e.target;e.target!==this.$list[0]&&(i=t(n),i.is("img")||(i=i.closest("li").find("img")),this.$target=i,this.$modal.modal("show"))},read:function(){var t,e=this.$element.prop("files");e&&e.length&&(t=e[0],this.data[this.options.key]={},this.$output.val(JSON.stringify(this.data)),/^image\/\w+$/.test(t.type)&&s?this.load(s.createObjectURL(t)):this.$list.empty().text(t.name))},load:function(t){var e,i=this.$list;i.find("ul").length||(i.html(f.LIST),this.build()),e=i.find("img"),e.attr("src",t).data("originalUrl",t),this.center(e,!0)},start:function(){var e=this.options,s=this.$modal,o=this.$target,r=o.data(),d=r.sizeName||"original",l=r.sizeResolution,h=t("<img>").attr("src",r.originalUrl),c=l?a(l,"width")/a(l,"height"):0/0,u=this.data,f=this;u[e.key]||(u[e.key]={}),s.find(".modal-body").html(h),h.cropper({aspectRatio:c,data:i(u[e.key][d]),background:!1,movable:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){s.find(e.save).one("click",function(){var i,a={};t.each(h.cropper("getData"),function(t,e){p.test(t)&&(a[t]=Math.round(e))}),u[e.key][d]=n(a),f.imageData=h.cropper("getImageData"),f.cropData=a;try{i=h.cropper("getCroppedCanvas").toDataURL()}catch(o){}f.output(i),s.modal("hide")})}})},stop:function(){this.$modal.find(".modal-body > img").cropper("destroy").remove()},output:function(t){var e=this.$target;t?this.center(e.attr("src",t)):this.preview(e),this.autoCrop(t),this.$output.val(JSON.stringify(this.data))},preview:function(e){var i,n=e.parent(),a=n.parent(),s=Math.max(a.width(),160),o=Math.max(a.height(),160),r=this.imageData,d=t.extend({},this.cropData),l=d.width/d.height,h=s,c=o;o*l>s?c=h/l:h=c*l,i=d.width/h,t.each(d,function(t,e){d[t]=e/i}),n.css({width:d.width,height:d.height}),e.css({width:r.naturalWidth/i,height:r.naturalHeight/i,maxWidth:"none",maxHeight:"none",marginLeft:-d.x,marginTop:-d.y}),this.center(e)},center:function(e,i){e.each(function(){var e=t(this),n=e.parent(),a=n.parent(),s=function(){var t=a.height(),e=n.height(),i="auto";t>e&&(i=(t-e)/2),n.css("margin-top",i)};i&&n.removeAttr("style"),this.complete?s.call(this):this.onload=s})},autoCrop:function(e){var i=t.extend({},this.cropData),s=i.width/i.height,o=this.data[this.options.key],r=this;this.$list.find("img").not(this.$target).each(function(){var d=t(this),l=d.data(),h=l.sizeName,c=l.sizeResolution,u=c?a(c,"width")/a(c,"height"):0/0;h&&u&&u===s&&!o[h]&&(o[h]=n(i),e?r.center(d.attr("src",e)):r.preview(d))})},destroy:function(){this.unbind(),this.unbuild(),this.$modal.modal("hide").remove(),this.$element.removeData(o)}},f.DEFAULTS={parent:!1,output:!1,list:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",key:"data",data:null},f.TOGGLE='<div class="qor-cropper-toggle"></div>',f.CANVAS='<div class="qor-cropper-canvas"></div>',f.LIST="<ul><li><img></li></ul>",f.MODAL='<div class="modal fade qor-cropper-modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div>',f.plugin=function(e){return this.each(function(){var i,n=t(this),a=n.data(o);if(!a){if(!t.fn.cropper)return;if(/destroy/.test(e))return;n.data(o,a=new f(this,e))}"string"==typeof e&&t.isFunction(i=a[e])&&i.apply(a)})},t(function(){var e=".qor-file-input",i={parent:".form-group",output:".qor-file-options",list:".qor-file-list",key:"CropOptions",data:{Crop:!0}};t(document).on(h,e,function(){f.plugin.call(t(this),i)}).on(d,function(i){f.plugin.call(t(e,i.target),"destroy")}).on(r,function(n){f.plugin.call(t(e,n.target),i)}).triggerHandler(r)}),f}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e="qor.datepicker",i="enable."+e,n="disable."+e,a="change."+e,s="click."+e,o=".qor-datepicker-embedded",r=".qor-datepicker-save",d=function(e,i){this.$element=t(e),this.options=t.extend({},d.DEFAULTS,t.isPlainObject(i)&&i),this.date=null,this.formatDate=null,this.built=!1,this.init()};return d.prototype={init:function(){this.bind()},bind:function(){this.$element.on(s,t.proxy(this.show,this))},unbind:function(){this.$element.off(s,this.show)},build:function(){var e;this.built||(this.$modal=e=t(d.TEMPLATE).appendTo("body"),e.find(o).on(a,t.proxy(this.change,this)).datepicker({date:this.$element.val(),dateFormat:"yyyy-mm-dd",inline:!0}).triggerHandler(a),e.find(r).on(s,t.proxy(this.pick,this)),this.built=!0)},unbuild:function(){this.built&&this.$modal.find(o).off(a,this.change).datepicker("destroy").end().find(r).off(s,this.pick).end().remove()},change:function(e){var i,n=this.$modal,a=t(e.target);this.date=i=a.datepicker("getDate"),this.formatDate=a.datepicker("getDate",!0),n.find(".qor-datepicker-year").text(i.getFullYear()),n.find(".qor-datepicker-month").text(String(a.datepicker("getMonthByNumber",i.getMonth(),!0)).toUpperCase()),n.find(".qor-datepicker-week").text(a.datepicker("getDayByNumber",i.getDay())),n.find(".qor-datepicker-day").text(i.getDate())},show:function(){this.built||this.build(),this.$modal.modal("show")},pick:function(){this.$element.val(this.formatDate),this.$modal.modal("hide")},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(e)}},d.DEFAULTS={},d.TEMPLATE='<div class="modal fade qor-datepicker-modal" id="qorDatepickerModal" tabindex="-1" role="dialog" aria-labelledby="qorDatepickerModalLabel" aria-hidden="true"><div class="modal-dialog qor-datepicker"><div class="modal-content"><div class="modal-header sr-only"><h5 class="modal-title" id="qorDatepickerModalLabel">Pick a date</h5></div><div class="modal-body"><div class="qor-datepicker-picked"><div class="qor-datepicker-week"></div><div class="qor-datepicker-month"></div><div class="qor-datepicker-day"></div><div class="qor-datepicker-year"></div></div><div class="qor-datepicker-embedded"></div></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-datepicker-save">OK</button></div></div></div></div>',d.plugin=function(i){return this.each(function(){var n,a=t(this),s=a.data(e);if(s)i="show";else{if(!t.fn.datepicker)return;if(/destroy/.test(i))return;a.data(e,s=new d(this,i))}"string"==typeof i&&t.isFunction(n=s[i])&&n.apply(s)})},t(function(){var e='[data-toggle="qor.datepicker"]';t(document).on(s,e,function(){d.plugin.call(t(this))}).on(n,function(i){d.plugin.call(t(e,i.target),"destroy")}).on(i,function(i){d.plugin.call(t(e,i.target))}).triggerHandler(i)}),d}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e,a){var s,o=n.search;return t.isArray(e)&&(s=i(o),t.each(e,function(e,i){e=t.inArray(i,s),-1===e?s.push(i):a&&s.splice(e,1)}),o="?"+s.join("&")),o}function i(e){var i=[];return e&&e.indexOf("?")>-1&&(e=e.split("?")[1],e&&e.indexOf("#")>-1&&(e=e.split("#")[0]),e&&(i=t.map(e.split("&"),function(e){var i,n=[];return e=e.split("="),i=e[1],n.push(e[0]),i&&(i=t.trim(decodeURIComponent(i)),i&&n.push(i)),n.join("=")}))),i}var n=window.location,a="qor.filter",s="enable."+a,o="disable."+a,r="click."+a,d="change."+a,l=function(e,i){this.$element=t(e),this.options=t.extend({},l.DEFAULTS,t.isPlainObject(i)&&i),this.init()};return l.prototype={constructor:l,init:function(){this.parse(),this.bind()},bind:function(){var e=this.options;this.$element.on(r,e.label,t.proxy(this.toggle,this)).on(d,e.group,t.proxy(this.toggle,this))},unbind:function(){this.$element.off(r,this.toggle).off(d,this.toggle)},parse:function(){var e=this.options,a=this.$element,s=i(n.search);a.find(e.label).each(function(){var e=t(this);t.each(i(e.attr("href")),function(i,n){var a=t.inArray(n,s)>-1;return e.toggleClass("active",a),a?!1:void 0})}),a.find(e.group).each(function(){var e=t(this),i=e.attr("name");e.find("option").each(function(){var e=t(this),n=[i,e.prop("value")].join("=");return t.inArray(n,s)>-1?(e.attr("selected",!0),!1):void 0})})},toggle:function(a){var s,o,r,d,l,h,c,u=t(a.currentTarget),p={};u.is("select")?(s=i(n.search),d=u.attr("name"),l=u.val(),o=[d],l&&o.push(l),o=o.join("="),p=[o],u.find("option").each(function(){var e=t(this),i=[d],n=t.trim(e.prop("value"));return n&&i.push(n),i=i.join("="),h=t.inArray(i,s),h>-1?(c=i,!1):void 0}),c?(p.push(c),r=e(p,!0)):r=e(p)):u.is("a")&&(a.preventDefault(),p=i(u.attr("href")),r=u.hasClass("active")?e(p,!0):e(p)),n.search=r},destroy:function(){this.unbind(),this.$element.removeData(a)}},l.DEFAULTS={label:!1,group:!1},l.plugin=function(e){return this.each(function(){var i,n=t(this),s=n.data(a);if(!s){if(/destroy/.test(e))return;n.data(a,s=new l(this,e))}"string"==typeof e&&t.isFunction(i=s[e])&&i.apply(s)})},t(function(){var e=".qor-label-container",i={label:".qor-label",group:".qor-label-group"};t(document).on(o,function(i){l.plugin.call(t(e,i.target),"destroy")}).on(s,function(n){l.plugin.call(t(e,n.target),i)}).triggerHandler(s)}),l}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.$clone=null,this.init()}var i=t(window),n="qor.fixer",a="enable."+n,s="disable."+n,o="resize."+n,r="scroll."+n;return e.prototype={constructor:e,init:function(){var t=this.$element;t.is(":hidden")||t.find("tbody:visible > tr:visible").length<=1||(this.$thead=t.find("thead:first"),this.$tbody=t.find("tbody:first"),this.$tfoot=t.find("tfoot:first"),this.resize(),this.bind())},bind:function(){i.on(r,t.proxy(this.toggle,this)).on(o,t.proxy(this.resize,this))},unbind:function(){i.off(r,this.toggle).off(o,this.resize)},build:function(){var e=this.$element,i=this.$thead,n=this.$tbody,a=this.$tfoot,s=this.$clone,o=i.find("> tr").children();this.offsetTop=e.offset().top,this.maxTop=e.outerHeight()-i.height()-n.find("> tr:last").height()-a.height(),s||(this.$clone=s=i.clone().prependTo(e)),s.css({position:"fixed",top:0,zIndex:1,display:"none",width:i.width()}).find("> tr").children().each(function(e){t(this).width(o.eq(e).width())})},unbuild:function(){this.$clone.remove()},toggle:function(){var t=this.$clone,e=i.scrollTop()-this.offsetTop;e>0&&e<this.maxTop?t.show():t.hide()},resize:function(){this.build(),this.toggle()},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(n)}},e.DEFAULTS={},e.plugin=function(i){return this.each(function(){var a,s=t(this),o=s.data(n);o||s.data(n,o=new e(this,i)),"string"==typeof i&&t.isFunction(a=o[i])&&a.call(o)})},t(function(){var i=".qor-list";t(document).on(s,function(n){e.plugin.call(t(i,n.target),"destroy")}).on(a,function(n){e.plugin.call(t(i,n.target))}).triggerHandler(a)}),e}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(e){var i=[];return t.isPlainObject(e)&&t.each(e,function(){i.push(arguments[1])}),i.join()}function i(t){var e=t&&t.split(",");return t=null,e&&4===e.length&&(t={x:Number(e[0]),y:Number(e[1]),width:Number(e[2]),height:Number(e[3])}),t}function n(t){return"string"==typeof t&&(t=t.charAt(0).toUpperCase()+t.substr(1)),t}function a(e){var i,a={};if(t.isPlainObject(e))for(i in e)e.hasOwnProperty(i)&&(a[n(i)]=e[i]);return a}var s=t(window),o="qor.redactor",r="enable."+o,d="disable."+o,l="click."+o,h="focus."+o,c="blur."+o,u="imageupload."+o,p="imagedelete."+o,f=/x|y|width|height/,m=function(e,i){this.$element=t(e),this.options=t.extend(!0,{},m.DEFAULTS,t.isPlainObject(i)&&i),this.init()};return m.prototype={constructor:m,init:function(){var e=this.options,i=this.$element,n=i.closest(e.parent);n.length||(n=i.parent()),this.$parent=n,this.$button=t(m.BUTTON),this.$modal=t(m.MODAL).appendTo("body"),this.bind()},bind:function(){var e=this.$parent,i=t.proxy(this.click,this);this.$element.on(u,function(e,n){t(n).on(l,i)}).on(p,function(e,n){t(n).off(l,i)}).on(h,function(){e.find("img").off(l,i).on(l,i)}).on(c,function(){e.find("img").off(l,i)}),s.on(l,t.proxy(this.removeButton,this))},unbind:function(){this.$element.off(u).off(p).off(h).off(c),s.off(l,this.removeButton)},click:function(e){e.stopPropagation(),setTimeout(t.proxy(this.addButton,this,t(e.target)),1)},addButton:function(e){this.$button.insertBefore(e).off(l).one(l,t.proxy(this.crop,this,e))},removeButton:function(){this.$button.off(l).detach()},crop:function(n){var s=this.options,o=n.attr("src"),r=o,d=t("<img>"),l=this.$modal;t.isFunction(s.replace)&&(r=s.replace(r)),d.attr("src",r),l.one("shown.bs.modal",function(){d.cropper({data:i(n.attr("data-crop-options")),background:!1,movable:!1,zoomable:!1,rotatable:!1,checkImageOrigin:!1,built:function(){l.find(s.save).one("click",function(){var i={};t.each(d.cropper("getData"),function(t,e){f.test(t)&&(i[t]=Math.round(e))}),t.ajax(s.remote,{type:"POST",contentType:"application/json",data:JSON.stringify({Url:o,CropOptions:{original:a(i)},Crop:!0}),dataType:"json",success:function(a){t.isPlainObject(a)&&a.url&&(n.attr("src",a.url).attr("data-crop-options",e(i)).removeAttr("style").removeAttr("rel"),t.isFunction(s.complete)&&s.complete(),l.modal("hide"))}})})}})}).one("hidden.bs.modal",function(){d.cropper("destroy").remove()}).modal("show").find(".modal-body").append(d)},destroy:function(){this.unbind(),this.$modal.modal("hide").remove(),this.$element.removeData(o)}},m.DEFAULTS={remote:!1,toggle:!1,parent:!1,modal:".qor-cropper-modal",save:".qor-cropper-save",replace:null,complete:null},m.BUTTON='<span class="redactor-image-cropper">Crop</span>',m.MODAL='<div class="modal fade qor-cropper-modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Crop the image</h5></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-link" data-dismiss="modal">Cancel</button><button type="button" class="btn btn-link qor-cropper-save">OK</button></div></div></div></div>',m.plugin=function(e){return this.each(function(){var i,n,a=t(this),s=a.data(o);if(s)/destroy/.test(e)&&a.redactor("core.destroy");else{if(!t.fn.redactor)return;if(/destroy/.test(e))return;a.data(o,s={}),i=a.data(),a.redactor({imageUpload:i.uploadUrl,fileUpload:i.uploadUrl,initCallback:function(){a.data(o,s=new m(a,{remote:i.cropUrl,toggle:".redactor-image-cropper",parent:".form-group",replace:function(t){return t.replace(/\.\w+$/,function(t){return".original"+t})},complete:t.proxy(function(){this.code.sync()},this)}))},focusCallback:function(){a.triggerHandler(h)},blurCallback:function(){a.triggerHandler(c)},imageUploadCallback:function(){a.triggerHandler(u,arguments[0])},imageDeleteCallback:function(){a.triggerHandler(p,arguments[1])}})}"string"==typeof e&&t.isFunction(n=s[e])&&n.apply(s)})},t(function(){var e=".qor-textarea";t(document).on(d,function(i){m.plugin.call(t(e,i.target),"destroy")}).on(r,function(i){m.plugin.call(t(e,i.target))}).triggerHandler(r)}),m}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e="qor.replicator",i="enable."+e,n="disable."+e,a="click."+e,s=function(e,i){this.$element=t(e),this.options=t.extend({},s.DEFAULTS,t.isPlainObject(i)&&i),this.index=0,this.init()};return s.prototype={constructor:s,init:function(){var t,e=this.$element,i=this.options,n=e.find(i.itemClass);n.length&&(t=n.filter(i.newClass),t.length||(t=n.last()),this.$template=t,this.template=t.clone().removeClass("hide").prop("outerHTML"),this.parse(),this.bind())},parse:function(){var t=0;this.template=this.template.replace(/(\w+)\="(\S*\[\d+\]\S*)"/g,function(e,i,n){return n=n.replace(/^(\S*)\[(\d+)\]([^\[\]]*)$/,function(e,a,s,o){return e===n?("name"===i&&(t=s),a+"[{{index}}]"+o):void 0}),i+'="'+n+'"'}),this.index=parseFloat(t)},bind:function(){var e=this.options;this.$element.on(a,e.addClass,t.proxy(this.add,this)).on(a,e.delClass,t.proxy(this.del,this))},unbind:function(){this.$element.off(a,this.add).off(a,this.del)},add:function(e){var i,n=this.$template;return n.hasClass("hide")?void n.removeClass("hide"):(i=t(e.target).closest(this.options.addClass),void(i.length&&i.before(this.template.replace(/\{\{index\}\}/g,++this.index))))},del:function(e){var i,n=this.options,s=t(e.target).closest(n.itemClass);s.is(n.newClass)?s.remove():(s.children(":visible").addClass("hidden").hide(),i=t(n.alertTemplate.replace("{{name}}",this.parseName(s))),i.find(n.undoClass).one(a,function(){i.remove(),s.children(".hidden").removeClass("hidden").show()}),s.append(i))},parseName:function(t){var e=t.find("input[name]").attr("name");return e?e.replace(/[^\[\]]+$/,""):void 0},destroy:function(){this.unbind(),this.$element.removeData(e)}},s.DEFAULTS={itemClass:!1,newClass:!1,addClass:!1,delClass:!1,alertTemplate:""},s.plugin=function(i){return this.each(function(){var n,a=t(this),o=a.data(e);o||a.data(e,o=new s(this,i)),"string"==typeof i&&t.isFunction(n=o[i])&&n.call(o)})},t(function(){var e=".qor-collection-group",o={
itemClass:".qor-collection",newClass:".qor-collection-new",addClass:".qor-collection-add",delClass:".qor-collection-del",undoClass:".qor-collection-undo",alertTemplate:'<div class="alert alert-danger"><input type="hidden" name="{{name}}._destroy" value="1"><a href="javascript:void(0);" class="alert-link qor-collection-undo">Undo Delete</a></div>'};t(document).on(a,e,function(){s.plugin.call(t(this),o)}).on(n,function(i){s.plugin.call(t(e,i.target),"destroy")}).on(i,function(i){s.plugin.call(t(e,i.target),o)}).triggerHandler(i)}),s}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e=t(document),i=window.FormData,n="qor.slideout",a="enable."+n,s="disable."+n,o="click."+n,r="submit."+n,d="show."+n,l="shown."+n,h="hide."+n,c="hidden."+n,u=function(e,i){this.$element=t(e),this.options=t.extend({},u.DEFAULTS,t.isPlainObject(i)&&i),this.active=!1,this.disabled=!1,this.animating=!1,this.init()};return u.prototype={constructor:u,init:function(){this.$element.find(".qor-list").length&&(this.build(),this.bind())},build:function(){var e;this.$slideout=e=t(u.TEMPLATE).appendTo("body"),this.$title=e.find(".slideout-title"),this.$body=e.find(".slideout-body")},unbuild:function(){this.$title=null,this.$body=null,this.$slideout.remove()},bind:function(){this.$slideout.on(r,"form",t.proxy(this.submit,this)),e.on(o,t.proxy(this.click,this))},unbind:function(){this.$slideout.off(r,this.submit),e.off(o,this.click)},click:function(e){var i,n,a,s=this.$element,o=this.$slideout.get(0),r=e.target;if(!e.isDefaultPrevented())for(;r!==document&&(i=!1,n=t(r),r!==o);){if(n.data("url")){e.preventDefault(),a=n.data(),this.load(a.url,a);break}if("slideout"===n.data("dismiss")){this.hide();break}if(n.is("tbody > tr")){n.hasClass("active")||(s.find("tbody > tr").removeClass("active"),n.addClass("active"),this.load(n.find(".qor-action-edit").attr("href")));break}if(n.is(".qor-action-new")){e.preventDefault(),s.find("tbody > tr").removeClass("active"),this.load(n.attr("href"));break}if((n.is(".qor-action-edit")||n.is(".qor-action-delete"))&&e.preventDefault(),!r)break;r=r.parentNode}},submit:function(e){var n=e.target,a=t(n),s=this;i&&(e.preventDefault(),t.ajax(a.prop("action"),{method:a.prop("method"),data:new i(n),processData:!1,contentType:!1,success:function(){var t=a.data("returnUrl");t?s.load(t):s.refresh()},error:function(){window.alert(arguments[1]+(arguments[2]||""))}}))},load:function(e,i){var n,a=t.isPlainObject(i)?i:{},s=a.method?a.method:"GET";e&&!this.disabled&&(this.disabled=!0,n=t.proxy(function(){t.ajax(e,{method:s,data:a,success:t.proxy(function(e){var i,n;"GET"===s?(i=t(e),n=i.is(".qor-form-container")?i:i.find(".qor-form-container"),n.find(".qor-action-cancel").attr("data-dismiss","slideout").removeAttr("href"),this.$title.html(i.find(".qor-title").html()),this.$body.empty().html(n.html()),this.$slideout.one(l,function(){t(this).trigger("enable.qor")}).one(c,function(){t(this).trigger("disable.qor")}),this.show()):a.returnUrl?(this.disabled=!1,this.load(a.returnUrl)):this.refresh()},this),complete:t.proxy(function(){this.disabled=!1},this)})},this),this.active?(this.hide(),this.$slideout.one(c,n)):n())},show:function(){var e,i=this.$slideout;this.active||this.animating||(e=t.Event(d),i.trigger(e),e.isDefaultPrevented()||(i.addClass("active").get(0).offsetWidth,i.addClass("in"),this.animating=setTimeout(t.proxy(this.shown,this),350)))},shown:function(){this.active=!0,this.animating=!1,this.$slideout.trigger(l)},hide:function(){var e,i=this.$slideout;this.active&&!this.animating&&(e=t.Event(h),i.trigger(e),e.isDefaultPrevented()||(i.removeClass("in"),this.animating=setTimeout(t.proxy(this.hidden,this),350)))},hidden:function(){this.active=!1,this.animating=!1,this.$element.find("tbody > tr").removeClass("active"),this.$slideout.removeClass("active").trigger(c)},refresh:function(){this.hide(),setTimeout(function(){window.location.reload()},350)},toggle:function(){this.active?this.hide():this.show()},destroy:function(){this.unbind(),this.unbuild(),this.$element.removeData(n)}},u.DEFAULTS={},u.TEMPLATE='<div class="qor-slideout"><div class="slideout-dialog"><div class="slideout-header"><button type="button" class="slideout-close" data-dismiss="slideout" aria-div="Close"><span class="md md-24">close</span></button><h3 class="slideout-title"></h3></div><div class="slideout-body"></div></div></div>',u.plugin=function(e){return this.each(function(){var i,a=t(this),s=a.data(n);if(!s){if(/destroy/.test(e))return;a.data(n,s=new u(this,e))}"string"==typeof e&&t.isFunction(i=s[e])&&i.apply(s)})},t(function(){var e=".qor-theme-slideout";t(document).on(s,function(i){/slideout/.test(i.namespace)&&u.plugin.call(t(e,i.target),"destroy")}).on(a,function(i){/slideout/.test(i.namespace)&&u.plugin.call(t(e,i.target))}).triggerHandler(a)}),u}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";function e(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,t.isPlainObject(n)&&n),this.$modal=null,this.built=!1,this.init()}var i="qor.textviewer",n="enable."+i,a="disable."+i,s="click."+i;e.prototype={constructor:e,init:function(){this.$element.find(this.options.toggle).each(function(){var i=t(this);this.scrollHeight>this.offsetHeight+8&&i.addClass("active").wrapInner(e.INNER)}),this.bind()},bind:function(){this.$element.on(s,this.options.toggle,t.proxy(this.click,this))},unbind:function(){this.$element.off(s,this.click)},build:function(){this.built||(this.built=!0,this.$modal=t(e.TEMPLATE).modal({show:!1}).appendTo("body"))},unbuild:function(){this.built&&(this.built=!1,this.$modal.remove())},click:function(e){var i,n=e.currentTarget,a=t(n);this.built||this.build(),a.hasClass("active")&&(i=this.$modal,i.find(".modal-title").text(a.closest("td").data("heading")),i.find(".modal-body").html(a.find(".text-inner").html()),i.modal("show"))},destroy:function(){this.$element.find(this.options.toggle).find(".text-inner").each(function(){var e=t(this);e.before(e.html()).remove()}),this.unbind(),this.unbuild(),this.$element.removeData(i)}},e.DEFAULTS={toggle:!1},e.INNER='<div class="text-inner"></div>',e.TEMPLATE='<div class="modal fade qor-list-modal" id="qorListModal" tabindex="-1" role="dialog" aria-labelledby="qorListModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="qorListModalLabel">&nbsp;</h4></div><div class="modal-body"></div></div></div></div>',e.plugin=function(n){return this.each(function(){var a,s=t(this),o=s.data(i);if(!o){if(!t.fn.modal)return;if(/destroy/.test(n))return;s.data(i,o=new e(this,n))}"string"==typeof n&&t.isFunction(a=o[n])&&a.apply(o)})},t(function(){var i=".qor-list",s={toggle:".qor-list-text"};t(document).on(a,function(n){e.plugin.call(t(i,n.target),"destroy")}).on(n,function(n){e.plugin.call(t(i,n.target),s)}).triggerHandler(n)})});