<template>
  <d2-container>
    <template slot="header"><span>黑白名单 - 编辑</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>

    <x-box title="编辑">
      <el-form ref="agencyForm" :model="data" label-width="100px" class="agencyForm">
        <el-form-item label="MID:">
          <span>{{$route.query.id}}</span>
        </el-form-item>
        <el-form-item :label="item.label+':'" v-for="(item, index) in config" :key="index">
          <el-radio-group v-model="data[item.name]">
            <el-radio :label="radioItem.label" v-for="(radioItem, idx) in item.radioGrop" :key="idx">{{radioItem.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
          <el-button @click="onCancel()">重置</el-button>
        </el-form-item>
      </el-form>
    </x-box>
    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin:0 auto;">返回</el-button>
  </d2-container>
</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";

export default {
  name: "blackWhite",
  data() {
    return {
      data: {
        dynamicStatus: "0",
        nicknameStatus: "0",
        photoStatus: "0",
        userMid: "",
        videoStatus: "0",
        withdrawStatus: "0"
      },
      config: [
        {
          label: "昵称",
          name: "nicknameStatus",
          radioGrop: [
            { label: "0", name: "正常" },
            { label: "1", name: "白名单" },
            { label: "2", name: "黑名单" }
          ]
        },
        {
          label: "动态",
          name: "dynamicStatus",
          radioGrop: [
            { label: "0", name: "正常" },
            { label: "1", name: "白名单" },
            { label: "2", name: "黑名单" }
          ]
        },
        {
          label: "图片",
          name: "photoStatus",
          radioGrop: [
            { label: "0", name: "正常" },
            { label: "1", name: "白名单" },
            { label: "2", name: "黑名单" }
          ]
        },
        {
          label: "视频",
          name: "videoStatus",
          radioGrop: [
            { label: "0", name: "正常" },
            { label: "1", name: "白名单" },
            { label: "2", name: "黑名单" }
          ]
        },
        {
          label: "提现",
          name: "withdrawStatus",
          radioGrop: [
            { label: "0", name: "正常" },
            { label: "2", name: "禁用" }
          ]
        }
      ]
    };
  },
  methods: {
    onSubmit() {
     
      this.axiosPOST(
        this,
        this.$API.API.editList,
        "application/json",
        JSON.stringify({
          dynamicStatus: Number(this.data.dynamicStatus) !== 0
            ? this.data.dynamicStatus
            : null,
          nicknameStatus: Number(this.data.nicknameStatus) !== 0
            ? this.data.nicknameStatus
            : null,
          photoStatus: Number(this.data.photoStatus) !== 0 ? this.data.photoStatus : null,
          userMid: this.$route.query.id,
          videoStatus: Number(this.data.videoStatus) !== 0 ? this.data.videoStatus : null,
          withdrawStatus: Number(this.data.withdrawStatus) !==0
            ? this.data.withdrawStatus
            : null
        }),
        (o, res) => {
          if (res.code === "1000") {
            this.$message(
              {
                message: "编辑成功",
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
    },
    resetData() {
      var statusArr = this.$route.query.status.trim().split(",");
      this.data = {
        nicknameStatus: statusArr[0],
        dynamicStatus: statusArr[1],
        photoStatus: statusArr[2],
        videoStatus: statusArr[3],
        withdrawStatus: statusArr[4]
      };
    },
    onCancel() {
      this.resetData();
    }
  },
  watch:{
     $route(to, from){
       if(to.name === 'blackWhiteDetail') {
         this.resetData();
       }
     }
  },
  created() {this.resetData();},
  components: {
    XBox,
    XForm
  }
};
</script>
<style lang="scss" scoped>
.agencyForm {
  padding-left: 100px;
}
</style>

