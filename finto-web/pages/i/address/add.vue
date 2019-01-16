<template>
  <div>
    <h2 class="address__title">お届け先</h2>
    <div class="address-list__infos">
      <div class="address-form">
        <dl>
          <dt>郵便番号</dt>
          <dd>
            <el-input type="number" placeholder="3桁" class="ipt"
                      v-model="addressInfor.zipCode"
                      name="zipCode" v-validate="'required|zipCode'"
                      @focus="errors.remove('zipCode')"
                      :max="3"
                      @input="onInput"
            >
            </el-input>
            <el-input type="number" placeholder="4桁" class="ipt"
                      v-model="addressInfor.zipCodeNum"
                      name="zipCodeNum"
                      v-validate="'required|zipCodeNum'"
                      @focus="errors.remove('zipCodeNum')"
                      :max="4"
                      ref="inputCode"
            ></el-input>
          </dd>
          <p class="address-error" v-if="errors.has('zipCode')">{{errors.first('zipCode')}}</p>
          <p class="address-error address-error2" v-if="errors.has('zipCodeNum')">{{errors.first('zipCodeNum')}}</p>
        </dl>
        <dl>
          <dt>都道府県</dt>
          <dd>
            <select class="ipt2"
                    v-model="addressInfor.province"
                    name="address"
                    v-validate="'required'"
                    @focus="errors.remove('address')"
                    style="outline:none"
                    required
            >
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
        <dl>
          <dt>住所</dt>
          <dd>
            <el-input type="text" placeholder="都道府県以降の住所をご入力ください" class="ipt2"
                      v-model="addressInfor.detail"
                      name="detail"
                      v-validate="'required'"
                      @focus="errors.remove('detail')"
                      ref="detail"
            ></el-input>
          </dd>
          <p class="address-error" v-if="errors.has('detail')">{{errors.first('detail')}}</p>
        </dl>
        <dl>
          <dt>受取人名義</dt>
          <dd>
            <el-input type="text" placeholder="受取人の名前をご入力ください" class="ipt3"
                      v-model="addressInfor.name"
                      name="name"
                      v-validate="'required'"
                      @focus="errors.remove('name')"
            ></el-input>
          </dd>
          <p class="address-error" v-if="errors.has('name')">{{errors.first('name')}}</p>
        </dl>
        <dl>
          <dt>電話番号</dt>
          <dd>
            <el-input type="number" placeholder="電話番号をご入力ください" class="ipt3"
                      v-model="addressInfor.phone" name="addressPhone"
                      v-validate="'required|addressPhone'"
                      @focus="errors.remove('addressPhone')">
            </el-input>
          </dd>
          <p class="address-error" v-if="errors.has('addressPhone')">{{errors.first('addressPhone')}}</p>
        </dl>
        <div>
          <el-checkbox v-model="addressInfor.checked">この住所をデフォルトとして設定する</el-checkbox>
        </div>
        <div>
          <el-button type="primary" @click="saveAddress">保存</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {toPromise} from '../../../services/utils';
  import AddressApi from '../../../services/address';
  import areaList from '../../../assets/area.json';
  import errorHandler from '../../../services/error-handler';

  export default {
    head() {
      return {
        title: 'お届け先_FinTo-ワンストップのマイニング機械委託、販売、クラウドマイニング賃貸のプラットフォーム'
      };
    },
    inject: ['$validator'],
    breadcrumb() {
      return {
        label: 'お届け先',
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
        addressInfor: {
          zipCode: '',
          zipCodeNum: '',
          province: '',
          detail: '',
          name: '',
          phone: '',
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
      saveAddress() {
        this.$validator.validateAll()
          .then(toPromise)
          .then(() => {
            if (!this.addressInfor.province) {
              Promise.reject({msg: '選択してください都道府県'});
            }
            let {zipCode, zipCodeNum, province, detail, name, phone, checked} = this.addressInfor;
            let postcode = zipCode + zipCodeNum;
            return AddressApi.saveAddress(postcode, province, detail, phone, name, '', '', checked);
          })
          .then(() => {
            this.$message.success('お届け先情報の登録が完了致しました。');
            this.$router.push({path: '/i/address'});
          })
          .catch(errorHandler);
      },
      getCityByCode() {
        const code = this.addressInfor.zipCode + this.addressInfor.zipCodeNum;
        AddressApi.getCityByCode(code).then(res => res.result[0] || {})
          .then(res => {
            this.addressInfor.province = res.city;
            this.addressInfor.detail = res.area.split(' ').join('') + res.street;
          });
        this.$refs.detail.focus();
      }
    },
    watch: {
      'addressInfor.zipCodeNum'(val) {
        if (val.trim().length === 4) {
          this.getCityByCode();
        }
      },
      'addressInfor.zipCode'() {
        this.addressInfor.zipCodeNum = '';
        this.addressInfor.province = '';
        this.addressInfor.detail = '';
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../assets/style/_variables.scss";

  .address__title {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
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
      color: #333;
    }
    dd {
      margin-left: 0;
      position: relative;
      select:invalid {
        color: #ccc;
      }
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
        option {
          color: #000;
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
        padding-left: 10px;
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
      width: 340px;
    }
  }

  .address-infor {
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
