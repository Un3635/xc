import { httppost, httpget, get } from "./http";

export const getNewsById = id =>
  httppost("/api/article-details", { id }, false);

export const getVideoById = id =>
  httpget("/video/video-details", { id }, false);

export const getNewsByCoinId = (id, rows = 10, page = 1) =>
  httppost("/api/coin-news", { id, rows, page }, false);

export const getNewsRank = (size = 10, rows = 10, page = 1) =>
  httppost("/api/news-rank-list2", { rows, page, size }, false);

  export const getUseranklist = (size = 6) =>
  httppost("/api/user-rank-list", {  size }, false);


export const getCoinDetail = id => httppost("/api/coin-detail", { id }, false);

export const getChannelList = () => httpget("/api/channel-list", {}, false);

export const getLiveNewsColumn = () => httpget("/api/identity-list", {}, false);

export const getLiveNews = (identityId, rows = 5, page = 1) =>
  httpget("/api/news-flash", { identityId, rows, page }, false);

export const hotArticleList = (size = 5) =>
  httppost("/api/hot-article-list", { size }, false);

export const primaryNews = (rows = 20, page = 1) =>
  httpget("/api/banner-list", { rows, page }, false);

export const secondaryNews = (rows = 3, page = 1) =>
  httppost("/api/article-main", { rows, page }, false);

export const adv = ({ type }) => {
  return httppost("/webAdv/adv-list", { type }, false);
};

export const getDataBaseCoinHot = () =>
  httppost("api/coin-hot", { rows: 10000, page: 1 }, false);

export const getDataBaseCoinNotHot = () =>
  httppost("api/coin-notHot", { rows: 10000, page: 1 }, false);

export const getDataBaseDetail = id =>
  httppost("api/coin-detail", { id }, false);

export const getDataBaseDetailNews = id =>
  httppost("/api/coin-news", { id, rows: 3, page: 1 }, false);

export const crawlerCoinDetail = fullName =>
  httppost("api/crawlercoin-detail", { fullName }, false);

export const getMarketInfo = () =>
  httppost("/coins/getCoinIndex.open", {}, false);

export const getTagArticle = (channelId, rows, page, tagId) => {
  return httppost(
    "/api/article-lists",
    {
      channelId,
      rows,
      page,
      tagId
    },
    false
  );
};

export const getAuthorArticle = (userId, rows, page, type, clientType) => {
  return httppost(
    "/api/author-article-lists",
    {
      userId,
      rows,
      page,
      type,
      clientType
    },
    false
  );
};

export const getHandBookFirstList = () =>
  httppost("/handbook/getHandBookList.open", {}, false);

export const getHandBookSecond = id =>
  httppost(
    "/handbook/getHandBookSecond.open",
    {
      handBookSecondId: id
    },
    false
  );

export const homeBanner = (rows = 1, page = 1) =>
  httpget("/api/top-list", { rows, page }, false);

export const thumbAds = (rows = 4, page = 1) =>
  httpget("/api/right-list", { rows, page }, false);

export const getChainIndexRank = () =>
  httppost("/coins/diggingChainRank.open", {}, false);

export const getChainMarketList = () =>
  httppost("/coins/getChainList.open", {}, false);

export const coinMarketInfo = symbol =>
  httppost("/coins/chainIndex.open", { en_name: symbol.toUpperCase() }, false);

export const historyMarketInfo = (
  symbol = "btcusdt",
  period = "1min",
  size = "2000"
) => {
  return httppost(
    "/coins/getHuobiHistoryNew.open",
    { symbol, period, size },
    false
  );
};

export const coinIndexDetail = symbol =>
  httppost(
    "/coins/chainIndexDetail.open",
    { en_name: symbol.toUpperCase() },
    false
  );

export const exchangeRate = () =>
  get("https://btcapp.api.btc.com/v1/exchange-rate", {}).then(res => res.data);

export const seo_channelList = () => httpget("/api/seo/channelList", {}, false);

export const seo_latestArticles = () =>
  httpget("/api/seo/latestArticles", {}, false);

