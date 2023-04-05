<template>
  <div id="app">
    <Header v-if="isShow" />
    <!-- 路由 -->
    <div class="pt9">
      <router-view :key="keysV"></router-view>
    </div>
    <!-- 聊天室入口 -->
    <div class="chat-room" @click="isShowChat">
      <img v-if="skin==0" src="../src/assets/imgaes/chat_icon.png" alt="">
      <img v-if="skin==1" src="../src/assets/imgaes/skin/pink/chat_icon.png" alt="">
      <img v-if="skin==2" src="../src/assets/imgaes/skin/blue/chat_icon.png" alt="">
      <img v-if="skin==3" src="../src/assets/imgaes/skin/green/chat_icon.png" alt="">
    </div>

    <div class="code-box" id="code">
      <img src="./assets/imgaes/main/nav-code.png" alt />
    </div>
   
    <!--登录弹框公告  -->
    <div class="notice-box" v-if="noticeShow2 && $store.state.codeToken && noticeData.length">
      <div class="notice">
        <div class="notice-close" @click="hideNotice">
          <img src="./assets/imgaes/notice_close.png" alt="" srcset="" />
        </div>
        <div class="title">
          <img
            v-if="noticeTypes == 1&&skin==0"
            src="./assets/imgaes/notice_titlebg.png"
            style="width: 100%"
          />
          <img
            v-if="noticeTypes == 1&&skin==1"
            src="./assets/imgaes/notice_titlebg-pink.png"
            style="width: 100%"
          />
          <img
            v-if="noticeTypes == 1&&skin==2"
            src="./assets/imgaes/notice_titlebg-blue.png"
            style="width: 100%"
          />
          <img
            v-if="noticeTypes == 1&&skin==3"
            src="./assets/imgaes/notice_titlebg-green.png"
            style="width: 100%"
          />
         
          <img v-if="noticeTypes == 2&&skin==0" style="width: 100%" src="./assets/imgaes/notice_titlebg.png" >
          <img v-if="noticeTypes == 2&&skin==1" style="width: 100%" src="./assets/imgaes/notice_titlebg-pink.png" >
          <img v-if="noticeTypes == 2&&skin==2" style="width: 100%" src="./assets/imgaes/notice_titlebg-blue.png" >
          <img v-if="noticeTypes == 2&&skin==3" style="width: 100%" src="./assets/imgaes/notice_titlebg-green.png" >
          <span class="notice-title" v-if="noticeTypes == 2" >{{$t('dlTitle')}}</span>
          <span class="notice-title" v-if="noticeTypes == 1">{{$t('gfTitle')}}</span>
        </div>
        <div class="notice-content" :class="[{'notice-content-pink':skin==1},{'notice-content-blue':skin==2},{'notice-content-green':skin==3}]">
          <div class="notice-menu">
            <ul>
              <li
                :class="{ active: menuActive == index }"
                v-for="(item, index) in noticeData"
                :key="index"
                @click="menuActive = index"
              >
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
          <div class="notice-text">
            <el-scrollbar style="height: 400px">
              <div
                class="content-text"
                :key="index"
                v-for="(item, index) in noticeData[menuActive].data"
              >
                <h2 style="margin: 16px 0">{{ item.title }}</h2>
                <div v-html="item.content"></div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
   
   
    <Footer v-if="isShow && footerShow" />
    <LeftNav />
    <newLogin v-if="showLogin"></newLogin>
    <!-- 聊天室 -->
     <chatRoom v-if="chatShow"  />
     <whPage :msgText="msgText" v-if="showWh" />
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import LeftNav from "./components/leftNav.vue";
import newLogin from "./views/login/newLogin.vue";
import chatRoom from "./views/Lottery/chatRoom.vue";
import tyPop from "./components/popTY.vue";
import whPage from "./components/wh.vue";
import { mapState, mapMutations } from "vuex";
import {
  removeAllactive,
  alertComfirm,
} from "./assets/js/public";
export default {
  name: "app",
  data() {
    return {
      isShow: true,
      isNav: true,
      isNav1: true,
      isLeftNav: false,
      footerShow: true,
      isPoptyShow: false,
      lineList: [
      
      ],
      top: false, //返回顶部
      socketData: "",
      ServerPushType: null,
      socketSetInterval: "",
      lotteryMsg: "",
      nickName: "",
      kefuUrL: "",
      rightLink: {},
      pthdShow: false,
      ptImg: "",
      isShowAd: false,
      count: 4,
      noticeData:[],
      menuActive: 0,
      noticeShow: false,
      btnLoading: false,
      quesList: [],
      LanList: [],
      currLan: "",
      selectQues: [],
      tel: "",
      isShowCallTel: false,
      isCJ: false, //彩金
      zcGif: false,
      zcLQ: false,
      zcRend: true,
      selectIndex: false,
      showZC: false,
      platformMsg: "",
      notice: [],
      memberAccount: "",
      websock: null,
      showWh:false,
      hbInterval:null,
      msgText:''
      // lineList1:[]
    };
  },

  components: { Header, Footer, LeftNav, newLogin, tyPop,chatRoom,whPage},

  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },

  created() {
    this.loginType()
    clearInterval(this.hbInterval)
    this.hbInterval=setInterval(() => {
      if(this.userinfo.user_id){this.loginType()}
    },240000);
    this.getWhStatus()
    if(this.skin){
        this.SETSKINDATA(this.skin);
    }else{
        this.SETSKINDATA(0);
    }
    if (this.$route.query.c && this.$route.query.c != "undefined"){
       localStorage.setItem("c", this.$route.query.c);
       if(this.$store.state.codeToken){
         return
       }
       this.SETLOGIN(true);
       this.SETISLOGIN(false);
    }
     
    this.convert();
    this.checkRouter();
    this.noLogin();
    this.initWebSocket();

    this.getLanConfig();

    
  },
  computed: {
    ...mapState([
      "routerArr",
      "routerIndex",
      "customer",
      "isPure",
      "zcGifShow",
      "webInitData",
      "UserId",
      "showLogin",
      "userinfo",
      "noticeShow2",
      "skin",
      "chatShow"
    ]),
    keysV() {
      return this.$route.path + Math.random();
    },
  },
  mounted() {
    // this.showWh=window.isshowwh
    // //console.log(this.$store.state.userinfo.user_id)
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = this.routerArr[this.routerArr.length - 2];
        
        if (this.$route.path != window.location.hash.slice(1)) {
          if (!currentPath) {
            this.$router.push(window.location.hash.slice(1));
          } else {
            this.$router.push(currentPath);
            this.SETROUTER(false);
          }
        }
      },
      false
    );
    window.addEventListener("scroll", this.scrollToTop);
    if (this.socketSetInterval) {
      clearInterval(this.socketSetInterval);
    }
    let _this = this;
  
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath);
        }
      },
      false
    );
  },
  methods: {
    ...mapMutations([
      "SETISLOGIN",
      "SETLOGIN",
      "SETROUTER",
      "SETPURE",
      "SETOPENPURE",
      "SETOPENPURE2",
      "SETOPENNUM",
      "SETCLOSEDATA",
      "SETRIGHTLINK",
      "SETPTGG",
      "SETZCGIF",
      "SETCLPK",
      "SETXLLINKS",
      "SETNOTICE",
      "SETENCRYPT",
      "SETCHECKCAPTCHA",
      "SETCURRLAN",
      "SETSKINDATA",
      "SETCHAT",
      "SETLANLIST"
    ]),
    isShowChat(){
      // if()
      if(!this.$store.state.codeToken){
         return  alertComfirm({ msg:this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
       }
        if (this.$store.state.userinfo.user_id < 0) {
          return alertComfirm({
            msg:this.$t('home.tkText[5]'),
            title:this.$t('home.tkText[6]'),
            conBtText: this.$t('home.tkText[7]'),
            cancelButtonText: this.$t('home.tkText[8]'),
            showCancelButton:true,
          },()=>{
            this.goRegister();
          },()=>{});
        }
      this.SETCHAT(!this.chatShow)
    },
    // 获取全局配置 语言 和 是否加密
    async getLanConfig() {
      let r = await this.$http.get("/api/common/config");
      this.SETENCRYPT(r.data.data.is_encrypt);
      this.SETCHECKCAPTCHA(r.data.data.check_captcha);
      this.SETCURRLAN(r.data.data.current_lang);
      //多语言测试
      // console.lg(88888,localStorage.getItem('Language'))
      this.$SetLanguage(this.$store.state.defalutLan||r.data.data.current_lang);
      //多语言列表
      this.SETLANLIST(r.data.data.languages||[])
      
      if (this.noticeTypes == 1) {
        //右侧官方导航链接
        this.getGfLink();
        this.getXtNotice();
        this.getNotice();
      } else {
        //右侧代理导航链接
        this.getDlLink();
        this.getDlXtNotice();
        this.getSystemNoticeDl();
      }
    

      this.getXsType();
    },
    getWhStatus(){
      this.$http.get('/nodeapi/whstatus/?sid=1').then(res=>{
      this.showWh=res.data.data.iswh
      this.msgText=res.data.data.whText
      if(this.showWh){
        return
      }
  })
    },
    loginType(){
      this.$http.get('/nodeapi/settinglist',{
                params: {
                    username:this.userinfo.username,
                }
            }).then(res=>{
              console.log(res)
          if(res.data.data.length==1){
            localStorage.setItem('isLogin',res.data.data[0].status)
          }
    })
    },
    hideNotice() {
      this.SETNOTICE(false);
      this.$forceUpdate();
    },
    async getNotice() {
      let res = await this.$http.get("/api/live/sport/system_notice/");
      if (res && res.data.code == 1) {
        this.notice = res.data.data || [];
      }
    },
    async getSystemNoticeDl() {
      let res = await this.$http.get("/api/live/sport/system_notice_dl/");
      if (res && res.data.code == 1) {
        this.notice = res.data.data || [];
      }
    },
    //获取系统公告
    async getXtNotice() {
      let res = await this.$http.get("/api/live/sport/get_pop_notice");
      if (res && res.data.code == 1) {
        this.noticeData =  res.data.data || [];
        this.noticeShow = true;
      }
    },
    //获取代理系统公告
    async getDlXtNotice() {
      let res = await this.$http.get("/api/live/sport/get_pop_notice_dl");
      if (res && res.data.code == 1) {
        this.noticeData = res.data.data || [];
        this.noticeShow = true;
      }
    },
    async getXsType() {
      if (localStorage.getItem("isSetType")) return;
      let res = await this.$http.get("/api/common/get_h5_version", {
        params: {
          host: location.host,
          // host:'lg202.com'
        },
      });
      if (res.data.data != null && res.data.code == 1) {
        if (res.data.data.default == 2) {
          this.SETPURE(1); //控制显示哪个版本 纯净版
          if (this.$route.name == "home") {
            this.$router.push("/game");
          }
        } else {
          this.SETPURE(0); //控制显示哪个版本 直播版
        }
        this.SETOPENPURE(res.data.data.isshow); //控制悬浮按钮是否显示
        this.SETOPENPURE2(res.data.data.isshow); //控制悬浮按钮是否显示
        localStorage.setItem("isSetType", true);
      } else {
        this.SETOPENPURE(1);
        this.SETOPENPURE2(1);
        // this.SETPURE(0)//测试用 一会要去掉
        localStorage.setItem("isSetType", true);
      }
    },
    changeLan(e, v) {
      let curr = e.currentTarget;
      removeAllactive(document.querySelectorAll(".lan-tiem span"));
      curr.classList.add("active");
      this.currLan = v.id;
    },
    selectQuesType(e, id) {
      let curr = e.currentTarget;
      if (curr.className.indexOf("active") > -1) {
        curr.classList.remove("active");
        //删掉id
        let i = this.selectQues.findIndex((v) => {
          return v == id;
        });
        this.selectQues.splice(i, 1);
      } else {
        curr.classList.add("active");
        this.selectQues.push(id);
      }
    },
   
  
    async getGfLink() {
      let res = await this.$http.get("/api/common/get_datas");
      if (res && res.data.code == 1) {
        this.rightLink = res.data.data;
        this.SETRIGHTLINK(res.data.data);
        this.ptImg = res.data.data.pop_img.image_url;
        for (let i = 0, len = this.rightLink.line.length; i < len; i++) {
          this.lineList.push({
            url: this.rightLink.line[i],
            tit: this.$t('home.leftNav1[1]') + (i + 1),
            speed: 50,
          });
        }
      
        this.SETXLLINKS(this.lineList);
        
      }
    },
    async getDlLink() {
      let res = await this.$http.get("/api/common/get_datas_dl");
      if (res && res.data.code == 1) {
        this.rightLink = res.data.data;
        this.ptImg = res.data.data.pop_img.image_url;
        this.SETRIGHTLINK(res.data.data);
        for (let i = 0, len = this.rightLink.line.length; i < len; i++) {
          this.lineList.push({
            url: this.rightLink.line[i],
            tit: this.$t('home.leftNav1[1]') + (i + 1),
            speed: 50,
          });
        }
        
        this.SETXLLINKS(this.lineList);
        
      }
    },

    navHide() {
      this.isNav = !this.isNav;
    },
    navHideLeft() {
      this.isNav1 = !this.isNav1;
    },
    closePthd() {
      this.isShowAd = false;
    },
    convert() {
      var ua = window.navigator.userAgent;
      var isIE =
        ua.indexOf("compatible") > -1 &&
        userAgent.indexOf("MSIE") > -1 &&
        !isOpera; //判断是否IE浏览器
      var isEdge = ua.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
      var msie = ua.indexOf("MSIE ");
      if (msie > 0) {
        // IE 10 or older => return version number

        return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
      }

      var trident = ua.indexOf("Trident/");
      if (trident > 0) {
        // IE 11 => return version number

        var rv = ua.indexOf("rv:");
        return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
      }

      var edge = ua.indexOf("Edge/");
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
      }
    },
    checkRouter() {
      if (
        this.$route.name == "rechargePage"
      ) {
        this.isShow = false;
        this.footerShow = false;
       
      }
    },
    noLogin() {
      if (localStorage.getItem("codeToken") && !this.isShow) {
        this.$router.push("/");
      }
    },
    codeShow() {
      let code = document.querySelector("#code");
      code.style.display = "block";
      let pingBox = document.querySelector(".line-list");
      pingBox.style.display = "none";
    },
    codeHide() {
      let code = document.querySelector("#code");
      code.style.display = "none";
    },
    relationShow() {
      let code = document.querySelector("#relation");
      code.style.display = "block";
      let pingBox = document.querySelector(".line-list");
      pingBox.style.display = "none";
    },
    relationHide() {
      let code = document.querySelector("#relation");
      code.style.display = "none";
    },
    relationShowJMDL() {
      let code = document.querySelector("#relationJMDL");
      code.style.display = "block";
      let pingBox = document.querySelector(".line-list");
      pingBox.style.display = "none";
    },
    relationHideJMDL() {
      let code = document.querySelector("#relationJMDL");
      code.style.display = "none";
    },
    pingShow() {
      let code = document.querySelector(".line-list");
      code.style.display = "block";
    },
    pingHide() {
      let code = document.querySelector(".line-list");
      code.style.display = "none";
      
    },
    ping(url, i) {
      var responseTime, requestTime, ping;
      requestTime = new Date().getTime();
      this.$http.get(url).then((res) => {
        responseTime = new Date().getTime();
        // //console.log(responseTime);
        ping = Math.abs(requestTime - responseTime);
        // //console.log(ping);
        this.lineList[i].speed = ping;
      });
    },
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 200) {
        this.top = true;
      } else {
        this.top = false;
      }
    },
    //返回顶部
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    initWebSocket() {

        let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
      this.websock = new WebSocket(wsServer);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage: function (e) {
      let socketData = JSON.parse(e.data);
      if (socketData.type == "connected") {
        this.socketData = JSON.parse(e.data);
        let loginData = {
          type: "login",
          client_id: this.socketData.client_id,
          user_id: this.$store.state.userinfo.user_id
            ? this.$store.state.userinfo.user_id
            : 0,
          client_type: "WEB",
        };
        this.websocketsend(JSON.stringify(loginData));
      }
      if (socketData.type == "server_push") {
        //中奖提示
        if (socketData.msg_type == "prize_reminder") {
          this.SETOPENNUM(socketData.data.msg_id);
          this.ServerPushType = false;
          this.lotteryMsg = socketData.msg;
          this.$message({
            message: this.lotteryMsg,
            duration: 5000,
          });
        }
      //  推广申请提示
        if (socketData.msg_type == "market_reminder") {
          let isSuccessDate = {
            type: "confirm",
            event: "pop_result_push",
            client_id: this.socketData.client_id,
            user_id: this.$store.state.userinfo.user_id,
            msg_id: socketData.data.msg_id,
          };
          if (socketData.code == 1) {
              alertComfirm({ msg:socketData.data.msg,title:this.$t('app.text[0]'),conBtText:this.$t('qdText') }, () => {
                 this.websocketsend(JSON.stringify(isSuccessDate));
              });
           
          } else {
             alertComfirm({ msg:socketData.data.msg,title:this.$t('app.text[1]'),conBtText:this.$t('app.text[2]'),showCancelButton:true }, () => {
                 this.websocketsend(JSON.stringify(isSuccessDate));
                 window.open(localStorage.getItem("customer"));
              },()=>{
                this.websocketsend(JSON.stringify(isSuccessDate));
                
              });

           
          }

        
        }
      
      }

      if (socketData.type == "ping") {
        let pingData = { type: "pong" };
        this.websocketsend(JSON.stringify(pingData));
      }
    },
    websocketonopen(e) {
      // //console.log(e)
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketonerror() {
      //console.log('连接建立失败')
    },
    websocketclose() {
      //console.log('连接关闭')
    },
    showZCGif() {
      this.zcGif = true;
      this.zcRend = false;
      let gif = setTimeout(() => {
        this.zcGif = false;
        this.zcLQ = true;
      }, 5700);
    },
    goRegister() {
      // console.log(this.noticeType)
      if (this.noticeTypes == 1) {
        this.$store.commit("SETLOGIN", true);
        this.$store.commit("SETISLOGIN", false);
      } else {
        this.$store.commit("SETLOGIN", true);
        this.$store.commit("SETISLOGIN", false);
      
      }
     
    },
    closeZC() {
     
      if (this.selectIndex == true) {
        this.showZC = false;
        this.SETZCGIF(1);
      } else {
        this.showZC = false;
      }
    },
  },
  watch: {
    isShowCallTel: function () {
      if (!this.isShowCallTel) this.selectQues = [];
    },
    $route: function () {
      scrollTo(0, 0);
      this.checkRouter();
      this.getWhStatus()
      if (
        this.$route.path == "/login" ||
        this.$route.path == "/fPwdTel" ||
        this.$route.path == "/register" ||
        this.$route.path == "/RegisterDl" ||
        this.$route.path == "/Pwdlogin"
      )
        document.body.style.background = "#fff";
      else document.body.style.background = "#f4f5f8";
    },
    "userinfo.user_id": function (i) {
      let loginData = {
        type: "login",
        client_id: this.socketData.client_id,
        user_id: i ? i : 0,
        client_type: "WEB",
      };
      this.websocketsend(JSON.stringify(loginData));
      //暂时注释
    },
  },
};
</script>

