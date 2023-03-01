<template>
  <div id="login">
    <div class="form-box login-form">
      <div class="form-head" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">
        <h1 :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('register.text[0]')}}</h1>
      </div>
      <div class="from-content" style="margin-top: 20px">
        <!-- 解决密码自动填充 -->
        <input
          type="number"
          :placeholder="$t('register.pla[1]')"
          style="position: absolute; z-index: -9; display: none"
        />
        <input
          type="password"
          placeholder="Mời nhập mật khẩu "
          style="position: absolute; z-index: -9; display: none"
        />
        <!-- 解决密码自动填充 -->

        <el-form
          label-position="top"
          label-width="80px"
          :model="regForm"
        >
          <el-form-item>
            <img src="../../assets/imgaes/login/username_icon.png" alt="" />
           
            <el-input
              ref="phone"
              v-model="regForm.phone"
              type="text"
              :placeholder="$t('register.pla[0]')"
            ></el-input>
          </el-form-item>
         
          <el-form-item>
            <img src="../../assets/imgaes/login/pwd_icon.png" alt="" />
            <el-input
              ref="password"
              v-model="regForm.password"
              :type="iptType"
              maxlength="18"
              :placeholder="$t('register.pla[1]')"
            ></el-input>
            <img
              class="eye-btn"
              src="../../assets/imgaes/login/eye_icon.png"
              v-if="iptType == 'password'"
              alt=""
              @click="iptType = 'text'"
            />
            <img
              class="eye-btn"
              v-else
              src="../../assets/imgaes/login/eye_icon2.png"
              alt=""
              @click="iptType = 'password'"
            />
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/pwd_icon.png" alt="" />
            <el-input
              ref="password2"
              v-model="regForm.password2"
              :type="iptType2"
              maxlength="18"
              :placeholder="$t('register.pla[1]')"
            ></el-input>
            <img
              class="eye-btn"
              src="../../assets/imgaes/login/eye_icon.png"
              v-if="iptType2 == 'password'"
              alt=""
              @click="iptType2 = 'text'"
            />
            <img
              class="eye-btn"
              v-else
              src="../../assets/imgaes/login/eye_icon2.png"
              alt=""
              @click="iptType2 = 'password'"
            />
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/yqm_icon.png" alt="" />
            <el-input
              ref="extendCode"
              v-model="regForm.extendCode"
              type="text"
              :readonly="isCode"
              :placeholder="$t('register.pla[3]')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/yzm_icon.png" alt="" />
            <el-input
              ref="captchaCode"
              v-model="regForm.captcha"
              type="text"
              :placeholder="$t('register.pla[4]')"
            ></el-input>
            <i class="refresh-icon" @click="getPicYzm"></i>
            <img v-lazy="picYzm" class="yzm-box" alt="" />
          </el-form-item>
        </el-form>
        <el-button
          class="custom-btn"
          style="width: 100%"
          @click="register"
          :loading="btnLoading"
          :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"
          >{{$t('register.text[0]')}}</el-button
        >
        <div style="margin-top: 14px">
          <div style="float: right">
            {{$t('register.text[1]')}}，<span
              style="color: #1486ff; cursor: pointer"
              @click="changeLoginType(1)"
              :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]"
              >{{$t('register.text[2]')}}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="xieyi-box">
      <p>
       {{$t('login.text[5]')}}
        <a href="javascript:;" @click="goxy"
          ><span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('login.text[6]')}}</span></a
        >
      </p>
      <p v-if="defalutLan=='vi-vn'" style="cursor:pointer;font-weight:bold;color:red;display:inline-block" @click="goTeleG()">Hỗ trợ kỹ thuật LG</p>
			<p v-if="defalutLan=='en'" style="cursor:pointer;font-weight:bold;color:red;display:inline-block" @click="goTeleG()">LG Technical Support</p>
    </div>
   
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "register",
  data() {
    return {
      regForm: {
        phone: "",
        password: "",
        code: "",
        extendCode: "",
        password2: "",
        captcha: "",
      },
      mode: 0,
      isSend: false,
      btnLoading: false,
      isCode: true,
      iptType: "password",
      iptType2: "password",
      picYzm: "",
    };
  },
  created() {
    //进入页面先清除缓存
    this.clearHC();

    this.getPicYzm();
    if (this.$route.query.c) {
      this.regForm.extendCode = this.$route.query.c;
      localStorage.setItem("c", this.$route.query.c);
      this.isCode = true;
    } else if (
      localStorage.getItem("c") &&
      localStorage.getItem("c") != "undefined"
    ) {
      console.log(45);
      this.regForm.extendCode = localStorage.getItem("c");
      this.isCode = true;
    } else {
      this.isCode = false;
    }
  },
  methods: {
    ...mapMutations([
      "SETUSERNAME",
      "SETUSERTOKEN",
      "SETPIC",
      "SETUSERINFO",
      "SETISDECIPHER",
      "SETUSER_TYPE",
      "SETUSERUSERID",
      "SETLOGIN",
      "SETISLOGIN",
      "SETNOTICE",
    ]),
    goTeleG(){
				window.open('https://t.me/Lgjszc')
			},
    goxy() {
      this.$router.push("/userAgreement");
      this.SETLOGIN(false);
      this.SETISLOGIN(true);
    },
    changeLoginType(i) {
      this.$emit("changeType", i);
    },
    //获取图片验证码
    async getPicYzm() {
      let res = await this.$http.get("/api/user/captcha");
      console.log(res);
      this.picYzm = res.data.data.url;
    },
    register() {
      
      if (this.regForm.password.length < 6) {
        this.$message({
          message:this.$t('register.warnText[0]'),
          type: "warning",
        });
        this.$refs.password.focus();
        return;
      }
      if (this.regForm.password != this.regForm.password2) {
        this.$message({
          message: this.$t('register.warnText[1]'),
          type: "warning",
        });
        this.$refs.password.focus();
        return;
      }
      if (this.isCaptcha && !this.regForm.captcha) {
        this.$message({
          message: this.$t('register.pla[0]'),
          type: "warning",
        });
        this.$refs.captchaCode.focus();
        return;
      }
      this.btnLoading = true;
      var str = "";
      for (var e = 0; e < 4; e++) {
        str += String.fromCharCode(
          Math.floor(Math.random() * 26) + "a".charCodeAt(0)
        );
      }
      let d = this.globalPpproach.checkIsEncrypt({
        username: this.regForm.phone,
        password: this.regForm.password,
       
        client_type: 4,
        market_code: this.regForm.extendCode,
        captcha: this.regForm.captcha,
      });
      this.$http.post("/api/user/register", d).then((res) => {
        //console.log(res)
        if (res.data.code == 1) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          let decryptData = this.decrypt(res.data.encryption);
          this.setInfo(res, decryptData);
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
        this.btnLoading = false;
      });
    },
    
    setInfo(res, decryptData) {
      this.SETUSERNAME(res.data.data.nickname);
      this.SETUSERTOKEN(decryptData.token);
      this.SETPIC(res.data.data.avatar);
      this.SETUSERINFO(res.data.data);
      this.SETISDECIPHER(decryptData.aes_salt);
     
      this.$http.defaults.headers["token"] = decryptData.token;
      this.SETNOTICE(true);
      this.SETLOGIN(false);
      
    },
    clearHC() {
      this.SETUSERNAME("");
      this.SETUSERTOKEN("");
      this.SETPIC("");
      this.SETUSERUSERID("");
      this.SETUSERINFO("");
      this.SETUSER_TYPE("");
      this.SETISDECIPHER("");
    },
  },
  		  computed: {
        	...mapState(["userLoginForm","skin","lanCode","defalutLan"]),
    	},
};
</script>

