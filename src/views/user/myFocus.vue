<template>
  <div id="myFocus">
    <!-- <h3>
      <i></i>我的关注
    </h3>-->
    <div class="txhead">
      <div @click="mode=0" :class="{active:mode==0}">
        <span>Mỏ neo</span>
      </div>
      <div @click="mode=1" :class="{active:mode==1}">
        <span>người sử dụng</span>
      </div>
      <div @click="mode=2" :class="{active:mode==2}">
        <span>thạo</span>
      </div>
    </div>

    <div v-if="mode==0">
      <el-scrollbar style="height:501px;" v-if="allFoucsNumZB.length">
        <ul>
          <li class="list-item" v-for="(item,index) in allFoucsNumZB" :key="index" data-type="0">
            <!-- <router-link :to="'/chat/'+item.anchor_id"> -->
            <div class="pic" @click="linkTo(item.anchor_id)">
              <img v-lazy="item.avatar" alt />
            </div>
            <div class="txt">
              <p class="name" @click="linkToVideo(item.anchor_id,item.lottery_id)">
                {{item.nickname}}
                <img
                  v-if="item.live_status == 1"
                  src="../../assets/imgaes/member/zhibo_ing.gif"
                />
                <img v-if="item.live_status != 1" src="../../assets/imgaes/main/noLive.png" />
                <span>直播间</span>
              </p>
              <p class="intro">{{item.sign}}</p>
              <!-- <p v-html="getIntro(item.intro)"></p> -->
            </div>
            <!-- </router-link> -->
            <div class="gz" @click="deleteGz(index)">取消关注</div>
          </li>
        </ul>
      </el-scrollbar>
      <!-- <p class="ts" v-if="loading">loading...</p> -->
      <div class="wgz" v-if="!allFoucsNumZB.length">
        <img src="../../assets/imgaes/member/zanwuiguanzhu.png" alt />
        <p></p>Bạn chưa theo dõi bất kỳ neo nào ~
      </div>
    </div>

    <div v-if="mode==1">
      <el-scrollbar style="height:501px;" v-if="allFoucsNumYH.length">
        <ul>
          <li class="list-item" v-for="(item,index) in allFoucsNumYH" :key="index" data-type="0">
            <!-- <router-link :to="'/chat/'+item.anchor_id"> -->
            <div class="pic" @click="linkToYh(item.user_id)">
              <img v-lazy="item.avatar" alt />
            </div>
            <div class="txt">
              <p class="name">
                {{item.nickname}}
                <!-- <img
                  v-if="item.live_status == 1"
                  src="../../assets/imgaes/member/zhibo_ing.gif"
                />
                <img v-if="item.live_status != 1" src="../../assets/imgaes/main/noLive.png" />
                <span>直播间</span>-->
              </p>
              <p class="intro">{{item.sign}}</p>
              <!-- <p v-html="getIntro(item.intro)"></p> -->
            </div>
            <!-- </router-link> -->
            <div class="gz" @click="deleteGzYh(index)">取消关注</div>
          </li>
        </ul>
      </el-scrollbar>
      <!-- <p class="ts" v-if="loading">loading...</p> -->
      <div class="wgz" v-if="!allFoucsNumYH.length">
        <img src="../../assets/imgaes/member/zanwuiguanzhu.png" alt />
        <p>Bạn chưa theo dõi bất kỳ neo nào ~</p>
      </div>
    </div>

    <div v-if="mode==2">
      <el-scrollbar style="height:501px;" v-if="allFoucsNumZJ.length">
        <ul>
          <li class="list-item" v-for="(item,index) in allFoucsNumZJ" :key="index" data-type="0">
            <!-- <router-link :to="'/chat/'+item.anchor_id"> -->
            <div class="pic" @click="linkToZJ(item.expert_id)">
              <img v-lazy="item.avatar" alt />
            </div>
            <div class="txt">
              <p class="name">
                {{item.nickname}}
                <!-- <img
                  v-if="item.live_status == 1"
                  src="../../assets/imgaes/member/zhibo_ing.gif"
                />
                <img v-if="item.live_status != 1" src="../../assets/imgaes/main/noLive.png" />
                <span>直播间</span>-->
              </p>
              <p class="intro">{{item.profile}}</p>
              <!-- <p v-html="getIntro(item.intro)"></p> -->
            </div>
            <!-- </router-link> -->
            <div class="gz" @click="deleteGzZJ(index)">取消关注</div>
          </li>
        </ul>
      </el-scrollbar>
      <!-- <p class="ts" v-if="loading">loading...</p> -->
      <div class="wgz" v-if="!allFoucsNumZJ.length">
        <img src="../../assets/imgaes/member/zanwuiguanzhu.png" alt />
        <p>Bạn chưa theo dõi bất kỳ neo nào ~</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "myFocus",
  data() {
    return {
      list: [],
      allFoucsNum: 0,
      loading: false,
      mode: 0,
      allFoucsNumYH: [],
      allFoucsNumZJ: [],
      allFoucsNumZB:[],
      num:"",
      num1:"",
      num2:""
    };
  },
  computed: {
    ...mapState(["fellows"])
  },
  created() {
    this.convert();
    // this.linkToZJ()
  },
  methods: {
    ...mapMutations(["SETFELLOWS"]),
    convert: function() {
      this.getConcern();
      this.getConcernYH();
      this.getConcernZj();
      
    },
    linkTo(num) {
      this.$router.push("HostHome/" + num);
    },
    linkToVideo(num, id) {
      this.$router.push("chat/" + num + "/" + id);
    },
    linkToYh(id){
      this.$router.push("UserMsg/" + id);
    },
    linkToZJ(id){
      this.$router.push("ExpertMsg/" + id + '/0');
      //console.log(id,lid);
    },
    getConcern() {
      // this.loading = true;
      this.$http
        .get(this.versionLive2+"user/User_follow_list", {
          params: {
            user_id: this.$store.state.userinfo.user_id,
            type: 0
          }
        })
        .then(res => {
          this.isL = false;
          if (res && res.data.code == 1) {
            this.loading = false;
            this.allFoucsNumZB = res.data.data;
            this.num = this.allFoucsNumZB.length;
            if (this.list.length > 0) {
              // this.allFoucsNum = this.list.length;
              for (var i = 0; i < this.allFoucsNumZB.length; i++) {
                var intro = this.allFoucsNumZB[i].intro; //主播简介
                var live_status = this.allFoucsNumZB[i].live_status; //判断直播状态
              }
              // this.SETFOCUS(this.allFoucsNumZB);
            } else {
              //console.log("没有关注");
              // this.loading = false;
              this.show1 = true;
            }
          }
          // this.loading = false;
        });
    },
    getConcernYH() {
      this.$http
        .get(this.versionLive2+"user/User_follow_list", {
          params: {
            user_id: this.$store.state.userinfo.user_id,
            type: 1
          }
        })
        .then(res => {
          this.isL = false;
          if (res && res.data.code == 1) {
            this.loading = false;
            this.allFoucsNumYH = res.data.data;
            this.num1= this.allFoucsNumYH.length;
            if (this.list.length > 0) {
              // this.allFoucsNumYH= this.list.length;
              // for (var i = 0; i < this.list.length; i++) {
              //   var intro = this.list[i].intro; //主播简介
              //   var live_status = this.list[i].live_status; //判断直播状态
              // }
              this.SETFOCUS(this.list);
            } else {
              //console.log("没有关注");
              // this.loading = false;
              this.show1 = true;
            }
          }
          // this.loading = false;
        });
    },
    getConcernZj() {

      this.$http
        .get("/forum/plan/follow-list", {
          //专家关注列表
          params: {
            user_id: this.$store.state.userinfo.user_id
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.allFoucsNumZJ = res.data.data;
            this.num2= this.allFoucsNumZJ.length;
            let nums = parseInt(this.num) + parseInt(this.num1) + parseInt(this.num2);
            // this.SETFELLOWS(nums)
          }
        });
    },
    deleteGz(i) {
      var arr = this.allFoucsNumZB[i];
      this.$http
        .post(this.versionLive2+"live/follow", {
          anchor_id: arr.anchor_id,
          user_id: this.$store.state.userinfo.user_id
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.allFoucsNumZB.splice(i, 1);
            this.SETFELLOWS(this.fellows-1);
            // this.SETFOCUS(this.list);
          }
        });
    },
    deleteGzYh(id) {
      var arr = this.allFoucsNumYH[id];
      this.$http
        .post(this.versionLive2+"live/follow", {
          follow_id: arr.user_id,
          user_id: this.$store.state.userinfo.user_id
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.allFoucsNumYH.splice(id, 1);
            this.SETFELLOWS(this.fellows-1);
            // this.SETFOCUS(this.allFoucsNumYH);
          }
        });
    },
    deleteGzZJ(i){
      var arr = this.allFoucsNumZJ[i];
      this.$http
        .post("/forum/plan/follow", {
          expert_id: arr.expert_id.toString(),
          user_id: this.$store.state.userinfo.user_id
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.allFoucsNumZJ.splice(i, 1);
            this.SETFELLOWS(this.fellows-1);
            // this.SETFOCUS(this.allFoucsNumZJ);
          }
        });
    },
    getIntro(intro) {
      //获取个性签名
      return intro;
    }
  }
};
</script>

