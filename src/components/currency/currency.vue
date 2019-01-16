<template>
    <div class="currency-filter">
        <div class="select" @click="showDropDownHandle">
            <el-button class="select-btn">已选{{finalCurrencyList.length}}项</el-button>
            <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="dropdown" v-if="showDropDown">
        <div class="search">
            <input id="searchCurrency" type="text" name="chooseCurrency" value="" placeholder="请输入币种名称" @input="showDefaultHandle"/>
            <i class="el-icon-circle-close" @click="clearSearch"></i>
        </div>
        <div class="list" v-if="showDefault">
            <div class="left">
                <el-checkbox class="all" v-model="allChecked" @click.native.stop="checkAll($event)">全选</el-checkbox>
            </div>
            <div class="right">
                <el-checkbox class="item" v-for="item,index in listItem" :key="index" @click.native.stop="chooseItem($event,item)" v-model="item.check">{{item.name}}</el-checkbox>
            </div>
        </div>
        <div class="result-list" v-else>
            <el-checkbox class="result-item" v-model="resultChecked" v-if="result">{{result}}</el-checkbox>
            <p class="result-item-blank" v-else>暂无查询结果</p>
        </div>
        <div class="button">
            <el-button type="info" plain @click="cancelSet">取消</el-button>
            <el-button type="primary" plain @click="confirmSet">确定</el-button>
        </div>
    </div>
    </div>
</template>

<script>
  import util from '@/libs/util.js'
export default {
    data(){
        return {
            allChecked:false, //是否全选
            listItem: [{name:"ETH"}, {name:"BTC"}, {name:"DPY"}, {name:"DGD"},{name:"MYST"}, {name:"STAR"},
              {name:"ANT"}, {name:"LRC"}, {name:"DGX"}, {name:"EOS"}, {name:"MKR"}, {name:"PAY"}, {name:"1ST"},
              {name:"BNT"}, {name:"SNT"}, {name:"BAT"}, {name:"GNT"}, {name:"CREDO"}, {name:"REP"}, {name:"DSC"}, {name:"BTCS"}],
            finalCurrencyList:[], //最终选中的币种列表
            showDefault: true, //是否显示默认币种
            resultStore: ['BTC','ETH','AAA','BBB','CCCCC','DDD','EEE'], //币种搜索查询库
            result: '', //搜索结果
            showDropDown: false, //是否显示下拉框
            resultChecked:false //是否选择搜索结果
        }
    },
    mounted(){
        let len = this.listItem.length;
        for(let i = 0; i < len; i++) {
            this.$set(this.listItem[i],'check', false);
        }
    },
    watch:{
        "listItem":{
            handler:function(val) {
                let finalList = [];
                for (let i = 0; i < val.length; i++) {
                    if (val[i].check) {
                        finalList.push(val[i]);
                    }
                }
                this.finalCurrencyList = finalList;
                if (this.finalCurrencyList.length === val.length) {
                    this.allChecked = true;
                } else {
                    this.allChecked = false;
                }
            },
            deep: true
        }
    },
    methods:{
      //搜索框输入时显示结果页
      showDefaultHandle() {
          let val = document.getElementById("searchCurrency").value;
          this.showDefault = false;
          let vm = this;
          let token =  util.cookies.get('token');
          vm.$axios({
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            },
            params:{
              symbol: val
            },
            url: vm.$API.URL + vm.$API.API.searchCoin,
          })
          .then((res)=>{
            if(res.code === '1000'){
              vm.result = res.data.symbol;
            } else if(res.code === '6501') {
              vm.result = ''
            } else {
              vm.$message.error(res.code)
            }
          })
          .catch((err)=>{
            vm.result = ''
            console.log(err)
          })
        },
      //清除搜索框内容
      clearSearch() {
        document.getElementById("searchCurrency").value = ''
        this.result = ''
        this.showDefault = true
      },
      //选择币种
      chooseItem(e,item) {
          let el = e || event;
          if(el.target.checked){
              item.check = true;
          }else{
              item.check = false;
          }
      },
      //是否显示下拉列表
      showDropDownHandle(){
          // this.showDropDown = !this.showDropDown
          this.showDropDown = true;
      },
      //全选
      checkAll(e) {
          var e = e || event
          if(e.target.checked){
              this.allChecked = true;
              for (let i = 0; i< this.listItem.length; i++) {
                  this.listItem[i].check = true;
              }
          } else {
              this.allChecked = false;
              for (let i = 0; i< this.listItem.length; i++) {
                  this.listItem[i].check = false;
              }
          }
      },
      //取消按钮
      cancelSet() {
          if(this.showDefault){
              this.allChecked = false;
              for (let i = 0; i< this.listItem.length; i++) {
                  this.listItem[i].check = false;
              }
             this.finalCurrencyList = []; //取消时清空币种
             this.$emit('filterCurrency',this.finalCurrencyList) //取消时清空币种
             this.showDropDown = false;
          } else {
              document.getElementById("searchCurrency").value = '';
              this.resultChecked = false;
              this.showDefault = true;
          }
      },
      //确认按钮
      confirmSet() {
          let hasExist = false;
          let vm = this;
          if(this.showDefault) {
              this.showDropDown = false;
              this.$emit('filterCurrency',this.finalCurrencyList)
          } else {
              if(this.result !== '' && this.resultChecked){
                  for(let i=0; i<this.listItem.length;i++){  //如果默认列表中已经存在，则勾选，不添加
                    if(this.listItem[i].name === this.result){
                      this.listItem[i].check = true;
                      hasExist = true;
                      this.$message({
                        type: 'info',
                        message: '已选中'+ this.listItem[i].name
                      });
                    }
                  }
                  if(!hasExist){
                    this.listItem.push({name:this.result, check:true});
                    this.$message({
                      type: 'info',
                      message: '新增一个筛选币种'
                    });
                  }

              }
             setTimeout(function(){
                 document.getElementById("searchCurrency").value = '';
                 vm.result = '';
                 vm.resultChecked = false;
                 vm.showDefault = true;
             },500)
          }
      },
      //清除数据（由父组件触发）
      resetCurrencyData(){
        this.allChecked = false;
        for (let i = 0; i< this.listItem.length; i++) {
          this.listItem[i].check = false;
        }
        this.showDropDown = false;
      }
    }
}
</script>

