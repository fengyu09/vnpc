<template>
  <div id="loginPwd">
    <h3>
      <i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>{{$t('loginPwd.text[0]')}}:
      <span>{{$t('loginPwd.text[1]')}}</span>
    </h3>
    <!-- 手机旧密码修改 -->
    <div class="numPwd" v-if="changeType == true">
      <div class="n01" v-if="n01">
        <div class="jd">
          <div class="bgGray">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="one"></span>
            <span class="two"></span>
            <span class="three"></span>
          </div>
          <div class="bgNum">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num1">1</span>
            <span class="num2">2</span>
            <span class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt1">{{$t('loginPwd.text[2]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt2">{{$t('loginPwd.text[3]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt3">{{$t('loginPwd.text[4]')}}</span>
          </div>
        </div>

        <div class="psd clearfix">
          <input
            ref="oldPsd"
            type="password"
            @blur="oldBlur()"
            v-model="form.oldPsd"
            :placeholder="$t('loginPwd.pla[0]')"
            class="input"
            id="input"
            maxlength="18"
            oninput="if(value.length>18)value=value.slice(0,18)"
          />
         
        </div>
        
        <p class="error-tip" v-if="showTimeTip" style="bottom: 80px">
          {{$t('loginPwd.errorText[0]')}} {{ changeTime }} {{$t('loginPwd.errorText[1]')}}
        </p>
        <p class="error-tip" v-if="showTip2" style="bottom: 80px">
          {{ showText }}
        </p>
        <p class="error-tip" v-if="showTip" style="bottom: 80px">
          {{ showText1 }}
        </p>
        <p>
          <el-button @click="next()" :loading="btnLoading" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{
            bText
          }}</el-button>
        </p>
      </div>
      <div class="n02" v-if="n02">
        <div class="jd">
          <div class="bgGray">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="one"></span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="two"></span>
            <span class="three"></span>
          </div>
          <div class="bgNum">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num1">1</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num2">2</span>
            <span class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt1"> {{$t('loginPwd.text[2]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt2">{{$t('loginPwd.text[3]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt3">{{$t('loginPwd.text[4]')}}</span>
          </div>
        </div>

        <p class="psd">
          <input
            ref="input1"
            type="password"
            v-model="form.newPsd"
            :placeholder="$t('loginPwd.pla[1]')"
            @blur="newBlur()"
            class="input"
            id="input"
            maxlength="18"
            oninput="if(value.length>18)value=value.slice(0,18)"
          />
        </p>
        <!--验证提示-->
        <p class="error-tip" v-if="showTimeTip">
          {{$t('loginPwd.errorText[0]')}}{{ changeTime }} {{$t('loginPwd.errorText[1]')}}
        </p>
        <p class="error-tip" v-if="showTip">{{ showText1 }}</p>
        <p class="psd" style="padding-top: 30px">
          <input
            ref="input2"
            type="password"
            v-model="form.qrNewPsd"
            :placeholder="$t('loginPwd.pla[2]')"
            @blur="newPsdBlur()"
            class="input"
            id="input"
            maxlength="18"
            oninput="if(value.length>18)value=value.slice(0,18)"
          />
        </p>
        <!--验证提示-->
        <p class="error-tip" v-if="showTimeTip">
          {{$t('loginPwd.errorText[0]')}}{{ changeTime }} lần
          nhập
        </p>
        <p class="error-tip" v-if="showTip2">{{ showText }}</p>
        <p>
          <el-button @click="changeSave()" :loading="btnLoading" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{
            bTextt
          }}</el-button>
        </p>
      </div>
      <div class="n03" v-if="n03">
        <div class="jd">
          <div class="bgGray">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="one"></span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="two"></span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="three"></span>
          </div>
          <div class="bgNum">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num1">1</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num2">2</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt1"> {{$t('loginPwd.text[2]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt2">{{$t('loginPwd.text[3]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt3">{{$t('loginPwd.text[4]')}}</span>
          </div>
        </div>
        <div class="success">
          <img src="../../../assets/imgaes/member/success.png" alt />
          <div>
            <span class="span1">{{$t('loginPwd.text[6]')}}</span>
            <span class="span2">{{$t('loginPwd.text[7]')}}</span>
          </div>
          <p class="djs">{{ seconds }}{{$t('loginPwd.text[5]')}}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alertComfirm } from "../../../assets/js/public";
export default {
  name: "loginPwd",
  data() {
    return {
      n01: true,
      n02: false,
      n03: false,
      n04: true,
      n05: false,
      n06: false,
      showTip: false, //确认新密码
      showTip2: false, //新密码
      showTimeTip: false, //输入的次数  如果第一次输入失败  那么就提示还有多少次机会  一共5次机会
      showText: "",
      showText1: "",
      changeType: true,
      form: {
        oldPsd: "",
        newPsd: "",
        qrNewPsd: "",
        number: "",
        newCode: "",
        codePsw: "",
        codePswN: "",
      },
      verify_pwd: 1,
      msg: "",
      btnText: "lấy mã xác minh",
      isSend: false,
      changeTime: "",
      seconds: 3, //跳转倒计时t
      btnLoading: false,
      bText: this.$t('loginPwd.btnText[0]'),
      bTextt: this.$t('loginPwd.btnText[1]'),
    };
  },
  computed: {
    ...mapState(["codeToken", "userinfo","skin"]),
  },
  watch: {
    oldPsd: function (n) {
      this.$nextTick(() => {
        this.form.oldPsd = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
    newPsd: function (n) {
      this.$nextTick(() => {
        this.form.newPsd = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
    codePsw: function (n) {
      this.$nextTick(() => {
        this.form.codePsw = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
  },
  methods: {
    ...mapMutations([
      "SETUSERTOKEN",
      "SETUSERINFO",
      "SETPIC",
      "SETSAFEPWD",
      "SETUSERNAME",
      "SETBALANCE",
      "SETDIAMOND",
      "SETUSER_TYPE",
    ]),
    // 不得为空 6-18位
    oldBlur() {
      if (this.form.oldPsd == "") {
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[2]');
        return;
      }
      if (this.form.oldPsd.length < 6 || this.form.oldPsd.length > 18) {
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[3]');
        return;
      }
      this.showTip2 = false;
    },
    //密码不得为空  6-18  新与旧不得一致
    newBlur() {
      if (this.form.newPsd == "") {
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[4]');
        return;
      }
      if (this.form.newPsd.length < 6 || this.form.newPsd.length > 18) {
        // this.showTip = true ;
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[5]');
        return;
      }
      if (this.form.newPsd == this.form.oldPsd) {
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[6]');
        return;
      }
      this.showTip = false;
    },
    //不得为空  新密码于确认密码得一致
    newPsdBlur() {
      if (this.form.qrNewPsd == "") {
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[7]');
        return;
      }
      if (this.form.newPsd != this.form.qrNewPsd) {
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[8]');
        return;
      }
      this.showTip2 = false;
    },
    //旧密码是否正确  旧密码不得为空  6-18位
    next() {
      if (this.form.oldPsd == "") {
        this.showTimeTip = false;
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[2]');
        return;
      }
      if (this.form.oldPsd.length < 6 || this.form.oldPsd.length > 18) {
        this.showTimeTip = false;
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[3]');
        return;
      }
      this.showTip2 = false;
      this.btnLoading = true;
      this.bText = this.$t('loginPwd.btnText[2]');
      //验证旧密码是否正确
      let d = this.globalPpproach.checkIsEncrypt(
        {
          type: "oldpwd",
          oldpassword: this.form.oldPsd,
          newpassword: this.form.newPs,
          verify_pwd: this.verify_pwd,
        },
        true
      );
      console.log({
        type: "oldpwd",
        oldpassword: this.form.oldPsd,
        newpassword: this.form.newPs,
      });
      this.$http
        .post("/api/user/resetpwd?token=" + this.codeToken, d)
        .then((res) => {
          console.log(res);
          this.btnLoading = false;
          this.bText = this.$t('loginPwd.btnText[0]');
          if (res && res.data.code == 1) {
            this.n01 = false;
            this.n03 = false;
            this.n02 = true;
            this.showTimeTip = false;
          } else if (res && res.data.code == 1002) {
            this.changeTime = res.data.data.remain_times - 0 + 1;
            this.showTimeTip = true;
          } else if (res && res.data.code == 1012) {
            alertComfirm({ msg: res.data.msg }, () => {
              this.$router.push("/setting");
            });
            this.form.oldPsd = "";
            return;
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              offset: 230,
            });
            this.form.oldPsd = "";

            return;
          }
        })
        .catch(() => {
          this.btnLoading = false;
          this.bText = this.$t('loginPwd.btnText[3]');
          this.form.oldPsd = "";
          this.$message({
            message: this.$t('loginPwd.warnText[0]'),
            type: "error",
            offset: 230,
          });
        });
      //      this.form.oldPsd = "";
    },
    //提交  新密码 确认密码不得为空  得一致
    changeSave() {
      //新密码
      if (this.form.newPsd == "") {
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[4]');
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[7]');
        return;
      }
      this.showTip = false;
      this.showTip2 = false;
      if (this.form.newPsd == this.form.oldPsd) {
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[6]');
        return;
      }
      if (this.form.newPsd.length < 6 || this.form.newPsd.length > 18) {
        // this.showTip = true ;
        // this.$refs.input1.focus();
        this.showTip = true;
        this.showText1 = this.$t('loginPwd.errorText[5]');
        return;
      }
      if (this.form.qrNewPsd == "") {
        // this.$refs.input2.focus();
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[7]');
        return;
      }
      if (this.form.newPsd != this.form.qrNewPsd) {
        // this.$refs.input2.focus();
        this.showTip2 = true;
        this.showText = this.$t('loginPwd.errorText[8]');
        return;
      }
      
      this.btnLoading = true;
      this.bTextt = this.$t('loginPwd.btnText[4]');
      let self = this;
      //发送请求接口修改密码
      let d = this.globalPpproach.checkIsEncrypt(
        {
          type: "oldpwd",
          oldpassword: self.form.oldPsd,
          newpassword: self.form.newPsd,
        },
        true
      );
      self.$http
        .post("/api/user/resetpwd?token=" + self.codeToken, d)
        .then((res) => {
          this.btnLoading = false;
          this.bTextt = this.$t('loginPwd.btnText[1]');
          if (res && res.data.code == 1) {
            this.$http.post("/api/user/logout").then((res) => {
              if (res && res.data.code == 1) {
                
                this.$http.defaults.headers["token"] = "";
                this.SETUSERTOKEN("");
                this.SETPIC("");
                this.SETUSERINFO("");
                this.SETUSERNAME("");
                this.SETSAFEPWD("");
                this.SETUSER_TYPE("");
                this.SETBALANCE("");
                this.SETDIAMOND("");
                this.SETFOCUS("");
              }
            });
            this.n01 = false;
            this.n02 = false;
            this.n03 = true;
            this.timer();
            setTimeout(() => {
              // self.$ro.push("/login");
              this.$store.commit("SETLOGIN", true);
              //清空当前登录的数据
            }, 3000);
          } else {
            if (res && res.data.code == 1012) {
              this.$alert(res.data.msg, this.$t('tsTitle'), {
                confirmButtonText: this.$t('loginPwd.btnText[3]'),
              });
            } else if (res && res.data.code == 1002) {
              this.changeTime = res.data.data.remain_times - 0 + 1;
              this.showTimeTip = true;
              self.form.oldPsd = "";
              self.form.newPsd = "";
              self.form.qrNewPsd = "";
            } else {
              this.$message({
                message: res.data.msg,
                type: "error",
                offset: 230,
              });
              self.form.oldPsd = "";
              self.form.newPsd = "";
              self.form.qrNewPsd = "";
            }
          }
        });
    },

    //定时器
    timer() {
      let _this = this;
      // 创建一个定时器
      let time = window.setInterval(function () {
        // 如果秒数为0 && 分钟数还没有为0
        if (_this.seconds > 0) {
          _this.seconds -= 1;
          // 都为0的时候 清除定时器
        } else if (_this.seconds === 0) {
          window.clearInterval(time);
          // 分钟数和秒数同时为0  小时数--  分钟数和秒数都变为59
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
#loginPwd {
  h3 {
    font-size: 18px;
    padding-top: 20px;
    color: #333333;
    border-bottom: solid 1px #f4f5f8;
    padding-bottom: 15px;
    i {
      display: inline-block;
      width: 4px;
      height: 17px;
      background: #1486ff;
      border-radius: 7px;
      position: relative;
      top: 2px;
      margin-right: 10px;
    }
    span {
      color: #666666;
      font-size: 14px;
    }
  }
  .numPwd {
    margin: 40px auto;
    position: relative;
    .change_type {
      cursor: pointer;
      color: #1486ff;
      font-size: 14px;
      margin: 0 auto;
      text-align: right;
      // width: 100px;
      margin-top: 30px;
      margin-bottom: 20px;
      float: right;
    }
    .next {
      margin: 0 auto;
    }
  }
  .codePwd {
    margin: 40px auto;
    position: relative;
    .psd_send {
      position: relative;
      padding-top: 0;
      .input_code {
        margin-top: 30px;
        // position: relative;
      }
      .send_code {
        position: absolute;
        right: 5px;
        bottom: 5px;
        // width: 94px;
        padding: 0 12px;
        height: 32px;
        line-height: 32px;
        color: #fff;
        background: #1486ff;
        text-align: center;
        border-radius: 99px;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
  .n01 {
    .jd {
      width: 610px;
      margin: 0 auto;
      .bgGray {
        width: 100%;
        span {
          display: inline-block;
        }
        .one {
          width: 70px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
        .two {
          width: 230px;
          height: 10px;
          background: #f0f0f0;
          border-radius: 23px;
        }
        .three {
          width: 300px;
          height: 10px;
          background: #f0f0f0;
          border-radius: 23px;
        }
      }
      .bgNum {
        position: relative;
        top: -20px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          background: #f0f0f0;
          border-radius: 50%;
        }
        .num1 {
          margin-left: 60px;
          background: #1486ff;
        }
        .num2 {
          margin-left: 210px;
        }
        .num3 {
          margin-left: 210px;
        }
      }
      .bgTxt {
        position: relative;
        top: -12px;
        span {
          font-size: 14px;
          color: #999999;
        }
        .txt1 {
          color: #1486ff;
        }
        .txt2 {
          padding-left: 120px;
        }
        .txt3 {
          padding-left: 160px;
        }
      }
    } 

    .psd {
      width: 340px;
      padding-top: 90px;
      margin: 0 auto;
      border: 0;
      input {
        width: 100%;
        height: 42px;
        line-height: 42px;
        border-radius: 99px;
        background: #f5f5f5;
        color: #333;
        padding-left: 20px;
        font-size: 14px;
      }
    }
    p {
      text-align: center;
      border: 0;
      button {
        margin: 30px auto;
        width: 340px;
        height: 42px;
        // line-height: 42px;
        border-radius: 99px;
        background: #1486ff;
        color: #fff;
      }
    }
    .error-tip {
      color: #ff513e;
      font-weight: 500;
      font-size: 12px;
      padding: 6px;
      position: absolute;
      left: 282px;
      // bottom: 80px;
    }
  }
  .n02 {
    .jd {
      width: 610px;
      margin: 0 auto;
      .bgGray {
        width: 100%;
        span {
          display: inline-block;
        }
        .one {
          width: 70px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
        .two {
          width: 230px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
        .three {
          width: 300px;
          height: 10px;
          background: #f0f0f0;
          border-radius: 23px;
        }
      }
      .bgNum {
        position: relative;
        top: -20px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          background: #f0f0f0;
          border-radius: 50%;
        }
        .num1 {
          margin-left: 60px;
          background: #1486ff;
        }
        .num2 {
          margin-left: 210px;
          background: #1486ff;
        }
        .num3 {
          margin-left: 210px;
        }
      }
      .bgTxt {
        position: relative;
        top: -12px;
        span {
          font-size: 14px;
          color: #999999;
        }
        .txt1 {
          color: #1486ff;
        }
        .txt2 {
          padding-left: 120px;
          color: #1486ff;
        }
        .txt3 {
          padding-left: 160px;
        }
      }
    }

    .psd {
      width: 340px;
      padding-top: 90px;
      margin: 0 auto;
      border: 0;
      input {
        width: 100%;
        height: 42px;
        line-height: 42px;
        border-radius: 99px;
        background: #f5f5f5;
        color: #333;
        padding-left: 20px;
        font-size: 14px;
      }
    }
    p {
      text-align: center;
      border: 0;
      button {
        margin: 30px auto;
        width: 340px;
        height: 42px;
        // line-height: 42px;
        border-radius: 99px;
        background: #1486ff;
        color: #fff;
        span {
          width: 100% !important;
          height: 100%;
          line-height: 100% !important;
          // display: block!important;
        }
      }
    }
    .error-tip {
      color: #ff513e;
      font-weight: 500;
      font-size: 12px;
      padding: 6px;
      position: absolute;
      left: 282px;
      // bottom: 80px;
    }
  }
  .n03 {
    .jd {
      width: 610px;
      margin: 0 auto;
      .bgGray {
        width: 100%;
        span {
          display: inline-block;
        }
        .one {
          width: 70px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
        .two {
          width: 230px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
        .three {
          width: 300px;
          height: 10px;
          background: #1486ff;
          border-radius: 23px;
        }
      }
      .bgNum {
        position: relative;
        top: -20px;
        span {
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          background: #f0f0f0;
          border-radius: 50%;
        }
        .num1 {
          margin-left: 60px;
          background: #1486ff;
        }
        .num2 {
          margin-left: 210px;
          background: #1486ff;
        }
        .num3 {
          margin-left: 210px;
          background: #1486ff;
        }
      }
      .bgTxt {
        position: relative;
        top: -12px;
        span {
          font-size: 14px;
          color: #999999;
        }
        .txt1 {
          color: #1486ff;
        }
        .txt2 {
          padding-left: 120px;
          color: #1486ff;
        }
        .txt3 {
          padding-left: 160px;
          color: #1486ff;
        }
      }
    }
    .success {
      padding: 100px 0 0 382px;
      img {
        width: 38px;
        height: 38px;
        float: left;
      }
      div {
        float: left;
        padding-left: 10px;
        .span1 {
          display: block;
          font-size: 14px;
          color: #333333;
        }
        .span2 {
          display: block;
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .djs {
      clear: both;
      width: 100%;
      padding-left: 25px;
      line-height: 50px;
    }
  }
}
</style>
