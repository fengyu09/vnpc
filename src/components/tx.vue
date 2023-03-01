<template>
  <div id="tx">
      <div class="pop-box zh-pop-box" v-show="showTx">
        <div class="pop-content">
          <h3>Rút <i class="remove-btn" @click="showParent()"></i></h3>
          <div class="content">
            <h5>Số tiền hiện có：{{$st.state.balance}}</h5>
            <div class="input-money">
              <p class="title">Số tiền rút：</p>
              <div class="input-box"><input type="tel" ref="drawmoney"
              maxlength="13"
              v-model="drawMoney"
              @blur="checkMoney"  placeholder="Vui lòng nhập số tiền rút"></div>
              <p class="error-tip">{{moneymsg}}</p>
             
            </div>

            
            <div class="input-money">
              <p class="title">Mật khẩu giao dịch：</p>
              <div class="input-box"><input type="tel" v-model="pwd" placeholder="Vui lòng nhập mã thanh toán"></div>
            </div>
            <p class="title">Nhận thẻ ngân hàng</p>
            <div class="add-bank">
              <div class="bank-item" v-for="(v,index) in cardList" :key="index" @click="cardChange(v)">
                <i v-if="index==0" class="mr-icon">vỡ nợ</i>
                <div class="bank-img fl"><img :src="v.bank_img" alt=""></div>
                <div class="bank-name fl">{{v.bank_name}}</div>
                <div class="clearfix"></div>
                <p><span>{{v.realname}}</span><span class="fr">{{v.card_num}}</span></p>
              </div>
              <div class="add-item" @click="showBind()">+Thêm thẻ ngân hàng</div>
            </div>
            <div class="submit-btn" >Rút</div>
          </div>
        </div>

      </div>

      <!-- 绑定银行卡弹框 -->
      <el-dialog
        title="Thêm thẻ ngân hàng"
        center
        width="420px"
        style="border-radius: 20px"
        :visible.sync="dialogFormVisible"
      >
        <el-form style="margin-top: 10px">
          <el-form-item label="Họ Tên:">
            <el-input
              ref="realname"
              v-model="addcardForm.realname"
              placeholder="Vui lòng điền tên chủ thẻ"
              type="text"
            ></el-input>
          </el-form-item>

          <el-form-item label="Tài khoản:" style="margin-bottom: 10px">
            <el-input
              ref="cardnum"
              placeholder="Mời nhập tài khoản của bạn"
              v-model="addcardForm.cardnum"
              @keyup.native="cardverify"
            ></el-input>
          </el-form-item>

          <div style="margin-bottom: 10px">
            <p style="color: #ff8f0c">
              <img
                src="../assets/imgaes/Vector.png"
                style="width: 15px"
                alt=""
              />
              Vui lòng xác minh tài khoản ngân hàng, thông tin tài khoản sai sẽ
              không chuyển được
            </p>
            <p style="color: #ff3e13">Tài khoản ngân hàng không được để trống</p>
          </div>

          <el-form-item label="Ngân hàng:">
            <el-select
              v-model="addcardForm.cardcode"
              placeholder="Mời chọn "
              style="width: 100%"
            >
              <el-option
                v-for="item in cardList2"
                :key="item.bank_id"
                :label="item.bank"
                :value="item.bank_id"
              >
                <div style="display: flex; align-items: center">
                
                  <span style="float: left">{{ item.bank }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Chi nhánh:">
            <el-input
              v-model="addcardForm.address"
              type="text"
              placeholder="Chi nhánh (công ty con của ngân hàng),  chẳng hạn như chi nhánh khu vực"
            ></el-input>
          </el-form-item>

          <el-form-item label="Mật mã giao dịch:">
            <el-input
              ref="password"
              v-model="addcardForm.password"
              maxlength="6"
              @keyup.native="codeverify2"
              type="password"
              placeholder="Mật mã rút tiền"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="padding: 0 20px">
          <el-button
            class="custom-btn"
            @click="bind"
            :loading="btnLoading2"
            style="width: 100%; margin-bottom: 20px"
            >Gửi đi</el-button
          >
        </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alertServe, alertComfirm } from "../assets/js/public.js";
