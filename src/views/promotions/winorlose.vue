<template>
    <div class="">
        <div class="banner "><img src="../../assets/imgaes/promotions/winorlose_01.png" alt=""></div>
        <div  class="content-box">
            <div class="main">
                <h4>活动详情</h4>
                <p style="text-align: center;padding-top:22px;padding-bottom:22px;">
                    活动时间：每月1号至30/31号为活动累计时间
                    <br>领取时间：次月15号之前，逾期视为自动放弃
                </p>
                <table>
                    <tr>
                        <th colspan="2">打码彩金</th>
                    </tr>
                    <tr>
                        <td width="50%">累计打码</td>
                        <td width="50%">可获彩金</td>
                    </tr>
                    <tr>           
                        <td>50000</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>200000</td>
                        <td>58</td>
                    </tr>
                    <tr>
                        <td>350000</td>
                        <td>88</td>
                    </tr>
                    <tr>
                        <td>500000</td>
                        <td>128</td>
                    </tr>
                    <tr>
                        <td>800000</td>
                        <td>228</td>
                    </tr>
                    <tr>
                        <td>1500000</td>
                        <td>588</td>
                    </tr>
                    <tr>
                        <td>3000000</td>
                        <td>1088</td>
                    </tr>
                    <tr>
                        <td>5000000</td>
                        <td>2888</td>
                    </tr>
                    <tr>
                        <td>10000000</td>
                        <td>5888</td>
                    </tr>
                </table>
                <table style="margin-top:28px;">
                    <tr>
                        <th colspan="2">盈亏彩金</th>
                    </tr>
                    <tr>
                        <td width="50%">盈亏金额（无论输赢）</td>
                        <td width="50%">可获彩金</td>
                    </tr>      
                    <tr>           
                        <td>1000</td>
                        <td>38</td>
                    </tr>
                    <tr>
                        <td>10000</td>
                        <td>58</td>
                    </tr>
                    <tr>
                        <td>50000</td>
                        <td>188</td>
                    </tr>
                    <tr>
                        <td>100000</td>
                        <td>588</td>
                    </tr>
                        <tr>
                        <td>500000</td>
                        <td>5888</td>
                    </tr>
                    <tr>
                        <td>1000000</td>
                        <td>18888</td>
                    </tr>
                    <tr>
                        <td>5000000</td>
                        <td>58888</td>
                    </tr>
                </table>
                <p style="padding:20px 125px 20px 150px;"><span style="color:#FF3131">例如：</span>会员一个月内累计打码50000，盈利1000元，次月15号前可申领打码彩金8元和盈亏彩金38元，累计46元。</p>
                <p style="padding:0 125px 0 150px;"><span style="display: block; color:#FF3131">活动声明：</span>
乐购体育举行的任何活动只对有效会员开放，同一活动同一玩家只允许参与一次。同ip、同姓名、同存/提卡视为
同一客户，任何以套利，刷彩金，使用第三方插件获利者，乐购体育有权扣除获利金额并冻结账户，参与活动即表
示同一活动声明。 </p>
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
     height: 1317px;
     background: url(../../assets/imgaes/promotions/main_bg.png) no-repeat top center;
     .main{
        height: 1256px;
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
            line-height: 30px;
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
                    border-radius: 10px 10px 0px 0px;
                }
                td{
                    border-collapse:collapse;
                    line-height: 39px;
                    font-size: 16px;
                    color: #666;
                    text-align: center;
                    border: 1px solid #FF7D7D;
                }
                &:last-of-type{
                    td:first-of-type{
                        border-radius: 0px 0px 0px 10px;
                    }
                    td:last-of-type{
                        border-radius: 0px 0px 10px 0px;
                    }
                }
            }
        }
     }
  }
</style>