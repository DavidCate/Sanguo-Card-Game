var lockReconnect = false;
var ws;
var myUrl = "ws://localhost:11111";

/**
 * 创建ws
 * @param url
 */
function myWebSocket(url){
    try{
        if ("WebSocket" in window){
            ws = new WebSocket(url);
            ws.onopen = function(){
                onOpen();
            };
            ws.onmessage = function (evt)
            {
                var received_msg = evt.data;
                console.log(evt.data);
                onMessage(evt);
            };
            ws.onerror = function(){
                onError();
            }
            ws.onclose = function()
            {
                onClose();
            };
        }else{
            alert("你的浏览器不支持本游戏");		//未渲染
        }
    }catch (e) {
        reconnect(myUrl);
    }

}
function onOpen(){
    //连接成功，渲染数据；
    //开战动画效果；
    console.log("成功连接到" + myUrl);
    var ck = $.cookie('Sanguo_SessionInfo');
    var msg = {"type":"token","value":ck.split("#")[1].split(":")[1]};
    // console.log(ck);
    var sendMsg0 = JSON.stringify(msg);
    ws.send(sendMsg0);
    //心跳检测重置
    // heartCheck.reset().start();
}

/**
 * 对手出牌手牌
 * @param cid
 */
function moveOtherPerson(cid,curl){
    $("#"+cid).css({position:'fixed',height:'175.5px',width:'124.9px',transform:'rotate(180deg)'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'212px',
        right:'400px'
    },"slow");
    $("#"+cid).attr("src",curl);
    setTimeout(function(){ $("#"+cid).animate({
        height:'170px',
        width:'121px',
        bottom:'212px',
        right:'0px'
    },"slow"); }, 1000);
    setTimeout(function(){ $("#"+cid).remove(); }, 2000);
}

/**
 * 对手装备攻击牌
 * @param cid
 */
function moveOtherAttack(cid,curl){
    if($("#game-up-first").children().length > 0){
        /*删除*/
        $("#game-up-first").children("img").animate({
            height:'170px',
            weight:'121px',
            bottom:'212px',
            right:'0px'
        },"slow");
        $("#game-up-first").children("img").remove();
        /*添加*/
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px',transform:'rotate(180deg)'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'212px',
            right:'400px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            right:'966.6px'
        },"slow");
        $("#"+cid).attr("boolean","false");
    }else{
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px',transform:'rotate(180deg)'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'212px',
            right:'400px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            right:'966.6px'
        },"slow");
        $("#"+cid).attr("boolean","false");
    }
}

/**
 * 对手装备防御牌??
 * @param cid
 */
function moveOtherArmor(cid,curl){
    if($("#game-up-second").children().length > 0){
        /*删除*/
        $("#game-up-second").children("img").animate({
            height:'170px',
            weight:'121px',
            bottom:'212px',
            right:'0px'
        },"slow");
        $("#game-up-second").children("img").remove();
        /*添加*/
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px',transform:'rotate(180deg)'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'212px',
            right:'400px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            right:'847.8px'
        },"slow");
        $("#"+cid).attr("boolean","false");
        $("#game-down-second").prepend($("#"+cid));
    }else{
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px',transform:'rotate(180deg)'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'212px',
            right:'400px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            top:'0px',
            right:'847.8px'
        },"slow");
        $("#"+cid).attr("boolean","false");
        $("#game-down-second").prepend($("#"+cid));
    }

}

