<template>
  <div class="invite">
    
    <div class="invite-msg" v-if="isInvite">
      <div class="invite-code invite-item clearfix">
        <span class="fl">{{$t('extendReport.invite.text[0]')}}</span>
        <p class="fl">{{ currCodeMsg.market_code }}</p>
        <div
          class="fl copy-btn copy-code"
          @click="copyLink('copy-code')"
          data-clipboard-action="copy"
          :data-clipboard-text="currCodeMsg.market_code"
        >
          {{$t('copyText')}}
        </div>
      </div>
      <div class="invite-url invite-item clearfix">
        <span class="fl">{{$t('extendReport.invite.text[1]')}}</span>
        <p class="fl">{{ currCodeMsg.market_url }}</p>
        <div
          class="fl copy-btn copy-link"
          @click="copyLink('copy-link')"
          data-clipboard-action="copy"
          :data-clipboard-text="currCodeMsg.market_url"
        >
         {{$t('copyText')}}
        </div>
      </div>
    </div>
    <div class="invite-img" id="inviteCode">
      <h3>{{$t('extendReport.invite.text[2]')}}</h3>
      <p class="invite-mess">
        {{$t('extendReport.invite.content')}}
      </p>
      <ul class="grade-box">
        <li
          class="grade-item clearfix"
          v-for="(v, index) in marketList"
          :key="index"
          :class="'grade-item' + (index + 1)"
        >
          <span class="fl">{{ v.invitee_num }}</span>
          <p class="fl">
           {{$t('extendReport.invite.text[3]')}} {{v.reward}} {{$t('moneyDw')}}
          </p>
        </li>
      </ul>
      <p style="font-size:16px;padding-left:50px;width:750px;text-align:left">{{$t('extendReport.invite.text[4]')}}</p>
      <div class="invite-code">
        <vue-qr
          :logoSrc="qrcode.logo"
          :text="qrcode.value"
          :size="150"
          :margin="0"
        ></vue-qr>
      </div>
    </div>
    <div class="invite-btn" v-if="isInvite && isLoading" @click="toImage">
     {{$t('extendReport.invite.text[5]')}}
    </div>
    <div class="invite-btn" v-if="!isInvite && isLoading" @click="applayMen" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">
      {{$t('extendReport.invite.text[6]')}}
    </div>
 
    <div class="qq-box" v-if="tgBox">
      <div class="qq-box-content">
        <i class="remove-btn" @click="tgBox = false"></i>
        <h3>{{$t('extendReport.invite.tcText[0]')}}</h3>
        <div class="input-box clearfix">
          <span class="fl">{{$t('extendReport.invite.tcText[1]')}}</span>
          <input
            type="text"
            ref="qqInput"
            class="fl"
            v-model="qqContent"
            @focus="isplace = false"
            @focusout="isplace = true"
            maxlength="10"
          />
        </div>
        <el-button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="confirm-btn" @click="applyCode" :loading="btnLoading"
          >{{$t('extendReport.invite.tcText[2]')}}</el-button
        >
      </div>
    </div>
    <!--        申请中-->
    <div class="qq-box" v-if="tgIng">
      <div class="qq-box-content apply-ing">
        <i class="remove-btn" @click="tgIng = false"></i>
        <h3>{{$t('extendReport.invite.tcText[0]')}}</h3>
        <p>
         {{$t('extendReport.invite.tcText[3]')}}
        </p>
        <div class="confirm-btn confirm-btn-aplay" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  @click="tgIng = false">
          {{$t('extendReport.invite.tcText[2]')}}
        </div>
      </div>
    </div>
    <!--        申请失败-->
    <div class="qq-box" v-if="tgFaile">
      <!--        <div class="qq-box">-->
      <div class="qq-box-content applay-fiale">
        <i class="remove-btn" @click="tgFaile = false"></i>
        <h3>{{$t('extendReport.invite.tcText[4]')}} </h3>
        <p>{{$t('extendReport.invite.tcText[5]')}}<br /> {{$t('extendReport.invite.tcText[6]')}}</p>
        <div class="cancel-btn confirm-btn-aplay" @click="tgFaile = false">
          {{$t('qxText')}}
        </div>
        <div class="confirm-btn confirm-btn-aplay" @click="goOnline">
         {{$t('extendReport.invite.tcText[7]')}}
        </div>
      </div>
    </div>

    <!--        显示推广图-->
    <div class="extend-img" v-if="showExtendImg">
      <img :src="lSrc" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import VueQr from "vue-qr";
