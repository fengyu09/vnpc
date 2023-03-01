<template>
    <div class="live-list w clearfix">
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">热门榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType1 == 1 ? 'active' : ''" @click="tabType1(1)">日榜</span>
                    <span :class="currType1 == 2 ? 'active' : ''" @click="tabType1(2)">周榜</span>
                    <span :class="currType1 == 3 ? 'active' : ''" @click="tabType1(3)">月榜</span>
                </div>
                <ul class="movie-list clearfix">
                    <li v-for="(item,index) in hotRank" :key="index"  v-if="index <12"  @click="goPlay(item)">
                      <div class="pic fl">
                        <img class="img" v-lazy="item.cover" :src="item.cover"  alt />
                        <img class="lv" v-if="index == 0" src="../../assets/imgaes/ranking/lv1.png" alt="">
                        <img class="lv" v-if="index == 1" src="../../assets/imgaes/ranking/lv2.png" alt="">
                        <img class="lv" v-if="index == 2" src="../../assets/imgaes/ranking/lv3.png" alt="">
                      </div>
                      <div class="li-r fl">
                        <span class="name">{{item.title}}</span>
                        <span class="tag"> <font class="fl">：</font><strong class="fl">{{item.tag}}</strong></span>
                        <span class="visits">{{item.watchmum}}人喜欢</span>
                      </div>
                    </li>
                    <!--<li>
                        <div class="pic fl">
                            <img class="img" src="../../assets/imgaes/ranking/pic.png" alt="">
                            <img class="lv" src="../../assets/imgaes/ranking/lv1.png" alt="">
                        </div>
                        <div class="li-r fl">
                            <span class="name">美女背着闺蜜和她美女背着闺蜜和她男友偷情不停...</span>
                            <span class="tag">Nhãn：<strong>国产</strong></span>
                            <span class="visits">18.8万人喜欢</span>
                        </div>
                    </li>-->
                </ul>
                <p v-if="hotRank.length == 0" style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
            </div>
        </div>
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">好评榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType2 == 1 ? 'active' : ''" @click="tabType2(1)">日榜</span>
                    <span :class="currType2 == 2 ? 'active' : ''" @click="tabType2(2)">周榜</span>
                    <span :class="currType2 == 3 ? 'active' : ''" @click="tabType2(3)">月榜</span>
                </div>
                <ul class="movie-list clearfix">
                    <li v-for="(item,index) in likeRank" :key="index" v-if="index <12"  @click="goPlay(item)">
                      <div class="pic fl">
                        <img class="img" v-lazy="item.cover" :src="item.cover"  alt />
                        <img class="lv" v-if="index == 0" src="../../assets/imgaes/ranking/lv1.png" alt="">
                        <img class="lv" v-if="index == 1" src="../../assets/imgaes/ranking/lv2.png" alt="">
                        <img class="lv" v-if="index == 2" src="../../assets/imgaes/ranking/lv3.png" alt="">
                      </div>
                      <div class="li-r fl">
                        <span class="name">{{item.title}}</span>
                        <span class="tag"> <font class="fl">Nhãn：</font><strong class="fl">{{item.tag}}</strong></span>
                        <span class="visits">{{item.praisenum}}人喜欢</span>
                      </div>
                    </li>
                    <!--<li>
                        <div class="pic fl">
                            <img class="img" src="../../assets/imgaes/ranking/pic.png" alt="">
                            <img class="lv" src="../../assets/imgaes/ranking/lv1.png" alt="">
                        </div>
                        <div class="li-r fl">
                            <span class="name">美女背着闺蜜和她美女背着闺蜜和她男友偷情不停...</span>
                            <span class="tag">Nhãn：<strong>国产</strong></span>
                            <span class="visits">18.8万人喜欢</span>
                        </div>
                    </li>-->
                </ul>
                <p v-if="likeRank.length == 0" style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
            </div>
        </div>
        <div class="area-box fl">
            <h3><img src="../../assets/imgaes/ranking/round.png" alt="">收藏榜</h3>
            <div class="white">
                <div class="tab-title">
                    <span :class="currType3 == 1 ? 'active' : ''" @click="tabType3(1)">日榜</span>
                    <span :class="currType3 == 2 ? 'active' : ''" @click="tabType3(2)">周榜</span>
                    <span :class="currType3 == 3 ? 'active' : ''" @click="tabType3(3)">月榜</span>
                </div>
                <ul class="movie-list clearfix">
                    <li v-for="(item,index) in collectRank" :key="index" v-if="index <12"  @click="goPlay(item)">
                        <div class="pic fl">
                            <img class="img" v-lazy="item.cover" :src="item.cover"  alt />
                            <img class="lv" v-if="index == 0" src="../../assets/imgaes/ranking/lv1.png" alt="">
                            <img class="lv" v-if="index == 1" src="../../assets/imgaes/ranking/lv2.png" alt="">
                            <img class="lv" v-if="index == 2" src="../../assets/imgaes/ranking/lv3.png" alt="">
                        </div>
                        <div class="li-r fl">
                            <span class="name">{{item.title}}</span>
                            <span class="tag"> <font class="fl">Nhãn：</font><strong class="fl">{{item.tag}}</strong></span>
                            <span class="visits">{{item.collectnum}}人收藏</span>
                        </div>
                    </li>
                    <!--<li>
                        <div class="pic fl">
                            <img class="img" src="../../assets/imgaes/ranking/pic.png" alt="">
                            <img class="lv" src="../../assets/imgaes/ranking/lv2.png" alt="">
                        </div>
                        <div class="li-r fl">
                            <span class="name">围裙女小女仆蕾丝丁裤用棒棒按...</span>
                            <span class="tag">Nhãn：<strong>韩国无码</strong></span>
                            <span class="visits">18.8万人喜收藏</span>
                        </div>
                    </li>-->
                </ul>
                <p v-if="collectRank.length == 0" style="font-size:20px;padding: 100px 0; text-align: center;"> nodata！</p>
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
                videoListData:{},
                hotRank:{}, //热门榜
                likeRank:{}, //好评榜
                collectRank:{}, //收藏榜
            }
        },
        created() {
          this.getVideoRank();
        },
        methods:{
            tabType1:function (index) {
                this.currType1 = index;
                if(index == 1){
                  this.hotRank = this.videoListData.hot.day;
                }else if(index == 2){
                  this.hotRank = this.videoListData.hot.week;
                }else if(index == 3){
                  this.hotRank = this.videoListData.hot.month;
                }
            },
            tabType2:function (index) {
                this.currType2 = index;
                if(index == 1){
                  this.likeRank = this.videoListData.like.day;
                }else if(index == 2){
                  this.likeRank = this.videoListData.like.week;
                }else if(index == 3){
                  this.likeRank = this.videoListData.like.month;
                }
            },
            tabType3:function (index) {
                this.currType3 = index;
                if(index == 1){
                  this.collectRank = this.videoListData.collect.day;
                }else if(index == 2){
                  this.collectRank = this.videoListData.collect.week;
                }else if(index == 3){
                  this.collectRank = this.videoListData.collect.month;
                }
            },
            async getVideoRank() {
              let res = await this.$http.get('/video/getRankList');
              if (res && res.data.code == 1) {
                console.log(res.data.data);
                this.videoListData = res.data.data;
                this.hotRank = this.videoListData.hot.day;
                this.likeRank = this.videoListData.like.day;
                this.collectRank = this.videoListData.collect.day;
              }
            },

            goPlay(v){ //跳转页面
              console.log(v);
              window.open('/videoPlay/'+v.moviesid)
              localStorage.setItem('vMess',JSON.stringify(v));
            },
        }
    }
