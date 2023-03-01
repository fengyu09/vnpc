<template>
  <div class="expertMsg">
    <div class="anchorBan">
      <img src="../../assets/imgaes/main/expert.png" alt="" />
    </div>

    <div class="anchorHead">
      <div>
        <div class="fl">
          <img v-lazy="expertMsg.avatar" alt="" />
          <p class="zjbs">专家</p>
        </div>
        <div class="fl">
          <p>
            <span>{{ expertMsg.nickname }}</span>
          </p>
          <p>
            <span>{{ expertMsg.profile }}</span>
          </p>
          <p>
            <span>{{ win }}%</span><i>胜率</i> <span>{{ profit }}%</span
            ><i>盈利</i> <span>{{ winning }}</span
            ><i>连红</i>
          </p>
        </div>
        <div
          class="fr guanzhu"
          @click="getAttention(expertMsg.id)"
          v-if="this.$route.params.id !== this.$store.state.userinfo.user_id"
        >
          <p
            class="guan1"
            v-if="isFollow"
            style="cursor: pointer; color: #999; background: #f2f2f2"
          >
            已关注
          </p>
          <p class="guan" v-if="!isFollow" style="cursor: pointer">
            <img src="../../assets/imgaes/main/jia1.png" alt="" />
          </p>
        </div>
        <div class="fr zan">
          <p>{{ expertMsg.like }}</p>
          <p>获赞</p>
        </div>
        <div class="fr zan">
          <p>{{ expertMsg.followers }}</p>
          <p>粉丝</p>
        </div>
        <div class="fr zan">
          <p>{{ expertMsg.following }}</p>
          <p>关注</p>
        </div>
      </div>
    </div>

    <div class="expertAll">
      <div class="fl">
        <span></span><span>{{ expertMsg.lottery_name }}</span>
      </div>
      <div class="fl">本期开奖剩余</div>
      <div class="fl" v-if="next_lottery_time >= 0">
        <span v-if="d">{{ d }}</span>
        <i v-if="d">天</i>
        <span v-if="hour1 > 0 ? true : false">{{ hour2 }}</span>
        <span v-if="hour1 > 0 ? true : false">{{ hour1 }}</span>
        <i v-if="hour1 > 0 ? true : false">时</i>
        <span>{{ min2 }}</span>
        <span>{{ min1 }}</span>
        <i v-if="hour1 > 0 ? true : false">分</i>
        <i v-if="hour1 > 0 ? false : true" style="margin: 0 3px">:</i>
        <span>{{ sec2 }}</span>
        <span>{{ sec1 }}</span>
        <i v-if="hour1 > 0 ? true : false">秒</i>
      </div>
      <div class="fl" v-if="next_lottery_time < 0">开奖中...</div>
      <div class="fr checkTab" v-for="(item, i) in tabsParam" :key="i">
        <p @click="checkTab(i)" :class="{ active: i == nowIndex }">
          {{ item }}
        </p>
      </div>
    </div>

    <!--   历史开奖 -->
    <div class="history_list">
      <table
        class="table"
        v-if="
          historyList !== undefined && historyList.length > 0 ? true : false
        "
      >
        <tr>
          <th>Ngày tháng/Thời gian</th>
          <th>开奖</th>
          <th>推荐号码</th>
          <th>Kết quả</th>
        </tr>
        <tr v-for="(v, index) in historyList" :key="index">
          <td>{{ v.issue }}期 / {{ timeStampTurnTime(v.created) }}</td>
          <td>
            <span v-for="(a, i) in v.open_code.split(',')" :key="i"
              >{{ a }}<i v-if="v.open_code !== ''">，</i></span
            >
          </td>
          <td>
            {{ v.method }}
            <span v-for="(b, i) in v.code.split(',')" :key="i"
              >{{ b }}<i style="width: 5px; display: inline-block"></i
            ></span>
          </td>
          <td>
            <p v-if="v.is_right == 0">无</p>
            <p v-if="v.is_right == 1">无</p>
            <p v-if="v.is_right == 2">输</p>
            <p v-if="v.is_right == 3" style="color: #ff1c30">赢</p>
          </td>
        </tr>
      </table>
      <table class="zanwu" v-if="zanwu">
        <p>nodata</p>
      </table>
    </div>

    <div v-if="!historyList.length && !zanwu" class="weijiazai">
      正在加载<i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { alertComfirm } from "../../assets/js/public";