<style scoped lang="less">
#myFocus {
  .txhead {
    display: flex;
    border-bottom: 1px solid #f4f5f8;

    > div {
      height: 60px;
      line-height: 60px;
      color: #a7a7a7;
      font-size: 16px;
      position: relative;
      padding: 0 10px;
      margin-right: 18px;
      cursor: pointer;
      position: relative;
    }

    .active {
      color: #1486FF;
      font-weight: bold;
      &:before {
        content: "";
        width: 75%;
        height: 4px;
        background: #1486FF;
        position: absolute;
        bottom: -1px;
        border-radius: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  ul {
    width: 100%;
    li {
      width: 445px;
      height: 70px;
      float: left;
      margin-top: 20px;
      margin-right: 10px;
      // a {
      //   display: inline-block;
      //   overflow: hidden;
      div {
        float: left;
      }
      .pic {
        width: 50px;
        height: 50px;
        background: #ccc;
        border-radius: 50%;
        margin: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .txt {
        padding-top: 17px;
        .name {
          font-size: 14px;
          color: #333333;
          font-weight: 600;
          cursor: pointer;
        }
        img {
          margin-left: 10px;
          position: relative;
          top: -4px;
          margin-right: 5px;
          width: 18px;
        }
        span {
          font-size: 12px;
          color: #666666;
          font-weight: 0;
        }
      }
      .intro {
        font-size: 12px;
        color: #666666;
        padding-top: 3px;
        width: 240px;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      // }
      .gz {
        width: 70px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        color: #ff1c30;
        border-radius: 99px;
        font-size: 14px;
        text-align: center;
        float: right;
        margin: 15px 10px;
        display: none;
      }
    }
    :hover {
      background: #f4f5f8;
      border-radius: 7px;

      .gz {
        width: 100px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        color: #ff1c30;
        border-radius: 99px;
        font-size: 14px;
        text-align: center;
        float: right;
        margin: 15px 10px;
        cursor: pointer;
        display: block;
      }
    }
  }
  .wgz {
    text-align: center;
    img {
      padding-top: 105px;
    }
    p {
      padding-top: 30px;
    }
  }
}
</style>
