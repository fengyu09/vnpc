<template>
  <div>
    <div class="lading" v-if="lzLoading">
      正在加载
      <i class="el-icon-loading"></i>
    </div>
    <div class="his_zw" v-if="zsList.length == 0 && !lzLoading">nodata</div>
    <div class="trend-box" v-if="!zsList.length == 0" v-show="!lzLoading">
      <table>
        <tr>
          <th width="120">Ngày tháng</th>
          <th width="100">开奖时间</th>
          <th width="180">开奖号码</th>
          <th width="80">冠亚和</th>
          <th width="40" v-for="index in 19" v-if="index > 2">
            {{ index }}
          </th>
        </tr>
        <tr v-for="(item, index) in zsList">
          <td>{{ item.issue }}</td>
          <td>{{ item.created }}</td>
          <td>
            <span
              v-for="(item3, index3) in item.open_code.split(',')"
              :class="{ red: index3 == 0, blue: index3 == 1 }"
            >
              {{ item3 }}
            </span>
          </td>
          <td>{{ item.trending.findIndex((res) => res == 0) + 3 }}</td>
          <td
            v-for="(item2, index2) in item.trending"
            style="position: relative"
          >
            <span v-if="item2 != 0">{{ item2 }}</span>
            <span v-else class="active">{{ index2 + 3 }}</span>
            <div
              v-if="index == 0 && index2 == 0"
              style="position: absolute; left: 0; top: 0"
            >
              <v-stage :config="configKonva">
                <v-layer>
                  <v-line :config="configLine"></v-line>
                </v-layer>
              </v-stage>
            </div>
          </td>
        </tr>
      </table>
      <div v-if="showZs">
        <table>
          <tr>
            <th width="502">数据统计</th>
            <th width="41" v-for="index in 19" v-if="index > 2">
              {{ index }}
            </th>
          </tr>
          <tr>
            <td>出现总次数</td>
            <td v-for="(item, index) in limittotalData.appear_count[10]">
              {{ item }}
            </td>
          </tr>
          <tr>
            <td>平均遗漏值</td>
            <td
              v-for="(item, index) in limittotalData.average_missing_count[10]"
            >
              {{ item }}
            </td>
          </tr>
          <tr>
            <td>最大连出值</td>
            <td v-for="(item, index) in limittotalData.max_appear_count[10]">
              {{ item }}
            </td>
          </tr>
          <tr>
            <td>最大遗漏值</td>
            <td v-for="(item, index) in limittotalData.max_missing_count[10]">
              {{ item }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gyMovement",
  data() {
    return {
      configKonva: {
        width: 684,
        height: 40,
      },
      configLine: {
        stroke: "#ff1c30",
        strokeWidth: 1.3,
        points: [],
      },
      zsList: [],
      showZs: false,
      zsNmae: [
        "冠军",
        "亚军",
        "第三名",
        "第四名",
        "第五名",
        "第六名",
        "第七名",
        "第八名",
        "第九名",
        "第十名",
      ],
      totalData: [],
      limittotalData: [],
      lzLoading: true,
    };
  },
  props: {
    lotteryId: {
      type: Number,
      default: 9,
    },
    lottery_id: {
      type: Number,
      default: 9,
    },
    dayMode: {
      type: String,
      default: "",
    },
    zsPage: {
      type: Number,
      default: 30,
    },
  },
  watch: {
    dayMode: function () {
      this.getZsTotal(1);
      this.getZsData(2);
    },
    zsPage: function (n) {
      this.getZsData(1);
      if (n == 30) {
        this.limittotalData = this.totalData.total_30;
      } else if (n == 60) {
        this.limittotalData = this.totalData.total_60;
      } else if (n == 90) {
        this.limittotalData = this.totalData.total_90;
      }
    },
  },
  created() {
    this.getZsData();
    this.getZsTotal();
  },
  mounted() {},
  methods: {
    getZsData(v) {
      if (this.lotteryId != this.lottery_id) {
        return;
      }
      this.lzLoading = true;
      this.$http
        .get("/forum/lottery/trending", {
          params: {
            lottery_id: this.lotteryId,
            limit: v == 2 ? 1400 : this.zsPage,
            page: 1,
            num: 11,
            belong_date: v == 1 ? this.getDay(0, "-") : this.dayMode,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.zsList = res.data.data;
            this.drawLine();
            this.configKonva.height = res.data.data.length * 40;
            this.showZs = true;
          }
          this.lzLoading = false;
        });
    },
    drawLine() {
      this.configLine.points = [];
      this.zsList.forEach((i, t) => {
        i.trending.forEach((i2, t2) => {
          if (i2 == 0) {
            this.configLine.points.push(
              (t2 + 1) * 40 - 40 / 2,
              (t + 1) * 40 - 40 / 2
            );
          }
        });
      });
    },
    getZsTotal(v) {
      if (this.lotteryId != this.lottery_id) {
        return;
      }
      this.$http
        .get("/forum/lottery/trending-total", {
          params: {
            lottery_id: this.lotteryId,
            belong_date: this.dayMode,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.totalData = res.data.data;
            //console.log(this.totalData)
            if (v == 1) {
              this.limittotalData = this.totalData.total;
            } else {
              this.limittotalData = this.totalData.total_30;
            }
          }
        });
    },
    getDay(num, str) {
      let today = new Date();
      let nowTime = today.getTime();
      let ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      let oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      let oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + str + oMoth + str + oDay;
    },
  },
};
</script>
<style lang="less" scoped>
.trend-box {
  background: #fff;
  // display: flex;
  table {
    color: #999;
    border: 1px solid #dddcdf;
    background: #fff;
    table-layout: fixed;
    td {
      text-align: center;
      border: 1px solid #dddcdf;
      height: 40px;
      .red {
        color: #ff1c30;
      }
      .blue {
        color: #4f95ff;
      }
      .active {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        line-height: 24px;
        position: relative;
        z-index: 99;
        color: #fff;
        background: #ff1c30;
      }
      &:last-child {
        border-right: none;
      }
    }
    th {
      background: #f6f5f8;
      color: #7f7f81;
      border: 1px solid #dddcdf;
      height: 40px;
      &:last-child {
        border-right: none;
      }
    }
  }
  .table-left {
    table {
      th {
        height: 50px;
      }
    }
  }
  .zs-content {
    width: 100%;
    overflow: auto;
    display: flex;
    table {
      width: 250px;
      border-left: none;
      td {
        border-left: none;
        width: 25px;
        height: 25px;
      }
      th {
        border-left: none;
        width: 25px;
        height: 25px;
      }
      .active {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        line-height: 20px;
        position: relative;
        z-index: 99;
        color: #fff;
        // "#ff1c30","#4f95ff","#ffa351","#47d684"
        &.num1 {
          background-color: #ff1c30;
        }
        &.num2 {
          background-color: #4f95ff;
        }
        &.num3 {
          background-color: #ffa351;
        }
        &.num4 {
          background-color: #47d684;
        }
        &.num5 {
          background-color: #ff1c30;
        }
        &.num6 {
          background-color: #4f95ff;
        }
        &.num7 {
          background-color: #ffa351;
        }
        &.num8 {
          background-color: #47d684;
        }
        &.num9 {
          background-color: #ff1c30;
        }
        &.num10 {
          background-color: #4f95ff;
        }
      }
    }
  }
}
</style>