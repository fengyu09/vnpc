<template>
  <div class="wraper">
    <!--playList :需要传一个数据进来，因为当数据发生变化时，滚动条也需要refresh刷新 必选-->
    <!--isDown:是否需要下拉刷新 如果为true 那么需要有 isLoad属性 如果为false isLoad不需要-->
    <!--isUp:是否需要上拉加载更多 如果为true 那么需要有 isloadUp属性 如果为false isloadUp不需要-->
    <!--reLoad：回调函数  下拉刷新或者上拉加载更多调用接口-->
    <!-- 标题 -->
    <!--    <div class="gifShow fadeInLeft">-->
    <!--      <span class="tx"><img src="" alt=""></span>-->
    <!--      <dl class="nickAGif">-->
    <!--        <dt>不懂问师叔</dt>-->
    <!--        <dd>送出 <span>兰博基尼</span></dd>-->
    <!--      </dl>-->
    <!--      <div class="gifts"><img src="../../assets/images/lbjn.png" alt=""></div>-->
    <!--      <div class="num"><i>X</i>10</div>-->
    <!--    </div>-->
    <!-- <flexbox class="infoHead">
      <flexbox-item :span="1/10">
        <div
                @click="$router.go(-1)"
                class="flex-demo"
                style="padding-top: 0.7em; z-index: 10000001;"
        >
          <img src="../../assets/images/gray-back-icon.png" alt />
        </div>
      </flexbox-item>
      <flexbox-item>
        <div class="flex-demo tickling">全部主播</div>
      </flexbox-item>
      <flexbox-item :span="1/10">
        <div class="flex-demo"></div>
      </flexbox-item>
    </flexbox>-->

      <div class="lotteryType">
        <div v-for="(v, index) in lotteryType" :key="index" class="lottery-item fl" :class="{active:index==nowIndex}" @click="changeLottery(index,v.type)" >
            <span class="preview">{{ v.name }}</span>
        </div>
      </div>

    <!-- 热门讨论 -->
    <div class="hot_content clearfix">
      <div class="hot_content_1">
        <ul class="clearfix" v-if="hotHost.length">
          <li class="fl" v-for="(item, index) in hotHost" :key="index">
            <router-link
              :to="'/chat/' + item.anchor_id + '/' + item.lottery_id"
            >
              <div class="hot_one_1">
                <div class="hot_one_2">
                  <img v-lazy="item.avatar" alt />
                  <div :class="item.name ? 'left_tit' : 'left_titno'" :style="'background:url('+item.background_pc+');background-size:cover'">
                    {{ item.name }}
                  </div>
                  <div class="left_paly"></div>
                </div>
                <div class="left_bot" :title="item.live_intro">{{ item.live_intro }}</div>
                <div class="hot_tag  hot-num fr clearfix">
                  <div class="fl onlineBox clearfix">
                    <div class="online fl">
                      <img src="../../assets/imgaes/main/online2.png" alt />
                    </div>
                    <div class="onlineNum fl" v-if="item.online >= 10000">
                      {{ (item.online / 10000).toFixed(1) }}万
                    </div>
                    <div class="onlineNum fl" v-else>{{ item.online }}</div>
                  </div>
                </div>
                <div class="red-pack" v-if="item.red_paper_num>0"></div>
                <div class="prop" v-if="item.daxiu==true && item.live_status == 1 "></div>
              </div>
              <p class="nyy"></p>
              <!-- <div class="left_bot">{{ item.live_intro }}</div> -->
              
              <div class="hot_one_3 clearfix">
                <div class="hot_name fl clearfix">
                  <div class="fl hot_img">
                    <img v-lazy="item.avatar" alt />
                  </div>
                  <div class="fl name_1">{{ item.nickname }}</div>
                  <div class="fl isLive" v-if="item.live_status == 1">
                    <img src="../../assets/imgaes/member/zhibo_ing.gif" alt />
                  </div>
                  <div class="fl isLive" v-else>
                    <img src="../../assets/imgaes/main/noLive.png" alt />
                  </div>
                </div>
                <div class="hot_tag fr clearfix">
                  <div class="fl onlineBox clearfix" v-if="item.tags.length">
                    <div class="online fl">
                      <img v-lazy="item.tags[0].icon" alt="" />
                    </div>
                    <div class="onlineNum fl">
                      {{ item.tags[0].title }}
                    </div>
                  </div>
                  <div class="fl onlineBox clearfix" v-else>
                    <div class="online fl">
                      <img
                        src="../../assets/imgaes/main/sy_rmzb_qc@3x.png"
                        alt=""
                      />
                    </div>
                    <div class="onlineNum fl">
                      清纯
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <p v-if="code==false&&hotHost.length==0" class="zanwu">当前彩种暂无主播哦~</p>
        <!-- 未加载样式 -->
        <ul class="clearfix" v-if="code==true&&!hotHost.length">
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
          <li class="fl wjz">
            <div>
              <img src="../../static/site/imgs/load.png" alt />
            </div>
            <div>loading...</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <p class="no-data-tip">Tôi cũng có giới hạn đó~~</p> -->

    <el-backtop target=".wraper">
      <div
        style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
