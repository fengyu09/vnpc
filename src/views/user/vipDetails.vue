<template>
  <div class="vip-details">
    <h5 class="tb-title">{{$t('vipDetails.title[0]')}}</h5>
    <div class="vip-box clearfix">
      <h4 style="padding-top: 48px;padding-bottom:33px;text-align: center;margin-right: 105px;">
        <img style="width: 391px;" src="../../assets/imgaes/vip/vipfunction 2.png" alt="">
        <div>{{$t('vipDetails.title[1]')}}</div>
      </h4>
      <ul class="level clearfix">
        <li class="level-pic " :class="'level-'+ (index+1)" v-for="(item,index) in vipDetailList" :key="index" @click="changeVip($event,index)"></li>
      </ul>
        <div class="pc-left fl">
          <p class="title">{{$t('vipDetails.text[3]')}}</p>
          <p class="jjtj">
            {{$t('vipDetails.text[0]')}}：<font style="color: red">{{CurrvipDetail.total_recharge }}</font>
            <span style="display:block; padding: 5px 0;">-</span>
             {{$t('vipDetails.text[1]')}}：<font style="color: red">{{CurrvipDetail.total_flow }}</font>
          </p>
          <p class="title">{{$t('vipDetails.text[4]')}}</p>
          <p class="bjtj">
            {{$t('vipDetails.text[2]')}}：<font style="color: red">{{CurrvipDetail.rg_flow }}</font><br>
          </p>
        </div>
        <div class="vip-zs fl" >
          <table>
            <tr>
              <th colspan="3">{{$t('vipDetails.text[5]')}}</th>
            </tr>
            <tr>
              <td>{{$t('vipDetails.text[6]')}}</td>
              <td>{{$t('vipDetails.text[7]')}}</td>
              <!-- <td>{{$t('vipDetails.text[8]')}}<br>({{$t('vipDetails.text[9]')}})</td> -->
              <td>{{$t('vipDetails.text[10]')}}</td>
            </tr>
            <tr>
              <td>
                <span v-if="CurrvipDetail.upgrade_bonus <= 0"><img src="../../assets/imgaes/vip/x.png" alt=""></span>
                <span v-else>{{CurrvipDetail.upgrade_bonus}}</span>
              </td>
              <td>
                  <span v-if="CurrvipDetail.birthday_gift <= 0"><img src="../../assets/imgaes/vip/x.png" alt=""></span>
                  <span v-else>{{CurrvipDetail.birthday_gift}}</span>
              </td>
              <!-- <td>
                 <span v-if="CurrvipDetail.month_hb <= 0"><img src="../../assets/imgaes/vip/x.png" alt=""></span>
            <span v-else>{{CurrvipDetail.month_hb}}</span>
              </td> -->
              <td>
                <span v-if="CurrvipDetail.customer_service == null "><img src="../../assets/imgaes/vip/x.png" alt=""></span>
            <span v-else><img src="../../assets/imgaes/vip/gou.png" alt=""></span>
              </td>
            </tr>
          </table>
         

        </div>

      <ul class="zx-list clearfix fl">
        <li v-for="(item,index) in giftList" :key="index">
          <img v-lazy="item.list[0].icon" alt="">
          <p class="text">{{item.list[0].name}}</p>
          <p class="title">{{item.name}}</p>
        </li>
      
      </ul>
      <img class="line" style="margin-top: 44px;" src="../../assets/imgaes/vip/line3.png" alt="">
    </div>
    <div class="tips-box">
      <h4 style="padding-top: 48px;padding-bottom:33px;text-align: center">
        <img style="width:493px" src="../../assets/imgaes/vip/Warmreminder 3.png" alt="">
        <div>{{$t('vipDetails.title[2]')}}</div>
      </h4>
      <ul>
        <li v-for="(item,index) in tips" :key="index">
          <span data-v-0198dc32="" class="icon">{{index+1}}</span>
          <p>{{item}}</p>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import {removeAllactive,getSiblings} from '../../assets/js/public'
