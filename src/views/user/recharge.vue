<template>
  <div id="recharge">
    <h3>Nạp</h3>
    <ul class="czlist">
      <li
        v-for="(item, index) in czlist"
        v-on:click="addClass(item, index)"
        v-bind:class="{ active: index == current }"
        :key="index"
      >
        <img v-lazy="item.icon" alt />
        <a>{{ item.channels_type }}</a>
        <span>({{ item.low_money }}~{{ item.high_money }})</span>
      </li>
    </ul>
    <h3 style="border: 0">Tiền nạp</h3>
    <ul class="monList">
      <li
        v-for="(v, index1) in liList"
        v-on:click="selectMoney(v, index1)"
        v-bind:class="{ active1: index1 == current1 }"
        :key="index1"
      >
        {{ v.title }}
      </li>
    </ul>
    <h3 style="border: 0">Số tiền khác</h3>
    <el-input v-model="czMoney" placeholder="Mời nhập nội dung"></el-input>
    <p>Số tiền phải trả：{{ czMoney }}</p>
    <el-button @click="rechangeMoney" type="danger">支付</el-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "recharge",
  data() {
    return {
      czlist: [],
      current1: 0.1,
      payInfo: {},
      current: 0.1,
      liList: [
        { title: "10" },
        { title: "20" },
        { title: "50" },
        { title: "100" },
        { title: "200" },
        { title: "500" },
        { title: "1000" },
        { title: "2000" },
      ],
      czMoney: 0,
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState(["userinfo", "safePwd"]),
  },
  methods: {
    init() {
      this.getList();
    },
    getList() {
      this.$http.post(this.versionLive2 + "Recharge/getList").then((res) => {
        if (res && res.data.code == 1) {
          this.czlist = res.data.data || [];
        }
      });
    },
    addClass: function (i, index) {
      this.payInfo = i;
      this.current = index;
    },
    selectMoney(v, index1) {
      this.current1 = index1;
      this.czMoney = v.title;
    },
    rechangeMoney() {
      if (
        parseInt(this.czMoney) < parseInt(this.payInfo.low_money) ||
        parseInt(this.czMoney) > parseInt(this.payInfo.high_money)
      ) {
        //          this.showPositionValue=true;
        //          this.paymsg="充值金额为("+this.payInfo.low_money+"~"+this.payInfo.high_money+")"
        alert(
          "Số tiền nạp là(" +
            this.payInfo.low_money +
            "~" +
            this.payInfo.high_money +
            ")"
        );
      } else {
        let url = this.payInfo.apiroute;
        // if(this.paymoney.charAt(this.paymoney.length-1)=='.'){
        //   this.paymoney=this.paymoney.substring(0,this.paymoney.length-1);
        // }
        let data = {
          user_id: parseInt(this.userinfo.user_id),
          amount: this.czMoney,
          channels_id: this.payInfo.id,
          returnurl: window.location.href,
        };
        this.$http
          .post(url, data)
          .then((res) => {
            //  this.$vux.loading.hide();
            if (res && res.data.code == 1) {
              this.czMoney = "";
              let url = "";
              if (this.payInfo.id == 3 || this.payInfo.id == 6) {
                url = res.data.data.url + "?isOpen=123";
              } else {
                url = res.data.data.url;
              }
              if (window.webkit) {
                window.webkit.messageHandlers.needNav.postMessage({
                  url: url,
                  name: this.payInfo.channels_type,
                  backUrl: window.location.href,
                });
              } else if (window.android) {
                this.alertLL(res.data.data.url, this.payInfo.channels_type);
                //            window.location.href = res.data.data.url;
              } else {
                //             window.open 弹出新窗口的命令；
                // 'page.html' 弹出窗口的文件名；
                // 'newwindow' 弹出窗口的名字  可有可无
                // height=100 窗口高度；
                // width=400 窗口宽度；
                // top=0 窗口距离屏幕上方的象素值；

                // left=0 窗口距离屏幕左侧的象素值；
                window.open(
                  res.data.data.url,
                  "",
                  "width=800,height=800,top=100, left=100"
                );
                // window.location.href = res.data.data.url;
              }
            } else if (res) {
              if (this.payInfo.id == 8) {
                this.paymoney = "";
                this.$router.push({
                  name: "rechargePage",
                  params: { url: res.data },
                });
              } else {
                this.$vux.toast.text(res.data.msg, "middle");
              }
            }
          })
          .catch((res) => {
            //  this.$vux.loading.hide();
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
#recharge {
  h3 {
    border-bottom: solid 1px #ccc;
    font-size: 18px;
    line-height: 40px;
    padding-top: 20px;
    clear: both;
  }
  .czlist {
    width: 100%;
    li {
      float: left;
      width: 250px;
      height: 50px;
      border: solid 1px #ccc;
      border-radius: 5px;
      margin: 10px 10px;
      text-align: center;
      cursor: default;
      img {
        width: 40px;
        padding-left: 5px;
      }
      a {
        line-height: 50px;
      }
    }
    .active {
      border: solid 1px red;
    }
  }
  .monList {
    li {
      float: left;
      width: 184px;
      height: 50px;
      border: solid 1px #ccc;
      border-radius: 5px;
      margin: 10px 10px;
      text-align: center;
      line-height: 50px;
    }
    .active1 {
      border: solid 1px red;
    }
  }
}
</style>
