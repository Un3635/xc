<template>
  <d2-container>
    <d2-page-cover
      title="Meet管理后台"
      sub-title=""
      v-if="!indexAuthority">
      <img src="./home-icon.png" style="width: 120px;"/>
    </d2-page-cover>
    <div class="wrap" v-if="indexAuthority">
      <p class="name">总览数据</p>
      <ul class="item-box">
        <li class="item">
          <p class="num">{{itemList.dayConsumeDiamonds}}钻石</p>
          <p class="tit">当日消费钻石</p>
        </li>
        <li class="item">
          <p class="num">{{itemList.msCount}}位</p>
          <p class="tit">Ms总数</p>
        </li>
        <li class="item">
          <p class="num">{{itemList.getMeetUserOnlineCount}}位</p>
          <p class="tit">当前在线Ms</p>
        </li>
        <li class="item">
          <p class="num">{{itemList.getMeetUserOnlineTodayCount}}位</p>
          <p class="tit">日累计上线Ms</p>
        </li>
        <li class="item">
          <p class="num">{{itemList.getDayAddFansCount}}个</p>
          <p class="tit">当日增粉</p>
        </li>
      </ul>
      <div class="chart-box" id="chart"></div>
    </div>
  </d2-container>
</template>


<script>
  import echarts from 'echarts'
  import util from '@/libs/util.js'
  export default {
    data(){
      return{
        itemList: {},
        charts: '',
        option:[],
        optionDate:[],
        indexAuthority:false,
        authority:[],
        isSuper:0
      }
    },
    methods:{
      getData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.indexData,
          'application/x-www-form-urlencoded',
          {},
          (vm,res)=>{
            if(res.data){
              let obj = {};
              obj.dayConsumeDiamonds = res.data.dayConsumeDiamonds;
              obj.getDayAddFansCount = res.data.getDayAddFansCount;
              obj.getMeetUserOnlineCount = res.data.getMeetUserOnlineCount;
              obj.getMeetUserOnlineTodayCount = res.data.getMeetUserOnlineTodayCount;
              obj.msCount = res.data.msCount;
              vm.itemList = obj;
              if(res.data.diamondsConsumeCountMapList.length>0){
                vm.option=[];
                vm.optionDate=[];
                for(let i=0;i<res.data.diamondsConsumeCountMapList.length;i++){
                  vm.option.push(res.data.diamondsConsumeCountMapList[i].consumeCount);
                  vm.optionDate.push(res.data.diamondsConsumeCountMapList[i].selectDay);
                }
              }
              vm.$nextTick(function() {
                vm.drawPie('chart')
              })
            }
          },
          (vm,res)=>{
            console.log("权限不足，无法查看首页数据");
          }
        )
      },
      drawPie(id){
        let vm =this;
        this.charts = echarts.init(document.getElementById(id))
        this.charts.setOption({
          title : {
            text: '近30天平台日消费钻石数',
            x: 'center',
            textStyle: {
              fontWeight: 600,
              color: '#606266'
            }
          },
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: false},
              dataView : {show: false, readOnly: false},
              magicType : {show: true, type: ['line', 'bar']},
              restore : {show: false},
              saveAsImage : {show: false}
            }
          },
          calculable : true,
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : vm.optionDate
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'收益',
              type:'line',
              itemStyle: {
                normal: {
                  color: "#2c558f",//折线点的颜色
                  lineStyle: {
                    color: "#2c558f"//折线的颜色
                  }
                }
              },
              data:vm.option,
              markLine : {
                data : [
                  {type : 'average', name : '平均值'}
                ]
              }
            }
          ]
        })
      }
    },
    mounted(){
      this.getData();
      if(util.cookies.get('userAuthorityAll')){
        this.authority = JSON.parse(util.cookies.get('userAuthorityAll'));
      }
      if(util.cookies.get('isSuper')){
        this.isSuper = JSON.parse(util.cookies.get('isSuper'));
      }
      if(this.isSuper === 1){
        this.indexAuthority = true;
        return false;
      } else {
        if(this.authority && this.authority.length>=1){
          for(let i=0;i<this.authority.length;i++){
            if(this.authority.indexOf('manager.indexControllerMenu')>-1){
              this.indexAuthority = true;
              return false;
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/public-class.scss';
  .index-btn-group {
    color: $color-text-placehoder;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
  .wrap{
    position:relative;
    margin:20px auto 0;
    padding:40px 0;
    border:1px solid #ddd;
    border-radius:10px;
    .name{
      position:absolute;
      display:inline-block;
      padding:0 18px;
      font-size:16px;
      color:#606266;
      top:-8px;
      left:30px;
      background:#fff;
    }
    .item-box{
      overflow:hidden;
      width:90%;
      margin:0 auto;
      display:flex;
      display: -webkit-flex; /* Safari */
      justify-content:space-between;
      .item {
        display:inline-block;
        width:19%;
        height:110px;
        border:1px solid #aaa;
        border-radius:4px;
        .num,
        .tit{
          width:100%;
          font-weight:700;
          font-size:24px;
          color:#606266;
          text-align:center;
          line-height:66px;
        }
        .tit{
          font-size:16px;
          font-weight:400;
          line-height:36px;
        }
      }
    }
    .chart-box{
      width:98%;
      margin-top:100px;
      height:320px;
    }
  }
</style>