export default {
  data(){
    return{
      CurrvipDetail:{},//当前vip数据
      vipDetailList:[],//'VIP列表数组
      tips:[],//温馨提示内容数组
      giftList:[], // 会员专属礼包
    }
  },
  created(){
    this.getVipDetail();
  },
  watch:{
    vipDetailList:function(){
      this.$nextTick(() => {
        document.querySelector('.level .level-1').classList.add('active');
      });
    }
  },
  methods: {
    changeVip(e,index){
      let curr = e.currentTarget;
      removeAllactive(getSiblings(curr));
      curr.classList.add('active');
      this.CurrvipDetail = this.vipDetailList[index];
    },
    async getVipDetail() {
      // let res = await this.$http.get('/api/v2/user/get_vip_detail');
      let res = await this.$http.get('/api/common/viplist');
      if (res && res.data.code == 1) {
        //console.log(res.data);
        this.CurrvipDetail = res.data.vip_list[0];
        this.vipDetailList = res.data.vip_list;
        this.giftList = res.data.gift_list;
         //onsole.log(res.data.gift_list);
        this.tips = res.data.tips;

      }
    },
  }

}
</script>

<style lang="less" scoped>
.vip-details{
  background: url("../../assets/imgaes/vip/bj1.png") no-repeat top center;
  background-size: 100% 100%;
  padding-top: 455px;
  position: relative;
  .tb-title{
    position: absolute;
    top: 250px;
    left: 50%;
    width: 500px;
    line-height: 40px;
    font-size: 30px;
    color: #fff;
  }
  .vip-box{
    width: 1400px;
    min-height: 1102px;
    background: url("../../assets/imgaes/vip/vip_bg.png") no-repeat center;
    background-size: 100% 100%;
    margin: 0 auto;
    padding-left: 105px;
    padding-bottom: 100px;
    position: relative;
    h4{

    
    >div{
        color: #B97C22;
        font-size: 40px;
        line-height:50px;
       -webkit-mask: linear-gradient(to left, #B97C22, transparent );
      //  margin-top: 10px;
       position: relative;
       &:before{
             content: '';
            position: absolute;
            right: 330px;
            top: 23px;
            width: 94px;
            height: 4px;
            /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
            background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
       }
       &:after{
             content: '';
            position: absolute;
            left: 330px;
            top: 23px;
            width: 94px;
            height: 4px;
            /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
            background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
            transform: matrix(-1, 0, 0, 1, 0, 0);
       }
    }
    }
    .level{
      margin-bottom: 60px;
      .level-pic{
        width: 145px;
        height: 106px;
        float: left;
        cursor: pointer;
        &.level-0{
          background: url("../../assets/imgaes/vip/-s-xvip0@2x.png") no-repeat bottom center ;
        }
        &.level-1{
          background: url("../../assets/imgaes/vip/-s-xvip1@2x.png") no-repeat bottom center ;
        }
        &.level-2{
          background: url("../../assets/imgaes/vip/-s-xvip2@2x.png") no-repeat bottom center;
        }
        &.level-3{
          background: url("../../assets/imgaes/vip/-s-xvip3@2x.png") no-repeat bottom center;
        }
        &.level-4{
          background: url("../../assets/imgaes/vip/-s-xvip4@2x.png") no-repeat bottom center;
        }
        &.level-5{
          background: url("../../assets/imgaes/vip/-s-xvip5@2x.png") no-repeat bottom center;
        }
        &.level-6{
          background: url("../../assets/imgaes/vip/-s-xvip6@2x.png") no-repeat bottom center;
        }
        &.level-7{
          background: url("../../assets/imgaes/vip/-s-xvip7@2x.png") no-repeat bottom center;
        }
        &.level-8{
          background: url("../../assets/imgaes/vip/-s-xvip8@2x.png") no-repeat bottom center;
        }
        &.active{
          &.level-0{
            background: url("../../assets/imgaes/vip/vip0.png") no-repeat bottom center;
          }
          &.level-1{
            background: url("../../assets/imgaes/vip/vip1.png") no-repeat bottom center;
          }
          &.level-2{
            background: url("../../assets/imgaes/vip/vip2.png") no-repeat bottom center;
          }
          &.level-3{
            background: url("../../assets/imgaes/vip/vip3.png") no-repeat bottom center;
          }
          &.level-4{
            background: url("../../assets/imgaes/vip/vip4.png") no-repeat bottom center;
          }
          &.level-5{
            background: url("../../assets/imgaes/vip/vip5.png") no-repeat bottom center;
          }
          &.level-6{
            background: url("../../assets/imgaes/vip/vip6.png") no-repeat bottom center;
          }
          &.level-7{
            background: url("../../assets/imgaes/vip/vip7.png") no-repeat bottom center;
          }
          &.level-8{
            background: url("../../assets/imgaes/vip/vip8.png") no-repeat bottom center;
          }
        }
      }
    }
    .pc-left{
      width: 320px;
      height: 300px; 
      font-size: 22px;
      color: #725431;
      text-align: center;
      .jjtj{
        height:109px;
        padding-top: 20px;
        border-right: 1px solid #EFD08C;
        border-left: 1px solid #EFD08C;
        font-size: 18px;
      }
      .bjtj{
        line-height: 30px;
        height: 75px;
        border: 1px solid #EFD08C;
        border-top: none;
        border-radius: 0 0 10px 10px;
        padding-top: 8px;
        font-size: 18px;
      }
      .title{
        background: linear-gradient(180deg, #D9A678 0%, #EDCBAA 100%);
        color:#fff;
        font-weight: bold;
        height: 52px;
        line-height: 52px;
        font-size: 24px;
        &:nth-child(1){
          border-radius: 10px 10px 0 0 ;
        }
      }
    }
    .vip-zs{
      width: 845px;
      height: 300px;
     
      margin-left: 30px;
     
      th{
         background: linear-gradient(180deg, #D9A678 0%, #EDCBAA 100%);
        color:#fff;
        font-weight: bold;
        height: 52px;
        line-height: 52px;
        font-size: 24px;
         border-radius: 10px 10px 0 0 ;
      }
      tr{
        &:nth-last-child(1){
          td{
            // height: 158px;
            height: 134px;
            line-height: 158px;
            padding: 0;
            &:nth-child(1){
               border-radius: 0 0 0 10px ;
            }
            &:nth-child(4){
               border-radius:0 0 10px 0  ;
            }
          }
         
          
        }
      }
      td{
        width: 33.3%;
        font-size: 22px;
        line-height: 28px;
        color: #725431;
        text-align: center;
        float: left;
        border: 1px solid #EFD08C;
        border-top: none;
        border-right: none;
        // height: 76px;
        height: 100px;
        padding-top: 10px;
        // &:nth-child(2){
        //   width: 23%;
        // }
        // &:nth-child(3){
        //   width: 27%;
        // }
        &:nth-child(3){
          border-right:1px solid #EFD08C;
        }
        >span{
          width: 100%;
        }
      }
    }
    .zx-list{
      padding-top: 34px;
      li{
        width: 288px;
        // height: 320px;
        height: 345px;
        text-align: center;
        float: left;
        overflow: hidden;
       
        .text{
          font-size: 18px;
          color: #333;
          // margin-top: -30px;
        }
        .title{
          font-size: 18px;
          color: #FF0000;
          padding-top: 20px;
        }
      }
    }
    .line{
      width: 1272px;
      position: absolute;
      bottom: -117px;
      left: 59px;
    }
  }
  .tips-box{
    width: 1400px;
    height: 665px;
    background: url("../../assets/imgaes/vip/tips_bg.png") no-repeat center;
    background-size: 100% 100%;
    margin: 59px auto 0;
    h4{
      >div{
        color: #B97C22;
        font-size: 40px;
        line-height:50px;
       -webkit-mask: linear-gradient(to left, #B97C22, transparent );
      //  margin-top: 10px;
       position: relative;
       &:before{
             content: '';
            position: absolute;
            right: 400px;
            top: 23px;
            width: 94px;
            height: 4px;
            /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
            background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
       }
       &:after{
             content: '';
            position: absolute;
            left: 400px;
            top: 23px;
            width: 94px;
            height: 4px;
            /* background: -webkit-gradient(linear, left top, right top, from(#EFD08D), color-stop(97.92%, rgba(239, 208, 141, 0))); */
            background: linear-gradient(90deg, #EFD08D 0%, rgba(239, 208, 141, 0) 97.92%);
            transform: matrix(-1, 0, 0, 1, 0, 0);
       }
    }
    }
    ul{
      padding-left: 97px;
      li{
        line-height: 20px;
        font-size: 18px;
        color: #6C4820;
        overflow: hidden;
        margin-top: 40px;
        .icon{
          display: inline-block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          color: #fff;
          text-align: center;
          background: linear-gradient(47deg, #FF9249, #FFC97B);
          border-radius: 50%;
          float: left;
          margin-right: 9px;
        }
      }
    }
  }
}
</style>