<template>
  <div class="promote_quota">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="form_box" v-if="!submit_success">
      <div class="one_line">
        <span class="name">申请提升金额</span>
        <input type="text" class="ipt_one ptt1" v-model.trim="apply_money" @focus="inptFocus(1)" @input="applyMoney"
               placeholder="请填写你需要申请的金额">
        <span class="yen">元</span>
        <span class="tip_one">{{tip_one}}</span>
      </div>
      <div class="one_line">
        <span class="name">申请租赁数量</span>
        <input type="text" class="ipt_two ptt2" v-model.trim="apply_num" @focus="inptFocus(2)" @input="applyLease"
               placeholder="请填写你需要租赁的设备数量">
        <span class="yen">台</span>
        <span class="tip_two">{{tip_two}}</span>
      </div>
      <div class="one_line">
        <span class="name">申请理由</span>
        <textarea class="ipt_three ptt3" name="" id="" v-model.trim="apply_reason" @focus="inptFocus(3)"
                  @input="applyReason" placeholder="请输入内容"></textarea>
        <span class="tip_three">{{tip_three}}</span>
      </div>
      <div class="content">
        <div class="title">
          <span class="send_appendix">上传附件</span>
          <span class="grey">支持格式 zip、rar压缩包     文件大小 不超过100MB</span>
        </div>
        <div class="files">
          <div class="files_one">
            <el-row :gutter="20" style="margin: 0;">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last1" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name1}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      人民银行征信报告
                    </div>
                    <div class="recent">
                      最近一周内的信息
                    </div>
                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :multiple=false
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveOne"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadOne"
                        :on-error="uploadErrorOne"
                        :on-success="uploadSuccessOne"
                        :on-progress="uploadingOneT"
                        :file-list="fileList1">

                        <span class="file_up_tip time1">{{tip1}}</span>
                        <span class="btn_text" v-if="!tip1a">{{btn1}}</span>
                      </el-upload>
                    </div>


                  </div>

                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last2" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name2}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      经营场所证明
                    </div>
                    <div class="recent">
                      房本、租赁合同、水电煤账单
                    </div>

                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveTwo"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadTwo"
                        :on-error="uploadErrorTwo"
                        :on-success="uploadSuccessTwo"
                        :on-progress="uploadingTwoT"
                        :file-list="fileList2">
                        <span class="file_up_tip time2">{{tip2}}</span>
                        <span class="btn_text" v-if="!tip2a">{{btn2}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last3" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name3}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      企业近半年社保/公积金缴纳记录
                    </div>
                    <div class="recent">

                    </div>
                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveThree"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadThree"
                        :on-error="uploadErrorThree"
                        :on-success="uploadSuccessThree"
                        :on-progress="uploadingThreeT"
                        :file-list="fileList3">
                        <span class="file_up_tip time3">{{tip3}}</span>
                        <span class="btn_text" v-if="!tip3a">{{btn3}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last4" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name4}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      公司对公流水
                    </div>
                    <div class="recent">
                      过往三个月
                    </div>

                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveFour"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadFour"
                        :on-error="uploadErrorFour"
                        :on-success="uploadSuccessFour"
                        :on-progress="uploadingFourT"
                        :file-list="fileList4">
                        <span class="file_up_tip time4">{{tip4}}</span>
                        <span class="btn_text" v-if="!tip4a">{{btn4}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="files_two">
            <el-row :gutter="20" style="margin: 0;">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last5" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name5}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      近一年的资产负债表
                    </div>
                    <div class="recent">

                    </div>

                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveFive"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadFive"
                        :on-error="uploadErrorFive"
                        :on-success="uploadSuccessFive"
                        :on-progress="uploadingFiveT"
                        :file-list="fileList5">
                        <span class="file_up_tip time5">{{tip5}}</span>
                        <span class="btn_text" v-if="!tip5a">{{btn5}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last6" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name6}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      近一年的利润表
                    </div>
                    <div class="recent">

                    </div>

                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveSix"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadSix"
                        :on-error="uploadErrorSix"
                        :on-success="uploadSuccessSix"
                        :on-progress="uploadingSixT"
                        :file-list="fileList6">
                        <span class="file_up_tip time6">{{tip6}}</span>
                        <span class="btn_text" v-if="!tip6a">{{btn6}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="file_box">
                    <div v-if="last7" class="last">
                      <li class="el-upload-list__item is-success">
                        <a class="el-upload-list__item-name">
                          <i class="el-icon-document"></i>
                          {{name7}}
                        </a>
                        <label class="el-upload-list__item-status-label">
                          <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                      </li>
                    </div>
                    <div class="people">
                      近一年资金流量表
                    </div>
                    <div class="recent">

                    </div>

                    <div class="el_button">
                      <el-upload
                        class="upload-demo"
                        :action="UploadUrl()"
                        :on-preview="handlePreview"
                        :on-remove="handleRemoveSeven"
                        :before-remove="beforeRemove"
                        :on-exceed="handleExceed"
                        :before-upload="beforeAvatarUploadSeven"
                        :on-error="uploadErrorSeven"
                        :on-success="uploadSuccessSeven"
                        :on-progress="uploadingSevenT"
                        :file-list="fileList7">
                        <span class="file_up_tip time7">{{tip7}}</span>
                        <span class="btn_text" v-if="!tip7a">{{btn7}}</span>
                      </el-upload>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <el-button type="primary" :loading="loading" @click="submitQuota">申请提升免押金额度</el-button>

      <!--</el-form>-->
    </div>

    <div class="contentOne" v-if="submit_success">
      <div class="icon">
        <img src="../../assets/images/icon_tijiao_success.png" alt="">
      </div>
      <div class="icon_des">
        <span>申请提交成功</span>
      </div>
      <div class="des_detail">
        <span>申请已受理，正在审核您提供的资料预计2小时得出免押金额度</span>
      </div>
      <div class="you_can">
        在审核期间，您可以
      </div>
      <div class="el_button">
        <span class="btn_successT" style="padding-left: 30px;padding-right: 30px;" @click="goToIndex">选购商品</span>
      </div>
    </div>


    <div class="record">
      <span>提升额度记录</span>
    </div>
    <div class="icon_box" v-if="!isOrderList">
      <div class="icon_kong">
        <img src="../../assets/images/icon_jilu_kong.png" alt="">
      </div>
      <div class="txt">
        <span>暂无提升额度的记录</span>
      </div>
    </div>
    <div class="order_list" v-if="isOrderList">
      <table>
        <thead>
        <th>申请类型</th>
        <th>申请时间</th>
        <th class="over">申请理由</th>
        <th>提升额度(元)</th>
        <th>申请状态</th>
        </thead>
        <tbody>
        <tr v-for="item in tableDataList">
          <td>
            <span v-if="item.applyType==1">申请提额</span>
            <span v-if="item.applyType==2">风控提额</span>
          </td>
          <td>{{item.createTime}}</td>

          <td class="over">
            <el-tooltip class="item" effect="dark" placement="bottom" v-if="item.reason&&item.reason.length>22">
              <div slot="content">{{item.reason}}</div>
              <span>{{item.reason}}</span>
            </el-tooltip>
            <span v-if="item.reason&&item.reason.length<=22">{{item.reason}}</span>
          </td>

          <td>
            <span v-if="item.actualQuota=='null'">-</span>
            <span v-if="item.actualQuota!='null'">{{item.actualQuota}}</span>
          </td>
          <td>
            <span v-if="item.status==1">审批中</span>
            <span v-if="item.status==2">已同意</span>
            <span v-if="item.status==3">已拒绝</span>
            <span v-if="item.status==4">已执行</span>
          </td>
        </tr>

        </tbody>
      </table>
      <div class="page">
        <pagination :pageData="pageData" v-if="!noRecord" @listenToChild="listenToChild"></pagination>

        <div class="icon_box" v-if="noRecord">
          <div class="icon_kong">
            <img src="../../assets/images/icon_jilu_kong.png" alt="">
          </div>
          <div class="txt">
            <span>没有相关的结果哦！</span>
          </div>
        </div>

      </div>
    </div>
    <pop :obj="obj"></pop>
  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  import pagination from '../x-pagination'
  import {allMethods} from '../../assets/js/config'
  import {bus} from '../../assets/js/config'
  import pop from './x-pop'
  export default {
    components: {
      plugin_title: plugin_title,
      pagination: pagination,
      pop: pop
    },
    name: 'promoteQuota',
    data(){
      return {
        uploadingOne:true,
        uploadingTwo:true,
        uploadingThree:true,
        uploadingFour:true,
        uploadingFive:true,
        uploadingSix:true,
        uploadingSeven:true,
        loading:false,
        obj: {
          title: '提升额度',
          content: '',
          is_pop: false
        },
        noRecord: false,
        submit_success: false,
        tableDataList: [],
        isOrderList: true,
        pageData: {
          total: 10,
          currentPage: 1,
          pageSizes: 10
        },
        last1: false,
        last2: false,
        last3: false,
        last4: false,
        last5: false,
        last6: false,
        last7: false,
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        btn1: '上传',
        btn2: '上传',
        btn3: '上传',
        btn4: '上传',
        btn5: '上传',
        btn6: '上传',
        btn7: '上传',
        apply_money: '',
        apply_num: '',
        apply_reason: '',
        tip_one: '',
        tip_two: '',
        tip_three: '',
        check_one: false,
        check_two: false,
        check_three: false,
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        fileList5: [],
        fileList6: [],
        fileList7: [],
        parentMsg: '提升额度', //在data中定义需要传入的值
        tableData: [],
        token: '',
        creditName: '',
        creditUrl: '',
        siteName: '',
        siteUrl: '',
        sbGjjName: '',
        sbGjjUrl: '',
        publicRecordName: '',
        publicRecordUrl: '',
        liabilitiesName: '',
        liabilitiesUrl: '',
        profitName: '',
        profitUrl: '',
        flowsName: '',
        flowsUrl: '',
        please_tip: false,
        url: allMethods.API + '/common/uploadFile',
        tip1: '',
        tip2: '',
        tip3: '',
        tip4: '',
        tip5: '',
        tip6: '',
        tip7: '',
        tip1b: '',
        tip2b: '',
        tip3b: '',
        tip4b: '',
        tip5b: '',
        tip6b: '',
        tip7b: '',
        tip1a: false,
        tip2a: false,
        tip3a: false,
        tip4a: false,
        tip5a: false,
        tip6a: false,
        tip7a: false,


      }
    },
    methods: {

      uploadingOneT(){
        this.uploadingOne=false;
      },uploadingTwoT(){
        this.uploadingTwo=false;
      },uploadingThreeT(){
        this.uploadingThree=false;
      },uploadingFourT(){
        this.uploadingFour=false;
      },uploadingFiveT(){
        this.uploadingFive=false;
      },uploadingSixT(){
        this.uploadingSix=false;
      },uploadingSevenT(){
        this.uploadingSeven=false;
      },


      goToIndex(){
        this.$router.push('./');
      },
      inptFocus(num){
        $('.ptt' + num).css('border-color', '#6ECC66');
      },
      listenToChild(){
        var vm = this;
        this.getRecord();
      },
      getRecord(){
        var obj = {
          token: this.token,
          pageNum: this.pageData.currentPage,
          pageSize: this.pageData.pageSizes,
          initTime: new Date().getTime()
        }
        var vm = this;
        this.$http.get('/deposit/queryPromotionRecord', {params: obj}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            vm.pageData.total = res.data.count;

            if (res.data.searchVos.length == 0) {
              vm.isOrderList = false;
            } else {
              vm.isOrderList = true;
              vm.tableDataList = res.data.searchVos;
              for (var i = 0; i < vm.tableDataList.length; i++) {
//              actualQuota
                if (vm.tableDataList[i].actualQuota != 'null') {
                  vm.tableDataList[i].actualQuota = allMethods.fmoney(vm.tableDataList[i].actualQuota, 2);
                }
              }
            }

            if (res.data.searchVos.length == 0) {
              vm.noRecord = true;
            } else {
              vm.noRecord = false;
            }


          } else if (Number(res.code) === 3001) {
            vm.noRecord = true;
          } else {

            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }

        })
      },


      handleCurrentChange(val){

      },
      applyMoney(){
        var vm = this;
        this.check_one = false;
        if (vm.apply_money == '') {
          $('.ipt_one').css('border-color', '#FF4949')
          this.tip_one = "请输入申请提升的额度"
        } else if (!/^[1-9][0-9]*(,[0-9]{3})*$/.test(vm.apply_money)) {
          $('.ipt_one').css('border-color', '#FF4949')
          this.tip_one = "请输入正确的金额"
        } else {
          $('.ipt_one').css('border-color', '#6ECC66')
          this.tip_one = '';
          this.check_one = true;
        }
      },
      applyLease(){
        var vm = this;
        this.check_two = false;
        if (vm.apply_num == '') {
          $('.ipt_two').css('border-color', '#FF4949')
          this.tip_two = "请输入申请租赁的数量"
        } else if (!/^[1-9][0-9]*(,[1-9]{3})*$/.test(vm.apply_num)) {
          $('.ipt_two').css('border-color', '#FF4949')
          this.tip_two = "请输入正确的数量"
        } else {
          $('.ipt_two').css('border-color', '#6ECC66')
          this.tip_two = '';
          this.check_two = true;
        }
      },
      applyReason(){
        var vm = this;
        this.check_three = false;
        if (vm.apply_reason == '') {
          $('.ipt_three').css('border-color', '#FF4949')
          this.tip_three = "请输入申请的理由"
        } else if (vm.apply_reason.length > 100) {
          $('.ipt_three').css('border-color', '#FF4949')
          this.tip_three = "请勿超过100字"
        } else {
          $('.ipt_three').css('border-color', '#6ECC66')
          this.tip_three = '';
          this.check_three = true;
        }
      },
      submitQuota(){
        var vm = this;
        if (vm.apply_money == '' || vm.apply_num == '' || vm.apply_reason == '') {
          if (vm.apply_money == '') {
            $('.ipt_one').css('border-color', '#FF4949')
            this.tip_one = "请输入申请提升的额度"
          }
          if (vm.apply_num == '') {
            $('.ipt_two').css('border-color', '#FF4949')
            this.tip_two = "请输入申请租赁的数量"
          }
          if (vm.apply_reason == '') {
            $('.ipt_three').css('border-color', '#FF4949')
            this.tip_three = "请输入申请的理由"
          }
        } else if (vm.check_one && vm.check_two && vm.check_three) {
            if(vm.uploadingOne&&vm.uploadingTwo&&vm.uploadingThree&&vm.uploadingFour&&vm.uploadingFive&&vm.uploadingSix&&vm.uploadingSeven){
              this.applyPromoteFreeDepositQuota();
            }else{
              vm.obj.is_pop = true;
              vm.obj.content = "文件上传尚未完成，请稍后再试!";
            }







          //              请求接口

        }
      },
      handleCurrentChange(page){

      },
      uploadError(){

      },
      beforeRemove(file, fileList, index){

      },


      handleExceed(){

      },
      handlePreview(file){

      },
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      UploadUrl(){
        return allMethods.API + '/common/uploadFile';
      },
      applyPromoteFreeDepositQuota(){
        this.loading=true;
        var vm = this;
        var aa = this.apply_money.replace(/\,/ig, '');
        var bb = this.apply_num.replace(/\,/ig, '');
        var obj = {
          creditName: this.creditName,
          creditUrl: this.creditUrl,
          siteName: this.siteName,
          siteUrl: this.siteUrl,
          sbGggName: this.sbGjjName,
          sbGggUrl: this.sbGjjUrl,
          publicRecordName: this.publicRecordName,
          publicRecordUrl: this.publicRecordUrl,
          liabilitiesName: this.liabilitiesName,
          liabilitiesUrl: this.liabilitiesUrl,
          profitName: this.profitName,
          profitUrl: this.profitUrl,
          flowsName: this.flowsName,
          flowsUrl: this.flowsUrl,
          token: this.token,
          applyPromotionAmount: aa,
          applyRentNum: bb,
          reasons: this.apply_reason,
          initTime: new Date().getTime()
        }
        this.$http.post('deposit/submitPromotion', obj).then(function (data) {
          vm.loading=false;
          if (Number(data.data.code) === 1000) {
            vm.submit_success = true;
            vm.getPromoteLoading();
            vm.getRecord();
          } else {
            vm.obj.is_pop = true;
            vm.obj.content = data.data.msg;
          }
        })
//          成功的话  跳转到  applySubmitSuccess
      },
      uploadErrorOne(){
        this.uploadingOne=true;
        $('.time1').css("color", "#FF4949");
        var that = this;
        that.tip1 = "上传失败";
        that.tip1a = false;
      }, uploadErrorTwo(){
        this.uploadingTwo=true;
        $('.time2').css("color", "#FF4949");
        var that = this;
        that.tip2 = "上传失败";
        that.tip2a = false;
      }, uploadErrorThree(){
        this.uploadingThree=true;
        $('.time3').css("color", "#FF4949");
        var that = this;
        that.tip3 = "上传失败";
        that.tip3a = false;
      }, uploadErrorFour(){
        this.uploadingFour=true;
        $('.time4').css("color", "#FF4949");
        var that = this;
        that.tip4 = "上传失败";
        that.tip4a = false;
      }, uploadErrorFive(){
        this.uploadingFive=true;
        $('.time5').css("color", "#FF4949");
        var that = this;
        that.tip5 = "上传失败";
        that.tip5a = false;
      }, uploadErrorSix(){
        this.uploadingSix=true;
        $('.time6').css("color", "#FF4949");
        var that = this;
        that.tip6 = "上传失败";
        that.tip6a = false;
      }, uploadErrorSeven(){
        this.uploadingSeven=true;
        $('.time7').css("color", "#FF4949");
        var that = this;
        that.tip7 = "上传失败";
        that.tip7a = false;
      },
      uploadSuccessOne(response){
        this.last1 = false;
        var that = this;
        that.tip1a = true;
        that.tip1 = '';
        if (Number(response.code) === 1000) {
          that.uploadingOne=true;
          that.creditName = response.data.fileName;
          that.creditUrl = response.data.fileUrl;
          if (that.fileList1[0]) {
            that.fileList1[1] = {name: '', url: ''};
            that.fileList1[1].name = response.data.fileName;
            that.fileList1[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessTwo(response){
        this.last2 = false;
        var that = this;
        that.tip2a = true;
        that.tip2 = '';
        if (Number(response.code) === 1000) {
          that.uploadingTwo=true;
          that.siteName = response.data.fileName;
          that.siteUrl = response.data.fileUrl;

          if (that.fileList2[0]) {
            that.fileList2[1] = {name: '', url: ''};
            that.fileList2[1].name = response.data.fileName;
            that.fileList2[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessThree(response){
        this.last3 = false;
        var that = this;
        that.tip3a = true;
        that.tip3 = '';
        if (Number(response.code) === 1000) {
          that.uploadingThree=true;
          that.sbGjjName = response.data.fileName;
          that.sbGjjUrl = response.data.fileUrl;
          if (that.fileList3[0]) {
            that.fileList3[1] = {name: '', url: ''};
            that.fileList3[1].name = response.data.fileName;
            that.fileList3[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessFour(response){
        this.last4 = false;
        var that = this;
        that.tip4a = true;
        that.tip4 = '';
        if (Number(response.code) === 1000) {
          that.uploadingFour=true;
          that.publicRecordName = response.data.fileName;
          that.publicRecordUrl = response.data.fileUrl;
          if (that.fileList4[0]) {
            that.fileList4[1] = {name: '', url: ''};
            that.fileList4[1].name = response.data.fileName;
            that.fileList4[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessFive(response){
        this.last5 = false;
        var that = this;
        that.tip5a = true;
        that.tip5 = '';
        if (Number(response.code) === 1000) {
          that.uploadingFive=true;
          that.liabilitiesName = response.data.fileName;
          that.liabilitiesUrl = response.data.fileUrl;
          if (that.fileList5[0]) {
            that.fileList5[1] = {name: '', url: ''};
            that.fileList5[1].name = response.data.fileName;
            that.fileList5[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessSix(response){
        this.last6 = false;
        var that = this;
        that.tip6a = true;
        that.tip6 = '';
        if (Number(response.code) === 1000) {
          that.uploadingSix=true;
          that.profitName = response.data.fileName;
          that.profitUrl = response.data.fileUrl;
          if (that.fileList6[0]) {
            that.fileList6[1] = {name: '', url: ''};
            that.fileList6[1].name = response.data.fileName;
            that.fileList6[1].url = response.data.fileUrl;
          }
        }
      }, uploadSuccessSeven(response){
        this.last7 = false;
        var that = this;
        that.tip7a = true;
        that.tip7 = '';
        if (Number(response.code) === 1000) {
          that.uploadingSeven=true;
          that.flowsName = response.data.fileName;
          that.flowsUrl = response.data.fileUrl;
          if (that.fileList7[0]) {
            that.fileList7[1] = {name: '', url: ''};
            that.fileList7[1].name = response.data.fileName;
            that.fileList7[1].url = response.data.fileUrl;
          }

        }
      },
      beforeAvatarUploadOne(file) {

        var that = this;

        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;

        if (!isJPG) {
          $('.time1').css("color", "#FF4949");

          that.tip1 = '请将文件打包为zip或rar后上传';

        }
        if (!isLt2M) {
          $('.time1').css("color", "#FF4949");
          that.tip1 = '';
          that.tip1 = '文件过大，请将文件压缩后再上传';

        }

        that.tip1a = true;


        return isJPG && isLt2M;

      }, beforeAvatarUploadTwo(file) {

        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();

        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time2').css("color", "#FF4949");
          that.tip2 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time2').css("color", "#FF4949");
          that.tip2 = '文件过大，请将文件压缩后再上传';
        }
        that.tip2a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadThree(file) {

        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time3').css("color", "#FF4949");
          that.tip3 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time3').css("color", "#FF4949");
          that.tip3 = '文件过大，请将文件压缩后再上传';
        }
        that.tip3a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadFour(file) {

        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time4').css("color", "#FF4949");
          that.tip4 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time4').css("color", "#FF4949");
          that.tip4 = '文件过大，请将文件压缩后再上传';
        }
        that.tip4a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadFive(file) {

        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time5').css("color", "#FF4949");
          that.tip5 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time5').css("color", "#FF4949");
          that.tip5 = '文件过大，请将文件压缩后再上传';
        }
        that.tip5a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadSix(file) {

        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time6').css("color", "#FF4949");
          that.tip6 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time6').css("color", "#FF4949");
          that.tip6 = '文件过大，请将文件压缩后再上传';
        }
        that.tip6a = true;
        return isJPG && isLt2M;
      }, beforeAvatarUploadSeven(file) {


        var that = this;
        var idx = file.name.lastIndexOf(".");
        var file_name = file.name.substr(idx + 1).toUpperCase();
        const isJPG = (file_name === 'RAR' || file_name === 'ZIP');
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          $('.time7').css("color", "#FF4949");
          that.tip7 = '请将文件打包为zip或rar后上传';
        }
        if (!isLt2M) {
          $('.time7').css("color", "#FF4949");
          that.tip7 = '文件过大，请将文件压缩后再上传';
        }
        that.tip7a = true;
        return isJPG && isLt2M;
      },
      handleRemoveOne(file, fileList) {

        if (this.name1) {

          this.last1 = true;
          this.tip1 = this.tip1b;
          this.beforeAvatarUploadOne(file);
          if (/上传时间/.exec(this.tip1)) {
            $('.time1').css("color", "#999999");
          }
        }
        this.tip1a = false;
        this.creditName = "";
        this.creditUrl = "";


      }, handleRemoveTwo(file, fileList) {

        if (this.name2) {

          this.last2 = true;
          this.tip2 = this.tip2b;
          this.beforeAvatarUploadTwo(file);
          if (/上传时间/.exec(this.tip2)) {
            $('.time2').css("color", "#999999");
          }
        }
        this.tip2a = false;
        this.siteName = "";
        this.siteUrl = "";
      }, handleRemoveThree(file, fileList) {
        if (this.name3) {
          this.last3 = true;
          this.tip3 = this.tip3b;
          this.beforeAvatarUploadThree(file);
          if (/上传时间/.exec(this.tip3)) {
            $('.time3').css("color", "#999999");
          }
        }
        this.tip3a = false;
        this.sbGjjName = ""
        this.sbGjjUrl = ""
      }, handleRemoveFour(file, fileList) {
        if (this.name4) {
          this.last4 = true;
          this.tip4 = this.tip4b;
          this.beforeAvatarUploadFour(file);
          if (/上传时间/.exec(this.tip4)) {
            $('.time4').css("color", "#999999");
          }
        }
        this.tip4a = false;
        this.publicRecordName = "";
        this.publicRecordUrl = "";
      }, handleRemoveFive(file, fileList) {
        if (this.name5) {
          this.last5 = true;
          this.tip5 = this.tip5b;
          this.beforeAvatarUploadFive(file);
          if (/上传时间/.exec(this.tip5)) {
            $('.time5').css("color", "#999999");
          }
        }
        this.tip5a = false;
        this.liabilitiesName = "";
        this.liabilitiesUrl = "";
      }, handleRemoveSix(file, fileList) {
        if (this.name6) {
          this.last6 = true;
          this.tip6 = this.tip6b;
          this.beforeAvatarUploadSix(file);
          if (/上传时间/.exec(this.tip6)) {
            $('.time6').css("color", "#999999");
          }
        }
        this.tip6a = false;
        this.profitName = "";
        this.profitUrl = "";
      }, handleRemoveSeven(file, fileList) {
        if (this.name7) {
          this.last7 = true;
          this.tip7 = this.tip7b;
          this.beforeAvatarUploadSeven(file);
          if (/上传时间/.exec(this.tip7)) {
            $('.time7').css("color", "#999999");
          }
        }
        this.tip7a = false;
        this.flowsName = "";
        this.flowsUrl = "";
      },

      getFiles(){
        var vm = this;
        this.$http.get('/deposit/queryPromotion', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (data) {
          var res = data.data;
          if (Number(res.code) === 1000) {
            var msg = res.data;
            if (msg.creditName) {
              vm.last1 = true;
              vm.name1 = msg.creditName;

              vm.tip1 = '上传时间 ' + msg.creditTime;
              vm.tip1b = '上传时间 ' + msg.creditTime;
              vm.btn1 = '更新文件';
              $('.time1').css("color", "#999999");
            }
            if (msg.siteName) {
              vm.last2 = true;
              vm.name2 = msg.siteName;

              vm.tip2 = '上传时间 ' + msg.siteTime;
              vm.tip2b = '上传时间 ' + msg.siteTime;
              vm.btn2 = '更新文件';
              $('.time2').css("color", "#999999");
            }
            if (msg.sbGjjName) {
              vm.last3 = true;
              vm.name3 = msg.sbGjjName;

              vm.tip3 = '上传时间 ' + msg.sbGjjTime;
              vm.tip3b = '上传时间 ' + msg.sbGjjTime;
              vm.btn3 = '更新文件';
              $('.time3').css("color", "#999999");
            }
            if (msg.publicRecordName) {
              vm.last4 = true;
              vm.name4 = msg.publicRecordName;

              vm.tip4 = '上传时间 ' + msg.publicRecordTime;
              vm.tip4b = '上传时间 ' + msg.publicRecordTime;
              vm.btn4 = '更新文件';
              $('.time4').css("color", "#999999");
            }
            if (msg.liabilitiesName) {
              vm.last5 = true;
              vm.name5 = msg.liabilitiesName;

              vm.tip5 = '上传时间 ' + msg.liabilitiesTime;
              vm.tip5b = '上传时间 ' + msg.liabilitiesTime;
              vm.btn5 = '更新文件';
              $('.time5').css("color", "#999999");
            }
            if (msg.profitName) {
              vm.last6 = true;
              vm.name6 = msg.profitName;

              vm.tip6 = '上传时间 ' + msg.profitTime;
              vm.tip6b = '上传时间 ' + msg.profitTime;
              vm.btn6 = '更新文件';
              $('.time6').css("color", "#999999");
            }
            if (msg.flowsFileName) {
              vm.last7 = true;
              vm.name7 = msg.flowsFileName;
              vm.tip7 = '上传时间 ' + msg.flowsFileTime;
              vm.tip7b = '上传时间 ' + msg.flowsFileTime;
              vm.btn7 = '更新文件';
              $('.time7').css("color", "#999999");
            }


          } else {
//            vm.$alert(res.msg, '提升额度', {
//              confirmButtonText: '我知道了',
//              type: 'warning'
//            })
            vm.obj.is_pop = true;
            vm.obj.content = res.msg;
          }
        })
      },
      getPromoteLoading(){
        var vm = this;
        this.$http.get('/deposit/promotionLoading', {params: {token: this.token,initTime: new Date().getTime()}}).then(function (data) {
          if (Number(data.data.code) === 1000) {
            if (data.data.data == 1) {
              vm.submit_success = false;
            } else if (data.data.data == 2) {
              vm.submit_success = true;
            }
          } else {

            vm.obj.is_pop = true;
            vm.obj.content = data.data.msg;
          }
        })
      }
    },
    created(){
      this.token = localStorage.getItem('xckz_mall');
      this.getPromoteLoading();
      this.getFiles();
      this.getRecord();
      var vm = this;
      bus.$on('error',function () {
        vm.obj.is_pop = false;
      })
    }
  }
</script>

<style scoped lang="scss">
  .no_record {
    font-size: 20px;
    color: #CCCCCC;
    text-align: center;
    margin-top: 20px;
  }

  .el-upload-list__item-status-label {
    /*top: 6px !important;*/
  }

  textarea {
    border-radius: 4px;
  }

</style>
