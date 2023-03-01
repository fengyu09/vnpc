<template>
    <div class="detail">
        <div v-html="detailContent.content" ></div>
        
    </div>
</template>
<script>
export default {
    data(){
      return{
        detailContent:'',
        
      }
    },
    watch:{
     
    },
    
    created(){
        this.detailContent=JSON.parse(window.localStorage.getItem('welcome'))
    },

}
</script>
<style lang="less" scoped>
.detail{
    text-align: center;
    background: url('../../assets/imgaes/promotions/bj.png') no-repeat;
     background-size: cover;
     pointer-events: none;
    // img{
    //    width: 100% !important;
    // }
}

</style>