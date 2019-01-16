function removeClass() {
  $(util.getDom('nextBtn')).removeClass('next-btn-active');
}
function addClass() {
  $(util.getDom('nextBtn')).addClass('next-btn-active');
}

function unlock(mySwiper) {
  mySwiper.unlockSwipeToNext();  
}

function lock(mySwiper) {
  mySwiper.lockSwipeToNext();
}

function getLg() {
  return util.getParam('lg') || 'cn';
}

// 缓存每次答题的结果
(function(win) {
  // 缓存结果
  var cacheResultMap = {
    0:{'right': 0, 'wrong': {}}, 
    1:{'right': 0, 'wrong': {}}, 
    2:{'right': 0, 'wrong': {}}
  };
  win.cacheResult = {
    set: function(activeIndex, key, result) {
      if(key === 'right') {
        cacheResultMap[activeIndex][key] = result;
      } else {
        cacheResultMap[activeIndex][key][result] = result;
      }
     
    },
    get: function(activeIndex) {
      return  cacheResultMap[activeIndex];
    }
  }

})(window);