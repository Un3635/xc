$(function(){

    $('#nav-select').click(function(){
        if($(this).prop('checked')){
            $('body').addClass('noscroll')
        }else{
            $('body').removeClass('noscroll')
        }
    })

    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        spaceBetween: 50,
        slidesPerView: 1,
        loop:true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
})