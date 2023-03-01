<template>
  <div class="team-report">
    <div v-show="!regListShow">
      <div class="team-title">
        <ul class="clearfix">
          <li>
            <span>{{ lastMsg.invitee_num }}</span>
            <span>{{$t('extendReport.teamReport.text[0]')}}</span>
          </li>
          <li>
            <span>{{ lastMsg.recharge }}</span>
            <span>{{$t('extendReport.teamReport.text[1]')}}</span>
          </li>
          <li>
            <span>{{ lastMsg.brokerage }}</span>
            <span>{{$t('extendReport.teamReport.text[2]')}}</span>
          </li>
          <li class="dw">
            <p style="padding-bottom: 6px">
              {{$t('extendReport.teamReport.text[3]')}} {{ currCodeMsg.rebate * 100 }}%
            </p>
            <div class="dw-bl">
              <span style="font-size: 12px; font-weight: bold">{{
                currCodeMsg.level_name
              }}</span>
              <span class="dw-jdt"
                ><i class="dw-jdtbj" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" :style="{ width: currPersent + '%' }"></i
                ><i class="dw-bli"
                  >{{ currCodeMsg.invitee_num }}/{{
                    currCodeMsg.next_level_invitee_num
                  }}</i
                ></span
              >
              <span style="font-size: 18px; font-weight: bold">{{
                currCodeMsg.next_level_name
              }}</span>
            </div>
            <p v-if="isLevel" style="padding-top: 14px">
              {{ currCodeMsg.next_level_diff }} {{$t('extendReport.teamReport.text[4]')}}
            </p>
            <p v-if="!isLevel" style="padding-top: 14px">
              {{$t('extendReport.teamReport.registerNum.warnText[0]')}}
            </p>
          </li>
        </ul>
      </div>
     
      <!-- 时间选择 -->
      <div class="team-search clearfix">
        <span class="zhi" style="font-size: 16px; display: block"
          >{{$t('extendReport.teamReport.text[5]')}}</span
        >
        <el-date-picker
          class="fl tzDate"
          v-model="startTime"
          align="center"
          type="date"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :placeholder="$t('extendReport.teamReport.registerNum.warnText[1]')"
          :editable="false"
          :start-placeholder="dateTherr"
          :picker-options="startTimePicker"
          :unlink-panels="true"
          @change="getStartTime"
        >
        </el-date-picker>
        <span class="fl zhi">-</span>
        <el-date-picker
          class="fl tzDate"
          :unlink-panels="true"
          v-model="endTime"
          align="center"
          type="date"
          :editable="false"
          :clearable="false"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :placeholder="$t('extendReport.teamReport.registerNum.warnText[1]')"
          :start-placeholder="startTime"
          :picker-options="endTimePicker"
          @change="getEndTime"
        >
        </el-date-picker>

        <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="fl search-btn" @click="getTeam(true)">{{$t('extendReport.teamReport.text[6]')}}</button>
      </div>
      <div class="team-content">
        <ul class="clearfix">
          <li
            @click="showRegDetail"
            style="cursor: pointer"
            class="register-num"
          >
            <!--                <li>-->
            <span>{{ teamMsg.reg_num }}</span>
            <span>{{$t('extendReport.teamReport.text[7]')}}</span>
          </li>
          <li>
            <span>{{ teamMsg.recharge_user_num }}</span>
            <span>{{$t('extendReport.teamReport.text[8]')}}</span>
          </li>
          
          <li>
            <span>{{ teamMsg.recharge }}</span>
            <span>{{$t('extendReport.teamReport.text[9]')}}</span>
          </li>
          <li>
            <span>{{ teamMsg.brokerage }}</span>
            <span>{{$t('extendReport.teamReport.text[10]')}}</span>
          </li>
          <li>
            <span>{{ teamMsg.sub_brokerage }}</span>
            <span>{{$t('extendReport.teamReport.text[11]')}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="reg-detail" v-show="regListShow">
      <div class="detail-head" @click="regListShow = false">
        <img
          src="../../../assets/imgaes/extend/goback-icon.png"
          alt=""
          srcset=""
        />
        <span style="margin-left: 20px">{{$t('extendReport.teamReport.registerNum.text[0]')}}</span>
      </div>
      <h2>{{$t('extendReport.teamReport.text[7]')}}</h2>
      <div class="re-content">
        <div class="title">
          <span class="user-pic w10">{{$t('extendReport.teamReport.registerNum.tableTitle[0]')}}</span>
          <span class="name w20">{{$t('extendReport.teamReport.registerNum.tableTitle[1]')}}</span>
          <span class="w20" style=" ">{{$t('extendReport.teamReport.registerNum.tableTitle[2]')}}</span>
          <span class="w20">{{$t('extendReport.teamReport.registerNum.tableTitle[3]')}}</span>
          <span class="w20">{{$t('extendReport.teamReport.registerNum.tableTitle[4]')}}</span>
        </div>
        <el-scrollbar
          style="
            height: 528px;
            width: 100%;
            background: #fff;
            padding-bottom: 5px !important;
          "
          ref="myScrollbar"
        >
          <div class="item" v-for="(v, index) in regList" :key="index">
            <span class="user-pic w20"><img v-lazy="v.avatar" alt="" /></span>
            <span class="name w20">
              <i>{{ v.nickname }}</i> 
              <img :src="v.level" alt="" />
             
            </span>
            <span class="w20">{{ v.createtime }}</span>
            <span class="w20">{{ v.recharge }}</span>
            <span class="w20"
              ><i style="color: #1ded61" v-if="v.is_invitee">{{$t('extendReport.teamReport.registerNum.text[3]')}}</i
              ><i style="color: #ff513e" v-else> {{$t('extendReport.teamReport.registerNum.text[2]')}}</i>
            </span>
          </div>
          
          <div class="no-content" v-if="!regList.length && !isLoading">
            <img
              src="../../../assets/imgaes/extend/zanwudashang-min.png"
              alt=""
            />
          </div>
          <p class="ts" v-if="isLoading">loading...</p>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "teamReport",
  data() {
    return {
      currPersent: 0,
      lastMsg: {},
      teamMsg: {},
      dateTherr: "",
      // dateFour:'',//当前时间
      marketList: [],
      isLevel: false,
      currCodeMsg: {},
      startTime: "",
      endTime: "",
      startTimePicker: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        },
      },
      endTimePicker: {
        disabledDate(time) {
          // return time.getTime() > Date.now()
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        },
      },
      regList: [],
      isLoading: false,
      regListShow: false,
    };
  },
  created() {
    this.getNowTime();
    this.getLast();
    this.getTeam();
    // this.getList();
    this.getInviteCode();
    
  },
  methods: {
    async getLast() {
      let res = await this.$http.get("/api/market/latestcount", {
        params: {
          range: 0,
        },
      });
      if (res && res.data.code == 1) {
        this.lastMsg = res.data.data;
      }
    },
    async getTeam(flag) {
      let s = new Date(this.startTime).getTime();
      let e = new Date(this.endTime).getTime();
      if (e < s) {
        this.$message({
          message: this.$t('extendReport.teamReport.text[12]'),
          type: "warning",
        });
        return;
      }
      console.log(this.startTime)
      let res = await this.$http.get("/api/market/teamcount", {
        params: {
          st: this.startTime,
          et: this.endTime,
        },
      });
      if (res && res.data.code == 1) {
        this.teamMsg = res.data.data;
      }
    },
    getInviteCode(flag) {
      this.$http.get("/api/market/index").then((res) => {
        if (res && res.data.code == 1) {
          this.currCodeMsg = res.data.data;
          this.isLevel = this.currCodeMsg.status == 10 ? true : false;
          this.currPersent =
            (this.currCodeMsg.invitee_num /
              (this.currCodeMsg.invitee_num -
                0 +
                (this.currCodeMsg.next_level_diff - 0))) *
            100;
        }
      });
    },
    getNowTime: function () {
      //获取当前日期
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      m = m >= 10 ? m : "0" + m;
      d = d >= 10 ? d : "0" + d;
      let m1 = m - 3;
      m1 = m1 >= 10 ? m1 : "0" + m1;
      this.startTime = y + "-" + m + "-" + d;
      this.endTime = y + "-" + m + "-" + d;
      this.dateTherr = y + "-" + m1 + "-" + d;
    },
    getStartTime: function (startTime) {
      this.startTime = startTime;
    },
    getEndTime: function (endTime) {
      this.endTime = endTime;
      let s = new Date(this.startTime).getTime();
      let e = new Date(this.endTime).getTime();
      if (e < s) {
        this.$message({
          message: this.$t('extendReport.teamReport.text[12]'),
          type: "warning",
        });
        return;
      }
    },
    showRegDetail() {
      this.regListShow = true;
      this.isLoading = true;
      this.$http
        .get(
          "/api/market/reglist?page=1&limit=9999&st="
           +
            this.startTime +
            "&et=" +
            this.endTime
        )
        .then((res) => {
          if (res && res.data.code == 1) {
            this.regList = res.data.data;
          }
          this.isLoading = false;
        });
    },
  },
     computed: {
    ...mapState(["skin"]),
  },
};
</script>

