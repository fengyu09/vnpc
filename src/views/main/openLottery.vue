<template>
  <div id="openLottery">
    <!-- <div class="dl" v-if="rightLink.fd_gif != '' && rightLink.fd_gif != null">
        <a :href="rightLink.fd_gif.url" target="_blank" >
          <img v-lazy="rightLink.fd_gif.image_url" alt="">
        </a> 
    </div> -->
    <!-- 轮播图 -->
    <div>
      <img
        src="../../assets/imgaes/newLogo/kjBanner1.jpg"
        style="margin-top: -10px"
      />
    </div>
    <!-- 专家红单 -->
    <div class="expert_red main content-containe page-component__scroll">
      <div class="red_tit">
        <div class="biaoti">
          开奖
          <router-link :to="'/gameRule/' + lottery_id">游戏规则</router-link>
        </div>
        <el-tabs
          v-model="activeName"
          @tab-click="
            handleClick(
              allLottery[activeName].lottery_id,
              allLottery[activeName].cname
            )
          "
          v-if="allLottery.length"
          class="red_tabs"
          type="card"
        >
          <el-tab-pane
            :label="vv.cname"
            :name="indexName"
            v-for="(vv, index5) in allLottery"
            :key="index5"
            :class="'is-active'"
          >
            <div class="red_new clearfix">
              <div class="red_new_one">
                <div class="new_left fl clearfix">
                  <div class="new_img fl">
                    <img v-lazy="vv.logo_url" alt />
                  </div>
                  <div
                    class="fl"
                    :class="
                      NewKLottery.lottery_id != 8 ? 'new_num' : 'new_num_six'
                    "
                  >
                    <div class="new_name">
                      <span
                        style="
                          color: #333;
                          font-size: 18px;
                          font-weight: 600;
                          margin-right: 10px;
                        "
                        >{{ allLottery[activeName].cname }}</span
                      >
                      <span style="color: #999999; font-size: 14px">
                        第
                        <span style="color: #de3c31">{{ issue }}</span>
                        期开奖号码
                      </span>
                    </div>
                    <div class="new_time" v-if="newCode.length">
                      <ul class="clearfix">
                        <li
                          style="background: #0084ff"
                          v-for="(nn, index7) in newCode"
                          :key="index7"
                          v-if="
                            NewKLottery.lottery_id == 1 ||
                            NewKLottery.lottery_id == 10 ||
                            NewKLottery.lottery_id == 28 ||
                            NewKLottery.lottery_id == 30 ||
                            NewKLottery.lottery_id == 31
                          "
                        >
                          {{ nn }}
                        </li>
                        <li
                          style="background: #0084ff"
                          v-for="(nn, index7) in newCode"
                          :key="index7"
                          v-if="
                            NewKLottery.lottery_id == 5 ||
                            NewKLottery.lottery_id == 14
                          "
                          class="fc-bgColor"
                        >
                          {{ nn }}
                        </li>
                        <li
                          class="SixSx"
                          v-for="(nn, index7) in newCode"
                          :key="index7"
                          v-if="NewKLottery.lottery_id == 8"
                        >
                          <div :class="nn | filterSixBs">{{ nn }}</div>
                          <div>{{ nn | filterSixSX(issue) }}</div>
                        </li>
                        <li
                          :class="nn | filterBallColor"
                          v-for="(nn, index7) in newCode"
                          :key="index7"
                          v-if="
                            NewKLottery.lottery_id == 7 ||
                            NewKLottery.lottery_id == 9 ||
                            NewKLottery.lottery_id == 11 ||
                            NewKLottery.lottery_id == 26 ||
                            NewKLottery.lottery_id == 27 ||
                            NewKLottery.lottery_id == 29 ||
                            NewKLottery.lottery_id == 32
                          "
                        >
                          {{ nn }}
                        </li>
                      </ul>
                    </div>
                    <div
                      style="color: #f94166; margin-top: 24px; font-size: 16px"
                      v-else
                    >
                      开奖中...
                    </div>
                  </div>
                </div>
                <div class="new_right fr">
                  <div class="next_k">
                    <span style="color: #999999; font-size: 14px">
                      距
                      <span style="color: #de3c31">{{ issueNext }}</span> 期开奖
                    </span>
                  </div>
                  <div class="next_ttime" v-if="newCode.length">
                    <span class="fen_1" v-if="djsTime.d1">{{
                      djsTime.d1
                    }}</span>
                    <span class="fen_1" v-if="djsTime.d2">{{
                      djsTime.d2
                    }}</span>
                    <span class="fen_2" v-if="djsTime.d1 || djsTime.d2"
                      >天</span
                    >
                    <!-- <span class="fen_1" v-if="djsTime.d">{{ djsTime.d }}</span>
                    <span class="fen_2" v-if="djsTime.d">天</span> -->
                    <span class="fen_1" v-if="djsTime.h1 || djsTime.h2">
                      {{ djsTime.h1 }}
                    </span>
                    <span class="fen_1" v-if="djsTime.h2 || djsTime.h1">
                      {{ djsTime.h2 }}
                    </span>
                    <span class="fen_2" v-if="djsTime.h1 || djsTime.h2"
                      >时</span
                    >
                    <span class="fen_1">{{ djsTime.min1 }}</span>
                    <span class="fen_1">{{ djsTime.min2 }}</span>
                    <span class="fen_2">分</span>
                    <span class="fen_1">{{ djsTime.s1 }}</span>
                    <span class="fen_1">{{ djsTime.s2 }}</span>
                    <span class="fen_2">秒</span>
                  </div>
                  <div class="next_ttime" v-if="!newCode.length">
                    <span class="fen_1">-</span>
                    <span class="fen_1">-</span>
                    <span class="fen_2">分</span>
                    <span class="fen_1">-</span>
                    <span class="fen_1">-</span>
                    <span class="fen_2">秒</span>
                  </div>
                </div>
              </div>

              <!--历史开奖 路珠 走势 点击切换************************************************************************** -->
              <div class="history-record">
                <div v-for="(r, index10) in records" :key="index10">
                  <div
                    class="fl record"
                    :class="codeIndex == index10 ? 'active' : ''"
                    @click="changeCode(index10, r.id, r.name)"
                  >
                    {{ r.name }}
                  </div>
                </div>
              </div>
            </div>

            <div class="history">
              <div class="biaoti_2 clearfix">
                <div class="his_tit fl">{{ lotteryName1 }}</div>
                <div
                  class="check_date fr clearfix"
                  v-if="
                    lottery_id != 8 &&
                    [22, 25, 26].findIndex((res) => res == typeId) == -1
                  "
                >
                  <!--<div class="fl selectBox">-->
                  <!--<span>共 {{total}} 条</span>-->
                  <!--<el-select v-model="vid"  @change="selectChange(vid)" >-->
                  <!--<el-option-->
                  <!--v-for="item in options"-->
                  <!--:key="item.vid"-->
                  <!--:label="item.text"-->
                  <!--:value="item.vid"-->
                  <!--&gt;-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <!--</div>-->
                  <div class="fl date_1">Chọn ngày</div>
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
                  <div class="check_1 fl" @click="changeDate()">Kiểm tra</div>
                </div>
                <!-- 今天昨天前天 -->
                <div class="days" v-if="lottery_id != 8 && typeId != 1">
                  <div class="fr" v-for="(r, index11) in days" :key="index11">
                    <div
                      class="fl day"
                      :class="dayIndex == index11 ? 'active' : ''"
                      @click="changeDay(index11, r.id)"
                    >
                      {{ r.name }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 重庆时时彩  历史开奖 -->
              <div
                class="history_list"
                v-if="typeId == 1"
                v-show="historyList.length"
              >
                <table
                  v-if="
                    NewKLottery.lottery_id == 1 ||
                    NewKLottery.lottery_id == 10 ||
                    NewKLottery.lottery_id == 28 ||
                    NewKLottery.lottery_id == 30 ||
                    NewKLottery.lottery_id == 31
                  "
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

                        <li
                          :class="
                            v.code | filtersSum | filterDx(22) | filterColor
                          "
                        >
                          {{ v.code | filtersSum | filterDx(22) }}
                        </li>

                        <li
                          :class="v.code | filtersSum | filterDs | filterColor"
                        >
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
                  v-if="
                    NewKLottery.lottery_id == 14 || NewKLottery.lottery_id == 5
                  "
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
                    <td
                      :class="
                        v.code.substring(0, 1) | filterDx(4) | filterColor
                      "
                    >
                      {{ v.code.substring(0, 1) | filterDx(4) }}
                    </td>
                    <td
                      :class="v.code.substring(0, 1) | filterDs | filterColor"
                    >
                      {{ v.code.substring(0, 1) | filterDs }}
                    </td>
                    <td
                      :class="v.code.substring(0, 1) | filterZh | filterColor"
                    >
                      {{ v.code.substring(0, 1) | filterZh }}
                    </td>
                    <td
                      :class="
                        v.code.substring(2, 3) | filterDx(4) | filterColor
                      "
                    >
                      {{ v.code.substring(2, 3) | filterDx(4) }}
                    </td>
                    <td
                      :class="v.code.substring(2, 3) | filterDs | filterColor"
                    >
                      {{ v.code.substring(2, 3) | filterDs }}
                    </td>
                    <td
                      :class="v.code.substring(2, 3) | filterZh | filterColor"
                    >
                      {{ v.code.substring(2, 3) | filterZh }}
                    </td>
                    <td
                      :class="
                        v.code.substring(4, 5) | filterDx(4) | filterColor
                      "
                    >
                      {{ v.code.substring(4, 5) | filterDx(4) }}
                    </td>
                    <td
                      :class="v.code.substring(4, 5) | filterDs | filterColor"
                    >
                      {{ v.code.substring(4, 5) | filterDs }}
                    </td>
                    <td
                      :class="v.code.substring(4, 5) | filterZh | filterColor"
                    >
                      {{ v.code.substring(4, 5) | filterZh }}
                    </td>
                  </tr>
                </table>

                <!-- 香港彩 -->
                <table v-if="NewKLottery.lottery_id == 8" class="table_2">
                  <tr>
                    <th>日期</th>
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
                        <li
                          v-for="(vv, index4) in v.code.split(',')"
                          :key="index4"
                        >
                          <div class="clearfix">
                            <div
                              class="fl six_code_c"
                              :class="vv | filterSixBs"
                            >
                              {{ vv }}
                            </div>
                            <div
                              class="fl"
                              style="font-size: 16px; color: #666"
                            >
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
                        <li
                          :class="
                            v.code.split(',')[6] | filterSixDS | filterColor
                          "
                        >
                          {{ v.code.split(",")[6] | filterSixDS }}
                        </li>
                        <li
                          :class="
                            v.code.split(',')[6] | filterSixHdxh | filterColor
                          "
                        >
                          {{ v.code.split(",")[6] | filterSixHdxh }}
                        </li>
                        <li
                          :class="
                            v.code.split(',')[6] | filterSixTmHds | filterColor
                          "
                        >
                          {{ v.code.split(",")[6] | filterSixTmHds }}
                        </li>
                        <li
                          :class="
                            v.code.split(',')[6] | filterSixTmHdx | filterColor
                          "
                        >
                          {{ v.code.split(",")[6] | filterSixTmHdx }}
                        </li>
                        <li
                          :class="
                            v.code.split(',')[6] | filterWdx | filterColor
                          "
                        >
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
                    NewKLottery.lottery_id == 7 ||
                    NewKLottery.lottery_id == 9 ||
                    NewKLottery.lottery_id == 11 ||
                    NewKLottery.lottery_id == 26 ||
                    NewKLottery.lottery_id == 27 ||
                    NewKLottery.lottery_id == 29 ||
                    NewKLottery.lottery_id == 32
                  "
                  class="table_1"
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
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) != ','
                          "
                        >
                          {{ v.code.substring(0, 4) | filterPk10Gyh }}
                        </li>
                        <li
                          v-else-if="
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) == ','
                          "
                        >
                          {{ v.code.substring(0, 3) | filterPk10Gyh }}
                        </li>
                        <!-- 大小 -->
                        <li
                          :class="
                            v.code.substring(0, 4)
                              | filterPK10ElseDX
                              | filterColor
                          "
                          v-if="v.code.substring(1) != ','"
                        >
                          {{ v.code.substring(0, 4) | filterPK10ElseDX }}
                        </li>
                        <li
                          :class="
                            v.code.substring(0, 4)
                              | filterPK10ElseDX
                              | filterColor
                          "
                          v-else-if="
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) != ','
                          "
                        >
                          {{ v.code.substring(0, 4) | filterPK10ElseDX }}
                        </li>
                        <li
                          :class="
                            v.code.substring(0, 3)
                              | filterPK10ElseDX
                              | filterColor
                          "
                          v-else-if="
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) == ','
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
                          {{
                            v.code.substring(0, 4) | filterPk10Gyh | filterDs
                          }}
                        </li>
                        <li
                          :class="
                            v.code.substring(0, 4)
                              | filterPk10Gyh
                              | filterDs
                              | filterColor
                          "
                          v-else-if="
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) != ','
                          "
                        >
                          {{
                            v.code.substring(0, 4) | filterPk10Gyh | filterDs
                          }}
                        </li>
                        <li
                          :class="
                            v.code.substring(0, 3)
                              | filterPk10Gyh
                              | filterDs
                              | filterColor
                          "
                          v-else-if="
                            v.code.substring(1) == ',' &&
                            v.code.substring(3) == ','
                          "
                        >
                          {{
                            v.code.substring(0, 3) | filterPk10Gyh | filterDs
                          }}
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

              <!-- 单双大小路珠  v-if="typeId==2"  *********************************** *************************************-->
              <div
                class="danshuang"
                v-if="typeId > 1 && typeId < 22 && typeId != 16"
              >
                <div class="dans" v-show="luzhuType != 'gy' && selectShow">
                  <div class="ranking">
                    <span class="fl" style="margin-right: 10px"
                      >筛选名次：</span
                    >
                    <el-checkbox-group
                      class="fl"
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange"
                    >
                      <el-checkbox
                        style="margin-left: -10px"
                        v-for="city in cities"
                        :label="city"
                        :key="city"
                        >{{ city }}</el-checkbox
                      >
                    </el-checkbox-group>
                    <div
                      class="fr qx-hover"
                      style="cursor: pointer; margin-left: 30px"
                      @click="deleteAll"
                    >
                      清空
                    </div>
                    <div
                      class="fr qx-hover all"
                      style="cursor: pointer"
                      @click="handleCheckAllChange"
                    >
                      全选
                    </div>
                  </div>
                </div>
                <div class="choose" v-show="typeId == 2">
                  <div class="fl" style="margin-top: 5px">选择路珠：</div>
                  <div class="fl" v-for="(r, index12) in dans" :key="index12">
                    <div
                      class="fl daxiao"
                      :class="danIndex == index12 ? 'active' : ''"
                      @click="changeDanshuang(index12, r.id)"
                    >
                      {{ r.name }}
                    </div>
                  </div>
                </div>
                <div class="lading" v-if="lzLoading">
                  正在加载
                  <i class="el-icon-loading"></i>
                </div>
                <luzhu
                  v-if="typeId != 16"
                  :lotteryId="vv.lottery_id"
                  :luzhuType="luzhuType"
                  :luzhuIndex="luzhuIndex"
                  :dayMode="dayMode"
                  :cities="cities"
                  :isload.sync="lzLoading"
                ></luzhu>
                <!-- <div class="chuxian">
                  <div class="times">
                      <div class="fl">连续出现</div>
                      <div class="fl"><input type="text"></div>
                      <div class="fl">次以上</div>
                      <div class="fl">
                        <el-select v-model="value" placeholder="大">
                          <el-option
                            v-for="item in chooses"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="fl" @click='toSure' :class="sure==true?'active':''">确定</div>
                      <div class="fl">出现的次数为：</div>
                      <div class="fl">0</div>
                      <div class="fr">大小</div>
                      <div class="fr">冠军</div>
                      <div class="fr">小(14)</div>
                      <div class="fr">大(11)</div>
                      <div class="fr">计：</div>  
                  </div>
                  <div class="table">
                     <div class="table1">
                       <div v-for="(d, i) in daxiaoLuzhu" :key="i">
                            <div class="fl">{{daxiaoLuzhu[i].substring(daxiaoLuzhu[i].length-1)}}</div>
                       </div>
                     </div>
                  </div>
                </div> -->
              </div>
              <div
                style="background: #fff; padding: 16px; margin-top: 20px"
                v-if="typeId == 16"
              >
                <div class="mabiao-box">
                  <div
                    :class="{ active: mabiaoIndex == 0 }"
                    @click="mabiaoIndex = 0"
                  >
                    A面
                  </div>
                  <div
                    :class="{ active: mabiaoIndex == 1 }"
                    @click="mabiaoIndex = 1"
                  >
                    B面
                  </div>
                </div>
                <div>
                  <img
                    src="../../assets/imgaes/mabiaoA.png"
                    alt=""
                    srcset=""
                    v-show="mabiaoIndex == 0"
                  />
                  <img
                    src="../../assets/imgaes/mabiaoB.png"
                    alt=""
                    srcset=""
                    v-show="mabiaoIndex == 1"
                  />
                </div>
              </div>
              <div
                class="zoushi"
                v-if="typeId > 21"
                style="background: #fff; padding: 16px; margin-top: 20px"
              >
                <movements
                  v-if="typeId == 22"
                  :dayMode="dayMode"
                  :zsPage="zsPage"
                  :lotteryId="vv.lottery_id"
                  :lottery_id="lottery_id"
                ></movements>
                <gy-movement
                  v-if="typeId == 23"
                  :dayMode="dayMode"
                  :zsPage="zsPage"
                  :lotteryId="vv.lottery_id"
                  :lottery_id="lottery_id"
                ></gy-movement>
                <ssc-movement
                  v-if="typeId > 24"
                  :dayMode="dayMode"
                  :zsPage="zsPage"
                  :lotteryId="vv.lottery_id"
                  :typeId="typeId"
                  :lottery_id="lottery_id"
                ></ssc-movement>
              </div>

              <div v-if="!historyList.length">
                <div
                  class="lading"
                  v-if="isLoading == true"
                  v-show="typeId == 1"
                >
                  正在加载
                  <i class="el-icon-loading"></i>
                </div>
                <div
                  class="his_zw"
                  v-if="isLoading == false"
                  v-show="typeId == 1"
                >
                  <table
                    class="table_1"
                    v-if="
                      NewKLottery.lottery_id == 7 ||
                      NewKLottery.lottery_id == 9 ||
                      NewKLottery.lottery_id == 11 ||
                      NewKLottery.lottery_id == 26 ||
                      NewKLottery.lottery_id == 27 ||
                      NewKLottery.lottery_id == 29 ||
                      NewKLottery.lottery_id == 32
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
                            :class="
                              itemm.index == sTitleIndex ? 'onLi' : 'onLi1'
                            "
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
                  <table v-if="NewKLottery.lottery_id == 8" class="table_2">
                    <tr>
                      <th>日期</th>
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
                    v-if="
                      NewKLottery.lottery_id == 1 ||
                      NewKLottery.lottery_id == 10 ||
                      NewKLottery.lottery_id == 28 ||
                      NewKLottery.lottery_id == 30 ||
                      NewKLottery.lottery_id == 31
                    "
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
                            :class="
                              itemm.index == sTitleIndex ? 'onLi' : 'onLi1'
                            "
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
          </el-tab-pane>
        </el-tabs>
        <!-- 未加载 -->
        <div v-else class="red_tabs_weiwei">
          <div class="red_tabs_wei"></div>
          <div class="biaoti_2 clearfix">
            <div class="his_tit fl">历史开奖</div>
            <div class="check_date fr clearfix">
              <div class="fl date_1">Chọn ngày</div>
              <div class="date_2 fl">
                <div class="block">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="Chọn ngày"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="check_1 fl" @click="changeDate()">Kiểm tra</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-backtop target="  .page-component__scroll" :bottom="100"
        >回到顶部</el-backtop
      > -->
      <template>
        <el-backtop target=".red_tit">
          <div
            style="
               {
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }
            "
          >
            UP
          </div>
        </el-backtop>
      </template>
    </div>

    <!-- <scroll-top></scroll-top> -->
    <div class="left-nav"></div>
  </div>
