<template>
  <div v-if="!isload2">
    <div class="his_zw" v-if="luzhuList.length == 0">nodata</div>
    <div
      class="chuxian"
      v-for="(item1, index1) in luzhuList"
      :key="index1"
      v-show="luzhuIndex.findIndex((i) => index1 == i) != -1"
    >
      <div class="times">
        <div class="fl">连续出现</div>
        <div class="fl">
          <input
            v-model="value2[index1]"
            @change="phoneverify($event, index1)"
            @keyup="phoneverify($event, index1)"
            type="num"
          />
        </div>
        <div class="fl">次以上</div>
        <div class="fl">
          <el-select v-model="value[index1]" placeholder="选择">
            <el-option
              v-for="item in chooses"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              v-if="luzhuType != 'gy' && luzhuType != 'zonghe'"
            >
            </el-option>
            <el-option
              v-if="luzhuType == 'gy' || luzhuType == 'zonghe'"
              np
              v-for="item in gychooses[index1]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="fl selectLuzhu" @click="selectLuzhu(index1)">Xác nhận</div>
        <div class="fl">出现的次数为：</div>
        <div class="fl" v-html="nums[index1]"></div>
        <div class="fl" style="color: red; margin-left: 10px">
          {{ tishi[index1] }}
        </div>
        <div class="fr" v-if="luzhuType == 'daxiao'">
          <div class="fr">大小</div>
          <div class="fr">{{ cities[index1] }}</div>
          <div class="fr">
            小({{ statistics[index1].xiao ? statistics[index1].xiao : 0 }})
          </div>
          <div class="fr">
            大({{ statistics[index1].da ? statistics[index1].da : 0 }})
          </div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'danshuang'">
          <div class="fr">单双</div>
          <div class="fr">{{ cities[index1] }}</div>
          <div class="fr">
            双({{ statistics[index1].shuang ? statistics[index1].shuang : 0 }})
          </div>
          <div class="fr">
            单({{ statistics[index1].dan ? statistics[index1].dan : 0 }})
          </div>
          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'longhu'">
          <div class="fr">龙虎</div>
          <div class="fr" v-if="luzhuList.length != 1">
            {{ cities[index1] }}
          </div>
          <div class="fr">虎({{ statistics[index1].hu }})</div>
          <div class="fr">龙({{ statistics[index1].long }})</div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'qianhou'">
          <div class="fr">前后</div>
          <div class="fr">{{ cities[index1] }}</div>
          <div class="fr">后({{ statistics[index1].hou }})</div>
          <div class="fr">前({{ statistics[index1].qian }})</div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'num'">
          <!-- <div class="fr">Số</div> -->
          <div class="fr">Số{{ index1 }}</div>
          <div class="fr">没来({{ statistics[index1]._0 }})</div>
          <div class="fr">总来({{ statistics[index1]._1 }})</div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'bose'">
          <div class="fr">波色</div>
          <div class="fr">{{ cities[index1] }}</div>
          <div class="fr">绿({{ statistics[index1].lv }})</div>
          <div class="fr">蓝({{ statistics[index1].lan }})</div>
          <div class="fr">红({{ statistics[index1].hong }})</div>
          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'weishu'">
          <div class="fr">大小</div>
          <div class="fr">{{ cities[index1] }} 尾数</div>
          <div class="fr">
            大({{ statistics[index1].da ? statistics[index1].da : 0 }})
          </div>
          <div class="fr">
            和({{ statistics[index1].he ? statistics[index1].he : 0 }})
          </div>
          <div class="fr">
            小({{ statistics[index1].xiao ? statistics[index1].xiao : 0 }})
          </div>
          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'heshu'">
          <div class="fr">单双</div>
          <div class="fr">{{ cities[index1] }} 合数</div>
          <div class="fr">双({{ statistics[index1].shuang }})</div>
          <div class="fr">单({{ statistics[index1].dan }})</div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'zonghe'">
          <div class="fr" v-if="!index1">大小</div>
          <div class="fr" v-if="index1">单双</div>
          <div class="fr">总和</div>
          <div class="fr" v-if="!index1">大({{ statistics[index1].da }})</div>
          <div class="fr" v-if="!index1">小({{ statistics[index1].xiao }})</div>
          <div class="fr" v-if="index1">
            双({{ statistics[index1].shuang }})
          </div>
          <div class="fr" v-if="index1">单({{ statistics[index1].dan }})</div>

          <div class="fr">累计：</div>
        </div>
        <div class="fr" v-if="luzhuType == 'gy'">
          <div v-if="index1 == 0">
            <div class="fr">大小</div>
            <div class="fr">冠亚和</div>
            <div class="fr">小({{ statistics[index1].xiao }})</div>
            <div class="fr">大({{ statistics[index1].da }})</div>

            <div class="fr">累计：</div>
          </div>
          <div v-else>
            <div class="fr">单双</div>
            <div class="fr">冠亚和</div>
            <div class="fr">双({{ statistics[index1].shuang }})</div>
            <div class="fr">单({{ statistics[index1].dan }})</div>

            <div class="fr">累计：</div>
          </div>
        </div>
      </div>
      <div class="table">
        <!-- <div class="table1">
                       <div v-for="(d, i) in daxiaoLuzhu" :key="i">
                            <div class="fl">{{daxiaoLuzhu[i].substring(daxiaoLuzhu[i].length-1)}}</div>
                       </div>
                     </div> -->
        <div class="table-scroll" style="width: 100%; overflow: auto">
          <table cellspacing="0">
            <tbody>
              <tr v-for="(item, index) in item1" :key="index">
                <td v-for="item2 in item">
                  <!-- v-if="lzType!='num'" -->
                  <span v-if="luzhuType != 'num' && luzhuType != 'bose'">{{
                    item2 != ""
                      ? item2.substring(item2.length - 1, item2.length)
                      : ""
                  }}</span>
                  <span v-else>
                    <img
                      src="../assets/imgaes/hmlz-icon2.png"
                      v-if="
                        item2.substring(item2.length - 1, item2.length) == '0'
                      "
                      style="width: 12px"
                    />
                    <img
                      src="../assets/imgaes/hmlz-icon1.png"
                      v-if="
                        item2.substring(item2.length - 1, item2.length) == '1'
                      "
                      style="width: 12px"
                    />
                  </span>
                  <span
                    v-if="luzhuType == 'bose'"
                    :class="{
                      hongbo:
                        item2.substring(item2.length - 1, item2.length) == '红',
                      lanbo:
                        item2.substring(item2.length - 1, item2.length) == '蓝',
                      lvbo:
                        item2.substring(item2.length - 1, item2.length) == '绿',
                    }"
                  >
                    {{
                      item2 != ""
                        ? item2.substring(item2.length - 1, item2.length)
                        : ""
                    }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "luzhu",
  data() {
    return {
      chooses: [
        {
          value: "da",
          label: "大",
        },
        {
          value: "xiao",
          label: "小",
        },
      ],
      value: ["", "", "", "", "", "", "", "", "", ""],
      nums: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      value2: ["", "", "", "", "", "", "", "", "", ""],
      sure: true,
      luzhuList: [],
      statistics: [],
      options: [
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
      isload2: false,
      tishi: ["", "", "", "", "", "", "", "", "", ""],
      gychooses: [
        [
          {
            value: "da",
            label: "大",
          },
          {
            value: "xiao",
            label: "小",
          },
        ],
        [
          { label: "单", value: "dan" },
          { label: "双", value: "shuang" },
        ],
      ],
    };
  },
  props: {
    lotteryId: {
      type: Number,
      default: 7,
    },
    luzhuType: {
      type: String,
      default: "daxiao",
    },
    luzhuIndex: {
      type: Array,
      default: [],
    },
    dayMode: {
      type: String,
      default: "",
    },
    cities: {
      type: Array,
      default: [],
    },
  },
  watch: {
    luzhuType: function (i) {
      this.initSelect();
      this.getLuzhu();
    },
    luzhuIndex: function (e) {
      this.$nextTick(() => {
        let arr = Array.from(document.getElementsByClassName("table-scroll"));
        arr.forEach((item, index) => {
          let scrollWidth =
            item.firstChild.offsetWidth - item.offsetWidth > 1
              ? item.firstChild.offsetWidth - item.offsetWidth
              : 0;
          item.scrollTo(scrollWidth, 0);
        });
      });
    },
    dayMode: function () {
      this.initSelect();
      this.getLuzhu();
    },
    isload2: function (n) {
      this.$emit("update:isload", n);
    },
  },
  created() {
    this.initSelect();
    this.getLuzhu();
  },
  mounted() {},
  methods: {
    toSure(v) {
      //console.log(v)            //点击确定
      // this.sure=!this.sure;
    },
    getLuzhu() {
      this.isload2 = true;
      this.$http
        .get("/forum/lottery/dewdrop", {
          params: {
            lottery_id: this.lotteryId,
            rows: 20,
            // num:this.lzType=="gy"||this.lzType=="zonghe"?0:this.rankNum,
            num: 0,
            // type: this.lzType,
            type: this.luzhuType,
            belong_date: this.dayMode,
          },
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.luzhuList.length = 0;
            this.statistics.length = 0;
            // this.luzhuList=res.data.dewdrop;
            if (typeof res.data.data[0][0] != "string") {
              this.luzhuList = res.data.data;
              if (res.data.total.length) {
                this.statistics = res.data.total;
              } else {
                this.statistics.push(res.data.total);
              }
            } else {
              this.luzhuList.push(res.data.data);
              this.statistics.push(res.data.total);
            }
            this.luzhuList.forEach((item, index) => {
              item.forEach((item2, index2) => {
                if (item2.length < 58) {
                  let num = 58 - item2.length;
                  for (let i = 0; i < num; i++) {
                    item2.unshift(" ");
                  }
                }
              });
            });

            this.$nextTick(() => {
              let arr = Array.from(
                document.getElementsByClassName("table-scroll")
              );
              arr.forEach((item, index) => {
                let scrollWidth =
                  item.firstChild.offsetWidth - item.offsetWidth > 1
                    ? item.firstChild.offsetWidth - item.offsetWidth
                    : 0;
                item.scrollTo(scrollWidth, 0);
              });
              document.querySelectorAll(".selectLuzhu").forEach((res) => {
                res.onclick = function (e) {};
              });
            });
          }
          this.isload2 = false;
        });
    },
    selectLuzhu(i) {
      if (this.value2[i] < 1) {
        this.tishi[i] = "请输入大于或等于1的整数！";
        this.$forceUpdate();
        return;
      }
      if (this.value[i] == "") {
        this.tishi[i] = "请选择筛选条件！";
        this.$forceUpdate();
        return;
      }
      this.tishi[i] = "";
      if (this.luzhuList[i].length - this.value2[i] < 0) {
        this.nums[i] = 0;
      } else {
        //console.log(this.luzhuList[i][this.value2[i]-1])
        if (this.value[i] == "da") {
          this.countNum(i, "大");
        } else if (this.value[i] == "xiao") {
          this.countNum(i, "小");
        } else if (this.value[i] == "dan") {
          this.countNum(i, "单");
        } else if (this.value[i] == "shuang") {
          this.countNum(i, "双");
        } else if (this.value[i] == "long") {
          this.countNum(i, "龙");
        } else if (this.value[i] == "hu") {
          this.countNum(i, "虎");
        } else if (this.value[i] == "qian") {
          this.countNum(i, "前");
        } else if (this.value[i] == "hou") {
          this.countNum(i, "后");
        } else if (this.value[i] == "hong") {
          this.countNum(i, "红");
        } else if (this.value[i] == "lv") {
          this.countNum(i, "绿");
        } else if (this.value[i] == "lan") {
          this.countNum(i, "lan");
        } else if (this.value[i] == "1") {
          this.countNum(i, "1");
        } else if (this.value[i] == "0") {
          this.countNum(i, "0");
        }
      }
      this.$forceUpdate();
    },
    phoneverify(e, i) {
      this.value2[i] = e.target.value.replace(/[^\d]/g, "");
      this.$forceUpdate();
    },
    countNum(i, c) {
      let n = 0;
      this.luzhuList[i][this.value2[i] - 1].forEach((res) => {
        if (res != " ") {
          if (res.substring(res.length - 1, res.length) == c) {
            n++;
          }
        }
      });
      this.nums[i] = n;
    },
    initSelect() {
      this.value = ["", "", "", "", "", "", "", "", "", ""];
      this.value2 = ["", "", "", "", "", "", "", "", "", ""];
      this.nums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (this.luzhuType == "daxiao") {
        this.chooses = [
          { label: "大", value: "da" },
          { label: "小", value: "xiao" },
        ];
      } else if (this.luzhuType == "danshuang") {
        this.chooses = [
          { label: "单", value: "dan" },
          { label: "双", value: "shuang" },
        ];
      } else if (this.luzhuType == "longhu") {
        this.chooses = [
          { label: "龙", value: "long" },
          { label: "虎", value: "hu" },
        ];
      } else if (this.luzhuType == "qianhou") {
        this.chooses = [
          { label: "前", value: "qian" },
          { label: "后", value: "hou" },
        ];
      } else if (this.luzhuType == "bose") {
        this.chooses = [
          { label: "红", value: "hong" },
          { label: "绿", value: "lv" },
          { label: "蓝", value: "lan" },
        ];
      } else if (this.luzhuType == "weishu") {
        this.chooses = [
          { label: "大", value: "da" },
          { label: "小", value: "xiao" },
        ];
      } else if (this.luzhuType == "heshu") {
        this.chooses = [
          { label: "单", value: "dan" },
          { label: "双", value: "shuang" },
        ];
      } else if (this.luzhuType == "num") {
        this.chooses = [
          { label: "总来", value: "1" },
          { label: "没来", value: "0" },
        ];
      }
    },
  },
};
</script>
<style lang="less" scoped>
.table {
  table {
    // border-top: 1px solid #dddddd;
    // border-bottom: 1px solid #dddddd;
    display: inline-table;
    // min-height: 5rem;
    tr {
      &:first-child {
        td {
          &:last-child {
            border-top: 1px solid #ff513e;
          }
        }
      }
      &:last-child {
        td {
          &:last-child {
            border-bottom: 1px solid #ff513e;
          }
        }
      }
      td {
        border-left: 1px solid #dddddd;
        padding: 2px 3px;
        text-align: center;
        color: #9b9b9b;
        font-size: 12px;
        width: 20px;

        &:nth-child(even) {
          color: #ff513e;
        }
        &:nth-child(odd) {
          background: #f5f7fa;
        }
        &:last-child {
          border-right: 1px solid #ff513e;
          border-left: 1px solid #ff513e;
          background: #ffece8;
        }
      }
      .hongbo {
        color: #ff513e;
      }
      .lanbo {
        color: #0e56ff;
      }
      .lvbo {
        color: #02d164;
      }
    }
  }
}
</style>