<template>
  <div class="user">
    <div class="user-search">
      <div class="txt">用户账号</div>
      <div class="input-box">
        <el-input placeholder="请输入用户账号" v-model="searchContent" class="input-with-select"  clearable></el-input>
      </div>
      <el-button type="primary" class="btn" @click="filterTable">确定</el-button>
      <el-button type="primary" class="btn" @click="resetTable" plain>重置</el-button>
      <el-button type="primary" class="black-btn" @click="onlyBlackList">黑名单账户</el-button>
    </div>
    <el-table
            highlight-current-row
            :data="userTable"
            :cell-class-name="getCellClass"
            class="user-table1"
            style="width: 100%;padding:16px 24px;">
      <el-table-column
              prop="id"
              label="用户ID"
              width="180">
      </el-table-column>
      <el-table-column
              prop="mobile"
              label="用户账号"
              width="180">
      </el-table-column>
      <el-table-column
              prop="nickName"
              label="用户昵称">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="创建时间">
      </el-table-column>
      <el-table-column
              label="用户详情">
        <template slot-scope="scope">
              <el-button size="small" style="width:60px;height:30px;" @click="goUserDetailPage(scope.row)">详情</el-button>
        </template>
      </el-table-column>
      <el-table-column
              prop="status"
              label="操作">
              <template slot-scope="scope">
                <span style="cursor:pointer;" @click="statusHandle(scope.row)">{{scope.row.status}}</span>
              </template>
      </el-table-column>
    </el-table>
    <div class="pagination-box">
      <el-pagination
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
    export default {
        data(){
            return {
                searchContent:'',
                pageNow:1,
                pageSize:10,
                totalSize:'',
                phone:'',
                status:'',
                userTable:[]
            }
        },
        methods: {
            //改变表格中某个单元格字体颜色
            getCellClass({row, column, columnIndex}) {
                if (columnIndex == 5 && row[column.property].indexOf('撤出黑名单') > -1) {
                    return 'active-gray'
                } else if(columnIndex == 5 && row[column.property].indexOf('拉黑') > -1){
                    return 'active-blue'
                } else {
                    return ''
                }
            },
            //获取用户列表
            getUserList(pageNow,pageSize,phone,status){
              let vm = this;
              this.axiosPOST(vm, vm.$API.API.userList,
                'application/x-www-form-urlencoded',
                { pageNow, pageSize, phone, status },
                vm.getUserListSuccessCB,
                vm.getUserListErrorCB
              )
            },
            //获取用户列表成功回调
            getUserListSuccessCB(vm,res){
              console.log('success');
              vm.totalSize = res.count;
              if(!res.data || res.data === ''){
                vm.userTable = [];
              } else {
                vm.setUserTableData(res.data);
              }
            },
            //获取用户列表失败回调
            getUserListErrorCB(err){
              console.log(err)
            },
            //设置表格数据
            setUserTableData(_data) {
            let myData = [];
            for (let i = 0; i <_data.length; i++) {
              let obj = {};
              obj.id = _data[i].id;
              obj.mobile = _data[i].mobile;
              obj.createTime = _data[i].createTime;
              if(!_data[i].nickName || _data[i].nickName === ''){
                obj.nickName = '-'
              } else {
                obj.nickName = _data[i].nickName
              }
              _data[i].status === 0 ? obj.status = '撤出黑名单' : obj.status = '拉黑';
              myData[i] = obj;
            }
            this.userTable = myData;
          },
            //点击拉黑按钮
            statusHandle(row){
                let id = row.id;
                let status = '';
                row.status === '撤出黑名单' ? status = 1 : status = 0;
                this.changeStatus(id,status)
            },
            //拉黑状态改变
            changeStatus(userId,status){
              let vm = this;
              this.axiosPOST(vm, vm.$API.API.userStatus,
                'application/x-www-form-urlencoded',
                {userId,status},
                vm.getStatusSuccessCB,
                vm.getErrorCB
              )
            },
            //拉黑状态成功回调
            getStatusSuccessCB(vm,res){
              vm.getUserList(vm.pageNow, vm.pageSize, vm.phone, vm.status);
            },
            //分页器
            handleCurrentChange(page) {
              this.pageNow = page;
              this.getUserList(this.pageNow, this.pageSize, this.phone, this.status);
            },
            //筛选 - 黑名单账户
            onlyBlackList(){
              this.pageNow = 1;
              this.phone = '';
              this.status = 0;
              this.getUserList(this.pageNow,this.pageSize,this.phone,this.status);
            },
            //筛选 - 用户账号
            filterTable(){
              this.pageNow = 1;
              this.status = '';
              this.phone = this.searchContent;
              this.getUserList(this.pageNow,this.pageSize,this.phone,this.status);
            },
            //重置按钮
            resetTable(){
              this.pageNow = 1;
              this.phone = '';
              this.status = this.searchContent = '';
              this.getUserList(this.pageNow,this.pageSize,this.phone,this.status);
            },
            //详情按钮
            goUserDetailPage(row){
              this.$router.push({
                name: 'userDetail',
                params: {
                  id: row.id,
                  nickname:row.nickName,
                  mobile: row.mobile,
                  createTime: row.createTime
                }
              })
            }
        },
        mounted(){
          this.getUserList(this.pageNow, this.pageSize, this.phone, this.status);
          console.log('mounted');
        }
    }
</script>

<style scoped lang= "scss">
  @import '~@/assets/style/public-class.scss';
  .user {
    width:100%;
    margin:30px auto;
    .user-search{
      width:100%;
      margin:0 auto 30px;
      @include clearfix;
      .txt{
        float:left;
        display:inline-block;
        font-size:14px;
        line-height:40px;
      }
      .input-box {
        float:left;
        width: 250px;
        height: 40px;
        margin:0 20px;
      }
      .btn{
        float:left;
        width:100px;
        height:40px;
      }
      .black-btn{
        float:right;
        width:120px;
        height:40px;
      }
    }
    .recharge-pagination{
      margin:30px auto;
      text-align:center;
    }

  }
</style>