<template>
  <div id="excharge">
    <!--钻石兑换-->
    <div class="recharge-box pop-container" v-if="showEx">
      <div class="recharge-container">
        <div class="pop-container-title">兑换 <i class="remove-btn" @click="showParent"></i></div>
        <div class="recharge-content">
            <p class="clearfix">
              <span class="fl user-money">余额：<i>￥{{ amount }}</i></span>
              <span class="fr excharge-rate">兑换比例  1:10</span>
            </p>
           <div class="input-money">
              <i>兑换钻石：</i>
              <div class="pwd-input zs-input">
                   <input type="tel" v-model="zsMoney" maxlength="11" placeholder="请输入兑换金额">
                   <span @click="allChange">全部兑换</span>
              </div>
           </div>
            <div class="input-money">
                <i>支付密码：</i>
                <input type="password" v-model="payPwd" @keyup="codeverify" maxlength="6" class="pwd-input zfpwd-input" placeholder="Vui lòng nhập mã thanh toán">
            </div>
           <!--<div class="excharge-btn" :class="isHigh?'active':''" @click="changeDiamond">兑换</div>-->
           <el-button class="custom-btn excharge-btn" style="width: 100%;" @click="changeDiamond" :loading="btnLoading">兑换</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { alertServe } from '../assets/js/public'
export default {
  name: 'excharge',
  data(){
    return {
      zsMoney:'',
      payPwd:'',
      amount:'',
      isHigh:false,
      btnLoading:false
    }
  },
  props:{
    showEx:{
      type:Boolean,
      default:false
    },
  },
  watch:{
    zsMoney: function(n, o) {
      if (n) {
        this.$nextTick(() => {
          this.zsMoney = n.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
      let num = this.zsMoney.substring(0, 1);
      // //console.log(num)
      if (Number(this.zsMoney) > Number(this.amount) || num == 0) {
          this.isHigh = false;
      } else {
        if(this.payPwd.length==6) this.isHigh = true;
        else this.isHigh = false;
      }
    },
  },
  created(){
     if(this.$store.state.userinfo.user_id>0){
        this.loadMoney();          
     }
    
  },
  methods:{
    ...mapMutations([
      "SETBALANCE",
      "SETDIAMOND"
    ]),
    loadMoney() {
      this.$http.get("/api/user/balance").then(res => {
        if (res && res.data.code == 1) {
          this.amount = res.data.data.balance || "0"; //显示出来的
          this.SETBALANCE(this.amount);
        }
      });
    },
    async changeDiamond() {
      if(!Number(this.amount)){
        this.$message({
          message: '余额不足',
          type: 'warning',
        })
        return
      }
      if(!Number(this.zsMoney)) {
        this.$message({
          message: '请输入兑换金额',
          type: 'warning',
        })
        return
      }
      if(Number(this.zsMoney) > Number(this.amount) ){
        this.$message({
          message: '余额不足',
          type: 'warning',
        })
        return
      }
      if(!this.payPwd){
        this.$message({
          message: 'Vui lòng nhập mã thanh toán',
          type: 'warning',
        })
        return
      }
      if(this.payPwd.length!=6){
        this.$message({
          message: '支付密码为6位数字',
          type: 'warning',
        })
        return
      }
      this.btnLoading=true
      let res = await this.$http.post(this.versionLive2+"user/exchange_diamond/", {
        user_id: JSON.parse(localStorage.getItem('userinfo')).id,
        diamond: this.zsMoney,
        password: this.payPwd
      });
      this.btnLoading=false;
      if (res && res.data.code == 1) {
        //更新余额  更新钻石
        this.SETDIAMOND(res.data.data.diamond)
        this.loadMoney();
        this.showParent();
        this.payPwd = '';
        this.$message({
          message: res.data.msg,
          type: 'success',
          offset:400,
          duration:2000
        })
      }else if(res && res.data.code==0){
        this.$message({
          message: res.data.msg,
          type: 'warning',
        })
      }else if(res && res.data.code == 10){
        this.showParent();
        alertServe();
      }
    },
    //全部兑换
    allChange() {
      //0元不能
      if (this.amount == 0) {
        return (this.isHigh = false);
      }
      this.zsMoney = parseInt(this.amount) + "";
    },
    reset(){
      this.zsMoney = ''
    },
    showParent(){
      this.reset();
      this.$emit('childExFn', false);
    },
    codeverify(e) {
      this.payPwd = e.target.value.replace(/[^\d]/g, '')
    },
  }
}
</script>

<style scoped lang="less">
  .pop-container{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2000;
    background: rgba(0,0,0,.5);
    .recharge-container{
      overflow: hidden;
      .order-sending{
        width: 820px;
        height: 700px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 10;
      }
      width: 666px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 17px;
      .pop-container-title{
        color: #fff;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        background: url("../assets/imgaes/recharge_title_bg.png") no-repeat;
        background-size: cover;
        .remove-btn{
          position: absolute;
          right: 21px;
          top: 20px;
          width: 16px;
          height: 16px;
          cursor: pointer;
          background: url("../assets/imgaes/remove-btn.png") no-repeat;
        }
      }
      .recharge-content{
        padding: 60px 160px;
        .user-money{
          font-size: 16px;
          i{
            font-size: 20px;
            font-weight: bold;
          }
        }
        .excharge-rate{
          font-size: 14px;
          color: #999;
        }
        .input-money{
          height: 42px;
          line-height: 42px;
          margin: 30px 0 ;
          font-size: 14px;
          .pwd-input{
              display: inline-block;
              background: #f5f5f5;
              border-radius: 4px;
              height: 42px;
              line-height: 42px;
              margin-left: 2px;
          }
         .zs-input{
            width: 274px;
          }
          .zfpwd-input{width: 274px}
          input{
            background: none;
            padding:0 10px;
            font-size: 14px;
          }
          span{
            color: #FF3F30;
            float: right;
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .excharge-btn{
          // background: #FF1C30;
          background: linear-gradient(0deg, #1486FF 0%, #4BA1FF 100%);
          color: #fff;
          font-size: 16px;
          text-align: center;
          /*line-height: 42px;*/
          height: 42px;
            border: none;
          cursor: pointer;
          border-radius: 20px;
          &.active{
            background: #FF1C30!important;
            color: #fff;
          }
        }
      }

    }
    .type-loading-tip{
      line-height: 42px;
      color: #FF1C30;
    }
  }
</style>
