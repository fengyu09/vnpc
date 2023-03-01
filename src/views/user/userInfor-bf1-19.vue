<template>
  <div id="userInfor">
    <div v-show="!packShow">
      <h3>
        <i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>Thông tin cá nhân
        <span @click="changeZl" v-if="wbj" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">Biên tập tư liệu</span>
        <p class="btn" v-if="!wbj" style="margin-left: 4px">
          <el-button @click="save()" :loading="btnLoading">Lưu</el-button>
        </p>
      </h3>
      <section class="c-avatar-cutter" v-if="changeImg" @dragstart="false">
        <div class="mask"></div>
        <div class="container g-popup-box">
          <p class="title">
            Sửa ảnh đại diện
            <span>
              <img
                @click="onCancel"
                style="cursor: pointer"
                src="../../assets/imgaes/member/icon-cancel.png"
                alt
              />
            </span>
          </p>
          <div class="content">
            <div class="c-left" :class="{ 'c-left--doing': imgURL }">
              <div
                class="container-box"
                :style="{
                  width: `${containerBoxData.width}px`,
                  height: `${containerBoxData.height}px`,
                }"
              >
                <img ref="$img" :src="imgURL" />
                <div class="img-mask"></div>
                <div
                  class="select-box"
                  v-if="imgURL"
                  @mousedown="onMouseDown($event, 'move')"
                  :style="{
                    top: `${selectData.top}px`,
                    left: `${selectData.left}px`,
                    width: `${selectData.width}px`,
                    height: `${selectData.width}px`,
                    'background-image': `url(${imgURL})`,
                    'background-position': `${-selectData.left}px ${-selectData.top}px`,
                    'background-size': `${containerBoxData.width}px ${containerBoxData.height}px`,
                  }"
                >
                  <ul class="x-line">
                    <li
                      @mousedown.stop="onMouseDown($event, 'stretch', 'top')"
                    ></li>
                    <li></li>
                    <li></li>
                    <li
                      @mousedown.stop="onMouseDown($event, 'stretch', 'bottom')"
                    ></li>
                  </ul>
                  <ul class="y-line">
                    <li
                      @mousedown.stop="onMouseDown($event, 'stretch', 'left')"
                    ></li>
                    <li></li>
                    <li></li>
                    <li
                      @mousedown.stop="onMouseDown($event, 'stretch', 'right')"
                    ></li>
                  </ul>
                  <ul class="point">
                    <li
                      @mousedown.stop="
                        onMouseDown($event, 'stretch', 'top-left')
                      "
                    ></li>
                    <li
                      @mousedown.stop="
                        onMouseDown($event, 'stretch', 'top-right')
                      "
                    ></li>
                    <li
                      @mousedown.stop="
                        onMouseDown($event, 'stretch', 'bottom-left')
                      "
                    ></li>
                    <li
                      @mousedown.stop="
                        onMouseDown($event, 'stretch', 'bottom-right')
                      "
                    ></li>
                  </ul>
                  <div class="cross"></div>
                </div>
              </div>
            </div>
            <div class="c-right">
              <div class="preview">
                <p class="yl">Xem trước</p>
                <div>
                  <canvas
                    ref="$canvas"
                    width="190"
                    height="190"
                    :class="{ 'canvas--doing': imgURL }"
                    >></canvas
                  >
                </div>
              </div>
              <input
                type="button"
                class="btn-upload"
                :value="!imgURL ? 'Tải lên' : 'Tải lên lại'"
              />
              <input
                @change="fileChange"
                type="file"
                ref="inputer"
                accept="image/*"
                style="cursor: pointer"
              />
            </div>
          </div>
          <div class="c-btn-group">
            <!-- <input @click="onCancel" type="button" class="btn-cancel" value="取消" /> -->
            <input
              @click="onEnter"
              type="button"
              class="btn-enter"
              style="cursor: pointer"
              :class="{ 'btn-enter--disable': !imgURL }"
              value="Xác nhận"
            />
          </div>
        </div>
      </section>
      <div class="clearfix">
        <div class="txtTrue fl">
          <span>
            <img ref="imgSf" v-lazy="avatar" />
            <!-- @click.stop="uploadHeadImg" -->
            <i v-if="!wbj" @click="selectImg">
              Sửa ảnh đại diện
              <!-- <input style="display:none" type="file" accept="image/*" @change="handleFile" class="hiddenInput">-->
            </i>
          </span>
        </div>
        <div class="info-content fl">
          <p class="fl">
            <label>Biệt danh:</label>
            <span v-if="wbj">{{ nickname }}</span>
            <el-input
              v-if="!wbj"
              v-model="nickname"
              placeholder="Vui lòng nhập nội dung"
              maxlength="10"
              id="inputVal"
            ></el-input>
            <!-- <a class="defu" @click="searchIn">编辑</a> -->
          </p>
          <p class="fl">
            <label>Giới tính:</label>
            <!-- <span v-if="wbj">{{value}}</span> -->
            <el-select
              v-if="wbj"
              v-model="value"
              clearable
              placeholder="Chưa chọn ~"
              disabled="disabled"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-if="!wbj" v-model="value" placeholder="Chưa chọn ~">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </p>
          <p class="fl">
            <label>Chữ ký:</label>
            <span
              v-if="wbj"
              style="
                width: 592px;
                height: 94px;
                line-height: 20px;
                margin-top: 10px;
                padding-top: 5px;
                padding-right: 15px;
              "
              ><p
                style="
                  margin: 0;
                  width: 310px;
                  word-wrap: break-word;
                  word-break: break-all;
                "
              >
                {{ bio }}
              </p></span
            >
            <el-input
              v-if="!wbj"
              type="textarea"
              placeholder="Vui lòng nhập nội dung"
              maxlength="50"
              v-model="bio"
              show-word-limit
            ></el-input>
            <!-- <a class="defu" @click="searchIn1">编辑</a> -->
          </p>
        </div>
      </div>
      <div class="content-main">
        <div class="tab-title">
          <span @click="tabIndex = 0" :class="[{ active: tabIndex == 0 },{ 'active-pink': tabIndex == 0 &&skin==1 },{ 'active-blue': tabIndex == 0 &&skin==2},{ 'active-green': tabIndex == 0 &&skin==3},{'pink-color':skin==1 },{'blue-color':skin==2},{'green-color':skin==3}]"
            >VIP của tôi</span
          >
          <!-- <span @click="changetabIndex(1)" :class="{active:tabIndex==1}" v-if="$store.state.isPure==0">我的贵族</span> -->
          <!-- <router-link class="hydlb" to="memberPackage">会员礼包</router-link> -->
          <a class="hydlb" @click="isPackShow()" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">Quà hội viên</a>
        </div>
        <div class="my-vip" v-show="tabIndex == 0">
          <!-- <h4>我的VIP</h4> -->
          <p style="padding-top: 43px; padding-bottom: 8px" >
            Cấp bậc VIP của tôi:
            <font style="color: #ff502b">{{ myVip.vip_name }}</font>
          </p>
          <div class="progress-bar clearfix">
            <span class="fl" style="font-size: 20px">{{ myVip.vip_name }}</span>
            <!--          <span class="bar fl"><i class="jd" :style="{'width':50 +'%'}"></i><i class="text" style="left: 50%">50%</i></span>-->
            <span class="bar fl" 
              ><i class="jd" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" :style="{ width: currVipPersent + '%' }"></i>
              <i class="text"  :style="{ left: currVipPersent + '%' }">
                {{ currVipPersent | filterOnlineNum1(currVipPersent) }}%
              </i>
            </span>
            <span class="fl" style="font-size: 20px">{{
              myVip.vip_code != myVip.next_vip_code ? myVip.next_vip_name : "∞"
            }}</span>
            <button class="look-btn fl" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">
              <!-- <router-link :to="{path:'/vipDetails'}">查看VIP详情</router-link> -->
              <a @click="goVip()" >Xem chi tiết VIP</a>
            </button>
          </div>
          <p
            style="padding-top: 27px"
           v-if="myVip.vip_code != myVip.next_vip_code"
          >
           <!-- v-if="myVip.vip_code != myVip.next_vip_code" -->
            Nhắc nhở: Nâng cấp cần nạp <font style="color: #ff502b">{{
              myVip.upgrade_cz | number
            }}</font
            > vndk và vòng cược <font style="color: #ff502b">{{
              myVip.upgrade_flow | number
            }} vndk  </font>
          </p>
          <h4>Đặc quyền của tôi</h4>
          <table>
            <tr>
              <th>Thưởng tăng cấp</th>
              <th>Lì xì mỗi tháng ( Ngày 18)</th>
              <th>Quà sinh nhật</th>
              <th>Chăm sóc khách hàng</th>
              <th>Phần thưởng bằng </th>
            </tr>
            <tr>
              <td>
                <span v-if="myVip.upgrade_bonus == 0">—</span>
                <span v-else>{{ myVip.upgrade_bonus }}</span>
              </td>
              <td>
                <span v-if="myVip.month_hb == 0">—</span>
                <span v-else>{{ myVip.month_hb }}</span>
              </td>
              <td>
                <span v-if="myVip.birthday_gift == 0">—</span>
                <span v-else>{{ myVip.birthday_gift }}</span>
              </td>
              <td>
                <span v-if="!myVip.customer_service">—</span>
                <span v-else
                  ><img src="../../assets/imgaes/vip/has.png" alt=""
                /></span>
              </td>
              <td class="swlq" >
                <span v-if="myVip.receive_in_kind == 0" style="background:none;color:#333">—</span>
                <span style="background:#eee;color:#999"  v-if="myVip.receive_in_kind == 1">Nhận</span>
                <span @click="isPackShow()"  v-if="myVip.receive_in_kind == 2">Đi lấy nó</span>
            </td>
            </tr>
          </table>
        </div>
        <div class="my-noble" v-show="tabIndex == 1">
          <h4>我的贵族</h4>
          <p style="padding-top: 43px; padding-bottom: 8px">
            我的贵族等级:
            <font style="color: #ff502b">{{ myNoble.noble_name }}</font>
          </p>
          <div class="progress-bar clearfix">
            <span class="fl" style="font-size: 20px">{{
              myNoble.noble_name
            }}</span>
            <span class="bar fl"
              ><i class="jd" :style="{ width: currNoblePersent + '%' }"></i
              ><i class="text" :style="{ left: currNoblePersent + '%' }"
                >{{ currNoblePersent | filterOnlineNum1(currNoblePersent) }}%</i
              ></span
            >
            <span class="fl" style="font-size: 20px">{{
              myNoble.noble_code != myNoble.next_noble_code
                ? myNoble.next_noble_name
                : "∞"
            }}</span>
            <button class="look-btn fl">
              <router-link :to="{ path: '/noble' }">查看贵族详情</router-link>
            </button>
          </div>
          <p
            style="padding-top: 27px"
            v-if="myNoble.noble_code != myNoble.next_noble_code"
          >
            温馨提示：升级需要兑换<font style="color: #ff502b">{{
              myNoble.upgrade_exp
            }}</font
            >钻石
          </p>
          <h4>Đặc quyền của tôi</h4>
          <ul class="list">
            <li :class="myNoble.flag == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_1.png" alt="" />
              <p>会员专属标识</p>
            </li>
            <li :class="myNoble.seat == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_2.png" alt="" />
              <p>贵族席位</p>
            </li>
            <li :class="myNoble.reward == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_3.png" alt="" />
              <p>专属礼物</p>
            </li>
            <li :class="myNoble.film_discount == 10 ? 'gray' : ''">
              <img
                v-show="myNoble.noble_code == 0 || myNoble.noble_code == -1"
                src="../../assets/imgaes/vip/qy_4.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 1"
                src="../../assets/imgaes/vip/qy4_qs.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 2"
                src="../../assets/imgaes/vip/qy4_nj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 3"
                src="../../assets/imgaes/vip/qy4_zj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 4"
                src="../../assets/imgaes/vip/qy4_bj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 5"
                src="../../assets/imgaes/vip/qy4_hj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 6"
                src="../../assets/imgaes/vip/qy4_gj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 7"
                src="../../assets/imgaes/vip/qy_4.png"
                alt=""
              />
              <p v-if="myNoble.film_discount == 10">影视区0折</p>
              <p v-else>影视区{{ myNoble.film_discount }}折</p>
            </li>
            <li :class="myNoble.free_watch_nums == 0 ? 'gray' : ''">
              <img
                v-show="myNoble.noble_code == 0"
                src="../../assets/imgaes/vip/qy5_qs.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == -1"
                src="../../assets/imgaes/vip/qy_4.png"
                alt=""
              />
              <!-- <img v-show="myNoble.free_watch_nums ==0 " src="../../assets/imgaes/vip/qy5_qs.png" alt=""> -->
              <img
                v-show="myNoble.noble_code == 1"
                src="../../assets/imgaes/vip/qy5_qs.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 2"
                src="../../assets/imgaes/vip/qy5_nj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 3"
                src="../../assets/imgaes/vip/qy5_zj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 4"
                src="../../assets/imgaes/vip/qy5_bj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 5"
                src="../../assets/imgaes/vip/qy5_hj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 6"
                src="../../assets/imgaes/vip/qy5_gj.png"
                alt=""
              />
              <img
                v-show="myNoble.noble_code == 7"
                src="../../assets/imgaes/vip/qy_5.png"
                alt=""
              />
              <p>
                {{
                  myNoble.noble_code > 6
                    ? "观影无限制"
                    : "每日免费观影" +
                      (myNoble.free_watch_nums > 0
                        ? myNoble.free_watch_nums
                        : 0) +
                      "部"
                }}
              </p>
            </li>
            <li :class="myNoble.welcome_msg == '' ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_6.png" alt="" />
              <p>进场特殊欢迎语</p>
            </li>
            <li :class="myNoble.draws == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_7.png" alt="" />
              <p>每日抽奖{{ myNoble.draws }}次</p>
            </li>
            <li :class="myNoble.mount == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_8.png" alt="" />
              <p>进场坐骑</p>
            </li>
            <li :class="myNoble.barrage == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_9.png" alt="" />
              <p>贵族弹幕</p>
            </li>
            <li :class="myNoble.emoticon == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_10.png" alt="" />
              <p>专属表情</p>
            </li>
            <li :class="myNoble.put_hot == 0 ? 'gray' : ''">
              <img src="../../assets/imgaes/vip/qy_11.png" alt="" />
              <p>推荐主播上热门</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <memberPackage v-show="packShow"></memberPackage>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { alertComfirm } from "../../assets/js/public";
