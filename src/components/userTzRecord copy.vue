<template>
  <div class="user-TzRecord" id="userTzRecord">
    <dl class="filter platform">
      <dt>{{$t('gameReport.userTzRecord.text[0]')}}</dt>
      <el-select
        @change="platformChanged"
        v-model="selectSort"
        clearable
        placeholder="Mời chọn"
        :class="[{'pink-sele-bg':skin==1},{'blue-sele-bg':skin==2},{'green-sele-bg':skin==3}]"
        
        :popperClass="skin==1?'pink-op-bg':(skin==2?'blue-op-bg':'green-op-bg')"
      >
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.name"
          :value="item.code"

        ></el-option>
      </el-select>
    </dl>   
    <dl class="filter">
      <dt> {{$t('gameReport.userTzRecord.text[4]')}}</dt>
      <dd
        :class="[{'active' :tzTiemCurIndex == '1'},{'pink-bg':skin==1 &&tzTiemCurIndex == '1'},{'blue-bg':skin==2 &&tzTiemCurIndex == '1'},{'green-bg':skin==3&&tzTiemCurIndex == '1'}]"
        @click="tzTiemSelect(1)"
      >
       {{$t('gameReport.userTzRecord.text[1]')}}
      </dd>
      <dd
        :class="[{'active' :tzTiemCurIndex == '2'},{'pink-bg':skin==1 &&tzTiemCurIndex == '2'},{'blue-bg':skin==2 &&tzTiemCurIndex == '2'},{'green-bg':skin==3&&tzTiemCurIndex == '2'}]"
        @click="tzTiemSelect(2)"
      >
        {{$t('gameReport.userTzRecord.text[2]')}}
      </dd>
      <dd
        :class="[{'active' :tzTiemCurIndex == '3'},{'pink-bg':skin==1 &&tzTiemCurIndex == '3'},{'blue-bg':skin==2 &&tzTiemCurIndex == '3'},{'green-bg':skin==3&&tzTiemCurIndex == '3'}]"
        @click="tzTiemSelect(3)"
      >
        {{$t('gameReport.userTzRecord.text[3]')}}
      </dd>
    </dl>
    <dl class="filter" v-if="selectValue == 1">
      <dt> {{$t('gameReport.userTzRecord.text[5]')}}</dt>
      <dd
        :class="[{'active' :statusCurIndex == '0'},{'pink-bg':skin==1 &&statusCurIndex == '0'},{'blue-bg':skin==2 &&statusCurIndex == '0'},{'green-bg':skin==3&&statusCurIndex == '0'}]"
        @click="statusSelect(0)"
      >
        {{$t('gameReport.userTzRecord.text[6]')}}
      </dd>
      <dd
        :class="[{'active' :statusCurIndex == '1'},{'pink-bg':skin==1 &&statusCurIndex == '1'},{'blue-bg':skin==2 &&statusCurIndex == '1'},{'green-bg':skin==3&&statusCurIndex == '1'}]"
        @click="statusSelect(1)"
      >
         {{$t('gameReport.userTzRecord.text[7]')}}
      </dd>
      <dd
        :class="[{'active' :statusCurIndex == '2'},{'pink-bg':skin==1 &&statusCurIndex == '2'},{'blue-bg':skin==2 &&statusCurIndex == '2'},{'green-bg':skin==3&&statusCurIndex == '2'}]"
        @click="statusSelect(2)"
      >
         {{$t('gameReport.userTzRecord.text[8]')}}
      </dd>
    </dl>
    <dl class="filter date-box">
      <dt> {{$t('gameReport.userTzRecord.text[9]')}}</dt>
      <el-date-picker
        class="fl tzDate"
        v-model="startTime"
        align="center"
        type="date"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :placeholder="$t('gameReport.userTzRecord.pla[0]')"
        :picker-options="startTimePicker"
        @change="getStartTime"
        :popperClass="skin==1?'pink-op-bg':(skin==2?'blue-op-bg':'green-op-bg')"
      >
      </el-date-picker>
      <span class="fl zhi">-</span>
      <el-date-picker
        class="fl tzDate"
        v-model="endTime"
        align="center"
        type="date"
        :clearable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :placeholder="$t('gameReport.userTzRecord.pla[0]')"
        :picker-options="endTimePicker"
        @change="getEndTime"
        :popperClass="skin==1?'pink-op-bg':(skin==2?'blue-op-bg':'green-op-bg')"
      >
      </el-date-picker>

      <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="fl search-btn" @click="dateSearch"> {{$t('gameReport.userTzRecord.text[10]')}}</button>
    </dl>
    <div class="record-content clearfix" v-if="selectValue == 1">
      <div class="title">
        <span> {{$t('gameReport.userTzRecord.tableTitleCp[0]')}}</span>
        <span>{{$t('gameReport.userTzRecord.tableTitleCp[1]')}}</span>
        <span class="w18">{{$t('gameReport.userTzRecord.tableTitleCp[2]')}}</span>
        <span class="">{{$t('gameReport.userTzRecord.tableTitleCp[3]')}}</span>
        <span class="w18">{{$t('gameReport.userTzRecord.tableTitleCp[4]')}}</span>
        <span>{{$t('gameReport.userTzRecord.tableTitleCp[5]')}}</span>
        <span>{{$t('gameReport.userTzRecord.tableTitleCp[6]')}}</span>
      </div>
      <el-scrollbar
        style="
          min-height: 354px;
          width: 100%;
          background: #fff;
          padding-bottom: 5px !important;
        "
        ref="myScrollbar"
      >
        <div class="record-list">
          <div class="item" v-for="(item, index) in recordList" :key="index">
            <span>{{ selectSort }}</span>
            <span>{{ item.lottery_name }}</span>
            <span class="w18">
              {{ item.order_time | formatDate2 }}
              {{ item.order_time | formatDate3 }}
            </span>
            <span class="">{{ item.issue }}</span>
            <span class="w18">              
              {{ item.item_name }}
              <br>{{ item.play_name }}
             
            </span>
            <span class="">{{ item.odds }}</span>
            <span class="money" v-if="item.prize == 0">{{ item.amount }}</span>
            <span class="money" :class="item.prize | filterMoneyColor" v-else>{{
              item.prize
            }}</span>
          </div>
          <el-pagination
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            @current-change="handleCurrentChange1"
            :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
          ></el-pagination>
        </div>
        

        <div class="no-content" v-if="!recordList.length && !isLoading">
          <img src="../assets/imgaes/member/zanwudashang-min.png" alt="" />
          <p> {{$t('gameReport.userTzRecord.text[11]')}}</p>
        </div>
        <p class="ts" v-if="isLoading">loading...</p>
      </el-scrollbar>
    </div>
    <div class="record-content clearfix" v-if="selectValue != 1">
      <div class="title">
        <span>{{$t('gameReport.userTzRecord.tableTitleSf[0]')}}</span>
        <span class="w15">{{$t('gameReport.userTzRecord.tableTitleSf[1]')}}</span>
        <span class="w18">{{$t('gameReport.userTzRecord.tableTitleSf[2]')}}</span>
        <span class="w25">{{$t('gameReport.userTzRecord.tableTitleSf[3]')}}</span>
        <span class="w14">{{$t('gameReport.userTzRecord.tableTitleSf[4]')}}</span>
        <span>{{$t('gameReport.userTzRecord.tableTitleSf[5]')}}</span>
      </div>
      <el-scrollbar
        style="
          min-height: 354px;
          width: 100%;
          background: #fff;
          padding-bottom: 5px !important;
        "
        ref="myScrollbar"
      >
        <div class="record-list" v-if="selectValue == 2">
          <div class="item" v-for="(item, index) in gameList" :key="index">
            <span>{{ selectSort }}</span>
            <span class="w15">{{ item.sz_server_name }}</span>
            <span class="w18">{{ item.play_time | formatDate1 }}</span>
            <span class="w25">{{ item.order_no }}</span>
            <span class="14">{{ item.amount }}</span>
            <span class="money">{{ item.prize }}</span>
          </div>
          <el-pagination
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            @current-change="handleCurrentChange4"
            :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
          ></el-pagination>
        </div>
        <div class="record-list" v-if="selectValue == 3">
          <div class="item" v-for="(item, index) in gameList" :key="index">
            <span>{{ selectSort }}</span>
            <span class="w15">{{ item.game_name }}</span>
            <span class="w18">{{ item.billtime | formatDate1 }}</span>
            <span class="w25">{{ item.order_no }}</span>
            <span class="14">{{ item.amount }}</span>
            <span class="money">{{ item.prize }}</span>
          </div>
          <el-pagination
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            @current-change="handleCurrentChange5"
            :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
          ></el-pagination>
        </div>
        
        <div class="record-list" v-if="selectValue != 2 && selectValue != 3">
          <div class="item" v-for="(item, index) in gameList" :key="index">
            <span>{{ selectSort }}</span>
            <span class="w15" v-if="selectValue != 8">{{
              item.game_name ? item.game_name : selectSort
            }}</span>
            <span
              class="w15"
              v-if="selectValue == 8"
              style="line-height: 20px; padding-top: 10px; text-align: left"
              >{{ item.game_name }}</span
            >
            <span class="w18" >{{item.order_time | formatDate1}}</span>
            <span class="w25">{{ item.order_no }}</span>
            <span class="14">{{ item.amount }}</span>
            <span class="money">{{ item.prize }}</span>
          </div>
          <el-pagination
            v-if="total > 10"
            layout="prev, pager, next"
            :page-size="10"
            background
            :total="total"
            @current-change="handleCurrentChange6"
            :class="[{'pink-fy-bg':skin==1},{'blue-fy-bg':skin==2},{'green-fy-bg':skin==3}]"
          ></el-pagination>
        </div>
        <div class="no-content" v-if="!gameList.length && !isLoading">
          <img src="../assets/imgaes/member/zanwudashang-min.png" alt="" />
          <p> {{$t('gameReport.userTzRecord.text[11]')}}</p>
        </div>
        <p class="ts" v-if="isLoading">loading...</p>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {  mapState } from "vuex";
