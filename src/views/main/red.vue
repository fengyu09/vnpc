<template>
  <div id="red">
    <div class="red main">
      <div class="lotteryHead">
        <div class="lotteryImg">
          <div>
            <img :src="lotteryImg == '' ? legouImg : lotteryImg" alt="" />
          </div>
        </div>
        <div class="lotteryType">
          <div class="lotteryName">
            <span class="lotteryName">{{ lotteryName }}</span
            ><i
              >第<span class="lotteryIssue">{{ lotteryIssue }}</span
              >期开奖号码</i
            >
          </div>
          <div
            class="lotteryNum"
            v-if="next_lottery_time + 1 > 0 ? true : false"
          >
            <!-- <ul v-if="lotteryId == 8" class="clearfix">
              <li v-for="(item, index) in codes" :key="index" class="fl SixSx">
                <div :class="item | filterSixBs">{{ item }}</div>
                <div>{{ item | filterSixSX }}</div>
              </li>
            </ul> -->
            <ul
              v-if="
                lotteryId == 7 ||
                  lotteryId == 9 ||
                  lotteryId == 11 ||
                  lotteryId == 26 ||
                  lotteryId == 27
              "
              class="clearfix"
            >
              <li
                v-for="(item, index) in codes"
                :key="index"
                class="fl"
                :class="item | filterBallColor"
              >
                {{ item }}
              </li>
            </ul>
            <ul v-if="lotteryId == 1 || lotteryId == 10" class="clearfix">
              <li v-for="(item, index) in codes" :key="index" class="fl">
                {{ item }}
              </li>
            </ul>
            <ul v-if="lotteryId == 8" class="clearfix">
              <li v-for="(item, index) in codes" :key="index" class="fl SixSx">
                <div :class="item | filterSixBs">{{ item }}</div>
                <div>{{ item | filterSixSX(lotteryIssue) }}</div>
              </li>
            </ul>
            <!-- <p v-for="(item,index) in codes" :key="index">{{item}}</p> -->
          </div>
          <!-- <div class="lotteryNum" v-if='next_lottery_time+1>0?true:false'><p v-for="(item,index) in codes" :key="index" :class="item | filterBallColor">{{item}}</p></div> -->
          <div
            class="lotteryIng"
            v-if="next_lottery_time + 1 > 0 ? false : true"
          >
            开奖中...
          </div>
        </div>
        <div class="lotteryTime">
          <p>
            距<span class="lotteryIssue">{{ lotteryIssueAdd }}</span
            >期开奖
          </p>
          <div>
            <span v-if="d">{{ d1 }}</span>
            <span v-if="d">{{ d }}</span>
            <i v-if="d">天</i>
            <!-- <span v-if="hour1 ">{{ hour2 }}</span>
            <span v-if="hour1">{{ hour1 }}</span>
            <i v-if="hour1 ">时</i> -->
            <span v-if="hour1 > 0 ? true : false">{{ hour2 }}</span>
            <span v-if="hour1 > 0 ? true : false">{{ hour1 }}</span>
            <i v-if="hour1 > 0 ? true : false">时</i>
            <span>{{ min2 }}</span>
            <span>{{ min1 }}</span>
            <i>分</i>
            <span>{{ sec2 }}</span>
            <span>{{ sec1 }}</span>
            <i>秒</i>
          </div>
        </div>
      </div>

      <!--<div class="lot">-->
      <!--<div class="lotteryMethod">-->
      <!--<div @click='changeType(index)' v-for="(item,index) in methods" :key="index"-->
      <!--:class="activeClass1 == index ? 'active1':''"-->
      <!--&gt;{{item.text}}<p></p></div>   -->

      <!--<p class='search'><input v-model="input" placeholder="请输入昵称查找"></input><i class="el-icon-search"></i></p>-->
      <!--</div>-->

      <!--<div class="lotteryRanking">-->
      <!--<p v-for="(item,index) in rankings" :key="index" -->
      <!--:class="activeClass2 == index ? 'active2':''"-->
      <!--@click='changeRank(index)'>{{item.text}}</p>-->
      <!--</div>-->
      <!--</div>-->

      <!-- 获取专家计划-->
      <div class="expertAll" v-if="redOdd.length">
        <!--<div class="expert"  v-for="(item,index) in redOdd.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="index">-->
        <!-- <div class="expert" v-for="(item, index) in redOdd" :key="index">
          <div class="lotteryImg">
            <router-link :to="'/expertMsg/'+item.expert_id">
              <div>
                <img :src="redOdd.length > 0 ? item.avatar : legouImg" alt="" />
              </div>
            </router-link>
          </div>
          <div class="lotteryType">
            <div class="lotteryName">
              <div class="nickname">{{ item.nickname }}</div>
              <div class="nic">
                <p class="sheng">胜率</p>
                <p class="number">
                  {{ item.hit_rate * 100 }}<span class="bai">%</span>
                </p>
              </div>
            </div>
            <div class="lotteryNum">
              <p class="guan fl">
                <i>{{ item.method }}</i>
              </p>
              <p
                class="guanNum fl"
                :class="num | filterBallColor1"
                v-for="(num, i) in item.code.split(',')"
                :key="i"
              >
                {{ num }}
              </p>
            </div>
          </div>         
        </div> -->
        <ul class="clearfix" :data="redOdd">
          <li class="fl red_FD" v-for="(v, o) in redOdd" :key="o">
            <!-- <router-link :to="{name:'red',query:{id:v.lottery_id}}"> -->
            <div class="new_left fl ">
              <div class="plan-con clearfix">
                <div class="new_img1 fl">
                  <router-link :to="'/expertMsg/' + v.expert_id+ '/' +v.lottery_id">
                    <div class="new_img">
                      <img v-lazy="v.avatar" alt />
                    </div>
                  </router-link>
                </div>
                <div class="new_num fl">
                  <div class="clearfix">
                    <div class="scheme_name fl">
                      <span
                        style="color:#333;font-size:16px;margin-right:10px"
                        >{{ v.nickname }}</span
                      >
                    </div>
                    <div class="fr">
                      <span style="font-size:14px;color:#999999"
                        >{{ v.issue }}期</span
                      >
                      <!-- <span
                            style="color:#ff1c30;font-weight: 600;font-size:28px;margin-left:10px;font-family: number1;"
                            >{{ v.hit_rate * 100 }}</span
                          > -->
                      <!-- <span style="color:#ff1c30;font-size:14px;">%</span> -->
                    </div>
                  </div>
                  <div class="percent-box">
                    <span class="percentage Win-rate"
                      >胜率 {{ v.win_rate_mul_100}}%</span
                    >
                    <span class="percentage profit"
                      >盈利 {{ v.profit_rate_mul_100 }}%</span
                    >
                    <span class="percentage Even-red"
                      >{{ v.winning > 0 ? v.winning : 0 }} 连红</span
                    >
                  </div>
                  <div style="margin-top: 12px;" class="clearfix">
                    <div class="scheme_pai fl">{{ v.method }}</div>
                    <div class="fl scheme_time">
                      <ul class="clearfix">
                        <li
                          class="fl"
                          :class="ball | filterBallColor1"
                          v-for="(ball, index4) in v.code.split(',')"
                          :key="index4"
                        >
                          {{ ball }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="win-box clearfix">
                <span>近十场</span>
                <span v-for="(i, index) in v.last_10_games" :key="index">
                  <b class="ten-sheng" v-if="i == 1">胜</b>
                  <b class="ten-fu" v-if="i == 0">负</b>
                </span>
              </div>
            </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
      <!-- 分页 -->
      <div class="block fenye" v-if="redOdd.length">
        <el-pagination
          @current-change="current_change"
          :page-size="18"
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="currentPage"
          style="text-align: center;margin-top:30px;"
          :hide-on-single-page="false"
        ></el-pagination>
      </div>

      <!-- 未加载 -->
      <div v-if="!redOdd.length " class="weijiazai">
        正在加载 <i class="el-icon-loading"></i>
      </div>
      <!-- <div class="weijiazai" v-if="total==0" style="font-size:12px;">暂无专家推荐哟~</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "red",
  data() {
    return {
      lotteryList: [], //所有彩种的信息
      redOdd: [], //专家红单的数据
      currentPage: 1,
      total: 0, //默认当前页为第一页
      pageSize: 18, //每页显示
      limit: 18, //请求条数
      lotteryMsg: [], //最新一期开奖信息
      msg: "", //从首页跳转过来时的当前彩种信息
      lotteryId: "",
      lotteryName: "",
      lotteryImg: "",
      lotteryIssue: "", //专家计划的期号
      lotteryIssueAdd: "", //下一期
      codes: [], //当前开奖期数
      next_lottery_time: "", //下次开奖的时间戳
      next_time: "--:--", //下次开奖的时间  渲染页面
      input: "", //搜索框输入的内容
      activeClass1: 0,
      activeClass2: 0,
      methods: [
        { text: "名次" },
        { text: "龙虎" },
        { text: "单双" },
        { text: "大小" }
      ],
      rankings: [
        { text: "冠军" },
        { text: "亚军" },
        { text: "第三名" },
        { text: "第三名" },
        { text: "第五名" },
        { text: "第六名" },
        { text: "第七名" },
        { text: "第八名" },
        { text: "第九名" },
        { text: "第十名" },
        { text: "冠亚和" }
      ],
      // longhu:[
      //   {text:"第一名"},
      //   {text:"第二名"},
      //   {text:"第三名"},
      //   {text:"第四名"},
      //   {text:"第五名"},
      // ],
      legouImg: require("../../static/site/imgs/load.png"), //请求还没来的时候  默认显示的图片
      hour1: "-",
      hour2: "-",
      min1: "-",
      min2: "-",
      sec1: "-",
      sec2: "-",
      d: 0,
      d1: 0,
      plan: true,
      route: false
    };
  },
  created() {
    this.lotteryId =parseInt(this.$route.params.id); 
  },
  mounted() {
    this.getLottery();
    this.getLotteryMsg();
    window.timer1 = setInterval(this.timer, 1000); //开奖倒计时
    // this.lotteryId = this.$route.query.id;
  },
  destroyed() {
    //关闭计时器
    if (window.timer1) clearInterval(window.timer1);
  },
  watch: {
    //监听路由参数的变化  更新页面数据
    $route(to, from) {
      this.currentPage = 1;
      this.getLottery();
      this.getLotteryMsg();
      if (this.lotteryId != this.$route.params.id) {
        this.route = true;
      }
    },
    next_lottery_time() {
      if (this.next_lottery_time == 0) {
        //在开奖时间由整数变为负数的时候请求下一期的专家计划
        this.$http
          .get("/forum/plan/index", {
            params: {
              lottery_id: this.$route.params.id,
              issue: this.lotteryIssueAdd,
              limit: 18
            }
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.redOdd = res.data.data;
              this.plan = false;
            }
          });
      }
    }
  },

  methods: {
    //获取所有彩种信息
    getLottery() {
      this.$http.post("/open/idx/sort/").then(res => {
        if (res && res.data.code == 1) {
          this.lotteryList = res.data.data;
          // 通过lotteryId    来匹配lotteryName    lotteryImg
          this.lotteryId = this.$route.params.id;
          this.msg = this.lotteryList.filter(
            item => item.lottery_id == this.$route.params.id
          );
          for (var i = 0; i < this.msg.length; i++) {
            (this.lotteryName = this.msg[0].cname),
              (this.lotteryImg = this.msg[0].logo_url);
          }
        }
      });
    },

    //点击切换名次的样式
    // changeType(index) {
    //   this.activeClass1 = index;
    // },
    //点击切换冠军的样式
    // changeRank(index) {
    //   this.activeClass2 = index;
    // },

    //专家计划分页的处理
    current_change(val) {
      this.page = val;
      this.getPlan(this.page); //改变当前页
    },

    //获取最新一期开奖信息
    getLotteryMsg() {
      this.$http
        .post("/open/idx/indexNewOne", { lottery_id: this.$route.params.id })
        .then(res => {
          if (res && res.data.code == 1) {
            this.lotteryMsg = res.data.data;
            // //console.log(this.lotteryMsg);
            this.codes = res.data.data.code.split(","); //开奖号码
            this.next_lottery_time = res.data.data.next_lottery_time; //距下次开奖的时间戳
            this.lotteryIssue = res.data.data.issue; //开奖期号
            this.lotteryIssueAdd = this.lotteryIssue - 0 + 1;
            if (this.plan == true || this.route == true) {
              this.getPlan(1);
            }
            this.route = false;
          }
        });
    },
    //获取专家计划   在开奖时间为负数的时候请求一次  渲染页面
    getPlan(val) {
      this.$http
        .get("/forum/plan/index", {
          params: {
            lottery_id: this.$route.params.id,
            issue: this.lotteryIssue,
            limit: 18,
            page: val
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.redOdd = res.data.data;
            this.total = res.data.total;
            // //console.log(this.redOdd);
          }
        });
    },

    timer: function() {
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

        this.d = parseInt(d % 10); // 个位数
        this.d1 = parseInt(d / 10); // 十位数
        // this.d=d
        this.hour1 = parseInt(h % 10); // 个位数
        this.hour2 = parseInt((h % 100) / 10); // 十位数
        this.min1 = parseInt(minute % 10); // 个位数
        this.min2 = parseInt((minute % 100) / 10); // 十位数
        this.sec1 = parseInt(second % 10); // 个位数
        this.sec2 = parseInt((second % 100) / 10); // 十位数

        this.plan = true;
      } else {
        // //console.log("开奖中...");
        this.d = 0;
        this.d1 = 0;
        this.hour1 = "-";
        this.hour2 = "-";
        this.min1 = "-";
        this.min2 = "-";
        this.min1 = "-";
        this.sec1 = "-";
        this.sec2 = "-";
        this.plan = false;
        this.getLotteryMsg(); //倒计时的开奖时间为负数之后  处于开奖中的状态   一直请求当前彩种的数据
      }
    }
  }
};
</script>

