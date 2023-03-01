<template>
  <div class="invite">
    
    <div class="invite-msg" v-if="isInvite">
      <div class="invite-code invite-item clearfix">
        <span class="fl">{{$t('extendReport.invite.text[0]')}}</span>
        <p class="fl">{{ currCodeMsg.market_code }}</p>
        <div
          class="fl copy-btn copy-code"
          @click="copyLink('copy-code')"
          data-clipboard-action="copy"
          :data-clipboard-text="currCodeMsg.market_code"
        >
          {{$t('copyText')}}
        </div>
      </div>
      <div class="invite-url invite-item clearfix">
        <span class="fl">{{$t('extendReport.invite.text[1]')}}</span>
        <p class="fl">{{ currCodeMsg.market_url }}</p>
        <div
          class="fl copy-btn copy-link"
          @click="copyLink('copy-link')"
          data-clipboard-action="copy"
          :data-clipboard-text="currCodeMsg.market_url"
        >
         {{$t('copyText')}}
        </div>
      </div>
      
    </div>
    <!-- <div class="main-sport">
      <div class="advantage clearfix">
        <img src="../../../assets/imgaes/extend/ys.png" alt="">
        <div class="text">
          <h3>Ưu điểm của K188</h3>
          <p>Có nhiều sản phẩm cá cược đa dạng, hệ thống công bằng, khách quan và công khai được sử dụng trong nhiều nhà cái trên thị trường. Chúng tôi tự hào mang đến cho hội viên những chương trình khuyến mãi, ưu đãi hấp dẫn nhất, đồng thời mang đến cho đối tác lợi nhuận cao đến 55%, dù bạn có nguồn lực mạng hay nguồn nhân lực, chúng tôi hoan nghênh bạn tham gia và trở thành đối tác của K188. Tham gia K188, bạn không cần đầu tư, không cần tài khoản tiết kiệm, không thua lỗ, không rủi ro, đội ngũ CSKH chuyên nghiệp của chúng tôi sẽ hỗ trợ đại lý 24/7, sẵn sàng hỗ trợ và tư vấn mọi vấn đề liên quan.</p>
        </div>
      </div>
      <div class="table">
        <h3>Chu kỳ kết toán: Mỗi tháng vào ngày 1 đến ngày 5 sẽ thanh toán hoa hồng của tháng trước.</h3>
        <table>
          <tr class="title">
            <td style="width:247px;">Số tiền lợi nhuận âm   </td>
            <td style="width:207px;">Số hội viên hợp lệ </td>
            <td style="width:217px;">Hoa hồng API<br> của bên thứ 3</td>
            <td style="width:264px;">Hoa hồng xổ số<br> (không bao gồm TCG)  </td>
            <td style="width:339px;">Yêu cầu</td>
          </tr>
          <tr>
            <td>1,000k - 150,000k</td>
            <td>3</td>
            <td>20%</td>
            <td>10%</td>
            <td rowspan="6">Mỗi tháng thêm ít nhất<br>  một hội viên hợp lệ</td>
          </tr>
          <tr>
            <td>150,001k - 500,000k  </td>
            <td>5</td>
            <td>25%</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>500,001k - 1,000,000k</td>
            <td>7</td>
            <td>30%</td>
            <td>20%</td>
          </tr>
          <tr>
            <td>1,000,001k - 2,000,000k</td>
            <td>9</td>
            <td>35%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>2,000,001k - 3,000,000k</td>
            <td>15</td>
            <td>45%</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>Hơn 3,000,001k</td>
            <td>20</td>
            <td>55%</td>
            <td>35%</td>
          </tr>
          <tr>
            <td colspan="6">Khách hàng hợp lệ: Tổng số tiền nạp trong chu kỳ hơn 3000k VND, và số ngày chơi hợp lệ trong chu kỳ trên 3 ngày!</td>
          </tr>
        </table>
      </div>
      <div class="cost-rate clearfix">
        <div class="rate fl">
          <img src="../../../assets/imgaes/extend/rate.png" alt="">
          <h4>Tỷ lệ chi phí nhà cái</h4>
          <h6>21% lợi nhuận trong tháng</h6>
          <div class="bl">
            <span>
              <i class="green"></i>
              phí rủi ro 5%
            </span>
            <span>
              <i class="purple"></i>
              phí hệ thống 10%
            </span>
            <span>
              <i class="orange"></i>
              phí quản lý 6%
            </span>
          </div>
        </div>
        <div class="cost fl">
          <img src="../../../assets/imgaes/extend/cost.png" alt="">
          <h4>Tỷ lệ chi phí API của bên thứ ba</h4>
          <h6></h6>
          <div class="bl">
            <span>
              <i class="green"></i>
              Live video 8%  
            </span>
            <span>
              <i class="purple"></i>
              thể thao 13%
            </span>
            <span>
              <i class="orange"></i>
              khác  9%
            </span>
            <span>
              <i class="purple"></i>
              xổ số TCG 8%
            </span>
          </div>
        </div>
      </div>

      <div class="api-box clearfix">
        <div class="api-titile clearfix">
          <img class="icon fl" src="../../../assets/imgaes/extend/api_l.png" alt="">
          <span class="ti fl">Công thức tính hoa hồng API của bên thứ ba</span>
          <img class="icon fl" src="../../../assets/imgaes/extend/api_r.png" alt="">
        </div>
        <p>Công thức tính hoa hồng API của bên thứ ba: (lợi nhuận âm trong tháng hiện tại - chi phí chi tiêu của nhà cái - chi phí API của bên thứ ba) * tỷ lệ 
          <br>hoa hồng = hoa hồng API của bên thứ ba  Công thức tính hoa hồng xổ số: (lợi nhuận âm trong tháng hiện tại - chi phí chi tiêu của nhà cái) * tỷ 
          <br>lệ hoa hồng = hoa hồng xổ số  Hoa hồng xổ số + hoa hồng API của bên thứ ba = lợi nhuận đại lý của tháng này
          </p>
      </div>

      <div class="be-careful">
        <strong>Chú ý:</strong> <br>
        ＊ Mọi khách hàng tham gia nhận quyền đại lý, nếu khách hàng hợp lệ trong tháng đầu tiên của bạn không đạt yêu cầu của công ty, nhưng vẫn 
        có lợi nhuận, lợi nhuận của bạn sẽ được cộng dồn sang tháng tiếp theo.
        * Lưu ý: Đại lý không được phép tự mở tài khoản hội viên cá cược thu lợi bất hợp pháp. Bất kỳ ai sử dụng các phương pháp không trung thực 
        để lừa tiền hoa hồng đại lý hoặc các thành viên tuyến dưới và đại lý có cùng IP sẽ bị coi là đại lý tự mở tài khoản cá cược, công ty sẽ bị hủy 
        bỏ tư cách đại lý, tài khoản sẽ bị đóng băng vĩnh viễn và không có lợi nhuận nào được chia. Nếu có nhiều thành viên có cùng một IP, sẽ được 
        coi là thành viên không hợp lệ và sẽ không được tính.
      </div>
    </div> -->


    <div class="invite-btn" v-if="isInvite && isLoading" @click="toAgent">
     {{$t('extendReport.invite.text[5]')}}
    </div>
    
    <div class="invite-btn" v-if="!isInvite && isLoading" @click="applayMen" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">
      {{$t('extendReport.invite.text[6]')}}
    </div>

    <div class="invite-btn go-online" v-if="isLoading" @click="goOnline">
     {{$t('OnlineServe')}}
    </div>
 
    <div class="qq-box" v-if="tgBox">
      <div class="qq-box-content">
        <i class="remove-btn" @click="tgBox = false"></i>
        <h3>{{$t('extendReport.invite.tcText[0]')}}</h3>
        <div class="input-box clearfix">
          <span class="fl">{{$t('extendReport.invite.tcText[1]')}}</span>
          <input
            type="text"
            ref="qqInput"
            class="fl"
            v-model="qqContent"
            @focus="isplace = false"
            @focusout="isplace = true"
            maxlength="10"
          />
        </div>
        <el-button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="confirm-btn" @click="applyCode" :loading="btnLoading"
          >{{$t('extendReport.invite.tcText[2]')}}</el-button
        >
      </div>
    </div>
    <!--        申请中-->
    <div class="qq-box" v-if="tgIng">
      <div class="qq-box-content apply-ing">
        <i class="remove-btn" @click="tgIng = false"></i>
        <h3>{{$t('extendReport.invite.tcText[0]')}}</h3>
        <p>
         {{$t('extendReport.invite.tcText[3]')}}
        </p>
        <div class="confirm-btn confirm-btn-aplay" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  @click="tgIng = false">
          {{$t('extendReport.invite.tcText[2]')}}
        </div>
      </div>
    </div>
    <!--        申请失败-->
    <div class="qq-box" v-if="tgFaile">
      <!--        <div class="qq-box">-->
      <div class="qq-box-content applay-fiale">
        <i class="remove-btn" @click="tgFaile = false"></i>
        <h3>{{$t('extendReport.invite.tcText[4]')}} </h3>
        <p>{{$t('extendReport.invite.tcText[5]')}}<br /> {{$t('extendReport.invite.tcText[6]')}}</p>
        <div class="cancel-btn confirm-btn-aplay" @click="tgFaile = false">
          {{$t('qxText')}}
        </div>
        <div class="confirm-btn confirm-btn-aplay" @click="goOnline">
         {{$t('extendReport.invite.tcText[7]')}}
        </div>
      </div>
    </div>

    <!--        显示推广图-->
    <div class="extend-img" v-if="showExtendImg">
      <img :src="lSrc" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import html2canvas from "html2canvas";
