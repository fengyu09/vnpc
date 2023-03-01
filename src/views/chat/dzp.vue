<template>
  <div class="dzp-container">
    <!-- 购买次数 -->
    <div class="buy-time" v-if="isBuy">
      <div class="bug-time-content">
        <div class="remove-btn" @click="removeBtn()"></div>
        <p class="buy-tip">购买抽奖次数</p>
        <p class="buy-num">购买数量</p>
        <div class="total-zs">{{ buyTime * 20 }}<i></i></div>
        <div class="input-box">
          <div
            class="cut-btn"
            :class="buyTime == 0 ? '' : 'active'"
            @click="changeTime(0)"
          ></div>
          <input type="tel" v-model="buyTime" maxlength="9" />
          <div
            class="add-btn"
            :class="buyTime >= 999999999 ? 'active' : ''"
            @click="changeTime(1)"
          ></div>
        </div>
        <div class="bug-btn" @click="toBuy">Xác nhận</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dzph",
  data() {
    return {
      isBuy: true,
      buyTime: 1,
      timeLeft: "", //当前次数
    };
  },
  watch: {
    buyTime: function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();

          this.buyTime = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
    },
  },
  methods: {
    changeTime(f) {
      if (f) {
        if (this.buyTime >= 999999999) {
          this.buyTime = 999999999;
          // this.$vux.toast.text('');
        } else this.buyTime++;
      } else {
        if (this.buyTime < 1) this.buyTime = 0;
        else this.buyTime--;
      }
    },
    async toBuy() {
      if (this.buyTime < 1)
        return this.$message({
          message: "至少购买一次",
          type: "warning",
        });
      let res = await this.$http.post("/api/v2/user/get_turntable_chance/", {
        times: this.buyTime,
      });
      if (res && res.data.code == 1) {
        this.buyTime = 1;
        this.timeLeft = res.data.data.times_now;
        this.isBuy = false;
      }
      this.$message({
        message: res.data.msg,
        type: "warning",
      });
    },
    removeBtn() {
      this.isBuy = false;
    },
  },
};
</script>

<style scoped lang="less">
.dzp-container {
  // 购买弹框
  .buy-time {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2222;
    .bug-time-content {
      width: 600px;
      height: 385px;
      position: absolute;
      background: #fff;
      border-radius: 5px;
      padding: 30px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      .remove-btn {
        width: 16px;
        height: 16px;
        background: url("../../assets/imgaes/hmlz-icon2.png");
        background-size: contain;
        position: absolute;
        top: 29px;
        right: 31px;
      }
      .buy-tip {
        text-align: center;
        font-size: 24px;
        color: #222221;
        font-weight: bold;
        padding-bottom: 45px;
      }
      .buy-num {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        text-align: left;
        padding-left: 29px;
        margin-bottom: 24px;
      }
      .input-box {
        text-align: center;
        height: 60px;
        input {
          display: inline-block;
          width: 183px;
          height: 60px;
          line-height: 60px;
          font-size: 18px;
          border-radius: 10px;
          border: 1px solid #ddd;
          margin: 0 20px;
          text-align: center;
          vertical-align: top;
        }
        .add-btn {
          width: 35px;
          height: 35px;
          display: inline-block;
          background: url("../../assets/imgaes/seli_button_6_6.png");
          background-size: contain;
          margin-top: 13px;
          &.active {
            background: url("../../assets/imgaes/seli_button_6_62.png");
          }
        }
        .cut-btn {
          width: 35px;
          height: 35px;
          display: inline-block;
          background: url("../../assets/imgaes/dis_button_6_6.png");
          background-size: contain;
          margin-top: 13px;
          &.active {
            background: url("../../assets/imgaes/dis_button_6_62.png");
          }
        }
      }
      .total-zs {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
        i {
          display: inline-block;
          width: 18px;
          height: 16px;
          background: url("../../assets/imgaes/chat/zuanshi-min.png") no-repeat;
          background-size: contain;
          margin-left: 10px;
        }
      }
      .bug-btn {
        background: linear-gradient(90deg, #ff3634, #ff7f66);
        font-size: 18px;
        color: #fff;
        text-align: center;
        width: 406px;
        height: 60px;
        line-height: 60px;
        border-radius: 30px;
        margin: 45px auto 0;
      }
    }
  }
  //大转盘
}
</style>