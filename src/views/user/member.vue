<template>
  <div id="member">
   
    <div class="main clearfix">
      <div class="fl tabMenu">
        <div class="user-mess-box">
          <div class="user-name">{{ userinfo.nickname }}  <i class="vip-icon" :class="'VIP'+$st.state.userinfo.vip"></i></div>
          <div class="user-money">
            <div><span>{{$t('member[0]')}}</span>  <i @click="loadMoney"  class="el-icon-refresh fl" style="color:#ccc;"></i></div>
            <p>{{$t('moneyDw')}} {{ balance ? balance : "0" }}</p>

            <span v-if="lanCode==1">(1 vndk = 1000 vnd)</span>
            <span @click="hsMoney" class="hs-btn" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('member[13]')}}</span>
            
          </div>
        </div>
        <ul class="tab" :class="[{'pink-tab':skin==1},{'blue-tab':skin==2},{'green-tab':skin==3}]">
          <li :class="{ active: cur == 1 }">
            <i class="icon icon1"></i>
            <router-link to="/userInfor">{{$t('member[1]')}}</router-link>
          </li>

           <li :class="{ active: cur == 12 }">
            <i class="icon icon2"></i>
            <router-link to="/moneyCenter">{{$t('member[2]')}}</router-link>
          </li>

           <li :class="{ active: cur == 13 }" @click="goRecharge(1)">
            <i class="icon icon13"></i>
            <a>{{$t('member[3]')}}</a>
          </li>
           <li :class="{ active: cur == 14 }">
            <i class="icon icon14"></i>
            <router-link to="/widthDraw">{{$t('member[4]')}}</router-link>
          </li>
          
       
          <li :class="{ active: cur == 7 }">
            <i class="icon icon8"></i>
            <router-link to="/news">{{$t('member[5]')}}</router-link>
            <b v-if="newsNum > 0" class="hd"></b>
          </li>
          <li :class="{ active: cur == 4 }">
            <i class="icon icon4"></i>
            <router-link to="/dsRecord">{{$t('member[6]')}}</router-link>
          </li>

          <li :class="{ active: cur == 5 }">
            <i class="icon icon5"></i>
            <router-link to="/setting">{{$t('member[7]')}}</router-link>
          </li>
          <li :class="{ active: cur == 6 }">
            <i class="icon icon6"></i>
            <router-link to="/feedBack">{{$t('member[8]')}}</router-link>
          </li>
          <li>
            <i class="icon icon7"></i>
            <a :href="url" target="_bank" style="line-height: 20px;padding-top: 14px;width: 66%;}">{{$t('member[9]')}}</a>
          </li>
          <li :class="{ active: cur == 9 }">
            <i class="icon icon9"></i>
            <router-link to="/extendReport/0">{{$t('member[10]')}}</router-link>
          </li>
          <li :class="{ active: cur == 10 }">
            <i class="icon icon10"></i>
            <router-link to="/gameReport">{{$t('member[11]')}}</router-link>
          </li>
          <!-- <li :class="{ active: cur == 11 }" v-if='lanCode!=2'>
            <i class="icon icon11"></i>
            <router-link to="/videoCollect">{{$t('member[12]')}}</router-link>
          </li> -->
        </ul>
      </div>

      <div class="fr tabCont">
        <router-view class="content"></router-view>
      </div>
    </div>
     <Recharge v-if="isCz" :show="isCz" v-on:childFn="resetFlag"/>
      <Tx v-if="isTx" :showTx="isTx" v-on:childTxFn="resetFlagTx"/>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { alertComfirm, alertServe } from "../../assets/js/public";
