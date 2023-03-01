<template>
  <div id="home">
    <div class="home-banner">
      <el-carousel height="423px" arrow="always" :autoplay="false">
        <el-carousel-item v-for="(item, index) in homeBanner" :key="index">
          <img
            style="width: 100%; height: 100%"
            v-lazy="item.image_url"
            @click="toBannerUtl(item.url)"
            alt
          />
        
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="home-msg clearfix" :class="[{'pink-bg':skin ==1},{'blue-bg':skin ==2},{'green-bg':skin ==3}]">
      <div class="main-sport clearfix">
        <img class="icon" src="../../assets/imgaes/home/msg.png" alt />
        <marquee class="fl" scrollAmount="3" scrolldelay="50" direction="left">
          <span
            v-for="(v, index) in systemMsg"
            :key="index"
            v-if="systemMsg.length"
            >{{ index + 1 }}.{{ v.content }}&nbsp;&nbsp;&nbsp;</span
          >
          <span v-else>{{$t('home.mess[0]')}}</span>
        </marquee>
      </div>
    </div>
    <!-- 主内容 -->
    <div class="home-main">
      <div class="main-sport" style="width: 100%">
        <!-- 品牌展示 -->
        <div
          class="brand-display clearfix"
          style="display: flex; justify-content: center"
        >

           <div class="brand-item brand-bg1 fl" v-for="(item,index) in $t('home.brand')" :key="index">
            <img class="fl" v-show="skin==0" :src="require('../../assets/imgaes/home/tjbg-'+(index+1)+'.png')" alt="" />
            <img class="fl" v-show="skin==1" :src="require('../../assets/imgaes/skin/pink/tjbg-'+(index+1)+'.png')" alt="" />
            <img class="fl" v-show="skin==2" :src="require('../../assets/imgaes/skin/blue/tjbg-'+(index+1)+'.png')" alt="" />
            <img class="fl" v-show="skin==3" :src="require('../../assets/imgaes/skin/green/tjbg-'+(index+1)+'.png')" alt="" />
            <h5 class="brand-title" :style="index=2?'width: 240px;right: 12px;':''">{{item.title}}</h5>
              <p :style="index=2?'line-height: 18px;':''">{{item.content}}</p>
          </div>
        </div>
        
       
        <!-- 热门游戏 -->
        <div class="hot-game clearfix" :class="[{'skin-hot-game':skin>0},{'pink-hot-game':skin==1},{'blue-hot-game':skin==2},{'green-hot-game':skin==3}]">
          <div style="text-align: center">
            <span class="title-text" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('home.hotGame.title')}}</span>
            <img
            v-show="skin==0"
              class="title-pic"
              src="../../assets/imgaes/home/rm-title.png"
              alt=""
              style="width:1200px"
            />
            <img
            v-show="skin==1"
              class="title-pic"
              src="../../assets/imgaes/skin/pink/rm-title.png"
              alt=""
              style="width:1200px"
            />
             <img
            v-show="skin==2"
              class="title-pic"
              src="../../assets/imgaes/skin/blue/rm-title.png"
              alt=""
              style="width:1200px"
            />
             <img
            v-show="skin==3"
              class="title-pic"
              src="../../assets/imgaes/skin/green/rm-title.png"
              alt=""
              style="width:1200px"
            />
            
          </div>
          <div class="game-tab">
           
            <ul>
              <li
                :class="{ active: gameTabCur == v.code }"
                @click="gameTab(v)"
                v-for="(v, index) in gameList"
                :key="index"
              >
                <img class="icon" v-if="skin==0" :src="require('../../assets/imgaes/home/game-icon-' + v.code + '.png') " alt=""/>
                <img class="icon" v-if="skin>0&&gameTabCur != v.code"  :src="require('../../assets/imgaes/skin/skin'+skin+'/game-icon-' + v.code + '.png') " alt=""/>
                <img class="icon" v-if="skin>0&&gameTabCur == v.code"  :src="require('../../assets/imgaes/home/game-icon-' + v.code + '.png') " alt=""/>
                <p style="margin-top: 10px">{{ v.name }}</p>
              </li>
            </ul>
          </div>
          <div
            class="game-content"
            v-show="gameTabCur == v.code"
            v-for="(v, index) in gameList"
            :key="index"
          >
            <div class="pic fl">
              <img
                :src="
                  require('../../assets/imgaes/home/game-pic-' +
                    v.code +
                    '.png')
                "
                alt=""
              />
            </div>
            <div class="game-txt">
              <h5>{{ v.name }}</h5>
              <p class="text">{{ $t('home.gameMess')[gameTabCur].content }}</p>
              <ul>
                <li
                  v-for="(item, index2) in $t('home.gameMess')[gameTabCur].list[skin]"
                  :key="index2"
                >
                  <img :src="item.img" alt="" />
                  <p>{{ item.name }}</p>
                </li>
              </ul>
              <div class="btn">
                <a
                  href="javascript:;"
                  @click="goQp(vv, v)"
                  v-for="(vv, index1) in v.list"
                  :key="index1"
                  >{{ vv.name }}</a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- APP下载 -->
        <div class="download clearfix">
          <span class="title-text" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('home.downApp.title')}}</span>

          <img
          v-show="skin==0"
            class="title-pic"
            src="../../assets/imgaes/home/dow-title.png"
            alt=""
            style="width:1300px"
          />
          <img
          v-show="skin==1"
            class="title-pic"
            src="../../assets/imgaes/skin/pink/dow-title.png"
            alt=""
            style="width:1300px"
          />
           <img
          v-show="skin==2"
            class="title-pic"
            src="../../assets/imgaes/skin/blue/dow-title.png"
            alt=""
            style="width:1300px"
          />
           <img
          v-show="skin==3"
            class="title-pic"
            src="../../assets/imgaes/skin/green/dow-title.png"
            alt=""
            style="width:1300px"
          />
          
          <div class="download-carousel fl">
            <img
              v-show="$st.state.lanCode ==1"
              class="pic-bg"
              src="../../assets/imgaes/download/ty_bg.png"
              alt=""
            />
            <img
            v-show="$st.state.lanCode !=1"
              class="pic-bg"
              src="../../assets/imgaes/download/ty_bgy.png"
              alt=""
            />
           
          </div>
          <div class="download-txt fl">
            <img  v-show="$st.state.lanCode !=1" src="../../assets/imgaes/download/title_01y.png" style="width:546px;height:309px" alt="" />
            <img v-show="skin==0&&$st.state.lanCode ==1" src="../../assets/imgaes/download/title_01.png" style="width:546px;height:309px" alt="" />
            <img v-show="skin==1&&$st.state.lanCode ==1" src="../../assets/imgaes/skin/pink/title_01.png" style="width:546px;height:309px" alt="" />
            <img v-show="skin==2&&$st.state.lanCode ==1" src="../../assets/imgaes/skin/blue/title_01.png" style="width:546px;height:309px" alt="" />
            <img v-show="skin==3&&$st.state.lanCode ==1" src="../../assets/imgaes/skin/green/title_01.png" style="width:546px;height:309px" alt="" />
            <p class="text" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">
             {{$t('home.downApp.content')}}
            </p>
            <div class="download-box">
              <div class="item fl">
                <img style="width:140px" src="../../assets/imgaes/home/download-code.png" alt="" />
                <p>{{$t('home.downApp.load[0]')}}<br />{{$t('home.downApp.load[1]')}}</p>
              </div>
              <div class="item fl">
                <img src="../../assets/imgaes/home/download-code2.png" alt="" />
                <a href="https://www.k188.app" target="_blank"
                  >{{$t('home.downApp.load[2]')}}<br />www.k188.app</a
                >
              </div>
            </div>
          </div>
        </div>
        



      </div>
    </div>

    <!-- 世界杯代理icon -->
    <div class="sjb"  v-if="showSjb==true">
      <div class="close-btn" @click="hideSjb()"><img src="../../assets/imgaes/dlClose.png" alt=""></div>
      
      <img @click="goDl()" src="../../assets/imgaes/sjbpc_en.png" v-if="$st.state.defalutLan=='en'" alt="">
      <img @click="goDl()" src="../../assets/imgaes/sjbpc.png" v-else alt="">
    </div>
  </div>
