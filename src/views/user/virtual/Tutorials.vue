<template>
    <div class="main Tutorials">
        <div class="left-nav">
            <!-- <p class="title">Hướng dẫn gửi tiền</p> -->
            <div class="item" :class="{active:navIndex==item.id}" v-for="(item,index) in teachList" :key="index" @click="navigate(item.id)"><img class="icon" :src="item.icon" alt="">{{item.title}}</div>
        </div>
        <div class="content">
           <img style="width:100%" v-show="navIndex == item.id" v-for="(item,index) in teachList" :key="index" :src="item.images" alt="">
        </div>

    </div>
</template>
<script>
export default {
    data(){
        return{
            navIndex:0,
            teachList:[]
        }
    },
    created(){
        
        if(this.$route.query.type==1){
            this.navIndex = 8;
        }
        this.getTeachList();
    },
    methods:{
        navigate:function (id) {
            this.navIndex = id;
        },
        async getTeachList(){
            let res = await this.$http.get(this.versionLive2+'Recharge/get_teach_list',{
                params:{
                    client_type:4,
                }
            })
            if(res && res.data.code == 1){
                this.teachList=res.data.data
                this.navIndex = this.teachList[0].id
            }
        },
        
    },
}
</script>
<style lang="less" scoped>
    .Tutorials{
        width: 1200px;
        background: #fff;
        margin: 20px auto 0;
        padding-bottom: 57px;
        overflow: hidden;
        .left-nav{
            width: 230px;
            float: left;
            .title{
                font-size: 24px;
                color: #333;
                padding: 40px 42px 40px 32px;
                text-align: left;
            }
            .item{
                line-height: 50px;
                font-size: 19px;
                color: #333;
                background: #eee;
                padding-left: 10px;
                margin-bottom: 1px;
                cursor: pointer;
                &.active{
                    color: #fff;
                    background: linear-gradient(90deg, #FF5B54, #FF9B8E);
                }
                .icon{
                    // width: 29px;
                    height: 29px;
                    float: left;
                    margin-top: 12px;
                    margin-right: 11px;
                    &.icon0{
                        background: url('../../../assets/imgaes/virtual/yhk.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon1{
                        background: url('../../../assets/imgaes/virtual/wachat.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon2{
                        background: url('../../../assets/imgaes/virtual/zfb.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon3{
                        background: url('../../../assets/imgaes/virtual/ysf.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon4{
                        background: url('../../../assets/imgaes/virtual/ysf.png') no-repeat;
                        background-size: 100% 100%;
                    }
                     &.icon5{
                        background: url('../../../assets/imgaes/virtual/zfb.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon6{
                        background: url('../../../assets/imgaes/virtual/km.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    &.icon7{
                        background: url('../../../assets/imgaes/virtual/xnb.png') no-repeat;
                        background-size: 100% 100%;
                    }
                     &.icon8{
                        background: url('../../../assets/imgaes/virtual/usdt@2x.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        
        .content{
            // padding-top:20px;
            float: left;
            margin-left: 250px;
            text-align: center;
            h4{
                font-weight: normal;
                font-size: 24px;
                color: #333;
                margin: 0px 0 32px;
                img{
                    margin-right: 15px;
                }
            }
        }
        
    }
</style>