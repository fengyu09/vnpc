<template>
  <div id="dsRecord">
    <!-- <h3>
      <i></i>打赏记录
    </h3>-->
    <div class="txhead">
      <div @click="mode=5" :class="[{active:mode==5},{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <i class="msgFlag" v-if="noRedList[5]>0">{{noRedList[5]}}</i>
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('news.text[0]')}}</span>
      </div>
      <div @click="mode=3" :class="[{active:mode==3},{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('news.text[1]')}}</span>
          <i class="msgFlag"  v-if="noRedList[3]>0">{{noRedList[3]}}</i>
      </div>
       <div @click="mode=0" :class="[{active:mode==0},{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('news.text[2]')}}</span>
         <i class="msgFlag"  v-if="noRedList[0]>0">{{noRedList[0]}}</i>
      </div>
    </div>
    <!-- 充值记录 -->
    <div >
       <el-scrollbar style="height: 678px">
    <ul>
        <li  v-for="(item,index1) in noticeList1" :key="index1" >
          <a id="floatAlink" @click="onButtonClick(item.msg_id,index1)" v-html="item.content" ></a><span>{{item.create_time |formatDateNy}}</span>
          <i v-if="item.readflag<1"></i>
        </li>
      </ul>
      <p class="ts" v-if="!noticeList1.length">nodata</p>
      <p class="ts" v-if="txNON1">loading...</p>
       </el-scrollbar>
      <el-pagination
        v-if="total>10"
        layout="prev, pager, next"
        :page-size="10"
        background
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <!-- 提现记录 -->
   

    <!-- 打赏 -->
    <div v-if="isPop" class="newsDetailBg">
      <div class="newsDetail">
        <h4>{{$t('news.text[3]')}} <i @click="closePop">×</i></h4>
        <div class="bgNews">
          <a v-if="msg" v-html="msg"></a>
          <p class="ts" v-else>loading...</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "dsRecord",
  data() {
    return {
      currentPage: 1, //初始页
      tableData: [],
      tableData1: [],
      tableData2: [],
      noticeList1:[],
      noticeList:[],
      mode: 5,
      dzNON: false,
      txNON: false,
      czNON: false,
      dzNON1: false,
      txNON1: false,
      czNON1: false,
      total: null,
      total1: null,
      total2: null,
      iscz: "",
      isPop:false,
      msg:"",
      noRedList:'',
    };
  },
  created() {
    this.convert();
  },
  watch:{
    mode:function(){
      this.noticeList1=[];
      this.getWithDraw()
    }
  },
  computed: {
    ...mapState(["skin"]),
  },
  methods: {
    ...mapMutations(["SETNEWSNUM"]),
    convert: function() {
      // if(this.noticeTypes==1){
      //   //官网
      //   this.getErcord(1);
      //   this.getWithDraw(1);
      // }else{
      //   //代理
      //   this.getErcordDl(1);
      //   this.getWithDrawDl(1);
      // }
      this.getErcord(1);
      this.getWithDraw(1);
       this.$http.get('/api/live/sport/get_message_count/',{params:{
                    client_type:4,
                    api:this.noticeTypes
                  }}).then(res1=>{
                    if(res1 && res1.data.code==1){
                      this.noRedList=res1.data.data.countList
        }
                  })
    },

    getErcord(val) {
      //系统消息
      this.dzNON1 = true;
       this.$http.get("/api/live/sport/get_message_list/", {
            params: {
              client_type:4,
              api:this.noticeType==1?1:5,
              msg_type:5
            }
          })
        .then(res => {
          this.noticeList = res.data.data;
          if (this.noticeList == "" || this.noticeList == null) {
            this.dzNON = true;
            
          }
          this.dzNON1 = false;
          
          // this.SETNEWSNUM(0)
        });
    },
    getErcordDl(val) {
      //系统消息
      this.dzNON1 = true;
      this.$http
              .get(this.versionLive2 + "live/get_notice_dl", {
                params: {
                  user_id: this.$store.state.userinfo.user_id,
                  msg_type: 4
                }
              })
              .then(res => {
                this.noticeList = res.data.data;
                if (this.noticeList == "" || this.noticeList == null) {
                  this.dzNON = true;

                }
                this.dzNON1 = false;

                // this.SETNEWSNUM(0)
              });
    },
    getWithDraw(val) {
      //活动消息
      this.txNON1 = true;
       this.$http
           this.$http.get("/api/live/sport/get_message_list/", {
            params: {
              page:1,
              limit:20,
              client_type:4,
              api:this.noticeTypes,
              msg_type:this.mode
            }
          })
        .then(res => {
          console.log(res)
          this.noticeList1 = res.data.data;
          this.total1 = res.data.total;
          if (this.noticeList1 == "" || this.noticeList1 == null) {
            this.txNON = true;
          }
          this.txNON1 = false;
        });
    },
    // getMsgList(i){
    //    this.$http
    //       .get(this.versionLive2 + "live/get_message_list/", {
    //         params: {
    //           client_type:3,
    //           api:this.noticeType==1?1:5,
    //           msg_type:this.menuActive,
    //           limit:20,
    //           page:this.pageNum
    //         }
    //       }).then(res=>{
    //         if(res.data.data.length==0&&this.msgList.length>0){
    //           this.noMore=true
    //         }
    //         this.msgList=this.msgList.concat(res.data.data)
    //         setTimeout(() => {
    //         this.$refs.scrollWrapper.refresh(); //重新计算高度，刷新滚动条
    //       }, 20);
    //         this.$vux.loading.hide();
    //        if(i==undefined){
    //           this.typeList=res.data.typeList
    //        }
    //       })
    // },
    getWithDrawDl(val) {
      //活动消息
      this.txNON1 = true;
      this.$http
              .get(this.versionLive2 + "live/get_notice_dl", {
                params: {
                  user_id: this.$store.state.userinfo.user_id,
                  msg_type: 3
                }
              })
              .then(res => {
                this.noticeList1 = res.data.data;
                this.total1 = res.data.total;
                if (this.noticeList1 == "" || this.noticeList1 == null) {
                  this.txNON = true;
                }
                this.txNON1 = false;
              });
    },
    popShow(v){
        this.msg = v;
        this.isPop=true;
    },
    closePop(){
      this.msg = "";
        this.isPop=false;
    },
    onButtonClick(i,d){
      this.$http
          .get("/api/live/sport/get_message/", {
            params: {
             msg_id:i
            }
          }).then(res=>{
              if(res&&res.data.code==1){
                 this.msg = res.data.data.content;
                 this.noticeList1[d].readflag=1;
                 this.$http.get('/api/live/sport/get_message_count/',{params:{
                    client_type:4,
                    api:this.noticeTypes
                  }}).then(res1=>{
                    if(res1 && res1.data.code==1){
                   this.noRedList=res1.data.data.countList
                    this.SETNEWSNUM(res1.data.data.msgCount);
        }
                  })
              }
          })
      this.isPop=true;
    },
  }
};
</script>

