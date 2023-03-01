<template>
  <div class="home-container main-sport right-nav" :class="[{'pink-right-nav':$st.state.skin==1},{'blue-right-nav':$st.state.skin==2},{'green-right-nav':$st.state.skin==3}]">
    <div class="nav-item" @click="$router.push('/game')" @mouseout="pingHide()">
      <span class="icon icon-game" :class="[{'pink-icon-game':$st.state.skin==1},{'blue-icon-game':$st.state.skin==2},{'green-icon-game':$st.state.skin==3}]"></span>
      <p>{{$t('home.leftNav[0]')}}</p>
    </div>
     <div class="nav-item" @mouseover="pingShow($event)" v-show="xllinks.length">
         <span class="icon icon-line" :class="[{'pink-icon-line':$st.state.skin==1},{'blue-icon-line':$st.state.skin==2},{'green-icon-line':$st.state.skin==3}]"></span>
         <p> {{$t('home.leftNav[1]')}}</p>
            <div class="line-list"  @mouseout="pingHide()">
              <ul class="nav-list">
                <li v-for="(v, index) in xllinks">
                  <a :href=" v.url" target="_blank">
                    <div class="clearfix">
                      <div class="fl origin"></div>
                      <div class="fl">
                        <div style="font-size:14px">{{ v.tit }}</div>
                        <div
                          style="font-size:12px"
                          :class="v.speed >= 500 ? 'redcolor' : 'glcolor'"
                        >{{ v.speed }}ms</div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
      </div>
    <div class="nav-item" @click="goOnline" @mouseout="pingHide()">
      <span class="icon icon-onlineService"  :class="[{'pink-icon-onlineService':$st.state.skin==1},{'blue-icon-onlineService':$st.state.skin==2},{'green-icon-onlineService':$st.state.skin==3}]"></span>
      <p>{{$t('home.leftNav[2]')}} </p>
    </div>
    <div class="nav-item">
      <router-link to="/contact">
      <span class="icon icon-contact" :class="[{'pink-icon-contact':$st.state.skin==1},{'blue-icon-contact':$st.state.skin==2},{'green-icon-contact':$st.state.skin==3}]"></span>
      <p>{{$t('home.leftNav[3]')}}</p>
      </router-link>
    </div>
    <div class="nav-item" @click="$router.push('/extend')" @mouseenter="isShowJoin=true" @mouseleave="isShowJoin=false;">
      <span class="icon icon-join" :class="[{'pink-icon-join':$st.state.skin==1},{'blue-icon-join':$st.state.skin==2},{'green-icon-join':$st.state.skin==3}]"></span>
      <p>{{$t('home.leftNav[4]')}}</p>
      <div class="franchise-agent"  v-show="isShowJoin">
         <div class="franchise-agent-box" >
          <div class="contact-number" v-if="$store.state.lanCode==1">
            <p>Số liên lạc①: +63 9617058888</p>
            <p>Số liên lạc②: +63 9617068888</p>
          </div>
          <div class="contact-number" v-if="$store.state.lanCode!=1">
            <p>Contact number①: +63 9617058888</p>
            <p>Contact number②: +63 9617068888</p>
          </div>
           <p @click="goOnline" style="border-bottom: 1px solid #E5F1FF;"><i class="call-icon"></i>{{$t('home.leftNav1[0]')}}</p>
           <p @click="goNewLink(rightLink.zalo)"><i class="flygram-icon"></i>Zalo：{{rightLink.zalozh}}</p>
           <a :href="'mailto:'+rightLink.email"><i class="email-icon"></i>Email：{{rightLink.email}}</a>
           <img :src="rightLink.proxy.flygram_img" alt="flygram">
         </div>
      </div>
    </div>
    <!--  -->
    <div class="nav-item" @mouseenter="isShowCallTel=true" @mouseleave="isShowCallTel=false;">
    <!-- <div class="nav-item"> -->
      <span class="icon icon-callBack" :class="[{'pink-icon-callBack':$st.state.skin==1},{'blue-icon-callBack':$st.state.skin==2},{'green-icon-callBack':$st.state.skin==3}]"></span>
      <p>{{$t('home.leftNav[5]')}}</p>
      <div class="call-back-container" v-if="isShowCallTel">
          <i class='xt'></i>
          <div class="call-back-content">
            <p class="tip">{{$t('home.leftNav[7]')}}</p>
            <div class="back-content">
                <div class="back-content-item">
                  <span>{{$t('home.leftNav[8]')}}:</span>
                  <div class="type-box" :class="[{'pink-type':skin==1},{'blue-type':skin==2},{'green-type':skin==3}]">
                    <span v-for="(v,index) in quesList" :key="index" @click='selectQuesType($event,v.id)'>{{v.title}}</span>
                  </div>
                </div>
                <div class="back-content-item lan-tiem">
                  <span>{{$t('home.leftNav[9]')}}:</span>
                  <div class="type-box" :class="[{'pink-type':skin==1},{'blue-type':skin==2},{'green-type':skin==3}]">
                    <span v-for="(v,index) in lanList" :key="index" :class="v.is_check?'active':''"  @click="changeLan($event,v)">{{v.title}}</span>
                  </div>
                </div>
                <div class="back-content-item">
                  <span>{{$t('home.leftNav[10]')}}:</span>
                  <div class="type-box">
                    <input type="tel" :placeholder="$t('home.leftNav[11]')"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="11" v-model="memberAccount">
                  </div>
                </div>
                <div class="back-content-item">
                  <span>{{$t('home.leftNav[12]')}}:</span>
                  <br>
                  <div class="type-box">
                    <input type="text" :placeholder="$t('home.leftNav[13]')"  onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="12" v-model="tel">
                  </div>
                </div>
            </div>
            <el-button class="custom-btn" :class="[{'pink-bg-jb':skin==1},{'blue-bg-jb':skin==2},{'green-bg-jb':skin==3}]"  style="
        " :loading="btnLoading" @click="getCallBack">{{$t('home.leftNav[17]')}}</el-button>
        </div>
      </div>
    </div>
    <img class="back-top" @click="backTop" src="../assets/imgaes/leftFooter/TOP.png" alt="">
  </div>
