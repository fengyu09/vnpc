<template>
    <div class="popty">
        <div class="popMain">
              
        </div>
    </div>
</template>

<script>
 export default {
     data(){
         return{

         }
     },
      created(){},
       methods:{}
 }
</script>

<style scoped  lang="less">
    .popty{
        position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9990;
    background: rgba(0,0,0,0.5);
        .popMain{
            position: relative;
            width: 510px;
            height: 466px;
            left: 50%;
            top: 50%;
            margin-left: -255px;
            margin-top: -233px;
            background: #E8EBF3;;
        }
    }
</style>
