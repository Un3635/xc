<template>
    <d2-container>
        <template slot="header">提币订单审核 <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="withdraw-service">
            <div class="title">提币订单审核</div>
            <div class="info-box">
                <ul class="info">
                    <li>
                        <span>用户ID：</span>
                        <p>{{dataList.userId}}</p>
                    </li>
                    <li>
                        <span>用户账号：</span>
                        <p>{{dataList.userMobile}}</p>
                    </li>
                    <li>
                        <span>用户昵称：</span>
                        <p>{{dataList.userNickName}}</p>
                    </li>
                    <li>
                        <span>提币地址：</span>
                        <p>{{dataList.coinConstractAddress}}</p>
                    </li>
                </ul>
                <ul class="info info-below">
                    <li>
                        <span>订单编号：</span>
                        <p>{{dataList.id}}</p>
                    </li>
                    <li>
                        <span>订单生成时间：</span>
                        <p>{{dataList.createTime}}</p>
                    </li>
                    <li>
                        <span>提币金额及币种：</span>
                        <p>{{dataList.operateAmount}}</p>
                        <span style="padding-left:60px;">实际手续费：</span>
                        <p>{{dataList.realityGasCharge}}</p>
                        <span style="padding-left:60px;">扣除手续费：</span>
                        <p>{{dataList.gasCharge}}</p>
                    </li>
                    <li>
                        <span>订单状态：</span>
                        <p>{{dataList.status}}</p>
                    </li>
                    <li class="remark-li">
                        <span>备注：</span>
                        <p class="remark">{{dataList.remark}}</p>
                    </li>
                </ul>
            </div>
            <div class="operate" v-if="btnDisabled">
                <h3>客服处理</h3>
                <ul class="operate-list">
                    <li class="operate-item">
                        <span class="item-tit">客服工号</span>
                        <span class="item-txt">{{userInfoId}}</span>
                    </li>
                    <li  class="operate-item">
                        <span class="item-tit">处理结果</span>
                        <el-button-group class="operate-btn">
                            <el-button type="info" plain
                                       v-for="item,index in statusBtn"
                                       :key="index"
                                       :class="{'btnActive':statusBtnActive === index}"
                                       @click.native="changeStatusBtnActive(index)">
                                      {{item}}
                            </el-button>
                        </el-button-group>
                    </li>
                    <li  class="operate-item textarea-box" v-if="statusBtnActive === 1">
                        <div class = "text-box">
                            <span class="item-tit">驳回理由</span>
                            <textarea placeholder="请输入驳回理由" maxlength="500" @input="descInput" v-model="desc"/>
                            <span class="numberV">{{txtVal}}/500</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="result-btn" v-if="btnDisabled">
                <el-button type="info" plain class="cancel-btn" @click="$router.go(-1)">取消</el-button>
                <el-button type="info" plain class="save-btn" @click="confirm">保存</el-button>
            </div>
            <div class="result-btn" v-else>
                <el-button type="info" plain class="cancel-btn" @click="$router.go(-1)">返回</el-button>
            </div>
        </div>
    </d2-container>
</template>

