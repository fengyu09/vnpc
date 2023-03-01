<template>
  <div class="search">
    <div class="search-input" style="">
      <input
        type="text"
        placeholder="牛牛抢红包快来参与"
        v-model="searchCon"
        maxlength="10"
      />
      <div @click="toSearch()">搜索</div>
    </div>

    <div class="search-content">
      <div class="res">Kết quả tìm kiếm</div>
      <div class="hot_content clearfix">
        <div class="hot_content_1">
          <ul class="clearfix">
            <li class="fl" v-for="(item, index) in searchRes" :key="index">
              <router-link
                :to="'/chat/' + item.anchor_id + '/' + item.lottery_id"
              >
                <div class="hot_one_1">
                  <div class="hot_one_2">
                    <img v-lazy="item.avatar" alt />
                    <div :class="item.name ? 'left_tit' : 'left_titno'">
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
                        {{ (item.online / 10000).toFixed(1)}}万
                      </div>
                      <div class="onlineNum fl" v-else>{{ item.online }}</div>
                    </div>
                  </div>
                  <div class="red-pack" v-if="item.red_paper_num > 0"></div>
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
          <div
            v-if="searchRes !== undefined && searchRes.length == 0"
            style="width:100%;height:236px;line-height:236px;text-align:center;font-size:14px;color:#333;"
          >
            暂无搜索结果
          </div>
        </div>

        <div class="res">Gợi ý liên quan</div>
        <div class="hot_content clearfix">
          <div class="hot_content_1">
            <ul class="clearfix">
              <li class="fl" v-for="(item, index) in tuijian" :key="index">
                <router-link
                  :to="'/chat/' + item.anchor_id + '/' + item.lottery_id"
                >
                                <div class="hot_one_1">
                  <div class="hot_one_2">
                    <img v-lazy="item.avatar" alt />
                    <div :class="item.name ? 'left_tit' : 'left_titno'">
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
                  <div class="red-pack" v-if="item.red_paper_num > 0"></div>
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
          </div>
          <!-- <div v-if="tuijian !== undefined && tuijian.length == 0" style="width:100%;height:236px;line-height:236px;text-align:center;font-size:14px;color:#333;">
            暂无相关推荐    
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchCon: "", //搜索关键字
      searchRes: [], //搜索结果
      tuijian: [],
      search: []
    };
  },
  created() {
    (this.searchCon = this.$route.query.searchCon), this.toSearch();
    if(this.$route.query.searchCon==''){
      this.searchCon='牛牛抢红包快来参与'
    }
  },
  watch: {
    searchCon: function() {
      if (this.searchCon == "") {
        // this.tuijian = [];
        this.searchRes = [];
      } else {
        this.toSearch();
      }
    },
    $route(to, from) {
      (this.searchCon = this.$route.query.searchCon), this.toSearch();
    }
  },

  methods: {
    toSearch() {      //搜索
      this.$http.get(this.versionLive2+"live/search/", {
          params: {
            search_content: this.searchCon
          }
        })
        .then(res => {
          if (res && res.data.code == 1) {
            this.search = res.data.data;
            this.tuijian = res.data.data.related;
            this.searchRes = res.data.data.result;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 1200px;
  margin: 0 auto;
  .search-input {
    margin: 0 auto;
    margin-top: 30px;
    width: 410px;
    height: 34px;
    line-height: 34px;
    background: #ffffff;
    border-radius: 17px;
    border: 1px solid #eeeeee;
    color: #999;
    input {
      width: 350px;
      display: inline-block;
      float: left;
      border-radius: 17px;
      padding-top: 9px;
      padding-left: 13px;
    }
    div {
      width: 60px;
      margin-top: -24px;
      border-radius: 0 17px 17px 0;
      display: inline-block;
      float: right;
      text-align: center;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      background: #ff1c30 !important;
    }
  }
  .search-content {
    min-height: 75vh;
    .res {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      margin: 20px 0;
    }

    .hot_content {
      margin-bottom: 20px;
      .hot_left {
        height: 400px;
        width: 590px;
        border: 1px solid #ccc;
        border-radius: 10px;
      }
      .hot_right {
        height: 400px;
        width: 590px;
        .hot_1 {
          width: 590px;
          height: 195px;
          margin-bottom: 10px;
          div {
            width: 290px;
            border: 1px solid #ccc;
            border-radius: 10px;
            height: 195px;
          }
        }
        .hot_2 {
          width: 590px;
          height: 195px;
          div {
            width: 290px;
            border: 1px solid #ccc;
            border-radius: 10px;
            height: 195px;
          }
        }
      }
    }
    .hot_content_1 {
      ul {
        li {
          background-color: #ffffff;
          width: 285px;
          border-radius: 5px;
          // height: 260px;
          height: 236px;
          margin-right: 20px;
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          &:nth-of-type(4n) {
            margin-right: 0;
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
        }
      }
    }
  }
}
.hot_one_1 {
  height: 190px;
  overflow: hidden;
  position: relative;
  color: #fff;
  // transition:  transition 0.1s ease-out;
  // -webkit-transition: transition 0.1s ease-out;
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
    background: url("../../assets/imgaes/main/hongbao_03-min.png") no-repeat;
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
    background: -webkit-linear-gradient(
      left,
      #ff4444,
      #ffc37d
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #ff4444,
      #ffc37d
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      right,
      #ff4444,
      #ffc37d
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #ff4444, #ffc37d); /* 标准的语法 */
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
        img {
          width: 100%;
        }
      }
    }
  }
}
.onlineNum {
  // line-height: 26px;
  // color: #999999;
  font-size: 12px;
  margin-top: 2px;
  margin-left: 4px;
}
.hot-num {
  position: absolute;
  bottom: 7px;
  color: #fff;
  right: 10px;
  z-index: 2;
}
</style>
