<template>
  <div class="author-rankings" v-if="rankings.length">
    <div class="author-rankings-title">
      <div class="author-rankings-title-left">作者排行</div>
      <div class="author-rankings-title-right"><span :class="num==0?'ranking1':'rankings1'" @mouseover="num=0">周</span><span :class="num==0?'ranking2':'rankings2'" @mouseover="num=1">月</span></div>
     
    </div> 
    <div class="author-rankings-item"> 
      <a :href="'/author/'+i.clientType+'/'+i.userId" target="_blank" class="author-rankings-item-list" v-for="(i,int) in rankings" :key="int">
        
          <div class="author-rankings-item-list-img">
            <img :src="i.head" alt="">
            <div class="author-rankings-item-list-img-num">{{int+1}}</div>
          </div>
          <div class="author-rankings-item-list-content">
            <h3>{{i.nickName}}</h3>
            <p>{{i.introduce?i.introduce:"火星来的孩子还没有个人简介..."}}</p>
          </div>
        
      </a>
    </div>
      
  </div>
</template>
<script>
  import { authorRankingList } from "../service/main-api";
  export default {
    data() {
      return {
        num:0,
        rankings: []
      };
    },
    methods:{
      ranking(num){
        authorRankingList({rankingType:num}).then(res => {
          this.rankings = res;
        });
      }
    },
    mounted() {
      this.ranking(this.num)
    },
    watch: {
      num(newValue, oldValue) {
        this.ranking(this.num)
      }
    }
  };
</script>

<style lang="scss">
  .author-rankings {
    margin-top:60px;
    &-title{
      overflow: hidden;
      border-bottom: 1px solid #EEEEEE;
      margin-bottom: 10px;
      &-left{
        float: left;
        font-size: 24px;
        color: #333333;
        line-height: 33px;
        padding-bottom: 16px;
        font-weight: 700;
      }
      &-right{
        float: right;
        width: 100px;
        height: 24px;
        text-align: center;
        line-height: 26px;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        box-sizing:content-box;
        span{
          display: inline-block;
        }
        .ranking1{
          width:50px;
          background: #5581E9;
          color: #FFFFFF;
          border-radius:8px 0 0 8px;

        }
        .ranking2{
          width:50px;
          border: 1px solid #5581E9;
          color: #333333;
          border: 1px solid #EEEEEE;
          border-radius:0 8px 8px 0;
        }

        .rankings1{
          width:50px;
          border: 1px solid #EEEEEE;
          color: #333333;
          border-radius:8px 0 0 8px;
        }
        .rankings2{
          border-radius:0 8px 8px 0;
          width:50px;
          background: #5581E9;
          color: #FFFFFF;
        }
      }
    }
    &-item{
      &-list{
        overflow: hidden;
        padding: 10px 0;
        display: block;
        &-img{
          float: left;
          width: 64px;
          height: 64px;
          
          margin-right: 16px;
          position: relative;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          
          &-num{
            position: absolute;
            left: 0;
            top: 0;
            background: #7F7F7F;
            font-size: 12px;
            color: #FFFFFF;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
          }
        }
        &-content{
          float: left;
          width: 290px;
          h3{
            font-size: 16px;
            color: #222222;
            padding-bottom: 9px;
          }
          p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            max-height: 36px;
            overflow: hidden;
          }
        }
      }
      &-list:hover{
            background: #fafafa;
        .author-rankings-item-list-content{
          h3{
            color: #4d87ea !important;
          }
        }
      }
      &-list:nth-child(1) .author-rankings-item-list-img-num{
        background:  #FA322B;
      }
      &-list:nth-child(2) .author-rankings-item-list-img-num{
        background: #FA8C2B;
      }
      &-list:nth-child(3) .author-rankings-item-list-img-num{
        background: #2BAAFA;
      }
          
    }
  }
</style>
