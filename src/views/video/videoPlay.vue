<template>
  <div class="video-play clearfix">
    <el-container class="main">
      <el-main class="live-left">
        <div style="widht: 100%; height: 582px">
          <video
            id="video2"
            class="
              video-js
              vjs-default-skin vjs-big-play-centered
              video-player
              vjs-custom-skin
            "
            ref="videoPlayer"
            controls
            currentSrc
            muted="false"
            preload="auto"
            :poster="playerOptions.poster"
          >
            <source
              :src="playerOptions.sources[0].src"
              :type="playerOptions.sources[0].type"
            />
          </video>
        </div>
        <div
          id="mse"
          @mouseenter="showLink = true"
          @mouseleave="showLink = false"
          v-show="isShowRtmp == 'isFire'"
        ></div>
        <div class="video-info">
          <!-- <h3>{{videoData.title}}</h3> -->
          <div class="clearfix info-title">
            <h3 :title="videoData.title" class="fl">{{ videoData.title }}</h3>
            <span class="fl" @click="downVideoFunc($event)"
              ><img src="../../assets/imgaes/video/download.png" alt="" />{{$t('videoPlay.text[4]')}}</span
            >
            <span class="fl"
              ><router-link to="/extendReport/3"
                ><img
                  src="../../assets/imgaes/video/video-share.png"
                  alt=""
                />{{$t('videoPlay.text[5]')}}</router-link
              ></span
            >
          </div>
          <div class="info-num">
            <div class="fl">
              <span class="fl play-volume"
                >{{ videoData.reads }} {{$t('videoPlay.text[6]')}}
              </span>
              <span class="fl date">{{
                videoData.shelftime | formatDate2
              }}</span>
              <span
                class="fl collect-status"
                @click="scFuc()"
                v-if="isCollect == 0"
                ><img src="../../assets/imgaes/video/icon-7.png"
              /></span>
              <span
                class="fl collect-status"
                @click="scFuc()"
                v-if="isCollect == 1"
                ><img src="../../assets/imgaes/video/icon_6.png"
              /></span>
            </div>
            <div class="fr info-num-r">
              <span
                class="zan fl"
                :class="islike ? 'active' : ''"
                @click="controlLike($event, 2)"
              >
                <i class="zan-icon"></i>
                <i class="">{{ videoData.praise }}</i>
              </span>
              <span
                class="cai"
                :class="unlike ? 'active' : ''"
                @click="controlLike($event, 3)"
              >
                <i class="cai-icon"></i>
                <i>{{ videoData.tread }}</i>
              </span>
            </div>
          </div>
        </div>
      </el-main>
      <aside class="el-aside live-right">
        <div class="recommend clearfix">
          <span class="fl"
            ><img
              src="../../assets/imgaes/video/icon_6.png"
              alt=""
            />{{$t('videoPlay.text[0]')}}</span
          >
          <span class="fr" @click="changeOne()"
            ><img
              src="../../assets/imgaes/video/icon_2.png"
              alt=""
            />{{$t('videoPlay.text[1]')}}</span
          >
        </div>
        <el-scrollbar
          style="
            height: 540px;
            padding-bottom: 0 !important;
            margin-bottom: 10px;
            position: relative;
          "
        >
          <ul>
            <li v-for="(item, index) in likeList" @click="playMovie(item)">
              <!--<img class="live-r-img fl" :src="item.cover" alt="">-->
              <div class="live-r-img fl">
                <img class="fl" v-lazy="item.cover" alt="" />
              </div>

              <div class="live-r-txt fl">
                <p class="live-r-txt1" :title="item.title">
                  {{ item.title | filterTitle }}
                </p>
                <p class="live-r-txt2">{{$t('videoPlay.text[7]')}}:{{ item.tag | filterTitle }}</p>
                <p class="live-r-txt3">
                  {{$t('videoPlay.text[2]')}}:{{ item.reads | filterOnlineNum }}
                </p>
              </div>
            </li>
            <p class="tips" v-if="changeLoading">{{$t('videoPlay.text[3]')}}...</p>
          </ul>
          <!--                    <div class="gz"></div>-->
        </el-scrollbar>
      </aside>
    </el-container>
    <div class="look-remind" v-show="showRemind">
      <div class="remind-box login-tips">
        <div class="title">Nh???c nh??? ????ng nh???p</div>
        <div class="closeBtn" @click="showRemindColse()"></div>
        <div class="confirm-btn" @click="$store.commit('SETLOGIN', true)">
          {{$t('videoPlay.text[8]')}}
        </div>
        <div class="cancel-btn" @click="showRemindColse()">??????</div>
      </div>
    </div>
   
    <div class="look-remind" v-show="showLogin">
      <div class="remind-box no-login">
        <div class="closeBtn" @click="showLogin = false"></div>
        <p>{{$t('videoPlay.text[8]')}}</p>
        <div class="confirm-btn" @click="$store.commit('SETLOGIN', true)">
          {{$t('videoPlay.text[9]')}}
        </div>
      </div>
    </div>
   
    <Recharge v-if="isRecharge" :show="isRecharge" v-on:childFn="resetFlag" />
    <Excharge v-if="isEX" :showEx="isEX" v-on:childExFn="resetExFlag" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  removeAllactive,
  getSiblings,
  alertServe,
  alertComfirm,
} from "../../assets/js/public";
export default {
  data() {
    return {
      isShowRtmp: null,
      playerOptions: {
        // playbackRates: [0.5, 1.0, 1.5, 2.0], //????????????
        autoplay: false, //??????true,????????????????????????????????????
        muted: false, // ??????????????????????????????????????????
        loop: false, // ???????????????????????????????????????
        preload: "auto", // ??????????????????<video>??????????????????????????????????????????????????????auto???????????????????????????,???????????????????????????????????????????????????
        language: "zh-CN",
        aspectRatio: "16:9", // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????? - ???????????????????????????????????????"16:9"???"4:3"???
        fluid: true, // ???true??????Video.js player?????????????????????????????????????????????????????????????????????????????????
        sources: [
          {
            src: "https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8", //
            type: "application/x-mpegURL",
          },
          // {
          //     src: '//path/to/video.mp4',  // ??????
          //     type: 'video/mp4'  // ??????
          // }, {
          //     src: '//path/to/video.webm',
          //     type: 'video/webm'
          // },
        ],
        poster: "../../static/images/test.jpg", //??????????????????
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "??????????????????????????????????????????", //????????????Video.js????????????????????????????????????????????????
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //????????????
          currentTimeDisplay: true,
          download: true,
          // children:[
          //     {name:'durationDisplay'},//?????????
          //     {name:'currentTimeDisplay'},//?????????????????????
          // ]
        },
        techOrder: ["html5", "flash"], // ????????????
      },
      playSrc: "https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8",
      islike: false,
      unlike: false,
      likeStatus: "",
      likeList: {},
      postData: {
        typeId: "", //?????????
        cid: "", //?????????
        code: this.$store.state.defalutLan,
        limit: 10,
        page: 1,
      },
      changeLoading: false,
      myPlayer: "",
      showRemind: false, //????????????
      qtyRemind: false, //????????????
      isRecharge: false, //??????
      isEX: false, //??????
      videoData: {},
      qtyRemindNum: 0, //????????????
      moviesid: "", //??????id
      praise: "", //??????????????????
      historyTime: "", //??????????????????
      showLogin: false, //
      isCollect: 0, //0 ????????? 1 ?????????
      isSeeTime: false, //????????????
      price: 0,
      dPrice: 0,
      zsMount: 0,
      codeNum: 0,
      isBuy: 0,
    };
  },
  created() {
    this.getVideoPage(); //?????????
    // console.log(this.isCollect)
    // this.getLiveRoom();
      this.$video.addLanguage("zh-CN",{
                "Play": "Ph??t",
                "Pause": "T???m d???ng",
                "Current Time": "Th???i ??i???m hi???n t???i",
                "Duration Time": "Kho???ng th???i gian",
                "Remaining Time": "Th???i gian c??n l???i ",
                "Stream Type": "???????????????",
                "LIVE": "??????",
                "Loaded": "T???i ho??n t???t",
                "Progress": "??????",
                "Fullscreen": "To??n m??n h??nh",
                "Non-Fullscreen": "Tho??t kh???i m??n h??nh",
                "Mute": "Im l???ng",
                "Unmute": "H???y im l???ng",
                "Playback Rate": "????????????",
                "Subtitles": "Ph??? ?????",
                "subtitles off": " T???t ph??? ????? ",
                "Captions": "????????????",
                "captions off": "??????????????????",
                "Chapters": "??o???n ch????ng tr??nh",
                "You aborted the media playback": "D???ng ph??t video",
                "A network error caused the media download to fail part-way.": "L???i m???ng khi???n qu?? tr??nh t???i xu???ng video kh??ng th??nh c??ng.",
                "The media could not be loaded, either because the server or network failed or because the format is not supported.": this.$t("videoPlay.videoText[0]"),
                "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "Do t???p video b??? h???ng ho???c video s??? d???ng t??nh n??ng m?? tr??nh duy???t c???a b???n kh??ng h??? tr???, vi???c ph??t b??? ch???m d???t.",
                "No compatible source was found for this media.": "Kh??ng th??? t??m th???y ngu???n t????ng th??ch cho video n??y.",
                "The media is encrypted and we do not have the keys to decrypt it.": "?????????????????????????????????"
                });
  },
  beforeDestroy: function () {
    if (this.myPlayer) {
      this.myPlayer.dispose();
    }
  },
  filters: {
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "???";
      }
      return n;
    },
    filterTitle(n) {
      if (n.length > 18) {
        return n.substring(0, 16) + "...";
      } else {
        return n;
      }
    },
  },
  watch: {},
  mounted() {
    // this.isMyPlayer();//??????????????????
    // this.key();
    // let blobUrl = window.URL.createObjectURL(this.playerOptions.sources[0].src)
    // let link = document.createElement('a')
    // document.body.appendChild(link)
    // link.style.display = 'none'
    // link.href = blobUrl
    // // ??????a???????????????????????????????????????????????????????????????????????????????????????????????????
    // link.download = '????????????.csv'
    // // ?????????click??????
    // link.click()
    // document.body.removeChild(link)
    // window.URL.revokeObjectURL(blobUrl);
  },
  methods: {
    ...mapMutations(["SETDIAMOND"]),
    //download
    downVideoFunc(e) {
      //??????mp4??????
      window.location = this.videoData.down_url;
      //    if(this.isBuy == 1){
      //        console.log(e)
      //      window.location = this.videoData.down_url;
      //    }else{
      //          this.$confirm('????????????????????????????????????????????????????????????','??????', {
      //             confirmButtonText: '????????????',
      //             cancelButtonText: '??????',
      //             confirmButtonClass:'toRechargeButton',
      //             cancelButtonClass:'backButton',
      //             roundButton:true,
      //             customClass:'yqmBox',
      //             center: true,
      //             showCancelButton:true,
      //             dangerouslyUseHTMLString:true
      //         }).then(() => {
      //             this.bugVideo();
      //         }).catch(() => {

      //         });
      //    }
    },
    async getVideoList(type, cid) {
      // let res = await this.$http.post('/video/domestic', {
      let d = this.globalPpproach.checkIsEncrypt({
        typeId: this.postData.typeId, //?????????
        cid: this.postData.cid, //?????????
        code: this.postData.code,
        page: this.postData.page, //?????????
        limit: this.postData.limit, //???????????????
      });
      let res = await this.$http.post("/api/live/movie/domestic/", { typeId: this.postData.typeId, //?????????
        cid: this.postData.cid, //?????????
        code: this.postData.code,
        page: this.postData.page, //?????????
        limit: this.postData.limit, //???????????????
      });
      if (res && res.data.code == 1) {
        this.likeList = res.data.data;
      }
    },
    //??????/?????????
    async controlLike(e, type) {
      //???????????????
      if (!this.$store.state.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      this.moviesid = this.videoData.id;
      this.praise = type;
      console.log(type);
      // let res = await this.$http.post('/video/ISPraise',{
      //     praise:type,//???????????? ????????? 0????????? 1?????????
      //     moviesid:this.videoData.id //??????id
      let d = this.globalPpproach.checkIsEncrypt({
             action: type, //???????????? ????????? 0????????? 1?????????
             movie_id: this.videoData.id, //??????id
            });
      let res = await this.$http.post("/api/live/movie/movie_action/", {
         action: type, //???????????? ????????? 0????????? 1?????????
             movie_id: this.videoData.id, //??????id
      });
      if (res && res.data.code == 1) {
        console.log(res.data.data);
        this.videoData.tread = res.data.data.tread;
        this.videoData.praise = res.data.data.praise;
        //??????????????????????????????

        if (type == 2) {
          this.islike = true;
          this.unlike = false;
        } else {
          this.unlike = true;
          this.islike = false;
        }
        let curr = e.target.parentNode;
        /*  console.log(e.target.parentNode);
                    console.log(curr.className.includes('active'));*/

        if (curr.className.includes("active")) {
          curr.classList.remove("active");
        } else {
          curr.classList.add("active");
        }
      }
    },
    //??????????????????
    // async getPraiseStatus(){
    //     if(!this.codeToken) return ;
    //     let res = await this.$http.post('/video/beforeISPraise',{
    //         userid:this.username,//?????????
    //         moviesid:this.videoData.id //??????id
    //     });
    //     if(res && res.data.code==1){
    //         console.log(res.data.data.state);
    //         /* if(res.data.data.state == 0){
    //              this.likeStatus = '';
    //          }else if(res.data.data.state == 1){
    //              this.likeStatus =1;
    //              this.islike = res.data.data.state==1?true:false;
    //          }else if(res.data.data.state == 2){
    //           this.unlike = res.data.data.state==2?true:false;
    //              this.likeStatus =0;
    //          }*/

    //         //??????????????????????????????
    //         this.islike = res.data.data.is_zan==1?true:false;
    //         this.unlike = res.data.data.is_zan==2?true:false;
    //         this.videoData.tread = res.data.data.tread;
    //         this.videoData.praise = res.data.data.praise;

    //     }
    // },
    async changeOne(v) {
      //?????????
      this.postData.page++;
      this.changeLoading = true;
      
      let res = await this.$http.post("/api/live/movie/domestic/", { typeId: this.postData.typeId, //?????????
        cid: this.postData.cid, //?????????
        code: this.postData.code,
        page: this.postData.page, //?????????
        limit: this.postData.limit, //???????????????
      });
      this.changeLoading = false;
      if (res && res.data.code == 1) {
        this.likeList = res.data.data;
      }
    },

    //??????
    playMovie(v) {
      console.log(v);
      this.getVideoPage(v.id, true); //?????????
      localStorage.setItem("vTime", JSON.stringify(""));
      //  console.log(this.playerOptions.sources[0].src)
      //  this.myPlayer.src(this.playerOptions.sources[0].src);
      //  this.myPlayer.posterImage.setSrc(this.playerOptions.poster);
      this.myPlayer.load();
      this.myPlayer.play();
    },
    // ??????
    key() {
      var time = 15;
      var vol = 0.1;
      var _this = this;
      document.onkeydown = function (e) {
        var currentTime1 = _this.myPlayer.currentTime();
        var volume = _this.myPlayer.volume();
        if (e.keyCode === 32) {
          //?????? ??????
          if (_this.myPlayer.pause()) {
            _this.myPlayer.play();
          }
          if (_this.myPlayer.play()) {
            _this.myPlayer.pause();
          }
        } else if (e && e.keyCode === 37) {
          //??? ??????
          //   console.log(_this.myPlayer.currentTime())

          currentTime1 != 0 ? (currentTime1 -= time) : 1;
          _this.myPlayer.currentTime(currentTime1);
        } else if (e && e.keyCode === 38) {
          //??? +??????

          volume <= 0 ? (volume += vol) : 0;
          _this.myPlayer.volume(volume);
        } else if (e && e.keyCode === 39) {
          //??? ??????

          currentTime1 >= 0 ? (currentTime1 += time) : 0;
          _this.myPlayer.currentTime(currentTime1);
        } else if (e && e.keyCode === 40) {
          //??? -??????

          volume != 0 ? (volume -= vol) : 1;
          _this.myPlayer.volume(volume);
        }
        // console.log(volume)
      };
    },
    isMyPlayer(id) {
      this.notLogin();
      const _this = this;
      _this.myPlayer = videojs("video2", _this.playerOptions, function () {
        // this.load();
        // this.pause();//??????
        // _this.historyTime = localStorage.getItem('vTime');
        // if(_this.historyTime){
        //     this.currentTime(_this.historyTime);
        // }
        //this.play();
        //this.pause();//??????
        // this.on('play', function() {
        //     if(_this.codeNum == -1){
        //          _this.isSeeTime = true;
        //         this.pause();
        //         return;
        //     }

        // });
        if (!_this.codeToken) {
          this.on("timeupdate", function () {
            var currentTime = this.currentTime();
            if (currentTime >= 60) {
              this.pause();
              localStorage.setItem("vTime", JSON.stringify(currentTime));
              _this.showLogin = true;
              return;
            }
          });
        } else {
          _this.historyTime = localStorage.getItem("vTime");
          if (_this.historyTime) {
            this.currentTime(_this.historyTime);
          }
          localStorage.setItem("vTime", JSON.stringify(""));
        }
      });

      // _this.myPlayer.off('timeupdate'); //??????timeupdate??????
      // _this.myPlayer.reset(); //?????? video
      // _this.myPlayer.src([{
      //     type: 'application/x-mpegURL',
      //     src: _this.currentSrc
      // }]);
      // _this.myPlayer.load( _this.currentSrc);
      // _this.myPlayer.play();
      // console.log(_this.myPlayer)
    },
    notLogin: function () {
      if (!this.$store.state.codeToken) {
        this.showRemind = true;
        return;
      }
      // console.log(this.codeNum)
    },
    testLook: function () {
      //??????
      this.showRemind = false;
      var currentTime = this.myPlayer.currentTime();
      // window.loopMarquee = setInterval(function(){
      console.log(currentTime);

      //     if(currentTime >= 60){
      //         this.myPlayer.pause();
      //         alertComfirm({ msg: "????ng nh???p ????? xem phi??n b???n ?????y ?????" }, () => {
      //             this.$store.commit('SETLOGIN',true);
      //         });
      //         return;
      //         //$(".gobuy").fadeIn(200);
      //     }
      // },500) // ?????????500???????????????
    },
    showRemindColse: function () {
      // ????????????
      this.showRemind = false;
    },
    goRecharge() {
      //??????????????????
      //??????????????????
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //??????
      this.isEX = false;
      this.isRecharge = true;
    },
    async goExcharge() {
      //??????????????????
      //??????
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //????????????????????????  ?????? ???????????????
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      if (res && res.data.code == 1) {
        this.isEX = true;
        this.isRecharge = false;
      } else if (res && res.data.code == 2) {
        alertComfirm(
          { msg: "B???n ch??a ?????t m???t kh???u thanh to??n", conBtText: "C??i ?????t ngay" },
          () => {
            this.$router.push("/setting");
          }
        );
      } else if (res && res.data.code == 10) {
        alertServe();
      }
    },
    resetFlag(flag) {
      //??????????????????
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      //??????????????????
      this.isEX = flag;
    },
    getLiveRoom() {
      this.$http
        .get(this.versionLive2 + "/api/v1_1/live/get_live_room", {
          params: {
            anchor_id: 100295,
            user_id: 3,
            client_ip: sessionStorage.getItem("ip"),
          },
        })
        .then((res) => {
          this.playerOptions.sources[0].src =
            res.data.data.liveInfo[2].liveUrl.originPullUrl;
          this.playerOptions.poster = res.data.data.cover;
          this.isMyPlayer();
          this.myPlayer.src(this.playerOptions.sources[0].src);
          this.myPlayer.posterImage.setSrc(this.playerOptions.poster);
          console.log(this.playerOptions.sources[0].src);
        })
        .catch((err) => {
          // this.$vux.loading.hide();
        });
    },
    //???????????????
    async getVideoPage(id, flag) {
      //    let res = await this.$http.post('/video/playFullPage',{
      //       moviesid:id || this.$route.params.id - 0
      //     });
      let d = this.globalPpproach.checkIsEncrypt(
        {
        movie_id: id || this.$route.params.id - 0,
        language:this.defalutLan
        },true
        
      );
      //console.log('11')
      let res = await this.$http.post("/api/live/movie/get_movie_detail/",{
                  movie_id: id || this.$route.params.id - 0,
                  language:this.defalutLan
                });
      if (res && res.data.code == 1) {
        this.videoData = res.data.data;
        //console.log(this.videoData)
        this.codeNum = res.data.code;
        this.playerOptions.sources[0].src = res.data.data.play_url;
        this.playerOptions.poster = res.data.data.cover;
        this.postData.typeId = this.videoData.type;
        this.postData.cid = this.videoData.cid;
        if (!flag) this.likeList = res.data.data.guseelist; //????????????
        //??????????????????????????????
        this.islike = res.data.data.is_zan == 1 ? true : false;
        this.unlike = res.data.data.is_cai == 1 ? true : false;
        this.videoData.tread = res.data.data.tread;
        this.videoData.praise = res.data.data.praise;
        this.isCollect = res.data.data.is_collect;
        //    localStorage.setItem('vUrl',JSON.stringify(this.playerOptions.sources[0].src));
        this.isMyPlayer();
        this.myPlayer.src(this.playerOptions.sources[0].src);
        this.myPlayer.posterImage.setSrc(this.playerOptions.poster);
        //    this.isBuy = res.data.data.is_buy;

        //    this.myPlayer.load();
        //    this.myPlayer.play();
      }
      // else if(res.data.code == -1 && res.data.data.is_buy == 0){
      //    this.dPrice = res.data.data.discount_price;
      //    this.price = res.data.data.price;
      // //    this.isSeeTime = true;
      //    this.videoData = res.data.data;
      //    this.codeNum = res.data.code;
      //    this.playerOptions.sources[0].src = res.data.data.play_url;
      //    this.playerOptions.poster = res.data.data.cover;
      //    this.postData.typeId = this.videoData.type;
      //    this.postData.cid = this.videoData.cid;
      //     if(!flag) this.likeList = res.data.data.guseelist;//????????????
      // //     //??????????????????????????????
      //    this.islike = res.data.data.is_zan==1?true:false;
      //    this.unlike = res.data.data.is_zan==0?true:false;
      //    this.videoData.tread = res.data.data.tread;
      //    this.videoData.praise = res.data.data.praise;
      //    this.isCollect = res.data.data.is_collect;
      // //    this.isBuy = res.data.data.is_buy;
      // // //    localStorage.setItem('vUrl',JSON.stringify(this.playerOptions.sources[0].src));
      //    this.isMyPlayer();
      //    this.myPlayer.src(this.playerOptions.sources[0].src);
      //    this.myPlayer.posterImage.setSrc(this.playerOptions.poster);
      // }
      else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    //??????
    async bugVideo() {
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        // alertComfirm({ msg: "????ng nh???p ????? xem phi??n b???n ?????y ?????" }, () => {
        //   this.$store.commit("SETLOGIN", true);
        // });
        return;
      }
      // let res = await this.$http.post('/video/buymovie',{
      //     movie:this.videoData.id //??????id
      // })
       let d = this.globalPpproach.checkIsEncrypt(
        {
         movie_id: this.videoData.id, //??????id
        action: 4,
        },
        
      );
      let res = await this.$http.post("/api/live/movie/movie_action/", {
         movie_id: this.videoData.id, //??????id
        action: 4,
        },);
      if (res && res.data.code == 1) {
        this.codeNum = 1;
        this.isMyPlayer();
        this.isSeeTime = false;
        this.isBuy = 1;
        // this.zsQuest();
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    //??????
    async scFuc() {
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        // alertComfirm({ msg: "????ng nh???p ????? xem phi??n b???n ?????y ?????" }, () => {
        //   this.$store.commit("SETLOGIN", true);
        // });
        return;
      }
      // let res = await this.$http.post('/video/collect', {
      //     movie: this.videoData.id //??????id
      // });
      console.log(this.videoData.id);
      let d = this.globalPpproach.checkIsEncrypt(
        {
        movie_id: this.videoData.id, //??????id
        action: 5,
        },
        
      );
      let res = await this.$http.post("/api/live/movie/movie_action/",   {
        movie_id: this.videoData.id, //??????id
        action: 5,
        },);
      if (res && res.data.code == 1) {
        //????????????
        // if(this.videoData.iscollect){
        //     this.videoData.iscollect = 0;
        // }else{
        //     this.videoData.iscollect = 1;
        // }
        if (res.data.data.is_collect == 1) {
          console.log(res.data.data.is_collect);
          this.isCollect = 1;
          this.$message({
            message: res.data.msg,
            type: "success",
          });
        } else {
          console.log(res.data.data.is_collect);
          this.isCollect = 0;
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    zsQuest() {
      // ????????????/api/v1/user/diamond_now/
      if (!this.codeToken) return;
      if (this.$store.state.userinfo.user_id < 0) return;
      // this.zsMount = "loading...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.userinfo.user_id
        ) //?????????????????????
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.zsMount = 0;
            } else {
              this.zsMount = res.data.data.diamond;
            }
            this.SETDIAMOND(this.zsMount);
          }
        });
    },
  },
  computed: {
    ...mapState([
      "username",
      "codeToken",
      "userinfo",
      "avatar",
      "balance",
      "vip",
      "diamond",
      "chatRecharge",
    ]),
  },
};
</script>

