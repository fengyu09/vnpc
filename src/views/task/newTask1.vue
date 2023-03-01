<template>
  <div>
    <div class="task-box fl">
      <div class="w" :class="{lanEs:lanCode!=1}" v-if="taskList.length">
        <div
          class="item-box"
          v-for="(v, index2) in taskList"
          :key="index2"
          :class="'item' + (index2 + 1)"
        >
          <div class="txt fl">
           
            <span>{{ v.msg1 }}</span>
            <span class="golden">{{ v.msg2 }}</span>
          </div>
          <div class="status-box">
           
            <ul
              class="steps"
              v-if="v.code == 'crc' || v.code == 'cbl_lg' || v.task_id == 16"
            >
              <li
                :class="{
                  active: v.status > 0 || v.status == -2 || v.status == -1,
                  nowc: v.status >= 0,
                }"
                style="width: 50%"
              >
                <span
                  style="
                    position: absolute;
                    top: 10px;
                    left: 305px;
                    font-size: 14px;
                  "
                  >({{ v | filterStatus }})</span
                >
              </li>
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                style="width: 40%"
              >
                Kết thúc
              </li>
            </ul>
            <ul class="steps" v-if="v.code == 'frc' || v.code == 'fbs'">
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                class="taskid11"
              >
                Nạp tiền lần đầu tiên
              </li>
            </ul>
            <ul class="steps" v-if="v.code == 'fwd'">
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                class="taskid11"
              >
                Lần rút tiền đầu tiên
              </li>
            </ul>
            <ul class="steps" v-if="v.task_id == 17">
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                class="taskid11"
              >
                升级VIP1
              </li>
            </ul>
            <ul class="steps" v-if="v.task_id == 18">
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                class="taskid11"
              >
                升级VIP3
              </li>
            </ul>
            <ul class="steps" v-if="v.task_id == 10">
              <li :class="{ active: v.status == -2 }">
                {{ v | filterStatus }}
              </li>
            </ul>
          </div>
          <div class="btn-box">
            <!--这里根据不同的状态显示不同的按钮-->
            <button
              class="btn fl"
              @click="goDo(v)"
              :class="v | filterTaskClass"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- 领取成功弹框-->
    <div class="lq-success" v-if="isLq">
      <div class="lg-success-container">
        <div class="remove-btn" @click="canclePop">
          <img src="../../assets/imgaes/benefits/remove.png" alt="" />
        </div>
        <div class="lq-success-content">
          <h3 v-if="$st.state.defalutLan!='en'">Nhắc nhở</h3>
          <h3 v-if="$st.state.defalutLan=='en'">Remind</h3>
          <p v-if="rewardData.gift_type != 4" class="bones-box">
            <span class="bones-num">{{ rewardData.amount }}</span
            ><i
              class="bones-icon"
              :class="rewardData.gift_type | filterGiftType"
            ></i>
          </p>
          <p v-if="rewardData.gift_type == 4" class="bones-box">
            <span class="bones-num"
              >大转盘x{{ parseInt(rewardData.amount) }}</span
            ><i
              class="bones-icon"
              :class="rewardData.gift_type | filterGiftType"
            ></i>
          </p>
          <span v-if="$st.state.defalutLan!='en'">Chúc mừng bạn đã nhận thành công </span>
          <span v-if="$st.state.defalutLan=='en'">Congratulations on your success</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
		mapMutations,
		mapState
	} from "vuex";
