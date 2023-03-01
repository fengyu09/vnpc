<template>
    <div id="gameReport">
        <div class="report-Record">
            <span :class="[{'active' :currType == 1},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]" @click="tabType(1)">{{$t('gameReport.text[0]')}}</span>
            <span :class="[{'active' :currType == 2},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]" @click="tabType(2)">{{$t('gameReport.text[1]')}}</span>
        </div>
        <game v-if="currType == 1"></game>
        <userTzRecord v-if="currType == 2"></userTzRecord>
    </div>
</template>

<script>
    import {  mapState } from "vuex";
    import Game from "../../components/game.vue"
    import UserTzRecord from "../../components/userTzRecord.vue"
    export default {
        data(){
            return{
                currType:1
            }
        },
        methods:{
            tabType:function (index) {
                this.currType = index;
            }
        },
        components: {
            Game,
            UserTzRecord
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
                color: #1486FF;
                position: relative;
                &:before{
                    content: '';
                    width: 36px;
                    height: 4px;
                    background: #1486FF;
                    position: absolute;
                    bottom: 0;
                    left:16px;
                    border-radius: 5px;
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
                width: 69px;
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
                &.active{
                    color: #fff;
                    background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1));
                }
            }
        }
        .money-wrap{
            .item-box{
                width:220px;
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
                        // background: url("../../assets/imgaes/member/icon-zs.png") no-repeat;
                        // background-size: 100%;
                        vertical-align: middle;
                        margin-right: 10px;
                        background: url("../../assets/imgaes/usercenter.png")no-repeat!important;
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
                                height: 25px;
                                background: url("../../assets/imgaes/member/icon-zs.png") no-repeat;
                                background-size: 100% 100%;
                                vertical-align: middle;
                                margin:  15px 20px 0 45px;
                                float: left;
                        //         background: url("../assets/imgaes/usercenter.png")no-repeat!important;
                        // background-size: 800px 800px!important;
                        // background-position: 0 0 !important;
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