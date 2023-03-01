<template>
  <div class="extend-container ">
    <div class="banner">
       <img v-if="$store.state.lanCode==1" src="../assets/imgaes/extend/banner1.png" alt="" >
       <img v-if="$store.state.lanCode==5" src="../assets/imgaes/extend/banner5.png" alt="" >
    </div>
    <div class="main-sport">
      <div class="add-btn" @click="joinOur">
        {{$t('extend[2]')}}
      </div>

      <div class="advantage clearfix">
        <img src="../assets/imgaes/extend/ys.png" alt="">
        <div class="text">
          <h3>{{$t('extendNew[0]')}}</h3>
          <p>{{$t('extendNew[1]')}}</p>
        </div>
      </div>
      <div class="zx-box">
      
        <div class="zx-item">
          <img style="width:70px;height:70px" src="../assets/imgaes/extend/whatsapp.png" alt="">
          <div class="zx-info">
            <p>Whatsapp:<i>{{$store.state.rightLink.whatsappzh}}</i></p>
            <div>
              <span @click="goNewLink($store.state.rightLink.whatsapp)">{{$t('extend[1]')}}</span>
              <span class="no_bg copy-flygram" @click="copy('copy-flygram')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.whatsappzh">{{$t('copyText')}}</span>
            </div>
          </div>
        </div>
        <div class="zx-item">
          <img src="../assets/imgaes/extend/zalo.png" alt="">
            <div class="zx-info">
          <p>Zalo{{$store.state.rightLink.zalozh}}</p>
          
            <div>
              <span @click="goNewLink($store.state.rightLink.zalo)">{{$t('extend[1]')}}</span>
              <span class="no_bg copy-yx" @click="copy('copy-yx')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.zalozh">{{$t('copyText')}}</span>
            </div>
            </div>
        </div>
        <div class="zx-item">
          <img src="../assets/imgaes/extend/kf.png" alt="">
            <div class="zx-info">
          <p style="margin: 0 20px;">{{$t('extend[0]')}}</p>
          <div>
              <span @click="goOnline">{{$t('extend[1]')}}</span>
            </div>
            </div>
        </div>
        <div class="zx-item">
          <img style="width:70px;height:70px"  src="../assets/imgaes/extend/telegram.png" alt="">
          <div class="zx-info">
            <p>{{$t('extendNew[2]')}}：<br><i>{{$store.state.rightLink.telegramzh?$store.state.rightLink.telegramzh:'--'}}</i></p>
            
            <div>
            
              <span @click="goNewLink($store.state.rightLink.telegram)">{{$t('extend[1]')}}</span>
              <span class="no_bg copy-potato" @click="copy('copy-potato')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.telegramzh">{{$t('copyText')}}</span>
            </div>
          </div>
        </div>
        
      </div>

      <div class="table">
        <h3>{{$t('extendNew[3]')}}</h3>
        <table>
          <tr class="title">
            <td style="width:247px;">{{$t('extendNew[4]')}}   </td>
            <td style="width:207px;">{{$t('extendNew[5]')}} </td>
            <td style="width:217px;">{{$t('extendNew[6]')}}<br> {{$t('extendNew[7]')}}</td>
            <td style="width:264px;">{{$t('extendNew[8]')}}<br> {{$t('extendNew[9]')}} </td>
            <td style="width:339px;">{{$t('extendNew[10]')}}</td>
          </tr>
          <tr>
            <td>1,000k - 150,000k  </td>
            <td>3</td>
            <td>20%</td>
            <td>10%</td>
            <td rowspan="6">{{$t('extendNew[11]')}}<br>  {{$t('extendNew[12]')}}</td>
          </tr>
          <tr>
            <td>150,001k - 500,000k</td>
            <td>5</td>
            <td>25%</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>500,001k - 1,000,000k</td>
            <td>7</td>
            <td>30%</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>1,000,001k - 2,000,000k</td>
            <td>9</td>
            <td>35%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>2,000,001k - 3,000,000k</td>
            <td>15</td>
            <td>45%</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>{{$t('extendNew[13]')}} 3,000,001k</td>
            <td>20</td>
            <td>55%</td>
            <td>35%</td>
          </tr>
          <tr>
            <td colspan="6">{{$t('extendNew[14]')}}</td>
          </tr>
        </table>
        
      </div>

      <div class="cost-rate clearfix">
        <div class="rate fl">
          <img src="../assets/imgaes/extend/rate.png" alt="">
          <h4>{{$t('extendNew[15]')}}</h4>
          <h6>{{$t('extendNew[16]')}}</h6>
          <div class="bl">
            <span>
              <i class="green"></i>
              {{$t('extendNew[17]')}}
            </span>
            <span>
              <i class="purple"></i>
              {{$t('extendNew[18]')}}
            </span>
            <span>
              <i class="orange"></i>
              {{$t('extendNew[19]')}}
            </span>
          </div>
        </div>
        <div class="cost fl">
          <img src="../assets/imgaes/extend/cost.png" alt="">
          <h4>{{$t('extendNew[20]')}}</h4>
          <h6></h6>
          <div class="bl">
            <span>
              <i class="green"></i>
              {{$t('extendNew[21]')}}
            </span>
            <span>
              <i class="purple"></i>
              {{$t('extendNew[22]')}}
            </span>
            <span>
              <i class="orange"></i>
              {{$t('extendNew[23]')}}
            </span>
            <span>
              <i class="purple1"></i>
              {{$t('extendNew[24]')}}
            </span>
            <span>
               <i class="light-purple"></i>
               {{$t('extendNew[25]')}}
            </span>
          </div>
        </div>
      </div>

      <div class="api-box clearfix">
        <div class="api-titile clearfix">
          <img class="icon fl" src="../assets/imgaes/extend/api_l.png" alt="">
          <span class="ti fl" :style="$store.state.lanCode==5?'font-size:28px':''">{{$t('extendNew[26]')}}</span>
          <img class="icon fl" src="../assets/imgaes/extend/api_r.png" alt="">
        </div>
        <p>{{$t('extendNew[27]')}}
        <br>{{$t('extendNew[28]')}}
        <br>{{$t('extendNew[29]')}}</p>
      </div>

      <div class="be-careful">
        <strong>{{$t('extendNew[30]')}}:</strong> <br>
        {{$t('extendNew[31]')}}
        {{$t('extendNew[32]')}}
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { alertComfirm } from "../assets/js/public";
export default {
  name: 'extend',
  data(){
    return{
      menuActive:0,
      status:true
    }
  },
  computed: {
    ...mapState([
      "username",
      "codeToken","skin"
    ])
  },
  methods:{
     ...mapMutations([
      "SETLOGIN",
      "SETISLOGIN",
    ]),
    openMsg(mess) {
    if (this.status) { // 为事件加锁，点击之后，在动作没有完成之前不允许再次触发事件
        this.status = false
        if (this.msg) {	// 防止第一次点击报错
		    this.msg.close()
		}
        this.msg = this.$message({
            duration: 0,
            type: 'warning',
            message: this.$t('copyingText')+'....'
        })
        setTimeout(() => {
            // this.msg.close()
            this.msg = this.$message({
                duration: 1000,
                type: 'success',
                message: mess
            })
            this.status = true
        }, 1000)
    }
},
    copy(className){
      let _this=this
       let clipboard = new this.clipboard("."+className);
          clipboard.on('success', function () {
        _this.openMsg(_this.$t('copySuccess'));
      }); 
       clipboard.on('error', function () {
         _this.openMsg(_this.$t('cypyError'));
      });

    },
    joinOur(){
     if(this.codeToken&&this.$store.state.userinfo.user_id>0){
      this.$router.push("/extendReport/3");
      }else if(this.codeToken&&this.$store.state.userinfo.user_id<0){
        //游客
         return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});
      }else{
        //未登录
           alertComfirm({ msg: this.$t('loginTip')}, () => {
          this.$store.commit("SETLOGIN", true);
        });

      }
    },
        goRegister() {
      if (this.noticeTypes == 1) {
        this.$store.commit("SETLOGIN", true);
        this.SETISLOGIN(false);
       
      } else {
        this.$store.commit("SETLOGIN", true);
        this.SETISLOGIN(false);
        
      }
    },
    goOnline(){
      window.open(localStorage.getItem('customer'))
    },
    goNewLink(url){
      window.open(url)
    }
  }
}
</script>

