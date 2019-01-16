<template>
  <d2-container>
    <template slot="header"><span></span>{{Number($route.query.status) !== 0 ? '查看' : '处理'}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    </div>
    <div v-if="!pageLoading">
      <x-box title="举报详情">
        <x-form :config="formData" :data="data"/>
      </x-box>
      <x-box title="举报处理" v-if="Number($route.query.status) === 0">
        <el-form ref="auditForm" :model="auditData" label-width="80px" class="auditForm">
          <el-form-item label="处理结果">
            <el-radio-group v-model="auditData.auditResult" required>
              <el-radio label="受理"></el-radio>
              <el-radio label="忽视"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="auditData.remark" placeholder="请填写对于该反馈的备注，非必填。（用户不可见）" style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('auditForm')" class="detail-btn">确认</el-button>
            <el-button @click="onCancel('auditForm')" class="detail-btn">重置</el-button>
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
import config from "./detail.config.js";

export default {
  name: "service-detail",
  data() {
    return {
      pageLoading: false,
      data: {},
      formData: config.form,
      auditData: {
        auditResult: "受理",
        remark: ""
      }
    };
  },
  methods: {
    getAllDetail() {
      let vm = this;
      vm.axiosGET(vm, vm.$API.API. reportDetail + vm.$route.query.id,
        'application/x-www-form-urlencoded',
        {},
        (vm,res)=>{
          vm.data = res.data;
        }
      )
    },
    onSubmit(formName) {
      let vm =this;
      let __promise = new Promise((resolve, reject) => {
          vm.$refs[formName].validate(valid => {
            if (valid) {
              resolve("success");
            } else {
              console.log("error submit!!");
              reject("failed");
            }
          });
      });
      let __p = {
              id: vm.$route.query.id,
              resultType: vm.auditData.auditResult === "受理" ? 2 : 1,
              remark: vm.auditData.remark
            }
      __promise
        .then(res => {
          vm.axiosPOST(vm, vm.$API.API.reportHandle,
            "application/json",
            JSON.stringify(__p),
            res => {
              vm.$message({
                message: '提交成功！',
                type: 'success'
              });
              setTimeout(() => {
                vm.$router.go(-1);
              }, 300)
            }
          )
        })
        .catch(() => {
          return false;
        });
    },
    onCancel(formName) {
      this.auditData.auditResult = '受理';
      this.auditData.remark = '';
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.getAllDetail();
  },
  components: {
    XBox,
    XForm,
    XTable
  }
};
</script>
<style lang="scss" scoped>

</style>

