<template>
  <div class="memberPackage">
    <h3><i></i>{{$t('userInfor.text[4]')}} </h3>
    <div class="tab-content">
      <div>
        <h5>{{$t('userInfor.text[3]')}}</h5>
        <ul
          class="vip-list clearfix"
          v-if="
            packList != undefined && packList != null && packList.length > 0
          "
        >
          <li v-for="(item, index1) in packList" :key="index1">
            <span class="biaoti">VIP{{ item.degree }} {{$t('userInfor.memberPackage.text[6]')}}</span>
            <img style="width: 80%; margin-top: 0" :src="item.icon" alt="" />
            <p>{{ item.name }}</p>
            <div
              class="receive-btn"
              @click="showAddress(item)"
              v-if="item.status == 0"
            >
              {{$t('userInfor.memberPackage.text[3]')}}
            </div>
            <div class="receive-btn active" v-if="item.status == 1">{{$t('userInfor.memberPackage.text[2]')}}</div>
          </li>
        </ul>
        <p v-else style="line-height: 200px; text-align: center">{{$t('userInfor.text1[0]')}}</p>
      </div>
      
    </div>
    <!-- 礼物领取 -->
    <div class="address-box" v-if="isReceive">
      <div class="add-content">
        <h4> {{$t('userInfor.memberPackage.lqGift.text[0]')}}</h4>
        <div class="clearfix">
          <span> {{$t('userInfor.memberPackage.lqGift.text[1]')}}:</span
          ><input
            v-model="add.name"
            type="text"
            :placeholder=" $t('userInfor.memberPackage.lqGift.pla[0]')"
          />
        </div>
        <div class="clearfix">
          <span> {{$t('userInfor.memberPackage.lqGift.text[2]')}}:</span>
          <input
            v-model="add.address"
            type="text"
            :placeholder=" $t('userInfor.memberPackage.lqGift.pla[1]')"
          />
        </div>
        <div class="clearfix">
          <span> {{$t('userInfor.memberPackage.lqGift.text[3]')}}:</span
          ><input
            v-model="add.tel"
            type="text"
            onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
            :placeholder=" $t('userInfor.memberPackage.lqGift.pla[2]')"
          />
        </div>
        <p>  {{$t('userInfor.memberPackage.lqGift.text[4]')}}</p>
       
        <el-button class="submit-btn" :class="isShowBtn == 2 ? 'pink-btn' : ''"  @click="submitAdd()" :loading="isWechatLoading"> {{$t('userInfor.memberPackage.lqGift.text[5]')}}</el-button>
        <div class="close-icon" @click="isReceive = false"></div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "memberPackage",
  components: {},
  data: function () {
    return {
      tabIndex: "vip",
      btnText: "Đã nhận",
      add: {
        tel: "",
        name: "",
        address: "",
      },
      isReceive: false,
      //typeList:[],
      packList: {},
      packId: "",
      degree: "",
      isShowBtn: 1,
      isWechatLoading:false,
    };
  },
  computed: {
    ...mapState(["addressInfor", "isPure"]),
  },
  created() {
    // this.$vux.loading.show({text:'loading...'});
    this.getGifs();
    // if(this.addressInfor){
    //   this.add = this.addressInfor
    // }
    if (this.addressInfor.tel) {
      this.add = this.addressInfor;
      if (this.add.name == "" || this.add.address == "" || this.add.tel == "") {
        this.isShowBtn = 1;
      } else {
        this.isShowBtn = 2;
      }
    }
  },
  watch: {
    add: {
      handler(newVal, oldVal) {
        let btn = document.querySelector(".submit-btn");
        // console.log(newVal)
        if (newVal.name != "" && newVal.tel != "" && newVal.address != "") {
          // btn.classList.add('pink-btn')
          this.isShowBtn = 2;
        } else {
          //  btn.classList.remove('pink-btn')
          this.isShowBtn = 1;
        }
      },
      deep: true,
    },
  },
  mounted() {},

  methods: {
    ...mapMutations(["SETADDRESSINFOR"]),
    changeTab(v) {
      this.tabIndex = v.type;
    },
    //地址弹窗
    showAddress(v) {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.add.name != "" && this.add.address != "" && this.add.tel != "") {
        this.isShowBtn = 2;
      } else {
        this.isShowBtn = 1;
      }
      this.isReceive = true;
      this.packId = v.gift_id;
      this.degree = v.degree;
      console.log(this.packId);
    },
    getGifs() {
      if (!this.$store.state.codeToken) return;
      if (this.$store.state.userinfo.user_id < 0) return;
      this.$http
        .get("/api/user/giftlist")
        .then((res) => {
          if (res && res.data.code == 1) {
            this.packList = res.data.data;
            console.log(this.packList.vip.length);
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
        })
        .catch((err) => {});
    },
    submitAdd() {
      if (!this.add.name) {
        this.$message({
          message: this.$t('userInfor.memberPackage.lqGift.warnText[0]'),
          type: "warning",
        });
      } else if (!this.add.address) {
        this.$message({
          message: this.$t('userInfor.memberPackage.lqGift.warnText[1]'),
          type: "warning",
        });
      } else if (!this.add.tel) {
        this.$message({
          message: this.$t('userInfor.memberPackage.lqGift.warnText[2]'),
          type: "warning",
        });
      } else {
        // this.$http.post(this.versionLive2+"user/rec_gift/",{
          this.isWechatLoading = true;
        let d = this.globalPpproach.checkIsEncrypt({
          gift_id: this.packId,
          degree: this.degree,
          rec_name: this.add.name,
          rec_address: this.add.address,
          rec_phone: this.add.tel,
        });
        this.$http
          .post("/api/user/receivegift", d)
          .then((res) => {
            this.isWechatLoading = false;
            if (res && res.data.code == 1) {
              this.$message({
                message: res.data.msg,
                type: "success",
              });
              this.getGifs();
              this.isReceive = false;
              this.SETADDRESSINFOR(this.add);
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            this.isWechatLoading = false;
          });
      }
    },
  },
};
</script>