<style scoped lang="less">
.weijiazai {
  height: 208px;
  text-align: center;
  line-height: 208px;
  font-size: 20px;
}
#red .active1 {
  color: #ff1c30;
  p {
    background: #ff1c30;
  }
}
#red .active2 {
  color: #fff;
  background: #ff1c30;
}

#red {
  background-color: #f4f5f8;
  padding-bottom: 53px;
  min-height: 900px;
}

.lotteryHead {
  width: 100%;
  height: 187px;
  padding-right: 40px;
  background: #fff;
  overflow: hidden;
  margin: 10px auto;
  border-radius: 4px;
  border: 1px solid #fff;
  .lotteryImg {
    margin-top: 28px;
    padding-top: 10px;
    margin-left: 54px;
    padding-right: 31px;
    margin-bottom: 26px;
    padding-bottom: 25px;
    float: left;
    text-align: center;
    border-right: 1px solid #eee;
    div {
      width: 102px;
      height: 93px;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 102px;
        height: 93px;
      }
    }
  }
  .lotteryType {
    float: left;
    height: 100%;
    margin-left: 31px;
    .lotteryName {
      margin-top: 47px;
      .lotteryName {
        font-weight: bold;
        font-size: 18px;
        color: #333;
        margin-right: 12px;
      }
      i {
        color: #999;
        font-size: 14px;
        .lotteryIssue {
          text-align: center;
          padding: 0 5px;
          color: red;
        }
      }
    }
    .lotteryNum {
      margin-top: 24px;
      overflow: hidden;

      p {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        float: left;
        background: #ff1c30;
        color: #fff;
        font-weight: bold;
        font-size: 20px;
        margin-right: 14px;
      }
    }
    .lotteryIng {
      margin-top: 24px;
      color: red;
      font-size: 20px;
    }
    .SixSx {
      width: 36px;
      height: 72px !important;
      background: none;
      div {
        border-radius: 50%;
        color: #fff;
        &:nth-child(2) {
          color: #333;
          font-weight: normal;
          font-size: 14px;
        }
      }
      &:nth-last-child(1) {
        position: relative;
        margin-left: 30px;
        &:before {
          content: "";
          position: absolute;
          top: 10px;
          left: -30px;
          background: url("../../assets/imgaes/main/six+.png") no-repeat;
          background-size: contain;
          width: 15px;
          height: 15px;
        }
      }
    }
    ul {
      li {
        float: left;
        width: 36px;
        height: 36px;
        font-size: 20px;
        font-weight: bold;
        // background: #f2f2f2;
        color: #fff;
        text-align: center;
        background-color: #0084ff;
        margin-right: 14px;
        border-radius: 50%;
        line-height: 36px;
        // background: #ff1c30;
        font-family: number1;
      }
    }
  }
  .lotteryTime {
    margin-top: 28px;
    padding-top: 22px;
    margin-bottom: 11px;
    padding-bottom: 10px;
    padding-left: 50px;
    float: right;
    /*padding-right:41px; */
    // width: 244px;
    border-left: 1px solid #eee;
    p {
      /*padding-left:52px;*/
      color: #999;
      font-size: 14px;
      border-radius: 4px;
      span {
        text-align: center;
        padding: 0 5px;
        color: red;
      }
    }
    div {
      /*padding-left:50px;*/
      margin-top: 25px;
      span {
        width: 21px;
        height: 37px;
        border-radius: 3px;
        line-height: 37px;
        text-align: center;
        color: #fffefe;
        font-size: 20px;
        font-weight: bold;
        margin: 0 1px;
        display: inline-block;
        background: linear-gradient(
          0deg,
          rgba(39, 49, 58, 1) 1%,
          rgba(58, 67, 74, 1) 48%,
          rgba(35, 47, 55, 1) 50%,
          rgba(57, 66, 73, 1) 100%
        );
      }
      i {
        height: 37px;
        line-height: 37px;
        color: #333;
        font-size: 14px;
        margin: 0 7px;
      }
    }
  }
}

