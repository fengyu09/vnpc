import Vue from 'vue';
let P = {
getHiddenProp(){
  var prefixes = ['webkit','moz','ms','o'];
  if ('hidden' in document) return 'hidden';
  for (var i = 0; i < prefixes.length; i++){
    if ((prefixes[i] + 'Hidden') in document)
      return prefixes[i] + 'Hidden';
  }
  return null;
},
getVisibilityState() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];
  if ('visibilityState' in document) return 'visibilityState';
  for (var i = 0; i < prefixes.length; i++) {
    if ((prefixes[i] + 'VisibilityState') in document)
      return prefixes[i] + 'VisibilityState';
  }
  return null;
},
//判断是否需要加密post提交的数据
checkIsEncrypt(obj,type){
  let r;
  console.log('111',Vue.prototype.$st.state.isEncrypt)
  if(Vue.prototype.$st.state.isEncrypt==1){
    console.log(90)
    //加密
    r = {datas:Vue.prototype.encrypt(obj,type)}
  }else{
    //不加密
    r = obj
  }
  return r;
}

}
export default P;