</template>

<script>
import ScrollTop from "../../components/ScrollTop.vue";
import luzhu from "../../components/luzhu.vue";
import movements from "../../components/movement.vue";
import gyMovement from "../../components/gyMovement.vue";
import sscMovement from "../../components/sscMovement.vue";
import { mapState, mapMutations } from "vuex";
const options = [
  "冠军",
  "亚军",
  "第三名",
  "第四名",
  "第五名",
  "第六名",
  "第七名",
  "第八名",
  "第九名",
  "第十名",
];
const options2 = ["第一球", "第二球", "第三球", "第四球", "第五球"];
const options3 = ["冠军", "亚军", "第三名", "第四名", "第五名"];
const options4 = [
  "号码1",
  "号码2",
  "号码3",
  "号码4",
  "号码5",
  "号码6",
  "号码7",
  "号码8",
  "号码9",
  "号码10",
];
const options7 = [
  "号码0",
  "号码1",
  "号码2",
  "号码3",
  "号码4",
  "号码5",
  "号码6",
  "号码7",
  "号码8",
  "号码9",
];
const options5 = [
  { id: 1, name: "历史记录" },
  { id: 2, name: "单双大小路珠" },
  { id: 3, name: "龙虎路珠" },
  { id: 4, name: "前后路珠" },
  { id: 5, name: "冠亚和路珠" },
  { id: 22, name: "号码走势" },
  { id: 23, name: "冠亚和走势" },
];
const options6 = [
  { id: 1, name: "历史记录" },
  { id: 2, name: "单双大小路珠" },
  { id: 3, name: "龙虎路珠" },
  { id: 11, name: "号码路珠" },
  { id: 12, name: "总和路珠" },
  { id: 22, name: "号码走势" },
  { id: 25, name: "形态走势" },
  { id: 26, name: "龙虎走势" },
];
const options8 = [
  { id: 1, name: "历史记录" },
  { id: 16, name: "码表图" },
  { id: 2, name: "单双大小路珠" },
  { id: 18, name: "波色路珠" },
  { id: 19, name: "总和路珠" },
  { id: 20, name: "尾数大小路珠" },
  { id: 21, name: "合数单双路珠" },
];
const options9 = [
  "正码一",
  "正码二",
  "正码三",
  "正码四",
  "正码五",
  "正码六",
  "特码",
];
const options10 = [
  { id: 2, name: "前天" },
  { id: 1, name: "昨天" },
  { id: 0, name: "今天" },
];
const options11 = [
  { id: 90, name: "近90期" },
  { id: 60, name: "近60期" },
  { id: 30, name: "近30期" },
  { id: 2, name: "前天" },
  { id: 1, name: "昨天" },
  { id: 0, name: "今天" },
];
export default {
  name: "openLottery",
  components: {
    "scroll-top": ScrollTop,
    luzhu: luzhu,
    movements: movements,
    "gy-movement": gyMovement,
    "ssc-movement": sscMovement,
  },
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
      // hvWidth: 200,
      // expertPlan: [], //专家计划
      allLottery: [], //所有彩种
      NewKLottery: [], //最新一期开奖
      historyList: [], //历史开奖
      activeName: 0, //tab
      indexName: "", //tab
      hotLimit: 8, //热门直播
      hotPage: 1,
      //专家方案--参数
      page: 1, //默认一页
      limit: 1440, //一页几条
      lottery_id: "", //彩种ID
      issue: "", //当前期数
      issueNext: "", //下一期数
      //分页
      // currentPage4: 1, //默认第一页
      total: 0, //合计
      // pageSize: 9, //每页多少条
      newCode: "", //最新一期开奖号码
      hisCode: "", //历史开奖号码
      lotteryName: "",
      date: "",
      djsTime: {
        d1: 0,
        d2: 0,
        h1: 0,
        h2: 0,
        min1: "-",
        min2: "-",
        s1: "-",
        s2: "-",
      }, //倒计时时间
      value1: "",
      // isteachOpen: true,
      sTitle: [
        { index: 1, name: "显示号码" },
        { index: 2, name: "显示大小" },
        { index: 3, name: "显示单双" },
      ],
      sTitleIndex: 1,
      // issueTime: "",
      isLoading: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      options: [
        {
          text: "50条",
          vid: "50",
        },
        {
          text: "100条",
          vid: "100",
        },
        {
          text: "150条",
          vid: "150",
        },
        {
          text: "200条",
          vid: "200",
        },
        {
          text: "300条",
          vid: "300",
        },
        {
          text: "Toàn bộ ",
          vid: "",
        },
      ],
      vid: "50条",
      todayDate: "",
      records: options6,
      typeId: 1, //历史记录  路珠  走势的id切换
      lotteryName1: "历史记录",
      days: [
        { id: 2, name: "前天" },
        { id: 1, name: "昨天" },
        { id: 0, name: "今天" },
      ],
      codeIndex: 0,
      dayIndex: 2,
      checkAll: false,
      checkedCities: [],
      cities: options2,
      isIndeterminate: false,
      delete: "",
      dans: [
        { id: 11, name: "大小路珠" },
        { id: 12, name: "单双路珠" },
      ],
      danIndex: 0,
      sure: false,
      luzhu: [],
      daxiaoLuzhu: [],
      luzhuType: "daxiao",
      luzhuIndex: [],
      dayMode: this.getDay(0, "-"),
      selectShow: true,
      zsPage: 30,
      mabiaoIndex: 0,
      lzLoading: true,
    };
  },
  watch: {
    lottery_id: function (i) {
      this.selectShow = true;
      if ([27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
        this.records = options5;
      } else {
        if (i != 8) {
          this.records = options6;
        }
      }
      if (this.luzhuType == "longhu") {
        if (![27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.selectShow = false;
          this.luzhuIndex = [0];
        } else {
          this.cities = options3;
        }
      }
      if (this.luzhuType == "daxiao" || this.luzhuType == "danshuang") {
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.cities = options;
        } else {
          this.cities = options2;
        }
      }
      if (this.luzhuType == "daxiao" || this.luzhuType == "danshuang") {
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.cities = options;
        } else {
          this.cities = options2;
        }
      }
      if (this.luzhuType == "num") {
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.luzhuType = "qianhou";
          this.cities = options4;
        }
      }
      if (this.luzhuType == "qianhou") {
        if (![27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.luzhuType = "num";
          this.cities = options7;
        }
      }
      if (this.luzhuType == "gy") {
        if (![27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.luzhuType = "zonghe";
          this.selectShow = false;
        }
      }
      if (this.luzhuType == "zonghe") {
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => i == res)) {
          this.luzhuType = "gy";
          this.selectShow = false;
        }
      }
      if (this.luzhuType != "zonghe" && this.luzhuType != "gy") {
        this.luzhuIndex = [0];
        this.checkedCities = [this.cities[0]];
      }
      if (i == 8) {
        this.records = options8;
        this.cities = options9;
      }
      this.codeIndex = 0;
      this.days = options10;
      this.typeId = 1;
      this.$nextTick(() => {
        let arr = Array.from(document.getElementsByClassName("table-scroll"));
        arr.forEach((item, index) => {
          let scrollWidth =
            item.firstChild.offsetWidth - item.offsetWidth > 1
              ? item.firstChild.offsetWidth - item.offsetWidth
              : 0;
          item.scrollTo(scrollWidth, 0);
        });
      });
    },
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
  },
  mounted() {
    this.getNewKLottery(); //最新一期
    // this.getExpertPlan(); //专家计划
    this.getAllLottery(); //所有彩种
    this.gethistoryList();
  },
  computed: {
    ...mapState(["rightLink"]),
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
    changeCode(index10, id, name) {
      //点击切换历史记录   路珠   走势
      this.selectShow = true;
      if (id == 3) {
        this.luzhuType = "longhu";
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => this.lottery_id == res)) {
          this.cities = options3;
        } else {
          this.luzhuIndex = [0];
          this.selectShow = false;
        }
      } else if (id == 4) {
        this.luzhuType = "qianhou";
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => this.lottery_id == res)) {
          this.cities = options4;
        }
      } else if (id == 2) {
        this.danIndex = 0;
        this.luzhuType = "daxiao";
        if ([27, 26, 11, 9, 7, 29, 32].find((res) => this.lottery_id == res)) {
          this.cities = options;
        } else {
          this.cities = options2;
        }
        if (this.lottery_id == 8) {
          this.cities = options9;
        }
      } else if (id == 5) {
        this.luzhuIndex = [0, 1];
        this.luzhuType = "gy";
      } else if (id == 11) {
        this.luzhuType = "num";
        this.cities = options7;
      } else if (id == 12) {
        this.luzhuType = "zonghe";
        this.selectShow = false;
        this.luzhuIndex = [0, 1];
      } else if (id == 18) {
        this.records = options8;
        this.luzhuType = "bose";
      } else if (id == 19) {
        this.luzhuType = "zonghe";
        this.selectShow = false;
        this.luzhuIndex = [0, 1];
      } else if (id == 20) {
        this.luzhuType = "weishu";
      } else if (id == 21) {
        this.luzhuType = "heshu";
      }
      if (this.luzhuType != "zonghe" && this.luzhuType != "gy") {
        this.luzhuIndex = [0];
        this.checkedCities = [this.cities[0]];
      }
      if (id > 21) {
        this.days = options11;
      } else {
        this.days = options10;
        this.dayIndex = 2;
      }
      this.codeIndex = index10;
      this.typeId = id;
      this.lotteryName1 = name;
    },
    changeDay(index11, id) {
      //点击切换昨天今天前天
      this.dayIndex = index11;
      if (id > 2) {
        this.zsPage = id;
      } else {
        this.dayMode = this.getDay(-id, "-");
      }
    },
    handleCheckAllChange(val) {
      // 点击切换  冠军  亚军

      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
      this.luzhuIndex = this.checkedCities.map((i) => {
        if (this.cities.findIndex((res) => res == i) != -1) {
          return this.cities.findIndex((res) => res == i);
        }
      });
    },
    handleCheckedCitiesChange(value) {
      // 点击全选
      this.luzhuIndex = this.checkedCities.map((i) => {
        if (this.cities.findIndex((res) => res == i) != -1) {
          return this.cities.findIndex((res) => res == i);
        }
      });
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      let all = document.querySelector(".all");
      if (value.length > 0) {
        all.style.color = "#ff1c30";
      } else {
        all.style.color = "#000";
      }
    },
    deleteAll() {
      // 点击  清空
      this.checkedCities = [];
      this.luzhuIndex = [];
      let all = document.querySelector(".all");
      all.style.color = "#000";
    },
    changeDanshuang(index12, id) {
      //点击切换  大小  单双
      this.danIndex = index12;
      if (id == 11) {
        this.luzhuType = "daxiao";
      } else {
        this.luzhuType = "danshuang";
      }
    },
    toSure() {
      //点击确定
      this.sure = !this.sure;
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
          // this.getExpertPlan(this.lottery_id);
          // }
          // //console.log(this.lottery_id)
        }
      });
    },
    //当前页
    // handleCurrentChange(currentPage) {
    //   this.currentPage1 = currentPage;
    // },
    // handleSizeChange(val) {
    //     //console.log(`每页 ${val} 条`);
    //     this.gethistoryList(val)
    //   },
    //   handleCurrentChange(val) {
    //     //console.log(`当前页: ${val}`);
    //   },
    changeDate() {
      if (!this.value1) return;
      this.date = this.value1;
      // this.date =this.value.substring(0,9)+(this.value.substring(9,10)-0+1)
      this.dayMode = this.value1;
      this.dayIndex = "-1";
      this.gethistoryList();
    },
    changeType(index) {
      // //console.log(index)
      this.sTitleIndex = index;

      // //console.log(this.sTitleIndex)
    },

    //最新开奖
    getNewKLottery(id, flag) {
      this.newCode = [];
      //      this.historyList = [];
      this.$http
        .post("/open/idx/indexNewOne/", { lottery_id: id || this.lottery_id })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.NewKLottery = res.data.data || [];
            this.issue = res.data.data.issue;
            this.timer(res.data.data.next_lottery_time);
            // //console.log(this.issue)
            // //console.log(this.NewKLottery)
            if (res.data.data.next_lottery_time <= 0) {
              this.newCode = [];
            } else {
              this.newCode = res.data.data.code.split(",");
              if (this.todayDate == this.date) {
                // if (flag && this.historyList[0].issue != res.data.data.issue) {
                if (flag && res.data.data.next_issue != res.data.data.issue) {
                  this.gethistoryList(null, null, true);
                  //  this.historyList.unshift({
                  //   code: res.data.data.code,
                  //   input_time: res.data.data.open_time,
                  //   issue: res.data.data.issue
                  // });
                }
              }

              this.issue = res.data.data.issue;
            }
            this.issueNext = this.issue - 0 + 1;
          }
        });
    },
    //倒计时
    timer(t) {
      if (window.timer1) clearInterval(window.timer1);
      window.timer1 = setInterval(() => {
        this.djsTime = this.count(t--);
        if (t <= -1) {
          //          //console.log(23)
          this.getNewKLottery(null, true);
          // this.getExpertPlan(null, true);
          this.djsTime = "--:--";
        }
        //        //console.log(t)
      }, 1000);

      if (t <= 0) {
        this.NewKLottery.issue = this.issue - 0 + 1;
        this.issue = this.issue - 0 + 1;
      }
    },
    count(time) {
      let t = "";
      let h = "";
      let d = "";
      let min = "-";
      let second = "-";
      let obj = {};
      if (time > 60) {
        second = parseInt(time) % 60;
        min = parseInt((time / 60) % 60);
        h = parseInt((parseInt(time / 60) / 60) % 24);
        d = parseInt(parseInt(time / 60) / 60 / 24);
        second = second >= 10 ? second : "0" + second;
        min = min >= 10 ? min : "0" + min;
        if (!h) h = "";
        else h = h >= 10 ? h : "0" + h + ":";
        if (d >= 1) {
          if (!h) h = "00";
          t = d + "天" + h + min + ":" + second;
          obj = {
            // d: d,
            d1: (d + "").split("")[0],
            d2: (d + "").split("")[1],
            h1: (h + "").split("")[0],
            h2: (h + "").split("")[1],
            min1: (min + "").split("")[0],
            min2: (min + "").split("")[1],
            s1: (second + "").split("")[0],
            s2: (second + "").split("")[1],
          };
        } else {
          t = h + min + ":" + second;
          obj = {
            h1: (h + "").split("")[0],
            h2: (h + "").split("")[1],
            min1: (min + "").split("")[0],
            min2: (min + "").split("")[1],
            s1: (second + "").split("")[0],
            s2: (second + "").split("")[1],
          };
        }
      } else {
        t = "00:" + (time >= 10 ? time : "0" + time);
        t = time >= 10 ? time : "0" + time;
        obj = {
          min1: 0,
          min2: 0,
          s1: (t + "").split("")[0],
          s2: (t + "").split("")[1],
        };
      }
      return obj;
      //      return t;
    },
    //历史开奖
    gethistoryList(id, val, flag) {
      this.isLoading = true;
      if (!flag) this.historyList = [];
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
    //专家计划
    // getExpertPlan(id) {
    //   this.$http
    //     .get("/forum/plan/index", {
    //       params: {
    //         lottery_id: id || this.lottery_id,
    //         limit: this.limit,
    //         issue: this.issue,
    //         page: this.page
    //       }
    //     })
    //     .then(res => {
    //       if (res && res.data.code == 1) {
    //         this.expertPlan = res.data.data || [];
    //         this.total = this.expertPlan.length;
    //         // this.newBall = res.data.data.code.split(',');
    //         // //console.log(this.total);
    //         // this.currentPage1 = 1 ;
    //       }
    //     });
    // }
  },
  destroyed() {
    if (window.timer1) clearInterval(window.timer1);
  },
};
</script>


