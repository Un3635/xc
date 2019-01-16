<template>
  <div class="commodity_details">
    <div class="levelModel">
      <div class="levelBar">
        <ul>
          <router-link to="/">
            <li style="padding: 0">首页</li>
          </router-link>
          <li>&gt;</li>
          <router-link to="/list">
            <li>全部机型</li>
          </router-link>
          <li>&gt;</li>
          <li class="current">{{ cartsArr.title }}</li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="interval17"></div>
      <div class="details_head">
        <div class="carousel">
          <!-- 大图end -->
          <div id="preview" class="spec-preview">
            <div class="show_img">
              <div class="jqzoom">
                <img src="../assets/images/m_default_big.png" alt="" v-if="!firstSrc" v-cloak>
                <img :src="firstSrc" v-else>
                <div class='img_view'
                     style='background: url("../../static/images/mask.png") repeat scroll 0 0 transparent'></div>
              </div>
              <div class='big_view'></div>
            </div>
          </div>

          <!-- 缩略图begin -->
          <div class="spec-scroll">
            <a class="prev" @click="prevImg"><img src="../assets/images/pre.png" alt=""></a>
            <a class="next" @click="nextImg"><img src="../assets/images/next.png" alt=""></a>
            <div class="items" v-if="cartsArr">
              <ul>
                <li v-for="(img,index) in cartsArr.urls" :id="'img'+index">
                  <img src="../assets/images/m_default_small.png" v-if="!img" v-cloak>
                  <img :bimg=img :src=img v-on:mouseenter="preview(img)" v-else>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <div class="buy_info">
          <div class="head clear" style="background-color: #ffffff">
            <h1>{{cartsArr.title}}</h1>
            <p>
              {{cartsArr.subtitle}}
              <span class="head_tags" v-if="headTags" v-for="(i,tag) in headTags" :key="tag">{{i}}</span>
            </p>
            </p>
            <div class="price">
              <span v-for="sku in newSkuArr" v-if="checkSku == sku.productNo">
                <span v-for="(son,$son) in sku.leaseHolds" v-if="checkLeaseHold===son.goodInstallId">
                  <h2>¥<span v-html="Number(son.rent)"></span>/月</h2>
                </span>
              </span>
              <h3 v-if="Number(cartsArr.goodsIsNewName) === 1">全新设备</h3>
              <h3 v-if="Number(cartsArr.goodsIsNewName) === 0">非全新设备</h3>
            </div>
          </div>

          <div class="cont clear">
            <h1>选择配置</h1>
            <div class="box" v-for="sku in newSkuArr" :class="{active: checkSku == sku.productNo}"
                 @click="changeSku(sku)">{{sku.skuName}}
              <span class="m_yes"></span>
            </div>
          </div>

          <div class="clear cont">
            <h1>租赁方式</h1>
            <div v-for="(sku,$index) in newSkuArr" v-if="sku.productNo===checkSku">
              <div class="box2" v-for="(son,$son) in sku.leaseHolds"
                   :class="{active:son.goodInstallId === checkLeaseHold}"
                   @click="changeNewSku(son)">
                <div class="text_right">
                  <div class="text">租金:&nbsp;<span>{{son.rent}}</span>元/月</div>
                  <div class="text">租期:&nbsp;{{son.tenancyTermValue}}个月</div>

                  <div class="text1">
                    <span class="img left_img"><img src="../assets/images/m_date.png" alt=""></span>
                    <span class="texts">{{son.leaseholdTypeValue}}</span>
                    <el-tooltip placement="bottom" v-if="hintTextFlag" v-cloak>
                      <div slot="content">{{leaseholdTypeName}}</div>
                      <span class="img right_img" v-on:mouseenter="getHintText(son.leaseholdTypeName)"><img
                        src="../assets/images/m_why.png" alt=""></span>
                    </el-tooltip>
                    <span class="img right_img" v-else><img
                      src="../assets/images/m_why.png" alt=""></span>

                  </div>
                  <span class="m_yes"></span>
                </div>
              </div>
            </div>
          </div>

          <div class="num_box m_num_boxs clear">
            <h1 style="display: block;float: left">租机数量</h1>
            <div class="num_box clear">
              <a href="javascript:;" class="fl" @click="reduceNumber">-</a>
              <a href="javascript:;" class="fr" @click="addNumber">+</a>
              <input type="text" class="num_inpt" v-model="num" @input="changeNum">
            </div>
          </div>

          <div class="cash_box clear">
            <div class="price">
              每台押金：¥
              <span v-for="sku in newSkuArr" v-if="checkSku == sku.productNo">
                <span>{{sku.deposit}}</span>
              </span>

            </div>

            <div class="text" v-if="xckz_mall_status === 'false' || xckz_mall_status == null">
              <span class="img"><img src="../assets/images/m_manage.png" alt=""></span>
              <span class="small_text">完成企业认证，立享免押金租机</span>
              <div class="btn" @click="gotofeelimitPage">申请免押金</div>
            </div>
          </div>

          <div class="no_cash_box clear" v-if="token && !allowBuy">
            <img src="../assets/images/icon_jilu_kong.png" alt="">
            <p>本商品暂不提供租赁</p>
          </div>


          <div class="num_box clear">
            <h1>月租金</h1>
            <h2>¥
              <span v-for="sku in newSkuArr" v-if="checkSku == sku.productNo">
                <span v-for="(son,$son) in sku.leaseHolds" v-if="checkLeaseHold===son.goodInstallId">
                  <span v-html="num*Number(son.rent)"></span>
                </span>
              </span>
              /月</h2>
          </div>
          <div class="footer clear">
            <div style="display: inline-block;" v-if="token && !allowBuy" v-cloak>
              <div class="btn btn_grey">立即下单</div>
              <div class="btn btn_orange btn_grey"><i><img src="../assets/images/cart.png"></i><span>加入购物车</span></div>
            </div>
            <div style="display: inline-block;" v-else>
              <div class="btn btn_green" @click="gotoImmediateOrder">立即下单</div>
              <div class="btn btn_orange" @click="joinShopping"><i><img src="../assets/images/cart.png"></i><span>加入购物车</span></div>
            </div>


            <router-link to="helpCenter">
              <div class="text">什么是免押金租赁？</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="clear details_body">
        <div class="title">
          <div class="tab" :class="{active: tab == 0}" @click="chooseTabs(0)">商品详情</div>
          <div class="tab" :class="{active: tab == 1}" @click="chooseTabs(1)">商品参数</div>
        </div>
        <div class="tab_box">
          <div class="tab_body details" v-if="!tabStatus" v-html="detailArr"></div>

          <div class="tab_body" v-if="tabStatus">
            <div class="parameter"
                 v-if="parameterArr.length != 0 && parameterArr != 'undefined' && parameterArr != '' && parameterArr != null">
              <div class="parameter_box clear" v-for="par in parameterArr">
                <el-container class="clear">
                  <el-aside width="182px">{{par.parameterName}}</el-aside>
                  <el-main>
                    <div class="content clear" v-for="son in par.itemAttributeVos">
                      <div class="par">{{son.attributeName}}</div>
                      <div class="son">{{son.attributeValue}}</div>
                    </div>
                  </el-main>
                </el-container>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="service-side">
        <custom_service></custom_service>
      </div>

      <!--添加购物车-->
      <div class="shopping_modal" v-if="showCar">
        <div class="modal">
          <div class="pop">
            <div class="close_icon" @click="closeModal">
              <img src="../assets/images/icon_close.png" alt="">
            </div>
            <div class="box">
              <span><img src="../assets/images/icon_success.png" alt=""></span>
              <div class="test">成功加入购物车</div>
            </div>
            <div class="footer">
              <el-button @click="gotoShoppingCar">去购物车结算</el-button>
              <el-button type="success" style="margin-right: 21px" @click="goonShopping">继续购物</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="m_modal" id="fixedModal">
        <div class="modal" id="modalAnmation" style="width: 420px;height: 192px;">
          <div class="head">
            <h1>提示</h1>
            <div class="close_con" @click="closeHintModal('fixedModal','modalAnmation')">
              <img src="../assets/images/icon_close.png" alt="">
            </div>
          </div>
          <div class="body">
            <div class="newHint">
              <span><img src="../assets/images/icon_tishi.png" alt=""></span>
              <div class="errorHintTexts">{{errotext}}</div>
            </div>
          </div>
          <div class="footer" style="text-align: right">
            <el-button style="width: 136px;margin-top: 12px;margin-right: 20px" id="gotoPage">确定</el-button>
          </div>
        </div>
      </div>

      <div class="m_modal" id="removeModal">
        <div class="modal" id="removeBox" style="width: 420px;height: 192px;">
          <div class="head">
            <h1>提示</h1>
            <!--<div class="close_con" @click="closeHintModal('removeModal','removeBox')">-->
            <!--<img src="../assets/images/icon_close.png" alt="">-->
            <!--</div>-->
          </div>
          <div class="body">
            <div class="newHint">
              <span><img src="../assets/images/icon_tishi.png" alt=""></span>
              <div class="errorHintTexts">{{myError}}</div>
            </div>
          </div>
          <div class="footer" style="text-align: right">
            <el-button style="width: 136px;margin-top: 12px;margin-right: 20px" id="gotoHome">去首页</el-button>
          </div>
        </div>
      </div>

      <div class="m_modal" id="noAttestation">
        <div class="modal" id="noAmodal" style="width: 420px;height: 192px;">
          <div class="head" style="background-color: #ffffff">
            <h1>提示</h1>
            <div class="close_con" @click="closeHintModal('noAttestation','noAmodal')">
              <img src="../assets/images/icon_close.png" alt="">
            </div>
          </div>
          <div class="body">
            <div class="newHint">
              <span><img src="../assets/images/icon_tishi.png" alt=""></span>
              <div class="errorHintTexts">{{errotext}}</div>
            </div>
          </div>
          <div class="footer" style="text-align: right;">
            <el-button style="width: 136px;margin-top: 12px;" @click="closeHintModal('noAttestation','noAmodal')">再看看
            </el-button>
            <el-button type="warning" style="width: 136px;margin-top: 12px;margin-right: 20px"
                       @click="gotoCompanyCertification">立即认证
            </el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {allMethods} from '../assets/js/config';
  import {bus} from '../assets/js/config';
  import custom_service from "./x-customservice";

  export default {
    components: {
      custom_service: custom_service,
    },
    name: 'detail',
    data() {
      return {
        token: '',
        xckz_mall_status: '',
        errotext: '',
        leaseholdTypeName: '',
        goodsNo: '',
        firstSrc: '',
        textPrice: '',
        detailArr: '',
        checkSku: '',
        checkLeaseHold: '',
        productName: '',
        timer: '',
        myError: '',
        allowBuy: '',
        tab: 0,
        num: 1,
        tabPosition: 'top',
        cartsArr: [],
        newSkuArr: [],
        parameterArr: [],
        headTags: [],
        tabStatus: false,
        showCar: false,
        isTop: false,
        hintTextFlag: true,
        scrollItems: 0,
        tempLength: 0, //临时变量,当前移动的长度
        viewNum: 4, //设置每次显示图片的个数量
        moveTime: 300, //移动速度,毫秒
        moveNum: 4, //每次移动的数量
      }
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
      changeSku(sku){
        this.firstSrc = sku.skuImageUrl;
        this.num = 1;
        this.checkSku = sku.productNo;
        var data = sku.leaseHolds;
        this.checkLeaseHold = data[0].goodInstallId;
        this.getParameter(this.checkSku);
        this.getGoodsLables(this.checkSku)
      },
      changeNewSku(son){
        this.checkLeaseHold = son.goodInstallId;
      },
      closeHintModal(bg, modal){
        bus.$emit('addshop', '');
        $("#" + modal).slideUp(120);
        setTimeout(function () {
          $("#" + bg).hide();
        }, 220)
      },
      reduceNumber(){
        if (Number(this.num) > 1) {
          this.num = parseInt(this.num) - 1;
        }
      },
      addNumber(){
        if (Number(this.num) < 9999) {
          this.num = parseInt(this.num) + 1;
        }
      },
      changeNum(){
        if (!allMethods.numberReg.test(this.num)) {
          this.num = 1;
          return false
        } else if (Number(this.num) > 9999) {
          this.num = 9999;
          return false;
        }
        else {
          if (Number(this.num) === 0) {
            this.num = 1;
            return false;
          }
        }
      },

      getInfos(){
        var that = this;
        this.$http.get('/item/infos', {params: {goodsNo: this.goodsNo}}).then(function (res) {
          var data = res.data;
          if (Number(data.code) === 1000) {
            that.cartsArr = data.data;
            that.newSkuArr = that.getnewSkuArr(data.data.skuInfos, data.data);
          } else if (Number(data.code) === 2100) {
            that.myError = "该商品已下架~"
            $("#removeModal").show();
            setTimeout(function () {
              $("#removeBox").slideDown(200);
            }, 200)
            $("#gotoHome").click(function () {
              that.$router.push('/')
            })
          } else {
            that.myError = "没有查到该商品信息~"
            $("#removeModal").show();
            setTimeout(function () {
              $("#removeBox").slideDown(200);
            }, 200)
            $("#gotoHome").click(function () {
              that.$router.push('/')
            })
          }

        })
      },
      getnewSkuArr(data, res){
        var arr = {};
        for (var i = 0; i < data.length; i++) {
          var item = data[i]
          var text = item['productNo'];
          arr[text] = item;
          if (res.defaultInatallment !== null && res.defaultInatallment != '' && res.defaultInatallment != 'undefined') {
            for (var j = 0; j < item.leaseHolds.length; j++) {
              var leaseHolds = item.leaseHolds[j];
              if (res.defaultInatallment == leaseHolds.goodInstallId) {
                this.checkSku = item.productNo;
                this.checkLeaseHold = res.defaultInatallment;
                this.firstSrc = item.skuImageUrl;
                this.getParameter(this.checkSku);
                this.getGoodsLables(this.checkSku)
              }
            }
          } else {
            if (i === 0) {
              this.checkSku = text;
              this.checkLeaseHold = item['leaseHolds'][0]['goodInstallId'];
              this.firstSrc = res.urls[0];
              this.getParameter(this.checkSku);
            }
          }
        }
        return arr
      },
      closeModal() {
        this.showCar = false;
      },
      goonShopping(){
        this.showCar = false;
      },
      gotoShoppingCar() {
        this.$router.push('/cart')
      },
      joinShopping() {

        if (!localStorage.getItem('xckz_mall')) {
          bus.$emit('islogin', 'login', 'detail?itemid=' + this.goodsNo + '&productName=' + this.productName)
          return false
        }
        var that = this;
        var arr = {
          goodsInstallmentId: this.checkLeaseHold,
          count: this.num,
          token: localStorage.getItem('xckz_mall'),
        };
        this.$http.post('/cart/addcart', arr).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.showCar = true;
            bus.$emit('addshop', '');
          } else if (Number(data.data.code) === 2100) {
            that.errotext = '该商品已经下架，请购买其他商品~';
            $("#fixedModal").show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(200);
            }, 200)
            $("#gotoPage").click(function () {
              that.closeHintModal('modalAnmation', 'fixedModal');
              that.$router.push('/list')
            })
          } else {
            that.errotext = '添加购物车失败，请稍后重试';
            $("#fixedModal").show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(200);
            }, 200);
            $("#gotoPage").click(function () {
              that.closeHintModal('fixedModal', 'modalAnmation')
            })
          }
        })
      },
      chooseTabs(num) {
        this.tab = num;
        if (this.tab == 0) {
          this.tabStatus = false
        } else {
          this.tabStatus = true
        }
      },
      //鼠标经过预览图片函数
      preview(img) {
        this.firstSrc = img;
        $("#preview .jqzoom img").attr("src", img);
        $("#preview .jqzoom img").attr("jqimg", img);
      },
      gotofeelimitPage(){
        if (!localStorage.getItem('xckz_mall')) {
          bus.$emit('islogin', 'login', 'detail?itemid=' + this.goodsNo + '&productName=' + this.productName);
          return false;
        } else {
          this.$router.push('/freeDeposit')
        }

      },
      getDetailInfo(){
        var that = this;
        this.$http.get('/item/detail', {params: {goodsNo: this.goodsNo}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.detailArr = data.data.data;
          }
        })
      },
      getParameter(pId){
        var that = this;
        this.$http.get('/item/parameter', {params: {productNo: pId}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.parameterArr = data.data.data;
          }
        })
      },
      gotoImmediateOrder(){
        if (!localStorage.getItem('xckz_mall')) {
          bus.$emit('islogin', 'login', 'detail?itemid=' + this.goodsNo + '&productName=' + this.productName);
          return false
        }
        var that = this;
        var arr = {
          token: localStorage.getItem('xckz_mall'),
          goodsInstallmentId: this.checkLeaseHold,
          count: this.num
        };
        this.$http.post('/cart/immediateOrder', arr).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.$router.push({path: '/buy', query: {submitid: data.data.data}})
          } else if (Number(data.data.code) === 2027) {
            that.errotext = '用户尚未完成认证，请先去认证哦~';
            $("#noAttestation").show();
            setTimeout(function () {
              $("#noAmodal").slideDown(120);
            }, 120)
          } else if (Number(data.data.code) === 2100) {
            that.errotext = '该商品已经下架，请购买其他商品~';
            $("#fixedModal").show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(200);
            }, 200)
            $("#gotoPage").click(function () {
              that.closeHintModal('modalAnmation', 'fixedModal');
              that.$router.push('/list')
            })
          }
        })
      },
      gotoCompanyCertification(){
        this.$router.push('/companyCertificationFailed');
      },
      initAllDatas(){
        this.token = localStorage.getItem('xckz_mall');
        this.xckz_mall_status = localStorage.getItem('xckz_mall_status');
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
      prevImg(){
        var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
        var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
        var moveLength = scrollItems.eq(0).outerWidth(true) * this.moveNum; //计算每次移动的长度
        var countLength = (scrollItems.length - this.viewNum) * scrollItems.eq(0).outerWidth(true); //计算总长度,总个数*单个长度
        if (this.tempLength > 0) {
          if (this.tempLength > moveLength) {
            scrollDiv.animate({left: "+=" + moveLength + "px"}, this.moveTime);
            this.tempLength -= moveLength;
          } else {
            scrollDiv.animate({left: "+=" + this.tempLength + "px"}, this.moveTime);
            this.tempLength = 0;
          }
        }

      },
      nextImg(){
        var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
        var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
        var moveLength = scrollItems.eq(0).outerWidth(true) * this.moveNum; //计算每次移动的长度
        var countLength = (scrollItems.length - this.viewNum) * scrollItems.eq(0).outerWidth(true); //计算总长度,总个数*单个长度
        if (this.tempLength < countLength) {
          if ((countLength - this.tempLength) > moveLength) {
            scrollDiv.animate({left: "-=" + moveLength + "px"}, this.moveTime);
            this.tempLength += moveLength;
          } else {
            scrollDiv.animate({left: "-=" + (countLength - this.tempLength) + "px"}, this.moveTime);
            this.tempLength += (countLength - this.tempLength);
          }
        }
      },
      getGoodsLables(productNo){
        var vm = this;
        this.$http.get('/item/company/goodsLables', {
          params: {
            goodsNo: this.goodsNo,
            productNo: productNo,
            token: this.token
          }
        }).then(function (res) {
          if (Number(res.data.code) === 1000) {
            vm.headTags = res.data.data.lableNames;
            vm.allowBuy = res.data.data.allowBuy;
          }
        })
      }
    },
    created(){
      this.returnTOp();
      this.token = localStorage.getItem('xckz_mall');
      this.goodsNo = this.$route.query.itemid;
      this.productName = this.$route.query.productName;
      this.xckz_mall_status = localStorage.getItem('xckz_mall_status');
      this.getInfos();
      this.getDetailInfo();
      bus.$on('logout', this.initAllDatas);
    },
    watch: {
      firstSrc (val) {
        $(window).bigView($(".show_img"), val);
      },
    }
  }
</script>

<style scoped lang="scss">
  .btn_grey{
    display: inline-block;
    background-color: #D4D4D4 !important;
    cursor: inherit;
  }
  .no_cash_box {
    width: 714px;
    background: #FAFAFA;
    text-align: center;
    padding-top: 19px;
    padding-bottom: 13px;
    margin-top: 18px;

  p {
    margin-top: 22px;
    font-size: 14px;
    color: #333333;
  }

  }
  .el-aside {
    min-height: 68px;
    height: auto;
    background-color: #FBFBFB;
    font-size: 24px;
    font-weight: bold;
    color: #343535;
    padding-top: 22px;
    padding-left: 36px;
  }

  .el-main {
    background-color: #FFFFFF;
    font-size: 18px;
  }

  .head_all .footer {
    background-color: #fff;
    text-align: left;
    padding: 0;
  }

  .head_all .head {
    background-color: #ffffff;
    line-height: 1.5;
  }
</style>
