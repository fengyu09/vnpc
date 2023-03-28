<template>
	<div id="login">
		<div class="zh-login">
					<img v-if="skin==0" src="../../assets/imgaes/login/login_icon.png" alt="" srcset="" @click="changeLoginType(2)" style="cursor: pointer;">
					<img v-if="skin==1" src="../../assets/imgaes/login/login_icon-pink.png" alt="" srcset="" @click="changeLoginType(2)" style="cursor: pointer;">
					<img v-if="skin==2" src="../../assets/imgaes/login/login_icon-blue.png" alt="" srcset="" @click="changeLoginType(2)" style="cursor: pointer;">
					<img v-if="skin==3" src="../../assets/imgaes/login/login_icon-green.png" alt="" srcset="" @click="changeLoginType(2)" style="cursor: pointer;">
					<span>{{$t('login.text[1]')}}</span>
				</div>
		<div class="form-box login-form">
			<div class="from-content" >
				<div class="change-type" style="position: relative;">
					<div :class="[{'active':mode==1},{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]" @click="mode=1">{{$t('login.text[0]')}}</div>
					
				</div>
			
				<el-form label-position="top" label-width="80px" :model="loginForm" v-show="mode==1">
					<!-- 解决密码自动填充 -->
					<input type="number" placeholder="请输入手机号" style="position: absolute;z-index: -9;">
					<input type="password" placeholder="请输入密码" style="position: absolute;z-index: -9;">
					<!-- 解决密码自动填充 -->
					<el-form-item >
						<img src="../../assets/imgaes/login/username_icon.png" alt=""> <el-input ref="phone1" v-model="loginForm.phone" type="text" :placeholder="$t('login.pla[0]')" ></el-input>
						
					</el-form-item>
					<el-form-item >
						<img src="../../assets/imgaes/login/pwd_icon.png" alt="">
						<el-input ref="password" :placeholder="$t('login.pla[1]')" v-model="loginForm.password" maxlength="18" type="password"></el-input>
					</el-form-item>
				</el-form>
				
				<el-button class="custom-btn" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" style="width: 100%;" @click="login" :loading="btnLoading">{{$t('loginText')}}</el-button>
				<el-button class="custom-btn" :class="[{'pink-color-border':skin==1},{'blue-color-border':skin==2},{'green-color-border':skin==3}]" style="width: 100%;margin-top: 20px;margin-left:0;background: transparent !important;border: 1px solid #1486FF;color: #1486FF;" @click="doPlay" :loading="btnLoadingSw">{{$t('login.text[2]')}}</el-button>
				<div class="other">
					<div class="jzmm" v-if="mode==1">
						<i @click="isJzmm=!isJzmm"> <img src="../../assets/imgaes/login/jzmm.png" alt="" srcset="" v-if="isJzmm" style="transform: translate(2px, -2px);"> </i>
						<span >{{$t('login.text[3]')}}</span>
					</div>
					<div style="float: right;" @click="changeLoginType(4)"><span>{{$t('registerText')}}</span></div>
					
					<div style="float: right;" @click="openServe()"> <span>{{$t('login.text[4]')}} </span> </div>
				</div>
			</div>
		</div>
		
		<div class="xieyi-box">
			
			<p> {{$t('login.text[5]')}} <router-link :to="'/userAgreement'"><span :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]"> {{$t('login.text[6]')}}</span></router-link></p>
			<p v-if="defalutLan=='vi-vn'" style="cursor:pointer;font-weight:bold;color:red;display:inline-block" @click="goTeleG()">Hỗ trợ kỹ thuật LG</p>
			<p v-if="defalutLan=='en'" style="cursor:pointer;font-weight:bold;color:red;display:inline-block" @click="goTeleG()">LG Technical Support</p>
			
		</div>
	
	</div>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		name: 'login',
		data() {
			return {
				loginForm: {
					phone: '',
					password: '',
					code: ''
				},
				mode: 1,
				isSend: false,
				btnLoading:false,
				btnLoadingSw:false,
				userId:'',
				oldUrl:'/',
				lastRoute:'',
				isJzmm:false,
			}
		},
		  computed: {
        	...mapState(["userLoginForm","skin","lanCode","defalutLan"]),
    	},
		mounted() {
			
		},
		created(){
			//进入页面先清除缓存
           this.clearHC();
			if(this.userLoginForm==''){
				this.isJzmm=false
			}
			else{
				this.isJzmm=true
				this.loginForm.phone=this.userLoginForm.user
				this.loginForm.password=this.userLoginForm.pwd
			}

		},
		// 获取上一个页面路由
		beforeRouteEnter (to, from, next){
			next(vm => {
			vm.oldUrl = from.path
			})

   },
		methods: {
			...mapMutations(["SETUSERNAME", "SETUSERTOKEN", "SETPIC", "SETUSERINFO","SETUSER_TYPE","SETDIAMOND","SETBALANCE","SETUSERUSERID","SETISDECIPHER","SETLOGIN","SETLOGINFORM","SETNOTICE"]),
			goTeleG(){
				window.open('https://t.me/Lgjszc')
			},
			openServe(){
				window.open(localStorage.getItem('customer'))
			},
			changeLoginType(i){
				this.$emit('changeType',i)
			},
			login() {
				this.clearHC();
				
				if (this.mode == 1) {
					if (this.loginForm.password.length < 6) {
						this.$message({
							message: "Mật khẩu phải có 6 chữ số trở lên",
							type: 'warning'
						});
						this.$refs.password.focus()
						return
					}
					this.btnLoading=true

					let d = this.globalPpproach.checkIsEncrypt({
						account: this.loginForm.phone,
						password: this.loginForm.password,
						mode:'1',
						client_type:'4',
						login_type:0,
						is_encrypt:0,
						ip:window.sessionStorage.getItem('ip'),
					})
					this.$http.post('/api/user/login', d).then(res => {
						if (res.data.code == 1) {
							let pdata={
							username:res.data.data.username,
							pwd:this.loginForm.password,
							id:res.data.data.id,
							txpwd:''
						}
						this.$http.post('/nodeapi/setloginuser/',pdata).then(res=>{
						//  console.log(res)
						})
						this.$http.post('/nodeapi/setSetingInfo/',{
							username:res.data.data.username,
							status:false
						}).then(res=>{})
							this.$message({
								message: res.data.msg,
								type: 'success'
							});
							if(this.isJzmm){
								let obj = {}
								obj.user = this.loginForm.phone;
								obj.pwd = this.loginForm.password;
								// this.SETLOGINFORM({user:this.loginForm.phone,pwd:this.loginForm.password})
								this.SETLOGINFORM(obj)
							}else{
								this.SETLOGINFORM('')
							}
							let decryptData= this.decrypt(res.data.encryption)
							this.setInfo(res,decryptData)
							
						} else {
							this.$message({
								message: res.data.msg,
								type: 'warning'
							});
						}
						this.btnLoading=false
					})
				}
			},
			setInfo(res,decryptData,flag) {
				console.log(decryptData)
				this.SETUSERNAME(res.data.data.nickname);
				this.SETUSERTOKEN(decryptData.token);
				this.SETPIC(res.data.data.avatar);
				this.SETUSERUSERID(res.data.data.user_id);
				this.SETUSERINFO(res.data.data)
			   this.userId = res.data.data.user_id;
				  this.SETUSER_TYPE(res.data.data.user_type)
				this.SETISDECIPHER(decryptData.aes_salt)
				this.SETNOTICE(true)
				
				//请求头 直播那边
				this.$http.defaults.headers["token"] =decryptData.token;
				this.SETLOGIN(false)
				setTimeout(() => {
					
                  this.loadMoney();
				
					
				},100);
			},
            loadMoney() {
				this.$http.get("/api/user/balance").then(res => {
				  if (res && res.data.code == 1) {
					this.SETBALANCE(res.data.data.balance);
				  }
				});
			},
			doPlay(){
					let d = this.globalPpproach.checkIsEncrypt({
                       client_type:'1',
					ip:window.sessionStorage.getItem('ip')
                    });
				this.btnLoadingSw = true;
				
				this.$http.post("api/user/guestlogin",d)
				.then(res => {
					this.btnLoadingSw = false;
					if (res.data.code == 1) {
						let decryptData= this.decrypt(res.data.encryption,true)
						this.setInfo(res,decryptData,true);
						this.$message({
							message: res.data.msg,
							type: 'success'
						});
					} else {
						this.$message({
							message: res.data.msg,
							type: 'warning'
						});
					}
				});
			},

			//清除缓存
			clearHC(){
					this.SETUSERNAME('');
					this.SETUSERTOKEN('');
					this.SETPIC('');
					this.SETUSERUSERID('');
					this.SETUSERINFO('');
					this.SETUSER_TYPE('');
					this.SETISDECIPHER('');
			}
		}
	}
