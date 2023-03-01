<template>
    <div class="wallet">
        <p class="title">如何进行钱包转换？</p>

        <p class="con">1.登录乐购账号-点击官网首页上方会员账号-进入会员中心-点击“钱包转换”-转账页面。</p>

        <p class="con">手动转换步骤：</p>

        <p class="con">一种。在转转换页面选择转出转入的钱包</p>

        <p class="con">b。输入金额，或点击全部金额</p>

        <p class="con">C。点击立即转账</p>

        <p class="con">3.自动转账步骤：</p>

        <p class="con">一种。在转账页面（向右）打开“自动转入”开关（进入某游戏时，中心钱包的金额自动带入到对应的游戏钱包中）</p>
        <p>
            <img src="../../assets/imgaes/qucenter/qb.png" alt="">
        </p>

        <p class="title">开启自动转入后怎么提现？</p>

        <p class="con">1.手动将场馆钱包转入到中心钱包。</p>

        <p class="con">2.当您多个场馆钱包都有剩余时，可以点击“一键回收”</p>


        <p class="title">转换到场馆钱包，金额变少？</p>

        <p class="con">大部分金额变少或金额变负数是系统二次结算导致的结果，若该部分有疑问可联系<span>在线客服</span>进行详细咨询。</p>


        <p class="title">转换没有成功，但是钱却没了怎么办？</p>

        <p class="con">1.钱包转换时请先退出游戏平台再操作。</p>

        <p class="con">2.如果出现金额丢失，请及时联系<span>在线客服</span>，并提供以下信息：</p>

        <p class="con">（1）会员账号</p>

        <p class="con">（2）丢失金额</p>

        <p class="con">（3）问题游戏</p>


        <p class="title">中心钱包，转场馆钱包失败？</p>

        <p class="con">1.查看对应游戏是否处于维护之中，若游戏处于维护状态是不可以进行转账的。</p>

        <p class="con">2.是否存在重复的转账操作，因转账数量过多，导致一部分账户若重新转账的网络中断，从而造成数据更新不及时或数据丢失。</p>

        <p class="con">3.请尝试转入整体。</p>

        <p class="con">4.联系<span>在线客服</span>进行咨询。</p>
    </div>
</template>
<script>
export default {
  name: 'wallet',
}
</script>

<style scoped lang="less">
.wallet{
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