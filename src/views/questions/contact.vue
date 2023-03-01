<template>
    <div class="contact">
      <div v-if="$store.state.lanCode==1">
         <!-- <p class="title">联系我们</p> -->
      <p class="con">Chăm sóc khách hàng trực tuyến：<span><a  :href="$store.state.webInitData.customer" target="_blank">7 * 24 Chăm sóc khách hàng trực tuyến</a> </span> </p>
      <p  class="con">Số điện thoại chính thức：{{$store.state.rightLink.officialhot}}</p>
      <p class="con">Dịch vụ khách hàng của Telegram: <a :href="$store.state.rightLink.telegram" target="_blank">{{$store.state.rightLink.telegramzh}}</a> </p>
      <p class="con">dịch vụ khách hàng zalo: <a :href="$store.state.rightLink.zalo" target="_blank">{{$store.state.rightLink.zalozh}}</a> </p>
      <p class="con">dịch vụ khách hàng whatsapp: <a :href="$store.state.rightLink.kefuwhatsapp" target="_blank">{{$store.state.rightLink.kefuwhatsappzh}}</a></p>
      <p class="con">Số liên lạc①: +63 9617058888 </p>
      <p class="con">Số liên lạc②: +63 9617068888</p>
      <p class="title"  style="padding-top:35px">Phương thức liên hệ kế hoạch liên doanh:</p>
      <p class="con">Dịch vụ khách hàng của đại lý Whatsapp: <a :href="$store.state.rightLink.whatsapp" target="_blank">{{$store.state.rightLink.whatsapp}}</a></p>

      <p class="con">Dịch vụ khách hàng của đại lý Telegram: <a :href="$store.state.rightLink.proxytelegram" target="_blank">{{$store.state.rightLink.proxytelegramzh}}</a></p>

    
      <p class="con">Đội ngũ nhân viên chăm sóc khách hàng tận tâm của chúng tôi sẽ tư vấn và hỗ trợ bạn 24/24.</p>
      </div>
      <div v-if="$store.state.lanCode==2||$store.state.lanCode==5">
         <!-- <p class="title">联系我们</p> -->
      <p class="con">Online customer care<span><a  :href="$store.state.webInitData.customer" target="_blank">：7 * 24 Online customer care</a> </span> </p>
      <p  class="con">Official phone number：{{$store.state.rightLink.officialhot}}</p>
      <p class="con">Telegram customer service: <a :href="$store.state.rightLink.telegram" target="_blank">{{$store.state.rightLink.telegramzh}}</a> </p>
      <p class="con">customer service zalo: <a :href="$store.state.rightLink.zalo" target="_blank">{{$store.state.rightLink.zalozh}}</a> </p>
      <p class="con">whatsapp customer service: <a :href="$store.state.rightLink.kefuwhatsapp" target="_blank">{{$store.state.rightLink.kefuwhatsappzh}}</a></p>
      <p class="con">Contact number①: +63 9617058888 </p>
      <p class="con">Contact number②: +63 9617068888</p>
      <p class="title"  style="padding-top:35px">How to contact the joint venture plan:</p>
      <p class="con">Whatsapp agent customer service: <a :href="$store.state.rightLink.whatsapp" target="_blank">{{$store.state.rightLink.whatsapp}}</a></p>

      <p class="con">Telegram agent customer service: <a :href="$store.state.rightLink.proxytelegram" target="_blank">{{$store.state.rightLink.proxytelegramzh}}</a></p>

    
      <p class="con">Our dedicated customer care staff will advise and support you 24/7.</p>
      </div>
     
    </div>

</template>
<script>
export default {
  name: 'contact',
  data(){
    return{
      rightLink:{}
    }
  },
    created() {

    this.rightLink = this.$store.state.rightLink;
    console.log(this.rightLink)
    // console.log(this.lineList)
  },
}
</script>

<style scoped lang="less">
.contact{
  padding: 45px 40px;
  .title{
    font-size: 16px;
    color: #1486ff;
    padding-bottom: 5px;
  }
  .con{
    font-size: 14px;
    color: #71819d;
    line-height: 34px;
    a{
      color: #71819d;
    }

    .fly-icon{
      display:inline-block;
      width:22px;
      height:22px;
      background:url('../../assets/imgaes/leftFooter/flygram-icon.png')no-repeat;
      // position: absolute;
      background-size: contain;
      vertical-align:middle;
       margin-right:10px;
    }
    .photo-icon{
      display:inline-block;
      width:22px;
      height:22px;
      background:url('../../assets/imgaes/extend/potato.png')no-repeat;
      // position: absolute;
      background-size: contain;
      vertical-align:middle;
       margin-right:10px;
    }
    span{
      color: #1486ff;
      a{
         color: #ff1451;
      }
    }
  }
}
</style>