export default {
  name: "member",
  data() {
    return {
      user: "",
      cur: 0,
      
      gzNum: 0,
      allFoucsNum: 0,
      value3: "Chưa chọn",
      amount: "0",
      zsMount: "0",
      iscz: "0",
      isRecharge: false,
      isEX: false, //兑换
      nNum: 0,
      url: localStorage.getItem("customer"),
      isCz:false,
    isTx:false,
    singleVenderMoney:[],
    allVenderMoney:{}
    };
  },
  computed: {
    ...mapState([
      "username",
      "codeToken",
      "userinfo",
      "safePwd",
      "balance",
      "diamond",
      "avatar",
      "vip",
      "focus",
      "newsNum",
      "fellows",
      "isPure",
      "skin",
      "lanCode"
    ]),
  },

  created() {
    this.init();
  },
  watch: {
    $route: function (n) {
      this.changeFocus(n.name);
    },
  },
  methods: {
    resetFlagTx(flag){
      this.isTx = flag;
    },
    resetFlag(flag) {
      this.isCz = flag;
    },
    goRegister() {
      this.$store.commit("SETLOGIN", true);
      this.$store.commit("SETISLOGIN", false);
    },
    changeFocus(n) {
      switch (n) {
        case "myFocus":
          this.cur = 2;
          break;
        case "userInfor":
          this.cur = 1;
          break;
        case "widthDraw":
          this.cur = 14;
          break;
        case "dsRecord":
          this.cur = 4;
          break;
        case "setting":
        case "loginPwd":
        case "payPwd":
        case "setPay":
          this.cur = 5;
          break;
        case "feedBack":
          this.cur = 6;
          break;
        case "news":
          this.cur = 7;
          break;
        case "extendReport":
          this.cur = 9;
          break;
        case "gameReport":
          this.cur = 10;
          break;
        case "videoCollect":
          this.cur = 11;
          break;
        case "moneyCenter":
          this.cur = 12;
          break;
        default:
          break;
      }
    },
    ...mapMutations([
      "SETUSERTOKEN",
      "SETUSERINFO",
      "SETPIC",
      "SETSAFEPWD",
      "SETFOCUS",
      "SETFELLOWS",
      "SETNEWSNUM",
      "SETDIAMOND",
      "SETBALANCE",
      "SETVENDELBL",
      "SETALLVENDELBL"
    ]),
    goRecharge(n) {
      //是否已经登录
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
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
      if(n==1){
        this.isCz = true;
      }else{
        this.isTx = true;
      }
      
    },
    init() {
      this.getUserInfo();
      this.changeFocus(this.$route.name);
      if (this.$store.state.userinfo.user_id > 0) {
        this.checkNotice();
      }
      
    },

    async checkNotice() {
      if (!this.codeToken) {
        return;
      } else {
       
        if (this.noticeNum - 0 > 0) return;

        let res = await this.$http.get("/api/live/sport/get_message_count/", {
          params: {
            client_type: 4,
            api: this.noticeTypes,
          },
        });
        if (res && res.data.code == 1) {
         
          let num = res.data.data.msgCount
           console.log(num)
          this.SETNEWSNUM(num);
        }
      }
    },

    hsMoney(){
      if (!this.codeToken) {
        return  alertComfirm({ msg: this.$t('loginTip')}, () => {
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
         this.$message({
              message: 'Đang nhận...',
              type: "warning",
            });
        this.$http.post("/api/vendor/transferinall",{},{timeout:60000}).then(res=>{
            this.getvenderBalance();
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
        }).catch((res)=>{
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
        })
    },
    async getvenderBalance(){
      let res = await this.$http.get('/api/vendor/balance',{},{ timeout: 60000 })
      this.allVenderMoney = res.data.data;
      this.SETBALANCE(res.data.data.balance);
      this.SETVENDELBL(res.data.data.vendor_bl);
      this.$forceUpdate();
      this.singleVenderMoney = [];
      for(let k in this.allVenderMoney){
        if(k=="balance"||k=='vendor_bl'){
          
        }else{
          this.singleVenderMoney.push({name:k.toString().toUpperCase(),value:this.allVenderMoney[k],nameTransfer:k})
        }
        
      }
      this.SETALLVENDELBL(this.singleVenderMoney);
      
    },
    // 获取关注人数
    //获取用户个人信息
    getUserInfo(flag) {
     
      this.$http.get("/api/user/index").then((res) => {
        if (res && res.data.code == 1) {
          this.user = res.data.data;
          this.SETUSERINFO(res.data.data);
          this.SETFELLOWS(res.data.data.following);
          this.SETPIC(res.data.data.avatar);
          // this.gzNum = this.fellows;
        }
      });
    },
    loadMoney() {
      if (!this.codeToken) return;
      
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0";
          this.SETBALANCE(this.amount);
        }
      });
    },
    zsQuest() {
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
              this.SETDIAMOND(0);
            } else {
              this.zsMount = res.data.data.diamond;
              this.SETDIAMOND(res.data.data.diamond);
            }
          }
        });
    },
    purse() {
      this.$router.push("/myPurse");
    },
  },
};
</script>

