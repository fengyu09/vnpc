<template>
  <div id="widthDraw">
    <div class="txhead">
      <div :class="[{ active: mode },{'pink-active':skin==1 &&mode},{'blue-active':skin==2&&mode},{'green-active':skin==3&&mode}]" @click="mode = 1">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('widthDraw.text[0]')}}</span>
      </div>
    </div>
    <div class="form-box-money" v-if="mode" :style="lanCode==2||lanCode==5?'width:800px':''">
      <div class="curr-ls" :style="lanCode==5?'width:360;margin-left:180px':''">
        <p>{{$t("widthDraw.ls[0]")}} : {{userMoneyObj.total_flow}}</p>
        <p>{{$t("widthDraw.ls[1]")}} : {{userMoneyObj.current_flow}}</p>
        <!-- <p>{{$t("widthDraw.ls[2]")}} : {{userMoneyObj.free_flow}}</p> -->
      </div>
      <div class="from-content" style="width: 72%;">
        <!-- v-if="cardList.length" -->
        <el-form
          label-position="right"
          :labelWidth="lanCode==2||lanCode==5?'180px':'160px'"
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
          <el-form-item :label="$t('widthDraw.inputTitle[0]')+':'">
            <el-input
              ref="drawmoney"
              type="tel"
              v-model="drawMoney"
              @blur="checkMoney"
              maxlength="13"
              :placeholder="$t('widthDraw.pla[0]')"
            ></el-input>
            <div class="point" :style="lanCode==2||lanCode==5?'left: 365px;':''">
              <span style="color: #ff1c30"
                ><i
                  class="el-icon-warning-outline"
                  v-show="moneymsg.length"
                ></i>
                {{ moneymsg }}</span
              >
            </div>
            <div class="service-description" v-if="this.drawMoney >= 1">
              <!-- <p>（实际扣除：<font class="red">{{((drawMoney-0)+(drawMoney-0)*0.006+2).toFixed(2)}}</font>，手续费：<font class="red">{{(2+drawMoney*0.006).toFixed(2)}}</font> ）<img  @click="toggleDescription" src="../../assets/imgaes/virtual/wh.png" alt=""> </p>	
								<div class="service" v-if="isDescription">
									<p>固定费用：<font class="red">{{handDate.hand_fee}}元</font></p>
									<p>转账手续费：<font class="red">{{(drawMoney*0.006).toFixed(2)}}元（费率{{(handDate.service_fee-0)*100}}%）</font></p>	
									<p>服务费共计: <font class="red">{{(2+drawMoney*0.006).toFixed(2)}}元</font></p>	
								</div> -->
              <p> 
                （{{$t('widthDraw.fee[0]')}} ：<font class="red">{{
                  Math.ceil((drawMoney - 0) +(handDate.hand_fee - 0) +(Math.ceil((drawMoney - 0) * (handDate.service_fee - 0)) )) 
                }}</font>， {{$t('widthDraw.fee[1]')}} ：
                <font class="red">{{ 
                  ((drawMoney - 0) * (handDate.service_fee - 0) ) +(handDate.hand_fee - 0) 
                }}</font>
                ）<img
                  @click="toggleDescription"
                  src="../../assets/imgaes/virtual/wh.png"
                  alt=""
                />
              </p>
              <div class="service" v-if="isDescription">
                <p>
                  {{$t('widthDraw.fee[2]')}}：<font class="red">{{ handDate.hand_fee }} {{$t('moneyDw')}}</font>
                </p>
                <p>
                  {{$t('widthDraw.fee[3]')}}：<font class="red"
                    >{{
                      Math.ceil(
                        (drawMoney - 0) * (handDate.service_fee - 0)
                      ) 
                    }} {{$t('moneyDw')}}（{{$t('widthDraw.fee[4]')}} {{ (handDate.service_fee - 0) * 100 }} %）</font
                  >
                </p>
                <p>
                  {{$t('widthDraw.fee[5]')}}:
                  <font class="red"
                    >{{
                      ((drawMoney - 0) * (handDate.service_fee - 0))+ (handDate.hand_fee - 0)
                    }} {{$t('moneyDw')}}</font
                  >
                </p>
              </div>
            </div>
          </el-form-item>
          <el-form-item :label="$t('widthDraw.inputTitle[1]')+':'">
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
              <!-- <el-option v-for="item in cardList" :key="item.card_num" :value="item.card_num"> -->
              <el-option
                v-for="item in cardList"
                :key="item.card_num"
                :value="item"
              >
                <!-- :label="cardLable" :value="item.card_num" -->
                <div style="display: flex; align-items: center">
                  <!-- <img v-if="item.type == 'CNY' && item.id == cardID" :src="item.bank_img" style="width: 22px;float: left;margin-top: 0px;margin-right: 10px;" />
									<img v-if="item.type == 'CNY' && item.id != cardID" :src="item.bank_img2" style="width: 22px;float: left;margin-top: 0px;margin-right: 10px;" />
									<img v-if="item.type == 'USDT' && item.id == cardID" :src="item.bank_img" style="width: 22px;float: left;margin-top: 0px;margin-right: 10px;" />
									<img v-if="item.type == 'USDT' && item.id != cardID" :src="item.bank_img2" style="width: 22px;float: left;margin-top: 0px;margin-right: 10px;" /> -->
                  <img
                    :src="
                      type1 == item.type && item.id == cardID
                        ? item.bank_img
                        : item.bank_img
                    "
                    style="
                      width: 22px;
                      float: left;
                      margin-top: 0px;
                      margin-right: 10px;
                    "
                  />
                  <span
                    style="float: left"
                    :style="
                      type1 == item.type && item.id == cardID
                        ? 'color:#ff1c30'
                        : 'color:#999'
                    "
                    >{{ item.bank_name }}</span
                  >
                  <span
                    v-if="item.type == 'CNY'"
                    style="margin-left: 110px; color: #8492a6; font-size: 13px"
                    >{{
                      item.realname
                    }}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('widthDraw.inputTitle[3]')}}{{
                      item.card_num.substring(item.card_num.length - 4)
                    }}{{$t('widthDraw.inputTitle[4]')}}</span
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
                <p v-if="cardInfo.type == 'USDT'" style="padding-top: 10px">
                  {{ cardInfo.bank_name }}
                </p>
                <p v-if="cardInfo.type == 'CNY'">{{ cardInfo.bank_name }}</p>
                <p v-if="cardInfo.type == 'CNY'">
                  {{ cardInfo.realname }}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('widthDraw.inputTitle[3]')}}{{
                    cardInfo.card_num.substring(cardInfo.card_num.length - 4)
                  }}{{$t('widthDraw.inputTitle[4]')}}
                </p>
              </div>
            </div>
            <div class="addbtn" @click="showBind()">
              <i class="add-icon"></i>
             
              {{$t('widthDraw.text[1]')}}
            </div>
            
          </el-form-item>
          <el-form-item :label="$t('widthDraw.inputTitle[1]')+':'">
            <el-input
              ref="password"
              v-model="withdrawForm.password"
              maxlength="6"
              @keyup.native="codeverify"
              :placeholder="$t('widthDraw.pla[1]')"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <p
          style="color: #ff4434; margin-left: 25%; margin-bottom: 15px"
          v-show="txType == 2"
        >
          *Đối với các lần rút tiền dưới 15,000 k, vui lòng sử dụng giao thức blockchainTRC20
        </p>
        <p style="color: #ff4434; margin-left: 25%; margin-bottom: 15px">
          * {{$t('widthDraw.text[2]')}}
        </p>
        <el-button
          class="custom-btn"
          style="width: 76%; margin-left: 24%; border-radius: 20px"
          @click="draw"
          :loading="btnLoading"
          :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"
          >{{$t('widthDraw.text[3]')}}</el-button
        >
        <p style="text-align: center; padding-top: 10px; padding-left: 105px">
          {{$t('widthDraw.text[4]')}}
        </p>
       
      </div>
    </div>
    <el-dialog
      :title="$t('widthDraw.text[1]')"
      center
      width="420px"
      style="border-radius: 20px"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="margin-top: 10px">
        <el-form-item :label="$t('widthDraw.addCard.inputTitle[0]')+':'">
          <el-input
            ref="realname"
            v-model="addcardForm.realname"
            :placeholder="$t('widthDraw.addCard.pla[0]')"
            type="text"
            
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('widthDraw.addCard.inputTitle[1]')+':'" style="margin-bottom: 10px">
          <el-input
            ref="cardnum"
           :placeholder="$t('widthDraw.addCard.pla[1]')"
            v-model="addcardForm.cardnum"
            @keyup.native="cardverify"
            :class="lanCode==2||lanCode==5?'cardStyle':''"
          ></el-input>
        </el-form-item>

        <div style="margin-bottom: 10px">
          <p style="color: #ff8f0c">
            <img
              src="../../assets/imgaes/Vector.png"
              style="width: 15px"
              alt=""
            />
           {{$t('widthDraw.addCard.text[1]')}}
          </p>
          <p style="color: #ff3e13">{{$t('widthDraw.addCard.text[2]')}}</p>
        </div>

        <el-form-item :label="$t('widthDraw.addCard.inputTitle[2]')+':'">
          <el-select
            v-model="addcardForm.cardcode"
            :placeholder="$t('widthDraw.addCard.pla[2]')"
            style="width: 100%"
          >
            <el-option
              v-for="item in cardList2"
              :key="item.bank_id"
              :label="item.bank"
              :value="item.bank_id"
            >
              <div style="display: flex; align-items: center">
                <!-- <img :src="item.img" style="width: 22px;float: left;margin-right: 10px;" /> -->
                <span style="float: left">{{ item.bank }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="Thành phố mở tài khoản">
					<el-cascader v-model="cityvalue" :options="options" :props="{ expandTrigger: 'hover' }" style="width: 100%;">
					</el-cascader>
				</el-form-item> -->
        <el-form-item :label="$t('widthDraw.addCard.inputTitle[3]')+':'">
          <el-input
            v-model="addcardForm.address"
            type="text"
            :placeholder="$t('widthDraw.addCard.pla[3]')"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('widthDraw.addCard.inputTitle[4]')+':'">
          <el-input
            ref="password"
            v-model="addcardForm.password"
            maxlength="6"
            @keyup.native="codeverify2"
            type="password"
            :placeholder="$t('widthDraw.addCard.pla[4]')"
             :class="lanCode==2||lanCode==5?'pwdStyle':''"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0 20px">
        <el-button
          class="custom-btn"
          @click="bind"
          :loading="btnLoading2"
          style="width: 100%; margin-bottom: 20px"
          :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"
          >{{$t('widthDraw.addCard.text[3]')}}</el-button
        >
      </div>
    </el-dialog>
    <div class="virtual-wallet pop-container" v-if="virtualWallet">
      <div class="virtual-container">
        <div class="pop-container-title">
          Thêm địa chỉ ví tiền ảo<i
            class="remove-btn"
            @click="
              virtualWallet = false;
              virtualForm.virtualCurrId = 1;
            "
          ></i>
        </div>
        <div class="virtual-content">
          <el-form style="margin-top: 10px">
            <el-form-item class="input-item">
              <i>Tên địa chỉ：</i>
              <el-input
                v-model="virtualForm.name"
                type="text"
                placeholder="Phân biệt địa chỉ tiền ảo dưới tên của bạn"
              ></el-input>
            </el-form-item>
            <el-form-item class="input-item">
              <i>Địa chỉ ví tiền：</i>
              <el-input
                v-model="virtualForm.address"
                type="text"
                placeholder="Vui lòng nhập địa chỉ ví"
              ></el-input>
            </el-form-item>
            <div class="input-item virtual-item">
              <i>Định dạng tiền ảo：</i>
              <div class="virtual-xy">
                <span
                  :class="{ active: virtualForm.virtualCurrId == v }"
                  v-for="(v, index) in xyArr"
                  :key="index"
                  @click="selectWallet(v)"
                  >{{ v }}</span
                >
                <!-- <span :class="{active:virtualForm.virtualCurrId == 'ECR20'}"  @click="selectWallet('ECR20')">ECR20</span>
								<span :class="{active:virtualForm.virtualCurrId == 'OMNI'}"   @click="selectWallet('OMNI')">OMNI</span> -->
              </div>
            </div>
            <!-- <el-form-item class="input-item">
              <i>Số điện thoại：</i>
              <el-input
                v-model="virtualForm.phone"
                @keyup.native="virtualPhoneverify"
                maxlength="11"
                type="tel"
                placeholder="Vui lòng nhập số điện thoại chính xác"
              ></el-input>
            </el-form-item>
            <el-form-item class="input-item">
              <i>Mã xác nhận：</i>
              <el-input
                class="code-input"
                ref="code"
                v-model="virtualForm.code"
                maxlength="4"
                @keyup.native="virtualCodeverify"
                placeholder="lấy mã xác minh"
              ></el-input>
              <el-button
                class="code-btn"
                type="danger"
                plain
                :disabled="isSend"
                style="
                  position: absolute;
                  right: 40px;
                  border: none;
                  width: 127px;
                  padding: 12px 5px;
                  text-align: center;
                "
                @click="sendcode"
              >
                {{ btnText }}
              </el-button>
            </el-form-item> -->
            <el-form-item class="input-item">
              <i>Mật mã giao dịch：</i>
              <el-input
                v-model="virtualForm.pass"
                type="tel"
                onkeyup="value=value.replace(/[^\d]/g,'')"
                :placeholder="$t('widthDraw.addCard.pla[4]')"
              ></el-input>
            </el-form-item>
            <el-button
              class="custom-btn excharge-btn"
              @click="setVrWallet"
              :loading="virtualBtnLoading"
              :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"
              >{{$t('widthDraw.addCard.text[3]')}}</el-button
            >
          </el-form>
        </div>
      </div>
    </div>

    <!-- 未绑定手机或邮箱提示 -->
    <div class="pop-box" v-if="isBindTel">
      <div class="no-bind-phoneEmail">
        <div class="remove-btn" @click="isBindTel=false"></div>
        <div class="tip-icon"></div>
        <p>{{$t('widthDraw.text[5]')}}!</p>
        <div class="go-bind-btn" @click="$router.push('/userInfor')" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('widthDraw.text[6]')}}</div>
      </div>
    </div>

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
      isBindTel:false,
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
      vrwalletList: [], // 虚拟钱包列表
      virtualWallet: false,
      virtualForm: {
        virtualCurrId: "TCR20",
        name: "", //虚拟地址名
        address: "", //虚拟钱包地址
        phone: "",
        pass: "",
      },
      isDescription: false,
      btnText: "lấy mã xác minh",
      isSend: false,
      virtualBtnLoading: false,
      txType: 1,
      type2: "",
      handDate: {}, //手续费
      isAllType: 2, //1全部，2部分
      cardID: "",
      xyArr: [],
      type1: "CNY",
      userMoneyObj:{},
    };
  },
  computed: {
    ...mapState(["userinfo", "safePwd","skin","lanCode"]),
  },
  watch: {
    // drawMoney: function (n, v) {
    //   n = n + "";
    //   if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
    //     return (this.drawMoney = n.slice(0, n.length - 1));
    //   }
    //   this.drawMoney = n
    //     .replace(/[^\d.]/g, "")
    //     .replace(/\.{2,}/g, ".")
    //     .replace(/^[0,.]{1,}/g, "")
    //     .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    //   let money =
    //     this.drawMoney -
    //     0 +
    //     (Math.ceil((this.myMoney - 0) * (this.handDate.service_fee - 0) * 100) /
    //       100 +
    //       (this.handDate.hand_fee - 0));
    //   // console.log(money)
    //   if (this.drawMoney >= this.myMoney || money > this.myMoney) {
    //     this.isAllType = 2;
    //     this.moneymsg = "Số tiền rút không được lớn hơn số dư tài khoản";
    //     // this.$vux.toast.text('Số tiền rút không được lớn hơn số dư tài khoản', 'middle')
    //   } else if (money == this.myMoney) {
    //     this.isAllType = 1;
    //   } else {
    //     this.isAllType = 2;
    //   }
    // },
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
					this.moneymsg = this.$t('widthDraw.errorText[5]');
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
  created() {
    let this_ = this;
    this.$http.get("/api/user/chkexistsfundpwd").then((res) => {
      if (res && res.data.code == 1) {
        this.SETSAFEPWD(1);
      } else if (res && res.data.code == 10) {
        alertServe();
        this.SETSAFEPWD(10);
      } else if (res && res.data.code == 2) {
        alertComfirm({ msg: this.$t('widthDraw.popTip[0]') }, function () {
          this_.$router.push("/setting");
        });
        this.SETSAFEPWD(2);
      }
    });
    this.getuserCard();
    this.getuserMoney();
    this.getXy();
    this.$http.get("/api/v2/Recharge/get_vietnam_bank_list").then((res) => {
      if (res && res.data.code == 1) {
        // this.cardList2.push({ label:'请选择',key:''});
        this.cardList2 = res.data.data;
        this.addcardForm.cardcode = this.$t('widthDraw.addCard.pla[2]');
      }
    });
    options[0].children.forEach((res) => {
      res.children.forEach((res2) => {
        delete res2.children;
      });
    });
    this.options = options[0].children;

    this.getFee(); //费率
  },
  methods: {
    ...mapMutations(["SETSAFEPWD", "SETBALANCE", "SETUSERUSERID"]),
    async getXy() {
      let res = await this.$http.get(
        this.versionLive2 + "Recharge/get_protocol_list"
      );
      if (res.data.code == 1) this.xyArr = res.data.data || [];
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
    getuserMoney() {
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.myMoney = res.data.data.balance;
          console.log(res.data.data);
          this.userMoneyObj = res.data.data;
          this.SETBALANCE(res.data.data.balance);
        } else if (res) {
          this.myMoney = "loading...";
        }
      });
      this.$http
        .post(this.versionLive2 + "withdraws/depositlimit")
        .then((res) => {
          if (res && res.data.code == 1) {
            this.lowmoney = res.data.data.lowmoney;
            this.highmoney = res.data.data.highmoney;
            // console.log(this.highmoney)
          }
        });
    },
    draw() {
      // let _drawMoney = this.drawMoney-0+(this.drawMoney*0.006+2);
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
        alertComfirm({ msg: this.$t('widthDraw.popTip[0]') }, function () {
          this_.$router.push("/setting");
        });
        return;
      }
      if (JSON.stringify(this.cardInfo) == "{}") {
        this.$message({
          message: this.$t('widthDraw.warnText[0]'),
          type: "warning",
          customClass: "drawMessage",
        });
        return;
      }
      // if (this.drawMoney-0 > this.myMoney) {
      if (_drawMoney - 0 > (this.myMoney-0)) {
        // this.$message({
        // 	message: "可提现余额不足",
        // 	type: 'warning'
        // });
        this.moneymsg = this.$t('widthDraw.errorText[0]');
        this.$refs.drawmoney.focus();
        return;
      }
      // if (this.drawMoney-0 < this.lowmoney - 0) {
      if (this.drawMoney - 0 < this.lowmoney - 0) {
        // this.$message({
        // 	message: "提现金额不能小于" + this.lowmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = this.$t('widthDraw.errorText[1]') + this.lowmoney + this.$t('moneyDw');
        this.$refs.drawmoney.focus();
        return;
      }
      // if (this.drawMoney > this.highmoney - 0) {
      if (this.drawMoney > (this.highmoney - 0)) {
        // this.$message({
          // console.log(8888,this.highmoney)
        // 	message: "提现金额不能大于" + this.highmoney,
        // 	type: 'warning'
        // });
        this.moneymsg = this.$t('widthDraw.errorText[2]') + this.highmoney + this.$t('moneyDw');
        this.$refs.drawmoney.focus();
        return;
      }
      this.moneymsg = "";
      if (this.withdrawForm.password == "") {
        this.$message({
          message: this.$t('widthDraw.warnText[1]'),
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
                  message: this.$t('widthDraw.warnText[2]'),
                  type: "success",
                  customClass: "drawMessage",
                });
                this.myMoney = this.myMoney - this.drawMoney;
                this.getuserMoney();
                this.drawMoney = "";
                this.withdrawForm.password = "";
              }else if(res.data.code==15){
                this.isBindTel = true;
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
                this.$t('widthDraw.errorText[3]')+" ("+ res.data.data.remain_times +")"+this.$t('widthDraw.errorText[4]'),
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
    getuserCard() {
      this.$http.get("/api/user/usercardlist").then((res) => {
        if (res && res.data.code == 1) {
          //this.cardList = res.data.data
          //console.log( this.cardList)
          let _data = res.data.data;
          this.cardList = _data.map((i) => {
            this.$set(i, "type", "CNY");
            return i;
          });
          // console.log(this.cardList);
          // this.getVrwalletList();
          if (res.data.data.length) {
            this.cardInfo = res.data.data[0];
            this.withdrawForm.cardnum = res.data.data[0].card_num;
            this.cardID = this.cardInfo.id;
            this.type1 = this.cardInfo.type;
            if (this.type1 == "USDT") {
              this.txType = 2;
            } else {
              this.txType = 1;
            }
            // console.log(this.txType);
            this.cardLable =
              res.data.data[0].bank_name +
              this.$t('widthDraw.inputTitle[3]') +
              res.data.data[0].card_num.substring(
                res.data.data[0].card_num.length - 4
              ) +
              this.$t('widthDraw.inputTitle[4]');
          }
        }
      });
    },
    cardChange(v) {
     

      this.type1 = v.type;
      this.cardID = v.id;
      if (v.type == "USDT") {
        this.txType = 2;
      } else {
        this.txType = 1;
      }
      // console.log(this.txType);
      let card = this.cardList.filter((res) => {
        return res.card_num == v.card_num;
      });
      this.cardLable =
        card[0].bank_name +
        this.$t('widthDraw.inputTitle[3]')+
        card[0].card_num.substring(card[0].card_num.length - 4) +
        this.$t('widthDraw.inputTitle[4]');
      this.cardInfo = card[0];
    },
    codeverify(e) {
      this.withdrawForm.password = e.target.value.replace(/[^\d]/g, "");
    },
    checkMoney(e) {
      if (e.target.value-0 > (this.myMoney-0)) {
        this.moneymsg = this.$t('widthDraw.errorText[0]');
        return;
      }

      if (e.target.value == "") {
        this.moneymsg = this.$t('widthDraw.errorText[1]') + this.lowmoney + this.$t('moneyDw');
      } else {
        if (e.target.value - 0 < this.lowmoney - 0) {
          this.moneymsg = this.$t('widthDraw.errorText[1]') + this.lowmoney + this.$t('moneyDw');
        } else {
          this.moneymsg = "";
        }
      }
    },
    showselect() {
      this.$refs.card.focus();
    },
    cardChange2(v) {
     
      this.cardID = v.id;
      let card = this.cardList2.filter((res) => {
        return res.card_num == v;
      });
      this.cardLable =
        card[0].bank_name +
        this.$t('widthDraw.inputTitle[3]') +
        card[0].card_num.substring(card[0].card_num.length - 4) +
        this.$t('widthDraw.inputTitle[4]');
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
        alertComfirm({ msg: this.$t('widthDraw.popTip[0]') }, function () {
          this_.$router.push("/setting");
        });
        return;
      }
      this.dialogFormVisible = true;
    },
    bind() {
      let reg = /^[\u4e00-\u9fa5]+$/;
      //console.log(this.cityvalue)
      // if (!reg.test(this.addcardForm.realname)) {
      //   this.$message({
      //     message: "请输入正确的开户姓名",
      //     type: "warning",
      //   });
      //   this.$refs.realname.focus();
      //   return;
      // }
      if (!this.addcardForm.realname) {
        this.$message({
          message: this.$t('widthDraw.addCard.warnText[0]'),
          type: "warning",
        });
        this.$refs.realname.focus();
        return;
      }
      // if (
      //   this.addcardForm.cardnum == "" ||
      //   !(
      //     this.addcardForm.cardnum.length < 22 &&
      //     this.addcardForm.cardnum.length >= 15
      //   )
      // ) {
      //   this.$message({
      //     message: "银行卡格式错误",
      //     type: "warning",
      //   });
      //   this.$refs.cardnum.focus();
      //   return;
      // }
      if (this.addcardForm.cardnum == "" ) {
        this.$message({
          message: this.$t('widthDraw.addCard.warnText[1]'),
          type: "warning",
        });
        this.$refs.cardnum.focus();
        return;
      }
      if (this.addcardForm.password == "") {
        this.$message({
          message: this.$t('widthDraw.warnText[1]'),
          type: "warning",
        });
        this.$refs.password.focus();
        return;
      }
      this.btnLoading2 = true;
      this.$http
        .get("/api/user/chkexistsfundpwd")
        .then((res) => {
          // console.log(res);
          if (res && res.data.code == 1) {
            let d = this.globalPpproach.checkIsEncrypt({
              bank_id: this.addcardForm.cardcode,
              // province: this.cityvalue[0],
              // city: this.cityvalue[1],
              branch: this.addcardForm.address,
              realname: this.addcardForm.realname,
              card_num: this.addcardForm.cardnum,
              fund_password: this.addcardForm.password,
            });
            // console.log({
            //   bank_id: this.addcardForm.cardcode,
            //   // province: this.cityvalue[0],
            //   // city: this.cityvalue[1],
            //   branch: this.addcardForm.address,
            //   realname: this.addcardForm.realname,
            //   card_num: this.addcardForm.cardnum,
            //   fund_password: this.addcardForm.password,
            // });
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
    pageChange(e) {
      //console.log(e)
    },
    toggleDescription: function name(params) {
      this.isDescription = !this.isDescription; //取反
    },
    showvirtualWalle() {
      this.virtualWallet = true;
    },
    selectWallet(name) {
      //虚拟币协议
      this.virtualForm.virtualCurrId = name;
    },
    getVrwalletList() {
      //获取虚拟钱包列表
      let _this = this;
      this.$http.get("/api/v2/Recharge/get_vrwallet_list").then((res) => {
        if (res && res.data.code == 1) {
          // console.log(res);
          let usdList = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let _data = {};
            _data.card_num = res.data.data[i].id + "";
            _data.bank_name = res.data.data[i].name;
            // _data.bank_img =require('../../assets/imgaes/virtual/xnb.png')
            _data.bank_img = res.data.data[i].bank_img;
            _data.bank_img2 = res.data.data[i].bank_img2;
            _data.province = res.data.data[i].address;
            _data.bank_id = res.data.data[i].id;
            _data.id = res.data.data[i].id;
            _data.city = " ";
            _data.realname = " ";
            _data.type = "USDT";
            usdList.push(_data);
          }
          if (_this.cardList.length == 0 && usdList[0].type == "USDT") {
            this.cardInfo = usdList[0];
            // console.log(this.cardInfo);
            this.withdrawForm.cardnum = usdList[0].card_num;
            this.cardLable = usdList[0].bank_name;
            this.cardID = usdList[0].id;
            this.type1 = usdList[0].type;
            this.txType = 2;
          }
          _this.cardList = [..._this.cardList, ...usdList];
        }
      });
    },
    setVrWallet() {
      //设置虚拟钱包地址
      // console.log({
      //   name: this.virtualForm.name,
      //   protocol: this.virtualForm.virtualCurrId,
      //   address: this.virtualForm.address,
      //   //phone:this.virtualForm.phone,
      //   pass: this.virtualForm.code,
      // });
      let d = this.globalPpproach.checkIsEncrypt({
        name: this.virtualForm.name,
        protocol: this.virtualForm.virtualCurrId,
        address: this.virtualForm.address,
        //phone:this.virtualForm.phone,
        pass: this.virtualForm.pass,
      });

      this.btnLoading2 = true
      this.$http.post("/api/v2/Recharge/set_vr_wallet", d).then((res) => {
        // console.log(res);
        this.btnLoading2 = false;
        if (res && res.data.code == 1) {
          // console.log(res);
          this.virtualWallet = false;
          this.$router.go(0);
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            offset: 0,
          });
        }
      }).catch(err=>{
        this.btnLoading2 = false;
      });
    },
    sendcode() {
      let d = this.globalPpproach.checkIsEncrypt();
      this.$http
        .post("/api/sms/send", {
          mobile: this.virtualForm.phone.replace(/\s*/g, ""),
          event: "bindusdt",
        })
        .then((res1) => {
          if (res1.data.code == 1) {
            this.$message({
              message: "验证码已发送",
              type: "success",
            });
            //console.log(res1.data.data)
            let time = res1.data.data.second;
            this.isSend = true;
            var codeTimer = setInterval(() => {
              this.btnText = "Gửi lại(" + time-- + ")";
              if (!time) {
                this.isSend = false;
                clearInterval(codeTimer);
                this.btnText = "Gửi lại";
              }
            }, 1000);
          } else {
            this.$message({
              message: res1.data.msg,
              type: "warning",
            });
          }
        });
    },
    // sendcode() {
    // 	if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.virtualForm.phone)) {
    // 		this.$http.get('api/user/checkrule', {
    // 			params: this.virtualForm.phone
    // 		}).then(res => {
    // 			console.log(res);
    // 			if (res.data.code == 1005) {
    // 				// let d = this.globalPpproach.checkIsEncrypt( {
    // 				// 	phone: this.virtualForm.phone,
    // 				// 	type: "bind_usdt",
    // 				// 	user_id: parseInt(this.userinfo.user_id),
    // 				// })
    // 				let d = this.globalPpproach.checkIsEncrypt( {
    // 					mobile: this.virtualForm.phone,
    // 					event: "bindusdt",
    // 				})
    // 				this.$http.post("/api/sms/send",d).then(res1 => {
    // 					if (res1.data.code == 1) {
    // 						this.$message({
    // 							message: "验证码已发送",
    // 							type: 'success'
    // 						});
    // 						//console.log(res1.data.data)
    // 						let time = res1.data.data.second;
    // 						this.isSend = true;
    // 						var codeTimer = setInterval(() => {
    // 							this.btnText = "Gửi lại(" + time-- + ")";
    // 							if (!time) {
    // 								this.isSend = false;
    // 								clearInterval(codeTimer);
    // 								this.btnText = "Gửi lại";
    // 							}
    // 						}, 1000);
    // 					} else {
    // 						this.$message({
    // 							message: res1.data.msg,
    // 							type: 'warning'
    // 						});
    // 					}
    // 				})
    // 			} else {
    // 				this.$message({
    // 					message: "手机号还未注册",
    // 					type: 'warning'
    // 				});
    // 			}
    // 		})
    // 	} else {
    // 		this.$message({
    // 			message: "手机号码格式错误",
    // 			type: 'warning'
    // 		});
    // 	}
    // },
    virtualPhoneverify(e) {
      this.virtualForm.phone = e.target.value.replace(/[^\d]/g, "");
    },
    virtualCodeverify(e) {
      this.virtualForm.code = e.target.value.replace(/[^\d]/g, "");
    },
  },
};
</script>

