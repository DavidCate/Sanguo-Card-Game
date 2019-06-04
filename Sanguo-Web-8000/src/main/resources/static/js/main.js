/**
 * 获取url参数
 * @param name
 * @returns {*}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var ws;
var myUrl = "ws://192.168.43.189:11111";

/**
 * 创建ws
 * @param url
 */
function myWebSocket(url) {
    try {
        if ("WebSocket" in window) {
            ws = new WebSocket(url);
            ws.onopen = function () {
                onOpen();
            };
            ws.onmessage = function (evt) {
                var received_msg = evt.data;
                onMessage(evt);
            };
            ws.onerror = function () {
                onError();
            }
            ws.onclose = function () {
                onClose();
            };
        } else {
            alert("你的浏览器不支持本游戏");		//未渲染
        }
    } catch (e) {
        reconnect(myUrl);
    }
}

function onOpen() {
    console.log("成功连接到" + myUrl);
    var ck = $.cookie('Sanguo_SessionInfo');
    var msg = ck.split("#")[1].split(":")[1];
    var obj = {"type": "token", "value": msg, "flag": "1"};
    var sendMsg0 = JSON.stringify(obj);
    ws.send(sendMsg0);

}

function onMessage(evt) {
    var r_msg = evt.data;
    var obj = JSON.parse(r_msg);
    var parm = obj.type;
    var name = $(".user-name").html();
    var user = getUrlParam("user");
    switch (parm) {
        case "createRoom":
            var val = obj.errMsg;
            if (val === "true") {
                var ck0 = $.cookie('Sanguo_SessionInfo');
                var ck = ck0.split("#")[1].split(":")[1];
                window.location.href = "http://192.168.43.189:8000/html/game.html?user="+ user +"&name="+ name +"";

            } else if (val === "false") {
                alert("Create Failed");
            }
            break;
        case "roomlist":
            var val = obj.roomlist;
            var index = 1;
            for (var i = 0; i < val.length; i++) {
                var room = val[i].substring(7, val[i].length);
                $('.room-li').append("<div style=\"position:relative;width:100%;height:10%;border-bottom:1px solid #000;float:left\">" +
                    "<input id=\"open\" class=\"open-set-music\" type=\"radio\" name=\"room\" value=\"" + room + "\"/>" +
                    "<span style=\"position:absolute;left:15%;top:20%;width:35%;height:100%;font-family:'楷体';font-size:20px\">房间00" + index + "</span>" +
                    "<span style=\"position:absolute;left:51%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">1/2</span>" +
                    "<span style=\"position:absolute;left:83%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">等待中</span></div>");
                index++;
            }
            break;
        case "join":
            var val = obj.isSuccess;
            if (val === "true") {
                window.location.href = "http://192.168.43.189:8000/html/game.html?user="+ user +"&name="+ name +"";

            } else if (val === "false") {
                alert("Join Failed");
            }
            break;

    }
}

function onError() {
    //发生错误
    reconnect(myUrl);
}

function onClose() {
    //关闭连接，渲染页面；
}

function onSend(msg) {
    //发送数据；
    ws.send(msg);
}

myWebSocket(myUrl);


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 添加删除按钮
 */
function addDelete() {
    $('.single-friend').mousedown(function (e) {
        if (3 == e.which) {
            if ($('#' + this.id).children('button').length === 0) {
                $('#' + this.id).append("<button id='btn" + this.id + "' name='" + this.id + "' class='delete-btn' onclick='shanchu(this.name)' style=\"position:absolute;top: 10%;right:5%;height:80%;width:50pxoutline: none;background: rgba(255,255,255,0);font-size: 16px;font-weight: 300;font-family: '楷体';color: #DAA520;\">删除</button>");
            }
        } else if (2 == e.which) {
            $('#btn' + this.id).remove();
        }
    });
}

document.oncontextmenu = function () {
    return false;
};
/**
 * 页面初始化接受数据
 */
var mark = new Array();
$(function () {
    var user = getUrlParam('user');
    $.ajax({
        type: "POST",
        url: "/initMainPage",
        data: {"userName": user},
        dataType: "json",
        success: function (data) {
            console.log(data);
            /**
             * 获取返回值是对象的josn数据内容
             */
            /**
             * 用户头像,名称
             * @type {string}
             */
            var img0 = data.headImg;
            $('.img-head').attr('src', img0);
            var name0 = data.userName;
            $('.user-name').html(name0);
            $('#su1').html(name0);
            /**
             * 好友信息（头像，名称）
             */
            for (var i = 0; i < data.userFriends.length; i++) {
                var img1 = data.userFriends[i].friendImg;
                var name = data.userFriends[i].friendName;
                $('.main-right-bottom').append("<div class='single-friend' id='" + i + "' style=\"position:relative;width:90%;height:30px;left:5%;float:left;border-bottom:1px solid #fff\"\"/>");
                $('#' + i).append("<img style=\"position:absolute;width:30px;height:100%\" id='user" + i + "' src='" + img1 + "'/>");
                $('#' + i).append("<span style=\"position:absolute;left: 25%;bottom: 25%;color:#DAA520\">" + name + "</span>");

            }
            addDelete();
            /**
             * div轮播图url（5 张，每张包含一个链接url）
             */
            $('#div1').attr('src', data.playImgs[0].imgUrl);
            $('#div2').attr('src', data.playImgs[1].imgUrl);
            $('#div3').attr('src', data.playImgs[2].imgUrl);
            $('#div4').attr('src', data.playImgs[3].imgUrl);
            /**
             * 公告（4 条）
             */
            $('#s1').html(data.msgs[0].msg);
            $('#s2').html(data.msgs[1].msg);
            $('#s3').html(data.msgs[2].msg);
            /**
             * 对局记录模拟
             */
            for (var i = 0; i < data.gameRecords.length; i++) {
                $('.div-record').append("<div style=\"position:relative;width:100%;height:12.5%;border-bottom:1px solid #000;float:left\">" +
                    "<img style=\"position:absolute;left:3%;width:35px;height:100%\" src='../image/png/main/record_1.png'/>" +
                    "<span style=\"position:absolute;left:15%;top:20%;width:35%;height:100%;font-family:'楷体';font-size:20px\">" + data.gameRecords[i].time0 + "</span>" +
                    "<span style=\"position:absolute;left:50%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">" + data.gameRecords[i].player + "</span>" +
                    "<span style=\"position:absolute;left:70%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">" + data.gameRecords[i].result + "</span></div>");
            }
            /**
             * 任务
             */
            for (var j = 0; j < data.tasks.length; j++) {
                mark.push(data.tasks[j].taskContent);
            }
        },
        error: function () {
            console.log("failed");
        }
    });

});

/**
 * 数据模拟
 */
$(function () {
    $('#s1').html("1.0版本成功上线测试！");
    $('#s2').html("5月1日不停机更新任务系统！");
    $('#s3').html("欢迎加入战三国大家庭！");
    /*
        document.oncontextmenu = function(){
            return false;
        };*/
    /*/!**
     * 好友模拟
     *!/
    for(var i=0;i<2;i++){
        var img1 = "../image/png/main/user-default.png";
        var name=new Array("刘备","孙权");
        $('.main-right-bottom').append("<div class='single-friend' id='"+ i +"' style=\"position:relative;width:90%;height:30px;left:5%;float:left;border-bottom:1px solid #fff\"\"/>");
        $('#'+i).append("<img style=\"position:absolute;width:30px;height:100%\" id='user"+ i +"' src='"+ img1 +"'/>");
        $('#'+i).append("<span style=\"position:absolute;left: 25%;bottom: 25%;color:#DAA520\">"+ name[i] +"</span>");

    }
    addDelete();*/
    /**
     * 对局记录模拟
     */
});
/**
 * 动态火
 */
$(function () {
    var j = 0;
    var fire = new Array();
    for (var i = 1; i < 10; i++) {
        fire.push("../image/png/main/fire" + i + ".png");
    }
    setInterval(function () {
        if (j < 9) {
            $('.img-fire').attr("src", fire[j]);
            j++;
        } else {
            j = 0;
            $('.img-fire').attr("src", fire[j]);
        }
    }, 150);
});
/**
 * div轮播图
 * @param id  传入元素的id
 * @returns {HTMLElement | null}  返回标签对象，方便获取元素r
 */
$(function () {
    function my$(id) {
        return document.getElementById(id);
    }

    var box = my$("box");
    var inner = box.children[0];
    var ulObj = inner.children[0];
    var list = ulObj.children;
    var arr = my$("arr");
    var imgWidth = inner.offsetWidth;
    var right = my$("right");
    var pic = 0;

    ulObj.appendChild(ulObj.children[0].cloneNode(true));

    var timeId = setInterval(onmouseclickHandle, 3000);
    box.onmouseover = function () {
        arr.style.display = "block";
        clearInterval(timeId);
    };
    box.onmouseout = function () {
        arr.style.display = "none";
        timeId = setInterval(onmouseclickHandle, 3000);
    };

    right.onclick = onmouseclickHandle;

    function onmouseclickHandle() {
        if (pic == list.length - 1) {
            pic = 0;
            ulObj.style.left = 0 + "px";
        }
        pic++;
        animate(ulObj, -pic * imgWidth);
    }

    left.onclick = function () {
        if (pic == 0) {
            pic = list.length - 1;
            ulObj.style.left = -pic * imgWidth + "px";
        }
        pic--;
        animate(ulObj, -pic * imgWidth);
    };

    function animate(element, target) {
        clearInterval(element.timeId);
        element.timeId = setInterval(function () {
            var current = element.offsetLeft;
            var step = 5;
            step = current < target ? step : -step;
            current += step;
            if (Math.abs(current - target) > Math.abs(step)) {
                element.style.left = current + "px";
            } else {
                clearInterval(element.timeId);
                element.style.left = target + "px";
            }
        }, 5);
    }
});
/**
 * 选择模式
 */
$(function () {
    $("#top-begin").bind("click", function () {
        $('.main-room').css('display', 'block');
        $('#top-begin').css('background', 'url(../image/png/main/ting.png) no-repeat');
        $('#top-begin').css('background-size', '100% 100%');
        var sendMsg = {"type": "getRoom"};
        var sendMsg0 = JSON.stringify(sendMsg);
        onSend(sendMsg0);
    })
    $("#close-two").bind("click", function () {
        $("#main-model-left").removeAttr("checked");
        $("#main-model-right").removeAttr("checked");
        $('.main-middle-two').css('display', 'none');
        $('#top-begin').css('background', 'url(../image/png/main/begin.png) no-repeat');
        $('#top-begin').css('background-size', '100% 100%');
        /*console.log($('input:radio:checked').val());*/
        /*$('input:radio[name="model"]').removeAttr('checked');*/
        /* $("#main-model-left").removeAttr("checked");*/
    })
    $(".main-begin-game").bind("click", function () {
        console.log($('input:radio:checked').val());
        var model = $('input:radio:checked').val();
        /**
         * 申请创建？？房间；
         */
        $.ajax({
            type: "POST",
            url: "",
            data: model,
            dataType: "json",
            success: function () {
                console.log("choose success");
                /*跳转游戏房间页面*/
                window.location.href = "#";
            },
            error: function () {
                console.log("failed");
            }
        });
    })
});
/**
 * 首页模式选择
 */
$(function () {
    $("#btn-match").bind("click", function () {
        $("#main-model-right").removeAttr("checked");
        $('.main-middle-two').css('display', 'block');
        $('#top-begin').css('background', 'url(../image/png/main/ting.png) no-repeat');
        $('#top-begin').css('background-size', '100% 100%');
        $('#main-model-left').attr("checked", "checked");
        /*console.log($('input:radio:checked').val());*/
    })
    $("#btn-story").bind("click", function () {
        $("#main-model-left").removeAttr("checked");
        $('.main-middle-two').css('display', 'block');
        $('#top-begin').css('background', 'url(../image/png/main/ting.png) no-repeat');
        $('#top-begin').css('background-size', '100% 100%');
        $('#main-model-right').attr("checked", "checked");
        /*console.log($('input:radio:checked').val());*/
    })

});
/**
 * 右侧用户栏
 */

$(function () {
    /*判断在线离线*/
    if (window.navigator.onLine === true) {
        $('.main-line').attr("src", "../image/png/main/mainOnline%20.png");
        $('.main-line-msg').html("在线");
    } else {
        $('.main-line').attr("src", "../image/png/main/mainOffline%20.png");
        $('.main-line-msg').html("离线");
    }
    window.addEventListener("online", online, false);
    window.addEventListener("offline", offline, false);

    function online() {
        $('.main-line').attr("src", "../image/png/main/mainOnline%20.png");
        $('.main-line-msg').html("在线");
    }

    function offline() {
        $('.main-line').attr("src", "../image/png/main/mainOffline%20.png");
        $('.main-line-msg').html("离线");
    }
});

/**
 * 导航选择
 * @param name
 */
function choose(name) {
    $('.main-room').css('display', 'none');
    $('.main-middle').css('display', 'none');
    $('#' + name).css('display', 'block');
    $('#top-begin').css('background', 'url(../image/png/main/begin.png) no-repeat');
    $('#top-begin').css('background-size', '100% 100%');
}

/**
 * 下拉好友列表
 */
$(function () {
    $(".main-friend-open").mousedown(function () {
        if ($('.main-right-bottom').attr("name") === "true") {
            $(".main-friend-open").css('background', 'url(../image/png/main/closeFriend0.png) no-repeat');
            $(".main-friend-open").css('background-size', '100% 100%');
        } else if ($('.main-right-bottom').attr("name") === "false") {
            $(".main-friend-open").css('background', 'url(../image/png/main/openFriend0.png) no-repeat');
            $(".main-friend-open").css('background-size', '100% 100%');
        }

    });
    $(".main-friend-open").mouseup(function () {
        if ($('.main-right-bottom').attr("name") === "true") {
            $(".main-friend-open").css('background', 'url(../image/png/main/openFriend.png) no-repeat');
            $(".main-friend-open").css('background-size', '100% 100%');
            $(".main-right-bottom").slideUp("slow");
            $('.main-right-bottom').attr("name", "false");
        } else if ($('.main-right-bottom').attr("name") === "false") {
            $(".main-friend-open").css('background', 'url(../image/png/main/closeFriend.png) no-repeat');
            $(".main-friend-open").css('background-size', '100% 100%');
            $(".main-right-bottom").slideDown("slow");
            $('.main-right-bottom').attr("name", "true");
        }
    });
});
/**
 * 关于我们
 */
$(function () {
    $("#main-us").bind("click", function () {
        $('#main-middle-us').css('display', 'block');
    })
    $(".btn-us").bind("click", function () {
        $('#main-middle-us').css('display', 'none');
    })
});
/**
 * 设置声音弹出框
 */
$(function () {
    $("#main-set").bind("click", function () {
        $('.main-set-page').css('display', 'block');
    })
    $(".btn-close-set").bind("click", function () {
        $('.main-set-page').css('display', 'none');
    })
    $(".set-save").bind("click", function () {
        var val = $('input:radio[name="music"]:checked').val();
        var audio = $("#voice-one");
        var au = audio[0];
        if (val === "open") {
            au.play();
        } else if (val === "close") {
            au.pause();
        }
        $('.main-set-page').css('display', 'none');
    })
});
/**
 * 消息弹出框
 */
$(function () {
    $("#main-msg").bind("click", function () {
        $('.main-set-page').css('display', 'block');
    })
    $(".btn-close-set").bind("click", function () {
        $('.main-set-page').css('display', 'none');
    })
});
/**
 * 注销登录
 */
$(function () {
    $("#main-close").bind("click", function () {
        $('.main-close-page').css('display', 'block');
    })
    $(".btn-close-set").bind("click", function () {
        $('.main-close-page').css('display', 'none');
    })
    $("#t1").bind("click", function () {
        window.location.href = "../html/login.html";
    })
    $("#t2").bind("click", function () {
        $('.main-close-page').css('display', 'none');
    })
});


/**
 * 查找好友
 */
$(function () {
    $("#btn-search").bind("click", function () {
        $(".span-f").remove();
        $(".img-f").remove();
        var friend = $(".add-search").val();
        $.ajax({
            type: "POST",
            url: "/searchUser",
            data: {"friend": friend},
            dataType: "json",
            success: function (data) {
                if(data.isSuccess === "true"){
                    $(".main-add-page").append("<img class='img-f' src='"+ data.head +"' style=\"position:absolute;height: 30px;width:30px;left:30%;top:45%;\">" +
                        "<span class='span-f' style=\"position:absolute;left:45%;top:45%;font-size: 20px\">"+ data.name +"</span>");
                }else{
                    alert("Not Found!")
                }
            },
            error: function () {
                console.log(Failed);
            }
        });
    })
});


/**
 * 添加与删除好友
 */
$(function () {
    $(".main-friend-add").mousedown(function () {
        $(".main-friend-add").css('background', 'url(../image/png/main/addFriend0.png) no-repeat');
        $(".main-friend-add").css('background-size', '100% 100%');
    });
    $(".main-friend-add").mouseup(function () {
        $(".main-friend-add").css('background', 'url(../image/png/main/addFriend.png) no-repeat');
        $(".main-friend-add").css('background-size', '100% 100%');
        $('.main-add-page').css('display', 'block');
    });
    /*$(".main-friend-add").bind("click",function(){
        $('.main-add-page').css('display','block');
    });*/
    $(".btn-close-set").bind("click", function () {
        $('.main-add-page').css('display', 'none');
    });
    /*数据模拟*/
    /*var img = "../image/png/main/user-default.png";
    var userName = "关羽";
*/
    $("#btn-add").bind("click", function () {
        var friendName = $(".span-f").html();
        var head = $(".img-f").attr('src');
        $.ajax({
            type: "POST",
            url: "/addFriend",
            data: {
                "friendName": friendName,
                "head": head
            },
            dataType: "json",
            success: function (data) {
                if (data.toString() === "true") {
                    var l = $('.main-right-bottom').children().length;
                    $('.main-right-bottom').append("<div class='single-friend' id='" + l + "' style=\"position:relative;width:90%;height:30px;left:5%;float:left;border-bottom:1px solid #fff\"\"/>");
                    $('#' + l).append("<img style=\"position:absolute;width:30px;height:100%\" id='user" + l + "' src='" + head + "'/>");
                    $('#' + l).append("<span style=\"position:absolute;left: 25%;bottom: 25%;color:#DAA520\">" + friendName + "</span>");
                    $('.main-add-page').css('display', 'none');
                    addDelete();
                } else {
                    alert("Add Failed!")
                }
            },
            error: function () {
                console.log(Failed);
            }
        });

    });
});
/**
 * 删除好友
 */
function shanchu(name) {
    var friend = $('#' + name).children("span").html();
    var user = getUrlParam('user');
    console.log(user);
    $.ajax({
        type: "POST",
        url: "/deleteFriend",
        data: {"user": user, "friend": friend},
        dataType: "json",
        success: function (data) {

            if (data) {
                $('#' + name).remove();
                alert("删除成功");
            } else {
                alert("删除失败")
            }
            console.log("success");
        },
        error: function () {
            console.log("failed");
        }
    });
}

/**
 * 修改个人资料
 */
$(function () {
    $(".btn-change").bind("click", function () {
        var user = $(".user-name").html();
        $('.text-change').val(user);
        $('.main-change-page').css('display', 'block');
    });
    $(".btn-close-set").bind("click", function () {
        $('.main-change-page').css('display', 'none');
    });
    $(".btn-change-save").bind("click", function () {
        $('.main-change-page').css('display', 'none');
        var newuser = $('.text-change').val();
        $.ajax({
            type: "POST",
            url: "/updateName",
            data: {"user": newuser},
            dataType: "json",
            success: function (data) {
                if (data.toString() === "true") {
                    $(".user-name").html(newuser);
                    $("#su1").html(newuser);
                    alert("Change Success!");
                } else {
                    alert("change Failed!")
                }
            },
            error: function () {
                console.log(Failed);
            }

        });
    });
});

/**
 * 查看卡牌
 */
$(function () {
    $(".btn-detail").bind("click", function () {
        $('.card-detail').css('display', 'block');
    });
    $("#close-card").bind("click", function () {
        $('.card-detail').css('display', 'none');
    });
});
/**
 * 查看任务
 */

/*var mark = new Array();
mark[0] = "桃园三结义”的故事，罗贯中把它放在《三国演义》开篇的第一回“宴桃园豪杰三结义斩黄巾英雄首立功”中，文中描写到刘焉出榜招募义兵，榜文行到涿县，引出涿县中一个英雄刘备，然后巧然的机会刘备认识了张飞和关羽，三个人志趣相投，一见如故，结为兄弟。在文中结尾描述三人焚香再拜而说誓曰：“念刘备、关羽、张飞，虽然异姓，既结为兄弟，则同心协力，救困扶危；上报国家，下安黎庶。不求同年同月同日生，只愿同年同月同日死。皇天后土，实鉴此心，背义忘恩，天人共戮！”誓毕，拜玄德为兄，关羽次之，张飞为弟。";
mark[1] = "“三英战吕布”是长篇历史小说《三国演义》中的一个故事情节，出自第五回“发矫诏诸镇应曹公 破关兵三英战吕布”。故事背景为曹操联合十八路诸侯讨伐董卓，上将吕布一连打败众将之后，刘备、关羽、张飞三兄弟在虎牢关与吕布大战的故事。见于《三国演义》第五回发矫诏诸镇应曹公 破关兵三英战吕布。“三英”指刘备（字玄德）、关羽（字云长）、张飞（字翼德）。刘备有心抱负于天下，关羽、张飞二人各自身怀绝技，一直未得到展示，此前唯有关羽斩杀华雄初显本领，此后，刘等三人已然名满天下。吕布虽勇，毕竟以一敌三，最终战败。然吕布之勇名冠三军，无人匹敌，当下第一次遭遇对手，自然令联军士气大振。";
mark[2] = "官渡大战后，曹操打败了刘备。刘备只得投靠刘表。曹操为得到刘备的谋士徐庶，就谎称徐庶的母亲病了，让徐庶立刻去许都。徐庶临走时告诉刘备，南阳邓县隆中有个奇才叫诸葛亮，如果能得到他的帮助，就可以得到天下了。\n" +
    "第二天，刘备就和关羽、张飞带着礼物，去南阳邓县隆中拜访诸葛亮。谁知诸葛亮刚好出游去了，书童也说不知什么时候回来。刘备只好回去了。过了几天，刘备和关羽、张飞冒着大雪又来到诸葛亮的家。刘备看见一个青年正在读书，急忙过去行礼。可那个青年是诸葛亮的弟弟。他告诉刘备，哥哥被朋友邀走了。刘备非常失望，只好留下一封信，说渴望得到诸葛亮的帮助，平定天下。转眼过了新年，刘备选了个好日子，又一次来到隆中。这次，诸葛亮正好在睡觉。刘备让关羽、张飞在门外等候，自己在台阶下静静地站着。过了很长时间，诸葛亮才醒来，刘备向他请教平定天下的办法。诸葛亮给刘备分析了天下的形势，说：“北让曹操占天时，南让孙权占地利，将军可占人和，拿下西川成大业，和曹、孙成三足鼎立之势。”刘备一听，非常佩服，请求他相助。诸葛亮答应了。那年诸葛亮才27岁。";
mark[3] = "东汉建安十三年(公元208年)，孙权、刘备联军在长江赤壁(今湖北蒲圻市西北的赤壁山，一说在今湖北武昌县西赤矶山)一带，大败曹操军队的一次决战。曹操败袁绍、破乌桓，基本统一北方后，于建安十三年七月，自宛(今河南南阳)挥师南下，欲先灭刘表，再顺长江东进，击败孙权，以统一天下。九月，曹军进占新野(今属河南)，时刘表已死，其子刘琮不战而降。依附刘表屯兵樊城(今属湖北)的刘备仓促率军民南撤。曹操收编刘表部众，号称八十万大军向长江推进。刘备在长(今湖北当阳境)被曹军大败后，于退军途中派诸葛亮赴柴桑(今江西九江西南)会见孙权，说服孙权结盟抗曹。孙权命周瑜为主将，程普为副，率三万精锐水军，联合屯驻樊口(今湖北鄂州境)的刘备军，共约五万人溯长江西进，迎击曹军。十一月，孙刘联军与曹军对峙于赤壁。曹操将战船首尾相连，结为一体，以利演练水军，伺机攻战。周瑜采纳部将黄盖所献火攻计，并令其致书曹操诈降，曹操中计。黄盖择时率蒙冲斗舰乘风驶入曹军水寨纵火。曹军船阵被烧，火势延及岸上营寨，孙刘联军乘势出击，曹军死伤过半，遂率部北退，留征南将军曹仁固守江陵。联军乘胜扩张战果，孙刘两军分占荆州要地。赤壁决战，曹操在有利形势下，轻敌自负，指挥失误，终致战败。孙权、刘备在强敌进逼关头，结盟抗战，扬水战之长，巧用火攻，终以弱胜强。此战为日后魏、蜀、吴三国鼎立奠定了基础。";
mark[4] = "赤壁一战，曹军大败。曹操领残兵败将狼狈逃命，一路上连遭伏兵劫杀，最后只剩三百余骑往华容道走去。此时人皆饥倒，马尽困乏；焦头烂额者扶策而行，中箭着枪者勉强而走；衣甲湿透，个个不全，军器旗幡，纷乱不整，鞍辔衣服，尽皆抛弃。正值隆冬严寒之时，其苦不可胜言。行不数里，曹操在马上扬鞭大笑。众问何故，曹操道：“人言周瑜、诸葛亮足智多谋，我看到底是无能之辈。若在此处埋伏一军，我等皆束手受缚矣。”言未毕，一声炮响，两边五百校刀手摆过，大将关羽提青龙刀，跨赤兔马，截住去路。曹军见了，亡魂丧胆，面面相觑。曹操说：“既到此处，只得决一死战！”众将道：“人纵然不怯，马力也己乏，安能复战？”谋士程昱说：“关羽一向傲上而不忍下，欺强而不凌弱，恩怨分明，信义素著。丞相旧日待他有恩，今日须是亲自求情，方可脱得此难。”曹操从其言，纵马向前，欠身问道：“将军别来无恙？”关羽也欠身答道：“我奉军师将令，等候丞相多时。”曹操说：“我今日兵败势危，到此无路，望将军以昔日之情为重。”关羽道：“昔日虽蒙丞相厚恩，然已奉报。今日之事，岂敢以私废公？”\n" +
    "曹操说：“大丈夫以信义为重，五关斩将之时，将军还能记否？”关羽是个义重如山的人，想起当日曹操许多恩义与后来五关斩将之事，不觉动心。又见曹军惶惶，皆欲垂泪，心中越发不忍，于是勒回马头，命众军四散摆开。曹操见关羽回马，便和众将一齐冲将过去。关羽回身时，曹操已与众将过去了。关羽大喝一声，曹军皆下马，哭拜于地。关羽越加不忍。正犹豫间，曹将张辽纵马而至。关羽和张辽是故友，今日见了，又动故旧之情，长叹一声，并皆放去。\n" +
    "后人有诗曰：“曹瞒兵败走华容，正与关公狭路逢。只为当初恩义重，放开金锁走蛟龙。”";*/
function msg(id) {
    var ids = id.split("");
    $('.single-mark').css('display', 'block');
    $(".mark-msg").prepend("<span style=\"font-family:'楷体';font-size:16px\" class='msg" + ids[1] + "'>" + mark[ids[1]] + "</span>");
}

$(function () {
    $("#mark-close").bind("click", function () {
        $('.single-mark').css('display', 'none');
        $(".mark-msg").children()[0].remove();

    });
});
/**
 * 抽取卡牌
 */
$(function () {
    $(".btn-get-card").mousemove(function () {
        $('.img-box').attr("src", "../image/png/main/box1.png");
    });
    $(".btn-get-card").mouseout(function () {
        $('.img-box').attr("src", "../image/png/main/box0.png");
    });
    $(".btn-get-card").bind("click", function () {
        $(".btn-get-card").unbind("mousemove");
        $(".btn-get-card").unbind("mouseout");
        $('.img-box').attr("src", "../image/png/main/box2.png");


        var bgs = new Array();
        bgs[0] = "../image/png/main/getA.png";
        bgs[1] = "../image/png/main/getB.png";
        bgs[2] = "../image/png/main/getC.png";
        bgs[3] = "../image/png/main/getD.png";
        bgs[4] = "../image/png/main/getE.png";
        bgs[5] = "../image/png/main/getF.png";
        bgs[6] = "../image/png/main/getG.png";
        var i = 1;
        var beginCard = setInterval(function () {
            if (i < 7) {
                $('.get-card').css('display', 'block');
                $('.get-card').css('background', 'url(' + bgs[i] + ') no-repeat');
                $('.get-card').css('background-size', '100% 100%');
                i++;
            } else {
                beginCard.clearInterval();
            }
        }, 100);
    });
});

/**
 * 刷新按钮
 */
$(function () {
    $("#rb1").bind("click", function () {
        $('.room-li').empty();
        var sendMsg = {"type": "getRoom"};
        var sendMsg0 = JSON.stringify(sendMsg);
        onSend(sendMsg0);
    });
});

/**
 * 创建房间按钮
 */
$(function () {
    $("#rb2").bind("click", function () {
        var sendMsg = {"type": "createRoom", "value": "true"};
        var sendMsg0 = JSON.stringify(sendMsg);
        onSend(sendMsg0);
    });
});

/**
 * 快速加入按钮
 */
$(function () {
    $("#rb3").bind("click", function () {
        var val = $('input:radio[name="room"]:checked').val();
        var sendMsg = {"type": "joinRoom", "roomId": val};
        var sendMsg0 = JSON.stringify(sendMsg);
        onSend(sendMsg0);
    });
});

/**
 * 查看对局记录
 */
$(function () {
    $("#main-record").bind("click", function () {
        $.ajax({
            type: "POST",
            url: "",
            data: {},
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if(data[i].result1 === "true"){
                        $('.div-record').append("<div style=\"position:relative;width:100%;height:12.5%;border-bottom:1px solid #000;float:left\">" +
                            "<img style=\"position:absolute;left:3%;width:35px;height:100%\" src='../image/png/main/record_1.png'/>" +
                            "<span style=\"position:absolute;left:15%;top:20%;width:35%;height:100%;font-family:'楷体';font-size:20px\">" + data[i].time1 + "</span>" +
                            "<span style=\"position:absolute;left:50%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">" + data[i].player1 + "</span>" +
                            "<span style=\"position:absolute;left:70%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">胜</span></div>");
                    }else if(data[i].result1 === "false"){
                        $('.div-record').append("<div style=\"position:relative;width:100%;height:12.5%;border-bottom:1px solid #000;float:left\">" +
                            "<img style=\"position:absolute;left:3%;width:35px;height:100%\" src='../image/png/main/record_1.png'/>" +
                            "<span style=\"position:absolute;left:15%;top:20%;width:35%;height:100%;font-family:'楷体';font-size:20px\">" + data[i].time1 + "</span>" +
                            "<span style=\"position:absolute;left:50%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">" + data[i].player1 + "</span>" +
                            "<span style=\"position:absolute;left:70%;top:20%;width:20%;height:100%;font-family:'楷体';font-size:20px\">败</span></div>");
                    }
                }
            },
            error: function () {
                console.log(Failed);
            }
        });
    });
});