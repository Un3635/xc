<template>
  <div id="pageguide">
    <el-row :gutter="80">
      <el-col :span="7">
        <h3 class="pageguide-lefttitle">新手指引</h3>
        <ul class="pageguide-left">
          <li v-for="(i,idx) in data " :key="idx" :class="{show:i.show}">
            <span @click="change(i)">
              <em>{{idx+1}}</em>{{i.title}}</span>
            <ul>
              <li v-for="(ii,iidx) in i.handBookSecondList" :key="iidx" @click="getHtml(ii,i)" :class="{show:ii.show}">{{ii.title}}</li>
            </ul>
          </li>
        </ul>

      </el-col>
      <el-col :span="17">
        <div class="page-guide-container" v-html="html.content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getHandBookFirstList, getHandBookSecond } from "~/service/main-api";
  export default {
    methods: {
      change(item) {
        if (item.show) {
          item.show = false;
        } else {
          this.data.forEach(i => {
            i.show = false;
          });
          item.show = true;
        }
      },
      getHtml(item2, i) {
        this.data.forEach(_i => {
          _i.handBookSecondList.forEach(_ii => {
            _ii.show = false;
          });
        });

        item2.show = true;
        getHandBookSecond(item2.handbook_second_id).then(html => {
          this.html = html;
        });
      }
    },
    asyncData() {
      return getHandBookFirstList().then(data => {
        // data = data.map((i, idx) => {
        //   i.show = false;
        //   return i;
        // });
        data = data.filter(i => i.handBookSecondList.length > 0).map((i, idx) => {
          i.show = false;
          return i;
        });

        data[0].show = true;
        data[0].handBookSecondList[0].show = true;
        return getHandBookSecond(
          data[0].handBookSecondList[0].handbook_second_id
        ).then(data2 => {
          return {
            html: data2,
            data: data
          };
        });
      });
    },
    head() {
      return {
        title: "区块链新手入门_区块链新手教程-挖链网",
        meta: [
          {
            hid: "description",
            name: "description",
            content:
              "区块链新手入门免费教程，让你轻松了解区块链，教你如何投资区块链。"
          },
          {
            hid: "keywords",
            name: "keywords",
            content: "区块链是什么,挖矿教程,区块链入门,区块链新手教程"
          }
        ]
      };
    }
  };
</script>

<style  lang="scss">
  #pageguide {
    max-width: 1180px;
    margin: 1rem auto;
    padding: 1.5rem 0;
    .page-guide-container {
      padding: 35px;
      h1 {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 2;
        font-weight: normal;
      }
      h2 {
        font-size: 14px;
        font-weight: normal;
        line-height: 2;
      }
      h3 {
        font-size: 14px;
        font-style: normal;
        line-height: 2;
      }
      p {
        color: #505050;
        font-size: 14px;
        line-height: 2 !important;
        margin-bottom: 2em;
      }
    }
    .pageguide-lefttitle {
      margin-bottom: 15px;
      font-size: 16px;
      color: #000000;
      padding-left: 24px;
    }
    .pageguide-left {
      width: 290px;
      cursor: pointer;
      > li {
        > span {
          display: inline-block;
          width: 100%;
          line-height: 45px;
          font-size: 14px;
          padding-left: 24px;
          color: #000000;
          em {
            display: inline-block;
            width: 20px;
            height: 20px;
            font-style: normal;
            line-height: 20px;
            text-align: center;
            background: #ccc;
            border-radius: 50%;
            margin-right: 12px;
          }
        }
        > ul {
          height: 0;
          overflow: hidden;
        }
        &.show {
          background: #0063ee;
          > span {
            color: white;
            em {
              background-color: white;
              color: #0063ee;
            }
          }
          > ul {
            height: initial;
            overflow: auto;
            background: #f4f4f4;
            > li {
              line-height: 45px;
              padding-left: 56px;
              font-size: 14px;
              color: #000000;
              &:hover,
              &.show {
                color: #0063ee;
              }
            }
          }
        }
        &:hover {
          background: #0063ee;
          > span {
            color: white;
            em {
              background-color: white;
              color: #0063ee;
            }
          }
          > ul {
            > li {
              line-height: 45px;
              padding-left: 56px;
              font-size: 14px;
              color: #000000;
              &:hover {
                color: #0063ee;
              }
            }
          }
        }
      }
    }
  }
</style>
