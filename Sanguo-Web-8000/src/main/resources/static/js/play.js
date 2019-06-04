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

var lockReconnect = false;
var ws;
var myUrl = "ws://192.168.43.189:11111";

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
    var msg = ck.split("#")[1].split(":")[1];
    var obj = {"type":"token","value":msg,"flag":"2"};
    var sendMsg0 = JSON.stringify(obj);
    ws.send(sendMsg0);
    //心跳检测重置
    /*heartCheck.reset().start();*/
    var obj = {"type":"card"};
    var sendMsg0 = JSON.stringify(obj);
    ws.send(sendMsg0);
}
/**
 * onOpen初始化用户数据
 */
$(function(){
    $(".game-down-user").prepend("<span class='user-number' id='user-down-number'>30</span>");
    $(".game-up-user").prepend("<span class='user-number' id='user-up-number'>30</span>");
});
var player0 = $("#user-down-number").html();
var player1 = $("#user-up-number").html();

/**
 * 卡牌组
 * @type {{cards: *[]}}*/
var cards = {"cards":[
        {"name":"JW0001", "type":"JW","title":"人物背景：曹操，字孟德，东汉末年政治家，军事家，文学家。足智多谋，善于随机应变；攻击效果:对攻击角色造成三点伤害；锦囊:若攻击角色攻击装备区有牌，则移除。","url":"../image/card/caocao.png"},
        {"name":"JW0002", "type":"JW","title":"人物背景：刘备，字玄德，蜀汉昭烈皇帝，与关羽张飞桃园结义，三顾茅庐请出诸葛亮为军师；攻击效果：对攻击角色造成三点伤害；锦囊：若攻击角色防御装备区有牌，则移除。","url":"../image/card/liubei.png"},
        {"name":"JW0003", "type":"JW","title":"人物背景：孙权，字仲谋，公元229年，建立吴国，称帝，定都建业；攻击效果：对攻击角色造成三点伤害；锦囊：若角色攻击装备区无牌则视为装备加持两点伤害。","url":"../image/card/sunquan.png"},
        {"name":"JL001", "type":"JL","title":"人物背景：关羽，字云长，曾在汜水关前斩华雄，虎牢关前战吕布而闻名天下，诛颜良斩文丑，千里走单骑，过五关斩六将，五虎大将排名第一；攻击效果:对攻击角色造成四点伤害","url":"../image/card/guanyu.png"},
        {"name":"JL002", "type":"JL","title":"人物背景：张飞，字翼德，蜀国五虎大将第二位；攻击效果：对攻击角色造成三点伤害","url":"../image/card/zhangfei.png"},
        {"name":"JL003", "type":"JL","title":"人物背景：马超，字孟起，蜀国五虎大将第四位，出身于西凉豪强家族，有神威将军美名；攻击效果：对攻击角色造成三点伤害","url":"../image/card/machao.png"},
        {"name":"JL004", "type":"JL","title":"人物背景：黄忠，字汉升，蜀国五虎大将第五位，原刘表属下，后投刘备；攻击效果：对攻击角色造成两点伤害","url":"../image/card/huangzhong.png"},
        {"name":"JL005", "type":"JL","title":"人物背景：赵云，字子龙，蜀国五虎大将第三位，在当阳长坂坡于百万曹操军中六进六出救出甘夫人与阿斗。浑身是胆，屡建奇功；攻击效果：对攻击角色造成四点伤害","url":"../image/card/zhaoyun.png"},
        {"name":"JL006", "type":"JL","title":"人物背景：典韦，魏国名将，与张绣交战时因双戟被盗，中箭而死；攻击效果：对攻击角色造成四点伤害","url":"../image/card/dianwei.png"},
        {"name":"JL007", "type":"JL","title":"人物背景：张辽，字文远，魏国名将，孙权攻打合肥，衰敢死队八百余人守城，大破吴军；攻击效果：对攻击角色造成三点伤害","url":"../image/card/zhangliao.png"},
        {"name":"JL008", "type":"JL","title":"人物背景：许褚，字仲康，魏国名将，与马超大战于潼关，威名大振；攻击效果：对攻击角色造成三点伤害","url":"../image/card/xuchu.png"},
        {"name":"JL009", "type":"JL","title":"人物背景：徐晃，字公明，曹操手下名将；攻击效果：对攻击角色造成三点伤害","url":"../image/card/xuhuang.png"},
        {"name":"JL010", "type":"JL","title":"人物背景：夏侯惇，字元让，曹魏名将，武功高强，封大将军；攻击效果：对攻击角色造成三点伤害","url":"../image/card/xiahoudun.png"},
        {"name":"JL011", "type":"JL","title":"人物背景：曹仁，字子孝，曹操堂弟，善用兵多谋略，为曹操手下独当一面的大将军；攻击效果：对攻击角色造成三点伤害","url":"../image/card/caoren.png"},
        {"name":"JL012", "type":"JL","title":"人物背景：太史慈，字子义，东吴名将；攻击效果：对攻击角色造成三点伤害","url":"../image/card/taishici.png"},
        {"name":"JL013", "type":"JL","title":"人物背景：甘宁，字兴霸，吴国大将，著名水军将领；攻击效果：对攻击角色造成三点伤害","url":"../image/card/ganning.png"},
        {"name":"JL014", "type":"JL","title":"人物背景：凌统，字公绩，吴国重要将领；攻击效果：对攻击角色造成两点伤害","url":"../image/card/lingtong.png"},
        {"name":"JL015", "type":"JL","title":"人物背景：黄盖，字公覆，赤壁大战时，行苦肉计诈降曹操，率船火烧曹军，立下大功；攻击效果：对攻击角色造成两点伤害","url":"../image/card/huanggai.png"},
        {"name":"JL016", "type":"JL","title":"人物背景：吕布，字奉先，东汉末年董卓部将，一生有勇无谋，英雄气短，儿女情长；攻击效果：对攻击角色造成五点伤害","url":"../image/card/lvbu.png"},
        {"name":"JL017", "type":"JL","title":"人物背景：姜维，字伯约，蜀汉名将，官至大将军；攻击效果：对攻击角色造成两点伤害","url":"../image/card/jiangwei.png"},
        {"name":"JS001", "type":"JS","title":"人物背景：司马懿，字仲达，三国时期魏国政治家，军事家；锦囊：出牌回合角色摸两张牌","url":"../image/card/simayi.png"},
        {"name":"JS002", "type":"JS","title":"人物背景：程昱，字仲德，曹操部将，曾于徐州用计迫降关羽；锦囊：弃置对方角色一张牌","url":"../image/card/chengyu.png"},
        {"name":"JS003", "type":"JS","title":"人物背景：荀彧，字文若东汉末年曹操部下谋臣，杰出政治家军事家；锦囊：出牌回合使角色回复一点生命值","url":"../image/card/xunyu.png"},
        {"name":"JS004", "type":"JS","title":"人物背景：郭嘉，字奉孝，曹操账下著名谋士；锦囊：出牌回合弃置三张牌使其角色回复两点生命值","url":"../image/card/guojia.png"},
        {"name":"JS005", "type":"JS","title":"人物背景：诸葛亮，字孔明，号卧龙，三国蜀汉政治家、军事家；锦囊：出牌回合角色摸两张牌","url":"../image/card/zhugeliang.png"},
        {"name":"JS006", "type":"JS","title":"人物背景：庞统，字士元，号凤雏，世人称“卧龙凤雏，二人得一，可安天下”；锦囊：弃置对方角色两张牌","url":"../image/card/pangtong.png"},
        {"name":"JS007", "type":"JS","title":"人物背景：周瑜，字公瑾，东吴将领，杰出军事家，公元208年吴蜀联合，火烧赤壁，大破曹军；锦囊：使对方角色跳过一次出牌回合","url":"../image/card/zhouyu.png"},
        {"name":"JS008", "type":"JS","title":"人物背景：鲁肃，字子敬，东吴政治家、外交家；锦囊：对攻击角色造成两点魔法伤害","url":"../image/card/lusu.png"},
        {"name":"JS009", "type":"JS","title":"人物背景：张昭，字子布，孙策拜为长史、辅军中将，孙权即位后拜辅吴将军；锦囊：对攻击角色造成两点魔法伤害","url":"../image/card/zhangzhao.png"},
        {"name":"WQ001", "type":"WQ","title":"武器简介：倚天剑，曹操专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/ytj.png"},
        {"name":"WQ002", "type":"WQ","title":"武器简介：双股剑，刘备专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/sgj.png"},
        {"name":"WQ003", "type":"WQ","title":"武器简介：方天画戟，吕布专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/fthj.png"},
        {"name":"WQ004", "type":"WQ","title":"武器简介：青龙偃月刀，关羽专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/qlyyd.png"},
        {"name":"WQ005", "type":"WQ","title":"武器简介：丈八蛇矛，张飞专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/zbsm.png"},
        {"name":"WQ006", "type":"WQ","title":"武器简介：涯角枪，赵云专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/yjq.png"},
        {"name":"WQ007", "type":"WQ","title":"武器简介：龙骑枪，马超专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/lqq.png"},
        {"name":"WQ008", "type":"WQ","title":"武器简介：眉尖大砍刀，黄忠专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/mjdkd.png"},
        {"name":"WQ009", "type":"WQ","title":"武器简介：朱雀羽扇，诸葛亮专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/zqys.png"},
        {"name":"WQ010", "type":"WQ","title":"武器简介：镔铁双戟，典韦专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/btsj.png"},
        {"name":"WQ011", "type":"WQ","title":"武器简介：黄龙勾镰刀，张辽专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/hlgld.png"},
        {"name":"WQ012", "type":"WQ","title":"武器简介：麒麟斧，夏侯惇专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/qlf.png"},
        {"name":"WQ013", "type":"WQ","title":"武器简介：双刃斧，徐晃专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/srf.png"},
        {"name":"WQ014", "type":"WQ","title":"武器简介：威胜长锤，许褚专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/wscc.png"},
        {"name":"WQ015", "type":"WQ","title":"武器简介：赤血剑，太史慈专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/cxj.png"},
        {"name":"WQ016", "type":"WQ","title":"武器简介：龙鳞枪，凌统专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/llq.png"},
        {"name":"WQ017", "type":"WQ","title":"武器简介：紫电枪，甘宁专属武器；攻击加成：对角色卡牌攻击力加持一点伤害","url":"../image/card/zdq.png"},
        {"name":"CC001", "type":"CC","title":"城池简介：荆州；防御加成：对对方角色卡牌攻击抵消两点伤害","url":"../image/card/jingzhou.png"},
        {"name":"CC002", "type":"CC","title":"城池简介：虎牢关；防御加成：对对方角色卡牌攻击抵消两点伤害","url":"../image/card/hulaoguan.png"},
        {"name":"CC003", "type":"CC","title":"城池简介：许昌；防御加成：对对方角色卡牌攻击抵消两点伤害","url":"../image/card/xuchang.png"},
        {"name":"CC004", "type":"CC","title":"城池简介：吴郡；防御加成：对对方角色卡牌攻击抵消两点伤害","url":"../image/card/wujun.png"},
        {"name":"CC005", "type":"CC","title":"城池简介：下邳；防御加成：对对方角色卡牌攻击抵消两点伤害","url":"../image/card/xiapi.png"},
        {"name":"YX001", "type":"YX","title":"简介：玉玺，东汉末年，袁绍入宫杀宦官，玉玺失踪，孙坚率军攻入洛阳，得玉玺，后被曹操所得，挟天子以令诸侯；使用效果：对角色回复三点血量值","url":"../image/card/yuxi.png"},
    ]};