.lot {
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  width: 100%;
  height: 111px;
  .lotteryMethod {
    width: 1156px;
    height: 47px;
    line-height: 47px;
    margin-left: 22px;
    border-bottom: 1px solid #f4f5f8;
    display: inline-block;
    div {
      margin-right: 77px;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      float: left;
      position: relative;
      p {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 4px;
        border-radius: 2px;
      }
    }
    .search {
      float: right;
      width: 190px;
      height: 30px;
      background: #f5f5f5;
      border-radius: 4px;
      margin-top: 8px;
      display: flex;
      align-items: center;
      input {
        background: #f5f5f5;
        font-size: 14px;
        color: #ccc;
        margin-left: 10px;
        width: 150px;
      }
      i {
        color: #ccc;
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        border-left: 1px solid #e9e9e9;
        width: 20px;
        text-align: center;
        padding-left: 6px;
      }
    }
  }
  .lotteryRanking {
    width: 100%;
    height: 63px;
    line-height: 63px;
    margin-top: 18px;
    margin-left: 20px;
    p {
      font-size: 16px;
      width: 50px;
      height: 24px;
      line-height: 24px;
      color: #999;
      font-size: 12px;
      float: left;
      text-align: center;
      border-radius: 12px;
      cursor: pointer;
      margin-right: 27px;
    }
  }
}

