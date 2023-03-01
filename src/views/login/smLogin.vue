<template>
  <div id="login">
    <div class="zh-login">
      <img
      v-if="skin==0"
        src="../../assets/imgaes/login/login_icon.png"
        alt=""
        srcset=""
        @click="changeLoginType(1)"
        style="cursor: pointer"
      />
      <img
      v-if="skin==1"
        src="../../assets/imgaes/login/login_icon-pink.png"
        alt=""
        srcset=""
        @click="changeLoginType(1)"
        style="cursor: pointer"
      />
      <img
      v-if="skin==2"
        src="../../assets/imgaes/login/login_icon-blue.png"
        alt=""
        srcset=""
        @click="changeLoginType(1)"
        style="cursor: pointer"
      />
      <img
      v-if="skin==3"
        src="../../assets/imgaes/login/login_icon-green.png"
        alt=""
        srcset=""
        @click="changeLoginType(1)"
        style="cursor: pointer"
      />
      <span>{{$t('login.text[13]')}}</span>
    </div>
    <div class="form-box login-form" style="padding-bottom: 10px">
      <div class="from-content" style="text-align: center">
        <p>{{$t('login.text[7]')}}</p>
        <p>{{$t('login.text[8]')}}</p>

        <div style="margin: 20px 0; height: 186px">
          <div class="qrCodeUrl" ref="qrCodeUrl"></div>
        </div>
        <p style="color: #ff3131; cursor: pointer" @click="getCodeImg">
          {{$t('login.text[9]')}}
        </p>
        <div>
          <p style="margin: 12px 0">
            {{$t('login.text[10]')}}
          </p>
          <p>
            <img
              src="../../assets/imgaes/login/safari_icon.png"
              alt=""
              srcset=""
            />
            <span style="margin-right: 38px">{{$t('login.text[11]')}}</span
            ><img
              src="../../assets/imgaes/login/apk_icon.png"
              alt=""
              srcset=""
            />
            <span>{{$t('login.text[12]')}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="xieyi-box">
      <p>
        {{$t('login.text[5]')}}
        <router-link :to="'/userAgreement'"
          ><span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('login.text[6]')}}</span></router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import QRCode from "qrcodejs2";
export default {
  name: "smlogin",
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        code: "",
      },
      mode: 1,
      btnText: "Lấy mã xác nhận",
      isSend: false,
      btnLoading: false,
      userId: "",
      oldUrl: "/",
      lastRoute: "",
      smInterval: null,
      smIntervalNum: 0,
    };
  },
  mounted() {
    // console.log(window.location.host)
  },
  created() {
    //进入页面先清除缓存
    this.clearHC();
    this.getCodeImg();
  },
  // 获取上一个页面路由
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path == "/register") {
        return;
      }
      vm.oldUrl = from.path;
      vm.lastRoute = from.name;
      console.log(from);
    });
  },
  methods: {
    ...mapMutations([
      "SETUSERNAME",
      "SETUSERTOKEN",
      "SETPIC",
      "SETUSERINFO",
      "SETUSER_TYPE",
      "SETDIAMOND",
      "SETBALANCE",
      "SETUSERUSERID",
      "SETISDECIPHER",
      "SETPTGG",
      "SETLOGIN",
      "SETNOTICE",
    ]),
    changeLoginType(i) {
      this.$emit("changeType", i);
    },
    getCodeImg() {
      this.clearHC();
      this.smIntervalNum = 0;
      this.$http.get("/api/user/qrcode").then((res) => {
        this.$refs.qrCodeUrl.innerHTML = "";
        // this.loginQrid=res.data.data.url.substring(res.data.data.url.lastIndexOf("\=")+1,res.data.data.url.length)
        this.loginQrid = res.data.data.qrid;
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text:
            window.location.host + "/#/download" + "/?qrid=" + this.loginQrid, // 需要转换为二维码的内容
          width: 165,
          height: 165,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
        clearInterval(this.smInterval);
        this.smInterval = null;
        this.smInterval = setInterval(() => {
          this.getPolling();
          this.smIntervalNum++;
        }, 3000);
      });
    },
    getPolling() {
      this.$http.get("/api/user/polling?qrid=" + this.loginQrid).then((res) => {
        if (res && res.data.code == 1) {
          clearInterval(this.smInterval);
          this.$message({
            message: "Thành công ",
            type: "success",
          });
          let decryptData = this.decrypt(res.data.encryption);
          this.setInfo(res, decryptData);
        } else {
          if (this.smIntervalNum >= 30) {
            clearInterval(this.smInterval);
          }
        }
      });
    },
    phoneverify(e) {
      this.loginForm.phone = e.target.value.replace(/[^\d]/g, "");
    },
    codeverify(e) {
      this.loginForm.code = e.target.value.replace(/[^\d]/g, "");
    },
    setInfo(res, decryptData) {
      //console.log(decryptData)
      this.SETUSERNAME(res.data.data.nickname);
      this.SETUSERTOKEN(decryptData.token);
      this.SETPIC(res.data.data.avatar);
      this.SETUSERUSERID(res.data.data.user_id);
      
      this.SETUSERINFO(res.data.data);
      this.userId = res.data.data.user_id;
      this.SETUSER_TYPE(res.data.data.user_type);
      this.SETISDECIPHER(decryptData.aes_salt);
      //请求头 个人中心那边
      this.$http.defaults.headers["Authorization"] =
        "Bearer " + decryptData.token;
      //请求头 直播那边
      this.$http.defaults.headers["token"] = decryptData.token;
      this.SETLOGIN(false);
      this.SETNOTICE(true);
      setTimeout(() => {
       
        this.loadMoney();
       
      }, 100);
    },
    loadMoney() {
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.SETBALANCE(res.data.data.balance);
        }
      });
    },
    zsQuest() {
      this.$http
        .get(this.versionLive2 + "user/diamond_now/?user_id=" + this.userId)
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.SETDIAMOND(0);
            } else {
              this.SETDIAMOND(res.data.data.diamond);
            }
          }
        });
    },
    //清除缓存
    clearHC() {
      this.SETUSERNAME("");
      this.SETUSERTOKEN("");
      this.SETPIC("");
      this.SETUSERUSERID("");
      this.SETUSERINFO("");
      this.SETUSER_TYPE("");
      this.SETISDECIPHER("");
      // this.SETPTGG('')
    },
  },
    computed: {
    ...mapState([
      "skin"
    ]),
  },
};
</script>

