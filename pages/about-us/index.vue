<template>
  <div class="container">
    <section>
      <h2>关于我们</h2>
      <p>挖链网，报道区块链最新资讯，打造国际级新科技媒体生态平台。挖链网于2018年1月正式上线，截止2018年6月底，已有注册用户超过50w人，日活超过3w。挖链网所推出的全网首创区块链奖励体系——WT，目前持有人数也已超过23w。挖链网的这种全新体系，实现了将参与区块链项目的机会分发给所有广大用户。</p>
      <p>挖链网以区块链领域实时资讯、项目分析、行情解读、区块链技术深度分析为主导内容，推出“链对链”及“静界”两款区块链领域明星级大咖访谈节目，独家出品区块链每日行业资讯分析内容的“链情早报”音频节目。结合文字、视频、音频三种方式，聚焦全球区块链领域资讯、挖掘其深度价值。为向挖链用户提供更广角及深度的内容，挖链网升级内容体系。增加科技金融，人工智能、大数据、AR等新科技相关资讯跟踪及深度报道。</p>

    </section>
    <section>
      <h2>联系我们</h2>
      <p>市场合作/媒体合作：market@walian.cn</p>
      <p>广告合作：微信 Ttt_yn（请注明合作）</p>
    </section>
  </div>
</template>
<style scoped>
  .container {
    max-width: 70rem;
    margin: 3rem auto;
    background: #fff;
    padding: 3rem;
  }

  .page-inner {
    background-color: #fff;
    min-height: 100%;
    padding: 3rem;
  }

  section:not(:first-child) {
    padding-top: 3rem;
  }

  h2 {
    margin-bottom: 2rem;
  }

  p {
    line-height: 3;
    font-size: 0.875rem;
    margin-bottom: 1rem;
    color: #333;
  }
</style>
<script>
  export default {
    head() {
      return {
        title: "挖链网|挖掘新经济，链接新世界",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "挖链网是专业的区块链媒体资讯门户网站，挖链网汇聚全球区块链交易机构大数据、以技术为核心，打造出挖链指数、挖链闪讯、挖链学院等多个核心板块，挖掘区块链价值，为区块链创业者、区块链投资人提供一站式区块链服务体系！"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "挖链网,挖链网介绍"
          }
        ]
      };
    }
  };
</script>
