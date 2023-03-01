<template>
  <div id="addCard">
    <div class="form-box">
      <h1>Cài đặt thẻ ngân hàng</h1>
      <div class="from-content">
        <el-form label-position="top" label-width="80px" :model="addcardForm">
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
          <el-form-item label="Loại thẻ ngân hàng">
            <el-select
              v-model="addcardForm.cardcode"
              placeholder="Mời chọn "
              style="width: 100%"
            >
              <el-option
                v-for="item in cardList"
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
              @change="handleChange"
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
              @keyup.native="codeverify"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          style="width: 100%"
          @click="draw"
          :loading="btnLoading"
          >Gửi</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import options from "./country-data.js";
export default {
  name: "addCard",
  data() {
    return {
      addcardForm: {
        cardnum: "",
        password: "",
        province: "",
        city: "",
        address: "",
        realname: "",
        cardcode: "",
      },
      cardList: [],
      cardLable: "",
      cardInfo: {},
      myMoney: "",
      lowmoney: "",
      highmoney: "",
      cityvalue: ["北京市", "市辖区"],
      options: [],
      btnLoading: false,
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd"]),
  },
  created() {
    this.$http.get("/api2/index/bank-list").then((res) => {
      if (res.data.code == 1) {
        this.cardList = res.data.data;
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
      this.btnLoading = true;
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
                if (res.data.code == 1) {
                   alertComfirm({
                      msg:'Thêm thẻ thành công!Rút tiền ngay bây giờ?',
                      title:'Success',
                      showCancelButton:true,
                    },()=>{
                      this.$router.push("widthDraw");
                    },()=>{});
                 
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
              message: "支付密码错误",
              type: "warning",
            });
            this.$refs.password.focus();
            return;
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
        "                         Số đuôi" +
        card[0].card_num.substring(card[0].card_num.length - 4) +
        "Thẻ tín dụng";
      this.cardInfo = card[0];
    },
    codeverify(e) {
      this.addcardForm.password = e.target.value.replace(/[^\d]/g, "");
    },
    cardverify(e) {
      this.addcardForm.cardnum = e.target.value.replace(/[^\d]/g, "");
    },
    handleChange(e) {
      // //console.log(e)
    },
  },
};
</script>

<style  lang="less">
</style>
