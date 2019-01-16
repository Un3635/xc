console.log('##############挖链网更新重启中...')
var axios=require('axios');
var a={
    "msgtype": "text",
    "text": {
        "content": "挖链网更新重启中..."
    }
}
axios.post('https://oapi.dingtalk.com/robot/send?access_token=23ae4cc68ec2b79faf55f02a49d5d03a4e096eef37f36064c0d2e79cae5b2cd1',a)