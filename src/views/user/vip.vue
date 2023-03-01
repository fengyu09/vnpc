<template>
  <div id="vip-details">
    <div class="banner">
      <el-carousel class="car-box" indicator-position="outside" ref="carousel" trigger="click" :autoplay="false" @change="handChange" type="card"   height="318px">
        <el-carousel-item :class="'item'+(index+1)" initial-index="index" v-for="(item,index) in 7" :key="index">
          <div class="bar">
            <span class="bar-jdt"><i class="bar-jdtbj"  :class="'bg'+(index+1)" :style="{'width':5 +'%'}"></i></span>
            <i class="bar-bli ">100/3000</i>
          </div>
          <div class="info">
              <p>保级条件：<strong>30</strong>天内消费 <strong>100000</strong>钻石</p>
              <p>您当前已消费 <strong>20</strong>钻石</p>
              <p>
                <span class="icon"  @mouseover="mouseOver(index)" @mouseleave="mouseLeave(index)">?</span>
                <span class="text" :class="'isTips'+index" v-if="isTips">如未完成保级条件则扣除500000经验</span>
              </p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content main clearfix">
        <h3 class="title"><span class="line"></span> {{title}}会员权益 <span class="line"></span></h3>
        <ul class="member-benefits clearfix" v-if="currId ==0">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy4_qs.png" alt="">
            <p>影视区9折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy5_qs.png" alt="">
            <p>每天免费观影3部</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6_2.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7_2.png" alt="">
            <p>每日抽奖</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8_2.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9_2.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <ul class="member-benefits clearfix" v-if="currId ==1">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy4_nj.png" alt="">
            <p>影视区8折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy5_nj.png" alt="">
            <p>每天免费观影5部</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7.png" alt="">
            <p>每日抽奖1次</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8_2.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9_2.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <ul class="member-benefits clearfix" v-if="currId ==2">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy4_zj.png" alt="">
            <p>影视区7折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy5_zj.png" alt="">
            <p>每天免费观影10部</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7.png" alt="">
            <p>每日抽奖2次</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8_2.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9_2.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <ul class="member-benefits clearfix" v-if="currId ==3">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy4_bj.png" alt="">
            <p>影视区6折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy5_bj.png" alt="">
            <p>每天免费观影20部</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7.png" alt="">
            <p>每日抽奖3次</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9_2.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
      </ul>
        <ul class="member-benefits clearfix" v-if="currId ==4">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy4_hj.png" alt="">
            <p>影视区3折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy5_hj.png" alt="">
            <p>每天免费观影50部</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7.png" alt="">
            <p>每日抽奖5次</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10_2.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <ul class="member-benefits clearfix" v-if="currId ==5">
            <li>
              <img src="../../assets/imgaes/vip/qy_1.png" alt="">
              <p>会员专属标识</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_2.png" alt="">
              <p>贵族席位</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_3.png" alt="">
              <p>专属礼物</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy4_gj.png" alt="">
              <p>影视区1折</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy5_gj.png" alt="">
              <p>每天免费观影100部</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_6.png" alt="">
              <p>进场特殊欢迎语</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_7.png" alt="">
              <p>每日抽奖7次</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_8.png" alt="">
              <p>进场坐骑</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_9.png" alt="">
              <p>贵族弹幕</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_10.png" alt="">
              <p>专属表情包</p>
            </li>
            <li>
              <img src="../../assets/imgaes/vip/qy_11_2.png" alt="">
              <p>推荐主播上热门</p>
            </li>
        </ul>
        <ul class="member-benefits clearfix" v-if="currId == 6">
          <li>
            <img src="../../assets/imgaes/vip/qy_1.png" alt="">
            <p>会员专属标识</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_2.png" alt="">
            <p>贵族席位</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_3.png" alt="">
            <p>专属礼物</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_4.png" alt="">
            <p>影视区0折</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_5.png" alt="">
            <p>影视区无限制</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_6.png" alt="">
            <p>进场特殊欢迎语</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_7.png" alt="">
            <p>每日抽奖10次</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_8.png" alt="">
            <p>进场坐骑</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_9.png" alt="">
            <p>贵族弹幕</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_10.png" alt="">
            <p>专属表情包</p>
          </li>
          <li>
            <img src="../../assets/imgaes/vip/qy_11.png" alt="">
            <p>推荐主播上热门</p>
          </li>
        </ul>
        <h3 class="title"><span class="line"></span> 会员专属礼包 <span class="line"></span></h3>
        <ul class="gift-pack clearfix">
          <li>
            <div class="bg">
              <span class="number">10</span>
              <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
              <span class="zs">钻石</span>
            </div>
            <p>骑士</p>
          </li>
          <li>
            <div class="bg">
              <span class="number">100</span>
              <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
              <span class="zs">钻石</span>
            </div>
            <p>男爵</p>
          </li>
          <li>
            <div class="bg">
              <span class="number">200</span>
              <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
              <span class="zs">钻石</span>
            </div>
            <p>子爵</p>
          </li>
          <li>
            <div class="bg">
              <span class="number">500</span>
              <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
              <span class="zs">钻石</span>
            </div>
            <p>伯爵</p>
          </li>
        </ul>
        <ul class="gift-pack2 clearfix">
            <li>
              <el-carousel indicator-position="outside" arrow="none"  height="231px">
                <el-carousel-item v-for="(item,index) in 2" :key="index">
                  <div class="bg" v-if="index == 0">
                    <span class="number">5000</span>
                    <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
                    <span class="zs">钻石</span>
                  </div>
                  <div class="bg" v-if="index == 1">
                    <img  src="../../assets/imgaes/vip/lb_2.png" alt="">
                    <span class="zs">Airpods Pro</span>
                  </div>
                </el-carousel-item>
              </el-carousel>
              <p>侯爵</p>
            </li>
          <li>
            <el-carousel indicator-position="outside" arrow="none"  height="231px">
              <el-carousel-item v-for="(item,index) in 2" :key="index">
                <div class="bg" v-if="index == 0">
                  <span class="number">5000</span>
                  <img  src="../../assets/imgaes/vip/lb_zs.png" alt="">
                  <span class="zs">钻石</span>
                </div>
                <div class="bg" v-if="index == 1">
                  <img  src="../../assets/imgaes/vip/lb_3.png" alt="">
                  <span class="zs">ipad <br> pro11英寸256g</span>
                </div>
              </el-carousel-item>
            </el-carousel>
            <p>公爵</p>
          </li>
          <li>
            <el-carousel indicator-position="outside" arrow="none"  height="231px">
              <el-carousel-item v-for="(item,index) in 3" :key="index">
                <div class="bg" v-if="index == 0">
                  <img  src="../../assets/imgaes/vip/lb_4.png" alt="">
                  <span class="zs">iPhone 11<br> 专业版256g</span>
                </div>
                <div class="bg" v-if="index == 1">
                  <img  src="../../assets/imgaes/vip/lb_4.png" alt="">
                  <span class="zs">iPhone 11<br> 专业版256g</span>
                </div>
              </el-carousel-item>
            </el-carousel>
            <p>国王</p>
          </li>
        </ul>
        <dl class="rule-box">
          <dt><span class="line"></span> 活动规则和条款 <span class="line"></span></dt>
          <dd><span class="icon"></span>晋级标准：会员的累计余额兑换钻石达到相应的级别要求，即可晋级相应的贵族等级；</dd>
          <dd><span class="icon"></span>保级要求：会员在达到某贵族等级后，30天内需打赏或经验完成保级要求，如再次期间完成晋升,
            <p>保级要求从新按照当前等级计算；</p>
          </dd>
          <dd><span class="icon"></span>每日抽奖：会员在当日北京时间（00：00-24：00）内可参与贵族等级对应次数的抽奖活动，
            <p>抽奖次数不累计，过期予以作废；</p>
          </dd>
          <dd><span class="icon"></span>专属礼物：会员达到某贵族等级后，即可联系客户获取相对应的专属礼物，每个贵族等级礼物
            <p>只可以领取一次；</p>
          </dd>
          <dd><span class="icon"></span>平台保留对活动的修改，停止及最终解释权</dd>
        </dl>
    </div>
  </div>
