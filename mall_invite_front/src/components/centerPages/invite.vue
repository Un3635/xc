<template>
    <div class="invit-list">
        <div class="module-title">邀请列表</div>
        <div class="invit-list-content">
            <el-table
                    :data="inviteForm"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                    @row-click="openBranch">
                <el-table-column
                        prop="userName"
                        label="被邀请人"
                >
                </el-table-column>
                <el-table-column
                        prop="userLevel"
                        label="被邀请人级别"
                >
                </el-table-column>
                <el-table-column
                        prop="inviteCount"
                        label="邀请人数">
                </el-table-column>
                <el-table-column
                        prop="inviteConsumeCount"
                        label="消费人数">
                </el-table-column>
                <el-table-column label="注册日期" width="100px">
                    <template slot-scope="scope">
                        {{scope.row.createdAt | date('YYYY-MM-DD')}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="返佣详情">
                    <template slot-scope="scope">
                        <a @click="searchDetailInfo(scope.$index, scope.row)" style="cursor:pointer">详情</a>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background
                               layout="prev, pager, next"
                               @current-change="handleCurrentChange"
                               :current-page="pageNow"
                               :page-size="pageNum"
                               :total="allInviteListDataCount"
                               v-if="allInviteListDataCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'invit',
  data() {
    return {
      allInviteListDataCount: '',
      inviteListData: [],
      inviteForm: [],
      pageNow: 1,
      pageNum: 5,
      uId: ''
    }
  },
  methods: {
    //获取邀请列表数据
    getInviteListData(uid, num) {
      let _params = {
        inviteUid: uid || '', //邀请人的Id，不填默认为当前用户
        page_num: num || '',
        page_size: 5
      };
      let vm = this;
      getajaxdata(API.getInviteList, 'GET', _params, 'JSON', function (res) {
        if (res.code == '1000') {
          vm.allInviteListDataCount = res.count;
          vm.inviteListData = res.data;
          // console.log(res)
          vm.setInviteFormData();
        }
      }, this)
    },
    //获取表格数据
    setInviteFormData() {
      let myData = [];
      let _data = this.inviteListData;
      for (let i = 0; i < _data.length; i++) {
        let obj = {};
        obj.inviteCount = _data[i].inviteCount;
        obj.inviteConsumeCount = _data[i].inviteConsumeCount;
        obj.createdAt = _data[i].createdAt;
        //判断用户名
        if (!_data[i].userName) {
          obj.userName = '-'
        } else {
          obj.userName = _data[i].userName;
        }
        //判断等级
        if (!_data[i].userLevel) {
          obj.userLevel = '无等级'
        } else {
          obj.userLevel = _data[i].userLevel;
        }
        myData[i] = obj;
      }
      this.inviteForm = myData;
    },
    //分页
    handleCurrentChange(currentPage) {
      this.pageNow = currentPage;
      this.getInviteListData(this.uId, currentPage);
    },
    //点击详情
    searchDetailInfo(index) {
      this.$router.push('/center/invite/detail');
      let params = this.inviteListData[index].id;
      this.$store.commit('changeInviteId', params)
    },
    //打开子页面
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    openBranch(row, event, column) {
      let index = row.index;
      this.uId = this.inviteListData[index].id;
      this.getInviteListData(this.uId, 1);
      this.pageNow = 1;
    }
  },
  mounted() {
    this.uId = '';
    this.getInviteListData('', 1);
  }
}
</script>
