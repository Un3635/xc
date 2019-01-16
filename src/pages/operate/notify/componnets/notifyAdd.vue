<template>
    <d2-container>
        <template slot="header"><span></span>新增通知<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="通知文案：" prop="content">
                    <el-input v-model="paramsData.content" placeholder="请填写通知文案"></el-input>
                </el-form-item>
                <el-form-item label="跳转链接：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.jumpFlag" :label="1">URL</el-radio>
                        <el-radio v-model="paramsData.jumpFlag" :label="0">无</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="链接地址：" prop="jumpUrl" v-if="paramsData.jumpFlag">
                    <el-input v-model="paramsData.jumpUrl" placeholder="请填写链接地址"></el-input>
                </el-form-item>
                <el-form-item label="推送Push：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.pushFlag" :label="true">需要</el-radio>
                        <el-radio v-model="paramsData.pushFlag" :label="false">不需要</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="Push标题：" prop="pushTitle" v-if="paramsData.pushFlag">
                    <el-input v-model="paramsData.pushTitle" placeholder="请填写Push标题" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="Push内容：" prop="pushContent"  v-if="paramsData.pushFlag" maxlength="35">
                    <el-input v-model="paramsData.pushContent" placeholder="请填写Push内容"></el-input>
                </el-form-item>
                <el-form-item label="通知范围：" required>
                    <div class="item-radio">
                        <el-radio v-model="paramsData.noticeRange" :label="0">全部</el-radio>
                        <el-radio v-model="paramsData.noticeRange" :label="1">指定</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="指定名单：" v-if="paramsData.noticeRange === 1">
                    <div class="upload-wrap">
                        <p v-if="!hasFile">上传名单</p>
                        <p v-if="hasFile">重新上传</p>
                        <input id="file-selector" type="file"
                               accept = ".xls,.xlsx"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event)"
                               ref="uploadBtn">
                    </div>
                    <div class="upload-wrap" v-if="hasFile" @click="previewFile">
                        <p>查看表格</p>
                    </div>
                    <span class="load-tip">Excel第一行为标题（MID），第二行起填写用户MID，最多一次指定1000个用户</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain class="return-btn" @click="submitForm('paramsForm')">提交</el-button>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  import COS from 'cos-js-sdk-v5'
  import uuid from 'node-uuid'
  export default {
    data() {
      return {
        // imgDataUrl:'',
        fileList: [],
        paramsData:{
          'content':null,
          'excelUrl':null,
          'jumpFlag':1,
          'jumpUrl':null,
          'pushFlag':true,
          'pushContent':null,
          'pushTitle':null,
          'noticeRange':0,
        },
        rules: {
          content: [
            { required: true, message: '请填写通知文案', trigger: 'blur' },
          ],
          jumpUrl: [
            { required: true, message: '请填写链接地址', trigger: 'blur' },
          ],
          pushTitle: [
            { required: true, message: '请填写Push标题', trigger: 'blur' },
          ],
          pushContent: [
            { required: true, message: '请填写Push内容', trigger: 'blur' },
          ]
        },
        hasFile:false,
        keys:'',
        file:[]
      }
    },
    methods: {
      submitForm(formName) {
        let vm =this;
        if (this.paramsData.noticeRange === 0) {
          let vm = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              vm.axiosPOST(vm, vm.$API.API.noticeEdit,
                'application/json',
                vm.paramsData,
                vm.getSuccessCB
              );
              if (err) {
                console.log(err);
              }
            } else {
              return false;
            }
          });
        } else {
          if (this.hasFile) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                vm.axiosPOST(vm, vm.$API.API.noticeEdit,
                  'application/json',
                  vm.paramsData,
                  vm.getSuccessCB
                );
              } else {
                return false;
              }
            });
          } else {
            this.$message.error("请上传名单!")
          }
        }
      },
      //成功回调
      getSuccessCB(vm, res) {
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(() => {
          vm.$router.go(-1);
        }, 300)
      },
      //上传文件按钮
      triggerFile(event) {
        this.hasFile = true;
        let file = this.file = event.target.files[0];
        if (!file) return;
        let uid = uuid.v4().replace(/-/g, ""); //生成唯一文件名
        let index1 = file.name.lastIndexOf('.');
        let index2 = file.name.length;
        this.keys = uid + file.name.substring(index1, index2);
        // console.log(this.keys)
        this.upLoadFile();
      },
      upLoadFile() {
        let vm = this;
        let Bucket = 'meet-1257688644';
        let Region = 'ap-shanghai';
        // 初始化实例
        let cos = new COS({
          getAuthorization: function (options, callback) {
            vm.axiosGET(vm, vm.$API.API.tencentSig,
              'application/json;charset=UTF-8',
              {keys:vm.keys},
              function (vm, res) {
                callback({
                  TmpSecretId: res.data.credentials.tmpSecretId,
                  TmpSecretKey: res.data.credentials.tmpSecretKey,
                  XCosSecurityToken: res.data.credentials.sessionToken,
                  ExpiredTime: res.data.expiredTime
                });
              }
            )
          }
        });
        cos.putObject({
          Bucket: Bucket,
          Region: Region,
          Key: vm.keys,
          Body: vm.file
        }, function (err, data) {
          vm.paramsData.excelUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          if (err) {
            console.log(err);
          }
        });
      },
      //预览文件按钮
      previewFile(){
        let vm = this;
        vm.axiosGET(vm, vm.$API.API.noticeToBePreview,
          'application/x-www-form-urlencoded',
          {'excelUrl':vm.paramsData.excelUrl},
          (vm,res) => {
            vm.setFormData(res.data);
          }
        );
      },
     //设置弹窗表格
      setFormData(_data){
        let myData = [];
        for (let i = 0; i <_data.length; i++) {
          let obj = {};
          obj.mid = _data[i].mid;
          obj.nickName = _data[i].nickName ? _data[i].nickName : '-';
          switch(_data[i].accountStatus){ //账号状态
            case 0:
              obj.accountStatus = '正常';
              break;
            case 1:
              obj.accountStatus = '封停中';
              break;
            case 2:
              obj.accountStatus = '永久封停';
              break;
            default:
              obj.accountStatus = '-'
          }
          switch(_data[i].noticeStatus){ //通知状态
            case -1:
              obj.noticeStatus = '待通知';
              break;
            case 0:
              obj.noticeStatus = '通知成功';
              break;
            case 1:
              obj.noticeStatus = '通知失败';
              break;
            default:
              obj.noticeStatus = '-'
          }
          myData[i] = obj;
        }
        this.$store.commit('setShowPicPopOn',{type:'form',content:myData})
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>