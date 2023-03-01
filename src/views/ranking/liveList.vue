<template>
    <div class="live-list w clearfix">
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">人气榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType1 == 1 ? 'active' : ''" @click="tabType1(1)">周榜</span>
                    <span :class="currType1 == 2 ? 'active' : ''" @click="tabType1(2)">月榜</span>
                    <span :class="currType1 == 3 ? 'active' : ''" @click="tabType1(3)">总榜</span>
                </div>
                <div class="user-info"  v-if="popRank.length != 0">
                    <div class="pic">
                        <img class="img" v-if="popRank[0].avatar != undefined"  :src="popRank[0].avatar" alt="">
                        <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                        <img class="bg" src="../../assets/imgaes/ranking/pic_bg.png" alt="">
                    </div>
                    <p class="name">
                      {{popRank[0].nickname}}
                      <!--<img src="../../assets/imgaes/ranking/VIP-lv7.2.png" alt="">-->
                    </p>
                    <p class="visits">{{popRank[0].count}}访问</p>
                </div>
                <ul class="list clearfix" >
                    <li v-for="(item,index) in popRank" v-if="index != 0">
                        <div class="pic fl" v-if="index <=2">
                            <img class="img" v-if="item.avatar != undefined"  :src="item.avatar" alt="">
                            <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                            <img class="bg" v-if="index == 1" src="../../assets/imgaes/ranking/pic_bg2.png" alt="">
                            <img class="bg" v-if="index == 2"  src="../../assets/imgaes/ranking/pic_bg3.png" alt="">
                        </div>
                        <div class="pic fl" v-if="index > 2">{{item.no}}</div>
                        <span class="name fl">{{item.nickname}}</span>
                        <span class="visits fr">{{item.count}}访问</span>
                    </li>
                </ul>
                <p v-if="popRank.length == 0"  style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
            </div>
        </div>
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">收入榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType2 == 1 ? 'active' : ''" @click="tabType2(1)">周榜</span>
                    <span :class="currType2 == 2 ? 'active' : ''" @click="tabType2(2)">月榜</span>
                    <span :class="currType2 == 3 ? 'active' : ''" @click="tabType2(3)">总榜</span>
                </div>
                <div class="user-info"  v-if="popRank.length != 0">
                    <div class="pic">
                        <img class="img" v-if="incomeRank[0].avatar != undefined"  :src="incomeRank[0].avatar" alt="">
                        <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                        <img class="bg" src="../../assets/imgaes/ranking/pic_bg.png" alt="">
                    </div>
                    <p class="name">{{incomeRank[0].nickname}}</p>
                    <p class="visits">{{incomeRank[0].count}}钻石</p>
                </div>
                <ul class="list clearfix">
                    <li v-for="(item,index) in incomeRank" v-if="index != 0">
                        <div class="pic fl"  v-if="index <=2">
                          <img class="img" v-if="item.avatar != undefined"  :src="item.avatar" alt="">
                          <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                          <img class="bg" v-if="index == 1" src="../../assets/imgaes/ranking/pic_bg2.png" alt="">
                          <img class="bg" v-if="index == 2"  src="../../assets/imgaes/ranking/pic_bg3.png" alt="">
                        </div>
                        <div class="pic fl" v-if="index > 2">{{item.no}}</div>
                        <span class="name fl">{{item.nickname}}</span>
                        <span class="visits fr">{{item.count}}钻石</span>
                    </li>
                    <!--<li>
                        <div class="pic fl">
                            <img class="img" src="../../assets/imgaes/ranking/111.png" alt="">
                            <img class="bg" src="../../assets/imgaes/ranking/pic_bg3.png" alt="">
                        </div>
                        <span class="name fl">Jostre</span>
                        <span class="visits fr">15258501钻石</span>
                    </li>
                    <li>
                        <span class="order fl">4</span>
                        <span class="name fl">Jostre</span>
                        <span class="visits fr">15258501钻石</span>
                    </li>-->
                </ul>
                <p v-if="incomeRank.length == 0"  style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
            </div>
        </div>
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">贡献榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType3 == 1 ? 'active' : ''" @click="tabType3(1)">周榜</span>
                    <span :class="currType3 == 2 ? 'active' : ''" @click="tabType3(2)">月榜</span>
                    <span :class="currType3 == 3 ? 'active' : ''" @click="tabType3(3)">总榜</span>
                </div>
                <div class="user-info"  v-if="popRank.length != 0">
                    <div class="pic">
                      <img class="img" v-if="devoteRank[0].avatar != undefined"  :src="devoteRank[0].avatar" alt="">
                      <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                      <img class="bg" src="../../assets/imgaes/ranking/pic_bg.png" alt="">
                    </div>
                    <p class="name">
                      {{devoteRank[0].nickname}}
                      <span class="level" :class="'level-'+ devoteRank[0].noble " v-if="devoteRank[0].noble > 0"></span>
                    </p>
                    <p class="visits">{{devoteRank[0].count}}钻石</p>
                </div>
                <ul class="list clearfix">
                    <li v-for="(item,index) in devoteRank" v-if="index != 0">
                      <div class="pic fl"  v-if="index <=2">
                        <img class="img" v-if="item.avatar != undefined"  :src="item.avatar" alt="">
                        <img class="img" v-else src="../../assets/imgaes/ranking/111.png" alt="">
                        <img class="bg" v-if="index == 1" src="../../assets/imgaes/ranking/pic_bg2.png" alt="">
                        <img class="bg" v-if="index == 2"  src="../../assets/imgaes/ranking/pic_bg3.png" alt="">
                      </div>
                      <div class="pic fl" v-if="index > 2">{{item.no}}</div>
                      <span class="name fl">{{item.nickname}}</span>
                      <span class="level" :class="'level-'+ item.noble " v-if="item.noble > 0"></span>
                      <span class="visits fr">{{item.count}}钻石</span>
                    </li>
                    <!--<li>
                        <div class="pic fl">
                            <img class="img" src="../../assets/imgaes/ranking/111.png" alt="">
                            <img class="bg" src="../../assets/imgaes/ranking/pic_bg2.png" alt="">
                        </div>
                        <span class="name fl">Jostre</span>
                        <span class="level"><img src="../../assets/imgaes/ranking/VIP-lv6.2.png" alt=""></span>
                        <span class="visits fr">1528501钻石</span>
                    </li>-->
                </ul>
                <p v-if="devoteRank.length == 0"  style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                currType1:1,
                currType2:1,
                currType3:1,
                anchorRank:{}, //直播榜
                popRank:{}, //人气榜
                incomeRank:{}, //收入榜
                devoteRank:{}, //贡献榜
            }
        },
        created() {
          this.getAnchorRank();
        },
        methods:{
            tabType1:function (index) {
                this.currType1 = index;
                if(index == 1){
                  this.popRank = this.anchorRank.pop_rank.week;
                }else if(index == 2){
                  this.popRank = this.anchorRank.pop_rank.month;
                }else if(index == 3){
                  this.popRank = this.anchorRank.pop_rank.all;
                }
            },
            tabType2:function (index) {
                this.currType2 = index;
                if(index == 1){
                  this.incomeRank =  this.anchorRank.income_rank.week;
                }else if(index == 2){
                  this.incomeRank =  this.anchorRank.income_rank.month;
                }else if(index == 3){
                  this.incomeRank =  this.anchorRank.income_rank.all;
                }

            },
            tabType3:function (index) {
                this.currType3 = index;
              if(index == 1){
                this.devoteRank =  this.anchorRank.devote_rank.week;
              }else if(index == 2){
                this.devoteRank =  this.anchorRank.devote_rank.month;
              }else if(index == 3){
                this.devoteRank =  this.anchorRank.devote_rank.all;
              }
            },
          async getAnchorRank() {
            let res = await this.$http.get('/api/v2/live/anchor_rank/');
            if (res && res.data.code == 1) {
              //console.log(res.data.data);
              this.anchorRank = res.data.data;
              this.popRank =  this.anchorRank.pop_rank.week;
              this.incomeRank =  this.anchorRank.income_rank.week;
              this.devoteRank =  this.anchorRank.devote_rank.week;
              //console.log(this.anchorRank.pop_rank);
            }
          },
        }
    }
