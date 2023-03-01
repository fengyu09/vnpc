<template>
  <div class="appDownload-container main-sport">
    <div style="text-align: center;padding-top: 40px;">
      <span class="title-text" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3}]">{{$t('home.downApp.title')}}</span>

      <img style="width:1200px" v-if="$st.state.skin==0" src="../assets/imgaes/home/dow-title.png" alt="" srcset="" >
      <img style="width:1200px" v-if="$st.state.skin==1" src="../assets/imgaes/skin/pink/dow-title.png" alt="" srcset="" >
      <img style="width:1200px" v-if="$st.state.skin==2" src="../assets/imgaes/skin/blue/dow-title.png" alt="" srcset="" >
      <img style="width:1200px" v-if="$st.state.skin==3" src="../assets/imgaes/skin/green/dow-title.png" alt="" srcset="" >
    </div>
    <div class="platform-box">
       <div class="platform-item" id="zh_app" >
      <div class="platform-logo" style="margin-right: 28px;">
           
            <div>
              <img v-if="$st.state.lanCode ==1" src="../assets/imgaes/download/ty_bg.png" alt="">
              <img v-if="$st.state.lanCode !=1" src="../assets/imgaes/download/ty_bgy.png" alt="">
              <!-- <img  src="../assets/imgaes/download/ty_bgy.png" alt=""> -->
            </div>
         </div>
       
        <div>
          <img v-if="$st.state.lanCode ==1" src="../assets/imgaes/download/title_01.png" alt="" srcset="">
          <img style="width:450px" v-if="$st.state.lanCode !=1" src="../assets/imgaes/download/title_01y.png" alt="" srcset="">
          <p class="synopsis" :class="[{'pink-color':$st.state.skin==1},{'blue-color':$st.state.skin==2},{'green-color':$st.state.skin==3}]"> {{$t('home.downApp.content')}}</p>
          <div class="download-box">
              <div>
                <img style="width:140px" src="../assets/imgaes/home/download-code.png" alt="" srcset="">
                <p>{{$t('home.downApp.load[0]')}}</p>
                <p>{{$t('home.downApp.load[1]')}}</p>
              </div>
              <div>
                 <img src="../assets/imgaes/download/h5.png" alt="" srcset="">
                 <p>{{$t('home.downApp.load[2]')}}</p>
                <p v-if="$store.state.lanCode!=2"><a target="_blank" href="https://www.k188.bet">www.k188.bet</a></p>
                 <p v-else><a target="_blank" href="https://www.66w.vip">www.66w.vip</a></p>
              </div>
          </div>
         
        </div>
     </div>
     
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'appDownload',
  data(){
    return{
      menuActive:0
    }
  },
  methods:{
    toApp(id,idnex){
      document.getElementById(id).scrollIntoView();
      this.menuActive=idnex
    },
    goJc(){
      window.open('https://lgapp777.com')
    }
    
  }
}
</script>

<style scoped lang="less">
.appDownload-container.main-sport{
  width: 100%;
  min-width: 1300px;
  
  background: url('../assets/imgaes/download/bj.png') no-repeat;background-size: cover;background-position-y: -50px;
  .platform-box{
     overflow: hidden;
    .platform-item{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #6E7C9E;
      margin: 80px 0;
      // padding-left: 100px;
      >div{
        // margin-left: 40px;
      }
      .platform-logo{
        position: relative;
        margin-right: 220px;
        >img{
          position: absolute;
    top: -83px;
    left: -270px;
    z-index: 99;
        }
      }
       .synopsis{
        font-size: 14px;
        line-height: 36px;
        margin: 10px 0px;
        width: 525px;
      }
      .download-box{
        text-align: center;
        margin: 60px 0;
        >div{
          display: inline-block;
          width: 206px;
          height: 239px;
          margin: 0 10px;
          background: url('../assets/imgaes/download/code_bg.png') no-repeat;
          padding-top: 20px;
          img{margin-bottom: 12px;}
        }
      }
      .azjc{
        color: #fff;
        width: 225px;
        height: 65px;
        background: url('../assets/imgaes/download/btn_bg.png') no-repeat;
        margin: 0 auto;
        text-align: center;
        font-size: 26px;
        line-height: 65px;
        img{margin-right: 10px;}
        cursor: pointer;
        transition: all 0.5s;
        &:hover{
          transform: scale(1.06);
        }
      }
    }
  }
  .app-menu{
    position: fixed;
    left: 7.5%;
    top: 256px;
    >div{
      width: 224px;
      height: 66px;
      background: url('../assets/imgaes/download/btn_bg2.png') no-repeat;
      line-height: 66px;
      text-align: center;
      font-size: 22px;
      color: #6E7C9E;
      cursor: pointer;
      margin: 2px 0;
      img{margin-right: 6px;}
      &.active{
        background: url('../assets/imgaes/download/btn_bg.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
      }
    }
  }
}
.title-text{
  font-weight: bold;
  display: block;
  text-align: center;
  width: 1200px;
  font-size: 36px;
  color: #445779;
  // margin-top: 60px;
  margin: 0 auto 20px;

}
</style>
