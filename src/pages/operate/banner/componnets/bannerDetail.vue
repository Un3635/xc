<template>
    <d2-container>
        <template slot="header"><span></span>banner查看<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <div class="detail-list">
                <li class="name">查看</li>
                <ul class="items">
                    <li class="item">
                        <span class="title">标题：</span>
                        <span class="text">{{listData.title}}</span>
                    </li>
                    <li class="item">
                        <span class="title">Banner：</span>
                        <img class="pic" :src="listData.imgUrl" @click="showPicPopHandle(listData.imgUrl)"/>
                    </li>
                    <li class="item">
                        <span class="title">所属Tab：</span>
                        <span class="text">{{listData.ownTabId}}</span>
                    </li>
                    <li class="item">
                        <span class="title">上线日期：</span>
                        <span class="text">{{listData.startTime}}</span>
                    </li>
                    <li class="item">
                        <span class="title">下线日期：</span>
                        <span class="text">{{listData.endTime}}</span>
                    </li>
                    <li class="item">
                        <span class="title">排序：</span>
                        <span class="text">{{listData.sort}}</span>
                    </li>
                    <li class="item">
                        <span class="title">跳转链接：</span>
                        <span class="text">{{listData.linkType}}</span>
                    </li>
                    <li class="item" v-if="listData.linkType === '有'">
                        <span class="title">链接地址：</span>
                        <span class="text">{{listData.jumpLinkUrl}}</span>
                    </li>
                </ul>
            </div>
            <el-button type="info" plain class="return-btn" @click="$router.go(-1)">返回</el-button>
        </div>
    </d2-container>
</template>

<script>
  export default {
    name: "bannerDetail",
    data() {
      return {
        id:null,
        listData:{}, //列表数据
        pageLoading: false,//loading
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.bannerDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
     //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          this.listData =[];
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
          let obj ={};
          obj.title = _data.title ? _data.title : '-';
          obj.imgUrl = _data.imgUrl ? _data.imgUrl : '-';
          obj.ownTabId = _data.ownTabId ? _data.ownTabId : '-';
          if(_data.startTime){
            // obj.startTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data.startTime)
            obj.startTime=_data.startTime.substring(0,10);
          } else {
            obj.startTime= '-'
          }
          if(_data.endTime){
            // obj.endTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data.endTime)
            obj.endTime=_data.endTime.substring(0,10);
          } else {
            obj.endTime= '-'
          }
          obj.sort = _data.sort;
          if(_data.jumpLinkUrl && _data.jumpLinkUrl !== ''){
            obj.linkType = '有';
            obj.jumpLinkUrl =  _data.jumpLinkUrl
          } else {
            obj.linkType = '无';
          }

          this.listData = obj;
      },
      //打开弹窗
      showPicPopHandle(param){
        this.$store.commit('setShowPicPopOn',{type:'pic', content:param})
      }
    },
    mounted(){
      this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
.detail{
    text-align:center;
    margin:30px auto 50px;
    .detail-list{
        position:relative;
        border:1px solid #eee;
        border-radius:6px;
        padding:50px 30px 10px;
        .name{
            position:absolute;
            left:40px;
            top:-16px;
            padding:0 16px;
            height:30px;
            background:#fff;
            font-size:16px;
            line-height:30px;
            letter-spacing: 1px;
        }
        .items{
          .item{
                text-align:left;
            }
        }
    }
    .item{
        width:100%;
        @include clearfix;
        .title{
            float:left;
            padding-right:30px;
            width:160px;
            text-align:right;
            font-size:15px;
            color:#555;
            line-height:50px;
        }
        .text{
            float:left;
            font-size:15px;
            color:#222;
            line-height:50px;
            font-weight:200;

        }
        .pic{
            width:200px;
            border:5px solid #eee;
        }
    }
    .return-btn{
        margin:30px auto;
    }
}
</style>