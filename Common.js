///get ajax error message
$(document).ajaxError(function (event, jqxhr, settings, exception) {
    if (exception != "") {
        switch (jqxhr.status) {
            case 408:
                alert('Please login again.');
                window.location.href = '/home/login/';
                break;
            case 403:
                alert('You have no permission to access this page.');
                history.go(-1);
                break;
            default:
                var jsonValue = jQuery.parseJSON(jqxhr.responseText);
                alert("AjaxError Message:" + jsonValue.Msg);
                break;
        }
    }
});

$(document).ready(function () {
    $(function () {
        divmoveEvent($(".instructions_title").parent().parent(), ".instructions_title");
        divmoveEvent($(".k-window"), ".popuptitle");
        $(document).bind("mouseup", function () {
            $(this).unbind("mousemove");
        });
    })
})

function divmoveEvent(parentEl, obj) {
    var $parentDiv = parentEl;
    $parentDiv.delegate(obj, 'mousedown', function (event) {
        var $pdiv = $(this).parent().parent();
        var offset = $pdiv.offset();
        var offset_x = offset.left;
        var offset_y = offset.top;
        var mouse_x = event.pageX;
        var mouse_y = event.pageY;
        $(document).bind("mousemove", function (ev) {
            var _x = ev.pageX - mouse_x;
            var _y = ev.pageY - mouse_y;
            var now_x = (offset_x + _x) + "px";
            var now_y = (offset_y + _y) + "px";
            $pdiv.css({
                top: now_y,
                left: now_x
            });
        });
    });
}

function Cancel(obj) {
    $(obj).parent().parent().parent().data("kendoWindow").center().close();
    $("body").css("overflow", "auto");
}
//close window and set window's css
function closepopwin(objId, width, height) {
    var dialog = $("#" + objId).data("kendoWindow");
    dialog.center().close();
    dialog.setOptions({
        width: width,
        height: height
    });
    $("#" + objId).css("cssText", "{height:auto !important}");
    $("body").css("overflow", "auto");
    // refresh data in page 'upload'    
    $("#Gridupload").data("kendoGrid").dataSource.read();
    $('#Gridupload').data('kendoGrid').refresh();
}
//popup window
function popupWindow() {
    $("#window_wnd_title").parent().parent().css("padding-top", "0px");
    $("#window_wnd_title").parent().css("display", "none");
    $("#window").data("kendoWindow").center().open();
}
//set date format
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
///replace the char s1 to s2
String.prototype.espreplaceall = function (s1, s2) {
    var patternchar = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
    var pattern = new RegExp(s1, "gm");
    if (patternchar.test(s1)) {
        pattern = new RegExp("\\" + s1, "gm")
    }
    return this.replace(pattern, s2);
}

//close instruction window
function CancelInstructions(obj) {
    $(obj).parent().parent().parent().data("kendoWindow").close();
    $("body").css("overflow", "auto");
}
//open instruction window,top,left
function openInstructions(obj, notice) {
    var dialog = $("#instructions");
    var tW = $(".instructions_title").width();
    var left;
    var top;

    var left = obj.offset().left - tW + 90;
    var top = obj.offset().top + 20;

    dialog.css("padding", "0em");
    dialog.parent().css("top", top + "px");
    dialog.parent().css("left", left + "px");
    $("#instructions_wnd_title").parent().parent().css("padding-top", "0px");
    $("#instructions_wnd_title").parent().css("display", "none");
    $("#contextTxt").html('');
    $("#contextTxt").html(notice);
    dialog.data("kendoWindow").open();
}
//open instruction window,top,left
function PopupopenInstructions(obj, notice) {
    var dialog = $("#instructions");
    var tW = $(".instructions_title").width();
    var left;
    var top

    var left = obj.offset().left;
    var top = obj.offset().top + 20;

    dialog.css("padding", "0em");
    dialog.parent().css("top", top + "px");
    dialog.parent().css("left", left + "px");
    $("#instructions_wnd_title").parent().parent().css("padding-top", "0px");
    $("#instructions_wnd_title").parent().css("display", "none");
    $("#contextTxt").html('');
    $("#contextTxt").html(notice);
    dialog.data("kendoWindow").open();
}
/* always show positive */
function StayPositive(obj) {
    obj = formatCurrency(obj);
    obj = obj.replace("-", "");
    return obj;
}
//onfocus,drop "$"
function formatCurrency(num) {
    if (num == null || num == '') {
        return '';
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}
//onblur: add "$"
function removeCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    return num;
}
//short string 
function ShortString(str) {
    if (str != null) {
        var Dname = str.split('/')[2];
        if (Dname.length > 15) {
            return Dname.substr(0, 5) + "..." + str.substr(str.lastIndexOf("."));
        }
        else { return Dname; }
    }
    else { return ""; }
}

