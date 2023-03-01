<template>
    <div class="aboutRegister">
<p class="title">怎么注册账号？</p>

<p class="con">1.点击网站右上角“注册”的功能键，输入您的个人手机号码，发送并填写验证码。</p>

<p class="con">2.设置您的密码并请您将密码严格保密。</p>

<p class="con">3.注册前请确保您已满18周岁并已阅读过我们<span>规则与条款</span>。</p>


<p class="title">忘记用户名怎么办？</p>

<p class="con">忘记会员账户名您可以及时联系我们的在线客服，7x24小时为您提供<span>在线客服</span>。</p>


<p class="title">忘记密码怎么办？</p>

<p class="con">1.在登录页面点击“忘记密码？”</p>

<p class="con">2.进入“更改密码”界面-填写手机号-发送并填写验证码-完成身份验证-设置新密码-完成。</p>


<p class="title">如何更改个人资料信息？</p>

<p class="con">客户成功登录后，点击官网首页右上角会员账号进入个人中心，可以在“个人资料”界面修改。有何疑问可以咨询<span>在线客服</span>。</p>


<p class="title">允许我在乐购扑克吗？</p>

<p class="con">在浏览和体验本站前，请确保您已年满18岁并同意我们的<span>规则与条款</span>。</p>

<p class="con">述原因造成的任何损失，乐购官方概不负责。</p>
    </div>
</template>
<script>
export default {
  name: 'aboutRegister',
}
</script>

<style scoped lang="less">
.aboutRegister{
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