<template>
  <d2-container>
    <template slot="header"><span></span>服务认证 — {{(Number($route.query.status) !== 0 && Number($route.query.status) !== 3) ? '详情' : '审核'}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    </div>
    <div v-if="!pageLoading">
      <x-box title="认证信息">
        <!-- 静态的form 表单 -->
        <x-form :config="formData" :data="data" />
      </x-box>
      <x-box title="操作日志" v-if="(Number($route.query.status) !== 0 && Number($route.query.status) !== 3)">
        <!-- 静态的form 表单 -->
        <x-table :tHeader="tableData" :dataList="auditOperateLogList" />
        <!-- <span>{{$route.query.status}}</span> -->
      </x-box>
      <x-box title="审核操作" v-else>
        <el-form ref="auditForm" :model="auditData" label-width="100px" class="auditForm" :rules="rules">
          <el-form-item label="审核结果">
            <el-radio-group v-model="auditData.auditResult">
              <el-radio label="通过"></el-radio>
              <el-radio label="拒绝"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Ms类型" v-show="auditData.auditResult ==='通过'" prop="msTypeId">
            <el-select v-model="auditData.msTypeId" placeholder="请选择Ms类型">
              <el-option :label="item.type" :value="item.id" v-for="(item, index) in msData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联机构" v-show="data.agencyFlag || auditData.auditResult ==='通过'">
            <el-radio-group v-model="auditData.agencyFlag" @change="changgeRadio">
              <el-radio label="无" :disabled="data.agencyFlag"></el-radio>
              <el-radio label="有"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机构类型" v-show="!data.agencyFlag && auditData.auditResult ==='通过' && auditData.agencyFlag ==='有'" prop="agencyId">
            <el-select v-model="auditData.agencyId" placeholder="请选择关联机构" @change="selectChange">
              <el-option :label="item.name" :value="item.id + '-' + item.dividedInto" v-for="(item, index) in agencyData" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构类型" v-show="data.agencyFlag">
            <span>{{data.agencyName}}</span>
          </el-form-item>
          <el-form-item label="Ms收益占比" v-show="!data.agencyFlag && auditData.auditResult ==='通过'" prop="msReward">
            <el-input v-model="auditData.msReward" placeholder="请填写Ms收益占比">
              <template slot="append">%</template>
            </el-input>

          </el-form-item>
          <el-form-item :label="radioLabel" v-show="!data.agencyFlag && auditData.auditResult ==='通过'">
            <span>{{platformReward}}</span>
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
    </div>
  </d2-container>
</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";
import XTable from "@/components/common/x-table";
import rules from "@/components/plugin/js/rules.js";
import config from "./detail.config.js";

export default {
  name: "service-detail",
  data() {
    return {
      pageLoading: false,
      data: {},
      formData: config.form,
      tableData: config.tHeader,
      auditOperateLogList: [],
      radioLabel: "平台收益占比",
      dividedInto: 0,
      msReward2: "",
      auditData: {
        auditResult: "通过",
        agencyFlag: "无",
        agencyId: "",
        msTypeId: "",
        msReward: "",
        remark: ""
      },
      msData: [],
      agencyData: [],
      rules: {
        msTypeId: {
          validator: rules.noEmpty,
          trigger: "change",
          str: "请选择Ms类型"
        },
        agencyId: {
          validator: rules.noEmpty,
          trigger: "change",
          str: "请选择机构类型"
        },
        msReward: {
          validator: rules.positiveNum,
          max: 100,
          trigger: "change",
          str: "请输入正确的Ms收益比"
        }
      }
    };
  },
  watch: {
    auditData: {
      handler(nv, ov) {
        if (!this.data.agencyFlag && !this.agencyData.length) this.getAgency();
      },
      deep: true
    }
  },
  computed: {
    platformReward() {
      var reg = /^[0-9]\d*$/;
      if (reg.test(this.auditData.msReward) && this.auditData.msReward < 100) {
        if (this.auditData.agencyFlag === "无")
          return 100 - this.auditData.msReward;
        else if (this.auditData.agencyFlag === "有")
          return Number(this.dividedInto) * 100 - this.auditData.msReward;
      } else {
        return "";
      }
    }
  },
  methods: {
    // check() {},
    changgeRadio(v1, v2) {
      // this.auditData.msReward = "";
      this.$refs['auditForm'].resetFields('msReward');
      if (v1 === "有") {
        this.radioLabel = "机构收益比";
      } else if (v1 === "无") {
        this.rules.msReward.max = 100;
      }
    },
    selectChange(v1, v2) {
      this.dividedInto = v1.split("-")[1];
      this.auditData.msReward = "0";
      // this.check();
      this.rules.msReward.max = Number(this.dividedInto) * 100;
    },
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
    getAllDetail(cb) {
      this.axiosMethod(
        this.$API.API.serviceCertificationDetail + "/" + this.$route.query.id,
        {},
        res => {
          this.data = res.data;
          cb && cb();
          this.auditOperateLogList = this.data.auditOperateLogList;
          // this.
          this.auditOperateLogList.map(item => {
            Object.assign(item, {
              reviewResultName: config.reviewResult[parseInt(item.reviewResult)]
            });
          });
        }
      );
    },
    getMs() {
      // 获取Ms类型
      this.axiosMethod(this.$API.API.mstypeList, { status: true }, res => {
        this.msData = res.data;
      });
    },
    getAgency() {
      // 获取机构
      this.axiosMethod(this.$API.API.agencyList, { status: 1 }, res => {
        this.agencyData = res.data;
      });
    },
    onSubmit(formName) {
      let that = this;
      let vf = function(validateFields, id, resolve, reject) {
        that.$refs[formName].validateField(validateFields[id], valid => {
          if (valid === "") {
            if (++id < validateFields.length) {
              vf(validateFields, id, resolve, reject);
            } else {
              resolve("success");
            }
          } else {
            console.log("error submit!!");
            reject("failed");
          }
        });
      };
      let __promise = new Promise((resolve, reject) => {
        if (this.auditData.auditResult === "拒绝") {
          resolve("success");
        } else {
          if (this.auditData.agencyFlag === "无") {
            // 无机构， 并且不关联机构的情况下，只需要判断 ms与收益的必填
            vf(["msTypeId", "msReward"], 0, resolve, reject);
          } else {
            if (!this.data.agencyFlag) {
              // 无机构， 关联机构的情况下， 判断 ms，收益，机构必填
              this.$refs[formName].validate(valid => {
                if (valid) {
                  resolve("success");
                } else {
                  console.log("error submit!!");
                  reject("failed");
                  return false;
                }
              });
            } else {
              // 有机构，只需要判断 ms
              vf(["msTypeId"], 0, resolve, reject);
            }
          }
        }
      });
      // 有机构进行审核，auditResult 是 3（带机构审核）
      // 无机构审核， auditResult 是 1
      __promise
        .then(res => {
          let __auditResult = -1;
          if (!this.data.agencyFlag) {
            // 无机构审核
            if (
              this.auditData.auditResult === "通过" &&
              this.auditData.agencyFlag === "无"
            ) {
              __auditResult = 1;
            } else if (
              this.auditData.auditResult === "通过" &&
              this.auditData.agencyFlag === "有"
            ) {
              __auditResult = 4;
            } else {
              __auditResult = 2;
            }
          } else {
            // 有机构 审核
            __auditResult = this.auditData.auditResult === "通过" ? 4 : 5;
          }

          var __p = {
            id: this.$route.query.id,
            auditResult: __auditResult,
            remark: this.auditData.remark
          };
          if (!this.data.agencyFlag && this.auditData.auditResult === "通过") {
            Object.assign(__p, {
              agencyFlag: this.auditData.agencyFlag === "无" ? false : true,
              msTypeId: this.auditData.msTypeId,
              msReward: Number(this.auditData.msReward) / 100
            });
            if (this.auditData.agencyFlag === "有") {
              Object.assign(__p, {
                agencyId: this.auditData.agencyId.split("-")[0]
              });
            }
          }
          if (this.data.agencyFlag && this.auditData.auditResult === "通过") {
            // 有机构的情况下，只需要传入MS的id
            Object.assign(__p, {
              msTypeId: this.auditData.msTypeId,
              agencyInviteFlag: true
            });
          }
          this.axiosPOST(
            this,
            this.$API.API.doAuthenticate,
            "application/json",
            JSON.stringify(__p),
            (o, res) => {
              if (res.code === "1000") {
                this.$message(
                  {
                    message: "审核成功",
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
                  type: "error"
                });
              }
            }
          );
        })
        .catch(() => {
          return false;
        });
    },
    onCancel(formName) {
      // this.auditData
      this.auditData.auditResult = "通过";
      if (!this.data.agencyFlag) this.auditData.agencyFlag = "无";
      this.auditData.remark = "";
      this.$refs[formName].resetFields();
    }
  },
  created() {
    // 只有申请中和待机构审核 是需要 审核的
    if (
      parseInt(this.$route.query.status) !== 0 &&
      parseInt(this.$route.query.status) !== 3
    ) {
      this.formData = this.formData.concat(config.check);
    } else {
      this.getMs();
    }
    this.getAllDetail(() => {
      // 若有机构， 则直接审核即可，需要对机构进行选择
      this.auditData.agencyFlag = this.data.agencyFlag ? "有" : "无";
    });
  },
  components: {
    XBox,
    XForm,
    XTable
  }
};
</script>
<style lang="scss" scoped>
.auditForm {
  width: 350px;
}
</style>

