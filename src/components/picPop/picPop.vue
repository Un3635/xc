<template>
    <transition name = "fade-outer">
        <div class="pop" v-if="showPicPop">
        <div class="popIn" v-if="showPicParam.type !== 'info'">
            <img class="close" src="./close.png" @click="closePopHandle"/>
            <div class="pic-box" v-if="showPicParam.type==='pic'">
                <img class="picture" :src="showPicParam.content"/>
            </div>
            <div class="pic-box" v-if="showPicParam.type==='file'">
                <div class="svgaBox" ref="svgaBox" id="svgaBox"></div>
            </div>
            <div class="form-box" v-if="showPicParam.type==='form'">
                <el-table
                        :data="showPicParam.content"
                        highlight-current-row>
                    <el-table-column
                            prop="mid"
                            label="MID"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="nickName"
                            label="昵称"
                            min-width="140">
                    </el-table-column>
                    <el-table-column
                            prop="accountStatus"
                            label="账号状态"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="noticeStatus"
                            label="通知状态"
                            min-width="100">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="popIn" v-if="showPicParam.type === 'info'">
            <div class="info-box">
                <div class="pop-tit">修改排序</div>
                <el-form  :model='ruleForm' ref="ruleForm" :rules="rules" label-width="60px">
                    <el-form-item label="排序" prop="sort">
                        <el-input-number class="info-sort"  v-model="ruleForm.sort" :precision="0" :min="0" :max="100" controls-position="right"></el-input-number>
                    </el-form-item>
                </el-form>
                <div class="btn-box">
                    <el-button type="primary" @click="submitForm('ruleForm',ruleForm.id,ruleForm.sort)">确定</el-button>
                    <el-button @click="cancelSubmit">取消</el-button>
                </div>
            </div>
        </div>
        <div class="mask" @click="closePopHandle"></div>
    </div>
    </transition>
</template>

<script>
  import {mapState} from 'vuex';
  let SVGA = require('svgaplayerweb');
  export default {
    data(){
      return{
        ruleForm:{
          id:'',
          sort: '',
        },
        rules: {
          sort: [
            { required: true,message: '排序不能为空',trigger: 'blur'}
          ]
        },
      }
    },
    computed:{
      ...mapState({
        showPicParam: state => state.d2admin.showPicParam,
        showPicPop: state => state.d2admin.showPicPop
      })
    },
    methods:{
      closePopHandle(){
        this.$store.commit('setShowPicPopOff');
      },
      submitForm(formName,id,sort){
        this.$store.commit('changeRefreshState',true);
        let vm = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axiosPOST(vm, vm.$API.API.giftEdit,
              'application/json',
              {
                'id': id,
                'sort': sort
              },
              (vm,res) => {
                vm.$store.commit('setShowPicPopOff');
                setTimeout(()=>{
                  vm.$message({
                    message: '提交成功！',
                    type: 'success'
                  });
                },300)
              }
            )
          } else {
            return false;
          }
        });
      },
      cancelSubmit(){
        this.$store.commit('setShowPicPopOff')
      },
      //播放svga文件
      svgaPlay(svgafile){
        let player = new SVGA.Player(this.$refs.svgaBox);
        let parser = new SVGA.Parser(this.$refs.svgaBox); // 如果你需要支持 IE6+，那么必须把同样的选择器传给 Parser。
        parser.load(svgafile, function(videoItem) {
          player.setVideoItem(videoItem);
          player.startAnimation();
        })
      }
    },
    watch:{
      'showPicParam':{
        handler:function(val){
          if(val.type === 'info'){
            this.ruleForm.sort = val.content.sort;
            this.ruleForm.id = val.content.id;
          } else if (val.type === 'file'){
            this.$nextTick(()=>{
              this.svgaPlay(val.content);
            })
          }
        },
        deep:true
      }
    }
  }
</script>

<style scoped lang="scss">
.pop{
    z-index:199;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    border-radius:10px;
    overflow:hidden;
    transition:0.4s all ease-out;
    .popIn{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        .close{
            position:absolute;
            top:-20px;
            right:-55px;
            width:40px;
            height:40px;
            cursor:pointer;
        }
        .pic-box,
        .form-box{
            background:#fff;
            border:4px solid #eee;
            .picture{
                width:100%;
            }
        }
        .pic-box{
            max-width:600px;
            max-height:600px;
            .svgaBox{
                width:500px;
                height:500px;
                background:#000;
            }
        }
        .form-box{
            width:900px;
            max-height:600px;
            overflow-y:auto;
            .el-table{
                width: 100%;
                padding:16px 24px;
            }
        }

        .info-box{
          width:450px;
          padding:40px 30px 30px;
          background:#fff;
          border-radius:8px;
          .pop-tit{
                width:100%;
                text-align:center;
                padding-bottom:35px;
                font-size:18px;
                font-weight:800;
                color:#333744;
            }
          .info-sort{
               width:100%;
          }
          .btn-box{
                padding-top:10px;
                width:100%;
                text-align:center;
            }
        }
    }
    .mask{
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.3);
    }
    &.fade-outer-enter-active,
    &.fade-outer-enter-active .popIn{
        transition: all 0.4s ease-in;
    }
    &.fade-outer-leave-active,
    &.fade-outer-leave-active .popIn{
        transition: all 0.3s ease-in;
    }
    &.fade-outer-enter-to,&.fade-outer-leave{
        opacity:1;
    }
    &.fade-outer-enter{
        opacity:0.6;
    }
    &.fade-outer-leave-to{
        opacity:0;
    }
    &.fade-outer-enter-to .popIn,&.fade-outer-leave .popIn{
        opacity:1;
    }
    &.fade-outer-enter .popIn, &.fade-outer-leave-to .popIn{
        opacity:0;
    }
}
</style>