</script>

<style lang="less" scoped>
    .white{
      min-height: 258px;
        background: #fff;
    }
    .pl205{
        padding-left: 205px;
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
                text-align: center;
                font-size: 14px;
                color: #333;
                padding-top: 15px;
                &.visits{
                    color: #999;
                }
                &.red{
                    strong{
                        font-size: 18px;
                    }
                    color: #FF3131;
                }
            }
        }
        .movie-list{
            padding: 0 10px;
            li{
                line-height: 48px;
                overflow: hidden;
                border-top:1px solid #F9F9F9;
                padding: 10px 0;
                .pic{
                    width: 160px;
                    height: 90px;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                    position: relative;
                    margin-right: 9px;
                    .img{
                        width: 160px;
                        height: 90px;
                        -webkit-border-radius: 6px;
                        -moz-border-radius: 6px;
                        border-radius: 6px;
                    }
                    .lv{
                        position: absolute;
                        z-index: 1;
                        top:5px;
                        left:5px;
                    }
                }
                .li-r{
                    width: 190px;
                }
                span{
                    display: block;
                    &.name{
                        max-width:185px;
                        height: 30px;
                        line-height: 15px;
                        font-size: 12px;
                        color: #333;
                        margin-top: 5px;
                        text-overflow: -o-ellipsis-lastline;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    &.tag{
                        line-height: 35px;
                        font-size: 12px;
                        color: #999;
                        overflow: hidden;
                        strong{
                            max-width: 140px;
                            line-height: 20px;
                            font-weight: normal;
                            font-size: 10px;
                            border:1px solid #999;
                            -webkit-border-radius: 4px;
                            -moz-border-radius: 4px;
                            border-radius: 4px;
                            padding: 0 3px;
                            margin-top: 5px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            word-break: break-all;
                        }
                    }
                    &.visits{
                        line-height: 18px;
                        font-size: 12px;
                        color: #333;
                    }
                }
            }


        }
    }
</style>