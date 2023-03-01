<template>
  <div id="payPwd">
    <!-- 设置支付密码->修改支付密码 -->
    <h3>
      <i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>{{$t('PayPwd.text[0]')}}:
      <span>{{$t('PayPwd.text[1]')}}</span>
    </h3>
    <div class="setPayPas">
      <div class="n01" v-if="n01">
        <div class="jd">
          <div class="bgGray">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="one"></span>
            <span  class="two"></span>
            <span  class="three"></span>
          </div>
          <div class="bgNum">
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num1">1</span>
            <span class="num2">2</span>
            <span class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span class="txt1" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]"> {{$t('PayPwd.text[2]')}}</span>
            <span class="txt2" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('PayPwd.text[3]')}}</span>
            <span class="txt3" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('PayPwd.text[4]')}}</span>
          </div>
        </div>

        <p class="psd">
          <el-input
            ref="oldpd"
            type="password"
            :placeholder="$t('PayPwd.pla[2]')"
            @blur="fun()"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="oldPsd"
            maxlength="6"
            show-password
          ></el-input>
        </p>
        <!--验证提示-->
        <p class="error-tip" v-if="showTimeTip">
          {{$t('PayPwd.errorText[5]')}}{{ changeTime }}  {{$t('PayPwd.errorText[6]')}}
        </p>
        <p class="error-tip" v-if="showTip">{{ tips }}</p>
        <p>
          <!-- <button  @click="next">{{nextTip}}</button> -->
          <el-button @click="next()" :loading="btnLoading" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{
            nextTip
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
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  class="num1">1</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num2">2</span>
            <span class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt1"> {{$t('PayPwd.text[2]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt2">{{$t('PayPwd.text[3]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt3">{{$t('PayPwd.text[4]')}}</span>
          </div>
        </div>

        <p class="psd">
          <el-input
            ref="newpd"
            type="password"
            :placeholder="$t('PayPwd.warnText[4]')"
            @blur="fun1()"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="newPsd"
            maxlength="6"
            show-password
          ></el-input>
        </p>
        <p class="error-tip1" v-if="showTip2">{{ tips1 }}</p>
        <p class="psd" style="padding-top: 30px">
          <el-input
            ref="newpds   "
            type="password"
            :placeholder="$t('PayPwd.pla[1]')"
            @blur="fun2()"
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="qrNewPsd"
            maxlength="6"
            show-password
          ></el-input>
          
        </p>
        <!--验证提示-->
        <p class="error-tip1" v-if="showTip3">{{ tips2 }}</p>
        <p>
          <el-button @click="commit()" :loading="btnLoading1" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{
            commitTip
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
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  class="num1">1</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  class="num2">2</span>
            <span :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="num3">3</span>
          </div>
          <div class="bgTxt">
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt1"> {{$t('PayPwd.text[2]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt2">{{$t('PayPwd.text[3]')}}</span>
            <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="txt3">{{$t('PayPwd.text[4]')}}</span>
          </div>
        </div>
        <div class="success">
          <img src="../../../assets/imgaes/member/success.png" alt />
          <div>
            <span class="span1"> {{$t('PayPwd.errorText[7]')}}</span>
            <span class="span2"> {{$t('PayPwd.errorText[8]')}}</span>
          </div>
          <p class="djs">{{ seconds }} {{$t('PayPwd.errorText[9]')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "payPwd",
  data() {
    return {
      btnLoading: false,
      btnLoading1: false,
      oldPsd: "",
      showTip: false, //验证错误提示
      showTip2: false, //新密码与旧密码不能一样
      showTip3: false,
      showTimeTip: false, //输入的次数  如果第一次输入失败  那么就提示还有多少次机会  一共4次机会
      n01: true,
      n02: false,
      n03: false,
      newPsd: "",
      qrNewPsd: "",
      tips: "",
      tips1: "",
      tips2: "",
      seconds: 3,
      changeTime: "",
      nextTip: this.$t('PayPwd.warnText[3]'),
      commitTip: this.$t('PayPwd.text[6]'),
    };
  },
  methods: {
    fun() {
      this.showTip = false;
      this.tips = "";
      if (this.oldPsd == "") {
        this.showTip = true;
        this.tips = this.$t('PayPwd.errorText[0]');
        return false;
      }
      if (this.oldPsd.length < 6) {
        this.showTip = true;
        this.tips = this.$t('PayPwd.errorText[1]');
        // this.$refs.oldpd.$el.querySelector("input").focus();
        return false;
      }
      if (this.oldPsd.length == 6) {
        this.showTip = false;
        this.tips = "";
      }
    },
    fun1() {
      if (this.newPsd == "") {
        this.showTip2 = true;
        this.tips1 = this.$t('PayPwd.errorText[3]');
        // this.$refs.oldpd.$el.querySelector("input").focus();
        return false;
      }
      if (this.newPsd.length < 6) {
        this.showTip2 = true;
        this.tips1 = this.$t('PayPwd.errorText[1]');
        // this.$refs.newpd.$el.querySelector("input").focus();
        return false;
      }
      if (this.newPsd == this.oldPsd) {
        this.showTip2 = true;
        this.tips1 = this.$t('PayPwd.errorText[3]');
        // this.$refs.newpd.$el.querySelector("input").focus();
        return false;
      }
      if (this.newPsd.length == 6) {
        this.showTip2 = false;
        this.tips1 = "";
      }
    },
    fun2() {
      if (this.qrNewPsd == "") {
        this.showTip3 = true;
        this.tips2 = this.$t('PayPwd.errorText[4]');
        // this.$refs.oldpd.$el.querySelector("input").focus();
        return false;
      } else if (this.newPsd != this.qrNewPsd) {
        this.showTip3 = true;
        this.tips2 = this.$t('PayPwd.errorText[2]');
        // this.$refs.newpds.$el.querySelector("input").focus();
        return;
      } else {
        this.showTip3 = false;
        this.tips2 = "";
      }
    },
    async checkOldPwd() {
      this.btnLoading = true;
      this.nextTip = "Đang xác minh...";
      let d = this.globalPpproach.checkIsEncrypt({
        password: this.oldPsd,
      });
      let res = await this.$http.post("/api/user/chkfundpwd", d);
      if (res && res.data.code == 1) {
        //输入新密码
        this.nextTip = this.$t('PayPwd.warnText[3]');
        this.btnLoading = false;
        this.tipText = this.$t('PayPwd.warnText[4]');
        this.isComfirm = 2;
        this.showTimeTip = false;
        this.n01 = false;
        this.n02 = true;
      } else if (res && res.data.code == 1002) {
        this.nextTip = this.$t('PayPwd.warnText[3]');
        this.btnLoading = false;
        this.changeTime = res.data.data.remain_times;
        if (this.changeTime == 0) {
          this.showTimeTip = false;
          this.SETSAFEPWD(10);
          //冻结账户判断
          alert("已冻结");
        } else {
          //提示剩下的机会
          this.showTimeTip = true;
        }
        this.payPwd = ""; //错误清空
        // this.clearActive(); //错误清空
      } else if (res && res.data.code == 1012) {
        this.nextTip = this.$t('PayPwd.warnText[3]');
        this.btnLoading = false;
        this.SETSAFEPWD(10);
        //冻结账户判断
        this.$message(this.$t('PayPwd.warnText[2]'));
      } else if (res && res.data.code == 1003) {
        this.nextTip = this.$t('PayPwd.warnText[3]');
        this.btnLoading = false;
        //新旧密码不能一致
        this.$vux.confirm.show({
          title: "",
          content: this.$t('PayPwd.warnText[0]'),
          confirmText: this.$t('PayPwd.warnText[1]'),
          onCancel: () => {
            this.$router.push({ name: "setting" });
          },
          onConfirm: () => {
            //重新输入新密码
            this.clearActive();
            this.isComfirm = 2;
            this.tipText = this.$t('PayPwd.warnText[4]');
            this.payRePwd = "";
          },
        });
      } else if (res && res.data.code == 0) {
        this.$message(res.data.msg);
      }
      this.nextTip = this.$t('PayPwd.warnText[3]');
      this.btnLoading = false;
    },
    next() {
      if (this.oldPsd == "") {
        this.showTip = true;
        this.tips = this.$t('PayPwd.errorText[0]');
        // this.$refs.oldpd.$el.querySelector("input").focus();
        return false;
      } else if (this.oldPsd.length < 6) {
        this.showTip = true;
        this.tips = this.$t('PayPwd.errorText[1]');
        // this.$refs.oldpd.$el.querySelector("input").focus();
        return false;
      } else if (this.oldPsd.length == 6) {
        this.showTip = false;
        this.tips = "";
        this.checkOldPwd();
      }
    },
    commit() {
      if (this.newPsd != this.qrNewPsd) {
        this.showTip3 = true;
        this.tips2 = this.$t('PayPwd.errorText[2]');
        // this.$refs.newpds.$el.querySelector("input").focus();
        return;
      } else if (this.newPsd == "" || this.qrNewPsd == "") {
        this.showTip2 = true;
        this.tips1 =this.$t('PayPwd.errorText[3]');
        // this.$refs.oldpd.$el.querySelector("input").focus();

        this.showTip3 = true;
        this.tips2 = this.$t('PayPwd.errorText[4]');
        return false;
      } else {
        this.btnLoading1 = true;
        this.commitTip = this.$t('PayPwd.text[5]')+"...";
        let d = this.globalPpproach.checkIsEncrypt({
          newpassword: this.qrNewPsd,
          oldpassword: this.oldPsd,
          type: "oldpwd",
          verify_pwd:0
        });
        this.$http
          .post("/api/user/resetfundpwd", d)
          .then((res) => {
            if (res.data.code == 1) {
              this.btnLoading1 = false;
              this.commitTip = this.$t('PayPwd.text[6]');
              this.n02 = false;
              this.n03 = true;
              this.timer();
              setTimeout(() => {
                this.$router.push("/setting");
              }, 3000);
            } else {
              this.btnLoading1 = false;
              this.commitTip = this.$t('PayPwd.text[6]');
            }
          })
          .catch((err) => {});
      }
    },
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
    computed: {
    ...mapState(["skin"]),
  },
};
</script>

<style scoped lang="less">
#payPwd {
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
  .setPayPas {
    margin: 40px auto;
    position: relative;
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
          border: 0;
          cursor: pointer;
        }
      }
      .error-tip {
        color: #ff513e;
        font-weight: 500;
        font-size: 12px;
        padding: 6px;
        position: absolute;
        margin-left: 298px;
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
        // input {
        //   width: 100%;
        //   height: 42px;
        //   line-height: 42px;
        //   border-radius: 99px;
        //   background: #f5f5f5;
        //   color: #333;
        //   padding-left: 20px;
        //   font-size: 14px;
        // }
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
          border: 0;
          cursor: pointer;
        }
      }
      .error-tip {
        color: #ff513e;
        font-weight: 500;
        font-size: 12px;
        padding: 6px;
        position: absolute;
        margin-left: 298px;
      }
      .error-tip1 {
        color: #ff513e;
        font-weight: 500;
        font-size: 12px;
        padding: 6px;
        position: absolute;
        margin-left: 298px;
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
        .djs {
          clear: both;
          width: 100%;
          padding-left: 25px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
