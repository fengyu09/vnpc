<template>
  <div class="member-report">
   
    <div class="team-title">
      <ul class="clearfix">
        <li>
          <span>{{ lastMsg.invitee_num }}</span>
          <span>{{$t('extendReport.memberReport.text[0]')}}</span>
        </li>
        <li>
          <span>{{ lastMsg.recharge }}</span>
          <span>{{$t('extendReport.memberReport.text[1]')}}</span>
        </li>
        <li>
          <span>{{ lastMsg.brokerage }}</span>
          <span>{{$t('extendReport.memberReport.text[2]')}}</span>
        </li>
        <li class="dw">
          <p style="padding-bottom: 6px">
            {{$t('extendReport.memberReport.text[3]')}} {{ currCodeMsg.rebate * 100 }}%
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
          <p v-if="isInvite" style="padding-top: 14px">
            {{ currCodeMsg.next_level_diff }} {{$t('extendReport.memberReport.text[4]')}}
          </p>
          <p v-if="!isInvite" style="padding-top: 14px">
            {{$t('extendReport.teamReport.registerNum.warnText[0]')}}
          </p>
        </li>
      </ul>
    </div>
    <div class="search-box">
      <input
        class="search-input"
        v-model="searchContent"
        :placeholder="$t('extendReport.memberReport.text[5]')"
        @input="searchInput($event)"
      />
      <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="search-btn" @click="searchBtn">{{$t('extendReport.memberReport.text[6]')}}</button>
    </div>
    <div class="re-content">
      <div class="title">
        <span class="user-pic w20">{{$t('extendReport.memberReport.tableTitle[0]')}}</span>
        <span class="name w25">{{$t('extendReport.memberReport.tableTitle[1]')}}</span>
        <span class="w20" >{{$t('extendReport.memberReport.tableTitle[2]')}}</span>
        <span class="w20">{{$t('extendReport.memberReport.tableTitle[3]')}}</span>
        <span class="w15">{{$t('extendReport.memberReport.tableTitle[4]')}}</span>
      </div>
      <el-scrollbar
        style="
          height: 400px;
          width: 100%;
          background: #fff;
          padding-bottom: 5px !important;
        "
        ref="myScrollbar"
      >
        <div class="item" v-for="(v, index) in reportList" :key="index">
          <span class="user-pic w20"><img v-lazy="v.avatar" alt="" /></span>
          <span class="name w25">
            <i>{{ v.nickname }}</i> 
           
          </span>
          <span class="w20">{{ v.createtime | formatDate2 }}</span>
          <span class="w20">{{ v.recharge }}</span>
          <span class="bkge w15">{{ v.brokerage }}</span>
        </div>
        <el-pagination
          v-if="total > 10"
          layout="prev, pager, next"
          :page-size="10"
          background
          :total="total"
          @current-change="handleCurrentChange1"
        ></el-pagination>
        <div class="no-content" v-if="!reportList.length && !isLoading">
          <img
            src="../../../assets/imgaes/extend/zanwudashang-min.png"
            alt=""
          />
          <p>{{ msg }}</p>
        </div>
        <p class="ts" v-if="isLoading">loading...</p>
        <div
          class="search-failed"
          v-show="searching && !isLoading && !searchList.length"
        >
          <!-- <p>搜索失败</p> -->
          <p class="huiColor">{{$t('extendReport.memberReport.text[7]')}}</p>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "memberReport",
  data() {
    return {
      lastMsg: {},
      searchContent: "",
      searchList: [], //搜索结果
      currCodeMsg: {},
      currPersent: "", //进度条
      isInvite: false,
      reportList: [],
      limit: 10, //每页多少条
      page: 1,
      isLoading: false, //loading
      searching: false, //搜索中
      msg: "",
      total: null,
    };
  },
  created() {
    this.getLast();
    this.getList();
    this.getInviteCode();
  },
     computed: {
    ...mapState(["skin"]),
  },
  methods: {
    async getLast() {
     
      let res = await this.$http.get("/api/market/latestcount", {
        params: {
          range: 1,
        },
      });
      if (res && res.data.code == 1) {
        this.lastMsg = res.data.data;
      }
    },
    async getList(page) {
      //获取列表
      this.isLoading = true;
      
      let res = await this.$http.get("/api/market/membercount", {
        params: {
          page: page || this.page,
          limit: this.limit,
          // range:1
          // st:fun_date(-10),
          // et:fun_date(0)
        },
      });
      this.isLoading = false;
      if (res && res.data.code == 1) {
        //console.log(res.data.data.length);
        this.reportList = res.data.data;
        this.total = res.data.count;
      } else if (res.data.code == 14) {
        this.msg = res.data.msg;
      }
    },
    searchBtn: function () {
      //搜索按钮
      let searchContent = this.searchContent.trim().toLowerCase();
      if (this.searchContent === "" || this.searchContent == null) {
        this.$message.error(this.$t('extendReport.memberReport.text[5]'));
        return;
      }
      this.reportList = this.reportList.filter(
        (value) => value.nickname.indexOf(searchContent) !== -1
      );
      if (this.reportList.length == 0) {
        this.isLoading = false;
        this.searching = true;
      } else {
        this.searching = false;
      }
    },
    searchInput: function (e) {
      if (e.data == null || e.data == "") {
        this.searching = false;
        this.getList();
      }
    },
    handleCurrentChange1(val) {
      this.page = val;
      this.reportList = [];
      this.getList(this.page);
    },
    //获取进度条数据
    getInviteCode: function () {
      // this.$http.get('/api2/market/index').then(res=>{
      this.$http.get("/api/market/index").then((res) => {
        if (res && res.data.code == 1) {
          this.currCodeMsg = res.data.data;
          this.isInvite = this.currCodeMsg.status == 10 ? true : false;
          this.currPersent =
            (this.currCodeMsg.invitee_num /
              (this.currCodeMsg.invitee_num -
                0 +
                (this.currCodeMsg.next_level_diff - 0))) *
            100;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.member-report {
  padding: 0 20px;
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
          background: linear-gradient(90deg, #ff9d2e -0.01%, #ffd24a 100%);
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
.search-box {
  margin: 20px 0;
  .search-input {
    width: 370px;
    height: 30px;
    font-size: 14px;
    color: #999;
    background: #f5f5f5;
    padding: 3px 9px;
    margin-right: 30px;
  }
  .search-btn {
    width: 69px;
    height: 30px;
    color: #fff;
    background: linear-gradient(0deg, #1486ff -46700%, #4ba1ff -43700%);
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    cursor: pointer;
  }
}
.re-content {
  border: 2px solid #f5f5f5;
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
    width: 16.66%;
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
.search-failed {
  font-size: 16px;
  color: #333;
  text-align: center;
  .huiColor {
    font-size: 12px;
    color: #999;
  }
}
.dw-icon {
  width: 60px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
}
.w10 {
  width: 10% !important;
}
.w15 {
  width: 15% !important;
}
.w20 {
  width: 20% !important;
}
.w25 {
  width: 25% !important;
}

.team-title {
  border-bottom: 1px solid #f4f5f8;
  // padding-bottom: 29px;
  padding-top: 38px;
  text-align: center;
  ul {
    padding: 0 21px;
    li {
      // width: 20%;
      // padding: 0 62px;
      width: 33.333%;
      text-align: center;
      float: left;
      &:nth-last-child(1) {
        // width: 40%;
        // padding: 0 0 0 25px;
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
</style>