</template>

<script>
import {  mapState } from "vuex";
import {removeAllactive} from "../assets/js/public";
export default {
  name: 'home',
  data(){
    return{
      isShowCallTel:false,
      btnLoading:false,
      quesList:[],
      lanList:[],
      selectQues:[],
      menuActive:0,
      currLan:'',
      tel:'',
      memberAccount:'',
      xllinks:[],
      rightLink:{proxy:{flygram_img:''}},
      isShowJoin:false
     
    }
  },
  props:{
   
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  created() {
    this.getLan();
    this.getQues();
    // console.log(this.$store.state.rightLink)
   
    if(this.$store.state.rightLink.length==0){
      this.getDataServe();
      console.log(3)
       
    }else{
      this.xllinks = this.$store.state.xLLink;
      this.rightLink = this.$store.state.rightLink;
    }
   
      for (var i = 0; i < this.xllinks.length; i++) {
          this.ping(this.xllinks[i].url, i);
        }
    // console.log(this.rightLink)
    // console.log(this.lineList)
  },
  methods:{
   async getDataServe(){
      let api=''
      if(this.noticeTypes==1){
        api = '/api/common/get_datas'
      }else{
        api = '/api/common/get_datas_dl'
      }
      let res = await this.$http.get(api);
      if (res && res.data.code == 1) {
        this.rightLink = res.data.data;
        let arr = [];
        for (let i = 0, len = this.rightLink.line.length; i < len; i++) {
          arr.push({
            url: this.rightLink.line[i],
            tit: this.$t('home.leftNav1[1]') + (i + 1),
            speed: 50,
          });
        }
        this.xllinks = arr;
        
      }
    },
    goNewLink(url){
      window.open(url)
    },
    scrollToTop() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
      if (this.scrollTop > 200) {
        this.top = true;
      } else {
        this.top = false;
      }
    },
     //返回顶部
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    goOnline(){
      window.open(localStorage.getItem('customer'))
    },
    changeLan(e,v){ //语言选择
        let curr = e.currentTarget;
        removeAllactive(document.querySelectorAll('.lan-tiem span'));
        curr.classList.add('active')
        this.currLan = v.id;
      },
    selectQuesType(e,id){ //问题类型选择
      let curr = e.currentTarget;
        if(curr.className.indexOf('active')>-1){
            curr.classList.remove('active');
            //删掉id
            let i = this.selectQues.findIndex(v=>{
              return v == id
            })
            this.selectQues.splice(i,1);
        }else{
            curr.classList.add('active');
            this.selectQues.push(id);
        }

    },
    //获取语言列表
    async getLan(){
      let res = await this.$http.get(this.versionLive2+'user/language_list/');
      if(res.data.code==1){
          this.lanList = res.data.data || [];
          // console.log(this.lanList);
          for(let i=0,len=this.lanList.length;i<len;i++){
            if(this.lanList[i].is_check) this.currLan = this.lanList[i].id;
          }
      }else{

      }
    },
    //获取问题列表
     async getQues(){
      let res = await this.$http.get('/api/live/user/feedback_type_list/');
      if(res.data.code==1){
          this.quesList = res.data.data;
      }else{

      }
    },
    //提交回电问题
    async getCallBack(){
      if(!this.selectQues.length){
        this.$message({
          message: this.$t('home.leftNav[14]'),
          type: 'warming'
        });
        return;
      }
      if(this.currLan<0){
         this.$message({
          message: this.$t('home.leftNav[15]'),
          type: 'warming'
        });
        return;
      }
      if(!this.tel){
        this.$message({
          message: this.$t('home.leftNav[16]'),
          type: 'warming'
        });
        return;
      }
      this.btnLoading = true;
      let res = await this.$http.get('/api/live/user/call_back/',{
        params:{
          type_id:this.selectQues.join(','),
          lang_id:this.currLan,
          issue_phone:this.menuActive,
          phone:this.tel
        }
      })
      this.btnLoading = false;
      this.$message({
          message: res.data.msg,
          type: 'success'
			});
      if(res.data.code==1){
          this.isShowCallTel = false;
      }

    },
    
     pingShow(e) {
      let code = document.querySelector(".line-list");
      code.style.display = "block";
      if(!e.target.className.includes("nav-item")){
        return
      }else{
        // console.log(89898)
        for (var i = 0; i < this.xllinks.length; i++) {
          this.ping(this.xllinks[i].url, i);
        }
      }
      
    },
    
    pingHide() {
      let code = document.querySelector(".line-list");
      code.style.display = "none";
   
    },
    ping(url, i) {
      var responseTime, requestTime, ping;
      requestTime = new Date().getTime();
      // console.log(url)
      this.$http.get(url).then(res => {
        responseTime = new Date().getTime();
        ping = Math.abs(requestTime - responseTime);
        this.xllinks[i].speed =ping;
      });
    },
  },
   computed: {
    ...mapState(["skin"]),
  },
}
</script>

