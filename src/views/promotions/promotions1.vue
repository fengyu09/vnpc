<template>
  <div class="promotions">
    <div  class="banner"><img src="../../assets/imgaes/promotions/banner.png" alt=""></div>
    <div class="w1200 clearfix">
      <nav class="nav-list fl">
        <h4>优惠活动</h4>
        <span   :class="{active:navIndex==index}" v-for="(item,index) in typeList" :key="index"  @click="navIndex = index,type =item.type">
          <img  class="icon" :src="item.logo" alt="">
          {{item.name}}
        </span>
      </nav>
      <div class="list-box fl clearfix">
        <div class="list list-1" v-show="dataList.length" v-for="(item,index) in dataList" :key="index" @click="yhdetail(item)">
          <img :src="item.cover" alt="" >
          <div class="hot" v-if="item.ishot == 1">
            <img :src="item.type_icon" alt="">
            <span>{{item.type_text}}</span>
          </div>
          <div class="hot" v-if="item.ishot == 0">
            <img :src="item.type_icon" alt="">
            <span style="color:#fff;">{{item.type_text}}</span>
          </div>
          <!-- <span class="hot" v-if="item.ishot == 1"></span> -->
          <span class="link">查看详情 <img src="../../assets/imgaes/promotions/jt.png" alt=""></span>
        </div>
        <div v-if="dataList.length==0&&!isLoading" class="no-content">
            <img src="../../assets/imgaes/extend/zanwudashang-min.png" alt="">
            <span style="display:block;margin-top:30px;">Không có dữ liệu!</span>
        </div>
        <!-- <div class="list list-2">
          <router-link to="/downloadGF">查看详情</router-link>
        </div>
        <div class="list list-3">
          <router-link to="/winorlose">查看详情</router-link>
        </div>
        <div class="list list-4">
          <router-link to="/firstDepositOffer">查看详情</router-link>
        </div>
        <div class="list list-5">
          <router-link to="/weekendBoost">查看详情</router-link>
        </div>
        <div class="list list-6">
          <router-link to="/callingFriends">查看详情</router-link>
        </div>
        <div class="list list-7">
          <router-link to="/friendsReturn">查看详情</router-link>
        </div>
        <div class="list list-8">
          <router-link to="/courtesy">查看详情</router-link>
        </div>
        <div class="list list-9">
          <router-link to="/sportsBetting">查看详情</router-link>
        </div>
        <div class="list list-10">
          <router-link to="/chessRebate">查看详情</router-link>
        </div>
        <div class="list list-11">
          <router-link to="/sportsStreak">查看详情</router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navIndex:0,
      type:0,
      typeList:[],
      dataList:[],
      isLoading:false,
    }
  },
  watch:{
      navIndex:function(i){
          this.getActivity()
      }
  },
  created() {
    this.getActivity();
  },
  methods: {
    navType:function (type) {
        this.navIndex = type;
        this.getActivity(this.navIndex);
    },
    async getActivity() {
      console.log(this.type)
      this.isLoading = true;
      let res = await this.$http.get('/api/v2/live/get_activity_list/',{params:{
        type:this.type, //优惠类型，固定值0为全部优惠
        client_type:4,  //客户端类型1安卓 2苹果 3h5 4pc
        api:this.noticeTypes==1?1:5,   //线路1官方5代理
        page:1,
        limit:100
      }});
      this.isLoading = false;
      if (res && res.data.code == 1) {
        console.log(res.data);
        this.typeList = res.data.typeList;
        this.dataList = res.data.data;
        console.log( this.dataList)
      }
    },
    yhdetail(item){
        console.log(item)
        if(item.action==1){
          window.localStorage.setItem('welcome',JSON.stringify(item))
          // this.$router.push('/welcome')
          // let  routeData = this.$router.resolve({ path: '/welcome' });
          window.open('/welcome');
        }else{
          location.href = item.address;
            // window.open(item.address)
        }
    }
  }
}
</script>

