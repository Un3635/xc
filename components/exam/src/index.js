
window.onload = function () {
 
  var page = [undefined],
    clickIdxArr = [],
    clickIdx = -1,
    data = null,
    mySwiper = null;
    cons = [];
 	 var lgParam = getLg();
  // if(!getParam("token")) {
  //   YDUI.dialog.toast('请从APP中进行打开改链接', 'none', 1500);
  //   return;
  // }
  YDUI.dialog.loading.open(lgs.hints[lgParam][0]);
  $('#examCom').css({ width: window.innerWidth });
  list({'lg': util.getParam('lg') || 'cn'},function (res) {
    data = res.result;
    showWiper();
  })


  // 下一题点击
  $(util.getDom('nextBtn')).on('click', function () {
    var btnStr = $(util.getDom('nextBtn')).html();
    if (btnStr === lgs.nextBtn[lgParam][1] && $(util.getDom('nextBtn')).hasClass('next-btn-active')) {
      // 完成之后跳转链接
      YDUI.dialog.toast(lgs.hints[lgParam][1], 'success', 1500, function(){
       try{
        // window.webkit.messageHandlers.showSendMsg.postMessag.e(['success', '{code:0,ee:测试完成}']);
       var _json = {
         'callname': 'XCAnswerCenterController',
         'callid': '2018',
         'calldata': "calldata:{'callname': 'XCAnswerCenterController'}"
        }

        // window.webkit.messageHandlers.call.postMessage(JSON.stringify(_json)); 
        window.webkit.messageHandlers.call.postMessage(_json); 
       }catch(e) {

       }

        window.location.href = "/result";
          // linkUrl({state: 'success'}, function(res){
          //   console.log(res);
          // })
      });
      // finished({csrfToken:data.csrfToken, answers: clickIdxArr[0] + ',' + clickIdxArr[1] + ',' + clickIdxArr[2], token: getParam("token")},
      //   function(res) {
      //   // window.location.href = "/result?success=1&error=0";
      // }, function(){
      //   linkUrl({state: 'error'}, function(res){
      //     // console.log(res);
      //   })
      //   // window.location.href = "/result?success=0&error=1";
      // })
      return;
    }
    if ($(this).hasClass('next-btn-active')) {
      clickIdx = -1;
      nextBtnShow(mySwiper.activeIndex + 1);
      // btnShow(false, mySwiper.activeIndex + 1);
      mySwiper.slideTo(mySwiper.activeIndex + 1, 500, false);//切换到第一个slide，速度为1秒
      setTimeout(function (param) { 
        isLockSwipes(mySwiper.activeIndex);
        // console.log(mySwiper.activeIndex);
       }, 500);
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
    data.topics.forEach((function (item, examIndex) {
      var resultCon = $('<div>').addClass('exam-result');
      
      var con = $('<div>').addClass('swiper-slide').append(
        $('<div>').addClass('exam-content').html(item.title)
      ).append(resultCon);
      cons.push(con);
      showExam(resultCon, examIndex);
    }))
    $('#result').append(cons);
    YDUI.dialog.loading.close();

    setTimeout(function () {
      mySwiper = new Swiper('.swiper-container', {
        direction : 'horizontal',
        freeMode : false,
        onInit: function(swiper) {
          swiper.lockSwipeToNext();
        },
        onSlidePrevStart: function(swiper) {
          // console.log('left',swiper.activeIndex);
          isLockSwipes(swiper.activeIndex);
        },
        onSlideNextStart: function(swiper) {
          // right
          isLockSwipes(swiper.activeIndex);
          // console.log('right', swiper.activeIndex)
        },
        onTransitionStart: function (swiper) {
          // console.log('left',swiper.activeIndex)
          btnShow(swiper.activeIndex);
        },
        onSlideChangeEnd: function (swiper) {
          showCount(swiper.activeIndex + 1);
        }
      })
    }, 0);
  }

  // 首次加载的时候 锁住silder
  // 答案绘制
  function showExam(resultCon, examIndex) {
    var curData = data.topics[examIndex], lis = [];
    if(!curData.answers) return;

    // 回答正确
    var answerRight = function(dom) {
      $(dom).find('img').attr({ src: 'src/image/2x/right.png' });
      $(dom).find('div').addClass('chooseRight');
      $(dom).find('span').addClass('right');
      page[mySwiper.activeIndex] = true;
      clickIdxArr[mySwiper.activeIndex] = clickIdx+1;
      btnShow(mySwiper.activeIndex);
    }
    var answerWrong = function(dom) {
      page[mySwiper.activeIndex] = false;
      btnShow(mySwiper.activeIndex);
      // $(dom).find('img').attr({ src: 'src/image/2x/wrong.png' });
      $(dom).find('div').addClass('chooseWrong');
      $(dom).find('span').addClass('wrong');
    }
    curData.answers.forEach(function (item, idx) {
      var answersItem = $('<li>').addClass('exam-item').append(
        // $('<img>').attr({ src: 'src/image/2x/Oval.png', class: 'choose' })
        $('<div>').addClass('choose')
      ).append(
        $('<span>').attr({ class: 'answer' }).html(item.option)
      );
      new TouchEvent([answersItem[0]]).tap(function() {
        var dom = this;
        // 若重复点击，则不调用

        if (clickIdx === idx) return;
        // 将之前的选择进行 重置
        resetChoose(lis);
        clickIdx = idx;
        // 选择判断
        // 缓存中存在正确答案, 直接判断
        if(cacheResult.get(mySwiper.activeIndex).right) {
          if(Number(cacheResult.get(mySwiper.activeIndex).right) === item.index) {
            answerRight(dom);
          } else {
            answerWrong(dom)
          }
          return;
        } else {
          if(Number(cacheResult.get(mySwiper.activeIndex)['wrong'][item.index])) {
            answerWrong(dom);
            return;
          }
        }
        validation(mySwiper.activeIndex, { csrfToken: data.csrfToken, answer: item.index }, function (res) {
          // 回答正确
          answerRight(dom);
          cacheResult.set(mySwiper.activeIndex, 'right', item.index);
          // cacheResult.set[mySwiper.activeIndex][item.index] = 1;
         
        }, function (res) {
          // 回答错误
          cacheResult.set(mySwiper.activeIndex, 'wrong', item.index);
          answerWrong(dom);
        })
      })
      lis.push(answersItem);
    }
  );
    resultCon.append(lis);
  }


  // 同题的时候，对选项进行重置
  function resetChoose(lis) {
    var remove = function(dom) {
      dom.find('div').removeClass('chooseRight');
      dom.find('div').removeClass('chooseWrong');
      dom.find('span').removeClass('wrong');
      dom.find('span').removeClass('right');
    }
    if (clickIdx === 1000) {
      lis.forEach(function (dom) {
        // item.find('img').attr({ src: 'src/image/2x/Oval.png' });
        remove(dom);
      })
      return;
    }
    if (clickIdx > -1) {
      // dom.find('img').attr({ src: 'src/image/2x/Oval.png' });
      remove(lis[clickIdx])
    }
  }

  // 判断是否锁屏
  function isLockSwipes(activeIndex){
    // console.log(page[activeIndex], activeIndex, page)
    if (page[activeIndex]) {
      unlock(mySwiper);
      // mySwiper.unlockSwipeToNext();
    } else {
      // console.log('activeIndex', activeIndex)
      lock(mySwiper);
      // mySwiper.lockSwipeToNext();
    }
  }
  function nextBtnShow(activeIndex) {
    if (page[activeIndex]) {
      addClass();
    } else {
     removeClass();
    }
  }

  function btnShow(activeIndex, T) {
    var  btnStr = $(util.getDom('nextBtn')).html();
    var _btnStr_ = lgs.nextBtn[lgParam][1];
    if (page[activeIndex]) {
      addClass();
      unlock(mySwiper);
    } else {
      removeClass();
      lock(mySwiper);
      if (typeof page[activeIndex] !== 'boolean')
        page[activeIndex] = undefined;
    }
    if (page.length === 3) {
      var T = true;
      page.forEach(function (TAG) {
        if (btnStr === _btnStr_ && !TAG) {
          removeClass();
        }
        if (typeof TAG !== 'boolean') T = false;
      })
      if(T && btnStr !== _btnStr_) {
        $(util.getDom('nextBtn')).html(_btnStr_);
      }
    }
  }

}