export default {
  name: "tx",
  data() {
    return {
      txMoney:'',
      pwd:'',
      dialogFormVisible:false,
      addcardForm: {
        cardnum: "",
        password: "",
        province: "",
        city: "",
        address: "",
        realname: "",
        cardcode: "",
      },
      handDate: {}, //手续费
      isAllType: 2, //1全部，2部分
      cardList:[],//用户银行卡列表
      cardList2:[],//供用户绑定银行卡 银行卡列表
      btnLoading:false,
      btnLoading2:false,
      withdrawForm: {
        cardnum: "",
        password: "",
      },
      drawMoney: "",
      moneymsg:'',//金额错误提示
      isDescription:false,//费率说明
   
    };
  },
  watch:{
    drawMoney: function(n, v) {
      n = n + '';
      if (n.charAt(n.length - 1).indexOf('.') > -1 && v.indexOf('.') > -1) {
        return this.drawMoney = n.slice(0, n.length - 1);
      }
      this.drawMoney = n.replace(/[^\d.]/g, '').replace(/\.{2,}/g, ".").replace(/^[0,.]{1,}/g, '').replace(
        /^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
      let money = (this.drawMoney-0)+(Math.ceil((this.myMoney-0)*(this.handDate.service_fee-0))+(this.handDate.hand_fee-0))
      // console.log(money)
      // console.log(this.myMoney)
      if(this.drawMoney >= (this.myMoney-0) || money > (this.myMoney-0)  ){
        // console.log(999)
          this.isAllType = 2 ;
        this.moneymsg = "Số tiền rút không được lớn hơn số dư tài khoản";
      // this.$vux.toast.text('提现金额不能大于账户余额', 'middle')
      }else if(money == this.myMoney){
        this.moneymsg = "";
          this.isAllType = 1 ;
      }else{
        this.isAllType =2 ;
        this.moneymsg = "";
      }
    }
  },
   computed: {
    ...mapState(["userinfo", "safePwd"]),
  },
  props: {
    showTx: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.init();
  },

  methods:{
      ...mapMutations(["SETSAFEPWD", "SETBALANCE", "SETUSERUSERID"]),
      init(){
          let this_ = this;
          this.$http.get("/api/user/chkexistsfundpwd").then((res) => {
            if (res && res.data.code == 1) {
              this.SETSAFEPWD(1);
              this.getuserCard();
              this.getFee(); //费率
              this.getCardList();//供用户绑定银行卡 银行卡列表
            } else if (res && res.data.code == 10) {
              //用户异常
              alertServe();
              this.SETSAFEPWD(10);
              this.showParent();
            } else if (res && res.data.code == 2) {
              //未设置
              alertComfirm({ msg: "Bạn chưa đặt mật khẩu thanh toán. Bạn có muốn đặt mật khẩu này ngay bây giờ không?，Cài đặt ngay？" }, function () {
                this_.$router.push("/setting");
              });
              this.SETSAFEPWD(2);
              this.showParent();
            }
          });
          
      },
      getuserCard() {
        this.$http.get("/api/user/usercardlist").then((res) => {
          if (res && res.data.code == 1) {
            this.cardList =res.data.data;
          }
        });
      },
      getFee() {
        if (!this.$store.state.codeToken) return;
        this.$http
          .get(this.versionLive2 + "withdraws/user_deposit_fee/")
          .then((res) => {
            if (res && res.data.code == 1) {
              this.handDate = res.data.data || {};
            }
          });
      },
      getCardList(){
        this.$http.get("/api/v2/Recharge/get_vietnam_bank_list").then((res) => {
          if (res && res.data.code == 1) {
            this.cardList2 = res.data.data;
            this.addcardForm.cardcode = "Mời chọn ";
          }
        });
      },
      showParent() {
        this.$emit("childTxFn", false);
      },
      cardverify(e) {
        this.addcardForm.cardnum = e.target.value.replace(/[^\d]/g, "");
      },
      codeverify2(e) {
        this.addcardForm.password = e.target.value.replace(/[^\d]/g, "");
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
          this.showParent();
        });
        return;
      }
      this.dialogFormVisible = true;
      },
      cardChange(){

      },
      bind() {
      let reg = /^[\u4e00-\u9fa5]+$/;
      if (!this.addcardForm.realname) {
        this.$message({
          message: "Vui lòng nhập tên của chủ tài khoản",
          type: "warning",
        });
        this.$refs.realname.focus();
        return;
      }
      if (this.addcardForm.cardnum == "" ) {
        this.$message({
          message: "Vui lòng nhập thẻ ngân hàng06:01 PM",
          type: "warning",
        });
        this.$refs.cardnum.focus();
        return;
      }
      if (this.addcardForm.password == "") {
        this.$message({
          message: "Vui lòng nhập mã thanh toán ",
          type: "warning",
        });
        this.$refs.password.focus();
        return;
      }
      this.btnLoading2 = true;
      this.$http
        .get("/api/user/chkexistsfundpwd")
        .then((res) => {
          if (res && res.data.code == 1) {

            let d = this.globalPpproach.checkIsEncrypt({
              bank_id: this.addcardForm.cardcode,
              branch: this.addcardForm.address,
              realname: this.addcardForm.realname,
              card_num: this.addcardForm.cardnum,
              fund_password: this.addcardForm.password,
            });

            this.$http.post("/api/user/bindcard", d).then((res) => {
              if (res && res.data.code == 1) {
                this.$message({
                  message: res.data.msg,
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
                message: res.data.msg,
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
      checkMoney(e) {
        if (e.target.value-0 > (this.$st.state.balance-0)) {
          this.moneymsg = "Số dư tiền mặt không đủ";
          return;
        }

        if (e.target.value == "") {
          this.moneymsg = " Số tiền rút tối thiểu là " + this.lowmoney + this.$t('moneyDW');
        } else {
          if (e.target.value - 0 < this.lowmoney - 0) {
            this.moneymsg = " Số tiền rút tối thiểu là " + this.lowmoney + this.$t('moneyDW');
          } else {
            this.moneymsg = "";
          }
        }
    },
     draw() {
      let _drawMoney =
        Math.ceil(
          this.drawMoney - 0 + (Math.ceil( (this.drawMoney - 0) * (this.handDate.service_fee - 0) )  + (this.handDate.hand_fee - 0))
        );

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
      if (_drawMoney - 0 > (this.myMoney-0)) {
        this.moneymsg = "Số dư tiền mặt không đủ";
        this.$refs.drawmoney.focus();
        return;
      }
      if (this.drawMoney - 0 < this.lowmoney - 0) {
        // this.$message({
        // 	message: "提现金额不能小于" + this.lowmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = "Số tiền rút tối thiểu là " + this.lowmoney + this.$t('moneyDW');
        this.$refs.drawmoney.focus();
        return;
      }
      if (this.drawMoney > (this.highmoney - 0)) {
        // this.$message({
          // console.log(8888,this.highmoney)
        // 	message: "提现金额不能大于" + this.highmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = "Số tiền rút tối đa là " + this.highmoney + this.$t('moneyDW');
        this.$refs.drawmoney.focus();
        return;
      }
      this.moneymsg = "";
      if (this.withdrawForm.password == "") {
        this.$message({
          message: "Vui lòng nhập mã thanh toán ",
          type: "warning",
          customClass: "drawMessage",
        });
        this.$refs.password.focus();
        return;
      }
      this.btnLoading = true;
      let d = this.globalPpproach.checkIsEncrypt({
        password: this.withdrawForm.password,
      });
      this.$http.get("/api/user/chkexistsfundpwd", d).then((res) => {
        if (res && res.data.code == 1) {
          //console.log(this.withdrawForm.cardnum.card_num);
          let withdrawObj = {
            account:this.withdrawForm.cardnum.card_num || this.cardList[0].card_num,
            amount: this.drawMoney,
            pass: this.withdrawForm.password,
            type: this.txType || this.cardList[0].type,
            is_all: this.isAllType,
          };
          // console.log(withdrawObj);
          let d=this.globalPpproach.checkIsEncrypt(withdrawObj)
          this.$http
            .post("/api/v2/withdraws/depositBalance/", d)
            .then((res) => {
              // console.log(res)
              if (res.data.code == 1) {
                this.$message({
                  message: "Đơn rút tiền thành công,Chăm sóc khách hàng khách hàng đang xử lý",
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
                "Mật khẩu được nhập không chính xác,bạn vẫn còn ("+ res.data.data.remain_times +") lần nhập",
              type: "warning",
              customClass: "drawMessage",
            });
            this.$refs.password.focus();
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
              customClass: "drawMessage",
            });
          }
          this.btnLoading = false;
          this.$refs.password.focus();
          return;
        }
        // this.isAllType  = 2;
      });
    },
  }
};
</script>

<style lang="less" scoped>

// 弹框样式
.pop-box{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1000;
  .pop-content{
    background: #fff;
    overflow: hidden;
    position: relative;
    border-radius: 15px;
    width: 960px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .error-tip{
      font-size: 14px;
      color: red;
      padding-top: 5px;
    }
    .content{
      padding: 30px 50px;
      max-height: 500px;
    overflow-y: auto;
    }
    .select-pt{
      display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    }
    h5{
      font-size: 22px;
      margin-bottom: 30px;
    }
    h3{
      color: #fff;
      text-align: center;
      background: #1B74C8;
      height: 62px;
      line-height: 62px;
      padding: 0;
      font-size: 24px;
      i{
        position: absolute;
        background: url(../assets/imgaes/remove.png) no-repeat;
        width: 32px;
        height: 32px;
        background-size: contain;
        right: 10px;
        top: 15px;
        cursor: pointer;
      }
    }
    .input-money{
      margin-bottom: 30px;
    }
    .input-box{
      border: 1px solid #B2B2B2;
       border-radius: 4px;
       
       width: 60%;
      &.focus{
        border:1px solid #439CFF;
      }
      &.error{
        border:1px solid #F94D4D;
      }
      input{
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding: 0 15px;
      }
    }
    .title{
      font-size: 18px;
      color: #555;
      padding-bottom: 10px;
    }
    .tip{
      font-size: 12px;

    }
    .submit-btn{
      background: #439CFF;
      color: #fff;
      height: 50px;
      line-height: 50px;
      border-radius: 50px;
      // display: inline-block;
      margin: 30px auto 0;
      padding: 0 20px;
      font-size: 20px;
      width:220px;
      text-align: center;
      cursor: pointer;
    }
    .add-bank{
      overflow: hidden;
      >div{
        width: 250px;
        height: 102px;
        background: #ECF6FF;
        border: 1px solid #fff;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        float: left;
        margin-right: 10px;
        color: #1B74C8;
        font-size: 16px;
        margin-bottom: 20px;
      }
      .bank-item{
        position: relative;
        padding:15px;
        margin-bottom: 10px;
        .bank-img{
          width: 50px;
          margin-right: 10px;
          img{
            width: 100%;
          }
        }
        .bank-name{
          padding-top: 18px;
        }
        .mr-icon{
            position: absolute;
            width: 58px;
            height: 21px;
            line-height: 21px;
            color: #1B74C8;
            right: 0;
            top: 0;
            background: url(../assets/imgaes/mr.png) no-repeat;
            background-size: contain;
            text-align: center;
          }
        &.active,&:hover{
          border: 1px solid #1B74C8;
          &::before{
            content: '';
            position: absolute;
            width: 32px;
            height: 25px;
            right: 0;
            bottom: 0;
            background: url(../assets/imgaes/bankSelect.png) no-repeat;
            background-size: contain;
          }
        }
      }
      .add-item{
        text-align: center;
        line-height: 102px;
        border: 0.5px solid #1B74C8;
      }
    }
  }

}


#tx {
  .el-dialog {
    border-radius: 20px !important;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0 40px;

    .el-input__inner {
      border: none;
      background: #f5f5f5;
      height: 42px;
      padding-left: 88px;
      text-align: left !important;
      &:first-of-type,
      &:nth-child(2) {
        text-align: right;
      }
      &:nth-of-type(4) {
        padding-left: 130px;
      }
    }

    .el-form-item {
      margin-bottom: 0 !important;
      position: relative;
      &:nth-of-type(6) {
        .el-input {
          .el-input__inner {
            padding-left: 130px;
          }
        }
      }
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
    background: linear-gradient(0deg, #1486ff -79700%, #4ba1ff -73900%);
    height: 42px;
    color: #fff;
    font-size: 16px;
    border-radius: 20px;
  }

  .custom-btn:hover {
    background: linear-gradient(0deg, #1486ff -79700%, #4ba1ff -73900%);
  }


}
</style>
