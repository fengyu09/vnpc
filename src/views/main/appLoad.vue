<template>
  <div id="appLoad" style="background: #fff">
    <div class="bg">
      <div class="download clearfix w">
        <!-- 二维码 -->
        <div :class="currr == 0 ? 'code' : 'code1'" id="code"></div>
        <!-- 按钮 -->
        <div class="dow fl">
          <div class="ios" id="ios" @click="ios()">
            <a href="javascript:;"
              ><img
                v-if="currr == 0"
                src="../../assets/imgaes/load/ios-active.png"
                alt="" /><img
                v-if="currr == 1"
                src="../../assets/imgaes/load/ios.png"
                alt=""
            /></a>
          </div>
          <div class="anzhuo" id="anzhuo" @click="anzuo()">
            <a href="javascript:;">
              <img
                v-if="currr == 0"
                src="../../assets/imgaes/load/anzhuo.png"
                alt=""
              />
              <img
                v-if="currr == 1"
                src="../../assets/imgaes/load/android-active.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="w content">
      <div class="one_one">
        <ul class="clearfix">
          <li class="fl">
            <a target="_blank" href="https://www.lgzb18.com"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/1-min.png" alt="" />
              </div>
              <div>线路一</div></a
            >
          </li>
          <li class="fl">
            <a target="_blank" href="https://www.lgzb28.com"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/2-min.png" alt="" />
              </div>
              <div>线路二</div></a
            >
          </li>
          <li class="fl">
            <a target="_blank" href="https://www.lgzb68.com"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/3-min.png" alt="" />
              </div>
              <div>线路三</div></a
            >
          </li>
          <li class="fl">
            <a target="_blank" href="https://lgzb18.com"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/4-min.png" alt="" />
              </div>
              <div>线路四</div></a
            >
          </li>
          <li class="fl">
            <a
              target="_blank"
              href="https://alni.otixz.com/chat/chatClient/chatbox.jsp?companyID=80005980&configID=333"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/5-min.png" alt="" />
              </div>
              <div>Chăm sóc khách hàng trực tuyến</div></a
            >
          </li>
          <li class="fl" id="QQ">
            <a
              href="http://wpa.qq.com/msgrd?v=3&uin=80003078&site=qq&menu=yes"
              target="_blank"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/6-min.png" alt="" />
              </div>
              <div>QQ客服</div></a
            >
          </li>
          <li class="fl" id="code123" @click="changeC()">
            <a href="javascript:;"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/7-min.png" alt="" />
              </div>
              <div>微信公众号</div></a
            >
          </li>
          <li class="fl" id="email" @click="changeE()">
            <a href="javascript:;"
              ><div class="img_1">
                <img src="../../assets/imgaes/load/8-min.png" alt="" />
              </div>
              <div>Liên hệ chúng tôi</div></a
            >
          </li>
        </ul>
      </div>
      <div class="newOne">
        <div class="btn">
          <a target="_blank" href="https://noone.ltd/lgzb08"
            ><img src="../../assets/imgaes/load/loadBtn.png" alt=""
          /></a>
        </div>
        <div class="jiaru">
          <img src="../../assets/imgaes/load/dowCode-min.png" alt="" />
        </div>
      </div>
      <div class="one"></div>
      <div class="two"></div>
      <div class="therr"></div>
      <!-- <div class="qq " hidden>
        <div class="close" id="close1">
          <img src="../../assets/imgaes/load/close_03-min.png" alt="" />
        </div>
        <div class="qqLogo"><img src="../../assets/imgaes/load/qq_03-min.png" alt="" /></div>
        <div class="qqNum">QQ客服：80003078</div>
      </div> -->
      <div class="email" v-if="curr == 1">
        <div class="close" id="close2" @click="close()">
          <img src="../../assets/imgaes/load/close_03-min.png" alt="" />
        </div>
        <!-- <div style="margin: 120px 0 0 0;">邮箱账号</div>
        <div class="emailNum">legouzhibo@gmail.com</div> -->
        <div>
          <span>Điện thoại Quốc tế：</span>
          <span>+63 9502388888</span>
        </div>
        <div>
          <span>Tài khoản Email：</span>
          <span>legouzhibo@gmail.com</span>
        </div>
      </div>
      <div class="codeW" v-if="curr == 2">
        <div class="close" id="close3" @click="close()">
          <img src="../../assets/imgaes/load/close_03-min.png" alt="" />
        </div>
        <div class="code_1">
          <img src="../../assets/imgaes/load/code_1_06-min.png" alt="" />
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "appLoad",
  data() {
    return {
      curr: "",
      currr: 0,
    };
  },
  methods: {
    changeE() {
      this.curr = 1;
    },
    changeC() {
      this.curr = 2;
    },
    close() {
      this.curr = "";
    },
    ios() {
      this.currr = 0;
    },
    anzuo() {
      this.currr = 1;
    },
  },
};
</script>

