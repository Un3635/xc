<template>
    <d2-container>
        <template slot="header"><span></span>新增标签<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
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
                        <el-radio v-model="paramsData.noticeRange" :label="true">全部</el-radio>
                        <el-radio v-model="paramsData.noticeRange" :label="false">指定</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="指定名单：" prop="name" v-if="!paramsData.noticeRange">
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
                    <div class="upload-wrap" v-if="hasFile" @click="preview">
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
  import XLSX from 'xlsx'
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
          'noticeRange':true,
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
        if (this.paramsData.noticeRange) {
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
          if (this.$refs.uploadBtn.files.length >= 1) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.upLoadFile();
              } else {
                return false;
              }
            });
          } else {
            this.$message.error("请上传名单!")
          }
        }
      },
      triggerFile(event) {
        this.hasFile = true;
        let file = this.file = event.target.files[0];
        if (!file) return;
        // this.imgDataUrl =this.getObjectURL(file)
        // console.log(this.imgDataUrl);
        let uid = uuid.v4().replace(/-/g, ""); //生成唯一文件名
        let index1 = file.name.lastIndexOf('.');
        let index2 = file.name.length;
        this.keys = uid + file.name.substring(index1, index2);
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
          vm.axiosPOST(vm, vm.$API.API.noticeEdit,
            'application/json',
            vm.paramsData,
            vm.getSuccessCB
          );
          if (err) {
            console.log(err);
          }
        });
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
      preview() {
        let vm = this;
        let wb;//读取完成的数据
        let rABS = false; //是否将文件读取为二进制字符串
        function fixdata(data) { //文件流转BinaryString
          let o = "",
            l = 0,
            w = 10240;
          for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
        }
        if(!this.file) {
          return;
        }
        let f = this.file;
        let reader = new FileReader();
        reader.onload = function(e) {
          let data = e.target.result;
          if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)),{
              type: 'base64'
            });
          } else {
            wb = XLSX.read(data,{
              type: 'binary'
            });
          }
          // console.log(JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])));
          let excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          vm.$store.commit('setShowPicPopOn',{type:'form',content:excelData})
        };
        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }

      },
      //获取文件路径
      getObjectURL (file) {
        let url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // webkit or chrome
          url = window.URL.createObjectURL(file) ;
        }
        return url ;
      },
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>