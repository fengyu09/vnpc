<template>
  <div class="allLive-container main-sport">
    <div style="display: flex;width: 100%;padding: 20px 0;">
     <div class="left-menu">
       <ul id="menu1">
         <li  :class="{active:menuActive1==index}" v-for="(item,index) in menuData1" :key="index" >
           <div class="sport-name" @click="openMenu(index,item)"><img :src="item.icon" alt="" srcset=""><span>{{item.name}}</span><img v-if="menuActive1==index" src="../assets/imgaes/Alllive/jt2.png" alt="" srcset=""><img v-else src="../assets/imgaes/Alllive/jt.png" alt="" srcset=""></div>
           <ul>
             <li :class="{active:(item.type==lefttype&&menuActive2==index2)}" v-for="(item2,index2) in item.twoMenu" :key="index2" @click="getLeftContent($event,item.type,item2,index2)">
               <!-- <i></i> -->
               <img class="logo" v-if="item.type=='zq'||item.type=='lq'" :src='item2.league_logo' alt="">
               {{(item.type=='cp'||item.type=='qp')?item2.name:item2.league_name}}
               </li>
           </ul>
         </li>
       </ul>
     </div>
     <div class="allLive-right">
       <div class="right-menu">
         <div class="menu-item" v-for="item,topIndex in topNav" :key="topIndex">
           <span>{{topIndex}}: </span>
           <ul>
            <li  @click="getKjContent($event,vv,topIndex)" v-for="vv,index22 in item" :key="index22">{{topIndex=='主播'||topIndex=='热门'?vv.nickname:vv.name}}</li>
            <!-- <li class="active">足球 </li>
            <li>篮球</li> -->
            <!-- <li>电竞</li> -->
            <!-- <li>彩票</li>
            <li>棋牌</li> -->
           </ul>
            <div v-if="item.length>11" class="more-btn" @click="showMore($event)">
             更多
           </div>
          
         </div>
          <!-- <div class="menu-item">
           <span>快捷: </span>
           <ul>
            <li v-for="item in menuData2" >{{item}} </li>
           </ul>
            <div class="more-btn" @click="showMore($event)">
             更多
           </div>
         </div>
          <div class="menu-item">
           <span>主播: </span>
           <ul>
            <li>英超 </li>
            <li class="active">中超 </li>
            <li>NBA</li>
            <li>CBA</li>
            <li>KPL</li>
           </ul>
         </div>
          <div class="menu-item">
           <span>热门: </span>
           <ul>
            <li>英超 </li>
            <li class="active">中超 </li>
            <li>NBA</li>
            <li>CBA</li>
            <li>KPL</li>
           </ul>
         </div> -->
           <div class="menu-item menu-item2" >
             <div @click="sort='rq'">
               <i> <span v-if="sort=='rq'"></span> </i> <span>人气排行</span>
             </div>
             <div @click="sort='jp'">
               <i> <span v-if="sort=='jp'"></span></i> <span>精品推荐</span>
             </div>
              <div @click="sort='gz'">
               <i> <span v-if="sort=='gz'"></span></i> <span>我的关注</span>
             </div>
         </div>
       </div>
       <div class="live-list">
       <ul class="clearfix">
            <li class="fl" v-for="(item, index) in hotList" :key="index">
              <a href="javascript:;" @click="goChat(item)">
                <div class="hot_one_1">
                  <div class="hot_one_2">
                    <img v-lazy="item.avatar" alt />
                    <div :class="item.name ? 'left_tit' : 'left_titno'" :style="'background:url('+item.background_pc+');background-size:cover'">
                      <!-- <img v-lazy="item.tags[0].icon" alt="" /> -->
                      <i :style="'background:url('+item.tags[0].icon+');display: inline-block;width: 18px;height: 20px;background-size: cover;margin-top: 3px;float: left;margin-right: 6px;'"></i>
                      {{ item.tags[0].title}}
                    </div>
                    <!-- <div class="left_tit left_tit_mr" v-if="!item.tags.length">
                      清纯
                    </div> -->
                    <div class="left_paly"></div>
                  </div>
                  <div class="left_bot" :title="item.live_intro">{{ item.live_intro }}</div>
                 
                  <div class="red-pack" v-if="item.red_paper_num>0"></div>
                  <div class="prop" v-if="item.daxiu==true && item.live_status == 1 "></div>
                </div>
                <p class="nyy"></p>
                <!-- <div class="left_bot">{{ item.live_intro }}</div> -->
                <div class="hot_one_3 clearfix">
                  <div class="hot_name fl clearfix">
                    <div class="fl hot_img">
                      <img v-lazy="item.avatar" alt />
                    </div>
                    <div class="fl name_1">{{ item.nickname }}</div>
                    <div class="fl isLive" v-if="item.live_status == 1">
                      <img src="../assets/imgaes/member/zhibo_ing.gif" alt />
                    </div>
                    <div class="fl isLive" v-else>
                      <img src="../assets/imgaes/main/noLive.png" alt />
                    </div>
                  </div>
                  <div class="hot_tag  hot-num fr clearfix">
                    <div class="fl onlineBox clearfix">
                      <div class="online fl">
                        <img src="../assets/imgaes/main/online.png" alt />
                      </div>
                      <div class="onlineNum fl" v-if="item.online >= 10000">
                        {{ (item.online / 10000).toFixed(1) }}万
                      </div>
                      <div class="onlineNum fl" v-else>{{ item.online }}</div>
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <!-- <li  class="fl" v-for="(item, index) in hotList" :key="index">
              <router-link :to="'/chat/' + item.anchor_id + '/' + item.lottery_id">
                
              </router-link>
            </li> -->
          </ul>
          <p v-if="isLoading">Đang nhận...</p>
          <p v-if="!hotList.length&&!isLoading">nodata</p>
     </div>
     </div>
     </div>
     
  </div>
