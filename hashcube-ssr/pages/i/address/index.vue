<template>
  <div class="container">
    <h2 class="address__title">我的收货地址</h2>
    <div class="address-list__new" :class="{'no-address':addressList.length<1}">
      <el-button class="btn-add" size="medium" type="primary" v-if="addressList.length<10"
                 @click="$router.push({path:'add', append:true})">
        新增收货地址
      </el-button>
      <p class="address-list__tips">已保存{{ addressList.length }}条收货地址，还可以保存<em>{{ 10 - addressList.length }}条</em>收货地址
      </p>
    </div>
    <div class="address-list__infos" v-if="addressList.length>0">
      <el-table :data="addressList" border stripe>
        <el-table-column :resizable="false" label="收货人" width="160" prop="revName"/>
        <el-table-column :resizable="false" label="所在地区" width="210">
          <template slot-scope="scope">
            <span>{{strToArea(scope.row.revAddress)}}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" label="详细地址" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span :title="strToAddrDetail(scope.row.revAddress)">{{strToAddrDetail(scope.row.revAddress)}}</span>
          </template>
        </el-table-column>
        <el-table-column :resizable="false" label="手机号" width="120" prop="revMobile"/>
        <el-table-column :resizable="false" label="操作" width="210">
          <template slot-scope="scope">
            <span class="option edit" @click="edit(scope.row)">修改</span>&nbsp;|
            <span class="option del" @click="remove(scope.row)">删除</span>&emsp;&emsp;
            <span class="option default" @click="setDefault(scope.row)" v-if="scope.row.status===1">设为默认地址</span>
            <span class="default" v-if="scope.row.status===0">默认地址</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import AddressAPI from "../../../services/address-api";
  import errorHandler from "../../../services/error-handler";
  import {UPDATE_ADDRESS_EDIT_ITEM} from "../../../store/mutation-types";

  export default {
    breadcrumb() {
      return {
        label: '我的收货地址',
        parentsList: [
          {
            path: '/i',
            label: '个人中心'
          }
        ]
      };
    },
    data() {
      return {
        addressList: [],
      };
    },
    methods: {
      initPage() {
        this.loadAddressList();
      },
      strToArea(addressStr) {
        return addressStr.split('#').slice(0, 3).join('');
      },
      strToAddrDetail(addressStr) {
        return addressStr.split('#').slice(3).join('#');
      },
      loadAddressList() {
        AddressAPI.get()
          .then(res => res.result || [])
          .then(results => {
            results.sort((a, b) => a.status - b.status);
            this.addressList = results;
          }).catch();
      },
      setDefault(add) {
        AddressAPI.updateDefault(add.id)
          .then(() => {
            this.$message.success('设置成功');
            this.loadAddressList();
          })
          .catch(errorHandler);
      },
      remove: function (addr) {
        console.log(addr);
        const id = addr.id;
        const address = addr.revAddress;
        const mobile = addr.revMobile;
        const name = addr.revName;
        this.$confirm('确认要删除该收货地址吗？', '确认删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => AddressAPI.delete(id, address, mobile, name))
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadAddressList();
          })
          .catch(err => {
            if (err !== 'cancel') {
              errorHandler(err);
            }
          });
      },
      edit(item) {
        this.$store.commit(UPDATE_ADDRESS_EDIT_ITEM, item);
        this.$router.push({path: 'add', append: true});
      },
    },
    created() {
      this.initPage();
    }
  }
</script>

<style scoped lang="scss">

  @import "../../../assets/style/variables";

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
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 30px;
  }


</style>
