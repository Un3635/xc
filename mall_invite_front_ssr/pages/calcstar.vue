<template>
  <div style="padding-bottom: 50px">
    <div class="clacstar-them">
      <img src="../assets/image/yunsanli_bg@2x.png" alt="">
    </div>
    <div class="clacsrtar-content _content">
      <div class="calc-title-list" ref="titleListWrap">
        <ul class="_wrap_ul" ref="titleGroup">
          <li class="calc-title" :class="{active: index === titleIdx}" v-for="(item, index) in titleList" :key="index"
              @click="changeTitle(item.id, index)">{{item.name}}
          </li>
        </ul>
      </div>
      <div class="calc-detail-list" v-loading.lock="fullscreenLoading">
        <div class="zan-wu-data" v-show="!calcList || !calcList.length">暂无数据</div>
        <ul>
          <li class="calc-detail" v-for="(item2, index) in calcList" :key="index">
            <a href="javascript:;" @click.stop="checkDetail(item2.id)">
              <div class="type">{{titleMap[item2.cloudPowerType] || '未知'}}</div>
              <div class="img">
                <img :src="item2.goodsImgUrl" :alt="item2.goodsName" class="calc-detail_img">
              </div>
              <strong class="title">{{item2.goodsName}}</strong>
              <div class="btn" @click.stop="checkDetail(item2.id)">查看详情</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="pagination-wrap" v-show="calcList && calcList.length>20">
        <el-pagination
          background
          :page-size="12"
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          @prev-click="prevNextClick(-1)"
          @next-click="prevNextClick(1)"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import {mapState} from 'vuex';

  export default {
    data () {
      return {
        titleList: ['全都算力'],
        titleMap: {},
        calcList: [],
        titleIdx: 0,
        total: 0,
        pageNum: 1,
        pageSize: 12,
        powerTypeId: '',
        fullscreenLoading: true
      };
    },
    computed: {
      ...mapState(['showLoginPage'])
    },
    watch: {
      showLoginPage: {
        handler(val) {
          if (!val) {
            this.getPowerType();
            this.getGoodsList();
          }
        }
      }
    },
    mounted() {
      this.getPowerType();
      this.getGoodsList();
    },
    methods: {
      changeTitle(powertypeid, index) {
        this.titleIdx = powertypeid ? index : 0;
        this.powerTypeId = powertypeid;
        this.getGoodsList();
      },
      getGoodsList() {
        let param = {'page_num': this.pageNum, 'page_size': this.pageSize,'initTimes': new Date().getTime()};
        this.fullscreenLoading = true;
        if (this.powerTypeId) {
          param['power_type_id'] = this.powerTypeId;
        }
        getajaxdata(
          API.goodsList,
          'POST',
          param,
          'json',
          (res) => {
            this.calcList = res.data.goodsVos;
            this.total = res.data.totalCount;
            this.fullscreenLoading = false;
          });
      },
      getPowerType(){
        getajaxdata(
          API.listPowerType,
          'POST',
          {'initTimes': new Date().getTime()},
          'json',
          (res) => {
            if (!res.data.dataCode) return;
            this.titleList = res.data.powerTypeVos;
            this.titleList.map((list) => {
              this.titleMap[list.id] = list.name.slice();
            });
            this.titleList.unshift({name: '全部算力'});
            // this.titleList.push({name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'},{name:'全部算力'})
            this.$nextTick(() => {
              this.titleScroll();
              new BScroll(this.$refs.titleListWrap, {
                click: true,
                scrollX: true,
                scrollY: false
                // bounce: false
              });
            });
          });
      },
      titleScroll() {
        let children = this.$refs.titleGroup.children;
        let wrapWidth = this.$refs.titleListWrap.clientWidth;
        let width = 0;
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          width += child.clientWidth;
        }
        this.$refs.titleGroup.style.width = width + 'px';
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getGoodsList();
      },
      prevNextClick(step) {
        this.pageNum += step;
        this.getGoodsList();
      },
      checkDetail(goodsId) {
        if(this.$route.query.type && this.$route.query.inviteCode){
          this.$router.push({path: '/calcstar-detail', query: {type: this.$route.query.type,inviteCode: this.$route.query.inviteCode,goodsId: goodsId}})
        }else{
          this.$router.push({
            path: '/calcstar-detail',
            query: {
              goodsId: goodsId
            }
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $bg_color: linear-gradient(153deg, #8557FF  0%, #4D2EEA 95%);
  .fl {
    float: left;
  }

  ._wrap {
    width: 100%;

  }

  ._wrap_ul {
    height: 68px;
    white-space: nowrap
  }

  .clacstar-them {
    width: 100%;
    min-width: 1200px;
    height: 512px;
    img{
      object-fit: cover;
    }
  }

  .clacsrtar-content {
    margin-top: 32px;
    min-height: calc(100vh - 770px);

  .calc-title-list {
    width: 100%;
    height: 68px;
    background: #FFFFFF;
    overflow: hidden;
  }

  .calc-title {
    display: inline-block;
    width: 134px;
    height: 68px;
    line-height: 68px;
    text-align: center;
    letter-spacing: 0;
    font-size: 18px;
    color: #9B9B9B;
    cursor: pointer;
    transition: all .5s ease-in-out;

  &.active {
    color: #FFFFFF;
    background-image: $bg_color;
     box-shadow: 0 4px 10px 0 rgba(77,46,234,0.30);
  }

  }
  .calc-detail-list {
    min-height: 730px;
    height: auto;
    overflow: hidden;
    margin-top: 35px;
  .zan-wu-data {
    font-size: 15px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 70px;
    text-align: center;
  }

  .calc-detail {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    width: 290px;
    height: 375px;
    background: #FFFFFF;
    margin: 0px 12px 12px 0px;
    transition: all .5s ease;
    border: 1px solid #ffffff;
  .img{
    img{
      transition: all 0.6s;
    }
  }

  &:hover {
    border: 1px solid #4D2EEA;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);

  .btn {
    background-image: $bg_color;
    color: #ffffff;
  }
  .img{
    img{
      transform: scale(1.1);
    }
  }

  }
  &:nth-of-type(4n) {
    margin: 0px;
  }

  .calc-detail_img {
    width: 176px;
    height: 178px;
    margin: 50px 57px 45px;
  }

  .type {
    position: absolute;
    top: 11px;
    right: 0px;
    padding: 6px 16px;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 12px;
    background: #060124;
    border-radius: 20px 0 0 20px;
    text-align: center;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .img {
    width: 100%;
    height: 268px;
  }

  .title {
    display: block;
    margin: 0px 36px;
    padding-top: 10px;
    font-size: 16px;
    color: #2F2F2F;
    letter-spacing: 0;
    /*overflow: hidden;*/
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    text-align: center;
  }

  .btn {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #2F2F2F;
    letter-spacing: 0;
    margin: 18px 47px 20px 48px;
    text-align: center;
    border: 1px solid transparent;
    border-image: -webkit-linear-gradient(#8557FF, #4D2EEA) 1 1;
    border-image: -moz-linear-gradient(#8557FF, #4D2EEA) 1 1;
    border-image: linear-gradient(#8557FF, #4D2EEA) 1 1;
    font-weight: 700;
    border-radius: 0px;
  }

  }
  }
  .pagination-wrap {
    margin: 40px auto 0;
    text-align: center;

  .pagination {
    background: #FFFFFF;
    border-radius: 2px;
  }

  }
  }
</style>
