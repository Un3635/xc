import { httppost, httpget } from "../../../service/http";
import * as moment from "moment";

export const updateHead = ({ file }) => {
  return httppost("/user/updateHead.wl", { file });
};

export const updateUser = ({ type, value }) => {
  return httppost("/user/updateUser.wl", { type, value });
};

export const getSendCode = (
  { account = "", countryNum = "+86", type, captchaCode = "" },
  needLogin = true
) => {
  return httppost(
    "/web_user/getSendCode.open",
    { countryNum, type, captchaCode, account },
    needLogin
  );
};

export const updatePwd = ({ code, pwd }) => {
  return httppost("/web_user/updatePwd.wl", { code, pwd });
};

export const submitRealName = ({ userName, idcardNum }) => {
  return httppost("/web_user/submitRealName.wl", { userName, idcardNum });
};

export const updateEmail = ({ newEmail, code }) => {
  return httppost("/web_user/updateEmail.wl", { newEmail, code });
};

export const checkAccount = ({ code }) => {
  return httppost("/web_user/checkAccount.wl", { code });
};
export const checkMailCode = ({ account, emailCode }) => {
  return httppost("/web_user/checkMailCode.wl", { account, emailCode });
};
export const mailBindPhone = ({ countryNum, mobile, email, code }) => {
  return httppost("/web_user/mailBindPhone.wl", {
    countryNum,
    mobile,
    email,
    code
  });
};

export const myAccount = () => {
  return httppost("/web_user/myAccount.wl");
};

export const articlereports = ({ date = "" }) => {
  return httppost("/user-article/reports.wl", { date });
};

export const articlelist = ({ pageSize = 5, pageNum = 1, title = "" }) => {
  return httppost("/user-article/list.wl", { pageSize, pageNum, title });
};
export const articlelists = ({ status = -1, pageSize = 5, pageNum = 1 }) => {
  return httppost("/user-article/getArticleList.wl", {
    status,
    pageSize,
    pageNum
  });
};
export const getUserVideoList = ({
  status = -1,
  pageSize = 5,
  pageNum = 1
}) => {
  if (status == -1) {
    status = "";
  }
  return httppost("/webUserVideo/getUserVideoList.wl", {
    status,
    pageSize,
    pageNum
  }).then(res => {

    var { list, page } = res;
    var list1 = list.map(i => {
      var item = {
        articleId: i.id,
        channelId: null,
        channelName: null,
        content: i.intro,
        createDate: moment(i.createTime).format("YYYY-MM-DD HH:mm"), ///我改下
        intro: i.intro,
        logo: i.logo,
        note: i.remark,
        operate: i.operateVoList,
        pubDate: "",
        pubPlatform: null,
        rejectReason: i.remark,
        status: i.status,
        statusName: i.statusName,
        subTitle: null,
        title: i.title
      };
      return item;
    });
    return {
      list: list1,
      page
    };
  });
};
export const getUserVideoCount = ({ status = -1 }) => {
  if (status == -1) {
    status = "";
  }
  return httppost("/webUserVideo/getUserVideoCount.wl", { status }).then(
    res => {
      return {
        total: res
      };
    }
  );
};

export const getUseraudioList = ({
  status = -1,
  pageSize = 5,
  pageNum = 1
}) => {
  if (status == -1) {
    status = "";
  }

  return httpget("/audio/audioList.wl", {
    status,
    pageSize,
    pageNum
  }).then(res => {

    var { list, page } = res;
    var list1 = list.map(i => {
      var item = {
        articleId: i.id,
        channelId: null,
        channelName: null,
        content: i.intro,
        createDate: moment(i.createTime).format("YYYY-MM-DD HH:mm"), ///我改下
        intro: i.intro,
        logo: i.logo,
        note: i.remark,
        operate: i.operateVoList,
        pubDate: "",
        pubPlatform: null,
        rejectReason: i.remark,
        status: i.status,
        statusName: i.statusName,
        subTitle: null,
        title: i.title
      };
      return item;
    });
    return {
      list: list1,
      page
    };
  });
};
export const getaudioCount = ({ status = -1 }) => {
  if (status == -1) {
    status = "";
  }
  return httppost("/audio/audioCount.wl", { status }).then(res => {
    return {
      total: res
    };
  });
};

export const articledata = () => {
  return httppost("/user-article/getAuthorArticleData.wl");
};

export const articleeditArticleStatus = ({ articleId, type }) => {
  return httppost("/user-article/editArticleStatus.wl", { articleId, type });
};

export const articleeeditArticle = ({
  articleId = "",
  type,
  title,
  subTitle,
  intro,
  content,
  logo,
  logoApp,
  pubPlatform
}) => {
  return httppost("/user-article/editArticle.wl", {
    articleId,
    type,
    title,
    subTitle,
    intro,
    content,
    logo,
    logoApp,
    pubPlatform
  });
};

export const articledetail = ({ articleId }) => {
  return httppost("/user-article/detail.wl", { articleId });
};

