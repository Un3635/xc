<template>
  <div class="container">
    <h2 class="address__title">{{title}}</h2>
    <div class="address__infos">
      <div class="address__item">
        <span>所在地区</span>
        <div class="area-group clearfix">
          <div class="left">
            <select v-model="selectedProvince" title="">
              <option :value="{}">省份</option>
              <option :value="province" v-for="province in areaData" :key="province.provinceName">
                {{province.provinceName}}
              </option>
            </select>
            <div class="arrow">
              <svg width="10px" height="6px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
            </div>
          </div>
          <div class="left">
            <select v-model="selectedCity" title="">
              <option :value="{}">市</option>
              <option :value="city" v-for="city in selectedProvince.cityList" :key="city.cityCode"
                      v-if="selectedProvince&&selectedProvince.cityList">
                {{city.cityName}}
              </option>
            </select>
            <div class="arrow">
              <svg width="10px" height="6px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
            </div>
          </div>
          <div class="left">
            <select v-model="selectedArea" title="">
              <option :value="{}" selected>市/地级区</option>
              <option :value="area" v-for="area in selectedCity.areaList" :key="area.areaCode"
                      v-if="selectedCity&&selectedCity.areaList">
                {{area.areaName}}
              </option>
            </select>
            <div class="arrow">
              <svg width="10px" height="6px" viewBox="0 0 8 5" version="1.1" xmlns="http://www.w3.org/2000/svg"
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
            </div>
          </div>
        </div>
      </div>
      <div class="address__item">
        <span>详细地址</span>
        <input class="detail" type="text" v-validate="'required'" name="detail" placeholder="填写详细地址"
               @focus="errors.remove('detail')" v-model="addressInfo.detail"/>
        <p class="error" v-if="errors.has('detail')">{{errors.first('detail')}}</p>
      </div>
      <div class="address__item">
        <span>收货人姓名</span>
        <input type="text" v-validate="'required'" name="name" placeholder="填写收货人姓名"
               @focus="errors.remove('name')" v-model="addressInfo.name"/>
        <p class="error" v-if="errors.has('name')">{{errors.first('name')}}</p>
      </div>
      <div class="address__item">
        <span>手机号</span>
        <input type="text" v-validate="'required|phone'" name="phone" placeholder="填写手机号"
               @focus="errors.remove('phone')" v-model="addressInfo.phone"/>
        <p class="error" v-if="errors.has('phone')">{{errors.first('phone')}}</p>
      </div>
      <div class="address__item default">
        <el-checkbox v-model="addressInfo.checked">设为默认收货地址</el-checkbox>
      </div>
      <el-button class="btn-save" type="primary" size="medium" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import CommonAPI from "../../../services/common-api";
  import AddressAPI from "../../../services/address-api";
  import errorHandler from "../../../services/error-handler";
  import {UPDATE_ADDRESS_EDIT_ITEM} from "../../../store/mutation-types";
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        areaData: [],
        selectedProvince: {},
        selectedCity: {},
        selectedArea: {},
        title: '新增收货地址',
        isSave: false,
        addressInfo: {}
      };
    },
    computed: {
      ...mapState(['addressEdit']),
      breadcrumb() {
        return {
          label: this.title,
          parentsList: [
            {
              path: '/i/address',
              label: '我的收获地址'
            },
            {
              path: '/i',
              label: '个人中心'
            },
            {
              path: '/',
              label: '首页'
            }
          ]
        }
      }
    },
    methods: {
      initPage() {
        this.isSave = false;
        if (this.addressEdit) {
          this.addressInfo = this.addressEdit;
        }
        this.title = this.addressInfo.id ? '编辑收货地址' : '新增收货地址';
        CommonAPI.area()
          .then(res => {
            this.areaData = res;
            if (this.addressInfo.id) {
              this.edit(this.addressInfo);
            }
          });
      },
      edit(item) {
        let tmpArr = item.revAddress.split("#");
        const provinceName = tmpArr.shift();
        const cityName = tmpArr.shift();
        const areaName = tmpArr.shift();
        const detail = tmpArr.join('#');
        this.areaData.forEach(province => {
          if (province.provinceName === provinceName) {
            this.selectedProvince = province;
          }
        });
        // 确保在watch之后更新选中城市
        this.$nextTick(() => {
          this.selectedProvince.cityList.forEach(city => {
            if (city.cityName === cityName) {
              this.selectedCity = city;
            }
          });
        });
        // 确保在watch之后更新选中区域
        this.$nextTick(() => {
          this.$nextTick(() => {
            this.selectedCity.areaList.forEach(area => {
              if (area.areaName === areaName) {
                this.selectedArea = area;
              }
            });
          });
        });
        this.addressInfo = {
          id: item.id,
          name: item.revName,
          phone: item.revMobile,
          checked: item.status === 0
        };
        this.addressInfo.detail = detail;
      },
      save() {
        const addressId = this.addressInfo.id;
        this.$validator.validateAll()
          .then(res => {
            if (res) {
              return res;
            }
            const errMsg = this.errors.items[0].msg;
            return Promise.reject({msg: errMsg});
          })
          .then(() => {
            const province = this.selectedProvince.provinceName;
            const city = this.selectedCity.cityName;
            const area = this.selectedArea.areaName;
            const address = this.addressInfo;
            if (!province || !city || !area) {
              return Promise.reject({msg: '无效的地址信息'});
            }
            return {
              address: province + '#' + city + '#' + area + '#' + address.detail,
              name: address.name,
              mobile: address.phone,
              setDefault: address.checked
            };
          })
          .then(({address, mobile, name, setDefault}) => {
            if (addressId) {
              return AddressAPI.update(addressId, address, mobile, name, setDefault);
            }
            return AddressAPI.add(address, mobile, name, setDefault);
          })
          .then(() => {
            this.isSave = true;
            this.$message.success('保存成功');
            setTimeout(this.$router.back(), 10)
          })
          .catch(errorHandler);
      }
    },
    watch: {
      selectedProvince() {
        this.selectedCity = {};
      },
      selectedCity() {
        this.selectedArea = {};
      }
    },
    beforeRouteLeave: function (to, from, next) {
      const province = this.selectedProvince.provinceName;
      const city = this.selectedCity.cityName;
      const area = this.selectedArea.areaName;
      const address = this.addressInfo;
      // 有未保存数据提示用户保存
      if (!this.isSave && (province || city || area || address.detail || address.name || address.phone)) {
        return this.$confirm('你还有未保存的数据,确认离开', '提示')
          .then(() => {
            // 清空编辑项地址信息
            this.$store.commit(UPDATE_ADDRESS_EDIT_ITEM, null);
            return next()
          })
          .catch(() => {
          });
      }
      // 清空编辑项地址信息
      this.$store.commit(UPDATE_ADDRESS_EDIT_ITEM, null);
      next();
    },
    mounted() {
      this.initPage();
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../style/variables";

  .address__title {
    font-size: 24px;
    color: #333;
    line-height: 24px;
    font-weight: bold;
    padding: 20px 30px;
    border-bottom: 1px solid #eee;
  }

  .area-group {
    display: inline-block;
    div + div {
      margin-left: 10px;
    }
    div {
      position: relative;
    }
    .arrow {
      position: absolute;
      right: 13px;
      top: 17px;
      font-size: 0;
      transition: all 0.3s;
      z-index: 2;
      transform: rotateZ(0deg);
    }
    select:active ~ .arrow {
      transform: rotateZ(180deg);
    }
  }

  select {
    width: 135px;
    height: 36px;
    font-size: 14px;
    border: 1px solid #eee;
    appearance: none;
    border-radius: 0;
    background: none;
    padding-left: 10px;
  }

  input[type='text'] {
    width: 200px;
    height: 36px;
    font-size: 14px;
    padding-left: 10px;
    border: 1px solid #eee;
  }

  input[type="text"]::placeholder {
    color: #ccc;
  }

  input.detail {
    width: 425px;
  }

  .address__infos {
    padding: 30px;
  }

  .address__item {
    position: relative;
    margin-bottom: 20px;

    .error {
      position: absolute;
      font-size: 12px;
      line-height: 20px;
      padding-left: 110px;
      color: $danger;
    }
  }

  .address__infos span {
    display: inline-block;
    width: 100px;
    font-size: 14px;
    color: #333;
    float: left;
    line-height: 36px;
  }

  .btn-save {
    margin-left: 105px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .default {
    margin-left: 100px;
  }

  .option {
    display: inline-block;
    cursor: pointer;

    &.del {
      color: $danger;
    }
    &.edit {
      color: $info;
    }

    &.default {
      margin-left: 1em;
      color: $info;
    }
  }
</style>
