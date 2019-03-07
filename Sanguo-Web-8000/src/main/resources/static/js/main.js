/**
 * 选择模式
 */
$(function(){
    $("#top-begin").bind("click",function(){
        $('.main-middle-two').css('display','block');
        $('#top-begin').html("房间");
    })
    $("#close-two").bind("click",function(){
        $('.main-middle-two').css('display','none');
        $('#top-begin').html("开始");
        $('input:radio[name="model"]').removeAttr('checked');
        console.log($('input:radio:checked').val());
    })
    $(".main-begin-game").bind("click",function(){
        console.log($('input:radio:checked').val());
    })
});
/**
 * 个人资料
 */
/*
$(function(){
    $(".main-choose").bind("click",function(this.i){
        $('#'+id).css('display','block');
    })
});*/
function choose(name) {
    $('.main-middle-two').css('display','none');
    $('.main-middle').css('display','none');
    $('#'+name).css('display','block');
}

/**
 * 下拉好友列表
 */
$(function(){
    $(".main-friend").bind("click",function(){
        if($('.main-right-bottom').attr("name") === "true"){
            $('.main-right-bottom').css('display','none');
            $('.main-right-bottom').attr("name","false");
        }else if($('.main-right-bottom').attr("name") === "false"){
            $('.main-right-bottom').css('display','block');
            $('.main-right-bottom').attr("name","true");
        }
    })
});