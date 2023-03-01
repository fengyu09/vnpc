<template>
  <div id="recharge">
    <!--充值弹窗-->
    <div class="recharge-box pop-container"  v-if="show">
      <div class="recharge-container">
        <div class="pop-container-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">Nạp điện <i class="remove-btn" @click="showParent"></i></div>
        <div class="recharge-content" :class="isYHK == true ?'isyhk':''">
          <!-- 充值方式 -->
            <div class="recharge-type" v-if="!isYHK && !showWechat">
              <div class="clearfix">
                  <h3 class="fl">Phương thức nạp</h3>
                  <!-- <div class="p fr" v-if="isKm">没有卡密？联系代理充值，<i @click="isCZList = true">立即联系</i></div> -->
                  <div class="p fr" v-if="isXnb||isSdXnb"><router-link tag="a" target="_blank"   style="font-size: 14px;color:#F73B3B" to="/Introduction">Hiểu về tiền ảo</router-link></div>
              </div>
            <p class="type-loading-tip" v-if="typeLoading">loading...</p>
            <div class="recharge-type">
              <ul>
                <!-- <li  @click="selectOne('km',-1)" :class="currType==-1?'active':''" style="text-align: center;line-height: 50px">卡密充值</li> -->
                <li v-for="(item,index) in czlist" :key="index" @click="selectOne(item,index+1)" :class="currType==index+1?'active':''">
                  <!--{{item.channels_type }}-->
                  <div class="type-img" v-if="item.pay_type !='usdtcz'"><img v-lazy="item.icon" alt=""></div>
                  <div class="type-img" v-if="item.pay_type =='usdtcz'"><img src="../assets/imgaes/xnb_icon.png" alt=""></div>
                  <!--<div class="type-msg" v-if="item.pay_type != 'yhkcz'" :class="{'long-text2':item.channels_type.length>8?true:false}">-->
                  <div class="type-msg" v-if="item.pay_type != 'yhkcz'&&item.pay_type != 'vcsdcz'" :class="item.channels_type != null && item.channels_type.length>8?'long-text2':''">
                    <span>{{item.channels_type}}</span>
                    <p>{{item.low_money}} vndk -{{item.high_money}} vndk</p>
                  </div>
                  <div class="type-msg" :style="item.fee<=0&&item.pay_type == 'yhkcz'?'padding-top:14px':''" v-else>
                    <span >{{item.channels_type}}  <span style="color:#FF1C30" v-show="item.fee>0">( Quà tặng thêm {{item.fee}}% )</span></span>
                     <p>{{item.low_money}} <i v-if="item.pay_type == 'vcsdcz'">usdt</i> <i v-else>vndk</i> -{{item.high_money}} <i v-if="item.pay_type == 'vcsdcz'">usdt</i> <i v-else>vndk</i></p>
                    <!-- <p style="color:#FF1C30" v-show="item.fee>0"></p> -->
                  </div>
                </li>
              </ul>
            </div>
          </div>
            <!-- 自动虚拟币-->
          <div class="xnb-xy" v-if="isXnb">
              <h4>Thỏa thuận tiền ảo：</h4>
              <div class="virtual-xy">
                <span v-for="(item,index) in xyList.protocol" :class="{active:virtualCurrId == item}" @click="selectWallet(item)" :key='index'>{{item}}</span>
              </div>

             <div class="recharge-value">
                      <h3>Tiền nạp<div class="p fr"><router-link  tag="a" target="_blank"   style="font-weight: normal; font-size: 14px;color:#4BA1F9" to="/Tutorials">Cách nạp</router-link></div></h3>
                      <div class="quit-money" :class="isSdXnb?'sd-xnb-money':''">
                        <span v-for="(v,index) in czlist[currType==0?currType:currType-1].quick_list" :class="currQuit==v?'active':''" @click="quitMoney(v,v)" :key="index">{{v}}</span>
                      </div>
                      <h4>Số tiền khác</h4>
                      <div class="other-money">
                        <input type="text" maxlength="6" @input="shuru" v-model="rechargeData.amount" placeholder="请输入金额"> VNDK
                      </div>
                    </div>

              <div class="tips">
                <p><span> Tham khảo tỉ giá hối đoái，：1USDT≈ {{xyList.cz_exchange_rate}}VNDK</span><span style="padding-left:150px;">Dự kiến thanh toán：{{(rechargeData.amount/xyList.cz_exchange_rate).toFixed(2) || 0}}USDT</span></p>
                <p style="display:block">请以实时支付汇率为准<br>到账金额为提交订单时的RMB金额</p>
              </div>
          </div>
          <!-- 手动虚拟币 -->
          <div class="xnb-xy xnb-sd" v-if="isSdXnb" style="margin-top:30px">

              <div class="input-xnb-box">
                <div class="xnb-box">
                  <p>Địa chỉ mã thông báo chuyển tiền</p>
                  <input type="text" placeholder="Vui lòng nhập địa chỉ mã thông báo" v-model="czDz">
                  <i @click="showAdd(1)" v-if="!czAdrArr.length">Thêm địa chỉ</i>
                  <i @click="showAdd(2)" v-if="czAdrArr.length" class="cy-address">Địa chỉ chung</i>
                </div>
                <div class="xnb-box">
                  <p>Số giao dịch chuyển tiền</p>
                  <input type="text" placeholder="Vui lòng nhập số phiếu giao dịch" v-model="hkID">
                </div>
                <div class="xnb-box xnb-time">
                  <p>Thời gian chuyển tiền</p>
                  <el-date-picker
                      class="tzDate bankDate"
                      v-model="hkTime"
                      type="datetime"
                      @change="getStartTimeXnb"
                      placeholder="Vui lòng nhập thời gian chuyển tiền">
                  </el-date-picker>
                  <!-- <input type="text" placeholder="请输入交易单号"> -->
                </div>
              </div>

               <div class="clearfix">
                 <!-- 充值金额 -->
                 <div class="fl" style="width:60%">
                    <h4 class="fl">chuyển tiền：</h4>
                    <div class="virtual-xy fr">
                      
                      <span v-for="(item,index) in xyList.protocol" :class="{active:xnProtocl == item}" @click="selectWalletSd(item)" :key='index'>{{item}}</span>
                    </div>
                    <div class="clearfix"></div>
                    <div class="recharge-value">
                      <h3>Tiền nạp<div class="p fr"><router-link  tag="a" target="_blank"   style="font-weight: normal; font-size: 14px;color:#4BA1F9" to="/Tutorials">Cách nạp</router-link></div></h3>
                      <div class="quit-money" :class="isSdXnb?'sd-xnb-money':''">
                        <span v-for="(v,index) in czlist[currType==0?currType:currType-1].quick_list" :class="currQuit==v?'active':''" @click="quitMoney(v,v)" :key="index">{{v}}</span>
                      </div>
                      <h4>Số tiền khác</h4>
                      <div class="other-money">
                        <input type="text" maxlength="6" @input="shuru" v-model="rechargeData.amount" placeholder="Số lượng chuyển USDT"> USDT
                      </div>
                    </div>

                     <div class="tips sdXnb-tips">
                          <p><span> Tham khảo tỉ giá hối đoái：<i style="color:#FF5251">1USDT≈ {{xyList.cz_exchange_rate}}VNDK</i></span></p>
                          <p><span style="display:block">Dự kiến hoàn thành ： <i style="color:#FF5251">{{(rechargeData.amount*xyList.cz_exchange_rate).toFixed(2) || 0}}VNDK</i></span></p>
                          <p><i style="color:#FF5251">Vui lòng lấy tỷ giá hối đoái thanh toán theo thời gian thực làm tiêu chuẩn, dự kiến hoàn thành không nhỏ hơn {{xyList.low_money}} usdt</i><br>Số tiền nhận được là VNDK khi lệnh được gửi </p>
                          <el-button class="custom-btn recharge-btn fr"  @click="onConfirm" :loading="isUsdtLoading">Đã hoàn tất nạp tiền</el-button>


                          

                    </div>

                 </div>
                 <!-- 二维码 -->
                 <div class="fr">
                    <!-- 手动虚拟币二维码-->
                    <div class="xnb-code">
                      <div v-for="(v,index) in codeList" :key="index"  v-show='xnProtocl==v.protocol'>
                          <!-- <h3 style="color:#71819D;padding-left:10px;">请转账到以下账号中</h3> -->
                            <p class="tip">Vui lòng dùng ví USDT quét mã QR phía dưới để hoàn tất thanh toán</p>
                            <img v-lazy="v.code_image" alt="">
                            <p class="fk-address">{{v.address}}</p>
                            <div class="copy-btn copy-fk-address" @click="copyLinkCard('copy-fk-address')" data-clipboard-action="copy" :data-clipboard-text="v.address">Sao chép địa chỉ</div>
                            <p>Nếu bạn cần giúp đỡ， <a href="javascript:;" @click="goOnline">Liên hệ bộ phận chăm sóc khách hàng</a></p>
                      </div>
                    </div>
                 </div>
               </div>
              
          </div>
          <!-- 充值金额 -->
          <div class="recharge-value" v-if="!isKm && !isYHK&& !isSdXnb&&!isXnb&&!showWechat">
            <h3>Tiền nạp<div class="p fr"><router-link  tag="a" target="_blank"   style="font-weight: normal; font-size: 14px;color:#4BA1F9" to="/Tutorials">Cách nạp</router-link></div></h3>
            <div class="quit-money" :class="isSdXnb?'sd-xnb-money':''">
              <span v-for="(v,index) in czlist[currType==0?currType:currType-1].quick_list" :class="currQuit==v?'active':''" @click="quitMoney(v,v)" :key="index">{{v}}</span>
            </div>
            <h4>Số tiền khác</h4>
            <div class="other-money">
              <input type="text" maxlength="6" @input="shuru" v-model="rechargeData.amount" placeholder="Mời nhập số tiền khác"> 
            </div>
          </div>


         
        
          <!-- 卡密 -->
          <div class="recharge-value" v-if="isKm&&!isXnb&&!isSdXnb">
            <h3>账号密码</h3>
            <div class="km-box">
              <div class="input-box">
                <span>账号</span><input type="text" maxlength="18" @input="shuru" v-model="rechargeData.kmZH" placeholder="请输入您的18位数账号">
              </div>

              <div class="input-box">
                <span>密码</span><input type="text" maxlength="6" @input="shuru" v-model="rechargeData.kmPass" placeholder="请输入您的6位数密码">
              </div>
              <div class="p fr km-tip" v-if="isKm">没有卡密？联系代理充值，<i @click="isCZList = true">立即联系</i></div>
            </div>
          </div>
              <!-- 银行卡充值 -->
          <div class="yhk-box" v-if="isYHK&&!isSdXnb">
            <div class="back-select" @click="isYHK=false;currType=0">Quay lại</div>
            <p class="yhk-bt">1. Vui lòng chọn ngân hàng thuận tiện cho bạn để chuyển khoản</p>
            <p class="yhk-12" style="margin-left: 18px;">Sau đây là những thẻ ngân hàng hiệu quả nhất hiện nay. Vui lòng xác minh thông tin tài khoản nhận khi chuyển tiền:</p>
            <ul class="clearfix" style="margin-left: 18px;">
              <!-- <li><i></i>{{czCardInfo.bank}}</li> -->
               <li v-for="item,index in allBank" :key="index" @click="czCardInfo=item" :class="czCardInfo.bank_id==item.bank_id?'active':''"><i></i>{{item.bank}}</li>
            </ul>
            <p style="color:#FF703A;font-size: 16px;margin-left: 18px;">{{czCardInfo.rate}}</p>
            <p style="color:#FF703A;font-size: 16px;margin-left: 18px;">Phạm vi nạp tiền：{{czCardInfo.low_money}}~{{czCardInfo.high_money}}</p>
            <p class="yhk-bt" style="margin-top:10px;">2. Vui lòng chuyển vào tài khoản sau:</p>
            <!-- <div class="yhk-bd">
              <span class="card-title">卡号：</span>
              <span class="card-content">{{czCardInfo.no}}</span>
              <span class="copy-btn copy-no" @click="copyLinkCard('copy-no')" data-clipboard-action="copy" :data-clipboard-text="czCardInfo.no">复制</span>
            </div> -->

            <div  v-for="item,index1 in allBank" :key="index1" v-show="item.bank_id==czCardInfo.bank_id">
               <div class="yhk-bd">
                <span class="card-title">số thẻ:</span>
                <br>
                <span class="card-content">{{item.no}}</span>
                <span class="copy-btn copy-no" @click="copyLinkCard('copy-no')" data-clipboard-action="copy" :data-clipboard-text="item.no">sao chép</span>
              </div>
            </div>

            <div class="yhk-bd">
              <span class="card-title">chủ thẻ:</span>
              <br>
              <span class="card-content">{{czCardInfo.name}}</span>
              <span class="copy-btn copy-name" @click="copyLinkCard('copy-name')" data-clipboard-action="copy" :data-clipboard-text="czCardInfo.name">sao chép</span>
            </div>
            <br>
            <div class="yhk-bd">
              <span class="card-title">Tài khoản ngân hàng:</span>
              <br>
              <span class="card-content">{{czCardInfo.bank}}</span>
              <span class="copy-btn copy-bank" @click="copyLinkCard('copy-bank')" data-clipboard-action="copy" :data-clipboard-text="czCardInfo.bank">sao chép</span>
            </div>
            <p class="yhk-bt">3. Vui lòng điền thông tin chuyển khoản của bạn: <button class="cyzh-btn" @click="cyzhOpen">Tài khoản thường xuyên sử dụng</button></p>

              <div class="yhk-bd ">
              <span class="card-title">Người gửi tiền:</span>
              <br>
              <input v-model="userName" type="text" placeholder="Vui lòng nhập tên của người gửi tiền" maxlength="20">
            </div>
             <div class="yhk-bd">
              <span class="card-title">Số tiền gửi:</span>
              <br>
              <input v-model="czMoney" type="text" placeholder="Vui lòng nhập số tiền nạp">
            </div>
            <div class="yhk-bd ">
              <span class="card-title">Số tài khoản tiền gửi:</span>
              <br>
              <input v-model="cardNum" type="text" placeholder="Vui lòng nhập số tài khoản người gửi tiền" maxlength="50" >
            </div>
           
            <div class="yhk-bd">
              <span class="card-title">Thời gian gửi tiền:</span>
              <br>
              <el-date-picker
                      class="tzDate bankDate"
                      v-model="timeValue"
                      type="datetime"
                      @change="getStartTime"
                      placeholder="Bấm để chọn ngày và giờ">
              </el-date-picker>
            </div>
            
             <div class="yhk-bd">
                <span class="card-title">Ngân hàng gửi tiền:</span>
                <br>
                <!-- <span class="card-content"></span> -->
                <el-select @change="platformChanged" v-model="selectSort" clearable placeholder="Vui lòng nhập ngân hàng gửi tiền" >
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                  ></el-option>
                </el-select>
              </div>

               <div class="yhk-bd">
                <span class="card-title">mã ngẫu nhiên:</span>
                <br>
                <span class="card-content">{{sjCode}}</span>
                <span class="copy-btn copy-sjm" @click="copyLinkCard('copy-sjm')" data-clipboard-action="copy" :data-clipboard-text="sjCode">Sao chép</span>
              </div>

            <div>
              <el-button class="submit-bank-btn" style="display:block"  @click="yhRecharge" :loading="btnLoading">Gửi tiền nạp tiền</el-button>
            </div>
            <!-- <p class="yhk-12" style="margin-left: 8px;" >温馨提示</p>
            <p class="yhk-12" style="margin-left: 13px;color:#FF0101">1.每次转账充值前请重新获取银行卡信息，若入款到过期的账号，视为无效的存款，平台一个概不负责！</p>
            <p class="yhk-12" style="margin-left: 13px;">2.最低金额100.00元，为确保财务第一时间为您添加游戏额度，请您转账为非整数（例如：欲入￥5000.转账￥5000.01）谢谢</p>
            <p class="yhk-12" style="margin-left: 13px;margin-bottom: 10px;">3.为了确保准确核实您的款项，请精准选择存款的年-月-日-时-分，秒可以忽略，例如2016-12-12 14:25:00</p> -->
          </div>
        

          <div class="total-pay-money clearfix"  v-if="!isYHK&&!isSdXnb&&!showWechat" >
            <p class="fl" v-if="!isKm&&!isXnb">Số tiền thanh toán：<span class="money" v-if="rechargeData.amount">￥{{rechargeData.amount}}</span></p>
            <!--<div class="recharge-btn fr" @click="goRecharge">充值</div>-->
            <el-button class="custom-btn recharge-btn fr"  @click="goRecharge" :loading="btnLoading">Nạp ngay</el-button>
            <!--<div class="tip fr" v-if="sendLoading">订单提交中...</div>-->
          </div>
          <div class="wechat-box clearfix" v-if="showWechat&&!isSdXnb">
              <div class="wechat-left  fl">
                <p>Vui lòng điền vào tài khoản của bạn <br> và thông tin chuyển khoản:</p>
                <div class="wechat-input">
                  <span>Người gửi tiền</span>
                  <br>
                  <input type="text" v-model="wechatName" placeholder="Vui lòng nhập tên của người gửi tiền">
                </div>
                <div class="wechat-input">
                  <span>Số tiền chuyển khoản</span>
                  <br>
                  <input type="text" v-model="wechatMoney" placeholder="Vui lòng nhập số tiền nạp">
                </div>
                <div class="wechat-input">
                  <span>Thời gian chuyển giao</span>
                  <br>
                  <el-date-picker
                          class="wechatDate"
                          v-model="wechatTime"
                          value-format="timestamp"
                          type="datetime"
                          @change="getStartTime"
                          placeholder="Bấm để chọn ngày và giờ">
                  </el-date-picker>
                  <!-- <input type="text" placeholder="Vui lòng nhập số tiền nạp"> -->
                </div>
                <p class="wechat-tips" v-if="wechat.length">Ghi chú: Số tiền gửi{{wechat[0].min_sum}}-{{wechat[0].max_sum}}</p>
              </div>
              <div class="wechat-right fl">
                <p style="margin-left: 15px;text-align: center;">Vui lòng sử dụng WeChat để  <br>quét mã QRbên dưới</p>
                <div v-if="wechat.length" style="margin: 0 auto;">
                  <img v-lazy="wechat[0].code_image" alt="">
                </div>
              </div>
              <div class="fh-btn fr" @click="showWechat=false;currType=0">trở lại</div>
              <!-- <div class="submit" @click="goWechat()">提交充值</div> -->
              <el-button class="submit"  @click="goWechat()" :loading="isWechatLoading">Gửi tiền nạp tiền</el-button>
          </div>
        </div>
        <div class="order-sending" v-if="sendLoading"></div>
      </div>
    </div>
    <!-- 充值成功弹窗 -->
    <div class="cgBox" v-show="tcBox">
      <div class="cg-box">
        <i @click="tcBox = false" class="close-icon"></i>
        <p class="kmIMG">
          <img v-show="cgImg" src="../assets/imgaes/kmCG.png" alt="">
          <img v-show="sbImg" src="../assets/imgaes/kmSB.png" alt="">
        </p>
        <p class="kmTxt">{{kmTXT}}</p>
      </div>
    </div>
    <!-- Sao chép thành công弹窗 -->
    <div class="copy-success-box cgBox" v-if="isCopy">
       <div class="cg-box">
         <i class="close-icon" @click="isCopy = false"></i>
         <p class="p">Đã sao chép thông tin liên hệ</p>
         <p>Vui lòng quay lại<i @click="openQQ()">{{copyTxt}}</i>Thêm liên hệ</p>
       </div>
    </div>
    <!-- 卡商列表 -->
    <div v-if="isCZList" class="pop-container">
      <div class="cz-content recharge-container">
        <div class="pop-container-title">Nạp <i class="remove-btn" @click="isCZList=false"></i></div>
        <div class="cz-cont">
          <ul>
            <li v-for="(v,index) in ksList" :key="index" class="clearfix"> 
               <div class="fl kml-name">
                 <span>{{v.name}}</span>
                 <span class="jiu">Số dư khả dụng: <i style="color:#F73B3B">{{v.quota}}</i></span>
               </div>
               <div class="fr clearfix  kml-pay" >
                 <span v-for="(vv,index1) in v.contact" :key="index1" class="fl copy-link" @click="copyLink('copy-link',vv.title,vv.value)"
                   data-clipboard-action="copy" :data-clipboard-text="vv.value"
                   >
                   <i><img v-lazy="vv.icon" alt=""></i>
                   <i class="jiu">{{vv.title}}</i>
                 </span>
               </div>
            </li>
          </ul>
          <p @click="czsm = true">Hướng dẫn nạp tiền</p>
        </div>
      </div>
    </div>
    <!-- 充值说明 -->
    <div class="recharge-rule" v-if="czsm">
      <div class="recharge-rule-content">
        <h3>Hướng dẫn nạp tiền</h3>
        <i @click="czsm=false"><img src="../assets/imgaes/gb_button_6_6.png" alt=""></i>
        <div class="rule-content">
          <p>
            1.代理只负责卡密销售，如果您有其他问题，请联系我们在线客服处
            理。代理如果骚扰或推荐您到其他平台，欢迎举报，举报属实奖励5
            千元。
          </p>
          <p>
            2.点击图标，系统自动复制对应（支付宝，qq、微信）账号，打开对
            应（支付宝，qq、微信）账号，添加好友购买。
          </p>
          <p>
            3.代理人员，账号密码，返回客户端输入账号密码充值。
          </p>
          <p>
            4.充值完成，提示充值成功，返回钱包页面查看金额。
          </p>
          <p>
            5.代理人员不定期更换，为避免不必要的损失，每次支付请到平台 提单，以官方为准，谢谢！
          </p>
        </div>
      </div>
    </div>
    <div class="recharge-rule" v-if="isHtml">
      <div class="is-html">
        <!-- <div v-html="isZFC"></div> -->
        <iframe :srcdoc="isZFC" id="mainIframe" ref="mainIframe" name="mainIframe"></iframe>
      </div>
      
    </div>
    <!--常用账号-->
    <div v-if="isCyzh" class="cyzh-content pop-container">
      <div class="recharge-container">
        <div class="pop-container-title" ><i class="back"  @click="isCyzh=false;isYHK=true;isDelete=false;isEdit=true; isAddZhBtn=true"></i> Tài khoản thường dùng <i class="remove-btn" @click="isCyzh=false;isYHK=true;isDelete=false;isEdit=true; isAddZhBtn=true"></i></div>
        <div class="cyzh-cont">
            <p  v-if="!cardList.length&&isLoading"  style="height: 494px; font-size: 18px;color: #999; padding: 180px 0 0 300px">Bạn chưa thêm tài khoản thường dùng！</p>
            <ul class="card-list" v-if="cardList.length">
              <p >
                <button class="cyzh-edit" v-if="isEdit"  @click="Edit">chỉnh sửa</button>
                <button class="cyzh-edit" v-if="!isEdit" @click="done">Kết thúc</button>
                <!--<button class="cyzh-delete" v-if="!isEdit" @click="done">Xóa</button>-->
              </p>
              <li v-for="(v,i) in cardList" :key="i">
                <div class="fl name">
                  <span>Người gửi tiền: {{v.name}}</span>
                  <span>Số tài khoản gửi tiền:{{v.no}}</span>
                </div>
                <div class="bank-name fl">{{v.remark}}</div>
                <button class="sy-btn fr" :class="currslectId == i?'active':''"  @click="useOne(v,i)">Sử dụng tài khoản</button>
                <span class="del" v-if="isDelete" :data-index="i" :data-id="v.id" @click="deleteItem"></span>
              </li>
            </ul>
          <button class="add-btn fr" v-if="isLoading==true && isAddZhBtn == true" @click="addZhBtn">Thêm</button>
        </div>
      </div>
    </div>
    <!--添加账号-->
    <div id="tjzh-content" v-if="isTjzh" class="tjzh-content pop-container">
      <div class="recharge-container">
        <div class="pop-container-title"><i class="back"  @click="isTjzh=false;isCyzh=true"></i> Thêm tài khoản <i class="remove-btn" @click="isTjzh=false;isCyzh=true"></i></div>
        <div class="tjzh-cont">
          <div class="h-box">
            <p class="p-title">Thêm tài khoản：</p>
            <div class="yhk-bd">
              <span class="card-title">Người gửi tiền：</span>
              <input type="text" placeholder="Vui lòng nhập tên của người gửi tiền" v-model="cardData.name" ref="nameReg" maxlength="20">
            </div>
            <div class="yhk-bd">
              <span class="card-title">Tài khoản tiền gửi：</span>
              <input type="text" maxlength="50" ref="noReg" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')" placeholder="Vui lòng nhập tài khoản tiền gửi" v-model="cardData.no">
            </div>
            <div class="yhk-bd">
              <span class="card-title">Nhận xét：</span>
              <input type="text" placeholder="Vui lòng nhập nhận xét" v-model="cardData.remark" maxlength="8">
            </div>
          </div>
          <button class="confirm-btn fr"  :disabled="isdisable" @click="postCard">Gửi đi</button>
        </div>
      </div>
    </div>

    <!--添加手动虚拟币账号-->
    <div id="tjzh-content" v-if="showXnbAdress" class="tjzh-content pop-container xnb-address-container">
      <div class="recharge-container">
        <div class="pop-container-title"><i class="back"  @click="showXnbAdress=false;"></i> {{isUsdtList?'Địa chỉ thường dùng':'Thêm địa chỉ'}} <i class="remove-btn" @click="showXnbAdress=false;"></i></div>
        <!-- 添加 -->
        <div class="tjzh-cont" v-if="isAddUsdtAdr">
          <div class="h-box">
            <div class="yhk-bd">
              <p class="card-title">汇款代币地址:</p>
              <!-- <input type="text" placeholder="请输入代币地址" v-model="!czAdrArr.length&&czDz?czDz:xnbAdress.address" ref="nameReg"> -->
              <input type="text" placeholder="请输入代币地址" v-model="xnbAdress.address" ref="nameReg">
            </div>
            <div class="yhk-bd">
              <p class="card-title">备注：</p>
              <input type="text" placeholder="Vui lòng nhập nhận xét (trong vòng 5 ký tự)" v-model="xnbAdress.remark" maxlength="5">
            </div>
          </div>
          <!-- <button class="confirm-btn fr"  :disabled="isdisable" @click="addOneAdr" isUsdtLoading></button> -->
          <el-button class="confirm-btnfr"  @click="addOneAdr" :loading="isUsdtLoading" style="background:linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);color:#fff">Gửi đi</el-button>
        </div>
        <!-- 手动常用虚拟币列表 -->
        <div class="cyzh-cont" v-if="isUsdtList">
            <p  v-if="!czAdrArr.length&&isLoading"  style="height: 494px; font-size: 18px;color: #999; padding: 180px 0 0 300px">Bạn chưa thêm tài khoản thường dùng！</p>
            <ul class="card-list" v-if="czAdrArr.length">
              <p >
                <button class="cyzh-edit" v-if="isEdit"  @click="Edit">chỉnh sửa</button>
                <button class="cyzh-edit" v-if="!isEdit" @click="done">Hoàn thành</button>
              </p>
              <li v-for="(v,i) in czAdrArr" :key="i">
                <div class="fl name">
                  <span>{{v.remark}}</span>
                  <span>{{v.no}}</span>
                </div>
                <button class="sy-btn fr"  v-if="isEdit" :class="czDz == v.no?'active':''"  @click="changeAddress(v,i)"></button>
                <span class="del" v-if="!isEdit" :data-index="i" :data-id="v.id" @click="deleteOne(v)"></span>
                <!-- <span class="del" v-if="isDelete" :data-index="i" :data-id="v.id" @click="deleteOne(v)"></span> -->
              </li>
            </ul>
          <button class="add-btn fr" v-if="(isLoading==true && isAddZhBtn == true)||!czAdrArr.length" @click="isAddUsdtAdr=true;isUsdtList=false">添加</button>
        </div>


      </div>
    </div>