<style scoped lang="less">
.right-nav{
  width: 60px;
  position: fixed;
  right: 0;
  top: 100px;
  z-index: 1000;
  .nav-item{
    width: 60px;
    font-size: 12px;
    color: #445779;
    background: #FFFFFF;
    box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px 0px 0px 6px;
    text-align: center;
    cursor: pointer;
    padding: 6px 0;
    margin-bottom: 10px;
    .icon{
      display: inline-block;
      width: 34px;
      height: 34px;
      &.icon-game{
        background: url('../assets/imgaes/leftFooter/icon-game.png') no-repeat;
        background-size: contain;
      }
       &.pink-icon-game{
        background: url('../assets/imgaes/skin/pink/icon-game.png') no-repeat;
        background-size: contain;
      }
       &.blue-icon-game{
        background: url('../assets/imgaes/skin/blue/icon-game.png') no-repeat;
        background-size: contain;
      }
       &.green-icon-game{
        background: url('../assets/imgaes/skin/green/icon-game.png') no-repeat;
        background-size: contain;
      }
      
      &.icon-line{
        background: url('../assets/imgaes/leftFooter/icon-line.png') no-repeat;
        background-size: contain;
      }
      &.pink-icon-line{
        background: url('../assets/imgaes/skin/pink/icon-line.png') no-repeat;
        background-size: contain;
      }
       &.blue-icon-line{
        background: url('../assets/imgaes/skin/blue/icon-line.png') no-repeat;
        background-size: contain;
      }
       &.green-icon-line{
        background: url('../assets/imgaes/skin/green/icon-line.png') no-repeat;
        background-size: contain;
      }
      &.icon-onlineService{
        background: url('../assets/imgaes/leftFooter/icon-onlineService.png') no-repeat;
        background-size: contain;
      }
      &.pink-icon-onlineService{
        background: url('../assets/imgaes/skin/pink/icon-onlineService.png') no-repeat;
        background-size: contain;
      }
      &.blue-icon-onlineService{
        background: url('../assets/imgaes/skin/blue/icon-onlineService.png') no-repeat;
        background-size: contain;
      }
      &.green-icon-onlineService{
        background: url('../assets/imgaes/skin/green/icon-onlineService.png') no-repeat;
        background-size: contain;
      }
      &.icon-contact{
        background: url('../assets/imgaes/leftFooter/icon-contact.png') no-repeat;
        background-size: contain;
      }
      &.pink-icon-contact{
        background: url('../assets/imgaes/skin/pink/icon-contact.png') no-repeat;
        background-size: contain;
      }
      &.blue-icon-contact{
        background: url('../assets/imgaes/skin/blue/icon-contact.png') no-repeat;
        background-size: contain;
      }
      &.green-icon-contact{
        background: url('../assets/imgaes/skin/green/icon-contact.png') no-repeat;
        background-size: contain;
      }
      &.icon-join{
        background: url('../assets/imgaes/leftFooter/icon-join.png') no-repeat;
        background-size: contain;
      }
      &.pink-icon-join{
        background: url('../assets/imgaes/skin/pink/icon-join.png') no-repeat;
        background-size: contain;
      }
       &.blue-icon-join{
        background: url('../assets/imgaes/skin/blue/icon-join.png') no-repeat;
        background-size: contain;
      }
       &.green-icon-join{
        background: url('../assets/imgaes/skin/green/icon-join.png') no-repeat;
        background-size: contain;
      }
      &.icon-callBack{
        background: url('../assets/imgaes/leftFooter/icon-callBack.png') no-repeat;
        background-size: contain;
      }
       &.pink-icon-callBack{
        background: url('../assets/imgaes/skin/pink/icon-callBack.png') no-repeat;
        background-size: contain;
      }
       &.blue-icon-callBack{
        background: url('../assets/imgaes/skin/blue/icon-callBack.png') no-repeat;
        background-size: contain;
      }
       &.green-icon-callBack{
        background: url('../assets/imgaes/skin/green/icon-callBack.png') no-repeat;
        background-size: contain;
      }
    }
  }
  &.pink-right-nav{
    .nav-item{
      color: #FB7772 !important;
      border: 2px solid #FB7772;
      border-right: none;
      a{
        color: #FB7772 !important;
      }
    }
  }
  &.blue-right-nav{
    .nav-item{
      color: #00B4D8 !important;
      border: 2px solid #00B4D8;
      border-right: none;
      a{
        color: #00B4D8 !important;
      }
    }
  }
  &.green-right-nav{
    .nav-item{
      color: #09B584 !important;
      border: 2px solid #09B584;
      border-right: none;
      a{
        color: #09B584 !important;
      }
    }
  }
  .back-top{
    display: block;
    width: 38px;
    margin: 20px auto 0;
  }
  .franchise-agent{
     position: absolute;
      right:60px;
      top:160px;
      width: 250px;
      height: 400px;
      overflow-y: visible;
      .franchise-agent-box{
        position: absolute;
        right:10px;
        top:10px;
        width: 230px;
        border-radius: 10px;
        max-height:450px;
        overflow-y: hidden;
        background: #fff;
        text-align: left;
        padding-bottom: 10px;
        .contact-number{
          p{
            font-size: 12px;
            height: 30px;
            line-height: 30px;
          }
        }
        p,a{
          height: 50px;
          line-height: 50px;
          margin: 0 10px;
          display: block;
          font-size: 12px;
          i{
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align:middle;
            margin-right: 5px;
            margin-left: 5px;
            &.call-icon{
              background: url('../assets/imgaes/leftFooter/call-icon.png')no-repeat;
              background-size: contain;
              
            }
            &.flygram-icon{
              background: url('../assets/imgaes/leftFooter/zalologo.png')no-repeat;
              background-size: contain;
              
            }
            &.email-icon{
              background: url('../assets/imgaes/extend/kf.png')no-repeat;
              background-size: contain;
            }
          }
        }
        // padding:15px 30px;
        >img{
          width: 95%;
          margin: 0 auto;
          
        }
      }
  }
  .call-back-container{
      position: absolute;
      
      border-radius: 5px;
      right:60px;
      top:172px;
      width: 600px;
      height: 450px;
      overflow-y: visible;
    .call-back-content{
      position: absolute;
      border:2px solid #ccc;
      right:10px;
      top:10px;
      width: 600px;
      border-radius: 10px;
      max-height: 450px;
      overflow-y: auto;
      background: #fff;
      padding:15px 30px;
    }
    .xt{
      content: "";
      position: absolute;
      background: url("../assets/imgaes/leftFooter/nav-f.png") no-repeat;
      background-size: contain;
      width: 9px;
      height: 19px;
      right: 1px;
      top:350px;
    }
    p.tip{
      font-size: 16px;
      color: #999;
    }
    .back-content{
      .back-content-item{
        line-height: 40px;
        input{
          width: 410px;
          height: 40px;
          background: #FFFFFF;
          border: 1px solid #D3D3D3;
          border-radius: 4px;
          color: #CACACA;
          font-size: 16px;
          padding: 0 15px;
        }
        overflow: hidden;
        margin-top: 10px;
        >span{
          font-size: 20px;
          color: #999;
          float: left;
        }
        .type-box{
          float: left;
          width: 400px;
          text-align: left;
          span{
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #999;
            font-size: 16px;
            background: #fff;
            border: 1px solid #D3D3D3;
            border-radius: 4px;
            display: inline-block;
            margin: 0 10px 5px 0;
            cursor: pointer;
            &.active,&:hover{
              background: linear-gradient(90deg, #177AE6, #4BA1FF);
              color: #fff;
            }
          }
        }
        .pink-type{
          span{
            &.active,&:hover{
                background: linear-gradient(90deg, #FB7772 0%, #FF9995 100%);
                color: #fff;
              }
            }
        }
        .blue-type{
          span{
          &.active,&:hover{
              background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%);
              color: #fff;
            }
            }
        }
        .green-type{
            span{
          &.active,&:hover{
              background: linear-gradient(90deg, #08D99D 0%, #00F3AE 100%);
              color: #fff;
            }
            }
        }
      }
    }
    .custom-btn{
        margin-top: 30px;
        background: linear-gradient(90deg, #177AE6, #4BA1FF);color:#fff;
    }
  }
}
  .line-list {
   
    position: fixed;
    right: 141px;
    right: 68px;
    top: 115px;
    width: 118px;
    border-radius: 4px;
    display: none;
    z-index: 1000;
    &:before {
      content: "";
      position: absolute;
      background: url("../assets/imgaes/main/nav-f.png") no-repeat;
      width: 9px;
      height: 19px;
      right: 2px;
      top: 24px;
    }
    ul {
      background: #fff;
      width: 108px;
      border-radius: 4px;
      height: 450px;
      overflow-y: auto;
    }
    li {
      padding: 19px 0 19px 30px;
      border-bottom: 1px solid #f4f5f8;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      &:hover .origin {
        background: #ff1c30;
      }
      &:hover a {
        color: #ff1c30;
      }
    }
    .origin {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      overflow: hidden;
      background: #dddddd;
      margin-right: 9px;
      margin-top: 5px;
    }
  }
</style>
