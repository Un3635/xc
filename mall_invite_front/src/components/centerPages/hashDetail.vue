<template>
    <div class="hashDetail">
        <div class="tit">
            <img src="../../assets/centerImage/Title_normal.png">
            <span class="txt">{{getdate}}</span>
        </div>
        <div class="item-detail">
            <div class="detail-table">
                <el-table :data="detailData" style="width: 100%" class="detail common-table"
                          :cell-class-name="getCellClass">
                    <el-table-column prop="computingName" label="算力名称"></el-table-column>
                    <el-table-column prop="outputCoin" label="产出币量"></el-table-column>
                    <el-table-column prop="electricityFee" label="电费"></el-table-column>
                    <el-table-column prop="serviceFee" label="服务费"></el-table-column>
                    <el-table-column prop="actualOutputCoin" label="实际币量(BTC)"></el-table-column>
                    <!--<el-table-column prop="actualincome" label="实际收益(元)"></el-table-column>-->
                </el-table>
            </div>
        </div>
        <el-pagination background
                       class="cloud-pagination"
                       v-if="detailData&&detailData.length>1"
                       @current-change="handleCurrentChange"
                       :current-page.sync="pageData.page"
                       :page-size="pageData.size"
                       layout="prev, pager, next"
                       :total="pageData.total">
        </el-pagination>
    </div>
</template>

<script>

    export default {
        name: 'hashDetail',
        data() {
            return {
                /*detailData: [
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  },
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  },
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  },
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  },
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  },
                  {
                    name: '雪豹A1BTC云算力',
                    product: '0.00000006',
                    fee: '20.00',
                    service: '20.00',
                    actual: '0.00000006',
                    income: '100.00'
                  }
                ],*/
                detailData: [],
                pageData: {
                    page: 1,
                    size: 6, //6
                    total: 0
                },
                getdate: '',
                insufficient: true
            };
        },
        methods: {
            // handleSizeChange(size) {
            //   this.pageData.size = size;
            //   this.getRevenueDetailDatas(1);
            // },
            handleCurrentChange(currentPage) {
                this.pageData.page = currentPage;
                this.getRevenueDetailDatas(this.pageData.page);
            },
            getRevenueDetailDatas(page) {
                let _params = {
                    create_time: this.getdate,
                    page_num: page,
                    page_size: this.pageData.size
                };
                let vm = this;
                getajaxdata(API.getRevenueDetailsByComputing, 'POST', _params, 'JSON', function (res) {
                    if (res.code == '1000') {
                        vm.pageData.total = res.count;
                        vm.detailData = res.data.revenueDetailsVoList;
                        if(res.data.revenueDetailsVoList) {
                            for (let i = 0; i < vm.detailData.length; i++) {
                                if (vm.detailData[i].type == 2) {
                                    vm.detailData[i].actualOutputCoin = '余额不足';
                                    vm.detailData[i].outputCoin = '-'
                                } else {
                                    vm.detailData[i].actualOutputCoin = res.data.revenueDetailsVoList[i].actualOutputCoin;
                                    vm.detailData[i].outputCoin = res.data.revenueDetailsVoList[i].outputCoin;
                                }
                            }
                        }
                        // console.log(res)
                    }
                })
            },
            getCellClass({row, column, columnIndex}) {
                if (columnIndex == 4 && row[column.property].indexOf('余额不足') > -1) {
                    return 'active'
                } else {
                    return ''
                }
            }
        },
        mounted() {
            this.getdate = this.$route.query.date;
            this.getRevenueDetailDatas(1)
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../static/css/public.scss";

    .item-detail {
        border: 1px solid #F4F4F4;
    }

    .cloud-pagination {
        margin-top: 41px;
    }

    .tit {
        @include center-item-tit;
    }
</style>