<template>
    <div class="table">
        <div class="item-detail">
            <div class="detail-table cloud-table">
                <el-table :data="myCurrentTables" style="width: 100%" class="cloud-table-list common-table"
                          @row-click="openDetail">
                    <el-table-column fixed label="日期" width="140" class="first-column">
                        <template slot-scope="scope">
                            {{scope.row.date | date('YYYY-MM-DD')}}
                        </template>
                    </el-table-column>
                    <el-table-column v-if="incomeCoinList&&incomeCoinList.length==0">

                    </el-table-column>
                    <el-table-column v-if="incomeCoinList&&incomeCoinList.length>0" :label="item.coinName"
                                     v-for="(item,index) in incomeCoinList" :key="index"
                                     min-width="152">
                        <template slot-scope="scope">
                            <span v-if="scope.row.incomeList[index]">{{scope.row.incomeList[index].income}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="electricityFee" label="电费" min-width="135"></el-table-column>
                    <el-table-column prop="serviceFee" label="服务费" min-width="135"></el-table-column>
                    <el-table-column prop="status" label="状态" width="118px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status">已到账</span>
                            <span v-else>未到账</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-pagination background
                       v-if="mytables&&mytables.length>1&&pageDatas.total"
                       @current-change="handleCurrentChange"
                       :current-page.sync="pageDatas.page"
                       :page-size="pageDatas.size"
                       layout="prev, pager, next"
                       :total="pageDatas.total">
        </el-pagination>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'hashtable',
        props: {
            resData: {
                type: Object
            },
            pageData: {
                type: Object
            }
        },
        data() {
            return {
                /*mytables: [
                  {
                    date: '2018-07-11 18:26:14',
                    electricityFee: '988.33000000',
                    incomeList: [
                      {coinName: 'BTC', income: '53.33300000'},
                      {coinName: 'ETH', income: '54.33300000'},
                      {coinName: 'DCR', income: '55.33300000'}
                    ],
                    serviceFee: '66.11100000',
                    status: false
                  },
                  {
                    date: '2018-07-10 18:26:14',
                    electricityFee: '988.33000000',
                    incomeList: [
                      {coinName: 'BTC', income: '53.33300000'},
                      {coinName: 'ETH', income: '54.33300000'},
                      {coinName: 'DCR', income: '55.33300000'}
                    ],
                    serviceFee: '66.11100000',
                    status: false
                  },
                  {
                    date: '2018-07-09 18:26:14',
                    electricityFee: '988.33000000',
                    incomeList: [
                      {coinName: 'BTC', income: '53.33300000'},
                      {coinName: 'ETH', income: '54.33300000'}
                    ],
                    serviceFee: '66.11100000',
                    status: false
                  },
                  {
                    date: '2018-07-08 18:26:14',
                    electricityFee: '988.33000000',
                    incomeList: [
                      {coinName: 'ADD', income: '53.33300000'},
                      {coinName: 'ETH', income: '54.33300000'},
                      {coinName: 'DCR', income: '55.33300000'}
                    ],
                    serviceFee: '66.11100000',
                    status: false
                  },
                  {
                    date: '2018-07-07 18:26:14',
                    electricityFee: '988.33000000',
                    incomeList: [
                      {coinName: 'ADD', income: '53.33300000'},
                      {coinName: 'FTN', income: '53'}
                    ],
                    serviceFee: '66.11100000',
                    status: false
                  }
                ],*/
                mytables: [],
                myCurrentTables: [],
                pageDatas: {},
                /*incomeCoinList: [
                  {
                    coinName: 'BTC',
                    holdingAmount: '58.00000000'
                  },
                  {
                    coinName: 'ETH',
                    holdingAmount: '65.00000000'
                  },
                  {
                    coinName: 'DCR',
                    holdingAmount: '2.36000000'
                  },
                  {
                    coinName: 'ABC',
                    holdingAmount: '2.36000000'
                  },
                  {
                    coinName: 'ADD',
                    holdingAmount: '2.36000000'
                  },
                  {
                    coinName: 'BCR',
                    holdingAmount: '2.36000000'
                  },
                  {
                    coinName: 'FTN',
                    holdingAmount: '2.36000000'
                  }
                ]*/
                incomeCoinList: [],
            };
        },
        watch: {
            resData: function () {
                this.inittableData(this.resData.revenueDetailsVoList, this.resData.incomeCoinList);
            },
            pageData: function () {
                this.pageDatas = this.pageData;
            }
        },
        methods: {
            handleCurrentChange(current) {
                // this.pageData.page = page;
                // this.myCurrentTables = this.mytables.slice(6 * (this.pageData.page - 1), 6 * (this.pageData.page));
                // this.getComputingGainDatas();
                this.$emit('currentChangePage', current);
                this.myCurrentTables = this.mytables.slice(6 * (this.pageDatas.page - 1), 6 * (this.pageDatas.page));
            },
            openDetail(row, event, column) {
                var newdate = moment(row.date).format('YYYY-MM-DD');
                this.$router.push({path: '/center/hash/detail', query: {date: newdate}});
            },
            /*getComputingGainDatas() {
                let arr = {
                    page_num: this.pageData.page,
                    page_size: this.pageData.size
                };
                let vm = this;
                getajaxdata(API.getComputingGain, 'POST', arr, 'JSON', function (res) {
                    if (res.code == '1000') {
                        vm.pageData.total = res.count;
                        vm.inittableData(res.data.revenueDetailsVoList, res.data.incomeCoinList);
                    }
                });
            },*/
            inittableData(tab, list) {
                list.sort(function (a, b) {
                    if (a.coinName < b.coinName) {
                        return -1;
                    }
                    if (a.coinName > b.coinName) {
                        return 1;
                    }
                    return 0;
                });
                for (var i = 0; i < list.length; i++) {
                    this.filterDatas(list[i], tab);
                }
                this.$nextTick(function () {
                    this.mytables = tab;
                    this.myCurrentTables = this.mytables.slice(6 * (this.pageData.page - 1), 6 * (this.pageData.page));
                    this.incomeCoinList = list;
                    for (let i = 0; i < this.mytables.length; i++) {
                        this.mytables[i].electricityFee = tab[i].electricityFee ? tab[i].electricityFee : "-";
                        this.mytables[i].serviceFee = tab[i].serviceFee ? tab[i].serviceFee : "-";
                    }
                });
            },
            filterDatas(item, tab) {
                var obj = {
                    'coinName': item.coinName,
                    'income': '-'
                };
                for (var j = 0; j < tab.length; j++) {
                    if (JSON.stringify(tab[j].incomeList).indexOf(item.coinName) < 0) {
                        tab[j].incomeList.push(obj);
                    }
                    tab[j].incomeList.sort(function (a, b) {
                        if (a.coinName < b.coinName) {
                            return -1;
                        }
                        if (a.coinName > b.coinName) {
                            return 1;
                        }
                        return 0;
                    });
                }
                return tab;
            }
        },
        mounted() {
            this.pageDatas = this.pageData;
            if(this.resData.revenueDetailsVoList && this.resData.incomeCoinList){
                this.inittableData(this.resData.revenueDetailsVoList, this.resData.incomeCoinList);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../static/css/public.scss";

    .table {
        width: 100%;

        .item-detail {
            border: 1px solid #F4F4F4;
        }

        .cloud-pagination {
            margin-top: 41px;
        }

    }

</style>