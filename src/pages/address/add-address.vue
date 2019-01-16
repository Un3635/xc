<template>
  <div class="add-address">
    <view-box body-padding-top="46px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">新建收货地址</x-header>
      <div class="address-form">
        <group>
          <x-input :show-clear="false" text-align="right" type="text" placeholder="请输入收货人"
                   :value="name">
            <template slot="label">
              <span class="label">收货人</span>
            </template>
          </x-input>
          <x-input :show-clear="false" text-align="right" title="联系电话" type="text" placeholder="请输入联系电话"
                   :value="phone">
            <template slot="label">
              <span class="label">联系电话</span>
            </template>
          </x-input>
          <x-address class="add-area" @on-hide="logHide" @on-show="logShow" :value="area" :list="addressData"
                     title="所在区域"
                     @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress">
          </x-address>
          <x-textarea :height="90" class="address-detail" :value="addressDetal" placeholder="请填写详细地址，不少于5个字"
                      :show-counter="false"></x-textarea>
        </group>
      </div>
      <div class="save">
        <x-button type="primary" @click.native="save">保存</x-button>
      </div>
    </view-box>
  </div>
</template>
<script>
  import {Group, XInput, XAddress, ChinaAddressV4Data, XTextarea} from 'vux';

  export default {
    data() {
      return {
        name: '',
        phone: '',
        area: [],
        addressDetal: '',
        addressData: ChinaAddressV4Data,
        showAddress: false
      };
    },
    components: {
      Group,
      XInput,
      XAddress,
      XTextarea
    },
    mounted() {
    },
    methods: {
      save() {
        this.$router.go(-1);
      },
      onShadowChange(ids, names) {
        console.log(ids, names);
      },
      logHide(str) {
        console.log('on-hide', str);
      },
      logShow(str) {
        console.log('on-show');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .add-address {
    background: #f4f4f4;
    .label {
      font-size: 15px;
    }
  }

  .address-form {
    padding-top: 10px;
    margin-bottom: 34px;
  }

  .address-detail {
    font-size: 14px;
  }

  .save {
    padding: 0 24px;
    button {
      display: block;
      width: 100%;
    }
  }
</style>
<style lang="scss">
  .add-area {
    font-size: 15px;
  }
</style>
