<template>
    <div>
        <div class="popup-wrapper" :class="[boxRight==1?'right13':'',boxRight==2?'right12':'',boxRight==0?'right':'']" v-if="isPopups"  ref="popupWrapper" @click="bgClick" >
            <div class="popups-box" v-show="isPopups">
                <div class="popups-header">
                    <div class="popups-title">{{text.title}}</div>
                    <div v-if="text.closeIsShow" class="el-icon-close" @click="cancel"></div>
                </div>
                <div class="popups-content">
                    <div id="time" ref="time">{{text.duration}}</div>
                    <p :class="text.btn.cancelText == '' && text.btn.confirmText == '' && text.msg.length<12?'pt30':'pb15'">{{text.msg}}</p>
                </div>
                <div class="popups-btns" ref="btnList">
                    <el-button :class="text.btn.cancelClass =='' ?'':text.btn.cancelClass" type="primary" :round="text.isRound"  size="small" v-if="text.btn.cancelText" @click="cancel">{{text.btn.cancelText}}</el-button>
                    <el-button :class="text.btn.confirmClass == ''?'':text.btn.confirmClass" type="primary" :round="text.isRound" size="small" v-if="text.btn.confirmText" @click="confirm">{{text.btn.confirmText}}</el-button>
                </div>
            </div>
        </div>
        <div class="popup-bg" ref="popupBg" :class="[boxRight==1?'right13':'',boxRight==2?'right12':'',boxRight==0?'right':'']" v-if="isPopups"  @click="bgClick"></div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                isPopups:true,
                boxRight:0,
                text:{
                    title:'',
                    msg:'',
                    closeIsShow:false,
                    isRound:'',
                    //duration:'',
                    btn:{
                        cancelText:'',
                        cancelClass:'',
                        confirmText:'',
                        confirmClass:''
                    },
                }
            }
        },
        mounted(){
            this.myBrowser();
            this.GetQueryString();
            console.log(window.location);
            
        },
        
       
        watch: {    

        },
        methods:{
            GetQueryString (){
                var r = window.location.href;
                if(r.indexOf('chat') == -1){
                    this.isPopups = false;
                }
                console.log(r.indexOf('chat'));
                console.log(this.isPopups);
            },
            myBrowser() {
                var browerName = '其他浏览器';
                var ua = navigator.userAgent.toLocaleLowerCase();
                // 判断是否为IE(第一个是正常的IE，第二个是Edge，第三个是IE11)
                var isIE = (ua.indexOf("compatible") > -1 && ua.indexOf("msie") > -1) || (ua.indexOf("edge") > -1) || (ua.indexOf('trident') > -1 && ua.indexOf("rv:11.0") > -1);
                // 判断是否为IE5678，!+[1,] 在IE5678返回true，在IE9、IE10、IE11返回false
                var isLteIE8 = isIE && !+[1,];
                // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
                var dm = document.documentMode,
                    isIE9,
                    isIE10,
                    isIE11;
                if (dm) {
                    isIE9 = dm === 9;
                    isIE10 = dm === 10;
                    isIE11 = dm === 11;
                } else {

                    // 判断IE9，IE9严格模式中函数内部this不为undefined
                    isIE9 = !isLteIE8 && (function () {
                        "use strict";
                        return !!this;
                    }());

                    // 判断IE10，IE10开始支持严格模式，严格模式中函数内部this为undefined
                    isIE10 = isIE && !!document.attachEvent && (function () {
                        "use strict";
                        return !this;
                    }());

                    // 判断IE11，IE11开始移除了attachEvent属性
                    isIE11 = isIE && !document.attachEvent;
                };
                // IE浏览器的判断
                browerName =
                    isIE9 ? 'IE9' :
                    isIE10 ? 'IE10' :
                    isIE11 ? 'IE11' :
                    // 国内套壳浏览器判断
                    (ua.indexOf('qqbrowser') > -1) ? 'QQ浏览器' :
                    // 先判断QQ浏览器再判断搜狗浏览器，因为QQ浏览器也有'se'
                    (ua.indexOf('se') > -1) ? '搜狗浏览器' :
                    (ua.indexOf('aoyou') > -1) ? '遨游浏览器' :
                    (ua.indexOf('theworld') > -1) ? '世界之窗浏览器' :
                    (ua.indexOf('worldchrome') > -1) ? '世界之窗极速浏览器' :
                    (ua.indexOf('greenbrowser') > -1) ? '绿色浏览器' :
                    (ua.indexOf('baidu') > -1) ? '百度浏览器' :
                    (ua.indexOf('firefox') > -1) ? 'firefox' :
                    // 360浏览器判断的特殊方法，打开新页原来的'360'字符串代理已经不显示，方法失效，同时也要晚于搜狗浏览器判断，不然搜狗会被认为360浏览器
                    (window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length) ? '360浏览器' : '其他浏览器';
                // console.log(ua);
                // console.log(browerName);
                if(browerName == '搜狗浏览器' ){
                    this.boxRight =1;
                }else if(browerName == '360浏览器'){
                    this.boxRight =2;
                }else if(browerName != '360浏览器' || browerName != '搜狗浏览器'){
                    this.boxRight =0;
                }

            },
            
            hide(){
                this.isPopups = false;
            },
            bgClick(){
                this.$refs.popupWrapper.remove();
                this.$refs.popupBg.remove();
                this.isPopups = false;
            },
            cancel(){
                this.$refs.popupWrapper.remove();
                this.$refs.popupBg.remove();
                this.isPopups = false;
            },
            confirm(){
                //console.log('确定')
                this.$refs.popupWrapper.remove();
                this.$refs.popupBg.remove();

            }
        }
    }

    //调用方式
    /*this.$myConfirm({
        type:'',
        msg:'投注成功',
        closeIsShow:false,
        isRound:true,
        btn:{
            cancelText:'取消',
            cancelClass:'gray',
            confirmText:'确定',
            confirmClass:'red'
            }
        }).then(() => {
            //console.log('ok')
    })
    .catch(() => {
            //console.log('no')
    })*/