<script>
    import d2admin from "../../../../store/modules/d2admin";
    import util from '@/libs/util.js'
    export default {
      name: "service",
      data(){
        return{
          statusBtnActive:0,
          statusBtn:['审核通过','审核未通过'],
          txtVal: 0,
          desc:"",
          recordId:'',
          userInfoId:'',
          dataList:[],
          btnDisabled:false,
          //权限
          userAuthorityAll:[],
          isSuper:''
        }
      },
      methods:{
        //设置按钮禁用
        setDisabledBtn(){
          if(util.cookies.get('userAuthorityAll')){
            this.userAuthorityAll = JSON.parse(util.cookies.get('userAuthorityAll'));
          }
          this.isSuper = util.cookies.get('isSuper');
          if (Number(this.isSuper) === 1 || (util.cookies.get('userAuthorityAll') && this.userAuthorityAll.indexOf('manager.order.withdraw') !== -1)) {
            this.btnDisabled = true;
          } else {
            this.btnDisabled = false;
          }
        },
        //文本框字数
        descInput() {
            this.txtVal = this.desc.length;
        },
        //弹窗
        confirm() {
            let that = this;
            if (!this.statusBtnActive) {
                this.$confirm('通过', '审核结果确认', {
                    iconClass: '',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    center:true
                }).then(() => {
                    this.getServiceResult(this.recordId,1,'');
                    setTimeout(function(){
                      that.$router.replace('/order/withdraw');
                    },1000)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '未保存处理结果'
                    });
                });
            } else if ( this.statusBtnActive === 1 && this.desc !== '') {
                this.$confirm('未通过', '审核结果确认', {
                    iconClass: '',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    center:true
                }).then(() => {
                    this.getServiceResult(this.recordId,2,this.desc);
                    setTimeout(function(){
                        that.$router.replace('/order/withdraw');
                    },1000)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '未保存处理结果'
                    });
                });
            } else if (this.statusBtnActive === 1 && this.desc === '') {
                this.$message.error( '请填写驳回理由');
            }
        },
        //切换按钮组
        changeStatusBtnActive(index){
            for(var i=0; i<this.statusBtn.length; i++){
                this.statusBtnActive = index;
            }
        },
        //获取提币订单详情
        getWithdrawService(recordId){
          let vm = this;
          this.axiosGET(vm, vm.$API.API.withdrawDetail,
            'application/x-www-form-urlencoded',
            {recordId},
            vm.getSuccessCB,
            vm.getErrorCB
          )
        },
        //成功回调
        getSuccessCB(vm,res){
          if(!res.data || res.data === ''){
            vm.dataList = [];
          } else {
            vm.setData(res.data);
          }
        },
        //失败回调
        getErrorCB(err){
          console.log(err)
        },
        //设置数据
        setData(_data){
          let list = [];
          if(!_data.userId || _data.userId === ''){  //用户id
            list.userId = '-';
          } else {
            list.userId = _data.userId;
          }
          if(!_data.userMobile || _data.userMobile === ''){  //用户账号
            list.userMobile = '-';
          } else {
            list.userMobile = _data.userMobile;
          }
          if(!_data.userNickName || _data.userNickName === ''){ //用户昵称
            list.userNickName = '-';
          } else {
            list.userNickName = _data.userNickName;
          }
          if(!_data.id || _data.id === ''){ //订单编号
            list.id = '-';
          } else {
            list.id = _data.id;
          }
          if(!_data.createTime || _data.createTime === ''){  //创建时间
            list.createTime = '-';
          } else {
            list.createTime = _data.createTime;
          }
          if(!_data.operateAmount || _data.operateAmount === ''){ //充值金额及币种
            list.operateAmount = '-';
          } else {
            list.operateAmount = _data.operateAmount + _data.coinAbbreviation;
          }
          if(!_data.realityGasCharge || _data.realityGasCharge === ''|| _data.realityGasCharge === '0'){  //实际手续费
            list.realityGasCharge = '0';
          } else {
            list.realityGasCharge = _data.realityGasCharge + _data.coinAbbreviation;
          }
          if(!_data.gasCharge || _data.gasCharge === '' || _data.gasCharge === '0'){  //扣除手续费
            list.gasCharge = '0';
          } else {
            list.gasCharge = _data.gasCharge + _data.coinAbbreviation;
          }
          if(_data.status === 1){ //订单状态
            list.status = '处理中';
          } else if (_data.status === 2){
            list.status = '异常';
          } else if (_data.status === 3){
            list.status = '成功';
          } else if (_data.status === 4){
            list.status = '失败';
          }if (_data.status === 5){
            list.status = '审核中';
          } else {
            list.status = '审核未通过';
          }
          if(!_data.coinConstractAddress || _data.coinConstractAddress === ''){ //提币地址
            list.coinConstractAddress = '-';
          } else {
            list.coinConstractAddress = _data.coinConstractAddress;
          }
          if(!_data.operateUserId || _data.operateUserId === ''){ //客服工号
            list.operateUserId = '-';
          } else {
            list.operateUserId = _data.operateUserId;
          }
          if(!_data.remark || _data.remark === ''){ //备注
            list.remark = '-';
          } else {
            list.remark = _data.remark;
          }
          this.dataList = list;
        },
        //获取客服处理详情
        getServiceResult(recordId,type,comment){
          let vm = this;
          this.axiosPOST(vm, vm.$API.API.withdrawAudit,
            'application/x-www-form-urlencoded',
            {recordId,type,comment},
            vm.getServiceSuccessCB,
            vm.getErrorCB
          )
        },
        //客服处理成回调
        getServiceSuccessCB(){}
      },
      mounted(){
        this.userInfoId = util.cookies.get('userInfoId');
        this.recordId = this.$route.query.recordId;
        this.getWithdrawService(this.recordId);
        this.setDisabledBtn();
      }
    }
