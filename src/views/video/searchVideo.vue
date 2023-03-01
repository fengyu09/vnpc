<template>
  <div class="video-search main clearfix">
    <ul class="video-menu clearfix">
      <li class="fl first">{{$t('searchVideo.text[0]')}}</li>
      <ul class="menu-list1 fl">
        <li class="fl"
           :class="[{active:menuActive1==item.typeId},{'pink-color-border':skin==1&&menuActive1==item.typeId},{'blue-color-border':skin==2&&menuActive1==item.typeId},{'green-color-border':skin==3&&menuActive1==item.typeId}]"
          v-for="(item, index) in videoMenu1"
          @click="changeMenu1(item)"
        >
          {{ item.name }}
        </li>
      </ul>
      <li class="fr search-box">
        <el-dropdown trigger="click" placement="top">
          <div class="fl input-bg">
            <input
              type="text"
              v-model="searchContent"
              maxlength="100"
              :placeholder="$t('searchVideo.text[1]')"
            />
            <img
              class="icon"
              src="../../assets/imgaes/video/search-icon.png"
              alt=""
            />
          </div>
          <button class="fl search-btn" @click="searchBtn" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('movie.text[4]')}}</button>
          <el-dropdown-menu
            class="video-dropdown"
            slot="dropdown"
            split-button="true"
            v-if="historyList.length != 0 || historyList != ''"
          >
            <p class="delete" @click="deleteHistory()">
              {{$t('searchVideo.text[2]')}}
              <img
                class="fr"
                src="../../assets/imgaes/video/delete.png"
                alt=""
              />
            </p>
            <el-dropdown-item
              v-for="(item, index) in historyList"
              :key="index"
              @click.native="historybtn(item)"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <div class="search-list-box" v-if="searchList.length != 0">
      <p class="tips" v-if="isLoading">Đang tải...</p>
      <ul class="search-list clearfix">
        <li
          class="list-item"
          v-for="(item, index) in searchList"
          :key="index"
          @click="goPlay(item)"
        >
          <div class="list-img fl">
            <!--<img  src="../../assets/imgaes/video/pic.png" alt="">-->
            <img class="pic" v-lazy="item.cover" alt="" />
            <span class="duration">{{ item.play_time | filterSecond }}</span>
          </div>

          <div class="live-r-txt fl">
            <p class="live-r-txt1" :title="item.title">{{ item.title }}</p>
            <p class="live-r-txt2">
              {{$t('searchVideo.text[3]')}}: <span>{{ item.tag }}</span>
            </p>
            <p class="live-r-txt3">
              <img src="../../assets/imgaes/video/paly_2.png" alt="" />{{
                item.reads | filterOnlineNum
              }}
              {{$t('searchVideo.text[4]')}}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="no-content" v-if="!searchList.length && !isLoading">
      <div class="no-text">{{$t('searchVideo.text[5]')}}...</div>
      <h3 class="no-title">{{$t('searchVideo.text[6]')}}</h3>
      <div class="video-list clearfix">
        <div
          class="video-item fl"
          v-for="(item, index) in likeList"
          @click="goPlay(item)"
        >
          <div class="item-pic">
            <!--<img  src="../../assets/imgaes/video/pic.png" alt="">-->
            <img class="pic" v-lazy="item.cover" alt="" />
            <div class="video-describe">
              <div class="fl">
                <img
                  class="fl-icon"
                  src="../../assets/imgaes/video/icon_3.png"
                  alt=""
                />
                <span class="numer">{{ item.reads | filterOnlineNum }}</span>
              </div>
              <div class="fr duration">{{ item.play_time | filterSecond }}</div>
            </div>
            <div class="video-play"><span class="play-icon"></span></div>
          </div>
          <div class="item-name" :title="item.title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "search",
  data() {
    return {
      videoMenu1: [],
      menuActive1: 1,
      searchContent: "", //搜索内容
      hotHost: [],
      searchList: [], //列表
      historyList: [], // 搜索历史
      //localStorageName: "sgNavSearchList",//保存到storage的键名
      isLoading: false, //loading
      likeList: [],
      domesticPostData: {
        typeId: null, //大分类
        cid: null, //小分类
        column: "praise",
        tag: "",
        code: this.$store.state.defalutLan,
        page: 1, //第几页
        limit: 8, //每页多少条
      },
    };
  },
  created() {
    this.getFl();
    console.log(localStorage.getItem("searchKey"));
    this.searchContent = localStorage.getItem("searchKey");

    console.log(localStorage.getItem("historySearch"));
    if (
      !localStorage.getItem("historySearch") ||
      localStorage.getItem("historySearch") == "undefined" ||
      localStorage.getItem("historySearch") == "null"
    ) {
      this.historyList = [];
    } else {
      this.historyList = JSON.parse(localStorage.getItem("historySearch"));
    }

    this.getFindVideo();
    this.guessLike();
  },
  filters: {
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "万";
      }
      return n;
    },
  },
  methods: {
    goPlay(v) {
      //跳转页面
      //console.log(v);
      // this.$router.push('/videoPlay/'+v.id);
      window.open("/videoPlay/" + v.id);
      localStorage.setItem("vMess", JSON.stringify(v));
    },
    searchBtn: function () {
      //搜索按钮
      this.menuActive1 = '';
      this.searchList = [];
      if (this.searchContent === "" || this.searchContent == null) {
        this.$message.error(this.$t('searchVideo.errorText[0]'));
        return;
      }
      this.getFindVideo();
      // this.searchContent = '';
      if (this.searchList.length == 0) {
        this.guessLike();
      }
    },
    historybtn: function (item) {
      //搜索历史
      this.menuActive1 = '';
      this.searchList = [];
      this.searchContent = item;
      this.getFindVideo();

      if (this.searchList.length == 0) {
        this.guessLike();
      }
    },
    changeMenu1(item) {
      //精选序列
      this.menuActive1 = item.typeId;
      this.searchContent = "";
      this.searchContent = item.name;
      this.getFindVideo();
    },
    //请求头部的分类
    async getFl() {
      // let res = await this.$http.post('/video/getVideoClass') ;
      let res = await this.$http.get("/api/live/movie/get_movie_sort/");
      if (res && res.data.code == 1) {
        this.videoMenu = res.data.data;
        //console.log( this.videoMenu);
        for (let k in this.videoMenu) {
          //this.videoMenu1.push(this.videoMenu[k].name);
          this.videoMenu1.push({
            name: this.videoMenu[k].name,
            typeId: this.videoMenu[k].id,
            pid: this.videoMenu[k].pid,
          });
        }
      }
    },
    //获取搜索列表
    async getFindVideo() {
      this.isLoading = true;
      this.hotHost = [];
      this.searchList = [];
      let res = await this.$http.post("/api/live/movie/findVideo/", { name: this.searchContent });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.searchList = res.data.data;
        this.total = res.data.data.length;
      }
      this.saveHistoryList(this.searchContent);
    },
    // 存储搜索过的关键字
    saveHistoryList: function (name) {
      //把搜索的词存起来
      //console.log(name);
      let c = this.historyList.findIndex((item, index) => {
        return item == name;
      });
      if (c < 0) {
        //只放8个最近搜索
        if (this.historyList.length <= 7) {
          this.historyList.unshift(name);
        } else {
          this.historyList.unshift(name);
          this.historyList.pop(name);
        }
        console.log(this.historyList);
        localStorage.setItem("historySearch", JSON.stringify(this.historyList));
      }
    },
    //删除搜索过的关键字
    deleteHistory: function () {
      this.historyList = [];
      this.getFindVideo();
      localStorage.removeItem("historySearch");
    },
    async guessLike() {
      //热门推荐&猜你喜欢
      let d = this.globalPpproach.checkIsEncrypt(
        {
          typeId: this.domesticPostData.typeId, //大分类
          cid: this.domesticPostData.cid, //小分类
          column: this.domesticPostData.column,
          code: this.domesticPostData.code,
          tag: this.domesticPostData.tag,
          page: this.domesticPostData.page, //第几页
          limit: this.domesticPostData.limit, //每页多少条
        }
      );
      let res = await this.$http.post("/api/live/movie/MostSeries/", {
         typeId: this.domesticPostData.typeId, //大分类
          cid: this.domesticPostData.cid, //小分类
          column: this.domesticPostData.column,
          code: this.domesticPostData.code,
          tag: this.domesticPostData.tag,
          page: this.domesticPostData.page, //第几页
          limit: this.domesticPostData.limit, //每页多少条
      });
      //console.log(res);
      if (res && res.data.code == 1) {
        this.likeList = res.data.data;
      }
    },
    handleSizeChange(val) {
      this.page = val;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.searchList = [];
      this.getFindVideo(this.page);
    },
  },
  computed: {
      ...mapState(["userinfo","skin"])
      
  },
};
</script>

