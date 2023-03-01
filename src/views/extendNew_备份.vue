<template>
  <div class="extend-container main-sport">
     <div class="baobiao">
      <img src="../assets/imgaes/extend/baobiao.png" alt="" srcset="">
     </div>
     <div class="add-btn" @click="joinOur">
      {{$t('extend[2]')}}
     </div>
     <div class="dl-menu" :class="[{'pink-tab':$st.state.skin==1},{'blue-tab':$st.state.skin==2},{'green-tab':$st.state.skin==3}]">
       <ul  v-if="skin==0">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img src="../assets/imgaes/extend/tydl1.png" alt="" srcset="">
           <span>{{$t('extend[3]')}}</span>
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img src="../assets/imgaes/extend/yxdl1.png" alt="" srcset="">
           <span>{{$t('extend[4]')}}</span>
         </li>
        
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img src="../assets/imgaes/extend/yqfl1.png" alt="" srcset="">
           <span>{{$t('extend[6]')}}</span>
         </li>
       </ul>
       <ul v-if="skin==1">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl1.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/skin/pink/tydl1.png" alt="" srcset="">
           <span>{{$t('extend[3]')}}</span>
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl1.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/skin/pink/yxdl1.png" alt="" srcset="">
           <span>{{$t('extend[4]')}}</span>
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc1.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/skin/pink/dlfc1.png" alt="" srcset="">
           <span>{{$t('extend[5]')}}</span>
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl1.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/skin/pink/yqfl1.png" alt="" srcset="">
           <span>{{$t('extend[6]')}}</span>
         </li>
       </ul>
       <ul v-if="skin==2">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl1.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/skin/blue/tydl1.png" alt="" srcset="">
           <span>{{$t('extend[3]')}}</span>
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl1.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/skin/blue/yxdl1.png" alt="" srcset="">
           <span>{{$t('extend[4]')}}</span>
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc1.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/skin/blue/dlfc1.png" alt="" srcset="">
           <span>{{$t('extend[5]')}}</span>
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl1.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/skin/blue/yqfl1.png" alt="" srcset="">
           <span>{{$t('extend[6]')}}</span>
         </li>
       </ul>
       <ul v-if="skin==3">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl1.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/skin/green/tydl1.png" alt="" srcset="">
           <span>{{$t('extend[3]')}}</span>
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl1.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/skin/green/yxdl1.png" alt="" srcset="">
           <span>{{$t('extend[4]')}}</span>
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc1.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/skin/green/dlfc1.png" alt="" srcset="">
           <span>{{$t('extend[5]')}}</span>
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl1.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/skin/green/yqfl1.png" alt="" srcset="">
           <span>{{$t('extend[6]')}}</span>
         </li>
       </ul>
     </div>
   
     <div class="dl-content">
        <div v-show="menuActive==0" class="table1" >
           <table>
             <tr>
               <th>{{$t('extend[8]')}}</th>
               <th>{{$t('extend[9]')}}</th>
               <th>{{$t('extend[10]')}}</th>
               <th>{{$t('extend[11]')}}</th>
             </tr>
             <tr>
               <td>1</td>
               <td>40001-150000</td>
               <td>5</td>
               <td>30%</td>
             </tr>
             <tr>
               <td>2</td>
               <td>40001-150000</td>
               <td>10</td>
               <td>35%</td>
             </tr>
             <tr>
               <td>3</td>
               <td>150001-300000</td>
               <td>15</td>
               <td>40%</td>
             </tr>
             <tr>
               <td>4</td>
               <td>300001-500000</td>
               <td>25</td>
               <td>45%</td>
             </tr>
             <tr>
               <td>5</td>
               <td>500001-1000000</td>
               <td>35</td>
               <td>50%</td>
             </tr>
             <tr>
               <td>6</td>
               <td>>1000001</td>
               <td>50</td>
               <td>55%</td>
             </tr>
           </table>
           <div class="table1-text">
             <el-scrollbar style="height: 300px;">
             <p>{{$t('extend[12]')}}</p>
             <p>{{$t('extend[13]')}}</p>
             <p>{{$t('extend[14]')}}</p>
             <p>{{$t('extend[15]')}}</p>
             <p>{{$t('extend[16]')}}</p>
             <p>{{$t('extend[17]')}}</p>
             <p>{{$t('extend[18]')}}</p>
             <p>{{$t('extend[19]')}}</p>
             <p>{{$t('extend[20]')}}</p>
             <p>{{$t('extend[21]')}}</p>
             <p>{{$t('extend[22]')}}</p>
             </el-scrollbar>
           </div>
        </div>
        <div class="table2" v-show="menuActive==1">
          <div class="table-content">
            <h5>{{$t('extend[23]')}}</h5>
            <p>{{$t('extend[24]')}}</p>
            <p>{{$t('extend[25]')}}</p>
            <p>{{$t('extend[26]')}}</p>
            <p>{{$t('extend[27]')}}</p>
            <p>{{$t('extend[28]')}}</p>
          </div>
        </div>
       
        <div class="table4" v-show="menuActive==3">
          <div class="table-content">
            <h5>{{$t('extend[37]')}}</h5>
            <p>{{$t('extend[38]')}}</p>
          </div>
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
           <p>Telegram ：<i>{{$store.state.rightLink.telegramzh?$store.state.rightLink.telegramzh:'--'}}</i></p>
           
           <div>
            
             <span @click="goNewLink($store.state.rightLink.telegram)">{{$t('extend[1]')}}</span>
             <span class="no_bg copy-potato" @click="copy('copy-potato')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.telegramzh">{{$t('copyText')}}</span>
           </div>
         </div>
       </div>
       
     </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
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
       
       
      }else{
        window.open(localStorage.getItem('customer'))
        
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
.main-sport.extend-container{
  width: 100%;
  min-width: 1300px;
  overflow: hidden;
  background: url('../assets/imgaes/extend/content_bj.png') no-repeat;background-size: cover;
  .baobiao{text-align: center;margin:570px 0 0 0;}
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
  .dl-menu{
    width: 1300px;height: 85px;background:url('../assets/imgaes/extend/menu-bg.png') no-repeat;background-size: 100% 100%;margin: 0 auto;margin-top: -40px;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        // width: 256px;
        width: 25%;
        height: 85px;
        text-align: center;
        font-size: 22px;
        color: #6E7C9E;
        // line-height: 85px;
        
        cursor: pointer;
        span{
          font-size: 18px;
          color:#fff;
          display: block;
        }
        img{
        }
        &.active{
          background: url('../assets/imgaes/extend/active_bg.png') no-repeat;
          background-size: 100% 100%;
          color: rgb(87, 50, 50);
        }
        &:nth-child(1){
          img{
            width: 39px;
            margin: 8px 0 10px 0;
          }
        }
        &:nth-child(2){
          img{
            width: 44px;
            margin:11px 0 15px 0;
          }
        }
        &:nth-child(3){
          img{
            width: 41px;
            margin:8px 0 10px 0;
          }
        }
        &:nth-child(4){
          img{
            width: 46px;
            margin:5px 0 10px 0;
          }
        }
      }
    }
    &.pink-tab{
      background: #fff!important;
      ul{
        span{
          color: #FB7772 !important;
        }
        li.active{
          background: #FB7772 !important;
          span{color: #fff!important;}
        }
      }
    }
    &.blue-tab{
      background: #fff!important;
      ul{
        span{
          color: #00B4D8 !important;
        }
        li.active{
          background: #00B4D8 !important;
          span{color: #fff!important;}
          
        }
      }
    }
    &.green-tab{
      background: #fff!important;
      ul{
        span{
          color: #09B584 !important;
        }
        li.active{
          background: #09B584 !important;
          span{color: #fff!important;}
        }
      }
    }
  }
  .zx-box{
    display: flex;
    justify-content: center;
    margin: 100px 0;
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
.dl-content{
   width: 100%;
  width: 1300px;
  margin: 0 auto;
  .table1,.table2,.table3,.table4{
      background: url('../assets/imgaes/extend/BG1.png') no-repeat;
      background-size: 100% 100%;;
      width: 100%;
      height:726px;
      margin-top: 100px;
      padding-top: 10px;
      table{
        width: 800px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        margin-left: 456px;
        margin-top: 20px;
        box-shadow: 0px 1px 10px 4px #eee;
        // border: 1px solid #E5F1FF;
        th{
          height: 60px;
          background:#E5F1FF;
          color:#445779;
          &:nth-child(1){
                width: 12%;
          }
          // line-height: 60px;
        }
        td{
          height: 45px;
          line-height: 45px;
          border-right: 1px solid #E5F1FF;
          border-bottom: 1px solid #E5F1FF;
          &:nth-last-child(1){
            border-right: none;
          }
        }
      }
      .table1-text{
        width: 800px;
        margin-top: 15px;
        max-height: 300px;
        margin-left: 456px;
        font-size: 16px;
        color: #445779;
        line-height: 28px;
        text-shadow: 1px 5px 1px #eee;
      }
  }

  .table2{
      background: url('../assets/imgaes/extend/BG2.png') no-repeat;
      background-size: 100% 100%;;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      width: 1479px;
      padding-left: 40px;
      padding-top: 138px;
      margin-top: 35px;
     
  }
  .table-content{
        width: 841px;
        height: 439px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        border: 1px solid #E5F1FF;

        h5{
          background: #E5F1FF;
          height: 60px;
          line-height: 60px;
          padding-left: 10px;
          font-size: 16px;
        }
        p{
          margin-top: 26px;
          padding-left: 24px;
          padding-right:30px;
        }
      }
  .table3{
      background: url('../assets/imgaes/extend/BG3.png') no-repeat;
      background-size: 100% 100%;;
      font-size: 16px;
      color: #445779;
      padding-top: 60px;
      margin-left: -111px;
      width: 1416px;
      font-weight: bold;
      .table-content{
         width: 642px;
         height: 594px;
         margin-left: 738px;
        //  margin-right: 30px;
       }
      h5{
        text-align: center;
      }
  }
  .table4{
    background: url('../assets/imgaes/extend/BG4.png') no-repeat;
      background-size: 100% 100%;;
      font-size: 16px;
      color: #445779;
      width: 1360px;
      padding-top: 71px;
       .table-content{
         width: 670px;
         height: 422px;
         margin-left: 19px;
        //  margin-top: 71px;
        //  margin: 0  30px 0 23px;
       }
      h5{
        text-align: center;
      }
      p{
        line-height: 40px;
      }
  }
}


</style>