</template>

<script>
export default {
name: "vip",
  data(){
    return{
      currId:0,
      title:'骑士',
      isTips:false,
      isTips0:false,
      isTips1:false,
      isTips2:false,
      isTips3:false,
      isTips4:false,
      isTips5:false,
      isTips6:false,
    }
  },
  created(){
  },
  methods:{
    mouseOver(index) {// 移入
      this.isTips = true;
      /*switch(index) {
        case 0:
          this.isTips0 = true;
          console.log(this.isTips0);

          break;
        case 1:
          this.isTips1 = true;
          break;
        case 2:
          this.isTips2 = true;
          break;
        case 3:
          this.isTips3 = true;
          break;
        case 4:
          this.isTips4 = true;
          break;
        case 5:
          this.isTips5 = true;
          break;
        case 6:
          this.isTips6 = true;
          break;
      }*/
    },
    mouseLeave(index) {// 移出
      this.isTips = false;
      /*switch(index) {
        case 0:
          this.isTips0 = false;
          console.log(this.isTips0);
          break;
        case 1:
          this.isTips1 = false;
          console.log(this.isTips1);
          break;
        case 2:
          this.isTips2 = false;
          break;
        case 3:
          this.isTips3 = false;
          break;
        case 4:
          this.isTips4 = false;
          break;
        case 5:
          this.isTips5 = false;
          break;
        case 6:
          this.isTips6 = false;
          break;
      }*/

    },
    handChange(index){
      console.log(index)
      switch(index) {
        case 0:
          this.title = '骑士';
          this.currId = 0;
          break;
        case 1:
          this.title = '男爵';
          this.currId = 1;
          break;
        case 2:
          this.title = '子爵';
          this.currId = 2;
          break;
        case 3:
          this.title = '伯爵';
          this.currId = 3;
          break;
        case 4:
          this.title = '候爵';
          this.currId = 4;
          break;
        case 5:
          this.title = '公爵';
          this.currId = 5;
          break;
        case 6:
          this.title = '国王';
          this.currId = 6;
          break;
      }

    }
  }
}
</script>

