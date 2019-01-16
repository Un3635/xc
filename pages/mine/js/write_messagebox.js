import  "../scss/write_messgabox.scss";
var option = {
  cancelupload: {
    customClass: "cancelupload",
    type: "success",
    title: "确定取消本次上传吗?",
    message: "重新选择该文件可以继续上传",
    cancelButtonText: "取消",
    confirmButtonText: "确定"
  },
  soldout: {
    customClass: "soldout",
    type: "error",
    title: "下架提示",
    message: "下架后，文章再次上架将不能重复获得挖力，请确认是否进行下架操作！",
    cancelButtonText: "取消下架",
    confirmButtonText: "确定下架"
  },
  similarity: {
    customClass: "similarity",
    type: "error",
    title: "发布提示",
    message: "很抱歉，经检测您上架文章与曾发布文章相似率较高，此次上架无法获取挖力，如有异议请与客服进行联系。",
    cancelButtonText: "取消提审",
    confirmButtonText: "确定提审"
  }
};

function confim(_confirmBox, _type) {
  var { type, title, message, customClass,cancelButtonText,confirmButtonText } = option[_type];
  return _confirmBox('',{
    title,
    message,
    type,
    customClass:"write_messagebox "+customClass,
    showClose: false,
    cancelButtonText,
    confirmButtonText
  }).then(res=>{

    return res
  })
  .catch(err=>{

    return Promise.reject({
      msg:'已取消'
    });
  })
}

export { confim };