export default {
  data() {
    return {
      taskList: [],
      isLq: false,
      rewardData: {},
      currTaskId: "",
    };
  },
  computed: {
        	...mapState(["lanCode"]),
    	},
  filters: {
    filterStatus(n) {
      let text = "";
      if (
        n.task_id == 5 ||
        n.task_id == 6 ||
        n.task_id == 8 ||
        n.task_id == 10
      ) {
        if (n.status == 0) {
          text = "Chưa hoàn thành";
        } else if (
          (n.status == -1 && n.jump == 0) ||
          (n.status == -1 && n.jump == 2)
        ) {
          text = "Đi lấy nó";
        } else if (n.status == -2) {
          text = "完成";
        }
      }
      if (n.code == "crc" || n.code == "cbl_lg" || n.task_id == 16) {
        if (n.status == -1) {
          text = n.archive + "/" + n.target;
        } else if (n.status == -2 || n.status == -4) {
          //text = '完成'或者已经领取;
          text = n.target + "/" + n.target;
        } else if (n.target > 0 && n.status != -2) {
          text = n.status + "/" + n.target;
        }
      }
      return text;
    },
    filterTaskClass(n) {
      let c = "";
      
      if (n.status == -1) {
        c = "green";
      } else if (n.status == -2) {
        c = "gray";
      } else if (n.status == -3) {
        c = "gray";
      } else if (n.status == -4) {
        c = "blue";
      } else {
        c = "blue";
      }

      return c;
    },
    filterGiftType(n) {
      let c = "";
      if (n == 1) {
        c = "lw-icon";
      } else if (n == 2) {
        c = "hb-icon";
      } else if (n == 3) {
        c = "cj-icon";
      } else if (n == 0) {
        c = "zs-icon";
      } else if (n == 4) {
        c = "dzp-icon";
      }
      return c;
    },
  },
  created() {
    this.getTaskList();
  },
  methods: {
    canclePop() {
      this.isLq = false;
      if (1) {
        this.getTaskList();
      }
    },
    goDo(v) {
      //先判断状态
      if (v.status == -1) {
        //可领取
        this.getReward(v);
      } else if (v.status == -2) {
        //已领取
      } else if (v.status == -3) {
      } else {
        if (v.jump == 1) {
          this.$router.push("/userInfor");
        } else if (v.jump == 2) {
          this.$router.push("/userInfor");
          // 显示充值弹框
        } else if (v.jump == 3) {
          this.$router.push("/widthDraw");
        } else if (v.jump == 4) {
          this.$router.push("/");
        } else if (v.jump == 5) {
          this.$router.push("/game?type=mg");
        } else if (v.jump == 6) {
          this.$router.push("/game?type=lg");
        } else if (v.jump == 7) {
          this.$router.push("/vipDetails");
        }
       
      }
    },
    async getReward(v) {
      
      let d = this.globalPpproach.checkIsEncrypt({
        welfare: v.code,
      });
      let res = await this.$http.post("/api/user/taskreward", d);
      if (res && res.data.code == 1) {
        v.status = -2;
        //弹出领取弹框
        this.isLq = true;
      
        this.rewardData = res.data.data;
      } else {
        //失败了
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    async getTaskList() {
      // let res = await this.$http.get('/api2/user/task-list');
      let res = await this.$http.get("/api/user/tasklist", {
        params: { is_mobile: 0 },
      });
      if (res && res.data.code == 1) {
        let list = res.data.data || [];
        
        this.taskList = list;
      }
    },
  },
};
</script>

<style scoped lang="less">
.w {
  width: 1140px;
  margin: 0 auto;
  padding-bottom: 10px;
}
.task-box {
  width: 100%;
  padding-left: 10px;
  padding-bottom: 20px;
  overflow: hidden;
  margin: 0 auto;
  .lanEs{
    .item-box{
      &.item1 {
      background: url("../../assets/imgaes/benefits/01.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item2,
    &.item5,
    &.item6 {
      background: url("../../assets/imgaes/benefits/02.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item3 {
      background: url("../../assets/imgaes/benefits/03.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item4 {
      background: url("../../assets/imgaes/benefits/04.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item5 {
      background: url("../../assets/imgaes/benefits/05.png") no-repeat center
        bottom;
      position: relative;
    }
    }
  }
  .item-box {
    height: 300px;
    margin-bottom: 10px;
    .txt {
      line-height: 50px;
      font-family: "微软雅黑 Bold";
      font-weight: bold;
      font-size: 22px;
      color: #b9d8f1;
      position: absolute;
      left: 60px;
      top: 200px;
      text-align: left;
      span {
        display: block;
      }
      .golden {
        display: block;
        line-height: 47px;
        font-size: 32px;
        color: #fbd645;
      }
      .fs64 {
        font-size: 64px;
        font-weight: bold;
        vertical-align: bottom;
      }
    }
    .btn-box {
      position: absolute;
      top: 230px;
      right: 55px;
      .btn {
        width: 246px;
        height: 57px;
        font-size: 34.32px;
        color: #fff;
        margin-left: 56px;
        cursor: pointer;
        &.blue {
          background: url("../../assets/imgaes/benefits/blue.png") no-repeat;
          background-size: 100% 100%;
        }
        &.gray {
          background: url("../../assets/imgaes/benefits/gray.png") no-repeat;
          background-size: 100% 100%;
        }
        &.green {
          background: url("../../assets/imgaes/benefits/green.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    &:last-of-type {
      margin-bottom: 0;
    }
    &.item1 {
      background: url("../../assets/imgaes/benefits/1.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item2,
    &.item5,
    &.item6 {
      background: url("../../assets/imgaes/benefits/2.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item3 {
      background: url("../../assets/imgaes/benefits/3.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item4 {
      background: url("../../assets/imgaes/benefits/4.png") no-repeat center
        bottom;
      position: relative;
    }
    &.item5 {
      background: url("../../assets/imgaes/benefits/5.png") no-repeat center
        bottom;
      position: relative;
    }

    &.item1,
    &.item3,
    &.item4 {
      .status-box {
        width: 60%;
        right: 0px;
        .steps {
          li {
            width: 58%;
            line-height: 55px;
            float: right;
            &:first-of-type {
              &:after {
                display: none;
                left: 56%;
                width: 0;
              }
            }
            &:before {
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }
        .steps li ~ li:after {
          left: -37%;
        }
        .steps li.taskid11 {
          &:after {
            width: 0 !important;
          }
        }
      }
    }
  }

  .status-box {
    width: 60%;
    position: absolute;
    top: 145px;
    right: -110px;
    .steps {
      width: 100%;
      position: relative;
      margin-bottom: 30px;
      counter-reset: step;
      margin: 5px 0;
      overflow: hidden;
    }

    /* 步骤描述 */
    .steps li {
      list-style-type: none;
      font-size: 18px;
      text-align: center;
      color: #b9d8f1;
      width: 20%;
      position: relative;
      float: left;
      padding: 15px 0;
      &.w50 {
        width: 60%;
      }
      &.w33 {
        width: 33.333%;
      }
    }
    /* 步骤数字 */
    .steps li:before {
      display: block;
      content: counter(step); /* 设定计数器内容 */
      counter-increment: step; /* 计数器值递增 */
      width: 37px;
      height: 36px;
      background-color: #ccc;
      background: url("../../assets/imgaes/benefits/round_gray.png") no-repeat;
      line-height: 36px;
      font-size: 0;
      color: #fff;
      text-align: center;
      font-weight: 600;
      margin: 0 auto 9px auto;
    }

    /* 连接线 */
    .steps li:first-of-type {
      &:after {
        content: "";
        width: 75%;
        height: 9px;
        background-color: #b9d8f1;
        position: absolute;
        /*left: -45%;*/
        left: 54%;
        top: 30px;
        z-index: 1;
      }
    }
    .steps li ~ li:after {
      content: "";
      width: 75%;
      height: 9px;
      background-color: #b9d8f1;
      position: absolute;
      left: -31%;
      top: 30px;
      z-index: 0;
    }
    /* 将当前/完成步骤之前的数字及连接线变绿 */
    .steps li.active {
      color: #47dc29;
      &.nowc {
        &::after {
          width: 50% !important;
        }
      }
    }
    .steps li.active:before {
      background-image: url("../../assets/imgaes/benefits/round_active.png");
    }
    .steps li.active:after {
      background-color: #47dc29;
    }
  }
  .logo {
    width: 106px;
    display: block;
    margin: 10px auto 0;
  }
}
.lq-success {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  .lg-success-container {
    position: relative;
    width: 329px;
    height: 332px;
    background: url("../../assets/imgaes/benefits/bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 150px auto 0;
    text-align: center;
    .remove-btn {
      width: 15px;
      height: 15px;
      position: absolute;
      right: 20px;
      top: 40px;
      img {
        width: 100%;
      }
    }
    .lq-success-content {
      padding: 35% 33px 0;
      > h3 {
        line-height: 20px;
        font-size: 20px;
        color: #445779;
        border-bottom: none !important;
      }
      > span {
        line-height: 25px;
        font-size: 25px;
        color: #1486ff;
      }
      .bones-box {
        color: #1486ff;
        line-height: 70px;
        font-size: 50px;
        font-weight: bold;
        padding: 10px 0 19px;
        .bones-icon {
          margin-left: 10px;
          width: 65px;
          height: 42px;
          display: inline-block;
        }
        .zs-icon {
          width: 69px;
          height: 60px;
          background: url("../../assets/imgaes/benefits/diamon-min.png")
            no-repeat;
          background-size: cover;
        }
        .cj-icon {
          background: url("../../assets/imgaes/benefits/red-min.png") no-repeat;
          background-size: cover;
        }
        .lw-icon {
          background: url("../../assets/imgaes/benefits/zd-min.png") no-repeat;
          background-size: cover;
        }
        .hb-icon {
          background: url("../../assets/imgaes/benefits/red-min.png") no-repeat;
          background-size: cover;
        }
      
      }
    }
  }
}
</style>