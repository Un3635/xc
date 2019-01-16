<template>
  <div class="detail" @click="$event.cancelBubble=true">
    <div class="detail-head">
      <h3 class="detail__name">{{ dataBaseDetail.shortName }}</h3>
    </div>
    <div class="detail-body">
      <el-row :gutter="30">
        <el-col :span="8">
          <h4>货币简介</h4>
          <div class="content" v-html="dataBaseDetail.intro"></div>
        </el-col>
        <el-col :span="8">
          <h4>基本参数</h4>
          <dl class="param-info">
            <div class="param-info-item">
              <dt>中文名字</dt>
              <dd class="right">{{ dataBaseDetail.name }}</dd>
            </div>
            <div class="param-info-item">
              <dt>英文名</dt>
              <dd class="right">{{ dataBaseDetail.nameEn }}</dd>
            </div>
            <div class="param-info-item">
              <dt>英文简称</dt>
              <dd class="right">{{ dataBaseDetail.shortName }}</dd>
            </div>
            <div class="param-info-item">
              <dt>区块时间</dt>
              <dd class="right">{{ dataBaseDetail.blockTime }}</dd>
            </div>
            <div class="param-info-item">
              <dt>发布日期</dt>
              <dd class="right">{{ dataBaseDetail.releaseTime }}</dd>
            </div>
            <div class="param-info-item">
              <dt>核心算法</dt>
              <dd class="right">{{ dataBaseDetail.coreAlgorithm }}</dd>
            </div>
            <div class="param-info-item">
              <dt>货币总量</dt>
              <dd class="right">{{ dataBaseDetail.totalAmount }}</dd>
            </div>
          </dl>
        </el-col>
        <el-col :span="8">
          <h4>最新要闻</h4>
          <ul class="news">
            <li class="clearfix" v-for="(item,index) in dataBaseDetalNews" :key="index">
              <a :href="'/news/' + item.id+'.html'">
                <img :src="item.logo" alt="">
                <div class="news-content">
                  <h5>{{ item.title|truncate(28)}}</h5>
                  <p>{{item.pubTime|fromNow}} · {{ item.author }}</p>
                </div>
              </a>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
  .detail {
    max-width: 1180px;
    height: 100%;
    margin: auto;
    background-color: #fff;
    padding: 30px;
  }

  .detail__name {
    font-size: 26px;
    line-height: 30px;
    height: 30px;
    margin-bottom: 30px;
  }

  .detail-body h4 {
    margin-bottom: 20px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 1;
    color: #333;
    border-left: 2px solid #0063ee;
  }

  .param-info {
    padding: 4px 10px;
    border: 1px solid #f0f0f0;
  }

  .param-info-item {
    font-size: 12px;
    line-height: 30px;
  }

  .param-info dt,
  .param-info dd {
    display: inline-block;
  }

  .content,
  .news {
    height: 220px;
    padding: 10px;
    border: 1px solid #f0f0f0;
  }

  .content {
    font-size: 12px;
    word-break: break-all;
    overflow-y: auto;
    line-height: 1.7;
  }

  .news li {
    position: relative;
    padding-left: 110px;
    margin-bottom: 10px;
    height: 60px;
  }

  .news img {
    /*float: left;*/
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 100px;
    height: 60px;
  }

  .news-content {
    padding-top: 2px;
  }

  .news-content h5 {
    font-size: 12px;
    line-height: 20px;
    color: #333;
    font-style: normal;
  }

  .news-content p {
    font-size: 12px;
    line-height: 18px;
    color: #999;
  }
</style>
<script>
  import { getDataBaseDetail, getDataBaseDetailNews } from "~/service/main-api";

  export default {
    props: ["childData"],
    data() {
      return {
        dataBaseDetail: {
          monetary: ""
        },
        dataBaseDetalNews: []
      };
    },
    mounted() {
      this.getData(this.childData);
    },
    methods: {
      getData(val) {
        getDataBaseDetail(val).then(res => {
          this.dataBaseDetail = res;
        });
        getDataBaseDetailNews(val)
          .then(res => res.list)
          .then(res => {
            this.dataBaseDetalNews = res;
          });
      }
    },
    watch: {
      childData(val) {
        this.getData(val);
      }
    }
  };
</script>
