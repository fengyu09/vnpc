<template>
    <div class="detail">
        <div class="banner">

        </div>
        <div class="hd-menu">
            <ul>
                <li :class="[{'active':menuActive==item.type&&$st.state.skin==0},{'active-pink':menuActive==item.type&&$st.state.skin==1},{'active-blue':menuActive==item.type&&$st.state.skin==2},{'active-green':menuActive==item.type&&$st.state.skin==3}]" v-for="(item,index) in typeList" :key="index"  @click="menuActive = item.type,type =item.type">
                    <div v-if="$st.state.skin==0">
                        <img v-if="menuActive==item.type" class="icon" :src="item.logo_checked" alt="" srcset="" >
                        <img v-else class="icon" :src="item.logo" alt="" srcset="" >
                    </div>
                    <div v-if="$st.state.skin==1">
                         <img v-if="menuActive==item.type" class="icon" :src="require('../../assets/imgaes/skin/pink/'+menuActive+'.png')" alt="" srcset="" >
                         <img v-else class="icon" :src="item.logo" alt="" srcset="" >
                    </div>
                     <div v-if="$st.state.skin==2">
                         <img v-if="menuActive==item.type" class="icon" :src="require('../../assets/imgaes/skin/blue/'+menuActive+'.png')" alt="" srcset="" >
                         
                         <img v-else class="icon" :src="item.logo" alt="" srcset="" >
                    </div>
                     <div v-if="$st.state.skin==3">
                         <img v-if="menuActive==item.type" class="icon" :src="require('../../assets/imgaes/skin/green/'+menuActive+'.png')" alt="" srcset="" >
                         
                         <img v-else class="icon" :src="item.logo" alt="" srcset="" >
                    </div>
                    <span class="name">{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="yh-list"> 
            <div v-if="activeTask != 'newTask'">
                <div class="list" v-show="dataList.length" v-for="(item,index) in dataList" :key="index" @click="yhdetail(item)">
                    <img :src="item.cover" alt="" >
                    <div class="hot" v-if="item.ishot == 1">
                        <img style="height:58px" v-lazy="item.type_icon" alt="">
                        <span>{{item.type_text}}</span>
                    </div>
                    <div class="hot" v-if="item.ishot == 0">
                        <img style="height:58px" v-lazy="item.type_icon" alt="">
                        <span style="color:#fff;">{{item.type_text}}</span>
                    </div>
                </div>
                <div v-if="dataList.length==0&&!isLoading" class="no-content">
                    <img src="../../assets/imgaes/extend/zanwudashang-min.png" alt="">
                    <span style="display:block;margin-top:30px;">{{$t('welcome[1]')}}!</span>
                </div>
            </div>
            <newTask v-if="activeTask == 'newTask'&&$store.state.codeToken"></newTask>
        </div>
        
    </div>
</template>
<script>
import newTask from "../task/newTask1.vue";
import { alertComfirm } from "../../assets/js/public";
export default {
    data(){
      return{
        //detailContent:'',
        menuActive:0,
        isLoading:false,
        typeList:[],
        dataList:[],
        activeTask:'',
        taskTitle:{
            logo:require('../../assets/imgaes/benefits/task.png'),
            logo_checked: require('../../assets/imgaes/benefits/task-checked.png'),
            name:this.$t('welcome[0]'),
            type:'newTask'
        }
      }
    },
    watch:{
      menuActive:function(i){
          this.activeTask = i;
          if(this.menuActive=='newTask'){
             if (!this.$store.state.codeToken) {
                alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
                this.$store.commit("SETLOGIN", true);
                });
                return;
            }
          }else{
              this.getActivity()
          }
          
      },
    },
    components:{
        //myScroll,
    },
    created(){
        this.detailContent=JSON.parse(window.localStorage.getItem('welcome'))
        this.getActivity();
    },
    methods: {
        async getActivity() {
            this.isLoading = true;
            let res = await this.$http.get('/api/live/sport/get_activity_list/',{params:{
                type:this.menuActive, //优惠类型，固定值0为全部优惠
                client_type:4,  //客户端类型1安卓 2苹果 3h5 4pc
                api:this.noticeTypes==1?1:5,   //线路1官方5代理
                page:1,
                limit:50//最大50
            }});
            this.isLoading = false;
            if (res && res.data.code == 1) {
                this.typeList = res.data.typeList;
                this.typeList.splice(2,0,this.taskTitle)
                this.dataList = res.data.data;
            }
        },
        yhdetail(item){
            console.log(item)
            if(item.action==1){
                window.localStorage.setItem('welcome',JSON.stringify(item))
                window.open('/hdDetail');
            }else{
                // location.href = item.address;
                window.open(item.address)
            }
        }
    },
    components:{
        newTask
    }
}
</script>
<style lang="less" scoped>
.detail{
    text-align: center;
    background: url('../../assets/imgaes/promotions/bj.png') no-repeat;
     background-size: cover;
    // img{
    //    width: 100% !important;
    // }
    .banner{
        width: 100%;
        height: 550px;
        background: url('../../assets/imgaes/promotions/banner2.png') no-repeat;
        background-size: cover;
    }
    .hd-menu{
        width: 1300px;
        margin: 0 auto;
        ul{
            margin: 36px 0;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #1B74C8;
            li{
                width: 176px;
                cursor: pointer;
                height: 86px;
                font-size: 18px;
                // padding-top: 55px;
                padding-bottom: 12px;
                position: relative;
                &.active{
                    color: #1B74C8;
                    border-bottom: 4px solid #1B74C8;
                }
                &.active-pink{
                   color: #FB7772;
                    border-bottom: 4px solid #FB7772; 
                }
                 &.active-blue{
                   color: #00B4D8;
                    border-bottom: 4px solid #00B4D8; 
                }
                 &.active-green{
                   color: #028D66;
                    border-bottom: 4px solid #028D66; 
                }
                .icon{
                    display: block;
                    width: 30px;
                    height: 30px;
                    margin: 0 auto 20px;
                }
            }
        }
    }
    .yh-list{
        overflow: hidden;
    }
    .list{
      width:1000px;
    //   height: 240px;
      position: relative;
      margin: 0 auto;
      margin-bottom: 36px;
      cursor: pointer;
      &:hover{
          cursor: pointer;
      }
      img{
        width: 100%;
      }
      .hot{
        width: 260px;
        height: 53px;
        line-height: 38px;
        position: absolute;
        top: 5px;
        left: -10px;
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
        color: #1486FF;
        position: absolute;
        top: 25px;
        right: 25px;
        cursor: pointer;
        img{
          width: 20px;
          float: right;
        }
      }
    }
}

</style>