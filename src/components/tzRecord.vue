<template>
  <div class="record-box">
    <div class="record-tab">
      <span
        class="tab-item"
        :class="curIndex == '1' ? 'active' : ''"
        @click="tabType(1)"
        >Chưa quyết toán</span
      >
      <span
        class="tab-item"
        :class="curIndex == '2' ? 'active' : ''"
        @click="tabType(2)"
        >Đã quyết toán</span
      >
    </div>
    <div class="list-title">
      <span class="date">Thời gian</span>
      <span class="issue">Ngày tháng</span>
      <span class="number">Số</span>
      <span class="odds">Tỷ lệ cược</span>
      <span class="money">Tiền</span>
     
    </div>
    <div class="tz-content" v-if="curIndex == 1">
      <table>
        <tr class="item" v-for="(item, index) in recordList" :key="index">
          <td class="date">
            <span>{{ item.play_bet_time | formatDate2 }}</span>
            <span>{{ item.play_bet_time | formatDate3 }}</span>
          </td>
          <td>
            {{ item.play_bet_lottery_name }}<br />
            {{ item.play_bet_issue }}
          </td>
          <td>
            {{ item.play_sec_name }}
            {{ item.play_class_name }}
          </td>
          <td>{{ item.play_odds }}</td>
          <td class="money redMoney">{{ item.play_bet_sum }}</td>
        </tr>
      </table>
      <el-pagination
        small
        v-if="total > 10"
        layout="prev, pager, next"
        :page-size="10"
        background
        :total="total"
        @current-change="handleCurrentChange1"
      ></el-pagination>
      <div class="no-content" v-if="!recordList.length && !isShow">
        <img src="../assets/imgaes/jingcai/zwtzjl-min.png" alt="" />
        <p>no data</p>
      </div>
      <p class="ts" v-if="isShow">loading...</p>
    </div>
    <div class="tz-content" v-if="curIndex == 2">
      <table>
        <tr class="item" v-for="(item, index) in recordList" :key="index">
          <td class="date">
            <span>{{ item.play_bet_time | formatDate2 }}</span>
            <span>{{ item.play_bet_time | formatDate3 }}</span>
          </td>
          <td>
            {{ item.play_bet_lottery_name }}<br />
            {{ item.play_bet_issue }}期
          </td>
          <td>
            {{ item.play_sec_name }}
            {{ item.play_class_name }}
          </td>
          <td>{{ item.play_odds }}</td>
          <td class="money" :class="item.play_bet_score | filterMoneyColor">
            {{ item.play_bet_score }} <br />{{
              RecordType == 0 ? "钻石" : "余额"
            }}
          </td>
        </tr>
      </table>
      <el-pagination
        small
        v-if="total > 10"
        layout="prev, pager, next"
        :page-size="10"
        background
        :total="total"
        @current-change="handleCurrentChange2"
      ></el-pagination>
      <div class="no-content" v-if="!recordList.length && !isShow">
        <img src="../assets/imgaes/jingcai/zwtzjl-min.png" alt="" />
        <p>Không có dữ liệu</p>
      </div>
      <p class="ts" v-if="isShow">loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "tzRecord.vue",
  data() {
    return {
      isShow: false,
      curIndex: 1,
      limit: 10, //每页多少条
      page: 1,
      total: null,
      recordList: [],
      RecordType: 1,
    };
  },
  props: {
    jcType: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    RecordType: function (v) {
      this.getRecordList(1, v);
    },
  },
  created() {
    this.getRecordList(this.curIndex);
  },
  methods: {
    handleCommand(i) {
      console.log(i);
    },
    tabType: function (index) {
      this.curIndex = index;
      this.getRecordList();
    },
    async getRecordList(pageVal, i) {
      ////console.log(pageVal);
      this.isShow = true;
      this.page = 1;
      let res = await this.$http.get("/forum/guess/play_bet_history", {
        params: {
          play_bet_state: this.curIndex,
          limit: this.limit,
          page: pageVal,
          is_bl_play: 1,
        },
      });
      this.isShow = false;
      this.total = res.data.total;
      this.recordList = res.data.data;
    },
    handleCurrentChange1(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.page);
    },
    handleCurrentChange2(val) {
      ////console.log(val);
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.page);
    },
  },
  filters: {
    filterTime(t) {},
    filterMoneyColor(m) {
      if (String(m).indexOf("+") > -1) return "redMoney";
      else return "";
    },
  },
};
</script>

<style lang="less" scoped>
.record-box {
  width: 420px;
  height: 673px;
  position: relative;
  .record-tab {
    height: 48px;
    font-size: 15.2px;
    color: #666;
    padding-top: 20px;
    .tab-item {
      display: inline-block;
      width: 50%;
      font-size: 15.12px;
      text-align: center;
      cursor: pointer;
      padding-bottom: 5px;
      margin-bottom: 8px;
      position: relative;
      &.active {
        color: #ff3333;
        &:after {
          display: block;
          content: "";
          width: 34px;
          height: 1px;
          background: #fe3432;
          position: absolute;
          left: 43%;
          bottom: 0;
        }
      }
    }
  }
  .list-title {
    width: 100%;
    font-size: 15.12px;
    color: #333;
    border-bottom: 1px solid #999;
    overflow: hidden;
    padding: 0 15px;
    span {
      text-align: center;
      float: left;
      padding: 10px 0;
    }
    .date {
      width: 20%;
    }
    .issue {
      width: 20%;
    }
    .number {
      width: 20%;
    }
    .odds {
      width: 20%;
    }
    .money {
      width: 20%;
    }
  }
  .tz-content {
    min-height: 480px;
    text-align: center;
    border: none;
    border-collapse: collapse;
    margin: 0 auto;
    table {
      width: 380px;
      margin: 0 auto;
      .item {
        font-size: 10.08px;
        color: #333;
        border-bottom: 1px solid #ccc;
        margin: 0 15px;
        td {
          width: 20%;
        }
        .date {
          padding: 6px 0;
          > span {
            display: block;
          }
        }
        .money {
          font-size: 14px;
          color: #666;
        }
        .redMoney {
          color: #ff3333 !important;
        }
      }
    }
  }
  .ts {
    font-size: 18px;
    text-align: center;
    padding-top: 200px;
  }
  .no-content {
    text-align: center;
    padding-top: 115px;
    p {
      font-size: 14px;
      padding-top: 20px;
    }
  }
  .el-pagination {
    text-align: center;
    margin-top: 35px;
  }
}
</style>