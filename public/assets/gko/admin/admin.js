var shiftHeld=!1,body,loader,dialog_max_width=964,comfirm_dialog;$(document).ready(function(){body=$("body"),body.on("ajax:beforeSend","a[data-remote], form[data-remote]",function(a,b,c){attachLoading("body")}).on("ajax:complete",function(a,b,c){removeLoading("body")}),add_fields=function(a,b,c){var d=(new Date).getTime(),e=new RegExp("new_"+b,"g");$(a).append(c.replace(e,d))},body.on("click","a.remove_fields",function(){return $(this).prev("input[type=hidden]").val("1"),$(this).closest(".fields").hide(),!1}),body.on("change",".observe_field",function(){target=$(this).attr("data-update"),ajax_indicator=$(this).attr("data-ajax-indicator")||"#busy_indicator",$(target).hide(),$(ajax_indicator).show(),$.ajax({dataType:"html",url:$(this).attr("data-base-url")+encodeURIComponent($(this).val()),type:"get",success:function(a){$(target).html(a),$(ajax_indicator).hide(),$(target).show()}})}),$.rails.allowAction=function(a){var b=a.data("confirm"),c=!1,d;return b?($.rails.fire(a,"confirm")&&(bootbox.setIcons({CONFIRM:"icon-trash icon-white"}),bootbox.confirm(b,"Non annuler","Oui supprimer",function(b){if(b){$.rails.fire(a,"confirm:complete",[c]);var d=$.rails.allowAction;$.rails.allowAction=function(){return!0},a.trigger("click"),$.rails.allowAction=d}bootbox.setIcons(null)})),!1):!0},parent&&parent.document.location.href!=document.location.href&&$("body#dialog_container.dialog").addClass("iframed"),$("ul.wym_tools a, li.wym_tools_class a:first").each(function(){$(this).attr("rel","tooltip").html("")}),$('a[rel="tooltip"], a[rel="tooltip nofollow"]').tooltip(),$('input[rel="popover"]').popover(),$(".btn.toggle").on("click",function(a){a.preventDefault(),$($(this).attr("href")).toggle()}),$("#bulk-actions-btn").on("click",function(a){a.preventDefault(),$("#bulk_action").val("destroy"),$("#bulk_form").submit()}),$("input.date, input.datetime").datepicker(),init_text_editor(),init_modal_dialogs(),init_nested_form_links(),$("textarea.wysihtml5").wysihtml5({stylesheets:"/assets/gko_wysihtml5_body.css"})});var pages_modal={initialised:!1,init:function(){if(this.initialised)return;body.on("click",".modal a.selectable",function(a){var b=$(this).parent();b.parent().find("> .ui-selected").removeClass("ui-selected"),b.addClass("ui-selected"),a.preventDefault()}),body.on("click",".modal a#validate_page_selection_btn",function(a){var b=$("li.ui-selected:first"),c=b.data("type"),d=parseValue(b.attr("id")),e=b.find("a.selectable:first").html();$("#owner_name").html(e),$("#owner_id").val(d),$("#owner_type").val(c),$("#page_selection_modal").modal("hide")}),this.initialised=!0}},images_dialog={initialised:!1,init:function(){this.initialised||($("#image_dialog_size_container ul li a").on("click",function(a){$("#image_dialog_size_container ul li").removeClass("active"),$(this).parent().addClass("active"),a.preventDefault()}),$("body#dialog_container").on("click","ul.js-selectable a",function(a){a.preventDefault();var b=$(this),c=$("#image_assignments_form");if(c.length>0){var d=b.closest("li").attr("id"),e=parseValue(d);$("#image_assignment_image_id").val(e),c.live("ajax:beforeSend.rails",function(a,b){attachLoading("body#dialog_container")}).live("ajax:complete.rails",function(a,b){removeLoading("body#dialog_container")}).submit()}else{var f=b.find("img:first"),g=$("#image_dialog_size_container li.active a").attr("data-size");image_url=f.attr("data-"+g),parent&&((wym_src=parent.document.getElementById("wym_src"))!=null&&(wym_src.value=image_url),(wym_title=parent.document.getElementById("wym_title"))!=null&&(wym_title.value=f.attr("title")),(wym_alt=parent.document.getElementById("wym_alt"))!=null&&(wym_alt.value=f.attr("alt")),(wym_dialog_submit=parent.document.getElementById("wym_dialog_submit"))!=null&&wym_dialog_submit.click())}}),this.initialised=!0)}},link_dialog={initialised:!1,init:function(){this.initialised||(this.init_close(),this.page_tab(),this.web_tab(),this.email_tab(),this.document_tab(),this.initialised=!0)},init_close:function(){parent&&parent.document.location.href!=document.location.href&&parent.document.getElementById("wym_dialog_submit")!=null&&$("#dialog_container input#insert_link_submit").click(function(a){a.preventDefault(),$(parent.document.getElementById("wym_dialog_submit")).click()})},page_tab:function(){$("#link_to_page a.selectable").live("click",function(a){var b=$(this),c=b.parent();c.parent().find("> .ui-selected").removeClass("ui-selected"),c.addClass("ui-selected"),link_dialog.update_parent(b.attr("href"),b.html()),a.preventDefault()})},document_tab:function(){$("#link_to_document li a").click(function(a){a.preventDefault(),link_dialog.update_parent($(this).attr("href"))})},web_tab:function(){$("#web_address_text").change(function(a){link_dialog.update_parent($("#web_address_text").val(),null,"_blank")})},email_tab:function(){$("#email_address_text, #email_default_subject_text, #email_default_body_text").change(function(a){var b=$("#email_default_subject_text").val(),c=$("#email_default_body_text").val(),d="mailto:"+$("#email_address_text").val(),e="?";b.length>0&&(d+=e+"subject="+b,e="&"),c.length>0&&(d+=e+"body="+c,e="&"),link_dialog.update_parent(d,d.replace("mailto:",""))})},update_parent:function(a,b,c){parent!=null&&((wym_href=parent.document.getElementById("wym_href"))!=null&&(wym_href.value=a),(wym_title=parent.document.getElementById("wym_title"))!=null&&(wym_title.value=b),(wym_target=parent.document.getElementById("wym_target"))!=null&&(wym_target.value=c||""))}};close_dialog=function(a){iframed()?(the_body=$(parent.document.body),the_dialog=parent.$(".ui-dialog-content")):(the_body=$(document.body).removeClass("hide-overflow"),the_dialog=$(".ui-dialog-content"),the_dialog.filter(":data(dialog)").dialog("close"),the_dialog.remove()),$(document.body).hasClass("wym_iframe_body")||(the_body.removeClass("hide-overflow"),the_dialog.filter(":data(dialog)").dialog("close"),the_dialog.remove(),a.preventDefault())},init_text_editor=function(){$("textarea.wymeditor").each(function(){textarea=$(this),(instance=WYMeditor.INSTANCES[$((textarea.next(".wym_box").find("iframe").attr("id")||"").split("_")).last().get(0)])!=null&&((next=textarea.parent().next())!=null&&next.length>0&&next.find("input, textarea").keydown($.proxy(function(a){shiftHeld=a.shiftKey,shiftHeld&&a.keyCode==$.ui.keyCode.TAB&&(this._iframe.contentWindow.focus(),a.preventDefault())},instance)).keyup(function(a){shiftHeld=!1}),(prev=textarea.parent().prev())!=null&&prev.length>0&&prev.find("input, textarea").keydown($.proxy(function(a){a.keyCode==$.ui.keyCode.TAB&&(this._iframe.contentWindow.focus(),a.preventDefault())},instance)))})},init_nested_form_links=function(){$("form a.add-nested-field").live("click",function(a){a.preventDefault();var b=$(this),c=$(b.attr("href")),d=timestamp,e=b.data("association"),f=b.data("template"),g=new RegExp("new_"+e,"g"),h=f.replace(g,d);$(h).appendTo(c).attr("id",d).addClass("dynamic");var i=$("#"+d);i.find("a.remove-nested-field, a.add-nested-field").each(function(a,b){$(b).attr("href","#"+d)}),i.find('input:[type="text"].date').each(function(a,b){$(b).datepicker()}),i.find("select, input, textarea").each(function(a,b){$(b).textinput()})}),$("form a.remove-nested-field").live("click",function(a){var b=$(this),c=$(b.attr("href"));c.length&&(b.hasClass("dynamic")?(c.fadeOut(500).remove(),b.siblings("input[type='hidden']").val("1"),b.siblings("form").trigger("nested:fieldRemoved")):(c.fadeOut(500),b.siblings("input[type='hidden']").val("1"),b.siblings("form").trigger("nested:fieldRemoved"))),a.preventDefault()})},init_modal_dialogs=function(){$('a[href*="dialog=true"]').each(function(a,b){$(b).data({"dialog-width":parseInt($($(b).attr("href").match("width=([0-9]*)")).last().get(0),10)||928,"dialog-height":parseInt($($(b).attr("href").match("height=([0-9]*)")).last().get(0),10)||473,"dialog-title":$(b).attr("title")||$(b).attr("name")||$(b).html()||null}).attr("href",$(b).attr("href").replace(/(\&(amp\;)?)?dialog\=true/,"").replace(/(\&(amp\;)?)?width\=\d+/,"").replace(/(\&(amp\;)?)?height\=\d+/,"").replace(/(\?&(amp\;)?)/,"?").replace(/\?$/,"")).on("click",function(a){console.log("tadfa"),$anchor=$(this),iframe_src=(iframe_src=$anchor.attr("href"))+(iframe_src.indexOf("?")>-1?"&":"?")+"app_dialog=true&dialog=true",iframe=$("<iframe id='dialog_iframe' frameborder='0' marginheight='0' marginwidth='0' border='0' width='100%' height='100%'></iframe>");var c=getScreenSize(),d=Math.min(c.width,980),e=Math.min(c.height-100,980),f=$(b).data("dialog-type");f=="images"&&($anchor.data("dialog-width",c.width),d=c.width),iframe.dialog({title:$anchor.data("dialog-title"),zIndex:1050,modal:!0,resizable:!0,autoOpen:!0,width:c.width,height:$anchor.data("dialog-height")||e,open:onOpenDialog,close:onCloseDialog}),iframe.attr("src",iframe_src),a.preventDefault()})})},flash_notice=function(){$("#flash .flash").each(function(){jQuery.noticeAdd({type:$(this).data("type"),stay:!1,text:$(this).html()}),$(this).remove()})},dnd_join_list=function(a,b,c){$.event.props.push("dataTransfer"),Modernizr.draganddrop&&($().dndPageScroll(),b.find("li").each(function(){$(this).attr("draggable","true")}),b.on({dragenter:function(a){a.stopPropagation(),a.preventDefault(),$(this).toggleClass("dragover")},dragover:function(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"},dragleave:function(a){a.stopPropagation(),a.preventDefault(),$(this).toggleClass("dragover")},drop:function(a){a.stopPropagation(),a.preventDefault();var b=$(this),d=a.dataTransfer.getData("Text"),e=get_number_from_string(d),f=get_number_from_string(b.attr("id"));b.removeClass("dragover"),jQuery.ajax({type:"POST",url:c,data:{image_id:e,id:f},dataType:"script",beforeSend:function(a){attachLoading("body")},error:function(a,b,c){alert(c)},complete:function(a,b){removeLoading("body")}})}},"li"),a.on({dragstart:function(a){var b=$(this);b.css("opacity","0.5"),a.dataTransfer.effectAllowed="copy",a.dataTransfer.setData("text/plain",b.attr("id"))},dragend:function(a){a.stopPropagation(),a.preventDefault(),$(this).css("opacity","1")}},"li"))},selectable_list=function(){$.fn.selectAllRows=function(a){var b,c,d;return b=$.extend({column:"first",selectTip:"Click to Select All",unselectTip:"Click to Un-Select All"},a||{}),isNaN(b.column)?(c=$("thead tr th:"+b.column+"-child input:checkbox",this),d=$("tbody tr td:"+b.column+"-child input:checkbox",this)):(c=$("thead tr th:nth-child("+b.column+") input:checkbox",this),d=$("tbody tr td:nth-child("+b.column+") input:checkbox",this)),c.attr("title",b.selectTip),c.click(function(){var a=this.checked;d.each(function(){this.checked=a}),a==1?$(this).attr("title",b.unselectTip):$(this).attr("title",b.selectTip)}),$(this)}},make_sortable=function(a){var b=a.data("sortable-url"),c=a.data("sortable-handle"),d=a.get(0).tagName=="UL"?"li":"tr";a.sortable().on("sortupdate",function(a,e){var f=$(e.item);$.ajax({type:"GET",url:b,items:d,handle:c,data:{position:f.prevAll().length+1,id:parseValue(f.attr("id"))},beforeSend:function(a,b,c){attachLoading()},success:function(a,b,c,d){},complete:function(a,b,c){removeLoading()}})})},parseURL=function(a){var b={href:a},c=a.replace("//","/").split("/");return b.protocol=c[0],b.host=c[1],c[1]=c[1].split(":"),b.hostname=c[1][0],b.port=c[1].length>1?c[1][1]:"",c.splice(0,2),b.pathname="/"+c.join("/"),b.pathname=b.pathname.split("#"),b.hash=b.pathname.length>1?"#"+b.pathname[1]:"",b.pathname=b.pathname[0],b.pathname=b.pathname.split("?"),b.search=b.pathname.length>1?"?"+b.pathname[1]:"",b.pathname=b.pathname[0],b},iframed=function(){return parent&&parent.document.location.href!=document.location.href&&$.isFunction(parent.$)};