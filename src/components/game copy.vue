<template>
    <div class="report-box">
        <dl class="filter date">
            <dt>{{$t('gameReport.game.text[0]')}}</dt>
            <dd :class="[{'active':gameTiemCurIndex =='1'},{'pink-bg':skin==1 &&gameTiemCurIndex =='1'},{'blue-bg':skin==2 &&gameTiemCurIndex =='1'},{'green-bg':skin==3&&gameTiemCurIndex =='1'}]" @click="gameTiemSelect(1)">{{$t('gameReport.game.text[1]')}}</dd>
            <dd :class="[{'active':gameTiemCurIndex =='2'},{'pink-bg':skin==1&&gameTiemCurIndex =='2'},{'blue-bg':skin==2&&gameTiemCurIndex =='2'},{'green-bg':skin==3&&gameTiemCurIndex =='2'}]" @click="gameTiemSelect(2)">{{$t('gameReport.game.text[2]')}}</dd>
            <dd :class="[{'active':gameTiemCurIndex =='3'},{'pink-bg':skin==1&&gameTiemCurIndex =='3'},{'blue-bg':skin==2&&gameTiemCurIndex =='3'},{'green-bg':skin==3&&gameTiemCurIndex =='3'}]" @click="gameTiemSelect(3)">{{$t('gameReport.game.text[3]')}}</dd>
        </dl>
        
        <ul class="money-wrap clearfix">
            <li class="item-box ye-item" >
                <span class="money">{{gameReport.amount}}</span>
                <span class="unit"><i class="icon "></i>{{$t('gameReport.game.text[4]')}}（{{$t('moneyDw')}}）</span>
            </li>
            <li class="item-box ye-item" >
                <span class="money">{{gameReport.prize}}</span>
                <span class="unit"><i class="icon "></i>{{$t('gameReport.game.text[5]')}}（{{$t('moneyDw')}}）</span>
            </li>
            
        </ul>
        <div class="game-content clearfix">
            <div class="title">
                <span>{{$t('gameReport.game.tableTitle[0]')}}</span>
                <span>{{$t('gameReport.game.tableTitle[1]')}}</span>
                <span>{{$t('gameReport.game.tableTitle[2]')}}</span>
            </div>
            <el-scrollbar
                    style="height:480px;width: 100%;background: #fff;padding-bottom: 5px !important;"
                    ref="myScrollbar"
            >
                <div class="game-list">
                    <div class="item" v-if="lanCode!=2">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/cpgame.png" alt="">{{$t('gameReport.game.gameList[0]')}} </span>
                        <span class="total-tz">{{lotteryReport.amount}}</span>
                        <span class="total-sy">{{lotteryReport.profit}}</span>
                    </div>
                   
                    <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/bbinsport.png" alt="">BBIN Sport</span>
                       <span class="total-tz">{{bbinSport.amount}}</span>
                       <span class="total-sy">{{bbinSport.profit}}</span>
                   </div>
                   
                   <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/ae.png" alt="">AE Electronic</span>
                       <span class="total-tz">{{aeSlot.amount}}</span>
                       <span class="total-sy">{{aeSlot.profit}}</span>
                   </div>
                    <div class="item" v-for="v,index in allReport" :key="index">
                    
                       <span class="project">
                           <!-- <img class="icon" :src="require('../assets/imgaes/game/'+v.code+'.png')" alt=""> -->
                           <img class="icon" v-lazy="v.icon" alt="">
                           
                           {{v.code|filterSfName(v.name,lanCode)}}
                        </span>
                       <span class="total-tz">{{v.amount}}</span>
                       <span class="total-sy">{{v.profit}}</span>
                   </div>
                    <!-- <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/bbinlive.png" alt="">BBIN  Live</span>
                       <span class="total-tz">{{bbinLive.amount}}</span>
                       <span class="total-sy">{{bbinLive.profit}}</span>
                   </div> -->
                   <!-- <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/ae.png" alt="">AE Live</span>
                       <span class="total-tz">{{aeLive.amount}}</span>
                       <span class="total-sy">{{aeLive.profit}}</span>
                   </div> -->
                    <!-- <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/bs.png" alt="">IBC Sport</span>
                       <span class="total-tz">{{bsReport.amount}}</span>
                       <span class="total-sy">{{bsReport.profit}}</span>
                   </div>
                   <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/agpu_icon.png" alt="">AG Live</span>
                       <span class="total-tz">{{AgLiveReport.amount}}</span>
                       <span class="total-sy">{{AgLiveReport.profit}}</span>
                   </div> -->
                    <!-- <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/cmd.png" alt="">CMD Sport</span>
                       <span class="total-tz">{{cmdSport.amount}}</span>
                       <span class="total-sy">{{cmdSport.profit}}</span>
                   </div>
                   <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/sbo.png" alt="">SBO Sport</span>
                       <span class="total-tz">{{sboSport.amount}}</span>
                       <span class="total-sy">{{sboSport.profit}}</span>
                   </div>
                   <div class="item">
                       <span class="project"><img class="icon" src="../assets/imgaes/game/qp.png" alt="">CQ9</span>
                       <span class="total-tz">{{cq9Sport.amount}}</span>
                       <span class="total-sy">{{cq9Sport.profit}}</span>
                   </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/sa.png" alt="">SA</span>
                        <span class="total-tz">{{saSport.amount}}</span>
                        <span class="total-sy">{{saSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/dg.png" alt="">DG</span>
                        <span class="total-tz">{{dgSport.amount}}</span>
                        <span class="total-sy">{{dgSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/ebet.png" alt="">EBET</span>
                        <span class="total-tz">{{ebetSport.amount}}</span>
                        <span class="total-sy">{{ebetSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/ibo.png" alt="">IBO</span>
                        <span class="total-tz">{{iboSport.amount}}</span>
                        <span class="total-sy">{{iboSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/allbet.png" alt="">ALLBET</span>
                        <span class="total-tz">{{allbetSport.amount}}</span>
                        <span class="total-sy">{{allbetSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/ezu.png" alt="">EZU</span>
                        <span class="total-tz">{{ezuSport.amount}}</span>
                        <span class="total-sy">{{ezuSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/tcg.png" alt="">TCG</span>
                        <span class="total-tz">{{tcgSport.amount}}</span>
                        <span class="total-sy">{{tcgSport.profit}}</span>
                    </div>
                    <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/game/jdb.png" alt="">JDB</span>
                        <span class="total-tz">{{jdbSport.amount}}</span>
                        <span class="total-sy">{{jdbSport.profit}}</span>
                    </div>
                     <div class="item">
                        <span class="project"><img class="icon" src="../assets/imgaes/member/bg_live.png" alt="">BG</span>
                        <span class="total-tz">{{bgLive.amount}}</span>
                        <span class="total-sy">{{bgLive.profit}}</span>
                    </div> -->
                   
                    <p class="ts" v-if="isLoading">loading...</p>
                </div>
            </el-scrollbar>

        </div>
    </div>
</template>

<script>
    import {  mapState } from "vuex";
    import {fun_date} from "../assets/js/public";
    export default {
        data(){
            return{
                gameReport:{},
                gameTiemCurIndex:1,  //游戏报表选择时间
                methodsIndex:1, //0钻石  1余额
                isLoading:false,
                lotteryList:[],
                lotteryReport:{},
                AGsxReport:{},
                AGdzReport:{},
                bgFish:{},
                bgLive:{},
                kyReport:{},
                bsReport:{},
                AgLiveReport:{},
                imReport:{},
                QpReport:{},
                 bbinLive:{},
                bbinSport:{},
                aeLive:{},
                aeSlot:{},
                aeSport:{},
                mgSlot:{},
                cmdSport:{},
                sboSport:{},
                cq9Sport:{},
                saSport:{},
                dgSport:{},
                ebetSport:{},
                iboSport:{},
                allbetSport:{},
                ezuSport:{},
                tcgSport:{},
                jdbSport:{},
                st:fun_date(0),
                et:fun_date(0),
                allGames:[],
                allReport:[],
            }
        },
        created(){
            this.getGameReport();
            this.getLotteryReport();
            this.getbbinSportReport();
            this.getaeSlotReport();
            this.getGameList();
            // this.getsbReport();
            // this.getAgLiveReport();
            //  this.getbbinLiveReport();
            // this.getaeLiveReport();
            // this.getmgSlotReport();
            // this.getcmdSportReport();
            // this.getsboSportReport();
            // this.getcq9Report();
            // this.getsaReport();
            // this.getdgReport();
            // this.getebetReport();
            // this.getiboReport();
            // this.getallbetReport();
            // this.getezuReport();
            // this.gettcgReport();
            // this.getjdbReport();
            // this.getbgReport();
        },
        filters:{
            filterSfName(code,name,lanCode){
            let n = ""
            if(code=='tcg'){
                if(lanCode==1){
                n = "xổ số TCG"
                }else if(lanCode==2||lanCode==5){
                n = "TCG Lottery"
                }
                
            }else if(code=='ae'||code=='ag'||code=='bbin'||code=='dg'||code=='allbet'||code=='ebet'||code=='ezu'||code=='ibo'||code=='sa'){
                n = name + ' ' +'Live'
            }else if(code=='mg'){
                n = 'MG Electronics'
            }else if(code=='jdb'){
                n = 'JDB Electronics'
            }else if(code=='ael'){
                n = 'AE Lottery'
            }else if(code=='sbo'||code=='cmd'||code=='ibc'){
                if(lanCode==1){
                n = name +' '+'Thể Thao'
                }else if(lanCode==2||lanCode==5){
                n = name +' '+'Sport'
                }
            
            }else {
                n = name;
            }
            return n;
            }
        },
        methods:{
            getGameList(){
                this.$http.get("/api/vendor/index").then(res=>{
                    if(res && res.data.code==1){
                        this.allGames = res.data.data || [];
                        this.getAllGameReport();
                    }
                })
            },
            async getAllGameReport(s,e){
                let arr = [];
                this.allGames.forEach(c=>{
                    let t ;
                    if(c.code=='bbin'||c.code=='ae'){
                        t = 'live';
                    }
                        this.$http.get('/api/vendors.'+c.code+'/count',{
                        params:{
                            st:s,
                            et:e,
                            game_type:t
                        }
                        }).then(res=>{
                        if (res && res.data.code == 1) {
                            let obj = {};
                            obj = res.data.data;
                            obj.code = c.code;
                            obj.name = c.name;
                            obj.icon = c.icon;
                            arr.push(obj);
                        }
                        });
                        
                })
                this.allReport = arr;
                
            },
            methodsSelect:function (index) { //投注方式筛选
                this.methodsIndex = index;
                this.getLotteryReport();
            },
            gameTiemSelect:function (index) { //时间筛选
                this.gameTiemCurIndex = index;
                this.lotteryList = [];
                let s='';
                let e='';
                if(index==1){
                    s=fun_date(0);
                    e=fun_date(0);
                }else if(index==2){
                    s=fun_date(-7);
                    e=fun_date(0);
                }else if(index==3){
                    s=fun_date(-90);
                    e=fun_date(0);
                }
                this.st = s;
                this.et = e;
                this.getGameReport(s,e);
                this.getLotteryReport(s,e);
                this.getbbinSportReport(s,e);
                this.getaeSlotReport(s,e);
                this.getAllGameReport(s,e);
                 if(this.lanCode!=2){
                this.getLotteryReport(s,e);
                }

                // this.getsbReport(s,e);
                // this.getAgLiveReport(s,e);
                //  this.getbbinLiveReport(s,e);
                // this.getaeLiveReport(s,e);
                // this.getcmdSportReport(s,e);
                // this.getsboSportReport(s,e);
                // this.getmgSlotReport(s,e);
                // this.getcq9Report(s,e);
                // this.getsaReport(s,e);
                // this.getdgReport(s,e);
                // this.getebetReport(s,e);
                // this.getiboReport(s,e);
                // this.getallbetReport(s,e);
                // this.getezuReport(s,e);
                // this.gettcgReport(s,e);
                // this.getjdbReport(s,e);
                // this.getbgReport(s,e);
            },
          
            async getGameReport(s,e){
                let res = await this.$http.get('/api/user/count',{
                    params:{
                        st:s,
                        et:e
                    }
                });
                if(res && res.data.code == 1){
                    this.gameReport= res.data.data;
                }
            },
           async getaeSlotReport(s,e){
                let res = await this.$http.get('/api/vendors.ae/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'slot'
                }
                });
                if(res && res.data.code == 1){
                    this.aeSlot =  res.data.data;
                }
            },
            async getLotteryReport(s,e){
                let res = await this.$http.get('/api/guess/count',{
                    params:{
                        st:s,
                        et:e
                    }
                });
                if(res && res.data.code == 1){
                    this.lotteryReport= res.data.data;
                }
            },
             async getbbinSportReport(s,e){
                let res = await this.$http.get('/api/vendors.bbin/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'sport'
                }
                });
                if(res && res.data.code == 1){
                this.bbinSport =  res.data.data;
               
                }
            },



            async getsbReport(s,e){
                let res = await this.$http.get('/api/vendors.ibc/count',{
                    params:{
                        st:s,
                        et:e
                    }
                });
                if(res && res.data.code == 1){
                    this.bsReport =  res.data.data;

                }
            },
            async getAgLiveReport(s,e){
                let res = await this.$http.get('/api/vendors.ag/count',{
                    params:{
                        st:s,
                        et:e
                    }
                });
                if(res && res.data.code == 1){
                    this.AgLiveReport =  res.data.data;
                }
            },
            
             async getaeLiveReport(s,e){
                let res = await this.$http.get('/api/vendors.ae/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'live'
                }
                });
                if(res && res.data.code == 1){
                    this.aeLive =  res.data.data;
                }
            },
             
            async getcmdSportReport(s,e){
                 let res = await this.$http.get('/api/vendors.cmd/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'sport'
                }
                });
                if(res && res.data.code == 1){
                this.cmdSport =  res.data.data;
                }
            },
             async getsboSportReport(s,e){
                 let res = await this.$http.get('/api/vendors.sbo/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'sport'
                }
                });
                if(res && res.data.code == 1){
                this.sboSport =  res.data.data;
                }
            },
            async getmgSlotReport(s,e){
                let res = await this.$http.get('/api/vendors.mg/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'slot'
                }
                });
                if(res && res.data.code == 1){
                this.mgSlot =  res.data.data;
                }
            },
            async getbbinLiveReport(s,e){
                let res = await this.$http.get('/api/vendors.bbin/count',{
                params:{
                    st:s,
                    et:e,
                    game_type:'live'
                }
                });
                if(res && res.data.code == 1){
                this.bbinLive =  res.data.data;
                }
            },
           
            // async getcq9Report(s,e){  //cq9
            //     let res = await this.$http.get('/api/vendors.cq9/count',{
            //     params:{
            //         st:s,
            //         et:e,
            //     }
            //     });
            //     if(res && res.data.code == 1){
                   
            //         this.cq9Sport =  res.data.data;
            //     }
            // },    
            // async getsaReport(s,e){  //sa
            //     let res = await this.$http.get('/api/vendors.sa/count',{
            //     params:{
            //         st:s,
            //         et:e,
            //     }
            //     });
            //     if(res && res.data.code == 1){
            //         this.saSport =  res.data.data;
            //     }
            // },  
            // async getdgReport(s,e){  //dg
            //     let res = await this.$http.get('/api/vendors.dg/count',{
            //     params:{
            //         st:s,
            //         et:e,
            //         //game_type:'live'
            //     }
            //     });
            //     if(res && res.data.code == 1){
            //         this.dgSport =  res.data.data;
            //     }
            // },  
            // async getebetReport(s,e){  //ebet
            //     let res = await this.$http.get('/api/vendors.ebet/count',{
            //     params:{
            //         st:s,
            //         et:e,
            //     }
            //     });
            //     if(res && res.data.code == 1){
            //         this.ebetSport =  res.data.data;
            //     }
            // },  
            // async getiboReport(s,e){  //ibo
            //     let res = await this.$http.get('/api/vendors.ibo/count',{
            //     params:{
            //         st:s,
            //         et:e,
            //     }
            //     });
            //     if(res && res.data.code == 1){
            //         this.iboSport =  res.data.data;
            //     }
            // },
            // async getallbetReport(s,e){  //allbet
            //     let res = await this.$http.get('/api/vendors.allbet/count',{
            //         params:{
            //             st:s,
            //             et:e,
            //         }
            //     });
            //     if(res && res.data.code == 1){
            //         this.allbetSport =  res.data.data;
            //     }
            // },
            // async getezuReport(s,e){  //ezu
            //     let res = await this.$http.get('/api/vendors.ezu/count',{
            //         params:{
            //             st:s,
            //             et:e,
            //         }
            //     });
            //     if(res && res.data.code == 1){
            //         this.ezuSport =  res.data.data;
            //     }
            // },
            // async gettcgReport(s,e){  //tcg
            //     let res = await this.$http.get('/api/vendors.tcg/count',{
            //         params:{
            //             st:s,
            //             et:e,
            //         }
            //     });
            //     if(res && res.data.code == 1){
            //         this.tcgSport =  res.data.data;
            //     }
            // },
            // async getjdbReport(s,e){  //jdb
            //     let res = await this.$http.get('/api/vendors.jdb/count',{
            //         params:{
            //             st:s,
            //             et:e,
            //         }
            //     });
            //     if(res && res.data.code == 1){
            //         console.log(res);
            //         this.jdbSport =  res.data.data;
            //     }
            // },
            // async getbgReport(s,e){  //bg
            //     let res = await this.$http.get('/api/vendors.bg/count',{
            //         params:{
            //             st:s,
            //             et:e,
            //         }
            //     });
            //     if(res && res.data.code == 1){
            //         console.log(res);
            //         this.bgLive =  res.data.data;
            //     }
            // },
        },
        computed: {
            ...mapState(["skin"]),
        },
    }