// import myScroll from "../../components/myScroll.vue";
import { mapState } from "vuex";
export default {
  name: "allanchor",
  data() {
    return {
      hotHost: [], //热门主播
      playList: {},
      lotteryType:[],   //主播类型
      nowIndex:'',
      type:'',
      code:true,   //暂无主播的显示隐藏
      limit:100,
    };
  },
  created() {
    this.convert();
  },
  mounted() {},

  computed: {
    ...mapState(["username", "codeToken", "userinfo"])
  },
  filters: {
    filterOnlineNum(n) {
      if (n > 10000) {
        return n / 10000 + "万";
      }
      return n;
    }
  },
  methods: {
    convert() {
      //文章列表
      this.getHost();
      // this.getlotteryType();   
    },
     getlotteryType(){           //获取主播类型
        this.$http.get(this.versionLive2+"live/get_all_list/", {
            params: {
              limit: this.limit,
              page: 1
            }
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.lotteryType = res.data.typeList || [];
            }
          });
      },
       changeLottery(index,type){       //点击切换 
        this.nowIndex = index;
        this.type = type;
        this.code=true
        this.$http.get(this.versionLive2+"live/get_all_list/", {
            params: {
              limit: this.limit,
              page: 1,
              type:type
            }
          })
          .then(res => {
            if (res && res.data.code == 1) {
              this.hotHost = res.data.data || [];
              this.code=false
            }
          });
      },
    getHost() {this.$http.get(this.versionLive2+"live/get_all_list/", {
          params: {
            limit: 100,
            page: 1
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.hotHost = res.data.data;
            this.lotteryType = res.data.typeList || [];
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.lotteryType {
    overflow: hidden;
    width: 1200px;
    height: 40px;
    margin:20px auto;
    .lottery-item {
      display: inline-block;
      margin-right:30px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &.active {
        span {
          color: #fff;
          background: #FF1C30;
        }
      }
    .preview {
      display: block;
      background: #fff;
      height: 40px;
      width: 110px;
      line-height: 40px;
      color: #999;
      border-radius: 40px;
    }
    }
}

.zanwu{
   width: 1200px;
   margin:0 auto;
   text-align: center;
   color: #000;
   font-size: 16px;
   margin-top: 200px;
}

  .hot_content {
     width: 1200px;
     margin: 20px auto;
     min-height: 900px;
    .hot_content_1 {
      ul {
          li {
          background-color: #ffffff;
          width: 285px;
          border-radius: 5px;
          height: 236px;
          margin-right: 20px;
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          &:nth-of-type(4n){
            margin-right: 0;
          }
          .hot_one_1 {
            height: 190px;
            overflow: hidden;
            position: relative;
            color: #fff;
            .left_paly {
              content: "";
              position: absolute;
              width: 44px;
              height: 44px;
              background: url("../../assets/imgaes/allIcon.png") no-repeat;
              background-position: -43px 0;
              background-size: 720px 720px;
              top: 73px;
              left: 50%;
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              display: none;
            }
            &:hover img {
              transform: scale(1.1);
            }
            &:hover .left_paly {
              display: block;
            }
            .red-pack {
              position: absolute;
              right: 10px;
              bottom: 70px;
              width: 29px;
              height: 36px;
              background: url("../../assets/imgaes/main/hongbao_03-min.png")
                no-repeat;
              background-size: contain;
            }
            .prop{
              position: absolute;
              right: -7px;
              bottom: 19px;
              width: 78px;
              height: 61px;
              background: url("../../assets/imgaes/main/td-min.png") no-repeat;
              background-size: contain;
            }
            .left_tit {
              position: absolute;
              left: 0;
              top: 0;
              // width: 76px;
              height: 28px;
              margin-top: 10px;
              border-radius: 0px 8px 8px 0;
              overflow: hidden;
              font-size: 14px;
              color: #fff;
              line-height: 28px;
              text-align: center;
              // padding-right: 10px;
              padding: 0 10px;
              background-size: cover!important;
              // background: -webkit-linear-gradient(
              //   left,
              //   #ff4444,
              //   #ffc37d
              // ); /* Safari 5.1 - 6.0 */
              // background: -o-linear-gradient(
              //   right,
              //   #ff4444,
              //   #ffc37d
              // ); /* Opera 11.1 - 12.0 */
              // background: -moz-linear-gradient(
              //   right,
              //   #ff4444,
              //   #ffc37d
              // ); /* Firefox 3.6 - 15 */
              // background: linear-gradient(
              //   to right,
              //   #ff4444,
              //   #ffc37d
              // ); /* 标准的语法 */
            }
            .left_tit_mr {
              background: url("../../assets/imgaes/allIcon.png") no-repeat;
              background-position: -92px -177px;
              background-size: 700px 700px;
            }

            .left_right {
              position: absolute;
              bottom: 5px;
              right: 10px;
            }
            img {
              width: 100%;
              transition: all 0.1s ease-out;
              -webkit-transition: all 0.1s ease-out;
            }
          }
          .nyy{
              position: absolute;
              width: 100%;
              height: 30px;
              top: 160px;
              opacity: 0.6;
              background: -webkit-linear-gradient(top, rgba(0,0,0,0.1), #585858);
              z-index: 1;
            }
          .left_bot {
            position: absolute;
            left: 0;
            bottom: 0;
            line-height: 34px;
            height: 34px;
            margin: 0 10px;
            color: #fff;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 167px;
            z-index: 2;
          }
          .hot_one_3 {
            height: 35px;
            padding: 10px 10px 0 10px;

            .hot_name {
              height: 26px;

              .isLive {
                width: 20px;
                height: 14px;
                margin-left: 6px;
                margin-top: 2px;
              }
              .name_1 {
                line-height: 26px;
                font-size: 12px;
                color: #999999;
              }
              .hot_img {
                margin-right: 8px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  height: 100%;
                  width: auto;
                }
              }
            }

            .hot_tag {
              .onlineBox {
                height: 26px;
                .onlineNum {
                  line-height: 26px;
                  color: #999999;
                  font-size: 14px;
                  margin-left: 6px;
                }
                .online {
                  width: 18px;
                  height: 20px;
                  margin-top: 5px;
                  overflow: hidden;
                  img{
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
          .onlineNum {
            font-size: 12px;
            margin-top: 2px;
            margin-left: 4px;
          }
          .hot-num {
            position: absolute;
            right: 10px;
            bottom: 7px;
            color: #fff;
            z-index: 2;
          }
        }
      }
    }
  }

.no-data-tip {
  text-align: center;
  margin-bottom: 20px;
}
.wjz{
  li{
    overflow: hidden;
    height: 236px;
    div{
      &:nth-child(1){
        height: 190px;
      }
      &:nth-child(2){
        text-align: center;
      }
    }
  }
  img{
    width: 100%;
    height: auto;
  }
}
</style>