</script>

<style lang="less" scoped>
    .white{
        min-height: 258px;
        background: #fff;
    }
   .area-box{
       width: 380px;
       margin-right: 30px;
       &:last-of-type{
           margin-right:0;
       }
        >h3{
          line-height: 20px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            padding: 20px 0 10px 5px;
          img{
              margin-right:5px;
              margin-top:-5px;
          }
        }
        >div{
           -webkit-border-radius: 4px;
           -moz-border-radius: 4px;
           border-radius: 4px;
        }
       .tab-title{
           height: 40px;
           border-bottom:1px solid #F9F9F9;
           padding-top: 12px;
           margin: 0 10px;
           span{
               font-size: 14px;
               color: #656565;
               padding: 0 42px 10px;
               cursor: pointer;
               &.active{
                   color: #FF3131;
                   border-bottom:2px solid #FF312F;
               }
           }

       }
       .user-info{
           padding-bottom: 20px;
           .pic{
               width: 258px;
               height: 108px;
               position: relative;
               margin: 30px auto 0;
               .img{
                   width: 90px;
                   height: 90px;
                   -webkit-border-radius: 50%;
                   -moz-border-radius: 50%;
                   border-radius: 50%;
                   position: absolute;
                   left: 35%;
                   top: 11px;
               }
               .bg{
                   position: absolute;
                   z-index: 1;
               }
           }
           p{
                height: 30px;
               text-align: center;
               font-size: 14px;
               color: #333;
               padding-top: 15px;
               &.visits{
                   color: #999;
               }
           }
       }
       .list{
           padding: 0 10px;
           li{
               line-height: 48px;
               overflow: hidden;
               border-top:1px solid #F9F9F9;
               padding: 6px 0;
               .pic{
                   width: 54px;
                   height: 48px;
                    font-size: 16px;
                    color: #666;
                    text-align: center;
                   margin-right: 20px;
                   position: relative;
                   .img{
                       width: 39px;
                       height: 39px;
                       -webkit-border-radius: 50%;
                       -moz-border-radius: 50%;
                       border-radius: 50%;
                       position: absolute;
                       left: 22%;
                       top: 5px;
                   }
                   .bg{
                       position: absolute;
                       left: 0;
                       z-index: 1;
                   }
               }
               >span{
                   &.order{
                       width: 54px;
                       font-size: 16px;
                       color: #656565;
                       text-align: center;
                   }
                   &.name{
                       max-width:80px;
                       font-size: 18px;
                       color: #333;
                       overflow: hidden;
                       text-overflow:ellipsis;
                       white-space: nowrap;
                   }
                   &.visits{
                       font-size: 14px;
                       color: #999;
                       padding-right: 10px;
                   }
               }
           }


       }
     .level{
       display: inline-block;
       width: 76px;
       min-height: 24px;
       margin-left: 7px;
       vertical-align: middle;
       &.level-1{
         background: url("../../assets/imgaes/ranking/VIP-lv1.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-2{
         background: url("../../assets/imgaes/ranking/VIP-lv2.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-3{
         background: url("../../assets/imgaes/ranking/VIP-lv3.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-4{
         background: url("../../assets/imgaes/ranking/VIP-lv4.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-5{
         background: url("../../assets/imgaes/ranking/VIP-lv5.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-6{
         background: url("../../assets/imgaes/ranking/VIP-lv6.2.png") no-repeat center;
         background-size: 100% 100%;
       }
       &.level-7{
         background: url("../../assets/imgaes/ranking/VIP-lv7.2.png") no-repeat center;
         background-size: 100% 100%;
       }
     }
   }
</style>