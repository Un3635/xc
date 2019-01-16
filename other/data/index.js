import { post, get } from "./_http1";

export const getNewsById = ({ id }) =>
  post("/api/article-details", { id }, false);
export const getVideoById = ({ id }) =>
  get("/video/video-details", { id }, false);

export const getDataBaseCoinHot = () =>
  post("/api/coin-hot", { rows: 10000, page: 1 }, false);

export const getDataBaseCoinNotHot = () =>
  post("/api/coin-notHot", { rows: 10000, page: 1 }, false);

export const coinDetail = ({ id }) => post("/api/coin-detail", { id }, false);

export const getArticleItem = obj =>
  post("/api/article-lists", { ...obj }, false);

export const get_news_flash = ({ identityId = 0, rows = 5, page }) =>
  get("/api/news-flash", { identityId, rows, page }, false);

export const getChainMarketList = () =>
  post("/coins/getChainList.open", {}, false);

export const getChainIndexRank = () =>
  post("/coins/diggingChainRank.open", {}, false);
export const getTagArticle = ({ channelId, rows, page, tagId }) => {
  return post(
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
export const getBannerByType = () =>
  get("/api/banner-list", { page: 1, rows: 20 }, false);

export const getArticleMain = () =>
  post("/api/article-main", { rows: 5, page: 1 }, false);

export const getArticles = obj =>
  post("/article/detail.open", { ...obj }, false);

export const articleid_aes = ({ data, type = 0 }) =>
  post("/article/aes", { data, type }, false);

export const article_related = ({ id, rows = 4 }) =>
  post("/api/article-related", { id, rows }, false);

export const seo_channelList = () => get("/api/seo/channelList", {}, false);
export const getlongTailWordsList = () =>
  get("/api/seo/longTailWordsList", {}, false);

export const getArticlesByChanelId = ({ channelId, page = 1, rows = 6 }) =>
  get("/api/seo/getArticlesByChanelId", { channelId, page, rows }, false);

export const getArticleByWordsId = ({ wordsId, rows, page }) =>
  get("/api/seo/getArticleByWordsId", { wordsId, rows, page }, false);
export const seoArticleInfo = id => get("/api/seo/articleInfo", { id }, false);

export const getHomeTdk = () => get("/api/seo/getHomeTdk", {}, false);

export const getChannelList = () => get("/api/channel-list", {}, false);