</template>

<script>
import {removeAllactive,getSiblings} from '../assets/js/public'
export default {
  name: 'allLive',
  data(){
    return{
      menuData1:[
        {type:'zq',name:'足球',icon:require('../assets/imgaes/Alllive/zq.png'),twoMenu:[]},
        {type:'lq',name:'篮球',icon:require('../assets/imgaes/Alllive/lq.png'),twoMenu:[]},
        // {type:'',name:'电竞',icon:require('../assets/imgaes/Alllive/dj.png'),twoMenu:['欧冠','欧冠','欧冠','欧冠','欧冠','欧冠']},
        {type:'cp',name:'彩票',icon:require('../assets/imgaes/Alllive/cp.png'),twoMenu:[]},
        {type:'qp',name:'棋牌',icon:require('../assets/imgaes/Alllive/qp.png'),twoMenu:[]},
        ],
        // menuData2:['英超','中超','NBA','CBA' ,'KPL' ,'LOL' ,'重庆时时彩' ,'澳洲幸运5','急速赛车','急速时时彩','幸运飞艇' ,'澳洲幸运10' ,'百家乐','龙虎斗' ,'虎斗' ,'澳洲幸运10' ,'百家乐'],
        menuActive1:0,
        menuActive2:0,
        // menuActive3:0,
        currType:2,//默认2  左边的  1是右边的
        hotList: [],
        race_type:'zq',
        roomway:'',
        sort:'rq',//默认
        rightType:'',//lx
        lefttype:'zq',
        topNav:{},
        isLoading:false,
        msg:null
    }
  },
  created(){
    // this.getLeftNav();
    // this.getMian();
    // this.getTopKj();
    this.init();
  },
  mounted(){
    // this.getHotLive()
  },
  watch:{
    sort:function(n,o){
      if(this.sort=='gz'&&!this.$store.state.codeToken) {
          this.msg = this.$message({
            duration: 0,
            type: 'warning',
            message: 'Đang đợi....'
        })
        setTimeout(() => {
            this.msg.close()
            this.msg = this.$message({
                duration: 1000,
                type: 'error',
                message: '请先登录'
            })
            this.status = true
        }, 1000)
        this.sort = o;
        return
      }
      if(this.currType==2){
        this.getMian(); 
      }else if(this.currType==1){
        console.log(2)
         this.getKjContent(null,{id:this.roomway},null,this.rightType) 
      }
    
    }
  },
  methods:{
    goChat(item){
      console.log(item);
      if(item.race_type=='zq'||item.race_type=='lq'){
        this.$router.push('/SportChat/' + item.anchor_id)
      }else{
        this.$router.push('/chat/' + item.anchor_id + '/' + item.lottery_id)
      }
      // 
    },
    init(){
      this.getLeftNav('zq');
      this.getLeftNav('lq');
      this.getLeftNav('cp');
      this.getLeftNav('qp');
      this.getTopKj();
    },
    getLeftContent(e,type,v1,index2){
       let curr = e.currentTarget;
       this.currType = 2;
       removeAllactive(document.querySelectorAll('.right-menu .menu-item li'));
      //  removeAllactive(document.querySelectorAll('.left-menu #menu1>li li'));
      //  curr.classList.add('active');
       this.roomway = v1.league_id||v1.type;
       this.lefttype = type;
       this.menuActive2 = index2;
      //  this.race_type = type;
       this.getMian(type,v1,index2)
    },
    async getKjContent(e,v,type,rtype){
      if(e){
        let curr = e.currentTarget;
        removeAllactive(document.querySelectorAll('.right-menu .menu-item li'));
         curr.classList.add('active')
      }
      this.currType = 1;
      
      removeAllactive(document.querySelectorAll('.left-menu #menu1>li li'));
     
      let t='lx';
      if(type=='类型'){
        t='lx';
      }else if(type=='主播'){
        t='zb';
      }else if(type=='热门'){
        t='rm';
      }else if(type=='快捷'){
        t='kj';
      }
      this.rightType = rtype||t;
      this.roomway = v.id;
      this.isLoading = true;
      let res = await this.$http.get(this.versionLive2+'live/pc_label_room/',{params:{
        type:this.rightType,
        roomway:this.roomway,
        sort:this.sort
      }})
      this.isLoading = false;
      this.hotList = res.data.data||[];
    },
    async getLeftNav(type){
      let res = await this.$http.get(this.versionLive2+'live/pc_nav_list/',{params:{race_type:type||this.race_type}})
      for(let i=0,len=this.menuData1.length;i<len;i++){
        if(type==this.menuData1[i].type){
          if(type=='cp'||type=='qp'){
            return this.menuData1[i].twoMenu = res.data.data.list;
          } else{
            this.menuData1[i].twoMenu = res.data.data;
            if(type=='zq'){
              this.roomway = res.data.data.length?res.data.data[0].league_id:'';
              // console.log(this.roomway )
              if(this.roomway){
                 this.getMian();
                
              }else{
                  this.getKjContent();
              }
            }
             return 
          }
       
        }
      }
      
    },
    async getTopKj(){
      let res = await this.$http.get(this.versionLive2+'live/pc_get_label/')
      //判断对象是否为空
      this.topNav = res.data.data;
      // console.log(90909,res.data.data)
    },
    async getMian(){
      //sort rq,jp,gz
      this.isLoading = true;
      let res = await this.$http.get(this.versionLive2+'live/pc_nav_room/',{params:{type:this.lefttype,roomway:this.roomway,sort:this.sort}})
      this.isLoading = false;
      if(res.data.code==1){
        this.hotList = res.data.data||[];
      }else{
         this.msg = this.$message({
            duration: 0,
            type: 'warning',
            message: 'Đang đợi....'
        })
        setTimeout(() => {
            this.msg.close()
            this.msg = this.$message({
                duration: 1000,
                type: 'error',
                message: res.data.msg
            })
            this.status = true
        }, 1000)
      }
     
    },
    openMenu(i,item){
      // this.menuActive2=-1;
      if(i==this.menuActive1){
        this.menuActive1=-1
      }else{
        this.menuActive1=i;
        // this.race_type = item.type;
        // this.getLeftNav();
      }
      
    },
    showMore(e){
    if( e.target.previousElementSibling.style.height=='auto'){
      e.target.previousElementSibling.style.height='26px'
      e.target.classList.remove('active')
    }else{
      e.target.previousElementSibling.style.height='auto'
      e.target.classList.add('active')
    }
     
    },
    //  getHotLive() {
    //   this.$http
    //     .get(this.versionLive2+"live/get_hot_list/", {
    //       params: { limit: 8, page: 1 }
    //     })
    //     .then(res => {
    //       // //console.log(res);
    //       if (res && res.data.code == 1) {
    //         this.hotList = res.data.data || [];
    //       }
    //     });
    // },
  }
}
</script>

