<template>
    <div class="">
        <div class="banner "><a href="www.k188.bet" target="_blank"><img src="../../assets/imgaes/promotions/download_01.png" alt=""></a></div>
        <div  class="content-box">
            <div class="main">
                <h4>活动详情</h4>
                <p style="text-align: center;padding-top:30px;padding-bottom:20px;">凡是下载手机app并且连续充值游戏三天以上的会员（总充值满300元）即可申请。</p>
                <div style="text-align: center;">
                    <img src="../../assets/imgaes/promotions/code_GF.png" alt="">
                    <p style="padding-top:18px;">扫描二维码下载APP<br>或打开APP下载网址：<a href="www.lgapp777.com" target="_blank">www.lgapp777.com</a></p>
                    <p style="padding:23px 0 48px;"><span style="color:#FF3131">申请方式：</span>下载APP后达到充值游戏要求即可联系客服申请~</p>
                </div>
                <h4>活动声明</h4>
                <p style="padding:40px 200px; 60px 0;">乐购体育推出的任何活动只对有效会员开放，同一活动同一玩家只允许参与一次。同IP、同姓名、
                    同存/提卡视为同一客户，任何以套利、刷彩金、使用第三方插件获利者，乐购体育有权扣除获利
                    金额并冻结账户。参与活动即表示同意活动声明。
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.banner{
    img{
      width: 100%;
    }
  }
  .content-box{
     height: 805px;
     background:#f3f4f6 url(../../assets/imgaes/promotions/main_bg.png) no-repeat top center;
     .main{
        height: 746px;
        background: #FFFFFF;
        border-radius: 0px 0px 10px 10px;
        padding-top: 38px;
        box-shadow: 0 0 10px 5px #f3edee;
        h4{
            width: 750px;
            line-height: 29px;
            height: 29px;
            font-size: 30px;
            font-weight:normal;
            color: #FF3131;
            text-align: center;
            background: url(../../assets/imgaes/promotions/title_bg.png) no-repeat center;
            margin: 0 auto;
        }
        p{
            line-height: 35px;
            font-size: 18px;
            color: #666;
        }
        table{
            width: 900px;
            margin: 0 auto;
            border-radius: 10px;
                border-collapse:separate;
                border-spacing:0px;
                border:1px solid #FF7D7D;
            tr{
                th{
                    line-height: 60px;
                    font-size: 30px;
                    color: #fff;
                    background: #FF7D7D;
                }
                td{
                    border-collapse:collapse;
                    line-height: 39px;
                    font-size: 16px;
                    color: #666;
                    text-align: center;
                    border: 1px solid #FF7D7D;
                }
                &:nth-of-type(1){
                    th:first-of-type{
                        border-radius: 10px 0px 0px 0px;
                    }
                     th:last-of-type{
                        border-radius: 0px 10px 0px 0px;
                    }
                }
                &:nth-of-type(2){
                    td:first-of-type{
                        border-radius: 0px 0px 0px 10px;
                    }
                }
                &:last-of-type{
                    td:last-of-type{
                        border-radius: 0px 0px 10px 0px;
                    }
                }
            }
        }
     }
  }
</style>