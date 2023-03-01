<template>
  <div id="rechargePage">
    <p>Đang chạy...</p>
    <!--    moo支付-->
    <div class="moo-pay" v-if="rechargeHtml" >
      <div v-html="rechargeHtml" style="display:none"></div>
    </div>

    <!-- 虚拟支付 -->
    <div class="virtual-recharge" v-if="virtualRechargeHtml">
       <div v-html="virtualRechargeHtml" v-if="virtualRechargeHtml"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rechargePage",
  data() {
    return {
      rechargeHtml:'',
      virtualRechargeHtml:''
    };
  },
  created() {
    this.goRecharge();
   
  },
  watch:{
    rechargeHtml: function () {
      this.$nextTick(() => {
        document.getElementById("actform").submit();
      });
    },
    virtualRechargeHtml: function () {
      this.$nextTick(() => {
        document.getElementById("actform").submit();
      });
    },
  },
  methods:{
    async goRecharge(){
      let q = this.$route.query;
      let data = { 
           amount: q.amount,
           channels_id:q.channels_id,
           bank_code:q.bank_code,
           currency_type:q.currency_type
     }
      let d = this.globalPpproach.checkIsEncrypt(data)
         
         console.log(data);
       let res = await this.$http.post('/api/v2/Recharge/index', d,{timeout:60000});
        // this.btnLoading = false;
        if (res && res.data.code == 1) {
          // this.reset();
          if (res.data.data.url) {
            location.href = res.data.data.url;
           
          } else {
            if (res.data.data.type == 2) {
              if (res.data.data.form) {
                this.rechargeHtml = res.data.data.form;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
            } else {
              // this.$router.push({
              //   path: "/rechargePage",
              //   query: { url: res.data.data.url },
              // });
              // this.showParent();
            }
          }
          // this.$router.push({path:'/rechargePage',query:{url:res.data.data.url}});
          // this.sendLoading = false;
          //        setTimeout(()=>{
          //          window.open(res.data.data.url,'在线充值','height=800,width=1000,top=100,left=430');
          //          this.sendLoading = false;
          //        }, 500);
        } else if (res) {
          // this.sendLoading = false;
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }

    }
  },
  mounted() {

  },
};
</script>

<style scoped lang="less">
#rechargePage {
  height: 500px;
  text-align: center;
  width: 1200px;
  margin: 0 auto;
  font-size: 16px;
}
</style>
