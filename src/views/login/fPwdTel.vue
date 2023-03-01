<template>
  <div id="login">
    <!-- <div class="logo-box" v-if="noticeTypes==1"><a href="/"><img src="../../assets/imgaes/main/logo.png" alt=""></a></div>
		<div class="logo-box" v-if="noticeTypes==2"><a href="/"><img src="../../assets/imgaes/main/logo_dl.png" alt=""></a></div> -->
    <div class="form-box login-form">
      <div class="form-head">
        <h1>找回密码</h1>
      </div>
      <div class="from-content" style="margin-top: 20px" v-if="mode">
        <el-form label-position="top" label-width="80px" :model="findForm">
          <!-- 解决密码自动填充 -->
          <input
            type="number"
            placeholder="Mời nhập số điện thoại"
            style="position: absolute; z-index: -9"
          />
          <input
            type="password"
            placeholder="Mời nhập mật khẩu "
            style="position: absolute; z-index: -9"
          />
          <!-- 解决密码自动填充 -->
          <el-form-item>
            <img src="../../assets/imgaes/login/username_icon.png" alt="" />
            <el-input
              ref="phone"
              v-model="findForm.phone"
              @keyup.native="phoneverify"
              maxlength="11"
              type="tel"
              style="border-color: red"
              placeholder="Mời nhập số điện thoại"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/yzm_icon.png" alt="" />
            <el-input
              ref="code"
              v-model="findForm.code"
              maxlength="4"
              @keyup.native="codeverify"
              placeholder="请输入验证码"
            ></el-input>
            <el-button
              type="danger"
              :disabled="isSend"
              style="
                position: absolute;
                right: 8px;
                border: none;
                background: none !important;
                color: #1a88ff;
                width: 120px;
              "
              @click="sendcode"
              >{{ btnText }}</el-button
            >
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/pwd_icon.png" alt="" />
            <el-input
              ref="password1"
              v-model="findForm.password"
              maxlength="18"
              type="password"
              placeholder="Mời nhập mật khẩu "
            ></el-input>
          </el-form-item>
          <el-form-item>
            <img src="../../assets/imgaes/login/pwd_icon.png" alt="" />
            <el-input
              ref="password2"
              v-model="findForm.repeatpwd"
              maxlength="18"
              type="password"
              placeholder="Xác nhận mật khẩu"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="custom-btn"
          style="width: 100%"
          @click="revisePwd"
          :loading="btnLoading"
          >确 定</el-button
        >
        <div style="margin-top: 14px">
          <div style="float: right">
            Đã có tài khoản,
            <span
              style="color: #1a88ff; cursor: pointer"
              @click="changeLoginType(1)"
              >đăng nhập ngay</span
            >
          </div>
        </div>
      </div>
      <div class="findinfo" style="padding: 0 40px; margin-bottom: 20px" v-else>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 130px 0;
          "
        >
          <img src="../../assets/imgaes/login/info-icon.png" alt="" />
          <div style="margin-left: 8px">
            <p style="font-size: 16px; font-weight: bold; color: black">
              Mật khẩu mới được đặt thành công
            </p>
            <p style="margin-top: 2px">请牢记您设置的密码</p>
          </div>
        </div>
        <el-button
          class="custom-btn"
          style="width: 100%; margin-top: 24px"
          @click="changeLoginType(1)"
          >ăng nhập ngay</el-button
        >
      </div>
    </div>
    <div class="xieyi-box">
      <p>
        登陆和注册表示您同意
        <router-link :to="'/userAgreement'"
          ><span>《乐购协议》</span></router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "findpwd",
  data() {
    return {
      findForm: {
        phone: "",
        password: "",
        code: "",
        repeatpwd: "",
      },
      mode: 1,
      btnText: "Lấy mã xác nhận",
      isSend: false,
      btnLoading: false,
    };
  },
  methods: {
    changeLoginType(i) {
      this.$emit("changeType", i);
    },
    sendcode() {
      let c = this.globalPpproach.checkIsEncrypt({
        mobile: this.findForm.phone,
      });
      this.$http.post("/api/validate/check_mobile_exist", c).then((res) => {
        if (res.data.code == 1) {
          let d = this.globalPpproach.checkIsEncrypt({
            mode: "3",
            mobile: this.findForm.phone,
            event: "resetpwd",
          });
          this.$http.post("/api/sms/send", d).then((res1) => {
            if (res1.data.code == 1) {
              this.$message({
                message: res1.data.msg,
                type: "success",
              });
              //console.log(res1.data.data)
              let time = 120;
              this.isSend = true;
              var codeTimer = setInterval(() => {
                this.btnText = "Gửi lại(" + time-- + ")";
                if (!time) {
                  this.isSend = false;
                  clearInterval(codeTimer);
                  this.btnText = "Gửi lại";
                }
              }, 1000);
            } else {
              this.$message({
                message: res1.data.msg,
                type: "warning",
              });
            }
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
          this.$refs.phone.focus();
        }
      });
    },
    phoneverify(e) {
      this.findForm.phone = e.target.value.replace(/[^\d]/g, "");
    },
    codeverify(e) {
      this.findForm.code = e.target.value.replace(/[^\d]/g, "");
    },
    revisePwd() {
      var this_ = this;

      if (this.isSend == false) {
        this.$message({
          message: "请先获取验证码",
          type: "warning",
        });
        return;
      }
      if (/^[0-9][0-9]{3}$/.test(this.findForm.code)) {
        if (this.findForm.password.length < 6) {
          this.$message({
            message: "密码至少是6位",
            type: "warning",
          });
          this.$refs.password1.focus();
          return;
        }
        if (this.findForm.password == this.findForm.repeatpwd) {
          let d = this.globalPpproach.checkIsEncrypt({
            mobile: this.findForm.phone,
            captcha: this.findForm.code,
            newpassword: this.findForm.repeatpwd,
          });
          this.btnLoading = true;
          this.$http.post("/api/user/resetpwd", d).then((res) => {
            //console.log(res)
            if (res.data.code == 1) {
              this.mode = 0;
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
            this.btnLoading = false;
          });
        } else {
          this.$message({
            message: "Hai lần nhập mật khẩu không giống nhau",
            type: "warning",
          });
          this.$refs.password2.focus();
        }
      } else {
        this.$message({
          message: "验证码是4位数字",
          type: "warning",
        });
        this.$refs.code.focus();
      }
    },
  },
};
</script>

<style scoped lang="less">
#findpwd {
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
  .custom-btn {
    border: none;
    background: #1a88ff;
    height: 42px;
    color: #fff;
    font-size: 16px;
  }
  .custom-btn:hover {
    background: #1a88ff;
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
    height: 50px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #e8f1ff;
  }
  h1 {
    text-align: center;
    color: #1486ff;
    margin: 0;
    font-size: 22px;
    font-weight: normal;
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
      background: #ff2235;
      height: 42px;
      color: #fff;
      font-size: 16px;
    }
    .custom-btn:hover {
      background: #ff4752;
    }
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
  // top: 736px;
  font-size: 14px;
  span {
    color: #1a88ff;
    cursor: pointer;
  }
}
</style>