// var cards={};
/**
 * 整理手牌
 */
function pailie() {
    var s = $(".down-card").children().length;
    if(s<6){
        for(var i=0;i<s;i++){
            $("#"+($(".down-card").children()[i].id)).css('left',114.89*(s-1-i)+'px');
        }
    }else{
        for(var i=0;i<s;i++){
            var ss = (597 - 114.89)/(s-1) * (s-1-i);
            $("#"+($(".down-card").children()[i].id)).css('left',ss+'px');
            $("#"+($(".down-card").children()[i].id)).css('z-index',s-i);
        }
    }
}

function pailie0() {
    var s = $(".up-card").children().length;
    if(s<6){
        for(var i=0;i<s;i++){
            $("#"+($(".up-card").children()[i].id)).css('right',114.89*(s-1-i)+'px');
        }
    }else{
        for(var i=0;i<s;i++){
            var ss = (597 - 114.89)/(s-1) * (s-1-i);
            $("#"+($(".up-card").children()[i].id)).css('right',ss+'px');
            $("#"+($(".up-card").children()[i].id)).css('z-index',s-i);
        }
    }
}
/**
 * 卡牌详情
 */
function detail(card) {
    /*var msg = $("#"+card.id).attr("msg");
    var msgs = msg.split("；");*/
    $(".down-card").prepend("<div class='detail-card' id='c" + card.id + "'><span class='span-detail'>"+$("#"+card.id).attr("msg")+"</span></div>");
    $("#c"+card.id).css('left',$("#"+card.id).css('left'));
    /*for(var i=0;i<msgs.length;i++){
        $("#c"+card.id).prepend("<span class='span-detail'>"+msgs[i]+"</span><br>");
    }*/
}
function guan(card) {
    $("#c"+card.id).remove();
}
/**
 * 触发/点击卡牌
 */
