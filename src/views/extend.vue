<template>
  <div class="extend-container main-sport">
     <div class="baobiao">
      <img src="../assets/imgaes/extend/baobiao.png" alt="" srcset="">
     </div>
     <div class="add-btn" @click="joinOur">
      <img src="../assets/imgaes/extend/add.png" alt="" srcset="">
     </div>
     <div class="dl-menu" :class="[{'pink-tab':$st.state.skin==1},{'blue-tab':$st.state.skin==2},{'green-tab':$st.state.skin==3}]">
       <ul  v-if="skin==0">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img src="../assets/imgaes/extend/tydl.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img src="../assets/imgaes/extend/yxdl.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img src="../assets/imgaes/extend/dlfc.png" alt="" srcset="">
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img src="../assets/imgaes/extend/yqfl.png" alt="" srcset="">
         </li>
       </ul>
       <ul v-if="skin==1">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/extend/tydl-pink.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/extend/yxdl-pink.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/extend/dlfc-pink.png" alt="" srcset="">
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/extend/yqfl-pink.png" alt="" srcset="">
         </li>
       </ul>
       <ul v-if="skin==2">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/extend/tydl-blue.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/extend/yxdl-blue.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/extend/dlfc-blue.png" alt="" srcset="">
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/extend/yqfl-blue.png" alt="" srcset="">
         </li>
       </ul>
       <ul v-if="skin==3">
         <li :class="{active:menuActive==0}" @click="menuActive=0">
           <img v-show="menuActive == 0" src="../assets/imgaes/extend/tydl.png" alt="" srcset="">
           <img v-show="menuActive != 0" src="../assets/imgaes/extend/tydl-green.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==1}" @click="menuActive=1">
           <img v-show="menuActive == 1" src="../assets/imgaes/extend/yxdl.png" alt="" srcset="">
           <img v-show="menuActive != 1" src="../assets/imgaes/extend/yxdl-green.png" alt="" srcset="">
         </li>
         <li  :class="{active:menuActive==2}" @click="menuActive=2">
           <img v-show="menuActive == 2" src="../assets/imgaes/extend/dlfc.png" alt="" srcset="">
           <img v-show="menuActive != 2" src="../assets/imgaes/extend/dlfc-green.png" alt="" srcset="">
         </li>
         <li   :class="{active:menuActive==3}" @click="menuActive=3">
           <img v-show="menuActive == 3" src="../assets/imgaes/extend/yqfl.png" alt="" srcset="">
           <img v-show="menuActive != 3" src="../assets/imgaes/extend/yqfl-green.png" alt="" srcset="">
         </li>
       </ul>
     </div>
     <div class="dl-content"  style="text-align: center;margin-top: 100px;height: 712px;">
       <img src="../assets/imgaes/extend/tydl_bg.png" alt="" v-show="menuActive==0">
       <img src="../assets/imgaes/extend/yxdl_bg.png" alt="" v-show="menuActive==1" style="margin-left: 116px;width: 1400px;">
       <img src="../assets/imgaes/extend/dlfc_bg.png" alt="" v-show="menuActive==2" style="margin-left: -100px;">
       <img src="../assets/imgaes/extend/yqfl_bg.png" alt="" v-show="menuActive==3" style="margin-left: 40px;">
     </div>
    
     <div class="zx-box">
      
       <div class="zx-item">
         <img style="width:70px;height:70px" src="../assets/imgaes/extend/whatsapp.png" alt="">
         <div class="zx-info">
           <p>Whatsapp:<i>{{$store.state.rightLink.whatsappzh}}</i></p>
           <div>
             <span @click="goNewLink($store.state.rightLink.whatsapp)">Hỏi ngay</span>
             <span class="no_bg copy-flygram" @click="copy('copy-flygram')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.whatsappzh">sao chép</span>
           </div>
         </div>
       </div>
        <div class="zx-item">
          <img src="../assets/imgaes/extend/zalo.png" alt="">
           <div class="zx-info">
          <p>Zalo{{$store.state.rightLink.zalozh}}</p>
          
           <div>
             <span @click="goNewLink($store.state.rightLink.zalo)">Hỏi ngay</span>
             <span class="no_bg copy-yx" @click="copy('copy-yx')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.zalozh">sao chép</span>
           </div>
           </div>
       </div>
        <div class="zx-item">
          <img src="../assets/imgaes/extend/kf.png" alt="">
           <div class="zx-info">
          <p style="margin: 0 20px;">Khi liên hệ với dịch vụ khách hàng, hãy nhớ cung cấp tên người dùng của bạn</p>
          <div>
             <span @click="goOnline">Hỏi ngay</span>
           </div>
           </div>
       </div>
        <div class="zx-item">
         <img style="width:70px;height:70px"  src="../assets/imgaes/extend/telegram.png" alt="">
         <div class="zx-info">
           <p>Telegram ：<i>{{$store.state.rightLink.telegramzh?$store.state.rightLink.telegramzh:'--'}}</i></p>
           
           <div>
            
             <span @click="goNewLink($store.state.rightLink.telegram)">Hỏi ngay</span>
             <span class="no_bg copy-potato" @click="copy('copy-potato')" data-clipboard-action="copy" :data-clipboard-text="$store.state.rightLink.telegramzh">sao chép</span>
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
            message: 'Đang đợi....'
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
        _this.openMsg('Sao chép thành công');
      }); 
       clipboard.on('error', function () {
         _this.openMsg('Sao chép không thành công, vui lòng thử lại sau');
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
  // height: 800px;
  overflow: hidden;
  background: url('../assets/imgaes/extend/content_bj.png') no-repeat;background-size: cover;
  .baobiao{text-align: center;margin:570px 0 0 0;}
  .add-btn{position: fixed;
    /* width: 100%; */
    bottom: 48px;
    z-index: 9;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    }
  .dl-menu{
    width: 1300px;height: 85px;background:url('../assets/imgaes/extend/menu-bg.png') no-repeat;background-size: 100% 100%;margin: 0 auto;margin-top: -40px;
    ul{
      display: flex;
      justify-content: space-between;
      li{
        width: 256px;
        height: 85px;
        text-align: center;
        font-size: 22px;
        color: #6E7C9E;
        line-height: 85px;
        
        cursor: pointer;
        img{margin-right: 10px;width: 130px;}
        &.active{
          background: url('../assets/imgaes/extend/active_bg.png') no-repeat;
          background-size: 100% 100%;
          color: rgb(87, 50, 50);
        }
      }
    }
    &.pink-tab{
      background: #fff!important;
      ul{
        li.active{
          background: #FB7772 !important;
        }
      }
    }
    &.blue-tab{
      background: #fff!important;
      ul{
        li.active{
          background: #00B4D8 !important;;
        }
      }
    }
    &.green-tab{
      background: #fff!important;
      ul{
        li.active{
          background: #09B584 !important;;
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

</style>