<style scoped lang="less">
#appLoad {
  .w {
    margin: 0 auto;
    width: 1211px;
  }
  .bg {
    background: url("../../assets/imgaes/load/1.1bg.png") center no-repeat;
    background-size: cover;
    height: 1041px;
    margin-bottom: 82px;
    img {
      width: 100%;
    }
    .download {
      padding-top: 642px;
      padding-left: 25px;
      .code {
        float: left;
        width: 172px;
        height: 172px;
        margin-right: 42px;
        background: url("../../assets/imgaes/load/code.png?t=91") no-repeat;
        background-size: contain;
      }
      .code1 {
        float: left;
        width: 172px;
        height: 172px;
        margin-right: 42px;
        background: url("../../assets/imgaes/load/code.png") no-repeat;
        background-size: contain;
      }
      .dow {
        margin-top: 19px;
        div {
          width: 191px;
          height: 48px;
          transition: box-shadow 0.5s, transform 0.5s;
          -webkit-transition: box-shadow 0.5s, transform 0.5s;
          &:hover {
            transform: scale(1.02);
          }
        }
        .anzhuo {
          margin-top: 39px;
        }
      }
    }
  }
  .content {
    .one {
      background: url("../../assets/imgaes/load/1.png") center no-repeat;
      background-size: contain;
      width: 1123px;
      height: 641px;
      margin-bottom: 317px;
      margin-left: 55.5px;
    }
    .newOne {
      background: url("../../assets/imgaes/load/1.1bg (2).png") center no-repeat;
      background-size: contain;
      width: 1070px;
      height: 531px;
      margin-left: 102px;
      margin-bottom: 230px;
      .jiaru {
        float: right;
        margin-right: 190px;
        margin-top: 187px;
      }
      .btn {
        width: 150px;
        height: 52px;
        padding-top: 281px;
        float: left;
        a {
          display: block;
        }
      }
    }
    .two {
      background: url("../../assets/imgaes/load/2.png") center no-repeat;
      background-size: contain;
      width: 1145px;
      height: 725px;
      margin-bottom: 293px;
      margin-left: 63.5px;
    }
    .therr {
      background: url("../../assets/imgaes/load/3.png") center no-repeat;
      background-size: contain;
      width: 1211px;
      height: 618px;
      margin-bottom: 30px;
      margin-left: 64.5px;
    }
    .one_one {
      height: 544px;
      ul {
        margin-left: 91.5px;
        li {
          padding: 0 64.5px;
          text-align: center;
          margin-bottom: 76px;
          a {
            font-size: 22px;
            color: #fe4a4d;
          }
          .img_1 {
            width: 128px;
            height: 128px;
            margin-bottom: 19px;
            transition: box-shadow 0.5s, transform 0.5s;
            -webkit-transition: box-shadow 0.5s, transform 0.5s;
            &:hover {
              transform: scale(1.02);
            }
          }
        }
      }
    }
    .qq {
      position: fixed;
      background-color: #fff;
      border-top: 6px solid #ee5856;
      height: 322px;
      width: 410px;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .qqLogo {
        width: 112px;
        height: 112px;
        margin: 54px auto 34px;
        z-index: 1;
      }
      .qqNum {
        font-size: 36px;
        color: #030404;
        text-align: center;
      }
    }
    .codeW {
      position: fixed;
      border-top: 6px solid #ee5856;
      background-color: #fff;
      height: 322px;
      width: 410px;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .code_1 {
        width: 202px;
        height: 202px;
        margin: 62px auto;
        position: relative;
        overflow: hidden;
        &:before {
          content: "";
          position: absolute;
          background: url("../../assets/imgaes/load/code_07-min.png") no-repeat
            center;
          background-size: contain;
          top: 5px;
          left: 5px;
          width: 194px;
          height: 194px;
          z-index: 1;
          border-radius: 15px;
        }
      }
    }
    .email {
      position: fixed;
      border-top: 6px solid #ee5856;
      background-color: #fff;
      height: 322px;
      width: 410px;
      font-size: 23.5px;
      color: #030404;
      // text-align: center;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      line-height: 35px;
      .emailNum {
        line-height: 50px;
        margin-top: 17px;
      }
      div {
        &:nth-child(2) {
          padding-top: 115px;
          width: 90%;
          margin: 0 auto;
        }
        &:nth-child(3) {
          width: 90%;
          margin: 0 auto;
          margin-top: 17px;
        }
      }
    }
    .close {
      position: absolute;
      right: 21px;
      top: 25px;
      width: 37px;
      height: 37px;
      cursor: pointer;
    }
  }
  .footer {
    background: url("../../assets/imgaes/load/bg2.png") no-repeat;
    background-size: cover;
    width: 100%;
    height: 332px;
  }
}
</style>
