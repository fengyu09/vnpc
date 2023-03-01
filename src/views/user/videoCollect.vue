<template>
    <div class="collect">
    <div class="txhead">
      <!-- <div @click="changeMode(1)" :class="{active:mode==1}">
        <span>mua</span>
      </div> -->
      <div @click="changeMode(1)" :class="[{active:mode==1},{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('videoCollect.text[0]')}}</span>
      </div>
       <div @click="changeMode(2)" :class="[{active:mode==2},{'pink-active':skin==1 },{'blue-active':skin==2},{'green-active':skin==3}]">
        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('videoCollect.text[1]')}}</span>
      </div>
    </div>
    <el-scrollbar style="height:680px">
    <div class="collect-content" v-if="mode != 2">
        <div class="video-list  clearfix" v-for="(item,index) in collectList" :key="index"  :data-id="item.moviesid">
                    <!-- <p class="tips" v-if="isLoading">loading...</p> -->
                    <div class="video-item fl">
                        <div class="item-pic" @click="goPlay(item)">
                            <img class="pic" v-lazy="item.cover">
                            <div class="video-describe">
                                <div class="fl">
                                    <img class="fl-icon" src="../../assets/imgaes/video/icon_3.png" alt="">
                                    <span class="numer">{{item.reads}}</span>
                                </div>
                                <div class="fr duration">{{item.play_time | filterSecond}}</div>
                            </div>
                            <div class="video-play"><span class="play-icon"></span></div>
                        </div>
                        <div class="item-name" >{{item.title}} </div>
                       <div class="like_icon" @click="scFuc(item.moviesid,index)" v-if="mode == 0"> 
                            <img  src="../../assets/imgaes/video/icon_6.png" alt="" srcset="">
                       </div>
                    </div>
        </div>
        <p v-if="!collectList.length">{{$t('videoCollect.text[2]')}}</p>
    </div>
    <div class="collect-content" v-if="mode == 2">
        <div class="video-list  clearfix" v-for="item,index in collectList" :key="index">
                    <!-- <p class="tips" v-if="isLoading">loading...</p> -->
                    <div class="video-item fl">
                        <div class="item-pic"  @click="goPlay(item)">
                            <img class="pic" v-lazy="item.cover">
                            <!-- <img class="pic" src="../../assets/imgaes/video/pic_1.png"> -->
                            <div class="video-describe">
                                <div class="fl">
                                    <img class="fl-icon" src="../../assets/imgaes/video/icon_3.png" alt="">
                                    <span class="numer">{{item.reads}}</span>
                                </div>
                                <div class="fr duration">{{item.play_time | filterSecond}}</div>
                            </div>
                            <div class="video-play"><span class="play-icon"></span></div>
                        </div>
                        <div class="item-name" >{{item.title}} </div>
                    </div>
        </div>
        <p v-if="!playList.length">{{$t('videoCollect.text[2]')}}</p>
    </div>
    </el-scrollbar>
    </div>
