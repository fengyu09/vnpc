<template>
  <div>
    <div class="banner">
      <img src="../../assets/imgaes/benefits/banner.png" alt="" />
    </div>
    <div class="task-box">
      <div class="w" v-if="taskList.length">
        <!-- <div class="item-box" v-for="(v,index) in taskList" :key="index" :class="'item'+v.task_id"> -->
        <div
          class="item-box"
          v-for="(v, index) in taskList"
          :key="index"
          :class="'item' + (index + 1)"
        >
          <div class="user fl" :class="'img-box' + (index + 1)"></div>
          <div class="txt fl">
            <span
              v-for="(vv, index1) in v.title"
              :key="index1"
              :class="{ green: index1 > 0 }"
              :style="index1 == 0 ? 'display:block' : 'display:inline-block'"
              >{{ vv }}</span
            >
          </div>
          <div class="status-box">
            <!--  这里根据不同的状态(或者不同的task_id)显示不同的进度-->
            <ul class="steps" v-if="v.task_id != 9 && v.task_id != 10">
              <li
                :class="v.archive | filtersStatusName1(index, v.status)"
                :key="index"
                v-for="(steps, index) in v.target"
                v-if="v.task_id == 1"
              >
                <span v-if="index == 0">Tư liệu cá nhân </span>
                <span v-if="index == 1">银行卡</span>
              </li>
              <li
                :class="{
                  active: index < v.status || v.status == -1 || v.status == -2,
                }"
                :key="index"
                v-for="(steps, index) in v.target"
                v-if="v.task_id == 2 || v.task_id == 7"
              >
                第{{ index + 1 }}天
              </li>
              <li
                :class="v.archive | filtersStatusName(index, v.status)"
                :key="index"
                v-for="(steps, index) in v.target"
                v-if="v.task_id == 4"
              >
                第{{ index + 1 }}天
              </li>
              <li
                :class="{
                  active: index < v.status || v.status == -1 || v.status == -2,
                }"
                v-for="(steps, index) in v.target"
                v-if="v.task_id == 3"
              >
                {{ index + 1 }}位
              </li>
              <li
                :class="{ active: v.status == -2 }"
                v-for="(steps, index) in v.target"
                v-if="v.task_id == 5 || v.task_id == 6 || v.task_id == 8"
              >
                {{ v | filterStatus }}
              </li>
            </ul>
            <ul class="steps" v-else-if="v.task_id == 9">
              <!-- <li :class="{'active':v.status == -2}">{{v |filterStatus}}</li> -->
              <li
                :class="{
                  active: v.status > 0 || v.status == -2 || v.status == -1,
                }"
                style="width: 50%"
              >
                <span style="position: absolute; top: 60px; left: 140px"
                  >({{ v | filterStatus }})</span
                >
              </li>
              <li
                :class="{
                  active: v.status == -2 || v.status == -1 || v.status == -4,
                }"
                style="width: 40%"
              >
                Hoàn thành
              </li>
            </ul>
            <ul class="steps" v-else-if="v.task_id == 10">
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
            >
              {{ v | filterTaskName }}
            </button>
          </div>
        </div>
      </div>
      <!-- <img class="logo" src="../../assets/imgaes/benefits/LOGO.png" alt="" /> -->
    </div>

    <!-- 领取成功弹框-->
    <div class="lq-success" v-if="isLq">
      <div class="lg-success-container">
        <div class="remove-btn" @click="canclePop">
          <img src="../../assets/imgaes/benefits/remove.png" alt="" />
        </div>
        <div class="lq-success-content">
          <h3> Nhắc nhở</h3>
          <p class="bones-box">
            <span class="bones-num">{{ rewardData.amount }}</span
            ><i
              class="bones-icon"
              :class="rewardData.gift_type | filterGiftType"
            ></i>
          </p>
          <span>Chúc mừng bạn đã nhận thành công </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskList: [],
      isLq: false,
      rewardData: {},
      currTaskId: "",
      titleArr: ["首次充值，领取8元现金红包", ""],
    };
  },
  filters: {
    filtersStatusName(n, t, s) {
      // if(s==-2||s==-4){
      //     return 'active'
      // }

      if (n + "".length) {
        let arr = (n + "").split(",");

        for (let j = 0, lenj = arr.length; j < lenj; j++) {
          if (t + 1 == arr[j]) return "active";
        }
      }
    },
    filtersStatusName1(n, t, s) {
      if (s == -1 || s == -2 || s == -4) {
        return "active";
      }

      if (n + "".length) {
        console.log(44, n);
        let arr = (n + "").split(",");
        console.log(999, arr);
        for (let j = 0, lenj = arr.length; j < lenj; j++) {
          if (t + 1 == arr[j]) return "active";
        }
      }
    },
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
        /* if(n.jump==1){
                        text = '去完成';
                    }else if(n.jump==2){
                        text = 'Nạp';
                    }*/
      }
      if (n.task_id == 9) {
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
    filterTaskName(n) {
      //console.log(n.status);
      let text = "";
      if (n.status == -1) {
        text = "Nhận";
      } else if (n.status == -2) {
        text = "Đã nhận";
      } else if (n.status == -3) {
        text = "Đã hết hạn";
      } else if (n.status == -4 && n.task_id == 4) {
        text = "Đã nhận";
      } else {
        if (n.task_id == 1) {
          if (n.archive != 1) {
            text = "去完成";
          } else {
            text = "去绑卡";
          }
        } else if (n.task_id == 2) {
          text = "去完成";
        } else if (n.task_id == 3) {
          text = "去关注";
        } else if (n.task_id == 4) {
          text = "去完成";
        } else if (n.task_id == 5) {
          text = "去体验";
        } else if (n.task_id == 6) {
          text = "去跟投";
        } else if (n.task_id == 7) {
          text = "去竞猜";
        } else if (n.task_id == 8) {
          text = "去首充";
        } else if (n.task_id == 9) {
          text = "去投注";
        } else if (n.task_id == 10) {
          text = "Nạp";
        }
      }
      return text;
    },
    filterTaskClass(n) {
      let c = "";
      if (n.jump > 0) {
        c = "blue";
        if (
          (n.task_id == 1 && n.status == -2) ||
          (n.task_id == 8 && n.status == -2) ||
          (n.task_id == 10 && n.status == -2)
        ) {
          c = "green";
        }
      } else {
        //console.log(n.status);
        if (n.status == -1) {
          c = "blue";
        } else if (n.status == -2) {
          c = "green";
        } else if (n.status == -3) {
          c = "gray";
        } else if (n.status == -4) {
          c = "green";
        } else {
          c = "blue";
        }
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
      } else {
        // c='zs-icon';
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
        if (v.task_id == 1) {
          if (v.archive != 1) {
            window.open("/userInfor", "_blank");
          } else {
            window.open("/widthDraw", "_blank");
          }
        } else if (v.task_id == 8 || v.task_id == 10) {
          window.open("/userInfor", "_blank");
        } else if (v.task_id == 2 || v.task_id == 3) {
          window.open("/AllLive ", "_blank");
        } else if (
          v.task_id == 5 ||
          v.task_id == 6 ||
          v.task_id == 7 ||
          v.task_id == 9
        ) {
          window.open("/", "_blank");
        }
      }
    },
    async getReward(v) {
      //领取
      // console.log(v.task_id);
      this.currTaskId = v.task_id;
      let d = this.globalPpproach.checkIsEncrypt({
          task_id: v.task_id,
      });
      let res = await this.$http.post(
        this.versionLive2 + "/live/task_reward/",
        d
      );
      if (res && res.data.code == 1) {
        // console.log(res);
        v.status = -2;
        //弹出领取弹框
        this.isLq = true;
        //console.log(res.data.data);
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
      let res = await this.$http.get("/api2/user/task-list");
      if (res && res.data.code == 1) {
        let list = res.data.data || [];
        for (let i in list) {
          let str = list[i].title.slice(2);
          str = str.split("。")[0];
          list[i].title = str.split("，");
          list[0].target = 2;
        }
        this.taskList = list;
      }
    },
  },
};
</script>

