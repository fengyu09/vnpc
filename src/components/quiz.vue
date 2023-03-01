<template>
  <div>
    <div class="fl quiz-box">
      <div class="lottery-box">
        <div class="fl">
          <div class="lottery-type">
            <span @click="lotteryType()"
              >{{ lotteryValue
              }}<i
                data-v-29e8c3c6=""
                class="el-icon-caret-bottom el-icon--right"
              ></i
            ></span>
            <ul class="lottery-list" v-show="lotteryIsShow">
              <li
                v-for="(item, index) in lotteryList"
                :key="index"
                :currId="item.lottery_id"
                @click="selectLotteryType(item.lottery_id)"
              >
                {{ item.cname }}
              </li>
            </ul>
          </div>
          <div class="curr-period">{{ currBallDel.issue }}期</div>
        </div>
        <div class="fl">
          <div class="draw-time">
            距离下一期
            <span class="fp"
              >封盘 <strong>{{ djsTime1 }}</strong></span
            >
            <span class="kj"
              >开奖 <strong>{{ djsTime }}</strong></span
            >
            <i
              :class="{ 'lottery-music': true, 'close-music': !musicState }"
              @click="musicState = !musicState"
            ></i>
          </div>
          <div class="lott-num" v-if="currBall.length">
            <span
              v-if="
                currId != 1 &&
                currId != 10 &&
                currId != 8 &&
                currId != 28 &&
                currId != 30 &&
                currId != 31 &&
                currId != 5 &&
                currId != 14
              "
              class="fl"
              :class="v | filterBallColor"
              v-for="v in currBall"
              >{{ v }}</span
            >
            <span
              v-if="
                currId == 1 ||
                currId == 10 ||
                currId == 28 ||
                currId == 30 ||
                currId == 31
              "
              class="fl cqsc"
              v-for="v in currBall"
              >{{ v }}</span
            >
            <span
              class="fl xgsc"
              style="
                width: 30px;
                height: 30px;
                line-height: 30px;
                font-size: 15px;
              "
              v-if="currId == 8"
              :class="v | filterBallColorLhc"
              v-for="v in currBall"
              >{{ v }}</span
            >
            <span
              class="fl fc-bgColor"
              style="
                width: 30px;
                height: 30px;
                line-height: 30px;
                font-size: 15px;
              "
              v-if="currId == 5 || currId == 14"
              :class="v | filterBallColorLhc"
              v-for="v in currBall"
              >{{ v }}</span
            >
          </div>
          <div
            class="lott-num"
            v-else
            style="line-height: 55px; padding-left: 15px"
          >
            开奖中...
          </div>
        </div>
      </div>
      <div class="tab-title">
        <span @click="Betting()" :class="currType == 1 ? 'active' : ''"
          >投注区</span
        >
        <span @click="Mybet()" :class="currType == 2 ? 'active' : ''"
          >我的注单</span
        >
      </div>
      <div v-if="currType == 1">
        <el-scrollbar
          style="height: 378px; width: 100px; background: #fff; float: left"
          ref="myScrollbar"
        >
          <div class="left-nav fl">
            <span
              :class="tabIndex == index ? 'active' : ''"
              :style="item.play_unit_name.length > 5 ? 'font-size:12px;' : ''"
              v-for="(item, index) in palyUnit"
              :key="index"
              @click="wfChangeTab(index, item)"
              >{{ item.play_unit_name }}</span
            >
          </div>
        </el-scrollbar>
        <el-scrollbar
          style="height: 378px; width: 320px; background: #fff; float: left"
          ref="myScrollbar"
        >
          <div class="right-box lott-content fl">
            <div v-if="currId != 8">
              <div
                class="floor zhenghe 11"
                v-if="
                  palyUnitName == '整合' ||
                  palyUnitName == '第一球' ||
                  palyUnitName == '第二球' ||
                  palyUnitName == '第三球' ||
                  palyUnitName == '第四球' ||
                  palyUnitName == '第五球'
                "
              >
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w16" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item1, index1) in item.play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item2, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item2)"
                      :data-wf="item2.play_class_name"
                      :data-name="item2.play_class_cname"
                      :data-odds="item2.play_odds"
                      :data-sec="item2.play_sec_name"
                    >
                      {{ item2.play_class_cname }}
                      <strong>{{ item2.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor"
                v-if="palyUnitName == '连码' || palyUnitName == '斗牛'"
              >
                <dl>
                  <dt class="dmLmDn">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <!--<dt class="dt-title">赔率：2</dt>-->
                  <dd class="item lott-content-list w16 w18" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16 w19" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor" v-if="palyUnitName == '单码'">
                <dl>
                  <dt class="dmLmDn">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <!--<dt class="dt-title">赔率：2</dt>-->
                  <dd class="item lott-content-list w16" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickDM(index, item)"
                      :class="DMIndex == index ? 'active' : ''"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor liangmian"
                v-if="palyUnitName == '两面' || palyUnitName == '冠亚军组合'"
              >
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd
                    class="item lott-content-list"
                    :class="item.play_sec_cname != '冠亚和' ? 'w25' : 'w20'"
                    v-if="!isCombo"
                  >
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd
                    class="item lott-content-list"
                    :class="item.play_sec_cname != '冠亚和' ? 'w25' : 'w20'"
                    v-if="isCombo"
                  >
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '快捷'">
                <dl>
                  <dt class="kj-tab">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <dd class="item lott-content-list w16" v-if="!isCombo">
                    <span
                      class="kuaijie-content"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item.play_class_cname }}
                      <!-- <strong>{{item.play_odds}}</strong> -->
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor" v-if="palyUnitName == '单号1-10'">
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w16" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor liangmian"
                v-if="
                  palyUnitName == '主势盘' ||
                  palyUnitName == '一字组合' ||
                  palyUnitName == '二字组合' ||
                  palyUnitName == '三字组合' ||
                  palyUnitName == '三字和数' ||
                  palyUnitName == '跨度'
                "
              >
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd
                    class="item lott-content-list"
                    v-if="!isCombo"
                    :class="[
                      {
                        w20:
                          item.play_sec_cname == '一字组合' ||
                          item.play_sec_cname.indexOf('和尾数') ||
                          item.play_sec_cname == '跨度',
                      },
                      {
                        w25:
                          item.play_sec_cname == '佰' ||
                          item.play_sec_cname == '拾' ||
                          item.play_sec_cname == '个',
                      },
                      {
                        w50:
                          item.play_sec_cname == '佰拾和数' ||
                          item.play_sec_cname == '佰个和数' ||
                          item.play_sec_cname == '拾个和数',
                      },
                    ]"
                  >
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd
                    class="item lott-content-list w25"
                    v-if="isCombo"
                    :class="[
                      {
                        w20:
                          item.play_sec_cname == '一字组合' ||
                          item.play_sec_cname.indexOf('和尾数') ||
                          item.play_sec_cname == '跨度',
                      },
                      {
                        w25:
                          item.play_sec_cname == '佰' ||
                          item.play_sec_cname == '拾' ||
                          item.play_sec_cname == '个',
                      },
                      {
                        w50:
                          item.play_sec_cname == '佰拾和数' ||
                          item.play_sec_cname == '佰个和数' ||
                          item.play_sec_cname == '拾个和数',
                      },
                    ]"
                  >
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor liangmian" v-if="palyUnitName == '二字和数'">
                <dt class="dmLmDn">
                  <span
                    :class="wfIndex == index ? 'active' : ''"
                    style="padding: 3px 30px; margin-right: 10px"
                    v-for="(item, index) in playSecList"
                    @click="wfChange(index, item)"
                    >{{ item.play_sec_cname }}</span
                  >
                </dt>
                <dl v-for="(item, index) in playClassList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-for="(item1, index1) in item.play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname
                      }}<strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor liangmian" v-if="palyUnitName == '一字定位'">
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor liangmian"
                v-if="palyUnitName == '二字定位' || palyUnitName == '三字定位'"
              >
                <dt
                  class=""
                  :class="palyUnitName == '二字定位' ? 'dmLmDn' : 'dt-title'"
                  style="margin-bottom: 0; padding-bottom: 10px"
                >
                  <span
                    v-if="palyUnitName == '二字定位'"
                    :class="wfIndex == index ? 'active' : ''"
                    style="
                      padding: 3px 10px;
                      margin-bottom: 5px;
                      margin-right: 25px;
                    "
                    v-for="(item, index) in playSecList"
                    @click="wfChange(index, item)"
                    >{{ item.play_sec_cname }}</span
                  >
                  <span
                    v-if="palyUnitName == '三字定位'"
                    v-for="(item, index) in playSecList"
                    >{{ item.play_sec_cname }}</span
                  >
                  <div
                    class="pvl-box fl"
                    style="line-height: 25px; font-size: 14px"
                  >
                    Tỷ lệ cược：{{
                      playSecList[wfIndex].play_sec_options[0].play_odds
                    }}
                  </div>
                </dt>
                <div
                  class="fc3D-bw clearfix"
                  :class="palyUnitName == '二字定位' ? 'fc3D-bw2' : ''"
                >
                  <span
                    v-for="(item1, index1) in playSecList[wfIndex]
                      .play_sec_info"
                    >{{ item1 }}</span
                  >
                </div>
                <!--<dl class="fc3D-bw-list w33 fl" v-if="palyUnitName == '二字定位'"  v-for="(item,index) in playSecList" :key="index"   >
                            <dd class="item lott-content-list "  v-if="!isCombo">
                                <span  v-for="(item1,index) in item.play_sec_data" :key="index"  @click="selectClick($event,item1,item.play_sec_cname)" :class="{active:selectList2.indexOf(index)!=-1}" >
                                     <i >{{item1.play_class_cname}}</i>
                                </span>
                            </dd>
                          </dl>
                          <dl class="fc3D-bw-list w33 fl" v-if="palyUnitName == '三字定位'"  v-for="(item,index) in playSecList" :key="index"   >
                            <dd class="item lott-content-list "  v-if="!isCombo">
                                <span  v-for="(item1,index) in item.play_sec_data" :key="index"  @click="selectClick($event,item1,item.play_sec_cname)" :class="{active:selectList2.indexOf(index)!=-1}" >
                                     <i >{{item1.play_class_cname}}</i>
                                </span>
                            </dd>
                          </dl>-->
                <dl class="fc3D-bw-list" v-if="palyUnitName == '二字定位'">
                  <dd
                    class="item lott-content-list w50 lott1"
                    v-if="!isCombo"
                    style="width: 50%; float: left"
                  >
                    <span
                      style="width: 80%"
                      :data-pcname="item1.play_class_cname"
                      :data-pname="item1.play_sec_name"
                      :data-pccname="item1.play_class_cname"
                      v-for="(item1, index1) in playSecList[wfIndex]
                        .play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index1) != -1 }"
                    >
                      <i>{{ item1.play_class_cname }}</i>
                    </span>
                  </dd>
                  <dd
                    class="item lott-content-list w50 lott2"
                    v-if="!isCombo"
                    style="width: 50%; float: left"
                  >
                    <span
                      style="width: 80%"
                      :data-pcname="item1.play_class_cname"
                      :data-pname="item1.play_sec_name"
                      :data-pccname="item1.play_class_cname"
                      v-for="(item1, index1) in playSecList[wfIndex]
                        .play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index1) != -1 }"
                    >
                      <i>{{ item1.play_class_cname }}</i>
                    </span>
                  </dd>
                </dl>
                <dl class="fc3D-bw-list" v-if="palyUnitName == '三字定位'">
                  <dd
                    class="item lott-content-list w33 lott1"
                    v-if="!isCombo"
                    style="width: 33.33%; float: left"
                  >
                    <span
                      style="width: 80%; height: 48.7px"
                      :data-pcname="item1.play_class_cname"
                      :data-pname="item1.play_sec_name"
                      :data-pccname="item1.play_class_cname"
                      v-for="(item1, index1) in playSecList[wfIndex]
                        .play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index1) != -1 }"
                    >
                      <i>{{ item1.play_class_cname }}</i>
                    </span>
                  </dd>
                  <dd
                    class="item lott-content-list w33 lott2"
                    v-if="!isCombo"
                    style="width: 33.33%; float: left"
                  >
                    <span
                      style="width: 80%; height: 48.7px"
                      :data-pcname="item1.play_class_cname"
                      :data-pname="item1.play_sec_name"
                      :data-pccname="item1.play_class_cname"
                      v-for="(item1, index1) in playSecList[wfIndex]
                        .play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index1) != -1 }"
                    >
                      <i>{{ item1.play_class_cname }}</i>
                    </span>
                  </dd>
                  <dd
                    class="item lott-content-list w33 lott3"
                    v-if="!isCombo"
                    style="width: 33.33%; float: left"
                  >
                    <span
                      style="width: 80%; height: 48.7px"
                      :data-pcname="item1.play_class_cname"
                      :data-pname="item1.play_sec_name"
                      :data-pccname="item1.play_class_cname"
                      v-for="(item1, index1) in playSecList[wfIndex]
                        .play_sec_data"
                      :key="index1"
                      @click="selectClick($event, item1, item1.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index1) != -1 }"
                    >
                      <i>{{ item1.play_class_cname }}</i>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor kuaijie"
                v-if="palyUnitName == '组选三' || palyUnitName == '组选六'"
              >
                <div
                  class="pvl-box"
                  v-if="palyUnitName == '组选三' && selectNum > 0"
                  style="line-height: 25px; font-size: 14px"
                >
                  Tỷ lệ cược：<font style="color: #f00">{{
                    palyUnit[tabIndex].play_unit_data[0].play_sec_options[
                      selectArr.length - 5
                    ].play_odds
                  }}</font>
                </div>
                <div
                  class="pvl-box"
                  v-if="palyUnitName == '组选六' && selectNum > 0"
                  style="line-height: 25px; font-size: 14px"
                >
                  Tỷ lệ cược：<font style="color: #f00">{{
                    palyUnit[tabIndex].play_unit_data[0].play_sec_options[
                      selectArr.length - 4
                    ].play_odds
                  }}</font>
                </div>

                <dl>
                  <dd class="item lott-content-list w20">
                    <span
                      style="padding-top: 12px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="
                        selectClick(
                          $event,
                          item,
                          playSecList[wfIndex].play_sec_cname,
                          playSecList[wfIndex],
                          playSecList[wfIndex].play_sec_options[
                            selectArr.length - 2
                          ]
                        )
                      "
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          background: linear-gradient(0deg, #88cffa, #3176f6);
                          border-radius: 50%;
                        "
                        >{{ item.play_class_cname }}</i
                      >
                    </span>
                  </dd>
                </dl>
              </div>
            </div>

            <!--香港六合彩-->
            <div v-if="currId == 8">
              <div
                class="floor kuaijie"
                v-if="palyUnitName == '特码' || palyUnitName == '正码特'"
              >
                <dl>
                  <dt class="kj-tab">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-if="index < 49"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <strong
                        style="
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          border-radius: 50%;
                          margin: 0 auto;
                        "
                        :class="
                          item.play_class_cname
                            | filterBallColorLhc(item.play_class_cname)
                        "
                        >{{ item.play_class_cname }}</strong
                      >
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-if="index > 48"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <!--{{item.play_class_cname}}-->
                      <strong>{{ item.play_class_cname }}</strong>
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor kuaijie"
                v-if="
                  palyUnitName == '两面' ||
                  palyUnitName == '7色波' ||
                  palyUnitName == '总肖'
                "
              >
                <dl>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item.play_class_cname }}
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '正码'">
                <dl>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-if="index < 49"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <strong
                        style="
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          border-radius: 50%;
                          margin: 0 auto;
                        "
                        :class="
                          item.play_class_cname
                            | filterBallColorLhc(item.play_class_cname)
                        "
                        >{{ item.play_class_cname }}</strong
                      >
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-if="index > 48"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <strong>{{ item.play_class_cname }}</strong>
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>

              <div
                class="floor liangmian"
                v-if="
                  palyUnitName == '正码1-6' ||
                  palyUnitName == '色波' ||
                  palyUnitName == '特肖'
                "
              >
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '连码'">
                <dl>
                  <dt class="kj-tab" style="padding-bottom: 0">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <dd class="item lott-content-list w20">
                    <span
                      style="padding-top: 12px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="
                        selectClick(
                          $event,
                          item,
                          playSecList[wfIndex].play_sec_cname,
                          playSecList[wfIndex]
                        )
                      "
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          border-radius: 50%;
                          margin: 0 auto;
                        "
                        :class="
                          item.play_class_cname
                            | filterBallColorLhc(item.play_class_cname)
                        "
                        >{{ item.play_class_cname }}</i
                      >
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '头尾数'">
                <dl>
                  <dd class="item lott-content-list w25" v-if="!isCombo">
                    <span
                      style="padding-top: 8px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item.play_class_cname }}
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w25" v-if="isCombo">
                    <span
                      style="padding-top: 8px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor liangmian"
                v-if="palyUnitName == '平特一肖尾数'"
              >
                <dl v-for="(item, index) in playSecList" :key="index">
                  <dt class="dt-title">{{ item.play_sec_cname }}</dt>
                  <dd class="item lott-content-list w16" v-if="!isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClick($event, item1, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w16" v-if="isCombo">
                    <span
                      v-for="(item1, index) in item.play_sec_data"
                      :key="index"
                      @click="selectClickCombo($event, item1)"
                      :data-wf="item1.play_class_name"
                      :data-name="item1.play_class_cname"
                      :data-odds="item1.play_odds"
                      :data-sec="item1.play_sec_name"
                    >
                      {{ item1.play_class_cname }}
                      <strong>{{ item1.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div
                class="floor kuaijie"
                v-if="palyUnitName == '连肖连尾' || palyUnitName == '连肖连尾2'"
              >
                <dl>
                  <dt class="kj-tab">
                    <span
                      :class="wfIndex == index ? 'active' : ''"
                      v-for="(item, index) in playSecList"
                      @click="wfChange(index, item)"
                      >{{ item.play_sec_cname }}</span
                    >
                  </dt>
                  <dd class="item lott-content-list w20">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="
                        selectClick(
                          $event,
                          item,
                          playSecList[wfIndex].play_sec_cname,
                          playSecList[wfIndex]
                        )
                      "
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          background: linear-gradient(0deg, #88cffa, #3176f6);
                          border-radius: 50%;
                        "
                        >{{ item.play_class_cname }}</i
                      >
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '合肖'">
                <div class="pvl-box" v-if="selectNum > 0">
                  Tỷ lệ cược：{{
                    playSecList[wfIndex].play_sec_options[selectArr.length - 2]
                      .play_odds
                  }}
                </div>
                <dl>
                  <dd class="item lott-content-list w20">
                    <span
                      style="padding-top: 12px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="
                        selectClick(
                          $event,
                          item,
                          playSecList[wfIndex].play_sec_cname,
                          playSecList[wfIndex],
                          playSecList[wfIndex].play_sec_options[
                            selectArr.length - 2
                          ]
                        )
                      "
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          background: linear-gradient(0deg, #88cffa, #3176f6);
                          border-radius: 50%;
                        "
                        >{{ item.play_class_cname }}</i
                      >
                      <!--<strong style="color: red;">{{item.play_odds}}</strong>-->
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '五行'">
                <dl>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      {{ item.play_class_cname }}
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      {{ item.play_class_cname }}
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '正肖'">
                <dl>
                  <dd class="item lott-content-list w20" v-if="!isCombo">
                    <span
                      style="padding-top: 5px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClick($event, item, item.play_sec_cname)"
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          background: linear-gradient(0deg, #88cffa, #3176f6);
                          border-radius: 50%;
                        "
                        >{{ item.play_class_cname }}</i
                      >
                      <strong style="color: red">{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                  <dd class="item lott-content-list w20" v-if="isCombo">
                    <span
                      class=""
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="selectClickCombo($event, item)"
                      :data-wf="item.play_class_name"
                      :data-name="item.play_class_cname"
                      :data-odds="item.play_odds"
                      :data-sec="item.play_sec_name"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          background: linear-gradient(0deg, #88cffa, #3176f6);
                          border-radius: 50%;
                        "
                        >{{ item.play_class_cname }}</i
                      >
                      <strong>{{ item.play_odds }}</strong>
                    </span>
                  </dd>
                </dl>
              </div>
              <div class="floor kuaijie" v-if="palyUnitName == '自选不中'">
                <div class="pvl-box" v-if="selectNum > 0">
                  Tỷ lệ cược：{{
                    palyUnit[tabIndex].play_unit_data[0].play_sec_options[
                      selectArr.length - 5
                    ].play_odds
                  }}
                </div>

                <!--vBig.play_sec_options[this.selectArr.length-5].play_odds-->
                <dl>
                  <dd class="item lott-content-list w20">
                    <span
                      style="padding-top: 12px"
                      v-for="(item, index) in playClassList"
                      :key="index"
                      @click="
                        selectClick(
                          $event,
                          item,
                          playSecList[wfIndex].play_sec_cname,
                          palyUnit[tabIndex].play_unit_data[0]
                        )
                      "
                      :class="{ active: selectList2.indexOf(index) != -1 }"
                    >
                      <i
                        style="
                          display: inline-block;
                          width: 20px;
                          height: 20px;
                          line-height: 20px;
                          color: #fff;
                          border-radius: 50%;
                          margin: 0 auto;
                        "
                        :class="
                          item.play_class_cname
                            | filterBallColorLhc(item.play_class_cname)
                        "
                        >{{ item.play_class_cname }}</i
                      >
                    </span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </el-scrollbar>
        <!-- <div class="jc-type">
                    <div :class="{active:jcType}" @click="jcType=!jcType"><i></i> 余额竞猜</div>
                    <div :class="{active:!jcType}" @click="jcType=!jcType"><i></i> 钻石竞猜</div>
                </div> -->
        <div class="tz-footer">
          <div class="kx-money">
            <span class="fl kx-fl">快选金额</span>
            <div class="kx-list">
              <ul>
                <!--                                <li v-for="(item,index) in chipsNum" :key="index" @click="chipsChange(index,item)" class="fl" :class="{['chips-'+item.play_sum_num]:['chips-'+item.play_sum_num],active:chipsIndex == index}" id="chips"></li>-->
                <li
                  v-for="(item, index) in chipsNum"
                  :key="index"
                  @click="chipsChange(index, item)"
                  class="fl"
                  :class="{
                    ['chips-' + item.play_sum_num]: [
                      'chips-' + item.play_sum_num,
                    ],
                    active: item.play_sum_num == chipsJE,
                  }"
                  id="chips"
                ></li>
              </ul>
            </div>
          </div>
          <div class="qt-money">
            <!-- <span style="display: none;">{{diamond}}</span>
                        <label>其他{{jcTypeName}}：<input type="text" :placeholder="jcPlaceholder"   class="chips-input" v-model="chipsJE" id="jine" maxlength="9"></label>
                        <span>共 {{selectNum}} 注 <strong class="red">{{selectDiamond}}</strong> <img v-if="!jcType" class="qt-icon" src="../assets/imgaes/jingcai/kxje_icon1.png" alt=""> <span v-else>元</span></span> -->

            <label
              >Số tiền khác：<input
                type="text"
                placeholder="请输入金额"
                class="chips-input"
                v-model="chipsJE"
                id="jine"
                maxlength="9"
            /></label>
            <span
              >共 {{ selectNum }} 注
              <strong class="red">{{ selectDiamond }}</strong
              ><span>元</span></span
            >
          </div>
          <div class="btn-group">
            <button type="reset" class="btn-reset" @click="clearSelectList">
              重置
            </button>
            <button type="button" class="btn-submit" @click="submitBet()">
              Gửi
            </button>
            <!--<button type="button" class="btn-submit" @click="popLaye()">提交</button>-->
          </div>
        </div>
      </div>
      <TzRecord
        class="TzRecord"
        :jcType="jcType"
        v-if="currType == 2"
      ></TzRecord>
      <!--请确认详细注单-->
      <div class="pop-laye" v-show="isMess">
        <div class="pop-box">
          <div class="title">
            请确认详细注单
            <img
              class="pop-close"
              @click="popClose()"
              src="../assets/imgaes/jingcai/kxje_icon3.png"
              alt=""
            />
          </div>
          <form class="form">
            <table class="table">
              <tr class="table-title">
                <td>玩法</td>
                <td>Số</td>
                <td>Tỷ lệ cược</td>
                <td>Tiền</td>
              </tr>
              <tr v-for="(item, index) in selectList3" :key="index">
                <td>{{ item.play_sec_cname }}</td>
                <td>{{ item.play_class_cname }}</td>
                <td>{{ item.play_odds }}</td>
                <td class="td-money">
                  <span class="td-sum"
                    ><input
                      v-model="item.play_bet_sum"
                      :data-index="index"
                      maxlength="9"
                  /></span>
                  <!--<span class="td-sum">400</span>-->
                  <img
                    class="delete"
                    src="../assets/imgaes/jingcai/kxje_icon2.jpg"
                    @click="deleteItem"
                    :data-index="index"
                  />
                </td>
              </tr>
            </table>
          </form>
          <div class="pop-footer">
            <!-- <div class="total fl"><span class="fl">共 {{selectNum}} 注</span> <strong class="red">{{totalNum}}</strong> <img v-if="!jcType" class="qt-icon" src="../assets/imgaes/jingcai/kxje_icon1.png" alt=""  >  <span v-else>元</span></div> -->
            <div class="total fl">
              <span class="fl">共 {{ selectNum }} 注</span>
              <strong class="red">{{ totalNum }}</strong> <span>元</span>
            </div>
            <button
              type="button"
              class="pop-submit fr"
              @click="Confirmbet()"
              :loading="btnLoading"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
      <div class="tzTC-box" v-if="showSBT" @click="showSBT = false">
        <div class="tcBox">
          <p>您的余额不足请充值</p>
          <div class="clearfix">
            <div class="yebzCancel fl" @click="showSBT = false">Hủy</div>
            <div class="yebzConfirm fr" @click="isRecharge = true">去充值</div>
          </div>
        </div>
      </div>
      <div class="tzTC-box" v-if="showDBT" @click="showDBT = false">
        <div class="tcBox">
          <p>{{ dbtTxt }}</p>
          <div class="clearfix">
            <div class="yebzConfirm" style="margin: 0 auto" @click="popClose()">
              Xác nhận
            </div>
          </div>
        </div>
      </div>
      <div class="tzTC-box" v-if="sheraFa" @click="popClose()">
        <div class="tcBox">
          <p>投注成功</p>
          <div class="clearfix">
            <div class="yebzCancel fl" @click="popClose()">Hủy</div>
            <div class="yebzConfirm fr" @click="shareFA()">分享方案</div>
          </div>
        </div>
      </div>
      <!-- <div class="tzTC-box" >
                <div class="tcBox">
                   <p>{{tipsTxt}}</p>
                </div>
            </div> -->
      <div class="tzTC-box" v-if="tipsTC">
        <div class="tcBox">
          <p style="line-height: 35px">{{ tipsTxt }}</p>
        </div>
      </div>
    </div>
    <audio
      :src="musicSrc"
      style="opacity: 0"
      controls=""
      id="lotteryMusic"
    ></audio>
    <!-- 充值 -->
    <Recharge v-if="isRecharge" :show="isRecharge" v-on:childFn="resetFlag" />
    <Excharge v-if="isEX" :showEx="isEX" v-on:childExFn="resetExFlag" />
  </div>
</template>

<script>
import TzRecord from "./tzRecord.vue"; //我的注单
import { mapMutations, mapState } from "vuex";
// import $myConfirm from '../utils/popups.js'
import P from "../assets/js/tool";
import { removeAllactive, getRank } from "../assets/js/public";
export default {
  data() {
    return {
      //lotteryIsShow:false,
      lotteryIsShow: true,
      lotteryValue: "福彩3D",
      lotteryList: [],
      //lottery_id:1,
      lottery_id: 5,
      play_unit_id: 23,
      currBallDel: {
        //当前开奖
        issue: "",
      },
      currBall: [], //当前开奖号码
      djsTime: "--:--", //倒计时
      djsTime1: "--:--", //倒计时
      currIssue: "", //当前期数
      betIssue: "", //期数
      nextEndTime: "", //封盘时间
      currId: "",
      currType: 1,
      tabIndex: 0, //左侧tab索引
      palyUnit: [],
      playList: {},
      playSecList: [],
      playClassList: [],
      palyUnitName: "",
      selectList2: [],
      selectList3: [],
      wfIndex: 0, //右侧玩法内容小标题 索引
      isCombo: 0, //0 一般玩法  1组合玩法
      comboType: "二中二", //单码、连码、斗牛
      comboFast: "",
      chipsNum: [], //快选金额
      chipsIndex: 0, //快选金额的index
      selectNum: 0, //共几注
      selectDiamond: 0, //钻石数
      chipsJE: 1, //其它金额输入框
      chouma: false, //筹码盒子
      isMess: false, //弹窗层
      totalNum: "", //弹层 总下注金额
      btnLoading: false,
      zsMount: 0, //账户钻石数
      musicState:
        this.$store.state.musicState == true ||
        this.$store.state.musicState == "true", //小喇叭
      musicSrc: require("../assets/ring.mp3"),
      orderMode: 0, //下注模式  0 一般下注 1跟投
      isFollow: false,
      isRecharge: false,
      isEX: false,
      DMIndex: -1, //单码索引
      jcType: 1, //竞猜类型 true 余额  false
      jcTypeName: "钻石",
      jcPlaceholder: "请输入钻石",
      selectArr: [], //选中特殊玩法的名字
      selectNameArr: [], //选中特殊玩法的名字中文
      HXodds: "",
      kjNum: [],
      fc3dCurrId: 0,
      tcTXT: "投注成功",
      tcBtn: "Xác nhận",
      showSBT: false,
      showDBT: false,
      sheraFa: false,
      tipsTC: false,
      tipsTxt: "",
      dbtTxt: "投注成功",
      shareObj: {},
    };
  },

  created() {
    this.currId = this.lotteryId;
    //处理跟投
    if (typeof this.followOrders.order_detail == "string") {
      this.selectList3 = this.followOrders.order_detail
        ? JSON.parse(this.followOrders.order_detail)
        : [];
      // this.jcType = this.followOrders.is_bl_play;
    } else {
      this.selectList3 = this.followOrders.order_detail
        ? this.followOrders.order_detail
        : [];
      // this.jcType = this.followOrders.is_bl_play;
    }

    if (this.selectList3.length) {
      this.orderMode = 1;
      this.currId = this.followOrders.play_bet_lottery_id;
      this.betIssue = this.followOrders.play_bet_issue;
      this.selectNum = this.selectList3.length;
      // this.jcType = this.followOrders.is_bl_play;
    }
    this.isFollow = this.isFollowOrder;

    if (this.isFollowOrder) {
      this.isMess = true;
    } else {
      this.clearSelectList();
    }
    console.log(this.jcType);

    //初始化
    this.init();

    //切屏倒计时重启
    let self = this;
    let visProp = P.getHiddenProp();
    if (visProp) {
      let evtname = visProp.replace(/[H|h]idden/, "") + "visibilitychange";
      document.addEventListener(
        evtname,
        function () {
          if (document[P.getVisibilityState()] == "hidden") {
          } else {
            if (self.$route.name == "chat") {
              self.getOneNumber();
            }
          }
        },
        false
      );
    }
  },
  computed: {
    ...mapState(["codeToken", "userType", "diamond"]),
    //
  },
  mounted() {
    this.getPlayNum();
  },
  destroyed() {
    clearInterval(window.timer1);
    clearInterval(window.timer3);
  },
  methods: {
    ...mapMutations(["SETISMUSIC", "SETDIAMOND"]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    resetFlag(flag) {
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      this.isEX = flag;
    },

    //初始化
    init() {
      this.getOneNumber();
      this.getPlayList();
      this.palyUnitName = "整合";
      // this.zsQuest();
      this.fixRoomId();
      // this.getGame();
    },
    //全部彩种
    // async getGame() {
    //     let res = await this.$http.post("/open/idx/sort/");
    //     if (res.data && res.data.code == 1) {
    //         this.allLottery = res.data.data || [];
    //     }
    //     //console.log(111111111111111111111111111111111111111111111111111 );
    // },
    //彩种下拉拦是否显示
    lotteryType() {
      // //console.log(this.allLottery)
      if (this.lotteryIsShow) {
        this.lotteryIsShow = false;
      } else {
        this.lotteryIsShow = true;
      }
      this.lotteryList = this.allLottery.filter((item, i) => {
        //return item.lottery_id != 8;
        return item.lottery_id;
      });
      this.lottery_id = this.lotteryId;
      // //console.log(this.lottery_id)
    },
    //彩种切换
    selectLotteryType(id) {
      this.lottery_id = id;
      ////console.log('彩种id'+this.lottery_id);
      this.lotteryIsShow = false;
      this.tabIndex = 0; //玩法左侧导航
      this.wfIndex = 0; //右侧普通玩法tab切换
      this.DMIndex = -1;
      this.$refs.myScrollbar.wrap.scrollTop = 0;
      switch (id) {
        // case 1:
        //     this.lotteryValue='重庆时时彩'
        //     this.palyUnitName ='整合'
        //     break;
        case 5:
          this.lotteryValue = "福彩3D";
          this.palyUnitName = "主盘势";
          break;
        case 7:
          this.lotteryValue = "北京赛车";
          this.palyUnitName = "两面";
          break;
        case 8:
          this.lotteryValue = "香港六合彩";
          this.palyUnitName = "特码";
          break;
        case 9:
          this.lotteryValue = "幸运飞艇";
          this.palyUnitName = "两面";
          break;
        case 10:
          this.lotteryValue = "澳洲幸运5";
          this.palyUnitName = "整合";
          break;
        case 11:
          this.lotteryValue = "澳洲幸运10";
          this.palyUnitName = "两面";
          break;
        case 14:
          this.lotteryValue = "体彩排列3";
          this.palyUnitName = "主盘势";
          break;
        case 26:
          this.lotteryValue = "极速赛车";
          this.palyUnitName = "两面";
          break;
        case 27:
          this.lotteryValue = "欢乐赛车";
          this.palyUnitName = "两面";
          break;
        case 28:
          this.lotteryValue = "极速时时彩";
          this.palyUnitName = "整合";
          break;
        case 29:
          this.lotteryValue = "极速飞艇";
          this.palyUnitName = "两面";
          break;
        case 30:
          this.lotteryValue = "腾讯分分彩";
          this.palyUnitName = "整合";
          break;
        case 31:
          this.lotteryValue = "河内分分彩";
          this.palyUnitName = "整合";
          break;
        case 32:
          this.lotteryValue = "分分赛车";
          this.palyUnitName = "两面";
          break;
        default:
          return;
      }
      this.getOneNumber(id); //当前开奖期
      this.getPlayList(id); //获取玩法列表
      this.isCombo = 0; //一般玩法
      this.clearSelectList();
      ////console.log(this.palyUnitName);
    },
    //获取最新的一期开奖号和正在开奖的奖期的封盘时间
    async getOneNumber(id) {
      this.currBall = [];
      let res = await this.$http.post("/open/idx/indexNewOne", {
        lottery_id: id || this.currId,
      });
      if (res.data && res.data.code == 1) {
        this.currBallDel = res.data.data;
        this.currId = res.data.data.lottery_id;
        if (res.data.data.next_lottery_time < 0) {
          this.currBall = [];
        } else {
          this.currBall = res.data.data.code.split(",") || [];
        }
        //开奖时间
        this.timer(res.data.data.next_lottery_time);
        //封盘时间
        this.nextEndTime = res.data.data.next_lottery_end_time;
        this.timer1(res.data.data.next_lottery_end_time);

        this.betIssue = res.data.data.next_issue;
      }
      ////console.log(this.currBallDel);
    },
    //倒计时
    count(time) {
      let t = "";
      let h = "";
      let d = "";
      let min = "";
      let second = "";
      // let obj = {};
      if (time > 60) {
        second = parseInt(time) % 60;
        min = parseInt((time / 60) % 60);
        h = parseInt((parseInt(time / 60) / 60) % 24);
        d = parseInt(parseInt(time / 60) / 60 / 24);
        second = second >= 10 ? second : "0" + second;
        min = min >= 10 ? min : "0" + min;
        if (!h) h = "";
        else h = h >= 10 ? h : "0" + h;
        if (d >= 1) {
          if (!h) h = "00";
          t = d + "天" + h + ":" + min + ":" + second;
        } else {
          if (h >= 1) {
            t = h + ":" + min + ":" + second;
          } else {
            t = min + ":" + second;
          }
        }
      } else {
        t = "00:" + (time >= 10 ? time : "0" + time);
      }
      return t;
    },
    timer(t) {
      //开奖时间倒计时
      if (window.timer1) clearInterval(window.timer1);
      window.timer1 = setInterval(() => {
        this.djsTime = this.count(t--);
        if (t <= -1) {
          this.getOneNumber(null, true);
          this.djsTime = "--:--";
        }
      }, 1000);
    },
    timer1(t) {
      // 封盘时间倒时计
      if (window.timer3) clearInterval(window.timer3);
      window.timer3 = setInterval(() => {
        this.djsTime1 = this.count(t--);
        if (t <= -1) {
          this.djsTime1 = "--:--";
          this.nextEndTime = 0;
        }
      }, 1000);
    },
    zsQuest() {
      // 获取钻石/api/v1/user/diamond_now/
      if (!this.$store.state.codeToken) return;
      this.zsMount = "loading...";
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.$store.state.userinfo.user_id
        )
        .then((res) => {
          ////console.log(res);
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.zsMount = 0;
              this.SETDIAMOND(0);
            } else {
              this.zsMount = parseFloat(res.data.data.diamond).toFixed(2);
              this.SETDIAMOND(res.data.data.diamond);
            }
          }
        });
    },
    Betting() {
      //投注区
      this.currType = 1;
    },
    Mybet() {
      //我的注单
      this.currType = 2;
    },
    //玩法列表
    getPlayList(id) {
      this.$http
        .get("/forum/guess/play_list", {
          params: {
            lottery_id: id || this.lotteryId,
            //lottery_id:8,
            client_type: 4,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            // console.log(res.data.data);
            this.palyUnit = res.data.data;
            this.playSecList = res.data.data[0].play_unit_data;
            this.playClassList =
              res.data.data[0].play_unit_data[0].play_sec_data;
            this.secName = res.data.data[0].play_unit_data[0].play_sec_cname;
            this.palyUnitName = res.data.data[0].play_unit_name;
          }
        });
    },
    //投注区,左侧玩法切换玩法切换
    wfChangeTab(index, v) {
      //console.log('左侧玩法切换'+index);
      //console.log(v.play_unit_name);
      //console.log(this.playSecList);
      this.palyUnitName = v.play_unit_name; //左侧玩法id
      this.tabIndex = index;
      this.wfIndex = 0; //右侧小标题
      this.isCombo = v.play_unit_data[0].play_sec_combo; //一般玩法
      this.playSecList = this.palyUnit[index].play_unit_data; //右侧玩法小标题
      this.playClassList = this.playSecList[0].play_sec_data; //右侧玩法小项
      ////console.log(this.isCombo);
      this.comboType = v.play_unit_data[0].play_sec_cname; //二中二 三中三
      this.secName = this.playSecList[0].play_sec_cname;
      this.clearSelectList();
      //console.log(this.playClassList)
      this.DMIndex = -1;
      //this.selectList2=[];

      if (v.play_unit_name == "自选不中") {
        // console.log(index);
        this.playSecList = this.palyUnit[index].play_unit_data[0].play_sec_data; //右侧玩法小标题
        this.playClassList =
          this.palyUnit[index].play_unit_data[0].play_sec_data; //右侧玩法小项
        // console.log(888,this.palyUnit[index]);
      }
      if (v.play_unit_name == "合肖") {
        // this.playSecList = this.palyUnit[index].play_unit_data[0].play_sec_data; //右侧玩法小标题
        //this.playClassList = this.palyUnit[index].play_unit_data[0].play_sec_data[0].play_options; //右侧玩法小项
        this.playClassList =
          this.palyUnit[index].play_unit_data[0].play_sec_data; //右侧玩法小项
        // this.HXodds =this.playSecList.play_sec_options[selectArr.length-2].play_odds;
        //console.log(this.playSecList);
        // console.log(this.playSecList.play_sec_options[(this.selectArr.length-2)].play_odds);
        // console.log(this.selectArr.length-2);
      }
    },
    //右侧玩法小标题切换
    wfChange(index, v) {
      //console.log(v.play_sec_combo);s
      /*if(this.lottery_id == 5){
                if(v == '佰拾'){
                  this.fc3dCurrId = 0
                }else if(v == '佰个'){
                  this.fc3dCurrId = 1
                }else if(v == '拾个'){
                  this.fc3dCurrId = 2
                }
              }else{

              }*/
      this.isCombo = v.play_sec_combo;
      this.comboType = v.play_sec_cname;
      this.playClassList = this.playSecList[index].play_sec_data;
      this.secName = this.playSecList[index].play_sec_cname;
      this.wfIndex = index; //右侧普通玩法tab切换
      this.clearSelectList();
    },
    //正常玩法
    // selectClick(e,v,name,vBig){
    //     console.log(v)
    //     console.log(name)
    //     console.log(vBig)
    //     let curr = e.currentTarget;
    //     let index;
    //     index = this.selectList3.findIndex((res) => res.play_class_id == v.play_class_id);
    //     if(curr.className.indexOf('active')>-1){
    //         curr.classList.remove('active');
    //         this.selectList2.splice(index,1);
    //         this.selectList3.splice(index,1);

    //     }else{
    //         curr.classList.add('active');
    //         this.selectList2.push(e);
    //         this.selectList3.push({
    //                 play_sec_cname:name || this.secName,
    //                 play_sec_name:v.play_sec_name,
    //                 play_class_id:v.play_class_id,
    //                 play_class_name:v.play_class_name,
    //                 play_class_cname:v.play_class_cname,
    //                 play_odds:v.play_odds,
    //                 play_bet_sum:this.chipsJE
    //             }
    //         );
    //     }
    //     this.playList.selectList3 = this.selectList3;
    //     this.selectNum = this.selectList3.length;
    //     this.selectDiamond = this.chipsJE * this.selectNum;
    //     //console.log(this.selectList3);
    // },
    selectClick(e, v, name, vBig, odds) {
      // console.log(999,vBig);
      console.log(v);

      let curr = e.currentTarget;
      let index;
      if (
        this.palyUnitName == "连码" ||
        this.palyUnitName == "自选不中" ||
        this.palyUnitName == "连肖连尾" ||
        this.palyUnitName == "合肖" ||
        this.palyUnitName == "组选三" ||
        this.palyUnitName == "组选六"
      ) {
        let maxL;
        let minL;
        let orders_temp;
        let orders_temp_name;
        // let num = 0;
        if (vBig) {
          maxL = vBig.play_sec_max;
          minL = vBig.play_sec_min;
        }
        index = this.selectArr.findIndex((res) => res == v.play_class_name);
        if (curr.className.indexOf("active") > -1) {
          curr.classList.remove("active");
          this.selectList2.splice(index, 1);
          this.selectList3.splice(index, 1);
          this.selectArr.splice(index, 1);
          this.selectNameArr.splice(index, 1);
        } else {
          if (
            vBig &&
            vBig.play_sec_combo == 1 &&
            this.selectNameArr.length >= maxL
          ) {
            // this.$vux.toast.text('当前玩法最多选择'+maxL+'个号码', 'middle');
            // $myConfirm.myPrompt({
            //     type:'',
            //     msg: '当前玩法最多选择'+maxL+'个号码',
            //     closeIsShow:false,
            //     btn:{
            //         cancelText:'',
            //         cancelClass:'',
            //         confirmText:'',
            //         confirmClass:''
            //     }
            // })
            this.showTips("当前玩法最多选择" + maxL + "个号码");
            return;
          }
          curr.classList.add("active");
          this.selectList2.push(e); //控制选中样式
          this.selectArr.push(v.play_class_name);
          this.selectNameArr.push(v.play_class_cname);
        }
        // console.log(this.selectArr);
        if (
          this.palyUnitName == "自选不中" ||
          this.palyUnitName == "合肖" ||
          this.palyUnitName == "组选三" ||
          this.palyUnitName == "组选六"
        ) {
          if (this.selectArr.length >= minL) {
            let arr = [
              {
                play_sec_cname:
                  this.palyUnitName == "组选三" || this.palyUnitName == "组选六"
                    ? this.palyUnitName + " " + this.selectArr.length
                    : this.palyUnitName,
                play_sec_name:
                  vBig.play_sec_options[this.selectArr.length - minL]
                    .play_sec_name,
                play_class_name: this.selectArr.join(","),
                play_class_cname: this.selectNameArr.join(","),
                // play_odds:vBig.play_sec_options[0].play_odds,
                play_odds:
                  vBig.play_sec_options[this.selectArr.length - minL].play_odds,
                play_bet_sum: this.chipsJE,
              },
            ];
            this.selectList3 = arr;
            this.chouma = true;
            this.selectNum = 1;
          } else {
            this.chouma = false;
            this.selectNum = 0;
            this.selectList3 = [];
          }
        } else {
          //组合玩法的组数
          orders_temp = getRank(this.selectArr, minL);
          orders_temp_name = getRank(this.selectNameArr, minL);
          // this.selectNum = orders_temp.length;
          let odds1;
          if (this.palyUnitName == "连肖连尾") {
            odds1 = v.play_odds;
          } else if (this.palyUnitName == "合肖") {
            if (this.selectNum > 0) {
              odds1 =
                vBig.play_sec_options[this.selectArr.length - 2].play_odds;
              // console.log(odds1)
            }
          } else {
            odds1 = vBig.play_sec_options[0].play_odds;
          }
          if (orders_temp_name.length) {
            let a = [];
            let a2 = [];
            for (let i = 0, len = orders_temp_name.length; i < len; i++) {
              a.push({
                play_sec_cname:
                  this.palyUnitName == "连肖连尾"
                    ? vBig.play_sec_cname
                    : vBig.play_sec_options[0].play_class_cname,
                // play_sec_name:this.palyUnitName == '连肖连尾'?v.play_sec_name:vBig.play_sec_options[0].play_sec_name,
                play_sec_name:
                  this.palyUnitName == "连肖连尾"
                    ? vBig.play_sec_merge_name
                    : vBig.play_sec_options[0].play_sec_name,
                play_class_name: orders_temp[i],
                play_class_cname: orders_temp_name[i],
                // play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
                play_odds: odds1,
                play_bet_sum: this.chipsJE,
              });
              a2.push({
                play_sec_name:
                  this.palyUnitName == "连肖连尾"
                    ? vBig.play_sec_merge_name
                    : vBig.play_sec_options[0].play_sec_name,
                play_class_name: orders_temp[i],
                // play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
                play_odds: odds1,
                play_bet_sum: this.chipsJE,
              });
            }
            // a2.push({
            //     play_sec_name:this.palyUnitName == '连肖连尾'?vBig.play_sec_merge_name:vBig.play_sec_options[0].play_sec_name,
            //     play_class_name:this.selectArr.join(','),
            //     play_odds:this.palyUnitName == '连肖连尾'?v.play_odds:vBig.play_sec_options[0].play_odds,
            //     play_bet_sum:this.chipsJE
            // });
            this.selectList3 = a;
            this.selectListTs = a2;
            // console.log(this.selectListTs);
            this.chouma = true;
          } else {
            this.chouma = false;
          }
          // console.log(orders_temp);
          this.selectNum = orders_temp_name.length;
        }

        // this.playList.selectList3 = this.selectList3;//控制显示的数据
        this.selectDiamond = this.chipsJE * this.selectNum;
      } else if (
        this.palyUnitName == "二字定位" ||
        this.palyUnitName == "三字定位"
      ) {
        if (curr.className.indexOf("active") > -1) {
          curr.classList.remove("active");
        } else {
          curr.classList.add("active");
        }
        this.doData(v.play_sec_name);
      } else {
        index = this.selectList3.findIndex(
          (res) => res.play_class_id == v.play_class_id
        );
        if (curr.className.indexOf("active") > -1) {
          curr.classList.remove("active");
          this.selectList2.splice(index, 1);
          this.selectList3.splice(index, 1);
        } else {
          curr.classList.add("active");
          this.selectList2.push(e);
          this.selectList3.push({
            play_sec_cname: name || this.secName,
            play_sec_name: v.play_sec_name,
            play_class_id: v.play_class_id,
            play_class_name: v.play_class_name,
            play_class_cname: v.play_class_cname,
            play_odds: v.play_odds,
            play_bet_sum: this.chipsJE,
          });
        }
        if (this.selectList2.length) this.chouma = true;
        else this.chouma = false;
        this.selectNum = this.selectList3.length;
        // this.playList.selectList3 = this.selectList3;//控制显示的数据
        this.selectDiamond = this.chipsJE * this.selectNum;
      }
      // console.log(this.selectList3)
    },

    doData(name) {
      let one = document.querySelectorAll(".lott1 span.active");
      let two = document.querySelectorAll(".lott2 span.active");
      let three;
      if (this.palyUnitName == "三字定位") {
        three = document.querySelectorAll(".lott3 span.active");
      }
      let arr = [];
      if (this.palyUnitName == "二字定位" && one.length && two.length) {
        for (let i = 0, len = one.length; i < len; i++) {
          for (let j = 0, lenj = two.length; j < lenj; j++) {
            let s = "";
            s = one[i].dataset.pcname + "," + two[j].dataset.pcname;
            arr.push({
              play_sec_cname: this.playSecList[this.wfIndex].play_sec_cname,
              play_sec_name: one[i].dataset.pname,
              play_class_name: s,
              play_class_cname: s,
              play_odds:
                this.playSecList[this.wfIndex].play_sec_options[0].play_odds,
              play_bet_sum: this.chipsJE,
            });
          }
        }
      } else if (this.palyUnitName == "三字定位") {
        console.log("44444");
        if (one.length && two.length && three.length) {
          for (let i = 0, len = one.length; i < len; i++) {
            for (let j = 0, lenj = two.length; j < lenj; j++) {
              for (let l = 0, lenl = three.length; l < lenl; l++) {
                let s = "";
                s =
                  one[i].dataset.pcname +
                  "," +
                  two[j].dataset.pcname +
                  "," +
                  three[l].dataset.pcname;
                arr.push({
                  play_sec_cname: this.playSecList[this.wfIndex].play_sec_cname,
                  play_sec_name:
                    this.playSecList[this.wfIndex].play_sec_merge_name,
                  play_class_name: s,
                  play_class_cname: s,
                  play_odds:
                    this.playSecList[this.wfIndex].play_sec_options[0]
                      .play_odds,
                  play_bet_sum: this.chipsJE,
                });
              }
            }
          }
        }
      }

      console.log(arr);
      this.selectList3 = arr;
      if (this.selectList3.length) this.chouma = true;
      else this.chouma = false;
      this.selectNum = this.selectList3.length;
      this.selectDiamond = this.chipsJE * this.selectNum;
    },

    // 单码玩法
    selectClickDM(e, v) {
      this.selectList3 = [];
      this.selectList2 = [];
      this.DMIndex = e;
      this.selectList2.push(e);
      this.selectList3.push({
        play_sec_cname: name || this.secName,
        play_sec_name: v.play_sec_name,
        play_class_id: v.play_class_id,
        play_class_name: v.play_class_name,
        play_class_cname: v.play_class_cname,
        play_odds: v.play_odds,
        play_bet_sum: this.chipsJE,
      });
      this.selectNum = 1;
      this.selectDiamond = this.chipsJE * this.selectNum;
      //console.log(this.selectList3);
    },
    //组合玩法选择
    selectClickCombo(e, v) {
      let curr = e.currentTarget;
      let sum = 0;
      let maxSum = 0; //最多选几个
      let maxTip = ""; //超过提示
      if (this.comboType == "二中二") {
        maxSum = 2;
        maxTip = "二中二最多选2个号码";
      } else {
        maxSum = 3;
        maxTip = "三中三最多选3个号码";
      }
      if (curr.className.indexOf("active") > -1) {
        curr.classList.remove("active");
        sum = document.querySelectorAll(".lott-content-list>.active").length;
        if (sum < maxSum) {
          this.chouma = false;
          this.selectNum = 0;
          this.selectDiamond = this.chipsJE * this.selectNum;
        }
      } else {
        curr.classList.add("active");
        sum = document.querySelectorAll(".lott-content-list>.active").length;
        if (sum == maxSum) {
          this.chouma = true;
          this.selectNum = 1;
          this.selectDiamond = this.chipsJE * this.selectNum;
        } else if (sum > maxSum) {
          //this.$vux.toast.text(maxTip, 'middle');
          /*this.$message({
                            type: "warning",
                            message: maxTip,
                            center: true,
                            offset: 225
                        });*/
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: maxTip,
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips(maxTip);

          curr.classList.remove("active");
        } else {
          curr.classList.add("active");
          this.chouma = false;
          this.selectNum = 0;
          this.selectDiamond = this.chipsJE * this.selectNum;
        }
      }
    },
    //获取快选金额
    getPlayNum() {
      this.$http.get("/forum/guess/play_sum_list").then((res) => {
        if (res && res.data.code == 1) {
          this.chipsNum = res.data.data;
          //console.log(res.data.data)
        }
      });
    },
    //快选金额选择
    chipsChange(index, num) {
      this.chipsIndex = index;
      this.chipsJE = num.play_sum_num;
      this.selectDiamond = this.chipsJE * this.selectNum;
      this.selectList3.forEach((value, index) => {
        value["play_bet_sum"] = this.chipsJE;
      });
      //console.log(num.play_sum_num)
      //console.log(this.chipsJE)
      // for(let i = 0, len = this.selectList3.length; i < len; i++){
      //     this.selectList3[i].play_bet_sum = this.chipsJE;
      // }
    },
    clearActive() {
      //删除选中的注
      let all = document.querySelectorAll(".lott-content-list>.active");
      for (let i = 0, len = all.length; i < len; i++) {
        all[i].classList.remove("active");
      }
    },
    //重置
    clearSelectList() {
      this.selectList2 = [];
      this.chipsJE = 1;
      this.selectNum = 0;
      this.selectList3 = [];
      this.chouma = false;
      this.chipsIndex = 0;
      this.isMess = false;
      this.clearActive();
      this.selectDiamond = 0;
      this.DMIndex = -1;
      this.selectArr = [];
      this.selectNameArr = [];
    },
    submitBet() {
      console.log("成功");
      let num;
      if (this.jcType) {
        num = 1;
      } else {
        num = 10;
      }
      if (
        this.isCombo &&
        this.lottery_id != 8 &&
        this.lottery_id != 14 &&
        this.lottery_id != 5
      ) {
        console.log("成功1");
        let all = document.querySelectorAll(".lott-content-list>.active");
        if (!this.chipsJE) {
          //this.$vux.toast.text('未选择投注金额，请选择后再提交', 'middle');
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '未选择投注金额，请选择后再提交',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("未选择投注金额，请选择后再提交");
        } else if (this.chipsJE < num) {
          //this.$vux.toast.text('请输入≥10的整数', 'middle');
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '请输入≥10的整数',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入≥10的整数");
        } else if (this.chipsJE > 999999999) {
          //this.$vux.toast.text('请输入小于999999999的整数', 'middle');
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '请输入小于999999999的整数',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入小于999999999的整数");
        } else if (this.nextEndTime <= 0) {
          // $myConfirm.myConfirm({
          //     type:'',
          //     msg:'已封盘请购买下一期',
          //     closeIsShow:false,
          //     //isRound:true,
          //     btn:{
          //         confirmText:'确定',
          //         confirmClass:'orging'
          //     }
          // }).then(() => {
          //     this.clearSelectList();
          // })
          // .catch(() => {
          //     this.clearSelectList();
          // })
          this.dbtTxt = "已封盘请购买下一期";
          this.showDBT = true;
        } else if (this.comboType == "二中二") {
          if (all.length != 2) {
            // $myConfirm.myConfirm({
            //     type:'',
            //     msg: ' 二中二需要选2个号码',
            //     closeIsShow:false,
            //     btn:{
            //         confirmText:'确定',
            //         confirmClass:'orging'
            //     }
            // });
            this.dbtTxt = "二中二需要选2个号码";
            this.showDBT = true;
          } else {
            this.selectList3 = [
              {
                play_sec_name: all[0].dataset.sec,
                play_sec_cname: this.secName,
                play_class_name: all[0].dataset.wf + "," + all[1].dataset.wf,
                play_class_cname:
                  all[0].dataset.name + "," + all[1].dataset.name,
                play_odds: all[0].dataset.odds,
                play_bet_sum: this.chipsJE,
              },
            ];
            this.isMess = true;
          }
        } else if (this.comboType == "三中三") {
          if (all.length != 3) {
            // $myConfirm.myConfirm({
            //     type:'',
            //     msg: ' 三中三需要选3个号码',
            //     closeIsShow:false,
            //     btn:{
            //         confirmText:'确定',
            //         confirmClass:'orging'
            //     }
            // });
            this.dbtTxt = "三中三需要选3个号码";
            this.showDBT = true;
          } else {
            this.selectList3 = [
              {
                play_sec_name: all[0].dataset.sec,
                play_sec_cname: this.secName,
                play_class_name:
                  all[0].dataset.wf +
                  "," +
                  all[1].dataset.wf +
                  "," +
                  all[2].dataset.wf,
                play_class_cname:
                  all[0].dataset.name +
                  "," +
                  all[1].dataset.name +
                  "," +
                  all[2].dataset.name,
                play_odds: all[0].dataset.odds,
                play_bet_sum: this.chipsJE,
              },
            ];
            this.isMess = true;
          }
        }
        //console.log(this.selectList3);
      } else {
        console.log("成功2");
        if (
          this.selectList3 == [] ||
          this.selectList3.length == 0 ||
          !this.chipsJE
        ) {
          // console.log(33);
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '未选择任何玩法或投注金额，请选择后再提交',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("未选择任何玩法或投注金额，请选择后再提交");
        } else if (this.chipsJE < num) {
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '请输入≥10 的整数',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入≥10 的整数");
        } else if (this.chipsJE > 999999999) {
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '请输入小于999999999的整数',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入小于999999999的整数");
        } else if (this.nextEndTime <= 0) {
          /*this.$confirm('已封盘请购买下一期', {
                            //showClose:false,
                            confirmText:"确定",
                            showCancelButton:false,
                            confirmButtonClass:'mb16',
                            roundButton:true,
                        }).then(() => {
                            this.clearSelectList();

                        }).catch(() => {
                            this.clearSelectList();
                        });*/

          // $myConfirm.myConfirm({
          //     type:'',
          //     msg:'已封盘请购买下一期',
          //     closeIsShow:false,
          //     isRound:false,
          //     btn:{
          //         confirmText:'确定',
          //         confirmClass:'orging'
          //     }
          // }).then(() => {
          //     this.clearSelectList();
          // })
          //     .catch(() => {
          //         this.clearSelectList();
          //     })
          this.dbtTxt = "已封盘请购买下一期";
          this.showDBT = true;
        } else {
          this.isMess = true;
        }
      }
      var totalNum = 0;
      for (let i = 0, len = this.selectList3.length; i < len; i++) {
        totalNum += this.selectList3[i].play_bet_sum - 0;
      }
      this.totalNum = totalNum;
      // this.isMess = true;
      //console.log(this.selectList3)
    },
    //点击提交显示弹窗
    /*popLaye(){
                if(this.selectList3.length != 0){
                    this.isMess = true;
                }
            },*/
    popClose() {
      this.isMess = false;
      this.clearSelectList();
      this.sheraFa = false;
      this.showDBT = false;
    },
    shareFA() {
      this.isMess = false;
      this.clearSelectList();
      this.sheraFa = false;
      //去分享
      this.$emit("func", this.shareObj);
    },
    showTips(val) {
      this.tipsTxt = val;
      this.tipsTC = true;
      setTimeout(() => {
        this.tipsTC = false;
      }, 3000);
    },
    goRecharge() {
      this.isRecharge = true;
    },
    //删除
    deleteItem(e) {
      // if(this.palyUnitName == '连码'||this.palyUnitName == '自选不中'||this.palyUnitName == '连肖连尾'||this.palyUnitName == '合肖') return
      let index = e.currentTarget.dataset.index;
      // //console.log(index);
      // 复位
      this.selectList3.splice(index, 1);
      this.selectNum = this.selectList3.length;
      //console.log(this.selectList3.length);
      if (this.selectList3.length == "" || this.selectList3.length == 0) {
        this.isMess = false;

        this.clearSelectList();
      }
    },
    //弹窗提交
    Confirmbet(id) {
      let num;
      if (this.jcType) {
        num = 1;
      } else {
        num = 10;
      }
      for (let i = 0, len = this.selectList3.length; i < len; i++) {
        if (this.selectList3[i].play_bet_sum == "") {
          //this.$vux.toast.text('未填写投注金额，请填写后再提交', 'middle');
          /* this.$message({
                            type: "warning",
                            message: '未填写投注金额，请填写后再提交',
                            center: true,
                            offset: 225
                        });*/
          /*$myConfirm({
                            type:'',
                            msg:'未填写投注金额，请填写后再提交',
                            closeIsShow:false,
                            isRound:true,
                            btn:{
                                confirmText:'确定',
                                confirmClass:'red'
                            }
                        })*/

          // $myConfirm.myPrompt({
          //     type:'',
          //     msg: '未填写投注金额，请填写后再提交',
          //     closeIsShow:false,
          //     btn:{
          //         cancelText:'',
          //         cancelClass:'',
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          // this.sheraFa=true
          this.showTips();
          return false;
        } else if (this.selectList3[i].play_bet_sum < num) {
          //this.$vux.toast.text('请输入≥10 的整数', 'middle');
          /*this.$message({
                            type: "warning",
                            message: '请输入≥10 的整数',
                            center: true,
                            offset: 225
                        });*/
          // $myConfirm.myPrompt({
          //     type:'',
          //     msg:'请输入≥'+num+' 的整数',
          //     closeIsShow:false,
          //     btn:{
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入≥" + num + " 的整数");
          return false;
        } else if (this.selectList3[i].play_bet_sum >= 999999999) {
          //this.$vux.toast.text('请输入小于999999999的整数', 'middle');
          /*this.$message({
                            type: "warning",
                            message: '请输入小于999999999的整数',
                            center: true,
                            offset: 225
                        });*/

          // $myConfirm.myPrompt({
          //     type:'',
          //     msg:'请输入小于999999999的整数',
          //     closeIsShow:false,
          //     btn:{
          //         confirmText:'',
          //         confirmClass:''
          //     }
          // })
          this.showTips("请输入小于999999999的整数");
          return false;
        }
      }
      if (!this.$store.state.codeToken) {
        this.$confirm("Đăng nhập để xem phiên bản đầy đủ", {
          //showClose:false,
          confirmButtonText: "Xác nhận",
          confirmButtonClass: "mb16",
          roundButton: true,
          showCancelButton: false,
        })
          .then(() => {
            // this.$store.commit('SETLOGIN',true);
            this.$store.commit("SETLOGIN", true);
          })
          .catch(() => {});
      } else if (this.totalNum > this.$store.state.balance - 0) {
        // let num = ((this.$store.state.balance - 0) * 10) + (this.diamond-0);
        //    if(!this.jcType){
        //        $myConfirm.myConfirm({
        //            type:'',
        //            msg:'您的钻石不足请兑换',
        //            closeIsShow:false,
        //            isRound:false,
        //            btn:{
        //                cancelText:'取消',
        //                cancelClass:'gray',
        //                confirmText:'去兑换',
        //                confirmClass:'orging'
        //            }
        //        }).then(() => {
        //            this.isEX = true;

        //        }).catch(() => {

        //        });
        //     }else{
        //        $myConfirm.myConfirm({
        //            type:'',
        //            msg:'您的余额不足请充值',
        //            closeIsShow:false,
        //            isRound:false,
        //            btn:{
        //                cancelText:'取消',
        //                cancelClass:'gray',
        //                confirmText:'去充值',
        //                confirmClass:'orging'
        //            }
        //        }).then(() => {
        //            this.isRecharge = true;

        //        }).catch(() => {

        //        });
        //  }
        // $myConfirm.myConfirm({
        //            type:'',
        //            msg:'您的余额不足请充值',
        //            closeIsShow:false,
        //            isRound:false,
        //            btn:{
        //                cancelText:'取消',
        //                cancelClass:'gray',
        //                confirmText:'去充值',
        //                confirmClass:'orging'
        //            }
        //        }).then(() => {
        //            this.isRecharge = true;

        //        }).catch(() => {

        //        });

        this.showSBT = true;
      } else {
        //this.$vux.loading.show({text: "投注中"});
        // $myConfirm.myPrompt({
        //     type:'',
        //     msg:'投注中...',
        //     closeIsShow:false,
        //     //isRound:true,
        //     btn:{
        //         confirmText:'',
        //     }
        // })
        this.tipsTC = true;
        this.tipsTxt = "投注中...";
        let issue = "";
        if (this.isCombo || this.currId == 14 || this.currId == 5) {
          issue = this.betIssue;
        } else {
          issue = this.selectList2.length
            ? this.betIssue
            : this.followOrders.play_bet_issue;
        }
        let dataObj = {
          play_bet_lottery_id: this.currId,
          play_bet_issue: issue,
          order_detail: JSON.stringify(this.selectList3),
          play_bet_follow_user: this.orderMode,
          is_bl_play: 1,
        };
        // let shareObj = {
        //     lottery_cid:this.lotteryValue,
        //     play_bet_lottery_id:this.currId,
        //     play_bet_issue:issue,
        //     order_detail:this.selectList3,
        //     is_bl_play:1
        // }
        this.shareObj = {
          lottery_cid: this.lotteryValue,
          play_bet_lottery_id: this.currId,
          play_bet_issue: issue,
          order_detail: this.selectList3,
          is_bl_play: 1,
        };
        this.$http
          .post("/forum/guess/play_bet", { datas: this.encrypt(dataObj) })
          .then((res) => {
            this.btnLoading = false;
            this.tipsTC = false;
            //下注成功
            if (res.data.code == 1) {
              this.isMess = false;
              this.clearSelectList();
              //更新钻石
              // this.zsQuest();
              if (this.userType == 1) {
                this.sheraFa = true;
                // $myConfirm.myConfirm({
                //     type:'',
                //     msg:'投注成功',
                //     closeIsShow:false,
                //     isRound:true,
                //     btn:{
                //         cancelText:'取消',
                //         cancelClass:'gray',
                //         confirmText:'分享方案',
                //         confirmClass:'red'
                //     }
                // }).then(() => {
                //     // //console.log('ok')
                //     this.isMess = false;
                //     this.clearSelectList();
                //     //去分享
                //     this.$emit('func',this.shareObj);

                // }).catch(() => {
                //     // //console.log('no')
                //     this.isMess = false;
                //     // this.isMess = true;
                //     this.clearSelectList();
                // });
              } else {
                this.dbtTxt = "投注成功";
                this.showDBT = true;
                //  $myConfirm.myConfirm({
                //     type:'',
                //     msg:'投注成功',
                //     closeIsShow:false,
                //     isRound:true,
                //     btn:{
                //         confirmText:'确定',
                //         confirmClass:'red'
                //     }
                // }).then(() => {
                //    this.isMess = false;
                //     this.clearSelectList();

                // }).catch(() => {
                //     this.clearSelectList();
                // });
              }
            } else if (res.data.code == 1012) {
              this.showSBT = true;
              // $myConfirm.myConfirm({
              //     type:'',
              //     msg:'您的余额不足请充值',
              //     closeIsShow:false,
              //     isRound:true,
              //     btn:{
              //         cancelText:'取消',
              //         cancelClass:'yebzCancel',
              //         confirmText:'去充值',
              //         confirmClass:'yebzConfirm'
              //     }
              // }).then(() => {
              //     this.isRecharge = true;

              // }).catch(() => {

              // });
            } else if (res.data.code == 16) {
              this.dbtTxt = "已封盘请购买下一期";
              this.showDBT = true;
              // $myConfirm.myConfirm({
              //     type:'',
              //     msg:'已封盘请购买下一期',
              //     closeIsShow:false,
              //     isRound:false,
              //     btn:{
              //         confirmText:'确定',
              //         confirmClass:'orging'
              //     }
              // }).then(() => {
              //     this.clearSelectList();

              // }).catch(() => {
              //     this.clearSelectList();
              // });
            } else {
              this.dbtTxt = res.data.msg;
              this.showDBT = true;
              //  $myConfirm.myConfirm({
              //         type:'',
              //         msg:res.data.msg,
              //         closeIsShow:false,
              //         isRound:true,
              //         btn:{
              //             confirmText:'确定',
              //             confirmClass:'red'
              //         }
              //     }).then(() => {
              //         // this.isMess = false;
              //         // this.clearSelectList();

              //     }).catch(() => {

              //     });
            }
          });
      }
    },
    fixRoomId() {
      let game = this.allLottery;
      for (let j = 0, lenj = game.length; j < lenj; j++) {
        if (this.lotteryId == game[j].lottery_id) {
          this.lotteryValue = game[j].cname;
          // this.logoUrl = game[j].logo_url;
          this.currId = this.lotteryId;
        }
      }
    },
  },
  watch: {
    musicState: function (v) {
      this.SETISMUSIC(v);
    },
    "currBallDel.issue": function (v, c) {
      //监测开奖期数
      if (v - c != 1) {
        return;
      }
      if (this.musicState) {
        let Music = document.getElementById("lotteryMusic");
        if (Music != null) {
          Music.play();
        }
      }
    },
    //  jcType:function(i){
    //    if(i){
    //        this.jcTypeName='金额';
    //        this.jcPlaceholder="请输入金额";
    //        this.chipsJE = 1;
    //    }else{
    //        this.jcTypeName='钻石';
    //        this.jcPlaceholder="请输入钻石";
    //        this.chipsJE = 10;
    //    }
    // },
    chipsJE: function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let num;
          let i = n.toString();
          // //console.log(this.zsMount.toString().length)
          this.chipsJE = i.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
          // if(this.chipsJE > this.zsMount){
          //     this.chipsJE = this.chipsJE.substring(0,this.zsMount.toString().length);
          // }
          this.selectDiamond = this.chipsJE * this.selectNum;
          this.selectList3.forEach((value, index) => {
            value["play_bet_sum"] = this.chipsJE;
          });

          if (
            i != 10 &&
            i != 20 &&
            i != 50 &&
            i != 100 &&
            i != 200 &&
            i != 500 &&
            i != 1000 &&
            i != 5000 &&
            i != 10000 &&
            i != 50000 &&
            i != 100000
          ) {
            this.chipsIndex = -1;
          }
          if (this.jcType) {
            num = 1;
          } else {
            num = 10;
          }
          if (i < num) {
            this.showTips("请输入≥10的整数");
            // $myConfirm.myPrompt({
            //     type:'',
            //     msg: '请输入≥10的整数',
            //     closeIsShow:false,
            //     btn:{
            //         cancelText:'',
            //         cancelClass:'',
            //         confirmText:'',
            //         confirmClass:''
            //     }
            // })
            //this.$vux.toast.text('请输入≥10的整数', 'middle');
          }
          if (i > 999999999) {
            this.chipsJE = this.chipsJE.substring(0, 9);
            //this.$vux.toast.text('请输入小于999999999的整数', 'middle');
            // $myConfirm.myPrompt({
            //     type:'',
            //     msg: '请输入小于999999999的整数',
            //     closeIsShow:false,
            //     btn:{
            //         cancelText:'',
            //         cancelClass:'',
            //         confirmText:'',
            //         confirmClass:''
            //     }
            // })
            this.showTips("请输入小于999999999的整数");
          }
          // i = i - 0;
        });
      }
    },
    selectList3: {
      handler: function (newValue, oldValue) {
        let totalNum = 0;
        for (let i = 0, len = newValue.length; i < len; i++) {
          // newValue[i].play_bet_sum = (newValue[i].play_bet_sum) - 0;
          totalNum += newValue[i].play_bet_sum - 0;
          let n = newValue[i].play_bet_sum.toString();
          newValue[i].play_bet_sum = n
            .replace(/[^\d]/g, "")
            .replace(/^0{1,}/g, "");
        }
        this.totalNum = totalNum;
      },
      deep: true,
    },
    wfIndex(n, o) {
      if (n != o && this.palyUnitName != "快捷") {
        this.clearSelectList();
      }
      if (this.palyUnitName == "快捷") {
        if (this.selectList2.length && this.kjNum.length) this.chouma = true;
        else this.chouma = false;
        //this.doKj();
        this.selectNum = this.selectList2.length * this.kjNum.length;
        this.selectDiamond = this.chipsJE * this.selectNum;
      }
    },
    kjNum: function () {
      if (this.selectList2.length && this.kjNum.length) this.chouma = true;
      else this.chouma = false;
      // this.doKj();
      let allActive = document.querySelectorAll(".kj-item-list span.active");
      if (!this.kjNum.length) {
        this.selectList2 = [];
        removeAllactive(allActive);
      }
      this.selectNum = this.selectList2.length * this.kjNum.length;
      this.selectDiamond = this.chipsJE * this.selectNum;
    },
  },
  components: {
    TzRecord,
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
    followOrders: {
      type: Object,
      default: {},
    },
    isFollowOrder: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
.quiz-box {
  width: 420px;
  background: #fff;
  position: relative;
  .lottery-box {
    height: 95px;
    .lottery-type {
      width: 120px;
      line-height: 38px;
      font-size: 12px;
      color: #333;
      text-align: center;
      border-right: 1px solid #f4f5f8;
      border-bottom: 1px solid #f4f5f8;
      position: relative;
      span {
        cursor: pointer;
      }
      .lottery-list {
        width: 120px;
        background: #fff;
        border: 1px solid #eee;
        border-left: none;
        position: absolute;
        top: 38px;
        z-index: 99;
        li {
          line-height: 25px;
          text-align: center;
          cursor: pointer;
          &:hover {
            color: #eb3b3c;
          }
        }
      }
    }
    .curr-period {
      width: 120px;
      line-height: 55px;
      font-size: 15px;
      color: #eb3b3c;
      text-align: center;
      border-right: 1px solid #f4f5f8;
    }
    .draw-time {
      width: 300px;
      line-height: 38px;
      font-size: 12px;
      color: #333;
      border-bottom: 1px solid #f4f5f8;
      padding-left: 8px;
      overflow: hidden;
      .fp,
      .kj {
        font-size: 12px;
        color: #999;
        margin-left: 5px;
        strong {
          color: #333;
        }
      }
      .lottery-music {
        display: inline-block;
        width: 17px;
        height: 16px;
        background: url("../assets/imgaes/jingcai/open-music.png") no-repeat;
        background-size: 100% 100%;
        float: right;
        margin: 10px 5px 0 8px;
      }
      .close-music {
        background: url("../assets/imgaes/jingcai/close-music.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .lott-num {
      width: 300px;
      height: 55px;
      overflow: hidden;
      span {
        width: 21px;
        height: 21px;
        line-height: 21px;
        color: #fff;
        text-align: center;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        margin: 17px 0 0 8px;
        float: left;
        &.xgsc {
          &:nth-last-child(1) {
            margin: 17px 0 0 31px;
            position: relative;
            &:before {
              content: "";
              width: 21px;
              height: 21px;
              position: absolute;
              left: -26px;
              top: 3px;
              background: url("../assets/imgaes/openLottery/cz.png") no-repeat;
              background-size: contain;
            }
          }
        }
        &.cqsc {
          width: 40px;
          height: 40px;
          line-height: 40px;
          font-size: 24px;
          color: #fff;
          text-align: center;
          background: linear-gradient(
            0deg,
            rgba(49, 118, 246, 1),
            rgba(136, 207, 250, 1)
          );
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          margin: 7px 0 0 17px;
          float: left;
        }
        &.fc-bgColor {
          background: linear-gradient(180deg, #db2525, #ff5c5c) !important;
          margin-top: 15px;
          margin-left: 55px;
        }
      }
    }
  }
  .tab-title {
    height: 42px;
    border-bottom: 1px solid #f4f5f8;
    overflow: hidden;
    > span {
      width: 50%;
      line-height: 42px;
      font-size: 14px;
      color: #333;
      text-align: center;
      float: left;
      border-top: 1px solid #f4f5f8;
      background: #eaeaea;
      cursor: pointer;
      &.active {
        color: #eb3b3c;
        background: #fff;
      }
    }
  }
  .left-nav {
    width: 99px;
    font-size: 15px;
    color: #333;
    padding-top: 18px;
    > span {
      display: block;
      cursor: pointer;
      padding-left: 7px;
      padding-bottom: 25px;
      &:before {
        display: inline-block;
        content: "";
        width: 10px;
        height: 10px;
        border: 2px solid #333;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        margin-right: 7px;
      }
      &.active {
        color: #eb3b3c;
        &:before {
          border: 2px solid #eb3b3c;
        }
      }
    }
  }
  .right-box {
    width: 320px;
    padding-top: 7px;
    border-left: 1px solid #f4f5f8;
    dt {
      &.dt-title {
        font-size: 12px;
        color: #333;
        text-align: center;
        padding: 7px 0 20px;
      }
      &.dmLmDn {
        overflow: hidden;
        margin: 19px 0 19px;
        padding-bottom: 0 !important;
        span {
          min-width: 54px;
          font-size: 12px;
          color: #333;
          text-align: center;
          border: 1px solid #cecece;
          padding: 3px 7px;
          margin-left: 7px;
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          border-radius: 15px;
          cursor: pointer;
          float: left;
          &:first-of-type {
            margin-left: 10px;
          }
          &.active {
            color: #fff;
            background: rgba(239, 128, 110, 1);
            border: 1px solid rgba(239, 128, 110, 1);
            box-shadow: 1px 4px 8px 0px rgba(235, 94, 73, 0.3);
          }
        }
        &::-webkit-scrollbar {
          /*滚动条整体样式*/
          width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background: rgba(0, 0, 0, 0.2);
        }
        &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 0;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
    .fc3D-bw,
    .fc3D-bw2 {
      text-align: center;
      width: 100%;
      height: 27px;
      background: #f5f7fa;
      margin-bottom: 10px;
      overflow: hidden;
      span {
        display: block;
        width: 33%;
        line-height: 27px;
        font-size: 13px;
        float: left;
        border-right: 1px #eee solid;
        &:nth-last-child(1) {
          border-right: none;
        }
      }
    }
    .fc3D-bw2 {
      span {
        display: inline-block;
        width: 50% !important;
      }
    }
    .floor {
      .pvl-box {
        width: 100%;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: red;
      }
      .item {
        overflow: hidden;
        &.w16 {
          > span {
            width: 16%;
          }
        }
        &.w20 {
          > span {
            width: 20.9%;
            height: 45px;
            padding-top: 7px;
          }
        }
        &.w25 {
          > span {
            width: 26%;
            height: 48.7px;
            padding-top: 5px;
            margin-left: 17px;
          }
        }
        &.w41 {
          > span {
            width: 41.25%;
            height: 37px;
            margin-left: 17px;
          }
        }
        &.w50 {
          > span {
            width: 41.25%;
            height: 48.7px;
            margin-left: 17px;
          }
        }
        > span {
          /*width: 54px;*/
          height: 40px;
          text-align: center;
          float: left;
          border: 1px solid #cecece;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          margin-left: 10px;
          margin-bottom: 12px;
          padding-top: 2px;
          cursor: pointer;
          > strong {
            display: block;
            font-weight: normal;
            color: #999;
          }
          &.active {
            color: #fff;
            background: rgba(239, 128, 110, 1);
            border: 1px solid rgba(239, 128, 110, 1);
            box-shadow: 1px 4px 8px 0px rgba(235, 94, 73, 0.3);
            > strong {
              color: #fff;
            }
          }
        }
      }
    }
    .kuaijie {
      .kj-tab {
        overflow: hidden;
        padding: 19px 0 20px;
        > span {
          width: 54px;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          color: #333;
          text-align: center;
          border: 1px solid #cecece;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
          float: left;
          margin: 0 0 12px 9px;
          cursor: pointer;
          &.active {
            color: #fff;
            background: rgba(239, 128, 110, 1);
            border: 1px solid rgba(239, 128, 110, 1);
            box-shadow: 1px 4px 8px 0px rgba(235, 94, 73, 0.3);
          }
        }
      }
      .kj-itme {
        > span {
          width: 136px;
          height: 58px;
          line-height: 58px;
          font-size: 16px;
          color: #333;
          text-align: center;
          border: 1px solid #cecece;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          float: left;
          margin-left: 15px;
          margin-bottom: 9px;
        }
      }
      .kuaijie-content {
        width: 46% !important;
        height: 56px !important;
        line-height: 56px !important;
        // color: #333!important;
        font-size: 16px !important;
      }
    }
    .fc3D-bw-list {
      &.w50 {
        width: 50%;
        span {
          width: 90%;
        }
      }
      &.w33 {
        width: 33.333%;
        span {
          width: 90%;
          height: 48.7px;
        }
      }
      .item {
        span {
          padding-top: 14px;
          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: rgb(255, 255, 255);
            background: linear-gradient(
              0deg,
              rgb(136, 207, 250),
              rgb(49, 118, 246)
            );
            border-radius: 50%;
          }
          &.active {
            i {
              background: linear-gradient(180deg, #ff3131, #ff8188);
            }
          }
        }
      }
    }
  }
  .tz-footer {
    clear: both;
    border-top: 1px solid #f4f5f8;
    .kx-money {
      height: 92px;
      font-size: 12px;
      color: #333;
      margin-top: 10px;
      padding-left: 5px;
      margin-bottom: 10px;
      position: relative;
      .kx-fl {
        width: 26px;
        padding-top: 24px;
      }
      .kx-list {
        width: 380px;
        height: 85px;
        overflow-x: scroll;
        float: left;
        position: absolute;
        left: 36px;
        ul {
          width: 200%;
          li {
            width: 64px;
            height: 64px;
            cursor: pointer;
            float: left;
            margin: 10px 1px 1px 0;
            &:nth-of-type(1) {
              background: url("../assets/imgaes/jingcai/10@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(2) {
              background: url("../assets/imgaes/jingcai/20@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(3) {
              background: url("../assets/imgaes/jingcai/50@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(4) {
              background: url("../assets/imgaes/jingcai/100@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(5) {
              background: url("../assets/imgaes/jingcai/200@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(6) {
              background: url("../assets/imgaes/jingcai/500@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(7) {
              background: url("../assets/imgaes/jingcai/1000@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(8) {
              background: url("../assets/imgaes/jingcai/5000@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(9) {
              background: url("../assets/imgaes/jingcai/10000@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(10) {
              background: url("../assets/imgaes/jingcai/50000@2x.png") no-repeat
                center;
              background-size: 100% 100%;
            }
            &:nth-of-type(11) {
              background: url("../assets/imgaes/jingcai/100000@2x.png")
                no-repeat center;
              background-size: 100% 100%;
            }
            &.active {
              &:before {
                display: block;
                content: url("../assets/imgaes/jingcai/miaobian@2x.png");
                width: 69px;
                height: 69px;
              }
            }
          }
        }
        /*滚动条样式*/
        &::-webkit-scrollbar {
          width: 2px;
          height: 6px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          background-color: rgba(144, 147, 153, 0.3);
        }
        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          background-color: rgba(144, 147, 153, 0.1);
        }
      }
      .je-item {
        width: 58px;
        height: 62px;
        line-height: 62px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        margin-left: 5px;
        float: left;
      }
    }
    .qt-money {
      line-height: 36px;
      font-size: 16px;
      color: #333;
      padding-left: 5px;
      input {
        width: 140px;
        height: 36px;
        line-height: 30px;
        background: #e5e5e6;
        padding: 3px 10px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        margin-right: 18px;
      }
      .red {
        font-weight: normal;
        font-size: 24px;
        color: #ed5c44;
      }
      .qt-icon {
        margin-top: -8px;
      }
    }
    .btn-group {
      text-align: center;
      padding-top: 36px;
      padding-bottom: 28px;
      button {
        width: 120px;
        height: 40px;
        font-size: 18px;
        color: #fff;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        &.btn-reset {
          background: linear-gradient(
            0deg,
            rgba(49, 118, 246, 1),
            rgba(136, 207, 250, 1)
          );
          box-shadow: 1px 4px 8px 0px rgba(75, 165, 245, 0.61);
        }
        &.btn-submit {
          margin-left: 60px;
          background: linear-gradient(
            0deg,
            rgba(235, 64, 60, 1),
            rgba(244, 188, 98, 1)
          );
          box-shadow: 1px 4px 8px 0px rgba(235, 94, 73, 0.61);
        }
      }
    }
  }
  .jc-type {
    display: flex;
    float: right;
    margin: 10px 20px;
    > div {
      cursor: pointer;
      margin-left: 12px;
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url("../assets/imgaes/yejc_icon.png") no-repeat;
        float: left;
        margin-top: 2px;
        margin-right: 4px;
      }
    }
    .active {
      color: rgba(235, 64, 60, 1);
      i {
        background: url("../assets/imgaes/zsjc_icon.png") no-repeat;
      }
    }
  }
  .pop-laye {
    width: 100%;
    height: 100%;
    background: url("../assets/imgaes/jingcai/pop_bg.png") repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    .pop-box {
      width: 100%;
      min-height: 374px;
      background: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      .title {
        width: 100%;
        height: 54px;
        line-height: 54px;
        font-size: 17px;
        color: #fff;
        text-align: center;
        background: linear-gradient(
          0deg,
          rgba(254, 38, 47, 1, rgba(253, 186, 78, 1))
        );
        box-shadow: 1px 4px 8px 0px rgba(253, 82, 61, 0.61);
        .pop-close {
          float: right;
          margin: 20px 20px 0 0;
        }
      }
      .form {
        height: 252px;
        overflow-y: auto;
      }
      .table {
        width: 100%;
        tr {
          height: 37px;
          line-height: 37px;
          font-size: 14px;
          color: #333;
          border-bottom: 1px solid #ccc;
          &.table-title {
            height: 45px;
            line-height: 45px;
            font-size: 17px;
          }
          td {
            width: 25%;
            text-align: center;
            &.td-money {
              width: 30%;
              text-align: right;
              padding-right: 5px;
              .td-sum {
                input {
                  width: 50px;
                  height: 25px;
                  font-size: 14px;
                  color: #ff3333;
                  text-align: center;
                  background: #f4f5f8;
                  border: 1px solid #cecece;
                  -webkit-border-radius: 4px;
                  -moz-border-radius: 4px;
                  border-radius: 4px;
                  margin-right: 10px;
                }
              }
              .delete {
                cursor: pointer;
              }
            }
          }
        }
      }
      .pop-footer {
        width: 100%;
        height: 76px;
        border-top: 1px solid #f4f5f8;
        padding: 18px 14px 0 18px;
        .total {
          line-height: 40px;
          font-size: 16px;
          color: #333;
          .red {
            font-size: 24px;
            color: #ff4f38;
            margin: 0 14px 0 18px;
          }
          .qt-icon {
            margin-top: -8px;
          }
        }
        .pop-submit {
          width: 90px;
          height: 40px;
          font-size: 18px;
          color: #f4f5f8;
          margin-right: 14px;
          cursor: pointer;
          background: linear-gradient(
            0deg,
            rgba(235, 64, 60, 1),
            rgba(244, 188, 98, 1)
          );
          box-shadow: 1px 4px 8px 0px rgba(235, 94, 73, 0.61);
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
      }
    }
  }
}
.yebzCancel {
  width: 90px !important;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 14px;
  color: #999;
  background: #cac9c9 !important;
  box-shadow: 1px 4px 8px 0px rgba(202, 201, 201, 0.61) !important;
  // border-radius:4px !important;
  // margin: 10px 16px 20px 0 !important;
}
.yebzConfirm {
  width: 90px !important;
  height: 40px !important;
  line-height: 40px !important;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(
    0deg,
    rgba(255, 37, 47, 1),
    rgba(254, 186, 78, 1)
  ) !important;
  box-shadow: 1px 4px 8px 0px rgba(202, 201, 201, 0.61) !important;
  // border-radius:4px !important;
  margin-bottom: 16px !important;
}

.mb16 {
  margin-bottom: 16px !important;
}
.tzTC-box {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  // opacity: .5;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  .tcBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 220px;
    width: 250px;
    min-height: 160px;
    // vertical-align: middle;
    border-radius: 8px;
    background: #fff;
    // -webkit-backface-visibility: hidden;
    // backface-visibility: hidden;
    // padding-bottom: 10px;
    text-align: center;
    // margin-top: 60%;
    p {
      padding-bottom: 15px;
      padding-top: 30px;
      line-height: 25px;
      font-size: 18px;
    }
    > div {
      width: 80%;
      margin: 10px auto;
      div {
        border-radius: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>