function dianji(card){
    if($("#"+card.id).attr("boolean") === "false"){
        $("#"+card.id).css("bottom","10%");
        $("#"+card.id).attr("boolean","true");
    }else{
        $("#"+card.id).attr("boolean","false");
        $("#"+card.id).css("bottom","0");
    }
}

/**
 * 首次发牌
 */
function createRandomId() {
    return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}
var cardId = [];
function firstcard(){
    var num = 5;
    for (var i = 0; i < num; i++) {
        var uuid = createRandomId();
        cardId.push(uuid);
        var cid = Math.floor(Math.random() * 52);
        $(".down-card").prepend("<img class='game-card' onclick='dianji(this)' onmouseover='detail(this)' onmouseout='guan(this)' id='" + uuid + "' name='" + cards.cards[cid].name + "' type='" + cards.cards[cid].type + "' boolean='false' msg='" + cards.cards[cid].title + "' src='" + cards.cards[cid].url + "'/>");
        /**
         * 发送首次发牌信息
         * @type {{type: string, name: string, url: string}}
         */

        var str = {"type":"get","id":""+ uuid +"","name":""+cards.cards[cid].name+"","url":""+cards.cards[cid].url+""};
        var sendMsg = JSON.stringify(str);
        onSend(sendMsg);
        pailie();
    }
}

/**
 * 摸牌
 */
