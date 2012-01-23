/*
 * jQuery UI Nested Sortable
 * v 1.3.4 / 28 apr 2011
 * http://mjsarfatti.com/sandbox/nestedSortable
 *
 * Depends:
 *	 jquery.ui.sortable.js 1.8+
 *
 * License CC BY-SA 3.0
 * Copyright 2010-2011, Manuele J Sarfatti
 */
(function(a){a.widget("ui.nestedSortable",a.extend({},a.ui.sortable.prototype,{options:{tabSize:20,disableNesting:"ui-nestedSortable-no-nesting",errorClass:"ui-nestedSortable-error",listType:"ol",maxLevels:0,noJumpFix:0},_create:function(){return this.noJumpFix==0&&this.element.height(this.element.height()),this.element.data("sortable",this.element.data("nestedSortable")),a.ui.sortable.prototype._create.apply(this,arguments)},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(f))break;this._rearrange(b,f),this._clearEmpty(g),this._trigger("change",b,this._uiHash());break}}var i=this.placeholder[0].parentNode.parentNode&&a(this.placeholder[0].parentNode.parentNode).closest(".ui-sortable").length?a(this.placeholder[0].parentNode.parentNode):null,j=this._getLevel(this.placeholder),k=this._getChildLevels(this.helper),l=this.placeholder[0].previousSibling?a(this.placeholder[0].previousSibling):null;if(l!=null)while(l[0].nodeName.toLowerCase()!="li"||l[0]==this.currentItem[0]){if(!l[0].previousSibling){l=null;break}l=a(l[0].previousSibling)}return newList=document.createElement(c.listType),this.beyondMaxLevels=0,i!=null&&this.positionAbs.left<i.offset().left?(i.after(this.placeholder[0]),this._clearEmpty(i[0]),this._trigger("change",b,this._uiHash())):l!=null&&this.positionAbs.left>l.offset().left+c.tabSize?(this._isAllowed(l,j+k+1),l[0].children[1]==null&&(l[0].appendChild(newList),l.attr("id")!="undefined"?newList.id=l.attr("id")+"_nested_set":newList.className="unnamed_nested_set"),l[0].children[1].appendChild(this.placeholder[0]),this._trigger("change",b,this._uiHash())):this._isAllowed(i,j+k),this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(b,c){if(this.beyondMaxLevels){var d=this.placeholder.parent().closest(this.options.items);for(var e=this.beyondMaxLevels-1;e>0;e--)d=d.parent().closest(this.options.items);this.placeholder.removeClass(this.options.errorClass),d.after(this.placeholder),this._trigger("change",b,this._uiHash())}a.ui.sortable.prototype._mouseStop.apply(this,arguments)},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/),e=(a(b.item||this).parent(b.listType).parent("li").attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"["+(b.key&&b.expression?c[1]:c[2])+"]")+"="+(e?b.key&&b.expression?e[1]:e[2]:"root"))}),!d.length&&b.key&&d.push(b.key+"="),d.join("&")},toHierarchy:function(b){function e(c){var d=(a(c).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);if(d!=null){var f={id:d[2]};return a(c).children(b.listType).children("li").length>0&&(f.children=[],a(c).children(b.listType).children("li").each(function(){var b=e(a(this));f.children.push(b)})),f}}b=b||{};var c=b.startDepthCount||0,d=[];return a(this.element).children("li").each(function(){var b=e(a(this));d.push(b)}),d},toArray:function(b){function f(a,b){return a.left-b.left}function g(e,f,h){return right=h+1,a(e).children(b.listType).children("li").length>0&&(f++,a(e).children(b.listType).children("li").each(function(){right=g(a(this),f,right)}),f--),id=a(e).attr(b.attribute||"id").match(b.expression||/(.+)[-=_](.+)/),f===c+1?pid="root":(parentItem=a(e).parent(b.listType).parent("li").attr("id").match(b.expression||/(.+)[-=_](.+)/),pid=parentItem[2]),id!=null&&d.push({item_id:id[2],parent_id:pid,depth:f,left:h,right:right}),h=right+1}b=b||{};var c=b.startDepthCount||0,d=[],e=2;return d.push({item_id:"root",parent_id:"none",depth:c,left:"1",right:(a("li",this.element).length+1)*2}),a(this.element).children("li").each(function(){e=g(this,c+1,e)}),d=d.sort(f),d},_clear:function(b,c){a.ui.sortable.prototype._clear.apply(this,arguments);for(var d=this.items.length-1;d>=0;d--){var e=this.items[d].item[0];this._clearEmpty(e)}return!0},_clearEmpty:function(a){a.children[1]&&a.children[1].children.length==0&&a.removeChild(a.children[1])},_getLevel:function(a){var b=1;if(this.options.listType){var c=a.closest(this.options.listType);while(!c.is(".ui-sortable"))b++,c=c.parent().closest(this.options.listType)}return b},_getChildLevels:function(b,c){var d=this,e=this.options,f=0;return c=c||0,a(b).children(e.listType).children(e.items).each(function(a,b){f=Math.max(d._getChildLevels(b,c+1),f)}),c?f+1:f},_isAllowed:function(a,b){var c=this.options;a==null||!a.hasClass(c.disableNesting)?c.maxLevels<b&&c.maxLevels!=0?(this.placeholder.addClass(c.errorClass),this.beyondMaxLevels=b-c.maxLevels):(this.placeholder.removeClass(c.errorClass),this.beyondMaxLevels=0):(this.placeholder.addClass(c.errorClass),this.beyondMaxLevels=b-c.maxLevels>0?b-c.maxLevels:1)}})),a.ui.nestedSortable.prototype.options=a.extend({},a.ui.sortable.prototype.options,a.ui.nestedSortable.prototype.options)})(jQuery)