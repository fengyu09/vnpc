<template>
    <div class="video-home main clearfix">
        <ul class="video-num clearfix" :class="[{'pink-tab':skin==1},{'blue-tab':skin==2},{'green-tab':skin==3}]">
            
            <li class="fr" style="cursor: pointer;"> 
                <router-link to="/extendReport/3">
                   <i class="share-icon"></i>
                   {{$t('movie.text[2]')}}</router-link>
            </li>
            <li class="fr " style="cursor: pointer;"> <router-link to="/videoCollect"> 
            <i class="buy-icon"></i>
            {{$t('movie.text[1]')}}</router-link></li>
        </ul>
        <ul class="video-menu clearfix">
            <li class="fl first">{{$t('movie.text[0]')}}</li>
            <ul class="menu-list1 fl">
                <li class="fl" :class="[{active:menuActive1==item.typeId},{'pink-color-border':skin==1&&menuActive1==item.typeId},{'blue-color-border':skin==2&&menuActive1==item.typeId},{'green-color-border':skin==3&&menuActive1==item.typeId}]" v-for="(item,index) in videoMenu1" @click="changeMenu(item)" >{{item.name}}</li>
            </ul>
            <li class="fr search-box">
                <el-dropdown trigger="click" placement="top"> 
                    <div class="fl input-bg">
                        <input type="text" v-model="searchKey" maxlength="100" :placeholder="$t('movie.text[3]')"  >
                        <img class="icon" src="../../assets/imgaes/video/search-icon.png" alt="">
                    </div>
                    <button class="fl search-btn" @click="goSearch(searchKey)" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('movie.text[5]')}} </button>
                    <el-dropdown-menu class="video-dropdown" slot="dropdown" split-button="true"  v-show="historyList.length!=0 || historyList.length != ' '">
                        <p class="delete" @click="deleteHistory()">{{$t('movie.text[4]')}}  <img class="fr" src="../../assets/imgaes/video/delete.png" alt=""></p>
                        <el-dropdown-item v-for="(item,index) in historyList" :key="index" @click.native="goSearch(item)">
                            {{item}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
        <div class="video-banner" v-if="imgIsLoading">
            <el-carousel height="320px" v-show="menuActive1==36 && bannerList.length != 1" arrow="never" :autoplay='true' >
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <img v-lazy="item.image_url" :src="item.image_url"  @click="toBannerUtl(item.url)" style="width: 1200px;"  alt />
                </el-carousel-item>
            </el-carousel>
            <el-carousel height="320px" v-show="menuActive1==36 && bannerList.length == 1" indicator-position='none' arrow="never" :autoplay='true' >
                <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                    <img v-lazy="item.image_url" :src="item.image_url"  @click="toBannerUtl(item.url)" style="width: 1200px;"  alt />
                </el-carousel-item>
            </el-carousel>
            <!-- 其他分类推广图-->
            <div v-if="menuActive1!=36" @click="toBannerUtl(bannerOther['banner_movie_type_pc_'+menuActive1].url)" style="cursor: pointer;width: 1200px">
                <img height="320px" v-if="bannerOther['banner_movie_type_pc_'+menuActive1]" v-lazy="bannerOther['banner_movie_type_pc_'+menuActive1].image_url" alt="" style="width: 1200px;">
            </div>
        </div>
        <div class="video-box">
            <div class="foor"  v-for="(i,index) in videoList" :key="index">
                <div class="video-title" >
                    <div class="fl list-name"><img src="../../assets/imgaes/video/icon_1.png" alt=""> {{i.name}}</div>
                    <div class="fr r-more">
                        <span class="refresh" @click="changeOne(i.id,index)"><img src="../../assets/imgaes/video/icon_2.png" alt="">{{$t('movie.text[6]')}}</span>
                        <span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" class="more"  @click="seeMore({typeId:i.pid,cid:i.id})">{{$t('movie.text[7]')}}</span>
                    </div>
                </div>
                <!-- <div class="video-list  clearfix" v-if="i.list"> -->
                <div class="video-list  clearfix" >
                    <p class="tips" v-if="isLoading">{{$t('movie.text[8]')}}...</p>
                    <p class="tips" v-if="i.list.length==0 && isLoading != true">{{$t('movie.text[9]')}}！</p>
                    <div class="video-item fl"  v-for="(j,index) in i.list" :key="index" @click="goPlay(j,i)">
                        <div class="item-pic">
                            <img class="pic"   v-lazy="j.cover" alt="">
                            <div class="video-describe">
                                <div class="fl">
                                    <img class="fl-icon" src="../../assets/imgaes/video/icon_3.png" alt="">
                                    <span class="numer">{{j.readss | filterOnlineNum}}</span>
                                </div>
                                <div class="fr duration">{{j.play_time | filterSecond}}</div>
                            </div>
                            <div class="video-play"><span class="play-icon"></span></div>
                        </div>
                        <div class="item-name" :title="j.title">{{j.title}}</div>
                    </div>
                </div>
            </div>
            

        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
    export default {
        name: 'videoHome',
        data(){
            return{
                videoMenu1:[],//大分类
                menuActive1:this.$store.state.defalutLan==1?36:61,
                searchKey:'',
                historyList:[],
                videoMenu:{},//分类
                isFl:false,
                videoList:[],//列表
                postData:{
                    cid:this.$store.state.defalutLan==1?36:61, //大分类
                    limit:4,
                    page:1,
                    code:this.$store.state.defalutLan,
                },
                domesticPostData:{
                    typeId:1, //大分类
                    cid:'',//小分类
                    limit:4,
                    code:this.$store.state.defalutLan,
                    page:1,
                    limit:4
                },
                isLoading:false,  //loading
                imgIsLoading:false,//
                bannerList:[], //轮播图
                bannerOther:{},//其他类型推广图
                bannerZm:[],//主播招募图
                freeNum:0,
                amount:0,
                marketNum:0,
                allMarketNum:100,
            }
        },
        filters:{
            filterOnlineNum(n) {
                if (n > 10000) {
                    return n / 10000 + "万";
                }
                return n;
            },
            
        },
        created(){
            this.getBanner();
            this.getFl();
            this.getVideoList();//列表1
            //console.log(localStorage.getItem('historySearch'));
            if(!localStorage.getItem('historySearch')||localStorage.getItem('historySearch')=='undefined'||localStorage.getItem('historySearch')=='null'){
                this.historyList = [];
            }else{
                this.historyList = JSON.parse(localStorage.getItem('historySearch'));
                //console.log(this.historyList);
                //this.getFl();
                this.getVideoList();//列表1
            }
            //this.getLastMarketNum();
            if(this.$store.state.codeToken){
                this.getPlayNum();
            }else{
                this.freeNum = this.userinfo.free_watch_nums;
            }
            //this.toRecharge();
            this.getBalance(); 
        },
        watch:{
            // freeNum(){
            //     console.log(this.freeNum);
            //     console.log( this.userinfo.free_watch_nums);
            //     // if( this.freeNum > this.userinfo.free_watch_nums || this.freeNum ===this.userinfo.sum_watch_nums && this.userinfo.sum_watch_nums !='无限次'){
            //     //     this.buyDiamonds();
            //     // }  
            //     if( this.freeNum <= 0 && this.userinfo.sum_watch_nums !='无限次'){
            //         this.buyDiamonds();
            //         console.log(this.freeNum);
            //     }  
            // }
        },
        mounted(){
              
        },
          computed: {
            ...mapState(["userinfo","skin","defalutLan"])
            
        },
        methods:{
            buyDiamonds:function name(params) {
                this.$confirm('您的观影次数已用完。','提示', {
                    confirmButtonText: '钻石购买',
                    cancelButtonText: 'Quay lại',
                    confirmButtonClass:'rechargeButton',
                    cancelButtonClass:'backButton',
                    roundButton:true,
                    customClass:'yqmBox',
                    center: true,
                    showCancelButton:true,
                    dangerouslyUseHTMLString:true
                }).then(() => {
                    this.$router.push("/userInfor");
                }).catch(() => {

                });
            },
             toRecharge:function name(params) {
                this.$confirm('您的余额不足！','提示', {
                    confirmButtonText: 'Nạp',
                    cancelButtonText: '博一博',
                    confirmButtonClass:'toRechargeButton',
                    cancelButtonClass:'backButton',
                    roundButton:true,
                    customClass:'yqmBox',
                    center: true,
                    showCancelButton:false,
                    dangerouslyUseHTMLString:true
                }).then(() => {
                     this.$router.push("/userInfor");
                }).catch(() => {

                });
            },
            async getBalance(){ //获取余额
                this.$http.get("/api/user/balance").then(res => {
                    if (res && res.data.code == 1) {
                        this.amount = res.data.data.balance || "0";
                       //console.log(this.amount);
                    }
                });
            },
            async getPlayNum(){
                let res = await this.$http.get('/api/live/movie/getLastNum/',{params:{language:this.defalutLan}});
                if(res && res.data.code==1){
                    this.freeNum = res.data.data.free_watch_nums;
                    // if((this.userinfo.free_watch_nums<=0|| this.freeNum <= 0) && this.userinfo.sum_watch_nums !='无限次'){
                    //     this.buyDiamonds();
                        
                    // } 
                }
            },
            async getLastMarketNum(){
                let res = await this.$http.get('/video/getLastMarketNum');
                if(res && res.data.code==1){
                    this.marketNum = res.data.data.marketNum;
                    if(res.data.data.allMarketNum){
                        this.allMarketNum = res.data.data.allMarketNum;
                        console.log(11)
                    }
                    console.log(this.allMarketNum);
                }
            },
            async getBanner(){ //获取banner图
                this.imgIsLoading = false;
                let res = await this.$http.get('/api/live/movie/get_movie_banner/');
                if (res && res.data.code == 1) {
                    this.imgIsLoading =true;
                    this.bannerList=res.data.data.banner_movie_home_pc || [];
                    //console.log(this.bannerList)
                    this.bannerZm = res.data.data.banner_movie_list || [];
                    this.bannerOther = res.data.data.banner_movie_type_list || [];
                    localStorage.setItem('banner_movie_play',JSON.stringify(res.data.data.banner_movie_play))
                }
            },
            toBannerUtl(u){ //banner点击跳转
                if(u){
                    window.open(u)
                }
                
            },

            //...mapMutations(["SETBALANCE"]),
            goSearch:function(searchCon){
                //console.log(searchCon);
                this.$ro.push({ name: "searchVideo"});  //进入搜索页面
                localStorage.setItem('searchKey',searchCon);
                //this.$ro.push({ name: "searchVideo",query:{searchCon}});  //进入搜索页面
            },
            //删除搜索过的关键字
            deleteHistory:function () {
                this.historyList =[];
                localStorage.removeItem('historySearch');
            },
            goPlay(v,i){ //跳转页面
                // console.log(i);
                // if(this.amount == 0 ){ //如果余额不足 
                //    this.toRecharge();
                //    return;
                // }else{
                //     v.type=i.pid;
                //     v.cid=i.id;
                //     window.open('#/videoPlay/' + v.id)
                // }
                v.type=i.pid;
                v.cid=i.id;
                window.open('/videoPlay/' + v.id)

                
            },
            changeMenu(item){ //精选序列
                //console.log(item.typeId);
                this.menuActive1=item.typeId;
                this.postData.cid=item.typeId;
                this.getVideoList();
            },
            //请求大分类
            async getFl(e){
                // let res = await this.$http.post('/video/getVideoClass') ;
               
                //越南语没数据 
                let res = await this.$http.get('/api/live/movie/get_movie_sort/',{params:{code:this.defalutLan}}) ;
                //let res = await this.$http.get('/api/live/movie/get_movie_sort/') ;
                if(res && res.data.code==1){
                    this.isFl = true;
                    this.videoMenu = res.data.data;
                    //console.log(this.videoMenu)
                    for(let k in this.videoMenu){
                        this.videoMenu1.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id,pid:this.videoMenu[k].pid});
                    }
                    //console.log(this.videoMenu1);
                }
            },
            //请求首页列表
            async getVideoList(){
                this.isLoading = true;
                // let res = await this.$http.post('/video/classification',this.postData);
                let d = this.globalPpproach.checkIsEncrypt({
                    cid:this.postData.cid, //大分类
                    code:this.postData.code,
                    limit:this.postData.limit,
                    page:this.postData.page,
                })
                let res = await this.$http.post('/api/live/movie/get_movie_list/',{
                     cid:this.postData.cid, //大分类
                    code:this.postData.code,
                    limit:this.postData.limit,
                    page:this.postData.page,
                });
                //console.log(res)
               
                if(res && res.data.code==1){
                    this.isLoading = false;
                    this.videoList = res.data.data;
                   // console.log(this.videoList);
                }
            },
            //换一批
            async changeOne(v,i){ //换一批
                //alert('5522');
                this.domesticPostData.typeId=this.menuActive1;
                this.domesticPostData.cid=v;
                this.domesticPostData.page++;
              //this.domesticPostData.num=4;
                // let res = await this.$http.post('/video/domestic',this.domesticPostData) ;
                let d = this.globalPpproach.checkIsEncrypt({
                    typeId:this.domesticPostData.typeId, //大分类
                    cid:this.domesticPostData.cid, //小分类
                    code:this.domesticPostData.code,
                    page:this.domesticPostData.page, //第几页
                    limit:this.domesticPostData.limit//每页多少条
                })
                let res = await this.$http.post('/api/live/movie/domestic/',{
                     typeId:this.domesticPostData.typeId, //大分类
                    cid:this.domesticPostData.cid, //小分类
                    code:this.domesticPostData.code,
                    page:this.domesticPostData.page, //第几页
                    limit:this.domesticPostData.limit//每页多少条
                }) ;
                if(res && res.data.code==1){
                    console.log(res);
                    this.videoList[i].list = res.data.data;
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'warning'
                  });
                }
            },
            //查看更多
            seeMore:function (curId) {
                //console.log(curId);
                this.$router.push("/videoMore/" + curId.typeId+ "/" + curId.cid);
            },
        },
    }
