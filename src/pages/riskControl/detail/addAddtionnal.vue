<template>
  <d2-container>
    <template slot="header" style="font-size:18px;font-weight:800;"><span>附加值管理 - 新增附加值</span><i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
    <x-box title="新增">
      <el-form ref="form" :model="form" label-width="180px" class="addAddtionnalForm" :rules="rules">
        <el-form-item label="附加值类型:">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="用户" value="1"></el-option>
            <el-option label="展示" value="0"></el-option>
            <el-option label="MS" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="MID:" prop="userMid">
          <el-input v-model="form.userMid" placeholder="请填写MID" @blur="blur"></el-input>
        </el-form-item>
        <el-form-item label="当前值:">
          <span :class="{nowValueBlur: typeof form.nowValue !== 'number'}">{{form.nowValue > -1 ? form.nowValue : '请先在MID的输入框中输入MID'}}</span>
        </el-form-item>
        <el-form-item label="附加值属性:">
          <el-radio-group v-model="form.attribute">
            <el-radio label="0">正</el-radio>
            <el-radio label="1">负</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="附加值:" prop="addedValue">
          <el-input v-model="form.addedValue"></el-input>
        </el-form-item>
        <el-form-item label="附加时长:" prop="durationHour">
          <el-input v-model="form.durationHour">
            <template slot="append">H</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="loadingBtn">确定</el-button>
          <el-button @click="onCancel('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </x-box>
    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin:0 auto;">返回</el-button>
  </d2-container>
</template>
<script>
import XBox from "@/components/common/x-box";
import XForm from "@/components/common/x-form";
import rules from "@/components/plugin/js/rules";
export default {
  name: "addAddtionnal",
  data() {
    return {
      loadingBtn: false,
      form: {
        type: "1",
        userMid: "",
        attribute: "0",
        nowValue: "",
        addedValue: 1,
        durationHour: 1,
        remark: ""
      },
      rules: {
        userMid: {
          validator: rules.num,
          trigger: "change",
          str: "请填写MID"
        },
        addedValue: {
          validator: rules.num,
          trigger: "change",
          str: "附加值为正整数"
        },
        durationHour: {
          validator: rules.num,
          trigger: "change",
          str: "时长为正整数"
        }
      }
    };
  },
  methods: {
    add() {
      this.axiosPOST(
        this,
        this.$API.API.add,
        "application/json",
        JSON.stringify(this.form),
        (o, res) => {
          if (res.code === "1000") {
            this.$message(
              {
                message: "添加成功",
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.add();
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$refs.form.resetFields();
      this.form = {
        type: "1",
        userMid: "",
        attribute: "0",
        nowValue: "",
        addedValue: 1,
        durationHour: 1,
        remark: ""
      }
    },
    blur() {
      this.$refs["form"].validateField("userMid", valid => {
        if (!valid) {
          this.axiosGET(
            this,
            this.$API.API.mScore + "/" + this.form.userMid,
            "application/x-www-form-urlencoded",
            {},
            (o, res) => {
              this.form.nowValue = res.data;
            },
            () => {
              this.form.nowValue = "";
            }
          )
        } else {
          return false;
        }
      });
    }
  },
  created() {},
  components: {
    XBox,
    XForm
  }
};
</script>
<style lang="scss" scoped>
.addAddtionnalForm {
  width: 700px;
}
.nowValueBlur {
  color: #ccc;
  font-size: 12px;
}
</style>