<!--    moo支付-->
    <div class="moo-pay" v-if="rechargeHtml">
<!--      <div class="moo-title">请确认 <i class="remove-btn" @click="rechargeHtml=''"></i></div>-->
      <div v-html="rechargeHtml" v-if="rechargeHtml"></div>
    </div>

    <!-- 虚拟支付 -->
    <div class="virtual-recharge" v-if="virtualRechargeHtml">
       <div v-html="virtualRechargeHtml" v-if="virtualRechargeHtml"></div>
    </div>


    

  </div>
</template>

<script>
import {  mapState } from "vuex";
import html2canvas from "html2canvas";
import { alertComfirm } from "../assets/js/public";
export default {
  name: "recharge",
  data() {
    return {
      czlist: [],
      allBank: [],
      rechargeData: {
        user_id: "",
        amount: "",
        channels_id: "",
        returnurl: window.location.href,
        kmZH: "",
        kmPass: "",
        currency_type: "VNDK",
        protocl: "",
      },
      currQuit: -1,
      currType: 0,
      currAip: "",
      sendLoading: false, //提交中
      typeLoading: false,
      currOne: {},
      url: "",
      btnLoading: false,
      value: [5, 20, 50, 100, 200, 500, 1000, 2000],
      isKm: false,
      kmTXT: "",
      cgImg: false,
      sbImg: false,
      tcBox: false, //弹窗
      ksList: [], //卡商列表
      isCZList: false,
      isCopy: false,
      copyTxt: "支付宝",
      QQnum: "",
      czsm: false,
      isHtml: false,
      isZFC: "",
      isYHK: false,
      yhkData: {
        skr: "",
        ckzh: "",
        zzsj: "",
        zzje: "",
      },
      czCardInfo: {},
      isShowBank: false,
      userName: "",
      cardNum: "",
      startDate: "",
      timeValue: "",
      timeValue2: "",
      czMoney: "",
      startTimePicker: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 90 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
          // return time.getTime() > Date.now();
        },
      },
      isCyzh: false, //常用账号
      isEdit: true,
      isSelect: false,
      isDelete: false,
      selectIndex: [],
      cardList: [],
      isTjzh: false, //添加账号
      loading: false,
      currDelId: [],
      currslectId: null,
      cardData: {
        name: "",
        no: "",
        remark: "",
      },
      isdisable: false,
      isAddZhBtn: true,
      rechargeHtml: "",
      isXnb: false,
      xyList: {}, //虚拟协议列表
      virtualCurrId: "ERC20", // 虚拟币协议
      virtualRechargeHtml: "",
      sdUsdt: {
        time: "",
        address: "",
        num: "",
      },

      showXnbAdress: false, //手动虚拟币充值添加常用地址
      xnbAdress: {
        address: "",
        remark: "",
      },
      isAddUsdtAdr: false,
      isUsdtList: false,
      isSdXnb: false,
      codeList: [], //usdt付款二维码
      isUsdtLoading: false,
      xnAmount: "", //汇款jin'e
      czDz: "", //汇款地址
      hkTime: "", //汇款时间
      timeValue: "",
      startDate: "", //
      hkID: "", //订单号
      xnProtocl: "", //协议名称
      czAdrArr: [], //usdt常用地址
      currslectXnbId: 0, //当前选择usdt手动充值地址
      wechat: [], //微信二维码
      showWechat: false,
      wechatTime: "",
      wechatId: "",
      wechatName: "",
      wechatMoney: "",
      isWechatLoading: false,
      sjCode: "",
      selectSort: "",
      options: [],
      user_bank_id: "",
    };
  },
  computed: {
    ...mapState(["skin"]),
  },
  filters: {},
  watch: {
    "rechargeData.amount": function (n, v) {
      n = n + "";
      if (
        n &&
        n.charAt(n.length - 1).indexOf(".") > -1 &&
        v.indexOf(".") > -1
      ) {
        // if(n.charAt(n.length-1)=='.'){
        return (this.rechargeData.amount = n.slice(0, n.length - 1));
        // }
      }
      this.rechargeData.amount = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
    currType: function (n, o) {
      this.rechargeData.amount = "";
      this.currQuit = -1;
    },
    "rechargeData.kmZH": function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          this.rechargeData.kmZH = i.replace(/[^A-Za-z0-9]/g, ""); //只允许字母和数字
        });
      }
    },
    "rechargeData.kmPass": function (n, o) {
      if (n) {
        this.$nextTick(() => {
          let i = n.toString();
          this.rechargeData.kmPass = i.replace(/[^A-Za-z0-9]/g, ""); //只允许字母和数字
        });
      }
    },
    czMoney: function (n, v) {
      n = n + "";
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        return (this.czMoney = n.slice(0, n.length - 1));
      }
      this.czMoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
    wechatMoney: function (n, v) {
      n = n + "";
      if (n.charAt(n.length - 1).indexOf(".") > -1 && v.indexOf(".") > -1) {
        return (this.wechatMoney = n.slice(0, n.length - 1));
      }
      this.wechatMoney = n
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, ".")
        .replace(/^[0,.]{1,}/g, "")
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
    },
    rechargeHtml: function () {
      this.$nextTick(() => {
        document.getElementById("actform").submit();
      });
    },
    virtualRechargeHtml: function () {
      this.$nextTick(() => {
        document.getElementById("actform").submit();
      });
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.$store.state.userinfo.user_id > 0) {
      this.getCodeList();
      this.getRechargeType();
      this.getKSList();
      this.getCard();
      this.getCommonCard();
      this.getUsdtAdressList();
      this.getUserCardList();
      this.getSjm();
      //this.getWechatCode();
    }
  },
  methods: {
    platformChanged: function (i) {
      this.user_bank_id = i;
    },

    // 问过后端的，这两个产品说不要了，这是微信支付的， recharge/get_wechat_list Recharge/wechat_recharge/
    // getWechatCode(){
    //     this.$http.get(this.versionLive2+'recharge/get_wechat_list').then(res=>{
    //         if(res && res.data.code == 1){
    //             this.wechat = res.data.data||[];
    //         }
    //     })
    // },
    // goWechat(){
    //       if(this.wechatName==''){
    //            this.$message({
    //             type: "error",
    //             message: "请填写存款人姓名",
    //             offset: 0
    //           });
    //           return
    //       }
    //         if(this.wechatMoney==''){
    //             this.$message({
    //             type: "error",
    //             message: "请填写充值金额",
    //             offset: 0
    //           });
    //           return
    //       }

    //       if(this.wechatTime==''){
    //             this.$message({
    //             type: "error",
    //             message: "请填写时间",
    //             offset: 0
    //           });
    //           return
    //       }
    //        this.wechatId = this.wechat[0].id;
    //       //  this.$vux.loading.show({ text: "提交中..." });
    //       this.isWechatLoading = true;
    //        this.$http.post(this.versionLive2+'Recharge/wechat_recharge/',{
    //            wechat_id:this.wechatId,
    //            pay_user:this.wechatName,
    //            amount:this.wechatMoney,
    //            pay_time:parseInt(this.wechatTime.toString().substr(0,10))
    //        }).then(res=>{
    //         if(res&&res.data.code==1){
    //           this.$alert(res.data.msg, {
    //             confirmButtonText: '知道了',
    //             confirmButtonClass:'wechatBtn'
    //           });
    //           this.wechatName=''
    //           this.wechatMoney=''
    //           this.wechatTime=''
    //         }else{

    //           this.$alert(res.data.msg, {
    //             confirmButtonText: '知道了',
    //             confirmButtonClass:'wechatBtn'
    //           });
    //         }
    //         this.isWechatLoading = false;
    //         // this.$vux.loading.hide()
    //      })
    //   },
    // 获取随机码
    async getSjm() {
      // sjCode
      let res = await this.$http.get(
        this.versionLive2 + "Recharge/get_random_code/"
      );
      if (res.data.code == 1) {
        this.sjCode = res.data.random_code;
      } else {
        this.$vux.toast.text(res.data.msg, "middle");
      }
    },
    //获取用户卡列表
    async getUserCardList() {
      let res = await this.$http.get(
        this.versionLive2 + "/Recharge/get_vietnam_bank_list"
      );
      let tdata = [];
      for (let i = 0; i < res.data.data.length; i++) {
        tdata.push({
          label: res.data.data[i].bank,
          value: res.data.data[i].bank_id,
        });
      }
      this.options = tdata;
    },
    showAdd(type) {
      if (type == 1) {
        this.xnbAdress.address = this.czDz;
        this.showXnbAdress = true;
        this.isAddUsdtAdr = true;
        this.isUsdtList = false;
      } else {
        this.showXnbAdress = true;
        this.isUsdtList = true;
        this.isAddUsdtAdr = false;
      }

      //
    },
    goOnline() {
      window.open(localStorage.getItem("customer"));
    },
    onConfirm() {
      if (!this.$store.state.codeToken) {
        this.$popup();
      } else {
        //非空
        if (!this.czDz) {
          this.$message({
            type: "error",
            message: "Địa chỉ Token không được để trống",
            offset: 0,
          });
        } else if (!this.hkID) {
          this.$message({
            type: "error",
            message: "đơn không được để trống",
            offset: 0,
          });
        } else if (!this.hkTime) {
          this.$message({
            type: "error",
            message: "Thời gian chuyển tiền không được để trống",
            offset: 0,
          });
        } else if (!this.rechargeData.amount) {
          this.$message({
            type: "error",
            message: " Số tiền nạp không được để trống",
            offset: 0,
          });
        } else if (
          this.rechargeData.amount < parseInt(this.xyList.low_money) ||
          this.rechargeData.amount > parseInt(this.xyList.high_money)
        ) {
          this.$message({
            type: "error",
            message:
              "Số tiền nạp là(" +
              this.xyList.low_money +
              "~" +
              this.xyList.high_money +
              ")",
            offset: 0,
          });
        } else {
          //提交数据
          this.postUsdtRg();
        }
      }
    },
    //获取手动usdt充值二维码
    async getCodeList() {
      let res = await this.$http.get(
        this.versionLive2 + "Recharge/get_usdt_list"
      );
      this.codeList = res.data.data || [];
    },
    //手动usdt充值完成提交
    async postUsdtRg() {
      let _this = this;
      this.isUsdtLoading = true;
      let timestamp1 = Date.parse(this.hkTime) / 1000;
      let d = this.globalPpproach.checkIsEncrypt({
        protocol: this.xnProtocl,
        address: this.czDz,
        trade_order: this.hkID,
        amount: this.rechargeData.amount,
        pay_time: timestamp1,
      });
      let res = await this.$http.post(
        this.versionLive2 + "Recharge/currency_recharge",
        d
      );
      this.isUsdtLoading = false;
      if (res.data.code == 1) {
      }
      alertComfirm(
        {
          msg: res.data.msg,
        },
        function () {
          _this.showParent();
        }
      );
    },
    //获取手动usdt充值常用地址
    async getUsdtAdressList() {
      let res = await this.$http.get(
        this.versionLive2 + "Recharge/get_commonno",
        {
          params: {
            type: 2,
          },
        }
      );
      if (res.data.code == 1) {
        this.czAdrArr = res.data.data;
        console.log(7777777, this.czAdrArr.length);
      } else {
      }
    },
    //删除usdt常用地址
    async deleteOne(v) {
      let d = this.globalPpproach.checkIsEncrypt({ id: v.id });
      let res = await this.$http.post(
        this.versionLive2 + "Recharge/del_commonno",
        d
      );
      if (res.data.code == 1) {
        let arr = this.czAdrArr;
        this.$message({
          type: "success",
          message: res.data.msg,
          offset: 0,
        });
        arr.splice(
          arr.findIndex((item) => item.id == v.id),
          1
        );
        this.czAdrArr = arr;
        if (!this.czAdrArr) this.isEdit = true;
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
          offset: 0,
        });
      }
    },

    //添加usdt手动充值地址
    async addOneAdr() {
      // !this.xnbAdress.remark || (this.czDz&&!this.czAdrArr.length?!this.czDz:!this.xnbAdress.address)
      if (!this.xnbAdress.remark || !this.xnbAdress.address) {
        // this.showXnbAdress = false;
        this.$message({
          type: "error",
          message: "请输入完整信息",
          offset: 0,
        });
        return;
      }
      this.isUsdtLoading = true;
      // {no:this.czDz&&!this.czAdrArr.length?this.czDz:this.xnbAdress.address,remark:this.xnbAdress.remark,type:2}
      let d = this.globalPpproach.checkIsEncrypt({
        no: this.xnbAdress.address,
        remark: this.xnbAdress.remark,
        type: 2,
      });
      let res = await this.$http.post(
        this.versionLive2 + "Recharge/add_commonno",
        d
      );
      this.isUsdtLoading = false;
      console.log("dd");
      if (res.data.code == 1) {
        this.isUsdtList = true;
        this.isAddUsdtAdr = false;
        this.isEdit = true;
        this.getUsdtAdressList();
        this.$message({
          type: "success",
          message: res.data.msg,
          offset: 0,
        });
        this.xnbAdress.address = "";
        this.xnbAdress.remark = "";
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
          offset: 0,
        });
      }
    },

    //使用该常用账号
    changeAddress(v, index) {
      this.currslectXnbId = v.id;
      // this.currslectXnbId = index;
      this.showXnbAdress = false;
      this.czDz = v.no;
    },

    getStartTimeXnb() {},
    getStartTime: function (startTime) {
      console.log(this.wechatTime.toString().substr(0, 10));
    },
    //提交银行卡申请
    yhRecharge() {
      if (this.userName == "") {
        this.$message({
          type: "error",
          message: "Vui lòng điền tên chủ thẻ",
          offset: 0,
        });
        return;
      }
      if (this.cardNum == "") {
        this.$message({
          type: "error",
          message: " Vui lòng điền số thẻ",
          offset: 0,
        });
        return;
      }
      // if(this.cardNum.length<12){
      //   this.$message({
      //     type: "error",
      //     message: "卡号长度不对",
      //     offset: 0
      //   });
      //   return
      // }
      if (this.czMoney == "") {
        this.$message({
          type: "error",
          message: "Vui lòng điền số tiền nạp",
          offset: 0,
        });
        return;
      }
      if (
        parseInt(this.czMoney) < this.czCardInfo.low_money ||
        parseInt(this.czMoney) > this.czCardInfo.high_money
      ) {
        this.$message({
          type: "error",
          message:
            "Tiền nạp(" +
            this.czCardInfo.low_money +
            "~" +
            this.czCardInfo.high_money +
            ")",
          offset: 0,
        });
        return;
      }
      if (this.timeValue == "") {
        this.$message({
          type: "error",
          message: "Vui lòng điền thời gian",
          offset: 0,
        });
        return;
      }
      if (this.user_bank_id == "") {
        this.$message({
          type: "error",
          message: "Vui lòng chọn ngân hàng gửi tiền",
          offset: 0,
        });
        return;
      }
      //this.$vux.loading.show({ text: "提交中..." });
      this.btnLoading = true;
      let d = this.globalPpproach.checkIsEncrypt({
        bank_id: parseInt(this.czCardInfo.bank_id),
          pay_user: this.userName,
          pay_no: this.cardNum,
          pay_amount: this.czMoney,
          user_bank_id: this.user_bank_id, //用户选择入款银行
          random_code: this.sjCode, //随机码
          pay_time: parseInt(
            new Date(this.timeValue).getTime().toString().substr(0, 10)
          ),
        },
      );
      this.$http.post("/api/v2/Recharge/bank_recharge",d).then((res) => {
        if (res && res.data.code == 1) {
          alertComfirm(
            { msg: res.data.msg, conBtText: "Xác nhận " },
            () => {
              this.showParent();
            },
            () => {
              this.showParent();
            }
          );
          this.userName = "";
          this.czMoney = "";
          this.cardNum = "";
          this.timeValue = "";
          this.timeValue2 = "";
          this.user_bank_id = "";
          this.selectSort = "";
          this.getSjm();
        } else {
          alertComfirm({ msg: res.data.msg });
        }
        this.btnLoading = false;
      });
    },
    //复制
    copyLinkCard(className) {
      let _this = this;
      let clipboard = new this.clipboard("." + className);
      clipboard.on("success", function () {
        _this.$message({
          type: "success",
          message: "Sao chép thành công",
          offset: 0,
        });
      });
      clipboard.on("error", function () {
        _this.$message({
          type: "error",
          message: "Sao chép không thành công, vui lòng thử lại sau",
          offset: 0,
        });
      });
    },
    //获取银行卡
    getCard() {
      this.$http.post(this.versionLive2 + "Recharge/bankList/").then((res) => {
        if (res && res.data.code == 1) {
          if (res.data.data.length != 0) {
            this.isShowBank = true;
            this.czCardInfo = res.data.data[0];
            this.allBank = res.data.data;
          } else {
            this.isShowBank = false;
          }
        }
      });
    },

    selectWallet(type) {
      //虚拟币协议类型
      this.virtualCurrId = type;
      console.log(this.virtualCurrId);
    },
    selectWalletSd(type) {
      this.xnProtocl = type;
    },

    refresh: function name(params) {
      this.$router.go(0);
    },
    reset() {
      this.currQuit = -1;
      this.currType = 0;
      this.rechargeData.amount = "";
      this.rechargeData.channels_id = "";
      this.sendLoading = false;
      this.isSdXnb = false;
    },
    shuru() {
      let m = this.value.findIndex(
        (value, index, array) => value == this.rechargeData.amount
      );
      if (m == -1) {
        this.currQuit = -1;
      } else {
        this.currQuit = m + 1;
      }
    },
    async goRecharge() {
      if (this.isKm) {
        //卡密

        if (
          this.rechargeData.kmZH == "" ||
          this.rechargeData.kmZH.length != 18
        ) {
          this.$message({
            message: "请输入18位数账号",
            type: "warning",
          });
        } else if (
          this.rechargeData.kmPass == "" ||
          this.rechargeData.kmPass.length != 6
        ) {
          this.$message({
            message: "请输入6位数密码",
            type: "warning",
          });
        } else {
          let d = this.globalPpproach.checkIsEncrypt({
            code: this.rechargeData.kmZH,
            pass: this.rechargeData.kmPass,
          });
          this.$http.post("/api/v2/Recharge/code_recharge", d).then((res) => {
            // 清空输入框
            this.rechargeData.kmZH = "";
            this.rechargeData.kmPass = "";
            if (res && res.data.code == 1) {
              this.tcBox = true;
              this.cgImg = true;
              this.sbImg = false;
              this.kmTXT = res.data.msg;
            } else if (res && res.data.code == 0) {
              this.tcBox = true;
              this.cgImg = false;
              this.sbImg = true;
              this.kmTXT = res.data.msg;
            }
            setTimeout(() => {
              this.tcBox = false;
            }, 2000);
          });
        }
        return;
      }
      // console.log(this.isXnb);
      if (this.isXnb) {
        if (!this.rechargeData.amount) {
          this.$message({
            message: "Vui lòng nhập số tiền nạp",
            type: "warning",
          });
          return;
        }
        this.rechargeData.user_id = JSON.parse(
          localStorage.getItem("userinfo")
        ).user_id;
      
      //  user_id: this.rechargeData.user_id,
        let d = this.globalPpproach.checkIsEncrypt(
          {
            
            amount: this.rechargeData.amount,
            channels_id: this.rechargeData.channels_id,
            currency_type: this.rechargeData.currency_type,
            protocl: this.virtualCurrId,
          }
        );
        this.$http
          .post("/api/v2/Recharge/index", d)
          .then((res) => {
            if (res && res.data.code == 1) {
              //console.log(res.data.data.form);
              this.virtualRechargeHtml = res.data.data.form;
              return;
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning",
              });
              return;
            }
          });
        return;
      }
      console.log(this.rechargeData);
      //判断金额   方式   临界值
      if (!this.rechargeData.amount) {
        this.$message({
          message: "Vui lòng nhập số tiền nạp",
          type: "warning",
        });
        return;
      }
      if (
        this.rechargeData.amount - 0 < this.currOne.low_money ||
        this.rechargeData.amount - 0 > this.currOne.high_money
      ) {
        this.$message({
          message:
            "Số tiền nạp là" +
            this.currOne.low_money +
            "-" +
            this.currOne.high_money,
          type: "warning",
        });
        return;
      }
      if (!this.rechargeData.channels_id) {
        this.$message({
          message: "Vui lòng chọn phương thức nạp tiền",
          type: "warning",
        });
        return;
      }

      this.rechargeData.user_id = JSON.parse(
        localStorage.getItem("userinfo")
      ).user_id;
      this.sendLoading = true;
      this.btnLoading = true;
      if (this.payType == "rgcz") {
        var a = document.createElement("a");
        a.setAttribute("href", this.currApi);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "startTelMedicine");
        if (document.getElementById("startTelMedicine")) {
          document.body.removeChild(
            document.getElementById("startTelMedicine")
          );
        }
        document.body.appendChild(a);
        a.click();
        this.btnLoading = false;
        this.reset();

        //  parent.location.href=this.currApi;
      } else {
        ///新开个页面再请求 不然浏览器会拦截  或者用  location.href ！！！！
        // window.open('/rechargePage');
        console.log(this.rechargeData)
        // localStorage.setItem(this.rechargeData)
         let d = this.globalPpproach.checkIsEncrypt(this.rechargeData)
        
        let res = await this.$http.post('/api/v2/Recharge/index', d);
        this.btnLoading = false;
        if (res && res.data.code == 1) {
          this.reset();
          if (res.data.data.url) {
           
            // window.open(res.data.data.payurl, "_blank");
            location.href = res.data.data.url;
           
          } else {
            if (res.data.data.type == 2) {
              if (res.data.data.form) {
                this.rechargeHtml = res.data.data.form;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning",
                });
              }
            } else {
              this.$router.push({
                path: "/rechargePage",
                query: { url: res.data.data.url },
              });
              this.showParent();
            }
          }
          // this.$router.push({path:'/rechargePage',query:{url:res.data.data.url}});
          this.sendLoading = false;
          //        setTimeout(()=>{
          //          window.open(res.data.data.url,'在线充值','height=800,width=1000,top=100,left=430');
          //          this.sendLoading = false;
          //        }, 500);
        } else if (res) {
          this.sendLoading = false;
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      }
    },
    closeActive() {
      //console.log(22)
      this.currQuit = -1;
    },
    selectYHK() {
      this.isYHK = true;
      console.log(1);
    },
    selectOne(item, index) {
      console.log(item);
      if (item == "km") {
        console.log(index);
        this.currType = index;
        this.isKm = true;
        this.isYHK = false;
        this.isXnb = false;
        this.isSdXnb = false;
        return;
      }
      if (item.pay_type == "yhkcz") {
        this.currType = index;
        this.isYHK = true;
        this.isKm = false;
        this.isXnb = false;
        this.isSdXnb = false;
        return;
      }
      if (item.pay_type == "usdtcz") {
        this.currType = index;
        this.isXnb = true;
        this.xyList = item;
        this.isKm = false;
        this.isYHK = false;
        this.isSdXnb = false;
        this.rechargeData.currency_type = item.currency_type;
        this.rechargeData.channels_id = item.id;
        this.payType = item.pay_type;
       
        return;
      }
      if (item.pay_type == "vcsdcz") {
        this.isSdXnb = true;
        this.isXnb = false;
        this.isKm = false;
        this.isYHK = false;
        this.currType = index;
        this.xyList = item;
        return;
      }
      if (item.pay_type == "wxcz") {
        console.log(111);
        this.showWechat = true;
        this.currType = index;
        this.isYHK = false;
        this.isKm = false;
        this.isXnb = false;
        this.isSdXnb = false;
        return;
      }
      this.isXnb = false;
      this.isKm = false;
      this.isYHK = false;
      this.isSdXnb = false;
      this.currType = index;
      this.rechargeData.currency_type = item.currency_type;
      this.rechargeData.channels_id = item.id;
      this.currApi = item.apiroute;
      this.currOne = item;
      this.payType = item.pay_type;
    },
    quitMoney(n, m) {
      console.log(m);
      this.rechargeData.amount = n;
      this.currQuit = m;
    },
    getRechargeType() {
      this.typeLoading = true;
      this.$http.get(this.versionLive2 + "Recharge/getList").then((res) => {
        this.typeLoading = false;
        if (res && res.data.code == 1) {
          this.czlist = res.data.data || [];
          let item = this.czlist.find((res) => {
            return res.pay_type == "vcsdcz";
          });
          this.xnProtocl = item.protocol[0];
          //console.log(this.czlist)
        } else {
          this.$message({
            message: res.data.mgs,
            type: "warning",
          });
        }
      });
    },
    showParent() {
      this.isYHK = false;
      this.reset();
      this.$emit("childFn", false);
    },
    getKSList() {
      this.$http.get("/api/v2/Recharge/getcardlist").then((res) => {
        if (res && res.data.code == 1) {
          this.ksList = res.data.data;
          console.log(this.ksList);
        }
      });
    },

    copyLink(className, name, num) {
      this.copyTxt = name.substring(0, name.length - 2);
      this.QQnum = num;
      let _this = this;
      let clipboard = new this.clipboard("." + className);
      clipboard.on("success", function () {
        // _this.$vux.toast.show({
        //     text: "Sao chép thành công",
        //     position: "middle"
        // });
        // _this.$message({
        //     type: "success",
        //     message: "Sao chép thành công",
        //     offset: 0
        // });
        _this.isCopy = true;
        _this.isCZList = false;
      });
      clipboard.on("error", function () {
        // _this.$vux.toast.text('Sao chép không thành công, vui lòng thử lại sau');
        // _this.$message({
        //     type: "error",
        //     message: "Sao chép không thành công, vui lòng thử lại sau",
        //     offset: 0
        // });
      });
    },
    openQQ(num) {
      console.log(this.copyTxt);
      if (this.copyTxt == "QQ") {
        // http://wpa.qq.com/msgrd?v=3&uin=1570915261&site=qq&menu=yes
        //  window.location.href = 'http://wpa.qq.com/msgrd?v=3&uin=1570915261&site='+this.QQnum+'&menu=yes';
        window.open(
          "http://wpa.qq.com/msgrd?v=3&uin=" +
            this.QQnum +
            "&site=" +
            this.QQnum +
            "&menu=yes"
        );
      } else {
        return;
      }
    },
    cyzhOpen() {
      //常用账号弹窗
      this.isKm = false;
      this.isYHK = false;
      this.isCyzh = true;
    },
    Edit() {
      //常用账号编辑按钮
      this.isEdit = false;
      this.isSelect = true;
      this.isDelete = true;
      this.isAddZhBtn = false;
    },
    done() {
      this.isEdit = true;
      this.isSelect = false;
      this.isDelete = false;
      this.isAddZhBtn = true;
    },
    deleteItem(e) {
      //常用账号删除
      // 当前索引
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.id;
      console.log(id);
      console.log(this.currslectId);
      if (index == this.currslectId) {
        this.currslectId = null;
      }
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "Xóa...", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector("#tjzh-content"), //loadin覆盖的dom元素节点
      });
      let d = this.globalPpproach.checkIsEncrypt({ id: id });
      this.$http
        .post(this.versionLive2 + "Recharge/del_commonno", d)
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            //成功回调函数停止加载
            loading.close();
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            //取消本地的
            this.cardList.splice(index, 1);
            if (this.cardList.length == 0) {
              this.isLoading = true; //没有卡了
              this.isAddZhBtn = true;
              localStorage.setItem("currCommonCard", JSON.stringify({}));
            }
          }
        })
        .catch((res) => {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
          //成功回调函数停止加载
          loading.close();
          //this.$vux.loading.close();
        });
    },
    deleteItemUsdt(e) {
      //常用账号删除
      // 当前索引
      let index = e.currentTarget.dataset.index;
      let id = e.currentTarget.dataset.id;
      console.log(index);
      console.log(this.currslectId);
      if (index == this.currslectId) {
        this.currslectId = null;
      }
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "Xóa...", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector("#tjzh-content"), //loadin覆盖的dom元素节点
      });
      // 换接口
      let d = this.globalPpproach.checkIsEncrypt({ id: id });
      this.$http
        .post(this.versionLive2 + "Recharge/del_commonno", d)
        .then((res) => {
          if (res.data.code == 1) {
            //成功回调函数停止加载
            loading.close();
            this.$message({
              message: res.data.msg,
              type: "warning",
            });
            //取消本地的
            this.cardList.splice(index, 1);
            if (this.cardList.length == 0) {
              this.isLoading = true; //没有卡了
              this.isAddZhBtn = true;
              localStorage.setItem("currCommonCard", JSON.stringify({}));
            }
          }
        })
        .catch((res) => {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
          //成功回调函数停止加载
          loading.close();
          //this.$vux.loading.close();
        });
    },
    selectBtn(id, i) {
      //选择图标
      console.log(id, i);
      let ind = this.currDelId.indexOf(id);
      if (ind === -1) {
        this.currDelId.push(id);
        this.selectIndex.push(i);
      } else {
        this.currDelId.splice(ind, 1);
        this.selectIndex.splice(i, 1);
      }
    },
    addZhBtn() {
      this.isKm = false;
      this.isYHK = false;
      this.isCyzh = false;
      this.isTjzh = true;
    },
    async getCommonCard() {
      //获取常用卡号
      //this.$vux.loading.show({text:'Đang nhận...'});
      //    this.msg = this.$message({
      //     duration: 0,
      //     type: 'warning',
      //     message: 'Đang nhận....'
      // })
      // setTimeout(() => {
      //     this.msg.close()
      //     this.msg = this.$message({
      //         duration: 1000,
      //         type: 'success',
      //         message: '获取成功'
      //     })
      //     this.status = true
      // }, 1000)

      let res = await this.$http.get(
        this.versionLive2 + "/Recharge/get_commonno"
      );
      this.isLoading = true;
      if (res && res.data.code == 1) {
        this.cardList = res.data.data;
      } else {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
      }
    },
    useOne(v, i) {
      //使用账号
      this.currslectId = i;
      let obj = this.cardList.find((value, i) => {
        return v.id == value.id;
      });
      if (typeof obj == "object") {
        localStorage.setItem("currCommonCard", JSON.stringify(obj));
        console.log(obj);
        //console.log(obj);
        //this.$router.push('/cardRecharge');
        this.isCyzh = false;

        this.isYHK = true;
        this.userName = obj.name;
        this.cardNum = obj.no;
      } else {
        //this.$vux.toast.text('Đã xảy ra sự cố, vui lòng chọn một thẻ khác', 'middle');
        this.$message({
          message: "Đã xảy ra sự cố, vui lòng chọn một thẻ khác",
          type: "warning",
        });
      }
    },
    useUsdtOne(v, i) {
      //使用账号
      this.currslectId = i;
      let obj = this.cardList.find((value, i) => {
        return v.id == value.id;
      });
      if (typeof obj == "object") {
        localStorage.setItem("currCommonCard", JSON.stringify(obj));
        console.log(obj);
        //console.log(obj);
        //this.$router.push('/cardRecharge');
        this.isCyzh = false;

        this.isYHK = true;
        this.userName = obj.name;
        this.cardNum = obj.no;
      } else {
        //this.$vux.toast.text('Đã xảy ra sự cố, vui lòng chọn một thẻ khác', 'middle');
        this.$message({
          message: "Đã xảy ra sự cố, vui lòng chọn một thẻ khác",
          type: "warning",
        });
      }
    },
    async postCard() {
      //添加账号确认按钮
      //非空
      if (!this.cardData.name) {
        this.$message({
          message: "Vui lòng nhập tên của người gửi tiền",
          type: "warning",
        });
        this.$refs.nameReg.focus();
        return;
      }
      if (!this.cardData.no) {
        this.$message({
          message: "Vui lòng nhập tài khoản người gửi tiền",
          type: "warning",
        });
        this.$refs.noReg.focus();
        return;
      }
      const loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "Đang gửi...", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector("#tjzh-content"), //loadin覆盖的dom元素节点
      });
      let d = this.globalPpproach.checkIsEncrypt({
        name: this.cardData.name,
        no: this.cardData.no,
        remark: this.cardData.remark,
        type: 1,
      });
      let res = await this.$http.post(
        this.versionLive2 + "/Recharge/add_commonno",
        d
      );
      //this.isdisable = true;
      this.$message({
        message: res.data.msg,
        type: "warning",
      });
      if (res && res.data.code == 1) {
        //this.$router.push('/bankCardList');
        //成功回调函数停止加载
        loading.close();
        this.isdisable = false;
        this.isTjzh = false;
        this.isCyzh = true;
        this.getCommonCard();
        /* setTimeout(() => {
                  this.isdisable = false;
                  this.isTjzh = false;
                  this.isCyzh = true;
                  this.getCommonCard();
              }, 1000);*/

        this.cardData = {
          name: "",
          no: "",
          remark: "",
        };
      } else {
        loading.close();
      }
    },
  },
};
</script>

