$(function () { //成果展示处卡片轮播
    var cardW = 198;
    var len = $('.card-wrap .card-box li').length;
    $('.card-box').width((cardW + 30) * (len + 2));
    var count = 0;


    $('.arrow-right').click(function () {
        if(count===0){
            count++;
            $('.card-wrap .card-box').stop().animate({left: -count * 198 +120}, 800);
            $('.arrow-right').addClass('active').siblings().removeClass('active');
        }
        if (count>0 && count < len - 2) {
            count++;
            $('.card-wrap .card-box').stop().animate({left: -count * 210 }, 800);
            $('.arrow-right').addClass('active').siblings().removeClass('active');
        }
    })

    $('.arrow-left').click(function () {
        if(count === len - 2){
            count--;
            $('.card-wrap .card-box').stop().animate({left: -count * (cardW)}, 800);
            $('.arrow-left').addClass('active').siblings().removeClass('active');
        }
        if (count > 0 && count < len - 2) {
            count--;
            $('.card-wrap .card-box').stop().animate({left: -count * (cardW + 30)}, 800);
            $('.arrow-left').addClass('active').siblings().removeClass('active');
        }
    })
    mouseHandle('.arrow-left');
    mouseHandle('.arrow-right');
    function mouseHandle(obj){
        $(obj).mouseover(function(){
            $(obj).addClass('active').siblings().removeClass('active');
        }).mouseout(function(){
            // $(obj).removeClass('active');
        });
    }
})

//手风琴效果
$(function () {
    if ($(window).width() < 918) {
        accordWap();
    } else {
        accordPC();
    }
    function accordPC() {
        var rightDis=$(window).width()*0.3;
        var listWidth=2210-$(window).width()+rightDis;
        $(window).scroll(function () {
            if ($(document).scrollTop() > 2300) {
                $('#accord-list').stop().animate({right: -listWidth}, 600, function () {
                    choosePic();
                })
            }
        })
        function choosePic() {
            $('.accordion-item').click(function () {
                $('.accordion-item').removeClass('accordion-active');
                $(this).addClass('accordion-active');
                $('.accord-bg').removeClass('change');
                $('.accord-bg').eq($(this).index()).addClass('change');
                if ($(this).index() === 0) {
                    $('#accord-list').stop().animate({right: -listWidth}, 300)
                } else if ($(this).index() === 1) {
                    $('#accord-list').stop().animate({right: -700}, 300)
                } else if ($(this).index() === 2) {
                    $('#accord-list').stop().animate({right: -400}, 300)
                } else if ($(this).index() === 3) {
                    $('#accord-list').stop().animate({right: -100}, 300)
                } else {
                    $('#accord-list').stop().animate({right: 0}, 300)
                }
            })
        }
    };
    function accordWap() {
        $(document).scroll(function () {
            if ($(document).scrollTop() > 2000) {
                $('#accord-list-wap').stop().animate({left: 0}, 600, function () {
                    chooseWapPic();
                })
            }
        })
        function chooseWapPic() {
            var onRight=true;
            $('.accordion-item').click(function () {
                var PicWidth=parseInt($('.accordion-item').css('width'))*5/8;
                $('.accordion-item').removeClass('accordion-active');
                $(this).addClass('accordion-active');
                $('.m-accord-bg').removeClass('change');
                $('.m-accord-bg').eq($(this).index()).addClass('change');
                if(onRight){
                    if ($(this).index()<4) {
                        $('#accord-list-wap').stop().animate({left:-$(this).index()*PicWidth}, 600)
                    }else{
                        $('#accord-list-wap').stop().animate({left:-$(this).index()*PicWidth+125}, 600 )
                        onRight=false;
                    }
                }else{
                    if ($(this).index()>0 && $(this).index()<4) {
                        $('#accord-list-wap').stop().animate({left:-($(this).index()-1)*PicWidth-125}, 600)
                    }else if($(this).index()===4){
                        $('#accord-list-wap').stop().animate({left:-$(this).index()*PicWidth+125}, 600)
                    } else{
                        $('#accord-list-wap').stop().animate({left:0}, 600 )
                        onRight=true;
                    }
                }
            })
        }
    }
})