<style lang="less">
.chat-room{
  position: fixed;
  left: 20px;
  bottom: 40px;
  width: 80px;
  cursor: pointer;
  z-index: 200;
  &::before{
    position: absolute;
    content: '';
    background: red;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    left: 5px;
    top: 5px;
  }
  img{
    width: 100%;
  }
}
html{
  font-size: 44px;
}
.notice-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.5);
  z-index: 9991;
  top: 0;
  left: 0;
  .notice {
    width: 608px;
    height: 580px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .notice-title{
      color:#fff;
      font-size: 40px;
      font-weight: bold;
      position: absolute;
      left: 53%;
      top: 38px;
      display: block;
      transform: translateX(-50%);
      width: 100%;
    }
    .notice-close {
      cursor: pointer;
      position: absolute;
      top: -26px;
      right: -50px;
    }
    .title {
      text-align: center;
      // h1{letter-spacing:2px}
    }
    .notice-content {
      background: url("./assets/imgaes/notice_bg.png") no-repeat top center;
      background-size: 100% 100%;
      display: flex;
      width: 100%;
      height: 475px;
      position: absolute;
      left: 0;
      top: 102px;
      &.notice-content-pink{
        ul {
          li.active{
            color: #FB7772 !important;
          }
        }
      }
      &.notice-content-blue{
        ul {
          li.active{
            color: #00B4D8 !important;
          }
        }
      }
      &.notice-content-green{
        ul {
          li.active{
            color: #09B584 !important;
          }
        }
      }
      .notice-menu {
        width: 50%;
        margin-top: 20px;
        background: linear-gradient(
          0deg,
          #f1f4f7 0%,
          #f1f4f7 82.23%,
          rgba(241, 244, 247, 0) 100%
        );
        border-radius: 0 0 0 10px;
        ul {
          li {
            text-align: center;
            height: 58px;
            line-height: 58px;
            font-size: 18px;
            cursor: pointer;
            border-bottom: 1px solid #fff;
          }
          .active {
            color: #1486ff;
            // background: linear-gradient(90deg, #FF5B54 0%, #FFA294 100%);
            background: #ffffff;
            box-shadow: 2px 1px 1px rgba(0, 0, 0, 0.25);
          }
        }
      }
      .notice-text {
        width: 100%;
        padding: 20px 20px 10px 20px;
        color: #7787a5;
        h2 {
          font-weight: normal;
          color: #445779;
        }
      }
    }
  }
}
.gd-notice {
  width: 100%;
  height: 32px;
  position: fixed;
  z-index: 99;
  display: flex;
  bottom: 0px;
  background: #ff7e65;
  font-size: 16px;
  line-height: 32px;
  color: #fff;
  > div {
    width: 80px;
    background: linear-gradient(top, #ff7e65, #fb4444);
  }
}
::-ms-clear {
  display: none;
}
::-ms-reveal {
  display: none;
}
::-o-clear {
  display: none;
}
.el-message-box {
  width: 320px;
}
.el-message-box__content {
  text-align: center;
  /*padding: 30px;*/
}
.el-message-box__message p {
  font-size: 16px;
  color: #333;
}
.el-message-box__btns {
  text-align: center;
}
.el-message-box--center {
  padding-bottom: 30px;
}
.el-message-box--center .el-message-box__title {
  margin-top: -14px;
  font-size: 18px;
  font-weight: bold;
}
.el-button {
  font-size: 16px;
  // color: #ffa8ad;
  // background: #ff1c30 !important;
  height: 42px;
  border: none;
  width: 240px;
  &:hover {
    color: #fff;
    // background: #ff1c30;
  }
}
.tzRecord-type {
  min-width: 80px;
  li {
    text-align: center;
    text-align: center;
    padding: 2px 0;
    margin: 2px 0;
    cursor: pointer;
  }
  .active {
    color: red;
  }
}
body {
  background: #f4f5f8;
}
#app {
}
//头部
.color_99 {
  color: #999;
}
.heaa {
  height: 80px;
  .logo {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      background: url("./assets/imgaes/main/logo.png") no-repeat center;
      background-size: contain;
      width: 168px;
      height: 52px;
      top: 14px;
      left: 0;
    }
  }
}
.gr_down {
  width: 100% !important;
  margin: 12px auto 0;
  padding: 12px 20px;
  .gr_avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .gr_info {
    margin-top: 10px;
    padding-bottom: 15px;
    // border-bottom: 1px solid #f7f7f7;
    .gr_name {
      margin-top: 10px;
    }
    .gr_nickname {
      font-size: 16px;
      color: #333333;
      height: 27px;
      span {
        &:nth-child(1) {
          max-width: 80px;
          margin-right: 10px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
        }
        &:nth-child(2) {
          width: 46px;
          height: 16px;
          display: inline-block;
          img {
            width: 100%;
          }
        }
      }
    }
    .gr_sing {
      font-size: 14px;
      color: #999999;
      max-width: 165px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .gr_tit {
    font-size: 12px;
    color: #999999;
    .gr_out {
      cursor: pointer !important;
    }
  }
  .gr_ex,
  .gr_exNew {
    padding: 20px 0;
    // border-bottom: 1px solid #f7f7f7;
    .gr_exchange {
      font-size: 14px;
      margin-left: 26px;
      text-align: center;
    }
    .gr_chong {
      margin-right: 26px;
      text-align: center;
    }
    .gr_zs {
      font-size: 16px;
      height: 22px;
    }
    .gr_zsNew {
      font-size: 24px;
      color: #445779;
      font-weight: bold;
      max-width: 115px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
    .gr_dhBtn {
      color: #fff;
      background: linear-gradient(90deg, #fd9717 0%, #ffd792 100%);
      font-size: 14px;
      min-width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      overflow: hidden;
      margin: 0 auto;
      padding: 0 10px;
    }
    .zh-icon {
      display: block;
      padding-left: 30px;
      font-size: 16px;
      color: #999;
      position: relative;
      cursor: pointer;
      &:before {
        position: absolute;
        content: "";
        width: 30px;
        height: 30px;
        background: url("./assets/imgaes/cash-icon.png") no-repeat;
        background-size: contain;
        left: 0;
        top: 0;
      }
    }
    .hs-size {
      font-size: 16px;
      font-weight: bold;
      color: #1486ff;
      cursor: pointer;
      background: #fff;
      margin-top: 6px;
    }
  }
  .gr_exNew {
    line-height: 30px;
  }
  .gr_xinxi {
    text-align: center;
    padding: 30px 0 14px 0;
    div {
      width: 100%;
    }
    .gr_gr {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        background: url("./assets/imgaes/pc_center.png") no-repeat center;
        background-size: contain;
        width: 20px;
        height: 25px;
        top: -7px;
        left: 70px;
      }
    }
    .gr_gr-pink {
    &:before {
      background: url("./assets/imgaes/pc_center-pink.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
  .gr_gr-blue {
    &:before {
      background: url("./assets/imgaes/pc_center-blue.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
  .gr_gr-green {
    &:before {
      background: url("./assets/imgaes/pc_center-green.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
    .gr_ds {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        background: url("./assets/imgaes/pc_gift.png") no-repeat center;
        background-size: contain;
        width: 24px;
        height: 25px;
        top: -35px;
        left: 29px;
      }
    }
    .gr_follow {
      position: relative;
      &:before {
        position: absolute;
        content: "";
        background: url("./assets/imgaes/pc_follow.png") no-repeat center;
        background-size: contain;
        width: 27px;
        height: 26px;
        top: -35px;
        left: 27px;
      }
    }
  }
  .gr_out {
    position: relative;
    &:before {
      position: absolute;
      content: "";
      background: url("./assets/imgaes/pc_out.png") no-repeat center;
      background-size: contain;
      width: 19px;
      height: 16px;
      top: 0;
      left: -25px;
    }
  }
}
// 一键回收
.myPurse-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  .myPurse-main {
    background-color: #fff;
    width: 868px;
    width: 60%;
    height: 80%;
    // max-height: 631px;
    position: relative;
    left: 50%;
    top: 10%;
    border-radius: 10px;
    transform: translateX(-50%);
    overflow: hidden;
    > h3 {
      height: 80px;
      line-height: 80px;
      font-size: 24px;
      text-align: center;
      color: #fff;
      background: url("./assets/imgaes/recharge_title_bg.png") no-repeat center;
      background-size: cover;
      overflow: hidden;
      position: relative;
      .purse-close-icon {
        position: absolute;
        right: 29px;
        top: 29px;
        width: 14px;
        height: 15px;
        background: url("./assets/imgaes/remove-btn.png") no-repeat;
        background-size: contain;
        cursor: pointer;
      }
    }
    .zj-purse {
      padding: 0 20px 20px 20px;
    }
  }
}
.ts-popup {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .ts-container {
    position: relative;
    width: 323px;
    height: 165px;
    background: url("./assets/imgaes/member/pup_bg.png") no-repeat;
    background-size: cover;
    margin: 20% auto 0;
    text-align: center;
    .remove-btn {
      width: 15px;
      height: 15px;
      position: absolute;
      right: -5px;
      top: -20px;
      z-index: 99;
      img {
        width: 100%;
      }
    }
    .ts-content {
      font-size: 18px;
      color: #343434;
      text-align: center;
      padding-top: 38px;
      i {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto 24px;
        &.success {
          background: url("./assets/imgaes/member/icon_success.png") no-repeat;
        }
        &.warning {
          background: url("./assets/imgaes/member/icon_warning.png") no-repeat;
        }
      }
    }
  }
}
.el-popper {
  border-top: 3px solid #1486ff !important;
}
 .pink-dr-bg.el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #FB7772 !important;
    top: -0.5px !important;}
  .blue-op-bg, .blue-lg-bg{
    border-top: 3px solid #00B4D8 !important;
         .el-scrollbar{
      .el-select-dropdown__wrap{
        .el-scrollbar__view{
          .el-select-dropdown__item:hover{
            color:#00B4D8 !important;
          }
        }
      }
    }
  }
  .blue-dr-bg{
    border-top: 3px solid #00B4D8 !important;
    .el-dropdown-menu__item:not(.is-disabled):hover{
      background: #00B4D8 !important;
      color:#fff !important;
    }  
  }
  .pink-dr-bg{
    border-top: 3px solid #FB7772 !important;
    .el-dropdown-menu__item:not(.is-disabled):hover{
      background: #FB7772 !important;
      color:#fff !important;
    }  
  }
  .green-dr-bg{
    border-top: 3px solid #09B584  !important;
    .el-dropdown-menu__item:not(.is-disabled):hover{
      background: #09B584  !important;
      color:#fff !important;
    }  
  }


.el-dropdown-menu__item {
  // padding: 0 36px!important;
  // width: 143px !important;
  width: 160px !important;
  line-height: 44px !important;
  padding-left: 30px !important;
  // position: relative!important;
}
#gamecaipiao {
  padding: 0 20px 0 10px !important;
  a {
    display: inline-block !important;
    color: #333 !important;
  }
  a:hover {
    color: #ff1c30 !important;
    font-weight: bold !important;
  }
}
.el-dropdown-menu {
  padding: 0 !important;
}

.popper__arrow {
  // left: 50% !important;
  // transform: translateX(-50%) !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #1486ff !important;
  top: -.5px !important;
}
.el-popper .el-dropdown-menu__item:hover {
  // color: #1486FF !important;
  color: #fff !important;
  background-color: #1486ff !important;
}
#redlist .el-dropdown-menu .el-dropdown-menu__item:hover {
  color: #1486ff !important;
  background-color: #1486ff !important;
}
//历史记录
#openResult .el-input__inner,
#personal .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
}
#openResult .el-input__icon,
#personal .el-input__icon {
  line-height: 30px !important;
}
.wjs-Orange-color {
  color: #ff5500;
}
.wjs-blue-color {
  color: #3288ff;
}
.wjs-green-color {
  color: #299a26;
}
// 开奖
.date_2 .el-input__inner,
#openLottery .el-input__inner,
#chat .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
  // width: 170px!important;
}
.date_2 .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px !important;
}
// .date_2 .el-input__prefix .el-icon-date:before {
//   content: "";
// }

.el-input__prefix .el-icon-date {
  line-height: 30px !important;
}
// #chat .el-input__prefix .el-icon-date:before {
//   content: "";
// }
#chat .el-input__suffix {
  line-height: 30px !important;
}
#chat .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  //  width: 170px!important;
  width: 180px !important;
}
#openLottery .el-select__caret,
#chat .el-select__caret {
  line-height: 30px !important;
}
#openLottery .selectBox .el-input__inner,
#chat .selectBox .el-input__inner {
  width: 90px !important;
}
.el-date-table td.current:not(.disabled) span {
  background-color: #ff1c30 !important;
}
.el-date-table td:hover span {
  color: #ff1c30 !important;
}
.date_2 .el-input__suffix .el-input__icon {
  line-height: 30px !important;
  margin-right: 15px !important;
}
//首页 专家红单

