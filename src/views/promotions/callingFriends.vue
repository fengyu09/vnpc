<template>
    <div class="">
        <div class="banner "><a href="www.k188.bet" target="_blank"><img src="../../assets/imgaes/promotions/callingFriends_01.png" alt=""></a></div>
        <div  class="content-box">
            <div class="main">
                <h4>活动详情</h4>
                <p style="text-align: center;padding-top:38px;padding-bottom:20px;">独乐乐不如众乐乐，您还在单打独斗吗？<br>
                    立即呼唤亲朋好友体验组队娱乐的乐趣，每推荐一位好友即可领取乐购体育为您贴心准备的推荐彩金！<br>
                    即日起您每成功推荐一位会员并存款次数达到3次以上，<br>
                    单次存款金额500元，即获得108元彩金回馈，介绍的朋友越多，您获得的彩金也就越多！
                </p>
                <p style="padding-left:255px;padding-bottom:75px;"> 1.请联系客服提交您推荐的用户账号；
                    <br>2.被推荐人需达到存款总额/次数要求；（被推荐人必须是未存款的新会员）
                    <br>3.本活动与代理无关，只限乐购体育全体会员，谢谢大家！
                    <br>4.推荐人需要历史有效充值1000，游戏超过7天；
                    <br>5.申请此活动需要共同连续充值游戏三天才能申请。
                </p>
                 <h4>活动声明</h4>
                 <p style="padding:60px 200px; 0">乐购体育推出的任何活动只对有效会员开放，同一活动同一玩家只允许参与一次。同IP、同姓名、
同存/提卡视为同一客户，任何以套利、刷彩金、使用第三方插件获利者，乐购体育有权扣除获利
金额并冻结账户。参与活动即表示同意活动声明。 </p>
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