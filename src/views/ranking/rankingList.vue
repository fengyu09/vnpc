<template>
    <div class="ranking">
        <div class="top-head">
            <span :class="currType == 1 ? 'active' : ''"  @click="tabType(1)">直播榜</span>
            <span :class="currType == 2 ? 'active' : ''"  @click="tabType(2)">推广榜</span>
            <span :class="currType == 3 ? 'active' : ''"  @click="tabType(3)">竞猜榜</span>
            <span :class="currType == 4 ? 'active' : ''"  @click="tabType(4)" v-show="$store.state.userinfo.noble>0">影片榜</span>
        </div>
        <liveList v-if="currType == 1"></liveList>
        <promoteList v-if="currType == 2"></promoteList>
        <guessList v-if="currType == 3"></guessList>
        <movieList v-if="currType == 4"></movieList>
    </div>
</template>

<script>
    import liveList from "./liveList.vue"
    import promoteList from "./promoteList.vue"
    import guessList from "./guessList.vue"
    import movieList from "./movieList.vue"
    export default {
        data(){
            return{
                currType:1
            }
        },

        methods:{
            tabType:function (index) {
                this.currType = index;
            },

        },
        components: {
            liveList,
            promoteList,
            guessList,
            movieList
        },
    }
</script>

<style lang="less" scoped>
    .ranking{
        margin-bottom: 23px;
    }
    .top-head{
        width: 1200px;
        height: 60px;
        font-size: 16px;
        color: #333;
        background: #fff;
        margin: 20px auto 0;
        padding: 19px 0 0 332px;
        overflow: hidden;
        span{
            width: 80px;
            text-align: center;
            padding-bottom: 20px;
            margin-right: 89px;
            float: left;
            cursor: pointer;
            &.active{
                border-bottom:3px solid #FF5D61;
            }
        }
    }
    .w{
        width: 1200px;
        margin: 0 auto;
    }
</style>