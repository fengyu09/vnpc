<template>
    <div class="main video-more clearfix">
        <ul class="video-menu clearfix">
            <li class="fl first">{{$t("videoMore.text[0]")}}</li>
            <ul class="menu-list1 fl">
                 <li class="fl" 
                 :class="[{active:menuActive1==item.typeId},{'pink-color-border':skin==1&&menuActive1==item.typeId},{'blue-color-border':skin==2&&menuActive1==item.typeId},{'green-color-border':skin==3&&menuActive1==item.typeId}]"  
                 v-for="(item,index) in videoMenu1" :data-title="item.typeId" @click="changeMenu1(item)" >{{item.name}}</li>
            </ul>
            <li class="fr watch-num" v-if="$store.state.userinfo.noble<7 && codeToken">Số lần xem hôm nay:<i>{{freeNum}}/{{userinfo.sum_watch_nums}}</i> </li>
            <li class="fr watch-num" v-if="$store.state.userinfo.noble>=7 && codeToken">Số lần xem hôm nay:<i>Không giới hạn thời gian                 </i> </li>
            <!-- <li class="fr search-box">
                <el-dropdown trigger="click" placement="top">
                    <div class="fl input-bg">
                        <input type="text" v-model="searchKey" maxlength="100" placeholder="搜你想看的"  >
                        <img class="icon" src="../../assets/imgaes/video/search-icon.png" alt="">
                    </div>
                    <button class="fl search-btn" @click="goSearch(searchKey)">Kiểm tra</button>
                    <el-dropdown-menu class="video-dropdown" slot="dropdown" split-button="true"  v-if="historyList.length!=0 || historyList.length != ' '">
                        <p class="delete" @click="deleteHistory()">最近搜索  <img class="fr" src="../../assets/imgaes/video/delete.png" alt=""></p>
                        <el-dropdown-item v-for="(item,index) in historyList" :key="index" @click.native="goSearch(item)">
                            {{item}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li> -->
        </ul>
        <ul class="video-menu clearfix">
            <li class="fl first">{{$t("videoMore.text[1]")}}</li>
            <li class="fl"
             :class="[{active:menuActive2==index},{'pink-color-border':skin==1&&menuActive2==index},{'blue-color-border':skin==2&&menuActive2==index},{'green-color-border':skin==3&&menuActive2==index}]"
             v-for="(item,index) in videoMenu2" @click="changeMenu2(item,index)">{{item}}</li>
            
            <li class="fr search-box">
                <el-dropdown trigger="click" placement="top">
                    <div class="fl input-bg">
                        <input type="text" v-model="searchKey" maxlength="100" placeholder="Bạn muốn xem"  >
                        <img class="icon" src="../../assets/imgaes/video/search-icon.png" alt="">
                    </div>
                    <button class="fl search-btn" @click="goSearch(searchKey)" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t("movie.text[5]")}}</button>
                    <el-dropdown-menu class="video-dropdown" slot="dropdown" split-button="true"  v-if="historyList.length!=0 || historyList.length != ' '">
                        <p class="delete" @click="deleteHistory()">{{$t("movie.text[4]")}}  <img class="fr" src="../../assets/imgaes/video/delete.png" alt=""></p>
                        <el-dropdown-item v-for="(item,index) in historyList" :key="index" @click.native="goSearch(item)">
                            {{item}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
        <ul class="video-menu clearfix">
            <li class="fl first">{{$t("videoMore.text[2]")}}</li>
            <ul class="menu-list2 fl">
                <li class="fl" 
                :class="[{active:menuActive3==index},{'pink-color-border':skin==1&&menuActive3==index},{'blue-color-border':skin==2&&menuActive3==index},{'green-color-border':skin==3&&menuActive3==index}]"
                 v-for="(item,index) in videoMenu3" @click="changeMenu3(item,index)">{{item.name}}</li>
            </ul>

        </ul>
        <div class="conten-box">
            <div class="video-list  clearfix">
                <div class="video-item fl" v-for="(item,index) in videoList" :key="index" @click="goPlay(item)">
                    <div class="item-pic">
                        <!--<img class="pic" :src="item.cover" alt="">-->
                        <img class="pic" v-lazy="item.cover" alt="">
                        <div class="video-describe">
                            <div class="fl">
                                <img class="fl-icon" src="../../assets/imgaes/video/icon_3.png" alt="">
                                <span class="numer">{{item.reads | filterOnlineNum}}</span>
                            </div>
                            <div class="fr duration">{{item.play_time | filterSecond}}</div>
                        </div>
                        <div class="video-play"><span class="play-icon"></span></div>
                    </div>
                    <div class="item-name" :title="item.title">{{item.title}}</div>
                </div>
                <p class="tips" v-if="isLoading">{{$t("movie.text[8]")}}...</p>
                <p class="tips" v-if="noData">{{$t("movie.text[9]")}}！</p>
            </div>
            <div class="page-box" v-if="videoList.length != 0">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        v-if="total>12"
                        :page-size="12"
                        :current-page="postData.page"
                        layout="  prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
                <div class="fl count">{{$t("videoMore.text[7]")}} {{total}} {{$t("videoMore.text[8]")}}，{{total >= postData.limit ?'12':numLen}}{{$t("videoMore.text[6]")}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
    export default {
        name: 'videoMore',
        data(){
            return{
                historyList:[],
                videoMenu1:[],
                videoMenu2:[this.$t("videoMore.text[3]"),this.$t("videoMore.text[4]"),this.$t("videoMore.text[5]")],
                videoMenu3:[],
                menuActive1:1,
                menuActive2:0,
                menuActive3:0,
                searchKey:'',
                isFl:false,
                videoList:[],//列表
                total:null,
                numLen:'',
                postData:{
                    typeId:'', //大分类
                    cid:'', //小分类
                    column:'updated',
                    tag:'',
                    page:1, //第几页
                    limit:12,//每页多少条
                    code:this.$store.state.defalutLan
                },
                isLoading:false,  //loading
                noData:false,  //无内容
                freeNum:0,
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
            this.getFl(); // 大分类
            this.getAllFl();  //标题三 小分类
            this.getMoreList();//更多视频
            this.postData.typeId = this.$route.params.typeId;
            this.postData.cid = this.$route.params.cid;
            this.menuActive1 =  this.$route.params.typeId;

            //console.log(localStorage.getItem('historySearch'));
            if(!localStorage.getItem('historySearch')||localStorage.getItem('historySearch')=='undefined'||localStorage.getItem('historySearch')=='null'){
                this.historyList = [];
            }else{
                this.historyList = JSON.parse(localStorage.getItem('historySearch'));
                //console.log(this.historyList);
            }
            if(this.codeToken){
                this.getPlayNum();
            }else{
                this.freeNum = this.userinfo.free_watch_nums;
            }

        },
         computed: {
            ...mapState([ "userinfo","codeToken","skin"])
        },
        methods:{
            async getPlayNum(){
                let res = await this.$http.get('/api/live/movie/getLastNum/');
                if(res && res.data.code==1){
                    this.freeNum = res.data.data.free_watch_nums;
                }
            },
            goSearch:function(searchCon){
                this.$ro.push({ name: "searchVideo"});  //进入搜索页面
                localStorage.setItem('searchKey',searchCon);
            },
            //删除搜索过的关键字
            deleteHistory:function () {
                this.historyList =[];
                localStorage.removeItem('historySearch');
            },
            goPlay(v){ //跳转页面
                window.open('/videoPlay/' + v.id)
                localStorage.setItem('vMess',JSON.stringify(v));
            },
            changeMenu1(item){ //精选序列
                this.menuActive1=item.typeId;
                this.postData.typeId = item.typeId;
                this.postData.cid = item.cid;
                this.postData.page = 1;
                this.menuActive2=0;
                this.menuActive3=0;
                this.postData.tag ='';
                this.getMoreList();
                this.getAllFl(); //小分类
            },
            changeMenu2(item,index){ //最新片源
                this.menuActive2=index;
                this.postData.page = 1;
                //console.log(index);
                if(index == 0){
                    this.postData.column = 'updated'
                } else if(index == 1) {
                    this.postData.column = 'reads'
                }else if(index == 2) {
                    this.postData.column = 'praise'
                }
                this.getMoreList();
            },
            changeMenu3(item,index){ //全部分类（tag 标签）
                this.menuActive3=index;
                this.postData.cid = item.cid;
                this.postData.page = 1,
                this.getMoreList();
            },
            //请求大分类
            async getFl(){
                // let res = await this.$http.post('/video/getVideoClass') ;
                let res = await this.$http.get('/api/live/movie/get_movie_sort/',{params:{code:this.defalutLan}}) ;
                if(res && res.data.code==1){
                    this.videoMenu = res.data.data;
                    for(let k in this.videoMenu){
                        //this.videoMenu1.push(this.videoMenu[k].name);
                        this.videoMenu1.push({name:this.videoMenu[k].name,typeId:this.videoMenu[k].id,cid:this.videoMenu[k].children[0].id});
                        for(let j in this.videoMenu[k].children){
                            if(this.menuActive1 == this.videoMenu[k].children[j].pid){
                                this.videoMenu3.push({name:this.videoMenu[k].children[j].name,typeId:this.videoMenu[k].children[j].pid,cid:this.videoMenu[k].children[j].id})
                            }
                        }
                    }
                }
            },
            //标题3 小分类
            async getAllFl() {
                this.videoMenu3=[];
                //console.log(this.videoMenu);
                for(let k in this.videoMenu){
                    //console.log(this.videoMenu[k].children);
                     for(let j in this.videoMenu[k].children){
                         if(this.menuActive1 == this.videoMenu[k].children[j].pid){
                             this.videoMenu3.push({name:this.videoMenu[k].children[j].name,typeId:this.videoMenu[k].children[j].pid,cid:this.videoMenu[k].children[j].id})
                         }
                     }
                }
            },
            //获取更多视频页列表
            async getMoreList(){
                this.isLoading = true;
                this.noData = false;
                let res = await this.$http.post('/api/live/movie/MostSeries/', {
                    typeId:this.postData.typeId, //大分类
                    cid:this.postData.cid, //小分类
                    column:this.postData.column,
                    code:this.postData.code,
                    tag:this.postData.tag,
                    page:this.postData.page, //第几页
                    limit:this.postData.limit//每页多少条
                });
                if(res && res.data.code==1 ){
                    this.isLoading = false;
                    if(res.data.data.code == 0){
                        this.videoList = [];
                        this.noData = true;
                    }else{
                        this.videoList = res.data.data;
                    }
                     console.log(this.videoList)
                    this.numLen = res.data.data.length;
                    this.total = res.data.count;
                }
            },
            handleSizeChange(val) {
                this.page = val;
            },
            handleCurrentChange(val) {
                this.postData.page = val;
                this.videoList = [];
                this.getMoreList(this.page);
            }
        }
    }
</script>

<style scoped lang="less">
    .video-more{
        padding-top: 40px;
    }
    .video-menu{
        padding: 0 0;
        li{
            min-width: 88px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            text-align: center;
            background: #fff;
            -webkit-border-radius: 15px;
            -moz-border-radius: 15px;
            border-radius: 15px;
            margin-right: 20px;
            cursor: pointer;
            padding: 0 8px;
            &.first{
                height: 30px;
                font-weight: bold;
                background: none;
                margin-right: 36px;
                cursor: default;
                margin-bottom: 20px;
            }
            &.active{
                color: #1486FF;
                background: #fff;
                border: 1px solid #1486FF;
            }
            &.watch-num{
                i{
                    color: #1486FF;
                }
                background: none;
            }
        }
        .menu-list1{
            width: 650px;
            height: 30px;
            overflow: hidden;
        }
        .menu-list2{
            width: 1035px;
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
    .conten-box{
        padding-bottom: 105px;
        .video-list{
            background: #fff;
            padding-left: 20px;
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
        .page-box{
            padding-top: 20px;
            .el-pagination{
                background: none;
                float: left;
                button:disabled{
                    background: none;
                }
                .el-pager li{
                    background: none;
                }
            }
            .count{
                line-height: 30px;
                font-size: 13px;
                margin-left: 19px;
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
        float: left;
    }
</style>