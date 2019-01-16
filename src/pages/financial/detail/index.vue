<template>
  <d2-container>
    <template slot="header"><span></span>机构收益 — {{Number($route.query.status) === 0 ? '详情' : '发放'}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <x-box title="查看">
      <x-form :config="config.form" :data="data">
        <el-form ref="agencyForm" :model="agencyData" label-width="150px" :rules="rules" class="agencyForm" v-if="Number($route.query.status) === 1">
          <el-form-item label="本次发放收益:" prop="grantMoney">
            <el-input v-model="agencyData.grantMoney" placeholder="请填写发放收益金额">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="发放流水号:" prop="serialNumber">
            <el-input v-model="agencyData.serialNumber" placeholder="请填写发放流水号"></el-input>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input type="textarea" v-model="agencyData.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('agencyForm')">确认</el-button>
            <el-button @click="onCancel('agencyForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </x-form>
    </x-box>
    <x-box title="发放记录" v-if="Number($route.query.status) === 0">
      <x-table :tHeader="config.tHeader" :dataList="agencyIncomeGrantRecordList" />
    </x-box>
    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin:0 auto;">返回</el-button>
  </d2-container>

</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";
import XTable from "@/components/common/x-table";
import rules from "@/components/plugin/js/rules.js";
import config from "./config.js";

export default {
  name: "check",
  data() {
    return {
      config: config,
      data: {},
      agencyIncomeGrantRecordList: [],
      agencyData: {
        serialNumber: "",
        grantMoney: "",
        remark: ""
      },
      rules: {
        grantMoney: {
          validator:rules.positiveNum,
          trigger: "change",
          str: "请填写正确发放收益金额且应小于等于未发放收益",
          max: 0
        },
        serialNumber: {
          validator: rules.noEmpty,
          trigger: "change",
          str: "请填写发放流水号"
        }
      }
    };
  },
  methods: {
    getData() {
      this.axiosGET(
        this,
        this.$API.API[this.config.detail] + "/" + this.$route.query.id,
        "application/x-www-form-urlencoded",
        {},
        (o, res) => {
          this.data = res.data;
          this.rules.grantMoney.max = Number(this.data.grantIncome) + 1;
          Object.assign(this.data, {
            cumulativeIncomeUnit: this.data.cumulativeIncome + " 元",
            grantIncomeUnit: this.data.grantIncome + " 元",
            unGrantIncomeUnit: this.data.unGrantIncome + " 元"
          });

          if (Number(this.$route.query.status) === 0) {
            this.agencyIncomeGrantRecordList =
              res.data.agencyIncomeGrantRecordList;
          }
        }
      );
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axiosPOST(
            this,
            this.$API.API[this.config.review],
            "application/json",
            JSON.stringify({
              agencyId: this.$route.query.id,
              grantMoney: this.agencyData.grantMoney,
              serialNumber: this.agencyData.serialNumber,
              remark: this.agencyData.remark
            }),
            (o, res) => {
              if (res.code === "1000") {
                this.$message(
                  {
                    message: "发放成功",
                    type: "success"
                  },
                  2000
                );
                setTimeout(() => {
                  this.$router.go(-1);
                }, 3000);
              } else {
                this.$message({
                  message: res.message,
                  type: "erroe"
                });
              }
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onCancel(formName) {
      this.agencyData.serialNumber = "";
      this.agencyData.grantMoney = "";
      this.agencyData.remark = "";
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    '$route'(to, from) {
      if(to.name === 'agency') {
        this.getData();
      }
    }
  },
  created() {
    this.getData();
  },
  components: {
    XBox,
    XForm,
    XTable
  }
};
</script>
<style lang="scss" scoped>
.agencyForm {
  width: 70%;
}
</style>

