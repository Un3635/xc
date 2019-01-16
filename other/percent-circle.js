/**
 * 非闭合环形渐变进度条
 */
let percentCircle = function (domId, option) {
  let defaultOption = {
    colorArr: ['#1092FF', '#99ddff'],
    linewidth: 15,
    colorBg: '#eeeeee',
    r: 120,
    startPoint: Math.PI * 0.73,
    targetPersent: 0,
    point: {
      show: false,
      color: '#ffffff'
    }
  };
  Utils.extend(defaultOption, option);
  this.options = defaultOption;
  let c = document.getElementById(domId);
  if (c==null) {
    return
  }
  this.ctx = c.getContext('2d');
  this.beginPersent = 0;
  this.targetPersent = this.options.targetPersent;
  this.exec = false;
  let Cwidth = this.options.r + this.options.linewidth;
  let Cheight = this.options.r + this.options.linewidth;
  c.width = Cwidth * 2;
  c.height = Cheight * 2;

  c.style.width = Cheight + 'px';
  c.style.height = Cheight + 'px';

  this.width = c.width;
  this.height = c.height;

  let rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };

  let that = this;
  function step() {
    if (that.exec) {
      if (that.beginPersent < that.targetPersent) {
        that.beginPersent += 0.02;
      }
    }
    that.draw();
    rAF(step);
  }
  step();
};
percentCircle.prototype.draw = function () {
  let that = this;
  this.ctx.clearRect(0, 0, this.width, this.height);

  let r = this.options.r;
  this.ctx.lineWidth = this.options.linewidth;
  /**
   * 灰色底圆
   */
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.lineCap = 'round';
  this.ctx.strokeStyle = this.options.colorBg;
  this.ctx.arc(this.width / 2, r + that.options.linewidth, r, that.options.startPoint, Math.PI - this.options.startPoint, false);
  this.ctx.stroke();
  this.ctx.restore();
  /**
   * 绘制文案
   */
  // this.ctx.font = 'bold 80px 黑体';
  // this.ctx.fillStyle = '#1092ff';
  // this.ctx.fillText(this.options.value, this.width / 2 - 60, r);
  // this.ctx.font = 'bold 32px 黑体';
  // this.ctx.fillStyle = 'white';
  // this.ctx.fillText(this.options.text, this.width / 2 - 62, r + 80);
  /**
   * 计算渐变色的中间色值
   */
  function insert(str) {
    return str.slice(0, 2) + ',' + str.slice(2, 4) + ',' + str.slice(4, 6);
  }
  function convert(color) {
    let color1Arr = color.substring(1, color.length);
    let newColor1 = insert(color1Arr).split(',');
    let newColor1new = [];

    newColor1.forEach(function (item, index) {
      newColor1new.push(parseInt(item, 16));
    });

    return newColor1new;
  }
  function pickHex(color1, color2) {
    let newColor1 = convert(color1);
    let newColor2 = convert(color2);

    let newAll = [];
    for (let i = 0; i < newColor1.length; i++) {
      if (newColor1[i] + newColor2[i]) {
        newAll.push(parseInt((newColor1[i] + newColor2[i]) / 2));
      } else {
        newAll.push(0);
      }
    }
    let newColorAll = [];
    newAll.forEach(function (item, index) {
      if (item < 10) {
        item = '0' + item;
      }
      newColorAll.push(item.toString(16));
    });

    return '#' + newColorAll.join('');
  }

  let minColor = pickHex(that.options.colorArr[0], that.options.colorArr[1]);
  /**
   * 左半部分
   */
  this.ctx.save();
  let myGradient = this.ctx.createLinearGradient(0, this.height, 0, this.height / 2 + 30 - r);
  myGradient.addColorStop(0, that.options.colorArr[0]);
  myGradient.addColorStop(1, minColor);
  this.ctx.strokeStyle = myGradient;
  this.ctx.lineCap = 'round';
  let leftCircle = -0.5;
  if (this.beginPersent < 0.5) {
    leftCircle = (2 - (that.options.startPoint / Math.PI - 0.5) * 2) * this.beginPersent - (2 - that.options.startPoint / Math.PI);
  }

  this.ctx.beginPath();
  this.ctx.arc(this.width / 2, r + that.options.linewidth, r, that.options.startPoint, leftCircle * Math.PI, false);
  this.ctx.stroke();
  this.ctx.restore();
  /**
   * 右部分
   */
  if (this.beginPersent > 0.5) {
    let myGradient2 = this.ctx.createLinearGradient(this.width / 2, this.height, this.width / 2, this.height / 2 + 30 - r);
    myGradient2.addColorStop(0, that.options.colorArr[1]);
    myGradient2.addColorStop(1, minColor);
    this.ctx.save();
    this.ctx.strokeStyle = myGradient2;
    this.ctx.lineCap = 'round';
    leftCircle = (this.beginPersent - 0.5) * (2 - (that.options.startPoint / Math.PI - 0.5) * 2) - 0.5;
    this.ctx.beginPath();

    this.ctx.arc(this.width / 2, r + that.options.linewidth, r, -0.5 * Math.PI, leftCircle * Math.PI, false);
    this.ctx.stroke();
    this.ctx.restore();
  }
};

percentCircle.prototype.execAnimation = function () {
  this.exec = true;
};

/**
 * 工具类
 */
let Utils = (function () {
  let _utils = {};
  _utils.extend = function (target, obj) {
    for (let i in obj) {
      target[i] = obj[i];
    }
    return target;
  };
  return _utils;
})();

export default percentCircle;
