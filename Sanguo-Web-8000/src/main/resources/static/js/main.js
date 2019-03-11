/**
 * 页面初始化接受数据
 */
$(function(){
    $.ajax({
        type: "POST",
        url:  "/initMainPage",
        data: {"user":"test"},
        dataType: "json",
        success:function(data){
            /**
             * 获取返回值是对象的josn数据内容
             */
            /**
             * 用户头像,名称
             * @type {string}
             */
            var img0 = data.headImg;
            $('.img-head').attr('src',img0);
            var name0 = data.userInfo.userName;
            $('.user-name').html(name0);
            /**
             * 好友信息（头像，名称）
             */
            for(var i=0;i<data.user_friends.length;i++){
                var img1 = data.user_friends[i].img;
                var name1= data.user_friends[i].names;
                $('.main-right-bottom').append("<div id='"+ i +"' style=\"position:absolute;width:100%;height:30px;left:5%;top:"+ (i*50+10) +"px;border-bottom:2px solid #fff\"\"/>")
                $('#'+i).append("<img style=\"position:absolute;width:30px;height:100%\" id='user"+ i +"' src='"+ img1 +"'/>");
                $('#'+i).append("<span style=\"position:absolute;left: 20%;color:#ffffff\">"+ name1 +"</span>");
            }
            /**
             * div轮播图url（5 张，每张包含一个链接url）
             */
            $('#div1').attr('src',data.playImg[0]);
            $('#div2').attr('src',data.playImg[1]);
            $('#div3').attr('src',data.playImg[2]);
            $('#div4').attr('src',data.playImg[3]);
            $('#div5').attr('src',data.playImg[4]);
            /**
             * 公告（4 条）
             */
            $('#s1').html(data.msg[0]);
            $('#s2').html(data.msg[1]);
            $('#s3').html(data.msg[2]);
            $('#s4').html(data.msg[3]);
        },
        error:function () {
            console.log("failed");
        }
    });

});
/**
 * div轮播图
 * @param id  传入元素的id
 * @returns {HTMLElement | null}  返回标签对象，方便获取元素
 */
$(function(){
    function my$(id) {
        return document.getElementById(id);
    }

    var box=my$("box");
    var inner=box.children[0];
    var ulObj=inner.children[0];
    var list=ulObj.children;
    var arr=my$("arr");
    var imgWidth=inner.offsetWidth;
    var right=my$("right");
    var pic=0;

    ulObj.appendChild(ulObj.children[0].cloneNode(true));

    var timeId=setInterval(onmouseclickHandle,3000);
    box.onmouseover=function () {
        arr.style.display="block";
        clearInterval(timeId);
    };
    box.onmouseout=function () {
        arr.style.display="none";
        timeId=setInterval(onmouseclickHandle,3000);
    };

    right.onclick=onmouseclickHandle;
    function onmouseclickHandle() {
        if (pic == list.length - 1) {
            pic = 0;
            ulObj.style.left = 0 + "px";
        }
        pic++;
        animate(ulObj, -pic * imgWidth);
    }
    left.onclick=function () {
        if (pic==0){
            pic=list.length-1;
            ulObj.style.left=-pic*imgWidth+"px";
        }
        pic--;
        animate(ulObj,-pic*imgWidth);
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
$(function(){
    $("#top-begin").bind("click",function(){
        $('.main-middle-two').css('display','block');
        $('#top-begin').html("房间");
    })
    $("#close-two").bind("click",function(){
        $("#main-model-left").removeAttr("checked");
        $("#main-model-right").removeAttr("checked");
        $('.main-middle-two').css('display','none');
        $('#top-begin').html("开始");
        console.log($('input:radio:checked').val());
        /*$('input:radio[name="model"]').removeAttr('checked');*/
        /* $("#main-model-left").removeAttr("checked");*/
    })
    $(".main-begin-game").bind("click",function(){
        console.log($('input:radio:checked').val());
    })
});
/**
 * 首页模式选择
 */
$(function(){
    $("#btn-match").bind("click",function(){
        $("#main-model-right").removeAttr("checked");
        $('.main-middle-two').css('display','block');
        $('#top-begin').html("房间");
        $('#main-model-left').attr("checked","checked");
        console.log($('input:radio:checked').val());
    })
    $("#btn-story").bind("click",function(){
        $("#main-model-left").removeAttr("checked");
        $('.main-middle-two').css('display','block');
        $('#top-begin').html("房间");
        $('#main-model-right').attr("checked","checked");
        console.log($('input:radio:checked').val());
    })

});
/**
 * 右侧用户栏
 */

$(function(){
    /*判断在线离线*/
    if(window.navigator.onLine === true) {
        $('.main-line').attr("src","../image/png/main/mainOnline%20.png");
        $('.main-line-msg').html("在线");
    }else {
        $('.main-line').attr("src","../image/png/main/mainOffline%20.png");
        $('.main-line-msg').html("离线");
    }
    window.addEventListener("online", online, false);
    window.addEventListener("offline", offline, false);
    function online() {
        $('.main-line').attr("src","../image/png/main/mainOnline%20.png");
        $('.main-line-msg').html("在线");
    }
    function offline() {
        $('.main-line').attr("src","../image/png/main/mainOffline%20.png");
        $('.main-line-msg').html("离线");
    }
});
/**
 * 导航选择
 * @param name
 */
function choose(name) {
    $('.main-middle-two').css('display','none');
    $('.main-middle').css('display','none');
    $('#'+name).css('display','block');
}

/**
 * 下拉好友列表
 */
$(function(){
    $(".main-friend-open").bind("click",function(){
        if($('.main-right-bottom').attr("name") === "true"){
            $(".main-friend-open").html("展开好友列表");
            $(".main-right-bottom").slideToggle("slow");
            /*$('.main-right-bottom').css('display','none');*/
            $('.main-right-bottom').attr("name","false");
        }else if($('.main-right-bottom').attr("name") === "false"){
            $(".main-friend-open").html("收起好友列表");
            $(".main-right-bottom").slideToggle("slow");
           /* $('.main-right-bottom').css('display','block');*/
            $('.main-right-bottom').attr("name","true");
        }
    })
});

/**
 * 关于我们
 */
$(function(){
    $("#main-us").bind("click",function(){
        $('#main-middle-us').css('display','block');
    })
    $(".btn-us").bind("click",function(){
        $('#main-middle-us').css('display','none');
    })
});
/**
 * 设置弹出框
 */
$(function(){
    $("#main-set").bind("click",function(){
        $('.main-set-page').css('display','block');
    })
    $(".btn-close-set").bind("click",function(){
        $('.main-set-page').css('display','none');
    })
});
/**
 * 消息弹出框
 */
$(function(){
    $("#main-msg").bind("click",function(){
        $('.main-set-page').css('display','block');
    })
    $(".btn-close-set").bind("click",function(){
        $('.main-set-page').css('display','none');
    })
});
