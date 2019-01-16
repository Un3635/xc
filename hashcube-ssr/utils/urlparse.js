/**
 * Created by admin on 2018/8/7.
 */
const getUrlKey=(name)=>decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
export default getUrlKey;
