<template>
    <div class="chat-container">
        <div class="chat-title">
            phòng chat
            <img class="close fr" @click="chatIsShow = false" src="../../assets/imgaes/game/icon-close.png" alt="">
        </div>
        <el-scrollbar
            style="
              height: 745px;
              padding-top: 5px;
              width: 380px;
              background: #f6f6f6;
              border-radius: 4px;
            "
            ref="myScrollbar"
          >
            <ul class="chat-content">
               
                 <li  v-for="(v,index) in chatData" :key="index">
                    <section v-if="v.type == 'chat'" >
                        <div
                            class="chat-photo fl"
                            @click="toUser(v)"
                            @dblclick="finedTpUser(v.user_type,v.user_id)" >
                            <img v-lazy="v.avatar" alt />
                        </div>
                        <div class="name-level clearfix">
                            <span class="nick-name ">{{ v.nickname }}</span>
                            <span class="level">VIP{{v.vip}}</span>
                            <span class="win-rate">Tỷ lệ thắng{{v.win_rate}}%</span>
                        </div>
                        <div class="chat-box clearfix">
                            <span class="chat-say white fl">{{v.content}}</span>
                            <span class="time fl">{{v.send_time_txt}}</span>
                        </div>
                    </section>
                   
                </li>
            </ul>
        </el-scrollbar>
        <div class="chat-foot">
            <div class="mute fl" :class="isMute ? 'active' : 'mute1'"  @click="isJy = true"></div>
            <!-- v-if="$store.state.userinfo.vip>0||!$store.state.codeToken" -->
            <input class="txt"  @click="isLogin" @keyup.enter="sendMessage" id="textInput"  ref="focusTextarea"     v-model="comment_text" type="text" placeholder="Vui lòng nhập nội dung trò chuyện">
            <img class="emj"  @click="showEmj = !showEmj" src="../../assets/imgaes/game/icon-smiley.png" alt="">
            <img class="send" @click="sendChatMsg" src="../../assets/imgaes/game/icon-send.png" alt="">
            <div class="beyond-txt" v-if="isLenght && !this.$store.state.userinfo.user_id<0">{{ chatErr }}</div>
        </div>
        <!-- 投注清单弹窗 -->
        <div class="tc-bg" v-if="bettingList">
            <div class="betting-list">
                <div class="tc-title">Danh sách cá cược<span>12/12/2021-0211</span></div>
                <div class="betting-box">
                    <p>trò chơi：Xổ số miền bắc</p>
                    <p>Tiền bạc：<strong style="color:#287BE1">1234567890</strong> vnd</p>
                    <table>
                        <tr class="title">
                            <td>Cách chơi</td>
                            <td >tiền bạc</td>
                            <td>số nhân</td>
                        </tr>
                         <tr>
                            <td>Đuôi<strong style="color:#445779">-0 1 2 3 4 8 9</strong></td>
                            <td><strong style="color:#445779">1234567890000</strong>Vnd</td>
                            <td>
                                <div class="multiplier">   
                                    <input type="text" disabled value="100">
                                    <img src="../../assets/imgaes/game/icon-edit.png" alt="">
                                </div>
                            </td>
                        </tr>
                    </table>
                    <p>Tổng tiền cược：<strong style="color:#287BE1">7</strong></p>
                    <p>gộp chung lại：<strong style="color:#287BE1">71234567890 </strong>vnd</p>
                </div>
                <div class="share"> 
                    <span @click="shareSelect" class="select" :class="selectVal ? 'select-active' : 'select-default'"></span>
                    分享此投注清单 <img @click="shareTC=true" src="../../assets/imgaes/game/icon-help.png" alt="">
                </div>
                <div class="btn-group">
                    <button class="cancel" @click="bettingList=false">Hủy bỏ</button>
                    <button class="bet blue" style="margin-left:35px;" @click="betList">Đặt cược</button>
                </div>
            </div>
        </div>
        <!-- 分享提示 -->
        <div class="tc-bg" v-if="shareTC">
            <div class="popTC">
                <p>Người dùng từ VIP1 trở lên có thể chia sẻ. Sau khi những người dùng khác theo dõi danh sách cá cược này và giành được giải thưởng, bạn sẽ kiếm được 1% hoa hồng (hoa hồng này sẽ được khấu trừ từ số tiền thắng cuộc của người theo dõi)</p>
                <div class="btn-group">
                    <button class="blue" @click="shareTC=false">Đảm bảo</button>
                </div>
            </div>
        </div>
        <!-- 提醒  -->
        <div class="tc-bg" v-if="popTC">
            <div class="popTC">
                <!-- 当前期间被锁定 -->
                <div  v-if="remindTC">
                    <div class="tc-title">nhắc lại</div>
                    <p class="h80">Đã khóa trong khoảng thời gian hiện tại</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false,remindTC=false">Đảm bảo</button>
                    </div>
                </div>
                <!-- 下注成功 -->
                <div v-if="betSuccessful">
                    <p class="h120">Đặt cược thành công</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false,betSuccessful=false">Đảm bảo</button>
                    </div>
                </div>
                <!-- 余额不足 -->
                <div v-if="balance">
                    <p class="h120">Thiếu cân bằng</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false,balance=false">Đảm bảo</button>
                    </div>
                </div>
                <!-- 您被禁言360s ，请稍后再试！ -->
                <div v-if="muteTime">
                    <p class="h120" style="text-align: left;">Bạn bị cấm trong<font style="color:#FF4646"> 360s</font>, vui lòng thử lại sau!</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false,muteTime=false">Đảm bảo</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 禁言 -->
        <div class="tc-bg" v-if="isJy">
            <div class="jyTC">
                <div class="remove-icon fr" @click="isJy = false"></div>
                <div class="avatar">
                    <img src="../../assets/imgaes/game/pic-1.png" alt="">
                    <div class="level"></div>
                </div>
                <p class="username">Tên người dùng 1</p>
                <div class="selectTime">
                    <div class="input" @click="openValue">
                        <input v-model="value" type="text" placeholder="10 phút im lặng">
                        <img class="arrow" src="../../assets/imgaes/game/arrow.png" alt="">
                    </div>
                    <ul class="list" v-show="TimeList">
                        <li @click="getvalue(index,item)" v-for="(item,index) in TimeData" :key="item.index">
                            <img class="fl" v-if="TimeListIndex ==index" src="../../assets/imgaes/game/time-select.png" alt="">
                            <span class="fl">{{ item }}</span>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="blue" @click="muteConfirm">Đảm bảo</button>
                </div>
            </div>
        </div>
        <keep-alive>
            <vme v-show="showEmj" ref="vmeChild"></vme>
        </keep-alive>
    </div>
