<template>
  <div class="gameRule main">
     
     <div class="content clearfix">
        
         <!-- <div class="ruleList fl">
           <div class="rule-header ">
            
            </div>
          
            <ul>
                <li v-for="(v,index) in allRule" @click="changeRule(index,v)" :class="index == slelectIndex ? 'active':''" :key="index">{{v.name}}</li>
            </ul>
         </div> -->
         <div class="ruleContent fl" >
            <div v-for="(item,index) in allRule" :key="index" v-if="item.content != ''">
               <h3 style="text-align: left;">{{index+1}}. {{item.name}}</h3>
             <div v-html="item.content" v-if="item.content != ''" style="font-size:16px;line-height:30px"></div>
             <div class="prevue-content-no" v-else>Đang nhận... <i class="el-icon-loading"></i></div>
            </div>
         </div>
     </div>
  </div>
</template>
<script>
export default {
  name: "gameRule",
  data() {
    return {
      slelectIndex:"0",
      gameName:'',
      ruleData:{},
      ruleContent:'',//规则
      lotteryId:'',
      allRule:[]

    };
  },
  mounted() {
  },
  watch: {

  },
  created(){
      // this.getRuleList()
      this.getRule();
      this.lotteryId = this.$route.params.id;
      // console.log(this.ruleData)
     
  },
  methods: {
    async  getRuleList(){
       let res = await this.$http.get('/api/guess/playlist', {
        params: {
          lottery_id:this.$route.params.id,
          group_code:"",
          client_type:4,
          play_code:""
        },
      });
      let arr = res.data.data; 
      this.ruleData = arr
      this.gameName = arr[0].name
      this.getRule(this.ruleData[0].code);
    },
    async getRule(id){
     let res = await this.$http.get("/api/guess/playrule",{
         params:{
            lottery_id:this.$route.params.id,
            //play_code:id
         }
       })
      this.allRule = res.data.data;
      this.ruleContent = this.allRule[0];
      this.gameName =  this.allRule[0].name;
      
    },
    giftFetch(data) {
      for (let i = 0; i < data.length; i++) {
        this.ruleData.push(data[i]);
      }
     
      this.findContent();

    },
    changeRule(index,item){
      this.slelectIndex = index,
      this.gameName = item.name
      this.ruleContent = item
      // this.gameName =  this.allRule[index].play_code;
      //  this.getRule(item.code)
    }
    ,
    findContent(){
        let game = this.ruleData;
        for (let j = 0, lenj = game.length; j < lenj; j++) {
            if (this.lotteryId == game[j].play_rule_lottery_id) {
               this.ruleContent = game[j].play_rule_content;
               this.gameName = game[j].play_rule_lottery_name;
            //    if(game[j].play_rule_content == ''){
            //        this.ruleContent  = "<p>'该玩法规则正在努力搬运中...'</p>"
            //    }
            //    //console.log(this.ruleContent)
            }
        }
    }
  }
};
</script>
<style scoped lang="less">
  .gameRule{
    margin-top: 20px;
      
      .content{
          margin-bottom: 10px;
        .ruleList{
            width: 200px;
            background: #fff;
            margin-right: 10px;
            text-align: center;
            line-height: 70px;
            padding-bottom: 50px;
            .rule-header{
              font-size: 14px;
              line-height: 18px;
              color: #6E7C9E;
              overflow: hidden;
              padding-top: 30px;
              text-align: left;
              padding-left: 25px;
              // width: 700px;
              a,span{
                  display: inline-block;
                  position: relative;
                  top: -10px;
              }
              span{
                display: inline-block;
                color: #1486FF;
              }
          }
            span{
                display: block;
                // height: 70px;
                // color: #fff;
                // background: #ff1c30;
                font-size: 16px;
                line-height: 21px;

                color: #445779;
            }
            ul{
                width: 100%;
                li{
                    width: 160px;
                    height: 30px;
                    font-size: 14px;
                    color: #000;
                    cursor: pointer;
                    line-height: 30px;
                    text-align: left;
                    margin-left: 20px;
                    padding-left: 37px;
                    color: #71819D;
                    margin-top: 15px;
                    &.active{
                      background: #F3F9FE;
                      font-size: 14px;
                      color: #1486FF;
                    }
                }
            }
        }
        .ruleContent{
            background: #fff;
            width: 1200px;
            min-height: 630px;
            padding: 30px;
            h3{
                font-size: 20px;
                text-align: center;
                font-weight: bold;
                margin-bottom: 40px;
                color: #333;
            }
            .prevue-content-no{
                text-align: center;
                font-size: 20px;
                line-height: 630px;
            }
        }
      }
  }
</style>
