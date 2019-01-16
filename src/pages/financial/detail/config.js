export default {
 form: [
    {
      field: 'name',
      label: '机构名称: '
    },
    {
      field: 'cumulativeIncomeUnit',
      label: '累计收益: '
    },
    {
      field: 'grantIncomeUnit',
      label: '已发放收益: '
    },
    {
      field: 'unGrantIncomeUnit',
      label: '未发放收益: '
    }
  ],
  tHeader: [
    {tName: '发放收益金额', tIdx: 'grantIncome'},
    {tName: '发放流水号', tIdx: 'serialNumber'},
    {tName: '备注', tIdx: 'remark'},
    {tName: '操作人', tIdx: 'operator'}
  ],
  detail: "agencyIncomeDetail",
  review: "agencyGrantMoney"
}