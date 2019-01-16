<template>
  <div class="shopping_car">
    <div class="levelModel">
      <div class="levelBar">
        <ul>
          <router-link to="/">
            <li style="padding: 0">首页</li>
          </router-link>
          <li>&gt;</li>
          <li class="current">购物车</li>
        </ul>
      </div>
    </div>
    <div class="container" style="overflow: hidden;">
      <div class="table" style="margin-top: 12px;">
        <div class="title">
          <div class="head"></div>
          <div class="head">商品信息</div>
          <div class="head">租赁方式</div>
          <div class="head">数量</div>
          <div class="head">租期</div>
          <div class="head">押金／台</div>
          <div class="head">租金／月</div>
          <div class="head">操作</div>
        </div>

        <div class="con clear" v-for="(item,$index,key) in cartarr" :key="item.cartid">
          <div class="text">
              <span class="select_img" :class="{active: item.select}"
                    @click="sonChoose(item,$index)"></span>
            <!--<span class="select_img"><img src="../assets/images/no_selected.png" alt=""></span>-->
          </div>
          <div class="text">
            <div class="fl">
              <img v-if="item.url != null && item.url !='' && item.url != 'undefined'" v-cloak :src=item.url
                   :alt=item.goodsName>
              <img src="../assets/images/m_default_cart.png" alt="小虫快租" v-else>
            </div>
            <div class="fl fr_text">
              <span class="warp_title">{{item.goodsName}}</span><br>
              <span class="warp_con">{{item.skuName}}</span>
            </div>
          </div>
          <div class="text">
            <span class="texts">{{item.leasehold.leaseholdTypeValue}}</span>
            <!--<span class="img"><img src="../assets/images/m_why.png" alt=""></span>-->
            <el-tooltip placement="bottom" v-if="hintTextFlag" v-cloak>
              <div slot="content">{{leaseholdTypeName}}</div>
              <span class="img right_img" v-on:mouseenter="getHintText(item.leasehold.leaseholdTypeName)"><img
                src="../assets/images/m_why.png" alt=""></span>
            </el-tooltip>
            <span class="img right_img" v-else><img
              src="../assets/images/m_why.png" alt=""></span>
          </div>
          <div class="text">
            <div class="num_box">
              <a href="javascript:;" class="fl" @click="reduceNumber(item,item.cartid,$index)">-</a>
              <a href="javascript:;" class="fr" @click="addNumber(item,item.cartid,$index)">+</a>
              <input type="text" class="num_inpt" v-model="item.count" @input="changeNum(item,item.cartid,$index)">
            </div>
          </div>
          <div class="text">
            {{item.leasehold.tenancyTermValue}}个月
          </div>
          <div class="text">
            {{item.deposit}}元
          </div>
          <div class="text">
            {{item.leasehold.monthRent}}元
          </div>
          <div class="text">
            <span class="del_img" :id="'delThisOrder'+$index" @click="delThisInfo('delModal','smallModal',$index)"><img
              src="../assets/images/m_del.png" alt=""></span>

            <div class="m_modal" :id="'delModal'+$index">
              <div class="modal" :id="'smallModal'+$index">
                <div class="head">
                  <h1>删除商品</h1>
                  <div class="close_con" @click="closemodal('delModal'+$index,'smallModal'+$index)">
                    <img src="../assets/images/icon_close.png" alt="">
                  </div>
                </div>
                <div class="body" style="text-align: left;">
                  确认要从购物车删除此商品？
                </div>
                <div class="footer">
                  <el-button style="width: 96px;height: 36px;line-height: 0;"
                             @click="closemodal('delModal'+$index,'smallModal'+$index)">取消
                  </el-button>
                  <el-button type="success" style="width: 96px;height: 36px;line-height: 0;margin-right: 20px"
                             @click="submitDelInfo('delModal','smallModal',item.cartid,$index)">确定
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="con clear loserCon" v-for="(loser,$lose,key) in loseCarts" :key="loser.cartid">
          <div class="text">
            <span class="select_img"></span>
            <!--<span class="select_img"><img src="../assets/images/no_selected.png" alt=""></span>-->
          </div>
          <div class="text">
            <div class="orangeShade">已失效</div>
            <div class="fl">
              <img v-if="loser.url != null && loser.url !='' && loser.url != 'undefined'" v-cloak :src=loser.url
                   :alt=loser.goodsName>
              <img src="../assets/images/m_default_cart.png" alt="小虫快租" v-else>
            </div>
            <div class="fl fr_text">
              <span class="warp_title">{{loser.goodsName}}</span><br>
              <span class="warp_con">{{loser.skuName}}</span>
            </div>
          </div>
          <div class="text">
            <span class="texts">{{loser.leasehold.leaseholdTypeValue}}</span>
            <!--<span class="img"><img src="../assets/images/m_why.png" alt=""></span>-->
            <el-tooltip placement="bottom" v-if="hintTextFlag" v-cloak>
              <div slot="content">{{leaseholdTypeName}}</div>
              <span class="img right_img" v-on:mouseenter="getHintText(loser.leasehold.leaseholdTypeName)"><img
                src="../assets/images/m_why.png" alt=""></span>
            </el-tooltip>
            <span class="img right_img" v-else><img
              src="../assets/images/m_why.png" alt=""></span>
          </div>
          <div class="text">
            <div class="num_box">
              <a href="javascript:;" class="fl" @click="reduceNumber(loser,loser.cartid,$lose)">-</a>
              <a href="javascript:;" class="fr" @click="addNumber(loser,loser.cartid,$lose)">+</a>
              <input type="text" class="num_inpt" v-model="loser.count" @input="changeNum(loser,loser.cartid,$lose)">
            </div>
          </div>
          <div class="text">
            {{loser.leasehold.tenancyTermValue}}个月
          </div>
          <div class="text">
            {{loser.deposit}}元
          </div>
          <div class="text">
            {{loser.leasehold.monthRent}}元
          </div>
          <div class="text">
            <span class="del_img" @click="delThisInfo('lostBox','lostSmallBox',$lose)"><img
              src="../assets/images/m_del.png" alt=""></span>

            <div class="m_modal" :id="'lostBox'+$lose">
              <div class="modal" :id="'lostSmallBox'+$lose">
                <div class="head">
                  <h1>删除商品</h1>
                  <div class="close_con" @click="closemodal('lostBox'+$lose,'lostSmallBox'+$lose)">
                    <img src="../assets/images/icon_close.png" alt="">
                  </div>
                </div>
                <div class="body" style="text-align: left;">
                  确认要从购物车删除此商品？
                </div>
                <div class="footer">
                  <el-button style="width: 96px;height: 36px;line-height: 0;"
                             @click="closemodal('lostBox'+$lose,'lostSmallBox'+$lose)">取消
                  </el-button>
                  <el-button type="success" style="width: 96px;height: 36px;line-height: 0;margin-right: 20px"
                             @click="submitDelInfo('lostBox','lostSmallBox',loser.cartid,$lose)">确定
                  </el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="loserShade"></div>
        </div>
        <div class="empty" v-if="cartarr== null && loseCarts == ''">
          <div class="img">
            <img src="../assets/images/icon_jilu_kong.png" alt="">
            <span>购物车为空，赶快去添加吧!</span>
          </div>
        </div>

      </div>
      <div class="footer">
        <div class="box fl">
          <div class="choose fl" @click="parChoose">
            <span class="select_img" :class="{active: parFlag}"></span>
            <span class="text">全选</span>
          </div>
          <div class="choose_text fr">
            <div class="text">
              已选择商品&nbsp;&nbsp;<span>{{counts}}&nbsp;&nbsp;</span>件&nbsp;&nbsp;&nbsp;&nbsp;应付租金总金额：<span
              style="font-size: 18px">¥{{totelRent}}</span>

            </div>
          </div>
        </div>

        <div class="fr">
          <div class="btn active" v-if="btnFlag" v-cloak>立即下单</div>
          <div class="btn " @click="submitCatrsInfo" v-else>
            立即下单
          </div>
        </div>
      </div>
    </div>

    <div class="m_modal" id="fixedModal">
      <div class="modal" id="modalAnmation">
        <div class="head">
          <h1>提示</h1>
          <div class="close_con" @click="closemodal('fixedModal,modalAnmation')">
            <img src="../assets/images/icon_close.png" alt="">
          </div>
        </div>
        <div class="body">
          <div class="error_body">
            <span class="error_img"><img src="../assets/images/icon_tishi.png" alt=""></span>
            {{hintText}}
          </div>
        </div>
        <div class="footer">
          <el-button style="width: 136px;margin-top: 12px;margin-right: 20px" id="gotoPage">确定</el-button>
        </div>
      </div>
    </div>

    <div class="service-side">
      <custom_service></custom_service>
    </div>

  </div>
