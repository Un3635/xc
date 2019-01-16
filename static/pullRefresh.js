(function(win) {
  win.pullLoaded = function(cb, page) {
    var mySwiper = new Swiper('.swiper-container',{
      direction: 'vertical',
      scrollbar: '.swiper-scrollbar',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true,
      onTouchMove: function(swiper){		//手动滑动中触发
        // var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
        // var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
        // if(mySwiper.translate < 50 && mySwiper.translate > 0) {
        //   $(".init-loading").html('下拉刷新...').show();
        // }else if(mySwiper.translate > 50 ){
        //   $(".init-loading").html('释放刷新...').show();
        // }
      },
      onTouchEnd: function(swiper) {
        var wrapperCon = document.getElementsByClassName('swiper-wrapper')[0];
        var slideCon = document.getElementsByClassName('swiper-slide')[0];
        
        var _viewHeight = wrapperCon.offsetHeight;
        var _contentHeight = slideCon.offsetHeight;
          // 上拉加载
        if(mySwiper.translate <= _viewHeight - _contentHeight -70 && mySwiper.translate < 0) {
          cb(++page, function() {
            $("#loadtip").html('正在加载');
          }, function(res) {
            // console.log(res)
            if(res) {
              $("#loadtip").html('上拉加载更多');
            } else {
              $("#loadtip").html('没有更多啦！');
            }
            mySwiper.update(); // 重新计算高度;
          })
        }else {
          ;
        }
      }
    });
    return this;
  }
})(window);