export const user_register = ({
  countryNum = "+86",
  account,
  type,
  code,
  pwd
}) => {
  return httppost(
    "/web_user/register.open",
    { account, type, code, pwd, countryNum },
    false
  );
};
export const telLogin = ({ countryNum = "+86", account, code }) => {
  return httppost(
    "/web_user/telLogin.open",
    { countryNum, account, code },
    false
  );
};
export const Login = ({
  countryNum = "+86",
  account,
  captchaCode,
  type,
  pwd
}) => {
  return httppost(
    "/web_user/login.open",
    { countryNum, account, captchaCode, type, pwd },
    false
  );
};
///

export const resetPwd = ({ countryNum = "+86", account, code, type, pwd }) => {
  return httppost(
    "/web_user/resetPwd.open",
    { countryNum, account, code, type, pwd },
    false
  );
};
export const logout = () => {
  return httppost("/user/logout.wl", {});
};

export const getCountryNums = () => {
  return httppost("/web_user/getCountryNums.open", {}, false);
};
export const getFollowList = () => {
  return httppost(
    "/follow/getFollowList.wl",
    { pageNum: 1, pageSize: 9999 },
    true
  );
};
export const oprFollow = ({ authorType, authorUserId }) => {
  return httppost("/follow/oprFollow.wl", { authorType, authorUserId }, true);
};
export const getCollectList = ({ pageNum }) => {
  return httppost("collect/collectWebAllList.wl", { pageNum: pageNum }, true);
};
export const oprType = ({ collectType, uniteId }) => {
  return httppost(
    "/collect/updateWebCollect.wl",
    { collectType, uniteId },
    true
  );
};
export const personalNews = ({ pageNum, messageType }) => {
  return httpget(
    "/interaction/getWebUserInteractionList.wl",
    { pageNum, messageType },
    true
  );
};

export const userSpecialAuthor = () => {
  return httpget("/user-article/specialAuthor.wl", {}, true);
};

export const userSpecialAuthorChoose = ({ decision }) => {
  return httppost("/user-article/specialAuthorChoose.wl", { decision }, true);
};

//音频文章草稿发布
export const audioaudioAudit = ({
  title,
  audioId,
  audio,
  coverPic,
  type,
  playPic
}) => {
  return httppost(
    "/audio/audioAudit",
    { title, audioId, audio, coverPic, type, playPic },
    true
  );
};

//检查文章相似度
export const acticlecheckFamiliar = ({ title, content }) => {
  return httppost("/acticle/checkFamiliar", { title, content }, true);
};
//检查视频相似度
export const videocheckFamiliar = ({ title }) => {
  return httppost("/webUserVideo/checkFamiliar.wl", { title }, true);
};
//检查音频相似度
export const audiocheckFamiliar = ({ title }) => {
  return httppost("/audio/familiar", { title }, true);
};

//视频文章草稿发布
export const saveUserVideoInfo = ({ id, title, intro, logo, videoUrl }) => {
  return httppost(
    "/webUserVideo/saveUserVideoInfo.wl",
    { id, title, intro, logo, videoUrl },
    true
  );
};
//视频文章提审发布
export const submitUserVideo = ({ videoId }) => {
  return httppost("/webUserVideo/submitUserVideo.wl", { videoId }, true);
};
//视频详情
export const userVideoInfo = ({ videoId }) => {
  return httppost("/webUserVideo/userVideoInfo.wl", { videoId }, true);
};
//音频详情
export const editAudioQuery = ({ audioId }) => {
  return httpget("/audio/editAudioQuery.wl", { audioId }, true);
};

//改变音频状态
export const checkAudioStatus = ({ id, type }) => {
  return httppost(
    "/audio/checkAudioStatus.wl",
    { audioId: id, type: type },
    true
  );
};

//改变音频状态
export const webUserVideounderCarriageVideo = ({ id, type }) => {
  return httppost("/webUserVideo/underCarriageVideo.wl", { videoId: id }, true);
};

//文件分片上传文件信息检测
export const checkFileUploadInfo = ({
  orignalName,
  originalFileSize,
  type = "mp4"
}) => {
  if (type == "mp4") {
    return httppost(
      "/webUserVideo/checkFileUploadInfo.wl",
      { orignalName, originalFileSize },
      true
    );
  } else {
    return httppost(
      "/audio/checkFileUploadInfo.wl ",
      { orignalName, originalFileSize },
      true
    );
  }
};
//文件分片上传文件信息取消
export const webUserVideofileUploadCancel = (
  OSSFileName,
  orignalName,
  originalFileSize,
  type = "mp4"
) => {
  if (type == "mp4") {
    return httppost(
      "/webUserVideo/fileUploadCancel.wl",
      { OSSFileName, orignalName, originalFileSize },
      true
    );
  } else {
    return httppost(
      "/audio/fileUploadCancel.wl",
      { OSSFileName, orignalName, originalFileSize },
      true
    );
  }
};
