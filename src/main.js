import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import axios from "../node_modules/axios";
import "fetch-detector";
import "fetch-ie8";
import "element-ui/lib/theme-chalk/index.css";
import VideoPlayer from "vue-video-player";
import "videojs-flash";
import VueKonva from "vue-konva";
import CryptoJS from "crypto-js";
import "videojs-contrib-hls";
window.videojs = require("video.js");
import videojss from "video.js";
require("video.js/dist/lang/zh-CN");
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VueKonva);
Vue.use(VideoPlayer);
Vue.prototype.$video = videojss;

import Tool from "./assets/js/tool";
// Vue.use(Tool)
Vue.prototype.globalPpproach = Tool;

//公共样式
import "./assets/css/common.css";
import filters from "./filters/fliters.js";

//充值组件
import Recharge from "./components/recharge.vue";
Vue.component("Recharge", Recharge);

//提现组件
import Tx from "./components/tx.vue";
Vue.component("Tx", Tx);

//兑换组件
import Excharge from "./components/excharge.vue";
Vue.component("Excharge", Excharge);

import clipboard from "clipboard";
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

//规则算法
for (let k in filters) {
  Vue.filter(k, filters[k]);
}

import i18n, { SetLanguage } from "./i18n/index";



import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Autocomplete,
  Checkbox,
  CheckboxGroup,
  Switch,

  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,

  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  // Tree,
  Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  Upload,
  Progress,
  // Badge,
  // Card,
  // Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  // Collapse,
  // CollapseItem,
  Cascader,
  // ColorPicker,
  // Transfer,
  Container,
  // Header,
  Image,
  Aside,
  Main,
  // Footer,
  Loading,
  MessageBox,
  Message,
  // Notification,
  Scrollbar, //滚动条
  Backtop,
  infiniteScroll,
} from "element-ui";

import { message } from "./assets/js/resetMessage";

Vue.use(Scrollbar); //滚动条
// Vue.use(Pagination)
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Pagination);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Image);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
// Vue.use(Tree)
Vue.use(Alert);
// Vue.use(Slider)
Vue.use(Autocomplete)
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);

Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.use(Cascader);
Vue.use(Container);
// Vue.use(Header)
Vue.use(Aside);
Vue.use(Main);
Vue.use(Backtop);
Vue.use(infiniteScroll);
// Vue.use(Footer)

Vue.use(Loading.directive);
Vue.prototype.$SetLanguage = SetLanguage;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$msgbox = message
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt
// Vue.prototype.$notify = Notification
Vue.prototype.$message = message;

import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
  error: require("./static/site/imgs/load.png"),
  loading: require("./static/site/imgs/load.png"),
});

import { alertComfirm, alertyc } from "./assets/js/public";
Vue.prototype.$st = store;
Vue.prototype.$ro = router;
Vue.prototype.$http = axios;
Vue.prototype.$SetLanguage = SetLanguage;
Vue.config.productionTip = false;
Vue.prototype.versionLive = "/api/v1_1/"; //直播api
Vue.prototype.versionLive2 = "/api/v2/"; //直播api2





//请求次数
Vue.prototype.$http.defaults.retry = 3;
//请求间隙
Vue.prototype.$http.defaults.retryDelay = 2000;
//超时时间
Vue.prototype.$http.defaults.timeout = 30000;
//请求头 个人中心那边
Vue.prototype.$http.defaults.headers["Authorization"] =
  "Bearer " + store.state.codeToken;
//请求头 直播那边
Vue.prototype.$http.defaults.headers["token"] = store.state.codeToken;

Vue.prototype.$http.defaults.config = axios.CancelToken;


