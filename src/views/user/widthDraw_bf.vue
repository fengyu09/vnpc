<template>
  <div id="widthDraw">
    <div class="txhead">
      <div :class="{ active: mode }" @click="mode = 1"><span>提现</span></div>
      <!-- <div :class="{active:!mode}" @click="mode=0"> <span>交易记录</span> </div> -->
    </div>
    <div class="form-box-money" v-if="mode">
      <div class="from-content" style="width: 62%; margin-left: 14%">
        <!-- v-if="cardList.length" -->
        <el-form
          label-position="right"
          label-width="110px"
          :model="withdrawForm"
        >
          <!-- 解决密码自动填充 -->
          <input
            type="number"
            placeholder="请输入手机号"
            style="position: absolute; z-index: -9"
          />
          <input
            type="password"
            placeholder="请输入密码"
            style="position: absolute; z-index: -9"
          />
          <!-- 解决密码自动填充 -->
          <el-form-item label="提现金额:">
            <el-input
              ref="drawmoney"
              type="tel"
              v-model="drawMoney"
              @blur="checkMoney"
              placeholder="请输入提现金额"
            ></el-input>
            <div class="point">
              <span style="color: #ff1c30"
                ><i
                  class="el-icon-warning-outline"
                  v-show="moneymsg.length"
                ></i>
                {{ moneymsg }}</span
              >
            </div>
          </el-form-item>
          <el-form-item label="选择提现账户:">
            <el-select
              class="selectIpt"
              v-model="withdrawForm.cardnum"
              filterable
              @change="cardChange"
              placeholder=""
              ref="card"
              style="width: 100%; margin-bottom: 20px"
              v-if="cardList.length"
            >
              <el-option
                v-for="item in cardList"
                :key="item.card_num"
                :value="item.card_num"
              >
                <!-- :label="cardLable" :value="item.card_num" -->
                <div style="display: flex; align-items: center">
                  <img
                    :src="item.bank_img"
                    style="
                      width: 22px;
                      float: left;
                      margin-top: 0px;
                      margin-right: 10px;
                    "
                  />
                  <span style="float: left">{{ item.bank_name }}</span>
                  <span
                    style="margin-left: 110px; color: #8492a6; font-size: 13px"
                    >Số đuôi{{
                      item.card_num.substring(item.card_num.length - 4)
                    }}Thẻ tín dụng</span
                  >
                </div>
              </el-option>
            </el-select>
            <div
              class="cardinfo"
              style="
                display: flex;
                line-height: 20px;
                position: absolute;
                top: 12px;
                left: 20px;
              "
              v-if="cardList.length"
              @click="showselect"
            >
              <img :src="cardInfo.bank_img" alt="" width="40" height="40" />
              <div style="margin-left: 12px">
                <p>{{ cardInfo.bank_name }}</p>
                <p>
                  Số đuôi{{
                    cardInfo.card_num.substring(cardInfo.card_num.length - 4)
                  }}Thẻ tín dụng
                </p>
              </div>
            </div>
            <div class="addbtn" @click="showBind()">
              <img
                src="../../assets/imgaes/login/add-icon1.png"
                alt=""
                style="vertical-align: middle"
              />
              添加银行卡
            </div>
            <!-- <el-button type="primary" @click="$router.push('/addCard')" style="margin-top: 12px;">添加其他银行卡</el-button> -->
          </el-form-item>
          <el-form-item label="支付密码">
            <el-input
              ref="password"
              v-model="withdrawForm.password"
              maxlength="6"
              @keyup.native="codeverify"
              placeholder="Vui lòng nhập mã thanh toán"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="custom-btn"
          style="width: 76%; margin-left: 24%; border-radius: 20px"
          @click="draw"
          :loading="btnLoading"
          >提现</el-button
        >
        <!-- <el-button type="primary" style="width: 100%;margin-bottom: 36px;" @click="$router.push('/addCard')" v-else>Vui lòng cài thẻ ngân hàng</el-button> -->
      </div>
    </div>
    <el-dialog
      title="添加银行卡"
      center
      width="420px"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="margin-top: 10px">
        <el-form-item label="选择银卡">
          <el-select
            v-model="addcardForm.cardcode"
            placeholder="Mời chọn "
            style="width: 100%"
          >
            <el-option
              v-for="item in cardList2"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
              <div style="display: flex; align-items: center">
                <img
                  :src="item.img"
                  style="width: 22px; float: left; margin-right: 10px"
                />
                <span style="float: left">{{ item.name }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Thành phố mở thẻ">
          <el-cascader
            v-model="cityvalue"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            style="width: 100%"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="Chi nhánh mở thẻ">
          <el-input v-model="addcardForm.address" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Tên tài khoản">
          <el-input
            ref="realname"
            v-model="addcardForm.realname"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="Số thẻ ngân hàng">
          <el-input
            ref="cardnum"
            v-model="addcardForm.cardnum"
            maxlength="21"
            @keyup.native="cardverify"
          ></el-input>
        </el-form-item>
        <el-form-item label="支付密码">
          <el-input
            ref="password"
            v-model="addcardForm.password"
            maxlength="6"
            @keyup.native="codeverify2"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0 20px">
        <el-button
          class="custom-btn"
          @click="bind"
          :loading="btnLoading2"
          style="width: 100%; margin-bottom: 20px"
          >提 交</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import options from "./country-data.js";
import { alertServe, alertComfirm } from "../../assets/js/public.js";
export default {
  name: "widthDraw",
  data() {
    return {
      mode: 1,
      withdrawForm: {
        cardnum: "",
        password: "",
      },
      cardnum: "",
      drawMoney: "",
      cardList: [],
      cardLable: "",
      cardInfo: {},
      myMoney: "",
      lowmoney: "",
      highmoney: "",
      btnLoading: false,
      moneymsg: "",
      dialogFormVisible: false,
      addcardForm: {
        cardnum: "",
        password: "",
        province: "",
        city: "",
        address: "",
        realname: "",
        cardcode: "",
      },
      cityvalue: ["北京市", "市辖区"],
      options: [],
      btnLoading2: false,
      cardInfo2: {},
      cardList2: [],
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd"]),
  },
  watch: {
    drawMoney: function (n, v) {
      n = n + "";
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        return (this.drawMoney = n.slice(0, n.length - 1));
      }
      this.drawMoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
  },
  created() {
    let this_ = this;
    this.$http.get("/api2/index/check-fund-password").then((res) => {
      if (res && res.data.code == 1) {
        this.SETSAFEPWD(1);
      } else if (res && res.data.code == 10) {
        alertServe();
        this.SETSAFEPWD(10);
      } else if (res && res.data.code == 2) {
        alertComfirm({ msg: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?，Cài đặt ngay？" }, function () {
          this_.$router.push("/setting");
        });
        this.SETSAFEPWD(2);
      }
    });
    this.getuserCard();
    this.getuserMoney();
    this.$http.get("/api2/index/bank-list").then((res) => {
      if (res && res.data.code == 1) {
        this.cardList2 = res.data.data;
        this.addcardForm.cardcode = "CITIC";
      }
    });
    options[0].children.forEach((res) => {
      res.children.forEach((res2) => {
        delete res2.children;
      });
    });
    this.options = options[0].children;
  },
  methods: {
    ...mapMutations(["SETSAFEPWD", "SETBALANCE"]),
    getuserMoney() {
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.myMoney = res.data.data.balance;
          this.SETBALANCE(res.data.data.balance);
        } else if (res) {
          this.myMoney = "客观别急";
        }
      });
      this.$http
        .post(this.versionLive2 + "withdraws/depositlimit")
        .then((res) => {
          if (res && res.data.code == 1) {
            this.lowmoney = res.data.data.lowmoney;
            this.highmoney = res.data.data.highmoney;
          }
        });
    },
    draw() {
      if (this.safePwd == 10) {
        alertServe();
        return;
      }
      if (this.safePwd == 2) {
        let this_ = this;
        alertComfirm({ msg: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?，Cài đặt ngay？" }, function () {
          this_.$router.push("/setting");
        });
        return;
      }
      if (JSON.stringify(this.cardInfo) == "{}") {
        this.$message({
          message: "Vui lòng cài thẻ ngân hàng ",
          type: "warning",
          customClass: "drawMessage",
        });
        return;
      }
      if (this.drawMoney > this.myMoney) {
        // this.$message({
        // 	message: "可提现余额不足",
        // 	type: 'warning'
        // });
        this.moneymsg = "Số dư tiền mặt không đủ";
        this.$refs.drawmoney.focus();
        return;
      }
      if (this.drawMoney - 0 < this.lowmoney - 0) {
        // this.$message({
        // 	message: "提现金额不能小于" + this.lowmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = "最小提现金额" + this.lowmoney + "元";
        this.$refs.drawmoney.focus();
        return;
      }
      if (this.drawMoney > this.highmoney - 0) {
        // this.$message({
        // 	message: "提现金额不能大于" + this.highmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = "提现金额不能大于" + this.highmoney;
        this.$refs.drawmoney.focus();
        return;
      }
      this.moneymsg = "";
      if (this.withdrawForm.password == "") {
        this.$message({
          message: "请填写支付密码",
          type: "warning",
          customClass: "drawMessage",
        });
        this.$refs.password.focus();
        return;
      }
      this.btnLoading = true;
      this.$http
        .post("/api2/index/verify-fund-password", {
          password: this.withdrawForm.password,
        })
        .then((res) => {
          //console.log(res)
          if (res && res.data.code == 1) {
            this.$http
              .post(this.versionLive2 + "withdraws/UserDeposit/", {
                user_id: parseInt(this.userinfo.user_id),
                user_putforwoad: this.drawMoney,
                putforwoad_card: this.withdrawForm.cardnum,
                card_name: this.cardInfo.realname,
              })
              .then((res) => {
                //console.log(res)
                if (res.data.code == 1) {
                  this.$message({
                    message: "您的提现申请已提交",
                    type: "success",
                    customClass: "drawMessage",
                  });
                  this.myMoney = this.myMoney - this.drawMoney;
                  this.getuserMoney();
                  this.drawMoney = "";
                  this.withdrawForm.password = "";
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning",
                    customClass: "drawMessage",
                  });
                }
                this.btnLoading = false;
              });
          } else {
            if (res.data.code == 1002) {
              this.$message({
                message:
                  "支付密码错误,您还有" + res.data.data.remain_times + "次机会",
                type: "warning",
                customClass: "drawMessage",
              });
              this.$refs.password.focus();
            } else {
              this.$message({
                message: "支付密码错误次数过多,您的资金账户已冻结",
                type: "warning",
                customClass: "drawMessage",
              });
            }
            this.btnLoading = false;
            this.$refs.password.focus();
            return;
          }
        });
    },
    getuserCard() {
      this.$http.get("/api2/index/user-card-list").then((res) => {
        if (res && res.data.code == 1) {
          this.cardList = res.data.data;
          if (res.data.data.length) {
            this.cardInfo = res.data.data[0];
            this.withdrawForm.cardnum = res.data.data[0].card_num;
            this.cardLable =
              res.data.data[0].bank_name +
              "                                  Số đuôi" +
              res.data.data[0].card_num.substring(
                res.data.data[0].card_num.length - 4
              ) +
              "Thẻ tín dụng";
          }
        }
      });
    },
    cardChange(v) {
      // this.cardLable=res.data.data[0].bank_name+"                         Số đuôi"+res.data.data[0].card_num.substring(res.data.data[0].card_num.length-4)+"";
      let card = this.cardList.filter((res) => {
        return res.card_num == v;
      });
      this.cardLable =
        card[0].bank_name +
        "                                  Số đuôi" +
        card[0].card_num.substring(card[0].card_num.length - 4) +
        "Thẻ tín dụng";
      this.cardInfo = card[0];
    },
    codeverify(e) {
      this.withdrawForm.password = e.target.value.replace(/[^\d]/g, "");
    },
    checkMoney(e) {
      if (e.target.value > this.myMoney) {
        this.moneymsg = "Số dư tiền mặt không đủ";
        return;
      }
      if (e.target.value == "") {
        this.moneymsg = "最小提现金额" + this.lowmoney + "元";
      } else {
        if (e.target.value - 0 < this.lowmoney - 0) {
          this.moneymsg = "最小提现金额" + this.lowmoney + "元";
        } else {
          this.moneymsg = "";
        }
      }
    },
    showselect() {
      this.$refs.card.focus();
    },
    cardChange2(v) {
      // this.cardLable=res.data.data[0].bank_name+"                         Số đuôi"+res.data.data[0].card_num.substring(res.data.data[0].card_num.length-4)+"Thẻ tín dụng";
      let card = this.cardList2.filter((res) => {
        return res.card_num == v;
      });
      this.cardLable =
        card[0].bank_name +
        "                         Số đuôi" +
        card[0].card_num.substring(card[0].card_num.length - 4) +
        "Thẻ tín dụng";
      this.cardInfo2 = card[0];
    },
    codeverify2(e) {
      this.addcardForm.password = e.target.value.replace(/[^\d]/g, "");
    },
    cardverify(e) {
      this.addcardForm.cardnum = e.target.value.replace(/[^\d]/g, "");
    },
    showBind() {
      if (this.safePwd == 10) {
        alertServe();
        return;
      }
      if (this.safePwd == 2) {
        let this_ = this;
        alertComfirm({ msg: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?，Cài đặt ngay？" }, function () {
          this_.$router.push("/setting");
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    bind() {
      let reg = /^[\u4e00-\u9fa5]+$/;
      //console.log(this.cityvalue)
      if (!reg.test(this.addcardForm.realname)) {
        this.$message({
          message: "请输入正确的开户姓名",
          type: "warning",
        });
        this.$refs.realname.focus();
        return;
      }
      if (
        this.addcardForm.cardnum == "" ||
        !(
          this.addcardForm.cardnum.length < 22 &&
          this.addcardForm.cardnum.length >= 15
        )
      ) {
        this.$message({
          message: "银行卡格式错误",
          type: "warning",
        });
        this.$refs.cardnum.focus();
        return;
      }
      if (this.addcardForm.password == "") {
        this.$message({
          message: "请填写支付密码",
          type: "warning",
        });
        this.$refs.password.focus();
        return;
      }
      this.btnLoading2 = true;
      this.$http
        .post("/api2/index/verify-fund-password", {
          password: this.addcardForm.password,
        })
        .then((res) => {
          //console.log(res)
          if (res && res.data.code == 1) {
            this.$http
              .post("/api2/index/bind-card", {
                bank_code: this.addcardForm.cardcode,
                province: this.cityvalue[0],
                city: this.cityvalue[1],
                branch: this.addcardForm.address,
                realname: this.addcardForm.realname,
                card_num: this.addcardForm.cardnum,
                fund_password: this.addcardForm.password,
              })
              .then((res) => {
                if (res && res.data.code == 1) {
                  this.$message({
                    message: "银行卡绑定成功",
                    type: "success",
                  });
                  this.getuserCard();
                  this.dialogFormVisible = false;
                  this.addcardForm = {
                    cardnum: "",
                    password: "",
                    province: "",
                    city: "",
                    address: "",
                    realname: "",
                    cardcode: "CITIC",
                  };
                  this.cityvalue = ["北京市", "市辖区"];
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "warning",
                  });
                }
                this.btnLoading2 = false;
              });
          } else {
            if (res.data.code == 1002) {
              this.$message({
                message:
                  "支付密码错误,您还有" + res.data.data.remain_times + "次机会",
                type: "warning",
              });
              this.$refs.password.focus();
            } else {
              this.$message({
                message: "支付密码错误次数过多,您的资金账户已冻结",
                type: "warning",
              });
            }
            this.btnLoading2 = false;
            return;
          }
        })
        .catch((err) => {
          this.btnLoading2 = false;
        });
    },
    pageChange(e) {
      //console.log(e)
    },
  },
};
</script>

