<template>
  <div>
    <div class="fa-con">
      <div class="con" :style="{minHeight: minHeight + 'px'}" v-for="(item,index) in facilityList" :key="index" @click="$router.push('/inRentDetail/'+item.productNo)">
        <div class="img" >
          <img :src=item.imgSrc>
        </div>
        <div class="line" v-if="isLine"></div>
        <div class="total-quantity">
          <h1>{{item.title}}</h1>
          <h2>{{item.skuTitle}}</h2>
          <h3><span>{{item.sumCount}}</span> 台</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'facility',
    props: {
      minHeight: {
        type: Number,
        default: '303'
      },
      facilityList: {
        type: Array
      },
      isLine: Boolean
    },

  }
</script>
<style scoped lang="scss">
.fa-con{
  clear: both;
  .con{
    width: 200px;
    border: 1px solid #CCCCCC;
    float: left;
    margin-right: 46px;
    margin-bottom: 25px;
    cursor: pointer;
    padding-bottom: 10px;
    .img{
      padding: 25px 27px 23px 23px;
      img{
        width: 150px;
      }
    }
    .line{
      border-bottom: 1px solid #CCCCCC;
    }
    .total-quantity{
      width: 100%;
      text-align: center;
      color: #000000;
      font-size: 16px;
      h1,h2,h3{
        width: 90%;
        min-height: 16px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding: 0 10px;
      }
      h1{
        font-size: 14px;
        margin-top: 10px;
        line-height: 1.5;
      }
      h2{
        font-size: 12px;
        margin-top: 5px;
      }
      h3{
        margin-top: 8px;
      span{
          color: #F7BA2A;
          font-weight: bold;
        }
      }
    }
  }
  .con:nth-of-type(4n){
    margin-right: 0;
  }
}
</style>