</template>
<script>
import {  mapState } from "vuex";
export default {
    name:"videoCollect",
    data(){
        return{
            mode:1,
            page:1,
            num:1000,
            playList:[],
            collectList:[],
            isCollect:0,


        }
    },

    created(){
      this.getcollectList(5);
    //   this.getPlayList();
    },
    methods:{
      getcollectList(type){
          this.$http.get('/api/live/movie/movie_list_type/',{params:{
              list_type:type ,
              page:this.page,
              limit:this.num
          }}).then(res=>{
            //   console.log(type)
              this.collectList = res.data.data||[];
          })
      },
      getPlayList(type){
          this.$http.get('/api/live/movie/movie_list_type/',{
              list_type:type ,
              page:this.page,
              limit:this.num
          }).then(res=>{
            //   console.log(res)
              this.playList = res.data.data;
          })
      },
      changeMode(index){
        this.mode = index;
        if(index == 0){
            this.getcollectList(4);
        }
        if(index == 1){
            this.getcollectList(5);
        }
        if(index == 2){
            this.getcollectList(1);
        }
      },
      goPlay(v){ //跳转页面
        window.open('/videoPlay/' + v.movie_id)
      },
            //收藏
        async scFuc(id,index){
            if (!this.$store.state.codeToken){
                alertComfirm({msg:this.$t('videoPlay.text[8]')}, ()=> {
                    this.$store.commit('SETLOGIN',true);
                })
                return;
            }
            let li = document.querySelectorAll('.collect-content .video-list');
            let d = this.globalPpproach.checkIsEncrypt({
                movie:id //影片id
            });
            let res = await this.$http.post('/video/collect', {
                movie:id //影片id
            });
            if (res && res.data.code == 1) {
                //改变状态
                if(res.data.data.iscollect == 1){
                    // this.isCollect = 1 ;
                    this.$message({
                        message: res.data.msg,
                        type: "success",
                    });
                }else{
                    // this.isCollect = 0 ;
                    this.collectList = this.collectList.filter((item, i) => {
                        return item.moviesid != li[index].dataset.id;       
                    });
                    this.$message({
                        message: res.data.msg,
                        type: "warning",
                    });
                }


            }else{
                this.$message({
                    message: res.data.msg,
                    type: "warning",
                });
            }

        },
    },
         computed: {
        ...mapState(["skin"]),
    },
}
</script>
<style lang="less" scoped>
    .collect{
        .txhead {
    display: flex;
    border-bottom: 1px solid #f4f5f8;

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
      color: #1486FF;
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
  .collect-content{
      display: flex;
      flex-wrap: wrap;
      >p{
        text-align:center;
        width:100%;
        line-height:200px;
      }
 }
  .video-list{
                height: 297px;
                background: #fff;
                padding-left: 20px;
                overflow: hidden;
                .video-item{
                    position: relative;;
                    width: 276px;
                    margin-right: 18px;
                    padding:  20px 0 20px;
                    position: relative;
                    &:last-of-type{
                        margin-right: 0;
                    }
                    .item-pic{
                        width: 275px;
                        height: 220px;
                        -webkit-border-radius: 5px;
                        -moz-border-radius: 5px;
                        border-radius: 5px;
                        overflow: hidden;
                        border:1px solid #fff;
                        position: relative;
                        cursor: pointer;
                        background:#f5f5f5;
                        overflow: hidden;
                        &:hover{
                            border-color:  #FF1C30;
                            .pic{

                                -webkit-transform: scale(1.1);
                                transform: scale(1.1);
                            }
                            .video-play{
                                display: block;
                            }
                        }
                        .pic{
                            width: 150%;
                            /*position: absolute;*/
                            /*left: 50%;*/
                            /*transform: translateX(-50%);*/
                            /*height: 220px;*/
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            border-radius: 5px;
                            transition: all 0.1s ease-out;
                            -webkit-transition: all 0.1s ease-out;
                        }
                        .video-describe{
                            width: 100%;
                            padding: 0 10px;
                            position: absolute;
                            bottom: 10px;
                            left:0px;
                            .fl{
                                line-height: 33px;
                                .fl-icon{
                                    margin-right: 20px;
                                    float: left;
                                }
                                .numer{
                                    font-size: 18px;
                                    color: #333;
                                    float: left;
                                }
                            }
                            .duration{
                                width: 70px;
                                line-height: 25px;
                                font-size: 14px;
                                color: #fff;
                                background: #858585;
                                opacity:0.88;
                                text-align: center;
                                -webkit-border-radius: 5px;
                                -moz-border-radius: 5px;
                                border-radius: 5px;
                                margin-top: 5px;
                            }
                        }
                        .video-play{
                            display: none;
                            width: 100%;
                            height: 100%;
                            -webkit-border-radius: 5px;
                            -moz-border-radius: 5px;
                            border-radius: 5px;
                            background:rgba(51,51,51,1);
                            opacity:0.4;
                            position: absolute;
                            top: 0px;
                            left: 0;
                            .play-icon{
                                ontent: "";
                                width: 44px;
                                height: 44px;
                                background: url("../../assets/imgaes/video/play_1.png") no-repeat;
                                position: absolute;
                                top: 89px;
                                left: 50%;
                                transform: translateX(-50%);
                                -webkit-transform: translateX(-50%);
                            }

                        }
                    }
                    .item-name{
                        width: 95%;
                        font-weight: bold;
                        font-size: 18px;
                        color: #333;
                        padding: 20px 0;
                        padding-right: 20px;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }
                    .like_icon{
                        position: absolute;
                        bottom: 36px;
                        right: 0;
                        cursor:pointer;
                    }

                }
            }
        
    }
</style>