function nextcard() {
    var num = 2;
    for (var i = 0; i < num; i++) {
        var uuid = createRandomId();
        cardId.push(uuid);
        var cid = Math.floor(Math.random() * 52);
        $(".down-card").prepend("<img class='game-card' onclick='dianji(this)' onmouseover='detail(this)' onmouseout='guan(this)' id='" + uuid + "' name='" + cards.cards[cid].name + "' type='" + cards.cards[cid].type + "' boolean='false' msg='" + cards.cards[cid].title + "' src='" + cards.cards[cid].url + "'/>");
        /**
         * 发送摸牌信息
         * @type {{type: string, name: string, url: string}}
         */
        var str = {"type":"get","id":""+ uuid +"","name":""+cards.cards[cid].name+"","url":""+cards.cards[cid].url+""};
        var sendMsg = JSON.stringify(str);
        onSend(sendMsg);
        pailie();
    }
}

/**
 * 开局动画
 */
function cartoon() {
    var audio = $(".bj-voice");
    var bj = audio[0];
    $('.game-begin').fadeIn("slow");
    setTimeout(function(){
        bj.play();
        $('.game-begin').css('background','url(../image/png/game/begin1.png) no-repeat');
        $('.game-begin').css('background-size','100% 100%');
    }, 800);
    setTimeout(function(){
        $('.game-begin').fadeOut("slow");
    }, 1500);
}

/**
 * 对手出牌君王牌
 * @param cid
 * @param curl
 */
function moveOtherDiwang(cid,curl){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'-240px',
        right:'100px'
    },"slow");
    $("#"+cid).attr("src",curl);
    var audio = $(".voice-d");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){ $("#"+cid).animate({
        bottom:'-212px',
        right:'510px'
    },"slow"); }, 1000);
    setTimeout(function(){ $("#"+cid).remove();
        pailie0();
    }, 2000);

   /* var num = $("#user-down-number").html();*/
    if($('#game-up-first').children().length == 0){
        if($('#game-down-second').children().length == 0){
            $("#user-down-number").html(player0 - 3);
        }else{
            $("#user-down-number").html(player0 - 1);
        }
    }else{
        if($('#game-down-second').children().length == 0){
            $("#user-down-number").html(player0 - 4);
        }else{
            $("#user-down-number").html(player0 - 2);
        }
    }
}
/**
 * 对手出牌武将牌
 * @param cid
 */
function moveOtherPerson(cid,curl){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'-240px',
        right:'100px'
    },"slow");
    $("#"+cid).attr("src",curl);
    var audio = $(".voice-p");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){ $("#"+cid).animate({
        bottom:'-212px',
        right:'510px'
    },"slow"); }, 1000);
    setTimeout(function(){ $("#"+cid).remove();
        pailie0();
    }, 2000);
}

/**
 * 对手出牌军师牌
 * @param cid
 * @param curl
 */
function moveOtherPerson0(cid,curl){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'-240px',
        right:'100px'
    },"slow");
    $("#"+cid).attr("src",curl);
    var audio = $(".voice-j");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){ $("#"+cid).animate({
        bottom:'-212px',
        right:'510px'
    },"slow"); }, 1000);
    setTimeout(function(){ $("#"+cid).remove();
        pailie0();
    }, 2000);
}
/**
 * 对手出牌玉玺牌
 * @param cid
 * @param curl
 */
function moveOtherYx(cid,curl){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'-240px',
        right:'100px'
    },"slow");
    $("#"+cid).attr("src",curl);
    var audio = $(".voice-y");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){ $("#"+cid).animate({
        bottom:'-212px',
        right:'510px'
    },"slow"); }, 1000);
    setTimeout(function(){ $("#"+cid).remove();
        pailie0();
    }, 2000);
}
/**
 * 对手装备攻击牌
 * @param cid
 */
function moveOtherAttack(cid,curl){
    if($("#game-up-first").children().length > 0){
        /*删除*/
        $("#game-up-first").children("img").animate({
            height:'161.4px',
            weight:'114.9px',
            bottom:'212px',
            right:'0px'
        },"slow");
        $("#game-up-first").children("img").remove();
        /*添加*/
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'-240px',
            right:'100px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            bottom:'0px',
            right:'-462px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-up-first").prepend($("#"+cid));
            $("#"+cid).css({left:'8px',top:'7px'});
        }, 2000);
    }else{
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'-240px',
            right:'100px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            bottom:'0px',
            right:'-462px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-up-first").prepend($("#"+cid));
            $("#"+cid).css({left:'8px',top:'7px'});
            pailie0();
        }, 1500);
    }
}

/**
 * 移除对方攻击牌
 */
function deleteOtherAttack() {
    if($("#game-up-first").children().length > 0){
        var id = $("#game-up-first").children()[0].id;
        $("#"+id).animate({
            left:'-440px',
            top:'220px'
        },"slow");
        $("#"+id).animate({
            left:'-960px',
            top:'220px'
        },"slow");
        setTimeout(function(){
            $("#"+id).remove();
        }, 1500);
    }
}
/**
 * 对手装备防御牌
 * @param cid
 */