<style scoped lang="less">
.team-report {
  padding: 0 20px;
  li {
    float: left;
  }
  .team-title {
    border-bottom: 1px solid #f4f5f8;
    padding-top: 38px;
    text-align: center;
    ul {
      padding: 0 21px;
      li {
        width: 33.333%;
        text-align: center;
        float: left;
        &:nth-last-child(1) {
          width: 100%;
          margin: 40px 0 20px;
        }
        > span {
          display: block;
          &:nth-child(1) {
            color: #999;
            font-size: 24px;
            font-weight: bold;
            padding-bottom: 29px;
          }
          &:nth-child(2) {
            color: #71819d;
            font-size: 16px;
          }
        }
      }
    }
    .dw {
      .no-dw {
        width: 186.3px;
        height: 18px;
        border-radius: 9px;
        background: rgba(204, 204, 204, 1);
        margin: 10px auto 0 auto;
      }
      .dw-bl {
        height: 18px;
        line-height: 18px;
      }
      span {
        display: inline-block;
        color: #71819d;
        line-height: 18px;

        &.dw-jdt {
          width: 80%;
          height: 18px;
          text-align: center;
          position: relative;
          border-radius: 9px;
          background: rgba(204, 204, 204, 1);
          z-index: 2;
          top: 4px;
          margin: 0 9px;
        }
        .dw-jdtbj {
          display: inline-block;
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(90deg, #ff9d2e -0.01%, #ffd24a 100%);
          border-radius: 9px;
          width: 0%;
          height: 18px;
          z-index: 1;
        }
        .dw-bli {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          color: #fff;
          z-index: 3;
        }
      }
    }
    p {
      font-size: 14px;
      color: #71819d;
    }
  }
  .team-search {
    // height: 30px;
    padding: 20px 0;
    // line-height: 30px;
    .tzDate {
      width: 120px;
      height: 30px !important;
      line-height: 30px !important;
      font-size: 14px;
      color: #333;
      text-align: center;
      background: #f5f5f5;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      padding: 0;
    }
    .zhi {
      line-height: 30px;
      padding: 0 10px;
    }
    .icon-rl {
      margin: 3px 19px 0 11px;
    }
    .search-btn {
      min-width: 68px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      text-align: center;
      margin: 0 76px 0 20px;
      background: linear-gradient(0deg, #1486ff -46700%, #4ba1ff -43700%);
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      cursor: pointer;
    }
    .ts {
      line-height: 30px;
      font-size: 14px;
      color: #333;
    }
  }
  .team-content {
    ul {
      li {
        width: 290px;
        height: 221px;
        text-align: center;
        border: 2px solid rgba(245, 245, 245, 1);
        border-radius: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        &:nth-of-type(3n) {
          margin-right: 0;
        }
        &.register-num:hover {
          border: 2px solid #1486ff;
        }
        > span {
          display: block;

          &:nth-child(1) {
            color: #ff513e;
            font-size: 36px;
            border-bottom: 2px solid rgba(245, 245, 245, 1);
            line-height: 168px;
            height: 168px;
          }
          &:nth-child(2) {
            line-height: 52px;
          }
        }
      }
    }
  }
  .reg-detail {
    .detail-head {
      font-size: 16px;
      color: #333333;
      // width: 20%;
      margin-top: 20px;
      cursor: pointer;
    }
    h2 {
      margin: 16px 0;
    }
    .re-content {
      border: 2px solid #f5f5f5;
      .dw-icon {
        width: 60px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
      .title {
        line-height: 62px;
        border-bottom: 2px solid #f5f5f5;
        overflow: hidden;
        span {
          font-size: 16px;
          color: #999;
        }
      }
      .item {
        line-height: 58px;
        border-bottom: 2px solid #f5f5f5;
        overflow: hidden;
      }
      span {
        width: 20%;
        font-size: 16px;
        color: #333;
        text-align: center;
        float: left;
        &.bkge {
          color: #ff513d;
        }
        &.user-pic {
          /*padding: 0 35px;*/
          img {
            width: 40px;
            height: 39px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
          }
        }
      }
      .no-content {
        text-align: center;
        padding: 70px 0 0;
        p {
          font-size: 16px;
          padding-top: 10px;
        }
      }
      .ts {
        font-size: 16px;
        text-align: center;
        padding-top: 100px;
      }
      .el-pagination {
        text-align: center;
        margin: 20px auto;
      }
    }
  }
}
.top-box {
  border-bottom: 1px solid #f3f5f7;
  .top-ul {
    padding-left: 10px;
    padding: 38px 0 29px;
    li {
      width: 160px;
      font-size: 16px;
      color: #333;
      text-align: center;
      float: left;
      .re-shuliang {
        display: block;
        font-weight: bold;
        font-size: 24px;
        color: #999;
        padding-bottom: 18px;
      }
    }
  }
  .progress-bar {
    margin: 30px 0 25px 20px;
    .tp {
      font-size: 14px;
      color: #333;
      text-align: center;
    }
    .bt {
      font-size: 14px;
      color: #333;
      text-align: center;
    }
    .bar {
      overflow: hidden;
      .grade1 {
        line-height: 39px;
        font-size: 12px;
        color: #333;
      }
      .grade2 {
        line-height: 39px;
        font-weight: bold;
        font-size: 18px;
        color: #333;
      }
      .grade-progress {
        width: 187px;
        height: 19px;
        background: url("../../../assets/imgaes/extend/bar-bg.png") no-repeat;
        overflow: hidden;
        -webkit-border-radius: 9px;
        -moz-border-radius: 9px;
        border-radius: 9px;
        margin: 8px;
        position: relative;
        .grade-curr {
          height: 100%;
          -webkit-border-radius: 9px;
          -moz-border-radius: 9px;
          border-radius: 9px;
          background: linear-gradient(
            90deg,
            rgba(255, 157, 45, 1) 0%,
            rgba(255, 210, 74, 1) 100%
          );
          position: absolute;
          left: 0;
        }
        .grade-msg {
          width: 100%;
          font-size: 14px;
          color: #fff;
          text-align: center;
          position: absolute;
          left: 0;
        }
      }
    }
  }
}
</style>