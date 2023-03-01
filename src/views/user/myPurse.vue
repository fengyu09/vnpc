<template>
  <div id="my-purse">
    <h3>
      <i></i>Ví tiền
      <button @click="hsMoney()" :disabled="isdisable2">
        <img
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
          class="icon"
          src="../../assets/imgaes/member/qbzh_01.png"
          alt=""
        />
        Thu hồi toàn bộ
      </button>
      <p class="hsTips" v-if="hsTipsIsShow">Chuyển số dư của nhà cái trò chơi vào ví trung tâm chỉ với một cú nhấp chuột</p>
    </h3>
    <div class="purse-box" v-loading="listLoading"  element-loading-text="loading"  element-loading-background="rgba(231, 236, 249, 0.88)">
      <div class="item-box clearfix">
        <button @click="refreshFun()">
          <img
            class="refresh"
            src="../../assets/imgaes/member/refresh.png"
            alt=""
          />
        </button>
        <div class="item fl" style="border-bottom:solid 1px #fff; border-right:solid 1px #fff">
          <span><img src="../../assets/imgaes/member/qb.png" style="position: relative;top: -2px;" alt=""> Trung tâm ví tiền  <i style="font-size:12px;color:#999">(1 vndk = 1000 vnd)</i></span>
          <span class="money" v-if="!isNaN(gameMoney['balanceMoney'])"
            ><i></i> {{gameMoney['balanceMoney']| returnFloat }}</span>
          <span class="money" v-else>loading...</span>
         
        </div>
        <div class="item fl" style="border-bottom:solid 1px #fff;">
          <span><img src="../../assets/imgaes/member/qb.png" style="position: relative;top: -2px;" alt="">Ví tiền game</span>
          <span
            class="money"
            v-if="
              !isNaN(gameMoney['agMoney']) &&
              !isNaN(gameMoney['allbetMoney']) &&
              !isNaN(gameMoney['cq9Money']) &&
              !isNaN(gameMoney['bbinMoney']) &&
              !isNaN(gameMoney['dgMoney']) &&
              !isNaN(gameMoney['mgMoney']) &&
              !isNaN(gameMoney['saMoney']) &&
              !isNaN(gameMoney['cmdMoney']) &&
              !isNaN(gameMoney['iboMoney']) &&
              !isNaN(gameMoney['sboMoney']) &&
              !isNaN(gameMoney['ebetMoney']) &&
              !isNaN(gameMoney['ezuMoney']) &&
              !isNaN(gameMoney['ibcMoney'])
              
            "
            ><i></i
            >{{
              gameMoney['agMoney'] | cgreturnFloat(gameMoney['allbetMoney'],
              gameMoney['cq9Money'],gameMoney['bbinMoney'],gameMoney['dgMoney'],gameMoney['mgMoney'],
              gameMoney['saMoney'],gameMoney['cmdMoney'],gameMoney['iboMoney'],gameMoney['sboMoney'],
              gameMoney['ebetMoney'],gameMoney['ibcMoney'],gameMoney['ezuMoney'])
            }}</span
          >
          <span class="money" v-else>loading...</span>
        </div>
      </div>
      <ul class="list clearfix" ref="gameList" >
        <li class="fl"  v-for="(item,index) in selectList"  v-if="item.name!='balance'" :key="index">
          <span>{{item.label}}</span>
          <span v-if="!gameMoney[item.name+'Wh']" class="money">{{ gameMoney[item.name+'Money'] | returnFloat }}</span
          ><span class="money" v-if="gameMoney[item.name+'Wh']">Đang bảo trì</span>
        </li>
       
      </ul>
      <div class="more-btn" @click="isMore = !isMore">
        <span v-if="!isMore">
          <img
            src="../../assets/imgaes/member/more_icon.png"
            alt=""
            srcset=""
          />
          </span
        >
        <span v-else>
          <img
          style="transform: rotate(180deg);"
            src="../../assets/imgaes/member/more_icon.png"
            alt=""
            srcset=""
          />
          </span
        >
      </div>
    </div>
    <h3>
      <i></i>Chuyển tiền
      <div style="float: right; display: flex; align-items: center">
        <span style="margin-right: 8px">Tự động chuyển vào</span>
        <div @click="changeSwitch()">
          <img
            v-show="active"
            src="../../assets/imgaes/active.png"
            alt=""
            srcset=""
          />
          <img
            v-show="!active"
            src="../../assets/imgaes/unActive.png"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </h3>
    <div class="transfer-box">
      <div class="item clearfix">
        <p class="tips"><strong>Chuyển khoản nhà cái</strong> <i style="padding-left:35px">Chuyển vào tài khoản</i></p>
        <div class="fl">
          <el-select
            @change="selectChanged1"
            v-model="value1"
            clearable
            placeholder="Mời chọn "
          >
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <img
          class="icon-arrow fl"
          src="../../assets/imgaes/member/arrow_r.png"
          alt=""
        />
        <div class="fl">
          <el-select
            @change="selectChanged2"
            v-model="value2"
            clearable
            placeholder="Mời chọn "
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="item">
        <p class="tips">
          <strong>Số tiền chuyển</strong></br><span :class="showPoint == true ? 'red' : ''">Note: Số tiền chuyển không được lớn hơn số dư tài khoản</span
          >
        </p>
        <div class="sum-input">
          <input
            class="sum"
            type="text"
            placeholder="Mời nhập số tiền chuyển"
            v-model="zzMoney"
          />
          <button class="all-btn" @click="allMoney" :disabled="isdisable">
            Tất cả các
          </button>
        </div>

        <button class="transfer-btn" @click="moveQb">Chuyển ngay</button>
        <p class="contact">
          
          Nếu bạn cần hỗ trợ, vui lòng <a :href="url" target="_bank"> liên hệ với bộ phận chăm sóc khách hàng</a>
        </p>
      </div>
    </div>

    <!-- 提示弹框-->
    <div class="ts-popup" v-if="isShow">
      <div class="ts-container">
        <div class="remove-btn" @click="isShow = false">
          <img src="../../assets/imgaes/member/icon-cancel.png" alt="" />
        </div>
        <div class="ts-content">
          <p v-if="isSuccess">
            <i class="success"></i>
            <span>Thành công！</span>
          </p>
          <p v-if="isWarning">
            <i class="warning"></i>
            <span>Thao tác nhiều lần, mời thử lại sau 10 giây！</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { alertComfirm } from "../../assets/js/public";
