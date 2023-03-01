<template>
    <div class="extend-report">
        <div class="txhead">
            <div @click="mode=0" :class="[{active:mode==0},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]">
                <span>{{$t('extendReport.text[0]')}}</span>
            </div>
            <div @click="mode=1" :class="[{active:mode==1},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]">
                <span>{{$t('extendReport.text[1]')}}</span>
            </div>
            <div @click="mode=2" :class="[{active:mode==2},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]">
                <span>{{$t('extendReport.text[2]')}}</span>
            </div>
            <div @click="mode=3" :class="[{active:mode==3},{'pink-active':skin==1},{'blue-active':skin==2},{'green-active':skin==3}]">
                <span>{{$t('extendReport.text[3]')}}</span>
            </div>
        </div>

        <teamReport v-show="mode==0"></teamReport>
        <memberReport v-show="mode==1"></memberReport>
        <nextReport v-show="mode==2"></nextReport>
        <invite v-show="mode==3"></invite>
    </div>
</template>

<script>
    import {  mapState } from "vuex";
    import nextReport from "./extend/nextReport.vue"
    import memberReport from "./extend/memberReport.vue"
    import teamReport from "./extend/teamReport.vue"
    import invite from "./extend/invite.vue"
    export default {
        name: "extendReport",
        data(){
            return{
                mode:0,

            }
        },
        components: {
            nextReport,
            memberReport,
            invite,
            teamReport
        },
        created(){
            this.mode = this.$route.params.id
        },
         computed: {
    ...mapState(["skin"]),
  },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    .extend-report{
        padding: 0!important;
        .txhead{
            margin-left: 20px;
            .active{
                color: #1486FF;
            }
            .active:before{
                background: #1486FF;
            }
        }
    }
</style>