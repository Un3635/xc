<template>
  <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    <!-- <template slot="header" style="font-size:18px;font-weight:800;">{{title}}</template> -->
    <filterList :filterItem="filterItem" :searchList="searchList" :selectList="selectList" :btnList="btnList" @addOptionHandle="addAdditional" @filterDataHandle="filterDataHandle" @resetDataHandle="resetDataHandle"></filterList>
    <x-table :tHeader="tHeader" :dataList="data" :tatalCount="tatalCount" :page="page" :pagesize="pagesize" @pagination="pagination">
      <el-table-column v-if="$route.name ==='blackWhite' && $store.state.d2admin.authorityBtnState" label="操作" min-width="80">
        <template slot-scope="scope">
          <p style="color:#003d96;cursor:pointer;" @click="pathTo(scope.$index, scope.row)">{{btnStr}}</p>
        </template>
      </el-table-column>
      <el-table-column v-if="$route.name==='additional'" label="操作" min-width="80">
        <template slot-scope="scope">
          <p style="color:#003d96;cursor:pointer;" @click="pathTo(scope.$index, scope.row)">{{btnStr}}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="$route.name==='alarm'" label="操作" min-width="80">
        <template slot-scope="scope">
          <p style="color:#003d96;cursor:pointer;" @click="pathTo(scope.$index, scope.row)">{{opStr}}</p>
        </template>
      </el-table-column> -->
    </x-table>
  </div>
</template>
<script>
import XTable from "@/components/common/x-table";
import filterList from "@/components/filter/filterList";
import config from "./config";
export default {
  name: "riskControl",
  data() {
    return {
      title: "",
      searchList: "",
      selectList: "",
      tHeader: "",
      filterItem: {},
      data: [],
      tatalCount: 0,
      page: 1,
      pagesize: 10,
      filterData: {},
      btnList: {
        text: "新增附加值"
      },
      btnStr: "",
      pageLoading: false
    };
  },
  methods: {
    opStr() {},
    setData(rn) {
      this.title = config[rn].title;
      this.searchList = config[rn].searchList || null;
      this.selectList = config[rn].selectList || null;
      if (this.searchList) this.filterItem.searchFilter = true;
      if (this.selectList) this.filterItem.selectFilter = true;
      if (rn === "additional" && this.$store.state.d2admin.authorityBtnState)
        this.filterItem.addBtn = true;
      this.tHeader = config[rn].tHeader;
      this.btnStr =
        rn === "additional" ? "查看" : rn === "blackWhite" ? "编辑" : "";

      return this;
    },
    getData(rn) {
      var rn = rn || this.$route.name;
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
          // this.data = res.data;
          this.pageLoading = false;
          this.data = this.fns(rn)[this.$route.name](res.data);
          this.tatalCount = res.count;
        }
      );
      return this;
    },
    fns(rn) {
      return {
        blackWhite: data => {
          return data.map(item => {
            return Object.assign(item, {
              dynamicStatusName:
                item.dynamicStatus && item.dynamicStatus > -1
                  ? config[rn]["dynamicStatusName"][Number(item.dynamicStatus)]
                  : "正常",
              nicknameStatusName:
                item.nicknameStatus && item.nicknameStatus > -1
                  ? config[rn]["nicknameStatusName"][
                      Number(item.nicknameStatus)
                    ]
                  : "正常",
              photoStatusName:
                item.photoStatus && item.photoStatus > -1
                  ? config[rn]["photoStatusName"][Number(item.photoStatus)]
                  : "正常",
              videoStatusName:
                item.videoStatus && item.videoStatus > -1
                  ? config[rn]["videoStatusName"][Number(item.videoStatus)]
                  : "正常",
              withdrawStatusName:
                item.withdrawStatus && item.withdrawStatus > -1
                  ? config[rn]["withdrawStatusName"][Number(item.withdrawStatus)]
                  : "正常"
            });
          });
        },
        additional: data => {
          return data.map(item => {
            console.log(item.attribute, config[rn]["attributeName"][Number(item.attribute)])
            return Object.assign(item, {
              attributeName:
                config[rn]["attributeName"][Number(item.attribute)],
              statusName: config[rn]["statusName"][Number(item.status)],
              typeName: config[rn]["typeName"][Number(item.type)]
            });
          });
        },
        alarm: data => {
          return data.map(item => {
            return Object.assign(item, {
              statusName: config[rn]["statusName"][Number(item.status)]
            });
          });
        }
      };
    },
    pathTo(index, row) {
      var path = "",
        param = {};
      switch (this.$route.name) {
        case "blackWhite":
          path = "/riskControl/blackWhite/detail";
          param['id'] = row.userMid;
          param['status'] = `${row.nicknameStatus || 0},${row.dynamicStatus || 0},${row.photoStatus || 0},${row.videoStatus || 0},${row.withdrawStatus  || 0}`;
          break;
        case "additional":
          path = "/riskControl/additional/detail";
          param['id'] = row.id;
          break;
        default:
          return;
      }
      this.$router.push({
        path: path,
        query: param
      });
    },
    addAdditional() {
      this.$router.push({
        path: "/riskControl/additional/add"
      });
    },
    filterDataHandle(filterData) {
      this.page = 1;
      this.filterData = {
        meetId: filterData.searchContent[0]
      };
      if (this.$route.name === "additional") {
        Object.assign(this.filterData, {
          meetId: filterData.searchContent[0],
          type: filterData.searchState[0],
          status: filterData.searchState[1]
        });
      }
      this.getData();
    },
    resetDataHandle() {
      this.page = 1;
      this.filterData = {};
      this.getData();
    },
    pagination(page) {
      // 分页
      this.page = page;
      this.getData();
    }
  },
  // watch: {
  //   $route(to, from) {
      
  //     if (to.name === "blackWhite" || to.name === "additional" || to.name === "alarm") {
  //        console.log(to.name, this.data);
  //       this.setData(to.name).getData(to.name);
  //     }
  //   }
  // },
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