import { fun_date } from "../assets/js/public";
export default {
  data() {
    return {
      allLottery: [], //彩种类
      sortSelectIndex: 0, //种类
      methodsIndex: 1, //0钻石 1余额
      tzTiemCurIndex: 1, //时间
      statusCurIndex: 0, //投注状态
      startTime: null, //日期选择
      endTime: null, //日期选择
      recordList: [],
      isLoading: false,
      limit: 10, //每页多少条
      page: 1,
      total: null,
      st: fun_date(0),
      et: fun_date(0),
      startTimePicker: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
          // return time.getTime() > Date.now();
        },
      },
      endTimePicker: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
          // return time.getTime() > Date.now();
        },
      },
      selectValue: 1,
      options: [],
      // options: [
      //   {
      //     value: "1",
      //     label: this.$t('gameReport.game.gameList[0]'),
      //   },
      
      //   {
      //     value: "4",
      //     label: "AG Live",
      //   },
       
      //   {
      //     value: "8",
      //     label: "IBC",
      //   },
        
      //   {
      //     value: "11",
      //     label: "BBIN Sport",
      //   },
      //   {
      //     value: "12",
      //     label: "BBIN Live",
      //   },
      //    {
      //     value: "13",
      //     label: "AE Live"
      //   },
       
      //   {
      //     value: "14",
      //     label: "MG",
      //   },
      //   {
      //     value: "16",
      //     label: "CMD Sport",
      //   },
      //   {
      //     value: "17",
      //     label: "SBO Sport",
      //   },
      //   {
      //     value: "18",
      //     label: "CQ9",
      //   },
      //   {
      //     value: "19",
      //     label: "SA",
      //   },
      //   {
      //     value: "20",
      //     label: "DG",
      //   },
      //   {
      //     value: "21",
      //     label: "EBET",
      //   },
      //   {
      //     value: "22",
      //     label: "IBO",
      //   },
      //   {
      //     value: "23",
      //     label: "ALLBET",
      //   },
      //   {
      //     value: "24",
      //     label: "EZU",
      //   },
      //   {
      //     value: "25",
      //     label: "TCG",
      //   },
      //   {
      //     value: "26",
      //     label: "JDB",
      //   },
      //   {
      //     value: "27",
      //     label: "BG",
      //   },
      //    {
      //     value: "29",
      //     label: "AE Lottery",
      //   },
      //   {
      //     value: "28",
      //     label: "AE Electronic",
      //   },
       
      // ],
      selectSort: this.$t('gameReport.game.gameList[0]'),
      gameList: [],
    };
  },
  created() {

    this.getGameList();
    this.getNowTime();
    if(this.lanCode!=2){
      this.getGame();
      this.getRecordList();
    }
    this.changeStatus();

  },
  computed: {
      ...mapState(["skin","lanCode"]),
  },
  methods: {
    getGameList(){
        this.$http.get("/api/vendor/index").then(res=>{
            if(res && res.data.code==1){
                this.options = res.data.data || [];
                this.options.unshift({
                  code: "1",
                  name: this.$t('gameReport.game.gameList[0]'),
                  icon:''
                })
            }
        })
    },

    //获取彩种
    async getGame() {
      let res = await this.$http.post("/api/vendor/index");
      if (res && res.data.code == 1) {
        //console.log(res);
        let allLottery = res.data.data || [];
        this.allLottery = allLottery.filter((item, i) => {
          return item.lottery_id != 8;
        });
      }
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
      //console.log(startTime);
    },
    getEndTime: function (endTime) {
      //console.log(endTime);
      this.endTime = endTime;
      let s = new Date(this.startTime).getTime();
      let e = new Date(this.endTime).getTime();
      if (e < s) {
        this.$message({
          message: this.$t('gameReport.userTzRecord.warnText[0]'),
          type: "warning",
        });
        return;
      }
    },
    changeStatus() {
      if (this.st == this.et) this.tzTiemCurIndex = 1;
      else if (
        (Date.parse(this.et) - Date.parse(this.st)) /
          (1 * 24 * 60 * 60 * 1000) ==
        7
      )
        this.tzTiemCurIndex = 2;
      else if (
        (Date.parse(this.et) - Date.parse(this.st)) /
          (1 * 24 * 60 * 60 * 1000) ==
        90
      )
        this.tzTiemCurIndex = 3;
      else this.tzTiemCurIndex = 4;
    },
    dateSearch: function () {
      //自定义选择日期
      this.st = this.startTime;
      this.et = this.endTime;
      this.changeStatus();
      if (this.selectSort == this.$t('gameReport.game.gameList[0]')) {
        this.getRecordList(this.startTime, this.endTime);
      } else if (this.selectSort == "AG Live") {
        this.getAgRecord(this.startTime, this.endTime);
      }  else if (this.selectSort == "IBC") {
        this.getIbcRecord(this.startTime, this.endTime);
      }  else if (this.selectSort == "IM Sport") {
        this.getImRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "BBIN Sport") {
        this.getBBinSportRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "BBIN Live") {
        this.getBBinLiveRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "AE Live") {
        this.getAeLiveRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "MG") {
        this.getMgDzRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "AE Sport") {
        this.getAeSportRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "CMD Sport") {
        this.getCmdSportRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "SBO Sport") {
        this.getSboSportRecord(this.startTime, this.endTime);
      } else if (this.selectSort == "CQ9") {
        this.getcq9Record(this.startTime, this.endTime);
      }else if (this.selectSort == "SA") {
        this.getsaRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "DG") {
        this.getdgRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "EBET") {
        this.getebetRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "IBO") {
        this.getiboRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "ALLBET") {
        this.getallbetRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "EZU") {
        this.getezuRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "TCG") {
        this.gettcgRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "JDB") {
        this.getjdbRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "BG") {
        this.getbgRecord(this.startTime, this.endTime);
      }else if (this.selectSort == "AE Electronic") {
        this.getAeSlotRecord(this.startTime,this.endTime);
      }else if (this.selectSort == "AE Lottery") {
        this.getAeLotteryRecord(this.startTime,this.endTime);
      }
      
       
    },
    sortSelect: function (index) {
      //选择种类
      this.sortSelectIndex = index;
      this.getRecordList();
    },
    async getSfRecord(i,gameType,st,et,page){
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors."+i+"/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: gameType,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    platformChanged: function (i) {
      //选择平台
      console.log(i)
      if(i=='ae'||i=='bbin'||i=='bg'||i=='ebet'||i=='allbet'||i=='ezu'||i=='ag'||i=='dg'||i=='ibo'||i=='sa'){
        this.getSfRecord(i,'live')
      }else if(i=='ibc'||i=='cmd'||i=='sbo'){
        this.getSfRecord(i,'sport')
      }else if(i=='mg'||i=='jdb'){
        this.getSfRecord(i,'slot')
      }else if(i=='ael'||i=='tcg'||i=='fight'||i=='cq9'){
        this.getSfRecord(i)
      }
      
      //特殊 ae电子啥的 bbin体育

      // this.selectValue = i;
      // if (i == 1) {
      //   this.selectSort = this.$t('gameReport.game.gameList[0]');
      //   this.getRecordList();
      // } else if (i == 4) {
      //   this.selectSort = "AG Live";
      //   this.getAgRecord();
      // }  else if (i == 8) {
      //   this.selectSort = "IBC";
      //   this.getIbcRecord();
      // } else if (i == 10) {
      //   this.selectSort = "IM Sport";
      //   this.getImRecord();
      // } else if (i == 11) {
      //   this.selectSort = "BBIN Sport";
      //   this.getBBinSportRecord();
      // } else if (i == 12) {
      //   this.selectSort = "BBIN Live";
      //   this.getBBinLiveRecord();
      // } else if (i == 13) {
      //   this.selectSort = "AE Live";
      //   this.getAeLiveRecord();
      // } else if (i == 14) {
      //   this.selectSort = "MG";
      //   this.getMgDzRecord();
      // } else if (i == 15) {
      //   this.selectSort = "AE Sport";
      //   this.getAeSportRecord();
      // } else if (i == 16) {
      //   this.selectSort = "CMD Sport";
      //   this.getCmdSportRecord();
      // } else if (i == 17) {
      //   this.selectSort = "SBO Sport";
      //   this.getSboSportRecord();
      // } else if (i == 18) {
      //   this.selectSort = "CQ9";
      //   this.getcq9Record();
      // }else if (i == 19) {
      //   this.selectSort = "SA";
      //   this.getsaRecord();
      // }else if (i == 20) {
      //   this.selectSort = "DG";
      //   this.getdgRecord();
      // }else if (i == 21) {
      //   this.selectSort = "EBET";
      //   this.getebetRecord();
      // }else if (i == 22) {
      //   this.selectSort = "IBO";
      //   this.getiboRecord();
      // }else if (i == 23) {
      //   this.selectSort = "ALLBET";
      //   this.getallbetRecord();
      // }else if (i == 24) {
      //   this.selectSort = "EZU";
      //   this.getezuRecord();
      // }else if (i == 25) {
      //   this.selectSort = "TCG";
      //   this.gettcgRecord();
      // }else if (i == 26) {
      //   this.selectSort = "JDB";
      //   this.getjdbRecord();
      // }else if (i == 27) {
      //   this.selectSort = "BG";
      //   this.getjdbRecord();
      // }else if (i == 28) {
      //   this.selectSort = "AE Electronic";
      //   this.getAeSlotRecord();
      // }
    },
    methodsSelect: function (index) {
      //投注方式
      this.methodsIndex = index;
      this.getRecordList();
    },
    tzTiemSelect: function (index) {
      //选择时间 今天 七天 三个月
      this.tzTiemCurIndex = index;
      let s = "";
      let e = "";
      if (index == 1) {
        s = fun_date(0);
        e = fun_date(0);
      } else if (index == 2) {
        s = fun_date(-7);
        e = fun_date(0);
      } else if (index == 3) {
        s = fun_date(-90);
        e = fun_date(0);
      }
      this.st = s;
      this.et = e;
      //console.log(s,e);
      if (this.selectSort == this.$t('gameReport.game.gameList[0]')) {
        this.getRecordList(s, e);
      } else if (this.selectSort == "AG Live") {
        this.getAgRecord(s, e);
      }else if (this.selectSort == "IBC") {
        this.getIbcRecord(s, e);
      }else if (this.selectSort == "IM体育") {
        this.getImRecord(s, e);
      } else if (this.selectSort == "BBIN Sport") {
        this.getBBinSportRecord(s, e);
      } else if (this.selectSort == "BBIN Live") {
        this.getBBinLiveRecord(s, e);
      } else if (this.selectSort == "AE Live") {
        this.getAeLiveRecord(s, e);
      } else if (this.selectSort == "MG") {
        this.getMgDzRecord(s, e);
      } else if (this.selectSort == "AE Sport") {
        this.getAeSportRecord(s, e);
      } else if (this.selectSort == "CMD Sport") {
        this.getCmdSportRecord(s, e);
      } else if (this.selectSort == "SBO Sport") {
        this.getSboSportRecord(s, e);
      } else if (this.selectSort == "CQ9") {
        this.getcq9Record(s, e);
      } else if (this.selectSort == "SA") {
        this.getsaRecord(s, e);
      } else if (this.selectSort == "DG") {
        this.getdgRecord(s, e);
      }else if (this.selectSort == "EBET") {
        this.getebetRecord(s, e);
      }else if (this.selectSort == "IBO") {
        this.getiboRecord(s, e);
      }else if (this.selectSort == "ALLBET") {
        this.getallbetRecord(s, e);
      }else if (this.selectSort == "EZU") {
        this.getezuRecord(s, e);
      }else if (this.selectSort == "TCG") {
        this.gettcgRecord(s, e);
      }else if (this.selectSort == "JDB") {
        this.getjdbRecord(s, e);
      }else if (this.selectSort == "BG") {
        this.getbgRecord(s, e);
      }else if (this.selectSort == "AE Electronic") {
        this.getAeSlotRecord(s,e);
      }else if (this.selectSort == "AE Lottery") {
        this.getAeLotteryRecord(s,e);
      }
      
    },
    statusSelect: function (index) {
      //投注状态
      this.statusCurIndex = index;
      this.getRecordList();
    },
    async getRecordList(st, et, page) {
      //彩票各游戏
      let s = new Date(this.startTime).getTime();
      let e = new Date(this.endTime).getTime();
      this.isLoading = true;
      this.page = 1;
      let res = await this.$http.get("/api/guess/orderlist", {
        params: {
          lottery_id: this.sortSelectIndex,
          page: page || this.page,
          limit: this.limit,
          st: st || this.st,
          et: et || this.et,
          flag: 0 || this.statusCurIndex,
        },
      });
      this.isLoading = false;
      this.total = res.data.total;
      this.recordList = res.data.data;
      //console.log(res.data.data)
    },
    async getAeSportRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/ae/game-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "sport",
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getBBinSportRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.bbin/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "sport",
        },
      });
      if (res && res.data.code == 1) {
        console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },

    async getFhchessRecord(st, et, page) {
      //获取棋牌游戏记录
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/fhchess/game-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAgRecord(st, et, page) {
      //获取AG视讯游戏记录
      //console.log('视讯');
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ag/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        console.log( res.data)
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAgSlotRecord(st, et, page) {
      //获取AG电子游戏记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/ag/slot-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getBgFishing(st, et, page) {
      //获取BG捕鱼游戏记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/bg/fishing-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getBgLive(st, et, page) {
      //获取BG视讯游戏记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/bg/live-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getKyRecord(st, et, page) {
      //获取开元棋牌记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/ky/game-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
        
      }
    },
    async getIbcRecord(st, et, page) {
      //获取沙巴体育记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ibc/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAgpuRecord(st, et, page) {
      //获取ag捕鱼记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ag/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getImRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api2/im/game-record", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getBBinLiveRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      //   let res = await this.$http.get("/api2/bbin/game-record", {
      let res = await this.$http.get("/api/vendors.bbin/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "live",
        },
      });
      if (res && res.data.code == 1) {
        console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAeLiveRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ae/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "live",
        },
      });
      if (res && res.data.code == 1) {
        console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getCmdSportRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      //   let res = await this.$http.get("/api2/cmd/game-record", {
      let res = await this.$http.get("/api/vendors.cmd/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "sport",
        },
      });
      if (res && res.data.code == 1) {
        console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getSboSportRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      //   let res = await this.$http.get("/api2/sbo/game-record", {
      let res = await this.$http.get("/api/vendors.sbo/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "sport",
        },
      });
      if (res && res.data.code == 1) {
        //console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getMgDzRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      //   let res = await this.$http.get("/api2/mg/game-record", {
      let res = await this.$http.get("/api/vendors.mg/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "slot",
        },
      });
      if (res && res.data.code == 1) {
        console.log(res);
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getcq9Record(st, et, page) {
      //cq9记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.cq9/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getsaRecord(st, et, page) {
      //SA记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.sa/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getdgRecord(st, et, page) {
      //SA记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.dg/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getebetRecord(st, et, page) {
      //EBET记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ebet/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getiboRecord(st, et, page) {
      //IBO记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ibo/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getallbetRecord(st, et, page) {
      //allbet记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.allbet/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getezuRecord(st, et, page) {
      //EZU记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ezu/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async gettcgRecord(st, et, page) {
      //TCG记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.tcg/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getjdbRecord(st, et, page) {
      //JDB记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.jdb/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAeSlotRecord(st, et, page) {
      //JDB记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ae/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
          game_type: "slot"
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getbgRecord(st, et, page) {
      //bg记录
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.bg/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    async getAeLotteryRecord(st, et, page) {
      this.isLoading = true;
      this.page = 1;
      this.gameList = [];
      let res = await this.$http.get("/api/vendors.ael/gamerecord", {
        params: {
          st: st || this.st,
          et: et || this.et,
          limit: this.limit,
          page: page || this.page,
        },
      });
      if (res && res.data.code == 1) {
        this.isLoading = false;
        this.total = res.data.count;
        this.gameList = res.data.data;
      }
    },
    
    handleCurrentChange1(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.st, this.et, this.page);
    },
    handleCurrentChange2(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.st, this.et, this.page);
    },
    handleCurrentChange3(val) {
      this.page = val;
      this.recordList = [];
      this.getRecordList(this.st, this.et, this.page);
    },
    handleCurrentChange4(val) {
      this.page = val;
      this.gameList = [];
      this.getFhchessRecord(this.st, this.et, this.page);
    },
    handleCurrentChange5(val) {
      this.page = val;
      this.gameList = [];
      this.getAgSlotRecord(this.st, this.et, this.page);
    },
    handleCurrentChange6(val) {
      this.page = val;
      this.gameList = [];
      if (this.selectValue == 4) {
        this.getAgRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 5) {
        this.getBgFishing(this.st, this.et, this.page);
      } else if (this.selectValue == 6) {
        this.getBgLive(this.st, this.et, this.page);
      } else if (this.selectValue == 7) {
        this.getKyRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 8) {
        this.getIbcRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 9) {
        this.getAgpuRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 10) {
        this.getImRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 11) {
        this.getBBinSportRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 12) {
        this.getBBinLiveRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 13) {
        this.getAeLiveRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 14) {
        this.getMgDzRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 15) {
        this.getAeSportRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 16) {
        this.getCmdSportRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 17) {
        this.getSboSportRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 18) {
        this.getcq9Record(this.st, this.et, this.page);
      } else if (this.selectValue == 19) {
        this.getsaRecord(this.st, this.et, this.page);
      } else if (this.selectValue == 20) {
        this.getdgRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 21) {
        this.getebetRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 22) {
        this.getiboRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 23) {
        this.getallbetRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 24) {
        this.getezuRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 25) {
        this.gettcgRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 26) {
        this.getjdbRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 27) {
        this.getbgRecord(this.st, this.et, this.page);
      }else if (this.selectValue == 28){
        this.getAeSlotRecord(this.st, this.et, this.page);
        
      }else if (this.selectValue == 29){
        this.getAeLotteryRecord(this.st, this.et, this.page);
        
      }
    },
  },
  filters: {
    filterMoneyColor(m) {
      if (String(m).indexOf("+") > -1) return "redMoney";
      else return "";
    },
  },
};
</script>

