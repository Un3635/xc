
<template>
  <el-dialog title="修改个人简介" :visible.sync="dialog_introduce.dialogshow" :width="'400px'" :custom-class="'edit_nicknamenew'" :center="true" @close="$emit('update:show', false)" :before-close="bc">
    <el-form ref="form">
      <el-form-item >
        <el-input v-model="dialog_introduce.introduce" autofocus @focus="dialog_introduce.err=''" type="textarea" :rows="4"> </el-input>

      </el-form-item>
      <div class="err" v-show="dialog_introduce.err">{{dialog_introduce.err}}</div>
      <el-form-item>
        <el-button class="sub" type="primary" @click="edit_introduce"  :loading="dialog_introduce.sub_loading" :disabled="!dialog_introduce.introduce">修改个人简介</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
@import 'edit-nicknamenew.scss';
</style>

<script>
  import { updateUser } from "../../pages/mine/js/mineapi";
  export default {
    props: {
      show: {
        type: Boolean
      },
      introduce: {
        type: String
      }
    },
    data() {
      return {
        dialog_introduce: {
          introduce: "",
          err: "",
          sub_loading: false,
          dialogshow: this.show
        }
      };
    },
    methods: {
      bc(done) {
        this.do_bc();
        done();
      },
      do_bc() {
        this.dialog_introduce = {
          introduce: "",
          err: "",
          sub_loading: false,
          dialogshow: false
        };
      },
     
      edit_introduce() {
        if (this.dialog_introduce.introduce.length > 20) {
          this.$message.error("个人简介长度限制20个字");
          return;
        }

        this.dialog_introduce.sub_loading = true;
        updateUser({
          type: 4,
          value: this.dialog_introduce.introduce
        })
          .then(res => {
            // this.data.introduce = this.dialog_introduce.introduce;

            this.$store.commit("SET_USERINFO", {
              introduce: this.dialog_introduce.introduce
            });
            this.do_bc();
            this.$emit('childByValue', "个人简介修改成功")
          })
          .catch(err => {
            this.dialog_introduce.err = err.msg;
          })
          .finally(() => (this.dialog_introduce.sub_loading = false));
      }
    },
    watch: {
      show() {
        this.dialog_introduce.dialogshow = this.show;
      }
    }
  };
</script>