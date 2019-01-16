<template>
  <!-- <template slot="header" style="font-size:18px;font-weight:800;">{{title}}</template> -->
  <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    <filterList :filterItem="filterItem" :searchList="searchList" :selectList="selectList" @filterDataHandle="filterDataHandle" @resetDataHandle="resetDataHandle" />
    <x-table :tHeader="tHeader" :dataList="data" :tatalCount="tatalCount" @pagination="pagination" :page="page" :pagesize="pagesize">
      <el-table-column v-if="$route.name==='agency'" label="操作" min-width="130">
        <template slot-scope="scope">
          <div>
            <span style="color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row, 0)">查看</span>
            <span v-show="Number(scope.row.unGrantIncome) > 0 && $store.state.d2admin.authorityBtnState"> | </span>
            <span v-show="Number(scope.row.unGrantIncome) > 0 && $store.state.d2admin.authorityBtnState" style="color:#003d96;cursor:pointer;" @click="handleDetail(scope.$index, scope.row, 1)">发放</span>
          </div>
        </template>
      </el-table-column>
    </x-table>
  </div>
</template>
<script>
import filterList from "../../components/filter/filterList";
import XTable from "../../components/common/x-table";
import config from "./config";

export default {
  name: "topup",
  data() {
    return {
      title: "",
      searchList: "",
      selectList: "",
      tHeader: "",
      filterItem: {},
      data: [],
      tatalCount: 0,
      filterData: {},
      page: 1,
      pagesize: 10,
      pageLoading: false
    };
  },
  methods: {
    setData(rn) {
      this.title = config[rn].title;
      this.searchList = config[rn].searchList || null;
      this.selectList = config[rn].selectList || null;
      if (this.searchList) this.filterItem.searchFilter = true;
      if (this.selectList) this.filterItem.selectFilter = true;
      this.tHeader = config[rn].tHeader;
      return this;
    },
    getData(rn) {
      this.pageLoading = true;
      this.axiosGET(
        this,
        this.$API.API[config[rn].list],
        "application/x-www-form-urlencoded",
        Object.assign(
          {
            pageNum: this.page,
            pageSize: this.pagesize
          },
          this.filterData
        ),
        (o, res) => {
          this.pageLoading = false;
          this.data = res.data;
          let __rn = rn;
          if (rn === "exchange" || rn === "withdrawal") {
            __rn = "ew";
          } else if (rn === "diamonds" || rn === "gemstone") {
            __rn = "dg";
          }
          this.neatData()[__rn]();
          this.tatalCount = res.count;
        }
      );
      return this;
    },
    neatData() {
      // 对数据重新组合
      return {
        topup: () => {
          this.data.map(item => {
            Object.assign(item, {
              channelName:
                item.channel > -1
                  ? this.selectList[0].options[Number(item.channel) + 1]
                    ? this.selectList[0].options[Number(item.channel) + 1].label
                    : "-"
                  : "-",
              statusName:
                item.status > -1
                  ? this.selectList[1].options[item.status + 1]
                    ? this.selectList[1].options[Number(item.status) + 1].label
                    : "-"
                  : "-"
            });
          });
        },
        ew: () => {
          this.data.map(item => {
            Object.assign(item, {
              statusName:
                item.status > -1
                  ? this.selectList[0].options[item.status + 1]
                    ? this.selectList[0].options[item.status + 1].label
                    : "-"
                  : "-"
            });
          });
        },
        dg: () => {
          this.data.map(item => {
            Object.assign(item, {
              billTypeName:
                item.billType > -1
                  ? this.selectList[0].options[item.billType + 1]
                    ? this.selectList[0].options[item.billType + 1].label
                    : "-"
                  : "-",
              behaviorTypeName:
                item.behaviorType > -1
                  ? config[this.$route.name].behaviorTypeNames[
                      item.behaviorType
                    ]
                  : "-"
            });
          });
        },
        agency: () => {}
      };
    },
    filterDataHandle(data) {
      let rn = this.$route.name;
      switch (rn) {
        case "topup":
        case "withdrawal":
        case "exchange":
          this.filterData = {
            serialNumber: data.searchContent[0] || "",
            mid: data.searchContent[1] || ""
          };

          if (rn === "topup") {
            this.filterData["channel"] = data.searchState[0] || "";
            this.filterData["status"] = data.searchState[1] || "";
          }
          if (rn === "withdrawal") {
            this.filterData["address"] = data.searchContent[2]+'' || "";
            this.filterData["status"] = data.searchState[0] || "";
          }
          if (rn === "exchange") {
            this.filterData["status"] = data.searchState[0] || "";
          }
          break;
        case "diamonds":
        case "gemstone":
          this.filterData = {
            mid: data.searchContent[0],
            // address: data.searchState[0],
            type: data.searchState[0],
            behavior: data.searchState[1]
          };
          break;
        case "agency":
          this.filterData = {
            name: data.searchContent[0]
          };
          break;

        default:
          return;
      }
      this.page = 1;
      this.getData(rn);
    },
    resetDataHandle() {
      this.filterData = {};
      this.page = 1;
      this.getData(this.$route.name);
    },
    handleDetail(index, row, status) {
      // status: 0 查看
      // status: 1 发放
      this.$router.push({
        path: "/financial/agency/detail",
        query: {
          id: row.id,
          status: status
        }
      });
    },
    pagination(page) {
      // 分页
      this.page = page;
      this.getData(this.$route.name);
    }
  },
  created() {
    this.$store.commit("getAuthorityBtnState", this.$route.path);
    this.setData(this.$route.name).getData(this.$route.name);
  },
  components: {
    filterList,
    XTable
  }
};
</script>
<style lang="scss" scoped>
</style>

