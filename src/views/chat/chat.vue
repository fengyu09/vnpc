<template>
  <div id="chat">
    <!--直播间-->
    <div class="video-room clearfix">
      <!--播放器-->
      <div class="video-container">
        <div class="video-top clearfix">
          <dl class="fl clearfix">
            <dt class="fl" v-if="liveData">
              <router-link
                target="_blank"
                :to="'/HostHome/' + liveData.anchor_id"
              >
                <img v-lazy="liveData.avatar" alt />
              </router-link>
            </dt>
            <dd class="fl" v-if="liveData">
              <h3 class="nick-name">
                {{ liveData.nickname }}
                <i
                  class="tj-zb"
                  v-if="
                    $store.state.codeToken &&
                    isHotPut != 0 &&
                    $store.state.userinfo.noble > 6
                  "
                  @click="tjfunc(liveData.anchor_id)"
                ></i
                ><i
                  class="tj-zb tj-zb-over"
                  v-if="
                    $store.state.codeToken &&
                    isHotPut == 0 &&
                    $store.state.userinfo.noble > 6
                  "
                  @click="tjfuncOver()"
                ></i>
              </h3>
              <p>
                <span class="online-room"
                  >房间ID：{{ liveData.anchor_id }}</span
                >
                <span class="online-num">{{ liveData.online }}</span>
                <span
                  class="online-time"
                  v-if="liveData.liveStartTimeTxt && liveData.liveEndTimeTxt"
                  >直播时间：{{ liveData.liveStartTime | filterTime }}-{{
                    liveData.liveEndTime | filterTime
                  }}</span
                >
                <span class="online-time" v-else>
                  直播时间：{{ liveData.liveStartTime | filterTime }}暂无{{
                    liveData.liveEndTime | filterTime
                  }}
                </span>
              </p>
            </dd>
          </dl>
          <div class="fr follow-box" v-if="liveData">
            <div class="follow-btn" @click="clickFollow" v-if="!isFollow">
              <span class="follow-text">关注</span>
              <span class="follow-num">{{ liveData.fans }}</span>
            </div>
            <!-- <el-button
              class="custom-btn follow-btn"
              @click="clickFollow"
              :loading="isFollowLoading"
              v-show="!isFollow"
            >
              <span class="follow-text">关注</span>
              <span class="follow-num">{{ liveData.fans }}</span>
            </el-button>

            <el-button
              class="custom-btn overFollow-btn"
              :loading="isFollowLoading"
              v-show="isFollow"
              @click="clickFollow"
            >
              <span class="follow-text">已关注</span>
              <span class="follow-num">{{ liveData.fans }}</span>
            </el-button> -->

            <div class="overFollow-btn" v-if="isFollow" @click="clickFollow">
              <span class="follow-text">已关注</span>
              <span class="follow-num">{{ liveData.fans }}</span>
            </div>
          </div>
        </div>
        <!--直播流-->
        <div class="video-content">
          <video-player
            ref="videoPlayer"
            class="video-player vjs-custom-skin"
            :playsinline="true"
            :options="playerOptions"
            @playing="playing()"
            @waiting="waiting()"
            v-show="liveData && liveData.live_status && isShowRtmp == 'noFire'"
          />
          <div
            id="mse"
            v-show="liveData && liveData.live_status && isShowRtmp == 'isFire'"
          ></div>

          <div class="no-open" v-if="liveData && !liveData.live_status">
            <div class="host-headImg">
              <img :src="liveData.avatar" alt />
            </div>

            <p class="no-open-tip">主播暂时不在家</p>
            <span class="next-open-time" v-if="liveData.liveStartTimeTxt"
              >下次开播时间：{{ liveData.liveStartTimeTxt }}</span
            >
          </div>
        </div>
        <!--礼物-->
        <div class="git-box" @mouseleave="gitMsg = false">
          <!-- <el-button
            class="custom-btn send-git-btn"
            v-if="chatData"
            @click="sendGift"
            :loading="btnLoading"
            :class="currGift.id ? 'active' : ''"
          >赠送</el-button>-->
          <div class="money-diamod">
            <i @click="refresh()" class="el-icon-refresh"></i>
            <p class="user-balance">
              <i></i>
              {{ balance ? balance : 0 }}
              <a href="javascript:;" @click="goRecharge">Nạp ngay ></a>
            </p>
            <p class="user-diamon">
              <i></i>
              {{ diamond ? diamond : 0 }}
              <a href="javascript:;" @click="goExcharge">兑换 ></a>
            </p>
          </div>
          <!-- <div class="show-img-msg" v-show="gitMsg">
            <dl class="clearfix">
              <dt class="fl">
                <img v-lazy="hoverGitMsg.icon" alt />
              </dt>
              <dd class="fl">
                <div class="name">{{ hoverGitMsg.name }}</div>
                <div class="amount">{{ hoverGitMsg.amount }}</div>
              </dd>
            </dl>
          </div>-->
          <!-- v-show="gitMsg"礼物弹窗1 -->
          <div
            :class="
              hoverGitMsg.grade == 'low' ? 'show-img-msg' : 'show-img-msg3'
            "
            v-show="gitMsg"
            class="show-img-msg4"
          >
            <dl class="clearfix">
              <dt class="fl">
                <img v-lazy="hoverGitMsg.icon" alt />
              </dt>
              <dd class="fl">
                <div class="name">{{ hoverGitMsg.name }}</div>
                <div class="amount">{{ hoverGitMsg.amount }}钻石</div>
              </dd>
              <dd class="fl">
                <el-button
                  class="custom-btn send-git-btn send-nun send-num"
                  v-if="chatData && hoverGitMsg.grade != 'low'"
                  @click="sendGift"
                  :loading="btnLoading"
                  :class="currGift.id ? 'active' : ''"
                  >赠送</el-button
                >
              </dd>
              <i></i>
            </dl>
            <span
              class="send-nun"
              v-for="(item, index) in sendGifNun"
              :key="index"
              v-if="chatData && hoverGitMsg.grade == 'low'"
              @click="CSendGiftNum(item.num)"
              :class="item.num == giftFormData.gift_num ? 'active' : ''"
              >{{ item.num }}</span
            >
            <el-button
              class="custom-btn send-git-btn send-nun"
              v-if="chatData && hoverGitMsg.grade == 'low'"
              @click="sendGift"
              :loading="btnLoading"
              :class="currGift.id ? 'active' : ''"
              >赠送</el-button
            >
            <i></i>
          </div>
          <!-- 礼物弹窗2 -->
          <!-- <div :class="hoverGitMsg.grade=='low' ?  'show-img-msg1':'show-img-msg2'" v-show="gitMsg1">
            <dl class="clearfix">
              <dt class="fl">
                <img v-lazy="hoverGitMsg.icon" alt />
              </dt>
              <dd class="fl">
                <div class="name">{{ hoverGitMsg.name }}</div>
                <div class="amount">{{ hoverGitMsg.amount }}钻石</div>
              </dd>
              <dd class="fl">
                <el-button class="custom-btn send-git-btn send-nun send-num" 
               v-if="chatData && hoverGitMsg.grade!='low'"
               @click="sendGift"
               :loading="btnLoading"
               :class="currGift.id ? 'active' : ''"
               >赠送</el-button>
              </dd>
            </dl>
            <span class="send-nun" v-for="(item,index) in sendGifNun" :key="index" 
                v-if="chatData && hoverGitMsg.grade=='low'">{{item}}</span>
            <el-button class="custom-btn send-git-btn send-nun" 
               v-if="chatData && hoverGitMsg.grade=='low'"
               @click="sendGift"
               :loading="btnLoading"
               :class="currGift.id ? 'active' : ''"
               
               >赠送</el-button>
          </div>-->

          <!--首充/消息--->
          <div class="first-charge-msg">
            <div class="first-charge">
              <img
                src="../../assets/imgaes/chat/first_charge.png"
                alt
                v-if="isFirst"
                @click="showRecharge"
              />
              <img
                style="margin-left: 20px"
                @click="openDZP()"
                src="../../assets/imgaes/chat/dzp.png"
                alt=""
              />
            </div>
            <!-- 大转盘 -->
            <!-- <div class="dzp-box"><img src="../../assets/imgaes/chat/dzp.png" alt=""></div> -->
            <div class="git-msg">
              <span>
                <img src="../../assets/imgaes/chat/msg.png" alt />
                <marquee scrollAmount="3" scrolldelay="50" direction="left">
                  <span
                    v-for="(v, index) in systemMsg"
                    :key="index"
                    v-if="systemMsg.length"
                    >{{ index + 1 }}.{{ v.content }}&nbsp;&nbsp;&nbsp;</span
                  >
                  <span v-else>暂无公告</span>
                </marquee>
              </span>
            </div>
          </div>

          <!-- 礼物1 -->
          <div class="git-content">
            <ul v-if="chatData" style="overflow: inherit">
              <li
                v-for="(item, index) in gitList"
                :key="index"
                v-if="index < 10"
                :class="currGift.id == item.id ? 'active' : ''"
                @mouseenter="showGitImg(item, index)"
                style="overflow: inherit"
              >
                <div class="img-box">
                  <img v-lazy="item.icon" alt />
                </div>
                <i v-if="item.free_num">{{ item.free_num }}</i>
              </li>
            </ul>
            <div
              class="bd-btn"
              id="right-btn"
              :class="gblist == false ? 'right-btn' : 'right-btn1'"
              @click="gifBoxShow()"
            ></div>
          </div>
          <div class="fr balance-box clearfix">
            <div class="fr">
              <!--<p class="user-balance"><i></i>66.66<a href="">充值 ></a></p>-->
            </div>
          </div>
        </div>
        <div class="gbox-list" v-if="gblist == true">
          <div class="gif-nav">
            <ul class="clearfix">
              <li
                class="fl"
                v-for="(val, index) in gifNav"
                :key="index"
                :class="index == gifNow ? 'is-active' : ''"
                @click="chuangeGif(index)"
              >
                {{ val }}
              </li>
            </ul>
          </div>
          <div class="gif-content" @mouseleave="showhide()">
            <ul class="clearfix">
              <li
                v-for="(item, index) in gifConData1"
                :key="index"
                class="fl"
                :class="currGift.id == item.id ? 'active' : ''"
                @mouseenter="showGitImg1(item, index)"
              >
                <img v-lazy="item.icon" alt />
              </li>
            </ul>
            <div
              :class="
                hoverGitMsg.grade == 'low' ? 'show-img-msg1' : 'show-img-msg2'
              "
              class="show-img-msg5"
            >
              <dl class="clearfix">
                <dt class="fl">
                  <img v-lazy="hoverGitMsg.icon" alt />
                </dt>
                <dd class="fl">
                  <div class="name">{{ hoverGitMsg.name }}</div>
                  <div class="amount">{{ hoverGitMsg.amount }}钻石</div>
                </dd>
                <dd class="fl">
                  <el-button
                    class="custom-btn send-git-btn send-nun send-num"
                    v-if="chatData && hoverGitMsg.grade != 'low'"
                    @click="sendGift"
                    :loading="btnLoading"
                    :class="currGift.id ? 'active' : ''"
                    >赠送</el-button
                  >
                </dd>
              </dl>
              <span
                class="send-nun"
                v-for="(item, index) in sendGifNun"
                :key="index"
                v-if="chatData && hoverGitMsg.grade == 'low'"
                @click="CSendGiftNum(item.num)"
                :class="item.num == giftFormData.gift_num ? 'active' : ''"
                >{{ item.num }}</span
              >
              <el-button
                class="custom-btn send-git-btn send-nun"
                v-if="chatData && hoverGitMsg.grade == 'low'"
                @click="sendGift"
                :loading="btnLoading"
                :class="currGift.id ? 'active' : ''"
                >赠送</el-button
              >
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <!--聊天室-->
      <div class="fr fr-container">
        <div class="fr-tab-title">
          <span @click="Chatroom()" :class="currType == 1 ? 'active' : ''"
            >聊天室</span
          >
          <span @click="Jingcai()" :class="currType == 2 ? 'active' : ''"
            >竞猜</span
          >
        </div>
        <div class="fr chat-container" v-show="currType == 1">
          <!--普通用户 游客进入直播间提示-->
          <div class="showuser-In"></div>
          <div class="jinyan" v-if="liveData && !liveData.live_status">
            未开播禁止聊天
          </div>
          <!-- <div class="hellovip"  v-if="v.vip > 0 " v-for="(v,index) in vipData" :key="index">
                    <div class="hyvip"><i class="vip-type">VIP{{v.vip}}</i>贵族<i class="vip-name">{{v.userName}}</i>驾临直播间</div>
                </div> -->
          <!-- vipShow -->
          <div class="hellovip" v-if="vipShow">
            <!-- <div class="hyvip"><i class="vip-type">VIP{{hyvip}}</i>贵族<i class="vip-name">{{hyvipName}}</i>驾临直播间</div> -->
            <!-- <div class="hyvip">欢迎{{hyvip|filterGz}}<i class="vip-name">{{hyvipName}}</i>进入直播间222</div> -->
            <img
              :src="vipBg"
              alt=""
              srcset=""
              style="position: relative; z-index: 100"
            />
            <img
              :src="vipAvatar"
              alt=""
              srcset=""
              style="
                position: absolute;
                top: 12px;
                z-index: 99;
                width: 46px;
                left: 6px;
              "
            />
            <p :style="{ color: vipTextColor }">
              欢迎{{ hyvip | filterGz }}进入直播间
            </p>
          </div>

          <div
            class="clear-manage"
            @click="clearChatContent(2)"
            v-if="userType == 2"
          >
            <div class="gl-icon"></div>
            <span>管理清屏</span>
          </div>
          <div class="chat-bang">
            <div class="lb-ul">
              <ul v-show="bdList">
                <li v-for="(item, index) in bdList" :key="index">
                  <router-link :to="'/userMsg/' + item.user_id">
                    <img style="border-radius" v-lazy="item.avatar" alt />
                    <img
                      class="No1"
                      v-if="index == 0"
                      src="../../assets/imgaes/chat/01-min.png"
                      alt
                    />
                    <img
                      class="No1"
                      v-if="index == 1"
                      src="../../assets/imgaes/chat/02-min.png"
                      alt
                    />
                    <img
                      class="No1"
                      v-if="index == 2"
                      src="../../assets/imgaes/chat/03-min.png"
                      alt
                    />
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="left-btn bd-btn" @click="goLeft" v-if="isShowbL"></div>
            <div
              class="right-btn bd-btn"
              @click="goRight"
              v-if="isShowbR"
            ></div>
          </div>
          <el-scrollbar
            style="
              height: 596px;
              padding-top: 25px;
              width: 420px;
              background: #fff;
            "
            ref="myScrollbar"
          >
            <span
              v-if="!chatData"
              style="color: #ff513e; margin: 5px 20px; font-size: 16px"
              >聊天室loading...</span
            >
            <ul class="chat-content" v-show="chatData">
              <!--            <li v-for="v in chatData" :class="v.isAnchor?'host':'vip' + v.vip" >-->
              <li v-for="(v, index) in chatData" :key="index">
                <section
                  v-if="v.type == 'publish' && v.event != 'pushPlan'"
                  class="clearfix"
                >
                  <div
                    class="chat-photo fl"
                    @click="toUser(v)"
                    @dblclick="finedTpUser(v.userType, v.user_id)"
                  >
                    <img v-lazy="v.avatar" alt />
                  </div>
                  <div
                    class="chitchat fl"
                    :class="{
                      host: v.userType == 1,
                      admin: v.userType == 2,
                      ['vip' + v.vip]: v.userType == 0,
                    }"
                  >
                    <div class="clearfix">
                      <span
                        @click="muted(v)"
                        class="nick-name fl"
                        style="font-size: 14px"
                        :class="
                          UserId != v.user_id &&
                          v.userType == 0 &&
                          userType == 2
                            ? 'active'
                            : ''
                        "
                        >{{ v.userName }}</span
                      >
                      <span class="fr" style="font-size: 14px; color: #999">{{
                        v.sendTimeTxt
                      }}</span>
                    </div>

                    <span class="chat-say-content" v-html="v.text"></span>
                  </div>
                </section>
                <section
                  v-if="v.type == 'gift' && v.gift_type == 1"
                  :class="{
                    host: v.userType == 1,
                    admin: v.userType == 2,
                    ['vip' + v.vip]: v.userType == 0,
                  }"
                >
                  <span
                    class="nick-name"
                    @click="finedTpUser(v.userType, v.user_id)"
                    >{{ v.userName }}&nbsp;</span
                  >
                  <span class="say-content">
                    送给主播 {{ v.gift_num }} 个
                    <i style="color: #ff1c30">{{ v.gift_name }}</i>
                    &nbsp;
                    <img :src="v.icon" alt />
                    <i class="ljnum" v-if="v.ljNum != undefined"
                      >x{{ v.ljNum }}</i
                    >
                  </span>
                </section>
                <!--                            <section v-if="v.type == 'subscribe'"-->
                <!--                                     :class="{-->
                <!--                                      host: v.userType == 1,-->
                <!--                                      admin: v.userType == 2,-->
                <!--                                      ['vip' + v.vip]: v.userType == 0-->
                <!--                                    }"-->
                <!--                                        >-->
                <!--                                <span class="nick-name" @click="finedTpUser(v.userType,v.user_id)">{{ v.userName }}&nbsp;</span>-->
                <!--                                <span class="say-content">进入直播间</span>-->

                <!--                            </section>-->
                <section
                  v-if="v.type == 'gift' && v.gift_type == 4"
                  :class="{
                    host: v.userType == 1,
                    admin: v.userType == 2,
                    ['vip' + v.vip]: v.userType == 0,
                  }"
                >
                  <span
                    class="nick-name"
                    @click="finedTpUser(v.userType, v.user_id)"
                    >{{ v.userName }}&nbsp;</span
                  >
                  <span class="say content">
                    发送了一个
                    <i style="color: #ff1c30">{{ v.gift_price }}元红包</i>
                    ，大家快去抢啊
                  </span>
                </section>
                <section
                  class="clearfix new-follow"
                  v-if="v.type == 'publish' && v.event == 'pushPlan'"
                >
                  <div class="chat-photo fl">
                    <img v-lazy="v.avatar" />
                  </div>
                  <div class="chitchat fl">
                    <div class="clearfix">
                      <span
                        class="nick-name fl active"
                        style="font-size: 13px"
                        >{{ v.userName }}</span
                      >
                      <span
                        class="fr"
                        style="font-size: 10px; color: rgb(153, 153, 153)"
                        >{{ v.sendTimeTxt }}</span
                      >
                    </div>
                    <div class="type-period clearfix">
                      <span class="fl">{{ v.orders.lottery_cid }}</span>
                      <span class="fr">{{ v.orders.play_bet_issue }}期</span>
                    </div>
                    <ul class="table height">
                      <li class="title">
                        <span>玩法</span><span style="width: 22%">Số</span
                        ><span style="width: 22%">Tỷ lệ cược</span
                        ><span style="width: 30%">Tiền</span>
                      </li>
                      <li
                        class="gt-item"
                        v-for="(item, index) in typeof v.orders.order_detail ==
                        'string'
                          ? JSON.parse(v.orders.order_detail)
                          : v.orders.order_detail"
                        :key="index"
                      >
                        <span>{{ item.play_sec_cname }}</span>
                        <span style="width: 22%">{{
                          item.play_class_cname
                        }}</span>
                        <span style="width: 22%">{{
                          (item.play_odds - 0).toFixed(2)
                        }}</span>
                        <span style="width: 30%"
                          >{{ item.play_bet_sum }}
                          <!-- <i style="font-size:12px" v-if="v.orders.isBalance">余额</i><i style="font-size:12px" v-else>钻石</i>  -->
                          <i style="font-size: 12px" v-if="v.orders.is_bl_play"
                            >元</i
                          ><i style="font-size: 12px" v-else>钻石</i>
                        </span>
                      </li>
                    </ul>
                    <p class="btn-group">
                      <span
                        class="open-up"
                        v-if="
                          typeof v.orders.order_detail == 'string' &&
                          JSON.parse(v.orders.order_detail).length > 1
                        "
                        @click="showAll($event)"
                        >展开
                        <img
                          class="icon"
                          src="../../assets/imgaes/chat/zk-min.png"
                          alt=""
                      /></span>
                      <span
                        class="open-up"
                        v-if="
                          typeof v.orders.order_detail == 'object' &&
                          v.orders.order_detail.constructor == Array &&
                          v.orders.order_detail.length > 1
                        "
                        @click="showAll($event)"
                        >展开
                        <img
                          class="icon"
                          src="../../assets/imgaes/chat/zk-min.png"
                          alt=""
                      /></span>
                      <span
                        class="put-away"
                        style="display: none"
                        @click="hideAll($event)"
                        >收起
                        <img
                          class="icon"
                          src="../../assets/imgaes/chat/sq-min.png"
                          alt=""
                        />
                      </span>
                      <button
                        :class="{ 'follow-up': true, expire: !v.isExpire }"
                        @click="followOrder(v.orders, v.isExpire)"
                      >
                        跟投
                      </button>
                    </p>
                  </div>
                </section>
              </li>
            </ul>
          </el-scrollbar>
          <!--开红包提示-->
          <div
            class="red-tip"
            @click="checkRed('click')"
            v-if="redPaper.length"
          ></div>
          <div class="chat-toolbar">
            <div @click="showEmj = !showEmj">
              <div v-if="!showEmj" class="bq-icon"></div>
              <div v-if="showEmj" class="bq-icon1"></div>
              <span v-if="!showEmj">表情</span>
              <span v-if="showEmj" style="color: #ff1c30">表情</span>
            </div>
            <div @click="clearChatContent">
              <div class="qp-icon"></div>
              <span>清屏</span>
            </div>
            <div @click="specialEffects()">
              <div :class="special ? 'pb-icon' : 'pb-icon-clear'"></div>
              <!-- <div class="pb-icon-clear" v-if="special"></div> -->
              <span>{{ pingbi }}</span>
            </div>
          </div>
          <div class="footer-input">
            <div
              class="beyond-txt"
              v-if="isLenght && !this.$store.state.userinfo.user_id < 0"
            >
              {{ chatErr }}
            </div>
            <div class="say-box">
              <input
                @click="isLogin"
                id="textInput"
                class="barrage-input"
                ref="focusTextarea"
                type="text"
                placeholder="说点啥吧..."
                v-model="comment_text"
                @keyup.enter="sendMessage"
                v-if="
                  $store.state.userinfo.noble > 0 || !$store.state.codeToken
                "
              />
              <span
                v-if="$store.state.codeToken && !$store.state.userinfo.noble"
                class="no-vip"
                >骑士 即可发言哦~</span
              >

              <!-- textarea -->
              <!-- <div class="emoticon-icon" @click="showEmj = !showEmj"></div> -->
              <div
                class="send-btn"
                @click="sendChatMsg"
                :class="comment_text.length ? 'active' : ''"
              >
                发送
              </div>
            </div>
            <div class="redpack-icon" @click="showRed"></div>
          </div>

          <!--枪红包1-->
          <div class="red-box" v-if="red1">
            <!--显示大红包-->
            <div class="remove-icon" @click="red1 = false"></div>
            <div class="red-content show-red">
              <div
                class="open-btn"
                @click="sendReceiveRed"
                @dblclick="twoClickRed"
              ></div>
            </div>
          </div>

          <!--枪红包2-->
          <div class="red-box" v-if="red2">
            <!--显示大红包-->
            <div class="remove-icon" @click="red2 = false"></div>
            <!--显示红包多少钱-->
            <div class="red-content show-money">
              <p class="msg-tip">恭喜获得</p>
              <span class="money">{{ redInfo.amount | filterMoney }}</span>
              <div class="head-img">
                <img
                  :src="redInfo.send_user_avatar"
                  alt
                  v-if="redInfo.send_user_avatar"
                />
                <img src="../../assets/imgaes/chat/2.jpg" alt v-else />
              </div>
              <span class="user-name">{{ redInfo.send_user_name }}</span>
              <p class="zfy">{{ redInfo.send_text }}</p>
            </div>
          </div>

          <!--枪红包3-->
          <div class="red-box" v-if="red3">
            <div class="remove-icon" @click="red3 = false"></div>
            <!--手慢了-->
            <div class="red-content show-no-money">
              <p class="ay-tip">哎呀~</p>
              <span class="low-tip">手速慢了哦，下次要加油呀！</span>
              <div class="head-img">
                <img
                  :src="redInfo.send_user_avatar"
                  alt
                  v-if="redInfo.send_user_avatar"
                />
                <img src="../../assets/imgaes/chat/2.jpg" alt v-else />
              </div>
              <span class="user-name">{{ redInfo.send_user_name }}</span>
              <p class="zfy">{{ redInfo.send_text }}</p>
            </div>
          </div>

          <!--            礼物动画  -->
          <div
            id="demoCanvas"
            ref="demoCanvas"
            :class="isSpecia ? 'active' : ''"
          ></div>

          <!--                  一般礼物-->

          <div class="gifShow-box">
            <!-- <div class="gifShow" v-for="v in genGitData" :class="{gifShow:true,fadeInLeft:v.boxShowTime>1,fadeInShow:v.boxShowTime<=1,fadeInHide:v.boxShowTime<=1}"> -->
            <div
              class="gifShow"
              v-for="v in genGitData"
              :class="{
                gifShow: true,
                fadeInLeft: v.boxShowTime >= 2,
                fadeInShow: v.boxShowTime < 2,
                fadeInHide: v.boxShowTime <= 1,
              }"
            >
              <span class="tx">
                <img :src="v.avatar" alt />
              </span>
              <dl class="nickAGif">
                <dt :class="v.name.length >= 8 ? 'active' : ''">
                  {{ v.name }}
                </dt>
                <dd>
                  送出
                  <span>{{ v.gift_num }} 个 {{ v.giftName }}</span>
                </dd>
                <div class="gifts">
                  <img :src="v.icon" alt />
                </div>
              </dl>

              <div
                class="num"
                :class="{
                  num1: v.ljNum < 10,
                  num10: v.ljNum >= 10,
                  num100: v.ljNum >= 100,
                }"
              >
                <i>X</i>
                {{ v.ljNum }}
              </div>
              <!-- <div>{{v.boxShowTime}}</div> -->
            </div>
          </div>

          <keep-alive>
            <vme v-show="showEmj" ref="vmeChild"></vme>
          </keep-alive>
          <div class="cl-box">
            <div class="cl-item" v-if="clshow">
              <div class="icon"></div>
              <span
                >{{ lottery_id | filterLotteryName }}
                {{ clList[0].method_cname }}:
              </span>
              <span>{{ clList[0].result_c }}</span>
              <span class="font-red">{{ clList[0].nums }}期</span>
            </div>
          </div>
        </div>
        <!--竞猜-->
        <Quiz
          v-if="currType == 2"
          :lotteryId="lottery_id"
          :allLottery="allLottery"
          v-on:func="shareOrder"
          :followOrders="followOrders"
          :isFollowOrder="isFollowOrder"
        >
        </Quiz>
      </div>
    </div>
    <!-- 直播预告 -->
    <div class="prevue-list">
      <div class="prevue-header clearfix">
        <div class="biaoti fl">节目预告</div>
        <span
          class="fl"
          v-for="(e, index) in dayList"
          :key="index"
          @click="chuangeDay(e.name)"
          :class="day == e.name ? 'is-active' : ''"
          >{{ e.title }}</span
        >
      </div>
      <div class="prevue-content" v-if="gameRoomList.length">
        <el-tabs
          type="card"
          class="prevue-tab"
          @tab-click="handleClickPreview(gameRoomList[activeName1].room_id)"
          v-model="activeName1"
        >
          <el-tab-pane
            :label="i.name"
            v-for="(i, index) in gameRoomList"
            :key="index"
            :name="indexName"
            :class="'is-active'"
          >
            <div class="prevue-l" v-if="LivePreviewNew.length">
              <span class="prevue-line" v-if="LivePreviewNew.length > 1"></span>
              <span
                class="prevue-line p-line2"
                v-if="LivePreviewNew.length > 3"
              ></span>
              <span
                class="prevue-line p-line1"
                v-if="LivePreviewNew.length > 2"
              ></span>
              <el-scrollbar style="height: 339px">
                <ul class="clearfix">
                  <li
                    class="clearfix"
                    v-for="(ii, index) in LivePreviewNew"
                    :key="index"
                  >
                    <div class="clearfix">
                      <!-- <router-link :to="'/chat/' + ii.aid + '/' + ii.lottery_id"> -->
                      <div class="fl anchor-avatar" @click="toChat(ii)">
                        <span class="an-avatar">
                          <img v-lazy="ii.avatar" alt />
                        </span>
                        <span v-if="ii.livestatus == 1" class="is-livestatus">
                          <img src="../../assets/imgaes/main/zhibo.gif" alt />
                        </span>
                      </div>
                      <!-- </router-link> -->
                      <div class="host-details fl">
                        <div class="anchor-name clearfix">
                          <span class="anchor-name1">{{ ii.nickname }}</span>
                          <span class="anchor-icon" v-if="ii.tags.length">
                            <img v-lazy="ii.tags[0].icon" alt />
                          </span>
                          <span class="anchor-icon" v-else>
                            <img
                              src="../../assets/imgaes/main/sy_rmzb_qc@3x.png"
                              alt
                            />
                          </span>
                          <span
                            class="anchor-title"
                            v-if="ii.tags.length > 0"
                            >{{ ii.tags[0].title }}</span
                          >
                          <span class="anchor-title" v-else>清纯</span>
                        </div>
                        <div class="anchor-game">
                          {{ ii.name ? ii.name : "" }}
                        </div>
                        <div
                          class="anchor-time"
                          v-if="ii.starttime && ii.endtime"
                        >
                          {{ ii.starttime }} - {{ ii.endtime }}
                        </div>
                        <div class="anchor-time" v-else>暂无</div>
                      </div>
                      <div
                        :class="
                          ii.isFollow == false
                            ? 'anchor-follow'
                            : 'anchor-follow-no'
                        "
                        class="fr"
                        @click="PreviewFollow(ii)"
                      >
                        {{ ii.isFollow == false ? "关注" : "已关注" }}
                      </div>
                    </div>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
            <div class="prevue-no" v-if="!LivePreviewNew.length">
              暂时还没有预告哟~
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="prevue-content-no" v-if="!gameRoomList.length">
        正在加载
        <i class="el-icon-loading"></i>
      </div>
    </div>
    <!--开奖-->
    <div
      class="openNum-container"
      v-if="historyList.length && liveData.live_status"
    >
      <div class="clearfix top-title">
        <div class="fl">
          <h3>
            历史开奖
            <em>- {{ lottery_id | filterLotteryName }}</em>
          </h3>
        </div>
        <div class="fr select-time">
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
          <span class="fl time-title">Chọn ngày</span>
          <el-date-picker
            class="fl date_2"
            v-model="valueTime"
            align="center"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="Chọn ngày"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <div class="select-btn fl" @click="changeDate()">Kiểm tra</div>
        </div>
      </div>
      <div
        class="history_list"
        v-if="historyList.length && liveData.live_status"
      >
        <!-- 重庆时时彩 -->
        <table
          v-if="
            lottery_id == 1 ||
            lottery_id == 10 ||
            lottery_id == 28 ||
            lottery_id == 30 ||
            lottery_id == 31
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
            <td class="inputTime">{{ v.input_time }}</td>
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
        <table v-if="lottery_id == 5 || lottery_id == 14" class="table_3">
          <tr>
            <th>Thời gian</th>
            <th>期次</th>
            <th>Số</th>
            <!-- <th>
              <ul class="clearfix">
                <li
                  v-for="(itemm, indexx) in sTitle"
                  :key="indexx"
                  @click="changeType(itemm.index)"
                  :class="itemm.index == sTitleIndex ? 'onLi' : 'onLi1'"
                >{{ itemm.name }}</li>
              </ul>
            </th>
            <th>总和</th>
            <th>1 - 5 龙虎</th> -->
          </tr>
          <tr v-for="(v, index) in historyList" :key="index">
            <td class="inputTime">{{ v.input_time }}</td>
            <td>{{ v.issue }}</td>
            <td class="hiscode">
              <ul class="clearfix">
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  class="fc-bgColor"
                  style="margin: 0px 27px !important"
                >
                  {{ vv }}
                </li>
              </ul>
            </td>
            <!-- <td class="hiscode">
              <ul class="clearfix">
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  v-if="sTitleIndex == 1"
                >{{ vv }}</li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDx(4) | filterBgColor"
                  v-if="sTitleIndex == 2"
                >{{ vv | filterDx(4) }}</li>
                <li
                  v-for="(vv, index2) in v.code.split(',')"
                  :key="index2"
                  :class="vv | filterDs | filterBgColor"
                  v-if="sTitleIndex == 3"
                >{{ vv | filterDs }}</li>
              </ul>
            </td>
            <td class="guan_he">
              <ul class="clearfix">
                <li>{{ v.code | filtersSum }}</li>

                <li
                  :class="v.code | filtersSum | filterDx(22) | filterColor"
                >{{ v.code | filtersSum | filterDx(22) }}</li>

                <li
                  :class="v.code | filtersSum | filterDs | filterColor"
                >{{ v.code | filtersSum | filterDs }}</li>
              </ul>
            </td>
            <td class="long_hu">
              <ul class="clearfix">
                <li
                  class="fl"
                  :class="v.code | filterLhh('一v五') | filterColor"
                >{{ v.code | filterLhh("一v五") }}</li>
              </ul>
            </td> -->
          </tr>
        </table>

        <table v-if="lottery_id && lottery_id == 8" class="table_2">
          <tr>
            <th>日期</th>
            <th>期次</th>
            <th class="clearfix">
              <!--<div class="fl" style="margin-left: 90px;margin-right: -90px;">-->
              <div class style="display: inline-block">正码</div>
              <div class="fr">特码</div>
            </th>
            <th>
              <div>总和</div>
              <div>
                <ul class="clearfix">
                  <li>总数</li>
                  <li>单双</li>
                  <li>大小</li>
                  <!--<li>七色波</li>-->
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
                    <div class="fl six_code_c" :class="vv | filterSixBs">
                      {{ vv }}
                    </div>
                    <div class="fl" style="font-size: 16px; color: #666">
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
                <!--<li>{{v.code|filtersSum}}</li>-->
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
        </table>

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
                <!-- <li class="fl" @click="changeType(1)">显示号码</li>
                        <li class="fl" @click="changeType(2)">显示大小</li>
                <li class="fl" @click="changeType(3)">显示单双</li>-->
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
            <th>1-5龙虎</th>
          </tr>
          <tr v-for="(v, index) in historyList" :key="index">
            <td class="inputTime">{{ v.input_time }}</td>
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
          <!-- 重庆时时彩 -->
          <table
            v-if="
              lottery_id == 1 ||
              lottery_id == 10 ||
              lottery_id == 28 ||
              lottery_id == 30 ||
              lottery_id == 31
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
          </table>

          <table v-if="lottery_id == 8" class="table_2">
            <tr>
              <th>日期</th>
              <th>期次</th>
              <th class="clearfix">
                <div class="fl" style="margin-left: 90px; margin-right: -90px">
                  正码
                </div>
                <div class="fr">特码</div>
              </th>
              <th>
                <div>总和</div>
                <div>
                  <ul class="clearfix">
                    <li>总数</li>
                    <li>单双</li>
                    <li>大小</li>
                    <!--<li>七色波</li>-->
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
          </table>

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
          </table>

          <div
            style="
              height: 234px;
              text-align: center;
              line-height: 234px;
              background: #fff;
              color: #333;
            "
          >
            nodata
          </div>
        </div>
      </div>
    </div>

    <!--发红包-->
    <div class="fa-redpack" v-if="faRed">
      <div class="fa-content">
        <div class="remove-icon" @click="faRed = false"></div>
        <div class="title">直播间红包</div>
        <div class="input-box">
          <span class="label">Tiền</span>
          <input
            type="text"
            placeholder="请输入金额"
            v-model="redFormData.amount"
          />
          <span class="dw">元</span>
        </div>
        <div class="input-box">
          <span class="label">个数</span>
          <input
            type="text"
            placeholder="请填写个数"
            v-model="redFormData.num"
          />
          <span class="dw">个</span>
        </div>
        <div class="input-box">
          <span class="label">祝福</span>
          <input
            type="text"
            placeholder="恭喜发财"
            maxlength="10"
            v-model="redFormData.text"
          />
        </div>
        <div class="input-box">
          <span class="label">支付密码</span>
          <input
            type="password"
            placeholder="Vui lòng nhập mã thanh toán"
            maxlength="6"
            v-model="redFormData.password"
          />
        </div>
        <!--        <div class="send-btn" @click="sendRedPacket">发红包</div>-->
        <el-button
          class="custom-btn send-btn"
          @click="sendRedPacket"
          :loading="btnRedLoading"
          >发红包</el-button
        >
      </div>
    </div>

    <!-- 禁言 -->

    <div class="fa-redpack jy" v-if="isJy">
      <div class="fa-content">
        <div class="remove-icon" @click="isJy = false"></div>
        <div class="title">禁言 "{{ jyTxt }}"</div>

        <div class="selectTiime">
          <span>
            <i :class="isAlways ? 'active' : ''" @click="selectTime(30)"></i>
            禁言30分钟
          </span>
          <span>
            <i :class="isAlways ? '' : 'active'" @click="selectTime(0)"></i>
            永久禁言
          </span>
        </div>
        <el-button
          class="custom-btn send-btn"
          @click="toJy"
          :loading="btnRedLoading"
          >立即禁言</el-button
        >
      </div>
    </div>

    <!-- 校验是否设置支付密码-->
    <div class="fa-redpack" v-show="fPsd">
      <div class="fund-psd-check">安全校验中...</div>
    </div>
    <el-dialog :visible.sync="novipboxShow" width="440px" class="novip-dialog">
      <div class="novip-box">
        <!-- <div class="close-btn" @click="novipboxShow=false">
                <img src="../../assets/images/chat/close_icon2.png" alt="">
            </div> -->
        <div style="margin-bottom: ">
          <img
            src="../../assets/imgaes/chat/ts_icon.png"
            style="width: 52px; height: 52px"
          />
        </div>
        <h2>骑士以上用户才能领取红包哦！</h2>
        <p>首充且兑换任意金额钻石即可免费升级VIP哦！</p>
        <div class="novip-btn">
          <span
            @click="
              isRecharge = true;
              novipboxShow = false;
            "
            >Nạp</span
          >
          <span
            @click="
              isEX = true;
              novipboxShow = false;
            "
            >去兑换</span
          >
        </div>
      </div>
    </el-dialog>
    <Recharge v-if="isRecharge" :show="isRecharge" v-on:childFn="resetFlag" />
    <Excharge v-if="isEX" :showEx="isEX" v-on:childExFn="resetExFlag" />

    <!-- 大转盘 -->
    <!-- <div class="big-box" v-if="isDZP">
      <div class="big-table">
        <i class="big-close" @click="isDZP = false"><img src="../../assets/imgaes/BigTurntable/big-close.png" alt=""></i>
        <BigTurntable></BigTurntable>
      </div>
    </div> -->
    <BigTurntable v-show="isDZP" v-on:closeFunc="closeDzp"></BigTurntable>
    <!-- <BigTurntable v-if="isDZP" ></BigTurntable> -->
    <!-- 大转盘 -->
    <!-- <DZP/> -->
  </div>
