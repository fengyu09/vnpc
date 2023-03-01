import Vue from 'vue'
// import {Locale} from 'element-ui'
import Locale from 'element-ui/lib/locale'
import store from "../store/index";
import VueI18n from 'vue-i18n'

// 自定义的
import Chinese from './cn'
import English from './en'
// import HongKong from './tc'
import Vietnam from './vi'
import Thai from './th'
// import Indonesia from './id'
// import Malaysia from './ms'
// import India from './ind'

// element
import viVN from 'element-ui/lib/locale/lang/vi'//越南
import thTH from 'element-ui/lib/locale/lang/th'//泰语
import enUS from 'element-ui/lib/locale/lang/en'//英文
import zhCN from 'element-ui/lib/locale/lang/zh-CN'


// import viVN from './vi-VN'
// import thTH from './th-TH'
// import idID from './id-ID'
// import msMY from './ms-MY'
// import indIN from './ind-IN'

//开发环境设置默认语言，编译时请去除
//const Language = 开发环境到 config/env.development.js 更改
// import { baseApi,language } from '@/config'

/*初始化 element 多语言*/
// const lang = localStorage['Language'] || (Language || language)
const lang = localStorage['Language'] || 'vi-vn'
console.log(lang);
let locale = 'en'
switch(lang){
  case 'th':
    Locale.use(thTH)
    break;
  case 'en':
    Locale.use( enUS)
    break;
  case 'vi-vn':
    Locale.use(viVN)
    break;
  case 'zh-cn':
    Locale.use(zhCN)
    break;
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: locale,
  messages: {
    "en": English,
    "vi-vn": Vietnam,
    "th": Thai,
    "zh-cn":Chinese
  }
})

/*切換*/
export function SetLanguage (lang) {
  i18n.locale = lang;
  console.log(lang)
  switch(lang){
    case 'th':
      localStorage['Language'] = 'th';
      store.commit('SETDEFAULTLAN','th')
      store.commit('SETLANDCODE',4);
      Locale.use(thTH);
      break;
    case 'en':
      localStorage['Language'] = 'en';
      store.commit('SETDEFAULTLAN','en')
      store.commit('SETLANDCODE',5);
      Locale.use(enUS);
      break;
    case 'vi-vn':
      localStorage['Language'] = 'vi-vn';
      store.commit('SETDEFAULTLAN','vi-vn')
      store.commit('SETLANDCODE',1);
      Locale.use(viVN);
      break;
    case 'zh-cn':
      localStorage['Language'] = 'zh-cn';
      store.commit('SETDEFAULTLAN','zh-cn')
      store.commit('SETLANDCODE',1);
      Locale.use(zhCN);
      break;
   
  }
}
export default i18n
