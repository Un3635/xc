
<template>
  <el-dialog title="修改昵称" :visible.sync="dialog_nickname.dialogshow" :width="'400px'" :custom-class="'edit_nicknamenew'" :center="true" @close="$emit('update:show', false)" :before-close="bc">
    <el-form ref="form">
      <el-form-item>
        <el-input v-model="dialog_nickname.nickName" placeholder="昵称不超过10位字符" :maxlength=10 :minlength=2 autofocus @focus="dialog_nickname.err=''"> </el-input>
      </el-form-item>
      <div class="err" v-show="dialog_nickname.err">{{dialog_nickname.err}}</div>
      <el-form-item>
        <el-button class="sub" type="primary" @click="edit_nickname" :loading="dialog_nickname.sub_loading" :disabled="!(dialog_nickname.nickName&&dialog_nickname.nickName.length>=2&&dialog_nickname.nickName.length<=10)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
  @import "edit-nicknamenew.scss";
</style>

<script>
  import { updateUser } from "../../pages/mine/js/mineapi";
  export default {
    props: {
      show: {
        type: Boolean
      },
      nickName: {
        type: String
      }
    },
    data() {
      return {
        dialog_nickname: {
          nickName: "",
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
        this.dialog_nickname = {
          nickName: "",
          err: "",
          sub_loading: false,
          dialogshow: false
        };
      },
      edit_nickname() {
        this.dialog_nickname.sub_loading = true;
        updateUser({
          type: 1,
          value: this.dialog_nickname.nickName
        })
          .then(res => {
            // this.data.nickName = this.dialog_nickname.nickName;

            this.$store.commit("SET_USERINFO", {
              nickName: this.dialog_nickname.nickName
            });
            this.do_bc();
            this.$emit("childByValue", "昵称修改成功");
          })
          .catch(err => {
            this.dialog_nickname.err = err.msg;
          })
          .finally(() => (this.dialog_nickname.sub_loading = false));
      }
    },
    watch: {
      show() {
        this.dialog_nickname.dialogshow = this.show;
      }
    }
  };
</script>