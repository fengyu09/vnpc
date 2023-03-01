<template>
  <div id="hostHome" class="hostHome">
    <div class="anchorBan">
      <img src="../../assets/imgaes/main/zhubo1.png" alt="" />
    </div>

    <div class="anchorHead">
      <div>
        <div class="fl">
          <img v-lazy="anchorMsg.avatar" alt="" />
          <p>主播</p>
        </div>
        <div class="fl">
          <p>
            <span>{{ anchorMsg.nickname }}</span>
            <span class="head2" v-if="anchorMsg.sex == 1"
              ><img src="../../assets/imgaes/member/zhubo_5.png" alt=""
            /></span>
            <span class="head2" v-if="anchorMsg.sex == 0"
              ><img src="../../assets/imgaes/member/zhubo_9.png" alt=""
            /></span>
            <span class="head3"
              ><i><img src="../../assets/imgaes/main/years.png" alt="" /></i
              ><span>{{ anchorMsg.age }}</span></span
            >
            <span class="head4"
              ><i><img src="../../assets/imgaes/main/level.png" alt="" /></i
              ><span>{{ anchorMsg.level }}</span></span
            >
            <span
              class="head5"
              v-if="anchorMsg.liveStatus == 1"
              @click="goZbj(anchorMsg.anchor_id, anchorMsg.lottery_id)"
              ><i><img src="../../assets/imgaes/main/a1.gif" alt="" /></i
              ><span
                class="living-now"
                @click="goZbj(anchorMsg.anchor_id, anchorMsg.lottery_id)"
                >直播中</span
              ></span
            >
            <span class="head5" v-else
              ><i
                ><img
                  src="../../assets/imgaes/main/noLive.png"
                  alt=""
                  @click="
                    goZbj(anchorMsg.anchor_id, anchorMsg.lottery_id)
                  " /></i
              ><span @click="goZbj(anchorMsg.anchor_id, anchorMsg.lottery_id)"
                >未开播</span
              ></span
            >
          </p>
          <p>
            <span style="color: #999999"
              >房间ID：{{ anchorMsg.anchor_id }}</span
            >
          </p>
          <p>
            <span style="color: #999999">{{ anchorMsg.sign }}</span>
          </p>
        </div>
        <div
          class="fr guanzhu"
          v-if="this.$route.params.id !== this.$store.state.userinfo.user_id"
          @click="getAttention"
          :style="{ background: isFollow == true ? '#F2F2F2' : '#FF1C30' }"
        >
          <p class="guan1" v-if="isFollow" style="cursor: pointer; color: #999">
            已关注
          </p>
          <p class="guan" v-if="!isFollow" style="cursor: pointer">
            <img src="../../assets/imgaes/main/jia2.png" alt="" />
          </p>
        </div>
        <div class="fr zan" v-if="anchorMsg.zan == null">
          <p>0</p>
          <p>获赞</p>
        </div>
        <div class="fr zan" v-if="anchorMsg.zan !== null">
          <p>{{ anchorMsg.zan }}</p>
          <p>获赞</p>
        </div>
        <div class="fr zan">
          <p>{{ anchorMsg.fans }}</p>
          <p>粉丝</p>
        </div>
        <div class="fr zan">
          <p>{{ anchorMsg.follow_num }}</p>
          <p>关注</p>
        </div>
      </div>
    </div>

    <div class="anchor">
      <div class="anchorMsg fl">
        <div class="one">
          <p><span></span><span>资料</span></p>
          <p>
            <i>擅长彩种:</i
            ><span v-for="(item, index) in anchorMsg.lottery" :key="index">
              {{ item.name }}</span
            >
          </p>
          <p
            v-if="
              anchorMsg.tagList !== undefined && anchorMsg.tagList.length > 0
                ? true
                : false
            "
          >
            <i class="msg">擅长彩种:</i
            ><span v-for="(item, index) in anchorMsg.tagList" :key="index">
              <i class="msgImg"><img v-lazy="item.icon" alt="" /></i
              ><i class="msgName">{{ item.title }}</i></span
            >
          </p>
          <p
            v-if="
              anchorMsg.tagList !== undefined && anchorMsg.tagList.length > 0
                ? false
                : true
            "
          >
            <i class="msg">主播标签:</i><span>该主播暂无标签</span>
          </p>
          <p>
            <i>婚姻状态:</i><span>{{ anchorMsg.marry }}</span>
          </p>
          <p>
            <i>播放时长:</i><span>{{ anchorMsg.duration }}</span
            ><span>分钟</span>
          </p>
          <p>
            <i>开播时间:</i
            ><span v-if="this.liveStartTime == '' ? false : true"
              >{{ liveStart }}-{{ liveEnd }}</span
            ><span v-if="this.liveStartTime == '' ? true : false"
              >暂无开播时间</span
            >
          </p>
        </div>
        <div class="two">
          <p>
            <span></span><span>礼物</span
            ><span>共{{ anchorMsg.giftNum }}件</span>
          </p>
          <p
            v-if="
              anchorMsg.giftList !== undefined && anchorMsg.giftList.length > 0
                ? true
                : false
            "
          >
            <span v-for="(item, index) in anchorMsg.giftList" :key="index">
              <img v-lazy="item.icon" alt=""
            /></span>
          </p>
          <p
            v-if="
              anchorMsg.giftList !== undefined && anchorMsg.giftList.length > 0
                ? false
                : true
            "
          >
            <span>Hiện không có quà tặng</span>
          </p>
        </div>
        <div class="three">
          <p class="three1"><span></span><span>直播记录</span></p>
          <div
            v-if="
              anchorMsg.live_record !== undefined &&
              anchorMsg.live_record.length > 0
                ? false
                : true
            "
          >
            暂无直播记录
          </div>
          <el-scrollbar
            class="live"
            style="height: 290px"
            v-if="
              anchorMsg.live_record !== undefined &&
              anchorMsg.live_record.length > 0
                ? true
                : false
            "
          >
            <div
              class="liveRecord"
              v-for="(item, index) in anchorMsg.live_record"
              :key="index"
            >
              <p class="live1">{{ item.name }}</p>
              <p class="live2">{{ item.tip }}</p>
              <p class="live3">{{ item.startTimeTxt }}</p>
            </div>
          </el-scrollbar>
        </div>
      </div>

      <!-- 返回头部的按钮 -->
      <!-- <div v-if="sanjiao" class="toTop" @click='toTop'><div class='sanjiao'></div></div> -->

      <div class="dynamicAll fr">
        <div class="dynami1"><span></span><span>动态</span></div>
        <div
          v-show="dynamic.length > 0 ? true : false"
          class="dynamicAchour"
          style="overflow: auto"
        >
          <div class="list dynami2">
            <div class="dynamic" v-for="(item, index) in dynamic" :key="index">
              <div class="dynamicTwo">
                <div class="fl"><img :src="item.avatar" alt="" /></div>
                <div class="fl">
                  <p>{{ item.nickname }}</p>
                  <p class="content-detail">
                    {{ item.text }}
                    <span class="close-more" @click="close">收起</span>
                  </p>
                  <span class="more-txt" @click="more">展开</span>
                </div>
              </div>
              <div class="dynamicThree">
                <span v-for="(e, i) in item.media" :key="i">
                  <viewer :images="item.media" class="dynImg">
                    <img v-lazy="item.media[i]" alt="" />
                  </viewer>
                </span>
              </div>
              <div class="dynamicFour">
                <p class="fl">发表于：{{ item.create_time | formatDateYMD }}</p>
                <p
                  class="fr"
                  @click="getZan(item, index)"
                  style="cursor: pointer"
                >
                  <span v-if="!item.isZan"
                    ><img
                      style="width: 20px; height: 18px"
                      src="../../assets/imgaes/main/zan.png"
                      alt=""
                  /></span>
                  <span v-if="item.isZan"
                    ><img
                      style="width: 20px; height: 18px"
                      src="../../assets/imgaes/main/dianzan.png"
                      alt=""
                  /></span>
                  <span
                    :style="{
                      color: item.isZan == true ? '#FF1C30' : '#BFC8D9',
                    }"
                    >{{ item.zans }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <p v-if="loadingMore" style="text-align: center; padding: 20px 0">
            <i class="el-icon-loading"></i>loading...
          </p>
          <p
            v-if="dynamic.length && !isMorePage && !loadingMore"
            style="text-align: center; padding: 20px 0"
          >
            没有更多了~
          </p>
        </div>
        <div class="noDynamic" v-if="!isLoading && !dynamic.length">
          <p>
            <img src="../../assets/imgaes/member/zanwudashang-min.png" alt="" />
          </p>
          <p>主播暂无动态哦~</p>
        </div>
        <p v-if="isLoading" style="text-align: center; padding: 20px 0">
          <i class="el-icon-loading"></i>loading...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { timestamps } from "../../utils/timestamps.js";
import { mapState } from "vuex";
import Vue from "vue";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
import { alertComfirm } from "../../assets/js/public";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 1,
    inline: false, //是否默认加载
    button: true, //右上角按钮
    navbar: true, //底部缩略图
    title: true, //当前图片标题
    toolbar: true, //底部工具栏
    tooltip: true, //显示缩放百分比
    movable: false, //是否可以移动
    zoomable: true, //是否可以缩放
    rotatable: true, //是否可旋转
    scalable: true, //是否可翻转
    transition: true, //使用 CSS3 过度
    fullscreen: true, //播放时是否全屏
    keyboard: true, //是否支持键盘
    isLoading: true,
  },
});
export default {
  name: "hostHome",
  data() {
    return {
      openClose: "展开",
      anchorMsg: "", //主播的个人信息
      dynamic: [], //主播的动态
      isFollow: "", //渲染页面的关注状态
      liveStartTime: "", //直播开始时间
      liveEndTime: "", //直播结束时间
      liveStart: "", //渲染页面的直播开始时间
      liveEnd: "",
      time: "",
      loadingMore: false,
      currPage: 1,
      limit: 10,
      isMorePage: false,
      sanjiao: false,
      eWidth: "",
      isOpen: false,
      isClose: false,
    };
  },
  computed: {
    ...mapState(["codeToken"]),
  },
  created() {
    this.getAnchor(); //获取主播信息
    this.getDynamic(); //获取主播动态
    this.toTop();
  },
  mounted() {
    if (this.$route.name != "hostHome") return;
    this.$nextTick(() => {
      window.onscroll = () => {
        if (this.$route.name != "hostHome") return;
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let zheight =
          document.querySelector(".dynami2").offsetHeight ||
          document.querySelector(".dynami2").clientHeight;
        let hd = document.querySelector(".dynami2").offsetTop;
        if (zheight - (hd + scrollTop + 66) < 0 && this.isMorePage) {
          this.load();
        }
        if (scrollTop > 100) {
          this.sanjiao = true;
        } else {
          this.sanjiao = false;
        }
      };
    });
  },
  methods: {
    goZbj(roomId, lotteryId) {
      this.$router.push("/chat/" + roomId + "/" + lotteryId);
    },
    //滚动加载更多
    load() {
      if (!this.isMorePage) return;
      this.isMorePage = false;
      this.loadingMore = true;
      this.currPage++;
      this.$http
        .get(this.versionLive2 + "live/get_anchor_dynamic/", {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
            limit: this.limit,
            page: this.currPage,
          },
        })
        .then((res) => {
          this.loadingMore = false;
          this.dynamic = this.dynamic.concat(res.data.data || []);
          this.$nextTick(() => {
            /* 获取文本所在的div */
            let contentDom = document.querySelectorAll(".content-detail");
            contentDom = [...contentDom];
            //console.log(contentDom);
            // 遍历div,判断高度,是否添加‘展开’按钮
            contentDom.forEach((item, index) => {
              let w = item.offsetWidth;
              if (w >= 670) {
                // 超过高度，给该文本的父元素添加class
                this.addClass(item.parentNode, "list-more");
              }
            });
          });
          if (res.data.data.length < this.limit) {
            this.isMorePage = false;
          } else {
            this.isMorePage = true;
          }
        });
    },
    //返回顶部
    toTop() {
      scrollTo(0, 0);
    },

    //获取主播信息
    getAnchor() {
      this.$http
        .get(this.versionLive2 + "live/get_anchor_info/", {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.anchorMsg = res.data.data;
            this.isFollow = res.data.data.isFollow;
            let timeStamp = res.data.data.liveStartTime; //时间戳
            this.liveStartTime = timestamps(timeStamp); //转化为时间
            let timeStamp1 = res.data.data.liveEndTime;
            this.liveEndTime = timestamps(timeStamp1);
            const stime = this.liveStartTime[11] + this.liveStartTime[12]; //开播时间
            if (stime * 1 > 11) {
              this.liveStart =
                this.liveStartTime[11] +
                this.liveStartTime[12] +
                this.liveStartTime[13] +
                this.liveStartTime[14] +
                this.liveStartTime[15];
            } else {
              this.liveStart =
                this.liveStartTime[11] +
                this.liveStartTime[12] +
                this.liveStartTime[13] +
                this.liveStartTime[14] +
                this.liveStartTime[15];
            }
            const etime = this.liveEndTime[11] + this.liveEndTime[12]; //结束时间
            if (etime * 1 > 11) {
              this.liveEnd =
                this.liveEndTime[11] +
                this.liveEndTime[12] +
                this.liveEndTime[13] +
                this.liveEndTime[14] +
                this.liveEndTime[15];
            } else {
              this.liveEnd =
                this.liveEndTime[11] +
                this.liveEndTime[12] +
                this.liveEndTime[13] +
                this.liveEndTime[14] +
                this.liveEndTime[15];
            }
          }
        });
    },

    //获取主播动态
    getDynamic() {
      this.isLoading = true;
      this.$http
        .get(this.versionLive2 + "live/get_anchor_dynamic/", {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
            limit: this.limit,
            page: this.currPage,
          },
        })
        .then((res) => {
          this.isLoading = false;
          if (res && res.data.code == 1) {
            this.dynamic = res.data.data;
            this.$nextTick(() => {
              /* 获取文本所在的div */
              let contentDom = document.querySelectorAll(".content-detail");
              contentDom = [...contentDom];
              //console.log(contentDom);
              // 遍历div,判断高度,是否添加‘展开’按钮
              contentDom.forEach((item, index) => {
                let w = item.offsetWidth;
                if (w >= 670) {
                  // 超过高度，给该文本的父元素添加class
                  this.addClass(item.parentNode, "list-more");
                }
              });
            });

            if (res.data.data.length < this.limit) {
              this.isMorePage = false;
            } else {
              this.isMorePage = true;
            }
          }
        });
    },
    more(event) {
      this.addClass(event.target.parentNode, "list-close");
      this.removeClass(event.target.parentNode, "list-more");
    },
    // 收起文本
    close(event) {
      this.addClass(event.target.parentNode.parentNode, "list-more");
      this.removeClass(event.target.parentNode.parentNode, "list-close");
    },
    addClass(obj, cls) {
      if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    },
    hasClass(obj, cls) {
      return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
    },
    removeClass(obj, cls) {
      if (this.hasClass(obj, cls)) {
        var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, " ");
      }
    },

    //关注主播
    getAttention() {
      if (this.codeToken) {
        //判断用户是否登录  如果未登录  跳转登录页面
        this.$http
          .post(this.versionLive2 + "live/follow/", {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
          })
          .then((res) => {
            if (res && res.data.code == 1) {
              this.isFollow = res.data.data.isFollow;
              if (this.isFollow == true) {
                //关注成功
                this.anchorMsg.fans += 1;
              } else {
                this.anchorMsg.fans -= 1;
              }
            }
          });
      } else {
        this.toLogin();
      }
    },

    //主播点赞
    getZan(item, index) {
      if (this.codeToken) {
        //判断用户是否登录  如果未登录  跳转登录页面
        this.$http
          .post(this.versionLive2 + "live/dynamic_like/", {
            user_id: this.$store.state.userinfo.user_id,
            like_id: item.dynamic_id,
            type: 1,
          })
          .then((res) => {
            if (res && res.data.code == 1) {
              this.dynamic[index].isZan = res.data.data.is_like;
              if (res.data.data.is_like == true) {
                //点赞成功
                this.dynamic[index].zans += 1;
              } else {
                this.dynamic[index].zans -= 1;
              }
            }
          });
      } else {
        this.toLogin();
      }
    },

    // 跳转登录页面的弹窗提示
    toLogin() {
      alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
        this.$store.commit("SETLOGIN", true);
      });
    },
  },
};
</script>