.expertPlan {
  width: 100%;
  .expertPage {
    margin: 20px auto;
    width: 20%;
    text-align: center;
  }
}

.expertAll {
  width: 100%;
  margin-top: -10px;
  .expert:nth-child(3n) {
    margin-right: 0;
  }
  .expert {
    margin-top: 10px;
    margin-bottom: -5px;
    width: 393px;
    height: 100px;
    border: 1px solid #fff;
    background: #fff;
    border-radius: 4px;
    margin-right: 10px;
    overflow: hidden;
    display: inline-block;
    .lotteryImg {
      width: 106px;
      height: 100px;
      // position: relative;
      float: left;
      margin-top: 18px;
      div {
        width: 66px;
        height: 66px;
        margin: 0 auto;
        // background: url("../../static/site/imgs/load.png") no-repeat center;
        // background-size: 100% 100%;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
        img {
          width: auto;
          height: 100%;
        }
      }
      // p{    //  专家的定位
      //   position: absolute;
      //   left:48%;
      //   top:72px;
      //   background: red;
      //   color:#fff;
      //   width: 50%;
      //   width: 35px;
      //   text-align: center;
      //   border-radius: 3px;
      // }
    }
    .lotteryType {
      float: left;
      height: 100px;
      width: 285px;
      .lotteryName {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        overflow: hidden;
        .nickname {
          margin-top: 26px;
          font-size: 16px;
          color: #333;
        }
        .nic {
          .sheng {
            color: #999;
            margin-right: 10px;
            margin-top: 3px;
            float: left;
            font-size: 14px;
          }
          .number {
            color: #ff1c30;
            font-size: 28px;
            float: right;
            margin-right: 20px;
            font-weight: bold;
            .bai {
              font-size: 14px;
            }
          }
        }
      }
      .lotteryNum {
        overflow: hidden;
        margin-top: 19px;
        // margin-right: 38px;
        .guan {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          margin-right: 20px;
          &:nth-last-child(1) {
            margin-right: 0;
          }
        }
        .guanNum {
          font-size: 16px;
          font-weight: bold;
          color: #ff1c30;
          margin-right: 16px;
          font-family: number1;
        }
      }
    }
  }
}

