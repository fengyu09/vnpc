<template>
  <div class="userMsg">
    <div class="anchorBan">
      <img src="../../assets/imgaes/main/zhubobg.png" alt="" />
    </div>

    <div class="anchorHead">
      <div>
        <div class="fl"><img v-lazy="userMsg.avatar" alt="" /></div>
        <div class="fl">
          <p>
            <span>{{ userMsg.nickname }}</span>
            <span class="head2" v-if="userMsg.gender == 2"
              ><img src="../../assets/imgaes/member/nv.png" alt=""
            /></span>
            <span class="head2" v-if="userMsg.gender == 1"
              ><img src="../../assets/imgaes/member/nan.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 1" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_1.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 2" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_2.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 3" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_3.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 4" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_4.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 5" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_5.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 6" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_6.png" alt=""
            /></span>
            <span class="userV" v-if="userMsg.vip == 7" style="color: #ffe1ac"
              ><img src="../../assets/imgaes/member/vip_7.png" alt=""
            /></span>
          </p>
          <p>
            <span>{{ userMsg.profile }}</span>
          </p>
        </div>
        <div
          class="fr"
          v-show="isShow"
          @click="getAttention(userMsg.user_id)"
          :style="{ background: isFollow == true ? '#F2F2F2' : '#FF1C30' }"
        >
          <p class="guan1" v-if="isFollow" style="cursor: pointer; color: #999">
            ?????????
          </p>
          <p class="guan" v-if="!isFollow" style="cursor: pointer">
            <img src="../../assets/imgaes/main/jia.png" alt="" />
          </p>
        </div>
        <div class="fr">
          <p>{{ userMsg.zan }}</p>
          <p>??????</p>
        </div>
        <div class="fr">
          <p>{{ userMsg.fans }}</p>
          <p>??????</p>
        </div>
        <div class="fr">
          <p>{{ userMsg.follow }}</p>
          <p>??????</p>
        </div>
      </div>
    </div>

    <div class="anchor">
      <div class="anchorMsg fl">
        <div class="one">
          <p><span></span><span>????????????</span></p>
          <p>
            <span><i>???</i><i>???ID:</i></span> <i>{{ userMsg.unique_id }}</i>
          </p>
          <p>
            <span><i>???</i><i>???:</i></span
            ><i v-if="userMsg.gender == 0">??????</i
            ><i v-if="userMsg.gender == 1">Nam</i
            ><i v-if="userMsg.gender == 2">N???</i>
          </p>
          <p>
            <i>????????????:</i
            ><span>{{ timeStampTurnTime(userMsg.created) }}</span>
          </p>
        </div>
      </div>

      <div class="dynamicAll fr" v-show="$store.state.isPure != 1">
        <div class="dynami1 fl"><span></span><span>????????????</span></div>
        <div class="dynami1 fr">
          ???<i>{{ userMsg.all_gift }}</i
          >???
        </div>
        <div
          class="gift"
          v-if="
            userMsg.gift !== undefined && userMsg.gift.length > 0 ? true : false
          "
        >
          <span v-for="(item, index) in userMsg.gift" :key="index">
            <img v-lazy="item.icon" alt=""
          /></span>
        </div>
        <div
          class="gift"
          v-if="
            userMsg.gift !== undefined && userMsg.gift.length > 0 ? false : true
          "
        >
          <!-- <p><img src="../../assets/imgaes/member/zanwudashang-min.png" alt=""></p> -->
          <p>??????????????????~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { alertComfirm } from "../../assets/js/public";