<style scoped lang="less">
#member {
  clear: both;
  margin-top: 10px;
}
.top {
  width: 1200px;
  height: 120px;
  background: #fff;
  margin: 10px auto;
  .imgTou {
    overflow: hidden;
        padding: 30px 0 30px 20px;
    dl {
      dt {
        padding-right: 10px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }
      dd {
        padding-top: 4px;
        .nickname {
          margin-top: 6px;
          span:nth-child(1) {
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
          .head2 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            // width:54px;
            height: 20px;
            line-height: 20px;
            margin-left: 14px;
            display: inline-block;
            border-radius: 10px;
            i {
              padding-left: 6px;
              display: inline-block;
              vertical-align: middle;
              width: 17px;
              height: 17px;
              position: relative;
              top: -3px;
            }
            .nan {
              background: url(../../assets/imgaes/member/nan.png) no-repeat
                center;
              background-size: 100% 100%;
            }
            .nv {
              background: url(../../assets/imgaes/member/female_icon.png) no-repeat
                center;
              background-size: 100% 100%;
            }
            span {
              display: inline-block;
              text-align: center;
              width: 26px;
            }
          }
          .head3 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 54px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            display: inline-block;

            i {
              padding-left: 8px;
              margin-top: -6px;
              display: inline-block;
              vertical-align: middle;
              width: 60px;
              height: 17px;
              
            }
            .vip1 {
              background: url(../../assets/imgaes/chat/VIP-lv1.2.png) no-repeat
                center;
                background-size: 100% 100%;
                
              
            }
            .vip2 {
              background: url(../../assets/imgaes/chat/VIP-lv2.2.png) no-repeat
             
            }
            .vip3 {
              background: url(../../assets/imgaes/chat/VIP-lv3.2.png) no-repeat
             
            }
            .vip4 {
              background: url(../../assets/imgaes/chat/VIP-lv4.2.png) no-repeat
              
            }
            .vip5 {
              background: url(../../assets/imgaes/chat/VIP-lv5.2.png) no-repeat
              
            }
            .vip6 {
              background: url(../../assets/imgaes/chat/VIP-lv6.2.png) no-repeat
            
            }
            .vip7 {
              background: url(../../assets/imgaes/chat/VIP-lv7.2.png) no-repeat;
              background-size: 100% 100%;
            }
          }
          .head4 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 54px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            display: inline-block;
            background: linear-gradient(
              90deg,
              rgba(115, 8, 195, 1) 0%,
              rgba(199, 61, 233, 1) 100%
            );
            border-radius: 10px;
            i {
              padding-left: 6px;
              margin-top: -5px;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 20px;
                height: 15px;
              }
            }
            span {
              display: inline-block;
              text-align: center;
              width: 22px;
            }
          }
        }
       
        .pfile {
          font-size: 14px;
          color: #999999;
          padding-top: 10px;
          width: 250px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .fllow{ 
          font-size: 14px;
          color: #333333;
          font-weight: bold;
          padding-top: 10px;
          b{
            padding-right: 10px;
          }
        }
      }
    }
  }
   .moneyAgz {
    max-width: 860px;
    float: right;
    line-height: 60px;
    overflow: hidden;
    div {
      float: left;
      color: #999999;
      font-size: 14px;
      margin-right: 15px;
      &.qbzh{
            width: 150px;
    /* height: 30px; */

        cursor: pointer;
        img{
          width: 100%;
        }
      }
      span {
            display: inline-block;
    font-size: 22px;
    color: #333333;
    padding-right: 0px;
    padding-left: 5px;
    font-weight: 800;
    position: relative;
    top: 3px;
      }
      a {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border-radius: 99px;
        margin-left: 10px;
        cursor: pointer;
            position: relative;
    top: -4px;
     background: linear-gradient(
                  90deg,
                  #1486ff 14.39%,
                  #4ba1ff 96.58%
                );
                border-radius: 6px;
      }
    }
  }
}
.tabMenu {
  width: 240px;
  .user-mess-box{
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
    overflow: hidden;
    padding: 20px 0;
     color: #555;
    .user-name{
      padding-left: 28px;
      color: #555;
      font-size: 18px;
      border-bottom:1px solid #F4F5F8;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .vip-icon{
        width: 36px;
        height: 17px;
        display: inline-block;
        vertical-align: top;
        &.VIP1{
          background: url(../../assets/imgaes/member/VIP1.png) no-repeat;
          background-size: contain;
        }
        &.VIP2{
          background: url(../../assets/imgaes/member/VIP2.png) no-repeat;
          background-size: contain;
        }
        &.VIP3{
          background: url(../../assets/imgaes/member/VIP3.png) no-repeat;
          background-size: contain;
        }&.VIP4{
          background: url(../../assets/imgaes/member/VIP4.png) no-repeat;
          background-size: contain;
        }&.VIP5{
          background: url(../../assets/imgaes/member/VIP5.png) no-repeat;
          background-size: contain;
        }&.VIP6{
          background: url(../../assets/imgaes/member/VIP6.png) no-repeat;
          background-size: contain;
        }&.VIP7{
          background: url(../../assets/imgaes/member/VIP7.png) no-repeat;
          background-size: contain;
        }
        &.VIP8{
          background: url(../../assets/imgaes/member/VIP8.png) no-repeat;
          background-size: contain;
        }
      }
    }
    .user-money{
      padding-left: 28px;
      font-size: 14px;
     
      span{
        &.hs-btn{
          color: #fff;
          background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
          margin-left: 10px;
          border-radius: 20px;
          padding: 5px 10px;
          cursor: pointer;
        }
      }
      p{
         padding-top: 5px;
         padding-bottom:10px;
        font-weight: bold;
      }
    }
  }
  .czdh {
    p {
      margin-bottom: 10px;
      padding-left: 100px;
      span {
        color: red;
        display: inline-block;
        width: 60px;
      }
      a {
        display: inline-block;
        padding: 2px 10px;
        background: red;
        color: #fff;
        border-radius: 99px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .tab {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    i {
      display: inline-block;
      width: 23px;
      height: 23px;
      float: left;
      position: relative;
      margin-top: 22px;
      margin-right: 6px;
      background-size: 20px 20px;
      background: url('../../assets/imgaes/usercenter.png') no-repeat center;
    }
    li {
      display: block;
      width: 100%;
      background: #fff;
      padding-left: 28px;
      height: 68px;
      line-height: 68px;
      font-size: 14px;
      position: relative;
      cursor: pointer;

      .icon1 {
        
        background-size:360px 360px;
        background-position: 0px 0px;
      }
      .icon2 {
       
        background-size: 310px 310px;
        background-position: -1px -21px;
      }
      .icon3 {
        background-position: 0px -365px;
        background-size: 650px 670px;
      }
      .icon4 {
        
        background-size: 300px 300px;
        background-position: 0px -94px;
      }
      .icon5 {
       
        background-size: 300px 300px;
        background-position: 0px -119px;
      }
      .icon6 {
      
        background-size: 300px 300px;
        background-position: 0px -143px;
      }
      .icon7 {
      
        background-size: 330px 330px;
        background-position: 0px -184px;
      }
      .icon8{
       
        background-size: 300px 300px;
        background-position: 0px -70px;
      }
      .icon9 {
       
       background-size: 330px 330px;
       background-position: 0px -209px;
      }
      .icon10 {
       
        background-size: 330px 330px;
        background-position: -1px -234px;
      }
      .icon13 {
        
        background-size: 300px 300px;
        background-position: 0px -260px;
      }
       .icon14 {
        background-size: 300px 300px;
        background-position: 0px -46px;
      }
      .icon11{
        background-size: 300px 300px;
        background-position: 0px -236px;
        }
      a {
        display: inline-block;
        overflow: hidden;
        color: #333333;
        cursor: pointer;
      }
      .hd{
        display: inline-block;
        width: 7px;
        height: 7px;
        background: #FF1C30;
        position: absolute;
        left: 42px;
        top: 22px;
        border-radius: 50%;
      }
    }
    .active {
      display: block;
      width: 100%;
     
      line-height: 70px;
      font-size: 14px;
      i {
        display: inline-block;
        float: left;
        position: relative;
      
      }
      .icon1 {
       
        background-size:360px 360px;
        background-position: -33px 0px;
      }
      .icon2 {
       
        background-size: 310px 310px;
        background-position: -29px -21px;
      }
      .icon3 {
       
        background: url(../../assets/imgaes/member/cz_on.png) no-repeat center;
       
        background-size: 100% 100%;
      }
      .icon4 {
      
        background-size: 300px 300px;
        background-position: -27px -94px;
      }
      .icon5 {
      
        background-size: 300px 300px;
        background-position: -24px -119px;
        
      }
      .icon6 {
       
        background-size: 300px 300px;
        background-position: -27px -143px;
      }
      .icon8{
        
        background-size: 300px 300px;
        background-position:-27px -70px;
      }
      .icon9 {
        
         background-size: 330px 330px;
       background-position: -27px -209px;
      }
      .icon10 {
       
        background-size: 330px 330px;
        background-position: -31px -234px;
      }
      .icon14 {
       
          background-size: 300px 300px;
        background-position: -27px -46px;
      }
      .icon11{
       
          background-size: 300px 300px;
          background-position:-28px -236px;
        }
      a {
        display: inline-block;
        overflow: hidden;
        color: #1486FF;
      }
     
    }
    &.pink-tab{
     li{
       &.active{
         .icon1 {
       
         background-size:360px 360px;
        background-position: -130px 0px;
      }
      .icon2 {
      
        background-size: 310px 310px;
        background-position: -113px -21px;
      }
      .icon3 {
       
        background: url(../../assets/imgaes/member/cz_on.png) no-repeat center;
       
        background-size: 100% 100%;
      }
      .icon4 {
      
         background-size: 300px 300px;
        background-position: -108px -94px;
      }
      .icon5 {
        background-size: 300px 300px;
        background-position: -106px -119px;
        
      }
      .icon6 {
         background-size: 300px 300px;
        background-position: -108px -143px;
      }
      .icon8{
       
        background-size: 300px 300px;
        background-position:-108px -70px;
       
      }
      .icon9 {
        
      
         background-size: 330px 330px;
       background-position: -119px -209px;
      }
      .icon10 {
       
        background-size: 320px 320px;
        background-position: -117px -226px;
      }
      .icon14 {
       
       background-size: 280px 280px;
       background-position: -101px -42px;
      }
      .icon11{
         background-size: 300px 300px;
          background-position:-109px -236px;
        }
      a {
        color: #FB7772;
      }
       }
     }
   }
   &.blue-tab{
     li{
       &.active{
         .icon1 {
       
          background-size:360px 360px;
        background-position: -65px 0px;
      }
      .icon2 {
       
       
         background-size: 310px 310px;
        background-position: -56px -21px;
      }
      .icon3 {
       
        background: url(../../assets/imgaes/member/cz_on.png) no-repeat center;
       
        background-size: 100% 100%;
      }
      .icon4 {
      
         background-size: 300px 300px;
        background-position: -54px -94px;
      }
      .icon5 {
       
            background-size: 300px 300px;
        background-position: -54px -119px;
        
      }
      .icon6 {
       
        background-size: 300px 300px;
        background-position: -54px -143px;
      }
      .icon8{
       
        background-size: 300px 300px;
        background-position:-54px -70px;
      }
      .icon9 {
        
        
          background-size: 330px 330px;
       background-position: -58px -209px;
      }
      .icon10 {
       
        background-size: 320px 320px;
        background-position: -58px -226px;
      }
      .icon14 {
       
         background-size: 280px 280px;
       background-position: -50px -42px;
      }
      .icon11{
       
          background-size: 300px 300px;
          background-position:-54px -236px;
        }
      a {
        color: #00B4D8;
      }
       }
     }
   }
   &.green-tab{
     li{
       &.active{
         .icon1 {
      
          background-size:360px 360px;
        background-position: -98px 0px;
      }
      .icon2 {
       
        
         background-size: 310px 310px;
        background-position: -84px -21px;
      }
      .icon3 {
       
        background: url(../../assets/imgaes/member/cz_on.png) no-repeat center;
       
        background-size: 100% 100%;
      }
      .icon4 {
      
       
        background-size: 300px 300px;
        background-position: -82px -94px;
      }
      .icon5 {
      
            background-size: 300px 300px;
        background-position: -79px -118px;
        
      }
      .icon6 {
       
        background-size: 300px 300px;
        background-position: -82px -143px;
      }
      .icon8{
       
        background-size: 300px 300px;
        background-position:-81px -70px;
       
      }
      .icon9 {
        
       
         background-size: 330px 330px;
       background-position: -89px -209px;
      }
      .icon10 {
       
              background-size: 320px 320px;
        background-position: -87px -226px;
      }
      .icon14 {
        
              background-size: 280px 280px;
       background-position: -76px -42px;
      }
      .icon11{
         background-size: 300px 300px;
          background-position:-82px -236px;
        }
      a {
        color: #09B584;
      }
       }
     }
   }
  }
   
}
.tabCont {
  width: 950px;
  min-height: 760px;
  > div {
    width: 100%;
    min-height: 760px;
    padding: 0 20px 20px;
    background: #fff;
  }
}

.userHead {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  -webkit-animation: ani 2s linear infinite;
}

.el-icon-refresh{
  cursor: pointer;
  top: -2px;
  // left: 135px;
  &:hover{
    color: #ff1c30;
  }
}
</style>
