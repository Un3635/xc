<template>
  <!--.el-upload-list {-->
  <!--margin-left: 60px;-->
  <!--margin-right: 71px;-->
  <!--.el-upload-list__item {-->
  <!--.el-upload-list__item-name {-->
  <!--height: 70px;-->
  <!--line-height: 1.5;-->
  <!--margin-top: 16px;-->
  <!--i{-->
  <!--font-size: 30px;-->
  <!--color: #dddddd;-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--.el-upload&#45;&#45;picture-card{-->
  <!--width: 100px;-->
  <!--height: 100px;-->
  <!--line-height: 100px;-->
  <!--border: 1px solid #dddddd;-->
  <!--background-color: #ffffff;-->
  <!--}-->
  <div class="submit_order_list">
    <div class="levelModel">
      <div class="levelBar">
        <ul>
          <router-link to="/">
            <li style="padding: 0">首页</li>
          </router-link>
          <li>&gt;</li>
          <router-link to="/cart">
            <li>购物车</li>
          </router-link>
          <li class="current">提交订单</li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="table">
        <div class="title">
          <div class="head"></div>
          <div class="head">
            <span>商品信息</span>
          </div>
          <div class="head">租赁方式</div>
          <div class="head">数量</div>
          <div class="head">租期</div>
          <div class="head">押金／台</div>
          <div class="head">租金／月</div>
        </div>
        <div class="con clear" v-for="list in cartOrderList.carts">
          <div class="text"></div>
          <div class="text">
            <div class="fl">
              <img v-if="list.url != null && list.url !='' && list.url != 'undefined'" v-cloak :src=list.url
                   :alt=list.goodsName>
              <img src="../assets/images/m_default_cart.png" alt="小虫快租" v-else>
            </div>
            <!--<span>{{list.goodsName}}<br>-->
            <!--{{list.skuName}}</span>-->
            <div class="fl fr_text">
              <span class="warp_title">{{list.goodsName}}</span><br>
              <span class="warp_con">{{list.skuName}}</span>
            </div>

          </div>
          <div class="text">
            <span class="texts">{{list.leasehold.leaseholdTypeValue}}</span>
            <span class="img"><img src="../assets/images/m_why.png" alt=""></span>
            <el-tooltip placement="bottom" v-if="hintTextFlag" v-cloak>
              <div slot="content">{{leaseholdTypeName}}</div>
              <span class="img right_img" v-on:mouseenter="getHintText(list.leasehold.leaseholdTypeName)"><img
                src="../assets/images/m_why.png" alt=""></span>
            </el-tooltip>
            <span class="img right_img" v-else><img
              src="../assets/images/m_why.png" alt=""></span>
          </div>
          <div class="text">{{list.count}}</div>
          <div class="text">{{list.leasehold.tenancyTermValue}}个月</div>
          <div class="text">{{list.deposit}}元</div>
          <div class="text">{{list.leasehold.rent}}元</div>
        </div>
      </div>

      <div class="box clear">
        <el-container>
          <el-aside width="162px">
            选择收货地址
          </el-aside>
          <el-main>
            <div class="text fl">
              <div class="greyText" v-if="adressArr == 'undefined' || adressArr == '' || adressArr.length == 0" v-cloak>
                您还没有填写收货地址
              </div>
              <div class="line clear" v-else v-for="(item,$index) in adressArr" @click="chooseAdressId(item)">
                <span class="img" :class="{active: item.defaulted}"></span>
                <span class="son_text">{{item.province }}{{item.city}}{{item.district}}{{item.detailAddress}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.receiver}}&nbsp;&nbsp;{{item.contactPhone}}</span>
              </div>
            </div>
            <div class="fr" @click="addNewAdress">
              <span class="img"><img src="../assets/images/m_add_icon.png" alt=""></span>
              <span class="son_text">添加新地址</span>
            </div>
          </el-main>
        </el-container>
      </div>

      <div class="box clear" v-if="!datearr.hasRepay">
        <el-container>
          <el-aside width="162px">
            账单日期
          </el-aside>
          <el-main>
            <div class="con">请选择还款日，一经选择无法修改</div>
            <div class="date-list">
              <div class="cont" v-for="(arr,$index) in datearr.repayTimes" :class="{active: $index == dateIndex}"
                   @click="chooseDateInfo($index,arr)">
                <div class="list">每月{{arr}}号<span></span></div>
                <div class="hint_text">每月{{arr}}日还所有账单</div>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>

      <div class="box clear">
        <el-container>
          <el-aside width="162px">
            附件
          </el-aside>
          <el-main class="mB28">

            <el-upload
              class="upload-demo"
              :action="UploadUrl()"
              list-type="picture-card"
              :multiple="true"
              :limit="6"
              :show-file-list="true"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeAvatarUpload"
              :on-exceed="exceedNum"
              :on-change="changeFile"
              :on-remove="removeFile"
              :on-success="uploadFileSuccess"
            >
              <i class="el-icon-plus"></i>

            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="format">最多支持6张上传 格式 png、jpg、jpeg、pdf、zip、rar 文件大小 小于10MB</div>
            <span class="photo_tip">{{photo_tip}}</span>
          </el-main>
        </el-container>
      </div>

      <div class="box clear" style="border-bottom: none;">
        <el-container>
          <el-aside width="162px">
            备注
          </el-aside>
          <el-main>
            <textarea cols="30" rows="10" placeholder="此处填写你对订单其他的需求" v-model="remark"></textarea>
          </el-main>
        </el-container>
      </div>

      <div class="submit_box">
        <div class="fl">
          <div v-if="xckz_mall_status == 'false'" v-cloak>
            <div class="text">
              <span class="img"><img src="../assets/images/m_order_rz.png" alt=""></span>
              <span class="son_text">完成企业授信获取免押额度</span>
            </div>
            <div class="btn" @click="gotoFreeDeposit">立即开通</div>
          </div>
          <div class="text" v-else>
            <span class="img"><img src="../assets/images/m_ordered_rz.png" alt=""></span>
            <span class="son_text">您已完成企业授信</span>
          </div>

        </div>
        <div class="fr">
          <div class="text">
            <span>应付款总金额</span>&nbsp;&nbsp;¥{{cartOrderList.totalAmount}}
          </div>
          <div class="text">
            <span>首付租金</span>&nbsp;&nbsp;¥{{cartOrderList.totalRentPrice}}
          </div>
          <div class="text">
            <span>机器押金</span>&nbsp;&nbsp;¥{{cartOrderList.totalDeposit}}
          </div>
          <div class="text">
            <span>企业免押额度</span>&nbsp;&nbsp;¥
            <i v-if="Number(cartOrderList.reduce) === 0" v-cloak>{{cartOrderList.reduce}}</i>
            <i
              v-if="Number(cartOrderList.reduce) <= Number(cartOrderList.totalDeposit) && Number(cartOrderList.reduce) !==0">-{{cartOrderList.reduce}}</i>
            <i
              v-if="Number(cartOrderList.reduce) > Number(cartOrderList.totalDeposit)">-{{cartOrderList.totalDeposit}}</i>
            <div v-if="Number(feeLimit.authLimit) === 2 || Number(feeLimit.authLimit) === 3" v-cloak
                 style="display: inline-block;">
              <span class="green_text" @click="gotoPromoteQuota">提升额度</span>
            </div>
            <div v-if="Number(feeLimit.authLimit) === 0" v-cloak style="display: inline-block;">
              <span class="green_text" @click="gotoFreeDeposit">开通额度</span>
            </div>
            <div v-if="Number(feeLimit.authLimit) === 1" v-cloak style="display: inline-block;cursor: pointer;">
              <span class="green_text">免押额度申请中</span>
            </div>
          </div>
          <div class="last_text">
            <span>还需支付金额</span>&nbsp;&nbsp;¥{{cartOrderList.payMoney}}
          </div>
        </div>
      </div>
      <div class="send-code">
        <el-form :inline="true" class="demo-ruleForm" label-width="170px">
          <el-form-item label="注册手机短信验证码">
            <el-input placeholder="6位数字验证码" auto-complete="off" v-model="codeText" class="ipt_one" @keyup.native="watchCode"></el-input>
          </el-form-item>
          <el-button type="primary" v-if="!isSend" @click="sendCode">{{codeStatus}}</el-button>
          <el-button class="gray-btn" v-if="isSend">{{counts}}s</el-button>
          <div class="detease-box">
            <div id="deteaseVerify"></div>
          </div>
          <div class="codeErrorText">{{codeErrorText}}</div>
        </el-form>
      </div>
      <div class="footer clear">
        <!--暂时隐藏-->
        <!--<div class="text" @click="getAgreeFlag">-->
        <!--<span class="img" :class="{active: agreeFlag}"></span>-->
        <!--<span class="son_text">同意<span>《小虫快租租赁合同》《服务费收取协议》</span></span>-->
        <!--</div>-->
        <el-button v-if="isApproval" type="primary" class="fr"
                   style="margin-top: 16px;padding-left: 40px;padding-right: 40px;"
                   :loading="subLoading"
                   @click="submitOrderList">提交订单
        </el-button>
        <el-button v-if="!isApproval" type="primary" class="fr" style="padding-left: 40px;padding-right: 40px;"
                   :loading="subLoading" @click="submitOrderList">提交申请
        </el-button>
      </div>
    </div>

    <div class="m_modal" id="addAdressModal">
      <div class="modal" id="adressModal">
        <div class="head">
          <h1>新增地址</h1>
          <div class="close_con" @click="closeModal('addAdressModal','adressModal')">
            <img src="../assets/images/icon_close.png" alt="">
          </div>
        </div>
        <div class="body">
          <div class="ml">
            <el-form :inline="true" class="demo-form-inline">
              <div class="inpt_box">
                <!--<el-form-item label="所在地区" style="margin-bottom: 0">-->
                <label>所在地区</label>
                <el-select v-model="selectInfo.pro" placeholder="请选择"
                           @change="chooseSelectInfo(selectInfo.pro)">
                  <el-option v-for="allPro in provinceArr" :label="allPro.content"
                             :value="allPro.id"
                             :key="allPro.id"></el-option>
                </el-select>
                <el-select v-model="selectInfo.city" placeholder="请选择"
                           @change="chooseCityInfo(selectInfo.city)">
                  <el-option value=""
                             v-if="cityArr == 'undefined' || cityArr == null || cityArr == ''" v-cloak></el-option>
                  <el-option v-else
                             v-for="cityarr in cityArr"
                             :label="cityarr.content"
                             :value="cityarr.id"
                             :key="cityarr.id"
                  ></el-option>
                </el-select>
                <el-select v-model="selectInfo.area" placeholder="请选择" @change="chooseAreaInfo">
                  <el-option value=""
                             v-if="areaArr == 'undefined' || areaArr == null || areaArr == ''" v-cloak></el-option>
                  <el-option v-else
                             v-for="areaarr in areaArr"
                             :label="areaarr.content"
                             :value="areaarr.id"
                             :key="areaarr.id"
                  ></el-option>
                </el-select>
                <!--</el-form-item>-->
                <div class="hintText" v-if="hintFlag">请选择收货地址</div>
              </div>

              <div class="inpt_box" :class="{erro: errorText === 0}">
                <label>详细地址</label>
                <input type="text" class="form_control" placeholder="请输入你的详细地址" :class="{active: focusIndex === 0}"
                       v-model="form.detailAdress" @focus="chooseInputColor(0)" @blur="closeInputColor">
                <div class="erroTexts" v-if="errorFlag1">{{errotext}}</div>
              </div>
              <div class="inpt_box" :class="{erro: errorText === 1}">
                <label>收件人</label>
                <!--authFlag -->

                <input type="text" class="form_control" placeholder="请输入收件人姓名" :class="{active: focusIndex === 1}"
                       v-model="form.name" @focus="chooseInputColor(1)" @blur="closeInputColor">
                <div class="erroTexts" v-if="errorFlag2">{{errotext}}</div>
              </div>
              <div class="inpt_box" :class="{erro: errorText === 2}">
                <label>手机号码</label>
                <input type="text" class="form_control" placeholder="请输入收件人联系电话" :class="{active: focusIndex === 2}"
                       v-model="myInfo.actPhone" @focus="chooseInputColor(2)" @blur="closeInputColor">
                <div class="erroTexts" v-if="errorFlag3">{{errotext}}</div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="footer" style="text-align: right">
          <el-button type="primary" style="margin-right: 20px;margin-top: 13px" :loading="loading"
                     @click="addAdressInfo">保存并使用
          </el-button>
          <!--<el-button type="success" style="width: 106px;height: 36px;line-height: 0;margin-right: 20px;margin-top: 13px"-->
          <!--@click="addAdressInfo">保存并使用-->
          <!--</el-button>-->
        </div>
      </div>
    </div>

    <div class="m_modal" id="fixedModal">
      <div class="modal" id="modalAnmation" style="width: 420px;height: 192px;">
        <div class="head">
          <h1>提示</h1>
          <div class="close_con" @click="closeModal('fixedModal,modalAnmation')">
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
          <el-button style="width: 136px;margin-top: 12px;margin-right: 20px;" id="gotoPage">确定</el-button>
        </div>
      </div>
    </div>

    <div class="m_modal" id="orderYet">
      <div class="modal" id="orderYetModal" style="width: 420px;height: 192px;">
        <div class="head">
          <h1>提示</h1>
          <!--<div class="close_con" @click="closeModal('fixedModal,modalAnmation')">-->
          <!--<img src="../assets/images/icon_close.png" alt="">-->
          <!--</div>-->
        </div>
        <div class="body">
          <div class="newHint">
            <span><img src="../assets/images/icon_tishi.png" alt=""></span>
            <div class="errorHintTexts">{{errotext}}</div>
          </div>
        </div>
        <div class="footer" style="text-align: right">
          <el-button style="width: 118px;margin-top: 12px;" @click="gotoMyHome">去首页</el-button>
          <el-button type="success" style="width: 118px;margin-top: 12px;margin-right: 20px;" @click="gotoMorderList">
            查看我的订单
          </el-button>
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

  export default {
    name: 'buy',
    data () {
      return {
        xckz_mall_status: '',
        token: '',
        timestamp: '',
        focusIndex: '',
        errorText: '',
        remark: '',
        orderAddrId: '',
        timer: '',
        photo_tip: '',
        leaseholdTypeName: '',
        dialogImageUrl: '',
        codeErrorText: '',
        errotext: '请填入详细地址',
        codeStatus: '发送验证码',
        dateIndex: 0,
        parentId: 2,
        sorts: 0,
        counts: 60,
        cartSource: null,
        repayDate: null,
        hintTextFlag: true,
        agreeFlag: true,
        hintFlag: false,
        defaulted: false,
        loading: false,
        isTop: false,
        subLoading: false,
        errorFlag1: false,
        errorFlag2: false,
        errorFlag3: false,
        dialogVisible: false,
        isApproval: true,
        isSend: false,
        cartOrderList: [],
        provinceArr: [],
        cityArr: [],
        areaArr: [],
        adressArr: [],
        datearr: [],
        feeLimit: [],
        myInfo: [],
        pic: [],
        fileList: [],
        selectInfo: {
          pro: '',
          city: '',
          area: ''
        },
        form: {
          detailAdress: '',
          name: '',
          phone: ''
        },
        defaultImg: {
          zip: require('../assets/images/zips.png'),
          pdf: require('../assets/images/pdfs.png')
        },
        codeText: ''
      }
    },
    components: {
      custom_service: custom_service,
    },
    methods: {
      watchCode() {
        if(!this.codeText){
          $('.ipt_one input').css('border-color', '#FF4949');
          this.codeErrorText = '请输入验证码信息'
        }else if(!allMethods.captchaReg.test(this.codeText)){
          $('.ipt_one input').css('border-color', '#FF4949');
          this.codeErrorText = '请输入6位验证码'
        }else{
          $('.ipt_one input').css('border-color', '#6ECC66');
          this.codeErrorText = '';
        }
      },
      countDown(){
        this.isSend = true;
        var vm = this;
        this.timer = setInterval(function () {
          if (vm.counts === 1 || vm.counts < 1) {
            clearInterval(vm.timer);
            vm.isSend = false;
            vm.codeStatus = '重新发送';
            vm.counts = 60
          }
          vm.counts--
        }, 1000)
      },
      sendCode(){
        var vm = this;
        $(".detease-box").show();
        initNECaptcha({
          captchaId: 'fd7d9c65701c4b33a0a73740591119b3',
          element: '#deteaseVerify',
          mode: 'embed',
          width: 320,
          onVerify: function (err, data) {
            if (!err) {
              $(".detease-box").hide();
              let arr = {
                validate: data.validate,
                token: vm.token,
                initTime: new Date().getTime()
              };
              vm.$http.post('/order/sendSubmitOrderCode', arr)
                .then(function (reg) {
                  if (reg.data.code == 1000) {
                    vm.countDown()
                  } else {
                    vm.$message({
                      message: reg.data.msg,
                      type: 'warning'
                    });
                  }
                })
            }
          },
        })
      },
      isNeedApproval(){
        var vm = this;
        this.$http.get('/approval/needApproval', {params: {token: this.token}}).then(function (res) {
          if (Number(res.data.code) === 1000) {
            if (res.data.data == 0) {
              vm.isApproval = true;
            } else if (res.data.data == 1) {
              vm.isApproval = false;
            }
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadFileSuccess(response, file, fileList){
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isZip = (file_name === 'RAR' || file_name === 'ZIP');
        const isPdf = (file_name === 'PDF');
        if (isZip) {
          file.url = this.defaultImg.zip;
        } else if (isPdf) {
          file.url = this.defaultImg.pdf
        }
        if (Number(response.code) === 1000) {
          this.pic.push({fileName: response.data.fileName, fileUrl: response.data.fileUrl});
        }
      },
      removeFile(file, fileList){
        $(".el-upload").show();
        var newfile = file;

        for (var i = 0; i < this.pic.length; i++) {
          if (this.pic[i].fileName === newfile.name) {
            this.pic.splice(i, 1)
          }
        }


      },
      changeFile(file, fileList){
        this.photo_tip = '';
        if (fileList.length >= 6) {
          $(".el-upload").hide();
        }
      },
      exceedNum(file, fileList){
        this.photo_tip = '最多支持上传6张!';
      },
      beforeAvatarUpload(file) {
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isZip = (file_name === 'RAR' || file_name === 'ZIP' || file_name === 'PDF');
        const isJPG = (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG && !isZip) {
          this.photo_tip = '文件只能是 png、jpg、jpeg、pdf、zip、rar 格式!';
          return isZip && isJPG;
        }
        if (!isLt2M) {
          this.photo_tip = '文件大小超过限制，请压缩后再上传';
          return isLt2M
        }
      },
      UploadUrl(){
        return allMethods.API + '/common/uploadFile';
      },
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
      getAgreeFlag(){
        this.agreeFlag = !this.agreeFlag;
      },
      gotoFreeDeposit(){
        this.$router.push('./freeDeposit');
      },
      gotoPromoteQuota(){
        this.$router.push({path: './freeDeposit', query: {to: 'promoteQuota'}});
      },
      getFeeLimitInfo(){
        var that = this;
        this.$http.get('/order/feeLimit', {params: {token: this.token}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.feeLimit = data.data.data;
          }
        })
      },
      getcheckRepay(){
        var that = this;
        this.$http.get('/order/checkRepay', {params: {token: this.token}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.datearr = data.data.data;
            if (!that.datearr.hasRepay) {
              that.repayDate = that.datearr.repayTimes[0];
            } else {
              that.repayDate = null;
            }
          }
        })
      },
      chooseDateInfo(index, key){
        this.dateIndex = index;
        this.repayDate = key;
      },
      getAllReceiveAdress(){
        var that = this;
        this.$http.get('/order/getAddr', {
          params: {
            token: this.token,
            initTime: new Date().getTime()
          }
        }).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.adressArr = data.data.data;
          }
        })
      },
      getCartOrderList(){
        var that = this;
        this.$http.get('/order/carts', {params: {token: this.token, timestamp: this.timestamp}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.cartOrderList = data.data.data;
            that.cartSource = data.data.data.source;
          } else if (Number(data.data.code) === 2120) {
            $('#fixedModal').show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(120)
            }, 120);
            that.errotext = '提交订单记录超时，请稍重新提交';
            $('#gotoPage').click(function () {
              $("#modalAnmation").slideUp(120);
              setTimeout(function () {
                $('#fixedModal').hide();
              }, 220);
              that.$router.push('/cart')
            })
          } else if (Number(data.data.code) === 2132) {
            that.errotext = '订单已经提交，请勿重新提交';
            $("#orderYet").show();
            setTimeout(function () {
              $("#orderYetModal").slideDown(120)
            }, 120);
          }
        })
      },

      closeModal(bg, modal){
        $("#" + modal).slideUp(120);
        setTimeout(function () {
          $("#" + bg).hide();
        }, 220)
      },
      getMyAccount(){
        var that = this;
        this.$http.get('/account/myAccount', {params: {token: this.token}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.myInfo = data.data.data;
            if (data.data.data.authFlag) {
              that.form.name = data.data.data.name;
            } else {
              that.form.name = '';
            }
          }
        })
      },
      addNewAdress(){
        this.selectInfo.pro = '';
        this.selectInfo.city = '';
        this.selectInfo.area = '';
        this.form.detailAdress = '';
        if (this.myInfo.authFlag) {
          this.form.name = this.myInfo.name;
        } else {
          this.form.name = '';
        }

        $("#addAdressModal").show();
        setTimeout(function () {
          $("#adressModal").slideDown(200)
        }, 200);
        this.getMyAccount();
        this.getAllCityInfo();
      },
      getAllCityInfo(){
        var that = this;
        this.$http.get('/common/linkage', {params: {parentId: this.parentId}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.provinceArr = data.data.data;
          }
        })
      },
      chooseSelectInfo(pro){
        var that = this;
        this.hintFlag = false;
        this.$http.get('/common/linkage', {params: {parentId: pro}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.selectInfo.city = '';
            that.selectInfo.area = '';
            that.areaArr = [];
            that.cityArr = data.data.data;
          }
        })
      },
      chooseCityInfo(cityid){
        var that = this;
        this.hintFlag = false;
        this.$http.get('/common/linkage', {params: {parentId: cityid}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.selectInfo.area = '';
            that.areaArr = data.data.data;
          }
        })
      },
      chooseAreaInfo(){
        this.hintFlag = false;
      },
      chooseInputColor(num){
        this.errorFlag1 = false;
        this.errorFlag2 = false;
        this.errorFlag3 = false;
        this.hintFlag = false;
        this.errorText = '';
        this.errotext = '';
        this.focusIndex = num;
      },
      closeInputColor(){
        this.focusIndex = '';
      },
      addAdressInfo(){
        if (!this.selectInfo.pro || !this.selectInfo.city || !this.selectInfo.area) {
          this.hintFlag = true;
          return;
        }
        if (!this.form.detailAdress) {
          this.errorText = 0;
          this.errorFlag1 = true;
          this.errotext = '请输入详细地址';
          return
        }
        if (!this.form.name) {
          this.errorText = 1;
          this.errorFlag2 = true;
          this.errotext = '请输入收件人姓名';
          return;
        }
        if (!this.myInfo.actPhone) {
          this.errorText = 2;
          this.errorFlag3 = true;
          this.errotext = '请输入收件人手机号码';
          return
        }
        if (!allMethods.phoneReg.test(this.myInfo.actPhone)) {
          this.errorText = 3;
          this.errorFlag3 = true;
          this.errotext = '请输入正确的手机号码';
          return;
        }
        var arr = {
          provinceId: this.selectInfo.pro,
          cityId: this.selectInfo.city,
          districtId: this.selectInfo.area,
          detailAddress: this.form.detailAdress,
          receiver: this.form.name,
          contactPhone: this.myInfo.actPhone,
          token: this.token
        }
        this.loading = true;
        var that = this;
        this.$http.post('/order/addAddr', arr).then(function (data) {
          that.loading = false;
          if (Number(data.data.code) === 1000) {
            that.closeModal('addAdressModal', 'adressModal');
            that.initGetAddr();
          } else {
            $('#fixedModal').show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(120)
            }, 120);
            that.errotext = '收货地址添加失败，请稍后重试';
            $('#gotoPage').click(function () {
              $('#fixedModal').hide();
              $('#modalAnmation').hide();
            })
          }
        })
      },

      initGetAddr(){
        var that = this;
        that.$http.get('/order/getAddr', {
          params: {
            token: that.token,
            initTime: new Date().getTime()
          }
        }).then(function (data) {
          if (Number(data.data.code) === 1000) {
            that.adressArr = data.data.data;
            that.initAdressInfo(that.adressArr);
          }
        })
      },

      initAdressInfo(datas){
        var dataLength = datas.length - 1;
        for (var i = 0; i < datas.length; i++) {
          if (i == dataLength) {
            datas[i].defaulted = true;
          } else {
            datas[i].defaulted = false;
          }
        }
      },
      chooseAdressId(datas){
        datas.defaulted = !datas.defaulted;
        if (datas.defaulted) {
          this.getChooseAdress(this.adressArr);
          datas.defaulted = true;
        }
      },
      getChooseAdress(datas){
        for (var i = 0; i < datas.length; i++) {
          datas[i].defaulted = false;
        }
      },
      sortImg(){
        for (var i = 0; i < this.pic.length; i++) {
          this.pic[i]['sort'] = i
        }
        return this.pic;
      },
      submitOrderList(){
        for (var i = 0; i < this.adressArr.length; i++) {
          if (this.adressArr[i].defaulted) {
            this.orderAddrId = this.adressArr[i].id;
          }
        }
        if (this.orderAddrId == '' || this.orderAddrId == null || this.orderAddrId == 'undefined') {
          $('#fixedModal').show();
          setTimeout(function () {
            $("#modalAnmation").slideDown(200)
          }, 200);
          this.errotext = '请选择收货地址哦';
          $('#gotoPage').click(function () {
            $('#fixedModal').hide();
            $('#modalAnmation').hide();
          });
          return;
        }
        if (!this.agreeFlag) {
          this.errotext = '请先同意小虫快租租赁合同，和服务收取协议';
          $("#fixedModal").show();
          setTimeout(function () {
            $("#modalAnmation").slideDown(120)
          }, 120);
          $("#gotoPage").click(function () {
            $("#modalAnmation").slideUp(120);
            setTimeout(function () {
              $("#fixedModal").hide();
            }, 220);
          });
          return;
        }
        if (this.remark.length > 280) {
          this.errotext = '备注信息不能超过280个字符哦~，请重新编辑';
          $("#fixedModal").show();
          setTimeout(function () {
            $("#modalAnmation").slideDown(120)
          }, 120);
          $("#gotoPage").click(function () {
            $("#modalAnmation").slideUp(120);
            setTimeout(function () {
              $("#fixedModal").hide();
            }, 220);
          });
          return;
        }
        if(!this.codeText){
          this.errotext = '请输入短信验证码';
          $("#fixedModal").show();
          setTimeout(function () {
            $("#modalAnmation").slideDown(120)
          }, 120);
          $("#gotoPage").click(function () {
            $("#modalAnmation").slideUp(120);
            setTimeout(function () {
              $("#fixedModal").hide();
            }, 220);
          });
          return;
        }
        var orderFile = this.sortImg();
        this.subLoading = true;
        var that = this;
        var orderCreateVo = {
          agree: this.agreeFlag,
          captcha: this.codeText,
          mark: this.remark,
          orderAddrId: this.orderAddrId,
          orderFile: orderFile,
          repayDate: this.repayDate,
          timestamp: this.timestamp,
          token: this.token
        };
        this.$http.post('/order/submit', JSON.stringify(orderCreateVo), {headers: {'Content-Type': 'application/json'}}).then(function (data) {
          that.subLoading = false;
          if (Number(data.data.code) === 1000) {
            var res = data.data.data;
            if (!res.approvalStatus || res.approvalStatus == 0 || res.approvalStatus == 2) {
              that.$router.push({path: '/pay', query: {type: 'orderPay', id: data.data.data.orderNo}})
            } else if (res.approvalStatus == 1 || res.approvalStatus == 3) {
              that.$router.push('/myOrder')
            }
          } else if (Number(data.data.code) === 2120) {
            that.errotext = '提交订单超时，请稍后再试';
            $("#fixedModal").show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(120)
            }, 120);
            $("#gotoPage").click(function () {
              $("#modalAnmation").slideUp(120);
              setTimeout(function () {
                $("#fixedModal").hide();
              }, 220);
            });
          } else if (Number(data.data.code) === 2100) {
            if (that.cartSource == 'goods') {
              that.errotext = '该商品已经下架，请重新下单';
              $("#fixedModal").show();
              setTimeout(function () {
                $("#modalAnmation").slideDown(120)
              }, 120);
              $("#gotoPage").click(function () {
                $("#modalAnmation").slideUp(120);
                setTimeout(function () {
                  $("#fixedModal").hide();
                }, 220);
                that.$router.push('/list');
              });
            } else if (that.cartSource == 'cart') {
              that.errotext = '部分商品已下架，请重新购买';
              $("#fixedModal").show();
              setTimeout(function () {
                $("#modalAnmation").slideDown(120)
              }, 120);
              $("#gotoPage").click(function () {
                $("#modalAnmation").slideUp(120);
                setTimeout(function () {
                  $("#fixedModal").hide();
                }, 220);
                that.$router.push('/cart');
              });
            }
          } else {
            that.errotext = data.data.msg;
            $("#fixedModal").show();
            setTimeout(function () {
              $("#modalAnmation").slideDown(120)
            }, 120);
            $("#gotoPage").click(function () {
              $("#modalAnmation").slideUp(120)
              setTimeout(function () {
                $("#fixedModal").hide();
              }, 220);
            });
          }
        })
      },
      gotoMorderList(){
        this.errotext = '';
        $("#orderYetModal").slideUp(120)
        setTimeout(function () {
          $("#orderYet").hide();
        }, 220);
        this.$router.push('/myOrder')
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
      gotoMyHome(){
        this.errotext = '';
        $("#orderYetModal").slideUp(120)
        setTimeout(function () {
          $("#orderYet").hide();
        }, 220);
        this.$router.push('/')
      },

    },
    created(){
      this.returnTOp();
      this.token = localStorage.getItem('xckz_mall');
      this.timestamp = allMethods.GetQueryString('submitid');
      this.xckz_mall_status = localStorage.getItem('xckz_mall_status');
      this.isNeedApproval();
      this.getCartOrderList();
      this.getAllReceiveAdress();
      this.getcheckRepay();
      this.getFeeLimitInfo();
    }
  }
</script>

<style scoped lang="scss">
  .photo_tip {
    display: block;
    color: red;
    font-size: 14px;
    margin-top: 15px;
  }

  .mB28 {
    margin-bottom: 26px;
  }

  .el-select-dropdown__item.selected {
    color: #6ECC66;
  }

  .head_all .head {
    clear: inherit;
    background-color: #ffffff;
  }

  .head_all .footer {
    background-color: #fff;
    text-align: left;
    padding: 0;
  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .el-upload:hover {
    border-color: #409EFF;
  }

  .upload-demo {
    display: inline;
  }

  .upload-demo .el-upload {
    width: 100px;
    height: 100px;
    line-height: 100px;
    border: 1px solid #EEEEEE;

  }

  .format {
    display: inline-block;
    vertical-align: bottom;
    color: #999999;
    font-size: 12px;
    margin-left: 30px;
  }

</style>