function moveOtherArmor(cid,curl){
    if($("#game-up-second").children().length > 0){
        /*删除*/
        $("#game-up-second").children("img").animate({
            height:'161.4px',
            weight:'114.9px',
            bottom:'212px',
            right:'0px'
        },"slow");
        $("#game-up-second").children("img").remove();
        /*添加*/
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'-240px',
            right:'100px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            bottom:'0px',
            right:'-331px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-up-second").prepend($("#"+cid));
            $("#"+cid).css({right:'9px',top:'7px'});
            pailie0();
        }, 2000);
    }else{
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'-240px',
            right:'100px'
        },"slow");
        $("#"+cid).attr("src",curl);
        $("#"+cid).animate({
            bottom:'0px',
            right:'-331px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-up-second").prepend($("#"+cid));
            $("#"+cid).css({right:'9px',top:'7px'});
            pailie0();
        }, 2000);
    }

}

/**
 * 移除对方防御牌
 */
function deleteOtherArmor() {
    if($("#game-up-second").children().length > 0){
        var id = $("#game-up-second").children()[0].id;
        $("#"+id).animate({
            left:'-440px',
            top:'220px'
        },"slow");
        $("#"+id).animate({
            left:'-960px',
            top:'220px'
        },"slow");
        setTimeout(function(){
            $("#"+id).remove();
        }, 1500);
    }
}

/**
 * 移除自己攻击牌
 */
function deleteAttack() {
    if($("#game-down-first").children().length > 0){
        var id = $("#game-down-first").children()[0].id;
        $("#"+id).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+id).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
        setTimeout(function(){
            $("#"+id).remove();
        }, 1500);
    }
}

/**
 * 移除自己防御牌
 */
function deleteArmor() {
    if($("#game-down-second").children().length > 0){
        var id = $("#game-down-second").children()[0].id;
        $("#"+id).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+id).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
        setTimeout(function(){
            $("#"+id).remove();
        }, 1500);
    }
}

