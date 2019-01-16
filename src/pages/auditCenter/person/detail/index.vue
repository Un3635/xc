<template>
  <d2-container v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">

    <template slot="header"><span></span>{{getHeader()}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <x-box title="动态信息">
      <x-form :config="config.form[$route.query.type]" :data="dataForm" />
    </x-box>
    <!-- 附件信息只有主页动态的时候才有，stpe(person) -->
    <x-box title="附件信息" v-if="$route.query.type === 'person' ">
      <x-table :dataList="attachmentList" :tHeader="config.attachment" />
    </x-box>
    <x-box title="操作日志" v-show="opstatus === 1">
      <x-table :dataList="auditOperateLogList" :tHeader="config.tHeader" />
    </x-box>
    <x-box title="复核操作" v-show="opstatus === 0">
      <el-form ref="auditForm" :model="auditData" label-width="80px" class="auditForm">
        <el-form-item label="复核结果">
          <el-radio-group v-model="auditData.auditResult">
            <el-radio label="正常"></el-radio>
            <el-radio label="禁止"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="auditData.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('auditForm')">确认</el-button>
          <el-button @click="onCancel('auditForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </x-box>
     <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin:0 auto;">返回</el-button>
  </d2-container>
</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";
import XTable from "@/components/common/x-table";
import config from "./index.js";

export default {
  name: "personDetail",
  data() {
    return {
      pageLoading: false,
      config: "",
      dataForm: {},
      attachmentList: [],
      auditOperateLogList: [],
      auditData: {
        auditResult: "正常",
        remark: ""
      },
      opstatus: -1
    };
  },
  components: {
    XBox,
    XForm,
    XTable
  },
  methods: {
    axiosMethod(queryUrl, param, cb, ct) {
      this.axiosGET(
        this,
        queryUrl,
        ct || "application/x-www-form-urlencoded",
        param || {},
        (o, res) => {
          cb && cb(res);
          // console.log(this.auditOperateLogList);
        }
      );
    },
    setData() {
      this.config =
        this.$route.query.type === "person" ? config.person : config.other;

      return this;
    },
    getHeader() {
      // 地址栏参数是0 复核； 1是查看
      this.opstatus = Number(this.$route.query.status);
      return `${this.config.title[this.$route.query.type]} - ${
        this.opstatus == 0 ? "复核" : "查看"
      }`;
    },
    getData() {
      this.axiosMethod(
        this.$API.API[this.config.detail[this.$route.query.type]] +
          "/" +
          this.$route.query.id,
        {},
        res => {
          // eval('('+this.$route.query.type+')')(res);
          if(!res.data.id) return;
          this.dataForm = res.data;
          if (this.$route.query.type === "person") {
            this.attachmentList = res.data.attachmentList;
            this.attachmentList.map(item => {
              Object.assign(item, {
                statusName: config.attachment[item.status],
                typeName: config.attachmentType[item.type]
              });
            });
          }
          // 当查看的时候，需要查看操作日志
          if (Number(this.$route.query.status) === 1) {
            this.auditOperateLogList = res.data.auditOperateLogList;
            this.auditOperateLogList.map(item => {
              Object.assign(item, {
                reviewResultName: config[this.$route.query.type + "StatusName"][Number(item.reviewResult)]
              });
            });
          }
        }
       
      );
    },
    onSubmit() {
      this.axiosPOST(
        this,
        this.$API.API[this.config.review[this.$route.query.type]],
        "application/json",
        JSON.stringify({
          auditResult: this.auditData.auditResult === "正常" ? 1 : 5,
          id: this.$route.query.id,
          remark: this.auditData.remark
        }),
        (o, res) => {
          if (res.code === "1000") {
            this.$message({
              message: "复核成功",
              type: "success"
            }, 2000);
            setTimeout(() => {
              this.$router.go(-1);
            }, 3000)
          } else {
            this.$message({
              message: res.message,
              type: "erroe"
            });
          }
        }
      );
    },
    onCancel(formName) {
      this.auditData.auditResult = "正常";
      this.auditData.remark = "";
      this.$refs[formName].resetFields();
    }
  },
  created() {
    // this.config =
    this.setData().getData();
  }
};
</script>
<style lang="scss" scoped>
</style>