<style lang="less">
.pop-box{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
  z-index: 1001;
  .no-bind-phoneEmail{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 6px;
    padding: 20px;
    font-size: 16px;
    text-align: center;
    width: 355px;
    .remove-btn{
      position: absolute;
      right: 10px;
      top: 10px;
      background: url(../../assets/imgaes/member/x.png) no-repeat;
      background-size: contain;
      width: 15px;
      height:15px;
      cursor: pointer;

    }
    .tip-icon{
      display: inline-block;
      width: 55px;
      height: 55px;
      background: url(../../assets/imgaes/member/tip.png) no-repeat;
      background-size: contain;
    }
    p{
      padding: 25px 0;
    }
    .go-bind-btn{
      display: inline-block;
      background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
      border-radius: 66px;
      color: #fff;
      text-align: center;
      width: 160px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
    }
  }
}
.drawMessage {
  top: 230px !important;
  left: 56%;
}
#widthDraw {
  .cardStyle{
    
    .el-input__inner{
      padding-left: 120px !important;
    }
  }
  .pwdStyle{
    .el-input__inner{
      padding-left: 155px !important;
    }
  }
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

  .form-box-money {
    margin: 0 auto;
    padding: 24px;

    width: 751.13px;
    .curr-ls{
      
      background: #f2ece5;
      width: 350px;
      border-radius: 5px;
      padding: 20px 30px;
      display: inline-block;
      margin-left: 160px;
      p{
        font-size: 16px;
        color: #7e765d;
        line-height: 25px;
      }
    }
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
      .add-icon{
        display:inline-block;
        width: 25px;
        height:25px;
        background:url('../../assets/imgaes/usercenter.png')no-repeat;
        background-size: 600px 600px;
        background-position: -270px -478px;
        vertical-align: middle;
      }
    }

    .point {
      position: absolute;
      left: 348px;
      top: 0;
      width: 315px;
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
    color: #1486ff;
    font-weight: bold;

    &:before {
      content: "";
      width: 75%;
      height: 4px;
      background: #1486ff;
      position: absolute;
      bottom: -1px;
      border-radius: 4px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.pop-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
  .virtual-container {
    overflow: hidden;
    width: 820px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    .pop-container-title {
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      background: url("../../assets/imgaes/recharge_title_bg.png") no-repeat;
      background-size: cover;
      .remove-btn {
        position: absolute;
        right: 21px;
        top: 20px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background: url("../../assets/imgaes/remove-btn.png") no-repeat;
      }
    }
    .virtual-content {
      padding: 60px 100px 60px 100px;
      .input-item {
        height: 42px;
        line-height: 42px;
        margin: 10px 0;
        &.virtual-item {
          height: 52px;
          i {
            line-height: 52px;
          }
        }
        i {
          width: 200px;
          font-size: 18px;
          color: #333;
          text-align: right;
          float: left;
        }
        .el-input {
          width: 378px;
          height: 42px;
          font-size: 16px;
          border-radius: 4px;
          input {
            background: #f5f5f5;
          }
          &.code-input {
            width: 240px;
          }
        }
        .code-btn {
          width: 120px;
          height: 40px;
          font-size: 16px;
          color: #fff;
          background: linear-gradient(
            0deg,
            #1486ff -79700%,
            #4ba1ff -73900%
          ) !important;
          cursor: pointer;
          margin-left: 10px;
        }
        .virtual-xy {
          span {
            float: left;
            width: 120px;
            height: 52px;
            line-height: 52px;
            font-size: 18px;
            color: #666;
            text-align: center;
            background: url("../../assets/imgaes/member/weixuan.png");
            margin-bottom: 10px;
            margin-right: 10px;
            cursor: pointer;
            &.active {
              background: url("../../assets/imgaes/member/xuanzhong.png");
            }
          }
        }
      }
      .excharge-btn {
        width: 111px;
        background: linear-gradient(0deg, #1486ff -79700%, #4ba1ff -73900%);
        color: #fff;
        font-size: 18px;
        text-align: center;
        height: 42px;
        border: none;
        cursor: pointer;
        border-radius: 20px;
        float: right;
        margin-top: 93px;
        margin-bottom: 40px;
        .custom-btn:hover {
          background: linear-gradient(0deg, #1486ff -79700%, #4ba1ff -73900%);
        }
      }
    }
  }

  .type-loading-tip {
    line-height: 42px;
    color: #ff1c30;
  }
}

.service-description {
  font-size: 14px;
  color: #6e6e6e;
  position: relative;
  .red {
    color: #ff5251;
  }
  .service {
    width: 247px;
    height: 170px;
    background: #fff;
    border-radius: 10px;
    padding-top: 15px;
    padding-left: 25px;
    position: absolute;
    left: 120px;
    top: 35px;
    z-index: 1;
    &::before {
      content: "";
      width: 247px;
      height: 9px;
      background: url(../../assets/imgaes/virtual/fw_bg.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      line-height: 35px;
    }
  }
}
</style>
