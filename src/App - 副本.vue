<template>
  <div id="app">
    <Header v-if="isShow" />
    <div class="pt9">
      <router-view :key="keysV"></router-view>
    </div>

    <!-- 侧边导航 -->
    <div
      class="nav clearfix"
      v-if="$route.name == 'introduce' ? false : true"
      style="right: 0px !important"
    >
      <!-- <div class="sj" @click="navHide">
        <img v-show="isNav" src="./assets/imgaes/an1.png" alt />
        <img v-show="!isNav" src="./assets/imgaes/an4.png" alt />
      </div> -->
      <div v-show="isNav" class="nav-list fr">
        <div>
          <!-- <div class="line-box" @mouseover="pingShow()" @mouseout="pingHide()">
            <div class="line img1"></div>
            <div>Đường dây</div>
            <div class="line-list" >
              <ul>
                <li v-for="(v, index) in lineList">
                  <a :href=" v.url" target="_blank">
                    <div class="clearfix">
                      <div class="fl origin"></div>
                      <div class="fl">
                        <div style="font-size:14px">{{ v.tit }}</div>
                        <div
                          style="font-size:12px"
                          :class="v.speed >= 100 ? 'redcolor' : 'glcolor'"
                        >{{ v.speed }}ms</div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div> -->
          <!-- <div class="line2">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <div class="line"></div>
                <div>Đường dây</div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div class="line-list">
                  <ul>
                    <li v-for="(v, index) in lineList">
                      <a :href="'http://' + v.url" target="_blank">
                        <div class="clearfix">
                          <div class="fl origin"></div>
                          <div class="fl">
                            <div style="font-size:14px">{{ v.tit }}</div>
                            <div
                              style="font-size:12px"
                              :class="v.speed >= 100 ? 'redcolor' : 'glcolor'"
                            >
                              {{ v.speed }}ms
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
          <!-- <div class="line3">
            <el-popover placement="left" width="70" trigger="hover">
              <div
                class="line-list"
              >
                <ul>
                  <li v-for="(v, index) in lineList">
                    <a :href="'http://' + v.url" target="_blank">
                      <div class="clearfix">
                        <div class="fl origin"></div>
                        <div class="fl">
                          <div style="font-size:14px">{{ v.tit }}</div>
                          <div
                            style="font-size:12px"
                            :class="v.speed >= 100 ? 'redcolor' : 'glcolor'"
                          >
                            {{ v.speed }}ms
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <el-button slot="reference">click 激活</el-button>
            </el-popover>
          </div> -->
          <!-- <div class="kefu-box">
            <a
              target="_blank"
              :href="customer"
            >
              <div class="kefu img1"></div>
              <div>在线客服</div>
            </a>
          </div>
          <div class="qq-box" v-if="rightLink.qq">
            <a target="_blank" :href="rightLink.qq">
              <div class="qq img1"></div>
              <div>QQ客服</div>
            </a>
          </div> -->
          <!-- <div class="tencent-box" @mouseenter="codeShow()" @mouseleave="codeHide()">
            <div class="tencent img1"></div>
            <div>公众号</div>
            <div class="tencent-code">
            </div>
          </div> -->
          <!-- <div class="relation-box" @mouseenter="relationShow()" @mouseleave="relationHide()">
            <div class="relation img1"></div>
            <div>联系我们</div>
          </div>
          <div class="line-box" v-if="rightLink.proxy" @mouseover="relationShowJMDL()" @mouseout="relationHideJMDL()">
            <div class="lineDL img1"></div>
            <div>加盟代理</div>
            <div class="relation-list" id="relationJMDL" :class="!rightLink.qq?'noQQDL':''">
              <div class="dlDH">
                <a target="_blank" :href="rightLink.proxy.url">立即联系</a>
              </div>
              <div class="dlQQ">代理QQ:{{rightLink.proxy.qq}}</div>
            </div>
          </div>

          <div class="relation-box" @mouseenter="isShowCallTel=true" @mouseleave="isShowCallTel=false;">
              <div class="callBack img1"></div>
              <div>回电服务</div>

        
            <div class="call-back-container" v-if="isShowCallTel">
              <i class='xt'></i>
              <div class="call-back-content">
                
                <p class="tip">我们提供7*24小时的电话客服回电服务，如果您在使用本平台时遇到问题， 请选择您的问题类型和希望的客服语言，我们将在第一时间给您致电！</p>
                <div class="back-content">
                   
                    <div class="back-content-item">
                      <span>反馈类型：</span>
                      <div class="type-box">
                        <span v-for="(v,index) in quesList" :key="index" @click='selectQuesType($event,v.id)'>{{v.title}}</span>
                      </div>
                    </div>
                    <div class="back-content-item lan-tiem">
                      <span>选择语言：</span>
                      <div class="type-box">
                        <span v-for="(v,index) in lanList" :key="index" :class="v.is_check?'active':''"  @click="changeLan($event,v)">{{v.title}}</span>
                      </div>
                    </div>
                    <div class="back-content-item">
                      <span>会员账号：</span>
                      <div class="type-box">
                        <input type="tel" placeholder="Vui lòng gửi tài khoản thành viên"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="11" v-model="memberAccount">
                      </div>
                    </div>
                    <div class="back-content-item">
                      <span>电话号码：</span>
                      <div class="type-box">
                        <input type="text" placeholder="Số điện thoại di động hoặc số điện thoại cố định"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="12" v-model="tel">
                      </div>
                    </div>
                </div>
                <el-button class="custom-btn" style="
        background: linear-gradient(90deg, #559CFF, #4BE5EE)!important;color:#fff" :loading="btnLoading" @click="getCallBack">提交信息</el-button>
            </div>
            </div>
          </div> 
          <div class="fanhui-box" v-if="top == true" @click="backTop()">
            <div class="fanhui img1"></div>
            <div>返回顶部</div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="nav nav-left clearfix" v-if="$route.name == 'introduce'?false:true">
      <div class="sj-left" v-if="rightLink.fd_gif != '' && rightLink.fd_gif != null" @click="navHideLeft" :style="!isNav1 ? 'left:0':''">
        <img v-show="isNav1" src="./assets/imgaes/main/nav-left.png" alt />
        <img v-show="!isNav1" src="./assets/imgaes/main/nav-left1.png" alt />
      </div>
      <div v-show="isNav1" class="nav-list fr">
        <div>
          <div class="dl-box" v-if="rightLink.fd_gif != '' && rightLink.fd_gif != null">
              <div class="dl-icon img1"></div>
              <div>代理政策</div>
              <div class="dlzc-img">
                <img v-lazy="rightLink.fd_gif.image_url" alt="">
              </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="code-box" id="code">
      <img src="./assets/imgaes/main/nav-code.png" alt />
    </div>
    <div
      class="relation-list"
      id="relation"
      :class="rightLink.qq ? '' : 'noQQ'"
    >
      <div class="tel">
        <span>Điện thoại Quốc tế</span>
        <span>{{ rightLink.tel }}</span>
      </div>
      <div class="email">
        <span>Tài khoản Email </span>
        <span>{{ rightLink.email ? rightLink.email : "暂无" }}</span>
      </div>
    </div>
    <div class="pthdGG" v-if="isShowAd" @click="isShowAd = false"></div>
    <div class="ptgg-box" v-if="isShowAd">
      <img :src="ptImg" class="pthdImg" alt="" id="pthdImg" />
      <i class="gb-icon" @click="closePthd()"></i>
      <p>{{ count }}秒内关闭</p>
    </div>
    <div
      class="notice-box"
      v-if="noticeShow2 && $store.state.codeToken && noticeData"
    >
      <div class="notice">
        <div class="notice-close" @click="hideNotice">
          <img src="./assets/imgaes/notice_close.png" alt="" srcset="" />
        </div>
        <div class="title">
          <h1 v-if="noticeTypes == 1">官方公告</h1>
          <h1 v-else>代理公告</h1>
        </div>
        <div class="notice-content">
          <div class="notice-menu">
            <ul>
              <li
                :class="{ active: menuActive == index }"
                v-for="(item, index) in noticeData"
                @click="menuActive = index"
              >
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
          <div class="notice-text">
            <el-scrollbar style="height: 356px">
              <div
                class="content-text"
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
    <div v-show="isCJ" class="isCJ-box">
      <img src="../src/assets/imgaes/cj.gif" alt="" />
    </div>
    <!-- 注册送红包了 -->
    <!-- <div class="zc-hb" v-if="!$store.state.codeToken && showZC && webInitData.redpaper_pop == true">
      <div>
      <i @click="closeZC()" class="zc-close-icon"></i>
      <div v-show="zcGif && noticeTypes == 1" @click="goRegister()"><img src="./assets/imgaes/zc.gif" alt=""></div>
      <div v-show="zcGif && noticeTypes == 2" @click="goRegister()"><img src="./assets/imgaes/zc18.gif" alt=""></div>
      <div v-show="zcRend" @click="showZCGif()" ><img  src="./assets/imgaes/11111.png" alt=""></div>
      <div v-show="zcLQ && noticeTypes == 1" @click="goRegister()"><img  src="./assets/imgaes/2222.png" alt=""></div>
      <div v-show="zcLQ && noticeTypes == 2" @click="goRegister()"><img  src="./assets/imgaes/zc18.png" alt=""></div>
      <p class="clearfix"><i class="check-icon fl" @click="selectIndex = !selectIndex" :class="selectIndex?'active':''"></i><i class="fl">不再弹出</i></p>
      </div>
    </div> -->
    <!-- 贵族升级和转盘活动 -->
    <div class="vip-upgrade" v-if="platformShow">
      <p>{{ platformMsg }}</p>
    </div>

    <!-- <div class="gd-notice">
      <div>
        <span> <img src="./assets/imgaes/main/gg_icon.png" alt="" srcset="" style="height:auto"> 公告</span>
      </div>
       <marquee scrollAmount="6" scrolldelay="50" direction="left">
                      <span  v-if="notice.length" v-for="(item,index) in notice" style="margin-right:4px">
                       {{index+1}}.{{item.content}}
                      </span>
                      <span v-if="!notice.length">暂无公告</span>
       </marquee>
    </div> -->

    <Footer v-if="isShow && footerShow" />
    <LeftNav />
    <newLogin v-if="showLogin"></newLogin>
    <!-- <LeftNav :lineList="lineList1" :rightLink="rightLink"></LeftNav> -->
    <!-- <tyPop v-if="isPoptyShow"></tyPop> -->
  </div>
</template>

<script>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import LeftNav from "./components/leftNav.vue";
import newLogin from "./views/login/newLogin.vue";
import tyPop from "./components/popTY.vue";
import { mapState, mapMutations } from "vuex";
import {
  removeAllactive,
  getSiblings,
  alertServe,
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
      // speed: 0 ,//ping速度
      lineList: [
        // { tit: "线路1", url: "", speed: 50 },
        // { tit: "线路2", url: "", speed: 50 },
        // { tit: "线路3", url: "", speed: 50 },
        // { tit: "线路4", url: "", speed: 50 }
      ],
      top: false, //返回顶部
      // socketPath:'wss://www.lgadmin561.com/wss_notice',//生产环境7.27换
      socketPath: "ws://47.244.212.147/wss_notice", //测试环境10.1
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
      noticeData: "",
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
      platformShow: false,
      platformMsg: "",
      notice: [],
      memberAccount: "",
      websock: null,
      // lineList1:[]
    };
  },

  components: { Header, Footer, LeftNav, newLogin, tyPop },

  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },

  created() {
    if (
      this.$route.query.market_code &&
      this.$route.query.market_code != "undefined"
    )
      localStorage.setItem("market_code", this.$route.query.market_code);
    this.convert();
    this.checkRouter();
    this.noLogin();
    this.initWebSocket();
    this.getLan();
    this.getQues();

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
    // this.getkefuUrL();
    // this.ping()
    if (
      this.$route.path == "/login" ||
      this.$route.path == "/fPwdTel" ||
      this.$route.path == "/register" ||
      this.$route.path == "/RegisterDl"
    )
      document.body.style.background = "#fff";
    else document.body.style.background = "#f4f5f8";
    // this.ping('www.lgzb16.com')
    // //console.log(this.lineList)
    // this.$msgbox.hide();
    // setInterval(()=>{
    //   if (!this.$store.state.codeToken) {
    //     alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
    //       this.$store.commit('SETLOGIN',true);
    //     });
    //     return;
    //   }
    // },300000);

    //  this.$confirm('socketData.data.msg','Yêu cầu thành công', {
    //         confirmButtonText: '确定',
    //         confirmButtonClass:'yqmConfirm1',
    //         roundButton:true,
    //         customClass:'yqmBox',
    //         center: true,
    //         showCancelButton:false,
    //         dangerouslyUseHTMLString:true
    //     }).then(() => {
    //       //  this.websocketsend(JSON.stringify(isSuccessDate));

    //     }).catch(() => {

    //     });

    this.getXsType();
    if (this.$route.name == "home") {
      this.isShowAd = true;
    } else if (this.isPure == 1 && this.$route.name == "gameCenter") {
      this.isShowAd = true;
    } else {
      this.isShowAd = false;
    }
    if (this.zcGifShow != 1) {
      this.showZC = true;
    } else {
      this.showZC = false;
    }
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
    ]),
    keysV() {
      return this.$route.path + Math.random();
    },
  },
  mounted() {
    // //console.log(this.$store.state.userinfo.user_id)
    // 检测浏览器路由改变页面不刷新问题,hash模式的工作原理是hashchange事件
    window.addEventListener(
      "hashchange",
      () => {
        let currentPath = this.routerArr[this.routerArr.length - 2];
        // alert(this.$route.path);
        // alert(window.location.hash.slice(1));
        // alert(currentPath);
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
    this.socketSetInterval = setInterval(() => {
      // console.log(_this.websock)
      if (this.websock.readyState == 1 || this.websock.readyState == 2) {
        let pingData = { type: "ping", client_id: this.socketData.client_id };
        this.websocketsend(JSON.stringify(pingData));
      } else if (this.websock.readyState == 3) {
        this.initWebSocket();
      }
    }, 20000);

    // var _this = this;
    // window.addEventListener('load',function(){
    //   var img = document.querySelectorAll('.pthdImg');
    //   if(img[0].height > 0){
    //       if(_this.ptggImg == true){
    //         setTimeout(()=>{
    //            _this.SETPTGG(false);
    //         },10000);
    //       }
    //   }

    //   // console.log(img[0].clientWidth)
    // })
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
    ]),
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
        this.noticeData = res.data.data;
        this.noticeShow = true;
      }
    },
    //获取代理系统公告
    async getDlXtNotice() {
      let res = await this.$http.get("/api/live/sport/get_pop_notice_dl");
      if (res && res.data.code == 1) {
        this.noticeData = res.data.data;
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
    //获取语言列表
    async getLan() {
      let res = await this.$http.get(this.versionLive2 + "user/language_list/");
      if (res.data.code == 1) {
        this.lanList = res.data.data || [];
        for (let i = 0, len = this.lanList.length; i < len; i++) {
          if (this.lanList[i].is_check) this.currLan = this.lanList[i].id;
        }
      } else {
      }
    },
    //获取问题列表
    async getQues() {
      let res = await this.$http.get(
        this.versionLive2 + "user/feedback_type_list/"
      );
      if (res.data.code == 1) {
        // console.log(res)
        this.quesList = res.data.data;
      } else {
      }
    },
    //提交回电问题
    async getCallBack() {
      if (!this.selectQues.length) {
        this.$message({
          message: "Vui lòng chọn loại câu hỏi phản hồi",
          type: "warming",
        });
        return;
      }
      if (this.currLan < 0) {
        this.$message({
          message: "Vui lòng chọn ngôn ngữ",
          type: "warming",
        });
        return;
      }
      if (!this.tel) {
        this.$message({
          message: "Vui lòng điền số điện thoại của bạn",
          type: "warming",
        });
        return;
      }
      this.btnLoading = true;
      let res = await this.$http.get(this.versionLive2 + "user/call_back/", {
        params: {
          type_id: this.selectQues.join(","),
          lang_id: this.currLan,
          issue_phone: this.menuActive,
          phone: this.tel,
        },
      });
      this.btnLoading = false;
      this.$message({
        message: res.data.msg,
        type: "success",
      });
      if (res.data.code == 1) {
        this.isShowCallTel = false;
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
            tit: "Đường dây" + (i + 1),
            speed: 50,
          });
        }
        for (var i = 0; i < this.lineList.length; i++) {
          this.ping(this.lineList[i], i);
        }
        this.SETXLLINKS(this.lineList);
        // console.log(this.lineList)
        if (this.isShowAd == true) {
          let trv = setInterval(() => {
            this.count--;
            if (this.count == 0) {
              clearInterval(trv);
              this.isShowAd = false;
            }
          }, 1000);
        }
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
            tit: "Đường dây" + (i + 1),
            speed: 50,
          });
        }
        for (var i = 0; i < this.lineList.length; i++) {
          this.ping(this.lineList[i], i);
        }
        this.SETXLLINKS(this.lineList);
        // console.log(this.lineList)
        if (this.isShowAd == true) {
          let trv = setInterval(() => {
            this.count--;
            if (this.count == 0) {
              clearInterval(trv);
              this.isShowAd = false;
            }
          }, 1000);
          // setTimeout(()=>{
          //   this.isShowAd = false;
          //   clearInterval(t);
          // },5000);
        }
      }
    },
    async getkefuUrL() {
      let res = await this.$http.get("/api/common/siteConfig", {
        params: {
          client: 4,
          version: "3.2.1",
        },
      });
      if (res && res.data.code == 1) {
        this.kefuUrL = res.data.data.customer;
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
        this.$route.name == "login" ||
        this.$route.name == "introduce" ||
        this.$route.name == "register" ||
        this.$route.name == "RegisterDl" ||
        this.$route.name == "Pwdlogin" ||
        this.$route.name == "fPwdTel"
      ) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      //不显示footer组件
      if (
        this.$route.name == "userMsg" ||
        this.$route.name == "introduce" ||
        this.$route.name == "hostHome" ||
        this.$route.name == "expertMsg"
      ) {
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
      // if('')
      // setTimeout(function() {
      //   code.style.display = "none";
      // }, 1000);
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
      // let wsServer = `${location.protocol == 'https:' ? 'wss' : 'ws'}://${location.host}/wss_notice`;
      let wsServer = location.protocol.includes("https")
        ? "wss://" + location.host + "/wss_notice"
        : "ws://" + location.host + "/wss_notice";
      this.websock = new WebSocket(wsServer);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage: function (e) {
      let socketData = JSON.parse(e.data);
      if (socketData.type == "connected") {
        // this.$store.state.userinfo.user_id
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
      if (socketData.type == "ServerPush") {
        if (socketData.dataType == "open_lottery_push") {
          // console.log(socketData);
          this.SETOPENNUM(socketData.data.msg_id);
          // console.log(socketData.data.msg_id)
          this.ServerPushType = false;
          this.lotteryMsg = socketData.data.msg;
          this.$message({
            message: this.lotteryMsg,
            duration: 5000,
          });
          let confirmData = {
            type: "confirm",
            event: "open_lottery_push",
            client_id: this.socketData.client_id,
            user_id: this.$store.state.userinfo.user_id,
            msg_id: socketData.data.msg_id,
          };
          this.websocketsend(JSON.stringify(confirmData));
        }
        if (socketData.dataType == "anchor_open_push") {
          this.ServerPushType = true;
          this.nickName = socketData.data.anchor_nickname;
          this.$message({
            message: "您关注的“" + this.nickName + "”主播已开播",
            duration: 5000,
          });
        }
        if (socketData.dataType == "pop_result_push") {
          // this.InvitationSucc = true;
          let isSuccessDate = {
            type: "confirm",
            event: "pop_result_push",
            client_id: this.socketData.client_id,
            user_id: this.$store.state.userinfo.user_id,
            msg_id: socketData.data.msg_id,
          };
          if (socketData.data.is_success == true) {
            this.$confirm(socketData.data.msg, "申请成功", {
              confirmButtonText: "Xác nhận",
              confirmButtonClass: "yqmConfirm1",
              roundButton: true,
              customClass: "yqmBox",
              center: true,
              showCancelButton: false,
              dangerouslyUseHTMLString: true,
            })
              .then(() => {
                this.websocketsend(JSON.stringify(isSuccessDate));
              })
              .catch(() => {});
          } else {
            this.$confirm(socketData.data.msg, "Yêu cầu thất bại ", {
              confirmButtonText: "联系客服",
              confirmButtonClass: "yqmConfirm",
              cancelButtonText: "Hủy",
              cancelButtonClass: "yqmCancel",
              roundButton: true,
              customClass: "yqmBox",
              center: true,
            })
              .then(() => {
                this.websocketsend(JSON.stringify(isSuccessDate));
              })
              .catch(() => {
                this.websocketsend(JSON.stringify(isSuccessDate));
                window.open(localStorage.getItem("customer"));
              });
          }
        }
        if (socketData.dataType == "lottery_closing_push") {
          this.SETCLOSEDATA(socketData.data);
        }
        if (socketData.dataType == "jackpot_msg_push") {
          // let cjBox ;
          // console.log('彩金')
          if (cjBox) {
            clearTimeout(cjBox);
          }
          this.isCJ = true;
          let cjBox = setTimeout(() => {
            this.isCJ = false;
          }, 4500);
          let confirmData = {
            type: "confirm",
            event: "jackpot_msg_push",
            client_id: this.socketData.client_id,
            user_id: this.$store.state.userinfo.user_id,
            msg_id: socketData.data.msg_id,
          };
          this.websocketsend(JSON.stringify(confirmData));
        }
        if (socketData.dataType == "platform_notice_msg_push") {
          this.platformMsg = socketData.data.msg;
          this.platformShow = true;
          setTimeout(() => {
            this.platformShow = false;
          }, 10000);
        }
        if (socketData.dataType == "dragon_bet_push") {
          //  console.log(socketData.data)
          this.SETCLPK(socketData.data);
        }
        //  if (window.timer_push_out)
        //       clearTimeout(window.timer_push_out);
        //     window.timer_push_out = setTimeout(() => {
        //       this.show10 = false;
        //     }, 4000);
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

        // if(this.$route.query.market_code&&this.$route.query.market_code!='undefined'){
        //   this.$router.push('/register?market_code='+this.$route.query.market_code)
        // }else{
        //   this.$router.push('/register?market_code=')
        // }
      } else {
        this.$store.commit("SETLOGIN", true);
        this.$store.commit("SETISLOGIN", false);
        // this.$router.push('/RegisterDl?market_code=')
        // if(this.$route.query.market_code&&this.$route.query.market_code!='undefined'){
        //   this.$router.push('/RegisterDl?market_code='+this.$route.query.market_code)
        // }else{
        //  this.$router.push('/RegisterDl?market_code=')
        // }
      }
      if (this.selectIndex) {
        this.showZC = false;
        this.SETZCGIF(false);
      } else {
        this.showZC = false;
      }
    },
    closeZC() {
      // this.SETZCGIF(false)
      // selectIndex
      // console.log(this.selectIndex)
      if (this.selectIndex == true) {
        this.showZC = false;
        // console.log(this.showZC)
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
      // console.log(333);
      let loginData = {
        type: "login",
        client_id: this.socketData.client_id,
        user_id: i ? i : 0,
        client_type: "WEB",
      };
      this.websocketsend(JSON.stringify(loginData));
    },
  },
};
</script>

<style lang="less">
.notice-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(128, 128, 128, 0.5);
  z-index: 9991;
  top: 0;
  left: 0;
  .notice {
    width: 560px;
    height: 515px;
    background: url("./assets/imgaes/notice_bg.png") no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .notice-close {
      cursor: pointer;
      position: absolute;
      top: 100px;
      right: -50px;
    }
    .title {
      margin-top: 62px;
      color: #fff;
      text-align: center;
      h1 {
        letter-spacing: 2px;
      }
    }
    .notice-content {
      display: flex;
      height: 356px;
      margin-top: 76px;
      .notice-menu {
        width: 26%;
        border-right: 1px solid #bbbbbb;
        ul {
          li {
            text-align: center;
            height: 58px;
            line-height: 58px;
            font-size: 16px;
            cursor: pointer;
          }
          .active {
            color: #fff;
            background: linear-gradient(90deg, #ff5b54 0%, #ffa294 100%);
          }
        }
      }
      .notice-text {
        width: 100%;
        padding: 0px 20px 10px 20px;
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
  width: 252px !important;
  margin: 12px auto 0;
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
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      overflow: hidden;
      margin: 0 auto;
    }
    .zh-icon {
      display: block;
      padding-left: 35px;
      font-size: 18px;
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
      font-size: 18px;
      font-weight: bold;
      color: #1486ff;
      cursor: pointer;
      background: #fff;
    }
  }
  .gr_exNew {
    line-height: 30px;
  }
  .gr_xinxi {
    text-align: center;
    padding: 55px 0 14px 0;
    div {
      width: 84px;
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
        top: -35px;
        left: 31px;
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

.el-dropdown-menu__item {
  // padding: 0 36px!important;
  width: 143px !important;
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
  top: 0 !important;
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
    width: 260px;
    height: 42px;
    border: none;
    background: #f5f5f5;
    color: #333333;
    border-radius: 4px;
    line-height: 42px;
  }
  .el-textarea__inner {
    width: 592px;
    height: 94px;
    border: none;
    font-size: 14px;
    background: #f5f5f5;
    color: #333333;
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
// 六合彩
.redBg1 {
  background: linear-gradient(0deg, #e97270, #d32c20) !important;
  background: -webkit-linear-gradient(0deg, #e97270, #d32c20) !important;
  background: -o-linear-gradient(0deg, #e97270, #d32c20) !important;
  background: -moz-linear-gradient(0deg, #e97270, #d32c20) !important;
}
.greenBg1 {
  background: linear-gradient(0deg, #add180, #398015) !important;
  background: -webkit-linear-gradient(0deg, #add180, #398015) !important;
  background: -o-linear-gradient(0deg, #add180, #398015) !important;
  background: -moz-linear-gradient(0deg, #add180, #398015) !important;
}
.blueBg1 {
  background: linear-gradient(0deg, #88cffa, #3176f6) !important;
  background: -webkit-linear-gradient(0deg, #88cffa, #3176f6) !important;
  background: -o-linear-gradient(0deg, #88cffa, #3176f6) !important;
  background: -moz-linear-gradient(0deg, #88cffa, #3176f6) !important;
}
// 六合彩
.redBg {
  background: #ff1c30 !important;
}
.greenBg {
  background: #00d16c !important;
}
.blueBg {
  background: #0084ff !important;
}

//首页主播标签
.yanzhibgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -266px;
  background-size: 700px 700px;
}
.tianmeibgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -207px;
  background-size: 700px 700px;
}
.lianhongbgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -147px;
  background-size: 700px 700px;
}
.zhuanyebgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -326px;
  background-size: 700px 700px;
}
.qingchunbgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -177px;
  background-size: 700px 700px;
}
.sexybgColor {
  background: url("./assets/imgaes/allIcon.png") no-repeat;
  background-position: -93px -237px;
  background-size: 700px 700px;
}
.xinrenColor {
  background: url("./assets/imgaes/main/new-min.png") no-repeat;
}
.zhuanjiaColor {
  font-size: 20px !important;
}
//资讯分类
.zhibobgColor {
  color: #d444f3 !important;
  background: #ede5f9 !important;
}
.huodbgColor {
  color: #fd8208 !important;
  background: #fff9e8 !important;
}
.gonggbgColor {
  color: #79818c !important;
  background: #f5f7fa !important;
}
.zixunbgColor {
  color: #ff513e !important;
  background: #ffece8 !important;
}
.commm {
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
    top: 115px;
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
.bankDate {
  height: 40px !important;
  line-height: 40px !important;
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

//投注单独页
#lotteryGame {
  .el-tabs--card > .el-tabs__header {
    width: 100% !important;
    border-radius: 0 !important;
  }
  .el-tabs__header .is-top {
    background: linear-gradient(0deg, #ff423c, #ff7e65) !important;
    color: #fff !important;
    height: 36px !important;
    line-height: 36px !important;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    background: #f4f5f8 !important;
    color: #ff1c30 !important;
  }
  .el-scrollbar {
    padding-bottom: 0 !important;
    // margin-right: 2px!important;
  }
  .el-dropdown-menu__item {
    text-align: center !important;
    width: 100px !important;
    line-height: 44px !important;
    padding-left: 0px !important;
    text-align: center !important;
  }
  .tou-list-box-fl {
    .five-bd {
      .tou-tit-fl {
        border-right: 1px solid #aaa !important;
      }
      ul {
        li {
          border-right: 1px solid #aaa !important;
        }
      }
    }
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
.el-message-box.zdzz-confirm {
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
    .el-button:nth-child(1) {
      background: #eeeeee !important;
      color: #000;
    }
  }
}

.confirmBtn,
.cancelBtn {
  width: 30% !important;
  border-radius: 100px !important;
  color: #fff !important;
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

//平台广告
.pthdGG {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
}
.ptgg-box {
  width: 1100px;
  height: 600px;
  position: fixed;
  z-index: 10001;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  img {
    width: 100%;
  }
  .gb-icon {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: url("./assets/imgaes/pthdgb.png") no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  p {
    position: absolute;
    font-size: 18px;
    text-align: center;
    bottom: -40px;
    color: #fff;
    width: 100%;
  }
}
.call-back-container {
  position: absolute;
  right: 70px;
  top: 115px;
  width: 600px;
  height: 450px;
  overflow-y: visible;
  .call-back-content {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 600px;
    border-radius: 10px;
    max-height: 450px;
    overflow-y: auto;
    background: #fff;
    padding: 15px 30px;
  }

  .xt {
    content: "";
    position: absolute;
    background: url("./assets/imgaes/main/nav-f.png") no-repeat;
    background-size: contain;
    // width: 20px;
    // height: 39px;
    // right: -20px;
    // top: 200px;
    width: 9px;
    height: 19px;
    right: 1px;
    top: 230px;
  }
  p.tip {
    font-size: 16px;
    color: #999;
  }
  .back-content {
    .back-content-item {
      line-height: 40px;
      input {
        width: 410px;
        height: 40px;
        background: #ffffff;
        border: 1px solid #d3d3d3;
        border-radius: 4px;
        color: #cacaca;
        font-size: 16px;
        padding: 0 15px;
      }
      overflow: hidden;
      margin-top: 10px;
      > span {
        font-size: 20px;
        color: #999;
        float: left;
      }
      .type-box {
        float: left;
        width: 400px;
        text-align: left;
        span {
          padding: 0 10px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #999;
          font-size: 16px;
          background: #fff;
          border: 1px solid #d3d3d3;
          border-radius: 4px;
          display: inline-block;
          margin: 0 10px 5px 0;
          cursor: pointer;
          &.active,
          &:hover {
            background: linear-gradient(90deg, #ff5b54, #ffa193);
            color: #fff;
          }
        }
      }
    }
  }
  .custom-btn {
    margin-top: 30px;
  }
}

//福彩3D，排列三
.fc-bgColor {
  background: linear-gradient(180deg, #db2525, #ff5c5c) !important;
}
//彩金
.isCJ-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9000;
  height: 100%;
  width: 100%;
  top: 0;
  // left: 50%;
  // transform: translateX(-50%);
  img {
    position: absolute;
    top: 12.5%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.vip-upgrade {
  position: fixed;
  top: 194px;
  // right: 200px;
  z-index: 999;
  width: 435px;
  height: 80px;
  background: url("./assets/imgaes/zj_bg.png") no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  animation: upgrade 10s linear;
  p {
    padding-left: 88px;
    padding-right: 52px;
  }
}
@keyframes upgrade {
  from {
    right: -435px;
  }
  to {
    right: 100%;
  }
}
//注册
.zc-hb {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9000;
  height: 100%;
  width: 100%;
  top: 0;
  .zc-close-icon {
    display: block;
    position: absolute;
    width: 52px;
    height: 51px;
    background: url("./assets/imgaes/close-zc.png") no-repeat;
    background-size: contain;
    right: 15%;
    top: 10%;
  }
  p {
    color: #fafafa;
    font-size: 28px;
    line-height: 28px;
    position: absolute;
    left: 50%;
    transform: translateX(-78%);
    .check-icon {
      width: 27px;
      height: 26px;
      background: url("./assets/imgaes/check-zc.png") no-repeat;
      background-size: contain;
      margin-right: 10px;
      margin-top: 2px;
      &.active {
        position: relative;
        &:before {
          position: absolute;
          content: "";
          width: 27px;
          height: 26px;
          background: url("./assets/imgaes/select-zc.png") no-repeat;
          background-size: contain;
          left: 0;
          top: 0;
        }
      }
    }
    i {
      display: block;
    }
  }
  > div {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -20px;
    img {
      width: 85%;
    }
  }
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
    border-radius: 0px 8px 8px 0px;
    left: 0;
  }
  .el-carousel__arrow--right {
    border-radius: 8px 0px 0px 8px;
    right: 0;
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
  padding-top: 90px;
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

.popty {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9990;
  background: rgba(0, 0, 0, 0.5);
  .popMain {
    position: relative;
    width: 509px;
    height: 682px;
    left: 50%;
    top: 48%;
    margin-left: -255px;
    margin-top: -341px;
    // background: #E8EBF3;
    border-radius: 0px 0 5px 5px;
    padding: 15px 0;
    .closeTy {
      position: absolute;
      top: 23px;
      right: -35px;
      cursor: pointer;
    }
    .head {
      width: 100%;
    }
    .listMain {
      background: #e8ebf3;
      padding: 15px 0 1px 0;
      position: relative;
      top: -6px;
      .tiylb {
        cursor: pointer;
        position: relative;
        width: 485px;
        height: 132px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #d2e2f1;
        box-sizing: border-box;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        margin-bottom: 15px;
        .jb {
          position: absolute;
          top: -8px;
          left: -8px;
          float: left;
          width: 100px;
          height: 100px;
          &.im-icon {
            background: url("./assets/imgaes/im-icon.png") no-repeat;
            background-size: contain;
          }
          &.sb-icon {
            background: url("./assets/imgaes/sb-icon.png") no-repeat;
            background-size: contain;
          }
          &.sbo-icon {
            background: url("./assets/imgaes/sbo-icon.png") no-repeat;
            background-size: contain;
          }
          &.cmd-icon {
            background: url("./assets/imgaes/cmd-icon.png") no-repeat;
            background-size: contain;
          }
          &.bbin-icon {
            background: url("./assets/imgaes/bbin-icon.png") no-repeat;
            background-size: contain;
          }
        }
        .vssj {
          // width: 100%;
          // position: relative;
          // left: -34px;
          // top: 20px;
          padding: 20px 0 0 43px;
          div {
            display: inline-block;
            span {
              display: block;
            }
            .tx {
              width: 70px;
              height: 70px;
              border-radius: 50%;
              border: 0.5px solid #a5a8a8;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 40px;
                align-items: center;
              }
            }
            .qbm {
              font-size: 16px;
              line-height: 21px;
              color: #7787a5;
              padding-top: 5px;
            }
          }
          .leftTx {
            width: 70px;
            text-align: center;
          }
          .rightTx {
            width: 70px;
            text-align: center;
          }
          .vs {
            width: 248px;
            text-align: center;
          }
        }
      }
    }
  }
  .btnBox {
    margin-top: 5px;
    span {
      display: inline-block;
      width: 50%;
      height: auto;
      cursor: pointer;
    }
  }
}
</style>
