<template>
  <div id="lotteryGame">
    <div class="header-tab clearfix" :class="[{'pink-bg-dark':skin==1},{'blue-bg-dark':skin==2},{'green-bg-dark':skin==3}]">
      <div class="main">
        <div class="clearfix fl">
          <!-- <span
            class="item fl"
            :class="item.lottery_id == lotteryId ? 'is-active' : ''"
            @click="changeLottery(index, item)"
            v-for="(item, index) in allLottery"
            :key="item.lottery_id"
            v-if="index<6"
            >{{ item.vname }}</span
          > -->
          <p class="curr-lotteryName">{{currLotteryName}}</p>
          <p  class="more-lottery-select" @click="showAllLottery= true">Sảnh trò chơi <i></i></p>
          <p v-if="history.length" class="curr-open-number"><i v-for="v,index in history[historyVal].grandprize[0].split('')" :key="index">{{v}}</i></p>
          <p v-if="history.length" class="curr-open-date">(Kết quả lượt xổ {{history[historyVal].belong_date}} )</p>

          <!-- <el-dropdown  class="fl " trigger="click" placement="top" v-if="allLottery.length>5">
                        <span class="el-dropdown-link" style="color:#fff">
                        more >>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="more-lottery">
                            <el-dropdown-item @click.native="changeLottery(index,v)"  :class="v.lottery_id==lotteryId?'is-active':''"   v-for="(v,index) in allLottery" :key="index" v-if="index>=6" :data-id="v.lottery_id">{{v.vname}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
        </div>
        <el-dropdown class="fr" trigger="click" placement="top" >
          <span class="el-dropdown-link">
            <i class="fl skin-icon"></i>
          </span>
          <el-dropdown-menu slot="dropdown" :class="[{'pink-dr-bg':skin==1},{'blue-dr-bg':skin==2},{'green-dr-bg':skin==3}]">
            <el-dropdown-item
            
              v-for="(v, index) in skinList"
              :key="index"
              @click.native="changeColor(v.color)"
              >{{ v.name }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <i class="fr chat-icon" @click="toShowChat()"></i>
        <i class="fr rule-icon" @click="goGameRule()"></i>
        <i
          class="fr"
          :class="{
            'music-icon-close': musicState,
            'music-icon-open': !musicState,
          }"
          @click="musicState = !musicState"
        ></i>
      </div>
    </div>
    <div class="play-tab" :class="[{'pink-tab':skin==1},{'blue-tab':skin==2},{'green-tab':skin==3}]">
      <span
        :class="{ active: playGroupCode == v.code }"
        @click="changeTab(index, v)"
        v-for="(v, index) in palyUnit"
        :key="index"
        >{{ v.name }}</span
      >
      <span class="gz-item" @click="dialogVisible4=true">
        <img src="../../assets/imgaes/game/gz_icon.png" alt="" srcset="">
        Cách chơi
      </span>
    </div>
    <div class="play-content clearfix" :class="[{'pink-content':skin==1},{'blue-content':skin==2},{'green-content':skin==3}]">
      <!-- 左侧 -->
      <div class="play-tool fl">
        <div class="tool-info">
          <div class="tool-btn">Thông tin tài khoản</div>
          <div class="info-mx">
            <span>Số tài khoản: {{ userinfo.mobile }}</span>
            <span
              >Tài khoản: <strong>{{ yuMoney.balance }}</strong></span
            >
            <span
              >Lệnh chưa thanh toán:
              <strong>{{ yuMoney.notsettled }}</strong></span
            >
            <i class="icon-refresh" @click="getBalance"></i>
          </div>
        </div>
        <div class="jieS clearfix">
          <span class="tool-btn fl" @click="openWJS()"
            >Chi tiết chưa tổng kết</span
          >
          <span class="tool-btn fr" @click="openYJS()"
            >Đã tổng kết hôm nay</span
          >
        </div>
        <div class="kefu-btn tool-btn" @click="goOnline">
          <a target="_blank"><i class="icon-service"></i>Liên lạc với khách hàng</a>
        </div>
        <div class="app-btn tool-btn" ><a target="_blank"  @click="$router.push('/appDownload')">Tải APP</a></div>
        <div class="bet-details">
          <div
            class="tool-btn"
            style="padding-left: 20px"
            @click="zhuDbox = !zhuDbox"
          >
            Đặt cược kỳ này<i
              style="padding-left: 10px"
              :class="
                zhuDbox == true ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
              "
            ></i>
          </div>
          <el-scrollbar style="height: 150px" v-show="zhuDbox">
            <div class="bet-mx" v-if="selectList4.length">
              <div v-for="(v, index) in selectList4" :key="index">
                <span
                  >Ngày tháng：<i class="z-blue">{{ v.issue }}</i></span
                >
                <span
                  >Số：<i class="z-blue"
                    >{{ v.play_code }} - {{ v.item_code }}</i
                  ></span
                >
                <span
                  >Tiền：<i class="z-orange">{{ v.amount }}</i></span
                >
                <span>Tổng：<i class="z-orange">1 lượt </i></span>
                <span
                  >Tiền thắng /1 lần：<i class="z-orange">{{
                    v.possible_prize
                  }}</i></span
                >
                <div :id="'order' + index" style="display: none">
                  <p>
                    Ngày tháng：<i class="z-blue">{{ v.issue }}</i>
                  </p>
                  <p>
                    Số：<i class="z-blue"
                      >{{ v.item_code }} - {{ v.item_code }}</i
                    >
                  </p>
                  <p>
                    Tiền：<i class="z-orange">{{ v.amount }}</i>
                  </p>
                  <p>Tổng：<i class="z-orange">1 lượt </i></p>
                  <p>
                    Tiền thắng /1 lần：<i class="z-orange">{{
                      v.possible_prize
                    }}</i>
                  </p>
                </div>
                <span class="print" @click="printpage('order' + index)"
                  >In</span
                >
              </div>
            </div>
            <p v-else class="no-bet">Không có dữ liệu</p>
          </el-scrollbar>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="play-tzMain fl clearfix">
        <div class="tz-content fl" v-show="tzBox" v-loading="loading">
          <div v-if="!loading">
            <div class="play-timer clearfix">
              <div class="fl">
                <span>Xổ số Bắc Việt</span>
                <span
                  >Thắng thua trong ngày:
                  <span class="djs-box" style="color: #fd3318">{{
                    yuMoney.today_winorlose
                  }}</span></span
                >
              </div>
              <div class="fr">
                <span class="djs-box" style="color: #555">{{
                  history[0].next_issue
                }}</span>
                <span> Thời gian kết thúc đặt cược:</span>
                <span class="djs-box" style="color: #fd3318">{{
                  djstime1
                }}</span>
                <span>Thời gian bắt đầu kỳ sau:</span>
                <span class="djs-box" style="color: #26baf8">{{
                  djstime2
                }}</span>
              </div>
            </div>
            <el-scrollbar style="width:100%">
              <div class="bet-method clearfix">
                <ul class="tab-left fl" v-if="playGroupCode!='interest'">
                  <li
                    v-for="(item, index) in palyListData"
                    :class="{ active: palyListCodeNum == index }"
                    @click="
                      palyListCode = item.code;
                      palyListCodeNum = index;
                    "
                    :key="item.code"
                  >
                    {{ item.name }}
                  </li>
                </ul>
                <ul class="tab-left fl" v-else>
                  <li class="active">
                     Lô 2 Số Giải ĐB 
                  </li>
                </ul>
                <ul class="game-tabs fr" v-if="palyListData[palyListCodeNum].field_modes.length>1">
                  <!-- <li :class="{'active':typeNumId == 1}" @click="typeNum(1)">Chọn số</li>
                                <li :class="{'active':typeNumId == 2}" @click="typeNum(2)">Nhập số</li>
                                <li v-if="palyListCode!='h4bd'" :class="{'active':typeNumId == 3}" @click="typeNum(3)">Chọn Số Nhanh</li> -->
                  <li
                    v-if="palyListData[palyListCodeNum].field_modes"
                    v-for="(item, index) in palyListData[palyListCodeNum]
                      .field_modes"
                    :class="{ active: typeNumId == item.code }"
                    @click="typeNumId = item.code"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>
              <div class="play-number" v-if="typeNumId == 'duplex'">
                <dl
                  v-if="palyListData[palyListCodeNum].field_def"
                  v-for="(item, index) in palyListData[palyListCodeNum]
                    .field_def"
                  :key="index"
                >
                  <dt :class="{ fl: true, active: isClass(index) }">
                    {{ item.prompt }}
                  </dt>
                  <dd class="num fl">
                    <span
                      v-for="(i2, d2) in item.nums"
                      @click="selectClick($event, i2.code, index)"
                      :key="i2.code"
                      :data-code="i2.code"
                      >{{ i2.name }}</span
                    >
                  </dd>
                  <dd class="options fr" v-if="item.prompt">
                    <span
                      v-for="(i3, d3) in chooseArr"
                      :key="d3"
                      @click="chooseNum($event, i3.type, index)"
                      :class="{ active: chooseType[index] == i3.type }"
                      >{{ i3.name }}</span
                    >

                    <span @click="chooseNum($event, 'none', index)">Xóa</span>
                  </dd>
                </dl>
              </div>
              <div class="play-textarea" v-if="typeNumId == 'single'">
                <!-- <p>{{zhudanNum}}</p> -->
                <el-input
                  v-if="playGroupCode != 'lose' && playGroupCode != 'combo'"
                  ref="playTextarea"
                  type="textarea"
                  resize="none"
                  v-model="textareaVal"
                  @focus="textareaFocus($event)"
                  @blur="textareaBlur($event)"
                  :placeholder="palyListData[palyListCodeNum].field_desc"
                >
                </el-input>
                <el-input
                  v-else
                  ref="playTextarea"
                  type="textarea"
                  resize="none"
                  v-model="textareaValToo"
                  @focus="textareaFocus($event)"
                  @blur="textareaBlur($event)"
                  :placeholder="palyListData[palyListCodeNum].field_desc"
                >
                </el-input>
                <!-- <textarea id='numInput' v-model="textarea" style="width:99%;padding:15px" name="" cols="30" rows="10" resize="none" @focus="textareaFocus($event)"
                                @blur="textareaBlur($event)"></textarea> -->
              </div>
              <div v-if="typeNumId == 'direct'">
                <div
                  class="play-number"
                  v-if="
                   playGroupCode=='headntail'
                  "
                >
                  <dl
                    v-for="(item, index) in palyListData[palyListCodeNum]
                      .field_def"
                    :key="index"
                   
                  >
                   <!-- class="interest" -->
                    <dt
                      :class="{ fl: true, active: isClass(index) }"
                    >
                      {{ palyListData[palyListCodeNum].name }}
                    </dt>
                    <dd class="num fl">
                      <span
                        v-for="(i2, d2) in item.nums"
                        @click="selectClick($event, i2.code, index)"
                        :key="i2.code"
                        :data-code="i2.code"
                      >
                        {{ i2.name }}
                        <!-- <p>{{ prizeItem(i2.code) }}</p> -->
                      </span>
                    </dd>
                    <dd class="options fr" >
                      <span
                        v-for="(i3, d3) in chooseArr"
                        :key="d3"
                        @click="chooseNum($event, i3.type, index)"
                        :class="{ active: chooseType[index] == i3.type }"
                        >{{ i3.name }}</span
                      >

                      <span @click="chooseNum($event, 'none', index)">Xóa</span>
                    </dd>
                  </dl>
                </div>
                   <div
                  class="play-number"
                  v-if="
                   playGroupCode=='interest'
                  "
                >
                <h4 style="margin-top: 24px;">Lớn Nhỏ Chẵn Lẻ</h4>
                  <dl
                    v-for="(item, index) in palyListData[0]
                      .field_def"
                    :key="index"
                   class="interest"
                  >
                  
                    <dd class="num fl">
                      <span
                        v-for="(i2, d2) in item.nums"
                        @click="selectClick($event, i2.code, 0)"
                        :key="i2.code"
                        :data-code="i2.code"
                      >
                        {{ i2.name }}
                        <p>{{ prizeItem(i2.code,0) }}</p>
                      </span>
                    </dd>
                   
                  </dl>
                  <h4>Tổng Giá Trị</h4>
                  <dl
                    v-for="(item, index) in palyListData[1]
                      .field_def"
                    :key="index+'c'"
                   class="interest"
                   style="background:#fff"
                  >
                  
                    <dd class="num fl">
                      <span
                        v-for="(i2, d2) in item.nums"
                        @click="selectClick($event, i2.code, 1)"
                        :key="i2.code+'c'"
                        :data-code="i2.code"
                      >
                        {{ i2.name }}
                        <p>{{ prizeItem(i2.code,1) }}</p>
                      </span>
                    </dd>
                   
                  </dl>
                </div>
                <div class="play-quick clearfix" v-if="playGroupCode!='headntail'&&playGroupCode!='interest'">
                 
                  <div
                    class="quick-select"
                    v-if="playGroupCode != 'lose' && playGroupCode != 'combo'"
                  >
                   <div class="rule-num" v-if="palyListData[palyListCodeNum].field_rule == '00-99'">
                  <span>00-99</span>
                  <i>{{this.directArr.length}}</i>
                  </div>
                  <div class="rule-num" v-if="palyListData[palyListCodeNum].field_rule == '000-999'" @click="dialogVisible3=true">
                  <span>{{ruleList[ruleListIndex].name}}</span>
                  <i>{{this.directArr.length}}</i>
                  </div>
                    <dl>
                      <dt class="title">Ngẫu Nhiên</dt>
                      <dd class="title-group">
                        <span
                          :class="{ active: quickId1 == i }"
                          v-for="(i, d) in quickNums"
                          @click="
                            quickId2 = 'clear';
                            quickId4='clear';
                            quickId1 == i ? (quickId1 = 0) : (quickId1 = i);
                          "
                          >{{ i }}số</span
                        >
                      </dd>
                    </dl>
                    <dl v-if="palyListData[palyListCodeNum].field_rule == '00-99'">
                      <dt class="title">Gợi Ý</dt>
                      <dd class="title-group">
                        <span
                          :class="{ active: quickId2 == i }"
                          v-for="(i, d) in [
                            'Képbằng',
                            'Chẵn',
                            'Lẻ',
                            'Tài',
                            'Xỉu',
                          ]"
                          @click="
                            quickId1 = 0;
                            quickId2 == i ? (quickId2 = 0) : (quickId2 = i);
                          "
                          >{{ i }}</span
                        >
                      </dd>
                    </dl>
                     <dl v-else>
                      <dt class="title">Gợi Ý</dt>
                      <dd class="title-group">
                        <span :class="{active:quickId4==1}" @click="quickId4==1?quickId4=0:quickId4=1;quickId1 = 0;">Képbằng</span>
                         
                        
                      </dd>
                    </dl>
                  </div>
                  <div class="quick-select" v-else>
                     <div class="rule-num" v-if="palyListData[palyListCodeNum].field_rule == '00-99'">
                  <span>00-99</span>
                  <i>{{this.directArr.length/palyListData[palyListCodeNum].field_def[0].max_selected==1?1:0}}</i>
                  </div>
                    <dl>
                      <dt class="title">Ngẫu Nhiên</dt>
                      <dd class="title-group">
                        <span
                          :class="{ active: quickId3 == i }"
                          v-for="(i, d) in [1]"
                          @click="
                            quickId3 == i ? (quickId3 = 0) : (quickId3 = i)
                          "
                          >{{ i }}số</span
                        >
                      </dd>
                    </dl>
                  </div>
                  <div
                    class="quick-num"
                    v-if="palyListData[palyListCodeNum].field_rule == '00-99'"
                  >
                   <!-- <div class="tips">
                    <span @click="dialogVisible5=true">Hướng dẫn</span>
                  </div> -->
                    <div
                      v-if="playGroupCode != 'lose' && playGroupCode != 'combo'"
                    >
                      <div
                        :class="{
                          item: true,
                          active:
                            directArr.findIndex((value) => value == d) > -1,
                        }"
                        v-for="(i, d) in 100"
                        @click="chooseDirect(d)"
                        :key="d"
                      >
                        <span>{{ (Array(2).join(0) + d).slice(-2) }}</span>
                      </div>
                    </div>
                    <div v-else>
                      <div
                        :class="{
                          item: true,
                          active:
                            directArr.findIndex((value) => value == d) > -1,
                          num_disable:
                            directArr.length ==
                              palyListCode.replace(/[^\d]/g, ' ') &&
                            directArr.findIndex((value) => value == d) < 0,
                        }"
                        v-for="(i, d) in 100"
                        @click="chooseDirect(d)"
                        :key="d"
                      >
                        <span>{{ (Array(2).join(0) + d).slice(-2) }}</span>
                        <!-- <i>10</i> -->
                      </div>
                    </div>
                  </div>
                  <div class="quick-num" v-else>
                  <!-- <div class="tips">
                   <span @click="dialogVisible5=true"> Hướng dẫn</span>
                  </div> -->
                    <div
                      :class="{
                        item: true,
                        active: directArr.findIndex((value) => value == d) > -1,
                      }"
                      v-for="(i, d) in 1000"
                      @click="chooseDirect(d)"
                      :key="d"
                      v-if="d>=ruleList[ruleListIndex].code[0]&&d<=ruleList[ruleListIndex].code[1]"
                      
                    >
                      <span>{{ (Array(3).join(0) + d).slice(-3) }}</span>
                      <!-- <i>10</i> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="bet-num">
                <span v-if="palyListData[palyListCodeNum].prize.length==1&&playGroupCode!='interest'" style="float: left;margin-top: 4px;margin-left: 22px;border: 1px dashed #ea524d;padding: 4px 6px;">Tỉ lệ cược : <strong style="color: #ea524d;font-weight: 700;font-style: oblique;">1</strong> ăn <strong ref="moneyBet" style="color: #ea524d;font-weight: 700;font-style: oblique;">{{palyListData[palyListCodeNum].prize[0].prize}}</strong></span>
                Số nhân :
                <el-input-number
                  v-model="multiplier"
                  @change="multiplierChange"
                  :min="1"
                  size="medium"
                  label=""
                  :step="1"
                ></el-input-number>
                <button class="btn" @click="submitPlay">Thêm số</button>
                <button class="btn orange" @click="clearActive">Xóa hết</button>
              </div>
              <!-- 下注提交  -->
              <div class="bets-box">
                <div class="bet-list clearfix">
                  <div class="table-title">Nội dung cược</div>
                  <div class="table-name item">
                    <span>Cách chơi</span>
                    <span>Số đặt cược</span>
                    <span>Số đơn cược</span>
                    <span>Cấp số nhân</span>
                    <span>Số tiền cược</span>
                    <span>Tiền thắng /1 lần</span>
                    <span>Thao tác</span>
                  </div>
                  <div class="table-content clearfix">
                    <el-scrollbar>
                      <div
                        class="item"
                        v-for="(item, index) in zhudanList"
                        :key="index"
                      >
                        <span>{{ item.play_name }}</span>
                        <span
                          style="
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                          :title="playFlname(item.item_code)"
                          >{{playFlname(item.item_code) }}</span
                        >
                        <span>{{ item.zdNums }}</span>
                        <span>{{ item.multiple }}</span>
                        <span style="color: #ff4646">{{
                          item.totalMoney
                        }} </span>
                        <span>{{ item.maxWin.toFixed(3) }}</span>
                        <span class="last" @click="zhudanList.splice(index, 1)"
                          >Xóa</span
                        >
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
                <div class="bet-btns" style="margin-top: 18px">
                  <div class="total">
                    Tổng số tiền : <span>{{ allMoney }}</span> VNDK
                  </div>
                  <div class="fr">
                    <button class="btn" @click="showDialog">Thêm số</button>
                    <button class="btn gray-blue" @click="zhudanList = []">
                      Xóa hết
                    </button>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <WJS v-if="WJSBox" class="fl tz-content"></WJS>
        <YJS v-if="YJSBox" class="fl tz-content"></YJS>
        <div class="game-history fr">
          <div class="history-title">{{currLotteryName}} Kết quả:</div>
          <div class="history-select">
            <el-select
              v-model="historyVal"
              placeholder="Mời chọn "
              popper-class="game-popper"
              @change="storyChange"
            >
              <el-option
                v-for="(item, index) in history"
                :key="item.belong_date"
                :label="item.belong_date+' / '+item.issue"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
          <el-scrollbar >
            <div class="history-box" v-if="history.length">
              <div class="cur-issue">
                Kết quả {{ history[historyVal].belong_date }} <span></span>
              </div>
              <ul class="hist-list hist-1">
                <li>
                  <div>Giải ĐB</div>
                  <div v-if="palyListCode!='q2bd'&&playGroupCode!='interest'&&playGroupCode!='sishu'&&palyListCode!='dg0h3'&&playGroupCode!='headntail'&&palyListCode!='dg0q2'&&palyListCode!='dg0h2'&&palyListCode!='dg0h2dg8'&&palyListCode!='dg0h3dg7'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-activeNum) }}<span >{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-activeNum,history[historyVal].grandprize[0].length)}}</span></div>
                  <div v-if="palyListCode=='q2bd'||palyListCode=='dg0q2'"><span >{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-3) }}</span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-3,history[historyVal].grandprize[0].length)}}</div>
                  <div  v-if="playGroupCode=='interest'||palyListCode=='dg0h2'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length)}}</span></div>
                   <div  v-if="playGroupCode=='sishu'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-4) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-4,history[historyVal].grandprize[0].length)}}</span></div>
                   <div  v-if="palyListCode=='dg0h3'||palyListCode=='dg0h3dg7'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-3) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-3,history[historyVal].grandprize[0].length)}}</span></div>
                    <div  v-if="palyListCode=='dg0d2'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-1) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-1,history[historyVal].grandprize[0].length)}}</span></div>
                     <div  v-if="palyListCode=='dg0h2dg8'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length)}}</span></div>
                     <div  v-if="palyListCode=='dg0d1'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length-1)}}</span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-1,history[historyVal].grandprize[0].length)}}</div>
                </li>
                <li>
                  <div>Giải nhất</div>
                  <!-- firstprize -->
                  <div  v-if="palyListCode!='q2bd'&&palyListCode!='dg1h3'&&palyListCode!='dg1h2'&&palyListCode!='dg1q2'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-activeNum) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-activeNum,history[historyVal].firstprize[0].length)}}</span></div>
                  <div  v-if="palyListCode=='q2bd'||palyListCode=='dg1q2'"><span>{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-3) }}</span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-3,history[historyVal].firstprize[0].length)}}</div>
                   <div  v-if="palyListCode=='dg1h3'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-3) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-3,history[historyVal].firstprize[0].length)}}</span></div>
                 
                     <div  v-if="palyListCode=='dg1h2'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-2) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-2,history[historyVal].firstprize[0].length)}}</span></div>
                  
                </li>
                <li>
                  <div>Giải nhì</div>
                  <div v-if="palyListCode!='q2bd'">
                    <p  style="display:inline-block;" v-for="v,index in history[historyVal].secondprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].secondprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-if="palyListCode=='q2bd'">
                    <p  style="display:inline-block;" v-for="v,index in history[historyVal].secondprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-3)}}</span>{{v.substring(v.length-3,v.length)}}<i v-if="index<history[historyVal].secondprize[0].split(',').length-1">-</i> </p>
                  </div>
                </li>
                <li>
                  <div>Giải ba</div>
                  <div v-if="palyListCode!='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].thirdprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].thirdprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].thirdprize[0] }}</p> -->
                  </div>
                   <div v-if="palyListCode=='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].thirdprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-3)}}</span>{{v.substring(v.length-3,v.length)}}<i v-if="index<history[historyVal].thirdprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].thirdprize[0] }}</p> -->
                  </div>
                </li>
                <li>
                  <div>Giải tư</div>
                  <div v-if="palyListCode!='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].fourthprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].fourthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].fourthprize[0] }}</p> -->
                  </div>
                   <div v-if="palyListCode=='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].fourthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-2)}}</span>{{v.substring(v.length-2,v.length)}}<i v-if="index<history[historyVal].fourthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].fourthprize[0] }}</p> -->
                  </div>
                </li>
                <li>
                  <div>Giải năm</div>
                  <div v-if="palyListCode!='q2bd'">
                    <p style="display:inline-block;" v-for="v,index in history[historyVal].fifthprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].fifthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].fifthprize[0] }}</p> -->
                  </div>
                  <div v-if="palyListCode=='q2bd'">
                    <p style="display:inline-block;" v-for="v,index in history[historyVal].fifthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-2)}}</span>{{v.substring(v.length-2,v.length)}}<i v-if="index<history[historyVal].fifthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].fifthprize[0] }}</p> -->
                  </div>
                </li>
                <li>
                  <div>Giải sáu</div>
                  <div v-if="palyListCode!='q2bd'&&palyListCode!='dg6'&&palyListCode!='h4bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-if="palyListCode=='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-1)}}</span>{{v.substring(v.length-1,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                   <div v-if="palyListCode=='dg6'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-0)}}</span>{{v.substring(v.length-0,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                   <div v-if="palyListCode=='h4bd'">
                     <p v-show="lotteryId<2" style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index">{{v.substring(0,v.length-0)}}{{v.substring(v.length-0,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                      <p v-show="lotteryId>1" style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index+'c'">{{v.substring(0,v.length-4)}}<span>{{v.substring(v.length-4,v.length)}}</span> <i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                  
                </li>
                <li>
                  <div>Giải bảy</div>
                  <div v-if="palyListCode=='h2bd'||palyListCode=='h2bd1k'||playGroupCode=='combo'||palyListCode=='dg7'||playGroupCode=='lose'||palyListCode=='dg0h3dg7'">
                  
                      <p v-show="isdg0h3dg7" style="display:inline-block;"  v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index">{{v.substring(0,v.length-3)}}<span>{{v.substring(v.length-3,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                      <p v-show="!isdg0h3dg7" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index+'i'">{{v.substring(0,v.length-2)}}<span>{{v.substring(v.length-2,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-else>
                     <p v-show="ish3bd" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index+'i'">{{v.substring(0,v.length-3)}}<span>{{v.substring(v.length-3,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                     <p v-show="!ish3bd" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index">{{v.substring(0,v.length-2)}}{{v.substring(v.length-2,v.length)}}<i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                    

                  </div>
                </li>
                <li v-if="lotteryId>1">
                  <div>Giải tám</div>
                  <div v-if="palyListCode=='h2bd'||palyListCode=='h2bd1k'||playGroupCode=='combo'||palyListCode=='dg8'||palyListCode=='dg0h2dg8'||playGroupCode=='lose'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].eigthprize[0].split(',')" :key="index">{{v.substring(0,v.length-2)}}<span >{{v.substring(v.length-2,v.length)}}</span><i v-if="index<history[historyVal].eigthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].seventhprize[0] }}</p> -->
                  </div>
                  <div v-else>
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].eigthprize[0].split(',')" :key="index">{{v.substring(0,v.length-2)}}{{v.substring(v.length-2,v.length)}}<i v-if="index<history[historyVal].eigthprize[0].split(',').length-1">-</i> </p>
                    <!-- <p>{{ history[historyVal].seventhprize[0] }}</p> -->
                  </div>
                </li>
              </ul>
              <ul class="hist-list hist-2">
                <li>
                  <div>Đầu</div>
                  <div>Đuôi</div>
                </li>
                <li
                  v-for="(item, index) in history[historyVal].headsubprize"
                  :key="index"
                >
                  <div>{{ index }}</div>
                  <div>{{ item }}</div>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="this.history.length"
      :title="'Danh sách cá cược (' + this.history[0].next_open_date + ')'"
      :visible.sync="dialogVisible"
      width="900px"
      custom-class="zhudandialog"
      center
    >
      <div class="bets-box">
        <div class="bet-list clearfix" style="background: none">
          <div class="table-name item">
            <span>Cách chơi</span>
            <span>Số đặt cược</span>
            <span>Số đơn cược</span>
            <span>Cấp số nhân</span>
            <span>Số tiền cược</span>
            <span>Tiền thắng /1 lần</span>
          </div>
          <div class="table-content clearfix">
            <div class="item" v-for="(item, index) in zhudanList" :key="index">
              <span>{{ item.play_name }}</span>
              <span
                style="
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                :title="playFlname(item.item_code)"
                >{{ playFlname(item.item_code) }}</span
              >
              <span>{{ item.zdNums }}</span>
              <span>{{ item.multiple}} </span>
              <span style="color: #ff4646">{{ item.totalMoney }}</span>
              <span>{{ item.maxWin.toFixed(3) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-dialog" v-loading="loading2">
        <div class="total">
          Tổng số tiền : <span>{{ allMoney }}</span> VNDK
        </div>
        <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" style="margin-left: auto" @click="submitZhudan">
          Xác nhận
        </button>
        <button
          style="color: #606266; border: 1px solid #dcdfe6; background: #fff"
          @click="dialogVisible = false"
        >
          Huỷ
        </button>
      </div>
    </el-dialog>
    <el-dialog
      title="Chọn dãy số"
      :visible.sync="dialogVisible3"
      width="300px"
      custom-class='nopadding'
      center
      :show-close="false">
      <div class="rule-list">
        <ul>
          <li v-for="(item,index) in ruleList" :key="index" :class="{active:ruleListIndex==index}" @click="ruleListIndex=index">
            <span>{{item.name}}</span>
            <i>{{item.ruleNums}}</i>
            <em>✔</em>
          </li>
        
        </ul>
      </div>
      <div class="rule-btn">
        <div @click="dialogVisible3=false;ruleListIndex=0">
          <span>Hủy bỏ</span>
        </div>
        <div @click="dialogVisible3=false;" style="color: #0bb20c;">
          <span>Xác nhận</span>
        </div>
      </div>
      <div>

      </div>
    <div>
    </div>
    </el-dialog>
<el-dialog
v-if="palyListData.length"
  :title="ruleText.name"
  :visible.sync="dialogVisible4"
  width="30%"
  >
  <span>{{ruleText.content}}</span>
</el-dialog>
<el-dialog

  title="Hướng dẫn chơi"
  :visible.sync="dialogVisible5"
  width="30%"
  >
 <p><span class="focus">Ngẫu Nhiên:</span> chọn ngẫu nhiên các số đánh.</p>
 <p><span class="focus">Gợi Ý:</span> gợi ý chọn nhanh các số kép bằng, chẵn, lẽ, lớn, bé.</p>
 <p><span class="focus">Ít Xuất Hiện:</span> chọn ra các số ít xuất hiện nhất dựa theo kết quả 50 kỳ xổ gần nhất.</p>
 <p>Số mũ trên mỗi số đánh là thống kê số lần không xuất hiện liên tiếp lâu nhất trong 50 kỳ xổ.</p>
 <p>Trong đó:</p>
 <p>- Màu xanh là những số đánh có số lần từ 10 trở lên đối với loại đánh đề, 3 càng, 4 càng, đầu đuôi và từ 5 trở lên đối với lô, xiên.</p>
 <p>- Màu đỏ là những số đánh có số lần xuất hiện từ 1 trở xuống.</p>
 <p>- Màu xám là những số đánh còn lại.</p>
</el-dialog>
<!-- 更多彩票选择弹框 -->
  <div class="more-lottery" v-if="showAllLottery">
    <div class="more-lottery-content">
      <div class="more-lottery-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">
        <span>Sảnh trò chơi</span>
        <div class="remove-icon" @click="showAllLottery=false"></div>
      </div>
      <div class="all-lottery">
        <dl v-for="v,key in lotteryArr" :key="key">
          <dt>{{key}}</dt>
          <dd >
            <div @click="changeLottery(index, vv)" v-for="vv,index in v" :key="index" :class="vv.lottery_id == lotteryId ? 'active' : ''">
              <span>{{vv.vname}}</span>
              <p>{{vv.remark}}</p>
            </div>
            
          </dd>
        </dl>
      </div>
    </div>
    
  </div>


  </div>
</template>
<script>
import { alertComfirm } from "../../assets/js/public";
import WJS from "../../components/lottery/wjs.vue";
import YJS from "../../components/lottery/yjs.vue";
import { mapState, mapMutations } from "vuex";
import vme from "../../components/vue-mobile-emoji/vme.vue";
let emojiArr=[]
let vipIcons=[]
for (let index = 1; index < 20; index++) {
 emojiArr.push({name:'emoji'+index,path:require("../../assets/imgaes/fhemoji/m"+index+".png")})
  if(index<9){
     vipIcons.push(require("../../assets/imgaes/fhemoji/VIP"+index+".png"))
  }
}
export default {
  data() {
    return {
      showAllLottery:false,
      lotteryArr:[],
      lotteryId: 1,
      allLottery: [],
      dialogVisible3:false,
      dialogVisible4:false,
      dialogVisible5:false,
      ruleText:'',
      palyUnit: [
        "Bao Lô",
        "Lô Xiên",
        " Đánh Đề",
        "Đầu Đuôi ",
        "3 Càng ",
        "4 Càng ",
        "Lô Trượt",
      ],
      ruleListIndex:0,
      ruleList:[
        {
          name:'000-099',
          code:[0,99],
          ruleNums:0
        },
        {
          name:'100-199',
          code:[100,199],
          ruleNums:0
        },
        {
          name:'200-299',
          code:[200,299],
          ruleNums:0
        },
        {
          name:'300-399',
          code:[300,399],
          ruleNums:0
        },
         {
          name:'400-499',
          code:[400,499],
          ruleNums:0
        },
         {
          name:'500-599',
          code:[500,599],
          ruleNums:0
        },
         {
          name:'600-699',
          code:[600,699],
          ruleNums:0
        },
         {
          name:'700-799',
          code:[700,799],
          ruleNums:0
        },
        {
          name:'800-899',
          code:[800,899],
          ruleNums:0
        },
        {
          name:'900-999',
          code:[900,999],
          ruleNums:0
        },
      ],
      palyList: [],
      palyListCode: "h2bd",
      playGroupCode: "baodan",
      palyListNum: [],
      palyListData: [],
      palyListCodeNum: 0,
      zhudanList: [],
      prizeNum: "",
      dialogVisible: false,
      skinList: [
        { color: "0", name: "Màu chủ đề" },
        { color: "1", name: "Màu hoa anh đào" },
        { color: "2", name: "Màu xanh lam" },
        { color: "3", name: "Màu xanh lá" },
      ],
      zhuDbox: true,
      musicState:
        this.$store.state.musicState == true ||
        this.$store.state.musicState == "true", //小喇叭
      musicSrc: require("../../assets/ring.mp3"),
      multiplier: 1, //乘数
      playNumList: [
        { name: "Trăm", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { name: "Ngàn", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { name: "Chục", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
        { name: "Đơn vị", list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
      ],
      selected: [], //选中的号码
      textareaVal: "", //文本框,
      textareaValToo: "",
      playExplain: true, //文本框提示
      typeNumId: "", //选择号码、输入号码、快速选号
      currentBatch: 2,
      history: [],
      historyVal: 0,
      tzBox: true, //下注页
      WJSBox: false,
      YJSBox: false,
      palyArr: [],
      chooseArr: [
        { name: "Tất cả", type: "all" },
        { name: "Tài", type: "da" },
        { name: "Xỉu", type: "xiao" },
        { name: "Lẻ", type: "dan" },
        { name: "Chẵn", type: "shuang" },
      ],
      quickNums:[1,2,3,5,10],
      chooseType: {},
      allMoney: 0,
      loading: true,
      loading2: false,
      zhudanNum: 0,
      yuMoney: 0,
      directArr: [],
      quickId1: 0,
      quickId2: "",
      quickId3: 0,
      quickId4:0,
      djsInterval: null,
      next_closetime: 0,
      next_countdown: 0,
      djstime1: "--:--",
      djstime2: "--:--",
      selectList4: [],
      shareOrderNum:'',
      showItemNum:4,
      activeNum:2,
      isdg0h3dg7:false,
      ish3bd:false,
    };
  },
  computed: {
    ...mapState(["codeToken", "userinfo","skin"]),
  },
  components: { WJS, YJS , vme},
  created() {
    this.init();
    
  },
  mounted() {
    clearInterval(this.djsInterval);
  },
  watch: {
    codeToken: function (i) {
      if (i) {
        this.getBalance();
      }
    },
    textareaVal: function (n, o) {
      // console.log(n.split(/[(\r\n)\r\n]+/)) 回车
      //控制不能输入的字符
      let s = n;
      s = s.replace(/[^\d\,\;\|\:\s\t\n]/g, "");
      let reg = /[,;|:\s\t\n]/;
      let regSz = /^\d+$/;
      this.textareaVal = s;
      // console.log(this.textarea);
      //匹配数据

      let ss = this.textareaVal;
      let arr = [];
      for (let i = 0, len = ss.length; i < len; i++) {
        if (reg.test(ss[i]) && !regSz.test(ss[i - 3])) {
          //截取前两位
          let n = ss.substring(i - 2, i);
          //是否全是数字
          if (regSz.test(n)) {
            arr.push(n);
          }
        }
      }
      let arrnum = this.palyListData[this.palyListCodeNum].field_def.length;
      let fuhao = ",";
      let splitCode = [",", " ", ";"];
      splitCode.forEach((i3, d3) => {
        if (s.indexOf(i3) > -1 && s.indexOf(i3) < arrnum + 1) {
          fuhao = i3;
        }
      });
      let textArr = s.split(fuhao).filter(function (s) {
        return s && s.trim();
      });
      try {
        textArr.forEach((i1, i2) => {
          if (regSz.test(i1) && i1.length == arrnum) {
            this.zhudanNum = textArr.length;
          } else {
            this.zhudanNum = 0;
            throw new Error("EndIterative");
          }
        });
      } catch (error) {
        if (error.message != "EndIterative") throw error;
      }
    },
    textareaValToo: function (n) {
      let s = n;
      s = s.replace(/[^\d\,\;\|\:\s\t\n]/g, "");
      let reg = /[,;|:\s\t\n]/;
      let regSz = /^\d+$/;
      this.textareaValToo = s;
      // console.log(this.textareaValToo);
      //匹配数据
      let ss = this.textareaValToo;
      let arr = [];
      for (let i = 0, len = ss.length; i < len; i++) {
        if (reg.test(ss[i]) && !regSz.test(ss[i - 3])) {
          //截取前两位
          let n = ss.substring(i - 2, i);
          //是否全是数字
          if (regSz.test(n)) {
            arr.push(n);
          }
        }
      }
      let arrnum = this.palyListCode.replace(/[^\d]/g, " ");
      let fuhao = "|";
      let splitCode = ["|", " ", ";"];
      splitCode.forEach((i3, d3) => {
        if (s.indexOf(i3) > -1 && s.indexOf(i3) < arrnum + 1) {
          fuhao = i3;
        }
      });
      let textArr = s.split(fuhao).filter(function (s) {
        return s && s.trim();
      });
      try {
        textArr.forEach((i1, i2) => {
          if (i1.split(",").length == arrnum) {
            i1.split(",").forEach((i3, i4) => {
              if (regSz.test(i3) && i3.length == 2) {
                this.zhudanNum = textArr.length;
              } else {
                this.zhudanNum = 0;
                throw new Error("EndIterative");
              }
            });
            // this.zhudanNum=textArr.length;
          } else {
            this.zhudanNum = 0;
            throw new Error("EndIterative");
          }
        });
      } catch (error) {
        if (error.message != "EndIterative") throw error;
      }
    },
    lotteryId: function () {
      this.getPlaygroup();
       this.getRule()
      this.clearActive();
      this.historyVal=0;
    },
    playGroupCode: function (n) {
      console.log(n)
      if(n=='combo'||n=='lose'){
         this.activeNum=2
      }
      if(n=='interest'||n=='sishu'||n=='sanshu'||n=='headntail'||n=='ershu'){
        this.activeNum=0
      }
      if(n=='sanshu'||n=='ershu'){
        this.quickNums=[10,20,30,40,50]
      }else{
        this.quickNums=[1,2,3,5,10]
      }
      this.palyListCodeNum = 0;
      this.ruleListIndex=0;
      this.getPlayList();
      this.clearActive();
    },
    palyListCode: function (n) {
      this.$refs.moneyBet.innerHTML=this.palyListData[this.palyListCodeNum].prize[0].prize
      if(n=='dg7'||n=='dg0h3dg7'||n=='h3bd'){
        if(this.lotteryId>1){
          this.isdg0h3dg7=true
          this.ish3bd=true
        }
        else{
          this.isdg0h3dg7=false
           this.ish3bd=false
        }
      }else{
        this.isdg0h3dg7=false
         this.ish3bd=false
      }
     if(n=='h2bd1k'){
       this.activeNum=2
     }
     else if(n=='h2bd'){
        this.activeNum=2
     }
      else if(n=='h3bd'){
        this.activeNum=3
     }
      else if(n=='h4bd'){
        this.activeNum=4
     }
      this.clearActive();
      this.getRule()
      this.typeNumId = this.palyListData[this.palyListCodeNum].field_modes[0]
        .code
        ? this.palyListData[this.palyListCodeNum].field_modes[0].code
        : "duplex";
      this.prizeNum = this.palyListData[this.palyListCodeNum].prize[0].prize;
      this.palyListName = this.palyListData[this.palyListCodeNum].name;
    },
    typeNumId: function () {
      this.clearActive();
    },
    zhudanList: function (i) {
      this.allMoney = 0;
      i.forEach((item, index) => {
        this.allMoney += item.totalMoney;
      });
    },
    directArr:function(arr){
       this.ruleList.forEach((i,c)=>{
         i.ruleNums=0
         arr.forEach(v=>{
           if(v>=i.code[0]&&v<=i.code[1]){
             i.ruleNums=i.ruleNums+1
           }
         })
       })
    },
    quickId1: function (c) {
      console.log(c);
      this.directArr = [];
      var a = new Array();
      if(this.palyListData[this.palyListCodeNum].field_rule == '00-99'){
        for (var i = 0; i < 100; i++) {
        a[i] = i;
      }
      a.sort(function () {
        return 0.5 - Math.random();
      });
      if (c) {
        for (var n = 0; n < c; n++) {
          this.directArr.push(a[n]);
        }
      }
      }else{
        for (var i = 0; i < 1000; i++) {
        a[i] = i;
      }
      a.sort(function () {
        return 0.5 - Math.random();
      });
      if (c) {
        for (var n = 0; n < c; n++) {
          this.directArr.push(a[n]);
        }
      }
      }
    },
    quickId2: function (c) {
      if (c == "clear") {
        return;
      }
      this.directArr = [];
      if (c == "Képbằng") {
        this.directArr = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99];
      } else if (c == "Chẵn") {
        for (var n = 0; n < 100; n++) {
          if (n % 2 == 0) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Lẻ") {
        for (var n = 0; n < 100; n++) {
          if (n % 2) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Tài") {
        for (var n = 0; n < 100; n++) {
          if (n > 49) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Xỉu") {
        for (var n = 0; n < 100; n++) {
          if (n < 50) {
            this.directArr.push(n);
          }
        }
      }
    },
    quickId3: function (n) {
      this.directArr = [];
      if (n) {
        var a = new Array();
        for (var i = 0; i < 100; i++) {
          a[i] = i;
        }
        a.sort(function () {
          return 0.5 - Math.random();
        });

        for (var n = 0; n < this.palyListCode.replace(/[^\d]/g, " "); n++) {
          this.directArr.push(a[n]);
        }
      }
    },
    quickId4:function(n){
      if(n=='clear'){
        return
      }
      if(n){
        this.directArr=[0,111,222,333,444,555,666,777,888,999]
      }else{
        this.directArr=[]
      }
    },
  },
  filters: {
   
  },
  methods: {
    ...mapMutations(["SETCHAT"]),
    goRegister() {
      if (this.noticeTypes == 1) {
        this.$store.commit("SETLOGIN", true);
        this.$store.commit('SETISLOGIN',false);
        
      } else {
        this.$store.commit("SETLOGIN", true);
        this.$store.commit('SETISLOGIN',false);
       
      }
    },
    toShowChat(){
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
      this.SETCHAT(true)
    },
    handleScroll(){
    console.log(111111111111111)
       
       
      // scrollbarEl.onscroll = () => {
      // alert(1)
      // }
    },
    closeMenu(){
      this.deleteShow=false
    },
    deleteMsg(id,e){
    this.deleteX=e.x
    this.deleteY=e.y
    this.deleteShow=true
    this.deleteId=id
    },
    submitDelete(){
      let c={
              action:'delete_one',
              chat_id:this.deleteId
            }
             let d = this.globalPpproach.checkIsEncrypt(c)
       this.$http.post('/api/chatroom/operate', d).then(res=>{
        if(res.data.code==1){
          let idx=this.msgList.findIndex((i)=>i.chat_id==this.deleteId)
        }else{
           this.showChatMsg(res.data.msg)
        }
       }
       )
      
    },
    async getAlllottery(code){
        let res = await this.$http.get('/api/lottery/categories/')
        if(res && res.data.code == 1){
            this.lotteryArr = res.data.data;
        }
    
    },
    goGameRule(){
      window.open('/gameRule/'+this.lotteryId+'?type='+this.currLotteryName)
    },
   
      

 

    
   
  
    shareOrder(i){
            i.order_no=this.shareOrderNum
            let d = this.globalPpproach.checkIsEncrypt(i)
            this.$http.post('/api/chatroom/share', d).then(res=>{
              if(res.data.code==1){
                 this.$message({
              message:"Chia sẻ thành công",
              type: 'success'
            });
              }else{
                 this.$message({
              message:res.data.msg,
              type: 'warning'
            });
              }
            })
          },
 
  
  
   
      
     
    changeColor(n){
      this.$st.commit('SETSKINDATA',n)
    },
    goOnline(){
      window.open(localStorage.getItem('customer'))
    },
    chooseDirect(d) {
      if (this.directArr.indexOf(d) > -1) {
        this.directArr.splice(this.directArr.indexOf(d), 1);
      } else {
        this.directArr.push(d);
      }
    },
    getBalance() {
      this.$http.get("/api/guess/amountinfo").then((res) => {
        if (res.data.code == 1) {
          this.yuMoney = res.data.data;
        }
      });
    },
    showDialog() {
      if (!this.zhudanList.length) {
        this.$message({
          message: "Không có đặt cược nào được thêm ",
          type: "warning",
        });
        return;
      }
      if(this.allMoney>this.yuMoney.balance){
          this.$message({
              message: "Thiếu cân bằng",
              type: "warning",
            });
            return;
      }
      this.dialogVisible = true;
    },
    prizeItem(i,d) {
      let prize = 0;
      let this_ = this;
      let prizeNum=this_.palyListCodeNum
      if(d!=undefined){
          prizeNum=d
      }
      function cc() {
        this_.palyListData[prizeNum].prize.forEach((c, v) => {
          if (c.items.indexOf(i.toString()) > -1) {
            prize = c.prize;
          }
        });
      }
      this.palyListData[prizeNum].prize.length == 1
        ? (prize = this.palyListData[prizeNum].prize[0].prize)
        : cc();

      if(prize>0){
        return prize;
      }else{
        return  this.palyListData[prizeNum].prize[10].prize;
      }
    },
    playFlname(i){
      let cc=i
      if(i=='big'){
        cc='Tài'
      }
      if(i=='small'){
        cc='Xỉu'
      }
      if(i=='odd'){
        cc='Lẻ'
      }
      if(i=='even'){
        cc='Chẵn'
      }
      return cc
    },
    isClass(i) {
      if (this.palyArr[i] != undefined) {
        if (this.palyArr[i].length) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    init() {
      this.lotteryId = this.$route.params.id;
      this.currLotteryName = this.$route.query.name;
      this.getGame();
      this.getAlllottery();
      this.getNewOpen();
      this.getBalance();
      this.getZjzd();
       this.getRule()
    },
    printpage(myDiv) {
      let printHtml = document.getElementById(myDiv).innerHTML;
      let wind = window.open("", "newwindow");
      wind.document.body.innerHTML = printHtml;
      wind.print();
      return false;
    },
    async getZjzd() {
      let res = await this.$http.get("/api/guess/orderlist", {
        params: {
          flag: 1,
          //   st:this.formatDateNy(),
          //   et:this.formatDateNy(),
          page: 1,
          limit: 5,
        },
      });
      if (res && res.data.code == 1) {
        this.selectList4 = res.data.data || [];
      }
    },
    // 选择大小单双
    chooseNum(e, type, i) {
      this.chooseType[i] = type;
      let numNodes = document.querySelectorAll(".num");
      let arr = [];
      if (type == "all") {
        numNodes[i].children.forEach((c, v) => {
          c.classList.add("active");
          arr.push(c.getAttribute("data-code"));
        });
      } else if (type == "da") {
        numNodes[i].children.forEach((c, v) => {
          if (v >= numNodes[i].children.length / 2) {
            c.classList.add("active");
            arr.push(c.getAttribute("data-code"));
          } else {
            c.classList.remove("active");
          }
        });
      } else if (type == "xiao") {
        numNodes[i].children.forEach((c, v) => {
          if (v < numNodes[i].children.length / 2) {
            c.classList.add("active");
            arr.push(c.getAttribute("data-code"));
          } else {
            c.classList.remove("active");
          }
        });
      } else if (type == "dan") {
        numNodes[i].children.forEach((c, v) => {
          if (c.getAttribute("data-code") % 2) {
            c.classList.add("active");
            arr.push(c.getAttribute("data-code"));
          } else {
            c.classList.remove("active");
          }
        });
      } else if (type == "shuang") {
        numNodes[i].children.forEach((c, v) => {
          if (c.getAttribute("data-code") % 2) {
            c.classList.remove("active");
            arr.push(c.getAttribute("data-code"));
          } else {
            c.classList.add("active");
          }
        });
      } else if (type == "none") {
        numNodes[i].children.forEach((c, v) => {
          c.classList.remove("active");
        });
      }
      this.palyArr[i] = arr;
      console.log(this.palyArr);
      this.$forceUpdate();
    },
    // 选择号码
    selectClick(e, v, i) {
      let node = e.target;
      if (e.target.localName == "p") {
        node = e.target.parentNode;
      }
      this.$forceUpdate();
      if (this.palyArr[i]) {
        let index = this.palyArr[i].indexOf(v);
        if (index != -1) {
          this.palyArr[i].splice(index, 1);
        } else {
          this.palyArr[i].push(v);
        }
      } else {
        this.palyArr[i] = [v];
      }
      if (node.classList.contains("active")) {
        node.classList.remove("active");
      } else {
        node.classList.add("active");
      }

      if (this.selected.indexOf(v) != -1) {
        this.selected.splice(this.selected.indexOf(v), 1);
      } else {
        this.selected.push(v);
      }
    },
   
    // 清空数字选择
    clearActive() {
      document.querySelectorAll(".num").forEach((d, i) => {
        d.children.forEach((c, v) => {
          c.classList.remove("active");
        });
      });
      document.querySelectorAll(".options").forEach((d, i) => {
        d.children.forEach((c, v) => {
          c.classList.remove("active");
        });
      });
      this.palyArr = [];
      this.chooseType = {};
      this.zhudanNum = 0;
      this.multiplier = 1;
      this.textareaVal = "";
      this.textareaValToo = "";
      this.directArr = [];
      this.quickId1 = "";
      this.quickId2 = "";
      this.quickId3 = "";
      this.ruleListIndex=0;
      this.quickId4=""
    },
    async getGame() {
      let res = await this.$http.get("/api/lottery/allsort/");
      if (res && res.data.code == 1) {
        this.allLottery = res.data.data || [];
        // this.fixRoomId();
        this.getPlaygroup();
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    async getPlaygroup() {
      let res = await this.$http.get("/api/guess/playgroup/", {
        params: { lottery_id: this.lotteryId, client_type: 4 },
      });
      if (res.data.code == 1) {
        this.palyUnit = res.data.data;
        this.palyList = res.data.data[0].children;
        this.getPlayList();
      }
    },
    async getPlayList() {
      this.loading = true;
      let res = await this.$http.get("/api/guess/playlist", {
        params: {
          lottery_id: this.lotteryId,
          group_code: this.playGroupCode,
          client_type: 4,
        },
      });
      if (res.data.code == 1) {
        this.palyListData = res.data.data;
        this.prizeNum = this.palyListData[this.palyListCodeNum].prize[0].prize;
        this.palyListName = this.palyListData[this.palyListCodeNum].name;
        this.typeNumId = this.palyListData[this.palyListCodeNum].field_modes[0]
          .code
          ? this.palyListData[this.palyListCodeNum].field_modes[0].code
          : "duplex";
        this.palyListCode = this.palyListData[this.palyListCodeNum].code;
        this.getRule()
      }
     
      this.loading = false;
    },
    async getRule() {
      let res = await this.$http.get("/api/guess/playrule", {
        params: { lottery_id: this.lotteryId,play_code:this.playGroupCode=='interest'?'dg0h2i':this.palyListCode},
      });
      if (res.data.code == 1) {
       this.ruleText=res.data.data
      }
    },
    async getNewOpen() {
      let res = await this.$http.get("/api/lottery/index/", {
        params: { lottery_id: this.lotteryId, st: "", et: "" },
      });
      if (res.data.code == 1) {
        this.history = res.data.data;
        // this.historyVal = 0;
        this.next_closetime = this.history[0].next_closetime;
        this.next_countdown = this.history[0].next_countdown;
        this.startInterval();
      }
    },
    storyChange(i) {
      // alert(this.historyVal)
    },
    startInterval() {
      clearInterval(this.djsInterval);
      this.djsInterval = setInterval(() => {
        if (this.next_closetime < 1) {
          this.djstime1 = "Đã đóng";
        } else {
          this.djstime1 = this.count(this.next_closetime);
        }
        if (this.next_countdown <= 0) {
          this.djstime2 = "Đang mở thưởng";
          this.getNewOpen();
        } else {
          this.djstime2 = this.count(this.next_countdown);
        }
        this.next_closetime--;
        this.next_countdown--;
      }, 1000);
    },
    unique(arr) {
      if (!Array.isArray(arr)) {
        console.log("type error!");
        return;
      }
      let array = [];
      for (let i = 0; i < arr.length; i++) {
        if (!array.includes(arr[i])) {
          //includes 检测数组是否有某个值
          array.push(arr[i]);
        }
      }
      // return array
      // this.textareaVal = array.join(',');
      // console.log(this.textareaVal)
    },
    // 彩种切换
    changeLottery(index, v) {
      this.lotteryId = v.lottery_id;
      this.currLotteryName = v.vname;
      this.showAllLottery = false;
      //开奖
      this.getNewOpen();
      this.xiazhu();
      //玩法说明
      this.getRule();
    },
    // 玩法切换
    changeTab(index, v) {
      this.playGroupCode = v.code;
      this.xiazhu();
    },
    typeNum(index) {
      //选择号码、输入号码、快速选号 tab切换
      this.typeNumId = index;
    },
    method(index) {
      this.currentBatch = index;
      this.typeNumId = 1;
    },
    submitPlay() {
      function group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
          newArray.push(array.slice(index, (index += subGroupLength)));
        }
        return newArray;
      }
      if (this.next_closetime < 1)
        return this.$message({
          message: "Số kỳ đặt cược đã đóng lại",
          type: "warning",
        });

      if (this.typeNumId == "single") {
        if (!this.zhudanNum) {
          this.$message({
            message: "Vui lòng nhập đúng hình thức đặt cược",
            type: "warning",
          });
          return;
        }
        let str1 = this.textareaVal
          .replace(/[^\d]/g, " ")
          .split(" ")
          .filter(function (s) {
            return s && s.trim();
          });
        let str3 = this.textareaValToo
          .replace(/[^\d]/g, " ")
          .split(" ")
          .filter(function (s) {
            return s && s.trim();
          });
        let str2 = "";
        let str4 = "";
        let arrnum = this.palyListCode.replace(/[^\d]/g, " ");
        str1.forEach((i) => {
          str2 += " " + i;
        });
        let str5 = group(str3, parseInt(arrnum));
        str5.forEach((i, c) => {
          str4 += " " + i.toString();
        });
        let zhudan = {
          issue: this.history[0].next_issue,
          // item_code:str2.slice(1),
          item_code: str2 ? str2.slice(1) : str4.slice(1),
          play_code: this.palyListCode,
          play_name: this.palyListName,
          zdNums: this.zhudanNum,
          multiple: this.multiplier,
          totalMoney: this.multiplier *this.zhudanNum*this.palyListData[this.palyListCodeNum].amount,
          maxWin: this.prizeNum * this.multiplier,
          playGroupCode: str2 ? 0 : 1,
        };
        this.zhudanList.push(zhudan);
        this.clearActive();
      } else {
        if (
          this.palyListData[this.palyListCodeNum].field_rule &&
          this.palyListData[this.palyListCodeNum].field_modes.length > 1 &&
          this.typeNumId != "duplex"
        ) {
           let arr = [];
          let numLength = 2;
          if (this.palyListData[this.palyListCodeNum].field_rule == "000-999") {
            numLength = 3;
          }
          this.directArr.forEach((i) => {
            arr.push((Array(numLength).join(0) + i).slice(-numLength));
          });
          let oddnum=0
          if (this.playGroupCode == "lose" || this.playGroupCode == "combo") {
            if (
              this.directArr.length < this.palyListCode.replace(/[^\d]/g, " ")
            ) {
              this.$message({
                message: "Vui lòng chọn cược chính xác",
                type: "warning",
              });
              return;
            }else{
              oddnum=this.directArr.length/this.palyListCode.replace(/[^\d]/g, " ")
            }
          } else {
            if (this.directArr.length < 1) {
              this.$message({
                message: "Vui lòng chọn cược chính xác",
                type: "warning",
              });
              return;
            }else{
              oddnum=this.directArr.length
            }
          }
          let zhudan = {
            issue: this.history[0].next_issue,
            item_code: arr.toString(),
            play_code: this.palyListCode,
            play_name: this.palyListName,
            zdNums: oddnum,
            multiple: this.multiplier,
            totalMoney: this.multiplier * oddnum*this.palyListData[this.palyListCodeNum].amount,
            maxWin: this.prizeNum * this.multiplier,
            playGroupCode: 1,
          };
          this.zhudanList.push(zhudan);
          this.clearActive();
        }
        if (
          this.typeNumId == "duplex" ||
          this.palyListData[this.palyListCodeNum].field_modes.length == 1
        ) {
          if (this.palyListData[this.palyListCodeNum].field_modes.length == 1) {
            if (!this.palyArr.length) {
              this.$message({
                message: "Vui lòng chọn cược chính xác",
                type: "warning",
              });
              return;
            }
            if(this.playGroupCode=='interest'){
               this.palyArr.forEach((a,d)=>{
                a.forEach((c, v) => {
                 let palyNum=1
                 if(isNaN(c)){
                   palyNum=0
                 }
              let zhudan = {
                issue: this.history[0].next_issue,
                item_code: c,
                play_code: this.palyListData[d].code,
                play_name: this.palyListData[d].name,
                zdNums: 1,
                multiple: this.multiplier,
                totalMoney: this.multiplier*this.palyListData[d].amount,
                maxWin: this.prizeItem(c,palyNum) * this.multiplier,
              };
              this.zhudanList.push(zhudan);
            });
               })
            }else{
               this.palyArr[0].forEach((c, v) => {
              let zhudan = {
                issue: this.history[0].next_issue,
                item_code: c,
                play_code: this.palyListCode,
                play_name: this.palyListName,
                zdNums: 1,
                multiple: this.multiplier,
                totalMoney: this.multiplier*this.palyListData[this.palyListCodeNum].amount,
                maxWin: this.prizeItem(c) * this.multiplier,
              };
              this.zhudanList.push(zhudan);
            });
            }
            this.clearActive();
          } else {
            let str = "";
            let zdNums = 1;
            let iszhudan = false;
            this.palyArr.forEach((i, d) => {
              str += "|" + i.toString();
              zdNums *= i.length;
              if (i.length < 1) {
                iszhudan = true;
              }
            });
            if (
              iszhudan ||
              this.palyArr.length <
                this.palyListData[this.palyListCodeNum].field_def.length
            ) {
              this.$message({
                message: "Vui lòng chọn cược chính xác",
                type: "warning",
              });
              return;
            }
            let zhudan = {
              issue: this.history[0].next_issue,
              item_code: str.slice(1),
              play_code: this.palyListCode,
              play_name: this.palyListName,
              zdNums: zdNums,
              multiple: this.multiplier,
              totalMoney: this.multiplier * zdNums*this.palyListData[this.palyListCodeNum].amount,
              maxWin: this.prizeNum * this.multiplier,
            };
            this.zhudanList.push(zhudan);
            this.clearActive();
          }
        }
      }
    },
    submitZhudan() {
      
      let arr = [];
      this.zhudanList.forEach((i, t) => {
        if (i.playGroupCode) {
          arr.push({
            amount: i.multiple,
            play_code: i.play_code,
            item_code: i.item_code,
          });
        } else {
          if (
            i.item_code.indexOf("|") > -1 ||
            i.item_code.indexOf(" ") > -1 ||
            i.item_code.indexOf(";") > -1
          ) {
            arr.push({
              amount: i.multiple,
              play_code: i.play_code,
              item_code: i.item_code,
              // item_code:i.item_code,
            });
          } else {
            arr.push({
              amount: i.multiple,
              play_code: i.play_code,
              item_code: i.item_code.replace(/,/g, " "),
              // item_code:i.item_code,
            });
          }
        }
      });
      // 提交注单

      let d = this.globalPpproach.checkIsEncrypt({
        issue: this.history[0].next_issue,
        lottery_id: this.lotteryId,
        items: JSON.stringify(arr),
      });
      //  arr.push({
      //         amount:2,
      //         play_code:'h2bd',
      //         item_code:'23|45|89',
      //         // item_code:i.item_code,
      //     })
      this.loading2 = true;
      this.$http
        .post("/api/guess/play", d, {timeout:60000})
        .then((res) => {
          if (res.data.code == 1) {
            // if(this.sharePurview==''||this.$store.state.userinfo.vip>=this.sharePurview){
              let items1=res.data.items
              items1.forEach((v,a)=>{
                v.oneAmount=v.amount/v.multiple/v.nums
              })
             let shareContent={
        issue: res.data.issue,
        lottery_id: res.data.lottery_id,
        items: JSON.stringify(items1),
      }
       alertComfirm({
          msg:'Bạn có muốn chia sẻ đơn cược không?',
          title:'tip',
          showCancelButton:true,
        },()=>{
          this.shareOrderNum=res.data.order_no;
          this.shareOrder(shareContent)
        },()=>{});

       
      
            // }
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.dialogVisible = false;
            this.zhudanList = [];
            this.clearActive();
            this.getZjzd();
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
          }
          this.getBalance();
          this.loading2 = false;
        })
        .catch((e) => {
          this.loading2 = false;
        });
    },
    multiplierChange(value) {
      //乘数框
    },
    textareaFocus(event) {
      this.playExplain = false;
      // document.getElementById('numInput').focus();
    },
    textareaBlur(event) {
      if (!this.textarea) {
        this.playExplain = true;
      } else {
        this.playExplain = false;
      }
    },
    //已结算
    xiazhu() {
      this.WJSBox = false;
      this.YJSBox = false;
      this.tzBox = true;
    },
    //未结算
    openWJS() {
      this.tzBox = false;
      this.YJSBox = false;
      this.WJSBox = true;
    },
    //已结算
    openYJS() {
      this.tzBox = false;
      this.WJSBox = false;
      this.YJSBox = true;
    },
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
        // h = parseInt((parseInt(time / 60) / 60) % 24);
        h = parseInt((parseInt(time / 60) / 60));
        d = parseInt(parseInt(time / 60) / 60 / 24);
        second = second >= 10 ? second : "0" + second;
        min = min >= 10 ? min : "0" + min;
        if (!h) h = "";
        else h = h >= 10 ? h : "0" + h;
        // if (d >= 1) {
        //   if (!h) h = "00";
        //   t = d + "Day" + h + ":" + min + ":" + second;
        // } else {
        //   if (h >= 1) {
        //     t = h + ":" + min + ":" + second;
        //   } else {
        //     t = min + ":" + second;
        //   }
        // }
        if (h >= 1) {
            t = h + ":" + min + ":" + second;
          } else {
            t = min + ":" + second;
          }
      } else {
        t = "00:" + (time >= 10 ? time : "0" + time);
      }
      return t;
    },
  },
};
</script>
<style lang="less">
.more-lottery{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  top: 0;
  left: 0;
  z-index: 1001;
  .more-lottery-content{
     position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    border-radius: 6px;
    width: 1000px;
    overflow: hidden;
    .more-lottery-title{
      color: #fff;
      background: #1b74c8;
      font-size: 16px;
      text-align: left;
      position: relative;
      height: 54px;
      line-height: 54px;
      padding: 0 20px;
      .remove-icon{
        position: absolute;
        right: 21px;
        top: 20px;
        width: 16px;
        height: 16px;
         background: url("../../assets/imgaes/remove-btn.png") no-repeat;
         background-size: contain;
         cursor: pointer;
      }
    }
    .all-lottery{
      background:#fff;
      max-height: 600px;
      overflow-y: auto;
      padding: 20px;
      dl{
        text-align: center;
        width: 100%;
        dt{
          width: 100px;
          float: left;
        }
        dd{
          // float: left;
          display: flex;
          flex-wrap: wrap;
          div{
            cursor: pointer;
            margin-left: 20px;
            margin-bottom: 20px;
            padding: 10px;
            background: #f3f6f7;
            border: 2px solid #f3f6f7;
            border-radius: 4px;
            &.active{
              border: 2px solid #1b74c8;
            }
            p{
              color: #4674cb;
            }
          }
          
        }
      }
    }
  }
}
.nopadding{
  .el-dialog__body{
    padding: 0;
    .rule-list{
      padding: 0 12px;
      ul{
        padding: 10px 8px;
      overflow-y: auto;
    max-height: 180px;
      }
      li{display: flex;justify-content: space-around;font-size: 16px;line-height: 34px;
    border-bottom: 1px solid #ddd;
    align-items: center;cursor: pointer;
      &.active{
        em{
          opacity: 1;
        }
      }
      i{
        display: inline-block;background-color: #528ded;
        color: #fff;
        height: 20px;
        line-height: 20px;
        padding: 0 6px;
        border-radius: 6px;
        font-size: 12px;
      }
      em{
        opacity: 0;
        color:#09bb07;
      }
      }
    }
    .el-dialog__title{
      font-size: 20px;
    }
    .rule-btn{
      position: relative;
    line-height: 48px;
    font-size: 18px;
    display: flex;
    >div{
      flex: 1;
      text-align: center;
      cursor: pointer;
    }
    }
  }
}
.zhudandialog {
  .el-dialog__body {
    padding: 0;
  }
  .bets-box .bet-list .item span:nth-of-type(2) {
    width: 25%;
  }
  .footer-dialog {
    display: flex;
    line-height: 30px;
    padding: 20px 26px;
    button {
      width: 108px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      border-radius: 4px;
      color: #fff;
      margin-left: 10px;
      background-color: #2175dc;
    }
    span {
      color: #ea524d;
    }
  }
}
.bets-box {
  .bet-list {
    width: 96%;
    background: url("../../assets/imgaes/game/bet-bg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0 10px 0 7px;
    .table-title {
      line-height: 40px;
      font-size: 16px;
      color: #555;
      text-align: center;
    }
    .table-name {
      line-height: 30px;
      background: #e7f0fc;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
      overflow: hidden;
      span {
        border-right: 1px solid #ececec;
        &:last-of-type {
          border-right: 0;
        }
      }
    }
    .table-content {
      padding-top: 10px;
      padding-bottom: 20px;
    }
    .item {
      span {
        width: 14%;
        line-height: 37px;
        text-align: center;
        float: left;
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          width: 16%;
        }
        &:last-of-type {
          width: 10%;
        }
        &.last {
          color: #ff4646;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
.game-popper {
  .el-select-dropdown__item {
    text-align: center;
  }
  .el-select-dropdown__item.selected {
    // color: #d63e35;
  }
}
#lotteryGame {
  background: #e6e6e6;
  min-width: 1520px;
  min-height: 511px;
  .header-tab {
    height: 44px;
    background: #005d92;
    color: #fff;
    font-size: 14px;
    p{
        margin-right: 10px;
       display: inline-block;
      //  margin-top: 8px;
       &.curr-lotteryName{
        font-weight: bold;
        font-size: 18px;
      }
      &.more-lottery-select{
        background: #f9bf5b;
        border-radius: 6px;
        text-align: center;
        padding: 0 30px 0 10px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        position: relative;
        i{
          position: absolute;
          display: inline-block;
          width: 15px;
          height: 15px;
          background: url(../../assets/imgaes/w_Subtract.png);
          background-size: contain;
          right: 10px;
          top:-3px;
        }
      }
      &.curr-open-number{
        i{
          display: inline-block;
          background: #f9bf5b;
          border-radius: 50px;
          width: 28px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;

        }
      }
    }
   
    span {
      display: inline-block;
      width: 120px;
      line-height: 43px;
      text-align: center;
      cursor: pointer;
      
      &.item {
        position: relative;
        &::after {
          content: "";
          width: 2px;
          height: 20px;
          // background: #1b74c8;
          position: absolute;
          right: 0;
          top: 12px;
        }
        &:last-of-type {
          &::after {
            display: none;
          }
        }
      }
    }
    .is-active {
      background: #f4f5f8 !important;
      color: #005d92 !important;
      font-weight: bold;
      &::after {
        display: none;
      }
    }
    &.pink-bg-dark{
      .is-active{
        color: #FB7772 !important;
      }
    }
    li {
      width: 120px;
      height: 44px;
      line-height: 44px;
      //   padding-top: 2px;
      text-align: center;
    }

    i {
      display: block;
      width: 30px;
      height: 25px;
      margin-top: 10px;
      margin-left: 20px;
      cursor: pointer;
    }
    .music-icon-open {
      background: url("../../assets/imgaes/game/laba.png") no-repeat;//改成闭嘴喇叭
      background-size: contain;
    }
    .music-icon-close {
      background: url("../../assets/imgaes/game/laba2.png") no-repeat;
      background-size: contain;
    }
    .rule-icon {
      background: url("../../assets/imgaes/game/rule-icon.png") no-repeat;
      background-size: contain;
      width: 19px;
      height: 24px;
    }
    .skin-icon {
      background: url("../../assets/imgaes/game/skin-icon.png") no-repeat;
      background-size: contain;
      width: 24px !important;
      height: 27px;
    }
    .chat-icon{
      background: url("../../assets/imgaes/game/chat-icon.png") no-repeat;
      background-size: contain;
      width: 30px !important;
      height: 21px;
      margin-top: 12px;
    }
  }
  .play-tab {
    padding-top: 7px;
    padding-bottom: 5px;
    margin-left: 17%;
    .lhc {
      padding: 0 15px !important;
    }
    span {
      display: inline-block;
      padding: 0 20px;
      height: 18px;
      line-height: 18px;
      position: relative;
      font-size: 14px;
      color: #555;
      cursor: pointer;
      &.active {
        color: #ff5f5f;
      }
      &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 18px;
        background: #cccccc;
        right: 0;
        top: 0;
      }
    }
    .gz-item{
      color: #000;
      img{
        width: 20px;
        height: 20px;
      }
      &:before {
        content: "";
        position: absolute;
        width: 2px;
        height: 18px;
        background: #cccccc;
        opacity: 0;
      }
    }
  }
  .play-content {
    padding: 0 20px 0 10px;
    .play-tool {
      width: 16%;
      font-size: 14px;
      > div {
        margin-bottom: 10px;
      }
      .tool-info,
      .bet-details {
        background: #f5f5f5;
        border-radius: 5px;
        overflow: hidden;
      }
      .tool-info {
        color: #6e7c9e;
        .info-mx {
          padding: 10px;
          position: relative;
          .icon-refresh {
            width: 18px;
            height: 18px;
            position: absolute;
            right: 10px;
            bottom: 10px;
            background: url("../../assets/imgaes/openLottery/shuaxin.png")
              no-repeat;
            background-size: contain;
            cursor: pointer;
          }
          span {
            line-height: 32px;
          }
        }
      }
      .bet-details {
        .no-bet {
          font-size: 14px;
          color: #999;
          text-align: center;
          padding-top: 20px;
        }
        .bet-mx {
          padding: 10px;
          text-align: left;
          > div {
            padding: 5px 0;
            border-bottom: 1px dashed #f5f5f5;
          }
          span {
            line-height: 22px;
          }
          .print {
            width: 40px;
            color: #fff;
            background: #1b74c8;
            text-align: center;
            margin-top: 10px;
            border-radius: 3px;
            cursor: pointer;
          }
        }
        i {
          &.z-blue {
            color: #3eaef6;
          }
          &.z-orange {
            color: #fb7b25;
          }
        }
      }
      .tool-btn {
        width: 100%;
        background: #1b74c8;
        text-align: center;
        height: 32px;
        line-height: 32px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background: #439cff;
        }
        
        a {
          display: block;
          color: #fff;
          position: relative;
        }
        .icon-service {
          width: 23px;
          height: 19px;
          position: absolute;
          left: 7%;
          top: 7px;
          background: url("../../assets/imgaes/openLottery/kefu.png") no-repeat;
          background-size: contain;
        }
      }
      span {
        display: block;
        color: #555;
      }
      // .kj-zx{
      //     span{
      //         width: 48%!important;
      //     }
      // }
      .jieS {
        span {
          &:first-of-type {
            // width: 61%!important;
            margin-bottom: 10px;
          }
          // &:last-of-type{
          //     width: 35% !important;
          // }
        }
      }
    }
    .play-tzMain {
      width: 81.5%;
      font-size: 14px;
      margin-left: 0.5%;
      margin-bottom: 12px;
      .tz-content {
        width: 75.2%;
        min-height: 790px;
        background: #fafafa;
        border-radius: 6px;
        padding: 8px;
        min-width: 916px;
        .play-timer {
          width: 100%;
          height: 35px;
          line-height: 35px;
          border-radius: 5px;
          color: #fff;
          padding: 0 10px;
          background: #1b74c8;
          span {
            display: inline-block;
            margin-right: 3px;
            &:nth-last-child(1) {
              margin-right: 0;
            }
          }
          .djs-box {
            height: 22px;
            line-height: 22px;
            background: #fff;
            padding: 0 3px;
            margin-top: 5px;
            text-align: center;
            border-radius: 3px;
          }
        }
        .bet-method {
          margin-top: 10px;
          .tab-left {
            li {
              min-width: 80px;
              color: #555;
              background: #e7f0fc;
              border-radius: 4px 4px 0px 0px;
              padding: 9px 12px;
              margin-right: 5px;
              float: left;
              cursor: pointer;
              &.active {
                color: #fff;
                background: #287be1;
              }
            }
          }
          .game-tabs {
            border: 1px solid #287be1;
            border-radius: 4px;
            li {
              width: 115px;
              line-height: 31px;
              color: #287be1;
              text-align: center;
              border-right: 1px solid #287be1;
              float: left;
              cursor: pointer;
              &:first-of-type {
                border-radius: 4px 0 0 4px;
              }
              &:last-of-type {
                border-right: 0;
                border-radius: 0 4px 4px 0;
              }
              &.active {
                color: #fff;
                background: #287be1;
              }
            }
          }
        }
        .play-number {
          h4{
            background-color: #e7f0fc;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: 400;
    margin: 0;
    font-weight: 700;
    color: #333;
    border: 1px solid #e5e5e5;
          }
          background: #fff;
          dl.interest {
            height: auto;
            color: #555;
            padding-top: 22px;
            clear: both;
            overflow: hidden;
            padding-bottom: 22px;
            .num {
              span {
                width: 86px;
                height: 60px;
                border: 1px solid #ddd;
                margin: 10px;
                border-radius: 4px;
                cursor: pointer;
                position: relative;
                background-color: #fff;
                z-index: 1;

                &.active {
                  color: #fff;
                  background: linear-gradient(180deg, #8ad5ff 0%, #1f4ff8 100%);
                  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
                  border-color: #8ad5ff;
                }
                p {
                  line-height: 20px;
                  color: red;
                }
              }
            }
          }
          dl {
            height: 109px;
            color: #555;
            padding-top: 35px;
            &:nth-of-type(even) {
              background: #f5f5f5;
            }
            dt {
              width: 84px;
              line-height: 35px;
              height: 35px;
              text-align: center;
              margin-right: 10px;
              background: url("../../assets/imgaes/game/dt-bg.png") no-repeat;
              background-size: cover;
              &.active {
                color: #fff;
                background: url("../../assets/imgaes/game/dt-bg2.png") no-repeat;
                background-size: cover;
              }
            }
            .num {
              span {
                width: 35px;
                height: 35px;
                line-height: 35px;
                text-align: center;
                background: #ffffff;
                border: 1px solid #d1d1d1;
                box-sizing: border-box;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                float: left;
                margin-right: 5px;
                cursor: pointer;
                &.active {
                  color: #fff;
                  background: linear-gradient(180deg, #8ad5ff 0%, #1f4ff8 100%);
                  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
                  border-color: #8ad5ff;
                }
              }
            }
            .options {
              span {
                width: 50px;
                line-height: 25px;
                height: 25px;
                text-align: center;
                background: #ffffff;
                border: 1px solid #555555;
                border-radius: 4px;
                float: left;
                margin-right: 10px;
                margin-top: 7px;
                cursor: pointer;
                &.active {
                  color: #fff;
                  background: #dfa040;
                  border-color: #dfa040;
                }
              }
            }
          }
        }
        .play-textarea {
          background: #fff;
          position: relative;
          padding-top: 10px;
          .el-textarea {
            height: 214px;

            .el-textarea__inner {
              height: 214px;
            }
          }
          .play-explain {
            position: absolute;
            left: 10px;
            right: 10px;
            top: 21px;
            z-index: 1;
            color: #b6b6b6;
            line-height: 1.5;
            font-size: 14px;
            z-index: 0;
          }
        }
        .play-quick {
          display: table;
          padding-top: 30px;
          background: #fff;
          font-size: 14px;
          .quick-select {
            display: table-cell;
            width: 320px;
            vertical-align: top;
            .rule-num{
              border-radius: 3px;
              margin-bottom:12px;
              cursor: pointer;
              width: 84px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              position: relative;
              background-color: #2175dc;
              color: #fff;
              i{
                position: absolute;
                left: 100%;
                transform: translate3d(-50%,0,0);
                top: -0.4em;
                border-radius: 3px;
                background-color: #ff625c;
                color: #fff;
                padding: 0.1em;
                line-height: 1;
                min-width: 1em;
                text-align: center;
              }
            }
            .title {
              color: #fff;
              line-height: 39px;
              width: 84px;
              font-size: 14px;
              text-align: center;
              border-radius: 4px 0 0 4px;
              background: #439cff;
              position: relative;
              &::after {
                position: absolute;
                right: -10px;
                top: 0;
                display: block;
                content: "";
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 19px 0 19px 10px;
                border-color: transparent transparent transparent #439cff;
              }
            }
            .title-group {
              overflow: hidden;
              margin: 10px 0;
              span {
                min-width: 40px;
                height: 35px;
                line-height: 35px;
                color: #555;
                text-align: center;
                border: 1px solid #555;
                border-radius: 4px;
                margin-right: 5px;
                padding: 0 3px;
                float: left;
                cursor: pointer;
                &.active {
                  color: #fff;
                  background: #439cff;
                  border-color: #439cff;
                }
              }
            }
          }
          .quick-num {
            display: table-cell;
            text-align: center;
            .tips{
              margin-top: -20px;
    margin-bottom: 14px;
    text-align: right;
    padding-right: 8px;
    color: #2175dc;
    cursor: pointer;
            }
            .item {
              width: 45px;
              height: 35px;
              line-height: 35px;
              color: #555;
              text-align: center;
              border: 1px solid #949494;
              border-radius: 4px;
              margin-right: 7px;
              margin-bottom: 12px;
              float: left;
              box-sizing: border-box;
              cursor: pointer;
              position: relative;
              // &:nth-of-type(11n + 0) {
              //   margin-right: 0;
              // }
              i {
                width: 17px;
                height: 17px;
                line-height: 17px;
                font-size: 9px;
                color: #838383;
                text-align: center;
                background: #f2f2f2;
                border-radius: 50%;
                position: absolute;
                top: -9px;
                right: -5px;
              }
              &.num_disable {
                border-color: #ccc;
                color: #ccc;
                cursor: default;
                pointer-events: none;
              }

              &.active {
                background: url("../../assets/imgaes/game/quick-bg.png")
                  no-repeat 100% 100%;
                background-size: 50px 35px;
                border-color: #287be1;
              }
            }
          }
        }
        .bet-num {
          height: 85px;
          color: #5b5b5b;
          text-align: right;
          border-top: 1px solid #e9e9e9;
          padding-top: 15px;
          .el-input-number {
            width: 128px;
            line-height: 32px;
            border-color: #d6eeff;
            background: #d6eeff;
            margin-right: 15px;
          }
          .btn {
            width: 95px;
            height: 32px;
            font-size: 14px;
            color: #fff;
            background: #287be1;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
          }
          .orange {
            background: #facb70 !important;
          }
        }

        .bet-btns {
          text-align: right;
          .total {
            line-height: 40px;
            font-size: 16px;
            display: inline-block;
            margin-right: 5px;
            span {
              color: #ff4646;
            }
          }
          .btn {
            width: 120px;
            height: 40px;
            font-size: 18px;
            color: #fff;
            background: #287be1;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
          }
          .gray-blue {
            background: #b0c3dd !important;
          }
        }
      }
    }
    .game-history {
      width: 24%;
      background: #f5f5f5;
      border-radius: 6px;
      padding: 8px;
      .history-title {
        line-height: 49px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        background: #1b74c8;
        border-radius: 4px;
      }
      .history-select {
        .el-select {
          width: 100%;
          font-size: 20px;
          background: #e7f0fc;
          margin-top: 8px;
          margin-bottom: 8px;
          border-radius: 4px;
        }
      }
      .history-box {
        color: #555;
        font-size: 14px;
        background: #fff;
        .cur-issue {
          line-height: 32px;
          background: #e7f0fc;
          padding-left: 8px;
          border-radius: 4px 4px 0px 0px;
        }
        .hist-list {
          li {
            display: table;
            width: 100%;
            padding: 6px 8px;
            border-bottom: 1px solid #f5f5f5;
            div {
              display: table-cell;
              text-align: center;
              span {
                color: #ff9330;
              }
              p{
                word-break: break-all;
              }
            }
          }
          &.hist-1 {
            div {
              &:first-of-type {
                width: 80px;
                vertical-align: middle;
              }
            }
          }
          &.hist-2 {
            li {
              &:first-of-type {
                background: #e7f0fc;
              }
            }
            div {
              width: 50%;
            }
          }
        }
      }
    }
    &.pink-content{
      .play-tool{
        .tool-btn{
          background: #FB7772;
          &:hover {
            background: #FF8F8B;
          }
        }
      }
     
      .game-tabs{
        border: 1px solid #FB7772 !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #FB7772 !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #FF9793 0%, #FFA9A6 100%) !important;
      }
      .tab-left li.active,.game-tabs li.active{
        background: #FB7772 !important;
        color: #fff !important;
      }
      .game-tabs li{
        border-right: 1px solid #FB7772 !important;
        color: #FB7772 !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/pink/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        border-color: #FAE952 !important;
      }
       .tz-content .play-quick .quick-num .item.active{
        background: url("../../assets/imgaes/game/quick-bg-pink.png")
                  no-repeat 100% 100%!important;
                background-size: 50px 35px!important;
                border-color: #FB7772 !important;
      }
     .tz-content .play-quick .quick-select .rule-num,
     .tz-content .play-quick .quick-select .title,
     .tz-content .play-quick .quick-select .title-group .active{
       background: #FB7772 !important;
     }
      .tz-content .play-quick .quick-select .title::after{
        border-color: transparent transparent transparent #FB7772 !important;
      }
    }
    &.blue-content{
      .play-tool{
        .tool-btn{
          background: #00B4D8;
          &:hover {
            background: #00C5ED;
          }
        }
      }
     .game-tabs{
        border: 1px solid #00B4D8 !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #00B4D8 !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%) !important;
      }
      .tab-left li.active,.game-tabs li.active{
        background: #00B4D8 !important;
        color: #fff !important;
      }
      .game-tabs li{
        border-right: 1px solid #00B4D8 !important;
        color: #00B4D8 !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/blue/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        border-color: #FAE952 !important;
      }
        .tz-content .play-quick .quick-num .item.active{
        background: url("../../assets/imgaes/game/quick-bg-blue.png")
                  no-repeat 100% 100%!important;
                background-size: 50px 35px!important;
                border-color: #00B4D8 !important;
      }
     .tz-content .play-quick .quick-select .rule-num,
     .tz-content .play-quick .quick-select .title,
     .tz-content .play-quick .quick-select .title-group .active{
       background: #00B4D8 !important;
     }
      .tz-content .play-quick .quick-select .title::after{
        border-color: transparent transparent transparent #00B4D8 !important;
      }
    }
    &.green-content{
      .play-tool{
        .tool-btn{
          background: #09B584;
          &:hover {
            background: #08D99D;
          }
        }
      }
      .game-tabs{
        border: 1px solid #08D99D !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #08D99D !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #08D99D 0%, #14FFBC 100%) !important;
      }
      .tab-left li.active,.game-tabs li.active{
        background: #08D99D !important;
        color: #fff !important;
      }
      .game-tabs li{
        border-right: 1px solid #08D99D !important;
        color: #08D99D !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/green/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        border-color: #FAE952 !important;
      }
      .tz-content .play-quick .quick-num .item.active{
        background: url("../../assets/imgaes/game/quick-bg-green.png")
                  no-repeat 100% 100%!important;
                background-size: 50px 35px!important;
                border-color: #08D99D !important;
      }
     .tz-content .play-quick .quick-select .rule-num,
     .tz-content .play-quick .quick-select .title,
     .tz-content .play-quick .quick-select .title-group .active{
       background: #08D99D !important;
     }
      .tz-content .play-quick .quick-select .title::after{
        border-color: transparent transparent transparent #08D99D !important;
      }
    }
  }
}
.chat-container{
    width: 380px;
    height: 620px;
    background: #f6f6f6;
    box-shadow: 0px 7px 14px 1px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    margin-left: 76.8%;
    position: fixed;
    // top:225px;
    bottom: 0;
    right: 0;
    z-index: 2000;
    .delete-msg{
    padding: 8px 12px;
    background: #fff;
    position: fixed;
    z-index: 99;
    border: 1px solid #ccc;
    cursor: pointer;
    }
    .chat-title{
        line-height: 70px;
        font-size: 24px;
        font-weight: bold;
        padding-left: 29px;
        color: #fff;
        text-align: center;
        background: #1B74C8;
        border-radius: 4px 4px 0 0;
        margin-bottom: 17px;        
        .close{
            width: 15px;
            margin: 10px 10px 0 0;
            cursor: pointer;
        }
    }
    .chat-notice{
    position: absolute;
    width: 100%;
    height: 42px;
    background: #fff;
    z-index: 100;
    top: 70px;
    line-height: 42px;
    font-size: 16px;
    strong{
      color: #287BE1;
    }
    }
    .chat-content{
        padding: 9px 13px;
        section{
            margin-bottom: 29px;
            overflow: hidden;
            &.selfMsg{
              .name-level{
                flex-direction: row-reverse;
                
              }
              .chat-photo{margin-right: 0;margin-left: 15px;float: right;}
              .chat-box{
                .time{
                float: right;
              }
              .chat-say{
                float: right;
                background: #1B74C8;
                color: #fff;
              }
              .betting-wrap{
                float: right;
              }
              }
              
            }
        }
        .chat-photo{
            width: 50px;
            margin-right: 15px;
            border-radius: 50%;
            img{
                width: 100%;  
                border-radius: 50%;
            }
        }
        .name-level{
          display: flex;
          align-items: center;
          overflow: hidden;
          flex-direction: row;
            .nick-name{
                color: #1B74C8;
               
            }
            .level{
                width: 40px;
                margin: 0 5px;
            }
            .win-rate{
                color: #FF5640;
            }
        }   
        .chat-box{
            position: relative;
            z-index: 9;
            .chat-say,.betting-wrap{
                max-width: 229px;
                min-height: 30px;
                padding: 8px;
                border-radius: 5px;
                font-size: 16px;
                color: #222;
                position: relative;
                margin: 0 5px;
                background: #fff;
                &.blue{
                    background: #1B74C8;
                    color: #fff;
                }
            }
            .time{
                line-height: 34px;
                font-size: 10px; 
                color: #B2B2B2;
                float: left;
            }
            .betting-wrap{
                &.grey{
                    background: #EEEEEE;
                    .list-btn{
                         background: #C4C4C4;
                         pointer-events: none;
                    }
                }
                p{
                    line-height: 22px;
                    &:last-of-type{
                        border-bottom: 1px solid #E9E9E9;
                    }
                }
                .list-btn{
                    display: block;
                    width: 138px;
                    height: 28px;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    background: linear-gradient(90deg, #1486FF 0%, #4BA1FF 100%);
                    border-radius: 90px;
                    margin: 5px auto;
                    cursor: pointer;
                }
            }

        }
    }
    .chat-foot{
        padding: 10px 13px;
        border-top: 1px solid #BFBFBF;
        .mute{
            width: 28px;
            height: 28px;
            margin-right: 10px;
            margin-top: 5px;
            cursor: pointer;
            &.mute1{
                background: url('../../assets/imgaes/game/mute-1.png') no-repeat;
                background-size: 100% 100%;
            }
            &.active{
                background: url('../../assets/imgaes/game/mute.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .emojiText{
            width: 235px;
            height: 35px;
            font-size: 14px;
            color: #555;
            background: #F0F0F0;
            border: 0.5px solid #CACACA;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 2px 8px;
            float: left;
             -webkit-user-select:text;
            outline: none;
            overflow: hidden;
            &:empty::before{
          content: 'Vui lòng nhập nội dung trò chuyện';
          color: #ccc;
        }
        &:focus::before{

          content: none;
          color: #ccc;
        }
        }
        .emj,.send{
            width: 30px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .emoji-box{
      position: absolute;
      width: 100%;
      bottom: 60px;
      background: #fff;
      padding:4px 6px;
      z-index: 100;
      ul{
        display: flex;
        flex-wrap: wrap;
        li{
          cursor: pointer;
          padding:4px;
          margin:0 3px;
          img{ width: 32px;}
        }
      }
    }
    .tc-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        color: #445779;
        background: rgba(0, 0, 0, 0.4);
        z-index: 100;
        .tc-title{
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            padding: 10px 0;
          
            span{
                display: block;
                font-weight: normal;
                font-size: 12px;
                color: #6A86B9;
            }
        }
        .betting-list{
            width: 355px;
            min-height: 160px;
            position: absolute;
            left: 50%;
            top: 80px;
            transform: translateX(-50%);
            border-radius: 10px;
            background: #fff;
            border-top: 1px solid #E9E9E9;
            .betting-box{
                padding: 5px 15px;
                p{
                    font-size: 14px;
                    line-height: 30px;
                }
                table{
                    border-collapse: separate;
                    border-spacing: 0;
                    tr,td{
                        border: 1px solid #017CFF;
                        text-align: center;
                        width: 40%;
                        padding: 5px;
                    }
                    .title{
                        background: #F2F2F2;
                        td{
                            &:first-of-type{
                                border-top-left-radius: 5px;
                            }
                            &:last-of-type{
                                border-top-right-radius: 5px;
                            }
                        }
                    }
                    .multiplier{
                        width: 60px;
                        border: 1px solid #666666;
                        box-sizing: border-box;
                        border-radius: 5px;
                        text-align: center;
                        vertical-align: middle;
                        input{
                            width: 40px;
                            height: 20px;
                            text-align: center;
                        }
                        img{
                            width: 10px;
                            vertical-align: initial;
                        }
                    }
                }
            }
            .share{
                font-size: 14px;
                line-height: 16px;
                color: #6A86B9;
                text-align: center;
                .select{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    &.select-default{
                        background: url('../../assets/imgaes/game/select-default.png');
                        background-size: 100% 100%;
                    }
                    &.select-active{
                        background: url('../../assets/imgaes/game/select.png');
                        background-size: 100% 100%;
                    }
                }
                img{
                    width: 16px;
                    cursor: pointer;
                }
            }
            
        }
        .popTC{
            width: 277px;
            min-height:194px;
            font-size: 16px;
            position: absolute;
            left: 50%;
            top: 320px;
            transform: translateX(-50%);
            border-radius: 10px;
            background: #fff;
            padding: 13px 16px 0;
            .h80{
                 width: 277px;
                height: 80px;
                display:table-cell;
                vertical-align:middle;
                text-align: center;
            }
            .h120{
                 width: 277px;
                height: 120px;
                display:table-cell;
                vertical-align:middle;
                text-align: center;
            }
        }
        .btn-group{
            text-align: center;
            margin-top: 10px;
            margin-bottom: 17px;
            button{
                width: 135px;
                height: 35px;
                color: #fff;
                background: #D8D8D8;
                border-radius: 20px;
                cursor: pointer;
                &.blue{
                    background: linear-gradient(89.97deg, #007CFF 0.02%, #4BA1FF 99.97%);
                }
            }
        }
        .jyTC{
            width: 345px;
            min-height:194px;
            font-size: 16px;
            position: absolute;
            left: 50%;
            top: 320px;
            transform: translateX(-50%);
            border-radius: 10px;
            background: #fff;
            padding: 13px 16px 0;
            .remove-icon{
                width: 14px;
                height: 14px;
                background: url('../../assets/imgaes/game/icon-close.png') no-repeat;
                background-size: cover;
            }
            .avatar{
                width: 50px;
                height: 60px;
                border-radius: 50%;
                margin: 0 auto;
                position: relative;
                img{
                    width: 100%;
                    border-radius: 50%;
                }
                .level{
                    width: 40px;
                    height: 15px;

                    position: absolute;
                    top: 45px;
                    left: 5px;
                }
            }
            .username{
                text-align: center;
                font-size: 16px;
            }
            .selectTime{
                display: block;
                width: 237px;
                height: 37px;
                border: 0.5px solid #222222;
                box-sizing: border-box;
                border-radius: 4px;
                padding-left: 9px;
                margin: 12px auto 30px;
                position: relative;
                cursor: pointer;
                .input{
                    input{
                        border: none;
                        outline: none;
                        width: 90%;
                        line-height: 35px;
                        font-size: 16px;
                        color: #666;
                        cursor: pointer;

                    }
                    .arrow{
                        width: 12px;
                    }
                }
                .list{
                    width: 237px;
                    border: 1px solid #F5F7FA;
                    overflow: hidden;
                    background: #FFFFFF;
                    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                    position: absolute;
                    left: 0;
                    top: 37px;
                    padding-left: 10px;
                    li{
                        width: 100%;
                        height: 40px;
                        position: relative;
                        span{
                            width: 200px;
                            line-height: 40px;
                            cursor: pointer;
                            padding-left: 5px;
                            border-bottom: 1px solid #F5F7FA;
                            margin-left: 35px;
                        }
                        img{
                            width: 17px;
                            position: absolute;
                            top: 15px;
                            left: 13px;
                        }
                    }
                }
            }   

        }
    }
}
</style>