export const getArticlesByChanelId = ({ channelId, page = 1, rows = 6 }) =>
  httpget("/api/seo/getArticlesByChanelId", { channelId, page, rows }, false);

export const getlongTailWordsList = () =>
  httpget("/api/seo/longTailWordsList", {}, false);

export const seoArticleInfo = id =>
  httpget("/api/seo/articleInfo", { id }, false);

export const link_list = () => httpget("/api/link-list", {}, false);

export const getArticleByWordsId = ({ wordsId, rows, page }) =>
  httpget("/api/seo/getArticleByWordsId", { wordsId, rows, page }, false);

export const getHomeTdk = () => httpget("/api/seo/getHomeTdk", {}, false);

export const getNextOrPreArticle = ({ channelId, updatedAt, type }) =>
  httpget(
    "/api/seo/getNextOrPreArticle",
    { channelId, updatedAt, type },
    false
  );

// 学院api
export const xy_guestList = () => httpget("/api/guestList", {}, false);
export const xy_bannerList = () => httpget("/api/bannerList", {}, false);
export const xy_moduleList = () => httpget("/api/moduleList", {}, false);
export const xy_activityList = ({ moduleId, rows, page }) =>
  httpget("/api/activity-list", { moduleId, rows, page }, false);

export const xy_activityMain = ({ moduleType, rows = 4 }) =>
  httpget("/api/activity-main", { moduleType, rows }, false);
export const xy_activityDetail = ({ type, activityId }) =>
  httpget("/api/activity-detail", { type, activityId }, false);
// 学院api

//首页合作伙伴战略合作
export const index_listPartner = () =>
  httpget("/api/seo/listPartner", {}, false);

export const authorMediaList = ({ rows = 10, page, clientType, userId }) =>
  httppost("/api/authorMediaList", { rows, page, clientType, userId }, false);

//获取作者是否被关注
export const ckAuthorFollow = ({
  authorType,
  authorUserId,
  mediaType,
  mediaId
}) =>
  httppost(
    "/follow/ckAuthorFollow.open",
    { authorType, authorUserId, mediaType, mediaId },
    true
  );

//获取推荐作者关注列表
export const getRecommendList = () =>
  httppost("/follow/getRecommendList.open", { limit: 9 }, true);
//获取推荐作者关注列表
export const getRecommendList1 = () =>
  httppost("/follow/getRecommendList.open", { limit: 9 }, false);

//挖矿计算机 参考数据
export const calculator_getDefaultData = coinName =>
  httpget("/calculator/getDefaultData.open", { coinName }, false);

//挖矿计算机 参考数据
export const calculator_getEarningsByCoinName = obj =>
  httppost("/calculator/getEarningsByCoinName.open", { ...obj }, false);

//前台用户订阅的作者文章列表
export const followAuthorMediaList = ({ rows, page }) =>
  httppost("/api/followAuthorMediaList", { rows, page }, true);

//挖链网与资讯模块包含的最新文章，按时间倒叙排列30天内文章
export const webMapLatestArticles = () =>
  httppost("/api/webMap/latestArticles.open", {}, false);

//推荐文章 24小时资讯站文章
export const seorecommendArticles = () =>
  httppost(
    "/api/seo/recommendArticles.open",
    { pageSize: 10, pageNum: 1 },
    false
  );

//查询咨询中心广告右侧一张图
export const seogetAdvert = () => httpget("/api/seo/getAdvert", {}, false);

//挖力场
export const webUserTaskListByWeb = () => {
  return httppost("/task/getUserTaskListByWeb.wl", {}, true);
};
export const webUserWlCenter = () => {
  return httppost("/integral/webUserWlCenter.open", {}, false);
};
export const webUserWlCenterlong = () => {
  return httppost("/integral/webUserWlCenterByLogin.wl", {}, true);
};
export const webwlLevel = () => {
  return httppost("/integral/wlLevel.wl", {}, true);
};
export const webUserTaskListByWeblong = () => {
  return httppost("/task/getUserTaskListTByWebNoLogin.open", {}, false);
};
export const webwlLevellong = () => {
  return httppost("/integral/wlLevelNoLogin.open", {}, false);
};

