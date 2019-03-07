/**
 *声音
 */
$(document).ready(function(){
    $("#voice").bind("click",function(){
        if($("#voice-one").attr('name') === 'true'){
            $('#voice').attr('src','../image/png/login/closed.png');
            $("#voice-one").attr('name','false');
            $('#voice-one').pause();
            $('#voice-one').load();
        }else if($('#voice-one').attr('name') === 'false'){
            $('#voice').attr('src','../image/png/login/open.png');
            $("#voice-one").attr('name','true');
            $('#voice-one').play();
        }
    })
    $("#voice").mouseenter(function(){
        $('#voice').attr('src','../image/png/login/closing.png');
    });
    $("#voice").mouseleave(function(){
        if($('#voice-one').attr('name') === 'true'){
            $('#voice').attr('src','../image/png/login/open.png');
        }else if($('#voice-one').attr('name') === 'false'){
            $('#voice').attr('src','../image/png/login/closed.png');
        }
    });
});
/**
 *注册
 */
$(function(){
    $("#left-reg-button").bind("click",function(){
        $('#register').css('display','block');
    })
    $("#close-reg").bind("click",function(){
        $('#register').css('display','none');
    })
});
$(document).ready(function(){
    $("#reg-button").bind("click",function(){
        /**
         * 目前输入字段还未做限制条件
         * @type {*|jQuery}
         */
        /**
         * result可返回/不返回
         * 参数 ： from表单
         */
        $.ajax({
            type: "POST",
            url:  "",
            data: $('#reg-form').serialize(),
            dataType: "json",
            success:function(){
                /**
                 * 注册成功/失败未渲染
                 */
                console.log("register success");
                $('#register').css('display','none');
            },
            error:function () {
                console.log("failed");
            }
        });
    })
});
/**
 *登录
 */
$(document).ready(function(){
    $("#login-button").bind("click",function(){
        /**
         * 两种
         * (post):url;参数
         */
        /*$.post("",
            {
                user : user,
                pass : pass
            },
            function(data,status){
                alert("数据：" + data + "\n状态：" + status);
            });*/
        /**
         * 问题：result 返回session或者id 作为跳转main页面url其中参数？？
         * 参数 ： user,pass
         */
        $.ajax({
            type: "POST",
            url: "/login",
            data: $('#login-form').serialize(),
            dataType: "json",
            success:function(){
                window.location.href = "#";
            },
            error:function () {
                /**
                 * 登录失败未渲染
                 */
                console.log("failed");
            }
        });
    })
});