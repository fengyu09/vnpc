<template>
  <div class="gameRule main">
     
     <div class="content clearfix">
         <div class="ruleList fl"   >
           <ul class="rule-header clearfix" :class="[{'green-bg-dark':$st.state.skin==3},{'blue-bg-dark':$st.state.skin==2},{'pink-bg-dark':$st.state.skin==1}]">
              <li  :class="[{'active':item.code == gameNameIndex&&$st.state.skin==0},{'pink-bg':item.code == gameNameIndex&&$st.state.skin==1},{'blue-bg':item.code == gameNameIndex&&$st.state.skin==2},{'green-bg':item.code == gameNameIndex&& $st.state.skin==3}]" @click="gameName(index,item)"  v-for="(item,index) in ruleList" :key="index">{{item.name}}</li>
            </ul>
            <ul class="rule-type">
                <li v-for="(v,index) in gameNameList" @click="changeRule(index,v)" :class="[{'active':v.code == slelectIndex&&$st.state.skin==0},{'pink-bg-jb':v.code == slelectIndex&&$st.state.skin==1},{'blue-bg-jb':v.code == slelectIndex&&$st.state.skin==2},{'green-bg-jb':v.code == slelectIndex&& $st.state.skin==3}]"  :key="index">{{v.name}}</li>
            </ul>
         </div>
         <div class="ruleContent fl" >
            <div  v-if="ruleContent != ''">
             <div v-html="ruleContent" v-if="ruleContent != ''" style="font-size:16px;line-height:30px"></div>
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
      ruleList:{},
      gameNameList:{},
      ruleContent:'',//规则
      gameNameIndex:0,
      slelectIndex:"0",
      lotteryId:'',
      bigGame:''
    };
  },
  mounted() {
  },
  watch: {

  },
  created(){
      this.getRuleList()
      this.lotteryId = this.$route.params.id;
      if(this.lotteryId==1){
        this.gameNameIndex = 1;
      }else if(this.lotteryId==37){
        this.gameNameIndex = 4;
      }else if(this.lotteryId>37&&this.lotteryId<45){
        this.gameNameIndex = 0;
      }else if(this.lotteryId>1&&this.lotteryId<16){
        this.gameNameIndex = 2;
      }else if(this.lotteryId>15&&this.lotteryId<37){
        this.gameNameIndex = 3;
      }else if(this.lotteryId>=45&&this.lotteryId<=50){
        this.gameNameIndex = 5;
      }
      this.slelectIndex = this.$route.params.id;
      // this.bigGame = this.$route.query.type;
      console.log(this.slelectIndex)
     
  },
  methods: {
    async  getRuleList(){
      let res = await this.$http.get('/api/lottery/rule');
      this.ruleList = res.data.data; 
      if(this.lotteryId==37){
         this.gameNameList = this.ruleList[3].list;
         this.ruleContent = this.gameNameList[0].content;
      }else if(this.lotteryId>37){
          this.gameNameList = this.ruleList[4].list;
          this.ruleContent = this.gameNameList[0].content;

      }else{
        this.gameNameList = this.ruleList[this.gameNameIndex-1].list;
        let index = this.gameNameList.findIndex(v=>{
          return v.code==this.lotteryId
        })
        this.ruleContent = this.gameNameList[index].content;
      }
      
    },
    gameName(index,item){
      console.log(item);
      this.gameNameIndex = item.code;
      if(item.code==4){
        this.slelectIndex = 37;
      }if(item.code==0){
        this.slelectIndex = 38;
      }if(item.code==1){
        this.slelectIndex = 1;
      }else if(item.code==2){
        this.slelectIndex = 2;
      }else if(item.code==3){
        this.slelectIndex = 16;
      }
      // console.log(this.slelectIndex)
      if(item.code==4||item.code==0){
        // console.log(this.ruleList)
        this.gameNameList = item.list;
        this.ruleContent = item.list[0].content;
      }else{
        this.gameNameList = this.ruleList[this.gameNameIndex-1].list;
        let i = this.gameNameList.findIndex(v=>{
          return this.slelectIndex==v.code;
        })
        this.ruleContent = this.gameNameList[i].content;
      }
      
      
  
    },
    changeRule(index,item){
      this.slelectIndex = item.code;
       this.ruleContent =item.content;
      // this.allRule = this.ruleList[index].list
    },
  }
};
</script>
<style scoped lang="less">
  .gameRule{
    margin-top: 20px;
      
      .content{
          margin-bottom: 10px;
          background: #fff;
          box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        .ruleList{
            width: 100%;
            background: #fff;
            margin-right: 10px;
            text-align: center;
            border-radius: 10px 10px 0px 0px;
            .rule-header{
              font-size: 18px;
              line-height: 50px;
              color: #fff;
              text-align: center;
              overflow: hidden;
              text-align: left;
              border-bottom: 1px solid #8D8D8D;
              border-radius: 10px 10px 0px 0px;
              background: #1B74C8;
              li{
                width: 120px;
                text-align: center;
                float: left;
                cursor: pointer;
                position: relative;
                &::before{
                  content: '';
                  width: 1px;
                  height: 50px;
                  background: #fff;
                  position: absolute;
                  right: 0;
                  top: 0;
                }
                &.active{
                  background: linear-gradient(90deg, #1486FF 14.39%, #4BA1FF 96.58%);
                  border-radius: 10px 10px 0px 0px;
                }
              }
            }
          .rule-type{
            width: 100%;
            margin-top: 10px;
            li{
              font-size: 18px;
              color: #000;
              cursor: pointer;
              padding: 8px 22px;
              margin-left: 10px;
              margin-bottom: 10px;
              color: #445779;
              background: #F5F7FA;
              border-radius: 5px;
              float: left;
              &.active{
                color: #fff;
                background: linear-gradient(90deg, #1486FF 14.39%, #4BA1FF 96.58%);
              }
            }
          }
            
        }
        .ruleContent{
            background: #fff;
            width: 1200px;
            max-height: 630px;
            padding: 0px 30px 30px;
            overflow-y: scroll;
            h3{
                font-size: 18px;
                text-align: center;
                font-weight: bold;
                margin-bottom: 20px;
                color: #445779;
            }
            .prevue-content-no{
                text-align: center;
                font-size: 18px;
                line-height: 630px;
            }
        }
      }
  }
</style>
