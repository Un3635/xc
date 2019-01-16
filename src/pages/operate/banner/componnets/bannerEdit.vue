<template>
    <d2-container>
        <template slot="header"><span></span>编辑<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail"
             v-loading="pageLoading"
             element-loading-text="加载中..."
             element-loading-background="rgba(255, 255, 255, 0.8)">
            <el-form :model="paramsData" :rules="rules" ref="paramsForm" label-width="150px" class="rule-form">
                <el-form-item label="标题：">
                    <span class="text">{{tableData.title}}</span>
                </el-form-item>
                <el-form-item label="Banner：">
                    <img class = "picture" :src="paramsData.imgUrl" @click="previewPic"/>
                    <div class="upload-wrap" style="vertical-align:bottom;">
                        <p >重新上传</p>
                        <input id="file-selector" type="file"
                               accept = ".png,.jpg,.gif,.jpeg"
                               name="filename"
                               class="uploadBtn"
                               @change="triggerFile($event)"
                               ref="uploadBtn">
                    </div>
                    <span class="text" style="color:#ccc; display:inline-block;margin-left:10px;vertical-align:bottom;">建议小于500KB</span>
                </el-form-item>
                <el-form-item label="所属Tab：">
                    <el-select v-model="paramsData.ownTabId" placeholder="请选择所对应的Tab">
                        <el-option v-for="(tab,index) in allTab" :label="tab.name" :value="tab.name" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上线日期：">
                    <span class="text">{{tableData.startTime}}</span>
                </el-form-item>
                <el-form-item label="下线日期：">
                    <span class="text">{{tableData.endTime}}</span>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input-number class="item-number"  v-model="paramsData.sort" :precision="0" controls-position="right" :min="0" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="跳转链接：">
                    <div class="item-radio">
                        <el-radio v-model="paramsData.linkType" :label="0">URL</el-radio>
                        <el-radio v-model="paramsData.linkType" :label="1">无</el-radio>
                    </div>
                </el-form-item>
                <el-form-item label="链接地址" prop="jumpLinkUrl" v-if="paramsData.linkType===0">
                    <el-input class="item-input" v-model="paramsData.jumpLinkUrl" placeholder="请填写URL地址"></el-input>
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
        id:'',
        allTab:[],
        tableData:{},
        pageLoading: false,//loading
        paramsData:{
          'id': null,
          'imgUrl': '',
          'jumpLinkUrl': null,
          'linkType': 0,
          'ownTabId': null,
          'sort': null,
        },
        rules: {
          jumpLinkUrl: [
            { required: true, message: '请填写URL地址', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      //获取所有tab
      getAllTab(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.interestList,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) =>{
            vm.allTab = res.data;
          })
      },
      //上传文件
      triggerFile(event) {
        // this.hasFile = true;
        let file = this.file = event.target.files[0];
        if (!file) return;
        this.paramsData.imgUrl =this.getObjectURL(file); //获取图片地址
        let uid = uuid.v4().replace(/-/g, ""); //生成唯一文件名
        let index1 = file.name.lastIndexOf('.');
        let index2 = file.name.length;
        this.keys = uid + file.name.substring(index1, index2);
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
          vm.paramsData.imgUrl = 'http://meet-1257688644.cos.ap-shanghai.myqcloud.com/' + vm.keys;
          if (err) {
            console.log(err);
          }
        });
      },
      getObjectURL (file) {//获取文件路径--本地查看图片
        let url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        }else if (window.URL!=undefined) {
          url = window.URL.createObjectURL(file) ;
        }
        return url ;
      },
      //获取页面数据
      getTableData(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.bannerDetail+vm.id,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
              if(!res.data || res.data === ''){
                this.tableData ={};
              } else {
                vm.setTableData(res.data)
              }
          }
        )
      },
      //设置表格数据
      setTableData(_data){
          let obj = {};
          obj.title = _data.title;
          this.paramsData.imgUrl = obj.imgUrl= _data.imgUrl;
          this.paramsData.ownTabId = obj.ownTabId = _data.ownTabId;
          this.paramsData.sort = obj.sort = _data.sort;
          this.paramsData.linkType = obj.linkType = _data.linkType;
          this.paramsData.jumpLinkUrl = obj.jumpLinkUrl = _data.jumpLinkUrl;
          if(_data.startTime){
            this.paramsData.startTime = obj.startTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data.startTime)[0]
          } else {
            obj.startTime= '-'
          }
          if(_data.endTime){
            this.paramsData.endTime = obj.endTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(_data.endTime)[0]
          } else {
            obj.endTime= '-';
          }
          this.tableData = obj;
      },
      submitForm(formName){
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.bannerUpOrAdd,
              'application/json',
              vm.paramsData,
              vm.getSuccessCB
            )
          } else {
            return false;
          }
        });

      },
      getSuccessCB(vm){
        vm.$message({
          message: '提交成功！',
          type: 'success'
        });
        setTimeout(()=>{
          vm.$router.go(-1);
        },300)
      },
      //预览图片
      previewPic(){
        this.$store.commit('setShowPicPopOn',{type:'pic',content:this.paramsData.imgUrl})
      }
    },
    created(){
      this.paramsData.id = this.id = this.$route.query.id;
      this.getTableData();
      this.getAllTab();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
    .picture{
        display:inline-block;
        vertical-align:middle;
        margin-right:15px;
        width:auto;
        max-width:300px;
        height:100px;
        border:3px solid #eee;
    }
</style>