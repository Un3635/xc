<template>
  <div class="promote_quota_submit_success">
    <plugin_title :message="parentMsg"></plugin_title>
    <div class="content">
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
        <span class="btn_successT" style="padding-left: 30px;padding-right: 30px;">选购商品</span>
      </div>
    </div>

    <div class="record">
      <span>提升额度记录</span>
    </div>

      <div class="order_list">
        <table>
          <thead>
          <th>申请类型</th>
          <th>申请时间</th>
          <th>申请理由</th>
          <th>提升额度(元)</th>
          <th>申请状态</th>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>4</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>4</td>
          </tr>
          </tbody>
        </table>
        <div class="page">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>



  </div>
</template>

<script type="text/ecmascript-6">
  import plugin_title from '../plugin_title'
  export default {
    components:{
      plugin_title: plugin_title,
    },
    name:'promoteQuotaSubmitSuccess',

    data(){
      var validateMoney = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入申请提升的额度'));
        } else {
          if (!/^[1-9]+(,[1-9]{3})*$/.test(value)) {
            callback(new Error('请输入正确的金额'));
          }
          callback();
        }
      };
      var validateNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入申请租赁的数量'));
        } else {
          if (!/^[1-9]+(,[1-9]{3})*$/.test(value)) {
            callback(new Error('请输入正确的数量'));
          }
          callback();
        }
      };
      var validateReason = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入申请的理由'));
        } else {
          if(value.length>100){
            callback(new Error('请勿超过一百字'));
          }
          callback();
        }
      };
      return {
        fileList:[],
        parentMsg: '提升额度', //在data中定义需要传入的值
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        ruleForm: {
          apply_promote_money: '',
          apply_lease_num:'',
          apply_reason:'',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          apply_promote_money: [
            {validator: validateMoney, trigger: 'blur'}
          ],
          apply_lease_num: [
            {validator: validateNum, trigger: 'blur'}
          ],
          apply_reason: [
            {validator: validateReason, trigger: 'blur'}
          ],

        }
      }
    },
    methods:{
      handleCurrentChange(page){
      },
      uploadError(){

      },
      beforeRemove(){

      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/png'||file.type === 'image/jpg'||file.type === 'image/jpeg');
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传图片只能是 png jpg jpeg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
