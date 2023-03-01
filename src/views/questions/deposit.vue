<template>
    <div class="deposit">
      <p class="title">如何存款？</p>
      <p class="con">1.存款前，请确保您已经成功注册成为乐购会员，如未注册，请点击右上角“<span>注册</span>”按钮进行注册。</p>

    <p class="con">2.如未开通网上银行，请到当地银行柜台开通网上银行业务。</p>

    <p class="con">3.存款前请先登录乐购账号-个人中心-充值-选择存款方式。</p>

    <p class="title">银行卡转账</p>

    <p class="con">1.登录乐购账号-个人中心-充值-银行卡转账</p>

    <p class="con">2.填写转账信息-登录个人网上银行-转账汇款-复制收款人信息-联系客服-存款完成</p>
    <p class="pic">
        <img src="../../assets/imgaes/qucenter/cz.png" alt="">
    </p>

    <p class="title">扫码充值？</p>

    <p class="con">1.登录乐购账号-个人中心-充值-选择“支付宝”，“微信”或者“云闪付”</p>

    <p class="con">2.填写金额-点击“充值”-扫码支付成功后，完成充值</p>
    <p class="pic">
        <img src="../../assets/imgaes/qucenter/smcz.png" alt="">
</p>

    <p class="title">常见问题？</p>

    <p class="con">1.没有网银如何充值？</p>

    <p class="con">选择微信支付或支付宝存款，扫一扫即可直接到账。</p>

<br>
    <p class="con">2.转账时间是什么？为什么一定要填？</p>

    <p class="con">在您通过转账时，请一定要在填写转账时间，并精确到分例如：2016-12-12 14:25:00。</p>

<br>
    <p class="con">3.存款至旧的银行卡账户怎么办？</p>

    <p class="con">每次存款前请登录官网获取最新的银行卡帐户，存至旧的银行卡帐户将导致存款无法到账。</p>

<br>
    <p class="con">4.存款一般多久到账？</p>

    <p class="con">填写转账信息，即可实时到账。</p>
    </div>
</template>
<script>
export default {
  name: 'deposit',
}
</script>

<style scoped lang="less">
.deposit{
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