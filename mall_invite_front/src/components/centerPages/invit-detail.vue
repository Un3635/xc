<template>
    <div class="invit-list invit-detail">
        <div class="module-title">邀请详情</div>
        <div class="invit-list-content invit-detail-content">
            <el-table
                    :data="inviteInfoForm"
                    style="width: 100%">
                <el-table-column
                        prop="goodsName"
                        label="订单商品"
                        width="300px"
                >
                </el-table-column>
                <el-table-column label="奖励日期" width="280px">
                    <template slot-scope="scope">
                        {{scope.row.time | date('YYYY-MM-DD')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="size"
                        label="返佣">
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态">
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination background
                               layout="prev, pager, next"
                               @current-change="handleCurrentChange"
                               :current-page="pageNow"
                               :page-size="pageNum"
                               :total="allInviteInfoCount"
                               v-if="allInviteInfoCount">
                </el-pagination>
            </div>

        </div>
    </div>


</template>
<script>

export default {
  name: 'invitDetail',
  data() {
    return {
      allInviteInfoCount: '',
      inviteInfoData: [],
      inviteInfoForm: [],//表格数据
      pageNow: 1,
      pageNum: 6
    };
  },
  computed: {
    inviteId() {
      return this.$store.state.inviteId;
    }
  },
  methods: {
    //获取邀请列表数据
    getInviteInfoData(uid, id, num) {
      let _params = {
        inviteUid: uid || '', //邀请人的Id，不填默认为当前用户
        inviteId: id,  //被邀请人的Id
        page_num: num || '',
        page_size: 6
      };
      let vm = this;
      getajaxdata(API.getInviteInfo, 'GET', _params, 'JSON', function (res) {
        if (res.code == '1000') {
          vm.allInviteInfoCount = res.count;
          vm.inviteInfoData = res.data;
          // console.log(res)
          vm.setInviteInfoFormData();
        }
      }, this)
    },
    //获取表格数据
    setInviteInfoFormData() {
      let myData = [];
      let _data = this.inviteInfoData;
      for (let i = 0; i < _data.length; i++) {
        let obj = {};
        obj.goodsName = _data[i].goodsName;
        obj.time = _data[i].time;
        obj.size = _data[i].size + _data[i].unit;
        obj.status = _data[i].status;
        myData[i] = obj;
      }
      this.inviteInfoForm = myData;
    },
    //分页
    handleCurrentChange(currentPage) {
      this.pageNow = currentPage;
      this.getInviteInfoData('', this.inviteId, currentPage);
    }
  },
  mounted() {
    this.getInviteInfoData('', this.inviteId, 1);
  }
};
</script>