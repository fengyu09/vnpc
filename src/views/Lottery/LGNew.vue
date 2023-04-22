<template>
  <div id="lotteryGame" class="LGNew">
   
    <div class="play-content clearfix" :class="[{'pink-content':skin==1},{'blue-content':skin==2},{'green-content':skin==3}]">
     
      <!-- 右侧 -->
      <div class="play-tzMain1 fl clearfix">
        <div class="tz-content fl" v-show="tzBox" v-loading="loading">
          <div v-if="!loading">
            <div class="title-tab ">
                <el-dropdown :class="nav1Active==index?'active':''"  trigger="click" v-for="(item,index) in lotteryGames" :key="index" >
                    <span  class="el-dropdown-link" @click="changeNav(index)">{{item.name}}<i class="el-icon-caret-bottom el-icon--right" ></i> </span>
                    <el-dropdown-menu slot="dropdown"  class="lottery-box" :class="[{'pink-lg-bg':skin==1},{'blue-lg-bg':skin==2},{'green-lg-bg':skin==3}]">
                        <ul>
                            <li v-for="(v,index1) in lotteryGamesList" :key="index1">
                                <span v-if="lotteryGamesList.length>1">{{v.name}}</span>
                                <div>
                                  <span v-for="(vv,index2) in v.list" :key="index2"  @click="changeLottery(index,vv)">{{vv.name}}</span>
                                </div>
                            </li>
                        </ul>
                    </el-dropdown-menu>
                </el-dropdown>
                <i class="rule-icon" @click="goGameRule()"></i>
            </div>
            <div class="play-tab1" :class="[{'pink-tab':skin==1},{'blue-tab':skin==2},{'green-tab':skin==3}]" v-if="lotteryId<45">
                <span
                    :class="{ active: playGroupCode == v.code }"
                    @click="changeTab(index, v)"
                    v-for="(v, index) in palyUnit"
                    :key="index"
                    >{{ v.name }}</span
                >
                <span class="gz-item" @click="dialogVisible4=true">
                    <img src="../../assets/imgaes/newLotteryGame/daowan-icon.png" alt="" srcset="">
                    {{$t('lotteryGame.text[16]')}}
                </span>
            </div>
             <div class="play-tab1" :class="[{'pink-tab':skin==1},{'blue-tab':skin==2},{'green-tab':skin==3}]" v-else>
                <span
                    :class="{ active: lotteryId == v.code }"
                    @click="changeLottery(index,v)"
                    v-for="(v, index) in this.lotteryGamesList[0].list"
                    :key="index"
                    >{{ v.name }}</span
                >
                <span class="gz-item" @click="dialogVisible4=true">
                    <img src="../../assets/imgaes/newLotteryGame/daowan-icon.png" alt="" srcset="">
                    {{$t('lotteryGame.text[16]')}}
                </span>
            </div>
            <div class="plv clearfix">
               <div class="peilv fl"  v-if="palyListData[palyListCodeNum].prize.length==1&&playGroupCode!='interest'"><i class="pl-icon"> {{$t('lotteryGame.text[17]')}}</i><strong style="color: #ea524d;font-weight: 700;font-style: oblique;padding-right: 10px">1:{{palyListData[palyListCodeNum].prize[0].prize}}</strong></div>
               
               <a target="_blank" @click="goOnline" class="kefu fr"><i class="icon-service"></i>{{$t('lotteryGame.ZdTable[9]')}}</a>
            </div>
            <ul class="game-tabs1 select-tab" v-if="palyListData[palyListCodeNum].field_modes.length>1">
                <li
                v-if="palyListData[palyListCodeNum].field_modes"
                v-for="(item, index) in palyListData[palyListCodeNum]
                    .field_modes"
                    :key="index"
                :class="{ active: typeNumId == item.code }"
                @click="typeNumId = item.code"
                >
                {{ item.name }}
                </li>
            </ul>
           
            <!--<el-scrollbar style="width:100%">-->
              <div class="bet-method clearfix">
                <ul class="tab-left fl" v-if="playGroupCode!='interest'">
                  <li
                    v-for="(item, index) in palyListData"
                    :class="{ active: palyListCodeNum == index }"
                    @click="qhLeftTab(item,index)"
                    :key="item.code"
                  >
                    {{ item.name }}
                  </li>
                </ul>
                <ul class="tab-left fl" v-else>
                  <li class="active"  v-if="palyListCode!='pk3zh'">
                     {{$t('lotteryGame.text[1]')}}
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
                      >{{ i2.name }}
                      <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'numblue-bg':notOpenList[index][i2.name]>5&&notOpenList[index][i2.name]<10,'numorange-bg':notOpenList[index][i2.name]>9}" >{{notOpenList[index][i2.name]}}</i>
                      </span
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

                    <span @click="chooseNum($event, 'none', index)">{{$t('lotteryGame.text[15]')}}</span>
                  </dd>
                </dl>
              </div>
              <div class="play-textarea" v-if="typeNumId == 'single'">
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
                        <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'numblue-bg':notOpenList[i2.name]>5&&notOpenList[index][i2.name]<10,'numorange-bg':notOpenList[i2.name]>9}" >{{notOpenList[i2.name]}}</i>
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

                      <span @click="chooseNum($event, 'none', index)">{{$t('lotteryGame.text[15]')}}</span>
                    </dd>
                  </dl>
                </div>
                   <div
                  class="play-number"
                  v-if="
                   playGroupCode=='interest'
                  "
                >
                <h4 style="margin-top: 24px;" v-if="palyListCode!='pk3zh'">{{$t('lotteryGame.text[2]')}}</h4>
                  <dl
                    v-for="(item, index) in palyListData[0].field_def"
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
                 
                <div  v-if="palyListData.length>1">
                   <h4>{{$t('lotteryGame.text[3]')}}</h4>
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
                      <dt class="title">{{$t('lotteryGame.text[4]')}}</dt>
                      <dd class="title-group">
                        <span
                          :class="{ active: quickId1 == i }"
                          v-for="(i, d) in quickNums"
                          @click="
                            quickId2 = 'clear';
                            quickId4='clear';
                            quickId1 == i ? (quickId1 = 0) : (quickId1 = i);
                          "
                          :key="d"
                          >{{ i }} {{$t('lotteryGame.text[5]')}}</span
                        >
                      </dd>
                    </dl>
                    <dl v-if="palyListData[palyListCodeNum].field_rule == '00-99'">
                      <dt class="title">{{$t('lotteryGame.text[6]')}}</dt>
                      <dd class="title-group">
                        <span
                        v-show="$st.state.defalutLan=='en'"
                          :class="{ active: quickId2 == i }"
                          :key="d+'v'"
                          v-for="(i, d) in [
                            'Double equal',
                            'Even',
                            'Odd',
                            'Big',
                            'Small',
                          ]"
                          @click="
                            quickId1 = 0;
                            quickId2 == i ? (quickId2 = 0) : (quickId2 = i);
                          "
                          >{{ i }}</span
                        >

                        <span
                        v-show="$st.state.defalutLan!='en'"
                          :class="{ active: quickId2 == i }"
                          :key="d"
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
                      <dt class="title">{{$t('lotteryGame.text[6]')}}</dt>
                      <dd class="title-group">
                        <span v-if="$st.state.defalutLan=='en'" :class="{active:quickId4==1}" @click="quickId4==1?quickId4=0:quickId4=1;quickId1 = 0;">Képbằng</span>
                        <span v-else :class="{active:quickId4==1}" @click="quickId4==1?quickId4=0:quickId4=1;quickId1 = 0;">Double equal</span>
                         
                        
                      </dd>
                    </dl>
                  </div>
                  <div class="quick-select" v-else>
                     <div class="rule-num" v-if="palyListData[palyListCodeNum].field_rule == '00-99'">
                  <span>00-99</span>
                  <i>{{this.directArr.length/palyListData[palyListCodeNum].field_def[0].max_selected==1?1:0}}</i>
                  </div>
                    <dl>
                      <dt class="title">{{$t('lotteryGame.text[4]')}}</dt>
                      <dd class="title-group">
                        <span
                          :class="{ active: quickId3 == i }"
                          v-for="(i, d) in [1]"
                          :key="d+'c'"
                          @click="
                            quickId3 == i ? (quickId3 = 0) : (quickId3 = i)
                          "
                          >{{ i }} {{$t('lotteryGame.text[5]')}}</span
                        >
                      </dd>
                    </dl>
                  </div>
                  <div
                    class="quick-num"
                    v-if="palyListData[palyListCodeNum].field_rule == '00-99'"
                  >
                 
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
                        <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'numblue-bg':notOpenList[(Array(2).join(0) + d).slice(-2)]>5&&notOpenList[(Array(2).join(0) + d).slice(-2)]<10,'numorange-bg':notOpenList[(Array(2).join(0) + d).slice(-2)]>9}">{{notOpenList[(Array(2).join(0) + d).slice(-2)]}}</i>
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
                        <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'numblue-bg':notOpenList[(Array(2).join(0) + d).slice(-2)]>5&&notOpenList[(Array(2).join(0) + d).slice(-2)]<10,'numorange-bg':notOpenList[(Array(2).join(0) + d).slice(-2)]>9}">{{notOpenList[(Array(2).join(0) + d).slice(-2)]}}</i>
                      </div>
                    </div>
                  </div>
                  <div class="quick-num" v-else>
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
                      <i v-if="JSON.stringify(notOpenList)!='[]'" :class="{'numblue-bg':notOpenList[(Array(3).join(0) + d).slice(-3)]>5&&notOpenList[(Array(3).join(0) + d).slice(-3)]<10,'numorange-bg':notOpenList[(Array(3).join(0) + d).slice(-3)]>9}">{{notOpenList[(Array(3).join(0) + d).slice(-3)]}}</i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bet-num">
               
                {{$t('lotteryGame.text[10]')}} :
                <el-input-number
                  v-model="multiplier"
                  @change="multiplierChange"
                  :min="1"
                  size="medium"
                  label=""
                  :step="1"
                ></el-input-number>
               
                <button class="btn" @click="allsubmit">{{$t('lotteryGame.text[8]')}}</button>
                <button class="btn orange" @click="submitPlay">{{$t('lotteryGame.text[7]')}}</button>
                <button class="white " @click="clearActive">{{$t('lotteryGame.text[9]')}}</button>
              </div>
            <div class="qh-ls">
                
                <span @click="changeSelect(0)" :class="{active:tabIndex==0}" >{{$t('lotteryGame.ZdTable[10]')}}</span>
                <span @click="changeSelect(1)" :class="{active:tabIndex==1}" >{{$t('lotteryGame.ZdTable[11]')}}</span>
            </div>
              <div class="bets-box1">
                
                <div class="bet-list clearfix" v-if="tabIndex==0">
                  <div class="table-name1 item">
                    <span>{{$t('lotteryGame.ZdTable[0]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[1]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[2]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[3]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[4]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[5]')}}</span>
                    <span>{{$t('lotteryGame.ZdTable[6]')}}</span>
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
                          >{{$t('lotteryGame.text[15]')}}</span
                        >
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
                
             
                <div v-if="tabIndex==1">
                   <div class="jieS clearfix">
                    
                    <span :class="YJSBox?'active':''" class="tool-btn fr" @click="openYJS()"
                      >{{$t('lotteryGame.ZdTable[7]')}}</span>
                      <span :class="WJSBox?'active':''" class="tool-btn fr" @click="openWJS()"
                      >{{$t('lotteryGame.ZdTable[8]')}}</span
                    >
                  </div>
                  <YJS v-if="YJSBox==1" ref="orderBox" class="fl"></YJS>
                  <WJS v-if="WJSBox" ref="orderBox" class="fl "></WJS>
                </div>
                
              </div>
            <!--</el-scrollbar>-->
          </div>
        </div>
      
        <div class="game-history fr">
            <div class="tool-info">
                <div class="info-mx">
                    <span class="fl">
                      <img :src="userinfo.avatar" alt="">
                    </span>
                    <div class="fl">
                            <span>{{ userinfo.username }}</span>
                                                <span
                                                >{{$t('moneyDw')}}: <strong>{{ yuMoney.balance }}</strong></span
                                                >
                                            
                    </div>
                   
                </div>
            </div>
          <div class="time">
            <div class="time-title"> {{$t('lotteryGame.text[13]')}}:{{currLotteryName}}</div>
            <div style="margin-top: 10px;">
                <span :style="hour.length>2?'':'width:110px'">{{$t('lotteryGame.text[14]')}}</span>
                <span v-if="second.length">
                  <i v-for="(v,index1) in hour" :key="index1">{{v}}</i>
                  <span v-if="hour.length">:</span>
                  <i v-for="(v,index2) in min">{{v}}</i>
                  <span v-if="min.length">:</span>
                  <i v-for="(v,index3) in second" >{{v}}</i>
                </span>
                <span v-else>
                    <i>-</i>
                    <i>-</i>
                    :
                    <i>-</i>
                    <i>-</i>
                    :
                    <i>-</i>
                    <i>-</i>
                </span>
            </div>
          </div>
          
          <div class="history-select" v-if="lotteryId<45">
            <el-select
              v-model="historyVal"
              :placeholder="$t('lotteryGame.text[12]')"
              popperClass="game-popper"
              @change="storyChange"
              :popper-append-to-body="false"
              
            >
              <el-option
                v-for="(item, index) in history"
                :key="index"
                :label="item.belong_date+' / '+item.issue"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
           <div class="history-select" v-else>
            <el-select
              v-model="historyDate"
              :placeholder="$t('lotteryGame.text[12]')"
              popperClass="game-popper"
              @change="pkstoryChange"
              :popper-append-to-body="false"
              
            >
              <el-option
                v-for="(item, index) in selectDate"
                :key="index"
                :label="$t('lotteryGame.text[11]')+':'+item"
                :value="index"
              >
              </el-option>
            </el-select>
          </div>
            <!--  -->
            <div class="history-box" v-if="lotteryId<45">
              <ul class="hist-list hist-1" v-if="history.length">
                <li>
                  <div>{{$t('lotteryGame.prize[0]')}}</div>
                  <div v-if="palyListCode!='q2bd'&&playGroupCode!='interest'&&playGroupCode!='sishu'&&palyListCode!='dg0h3'&&playGroupCode!='headntail'&&palyListCode!='dg0q2'&&palyListCode!='dg0h2'&&palyListCode!='dg0h2dg8'&&palyListCode!='dg0h3dg7'&&palyListCode!='dg0h3dg6'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-activeNum) }}<span >{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-activeNum,history[historyVal].grandprize[0].length)}}</span></div>
                  <div v-if="palyListCode=='q2bd'||palyListCode=='dg0q2'"><span >{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-3) }}</span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-3,history[historyVal].grandprize[0].length)}}</div>
                  <div  v-if="playGroupCode=='interest'||palyListCode=='dg0h2'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length)}}</span></div>
                   <div  v-if="playGroupCode=='sishu'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-4) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-4,history[historyVal].grandprize[0].length)}}</span></div>
                   <div  v-if="palyListCode=='dg0h3'||palyListCode=='dg0h3dg7'||palyListCode=='dg0h3dg6'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-3) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-3,history[historyVal].grandprize[0].length)}}</span></div>
                    <div  v-if="palyListCode=='dg0d1'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-1) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-1,history[historyVal].grandprize[0].length)}}</span></div>
                     <div  v-if="palyListCode=='dg0h2dg8'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length)}}</span></div>
                     <div  v-if="palyListCode=='dg0d2'">{{ history[historyVal].grandprize[0].substring(0,history[historyVal].grandprize[0].length-2) }}<span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-2,history[historyVal].grandprize[0].length-1)}}</span>{{history[historyVal].grandprize[0].substring(history[historyVal].grandprize[0].length-1,history[historyVal].grandprize[0].length)}}</div>
                </li>
                <li>
                  <div>{{$t('lotteryGame.prize[1]')}}</div>
                  <!-- firstprize -->
                  <div  v-if="palyListCode!='q2bd'&&palyListCode!='dg1h3'&&palyListCode!='dg1h2'&&palyListCode!='dg1q2'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-activeNum) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-activeNum,history[historyVal].firstprize[0].length)}}</span></div>
                  <div  v-if="palyListCode=='q2bd'||palyListCode=='dg1q2'"><span>{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-3) }}</span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-3,history[historyVal].firstprize[0].length)}}</div>
                   <div  v-if="palyListCode=='dg1h3'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-3) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-3,history[historyVal].firstprize[0].length)}}</span></div>
                 
                     <div  v-if="palyListCode=='dg1h2'">{{ history[historyVal].firstprize[0].substring(0,history[historyVal].firstprize[0].length-2) }}<span>{{history[historyVal].firstprize[0].substring(history[historyVal].firstprize[0].length-2,history[historyVal].firstprize[0].length)}}</span></div>
                  
                </li>
                <li>
                  <div>{{$t('lotteryGame.prize[2]')}}</div>
                  <div v-if="palyListCode!='q2bd'">
                    <p  style="display:inline-block;" v-for="v,index in history[historyVal].secondprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].secondprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-if="palyListCode=='q2bd'">
                    <p  style="display:inline-block;" v-for="v,index in history[historyVal].secondprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-3)}}</span>{{v.substring(v.length-3,v.length)}}<i v-if="index<history[historyVal].secondprize[0].split(',').length-1">-</i> </p>
                  </div>
                </li>
                <li>
                  <div>{{$t('lotteryGame.prize[3]')}}</div>
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
                  <div>{{$t('lotteryGame.prize[4]')}}</div>
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
                  <div>{{$t('lotteryGame.prize[5]')}}</div>
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
                  <div>{{$t('lotteryGame.prize[6]')}}</div>
                  <div v-if="palyListCode!='q2bd'&&palyListCode!='dg6'&&palyListCode!='h4bd'&&palyListCode!='dg0h3dg6'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index">{{v.substring(0,v.length-activeNum)}}<span >{{v.substring(v.length-activeNum,v.length)}}</span><i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-if="palyListCode=='q2bd'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-1)}}</span>{{v.substring(v.length-1,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                   <div v-if="palyListCode=='dg6'||palyListCode=='dg0h3dg6'">
                     <p style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index"><span >{{v.substring(0,v.length-0)}}</span>{{v.substring(v.length-0,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                   <div v-if="palyListCode=='h4bd'">
                     <p v-show="lotteryId<2||lotteryId==37" style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index">{{v.substring(0,v.length-0)}}{{v.substring(v.length-0,v.length)}}<i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                      <p v-show="lotteryId>1&&lotteryId!=37" style="display:inline-block;" v-for="v,index in history[historyVal].sixthprize[0].split(',')" :key="index+'c'">{{v.substring(0,v.length-4)}}<span>{{v.substring(v.length-4,v.length)}}</span> <i v-if="index<history[historyVal].sixthprize[0].split(',').length-1">-</i> </p>
                  </div>
                  
                </li>
                <li>
                  <div>{{$t('lotteryGame.prize[7]')}}</div>
                  <div v-if="palyListCode=='h2bd'||palyListCode=='h2bd1k'||playGroupCode=='combo'||palyListCode=='dg7'||playGroupCode=='lose'||palyListCode=='dg0h3dg7'">
                  
                      <p v-show="isdg0h3dg7" style="display:inline-block;"  v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index">{{v.substring(0,v.length-3)}}<span>{{v.substring(v.length-3,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                      <p v-show="!isdg0h3dg7" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index+'i'">{{v.substring(0,v.length-2)}}<span>{{v.substring(v.length-2,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                  </div>
                  <div v-else>
                     <p v-show="ish3bd" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index+'i'">{{v.substring(0,v.length-3)}}<span>{{v.substring(v.length-3,v.length)}}</span><i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                     <p v-show="!ish3bd" style="display:inline-block;" v-for="v,index in history[historyVal].seventhprize[0].split(',')" :key="index">{{v.substring(0,v.length-2)}}{{v.substring(v.length-2,v.length)}}<i v-if="index<history[historyVal].seventhprize[0].split(',').length-1">-</i> </p>
                    

                  </div>
                </li>
                <li v-if="lotteryId>1&&lotteryId!=37">
                  <div>{{$t('lotteryGame.prize[8]')}}</div>
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
              <ul class="hist-list hist-2" v-if="history.length">
                <li>
                  <div>{{$t('lotteryGame.prize[9]')}}</div>
                  <div>{{$t('lotteryGame.prize[10]')}}</div>
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
            <div  class="history-box2" v-else>
                <ul v-if="pkHistory[1]">
                  <li v-for="(item,index) in pkHistory[1]" :key="index">
                      <i v-for="(item2,index2) in item.prize_list.headsubprize[0].split(',')" :key="index2+'c'" :class="'dice'+item2"></i>
                      <label>{{item.prize_list.sum[0]}}</label>
                      <em :class="[{'da':item.prize_list.size.code=='big'},{'xi':item.prize_list.size.code=='small'},{'da-line':item.prize_list.size.code=='big'&&item.prize_list.size.is_strikethrough==1},{'xi-line':item.prize_list.size.code=='small'&&item.prize_list.size.is_strikethrough==1}]">{{item.prize_list.size.name}}</em>
                      <em :class="[{'dan':item.prize_list.parity.code=='odd'},{'su':item.prize_list.parity.code=='even'},{'dan-line':item.prize_list.parity.code=='odd'&&item.prize_list.size.is_strikethrough==1},{'su-line':item.prize_list.parity.code=='even'&&item.prize_list.size.is_strikethrough==1}]">{{item.prize_list.parity.name}}</em>
                      <span>{{item.issue}}</span>
                  </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-if="this.history.length"
      :title="$t('lotteryGame.text[18]')+' (' + xzIssueMess.belong_date+'/'+xzIssueMess.issue + ')'"
      :visible.sync="dialogVisible"
      width="900px"
      custom-class="zhudandialog"
      center
    >
      <div class="bets-box1">
        <div class="bet-list clearfix" style="background: none">
          <div class="table-name1 item">
            <span>{{$t('lotteryGame.ZdTable[0]')}}</span>
            <span>{{$t('lotteryGame.ZdTable[1]')}}</span>
            <span>{{$t('lotteryGame.ZdTable[2]')}}</span>
            <span>{{$t('lotteryGame.ZdTable[3]')}}</span>
            <span>{{$t('lotteryGame.ZdTable[4]')}}</span>
            <span>{{$t('lotteryGame.ZdTable[5]')}}</span>
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
          {{$t('lotteryGame.text4[0]')}}<span>{{ allMoney }}</span> {{$t('moneyDw')}}
        </div>
        <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" style="margin-left: auto" @click="submitZhudan">
          {{$t('qdText')}}
        </button>
        <button
          style="color: #606266; border: 1px solid #dcdfe6; background: #fff"
          @click="dialogVisible = false"
        >
          {{$t('qxText')}}
        </button>
      </div>
    </el-dialog>
    <el-dialog
      :title="$t('lotteryGame.text[19]')"
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
          <span>{{$t('lotteryGame.text4[1]')}}</span>
        </div>
        <div @click="dialogVisible3=false;" style="color: #0bb20c;">
          <span>{{$t('qdText')}}</span>
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
 <p><span class="focus">{{$t('lotteryGame.text4[2]')}}</span> {{$t('lotteryGame.text4[3]')}}</p>
 <p><span class="focus">{{$t('lotteryGame.text[6]')}}:</span> {{$t('lotteryGame.text4[4]')}}.</p>
 <p><span class="focus">{{$t('lotteryGame.text4[5]')}}</span> {{$t('lotteryGame.text4[6]')}}.</p>
 <p>{{$t('lotteryGame.text4[7]')}}.</p>
 <p>{{$t('lotteryGame.text4[8]')}}</p>
 <p>- {{$t('lotteryGame.text4[9]')}}.</p>
 <p>- {{$t('lotteryGame.text4[10]')}}.</p>
 <p>- {{$t('lotteryGame.text4[11]')}}.</p>
</el-dialog>



  </div>
</template>
<script>
import { alertComfirm } from "../../assets/js/public";
import WJS from "../../components/lottery/wjs.vue";
import YJS from "../../components/lottery/yjs.vue";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      pkHistory:[],
      historyDate:0,
      selectDate:[],
      showAllLottery:false,
      lotteryArr:[],
      lotteryId: 1,
      allLottery: [],
      dialogVisible3:false,
      dialogVisible4:false,
      dialogVisible5:false,
      ruleText:'',
      hour:[],
      min:[],
      second:[],
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

      zhuDbox: true,
      musicState:
        this.$store.state.musicState == true ||
        this.$store.state.musicState == "true", //小喇叭
      musicSrc: require("../../assets/ring.mp3"),
      multiplier: 1, //乘数
      selected: [], //选中的号码
      textareaVal: "", //文本框,
      textareaValToo: "",
      playExplain: true, //文本框提示
      typeNumId: "", //选择号码、输入号码、快速选号
      currentBatch: 2,
      history: [],
      historyVal: 0,
      tzBox: true, //下注页
      WJSBox: true,
      YJSBox: false,
      palyArr: [],
      chooseArr: [
        { name: this.$t('lotteryGame.text2[0]'), type: "all" },
        { name: this.$t('lotteryGame.text2[1]'), type: "da" },
        { name: this.$t('lotteryGame.text2[2]'), type: "xiao" },
        { name: this.$t('lotteryGame.text2[3]'), type: "dan" },
        { name: this.$t('lotteryGame.text2[4]'), type: "shuang" },
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
      // djstime1: "--:--",
      djstime2: "--:--",
      djstime1: "00:00:00",
      djstime3:{
        hour:[],
        sec:[],
        min:[]
      },
      selectList4: [],
      shareOrderNum:'',
      showItemNum:4,
      activeNum:2,
      isdg0h3dg7:false,
      ish3bd:false,
      tabIndex:0,
      lotteryGames:[],
      lotteryGamesList:[],
      nav1Active:0,
      xzIssueMess:{},
      notOpenList:[],
    };
  },
  computed: {
    ...mapState(["codeToken", "userinfo","skin","allLotteryGame"]),
   changed: function () {
        return this.djstime3.changed
    }
  },
  components: { WJS, YJS },
  created() {
    this.init();
    for (let index = 0; index < 10; index++) {
      this.selectDate.push(this.getRecentDay(-index))
    }
    this.getPkOpen()
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
    djstime3:{
      handler(newName, oldName) {
        // this.count(this.next_closetime);
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    },
    textareaVal: function (n, o) {
      //控制不能输入的字符
      let s = n;
      // s = s.replace(/[^\d\,\;\|\:\s\t\n]/g, "");
      let reg = /[,;|:\s\t\n]/;
      let regSz = /^\d+$/;
      this.textareaVal = s;
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
      // let splitCode = [",", " ", ";"];
       let splitCode = ["|",",", " ", ";","。","；","，","."];
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
      // s = s.replace(/[^\d\,\;\|\:\s\t\n]/g, "");
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
      let splitCode = ["|", " ", ";","。","；","，","."];
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
       this.getRule();
      this.clearActive();
      this.historyVal=0;
      this.historyDate=0;
      this.zhudanList=[]
      this.getPkOpen()
      // this.getnotOpen()
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
      // this.$refs.moneyBet.innerHTML=this.palyListData[this.palyListCodeNum].prize[0].prize
      if(n=='dg7'||n=='dg0h3dg7'||n=='h3bd'){
        console.log(90)
        if(this.lotteryId>1&&this.lotteryId!=37){
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
      this.getnotOpen()
    },
    typeNumId: function () {
      this.clearActive();
      this.getnotOpen()
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
      if (c == "Képbằng"||c == "Double equal") {
        this.directArr = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99];
      } else if (c == "Chẵn"||c=="Even") {
        for (var n = 0; n < 100; n++) {
          if (n % 2 == 0) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Lẻ"||c=="Odd") {
        for (var n = 0; n < 100; n++) {
          if (n % 2) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Tài"||c=='Big') {
        for (var n = 0; n < 100; n++) {
          if (n > 49) {
            this.directArr.push(n);
          }
        }
      } else if (c == "Xỉu"||c=='Small') {
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
    ...mapMutations(["SETCHAT","SETALLLOTTERTGAME"]),
  getnotOpen(){
          this.notOpenList=[]
          this.$http.get('/api/lottery/notopencount',{params:{lottery_id:this.lotteryId,play_code:this.palyListCode,field_mode:this.typeNumId}}).then(res=>{
          if(res.data.code=='1'){
            this.notOpenList=res.data.data
          }
          })
        },
   getRecentDay(day){
    var today = new Date();
    var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
    today.setTime(targetday_milliseconds);
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear+"-"+tMonth+"-"+tDate;
},
  doHandleMonth(month){
      var m = month;
      if(month.toString().length == 1){
          m = "0" + month;
      }
      return m;
  },
    allsubmit(){
      this.submitPlay(1)
     setTimeout(() => {
        this.showDialog()
     },300);
    },
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
    
    goGameRule(){
      window.open('/gameRule/'+this.lotteryId)
    },
   
      

 

    
   
  
    shareOrder(i){
            i.order_no=this.shareOrderNum
            let d = this.globalPpproach.checkIsEncrypt(i)
            this.$http.post('/api/chatroom/share', d).then(res=>{
              if(res.data.code==1){
                 this.$message({
              message:this.$t('lotteryGame.text3[0]'),
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
          message: this.$t('lotteryGame.text3[1]'),
          type: "warning",
        });
        return;
      }
      if(this.allMoney>this.yuMoney.balance){
          this.$message({
              message: this.$t('lotteryGame.text3[2]'),
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
        cc=this.$t('lotteryGame.text2[1]')
      }
      if(i=='small'){
        cc=this.$t('lotteryGame.text2[2]')
      }
      if(i=='odd'){
        cc=this.$t('lotteryGame.text2[3]')
      }
      if(i=='even'){
        cc=this.$t('lotteryGame.text2[4]')
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
      this.getGames();
      this.getNewOpen();
      this.getDjs();
      this.getBalance();
      this.getZjzd();
      //  this.getRule();
       
    },
    async getDjs(){
      let res = await this.$http.get('/api/lottery/allowtime',{params:{
        lottery_id:this.lotteryId
      }})
      
        this.xzIssueMess = res.data.data;
        this.startInterval();
    },
    showCurr(id){
      let a = this.lotteryGames ;
      for(let i = 0,len = a.length;i<len;i++){
        for(let j = 0,lenj = a[i].list.length;j<lenj;j++){
           for(let k =0,lenk = a[i].list[j].list.length;k<lenk;k++){
             if(a[i].list[j].list[k].code == id){
               console.log(i)
               return i;
             }
           }
        }
        
        
      }
      // let c = 0
      // if(id==1){
      //   c=3
      // }else if(id<16&&id>1){
      //   c=2
      // }else if(id>15&&id<37){
      //   c=1
      // }else if(id==37){
      //   c = 0;
      // }
      // return c;
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

    async getPlaygroup() {
      let res = await this.$http.get("/api/guess/playgroup/", {
        params: { lottery_id: this.lotteryId, client_type: 4 },
      });
      if (res.data.code == 1) {
        this.palyUnit = res.data.data;
        this.palyList = res.data.data[0].children;
        this.playGroupCode= res.data.data[0].code
        this.getPlayList();
      }
    },
    async getPlayList() {
      this.loading = true;
      let res = await this.$http.get("/api/guess/playlist", {
        params: {
          lottery_id: this.lotteryId,
          group_code:this.lotteryId>44?'':this.playGroupCode,
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
        this.getnotOpen()
      }
      this.loading = false;
    },
    async getRule() {
      let res = await this.$http.get("/api/guess/playrule", {
        params: { lottery_id: this.lotteryId,play_code:this.playGroupCode=='interest'&&this.lotteryId<45?'dg0h2i':this.palyListCode},
      });
      if (res.data.code == 1) {
       this.ruleText=res.data.data
      }
    },
     async getPkOpen() {
        let res = await this.$http.get("/api/lottery/history/", {
        params: { lottery_id: this.lotteryId, belong_date:this.selectDate[this.historyDate]},
      });
      if (res.data.code == 1) {
        this.pkHistory=res.data.data
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
        // this.startInterval();
      }
    },
    storyChange(i) {
      // alert(this.historyVal)
    },
    pkstoryChange(){
      this.getPkOpen()
    },  
    startInterval() {
      clearInterval(this.djsInterval);
      this.djsInterval = setInterval(() => {
        if (this.xzIssueMess.closetime <= 0) {
          this.djstime1 = this.$t('lotteryGame.text3[3]');
           this.hour = ['-','-'];
          this.second =  ['-','-'];
          this.min =  ['-','-'];
          this.getDjs();
        } else {
          this.hour = this.count(this.xzIssueMess.closetime,true).hour;
          this.second =  this.count(this.xzIssueMess.closetime,true).sec;
          this.min =  this.count(this.xzIssueMess.closetime,true).min;
        }
        if (this.next_countdown <= 0) {
          this.djstime2 = this.$t('lotteryGame.text3[4]');
          this.getNewOpen();
          if(this.historyDate<1){
            this.getPkOpen()
          }
          if(this.$refs.orderBox){
            this.$refs.orderBox.getRecordList(1);
          }
        } else {
          // this.djstime2 = this.count(this.next_countdown);
        }
        this.xzIssueMess.closetime--;
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
    
    },
    // 彩种切换
    changeLottery(index, v) {
      this.lotteryId = v.code;
      this.currLotteryName = v.name;
      this.showAllLottery = false;
      //开奖
      this.getNewOpen();
      this.getDjs();
      this.xiazhu();
      //玩法说明
      // this.getRule();
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
    submitPlay(val) {
      function group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
          newArray.push(array.slice(index, (index += subGroupLength)));
        }
        return newArray;
      }
 

      if (this.typeNumId == "single") {
        if (!this.zhudanNum) {
           if(val!=1){
            this.$message({
            message: this.$t('lotteryGame.text[20]'),
            type: "warning",
          });
           }
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
          issue: this.xzIssueMess.issue,
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
              if(val!=1){
                this.$message({
                message: this.$t('lotteryGame.text3[5]'),
                type: "warning",
              });
              }
              
              return;
            }else{
              oddnum=this.directArr.length/this.palyListCode.replace(/[^\d]/g, " ")
            }
          } else {
            if (this.directArr.length < 1) {
              if(val!=1){
                this.$message({
                message: this.$t('lotteryGame.text3[5]'),
                type: "warning",
              });
              }
              return;
            }else{
              oddnum=this.directArr.length
            }
          }
          let zhudan = {
            issue:this.xzIssueMess.issue,
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
              if(val!=1){
                this.$message({
                message: this.$t('lotteryGame.text3[5]'),
                type: "warning",
              });
              }
              return;
            }
            if(this.playGroupCode=='interest'){
               this.palyArr.forEach((a,d)=>{
                a.forEach((c, v) => {
                 let palyNum=1
                 if(isNaN(c)){
                   palyNum=0
                 }
               if(this.palyListData[d].code=='pk3zh'){
                 palyNum=undefined
                }
              let zhudan = {
                issue: this.xzIssueMess.issue,
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
                issue: this.xzIssueMess.issue,
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
             if(val!=1){
                this.$message({
                message: this.$t('lotteryGame.text3[5]'),
                type: "warning",
              });
              }
              return;
            }
            let zhudan = {
              issue: this.xzIssueMess.issue,
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
        issue: this.xzIssueMess.issue,
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
              this.$http.post('/nodeapi/toGames',{gameName:'lg_lottery',id:this.userinfo.id})
              let items1=res.data.items
              items1.forEach((v,a)=>{
                v.oneAmount=v.amount/v.multiple/v.nums
              })
             let shareContent={
        issue: res.data.issue,
        lottery_id: res.data.lottery_id,
        items: JSON.stringify(items1),
      }
      if(this.userinfo.user_id>0){
        alertComfirm({
          msg:this.$t('lotteryGame.text3[6]'),
          title:'tip',
          showCancelButton:true,
        },()=>{
          this.shareOrderNum=res.data.order_no;
          this.shareOrder(shareContent)
        },()=>{});
      }

      if(this.$refs.orderBox){
        this.$refs.orderBox.getRecordList(1);
      }
    
      
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
      // this.tzBox = false;
      this.YJSBox = false;
      this.WJSBox = true;
    },
    //已结算
    openYJS() {
      // this.tzBox = false;
      this.WJSBox = false;
      this.YJSBox = true;
    },
    count(time,f) {
      let t = "";
      let h = "";
      let d = "";
      let min = "";
      let second = "";
      let obj = {};
       second = parseInt(time) % 60;
        min = parseInt((time / 60) % 60);
        // h = parseInt((parseInt(time / 60) / 60) % 24);
        h = parseInt((parseInt(time / 60) / 60));
        d = parseInt(parseInt(time / 60) / 60 / 24);
        second = second >= 10 ? second : "0" + second;
        min = min >= 10 ? min : "0" + min;
      if (time > 60) {
       
        if (!h) h = "";
        else h = h >= 10 ? h : "0" + h;
        
        if (h >= 1) {
            t = h + ":" + min + ":" + second;
          } else {
            t = min + ":" + second;
          }
           obj = {
        hour:h.toString().split(""),
        min:min.toString().split(""),
        sec:second.toString().split("")
      }
      } else {
        t = "00:" + (time >= 10 ? time : "0" + time);
         obj = {
        hour:[],
        min:min.toString().split(""),
        sec:second.toString().split("")
      }
      }
      
      if(f) return obj;
      else return t;

    },
    changeSelect(index){
      this.tabIndex = index;
      // if(index==1){
      //   this.YJSBox = true;
      // }
    },
    changeNav(index){
      this.nav1Active =index;
      this.lotteryGamesList = this.lotteryGames[index].list;
      console.log( this.lotteryGamesList)
    },
    async getGames() {
            this.lotteryGames = this.allLotteryGame;
             if(this.lotteryGames.length)this.lotteryGamesList = this.lotteryGames[0].list;
            let res=  await this.$http.get('/api/lottery/games');
            if (res && res.data.code == 1) {
                this.lotteryGames = res.data.data || [];
                this.SETALLLOTTERTGAME(this.lotteryGames);
                this.lotteryGamesList = this.lotteryGames[0].list;
                 this.nav1Active = this.showCurr(this.lotteryId); 
            }
    },
    qhLeftTab(item,index){
        this.palyListCode = item.code;
        this.palyListCodeNum = index;
        this.typeNumId ='duplex';
        // this.getnotOpen()
        this.getRule();
        this.clearActive();
        
    }
  },
};
</script>
<style lang="less">
.jieS{
  .tool-btn {
        width: 100%;
        // background: #1b74c8;
        text-align: center;
        height: 32px;
        line-height: 32px;
        width: 205px;
        color: #333;
        border: 1px solid #1b74c8;
        margin-right: 15px;
        border-radius: 5px;
        cursor: pointer;
        &:hover ,&.active{
          color: #fff;
          background: #439cff;
        }
      }
      span {
        display: block;
        color: #555;
      }
}

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
  .bets-box1 .bet-list .item span:nth-of-type(2) {
    // width: 22%;
    width:20%;
  }
  .bets-box1 .bet-list .item span:nth-of-type(4) {
    width: 16%;
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
.bets-box1 {
  .bet-list {
    width: 96%;
    // background: url("../../assets/imgaes/game/bet-bg.png") no-repeat;
    background-size: 100% 100%;
    background: #fff;
    margin: 0 auto;
    // padding: 0 5px 0 5px;
    position: relative;
    .table-title {
      line-height: 40px;
      font-size: 16px;
      color: #555;
      text-align: center;
    }
    .table-name1 {
      line-height: 30px;
      background: #e7f0fc;
      border-top: 1px solid #ececec;
      border-bottom: 1px solid #ececec;
      overflow: hidden;
      span {
        // border-right: 1px solid #ececec;
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
        width:14%;
        line-height: 37px;
        text-align: center;
        float: left;
        &:nth-of-type(1),
        &:nth-of-type(2),
        &:nth-of-type(3) {
          width: 14%;
        }
         &:nth-of-type(4) {
          // width: 14%;
        }
        &:last-of-type {
          width: 15%;
        }
        &.last {
          color: #ff4646;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    &::before{
      position:absolute;
      content:'';
      left: -0.5%;
      top: 0;
      border-radius: 20px;
      height: 6px;
      width: 101%;
      background: #E7E7E7;

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
  min-width: 1400px;
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
//   .play-tab1 {
//     padding-top: 7px;
//     padding-bottom: 5px;
//     margin-left: 17%;
//     .lhc {
//       padding: 0 15px !important;
//     }
//     span {
//       display: inline-block;
//       padding: 0 5px;
//       min-width: 74px;
//       height: 27px;
//       line-height: 27px;
//     //   position: relative;
//       font-size: 14px;
//       color: #555;
//       background: #fff;
//       cursor: pointer;
//       border-radius: 4px;
//       border: 1px solid #555;
//       text-align: center;
//       margin-right: 16px;
//       &.active {
//         // color: #ff5f5f;
//         background: #287BE1;
//         color:#fff;
//         border: none;
//       }
//     //   &:before {
//     //     content: "";
//     //     position: absolute;
//     //     width: 2px;
//     //     height: 18px;
//     //     background: #cccccc;
//     //     right: 0;
//     //     top: 0;
//     //   }
//     }
//     .gz-item{
//       color: #000;
//       border:none;
//       background: none;
//       img{
//         width: 24px;
//         height: 24px;
//       }
//       &:before {
//         content: "";
//         position: absolute;
//         width: 2px;
//         height: 18px;
//         background: #cccccc;
//         opacity: 0;
//       }
//     }
//   }
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
        background: #f5f5f5;
        border-radius: 5px;
        overflow: hidden;
        .info-mx {
          // padding: 10px;
          padding: 20px 0 0 15px;
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
    .play-tzMain1 {
    //   width: 81.5%;
      width: 88%;
      font-size: 14px;
      margin-left: 6%;
      margin-bottom: 12px;
      .tz-content {
                width: 75.2%;
                min-height: 790px;
                background: #fafafa;
                border-radius: 6px;
                // padding: 8px;
                min-width: 916px;
                margin-top: 10px;
            .play-tab1 {
                // padding-top: 7px;
                // padding-bottom: 5px;
                padding:7px 0 5px 23px;
                // margin-left: 17%;
                .lhc {
                padding: 0 15px !important;
                }
                span {
                display: inline-block;
                padding: 0 5px;
                min-width: 74px;
                height: 27px;
                line-height: 27px;
                //   position: relative;
                font-size: 14px;
                color: #555;
                background: #fff;
                cursor: pointer;
                border-radius: 4px;
                border: 1px solid #555;
                text-align: center;
                margin-right: 16px;
                &.active {
                    // color: #ff5f5f;
                    background: #287BE1;
                    color:#fff;
                    border: none;
                }
                //   &:before {
                //     content: "";
                //     position: absolute;
                //     width: 2px;
                //     height: 18px;
                //     background: #cccccc;
                //     right: 0;
                //     top: 0;
                //   }
                }
                .gz-item{
                color: #000;
                border:none;
                background: none;
                img{
                    width: 24px;
                    height: 24px;
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
            .plv{
                //  padding: 0 21px 0 24px;
                // background: #fff;
                padding: 19px 21px 24px 23px;
                .peilv{
                    height: 50px;
                    line-height: 50px;
                    font-size: 26px;
                    font-weight: bold;
                    // width: 239px;
                    border: 1px solid rgba(0, 0, 0, 0.2);
                    box-sizing: border-box;
                    .pl-icon{
                        display: inline-block;
                        background:url('../../assets/imgaes/newLotteryGame/pl-bg.png')no-repeat ;
                        background-size: cover;
                        // width: 128px;
                        padding:0 38px;
                        position: relative;
                         color: #fff;
                        &::before{
                            position: absolute;
                            content: '';
                             width: 27px;
                                height: 27px;
                                background: url('../../assets/imgaes/newLotteryGame/peilv.png')no-repeat;
                                background-size: contain;
                                left: 6px;
                                top: 11px;
                        }
                    }
                    .pl-color{
                        color:#D40915;
                        width: 109px;
                        display: inline-block;
                        text-align: center;
                    }
                }
                .kefu{
                    font-size: 16px;
                     line-height: 50px;
                     cursor: pointer;
                     i{
                        display: inline-block;
                        vertical-align: middle;
                        width: 28px;
                        height: 28px;
                        background: url('../../assets/imgaes/newLotteryGame/kefu-icon.png')no-repeat;
                        background-size: contain;
                        right: 44px;
                        top: 14px;
                     }

                }
            }
             .select-tab{
                // border: 1px solid #287BE1;
                border-radius:4px;
                // width: 382px;
                // margin-bottom: 10px;
                padding-left:23px;
                li{
                    display: inline-block;
                    cursor: pointer;
                    // width: 128px;
                    // width: 33.33%;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    font-size: 14px;
                    padding: 0 10px;
                    // border-right: 1px solid #287BE1;
                    border: 1px solid #287BE1;
                    border-right: none;
                    &:nth-last-child(1){
                        border-right:  1px solid #287BE1;
                        border-radius: 0 4px 4px 0;
                    }
                    &:nth-child(1){
                        // border-right:  1px solid #287BE1;
                        border-radius:4px 0 0 4px;
                    }
                    &.active{
                        background: #287BE1;
                        color: #fff;
                    }
                }
            }
            .title-tab{
                line-height: 51px;
                height: 51px;
                overflow: hidden;
                background: #1B8AC8;
                position: relative;
                .el-dropdown{
                    width: 162px;
                    text-align: center;
                    font-size: 22px;
                    color: #fff;
                    cursor: pointer;
                    &.active{
                    background: linear-gradient(90deg, #1486FF 14.39%, #4BA1FF 96.58%);
                    }
                }
                // .lottery-box{
                //     ul{
                //         width: 670px;
                //         li{
                //             height:50px;
                //             line-height: 50px;
                //             font-size: 18px;
                //             color: #fff;
                //             border-bottom: 2px solid #c4c4c4;
                //             background: #35A9EA;
                //             &:nth-of-type(2n){
                //                 background: #50BDFA;
                //             }
                            
                //         }
                //     }
                // }
                .rule-icon{
                    cursor: pointer;
                    display: block;
                    width: 20px;
                    height: 24px;
                    position: absolute;
                    background: url('../../assets/imgaes/newLotteryGame/rule-icon.png')no-repeat;
                    background-size: contain;
                    right: 13px;
                    top: 14px;
                }
            }
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
          padding-left: 23px;
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
          .game-tabs1 {
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
                line-height: 35px;
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
            // height: 109px;
            height: 81px;
            color: #555;
            // padding-top: 35px;
            padding-top: 9px;
            padding-left:23px;
            &:nth-of-type(even) {
              background: #f5f5f5;
            }
            dt {
              width: 78px;
              line-height: 30px;
              height: 35px;
              text-align: center;
              margin-right: 30px;
              margin-top: 17px;
              background: url("../../assets/imgaes/newLotteryGame/bg-grey.png") no-repeat;
              background-size: contain;
              &.active {
                color: #fff;
                background: url("../../assets/imgaes/newLotteryGame/bg-active.png") no-repeat;
                background-size: contain;
              }
            }
            .num {
              margin-top:10px;
              span {
                width: 44px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                background: #ffffff;
                border: 1px solid #d1d1d1;
                box-sizing: border-box;
                box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                float: left;
                margin-right: 5px;
                cursor: pointer;
                position: relative;
                &.active {
                  color: #fff;
                  background: linear-gradient(180deg, #8ad5ff 0%, #1f4ff8 100%);
                  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
                  border-color: #8ad5ff;
                }
                i{
                width:18px;
                height: 18px;
                line-height: 18px;
                font-size: 9px;
                color: #787878;
                text-align: center;
                background: #ccc;
                border-radius: 50%;
                position: absolute;
                top: -9px;
                right: -5px;
                &.numorange-bg{
                 color: #fff;
                 background: #FF3232;
              }
              &.numblue-bg{
                 color: #fff;
                 background: #287BE1;
              }
              }
              }
            }
            .options {
              width: 200px;
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
                width:18px;
                height: 18px;
                line-height: 18px;
                font-size: 9px;
                color: #787878;
                text-align: center;
                background: #ccc;
                border-radius: 50%;
                position: absolute;
                top: -9px;
                right: -5px;
                &.numorange-bg{
                 color: #fff;
                 background: #FF3232;
              }
              &.numblue-bg{
                 color: #fff;
                 background: #287BE1;
              }
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
          .btn ,.white{
            width: 95px;
            height: 32px;
            font-size: 14px;
            color: #fff;
            background: #287be1;
            border-radius: 4px;
            margin-right: 10px;
            cursor: pointer;
            // &:nth-last-child(1){
            //     background: #fff;
            //     border: 1px solid #555;
            //     color:#555;
            // }
          }
          .orange {
            background: #facb70 !important;
          }
          .white{
            background: #fff;
                border: 1px solid #555;
                color:#555;
                margin-right: 21px;
          }
        }
        .qh-ls{
                
            margin-bottom: 24px;
            >span{
                display: inline-block;
                padding: 0 10px;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                &.active{
                    color:#287BE1;
                    position: relative;
                    &::before{
                        position: absolute;
                        content: '';
                        width: 63px;
                        height: 3px;
                        background: #287BE1;
                        bottom: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
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
    //   background: #f5f5f5;
      border-radius: 6px;
      padding: 8px;
        .tool-info {
        color: #6e7c9e;
        background: #f5f5f5;
        border-radius: 5px;
        overflow: hidden;
        padding-bottom: 24px;
        background: #F5F5F5;
      
        .info-mx {
          // padding: 10px;
          padding: 20px 0 0 15px;
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
          >span {
            
            margin-right: 25px;
            width: 61px;
            height: 61px;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
          }
          >div{
              span{
                  display: block;
                  line-height: 32px;
              }
          }
        }
      }
    .time{
        background: #fff;
        height: 105px;
        // width: 270px;
        border-radius: 4px;
        overflow: hidden;
        margin: 10px 0 10px 0;
            .time-title{
                background: #4999C6;
                color: #fff;
                font-size: 18px;
                padding-left: 5px;
                height: 44px;
                line-height: 44px;
            }
            div{
                
                >span{
                    &:nth-child(1){
                            width: 90px;
                            display: inline-block;
                            font-size: 14px;
                            // vertical-align: middle;
                            padding-left: 10px;
                    }
                }
                i{
                    display: inline-block;
                    width: 20px;
                    height: 35px;
                    line-height: 38px;
                    background: url('../../assets/imgaes/newLotteryGame/time.png') no-repeat;
                    background-size: contain;
                    font-size: 18px;
                    text-align: center;
                    margin-left: 4px;
                }
                .djs{
                  font-size: 30px;
                  color: #555;
                  letter-spacing: 6px;
                  background: url('../../assets/imgaes/newLotteryGame/time1.png')no-repeat;
                  background-size: 100% 100%;
                  display: inline-block;
                  height: 42px;
                  width: 170px;
                  /* vertical-align: middle; */
                  padding-top: 13px;
                  padding-left: 7px;
                }
                .djs1{
                  position: relative;
                  em{
                    position: absolute;
                    left: 8px;
                    left: 10px;
                    top: -12px;
                    letter-spacing: 8px;
                    letter-spacing: 8.5px;
                    font-size: 22px;
                    color: #555;
                  }
                  i{

                    // &:nth-child(3),&:nth-child(6){
                    //   margin-right: 10px;
                    // }
                  }
                }
            
        }
    }
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
          background: #4999C6;
        //   margin-top: 8px;
        //   margin-bottom: 8px;
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
            &:nth-of-type(2n){
                background: #E8EFFA;
            }
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
      .history-box2{
         color: #555;
        font-size: 14px;
        background: #fff;
        ul{
          li{
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
            padding:4px 6px;
            justify-content: space-between;
            label{
              background: #1E8CFF;
              width: 26px;
              height: 26px;
              text-align: center;
              line-height: 26px;
              border-radius: 50%;
              color: #fff;
              margin-left: 10px;
            }
           em{
             width: 34px;
             text-align: center;
             &.da{
                  color: #7679E4;
              } 
              &.xi{
                color: #FC5C5D;
              }
              &.dan{
                color: #3CC1BE;
              }
              &.su{
                color: #FD9B4D;
              }
                &.da-line{
                color: #7679E4;
                text-decoration:line-through;
              } 
              &.xi-line{
                color: #FC5C5D;
                text-decoration:line-through;
              }
              &.dan-line{
                color: #3CC1BE;
                text-decoration:line-through;
              }
              &.su-line{
                color: #FD9B4D;
                text-decoration:line-through;
              }
           }
            i{
              display: block;
              width: 32px;
              height: 32px;
              &.dice1{
              background: url('../../assets/imgaes/newLotteryGame/dice1.png') no-repeat;
              background-size: 100% 100%;
              }
              &.dice2{
              background: url('../../assets/imgaes/newLotteryGame/dice2.png') no-repeat;
              background-size: 100% 100%;
              }
              &.dice3{
              background: url('../../assets/imgaes/newLotteryGame/dice3.png') no-repeat;
              background-size: 100% 100%;
              }
              &.dice4{
              background: url('../../assets/imgaes/newLotteryGame/dice4.png') no-repeat;
              background-size: 100% 100%;
              }
              &.dice5{
              background: url('../../assets/imgaes/newLotteryGame/dice5.png') no-repeat;
              background-size: 100% 100%;
              }
              &.dice6{
              background: url('../../assets/imgaes/newLotteryGame/dice6.png') no-repeat;
              background-size: 100% 100%;
              }
            }
          }
        }
      }
    }
    &.pink-content{
        .el-select-dropdown__item.selected {
          color:#FB7772 !important;
    // color: #d63e35;
  }
  .jieS{
        .tool-btn{
          border-color: #FB7772 !important;
          color: #FB7772 !important;
          &.active,&:hover{
            color:#fff!important;
            background: #FB7772 !important;
          }
        }
      }
      .title-tab{
        background: #EB605B!important;
        .el-dropdown.active{
          background: linear-gradient(90deg, #FB7772 0%, #FFD1A7 100%)!important;
        }
      }
      .plv .kefu i{
        background: url('../../assets/imgaes/skin/pink/kefu-icon.png')no-repeat!important;
        background-size: contain!important;
      }
      .plv i.pl-icon{
        background: url('../../assets/imgaes/skin/pink/pl-bg.png')no-repeat!important;
        background-size: cover!important;
      }
      .qh-ls span.active::before{
        background: #EB605B!important;
      }
      .qh-ls span.active{
         color: #EB605B!important;
      }
      .time .time-title{
        background: #EB9592!important;
      }
      .history-select .el-select{
        background: #EB9592!important;
      }
      .play-tab1{
        span.active{
          background: #FB7772!important;
        }
      }
      .play-tool{
        .tool-btn{
          background: #FB7772;
          &:hover {
            background: #FF8F8B;
          }
        }
      }
     
      .game-tabs1{
        // border: 1px solid #FB7772 !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #FB7772 !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #FF9793 0%, #FFA9A6 100%) !important;
      }
      .tab-left li.active,.game-tabs1 li.active{
        background: #FB7772 !important;
        color: #fff !important;
      }
      .game-tabs1 li{
        // border-right: 1px solid #FB7772 !important;
        border: 1px solid #FB7772 !important;
        border-right:none !important;
        &:nth-last-child(1){
          border-right: 1px solid #FB7772 !important;
        }
        color: #FB7772 !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/pink/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        // background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        // border-color: #FAE952 !important;
        background: linear-gradient(180deg, #FFDAA2 0%, #FB7772 100%)!important;
        border-color: #FFDAA2 !important;
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
              .el-select-dropdown__item.selected {
          color:#02A2C1!important;
     // color: #d63e35;
   }
      .jieS{
        .tool-btn{
          border-color: #02A2C1!important;
          color: #02A2C1!important;
          &.active,&:hover{
            color:#fff!important;
            background: #02A2C1!important;
          }
        }
      }
       .title-tab{
        background: #02A2C1!important;
        .el-dropdown.active{
          background: linear-gradient(90deg, #00B4D8 0%, #35DDFF 100%)!important;
        }
      }
      .plv .kefu i{
        background: url('../../assets/imgaes/skin/blue/kefu-icon.png')no-repeat!important;
        background-size: contain!important;
      }
      .plv i.pl-icon{
        background: url('../../assets/imgaes/skin/blue/pl-bg.png')no-repeat!important;
        background-size: cover!important;
      }
      .qh-ls span.active::before{
        background: #00B4D8!important;
      }
      .qh-ls span.active{
         color: #00B4D8!important;
      }
      .time .time-title{
        background: #44B1C7!important;
      }
      .history-select .el-select{
        background: #44B1C7!important;
      }
       .play-tab1{
        span.active{
          background:#00B4D8!important;
        }
      }
      .play-tool{
        .tool-btn{
          background: #00B4D8;
          &:hover {
            background: #00C5ED;
          }
        }
      }
     .game-tabs1{
        // border: 1px solid #00B4D8 !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #00B4D8 !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #00C5ED 0%, #05D5FF 100%) !important;
      }
      .tab-left li.active,.game-tabs1 li.active{
        background: #00B4D8 !important;
        color: #fff !important;
      }
      // .game-tabs1 li{
      //   border-right: 1px solid #00B4D8 !important;
      //   color: #00B4D8 !important;
      // }
       .game-tabs1 li{
        // border-right: 1px solid #FB7772 !important;
        border: 1px solid #00B4D8 !important;
        border-right:none !important;
        &:nth-last-child(1){
          border-right: 1px solid #00B4D8 !important;
        }
        color: #00B4D8 !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/blue/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        // background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        // border-color: #FAE952 !important;
        background: linear-gradient(180deg, #8AFFE3 0%, #00B4D8 100%) !important;
        border-color: #8AFFE3 !important;
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
      .el-select-dropdown__item.selected {
          color:#57C7A7!important;
    // color: #d63e35;
      }
      .jieS{
        .tool-btn{
          border-color: #57C7A7!important;
          color: #57C7A7!important;
          &.active,&:hover{
            color:#fff!important;
            background: #57C7A7!important;
          }
        }
      }
       .title-tab{
        background: #08AD7E!important;
        .el-dropdown.active{
          background: linear-gradient(90deg, #08D99D 0%, #14FFBC 100%)!important;
        }
      }
      .plv .kefu i{
        background: url('../../assets/imgaes/skin/green/kefu-icon.png')no-repeat!important;
        background-size: contain!important;
      }
      .plv i.pl-icon{
        background: url('../../assets/imgaes/skin/green/pl-bg.png')no-repeat!important;
        background-size: cover!important;
      }
      .qh-ls span.active::before{
        background: #09B584!important;
      }
      .qh-ls span.active{
         color: #09B584!important;
      }
      .time .time-title{
        background: #57C7A7!important;
      }
      .history-select .el-select{
        background: #57C7A7!important;
      }
       .play-tab1{
        span.active{
          background: #09B584!important;
        }
      }
      .play-tool{
        .tool-btn{
          background: #09B584;
          &:hover {
            background: #08D99D;
          }
        }
      }
      .game-tabs1{
        // border: 1px solid #08D99D !important;
      }
      .play-timer,.bet-num .btn,.history-title{
        background: #08D99D !important;
      }
      .bet-btns .btn{
        background: linear-gradient(90deg, #08D99D 0%, #14FFBC 100%) !important;
      }
      .tab-left li.active,.game-tabs1 li.active{
        background: #08D99D !important;
        color: #fff !important;
      }
      // .game-tabs1 li{
      //   border-right: 1px solid #08D99D !important;
      //   color: #08D99D !important;
      // }
      .game-tabs1 li{
        // border-right: 1px solid #FB7772 !important;
        border: 1px solid  #08D99D !important;
        border-right:none !important;
        &:nth-last-child(1){
          border-right: 1px solid  #08D99D !important;
        }
        color:  #08D99D !important;
      }
      .play-number dl dt.active{
        background: url("../../assets/imgaes/skin/green/dt-bg2.png") no-repeat !important;
        background-size: contain !important;
      }
      .play-number dl .num span.active{
        // background: linear-gradient(180deg, #FAE952 0%, #AE8008 100%) !important;
        // border-color: #FAE952 !important;
       background: linear-gradient(180deg, #8AEAFF 0%, #09B584 100%)!important;
        border-color: #8AEAFF !important;
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
.lottery-box{
  left: 50px!important;
    ul{
        width: 670px;
        border-radius: 6px;
        overflow: hidden;
        li{
            // height:50px;
            line-height: 50px;
            font-size: 18px;
            color: #fff;
            // border-bottom: 2px solid #c4c4c4;
            background: #35A9EA;
            
            &:nth-of-type(2n){
                background: #50BDFA;
            }
            >span{
                display: inline-block;
                width:15%;
                background: #1B8AC8;
                text-align: center;
                
            }
            >div{
              display: inline-block;
              
              width: 85%;
              span{
                display:inline-block;
                // width: 24%;
                padding: 0 20px;
                cursor: pointer;
                text-align: center;
              }
            }
            border-bottom: 2px solid #c4c4c4;
        }
    }
}
</style>