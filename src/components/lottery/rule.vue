<template>
    <div id="personal">
        <div class="personal-box">
          <div class="select-box clearfix">
            <el-select v-model="value" class="fl lottery-change" clearable placeholder="请选择" @change="changeSelect(value)">
              <el-option
                v-for="item in allLottery" 
                :key="item.lottery_id"
                :label="item.cname"
                :value="item.lottery_id"
                >
              </el-option>
            </el-select>
          </div>


          <div v-html="ruleObj.play_rule_content"></div>



        </div>
    </div>
</template>

<script>
export default {
  name: 'rule',
  data(){
    return {
      value:'',
      lottery_id:8,
      ruleObj:{},
      allRule:[]
    }
  },
  props:{
    lotteryId:{
        type:Number,
        default:8
    },
    allLottery:{
        type:Array,
        default:[]
    },
  },
  created(){
    console.log(this.lotteryId)
    this.lottery_id = this.lotteryId;
    this.getPersonalZx();
  },
  methods:{
        //切换历史记录彩种
    changeSelect(id){
      this.lottery_id = id;
      this.ruleObj = this.allRule.find(value=>{
            return value.play_rule_lottery_id == id
       })
    },
    async getPersonalZx(id){
      let res = await this.$http.get('/forum/guess/play_rule');
      if(res && res.data.code==1){
          let d = res.data.data;
          for(let i=0,len = d.length;i<len;i++){
              this.allRule=this.allRule.concat(d[i].play_rule_type_data);
          }
          this.ruleObj = this.allRule.find(value=>{
            return value.play_rule_lottery_id == this.lottery_id
          })
      }else{

      }
    }
  }
}


</script>
<style scoped lang="less">
#personal{
  .personal-box{
    .select-box{
      margin-bottom: 20px;
    }

  }
}
</style>