<style scoped lang="less">
.video-search {
  padding-top: 40px;
  .video-menu {
    padding: 0 0;
    li {
      min-width: 88px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #445779;
      text-align: center;
      margin-right: 5px;
      cursor: pointer;
      padding: 0 8px;
      &.first {
        height: 30px;
        font-weight: bold;
        background: none;
        font-size: 24px;
        margin-right: 36px;
        cursor: default;
        margin-bottom: 20px;
      }
      &.active {
        color: #1486ff;
        background: #fff;
        background: #ffffff;
        border: 1px solid #1486ff;
        border-radius: 15px;
      }
    }
    .menu-list1 {
      width: 640px;
      height: 30px;
      overflow: hidden;
    }
    .menu-list2 {
      width: 1068px;
      li {
        margin-bottom: 20px;
      }
    }
    .search-box {
      width: 319px;
      background: none;
      margin-right: 0;
      padding: 0;
      .input-bg {
        width: 242px;
        height: 30px;
        border: 1px solid #eeee;
        background: #fff;
        -webkit-border-radius: 15px 0 0 15px;
        -moz-border-radius: 15px 0 0 15px;
        border-radius: 15px 0 0 15px;
        position: relative;
        input {
          width: 90%;
          line-height: 28px;
          font-size: 12px;
          -webkit-border-radius: 15px 0 0 15px;
          -moz-border-radius: 15px 0 0 15px;
          border-radius: 15px 0 0 15px;
          padding-left: 10px;
          float: left;
        }
        .icon {
          width: 14px;
          height: 16px;
          position: absolute;
          top: 5px;
          right: 15px;
        }
      }
      .search-btn {
        width: 69px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        color: #fff;
        -webkit-border-radius: 0 15px 15px 0;
        -moz-border-radius: 0 15px 15px 0;
        border-radius: 0 15px 15px 0;
        background: linear-gradient(0deg, #1687ff, #4ba1ff);
        cursor: pointer;
      }
    }
  }
}
.search-list-box {
  background: #fff;
  padding: 20px;
  margin-bottom: 40px;
  .search-list {
    .list-item {
      margin-bottom: 20px;
      overflow: hidden;
      .list-img {
        width: 320px;
        height: 220px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        position: relative;
        margin-right: 20px;
        overflow: hidden;
        background: #f5f5f5;
        .duration {
          width: 68px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
          text-align: center;
          background: rgba(51, 51, 51, 1);
          opacity: 0.6;
          border-radius: 6px;
          position: absolute;
          overflow: hidden;
          right: 10px;
          bottom: 10px;
        }
        img {
          width: 140%;
          /*height: 220px;*/
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
      }
      .live-r-txt {
        width: 70%;
        color: #333;
        cursor: pointer;
        .live-r-txt1 {
          height: 21px;
          font-weight: bold;
          font-size: 18px;
          margin-top: 7px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .live-r-txt2 {
          font-size: 16px;
          margin: 16px 0;
          span {
            color: #666;
            padding: 5px 14px;
            border: 1px solid #666;
            -webkit-border-radius: 6px;
            -moz-border-radius: 6px;
            border-radius: 6px;
          }
        }
        .live-r-txt3 {
          font-size: 16px;
          color: #666;
          img {
            margin-right: 10px;
          }
        }
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .tips {
    height: 100px;
    font-size: 18px;
    color: #333;
    padding: 80px 0;
    text-align: center;
  }
}

/*.page-box{
        padding-top: 20px;
        padding-bottom: 20px;
        overflow: hidden;
        .count{
            line-height: 30px;
            font-size: 13px;
            margin-left: 19px;
        }
    }*/
.no-content {
  .no-text {
    height: 280px;
    font-size: 18px;
    color: #666;
    text-align: center;
    background: #fff;
    padding-top: 130px;
  }
  .no-title {
    font-size: 18px;
    color: #333;
    padding: 20px 0;
  }
}
.video-list {
  background: #fff;
  padding-left: 20px;
  margin-bottom: 40px;
  .video-item {
    width: 276px;
    margin-right: 18px;
    padding: 20px 0 20px;
    position: relative;
    &:last-of-type {
      margin-right: 0;
    }
    .item-pic {
      height: 220px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid #fff;
      position: relative;
      &:hover {
        border-color: #1486ff;
        .pic {
          -webkit-transform: scale(1.1);
          transform: scale(1.1);
        }
        .video-play {
          display: block;
        }
      }
      .pic {
        width: 150%;
        /*height: 220px;*/
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        transition: all 0.1s ease-out;
        -webkit-transition: all 0.1s ease-out;
      }
      .video-describe {
        width: 100%;
        padding: 0 10px;
        position: absolute;
        bottom: 10px;
        left: 0px;
        .fl {
          line-height: 33px;
          .fl-icon {
            margin-right: 20px;
            float: left;
          }
          .numer {
            font-size: 18px;
            color: #333;
            float: left;
          }
        }
        .duration {
          width: 70px;
          line-height: 25px;
          font-size: 14px;
          color: #fff;
          background: #858585;
          opacity: 0.88;
          text-align: center;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          margin-top: 5px;
        }
      }
      .video-play {
        display: none;
        width: 100%;
        height: 100%;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background: rgba(51, 51, 51, 1);
        opacity: 0.4;
        position: absolute;
        top: 0px;
        left: 0;
        .play-icon {
          content: "";
          width: 44px;
          height: 44px;
          background: url("../../assets/imgaes/video/play_1.png") no-repeat;
          position: absolute;
          top: 89px;
          left: 50%;
          transform: translateX(-50%);
          -webkit-transform: translateX(-50%);
        }
      }
    }
    .item-name {
      width: 100%;
      font-weight: bold;
      font-size: 18px;
      color: #333;
      padding-top: 19px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>