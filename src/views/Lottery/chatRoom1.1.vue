<template>
    <div>
         <div class="chat-container"  >
        <div class="chat-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">
            phòng chat
            <img class="close fr" @click="setChat2" src="../../assets/imgaes/game/icon-close.png" alt="">
        </div>
        <div class="chat-notice" v-if="chatSettings">
            <marquee scrollamount="3" scrolldelay="50" direction="left" class="fl">
              <strong>Thông báo：</strong><span >{{chatSettings.notice}}</span>
            </marquee>
        </div>
         <div class="delete-msg" :style="{top:deleteY+'px',left:deleteX+'px'}" v-if="deleteShow" @click="submitDelete">
                删除消息
            </div>
        <el-scrollbar
            style="
              height: 475px;
              padding-top: 5px;
              width: 380px;
              background: #f6f6f6;
              border-radius: 4px;
            "
            ref="myScrollbar"
          >
          
            <ul class="chat-content">
                <li>
                    <section v-for="(item,index) in  msgList" :key="index" :class="{selfMsg:item.user_id==$store.state.userinfo.user_id}">
                       <div v-if="item.msg_type=='share_plan'||item.type=='share_plan'">
                         <!-- @click="manage(item)" -->
                            <div class="chat-photo fl"   @mousedown="gomousedown(item)" @mousemove="gomousemove" @mouseup="gomouseup(item)"    style="position: relative;z-index: 99;">
                            <img  :src="item.avatar" alt />
                        </div>
                        <div class="name-level clearfix">
                            <span class="nick-name ">{{item.nickname}}</span>
                            <img v-if="item.vip"  class="level" :src="vipIcons[item.vip-1]" alt />
                            <span class="win-rate" v-if="item.win_rate!=0">Tỷ lệ thắng {{item.win_rate}}</span>
                        </div>
                        <div class="chat-box clearfix">
                          <!--  -->
                          <!-- djstime1=='Đã đóng'||item.content.issue!=history[0].next_issue|| -->
                            <div class="betting-wrap  fl" :class="{grey:$store.state.userinfo.user_id==item.user_id}">
                                <p>{{item.content.lottery_id|ynGameName(allLottery)}}</p>
                                <p>{{item.content.issue}}</p>
                                <!--  -->
                                <div v-for="(it1,idx1) in item.content.items" v-if="idx1<item.maxHeight"  :key="idx1+'c'">
                                  <p >Cách chơi:{{it1.play_name}}</p>
                                  <p style="word-wrap: break-word;">Nội dung cược:{{it1.item_name}}</p>
                                  <p>Tổng tiền cược:{{it1.multiple}}</p>
                                </div>
                                <div v-if="item.content.items.length>4" @click="item.maxHeight==4?item.maxHeight=item.content.items.length:item.maxHeight=4"  style="width: 26px;text-align: center;margin: 0 auto;padding-top: 10px;cursor: pointer;">
                                   <img  src="../../assets/imgaes/game/x@2x.png" alt="" :style="{width:'100%',transform:item.maxHeight==4?'rotate(0deg)':'rotate(180deg)'}">
                                </div>
                                <p>Thành tiền: {{item.content.items|orderAll}}VNDK </p>
                                <button class="list-btn" @click="shareItem=JSON.parse(JSON.stringify(item.content));showChatOrder=true;shareOrderNum=item.content.order_no">Danh sách cá cược</button>
                            </div>
                            <span class="time fr">{{item.send_time_txt}}</span>
                        </div>
                       </div>
                       <div v-if="item.type=='chat'">
                          <div class="chat-photo fl" @mousedown="gomousedown(item)" @mousemove="gomousemove" @mouseup="gomouseup(item)" style="position: relative;z-index: 99;">
                            <img  :src="item.avatar"   alt />
                        </div>
                        <div class="name-level clearfix">
                            <span class="nick-name ">{{item.nickname}}</span>
                            <img v-if="item.vip"  class="level" :src="vipIcons[item.vip-1]" alt />
                            <span class="win-rate" v-if="item.win_rate!=0">Tỷ lệ thắng {{item.win_rate}}</span>
                        </div>
                        <div class="chat-box clearfix">
                            <span class="chat-say white fl" :style="{cursor:$store.state.userinfo.user_type==1?'pointer':'','pointer-events':$store.state.userinfo.user_type==1?'':'none'}" v-html="item.content" @contextmenu.prevent="deleteMsg(item.chat_id,$event)"></span>
                            <span class="time fl">{{item.send_time_txt}}</span>
                           
                        </div>
                       </div>
                    </section>
                     <!-- <section >
                       <div>
                          <div class="chat-photo fl" style="position: relative;z-index: 99;">
                            <img src="../../assets/imgaes/chat/red_head.png"   alt />
                        </div>
                        <div class="name-level clearfix">
                            <span class="nick-name ">Hệ thống phong bì đỏ</span>
                        </div>
                        <div class="chat-box clearfix">
                           <img @click="showHb" src="../../assets/imgaes/chat/hb_bg.png" alt="" srcset="" style="cursor: pointer;">
                        </div>
                       </div>
                    </section> -->
                   
                </li>
            </ul>
        </el-scrollbar>
        <div class="chat-foot">
            <div v-if="$store.state.userinfo.user_type==1" class="mute fl" :class="isMute ? 'active' : 'mute1'"  @click="allMute"></div>
            <div  class="emojiText needsclick"
                  contenteditable="true"
                  ref="edit"
                  @focus="emojiShow=false"
                  placeholder="请输入内容">

            </div>
            <!-- <input class="txt" type="text" placeholder="Vui lòng nhập nội dung trò chuyện"> -->
            <img class="emj"  @click="emojiShow = !emojiShow" src="../../assets/imgaes/game/icon-smiley.png" alt="">
            <img class="send" @click="sendMsg" src="../../assets/imgaes/game/icon-send.png" alt="">
        </div>
        <div class="emoji-box" v-show="emojiShow">
           <ul>
             <li v-for="(item,index) in emojiData" :key="index" @click="getEmojis(item)">
               <img :src="item.path"  alt="" srcset="">
             </li>
           </ul>
         </div>
        <!-- 投注清单弹窗 -->
        <div class="tc-bg" v-if="showChatOrder">
            <div class="betting-list">
                <div class="tc-title">Danh sách cá cược<span>{{shareItem.issue}}</span></div>
                <div class="betting-box">
                    <p>trò chơi：{{shareItem.lottery_id|ynGameName(allLottery)}}</p>
                    <p>Tiền bạc：<strong style="color:#287BE1">{{shareItem.items|orderAll}}</strong> VNDK</p>
                    <table width="100%">
                        <tr class="title">
                            <td style="width: 51.8%;">Cách chơi</td>
                            <td style="width: 26%;">tiền bạc</td>
                            <td>số nhân</td>
                        </tr>
                    </table>
                   <el-scrollbar style="height:160px">
                     <table width="100%">
                         <tr v-for="(it,idx) in shareItem.items" :key="idx+'b'" >
                            <td><span style="overflow-wrap: break-word;width: 156px;display: block;">{{it.play_name}} <strong style="color:#445779">{{it.item_name}}</strong></span></td>
                            <td><strong style="color:#445779">{{it.oneAmount*it.multiple*it.nums}}</strong>VNDK</td>
                            <td>
                                <div class="multiplier">   
                                    <input type="text" v-model="it.multiple" @keyup="it.multiple=$event.target.value.replace(/\D/g, '')" >
                                    <img src="../../assets/imgaes/game/icon-edit.png" alt="">
                                </div>
                            </td>
                        </tr>
                    </table>
                   </el-scrollbar>
                    <p>Tổng tiền cược：<strong style="color:#287BE1">{{shareItem.items.length}}</strong></p>
                    <p>gộp chung lại：<strong style="color:#287BE1">{{shareItem.items|orderAll}} </strong>VNDK</p>
                </div>
                <div class="share" v-if="sharePurview==''||$store.state.userinfo.vip>=sharePurview"> 
                    <span @click="shareSelect" class="select" :class="isShare ? 'select-active' : 'select-default'"></span>
                    Chia sẻ danh sách cá cược này <img @click="shareTC=true" src="../../assets/imgaes/game/icon-help.png" alt="">
                </div>
                <div class="btn-group">
                    <button class="cancel" @click="showChatOrder=false">Hủy bỏ</button>
                    <button class="bet blue" style="margin-left:35px;" @click="sharePlay">Đặt cược</button>
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
                <!-- <div  v-if="remindTC">
                    <div class="tc-title">nhắc lại</div>
                    <p class="h80">Đã khóa trong khoảng thời gian hiện tại</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false,remindTC=false">Đảm bảo</button>
                    </div>
                </div> -->
                <!-- 下注成功 -->
                <div >
                    <p class="h120">{{chatMsg}}</p>
                    <div class="btn-group">
                        <button class="blue" @click="popTC=false">Đảm bảo</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="tc-bg" v-if="hbShow">
            <div class="hb-bg2" v-if="!fruitShow">
                <img src="../../assets/imgaes/chat/hb_bg2.png" @click="openHb" alt="" srcset="">
            </div>
            <div class="hb-bg1" v-else>
              <img src="../../assets/imgaes/chat/hb_bg1.png" alt="" srcset="">
              <div class="hb-fruit">
                <!-- <p>Bạn đến chậm, 
                  phong bao đỏ đã 
                  được nhận!
                  </p> -->
                  <div>
                  <p>
                    Xin chúc mừng
                  </p>
                  <h2>999VNDK</h2>
                  </div>
              </div>
            </div>
            <div class="close-btn" @click="hbShow=false;fruitShow=false">
              <img src="../../assets/imgaes/X.png" alt="" srcset="">
            </div>
        </div>
        <!-- 禁言 -->
        <div class="tc-bg" v-if="manageShow">
            <div class="jyTC">
                <div class="remove-icon fr" @click="manageShow = false;manageItem={}"></div>
                <div class="avatar" v-if="manageItem.nickname">
                    <img :src="manageItem.avatar"  alt="">
                    <div class="level" v-if="manageItem.vip">
                      <img :src="vipIcons[manageItem.vip-1]" alt="" srcset="" style="width:100%;border-radius: inherit;">
                    </div>
                </div>
                <p class="username"  v-if="manageItem.nickname">{{manageItem.nickname}}</p>
                <p v-else class="username" style="font-size: 18px;font-weight: bold;margin-bottom: 20px">全员禁言</p>
                <div class="selectTime">
                    <div class="input" @click="manageListShow=!manageListShow">
                        <span style="line-height: 36px;display: inline-block;width: 200px;padding-left: 20px;">{{manageTime}}phút im lặng</span>
                        <img class="arrow" src="../../assets/imgaes/game/arrow.png" alt="">
                    </div>
                    <ul class="list" v-show="manageListShow">
                        <li @click="manageTime=item;manageListShow=false" v-for="(item,index) in manageTimeArr" :key="index">
                            <img class="fl" v-if="manageTime==item" src="../../assets/imgaes/game/time-select.png" alt="">
                            <span class="fl">{{item}}phút im lặng</span>
                        </li>
                    </ul>
                </div>
                <div class="btn-group">
                    <button class="blue" @click="jinyan">Đảm bảo</button>
                </div>
            </div>
        </div>
        <!-- 表情 -->
    </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