<style scoped lang="less">
.banner {
  img {
    width: 100%;
  }
  margin-bottom: 30px;
}
.w {
  width: 1000px;
  background: #fff;
  margin: 0 auto;
  padding-bottom: 10px;
}
.task-box {
  background: url("../../assets/imgaes/benefits/mian_bg.png") no-repeat top
    center;
  background-size: 100% 100%;
  padding-left: 4px;
  padding-bottom: 20px;
  .item-box {
    height: 350px;
    margin-bottom: 10px;
    /*.user{
                width: 260px;
                height: auto;
                margin-left:43px;
            }*/
    .user {
      width: 224px;
      height: 239px;
      margin-left: 23px;
    }
    // .img-box1{
    //     background: url("../../assets/imgaes/benefits/11.png") no-repeat;
    // }
    // .img-box2{
    //     background: url("../../assets/imgaes/benefits/22.png") no-repeat;
    // }
    // .img-box3{
    //     background: url("../../assets/imgaes/benefits/33.png") no-repeat;
    // }
    // .img-box4{
    //     background: url("../../assets/imgaes/benefits/44.png") no-repeat;
    // }
    // .img-box5{
    //      background: url("../../assets/imgaes/benefits/55.png") no-repeat;
    //  }
    // .img-box6{
    //       background: url("../../assets/imgaes/benefits/66.png") no-repeat;
    //   }
    // .img-box7{
    //        background: url("../../assets/imgaes/benefits/77.png") no-repeat;
    // }
    // .img-box8{
    //     background: url("../../assets/imgaes/benefits/88.png") no-repeat;
    // }
    // .img-box9{
    //     background: url("../../assets/imgaes/benefits/99.png") no-repeat;
    // }
    // .img-box10{
    //     background: url("../../assets/imgaes/benefits/1010.png") no-repeat;
    // }
    .txt {
      line-height: 50px;
      font-family: "微软雅黑 Bold";
      font-weight: bold;
      font-size: 30px;
      color: #585555;
      position: absolute;
      left: 60px;
      top: 235px;
      .green {
        display: block;
        line-height: 47px;
        font-size: 36px;
        color: #47dc29;
      }
      .fs64 {
        font-size: 64px;
        font-weight: bold;
        vertical-align: bottom;
      }
    }
    .btn-box {
      position: absolute;
      top: 265px;
      right: 79px;
      .btn {
        width: 200px;
        height: 69px;
        font-size: 34.32px;
        color: #fff;
        margin-left: 56px;
        cursor: pointer;
        // &.red{
        //     background: url("../../assets/imgaes/benefits/red.png") no-repeat;
        //     background-size: 100% 100%
        // }
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
      .status-box {
        width: 60%;
        right: -35px;
        .steps li {
          width: 50% !important;
          /*margin-left: 39%;*/
        }
        .steps li:first-of-type {
          &:after {
            /*display: none;*/
            left: 56%;
          }
        }
        .steps li ~ li:after {
          left: -37%;
        }
      }
    }
    &.item2 {
      background: url("../../assets/imgaes/benefits/2.png") no-repeat center
        bottom;
      position: relative;
      .status-box {
        width: 41%;
        right: 67px;
        .steps li {
          width: 33.333% !important;
        }
        .steps li ~ li:after {
          width: 70%;
          left: -38%;
        }
      }
    }
    &.item3 {
      background: url("../../assets/imgaes/benefits/3.png") no-repeat center
        bottom;
      position: relative;
      .status-box {
        width: 44%;
        right: 100px;
        .steps li ~ li:after {
          width: 60%;
          left: -30%;
        }
      }
    }
    &.item4 {
      background: url("../../assets/imgaes/benefits/4.png") no-repeat center
        bottom;
      position: relative;
      .status-box {
        width: 41%;
        right: 67px;
        .steps li {
          width: 33.333% !important;
        }
        .steps li ~ li:after {
          width: 70%;
          left: -38%;
        }
      }
    }
    &.item5 {
      background: url("../../assets/imgaes/benefits/5.png") no-repeat center
        bottom;
      position: relative;
      .steps {
        width: 70%;
        li {
          float: right;
          &:after {
            display: none;
          }
        }
      }
    }
    &.item6 {
      background: url("../../assets/imgaes/benefits/6.png") no-repeat center
        bottom;
      position: relative;
      .steps {
        width: 70%;
        li {
          float: right;
          &:after {
            display: none;
          }
        }
      }
    }
    &.item7 {
      background: url("../../assets/imgaes/benefits/7.png") no-repeat center
        bottom;
      position: relative;
      .status-box {
        width: 41%;
        right: 67px;
        .steps li {
          width: 33.333%;
        }
        .steps li ~ li:after {
          width: 70%;
          left: -34%;
        }
      }
    }
    &.item8 {
      background: url("../../assets/imgaes/benefits/8.png") no-repeat center
        bottom;
      position: relative;
      .steps {
        width: 70%;
        li {
          float: right;
          &:after {
            display: none;
          }
        }
      }
    }
    // &.item9{
    //     background: url("../../assets/imgaes/benefits/9.png") no-repeat center bottom;
    //     position: relative;
    //     .status-box{
    //         width: 60%;
    //         right:-35px;
    //         .steps li{
    //             width: 50%;
    //             margin-left: 39%;
    //         }
    //         .steps li:first-of-type{
    //             &:after {
    //                 display: none;
    //                 left: 57%;
    //             }
    //         }
    //         .steps li~li:after {
    //             left:-37%;
    //         }
    //     }
    // }
    // &.item10{
    //     background: url("../../assets/imgaes/benefits/10.png") no-repeat center bottom;
    //     position: relative;
    //     .steps{
    //         width: 70%;
    //         li{
    //             float: right;
    //             &:after {
    //                 display: none;
    //             }
    //         }
    //     }
    // }
  }
  .status-box {
    /*width: 45%;*/
    width: 60%;
    position: absolute;
    top: 145px;
    /*right:124px;*/
    right: -35px;
    .steps {
      width: 100%;
      position: relative;
      margin-bottom: 30px;
      counter-reset: step;
      margin: 5px 0;
      overflow: hidden;
      /*margin-left: -46px;*/
    }

    /* 步骤描述 */
    .steps li {
      list-style-type: none;
      font-size: 24px;
      text-align: center;
      color: #575555;
      width: 20%;
      position: relative;
      float: left;
      padding: 10px 0;
      &.w50 {
        width: 50%;
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
      width: 56px;
      height: 56px;
      background-color: #ccc;
      background: url("../../assets/imgaes/benefits/round_gray.png") no-repeat;
      line-height: 56px;
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
        width: 50%;
        height: 9px;
        background-color: #acaeb2;
        position: absolute;
        /*left: -45%;*/
        left: 58%;
        top: 35px;
        z-index: 1;
      }
    }
    .steps li ~ li:after {
      content: "";
      width: 80%;
      height: 9px;
      background-color: #acaeb2;
      position: absolute;
      left: -39%;
      top: 35px;
      z-index: 0;
    }
    /* 将当前/完成步骤之前的数字及连接线变绿 */

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