function onMessage(evt){
   /* heartCheck.reset().start();*/
    //接受数据，并判断渲染
    var r_msg = evt.data;
    /*if(r_msg.message === "heartBeat"){
        //忽略心跳的信息，因为只要有消息进来，断线重连就会重置不会触发
    }else{
        //处理消息的业务逻辑
    }*/
    console.log(r_msg);
    var obj = JSON.parse(r_msg);
    var parm = obj.type;
    switch (parm)
    {
        case "cards":
            cards = obj.cards;
            break;
        case "round":
            var val = obj.value;
            if(val === "true"){
                //我的回合
                //1.渲染
                cartoon();
                $('#game-ready').css('display','none');
                $('#game-play').css('display','block');
                $('#game-cancel').css('display','block');
                $('#game-end').css('display','block');
                $('.down-status').attr('src','../image/png/game/begined.png');
                //2.发牌
                firstcard();
                setTimeout(function(){
                    $('.down-status').attr('src','../image/png/game/played.png');
                    nextcard();
                }, 1000);
            }else if(val === "false"){
                //对方回合
                //1.渲染
                cartoon();
                $('#game-ready').css('display','none');
                $('#game-play').css('display','none');
                $('#game-cancel').css('display','none');
                $('#game-end').css('display','none');
                $('.up-status').css('display','none');
                //发牌
                firstcard();
            }
            break;
        case "get":
            var cid = obj.id;
            var cname = obj.name;
            var curl = obj.url;
            $(".up-card").prepend("<img class='game-card0 no-click' id='"+ cid + "' name='"+cname+"' boolean='false' url='"+curl+"' src='../image/card/cardbg.png'/>");
            pailie0();
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
            debugger;
            var aid = obj.id;
            var aurl = obj.url;
            var aname = obj.name;
            switch (aname) {
                case "JW0001":
                    moveOtherDiwang(aid,aurl);
                    lose0();
                    setTimeout(function () {
                        deleteAttack();
                    }, 1500);
                    break;
                case "JW0002":
                    moveOtherDiwang(aid,aurl);
                    lose0();
                    setTimeout(function () {
                        deleteArmor();
                    }, 1500);
                    break;
                case "JW0003":
                    moveOtherDiwang(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        $("#user-down-number").html(player0 - 2);
                    }else{
                        $("#user-down-number").html(player0 - 0);
                    }
                    lose0();
                    break;
                case "JL001":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 5);
                        }else{
                            $("#user-down-number").html(player0 - 3);
                        }
                    }
                    lose0();
                    break;
                case "JL002":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL003":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL004":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 2);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 0);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 1);
                            lose0();
                        }
                    }
                    break;
                case "JL005":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 5);
                        }else{
                            $("#user-down-number").html(player0 - 3);
                        }
                    }
                    lose0();
                    break;
                case "JL006":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 5);
                        }else{
                            $("#user-down-number").html(player0 - 3);
                        }
                    }
                    lose0();
                    break;
                case "JL007":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL008":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL009":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL010":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL011":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL012":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL013":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                        }else{
                            $("#user-down-number").html(player0 - 1);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 4);
                        }else{
                            $("#user-down-number").html(player0 - 2);
                        }
                    }
                    lose0();
                    break;
                case "JL014":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 2);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 0);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 1);
                            lose0();
                        }
                    }
                    break;
                case "JL015":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 2);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 0);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 3);
                            lose0();
                        }else{
                            $("#user-down-number").html(player0 - 1);
                            lose0();
                        }
                    }
                    break;
                case "JL016":
                    moveOtherPerson(aid,aurl);
                    if($('#game-up-first').children().length == 0){
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 5);
                        }else{
                            $("#user-down-number").html(player0 - 3);
                        }
                    }else{
                        if($('#game-down-second').children().length == 0){
                            $("#user-down-number").html(player0 - 6);
                        }else{
                            $("#user-down-number").html(player0 - 4);
                        }
                    }
                    lose0();
                    break;
                case "JS001":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS002":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS003":
                    moveOtherPerson0(aid,aurl);
                    $("#user-up-number").html(player1 + 1);
                    break;
                case "JS004":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS005":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS006":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS007":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS008":
                    moveOtherPerson0(aid,aurl);
                    break;
                case "JS009":
                    moveOtherPerson0(aid,aurl);
                    $("#user-down-number").html(player0 - 2);
                    lose0();
                    break;
                case "JS010":
                    moveOtherPerson0(aid,aurl);
                    $("#user-down-number").html(player0 - 2);
                    lose0();
                    break;
                case "WQ001":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ002":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ003":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ004":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ005":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ006":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ007":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ008":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ009":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ010":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ011":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ012":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ013":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ014":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ015":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ016":
                    moveOtherAttack(aid,aurl);
                    break;
                case "WQ017":
                    moveOtherAttack(aid,aurl);
                    break;
                case "CC001":
                    moveOtherArmor(aid,aurl);
                    break;
                case "CC002":
                    moveOtherArmor(aid,aurl);
                    break;
                case "CC003":
                    moveOtherArmor(aid,aurl);
                    break;
                case "CC004":
                    moveOtherArmor(aid,aurl);
                    break;
                case "CC005":
                    moveOtherArmor(aid,aurl);
                    break;
                case "YX001":
                    moveOtherYx(aid,aurl);
                    $("#user-up-number").html(player1 + 3);
                    break;
            }
            break;
        case "result":
            //执行？
            var val = obj.value;
            if(val === "true"){
                alert("你输了");
                setTimeout(function(){
                    window.location.href = "http://192.168.43.189:8000/html/main.html?user="+getUrlParam("user")+"";
                }, 3000);
            }else if(val === "false"){
                alert("你赢了");
                setTimeout(function(){
                    window.location.href = "http://192.168.43.189:8000/html/main.html?user="+getUrlParam("user")+"";
                }, 3000);
            }
            break;
        case "round1":
            var val = obj.value;
            if(val === "true"){
                $('#game-play').css('display','block');
                $('#game-cancel').css('display','block');
                $('#game-end').css('display','block');
            }
            nextcard();
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
 * 点击发送
 */
$(function(){
    $("#send-talk-btn").bind("click",function(){
        var word = $("input[name='talk-input']").val();
        if(word.length === 0){
            alert("聊天信息不能为空");
        }else{
            var name = getUrlParam('name');             //获取用户名
            /*var ck = $.cookie('Sanguo_SessionInfo');
            var name = ck.split("#")[1].split(":")[1];*/
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
    });
    $("#game-ready").mouseup(function(){
        if($('#game-ready').attr("name") === "false"){
            $("#game-ready").css('background','url(../image/png/game/gameCancelBtn0.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
            $('#game-ready').attr("name","true");
            $('.up-status').css('display','block');
            $('.down-status').css('display','block');
            var str = {"type":"ready","value":"true"};
            var sendMsg = JSON.stringify(str);
            onSend(sendMsg);
        }else{
            $("#game-ready").css('background','url(../image/png/game/gameReadyBtn0.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
            $('#game-ready').attr("name","false");
            var str = {"type":"ready","value":"false"};
            var sendMsg = JSON.stringify(str);
            onSend(sendMsg);
        }
    });
});
/**
 * 掉血
 */
var index = 1;
var index0 = 1;
var blood = new Array();
blood[0] = "../image/png/game/x1.png";
blood[1] = "../image/png/game/x2.png";
blood[2] = "../image/png/game/x3.png";
blood[3] = "../image/png/game/x4.png";
blood[4] = "../image/png/game/x5.png";
blood[5] = "../image/png/game/x6.png";
function lose() {
    $('.img-blood').css('display','block');
    var retime = setInterval(function(){
        $('.img-blood').attr('src',blood[index]);
        index++;
        if(index > 6){
            $('.img-blood').css('display','none');
            $('.img-blood').attr('src',blood[0]);
            index = 1;
            clearInterval(retime);
        }
    }, 50);
    var audio = $(".voice-s");
    var bj = audio[0];
    bj.play();
}
function lose0() {
    $('.img-blood0').css('display','block');
    var retime0 = setInterval(function(){
        $('.img-blood0').attr('src',blood[index0]);
        index0++;
        if(index0 > 6){
            $('.img-blood0').css('display','none');
            $('.img-blood0').attr('src',blood[0]);
            index0 = 1;
            clearInterval(retime0);
        }
    }, 50);
    var audio = $(".voice-s");
    var bj = audio[0];
    bj.play();
}
/**
 * 出牌帝王牌
 * @param cid
 */
function moveDiwang(cid){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'250px',
        left:'100px'
    },"slow");
    var audio = $(".voice-d");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){
        $("#"+cid).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
    }, 1000);
    $("#"+cid).attr("boolean","false");
    setTimeout(function(){ $("#"+cid).remove();
        pailie();
    }, 1500);

    /*var num = $("#user-up-number").html();*/
    if($('#game-down-first').children().length == 0){
        if($('#game-up-second').children().length == 0){
            $("#user-up-number").html(player1 - 3);
        }else{
            $("#user-up-number").html(player1 - 1);
        }
    }else{
        if($('#game-up-second').children().length == 0){
            $("#user-up-number").html(player1 - 4);
        }else{
            $("#user-up-number").html(player1 - 2);
        }
    }
}
/**
 * 出牌武将牌
 * @param cid
 */
