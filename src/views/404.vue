<template>
  <div class="can-not-find">
     <div class="not-find">
          <div class="find">
            <p>找不到页面</p>
            <p>抱歉,您访问的页面迷路了...</p>
            <p @click="$router.push('/')">返回首页</p>
          </div>
     </div>
  </div>
</template>

<script>
export default {
  name: '404',
}
</script>

<style scoped lang="less">
.can-not-find{
  height: 100%;
  width: 100%;
  min-height:100%;
  box-sizing: border-box;
  padding-bottom:119px;
  .not-find{
    margin:0 auto;
    width: 1260px;
    height: 670px;
    background: url("../assets/imgaes/404-bg-min.png") no-repeat center;
    position: relative;
    .find{
      position: absolute;
      top:320px;
      left:790px;
      width: 340px;
      text-align: center;
       p:nth-child(1){
         color:#000;
         font-size: 30px;
         height: 30px;
         line-height: 30px;
         font-weight: bold;
       }
       p:nth-child(2){
         margin:24px 0 50px 0;
         color:#a1a1a1;
         font-size: 20px;
        }
        p:nth-child(3){
          margin:0 auto;
          width: 180px;
          height: 42px;
          line-height: 42px;
          background: #ff1c30;
          border-radius: 21px; 
          font-size: 16px;
          color:#fff;
          cursor: pointer;
        }
    }
  }
}




</style>
