export default {
  title: '机构收益',
  searchList: [
    {
      title: "名称",
      placeholder: "请输入机构名称模糊查找"
    }
  ],
  tHeader: [
    {tName: '机构名称', tIdx: 'name'},
    {tName: '累计收益', tIdx: 'cumulativeIncome'},
    {tName: '已发放收益', tIdx: 'grantIncome'},
    {tName: '未发放收益', tIdx: 'unGrantIncome'}
  ],
  list: "agencyIncomeList"
}