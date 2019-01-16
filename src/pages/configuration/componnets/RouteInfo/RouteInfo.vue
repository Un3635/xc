<template>
  <div class="recharge">
    <el-table
            highlight-current-row
            :data="configTable"
            class="recharge-table1"
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="key"
              label="名称"
              min-width="130">
      </el-table-column>
      <el-table-column
              prop="value"
              label="内容"
              min-width="120">
      </el-table-column>
      <el-table-column
              prop="remark"
              label="备注"
              min-width="100">
      </el-table-column>
      <el-table-column
              prop="updateTime"
              label="最后编辑时间"
              min-width="100">
      </el-table-column>
      <el-table-column
              label="操作"
              min-width="160"
              v-if="btnDisabled">
              <template slot-scope="scope">
                <el-button size="middle" type="info" plain @click="goEditPage(scope.row)" style="width:80px;">编辑</el-button>
              </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
              class="recharge-pagination"
              background
              @current-change="handleCurrentChange"
              :current-page="pageNow"
              :page-size="pageSize"
              :total="totalSize"
              layout="prev, pager, next, jumper"
              v-if="totalSize>pageSize">
      </el-pagination>
      <div class="pagination-tail" v-if="totalSize>pageSize">，共{{Math.ceil(totalSize/pageSize)}}页</div>
    </div>
  </div>
</template>

<script>
  import util from '@/libs/util.js'
  import d2admin from "../../../../store/modules/d2admin";
export default {
    data(){
        return {
          configTable:[],
          totalSize:'',
          pageNow: 1,
          pageSize: 20,
          btnDisabled: true,
          //权限
          userAuthorityAll:[],
          isSuper:''
        }
    },
    methods: {
      //设置按钮禁用
      setDisabledBtn(){
        if(util.cookies.get('userAuthorityAll')){
          this.userAuthorityAll = JSON.parse(util.cookies.get('userAuthorityAll'));
        }
        this.isSuper = util.cookies.get('isSuper');
        if (Number(this.isSuper) === 1 || (util.cookies.get('userAuthorityAll') && this.userAuthorityAll.indexOf('manager.configs') !== -1)) {
          this.btnDisabled = true;
        } else {
          this.btnDisabled = false;
        }
      },
      //获取配置列表
      getConfigList(pageNow,pageSize){
        let vm = this;
        this.axiosPOST(vm, vm.$API.API.configList,
          'application/x-www-form-urlencoded',
          {pageNow,pageSize},
          vm.getSuccessCB,
          vm.getErrorCB
        )
      },
      //成功回调
      getSuccessCB(vm,res){
        vm.totalSize = res.count;
        if(!res.data || res.data === ''){
          this.configTable =[];
        } else {
          vm.setConfigTable(res.data);
        }
      },
      //失败回调
      getErrorCB(err){
        console.log(err)
      },
        //设置表格数据
        setConfigTable(_data){
          let myData = [];
          for (let i = 0; i <_data.length; i++) {
            let obj = {};
            if(!_data[i].key || _data[i].key === ''){ //名称
              obj.key = '-'
            } else {
              obj.key = _data[i].key
            }
            if(!_data[i].value || _data[i].value === ''){  //备注
              obj.value = '-'
            } else {
              obj.value = _data[i].value
            }
            if(!_data[i].remark || _data[i].remark === ''){  //备注
              obj.remark = '-'
            } else {
              obj.remark = _data[i].remark
            }
            if(!_data[i].updateTime || _data[i].updateTime === ''){  //备注
              obj.updateTime = '-'
            } else {
              obj.updateTime = _data[i].updateTime
            }
            myData[i] = obj;
          }
          this.configTable = myData;
        },
        //分页器
        handleCurrentChange(val) {
          this.pageNow = val;
          this.getConfigList(this.pageNow, this.pageSize);
        },
        //编辑按钮
        goEditPage(row) {
          this.$router.push({path: '/configuration/configEdit', query: {key: row.key}})
        }
    },
    watch: {
      '$route': {
        handler(val) {
          if(val.path === '/configuration' || val.path === '/configuration/'){
            this.getConfigList(this.pageNow, this.pageSize);
          }
        }
      },
    },
    mounted(){
      this.getConfigList(this.pageNow, this.pageSize);
      this.setDisabledBtn();
    }
}
</script>

<style scoped lang= "scss">
@import '~@/assets/style/public-class.scss';
.recharge {
  width:100%;
  margin:30px auto;
  .recharge-search{
    width:100%;
    margin:0 auto 25px;
    @include clearfix;
    .input-box {
      float:left;
      width: 330px;
      height: 40px;
      margin:0 30px 0 0;
      .tit{
        line-height:40px;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
      }
    }
    .currency{
      float:left;
      text-align:left;
      margin-right:35px;
      .tit{
        line-height:40px;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
      }
      .currency-filter{
        display:inline-block;
        vertical-align: top;
      }
    }
    .export-btn{
      float:right;
      height:40px;
      cursor:pointer;
      img {
        display:inline-block;
        vertical-align: top;
        width:auto;
        height:28px;
        padding-top:6px;
      }
      p {
        display:inline-block;
        vertical-align:top;
        font-size:14px;
        line-height:40px;
        color:#909399;
        margin:0 0 0 10px;
      }
    }
  }
  .filter{
    width:100%;
    height:40px;
    margin:0 auto 30px;
    @include clearfix;
    .status{
      float:left;
      text-align:left;
      margin-right:30px;
      .tit{
        display:inline-block;
        vertical-align:top;
        margin-right:20px;
        line-height:40px;
        font-size:14px;
      }
    }
    .time{
      position:relative;
      float:left;
      text-align:left;
      margin-right:35px;
      .tit{
        line-height:40px;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
      }
    }
    .btn{
      float:left;
      width:100px;
      height:40px;
    }
  }
}
</style>