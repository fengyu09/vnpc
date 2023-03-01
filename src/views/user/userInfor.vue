<template>
  <div id="userInfor">
    <div v-show="!packShow">
      <h3>
        <i :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"></i>{{$t('userInfor.text[0]')}}
        <span @click="changeZl" v-if="wbj" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('userInfor.text[1]')}}</span>
        <p class="btn" v-if="!wbj" style="margin-left: 4px">
          <el-button @click="save()" :loading="btnLoading">{{$t('userInfor.text[2]')}}</el-button>
        </p>
      </h3>
      <section class="c-avatar-cutter" v-if="changeImg" @dragstart="false">
        <div class="mask"></div>
        <div class="container g-popup-box">
          <p class="title">
            {{$t('userInfor.changePic[0]')}}
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
                <p class="yl">{{$t('userInfor.changePic[1]')}}</p>
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
                :value="!imgURL ? $t('userInfor.changePic[2]') : $t('userInfor.changePic[3]')"
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
            <input
              @click="onEnter"
              type="button"
              class="btn-enter"
              style="cursor: pointer"
              :class="{ 'btn-enter--disable': !imgURL }"
              :value="$t('userInfor.changePic[4]')"
            />
          </div>
        </div>
      </section>
      <div class="clearfix">
        <div class="txtTrue fl">
          <span>
            <img ref="imgSf" v-lazy="avatar" />
            <i v-if="!wbj" @click="selectImg">
              {{$t('userInfor.changePic[0]')}}
            </i>
          </span>
        </div>
        <div class="info-content fl">
          <div class="fl">
            <label>{{$t('userInfor.inputTitle[0]')}}:</label>
            <span v-if="wbj">{{ nickname }}</span>
            <el-input
              v-if="!wbj"
              v-model="nickname"
              :placeholder="$t('userInfor.pla[0]')"
              maxlength="10"
              id="inputVal"
            ></el-input>
            <!-- <a class="defu" @click="searchIn">编辑</a> -->
          </div>
          <div class="fl">
            <label>{{$t('userInfor.inputTitle[1]')}}:</label>
            <!-- <span v-if="wbj">{{value}}</span> -->
            <el-select
              v-if="wbj"
              v-model="value"
              clearable
              :placeholder="$t('userInfor.pla[1]')+' ~'"
              disabled="disabled"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select v-if="!wbj" v-model="value" :placeholder="$t('userInfor.pla[1]')+' ~'">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="fl">
            <label>{{$t('userInfor.inputTitle[2]')}}:</label>
            <span v-if="wbj&&lanCode==1">+84 {{phone}}</span>
            <span v-if="wbj&&lanCode==5"> {{phone}}</span>
            <p class="phone-box fl" v-if="!wbj &&!telPrompt">
              <strong v-if="lanCode==1" class="country-code">+84</strong>
              <el-input class="phone" ref="phone" :disabled="phoneDisabled" v-model="phone" type="tel"  :maxlength="lanCode==1?10:20"></el-input>
            </p>
            <span class="prompt" v-if="telPrompt" @click="telClick()">{{$t('userInfor.pla[2]')}}</span>
          </div>
          <div class="fl">
            <label>{{$t('userInfor.inputTitle[3]')}}:</label>
            <span v-if="wbj">{{email}}</span>
            <el-input v-if="!wbj && !emailPrompt" ref="email"  :disabled="emailDisabled" v-model="email"></el-input>
            <span class="prompt" v-if="emailPrompt" @click="emailClick()">{{$t('userInfor.pla[3]')}}</span>
          </div>
          <div class="fl">
            <label>{{$t('userInfor.inputTitle[4]')}}:</label>
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
              :placeholder="$t('userInfor.pla[4]')"
              maxlength="50"
              v-model="bio"
              show-word-limit
            ></el-input>
          </div>
        </div>
      </div>
      <div class="content-main">
        <div class="tab-title">
          <span @click="tabIndex = 0" :class="[{ active: tabIndex == 0 },{ 'active-pink': tabIndex == 0 &&skin==1 },{ 'active-blue': tabIndex == 0 &&skin==2},{ 'active-green': tabIndex == 0 &&skin==3},{'pink-color':skin==1 },{'blue-color':skin==2},{'green-color':skin==3}]"
            >{{$t('userInfor.text[3]')}}</span
          >
         
          <!-- <router-link class="hydlb" to="memberPackage">会员礼包</router-link> -->
          <a class="hydlb" @click="isPackShow()" :class="[{'pink-color':skin==1},{'blue-color':skin==2},{'green-color':skin==3}]">{{$t('userInfor.memberPackage.text[0]')}}</a>
        </div>
        <div class="my-vip" v-show="tabIndex == 0">
          <p style="padding-top: 43px; padding-bottom: 8px" >
            {{$t('userInfor.text[4]')}}:
            <font style="color: #ff502b">{{ myVip.vip_name }}</font>
          </p>
          <div class="progress-bar clearfix">
            <span class="fl" style="font-size: 20px">{{ myVip.vip_name }}</span>
           
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
              <a @click="goVip()" >{{$t('userInfor.text[14]')}}</a>
            </button>
          </div>
          <p
            style="padding-top: 27px"
           v-if="myVip.vip_code != myVip.next_vip_code"
          >
            {{$t('userInfor.text[6]')}} <font style="color: #ff502b">{{
              myVip.upgrade_cz 
            }}</font
            > {{$t('moneyDw')}} {{$t('userInfor.text[7]')}} <font style="color: #ff502b">{{
              myVip.upgrade_flow 
            }} {{$t('moneyDw')}} </font>
          </p>
          <h4>{{$t('userInfor.text[8]')}}</h4>
          <table>
            <tr>
              <th>{{$t('userInfor.text[9]')}}</th>
              <th>{{$t('userInfor.text[10]')}}</th>
              <th>{{$t('userInfor.text[11]')}}</th>
              <th>{{$t('userInfor.text[12]')}}</th>
              <th>{{$t('userInfor.text[13]')}} </th>
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
                <span style="background:#eee;color:#999"  v-if="myVip.receive_in_kind == 1">{{$t('userInfor.memberPackage.text[4]')}}</span>
                <span @click="isPackShow()"  v-if="myVip.receive_in_kind == 2">{{$t('userInfor.memberPackage.text[3]')}}</span>
            </td>
            </tr>
          </table>
        </div>
        
      </div>
    </div>
    <memberPackage v-show="packShow"></memberPackage>
    <!-- 号码或邮箱未填提示 -->
    <div class="layer-bg" v-if="layerIsShow">
        <div class="layer-main">
            <img class="close" @click="layerIsShow = false" src="../../assets/imgaes/member/x.png" alt="">
            <img class="icon" src="../../assets/imgaes/member/tip.png" alt="">
            <p>{{$t('userInfor.warnText[1]')}} </p>
            <button @click="layerIsShow = false">{{$t('userInfor.memberPackage.text[5]')}}</button>
        </div>
    </div>
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
    ...mapState(["codeToken", "userinfo","skin","lanCode"]),
  },
  name: "userInfor",
  data() {
    return {
      btnLoading: false,
      changeImg: false,
      nickname: "",
      bio: "",
      phone: '',
      email:'',
      telPrompt:false,
      emailPrompt:false,
      wbj: true,
      phoneDisabled:false,
      emailDisabled:false,
      tabIndex: 0,
      options: [
        {
          value: "1",
          label: this.$t('userInfor.pla[5]'),
        },
        {
          value: "2",
          label: this.$t('userInfor.pla[6]'),
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
      layerIsShow:false,
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
     
    },
    isPackShow() {
      if (!this.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});
      }
      this.packShow = true;
    },
    goVip() {
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
       return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});
      }
      this.$router.push("/vipDetails");
    },
    changeZl() {
      if (this.$store.state.userinfo.user_id < 0) {
        //提示
        return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});
      }
      if(this.userinfo.mobile != null && this.userinfo.mobile != ""){
        this.phoneDisabled=true;
      }
      if(this.userinfo.email != null &&this.userinfo.email != ""){
        this.emailDisabled=true;
      }
      this.wbj = false;
    },
    changetabIndex(index) {
      if (!this.codeToken) {
        alertComfirm({ msg: this.$t('loginTip') }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (this.$store.state.userinfo.user_id < 0) {
        //提示

         return alertComfirm({
          msg:this.$t('home.tkText[5]'),
          title:this.$t('home.tkText[6]'),
          conBtText: this.$t('home.tkText[7]'),
          cancelButtonText: this.$t('home.tkText[8]'),
          showCancelButton:true,
        },()=>{
          this.goRegister();
        },()=>{});

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
        if (this.myNoble.next_min_exp == 0) {
          this.currNoblePersent = 0;
        } else {
          this.currNoblePersent = (
            (parseInt(this.myNoble.exp) / (this.myNoble.next_min_exp - 0)) *
            100
          ).toFixed(2);
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
        this.nickname = this.userinfo.nickname || this.$t('userInfor.text[15]');
        this.bio = this.userinfo.bio || this.$t('userInfor.text[16]');
        this.value = this.userinfo.gender || this.$t('userInfor.pla[1]')+"~";
        this.avatar = this.userinfo.avatar;
        this.phone = this.userinfo.mobile;
        this.email = this.userinfo.email;
        if (this.value == 0) {
          this.value = this.$t('userInfor.pla[5]');
        } else if (this.value == 1) {
          this.value = this.$t('userInfor.pla[5]');
        } else if (this.value == 2) {
          this.value = this.$t('userInfor.pla[6]');
        }
        // console.log(this.phone)
        return;
      }
      this.$http.get("/api/user/index").then((res) => {
        //console.log(res);
        if (res && res.data.code == 1) {
          if (res.data.gender == 0) {
            this.value = this.$t('userInfor.pla[1]');
          } else if (res.data.gender == 1) {
            this.value = this.$t('userInfor.pla[5]');
          } else if (res.data.gender == 2) {
            this.value = this.$t('userInfor.pla[6]');
          }
          if(this.userinfo.mobile != null && this.userinfo.mobile.length == 8 &&this.userinfo.mobile != ""){
            this.phoneDisabled=true;
          }
          if(this.userinfo.email != null&&this.userinfo.email != ""){
            this.emailDisabled=true;
          }
          
          this.nickname = res.data.data.nickname || this.$t('userInfor.text[16]');
          this.bio = res.data.data.bio || "~";
          this.avatar = res.data.data.avatar;
          this.phone = res.data.data.mobile;
          this.email = res.data.data.email;
          this.SETUSERINFO(res.data.data);
          this.SETPIC(res.data.data.avatar);
        }
      });

 
    },
     phoneverify(e) {
      this.phone = e.target.value.replace(/[^\d]/g, '')
      console.log(this.phone);
    },
    emailClick(){
      this.emailPrompt = false;
      this.$nextTick(()=>{
        this.$refs.email.focus();
      })
     
    },
    telClick(){
      this.telPrompt = false;
      this.$nextTick(()=>{
        this.$refs.phone.focus();
      })
    },
    save() {
      if(this.phone==null && this.email == null){
        this.layerIsShow = true;
        this.telPrompt = true;
        this.emailPrompt = true;
        return
      }else if(this.phone==null){
        this.telPrompt = true;
        return
      }else if(this.email==null){
        this.emailPrompt = true;
        return
      }
      if(this.lanCode==1){
         if(this.phone.length<8 || this.phone.length == 8 || this.phone.length<10  ||  this.phone.length == 10){
        let tel = '+84'+this.phone
        if(!/^(?:(?:\+|00)84)?\d{8,10}$/.test(tel)){
            this.$message({
              message: this.$t('userInfor.warnText[5]'),
              type: "warning",
          });
          this.$nextTick(()=>{
            this.$refs.phone.focus();
          })
          return
         }
      }
      }
     
      if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.email)){
          this.emailPrompt = true;
          this.$message({
            message: this.$t('userInfor.warnText[1]'),
            type: 'warning'
          });
          this.$nextTick(()=>{
            this.$refs.email.focus();
          })
          return
      }

      if (this.nickname == "") {
        this.$message({
          type: "warning",
          message: this.$t('userInfor.changePic[5]'),
          offset: 225,
        });
      } 
     
      else {
        let gender = this.value;
        let g = null;
        if (gender == this.$t('userInfor.pla[6]') ||gender == 2) {
          g = 2;
        } else if (gender == this.$t('userInfor.pla[5]')||gender == 1) {
          g = 1;
        } else if (gender == this.$t('userInfor.pla[1]')+"~"||gender == 0) {
          g = 0;
        }
        this.btnLoading = true;
        this.wbj = true;
        let d = this.globalPpproach.checkIsEncrypt({
          nickname: this.nickname,
          bio: this.bio,
          gender: g,
          mobile:this.phone,
          email:this.email
        });
        
        this.$http.post("/api/user/profile", d).then((res) => {
          //console.log(res)
          if (res && res.data.code == 1) {
            this.SETUSERNAME(this.nickname);
            this.refreshPic();
            this.btnLoading = false;
            this.wbj = true;
            this.$message({
              type: "success",
              message: this.$t('userInfor.warnText[2]'),
              offset: 225,
            });
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
         
          let d = this.globalPpproach.checkIsEncrypt({
            avatar: this.avatar,
            is_auto_save: 1,
          });
          console.log(this.file);
          this.$http
            .post("/api/common/uploadavatar", d)
            .then((res) => {
              if (res && res.data.code == 1) {
                this.refreshPic();
                console.log(res);
                console.log(res.data.data);
                this.changeImg = false;
                this.$message({
                  type: "success",
                  message: this.$t('userInfor.warnText[3]'),
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
        this.$message(this.$t('userInfor.warnText[0]'), "error");
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
        //console.log(n);
        this.avatar = n.avatar;
        this.nickname = n.nickname;
        this.bio = n.bio;
        n.gender == 1 ? (this.value = this.$t('userInfor.pla[5]')) : (this.value = this.$t('userInfor.pla[6]'));
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
    width: 80%;
    margin-top: 30px;
    padding-left: 20px;
    >div {
      &:first-of-type,&:nth-of-type(3) {
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
      .phone-box{
        width: 300px;
        height: 42px;
        background: #f5f5f5;
        padding-left: 15px;
        border-radius: 4px;
        overflow: hidden;
        .country-code{
          line-height: 42px;
          font-size: 14px;
          font-weight: normal;
          color:#6A86B9;
        }
      }
      .prompt{
        line-height: 15px;
        font-size: 10px;
        color: #FC3F3F;
        padding-top: 6px;
        padding-left: 3px;
      }
      span {
        display: inline-block;
        width: 300px;
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
        width: 300px;
      }
      .el-select {
        display: inline-block;
        width: 300px;
        height: 42px;
        text-align: right;

        // .el-input {
        //   .el-input__inner {
        //     text-align: right !important;
        //   }
        // }
      }
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
.layer-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(64, 61, 61, 0.45);
    top: 0;
    left: 0;
    z-index: 9999;
    .layer-main{
      width: 355px;
      height: 260px;
      font-size: 18px;
      color: #555;
      background: #fff;
      border-radius: 10px;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      .close{
        width: 17px;
        position: absolute;
        top: 12px;
        right: 17px;
      }
      .icon{
        width: 55px;
        margin-top: 27px;
        margin-bottom: 34px;
      }
      button{
        width: 160px;
        height: 48px;
        font-size: 18px;
        color: #fff;
        left: 976px;
        top: 597px;
        background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
        border-radius: 66px;
        margin-top: 37px;
      }
    }
}
</style>