<style scoped lang="less">
.extend-container{
  width: 100%;
  min-width: 1300px;
  overflow: hidden;
  .main-sport{
    width: 100%;
    background: url('../assets/imgaes/extend/main_bg.png') no-repeat;
    background-size: cover;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .banner{
    img{
      width: 100%;
    }
  }
  .advantage{
    img{
      width: 60%;
      float: left;
      margin-right: 50px;
    }
    .text{
      width: 30%;
      color: #445779;
      float: left;
      h3{
        font-size: 36px;
        text-align: center;
        margin-bottom: 25px;
      }
      p{
        line-height: 36px;
        font-size: 18px;
      }
    }
  
  }
  .add-btn{position: fixed;
    bottom: 48px;
    z-index: 9;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    background: url("../assets/imgaes/extend/add.png")no-repeat;
    background-size: cover;
    font-size: 40px;
    text-align: center;
    font-weight: bold;
    width: 443px;
    height: 108px;
    line-height: 108px;
    color:#fff;
    }
  .zx-box{
    display: flex;
    justify-content: center;
    margin: 50px 0;
    .zx-item{
      position: relative;
      width: 318px;
      height: 229px;
      background: url('../assets/imgaes/extend/zx_bg.png') no-repeat;
      text-align: center;
      img{margin: 20px 0;}
      .zx-info{
        position: absolute;
        width: 100%;
        bottom: 34px;
        font-size: 16px;
        p{margin-bottom: 10px;}
        >div{
          span{
            display: inline-block;padding: 8px 18px;border-radius: 20px;background: linear-gradient(0deg, #FFA739, #FCDEA9);color:#fff;margin: 6px 10px;cursor: pointer;
            &.no_bg{border: 1px solid #FFA739;background: none;color:#FFA739 ;}
          }
        }
      }
    }
  }
}
.table{
  width: 1300px;
  color: #445779;
  margin: 0 auto;
  text-align: center;
  h3{
    font-size: 20px;
    margin-bottom: 15px;
  }
  table{
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    tr{
      border: 2px solid #E5F1FF;
      font-weight: 700;
    }
    .title{
      height: 83px;
      font-size: 20px;
      font-weight: bold;
      background: #E5F1FF;
      text-align: center;
    }
    td{
      height: 60px;
      font-size: 18px;
      border-left: 2px solid #E5F1FF;
    }
  }
}
.cost-rate{
  width: 1300px;
  margin: 80px auto 0;
  color: #445779;
  h4{
    font-size: 32px;
    font-weight: 700;
    margin-top: 43px;
    margin-bottom: 15px;
  }
  h6{
    font-weight: 700;
    font-size: 18px;
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
  }
  .bl{
    span{
      line-height: 20px;
      font-size: 14px;
      margin-right: 10px;
    }
    i{
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
      &.green{
        background: #1ACFC1;
      }
      &.purple{
        background: #642EEA;
      }
      &.purple1{
        background: #B75BFF;
      }
      &.light-purple{
        background: #FF5BE5;
      }
      &.orange{
        background: #FF705B;
      }
    }
  }
  .rate{
      width:531px;
      text-align: center;
      margin-right: 122px;
      img{
        width: 356px;
      }
  }
  .cost{
    width: 625px;
    text-align: center;
    img{
      width: 356px;
    }
  }
}
.api-box{
  margin: 70px auto 50px;
  .api-titile{
    max-width: 1920px;
    margin: 0 auto 37px;
    .icon{
      width:20%;
    }
    .ti{
      width: 54%;
      font-size: 36px;
      font-weight: bold;
      color: #445779;
      text-align: center;
      margin-left: 1%;
      margin-right: 1%;
    }
  }
  p{
    width: 1253px;
    font-size: 18px;
    line-height: 36px;
    color: #6E7C9E;
    margin: 0 auto;
  }
}
.be-careful{
  width: 1253px;
  font-size: 18px;
  line-height: 36px;
  color: #6E7C9E;
  margin: 0 auto;
  strong{
    color: #445779;
  }
}
</style>