import memberPackage from "../../views/user/memberPackage.vue";
export default {
  props: {
    returnType: {
      type: String,
      default: "url",
    },
  },
  components: { memberPackage },
  computed: {
    ...mapState(["codeToken", "userinfo","skin"]),
  },
  name: "userInfor",
  data() {
    return {
      btnLoading: false,
      changeImg: false,
      nickname: "",
      bio: "",
      wbj: true,
      tabIndex: 0,
      options: [
        {
          value: "1",
          label: "Nam",
        },
        {
          value: "2",
          label: "Nữ",
        },
      ],
      value: "",
      avatar: "",
      imgSrc: "",

      imgURL: "",
      scaleRate: 1, // 图片缩放比
      minWidth: 20, // 选择框最小宽度
      containerBoxData: {
        width: 0,
        height: 0,
      },
      selectData: {
        top: 0,
        left: 0,
        width: 0,
        action: "", // 当前进行的操作
        originPoint: {}, // 点击时所在位置
        selectLine: "", // 选择那一条边进行拉伸，为空则不是在拉伸
      },
      myVip: {},
      vipList: {},
      myNoble: {},
      currVipPersent: "", //我的vip进度条
      currNoblePersent: "", //我的贵族进度条
      packShow: false,
    };
  },
  created() {
    this.convert();
    // 全局监听松开事件，放在在内容选择框外松开
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);
    this.getMyVip();
    // this.getMyNoble();
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);
  },
  filters: {
    //保留2位小数点过滤器 不四舍五入
    number(value) {
      var toFixedNum = Number(value).toFixed(3);
      var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
      return realVal;
    },
  },
  methods: {
    ...mapMutations(["SETPIC", "SETUSERNAME", "SETUSERINFO", "SETUSERTOKEN"]),
    selectImg() {
      this.changeImg = true;
    },
    goRegister() {
      this.$store.commit("SETLOGIN", true);
      this.$store.commit("SETISLOGIN", false);
      // if(this.noticeTypes==1){
      //   if(this.$route.query.market_code&&this.$route.query.market_code!='undefined'){
      //     this.$router.push('/register?market_code='+this.$route.query.market_code)
      //   }else{
      //     this.$router.push('/register?market_code=')
      //   }
      // }else{
      //   if(this.$route.query.market_code&&this.$route.query.market_code!='undefined'){
      //     this.$router.push('/RegisterDl?market_code='+this.$route.query.market_code)
      //   }else{
      //    this.$router.push('/RegisterDl?market_code=')
      //   }
      // }
    },
    isPackShow() {
      if (!this.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        return this.$confirm(
          "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
          "Nhắc nhở",
          {
            confirmButtonText: "Đăng ký",
            cancelButtonText: "Đăng nhập",
            confirmButtonClass: "rechargeButton",
            cancelButtonClass: "backButton",
            roundButton: true,
            customClass: "swBox",
            center: true,
            showCancelButton: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
          }
        )
          .then(() => {
            // this.SETUSERTOKEN('');
            this.goRegister();
          })
          .catch((action) => {
            if (action === "cancel") {
              // this.SETUSERTOKEN('');
              // this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.packShow = true;
    },
    goVip() {
      if (!this.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        return this.$confirm(
          "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
          "Nhắc nhở",
          {
            confirmButtonText: "Đăng ký",
            cancelButtonText: "Đăng nhập",
            confirmButtonClass: "rechargeButton",
            cancelButtonClass: "backButton",
            roundButton: true,
            customClass: "swBox",
            center: true,
            showCancelButton: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
          }
        )
          .then(() => {
            // this.SETUSERTOKEN('');
            this.goRegister();
          })
          .catch((action) => {
            if (action === "cancel") {
              // this.SETUSERTOKEN('');
              // this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.$router.push("/vipDetails");
    },
    changeZl() {
      if (this.$store.state.userinfo.user_id < 0) {
        //提示
        return this.$confirm(
          "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
          "Nhắc nhở",
          {
            confirmButtonText: "Đăng ký",
            cancelButtonText: "Đăng nhập",
            confirmButtonClass: "rechargeButton",
            cancelButtonClass: "backButton",
            roundButton: true,
            customClass: "swBox",
            center: true,
            showCancelButton: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
          }
        )
          .then(() => {
            // this.SETUSERTOKEN('');
            this.goRegister();
          })
          .catch((action) => {
            if (action === "cancel") {
              // this.SETUSERTOKEN('');
              // this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.wbj = false;
    },
    changetabIndex(index) {
      if (!this.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        //提示
        return this.$confirm(
          "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
          "Nhắc nhở",
          {
            confirmButtonText: "Đăng ký",
            cancelButtonText: "Đăng nhập",
            confirmButtonClass: "rechargeButton",
            cancelButtonClass: "backButton",
            roundButton: true,
            customClass: "swBox",
            center: true,
            showCancelButton: true,
            dangerouslyUseHTMLString: true,
            distinguishCancelAndClose: true,
          }
        )
          .then(() => {
            // this.SETUSERTOKEN('');
            this.goRegister();
          })
          .catch((action) => {
            if (action === "cancel") {
              // this.SETUSERTOKEN('');
              // this.$store.commit("SETLOGIN", true);
              // this.$store.commit("SETISLOGIN", true);
            }
          });
        // this.tabIndex = index;
      } else {
        this.getMyNoble();
        this.tabIndex = index;
      }
    },
    async refreshPic() {
      let res = await this.$http.get("/api/user/index");
      //console.log(res.data.data)
      if (res && res.data.code == 1) {
        this.avatar = res.data.data.avatar;
        this.SETPIC(res.data.data.avatar);
        this.SETUSERINFO(res.data.data);
        // this.$router.go(0)
      }
    },
    async getMyVip() {
      if (this.$store.state.userinfo.user_id < 0) return;
      let res = await this.$http.get("/api/user/getmyvip");
      if (res && res.data.code == 1) {
        this.myVip = res.data.data;
        // this.vipList = res.data.vip_list;
        let re =
          (((this.myVip.total_recharge-0) / (this.myVip.next_cz_total-0)) * 100) /
          2;
        let ls =
          (((this.myVip.total_flow-0) / (this.myVip.next_flow_total-0)) * 100) / 2;
        this.currVipPersent = (re >= 50 ? 50 : re) + (ls >= 50 ? 50 : ls);
        //console.log(res);
      }
    },
    async getMyNoble() {
      if (this.$store.state.userinfo.user_id < 0) {
        this.myNoble.noble_code = -1;
        this.myNoble.free_watch_nums = "";
        this.myNoble.film_discount = 10;
        this.myNoble.reward = 0;
        this.myNoble.seat = 0;
        this.myNoble.flag = 0;
        this.myNoble.welcome_msg = "";
        this.myNoble.draws = 0;
        this.myNoble.mount = 0;
        this.myNoble.barrage = 0;
        this.myNoble.emoticon = 0;
        this.myNoble.put_hot = 0;
        return;
      }
      let res = await this.$http.get("/api/live/user/get_my_noble/");
      if (res && res.data.code == 1) {
        this.myNoble = res.data.data;

        //console.log(this.myNoble);
        //this.myNoble.exp = parseInt(this.myNoble.exp);
        if (this.myNoble.next_min_exp == 0) {
          this.currNoblePersent = 0;
        } else {
          this.currNoblePersent = (
            (parseInt(this.myNoble.exp) / (this.myNoble.next_min_exp - 0)) *
            100
          ).toFixed(2);
          //console.log(this.currNoblePersent);
          if (this.currNoblePersent < 0) {
            this.currNoblePersent = 0;
          } else if (this.currNoblePersent > 100) {
            this.currNoblePersent = 100;
          }
        }
      }
    },
    convert: function () {
      this.getUserInfo();
    },
    searchIn() {
      this.$nextTick(function () {
        document.getElementById("inputVal").focus();
      });
    },
    searchIn1() {
      this.$nextTick(function () {
        document.getElementById("inputVal1").focus();
      });
    },
    //获取用户个人信息
    getUserInfo(flag) {
      if (!this.codeToken) {
        return;
      }

      //缓存个人资料
      if (!flag && this.userinfo.bio) {
        //        //console.log(23232)
        //        //console.log(this.userinfo.gender)
        //        //console.log(this.userinfo.nickname)
        //        //console.log(this.userinfo.profile)
        //        //console.log(this.userinfo)
        //        //console.log(this.avatar)
        this.nickname = this.userinfo.nickname || "Biệt danh của tôi";
        this.bio = this.userinfo.bio || "Chữ ký riêng~";
        this.value = this.userinfo.gender || "Chưa chọn~";
        this.avatar = this.userinfo.avatar;

        if (this.value == 0) {
          this.value = "Chưa chọn";
        } else if (this.value == 1) {
          this.value = "Nam";
        } else if (this.value == 2) {
          this.value = "Nữ";
        }
        return;
      }
      this.$http.get("/api/user/index").then((res) => {
        console.log(res);
        if (res && res.data.code == 1) {
          if (res.data.gender == 0) {
            this.value = "Chưa chọn";
          } else if (res.data.gender == 1) {
            this.value = "Nam";
          } else if (res.data.gender == 2) {
            this.value = "Nữ";
          }
          this.nickname = res.data.data.nickname || "Biệt danh của tôi";
          this.bio = res.data.data.bio || "~";
          this.avatar = res.data.data.avatar;
          this.SETUSERINFO(res.data.data);
          this.SETPIC(res.data.data.avatar);
        }
      });

      // 请求余额
      //       this.$http.get("/api/user/balance").then(res => {
      //        if (res&&res.data.code == 1) {
      //          this.amount = numberComma(res.data.data.balance)
      //        }
      //      });
    },
    save() {
      // this.position = position;
      if (this.nickname == "") {
        this.$message({
          type: "warning",
          message: "Tên người dùng không được để trống",
          offset: 225,
        });
      } else if (this.bio == "") {
        this.$message({
          type: "warning",
          message: "Chữ ký cá nhân không được để trống",
          offset: 225,
        });
      } else {
        let gender = this.value;
        let g = null;
        if (gender == "Nữ") {
          g = 2;
        } else if (gender == "Nam") {
          g = 1;
        } else if (gender == "Chưa chọn~") {
          g = 0;
        }
        //  console.log(888888,g)
        this.btnLoading = true;
        this.wbj = true;
        // .post("/api2/index/edit", {
        //     nickname: this.nickname,
        //     email: this.email,
        //     phone: this.phone,
        //     profile: this.profile,
        //     gender: gender
        //   })
        let d = this.globalPpproach.checkIsEncrypt({
          //avatar: this.avatar,
          nickname: this.nickname,
          bio: this.bio,
          gender: g,
        });
        // console.log({ nickname: this.nickname,
        //   bio: this.bio,
        //   gender: gender,})
        this.$http.post("/api/user/profile", d).then((res) => {
          //console.log(res)
          if (res && res.data.code == 1) {
            this.SETUSERNAME(this.nickname);
            this.refreshPic();
            this.btnLoading = false;
            this.wbj = true;
            this.$message({
              type: "success",
              message: "Dữ liệu sửa đổi thành công",
              offset: 225,
            });
            // alertComfirm({msg:'修改成功'}, ()=> {
            //   this.$router.push('/userInfor')
            // })
            // setTimeout(() => {
            //   this.$ro.push("/userInfor");
            // }, 1000);
          } else {
            this.btnLoading = false;
            alertComfirm({ msg: res.data.msg }, () => {
              this.$router.push("/userInfor");
            });
          }
        });
      }
    },

    // 获取图片宽高
    getImgSize(url) {
      return new Promise((resolve) => {
        let $img = document.createElement("img");
        $img.src = url;
        $img.style.opacity = 0;
        $img.addEventListener("error", () => {
          document.body.removeChild($img);
          resolve(false);
        });
        $img.addEventListener("load", () => {
          const data = {
            width: $img.naturalWidth,
            height: $img.naturalHeight,
          };
          document.body.removeChild($img);
          resolve(data);
        });
        document.body.appendChild($img);
      });
    },

    // 从base64转化为file文件
    base64ToFile(base64Str, fileName) {
      const params = base64Str.split(",");
      const mime = params[0].match(/:(.*?)/)[1];
      const fileData = atob(params[1]); // 解码Base64
      let { length } = fileData;
      const uint8Array = new Uint8Array(length);
      while (length) {
        length -= 1;
        uint8Array[length] = fileData.charCodeAt(length);
      }
      return new File([uint8Array], fileName, { type: mime });
    },

    // 获取驼峰写法
    getCamelCase(text) {
      return text.replace(/-[a-z]+?/g, (matchStr) => matchStr[1].toUpperCase());
    },

    // 获取首单词大写
    getWord(text) {
      return text[0].toUpperCase() + text.substr(1);
    },

    // 鼠标点击
    onMouseDown(event, action, direction) {
      const { selectData } = this;
      selectData.action = action;
      selectData.direction = direction || "";
      selectData.originPoint = {
        x: event.clientX > 0 ? event.clientX : 0,
        y: event.clientY > 0 ? event.clientY : 0,
      };
    },

    // 鼠标松开
    onMouseUp() {
      const { selectData } = this;
      selectData.action = "";
      selectData.direction = "";
    },

    // 鼠标移动
    onMouseMove(event) {
      const { selectData, containerBoxData } = this;
      const { x, y } = selectData.originPoint;
      const moveX = event.clientX - x; // X轴移动的距离
      const moveY = event.clientY - y; // Y轴移动的距离
      if (selectData.action === "move") {
        // 移动选择框
        this.doMove(selectData, containerBoxData, moveX, moveY);
      } else if (selectData.action === "stretch") {
        // 拉伸选择框
        this.doStretch(selectData, containerBoxData, moveX, moveY);
      } else {
        return;
      }

      selectData.originPoint = {
        x: event.clientX > 0 ? event.clientX : 0,
        y: event.clientY > 0 ? event.clientY : 0,
      };

      this.setPreview();
    },

    // 选择框移动
    doMove(selectData, containerBoxData, moveX, moveY) {
      selectData.top += moveY;
      selectData.left += moveX;
      if (selectData.top < 0) {
        selectData.top = 0;
      }
      if (selectData.left < 0) {
        selectData.left = 0;
      }
      if (selectData.top + selectData.width > containerBoxData.height) {
        selectData.top = containerBoxData.height - selectData.width;
      }
      if (selectData.left + selectData.width > containerBoxData.width) {
        selectData.left = containerBoxData.width - selectData.width;
      }
    },

    // 选择框拉伸
    doStretch(selectData, containerBoxData, moveX, moveY) {
      const { minWidth } = this;

      // 获取溢出长度
      function getOverflowLength() {
        const overflowLeft = selectData.left < 0 ? -selectData.left : 0;
        const overflowTop = selectData.top < 0 ? -selectData.top : 0;
        const overflowRight =
          selectData.left + selectData.width > containerBoxData.width
            ? selectData.left + selectData.width - containerBoxData.width
            : 0;
        const overflowBottom =
          selectData.top + selectData.width > containerBoxData.height
            ? selectData.top + selectData.width - containerBoxData.height
            : 0;
        const overflowWidth =
          selectData.width < minWidth ? minWidth - selectData.width : 0;
        return Math.max(
          overflowLeft,
          overflowTop,
          overflowRight,
          overflowBottom,
          overflowWidth
        );
      }

      // 向左拉伸
      function doStretchLeft(action) {
        let space = moveX;
        space = action === "preDo" ? space : -space;
        selectData.top += space / 2;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchRight(action) {
        let space = moveX;
        space = action === "preDo" ? space : -space;
        selectData.top -= space / 2;
        selectData.width += space;
      }

      function doStretchTop(action) {
        let space = moveY;
        space = action === "preDo" ? space : -space;
        selectData.top += space;
        selectData.left += space / 2;
        selectData.width -= space;
      }

      function doStretchBottom(action) {
        let space = moveY;
        space = action === "preDo" ? space : -space;
        selectData.left -= space / 2;
        selectData.width += space;
      }

      function doStretchTopLeft(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY;
        space = action === "preDo" ? space : -space;
        selectData.top += space;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchTopRight(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY;
        space = action === "preDo" ? space : -space;
        selectData.top -= space;
        selectData.width += space;
      }

      function doStretchBottomLeft(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY;
        space = action === "preDo" ? space : -space;
        selectData.left += space;
        selectData.width -= space;
      }

      function doStretchBottomRight(action) {
        let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY;
        space = action === "preDo" ? space : -space;
        selectData.width += space;
      }

      const doStretchFun = {
        doStretchLeft,
        doStretchRight,
        doStretchTop,
        doStretchBottom,
        doStretchTopLeft,
        doStretchTopRight,
        doStretchBottomLeft,
        doStretchBottomRight,
      }[`doStretch${this.getWord(this.getCamelCase(selectData.direction))}`];

      doStretchFun("preDo");
      let overflowLength = getOverflowLength();
      if (overflowLength > 0) {
        doStretchFun("reset");
      }
    },

    // 设置预览图
    setPreview() {
      const { selectData, scaleRate } = this;
      const $canvas = this.$refs.$canvas.getContext("2d");
      $canvas.clearRect(0, 0, 190, 190);
      $canvas.drawImage(
        this.$refs.$img,
        Math.floor(selectData.left / scaleRate),
        Math.floor(selectData.top / scaleRate),
        selectData.width / scaleRate,
        selectData.width / scaleRate,
        0,
        0,
        190,
        190
      );
    },

    // 选择图片
    fileChange(event) {
      const fileObj = event.target.files[0];
      const reader = new FileReader();
      console.log(fileObj);
      reader.onload = () => {
        const { selectData, containerBoxData } = this;
        this.imgURL = reader.result;
        this.getImgSize(this.imgURL).then((result) => {
          if (result.width > result.height) {
            // 350为外盒子宽高
            this.scaleRate = 350 / result.width;
            containerBoxData.width = 350;
            containerBoxData.height = Math.floor(
              result.height * this.scaleRate
            );
            selectData.top = 0;
            selectData.left = (350 - containerBoxData.height) / 2;
            selectData.width = containerBoxData.height;
          } else {
            this.scaleRate = 350 / result.height;
            containerBoxData.height = 350;
            containerBoxData.width = Math.floor(result.width * this.scaleRate);
            selectData.left = 0;
            selectData.top = (350 - containerBoxData.width) / 2;
            selectData.width = containerBoxData.width;
          }
          this.setPreview();
        });
      };
      reader.readAsDataURL(fileObj);
    },

    // 确认
    onEnter() {
      if (this.imgURL) {
        if (this.returnType === "url") {
          this.$emit("enter", this.$refs.$canvas.toDataURL()); // 返回链接
          this.avatar = this.$refs.$canvas.toDataURL();
          // let inputDOM = this.$refs.inputer;
          // this.file = inputDOM.files[0];
          // this.formData.append("file", this.file);
          // let config = {
          //   headers:{'Content-Type':'multipart/form-data'}
          // };
          let d = this.globalPpproach.checkIsEncrypt({
            avatar: this.avatar,
            is_auto_save: 1,
          });
          console.log(this.file);
          this.$http
            // .post("/api/common/upload", this.formData,config)
            .post("/api/common/uploadavatar", d)
            .then((res) => {
              if (res && res.data.code == 1) {
                this.refreshPic();
                console.log(res);
                console.log(res.data.data);
                this.changeImg = false;
                this.$message({
                  type: "success",
                  message: "Hình đại diện tải lên thành công",
                  offset: 225,
                });
              } else {
                alertComfirm({ msg: res.data.msg }, () => {
                  this.$router.push("/userInfor");
                });
              }
            });
        } else if (this.returnType === "file") {
          this.$emit(
            "enter",
            this.base64ToFile(this.$refs.$canvas.toDataURL(), "avatar.png")
          ); // 返回文件
        }
      } else {
        this.$message("Vui lòng tải lên ảnh đại diện", "error");
      }
    },

    // 取消
    onCancel() {
      this.changeImg = false;
      this.$emit("cancel");
    },
  },
  watch: {
    nickname: function (n) {
      this.$nextTick(() => {
        this.nickname = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
    connect: function (n) {
      this.$nextTick(() => {
        this.connect = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
    userinfo: function (n) {
      if (n) {
        console.log(n);
        this.avatar = n.avatar;
        this.nickname = n.nickname;
        this.bio = n.bio;
        n.gender == 1 ? (this.value = "Nam") : (this.value = "Nữ");
        this.getMyVip();
      } else {
        this.myVip = {};
      }
    },
  },
};
</script>

<style scoped lang="less">
#userInfor {
  overflow: hidden;
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
      background: #1486ff;
      border-radius: 7px;
      position: relative;
      top: 2px;
      margin-right: 10px;
    }
    span {
      float: right;
      font-size: 14px;
      color: #1486ff;
      cursor: pointer;
    }
  }
  .info-content {
    width: 75%;
    margin-top: 30px;
    padding-left: 20px;
    p {
      &:first-of-type {
        margin-right: 37px;
      }
      label {
        display: block;
        margin-right: 20px;
        margin-left: 5px;
        font-size: 14px;
        color: #555;
        padding-top: 12px;
      }
      span {
        display: inline-block;
        width: 260px;
        height: 42px;
        background: rgba(245, 245, 245, 1);
        border-radius: 4px;
        color: #6a86b9;
        font-size: 14px;
        padding-left: 15px;
        line-height: 42px;
      }
      select {
        border: 0;
        display: inline-block;
        width: 340px;
        height: 42px;
        background: rgba(245, 245, 245, 1);
        border-radius: 4px;
        color: #6a86b9;
        font-size: 14px;
        padding-left: 15px;
        line-height: 42px;
      }
      .el-input {
        width: 260px;
      }
      // .el-select {
      //   display: inline-block;
      //   width: 340px;
      //   height: 42px;
      //   text-align: right;

      //   .el-input {
      //     .el-input__inner {
      //       text-align: right !important;
      //     }
      //   }
      // }
      .el-textarea {
        // width: 340px;
      }
      .defu {
        cursor: default;
      }
    }
  }
  .txtTrue {
    width: 15%;
    text-align: center;
    margin-top: 40px;
    float: left;
    span {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin: 0 auto;
      position: relative;
      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        cursor: pointer;
      }
      i {
        position: absolute;
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        text-align: center;
        line-height: 90px;
        color: #fff;
        font-size: 14px;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.6;
        display: none;
      }
    }
    a {
      display: inline-block;
      width: 340px;
      height: 42px;
      text-align: left;
      background: rgba(245, 245, 245, 1);
      border-radius: 4px;
    }
    span:hover {
      i {
        position: absolute;
        display: block;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        text-align: center;
        line-height: 90px;
        color: #fff;
        font-size: 14px;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.6;
        cursor: pointer;
      }
    }
  }

  .btn {
    display: inline-block;
    text-align: center;
    margin: 0;
    border: 0;
    float: right;
    button {
      width: 40px;
      height: 20px;
      line-height: 20px;
      font-weight: bold;
      font-size: 14px;
      color: #1486ff;
      cursor: pointer;
      margin-left: 0;
      background: none !important;
      float: right;
      padding: 0 !important;
    }
  }
}

.content-main {
  .tab-title {
    height: 43px;
    font-size: 20px;
    color: #666;
    border-bottom: 1px solid #f4f5f8;
    margin-top: 35px;
    span {
      margin-right: 28px;
      padding-bottom: 21px;
      cursor: pointer;
      &.active,&.active-green,&.active-pink,&.active-blue {
        color: #1486ff;
        position: relative;
        &:before {
          content: "";
          width: 38px;
          height: 4px;
          background: #1486ff;
          border-radius: 2px;
          position: absolute;
          bottom: 0;
          left: 15px;
        }
      }
      &.active-green{
        &:before{
          background: #09B584 !important;
        }
      }
      &.active-pink{
        &:before{
          background: #FB7772 !important;
        }
      }
      &.active-blue{
        &:before{
          background: #00B4D8 !important;
        }
      }
    }
    .hydlb {
      font-weight: bold;
      float: right;
      font-size: 14px;
      color: #1486ff;
      cursor: pointer;
      margin-top: 10px;
    }
  }
  h4 {
    font-weight: normal;
    font-size: 20px;
    color: #333;
    margin-top: 25px;
  }
  .progress-bar {
    span {
      line-height: 40px;
    }
    .bar {
      width: 498px;
      height: 8px;
      background: #ffffff;
      border: 1px solid #bfbfbf;
      border-radius: 4px;
      margin: 18px 10px 0;
      position: relative;
      .jd {
        display: inline-block;
        position: absolute;
        left: 0px;
        top: -1px;
        background: #1486ff;
        border-radius: 4px;
        width: 0%;
        height: 8px;
        z-index: 99;
        // border: 2px solid #1486ff;
      
      }
      .text {
        height: 21px;
        font-size: 12px;
        color: #fff;
        background: #bfbfbf;
        border-radius: 4px;
        padding: 3px 5px;
        position: relative;
        top: 8px;
        z-index: 99;
        &:after {
          content: "";
          width: 0;
          height: 0;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
          border-bottom: 5px solid #bfbfbf;
          position: absolute;
          top: -5px;
          left: 50%;
          margin-left: -4px;
        }
      }
    }
    .look-btn {
      width: 160px;
      height: 40px;
      font-size: 20px;
      color: #fff;
      background: linear-gradient(0deg, #1486ff -68600%, #4ba1ff -64600%);
      border-radius: 20px;
      margin-left: 20px;
      a {
        color: #fff;
      }
    }
  }
  table {
    width: 800px;
    margin-top: 23px;
    tr,
    th,
    td {
      font-size: 14px;
      border: 1px solid #bfbfbf;
      text-align: center;
    }
    th {
      height: 50px;
      color: #999;
      background: #f7f7f7;
      width: 25%;
    }
    td {
      height: 70px;
      color: #333;
    }
    .swlq {
      padding: 0 15px;
      span {
        display: block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: linear-gradient(0deg, #1486ff -68600%, #4ba1ff -64600%);
        border-radius: 20px;
        color: #fff;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
  .list {
    li {
      width: 20%;
      text-align: center;
      float: left;
      margin-top: 41px;
      &.gray {
        filter: grayscale(100%);
      }
      img {
        width: 63px;
      }
      p {
        font-size: 15px;
        color: #333;
        padding-top: 10px;
      }
    }
  }
}
.c-avatar-cutter {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  user-select: none;
  align-items: center;
  justify-content: center;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .container {
    position: absolute;
    padding: 20px;
    width: 642px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
    margin-top: 0 !important;
    > span {
      display: inline-block;
      float: right;
      overflow: hidden;
      img {
        width: 14px;
      }
    }
  }
  .content {
    display: flex;
    height: 350px;
    margin-bottom: 20px;
  }
}
.c-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 350px;
  border: solid 1px #e8e8e8;
  background-repeat: round;
  background-image: url(../../assets/imgaes/member/empty.png);
  .container-box {
    position: relative;
  }
  .img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: white;
  }
  img {
    width: 100%;
    height: 100%;
    max-width: 350px;
  }
  .select-box {
    position: absolute;
    top: 0;
    left: 0;
    cursor: move;
  }
  .x-line,
  .y-line {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    height: 100%;
    li {
      position: relative;
      border: dashed 1px white;
    }
    li:nth-child(1):before,
    li:nth-last-child(1):before {
      position: absolute;
      margin-left: -3px;
      margin-top: -3px;
      width: 6px;
      height: 6px;
      content: "";
      background-color: white;
    }
  }
  .x-line {
    flex-direction: column;
    li:nth-child(1) {
      cursor: n-resize;
      &:before {
        left: 50%;
      }
    }
    li:nth-last-child(1) {
      cursor: s-resize;
      &:before {
        left: 50%;
      }
    }
  }
  .y-line {
    li:nth-child(1) {
      cursor: w-resize;
      &:before {
        top: 50%;
      }
    }
    li:nth-last-child(1) {
      cursor: e-resize;
      &:before {
        top: 50%;
      }
    }
  }
  .point {
    width: 100%;
    height: 100%;
    li {
      position: absolute;
      margin-left: -3px;
      margin-top: -3px;
      width: 6px;
      height: 6px;
      content: "";
      cursor: crosshair;
      background-color: white;
    }
    li:nth-child(1) {
      top: 2px;
      left: 1px;
      cursor: nw-resize;
    }
    li:nth-child(2) {
      top: 2px;
      right: -2px;
      cursor: ne-resize;
    }
    li:nth-child(3) {
      bottom: -2px;
      left: 1px;
      cursor: sw-resize;
    }
    li:nth-child(4) {
      bottom: -2px;
      right: -2px;
      cursor: se-resize;
    }
  }
  .cross {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    min-width: unset;
    margin-top: -3px;
    margin-left: -3px;
    background-size: cover;
    // background-image: url(../../assets/imgaes/member/icon-cancel.png);
  }
}

.c-left--doing {
  background-image: url(../../assets/imgaes/member/empty--pure.png);
}

.c-right {
  flex: 1;
  position: relative;
  margin-left: 24px;
  font-size: 16px;
  color: #333333;
  text-align: center;

  .preview {
    padding: 0 16px 34px;
    border: solid 1px #e8e8e8;
    background-color: #fafafa;

    .yl {
      height: 62px;
      line-height: 62px;
      margin: 0 !important;
    }
    canvas {
      position: relative;
      top: 5px;
      left: 5px;
      display: block;
      width: 190px;
      height: 190px;
      border-radius: 50%;
      border: solid 1px #e8e8e8;
      background-repeat: round;
      background-image: url(../../assets/imgaes/member/empty.png);
    }
    .canvas--doing {
      background-image: url(../../assets/imgaes/member/empty--pure.png);
    }
  }
  .btn-upload {
    margin-top: 20px;
    width: 100%;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    color: #333;
    border-radius: 4px;
    background-color: #d0d1d3;
  }
  input[type="file"] {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 42px;
    border-radius: 4px;
    opacity: 0;
    background-color: white;
  }
}
.c-btn-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  input {
    padding: 0;
    margin: 0 12px;
    width: 340px;
    height: 42px;
    color: white;
    line-height: 40px;
    font-size: 14px;
    border-radius: 20px;
  }
  .btn-cancel {
    background-color: #cccccc;
  }
  .btn-enter {
    background-color: #1486ff;
  }
  .btn-enter--disable {
    cursor: not-allowed;
  }
}
</style>