let reMethod = "";
//请求拦截
Vue.prototype.$http.interceptors.request.use((request) => {
  reMethod = request.method;
  // console.log(898989,localStorage.getItem('Language'))
  if (request.method == "get") {
    // console.log(909090,store.state.defalutLan)
    //添加时间戳
    request.params = {
      t: Date.now(),
      code: store.state.defalutLan,
      ...request.params,
    };
  } else if (request.method == "post") {
    let data = request.data;
    if(request.url.indexOf('nodeapi')>-1){
      (request.data = {
        ispc:true, //追加的参数
        ...data, //拼接参数
    })
    }
    else{
      (request.data = {
        code: store.state.defalutLan, //追加的参数
        ...data, //拼接参数
      }),
        (request.params = {
          code: store.state.defalutLan,
          ...request.params, //拼接参数
        });
    }
    
      
  }
 
  return request;
});



// Vue.prototype.noticeTypes = 2; //代理请求
Vue.prototype.noticeTypes = 1; //官方请求

//不需要
// Vue.prototype.defalutLan = 'vi-vn'; //默认语言 越南
// Vue.prototype.defalutLan = 'en'; //默认语言 英文
// Vue.prototype.lanCode = 5; //什么版本 2 66w.vip英文版本  1 越南文版本  3中文版本  4 泰文版本 5 k188英文


var ECBOptions = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7,
  iv: "",
};
// let key = CryptoJS.enc.Utf8.parse("216f22c3fd9c5596"); //对内测试
// let key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
// let key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
let key = CryptoJS.enc.Utf8.parse('e7df4a1a61d61204');//k188.bet 生产环境
// let key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南恭喜发财生产环境 

