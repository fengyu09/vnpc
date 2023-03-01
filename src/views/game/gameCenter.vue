<template>
  <div class="game-center main-sport clearfix">
    <div class="game-type clearfix fl" :class="[{'pink-game-type':$st.state.skin==1},{'blue-game-type':$st.state.skin==2},{'green-game-type':$st.state.skin==3}]">
      <span
        @click="changeType(value.code)"
        v-for="(value, index) in allGames"
        :key="index+'a'"
        :class="[
          { active: currType == value.code },
          { 'active-gq': currType == value.code },
          { 'active-qrj': currType == value.code },
          { 'active-dw': currType == value.code },
          { 'active-new': currType == value.code },
        ]"
      >
        <i
          class="icon"
          :class="[
            { 'active-hot': value.code == 'hot' },
            { 'active-cp': value.code == 'lg' },
            { 'active-ag': value.code == 'ag' },
            { 'active-bg': value.code == 'bg' },
            { 'active-sb': value.code == 'ibc' },
            { 'active-bbin': value.code == 'bbin' },
            { 'active-ae': value.code == 'ae' },
            { 'active-mg': value.code == 'mg' },
            { 'active-sbo': value.code == 'sbo' },
            { 'active-cmd': value.code == 'cmd' },
            { 'active-cq9': value.code == 'cq9' },
            { 'active-dg': value.code == 'dg' },
            { 'active-sa': value.code == 'sa' },
            { 'active-ibo': value.code == 'ibo' },
            { 'active-ebet': value.code == 'ebet' },
            { 'active-allbet': value.code == 'allbet' },
            { 'active-ezu': value.code == 'ezu' },
            { 'active-tcg': value.code == 'tcg' },
            { 'active-jdb': value.code == 'jdb' },
            { 'active-ael': value.code == 'ael' },
            { 'active-fight': value.code == 'fight' },
            { 'active-s128': value.code == 's128' },
            { 'active-aec': value.code == 'aec' },
            { 'active-v8': value.code == 'v8' },
            { 'active-jili': value.code == 'jili' },
            { 'active-kx': value.code == 'kx' },
            { 'active-pp': value.code == 'pp' },
            { 'active-ky': value.code == 'ky' },
            { 'active-qm': value.code == 'qm' },
            { 'active-fc': value.code == 'fc' },
            { 'active-rich88': value.code == 'rich88' },
            { 'active-pt': value.code == 'pt' },
          ]"
        ></i>
        {{ value.name|filterPtName(value.code) }}
      </span>
    </div>
    <div class="right-content fl">
      <!--热门推荐-->
      <!-- <div class="hot-tj" v-for="(value,index) in allGames" v-show="value.name=='热门推荐'&&currType==value.name" :key="index"> -->
      <div
        class="hot-tj"
        v-for="(value, index) in allGames"
        v-show="value.code == 'hot' && currType == value.code"
        :key="index+'m'"
      >
        <div
          class="game-container qp-container"
          v-show="value.list.length"
          v-for="(v, index1) in value.list"
          :key="index1+'c'"
        >
        
          <h3>
            <span class="icon" :class="v.name | filterIcon"></span
            >{{ v.name }} {{$t('game.text[0]')}}
            <span
              v-if="v.code == 'hot'"
              @click="$router.push('/gameRule/1')"
            >
              <img
                src="../../assets/imgaes/openLottery/wfgz_icon.png"
                alt=""
                srcset=""
                style="vertical-align: sub"
              />
              {{$t('game.text[2]')}}</span
            >
          </h3>
          <ul>
            <li
              v-for="(vv, index2) in v.list"
              :key="index2+'d'"
              @click="goQp(vv, v.name)"
              :data-cid="vv.id"
              :class="vv.type"
            >
              <i class="tag-icon" v-if="vv.tag" :class="vv.tag | filterTag"></i>
              <span class="close-icon"></span>
              <div class="g-img"><img v-lazy="vv.img" alt="" /></div>
              <p class="game-name">{{ vv.name }}</p>
              <span class="time">{{ vv.remark }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="hot-tj"
        v-for="(value, index) in allGames"
        v-show="value.code != 'hot' && currType == value.code"
        :key="index+'b'"
      >
        <!--            最近使用-->
        <div class="game-container qp-container other-game-container">
         
          <h3>
            <span class="icon" :class="value.name | filterIcon"></span
            >{{ value.name }} 
            <span
              v-if="value.code == 'hot'"
              @click="$router.push('/gameRule/1')"
            >
              <img
                src="../../assets/imgaes/openLottery/wfgz_icon.png"
                alt=""
                srcset=""
                style="vertical-align: sub"
              />
              {{$t('gameCenter.text[0]')}}</span
            >
          </h3>
          <ul>
            <li
              v-for="(v, index1) in value.list"
              :key="index1+'y'"
              @click="goQp(v, value.name)"
              :class="v.type"
              :data-cid="v.id"
            >
              <i class="tag-icon" v-if="v.tag" :class="v.tag | filterTag"></i>
              <i class="close-icon"></i>
              <div class="g-img"><img v-lazy="v.img" alt="" /></div>
              <p class="game-name">{{ v.name }}</p>
              <span class="time">{{ v.remark }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alertComfirm } from "../../assets/js/public";
import { mapState } from "vuex";

export default {
  data() {
    return {
      allGames: [],
    };
  },
  created() {
    this.currType = this.$route.query.type?this.$route.query.type.toLowerCase():'' || "hot";
    this.getHotGame();
  },
  watch: {
   
  },
  computed: {
    ...mapState([
      "codeToken",
      "userinfo",
    ]),
  },
  filters: {
    filterIcon(n) {
      let icon = "";
      if (n == "trò chơi sổ xố ") {
        icon = "cp";
      } else if (n == "棋牌游戏") {
        icon = "qp";
      } else if (n == "AG视讯") {
        icon = "ag";
      } else if (n == "AG电子") {
        icon = "ag";
      } else if (n == "BG视讯") {
        icon = "bg";
      } else if (n == "BG捕鱼") {
        icon = "bg";
      }
      return icon;
    },
    filterTag(n) {
      let tag = "";
      if (n == "NEW") {
        tag = "tag-new";
      } else if (n == "HOT") {
        tag = "tag-hot";
      }
      return tag;
    },
    filterPtName(n,code){
      if(code=='ael'){
        return 'AE Lottery'
      }else{
        return n
      }

    }
  },
  methods: {
    changeType(name){
      this.currType = name;
      this.$router.push('/game?type='+name)
    },
    

    //获取热门列表
    async getHotGame(flag) {
      this.allGames = this.$store.state.GameCenter;
      
      if (this.allGames.length) return;
      let res = await this.$http.get("/api/vendor/allgames");
      if (res.data && res.data.code == 1) {
        this.allGames = res.data.data;
        let id=this.allGames.findIndex((c)=>{
          return c.code=='hot'
        })
        this.allGames.splice(id,1)
        this.$store.commit("SETGAMECENTER", this.allGames);
      }
    },
    goQp(item) {
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('gameCenter.text[2]') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      } else {
        if (item.vendor == "lg") {
          this.$router.push("/lotteryGame/" + item.code+'?name='+item.name);
        } else {
          if (this.$store.state.userinfo.user_id < 0) {
            return alertComfirm({
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
          if (item.vendor == "mg"||item.vendor == "jdb"||item.vendor == "jili"||item.vendor=="qm"||item.vendor=="ky"||item.vendor=="rich88"||item.vendor=="pp"||item.vendor=="pt"||item.vendor=="pg") {
            window.open("/toGame/" + item.vendor + "/" + item.code);
          } else {
            if (item.code == "bbin_sport") {
              window.open("/toGame/" + item.code + "/sport");
            } else if (item.code == "bbin_live") {
              window.open("/toGame/" + item.code + "/live");
            }else if (item.code == "ae_slot") {
              window.open("/toGame/" + item.code + "/slot");
            }else if (item.code == "cq9_sport") {
              window.open("/toGame/" + item.code + "/sport");
            }else if (item.code == "v8_chess") {
              window.open("/toGame/" + item.code + "/chess");
            } else {
              window.open("/toGame/" + item.code + "/" + item.code);
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.game-center {
  padding-top: 56px;
  .game-type {
    width: 260px;
    overflow: hidden;
    margin-right: 46px;
    > span {
      width: 260px;
      height: 59px;
      line-height: 59px;
      font-size: 18px;
      color: #6e7c9e;
      border-radius: 30px;
      background: #fff;
      border: 2px solid #ecf5ff;
      float: left;
      margin-bottom: 10px;
      padding-right: 18px;
      cursor: pointer;
      &.active {
        color: #fff;
        background: url("../../assets/imgaes/game/ti-bg.png") no-repeat;
        background-size: 100% 100%;
        .icon {
          filter: grayscale(100%) brightness(200%);
          &.active-ebet{
            background: url("../../assets/imgaes/game/icon-ebet2.png") no-repeat;
            background-size: contain;
            margin-top: 18px;
          } 
        }
      }
      .icon {
        width: 50px;
        height: 40px;
        margin-top: 8px;
        margin-left: 18px;
        margin-right: 8px;
        float: left;
        // filter: grayscale(100%) ;
        &.active-hot {
          background: url("../../assets/imgaes/game/nav-rm.png") no-repeat;
          background-size: contain;
          margin-top: 5px;
        }
        &.active-cp {
          background: url("../../assets/imgaes/game/nav-cp.png") no-repeat;
          background-size: contain;
        }
        &.active-qp {
          background: url("../../assets/imgaes/game/nav-qp.png") no-repeat;
          background-size: contain;
        }
        &.active-ag {
          background: url("../../assets/imgaes/game/nav-ag.png") no-repeat;
          background-size: contain;
        }
        &.active-bg {
          background: url("../../assets/imgaes/game/nav-bg.png") no-repeat;
          background-size: contain;
        }
        &.active-ky {
          background: url("../../assets/imgaes/game/nav-ky.png") no-repeat;
          background-size: contain;
        }
        &.active-sb {
          background: url("../../assets/imgaes/game/nav-sb.png") no-repeat;
          background-size: contain;
        }
        &.active-im {
          background: url("../../assets/imgaes/game/nav-im.png") no-repeat;
          background-size: contain;
        }
        &.active-bbin {
          background: url("../../assets/imgaes/game/icon-bbin.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-ae {
          background: url("../../assets/imgaes/game/icon-ae.png") no-repeat;
          background-size: contain;
        }
         &.active-ael {
          background: url("../../assets/imgaes/game/icon-ael.png") no-repeat;
          background-size: contain;
          margin-top: 16px;
        }
        &.active-fight {
          background: url("../../assets/imgaes/game/icon-fight.png") no-repeat;
          background-size: contain;
        }
        &.active-s128 {
          background: url("../../assets/imgaes/game/icon-fight.png") no-repeat;
          background-size: contain;
        }
        &.active-aec{
           background: url("../../assets/imgaes/game/icon-aec.png") no-repeat;
          background-size: contain;
        }
        &.active-v8{
          background: url("../../assets/imgaes/game/icon-v8.png") no-repeat;
          background-size: contain;
        }
        &.active-jili{
          background: url("../../assets/imgaes/game/icon_jili.png") no-repeat;
          background-size: contain;
        }
        &.active-mg {
          background: url("../../assets/imgaes/game/icon-mg.png") no-repeat;
          background-size: contain;
        }
        &.active-cmd {
          background: url("../../assets/imgaes/game/icon-cmd.png") no-repeat;
          background-size: contain;
          margin-top: 14px;
        }
        &.active-sbo {
          background: url("../../assets/imgaes/game/icon-sbo.png") no-repeat;
          background-size: contain;
        }
        &.active-cq9 {
          background: url("../../assets/imgaes/game/icon-cq9.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-dg {
          background: url("../../assets/imgaes/game/icon-dg.png") no-repeat;
          background-size: contain;
          margin-top: 14px;
        }
        &.active-sa {
          background: url("../../assets/imgaes/game/icon-sa.png") no-repeat;
          background-size: contain;
          margin-top: 5px;
        }
        &.active-ebet{
          background: url("../../assets/imgaes/game/icon-ebet.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        } 
        &.active-allbet{
          background: url("../../assets/imgaes/game/icon-allbet.png") no-repeat;
          background-size: contain;
        } 
        &.active-ibo{
          background: url("../../assets/imgaes/game/icon-ibo.png") no-repeat;
          background-size: contain;
        } 
        &.active-icash{
          background: url("../../assets/imgaes/game/icon-icash.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }  
        &.active-ezu{
          background: url("../../assets/imgaes/game/icon-ezu.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        } 
        &.active-tcg{
          background: url("../../assets/imgaes/game/icon-tcg.png") no-repeat;
          background-size: contain;
        }
        &.active-jdb{
          background: url("../../assets/imgaes/game/icon-jdb.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-pp{
          background: url("../../assets/imgaes/game/icon-pp.png") no-repeat;
          background-size: contain;
          margin-top: 2px;
        }
        &.active-fc{
          background: url("../../assets/imgaes/game/icon-fc.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-kx{
          background: url("../../assets/imgaes/game/icon-kx.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-ky{
          background: url("../../assets/imgaes/game/icon-ky.png") no-repeat;
          background-size: contain;
          
        }
        &.active-qm{
          background: url("../../assets/imgaes/game/icon-qm.png") no-repeat;
          background-size: contain;
          
        }
        &.active-rich88{
          background: url("../../assets/imgaes/game/icon-rich88.png") no-repeat;
          background-size: contain;
          margin-top: 18px;
        }
        &.active-pt{
          background: url("../../assets/imgaes/game/icon-pt.png") no-repeat;
          background-size: contain;
          margin-top: 10px;
        }
      }
    }
    &.pink-game-type{
      >span{
        &.active{
          background: url("../../assets/imgaes/game/pink-ti-bg.png") no-repeat;
          background-size: 100% 100%;
        }
        
      }
    }
     &.blue-game-type{
      >span{
        &.active{
          background: url("../../assets/imgaes/game/blue-ti-bg.png") no-repeat;
        background-size: 100% 100%;
        }
      }
    }
     &.green-game-type{
      >span{
        &.active{
          background: url("../../assets/imgaes/game/green-ti-bg.png") no-repeat;
        background-size: 100% 100%;
        }
      }
    }
  }
  .right-content {
    width: 994px;
  }
  .game-container {
    padding-bottom: 10px;
    margin-bottom: 10px;
    h3 {
      font-weight: bold;
      line-height: 24px;
      font-size: 18px;
      color: #445779;
      padding: 20px 0 12px 0px;
      span {
        float: right;
        font-weight: normal;
        cursor: pointer;
      }
      > .icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        float: left;
        margin-right: 5px;
        &.cp {
          background: url("../../assets/imgaes/game/title_icon_1.png") no-repeat
            center;
        }
        &.qp {
          background: url("../../assets/imgaes/game/title_icon_2.png") no-repeat
            center;
        }
        &.ag {
          background: url("../../assets/imgaes/game/title_icon_3.png") no-repeat
            center;
        }
        // &.bg {
        //   background: url("../../assets/imgaes/game/title_icon_4.png") no-repeat
        //     center;
        // }
      }
    }
    ul {
      overflow: hidden;
      li {
        cursor: pointer;
        width: 190px;
        height: 242px;
        background: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        float: left;
        text-align: center;
        margin: 10px 38px 10px 0;
        position: relative;
        
        &:nth-of-type(4n + 0) {
          margin-right: 0;
        }
        .tag-icon {
          position: absolute;
          width: 56px;
          height: 58px;
          right: 0;
          top: 0;
          &.tag-hot {
            background: url("../../assets/imgaes/game/hot.png") no-repeat;
            background-size: contain;
          }
          &.tag-new {
            background: url("../../assets/imgaes/game/new.png") no-repeat;
            background-size: contain;
          }
        }
        
        .close-icon {
          width: 60px;
          height: 20px;
          background: url("../../assets/imgaes/game/status.png") no-repeat
            center;
          position: absolute;
          top: 10px;
          left: 7px;
          display: none;
        }
        &.active {
          .close-icon {
            display: block;
          }
        }
        .g-img {
          width: 125px;
          height: 125px;
          margin: 43px auto 0;
          img {
            width: 100%;
          }
        }
        .game-name {
          font-size: 18px;
          color: #445779;
          padding: 13px 5px 8px;
          word-wrap: break-word;
          word-break: normal;
        }
        .time {
          font-size: 12px;
          color: #657697;
        }
      }
    }
  }
}
</style>