<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;">附加值管理 - 查看<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <x-box title="查看">
      <x-form :config="config" :data="data"></x-form>
    </x-box>
    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin:0 auto;">返回</el-button>
  </d2-container>
</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";

export default {
  name: "addAddtionnal",
  data() {
    return {
      data: {},
      config: [
        {
          field: "type",
          label: "类型: ",
          names:['展示', '用户', 'MS']
        },
        {
          field: "userMid",
          label: "MID: "
        },
        {
          field: "nowValue",
          label: "当前值: "
        },
        {
          field: "attribute",
          label: "附加值属性: ",
          names: ['正', '负']
        },
        {
          field: "addedValue",
          label: "附加值: "
        },
        {
          field: "durationHour",
          label: "附加时长: "
        },
        {
          field: "remark",
          label: "备注: "
        }
      ]
    };
  },
  methods: {
    getData() {
       this.axiosGET(
        this,
        this.$API.API.item + '/' + this.$route.query.id,
        "application/x-www-form-urlencoded",
        {},
        (o, res) => {
         this.data = res.data;
        }
      );
    }
  },
  created() {
    this.getData();
  },
  components: {
    XBox,
    XForm
  }
};
</script>

