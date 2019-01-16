<template>
    <d2-container>
        <template slot="header">提币订单详情 <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="withdraw-detail">
            <div class="title">提币订单详情</div>
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
                    <li>
                        <span>提币地址：</span>
                        <p>{{dataList.to}}</p>
                    </li>
                    <!--<li class="remark-li">
                        <span>备注：</span>
                        <p class="remark">{{dataList.remark}}</p>
                    </li>-->
                </ul>
            </div>
            <div class="operate">
                <h3>处理记录</h3>
                <ul class="operate-list">
                    <li class="operate-item">
                        <span class="item-txt">{{dataList.updateTime}}</span>
                        <span class="item-txt">客服工号   {{dataList.operateUserId}}</span>
                        <span class="item-txt">{{dataList.status}}</span>
                    </li>
                    <li class="operate-item">
                        <span class="item-txt-tit">审核备注：</span>
                        <span class="item-txt-box">{{dataList.comment}}</span>
                    </li>
                </ul>
            </div>
            <div class="button-box">
                <el-button type="info" plain class="return-btn" @click="$router.go(-1)">返回</el-button>
            </div>

        </div>
    </d2-container>
</template>

<script>
  import util from '@/libs/util.js'
  export default {
    name: "withdrawDetail",
    data(){
      return{
        txtVal: 0,
        desc: "",
        recordId:'',
        dataList:[]
      }
    },
    methods:{
      descInput(){
        this.txtVal = this.desc.length;
      },
      //获取提币订单详情
      getWithdrawDetail(recordId){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.withdrawDetail,
          'application/x-www-form-urlencoded',
          { recordId},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          vm.dataList = []
        } else {
          vm.setData(res.data)
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
        } else if(_data.status === 5){
          list.status = '审核中';
        } else {
          list.status = '审核未通过';
        }
        if(!_data.to || _data.to === ''){ //提币地址
          list.to = '-';
        } else {
          list.to = _data.to;
        }
        if(!_data.updateTime || _data.updateTime === ''){ //客服处理时间
          list.updateTime = '-';
        } else {
          list.updateTime = _data.updateTime;
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
        if(!_data.comment || _data.comment === ''){ //拒绝理由
          list.comment = '-';
        } else {
          list.comment = _data.comment;
        }
        this.dataList = list;
      }
    },
    mounted(){
      this.recordId = this.$route.query.recordId;
      this.getWithdrawDetail(this.recordId)
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
    .withdraw-detail{
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
                width:400px;
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
            @include clearfix;
            .item-txt{
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                line-height: 60px;
                color: #808080;
                padding-right:40px;
            }
            .item-txt-tit{
                float:left;
                width:70px;
                display:inline-block;
                vertical-align: top;
                font-size: 14px;
                line-height: 30px;
                color: #808080;
                padding-right:20px;
                min-height:50px;
            }
            .item-txt-box{
                width:650px;
                float:left;
                display:inline-block;
                vertical-align: top;
                font-size: 14px;
                line-height: 30px;
                color: #808080;
            }
        }
        .button-box{
            display: inline-block;
            width:100%;
            margin: 0 auto;
            text-align:center;
            .return-btn{
                margin:50px auto 0;
            }
        }

    }
</style>