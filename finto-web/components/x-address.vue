<template>
  <div>
    <el-dialog :title="title" width="450px" :visible.sync="addressDialog" @close="closeDialog">
      <form>
        <dl class="form-address">
          <dt>郵便番号</dt>
          <dd class="clearfix">
            <div class="left">
              <input type="text" placeholder="3桁" class="ipt"
                     v-model="addressInfor.zipCode"
                     name="zipCode"
                     data-vv-scope="addressForm"
                     v-validate="'required'"
                     @focus="errors.remove('zipCode')"
                     @input="onInput"
              >
              <p class="error" v-if="errors.has('addressForm.zipCode')">{{errors.first('addressForm.zipCode')}}</p>
            </div>
            <div class="left">
              <input type="text" placeholder="4桁" class="ipt iptRight"
                     v-model="addressInfor.zipCodeNum"
                     name="zipCodeNum"
                     data-vv-scope="addressForm"
                     v-validate="'required'"
                     @focus="errors.remove('zipCodeNum')"
                     ref="inputCode"
                     :max="4"
              >
              <p class="error" v-if="errors.has('addressForm.zipCodeNum')">
                {{errors.first('addressForm.zipCodeNum')}}</p>
            </div>
          </dd>
        </dl>
        <dl class="form-address">
          <dt>都道府県</dt>
          <dd>
            <select v-model="addressInfor.revPrefecture" required>
              <option value="" disabled selected hidden>都道府県を選択してください</option>
              <option v-for="(area,index) in areaList" :key="index">{{area.name}}</option>
            </select>
            <svg width="10px" height="6px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 class="arrow"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49 (51002) - http://www.bohemiancoding.com/sketch -->
              <title>common_xiala_down</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Artboard" transform="translate(-120.000000, -44.000000)" fill="#969699">
                  <polygon id="common_xiala_down" points="120 44 124 49 128 44"></polygon>
                </g>
              </g>
            </svg>
          </dd>
        </dl>
        <dl class="form-address">
          <dt>住所</dt>
          <dd>
            <input type="text" placeholder="都道府県以降の住所をご入力ください" class="ipt2"
                   v-model="addressInfor.revAddress"
                   name="detail"
                   data-vv-scope="addressForm"
                   v-validate="'required'"
                   @focus="errors.remove('detail')"
                   ref="detail"
            >
            <p class="error" v-if="errors.has('addressForm.detail')">{{errors.first('addressForm.detail')}}</p>
          </dd>
        </dl>
        <dl class="form-address">
          <dt>受取人</dt>
          <dd>
            <input type="text" placeholder="受取人のお名前をご入力ください" class="ipt2"
                   v-model="addressInfor.revName"
                   name="name"
                   data-vv-scope="addressForm"
                   v-validate="'required'"
                   @focus="errors.remove('name')"
            >
            <p class="error" v-if="errors.has('addressForm.name')">{{errors.first('addressForm.name')}}</p>
          </dd>
        </dl>
        <dl class="form-address">
          <dt>電話番号</dt>
          <dd>
            <input type="number" placeholder="電話番号をご入力ください" class="ipt2"
                   v-model="addressInfor.revMobile"
                   name="addressPhone"
                   data-vv-scope="addressForm"
                   v-validate="'required|addressPhone'"
                   @focus="errors.remove('addressPhone')"
            >
            <p class="error" v-if="errors.has('addressForm.addressPhone')">
              {{errors.first('addressForm.addressPhone')}}</p>
          </dd>
        </dl>
        <div class="form-check">
          <el-checkbox v-model="addressInfor.checked">デフォルトとして設定</el-checkbox>
        </div>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {toPromise} from '../services/utils';
  import errorHandler from '../services/error-handler';
  import AddressApi from '../services/address';
  import areaList from '../assets/area.json';

  export default {
    inject: ['$validator'],
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'お届け先を変更する'
      },
      addressEdit: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        addressDialog: false,
        addressCheck: true,
        addressInfor: {
          zipCode: '',
          zipCodeNum: '',
          revPrefecture: '',
          revAddress: '',
          revName: '',
          revMobile: '',
          checked: false
        },
        areaList: areaList
      };
    },
    methods: {
      onInput() {
        const inputNum = this.addressInfor.zipCode.trim().length;
        if (inputNum === 3) {
          this.$refs.inputCode.focus();
        }
      },
      getCityByCode() {
        const code = this.addressInfor.zipCode + this.addressInfor.zipCodeNum;
        AddressApi.getCityByCode(code).then(res => res.result[0] || {})
          .then(res => {
            this.addressInfor.revPrefecture = res.city;
            this.addressInfor.revAddress = res.area.split(' ').join('') + res.street;
          });
        this.$nextTick(() => {
          this.$refs.detail.focus();
        });
      },
      save() {
        const addressId = this.addressInfor.id;
        this.$validator.validateAll('addressForm')
          .then(toPromise)
          .then(() => {
            const porvince = this.addressInfor.revPrefecture;
            if (!porvince) {
              return Promise.reject({msg: '選択してください都道府県'});
            }
            return {
              revAddress: this.addressInfor.revAddress,
              revMobile: this.addressInfor.revMobile,
              revName: this.addressInfor.revName,
              revPostcode: this.addressInfor.zipCode + this.addressInfor.zipCodeNum,
              revPrefecture: this.addressInfor.revPrefecture,
              addressId: this.addressInfor.id,
              type: addressId ? 1 : '',
              status: this.addressInfor.checked
            };
          })
          .then(({revAddress, revMobile, revName, revPostcode, revPrefecture, addressId, type, status}) => {
            if (addressId) {
              status = status ? status : false;
              AddressApi.updateAddress(revPostcode, revPrefecture, revAddress, revMobile, revName, addressId, type, status).then(res => {
                this.$message.success('お届け先情報の変更に成功しました');
                this.$emit('editSuccess');
                this.$emit('close', false);
              });
            } else {
              AddressApi.saveAddress(revPostcode, revPrefecture, revAddress, revMobile, revName, addressId, type, status).then(res => {
                this.$message.success('お届け先情報の変更に成功しました');
                this.$emit('addSuccess');
                this.$emit('close', false);
              });
            }
          })
          .then()
          .catch(errorHandler);
      },
      closeDialog() {
        this.addressDialog = false;
        this.errors.clear('addressForm');
        this.addressInfor.zipCode = '';
        this.addressInfor.zipCodeNum = '';
        this.addressInfor.revPrefecture = '';
        this.addressInfor.revAddress = '';
        this.addressInfor.revName = '';
        this.addressInfor.revMobile = '';
        this.addressInfor.checked = '';
      }
    },
    watch: {
      visible: {
        immediate: true,
        handler(val) {
          this.addressDialog = val;
        }
      },
      addressDialog(val) {
        this.$emit('close', val);
      },
      addressEdit(val) {
        if (val) {
          this.addressInfor = val;
        }
      },
      'addressInfor.zipCodeNum'(val) {
        if (val && val.trim().length === 4) {
          this.getCityByCode();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .form-address {
    margin-bottom: 20px;
    input, select {
      appearance: none;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      outline: none;
      height: 36px;
      padding-left: 10px;
    }
    input::-webkit-input-placeholder {
      color: #ccc;
    }
    dd, dt {
      display: inline-block;
      vertical-align: middle;
    }
    dt {
      width: 70px;
      font-size: 14px;
      color: #333;
    }
    dd {
      padding-left: 0;
      margin-left: 0;
      position: relative;
      .error, .left .error {
        position: absolute;
        top: 38px;
        left: 0;
        font-size: 12px;
        color: #f95453;
      }
    }
  }

  dd .left:last-child .error {
    left: 185px;
  }

  .form-check {
    padding-left: 96px;
  }

  .ipt {
    width: 159px;
  }

  .ipt2 {
    width: 340px;
  }

  .iptRight {
    margin-left: 22px;
  }

  select {
    width: 340px;
    font-size: 14px;
    border: 1px solid #eee;
    appearance: none;
    border-radius: 0;
    background: none;
    &.active + .arrow {
      transform: rotateZ(180deg);
      transition: all 0.3s;
    }
    option {
      color: #000;
    }
  }

  select:invalid {
    color: #ccc;
  }

  .arrow {
    position: absolute;
    right: 15px;
    top: 15px;
    transform: rotateZ(0);
    transition: all 0.3s;
  }
</style>