<style  lang="less">
#login {
  position: relative;
  .zh-login{
    img{
      width:52px;
      height:52px;
    }
    span{
      
    }
  }
  .login-form {
    width: 420px;
    margin: 0 auto;
    padding: 0;
    padding-bottom: 32px;
    position: absolute;
    right: 60px;
    top: 58%;
    background-color: #ffffff;
    box-shadow: 0 0 6px #ccc;
    border-radius: 6px;
    transform: translate(0, -50%);
  }
  .logo-box {
    a {
      display: block;
    }
    padding-top: 30px;
  }
  .text-copy {
    position: absolute;
    bottom: -50px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    font-size: 14px;
    line-height: 24px;
    color: #333;
  }
}

.form-box {
  .form-head {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    height: 74px;
    line-height: 74px;
    background-image: linear-gradient(to right, #ff1d30, #ff938d);
  }
  h1 {
    text-align: center;
    color: #fff;
    margin: 0;
    font-size: 26px;
    font-weight: normal;
  }

  .from-content {
    position: relative;

    .qrCodeUrl {
      padding-left: 94px;
      img {
        padding: 10px;
        box-shadow: 0 0 6px 2px #cecece;
        border-radius: 4px;
      }
    }
    // margin-top: 24px;
    padding: 0 40px;
    .change-type {
      display: flex;
      border-bottom: 1px solid #dddcdc;
      margin-bottom: 26px;
      > div {
        padding: 20px 0;
        font-size: 16px;
        margin-right: 40px;
        cursor: pointer;
        color: #7787a5;
      }
      .active {
        border-bottom: 2px solid #1486ff;
        font-weight: bold;
        color: #1486ff;
      }
    }
    .el-input__inner {
      border: none;
      background: #f5f5f5;
      height: 42px;
    }
    .custom-btn {
      border: none;
      background: #1486ff;
      height: 40px;
      color: #fff;
      font-size: 16px;
    }
    // .custom-btn:hover {
    //   background: #ff4752;
    // }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #7787a5;
    }
    input:-moz-placeholder,
    textarea:-moz-placeholder {
      color: #7787a5;
    }
    input::-moz-placeholder,
    textarea::-moz-placeholder {
      color: #7787a5;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: #7787a5;
    }
  }

  .other {
    margin-top: 10px;
    color: #7787a5;
    > div {
      padding: 8px 8px;
      cursor: pointer;
    }
    div:hover span {
      // border-bottom:1px solid #111111;
      color: #111111;
    }
  }
  .el-form-item {
    background: #fff;
  }
}
.xieyi-box {
  // position: absolute;
  // right: 0px;
  // top: 394px;
  font-size: 14px;
  width: 100%;
  text-align: center;
  span {
    color: #1a88ff;
    cursor: pointer;
  }
}
</style>