<style  lang="less">
h3 {
  font-size: 18px;
  padding-top: 20px;
  color: #333333;
  border-bottom: solid 1px #f4f5f8;
  padding-bottom: 15px;
  i {
    display: inline-block;
    width: 4px;
    height: 17px;
    background: #ff1c30;
    border-radius: 7px;
    position: relative;
    top: 2px;
    margin-right: 10px;
  }
}
.rem(@name,@px) {
  @{name}: unit(@px / 75, rem);
}
.tab-content {
  margin-top: 20px;
  h5 {
    font-weight: normal;
    color: #666;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .vip-list {
    min-height: 200px;
    li {
      float: left;
      width: 18%;
      height: 185px;
      margin-right: 2%;
      background: url("../../assets/imgaes/vip/acklw.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      position: relative;
      margin-bottom: 10px;
      .biaoti {
        position: absolute;
        top: 10px;
        left: 10px;
        color: #ff0000;
        font-size: 16px;
      }
      &:nth-of-type(5n) {
        margin-right: 0;
      }
      img {
        width: 60%;
        margin: 0 auto;
        margin-top: 20px;
      }
      p {
        position: absolute;
        bottom: 44px;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        color: #333;
        width: 80%;
      }
      .receive-btn {
        color: #fff;
        // width: 51.6%;
        margin: 0 auto;
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: linear-gradient(90deg, #ff3131, #ff8067);
        text-align: center;
        border-radius: 100px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        &.active {
          background: #fff;
          color: #aaa;
        }
      }
    }
  }
}
.address-box {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .add-content {
    background: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    top: 50%;
    width: 580px;
    height: 464px;
    border-radius: 10px;
    padding: 0 60px;
    .close-icon {
      position: absolute;
      width: 24px;
      height: 24px;
      top: 13px;
      right: 13px;
      background: url("../../assets/imgaes/vip/packclose-icon.png") no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    h4 {
      font-weight: bold;
      text-align: center;
      font-size: 18px;
      margin-top: 38px;
      margin-bottom: 39px;
      color: #333;
    }
    p {
      color: #ff3131;
      font-size: 12px;
      margin-top: 17px;
    }
    > div {
      margin-bottom: 15px;
      line-height: 42px;
      color: #333;
      font-size: 18px;
      span {
        float: left;
        // .rem(font-size,24);
        display: block;
      }
      input {
        float: right;
        background: #f5f6f9;
        height: 42px;
        width: 260px;
        padding-left: 10px;
        border-radius: 3px;
      }
    }
    .submit-btn {
      width: 220px;
      height: 58px;
      // line-height: 58px;
      text-align: center;
      margin: 0 auto;
      border-radius: 100px;
      background: #eee;
      color: #999;
      font-size: 24px;
      margin-bottom: 66px;
      margin-top: 60px;
      cursor: pointer;
      display: block;
    }
    .pink-btn {
      background: linear-gradient(0deg, #1486ff -68600%, #4ba1ff -64600%);
      color: #fff;
    }
  }
}
</style>