<style scoped lang="scss">
@import '~@/assets/style/public-class.scss';
.currency-filter{
    display:inline-block;
    vertical-align:top;
    position:relative;
    .select{
        width:80px;
        height:24px;
        padding:6px 5px;
        border:1px solid #dcdfe6;
        border-radius:4px;
        .select-btn{
            width:60px;
            padding:0;
            height:24px;
            line-height:24px;
            letter-spacing:1px;
            display:inline-block;
            border:none;
            outline:none;
            &:hover,&:active,&:focus{
                color: #606266;
                border: none;
                background-color: #fff;
            }
        }
        i{
            width:20px;
            height:32px;
            display:inline-block;
        }
    }
    .dropdown{
        z-index:10;
        position:absolute;
        top:55px;
        left:0;
        width:500px;
        min-height:200px;
        border:1px solid #dcdfe6;
        border-radius:4px;
        background:#fff;
        .search{
            width:220px;
            height:26px;
            margin:18px auto 14px;
            padding:3px 10px;
            border:1px solid #dcdfe6;
            border-radius:4px;
            input{
                width:200px;
                height:26px;
                line-height:32px;
                display:inline-block;
                border:none;
                outline:none;
            }
            i{
                cursor:pointer;
                color:#909399;
                width:20px;
                height:26px;
                display:inline-block;
            }
        }
        .list{
            width:100%;
            @include clearfix;
            .left{
                float:left;
                width:100px;
                min-height:160px;
                text-align:center;
                .all{
                    margin-top:10px;
                    padding-left:10px;
                }
            }
            .right{
                float:left;
                width:400px;
                min-height:160px;
                @include clearfix;
                .item{
                    width:60px;
                    margin-right:40px;
                }
            }
        }
        .result-list{
            padding:20px 50px 100px;
            .result-item-blank{
                font-size:14px;
                color:#909399;
                font-weight:200;
                letter-spacing: 1px;
            }
        }
        .button{
            width:100%;
            text-align:center;
            margin:20px auto 20px;
            .el-button{
                height:36px;
                line-height:28px;
                padding:3px 20px;
                &:first-of-type{
                    margin-right:20px;
                }
            }
        }
    }
}
</style>