function movePerson(cid){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'250px',
        left:'100px'
    },"slow");
    var audio = $(".voice-p");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){
        $("#"+cid).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
    }, 1000);
    $("#"+cid).attr("boolean","false");
    setTimeout(function(){ $("#"+cid).remove();
        pailie();
    }, 1500);
}

/**
 * 出牌军师牌
 * @param cid
 */
function movePerson0(cid){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'250px',
        left:'100px'
    },"slow");
    var audio = $(".voice-j");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){
        $("#"+cid).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
    }, 1000);
    $("#"+cid).attr("boolean","false");
    setTimeout(function(){ $("#"+cid).remove();
        pailie();
    }, 1500);
}
/**
 * 出牌玉玺牌
 * @param cid
 */
function moveYx(cid){
    $("#"+cid).css({height:'161.4px',weight:'114.9px'});
    $("#"+cid).addClass("no-click");
    $("#"+cid).animate({
        bottom:'250px',
        left:'100px'
    },"slow");
    var audio = $(".voice-y");
    var bj = audio[0];
    bj.play();
    setTimeout(function(){
        $("#"+cid).animate({
            bottom:'269.9px',
            left:'-470.734px'
        },"slow");
    }, 1000);
    $("#"+cid).attr("boolean","false");
    setTimeout(function(){ $("#"+cid).remove();
        pailie();
    }, 1500);
}
/**
 * 装备攻击牌
 * @param cid
 */
