<template>
  <div class="NewsDetails  main">
    <div class="details"  v-for="(d,index) in detailsList">
         <!-- <div class="goBack">>>返回综合列表</div> -->
         <div class="details-tit">{{d.title}}</div>
         <div class="details-info">
           <span>{{d.source}}</span>
           <span>{{d.createtime |  formatDateNy1}}</span>
           <span>{{d.createtime | filterTime}}</span>
         </div>
         <div class="deta-cont" v-html="d.detail"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NewsDetails",
  data() {
    return {
       detailsList:[]
    };
  },
  mounted() {
    this.getNewsDetails(this.$route.params.id)
  },
  methods: {
    getNewsDetails(id){
      this.cur = 1 ;
      this.$http.get(this.versionLive2+'info/getInfoDetail/',{
        params:{
          info_id:id || 1
        }
      }).then(res=>{
        //  //console.log(1)
         if(res && res.data.code==1){
            this.detailsList =  res.data.data || []
            // //console.log(this.detailsList[0].title)
         }
      })
    },
  }
};
</script>
<style scoped lang="less">
     .details{
      // width: 990px;
      background: #fff;
      min-height: 600px;
      padding: 30px 20px;
      margin: 10px auto;
      .goBack{
        font-size: 14px;
        color: #FF1C30;
        padding-bottom: 20px;
        cursor: pointer;
      }
      .details-tit{
        font-size: 20px;
        font-weight: bold;
        color: #333;
        padding-bottom: 20px;
      }
      .details-info{
        color: #999;
        font-size: 14px;
        padding-bottom: 20px;
        span{
          margin-right: 8px;
        }
      }
    }
</style>