<style lang="less">
#openLottery {
  // height: 100vh;
  // overflow-x: hidden;
  background-color: #f4f5f8;
  img {
    width: 100%;
  }
  .dl {
    position: fixed;
    left: 10px;
    top: 115px;
    border-radius: 4px;
    z-index: 1000;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      width: 70px;
      height: auto;
    }
  }
  .page-component__scroll {
    // height: calc(100% - 80px);
    // height: 100vh;
    //  overflow-y:scroll;
    // margin-top: 80px;
    // height: 100%;
    // overflow-x: hidden;
  }
  .selectValue {
    padding: 0 10px;
    line-height: 30px;
    height: 30px;
    border-color: #ccc;
    margin-right: 10px;
    border-radius: 5px;
    color: #606266;
    font-size: 14px;
  }
  .selectBox {
    margin-right: 10px;
    span {
      font-size: 14px;
      line-height: 30px;
      height: 30px;
      margin-right: 10px;
      display: inline-block;
    }
  }
  .expert_red {
    // margin-bottom: 60px;
    // height: 400px;
    padding-top: 30px;
    box-sizing: border-box;
    .red_tit {
      // position: relative;
      padding-bottom: 60px;
      .biaoti {
        color: #333333;
        font-size: 18px;
        font-weight: bold;
        margin: 16px 0 22px 40px;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          width: 35px;
          height: 27px;
          background: url("../../assets/imgaes/allIcon.png") no-repeat center;
          background-position: -90px -511px;
          background-size: 700px 700px;
          left: -41px;
          top: -5px;
        }
        a {
          float: right;
          color: #333333;
          font-size: 14px;
          font-weight: normal;
          position: relative;

          &:before {
            content: "";
            position: absolute;
            width: 17px;
            height: 20px;
            background: url("../../assets/imgaes/game.png") no-repeat center;
            background-size: contain;
            left: -27px;
            top: 0;
          }
        }
      }
      .red_tabs {
        .history-record {
          //********历史记录********************************************
          width: 100%;
          height: 74px;
          display: flex;
          align-items: center;
          border-top: 1px solid #f4f5f8;
          border-radius: 0 0 5px 5px;
          background: #fff;
          .record {
            margin: 0 25px;
            font-size: 14px;
            color: #333;
            cursor: pointer;
            &.active {
              color: #fff;
              background: #ff1c30;
              padding: 8px 10px;
              border-radius: 30px;
            }
          }
        }
        .red_new {
          padding-top: 27px;
          background-color: #fff;
          // margin-bottom: 20px;
          // border-radius: 0 0 5px 5px;
          height: 178px;
          .red_new_one {
            height: 113px;
            // margin-bottom: 26px;
            margin-bottom: 36px;
          }
          .new_left {
            .new_img {
              width: 102px;
              height: 93px;
              margin-left: 54px;
              margin-top: 10px;
              margin-right: 30px;
              img {
                width: 100%;
              }
            }
            .new_num {
              padding-left: 30px;
              padding-top: 19px;
              padding-bottom: 24px;
              border-left: 1px solid #eeeeee;
              margin-bottom: 16px;
            }
            .new_num_six {
              padding-left: 30px;
              padding-top: 19px;
              // padding-bottom: 16px;
              border-left: 1px solid #eeeeee;
              margin-bottom: 16px;
            }
            .new_time {
              margin-top: 24px;
              ul {
                li {
                  float: left;
                  width: 36px;
                  height: 36px;
                  font-size: 20px;
                  font-weight: bold;
                  // background: #f2f2f2;
                  color: #fff;
                  text-align: center;
                  margin-right: 14px;
                  border-radius: 50%;
                  line-height: 36px;
                  background: #0084ff;
                  font-family: number1;
                }
              }
              .SixSx {
                width: 36px;
                height: 72px;
                background: none;
                div {
                  border-radius: 50%;
                  color: #fff;

                  &:nth-child(2) {
                    color: #333;
                    font-weight: normal;
                    font-size: 14px;
                  }
                }
                &:nth-last-child(1) {
                  position: relative;
                  margin-left: 30px;
                  &:before {
                    content: "";
                    position: absolute;
                    top: 10px;
                    left: -30px;
                    background: url("../../assets/imgaes/main/six+.png")
                      no-repeat;
                    background-size: contain;
                    width: 15px;
                    height: 15px;
                  }
                }
              }
            }
          }
          .new_right {
            padding-top: 22px;
            margin-right: 40px;
            padding-left: 50px;
            padding-bottom: 17px;
            border-left: 1px solid #eeeeee;
            .new_fen {
              display: inline-block;
              color: #fff;
              background: #ff5d61;
              width: 30px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              margin-right: 5px;
              margin-left: 5px;
              border-radius: 5px;
            }
            .new_fen1 {
              display: inline-block;
              color: #fff;
              background: #ff5d61;
              // width: 30px;
              // height: 30px;
              font-size: 18px;
              padding: 3px 10px;
              text-align: center;
              line-height: 30px;
              margin-right: 5px;
              margin-left: 5px;
              border-radius: 5px;
            }
            .next_k {
              margin-bottom: 24px;
            }
            .next_ttime {
              height: 37px;
              line-height: 37px;
              .fen_1 {
                font-family: number1;
                display: inline-block;
                margin-right: 2px;
                width: 21px;
                height: 37px;
                line-height: 37px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                color: #fff;
                // background: url("../../assets/imgaes/main/fen.png") no-repeat
                //   center;
                // background-size: contain;
                background: url("../../assets/imgaes/allIcon.png") no-repeat;
                background-size: 700px 700px;
                background-position: 0 -91px;
              }
              .fen_2 {
                text-align: center;
                display: inline-block;
                width: 29px;
                font-size: 14px;
                color: #333;
                line-height: 37px;
                height: 37px;
              }
            }
          }
        }
        .red_more {
          position: relative;
          margin-bottom: 20px;
          padding: 5px 20px;
          span {
            position: absolute;
            display: inline-block;
            right: 20px;
            top: 5px;
          }
        }
        .red_list {
          .scheme_name {
            color: #ccc;
          }
          .new_left {
            padding-top: 18px;
            padding-left: 20px;
            width: 385px;
            padding-right: 20px;
            .new_num {
              margin-top: 8px;
              margin-left: 10px;
            }
          }
          .scheme_time {
            margin-top: 20px;
            ul {
              li {
                margin-right: 16px;
                color: #999;
                font-weight: 600;
                font-size: 20px;
                font-family: number1;
              }
            }
          }
          .fenye {
            margin-top: 20px;
            margin-bottom: 20px;
          }
          > ul {
            > li {
              width: 385px;
              border-radius: 5px;
              margin-right: 20px;
              margin-top: 20px;
              height: 100px;
              background: #fff;
              &:nth-child(3) {
                margin-right: 0;
              }
              &:nth-child(6) {
                margin-right: 0;
              }
              &:nth-child(9) {
                margin-right: 0;
              }
              .new_left {
                .new_img1 {
                  width: 65px;
                  height: 65px;
                  overflow: hidden;
                  border-radius: 50%;
                  margin-right: 20px;
                }
                .new_img {
                  width: 65px;
                  height: 65px;
                  border-radius: 50%;
                  overflow: hidden;
                  // img{
                  //   width: auto;
                  //   height: 100%;
                  // }
                }
              }
            }
          }
        }
      }

      .red_tabs_weiwei {
        height: 268px;
        min-height: 700px;
        .red_tabs_wei {
          background: #fff;
          height: 208px;
          border-radius: 5px;
          margin-bottom: 36px;
        }
      }
      .history {
        margin-top: 120px;
        min-height: 500px;
      }
    }
    .biaoti_2 {
      .his_tit {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        position: relative;
        margin-left: 14px;
        &:before {
          content: "";
          position: absolute;
          width: 4px;
          height: 16px;
          background-color: #ff1c30;
          border-radius: 2px;
          top: 1px;
          left: -14px;
        }
      }
      .days {
        margin-right: 340px;
        .day {
          margin: 0 10px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          // width: 60px;
          // height: 28px;
          padding: 6px 12px;
          border-radius: 14px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          &.active {
            color: #fff;
            background: #ff1c30;
          }
        }
      }
      .check_date {
        .date_1 {
          font-size: 14px;
          color: #999;
          margin-right: 10px;
          line-height: 30px;
        }
        .date_2 {
          // position: relative;
          // &:after {
          //   position: absolute;
          //   content: "";
          //   width: 10px;
          //   height: 5px;
          //   z-index: 1;
          //   background: url("../../assets/imgaes/main/date2.png") no-repeat;
          //   background-size: contain;
          //   right: 10px;
          //   top: 12px;
          // }
          // &:before {
          //   position: absolute;
          //   content: "";
          //   width: 18px;
          //   height: 19px;
          //   background: url("../../assets/imgaes/main/date.png") no-repeat;
          //   background-size: contain;
          //   left: 7px;
          //   top: 5px;
          //   z-index: 1;
          // }
        }
        .check_1 {
          width: 50px;
          height: 30px;
          background: rgba(255, 28, 48, 1);
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .lading {
    line-height: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    font-size: 20px;
    transform: translateX(-50%);
  }
  .his_zw {
    font-size: 14px;
    color: #ccc;
    margin-top: 46px;
    text-align: center;
  }
  .history_list {
    margin-top: 22px;
  }

  // 单双大小路珠的样式            **************************************************************
  .danshuang {
    width: 100%;
    // height: 500px;
    background: #fff;
    margin-top: 22px;
    padding: 17px 20px;
    border-radius: 3px;
    color: #000;
    font-size: 14px;
    .dans {
      height: 36px;
      .el-checkbox__input {
        background-color: #fff !important;
        transform: scale(1.15);
      }
      .el-checkbox__inner {
        border-color: #ddd;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner {
        //复选框选中的背景
        background-color: #fff !important;
        border-color: #ff1c30;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner::after {
        //对勾的样式
        border: 1px solid #ff1c30;
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        width: 3px;
        left: 4px;
        position: absolute;
        top: 1px;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #000 !important; //选中后字体的样式
      }
      .el-checkbox__input + .el-checkbox__label {
        color: #000 !important; //字体的样式
      }
      //全选
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #fff;
      }
    }
    .choose {
      height: 47px;
      .daxiao {
        margin-right: 20px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        width: 80px;
        height: 28px;
        border-radius: 99px;
        background: #fff;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        &.active {
          color: #fff;
          background: #ff1c30;
          border: none;
        }
      }
    }
    .chuxian {
      width: 100%;
      //  height: 174px;
      border: 1px solid #ddd;
      font-size: 14px;
      color: #333;
      .times {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #f4f5f8;
        padding: 0 10px;
        border-bottom: 1px solid #ddd;
        div {
          margin-right: 10px;
        }
        > div:nth-child(2) {
          width: 80px;
          height: 30px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          overflow: hidden;
          input {
            width: 100%;
            height: 100%;
            text-align: center;
          }
        }
        > div:nth-child(3) {
          margin-right: 10px;
        }
        > div:nth-child(4) {
          margin-right: 2px;
          width: 68px;
          height: 30px;
          border-radius: 4px;
          .el-input__inner {
            padding: 0 0 0 10px;
            border-color: #ddd;
          }
          .el-input__icon {
            margin-top: 0px;
            width: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .el-icon-arrow-up:before {
            //三角形
            content: "";
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-top: 5px solid #999;
            border-right: 5px solid transparent;
          }
          .el-select .el-input.is-focus .el-input__inner {
            border-color: #ff1c30; //点击之后的border
          }
        }
        > div:nth-child(5) {
          width: 60px;
          height: 28px;
          border-radius: 14px;
          background: #bcc3cf;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
          cursor: pointer;
          &.selectLuzhu:hover {
            background: #ff1c30;
          }
          &.active {
            background: #ff1c30;
          }
        }
        div:nth-child(6) {
          margin-right: 0;
        }
        div:nth-child(8) {
          margin-right: 0;
        }
        div:nth-child(9) {
          margin-right: 26px;
        }
        div:nth-child(10) {
          margin-right: 26px;
        }
        div:nth-child(11) {
          margin-right: 26px;
        }
        div:nth-child(12) {
          margin-right: 0;
        }
      }
    }
    .ranking {
      .fr:hover {
        color: red;
      }
    }
  }
  .mabiao-box {
    display: flex;
    margin-bottom: 16px;
    > div {
      padding: 4px 16px;
      border: 1px solid #ccc;
      margin-right: 20px;
      border-radius: 18px;
      cursor: pointer;
      color: #000;
    }
    .active {
      color: #fff;
      background: #ff1c30;
      border-color: #ff1c30;
    }
  }
  // 以上是 单双大小路珠的样式            **************************************************************

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
      bottom: 8px;
      width: 20px;
      height: 2px;
      background-color: #ff1c30;
    }
  }
  .onLi1 {
    cursor: pointer;
  }

  li {
    float: left;
    /*font-size: 16px;*/
  }
  .table_1 {
    width: 100%;
    background-color: #fff;
    tr {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #333;
    }
    th {
      width: 170px;
      font-size: 14px;
      color: #666;
      // height: 50px;
      // line-height: 50px;
      text-align: center;
      border-right: 1px solid #eeeeee;
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
        border-right: none;
      }
      &:nth-child(2) {
        width: 150px;
        font-size: 14px;
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
        margin-left: 15px;
        li {
          float: left;
          width: 34px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          overflow: hidden;
          font-size: 18px;
          font-family: number1;
          margin: 0 5px;
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
    line-height: 50px;
    color: #666666;
    font-size: 14px;
    tr {
      border-bottom: 1px solid #eeeeee;
      height: 50px;
      &:nth-last-child(1) {
        border-bottom: 0;
      }
      th {
        width: 158px;
        border-right: 1px solid #eeeeee;
        &:nth-child(2) {
          width: 106px;
        }
        &:nth-child(3) {
          width: 475px;
          div {
            width: 400px;
            &:nth-last-child(1) {
              width: 74px;
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
              width: 24.83%;
              border-top: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              &:nth-last-child(1) {
                border-right: 0;
              }
            }
          }
        }
        &:nth-last-child(1) {
          border-right: 0;
          width: 255px;
          line-height: 25px;
          ul {
            width: 100%;
            li {
              line-height: 25px;
              width: 20%;
              border-top: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              &:nth-last-child(1) {
                border-right: 0;
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
        &:nth-child(3) {
          ul {
            text-align: center;
            width: 100%;
            li {
              // width: 14.28%;
              margin: 0 6px;
              .six_code_c {
                width: 34px;
                height: 34px;
                text-align: center;
                background: #ccc;
                border-radius: 50%;
                margin-top: 8px;
                line-height: 34px;
                color: #fff;
                margin-right: 4px;
                font-family: number1;
                font-size: 18px;
              }
              &:nth-last-child(1) {
                width: 74px;
                border-left: 1px solid #eee;
                float: right;
                margin: 0 0 0 5px;
                padding-left: 10px;
              }
            }
          }
        }
        &:nth-child(4) {
          ul {
            width: 100%;
            li {
              width: 24.83%;
              font-size: 16px;
              border-right: 1px solid #eeeeee;
              &:nth-last-child(1) {
                border-right: 0;
              }
            }
          }
        }
        &:nth-child(5) {
          ul {
            width: 100%;
            li {
              width: 20%;
              border-right: 1px solid #eeeeee;
              font-size: 16px;
              &:nth-last-child(1) {
                border-right: 0;
              }
            }
          }
        }
        &:nth-last-child(1) {
          border-right: 0;
        }
      }
    }
  }
  .table_3 {
    width: 100%;
    background-color: #fff;
    tr {
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #333;
    }
    th {
      width: 190px;
      font-size: 14px;
      color: #666;
      // height: 50px;
      // line-height: 50px;
      text-align: center;
      border-right: 1px solid #eeeeee;
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
        border-right: none;
      }
      &:nth-child(2) {
        width: 170px;
      }
    }
    td {
      border-right: 1px solid #eeeeee;
      font-size: 14px;
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
          width: 34px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          border-radius: 50%;
          overflow: hidden;
          font-size: 18px;
          font-family: number1;
          margin: 0 10px;
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
  .fcsd-history {
    th {
      &:nth-child(1) {
        width: 370px !important;
      }
      &:nth-child(3) {
        width: 175px !important;
      }
    }
  }
}
.qx-hover:hover {
  color: rgb(255, 28, 48);
}
</style>