//获取热门评论,最新评论,分页查询
export const getCommentList = ({
  sourceType = 2,
  mediaId,
  commentType,
  page = 1,
  pageSize = 99999
}) =>{
  return httppost(
    "/userComment/getWebCommentList.open",
    { sourceType, mediaId, commentType, page, pageSize },
    false
  ).then(data=>{

    data.pageInfo.list.forEach(i => {
      i.showall = false;
    });

    return data;
  })
}


//获取热门评论,最新评论,分页查询(带token)
export const getCommentList1 = ({
  sourceType = 2,
  mediaId,
  commentType,
  page = 1,
  pageSize = 99999
}) =>{
  return httppost(
    "/userComment/getWebCommentList.open",
    { sourceType, mediaId, commentType, page, pageSize },
    true
  ).then(data=>{

    data.pageInfo.list.forEach(i => {
      i.showall = false;
    });

    return data;
  })
}


//添加评论,关注作者
export const addComment = ({
  sourceType = 2,
  mediaId,
  content,
  authorUserId
}) =>
  httppost(
    "/userComment/addComment.wl",
    {
      sourceType,
      mediaId,
      content,
      authorUserId
    },
    true
  );

//回复评论
export const replyComment = ({ commentId, replyId, content }) =>
  httppost(
    "/userComment/replyComment.wl",
    {
      commentId,
      replyId,
      content
    },
    true
  );

//评论举报
export const userCommentReport = ({ commentId, replyId }) =>
  httppost(
    "/userComment/report.wl",
    {
      commentId,
      replyId
    },
    true
  );

//用户点赞
export const userCommentuserLikeNum = ({ commentId, replyId }) =>
  httppost(
    "/userComment/userLikeNum.wl",
    {
      commentId,
      replyId
    },
    true
  );

///评论删除
export const userCommentdelComment = ({ commentId, replyId }) =>
  httppost(
    "/userComment/delComment.wl",
    {
      commentId,
      replyId
    },
    true
  );

///得到用户WT,判断是否可以评论
export const userCommentgetUserWt = () =>
  httppost("/userComment/getUserWt.wl", {}, true);

export const authorRankingList = ({ rankingType }) =>
  httppost("/authorRanking/authorRankingList.open", { rankingType }, false);

///用户是否收藏
export const collecthasCollect = ({ collectType = 1, uniteId }) =>
  httppost(
    "/collect/hasWebCollect.wl",
    {
      collectType,
      uniteId
    },
    true
  );
///用户收藏操作
export const collectupdateCollect = ({ collectType = 1, uniteId }) =>
  httppost(
    "/collect/updateWebCollect.wl",
    {
      collectType,
      uniteId
    },
    true
  );

export const userRamkings = () => httpget("/interaction/hasMsg.wl", {}, true);

//挖链专栏
export const getWebColumnsList = () => httppost("/webColumn/getWebColumnsList.open", {}, false);
export const getMoreColumn = (childSize = 3) => httppost("/webColumn/getMoreColumn.open", { childSize }, false);
export const getWebColumnsDetail = ({columnId,pageNum}) => httppost("/webColumn/getWebColumnsDetail.open", { columnId,pageNum }, false);

//检测闪讯
export const refreshnewsflash = () => httpget("/api/refresh-news-flash", {}, false);

//热门作者
export const getHotAuthorList = () => httppost("/webAuthorRanking/hotAuthorList.open", {}, false);
//当前入驻作家数量
export const totalAuthorCount = () => httppost("/webAllAuthor/totalAuthorCount.open", {}, false);
//作者专区
export const newestArticleList = (pageNum) => httppost("/webAllAuthor/newestArticleList.open", {pageNum}, false);
//新人推荐
export const recommendedAuthorList = () => httppost("/webAllAuthor/recommendedAuthorList.open", {}, false);
//所有作者列表
export const selectedAuthorList = ({nickName="",pageNum=1}) => httppost("/webAllAuthor/selectedAuthorList.open", {nickName,pageNum}, false);
export const selectedAuthorList1 = ({nickName="",pageNum=1}) => httppost("/webAllAuthor/selectedAuthorList.open", {nickName,pageNum}, true);
