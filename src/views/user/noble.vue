<template>
  <div class="noble">
    <div class="card-box">
      <div class="card" v-if="cardList.length">
        <el-carousel
          :interval="4000"
          :autoplay="false"
          type="card"
          trigger="click"
          arrow="never"
          ref="cardCarousel"
          style="width: 980px"
          @change="cardChange"
        >
          <el-carousel-item v-for="(item, index) in cardList" :key="index">
            <!--            <div class="card-item" :class="{noActive:item.noble_id!=myNoble.noble_code}">-->
            <div
              class="card-item"
              :class="
                item.noble_id == myNoble.noble_code ||
                item.noble_id < myNoble.noble_code
                  ? ''
                  : 'noActive'
              "
            >
              <img :src="item.cardImg" alt="" srcset="" />
              <div
                class="item-content"
                v-if="myNoble.noble_code == item.noble_id"
              >
                <div class="progress">
                  <el-progress
                    :percentage="
                      myNoble.noble_code == 7
                        ? 100
                        : parseInt((myNoble.exp / item.max_exp) * 100)
                    "
                    :stroke-width="10"
                    :show-text="false"
                    :color="item.nobleColor"
                  ></el-progress>
                  <p style="margin-top: 6px">
                    <span
                      ><i :style="{ color: item.nobleColor }">{{
                        myNoble.exp
                      }}</i
                      >/{{ item.max_exp }}</span
                    >
                  </p>
                </div>
                <div class="baoji">
                  <span :style="{ color: item.nobleColor }">保级条件:</span>
                  <div>
                    <p :style="{ color: item.nobleColor }">
                      <i
                        :style="{
                          color: item.noble_id == 7 ? '#FFFC00FF' : '#FF0000FF',
                        }"
                        >{{ item.day }}</i
                      >
                      天内消费<i
                        class="zs-num"
                        :style="{
                          color: item.noble_id == 7 ? '#FFFC00FF' : '#FF0000FF',
                        }"
                        >{{ item.low_consume }}</i
                      ><span>砖石</span>
                    </p>
                    <p :style="{ color: item.nobleColor }">
                      您当前已消费
                      <i
                        :style="{
                          color: item.noble_id == 7 ? '#FFFC00FF' : '#FF0000FF',
                        }"
                        class="zs-num"
                        >{{ userGrowth.keep_consume }}</i
                      >
                      砖石
                    </p>
                    <div class="ts" :style="{ background: item.nobleColor }">
                      ?
                      <div class="tooltip">
                        如未完成保级条件则扣除{{ item.loss }}经验
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style="
                  position: absolute;
                  top: 56%;
                  text-align: center;
                  width: 90%;
                  color: #191b06;
                  font-size: 20px;
                "
                v-if="myNoble.noble_code > item.noble_id"
              >
                高于该等级
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="card-btn prev" @click="changeCard(0)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="card-btn next" @click="changeCard(1)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="noble-content">
      <div class="powert-title">
        <img src="../../assets/imgaes/noble/line.png" alt="" />
        <span>{{ activeCard.name }}会员权益</span>
        <img
          src="../../assets/imgaes/noble/line.png"
          alt=""
          style="transform: rotate(180deg)"
        />
      </div>
      <div class="powert-box">
        <ul style="padding: 0 70px; margin-bottom: 42px">
          <li>
            <img src="../../assets/imgaes/noble/tq_icon10.png" alt="" />
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/noble/tq_icon1.png" alt="" />
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/noble/tq_icon3.png" alt="" />
            <p>专属礼物</p>
          </li>
          <li style="position: relative">
            <img src="../../assets/imgaes/noble/tq_icon9.png" alt="" />
            <p>影视区{{ parseInt(activeCard.film_discount) }}折</p>
            <p class="zk-num">{{ parseInt(activeCard.film_discount) }}</p>
          </li>
          <li style="position: relative">
            <img src="../../assets/imgaes/noble/tq_icon11.png" alt="" />
            <p>
              <span v-if="activeCard.noble_id != 7"
                >每天免费观影{{ activeCard.free_watch_nums }}部</span
              ><span v-else>观影无限制</span>
            </p>
            <p class="zk-num" style="font-size: 36px; top: 56px">
              <span v-if="activeCard.noble_id != 7">{{
                activeCard.free_watch_nums
              }}</span
              ><span v-else>无限</span>
            </p>
          </li>
        </ul>
        <ul>
          <li :class="{ noActive: activeCard.welcome_msg == '' }">
            <img src="../../assets/imgaes/noble/tq_icon2.png" alt="" />
            <p>进场特殊欢迎语</p>
          </li>
          <li :class="{ noActive: activeCard.draws == 0 }">
            <img src="../../assets/imgaes/noble/tq_icon4.png" alt="" />
            <p>每日抽奖{{ activeCard.draws }}次</p>
          </li>
          <li :class="{ noActive: activeCard.mount == 0 }">
            <img src="../../assets/imgaes/noble/tq_icon6.png" alt="" />
            <p>进场坐骑</p>
          </li>
          <li :class="{ noActive: activeCard.barrage == 0 }">
            <img src="../../assets/imgaes/noble/tq_icon8.png" alt="" />
            <p>贵族弹幕</p>
          </li>
          <li :class="{ noActive: activeCard.noble_id < 6 }">
            <img src="../../assets/imgaes/noble/tq_icon5.png" alt="" />
            <p>专属表情包</p>
          </li>
          <li :class="{ noActive: activeCard.put_hot == 0 }">
            <img src="../../assets/imgaes/noble/tq_icon7.png" alt="" />
            <p>推荐主播上热门</p>
          </li>
        </ul>
      </div>
      <div class="powert-title">
        <img src="../../assets/imgaes/noble/line.png" alt="" />
        <span>会员专属礼包</span>
        <img
          src="../../assets/imgaes/noble/line.png"
          alt=""
          style="transform: rotate(180deg)"
        />
      </div>
      <div class="vip-gift">
        <ul v-if="giftList.length">
          <li v-for="(item, index) in giftList" :key="index">
            <!-- <img :src="item.list[0].icon" alt=""> -->
            <div class="vipzh" v-if="item.list.length == 1">
              <p style="font-size: 40px; margin-top: 28px">
                {{ item.list[0].price }}
              </p>
              <img :src="item.list[0].icon" alt="" />
              <p style="color: #245cc8ff; font-size: 28px">
                {{ item.list[0].name }}
              </p>
            </div>
            <div class="viplw" v-else>
              <el-carousel
                trigger="click"
                arrow="never"
                :autoplay="true"
                height="230px"
              >
                <el-carousel-item
                  v-for="(item2, index2) in item.list"
                  :key="index2 + 'i'"
                >
                  <div v-if="item2.name == '钻石'">
                    <p style="font-size: 40px; margin-top: 28px">
                      {{ item2.price }}
                    </p>
                    <img :src="item2.icon" alt="" />
                    <p style="color: #245cc8ff; font-size: 28px">
                      {{ item2.name }}
                    </p>
                  </div>
                  <div
                    v-else
                    style="
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: space-around;
                      height: 200px;
                    "
                  >
                    <img
                      :src="item2.icon"
                      alt=""
                      style="width: 72%; margin-top: 10px"
                    />
                    <p style="font-size: 20px; margin-top: 16px">
                      {{ item2.name }}
                    </p>
                  </div>
                  <!-- <div></div> -->
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- <div>
            </div> -->
            <p>{{ item.noble_name }}</p>
          </li>
        </ul>
      </div>
      <div class="powert-title">
        <img
          src="../../assets/imgaes/noble/bg4.png"
          alt=""
          style="vertical-align: sub"
        />
        <span>Điều kiện và quy tắc hoạt động</span>
        <img
          src="../../assets/imgaes/noble/bg3.png"
          alt=""
          style="vertical-align: sub"
        />
      </div>
      <div class="tips">
        <p v-for="item in nobleTips"><i></i>{{ item }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "noble",
  data() {
    return {
      cardList: [],
      userGrowth: [],
      giftList: [],
      activeCard: {},
      myNoble: {},
      nobleTips: [],
    };
  },
  created() {
    if (this.$store.state.userinfo.user_id < 0) return;
    this.$http.get(this.versionLive2 + "user/get_noble/").then((res) => {
      if (res && res.data.code == 1) {
        this.cardList = res.data.data.noble_list;
        this.userGrowth = res.data.data.user_growth;
        this.giftList = res.data.data.gift_list;
        this.nobleTips = res.data.data.tips;
        console.log(this.nobleTips);
        this.$http.get(this.versionLive2 + "user/get_my_noble/").then((res) => {
          if (res && res.data.code == 1) {
            this.myNoble = res.data.data;
            console.log(this.myNoble);
            if (res.data.data.noble_code) {
              this.activeCard = this.cardList[res.data.data.noble_code - 1];
              this.$refs.cardCarousel.setActiveItem(
                res.data.data.noble_code - 1
              );
            } else {
              this.activeCard = this.cardList[6];
              this.$refs.cardCarousel.setActiveItem(6);
            }
          }
        });
        this.cardList.forEach((i, t) => {
          i.cardImg = require("../../assets/imgaes/noble/noble" +
            i.noble_id +
            ".png");
          if (i.noble_id == 1) {
            i.nobleColor = "#91634CFF";
          } else if (i.noble_id == 2) {
            i.nobleColor = "#436B7DFF";
          } else if (i.noble_id == 3) {
            i.nobleColor = "#CA691FFF";
          } else if (i.noble_id == 4) {
            i.nobleColor = "#333399FF";
          } else if (i.noble_id == 5) {
            i.nobleColor = "#2A5EE9FF";
          } else if (i.noble_id == 6) {
            i.nobleColor = "#7312C7FF";
          } else if (i.noble_id == 7) {
            i.nobleColor = "#CE1313FF";
          }
        });
        this.cardList.reverse();
      }
    });
  },
  mounted() {},
  methods: {
    changeCard(i) {
      if (i) {
        this.$refs.cardCarousel.next();
      } else {
        this.$refs.cardCarousel.prev();
      }
    },
    cardChange(i) {
      this.activeCard = this.cardList[i];
    },
  },
};
</script>
<style lang="less">
.noble {
  .card-box {
    position: relative;
    width: 100%;
    height: 560px;
    background: url("../../assets/imgaes/noble/noble_bg.png") no-repeat;
    background-size: cover;
    .card {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-carousel__mask {
        display: none;
      }
      .card-item {
        position: relative;
        .item-content {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          padding-top: 28%;
          padding-left: 10.5%;
          text-align: center;
          font-size: 16px;
          span {
          }
          .progress {
            width: 55.5%;
          }
          .baoji {
            padding-left: 11%;
            padding-top: 0;
            > span {
              float: left;
              margin-top: 3px;
            }
            > div {
              float: left;
              line-height: 24px;
              position: relative;
              p {
                text-align: right;
              }
              .ts {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                line-height: 22px;
                text-align: center;
                position: absolute;
                background: #91634cff;
                top: 26%;
                right: -15%;
                color: #fff;
                font-size: 16px;
                .tooltip {
                  position: absolute;
                  padding: 1px 2px;
                  width: 250px;
                  font-size: 12px;
                  transform: translateX(-50%);
                  left: 50%;
                  top: 36px;
                  background: #fff;
                  color: #000;
                  border-radius: 4px;
                  display: none;
                }
                &:hover {
                  .tooltip {
                    display: block;
                  }
                }
              }
              .zs-num {
                display: inline-block;
                width: 60px;
                text-align: center;
              }
            }
          }
        }
        img {
          width: 100%;
          // filter: grayscale(100%);
        }
        &.noActive {
          filter: grayscale(100%);
        }
      }
      .is-active.is-in-stage {
        z-index: 2;
        width: 642px;
        margin-left: -85px;
        margin-top: -26px;
        .card-item {
          img {
            width: 100%;
          }
          .item-content {
            font-size: 18px;
            .baoji {
              padding-left: 14%;
              padding-top: 2%;
              > span {
                float: left;
                margin-top: 5px;
              }
              > div {
                float: left;
                line-height: 28px;
                p {
                  text-align: right;
                }
                .zs-num {
                  display: inline-block;
                  width: 100px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
      .el-carousel__indicators--outside button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #cccccc;
        opacity: 1;
      }
      .el-carousel__indicators--outside {
        li {
          margin-top: -10px;
        }
      }
      .el-carousel__indicator.is-active button {
        background: #ff0000;
      }
      .card-btn {
        width: 46px;
        height: 46px;
        background: rgba(119, 123, 123, 0.77);
        border-radius: 50%;
        position: absolute;
        text-align: center;
        cursor: pointer;
        i {
          color: #fff;
          font-size: 30px;
          margin-top: 8px;
        }
        &.prev {
          top: 96px;
          left: -48px;
        }
        &.next {
          top: 96px;
          right: -48px;
        }
      }
    }
  }
  .noble-content {
    width: 1200px;
    margin: 0 auto;

    background: #fff;
    overflow: hidden;
    .powert-title {
      margin-top: 58px;
      margin-bottom: 40px;
      text-align: center;
      span {
        font-size: 36px;
        font-weight: bold;
        margin: 0 10px;
      }
      img {
        vertical-align: text-top;
      }
    }
    .powert-box {
      ul {
        display: flex;
        justify-content: space-around;
        li {
          width: 158px;
          text-align: center;
          p {
            margin-top: 12px;
            font-size: 18px;
          }
          .zk-num {
            position: absolute;
            width: 100%;
            top: 40px;
            font-size: 46px;
            font-family: fantasy;
            font-weight: bold;
            color: #fff;
          }
        }
        .noActive {
          filter: grayscale(100%);
        }
      }
    }
    .vip-gift {
      margin-top: 60px;
      > ul {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        > li {
          position: relative;
          width: 200px;
          height: 230px;
          text-align: center;
          // background: url('../../assets/imgaes/noble/bg1.png') no-repeat;
          background: linear-gradient(0deg, rgba(235, 202, 125, 0.74), #ffffff);
          border: 2px solid #f8ecd2;
          border-radius: 10px;
          margin: 0 30px;
          margin-bottom: 60px;
          > p {
            position: absolute;
            width: 100%;
            text-align: center;
            bottom: -32px;
            font-size: 20px;
          }
          .el-carousel__button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #999999ff;
          }
          .el-carousel__indicator.is-active button {
            background: #ff0000ff;
          }
        }
      }
    }
    .tips {
      p {
        line-height: 36px;
        font-size: 20px;
        padding: 0 150px;
        margin-bottom: 20px;
        i {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 20px;
          background: #7b6d56ff;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>