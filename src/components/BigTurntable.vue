<template>
  <div id="bigTable">
    <div class="big-box">
      <div class="big-table" :class="lotteryType == 1 ? 'yecj' : 'zscj'">
        <div class="clearfix">
          <div class="my-winning fl" @click="winningRcord = true">我的中奖</div>
          <div class="rule fr" @click="rulePopup = true">抽奖规则</div>
          <i class="big-close" @click="closeToast"
            ><img src="../assets/imgaes/BigTurntable/big-close.png" alt=""
          /></i>
        </div>
        <div class="clearfix big-content">
          <div class="fl">
            <div class="zp-left">
              <span class="lottery-button" @click="beginRotate()">
                <img
                  v-show="lotteryType == 1"
                  src="../assets/imgaes/BigTurntable/big-bottom-ye.png"
                  alt=""
                />
                <img
                  v-show="lotteryType == 0"
                  src="../assets/imgaes/BigTurntable/big-bottom-zs.png"
                  alt=""
                />
              </span>
              <div class="turnTable" :style="rotateStyle">
                <div class="prize-list">
                  <div
                    class="prize-item"
                    v-for="(item, index) in prizeList"
                    :key="index"
                    :style="item.style"
                  >
                    <div class="prize-pic" v-if="item.name != '谢谢参与'">
                      <img
                        :src="item.icon"
                        :class="{
                          wzs: item.name == '钻石',
                          car: item.name == '帝王花车',
                          fhjc: item.name == '凤凰机车',
                          lbjn: item.name == '兰博基尼',
                        }"
                      />
                    </div>
                    <div class="prize-pic" v-if="item.name == '谢谢参与'">
                      <img style="margin-top: 70px" :src="item.icon" />
                    </div>
                    <div
                      class="prize-type"
                      :class="item.name == '谢谢参与' ? 'xxcy' : ''"
                    >
                      {{ item.name }}
                    </div>
                    <div v-if="item.name != '谢谢参与' && lotteryType == 1">
                      {{ item.number }}
                    </div>
                    <div v-if="item.name != '谢谢参与' && lotteryType == 0">
                      *{{ item.number }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="Remain-box fl" v-show="lotteryType == 1">
              抽奖<i>{{ unitPrice }}</i
              >元/次
            </div>
            <div class="Remain-box fl" v-show="lotteryType == 0">
              剩余<i>{{ count }}</i
              >次 抽奖
            </div>
          </div>
          <div class="zp-rigth fr">
            <div class="win-record wrap">
              <h4 class="title">中奖记录</h4>
              <marquee scrollAmount="3" scrolldelay="50" direction="up">
                <ul>
                  <li v-for="(v, index) in recordList" :key="index">
                    {{ v.phone }} <span>抽中</span>{{ v.name }}*{{ v.number }}
                  </li>
                </ul>
              </marquee>
            </div>
          </div>
          <div class="balance blue fr" v-show="lotteryType == 1">
            <div class="num fl">
              <img src="../assets/imgaes/BigTurntable/icon-ye.png" alt="" />
              <span
                >Số dư：<strong>{{ useMoney }}</strong></span
              >
            </div>
            <div class="buy-btn fr" @click="recharge()">Nạp</div>
          </div>
          <div class="balance red fr" v-show="lotteryType == 0">
            <div class="num fl">
              <img src="../assets/imgaes/BigTurntable/icon-zs.png" alt="" />
              <span
                >钻石：<strong>{{ zsMount }}</strong></span
              >
            </div>
            <div class="buy-btn fr" @click="goBuyTime">购买抽奖次数</div>
          </div>
        </div>
        <div class="big-tab">
          <span :class="lotteryType == 1 ? 'tab-ye' : ''" @click="lotteryTab(1)"
            >余额抽奖</span
          >
          <span :class="lotteryType == 0 ? 'tab-zs' : ''" @click="lotteryTab(0)"
            >钻石抽奖</span
          >
        </div>
        <!-- 抽奖规则 -->
        <div class="rule-box" v-if="rulePopup">
          <img
            @click="rulePopup = false"
            class="rule-close"
            src="../assets/imgaes/BigTurntable/rule-close.png"
            alt=""
          />
          <h4>抽奖规则</h4>
          <h5>
            天天赢好礼，幸运大转盘，为回馈广大新老用户，特此推出幸运大转盘活动。
          </h5>
          <div class="content">
            <div class="item">
              <h6>一、活动规则</h6>
              <p>1、凡是我平台会员，均可参加。</p>
              <p>2、转盘抽奖分为“余额抽奖”和“钻石抽奖”。</p>
              <p>
                3、“余额抽奖”每次消耗 2 元，自动扣除，余额不足时无法抽奖，升级
                VIP 可获得免费余额抽奖 次数。
              </p>
              <p>
                4、“钻石抽奖”每次消耗 20 钻石，抽奖次数
                不足时及时购买抽奖次数，钻石不足时，及时兑换
                钻石，升级贵族可获得免费钻石抽奖次。
              </p>
              <p>
                5、点击大转盘中心的“抽奖”按钮即可抽奖，待
                转盘停止时，转盘指针指向的奖品则为本次抽奖所得。
              </p>
            </div>
            <div class="item">
              <h6>二、奖品设置</h6>
              <table>
                <tr>
                  <td>余额抽奖</td>
                  <td>0.18 元</td>
                  <td>0.38 元</td>
                  <td>0.88 元</td>
                  <td>再来一次</td>
                  <td>5.88 元</td>
                  <td>18.88 元</td>
                  <td>38.88 元</td>
                  <td>谢谢参与</td>
                </tr>
                <tr>
                  <td>钻石抽奖</td>
                  <td>5钻石</td>
                  <td>10 钻石</td>
                  <td>炸弹*5</td>
                  <td>288 钻石</td>
                  <td>凤凰机车*1</td>
                  <td>兰博基尼*1</td>
                  <td>帝王花车*1</td>
                  <td>谢谢参与</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购买次数弹窗 -->
    <div class="buy-time" v-if="isBuy">
      <div class="bug-time-content">
        <div class="remove-btn" @click="removeBtn()"></div>
        <p class="buy-tip">购买抽奖次数</p>
        <p class="buy-num">购买数量</p>
        <div class="total-zs">{{ buyTime * 20 }}<i></i></div>
        <div class="input-box">
          <div
            class="cut-btn"
            :class="buyTime == 0 ? '' : 'active'"
            @click="changeTime(0)"
          ></div>
          <input type="tel" v-model="buyTime" maxlength="9" />
          <div
            class="add-btn"
            :class="buyTime >= 999999999 ? 'active' : ''"
            @click="changeTime(1)"
          ></div>
        </div>
        <div class="bug-btn" @click="toBuy">Xác nhận</div>
      </div>
    </div>
    <!-- 钻石不足 -->
    <div class="exchange-pup" v-if="exchangePup">
      <div class="pup-content">
        <div class="pup-close" @click="exchangePup = false">
          <img src="../assets/imgaes/BigTurntable/x-2.png" alt="" />
        </div>
        <div v-if="lotteryType == 1">
          <img
            style="width: 80%"
            src="../assets/imgaes/BigTurntable/cz-pic.png"
            alt=""
          />
          <p>您的余额不足请充值</p>
          <div class="btn" @click="recharge()">Nạp</div>
        </div>
        <div v-if="lotteryType == 0">
          <img
            style="width: 58%; margin-top: 40px"
            src="../assets/imgaes/BigTurntable/dh-pic.png"
            alt=""
          />
          <p>钻石余额不足，快去兑换吧</p>
          <div class="btn" @click="goExcharge()">去兑换</div>
        </div>
      </div>
    </div>

    <!-- 中奖记录 -->
    <div class="winning-record" v-if="winningRcord">
      <div class="record-content">
        <div class="title-box">
          <div class="back fl" @click="winningRcord = false">返回抽奖</div>
          <h4>中奖记录</h4>
          <div class="record-tab">
            <span
              :class="lotteryType == 1 ? 'active' : ''"
              @click="prizeRecord(1)"
              >Số dư</span
            >
            <span
              :class="lotteryType == 0 ? 'active' : ''"
              @click="prizeRecord(0)"
              >钻石</span
            >
          </div>
        </div>
        <div class="prize-record" v-if="lotteryType == 1">
          <dl>
            <dt>
              <span class="fl">时间</span>
              <span class="fr">奖品</span>
            </dt>
            <dd v-for="(v, index) in recordList" :key="index">
              <span class="fl">{{ v.created_time }} </span>
              <span class="fr">{{ v.name }}*{{ v.number }}</span>
            </dd>
          </dl>
          <el-pagination
            small
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            :current-page="page"
            @current-change="handleCurrentChange1"
          ></el-pagination>
        </div>
        <div class="prize-record" v-if="lotteryType == 0">
          <dl>
            <dt>
              <span class="fl">时间</span>
              <span class="fr">奖品</span>
            </dt>
            <dd v-for="(v, index) in recordList" :key="index">
              <span class="fl">{{ v.created_time }}</span>
              <span class="fr">{{ v.name }}*{{ v.number }}</span>
            </dd>
          </dl>
          <el-pagination
            small
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            :current-page="page"
            @current-change="handleCurrentChange2"
          ></el-pagination>
        </div>
      </div>
    </div>
    <Recharge v-if="isRecharge" :show="isRecharge" v-on:childFn="resetFlag" />
    <Excharge :showEx="isEX" v-on:childExFn="resetExFlag" />
  </div>
</template>

<script>
import { alertComfirm } from "../assets/js/public";
const CIRCLE_ANGLE = 360;

const config = {
  // 总旋转时间
  duration: 3000,
  // 旋转圈数
  circle: 8,
  mode: "ease-in-out",
};
export default {
  data() {
    return {
      rulePopup: false, //抽奖规则
      lotteryType: 1, //抽奖右侧切换
      exchangePup: false, //余额、钻石不足
      winningRcord: false, // 中奖记录弹窗
      limit: 10, //每页多少条
      page: 1,
      total: null,
      prizeList: [], //礼物列表
      useMoney: null, //余额
      unitPrice: "", //大转盘余额抽奖单次价格
      count: 20, // 剩余抽奖次数
      duration: 3000, // 转盘旋转时间
      //   prizeList: [], // 奖品列表
      rotateAngle: 0, // 旋转角度
      index: 0,
      prize: null,
      recordList: [],
      isSeeTime: false,
      tipsTitle: "很遗憾！",
      tipsText: "此次没有中奖，再接再厉",
      isShowDZP: true,
      isBuy: false,
      buyTime: 1,
      prizeObj: {},
      isKc: true,
      isRecharge: false,
      isEX: false, //兑换
      zsMount: null,
    };
  },
  created() {
    // 初始化一些值
    this.angleList = [];
    // 是否正在旋转
    this.isRotating = false;
    // 基本配置
    this.config = config;

    // 获取奖品列表
    this.getTurntable();
    this.getRecordList();
    this.getUnitPrice();
    //this.zsQuest();
  },
  computed: {
    rotateStyle() {
      return `
        -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
        transition: transform ${this.config.duration}ms ${this.config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`;
    },
  },
  watch: {
    buyTime: function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();

          this.buyTime = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
    },
  },
  methods: {
    goBuyTime() {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (
        this.$store.state.codeToken &&
        this.$store.state.userinfo.user_id < 0
      ) {
        this.$confirm(
          "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
          "Nhắc nhở",
          {
            confirmButtonText: "注册",
            cancelButtonText: "登录",
            confirmButtonClass: "rechargeButton",
            cancelButtonClass: "backButton",
            roundButton: true,
            customClass: "swBox",
            center: true,
            showCancelButton: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
          }
        )
          .then(() => {
            // this.$store.commit('SETUSERTOKEN','');
            this.$store.commit("SETLOGIN", true);
            this.$store.commit("SETISLOGIN", false);
          })
          .catch((action) => {
            if (action === "cancel") {
              //  this.$store.commit('SETUSERTOKEN','');
              this.$store.commit("SETLOGIN", true);
            }
          });
        return;
      }
      this.isBuy = true;
    },
    resetFlag(flag) {
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      this.isEX = flag;
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (
        !this.$store.state.codeToken ||
        this.$store.state.userinfo.user_id < 0
      )
        return;
      // this.zsMount = "loading...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.$store.state.userinfo.user_id
        )
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.zsMount = 0;
              // this.SETDIAMOND(0)
            } else {
              // this.zsMount = parseFloat(res.data.data.diamond).toFixed(2);
              this.zsMount = parseFloat(res.data.data.diamond);
              // this.SETDIAMOND(res.data.data.diamond);
            }
          }
        })
        .catch((res) => {
          this.zsMount = "0.00";
        });
    },
    lotteryTab(type) {
      this.lotteryType = type;
      // this.page = 1 ;
      this.getTurntable();
      this.getRecordList();
    },
    changeTime(f) {
      if (f) {
        if (this.buyTime >= 999999999) {
          this.buyTime = 999999999;
          // this.$vux.toast.text('');
        } else this.buyTime++;
      } else {
        if (this.buyTime < 1) this.buyTime = 0;
        else this.buyTime--;
      }
    },
    async toBuy() {
      if (this.buyTime < 1)
        return this.$message({
          message: "至少购买一次",
          type: "warning",
        });
      let res = await this.$http.post("/api/v2/user/get_turntable_chance/", {
        times: this.buyTime,
      });
      console.log(res);
      if (res && res.data.code == 1) {
        this.buyTime = 1;
        this.count = res.data.data.times_now;
        this.isBuy = false;
        //this.zsQuest();
        this.$message({
          message: res.data.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
        this.isBuy = false;
        this.exchangePup = true;
      }
    },
    removeBtn() {
      this.isBuy = false;
    },
    //大转盘礼物列表
    getTurntable() {
      this.$http
        .get(this.versionLive2 + "user/turntable_list/", {
          params: {
            get_type: this.lotteryType,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            //console.log(res);
            this.prizeList = this.formatPrizeList(res.data.data);
            this.count = res.data.draws_num;
            this.useMoney = res.data.user_money;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        });
    },
    //大转盘余额抽奖单次价格
    async getUnitPrice() {
      let res = await this.$http.get(
        this.versionLive2 + "user/get_turntable_money/"
      );
      if (res && res.data.code == 1) {
        //console.log(res)
        this.unitPrice = res.data.data.unit_price;
      }
    },
    //获取中奖记录
    async getRecordList(page) {
      let res = await this.$http.get(
        this.versionLive2 + "user/turntable_log/",
        {
          params: {
            limit: this.limit,
            type: this.lotteryType,
            page: page || this.page,
          },
        }
      );
      if (res && res.data.code == 1) {
        console.log(res);
        this.recordList = res.data.data;
        this.total = res.data.total;
      }
    },
    // initPrizeList() {
    // // 这里可以发起请求，从服务端获取奖品列表
    // // 这里使用模拟数据

    //   this.prizeList = this.formatPrizeList(prizeList)
    // },
    // 格式化奖品列表，计算每个奖品的位置
    formatPrizeList(list) {
      // 记录每个奖的位置
      const angleList = [];

      const l = list.length;
      // 计算单个奖项所占的角度
      const average = CIRCLE_ANGLE / l;

      const half = average / 2;

      // 循环计算给每个奖项添加style属性
      list.forEach((item, i) => {
        // 每个奖项旋转的位置为 当前 i * 平均值 + 平均值 / 2
        const angle = -(i * average + half);
        // 增加 style
        item.style = `-webkit-transform: rotate(${angle}deg);
                        transform: rotate(${angle}deg);`;

        // 记录每个奖项的角度范围
        angleList.push(i * average + half);
      });

      this.angleList = angleList;

      return list;
    },
    openBuy() {
      this.isSeeTime = false;
      this.isBuy = true;
    },
    async beginRotate() {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          // this.$router.push('/login');
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      // 添加次数校验
      if (this.lotteryType == 0 && this.count === 0) {
        alertComfirm(
          {
            title: "Nhắc nhở",
            msg: "今日的抽奖次数已用完，您可以提高会员等级增加每日抽奖次数，也可以单独购买抽奖次数",
            conBtText: "购买抽奖次数",
          },
          () => {
            this.isBuy = true;
          }
        );
        return;
      }
      // 余额是否为0
      if ((this.lotteryType == 1 && this.useMoney == 0) || this.useMoney < 2) {
        this.exchangePup = true;
        return;
      }

      // 开始抽奖
      // 这里这里向服务端发起请求，得到要获得的奖
      // 可以返回下标，也可以返回奖品 id，通过查询 奖品列表，最终得到下标
      if (!this.isKc) return;
      this.isKc = false;
      let res = await this.$http.post(this.versionLive2 + "user/get_gift/", {
        get_type: this.lotteryType,
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.index = res.data.data.id;
        // 减少剩余抽奖次数
        this.count = res.data.data.time_now;
        //抽奖后金额
        this.useMoney = res.data.data.after_money;
        //中奖信息
        this.prizeObj = res.data.data;
        this.rotating();
      } else {
        alertComfirm(
          { title: "Nhắc nhở", msg: res.data.msg, conBtText: "Xác nhận " },
          () => {}
        );
      }
      // 开始旋转
      this.rotating();
    },
    random(max, min = 0) {
      return parseInt(Math.random() * (max - min + 1) + min);
    },
    rotating() {
      const { isRotating, angleList, config, rotateAngle, index } = this;

      if (isRotating) return;

      this.isRotating = true;
      let angle = 0;
      if (this.lotteryType == 0) {
        // 计算角度
        angle =
          // 初始角度
          rotateAngle +
          // 多旋转的圈数
          config.circle * CIRCLE_ANGLE +
          // 奖项的角度
          angleList[index - 0 - 1] -
          (rotateAngle % CIRCLE_ANGLE);

        this.rotateAngle = angle;
      } else if (this.lotteryType == 1) {
        // 计算角度
        angle =
          // 初始角度
          rotateAngle +
          // 多旋转的圈数
          config.circle * CIRCLE_ANGLE +
          // 奖项的角度
          angleList[index - 8 - 1] -
          (rotateAngle % CIRCLE_ANGLE);
        this.rotateAngle = angle;
      }

      // 旋转结束后，允许再次触发
      setTimeout(() => {
        this.rotateOver();
      }, config.duration + 1000);
    },
    rotateOver() {
      this.isRotating = false;
      this.isKc = true;
      this.prize = this.prizeObj;

      // console.log(this.prize, this.index);
      let tips;
      let title1;
      if (this.prize.status == 1) {
        title1 = "中奖啦";
        tips =
          "恭喜您获得" +
          this.prize.name +
          "*" +
          this.prize.number +
          ",稍后发放奖品，请耐心等待。";
      } else if (this.prize.status == -1) {
        title1 = "很遗憾！";
        tips = "此次没有中奖，再接再厉。";
      }
      alertComfirm({ title: title1, msg: tips, conBtText: "知道了" }, () => {});
    },
    //关闭弹窗
    closeToast() {
      // this.isShowDZP = false;
      this.$emit("closeFunc", false);
    },
    handleCurrentChange1(val) {
      // console.log(val)
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.page);
    },
    handleCurrentChange2(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.page);
    },
    recharge() {
      // this.$router.push('/userInfor')
      this.isRecharge = true;
    },
    goExcharge() {
      this.isEX = true;
    },
    prizeRecord(index) {
      //我的中奖记录
      this.lotteryType = index;
      this.getTurntable();
      this.page = 1;
      this.getRecordList(this.page);
    },
  },
};
</script>