<style scoped lang=less>
  .banner{
    width:100%;
    height: 560px;
    background: url("../../assets/imgaes/vip/banner.png") no-repeat center;
    background-size: 100% 100%;
    padding-top: 190px;
    .car-box{
      width:1200px;
      margin: 0 auto;
      .item1{
        background: url("../../assets/imgaes/vip/lv1.png") no-repeat center;
        background-size: 100% 100%;
        &.is-active{
          height: 318px;
          background: url("../../assets/imgaes/vip/lv1_1.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .item2{
        background: url("../../assets/imgaes/vip/lv2.png") no-repeat center;
        background-size: 100% 100%;
      }
      .item3{
        background: url("../../assets/imgaes/vip/lv3.png") no-repeat center;
        background-size: 100% 100%;
      }
      .item4{
        background: url("../../assets/imgaes/vip/lv4.png") no-repeat center;
        background-size: 100% 100%;
      }
      .item5{
        background: url("../../assets/imgaes/vip/lv5.png") no-repeat center;
        background-size: 100% 100%;
      }
      .item6{
        background: url("../../assets/imgaes/vip/lv6.png") no-repeat center;
        background-size: 100% 100%;
      }
      .item7 {
        background: url("../../assets/imgaes/vip/lv7.png") no-repeat center;
        background-size: 100% 100%;
      }
      .bar{
        height: 25px;
        line-height: 10px;
        margin-top: 180px;
        margin-left: 65px;
        span{
          display: inline-block;
          color: #333;
          line-height: 10px;
          &.bar-jdt{
            display: block;
            width: 319px;
            height: 10px;
            text-align: center;
            position: relative;
            border-radius: 5px;
            background:#fff;
            z-index: 2;
          }
          .bar-jdtbj{
            display: inline-block;
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 9px;
            width: 0%;
            height: 10px;
            z-index: 1;
            &.bg1{
              background:#91634C;
            }
            &.bg2{
              background:#436B7D;
            }
            &.bg3{
              background:#CA691F;
            }
            &.bg4{
              background:#333399;
            }
            &.bg5{
                background:#2A5EE9;
              }
            &.bg6{
              background:#7312C7;
            }
            &.bg7{
              background:#CE1313;
            }
          }
        }
        .bar-bli{
          display: block;
          width: 319px;
          font-size: 20px;
          text-align: center;
          padding-top: 7px;
        }
      }
      .info{
        width: 350px;
        font-size: 18px;
        color: #666;
        padding-top: 20px;
        margin-left: 161px;
        position: relative;
        p{
          line-height: 30px;
          &:nth-of-type(2){
            text-align: right;
            padding-right: 67px;
          }
        }
        .icon{
          width: 21px;
          height: 21px;
          line-height: 21px;
          font-style: 'PingFang-SC-Bold';
          font-size: 16px;
          color: #fff;
          text-align: center;
          background: #666;
          border-radius: 50%;
          position: absolute;
          right: 35px;
          top: 35px;
        }
        .text{
          width: 305px;
          height: 31px;
          line-height: 31px;
          font-size: 18px;
          color: #000;
          background: #FFFFFF;
          border: 2px solid #471E6C;
          position: absolute;
          z-index: 1;
          bottom: 0;
        }
      }
    }
  }
  .content{
    background: #fff;
    .title{
        line-height: 34px;
        font-size: 30px;
        color: #333;
        text-align: center;
        overflow: hidden;
        padding: 54px 0 8px;
        .line{
          display: inline-block;
          width: 167px;
          height: 4px;
          background: url("../../assets/imgaes/vip/line.png") no-repeat center ;
          vertical-align: middle;
          &:nth-of-type(2){
            transform:rotate(180deg);
            -ms-transform:rotate(180deg); /* Internet Explorer */
            -moz-transform:rotate(180deg); /* Firefox */
            -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
            -o-transform:rotate(180deg); /* Opera */
          }
        }

    }
    .member-benefits{
      li{
        text-align: center;
        float: left;
        margin-right: 85px;
        margin-top: 43px;
        p{
          font-size: 18px;
          color: #333;
          padding-top: 13px;
        }
        &:first-of-type{
          margin-left: 129px;
        }
        &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3),&:nth-of-type(4){
          margin-right: 98px;
        }
        &:nth-of-type(5){
          margin-right: 0;
        }
        &:nth-of-type(6){
          margin-left: 45px;
        }

        &:nth-of-type(11){
          margin-right: 0;
        }
      }
    }
    .gift-pack{
      padding-left: 94px;
      li{
        width: 200px;
        margin-top: 44px;
        margin-right: 74px;
        float: left;
        .bg{
          width: 200px;
          height: 231px;
          background: url("../../assets/imgaes/vip/lb_1.png") no-repeat center top;
          background-size: 100% 100%;
          text-align: center;
          overflow: hidden;
          padding-top: 33px;
          >span{
            display: block;
            &.number{
              line-height: 35px;
              font-size: 46px;
              color: #666;
              margin-bottom: 8px;
            }
            &.zs{
              line-height: 30px;
              font-size: 30.61px;
              color: #245CC8;
            }
          }
        }
        p{
          font-size: 21.19px;
          color: #666;
          text-align: center;
          padding-top: 14px;
        }
      }
    }
    .gift-pack2{
      padding-left: 230px;
      li{
        width: 200px;
        margin-top: 44px;
        margin-right: 74px;
        float: left;
        p{
          font-size: 21.19px;
          color: #666;
          text-align: center;
          padding-top: 14px;
        }
      }
      .el-carousel__item{
        width: 200px;
        height: 231px;
        background: url("../../assets/imgaes/vip/lb_1.png") no-repeat center top;
        background-size: 100% 100%;
        text-align: center;
        overflow: hidden;
        padding-top: 13px;
          span{
            display: block;
            &.number{
              line-height: 35px;
              font-size: 46px;
              color: #666;
              margin-bottom: 8px;
            }
            &.zs{
              line-height: 25px;
              font-size: 21px;
              color: #333;
              padding-top: 10px;
            }
          }
      }
      .el-carousel__indicators--outside{
        position: absolute;
        top: 230px;
      }
    }
    .rule-box{
      padding-bottom: 56px;
      dt{
        line-height: 34px;
        font-weight: bold;
        font-size: 30px;
        color: #333;
        text-align: center;
        padding: 77px 0 50px 0;
        .line{
          display: inline-block;
          width: 60px;
          height: 34px;
          background: url("../../assets/imgaes/vip/icon_1.png") no-repeat;
          background-size: 100% 100%;

          vertical-align: middle;
          &:nth-of-type(2){
            background: url("../../assets/imgaes/vip/icon_2.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      dd{
        line-height: 30px;
        font-size: 20px;
        color: #333;
        padding-left: 153px;
        padding-bottom: 10px;
        .icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          background: #7B6D56;
          margin-right: 20px;
          transform: rotate(45deg);
        }
        p{
          padding-left: 140px;
        }
      }
    }
  }
</style>