export default {
  name: "expertMsg",
  data() {
    return {
      expertMsg: [], //用户专家信息
      isFollow: "", //渲染页面的关注状态
      tabsParam: ["最近100期", "最近50期", "最近30期", "最近10期"],
      nowIndex: 3,
      lottery_id: "",
      lotteryMsg: [], //最新一期开奖信息
      next_lottery_time: "", //下次开奖的时间戳
      hour1: "-",
      hour2: "-",
      min1: "-",
      min2: "-",
      sec1: "-",
      sec2: "-",
      d: 0,
      limit: 10,
      historyList: [],
      zanwu: false,
      win: 0,
      profit: 0,
      winning: 0,
    };
  },
  computed: {
    ...mapState(["codeToken"]),
  },
  created() {
    this.getexpertMsg(); //获取专家信息
  },
  mounted() {
    window.timer1 = setInterval(this.timer, 1000); //开奖倒计时
  },
  destroyed() {
    //关闭计时器
    if (window.timer1) clearInterval(window.timer1);
  },
  methods: {
    getexpertMsg() {
      //获取专家信息
      this.$http
        .get("/forum/plan/expert", {
          params: {
            expert_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
            lottery_id: this.$route.params.lid || 0,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.expertMsg = res.data.data;
            this.isFollow = res.data.data.is_followed;
            this.lottery_id = res.data.data.lottery_id;
            this.win = this.expertMsg.win_rate_mul_100;
            this.profit = this.expertMsg.profit_rate_mul_100;
            this.winning = this.expertMsg.winning;

            this.getLottery(); //最新一期开奖信息
            this.lotteryHistory(); //最新历史开奖信息
          }
        });
    },

    //关注专家
    getAttention(id) {
      if (this.codeToken) {
        //判断用户是否登录  如果未登录  跳转登录页面
        this.$http
          .post("/forum/plan/follow/", {
            expert_id: id,
            user_id: this.$store.state.userinfo.user_id,
          })
          .then((res) => {
            if (res && res.data.code == 1) {
              this.isFollow = res.data.is_followed;
              if (this.isFollow == "1") {
                //关注成功
                this.expertMsg.followers += 1;
              } else {
                this.expertMsg.followers -= 1;
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

    checkTab: function (i) {
      this.nowIndex = i;
      this.lotteryHistory(i); //查询历史开奖
    },

    lotteryHistory(i) {
      this.limit = 10;
      this.zanwu = false;
      if (i == 0) {
        this.limit = 100;
      } else if (i == 1) {
        this.limit = 50;
      } else if (i == 2) {
        this.limit = 30;
      } else if (i == 3) {
        this.limit = 10;
      }
      //console.log(i)
      this.$http
        .get("/forum/plan/history", {
          params: {
            expert_id: this.$route.params.id,
            lottery_id: this.lottery_id,
            // issue: "",
            limit: this.limit,
            // page: 1
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.historyList = res.data.data;
            if (this.historyList.length == 0) {
              this.zanwu = true;
            }
          }
        });
    },

    timeStampTurnTime(timeStamp) {
      if (timeStamp > 0) {
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return h + ":" + minute;
      } else {
        return "";
      }
    },

    //获取当前开奖信息
    getLottery() {
      this.$http
        .post("/open/idx/indexNewOne", {
          lottery_id: this.lottery_id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.lotteryMsg = res.data.data;
            this.next_lottery_time = res.data.data.next_lottery_time; //距下次开奖的时间戳
          }
        });
    },

    timer: function () {
      var time = this.next_lottery_time--; //转化时间戳
      if (time > 0) {
        var hour = parseInt(time / 3600);
        var d = parseInt(parseInt(time / 60) / 60 / 24);
        var h = parseInt((parseInt(time / 60) / 60) % 24);
        var minute = parseInt((time - hour * 3600) / 60);
        var second = parseInt(time - hour * 3600 - minute * 60);
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;

        this.d = d;
        this.hour1 = parseInt(h % 10); // 个位数
        this.hour2 = parseInt((h % 100) / 10); // 十位数
        this.min1 = parseInt(minute % 10); // 个位数
        this.min2 = parseInt((minute % 100) / 10); // 十位数
        this.sec1 = parseInt(second % 10); // 个位数
        this.sec2 = parseInt((second % 100) / 10); // 十位数
      } else {
        this.d = 0;
        this.hour1 = "-";
        this.hour2 = "-";
        this.min1 = "-";
        this.min2 = "-";
        this.min1 = "-";
        this.sec1 = "-";
        this.sec2 = "-";
        this.getLottery(); //倒计时的开奖时间为负数之后  处于开奖中的状态   一直请求当前彩种的数据
      }
    },
  },
};
</script>

<style scoped lang="less">
.weijiazai {
  height: 208px;
  text-align: center;
  line-height: 208px;
  font-size: 20px;
}

.expertMsg {
  .anchorBan {
    width: 100%;
    height: 170px;
    position: relative;
    top: -10px;
    img {
      height: 100%;
      width: 100%;
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
        //头像的样式
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
          bottom: -13px;
          left: 41%;
          margin-left: -20px;
          width: 40px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          border-radius: 2px 10px 2px 10px;
          background: -webkit-linear-gradient(
            left,
            #0297ff,
            #41e1ef
          ); /* Safari 5.1 - 6.0 */
          background: -o-linear-gradient(
            right,
            #0297ff,
            #41e1ef
          ); /* Opera 11.1 - 12.0 */
          background: -moz-linear-gradient(
            right,
            #0297ff,
            #41e1ef
          ); /* Firefox 3.6 - 15 */
          background: linear-gradient(
            to right,
            #0297ff,
            #41e1ef
          ); /* 标准的语法 */
        }
      }
      div:nth-child(2) {
        width: 500px;
        margin-left: 5px;
        p:nth-child(1) {
          margin-top: 26px;
          span:nth-child(1) {
            font-size: 18px;
            color: #333;
            font-weight: bold;
          }
          .head2 {
            font-size: 14px;
            color: #fff;
            font-weight: bold;
            width: 20px;
            height: 20px;
            margin-left: 14px;
            display: inline-block;
            background: linear-gradient(
              90deg,
              rgba(255, 56, 154, 1) 0%,
              rgba(255, 117, 156, 1) 100%
            );
            border-radius: 10px;
            position: relative;
            top: -1px;
            i {
              padding-left: 2px;
              margin-top: -4px;
              display: inline-block;
              vertical-align: middle;
              img {
                width: 14px;
                height: 13px;
              }
            }
            span {
              display: inline-block;
              text-align: center;
              width: 26px;
            }
          }
          .userV {
            display: inline-block;
            width: 50px;
            height: 20px;
            margin-left: 10px;
            position: relative;
            top: -2px;
            img {
              width: 50px;
              height: 20px;
            }
          }
        }
        p:nth-child(2) {
          margin-top: 8px;
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
          font-size: 14px;
          margin-top: 4px;
          span {
            color: #ff1c30;
            font-weight: bold;
            display: inline-block;
            margin-right: 4px;
          }
          i {
            color: #333;
            display: inline-block;
            margin-right: 20px;
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

  //  下面开奖的信息
  .expertAll {
    width: 1200px;
    margin: 0 auto;
    height: 68px;
    line-height: 68px;
    div:nth-child(1) {
      height: 68px;
      display: flex;
      align-items: center;
      span:nth-child(1) {
        display: inline-block;
        width: 4px;
        height: 18px;
        background: #ff1c30;
        border-radius: 2px;
      }
      span:nth-child(2) {
        margin-left: 10px;
        color: #333;
        font-weight: bold;
        font-size: 18px;
      }
    }
    div:nth-child(2) {
      font-size: 14px;
      color: #999;
      margin-left: 20px;
      margin-right: 6px;
    }
    div:nth-child(3) {
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
    .checkTab {
      width: 78px;
      height: 28px;
      background: #fff;
      border-radius: 14px;
      color: #000;
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 20px;
      .active {
        width: 78px;
        height: 28px;
        background: rgba(255, 28, 48, 1);
        color: #fff;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  //历史开奖
  .history_list {
    width: 1200px;
    margin: 0 auto;
    margin-bottom: 30px;
    background-color: #fff;
    color: #333;
    border-radius: 4px;
    .table {
      width: 1160px;
      margin: 20px;
      display: inline-block;
      border: 1px solid #eeeeee;
      tr {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eeeeee;
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
      th {
        width: 290px;
        text-align: center;
        border-right: 1px solid #eeeeee;
        font-size: 16px;
        &:nth-child(4) {
          border-right: none;
        }
      }
      td {
        width: 290px;
        font-size: 14px;
        border-right: 1px solid #eeeeee;
        &:nth-child(4) {
          border-right: none;
        }
      }
    }
  }
}

.zanwu {
  width: 1160px;
  height: 300px;
  margin: 0 auto;
  p {
    height: 260px;
    margin-top: 20px;
    border: 1px solid #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>