<style scoped lang="less">
#register {
  position: relative;
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
.pink-color::after{
  background: #FB7772 !important;
	}
	.blue-color:after{
    background: #00B4D8 !important;
	}
	.green-color:after{
    background: #09B584 !important;
	}
  .from-content {
    // margin-top: 24px;
    padding: 0 40px;
    .change-type {
      display: flex;
      border-bottom: 1px solid #dddcdc;
      margin-bottom: 40px;
      > div {
        padding: 30px 0;
        font-size: 16px;
        margin-right: 40px;
        cursor: pointer;
        color: #a9a9a9;
      }
      .active {
        border-bottom: 2px solid #ff1c30;
        font-weight: bold;
        color: #000;
      }
    }
    .el-input__inner {
      border: none;
      background: #f5f5f5;
      height: 42px;
    }
    .custom-btn {
      border: none;
      // background: #ff2235;
      background: #1A88FF;
      height: 42px;
      color: #fff;
      font-size: 16px;
    }
    // .custom-btn:hover {
    //   background: #ff4752;
    // }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
      color: #666666;
    }
    input:-moz-placeholder,
    textarea:-moz-placeholder {
      color: #666666;
    }
    input::-moz-placeholder,
    textarea::-moz-placeholder {
      color: #666666;
    }
    input:-ms-input-placeholder,
    textarea:-ms-input-placeholder {
      color: #666666;
    }
  }

  .other {
    margin-top: 10px;
    color: #a9a9a9;
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
  // right: 150px;
  // top: 766px;
  font-size: 14px;
  span {
    color: #1a88ff;
    cursor: pointer;
  }
}
</style>
