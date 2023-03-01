<template>
    <div class="introduce">
        <img src="../../assets/imgaes/register/in_bg_dlnew.jpg" alt="">
        <div class="load-app" @click="goJc"></div>
<!--        <div class="gw-h" @click="goHome"></div>-->
        <div class="load-app2" @click="goJc"></div>
        <div class="gw-h2" @click="goRegister"></div>
        <div class="load-jc" @click="goJc"></div>
        <div class="contact-us" @click="goLine"></div>
    </div>
</template>

<script>
    export default {
        name: "introduce",
        data(){
            return{
                customer:'',
                code:'',
                loadUriIosCjqVip:'',
                loadUriH5:'',
                loadUriAndroidGf:'',
                loadUriH5Dl:'',
                loadUriAndroidDl:'',
                loadUriIosDl:'',
                loadUriAgent:'',
                loadUriAffical:'',
                vipDj:''
            }
        },
        created(){
            this.getOutLine();
            this.getNewApi();
        },
        methods:{
            getNewApi(){
                this.$http.post('/getNewapi').then(res=>{
                    if(res.data.data.uri_a) this.loadUriIosCjqVip = res.data.data.uri_a;//ios vip 超级签 官方
                    if(res.data.data.uri_b) this.loadUriH5 = res.data.data.uri_b ;//ios h5壳子 选填
                    if(res.data.data.uri_c) this.loadUriAndroidGf = res.data.data.uri_c ; //安卓官方
                    if(res.data.data.uri_f) this.loadUriH5Dl = res.data.data.uri_f ; //ios h5壳子 必填
                    if(res.data.data.uri_d) this.loadUriAndroidDl = res.data.data.uri_d ;//安卓代理
                    if(res.data.data.uri_e) this.loadUriIosDl = res.data.data.uri_e ; //ios vip 超级签 代理
                    if(res.data.line.agent) this.loadUriAgent = res.data.line.agent ; //代理说明链接
                    if(res.data.line.offical) this.loadUriAffical = res.data.line.offical ;//官方说明链接
                })
            },
            goHome(){
              this.$router.push('/');
            },
            goLoadApp(){
                this.$router.push('/download');
            },
            goRegister(){
                if(this.noticeTypes==1){
                    this.$router.push('/register?c='+this.$route.query.c)
                }else {
                    this.$router.push('/RegisterDl?c='+this.$route.query.c)
                }

            },
            goLine(){
                window.location.href = this.customer;
            },
            download(){
                // if(window.android){
                //     this.downLoadUrl('https://www.lgapp8.com/assets/lgzb/lgzb.apk');
                // }else{
                //     var u = navigator.userAgent;
                //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                //     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                //     if(isiOS){
                //         var number = Math.floor(Math.random()*9);
                //         var url = 'https://gf00'+number+'.lgzbapp0.com/udidget.mobileconfig';
                //         window.location.href = url;
                //     }else if(isAndroid)
                //     {
                //         var url = 'https://www.lgapp8.com/assets/lgzb/lgzb.apk';
                //         window.location.href = url;
                //     }
                // }
                console.log(111)
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(this.$store.state.codeToken){
                    if(isiOS){
                        if(this.$$store.state.userinfo.noble>0){
                             window.location.href  = this.loadUriIosDl;
                        }else{
                            //壳子打包的  需要必填 还得加一个包 现在的都是选填
                            window.location.href  = this.loadUriH5Dl;
                        }
                    }else if(isAndroid){
                        window.location.href  = this.loadUriAndroidDl;
                    }
                }else{
                    if(isiOS){
                       window.location.href  = this.loadUriH5Dl;
                    }else if(isAndroid){
                        window.location.href  = this.loadUriAndroidDl;
                    }
                }

            },
            goJc(){
                // window.location.href = 'https://lgapp777.com';
                // window.location.href = this.loadUriAgent;
                window.open(this.loadUriAgent);
            },
            goDownload(){
                // window.open(this.loadUriAgent)
            },
            async getOutLine(){
                let res = await this.$http.get('api/common/siteConfig',{
                    params:{
                        client:4,
                        version:'3.2.1'
                    }
                });
                if(res && res.data.code==1){
                    this.customer = res.data.data.customer;
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .rem(@name,@px){
            @{name}:unit(@px/75,rem)
    }
    .introduce{
        position: relative;
        max-width: 750px;
        margin: 0 auto;
        >div{
            position: absolute;
            cursor: pointer;
        }
        .load-app{
            background: url("../../assets/imgaes/register/load_icon.png") no-repeat;
            height: 52px;
            width: 140px;
            top:15px;
            /*right:170px;*/
            right:10px;
            background-size: contain;
            cursor: pointer;
        }
        .gw-h{
            background: url("../../assets/imgaes/register/home_icon.png") no-repeat;
            background-size: contain;
            height: 52px;
            width: 140px;
            top:15px;
            right:10px;
        }
        .load-app2{
            background: url("../../assets/imgaes/register/load_1_icon.png") no-repeat;
            background-size: contain;
            height: 150px;
            width: 300px;
            top: 880px;
        }
        .gw-h2{
            background: url("../../assets/imgaes/register/now_icon.png") no-repeat;
            background-size: contain;
            height: 150px;
            width: 300px;
            top: 880px;
            right:0;
        }
        .load-jc{
            background: url("../../assets/imgaes/register/load_jc_icon.png") no-repeat;
            height: 75px;
            width: 256px;
            background-size: contain;
            left: 50%;
            transform: translateX(-50%);
            bottom:10px
        }
        .contact-us{
            bottom:120px;
            background: url("../../assets/imgaes/register/contact_icon.png") no-repeat;
            background-size: contain;
            height: 75px;
            width: 256px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>