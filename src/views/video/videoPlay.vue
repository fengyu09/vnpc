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
        <div class="title">Nhắc nhở đăng nhập</div>
        <div class="closeBtn" @click="showRemindColse()"></div>
        <div class="confirm-btn" @click="$store.commit('SETLOGIN', true)">
          {{$t('videoPlay.text[8]')}}
        </div>
        <div class="cancel-btn" @click="showRemindColse()">试看</div>
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
        // playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: "https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8", //
            type: "application/x-mpegURL",
          },
          // {
          //     src: '//path/to/video.mp4',  // 路径
          //     type: 'video/mp4'  // 类型
          // }, {
          //     src: '//path/to/video.webm',
          //     type: 'video/webm'
          // },
        ],
        poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
          currentTimeDisplay: true,
          download: true,
          // children:[
          //     {name:'durationDisplay'},//总时间
          //     {name:'currentTimeDisplay'},//当前已播放时间
          // ]
        },
        techOrder: ["html5", "flash"], // 兼容顺序
      },
      playSrc: "https://awscdn.aipianku.com/vod/20200806/s480/playlist.m3u8",
      islike: false,
      unlike: false,
      likeStatus: "",
      likeList: {},
      postData: {
        typeId: "", //大分类
        cid: "", //小分类
        code: this.$store.state.defalutLan,
        limit: 10,
        page: 1,
      },
      changeLoading: false,
      myPlayer: "",
      showRemind: false, //登录提示
      qtyRemind: false, //次数提示
      isRecharge: false, //充值
      isEX: false, //兑换
      videoData: {},
      qtyRemindNum: 0, //次数累计
      moviesid: "", //影片id
      praise: "", //是否点了踩赞
      historyTime: "", //历史播放时间
      showLogin: false, //
      isCollect: 0, //0 未收藏 1 已收藏
      isSeeTime: false, //观影次数
      price: 0,
      dPrice: 0,
      zsMount: 0,
      codeNum: 0,
      isBuy: 0,
    };
  },
  created() {
    this.getVideoPage(); //播放页
    // console.log(this.isCollect)
    // this.getLiveRoom();
      this.$video.addLanguage("zh-CN",{
                "Play": "Phát",
                "Pause": "Tạm dừng",
                "Current Time": "Thời điểm hiện tại",
                "Duration Time": "Khoảng thời gian",
                "Remaining Time": "Thời gian còn lại ",
                "Stream Type": "媒体流类型",
                "LIVE": "直播",
                "Loaded": "Tải hoàn tất",
                "Progress": "进度",
                "Fullscreen": "Toàn màn hình",
                "Non-Fullscreen": "Thoát khỏi màn hình",
                "Mute": "Im lặng",
                "Unmute": "Hủy im lặng",
                "Playback Rate": "播放码率",
                "Subtitles": "Phụ đề",
                "subtitles off": " Tắt phụ đề ",
                "Captions": "内嵌字幕",
                "captions off": "内嵌字幕关闭",
                "Chapters": "Đoạn chương trình",
                "You aborted the media playback": "Dừng phát video",
                "A network error caused the media download to fail part-way.": "Lỗi mạng khiến quá trình tải xuống video không thành công.",
                "The media could not be loaded, either because the server or network failed or because the format is not supported.": this.$t("videoPlay.videoText[0]"),
                "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "Do tệp video bị hỏng hoặc video sử dụng tính năng mà trình duyệt của bạn không hỗ trợ, việc phát bị chấm dứt.",
                "No compatible source was found for this media.": "Không thể tìm thấy nguồn tương thích cho video này.",
                "The media is encrypted and we do not have the keys to decrypt it.": "视频已加密，无法解密。"
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
        return n / 10000 + "万";
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
    // this.isMyPlayer();//初始化播放器
    // this.key();
    // let blobUrl = window.URL.createObjectURL(this.playerOptions.sources[0].src)
    // let link = document.createElement('a')
    // document.body.appendChild(link)
    // link.style.display = 'none'
    // link.href = blobUrl
    // // 设置a标签的下载属性，设置文件名及格式，后缀名最好让后端在数据格式中返回
    // link.download = '下载文件.csv'
    // // 自触发click事件
    // link.click()
    // document.body.removeChild(link)
    // window.URL.revokeObjectURL(blobUrl);
  },
  methods: {
    ...mapMutations(["SETDIAMOND"]),
    //download
    downVideoFunc(e) {
      //需要mp4地址
      window.location = this.videoData.down_url;
      //    if(this.isBuy == 1){
      //        console.log(e)
      //      window.location = this.videoData.down_url;
      //    }else{
      //          this.$confirm('尊敬的会员，购买该影片之后才可以下载哦！','提示', {
      //             confirmButtonText: '马上购买',
      //             cancelButtonText: '取消',
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
        typeId: this.postData.typeId, //大分类
        cid: this.postData.cid, //小分类
        code: this.postData.code,
        page: this.postData.page, //第几页
        limit: this.postData.limit, //每页多少条
      });
      let res = await this.$http.post("/api/live/movie/domestic/", { typeId: this.postData.typeId, //大分类
        cid: this.postData.cid, //小分类
        code: this.postData.code,
        page: this.postData.page, //第几页
        limit: this.postData.limit, //每页多少条
      });
      if (res && res.data.code == 1) {
        this.likeList = res.data.data;
      }
    },
    //点赞/踩动作
    async controlLike(e, type) {
      //是否有登录
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
      //     praise:type,//是否点赞 固定值 0：点踩 1：点赞
      //     moviesid:this.videoData.id //影片id
      let d = this.globalPpproach.checkIsEncrypt({
             action: type, //是否点赞 固定值 0：点踩 1：点赞
             movie_id: this.videoData.id, //影片id
            });
      let res = await this.$http.post("/api/live/movie/movie_action/", {
         action: type, //是否点赞 固定值 0：点踩 1：点赞
             movie_id: this.videoData.id, //影片id
      });
      if (res && res.data.code == 1) {
        console.log(res.data.data);
        this.videoData.tread = res.data.data.tread;
        this.videoData.praise = res.data.data.praise;
        //改变点赞和点踩的样式

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
    //获取点赞状态
    // async getPraiseStatus(){
    //     if(!this.codeToken) return ;
    //     let res = await this.$http.post('/video/beforeISPraise',{
    //         userid:this.username,//用户名
    //         moviesid:this.videoData.id //影片id
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

    //         //改变点赞和点踩的样式
    //         this.islike = res.data.data.is_zan==1?true:false;
    //         this.unlike = res.data.data.is_zan==2?true:false;
    //         this.videoData.tread = res.data.data.tread;
    //         this.videoData.praise = res.data.data.praise;

    //     }
    // },
    async changeOne(v) {
      //换一批
      this.postData.page++;
      this.changeLoading = true;
      
      let res = await this.$http.post("/api/live/movie/domestic/", { typeId: this.postData.typeId, //大分类
        cid: this.postData.cid, //小分类
        code: this.postData.code,
        page: this.postData.page, //第几页
        limit: this.postData.limit, //每页多少条
      });
      this.changeLoading = false;
      if (res && res.data.code == 1) {
        this.likeList = res.data.data;
      }
    },

    //切换
    playMovie(v) {
      console.log(v);
      this.getVideoPage(v.id, true); //播放页
      localStorage.setItem("vTime", JSON.stringify(""));
      //  console.log(this.playerOptions.sources[0].src)
      //  this.myPlayer.src(this.playerOptions.sources[0].src);
      //  this.myPlayer.posterImage.setSrc(this.playerOptions.poster);
      this.myPlayer.load();
      this.myPlayer.play();
    },
    // 键盘
    key() {
      var time = 15;
      var vol = 0.1;
      var _this = this;
      document.onkeydown = function (e) {
        var currentTime1 = _this.myPlayer.currentTime();
        var volume = _this.myPlayer.volume();
        if (e.keyCode === 32) {
          //空格 暂停
          if (_this.myPlayer.pause()) {
            _this.myPlayer.play();
          }
          if (_this.myPlayer.play()) {
            _this.myPlayer.pause();
          }
        } else if (e && e.keyCode === 37) {
          //左 快退
          //   console.log(_this.myPlayer.currentTime())

          currentTime1 != 0 ? (currentTime1 -= time) : 1;
          _this.myPlayer.currentTime(currentTime1);
        } else if (e && e.keyCode === 38) {
          //上 +音量

          volume <= 0 ? (volume += vol) : 0;
          _this.myPlayer.volume(volume);
        } else if (e && e.keyCode === 39) {
          //右 快进

          currentTime1 >= 0 ? (currentTime1 += time) : 0;
          _this.myPlayer.currentTime(currentTime1);
        } else if (e && e.keyCode === 40) {
          //下 -音量

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
        // this.pause();//暂停
        // _this.historyTime = localStorage.getItem('vTime');
        // if(_this.historyTime){
        //     this.currentTime(_this.historyTime);
        // }
        //this.play();
        //this.pause();//暂停
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

      // _this.myPlayer.off('timeupdate'); //移除timeupdate事件
      // _this.myPlayer.reset(); //重置 video
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
      //试看
      this.showRemind = false;
      var currentTime = this.myPlayer.currentTime();
      // window.loopMarquee = setInterval(function(){
      console.log(currentTime);

      //     if(currentTime >= 60){
      //         this.myPlayer.pause();
      //         alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
      //             this.$store.commit('SETLOGIN',true);
      //         });
      //         return;
      //         //$(".gobuy").fadeIn(200);
      //     }
      // },500) // 设置每500秒查询一次
    },
    showRemindColse: function () {
      // 弹窗关闭
      this.showRemind = false;
    },
    goRecharge() {
      //弹窗充值按钮
      //是否已经登录
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //充值
      this.isEX = false;
      this.isRecharge = true;
    },
    async goExcharge() {
      //弹窗兑换按钮
      //登录
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //是否设置支付密码  或者 账号被冻结
      let res = await this.$http.get("/api/user/chkexistsfundpwd");
      if (res && res.data.code == 1) {
        this.isEX = true;
        this.isRecharge = false;
      } else if (res && res.data.code == 2) {
        alertComfirm(
          { msg: "Bạn chưa đặt mật khẩu thanh toán", conBtText: "Cài đặt ngay" },
          () => {
            this.$router.push("/setting");
          }
        );
      } else if (res && res.data.code == 10) {
        alertServe();
      }
    },
    resetFlag(flag) {
      //充值弹窗关闭
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      //兑换弹窗关闭
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
    //获取播放页
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
        if (!flag) this.likeList = res.data.data.guseelist; //推荐列表
        //改变点赞和点踩的样式
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
      //     if(!flag) this.likeList = res.data.data.guseelist;//推荐列表
      // //     //改变点赞和点踩的样式
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
    //购买
    async bugVideo() {
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        // alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
        //   this.$store.commit("SETLOGIN", true);
        // });
        return;
      }
      // let res = await this.$http.post('/video/buymovie',{
      //     movie:this.videoData.id //影片id
      // })
       let d = this.globalPpproach.checkIsEncrypt(
        {
         movie_id: this.videoData.id, //影片id
        action: 4,
        },
        
      );
      let res = await this.$http.post("/api/live/movie/movie_action/", {
         movie_id: this.videoData.id, //影片id
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
    //收藏
    async scFuc() {
      if (!this.codeToken) {
         alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        // alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
        //   this.$store.commit("SETLOGIN", true);
        // });
        return;
      }
      // let res = await this.$http.post('/video/collect', {
      //     movie: this.videoData.id //影片id
      // });
      console.log(this.videoData.id);
      let d = this.globalPpproach.checkIsEncrypt(
        {
        movie_id: this.videoData.id, //影片id
        action: 5,
        },
        
      );
      let res = await this.$http.post("/api/live/movie/movie_action/",   {
        movie_id: this.videoData.id, //影片id
        action: 5,
        },);
      if (res && res.data.code == 1) {
        //改变状态
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
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.codeToken) return;
      if (this.$store.state.userinfo.user_id < 0) return;
      // this.zsMount = "loading...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.userinfo.user_id
        ) //这个接口还没好
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
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
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