<style scoped lang="less">
#dsRecord {
  .txhead {
    display: flex;
    border-bottom: 1px solid #f4f5f8;
    >div{
      position: relative;
    }
    .msgFlag{
      position: absolute;
    background: red;
    line-height: 12px;
    font-size: 12px;
    padding: 2px 3px;
    border-radius: 8px;
    color: #fff;
    right: 0;
    top: 8px;
    }

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
      color:  #1486FF;
      font-weight: bold;
      &:before {
        content: "";
        width: 75%;
        height: 4px;
        background: #1486FF;
        position: absolute;
        bottom: -1px;
        border-radius: 4px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
ul {
  width: 100%; 
  li{
    position: relative;
    width: 100%;
    height: 60px;
    display: block;
    line-height:60px;
    border-bottom: 1px solid #f4f5f8;
    font-size:16px;
    padding-left: 16px;
     color:rgba(51,51,51,1);
     i{
       display: inline-block;
    width: 7px;
    height: 7px;
    background: #FF1C30;
    position: absolute;
    left: 2px;
    top: 26px;
    border-radius: 50%;
     }
    a{
      float: left;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      display: -webkit-inline-box;
      width: 700px;
      height: 60px;
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //溢出用省略号显示
      white-space:nowrap; //溢出不换行
      cursor: pointer;
      p{
        float: left;
      }
    }
    span{
      float: right;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(153,153,153,1);
      
    }
  }
}
.ts{
  text-align: center;
  line-height: 100px;
}
.el-pagination {
  white-space: nowrap;
  padding: 17px 5px !important;
  color: #303133;
  font-weight: 700;
  /* margin: 0 auto; */
  text-align: center !important;
}
.newsDetailBg{
width: 100%;
height: 100%;
background: rgba(0,0,0,0.5);
  position: fixed;
      top: 0;
    left: 0;
.newsDetail{
     margin-left: -250px;
    width: 500px;
    height: auto;
    position: fixed;
    z-index: 1001;
    // top: 32%;
    top: 22%;
    left: 50%;
  h4{
    height: 40px;
    background: #ff1c30;
    color: #fff;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    i{
      float: right;
      font-size: 26px;
      font-weight: normal;
      position: relative;
      right: 9px;
      cursor: default;
    }
  }
  .bgNews{
    width: 100%;
    height: auto;
    background: #fff;
    padding: 20px 30px;
    min-height: 100px;
    max-height: 350px;
    overflow-y: auto;
    a{
      font-size: 14px;
      line-height: 20px;
      p{
        line-height: 24px!important;
      }
    }
    p{
      font-size: 14px;
    }
  }
  }
}
</style>