</script>

<style scoped lang="scss">
    .withdraw-service{
        width:100%;
        text-align:center;
        margin:0 auto 50px;
        .title{
            width:100%;
            margin:30px auto 20px;
            font-size:18px;
            text-align:center;
            font-weight:600;
        }
        .info-box{
            padding:60px 200px 0;
            text-align:left;
            .info{
                width:450px;
                text-align:center;
                padding:0 30px;
                border:1px solid #d9d9d9;
                li{
                    list-style:none;
                    width:100%;
                    height:60px;
                    text-align:left;
                    span{
                        display:inline-block;
                        font-size:14px;
                        font-weight:700;
                        line-height:60px;
                        padding-right:10px;
                        color:#525252;
                    }
                    p{
                        display:inline-block;
                        font-size:14px;
                        line-height:60px;
                        color:#808080;
                    }
                }
            }
            .info-below{
                width:750px;
                border:0;
                overflow: hidden;
                .remark-li{
                    padding-bottom:30px;
                    &:after{
                        display:block;
                        clear:both;
                        content:"";
                        visibility:hidden;
                        height:0
                    }
                    span{
                        vertical-align: top;
                        float:left;
                    }
                    .remark{
                        padding-top:18px;
                        width:680px;
                        display:inline-block;
                        line-height:24px;
                        text-align:justify;
                        text-justify: inter-ideograph;
                    }
                }
            }
        }
        .operate{
            margin:0 auto;
            padding:30px 200px 0;
            text-align:left;
            h3{
                width:100%;
                margin:0 auto;
                text-align:center;
                display:inline-block;
                height:70px;
                font-size:15px;
                line-height:70px;
                border-bottom:1px solid #d9d9d9;
            }
            .operate-list{
                width:100%;
            }
        }
        .operate-item{
            width:100%;
            height:60px;
            list-style:none;
            text-align:left;
            .item-tit{
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                font-weight: 700;
                line-height: 60px;
                padding-right: 10px;
                color: #525252;
            }
            .item-txt{
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                line-height: 60px;
                color: #808080;
            }
            .operate-btn{
                display:inline-block;
                vertical-align: top;
                margin-top:10px;
            }
        }
        .textarea-box{
            min-height:165px;
            text-align:left;
            .text-box{
                position:relative;
                width:800px;
                .item-tit{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 60px;
                    padding-right: 10px;
                    color: #525252;
                }
                textarea{
                    display: inline-block;
                    vertical-align: top;
                    width:600px;
                    color:#525252;
                    min-height:120px;
                    margin-top:23px;
                    padding:10px 12px;
                    font-size:14px;
                    border:1px solid #d9d9d9;
                    font-family: "Microsoft YaHei";
                    &::-webkit-input-placeholder{
                        font-family: "Microsoft YaHei";
                        font-weight:400;
                        color:#ccc;
                    }
                }
                .numberV{
                    position:absolute;
                    right:120px;
                    bottom:15px;
                    color:#9e9e9e;
                }
            }
        }
        .result-btn{
            margin:40px auto 0;
            text-align:center;
        }
        .cancel-btn,.save-btn{
            display:inline-block;
            width:76px;
            height:36px;
            padding:6px 20px;
            span{
                line-height:36px;
                vertical-align:top;
            }
        }
    }
</style>