<template>
	<div id="newLogin">
      
        <div class="login-main">
              <div style="position: absolute;top: -40px;right: -34px;cursor: pointer;" @click="hideLoginBox">
            <img src="../../assets/imgaes/login/x.png" alt="" srcset="">
        </div>
        <div class="login-banner">
             <el-carousel height="372px"  indicator-position="outside" arrow="never">
                <el-carousel-item v-for="v,index in bannerList" :key="index" >
                  <img v-lazy="v.image_url" alt="" srcset="" @click="goUrl(v)">
                </el-carousel-item>
                <!-- <el-carousel-item >
                  <img src="../../assets/imgaes/login/2.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/3.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/4.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/5.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/6.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/7.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/8.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/9.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/10.png" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/12.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/13.jpg" alt="" srcset="">
                </el-carousel-item>
                <el-carousel-item >
                  <img src="../../assets/imgaes/login/14.jpg" alt="" srcset="">
                </el-carousel-item> -->

      
           </el-carousel>
           
        </div>
	<Pwdlogin v-if="loginType==1" @changeType="changeType"></Pwdlogin>
    <smLogin v-if="loginType==2" @changeType="changeType"></smLogin>
    <FpwdRel  v-if="loginType==3" @changeType="changeType"></FpwdRel>
    <register v-if="loginType==4&&noticeTypes==1" @changeType="changeType"></register>
    <registerDl v-if="loginType==4&&noticeTypes==2" @changeType="changeType"></registerDl>
         </div>
	</div>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex";
  import Pwdlogin from './login.vue'
  import smLogin from './smLogin.vue'
  import FpwdRel from './fPwdTel.vue'
  import register from './register.vue'
  import registerDl from './registerDl.vue'
	export default {
		name: 'login',
		data() {
			return {
				loginType:1,
        bannerList:[],
			}
		},
       components: { Pwdlogin, smLogin,FpwdRel,register,registerDl},
        computed: {
        ...mapState(["isLogin","lanCode"]),
    },
		mounted() {
			
		},
		created(){
            if(this.isLogin){
                this.loginType=1
            }
            else{
                this.loginType=4
            }
            this.getBanner();
		},
        methods:{
            ...mapMutations(["SETLOGIN","SETISLOGIN"]),
            changeType(v){
                this.loginType=v
            },
            hideLoginBox(){
                this.SETLOGIN(false)
                 this.SETISLOGIN(true)
            },
            async getBanner(){
              let res = await this.$http.get('/api/live/sport/get_register_banner');
              this.bannerList = res.data.data||[];
            },
            goUrl(v){
              
              console.log(v);
              if(v.url){
                window.open(v.url)
              }
              
            }
        }
	
	}
</script>

<style  lang="less">
#newLogin{
	
	position: fixed;
    width: 100%;
    height: 100%;
    background:rgba(64,61,61, 0.45);
    top: 0;
    left: 0;
    z-index: 1000;
    .login-banner{
        .el-carousel__arrow{
    width: 46px;
    height: 80px;
    background: #000000;
    opacity: 0.3;
    font-size: 40px;
  }
  .el-carousel__arrow--left{
    border-radius: 0px 8px 8px 0px;
    left: 0;
  }
  .el-carousel__arrow--right{
    border-radius: 8px 0px 0px 8px;
    right: 0;
  }
  .el-carousel__indicators--horizontal{
   position: absolute;
    left: 46%;
    bottom: 8px;
  }
  .el-carousel__indicator{
    width: 16px;
    height: 16px;
    padding: 0;
    margin-right: 10px;
  }
  .is-active{
    .el-carousel__button{
      background: #fff;
      border: 1px solid #1486FF;
    }
  }
  .el-carousel__button{
     width: 16px;
    height: 16px;
    background: none;
    border: 1px solid rgba(#fff,#fff,#fff,1);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    margin-right: 54px;
    position: relative;
    &::before{
        content: '';
        width: 8px;
        height: 8px;
        background: #1486FF;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        position: absolute;
        left: 3px;
        top:3px;
      }
  }
    }
    .login-main{
        width: 1130px;
        height: 520px;
        background: #fff;
        border-radius: 10px;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        justify-content: space-evenly;;
        align-items: center;
        .login-form{
        position: static;
		width: 376px;
        margin: 0;
		padding: 0;
		padding-bottom:32px;
		background-color:none;
		box-shadow:none;
		
		transform: translate(0, 0);
        .from-content {padding: 0 4px;}
    
	}
    .form-box .from-content .el-input__inner{
        background: #E8F1FF;
        border-radius: 20px;
        padding-left: 42px;
    }
    .el-form-item .el-form-item__content{
    img{
            position: absolute;
    z-index: 9;
    top: 10px;
    left: 12px;
    }
    .eye-btn{
        left: 328px;
    top: 14px;
    cursor: pointer;
    }
    }
    .login-banner{
        width: 657px;height: 372px;
        img{width: 657px;}
    }
    #login{
        height: 100%;
    display: flex;
    align-items: center;
     .zh-login{
		position: absolute;
		right: -6px;
    	top: 8px;
        z-index: 9;
		span{
			position: absolute;
			display: block;
			width: 221px;
            height: 20px;
            left: -214px;
    		top: 0px;
			background: url('../../assets/imgaes/login/textBg.png');
			line-height: 20px;
			font-size: 12px;
			color: #7787A5;
            text-align: center;
            background-size: cover;
		
		}
		}
    }
    .xieyi-box{
	position: absolute;
    right: -32px;
    bottom: 15px;
    font-size: 14px;
    // width: 116%;
    width: 125%;
    text-align: center;
	span{
		color: #1A88FF;
		cursor: pointer;
	}
}
.form-box{
   .form-head{
       position: relative;
		height: 50px;
		line-height: 50px;
		background: #fff;
		border-bottom: 1px solid #E8F1FF;
        &:after{
            content: '';
            display: block;
            width: 90px;
            height: 2px;
            position: absolute;
            background: #1486FF;
            left: 50%;
            transform: translateX(-50%);
        }
        h1{color: #1A88FF;font-size: 22px;}

	}
    .el-form-item{margin-bottom: 18px;}
}
    }
   
}


.refresh-icon{
	width: 15px;
	height: 15px;
	background: url(../../assets/imgaes/refresh.png) no-repeat;
	background-size: contain;
    position: absolute;
    top: 13px;
    right: 110px;
    cursor: pointer;
}
.yzm-box{
	position: absolute;
	height: 30px;
	width: 90px;
	top: 6px!important;
	right: 10px!important;
	border-radius: 30px;
    left: auto!important;
    margin: 0 !important;
}

</style>
