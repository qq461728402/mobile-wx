/**
 * Created by dx on 18/4/3.
 */
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
