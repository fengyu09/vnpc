<template>
  <div id="recruit">
    <div class="head">
      <img
        src="../../assets/imgaes/recruit/zh_01.png"
        width="100%"
        alt=""
        style="min-width: 1200px"
        id="headImg"
      />
    </div>
    <div class="content" v-if="isload">
      <div style="text-align: center">
        <img src="../../assets/imgaes/recruit/title1.png" alt="" />
      </div>
      <div class="superiority-box">
        <div>
          <img src="../../assets/imgaes/recruit/module1.png" alt="" />
          <h2 style="margin-top: 10px">礼物提成</h2>
          <p>高额的礼物提成</p>
          <p>庞大的平台给你无限可能</p>
        </div>
        <div>
          <img src="../../assets/imgaes/recruit/module2.png" alt="" />
          <h2>直播互动</h2>
          <p>拥有狂热的粉丝氛围，多种打赏模式</p>
          <p>粉丝/快乐/收益/朋友一个都不能少</p>
        </div>
        <div>
          <img src="../../assets/imgaes/recruit/module3.png" alt="" />
          <h2>专业而稳定</h2>
          <p>团队不忘初心，致力于深耕直播</p>
          <p>扶持主播，与你一起见证成功</p>
        </div>
      </div>
      <div class="contact-box">
        <div>
          <img src="../../assets/imgaes/recruit/title2.png" alt="" />
        </div>
        <p>如果您有意向，请准备好简历照片和特长发送至我们的邮箱。</p>
        <div>
          <img src="../../assets/imgaes/recruit/title3.png" alt="" />
        </div>
        <p>Địa chỉ Email：legoulive@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recruit",
  data() {
    return {
      isload: false,
    };
  },
  mounted() {
    document.getElementById("headImg").onload = function () {
      this.isload = true;
    }.bind(this);
  },
};
</script>

<style scoped lang="less">
#recruit {
  min-height: 900px;
  background: #fff;
  padding-bottom: 60px;
  .content {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    .superiority-box {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      > div {
        text-align: center;
        color: #000;
        h2 {
          margin-bottom: 16px;
          font-size: 22px;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          color: #333333;
        }
      }
    }
    .contact-box {
      margin-top: 36px;
      text-align: center;
      p {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
        line-height: 38px;
      }
    }
  }
}
</style>