function moveAttack(cid){
    if($("#game-down-first").children().length > 0){
        /*删除*/
        $("#game-down-first").children("img").animate({
            height:'161.4px',
            weight:'114.9px',
            bottom:'212px',
            left:'0px'
        },"slow");
        $("#game-down-first").children("img").remove();
        /*添加*/
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+cid).animate({
            bottom:'1px',
            left:'-463.5px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-down-first").prepend($("#"+cid));
            $("#"+cid).css({left:'7px',bottom:'8px'});
            pailie();
        }, 1500);
    }else{
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+cid).animate({
            bottom:'1px',
            left:'-463.5px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-down-first").prepend($("#"+cid));
            $("#"+cid).css({left:'7px',bottom:'8px'});
            pailie();
        }, 1500);
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
            height:'161.4px',
            weight:'114.9px',
            bottom:'212px',
            left:'0px'
        },"slow");
        $("#game-down-second").children("img").remove();
        /*添加*/
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+cid).animate({
            bottom:'1px',
            left:'-332.4px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-down-second").prepend($("#"+cid));
            $("#"+cid).css({left:'7px',bottom:'8px'});
            pailie();
        }, 1500);
    }else{
        $("#"+cid).css({height:'161.4px',weight:'114.9px'});
        $("#"+cid).addClass("no-click");
        $("#"+cid).animate({
            bottom:'250px',
            left:'100px'
        },"slow");
        $("#"+cid).animate({
            bottom:'1px',
            left:'-332.4px'
        },"slow");
        var audio = $(".voice-z");
        var bj = audio[0];
        bj.play();
        $("#"+cid).attr("boolean","false");
        setTimeout(function(){ $("#game-down-second").prepend($("#"+cid));
            $("#"+cid).css({left:'7px',bottom:'8px'});
            pailie();
        }, 1500);
    }

}
$(function(){
    $("#game-play").bind("click",function(){
        for(var j=0;j<cardId.length;j++){
            if($("#"+cardId[j]).attr("boolean") === "true"){
                var ctype = $("#"+cardId[j]).attr("type");
                var cid = $("#"+cardId[j]).attr("id");
                var curl = $("#"+cardId[j]).attr("src");
                var cname = $("#"+cardId[j]).attr("name");
                /*测试发送*/
                /*var str = {"type":"play","id": cid,"url":curl,"name":cname};
                console.log(str);
                var sendMsg = JSON.stringify(str);
                onSend(sendMsg);*/

                switch (cname) {
                    case "JW0001":
                        moveDiwang(cardId[j]);
                        lose();
                        setTimeout(function(){
                            deleteOtherAttack();
                        }, 1500);
                        /**/
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JW0002":
                        moveDiwang(cardId[j]);
                        lose();
                        setTimeout(function(){
                            deleteOtherArmor();
                        }, 1500);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JW0003":
                        moveDiwang(cardId[j]);
                        if($('#game-down-first').children().length == 0){
                            $("#user-up-number").html(player1 - 2);
                        }else{
                            $("#user-up-number").html(player1 - 0);
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL001":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 5);
                            }else{
                                $("#user-up-number").html(num - 3);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL002":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL003":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL004":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 2);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 0);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 1);
                                lose();
                            }
                        }
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL005":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 5);
                            }else{
                                $("#user-up-number").html(num - 3);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL006":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 5);
                            }else{
                                $("#user-up-number").html(num - 3);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL007":
                        movePerson(cardId[j]);
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL008":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL009":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL010":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL011":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL012":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL013":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                            }else{
                                $("#user-up-number").html(num - 1);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 4);
                            }else{
                                $("#user-up-number").html(num - 2);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL014":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 2);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 0);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 1);
                                lose();
                            }
                        }
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL015":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 2);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 0);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 3);
                                lose();
                            }else{
                                $("#user-up-number").html(num - 1);
                                lose();
                            }
                        }
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JL016":
                        movePerson(cardId[j]);
                        var num = $("#user-up-number").html();
                        if($('#game-down-first').children().length == 0){
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 5);
                            }else{
                                $("#user-up-number").html(num - 3);
                            }
                        }else{
                            if($('#game-up-second').children().length == 0){
                                $("#user-up-number").html(num - 6);
                            }else{
                                $("#user-up-number").html(num - 4);
                            }
                        }
                        lose();
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "JS001":
                        movePerson0(cardId[j]);
                        nextcard();
                        break;
                    case "JS002":
                        movePerson0(cardId[j]);
                        break;
                    case "JS003":
                        movePerson0(cardId[j]);
                        $("#user-down-number").html(player0 + 1);
                        break;
                    case "JS004":
                        movePerson0(cardId[j]);
                        break;
                    case "JS005":
                        movePerson0(cardId[j]);
                        nextcard();
                        break;
                    case "JS006":
                        movePerson0(cardId[j]);
                        break;
                    case "JS007":
                        movePerson0(cardId[j]);
                        break;
                    case "JS008":
                        movePerson0(cardId[j]);
                        break;
                    case "JS009":
                        movePerson0(cardId[j]);
                        $("#user-up-number").html(player1 - 2);
                        lose();
                        break;
                    case "JS010":
                        movePerson0(cardId[j]);
                        $("#user-up-number").html(player1 - 2);
                        lose();
                        break;
                    case "WQ001":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ002":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ003":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ004":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ005":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ006":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ007":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ008":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ009":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ010":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ011":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ012":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ013":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ014":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ015":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ016":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "WQ017":
                        moveAttack(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "CC001":
                        moveArmor(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "CC002":
                        moveArmor(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "CC003":
                        moveArmor(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "CC004":
                        moveArmor(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "CC005":
                        moveArmor(cardId[j]);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                    case "YX001":
                        moveYx(cardId[j]);
                        /*var num = $("#user-up-number").html();*/
                        $("#user-down-number").html(player0 + 3);
                        var str = {"type":"play","id":cid,"name":cname,"url":curl};
                        var sendMsg = JSON.stringify(str);
                        onSend(sendMsg);
                        break;
                }
            }
        }
    })
});
/**
 * 点击结束回合
 */
$(function(){
    $("#game-end").mousedown(function(){
        $("#game-end").css('background','url(../image/png/game/btnEnd0.png) no-repeat');
        $("#game-end").css('background-size','100% 100%');
    });
    $("#game-end").mouseup(function(){
        $("#game-end").css('background','url(../image/png/game/btnEnd.png) no-repeat');
        $("#game-end").css('background-size','100% 100%');

        $('.down-status').attr('src','../image/png/game/ended.png');
        setTimeout(function(){ $('.down-status').css('display','none'); }, 1500);

        var str = {"type":"end","value":"true"};
        var sendMsg = JSON.stringify(str);
        onSend(sendMsg);
        $('#game-play').css('display','none');
        $('#game-cancel').css('display','none');
        $('#game-end').css('display','none');
    });
    /*$("#game-end").bind("click",function(){

    })*/
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

        var str = {"type":"over","value":"false"};
        var sendMsg = JSON.stringify(str);
        onSend(sendMsg);
    });
});






