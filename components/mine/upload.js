//文件片
// * @param multipartFile 分片文件
// * @param orignalName 文件源名称
// * @param orignalFileSize 文件源大小
// * @param partFileTotalNum 分片总数
// * @param partFileSize 分片文件大小
// * @param partFileSerialNum 分片文件序号
// * @param OSSFileName OSS上完整文件名称
class Part {
  constructor({
    multipartFile,
    orignalName,
    orignalFileSize,
    partFileTotalNum,
    partFileSerialNum
  }) {
    this.partFile = multipartFile;
    this.orignalName = orignalName;
    this.orignalFileSize = orignalFileSize;
    this.partFileTotalNum = partFileTotalNum;
    this.partFileSize = multipartFile.size;
    this.partFileSerialNum = partFileSerialNum;
    this.OSSFileName = OSSFileName;
    if (partFileNums.indexOf(partFileSerialNum) >= 0) {
      this.loaded = multipartFile.size;
    } else {
      this.loaded = 0; //辅助用的
    }
  }
  upload() {}
}
//分片操作
var createParts = file => {
  var orignalName = file.name;
  var orignalFileSize = file.size;
  var partFileTotalNum = Math.ceil(orignalFileSize / partlimit);
  for (var i = 0; i < partFileTotalNum; i++) {
    var start = null;
    var end = null;
    if (i == 0) {
      start = 0;
      end = Math.min(orignalFileSize, partlimit);
    } else if (i == partFileTotalNum - 1) {
      (start = i * partlimit), (end = orignalFileSize);
    } else {
      (start = i * partlimit), (end = i * partlimit + partlimit);
    }
    parts.push(
      new Part({
        multipartFile: file.slice(start, end),
        orignalName,
        orignalFileSize,
        partFileTotalNum,
        partFileSerialNum: i + 1
      })
    );
  }
  console.table(parts);
};
///初始化上传参数为模块全局对象
var partlimit, OSSFileName, partFileNums, uploadnum, gXhr, parts;
var initParm = (OSSFileName1, partFileNums1, option) => {
  OSSFileName = OSSFileName1 || ""; //oss文件名字
  partFileNums = partFileNums1 || []; //已经上传几片了(服务端)///有坑最后以为代表的元素才是安全的
  uploadnum = 0; ///下一片上传的文件序号 如果有
  gXhr = new XMLHttpRequest(); //全局上传对象

  parts = []; //分片数组;
  partlimit = 2 * 1024 * 1024; //每块大小
};
//上传动作
var upload = option => {
  if (partFileNums.length == 0) {
    uploadnum = 1;
  } else {
    uploadnum = partFileNums[partFileNums.length - 1] + 1;
  }

  var hasnext = parts.some(i => i.partFileSerialNum == uploadnum);
  if (hasnext) {

    var p=parts.filter(i => i.partFileSerialNum == uploadnum)[0];
    console.table([parts.filter(i => i.partFileSerialNum == uploadnum)[0]]);
    var formData = new FormData();
    Object.keys(p).forEach(
      key => {
        formData.append(key, p[key] || "");
      }
    );
    gXhr.open("post", option.action, true);

    if (option.withCredentials && "withCredentials" in gXhr) {
      gXhr.withCredentials = true;
    }
    if (gXhr.upload) {
      gXhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          parts[uploadnum-1].loaded = e.loaded;
          var allloaded = parts.reduce((a, b) => {
            return a + b.loaded;
          }, 0);
          e.percent = (allloaded / parts[0].orignalFileSize) * 100;
          e.OSSFileName = OSSFileName;
        }

        option.onProgress(e);
      };
    }
    gXhr.onload = function onload() {

      if (gXhr.status == 200) {
        var data = gXhr.responseText || gXhr.response;
        data = JSON.parse(data);
        if (data.code == "000000") {
          OSSFileName = data.data.OSSFileName;
          partFileNums = data.data.partFileNums;
          parts=parts.map(i=>{
            i.OSSFileName=OSSFileName;
            return i
          })
          upload(option);
        } else {

        }
      } else {

      }
    };
    const headers = option.headers || {};
    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        gXhr.setRequestHeader(item, headers[item]);
      }
    }
    gXhr.send(formData);

  } else {

    option.onProgress({
      percent: 100
    });
    setTimeout(() => {
      option.onSuccess(
        JSON.parse(
          `{"code":"000000","msg":"请求成功","data":{"result":"${OSSFileName}"}}`
        )
      );
    }, 1000);

  }
};
export default (option, OSSFileName1, partFileNums1) => {

  var file = option.file;
  initParm(OSSFileName1, partFileNums1, option);
  createParts(file);
  upload(option);///这边是异步递归,好恶心
  return gXhr;
};