<template>
  <div id="openResult">
    <div class="history">
      <div class="select-box clearfix">
        <el-select
          v-model="value"
          class="fl lottery-change"
          clearable
          placeholder="Mời chọn "
          @change="changeSelect(value)"
        >
          <el-option
            v-for="item in allLottery"
            :key="item.lottery_id"
            :label="item.cname"
            :value="item.lottery_id"
          >
          </el-option>
        </el-select>
        <div class="check_date clearfix fl">
          <div class="date_2 fl">
            <div class="block">
              <el-date-picker
                align="center"
                v-model="value1"
                type="date"
                placeholder="Chọn ngày"
                default-value
                format="yyyy年MM月dd日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
        </div>
        <div class="check_1 fl" @click="changeDate(value)">Kiểm tra</div>
      </div>
      <!-- 重庆时时彩  历史开奖 -->
      <div class="open-title">Kết quả mở thưởng</div>
      <div class="history_list" v-show="historyList.length">
        <table
          v-if="lottery_id == 1 || lottery_id == 10 || lottery_id == 28"
          class="table_3"
        >
          <tr>
            <th>Thời gian</th>
            <th>期次</th>
            <th>
              <ul class="clearfix">
                <li
                  class="fl"
                  v-for="(itemm, indexx) in sTitle"
                  :key="indexx"
                  @click="changeType(itemm.index)"
                  :class="itemm.index == sTitleIndex ? 'onLi' : 'onLi1'"
                >
                  {{ itemm.name }}
                </li>
              </ul>
            </th>
            <th>总和</th>
            <th>1 - 5 龙虎</th>
          </tr>
          <tr v-for="(v, index) in historyList" :key="index">
            <td class="inputTime">
              {{ v.input_time }}
            </td>
            <td>{{ v.issue }}</td>
            <td class="hiscode">
              <ul class="clearfix">
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  v-if="sTitleIndex == 1"
                >
                  {{ vv }}
                </li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDx(4) | filterBgColor"
                  v-if="sTitleIndex == 2"
                >
                  {{ vv | filterDx(4) }}
                </li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDs | filterBgColor"
                  v-if="sTitleIndex == 3"
                >
                  {{ vv | filterDs }}
                </li>
              </ul>
            </td>
            <td class="guan_he">
              <ul class="clearfix">
                <li>{{ v.code | filtersSum }}</li>

                <li :class="v.code | filtersSum | filterDx(22) | filterColor">
                  {{ v.code | filtersSum | filterDx(22) }}
                </li>

                <li :class="v.code | filtersSum | filterDs | filterColor">
                  {{ v.code | filtersSum | filterDs }}
                </li>
              </ul>
            </td>
            <td class="long_hu">
              <ul class="clearfix">
                <li
                  class="fl"
                  :class="v.code | filterLhh('一v五') | filterColor"
                >
                  {{ v.code | filterLhh("一v五") }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
        <!-- 福彩3D，排列三 -->
        <table
          v-if="lottery_id == 14 || lottery_id == 5"
          class="table_3 fcsd-history"
        >
          <tr>
            <th>Thời gian</th>
            <th>期次</th>
            <th>开奖号码</th>
            <th>佰拾个和数</th>
            <th>跨度</th>
            <th>佰大小</th>
            <th>佰单双</th>
            <th>佰质合</th>
            <th>拾大小</th>
            <th>拾单双</th>
            <th>拾质合</th>
            <th>个大小</th>
            <th>个单双</th>
            <th>个质合</th>
          </tr>
          <tr v-for="(v, index) in historyList" :key="index">
            <td class="inputTime">
              {{ v.input_time }}
            </td>
            <td>{{ v.issue }}</td>
            <td class="hiscode">
              <ul class="clearfix" style="width: 165px">
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  class="fc-bgColor"
                >
                  {{ vv }}
                </li>
              </ul>
            </td>
            <td>{{ v.code | filterBSGH }}</td>
            <td>{{ v.code | filterFC3DKD }}</td>
            <td :class="v.code.substring(0, 1) | filterDx(4) | filterColor">
              {{ v.code.substring(0, 1) | filterDx(4) }}
            </td>
            <td :class="v.code.substring(0, 1) | filterDs | filterColor">
              {{ v.code.substring(0, 1) | filterDs }}
            </td>
            <td :class="v.code.substring(0, 1) | filterZh | filterColor">
              {{ v.code.substring(0, 1) | filterZh }}
            </td>
            <td :class="v.code.substring(2, 3) | filterDx(4) | filterColor">
              {{ v.code.substring(2, 3) | filterDx(4) }}
            </td>
            <td :class="v.code.substring(2, 3) | filterDs | filterColor">
              {{ v.code.substring(2, 3) | filterDs }}
            </td>
            <td :class="v.code.substring(2, 3) | filterZh | filterColor">
              {{ v.code.substring(2, 3) | filterZh }}
            </td>
            <td :class="v.code.substring(4, 5) | filterDx(4) | filterColor">
              {{ v.code.substring(4, 5) | filterDx(4) }}
            </td>
            <td :class="v.code.substring(4, 5) | filterDs | filterColor">
              {{ v.code.substring(4, 5) | filterDs }}
            </td>
            <td :class="v.code.substring(4, 5) | filterZh | filterColor">
              {{ v.code.substring(4, 5) | filterZh }}
            </td>
          </tr>
        </table>
        <!-- 香港彩 -->
        <table v-if="lottery_id == 8" class="table_2">
          <tr>
            <th style="width: 110px">日期</th>
            <th>期次</th>
            <th class="clearfix">
              <div class="fl">正码</div>
              <div class="fr">特码</div>
            </th>
            <th>
              <div>总和</div>
              <div>
                <ul class="clearfix">
                  <li cclass="fl">总数</li>
                  <li cclass="fl">单双</li>
                  <li cclass="fl">大小</li>
                  <li cclass="fl">七色波</li>
                </ul>
              </div>
            </th>
            <th>
              <div>特码</div>
              <div>
                <ul class="clearfix">
                  <li>单双</li>
                  <li>大小</li>
                  <li>合单双</li>
                  <li>合大小</li>
                  <li>尾大小</li>
                </ul>
              </div>
            </th>
          </tr>
          <tr v-for="(v, index3) in historyList" :key="index3">
            <td>{{ v.input_time }}</td>
            <td>{{ v.issue }}</td>
            <td>
              <ul>
                <li v-for="(vv, index4) in v.code.split(',')" :key="index4">
                  <div class="clearfix">
                    <div class="six_code_c" :class="vv | filterSixBs">
                      {{ vv }}
                    </div>
                    <div style="font-size: 16px; color: #666">
                      {{ vv | filterSixSX(v.issue) }}
                    </div>
                  </div>
                </li>
              </ul>
            </td>
            <td>
              <ul class="clearfix">
                <li>{{ v.code | filtersSum }}</li>
                <li :class="v.code | filterDs | filterColor">
                  {{ v.code | filterDs }}
                </li>
                <li :class="v.code | filterDx(174) | filterColor">
                  {{ v.code | filterDx(174) }}
                </li>
                <li>
                  <span :class="v.code | filterSebo">
                    {{ v.code | filterSebo | filterColor2 }}</span
                  >
                </li>
              </ul>
            </td>
            <td>
              <ul class="clearfix">
                <li :class="v.code.split(',')[6] | filterSixDS | filterColor">
                  {{ v.code.split(",")[6] | filterSixDS }}
                </li>
                <li :class="v.code.split(',')[6] | filterSixHdxh | filterColor">
                  {{ v.code.split(",")[6] | filterSixHdxh }}
                </li>
                <li
                  :class="v.code.split(',')[6] | filterSixTmHds | filterColor"
                >
                  {{ v.code.split(",")[6] | filterSixTmHds }}
                </li>
                <li
                  :class="v.code.split(',')[6] | filterSixTmHdx | filterColor"
                >
                  {{ v.code.split(",")[6] | filterSixTmHdx }}
                </li>
                <li :class="v.code.split(',')[6] | filterWdx | filterColor">
                  {{ v.code.split(",")[6] | filterWdx }}
                </li>
              </ul>
            </td>
          </tr>
          <!-- <ul class="clearfix" style="margin-left: 75px;">
              <li
                v-for="(vv, index2) in v.code.split(',')"
                :key="index2"
                :class="vv | filterSixBs"
                v-if="sTitleIndex == 1"
              >
                {{ vv }}
              </li>
              <li
                v-for="(vv, index2) in v.code.split(',')"
                :key="index2"
                :class="vv | filterSixHdxh(7) | filterSixBs"
                v-if="sTitleIndex == 2"
              >
                {{ vv | filterSixHdxh(7) }}
              </li>
              <li
                v-for="(vv, index2) in v.code.split(',')"
                :key="index2"
                :class="vv | filterSixHdsh | filterSixBs"
                v-if="sTitleIndex == 3"
              >
                {{ vv | filterSixHdsh }}
              </li>
            </ul>-->
        </table>
        <!-- 其他 -->
        <table
          v-if="
            lottery_id == 7 ||
            lottery_id == 9 ||
            lottery_id == 11 ||
            lottery_id == 26 ||
            lottery_id == 27 ||
            lottery_id == 29 ||
            lottery_id == 32
          "
          class="table_1"
        >
          <tr>
            <th>Thời gian</th>
            <th>期次</th>
            <th>
              <ul class="clearfix">
                <li
                  class="fl"
                  v-for="(itemm, indexx) in sTitle"
                  :key="indexx"
                  @click="changeType(itemm.index)"
                  :class="itemm.index == sTitleIndex ? 'onLi' : 'onLi1'"
                >
                  {{ itemm.name }}
                </li>
              </ul>
            </th>
            <th>冠亚军和</th>
            <th>1 - 5 龙虎</th>
          </tr>
          <tr v-for="(v, index) in historyList" :key="index">
            <td class="inputTime">
              {{ v.input_time }}
            </td>
            <td>{{ v.issue }}</td>
            <td class="hiscode">
              <ul class="clearfix">
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterBallColor"
                  v-if="sTitleIndex == 1"
                >
                  {{ vv }}
                </li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDx(5) | filterBgColor"
                  v-if="sTitleIndex == 2"
                >
                  {{ vv | filterDx(5) }}
                </li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDs | filterBgColor"
                  v-if="sTitleIndex == 3"
                >
                  {{ vv | filterDs }}
                </li>
              </ul>
            </td>
            <td class="guan_he">
              <ul class="clearfix">
                <!-- 冠亚和 -->
                <li v-if="v.code.substring(1) != ','">
                  {{ v.code.substring(0, 4) | filterPk10Gyh }}
                </li>
                <li
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) != ','
                  "
                >
                  {{ v.code.substring(0, 4) | filterPk10Gyh }}
                </li>
                <li
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) == ','
                  "
                >
                  {{ v.code.substring(0, 3) | filterPk10Gyh }}
                </li>
                <!-- 大小 -->
                <li
                  :class="
                    v.code.substring(0, 4) | filterPK10ElseDX | filterColor
                  "
                  v-if="v.code.substring(1) != ','"
                >
                  {{ v.code.substring(0, 4) | filterPK10ElseDX }}
                </li>
                <li
                  :class="
                    v.code.substring(0, 4) | filterPK10ElseDX | filterColor
                  "
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) != ','
                  "
                >
                  {{ v.code.substring(0, 4) | filterPK10ElseDX }}
                </li>
                <li
                  :class="
                    v.code.substring(0, 3) | filterPK10ElseDX | filterColor
                  "
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) == ','
                  "
                >
                  {{ v.code.substring(0, 3) | filterPK10ElseDX }}
                </li>
                <!-- 单双 -->
                <li
                  :class="
                    v.code.substring(0, 4)
                      | filterPk10Gyh
                      | filterDs
                      | filterColor
                  "
                  v-if="v.code.substring(1) != ','"
                >
                  {{ v.code.substring(0, 4) | filterPk10Gyh | filterDs }}
                </li>
                <li
                  :class="
                    v.code.substring(0, 4)
                      | filterPk10Gyh
                      | filterDs
                      | filterColor
                  "
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) != ','
                  "
                >
                  {{ v.code.substring(0, 4) | filterPk10Gyh | filterDs }}
                </li>
                <li
                  :class="
                    v.code.substring(0, 3)
                      | filterPk10Gyh
                      | filterDs
                      | filterColor
                  "
                  v-else-if="
                    v.code.substring(1) == ',' && v.code.substring(3) == ','
                  "
                >
                  {{ v.code.substring(0, 3) | filterPk10Gyh | filterDs }}
                </li>
              </ul>
            </td>
            <td class="long_hu">
              <ul class="clearfix">
                <li :class="v.code | filterLhh('十v一') | filterColor">
                  {{ v.code | filterLhh("十v一") }}
                </li>
                <li :class="v.code | filterLhh('九v二') | filterColor">
                  {{ v.code | filterLhh("九v二") }}
                </li>
                <li :class="v.code | filterLhh('八v三') | filterColor">
                  {{ v.code | filterLhh("八v三") }}
                </li>
                <li :class="v.code | filterLhh('七v四') | filterColor">
                  {{ v.code | filterLhh("七v四") }}
                </li>
                <li :class="v.code | filterLhh('六v五') | filterColor">
                  {{ v.code | filterLhh("六v五") }}
                </li>
              </ul>
            </td>
          </tr>
        </table>
        <div class="his_zw">暂无更多</div>
      </div>
      <div v-if="!historyList.length">
        <div class="lading" v-if="isLoading == true">
          正在加载
          <i class="el-icon-loading"></i>
        </div>
        <div class="his_zw" v-if="isLoading == false">
          <table
            class="table_1"
            v-if="
              lottery_id == 7 ||
              lottery_id == 9 ||
              lottery_id == 11 ||
              lottery_id == 26 ||
              lottery_id == 27 ||
              lottery_id == 29 ||
              lottery_id == 32
            "
          >
            <tr>
              <th>Thời gian</th>
              <th>期次</th>
              <th>
                <ul class="clearfix">
                  <li
                    v-for="(itemm, indexx) in sTitle"
                    :key="indexx"
                    @click="changeType(itemm.index)"
                    :class="itemm.index == sTitleIndex ? 'onLi' : 'onLi1'"
                  >
                    {{ itemm.name }}
                  </li>
                </ul>
              </th>
              <th>冠亚军和</th>
              <th>1 - 5 龙虎</th>
            </tr>
          </table>

          <!-- 香港彩 -->
          <table v-if="lottery_id == 8" class="table_2">
            <tr>
              <th style="width: 110px">日期</th>
              <th>期次</th>
              <th class="clearfix">
                <div class="fl">正码</div>
                <div class="fr">特码</div>
              </th>
              <th>
                <div>总和</div>
                <div>
                  <ul class="clearfix">
                    <li>总数</li>
                    <li>单双</li>
                    <li>大小</li>
                    <li>七色波</li>
                  </ul>
                </div>
              </th>
              <th>
                <div>特码</div>
                <div>
                  <ul class="clearfix">
                    <li>单双</li>
                    <li>大小</li>
                    <li>合单双</li>
                    <li>和大小</li>
                    <li>尾大小</li>
                  </ul>
                </div>
              </th>
            </tr>
          </table>

          <!-- 重庆时时彩 -->
          <table
            v-if="lottery_id == 1 || lottery_id == 10 || lottery_id == 28"
            class="table_3"
          >
            <tr>
              <th>Thời gian</th>
              <th>期次</th>
              <th>
                <ul class="clearfix">
                  <li
                    v-for="(itemm, indexx) in sTitle"
                    :key="indexx"
                    @click="changeType(itemm.index)"
                    :class="itemm.index == sTitleIndex ? 'onLi' : 'onLi1'"
                  >
                    {{ itemm.name }}
                  </li>
                </ul>
              </th>
              <th>总和</th>
              <th>1 - 5 龙虎</th>
            </tr>
          </table>

          <div
            style="
              height: 234px;
              text-align: center;
              line-height: 234px;
              background: #fff;
            "
          >
            nodata
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "openResult",
  //   时间格式
  filters: {
    formatDate1(time) {
      let date = new Date(time * 1000);
      let y = date.getFullYear(); // 年
      let M = date.getMonth() + 1;
      M = M < 10 ? "0" + M : M; // 月
      let D = date.getDate();
      D = D < 10 ? "0" + D : D; // 日
      let hh = date.getHours();
      hh = hh < 10 ? "0" + hh : hh; // 时
      let mm = date.getMinutes();
      mm = mm < 10 ? "0" + mm : mm;
      return y + "-" + M + "-" + D;
    },
  },
  data() {
    return {
      historyList: [], //历史开奖
      page: 1, //默认一页
      limit: 16, //一页几条
      lottery_id: "", //彩种ID
      issue: "", //当前期数
      //分页
      // currentPage4: 1, //默认第一页
      total: 0, //合计
      // pageSize: 9, //每页多少条
      hisCode: "", //历史开奖号码
      lotteryName: "",
      date: "",
      value1: "",
      sTitle: [
        { index: 1, name: "显示号码" },
        { index: 2, name: "显示大小" },
        { index: 3, name: "显示单双" },
      ],
      sTitleIndex: 1,
      isLoading: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      vid: "50条",
      todayDate: "",
      dayIndex: 2,
      dayMode: this.getDay(0, "-"),
      value: "",
    };
  },
  props: {
    lotteryId: {
      type: Number,
      default: 8,
    },
    allLottery: {
      type: Array,
      default: [],
    },
    historyListAll: {
      type: Array,
      default: [],
    },
  },
  watch: {
    // lottery_id:function(i){
    //    this.selectShow=true;
    //   if([27,26,11,9,7].find(res=>i==res)){
    //     this.records=options5
    //   }else{
    //     if(i!=8){
    //       this.records=options6
    //     }
    //   }
    //   if(this.luzhuType=='longhu'){
    //     if(![27,26,11,9,7].find(res=>i==res)){
    //    this.selectShow=false;
    //    this.luzhuIndex=[0]
    //   }else{
    //     this.cities=options3
    //   }
    //   }
    //   if(this.luzhuType=='daxiao'||this.luzhuType=='danshuang'){
    //   if([27,26,11,9,7].find(res=>i==res)){
    //    this.cities=options
    //   }else{
    //     this.cities=options2
    //   }
    //   }
    //    if(this.luzhuType=='daxiao'||this.luzhuType=='danshuang'){
    //   if([27,26,11,9,7].find(res=>i==res)){
    //    this.cities=options
    //   }else{
    //     this.cities=options2
    //   }
    //   }
    //   if(this.luzhuType=='num'){
    //     if([27,26,11,9,7].find(res=>i==res)){
    //       this.luzhuType='qianhou';
    //       this.cities=options4
    //     }
    //   }
    //   if(this.luzhuType=='qianhou'){
    //     if(![27,26,11,9,7].find(res=>i==res)){
    //       this.luzhuType='num';
    //       this.cities=options7
    //     }
    //   }
    //    if(this.luzhuType=='gy'){
    //     if(![27,26,11,9,7].find(res=>i==res)){
    //       this.luzhuType='zonghe';
    //       this.selectShow=false;
    //     }
    //   }
    //    if(this.luzhuType=='zonghe'){
    //     if([27,26,11,9,7].find(res=>i==res)){
    //       this.luzhuType='gy';
    //       this.selectShow=false;
    //     }
    //   }
    //   if(this.luzhuType!='zonghe'&&this.luzhuType!='gy'){
    //   this.luzhuIndex=[0];
    //   this.checkedCities=[this.cities[0]]
    //   }
    //    if(i==8){
    //     this.records=options8;
    //     this.cities=options9
    //   }
    //   this.codeIndex=0;
    //   this.days=options10;
    //   this.typeId=1;
    //   this.$nextTick(()=>{
    //   let arr=Array.from(document.getElementsByClassName('table-scroll'))
    //   arr.forEach((item,index)=>{
    //     let scrollWidth = item.firstChild.offsetWidth-item.offsetWidth>1?item.firstChild.offsetWidth-item.offsetWidth:0;
    //       item.scrollTo(scrollWidth,0)
    //   })
    //   })
    // },
    dayMode: function (i) {
      this.date = i;
      this.gethistoryList();
    },
  },
  created() {
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    m = m >= 10 ? m : "0" + m;
    d = d >= 10 ? d : "0" + d;
    this.date = y + "-" + m + "-" + d;
    this.todayDate = y + "-" + m + "-" + d;
    this.value1 = y + "-" + m + "-" + d;
    this.lottery_id = this.lotteryId;
    // if(this.historyListAll.length != 0){
    //   this.historyList = this.historyListAll;
    // }else{
    //   this.gethistoryList();
    // }
    this.historyList = this.historyListAll;
    console.log(this.historyList);
  },
  mounted() {
    // this.getNewKLottery(); //最新一期
    // this.getExpertPlan(); //专家计划
    // this.getAllLottery(); //所有彩种
    // this.gethistoryList();
  },
  methods: {
    getDay(num, str) {
      let today = new Date();
      let nowTime = today.getTime();
      let ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      let oYear = today.getFullYear();
      let oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      let oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    //切换历史记录彩种
    changeSelect(id) {
      // this.gethistoryList(id);
      // this.lottery_id = id;
    },
    handleClick(id, name) {
      this.lottery_id = id;
      //console.log(id)
      this.lotteryName = name;
      // this.limit = val
      (this.djsTime = {
        h1: 0,
        h2: 0,
        min1: "-",
        min2: "-",
        s1: "-",
        s2: "-",
      }), //倒计时时间;
        this.getNewKLottery(id);
      this.gethistoryList(id);
      // this.selectChange(val)
      this.sTitleIndex = 1;
      this.vid = "50条";
    },

    selectChange(val) {
      //console.log(val)
      if (val == "") {
        val = this.total;
      }
      this.gethistoryList(null, val);
    },
    // 获取所有的彩种
    getAllLottery() {
      this.$http.post("/open/idx/sort/").then((res) => {
        if (res && res.data.code == 1) {
          this.allLottery = res.data.data || [];
          this.lottery_id = this.allLottery[0].lottery_id;
          // if(flag){
          this.getNewKLottery(this.lottery_id);
          this.gethistoryList(this.lottery_id);
        }
      });
    },
    changeDate(id) {
      if (!this.value1 || !this.value) return;
      this.date = this.value1;
      // this.date =this.value.substring(0,9)+(this.value.substring(9,10)-0+1)
      this.dayMode = this.value1;
      this.dayIndex = "-1";
      this.lottery_id = id;
      this.gethistoryList(this.lottery_id);
    },
    changeType(index) {
      // //console.log(index)
      this.sTitleIndex = index;

      // //console.log(this.sTitleIndex)
    },
    //历史开奖
    gethistoryList(id, val) {
      this.isLoading = true;
      this.historyList = [];
      this.$http
        .post("/open/idx/history", {
          lottery_id: id || this.lottery_id,
          belong_date: this.date,
          nums: val || this.limit,
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.historyList = res.data.data || [];
            // this.issueTime = this.historyList.input_time.substring(11, 19);
            // //console.log(this.issueTime);
            // this.sixCode = this.historyList.code
            // //console.log(this.sixCode);
            this.total = res.data.total;
            this.isLoading = true;
          }
          if (res && res.data.code == -1) {
            this.historyList = [];
            this.isLoading = false;
          }
        });
    },
  },
  // destroyed() {
  //   if (window.timer1) clearInterval(window.timer1);
  // }
};
</script>
<style scoped lang="less">
.history {
  .select-box {
    margin-bottom: 20px;
    .lottery-change {
      margin-right: 20px;
    }
    .check_1 {
      width: 69px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 14px;
      margin-left: 20px;
      background: #ff1c30;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .table_1 {
    width: 100%;
    background-color: #fff;
    border-left: 1px solid #eee;
    tr {
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #333;
    }
    th {
      width: 170px;
      font-size: 14px;
      color: #666;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #eeeeee;
      font-weight: normal;
      background: #f7fafe;
      &:nth-child(3) {
        width: 470px;
        ul {
          // width: 100%;
          li {
            width: 33.33%;
            // padding: 0 60px;
            text-align: center;
          }
        }
      }
      &:nth-child(4) {
        width: 152px;
      }
      &:nth-child(5) {
        width: 254px;
        // border-right: none;
      }
      &:nth-child(2) {
        width: 150px;
        font-size: 14px;
      }
      &:nth-child(1) {
        width: 180px;
      }
    }
    td {
      border-right: 1px solid #eeeeee;
    }
    .inputTime {
      font-size: 14px;
      color: #333;
    }
    .hiscode {
      ul {
        // margin-left: 15px;
        li {
          float: left;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          overflow: hidden;
          font-size: 18px;
          font-family: number1;
          margin: 0 4px;
        }
      }
    }
    .guan_he {
      ul {
        font-size: 16px;
        width: 100%;
        text-align: center;
        li {
          float: left;
          width: 33.33%;
          // text-align: center;
          border-right: 1px solid #eeeeee;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
    }
    .long_hu {
      ul {
        font-size: 16px;
        width: 100%;
        li {
          float: left;
          width: 20%;
          border-right: 1px solid #eeeeee;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
    }
  }
  .table_2 {
    width: 100%;
    background-color: #fff;
    text-align: center;
    // line-height: 36px;
    color: #666666;
    font-size: 14px;
    // border-left: 1px solid #eee;
    border: 1px solid #eee;
    tr {
      border-bottom: 1px solid #eeeeee;
      height: 36px;
      &:nth-last-child(1) {
        border-bottom: 0;
      }
      th {
        width: 158px;
        border-right: 1px solid #eeeeee;
        height: 30px;
        line-height: 30px;
        font-weight: normal;
        background: #f7fafe;
        &:nth-child(2) {
          width: 106px;
        }
        &:nth-child(3) {
          width: 330px;
          div {
            width: 240px;
            &:nth-last-child(1) {
              width: 50px;
              border-left: 1px solid #eee;
            }
          }
        }
        &:nth-child(4) {
          width: 203px;
          line-height: 25px;
          ul {
            width: 100%;
            li {
              float: left;
              width: 22%;
              border-top: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              &:nth-last-child(1) {
                border-right: 0;
                width: 34%;
              }
            }
          }
        }
        &:nth-last-child(1) {
          border-right: 0;
          // width: 255px;
          width: 310px;
          line-height: 25px;
          ul {
            width: 100%;
            li {
              float: left;
              line-height: 25px;
              width: 17%;
              border-top: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              &:nth-last-child(1) {
                border-right: 0;
                width: 22%;
              }
              &:nth-last-child(2) {
                width: 22%;
              }
              &:nth-last-child(3) {
                width: 22%;
              }
            }
          }
        }

        // width: ;
      }
      td {
        text-align: center;
        border-right: 1px solid #eeeeee;
        color: #333;
        font-size: 14px;
        &:nth-child(1) {
          line-height: 20px !important;
        }
        &:nth-child(3) {
          ul {
            line-height: 25px;
            width: 100%;
            li {
              // width: 14.28%;
              margin: 0 6px;
              float: left;
              .six_code_c {
                width: 24px;
                height: 24px;
                text-align: center;
                background: #ccc;
                border-radius: 50%;
                margin-top: 8px;
                line-height: 24px;
                color: #fff;
                margin-right: 4px;
                font-family: number1;
                font-size: 18px;
              }
              &:nth-last-child(1) {
                width: 50px;
                border-left: 1px solid #eee;
                float: right;
                margin: 0;
                // padding-left: 10px;
                > div {
                  > div {
                    &:nth-child(1) {
                      margin: 8px 0 0 13px;
                    }
                  }
                }
              }
            }
          }
        }
        &:nth-child(4) {
          ul {
            width: 100%;
            line-height: 58px;
            li {
              float: left;
              // width: 24.83%;
              width: 22%;
              font-size: 16px;
              border-right: 1px solid #eeeeee;
              // position: relative;
              // &:before{
              //   content: '';
              //   position: absolute;
              //   width: 1px;
              //   background: #eee;
              //   top: 0;
              //   right: 0;
              //   height: 100%;
              // }
              &:nth-last-child(1) {
                border-right: 0;
                width: 34%;
              }
            }
          }
        }
        &:nth-child(5) {
          ul {
            line-height: 58px;
            width: 100%;
            li {
              float: left;
              // width: 20%;
              width: 17%;
              border-right: 1px solid #eeeeee;
              font-size: 16px;
              &:nth-last-child(1) {
                border-right: 0;
                width: 22%;
              }
              &:nth-last-child(2) {
                width: 22%;
              }
              &:nth-last-child(3) {
                width: 22%;
              }
            }
          }
        }
        &:nth-child(2) {
          line-height: 25px;
        }
      }
    }
  }
  .table_3 {
    width: 100%;
    background-color: #fff;
    border-left: 1px solid #eee;
    tr {
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #333;
      &:nth-child(1) {
        height: 30px;
        line-height: 30px;
      }
    }
    th {
      width: 190px;
      font-size: 14px;
      color: #666;
      // height: 50px;
      // line-height: 50px;
      text-align: center;
      border-right: 1px solid #eeeeee;
      font-weight: normal;
      background: #f7fafe;
      &:nth-child(3) {
        width: 410px;
        ul {
          // width: 100%;
          li {
            width: 33.33%;
            // padding: 0 60px;
            text-align: center;
          }
        }
      }
      &:nth-child(4) {
        width: 242px;
      }
      &:nth-child(5) {
        width: 184px;
        // border-right: none;
      }
      &:nth-child(2) {
        width: 170px;
      }
    }
    td {
      border-right: 1px solid #eeeeee;
      font-size: 14px;
      &:nth-child(1) {
        line-height: 20px !important;
      }
    }
    .inputTime {
      font-size: 14px;
      color: #333;
    }
    .hiscode {
      ul {
        // margin-left: 15px;
        margin: 0 auto;
        width: 270px;
        li {
          float: left;
          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          overflow: hidden;
          font-size: 18px;
          font-family: number1;
          // margin: 0 10px;
          margin: 0 5%;
          background: #0084ff;
          // &:nth-child(10) {
          //   display: none;
          // }
          // &:nth-child(6) {
          //   display: none;
          // }
          // &:nth-child(7) {
          //   display: none;
          // }
          // &:nth-child(8) {
          //   display: none;
          // }
          // &:nth-child(9) {
          //   display: none;
          // }
        }
      }
    }
    .guan_he {
      ul {
        font-size: 16px;
        width: 100%;
        text-align: center;
        li {
          float: left;
          width: 33.33%;
          // text-align: center;
          border-right: 1px solid #eeeeee;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
    }
    .long_hu {
      ul {
        font-size: 16px;
        width: 100%;
        li {
          float: left;
          width: 100%;
          border-right: 1px solid #eeeeee;
          &:nth-last-child(1) {
            border-right: none;
          }
        }
      }
    }
  }
  .his_zw {
    text-align: center;
    padding: 20px 0;
  }
  .fcsd-history {
    th {
      &:nth-child(1) {
        width: 370px !important;
      }
      &:nth-child(3) {
        width: 175px !important;
      }
    }
    .hiscode {
      li {
        margin: 0 9% !important;
      }
    }
  }
  .open-title {
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: #333;
    background: #f7fafe;
    font-size: 16px;
    border: 1px solid #eeeeee;
    // font-weight: bold;
  }
  .onLi {
    color: #ff1c30;
    position: relative;
    cursor: pointer;
    &:before {
      content: "";
      position: absolute;
      // left: 76px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0px;
      width: 20px;
      height: 2px;
      background-color: #ff1c30;
    }
  }
  .onLi1 {
    cursor: pointer;
  }
  .lading {
    line-height: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    font-size: 20px;
    transform: translateX(-50%);
  }
}
</style>