<style scoped lang="less">
.pop-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  .recharge-container {
    position: relative;
    .xnb-code {
      width: 250px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 15px #eee;
      border: 1px solid #eee;
      text-align: center;
      padding: 10px 10px;
      img {
        margin: 20px auto;
      }
      h3 {
        font-size: 16px;
      }
      img {
        width: 167px;
        height: 163px;
      }
      p {
        font-size: 12px;
        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;
        // display: inline-block;
        word-break: break-all;
        width: 100%;
        &.tip {
          color: #ff5251;
        }
        a {
          color: #ff5251;
        }
      }
      .copy-btn {
        font-size: 16px;
        border-radius: 20px;
        border: 1px solid #1486ff;
        height: 30px;
        line-height: 30px;
        text-align: center;
        width: 65%;
        margin: 10px auto;
        cursor: pointer;
        color: #1486ff;
      }
    }
    .order-sending {
      width: 820px;
      height: 700px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    width: 820px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 17px;
    .pop-container-title {
      color: #fff;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      background: url("../assets/imgaes/recharge_title_bg.png") no-repeat;
      background-size: cover;
      .remove-btn {
        position: absolute;
        right: 21px;
        top: 20px;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background: url("../assets/imgaes/remove-btn.png") no-repeat;
      }
    }
    .recharge-content {
      padding: 30px 50px 30px 50px;
      height: 500px;
      overflow-y: auto;
      h4 {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 10px;
        color: #71819d;
      }
      .other-money {
        margin-bottom: 30px;
        font-size: 14px;
        input {
          width: 200px;
          height: 50px;
          line-height: 50px;
          background: #f5f5f5;
          padding: 0 10px;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .quit-money {
        > span {
          display: inline-block;
          width: 140px;
          height: 50px;
          line-height: 50px;
          border-radius: 4px;
          // background: #f5f5f5;
          background: #f6f7fb;
          text-align: center;
          margin: 0 20px 20px 0;
          font-size: 14px;
          cursor: pointer;
          color: #71819d;
          &:hover,
          &.active {
            background: #1486ff;
            color: #fff;
          }
        }
        &.sd-xnb-money {
          width: 420px;
          > span {
            width: 60px;
          }
        }
      }
      > div {
        h3 {
          font-size: 14px;
          padding-left: 28px;
          margin-bottom: 20px;
        }
      }
      .recharge-value {
        h3 {
          vertical-align: middle;
          background: url("../assets/imgaes/money_icon.png") no-repeat left
            center;
          // background-size: contain;
        }
        .km-box {
          .km-tip {
            padding: 5px 0;
            i {
              color: #f73b3b !important;
              cursor: pointer;
            }
          }
          margin-bottom: 40px;
          font-size: 14px;
          .input-box {
            margin-bottom: 15px;
            line-height: 42px;
            span {
            }
            input {
              margin-left: 20px;
              width: 580px;
              height: 42px;
              line-height: 42px;
              border-radius: 4px;
              background: #f5f5f5;
              padding-left: 10px;
              font-size: 14px;
            }
          }
        }
      }
      .recharge-type {
        ul {
          overflow: hidden;
          li {
            padding-top: 5px;
            float: left;
            background: #f5f5f5;
            border-radius: 4px;
            // width: 200px;
            padding: 0 20px;
            height: 50px;
            margin: 0 20px 20px 0;
            position: relative;
            cursor: pointer;
            border: 2px solid #fff;
            overflow: hidden;
            &.active {
              border: 2px solid #1486ff;
              background: #fff;
            }
            &.active:before {
              position: absolute;
              content: "";
              right: -2px;
              bottom: -2px;
              width: 33px;
              height: 25px;
              background: url("../assets/imgaes/select_on.png") no-repeat;
            }
            &:nth-of-type(3n) {
              // margin:0 0 20px 0;
            }
            > div {
              display: inline-block;
              margin-right: 10px;
            }
            .type-msg {
              padding-left: 20px;
              padding-top: 5px;
            }
            img {
              position: absolute;
              left: 10px;
              top: 9px;
              width: 30px;
            }
            .long-text1 {
              padding-left: 30px;
            }
            .long-text2 {
              padding-left: 20px;
              padding-top: 5px;
            }
          }
        }
        h3 {
          background: url("../assets/imgaes/type_icon.png") no-repeat left
            center;
          // background-size: contain;
          font-size: 14px;
        }
        border-bottom: 1px dashed #eee;
        .p {
          color: #666;
          font-size: 14px;
          margin-right: 5px;
          i {
            color: #f73b3b !important;
            cursor: pointer;
          }
        }
      }
    }
    .total-pay-money {
      margin-top: 30px;
      .tip {
        line-height: 42px;
        color: #ff1c30;
        padding-right: 20px;
      }
      p {
        font-size: 14px;
        color: #999;
      }
      .money {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
      .recharge-btn {
        // background: #FF1C30;
        background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
        color: #fff;
        text-align: center;
        height: 42px;
        /*line-height: 42px;*/
        width: 160px;
        font-size: 16px;
        border-radius: 30px;
        cursor: pointer;
      }
    }
    .wechat-box {
      position: absolute;
      left: 21px;
      top: 73px;
      color: #445779;
      font-size: 18px;
      text-align: left;
      .submit {
        width: 216px;
        height: 58px;
        line-height: 58px;
        font-size: 24px;
        color: #fff;
        background: linear-gradient(90deg, #1486ff 0%, #4ba1ff 100%);
        border-radius: 58px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: -70px;
        cursor: pointer;
        padding: 0 !important;
      }
      .fh-btn {
        border: 1px solid #1486ff;
        box-sizing: border-box;
        border-radius: 4px;
        width: 70px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #1486ff;
        position: relative;
        right: -40px;
        top: -15px;
        background: #fff;
        cursor: pointer;
        // text-align: center;
      }
      p {
        color: #445779;
        // font-size: 18px;
        margin-bottom: 16px;
      }
      .wechat-left {
        margin-right: 50px;
        .wechat-tips {
          color: #1486ff;
        }
        .wechat-input {
          // font-size: 18px;
          line-height: 50px;
          margin-bottom: 0px;
          span {
            text-align: left;
            display: inline-block;
            margin-right: 10px;
          }
          input {
            width: 280px;
            height: 50px;
            line-height: 50px;
            border: 0.5px solid #445779;
            border-radius: 4px;
            padding-left: 10px;
          }
        }
      }
      .wechat-right {
        > div {
          width: 246px;
          height: 246px;
          box-shadow: 0px 0px 6.928px rgba(102, 102, 102, 0.2);
          img {
            width: 200px;
            padding-top: 20px;
          }
        }
      }
    }
  }
  .type-loading-tip {
    line-height: 42px;
    color: #ff1c30;
  }
}

.cgBox {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
  .cg-box {
    width: 440px;
    height: 281px;
    text-align: center;
    background-color: #fff;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    margin-top: -25%;
    border-radius: 10px;
    font-size: 18px;
    color: #333;
    .close-icon {
      display: block;
      position: absolute;
      right: 30px;
      top: 30px;
      width: 14px;
      height: 15px;
      background: url("../assets/imgaes/gb_button_6_6.png") no-repeat;
      background-size: contain;
    }
  }
  .kmIMG {
    padding-top: 96px;
    padding-bottom: 20px;
    img {
      width: 52px;
      height: 52px;
    }
  }
  .kmTxt {
    width: 80%;
    margin: 0 auto;
  }
}
.cz-content {
  width: 599px !important;
  padding-bottom: 20px;
  .cz-cont {
    > ul {
      margin-bottom: 20px;
      li {
        height: 100px;
        border-bottom: 1px solid #eeeeee;
        padding: 25px 29px 0 29px;
        .kml-name {
          width: 180px;
          text-align: left;
          span {
            &:nth-child(1) {
              font-size: 18px;
              color: #333;
              font-weight: bold;
              // padding-bottom: 15px;
            }
          }
        }
        .kml-pay {
          width: 360px;
          text-align: center;
          cursor: pointer;
          span {
            width: 33.33%;
          }
          i {
            display: block;
          }
        }
        span {
          display: block;

          img {
            // width: 28px;
            height: 28px;
          }
        }
      }
    }
    > p {
      color: #666;
      font-size: 14px;
      background: url("../assets/imgaes/explain-icon.png") no-repeat;
      background-size: contain;
      padding-left: 27px;
      margin-left: 29px;
      cursor: pointer;
    }
    .jiu {
      font-size: 16px;
      color: #999999;
      margin-top: 15px;
    }
  }
}
.copy-success-box {
  z-index: 1002;
  .p {
    padding-top: 116px;
    padding-bottom: 10px;
  }
  i {
    color: #f73b3b;
    cursor: pointer;
  }
}
.recharge-rule {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1003;
  .is-html {
    background-color: #fff;
    width: 80%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -25%;
    min-width: 200px;
  }
  .recharge-rule-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    h3 {
      font-size: 24px;
      color: #222221;
      text-align: center;
    }
    i {
      cursor: pointer;
      width: 14px;
      height: 15px;
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .rule-content {
      margin-top: 30px;
    }
    p {
      font-size: 18px;
      color: #333;
      line-height: 35px;
    }
  }
}
.yhk-box {
  padding-left: 16px;
  padding-top: 8px;
  position: relative;
  .back-select {
    position: absolute;
    width: 60px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid #f5f5f5;
    right: 10px;
    top: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .submit-bank-btn {
    // position: absolute;
    // bottom: 75px;
    // right: 190px;
    margin: 30px auto;
    width: 185px;
    height: 45px;
    // background: #ff3f30 !important;
    background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%) !important;
    border-radius: 50px;
    color: #fff;
  }
  ul {
    padding: 10px 0;
    li {
      float: left;
      // width: 110px;
      height: 43px;
      color: #999;
      border: 2px solid #999;
      border-radius: 2px;
      font-size: 16px;
      line-height: 43px;
      position: relative;
      padding-left: 30px;
      padding-right: 10px;
      margin-right: 0.4rem;
      border-radius: 0.3rem;
      cursor: pointer;
      &.active {
        color: #5696da;
        border: 2px solid #5696da;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/imgaes/select_bank.png") no-repeat;
          background-size: contain;
          position: absolute;
          top: 50%;
          left: 5px;
          transform: translateY(-50%);
        }
      }
      // i{
      //   display: inline-block;
      //   width: 20px;
      //   height: 20px;
      //   background: url("../assets/imgaes/select_bank.png") no-repeat;
      //   background-size: contain;
      //   position: absolute;
      //   top:50%;
      //   left:5px;
      //   transform: translateY(-50%);
      // }
    }
  }
  .yhk-bt {
    color: #000;
    font-size: 16px;
    padding-bottom: 8px;
    .cyzh-btn {
      // width: 71px;
      height: 23px;
      font-size: 14px;
      color: #ff7a7a;
      border: 1px solid #ff7a7a;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      background: #fff;

      padding: 0 3px;
    }
  }
  .yhk-12 {
    font-size: 12px;
  }

  .yhk-bd {
    /deep/ .el-input__inner {
      background: #f5f5f5 !important;
    }
    .el-select {
      width: 72%;
    }
    .tzDate {
      background: #fff;
      width: 285px !important;
      border: 1px solid #f5f5f5;
      border-radius: 0 !important;

      .el-input__inner {
        width: 285px !important;
        background: #f5f5f5;
      }
    }
    // margin-left: 21px;
    margin-bottom: 10px;
    font-size: 14px;
    display: inline-block;
    width: 50%;
    span {
      display: inline-block;
      &.card-title {
        width: 100px;
        color: #71819d;
        font-weight: 500;
      }
      &.card-content {
        width: 235px;
        color: #555;
        background: #f5f5f5;
        padding: 10px 0 10px 10px;
      }
      &.copy-btn {
        color: #5696da;
        border: 1px solid #1486ff;
        margin-left: 10px;
        font-size: 12px;
        padding: 0 2px;
        cursor: pointer;
        border-radius: 0.2rem;
        &:hover {
          color: #fff;
          background: #5696da;
        }
      }
    }
    input {
      font-size: 14px;
      width: 285px;
      height: 40px;
      line-height: 40px;
      // border: 1px solid #f5f5f5;
      background: #f5f5f5;
      padding: 0 10px;
    }
  }
}
.isyhk {
  padding: 0 !important;
}
#mainIframe {
  width: 100%;
  height: 500px;
}
.cyzh-content {
  .back {
    position: absolute;
    top: 20px;
    left: 32px;
    width: 12px;
    height: 19px;
    background: url("../assets/imgaes/cyzh_back.png") no-repeat center;
  }
  .remove-btn {
    position: absolute;
    right: 21px;
    top: 20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url("../assets/imgaes/remove-btn.png") no-repeat center !important;
  }
  .cyzh-cont {
    height: 581px;
    padding: 10px 0 40px 30px;
    ul.card-list {
      //min-height: 500px;
      max-height: 500px;
      overflow-y: auto;
      padding-top: 55px;
      position: relative;
      .cyzh-edit,
      .cyzh-delete {
        width: 100px;
        height: 35px;
        font-weight: bold;
        font-size: 18px;
        color: #1486ff;
        border: 1px solid #1486ff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background: #fff;
        position: absolute;
        right: 30px;
        top: 6px;
      }
      > li {
        width: 760px;
        height: 85px;
        font-size: 14px;
        color: #333;
        padding: 20px 20px 20px 0px;
        background: #f5f5f5;
        margin-bottom: 10px;
        position: relative;
        .selet-icon {
          display: block;
          width: 20px;
          height: 20px;
          background: url("../assets/imgaes/cyzh_1.png") no-repeat center;
          position: absolute;
          top: 34px;
          left: 10px;
          &.active {
            background: url("../assets/imgaes/cyzh_2.png") no-repeat center;
          }
        }
        .name {
          width: 400px;
          padding-left: 40px;
          > span {
            display: block;
            &:first-of-type {
              line-height: 15px;
              padding-bottom: 20px;
            }
          }
        }
        .bank-name {
          padding-top: 10px;
        }
        .sy-btn {
          width: 98px;
          height: 40px;
          color: #fff;
          background: #bcc3cf;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          &.active {
            background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
          }
        }
        .del {
          width: 20px;
          height: 20px;
          background: url("../assets/imgaes/cyzh_del.png") no-repeat center;
          position: absolute;
          right: -10px;
          top: -10px;
        }
      }
    }
    .add-btn {
      width: 111px;
      height: 46px;
      font-size: 18px;
      color: #fff;
      // background: url("../assets/imgaes/add_button.png") no-repeat center;
      background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
      margin-right: 30px;
      position: absolute;
      right: 0;
      bottom: 30px;
      border-radius: 30px;
    }
  }
}
.tjzh-content {
  .back {
    position: absolute;
    top: 20px;
    left: 32px;
    width: 12px;
    height: 19px;
    background: url("../assets/imgaes/cyzh_back.png") no-repeat center;
  }
  .remove-btn {
    position: absolute;
    right: 21px;
    top: 20px;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url("../assets/imgaes/remove-btn.png") no-repeat center !important;
  }
  .tjzh-cont {
    height: 580px;
    padding: 0px 30px 40px 160px;
    .h-box {
      height: 504px;
      overflow-y: auto;
      padding-top: 80px;
      .p-title {
        font-weight: bold;
        font-size: 18px;
        color: #333;
        padding-bottom: 18px;
      }
      .yhk-bd {
        padding-bottom: 10px;
        .card-title {
          width: 175px;
          font-size: 18px;
          line-height: 40px;
          color: #333;
          float: left;
        }
        input {
          width: 378px;
          height: 40px;
          font-size: 16px;
          background: #f5f5f5;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          padding: 0 9px;
        }
      }
    }
    .confirm-btn {
      width: 111px;
      height: 46px;
      font-size: 18px;
      color: #fff;
      border-radius: 30px;
      background: linear-gradient(0deg, #1486ff -79700%, #4ba1ff -73900%);
    }
  }
}
.xnb-address-container {
  .card-title {
    width: 100% !important;
    float: none !important;
  }
  .cyzh-cont {
    height: 581px;
    padding: 10px 0 40px 30px;
    ul.card-list {
      //min-height: 500px;
      max-height: 500px;
      overflow-y: auto;
      padding-top: 55px;
      position: relative;
      .cyzh-edit,
      .cyzh-delete {
        // width: 69px;
        padding: 0 5px;
        height: 35px;
        font-weight: bold;
        font-size: 18px;
        color: #1486ff;
        border: 1px solid #1486ff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        background: #fff;
        position: absolute;
        right: 30px;
        top: 6px;
      }
      > li {
        width: 760px;
        height: 85px;
        font-size: 14px;
        color: #333;
        padding: 20px 20px 20px 0px;
        // background: #F5F5F5;
        box-shadow: 0px 0px 15px #eee;
        border-radius: 8px;
        border: 1px solid #eee;
        margin-bottom: 10px;
        position: relative;
        .name {
          background: url("../assets/imgaes/usdt_icon.png") no-repeat 20px 10px;
          padding-left: 70px !important;
          background-size: 6%;
        }
        .selet-icon {
          display: block;
          width: 20px;
          height: 20px;
          background: url("../assets/imgaes/cyzh_1.png") no-repeat center;
          position: absolute;
          top: 34px;
          left: 10px;
          &.active {
            background: url("../assets/imgaes/cyzh_2.png") no-repeat center;
          }
        }
        .name {
          width: 400px;
          padding-left: 40px;
          > span {
            display: block;
            &:first-of-type {
              line-height: 15px;
              padding-bottom: 20px;
            }
          }
        }
        .bank-name {
          padding-top: 10px;
        }
        .sy-btn {
          width: 40px;
          height: 40px;
          color: #fff;
          background: url("../assets/imgaes/noSelect-icon.png") no-repeat center;
          cursor: pointer;
          &.active {
            background: url("../assets/imgaes/select_btn.png") no-repeat center;
          }
        }
        .del {
          width: 20px;
          height: 20px;
          background: url("../assets/imgaes/cyzh_del.png") no-repeat center;
          position: absolute;
          right: -10px;
          top: -10px;
        }
      }
    }
    .add-btn {
      width: 111px;
      height: 46px;
      font-size: 18px;
      color: #fff;
      background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
      margin-right: 30px;
      position: absolute;
      right: 0;
      bottom: 30px;
      border-radius: 30px;
    }
  }
}
/*  moo*/
.moo-pay {
  > div {
    position: absolute;
    width: 250px;
    height: 200px;
    text-align: center;
    left: 50%;
    top: 50%;
    line-height: 50px;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  position: fixed;
  z-index: 1011;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.xnb-xy {
  overflow: hidden;
  .virtual-xy {
    overflow: hidden;
    span {
      float: left;
      width: 80px;
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      color: #71819d;
      text-align: center;
      // background: url('../assets/imgaes/member/weixuan.png');
      background: #f6f7fb;
      margin-bottom: 10px;
      margin-right: 10px;
      cursor: pointer;
      border-radius: 20px;
      &.active {
        // background: url('../assets/imgaes/member/xuanzhong.png');
        border: 1px solid #1486ff;
        color: #1486ff;
        background: #fff;
      }
    }
  }
}
.xnb-sd {
  overflow: hidden;
  .input-xnb-box {
    overflow: hidden;
    .xnb-box {
      // float: left;
      position: relative;
      border-bottom: 1px solid #eee;
      //  width: 200px;
      width: 330px;
      margin-right: 20px;
      margin-bottom: 15px;
      float: left;
      i {
        position: absolute;
        right: 0;
        color: #ff5251;
        cursor: pointer;
        &.cy-address {
          color: #4ba1f9;
        }
      }

      &.xnb-time {
        width: 690px;
      }
      p {
        font-weight: 500;
        color: #71819d;
        font-size: 14px;
        padding-bottom: 15px;
      }
      input {
        padding-bottom: 10px;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.recharge-box .tips {
  width: 100%;
  font-size: 14px;
  color: #71819d;
  padding: 10px 0;
  p {
    line-height: 35px;
    display: inline;
  }
  .recharge-btn {
    border-radius: 20px;
    width: 45%;
    color: #fff;
    background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
  }
}
.recharge-box .sdXnb-tips {
  width: 90%;
}
.wechatBtn {
  border-radius: 100px !important;
}
</style>