<style scoped lang="less">
#hostHome {
  padding-bottom: 20px;
  .anchorBan {
    width: 100%;
    height: 170px;
    position: relative;
    top: -10px;
    img {
      height: 170px;
      width: 100%;
    }
  }

  .toTop {
    position: fixed;
    bottom: 120px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #fff;
    border: 2px solid silver;
    border-radius: 50%;
    box-shadow: 0 0 10px silver;
    cursor: pointer;
    // &:hover{
    //   background:pink;
    // }
    .sanjiao {
      padding-top: 7px;
      margin: 0 auto;
      width: 0;
      height: 0;
      border: 10px solid;
      border-color: transparent transparent skyblue;
    }
  }

  .anchorHead {
    width: 100%;
    height: 120px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    div {
      width: 1200px;
      height: 120px;
      div:nth-child(1) {
        //主播头像的样式
        width: 121.6px;
        height: 121.6px;
        border: 10px solid #fff;
        border-radius: 50%;
        //  overflow: hidden;
        background: #fff;
        position: relative;
        top: -20px;
        img {
          height: 100%;
          width: 100%;
          margin: 0 auto;
          border-radius: 50%;
        }
        p {
          position: absolute;
          bottom: -10px;
          left: 50%;
          margin-left: -20px;
          width: 40px;
          height: 20px;
          line-height: 20px;
          background: linear-gradient(
            90deg,
            rgba(115, 8, 195, 1) 0%,
            rgba(199, 61, 233, 1) 100%
          );
          border-radius: 2px 8px 2px 8px;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
      div:nth-child(2) {
        width: 500px;
        margin-left: 5px;
        p:nth-child(1) {
          margin-top: 20px;
          span:nth-child(1) {
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
          .head2 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 54px;
            height: 20px;
            line-height: 20px;
            margin-left: 14px;
            display: inline-block;
            position: relative;
            top: -2px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .head3 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 54px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            display: inline-block;
            // background: -webkit-linear-gradient(90deg,rgba(255,128,31,1) 0%,rgba(255,222,91,1) 100%);
            // background: -moz-linear-gradient(90deg,rgba(255,128,31,1) 0%,rgba(255,222,91,1) 100%);
            // background: -o-linear-gradient(90deg,rgba(255,128,31,1) 0%,rgba(255,222,91,1) 100%);
            background: linear-gradient(
              90deg,
              rgba(255, 128, 31, 1) 0%,
              rgba(255, 222, 91, 1) 100%
            );
            border-radius: 10px;
            i {
              padding-left: 8px;
              margin-top: -5px;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 17px;
                height: 16px;
              }
            }
            span {
              display: inline-block;
              text-align: center;
              width: 26px;
            }
          }
          .head4 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 54px;
            height: 20px;
            line-height: 20px;
            margin-left: 10px;
            display: inline-block;
            background: linear-gradient(
              90deg,
              rgba(115, 8, 195, 1) 0%,
              rgba(199, 61, 233, 1) 100%
            );
            border-radius: 10px;
            i {
              padding-left: 6px;
              margin-top: -5px;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 20px;
                height: 15px;
              }
            }
            span {
              display: inline-block;
              text-align: center;
              width: 22px;
            }
          }
          .head5 {
            display: inline-block;
            cursor: pointer;
            padding-left: 10px;
            font-size: 14px;
            color: #999;
            i {
              vertical-align: text-bottom;
              padding-right: 10px;
            }
            .living-now {
              color: #ff1c30;
            }
          }
        }
        p:nth-child(2) {
          margin-top: 13px;
          span {
            font-size: 14px;
            color: #999;
            width: 500px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        p:nth-child(3) {
          margin-top: 7px;
          span {
            font-size: 14px;
            color: #999;
            width: 500px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .zan {
        width: 70px;
        text-align: center;
        p:nth-child(1) {
          margin-top: 38px;
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }
        p:nth-child(2) {
          margin-top: 13px;
          font-size: 14px;
          color: #999;
        }
      }
      .guanzhu {
        //点击关注的样式
        width: 100px;
        height: 40px;
        margin-top: 40px;
        border-radius: 20px;
        overflow: hidden;
        margin-left: 30px;
        .guan1 {
          font-size: 14px;
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        .guan {
          width: 100px;
          height: 40px;
          border-radius: 20px;
        }
      }
    }
  }

  //左边的主播个人信息
  .anchor {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .anchorMsg {
      width: 360px;
      margin-top: 10px;
      .one {
        //资料
        width: 360px;
        //  height: 218px;
        background: #fff;
        border-radius: 4px;
        padding-left: 19px;
        p:nth-child(1) {
          height: 66px;
          display: flex;
          align-items: center;
          span:nth-child(1) {
            display: inline-block;
            width: 4px;
            height: 16px;
            background: #ff1c30;
            border-radius: 2px;
          }
          span:nth-child(2) {
            margin-left: 10px;
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
        }
        p:nth-child(2) {
          margin-bottom: 20px;
          height: 16px;
          vertical-align: middle;
          i {
            font-size: 14px;
            color: #999;
            width: 70px;
            display: inline-block;
          }
          span {
            font-size: 14px;
            color: #333;
            margin-right: 25px;
            margin-left: -5px;
          }
        }
        p:nth-child(3) {
          margin-bottom: 20px;
          height: 16px;
          vertical-align: middle;
          .msg {
            font-size: 14px;
            color: #999;
            width: 70px;
            display: inline-block;
          }
          span {
            font-size: 14px;
            color: #333;
            margin-right: 30px;
            display: inline-block;
            .msgImg {
              margin-right: 8px;
              display: inline-block;
              img {
                height: 18px;
                width: auto;
              }
            }
          }
        }
        p:nth-child(4) {
          margin-bottom: 20px;
          height: 16px;
          i {
            font-size: 14px;
            color: #999;
            width: 70px;
            display: inline-block;
          }
          span {
            font-size: 14px;
            color: #333;
            display: inline-block;
            margin-right: 4px;
          }
        }
        p:nth-child(5) {
          margin-bottom: 20px;
          height: 16px;
          i {
            font-size: 14px;
            color: #999;
            width: 70px;
            display: inline-block;
          }
          span {
            font-size: 14px;
            color: #333;
            display: inline-block;
            margin-right: 4px;
          }
        }
        p:nth-child(6) {
          //开播时间
          overflow: hidden;
          padding-bottom: 31px;
          i {
            font-size: 14px;
            color: #999;
            display: inline-block;
            width: 70px;
            float: left;
          }
          span {
            font-size: 14px;
            color: #333;
            display: inline-block;
            float: left;
          }
        }
      }
    }

    .two {
      //礼物
      margin: 10px 0;
      width: 360px;
      min-height: 142px;
      background: #fff;
      border-radius: 4px;
      padding: 0 19px;
      p:nth-child(1) {
        height: 66px;
        display: flex;
        align-items: center;
        position: relative;
        span:nth-child(1) {
          width: 4px;
          height: 16px;
          background: #ff1c30;
          border-radius: 2px;
          display: inline-block;
        }
        span:nth-child(2) {
          margin-left: 10px;
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        span:nth-child(3) {
          font-size: 14px;
          color: #999;
          position: absolute;
          right: 0;
          top: 19px;
        }
      }
      p:nth-child(2) {
        overflow: hidden;
        span {
          display: inline-block;
          float: left;
          width: 20%;
          margin-bottom: 20px;
          img {
            width: 55px;
            height: 46px;
            margin-left: 5px;
          }
        }
      }
    }
    .three {
      width: 360px;
      height: 360px;
      background: #fff;
      border-radius: 4px;
      padding: 0 19px;
      .three1 {
        height: 66px;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          width: 4px;
          height: 16px;
          background: #ff1c30;
          border-radius: 2px;
          display: inline-block;
        }
        span:nth-child(2) {
          margin-left: 10px;
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }
      .live {
        margin-top: -12px;
        .liveRecord {
          //直播记录
          overflow: hidden;
          width: 100%;
          .live1,
          .live2,
          .live3 {
            float: left;
            height: 36px;
            line-height: 36px;
            margin-bottom: 0;
            font-size: 14px;
            color: #333;
          }
          .live1 {
            width: 100px;
            color: #999;
          }
          .live2 {
            width: 100px;
          }
        }
      }
    }

    // 右边的主播动态
    .dynamicAll {
      margin-top: 10px;
      width: 830px;
      background: #fff;
      border-radius: 4px;
      min-height: 746px;
      .dynami1 {
        height: 66px;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          display: inline-block;
          width: 4px;
          height: 16px;
          background: #ff1c30;
          border-radius: 2px;
          margin-left: 20px;
        }
        span:nth-child(2) {
          margin-left: 10px;
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }
      .dynamicAchour {
        border-radius: 4px;
        .dynamic:nth-child(1) {
          margin-top: 6px;
        }
        .dynamic {
          width: 830px;
          margin-top: 30px;
          background: #fff;
          border-radius: 4px;
          padding: 0 20px;
          .dynamicTwo {
            width: 100%;
            height: 50px;
            margin-top: -6px;
            div:nth-child(1) {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 50px;
                height: 50px;
              }
            }
            div:nth-child(2) {
              margin-left: 10px;
              p:nth-child(1) {
                font-size: 14px;
                color: #666;
                margin-top: 3px;
              }

              .openClose {
                color: #7ba1ea;
                display: inline-block;
                width: 30px;
                font-size: 14px;
                line-height: 34px;
                cursor: pointer;
              }
            }
          }
          .dynamicThree {
            margin-left: 60px;
            span {
              display: inline-block;
              width: 115px;
              height: 115px;
              border-radius: 10px;
              /*background: url("../../static/site/imgs/load.png") no-repeat center;*/
              /*background-size: 100% 100%;*/
              margin: 20px 8px 24px 0;
              overflow: hidden;
              text-align: center;
              cursor: pointer;
              .dynImg {
                width: 115px;
                height: 115px;
                img {
                  width: 100%;
                  /*height: 100%;*/
                }
              }
            }
          }
          .dynamicFour {
            padding-left: 60px;
            padding-bottom: 30px;
            border-bottom: 1px solid #f5f5f5;
            p:nth-child(1) {
              font-size: 12px;
              color: #ccc;
            }
            p:nth-child(2) {
              display: flex;
              align-items: center;
              span:nth-child(1) {
                color: #bfc8d9;
                display: inline-block;
                width: 20px;
                height: 18px;
                cursor: pointer;
              }
              span:nth-child(2) {
                font-size: 16px;
                display: inline-block;
                margin-left: 10px;
                margin-top: 2px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

.noDynamic {
  margin-top: 133px;
  text-align: center;
  font-size: 14px;
  color: #999;
  p:nth-child(2) {
    margin-top: 30px;
  }
}

//  .zbtd{
//             font-size: 16px;
//             color:#333;
//             margin-top: 8px;
//             max-width: 670px;
//             overflow: hidden;
//             text-overflow:ellipsis;
//             white-space: nowrap;
//             float: left;

//           }
//           .zbtd1{
//             font-size: 16px;
//             color:#333;
//             margin-top: 8px;
//             font-size: 16px;
//             color:#333;
//             margin-top: 8px;
//             max-width: 670px;
//           }

.more-txt {
  display: none;
  color: #0b93f5;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  top: 7px;
}
.close-more {
  display: none;
  color: #0b93f5;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  top: 7px;
}

.content-detail {
  font-size: 16px;
  color: #333;
  margin-top: 8px;
  float: left;
}

.list-more {
  .content-detail {
    font-size: 16px;
    color: #333;
    margin-top: 8px;
    max-width: 670px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .more-txt {
    display: block;
    color: #0b93f5;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    top: 7px;
    float: left;
  }
  .close-more {
    display: none;
    color: #0b93f5;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    top: 7px;
  }
}

.list-close {
  .content-detail {
    font-size: 16px;
    color: #333;
    margin-top: 8px;
    max-width: 670px;
    float: left;
  }
  .more-txt {
    display: none;
    color: #0b93f5;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    top: 7px;
  }
  .close-more {
    display: inline-block;
    color: #0b93f5;
    cursor: pointer;
    font-size: 16px;
    position: relative;
    top: 0px;
  }
}
</style>
