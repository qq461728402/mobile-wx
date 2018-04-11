/**
 * Created by dx on 18/4/3.
 */
import {getStore} from './storeUtils'
export function dealimg(orImg) {
  var pictureUrl=orImg;
  if (orImg.indexOf('http://')<=-1){
    if(orImg.charAt(0)=='/'){
      pictureUrl=process.env.API+ orImg;
    }else{
      pictureUrl=process.env.API+'/'+orImg;
    }
  }
  pictureUrl+='?jsessionid=5104wv4PPEa9BsIj7HuPRNOJEQ==6081'
  return pictureUrl;
}

export function dealurl(alias,item) {
  var userInfo=JSON.parse(getStore("userInfo")) ;
  var newsurl=process.env.API+ '/Mobile/news_detail.jsp';
  newsurl=newsurl+'?alias='+alias;
  newsurl=newsurl+'&flg=0';
  newsurl=newsurl+'&newsId='+item.news_id;
  newsurl=newsurl+'&schoolid='+userInfo.unit_id;
  newsurl=newsurl+'&loginname='+userInfo.user_loginname;
  newsurl=newsurl+'&userid='+userInfo.old_userid;
  return newsurl;
}
