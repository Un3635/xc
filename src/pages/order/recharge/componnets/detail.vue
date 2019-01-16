<template>
    <d2-container>
        <template slot="header" style="font-size:18px;font-weight:800;">充值订单 <i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="recharge-detail">
            <template slot="header" style="font-size:18px;font-weight:800;">充值订单</template>
            <div class="title">充值订单详情</div>
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
                        <span>充值金额及币种：</span>
                        <p>{{dataList.operateAmount}}</p>
                    </li>
                    <li>
                        <span>订单状态：</span>
                        <p>{{dataList.status}}</p>
                    </li>
                    <li>
                        <span>区块链交易ID：</span>
                        <p>{{dataList.txid}}</p>
                    </li>
                    <!--<li class="remark-li">
                        <span>备注：</span>
                        <p class="remark">{{dataList.remark}}</p>
                    </li>-->
                </ul>
            </div>
            <el-button type="info" plain class="return-btn" @click="$router.go(-1)">返回</el-button>
        </div>
    </d2-container>
</template>

<script>
    export default {
      name: "Detail",
      data(){
        return {
          recordId: '',
          dataList:[]
        }
      },
     methods:{
     //获取充值订单详情
     getRechargeDetail(recordId){
       let vm = this;
       this.axiosGET(vm, vm.$API.API.rechargeDetail,
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
           if(_data.status === 1){ //订单状态
             list.status = '处理中';
           } else if (_data.status === 2){
             list.status = '异常';
           }else if (_data.status === 3){
             list.status = '完成';
           } else if (_data.status === 4){
             list.status = '失败';
           } else if (_data.status === 5){
             list.status = '审核中';
           }else if (_data.status === 6){
             list.status = '审核未通过';
           }else {
             list.status = '其他';
           }
           if(!_data.txid || _data.txid === ''){ //区块链id
             list.txid = '-';
           } else {
             list.txid = _data.txid;
           }
         if(!_data.remark || _data.remark === ''){ //备注
           list.remark = '-';
         } else {
           list.remark = _data.remark;
         }
           this.dataList = list;
       }
   },
     mounted(){
       this.recordId = this.$route.query.recordId;
       this.getRechargeDetail(this.recordId)
     }
    }
</script>

<style scoped lang="scss">
    .recharge-detail{
        width:100%;
        text-align:center;
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
                width:350px;
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
                    padding-bottom:50px;
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
        .return-btn{
            width:70px;
            height:30px;
            margin:10px auto 20px;
            padding:6px 20px;
            span{
                line-height:30px;
                vertical-align:top;
            }
        }
    }
</style>