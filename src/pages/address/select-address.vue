<template>
  <div class="select-address">
    <view-box body-padding-top="46px">
      <x-header slot="header" :left-options="{backText: ''}" class="custom-header">
        确认订单
        <router-link to="/add-address" slot="right">
          新增地址
        </router-link>
      </x-header>
      <div class="address-list">
        <group>
          <cell v-for="(address,index) in addressList" :key="index" @click.native="selectAddress">
            <template slot="title">
              <span class="title">
                <span>{{address.name}}</span>{{address.phone}}
              </span>
            </template>
            <template slot="inline-desc">
              <p class="desc">{{address.addressDetail}}</p>
            </template>
          </cell>
        </group>
      </div>
    </view-box>
  </div>
</template>
<script>
  import {Group, Cell} from 'vux';
  import AddressAPI from '../../services/address-api';

  export default {
    data() {
      return {
        addressList: [{
          name: '陆伟',
          phone: '159****2771',
          addressDetail: '上海市徐汇区云锦路500号绿地汇中心B座913室(周末办公室有人)'
        }, {
          name: '陆伟',
          phone: '159****2771',
          addressDetail: '上海市徐汇区云锦路500号绿地汇中心B座913室(周末办公室有人)'
        }]
      };
    },
    components: {
      Group,
      Cell
    },
    mounted() {
      AddressAPI.get()
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    methods: {
      selectAddress() {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .select-address {
    background: #f4f4f4;
  }

  .address-list {
    .title {
      display: block;
      color: #222222;
      font-size: 16px;
      line-height: 16px;
      margin-bottom: 5px;
    }
    .desc {
      color: #505050;
      font-size: 13px;
      line-height: 1.5em;
    }
    .weui-cell {
      padding: 18px 16px;
    }
  }
</style>
