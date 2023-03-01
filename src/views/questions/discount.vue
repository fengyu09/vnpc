<template>
    <div class="discount">
<p class="title">优惠活动如何申请？</p>

<p class="con">登录帐户后点击首页导航栏“优惠福利”进入优惠活动页面，选择相应的优惠活动。</p>


<p class="title">返水何时派发？</p>

<p class="con">返水次日系统自动派发，无需申请，只需一倍流水即可取款（不限游戏平台），返水比例请点击VIP详情页查看。</p>


<p class="title">优惠申请成功后一直没有收到红利或礼品怎么办？</p>

<p class="con">如果您的优惠申请成功后没有在指定时间收到红利或礼品，您可以联系<span>在线客服</span>查询。</p>
    </div>
</template>
<script>
export default {
  name: 'discount',
}
</script>

<style scoped lang="less">
.discount{
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