</script>

<style scoped lang="less">
    .report-Record{
        overflow: hidden;
        border-bottom:1px solid #F4F5F8;
        span{
            font-size: 16px;
            color: #999;
            padding: 21px 0 20px;
            margin-right: 60px;
            float: left;
            cursor: pointer;
            &.active{
                font-weight: bold;
                color: #FF1C30;
                position: relative;
                &:before{
                    content: '';
                    width: 36px;
                    height: 4px;
                    background: url("../assets/imgaes/member/icon-line.png") no-repeat;
                    position: absolute;
                    bottom: 0;
                    left:16px;
                }
            }
        }
    }
    .report-box{
        padding-top: 20px;
        .filter{
            overflow: hidden;
            dt{
                line-height: 35px;
                font-size: 16px;
                color: #999;
                float: left;
                margin-right: 9px;
            }
            dd{
                // width: 69px;
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                color: #333;
                float: left;
                text-align: center;
                margin: 0 20px 20px 0;
                background: #F5F5F5;
                -webkit-border-radius: 6px;
                -moz-border-radius: 6px;
                border-radius: 6px;
                cursor: pointer;
                padding: 0 10px;
                &.active{
                    color: #fff;
                    background: linear-gradient(0deg, #1486FF -33700%, #4BA1FF -30700%);
                }
            }
        }
        .money-wrap{
            .item-box{
                width:450px;
                height:220px;
                color: #999;
                text-align: center;
                border:2px solid #F5F5F5;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                float: left;
                margin-right: 10px;
                &:last-of-type{
                    margin-right:0;
                }
                span{
                    display: block;
                    &.money{
                        font-size: 36px;
                        color: #999;
                        margin: 76px 0 84px;
                    }
                    &.unit{
                        font-size: 16px;
                    }
                    .icon{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-size: 100%;
                        vertical-align: middle;
                        margin-right: 10px;
                        background: url("../assets/imgaes/usercenter.png")no-repeat;
                        background-size: 800px 800px!important;
                        background-position: -362px -673px !important;
                    }
                }

            }
            .ye-item{
                span{
                    .icon{
                        width: 21px;
                        height: 20px;
                        background: url("../assets/imgaes/usercenter.png")no-repeat!important;
                        background-size: 800px 800px!important;
                        background-position: -362px -673px !important;
                    }
                }
            }
        }
        .game-content{
            width: 100%;
            margin-top: 10px;
            border:2px solid #F5F5F5;
            .title{
                width: 100%;
                border-bottom:2px solid #F5F5F5;
                overflow: hidden;
                span{
                    width: 33.333%;
                    height: 62px;
                    line-height: 62px;
                    font-weight: normal;
                    font-size: 16px;
                    color: #999;
                    text-align: center;
                    float: left;
                }
            }
            .game-list{
                .item{
                    width: 100%;
                    border-bottom:2px solid #F5F5F5;
                    overflow: hidden;
                    span{
                        width: 33.333%;
                        height: 58px;
                        line-height: 58px;
                        font-size: 16px;
                        color: #333;
                        text-align: center;
                        float: left;
                        &.project{
                            font-size: 18px;
                            text-align: left;
                            .icon{
                                width: 32px;
                                background-size: 100% 100%;
                                vertical-align: middle;
                                margin:  15px 20px 0 45px;
                                float: left;
                            }
                        }
                        &.total-sy{
                            color: #FF513E;
                        }
                    }

                }
            }
            .no-content{
                text-align: center;
                padding: 30px 0 0;
                p{
                    font-size: 16px;
                    padding-top: 10px;
                }
            }
            .ts{
                font-size: 16px;
                text-align: center;
                padding-top: 100px;
            }
        }
    }
</style>