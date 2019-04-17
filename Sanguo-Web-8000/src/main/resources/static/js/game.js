/**
 * 聊天室按钮
 */
$(function(){
    $("#person-talk-btn").bind("click",function(){
        $('#talk-middle-person').css('display','block');
        $('#talk-middle-world').css('display','none');
        $("#person-talk-btn").css('background','url(../image/png/game/gamePersonTalk.png) no-repeat');
        $("#person-talk-btn").css('background-size','100% 100%');
        $("#world-talk-btn").css('background','url(../image/png/game/gameWorldTalkOff.png) no-repeat');
        $("#world-talk-btn").css('background-size','100% 100%');
    })
    $("#world-talk-btn").bind("click",function(){
        $('#talk-middle-person').css('display','none');
        $('#talk-middle-world').css('display','block');
        $("#person-talk-btn").css('background','url(../image/png/game/gamePersonTalkOff.png) no-repeat');
        $("#person-talk-btn").css('background-size','100% 100%');
        $("#world-talk-btn").css('background','url(../image/png/game/gameWorldTalk.png) no-repeat');
        $("#world-talk-btn").css('background-size','100% 100%');
    })
    /*$("#send-talk-btn").bind("click",function(){
        var word = $("input[name='talk-input']").val();
        /!*var msg ={"msg" : word };*!/
        /!*var sendMsg = JSON.stringify(word);*!/
        console.log(word);
    })*/
});
/**
 * 卡牌区按钮
 */
$(function(){
    /**
     * 准备
     */
    /*$("#game-ready").mousedown(function(){
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
            console.log($('#game-ready').attr("name"));
        }else{
            $("#game-ready").css('background','url(../image/png/game/gameReadyBtn0.png) no-repeat');
            $("#game-ready").css('background-size','100% 100%');
            $('#game-ready').attr("name","false");
            console.log($('#game-ready').attr("name"));
        }
    });*/
    /**
     * 出牌
     */
    $("#game-play").bind("click",function(){

    })
    $("#game-play").mousedown(function(){
        $("#game-play").css('background','url(../image/png/game/gamePlayBtn.png) no-repeat');
        $("#game-play").css('background-size','100% 100%');
    });
    $("#game-play").mouseup(function(){
        $("#game-play").css('background','url(../image/png/game/gamePlayBtn0.png) no-repeat');
        $("#game-play").css('background-size','100% 100%');
    });
    /**
     * 取消
     */
    /*$("#game-cancel").mousedown(function(){
        $("#game-cancel").css('background','url(../image/png/game/gameNoBtn.png) no-repeat');
        $("#game-cancel").css('background-size','100% 100%');
    });
    $("#game-cancel").mouseup(function(){
        $("#game-cancel").css('background','url(../image/png/game/gameNoBtn0.png) no-repeat');
        $("#game-cancel").css('background-size','100% 100%');
    });*/
});