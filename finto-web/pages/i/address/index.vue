<template>
  <div class="container">
    <h2 class="address__title">お届け先</h2>
    <div class="address-list__new no-address" v-if="addressList.length<1">
      <el-button class="btn-add" size="medium" type="primary" v-if="addressList.length<10"
                 @click="$router.push({path:'add', append:true})" ref="button">
        新規お届け先を登録する
      </el-button>
      <p class="address-list__tips">最大10個の配送先が登録できます</p>
    </div>
    <div class="address-list__infos" v-if="addressList.length>0">
      <div class="address-table">
        <div class="left">
          <el-button class="btn-add" size="medium" type="primary" v-if="addressList.length<10"
                     @click="$router.push({path:'add', append:true})">
            新規お届け先を登録する
          </el-button>
        </div>
        <div class="address-infor right">{{addressList.length}}個のお届け先を保存しました。あと<em>{{10 - addressList.length}}個</em>登録できます。
        </div>
        <el-table :data="addressList" border stripe header-row-class-name="addressTable">
          <el-table-column :resizable="false" label="受取人" width="100" prop="revName"/>
          <el-table-column :resizable="false" label="都道府県" width="190">
            <template slot-scope="scope">
              <span>{{scope.row.revPrefecture}}</span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="住所" :show-overflow-tooltip="true" width="260">
            <template slot-scope="scope">
              <span>{{scope.row.revAddress}}</span>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="電話番号" width="140" prop="revMobile"/>
          <el-table-column :resizable="false" label="編集">
            <template slot-scope="scope">
              <span class="option edit" @click="edit(scope.row)">変更</span>&nbsp;|
              <span class="option del" @click="remove(scope.row)">削除</span>&emsp;&emsp;
              <span class="option default" @click="setDefault(scope.row)" v-if="scope.row.status===1">デフォルト設定</span>
              <span class="default" v-if="scope.row.status===0">デフォルト</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <x-address :visible="addressDialog" title="お届け先を変更する" @close="closeDialog" @editSuccess="editSuccess" :addressEdit="addressEdit"></x-address>
  </div>
</template>

<script>
  import errorHandler from "../../../services/error-handler";
  import {toPromise} from "../../../services/utils";
  import XAddress from "../../../components/x-address.vue";
  import {UPDATE_ADDRESS_EDIT_ITEM} from "../../../store/mutation-types";
  import  AddressApi from "../../../services/address";
  import * as debounce from 'lodash.debounce';
  export default {
    head() {
      return {
        title: 'お届け先｜国内最大級マイニングプラットフォーム - Finto -'
      };
    },
    inject: ['$validator'],
    breadcrumb() {
      return {
        label: ' お届け先',
        parentsList: [
          {
            path: '/i',
            label: 'My Finto '
          }
        ]
      };
    },
    data() {
      return {
        addressDialog: false,
        addressList: [],
        addressEdit:{},
      };
    },
    components: {
      XAddress
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        this.loadAddressList();
      },
      loadAddressList() {
        AddressApi.getAddressList()
          .then(res=>res.result || [])
          .then(result=>{
              result.sort((a,b)=>a.status-b.status)
              this.addressList = result;
          })
          .catch(errorHandler)
      },
      setDefault(add) {
        AddressApi.updateStatus(add.id)
          .then(() => {
            this.$message.success('お届け先情報の変更に成功しました');
            this.loadAddressList();
          })
          .catch(errorHandler);
      },
      remove(addr) {
        const id = addr.id;
        const address = addr.revAddress;
        const mobile = addr.revMobile;
        const name = addr.revName;
        const revPrefecture = addr.revPrefecture;
        const revPostcode =addr.revPostcode;
        this.$confirm('この住所を削除しますか？1度削除すると元には戻せません。', '', {
          confirmButtonText: '確認',
          cancelButtonText: 'キャンセル',
          type: 'warning'
        }).then(() => AddressApi.updateAddress(revPostcode,revPrefecture,address,mobile,name,id,0))
          .then(() => {
            this.$message.success('削除しました');
            this.loadAddressList();
          })
          .catch(err => {
          if (err !== 'cancel') {
            errorHandler(err);
          }
        });
      },
      closeDialog(val) {
        this.addressDialog = val;
      },
      editSuccess(){
        this.loadAddressList();
      },
      edit(item){
        this.addressEdit=Object.assign({},item);
        const zipCode = item.revPostcode.substring(0,3);
        const zipCodeNum = item.revPostcode.substring(3);
        const checked = item.status===0;
        this.$set(this.addressEdit,'zipCode',zipCode);
        this.$set(this.addressEdit,'zipCodeNum',zipCodeNum);
        this.$set(this.addressEdit,'checked',checked);
        this.addressDialog=true;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/style/_variables.scss";

  .container {
    min-height: 430px;
  }

  .address__title {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
  }

  .btn-add {
    border-radius: 0;
  }

  .address-list__tips {
    float: right;
    font-size: 14px;
    line-height: 39px;
    color: #333;
  }

  .address-list__tips em {
    font-style: normal;
    color: #FBB146;
  }

  .option {
    &.edit, &.del, &.default {
      cursor: pointer;
    }
    &.edit {
      color: $info;
    }

    &.del {
      color: $danger;
    }
    &.default {
      color: $info;
    }
  }

  .address-list__new {
    padding: 30px;
  }

  .address-list__new.no-address {
    text-align: center;
    padding-top: 130px;
    padding-bottom: 160px;
  }

  .address-list__new.no-address .address-list__tips {
    float: none;
  }

  .address-list__infos {
    padding: 30px;
    dl {
      margin-bottom: 20px;
      position: relative;
    }
    dd, dt {
      display: inline-block;
    }
    dt {
      max-width: 96px;
      min-width: 96px;
      font-size: 14px;
      color: #333333;
    }
    dd {
      margin-left: 0;
      position: relative;
      select {
        width: 424px;
        font-size: 14px;
        border: 1px solid #eee;
        appearance: none;
        border-radius: 0;
        background: none;
        &.active + .arrow {
          transform: rotateZ(180deg);
          transition: all 0.3s;
        }
      }
      input, select {
        height: 36px;
      }
      .arrow {
        position: absolute;
        right: 15px;
        top: 15px;
        transform: rotateZ(0);
        transition: all 0.3s;
      }
    }
    .address-form > div {
      padding-left: 96px;
    }
    .address-form > div + div {
      margin: 50px 0 30px;
    }
  }

  .address-form {
    .ipt {
      width: 230px;
    }
    .ipt + .ipt {
      margin-left: 21px;
    }
    .ipt2 {
      width: 488px;
    }
    .ipt3 {
      width: 250px;
    }
  }

  .address-infor {
    margin-top:10px;
    margin-bottom: 25px;
    font-size: 14px;
    color: #333333;
    em {
      font-style: normal;
      color: #FBB146;
    }
  }

  .address-error {
    position: absolute;
    left: 96px;
    top: 40px;
    font-size: 12px;
    color: #f95453;
  }

  .address-error2 {
    left: 347px;
  }
</style>
