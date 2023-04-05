<template>
  <div class="wh-page">
    <div class="wh-logo">
      <img src="../assets/imgaes/wh_icon.png" alt="" srcset="" />
    </div>
    <h1>{{ $t("home.mess[3]") }}</h1>
    <div class="wh-img">
      <img src="../assets/imgaes/wh_img.png" alt="" srcset="" />
    </div>
    <div class="wh-text">
      <p v-if="whText==''">
                Hệ thống đang được bảo trì, xin vui lòng chờ một chút
            </p>
            <p v-else>
               {{ whText }}
            </p>
      <p style="margin-top: 1rem; text-align: right">
        {{ $t("home.mess[2]") }}
      </p>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "wh",
  data() {
    return {
      whText:''
    };
  },
  props:{
        msgText:{
            type:String,
            default:''
        }
    },
  created() {
    this.whText=this.msgText
  },
  methods: {},
};
</script>
  
  <style scoped lang="less">
.wh-page {
  position: fixed;
  color: #4a5161;
  width: 100%;
  top: 0;
  bottom: 0;
  background: url("../assets/imgaes/wh_bg.jpg") no-repeat;
  background-size: 100% 100%;
  z-index: 999999;
  .wh-logo {
    text-align: center;
    margin-top: 2rem;
    img {
      width: 350px;
    }
  }
  .wh-img {
    text-align: center;
    img {
      width: 260px;
    }
  }
  h1 {
    padding: 32px 42px;
    text-align: center;
    color: #4a5161;
    font-size: 28px;
  }
  .wh-text {
    padding: 20px 18%;
    font-size: 16px;
  }
}
</style>
  