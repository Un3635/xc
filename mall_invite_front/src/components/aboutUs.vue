<template>
    <div class="about-us">
        <div class="about">
            <div class="tit">
                <div class="left-img"><img src="../../static/image/Left-label_normal.png" alt=""></div>
                关于我们
                <div class="right-img"><img src="../../static/image/right-label_normal.png" alt=""></div>
            </div>
            <div class="body">
                <p>总部位于澳大利亚必和必拓公司旗下的算力星球项目，是基于必和必拓公司持有的全球第二大铁矿石矿场及资金投入的比特币矿场及矿机研发，
                    现矿场投入位于13个国家，其中以澳大利亚、德国、柬埔寨、中国、新加坡为主营市场。</p>

                <p style="margin-top: 18px">亚洲区运营部设立在中国的金融之城——深圳，全球顶尖的团队将为项目的运营提供技术支持、风险把控、投入方案、自由流通</p>
                <p>等方面进行全方位的服务。及矿机研发，现矿场投入位于13个国家，其中以澳大利亚、德国、柬埔寨、中国、新加坡为主营市场。</p>
            </div>
            <div class="tit" style="margin-top: 81px">
                <div class="left-img"><img src="../../static/image/Left-label_normal.png" alt=""></div>
                联系我们
                <div class="right-img"><img src="../../static/image/right-label_normal.png" alt=""></div>
            </div>
            <div class="about-footer">
                <ul>
                    <!-- <li>
                        <div class="text">联系电话</div>
                        <div class="line">{{listData.serviceCall}}</div>
                    </li> -->
                    <li>
                        <div class="text">星球官方微信</div>
                        <div class="line">{{listData.serviceWechart}}</div>
                    </li>
                    <li>
                        <div class="text">星球商务合作</div>
                        <div class="line">{{listData.businessCooperation}}</div>
                    </li>
                    <li>
                        <div class="text">星球电报群</div>
                        <div class="line">{{listData.serviceWechart}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        listData: {}
      };
    },
    created() {
      getajaxdata(API.contactus, 'GET', {}, 'json', (res) => {
        this.listData = res.data;
      }, this);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .about-footer .line {
        margin-top: 15px;
    }
</style>
