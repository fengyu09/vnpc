<template>
  <div id="setting">
    <div id="set">
      <h3><i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>{{$t('setting.title')}}</h3>
      <p>
        <i class="icon1"></i>
        <span class="sz">{{$t('setting.text[0]')}}</span>
        <span class="ts">{{ payValue }}</span>
        <a @click="goPayW" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{ isSet }}</a>
      </p>
      <p>
        <i class="icon2"></i>
        <span class="sz">{{$t('setting.text[1]')}}</span>
        <router-link to="/loginPwd" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('setting.text[3]')}}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "setting",
  data() {
    return {
      active: 0,
      cur: 3,
      payValue: this.$t('setting.text[5]'),
      isSet: this.$t('setting.text[2]'),
      linkUrl: "/setPay",
    };
  },
  computed: {
    ...mapState(["safePwd","skin"]),
  },
  created() {
    this.checkPay();
  },
  methods: {
    ...mapMutations([
      "SETSAFEPWD",
    ]),
    //点击

    async checkPay() {
      // debugger
      if (this.safePwd == 1 || this.safePwd == 9 || this.safePwd == 10) {
        if (this.safePwd == 1) {
          this.payValue = "";
          this.linkUrl = "/PayPwd";
          this.isSet = this.$t('setting.text[3]');
        } else if (this.safePwd == 2) {
          this.payValue = this.$t('setting.text[5]');
          this.isSet =  this.$t('setting.text[2]');
          this.linkUrl = "/setPay";
        } else if (this.safePwd == 10) {
          this.payValue = this.$t('setting.text[6]');
          this.linkUrl = "/";
          this.isSet = this.$t('setting.text[4]');
        }
        return;
      }
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      if (res && res.data.code == 1) {
        console.log(res);
        //已经设置
        this.payValue = "";
        this.isSet = this.$t('setting.text[3]');
        this.linkUrl = "/PayPwd";
        this.SETSAFEPWD(1);
      } else if (res && res.data.code == 2) {
        //未设置
        this.payValue = this.$t('setting.text[5]');
        this.isSet =  this.$t('setting.text[2]');
        this.linkUrl = "/setPay";
        this.SETSAFEPWD(2);
      } else if (res && res.data.code == 10) {
        this.payValue = this.$t('setting.text[6]');
        this.linkUrl = "/";
        this.isSet = this.$t('setting.text[4]');
        this.SETSAFEPWD(10);
      }
      //缓存
    },
    //点击
    goPayW() {
      if (this.safePwd == 10) {
        this.isSet = this.$t('setting.text[4]');
        this.payValue = this.$t('setting.text[6]');
        window.open(localStorage.getItem("customer"), "_blank");
      } else {
        this.$router.push(this.linkUrl);
      }
    },
  },
};
</script>

<style scoped lang="less">
#setting {
  #set {
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
    p {
      width: 440px;
      height: 80px;
      background: #f4f5f8;
      float: left;
      padding: 20px;
      border-radius: 7px;
      margin-top: 20px;
      position: relative;
      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-size: 40px 40px;
        float: left;
        background: url(../../../assets/imgaes/usercenter.png) no-repeat center;
      }
      .icon1 {
       
        background-position: -386px -807px;
        background-size: 850px 850px;
      }
      .icon2 {
       
        background-position: -386px -762px;
        background-size: 850px 850px;
      }
      .sz {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        padding-left: 10px;
        line-height: 40px;
      }
      .ts {
        font-size: 14px;
        line-height: 14px;
        color: #999999;
        padding-left: 47px;
        display: block;
      }
      a {
        font-size: 14px;
        display: inline-block;
        padding: 6px 20px;
        background: #ffffff;
        color: #1486ff;
        border-radius: 99px;
        position: absolute;
        top: 25px;
        right: 10px;
        cursor: pointer;
      }
      a:hover {
        font-size: 14px;
        padding: 6px 20px;
        background: #1486ff;
        color: #fff;
        border-radius: 99px;
        position: absolute;
        top: 25px;
        right: 10px;
        cursor: pointer;
      }
    }
    p:last-child {
      margin-left: 30px;
    }
  }
}
</style>