export default {
  name: "invite",
  data() {
    return {
      qqContent: "",
      btnLoading: false,
      tgBox: false,
      tgIng: false,
      tgFaile: false,
      currPersent: "",
      currCodeMsg: {},
      isInvite: false,
      isLoading: false,
      currHref: location.origin,
      marketList: [],
      isplace: true,
      qrcode: {
        value: "www.lgzb18.com",
        logo: require("../../../assets/imgaes/extend/codeLogo.png"),
      },
      lSrc: "",
      showExtendImg: false,
    };
  },
  components: {
    VueQr,
  },
  watch: {
    qqContent: function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          this.qqContent = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
    },
    tgBox: function () {
      this.$refs.qqInput.focus();
    },
  },
     computed: {
    ...mapState(["skin"]),
  },
  created() {
    this.getInviteCode();
    this.getList();
  },
  methods: {
    goOnline() {
      window.open(localStorage.getItem("customer"));
    },
    applayMen() {
      if (this.currCodeMsg.status == 9) {
        this.tgIng = true;
      } else {
        this.tgBox = true;
      }
    },
    copyLink(className) {
      let _this = this;
      let clipboard = new this.clipboard("." + className);
      clipboard.on("success", function () {
        
        _this.$message({
          type: "success",
          message: this.$t('extendReport.invite.warnText[0]'),
          offset: 0,
        });
      });
      clipboard.on("error", function () {
        _this.$message({
          type: "error",
          message: this.$t('extendReport.invite.warnText[1]'),
          offset: 0,
        });
      });
    },
    //获取邀请码
    getInviteCode(flag) {
      this.isLoading = false;
      if (flag) this.isL = true;
      // this.$http.get('/api2/market/index').then(res=>{
      this.$http.get("/api/market/index").then((res) => {
        this.isL = false;
        this.isLoading = true;
        if (res && res.data.code == 1) {
          this.qrcode.value = res.data.data.market_url;
          this.currCodeMsg = res.data.data;
          this.isInvite = this.currCodeMsg.status == 10 ? true : false;
          this.currPersent =
            (this.currCodeMsg.invitee_num /
              (this.currCodeMsg.invitee_num -
                0 +
                (this.currCodeMsg.next_level_diff - 0))) *
            100;
        }
      });
    },
    //申请邀请码
    applyCode() {
      if (this.qqContent == "")
        return this.$message({
          type: "error",
          message: "Vui lòng nhập số điện thoại chính xác",
          offset: 0,
        });
      this.btnLoading = true;
      let d = this.globalPpproach.checkIsEncrypt({
        mobile: this.qqContent,
      });
      this.$http.post("/api/market/apply", d).then((res) => {
        this.btnLoading = false;
        if (res && res.data.code == 1) {
          this.$message({
            type: "success",
            message: this.$t('extendReport.invite.warnText[3]'),
            offset: 0,
          });
        } else if (res.data.code == 15) {
          
          this.tgIng = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            offset: 0,
          });
          
        }
        this.tgBox = false;
      });
    },
    //推广级别列表
    async getList() {
      let res = await this.$http.get("/api/market/levellist");
      if (res && res.data.code == 1) {
        this.marketList = res.data.data;
      }
    },
    // 页面元素转图片
    toImage() {
      let shareContent = document.getElementById("inviteCode");
      //配置参数
      let opts = {
        useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      };
      
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      html2canvas(shareContent, opts).then((canvas) => {
        var dataUrl = canvas.toDataURL("image/jpeg", 100, 300);
        this.lSrc = dataUrl;
        // this.showExtendImg = true;
        this.savePicture(dataUrl);
      });
    },
    savePicture(Url) {
      let blob = new Blob([""], { type: "application/octet-stream" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      let e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped lang="less">
.invite {
  /*overflow-y: auto;*/
  /*height: 1300px;*/
  padding: 0 !important;
  background: #fff;
  text-align: center;
  .invite-msg {
    padding-left: 95px;
    padding-top: 50px;
    .invite-item {
      margin-bottom: 20px;
      span {
        font-size: 16px;
        color: #333;
        width: 190px;
        line-height: 30px;
        text-align: left;
      }
      p {
        margin: 0 20px 0 0;
        height: 30px;
        line-height: 30px;
        min-width: 294px;
        background: rgba(245, 245, 245, 1);
        border-radius: 6px;
        padding: 0 10px;
        font-size: 14px;
        text-align: left;
      }
      .copy-btn {
        width: 68px;
        height: 30px;
        background: linear-gradient(
          90deg,
          rgba(255, 49, 49, 1),
          rgba(255, 128, 103, 1)
        );
        border-radius: 6px;
        color: #fff;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .invite-img {
    background: url("../../../assets/imgaes/extend/bg.png") no-repeat top center;
    padding-bottom: 200px;
    background-size: contain;
    width: 805px;
    margin-left: 72px;
    height: 1000px;
    > h3 {
      font-size: 24px;
      padding: 0 310px;
      color: #333;
      padding-top: 65px;
    }
    .invite-mess {
      padding: 230px 50px 0px 50px;
      font-size: 15px;
      text-align: left;
      line-height: 30px;
    }
    .grade-box {
      > li {
        font-size: 14px;
        margin-top: 20px;
        padding: 0 45px;
        i {
          width: 60px;
          height: 20px;
          margin-right: 10px;
        }
        span {
          font-weight: bold;
          width: 80px;
          text-align: left;
        }
        p {
          color: #666;
          text-align: left;
        }
        &.grade-item1 {
          line-height: 20px;
        }
        &.grade-item2 {
          line-height: 20px;
        }
        &.grade-item3 {
          line-height: 25px;
        }
        &.grade-item4 {
          line-height: 25px;
        }
        &.grade-item5 {
          line-height: 30px;
        }
        &.grade-item6 {
          margin-top: 10px;
          line-height: 40px;
        }
      }
    }
    .invite-code {
      width: 137px;
      height: 137px;
      background: #fff;
      padding: 10px 0 0 0;
      margin: 10px auto;
      img {
        width: 85%;
      }
    }
  }
  .invite-btn {
    font-size: 18px;
    background: linear-gradient(90deg, #1486ff 14.39%, #4ba1ff 96.58%);
    color: #fff;
    text-align: center;
    line-height: 58px;
    height: 58px;
    border-radius: 30px;
    padding: 0 30px;
    display: inline-block;
    cursor: pointer;
    margin: 0px 0 20px 0;
  }
}
.qq-box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  .apply-ing,
  .applay-fiale {
    p {
      font-size: 18px;
      line-height: 30px;
      color: #333;
    }
  }

  .qq-box-content {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    height: 281px;
    padding: 30px 0 40px 0;
    border-radius: 10px;
    text-align: center;
    .remove-btn {
      width: 14px;
      height: 15px;
      background: url("../../../assets/imgaes/gb_button_6_6.png") no-repeat;
      position: absolute;
      right: 25px;
      top: 25px;
      cursor: pointer;
    }
    h3 {
      font-size: 24px;
      color: #222221;
      font-weight: bold;
      margin-bottom: 28px;
    }
    .input-box {
      position: relative;
      display: inline-block;
      span {
        font-size: 18px;
        color: #333333;
        line-height: 43px;
      }
      input {
        padding: 0 20px;
        height: 43px;
        line-height: 43px;
        color: #333;
        margin-left: 10px;
        background: #eee;
        border-radius: 8px;
        width: 281px;
        font-size: 18px;
      }
      p {
        position: absolute;
        color: #333;
        left: 75px;
        top: 15px;
        font-size: 18px;
      }
    }
    .confirm-btn {
      width: 281px;
      height: 59px;
      color: #fff;
      border-radius: 50px;
      margin: 25px auto 0;
      font-size: 18px;
      background: linear-gradient(90deg, #1486ff 14.39%, #4ba1ff 96.58%);
      cursor: pointer;
    }
    .confirm-btn-aplay {
      line-height: 59px !important;
    }
  }
  .applay-fiale {
    .cancel-btn {
      float: left;
      width: 181px;
      height: 59px;
      color: #333;
      border-radius: 50px;
      font-size: 18px;
      background: #eee;
      cursor: pointer;
      margin: 30px 30px 0 20px;
    }
    .confirm-btn {
      width: 181px;
      float: left;
      margin: 30px auto 0;
    }
  }
}
</style>