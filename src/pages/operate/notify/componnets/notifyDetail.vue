<template>
    <d2-container>
        <template slot="header"><span></span>查看<i class="el-icon-close detail-close" @click="$router.go(-1)"></i></template>
        <div class="detail">
            <el-form label-width="150px" class="rule-form">
                <el-form-item label="通知文案：">
                    <span class="detail-info">{{tableData.content}}</span>
                </el-form-item>
                <el-form-item label="跳转链接：">
                    <span class="detail-info">{{tableData.jumpFlag}}</span>
                </el-form-item>
                <el-form-item label="链接地址：" v-if="tableData.jumpFlag ==='URL' || tableData.jumpFlag ==='native'">
                    <span class="detail-info">{{tableData.jumpUrl}}</span>
                </el-form-item>
                <el-form-item label="推送Push：">
                    <span class="detail-info">{{tableData.pushFlag}}</span>
                </el-form-item>
                <el-form-item label="Push标题：" v-if="tableData.pushFlag ==='需要' ">
                    <span class="detail-info">{{tableData.pushTitle}}</span>
                </el-form-item>
                <el-form-item label="Push内容：" v-if="tableData.pushFlag ==='需要'">
                    <span class="detail-info">{{tableData.pushContent}}</span>
                </el-form-item>
                <el-form-item label="通知范围：">
                    <span class="detail-info">{{tableData.noticeRange}}</span>
                </el-form-item>
                <el-form-item label="指定名单：" v-if="tableData.noticeRange==='指定'">
                    <el-button type="info" class="return-btn" style="margin-left:15px;" @click="showExcel">查看名单</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain class="return-btn" @click="$router.go(-1)" style="margin-left:15px;">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
  export default {
    data() {
      return {
        id:'',
        tableData:{}
      }
    },
    methods: {
      getTableData(){
        let vm = this;
        vm.axiosGET(vm, vm.$API.API.noticeDetail + vm.id,
          'application/x-www-form-urlencoded',
          {},
          vm.getSuccessCB
        );
      },
      //成功回调
      getSuccessCB(vm, res) {
        if(res){
          vm.setTableData(res.data);
        }
      },
      //设置表格数据
      setTableData(_data){
         let obj = {};
         obj.content=_data.content;
         obj.jumpUrl=_data.jumpUrl;
         obj.pushTitle=_data.pushTitle;
         obj.pushContent=_data.pushContent;
         obj.pushFlag = _data.pushFlag ?  "需要" : "不需要";
         switch (_data.jumpFlag){
              case 0:
                obj.jumpFlag = "无";
                break;
              case 1:
                obj.jumpFlag = "URL";
                break;
              case 2:
                obj.jumpFlag = "native";
                break;
              default:
                obj.jumpFlag = "-";
            }
        switch (_data.noticeRange){
          case 0:
            obj.noticeRange = "全部";
            break;
          case 1:
            obj.noticeRange = "指定";
            break;
          default:
            obj.noticeRange = "-";
        }
         this.tableData = obj;
      },
      //查看名单
      showExcel(){
        let vm = this;
        this.axiosGET(vm, vm.$API.API.noticePreview + this.id,
          'application/x-www-form-urlencoded',
          {},
          (vm,res) => {
            let _data = res.data;
            let myData = [];
            for (let i = 0; i <_data.length; i++) {
              let obj = {};
              obj.mid = _data[i].mid;
              obj.nickName = _data[i].nickName ? _data[i].nickName : '-';
              obj.noticeStatus = _data[i].noticeStatus===-1 ? "待通知" : '-';
              obj.accountStatus = _data[i].accountStatus ;
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
            vm.$store.commit('setShowPicPopOn',{type:'form',content:myData})
          }
        )
      }
    },
    mounted(){
      this.id = this.$route.query.id;
      this.getTableData();
    }
  }
</script>

<style scoped lang="scss">
    @import '~@/assets/style/public-class.scss';
</style>