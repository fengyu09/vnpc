<template>
  <div id="header" :class="[{'header-pink':skin ==1},{'header-blue':skin ==2},{'header-green':skin ==3}]">
    <div class="login" :class="[{'login-pink':skin ==1},{'login-blue':skin ==2},{'login-green':skin ==3}]">
      <div style="width:1300px;margin:0 auto;">
      <div class="fr" style="margin-top: 5px;">
        <ul class="clearfix fl" style="margin-right:24px">
            <!-- <li class="fl" style="margin-right:12px;" @click="changeLan('cn')">中文</li>
            <li class="fl" style="margin-right:12px;" @click="changeLan('vi-vn')">越南</li> -->
            <!-- 皮肤 -->
           <el-dropdown class="fr" trigger="click" placement="top" >
            <span class="el-dropdown-link">
              <i class="fl skin-icon">Da</i>
            </span>
            <el-dropdown-menu slot="dropdown" :class="[{'pink-dr-bg':skin==1},{'blue-dr-bg':skin==2},{'green-dr-bg':skin==3}]">
              <el-dropdown-item
              
                v-for="(v, index) in skinList"
                :key="index"
                @click.native="changeColor(v.color)"
                >{{ v.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

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
             {{$t('home.nav[12]')}}
           </div>
          </li>
          <li class="fl">
           <div class="header-reg-btn control-btn"  @click="showLoginBox(false)">
             {{$t('home.nav[13]')}}
           </div>
          </li>
        </ul>
        <div class="ydl clearfix fr" v-show="this.codeToken">
          <!-- <div class="withdraw fl"  @click="goTX"><span class="icon"></span><a src="javascript:;">提现</a></div> -->
          <!-- <div class="chong fl" @click="goRecharge">充值</div>  -->
            
          <span  class="ava fl" @click="goMember" >
            <el-dropdown id="gr_ul" v-show="this.codeToken" >
              <span class="el-dropdown-link">
                <img v-lazy="avatar" v-if="avatar" alt />
                <img src="../assets/imgaes/member/bgtoux.png" v-else alt />
              </span>
              <el-dropdown-menu  slot="dropdown" style="width:347px;left:1232px;top:200px" >
                <div class="gr_down">
                  <div class="gr_tit clearfix">
                    <!-- <p class="fl">嘿，快来体验乐购APP</p> -->
                    <div class="gr_out fr" @click="outLogin()">{{$t('home.nav[5]')}}</div>
                  </div>
                  <div class="gr_info clearfix">
                    <div class="gr_avatar fl">
                      <img v-lazy="avatar" v-if="avatar" alt />
                      <img src="../assets/imgaes/member/bgtoux.png" v-else alt />
                    </div>
                    <div class="gr_name fl">
                      <div class="gr_nickname clearfix">
                        <span class="fl">{{username?username:'Biệt danh'}}</span>
                        <span class="fl">
                          <!-- <img src="../assets/imgaes/member/vip_1.png" alt=""> -->
                          <!-- <img
                          v-if="vip>0"
                          :src="require('../assets/imgaes/member/vip_'+vip+'.png')"
                          /> -->
                          <img v-if="$store.state.userinfo.noble<=0" src />
                        </span>
                      </div>
                      <div class="gr_sing">{{userinfo.profile?userinfo.profile:$t('home.nav[6]')}}</div>
                    </div>
                  </div>
                  <!-- <div class="gr_ex clearfix">
                    <div class="gr_exchange fl">
                      <div class="gr_zs">{{diamond?diamond:'0'}}</div>
                      <div class="color_99" style="height:24px">钻石<i @click="zsQuest()"  class="el-icon-refresh"></i></div>
                        <div class="gr_dhBtn" style="cursor: pointer" @click="goExcharge">兑换</div>
                    </div>
                    <div class="gr_chong fr">
                      <div class="gr_zs">{{balance?balance:'0'}}</div>
                      <div class="color_99" style="height:24px;font-size: 14px;">Số dư<i @click="loadMoney()" class="el-icon-refresh"></i></div>
                        <div class="gr_dhBtn" style=" background-color:#ff1c30;cursor: pointer" @click="goRecharge">充值</div>
                    </div>
                  </div> -->
                  <div class="gr_exNew clearfix">
                    <!-- <div class="clearfix">
                      <span class="fl " style="font-size:18px;color:#71819D">钻石:</span>
                      <span class="gr_zsNew fl" :title="diamond?diamond:'0'">{{diamond?diamond:'0'}}</span>
                      <div class="gr_dhBtn fr" style="cursor: pointer" @click="goExcharge">兑换</div>
                      <i @click="zsQuest()"  class="el-icon-refresh fr" style="color:#ccc"></i>
                    </div> -->
                    <div class="clearfix" style="margin-top:15px">
                      <span class="fl " style="font-size:18px;color:#71819D">{{$t('home.nav[7]')}}:</span>
                      <span class="gr_zsNew fl" :title="balance?balance:'0'">{{balance?balance:'0'}}</span>
                      <div class="gr_dhBtn fr" :class="[{'pink-bg-jb':skin==1},{'blue-bg-jb':skin==2},{'green-bg-jb':skin==3}]" style="" @click="goRecharge">{{$t('home.nav[8]')}}</div>
                      <i @click="loadMoney"  class="el-icon-refresh fr" style="color:#ccc"></i>
                    </div>
                    <p style="color:#999">(1 vndk = 1000 vnd)</p>
                    <div class="clearfix" style="margin-top:15px">
                      <span class="fl zh-icon" @click="goMoneyCenter">{{$t('home.nav[9]')}} </span>
                      <button :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" :disabled="isdisable" class="fr hs-size" @click="hsMoney()">{{$t('home.nav[10]')}}</button>
                    </div>
                  </div>
                  <div class="gr_xinxi clearfix">
                    <router-link to="/userInfor">
                      <div class="gr_gr fl" :class="[{'gr_gr-pink':skin==1},{'gr_gr-blue':skin==2},{'gr_gr-green':skin==3},]" >{{$t('home.nav[11]')}}</div>
                    </router-link>
                    <!-- <router-link :to="{name:'dsRecord',params:{type:3}}" v-if="isPure!=1">
                      <div class="gr_ds fl">打赏记录</div>
                    </router-link>
                    <router-link to="/myFocus" v-if="isPure!=1">
                      <div class="gr_follow fl">我的关注</div>
                    </router-link> -->
                  </div>
                </div>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </div>
       </div>
    </div>
    <div class="head clearfix">
      <div class="fl logo" @click="goHome" >
        <img v-if="noticeTypes==1" src="../assets/imgaes/topNav/logo.png" alt="">
        <img v-else src="../assets/imgaes/topNav/logo2.png" alt="">
      </div>
      <div class="fl hNav">
        <ul class="clearfix fl one-ul">
          <li @click="goHome">
            <div class="nav-name">
              <img src="../assets/imgaes/topNav/home_icon.png" class="noActive" alt="" srcset="">
              <img src="../assets/imgaes/topNav/home_icon1.png" class="active" alt="" srcset="">
              <p><span>{{$t('home.nav[0]')}}</span></p>
            </div>
           
          </li>
          <li v-for="(v,index) in gameList" :key="index">
            
            <div class="nav-name">
              <img :src="require('../assets/imgaes/topNav/'+v.code+'_icon.png')" class="noActive" alt="" srcset="">
              <img :src="require('../assets/imgaes/topNav/'+v.code+'_icon1.png')" class="active" alt="" srcset="">
              <p>  <span>{{v.name}} <i class="icon" :class="skin>0?'icon-skin':''"></i></span></p>
            </div>
            <div class="subNav">
              <div class="describe">
                <p v-if="v.code=='chess'">{{$t('home.nav[14]')}}</p>
                <p v-if="v.code=='sport'">{{$t('home.nav[15]')}}</p>
                <p v-if="v.code=='lottery'">{{$t('home.nav[16]')}}</p>
                <p v-if="v.code=='slot'">{{$t('home.nav[17]')}}</p>
                <p v-if="v.code=='live'">{{$t('home.nav[18]')}}</p>
                <em>{{v.name}}</em>
                <br>
                <em>{{$t('home.nav[19]')}}</em>
                <h2 v-if="v.code=='chess'">1.05%</h2>
                <h2 v-if="v.code=='sport'">1.05%</h2>
                <h2 v-if="v.code=='lottery'">0.05%</h2>
                <h2 v-if="v.code=='slot'">1.05%</h2>
                <h2 v-if="v.code=='live'">0.75%</h2>
              </div>
              <div class="sub-content">
                <div class="arrow arrow-left" @click="goLeft(index)" v-if="v.list.length>4">
                  <img src="../assets/imgaes/topNav/arrow_left.png" alt="" srcset="">
                </div>
                 <div class="arrow arrow-right" @click="goRight(v.list.length,index)" v-if="v.list.length>4">
                   <img src="../assets/imgaes/topNav/arrow_right.png" alt="" srcset="">
                </div>
                <div class="wt" style="width:720px;overflow: hidden;" :id="'wt'+index">
                  <ul class="sub-list" :class="'sub-list'+(index+1)" :style="'width:'+v.list.length*180+'px'">
                    <li @click="goQp(item.code,item.type)" v-for="(item,index2) in v.list" :key="index2" >
                      <!-- <img :src="require('../assets/imgaes/topNav/'+item.code+'.png')" alt="" srcset=""> -->
                      <img :src="item.pc_img" alt="">
                      <p>{{item.name}}</p>
                    </li>
                </ul>
                </div>
                
            
                  
              </div>
            </div>
          
          </li>

         
         
        </ul>
      </div>
     
      
       <div class="live-streaming fr">
          <router-link to="/welcome">
          <img src="../assets/imgaes/topNav/hot.png" alt="">
        {{$t('home.nav[2]')}}
        </router-link>
        <router-link to="/movie" v-if="codeToken&&$store.state.userinfo.id>0"><img src="../assets/imgaes/topNav/icon-zb.png" alt=""> {{$t('home.nav[1]')}}</router-link>
       
      </div>
      
      
     
    </div>
   
    <!-- <div class="myPurse-box" v-if="showPurse">
      <div class="myPurse-main">
        <h3 >Chuyển đổi số dư <i @click="showPurse = false" class="purse-close-icon"></i></h3>
        <el-scrollbar style="height:85%">
          <myPurse class="zj-purse"></myPurse>
        </el-scrollbar>
      </div>
    </div> -->
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
    <!-- <Excharge v-if="isEX" :showEx="isEX" v-on:childExFn="resetExFlag"/> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alertComfirm, alertServe } from "../assets/js/public";
import { deepEqual } from "assert";
import { get } from "http";
// import myPurse from "../views/user/myPurse.vue";
export default {
  name: "headC",
  data() {
    return {
      lotteryList: [], //所有彩种的信息
      show: 0,
      url: "",
      profile: "",
      amount: "0",
      zsMount: "0",
      isRecharge: false, //充值
      isEX: false, //兑换
      searchCon: "", //搜索关键字
      searchRes: [], //搜索结果
      search: [], //搜索结果
      searchlist: false, //搜索无结果的显示隐藏
      searchFalg: true, //搜索框的显示隐藏
      AppUrl: "",
      chessArr: "",
      bet: "",
      pureValue: this.isPure,
      nav: [],
      navNoPure: [],
      navPure: [
        { code: "game", name: "游戏中心" },
        { code: "lottery", name: "彩票大厅" },
        { code: "active", name: "优惠活动" },
        { code: "redorder", name: "专家红单" },
        { code: "download", name: "下载APP" },
      ],
      isdisable: false,
      showPurse: false,
      isShow: false, //弹窗
      isSuccess: false, //弹窗文字
      isWarning: false,
      showSDZH: false,
      gameList:[],
      bcurrLen:0,
      skinList: [
        { color: "0", name: "Màu chủ đề" },
        { color: "1", name: "Màu hoa anh đào" },
        { color: "2", name: "Màu xanh lam" },
        { color: "3", name: "Màu xanh lá" },
      ],
    };
  },
  created() {
    this.getGameList();
    this.getAPPUrl();
    this.pureValue = this.isPure;
    if (this.$store.state.userinfo.user_id > 0) {
      this.loadMoney();
      // this.zsQuest();
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
      "diamond",
      "chatRecharge",
      "isPure",
      "openPure2",
      "skin"
    ]),
  },
  watch: {
    chatRecharge: function () {
      this.isEX = false;
      this.isRecharge = true;
    },
    $route(to, from) {
      if (this.$route.path == "/search") {
        this.searchFalg = false;
      } else {
        this.searchFalg = true;
      }
    },
    isPure() {
      if (this.isPure == 1) {
        this.nav = this.navPure;
      } else {
        this.nav = this.navNoPure;
      }
    },

    // pureValue(n,o){
    //  //切换版本
    //   this.SETPURE(n);
    //   if(n==1){
    //     this.$router.push('/gameCenter')
    //   }
    //  // this.SETOPENPURE()
    // }
  },
  components: {
    // myPurse,
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
      "SETDIAMOND",
      "SETUSER_TYPE",
      "SETFOCUS",
      "SETUSERUSERID",
      "SETCUSTOMER",
      "SETOPENPURE",
      "SETPURE",
      "SETPTGG",
      "SETWEBDATA",
      // "SETFOCUS"
      "SETLOGIN",
      "SETISLOGIN",
    ]),
    changeColor(n){
      this.$st.commit('SETSKINDATA',n)
    },
    changeLan(lan){
      this.$SetLanguage(lan);
      // console.log(lan)
      location.reload();
    },
    async getGameList() {
      this.gameList = this.$store.state.HomeGame || [];
      // console.log(888,this.gameList)
      if (this.gameList.length) return;
      let res = await this.$http.get("/api/vendor/homegames", {
        params: { is_pc: 1 },
      });
      this.gameList = res.data.data || [];
      // console.log(999,this.gameList)
      this.$store.commit("SETHOMEGAME", this.gameList);
    },
    goLottery(){
      if(!this.codeToken){
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
      }else{
        this.$router.push('/lotteryGame/1')
      }
      
    },
    goLeft(index) {
      this.bcurrLen--;
      if (this.bcurrLen < 0){
        this.bcurrLen++;
        return;
        
      }
      let u = document.querySelectorAll(".wt>ul")[index];
      u.style.marginLeft = -720*this.bcurrLen+ "px";
    },
    goRight(len,index) {
       this.bcurrLen++;
      if (this.bcurrLen >= len / 4) {
        this.bcurrLen--;
        return
      }
      let u = document.querySelectorAll(".wt>ul")[index];
      u.style.marginLeft = -720*this.bcurrLen + "px";
    },
    arrowChange(i,index) {
      if(index==1){
        this.arrowChange1(i)
      }else if(index==2){
        this.arrowChange2(i)
      }else if(index==3){
        this.arrowChange3(i)
      }else if(index==4){
        this.arrowChange4(i)
      }else if(index==5){
        this.arrowChange5(i)
      }
     
    },
    arrowChange2(i) {
      if (i) {
        this.$refs.sub_list2.next();
      } else {
        this.$refs.sub_list2.prev();
      }
    },
    arrowChange1(i) {
      // console.log(this.$refs.sub_list1)
      if (i) {
        this.$refs.sub_list1.next();
      } else {
        this.$refs.sub_list1.prev();
      }
    },
    arrowChange4(i) {
      if (i) {
        this.$refs.sub_list4.next();
      } else {
        this.$refs.sub_list4.prev();
      }
    },
    arrowChange5(i) {
      if (i) {
        this.$refs.sub_list5.next();
      } else {
        this.$refs.sub_list5.prev();
      }
    },
    arrowChange3(i,index) {
      // console.log(index)
      if (i) {
        this.$refs.sub_list3.next();
        
      } else {
        this.$refs.sub_list3.prev();
      }
    },
    goMyPurse() {
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip')}, () => {
          // this.$store.commit('SETLOGIN',true);
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      this.$router.push("/myPurse"), (this.showSDZH = false);
    },
    goDetail(type) {
      let obj = {};
      if (type == 5) {
        return this.$router.push("/active");
      }
      if (type == 1) {
        obj.content =
          '<p><img src="https://img.lgadmin561.com/uploads/20210711/15fd72ae711b12fdf312f59cd40ae157.jpg" title="" alt="" style="max-width: 100%;"/></p>';
      } else if (type == 2) {
        obj.content =
          '<p><img src="https://img.lgadmin561.com/uploads/20210711/203195262c667f2d644e7f411a812af9.jpg" title="" alt="" style="max-width: 100%;"/></p>';
      } else if (type == 3) {
        obj.content =
          '\'<p><img src="https://img.lgadmin561.com/uploads/20210713/f3dd68b10eb48a89d545da03a921a6aa.jpg" title="" alt="" style="max-width: 100%;"/></p>';
      } else if (type == 4) {
        obj.content =
          '\'<p><img src="https://img.lgadmin561.com/uploads/20210711/9428084e11045223b0eec23a9ca426d6.jpg" title="" alt="" style="max-width: 100%;"/></p>';
      }

      window.localStorage.setItem("welcome", JSON.stringify(obj));
      window.open("/welcome");
    },
    showLoginBox(v) {
      this.SETLOGIN(true);
      this.SETISLOGIN(v);
    },
    goQp(item, id) {
      if (item == "mg_slot") {
        return this.$router.push("/game?type=mg");
      }else if (item == "jdb_slot") {
        return this.$router.push("/game?type=jdb");
      }else if (item == "lg_lottery") {
        return this.$router.push("/game?type=lg");
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

        // return this.$confirm(
        //  this.$t('home.tkText[5]'),
        //  this.$t('home.tkText[6]'),
        //   {
        //     confirmButtonText: this.$t('home.tkText[7]'),
        //     cancelButtonText: this.$t('home.tkText[8]'),
        //     confirmButtonClass: "rechargeButton",
        //     cancelButtonClass: "backButton",
        //     roundButton: true,
        //     customClass: "swBox",
        //     center: true,
        //     showCancelButton: true,
        //     dangerouslyUseHTMLString: true,
        //     distinguishCancelAndClose: true,
        //   }
        // )
        //   .then(() => {
        //     this.goRegister();
        //   })
        //   .catch((action) => {
        //     if (action === "cancel") {
              
        //     }
        //   });
      }
      // console.log(item)
      // console.log(id)
      window.open("/toGame/" + item + "/" + id);
      return
      // if (item == "bbin_sport") {
      //   window.open("/toGame/bbin_sport/sport");
      // } else if (item == "ae_live") {
      //   window.open("/toGame/ae_live/live");
      // } else if (item == "bbin_live") {
      //   window.open("/toGame/bbin_live/live");
      // } else if (item == "cmd_sport") {
      //   window.open("/toGame/cmd_sport/sport");
      // } else if (item == "ae_sport") {
      //   window.open("/toGame/ae_sport/sport");
      // } else if (item == "sbo_sport") {
      //   window.open("/toGame/sbo_sport/sport");
      // } else if (item == "cq9") {
      //   window.open("/toGame/cq9/cq9");
      // } else {
      //   window.open("/toGame/" + item + "/" + id);
      // }
    },
    changePure(f) {
      this.SETPURE(f);
      if (this.$route.meta.requirePure) {
        this.$router.push("/");
      }
      if (f == 1) {
        // window.close();
        // window.open('/#/gameCenter')
        //  this.$router.push('/game')
      } else {
      }
    },
    //监听输入事件，当input中有内容时，下面的搜索列表显示出来
    shuru() {
      if (this.searchCon.length > 0) {
        this.$http
          .get(this.versionLive2 + "live/search/", {
            //下拉框的数据
            params: {
              search_content: this.searchCon,
            },
          })
          .then((res) => {
            if (res && res.data.code == 1) {
              this.search = res.data.data;
              this.searchRes = res.data.data.result;
              this.searchlist = true;
            }
          });
      } else {
        this.searchRes = [];
        this.searchlist = false;
      }
    },
    goSearch(searchCon) {
      this.$ro.push({ name: "search", query: { searchCon } }); //进入搜索页面
    },
    toChat(anchor_id, lottery_id) {
      this.$router.push("/chat/" + anchor_id + "/" + lottery_id); //进入直播间
    },
    goHome() {
      this.$router.push("/");
    },
    resetFlag(flag) {
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      this.isEX = flag;
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
        //  alertComfirm({
        //   msg:this.$t('loginTip')+" !",
        //   title:'Nhắc nhở',
        //   conBtText: "Đăng ký",
        //   cancelButtonText: "Đăng nhập",
        //   showCancelButton:true,
        // },()=>{
        //    this.$store.commit("SETLOGIN", true);
        // },()=>{});


  
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
      this.isEX = false;
      this.isRecharge = true;
    },
    goTX() {
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
      this.$router.push("/widthDraw");
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
          //请求头 个人中心那边
          this.$http.defaults.headers["Authorization"] = "Bearer ";
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
          this.SETDIAMOND(""); //钻石
          this.SETUSERUSERID(""); //user_id
          this.SETUSERVIP(""); //用户vip
          this.SETFOCUS(""); //用户关注
          // this.SETPTGG('')//平台广告
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
      // if (this.$store.state.userinfo.user_id < 0) {
      //   return alertComfirm({
      //     msg:this.$t('home.tkText[5]'),
      //     title:this.$t('home.tkText[6]'),
      //     conBtText: this.$t('home.tkText[7]'),
      //     cancelButtonText: this.$t('home.tkText[8]'),
      //     showCancelButton:true,
      //   },()=>{
      //     this.goRegister();
      //   },()=>{});

       
      // }
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0"; //显示出来的
          this.SETBALANCE(this.amount);
          // this.$store.state.balance = this.amount;
        }
      });
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.codeToken) return;
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
      this.zsMount = "loading...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.userinfo.user_id
        )
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.zsMount = 0;
            } else {
              this.zsMount = res.data.data.diamond;
            }
            this.SETDIAMOND(this.zsMount);
          }
        });
    },
    //获取所有彩种信息
    getLottery() {
      this.$http.post("/open/idx/sort/").then((res) => {
        if (res && res.data.code == 1) {
          this.lotteryList = res.data.data;
        }
      });
    },
    //点击切换彩种
    changeLottery(id) {
      window.open("#/red?id=" + id);
      // this.$ro.push({ name: "red", query: { id } },);
    },
    async getAPPUrl() {
      // console.log(66);
      let res = await this.$http.get("/api/common/siteConfig", {
        params: {
          client: 4,
          version: "3.2.1",
        },
      });
      if (res && res.data.code == 1) {
        this.AppUrl = res.data.data.downloadUrl;
        this.bet = res.data.data.betting;
        this.chessArr = res.data.data.chessArr[0];
        this.SETCUSTOMER(res.data.data.customer);
        this.SETWEBDATA(res.data.data);
        localStorage.setItem("customer", res.data.data.customer);
        localStorage.setItem("AppUrl", res.data.data.downloadUrl);
        this.nav = res.data.data.index_nav;
        this.navNoPure = res.data.data.index_nav;
        if (this.isPure == 1) {
          this.nav = this.navPure;
        } else {
          this.nav = this.navNoPure;
        }
      }
    },
    goFh() {
      window.location.href = this.bet;
    },
    goQiPai() {
      window.location.href = this.chessArr;
    },
    //新手任务
    newTask(url) {
      //是否已经登录
      if (!this.codeToken) {
        alertComfirm({ msg:this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      } else {
        window.open("/#/" + url);
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
        // return this.$confirm(
        //   "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
        //   "Nhắc nhở",
        //   {
        //     confirmButtonText: "Đăng ký",
        //     cancelButtonText: "Đăng nhập",
        //     confirmButtonClass: "rechargeButton",
        //     cancelButtonClass: "backButton",
        //     roundButton: true,
        //     customClass: "swBox",
        //     center: true,
        //     showCancelButton: true,
        //     dangerouslyUseHTMLString: true,
        //     distinguishCancelAndClose: true,
        //   }
        // )
        //   .then(() => {
        //     // this.SETUSERTOKEN('');
        //     this.goRegister();
        //   })
        //   .catch((action) => {
        //     if (action === "cancel") {
        //       // this.SETUSERTOKEN('');
        //       // this.$store.commit('SETLOGIN',true);;
        //       // this.$store.commit("SETLOGIN", true);
        //     }
        //   });
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
  // height: 140px;
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
      // width: 20px !important;
      // height: 27px;
      // margin-left: 20px;
      // margin-top: 8px;
      width: 15px !important;
      height: 16px;
      margin-left: 15px;
      margin-top: 9px;
      padding-left: 21px;
      font-size: 14px;
      margin-right: 15px;
      color: #fff;
    }
  .is-pure {
    width: 110px;
    margin-top: 32px;
    span {
      padding-left: 15px;
      font-size: 16px;
    }
  }
  .login {
    height: 40px;
    background: #3292c8;
    ul{
      li{
        height:30px;line-height: 30px;color: #fff;cursor: pointer;
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

    }
    &.login-pink{
      background: #fff;
      ul{
        li{
          color: #FB7772;
          .header-login-btn{
            background: none;
            color: #FB7772;
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
            background: none;
            color: #00B4D8;
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
            background: none;
            color: #09B584;
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
  .pure-box {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #445779;
    background: url("../assets/imgaes/unActive.png") no-repeat left center;
    background-size: 49%;
    width: 100px;
    float: right;
    margin-top: 28px;
    margin-left: 10px;
    padding-left: 55px;
  }
  .withdraw {
    font-size: 14px;
    margin-top: 32px;
    margin-right: 39px;
    margin-left: 10px;
    cursor: pointer;
    .icon {
      display: inline-block;
      width: 27px;
      height: 22px;
      background: url("../assets/imgaes/tx_icon.png") no-repeat center;
      background-size: 100% 100%;
      float: left;
      margin-right: 5px;
    }
  }
  .live-box {
    line-height: 30px;
    font-size: 14px;
    color: #445779;
    background: url("../assets/imgaes/active.png") no-repeat left center;
    background-size: 49%;
    width: 100px;
    float: right;
    margin-top: 28px;
    margin-left: 10px;
    padding-left: 55px;
  }

  .head {
    width: 1300px;
    margin: 0 auto;
    .logo {
      cursor: pointer;
      margin-top: 20px;
      // background: url("../assets/imgaes/topNav/logo.png") no-repeat center;
      // background-size: contain;
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
          width: 92px;
          height: 110px;
          cursor: pointer;
          margin: 0 24px;
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
            span {
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
        display: none;
        width: 100%;
        height: 290px;
        background: #1b8ac8;
        box-shadow: 0px 10px 10px 0px rgba(51, 51, 51, 0.2);
        opacity: 0.95;
        position: absolute;
        top: 150px;
        left: 0;
        // z-index: 100;
        z-index: 1000;
        // transform: translate3d(0, 0, 0);
        // transition: all 0.3s;
        overflow: hidden;
        // padding-top: 3px;
        .describe {
          float: left;
          margin: 36px 0 0 112px;
          p {
            color: #aed8ff;
            font-size: 24px;
            font-weight: 700;
            line-height: 64px;
          }
          em {
            font-style: normal;
            color: #3ef3ff;
            font-size: 18px;
          }
          h2 {
            font-size: 90px;
            color: #fff;
            font-weight: 700;
            line-height: 110px;
          }
        }
        .sub-content {
          position: relative;
          float: left;
          width: 840px;
          height: 290px;
          padding: 0 60px;
          margin-left: 42px;
          overflow: hidden;
          .arrow {
            position: absolute;
            z-index: 3;
            top: 120px;
            width: 45px;
            height: 76px;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            text-align: center;
            padding-top: 22px;

            &.arrow-left {
              left: 0;
              img{
                width: 15px;
                height: 22px;
                margin-top: 7px;
              }
            }
            &.arrow-right {
              right: 0;
              img{
                width: 15px;
                height: 22px;
                margin-top: 7px;
              }
            }
          }
          .sub-list {
            // display: flex;
            transition: all .5s;
            li {
              text-align: center;
              float: left;
              height: 290px;
              padding-top: 32px;
              margin: 0 8px;
              width: 162px;
              img {
                // width: 100%;
                height: 170px;
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
        width: 72px;
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
    // height: 80px;
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
        cursor: pointer !important;
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
// .el-popper {
//   border-top: 3px solid #1486ff !important;
// }
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
.buyCai-icon {
  display: inline-block !important;
  width: 30px !important;
  height: 30px !important;
  margin-right: 15px !important;
  vertical-align: sub !important;
  img {
    width: 100% !important;
    vertical-align: top !important;
  }
}
.ag-icon {
  width: 23px !important;
  height: 20px !important;
  vertical-align: text-bottom !important;
  margin-left: 5px;
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