//enter event
function EnterLogin(e) {
    var currKey = window.event ? e.keyCode : e.which;
    if (currKey == "13") {
        Login();
    }

}
var waitEvent;
//login event
function Login() {
    if ($('#tbxEsuperfund').val() == '' || $('#tbxPassword').val() == '') {
        alert(ESUPERFUNDMESSAGE.loginpassword);
        return;
    }
    showWait();
    $.ajax({
        url: "/home/Login",
        type: "POST",
        data: { username: $('#tbxEsuperfund').val(), password: $('#tbxPassword').val() },
        success: function (data) {
            hideWait();
            if (data.status != 0) {
                window.location.href = data.url;
            } else {
                alert(ESUPERFUNDMESSAGE.loginpassword);
                return;
            }
        }
    });
}
//show wait
function showWait() {
    clearTimeout(waitEvent);
    $(".showWait").show();
    waitEvent = setTimeout("hideWait()", 60000);
}
//hide wait
function hideWait() {
    $(".showWait").hide();
}
//login out
function Logout() {
    if (confirm(ESUPERFUNDMESSAGE.logoutmsg)) {
        $.ajax({
            url: "/home/Logout",
            type: "POST",
            success: function (data) {
                if (data == "success") {
                    window.location.href = '/home/login';
                } else {
                    alert(ESUPERFUNDMESSAGE.failedlogout);
                    return;
                }
            }
        });

    }

}
//forget password
function forgot_alert() {
    var message = ESUPERFUNDMESSAGE.forgetpassword;
    alert(message);
}
//kendoDatePicker validate(onblur event)
function validateDate(obj) {
    var date = $(obj).val();
    var validate = kendo.parseDate(date, ["dd/MM/yyyy"]);//"MM/dd/yyyy", "yyyy/MM/dd", 
    if (validate == null) {
        $(obj).val("30/06/2014");
    } else {
        var kendoDate = kendo.parseDate(date, ["dd/MM/yyyy"]);
        var max = $(obj).data("kendoDatePicker").max();
        var min = $(obj).data("kendoDatePicker").min();
        if (kendoDate > max) {
            $(obj).val("30/06/2014");
        } else if (kendoDate < min) {
            $(obj).val("01/07/2013");
        }

    }
}

//Remove the special characters
function clearString(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？]");
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, ' ');
    }
    return rs;
}
//set the row background-color of kendo ui grid
function setRowbgcolor(obj) {
    var rowNumber = $(obj).find('tr[role=row]').size();
    if (rowNumber % 2 == 0) {
        $(obj).find('tr[role=row]').css("background-color", "#ffffff");
        $(".k-alt").css("background-color", "#cddaeb");
    } else {
        $(obj).find('tr[role=row]').css("background-color", "#cddaeb");
        $(".k-alt").css("background-color", "#ffffff");
    }
}

//  loading wait
function showloadwindow(obj) {
    var screenwidth, screenheight, mytop, getPosLeft, getPosTop
    screenwidth = $(window).width();
    screenheight = $(document).height();
    mytop = $(document).scrollTop();
    getPosLeft = screenwidth / 2 - 285;
    if (screenwidth < 1000) { getPosLeft = screenwidth / 2 - 285; }
    getPosTop = 240;
    $("#" + obj).css({ "left": getPosLeft, "top": getPosTop + mytop });
    $(window).resize(function () {
        screenwidth = $(window).width();
        screenheight = $(document).height();
        mytop = $(document).scrollTop();
        getPosLeft = screenwidth / 2 - 285;
        if (screenwidth < 1000) { getPosLeft = screenwidth / 2 - 285; }
        getPosTop = 100;
    });
    // $("#" + obj).fadeIn("slow");
    $("#" + obj).show();
    var docheight = $(document).height();
    $("body").append("<div id='greybackground'></div>");
    $("#greybackground").css({ "opacity": "0.5", "height": docheight });
}

function hideloadwindow(obj) {
    $("#" + obj).hide();
    $("#greybackground").remove();
}


function loadwin(obj) {
    var screenwidth, screenheight, mytop, getPosLeft, getPosTop
    screenwidth = $(window).width();
    screenheight = $(document).height();
    mytop = $(document).scrollTop();
    getPosLeft = screenwidth / 2 - 285;
    if (screenwidth < 1000) { getPosLeft = screenwidth / 2 - 285; }
    getPosTop = 240;
    $("#" + obj).css({ "left": getPosLeft, "top": getPosTop });
    $(window).resize(function () {
        screenwidth = $(window).width();
        screenheight = $(document).height();
        mytop = $(document).scrollTop();
        getPosLeft = screenwidth / 2 - 285;
        if (screenwidth < 1000) { getPosLeft = screenwidth / 2 - 285; }
        getPosTop = 100;
    });
    $("#" + obj).fadeIn("slow");
    //  $("#" + obj).show();
}




