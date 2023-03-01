<template>
    <div class="browser">
         <p class="title">选择什么样的浏览器才能获得最佳的竞争体验？</p>

        <p class="con">360极速浏览器（使用Chrome内核，支持国内银行转账）</p>

        <p class="con">IE11或更高版本</p>

        <p class="con">谷歌Chrome</p>

        <p class="con">火狐Firefox</p>

        <p class="con">如果您使用的是手持移动设备，我们强烈建议您通过手机自带浏览器进行访问。</p>

        <p class="con">如果您使用的并非以上浏览器且在访问时遇到问题，我们建议您安装最新版本的浏览器。如果仍然由浏览器访问出现问题，请您联系<span>在线客服</span>获取帮助。</p>


        <p class="title">为什么使用版本正确的浏览器会导致投注体验下降和账号不安全？</p>

        <p class="con">首先，IE6或其他低版本浏览器效率最高，很多比较新颖的动画效果都无法实现加载，导致用户阅读和游戏时效果较差；</p>

        <p class="con">实际上，低版本浏览器的安全性，黑客很容易利用其进行病毒或木马植入，从而导致您的投注体验和资金受到威胁。</p>

        <p class="con">因此，我们强烈建议您将浏览器升级到最新版本，刹车获得带来最好的游戏体验和优质服务。</p>


        <p class="title">我是否需要任何程式或浏览器插件来运行网站？</p>

        <p class="con">您不需要通过额外插件进行浏览，但一些合作伙伴的互动游戏时需要的，例如：娱乐游戏和真人荷官可能需要Flash播放器才能正常显示。</p>

        <p class="con">Flash播放器插件是一个添加在浏览器中具有特定功能或服务的软件。一些常见的插件有Java，Flash播放器，Adobe Acrobat，QuickTime和Microsoft Silverlight。</p>
    </div>
</template>
<script>
export default {
  name: 'browser',
}
</script>

<style scoped lang="less">
.browser{
  padding: 45px 40px;
  .title{
    font-size: 16px;
    color: #1486ff;
    padding-bottom: 5px;
    padding-top: 35px;
  }
  .title:first-child{
      padding-top: 0px;
  }
  .con{
    font-size: 14px;
    color: #71819d;
    line-height: 34px;
    span{
      color: #1486ff;
    }
  }
  .pic{
      overflow: hidden;
      padding-top: 10px;
      img{
          width: 780px;
      }
  }
}
</style>