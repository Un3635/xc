<template>
  <div class="repertory">
    <div class="page-title">
      <p class="txt">算力明细</p>
    </div>
    <div class="cloud-list">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="cloud-list-tab">
        <el-tab-pane label="全部明细" name=""></el-tab-pane>
        <el-tab-pane label="线下购买" name="1"></el-tab-pane>
        <el-tab-pane label="返佣奖励" name="2"></el-tab-pane>
      </el-tabs>
      <div v-if="activeName === activeCon">
        <ul class="product-list">
          <li class="product-item" v-for="(item,index) in computingList" :key="index">
            <ul class="p-tit">
              <li class="tit-item"><span>订单号</span> <span class="order-num" :title="item.id">{{item.id}}</span></li>
              <li class="tit-item">
                <span v-if="item.getType == '1'">创建时间</span>
                <span v-if="item.getType == '2'">到账时间</span>
                <span>{{item.createTime | date('YYYY-MM-DD')}}</span>
              </li>
              <li class="tit-item" v-if="item.getType == '2'">
                <span>被邀请人</span>
                <span>{{item.invitees}}</span>
              </li>
            </ul>
            <ul class="p-info">
              <li><img :src="item.imgUrl"/><span class="p-name" :title="item.name">{{item.name}}</span>
              </li>
              <li><span>{{item.size}}{{item.unit}}</span></li>
              <li><span v-if="item.getType == '1'">线下购买</span><span v-if="item.getType == '2'">返佣</span>
              </li>
              <li><span>{{item.status}}</span></li>
            </ul>
          </li>
        </ul>
        <el-pagination background
                       v-if="computingList&&computingList.length>1"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="pageData.page"
                       :page-sizes="[10,20,30,50,100,200]"
                       :page-size="pageData.size"
                       layout="prev, pager, next"
                       :total="pageData.total">
        </el-pagination>
      </div>
      <div class="nodatas" v-if="computingList && computingList.length==0">
        暂无收益
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    breadcrumb() {
      return {
        label: '算力明细',
        pList: [
          {
            path: '/p-center',
            label: '个人中心'
          },
          {
            path: '/p-center/hashCloud',
            label: '我的云算力'
          }
        ]
      }
    },
    name: 'hashRepertory',
    data() {
      return {
        activeName: '',
        activeCon: '0',
        pageData: {
          page: 1,
          size: 5,
          total: 0
        },
        computingList: []
      };
    },
    methods: {
      handleSizeChange(size) {
        this.pageData.size = size;
        this.getComputingDetailDatas();
      },
      handleCurrentChange(page) {
        this.pageData.page = page;
        this.getComputingDetailDatas();
      },
      handleClick(tab, event) {
        if (tab.name == '') {
          this.activeName = '0';
          this.activeCon = '0'
        } else {
          this.activeName = tab.name;
          this.activeCon = tab.name
        }
        this.pageData.page = 1;
        this.getComputingDetailDatas();
      },
      getComputingDetailDatas() {
        var types;
        if (this.activeName == '0') {
          types = '';
        } else {
          types = this.activeName
        }
        var arr = {
          type: types,
          page_num: this.pageData.page,
          page_size: this.pageData.size,
          initTimes: new Date().getTime()
        };
        var vm = this;
        getajaxdata(API.getComputingDetail, 'GET', arr, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.computingList = res.data;
            let re=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
            for(let i=0;i<vm.computingList.length;i++){
              if(res.data[i].invitees && re.test(res.data[i].invitees)){
                let phone = res.data[i].invitees;
                vm.computingList[i].invitees = phone.substr(0, 3) + '****' + phone.substr(7);
              }
            }
            vm.pageData.total = res.count;

          }
        }, this)
      }
    },
    mounted() {
      this.getComputingDetailDatas();
    }
  };
</script>

<style scoped lang="scss">
  @import "~/assets/css/public.scss";

  .nodatas {
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
    color: #5F5F5F;
    font-size: 14px;
  }
  .repertory {
    @include center-page-title;
    .page-title {
      border: none;
    }
    .cloud-list {
      margin: 3px 30px 0;
      .cloud-list-tab {
        width: 100%;
      }
      .el-tab-pane {
        .product-list {
          width: 100%;
        }
        .repertory-pagination {
          margin: 41px auto 16px;
        }
      }
    }
    .product-list {
      .product-item {
        width: 100%;
        margin-top: 21px;
        border: 1px solid #F0F0F0;
        .p-tit {
          width: 100%;
          height: 41px;
          background: #F5F6FA;
          @include clearfix;
        }
        .p-info {
          width: 100%;
          height: 84px;
          text-align:left;
          @include clearfix;
          &:after{
            content:'';
            clear:both;
          }
        }
      }
    }
    .p-tit {
      .tit-item {
        float: left;
        text-align:left;
        height:41px;
        padding: 0 15px;
        span {
          display:inline-block;
          vertical-align: top;
          font-size: 12px;
          color: #000;
          text-align: left;
          line-height: 41px;
          &.order-num{
            max-width:272px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:first-of-type {
             color: #9B9B9B;
             padding-right: 10px;
           }
        }
        &:first-of-type {
          width:320px;
          padding:0 0 0 15px;

        }
    }
    }
    .p-info {
      li {
        display:inline-block;
        float: left;
        height: 100%;
        width:154px;
        font-size: 0;
        text-align: center;
        border-right: 1px solid #F5F5F7;
      img {
        display: inline-block;
        padding-top:14px;
        width: 56px;
        height: 56px;
        margin: 0 20px;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #2F2F2F;
        text-align: left;
        line-height: 84px;
      }
      .p-name{
        vertical-align:top;
        max-width:390px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &:first-of-type {
         width: 505px;
         text-align: left;
        span {
          font-weight: 800;
        }
      }
      &:last-of-type {
         border-right: none;
       }
    }
    }
  }

</style>