function onMessage(evt){
    // heartCheck.reset().start();
    //接受数据，并判断渲染
    var r_msg = evt.data;
    /*if(r_msg.message === "heartBeat"){
        //忽略心跳的信息，因为只要有消息进来，断线重连就会重置不会触发
    }else{
        //处理消息的业务逻辑
    }*/
    var obj = JSON.parse(r_msg);
    /*var obj = {"type":"round","value":"true"};*/
    var parm = obj.type;
    switch (parm)
    {
        case "round":
            //执行？
            var val = obj.value;
            if(val === "true"){
                //我的回合
                //1.渲染
                $('#game-ready').css('display','none');
                $('#game-play').css('display','block');
                $('#game-cancel').css('display','block');
                $('#game-end').css('display','block');
                //2.发牌
            }else if(val === "false"){
                //对方回合
                //1.渲染
            }
            break;
        case "private":
            //执行？
            var user = obj.name;
            var word = obj.msg;
            $('#talk-middle-person').prepend("<span class='other-msg'>"+ user + " : " + word +"</span></br>");
            break;
        case "world":
            //执行？
            var user = obj.name;
            var word = obj.msg;
            $('#talk-middle-world').prepend("<span class='other-msg'>"+ user + " : " + word +"</span></br>");
            break;
        case "play":
            //执行？
            var aid = obj.id;
            var aurl = obj.src;
            var atype =obj.type;
            moveOtherAttack(aid,aurl);
            break;
        case "result":
            //执行？
            var val = obj.value;
            alert(val);
            break;
    }

}
function onError(){
    //发生错误
    reconnect(myUrl);
}
function onClose(){
    //关闭连接，渲染页面；
}
function onSend(msg){
    //发送数据；
    ws.send(msg);
}

/**
 * 重连
 * @param url
 */
function reconnect(url) {
    if(lockReconnect) return;
    lockReconnect = true;
    setTimeout(function () {
        myWebSocket(myUrl);
        console.log("正在重连，当前时间"+new Date());
        lockReconnect = false;
    }, 5000);
}

/**
 * 心跳
 * @type {{timeout: number, timeoutObj: null, serverTimeoutObj: null, reset: (function(): heartCheck), start: heartCheck.start}}
 */
var heartCheck = {
    timeout: 15000,//毫秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            ws.send("HeartBeat");
            console.log("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                ws.close();
            }, self.timeout)
        }, this.timeout)
    }
}
/**
 * 启动连接
 */
myWebSocket(myUrl);
/**
 * onOpen初始化用户数据
 */
$(function(){
    $(".game-down-user").prepend("<span class='user-number' id='user-down-number'>30</span>");
    $(".game-up-user").prepend("<span class='user-number' id='user-up-number'>30</span>");
});
/**
 * 点击发送
 */
$(function(){
    $("#send-talk-btn").bind("click",function(){
        var word = $("input[name='talk-input']").val();
        if(word.length === 0){
            alert("聊天信息不能为空");
        }else{
            var name = "user1";               //获取用户名
            var sendMsg;
            if($('#talk-middle-person').css('display') === 'block'){
                sendMsg = {"type":"private","name":name,"msg":word};
                $('#talk-middle-person').prepend("<span class='my-msg'>"+ word + " : " + name +"</span></br>");
                /*$('#talk-middle-person').scrollTop = $('#talk-middle-person').scrollHeight;*/
            }else if($('#talk-middle-world').css('display') === 'block'){
                sendMsg = {"type":"world","name":name,"msg":word};
                $('#talk-middle-world').prepend("<span class='my-msg'>"+ word + " : " + name +"</span></br>");
            }
            var sendMsg0 = JSON.stringify(sendMsg);
            onSend(sendMsg0);
            /*console.log(sendMsg0);*/
            $("input[name='talk-input']").val("");
        }

    })
});
/**
 * 点击准备/取消准备
 */
