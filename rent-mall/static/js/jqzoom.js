(function ($) {
  $.fn.extend({
    bigView:function(obj, imgSrc){
      obj.children('.big_view').css({background:"url("+imgSrc+")"})
      obj.children(0).mousemove(function(e) {
        obj.children(0).children(1).show();
        obj.children(1).show();
        var bW = obj.children(0).width();
        var bH = obj.children(0).height();
        var sW = obj.children(0).children('.img_view').width();
        var sH = obj.children(0).children('.img_view').height();
        var offset = $(this).offset();
        var offsetX = (e.pageX - offset.left);
        var offsetY = (e.pageY - offset.top);
        if(offsetX>bW-sW/2){offsetX=bW-sW/2};
        if(offsetX<sW/2){offsetX=sW/2};
        if(offsetY>bH - sH/2){offsetY=bH - sH/2};
        if(offsetY<sH/2){offsetY=sH/2}
        obj.children(0).children(1).css({left:offsetX-sH/2,top:offsetY-sH/2})
        obj.children('.big_view').css({backgroundPosition:(-offsetX*2+bH/2)+"px "+(-offsetY*2+bH/2)+"px",backgroundRepeat:"no-repeat"})
        obj.children('.big_view').css({backgroundColor:'#fff'});
      });
      obj.children(0).mouseleave(function(){
        obj.children(0).children(".img_view").hide();
        obj.children(".big_view").hide();
      })
    }
  })
})(jQuery);
