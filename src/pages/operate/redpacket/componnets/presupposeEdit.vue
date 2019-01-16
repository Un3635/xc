<template>
    <d2-container>
        <template slot="header"><span></span>编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="edit"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <div class="detail-list">
                <ul class="items">
                    <li class="item">
                        <span class="title">红包场景</span>
                        <span class="text">{{tableData.scenes}}</span>
                    </li>
                    <li class="item">
                        <span class="title">预设文案</span>
                        <span class="text">{{tableData.copyWrite}}</span>
                    </li>
                    <li class="item">
                        <span class="title">价值（钻石）</span>
                        <span class="text">{{tableData.price}}</span>
                    </li>
                    <li class="item">
                        <span class="title">状态：</span>
                        <div class="item-radio">
                            <el-radio v-model="paramsData.status" :label="true">正常</el-radio>
                            <el-radio v-model="paramsData.status" :label="false">禁用</el-radio>
                        </div>
                    </li>
                </ul>
            </div>
            <el-button type="primary" plain class="return-btn" @click="submitForm">提交</el-button>
            <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">取消</el-button>
        </div>
    </d2-container>
</template>

<script>
  export default {
    name: "presupposeEdit",
    data() {
      return {
        id:'',
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'id':null,
          'status':true,
        }
      }
    },
    methods:{
      //获取列表
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.redPacketDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        )
      },
     //成功回调
      getSuccessCB(vm,res){
        if(!res.data || res.data === ''){
          this.tableData ={};
        } else {
          vm.setTableData(res.data)
        }
      },
      //设置表格数据
      setTableData(_data){
          let obj = {};
          obj.scenes = _data.scenes;
          obj.copyWrite = _data.copyWrite;
          obj.price = _data.price;
          this.paramsData.status = _data.status;
          switch(_data.status){ //状态
            case true:
              obj.status = '正常';
              break;
            case false:
              obj.status = '禁用';
              break;
            default:
              obj.status = '-'
          }
         this.tableData = obj;
      },
      //设置表格数据
      submitForm(){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.redPacketEdit,
          'application/json',
          vm.paramsData,
          vm.getSubmitSuccessCB
        )
      },
      getSubmitSuccessCB(vm,res){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      }
    },
    created(){
      this.paramsData.id = this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
.edit{
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
        margin:18px 0;
        @include clearfix;
        .title{
            float:left;
            padding-right:30px;
            width:160px;
            text-align:right;
            font-size:15px;
            color:#555;
            line-height:36px;
        }
        .pic{
            width:200px;
            border:5px solid #eee;
        }
        .text{
            float:left;
            font-size:15px;
            color:#222;
            line-height:36px;
            font-weight:200;
        }
        .item-button{
            float:left;
        }
        .item-input{
            width:500px;
        }
        .item-date-picker{
            width:180px;
        }
        .item-radio{
            float:left;
            height:36px;
            vertical-align:middle;
        }

    }
    .return-btn{
        margin:50px auto;
    }
}
</style>