<template>
    <div class="main Introduction">
        <h4>
            {{$t('Introduction.title[0]')}}
        </h4>
        <p class="pl29">{{$t('Introduction.text1[0]')}}
            <br>{{$t('Introduction.text1[1]')}}
            <br>{{$t('Introduction.text1[2]')}}
        </p>
        <h4>
            {{$t('Introduction.title[1]')}}
        </h4>
        <ul class="ys-list">
            <li>
                <img src="../../../assets/imgaes/virtual/gdjm.png" alt="">
                <h5>{{$t('Introduction.text2.title[0]')}}</h5>
                <p>{{$t('Introduction.text2.text[0]')}}</p>
            </li>
            <li>
                <img src="../../../assets/imgaes/virtual/jysd.png" alt="">
                <h5>{{$t('Introduction.text2.title[1]')}}</h5>
                <p>{{$t('Introduction.text2.text[1]')}}</p>
            </li>
            <li>
                <img src="../../../assets/imgaes/virtual/qzxh.png" alt="">
                <h5>{{$t('Introduction.text2.title[2]')}}</h5>
                <p>{{$t('Introduction.text2.text[2]')}}</p>
            </li>
        </ul>
        <h4>
            {{$t('Introduction.title[2]')}}
            </h4>
        <ul class="ys-list">
            <div class="list-title">{{$t('Introduction.text3.tip')}}</div>
            <li>
                <img src="../../../assets/imgaes/virtual/gbfx.png" alt="">
                <h5>{{$t('Introduction.text3.content.title[0]')}}</h5>
                <p>{{$t('Introduction.text3.content.text[0]')}}</p>
            </li>
            <li>
                <img src="../../../assets/imgaes/virtual/bjzg.png" alt="">
                <h5>{{$t('Introduction.text3.content.title[1]')}}</h5>
                <p>{{$t('Introduction.text3.content.text[1]')}}</p>
            </li>
            <li>
                <img src="../../../assets/imgaes/virtual/ltsd.png" alt="">
                <h5>{{$t('Introduction.text3.content.title[2]')}}</h5>
                <p>{{$t('Introduction.text3.content.text[2]')}}</p>
            </li>
        </ul>
        <h4 class="last-h4">
            {{$t('Introduction.title[3]')}}
        </h4>
        <p class="blue"><router-link to="/Tutorials?type=1">{{$t('Introduction.text4.tip1')}}</router-link></p>
        <ul class="jypt clearfix">
            <li @click="goUrl(1)">
                <img src="../../../assets/imgaes/virtual/bh.png" alt="">
                <h5>{{$t('Introduction.text4.content.title[0]')}}</h5>
                <img class="icon" src="../../../assets/imgaes/virtual/1.png" alt="">
                <p>{{$t('Introduction.text4.content.text[0]')}}</p>
            </li>
            <li  @click="goUrl(2)">
                <img src="../../../assets/imgaes/virtual/hb.png" alt="">
                <h5>{{$t('Introduction.text4.content.title[1]')}}</h5>
                <img class="icon" src="../../../assets/imgaes/virtual/1.png" alt="">
                <p>{{$t('Introduction.text4.content.text[1]')}}</p>
            </li>
            <li  @click="goUrl(3)">
                <img src="../../../assets/imgaes/virtual/ba.png" alt="">
                <h5>{{$t('Introduction.text4.content.title[2]')}}</h5>
                <img class="icon" src="../../../assets/imgaes/virtual/1.png" alt="">
                <p>{{$t('Introduction.text4.content.text[2]')}}</p>
            </li>
        </ul>
        <p class="remark">{{$t('Introduction.text4.tip2')}}</p>
    </div>
</template>
<script>
export default {
    methods:{
        goUrl(n){
            let url=''
            if(n==1){
                url = 'https://www.coinhui.net/';
            }else if(n==2){
                url = 'https://www.huobi.com/zh-cn/';
            }else if(n==3){
                url = 'https://www.binance.com/zh-CN';
            }
            window.open(url)
        }
    }
}
</script>
<style lang="less" scoped>
    .Introduction{
        background: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
        overflow: hidden;
        h4{
            text-align: center;
            padding-top: 30px;
            margin-bottom: 20px;
            color: #FF5D6C;
            font-size: 24px;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                width: 90px;
                height: 10px;
                background: url('../../../assets/imgaes/virtual/left.png') no-repeat;
                background-size: contain;
                left: 360px;
                top: 36px;
            }
            &::after{
                content: '';
                position: absolute;
                width: 90px;
                height: 10px;
                background: url('../../../assets/imgaes/virtual/right.png') no-repeat;
                background-size: contain;
                right: 360px;
                top: 36px;
            }
            &.last-h4{
                &::after{
                    right: 229px;
                }
                &::before{
                    left: 229px;
                }
            }
        }
        p{
            font-size: 12px;
            color: #333;
            &.pl29{
                line-height: 30px;
                padding-left: 29px;
            }
        }
        .blue{
            font-weight: bold;
            font-size: 16px;
            text-align: center; 
           a{
                color: #448aff;
           }
        }
        .ys-list{
            overflow: hidden;
            .list-title{
                padding-left: 29px;
                margin-bottom: 35px;
            }
            li{
                width: 360px;
                height: 180px;
                border-radius: 10px;
                box-shadow: 0px 0px 12px 0px rgba(255, 49, 49, 0.2);
                float: left;
                margin: 15px 0 15px 30px;
                padding: 30px 0px 0 20px;
                img{
                    width: 70px;
                    float: left;
                    margin-right: 18px;
                }
                h5{
                    font-size: 16px;
                    color: #333;
                    padding-bottom: 5px;
                }
                p{
                    width: 238px;
                    line-height: 20px;
                    float: left;
                }
            }
        }
        .jypt{
            li{
                width: 555px;
                height: 160px;
                border-radius: 10px;
                box-shadow: 0px 0px 12px 0px rgba(255, 49, 49, 0.2);
                float: left;
                margin: 15px 0 15px 30px;
                padding: 30px 0px 0 52px;
                position: relative;
                cursor: pointer;
                img{
                    width: 52px;
                    float: left;
                    margin-right: 28px;
                    &.icon{
                        width: 31px;
                        position: absolute;
                        top: 33px;
                        right: 35px;
                    }
                }
                h5{
                    font-size: 16px;
                    color: #333;
                    padding-bottom: 15px;
                }
                p{
                    width: 238px;
                    line-height: 20px;
                    float: left;
                }
            }
        }
        .remark{
            font-size: 12px;
            color: #FF3131;
            padding: 40px 0;
            text-align: center;
        }
    }
</style>