<template>
  <div id="personal">
    <div class="personal-box">
      <div class="select-box clearfix">
        <el-select
          v-model="value"
          class="fl lottery-change"
          clearable
          placeholder="Mời chọn "
          @change="changeSelect(value)"
        >
          <el-option
            v-for="item in allLottery"
            :key="item.lottery_id"
            :label="item.cname"
            :value="item.lottery_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="personal-list">
        <div class="main-head">个人资讯</div>
        <div class="table">
          <table>
            <tr>
              <td>玩法</td>
              <td>Tỷ lệ cược</td>
              <td>退水</td>
              <td>单注最低</td>
              <td>单注最高</td>
              <td>单期最高</td>
            </tr>
            <tr v-for="(v, index) in ZxList" :key="index">
              <td>{{ v.name }}</td>
              <td>{{ v.odds }}</td>
              <td>{{ v.rebate }}%</td>
              <td>{{ v.min }}</td>
              <td>{{ v.max }}</td>
              <td>{{ v.issue_max }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wjs",
  data() {
    return {
      value: "",
      lottery_id: 8,
      ZxList: [],
    };
  },
  props: {
    lotteryId: {
      type: Number,
      default: 8,
    },
    allLottery: {
      type: Array,
      default: [],
    },
  },
  created() {
    console.log(this.lotteryId);
    this.lottery_id = this.lotteryId;
    this.getPersonalZx();
  },
  methods: {
    //切换历史记录彩种
    changeSelect(id) {
      this.getPersonalZx(id);
      this.lottery_id = id;
    },
    async getPersonalZx(id) {
      let res = await this.$http.get("/forum/guess/personal-info", {
        params: {
          lottery_id: id ? id : this.lottery_id,
        },
      });
      if (res && res.data.code == 1) {
        this.ZxList = res.data.data;
      } else {
      }
    },
  },
};
</script>
<style scoped lang="less">
#personal {
  .personal-box {
    .select-box {
      margin-bottom: 20px;
    }
    .personal-list {
      .main-head {
        width: 100%;
        line-height: 30px;
        text-align: center;
        color: #333;
        background: #f7fafe;
        font-size: 16px;
        border: 1px solid #eeeeee;
      }
      .table {
        text-align: center;
        width: 100%;
        table {
          width: 100%;
          tr {
            height: 36px;
            line-height: 36px;
            border-bottom: 1px solid #eee;
            &:nth-child(1) {
              height: 30px !important;
              line-height: 30px !important;
              background: #f7fafe;
            }
            td {
              width: 15%;
              border-right: 1px solid #eee;
              &:nth-child(1) {
                width: 25%;
                border-left: 1px solid #eee;
              }
            }
          }
        }
      }
    }
  }
}
</style>