$(function(){
    $("#game-ready").mousedown(function(){
        if($('#game-ready').attr("name") === "false"){
            $("#game-ready").css('background','url(../image/png/game/gameReadyBtn.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
        }else{
            $("#game-ready").css('background','url(../image/png/game/gameCancelBtn.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
        }
        /*测试*/
        $('#game-play').css('display','block');
        $('#game-cancel').css('display','block');
        $('#game-end').css('display','block');
        /**/
    });
    $("#game-ready").mouseup(function(){
        if($('#game-ready').attr("name") === "false"){
            $("#game-ready").css('background','url(../image/png/game/gameCancelBtn0.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
            $('#game-ready').attr("name","true");
            var str = {"type":"ready","value":"true"};
            var sendMsg = JSON.stringify(str);
            onSend(sendMsg);
            /*console.log(sendMsg);*/
        }else{
            $("#game-ready").css('background','url(../image/png/game/gameReadyBtn0.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
            $('#game-ready').attr("name","false");
            var str = {"type":"ready","value":"false"};
            var sendMsg = JSON.stringify(str);
            onSend(sendMsg);
            /*console.log(sendMsg);*/
        }
    });
});
/**
 * 发牌（随机）
 */
//卡牌组
var cards = {"cards":[
        {"name":"JW0001", "type":"JW","title":"曹操","url":"../image/card/caocao.png"},
        {"name":"JW0002", "type":"JW","title":"刘备","url":"../image/card/liubei.png"},
        {"name":"JW0003", "type":"JW","title":"孙权","url":"../image/card/sunquan.png"},
        {"name":"JL001", "type":"JL","title":"关羽","url":"../image/card/guanyu.png"},
        {"name":"JL002", "type":"JL","title":"张飞","url":"../image/card/zhangfei.png"},
        {"name":"JL003", "type":"JL","title":"马超","url":"../image/card/machao.png"},
        {"name":"JL004", "type":"JL","title":"黄忠","url":"../image/card/huangzhong.png"},
        {"name":"JL005", "type":"JL","title":"赵云","url":"../image/card/zhaoyun.png"},
        {"name":"JL006", "type":"JL","title":"典韦","url":"../image/card/dianwei.png"},
        {"name":"JL007", "type":"JL","title":"张辽","url":"../image/card/zhangliao"},
        {"name":"JL008", "type":"JL","title":"许褚","url":"../image/card/xuchu.png"},
        {"name":"JL009", "type":"JL","title":"徐晃","url":"../image/card/xuhuang.png"},
        {"name":"JL010", "type":"JL","title":"夏侯惇","url":"../image/card/xiahoudun.png"},
        {"name":"JL011", "type":"JL","title":"曹仁","url":"../image/card/caoren.png"},
        {"name":"JL012", "type":"JL","title":"太史慈","url":"../image/card/taishici.png"},
        {"name":"JL013", "type":"JL","title":"甘宁","url":"../image/card/ganning.png"},
        {"name":"JL014", "type":"JL","title":"凌统","url":"../image/card/lingtong.png"},
        {"name":"JL015", "type":"JL","title":"黄盖","url":"../image/card/huanggai.png"},
        {"name":"JL016", "type":"JL","title":"吕布","url":"../image/card/lvbu.png"},
        {"name":"JS001", "type":"JS","title":"司马懿","url":"../image/card/simayi.png"},
        {"name":"JS002", "type":"JS","title":"程昱","url":"../image/card/chengyu.png"},
        {"name":"JS003", "type":"JS","title":"荀彧","url":"../image/card/xunyu.png"},
        {"name":"JS004", "type":"JS","title":"郭嘉","url":"../image/card/guojia.png"},
        {"name":"JS005", "type":"JS","title":"诸葛亮","url":"../image/card/zhugeliang.png"},
        {"name":"JS006", "type":"JS","title":"庞统","url":"../image/card/pangtong.png"},
        {"name":"JS007", "type":"JS","title":"姜维","url":"../image/card/jiangwei.png"},
        {"name":"JS008", "type":"JS","title":"周瑜","url":"../image/card/zhouyu.png"},
        {"name":"JS009", "type":"JS","title":"鲁肃","url":"../image/card/lusu.png"},
        {"name":"JS010", "type":"JS","title":"张昭","url":"../image/card/zhangzhao.png"},
    ]}

function createRandomId() {
    return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}
var cardId = [];
var ucardId = [];
$(function(){
    for(var i=0;i<4;i++){
        var uuid = createRandomId();
        cardId.push(uuid);
        var cid = Math.floor(Math.random()*28);
        $(".game-down-hand").prepend("<img class='game-card' id='"+ uuid + "' name='"+cards.cards[cid].name+"' type='"+cards.cards[cid].type+"' boolean='false' title='"+cards.cards[cid].title+"' src='"+cards.cards[cid].url+"'/>");
        /*var nuid = createRandomId();
        ucardId.push(nuid);
        var nid = Math.floor(Math.random()*28);
        */
    }

    $(".game-up-hand").prepend("<img class='game-card no-click' id='"+ 123 + "' name='"+cards.cards[7].name+"' type='"+cards.cards[7].type+"' boolean='false' title='"+cards.cards[7].title+"' url='"+cards.cards[7].url+"' src='../image/card/cardbg.png'/>");

});
/**
 * 点击出牌
 */
/**
 * 出牌手牌
 * @param cid
 */
function movePerson(cid){
    $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'250px',
        left:'400px'
    },"slow");
    setTimeout(function(){ $("#"+cid).animate({
        height:'170px',
        weight:'121px',
        top:'212px',
        left:'0px'
    },"slow"); }, 1000);
    /*$("#"+cid).attr("boolean","false");*/
    setTimeout(function(){ $("#"+cid).remove(); }, 2000);
}

/**
 * 装备攻击牌
 * @param cid
 */
function moveAttack(cid){
    if($("#game-down-first").children().length > 0){
        /*删除*/
        $("#game-down-first").children("img").animate({
            height:'170px',
            weight:'121px',
            top:'212px',
            left:'0px'
        },"slow");
        $("#game-down-first").children("img").remove();
        /*添加*/
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'400px'
        },"slow");
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            left:'0px'
        },"slow");
        $("#"+cid).attr("boolean","false");
    }else{
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'400px'
        },"slow");
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            left:'0px'
        },"slow");
        $("#"+cid).attr("boolean","false");
    }
}