import VueQr from "vue-qr";
export default {
  name: "invite",
  data() {
    return {
      qqContent: "",
      btnLoading: false,
      tgBox: false,
      tgIng: false,
      tgFaile: false,
      currPersent: "",
      currCodeMsg: {},
      isInvite: false,
      isLoading: false,
      currHref: location.origin,
      marketList: [],
      isplace: true,
      qrcode: {
        value: "www.lgzb18.com",
        logo: require("../../../assets/imgaes/extend/codeLogo.png"),
      },
      lSrc: "",
      showExtendImg: false,
    };
  },
  components: {
    VueQr,
  },
  watch: {
    qqContent: function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          this.qqContent = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
      }
    },
    tgBox: function () {
      this.$refs.qqInput.focus();
    },
  },
     computed: {
    ...mapState(["skin"]),
  },
  created() {
    this.getInviteCode();
    this.getList();
  },
  methods: {
    goOnline() {
      window.open(localStorage.getItem("customer"));
    },
    applayMen() {
      if (this.currCodeMsg.status == 9) {
        this.tgIng = true;
      } else {
        this.tgBox = true;
      }
    },
    copyLink(className) {
      let _this = this;
      let clipboard = new this.clipboard("." + className);
      clipboard.on("success", function () {
        
        _this.$message({
          type: "success",
          message: this.$t('extendReport.invite.warnText[0]'),
          offset: 0,
        });
      });
      clipboard.on("error", function () {
        _this.$message({
          type: "error",
          message: this.$t('extendReport.invite.warnText[1]'),
          offset: 0,
        });
      });
    },
    //获取邀请码
    getInviteCode(flag) {
      this.isLoading = false;
      if (flag) this.isL = true;
      // this.$http.get('/api2/market/index').then(res=>{
      this.$http.get("/api/market/index").then((res) => {
        this.isL = false;
        this.isLoading = true;
        if (res && res.data.code == 1) {
          this.qrcode.value = res.data.data.market_url;
          this.currCodeMsg = res.data.data;
          this.isInvite = this.currCodeMsg.status == 10 ? true : false;
          this.currPersent =
            (this.currCodeMsg.invitee_num /
              (this.currCodeMsg.invitee_num -
                0 +
                (this.currCodeMsg.next_level_diff - 0))) *
            100;
        }
      });
    },
    //申请邀请码
    applyCode() {
      if (this.qqContent == "")
        return this.$message({
          type: "error",
          message: "Vui lòng nhập số điện thoại chính xác",
          offset: 0,
        });
      this.btnLoading = true;
      let d = this.globalPpproach.checkIsEncrypt({
        mobile: this.qqContent,
      });
      this.$http.post("/api/market/apply", d).then((res) => {
        this.btnLoading = false;
        if (res && res.data.code == 1) {
          this.$message({
            type: "success",
            message: this.$t('extendReport.invite.warnText[3]'),
            offset: 0,
          });
        } else if (res.data.code == 15) {
          
          this.tgIng = true;
        } else {
          this.$message({
            type: "error",
            message: res.data.msg,
            offset: 0,
          });
          
        }
        this.tgBox = false;
      });
    },
    //推广级别列表
    async getList() {
      let res = await this.$http.get("/api/market/levellist");
      if (res && res.data.code == 1) {
        this.marketList = res.data.data;
      }
    },
    toAgent(){
      window.open('https://agent.k188admin.com')
    },
    // 页面元素转图片

    toImage() {
      let shareContent = document.getElementById("inviteCode");
      //配置参数
      let opts = {
        useCORS: true, // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
      };
      
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      html2canvas(shareContent, opts).then((canvas) => {
        var dataUrl = canvas.toDataURL("image/jpeg", 100, 300);
        this.lSrc = dataUrl;
        // this.showExtendImg = true;
        this.savePicture(dataUrl);
      });
    },
    savePicture(Url) {
      let blob = new Blob([""], { type: "application/octet-stream" });
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      let e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped lang="less">
.invite {
  /*overflow-y: auto;*/
  /*height: 1300px;*/
  padding: 0 !important;
  background: #fff;
  text-align: center;
  .invite-msg {
    padding-left: 95px;
    padding-top: 50px;
    .invite-item {
      margin-bottom: 20px;
      span {
        font-size: 16px;
        color: #333;
        width: 190px;
        line-height: 30px;
        text-align: left;
      }
      p {
        margin: 0 20px 0 0;
        height: 30px;
        line-height: 30px;
        min-width: 294px;
        background: rgba(245, 245, 245, 1);
        border-radius: 6px;
        padding: 0 10px;
        font-size: 14px;
        text-align: left;
      }
      .copy-btn {
        width: 68px;
        height: 30px;
        background: linear-gradient(
          90deg,
          rgba(255, 49, 49, 1),
          rgba(255, 128, 103, 1)
        );
        border-radius: 6px;
        color: #fff;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .invite-img {
    background: url("../../../assets/imgaes/extend/bg.png") no-repeat top center;
    padding-bottom: 200px;
    background-size: contain;
    width: 805px;
    margin-left: 72px;
    height: 1000px;
    > h3 {
      font-size: 24px;
      padding: 0 310px;
      color: #333;
      padding-top: 65px;
    }
    .invite-mess {
      padding: 230px 50px 0px 50px;
      font-size: 15px;
      text-align: left;
      line-height: 30px;
    }
    .grade-box {
      > li {
        font-size: 14px;
        margin-top: 20px;
        padding: 0 45px;
        i {
          width: 60px;
          height: 20px;
          margin-right: 10px;
        }
        span {
          font-weight: bold;
          width: 80px;
          text-align: left;
        }
        p {
          color: #666;
          text-align: left;
        }
        &.grade-item1 {
          line-height: 20px;
        }
        &.grade-item2 {
          line-height: 20px;
        }
        &.grade-item3 {
          line-height: 25px;
        }
        &.grade-item4 {
          line-height: 25px;
        }
        &.grade-item5 {
          line-height: 30px;
        }
        &.grade-item6 {
          margin-top: 10px;
          line-height: 40px;
        }
      }
    }
    .invite-code {
      width: 137px;
      height: 137px;
      background: #fff;
      padding: 10px 0 0 0;
      margin: 10px auto;
      img {
        width: 85%;
      }
    }
  }
  .invite-btn {
    font-size: 18px;
    background: linear-gradient(90deg, #1486ff 14.39%, #4ba1ff 96.58%);
    color: #fff;
    text-align: center;
    line-height: 58px;
    height: 58px;
    border-radius: 30px;
    padding: 0 30px;
    display: inline-block;
    cursor: pointer;
    margin: 0px 0 20px 0;
  }
  .go-online{
    background: linear-gradient(90deg, #fd9717 0%, #ffd792 100%);
    margin-left: 20px;
  }
}
.qq-box {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  .apply-ing,
  .applay-fiale {
    p {
      font-size: 18px;
      line-height: 30px;
      color: #333;
    }
  }

  .qq-box-content {
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    height: 281px;
    padding: 30px 0 40px 0;
    border-radius: 10px;
    text-align: center;
    .remove-btn {
      width: 14px;
      height: 15px;
      background: url("../../../assets/imgaes/gb_button_6_6.png") no-repeat;
      position: absolute;
      right: 25px;
      top: 25px;
      cursor: pointer;
    }
    h3 {
      font-size: 24px;
      color: #222221;
      font-weight: bold;
      margin-bottom: 28px;
    }
    .input-box {
      position: relative;
      display: inline-block;
      span {
        font-size: 18px;
        color: #333333;
        line-height: 43px;
      }
      input {
        padding: 0 20px;
        height: 43px;
        line-height: 43px;
        color: #333;
        margin-left: 10px;
        background: #eee;
        border-radius: 8px;
        width: 281px;
        font-size: 18px;
      }
      p {
        position: absolute;
        color: #333;
        left: 75px;
        top: 15px;
        font-size: 18px;
      }
    }
    .confirm-btn {
      width: 281px;
      height: 59px;
      color: #fff;
      border-radius: 50px;
      margin: 25px auto 0;
      font-size: 18px;
      background: linear-gradient(90deg, #1486ff 14.39%, #4ba1ff 96.58%);
      cursor: pointer;
    }
    .confirm-btn-aplay {
      line-height: 59px !important;
    }
  }
  .applay-fiale {
    .cancel-btn {
      float: left;
      width: 181px;
      height: 59px;
      color: #333;
      border-radius: 50px;
      font-size: 18px;
      background: #eee;
      cursor: pointer;
      margin: 30px 30px 0 20px;
    }
    .confirm-btn {
      width: 181px;
      float: left;
      margin: 30px auto 0;
    }
  }
}


.main-sport{
  width: 800px;
  background: url('../../../assets/imgaes/extend/main_bg.png') no-repeat;
  background-size: cover;
  padding-top: 50px;
  padding-bottom: 50px;
  margin-top: 30px;
  .advantage{
    img{
      width: 50%;
      float: left;
      margin-right: 50px;
    }
    .text{
      width: 40%;
      color: #445779;
      float: left;
      h3{
        font-size: 14px;
        text-align: center;
      }
      p{
        line-height: 14px;
        font-size: 10px;
        text-align: left;
      }
    }
  
  }
}
.table{
  width:85%;
  color: #445779;
  margin: 0 auto;
  text-align: center;
  h3{
    font-size: 12px;
  }
  table{
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    tr{
      border: 1px solid #E5F1FF;
      font-weight: 700;
    }
    .title{
      height: 35px;
      font-size: 10px;
      font-weight: bold;
      background: #E5F1FF;
      text-align: center;
    }
    td{
      height: 26px;
      font-size: 8px;
      border-left: 1px solid #E5F1FF;
    }
  }
}
.cost-rate{
  width:100%;
  margin: 30px auto 0;
  color: #445779;
  h4{
    font-size: 12px;
    font-weight: 700;
    margin-top: 25px;
  }
  h6{
    font-weight: 700;
    font-size: 10px;
    height: 36px;
    line-height: 36px;
  }
  .bl{
    span{
      line-height: 10px;
      font-size: 8px;
      margin-right: 8px;
    }
    i{
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      vertical-align: middle;
      &.green{
        background: #1ACFC1;
      }
      &.purple{
        background: #642EEA;
      }
      &.orange{
        background: #FF705B;
      }
    }
  }
  .rate{
      width:45%;
      text-align: center;
      margin-right: 45px;
      img{
        width: 150px;
      }
  }
  .cost{
    width: 47%;
    text-align: center;
    img{
      width: 150px;
    }
  }
}
.api-box{
  width: 100%;
  margin: 25px auto;
  padding: 0 15px;
  .api-titile{
    max-width:750px;
    margin: 20px auto 17px;
    .icon{
      width:25%;
    }
    .ti{
      width: 45%;
      font-size: 14px;
      font-weight: bold;
      color: #445779;
      margin-left: 1%;
      margin-right: 1%;
    }
  }
  p{
    width: 90%;
    font-size: 10px;
    line-height: 24px;
    color: #6E7C9E;
    margin: 0 auto;
    text-align: left;
  }
}
.be-careful{
   width: 90%;
  font-size: 10px;
  line-height: 24px;
  color: #6E7C9E;
  margin: 0 auto;
  text-align: left;
  strong{
    font-size: 12px;
    color: #445779;
  }
}
</style>