<style lang="less" scoped>
#bigTable {
  width: 100%;
  .big-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    .rule {
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      background: linear-gradient(90deg, #ffb82c 0%, #ffe565 100%);
      border-radius: 77px;
      margin: 15px 82px 0 0;
      cursor: pointer;
    }
    .big-table {
      position: relative;
      // width: 1059px;
      height: 817px;
      width: 71%;
      min-width: 900px;
      // height: 77.66%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 2%;
      &.yecj {
        background: url("../assets/imgaes/BigTurntable/big-bg2.png") no-repeat;
        background-size: contain;
        .lottery-button {
          margin-top: 34% !important;
        }
        .turnTable {
          background: url("../assets/imgaes/BigTurntable/big-ye.png") no-repeat;
          background-size: contain;
        }
        .win-record {
          background: url("../assets/imgaes/BigTurntable/zjjl-ye.png") no-repeat;
          background-size: 100% 100%;
          .title {
            color: #403dd6;
          }
          marquee {
            color: #403dd6;
          }
        }
        .prize-item {
          color: #752ce9 !important;
          &:nth-of-type(even) {
            color: #fff !important;
          }
        }
      }
      &.zscj {
        background: url("../assets/imgaes/BigTurntable/big-bg.png") no-repeat;
        background-size: contain;
        .turnTable {
          background: url("../assets/imgaes/BigTurntable/big-zs.png") no-repeat;
          background-size: contain;
        }
        .win-record {
          background: url("../assets/imgaes/BigTurntable/zjjl-zs.png") no-repeat;
          background-size: 100% 100%;
          .title {
            color: #ff3331;
          }
          marquee {
            color: #ff3331;
          }
        }
        .prize-item {
          color: #e0504e !important;
          &:nth-of-type(even) {
            color: #fff !important;
          }
        }
      }
      .my-winning {
        font-size: 24px;
        color: #fff;
        padding: 26px 0 2% 19px;
        cursor: pointer;
      }

      .big-close {
        display: block;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        width: 57px;
        height: 57px;
        img {
          width: 100%;
        }
      }
    }
  }
  .big-content {
    width: 85.5%;
    margin: 0 auto;
    // padding-top: 50px;
    .Remain-box {
      width: 402px;
      // width:29.5%;
      height: 81px;
      padding-top: 11%;
      margin-left: 5%;
      color: #fff;
      text-align: center;
      font-size: 24px;
      i {
        font-weight: bold;
        font-size: 30px;
        color: #fff;
        padding: 0 10px;
      }
    }
    .zp-left {
      // width: 55.9%;
      // width: 50%;
      width: 450px;
      height: 450px;
      // margin-left: 2%;
      position: relative;
      // margin-top: 100px;
      .lottery-button {
        width: 32%;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 32%;
        cursor: pointer;
        z-index: 10;
        img {
          width: 100%;
        }
      }
      .turnTable {
        // background: url("../assets/imgaes/BigTurntable/big-zs.png")no-repeat;
        // background-size: contain;
        width: 100%;
        height: 100%;
        .prize-list {
          width: 100%;
          height: 100%;
          position: relative;
          .prize-item {
            position: absolute;
            width: 95px;
            height: 220px;
            top: 0;
            left: 50%;
            margin-left: -47.5px;
            transform-origin: 50% 100%;
            text-align: center;
            color: #fff;
            font-weight: bold;
            .prize-pic {
              img {
                width: 44px;
                height: 45px;
                margin-top: 60px;
                &.wzs {
                  width: 25px;
                  height: 22px;
                  margin-top: 70px;
                }
                &.car {
                  width: 60px;
                  margin-top: 75px;
                  height: 48px;
                }
                &.fhjc {
                  width: 43px;
                  height: 48px;
                  margin-top: 55px;
                }
                &.lbjn {
                  width: 43px;
                  height: 48px;
                  margin-top: 55px;
                }
              }
            }
            .xxcy {
              margin-top: 0px;
            }
          }
        }
      }
    }
    .zp-rigth {
      width: 38.62%;
      margin-right: 1%;
      .win-record {
        width: 100%;
        height: 430px;
        font-size: 18px;
        line-height: 30px;
        color: #c54712;
        margin-bottom: 20px;
        padding-top: 75px;
        // margin-top: 10px;
        .title {
          font-weight: normal;
          font-size: 28px;
          text-align: center;
        }
        marquee {
          margin-top: 2%;
          overflow: hidden;
          height: 75%;
          ul {
            padding-left: 10%;
            li {
              span {
                display: inline-block;
                padding: 0px 30px;
              }
            }
          }
        }
      }
    }
    .balance {
      width: 48%;
      margin-top: 25px;
      &.blue {
        background: url("../assets/imgaes/BigTurntable/blue.png") no-repeat left
          top;
        background-size: contain;
      }
      &.red {
        background: url("../assets/imgaes/BigTurntable/red.png") no-repeat left
          top;
        background-size: contain;
      }
      .num {
        line-height: 60px;
        font-size: 24px;
        color: #fff;
        span {
          margin-left: 10px;
        }
        strong {
          font-size: 25px;
          font-weight: bold;
        }
      }
      .buy-btn {
        min-width: 40%;
        font-size: 24px;
        line-height: 45px;
        color: #fff;
        // margin: -20px auto 0 auto;
        text-align: center;
        cursor: pointer;
        background: linear-gradient(#ffe05f, #ffbf34);
        background-size: contain;
        border-radius: 30px;
        padding: 3px 10px;
        // img{
        //     width: 100%;
        // }
      }
    }
  }
  .big-tab {
    width: 59px;
    background: url("../assets/imgaes/BigTurntable/tab-bg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 13%;
    span {
      display: block;
      width: 59px;
      line-height: 30px;
      font-size: 22px;
      color: #333;
      text-align: center;
      padding: 25px 14px 25px 0;
      writing-mode: vertical-rl;
      word-spacing: 1.5em;
      letter-spacing: 0.3em;
      word-break: break-all;
      background: #fff;
      cursor: pointer;
      &:first-of-type {
        border-radius: 5px 0 0 5px;
      }
      &:last-of-type {
        border-radius: 0 0 0 5px;
      }
      &.tab-ye {
        background: url("../assets/imgaes/BigTurntable/tab-ye.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
      }
      &.tab-zs {
        background: url("../assets/imgaes/BigTurntable/tab-zs.png") no-repeat;
        background-size: 100% 100%;
        color: #fff;
      }
    }
  }
  .rule-box {
    position: absolute;
    width: 100%;
    min-width: 900px;
    left: 0;
    top: 0;
    background: #fff;
    border-radius: 10px;
    z-index: 11;
    padding: 20px 26px 140px 36px;
    .rule-close {
      width: 26px;
      height: 26px;
      position: absolute;
      right: 26px;
      top: 20px;
    }
    h4 {
      font-weight: normal;
      font-size: 24px;
      color: #445779;
      text-align: center;
      margin-bottom: 25px;
    }
    h5 {
      font-weight: normal;
      font-size: 24px;
      color: #1486ff;
      text-align: center;
      margin-bottom: 40px;
    }
    .content {
      .item {
        margin-bottom: 15px;
        h6 {
          font-weight: normal;
          font-size: 18px;
          color: #1486ff;
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: #445779;
          line-height: 34px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          border: 1px solid #6a86b9;
          margin-top: 20px;
          tr {
            border-collapse: collapse;
            border: 1px solid #6a86b9;
          }
          td {
            line-height: 60px;
            font-size: 24px;
            color: #445779;
            border-collapse: collapse;
            border: 1px solid #6a86b9;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    .big-title {
      padding-top: 30px !important;
      .Remain-box {
        font-size: 18px !important;
        //   margin-left: 4%!important;
        i {
          font-size: 20px !important;
        }
      }
    }

    .big-content {
      //   padding-top: 30px!important;
      .win-record {
        font-size: 14px !important;
        line-height: 28px !important;
        height: 370px !important;
      }
      .Remain-box {
        margin-left: 0% !important;
        padding-top: 4% !important;
      }
      .zp-left {
        width: 400px !important;
        height: 400px !important;
        //   margin-top: 70px!important;
        .prize-item {
          height: 200px !important;
        }
      }
      .balance {
        width: 55%;
        margin-left: -10%;
        margin-top: 0;
        .num {
          padding-right: 0%;
        }
      }
    }
  }
  @media screen and (min-width: 1201px) and (max-width: 1300px) {
    .Remain-box {
      margin-left: 4% !important;
      padding-top: 4% !important;
    }
    .big-content {
      //  padding-top: 30px!important;
      .win-record {
        height: 370px !important;
      }
    }
    .zp-left {
      width: 400px !important;
      height: 400px !important;
      //   margin-top:80px!important;
      .prize-item {
        height: 200px !important;
      }
    }
    .balance {
      width: 55% !important;
      margin-left: -9% !important;
      margin-top: 0 !important;
      .num {
        padding-right: 0%;
      }
    }
  }
}

// 充值兑换小弹窗
.exchange-pup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .pup-close {
    width: 30px;
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
  }
  .pup-content {
    width: 429px;
    height: 379px;
    background: url("../assets/imgaes/BigTurntable/pup-bg.png") no-repeat;
    background-size: contain;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 17px 25px;
    p {
      line-height: 30px;
      font-size: 24px;
      color: #999;
      padding: 15px 0;
    }
    .btn {
      width: 70%;
      line-height: 40px;
      font-size: 26px;
      color: #fff;
      background: linear-gradient(#ff7c64, #ff3534);
      border-radius: 30px;
      padding: 5px 10px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}

// 购买弹框
.buy-time {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .bug-time-content {
    width: 600px;
    height: 385px;
    position: absolute;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .remove-btn {
      width: 16px;
      height: 16px;
      background: url("../assets/imgaes/hmlz-icon2.png");
      background-size: contain;
      position: absolute;
      top: 29px;
      right: 31px;
      cursor: pointer;
    }
    .buy-tip {
      text-align: center;
      font-size: 24px;
      color: #222221;
      font-weight: bold;
      padding-bottom: 45px;
    }
    .buy-num {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      text-align: left;
      padding-left: 29px;
      margin-bottom: 24px;
    }
    .input-box {
      text-align: center;
      height: 60px;
      input {
        display: inline-block;
        width: 183px;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        border-radius: 10px;
        border: 1px solid #ddd;
        margin: 0 20px;
        text-align: center;
        vertical-align: top;
      }
      .add-btn {
        width: 35px;
        height: 35px;
        display: inline-block;
        background: url("../assets/imgaes/seli_button_6_6.png");
        background-size: contain;
        margin-top: 13px;
        cursor: pointer;
        &.active {
          background: url("../assets/imgaes/seli_button_6_62.png");
        }
      }
      .cut-btn {
        width: 35px;
        height: 35px;
        display: inline-block;
        background: url("../assets/imgaes/dis_button_6_6.png");
        background-size: contain;
        margin-top: 13px;
        cursor: pointer;
        &.active {
          background: url("../assets/imgaes/dis_button_6_62.png");
        }
      }
    }
    .total-zs {
      font-size: 18px;
      color: #333;
      margin-bottom: 20px;
      i {
        display: inline-block;
        width: 18px;
        height: 16px;
        background: url("../assets/imgaes/chat/zuanshi-min.png") no-repeat;
        background-size: contain;
        margin-left: 10px;
      }
    }
    .bug-btn {
      background: linear-gradient(90deg, #ff3634, #ff7f66);
      font-size: 18px;
      color: #fff;
      text-align: center;
      width: 406px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      margin: 45px auto 0;
      cursor: pointer;
    }
  }
}
// 中奖记录
.winning-record {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .record-content {
    position: relative;
    height: 650px;
    width: 71%;
    min-width: 900px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin-top: 2%;
    background: #fff;
    border-radius: 10px;
    .title-box {
      height: 80px;
      border-bottom: 1px solid #bfbfbf;
      position: relative;
      .back {
        line-height: 80px;
        font-size: 24px;
        position: absolute;
        left: 19px;
        cursor: pointer;
      }
      h4 {
        line-height: 80px;
        font-size: 30px;
        color: #333;
        text-align: center;
      }
      .record-tab {
        font-size: 16px;
        color: #333;
        position: absolute;
        right: 80px;
        top: 39px;
        background: #f5f6fa;
        border-radius: 10px 10px 0 0;
        span {
          display: inline-block;
          line-height: 40px;
          padding: 0 40px;
          cursor: pointer;
          &.active {
            color: #fff;
            background: linear-gradient(#ff7c64, #ff3534);
            border-radius: 10px 10px 0 0;
          }
        }
      }
    }
    .prize-record {
      padding: 0 80px;
      dl {
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid #f5f6fa;
        dt {
          width: 100%;
          line-height: 49px;
          background: #f5f6fa;
          overflow: hidden;
          padding: 0 115px;
          margin-top: 30px;
        }
        dd {
          width: 100%;
          line-height: 45px;
          overflow: hidden;
          padding: 0 60px;
          &:nth-child(odd) {
            background: #f5f6fa;
          }
        }
      }
      .el-pagination {
        text-align: center;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #ff6152;
      }
    }
  }
}

@keyframes show {
  0% {
    opacity: 0;
    left: 32px;
  }
  100% {
    opacity: 1;
    left: 0;
  }
}
@keyframes hide {
  0% {
    opacity: 1;
    left: 0;
  }
  100% {
    opacity: 0;
    left: -32px;
  }
}
.show-enter-active {
  animation: show 1.2s;
}
.show-leave-active {
  animation: hide 1.2s;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
.wrap {
  position: relative;
  width: 32px;
  height: 32px;
}
</style>