import { mapState, mapMutations } from "vuex";
let math = require("mathjs");
export default {
  data() {
    return {
      value1: "BALANCE",
      value2: "MG",
      selectList: [],
      options1: [],
      options2: [],
      url: localStorage.getItem("customer"),
      isShow: false, //弹窗
      isSuccess: false, //弹窗文字
      isWarning: false,
      zzMoney: "", //最少
      zcAccount: 1, //转出
      zrAccount: 2, //转入
      showPoint: false,
      isdisable: false,
      isdisable2: false,
      isRefresh: 0,
      hsTipsIsShow: false,
      active: false,
      zcpt: "balance",
      zrpt: "sbo",
      isChangeSwitch: true,
      isMore: false,
      gameMoney:{},
      listLoading:true,
    };
  },
  computed: {
    ...mapState(["openZdzz"]),
  },
  filters: {
    returnFloat(value) {
      if (isNaN(Number(value))) {
        return value;
      }
      var value =
        math.format(
          math.chain(math.bignumber(value)).multiply(math.bignumber(100)).done()
        ) / 100;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    cgreturnFloat(value1, value2, value3, value4, value5, value6, value7,value8,value9,value10,value11,value12,value13) {
      var value = math
        .chain(math.bignumber(value1))
        .add(math.bignumber(value2))
        .add(math.bignumber(value3))
        .add(math.bignumber(value4))
        .add(math.bignumber(value5))
        .add(math.bignumber(value6))
        .add(math.bignumber(value7))
        .add(math.bignumber(value8))
        .add(math.bignumber(value9))
        .add(math.bignumber(value10))
        .add(math.bignumber(value11))
        .add(math.bignumber(value12))
        .add(math.bignumber(value13))
        .done();
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
  },
  watch: {
    zzMoney: function (n, v) {
      n = n + "";
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        return (this.zzMoney = n.slice(0, n.length - 1));
      }
      this.zzMoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      if (this.zzMoney - 0 > this.gameMoney[this.zcpt+'Money'] - 0) {
          this.showPoint = true;
        } else {
          this.showPoint = false;
        }
    },
    isMore: function (i) {
      if (i) {
        this.$refs.gameList.style.height = "auto";
        setTimeout(() => {
          let num = parseInt(this.$refs.gameList.children.length / 4);
          [].slice.call(this.$refs.gameList.children).forEach((item, index) => {
            item.style.borderBottom = "1px solid";
            if (index + 1 > num * 4) {
              item.style.borderBottom = "none";
            }
            if ((index + 1) % 4 == 0) {
              item.style.borderRight = "none";
            } else {
              item.style.borderRight = "1px solid";
            }
          }, 200);
        });
      } else {
        this.$refs.gameList.style.height = "88px";
        [].slice.call(this.$refs.gameList.children).forEach((item, index) => {
          item.style.border = "none";
        }, 200);
      }
    },
    zcAccount: function (i) {
      this.zzMoney = "";
    },
  },
  created() {
    this.getGameList();
    this.autoChange();
  },
  mounted() {
    console.log(math);
    this.init();
  },
  methods: {
    ...mapMutations(["SETOPENZDZZ","SETBALANCE"]),
    init() {
    },
    refreshFun() {
      //刷新
      this.isRefresh = this.isRefresh + 1;
      this.listLoading=true
      if (this.isRefresh > 1) {
        this.isShow = true;
        this.isWarning = true;
        this.isSuccess = false;
        this.listLoading=false
      
      } else {
        this.getAllMoney()
      }
      setTimeout(() => {
        this.isRefresh = 0;
      }, 10000);
    },
    mouseOver() {
      // 移入
      this.hsTipsIsShow = true;
    },
    mouseLeave() {
      // 移出
      this.hsTipsIsShow = false;
    },
    
    selectChanged1(i) {
      //转出框
      this.zcAccount = i;
      this.zcpt = this.options1.find((res) => {
        return res.value == i;
      }).name;
      let newPickerarr = this.selectList.filter(function check(v) {
        return v.value != i;
      });
      this.options2 = newPickerarr;
      if (this.zcAccount == this.zrAccount) {
        this.zrAccount = this.options2[0].value;
        this.value2 = this.options2[0].label;
        this.zrpt = this.options2[0].name;
      }
    },
    selectChanged2(i) {
      //转入框
      //console.log(i)
      this.zrAccount = i;
      this.zrpt = this.options2.find((res) => {
        return res.value == i;
      }).name;
    },
    moveQb() {
      //立即转账按钮
      //console.log(this.zcAccount);
      if (this.showPoint) {
        return;
      }
      if (this.zzMoney < 1) {
        this.$message({
          message: "Vui lòng chuyển ít nhất 1",
          type: "warning",
        });
        return;
      }
      this.zzMoney = parseFloat(this.zzMoney);
      this.$message({
        message: "loading...",
        type: "warning",
      });
      let d = this.globalPpproach.checkIsEncrypt({
            out: this.zcpt,
            in: this.zrpt,
            amount: this.zzMoney,
          });
    this.$http
          .post("/api/vendor/transfer", d)
          .then((res) => {
            if (res && res.data.code == 1) {
              this.gameMoney[this.zcpt+'Money'] = math.format(
                math
                  .chain(math.bignumber(this.gameMoney[this.zcpt+'Money']))
                  .subtract(math.bignumber(this.zzMoney))
                  .done()
              );
              this.gameMoney[this.zrpt+'Money'] = math.format(
                math
                  .chain(math.bignumber(this.gameMoney[this.zrpt+'Money']))
                  .add(math.bignumber(this.zzMoney))
                  .done()
              );
              this.SETBALANCE(this.gameMoney['balanceMoney']-0)
              this.$forceUpdate()
              setTimeout(() => {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
              }, 2000);
              }
              else{
                 this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
            })
    },
    allMoney() {
      //全部按钮
      //console.log(this.zcAccount);

      this.isdisable = true;
      setTimeout(() => {
        this.isdisable = false;
      }, 2500); // 单位毫秒
      if (this.gameMoney[this.zcpt+'Money'] - 0 < 1)
          return this.$message({
            message: "Số tiền chuyển đi không được lớn hơn số dư tài khoản",
            type: "warning",
          });
        this.zzMoney =this.gameMoney[this.zcpt+'Money'];
    },
    async hsMoney() {
      //一键回收
      this.isdisable2 = true;
      setTimeout(() => {
        this.isdisable2 = false;
      }, 2500); // 单位毫秒
      this.$message({
        message: "loading...",
      });
      this.$http.post("/api/vendor/transferinall").then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.selectList.forEach(c=>{
            if(c.name!="balance"){
              this.gameMoney[c.name+'Money']=0;
            }
          })
          this.$http.get("/api/user/balance").then((res) => {
            if (res && res.data.code == 1) {
              this.gameMoney['balanceMoney']=res.data.data.balance - 0;
              this.SETBALANCE(this.gameMoney['balanceMoney']-0)
            }
            this.$forceUpdate();
          });
          this.$forceUpdate()
          setTimeout(() => {
            this.isShow = true;
            this.isSuccess = true;
            this.isWarning = false;
          }, 2500);
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      });
    },
    getGameList() {
      this.$http.get("/api/vendor/index").then((res) => {
        if (res && res.data.code == 1) {
          this.selectList[0] = { label: "BALANCE", name: "balance" };
          res.data.data.forEach((item, index) => {
            this.selectList.push({
              label: item.name,
              value: index + 1,
              name: item.code,
            });
          });
          this.options1 = this.selectList;
          this.getAllMoney()
          this.listLoading=false;
          this.options2 = this.selectList.slice(1);
          this.value2 = this.options2[0].label;
          this.zrpt = this.options2[0].name;
          // this.selectGame2=[this.selectGame1[0].slice(1)]
        }
      });
    },
    getAllMoney(){
       this.selectList.forEach(c=>{
         if(c.name=='balance'){
           this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.gameMoney[c.name+'Money']=res.data.data.balance - 0;
          this.listLoading=false
          this.SETBALANCE(this.gameMoney['balanceMoney']-0)
        }
        this.$forceUpdate();
      });
         }else{
           this.$http.get("/api/vendors."+c.name+"/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.gameMoney[c.name+'Money']=res.data.data.bl - 0;
          this.gameMoney[c.name+'Wh']=false;
        } else {
          this.gameMoney[c.name+'Wh']=true;
          this.gameMoney[c.name+'Money']=0;
        }
        this.$forceUpdate();
      });
         }
            // this.gameMoney[c.name+'Money']=0;
        })
    },
    changeSwitch() {
      if (!this.isChangeSwitch) {
        return;
      }
      this.isChangeSwitch = false;
      if (this.active) {
        this.$confirm("Có tắt chức năng chuyển tự động hay không!", "Nhắc nhở", {
          customClass: "zdzz-confirm",
          center: true,
          closeOnClickModal: false,
        })
          .then(() => {
            this.autoChange(1);
          })
          .catch(() => {
            this.isChangeSwitch = true;
          });
      } else {
        this.autoChange(1);
      }
    },

    autoChange(v) {
      if (v) {
        this.$http.post("/api/vendor/autotransfer").then((res) => {
          if (res && res.data.code == 1) {
            this.active = Boolean(Number(res.data.data));
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
          this.isChangeSwitch = true;
        });
      } else {
        this.$http.get("/api/vendor/autotransfer").then((res) => {
          if (res && res.data.code == 1) {
            this.active = Boolean(Number(res.data.data));
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
#my-purse {
  h3 {
    font-size: 18px;
    padding-top: 20px;
    color: #333333;
    border-bottom: solid 1px #f4f5f8;
    padding-bottom: 15px;
    position: relative;
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
    button {
      float: right;
      font-size: 14px;
      color: #1486ff;
      cursor: pointer;
      background: none;
      .icon {
        margin-right: 10px;
      }
    }
    .hsTips {
      font-weight: normal;
      font-size: 14px;
      color: #666;
      padding: 5px 10px;
      background: #f1f0f6;
      //background: rgba(0,0,0,0.2);
      position: absolute;
      right: 100px;
      top: 20px;
      z-index: 9;
    }
  }
  .purse-box {
    // width: 910px;
    width: 100%;
    // height: 240px;
    padding-bottom: 40px;
    background: #f1f5ff;
    border-radius: 10px;
    // background: url("../../assets/imgaes/member/purse_bg.png") no-repeat;
    // background-size: 100% 100%;
    margin-top: 10px;
    position: relative;
    .more-btn {
      position: absolute;
      bottom: 10px;
      left: 48%;
      font-size: 16px;
      color: #445779;
      img {
        width: 20px;
      }
      cursor: pointer;
    }
    .refresh {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
    .item-box {
      > div {
        width: 50%;
        font-size: 18px;
        color: #445779;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 20px;
        .money {
          display: block;
          font-weight: bold;
          line-height: 20px;
          padding-top: 11px;
          text-align: center;
          color: #1486ff;
          i {
            display: inline-block;
            width: 18px;
            height: 19px;
            background: url("../../assets/imgaes/member/icon_money.png")
              no-repeat left center;
            vertical-align: top;
            margin-right: 10px;
          }
        }
      }
    }
    .list {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      flex-direction: row;
      height: 88px;
      overflow: hidden;
      padding: 0px 24px;
      li {
        width: 25%;
        font-size: 18px;
        color: #445779;
        text-align: center;
        padding: 14px;
        border-color: #fff !important;
        .money {
          display: block;
          font-weight: bold;
          line-height: 20px;
          padding-top: 21px;
          text-align: center;
          color: #6a86b9;
        }
      }
    }
  }
  .transfer-box {
    .tips {
      font-size: 14px;
      color: #aaaaaa;
      padding-top: 19px;
      padding-bottom: 19px;
      strong {
        font-size: 16px;
        font-weight: bold;
        color: #343434;
        margin-right: 10px;
      }
      .red {
        color: #ff1c30;
      }
    }
    .item {
      .icon-arrow {
        margin: 7px 15px 0 20px;
      }
      .sum-input {
        .sum {
          width: 300px;
          height: 41px;
          line-height: 41px;
          font-size: 14px;
          background: #f5f5f5;
          border-radius: 4px;
          padding: 0 8px;
        }
        .all-btn {
          width: 69px;
          height: 40px;
          font-size: 14px;
          color: #fff;
          background: linear-gradient(90deg, #1486ff 0%, #4ba1ff 100%);
          border-radius: 4px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .transfer-btn {
      width: 389px;
      height: 59px;
      font-size: 18px;
      color: #fff;
      background: linear-gradient(90deg, #1486ff 0%, #4ba1ff 100%);
      border-radius: 4px;
      margin: 45px 0 19px;
      cursor: pointer;
    }
    .contact {
      font-size: 14px;
      color: #aaaaaa;
      a {
        color: #1486ff;
      }
    }
  }
  .ts-popup {
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .ts-container {
      position: relative;
      width: 323px;
      height: 165px;
      background: url("../../assets/imgaes/member/pup_bg.png") no-repeat;
      background-size: cover;
      margin: 20% auto 0;
      text-align: center;
      .remove-btn {
        width: 15px;
        height: 15px;
        position: absolute;
        right: -5px;
        top: -20px;
        z-index: 99;
        img {
          width: 100%;
        }
      }
      .ts-content {
        font-size: 18px;
        color: #343434;
        text-align: center;
        padding-top: 38px;
        i {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 auto 24px;
          &.success {
            background: url("../../assets/imgaes/member/icon_success.png")
              no-repeat;
          }
          &.warning {
            background: url("../../assets/imgaes/member/icon_warning.png")
              no-repeat;
          }
        }
      }
    }
  }
}
</style>