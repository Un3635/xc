const path = require('path');
// const bodyParser = require('body-parser');
const express = require('express');

const app = express();


// app.post('/result', function(req, res) {
//   res.status(200);
//   // console.log(req.body);
//   res.send(req.body);
// })
app.use(express.static(path.join(__dirname)));
app.listen('8038', '0.0.0.0', function() {
  console.log('服务启动 - port-8038');
})