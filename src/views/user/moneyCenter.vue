<template>
  <div class="moneyCenter">
      <div class="recharge-box">
        <p>{{$t('moneyCenter.text[0]')}}（{{$t('moneyDw')}}）</p>
        <span class="money">≈ {{$st.state.balance}}</span>
        <div class="go-control">
          <div class="recharge-btn" @click="goRecharge(1)">{{$t('moneyCenter.text[1]')}}</div>
          <div class="tx-btn" :class="[{'pink-bg-jb':skin==1},{'blue-bg-jb':skin==2},{'green-bg-jb':skin==3}]" @click="$router.push('/widthDraw')">{{$t('moneyCenter.text[2]')}}</div>
        </div>
      </div>
      <div class="sf-wallet">
        <h3>{{$t('moneyCenter.text[3]')}}
        <div style="float: right; display: flex; align-items: center">
          <span class="tranfer-tip"> <i></i>
            {{$t('moneyCenter.text[14]')}}</span>
          <span style="margin-right: 8px;font-size:14px">{{$t('moneyCenter.text[4]')}}</span>
          <div @click="changeSwitch()" class="checked-icon" :class="[{'pink-change':skin==1},{'blue-change':skin==2},{'green-change':skin==3}]">
            <span v-show="active" class="i-icon"></span>
            <span v-show="!active" class="i-icon1"></span>
           
          </div>
        </div>
        </h3>
        <div class="curr-money-detail">
          <div class="center-wallet-money">
            <h5>{{$t('moneyCenter.text[5]')}}</h5>
            <span>{{$t('moneyDw')}} {{$st.state.balance}}</span>
          </div>
          <div class="sf-wallert-money">
            <h5>{{$t('moneyCenter.text[6]')}}</h5>
            <span>
               <span class="money"><i>{{vendor_bl}}</i> {{$t('moneyDw')}} </span>
           
            </span>
          </div>
        </div>
        <div class="sf-list">
          <p v-if="!singleVenderMoney.length">loading...</p>
          <ul>
            <li class="clearfix" :class="[{'rightActive':isActive==2},{'leftActive':isActive==1},{'active':isActiveShow==index}]" v-for="(item,index) in singleVenderMoney" :key="index">
              <div class="fl">
                 <span>{{ item.name }}</span>
                  <p v-if="!isNaN(item.balance)">{{item.balance}} {{$t('moneyDw')}}</p>
                  <p v-else>{{item.balance}}</p>
              </div>
              <div class="fr">
                <div class="go-control">
                  <div class="recharge-btn" @click="changeMoney(0,item.name,item.nameTransfer,index)" :class="active?'gray-btn':''">{{$t('moneyCenter.text[7]')}}</div>
                  <div class="tx-btn"  @click="changeMoney(1,item.name,item.nameTransfer,index)" :class="[{'gray-btn':active},{'pink-bg-jb':skin==1&&!active},{'blue-bg-jb':skin==2&&!active},{'green-bg-jb':skin==3&&!active}]">{{$t('moneyCenter.text[8]')}}</div>
                </div>
              </div>
              <!-- 提示 -->
              <div class="no-transfer-tip">{{('moneyCenter.text[15]')}}</div>
            </li>
            
  
           
          </ul>
        </div>
      </div>
      <!-- 转换弹框 -->
      <div class="pop-box zh-pop-box" v-if="isZH">
        <div class="pop-content">
          <h3 :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('moneyCenter.text[9]')}}  <i class="remove-btn" @click="isZH=false"></i></h3>
          <div class="content">
            <!-- 平台互转 -->
            <div class="select-pt">
                <el-select
            @change="selectChanged1"
            v-model="value1"
            clearable
            :placeholder="$t('moneyCenter.text[10]') "
          >
            <el-option
            
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <img src="../../assets/imgaes/Vector (2).png" alt="" srcset="">
          <el-select
            @change="selectChanged2"
            v-model="value2"
            clearable
            :placeholder="$t('moneyCenter.text[10]') "
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
            </div>
            <div class="input-money">
              <p class="title">{{$t('moneyCenter.text[11]') }}：</p>
              <span class="tip" :style="{color:showPoint?'red':''}">{{$t('moneyCenter.text[12]') }}</span>
              <div class="input-box"><input type="tel" v-model="zzMoney" :placeholder="$t('moneyCenter.warnText[3]')"></div>
            </div>
            <div class="submit-btn" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" @click="moveQb">{{$t('moneyCenter.text[13]') }}</div>
          </div>
        </div>

      </div>

      <Recharge v-if="isCz" :show="isCz" v-on:childFn="resetFlag"/>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { alertComfirm } from "../../assets/js/public";