<style lang="less">
.drawMessage {
  top: 230px !important;
  left: 56%;
}
#widthDraw {
  .el-dialog--center .el-dialog__body {
    padding: 0 40px;

    .el-input__inner {
      border: none;
      background: #f5f5f5;
      height: 42px;
      padding-left: 88px;
    }

    .el-form-item {
      position: relative;
    }

    .el-form-item__label {
      position: absolute;
      z-index: 9;
      left: 10px;
      color: #111111;
    }
  }

  .custom-btn {
    border: none;
    background: #ff2235;
    height: 42px;
    color: #fff;
    font-size: 16px;
    border-radius: 20px;
  }

  .custom-btn:hover {
    background: #ff4752;
  }

  .form-box-money {
    margin: 0 auto;
    padding: 24px;

    width: 751.13px;
  }

  .record {
    margin-top: 24px;

    .el-table {
      .el-table__header-wrapper {
        tr th {
          background: rgba(247, 247, 247, 1);
        }
      }
    }
  }
}

.form-box-money {
  .from-content {
    margin-top: 24px;
  }

  .change {
    color: rgb(255, 81, 62);

    > div {
      padding: 8px 12px;
      cursor: pointer;
    }
  }

  .el-form-item {
    background: #fff;
    position: relative;

    .addbtn {
      height: 42px;
      background-color: #f5f5f5;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
    }

    .point {
      position: absolute;
      left: 348px;
      top: 0;
      width: 200px;
    }

    .selectIpt {
      .el-input__inner {
        border: none;
        background: #f5f5f5;
        height: 64px;
        color: #f5f5f5;
      }

      input::-webkit-input-placeholder,
      textarea::-webkit-input-placeholder {
        color: #f5f5f5;
      }

      input:-moz-placeholder,
      textarea:-moz-placeholder {
        color: #f5f5f5;
      }

      input::-moz-placeholder,
      textarea::-moz-placeholder {
        color: #f5f5f5;
      }

      input:-ms-input-placeholder,
      textarea:-ms-input-placeholder {
        color: #f5f5f5;
      }
    }
  }
}

.txhead {
  display: flex;
  border-bottom: 1px solid #f4f5f8;

  > div {
    height: 60px;
    line-height: 60px;
    color: #a7a7a7;
    font-size: 14px;
    position: relative;
    padding: 0 10px;
    margin-right: 18px;
    cursor: pointer;
    position: relative;
  }

  .active {
    color: #ff1c30;
    font-weight: bold;

    &:before {
      content: "";
      width: 75%;
      height: 4px;
      background: #ff1c30;
      position: absolute;
      bottom: -1px;
      border-radius: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