<style scoped lang="less">
.allLive-container{
  
  .left-menu{
    width: 180px;
    border-radius: 10px;
    overflow: hidden;
    >ul{
       background: #fff;
      >li{
        height: 50px;
        margin-bottom: 5px;
        overflow: hidden;
        &:last-child{
          margin-bottom: 0;
        }
        &.active{height: auto;}
        .sport-name{
        display: flex;
        padding: 0 18px;
        font-size: 18px;
        color: #fff;
        line-height: 50px;
        background: #1486FF;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        >span{margin-left: -42px;}
        img{height: max-content;}
        }
        ul{
          border-left: 1px solid #E6EAF3;
          border-right: 1px solid #E6EAF3;
          background: #fff;
          li{
            cursor: pointer;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #4C65E3;
          padding-left: 36px;
          &.active{
            background: #F0F2F8;
          }
        }
        }
        img.logo{
          width: 20px;
        }
      }
    }
  }
 .allLive-right{ 
   width: 1100px;
    margin-left: 20px;
    padding-top: 12px;
   .right-menu{
     padding-bottom: 14px;
   .menu-item{
    display: flex;
    margin-bottom: 20px;
      color: #445779;
    &.menu-item2{
      font-size: 18px;
      >div{margin-right: 20px;cursor: pointer;}
      i{
        display: inline-block;width: 20px;height: 20px;border-radius: 50%;border: 2px solid #445779;float: left;margin: -2px 6px 0 0;position: relative;
        span{
          display: inline-block;
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;background:#445779;
         left: 3px;
         top: 3px;
        }
      }
    }
      >span{
        font-size: 24px;
        min-width: 60px;
      }
    ul{
     
      display: flex;
      font-size: 14px;
      height: 26px;
      margin-top: -4px;
      width: 88%;
      flex-wrap: wrap;
      overflow: hidden;
      li{
       line-height: 24px;
      padding: 0 10px;
      cursor: pointer;
      margin-bottom: 6px;
      &.active{
        border: 1px solid #1486FF;
      background: #FFFFFF;
      border-radius: 15px;
      color: #1486FF;
      }
        }
    }
   }
   .more-btn{
     cursor: pointer;
     font-size: 16px;
     img{margin-left: 4px;}
     background: url('../assets/imgaes/Alllive/jt3.png') no-repeat;
     background-position: right;
    background-position-y: 2px;
    width: 56px;
    margin-left: 8px;
    &.active{
      background: url('../assets/imgaes/Alllive/jt4.png') no-repeat;
       background-position: right;
    background-position-y: 2px;
    }
   }
  }}
  .live-list {
      ul {
        li {
          background-color: #ffffff;
          width: 258px;
          border-radius: 5px;
          // height: 260px;
          height: 236px;
          margin-right: 20px;
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .hot_one_1 {
            height: 190px;
            overflow: hidden;
            position: relative;
            color: #fff;
            // transition:  transition 0.1s ease-out;
            // -webkit-transition: transition 0.1s ease-out;
            .left_paly {
              content: "";
              position: absolute;
              width: 44px;
              height: 44px;
              background: url("../assets/imgaes/allIcon.png") no-repeat;
              background-position: -43px 0;
              background-size: 720px 720px;
              top: 73px;
              left: 50%;
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              display: none;
            }
            &:hover img {
              transform: scale(1.1);
            }
            &:hover .left_paly {
              display: block;
            }
            .red-pack {
              position: absolute;
              right: 10px;
              bottom: 70px;
              width: 29px;
              height: 36px;
              background: url("../assets/imgaes/main/hongbao_03-min.png")
                no-repeat;
              background-size: contain;
            }
            .prop{
              position: absolute;
              right: -7px;
              bottom: 19px;
              width: 78px;
              height: 61px;
              background: url("../assets/imgaes/main/td-min.png") no-repeat;
              background-size: contain;
            }
            .left_tit {
              position: absolute;
              left: 0;
              top: 0;
              // width: 76px;
              height: 28px;
              margin-top: 10px;
              border-radius: 0px 8px 8px 0;
              overflow: hidden;
              font-size: 14px;
              color: #fff;
              line-height: 28px;
              text-align: center;
              // padding-right: 10px;
              padding: 0 10px;
            }
            .left_tit_mr {
              background: url("../assets/imgaes/allIcon.png") no-repeat;
              background-position: -92px -177px;
              background-size: 700px 700px;
            }

            .left_right {
              position: absolute;
              bottom: 5px;
              right: 10px;
            }
            img {
              width: 100%;
              transition: all 0.1s ease-out;
              -webkit-transition: all 0.1s ease-out;
              min-height: 160px;
            }
          }
          .nyy{
              position: absolute;
              width: 100%;
              height: 30px;
              top: 160px;
              background: #fff;
              z-index: 1;
            }
          .left_bot {
            position: absolute;
            left: 0;
            bottom: 0;
            line-height: 50px;
            height: 34px;
            margin: 0 10px;
            color: #000;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 167px;
            z-index: 2;
          }
          .hot_one_3 {
            height: 35px;
            padding: 10px 10px 0 10px;

            .hot_name {
              height: 26px;

              .isLive {
                width: 20px;
                height: 14px;
                margin-left: 6px;
                margin-top: 2px;
              }
              .name_1 {
                line-height: 26px;
                font-size: 12px;
                color: #999999;
              }
              .hot_img {
                margin-right: 8px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  height: 100%;
                  width: auto;
                }
              }
            }

            .hot_tag {
              .onlineBox {
                height: 26px;
                .onlineNum {
                  line-height: 26px;
                  color: #999999;
                  font-size: 14px;
                  margin-left: 6px;
                }
                .online {
                  width: 18px;
                  height: 20px;
                  margin-top: 5px;
                  overflow: hidden;
                }
              }
            }
          }
          .onlineNum {
            // line-height: 26px;
            // color: #999999;
            font-size: 12px;
            margin-top: 2px;
            margin-left: 4px;
          }
          .hot-num {
            position: absolute;
            right: 10px;
            bottom: 7px;
            color: #fff;
            z-index: 2;
          }
        }
      }
    }
}

</style>