<style scoped lang="less">
.user-TzRecord {
  padding-top: 20px;
  .filter {
    overflow: hidden;
    dt {
      line-height: 35px;
      font-size: 16px;
      color: #999;
      float: left;
      margin-right: 9px;
    }
    dd {
      min-width: 68px;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #333;
      float: left;
      text-align: center;
      padding: 0 13px;
      margin: 0 20px 20px 0;
      background: #f5f5f5;
      -webkit-border-radius: 6px;
      -moz-border-radius: 6px;
      border-radius: 6px;
      cursor: pointer;
      &.active {
        color: #fff;
        background: linear-gradient(0deg, #1486ff -33700%, #4ba1ff -30700%);
      }
    }
    &.platform {
      margin-bottom: 18px;
    }
    &.sotr {
      dd {
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    &.date-box {
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
        background: linear-gradient(0deg, #1486ff -33700%, #4ba1ff -30700%);
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
  }
  .record-content {
    width: 100%;
    margin-top: 10px;
    border: 2px solid #f5f5f5;
    span {
      width: 12%;
      font-size: 16px;
      color: #333;
      text-align: center;
      float: left;
      word-break: break-all;
    }
    .w18 {
      width: 18%;
    }
    .w14 {
      width: 14%;
    }
    .w15 {
      width: 15.5%;
    }
    .w25 {
      width: 25%;
    }
    .title {
      width: 100%;
      border-bottom: 2px solid #f5f5f5;
      overflow: hidden;
      span {
        line-height: 62px;
        color: #999;
      }
    }
    .item {
      width: 100%;
      line-height: 58px;
      border-bottom: 2px solid #f5f5f5;
      overflow: hidden;
      .money {
        font-size: 16px;
        color: #333;
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
  }
  .redMoney {
    color: #ff513e !important;
  }
  .el-pagination {
    text-align: center;
    margin: 20px auto;
  }
}
</style>