export default {
  name: "userMsg",
  data() {
    return {
      userMsg: [], //??????????????????
      isFollow: "", //???????????????????????????
      isShow: true,
    };
  },
  computed: {
    ...mapState(["codeToken"]),
  },
  created() {
    this.getUsermsg(); //??????????????????
  },
  methods: {
    getUsermsg() {
      if (this.$route.params.id == this.$store.state.userinfo.user_id) {
        this.isShow = false;
      }
      console.log({
        follow_user_id: this.$route.params.id,
        //user_id: this.$store.state.userinfo.user_id
      });
      this.$http
        .get("/api/live/user/user_owner/", {
          params: {
            follow_user_id: this.$route.params.id,
            //user_id: this.$store.state.userinfo.user_id
          },
        })
        .then((res) => {
          console.log(res);
          if (res && res.data.code == 1) {
            this.userMsg = res.data.data;
            this.isFollow = res.data.data.is_follow;
          }
        });
    },

    timeStampTurnTime(timeStamp) {
      if (timeStamp > 0) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d;
      } else {
        return "";
      }
    },

    //????????????
    getAttention(id) {
      if (this.codeToken) {
        //????????????????????????  ???????????????  ??????????????????
        // this.$http.post(this.versionLive2+"live/follow/",{
        //       follow_id: id,
        //       user_id: this.$store.state.userinfo.user_id
        //   }).then(res => {
        let d = this.globalPpproach.checkIsEncrypt({
          type: id,
          user_id: this.$store.state.userinfo.user_id,
        });
        this.$http.post("/api/live/user/User_follow_list/", d).then((res) => {
          if (res && res.data.code == 1) {
            console.log(res);
            this.isFollow = res.data.data.isFollow;
            if (this.isFollow == true) {
              //????????????
              this.userMsg.fans += 1;
            } else {
              this.userMsg.fans -= 1;
            }
          }
        });
      } else {
        this.toLogin();
      }
    },

    // ?????????????????????????????????
    toLogin() {
      alertComfirm({ msg: "????ng nh???p ????? xem phi??n b???n ?????y ?????" }, () => {
        this.$store.commit("SETLOGIN", true);
      });
    },
  },
};
</script>
<style lang="less" scoped>
.userMsg {
  .anchorBan {
    width: 100%;
    height: 170px;
    position: relative;
    top: -10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .anchorHead {
    width: 100%;
    height: 120px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    div {
      width: 1200px;
      height: 120px;
      div:nth-child(1) {
        //???????????????
        width: 121.6px;
        height: 121.6px;
        border: 10px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        background: #fff;
        position: relative;
        top: -20px;
        img {
          height: 100%;
          margin: 0 auto;
        }
      }
      div:nth-child(2) {
        width: 500px;
        margin-left: 5px;
        p:nth-child(1) {
          margin-top: 37px;
          span:nth-child(1) {
            font-size: 18px;
            //  color:#333;
            font-weight: bold;
          }
          .head2 {
            width: 20px;
            height: 20px;
            margin-left: 14px;
            display: inline-block;
            position: relative;
            top: -3px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .userV {
            display: inline-block;
            width: 50px;
            height: 20px;
            margin-left: 10px;
            position: relative;
            top: -2px;
            img {
              width: 50px;
              height: 20px;
            }
          }
        }
        p:nth-child(2) {
          margin-top: 8px;
          span {
            font-size: 14px;
            //  color:#999;
            width: 500px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      div:nth-child(4),
      div:nth-child(5),
      div:nth-child(6) {
        width: 70px;
        text-align: center;
        p:nth-child(1) {
          margin-top: 38px;
          font-size: 24px;
          // color:#333;
          font-weight: bold;
        }
        p:nth-child(2) {
          margin-top: 13px;
          font-size: 14px;
          // color:#999;
        }
      }
      div:nth-child(3) {
        //?????????????????????
        width: 100px;
        height: 40px;
        margin-top: 40px;
        border-radius: 20px;
        overflow: hidden;
        margin-left: 30px;
        .guan1 {
          font-size: 14px;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .guan {
          width: 100px;
          height: 40px;
          border-radius: 20px;
        }
      }
    }
  }

  //??????????????????
  .anchor {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .anchorMsg {
      width: 360px;
      margin-top: 10px;
      .one {
        width: 360px;
        height: 182px;
        background: #fff;
        border-radius: 4px;
        padding-left: 19px;
        font-size: 14px;
        p:nth-child(1) {
          height: 66px;
          display: flex;
          align-items: center;
          span:nth-child(1) {
            display: inline-block;
            width: 4px;
            height: 18px;
            background: #1486ff;
            border-radius: 2px;
          }
          span:nth-child(2) {
            margin-left: 10px;
            // color:#333;
            font-weight: bold;
            font-size: 18px;
          }
        }
        p:nth-child(2),
        p:nth-child(3) {
          margin-bottom: 20px;
          height: 16px;
          vertical-align: middle;
          span {
            width: 60px;
            display: flex;
            justify-content: space-between;
            float: left;
            // color:#999;
            margin-right: 13px;
          }
        }
        p:nth-child(4) {
          margin-bottom: 20px;
          height: 16px;
          span {
            // color:#333;
            display: inline-block;
            margin-right: 13px;
          }
          i {
            color: #71819d;
            width: 70px;
            display: inline-block;
          }
        }
      }
    }
  }

  // ????????????
  .dynamicAll {
    margin-top: 10px;
    width: 830px;
    background: #fff;
    border-radius: 4px;
    min-height: 182px;
    margin-bottom: 20px;
    .dynami1 {
      height: 66px;
      display: flex;
      align-items: center;
      margin: 0 20px;
      span:nth-child(1) {
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #1486ff;
        border-radius: 2px;
      }
      span:nth-child(2) {
        margin-left: 10px;
        font-size: 18px;
        // color:#333;
        font-weight: bold;
      }
      i {
        font-size: 14px;
        // color:#999;
      }
    }
    .gift {
      overflow: hidden;
      margin: 0 20px;
      margin-top: 66px;
      span {
        display: inline-block;
        float: left;
        margin-right: 27px;
        margin-bottom: 15px;
        img {
          width: 50px;
          height: 46px;
        }
      }
      p {
        text-align: center;
        margin-top: 30px;
      }
    }
  }
}

.noDynamic {
  margin-top: 133px;
  text-align: center;
  font-size: 14px;
  color: #999;
  p:nth-child(2) {
    margin-top: 30px;
  }
}
</style>