/**
 * 装备防御牌
 * @param cid
 */
function moveArmor(cid){
    if($("#game-down-second").children().length > 0){
        /*删除*/
        $("#game-down-second").children("img").animate({
            height:'170px',
            weight:'121px',
            top:'212px',
            left:'0px'
        },"slow");
        $("#game-down-second").children("img").remove();
        /*添加*/
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'400px'
        },"slow");
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            left:'119px'
        },"slow");
        $("#"+cid).attr("boolean","false");
        $("#game-down-second").prepend($("#"+cid));
    }else{
        $("#"+cid).css({position:'fixed',height:'175.5px',weight:'124.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'400px'
        },"slow");
        $("#"+cid).animate({
            height:'163px',
            weight:'113px',
            bottom:'0px',
            left:'119px'
        },"slow");
        $("#"+cid).attr("boolean","false");
        $("#game-down-second").prepend($("#"+cid));
    }

}
$(function(){
    $("#game-play").bind("click",function(){
        for(var j=0;j<cardId.length;j++){
            if($("#"+cardId[j]).attr("boolean") === "true"){
                var cname = $("#"+cardId[j]).attr("name");
                var ctype = $("#"+cardId[j]).attr("type");
                var cid = $("#"+cardId[j]).attr("id");
                var csrc = $("#"+cardId[j]).attr("src");
                console.log(cname);
                /*测试发送*/
                var str = {"type":"play","id": cid,"src":csrc,"type":ctype};
                console.log(str);
                var sendMsg = JSON.stringify(str);
                onSend(sendMsg);

                switch (cname) {
                    case "JW0001":
                        movePerson(cardId[j]);
                        var num = $("#user-down-number").html();
                        /*测试*/
                        $("#user-up-number").html(num - 3);
                        console.log(num - 3);
                        /**/
                        var str = {"type":"play","value":num - 3};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JW0002":
                        moveArmor(cardId[j]);
                        break;
                    case "JW0003":
                        moveArmor(cardId[j]);
                        break;
                    case "JL001":
                        movePerson(cardId[j]);
                        break;
                    case "JL002":
                        movePerson(cardId[j]);
                        break;
                    case "JL003":
                        movePerson(cardId[j]);
                        break;
                    case "JL004":
                        movePerson(cardId[j]);
                        break;
                    case "JL005":
                        movePerson(cardId[j]);
                        break;
                    case "JL006":
                        movePerson(cardId[j]);
                        break;
                    case "JL007":
                        movePerson(cardId[j]);
                        break;
                    case "JL008":
                        movePerson(cardId[j]);
                        break;
                    case "JL009":
                        movePerson(cardId[j]);
                        break;
                    case "JL010":
                        movePerson(cardId[j]);
                        break;
                    case "JL011":
                        movePerson(cardId[j]);
                        break;
                    case "JL012":
                        movePerson(cardId[j]);
                        break;
                    case "JL013":
                        movePerson(cardId[j]);
                        break;
                    case "JL014":
                        movePerson(cardId[j]);
                        break;
                    case "JL015":
                        movePerson(cardId[j]);
                        break;
                    case "JL016":
                        movePerson(cardId[j]);
                        break;
                    case "JS001":
                        movePerson(cardId[j]);
                        break;
                    case "JS002":
                        movePerson(cardId[j]);
                        break;
                    case "JS003":
                        movePerson(cardId[j]);
                        break;
                    case "JS004":
                        movePerson(cardId[j]);
                        break;
                    case "JS005":
                        movePerson(cardId[j]);
                        break;
                    case "JS006":
                        movePerson(cardId[j]);
                        break;
                    case "JS007":
                        movePerson(cardId[j]);
                        break;
                    case "JS008":
                        movePerson(cardId[j]);
                        break;
                    case "JS009":
                        movePerson(cardId[j]);
                        break;
                    case "JS010":
                        movePerson(cardId[j]);
                        break;
                }
                /*if($("#"+cardId[j]).attr("type") === "JW"){

                }else if($("#"+cardId[j]).attr("type") === "WJW"){
                    $("#"+cardId[j]).css({position:'fixed',height:'175.5px',weight:'124.9px'});
                    $("#"+cardId[j]).addClass("no-click");
                    $("#"+cardId[j]).animate({
                        bottom:'250px',
                        left:'400px'
                    });
                    $("#"+cardId[j]).animate({
                        bottom:'0px',
                        left:'0px'
                    });
                }*/
            }
        }
    })
});
/**
 * 点击结束回合
 */
