<template>
    <div class="accountBinding">
        <p class="title">
         怎么绑定银行卡：</p>
电脑网页：点击【会员账号】→【我的钱包】→【金额提现】→【添加银行卡】就可以绑定的了。 <br>
APP：点击【我的】-【钱包】-【提现】即可绑定银行卡。
   <p class="title">
如何删除银行卡：</p>
如果您的银行卡异常，财务可能会无法支付成功的，建议亲联系客服删除银行卡，
绑定正确的就好的啦。<br>
   <p class="title">
目前可以绑定的银行卡：</p>
我们目前支持绑定的取款银行有：中国银行、建设银行、农业银行、工商银行、邮政储蓄银行、招商银行、交通银行、中信银行、平安银行、光大银行、浦发银行、广发银行、华夏银行、兴业银行、民生银行
<br>
温馨提示：【目前绑定的银行卡只限制16-19位的储蓄银行卡，信用卡无法绑定】<br>
   <p class="title">
已经删除的银行卡再次绑定：</p>
您好，删除的银行卡无法绑定到其他账号。只能绑定到原账号的呢。给您带来的不便，敬请谅解。<br>
   <p class="title">
账号密码修改类：</p>

修改登录密码：
点击【我的】→【设置】→【密码修改】输入原密码即可修改新密码。<br>

修改支付密码：
点击【我的】→【设置】→【支付密码修改】输入原密码即可修改新密码。<br>

修改银行卡：
银行卡无法直接修改的，如果亲绑定错误了，联系客服删除银行卡，删除后再次绑定一个正确的就好的啦。试试看吧。<br>
   <p class="title">
其他账号相关问题：</p>

试玩账号：
目前【乐购彩票】提供有试玩账号，试玩账号的盈利无法取款或者转账。试玩账户额度每日自动重置。<br>

账号被锁定：
如果连续输入支付密码错误超过5次，系统为了您的账户资金安全会自动冻结并锁定账户钱包；需要提供以下信息联系客服处理：<br>
①会员账号；<br>
②姓名；<br>
③绑定的银行卡照片；<br>
④最后一次存款截图。<br>


    </div>
</template>
<script>
export default {
  name: 'accountBinding',
}
</script>

<style scoped lang="less">
.accountBinding{
  padding: 45px 40px;
   font-size: 14px;
    color: #71819d;
    line-height: 34px;
    span{
      color: #1486ff;
    }
  .title{
    font-size: 16px;
    color: #1486ff;
    padding-bottom: 5px;
    padding-top: 5px;
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