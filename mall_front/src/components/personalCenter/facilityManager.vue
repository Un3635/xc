<template>
  <div class="facilityManager">
    <div class="fm-header">
      在租 <span class="yellow">{{rentInfoVo.rentSumCount}}</span> 设备
    </div>
    <div class="props">
      <x-facility :isLine="true" :minHeight="230" :facilityList="rentInfoVo.rentInfoVos"></x-facility>
      <!--无相关结果-->
      <div class="page">
        <pagination :pageData="pageInfo" v-if="!noRecord" @listenToChild="listenToChild"></pagination>
        <div class="icon_box" v-if="noRecord">
          <div class="icon_kong">
            <img src="../../assets/images/icon_jilu_kong.png" alt="">
          </div>
          <div class="txt">
            <span>没有相关的结果哦！</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import xFacility from '../x-facility';
  import pagination from '../x-pagination'
  export default {
    name: 'facilityManager',
    data() {
      return {
        nub: 8,
        list: [
          {
            title: '联想T440',
            skuTitle: 'i5/8g/256g',
            sumCount: 3,
            imgSrc: require('../../assets/images/product.png'),
          },
          {
            title: '联想T440联想T440联想T440联想T440联想T440',
            skuTitle: 'i5/8g/256g',
            sumCount: 2,
            imgSrc: require('../../assets/images/product.png'),
          },
          {
            title: '联想T440',
            skuTitle: 'i5/8g/256g',
            sumCount: 10,
            imgSrc: require('../../assets/images/product.png'),
          },
          {
            title: '联想T440联想T440联想T440',
            skuTitle: 'i5/8g/256g',
            sumCount: 200,
            imgSrc: require('../../assets/images/product.png'),
          },
          {
            title: '联想T440',
            skuTitle: 'i5/8g/256g联想T440联想T440联想T440',
            sumCount: 3,
            imgSrc: require('../../assets/images/product.png'),
          },
          {
            title: '联想T440',
            skuTitle: 'i5/8g/256g',
            sumCount: 63,
            imgSrc: require('../../assets/images/product.png'),
          },
        ],
        pageInfo: {
          total: 0,
          page: 1,
          size: 10
        },
        rentInfoVo: [],
        token: '',
        noRecord: false
      }
    },
    components: {
      xFacility: xFacility,
      pagination: pagination
    },
    methods: {
      listenToChild() {
        this.getRentList();
      },
      getRentList() {
        var vm = this;
        this.$http.get('rentInfo/rentList', {params: {token: this.token, currentPage: this.pageInfo.page, pageSize: this.pageInfo.size, initTime: new Date().getTime()}})
          .then(res => {
            res = res.data;
            if(res.code == 1000){
              vm.pageInfo.total = res.data.sumCount;
              vm.rentInfoVo = res.data;
              if((res.data.rentInfoVos && res.data.rentInfoVos.length == 0) || !res.data.rentInfoVos){
                vm.noRecord = true;
              }else{
                vm.noRecord = false;
              }
            }else {
              vm.$message({
                type: 'warning',
                message: res.data.msg
              });
            }
          })
      }
    },
    mounted() {
      this.token = localStorage.getItem('xckz_mall');
      this.getRentList()
    }
  }
</script>
<style scoped lang="scss">
  .page{
    clear: both;
    text-align: center;
  }

</style>
