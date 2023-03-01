<template>
  <div id="dsRecord">
   
    <div class="txhead">
      <div @click="mode = 0" :class="[{ active: mode == 0 },{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('dsRecord.text[0]')}}</span>
      </div>
      <div @click="mode = 1" :class="[{ active: mode == 1 },{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('dsRecord.text[1]')}}</span>
      </div>
      
    </div>
    <!-- 充值记录 -->
    <div v-if="mode == 0">
      <div class="posiHeight">
        <table style="margin-top: 15px">
          <tr>
            <th>{{$t('dsRecord.text[2]')}}</th>
            <th>{{$t('dsRecord.text[3]')}}</th>
            <th>{{$t('dsRecord.text[4]')}}</th>
          </tr>
        </table>
        <table v-for="(item, index) in tableData" :key="index">
          <tr v-for="(v, index11) in item" :key="index11">
            <td>{{ v.date }} {{ v.time }}</td>
            <td>
             
              <span>{{ v.title }}</span>
            </td>
            <td>
              <span
                v-if="
                  v.type == 0 ||
                  v.type == 5 ||
                  v.type == 6 ||
                  v.type == 7 ||
                  v.type == 8 ||
                  v.type == 9 ||
                  v.type == 10 ||
                  v.type == 14
                "
                >+</span
              >
              <span v-if="v.type == 1">-</span>
              <span v-if="v.type == 2">-</span>
              <span v-if="v.type == 3">+</span>
              <span
                v-if="
                  v.type == 4 || v.type == 12 || v.type == 11 || v.type == 13
                "
                >-</span
              >
              {{ v.money }}
            </td>
          </tr>
        </table>
        <p class="ts" v-if="czNON">nodata</p>
        <p class="ts" v-if="czNON1">loading...</p>
      </div>
      <el-pagination
        v-if="total > 10"
        layout="prev, pager, next"
        :page-size="10"
        background
        :total="total"
        @current-change="handleCurrentChange"
        :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
      ></el-pagination>
    </div>
    <!-- 投注记录 -->
    <div v-if="mode == 1">
     

      <div class="posiHeight" v-if="tzTypeIndex == 0">
        <table class="user-record" style="margin-top: 15px">
          <tr>
            <th>{{$t('dsRecord.text[5]')}}</th>
            <th>{{$t('dsRecord.text[6]')}}</th>
            <th>{{$t('dsRecord.text[7]')}}</th>
            <th>{{$t('dsRecord.text[8]')}}</th>
            <th>{{$t('dsRecord.text[9]')}}</th>
          </tr>
        </table>
        <table class="user-record">
          <tr v-for="(item, index) in tableData3">
            <td>{{ item.lottery_name }}</td>
            <td>{{ item.issue }}</td>
            <td>{{ item.created_at | formatDate2 }} {{ item.time }}</td>
            <td><span style="display: inline-block;width: 180px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" :title="item.item_name">
              {{ item.item_name }}</span>
              <br />({{ item.play_name }})
            </td>
            <td>{{ item.amount }}</td>
          </tr>
        </table>
        <p class="ts" v-if="tzNON">nodata</p>
        <p class="ts" v-if="tzNON1">loading...</p>
      </div>

      
      <el-pagination
        v-if="total3 > 10"
        layout="prev, pager, next"
        :page-size="10"
        background
        :total="total3"
        @current-change="handleCurrentChange3"
        :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
      ></el-pagination>
     
    </div>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "dsRecord",
  data() {
    return {
      currentPage: 1, //初始页
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [], //投注记录
      tableData4: [], //投注记录
      mode: 0,
      dzNON: false,
      txNON: false,
      czNON: false,
      dzNON1: false,
      txNON1: false,
      czNON1: false,
      tzNON: false,
      tzNON1: false,
      total: null,
      total1: null,
      total2: null,
      total3: null,
      total4: null,
      // iscz: "",
      tzTypeIndex: 0,
      isBlPlay: 1,
    };
  },
  created() {
    this.convert();
  },
   computed: {
    ...mapState(["skin"]),
  },
  methods: {
    
    convert: function () {
      this.getErcord(1); //余额记录
      this.getRecord(1); //投注记录
    },
    // 余额
    handleCurrentChange(val) {
      this.page = val;
      this.tableData = [];
      this.getErcord(this.page);
    },


    handleCurrentChange3(val) {
      this.page = val;
      this.tableData3 = [];
      this.getRecord(this.page);
    },

    getErcord(val) {
      this.czNON1 = true;
      this.$http
        .get(this.versionLive2 + "Recharge/accountChange", {
          params: {
            user_id: this.$store.state.userinfo.user_id,
            limit: 10,
            page: val,
          },
        })
        .then((res) => {
          this.tableData = res.data.data;
          this.total = res.data.total;
          if (this.tableData == "" || this.tableData == null) {
            this.czNON = true;
          }
          this.czNON1 = false;
        });
    },

    // 投注记录
    getRecord(val, ye) {
      this.tzNON1 = true;
     
      this.$http
        .get("/api/guess/moneylog", {
          params: {
            is_normal_res: 1,
            limit: 10,
            page: val,
            //is_bl_play:this.isBlPlay || ye
          },
        })
        .then((res) => {
          this.tzNON1 = false;
          this.total3 = res.data.total;
          this.tableData3 = res.data.data;
          console.log(res.data.data)
          if (this.tableData3 == "" || this.tableData3 == null) {
            this.tzNON = true;
          } else {
            this.tzNON1 = false;
            this.tzNON = false;
          }
         
        });
    },
    
  },
};
</script>