<style lang="less" scoped>
.w1200{
  width: 1211px;
  margin: 0 auto;
}
.promotions{
  background: #fff;
}
  .banner{
    img{
      width: 100%;
    }
  }
  .nav-list{
    width: 200px;
    background: #fff;
    border-radius: 10px;
    float: left;
    margin-top: 46px;
    padding: 0 20px;
    box-shadow:0px 0px  10px 5px  #fff3f3;
    h4{
      line-height: 78px;
      font-weight: normal;
      font-size: 24px;
      color: #333;
      padding-left: 20px;
      margin-bottom: 14px;
      position: relative;
      border-bottom:1px solid #FF0000;
      &:after{
        content: '';
        width: 4px;
        height: 25px;
        background: linear-gradient(90deg, #FF413C, #FFA797);
        border-radius: 2px;
        position: absolute;
        left:-20px;
        top: 25px;
      }
    }
    >span{
      display: block;
      width: 160px;
      line-height: 28px;
      font-size: 18px;
      color: #999;
      margin-left: 20px;
      margin-bottom: 42px;
      cursor: pointer;
      &.active{
        color: #FF3131;
        transform: scale(1.15);
        margin-bottom: 36px;
        margin-left: 30px;
        .icon{
          transform: scale(1.15);
        }
      }
      .icon{
        width: 28px;
        height: 28px;
        margin-right: 13px;
        float: left;
        transition: all 0.6s;
        // &.icon-0{
        //   background: url('../../assets/imgaes/promotions/qbyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        // &.icon-1{
        //   background: url('../../assets/imgaes/promotions/scyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        //  &.icon-2{
        //   background: url('../../assets/imgaes/promotions/cpyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        //  &.icon-3{
        //   background: url('../../assets/imgaes/promotions/qpyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        // &.icon-4{
        //   background: url('../../assets/imgaes/promotions/zryh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        // &.icon-5{
        //   background: url('../../assets/imgaes/promotions/tyyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        // &.icon-6{
        //   background: url('../../assets/imgaes/promotions/yxjh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        //  &.icon-7{
        //   background: url('../../assets/imgaes/promotions/jjyh.png') no-repeat;
        //   background-size: 100% 100%;
        // }
        //  &.icon-8{
        //   background: url('../../assets/imgaes/promotions/hlzs.png') no-repeat;
        //   background-size: 100% 100%;
        // }
      }
    }
  }
  .list-box{
    width: 1000px;
    min-height: 450px;
    margin-top: 24px;
    margin-left: 10px;
    margin-bottom: 45px;
    .list{
      width: 1000px;
      height: 360px;
      position: relative;
      img{
        width: 100%;
      }
      .hot{
        width: 120px;
        height: 53px;
        line-height: 35px;
        position: absolute;
        top: 27px;
        left: 24px;
        span{
          font-family: 'MicrosoftYaHei';
          font-style:italic;
          font-size: 18px;
          color: #60353D;
          position: absolute;
          top: 5px;
          left: 22px;
        }
      }
      .link{
        width: 90px;
        line-height: 25px;
        font-family: 'MicrosoftYaHei';
        font-size: 16px;
        color: #FF3131;
        position: absolute;
        top: 25px;
        right: 25px;
        cursor: pointer;
        img{
          width: 20px;
          float: right;
        }
      }
      // &.list-1{
      //   background: url("../../assets/imgaes/promotions/pic_01.png") no-repeat;

      // }
      // &.list-2{
      //   background: url("../../assets/imgaes/promotions/pic_02.png") no-repeat;

      // }
      // &.list-3{
      //   background: url("../../assets/imgaes/promotions/pic_03.png") no-repeat;

      // }
      // &.list-4{
      //   background: url("../../assets/imgaes/promotions/pic_04.png") no-repeat;

      // }
      // &.list-5{
      //   background: url("../../assets/imgaes/promotions/pic_05.png") no-repeat;

      // }
      // &.list-6{
      //   background: url("../../assets/imgaes/promotions/pic_06.png") no-repeat;

      // }
      // &.list-7{
      //   background: url("../../assets/imgaes/promotions/pic_07.png") no-repeat;

      // }
      // &.list-8{
      //   background: url("../../assets/imgaes/promotions/pic_08.png") no-repeat;

      // }
      // &.list-9{
      //   background: url("../../assets/imgaes/promotions/pic_09.png") no-repeat;

      // }
      // &.list-10{
      //   background: url("../../assets/imgaes/promotions/pic_10.png") no-repeat;

      // }
      // &.list-11{
      //   background: url("../../assets/imgaes/promotions/pic_11.png") no-repeat;

      // }
    }
  }
  .no-content{
    width: 100%;
    min-height: 430px;
    font-size: 18px;
    color: #666;
    text-align: center;
    background: #fff;
    padding-top: 100px;
    margin-top: 40px;
    border-radius: 10px;
    box-shadow:0px 0px  10px 5px  #fff3f3;

  }
</style>