<template>
  <div class="page">
    <div class="breadcrumb">
      <div class="breadcrumb__inner">
        <app-breadcrumbs/>
      </div>
    </div>
    <div class="page-container">
      <div class="page__header">
        <img src="../assets/images/about-us.jpg" alt="">
      </div>
      <div class="page__body">
        <section>
          <h2>关于算立方</h2>
          <p>
            算立方隶属于上海挖链科技有限公司旗下品牌，作为一个国际级专业算力服务平台，旨在为用户提供一站式服务。目前算立方拥有多款高效能、低功耗的矿机销售业务，为大型矿场提供矿场部署技术一对一支持，为中小矿工提供全流程矿机托管服务，包含提供大型成熟稳定的矿场、7*24专业维护服务、保证挖矿收益最大化等。
            除此之外，算立方还推出了多币种云算力专业租赁服务，为用户提供了一种低门槛、低成本、低风险、低费用的全新挖矿方式。投资者无需采购组建矿机，就可以在平台购买挖矿算力。余额付费、以币抵费两种付费方式可自由切换，即时生效。购买后，云算力实际产出币量清晰可查，收益记录亦可追溯！
            以区块链、云计算等代表的技术狂潮已经开始席卷全球，希望更多的同道者加入我们，了解关于我们的优质业务，与我们一起紧跟时代风口。</p>
          <el-row class="features">
            <el-col :span="8">
              <img src="../assets/images/icon_internationalization.png" alt="">
              <p>国际化平台</p>
            </el-col>
            <el-col :span="8">
              <img src="../assets/images/icon_trusteeship.png" alt="">
              <p>全流程托管</p>
            </el-col>
            <el-col :span="8">
              <img src="../assets/images/icon_maintain.png" alt="">
              <p>24H专业维护</p>
            </el-col>
          </el-row>
        </section>
        <section>
          <h2>联系我们</h2>
          <el-row class="contact-us">
            <el-col :span="14">
              <h4>上海挖链科技有限公司</h4>
              <p>地址：上海市徐汇区云锦路500号绿地汇中心B座12楼</p>
            </el-col>
            <el-col :span="10">
              <h4>服务热线</h4>
              <p>联系电话：400-865-6688</p>
            </el-col>
            <el-col :span="12">
              <h4>商务合作</h4>
              <p>Email：bd@walian.cn</p>
            </el-col>
          </el-row>
        </section>
      </div>
    </div>
    <x-features-powershop/>
  </div>
</template>

<script>
  import XFeaturesPowershop from "../components/x-features-powershop";

  export default {
    name: "about-us",
    components: {XFeaturesPowershop}
  }
</script>

<style scoped lang="scss">

  .breadcrumb {
    background-color: #f6f6f6;
  }

  .breadcrumb__inner {
    width: 1200px;
    margin: 0 auto;
    line-height: 40px;
  }

  .page {
    background-color: #F5F5F5;
  }

  .page-container {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 50px;
  }

  .page__header {
    img {
      width: 100%;
      vertical-align: top;
    }
  }

  .page__body {
    padding: 70px 250px;
    background-color: #fff;
  }

  h2 {
    font-size: 28px;
    color: #303137;
    line-height: 37px;
    margin-bottom: 30px;
  }

  p {
    font-size: 14px;
    line-height: 27px;
    color: #606166;
  }

  .features {
    text-align: center;
    padding-top: 60px;
    padding-bottom: 70px;

    img {
      width: 90px;
    }

    p {
      margin-top: 15px;
      font-size: 16px;
      color: #A99067;
    }
  }

  .contact-us {
    margin-top: -30px;

    h4 {
      margin-top: 40px;
      font-size: 18px;
      line-height: 27px;
      color: #606166;
    }
    p {
      margin-top: 10px;
    }
  }
</style>
