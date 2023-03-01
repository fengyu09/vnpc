<template>
  <div>
    <div class="lading" v-if="lzLoading">
      正在加载
      <i class="el-icon-loading"></i>
    </div>
    <div class="his_zw" v-if="zsList.length == 0 && !lzLoading">nodata</div>
    <div
      class="trend-box"
      v-show="showZs && !lzLoading"
      v-if="!zsList.length == 0"
    >
      <div class="move-btn left-move" @click="moveto(0)">
        <span><</span>
      </div>
      <div class="move-btn right-move" @click="moveto(1)">
        <span>></span>
      </div>
      <div class="table-left">
        <table>
          <tr>
            <th width="120">Ngày tháng</th>
            <th width="140">开奖号码</th>
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
        <table>
          <tr>
            <th width="260">数据统计</th>
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
      <div
        class="zs-content"
        id="zsContent"
        v-if="showZs"
        @scroll="zsScroll($event)"
      >
        <div
          id="zsitemBox"
          style="display: flex"
          v-if="![1, 10].find((res) => res == lotteryId)"
        >
          <div
            style="position: relative; margin-right: 1px"
            v-for="(item, index) in zsList[0].trending"
            :key="index + 'q'"
            v-if="index < 10"
          >
            <table>
              <tr>
                <th colspan="10">{{ zsNmae[index] }}</th>
              </tr>
              <tr>
                <th v-for="index4 in 10">
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
                    >{{ index3 + 1 }}</span
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
        </div>
        <div style="display: flex" id="zsitemBox" v-else>
          <div
            style="position: relative; margin-right: 1px"
            v-for="(item, index) in zsList[0].trending"
            :key="index + 'q'"
            v-if="index < 5"
          >
            <table>
              <tr>
                <th colspan="10">{{ zsNmae2[index] }}</th>
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
        </div>
        <div style="display: flex">
          <div
            v-if="[1, 10].find((res) => res == lotteryId)"
            v-for="index in 5"
            style="margin-right: 1px"
          >
            <table>
              <tr>
                <th colspan="10">{{ zsNmae2[index - 1] }}</th>
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
                  v-for="(item, index2) in limittotalData.average_missing_count[
                    index - 1
                  ]"
                >
                  {{ item }}
                </td>
              </tr>
              <tr>
                <td
                  v-for="(item, index2) in limittotalData.current_missing_count[
                    index - 1
                  ]"
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
            v-if="![1, 10].find((res) => res == lotteryId)"
            v-for="index in 10"
            style="margin-right: 1px"
          >
            <table>
              <tr>
                <th colspan="10">{{ zsNmae[index - 1] }}</th>
              </tr>
              <tr>
                <th v-for="index4 in 10">
                  {{ index4 }}
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
                  v-for="(item, index2) in limittotalData.average_missing_count[
                    index - 1
                  ]"
                >
                  {{ item }}
                </td>
              </tr>
              <tr>
                <td
                  v-for="(item, index2) in limittotalData.current_missing_count[
                    index - 1
                  ]"
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
      totalData: [],
      limittotalData: [],
      lzLoading: true,
      moveNum: 0,
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
          //console.log(res)
          if (res.data.code == 1) {
            this.zsList = res.data.data;
            this.drawLine();
            this.configKonva.height = res.data.data.length * 25;
            if (this.zsList.length) {
              this.showZs = true;
            }
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
          }
        });
    },
    drawLine() {
      this.configLine = [];
      // this.zsList.forEach((i,t)=>{
      //     i.trending[1].forEach((i2,t2)=>{
      //        if(i2==0){
      //           this.configLine.points.push((t2+1)*25-25/2,(t+1)*25-25/2)
      //           //console.log(this.configLine.points)
      //        }
      //     })
      // })
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
      try {
        this.zsList[0].trending.forEach((i, ts) => {
          let config = {
            stroke: colorArr[ts],
            strokeWidth: 1.3,
            points: [],
          };
          this.zsList.forEach((i, t) => {
            i.trending[ts].forEach((i2, t2) => {
              if (i2 == 0) {
                config.points.push(
                  (t2 + 1) * 25 - 25 / 2,
                  (t + 1) * 25 - 25 / 2
                );
              }
            });
          });
          this.configLine.push(config);
        });
      } catch (error) {
        //    //console.log('数据错误')
      }
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
    moveto(i) {
      let movediv = document.getElementById("zsContent");
      let childs = document.getElementById("zsitemBox").childElementCount;
      if (i) {
        if (childs == 5) {
          movediv.scrollTo(300, 0);
        } else {
          if (this.moveNum < 6) {
            this.moveNum++;
            movediv.scrollTo(this.moveNum * 250 + 46, 0);
          }
        }
      } else {
        if (childs == 5) {
          movediv.scrollTo(0, 0);
        } else {
          if (this.moveNum > 0) {
            this.moveNum--;
            movediv.scrollTo(this.moveNum * 250 + 46, 0);
          }
        }
      }
    },
    zsScroll(e) {
      this.moveNum = Math.floor(e.target.scrollLeft / 250);
    },
  },
};
</script>
<style lang="less" scoped>
.move-btn {
  position: absolute;
  width: 28px;
  height: 60px;
  background: rgba(0, 0, 0, 0.53);
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 22px;
  z-index: 999;
  cursor: pointer;
}
.move-btn.left-move {
  top: 400px;
  left: 0;
}
.move-btn.right-move {
  top: 400px;
  right: 0;
}
.trend-box {
  position: relative;
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