</template>


<script type="text/ecmascript-6">
  import {allMethods} from '../assets/js/config';
  import custom_service from "./x-customservice";
  import {bus} from '../assets/js/config';
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";

  export default {
    name: 'cart',
    data () {
      return {
        token: '',
        cartarr: [],
        loseCarts: [],
        counts: 0,
        hintText: '',
        totelRent: 0,
        num: 1,
        leaseholdTypeName: '',
        timer: '',
        monthRent: '',
        obj: [],
        initArrDatas: [],
        primevalPrice: [],
        isTop: false,
        parFlag: true,
        btnFlag: false,
        hintTextFlag: true,

      }
    },
    components: {
      ElButton,
      custom_service: custom_service,
    },
    methods: {
      getHintText(name){
        var that = this;
        this.$http.get('/item/remark', {params: {leaseholdTypeName: name}}).then(function (res) {
          if (Number(res.data.code) === 1000) {
            if (res.data.data != '' && res.data.data != null && res.data.data != 'undefined') {
              that.hintTextFlag = true;
              if (res.data.data != '' && res.data.data != null && res.data.data != 'undefined') {
                that.leaseholdTypeName = res.data.data;
              } else {
                if (Number(name) === 1) {
                  that.leaseholdTypeName = '租完即送：租期结束归客户所有'
                } else if (Number(name) === 2) {
                  that.leaseholdTypeName = '固定租期：租期结束设备还给小虫快租'
                }
              }
            } else {
              that.hintTextFlag = false;
            }
          }
        })
      },
      reduceNumber(datas, cartid, index){
        if (Number(datas.count) > 1) {
          datas.count = Number(datas.count) - 1;
          this.changeNum(datas, cartid, index);
        } else {
          this.delThisInfo('delModal', 'smallModal', index);
          bus.$emit('addshop', '');
        }
      },
      addNumber(datas, cartid, index){
        if(Number(datas.count) < 9999){
          datas.count = parseInt(datas.count) + 1;
          this.changeNum(datas, cartid, index);
        }
      },
      chooseMonthRent(datas, count, index){
        var chooseNum = 0,
          choosePrice = 0;
        for (var i = 0; i < this.primevalPrice.length; i++) {
          if (index === i) {
            datas.leasehold.monthRent = Number(this.primevalPrice[i]) * Number(count);
          }
        }

        for (var j = 0; j < this.cartarr.length; j++) {
          var arr = this.cartarr[j];
          if (arr.select) {
            chooseNum += Number(arr.count);
            choosePrice += parseFloat(arr.leasehold.monthRent);

          }
        }
        this.counts = chooseNum;
        this.totelRent = allMethods.fmoney(choosePrice);

      },
      changeNum(datas, cartid, index){
        if (!allMethods.numberReg.test(datas.count)) {
          datas.count = 1;
        }
        if (datas.count == 0) {
          this.delThisInfo(datas, index);
          return false;
        }
        if(Number(datas.count) > 9999 ){
          datas.count = 9999;
        }
        this.chooseMonthRent(datas, datas.count, index);
        this.num = datas.count;
        var that = this;
        var arr = {
          token: this.token,
          count: Number(datas.count),
          cartid: cartid,
          initTime: new Date().getTime(),
        };
        this.$http.post('/cart/updateNumber', arr).then(function (data) {
          if (Number(data.data.code) === 1000) {
            bus.$emit('addshop', '');
//            that.getShoppingCarInfo();
          } else if (Number(data.data.code) === 2116) {
            that.hintText = '部分商品已失效，请重新修改数量哦';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              that.getShoppingCarInfo();
            })
          }

        })
      },
      closemodal(par, name){
        this.hintText = '';
        $("#" + name).slideUp(200);
        setTimeout(function () {
          $('#' + par).hide();
        }, 260);
      },
      getShoppingCarInfo(){
        var that = this;
        this.$http.get('/cart/detail', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.obj = data.data.data;
            that.loseCarts = data.data.data.loseCarts;
            that.cartarr = that.cartsAddFlag(data.data.data, data.data.data.carts);
            that.calculateAllNum(data.data.data.carts);
          } else if (Number(data.data.code) === 3000) {
            that.hintText = '购物车查询失败，请稍后再试';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              that.btnFlag = !that.btnFlag;
            })
          } else {
            that.btnFlag = !that.btnFlag;
          }
        })
      },

      cartsAddFlag(obj, datas){
        var arr = [];
        if (datas == '' || datas == 'undefined' || datas == null) {
          this.btnFlag = true;
          arr = [];
          this.counts = 0;
          this.totelRent = allMethods.fmoney(0);
        } else {
          this.btnFlag = false;
          if (this.initArrDatas.length == 0) {
            for (var i = 0; i < datas.length; i++) {
              datas[i]['select'] = true;
            }
            this.initAllNumComplete(datas);
          } else {
            datas = this.initArrDatas;
            var num = 0,
              price = 0;
            for (var i = 0; i < datas.length; i++) {
              if (datas[i].select) {
                this.parFlag = true;
                num += Number(datas[i].count);
                price += parseFloat(datas[i].leasehold.monthRent);
              } else {
                this.parFlag = false;
                this.btnFlag = true;
              }
            }
            this.counts = num;
            this.totelRent = allMethods.fmoney(price);
          }
          arr = datas;
          return arr;
        }
      },

      calculateAllNum(datas){
        if (datas != '' && datas != 'undefined' && datas != null) {
          for (var i = 0; i < datas.length; i++) {
            this.primevalPrice.push(datas[i].leasehold.monthRent);
            datas[i].leasehold.monthRent = Number(datas[i].leasehold.monthRent) * Number(datas[i].count);
          }
        }
      },
      initAllNumComplete(datas){
        var num = 0;
        var price = 0;
        if (datas != '' && datas != 'undefined' && datas != null) {
          for (var i = 0; i < datas.length; i++) {
            num += Number(datas[i].count);
            price += parseFloat(Number(datas[i].leasehold.monthRent) * Number(datas[i].count));
          }
          this.counts = num;
          this.totelRent = allMethods.fmoney(price);
        }
      },
      parChoose(){
        this.parFlag = !this.parFlag;
        this.initArrDatas = this.cartarr;
        if (this.parFlag === true) {
          if (this.cartarr != '' && this.cartarr != null && this.cartarr != 'undefined' && this.cartarr.length > 0) {
            for (var i = 0; i < this.cartarr.length; i++) {
              this.cartarr[i].select = true;
              this.allSelectPrice(this.cartarr)
            }
            this.btnFlag = false;
          }
        } else if (this.parFlag === false) {
          if (this.cartarr != '' && this.cartarr != null && this.cartarr != 'undefined' && this.cartarr.length > 0) {
            for (var i = 0; i < this.cartarr.length; i++) {
              this.cartarr[i].select = false;
            }
            this.btnFlag = true;
            this.counts = 0;
            this.totelRent = allMethods.fmoney(0);
          }
        }
      },

      allSelectPrice(datas){
        var num = 0;
        var price = 0;
        if (datas != '' && datas != 'undefined' && datas != null) {
          for (var i = 0; i < datas.length; i++) {
            num += Number(datas[i].count);
            price += parseFloat(datas[i].leasehold.monthRent);
          }
          this.counts = num;
          this.totelRent = allMethods.fmoney(price);
        }
      },

      sonChoose(datas, index){
        datas.select = !datas.select;
        this.initArrDatas = this.cartarr;
        var check = 0,
          noCheck = 0,
          num = Number(this.counts),
          price = Number(this.totelRent.replace(/\,/ig, ''));

        for (var i = 0; i < this.cartarr.length; i++) {
          if (!this.cartarr[i].select) {
            this.parFlag = false;
            noCheck = noCheck + 1;
            if (index === i) {
              num = num - Number(this.cartarr[i].count);
              price = price - Number(this.cartarr[i].leasehold.monthRent);
            }
          } else if (this.cartarr[i].select) {
            check = check + 1;
            if (index === i) {
              num = num + Number(this.cartarr[i].count);
              price = price + Number(this.cartarr[i].leasehold.monthRent);
            }
          }
        }
        this.counts = num;
        this.totelRent = allMethods.fmoney(price);

        if (check >= this.cartarr.length) {
          this.parFlag = true;
        }
        if (noCheck >= this.cartarr.length) {
          this.btnFlag = true;
        } else {
          this.btnFlag = false;
        }
      },

      getAllSelect(datas, arr){
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].select) {
            arr.push(datas[i].cartid)
          }
        }
        return arr;
      },
      submitCatrsInfo(){
        var cartids = [],
          that = this;
        var carts = this.getAllSelect(this.cartarr, cartids);
        var arr = {
          token: this.token,
          cartids: carts.join(),
        }
        this.btnFlag = true;
        this.$http.post('/cart/settle', arr).then(function (data) {
          that.btnFlag = false;
          if (Number(data.data.code) === 1000) {
            that.$router.push({path: '/buy', query: {submitid: data.data.data.timestamp}})
          } else if (Number(data.data.code) === 2027) {
            that.hintText = '用户尚未完成企业认证，请先去认证哦~';
            $('#fixedModal').show();
            setTimeout(function () {
              $('#modalAnmation').slideDown(200);
            }, 120);

            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#modalAnmation').slideUp(120);
              setTimeout(function () {
                $('#fixedModal').hide();
              }, 120);
              that.$router.push('/companyCertificationFailed')
            })
          } else if (Number(data.data.code) === 2116) {
            that.hintText = '部分商品已失效，请重新提交订单哦';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              that.getShoppingCarInfo();
            })
          } else if (Number(data.data.code) === 2100) {
            that.hintText = '部分商品已下架，请重新提交订单哦';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              bus.$emit('addshop', '');
              that.getShoppingCarInfo();
            })
          }
        })
      },
      delThisInfo(big, small, index){
        $("#" + big + index).show();
        $("#" + small + index).slideDown(200);
      },
      submitDelInfo(big, small, cartid, index){
        var that = this;
        var arr = {
          token: this.token,
          cartid: cartid
        }
        that.$http.post('cart/delCart', arr).then(function (data) {
          if (Number(data.data.code) === 1000) {
            bus.$emit('addshop', '');
            $("#" + big + index).hide();
            setTimeout(function () {
              $("#" + small + index).slideDown(200);
            }, 200);
            that.initArrDatas.splice(index, 1);
            that.getShoppingCarInfo();
          } else if (Number(data.data.code) === 2116) {
            that.hintText = '该商品记录不存在，请刷新页面或者重新登录~';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $("#" + big + index).hide();
            $("#" + small + index).slideUp();
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              that.getShoppingCarInfo();
            })
          } else {
            that.hintText = '删除失败，请稍后重新操作~';
            $('#fixedModal').show();
            $('#modalAnmation').slideDown(200);
            $('#gotoPage').click(function () {
              that.hintText = '';
              $('#fixedModal').hide();
              $('#modalAnmation').slideUp();
              that.getShoppingCarInfo();
            })
          }
        })
      },
      stopScrollAnimate() {
        if (!this.isStop) {
          clearInterval(this.timer);
          window.removeEventListener('scroll', this.stopScrollAnimate)
        }
        this.isStop = false
      },
      returnTOp() {
        var vm = this
        this.timer = setInterval(function () {
          window.addEventListener('scroll', vm.stopScrollAnimate)
          var osTop = document.documentElement.scrollTop || document.body.scrollTop;
          var ispeed = Math.floor(-osTop / 7);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          if (osTop == 0) {
            clearInterval(vm.timer);
          }
          vm.isStop = true
        }, 1);
      },
    },
    created(){
      this.returnTOp();
      this.token = localStorage.getItem('xckz_mall');
      this.getShoppingCarInfo();
    }
  }
</script>

<style scoped lang="scss">
  .head_all .head {
    clear: inherit;
    background-color: #ffffff;
  }

  .head_all .footer {
    background-color: #fff;
    text-align: right;
    padding: 0;
  }
</style>
