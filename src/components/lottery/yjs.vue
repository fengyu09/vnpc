<template>
  <div class="js-container">
    <div class="wjs-list">
      <div class="wjs-title">{{$t('recordYjs[0]')}}</div>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>{{$t('recordYjs[1]')}}</th>
              <th>{{$t('recordYjs[2]')}}</th>
              <th>{{$t('recordYjs[3]')}}</th>
              <th>{{$t('recordYjs[4]')}}</th>
              <th>{{$t('recordYjs[5]')}}</th>
              <!-- <th>Tiền hoàn</th> -->
              <th>{{$t('recordYjs[6]')}}</th>
              <th>{{$t('recordYjs[7]')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v, index) in recordList" :key="index">
              <td>{{ v.order_no }}</td>
              <td>{{ v.order_time | formatDateSfm }}</td>
              <td class="now-iusse">
                {{ v.lottery_name }}
                <br />
                <i class="wjs-green-color">{{ v.issue }}</i
                >
              </td>
              <td>
                {{ v.play_name }}@<i
                  class="wjs-Orange-color"
                  >{{ v.item_name }}</i
                >
              </td>
              <td>{{ v.amount }}</td>
              <!-- <td>{{ v.play_bet_rebate * 100 }}%</td> -->
              <td class="wjs-blue-color">{{ v.profit }}</td>
              <td class="detail" @click="seeDetail(v)">{{$t('recordYjs[8]')}}</td>
            </tr>
            <tr>
              <td colspan="3"></td>
              <td>{{$t('recordYjs[9]')}}</td>
              <td>{{ todayCount.amount }}</td>
            
              <td class="wjs-blue-color">{{ todayCount.profit }}</td>
                <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          style="margin-top: 20px"
          small
          v-if="total > limit"
          layout="prev, pager, next"
          :page-size="limit"
          background
          :total="total"
          @current-change="handleCurrentChange2"
        ></el-pagination>
      </div>
    </div>

    <!-- 详情 -->
    <div class="detail-container" v-if="isDetail">
     <div class="detail-content">
        <div class="detail-header">
          <h3>{{$t('recordYjs[10]')}}</h3>
          <div class="close-btn" @click="isDetail = false"></div>
        </div>
        <div class="detail-item">
          <table>
            <tr>
              <th>{{$t('recordYjs[11]')}}	</th>
              <td>{{ detailObj.order_no }}</td>
              <th>{{$t('recordYjs[18]')}}</th>
              <td>{{ detailObj.order_time | formatDateSfm }}</td>
            </tr>
            <tr>
              <th>{{$t('recordYjs[12]')}}</th>
              <td>{{ detailObj.issue }}</td>
              <th>{{$t('recordYjs[19]')}}</th>
              <td>{{ detailObj.possible_prize }}</td>
            </tr>
            <tr>
              <th>{{$t('recordYjs[13]')}}</th>
              <td>{{ detailObj.lottery_name }}</td>
              <th>{{$t('recordYjs[20]')}}</th>
              <!-- <td>{{detailObj.play_sec_name+"-"+detailObj.play_class_name}}</td> -->
              <td>{{ detailObj.play_name }}</td>
            </tr>
            <tr style="height: 40px">
              <th>{{$t('recordYjs[14]')}}</th>
              <td colspan="3"> <i class="wjs-Orange-color">{{
                  detailObj.item_name
                }}</i></td>
            </tr>
            <tr>
              <th>{{$t('recordYjs[15]')}}</th>
              <td>{{ detailObj.amount }}</td>
              <th>{{$t('recordYjs[21]')}}</th>
              <td>{{ detailObj.count }}</td>
            </tr>
             <tr>
              <th>{{$t('recordYjs[16]')}}</th>
              <td>{{ detailObj.tip }}</td>
              <th>{{$t('recordYjs[16]')}}</th>
              <td>{{ detailObj.follow_user_nums }}</td>
            </tr>
            <!-- <tr>
              <th>中奖注数</th>
              <td>0</td>
              <th>奖金</th>
              <td>{{ detailObj.count_win }}</td>
            </tr> -->
            <tr>
              <th>{{$t('recordYjs[17]')}}</th>
              <td>{{ detailObj.amount * detailObj.possible_prize }}</td>
            </tr>
          </table>
        </div>
        <div class="confirm-btn" @click="isDetail = false">{{$t('recordYjs[24]')}}</div>
        <div class="confirm-btn share" @click="goShare">{{$t('recordYjs[23]')}}</div>
         
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wjs",
  data() {
    return {
      recordList: [],
      todayCount: {},
      total: "",
      page: 1,
      limit: 10,
      detailObj: {},
      isDetail: false,
    };
  },
  created() {
    this.getRecordList(1);
  },
  methods: {
    goShare(){
       let c={
              order_no:this.detailObj.order_no
            }
        let d = this.globalPpproach.checkIsEncrypt(c)
       this.$http.post('/api/chatroom/shareprofit', d).then(res=>{
         if(res.data.code==1){
           this.isDetail=false
              this.$message({
              message:res.data.msg,
              type: 'success'
            });
         }else{
              this.$message({
              message:res.data.msg,
              type: 'warning'
            });
         }
       })
    },  
    seeDetail(v) {
      this.detailObj = v;
      this.isDetail = true;
    },
    formatDateNy() {
      let date = new Date();
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "-" + M + "-" + D;
    },
    handleCurrentChange2(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.page);
    },
    async getRecordList(page) {
      let res = await this.$http.get("/api/guess/orderlist", {
        params: {
          flag: 2,
          // st: this.formatDateNy(),
          // et: this.formatDateNy(),
          page: page ? page : this.page,
          limit: this.limit,
        },
      });
      if (res && res.data.code == 1) {
        this.todayCount = res.data.count;
        this.recordList = res.data.data || [];
        this.total = res.data.total;
      } else {
      }
    },
  },
};
</script>
<style scoped lang="less">
.js-container {
  width: 100%;
  padding: 15px;
  > p {
    text-align: center;
    height: 15px;
    line-height: 15px;
    background: #eee;
    font-size: 32px;
    color: #333;
    font-weight: bold;
  }
  .wjs-list {
    width: 100%;
    .wjs-title {
      width: 100%;
      line-height: 30px;
      text-align: center;
      color: #333;
      background: #f7fafe;
      font-size: 16px;
      border: 1px solid #eeeeee;
      font-weight: bold;
    }
    .table {
      table {
        width: 100%;
        text-align: center;
        font-size: 14px;
        thead {
          tr {
            background: #f7fafe;
            height: 30px;
            line-height: 30px;
            border: 1px solid #eee;
            border-top: none;
            th {
              border-right: 1px solid #eee;
              &:nth-child(1) {
                border-left: 1px solid #eee;
              }
            }
          }
        }
        tbody {
          tr {
            border-bottom: 1px solid #eee;
            height: 42px;
            td {
              border-right: 1px solid #eee;
              &:nth-child(1) {
                border-left: 1px solid #eee;
              }
              &.detail {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
.detail-container {
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .detail-content {
    background: #fff;
    margin: 10% auto 0;
    border-radius: 6px;
    position: relative;
    width: 860px;
    padding: 30px 30px 100px 30px;
    table {
      border: 1px solid #eee;
      margin-top: 40px;
      width: 100%;
      tr {
        width: 100%;
        height: 30px;
        th {
          font-weight: normal;
          color: #333;
          font-size: 14px;
          background: #f7fafa;
          border: 1px solid #eee;
        }
        td {
          font-size: 12px;
          border: 1px solid #eee;
          text-align: center;
        }
      }
    }
    .detail-header {
      h3 {
        font-size: 16px;
        color: #222221;
        text-align: center;
      }
      .close-btn {
        position: absolute;
        right: 29px;
        top: 29px;
        background: url("../../assets/imgaes/gb_button_6_6.png") no-repeat;
        background-size: contain;
        width: 14px;
        height: 15px;
      }
    }
    .confirm-btn {
      cursor: pointer;
      width: 120px;
      height: 36px;
      border-radius: 6px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      float: right;
      background: linear-gradient(270deg, #FFA800 0%, #FFCE6F 100%);
      margin-top: 30px;
      &.share{
        background: linear-gradient(270deg, #00E685 0%, #00FF94 100%);
        margin-right: 16px;
      }
    }
  }
}
</style>