$(function(){
    $("#game-end").bind("click",function(){
        var str = {"type":"end","value":"true"};
        var sendMsg = JSON.stringify(str);
        onSend(sendMsg);
    })
});
/**
 * 点击取消
 */
$(function(){
    $("#game-cancel").mousedown(function(){
        $("#game-cancel").css('background','url(../image/png/game/gameNoBtn.png) no-repeat');
        $("#game-cancel").css('background-size','100% 100%');
    });
    $("#game-cancel").mouseup(function(){
        $("#game-cancel").css('background','url(../image/png/game/gameNoBtn0.png) no-repeat');
        $("#game-cancel").css('background-size','100% 100%');

        var obj = {"type":"play","id":"123","url":"../image/card/zhaoyun.png"};
        var parm = obj.type;
        switch (parm)
        {
            case "play":
                //执行？
                var aid = obj.id;
                var aurl = obj.url;
                moveOtherAttack(aid,aurl);
                break;
        }
    });
});
/**
 * 触发/点击卡牌
 */
$(function(){
    $(".game-card").bind("click",function(){
        if($(this).attr("boolean") === "false"){
            $(this).css("bottom","10%");
            $(this).attr("boolean","true");
        }else{
            $(this).attr("boolean","false");
            $(this).css("bottom","0");
        }
    })
});


