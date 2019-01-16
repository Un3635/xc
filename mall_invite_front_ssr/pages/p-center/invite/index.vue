<template>
  <div class="invit-list">
    <div class="module-title">邀请列表</div>
    <div class="invit-list-content">
      <el-table
        class="common-table"
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
        <el-table-column label="注册日期">
          <template slot-scope="scope">
            {{scope.row.createdAt | date('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          label="返佣详情">
          <template slot-scope="scope">
            <a @click.stop="searchDetailInfo(scope.$index, scope.row)" style="cursor:pointer">详情</a>
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
                       v-if="allInviteListDataCount && allInviteListDataCount>20">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    breadcrumb() {
      return {
        label: '邀请列表',
        pList: [
          {
            path: '/p-center',
            label: '个人中心'
          }
        ]
      }
    },
    name: 'invit',
    data() {
      return {
        allInviteListDataCount: '',
        inviteListData: [],
        inviteForm: [],
        pageNow: 1,
        pageNum: 20,
        uId: '',
        openIndex:0
      }
    },
    methods: {
      //获取邀请列表数据
      getInviteListData(uid, num) {
        let _params = {
          inviteUid: uid || '', //邀请人的Id，不填默认为当前用户
          page_num: num || '',
          page_size: 20,
          initTimes: new Date().getTime()
        };
        let vm = this;
        getajaxdata(API.getInviteList, 'GET', _params, 'JSON', function (res) {
          if (res.code == '1000') {
            vm.allInviteListDataCount = res.count;
            vm.inviteListData = res.data;
            // console.log(vm.inviteListData)
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
          obj.userLevel=String.fromCharCode(66+this.openIndex);
          //判断用户名
          if (!_data[i].userName){
            obj.userName = '-'
          }else {
            obj.userName = _data[i].userName;
          }
          //判断等级
          // if (!_data[i].userLevel) {
          //   obj.userLevel = '无等级'
          // } else {
          //   obj.userLevel = _data[i].userLevel;
          // }
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
        this.$router.push('/p-center/invite/detail');
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
        this.pageNow = 1;
        this.openIndex++;
        this.$router.push({path:'/p-center/invite',query:{id:this.uId,index:this.openIndex}})
      }
    },
    mounted() {

      if(this.$route.query.id && this.$route.query.index){
        this.uId=this.$route.query.id;
        this.openIndex = Number(this.$route.query.index);
      }else{
        this.uId = '';
        this.openIndex = 0;
      }
      this.getInviteListData(this.uId, 1);
    },
    watch:{
      '$route':function(val,oldVal){
        if(!val.query.index){
          this.openIndex = 0;
        }else{
          this.openIndex = Number(val.query.index);
        }
        this.uId=val.query.id;
        this.getInviteListData(this.uId, 1);
      }
    }
  }
</script>