<style scoped lang="less">
.el-container {
  margin-bottom: 130px !important;
}
.live-left {
  width: 894px;
  .video-player {
    width: 100%;
    height: 580px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .vjs-big-play-centered {
    margin: 0 auto;
  }
  .video-info {
    .info-title {
      padding: 18px 0;
      line-height: 30px;
      span {
        font-weight: bold;
        font-size: 14px;
        color: #333;
        margin-right: 10px;
        line-height: 32px;
        padding-top: 20px;
        cursor: pointer;
        a {
          display: block;
          color: #333;
        }
        img {
          width: 22px;
          height: 22px;
          margin-right: 8px;
          margin-top: -2px;
        }
      }
    }
    h3 {
      line-height: 34px;
      font-weight: bold;
      font-size: 24px;
      color: #333;
      // max-width: 675px;
      width: 635px;
      overflow: hidden; //?????????????????????
      text-overflow: ellipsis; //????????????????????????
      white-space: nowrap; //???????????????
      margin-right: 5px;
    }
    .info-num {
      font-size: 18px;
      color: #333;
      .play-volume {
        margin-right: 20px;
      }
      .collect-status {
        width: 26px;
        height: 23px;
        margin-left: 20px;
        display: block;
        margin-top: -3px;
        cursor: pointer;
      }
      .info-num-r {
        cursor: pointer;
        .zan {
          .zan-icon {
            width: 24px;
            height: 24px;
            float: left;
            margin-right: 8px;
            background: url("../../assets/imgaes/video/xinxiqu_icon_dianzhan_nor.png")
              no-repeat;
            background-size: 100% 100%;
          }
          &.active {
            .zan-icon {
              background: url("../../assets/imgaes/video/xinxiqu_icon_dianzhan_sel .png")
                no-repeat;
            }
          }
        }
        .cai {
          .cai-icon {
            width: 24px;
            height: 24px;
            float: left;
            margin-right: 8px;

            background: url("../../assets/imgaes/video/xinxiqu_icon_dianzhan_nor2.png")
              no-repeat;
            background-size: 100% 100%;
          }
          &.active {
            .cai-icon {
              background: url("../../assets/imgaes/video/xinxiqu_icon_dianzhan_se2l.png")
                no-repeat;
            }
          }
        }
        i {
          display: inline-block;
          line-height: 25px;
          float: left;
          padding-top: 2px;
        }
        .zan {
          margin-right: 16px;
        }
      }
    }
  }
}
.live-right {
  width: 285px;
  margin-top: 20px;
  position: relative;
  .recommend {
    font-size: 16px;
    color: #333;
    padding-bottom: 16px;
    span {
      line-height: 23px;
      img {
        margin-right: 10px;
      }
      &.fr {
        cursor: pointer;
      }
    }
  }
  ul {
    li {
      height: 120px;
      padding: 1px;
      background: #fff;
      margin-bottom: 10px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      border: 1px solid #fff;
      cursor: pointer;
      &:last-of-type {
        margin-bottom: 0;
      }
      &:hover {
        border: 1px solid #1486ff;
      }
      &.active {
        border: 1px solid #1486ff;
      }
      .live-r-img {
        width: 155px;
        height: 117px;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
        margin-right: 10px;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .live-r-txt {
        width: 116px;
        color: #333;
        cursor: pointer;
        p {
          padding-top: 10px;
          padding-left: 5px;
          &.live-r-txt1 {
            font-weight: bold;
            padding-left: 0;
          }
        }
      }
    }
  }
  .tips {
    height: 580px;
    font-size: 18px;
    color: #333;
    text-align: center;
    background: #fff;
    padding-top: 150px;
  }
  .gz {
    position: absolute;
    width: 100%;
    height: 50px;
    background-image: linear-gradient(
      to bottom,
      rgba(51, 51, 51, 1),
      rgba(51, 51, 51, 0)
    );
    border-radius: 4px;
    opacity: 0.5;
    bottom: 0;
    left: 2px;
  }
}
.look-remind {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  .remind-box {
    width: 440px;
    height: 281px;
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .title {
      font-weight: bold;
      font-size: 24px;
      color: #222221;
      padding-top: 30px;
    }
    .closeBtn {
      width: 14px;
      height: 15px;
      background: url("../../assets/imgaes/gb_button_6_6.png") no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      position: absolute;
      top: 29px;
      right: 30px;
    }
    &.login-tips {
      .confirm-btn {
        width: 401px;
        height: 59px;
        line-height: 59px;
        font-size: 18px;
        color: #fff;
        background: #ff1c30;
        text-align: center;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        border-radius: 45px;
        margin: 46px auto 20px;
        cursor: pointer;
      }
      .cancel-btn {
        width: 401px;
        height: 59px;
        line-height: 59px;
        font-size: 18px;
        color: #333;
        background: #eee;
        text-align: center;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        border-radius: 45px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    &.qty-tips {
      .text {
        line-height: 25px;
        font-size: 18px;
        color: #333;
        padding: 39px 30px 35px;
      }
      .buy-btn {
        width: 181px;
        height: 59px;
        line-height: 59px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        background: #ff1c30;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        border-radius: 45px;
        margin: 0 39px 0 19px;
        cursor: pointer;
      }
      .recharge-btn {
        width: 181px;
        height: 59px;
        line-height: 59px;
        font-size: 18px;
        color: #333;
        background: #eee;
        text-align: center;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
        border-radius: 45px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }
  .no-login {
    width: 320px;
    height: 203px;
    padding-bottom: 30px;
    font-size: 16px;
    text-align: center;
    padding-top: 40px;
    p {
      height: 64px;
      line-height: 64px;
      margin: 10px 0;
    }
    .confirm-btn {
      width: 240px;
      height: 42px;
      margin: 0 auto;
      line-height: 42px;
      cursor: pointer;
      border-radius: 45px;
      text-align: center;
      color: #fff;
      background: #ff1c30 !important;
    }
  }
}
.time-out-tip {
  .remind-box {
    width: 440px;
    padding: 0 20px;
    font-size: 18px;
    text-align: center;
    p {
      line-height: 35px;
      padding-top: 15px;
      width: 85%;
      margin: 0 auto;
    }
    .confirm-btn {
      width: 181px;
      height: 59px;
      margin: 0 auto;
      line-height: 59px;
      cursor: pointer;
      border-radius: 45px;
      text-align: center;
      color: #333;
      background: #eee !important;
    }
    .cancel-btn {
      width: 181px;
      height: 59px;
      margin: 0 auto;
      line-height: 59px;
      cursor: pointer;
      border-radius: 45px;
      text-align: center;
      color: #fff;
      background: #ff1c30 !important;
    }
    i {
      color: #ff1c30;
    }
  }
}
</style>