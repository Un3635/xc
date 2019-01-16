<template>
  <el-select v-model="value" placeholder="请选择" class="phone_country" @change="$emit('update:pc',value)">
    <el-option v-for="item in list" :key="item.countryNum" :label="item.countryNum" :value="item.countryNum">
    </el-option>
  </el-select>

</template>
<script>
  import { getCountryNums } from "../pages/mine/js/mineapi";
  export default {
    pc: {
      type: String
    },
    data() {
      return {
        list: [],
        value: ""
      };
    },
    mounted() {
      getCountryNums().then(res => {
        this.value = "+86";
        this.$emit("update:pc", this.value);
        this.list = res.result;
      });
    }
  };
</script>