// 加密
Vue.prototype.encrypt = function(data, type) {
  //console.log(this.$store.state.userinfo.user_id)
  if (this.$st.state.decipher_str && this.$st.state.codeToken && !type) {
    key = CryptoJS.enc.Utf8.parse(this.$st.state.decipher_str);
  } else {
    // key = CryptoJS.enc.Utf8.parse("216f22c3fd9c5596"); //对内测试
    // key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
  //  key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
     key = CryptoJS.enc.Utf8.parse('e7df4a1a61d61204');//k188.bet生产环境?
    // key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南恭喜发财生产环境 
  }
  if (typeof data == "object") {
    data.timestamp = new Date()
      .getTime()
      .toString()
      .substring(0, 10);
  }
  let scrs = JSON.stringify(data);
  let encrypted = CryptoJS.AES.encrypt(scrs, key, ECBOptions);
  var Base64Text = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  const base64Cipher = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  return base64Cipher;
};
// 解密
Vue.prototype.decrypt = function(data, type) {
  if (this.$st.state.decipher_str && this.$st.state.userinfo.user_id && !type) {
    key = CryptoJS.enc.Utf8.parse(this.$st.state.decipher_str);
  } else {
    // key = CryptoJS.enc.Utf8.parse("216f22c3fd9c5596"); //对内测试
    // key = CryptoJS.enc.Utf8.parse("840592fcfa63fc31"); //kk199.cc对外yn演示网站
    //  key = CryptoJS.enc.Utf8.parse("242252c8ae41468b"); //66w.vip英文版测试
    key = CryptoJS.enc.Utf8.parse('e7df4a1a61d61204');//k188.bet生产环境
    // key = CryptoJS.enc.Utf8.parse("af98cc17e5389df9"); //kiss588.com越南恭喜发财生产环境 
  }
  var bytes = CryptoJS.AES.decrypt(data, key, ECBOptions);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

function noLogin() {
  //     //请求头 
  Vue.prototype.$http.defaults.headers["token"] = "";
  store.commit("SETUSERTOKEN", "");
  store.commit("SETUSERINFO", "");
  store.commit("SETUSERNAME", "");
  store.commit("SETSAFEPWD", "");
  store.commit("SETPIC", "");
  store.commit("SETUSER_TYPE", "");
  store.commit("SETDIAMOND", "");
  store.commit("SETBALANCE", "");
  store.commit("SETFOCUS", "");
}
//响应拦截
let len = 0;
Vue.prototype.$http.interceptors.response.use(
  (response) => {
    if (response.status != 200) {
      return Promise.resolve();
    } else {
      if(response.config.url.indexOf('user/balance')>-1){
        let pdata=response.data.data
        pdata.name=store.state.userinfo.username
        pdata.id=store.state.userinfo.id
        axios.post('/nodeapi/setuser/',pdata).then(res=>{
        //  console.log(res)
        })
        if(localStorage.getItem('isLogin')=='true'){
          noLogin()
        }
       }
      return response;

    }
  },
  (error) => {
    //请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      var config = error.config;
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount >= config.retry) {
       if(store.state.lanCode==1){
        Vue.prototype.$message({
          message: "Hết thời gian chờ, vui lòng làm mới và thử lại",
          type: "warning",
        });
       }else if(store.state.lanCode==2||store.state.lanCode==5){
        Vue.prototype.$message({
          message: "Timeout, please refresh and try again",
          type: "warning",
        });
       }
        
        return Promise.reject(error);
      }

      // Increase the retry count
      config.__retryCount += 1;

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          ////console.log('resolve');
          resolve();
        }, config.retryDelay || 1);
      });

      return backoff.then(function() {
        return axios(config);
      });
    } else if (error.response && error.response.status) {
      switch (
        error.response.status //根据状态码提示对应消息
      ) {
        case 401:
          //lanCode==1
          if(store.state.lanCode==1){
            alertComfirm(
              {
                msg:
                  '<p style="font-size: 16px;padding-bottom: .2rem;padding-top: .2rem;color: #333;font-weight: 500">Tài khoản của bạn đã được đăng nhập trên một thiết bị khác</p><p style="font-size: 16px;padding-bottom: .2rem;color: #333;font-weight: 500">Nếu bạn không phải là bạn, vui lòng liên hệ với bộ phận chăm sóc khách hàng</p>',
              },
              function() {
                noLogin();
                window.location.href = "/";
                store.commit("SETLOGIN", true);
              },
              function() {
                noLogin();
                window.location.href = "/";
                store.commit("SETLOGIN", true);
              }
            );
          }else if(store.state.lanCode==2||store.state.lanCode==5){
            alertComfirm(
              {
                msg:
                  '<p style="font-size: 16px;padding-bottom: .2rem;padding-top: .2rem;color: #333;font-weight: 500">Your account is already logged in on another device</p><p style="font-size: 16px;padding-bottom: .2rem;color: #333;font-weight: 500">If you are not, please contact customer service</p>',
              },
              function() {
                noLogin();
                window.location.href = "/";
                store.commit("SETLOGIN", true);
              },
              function() {
                noLogin();
                window.location.href = "/";
                store.commit("SETLOGIN", true);
              }
            );
          }
         break;
        case 404:
          
          break;
        case 500:
          if(store.state.lanCode==1){
            Vue.prototype.$message({
              message: "Máy chủ đang bận, vui lòng thử lại sau",
              type: "warning",
            });
          }else  if(store.state.lanCode==2||store.state.lanCode==5){
            Vue.prototype.$message({
              message: "Server is busy, please try again later",
              type: "warning",
            });
          }
         
          break;
        case 504:
          if(store.state.lanCode==1){
            Vue.prototype.$message({
              message: "Hết thời gian chờ, vui lòng làm mới và thử lại",
              type: "warning",
            });
          }else  if(store.state.lanCode==2||store.state.lanCode==5){
            Vue.prototype.$message({
              message: "Timeout, please refresh and try again",
              type: "warning",
            });
          }
          
          break;
        default:
      }
    } else {

      return Promise.resolve();
    }
  }
);

router.beforeEach((to, from, next) => {
  store.commit("clearToken");
  let token = window.localStorage.getItem("codeToken");
  if (to.meta.requireAuth) {
    if (token) {
      if (to.meta.requireVirtual) {
        //console.log('没有访问权限');
      } else {
        next();
      }
    } else {
      store.commit("SETLOGIN", true);
      next({
        path: "/index",
        query: { redirect: to.fullPath },
      });
    }
  } else {

    store.commit("SETROUTER", to.path);
    next();
  }
});

new Vue({
  store,
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
