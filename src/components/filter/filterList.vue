<template>
    <div class="filterList">
        <ul class="itemList">
            <li class="item">
                <slot></slot> 
            </li>
            <li class="item" v-if="filterItem.searchFilter" v-for="option,index in searchList" :key="index">
                <span class="tit">{{option.title}}</span>
                <el-input :placeholder="option.placeholder" v-model="searchValue.searchContent[index]" class="inp" clearable></el-input>
            </li>
            <li class="item" v-if="filterItem.selectFilter" v-for="option,index in selectList" :key="index+20">
                <span class="tit">{{option.title}} </span>
                <el-select v-model="searchValue.searchState[index]" :placeholder="option.placeholder" class="state-select">
                    <el-option
                            v-for="item in option.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </li>
            <li class="item" v-if="filterItem.rateFilter">
                <span class="tit">等级 </span>
                <span class="rate-box">
                    <!--<el-input type="number" v-model="searchValue.rates[0]" class="rate-input" :min="0"></el-input>-->
                    <el-input-number class="rate-input"  v-model="searchValue.rates[0]" :precision="0" :controls="false" :min="0"></el-input-number>
                    <span style="padding:0 8px;"> - </span>
                    <!--<el-input type="number" v-model="searchValue.rates[1]" class="rate-input" :min="0"></el-input>-->
                    <el-input-number class="rate-input"  v-model="searchValue.rates[1]" :precision="0" :controls="false" :min="0"></el-input-number>
                </span>
            </li>
            <li class="item" v-if="filterItem.timeFilter">
                <span class="tit">时间: </span>
                <el-date-picker
                        class="date-picker"
                        v-model="searchValue.searchTime"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator=" - "
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        :default-time="['00:00:00', '23:59:59']"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </li>
        </ul>
        <div class="button-box">
            <el-button type="primary" class="btn" @click="filterData">搜索</el-button>
            <el-button plain type="primary" class="btn" @click="resetData" style="margin-left:7px;">重置</el-button>
            <el-button type="primary" class="btn" @click="addBtnHandle" style="margin-left:7px;" v-if="filterItem.addBtn && btnState">{{btnList.text}}</el-button>
        </div>
    </div>
</template>

<script>
  export default {
    props:{
      filterItem:{
        type:Object,
        default: function () {
          return {}
        }
      },
      searchList:{
        type:Array,
        default: function () {
          return []
        }
      },
      selectList:{
        type:Array,
        default: function () {
          return []
        }
      },
      btnList:{
        type:Object,
        default: function () {
          return {}
        }
      },
      btnState:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return{
        searchValue:{
          searchContent:[],
          searchState:[],
          searchTime:[], //日期选择值
          rates:[], //等级
        },
        pickerOptions: { //日期选择
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          },
          //快捷
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近7天',
              onClick(picker) {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600 * 1000 * 24 * 6);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近30天',
              onClick(picker) {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime() - 3600 * 1000 * 24 * 29);
                picker.$emit('pick', [start, end]);
              }
            }]
        }
      }
    },
    computed:{
        trimStr(str){
          return str.replace(/(^\s*)|(\s*$)/g,'');
        }
    },
    methods:{
      //筛选按钮
      filterData(){
        this.$emit('filterDataHandle',this.searchValue);
      },
      //重置按钮
      resetData(){
        this.$emit('resetDataHandle');
        this.searchValue ={
          searchContent:[],
          searchState:[],
          searchTime:[],
          rates:[], //等级
        }
      },
      //新增按钮
      addBtnHandle(){
        this.$emit('addOptionHandle')
      }
    }
  }
</script>

<style scoped lang="scss">
@import '~@/assets/style/public-class.scss';
.filterList{
    width:100%;
    margin:10px auto 25px;
    @include clearfix;
    .itemList{
        float:left;
        padding:0;
        margin-bottom:20px;
        text-align:left;
        height:36px;
        @include clearfix;
        .item{
            display:inline-block;
            float:left;
            margin:0 20px 20px 0;
            .tit{
                font-size:14px;
                line-height:36px;
                padding-right:8px;
                color:#555;
            }
            .inp{
                width:170px;
            }
            .state-select{
                width:150px;
            }
            &:first-of-type{
                margin:0 20px 0 0;
            }
            &:last-of-type{
                margin:0 0 20px 0;
            }
        }
    }
    .button-box{
        float:right;
        height:40px;
        text-align:right;
        .btn{
            height:36px;
            padding:9px 16px;
        }
    }
}
</style>