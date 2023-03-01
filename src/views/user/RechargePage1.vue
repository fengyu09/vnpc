<template>
  <div id="rechargePage1">
    <!-- <p>Đang chạy...</p> -->
     <iframe :srcdoc="isHtml" id="mainIframe" ref="mainIframe" scrolling="no" name="mainIframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'rechargePage1',
  data(){
    return {
      d:{},
      isHtml:''
    }
  },
  created(){
     this.isHtml = localStorage.getItem('html');
  }
}
</script>

<style scoped lang="less">
#rechargePage1{
  height: 510px;
  text-align: center;
  width: 1200px;
  margin: 0 auto;
  font-size: 16px;
}
#mainIframe{
    width: 100%;
    height: 100%;
    margin-top: -10px;
    border: none;
    background: #f4f5f8;

}
</style>
