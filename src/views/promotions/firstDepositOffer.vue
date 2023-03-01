<template>
    <div class="">
        <div class="banner "><img src="../../assets/imgaes/promotions/firstDeposit_01.png" alt=""></div>
        <div  class="content-box">
            <div class="main">
                <h4>活动详情</h4>
                <p style="text-align: center;padding-top:22px;padding-bottom:22px;">
                    会员首次存款当日，亏损指定金额即可领取转运金，祝您时来运转，博得好彩头！
                </p>
                <table>
                    <tr>
                        <th>活动对象</th>
                        <th>当日亏损金额</th>
                        <th>转运金</th>
                    </tr>
                    <tr>
                        <td rowspan="7" width="33.333%">首<br>存<br>当<br>天<br>会<br>员 </td>
                        <td width="33.333%">1000+</td>
                        <td width="33.333%">18</td>
                    </tr>
                    <tr>
                        <td>5000+ </td>
                        <td>88</td>
                    </tr>
                    <tr>
                        <td>10000+</td>
                        <td>158</td>
                    </tr>
                    <tr>
                        <td>30000+</td>
                        <td>288</td>
                    </tr>
                    <tr>
                        <td>70000+</td>
                        <td>588</td>
                    </tr>
                    <tr>
                        <td>100000+</td>
                        <td>688</td>
                    </tr>
                    <tr>
                        <td>200000+</td>
                        <td>1888</td>
                    </tr>
                </table>
                <p style="padding:20px 125px 20px 150px;"><span style="color:#FF3131">例如：</span>首存会员当日亏损1000元，即可联系客服申请18元助力转运彩金~</p>
                <p style="padding:0 125px 0 150px;"><span style="display: block; color:#FF3131">活动声明：</span>
                乐购体育举行的任何活动只对有效会员开放，同一活动同一玩家只允许参与一次。同ip、同姓名、同存/提卡视为 同一客户，任何以套利，刷彩金，使用第三方插件获利者，乐购体育有权扣除获利金额并冻结账户，参与活动即表 示同一活动声明。 
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
     height: 758px;
     background: url(../../assets/imgaes/promotions/main_bg.png) no-repeat top center;
     .main{
        height: 716px;
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