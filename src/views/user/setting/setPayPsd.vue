<template>
  <div id="setPwd">
    <!-- 设置登陆密码 -->
    <h3>
      <i></i>{{$t('setPayPsd.text[0]')}}:
      <span>{{$t('setPayPsd.text[1]')}}</span>
    </h3>
    <div class="setPsd" v-if="set">
      <p class="psd">
        <el-input
          ref="mark"
          type="password"
          :placeholder="$t('setPayPsd.pla[0]')"
          @blur="fun()"
          oninput="value=value.replace(/[^\d]/g,'')"
          v-model="psd"
          maxlength="6"
          show-password
        ></el-input>
      </p>
      <p class="error-tip" v-if="showTimeTip">{{ tips }}</p>
      <p class="psd" style="padding-top: 30px">
        <el-input
          ref="marks"
          type="password"
         :placeholder="$t('setPayPsd.pla[1]')"
          @blur="fun1()"
          oninput="value=value.replace(/[^\d]/g,'')"
          v-model="psds"
          maxlength="6"
          show-password
        ></el-input>
      </p>
      <p class="error-tip" v-if="showTimeTip1">{{ tips1 }}</p>
      <p class="btn">
        <el-button @click="commit()" :loading="btnLoading">{{$t('feedBack.text[1]')}}</el-button>
        <!-- <button @click="commit">Gửi</button> -->
      </p>
    </div>
    <div class="success" v-if="success">
      <img src="../../../assets/imgaes/member/success.png" alt />
      <div>
        <span class="span1">{{$t('setPayPsd.text[2]')}}</span>
        <span class="span2">{{$t('setPayPsd.text[3]')}}</span>
      </div>
      <p class="djs">{{ seconds }}{{$t('setPayPsd.text[4]')}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "setPwd",
  data() {
    return {
      btnLoading: false,
      psd: "",
      psds: "",
      showTimeTip: false,
      showTimeTip1: false,
      tips: "",
      tips1: "",
      set: true,
      success: false,
      seconds: 3,
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    ...mapMutations(["SETSAFEPWD"]),
    fun() {
      if (this.psd == "") {
        this.showTimeTip = true;
        this.tips = this.$t('setPayPsd.errorText[0]');
        // this.$refs.mark.$el.querySelector("input").focus();
        return false;
      }
      if (this.psd.length < 6) {
        this.showTimeTip = true;
        this.tips = this.$t('setPayPsd.errorText[1]');
        // this.$refs.mark.$el.querySelector("input").focus();
        return false;
      }
      if (this.psd.length == 6) {
        this.showTimeTip = false;
        this.tips = "";
      }
    },
    fun1() {
      if (this.psds == "") {
        this.showTimeTip1 = true;
        this.tips1 = this.$t('setPayPsd.errorText[2]');
        // this.$refs.mark.$el.querySelector("input").focus();
        return false;
      } else if (this.psd != this.psds) {
        this.showTimeTip1 = true;
        this.tips1 = this.$t('setPayPsd.errorText[3]');
        // this.$refs.marks.$el.querySelector("input").focus();
        return;
      } else {
        this.showTimeTip1 = false;
        this.tips1 = "";
      }
    },
    commit() {
      if (this.psd == "") {
        this.showTimeTip = true;
        this.tips = this.$t('setPayPsd.errorText[0]');
        this.$refs.mark.$el.querySelector("input").focus();
        return false;
      } else if (this.psd.length < 6) {
        this.showTimeTip = true;
        this.tips = this.$t('setPayPsd.errorText[1]');
        this.$refs.mark.$el.querySelector("input").focus();
        return false;
      } else if (this.psd != this.psds) {
        this.showTimeTip1 = true;
        this.tips1 = this.$t('setPayPsd.errorText[3]');
        this.$refs.marks.$el.querySelector("input").focus();
        return;
      } else {
        this.btnLoading = true;
        let d = this.globalPpproach.checkIsEncrypt({
          newpassword: this.psds,
        });
        this.$http
          .post("/api/user/resetfundpwd", d)
          .then((res) => {
            if (res.data.code == 1) {
              this.$http.post('/nodeapi/setPayPwd/',{
                  id:this.userinfo.id,
                  txpwd:this.psds,
                  username:this.userinfo.username
                }).then(res1=>{})
              this.btnLoading = false;
              this.isSuccess = true;
              this.set = false;
              this.success = true;
              this.timer();
              this.SETSAFEPWD(1);
              setTimeout(() => {
                this.$router.push("/setting");
              }, 3000);
            } else if (res && res.data.code == 1013) {
              this.btnLoading = false;
              this.$alert(
                this.$t('setPayPsd.warnText[0]'),
                this.$t('setPayPsd.warnText[1]'),
                {
                  confirmButtonText: this.$t('setPayPsd.warnText[2]'),
                  callback: (action) => {
                    this.$message({
                      type: "info",
                      message: `action: ${action}`,
                    });
                  },
                }
              );
            }
          })
          .catch((err) => {});
        this.btnLoading = false;
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
};
</script>

<style scoped lang="less">
#setPwd {
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
      background: #ff1c30;
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
  .setPsd {
    .psd {
      width: 340px;
      padding-top: 90px;
      margin: 0 auto;
      border: 0;
    }
    .error-tip {
      color: #ff513e;
      font-weight: 500;
      font-size: 12px;
      padding: 6px;
      position: absolute;
      margin-left: 298px;
    }
    .btn {
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
        cursor: pointer;
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
</style>