</template>

<script>
import {
  removeAllactive,
  getSiblings,
  alertServe,
  alertComfirm,
} from "../../assets/js/public";
import { mapState, mapMutations } from "vuex";
import FlvPlayer from "xgplayer-flv.js";
import SVGA from "svgaplayerweb";
import vme from "../../components/vue-mobile-emoji/vme.vue";
import Quiz from "../../components/quiz.vue";
import BigTurntable from "../../components/BigTurntable.vue";
// import DZP from "./dzp"
import "videojs-flvjs-es6";
import "videojs-flash";
export default {
  name: "chat",
  data() {
    return {
      ban_user: "",
      jyTime: 30,
      isAlways: true,
      jgTxt: "",
      isJy: false,
      red1: false,
      red2: false,
      red3: false,
      faRed: false,
      bdList: null,
      bcurrLen: 0, //
      isShowbL: false,
      isShowbR: false,
      gitList: [],
      isShowGL: false,
      isShowGR: true,
      gitWidth: "",
      allGitWidth: "",
      gitLen: 0,
      isFinalR: true,
      historyList: [], //历史开奖
      valueTime: "", //历史开奖
      date: "", //历史开奖
      limit: 50, //历史开奖
      sTitle: [
        { index: 1, name: "显示号码" },
        { index: 2, name: "显示大小" },
        { index: 3, name: "显示单双" },
      ],
      sTitleIndex: 1, //历史开奖
      isLoading: true, //历史开奖
      player: null,
      liveData: { live_status: 1 },
      isFollow: null,
      videoSrc: null,
      redPaper: [],
      redId: null,
      playerOptions: {},
      // path: "ws://47.244.212.147/wss",//测试10.1
      // path: "wss://www.lgadmin561.com/wss",//线上7.27换
      path: this.versionWss,
      pickerOptions: {
        //禁止未来日期
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      chatData: null,
      socket: "",
      dbData: null,
      comment_text: "",
      isLenght: false,
      chatErr: "",
      currGift: {},
      redFormData: {
        anchor_id: this.$route.params.id,
        user_id: this.$store.state.userinfo.user_id,
        amount: null,
        num: null,
        text: "恭喜发财",
        password: null,
        version: "v2",
      },
      btnLoading: false,
      btnRedLoading: false,
      giftFormData: {
        anchor_id: null,
        user_id: this.$store.state.userinfo.user_id,
        gift_id: null,
        gift_num: "1",
        version: "v2",
      },
      isSpecia: false,
      giftTime: [],
      genGitData: [],
      isEX: false,
      isRecharge: false,
      hoverGitMsg: {},
      gitMsg: false,
      gitMsg1: false,
      isFollowLoading: false,
      showEmj: false,
      vipShow: false, //vip用户进入直播间提示
      hyvipName: "",
      hyvip: "",
      //历史记录
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
      total: 0,
      systemMsg: null,
      isFirst: false,
      fPsd: false,
      isShowRtmp: null,
      //直播预告
      LivePreviewNew: [], //直播预告1.1
      LivePreviewNewNow: [],
      gameRoomList: [], //节目预告全部游戏
      noticeType: "",
      day: "now",
      PreviewLen: true,
      dayList: [
        { title: "今天", name: "now" },
        { title: "明天", name: "tomorrow" },
        { title: "后天", name: "after" },
      ],
      room_id: "",
      activeName1: 0, //tab
      activeName: 0,
      indexName: "",
      gblist: false,
      gifNav: {},
      gifConData: {},
      gifConData1: [],
      gifNow: 1,
      pingbi: "屏蔽特效",
      timer: null,
      // special1:true,//是否屏蔽特效
      // sendGifNun: ["1", "10", "58", "88", "520", "1314"],
      clList: [],
      clshow: false,
      hostMsg: {},
      sendGifNun: [
        { num: 1 },
        { num: 10 },
        { num: 58 },
        { num: 88 },
        { num: 520 },
        { num: 1314 },
      ],
      hbClick: true,
      GitDTimeout: null,
      TimerList: [],
      boxShowTime: 6,
      vipData: [], //vip进入房间
      inData: [], //普通用户 游客
      currType: 1, //聊天室&竞猜
      allLottery: [], //彩种类
      followOrders: {}, //跟投信息
      isFollowOrder: false, //是否跟投,
      lottery_id: 1,
      // isvip:true
      playHistorId: "",
      novipboxShow: false,
      showDzp: false, //是否显示大转盘
      isDZP: false,
      vipBg: "",
      vipTextColor: "#fff",
      vipAvatar: "",
      isHotPut: this.$store.state.userinfo.put_hot,
    };
  },
  filters: {
    filterGz(n) {
      let name = "";
      if (n < 1) return;
      if (n == 2) {
        name = "男爵";
      } else if (n == 1) {
        name = "骑士";
      } else if (n == 3) {
        name = "子爵";
      } else if (n == 4) {
        name = "典雅的伯爵";
      } else if (n == 5) {
        name = "华贵的侯爵";
      } else if (n === 6) {
        name = "崇高的公爵";
      } else if (n == 7) {
        name = "伟大的国王";
      } else {
        name = "max";
      }
      return name;
    },
    filterMoney(n) {
      if (n.indexOf(".") > -1) {
        return n;
      }
      return n + ".00";
    },
    filterLotteryName(n) {
      let name = "";
      switch (n - 0) {
        case 8:
          name = "香港彩";
          break;
        case 7:
          name = "北京赛车";
          break;
        case 9:
          name = "幸运飞艇";
          break;
        case 11:
          name = "澳洲幸运10";
          break;
        case 26:
          name = "极速赛车";
          break;
        case 27:
          name = "欢乐赛车";
          break;
        case 28:
          name = "极速时时彩";
          break;
        case 1:
          name = "重庆时时彩";
          break;
        case 2:
          name = "新疆时时彩";
          break;
        case 3:
          name = "江西11选5";
          break;
        case 4:
          name = "天津时时彩";
          break;
        case 5:
          name = "3D试后";
          break;
        case 6:
          name = "江苏快三";
          break;
        case 12:
          name = "广东快乐十分";
          break;
        case 13:
          name = "吉林快三";
          break;
        case 14:
          name = "排列三";
          break;
        case 15:
          name = "北京快乐8";
          break;
        case 16:
          name = "PC蛋蛋";
          break;
        case 17:
          name = "幸运六和彩";
          break;
        case 18:
          name = "双色球";
          break;
        case 19:
          name = "七星彩";
          break;
        case 20:
          name = "七乐彩";
          break;
        case 21:
          name = "排列5";
          break;
        case 22:
          name = "大乐透";
          break;
        case 23:
          name = "安徽快三";
          break;
        case 24:
          name = "广东11选5";
          break;
        case 25:
          name = "3D试前";
          break;
        case 10:
          name = "澳洲幸运5";
          break;
        case 32:
          name = "分分赛车";
          break;
        default:
          break;
      }
      return name;
    },
  },
  computed: {
    ...mapState([
      "diamond",
      "balance",
      "vip",
      "userType",
      "UserId",
      "safePwd",
      "special",
      "userInfo",
    ]),
  },
  beforeCreate() {
    // //console.log(this.$route.params.lotteryId);
    // //console.log(this.$data);
    this.lottery_id = parseInt(this.$route.params.lotteryId) || 8;
  },
  beforeUpdate() {
    //console.log( this.lottery_id)
  },
  created() {
    this.getGameRoomList(); //所有预告彩种
    let time = new Date();
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    m = m >= 10 ? m : "0" + m;
    d = d >= 10 ? d : "0" + d;
    this.date = y + "-" + m + "-" + d;
    this.valueTime = y + "-" + m + "-" + d;
    this.lottery_id_cz = parseInt(this.$route.params.lotteryId) || 8; //原来的
    this.lottery_id = parseInt(this.$route.params.lotteryId) || 8;
    this.gethistoryList();
    this.init();
    this.getLivePreview(); //节目预告
    // if (!this.special) {
    this.SPECIAL(false);
    this.pingbi = "屏蔽特效";
    // }
  },
  mounted() {
    // let u = document.querySelector(".lb-ul>ul");

    //    let gu = document.querySelector(".git-box ul");
    // u.style.width = this.bdList.length * 46 + "px";
    //    gu.style.width = 19 * 100 + "px";
    // u.style.marginLeft = -(this.bdList.length - 8) * 46 + "px";

    //    let gu = .querySelector(".git-box ul");
    //    gu.style.width = 19 * 100 + "px";

    this.$nextTick(() => {
      let gitW = document.body.clientWidth - 442 - 200;
      this.gitWidth = gitW;
      this.allGitWidth = this.gitList.length * 100;

      // u.style.width = this.bdList.length * 46 + "px";
      // u.style.marginLeft = -(this.bdList.length - 8) * 46 + "px";
      // this.$nextTick(() => {
      //   let gu = document.querySelector(".git-box ul");
      //   gu.style.width = 19 * 100 + "px";
      //
      //   let gitW = document.body.clientWidth - 442 - 200;
      //   this.gitWidth = gitW;
      //   this.allGitWidth = this.gitList.length * 100;

      //      document.querySelector(".git-box").style.width = gitW + "px";
      //      document.querySelector(".video-top").style.width = gitW + "px";
      //      document.querySelector(".video-content").style.width = gitW + "px";

      //     if (this.allGitWidth <= this.gitWidth) this.isShowGR = false;
      // });

      //    window.onresize = function () {
      //      let gitW = document.body.clientWidth - 442 - 200;
      //      if (
      //        document.body.clientWidth >= 1221 &&
      //        document.body.clientWidth <= 1240
      //      ) {
      //        gitW = document.body.clientWidth - 442 - 200;
      //      } else if (document.body.clientWidth <= 1240) {
      //        gitW = document.body.clientWidth - 442;
      //      } else if (
      //        document.body.clientWidth >= 1241 &&
      //        document.body.clientWidth <= 1299
      //      ) {
      //        gitW = document.body.clientWidth - 442 - 200;
      //      } else if (document.body.clientWidth <= 1300) {
      //        gitW = document.body.clientWidth - 442 - 60;
      //      } else if (
      //        document.body.clientWidth >= 1380 &&
      //        document.body.clientWidth <= 1399
      //      ) {
      //        gitW = document.body.clientWidth - 442 - 200;
      //      } else if (document.body.clientWidth <= 1400) {
      //        gitW = document.body.clientWidth - 442 - 80;
      //      } else if (
      //        document.body.clientWidth >= 1401 &&
      //        document.body.clientWidth <= 1420
      //      ) {
      //        gitW = document.body.clientWidth - 442 - 200;
      //      } else {
      //        gitW = document.body.clientWidth - 442 - 200;
      //      }
      //      this.gitWidth = gitW;
      //      if (this.allGitWidth <= this.gitWidth) this.isShowGR = false;
      //      document.querySelector(".git-box").style.width = gitW + "px";
      //      document.querySelector(".video-top").style.width = gitW + "px";
      //      document.querySelector(".video-content").style.width = gitW + "px";
      //    };
      if (!this.$store.state.codeToken) {
        return;
      }
      if (this.$store.state.userinfo.noble > 0) {
        this.hyvip = this.$store.state.userinfo.noble;
        this.hyvipName = this.$store.state.userinfo.nickname;
        this.vipAvatar = this.$store.state.userinfo.avatar;
        this.vipInit(this.hyvip);
        this.vipShow = true;
        setTimeout(() => {
          this.vipShow = false;
        }, 3000);
      }
    });
  },
  methods: {
    ...mapMutations([
      "SETDIAMOND",
      "SETBALANCE",
      "SETFIRSTCHARGE",
      "SETSAFEPWD",
      "SPECIAL",
      "SETUSERTOKEN",
      "SETPIC",
      "SETUSERINFO",
      "SETUSERNAME",
      "SETUSER_TYPE",
      "SETFOCUS",
      "SETUSERUSERID",
      "SETUSERVIP",
    ]),
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
    openDZP() {
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.isDZP = true;
    },
    closeDzp(d) {
      this.isDZP = d;
    },
    //国王推荐主播 只能国王有这个权利
    async tjfunc(id) {
      // this.$vux.loading.show({ text: "推荐中..." });
      let res = await this.$http.get(this.versionLive2 + "live/anchor_hot/", {
        params: { anchor_id: id },
      });
      // this.$vux.loading.hide();
      if (res && res.data.code == 1) {
        //提示并置灰
        this.isHotPut = 0;

        this.$confirm("谢谢尊贵的国王推荐我上热门哟，么么哒！", "", {
          confirmButtonText: "Xác nhận",
          roundButton: true,
          center: true,
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
        })
          .then(() => {})
          .catch(() => {});

        // this.$vux.confirm.show({
        //     title:'',
        //     content:'谢谢尊贵的国王推荐我上热门哟，么么哒！',
        //     showCancelButton:false,
        //     onConfirm : () => {
        //     }
        // });
      } else {
        this.$confirm(res.data.msg, "", {
          confirmButtonText: "Xác nhận",
          roundButton: true,
          center: true,
          showCancelButton: false,
          dangerouslyUseHTMLString: true,
        })
          .then(() => {})
          .catch(() => {});

        // this.$vux.confirm.show({
        //     title:'',
        //     content:res.data.msg,
        //     showCancelButton:false,
        //     onConfirm : () => {
        //     }
        // });
      }
    },
    //已经推荐过了
    tjfuncOver() {
      this.$confirm("尊贵的国王推荐上热门每日只允许使用一次哟~", "", {
        confirmButtonText: "Xác nhận",
        roundButton: true,
        center: true,
        showCancelButton: false,
        dangerouslyUseHTMLString: true,
      })
        .then(() => {})
        .catch(() => {});
      // this.$vux.confirm.show({
      //     title:'',
      //     content:'尊贵的国王推荐上热门每日只允许使用一次哟~',
      //     showCancelButton:false,
      //     onConfirm : () => {
      //     }
      //   });
    },
    showUserIn(n) {
      let dom1 = document.querySelector(".showuser-In");
      for (let i = 0, len = n.length; i < len; i++) {
        if (n[i].type == "subscribe" && n[i].user_id) {
          let str = "";
          let str1 = "";
          let str2 = "";
          let str3 = "";
          let str4 = "";
          if (n[i].vip < 1 && !n[i].isAnchor) {
            str1 = '<span class="one-item item-in no-vip">';
          } else {
            str1 = '<span class="one-item item-in">';
          }
          if (n[i].vip > 0 && n[i].isAnchor != 1 && n[i].userType != 2) {
            // str2='<i class="user-vip user-vip'+n[i].vip+'" style="top:-.05rem;background: url("../../assets/images/chat/vip_'+n[i].vip+'.png") no-repeat;background-size:contain"></i>'
            str2 = '<i class="user-vip user-vip1" style="top:-.05rem;"></i>';
          } else {
            str2 = "";
          }
          if (n[i].isAnchor == 1) {
            str3 = '<i class="user-vip host-vip" style="top:-.05rem"></i>';
          } else {
            str3 = "";
          }
          if (n[i].userType == 2) {
            str4 = '<i class="user-vip admin-vip fl"></i>';
          } else {
            str4 = "";
          }
          let str5 =
            '<span style="float:none;color: #999;">欢迎 <i>' +
            n[i].userName +
            "</i>进入直播间</span>";
          let str6 = '<span style="vertical-align: baseline"></span>';
          str = str1 + str2 + str3 + str4 + str5 + str6 + "</span>";
          console.log(str);
          dom1.innerHTML = str;
        }
      }
    },
    //跟投
    followOrder(o, v) {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          // this.$store.commit('SETLOGIN',true);
          this.$store.commit("SETLOGIN", true);
        });
      } else {
        if (v) {
          this.currType = 2;
          this.isFollowOrder = true;
          this.followOrders = o || {};
          this.lottery_id = o.play_bet_lottery_id;
          // //console.log(this.followOrders);
        }
      }
    },
    //主播分享
    shareOrder(data) {
      console.log(data);
      this.currType = 1;
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          // this.$store.commit('SETLOGIN',true);
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //  this.$message({
      //     type: "warning",
      //     message: '分享中...',
      //     center: true,
      //     offset: 225
      // });
      let text_obj = {
        type: "publish",
        room_id: this.$route.params.id,
        user_id: this.$store.state.userinfo.user_id,
        userName: this.$store.state.username,
        text: "",
        vip: this.$store.state.userinfo.noble + "",
        userType: this.userType + "",
        // userType:1, //主播type 为1
        avatar: this.$store.state.avatar,
        event: "pushPlan",
        orders: data,
      };
      this.send(JSON.stringify(text_obj), "msg");
    },
    //跟投
    showAll(e) {
      e.currentTarget.parentNode.parentNode.children[2].style.height = "100%";
      e.currentTarget.style.display = "none";
      e.currentTarget.parentNode.children[1].style.display = "block";
    },
    hideAll(e) {
      e.currentTarget.parentNode.parentNode.children[2].style.height = "55px";
      e.currentTarget.style.display = "none";
      e.currentTarget.parentNode.children[0].style.display = "block";
    },
    //全部彩种
    async getGame() {
      let res = await this.$http.post("/open/idx/sort/");
      if (res && res.data.code == 1) {
        this.allLottery = res.data.data || [];
      }
    },
    //清除缓存
    clearinfo() {
      //请求头 个人中心那边
      this.$http.defaults.headers["Authorization"] = "Bearer ";
      //请求头 直播那边
      this.$http.defaults.headers["token"] = "";
      this.SETUSERTOKEN(""); //token
      this.SETPIC(""); //头像
      this.SETUSERINFO(""); //用户信息
      this.SETUSERNAME(""); //用户名
      this.SETSAFEPWD(""); //取款密码
      this.SETUSER_TYPE(""); //用户类型
      // this.SETFOCUS("");//关注
      this.SETBALANCE(""); //用户名余额
      this.SETDIAMOND(""); //钻石
      this.SETUSERUSERID(""); //user_id
      this.SETUSERVIP(""); //用户vip
      this.SETFOCUS(""); //用户关注
    },
    async getHostMess() {
      let res = await this.$http.get(
        this.versionLive2 + "live/get_anchor_info/",
        {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
          },
        }
      );
      if (res && res.data.code == 1) {
        this.hostMsg = res.data.data;
      }
    },
    toUser(v) {
      this.comment_text = "@" + v.userName;
    },
    finedTpUser(type, id) {
      // if (!this.$store.state.codeToken) return ;
      if (id <= 0) return; //游客无法点击进入主播个人页
      if (type == 1) {
        this.$router.push("/HostHome/" + id);
      } else {
        this.$router.push("/userMsg/" + id);
      }
    },
    selectTime(time) {
      this.isAlways = !this.isAlways;
      this.jyTime = time;
    },
    muted(v) {
      if (
        v.user_id != this.$store.state.userinfo.user_id &&
        this.userType == 2 &&
        v.userType == 0
      ) {
        this.isJy = true;
        this.jyTxt = v.userName;
        this.ban_user = v.user_id;
      }
    },
    toJy() {
      this.$http({
        method: "post",
        url: this.versionLive2 + "live/ban_words/",
        data: {
          opertate_user: this.$store.state.userinfo.user_id,
          ban_user: this.ban_user,
          // room_id: this.$route.params.id,
          ban_time: this.jyTime,
        },
      })
        .then((res) => {
          this.isJy = false;
          alertComfirm({ msg: res.data.msg });
        })
        .catch(() => {
          // this.$vux.loading.hide();
        });
    },
    playing() {
      if (!this.$store.state.codeToken) return;
      if (this.$store.state.userinfo.user_id < 0) return;
      this.$http
        .get(this.versionLive2 + "live/live_play_history/", {
          params: { anchor_id: this.liveData.anchor_id, flag: "start" },
        })
        .then((res) => {
          // console.log(res)
          this.playHistorId = res.data.data.history_id;
        })
        .catch((err) => {});
      let dom = document.querySelector(".vjs-tech");
      dom.setAttribute(
        "style",
        "z-index:auto!important;pointer-events:none!important;"
      );
      dom.setAttribute("disabled", "disabled");
      let dom2 = document.querySelector(".vjs-loading-spinner");
      dom2.setAttribute(
        "style",
        "display:none!important;visibility: hidden;!important;"
      );
      dom2.classList.remove("video-spin");
    },
    waiting() {
      let dom = document.querySelector(".vjs-loading-spinner");
      dom.classList.add("video-spin");
      dom.setAttribute(
        "style",
        "display:block!important;visibility: inherit;!important;"
      );
    },
    showRecharge() {
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.SETFIRSTCHARGE("");
    },
    showGitImg(v, index) {
      if (this.btnLoading) return;
      this.gblist = false;
      // //console.log(123456)

      // if(this.gitMsg == true){
      //    this.gitMsg = false;
      // }else{
      //   this.gitMsg = true
      // }
      this.giftFormData.gift_num = 1;
      this.currGift = {
        id: v.id,
        name: v.name,
        amount: v.amount,
        index: index,
        icon: v.icon,
        free_num: v.free_num,
      };

      //  //console.log(this.currGift)
      this.gitMsg = true;
      this.hoverGitMsg = v;
      let dom = document.querySelector(".show-img-msg4");

      if (this.hoverGitMsg.grade == "low") {
        if (index == 0) {
          dom.style.left = 175 + "px";
        } else {
          dom.style.left = 175 + 60 * index + "px";
        }
      } else {
        if (index == 0) {
          dom.style.left = 230 + "px";
        } else {
          dom.style.left = 230 + 58 * index + "px";
        }
      }
      // //console.log(this.currGift)
    },
    showGitImg1(v, index) {
      if (this.btnLoading) return;
      this.giftFormData.gift_num = 1;
      (this.currGift = {
        id: v.id,
        name: v.name,
        amount: v.amount,
        index: index,
        icon: v.icon,
        free_num: v.free_num,
      }),
        // (this.gitMsg1 = true);
        // let code = document.querySelector(".line-list");
        // code.style.display = "block";

        (this.hoverGitMsg = v);

      let dom = document.querySelector(".show-img-msg5");
      dom.style.display = "block";
      if (this.hoverGitMsg.grade == "low") {
        if (index == 0) {
          dom.style.right = 285 + "px";
        } else {
          dom.style.right = 285 - 60 * index + "px";
        }
      } else {
        if (index == 0) {
          dom.style.right = 335 + "px";
        } else {
          dom.style.right = 335 - 60 * index + "px";
        }
      }
    },
    showhide() {
      let dom = document.querySelector(".show-img-msg5");
      dom.style.display = "none";
    },
    //礼物数量
    CSendGiftNum(index) {
      this.giftFormData.gift_num = parseInt(index);
      // (this.currGift = {
      //   id: v.id,
      //   name: v.name,
      //   amount: v.amount,
      //   // index: index,
      //   icon: v.icon
      // })
      // //console.log(this.giftFormData.gift_num);
    },
    async goExcharge() {
      //登录
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      //是否设置支付密码  或者 账号被冻结
      let res = await this.$http.get("/api2/index/check-fund-password");
      if (res && res.data.code == 1) {
        this.isEX = true;
        this.isRecharge = false;
      } else if (res && res.data.code == 9) {
        alertComfirm(
          { msg: "Bạn chưa đặt mật khẩu thanh toán", conBtText: "Cài đặt ngay" },
          () => {
            this.$router.push("/setting");
          }
        );
      } else if (res && res.data.code == 10) {
        alertServe();
      }
    },
    resetFlag(flag) {
      this.isRecharge = flag;
    },
    resetExFlag(flag) {
      this.isEX = flag;
    },
    goRecharge() {
      //是否已经登录
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      //充值
      this.isEX = false;
      this.isRecharge = true;
    },
    init() {
      this.getLiveRoom();
      this.getLiveRewardList();
      this.getInitChat();
      // this.initSocket();
      this.getGiftList();
      if (this.noticeTypes == 1) {
        this.getSystemNotice(); //获取官方系统公告
      } else {
        this.getSystemNoticeDl(); //获取代理系统公告
      }

      this.rechargeIsFirst();

      this.getHostMess();
      this.getGame();
      if (this.$store.state.userinfo.user_id > 0) {
        this.loadMoney();
      }
    },
    vipInit(i) {
      if (i == 1) {
        this.vipBg = require("../../assets/imgaes/chat/qishi.png");
        this.SVGA("vip1.svga", 48);
      } else if (i == 2) {
        this.vipBg = require("../../assets/imgaes/chat/nanjue.png");
        this.SVGA("vip2.svga", 40);
      } else if (i == 3) {
        this.vipBg = require("../../assets/imgaes/chat/zijue.png");
        this.SVGA("vip3.svga", 26);
      } else if (i == 4) {
        this.vipBg = require("../../assets/imgaes/chat/bojue.png");
        this.vipTextColor = "#BCD7FAFF";
        this.SVGA("vip4.svga", 51);
      } else if (i == 5) {
        this.vipBg = require("../../assets/imgaes/chat/houjue.png");
        this.vipTextColor = "#7EFCECFF";
        this.SVGA("vip5.svga", 59);
      } else if (i == 6) {
        this.vipBg = require("../../assets/imgaes/chat/gongjue.png");
        this.vipTextColor = "#FD41FBFF";
        this.SVGA("vip6.svga", 59);
      } else if (i == 7) {
        this.vipBg = require("../../assets/imgaes/chat/guowang.png");
        this.vipTextColor = "#EBFE4DFF";
        this.SVGA("vip7.svga", 47);
      }
    },
    initSocket(data) {
      if (data) this.dbData = data;
      // 实例化socket
      if (!this.socket || data) {
        // let wsServer = `${location.protocol == 'https:' ? 'wss' : 'ws'}://${location.host}/wss`;
        let wsServer = location.protocol.includes("https")
          ? "wss://" + location.host + "/wss"
          : "ws://" + location.host + "/wss";
        this.socket = new WebSocket(wsServer);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
        // 监听socket关闭
        this.socket.onclose = this.close;
        //发送消息
        // this.socket.send = this.send();
      }
    },
    loadMoney() {
      if (!this.$store.state.codeToken) return;
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          this.SETBALANCE(res.data.data.balance);
        }
      });
    },
    //socket心跳
    timers() {
      if (window.timer_1) clearInterval(window.timer_1);
      window.timer_1 = window.setInterval(() => {
        let text_obj2 = {
          type: "ping",
          room_id: this.$route.params.id,
          user_id: this.$store.state.userinfo.user_id,
          userName: this.$store.state.username,
        };
        this.send(JSON.stringify(text_obj2), true);
      }, 50000);
    },
    open: function () {
      //console.log("socket连接成功");
      if (this.dbData) {
        if (JSON.parse(this.dbData).type == "publish") {
          setTimeout(() => {
            this.isLenght = true;
            this.chatErr = "聊天室连接成功~";
          }, 1000);
        } else if (JSON.parse(this.dbData).type == "gift") {
          this.sendGift();
        } else if (JSON.parse(this.dbData).type == "red") {
          this.sendRedPacket();
        }
      }
      let type = "subscribe";
      let type2 = "ping";
      let text_obj = {
        type: type,
        room_id: this.$route.params.id,
        userName: this.$store.state.userinfo.nickname,
        user_id: this.$store.state.userinfo.user_id || 0,
        vip: this.$store.state.userinfo.noble,
        userType: this.$store.state.userType,
        // userType: this.chatData.userType
      };
      let text_obj2 = {
        type: type2,
        room_id: this.$route.params.id,
        user_id: this.$store.state.userinfo.user_id || 0,
        userName: this.$store.state.userinfo.nickname,
        vip: this.$store.state.userinfo.noble,
        userType: this.$store.state.userType,
      };
      this.send(JSON.stringify(text_obj));
      this.send(JSON.stringify(text_obj2), true);

      this.timers();
    },
    error: function () {
      //console.log("连接错误");
    },
    getMessage: function (msg) {
      let data = JSON.parse(msg.data);
      // //console.log(data)
      // //console.log(this.chatData)
      let $this = this;
      if (data.type == "publish") {
        if (data.event == "pushPlan") {
          data.isExpire = true;
        }
        if (data.isMe) {
          this.comment_text = "";
        }
        $this.inData.push(data);
        $this.chatData.push(data);
        $this.pushDanmu = data;
        if (data.isMe) {
          $this.showEmj = false;
        }
      } else if (data.type == "gift") {
        // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
        // $this.chatData.push(data);
        // if(typeof data.userType=='string'){
        //   return
        // }
        $this.btnLoading = false;
        data.ljNum = 1;
        // console.log($this.hoverGitMsg.grade)
        if ($this.hoverGitMsg.grade == "low") {
          $this.boxShowTime = 3;
        } else if ($this.hoverGitMsg.grade == "meddle") {
          $this.boxShowTime = 6;
        } else if ($this.hoverGitMsg.grade == "high") {
          $this.boxShowTime = 9;
        }
        let dataIndex = $this.chatData.findIndex(
          (res) =>
            res.user_id == data.user_id &&
            res.gift_id == data.gift_id &&
            res.gift_num == data.gift_num &&
            data.sendTime - res.sendTime < $this.boxShowTime
        );
        // let dataIndex=$this.chatData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<$this.boxShowTime);
        if (dataIndex != -1) {
          $this.chatData[dataIndex].ljNum++;
          $this.chatData[dataIndex].sendTime = data.sendTime;
        } else {
          $this.chatData.push(data);
          $this.inData.push(data);
        }
        // //console.log($this.chatData)
        if (data.gift_type == 4) {
          //红包
          $this.red1 = true;
          $this.redId = data.r_id;
          $this.redPaper.push(data);
        } else {
          //礼物

          // var GitDTimeout=null;
          //搜索用户一样，礼物一样，礼物数量一样的索引  -1则为搜不到
          let dataIndex = $this.genGitData.findIndex(
            (res) =>
              res.user_id == data.user_id &&
              res.gift_id == data.gift_id &&
              res.gift_num == data.gift_num &&
              data.sendTime - res.sendTime < $this.boxShowTime
          );
          // //console.log(dataIndex)
          if (dataIndex != -1) {
            // data.ljNum = 1;
            $this.genGitData[dataIndex].ljNum++;
            $this.genGitData[dataIndex].gift_num = parseInt(data.gift_num);
            $this.genGitData[dataIndex].sendTime = data.sendTime;
            $this.genGitData[dataIndex].boxShowTime = $this.boxShowTime;
          } else {
            $this.genGitData.push({
              name: data.userName,
              avatar: data.avatar,
              giftName: data.gift_name,
              icon: data.icon,
              gift_num: data.gift_num,
              ljNum: 1,
              sendTime: data.sendTime,
              gift_id: data.gift_id,
              user_id: data.user_id,
              boxShowTime: $this.boxShowTime,
              timer: null,
              // grade:data.grade
              // userType:data.userType
            });
            dataIndex = $this.genGitData.length - 1;
            // //console.log("长度"+$this.genGitData.length);
          }
          // clearInterval($this.GitDTimeout);
          //  $this.GitDTimeout = setInterval(() => {
          //      $this.genGitData.forEach((i,d)=>{
          //          i.boxShowTime-- ;
          //          if(i.boxShowTime == 0){
          //              $this.genGitData.splice(d,1);
          //          }
          //          //console.log(i.giftName+ '::' + i.boxShowTime)
          //      })

          //      if($this.genGitData.length == 0){
          //         clearInterval($this.GitDTimeout);
          //      }
          //  }, 1000);
          clearInterval($this.genGitData[dataIndex].timer);
          $this.genGitData[dataIndex].timer = setInterval(() => {
            $this.genGitData.forEach((i, d) => {
              if (d != dataIndex) {
                i.boxShowTime--;
                if (i.boxShowTime == 0) {
                  clearInterval(i.timer);
                  $this.genGitData.splice(d, 1);
                }
              } else {
                $this.genGitData[dataIndex].boxShowTime--;
                if ($this.genGitData[dataIndex].boxShowTime == 0) {
                  clearInterval($this.genGitData[dataIndex].timer);
                  $this.genGitData.splice(dataIndex, 1);
                }
              }
            });
          }, 1000);

          if (data.gift_id == 27) {
            $this.SVGA("float.svga", 149);
          } else if (data.gift_id == 28) {
            $this.SVGA("fireCloud.svga", 153);
          } else if (data.gift_id == 17) {
            $this.SVGA("phoenix.svga", 138);
          } else if (data.gift_id == 15) {
            $this.SVGA("lamborghini.svga", 302);
          } else if (data.gift_id == 16) {
            $this.SVGA("castle.svga", 159);
          } else if (data.gift_id == 29) {
            $this.SVGA("yacht.svga", 139);
          } else if (data.gift_id == 23) {
            $this.SVGA("loveyou.svga", 179);
          } else if (data.gift_id == 39) {
            $this.SVGA("shengdanlaoren.svga", 45);
          } else if (data.gift_id == 40) {
            $this.SVGA("shengdanhuoche.svga", 76);
          } else if (data.gift_id == 41) {
            $this.SVGA("zhendongbang.svga", 94);
          } else if (data.gift_id == 42) {
            $this.SVGA("huanggua.svga", 105);
          } else if (data.gift_id == 43) {
            $this.SVGA("qiezi.svga", 62);
          } else if (data.gift_id == 44) {
            $this.SVGA("pibian.svga", 55);
          } else if (data.gift_id == 45) {
            $this.SVGA("dila.svga", 104);
          } else if (data.gift_id == 46) {
            $this.SVGA("saqian.svga", 149);
          } else if (data.gift_id == 51) {
            $this.SVGA("kongmingdeng.svga", 58);
          } else if (data.gift_id == 52) {
            $this.SVGA("gu.svga", 107);
          } else if (data.gift_id == 53) {
            $this.SVGA("nnyouyu.svga", 107);
          } else if (data.gift_id == 54) {
            $this.SVGA("bianpao.svga", 99);
          } else if (data.gift_id == 21) {
            $this.SVGA("kh.svga", 119);
          }
        }
      } else if (data.type == "subscribe" && !data.isMe) {
        // //console.log(data)
        // if((!this.$store.state.codeToken)){
        //    $this.chatData.push(data);
        // }
        // else{
        //   if(data.user_id!=0){
        //     $this.chatData.push(data);
        //   }
        // }
        $this.chatData.push(data);
        $this.inData.push(data);
        // //console.log(this.chatData[this.chatData.length-1])

        if (this.chatData[this.chatData.length - 1].vip > 0) {
          this.hyvip = this.chatData[this.chatData.length - 1].vip;
          this.vipAvatar = this.chatData[this.chatData.length - 1].avatar;
          this.vipInit(this.hyvip);
          if (this.chatData[this.chatData.length - 1].user_id == 0) {
            this.hyvip = "" || 0;
          }
          this.hyvipName = this.chatData[this.chatData.length - 1].userName;
          this.vipShow = true;
          setTimeout(() => {
            this.vipShow = false;
          }, 3000);
        }

        // $this.chatData.push(data);

        // $this.vipData.push(data) ;
        // $this.chatData.push(data);
      } else if (data.type == "error") {
        this.isLenght = true;
        $this.chatErr = data.msg;
      } else if (data.type == "operation") {
        this.clearChatContent();
      } else if (data.type == "ServerPush") {
        if (data.dataType == "long_dragon") {
          //  //console.log(data)
          //  //console.log($this.hostMsg.lottery_id)
          $this.clList = [];
          data.data.forEach((i, d) => {
            if ($this.hostMsg.lottery_id == i.lottery_id) {
              $this.clList.push(i);
            }
          });
          if ($this.clList.length) {
            this.clshow = true;
          }
          // //console.log( $this.clList)
        } else if (data.dataType == "update_online") {
          if (document.querySelector(".onlineNum")) {
            document.querySelector(".onlineNum").innerHTML =
              "在线人数     " + (this.liveData.base_online + data.data.online);
          }
        } else if (data.dataType == "push_open_issue") {
          // console.log(this.chatData);
          this.chatData.forEach((t, i) => {
            if (t.event == "pushPlan") {
              data.data.forEach((t2, i2) => {
                if (t.orders.play_bet_lottery_id == t2.lotteryId) {
                  if (t.orders.play_bet_issue == t2.issue) {
                    t.isExpire = true;
                  } else {
                    t.isExpire = false;
                  }
                }
              });
            }
          });
          this.$forceUpdate();
        }
      }
    },
    // getMessage: function(msg) {
    //   let data = JSON.parse(msg.data);
    //   // //console.log(data)
    //   // //console.log(this.chatData)
    //   let $this = this;
    //   if (data.type == "publish") {
    //     if (data.isMe) {
    //       this.comment_text = "";
    //     }
    //     $this.chatData.push(data);
    //     $this.pushDanmu = data;
    //     if (data.isMe) {
    //       $this.showEmj = false;
    //     }
    //   } else if (data.type == "gift") {
    //     // if ($this.chatData.length == 20) $this.chatData.splice(0, 1);
    //     // $this.chatData.push(data);
    //     $this.btnLoading = false;
    //     data.ljNum = 1;
    //     // //console.log($this.hoverGitMsg.grade)
    //      if($this.hoverGitMsg.grade == 'low'){
    //         $this.boxShowTime = 3;
    //       }else if($this.hoverGitMsg.grade == 'meddle'){
    //           $this.boxShowTime = 6;
    //       }else if($this.hoverGitMsg.grade == 'high'){
    //           $this.boxShowTime = 9;
    //       }
    //     let dataIndex=$this.chatData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<$this.boxShowTime);
    //     if(dataIndex!=-1){
    //         $this.chatData[dataIndex].ljNum++;
    //         $this.chatData[dataIndex].sendTime=data.sendTime
    //     }else{
    //         $this.chatData.push(data);
    //     }
    //     // //console.log($this.chatData)
    //     if (data.gift_type == 4) { //红包
    //       $this.red1 = true;
    //       $this.redId = data.r_id;
    //       $this.redPaper.push(data);
    //     } else {  //礼物

    //       // var GitDTimeout=null;
    //       //搜索用户一样，礼物一样，礼物数量一样的索引  -1则为搜不到
    //       let dataIndex=$this.genGitData.findIndex(res=>res.user_id==data.user_id&&res.gift_id==data.gift_id&&res.gift_num==data.gift_num&&data.sendTime-res.sendTime<$this.boxShowTime);
    //       // //console.log(dataIndex)
    //     if(dataIndex!=-1){
    //          data.ljNum = 1;
    //          $this.genGitData[dataIndex].ljNum ++ ;
    //          $this.genGitData[dataIndex].gift_num = parseInt(data.gift_num);
    //          $this.genGitData[dataIndex].sendTime= data.sendTime;
    //          $this.genGitData[dataIndex].boxShowTime = $this.boxShowTime;
    //      }else{
    //         $this.genGitData.push({
    //           name: data.userName,
    //           avatar: data.avatar,
    //           giftName: data.gift_name,
    //           icon: data.icon,
    //           gift_num: data.gift_num ,
    //           ljNum:1,
    //           sendTime:data.sendTime,
    //           gift_id:data.gift_id,
    //           user_id:data.user_id,
    //           boxShowTime:$this.boxShowTime,
    //           timer:null,
    //           // grade:data.grade
    //           // userType:data.userType
    //         });
    //         dataIndex = $this.genGitData.length - 1;
    //         // //console.log("长度"+$this.genGitData.length);
    //       }
    //       // clearInterval($this.GitDTimeout);
    //       //  $this.GitDTimeout = setInterval(() => {
    //       //      $this.genGitData.forEach((i,d)=>{
    //       //          i.boxShowTime-- ;
    //       //          if(i.boxShowTime == 0){
    //       //              $this.genGitData.splice(d,1);
    //       //          }
    //       //          //console.log(i.giftName+ '::' + i.boxShowTime)
    //       //      })

    //       //      if($this.genGitData.length == 0){
    //       //         clearInterval($this.GitDTimeout);
    //       //      }
    //       //  }, 1000);
    //       clearInterval($this.genGitData[dataIndex].timer);
    //       $this.genGitData[dataIndex].timer = setInterval(() => {
    //            $this.genGitData.forEach((i,d)=>{
    //              if (d != dataIndex){
    //                i.boxShowTime-- ;
    //                if(i.boxShowTime == 0){
    //                    clearInterval(i.timer);
    //                    $this.genGitData.splice(d,1);
    //                }
    //              }else{
    //                $this.genGitData[dataIndex].boxShowTime--;
    //                 if($this.genGitData[dataIndex].boxShowTime == 0){
    //                     clearInterval($this.genGitData[dataIndex].timer);
    //                     $this.genGitData.splice(dataIndex,1);
    //                 }
    //              }

    //            })
    //        }, 1000);

    //       if (data.gift_id == 27) {
    //         $this.SVGA("float.svga", 149);
    //       } else if (data.gift_id == 28) {
    //         $this.SVGA("fireCloud.svga", 153);
    //       } else if (data.gift_id == 17) {
    //         $this.SVGA("phoenix.svga", 138);
    //       } else if (data.gift_id == 15) {
    //         $this.SVGA("lamborghini.svga", 302);
    //       } else if (data.gift_id == 16) {
    //         $this.SVGA("castle.svga", 159);
    //       } else if (data.gift_id == 29) {
    //         $this.SVGA("yacht.svga", 139);
    //       } else if (data.gift_id == 23) {
    //         $this.SVGA("loveyou.svga", 179);
    //       } else if (data.gift_id == 39) {
    //         $this.SVGA("shengdanlaoren.svga", 45);
    //       } else if (data.gift_id == 40) {
    //         $this.SVGA("shengdanhuoche.svga", 76);
    //       } else if (data.gift_id == 41) {
    //         $this.SVGA("zhendongbang.svga", 94);
    //       } else if (data.gift_id == 42) {
    //         $this.SVGA("huanggua.svga", 105);
    //       } else if (data.gift_id == 43) {
    //         $this.SVGA("qiezi.svga", 62);
    //       } else if (data.gift_id == 44) {
    //         $this.SVGA("pibian.svga", 55);
    //       } else if (data.gift_id == 45) {
    //         $this.SVGA("dila.svga", 104);
    //       } else if (data.gift_id == 46) {
    //         $this.SVGA("saqian.svga", 149);
    //       } else if (data.gift_id == 51) {
    //         $this.SVGA("kongmingdeng.svga", 58);
    //       } else if (data.gift_id == 52) {
    //         $this.SVGA("gu.svga", 107);
    //       } else if (data.gift_id == 53) {
    //         $this.SVGA("nnyouyu.svga", 107);
    //       } else if (data.gift_id == 54) {
    //         $this.SVGA("bianpao.svga", 99);
    //       } else if (data.gift_id == 21) {
    //         $this.SVGA("kh.svga", 119);
    //       }
    //     }
    //   }else if (data.type == "subscribe" && !data.isMe) {
    //     // //console.log(data)
    //     // if((!this.$store.state.codeToken)){
    //     //    $this.chatData.push(data);
    //     // }
    //     // else{
    //     //   if(data.user_id!=0){
    //     //     $this.chatData.push(data);
    //     //   }
    //     // }
    //     $this.chatData.push(data);
    //     // //console.log(this.chatData[this.chatData.length-1])

    //     if(this.chatData[this.chatData.length-1].vip>0){

    //       this.hyvip=this.chatData[this.chatData.length-1].vip
    //       if(this.chatData[this.chatData.length-1].user_id == 0) {
    //         this.hyvip = ""  ||  0 ;
    //       }
    //       this.hyvipName = this.chatData[this.chatData.length-1].userName ;
    //       this.vipShow = true ;
    //       setTimeout(() => {
    //         this.vipShow = false ;
    //       }, 2000);
    //     }

    //     // $this.chatData.push(data);

    //     // $this.vipData.push(data) ;
    //     // $this.chatData.push(data);

    //   } else if (data.type == "error") {
    //     this.isLenght = true;
    //     $this.chatErr = data.msg;
    //   }

    //  if(data.dataType=="long_dragon"){
    //   //  //console.log(data)
    //   //  //console.log($this.hostMsg.lottery_id)
    //     $this.clList=[]
    //     data.data.forEach((i,d)=>{
    //         if($this.hostMsg.lottery_id==i.lottery_id){
    //             $this.clList.push(i);
    //         }
    //     })
    //     if($this.clList.length){
    //         this.clshow=true;
    //     }
    //     //console.log( $this.clList)
    //  }
    // },

    send(data, flag) {
      if (this.socket.readyState == 1) {
        this.socket.send(data);
        this.dbData = null;
      } else if (this.socket.readyState == 3) {
        if (flag === true) return;
        this.isLenght = true;
        this.chatErr = "聊天室重连中，请稍等~";
        this.initSocket(data);
      } else if (this.socket.readyState == 0) {
        if (JSON.parse(this.dbData).type == "publish") {
          this.isLenght = true;
          this.chatErr = "聊天室重连中，请稍等~";
        }
      }
    },
    close: function (e) {
      // //console.log(
      //   "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
      // );
      // //console.log("socket已经关闭");
    },
    //判断是否登录
    isLogin() {
      if (
        localStorage.getItem("codeToken") == "" ||
        this.$store.state.userinfo.user_id !=
          JSON.parse(localStorage.getItem("userinfo")).user_id ||
        this.$store.state.userinfo.user_id <= 0
      ) {
        this.isLenght = true;
        this.chatErr = " Đăng nhập để xem phiên bản đầy đủ !";
        this.$refs.focusTextarea.blur();
      }
    },
    sendRedPacket() {
      if (!this.redFormData.amount) {
        this.$message({
          message: "请输入红包金额~",
          type: "warning",
        });
        return;
      }
      if (!this.redFormData.num) {
        this.$message({
          message: "请输入红包个数~",
          type: "warning",
        });
        return;
      }
      if (!this.redFormData.password) {
        this.$message({
          message: "Vui lòng nhập mã thanh toán~",
          type: "warning",
        });
        return;
      }
      if (this.redFormData.password.length != 6) {
        this.$message({
          message: "支付密码应为6位~",
          type: "warning",
        });
        return;
      }

      if (this.socket.readyState == 3) {
        this.initSocket('{"type": "red"}');
      } else {
        this.btnRedLoading = true;
        this.redFormData.anchor_id = this.$route.params.id;
        this.$http({
          method: "post",
          url: this.versionLive2 + "user/send_red",
          data: this.redFormData,
        })
          .then((res) => {
            this.btnRedLoading = false;
            if (res.data.code == 1) {
              this.loadMoney();
              let text_obj = {
                type: "gift",
                room_id: this.$route.params.id,
                gift_type: 4,
                user_id: this.$store.state.userinfo.user_id,
                userName: this.$store.state.username,
                gift_price: this.redFormData.amount,
                gift_num: this.redFormData.num,
                gift_text: this.redFormData.text,
                r_id: res.data.data.rid,
                vip: this.$store.state.userinfo.noble,
                userType: this.userType + "",
              };
              //this.send(JSON.stringify(text_obj));
              this.faRed = false;
              this.redFormData.amount = null;
              this.redFormData.num = null;
              this.redFormData.password = null;
              this.redFormData.text = "恭喜发财";
              this.redId = res.data.data.rid;
            } else if (res.data.code == 2) {
              alertComfirm({ msg: "余额不足，前去充值" }, () => {
                this.isRecharge = true;
              });
              // this.isRecharge = true;
            } else if (res.data.code == 10) {
              alertServe();
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
            }
          })
          .catch((err) => {
            this.btnRedLoading = false;
          });
      }
    },

    sendReceiveRed() {
      if (this.hbClick) {
        this.hbClick = false;
        if (!this.$store.state.codeToken) {
          alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
            this.$store.commit("SETLOGIN", true);
          });
          return;
        }
        this.$http({
          method: "post",
          url: this.versionLive2 + "user/receive_red",
          data: {
            user_id: this.$store.state.userinfo.user_id,
            rid: this.redId,
          },
        })
          .then((res) => {
            this.checkRed(true);
            if (res.data.code == 1) {
              this.red1 = false;
              this.red2 = true;
              this.redInfo = res.data.data;
              this.loadMoney();
            } else {
              this.redInfo = res.data.data;
              this.red1 = false;
              this.red3 = true;
            }
            this.hbClick = true;
          })
          .catch(() => {});
      } else {
        return;
      }
    },
    twoClickRed() {},
    SVGA(url, num, flag, sort) {
      // if(this.special)
      if (flag == "undefined" || flag == null || flag == "") {
        flag = this.special; //是否播放
      }
      if (!sort && !flag) {
        this.giftTime.push({ url: url, num: num });
      }
      if (flag == false || sort == "sort" || this.giftTime.length == 1) {
        let player = new SVGA.Player("#demoCanvas");
        let parser = new SVGA.Parser("#demoCanvas");
        parser.load(
          url,
          (videoItem) => {
            player.loops = 1; // 设置循环播放次数是 1
            player.setVideoItem(videoItem);

            if (!flag) {
              this.isSpecia = true;
              player.stepToFrame(0, true); // 从指定帧开始播放动画
            } else {
              this.isSpecia = false;
              player.stepToFrame(0, 0); // 从指定帧开始播放动画
            }
            player.onFrame((i) => {
              if (i == 1 && num != 302) {
                let dom = document.querySelector("#demoCanvas canvas");
                dom.style.display = "block";
              }
              if (i >= 24 && i < 26) {
              } else if (i == num) {
                this.getLiveRewardList();
                this.giftTime.splice(0, 1);
                let dom = document.querySelector("#demoCanvas canvas");
                dom.style.display = "none";

                player.clear();
                this.isSpecia = false;
                if (this.giftTime.length) {
                  this.SVGA(
                    this.giftTime[0].url,
                    this.giftTime[0].num,
                    "",
                    "sort"
                  );
                }
              }
            });
          },
          function (error) {
            // //console.log(error);
          }
        );
      }
    },
    // 请求钻石
    zsQuest() {
      this.$http
        .get(
          this.versionLive2 +
            "user/diamond_now/?user_id=" +
            this.$store.state.userinfo.user_id
        )
        .then((res) => {
          if (res && res.data.code == 1) {
            if (res.data.data.diamond == null) {
              this.SETDIAMOND(0);
            } else {
              this.SETDIAMOND(res.data.data.diamond);
            }
          }
        });
    },

    // 送出礼物
    sendGift() {
      let text_obj = {
        type: "gift",
        room_id: this.$route.params.id,
        gift_type: 1,
        user_id: this.$store.state.userinfo.user_id,
        userName: this.$store.state.username,
        gift_id: this.currGift.id,
        gift_name: this.currGift.name,
        gift_price: this.currGift.amount,
        gift_num: this.giftFormData.gift_num,
        avatar: this.$store.state.userinfo.avatar,
        // icon: this.gitList[this.currGift.index].icon,
        icon: this.currGift.icon,
        vip: this.$store.state.userinfo.noble,
        userType: this.userType + "",
        grade: this.currGift.grade,
      };
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      if (this.liveData.live_status == 0) {
        alertComfirm({ msg: "未开播不能发送礼物哦" }, () => {});
        return;
      }
      this.btnLoading = true;
      // //console.log(v)
      this.$http.get("/api/user/balance").then((res) => {
        if (res && res.data.code == 1) {
          if (this.socket.readyState == 3) {
            this.initSocket('{"type": "gift"}');
          } else {
            if (!this.currGift.id) {
              this.btnLoading = false;
              alertComfirm({ msg: "您还未选择礼物哦~" });
              return;
            }
            this.giftFormData.gift_id = this.currGift.id;
            this.giftFormData.anchor_id = this.$route.params.id;
            this.$http({
              method: "post",
              url: this.versionLive2 + "live/send_gift",
              data: this.giftFormData,
            })
              .then((res) => {
                this.btnLoading = false;
                if (res.data.code == 1) {
                  this.btnLoading = false;
                  // this.SETDIAMOND(
                  //   this.diamond -
                  //     0 -
                  //     this.currGift.amount * this.giftFormData.gift_num
                  // );
                  this.zsQuest(); //刷新钻石
                  //this.send(JSON.stringify(text_obj));
                  // this.btnLoading = false;
                  if (this.currGift.free_num > this.giftFormData.gift_num) {
                  } else {
                    this.currGift.free_num = 0;
                  }
                  this.findGift(this.currGift.id);
                } else if (res.data.code == 2) {
                  alertComfirm({ msg: "钻石不足，请兑换~" }, () => {
                    this.isEX = true;
                  });
                }
                //  this.btnLoading = false;
              })
              .catch((err) => {
                this.btnLoading = false;
              });
          }
        } else {
          this.btnLoading = false;
        }
      });
    },
    findGift(id) {
      for (let key in this.gifConData) {
        for (let i = 0, len = this.gifConData[key].length; i < len; i++) {
          if (this.gifConData[key][i].id == id) {
            this.gifConData[key][i].free_num =
              this.gifConData[key][i].free_num > this.giftFormData.gift_num
                ? this.gifConData[key][i].free_num - this.giftFormData.gift_num
                : 0;
            this.currGift.free_num = this.gifConData[key][i].free_num;
          }
        }
      }

      console.log(this.currGift.free_num);
      console.log(this.gifConData);
    },
    checkRed(flag) {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "登录后才能抢红包哦~" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }

      //试玩
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      if (this.$store.state.userinfo.noble < 1) {
        this.novipboxShow = true;
        return;
      }
      if (this.redId) {
        this.red1 = true;
      }
      if (flag == "click") return;

      this.$http
        .get(this.versionLive2 + "live/get_room_red", {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
          },
        })
        .then((res) => {
          if (res.data.data.length) {
            this.redId = res.data.data[res.data.data.length - 1].id;
            this.redPaper = res.data.data;
          } else if (res.data.data == 401) {
          } else {
            this.redPaper = [];
            if (flag == true) return;
          }
        });
    },

    //获取礼物列表
    getGiftList() {
      this.$http
        .get(this.versionLive2 + "live/get_gift_list/")
        .then((res) => {
          // //console.log(res.data.data[4]);

          this.giftFetch(res.data.data[1]);
          this.giftFetch(res.data.data[2]);
          this.giftFetch(res.data.data[3]);
          this.giftFetch(res.data.data[4]);
          this.gifNav = res.data.typeList || [];
          this.gifConData = res.data.data || [];
          this.gifConData1 = this.gifConData[1] || [];
          // //console.log(this.gifConData1);
        })
        .catch((err) => {
          //console.log(err);
        });
    },
    giftFetch(data) {
      for (let i = 0; i < data.length; i++) {
        this.gitList.push(data[i]);
      }
      // this.gitList.length = 10 ;
      this.hoverGitMsg = this.gitList;
    },
    //关注主播与取关
    clickFollow() {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "请登录后再进行关注哦~" }, () => {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.isFollowLoading = true;
      // this.$vux.loading.show({text: 'loading...'});
      this.$http({
        method: "post",
        url: this.versionLive2 + "live/follow",
        data: {
          anchor_id: this.$route.params.id,
          user_id: this.$store.state.userinfo.user_id,
        },
      })
        .then((res) => {
          this.isFollowLoading = false;
          if (res.data.code == 1) {
            this.isFollow = !this.isFollow;
            if (res.data.data.isFollow == false) {
              this.liveData.fans--;
            } else {
              this.liveData.fans++;
            }
            this.getLivePreview();
          }
        })
        .catch((err) => {
          this.isFollowLoading = false;
          // this.$vux.loading.hide();
        });
    },
    getLiveRoom() {
      this.$http
        .get(this.versionLive2 + "live/get_live_room", {
          params: {
            anchor_id: this.$route.params.id,
            user_id: this.$store.state.userinfo.user_id,
            client_ip: sessionStorage.getItem("ip"),
          },
        })
        .then((res) => {
          this.liveData = res.data.data;
          this.isFollow = res.data.data.isFollow;
          let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
          let videoObj = res.data.data.liveInfo.find((value) => {
            return value.type == "HDL";
          });
          this.videoSrc = videoObj.liveUrl.originPullUrl;
          // userAgent.indexOf("Firefox") > -1||userAgent.indexOf("QQ") > -1||userAgent.indexOf("Chrome") > -1
          if (
            userAgent.indexOf("Firefox") > -1 ||
            userAgent.indexOf("QQ") > -1
          ) {
            //判断是否Firefox浏览器
            if (!this.player) {
              if (res.data.data.live_status) {
                this.player = new FlvPlayer({
                  id: "mse",
                  url: this.videoSrc,
                  containerStyle: {
                    zIndex: 100,
                  },
                  // url: [{src: '/video/flv/xgplayer-demo-720p.flv', type: 'video/flv'}, {src: '/video/flv/xgplayer-demo-480p.flv', type: 'video/flv'}, {src: '/video/flv/xgplayer-demo-360p.flv', type: 'video/flv'}],
                  playsinline: true,
                  width: "100%",
                  height: 650,
                  // fluid: true,
                  isLive: true,

                  cors: true,
                  // autoplay:true,
                  poster: this.liveData.cover
                    ? this.liveData.cover
                    : this.liveData.avatar,
                  // controls:true,
                  closeVideoClick: true,
                  closeVideoTouch: true,
                  crossOrigin: false,
                  lang: "zh-cn",
                  "x5-video-player-type": "h5",
                });
              }
            }
            this.isShowRtmp = "isFire";
          } else {
            this.playerOptions = {
              // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: true, // 如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: "zh-CN",
              aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [
                {
                  // type: "rtmp/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                  src: "", // url地址
                },
              ],

              techOrder: ["html5", "flash"],
              poster: "", // 你的封面地址
              // height: '650px',
              width: document.documentElement.clientWidth, // 播放器宽度
              notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: false,
                durationDisplay: false,
                remainingTimeDisplay: false,
                playToggle: false,
                fullscreenToggle: true, // 全屏按钮
              },
            };
            //
            let url = this.videoSrc.replace(/\s+/g, "");
            if (url.indexOf("rtmp") > -1) {
              //rtmp格式视频
              this.playerOptions = {
                ...this.playerOptions,
                techOrder: ["html5", "flash"], // 兼容顺序
                sources: [{ src: this.videoSrc, type: "rtmp/flv" }],
                //  res.data.data.liveInfo[2].liveUrl.originPullUrl
              };
            } else if (url.lastIndexOf(".") > -1) {
              if (url.substring(url.lastIndexOf(".") + 1) === "flv") {
                //flv格式视频
                this.playerOptions.techOrder = ["html5", "flvjs"];
                this.playerOptions.techOrder = ["html5", "flvjs"];
                this.playerOptions = {
                  ...this.playerOptions,
                  techOrder: ["html5", "flvjs"], // 兼容顺序
                  flvjs: {
                    mediaDataSource: {
                      isLive: false,
                      cors: true,
                      withCredentials: false,
                    },
                  },
                  sources: [{ src: this.videoSrc, type: "video/x-flv" }],
                };
              } else {
                //其他格式视频
                this.playerOptions = {
                  ...this.playerOptions,
                  sources: [{ src: this.videoSrc, type: "video/mp4" }],
                };
              }
            }
            // this.playerOptions.sources[0].src = this.videoSrc;
            this.playerOptions.poster = this.liveData.cover
              ? this.liveData.cover
              : this.liveData.avatar;
            this.isShowRtmp = "noFire";
          }

          if (res.data.data.red_paper.length) {
            this.redPaper = res.data.data.red_paper;
            this.redId = this.redPaper[this.redPaper.length - 1].id;
          }
          setTimeout(() => {
            // this.$vux.loading.hide();
          }, 100);
        })
        .catch((err) => {
          // this.$vux.loading.hide();
        });
    },
    //获取直播间刷礼物榜单
    getLiveRewardList() {
      this.$http
        .get(this.versionLive2 + "live/get_reward_list", {
          params: {
            anchor_id: this.$route.params.id,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.bdList = res.data.data || [];
            if (this.bdList.length < 9) {
              this.isShowbR = false;
            } else {
              this.isShowbR = true;
            }
          }
        })
        .catch(() => {});
    },
    // 获取聊天室最新的20条聊天记录
    getInitChat() {
      this.$http
        .get(
          this.versionLive2 + "live/initChat?anchor_id=" + this.$route.params.id
        )
        .then((res) => {
          this.chatData = res.data.data;
          // //console.log(this.chatData);
          this.flitImg(this.chatData);
          this.initSocket();
          // this.playList.chatData = this.chatData;
        })
        .catch(function (err) {});
    },
    flitImg(data) {
      let len = this.$refs.vmeChild.emojis.length;
      let fhbq = this.$refs.vmeChild.fhbqList;
      let gzbq = this.$refs.vmeChild.gzbqList;
      let dL = data.length;
      for (let o = 0; o < dL; o++) {
        for (let i = 0; i < len; i++) {
          if (data[o].type == "publish") {
            if (data[o].text.indexOf(this.$refs.vmeChild.emojis[i]) > -1) {
              let len = data[o].text.length;
              for (let j = 0; j < len; j++) {
                this.chatData[o].text = this.chatData[o].text.replace(
                  this.$refs.vmeChild.emojis[i],
                  '<img src="../static/images/chat/emoji/' +
                    this.$refs.vmeChild._emojiName(
                      this.$refs.vmeChild.emojis[i]
                    ) +
                    '">'
                );
              }
            }
          }
        }
        fhbq.forEach((item, i) => {
          if (data[o].type == "publish") {
            if (data[o].text.indexOf(item.flag) > -1) {
              let len = data[o].text.length;
              for (let j = 0; j < len; j++) {
                this.chatData[o].text = this.chatData[o].text.replace(
                  item.flag,
                  '<img src="' +
                    item.imgSrc +
                    '" style="width:20px;vertical-align: middle;margin:0 2px;">'
                );
              }
            }
          }
        });
        gzbq.forEach((item, i) => {
          if (data[o].type == "publish") {
            if (data[o].text.indexOf(item.flag) > -1) {
              let len = data[o].text.length;
              for (let j = 0; j < len; j++) {
                this.chatData[o].text = this.chatData[o].text.replace(
                  item.flag,
                  '<img src="' +
                    item.imgSrc +
                    '" style="width:30px;vertical-align: middle;margin:0 2px;">'
                );
              }
            }
          }
        });
      }
    },
    goLeft() {
      this.bcurrLen--;
      if (this.bcurrLen <= 0) {
        this.isShowbL = false;
      }
      this.isShowbR = true;
      let u = document.querySelector(".lb-ul>ul");
      let ali = document.querySelectorAll(".lb-ul>ul li");
      removeAllactive(getSiblings(ali[this.bcurrLen]));
      ali[this.bcurrLen].classList.add("active");
      u.style.marginLeft = -this.bcurrLen * 54 + "px";
    },
    goRight() {
      this.bcurrLen++;
      if (this.bcurrLen >= this.bdList.length - 7) {
        this.isShowbR = false;
      }
      this.isShowbL = true;
      let u = document.querySelector(".lb-ul>ul");
      let ali = document.querySelectorAll(".lb-ul>ul li");
      removeAllactive(getSiblings(ali[this.bcurrLen + 6]));
      ali[this.bcurrLen + 6].classList.add("active");
      u.style.marginLeft = -this.bcurrLen * 54 + "px";
    },
    goGLeft() {
      this.gitLen--;
      //判断
      // //console.log(this.gitWidth);
      if (this.gitLen <= 0) {
        this.isShowGL = false;
      }
      if (this.gitLen <= -1) {
        // return //console.log("左边边到头了");
      }
      this.isShowGR = true;
      this.isFinalR = true;
      let gu = document.querySelector(".git-box ul");
      gu.style.marginLeft = (-506 + 40) * this.gitLen + "px";
    },
    goGRight() {
      this.gitLen++;
      // //console.log(this.gitLen);
      //隐藏右箭头
      this.gitWidth = document.body.clientWidth - 426 - 200;
      let w = document.querySelector(".git-box ul").offsetWidth;
      //      if (this.allGitWidth / 506 < this.gitLen + 1) {
      if (this.gitLen > 1) {
        if (parseInt(w / 546) < this.gitLen + 1) {
          // //console.log(parseInt(w / 546))
          this.isShowGR = false;
          this.isFinalR = false;
          // //console.log(23)
        }
      } else {
        if (parseInt(w / 546) < this.gitLen + 1) {
          // //console.log(parseInt(w / 546))
          this.isShowGR = false;
          this.isFinalR = false;
          // //console.log(11)
        }
      }

      if (parseInt(w / 546) < this.gitLen) {
        // return //console.log("右边到头了");
      }
      this.isShowGL = true;
      let gu = document.querySelector(".git-box ul");
      if (w < 546) {
        this.isShowGL = false;
      } else {
        gu.style.marginLeft = (-506 + 40) * this.gitLen + "px";
      }
    },
    gifBoxShow() {
      this.gitMsg = false;
      // let dom = document.querySelector('#right-btn');
      if (this.gblist == false) {
        this.gblist = true;
      } else {
        this.gblist = false;
      }
    },
    //历史开奖
    gethistoryList(id, val) {
      if (!this.lottery_id) return;
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
            this.total = res.data.total;
          } else if (res && res.data.code == -1) {
            this.historyList = [];
            this.isLoading = false;
          }
        });
    },
    //历史开奖
    selectChange(val) {
      if (val == "") {
        val = this.total;
      }
      this.gethistoryList(null, val);
    },
    changeDate() {
      if (!this.valueTime) return;
      this.date = this.valueTime;
      this.gethistoryList();
    },
    changeType(index) {
      this.sTitleIndex = index;
    },
    //发送消息
    sendMessage(e) {
      if (!this.$store.state.codeToken) {
        this.isLenght = true;
        this.chatErr = " Đăng nhập để xem phiên bản đầy đủ !";
        this.$refs.focusTextarea.blur();
      } else {
        e.preventDefault();
        this.sendChatMsg();
      }
    },
    //发送消息
    async sendChatMsg() {
      if (!this.$store.state.codeToken) {
        this.$vux.confirm.show({
          title: "",
          content: " Đăng nhập để xem phiên bản đầy đủ !",
          onCancel: () => {
            //console.log(this) //当前 vm
          },
          onConfirm: () => {
            this.$router.push({ name: "login" });
          },
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }

      if (!this.comment_text) {
        //                this.showMsg = true;
        //                this.chatReturnMsg = '您还没有输入内容哦~';
        //         this.$vux.toast.text('您还没有输入内容哦', 'middle')
        this.isLenght = true;
        this.chatErr = "您还没有输入内容哦~";
        return;
      }
      // this.$vux.loading.show({text: '发送中...'});
      let text_obj = {
        type: "publish",
        room_id: this.$route.params.id,
        user_id: this.$store.state.userinfo.user_id,
        userType: this.userType + "",
        userName: this.$store.state.username,
        text: this.comment_text.replace(/\s+/g, " "),
        vip: this.$store.state.userinfo.noble,
      };
      this.send(JSON.stringify(text_obj));
    },
    //发红包弹窗
    async showRed() {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "登录后才能发红包哦~" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      //是否设置支付密码  或者 账号被冻结

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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }

      if (this.safePwd == 1) {
        this.faRed = true;
        return;
      } else if (this.safePwd == 9) {
        alertComfirm(
          { msg: "Bạn chưa đặt mật khẩu thanh toán", conBtText: "Cài đặt ngay" },
          () => {
            this.$router.push("/setting");
          }
        );
        return;
      } else if (this.safePwd == 10) {
        alertServe();
        return;
      }

      this.fPsd = true;
      let res = await this.$http.get("/api2/index/check-fund-password");
      this.fPsd = false;
      if (res && res.data.code == 1) {
        this.SETSAFEPWD(1);
        this.faRed = true;
      } else if (res && res.data.code == 9) {
        this.SETSAFEPWD(9);
        alertComfirm(
          { msg: "Bạn chưa đặt mật khẩu thanh toán", conBtText: "Cài đặt ngay" },
          () => {
            this.$router.push("/setting");
          }
        );
      } else if (res && res.data.code == 10) {
        this.SETSAFEPWD(10);
        alertServe();
      }
    },
    //获取官方系统公告
    async getSystemNotice() {
      let res = await this.$http.get("/api/live/sport/system_notice/");
      if (res && res.data.code == 1) {
        this.systemMsg = res.data.data;
      }
    },
    //获取代理系统公告
    async getSystemNoticeDl() {
      let res = await this.$http.get("/api/live/sport/system_notice_dl/");
      if (res && res.data.code == 1) {
        this.systemMsg = res.data.data;
      }
    },
    //是否首充
    async rechargeIsFirst() {
      if (!this.$store.state.codeToken) return (this.isFirst = true);
      if (this.$store.state.userinfo.user_id < 0) {
        return (this.isFirst = true);
      }
      let res = await this.$http.post(this.versionLive2 + "Recharge/IsFirst", {
        user_id: this.$store.state.userinfo.user_id,
      });
      if (res && res.data.code == 1) {
        if (res.data.data.isfirst == 0) {
          this.isFirst = true;
        } else {
          this.isFirst = false;
        }
      } else {
        this.isFirst = false;
      }
    },
    //屏蔽特效
    specialEffects() {
      if (this.special == false) {
        // //console.log(true);
        //  alertComfirm({ msg: "是否屏蔽特效？" }, () => {
        //    this.SPECIAL(true);
        //    this.pingbi='恢复特效';
        //  })
        this.SPECIAL(true);
        this.pingbi = "恢复特效";
      } else if (this.special == true) {
        // //console.log(false);
        // alertComfirm({ msg: "是否恢复特效？" }, () => {
        //    this.SPECIAL(false);
        //    this.pingbi='屏蔽特效';
        // })
        this.SPECIAL(false);
        this.pingbi = "屏蔽特效";
      }
    },
    //清屏
    clearChatContent(i) {
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      if (i == 2) {
        this.$confirm("管理清屏操作不可恢复!", {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          cancelButtonClass: "btn-width",
          confirmButtonClass: "btn-width",
          roundButton: true,
        }).then(() => {
          this.$http
            .post(this.versionLive2 + "live/clear_chat/", {
              user_id: this.$store.state.userinfo.user_id,
              anchor_id: this.liveData.anchor_id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                // alertComfirm({ msg: res.data.msg }, () => {
                //   this.chatData = [];
                // });
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.chatData = [];
              } else {
                // alertComfirm({ msg: res.data.msg }, () => {});
                this.$message({
                  type: "warning",
                  message: res.data.msg,
                });
              }
            });
        });
      } else {
        this.chatData = [];
      }
    },
    // 礼物-1.1
    chuangeGif(val) {
      this.gifNow = val;
      this.gifConData1 = this.gifConData[parseInt(val)];
      // //console.log(this.gifConData1)
      // //console.log(parseInt(val))
    },
    //预告
    getLivePreview(type) {
      this.$http
        .get(this.versionLive2 + "user/anchor_advance/", {
          params: {
            user_id: "" || this.$store.state.userinfo.user_id,
            type: type || this.noticeType,
          },
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            this.LivePreviewNewNow = res.data.datas || [];
            // //console.log(this.LivePreviewNew.now)
            if (this.day == "now") {
              this.LivePreviewNew = res.data.datas.now || [];
            } else if (this.day == "after") {
              this.LivePreviewNew = res.data.datas.after || [];
            } else if (this.day == "tomorrow") {
              this.LivePreviewNew = res.data.datas.tomorrow || [];
            }
            // this.LivePreviewNew = res.data.datas.now || [];
          }
        });
    },

    //节目预告全部彩种
    getGameRoomList() {
      this.$http.post(this.versionLive2 + "live/get_room_list/").then((res) => {
        if (res && res.data.code == 1) {
          this.gameRoomList = res.data.data || [];
          // //console.log(this.gameRoomList);
          this.gameRoomList.unshift({
            name: "Toàn bộ",
            room_id: this.room_id,
          });
          // //console.log(this.gameRoomList)
        }
      });
    },
    //节目预告切换
    handleClickPreview(type) {
      // //console.log(123)
      this.noticeType = type;
      //  this.day = 'now'
      this.getLivePreview(type);
    },
    toChat(i) {
      if (i.livestatus == 1) {
        this.$router.push("/chat/" + i.aid + "/" + i.lottery_id);
      } else {
        this.$router.push("/HostHome/" + i.aid);
      }
    },
    //节目预告日期切换
    chuangeDay(index) {
      this.day = index;
      this.getLivePreview();
      // if (index == "now") {
      //   this.LivePreviewNew = this.LivePreviewNewNow.now || [];
      // } else if (index == "after") {
      //   this.LivePreviewNew = this.LivePreviewNewNow.after || [];
      // } else if (index == "tomorrow") {
      //   this.LivePreviewNew = this.LivePreviewNewNow.tomorrow || [];
      // }
    },
    //节目预告关注
    PreviewFollow(v) {
      // //console.log(123)
      if (!this.$store.state.codeToken) {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.$http
        .post(this.versionLive2 + "live/follow/?token=" + this.codeToken, {
          anchor_id: v.aid,
          user_id: this.$store.state.userinfo.user_id,
        })
        .then((res) => {
          if (res && res.data.code == 1) {
            if (v.isFollow == false) {
              v.isFollow = true;
            } else {
              v.isFollow = false;
            }
            this.getLivePreview();
            // this.clickFollow();
            this.getLiveRoom();
          }
        })
        .catch((err) => {});
    },
    Chatroom() {
      //聊天室
      this.currType = 1;
      let u = document.querySelector(".lb-ul>ul");
      // //console.log(u);
      // u.style.width = this.bdList.length * 54 + "px";
    },
    Jingcai() {
      //竞猜
      if (!this.$store.state.codeToken) {
        alertComfirm({ msg: "Đăng nhập để xem phiên bản đầy đủ" }, () => {
          this.$store.commit("SETLOGIN", true);
        });
        return;
      }
      this.currType = 2;
      // this.lottery_id = this.liveData.lottery_id;
      // //console.log(this.allLottery)
      ////console.log('3438++++'+this.liveData.lottery_id);
      this.isFollowOrder = false;
    },
    refresh() {
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
              this.$store.commit("SETLOGIN", true);
            }
          });
      }
      this.zsQuest(); //刷新砖石
      this.loadMoney(); //刷新余额
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    clshow: function (n) {
      if (n) {
        setTimeout(() => {
          this.clshow = false;
        }, 8000);
      }
    },
    comment_text: function (n, o) {
      if (!this.$store.state.codeToken) {
        this.comment_text = "";
      }
      if (n.length > 200) {
        this.isLenght = true;
        this.chatErr = "内容最多为200个字符~";
        if (window.timer_l) clearTimeout(window.timer_l);
        window.timer_l = setTimeout(() => {
          this.isLenght = false;
        }, 2000);
        this.comment_text = o;
        return;
      } else {
        if (window.timer_l) clearTimeout(window.timer_l);
        window.timer_l = setTimeout(() => {
          this.isLenght = false;
        }, 2000);
      }
    },
    genGitData: function (n) {
      // //console.log(n);
      // this.$nextTick(() => {
      //   if (n.length >= 2) {
      //     // this.genGitData = n.splice(1,1);
      //     setTimeout(() => {
      //       let dom = document.querySelector(".gifShow-box>div");
      //       if (dom) {
      //         try {
      //           dom.removeNode(true);
      //         } catch (err) {
      //           dom.remove();
      //         }
      //       }
      //     }, 4000);
      //   } else if (n.length == 1) {
      //     setTimeout(() => {
      //       let dom = document.querySelector(".gifShow-box>div");
      //       if (dom) {
      //         try {
      //           dom.removeNode(true);
      //         } catch (err) {
      //           dom.remove();
      //         }
      //       }
      //     }, 4000);
      //   }
      // });
    },
    "redFormData.amount": function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.redFormData.amount = n
            .replace(/[^\d]/g, "")
            .replace(/^0{1,}/g, "");
        });
        if (n - 0 > 2000) {
          this.$nextTick(() => {
            this.redFormData.amount = o;
          });
        }
      }
    },
    "redFormData.password": function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.redFormData.password = n
            .replace(/[^\d]/g, "")
            .replace(/^0{1,}/g, "");
        });
      }
    },
    "redFormData.text": function (n) {
      this.$nextTick(() => {
        this.redFormData.text = n.replace(
          /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi,
          ""
        );
      });
    },
    "redFormData.num": function (n, o) {
      if (n) {
        this.$nextTick(() => {
          this.redFormData.num = n.replace(/[^\d]/g, "").replace(/^0{1,}/g, "");
        });
        if (n - 0 > 2000) {
          this.$nextTick(() => {
            this.redFormData.num = o;
          });
        }
      }
    },
    bdList: function () {
      this.$nextTick(() => {
        let u = document.querySelector(".lb-ul>ul");
        u.style.width = this.bdList.length * 54 + "px";
        //        u.style.marginLeft = -(this.bdList.length - 8) * 46 + "px";
        // //console.log(u.style.width)
      });
    },
    chatData: function (n) {
      this.$nextTick(() => {
        setTimeout(() => {
          // let dom = document.querySelector('.chat-content');
          // let dom = document.querySelector('.el-scrollbar');
          // //console.log(dom.scrollTop);
          // dom.scrollTop = dom.scrollHeight;
          // //console.log(this.$refs['myScrollbar'].wrap.scrollTop);
          this.$refs["myScrollbar"].wrap.scrollTop = 999999999999999999;
          this.flitImg(n);
        }, 0);
        // setTimeout(()=>{
        //   dom.scrollTop = 999;
        // },0)
      });
    },
    inData: function (n, o) {
      let dom1 = document.querySelector(".showuser-In");
      setTimeout(() => {
        this.showUserIn(n);
      }, 5000);
      setTimeout(() => {
        let dom = document.querySelector(".showuser-In>span");
        if (dom) {
          dom.remove();
          this.inData.splice(0, 1);
        }
      }, 9000);
    },
    gitList: function () {
      this.$nextTick(() => {
        let gitW = document.body.clientWidth - 442 - 200;
        this.gitWidth = gitW;
        let gu = document.querySelector(".git-box ul");
        if (gu) gu.style.width = 19 * 100 + "px";
        this.allGitWidth = 19 * 100;
        this.allGitWidth = 19 * 100;
        if (this.allGitWidth <= this.gitWidth) this.isShowGR = false;
      });
    },
    // vipData:function (n) {
    //         //console.log(n);
    //         setTimeout(()=>{
    //           let dom = document.querySelector('.hellovip>.hyvip');
    //           if(dom){
    //             dom.remove();
    //             this.vipData.splice(0,1)
    //           }
    //         },3000)
    //       },
  },
  components: {
    vme,
    Quiz,
    BigTurntable,
    // DZP
  },
  destroyed() {
    if (!this.$store.state.codeToken) return;
    if (this.$store.state.userinfo.user_id < 0) return;
    this.$http
      .get(this.versionLive2 + "live/live_play_history/", {
        params: {
          anchor_id: this.liveData.anchor_id,
          flag: "end",
          history_id: this.playHistorId,
        },
      })
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {});
  },
};
</script>