.expertAll {
  // height: 360px;
  > ul {
    // height: 360px;
  }
  img {
    width: auto;
    height: 100%;
  }
  .scheme_name {
    color: #ccc;
    // padding-top: 6px;
  }
  .red_FD {
    transition: box-shadow 0.1, transform 0.1s;
    -webkit-transition: box-shadow 0.1s, transform 0.1s;
    // &:hover {
    //   transform: scale(1.01);
    // }
  }
  .new_left {
    padding-top: 26px;
    padding-left: 20px;
    // width: 385px;
    // padding-right: 20px;

    .new_num {
      // margin-top: 8px;
      // margin-left: 10px;
      width: 473px;
      ul {
        li {
          float: left;
          margin-right: 16px;
          color: #ff1c30;
          font-weight: 600;
          // font-size: 16px;
          font-family: number1;
        }
      }
    }
  }
  .scheme_time {
    // margin-top: 20px;
    font-size: 16px;
  }
  .scheme_time2 {
    // margin-top: 20px;
    font-size: 20px;
  }

  .scheme_pai {
    font-size: 16px;
    color: #333;
    // margin-top: 19px;
    font-weight: Bold;
    margin-right: 20px;
  }

  .fenye {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 100px;
    height: 100px;
  }
  > ul {
    > li {
      width: 595px;
      border-radius: 5px;
      margin-right: 10px;
      margin-top: 10px;
      // height: 100px;
      height: 172px;
      background: #fff;
      // &:nth-child(3) {
      //   margin-right: 0;
      // }
      &:nth-of-type(2n) {
        margin-right: 0;
      }
      .new_left {
        .new_img1 {
          width: 66px;
          height: 66px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 17px;
          margin-top: 6px;
          img{
            width: 100%;
            height: auto;
          }
        }
        // .new_img3 {
        //   position: absolute;
        //   bottom: 0;
        //   right: 0;
        //   // padding: 1px 3px ;
        //   background: #ff5d61;
        //   color: #fff;
        //   font-size: 12px;
        //   width: 30px;
        //   height: 16px;
        //   text-align: center;
        //   line-height: 16px;
        //   border-radius: 3px;
        // }
        .new_img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          overflow: hidden;
          // img{
          //   width: auto;
          //   height: 100%;
          // }
        }
      }
    }
  }
  .percent-box {
    margin-top: 12px;
    .percentage {
      padding: 0 10px;
      border-radius: 0px 11px 11px 11px;
      height: 22px;
      line-height: 22px;
      color: #fff;
      font-size: 14px;
      margin-right: 10px;
    }
    .Win-rate {
      background: linear-gradient(
        90deg,
        rgba(123, 182, 255, 1) 0%,
        rgba(113, 120, 255, 1) 100%
      );
      background: -webkit-linear-gradientlinear-gradient(
        90deg,
        rgba(123, 182, 255, 1) 0%,
        rgba(113, 120, 255, 1) 100%
      );
      background: -o-linear-gradient(
        90deg,
        rgba(123, 182, 255, 1) 0%,
        rgba(113, 120, 255, 1) 100%
      );
      background: -moz-linear-gradientlinear-gradient(
        90deg,
        rgba(123, 182, 255, 1) 0%,
        rgba(113, 120, 255, 1) 100%
      );
    }
    .profit {
      background: linear-gradient(
        90deg,
        rgba(255, 200, 104, 1) 0%,
        rgba(255, 126, 31, 1) 100%
      );
      background: -webkit-linear-gradientlinear-gradient(
        90deg,
        rgba(255, 200, 104, 1) 0%,
        rgba(255, 126, 31, 1) 100%
      );
      background: -o-linear-gradient(
        90deg,
        rgba(255, 200, 104, 1) 0%,
        rgba(255, 126, 31, 1) 100%
      );
      background: -moz-linear-gradientlinear-gradient(
        90deg,
        rgba(255, 200, 104, 1) 0%,
        rgba(255, 126, 31, 1) 100%
      );
    }
    .Even-red {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 166, 127, 1) 0%,
        rgba(255, 81, 62, 1) 100%
      );
      background: -webkit-linear-gradientlinear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 166, 127, 1) 0%,
        rgba(255, 81, 62, 1) 100%
      );
      background: -o-linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 166, 127, 1) 0%,
        rgba(255, 81, 62, 1) 100%
      );
      background: -moz-linear-gradientlinear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 1) 0%,
        rgba(255, 166, 127, 1) 0%,
        rgba(255, 81, 62, 1) 100%
      );
    }
  }
  .win-box {
    padding-top: 20px;
    // height: 20px;
    // line-height: 20px;
    font-size: 14px;
    color: #333;
    margin-left: 20px;
    span {
      display: block;
      float: left;
      height: 20px;
      line-height: 20px;
      padding-right: 35px;
      &:nth-child(1) {
        padding-right: 20px;
      }
      &:nth-last-child(1) {
        padding-right: 0;
      }
      .ten-sheng {
        color: #ff1c30;
      }
      .ten-fu {
        color: #999;
      }
    }
  }
}
</style>