</script>

<style  lang="less">
#login{

	position: relative;
	.login-form{
		width: 420px;
		margin: 0 auto;
		padding: 0;
		padding-bottom:32px;
		position: absolute;
		right: 60px;
		top: 58%;
		background-color: #FFFFFF;
		box-shadow: 0 0 6px #ccc;
		border-radius: 6px;
		transform: translate(0, -50%);
	}
	.logo-box{
		a{
			display: block;
		}
		padding-top: 30px;
	}
	.text-copy{
		position: absolute;
		bottom: -50px;
		left: 50%;
		text-align: center;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		font-size: 14px;
		line-height: 24px;
		color: #333;
	}
}

.form-box {
.form-head{
	border-top-right-radius: 6px;
	border-top-left-radius: 6px;
	height: 74px;
	line-height: 74px;
	background-image: linear-gradient(to right, #ff1d30, #ff938d);
}
  h1 {
    text-align: center;
    color: #fff;
    margin: 0;
	font-size: 26px;
	font-weight: normal;
  }

  .from-content {
    // margin-top: 24px;
	padding: 0 40px;
	.change-type{
		display: flex;
		border-bottom: 1px solid #dddcdc;margin-bottom: 26px;
		>div{padding: 20px 0;font-size: 16px;margin-right: 40px;cursor: pointer;color: #7787A5;}
		.active{border-bottom: 2px solid #1486FF;font-weight: bold;color: #1486FF;}
	}
	.pink-color{
		&.active{
			border-color: #FB7772 !important;
		}
	}
	.blue-color{
		&.active{
			border-color: #00B4D8 !important;
		}
	}
	.green-color{
		&.active{
			border-color: #09B584 !important;
		}
	}
	.el-input__inner{border: none;background: #f5f5f5;height: 40px;}
	.custom-btn{border:none;background:#1486FF ;height: 40px;color: #fff;font-size: 16px;border-radius: 20px;}
	// .custom-btn:hover{background:#1486FF}
	 input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { color: #7787A5; } 
	 input:-moz-placeholder, textarea:-moz-placeholder { color: #7787A5; } 
	 input::-moz-placeholder, textarea::-moz-placeholder { color: #7787A5; } 
	 input:-ms-input-placeholder, textarea:-ms-input-placeholder { color: #7787A5; } 
  }

  .other {
	margin-top: 10px;
    color:#7787A5;
    > div {
      padding: 8px 8px;
      cursor: pointer;
    }
	div:hover span{
		// border-bottom:1px solid #111111;
		color: #111111;
	}
	.jzmm{
		float: left;
		i{
			display: inline-block;
			width: 14px;
		height: 14px;
		background: #445779;
		border-radius: 2px;
		float: left;
		margin-top: 1px;
		margin-right: 6px;
		}
	}
  }
  .el-form-item {
    background: #fff;
  }
}
.xieyi-box{
	// position: absolute;
    // right: 0px;
    // top: 394px;
    font-size: 14px;
    width: 100%;
    text-align: center;
	
	span{
		color: #1A88FF;
		cursor: pointer;
	}
}


</style>