let math = require("mathjs");
export default {
  name: "moneyCenter",
  data() {
    return {
    isChangeSwitch:true,
    active:false,
    isCz:false,
    isTx:false,
    isZH:false,
    selectList: [],
    options1: [],
    options2: [],
    value1: "BALANCE",
    value2: "MG",
    listLoading:false,
    zcpt: "balance",
    zrpt: "sbo",
    gameMoney:{},
    zcAccount: 1, //转出
    zrAccount: 2, //转入
    zzMoney:'',
    showPoint:false,
    aeMoney:'',
    allVenderMoney:{},
    singleVenderMoney:[],
    isActive:0,
    isActiveShow:-1
    };
  },
  created() {
    this.autoChange();
    this.getGameList();
    this.getvenderBalance();
  },
  filters: {
 

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
    
      if (this.zzMoney - 0 > this.allVenderMoney[this.zcpt] - 0) {
        this.showPoint = true;
      } else {
        this.showPoint = false;
      }
    },
    isZH:function(){
      this.zzMoney = "";
    },
    vendor_bl:function(){
      this.singleVenderMoney = this.all_vendor_bl;
    }
  },
  methods: {
    ...mapMutations(["SETOPENZDZZ","SETBALANCE","SETVENDELBL","SETALLVENDELBL"]),
    getCurrgameMoney(){
      
    },
    resetFlag(flag) {
      this.isCz = flag;
    },
    goRecharge(n) {
      //是否已经登录
      if (!this.$store.state.codeToken) {
       alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});
      }
      //充值
      if(n==1){
        this.isCz = true;
      }else{
        this.isTx = true;
      }
      
    },
    resetFlagTx(flag){
      this.isTx = flag;
    },
      moveQb() {
      if (this.showPoint) {
        return;
      }
      if (this.zzMoney < 1) {
        this.$message({
          message: this.$t('moneyCenter.warnText[0]'),
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
          console.log({
            out: this.zcpt,
            in: this.zrpt,
            amount: this.zzMoney,
          })
      this.$http
          .post("/api/vendor/transfer", d,{ timeout: 60000 })
          .then((res) => {
            if (res && res.data.code == 1) {
              
              this.isZH=false;
              setTimeout(() => {
                this.$message({
                  message: res.data.msg,
                  type: "success",
                });
              }, 1000);
              //刷新余额
              this.zzMoney = '';
              this.getvenderBalance();
              }
              else{
                 this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
            })
    },
    async getvenderBalance(){
      let res = await this.$http.get('/api/vendor/balance',{params:{is_new_format:1}},{ timeout: 60000 })
      this.allVenderMoney = res.data.data;
     
      this.$forceUpdate();
      let arr = [];
      // for(let k in this.allVenderMoney){
      //   if(k=="balance"||k=='vendor_bl'){
          
      //   }else{
          
      //     arr.push({name:k.toString().toUpperCase(),value:this.allVenderMoney[k],nameTransfer:k})
      //   }
        
      // }

      for(let i=0,len=this.allVenderMoney.length;i<len;i++ ){
        if(this.allVenderMoney[i].code=="balance"||this.allVenderMoney[i].code=='vendor_bl'){
          if(this.allVenderMoney[i].code=="balance"){
            this.SETBALANCE(this.allVenderMoney[i].balance);
          }else{
             this.SETVENDELBL(this.allVenderMoney[i].balance);
          }
        }else{
          arr.push(this.allVenderMoney[i])
        }
        
      }
      this.singleVenderMoney = arr;
      // console.log(this.singleVenderMoney)
      this.SETALLVENDELBL(this.singleVenderMoney);
      
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
       this.zrAccount = i;
         this.zrpt = this.options2.find((res) => {
          return res.value == i;
        }).name;
     
    },
    getGameList() {
      this.$http.get("/api/vendor/index").then((res) => {
        if (res && res.data.code == 1) {
          this.selectList[0] = { label: "BALANCE", name: "balance",index:0 };
          res.data.data.forEach((item, index) => {
            this.selectList.push({
              label: item.name,
              // value: index + 1,

              value:item.name,
              name: item.code,
            });
          });
          this.options1 = this.selectList;
          // this.getAllMoney()
          this.listLoading=false;
          this.options2 = this.selectList.slice(1);
          this.value2 = this.options2[0].label;
          this.zrpt = this.options2[0].name;
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
    changeMoney(c,value,valueTranfer,index){
      // console.log(valueTranfer)
      if(!this.active){
        this.isZH=true
        if(c){
          //转出
          this.zcpt = valueTranfer;//小写 out
          this.zrpt = 'balance';//in
          this.value2= "BALANCE"//in
          this.value1 = value;//大写 out
           this.selectChanged1(value);
        }else{
          //转入
          this.zrpt = valueTranfer;
          this.zcpt = 'balance';
          this.value1 = 'BALANCE';
          this.value2= value
          this.selectChanged2(value)
        }
      }else{
         if(c==1){
          this.isActive = 2;
        }else{
          this.isActive = 1;
        }
        this.isActiveShow = index;
      }
     
    },
    changeSwitch() {
      this.isActiveShow = -1;
      if (!this.isChangeSwitch) {
        return;
      }
      this.isChangeSwitch = false;
      if (this.active) {
        alertComfirm({
          msg:this.$t('moneyCenter.warnText[1]')+"!",
          title:this.$t('moneyCenter.warnText[2]'),
        },()=>{this.autoChange(1);},()=>{this.isChangeSwitch = true;})
      } else {
        this.autoChange(1);
      }
    },
    autoChange(v) {
      if (v) {
        this.$http.post("/api/vendor/autotransfer",{},{ timeout: 60000 }).then((res) => {
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
        this.$http.get("/api/vendor/autotransfer",{},{ timeout: 60000 }).then((res) => {
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
       computed: {
    ...mapState(["skin","vendor_bl","all_vendor_bl"]),
  },
};
</script>

<style lang="less" scoped>
.moneyCenter{
    .go-control{
      >div{
         color: #fff;
         border-radius: 6px;
         display: inline-block;
         padding:5px 10px;
         margin-right: 10px;
         cursor: pointer;
         font-size: 14px;
      }
    }
    .recharge-btn{
      background: linear-gradient(90deg, #FF881E 0%, #FFBF00 78.95%);
    }
    .tx-btn{
      background: linear-gradient(90deg, #1486FF 14.39%, #4BA1FF 96.58%);
    }
    .gray-btn{
      background: #ccc;
    }
  .recharge-box{
    font-size: 18px;
    padding: 25px 0;
    border-bottom: 1px solid #F4F5F8;
    .money{
      color: #555;
      font-size: 14px;
      padding: 10px 0;
      display: block;
      font-weight: bold;
    }

  }
  .sf-wallet{
    h3{
      color: #555;
      border-bottom: none;
    }
    .tranfer-tip{
      i{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(../../assets/imgaes/icon_.png) no-repeat;
        background-size: contain;
        vertical-align: sub;
        margin-right: 0;
      }
      font-size: 12px;
      color: #1B74C8;
      font-weight: normal;
      line-height: 30px;
      padding-right: 10px;
    }
    .checked-icon{
      span{
          display: block;
          width:58px;height:29px;
          background: url('../../assets/imgaes/usercenter.png') no-repeat;
        &.i-icon{
          // background: url('../../assets/imgaes/active.png') no-repeat;
          // background-size: contain;
          background-size: 290px 290px;
          background-position: -132px -115px;
        }
        &.i-icon1{
          background-size: 290px 290px;
          background-position: -132px 0px;
          // background: url('../../assets/imgaes/unActive.png') no-repeat;
          // background-size: contain;
        }
      }
      &.pink-change{
        .i-icon{
          // background: url('../../assets/imgaes/active-pink.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
          background-position: -132px -202px;
        }
        .i-icon1{
          // background: url('../../assets/imgaes/unActive-pink.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
         
          background-position: -132px -87px;
        }
      }
      &.blue-change{
        .i-icon{
          // background: url('../../assets/imgaes/active-blue.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
           background-position: -132px -114px;
        }
        .i-icon1{
          // background: url('../../assets/imgaes/unActive-blue.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
          background-position: -132px -27px;
        }
      }
      &.green-change{
        .i-icon{
          // background: url('../../assets/imgaes/active-green.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
          background-position: -132px -173px;
        }
        .i-icon1{
          // background: url('../../assets/imgaes/unActive-green.png') no-repeat;
          // background-size: contain;
          background: url("../../assets/imgaes/usercenter.png")no-repeat;
          background-size: 290px 290px;
          background-position: -132px -58px;
        }
      }
    }
    .curr-money-detail{
      margin: 20px auto;
      >div{
        width: 420px;
        height: 80px;
        padding: 20px 0 0 30px;
        border-radius: 6px;
        overflow: hidden;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        display: inline-block;
        h5{
          font-weight: bold;
          font-size: 14px;

          margin-bottom: 5px;
        }
      }
      .center-wallet-money{
        background:  url(../../assets/imgaes/money1.png) no-repeat;
        background-size: contain;
        margin-right: 50px;
      }
      .sf-wallert-money{
        background:  url(../../assets/imgaes/money2.png) no-repeat;
        background-size: contain;
      }
    }
    .sf-list{
      ul{
        li{
          background: #F1F5FF;
          border-radius: 6px;
          padding: 25px 30px 0 30px;
          height: 80px;
          width: 890px;
          color: #445779;
          margin-bottom: 15px;
          position: relative;
          &.active{
            .no-transfer-tip{
              display: block;
            }
          }
          &.rightActive{
            .no-transfer-tip{
              right:40px;
            }
          }
          .no-transfer-tip{
            display: none;
            color: #fff;
            background:rgba(0,0,0,.5);
            border-radius: 4px;
            padding: 5px;
            position: absolute;
            right: 130px;
            width: 245px;
            top: -56px;
            &::before{
              position: absolute;
              right: 30px;
              bottom: -12px;
              content: '';
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 12px solid rgba(0,0,0,.5);
            }
          }
        }
      }
    }
  }
}

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
    margin: 200px auto;
    background: #fff;
    overflow: hidden;
    position: relative;
    border-radius: 15px;
    .select-pt{
      display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    }
    h3{
      color: #fff;
      text-align: center;
      background: #1B74C8;
      height: 72px;
      line-height: 72px;
      padding: 0;
      font-size: 28px;
      i{
        position: absolute;
        background: url(../../assets/imgaes/remove.png) no-repeat;
        width: 32px;
        height: 32px;
        background-size: contain;
        right: 10px;
        top: 20px;
      }
    }
    .input-box{
      border: 1px solid #B2B2B2;
       border-radius: 4px;
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
  }
  &.zh-pop-box{
    .pop-content{
      width: 600px;
      // text-align: center;
      .content{
        padding: 30px 50px;
      }
    }
  }
}
</style>
