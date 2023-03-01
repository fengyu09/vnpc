<template>
  <div id="convert">
    <h3>兑换</h3>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <label for="">Số dư：</label>
          <el-input v-model="amount" placeholder="Mời nhập nội dung"></el-input>
          <label for=""> 彩币：</label>

          <el-input
            v-model="cbmount"
            placeholder="Mời nhập nội dung"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-button
            type="danger"
            v-bind:class="[isHigh ? 'btnHigh' : 'active']"
            @click="changeDiamond"
            round
            >确认兑换</el-button
          >
        </div>
        <el-button type="text" @click="allChange">全部兑换</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "convert",
  computed: {
    ...mapState(["codeToken", "userinfo"]),
  },
  data() {
    return {
      czlist: [],
      amount: "0",
      cbmount: "",
      isHigh: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["SETPIC", "SETUSERNAME", "SETUSERINFO"]),
    init() {
      this.loadMoney();
    },
    loadMoney() {
      if (!this.codeToken) return;
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          //          this.amount = numberComma(res.data.data.balance) || '0';
          this.amount = res.data.data.balance || "0"; //显示出来的
          // this.defaultAmount = res.data.data.balance || "0"; //用于计算的
          //          this.amount = 9999.99;
          // this.amount =
          //   this.amount > 10000
          //     ? parseInt(this.amount / 1000) + "k"
          //     : this.amount;
        }
      });
    },
    allChange() {
      //0元不能
      if (this.amount == 0) {
        return (this.isHigh = false);
      }
      this.cbmount = parseInt(this.amount) + "";
    },
    async changeDiamond() {
      let res = await this.$http.post(
        this.versionLive2 + "user/exchange_diamond/",
        {
          user_id: this.userinfo.user_id,
          diamond: this.cbmount,
          password: 123456,
        }
      );
      // this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        // this.isSuccess = true;
        // //更新余额  更新钻石
        // this.zsMount = res.data.data.diamond;
        // this.zsMoney = '';
        // this.getVipNow(true);
        // this.money(true);
        // setTimeout(()=>{
        //   this.isSuccess = false;
        // },2000)
      }
    },
  },
};
</script>

<style scoped lang="less">
#convert {
  h3 {
    border-bottom: solid 1px #ccc;
    font-size: 18px;
    line-height: 40px;
    padding-top: 20px;
  }
  .btnHigh {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #ff3f30;
      color: #fff;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
  .active {
    width: 80%;
    margin: 0 auto;
    a {
      display: block;
      background: #f5f5f5;
      color: #dddddd;
      height: 3em;
      line-height: 3em;
      border-radius: 99px;
      margin-top: 15px;
      font-size: 1.3em;
    }
  }
}
</style>