</script>

<style lang="less" scoped>
    .right13{
        right: 13.1% !important;
    }
    .right12{
        right: 12.3% !important;
    }
    .right{
        right: 59px !important;
        // right: 144px !important;
    }
    .popup-wrapper{
        width: 420px;
        height: 820px;
        position: absolute;
        right: 59px;
        top: 112px;
        bottom: 0;
        text-align: center;
        z-index: 101;
        .popups-box{
            display: inline-block;
            width: 250px;
            min-height: 160px;
            vertical-align: middle;
            border-radius: 8px;
            background: #fff;
            backface-visibility: hidden;
            padding-bottom: 10px;
            text-align: center;
            margin-top: 60%;
            .popups-header{
                position: relative;
                padding: 15px 15px 10px;
                position: relative;
                .popups-title{
                    font-size: 20px;
                    color: #333;
                }
                .el-icon-close{
                    cursor: pointer;
                    position: absolute;
                    top: 15px;
                    right: 15px;
                }
            }
            .popups-content{
                line-height: 25px;
                font-size: 18px;
                color: #333;
                padding: 15px 15px 0;
                .pt50{
                    padding-top: 50px;
                }
                .pt30{
                    padding-top: 30px;
                }
                .pt20{
                    padding-top: 20px;
                }
                .pb15{
                    padding-bottom: 15px;
                }
            }
            .popups-btns{
                padding: 5px 15px 0;
                .el-button{
                    width: 90px;
                    height: 40px;
                    color: #fff;
                }
                .gray{
                    color: #666 !important;;
                    background:#F5F7FA !important;
                    box-shadow:1px 4px 8px 0px rgba(202,201,201,0.61) !important;
                }
                .orging{
                    background:linear-gradient(0deg,rgba(255,37,47,1),rgba(254,186,78,1)) !important;
                    box-shadow:1px 4px 8px 0px rgba(253,81,62,0.61) !important;
                }
                .red{
                    background:linear-gradient(90deg,rgba(255,49,49,1),rgba(255,128,103,1)) !important;
                    box-shadow:1px 4px 8px 0px rgba(253,81,62,0.61) !important;
                }
                .round{
                    -webkit-border-radius: 20px;
                    -moz-border-radius: 20px;
                    border-radius: 20px;
                }
            }
        }

    }

    .popup-bg{
        position: absolute;
        right: 59px;
        top: 112px;
        width: 420px;
        height: 820px;
        opacity: .5;
        background: #000;
        z-index: 100;
        &.active{
            z-index: 2001;
         }
    }
</style>