.red_tabs .el-tabs__active-bar,
.prevue-content .el-tabs__active-bar {
  background-color: #ff5d61 !important;
}

.red_tabs .el-tabs__item:hover,
.prevue-content .el-tabs__item:hover {
  color: #ff1c30 !important;
}
.red_tabs .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: none !important;
  border-left: none !important;
}
.red_tabs .el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: none !important;
  border-left: none !important;
  border-bottom: 2px #f4f5f8 solid !important;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: none !important;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  margin: 0;
}

.el-tabs__header .is-top {
  background-color: #fff;
}
.el-tabs__nav .is-top {
  border: none !important;
  border-bottom: 1.5px #f4f5f8 solid !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}
.red_tabs .el-tabs__item.is-active,
.prevue-content .el-tabs__item.is-active {
  color: #333333 !important;
  border-top: 3px solid #ff5d61 !important;
  border-bottom: none !important;
  border-left: 1px #f4f5f8 solid !important;
  border-right: 1px #f4f5f8 solid !important;
  // border-bottom:none!important;
  // border-left:none!important;
  // border-right:none!important;
}
//节目预告
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}

/*color*/
/*pjpk10 1-10*/
.firstColor {
  // background: #f7e300 !important;
  background: linear-gradient(
    180deg,
    rgba(255, 244, 123, 1),
    rgba(255, 194, 108, 1)
  ) !important;
  background: -webkit-linear-gradient(
    180deg,
    rgba(255, 244, 123, 1),
    rgba(255, 194, 108, 1)
  ) !important;
  background: -o-linear-gradient(
    180deg,
    rgba(255, 244, 123, 1),
    rgba(255, 194, 108, 1)
  ) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    rgba(255, 244, 123, 1),
    rgba(255, 194, 108, 1)
  ) !important;
}
.secondColor {
  // background: #73ccf9 !important;
  background: linear-gradient(180deg, #78dcff, #4da1ff) !important;
  background: -webkit-linear-gradientlinear-gradient(
    180deg,
    #78dcff,
    #4da1ff
  ) !important;
  background: -o-linear-gradient(180deg, #78dcff, #4da1ff) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #78dcff,
    #4da1ff
  ) !important;
}
.thirdColor {
  // background: #888888 !important;
  background: linear-gradient(180deg, #bbbbbb, #949494) !important;
  background: -webkit-linear-gradientlinear-gradient(
    180deg,
    #bbbbbb,
    #949494
  ) !important;
  background: -o-linear-gradient(180deg, #bbbbbb, #949494) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #bbbbbb,
    #949494
  ) !important;
}
.fourthColor {
  // background: #faa056 !important;
  background: linear-gradient(180deg, #ffc97b, #ff9249) !important;
  background: -webkit-linear-gradient(180deg, #ffc97b, #ff9249) !important;
  background: -o-linear-gradient(180deg, #ffc97b, #ff9249) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #ffc97b,
    #ff9249
  ) !important;
}
.fifthColor {
  // background: #5ef0ba !important;
  background: linear-gradient(180deg, #7eedbf, #20b6c9) !important;
  background: -webkit-linear-gradient(180deg, #7eedbf, #20b6c9) !important;
  background: -o-linear-gradient(180deg, #7eedbf, #20b6c9) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #7eedbf,
    #20b6c9
  ) !important;
}
.sixthColor {
  // background: #6653dd !important;
  background: linear-gradient(180deg, #ea5efd, #8c4dea) !important;
  background: -webkit-linear-gradient(180deg, #ea5efd, #8c4dea) !important;
  background: -o-linear-gradient(180deg, #ea5efd, #8c4dea) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #ea5efd,
    #8c4dea
  ) !important;
}
.seventhColor {
  // background: #bbbbbb !important;
  background: linear-gradient(180deg, #e4e4e4, #bbbbbb) !important;
  background: -webkit-linear-gradient(180deg, #e4e4e4, #bbbbbb) !important;
  background: -o-linear-gradient(180deg, #e4e4e4, #bbbbbb) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #e4e4e4,
    #bbbbbb
  ) !important;
}
.eigthColor {
  // background: #f8767a !important;
  background: linear-gradient(
    180deg,
    rgba(255, 145, 145, 1),
    rgba(240, 78, 101, 1)
  ) !important;
  background: -webkit-linear-gradient(
    180deg,
    rgba(255, 145, 145, 1),
    rgba(240, 78, 101, 1)
  ) !important;
  background: -o-linear-gradient(
    180deg,
    rgba(255, 145, 145, 1),
    rgba(240, 78, 101, 1)
  ) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    rgba(255, 145, 145, 1),
    rgba(240, 78, 101, 1)
  ) !important;
}
.ninthColor {
  // background: #e03940 !important;
  background: linear-gradient(180deg, #ff8585, #df2b2b) !important;
  background: -webkit-linear-gradient(180deg, #ff8585, #df2b2b) !important;
  background: -o-linear-gradient(180deg, #ff8585, #df2b2b) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #ff8585,
    #df2b2b
  ) !important;
}
.tenthColor {
  // background: #84ec7f !important;
  background: linear-gradient(180deg, #82ef8d, #3bba74) !important;
  background: -webkit-linear-gradient(180deg, #82ef8d, #3bba74) !important;
  background: -o-linear-gradient(180deg, #82ef8d, #3bba74) !important;
  background: -moz-linear-gradientlinear-gradient(
    180deg,
    #82ef8d,
    #3bba74
  ) !important;
}
/* 龙虎 单双 */
.longColor,
.hxColor,
.hsColor,
.wxColor,
.evenColor {
  color: #ff1c30 !important;
}
.redcolor {
  color: #ff1c30 !important;
}
.bluecolor {
  color: #0084ff !important;
}
.greencolor {
  color: #00d16c !important;
}
.huColor,
.bigColor,
.oddColor,
.hdColor,
.hdColor,
.wdColor {
  color: #0084ff !important;
}
.ddColor {
  // color: #fff;
  font-size: 16px !important;
  background: #0084ff !important;
}
.ddColorNew {
  font-weight: normal !important;
  background: linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -webkit-linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -o-linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -moz-linear-gradient(0deg, #88cffa, #3175f6) !important;
}
.ssColor {
  // color: #fff;
  font-size: 16px !important;
  background: #ff1c30 !important;
}
.ssColorNew {
  font-weight: normal !important;
  background: linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -webkit-linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -o-linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -moz-linear-gradient(180deg, #ff413b, #ff7d65) !important;
}
.dadaColor {
  // color: #fff;
  font-size: 16px !important;
  background: #0084ff !important;
}
.dadaColorNew,
.longBgNew {
  font-weight: normal !important;
  background: linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -webkit-linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -o-linear-gradient(180deg, #ff413b, #ff7d65) !important;
  background: -moz-linear-gradient(180deg, #ff413b, #ff7d65) !important;
}
.xxColor {
  // color: #fff;
  font-size: 16px !important;
  background: #ff1c30 !important;
}
.xxColorNew,
.huBgNew {
  font-weight: normal !important;
  background: linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -webkit-linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -o-linear-gradient(0deg, #88cffa, #3175f6) !important;
  background: -moz-linear-gradient(0deg, #88cffa, #3175f6) !important;
}
/*和*/
.heColor,
.heeColor {
  // color: #02d164!important;
}
.smallColor,
.oddColor,
.longColor,
.bsColor,
.zlColor,
.szColor,
.baoziColor,
.hsColor,
.hexiaoColor,
.wxColor,
.zhiColor,
.blueColor {
  color: #71b8f9 !important;
}
.bigColor,
.evenColor,
.huColor,
.dzColor,
.hdColor,
.wdColor,
.hedaColor,
.heColor,
.redColor {
  color: #ff1c30 !important;
}
.psd .el-input__inner {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border-radius: 99px;
  background: #f5f5f5;
  color: #333;
  padding-left: 20px;
  font-size: 14px;
  border: none;
}
#userInfor {
  .el-input__inner {
    width: 300px;
    height: 42px;
    border: none;
    background: #f5f5f5;
    color: #6a86b9;
    border-radius: 4px;
    line-height: 42px;
  }
  .phone{
    width: 260px !important;
    .el-input__inner {
       width: 260px;
    }
  }
  .el-textarea__inner {
    width: 592px;
    height: 94px;
    border: none;
    font-size: 14px;
    background: #f5f5f5;
    color: #6a86b9;
    border-radius: 4px;
    resize: none;
    font-family: auto;
    overflow-y: hidden !important;
    margin-top: 10px;
  }
  .el-select-dropdown__list {
    padding: 0 !important;
  }
  .el-textarea .el-input__count {
    color: #909399;
    background: #f5f5f5;
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 10px;
  }
}
#feedBack {
  .el-textarea__inner {
    width: 910px;
    height: 200px;
    border: none;
    font-size: 14px;
    background: #f5f5f5;
    color: #333333;
    border-radius: 7px;
    resize: none;
  }
  .el-textarea .el-input__count {
    color: #909399;
    background: #f5f5f5;
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 10px;
  }
}
#loginPwd {
  button {
    border: 0;
    span {
      width: 100% !important;
      height: 100%;
      // line-height: 100% !important;
      // display: block !important;
      text-align: center;
    }
  }
}
// /deep/.el-popper .el-select-dropdown__wrap .el-scrollbar__wrap{
//   margin-bottom:17px!important;
// }
.el-select-dropdown__wrap{
max-height: 340px !important ;
}

.el-scrollbar {
  padding-bottom: 17px !important;
}
#home .el-scrollbar {
  padding-bottom: 0px !important;
}
.el-scrollbar .el-scrollbar__view .el-select-dropdown__list {
  padding: 0 !important;
}
.el-select-dropdown__item:hover {
  color: #3176f6;
  background-color: #f5f5f5;
}


//导航
#app {
  // position: relative;
  .nav {
    position: fixed;
    // right: 70px;
    // right: 0px;
    top: 115px;
    border-radius: 4px;
    // overflow: hidden;
    z-index: 1000;
    .sj {
      width: 25px;
      height: 75px;
      position: absolute;
      top: 148px;
      left: -25px;
      cursor: pointer;
    }
    .sj-left {
      width: 25px;
      height: 60px;
      position: absolute;
      top: 9%;
      left: 70px;
      cursor: pointer;
      background: #fff;
      border-radius: 0 5px 5px 0;
      img {
        width: 70%;
        padding-top: 17px;
      }
    }
    .nav-list {
      > div {
        > div {
          text-align: center;
          width: 70px;
          height: 74px;
          background-color: #fff;
          border-bottom: 1px solid #f4f5f8;
          padding-top: 11px;
          cursor: pointer;
          &:nth-last-child(1) {
            border-bottom: none;
          }
          // div {
          //   &:nth-child(1) {
          //     width: 40px;
          //     height: 40px;
          //     margin-left: 15px;
          //   }
          // }
          .img1 {
            width: 40px;
            height: 40px;
            margin-left: 15px;
          }
        }
        .line-box {
          &:hover {
            background-color: #ff1c30;
            color: #fff;
            .dlQQ {
              color: #666;
            }
          }
          &:hover .line {
            background: url("./assets/imgaes/main/line_hover-min.png") no-repeat;
            background-size: contain;
          }
          &:hover .lineDL {
            background: url("./assets/imgaes/main/hoverDL.png") no-repeat;
            background-size: contain;
          }
          &:hover .line-list {
            display: block;
          }
        }
        .line {
          background: url("./assets/imgaes/main/line-min.png") no-repeat;
          background-size: contain;
        }
        .lineDL {
          background: url("./assets/imgaes/main/JMDL.png") no-repeat;
          background-size: contain;
        }
        .kefu-box {
          a {
            display: block;
          }
          &:hover {
            background-color: #ff1c30;
            color: #fff;
          }
          &:hover a {
            // background-color: #ff1c30;
            color: #fff;
          }
          &:hover .kefu {
            background: url("./assets/imgaes/main/service_hover-min.png")
              no-repeat;
            background-size: contain;
          }
        }
        .kefu {
          background: url("./assets/imgaes/main/service-min.png") no-repeat;
          background-size: contain;
        }
        .qq-box {
          a {
            display: block;
          }
          &:hover {
            background-color: #ff1c30;
            color: #fff;
          }
          &:hover a {
            // background-color: #ff1c30;
            color: #fff;
          }
          &:hover .qq {
            background: url("./assets/imgaes/main/QQ_hover-min.png") no-repeat;
            background-size: contain;
          }
        }
        .dl-box {
          position: relative;
          .dlzc-img {
            position: absolute;
            display: none;
            left: 100px;
            top: 0;
            width: 237px;
            height: 289px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          a {
            display: block;
          }
          // &:hover {
          //   background-color: #ff1c30;
          //   color: #fff;
          // }
          // &:hover a {
          //   // background-color: #ff1c30;
          //   color: #fff;
          // }
          // &:hover .dl-icon {
          //   background: url("./assets/imgaes/main/QQ_hover-min.png") no-repeat;
          //   background-size: contain;
          // }
          &:hover .dlzc-img {
            display: block;
          }
        }
        .dl-icon {
          background: url("./assets/imgaes/main/dlzcimg.png") no-repeat;
          background-size: contain;
        }
        .qq {
          background: url("./assets/imgaes/main/QQ-min.png") no-repeat;
          background-size: contain;
        }
        .tencent-box {
          position: relative;
          &:hover {
            background-color: #ff1c30;
            color: #fff;
          }
          &:hover .tencent {
            background: url("./assets/imgaes/main/public_hover-min.png")
              no-repeat;
            background-size: contain;
          }
        }
        .tencent {
          background: url("./assets/imgaes/main/public-min.png") no-repeat;
          background-size: contain;
        }
        .relation-box {
          &:hover {
            background-color: #ff1c30;
            color: #fff;
          }
          &:hover .relation {
            background: url("./assets/imgaes/main/relation_hover-min.png")
              no-repeat;
            background-size: contain;
          }
          &:hover .callBack {
            background: url("./assets/imgaes/main/backActive.png") no-repeat;
            background-size: contain;
          }
        }
        .relation {
          background: url("./assets/imgaes/main/relation-min.png") no-repeat;
          background-size: contain;
        }
        .callBack {
          background: url("./assets/imgaes/main/backDefault.png") no-repeat;
          background-size: contain;
        }
        .fanhui-box {
          &:hover {
            background-color: #ff1c30;
            color: #fff;
          }
          &:hover .fanhui {
            background: url("./assets/imgaes/main/top_hover-min.png") no-repeat;
            background-size: contain;
          }
        }
        .fanhui {
          background: url("./assets/imgaes/main/top-min.png") no-repeat;
          background-size: contain;
        }
      }
    }
    #relationJMDL {
      height: 132px;
      top: 412px;
      > div {
        height: 66px;
      }
    }
    .noQQDL {
      top: 337px !important;
    }
  }
  .nav-left {
    left: 0 !important;
  }
  .code-box {
    position: fixed;
    width: 180px;
    height: 180px;
    right: 80px;
    top: 337px;
    background-color: #fff;
    display: none;
    border-radius: 4px;
    z-index: 1000;
    &:before {
      content: "";
      position: absolute;
      background: url("./assets/imgaes/main/nav-f.png") no-repeat;
      width: 9px;
      height: 19px;
      right: -9px;
      top: 24px;
    }
    img {
      padding-top: 8px;
      margin-left: 5px;
    }
  }
  .relation-list {
    position: fixed;
    width: 227px;
    height: 155px;
    background: #fff;
    right: 80px;
    top: 337px;
    border-radius: 4px;
    display: none;
    z-index: 1000;
    font-size: 14px;
    &:before {
      content: "";
      position: absolute;
      background: url("./assets/imgaes/main/nav-f.png") no-repeat;
      width: 9px;
      height: 19px;
      right: -9px;
      top: 24px;
    }
    > div {
      margin-left: 47px;
      height: 76px;
      text-align-last: left;
      line-height: 22px;
      padding-top: 20px;
      &:nth-child(1) {
        border-bottom: 1px solid #f4f5f8;
      }
    }
    span {
      display: block;
      font-size: 14px;
      color: #333;
      &:nth-child(2) {
        color: #999;
      }
    }
    .tel {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        background: url("./assets/imgaes/main/nav-phone.png") no-repeat;
        background-size: contain;
        width: 14px;
        height: 17px;
        left: -25px;
        top: 25px;
      }
    }
    .email {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        background: url("./assets/imgaes/main/nav-email.png") no-repeat;
        background-size: contain;
        width: 18px;
        height: 14px;
        left: -25px;
        top: 25px;
      }
    }
    .dlQQ {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        background: url("./assets/imgaes/main/DLQQ.png") no-repeat;
        background-size: contain;
        width: 18px;
        height: 14px;
        left: -25px;
        top: 25px;
      }
    }
    .dlDH {
      position: relative;
      &:before {
        content: "";
        position: absolute;
        background: url("./assets/imgaes/main/TEL1.png") no-repeat;
        background-size: contain;
        width: 18px;
        height: 14px;
        left: -25px;
        top: 25px;
      }
    }
  }
  .noQQ {
    top: 261px !important;
  }
  .line-list {
    // position: fixed;
    // right: 154px;
    // top: 115px;
    // background: #fff;
    // // height: 289px;
    // width: 108px;
    // border-radius: 4px;
    // display: none;
    // z-index: 1000;
    position: fixed;
    right: 141px;
    right: 68px;
    top: 205px;
    /* background: #fff; */
    width: 118px;
    border-radius: 4px;
    display: none;
    z-index: 1000;
    &:before {
      content: "";
      position: absolute;
      background: url("./assets/imgaes/main/nav-f.png") no-repeat;
      width: 9px;
      height: 19px;
      // right: -9px;
      right: 2px;
      top: 24px;
    }
    ul {
      background: #fff;
      width: 108px;
      border-radius: 4px;
    }
    li {
      // height: 71px;
      // padding: 19px 30px;
      padding: 19px 0 19px 30px;
      border-bottom: 1px solid #f4f5f8;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      &:hover .origin {
        background: #ff1c30;
      }
      &:hover a {
        color: #ff1c30;
      }
    }
    .origin {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      overflow: hidden;
      background: #dddddd;
      margin-right: 9px;
      margin-top: 5px;
    }
  }
}
.redcolor {
  color: #ff1c30;
}
.glcolor {
  color: #22d762;
}
.txhead {
  display: flex;
  border-bottom: 1px solid #f4f5f8;

  > div {
    height: 60px;
    line-height: 60px;
    color: #a7a7a7;
    font-size: 16px;
    position: relative;
    padding: 0 10px;
    margin-right: 18px;
    cursor: pointer;
    position: relative;
  }

  .active {
    color: #ff1c30;
    font-weight: bold;
    &:before {
      content: "";
      width: 50% !important;
      height: 4px;
      background: #ff1c30;
      position: absolute;
      bottom: -1px;
      border-radius: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.level-icon.level1 {
  background: url("./assets/imgaes/extend/qt.png") no-repeat;
  background-size: contain;
}
.level-icon.level2 {
  background: url("./assets/imgaes/extend/bj.png") no-repeat;
  background-size: contain;
  height: 22px !important;
}
.level-icon.level3 {
  background: url("./assets/imgaes/extend/hj.png") no-repeat;
  background-size: contain;
  height: 22px !important;
}
.level-icon.level4 {
  background: url("./assets/imgaes/extend/baij.png") no-repeat;
  background-size: contain;
  height: 23px !important;
}
.level-icon.level5 {
  background: url("./assets/imgaes/extend/zs.png") no-repeat;
  background-size: contain;
  height: 27px !important;
}
.level-icon.level6 {
  background: url("./assets/imgaes/extend/xy.png") no-repeat;
  background-size: contain;
  height: 34px !important;
}

.tzDate {
  //个人中心，投注记录
  width: 120px !important;
  height: 30px !important;
  line-height: 30px !important;
  text-align: center;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  padding: 0;
}
.tzDate .el-icon-date {
  display: none !important;
}
.tzDate .el-input__inner {
  width: 120px !important;
  height: 30px !important;
  line-height: 30px !important;
  font-size: 14px;
  color: #333;
  text-align: center;
  background: #f5f5f5;
  border: none !important;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  padding-right: 0 !important;
  padding-left: 0px !important;
}
.bankDate .el-input__inner {
  width: 285px !important;
  background: none !important;
  height: 40px !important;
  line-height: 40px !important;
  text-align: left;
  padding-left: 30px !important;
}
.wechatDate .el-input__inner {
  width: 280px !important;
  background: none !important;
  height: 50px !important;
  line-height: 50px !important;
  text-align: left;
  padding-left: 30px !important;
}
.bankDate {
  height: 40px !important;
  line-height: 40px !important;
}
.wechatDate {
  height: 50px !important;
  line-height: 50px !important;
  width: 280px !important;
  border: 0.5px solid #445779 !important;
  border-radius: 4px !important;
}
//刷新icon
.el-icon-refresh {
  cursor: pointer;
  &:hover {
    color: #ff1c30;
  }
}
.yqmConfirm,
.yqmCancel,
.yqmConfirm1 {
  width: 181px !important;
  height: 59px !important;
  line-height: 59px !important;
  text-align: center !important;
  border-radius: 30px !important;
}
//邀请弹窗
.yqmConfirm {
  background-color: #ff1c30 !important;
  color: #fff !important;
}
.yqmCancel {
  background: #eee !important;
  color: #333 !important;
}
.yqmConfirm1 {
  width: 404px !important;
}
.yqmBox,
.swBox {
  width: 440px !important;
  height: 281px;
  .is-round {
    padding: 0 !important;
  }
  .el-message-box__header {
    padding: 0 !important;
    padding-top: 30px !important;
    padding-bottom: 56px !important;
    .el-message-box__title {
      margin-top: 0 !important;
    }
    span {
      display: inline-block !important;
      font-size: 24px !important;
      font-weight: bold !important;
      color: #222221 !important;
    }
  }
  .el-message-box__message {
    width: 240px !important;
    margin: 0 auto !important;
    color: #333 !important;
    font-size: 18px !important;
  }
  .el-message-box__message p {
    color: #333 !important;
    font-size: 18px !important;
  }
  .el-message-box__content {
    padding: 0 !important;
    padding-bottom: 19px !important;
  }
}
.swBox {
  .el-message-box__header {
    padding-bottom: 30px !important;
  }
  .el-message-box__message {
    width: 300px !important;
  }
  .el-message-box__message {
    p {
      line-height: 30px !important;
    }
  }
}

// 影片区弹窗按钮
.backButton {
  width: 181px;
  height: 59px;
  font-size: 18px;
  color: #333;
  border-radius: 50px !important;
  background: gainsboro !important;
  margin-top: 20px !important;
  &:hover {
    color: #333 !important;
  }
}
.rechargeButton {
  width: 181px;
  height: 59px;
  font-size: 18px;
  color: #fff;
  border-radius: 50px !important;
  // background: #ff1c30 !important;
  margin-left: 39px !important;
  margin-top: 20px !important;
}
.toRechargeButton {
  width: 181px;
  height: 59px;
  font-size: 18px;
  color: #fff;
  border-radius: 50px !important;
  background: #ff1c30 !important;
  margin-top: 20px !important;
}

#root .tips {
  overflow-y: hidden !important;
  background: #f4f5f8 !important;
}

/*影视区*/
.video-dropdown {
  width: 318px;
  top: 145px !important;
  left: 974px !important;
  .delete {
    font-size: 14px;
    color: #3333;
    padding: 10px;
  }
  .el-popper {
    margin-top: 0 !important;
  }
  .el-popper[x-placement^="bottom"] .popper__arrow::after {
    display: none !important;
  }
  .el-dropdown-menu__item {
    width: 94% !important;
    margin: 0 10px !important;
  }
}
.video-banner {
  .el-carousel__indicators--horizontal {
    bottom: 10px;
  }
  .is-active {
    .el-carousel__button {
      background: #1486ff;
    }
  }
  .el-carousel__button {
    width: 16px;
    height: 16px;
    background: #fff;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 54px;
  }
}
.video-more,
.video-search {
  .el-pagination {
    background: none;
    float: left;
    .btn-prev,
    .btn-next {
      width: 46px;
      height: 28px;
      border: 1px solid #aaa;
      background: none;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      &:hover {
        color: #1486ff;
      }
    }
    .btn-prev {
      margin-right: 10px;
    }
    .el-pager {
      li {
        width: 46px;
        height: 28px;
        border: 1px solid #aaa;
        background: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin-right: 10px;
        &.active {
          color: #fff;
          background: #ff1c30;
          border-color: #ff1c30;
        }
        &:hover {
          color: #ff1c30;
        }
      }
    }
    .el-input__inner {
      background: none;
      &:focus {
        border-color: #ff1c30;
      }
    }
  }
}
//  播放器
.video-js .vjs-duration {
  display: block !important;
}
.video-js .vjs-time-control {
  display: block !important;
}
.video-js .vjs-remaining-time {
  display: none !important;
}
.vjs-error .vjs-error-display:before {
  content: "" !important;
}
.vjs-error .vjs-error-display .vjs-modal-dialog-content {
  line-height: 540px !important;
}

//钱包
#my-purse {
  .el-input__inner {
    width: 155px;
    height: 40px;
    font-size: 14px;
    color: #1486ff;
    background: #f1f5ff;
    border: none;
  }
  .el-input__suffix {
    transform: rotate(180deg);
  }
  .el-icon-arrow-up:before {
    content: url("./assets/imgaes/member/up.png");
  }
}
//游戏报表投注记录
#userTzRecord {
  .el-select {
    margin-top: 2px;
  }
  .el-select,
  .el-input,
  .el-input__suffix {
    &:hover {
      .el-input__icon {
        display: block !important;
      }
    }
  }
  .el-input__inner {
    width: 157px;
    height: 30px;
    font-size: 14px;
    color: #343434;
    background: #f5f5f5;
    border: none;
  }

  .el-input__icon {
    display: block;
    line-height: 30px;
    z-index: 99;
  }
  .el-icon-arrow-up:before {
    content: url("./assets/imgaes/member/up.png");
  }
  .el-icon-circle-close {
    display: none !important;
  }
}

//投注单独页 20200902
#lotteryGame {
  .bet-num {
    .el-input-number__decrease,
    .el-input-number__increase {
      width: 30px;
      line-height: 30px;
      color: #287be1;
      background: #d6eeff;
      border: none;
    }
    .el-input__inner {
      height: 30px;
      border-color: #d6eeff;
    }
  }
  .play-textarea {
    .el-textarea__inner {
      height: 214px;
      background: transparent;
      padding: 10px;
      position: absolute;
      z-index: 2;
    }
  }
  .history-select {
    .el-select {
      .el-input--suffix .el-input__inner {
        font-weight: bold;
        color: #ff6868;
        text-align: center;
        background: #e7f0fc;
        border: none;
        border-radius: 4px;
      }
    }
  }
}
//新单独投注页
.LGNew{
  .history-select {
      .el-select {
        margin-top: 0px!important;
        margin-bottom:0 !important;
        .el-input--suffix .el-input__inner {
          font-weight: normal!important;
          color: #fff!important;
          text-align: left!important;
          background: #4999C6!important;
          border: none;
          border-radius: 4px;
          font-size: 18px!important;
        }
      }
    }
    .pink-content{
      .history-select {
      .el-select {
        margin-top: 0px!important;
        margin-bottom:0 !important;
        .el-input--suffix .el-input__inner {
          font-weight: normal!important;
          color: #fff!important;
          text-align: left!important;
           background: #EB9592!important;
          border: none;
          border-radius: 4px;
          font-size: 18px!important;
        }
      }
    }
    }
    .blue-content{
      .history-select {
      .el-select {
        margin-top: 0px!important;
        margin-bottom:0 !important;
        .el-input--suffix .el-input__inner {
          font-weight: normal!important;
          color: #fff!important;
          text-align: left!important;
           background: #44B1C7!important;
          border: none;
          border-radius: 4px;
          font-size: 18px!important;
        }
      }
    }
    }
    .green-content{
      .history-select {
      .el-select {
        margin-top: 0px!important;
        margin-bottom:0 !important;
        .el-input--suffix .el-input__inner {
          font-weight: normal!important;
          color: #fff!important;
          text-align: left!important;
           background: #57C7A7!important;;
          border: none;
          border-radius: 4px;
          font-size: 18px!important;
        }
      }
    }
    }
     .el-input--suffix{
      .el-input__suffix{
        .el-input__suffix-inner{
          .el-select__caret{
            font-size: 20px!important;
          }
            .el-select__caret:before{
              color:#fff!important;
            }
        }
      }
    }
    .play-content .game-history{
      background: none!important;


    }
}
.tzBallColor {
  display: inline-block;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(0deg, #3176f6, #88cffa);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  line-height: 24px;
  margin: 0 auto;
}
.el-message-box.zdzz-confirm,.el-message-box.pink-bth-color
,.el-message-box.blue-bth-color
,.el-message-box.green-bth-color {
  width: 440px;
  .el-button {
    width: 180px;
    height: 60px;
    border-radius: 30px;
    font-size: 18px;
  }
  .el-message-box__content {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .el-message-box__btns {
    display: flex;
    justify-content: space-around;
    .el-button {
      background: #eeeeee !important;
      color: #000;
    }
  }
}
.el-message-box.pink-bth-color .el-message-box__btns .el-button.el-button--primary{
  background: linear-gradient(90deg, #FB7772 0%, #FF9995 100%)!important;
  color: #fff;
} 
.el-message-box.blue-bth-color .el-message-box__btns .el-button.el-button--primary{
  background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%)!important;
  color: #fff;
} 
.el-message-box.green-bth-color .el-message-box__btns .el-button.el-button--primary{
  background: linear-gradient(90deg, #08D99D 0%, #00F3AE 100%)!important;
  color: #fff;
} 
.confirmBtn,
.cancelBtn {
  width: 30% !important;
  border-radius: 100px !important;
  color: rgb(15, 7, 7) !important;
}
.cancelBtn {
  background: #f5f7fa !important;
  color: #333 !important;
}

#vip-details {
  .el-carousel__indicator {
    .el-carousel__button {
      width: 12px;
      height: 12px;
      background: #ccc;
      border-radius: 50%;
    }
    &.is-active {
      .el-carousel__button {
        background: #ff1c30;
      }
    }
  }
  .gift-pack2 {
    .el-carousel__indicators--outside {
      position: absolute;
      top: 195px;
      transform: translateX(-50%);
    }
  }
}


//福彩3D，排列三
.fc-bgColor {
  background: linear-gradient(180deg, #db2525, #ff5c5c) !important;
}



//银行卡无匹配数据
// #widthDraw{
.el-select-dropdown__empty {
  display: none !important;
}
// }

.main-sport {
  width: 1300px;
  margin: 0 auto;
}
//改版后首页banner
.home-banner {

  .el-carousel__arrow {
    width: 46px;
    height: 80px;
    background: #000000;
    opacity: 0.3;
    font-size: 40px;
  }
  .el-carousel__arrow--left {
    border-radius: 8px;
    left: 100px;
  }
  .el-carousel__arrow--right {
    border-radius: 8px;
    right: 100px;
  }
  .el-carousel__indicators--horizontal {
    bottom: 10px;
  }
  .el-carousel__indicator {
    width: 16px;
    height: 16px;
    padding: 0;
    margin-right: 10px;
  }
  .is-active {
    .el-carousel__button {
      background: #fff;
      border: 1px solid #1486ff;
    }
  }
  .el-carousel__button {
    width: 16px;
    height: 16px;
    background: none;
    border: 1px solid rgba(#fff, #fff, #fff, 1);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 54px;
    position: relative;
    &::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #1486ff;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 3px;
    }
  }
}
//首页下载app轮播
.download-carousel {
  .el-carousel__arrow--left {
    left: 0;
  }
  .el-carousel__arrow--right {
    right: 0;
  }
  .el-carousel__indicators--horizontal {
    bottom: 0px;
  }
  .el-carousel__indicator {
    width: 16px;
    height: 16px;
    padding: 0;
    margin-right: 10px;
  }
  .is-active {
    .el-carousel__button {
      background: #fff;
      border: 1px solid #1486ff;
    }
  }
  .el-carousel__button {
    width: 16px;
    height: 16px;
    background: none;
    border: 1px solid rgba(#fff, #fff, #fff, 1);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 54px;
    position: relative;
    &::before {
      content: "";
      width: 8px;
      height: 8px;
      background: #1486ff;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 3px;
    }
  }
}
.pt9 {
  padding-top: 150px;
}
#header {
  .hNav {
    .subNav {
      z-index: 1000 !important;
    }
  }
}
.vjs-custom-skin > .video-js {
  min-height: 530px;
}

.pink-bg{
  background: #FB7772 !important;
}
.pink-bg-dark{
  background: #D15B56 !important;
}
.pink-active{
  color:#FB7772 !important;
  &:before{
    background: #FB7772 !important;
  }
}
.blue-bg{
  background: #00B4D8 !important;
}
.blue-bg-dark{
  background: #009AB9 !important;
}
.blue-active{
  color: #00B4D8 !important;
  &:before{
    background: #00B4D8 !important;
  }
}
.green-bg{
  background: #09B584 !important;
}
.green-bg-dark{
  background: #028D66 !important;
}
.green-active{
  color: #09B584 !important;
  &:before{
    background: #09B584 !important;
  }
}
.pink-color{
  color: #FB7772 !important;
}
.blue-color{
  color: #00B4D8 !important;
}
.green-color{
  color: #09B584 !important;
}
.pink-color-border{
  border-color: #FB7772 !important;
  color: #FB7772 !important;
}
.blue-color-border{
  border-color: #00B4D8 !important;
  color: #00B4D8 !important;
}
.green-color-border{
  border-color: #09B584 !important;
  color: #09B584 !important;
}

.pink-bg-jb{
  background: linear-gradient(90deg, #FB7772 0%, #FF9995 100%)!important;
}
.blue-bg-jb{
  background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%)!important;
}
.green-bg-jb{
 background: linear-gradient(90deg, #08D99D 0%, #00F3AE 100%)!important;
}
.more-lottery{
    li{
      &.is-active{
        background:#1486ff ;
        color: #fff;
      }
    }
  }
  #dsRecord,#userTzRecord{
  .green-fy-bg{
    .el-pager{
      li.active{
        background: linear-gradient(90deg, #08D99D 0%, #00F3AE 100%)!important;
      }
    }
  }
  .pink-fy-bg{
    .el-pager{
      li.active{
        background: linear-gradient(90deg, #FB7772 0%, #FF9995 100%)!important;
      }
    }
  }
  .blue-fy-bg{
    .el-pager{
      li.active{
        background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%)!important;
      }
    }
  }
  }
  #userTzRecord{
    .green-sele-bg,.blue-sele-bg,.pink-sele-bg{
    .el-input--suffix{
      .el-input__suffix{
        .el-input__suffix-inner{
            .el-select__caret:before{
              content: ''!important;
              // background: linear-gradient(90deg, #08D99D 0%, #00F3AE 100%)!important;
              border: 8px solid transparent!important;
              border-top: 8px solid #09B584 !important;
              height:0 !important ;
              width: 0 !important;
              position: absolute!important;
              right: 5px!important;
              top: 12px!important;
            }
        }
      }
    }
    .el-scrollbar{
      .el-select-dropdown__wrap{
        
        ul{
          li.hover{
            color:#09B584 !important;
          }
        }
      }
    }
    }
    .blue-sele-bg{
    .el-input--suffix{
      .el-input__suffix{
        .el-input__suffix-inner{
            .el-select__caret:before{
              border-top: 8px solid #00B4D8 !important;
            }
        }
      }
    }
    }
    .pink-sele-bg{
    .el-input--suffix{
      .el-input__suffix{
        .el-input__suffix-inner{
            .el-select__caret:before{
              border-top: 8px solid #FB7772 !important;
            }
        }
      }
    }

    }
  }
  .pink-op-bg,.pink-lg-bg{
    border-top: 3px solid #FB7772 !important;
         .el-scrollbar{
      .el-select-dropdown__wrap{
        .el-scrollbar__view{
          .el-select-dropdown__item:hover{
            color:#FB7772 !important;
          }
        }
      }
    }
  }
 .pink-op-bg.el-popper[x-placement^="bottom"] .popper__arrow::after,
 .pink-lg-bg.el-popper[x-placement^="bottom"] .popper__arrow::after{
   border-bottom-color:#FB7772  !important;
    top: -0.5px !important;
 }
 

  // .blue-dr-bg{
  //   // border-top: 3px solid #00B4D8 !important;
  //        .el-scrollbar{
  //     .el-select-dropdown__wrap{
  //       .el-scrollbar__view{
  //         .el-select-dropdown__item:hover{
  //           color:#00B4D8 !important;
  //         }
  //       }
  //     }
  //   }
  // }
  .blue-lg-bg.el-popper[x-placement^="bottom"] .popper__arrow::after,
 .blue-op-bg.el-popper[x-placement^="bottom"] .popper__arrow::after,
 .blue-dr-bg.el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #00B4D8 !important;
    top: -0.5px !important;}
  .green-op-bg,.green-lg-bg{
    border-top: 3px solid #09B584  !important;
         .el-scrollbar{
      .el-select-dropdown__wrap{
        .el-scrollbar__view{
          .el-select-dropdown__item:hover{
            color:#09B584 !important;
          }
        }
      }
    }
  }
.green-lg-bg.el-popper[x-placement^="bottom"] .popper__arrow::after,
 .green-op-bg.el-popper[x-placement^="bottom"] .popper__arrow::after,
 .green-dr-bg.el-popper[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #09B584  !important;
    top: -0.5px !important;
    }
 .green-lg-bg{
   ul{
         li{
            background: #02C68E!important;
            &:nth-of-type(2n){
                background: #00CF9D!important;
            }
            >span{
                background: #08AD7E!important;      
            }
        }
   }
 }
 .pink-lg-bg{
   ul{
         li{
            background: #F2716C!important;
            &:nth-of-type(2n){
                background: #FF837E!important;
            }
            >span{
                background: #EB605B!important;    
            }
        }
   }
 }
 .blue-lg-bg{
   ul{
         li{
            background: #05B3D6!important;
            &:nth-of-type(2n){
                background: #2EC0DD!important;
            }
            >span{
                background: #02A2C1!important;   
            }
        }
   }
 }
</style>