</template>

<script>
// import func from 'vue-editor-bridge';
import { mapState } from "vuex";
import { alertComfirm } from "../../assets/js/public";
export default {
  data() {
    return {
      systemMsg: null,
      gameTabCur: 0, //热门游戏
      gameList: [], //热门游戏列表
      gameMess: this.$t('home.gameMess'),
      homeBanner: [],
    };
  },
  computed: {
    ...mapState(["codeToken","skin","defalutLan","showSjb"]),
  },
  created() {
    this.init();
  },
  watch: {
    codeToken: function (i) {
      if (i != "") {
        if (localStorage.getItem("HotMatchTime") != new Date().getDate()) {
          localStorage.setItem("HotMatchTime", new Date().getDate());
        }
      }
    },
    

  },
  filters: {
    filterLen(n) {
      n = n.length > 11 ? n.slice(0, 11) + "..." : n;
      return n;
    },
  },

  methods: {
    hideSjb(){
      this.$st.commit('SETSJB',false);
    },
    goDl(){
            if(this.$st.state.defalutLan=='en'){
                window.open('https://img.k188admin.com//uploads/20221108/f73ec4b0f17b1e3b0e2d0aac9a44bc24.jpg')
            }else{
                window.open('https://img.k188admin.com//uploads/20221108/53bc831adee282180e34af488b6fbe6d.jpg')
            }
            },
    toBannerUtl(url) {
      if (url) window.open(url);
    },
    async getBanner() {
      this.homeBanner = this.$store.state.homeBanners || [];
      if (this.homeBanner.length) return;
      let res = await this.$http.get("/api/live/sport/get_pc_first_banner/");
      this.homeBanner = res.data.data || [];
      this.$store.commit("SETHOMEBANNWERS", this.homeBanner);
    },

    goQp(item, id) {
      console.log(item);
      // return
      //乐购彩票  乐购棋牌  开源棋牌  跳转到游戏中心 相应位置 game?type=1
      if (
        item.code == "lg_lottery" ||
        item.code == "fh_chess" ||
        item.code == "ky" ||
        item.code == "mg_slot"||
        item.code == "jili_slot"||
        item.code == "jdb_slot"||
        item.code == "pp_slot"||
        item.code == "pt_slot"||
        item.code == "pg_slot"
      ) {
        // window.open()

        if (item.code == "lg_lottery") {
          this.$router.push("/game?type=lg");
        } else if (item.code == "mg_slot") {
          this.$router.push("/game?type=mg");
        }else if (item.code == "jdb_slot") {
          this.$router.push("/game?type=jdb");
        }else if (item.code == "jili_slot") {
          this.$router.push("/game?type=jili");
        } else if (item.code == "pp_slot") {
          this.$router.push("/game?type=pp");
        }
        else if (item.code == "pt_slot") {
          this.$router.push("/game?type=pt");
        }
        else if (item.code == "pg_slot") {
          this.$router.push("/game?type=pg");
        }
        else {
          this.$router.push("/game?type=" + item.name_cn);
        }
      } else {
        if (!this.$store.state.codeToken) {
          alertComfirm({ msg: this.$t('gameCenter.text[2]') }, () => {
            this.$store.commit("SETLOGIN", true);
          });
          return;
        }
        // 试玩不能
        //体育  真人 电子 捕鱼  直接跳转到游戏
        if (this.$store.state.userinfo.user_id < 0) {
          return  alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.$store.commit("SETLOGIN", true);
            this.$store.commit("SETISLOGIN", false);
        },()=>{});
        }
       if (item.code == "bbin_sport") {
          window.open("/toGame/bbin_sport/sport");
        } else if (item.code == "ae_live") {
          window.open("/toGame/ae_live/live");
        } else if (item.code == "bbin_live") {
          window.open("/toGame/bbin_live/live");
        } else if (item.code == "cmd_sport") {
          window.open("/toGame/cmd_sport/sport");
        } else if (item.code == "ae_sport") {
          window.open("/toGame/ae_sport/sport");
        }else if (item.code == "ae_slot") {
          window.open("/toGame/ae_slot/slot");
        } else if (item.code == "sbo_sport") {
          window.open("/toGame/sbo_sport/sport");
        } else if (item.code == "cq9_sport") {
          window.open("/toGame/cq9_sport/sport");
        } else if (item.code == "pt_live") {
          window.open("/toGame/pt_live/live");
        }
        else if (item.code == "v8_chess") {
          window.open("/toGame/v8_chess/chess");
        } else {
          window.open("/toGame/" + item.code + "/" + id);
        }
      }
    },
    init() {
    
      if (this.noticeTypes == 1) {
        this.getSystemNotice();
      } else {
        this.getSystemNoticeDl();
      }
      this.getGameList();
      this.getBanner();
    },
    async getGameList() {
      this.gameList = this.$store.state.HomeGame || [];
      if (this.gameList.length)
        return (this.gameTabCur = this.gameList[0].code);
      let res = await this.$http.get("/api/vendor/homegames", {
        params: { is_pc: 1 },
      });
      this.gameList = res.data.data || [];
        let id=this.gameList.findIndex((c)=>{
        return c.code=='hot'
      })
      this.gameList.splice(id,1)
      this.gameTabCur = this.gameList[0].code;
      this.$store.commit("SETHOMEGAME", this.gameList);
    },
    //获取官方系统公告
    async getSystemNotice() {
      let res = await this.$http.get("/api/live/sport/system_notice/");
      if (res && res.data.code == 1) {
        this.systemMsg = res.data.data;
      }
    },
    //获取代理系统公告
    async getSystemNoticeDl() {
      let res = await this.$http.get("/api/live/sport/system_notice_dl/");
      if (res && res.data.code == 1) {
        this.systemMsg = res.data.data;
      }
    },
    
   
    //热门游戏
    gameTab(v) {
      this.gameTabCur = v.code;
    },
  },
};
</script>
<style lang="less">
.sjb{
  position: absolute;
  left: 8px;
  top: 860px;
  position: absolute;
  left: 12px;
  width: 200px;
  z-index: 100;
  cursor: pointer;
  .close-btn{
    width: 50px;
    position: absolute;
    right: 0;
  }
  img{
    width: 100%;
  }
}
.home-msg {
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #fff;
  background: #1b74c8;
  .icon {
    margin-top: 20px;
    float: left;
    margin-right: 10px;
    width: 28px;
    height: 25px;
  }
  marquee {
    width: 95%;
  }
}
.home-main {
  background: url("../../assets/imgaes/home/main-bg.png") no-repeat center
    bottom;
    background-size: 100% 100%;
  .brand-display {
    padding-top: 30px;
    .brand-item {
      margin-right: 40px;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.3s;
      position: relative;
      img{
         width: 375px;
          height: 180px;
      }
      &:hover {
        box-shadow: 0px 0px 8px #e6e6e9; /* 边框阴影 */
        .brand-title {
          transform: scale(1.1);
        }
      }
      &:last-of-type {
        margin-right: 0;
      }
      .brand-title {
        line-height: 24px;
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 15px;
        transition: 0.4s;
        position: absolute;
        right: 55px;
        top: 9px;
        width: 150px;
        text-align: center;
      }
      p {
        line-height: 21px;
        font-size: 12px;
        width: 240px;
        color: #fff;
         position: absolute;
         right: 9px;
         bottom: 9px;
      }
    }
  }
  .title-pic {
    margin: 0 auto 60px;
  }
  
  .hot-game {
    width: 1300px;
    margin: 0 auto;
    .game-tab {
      height: 85px;
      font-size: 22px;
      color: #fff;
      border-radius: 6px;
      background: #1b74c8;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 246px;
          height: 85px;
          display: flex;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &.active {
            background: url("../../assets/imgaes/home/game-tabbg.png") no-repeat;
            background-size: 100% 100%;
          }
          .icon{
            width: 35px;
          }
        }
      }
    }
    .game-content {
      min-height: 720px;
      .pic {
        margin-top: 54px;
        // margin-right: 88px;
        -webkit-transition: all 0.6s;
        transition: all 0.6s;
        width: 548px;
        img{
          width: 100%;
        }
        &:hover {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
      }
      .game-txt {
        width: 600px;
        float: right;
        h5 {
          line-height: 50px;
          font-family: "HYYaKuHeiW";
          font-weight: normal;
          font-size: 36px;
          color: #6e7c9e;
          padding-top: 84px;
        }
        .text {
          line-height: 25px;
          font-size: 16px;
          color: #6e7c9e;
          padding: 10px 0 37px;
        }
        ul {
          overflow: hidden;
          padding-bottom: 80px;
          li {
            font-size: 14x;
            color: #7887a6;
            text-align: center;
            margin-right: 13px;
            float: left;
            cursor: default;
            transition: all 0.2s ease;
            img {
              margin-bottom: 5px;
              width: 50px;
              height: 55px;
            }
            &:hover {
              transform: translatey(-1%) scale(1.1);
            }
          }
        }
        .btn {
          a {
            display: inline-block;
            padding: 0 20px;
            min-width: 164px;
            height: 64px;
            line-height: 64px;
            font-size: 24px;
            color: #657697;
            text-align: center;
            background: url("../../assets/imgaes/home/game-tibg1.png") no-repeat;
            background-size: 100% 100%;
            margin-right: 16px;
            margin-bottom: 15px;
            &.active,
            &:hover {
              color: #fff;
              background: url("../../assets/imgaes/home/game-tibg2.png")
                no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    &.skin-hot-game{
      .game-tab{
        background: #fff;
      }
      .btn{
        a{
          background: none !important;
          border-radius: 8px!important;
          height: 55px!important;
          line-height: 55px!important;
           &:hover{
            color: #fff !important;
          }
        }
        }
     
    }
    &.green-hot-game{
      .game-content{
        .game-txt{
          ul{
            li{
               color: #09B584;
            }
          }
        }
      }
      .game-tab{
         color: #09B584;
         ul{
           li{
             &.active{
               background: #09B584;
               color: #fff;
             }
           }
         }
      }
     
      h5,.text{
         color: #09B584 !important;
      }
      .btn{
        a{
          color: #09B584 !important;
          border: 1px solid #09B584 !important;
          &:hover{
            background: #09B584 !important;
          }
        }
      }
    }
    &.blue-hot-game{
      .game-content{
        .game-txt{
          ul{
            li{
               color: #00B4D8;
            }
          }
        }
      }
      .game-tab{
         color: #00B4D8;
         ul{
           li{
             &.active{
               background: #00B4D8;
               color: #fff;
             }
           }
         }
      }
      h5,.text{
         color: #00B4D8 !important;
      }
      .btn{
        a{
          color: #00B4D8 !important;
          border: 1px solid #00B4D8 !important;
          &:hover{
            background: #00B4D8 !important;
          }
        }
      }
    }
    &.pink-hot-game{
      .game-content{
        .game-txt{
          ul{
            li{
               color: #FB7772;
            }
          }
        }
      }
      .game-tab{
         color: #FB7772;
         ul{
           li{
             &.active{
               background: #FB7772;
               color: #fff;
             }
           }
         }
      }
      h5,.text{
         color: #FB7772 !important;
      }
      .btn{
        a{
          color: #FB7772 !important;
          border: 1px solid #FB7772 !important;
          &:hover{
            background: #FB7772 !important;
          }
        }
      }
    }

  }
  .download {
    width: 1300px;
    margin: 0 auto;
    padding-bottom: 30px;
    .download-carousel {
      width: 679px;
      height: 699px;
      margin-right: 0px;
      position: relative;
      .pic-bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
      }
      .el-carousel {
        width: 231px;
        margin-left: 235px;
        margin-top: 30px;
        .el-carousel__item {
          img {
            width: 100%;
            transition: all 0.6s ease;
          }
          &:hover {
            img {
              -webkit-transform: scale(1.01);
              transform: scale(1.01);
            }
          }
        }
      }
    }
    .text {
      width: 525px;
      line-height: 25px;
      font-size: 14px;
      color: #6e7c9e;
      padding: 23px 0 37px 50px;
      
    }
    .download-box {
      padding-left: 100px;
      .item {
        width: 190px;
        height: 220px;
        font-size: 14px;
        color: #6e7c9e;
        text-align: center;
        background: #ffffff;
        border: 1px solid #cedce1;
        box-shadow: 0px 10px 10px 0px rgba(72, 63, 74, 0.1);
        border-radius: 10px;
        padding-top: 21px;
        margin-right: 70px;
        img {
          display: block;
          margin: 0 auto 11px;
        }
        a {
          color: #6e7c9e;
        }
      }
    }
  }
}
#home {
  min-height: 800px;
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

  background-color: #f4f5f8;
 
  .banner {
    margin: 20px auto 0 auto;
    height: 108px;
    border-radius: 5px;
    overflow: hidden;
    a {
      display: block;
      height: 100%;
      background: #eee;
    }
    img {
      width: 100%;
      height: auto;
    }
  }

  @keyframes all {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1.2);
    }
  }
}


.title-text{
  font-weight: bold;
  display: block;
  text-align: center;
  width: 1200px;
  font-size: 36px;
  color: #445779;
  margin: 60px auto 20px;

}
</style>
