<template>
    <div class="">
        <div class="banner "><a href="www.k188.bet" target="_blank"><img src="../../assets/imgaes/promotions/transferMoney_01.png" alt=""></a></div>
        <div  class="content-box">
            <div class="main">
                <h4>活动详情</h4>
                <p style="text-align: center;padding-top:28px;;">
                    会员当日亏损，当日即可申请转运彩金2%.
                </p>
                <p style="text-align: center;padding:0 125px 0 150px;"><span style="color:#FF3131">例如：</span>会员当日亏损500元，可领转运彩金10元</p>
                <p style="padding:0 125px 60px 425px;"><span style="color:#FF3131">说明:  </span>
                    ①当日转运金最低领取条件亏损500元 
                    <span style="display:block;padding-left:46px;">②每人一天限领一次 </span>
                    <span style="display:block;padding-left:46px;">③转运彩金领取上限588元</span>
                </p>
                <h4>活动声明</h4>
                <p style="padding:30px 200px; 0">乐购体育推出的任何活动只对有效会员开放，同一活动同一玩家只允许参与一次。同IP、同姓名、
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
     height: 585px;
     background:#f3f4f6 url(../../assets/imgaes/promotions/main_bg.png) no-repeat top center;
     .main{
        height: 540px;
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