<template>
  <div>
    <div class="lading" v-if="lzLoading">
      正在加载
      <i class="el-icon-loading"></i>
    </div>
    <div class="his_zw" v-if="zsList.length == 0 && !lzLoading">nodata</div>
    <div v-if="showZs && !lzLoading">
      <div class="xintai-tab" v-show="typeId == 25">
        <div
          :class="{ active: active == index }"
          v-for="(item, index) in xingtaiArr"
          @click="active = index"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="trend-box" v-if="typeId == 25">
        <div class="table-left" v-show="showZs">
          <table>
            <tr>
              <th width="100">Ngày tháng</th>
              <th width="100">开奖号码</th>
            </tr>
            <tr v-for="(item, index) in zsList" :key="index">
              <td style="color: #000">
                {{ item.issue }}
              </td>
              <td style="color: #ff1c30">
                {{ item.open_code }}
              </td>
            </tr>
          </table>
        </div>
        <div class="zs-content" v-if="showZs">
          <div style="display: flex">
            <div
              style="position: relative; margin-right: 1px"
              v-for="(item, index) in zsList[0].trending"
              :key="index + 'q'"
              v-if="zsShowArr.findIndex((res) => res == index) != -1"
            >
              <table>
                <tr>
                  <th colspan="10">{{ zsNmae2[index] }}号码走势</th>
                </tr>
                <tr>
                  <th v-for="(item3, index4) in 10">
                    {{ index4 }}
                  </th>
                </tr>
                <tr v-for="(item2, index2) in zsList" :key="index2 + 'w'">
                  <td
                    v-for="(item3, index3) in item2.trending[index]"
                    :key="index3 + 'r'"
                  >
                    <span
                      v-if="item3 == 0"
                      :class="{
                        active: true,
                        num1: index == 0,
                        num2: index == 1,
                        num3: index == 2,
                        num4: index == 3,
                        num5: index == 4,
                        num6: index == 5,
                        num7: index == 6,
                        num8: index == 7,
                        num9: index == 8,
                        num10: index == 9,
                      }"
                      >{{ index3 }}</span
                    >
                    <span v-else>{{ item3 }}</span>
                  </td>
                </tr>
              </table>
              <v-stage
                style="position: absolute; top: 50px"
                :config="configKonva"
              >
                <v-layer>
                  <v-line :config="configLine[index]"></v-line>
                </v-layer>
              </v-stage>
            </div>
            <div style="width: 240px" class="xintai-tb">
              <table style="width: 100%; table-layout: fixed">
                <tr>
                  <th colspan="5">形态</th>
                  <th colspan="3">组选类型</th>
                </tr>
                <tr>
                  <th>豹子</th>
                  <th>顺子</th>
                  <th>对子</th>
                  <th>半顺</th>
                  <th>杂六</th>
                  <th>豹子</th>
                  <th>组三</th>
                  <th>组六</th>
                </tr>
                <tr v-for="(item, index) in zsList">
                  <td
                    v-for="(item1, index1) in item.trending[xtIndex]"
                    :class="{ redbg: item1 == 0 }"
                  >
                    {{ item1 | xtname(index1) }}
                  </td>
                  <td
                    v-for="(item2, index2) in item.trending[zxIndex]"
                    :class="{ bluebg: item2 == 0 }"
                  >
                    {{ item2 | zxname(index2) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="longhu-box" v-if="typeId == 26">
        <div class="longhu-content" v-if="showZs">
          <div class="table-left">
            <table>
              <tr>
                <th width="100">Ngày tháng</th>
                <th width="100">开奖号码</th>
              </tr>
              <tr v-for="(item, index) in zsList" :key="index">
                <td style="color: #000">
                  {{ item.issue }}
                </td>
                <td style="color: #ff1c30">
                  {{ item.open_code }}
                </td>
              </tr>
            </table>
          </div>
          <div
            v-for="(item, index) in zsList[0].trending"
            v-if="[0, 4].findIndex((res) => res == index) != -1"
            style="position: relative"
          >
            <table>
              <tr>
                <th colspan="10">{{ zsNmae2[index] }}号码走势</th>
              </tr>
              <tr>
                <th v-for="(item3, index4) in 10" width="40">
                  {{ index4 }}
                </th>
              </tr>
              <tr v-for="(item2, index2) in zsList" :key="index2 + 'w'">
                <td
                  v-for="(item3, index3) in item2.trending[index]"
                  :key="index3 + 'r'"
                >
                  <span
                    v-if="item3 == 0"
                    :class="{
                      active: true,
                      num1: index == 0,
                      num2: index == 1,
                      num3: index == 2,
                      num4: index == 3,
                      num5: index == 4,
                      num6: index == 5,
                      num7: index == 6,
                      num8: index == 7,
                      num9: index == 8,
                      num10: index == 9,
                    }"
                    >{{ index3 }}</span
                  >
                  <span v-else>{{ item3 }}</span>
                </td>
              </tr>
            </table>
            <v-stage
              style="position: absolute; top: 80px"
              :config="longhuKonva"
            >
              <v-layer>
                <v-line :config="longhuLine[index]"></v-line>
              </v-layer>
            </v-stage>
          </div>
          <div style="border-right: 1px solid #dddcdf">
            <table>
              <tr>
                <th colspan="3">龙虎</th>
              </tr>
              <tr>
                <th width="56">龙</th>
                <th width="56">虎</th>
                <th width="56">和</th>
              </tr>
              <tr v-for="(item, index) in zsList" :key="index + 'w'">
                <td
                  v-for="(item1, index1) in item.trending[5]"
                  :class="{ yellowbg: item1 == 0 }"
                >
                  {{ item1 | lhname(index1) }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="tongji-box">
        <div v-if="typeId == 25">
          <div style="float: left">
            <table>
              <tr>
                <th style="width: 170px; height: 50px">数据统计</th>
              </tr>
              <tr>
                <td>出现次数</td>
              </tr>
              <tr>
                <td>平均遗漏</td>
              </tr>
              <tr>
                <td>当前遗漏</td>
              </tr>
              <tr>
                <td>最大连出</td>
              </tr>
              <tr>
                <td>最大遗漏</td>
              </tr>
            </table>
          </div>
          <div style="display: flex; overflow: auto">
            <div
              v-for="index in 5"
              style="margin-right: 1px"
              v-show="zsShowArr.findIndex((res) => res == index - 1) != -1"
            >
              <table style="width: 250px">
                <tr>
                  <th colspan="10">{{ zsNmae2[index - 1] }}号码走势</th>
                </tr>
                <tr>
                  <th v-for="index4 in 10">
                    {{ index4 - 1 }}
                  </th>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .average_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .current_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_missing_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
              </table>
            </div>
            <div
              style="margin-right: 1px"
              v-for="index in 9"
              v-if="index > 6"
              v-show="index - 1 == xtIndex"
            >
              <table style="width: 150px">
                <tr>
                  <th colspan="5">形态</th>
                </tr>
                <tr>
                  <th>豹子</th>
                  <th>顺子</th>
                  <th>对子</th>
                  <th>半顺</th>
                  <th>杂六</th>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .average_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .current_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_missing_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
              </table>
            </div>
            <div
              style="margin-right: 1px"
              v-for="index in 12"
              v-if="index > 9"
              v-show="index - 1 == zxIndex"
            >
              <table style="width: 90px">
                <tr>
                  <th colspan="3">组选类型</th>
                </tr>
                <tr>
                  <th>豹子</th>
                  <th>组三</th>
                  <th>组六</th>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .average_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .current_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_missing_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="typeId == 26" class="longhu-tongji">
          <div style="float: left">
            <table>
              <tr>
                <th style="width: 200px; height: 80px">数据统计</th>
              </tr>
              <tr>
                <td>出现次数</td>
              </tr>
              <tr>
                <td>平均遗漏</td>
              </tr>
              <tr>
                <td>当前遗漏</td>
              </tr>
              <tr>
                <td>最大连出</td>
              </tr>
              <tr>
                <td>最大遗漏</td>
              </tr>
            </table>
          </div>
          <div style="display: flex; overflow: auto">
            <div
              v-for="index in 5"
              v-if="[1, 5].findIndex((res) => res == index) != -1"
            >
              <table>
                <tr>
                  <th colspan="10">{{ zsNmae2[index - 1] }}号码走势</th>
                </tr>
                <tr>
                  <th v-for="index4 in 10">
                    {{ index4 - 1 }}
                  </th>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .average_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .current_missing_count[index - 1]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_appear_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_missing_count[
                      index - 1
                    ]"
                  >
                    {{ item }}
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <table>
                <tr>
                  <th colspan="3" style="width: 164px">龙虎</th>
                </tr>
                <tr>
                  <th>龙</th>
                  <th>虎</th>
                  <th>和</th>
                </tr>
                <tr>
                  <td v-for="(item, index2) in limittotalData.appear_count[5]">
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .average_missing_count[5]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .current_missing_count[5]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData.max_appear_count[5]"
                  >
                    {{ item }}
                  </td>
                </tr>
                <tr>
                  <td
                    v-for="(item, index2) in limittotalData
                      .max_missing_count[5]"
                  >
                    {{ item }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "movements",
  data() {
    return {
      configKonva: {
        width: 250,
        height: 50,
      },
      configLine: [],
      longhuLine: [],
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
      zsNmae2: ["第一球", "第二球", "第三球", "第四球", "第五球"],
      xingtaiArr: [
        { id: 1, name: "前三形态" },
        { id: 2, name: "中三形态" },
        { id: 3, name: "后三形态" },
      ],
      active: 0,
      zsShowArr: [0, 1, 2],
      xtIndex: 6,
      zxIndex: 9,
      longhuKonva: {
        width: 400,
        height: 50,
      },
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
    dayMode: {
      type: String,
      default: "",
    },
    zsPage: {
      type: Number,
      default: 30,
    },
    typeId: {
      type: Number,
      default: 25,
    },
    lottery_id: {
      type: Number,
      default: 9,
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
    active: function (i) {
      if (i == 1) {
        this.zsShowArr = [1, 2, 3];
        this.xtIndex = 7;
        this.zxIndex = 10;
      } else if (i == 2) {
        this.zsShowArr = [2, 3, 4];
        this.xtIndex = 8;
        this.zxIndex = 11;
      } else {
        this.xtIndex = 6;
        this.zxIndex = 9;
        this.zsShowArr = [0, 1, 2];
      }
    },
  },
  filters: {
    xtname(i, d) {
      if (i != 0) {
        return i;
      } else {
        switch (d) {
          case 0:
            return "豹子";
            break;
          case 1:
            return "顺子";
            break;
          case 2:
            return "对子";
            break;
          case 3:
            return "半顺";
            break;
          case 4:
            return "杂六";
            break;
          default:
            "";
            break;
        }
      }
    },
    zxname(i, d) {
      if (i != 0) {
        return i;
      } else {
        switch (d) {
          case 0:
            return "豹子";
            break;
          case 1:
            return "组三";
            break;
          case 2:
            return "组六";
            break;
          default:
            "";
            break;
        }
      }
    },
    lhname(i, d) {
      if (i != 0) {
        return i;
      } else {
        switch (d) {
          case 0:
            return "龙";
            break;
          case 1:
            return "虎";
            break;
          case 2:
            return "和";
            break;
          default:
            "";
            break;
        }
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
            num: 0,
            belong_date: v == 1 ? this.getDay(0, "-") : this.dayMode,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.zsList = res.data.data;
            if (this.lotteryId == 10) {
              //console.log(res.data.data)
            }
            this.drawLine();
            this.configKonva.height = res.data.data.length * 25;
            this.longhuKonva.height = res.data.data.length * 40;
            this.showZs = true;
          }
          this.lzLoading = false;
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
            if (v == 1) {
              this.limittotalData = this.totalData.total;
            } else {
              this.limittotalData = this.totalData.total_30;
            }
            //console.log(this.limittotalData)
          }
        });
    },
    drawLine() {
      this.configLine = [];
      this.longhuLine = [];
      let colorArr = [
        "#ff1c30",
        "#4f95ff",
        "#ffa351",
        "#47d684",
        "#ff1c30",
        "#4f95ff",
        "#ffa351",
        "#47d684",
        "#ff1c30",
        "#4f95ff",
      ];
      this.zsList[0].trending.forEach((i, ts) => {
        let config = {
          stroke: colorArr[ts],
          strokeWidth: 1.3,
          points: [],
        };
        let config2 = {
          stroke: ts == 0 ? "#ff1c30" : "#4f95ff",
          strokeWidth: 1.3,
          points: [],
        };
        this.zsList.forEach((i, t) => {
          i.trending[ts].forEach((i2, t2) => {
            if (i2 == 0) {
              config.points.push((t2 + 1) * 25 - 25 / 2, (t + 1) * 25 - 25 / 2);
              config2.points.push(
                (t2 + 1) * 40 - 40 / 2,
                (t + 1) * 40 - 40 / 2
              );
            }
          });
        });
        this.configLine.push(config);
        this.longhuLine.push(config2);
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
.xintai-tab {
  margin-bottom: 16px;
  display: flex;
  > div {
    padding: 4px 12px;
    border: 1px solid #ccc;
    margin-right: 20px;
    border-radius: 18px;
    cursor: pointer;
    color: #000;
  }
  .active {
    color: #fff;
    background: #ff1c30;
    border-color: #ff1c30;
  }
}
.trend-box {
  background: #fff;
  display: flex;
  table {
    color: #999;
    border: 1px solid #dddcdf;
    background: #fff;
    table-layout: fixed;
    td {
      text-align: center;
      border: 1px solid #dddcdf;
      height: 25px;
      &:last-child {
        border-right: none;
      }
    }
    th {
      background: #f6f5f8;
      color: #7f7f81;
      border: 1px solid #dddcdf;
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
    .xintai-tb {
      table {
        th {
          width: 0px;
          // padding:    0 4px;
        }
        .redbg {
          background: #ff1c30;
          color: #fff;
        }
        .bluebg {
          background: #4f95ff;
          color: #fff;
        }
      }
    }
  }
}
.longhu-box {
  .longhu-content {
    display: flex;
    table {
      th {
        background: #f6f5f8;
        color: #7f7f81;
        border: 1px solid #dddcdf;
        height: 40px;
        &:last-child {
          border-right: none;
        }
      }
      td {
        text-align: center;
        border: 1px solid #dddcdf;
        height: 40px;
        &:last-child {
          border-right: none;
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
            background-color: #4f95ff;
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
      .yellowbg {
        background: #ffa351;
        color: #fff;
      }
    }
    .table-left {
      table {
        th {
          height: 80px;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
.tongji-box {
  table {
    color: #999;
    border: 1px solid #dddcdf;
    background: #fff;
    table-layout: fixed;
    th {
      background: #f6f5f8;
      color: #7f7f81;
      border: 1px solid #dddcdf;
      text-align: center;
      border-left: none;
      width: 25px;
      height: 25px;
    }
    td {
      text-align: center;
      border: 1px solid #dddcdf;
      width: 25px;
      height: 25px;
      border-left: none;
    }
  }
  .longhu-tongji {
    th {
      width: 40px;
      height: 40px;
    }
    td {
      width: 40px;
      height: 40px;
    }
  }
}
</style>