let emojiArr=[]
let vipIcons=[]
for (let index = 1; index < 20; index++) {
 emojiArr.push({name:'emoji'+index,path:require("../../assets/imgaes/fhemoji/m"+index+".png")})
  if(index<9){
     vipIcons.push(require("../../assets/imgaes/fhemoji/VIP"+index+".png"))
  }
}
    export default {
        name:'chatRoom',
        data(){
            return{
      fruitShow:false,
      hbShow:false,
      chatSettings:{},
      allLottery:[],
      chatIsShow:false, //聊天室
      showChatOrder:false, //投注清单弹窗
      isShare:false,
      shareTC:false, //投注分享弹窗
      popTC:false,//提醒弹窗背景
      remindTC:false, //提醒弹窗
      betSuccessful:false, // 下注成功
      balance:false, //余额不足
     manageTimeArr:[10,30,60,120],
      value:'',
      manageShow:false, // 禁言弹窗
      muteTime:false, //禁言时长提示
      isMute:false, //是否禁言
      TimeListIndex:1,
      emojiShow:false,
      msgList:[],
      settings:{},
      emojiData:emojiArr,//表情数据
      vipIcons:vipIcons,
      chatSocket:'ws://54.255.11.229:18305/wss',
      websock:null,
      pingInterval:null,
      shareItem:{},
      shareOrderNum:'',
      chatMsg:'',
      manageItem:{},
      manageTime:10,
      manageListShow:false,
      sharePurview:'',
      voicePpurview:'',
      timeOutEvent:0,
      isClick:true,
      showItemNum:4,
      activeNum:2,
      isdg0h3dg7:false,
      ish3bd:false,
      deleteShow:false,
      deleteX:0,
      deleteY:0,
      deleteId:0
            }
        },
     filters:{
          orderAll(c){
      let a=0
      c.forEach((i,d)=>{
        a+=i.oneAmount*i.nums*i.multiple
      })
      return a
    },
    ynGameName(c,allLottery){
      let a=''
      allLottery.forEach((i,d)=>{
        if(c==i.lottery_id){
          a=i.vname
        }
      })
     
      return a
    }
        },
     watch:{
          msgList:function(i){
			  i.forEach((v,c)=>{
				if(!v.maxHeight){
				  v.maxHeight=4
				}
			  })
			},
    chatIsShow:function(i){
      if(i){
        this.goDown()
        
      }
    },
     deleteShow:function(value){
       if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }

        },
    created(){
    this.getChat()
    this.initWebSocket()
    this.getGame()
    },
    beforeDestroy(){
        clearInterval(this.pingInterval)
         if(this.websock){
            this.websock.close()
         }
        },
    computed: {
    ...mapState(["skin"]),
    },
    methods:{
    ...mapMutations(["SETCHAT"]),
    openHb(){
      this.fruitShow=true
    },
    showHb(){
      this.hbShow=true
    },
     setChat2(){
          this.SETCHAT(false)
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
      window.open('/gameRule/'+this.lotteryId)
    },
    gomousedown(it){
   clearTimeout(this.timeOutEvent);
   this.timeOutEvent = 0;
   this.timeOutEvent = setTimeout(() => {
    this.$refs.edit.innerHTML+="@"+it.nickname+' '
    this.isClick=false
   }, 800);
 },
      
gomouseup(it){
    clearTimeout(this.timeOutEvent);
    if(this.isClick){
      this.manage(it)
    }
},
 
gomousemove(){
     clearTimeout(this.timeOutEvent);
     this.timeOutEvent = 0;
     this.isClick=true
},
    allMute(){
      if(this.isMute){
        return
      }
      // this.manageShow=true
      this.jinyan()
    },
     jinyan(){
            let c={
              action:this.manageItem.user_id?'mute':'all_mute',
              user_id:this.manageItem.user_id?this.manageItem.user_id:'',
              duration:this.manageTime
            }
             let d = this.globalPpproach.checkIsEncrypt(c)
             this.$http.post('/api/chatroom/operate', d).then(res=>{
               console.log(res)
               if(res.data.code==1){
                 if(!this.manageItem.user_id){
                   this.isMute=true
                 }
                  this.showChatMsg(res.data.msg)
                  this.manageTime=10;
                  this.manageItem={};
                  this.manageShow=false
               }else{
                this.showChatMsg(res.data.msg)
               }
             })
          },
    manage(i){
      console.log(i)
           if(this.$store.state.userinfo.user_type!=1){
             return
           }
           if(i.user_type==1){
             return
           }
            this.manageItem=i
            this.manageShow=true
          },
    showChatMsg(i){
      this.popTC=true;
      this.chatMsg=i;
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
     getEmojis(i){
             let Img = `<img src="${i.path}" style='width:0.5rem;vertical-align: middle;'>`;
             this.$refs.edit.innerHTML+=Img
          },
    sendMsg(){
      if(/^\d+$/.test(this.$refs.edit.innerHTML)){
              this.showChatMsg('Nội dung không thể chỉ chứa mỗi chữ số')
              return  
        }
    if(!this.$refs.edit.innerHTML){
       this.showChatMsg('Tin nhắn không được để trống')
              return 
          }
     if(Date.parse(new Date())/1000-localStorage.getItem('speakTime')<this.chatSettings.voice_rate&&localStorage.getItem('speakTime')){
        this.showChatMsg('Tin nhắn gửi đi lỗi, vui lòng thử lại sau'+this.chatSettings.voice_rate+'giây')
              return 
            }
       let msgData={type:'chat',
            content:this.$refs.edit.innerHTML,
            user_id:this.$store.state.userinfo.user_id,
            nickname:this.$store.state.userinfo.nickname,
            user_type:this.$store.state.userinfo.user_type,
            avatar:this.$store.state.userinfo.avatar,
            vip:this.$store.state.userinfo.vip,
            win_rate:this.$store.state.userinfo.win_rate,
            }
           
            this.websocketsend(msgData)
            this.$refs.edit.innerHTML=''
            this.emojiShow=false
    },
    goDown(){
      setTimeout(() => {
        this.$refs.myScrollbar.wrap.scrollTop=this.$refs.myScrollbar.wrap.scrollHeight
       this.$refs.myScrollbar.wrap.onscroll =this.closeMenu
      }, 300);
      
    },
     HTMLDecode(text) { 
          var temp = document.createElement("div"); 
          temp.innerHTML = text; 
          var output = temp.innerText || temp.textContent; 
          temp = null; 
          return output; 
        } ,
    getChat(){
          this.$http.get('/api/chatroom/config').then(res=>{
            if(res.data.code==1){
              this.msgList=res.data.chat_log
              this.chatSettings=res.data.settings
              if(this.chatSettings.voice_purview=='none'){
                this.isMute=true
              }
              this.sharePurview=res.data.settings.share_purview.replace(/[^0-9]/ig,"")
              this.voicePpurview=res.data.settings.voice_purview.replace(/[^0-9]/ig,"")
              this.msgList.forEach((c,i)=>{
                if(c.type=="share_plan"){
                  c.content=JSON.parse(c.content)
                }else{
                  c.content=this.HTMLDecode(c.content)
                }
                
              })
              
                 this.goDown()
          
            }
          })
        },
        initWebSocket(){
          let wsServer = location.protocol.includes('https')?'wss://'+location.host+'/wss':'ws://'+location.host+'/wss';
            this.websock = new WebSocket(wsServer);
            this.websock.onmessage=this.websocketonmessage;
            this.websock.onopen = this.websocketonopen;
            this.websock.onerror = this.websocketonerror;
            this.websock.onclose = this.websocketclose;
        },
        websocketonmessage:function(e){
            let socketData=JSON.parse(e.data)
            console.log(socketData)
            if(socketData.type=='connected'){
          let loginData={type:'login',client_id:socketData.client_id,user_id:this.$store.state.userinfo.user_id?this.$store.state.userinfo.user_id:0,client_type:'1'}
          this.websocketsend(loginData)
        }
        if(socketData.type=='chat'){
          if(socketData.code!=1){
            this.showChatMsg(socketData.msg)
            return
          }
          if(socketData.user_id==this.$store.state.userinfo.user_id){
            localStorage.setItem("speakTime",Date.parse(new Date())/1000)
          }
          this.isMute=false
          socketData.content=this.HTMLDecode(socketData.content)
          this.msgList.push(socketData)
                this.goDown()

        }
        if(socketData.msg_type=='share_plan'){
          if(socketData.code!=1){
            this.showChatMsg(socketData.msg)
            return
          }
          this.isMute=false
         let share_plan=socketData.data
         share_plan.msg_type="share_plan"
          this.msgList.push(socketData.data)
                  this.goDown()
        }
        if(socketData.msg_type=='chatroom_del_log'){
          if(socketData.code!=1){
            this.showChatMsg(socketData.msg)
            return
          }
          let idx=this.msgList.findIndex((i)=>i.chat_id==socketData.data.ids)
          this.msgList.splice(idx,1)
        }
        },
         websocketsend(Data) {//数据发送
          this.websock.send( JSON.stringify(Data))
        },
         websocketonopen(e){
           clearInterval(this.pingInterval)
           this.pingInterval=setInterval(() => {
             if(this.websock.readyState==1||this.websock.readyState==2){
               let pingData={type:'pong'}
              this.websocketsend(pingData)
              }else if(this.websock.readyState==3){
                this.initWebSocket()
              }
           }, 30000);
          console.log('open')
        },
        websocketonerror(){
        console.log('Socket error')
        },
       websocketclose(){
        console.log('close')
        },
        shareSelect(){ //是否分享
        if(this.isShare){
            this.isShare=false
        }else{
            this.isShare=true
        }
    },
    sharePlay(){ //弹窗下注按钮
    console.log(this.shareItem)
    let isok=false
    this.shareItem.items.forEach((i,d)=>{
      if(i.multiple<1){
        isok=true
      }
    })
    if(isok){
       this.showChatMsg('乘数不能小于1')
      return 
    }     let a=JSON.parse(JSON.stringify(this.shareItem))
          let c=JSON.parse(JSON.stringify(this.shareItem))
          c.items.forEach((i,v)=>{
            i.amount=i.multiple
          })
          a.items = JSON.stringify(a.items)
          c.items = JSON.stringify(c.items)
          let d = this.globalPpproach.checkIsEncrypt(c)
          this.$http.post('/api/guess/play', d).then(res=>{
            if(res.data.code==1){
               this.showChatMsg(res.data.msg)
              this.showChatOrder=false;
              if(this.isShare){
                this.shareOrder(a)
              }
            }
            else{
              this.showChatMsg(res.data.msg)
            }
          })
    },
    async getGame() {
            let res = await this.$http.get("/api/lottery/allsort/");
            if (res && res.data.code == 1) {
              this.allLottery = res.data.data || [];
            }
          },
        }
    }
</script>
<style lang="less" scoped>
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
                color: #666666;
               
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
        .hb-bg2{
          text-align: center;
          margin-top: 100px;
          img{
            cursor: pointer;
          }
          
        }
        .hb-bg1{
          position: relative;
           text-align: center;
          margin-top: 100px;
          .hb-fruit{
            position: absolute;
            width: 152px;
            top: 84px;
            left: 118px;
            p{
              font-size: 18px;
              line-height: 25px;
              color: #B87536;
            }
            h2{
              font-weight: bold;
              font-size: 28px;
              line-height: 42px;
              color: #F9504D;
            }
          }
        }
        .close-btn{
         position: absolute;
          left: 164px;
          bottom: 90px;
          cursor: pointer;
        }
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
