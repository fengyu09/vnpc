<template>
  <div id="header" :class="[{'header-pink':skin ==1},{'header-blue':skin ==2},{'header-green':skin ==3}]">
     <!-- 顶部 -->
    <div class="login" :class="[{'login-pink':skin ==1},{'login-blue':skin ==2},{'login-green':skin ==3}]">
      <div style="width:1300px;margin:0 auto;">
      <div class="fr" style="margin-top: 5px;">
        <ul class="clearfix fl " style="margin-right:24px">
          <!-- 多语言 -->
            <li class="fl lanList" :class="v.code==defalutLan?'active':''" v-for="v,index in lanList" :key="index" style="margin-right:12px;" @click="changeLan(v.code)">{{v.name}}</li>
            <!-- 皮肤 -->
           <el-dropdown class="fr" trigger="click" placement="top" style="cursor: pointer;">
            <span class="el-dropdown-link">
              <i class="fl skin-icon"> {{$t('home.nav[13]')}}</i>
            </span>
            <el-dropdown-menu slot="dropdown" :class="[{'pink-dr-bg':skin==1},{'blue-dr-bg':skin==2},{'green-dr-bg':skin==3}]">
              <el-dropdown-item
              
                v-for="(v, index) in $t('home.skinList')"
                :key="index"
                @click.native="changeColor(v.color)"
                >{{ v.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
             <li class="fl online">
              {{$t('home.nav[12]')}}: {{onlineNum}}
            </li>
            <li class="fl" style="margin-right:12px;" @click="$router.push('/extend')">
              <span>{{$t('home.nav[3]')}}</span>
              &nbsp;
               <img v-if="skin==0" src="../assets/imgaes/topNav/icon-arrow.png" alt="" srcset="">
               <img v-if="skin==1" src="../assets/imgaes/skin/pink/icon-arrow.png" alt="" srcset="">
               <img v-if="skin==2" src="../assets/imgaes/skin/blue/icon-arrow.png" alt="" srcset="">
               <img v-if="skin==3" src="../assets/imgaes/skin/green/icon-arrow.png" alt="" srcset="">
            </li>
            <li class="fl" @click="$router.push('/appDownload')">
              <img v-if="skin==0" src="../assets/imgaes/topNav/xz_icon.png" alt="" srcset="">
              <img v-if="skin==1" src="../assets/imgaes/skin/pink/xz_icon.png" alt="" srcset="">
               <img v-if="skin==2" src="../assets/imgaes/skin/blue/xz_icon.png" alt="" srcset="">
               <img v-if="skin==3" src="../assets/imgaes/skin/green/xz_icon.png" alt="" srcset="">
              &nbsp;
              <span>{{$t('home.nav[4]')}}</span>
            </li>
           
        </ul>
        <ul class="clearfix fl" v-show="!this.codeToken">
          <li class="fl" style="margin-right:24px">
           <div class="header-login-btn control-btn" @click="showLoginBox(true)">
            {{$t('loginText')}} 
           </div>
          </li>
          <li class="fl">
           <div class="header-reg-btn control-btn"  @click="showLoginBox(false)">
             {{$t('registerText')}}
           </div>
          </li>
        </ul>
        <div class="ydl clearfix fr" v-show="this.codeToken">
         
          <span  class="ava fl" @click="goMember" >
            <el-dropdown id="gr_ul" v-show="this.codeToken" >
              <span class="el-dropdown-link">
                <img v-lazy="avatar" v-if="avatar" alt />
                <img src="../assets/imgaes/member/bgtoux.png" v-else alt />
              </span>
              <el-dropdown-menu  slot="dropdown" style="width:347px;left:1232px;top:200px" >
                <div class="gr_down">
                  <div class="gr_tit clearfix">
                    <div class="gr_out fr" @click="outLogin()">{{$t('home.nav[5]')}}</div>
                  </div>
                  <div class="gr_info clearfix">
                    <div class="gr_avatar fl">
                      <img v-lazy="avatar" v-if="avatar" alt />
                      <img src="../assets/imgaes/member/bgtoux.png" v-else alt />
                    </div>
                    <div class="gr_name fl">
                      <div class="gr_nickname clearfix">
                        <span class="fl">{{username?username:$t('nickName')}}</span>
                        <span class="fl">
                        
                          <img v-if="$store.state.userinfo.noble<=0" src />
                        </span>
                      </div>
                      <div class="gr_sing">{{userinfo.profile?userinfo.profile:$t('home.nav[6]')}}</div>
                    </div>
                  </div>
                 
                  <div class="gr_exNew clearfix">
                   
                    <div class="clearfix" style="margin-top:15px">
                      <span class="fl " style="font-size:18px;color:#71819D">{{$t('home.nav[7]')}}:</span>
                      <span class="gr_zsNew fl" :title="balance?balance:'0'">{{balance?balance:'0'}}</span>
                      <div class="gr_dhBtn fr" :class="[{'pink-bg-jb':skin==1},{'blue-bg-jb':skin==2},{'green-bg-jb':skin==3}]" style="" @click="goRecharge">{{$t('home.nav[8]')}}</div>
                      <i @click="loadMoney"  class="el-icon-refresh fr" style="color:#ccc"></i>
                    </div>
                    <p style="color:#999" v-if="lanCode!=2">(1 vndk = 1000 vnd)</p>
                    <div class="clearfix" style="margin-top:15px">
                      <span class="fl zh-icon" @click="goMoneyCenter">{{$t('home.nav[9]')}} </span>
                      <button :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" :disabled="isdisable" class="fr hs-size" @click="hsMoney()">{{$t('home.nav[10]')}}</button>
                    </div>
                  </div>
                  <div class="gr_xinxi clearfix">
                    <router-link to="/userInfor">
                      <div class="gr_gr fl" :class="[{'gr_gr-pink':skin==1},{'gr_gr-blue':skin==2},{'gr_gr-green':skin==3},]" >{{$t('home.nav[11]')}}</div>
                    </router-link>
                   
                  </div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
       </div>
    </div>
    <!-- 头部游戏导航栏 -->
    <div class="head clearfix">
      <div class="fl logo" @click="goHome" >
        <img v-if="noticeTypes==1&&(lanCode==1||lanCode==5)" src="../assets/imgaes/topNav/logo.png" alt="">
        <img v-if="noticeTypes==2&&(lanCode==1||lanCode==5)" src="../assets/imgaes/topNav/logo2.png" alt="">
        <img v-if="lanCode==2" src="../assets/imgaes/sfc.png" alt="">
      </div>
      <div class="fl hNav">
        <ul class="clearfix fl one-ul">
          <li @click="goHome">
            <div class="nav-name">
              <img src="../assets/imgaes/topNav/home_icon.png" class="noActive" alt="" srcset="">
              <img src="../assets/imgaes/topNav/home_icon1.png" class="active" alt="" srcset="">
              <p><span class="nav-span">{{$t('home.nav[0]')}}</span></p>
            </div>
           
          </li>
          <li v-for="(v,index) in gameList" :key="index">
            <div class="nav-name">
              <img :src="require('../assets/imgaes/topNav/'+v.code+'_icon.png')" class="noActive" alt="" srcset="">
              <img :src="require('../assets/imgaes/topNav/'+v.code+'_icon1.png')" class="active" alt="" srcset="">
              <p>  <span class="nav-span">{{v.name}} <i class="icon" :class="skin>0?'icon-skin':''"></i></span></p>
            </div>
            <div class="subNav">
              
              <div class="sub-content" v-if="v.code!='lottery'">
                <div class="wt" :id="'wt'+index">
                  <ul class="sub-list" :class="'sub-list'+(index+1)">
                    <li @click="goQp(item.code,item.type)" v-for="(item,index2) in v.list" :key="index2" >
                      <img :src="item.pc_img2" alt="">
                      <!-- <p>{{item.name}}</p> -->
                    </li>
                </ul>
                </div>
              </div>
              <div class="sub-content clearfix" v-else>
                <!-- 官方 -->
                <div v-show="item.is_official" v-for="(item,indexType) in v.list" :key="indexType" class="fl">
                  <dl class="allLottery-content" v-for="(lottery,indexLottery) in item.list" :key="indexLottery" :class="'dl-w-'+item.list.length">
                    <dt>{{lottery.name}}</dt>
                    <dd>
                      <div class="fl" :class="lottery.list.length<10?'lessten':''">
                        <div class="onelottery" :style="lottery.name=='PK3'?'width:80%':''" v-for="(vv,onelottery) in lottery.list" :key="onelottery" v-if="onelottery<=10">
                          <span  @click="gotoLottery(vv)">{{vv.vname}}<i v-if="v.is_hot"></i></span> 
                        </div>
                      </div>
                      <div class="fl">
                        <div class="onelottery" v-for="(vv,onelottery) in lottery.list" :key="onelottery" v-if="onelottery>10">
                          <span  @click="gotoLottery(vv)">{{vv.vname}}<i v-if="v.is_hot"></i></span> 
                        </div>
                      </div>
                       
                    </dd>
                  </dl>
                </div>
                <!-- 三方 -->
                <div class="fl sanf">
                   <div v-show="!item.is_official" v-for="(item,indexType) in v.list" :key="indexType">
                    <span @click="goQp(item.code,item.type)">{{item.name}} </span>
                  </div>
                </div>
               
                
              </div>

              <div class="left-pic type-pic"><img :src="require('../assets/imgaes/topNav/'+v.code+'_left.png')" alt=""></div>
              <div class="right-pic type-pic" :class="v.code"><img :src="require('../assets/imgaes/topNav/'+v.code+'_right.png')" alt=""></div>
            </div>
          
          </li>
        </ul>
      </div>
     <!-- 优惠+影片 -->
       <div class="live-streaming fr">
          <router-link to="/welcome">
          <img src="../assets/imgaes/topNav/hot.png" alt="">
        {{$t('home.nav[2]')}}
        </router-link>
        <router-link to="/movie" v-if="codeToken&&$store.state.userinfo.id>0&&lanCode!=2"><img src="../assets/imgaes/topNav/icon-zb.png" alt=""> {{$t('home.nav[1]')}}</router-link>
       
      </div>
      
    </div>
   
    <!-- 提示弹框-->
    <div class="ts-popup" v-if="isShow">
      <div class="ts-container">
        <div class="remove-btn" @click="isShow = false">
          <img src="../assets/imgaes/member/icon-cancel.png" alt="" />
        </div>
        <div class="ts-content">
          <p v-if="isSuccess">
            <i class="success"></i>
            <span>success！</span>
          </p>
          <p v-if="isWarning">
            <i class="warning"></i>
            <span>{{$t('home.tkText[0]')}}！</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 回收失败弹窗 -->
    <div class="tixian-box" v-if="showSDZH">
      <div class="tixian">
         <img src="../assets/imgaes/tips-sb.png" alt="">
         <p>{{$t('home.tkText[1]')}}</p>
         <div class="clearfix">
           <span class="fl" @click="showSDZH = false">{{$t('home.tkText[2]')}}</span>
           <span class="fr" @click="goMyPurse()">{{$t('home.tkText[3]')}}</span>
         </div>
      </div>
    </div>
    <Recharge v-if="isRecharge" :show="isRecharge" v-on:childFn="resetFlag"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alertComfirm } from "../assets/js/public";
export default {
  name: "headC",
  data() {
    return {
      show: 0,
      url: "",
      profile: "",
      amount: "0",
      isRecharge: false, //充值
      AppUrl: "",
      nav: [],
      isdisable: false,
      isShow: false, //弹窗
      isSuccess: false, //弹窗文字
      isWarning: false,
      showSDZH: false,
      gameList:[],
      skinList: this.$t('home.skinList'),
      onlineNum:201
    };
  },
  created() {
    this.getGameList();
    this.getAPPUrl();
    this.getOnline();
      setInterval(() => {
            this.getOnline()
      }, 6000);
    if (this.$store.state.userinfo.user_id > 0) {
      this.loadMoney();
    }
  },
  mounted() {

  },
  computed: {
    ...mapState([
      "username",
      "codeToken",
      "userinfo",
      "avatar",
      "balance",
      "vip",
      "skin",
      "lanList",
      "lanCode",
      "defalutLan"
    ]),
  },
  watch: {
  
  },
  components: {
  },
  methods: {
    ...mapMutations([
      "SETUSERTOKEN",
      "SETUSERINFO",
      "SETPIC",
      "SETSAFEPWD",
      "SETUSERVIP",
      "SETUSERNAME",
      "SETBALANCE",
      "SETVENDELBL",
      "SETALLVENDELBL",
      "SETUSER_TYPE",
      "SETFOCUS",
      "SETUSERUSERID",
      "SETCUSTOMER",
      "SETOPENPURE",
      "SETPURE",
      "SETPTGG",
      "SETWEBDATA",
      "SETLOGIN",
      "SETISLOGIN",
    ]),
    async getOnline() {
        let res = await this.$http.get("/api/user/onlinecount");
        if (res && res.data.code == 1) {
            this.onlineNum=res.data.data.online_user_nums
            
        }
    },
    changeColor(n){
      this.$st.commit('SETSKINDATA',n)
    },
    changeLan(lan){
      
      this.$SetLanguage(lan);
      location.reload();
    },
    async getGameList() {
      this.gameList = this.$store.state.HomeGame || [];
      if (this.gameList.length) return;
      let res = await this.$http.get("/api/vendor/homegames", {
        params: { is_pc: 1 },
      });
      this.gameList = res.data.data || [];
      this.$store.commit("SETHOMEGAME", this.gameList);
    },

   
   
    goMyPurse() {
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip')}, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      this.$router.push("/moneyCenter"), (this.showSDZH = false);
    },
    showLoginBox(v) {
      this.SETLOGIN(true);
      this.SETISLOGIN(v);
    },
    gotoLottery(vv){
       if (!this.codeToken) {
         alertComfirm({ msg:this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      this.$router.push('/lotteryGame/'+ vv.lottery_id+'?name='+vv.vname)
    },
    goQp(item, id) {
      if (item == "mg_slot") {
        return this.$router.push("/game?type=mg");
      }else if (item == "jdb_slot") {
        return this.$router.push("/game?type=jdb");
      }else if (item == "jili_slot") {
        return this.$router.push("/game?type=jili");
      }else if (item == "lg_lottery") {
        return this.$router.push("/game?type=lg");
      }
      else if (item == "pp_slot") {
        return this.$router.push("/game?type=pp");
      }
      else if (item == "pt_slot") {
        return this.$router.push("/game?type=pt");
      }
      else if (item == "pg_slot") {
        return this.$router.push("/game?type=pg");
      }
      if (!this.codeToken) {
        
         alertComfirm({ msg:this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
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
      
      window.open("/toGame/" + item + "/" + id);
      
    },
    goHome() {
      this.$router.push("/");
    },
    resetFlag(flag) {
      this.isRecharge = flag;
    },
    goRegister() {
      if (this.noticeTypes == 1) {
        this.$store.commit("SETLOGIN", true);
        this.SETISLOGIN(false);
       
      } else {
        this.$store.commit("SETLOGIN", true);
        this.SETISLOGIN(false);
        
      }
    },
    
    goMoneyCenter(){
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
       }else{
         this.$router.push('/moneyCenter')
       }
      
    },
    goRecharge() {
      //是否已经登录
      if (!this.codeToken) {
        alertComfirm({ msg:this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
  
        return;
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
      //充值
      this.isRecharge = true;
    },
   
    //退出
    outLogin() {
      this.$http.post("/api/user/logout").then((res) => {
        if (res && res.data.code == 1) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.$router.push("/");
          this.getAPPUrl();
          //请求头 直播那边
          this.$http.defaults.headers["token"] = "";
          this.SETUSERTOKEN(""); //token
          this.SETPIC(""); //头像
          this.SETUSERINFO(""); //用户信息
          this.SETUSERNAME(""); //用户名
          this.SETSAFEPWD(""); //取款密码
          this.SETUSER_TYPE(""); //用户类型
          this.SETFOCUS(""); //关注
          this.SETBALANCE(""); //用户名余额
          this.SETUSERUSERID(""); //user_id
          this.SETUSERVIP(""); //用户vip
          document.querySelector(".gr_nickname img").style.display = "none";
        }
      });
    },
    goMember() {
      if (this.$route.name == "userInfor") return;
      this.$router.push("/userInfor");
    },
    loadMoney() {
      if (!this.codeToken) return;
     
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0"; //显示出来的
          this.SETBALANCE(this.amount);
        }
      });
    },
    async getAPPUrl() {
      let res = await this.$http.get("/api/common/siteConfig", {
        params: {
          client: 4,
          version: "3.2.1",
        },
      });
      if (res && res.data.code == 1) {
        this.AppUrl = res.data.data.downloadUrl;
        
        this.SETCUSTOMER(res.data.data.customer);
        this.SETWEBDATA(res.data.data);
        localStorage.setItem("customer", res.data.data.customer);
        localStorage.setItem("AppUrl", res.data.data.downloadUrl);
      }
    },

    async hsMoney() {
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
      //一键回收
      this.isdisable = true;
      setTimeout(() => {
        this.isdisable = false;
      }, 2500); // 单位毫秒
      this.$message({
        message: "loading...",
      });
      this.$http
        .post("/api/vendor/transferinall", {}, { timeout: 60000 })
        .then((res) => {
          if (res.data.code == 1) {
             this.$http.get("/api/vendor/balance",{ timeout: 60000 }).then((res) => {
                if (res && res.data.code == 1) {
                  this.SETBALANCE(res.data.data.balance)
                  let obj = res.data.data;
                  let arr = [];
                  for(let k in obj){
                  if(k=="balance"||k=='vendor_bl'){
                    
                  }else{
                    arr.push({name:k.toString().toUpperCase(),value:obj[k],nameTransfer:k})
                  }
                  
                }
                  this.SETVENDELBL(res.data.data.vendor_bl)
                  this.SETALLVENDELBL(arr)
                }
                this.$forceUpdate();
              });
              this.$forceUpdate()
            setTimeout(() => {
              this.isShow = true;
              this.isSuccess = true;
              this.isWarning = false;
            }, 500);
          } else if (res.data.code == 12) {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          } else {
            this.showSDZH = true;
          }
        })
        .catch(() => {
          alertComfirm({ msg: res.data.msg });
        });
    },
  },
};
</script>

<style scoped lang="less">
 #header {
  background: #1b74c8;
  color: #333;
  font-family: "微软雅黑";
  position: fixed;
  width: 100%;
  z-index: 1000;
  &.header-green{
    background: #09B584!important;;
    .skin-icon{
       background: url("../assets/imgaes/skin/green/skin-icon.png") no-repeat!important;
       background-size: contain!important;
       color:#09B584!important;
    }
    .subNav{
      background: rgba(37, 120, 80, 0.9) !important;
      .sub-list{
        li{
          &:hover{
            background: #1AC092 !important;
          }
        }
      }
      .describe{
        p{
          color: #09B584 !important;
        }
        em{
          color: #88D8C1 !important;
        }
      }

    }
  }
    &.header-pink{
    background: #FB7772!important;
    .skin-icon{
       background: url("../assets/imgaes/skin/pink/skin-icon.png") no-repeat!important;
       background-size: contain!important;
       color:#FB7772!important;
    }
    .subNav{
      background: rgba(217, 76, 74, 0.9)!important;
      .sub-list{
        li{
          &:hover{
            background: #FF7D7B !important;
          }
        }
      }
      .describe{
        p{
          color: #FB7772 !important;
        }
        em{
          color: #FFAEAD !important;
        }
      }

    }
  }
    &.header-blue{
    background: #00B4D8!important;;
    .skin-icon{
       background: url("../assets/imgaes/skin/blue/skin-icon.png") no-repeat!important;
       background-size: contain!important;
       color: #00B4D8!important;
    }
    .subNav{
      background: rgba(0, 150, 180, 0.9) !important;
      .sub-list{
        li{
          &:hover{
            background: #2DC7E7 !important;
          }
        }
      }
      .describe{
        p{
          color: #00B4D8 !important;
        }
        em{
          color: #72D2E5 !important;
        }
      }

    }
  }

 .skin-icon {
      background: url("../assets/imgaes/game/skin-icon1.png") no-repeat;
      background-size: contain;
      width: 15px !important;
      height: 16px;
      margin-left: 15px;
      margin-top: 9px;
      padding-left: 21px;
      font-size: 14px;
      margin-right: 15px;
      color: #fff;
    }
  .login {
    height: 40px;
    background: #3292c8;
    ul{
     
      li{
        height:30px;line-height: 30px;color: #fff;cursor: pointer;
        padding: 0 5px;
        position: relative;
        &.lanList{
          &::before{
          content: '';
          position: absolute;
          background: #fff;
          // width: 1px;
          height: 10px;
          right: 0;
          top: 10px;
          }
          &:last-child{
            &::before{
              width: 0;
            }
            
          }
        
         
       
        &.active{
          background: rgba(0, 0, 0, 0.35);
          border-radius: .7rem;

        }
        }
       
        img{
          width: 14px;
          height: 14px;
        }
        .control-btn{
          height:30px;
          line-height: 30px;
          cursor: pointer;
          border-radius: 4px;padding: 0 10px;
          color: #fff;
        }
        .header-login-btn{
          background: linear-gradient(180deg, #2FFFF3 0%, #00A6CA 100%);
        }
        .header-reg-btn{
          background: linear-gradient(0deg, #FD9717 0%, #FFD792 100%)
        }
      }
    .online{
      background: rgba(0,0,0,0.35);
      padding: 0 6px;
      height: 24px;
      line-height: 24px;
      margin-top: 4px;
      margin-right: 8px;
      border-radius: 16px;
    }
    }
    &.login-pink{
      background: #fff;
      ul{
        li{
          color: #FB7772;
          .header-login-btn{
            background:  #FFC700;
            color: #fff;
             width: 110px;
            text-align: center;
          }
          .header-reg-btn{
            background: #FB7772;
            width: 110px;
            text-align: center;
          }
        }
      }

    }
     &.login-blue{
      background: #fff;
      ul{
        li{
          color: #00B4D8;
          .header-login-btn{
            background: #FFC700;
            color: #fff;
             width: 110px;
            text-align: center;
          }
          .header-reg-btn{
            background: #00B4D8;
            width: 110px;
            text-align: center;
          }
        }
      }

    }
    &.login-green{
      background: #fff;
      ul{
        li{
          color: #09B584;
          .header-login-btn{
            background: #FFC700;
            color: #fff;
             width: 110px;
            text-align: center;
          }
          .header-reg-btn{
            background: #09B584;
            width: 110px;
            text-align: center;
          }
        }
      }

    }
  }
  .head {
    width: 1300px;
    margin: 0 auto;
    .logo {
      cursor: pointer;
      margin-top: 20px;
      width: 240px;
      height: 72px;
      img{
         width: 240px;
      height: 72px;
      }
    }
    .hNav {
      margin-left: 15px;
      ul.one-ul {
        display: flex;
        > li {
          // width: 92px;
          // height: 110px;
          // cursor: pointer;
          // margin: 0 15px;
          width: 86px;
          height: 110px;
          cursor: pointer;
          margin: 0 12px;
          .nav-name {
            p {
              text-align: center;
            }
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 20px;
            img {
              // width: 33px;
              height: 33px;
              margin-bottom: 16px;
            }
          }
          .active {
            display: none;
          }
          &:hover {
            .active {
              display: block;
            }
            .noActive {
              display: none;
            }
            span.nav-span {
              color: #ffe500;
              position: relative;
              &::before {
                content: "";
                width: 68px;
                height: 3px;
                background: #ffe500;
                border-radius: 2px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-55%);
              }
              .icon {
                transform: rotate(180deg);
              }
            }
            .subNav {
              display: block;
              z-index: 1000;
              min-width: 1290px;
            }
          }
          span {
            font-size: 16px;
            color: #fff;
            padding-bottom: 20px;
            position: relative;
            display: block;
            height: 38px;
            &.yhfl {
              position: relative;
              &::after {
                content: "";
                position: absolute;
                background: url("../assets/imgaes/topNav/hot.png") no-repeat
                  center;
                background-size: contain;
                width: 16px;
                height: 22px;
                top: -20px;
                left: 30px;
              }
            }
            .icon {
              display: inline-block;
              width: 14px;
              height: 14px;
              background: url("../assets/imgaes/topNav/icon-arrow.png")
                no-repeat top;
              background-size: 100% 100%;
              position: absolute;
              top: 4px;
              right: -17px;
              &.icon-skin{
                background: url("../assets/imgaes/topNav/icon-arrow-skin.png")
                no-repeat top;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .subNav {
        position: relative;
        display: none;
        width: 100%;
        background: #1b8ac8;
        box-shadow: 0px 10px 10px 0px rgba(51, 51, 51, 0.2);
        opacity: 0.95;
        position: absolute;
        top: 150px;
        min-height: 300px;
        left: 0;
        z-index: 1000;
        overflow: hidden;
        .type-pic{
          position: absolute;
          width: 400px;
          bottom: 0;
          z-index: -1;
          &.slot{
            width: 745px;
          }
          img{
            width: 100%;
          }
          &.left-pic{
            left: 0;
          }
          &.right-pic{
            right: 0;
          }
        }
        .sub-content {
          width: 1400px;
          margin: 0 auto;
          overflow: hidden;
         
          overflow: hidden;
          .sanf{
            >div{
              
            }
            margin: 20px 0;
            padding-top: 45px;
            padding-left: 20px;
            border-left: 1px solid rgba(255,255,255,.6);
            height: 455px;
            span{
               font-size: 18px;
               padding: 10px 5px;
                &:hover{
                    background: rgba(0,0,0,.5) !important;
                    color: #FFBC11;
                  }
            }
           
          }
          .allLottery-content{
            margin: 20px 0;
            border-right: 1px solid rgba(255,255,255,.6);
            height: 455px;
            float: left;
            width: 250px;
            &:nth-of-type(n+1){
              padding: 0 0 0 30px;
            }
            &:last-child{
              border-right: none;
            }
            dt{
              color: #FFBC11;
              font-size: 18px;
              margin-bottom: 10px;
            }
            dd{
              >div:first-child{
                width: 55%;
              }
              >div:last-child{
                width: 45%;
              }
              >div.lessten{
                width: 100%;
              }
              div.onelottery{
                float: left;
                // cursor: pointer;
                position: relative;
                span{
                  display: inline-block;
                  color: #fff;
                  font-size: 14px;
                  padding: 10px 5px;
                  font-weight: bold;
                  &:hover{
                    background: rgba(0,0,0,.5) !important;
                    color: #FFBC11;
                  }
                  i{
                    position: absolute;
                    width: 18px;
                    height: 10px;
                    right:-10px;
                    top:0px;
                    background: url(../assets/imgaes/topNav/isHot.png) no-repeat;
                    background-size: contain;
                  }
                  
                }
                
              }
            }
            &.dl-w-3{
              width: 300px;
            }
            &.dl-w-4{
              width: 260px;
            }
           
          }
          .sub-list {
            transition: all .5s;
            li {
              text-align: center;
              float: left;
              padding: 10px 0;
              // width: 25%;
              width: 300px;
              
              img {
                height: 84px;
              }
              &:hover {
                background: rgba(21, 91, 156, 0.8);
                p {
                  color: #ffe500;
                }
              }
              p {
                font-size: 20px;
                font-weight: 700;
                color: #fff;
                margin-top: 24px;
              }
            }
          }
        }
        .subNav-box {
          width: 900px;
          margin-left: 80px;
          display: flex;
          li {
            flex: 1;
            text-align: center;
            position: relative;
            padding: 0 !important;
            margin: 0;
            .pic {
              transition: all 0.6s;
              &:hover {
                transform: scale(1.1);
              }
            }
            .t40 {
              width: 40%;
              margin-top: 30px;
            }
            .t50 {
              width: 50%;
              margin-top: 30px;
            }
            .t30 {
              width: 30%;
              margin-top: 30px;
            }
            .mt30 {
              margin-top: 30px;
            }
            .sx-pic {
              width: 65%;
            }
            .dz-pic {
              width: 100%;
              margin-top: 30px;
            }
            .ty-pic {
              width: 85%;
              // margin-top: 50px;
              margin-top: 11px;
            }

            .fl-txt {
              font-size: 14px;
              color: #445779;
              line-height: 34px;
            }
            .li-r {
              margin-top: 80px;
              text-align: center;
              .code {
                display: block;
                margin: 10px auto 0;
              }
              .features {
                .item {
                  width: 180px;
                  text-align: left;
                  font-size: 12px !important;
                  color: #7e8db2 !important;
                  transition: all 0.6s;
                  cursor: default;
                  &:hover {
                    transform: scale(1.1);
                  }
                  &:last-of-type {
                    margin-left: 30px;
                  }
                  .icon {
                    width: 37px;
                    height: 39px;
                    margin-right: 5px;
                    &.icon-1 {
                      background: url("../assets/imgaes/topNav/icon-dl1.png")
                        no-repeat;
                      background-size: contain;
                    }
                    &.icon-2 {
                      background: url("../assets/imgaes/topNav/icon-dl2.png")
                        no-repeat;
                      background-size: contain;
                    }
                    &.icon-3 {
                      background: url("../assets/imgaes/topNav/icon-dl3.png")
                        no-repeat;
                      background-size: contain;
                    }
                  }
                }
              }
              p {
                color: #445779 !important;
                padding: 18px 0 25px;
                a {
                  color: #1486ff;
                }
              }
            }
            .li-b {
              position: absolute;
              left: 50%;
              bottom: 30px;
              transform: translate(-50%);
            }
            .btn {
              display: block;
              width: 115px;
              height: 42px;
              line-height: 39px;
              font-size: 16px;
              color: #fff;
              text-align: center;
              background: url("../assets/imgaes/topNav/btn-bg.png") no-repeat
                center;
              background-size: contain;
              margin: 0 auto;
            }
          }
        }
      }
    }
    .live-streaming {
      margin: 26px 10px 0 0;
      a {
        font-size: 12px;
        color: #fff;
        text-align: center;
        float: left;
        width: 72px;&:bef
        &:first-of-type {
          margin-right: 10px;
        }
        img {
          display: block;
          margin: 0 auto;
          // width: 18px;
          height: 22px;
        }
      }
    }
    .login {
      ul {
        li {
          height: 30px;
          margin: 30px 10px 0 0;
          img {
            height: 25px;
            cursor: pointer;
          }
          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }

  .ydl {
    .gr_down {
      width: 100%;
      padding: 24px;
      margin: 12px auto 0;
      .gr_tit {
        font-size: 12px;
        color: #999999;
      }

      .gr_avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      .gr_dhBtn{
       background: linear-gradient(90deg, #1486FF -0.55%, #4BA1FF 99.45%);cursor: pointer;
      //  padding: 0 10px;
      }
    }

    .chong {
      display: inline-block;
      cursor: pointer;
      color: #333;
      margin-right: 5px;
      font-size: 14px;
      position: relative;
      line-height: 80px;
      // padding-bottom: 15px;
      &:before {
        position: absolute;
        content: "";
        width: 24px;
        height: 22px;
        background: url("../assets/imgaes/pc_money.png") no-repeat center;
        background-size: contain;
        top: 30px;
        left: -34px;
      }
    }
    .ava {
      margin-top: -6px;
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      .el-dropdown-link {
        
        width: 40px;
        height: 40px;
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .gr_gr,.gr_gr-pink,.gr_gr-blue,.gr_gr-green {
    position: relative;
    &:before {
      position: absolute;
      content: "";
      background: url("../assets/imgaes/pc_center.png") no-repeat center;
      background-size: contain;
      width: 20px;
      height: 25px;
      top: 0;
      left: 0;
    }
  }
  .gr_gr-pink {
    &:before {
      background: url("../assets/imgaes/pc_center-pink.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
  .gr_gr-blue {
    &:before {
      background: url("../assets/imgaes/pc_center-blue.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
  .gr_gr-green {
    &:before {
      background: url("../assets/imgaes/pc_center-green.png") no-repeat center!important;
      background-size: contain!important;
    }
  }
}

.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #1486ff !important;
  position: relative;
  top: -2px !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  top: -8px !important;
}

.dropdown {
  .lottery {
    height: 40px !important;
    width: 275px !important;
    &:nth-child(1) {
      //第一个的样式
      height: 80px !important;
      line-height: 80px !important;
      a {
        display: inline-block;
      }
      span {
        display: inline-block;
        float: left;
        &:nth-child(1) {
          width: 60px;
          height: 60px;
          margin-left: -14px;
          img {
            width: 60px !important;
            height: 60px;
            border-radius: 60px !important;
          }
        }
        &:nth-child(2) {
          width: 124px;
          margin-top: -12px;
          margin-left: 10px;
          i {
            width: 112px;
            display: block;
            height: 30px;
          }
        }
        &:nth-child(3) {
          width: 45px;
          position: relative;
          right: -7px;
          a {
            width: 40px;
            height: 30px;
            text-align: center;
            color: #999;
            border: 3px solid #f5f5f5;
            padding: 2px 6px;
            border-radius: 30px;
          }
        }
      }
    }

    .none {
      display: none;
    } //第2条一下的样式
    a {
      display: none;
    }
    i {
      margin-right: 10px;
    }
  }
}

.tixian-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1002;
  .tixian {
    background: #fff;
    width: 355px;
    height: 260px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 150px;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    img {
      width: 104px;
      margin: 19px auto;
    }
    > div {
      padding: 27px 10px 0;
    }
    span {
      display: block;
      border-radius: 100px;
      &:nth-child(1) {
        border: 1px solid #6a86b9;
        color: #6a86b9;
      }
      &:nth-last-child(1) {
        color: #fff;
        background: linear-gradient(90deg, #1486ff 0%, #4ba1ff 100%);
      }
      width: 160px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
    }
    p {
      color: #445779;
    }
  }
}
</style>