</script>

<style scoped lang="less">
.el-message-box__header{
    text-align: center;
}
    .video-home{
        background: #f4f5f8;
        padding-top: 40px;
        .video-menu{
            padding: 0 0;
            li{
                min-width: 88px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #445779;
                text-align: center;
                margin-right: 5px;
                cursor: pointer;
                padding: 0 8px;
                &.first{
                    height: 30px;
                    font-weight: bold;
                    background: none;
                    font-size: 24px;
                    margin-right: 36px;
                    cursor: default;
                    margin-bottom: 20px;
                }
                &.active{
                    color: #1486FF;
                    background: #fff;
                    border: 1px solid #1486FF;
                    border-radius: 15px;
                }
            }
            .menu-list1{
                width: 640px;
                height: 30px;
                overflow: hidden;
            }
            .menu-list2{
                width: 1068px;
                li{
                    margin-bottom: 20px;
                }
            }
            .search-box{
                width: 319px;
                background: none;
                margin-right:0;
                padding: 0;
                .input-bg{
                    width: 242px;
                    height: 30px;
                    border:1px solid #eeee;
                    background: #fff;
                    -webkit-border-radius: 15px 0 0 15px;
                    -moz-border-radius: 15px 0 0 15px;
                    border-radius: 15px 0 0 15px;
                    position: relative;
                    input{
                        width: 90%;
                        line-height: 28px;
                        font-size: 12px;
                        -webkit-border-radius: 15px 0 0 15px;
                        -moz-border-radius: 15px 0 0 15px;
                        border-radius: 15px 0 0 15px;
                        padding-left: 10px;
                        float: left;
                    }
                    .icon{
                        width: 14px;
                        height: 16px;
                        position: absolute;
                        top:5px;
                        right: 15px;
                    }
                }
                .search-btn{
                    width: 69px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    color: #fff;
                    -webkit-border-radius: 0 15px 15px 0;
                    -moz-border-radius: 0 15px 15px 0;
                    border-radius: 0 15px 15px 0;
                    background: linear-gradient(0deg, #1687FF, #4BA1FF);
                    cursor: pointer;
                }
            }
        }
        .video-box{
            &:last-of-type{
                margin-bottom: 56px;
            }

            .foor{
                .video-title{
                    line-height: 24px;
                    padding: 28px 0;
                    overflow: hidden;
                    .list-name{
                        font-size: 18px;
                        font-weight: bold;
                        color: #333;
                        img{
                            margin-right: 27px;
                            float: left;
                        }
                    }
                    span{
                        font-size: 14px;
                        cursor: pointer;
                         &.refresh{
                             color: #333;
                             img{
                                 margin-right: 15px;
                             }
                         }
                         &.more{
                             color: #1486FF;
                             margin-left: 26px;
                         }
                    }

                }

            }
            .video-list{
                height: 297px;
                background: #fff;
                padding-left: 20px;
                overflow: hidden;
                .video-item{
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
                            border-color:  #1486FF;
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
                                content: "";
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
                        width: 100%;
                        font-weight: bold;
                        font-size: 18px;
                        color: #333;
                        padding: 20px 0;
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                    }

                }
            }
        }
        .tips{
            width: 100%;
            height: 100px;
            font-size: 18px;
            color: #333;
            padding: 80px 0;
            text-align: center;
            background: #fff;
            margin-top: 15px;
        }
        .video-num{
                // line-height: 45px;
                margin-bottom: 30px;
                .vip-icon{
                    width: 60px;
                    height: 17px;
                    background: url('../../assets/imgaes/chat/VIP-lv1.2.png')no-repeat;
                    background-size: contain;
                }
                .vip1-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv1.2.png')no-repeat;
                }
                .vip2-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv2.2.png')no-repeat;
                }
                .vip3-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv3.2.png')no-repeat;
                }
                .vip4-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv4.2.png')no-repeat;
                }
                .vip5-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv5.2.png')no-repeat;
                }
                .vip6-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv6.2.png')no-repeat;
                }
                .vip7-icon{
                    background: url('../../assets/imgaes/chat/VIP-lv7.2.png')no-repeat;
                }
                li{
                    margin-left: 15px;
                    font-size: 18px;

                    img{
                        width: 24px;
                        height: 24px;
                        &.buy-icon{
                            width: 24px;
                            height: 24px;
                        }
                    }
                    i{
                        width: 24px;
                        height: 24px;
                        display: inline-block;
                        vertical-align: middle;
                        &.buy-icon{
                            background: url('../../assets/imgaes/video/isbuy.png')no-repeat;
                            background-size: contain;
                        }
                        &.share-icon{
                            background: url('../../assets/imgaes/video/video-share.png')no-repeat;
                            background-size: contain;
                        }
                    // color: #1486FF;
                    }
                    a{
                        display: block;
                    }
                }
                &.pink-tab{
                    li{
                        i{
                             &.buy-icon{
                            background: url('../../assets/imgaes/video/isbuy-pink.png')no-repeat;
                            background-size: contain;
                            }
                            &.share-icon{
                                background: url('../../assets/imgaes/video/isshare-pink.png')no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
                &.blue-tab{
                    li{
                        i{
                             &.buy-icon{
                            background: url('../../assets/imgaes/video/isbuy-blue.png')no-repeat;
                            background-size: contain;
                            }
                            &.share-icon{
                                background: url('../../assets/imgaes/video/ishare-blue.png')no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
                &.green-tab{
                    li{
                        i{
                             &.buy-icon{
                            background: url('../../assets/imgaes/video/isbuy-green.png')no-repeat;
                            background-size: contain;
                            }
                            &.share-icon{
                                background: url('../../assets/imgaes/video/isshare-green.png')no-repeat;
                                background-size: contain;
                            }
                        }
                    }
                }
            
        }
    }
</style>