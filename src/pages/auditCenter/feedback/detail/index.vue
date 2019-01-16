<template>
  <d2-container>
    <template slot="header"><span></span>{{Number($route.query.status) !== 0 ? '查看' : '回复'}}<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <div v-loading="pageLoading" element-loading-text="加载中..." element-loading-background="rgba(255, 255, 255, 0.8)">
    </div>
    <div v-if="!pageLoading">
      <x-box title="反馈详情">
        <x-form :config="formData" :data="data" />
      </x-box>
      <x-box title="操作日志" v-if="Number($route.query.status) !== 0">
        <x-table :tHeader="tableData" :dataList="operateLogList" />
      </x-box>
      <x-box title="反馈处理" v-else>
        <el-form ref="auditForm" :model="auditData" label-width="80px" class="auditForm" :rules="rules">
          <el-form-item label="回复内容" prop="replyContent">
             <el-input v-model="auditData.replyContent"  style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="auditData.remark" placeholder="请填写对于该反馈的备注，非必填。（用户不可见）"  style="width:500px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('auditForm')" class="detail-btn">确认</el-button>
            <el-button @click="onCancel('auditForm')"  class="detail-btn">重置</el-button>
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
  name: "feeedback-detail",
  data() {
    return {
      pageLoading: false,
      data: {},
      formData: config.form,
      tableData: config.tHeader,
      operateLogList: [],
      auditData: {
        replyContent: "",
        remark: ""
      },
      rules: {
        replyContent: {
          validator: rules.noEmpty,
          trigger: "change",
          str: "请填写回复用户的内容"
        },
      }
    };
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
    getAllDetail() {
      let vm = this;
      vm.axiosGET(vm, vm.$API.API.feedbackDetail + vm.$route.query.id,
        'application/x-www-form-urlencoded',
        {},
        (vm,res)=>{
          vm.data = res.data;
          Object.assign(vm.data, {
              statusName:vm.data.status ? "已回复" : "待回复"
          });
          vm.operateLogList = vm.data.operateLogList;
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
        id:vm.$route.query.id,
        remark:vm.auditData.remark,
        replyContent:vm.auditData.replyContent
      }
      __promise
        .then(res => {
          vm.axiosPOST(vm, vm.$API.API.feedbackHandle,
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
      this.auditData.replyContent = '';
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
.auditForm {
  width: 350px;
  padding-left: 70px;
}
</style>