</template>
<script>

import { mapState, mapMutations } from "vuex";
import vme from "../../components/vue-mobile-emoji/vme.vue";
export default {
    data(){
        return{
            bettingList:false, //投注清单弹窗
            selectVal:false,
            shareTC:false, //投注分享弹窗
            popTC:false,//提醒弹窗背景
            remindTC:false, //提醒弹窗
            betSuccessful:false, // 下注成功
            balance:false, //余额不足
            TimeData:['10 phút im lặng','20 phút im lặng','30 phút im lặng','40 phút im lặng'],
            TimeList:false,
            value:'',
            isJy:false, // 禁言弹窗
            muteTime:false, //禁言时长提示
            isMute:false, //是否禁言
            TimeListIndex:1,
            showEmj:false,
            chatData: null,
            socket: "",
            dbData:null,
            comment_text:'',//
            isLenght: false,
            chatErr: "",
            inData:[],//普通用户 游客
        }
    },
    components: {
        vme,
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
            "userInfo"
        ])
    },
    created() {
        this.initSocket();
        this.timers();
         this.getInitChat();
    },
    methods:{
         initSocket(data) {
            console.log(data)
            if (data) this.dbData = data;
            // 实例化socket
            if (!this.socket || data) {
                // let wsServer = `${location.protocol == 'https:' ? 'wss' : 'ws'}://${location.host}/wss`;
                let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
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
            this.$http.get("/api2/index/balance").then(res => {
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
                    userName: this.$store.state.username
                };
                this.send(JSON.stringify(text_obj2), true);
            }, 50000);
        },
        open: function() {
            console.log("socket连接成功");
            console.log(this.dbData);
            if (this.dbData) {
                 console.log(this.dbData);
                if (JSON.parse(this.dbData).type == "chat") {
                    setTimeout(() => {
                        this.isLenght = true;
                        this.chatErr = "聊天室连接成功~";
                    }, 1000);
                }
            }
            let type = "subscribe";
            let type2 = "ping";
            let text_obj = {
                type: type,
                room_id: this.$route.params.id,
                userName: this.$store.state.userinfo.nickname,
                user_id: this.$store.state.userinfo.user_id || 0,
                vip: this.$store.state.userinfo.vip,
                userType: this.$store.state.userType
            };
            let text_obj2 = {
                type: type2,
                room_id: this.$route.params.id,
                user_id: this.$store.state.userinfo.user_id || 0,
                userName: this.$store.state.userinfo.nickname,
                vip: this.$store.state.userinfo.vip,
                userType: this.$store.state.userType
            };
            console.log(text_obj)
            console.log(text_obj2)

            this.send(JSON.stringify(text_obj));
            this.send(JSON.stringify(text_obj2), true);

            this.timers();
        },
        error: function() {
            console.log("连接错误");
        },
        getMessage: function(msg) {
            console.log("监听socket消息");
            console.log(msg)
            let data = JSON.parse(msg.data);
            console.log(data)
            let $this = this;
            if (data.type == "chat") {
                if(data.event=='pushPlan'){
                    data.isExpire=true
                }
                if (data.isMe) {
                    this.comment_text = "";
                }
                $this.inData.push(data);
                $this.chatData.push(data);
                console.log( $this.chatData);
                $this.pushDanmu = data;
                if (data.isMe) {
                     $this.showEmj = false;
                }
            }else if (data.type == "subscribe" && !data.isMe) {
              
                $this.chatData.push(data);
                $this.inData.push(data);

                if(this.chatData[this.chatData.length-1].vip>0){
                
                this.hyvip=this.chatData[this.chatData.length-1].vip
                this.vipAvatar=this.chatData[this.chatData.length-1].avatar
                this.vipInit(this.hyvip)
                if(this.chatData[this.chatData.length-1].user_id == 0) {
                    this.hyvip = ""  ||  0 ;
                }
                this.hyvipName = this.chatData[this.chatData.length-1].userName ;
                this.vipShow = true ;
                setTimeout(() => {
                    this.vipShow = false ;
                }, 3000);
                }



            } else if (data.type == "error") {
                this.isLenght = true;
                $this.chatErr = data.msg;
            } else if(data.type == 'operation'){
                this.clearChatContent();
            }else if(data.type == 'ServerPush'){
                if(data.dataType=="long_dragon"){
                    $this.clList=[]
                    data.data.forEach((i,d)=>{
                        if($this.hostMsg.lottery_id==i.lottery_id){
                            $this.clList.push(i);
                        }
                    })
                    if($this.clList.length){
                        this.clshow=true;
                    }
                    // //console.log( $this.clList)
                }else if(data.dataType=='update_online'){
                     if( document.querySelector('.onlineNum')){
                        document.querySelector('.onlineNum').innerHTML='在线人数     '+(this.liveData.base_online+data.data.online)
                    }
                }else if(data.dataType=='push_open_issue'){
                    // console.log(this.chatData);
                    this.chatData.forEach((t,i)=>{
                        if(t.event=='pushPlan'){
                            data.data.forEach((t2,i2)=>{
                                if(t.orders.play_bet_lottery_id==t2.lotteryId){
                                    if(t.orders.play_bet_issue==t2.issue){
                                        t.isExpire=true
                                    }else{
                                        t.isExpire=false
                                    }
                                }
                            })
                        }
                    })
                    this.$forceUpdate();
                }
            }
        },
        //发送消息
        sendMessage(e) {
            if (!this.$store.state.codeToken) {
                this.isLenght = true;
                this.chatErr = "您还未登录或登录过期!";
                this.$refs.focusTextarea.blur();
            } else {
                e.preventDefault();
                this.sendChatMsg();
            }
        },
        //发送消息
        async sendChatMsg() {
            debugger 
            if(!this.$store.state.codeToken){
                this.$vux.confirm.show({
                    title:'',
                    content:'您还未登录或登录过期!',
                    onCancel : () => {
                        //console.log(this) //当前 vm
                    },
                    onConfirm : () => {
                        this.$router.push({name:'login'});
                    }
                });
                return;
            }
            if(this.$store.state.userinfo.user_id<0){

                return  this.$confirm('当前系统仅开放彩票游戏试玩，如有其他需要请登录正式账户','提示', {
                    confirmButtonText: '注册',
                    cancelButtonText: '登录',
                    confirmButtonClass:'rechargeButton',
                    cancelButtonClass:'backButton',
                    roundButton:true,
                    customClass:'swBox',
                    center: true,
                    showCancelButton:true,
                    dangerouslyUseHTMLString:true,
                    distinguishCancelAndClose:true,
                }).then(() => {
                    // this.SETUSERTOKEN('');
                    this.goRegister();
                }).catch(action => {
                    if(action === 'cancel'){
                    // this.SETUSERTOKEN('');
                    this.$store.commit('SETLOGIN',true);;
                    }

                });
            }


            if (!this.comment_text) {
                this.isLenght = true;
                this.chatErr = "您还没有输入内容哦~";
                return;
            }
             console.log(this.$store.state  )
             console.log(this.$store.state.username)
            let text_obj = {
                type: "chat",
                room_id: this.$route.params.id,
                user_id: this.$store.state.userinfo.user_id,
                userType: this.userType + "",
                userName: this.$store.state.username,
                text: this.comment_text.replace(/\s+/g, " "),
                vip: this.$store.state.userinfo.vip
            };
            console.log(text_obj)
            this.send(JSON.stringify(text_obj));
        }, 
        send(data, flag) {
            console.log(data)
            console.log(this.socket)
            if (this.socket.readyState == 1) {
                this.socket.send(data);
                this.dbData = null;
                console.log( this.socket())
                console.log( data)
            } else if (this.socket.readyState == 3) {
                if (flag === true) return;
                this.isLenght = true;
                this.chatErr = "聊天室重连中，请稍等~";
                this.initSocket(data);
            } else if (this.socket.readyState == 0) {
                if (JSON.parse(this.dbData).type == "chat") {
                    this.isLenght = true;
                    this.chatErr = "聊天室重连中，请稍等~";
                }
            }
          
        },
        close: function(e) {
        // //console.log(
        //   "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
        // );
        // //console.log("socket已经关闭");
        },  
        //判断是否登录
        isLogin() {
            if(localStorage.getItem('codeToken')=='' || this.$store.state.userinfo.user_id!=JSON.parse(localStorage.getItem('userinfo')).user_id ||  this.$store.state.userinfo.user_id <= 0){
                this.isLenght = true;
                this.chatErr = "您还未登录或登录过期!";
                this.$refs.focusTextarea.blur();
            }
        },
        // 获取聊天室最新的20条聊天记录
        getInitChat() {
            this.$http.get('api/chatroom/config').then(res => {
               if(res.data.code==1){
                    this.chatData=res.data.chat_log
                    this.chatSettings=res.data.settings
                    this.msgList.forEach((c,i)=>{
                        if(c.type=="share_plan"){
                            c.content=JSON.parse(c.content)
                        }else{
                            c.content=this.HTMLDecode(c.content)
                        }
                        
                    })
                    this.goDown()
                }
                this.flitImg(this.chatData);
                this.initSocket();
            })
            .catch(function(err) {});
        },         
        shareSelect(){ //是否分享
            if(this.selectVal){
                this.selectVal=false
            }else{
                this.selectVal=true
            }
        },
        openValue(){
            this.TimeList=!this.TimeList;
        },
        getvalue(index,item){
            this.value=item;
            this.TimeList=false;
            this.TimeListIndex = index
        },
        betList(){ //弹窗下注按钮
            this.bettingList = false;
            this.popTC =true;
            this.betSuccessful = true;
        },
        muteConfirm(){ //禁言确定按钮
            this.isJy = false;
            this.popTC =true;
            this.muteTime = true;
            this.isMute = true;
        }
    }
}
</script>
<style lang="less" scoped>
.chat-container{
    width: 380px;
    height: 900px;
    background: #f6f6f6;
    box-shadow: 0px 7px 14px 1px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    margin-left: 70%;
    position: absolute;
    top:225px;
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
    .chat-content{
        padding: 9px 13px;
        section{
            margin-bottom: 29px;
            overflow: hidden;
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
            overflow: hidden;
            .nick-name{
                color: #1B74C8;
                margin-bottom: 5px;
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
                word-break: break-all;
                &.blue{
                    background: #1B74C8;
                    color: #fff;
                }
            }
            .time{
                line-height: 34px;
                font-size: 10px; 
                color: #B2B2B2
            }
            .betting-wrap{
                &.grey{
                    background: #EEEEEE;
                    .list-btn{
                         background: #C4C4C4;
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
        .txt{
            width: 235px;
            height: 35px;
            font-size: 14px;
            color: #555;
            background: #F0F0F0;
            border: 0.5px solid #CACACA;
            box-sizing: border-box;
            border-radius: 8px;
            padding: 2px 8px;
        }
        .emj,.send{
            width: 30px;
            margin-left: 10px;
            cursor: pointer;
        }
        .beyond-txt {
            position: absolute;
            top: 1px;
            left: 16px;
            color: red;
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
            top: 270px;
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
                    background: url('../../assets/imgaes/game/icon-level.png') no-repeat;
                    background-size: 100% 100%;
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