<style scoped lang="less">
#dsRecord {
  .txhead {
    display: flex;
    border-bottom: 1px solid #f4f5f8;

    > div {
      height: 60px;
      line-height: 60px;
      color: #a7a7a7;
      font-size: 16px;
      position: relative;
      padding: 0 10px;
      margin-right: 18px;
      cursor: pointer;
      position: relative;
    }

    .active {
      color: #1486ff;
      font-weight: bold;
      &:before {
        content: "";
        width: 75%;
        height: 4px;
        background: #1486ff;
        position: absolute;
        bottom: -1px;
        border-radius: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
table {
  width: 100%;
  // border: solid 1px #eeeeee;
  tr {
    border-bottom: solid 1px #eeeeee;
    th {
      width: 25%;
      height: 50px;
      background: #f7f7f7;
      border-right: solid 1px #eeeeee;
      font-size: 14px;
      color: #999999;
    }
    :last-child {
      border-right: 0;
    }
    td {
      width: 25%;
      height: 48px;
      font-size: 14px;
      color: #333333;
      text-align: center;
      border-right: solid 1px #eeeeee;
      i {
        font-size: 10px;
      }
    }
    :last-child {
      border-right: 0;
    }
  }
}
.user-record {
  tr {
    th,
    td {
      width: 20%;
    }
  }
}
.ts {
  text-align: center;
  height: 481px;
  line-height: 50px;
  font-size: 14px;
  color: #333333;
  border: solid 1px #eeeeee;
  border-top: 0;
}
.el-pagination {
  white-space: nowrap;
  padding: 17px 5px !important;
  color: #303133;
  font-weight: 700;
  /* margin: 0 auto; */
  text-align: center !important;
}
.infinite-list {
  height: 601px !important;
  overflow: scroll;
}
.posiHeight {
  height: 535px;
}
.tz-type {
  padding-top: 20px;
  span {
    display: inline-block;
    width: 68px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background-color: #f5f5f5;
    margin-right: 20px;
    font-size: 14px;
    cursor: pointer;
    &.active {
      color: #fff;
      background: linear-gradient(
        90deg,
        rgba(255, 49, 49, 1),
        rgba(255, 128, 103, 1)
      );
    }
  }
}
</style>