<style lang="less">
#chat {
  background: #f4f5f8;
  /*padding: 20px 100px 0 100px;*/
  padding: 20px 0 0 0;
  margin: 0 auto;
  width: 1400px;
  .video-room {
    height: 853px;
    width: 100%;
    margin: 0 auto;
    > div {
      border-radius: 4px;
      // overflow: hidden;
    }
  }
  .novip-dialog .el-dialog__body {
    padding: 0 14px 30px 14px;
  }
  .novip-dialog .el-dialog {
    border-radius: 10px;
  }
  .novip-box {
    text-align: center;
    h2 {
      font-size: 18px;
      margin: 24px 0 20px;
    }
    p {
      font-size: 16px;
      color: #333333;
      line-height: 30px;
      padding: 0 90px;
    }
    .novip-btn {
      display: flex;
      justify-content: space-around;
      margin-top: 24px;
      span {
        display: block;
        text-align: center;
        width: 160px;
        height: 52px;
        line-height: 52px;
        background: #ff3f30;
        font-size: 18px;
        color: #fff;
        border-radius: 30px;
        cursor: pointer;
      }
    }
  }
  .video-container {
    z-index: 999;
    height: 100%;
    width: 958px;
    float: left;
    background: #fff;
    position: relative;
    .video-top {
      height: 106px;
      /*min-width: 758px;*/
      dl {
        margin: 20px 0 0 20px;
        dt {
          cursor: pointer;
          margin-right: 10px;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .nick-name {
          font-size: 18px;
          font-weight: bold;
          padding: 8px 0 15px 0;
          .tj-zb {
            display: inline-block;
            width: 70px;
            height: 20px;
            cursor: pointer;
            background: url("../../assets/imgaes/chat/tj_zb.png") no-repeat;
            background-size: contain;
            vertical-align: sub;
          }
          .tj-zb-over {
            background: url("../../assets/imgaes/chat/tj_zb_over.png") no-repeat;
            background-size: contain;
          }
        }
        p {
          color: #999;
          .online-room {
            padding-right: 15px;
          }
          .online-num {
            padding-left: 20px;
            background: url("../../assets/imgaes/chat/chat_20.png") no-repeat
              left center;
            background-size: contain;
            padding-right: 30px;
          }
          .online-time {
            padding-left: 20px;
            background: url("../../assets/imgaes/chat/chat_22.png") no-repeat
              left center;
            background-size: contain;
          }
        }
      }
      .follow-box {
        margin: 33px 20px 0 0;
        > div,
        > .el-button {
          padding: 10px 20px;
          font-size: 14px;
          text-align: center;
          border-radius: 20px;
          width: auto;
          height: auto;
          .follow-num {
            position: relative;
            padding-left: 20px;
            display: inline-block;
            margin-left: 20px;
            &:after {
              content: "";
              position: absolute;
              width: 1px;
              height: 19px;
              left: 0;
              top: 0;
              background: #ff5867;
            }
          }
          .follow-text {
            padding-left: 10px;
            cursor: pointer;
          }
        }
        .follow-btn {
          background: url("../../assets/imgaes/chat/chat_13.png") #ff1c30 20px
            center no-repeat !important;
          /*background-size: 50%;*/
          cursor: pointer;
          color: #fff;
          &:after {
            background: #ff5867;
          }
        }
        .overFollow-btn {
          cursor: pointer;
          /*display: none;*/
          background: url("../../assets/imgaes/chat/chat_11.png") #f2f2f2 12px
            center no-repeat !important;
          color: #999;
          .follow-num:after {
            background: #ccc;
          }
        }
      }
    }
    .video-content {
      height: 650px;
      min-width: 758px;
      background: #2f2f2e;
      /*overflow: hidden;*/
      // position: relative;
      .no-open {
        font-size: 16px;
        text-align: center;
        padding-top: 250px;
        .host-headImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          background: #000;
          display: inline-block;
          img {
            width: 100%;
          }
        }
        .no-open-tip {
          background: url("../../assets/imgaes/chat/noopen.png") no-repeat
            center;
          height: 40px;
          line-height: 40px;
          margin: 10px 0;
          color: #fff;
        }
        .next-open-time {
          color: #999;
        }
      }
      .video-player {
        height: 650px;
        display: flex;
        align-items: center;
      }
      .video-js {
        height: 650px;
      }
      .video-js .vjs-modal-dialog:focus {
        outline: none !important;
      }
      .video-js .vjs-modal-dialog {
        z-index: 11;
      }
      .vjs_video_3-dimensions.vjs-fluid {
        /*padding-top: 0!important;*/
        height: 650px;
      }
      .vjs-modal-dialog .vjs-modal-dialog-content {
        padding: 160px 24px;
      }
      .vjs-poster {
        background-size: cover;
        background-position: top center;
      }
      .video-js .vjs-tech {
        /*pointer-events: none;*/
        z-index: 10;
      }
      /*.video-js .vjs-tech[type='application/x-shockwave-flash']{*/
      /*  z-index: 999;*/
      /*  pointer-events: auto;*/
      /*}*/
      .vjs-custom-skin > .video-js .vjs-control.vjs-live-control {
        display: block !important;
        flex: none;
      }
      .vjs-custom-skin > .video-js .vjs-progress-control.vjs-control,
      .video-js .vjs-time-control,
      .video-js .vjs-picture-in-picture-control {
        z-index: -11;
        opacity: 0;
      }
    }
    .gbox-list {
      position: absolute;
      bottom: 108px;
      right: 0;
      z-index: 1000;
      min-height: 194px;
      width: 515px;
      background: #fff;
      border-radius: 4px;
      padding: 20px;
      border: 1px solid #ddd;
      &:before {
        content: "";
        position: absolute;
        width: 14px;
        height: 9px;
        // right: 92px;
        right: 14px;
        bottom: -9px;
        background: url("../../assets/imgaes/chat/jiantou-min.png") no-repeat;
      }
      .gif-nav {
        margin-bottom: 10px;
        ul {
          li {
            font-size: 14px;
            color: #333;
            margin-right: 40px;
            height: 22px;
            cursor: pointer;
            &.is-active {
              color: #ff1c30;
              position: relative;
              &:before {
                position: absolute;
                content: "";
                width: 20px;
                height: 2px;
                background-color: #ff1c30;
                bottom: 0px;
                left: 50%;
                transform: translateX(-50%);
              }
            }
            // &:hover {
            //   border-color: #ff1c30;
            // }
          }
        }
      }

      .gif-content {
        // position: relative;
        .active {
          border: 1px solid #ff1c30;
        }
        li {
          width: 50px;
          height: 50px;
          // overflow: hidden;
          border-radius: 4px;
          border: 1px solid #eee;
          margin: 10px 0 0 10px;
          cursor: pointer;
          // position: relative;
          &:hover {
            border: 1px solid #ff1c30;
          }
          &:nth-child(1) {
            margin: 10px 0 0 0;
          }
          &:nth-child(9) {
            margin: 10px 0 0 0;
          }
          &:nth-child(17) {
            margin: 10px 0 0 0;
          }
        }
        img {
          width: 100%;
        }
      }
    }
    .git-box {
      width: 100%;
      padding: 9px 10px;
      position: relative;
      min-width: 758px;
      height: 100px;
      position: relative;
      // .show-img-msg {
      //   position: absolute;
      //   top: -115px;
      //   width: 200px;
      //   height: 108px;
      //   border-radius: 4px;
      //   z-index: 100;
      //   background: #fff;
      //   border: 1px solid rgba(170, 170, 170, 1);
      //   padding: 20px 0 20px 25px;
      //   z-index: 10001;
      //   &:before {
      //     position: absolute;
      //     content: "";
      //     left: 50%;
      //     bottom: -19px;
      //     transform: translateX(-50%);
      //     float: left;
      //     width: 0;
      //     height: 0;
      //     border-width: 10px;
      //     border-style: solid;
      //     border-color: #fff transparent transparent transparent;
      //   }
      //   .name {
      //     font-size: 14px;
      //     font-weight: bold;
      //     margin: 10px 0 10px 20px;
      //   }
      //   .amount {
      //     font-size: 14px;
      //     color: #ff1c30;
      //     margin-left: 20px;
      //   }
      //   img {
      //     height: 68px;
      //     width: 68px;
      //   }
      // }
      .show-img-msg {
        top: -126px !important;
        // top: -133px !important;
        width: 382px;
        i {
          width: 100%;
          // background: pink;
          height: 15px;
          position: absolute;
          bottom: -15px;
          left: 0;
        }
      }
      .show-img-msg3 {
        top: -104px !important;
        // top: -100px !important;
        width: 282px;
        // position: relative;
        i {
          width: 100%;
          // background: pink;
          height: 15px;
          position: absolute;
          bottom: -15px;
          left: 0;
        }
      }
      .show-img-msg4 {
        left: 0;
        direction: none;
      }
      .show-img-msg2 {
        padding: 20px 10px 10px 10px !important;
      }
      .show-img-msg1,
      .show-img-msg2,
      .show-img-msg,
      .show-img-msg3 {
        line-height: normal;
        position: absolute;
        // position: relative;
        top: -276px;
        // width: 200px;
        // height: 108px;
        border-radius: 4px;
        z-index: 100;
        background: #fff;
        border: 1px solid #ddd;
        padding: 10px 10px 15px 15px;
        z-index: 10001;
        // animation: scale-in-ease .5s cubic-bezier(.22,.58,.12,.98);
        // transition: all .2s cubic-bezier(.22,.58,.12,.98);
        // max-width: 382px;
        // min-width: 274px;
        // right:0;
        user-select: none;
        > dl {
          margin-bottom: 10px;
        }
        &:before {
          position: absolute;
          content: "";
          left: 50%;
          bottom: -19px;
          transform: translateX(-50%);
          height: 9px;
          // right: 35px;
          bottom: -9px;
          width: 20px;
          background: url("../../assets/imgaes/chat/jiantou-min.png") no-repeat;
          // float: left;
          // width: 0;
          // height: 0;
          // border-width: 10px;
          // border-style: solid;
          // border-color: #fff transparent transparent transparent;
        }
        .name {
          font-size: 14px;
          font-weight: bold;
          margin: 10px 0 10px 20px;
        }
        .amount {
          font-size: 14px;
          color: #ff1c30;
          margin-left: 20px;
        }
        img {
          height: 68px;
          width: 68px;
        }
        .send-num {
          width: 62px !important;
          height: 30px !important;
          line-height: 30px !important;
          margin-top: 20px !important;
          margin-left: 25px !important;
          color: #fff !important;
          background-color: #ff1c30 !important;
          border: none !important;
        }
        .send-nun {
          display: inline-block;
          text-align: center;
          width: 44px;
          line-height: 20px;
          height: 20px;
          font-style: 12px;
          color: #333;
          background-color: #eee;
          border: 1px solid #dddddd;
          border-radius: 4px;
          margin-right: 6px;
          cursor: pointer;
          &.active {
            color: #fff;
            background-color: #ff1c30;
            border: none;
          }
        }
      }
      .git-content {
        position: relative;
        // width: 506px;
        width: 615px;
        // overflow: hidden;
        /*margin: 0 auto;*/
        height: 60px;
        float: right;
        text-align: right;
        ul {
          width: 100% !important;
          li {
            position: relative;
            .img-box {
              width: 100%;
              height: 100%;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
            i {
              position: absolute;
              top: -8px;
              right: -6px;
              display: block;
              background: red;
              line-height: 16px;
              padding: 0 4px;
              border-radius: 8px;
              color: #fff;
            }
          }
        }
      }

      .money-diamod {
        position: absolute;
        right: 10px;
        bottom: 12px;
        p {
          font-size: 14px;
          color: #333;
          display: inline-block;
          /*margin-right: 10px;*/
          a {
            /*float: right;*/
            margin-left: 15px;
            display: inline-block;
            border-bottom: 1px solid #fff;
            &:hover {
              color: #ff1c30;
              border-bottom: 1px solid #ff1c30;
            }
          }
        }
      }
      .send-git-btn {
        float: right;
        display: inline-block;
        cursor: pointer;
        width: 74px;
        height: 50px;
        line-height: 50px;
        border-radius: 4px;
        font-size: 14px;
        color: #fff !important;
        padding: 0;
        text-align: center;
        background: #bcc3cf !important;
        float: right;
        margin-left: 5px;
      }
      .send-git-btn.active {
        background: #ff1c30 !important;
        border: none !important;
      }
      .user-balance {
        margin-top: 6px;
        margin-right: 30px;
      }
      .user-balance i {
        display: inline-block;
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat left
          center;
        background-position: 0 -959px;
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        margin-right: 5px;
      }
      .user-diamon i {
        display: inline-block;
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat left
          center;
        background-position: 0 -989px;
        width: 20px;
        height: 20px;
        vertical-align: bottom;
        margin-right: 5px;
      }
      ul {
        // overflow: hidden;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        height: 50px;
        width: 1140px;

        > li {
          float: left;
          width: 50px;
          height: 50px;
          /*margin-top: 16px;*/
          line-height: 50px;
          border: 1px solid #eee;
          border-radius: 4px;
          // overflow: hidden;
          margin-left: 9px;
          text-align: center;
          cursor: pointer;
          > img {
            width: 100%;
          }
          &:hover {
            border: 1px solid #ff1c30;
          }
        }
        .active {
          border: 1px solid #ff1c30;
        }
      }
      .bd-btn {
        width: 20px;
        height: 50px;
        border: 1px solid #eee;
        cursor: pointer;
        border-radius: 2px;
        overflow: hidden;
      }
      .left-btn {
        /*margin-left: 20px;*/
        background: url("../../assets/imgaes/chat/chat_06.png") #fff center
          no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        &:hover {
          background: url("../../assets/imgaes/chat/small-left@2x.png") #ff1c30
            center no-repeat;
        }
      }
      .right-btn {
        /*margin-left: 20px;*/
        background: url("../../assets/imgaes/chat/chat-right.png") #fff center
          no-repeat;
        position: absolute;
        right: 0;
        top: 0;
        &:hover {
          background: url("../../assets/imgaes/chat/small-right@2x.png") #ff1c30
            center no-repeat;
        }
      }
      .right-btn1 {
        /*margin-left: 20px;*/
        background: url("../../assets/imgaes/chat/jiantou.png") #ff1c30 center
          no-repeat;
        position: absolute;
        right: 0;
        top: 0;
      }
      .right-btn-box {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        height: 100px;
        background: #fff;
      }
      .left-btn-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 50px;
        height: 100px;
        background: #fff;
      }
      .first-charge-msg {
        // width: 350px;
        width: 200px;
        height: 80px;
        float: left;
        padding-left: 15px;
        > div:nth-child(1) {
          height: 60%;
        }
        > div:nth-child(2) {
          height: 40%;
        }
        > .first-charge > img {
          cursor: pointer;
        }
        .git-msg {
          margin-top: 7px;
        }
        .git-msg > span {
          /*text-align: center;*/
          padding-left: 15px;
          display: inline-block;
          width: 320px;
          height: 25px;
          line-height: 25px;
          background: rgba(245, 245, 245, 1);
          border-radius: 13px;
          color: #666666;
          font-size: 14px;
          position: absolute;
          // width: 61.5%;
          width: 50%;
          > marquee {
            float: right;
            width: 87%;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .chat-container {
    /*display: none;*/
    float: right;
    padding-left: 22px;
    width: 442px;
    height: 810px;
    background: #f4f5f8;
    position: relative;
    .jinyan {
      width: 420px;
      height: 128px;
      line-height: 128px;
      text-align: center;
      background: #fff;
      color: #bdbdbd;
      position: absolute;
      bottom: -10px;
      z-index: 100;
      font-size: 14px;
    }
    /*vip进入直播间*/
    .hellovip {
      // width: 420px;
      // height: 34px;
      position: absolute;
      bottom: 220px;
      left: 22px;
      z-index: 999;
      overflow: hidden;
      font-size: 14px;
      animation: leftToRight 2s;
      -webkit-animation: leftToRight 2s;
      animation-fill-mode: forwards;
      -webkit-animation-fill-mode: forwards;
      p {
        position: absolute;
        top: 35%;
        z-index: 101;
        left: 148px;
        color: #fff;
      }
      .hyvip {
        position: absolute;
        left: 0;
        width: 300px;
        height: 34px;
        line-height: 34px;
        color: #666;
        text-align: center;
        background: linear-gradient(
          90deg,
          rgba(255, 225, 209, 1) 0%,
          rgba(255, 240, 225, 1) 100%
        );
        // animation: leftToRight 1s;
        // -webkit-animation: leftToRight 1s;
        // animation-fill-mode:forwards;
        // -webkit-animation-fill-mode:forwards;
        .vip-type {
          color: #ff513e;
          font-weight: bold;
          font-style: italic !important;
          margin: 0 5px;
        }
        .vip-name {
          color: #d3904e;
          font-weight: bold;
          margin: 0 5px;
        }
        &:after {
          position: absolute;
          content: "";
          height: 100%;
          width: 30px;
          background: url("../../assets/imgaes/chat/rightBg.png") no-repeat;
          background-size: 100% 100%;
          left: 300px;
          top: 0;
        }
      }
    }
    @keyframes leftToRight {
      from {
        left: -420px;
      }
      to {
        left: 22px;
      }
    }

    .clear-manage {
      position: absolute;
      right: 10px;
      top: 100px;
      z-index: 1;
      height: 30px;
      line-height: 30px;
      width: 101px;
      border-radius: 4px;
      border: 1px solid #dfe0e5;
      color: #999;
      font-style: 14px;
      cursor: pointer;
      background: #fff;
      .gl-icon {
        width: 17px;
        height: 19px;
        background: url("../../assets/imgaes/chat/clear.png") center no-repeat;
        background-size: contain;
        display: inline-block;
        margin: 0px 6px 0 10px;
        vertical-align: text-bottom;
      }
    }
    .red-tip {
      position: absolute;
      right: 20px;
      bottom: 270px;
      cursor: pointer;
      width: 62px;
      height: 86px;
      background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
      background-position: 0 -862px;
      -webkit-animation: shake 1s infinite linear;
      -o-animation: shake 1s infinite linear;
      animation: shake 1s infinite linear;
    }
    .red-box {
      background: rgba(0, 0, 0, 0.5);
      height: 676px;
      width: 420px;
      position: absolute;
      left: 22px;
      top: 89px;
      > div.red-content {
        width: 270px;
        height: 350px;
        margin: 130px auto 0;
      }
      .show-red {
        position: relative;
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: 0px -52px;
        .open-btn {
          width: 78px;
          height: 78px;
          cursor: pointer;
          top: 105px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .show-money,
      .show-no-money {
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: 0px -502px;
        color: #ffe1bb;
        text-align: center;
        .msg-tip {
          text-align: center;
          color: #c38063;
          font-size: 14px;
          padding-top: 17px;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            top: 25px;
            left: 39px;
            width: 48px;
            height: 1px;
            background: #c38063;
          }
          &:after {
            position: absolute;
            content: "";
            top: 25px;
            right: 39px;
            width: 48px;
            height: 1px;
            background: #c38063;
          }
        }
        .money {
          text-align: center;
          font-size: 40px;
          color: #ff3340;
          font-family: number1;
          font-weight: bold;
          display: inline-block;
          margin-top: 30px;
        }
        .head-img {
          width: 83px;
          height: 83px;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #f3bc88;
          margin: 25px auto 20px;
          background: #f3bc88;
          > img {
            width: 100%;
          }
        }
        .user-name {
          text-align: center;
          font-size: 20px;
        }
        .zfy {
          text-align: center;
          font-size: 20px;
          padding-top: 10px;
        }
      }
      .show-no-money {
        display: block;
        .ay-tip {
          font-size: 20px;
          color: #c38063;
          padding: 32px 0 15px 0;
        }
        .low-tip {
          font-size: 16px;
          color: #c38063;
        }
      }
      .remove-icon {
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: -44px 0px;
        width: 16px;
        height: 16px;
        position: absolute;
        cursor: pointer;
        top: 100px;
        right: 70px;
      }
    }
    .chat-bang {
      height: 88px;
      position: relative;
      border-bottom: 1px solid #eee;
      background: #fff;
      .lb-ul {
        width: 373px;
        padding: 24px 0;
        margin: 0 auto;
        overflow: hidden;
      }
      ul {
        transition: all 0.5s;
        -webkit-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -o-transition: all 0.5s;
        > li {
          width: 40px;
          height: 40px;
          margin: 0 8px 0 6px;
          // overflow: hidden;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          position: relative;
          &.active {
            -webkit-animation: s_to_b 0.5s forwards;
            -o-animation: s_to_b 0.5s forwards;
            -ms-animation: s_to_b 0.5s forwards;
            animation: s_to_b 0.5s forwards;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .No1 {
            width: 50px;
            height: 53px;
            position: absolute;
            left: -6px;
            top: -11px;
          }
        }
      }
      .bd-btn {
        position: absolute;
        width: 14px;
        height: 52px;
        border: 1px solid #eee;
        top: 18px;
        cursor: pointer;
        border-radius: 2px;
        overflow: hidden;
      }
      .left-btn {
        left: 9px;
        background: url("../../assets/imgaes/chat/chat_06.png") #fff center
          no-repeat;
        &:hover {
          background: url("../../assets/imgaes/chat/small-left@2x.png") #ff1c30
            center no-repeat;
        }
      }
      .right-btn {
        right: 9px;
        background: url("../../assets/imgaes/chat/chat-right.png") #fff center
          no-repeat;
        &:hover {
          background: url("../../assets/imgaes/chat/small-right@2x.png") #ff1c30
            center no-repeat;
        }
      }
    }
    .chat-content {
      padding: 0 10px;
      a {
        display: block;
      }
      > li {
        > section {
          word-wrap: break-word;
          white-space: pre-wrap;
          position: relative;
          &:before {
            position: absolute;
            content: "";
            width: 46px;
            height: 16px;
            left: 0px;
            top: 1px;
          }
        }
        position: relative;
        margin-bottom: 14px;
        .chitchat {
          position: relative;
          max-width: 350px;
          min-width: 250px;
          background: #f4f5f8;
          margin-left: 10px;
          border-radius: 0 4px 4px 4px;
          padding: 10px;
          &:before {
            position: absolute;
            content: "";
            width: 60px;
            height: 20px;
            left: 10px;
            top: 10px;
          }
          &:after {
            position: absolute;
            content: "";
            left: -8px;
            top: 0;
            width: 8px;
            height: 15px;
            background: url("../../assets/imgaes/chat/sanjiap.png") no-repeat;
          }
        }
        .chat-photo {
          width: 38px;
          height: 38px;
          overflow: hidden;
          border-radius: 50%;
          cursor: pointer;
          img {
            width: 38px;
            height: 38px;
          }
          // span{
          //   display: block;
          //   overflow: hidden;
          //   img{
          //     width: 100%;
          //   }
          // }
        }
        .nick-name {
          color: #999;
          float: left;
          cursor: pointer;

          // display: inline-block;
        }
        .active {
          cursor: pointer;
        }
        .chat-say-content {
          display: block;
          line-height: 18px;
          padding-top: 12px;
          img {
            width: 20px;
            vertical-align: middle;
            margin: 0 2px;
          }
        }
        .say-content {
          color: #333;

          > img {
            width: 1.2rem;
            text-indent: 0;
          }
          .ljnum {
            font-style: italic;
            font-weight: bold;
            font-style: 16px;
          }
        }
        &:before {
          position: absolute;
          content: "";
          width: 60px;
          height: 20px;
          left: 0;
          top: 1px;
        }
        .vip3 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv3.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .vip2 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv2.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .vip7 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv7.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .vip1 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv1.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .vip4 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv4.2.png") no-repeat !important;
            // background-position: 0 -1163px;
            background-size: contain !important;
          }
        }
        .vip5 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv5.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .vip6 {
          span:nth-child(1) {
            padding-left: 65px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/VIP-lv6.2.png") no-repeat !important;
            background-size: contain !important;
          }
        }
        .host {
          span:nth-child(1) {
            padding-left: 52px !important;
          }
          &:before {
            background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat !important;
            background-position: -56px -1019px !important;
          }
        }
        .admin {
          span:nth-child(1) {
            padding-left: 52px;
          }
          &:before {
            background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
            background-position: 0px -1019px;
          }
        }
      }
      .vip0:before,
      .vip:before {
        position: absolute;
        content: "";
        width: 0;
        height: 0;
      }
    }
    .footer-input {
      background: #fff;
      height: 90px;
      padding: 20px 10px;
      position: relative;
      .emoticon-icon {
        position: absolute;
        content: "";
        background: url("../../assets/imgaes/chat/chat_28.png") no-repeat;
        width: 30px;
        height: 30px;
        top: 26px;
        right: 135px;
        cursor: pointer;
      }
      .redpack-icon {
        position: absolute;
        content: "";
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: 0 0;
        width: 34px;
        height: 42px;
        top: 19px;
        right: 10px;
        cursor: pointer;
      }
      .say-box {
        width: 360px;
        height: 42px;
        line-height: 42px;
        border-radius: 4px;
        border: 1px solid #eee;
        overflow: hidden;
      }
      .barrage-input,
      .no-vip {
        float: left;
        border: none;
        // width: 240px;
        // padding: 0 10px;
        // line-height: 18px;
        // margin-top: 12px;
        width: 280px;
        padding: 0 10px;
        line-height: 38px;
      }
      .no-vip {
        font-size: 14px;
        background-color: #eee;
        color: #aaa;
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
      }
      .send-btn {
        float: right;
        width: 74px;
        text-align: center;
        color: #fff;
        background: #bcc3cf;
        border: 1px solid #bcc3cf;
        cursor: pointer;
      }
      .active {
        background: #ff1c30;
        border: 1px solid #ff1c30;
      }
      .beyond-txt {
        position: absolute;
        top: 1px;
        left: 16px;
        color: red;
      }
    }
    .chat-toolbar {
      background: #fff;
      display: flex;
      padding-left: 10px;
      border-top: 1px solid #eee;
      > div {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 12px;
        padding: 10px 0 4px 0;
        cursor: pointer;
        > div {
          width: 22px;
          height: 22px;
          margin-right: 2px;
        }
        .bq-icon {
          background: url("../../assets/imgaes/chat/chat_28.png") no-repeat;
          background-size: 100% 100%;
        }
        .bq-icon1 {
          background: url("../../assets/imgaes/chat/biaoqing-icon.png")
            no-repeat;
          background-size: 100% 100%;
        }
        .qp-icon {
          background: url("../../assets/imgaes/chat/clear-icon.png") no-repeat;
          background-size: 100% 100%;
        }
        .pb-icon {
          background: url("../../assets/imgaes/chat/pibi-min.png") no-repeat;
          background-size: 100% 100%;
        }
        .pb-icon-clear {
          background: url("../../assets/imgaes/chat/pingbi-icon.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    #demoCanvas {
      z-index: -1;
      canvas {
        z-index: 1;
      }
    }
    // 一般礼物加载
    .gifShow-box {
      position: absolute;
      top: 20%;
      width: 65%;
      z-index: 99;
      left: 9%;
      // z-index: 2;
      .gifShow {
        /*background: url(../../assets/imgaes/giftBg.png) no-repeat center;*/
        /*background-size: 100% 100%;*/
        /*display: none;*/
        height: 50px;
        left: -10px;
        display: none;
        position: relative;
        .tx {
          display: inline-block;
          float: left;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #fff;
          margin: 8px;
          position: absolute;
          z-index: 1;
          top: -4px;
          left: -4px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .nickAGif {
          float: left;
          display: inline-block;
          width: 210px;
          height: 80px;
          /*background: rgba(255, 38, 57, 0.9);*/
          background: url("../../assets/imgaes/chat/gitbg.png") no-repeat;
          background-size: 100%;
          position: relative;
          padding-left: 44px;
          border-radius: 4px;
          dt {
            color: #fff;
            font-size: 16px;
            font-weight: 400;
            height: 50%;
            line-height: 48px;
            /*background:rgba(255,38,57,0.9);*/
          }
          .active {
            font-size: 12px;
          }
          dd {
            color: #fff;
            font-size: 14px;
            /*background:rgba(255,38,57,0.9);*/
            /*background-image:linear-gradient(to right,#FF2639,white,red)*/
            span {
              color: #ffe400;
            }
          }
        }
        .gifts {
          height: 50px;
          float: left;
          width: 50px;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 9px;
          img {
            width: 100%;
            /*margin: 5px;*/
          }
        }
        .num {
          position: absolute;
          right: 10px;
          // right: 20px;
          top: 10px;
          font-size: 55px;
          font-family: DIN;
          font-weight: bold;
          font-style: italic;
          color: rgba(255, 228, 0, 1);
          -webkit-text-stroke: 2px undefined;
          text-stroke: 2px undefined;

          /*background:linear-gradient(-12deg,rgba(255,228,0,1) 0%, rgba(255,247,180,1) 100%);*/
          /*-webkit-background-clip:text;*/
          /*-webkit-text-fill-color:transparent;*/
          i {
            font-size: 0.6em;
            padding-left: 8px;
            font-style: italic;
          }
        }
        .num1 {
          right: 10px !important;
        }
        .num10 {
          right: -25px !important;
        }
        .num100 {
          right: -55px !important;
        }
      }
      .fadeInLeft {
        display: flex;
        animation-name: fadeInLeft;
        -webkit-animation: fadeInLeft;
        animation-duration: 3s !important;
        // animation-duration: 2s !important;
        -webkit-animation-duration: 3s !important;
        // -webkit-animation-duration: 2s !important;
        animation-fill-mode: both !important;
        -webkit-animation-fill-mode: both !important;
      }
      .fadeInHide {
        display: flex;
        animation-name: fadeInHide;
        -webkit-animation: fadeInHide;
        animation-duration: 1.5s !important;
        -webkit-animation-duration: 1.5s !important;
        animation-fill-mode: both !important;
        -webkit-animation-fill-mode: both !important;
      }
      .fadeInShow {
        display: flex;
        opacity: 1;
        -webkit-transform: translateY(-0); /* Safari */
        transform: stranslateY(-0); /* 标准语法 */
      }
    }
    @keyframes fadeInHide {
      10% {
        opacity: 0.5;
        -webkit-transform: translateY(-10); /* Safari */
        transform: stranslateY(-10); /* 标准语法 */
      }
      50% {
        opacity: 0;
        -webkit-transform: translateY(-100px); /* Safari */
        transform: stranslateY(-100px); /* 标准语法 */
      }
      100% {
        opacity: 0;
        -webkit-transform: translateY(-100px); /* Safari */
        transform: stranslateY(-100px); /* 标准语法 */
      }
    }
    @keyframes fadeInLeft {
      0% {
        opacity: 0;
        -webkit-transform: translate(-1000px, 0);
        transform: translate(-1000px, 0);
      }
      50% {
        opacity: 1;
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
      }

      55% {
        opacity: 1;
        -webkit-transform: translateY(-0); /* Safari */
        transform: translateY(-0); /* 标准语法 */
      }
      // 60% {
      //   opacity: 0.5;
      //   -webkit-transform: translateY(-10); /* Safari */
      //   transform: translateY(-10); /* 标准语法 */
      // }
      // 80% {
      //   opacity: 0;
      //   -webkit-transform: translateY(-100px); /* Safari */
      //   transform: translateY(-100px); /* 标准语法 */
      // }
      // 100% {
      //   opacity: 0;
      //   -webkit-transform: translateY(-100px); /* Safari */
      //   transform: translateY(-100px); /* 标准语法 */
      // }
    }

    @-webkit-keyframes fadeInLeft {
      0% {
        opacity: 0;
        -webkit-transform: translate(-1000px, 0);
        transform: translate(-1000px, 0);
      }
      50% {
        opacity: 1;
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
      }

      55% {
        opacity: 1;
        -webkit-transform: translateY(-0); /* Safari */
        transform: translateY(-0); /* 标准语法 */
      }
      // 60% {
      //   opacity: 0.5;
      //   -webkit-transform: translateY(-10); /* Safari */
      //   transform: translateY(-10); /* 标准语法 */
      // }
      // 80% {
      //   opacity: 0;
      //   -webkit-transform: translateY(-100px); /* Safari */
      //   transform: translateY(-100px); /* 标准语法 */
      // }
      // 100% {
      //   opacity: 0;
      //   -webkit-transform: translateY(-100px); /* Safari */
      //   transform: translateY(-100px); /* 标准语法 */
      // }
    }

    #demoCanvas.active {
      position: absolute;
      width: 420px;
      // height: 80%;
      height: 76%;
      z-index: 99;
      top: 10%;
      bottom: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.3);
    }
    #demoCanvas canvas {
      background: none !important;
    }
    #demoCanvas.active canvas {
      height: auto;
    }
    /*跟投*/
    .new-follow {
      .type-period {
        width: 100%;
        line-height: 22px;
        font-size: 12px;
        color: #fff;
        background: linear-gradient(
          90deg,
          rgba(255, 49, 49, 1),
          rgba(255, 128, 103, 1)
        );
        padding: 0 4px;
        margin-top: 10px;
      }
      .table {
        width: 100%;
        padding-top: 10px;
        overflow: hidden;
        &.height {
          height: 55px;
        }
        li {
          font-size: 15px;
          color: #333;
          overflow: hidden;
          margin-bottom: 10px;
          &.title {
            font-size: 12px;
            color: #999;
          }
          span {
            width: 26%;
            text-align: center;
            float: left;
            &:first-of-type {
              padding-right: 10px;
            }
            &:last-of-type {
              width: 20%;
              text-align: right;
            }
          }
        }
      }
      .btn-group {
        text-align: center;
        margin-top: 10px;
        .open-up,
        .put-away {
          display: block;
          font-size: 12px;
          color: #999;
          cursor: pointer;
          .icon {
            width: 8px;
            height: 8px;
            vertical-align: initial;
          }
        }
        .follow-up {
          width: 83px;
          height: 26px;
          font-size: 13px;
          color: #fff;
          background: rgba(255, 81, 62, 1);
          -webkit-border-radius: 12px;
          -moz-border-radius: 12px;
          border-radius: 12px;
          margin-top: 8px;
        }
        .expire {
          background: #878e8d;
        }
      }
    }
  }
  .fr-container {
    overflow: hidden !important;
    width: 420px;
    .fr-tab-title {
      width: 100%;
      font-size: 16px;
      color: #333;
      background: #eaeaea;
      border-bottom: 1px solid #f4f5f8;
      overflow: hidden;
      > span {
        display: block;
        width: 50%;
        line-height: 42px;
        text-align: center;
        float: left;
        cursor: pointer;
        &.active {
          color: #eb3b3c;
          background: #fff;
        }
      }
    }
  }
  .openNum-container {
    min-width: 1200px;
    min-height: 500px;
    margin: 32px auto 107px;
    .table_1 {
      min-width: 1200px;
      /*width: 1680px;*/
      width: 100%;
      background-color: #fff;
      tr {
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #eeeeee;
      }
      th {
        width: 239px;
        font-size: 14px;
        color: #666;
        // height: 50px;
        // line-height: 50px;
        text-align: center;
        border-right: 1px solid #eeeeee;
        &:nth-child(3) {
          width: 719px;
          ul {
            width: 100%;
            li {
              // width: 33.33%;
              // padding: 0 60px;
              width: 33.33%;
              text-align: center;
            }
          }
        }
        &:nth-child(2) {
          width: 179px;
        }
        &:nth-child(4) {
          width: 179px;
        }
        &:nth-child(5) {
          width: 320px;
          border-right: none;
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
        // width: 719px;
        ul {
          // margin-left: 110px;
          text-align: center !important;
          width: 500px !important;
          margin: 0 auto;
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
            margin: 0 8px;
            // margin: 0 auto;
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
      min-width: 1200px;
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
          /*width: 158px;*/
          border-right: 1px solid #eeeeee;
          &:nth-child(2) {
            width: 106px;
          }
          &:nth-child(3) {
            // width: 475px;
            div {
              /*width: 375px;*/
              &:nth-last-child(1) {
                width: 100px;
                border-left: 1px solid #eee;
              }
            }
          }
          &:nth-child(4) {
            /*width: 203px;*/
            line-height: 25px;
            ul {
              width: 100%;
              li {
                width: 33.33%;
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
              height: 50px;
              li {
                // width: 14.28%;
                margin: 0 1%;
                display: inline-block;
                float: none;
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
                  width: 100px;
                  border-left: 1px solid #eee;
                  float: right;
                  margin: 0;
                  padding-left: 20px;
                }
              }
            }
          }
          &:nth-child(4) {
            ul {
              width: 100%;
              li {
                width: 33.33%;
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
    .onLi {
      color: #ff1c30;
      position: relative;
      cursor: pointer;
      &:before {
        content: "";
        position: absolute;
        // left: 114px;
        bottom: 8px;
        width: 20px;
        height: 2px;
        background-color: #ff1c30;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .onLi1 {
      cursor: pointer;
    }
    .top-title {
      margin-bottom: 20px;
      h3 {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        background: url("../../assets/imgaes/chat/chat_36.png") no-repeat;
        padding: 0 0 0 40px;
        line-height: 27px;
        em {
          font-weight: normal;
          font-size: 16px;
          color: #666;
        }
      }
      .select-time {
        font-size: 14px;
        color: #999;
        line-height: 40px;
        .time-title {
          padding-right: 10px;
        }
      }
      .select-btn {
        color: #fff;
        // height: 38px;
        // line-height: 38px;
        height: 30px;
        line-height: 30px;
        width: 50px;
        background: #ff1c30;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
        margin-top: 4px;
      }
    }
    .selectBox {
      margin-right: 10px;
      > span {
        font-size: 14px;
        line-height: 30px;
        height: 30px;
        margin-right: 10px;
        display: inline-block;
      }
    }
  }
  .his_zw {
    font-size: 14px;
    color: #ccc;
    // margin-top: 46px;
    text-align: center;
    padding-top: 100px;
  }
  .lading {
    line-height: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    font-size: 20px;
    transform: translateX(-50%);
  }
  .history_list {
    margin-top: 22px;
    // .onLi {
    //   color: #ff1c30;
    //   position: relative;
    //   cursor: pointer;
    //   &:before {
    //     content: "";
    //     position: absolute;
    //     // left: 114px;
    //     bottom: 8px;
    //     width: 20px;
    //     height: 2px;
    //     background-color: #ff1c30;
    //     left: 50%;
    //     transform: translateX(-50%);
    //   }
    // }
    // .onLi1 {
    //   cursor: pointer;
    // }

    li {
      float: left;
    }
  }
  /*.date_2 {*/
  /*position: relative;*/
  /*&:after {*/
  /*position: absolute;*/
  /*content: "";*/
  /*width: 10px;*/
  /*height: 5px;*/
  /*z-index: 1;*/
  /*background: url("../../assets/imgaes/main/date2.png") no-repeat;*/
  /*background-size: contain;*/
  /*right: 10px;*/
  /*top: 18px;*/
  /*}*/
  /*&:before {*/
  /*position: absolute;*/
  /*content: "";*/
  /*width: 18px;*/
  /*height: 19px;*/
  /*background: url("../../assets/imgaes/main/date.png") no-repeat;*/
  /*background-size: contain;*/
  /*left: 7px;*/
  /*top: 10px;*/
  /*z-index: 1;*/
  /*}*/
  /*}*/
  .jy {
    .fa-content {
      height: 265px !important;
      .selectTiime {
        width: 100%;
        padding-top: 40px;
        span {
          display: inline-block;
          width: 50%;
          text-align: center;
          font-size: 14px;

          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: solid 1px #b9b9b9;
            position: relative;
            top: 5px;
            cursor: pointer;
          }
          .active {
            background: url(../../assets/imgaes/chat/xz.png) no-repeat center;
            border: 0;
          }
        }
      }
    }
  }
  .fa-redpack {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 0;
    z-index: 1000;
    z-index: 1001;
    .fa-content {
      position: relative;
      margin: 250px auto 0;
      margin: 0 auto 0;
      top: 20%;
      .remove-icon {
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: -44px 0px;
        width: 16px;
        height: 16px;
        position: absolute;
        cursor: pointer;
        top: -30px;
        right: 0;
      }
      .title {
        background: url("../../assets/imgaes/chat/chat_icon.png") no-repeat;
        background-position: 0 -412px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        font-size: 20px;
      }
      background: #fff;
      width: 400px;
      height: 490px;
      border-radius: 10px;
      /*overflow: hidden;*/
      .send-btn {
        font-size: 16px;
        text-align: center;
        width: 300px;
        background: #ff1c30;
        border-radius: 30px;
        transform: translateX(50px);
        color: #fff;
        cursor: pointer;
        margin: 40px auto 0;
      }
      .input-box {
        color: #333;
        background: #f6f6f6;
        border-radius: 6px;
        line-height: 42px;
        padding: 0 10px;
        font-size: 14px;
        width: 300px;
        margin: 30px auto 0;
        text-align: right;
        .label {
          float: left;
        }
        .dw {
          padding-left: 10px;
        }
        input {
          background: none;
          font-size: 14px;
          text-align: right;
        }
      }
    }
    .fund-psd-check {
      position: absolute;
      font-size: 18px;
      color: #fff;
      text-align: center;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
}
@keyframes s_to_b {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
@-webkit-keyframes s_to_b {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

/*@media only screen and (max-width: 1400px) {*/
/*#chat {*/
/*padding: 20px 40px 0 40px;*/
/*}*/
/*}*/
/*@media only screen and (max-width: 1300px) {*/
/*#chat {*/
/*padding: 20px 20px 0 20px;*/
/*}*/
/*}*/
/*@media only screen and (max-width: 1240px) {*/
/*#chat {*/
/*padding: 20px 0 0 0;*/
/*}*/
/*}*/

@-webkit-keyframes shake {
  10% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  15% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  20% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  25% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  30% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  35% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  40% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  45% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  50%,
  100% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
}
@-ms-keyframes shake {
  10% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  15% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  20% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  25% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  30% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  35% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  40% {
    transform: rotate(10deg);
    -ms-transform: rotate(10deg);
  }
  45% {
    transform: rotate(-10deg);
    -ms-transform: rotate(-10deg);
  }
  50%,
  100% {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
}
.prevue-list {
  margin-top: 30px;
  margin-bottom: 30px;
  img {
    height: 100%;
    width: auto;
  }
  .biaoti {
    font-weight: bold;
    color: #333333;
    font-size: 18px;
    margin: 5px 0 22px 40px;
    position: relative;
    a {
      float: right;
      font-size: 14px;
      color: #ff1c30;
      font-weight: normal;
    }
  }
  .prevue-content {
    // width: 820px;
    background-color: #fff;
    border-radius: 5px;
    height: 360px;
    overflow: hidden;
    .prevue-tab {
      width: 100%;
      .prevue-no {
        height: 319px;
        color: #999;
        background: #fff;
        text-align: center;
        font-style: 20px;
        line-height: 319px;
      }
      .prevue-l {
        position: relative;
        .prevue-line {
          position: absolute;
          width: 1px;
          background-color: #eeeeee;
          height: 265px;
          left: 25%;
          transform: translateX(-50%);
          // bottom: 34px;
          top: 25px;
        }
        .p-line1 {
          left: 50%;
          transform: translateX(-50%);
        }
        .p-line2 {
          left: 75%;
          transform: translateX(-50%);
        }

        ul {
          li {
            width: 25%;
            float: left;
            padding: 0 20px;
            > div {
              border-bottom: 1px dashed #eeeeee;
              padding: 15px 0;
            }
            .anchor-avatar {
              width: 66px;
              height: 66px;
              // border-radius: 50%;
              // overflow: hidden;
              margin-right: 16px;
              position: relative;
              .an-avatar {
                display: block;
                border-radius: 50%;
                overflow: hidden;
                width: 66px;
                height: 66px;
              }
              .is-livestatus {
                display: block;
                position: absolute;
                right: 0;
                bottom: 0;
                width: 20px;
                height: 20px;
              }
            }
            .host-details {
              .anchor-name {
                margin-bottom: 9px;
                .anchor-name1 {
                  font-size: 14px;
                  color: #333;
                  margin-right: 10px;
                }
                span {
                  float: left;
                  display: block;
                }
                .anchor-icon {
                  width: 16px;
                  height: 18px;
                  margin-right: 4px;
                  overflow: hidden;
                }
                .anchor-title {
                  font-size: 12px;
                  color: #999;
                  margin-top: 2px;
                }
              }
              .anchor-game {
                margin-bottom: 10px;
                font-size: 12px;
                color: #999;
              }
              .anchor-time {
                color: #333;
                font-weight: bold;
                font-size: 16px;
              }
            }
            .anchor-follow {
              height: 28px;
              width: 60px;
              text-align: center;
              line-height: 28px;
              margin-top: 19px;
              border-radius: 20px;
              border: 1px solid #ff1c30;
              color: #ff1c30;
              cursor: pointer;
            }
            .anchor-follow-no {
              height: 28px;
              line-height: 28px;
              width: 60px;
              text-align: center;
              margin-top: 19px;
              border-radius: 20px;
              border: 1px solid #dddddd;
              color: #dddddd;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .prevue-content-no {
    font-size: 20px;
    text-align: center;
    line-height: 360px;
    color: #999;
    background: #fff;
    // width: 820px;
    height: 360px;
    border-radius: 4px;
  }

  .prevue-header {
    // width: 820px;
    span {
      display: block;
      // float: left;
      width: 60px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: #fff;
      color: #333;
      border-radius: 100px;
      overflow: hidden;
      margin-right: 20px;
      font-style: 14px;
      cursor: pointer;
      &.is-active {
        background-color: #ff1c30;
        color: #fff;
      }
    }
    .biaoti {
      margin: 5px 30px 22px 40px;
      &:before {
        content: "";
        position: absolute;
        width: 28px;
        height: 27px;
        // background: url("../../assets/imgaes/main/tagg.png") no-repeat center;
        // background-size: contain;
        background: url("../../assets/imgaes/allIcon.png") no-repeat;
        background-position: -41px -386px;
        background-size: 700px 700px;
        left: -40px;
        top: -5px;
      }
    }
  }
}
.btn-width {
  width: 80px !important;
}

.show-img-msg,
.show-img-msg3 {
  top: -125px !important;
}
.show-img-msg2 {
  padding: 20px 10px 10px 10px !important;
  .send-git-btn {
    padding: 0 !important;
  }
}
.show-img-msg1 {
  .send-git-btn {
    padding: 0 !important;
    font-size: 12px !important;
  }
}
.show-img-msg1,
.show-img-msg2,
.show-img-msg,
.show-img-msg3 {
  position: absolute;
  top: -276px;
  // width: 200px;
  // height: 108px;
  border-radius: 4px;
  z-index: 100;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px 10px 15px 15px;
  z-index: 10001;
  // right:0;
  user-select: none;
  > dl {
    margin-bottom: 10px;
  }
  &:before {
    position: absolute;
    content: "";
    // left: 50%;
    bottom: -19px;
    // transform: translateX(-50%);
    height: 9px;
    right: 35px;
    bottom: -9px;
    width: 20px;
    background: url("../../assets/imgaes/chat/jiantou-min.png") no-repeat;
    // float: left;
    // width: 0;
    // height: 0;
    // border-width: 10px;
    // border-style: solid;
    // border-color: #fff transparent transparent transparent;
  }
  .name {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 10px 20px;
  }
  .amount {
    font-size: 14px;
    color: #ff1c30;
    margin-left: 20px;
  }
  img {
    height: 68px;
    width: 68px !important;
  }
  .send-num {
    width: 62px !important;
    height: 30px !important;
    line-height: 30px !important;
    margin-top: 20px !important;
    margin-left: 25px !important;
    color: #fff !important;
    background-color: #ff1c30 !important;
    border: none !important;
  }
  .send-nun {
    display: inline-block;
    text-align: center;
    width: 44px;
    line-height: 20px;
    height: 20px;
    font-style: 12px;
    color: #333;
    background-color: #eee;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-right: 6px;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: #ff1c30;
      border: none;
    }
  }
}
.cl-box {
  position: absolute;
  right: 0;
  top: 178px;
  overflow: hidden;
  .cl-item {
    display: flex;
    font-size: 14px;
    align-items: center;
    padding: 8px 4px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 4px #e4dede;
    animation: RToL 1s;
    animation-fill-mode: forwards;
    -webkit-animation: RToL 1s;
    -webkit-animation-fill-mode: forwards;
    .icon {
      width: 18px;
      height: 18px;
      background: url("../../assets/imgaes/chat/open_remind.png") no-repeat;
      background-size: 100% 100%;
      margin-right: 6px;
    }
    .font-red {
      color: #ff1c30;
    }
    span {
      margin-right: 4px;
    }
  }
}
@keyframes RToL {
  from {
    margin-right: -170px;
  }
  to {
    right: 0;
  }
}
.show-img-msg,
.show-img-msg3 {
  top: -146px !important;
}
.show-img-msg2 {
  padding: 20px 10px 10px 10px !important;
  top: -56px !important;
  width: 290px;
  // max-width: 300px;
  i {
    width: 100%;
    height: 15px;
    // background: pink;
    display: block;
    position: absolute;
    bottom: -15px;
    left: 0px;
  }
  .send-git-btn {
    padding: 0 !important;
  }
}
.show-img-msg1 {
  top: -71px !important;
  width: 382px;
  // height: 135px;
  i {
    width: 100%;
    height: 15px;
    // background: pink;
    display: block;
    position: absolute;
    bottom: -15px;
    left: 0px;
  }
  .send-git-btn {
    padding: 0 !important;
    font-size: 12px !important;
  }
}
.show-img-msg5 {
  right: 0;
  display: none;
}
.show-img-msg1,
.show-img-msg2,
.show-img-msg,
.show-img-msg3 {
  position: absolute;
  top: -276px;
  border-radius: 4px;

  // z-index: 100;
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px 10px 15px 15px;
  z-index: 10;
  > dl {
    margin-bottom: 10px;
  }
  &:before {
    position: absolute;
    content: "";
    left: 50%;
    bottom: -19px;
    height: 9px;
    bottom: -9px;
    width: 20px;
    background: url("../../assets/imgaes/chat/jiantou-min.png") no-repeat;
  }
  .name {
    font-size: 14px;
    font-weight: bold;
    margin: 10px 0 10px 20px;
  }
  .amount {
    font-size: 14px;
    color: #ff1c30;
    margin-left: 20px;
  }
  img {
    height: 68px;
    width: 68px !important;
  }
  .send-num {
    width: 62px !important;
    height: 30px !important;
    line-height: 30px !important;
    margin-top: 20px !important;
    margin-left: 25px !important;
    color: #fff !important;
    background-color: #ff1c30 !important;
    border: none !important;
  }
  .send-nun {
    display: inline-block;
    text-align: center;
    width: 44px;
    line-height: 20px;
    height: 20px;
    font-style: 12px;
    color: #333;
    background-color: #eee;
    border: 1px solid #dddddd;
    border-radius: 4px;
    margin-right: 6px;
    cursor: pointer;
    &.active {
      color: #fff;
      background-color: #ff1c30;
      border: none;
    }
  }
}
#footer {
  min-width: 1400px !important;
}
// #header .main{
//   min-width: 1400px!important;
// }

.el-icon-refresh {
  position: relative;
  top: 3px;
  margin-right: 10px;
}
.el-icon-refresh:before {
  font-size: 22px;
}
.showuser-In {
  text-align: center;
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 130px;
  z-index: 2;
  /*height: 20px;*/
  > span {
    color: #999;
  }
}
// 大转盘
// .big-box{
//   width: 100%;
//   height: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: rgba(0,0,0,0.5);
//   z-index: 100000;
//   .big-table{
//     position: relative;
//     // width: 1059px;
//     height: 817px;
//     width: 71%;
//     min-width: 900px;
//     // height: 77.66%;
//     background: url('../../assets/imgaes/BigTurntable/big-bg.png')no-repeat;
//     background-size: contain;
//     // background-size: cover;
//     left: 50%;
//     transform: translateX(-50%);
//     margin-top: 2%;
//     .big-close{
//       display: block;
//       cursor: pointer;
//       position: absolute;
//       right: 0;
//       top: 0;
//       width: 64px;
//       height: 64px;
//       img{
//         width: 100%;
//       }
//     }
//   }
// }
</style>
