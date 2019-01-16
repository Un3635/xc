

window.onload = function() {
  var page = [],
      slides = [],
      clickIdx = -1;
      data = null,
      mySwiper = null;
  YDUI.dialog.loading.open('加载中');
  $('#examCom').css({width: window.innerWidth});
  list(function(res) {
    data = res.result;
    showWiper();
  })
  
  
  // 下一题点击
  $('#nextBtn').on('click', function() {
    if(mySwiper.activeIndex === 2) {
      // 完成之后跳转链接

      return;
    }
    if($(this).hasClass('next-btn-active')) {
      clickIdx  = -1;
      btnShow(false, mySwiper.activeIndex + 1);
      mySwiper.slideTo(mySwiper.activeIndex + 1, 500, false);//切换到第一个slide，速度为1秒
      showCount(mySwiper.activeIndex + 1)
    }
  })
  // count 的显示 
  function showCount(C) {
    $('#count').html(C);
    // 切换题目的时候，重置参数
    clickIdx = 1000;
  }
  // 题目的绘制
  function showWiper() {
    var cons = [];
    
    data.topics.forEach((function(item, examIndex) {
      var resultCon = $('<div>').addClass('exam-result');
      var con = $('<div>').addClass('swiper-slide').append(
        $('<div>').addClass('exam-content').html(item.title)
      ).append(resultCon);
      cons.push(con);
      showExam(resultCon, examIndex);
    }))
    $('#result').append(cons);
    YDUI.dialog.loading.close();
    // alert( window.innerWidth)

    mySwiper = new Swiper('.swiper-container', {
      onTransitionStart: function(swiper) {
        btnShow(swiper.activeIndex);
      },
      onSlideChangeEnd: function(swiper) {
        showCount(swiper.activeIndex + 1);
      }
    })
  }
  // 答案绘制
  function showExam(resultCon, examIndex) {
    var curData = data.topics[examIndex], lis = [];

    curData.answers.forEach(function(item, idx){
      var answersItem = $('<li>').addClass('exam-item').append(
        $('<img>').attr({src: 'src/image/2x/Oval.png', class: 'choose'})
      ).append(
        $('<span>').attr({class: 'answer'}).html(item.option)
      ).on('click', function() {
        var dom = this;
        // 若重复点击，则不调用
       
        if(clickIdx === idx) return;
        // 将之前的选择进行 重置
        resetChoose(lis);
        clickIdx = idx;
        // 选择判断
        validation(mySwiper.activeIndex, {csrfToken: data.csrfToken, answer: item.index},function(res){

          $(dom).find('img').attr({src: 'src/image/2x/right.png'});
          $(dom).find('span').addClass('right');
          page[mySwiper.activeIndex] = true;
          btnShow(mySwiper.activeIndex);
        }, function(res) { // 回答错误
          page[mySwiper.activeIndex] = false;
          btnShow(mySwiper.activeIndex);
          $(dom).find('img').attr({src: 'src/image/2x/wrong.png'});
          $(dom).find('span').addClass('wrong');
        })
      })
      lis.push(answersItem);
    });
    resultCon.append(lis);
  }


  // 同题的时候，对选项进行重置
  function resetChoose(lis) {
    if(clickIdx === 1000) {
      lis.forEach(function(item) {
        item.find('img').attr({src: 'src/image/2x/Oval.png'});
        item.find('span').removeClass('wrong');
        item.find('span').removeClass('right');
      })
      return;
    }
    if(clickIdx > -1) {
      var dom = lis[clickIdx];
      dom.find('img').attr({src: 'src/image/2x/Oval.png'});
      dom.find('span').removeClass('wrong');
      dom.find('span').removeClass('right');
    }
  }
  
  function btnShow(activeIndex, T) {
    // if(page[activeIndex])
    // page[activeIndex] = T || false;
    if (page[activeIndex]) {
      $('#nextBtn').addClass('next-btn-active');
      if(page.length === 3) {
        var T = true;
        page.forEach(function(TAG){
          if(!TAG) $('#nextBtn').removeClass('next-btn-active');
          console.log(typeof TAG);
          if(typeof TAG !== 'boolean') T = false;
        })
        if(T) {
          $('#nextBtn').html('完成');
        }
      }
     
    }else {
      $('#nextBtn').removeClass('next-btn-active');
      if( typeof page[activeIndex] !== 'boolean')
        page[activeIndex] = undefined;
    }
  }

}
