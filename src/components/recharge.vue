<template>
  <div id="recharge">
    <!--充值弹窗-->
    <div class="recharge-box pop-container"  v-if="show">
      <div class="recharge-container">
        <div class="pop-container-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]">{{$t('recharge.text[0]')}}<i class="remove-btn" @click="showParent"></i></div>

        <div class="recharge-content" :class="isYHK == true ?'isyhk':''" ref="rechargeScroll">
          <!-- 充值方式 -->
          <div class="recharge-type" v-if="!isYHK">
              <div class="clearfix" v-if="lanCode!=2">
                  <h3 class="fl">{{$t('recharge.text[1]')}} <span style="color:red;margin-left: 212px">(1VNDK = 1000VND)</span></h3>
                  <!-- 跳转到手动虚拟币说明页面 -->
                  <!-- <div class="p fr" v-if="isXnb||isSdXnb"><router-link tag="a" target="_blank"   style="font-size: 14px;color:#F73B3B" to="/Introduction">Hiểu về tiền ảo</router-link></div> -->
              </div>
            <p class="type-loading-tip" v-if="typeLoading">loading...</p>
            <div class="recharge-type" v-if="$st.state.czTypeArr.length">
              <!-- 充值方式 银行卡 扫码  虚拟币 -->
              <ul class="type-items" v-if="lanCode!=2" :class="[{'qd-items-pink':skin==1},{'qd-items-blue':skin==2},{'qd-items-green':skin==3}]">
                <li :class="[{'active':currType==key},{'active-pink':currType==key&&skin==1},{'active-blue':currType==key&&skin==2},{'active-green':currType==key&&skin==3},]" @click="currType=key;" v-for="(item,key) in czlist" :key="key" v-if="key!='undefined'">
                  <img :src=" require('../assets/imgaes/cz_0' +  key +'.png')" alt=""/>
                  <p>{{key | filterRechargeName}}</p>
                </li>
              
                <li @click="toMomo()" >
                  <img src="../assets/imgaes/unnamed 1.png" alt=""/>
                  <p>MO MO QR</p>
                </li>
              </ul>
              <!-- 充值渠道 -->
              <ul class="qd-items" v-if="currType!=2&&lanCode!=2" :class="[{'qdd-items-pink':skin==1},{'qdd-items-blue':skin==2},{'qdd-items-green':skin==3}]">
                <li v-for="item,index in czlist[currType]" :key="index" :class="[{'active':currqd==item.id},{'pink-bg':currqd==item.id&&skin==1},{'blue-bg':currqd==item.id&&skin==2},{'green-bg':currqd==item.id&&skin==3}]" @click="changeQd(item)">
                <!-- <li v-for="item,index in czlist[currType]" :key="index" :class="currqd==item.id?'active':''" @click="changeQd(item)"> -->
                  <span>{{item.channels_type}}</span>
                  <!-- <p>{{item.low_money}} ~ {{item.high_money}} ({{item.currency_type}})</p> -->
                </li>
              </ul>
              <!-- 手动虚拟币渠道 -->
              <ul class="qd-items" :class="[{'qdd-items-pink':skin==1},{'qdd-items-blue':skin==2},{'qdd-items-green':skin==3}]" v-else>
                <li  v-for="(item,index) in codeList" :class="{active:xnProtocl == item.protocol}" @click="selectWalletSd(item.protocol)" :key='index'>
                  <span>{{item.protocol}}</span>
                </li>
              </ul>
              
            </div>
          </div>
           
          <!-- 手动虚拟币 现在用这个 -->  
          <!-- 66w只需要虚拟币充值 -->
          
          <div class="xnb-xy xnb-sd" v-show="(isSdXnb&&xnProtocl==v.protocol)" v-for="(v,index) in codeList" :key="index">
              <div class="input-xnb-box fl">
                <div class="xnb-box" >
                  <span class="usdt-address">{{v.address}}</span>
                  <i class="copy-fk-address copy-btn dw" @click="copyLinkCard('copy-fk-address')" data-clipboard-action="copy" :data-clipboard-text="v.address"></i>
                </div>
                <div class="xnb-box">
                  <input type="text" :placeholder="$t('recharge.xnb.pla[0]')" v-model="czDz">
                  <i @click="showAdd(1)" v-if="!czAdrArr.length">{{$t('recharge.xnb.text[0]')}}</i>
                  <i @click="showAdd(2)"  v-if="czAdrArr.length" class="cy-address">{{$t('recharge.xnb.text[1]')}}</i>
                </div>
                <div class="xnb-box">
                  <input type="text" :placeholder="$t('recharge.xnb.pla[1]')" v-model="hkID">
                </div>
                <div class="xnb-box xnb-time">
                  <!-- <p>Thời gian chuyển tiền</p> -->
                  <el-date-picker
                      class="tzDate bankDate"
                      v-model="hkTime"
                      type="datetime"
                      @change="getStartTimeXnb"
                      :placeholder="$t('recharge.xnb.pla[2]')">
                  </el-date-picker>
                </div>
                <div class="xnb-box">
                  <input type="text" maxlength="6" @input="shuru" v-model="rechargeData.amount" :placeholder="$t('recharge.xnb.pla[3]')"> 
                  <i class="dw">USDT</i>
                </div>
                <div class="clearfix">
                <span>{{$t('recharge.xnb.text[2]')}} ：1USDT≈ <i class="redcolor">{{currTypeItem.cz_exchange_rate}}</i> {{$t('moneyDw')}}</span>
                <p>{{$t('recharge.xnb.text[3]')}} :<i class="bluecolor">{{(rechargeData.amount*currTypeItem.cz_exchange_rate).toFixed(2) || 0}}</i> {{$t('moneyDw')}}</p></div>
                <p class="redcolor">{{$t('recharge.xnb.text[4]')}}</p>
              </div>
              <!-- 手动虚拟币二维码-->
               <div class="fr">
                  <div class="xnb-code">
                    <p>1USDT = <i class="redcolor">{{currTypeItem.cz_exchange_rate}}</i> {{$t('moneyDw')}}</p>
                    <div>
                        <img v-lazy="v.code_image" alt="">
                    </div>
                  </div>
                  <el-button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="custom-btn recharge-btn"  @click="onConfirm" :loading="isUsdtLoading">{{$t('recharge.xnb.text[5]')}}</el-button>
               </div>
          </div>


          <!-- 充值金额 -->
          <div class="recharge-value" v-if="!isYHK&& !isSdXnb&&!isXnb&&$st.state.czTypeArr.length&&currqd>0" >
            <h3>{{$t('recharge.text[2]')}}
              <div class="p fr">
                <router-link  tag="a" target="_blank" style="font-weight: normal; font-size: 14px;color:#4BA1F9" to="/Tutorials">{{$t('recharge.text[4]')}}</router-link>
              </div>
            </h3>
            <!-- 快速金额 -->
            <div class="quit-money" :class="isSdXnb?'sd-xnb-money':''" v-for="(v,index) in czlist[currType]" :key="index"  v-show="currqd==v.id">
              <span  v-for="(money,index1) in v.quick_list" :key="index1" :class="[{'ks-pink':skin==1},{'ks-blue':skin==2},{'ks-green':skin==3}]" @click="quitMoney(money,money)"><i v-if="v.currency_type=='VNDK'">{{$t('moneyDwSx')}}</i><i v-if="v.currency_type=='USDT'">usdt</i>{{money}}</span>
            </div>
            <!-- 输入金额 -->
            <div class="other-money">
              <input type="text" :class="isInputError?'error-box':''" maxlength="6" @input="shuru" v-model="rechargeData.amount" :placeholder="$t('recharge.sfyhk.pla[0]')+ currTypeItem.low_money+' ~ '+currTypeItem.high_money">
              <p class="default-tip tip" :class="isInputError?'error-tip':''" v-if="(rechargeData.amount-0)>0">{{$t('recharge.sfyhk.pla[0]')}} {{currTypeItem.low_money}} ~ {{currTypeItem.high_money}} ({{currTypeItem.currency_type}})</p>
             
            </div>
            
            <!-- 选择银行编码 -->
            <div class="bank-code-select" v-if="isBankCode">
               <el-select @change="pickerConfirm" v-model="bankCodeselectSort" filterable clearable placeholder="Chọn ngân hàng">
                  <el-option
                          v-for="item in optionsBankCode"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                  ></el-option>
                </el-select>
            </div>


          </div>


         
        
         
              <!-- 银行卡充值 -->
              <!-- -->
          <div class="yhk-box"  v-show="isYHK">
            <!-- <div class="back-select" @click="isYHK=false;currType=0">Quay lại</div> -->
            <div class="back-select" @click="isYHK=false;"> {{$t('recharge.sdyhk.text[4]')}}</div>
            <p class="yhk-bt">1. {{$t('recharge.sdyhk.text[0]')}}</p>
            <p class="yhk-12" style="margin-left: 18px;"> {{$t('recharge.sdyhk.text[3]')}}:</p>
            <ul class="clearfix" style="margin-left: 18px;" v-if="ismomo">
               <li v-for="item,index in allBank" :key="index" @click="czCardInfo=item" :class="czCardInfo.id==item.id?'active':''"><i></i>
                <!-- <span v-if="item.bank_id!=6">{{item.bank}}</span> -->
                <img src="../assets/imgaes/momo_icon.png" alt="" srcset="" style="margin-top: -8px;">
              </li>
            </ul>
            <ul class="clearfix" style="margin-left: 18px;" v-else>
               <li v-for="item,index in allBank" :key="index" @click="czCardInfo=item" :class="czCardInfo.bank_id==item.bank_id?'active':''"><i></i>
                <span >{{item.bank}}</span>
                <!-- <img v-else src="../assets/imgaes/momo_icon.png" alt="" srcset="" style="margin-top: -8px;"> -->
              </li>
            </ul>
            <p style="color:#FF703A;font-size: 16px;margin-left: 18px;">{{czCardInfo.rate}}</p>
            <p style="color:#FF703A;font-size: 16px;margin-left: 18px;"> {{$t('recharge.sdyhk.text[2]')}}：{{czCardInfo.low_money}}~{{czCardInfo.high_money}}</p>
            <p class="yhk-bt" style="margin-top:10px;">2.  {{$t('recharge.sdyhk.text[5]')}}:</p>
           <div v-if="ismomo">
            <div  v-for="item,index1 in allBank" :key="index1" v-show="item.id==czCardInfo.id" style="position: relative;">
               <div class="yhk-bd" >
                
                <div class="bank-qrcode" v-if="item.qrcode">
                  <p style="line-height: 32px;color: #ff7a7a;">Quét mã chuyển khoản nhanh chóng</p>
                    <img :src="item.qrcode" alt="" srcset="" style="width: 182px;" >
                    <!-- <img src="../assets/imgaes/home/download-code.png" alt="" srcset="" style="width: 182px;" v-else> -->
                    
                </div>
              </div>
            </div>
           </div>
           <div v-else>
            <div  v-for="item,index1 in allBank" :key="index1" v-show="item.bank_id==czCardInfo.bank_id" style="position: relative;">
               <div class="yhk-bd" >
                <span class="card-title">{{$t('recharge.sdyhk.inputTitle[0]')}}:</span>
                <br>
                <span class="card-content" >{{item.no}}</span>
                <span class="copy-btn copy-no" @click="copyLinkCard('copy-no')" data-clipboard-action="copy" :data-clipboard-text="item.no">{{$t('copyText')}}</span>
                <div class="bank-qrcode" v-if="item.qrcode">
                  <p style="line-height: 32px;color: #ff7a7a;">Quét mã chuyển khoản nhanh chóng</p>
                    <img :src="item.qrcode" alt="" srcset="" style="width: 182px;" >
                    <!-- <img src="../assets/imgaes/home/download-code.png" alt="" srcset="" style="width: 182px;" v-else> -->
                    
                </div>
              </div>
            </div>
           </div>

            <div class="yhk-bd" v-if="!ismomo">
              <span class="card-title">{{$t('recharge.sdyhk.inputTitle[1]')}}:</span>
              <br>
              <span class="card-content">{{czCardInfo.name}}</span>
              <span class="copy-btn copy-name" @click="copyLinkCard('copy-name')" data-clipboard-action="copy" :data-clipboard-text="czCardInfo.name">{{$t('copyText')}}</span>
            </div>
            <br>
            <div class="yhk-bd" >
              <span class="card-title" v-if="ismomo">{{$t('recharge.sdyhk.inputTitle[9]')}}:</span>
              <span class="card-title" v-else>{{$t('recharge.sdyhk.inputTitle[2]')}}:</span>
              <br>
              <span class="card-content">{{ismomo?czCardInfo.account:czCardInfo.bank}}</span>
              <span class="copy-btn copy-bank" @click="copyLinkCard('copy-bank')" data-clipboard-action="copy" :data-clipboard-text="ismomo?czCardInfo.account:czCardInfo.bank">{{$t('copyText')}}</span>
            </div>
            <p class="yhk-bt" :style="{'margin-top':ismomo?'108px':0}">3.  {{$t('recharge.sdyhk.text[6]')}}: <button class="cyzh-btn" @click="cyzhOpen"> {{$t('recharge.sdyhk.text[7]')}}</button></p>

              <div class="yhk-bd " >
              <span class="card-title">{{$t('recharge.sdyhk.inputTitle[3]')}}:</span>
              <br>
              <!-- <input v-model="userName" type="text" :placeholder="$t('recharge.sdyhk.cyk.add.pla[0]')" maxlength="20"> -->
                      <el-autocomplete
              class="inline-input"
              v-model="userName"
              suffix-icon="el-icon-arrow-down"
              :fetch-suggestions="querySearch"
              :placeholder="$t('recharge.sdyhk.cyk.add.pla[0]')"
                style="width:285px"
            ></el-autocomplete>
            <p style="visibility: hidden;"> CC</p>
            </div>
             <div class="yhk-bd">
              <span class="card-title">{{$t('recharge.sdyhk.inputTitle[4]')}}:</span>
              <br>
              <input v-model="czMoney" type="text" :placeholder="$t('recharge.warnText[1]')+' K VND '">
              <P>Thực tế trong tài khoản: {{ czMoney*1 }} = {{ czMoney*1000 }}VND</P>
            </div>
            <div class="yhk-bd ">
              <span class="card-title">{{$t('recharge.sdyhk.inputTitle[5]')}}:</span>
              <br>
              <!-- <input v-model="cardNum" type="text" :placeholder="$t('recharge.sdyhk.pla[2]')" maxlength="50" > -->
              <el-autocomplete
              class="inline-input"
              v-model="cardNum"
              suffix-icon="el-icon-arrow-down"
              :fetch-suggestions="querySearch2"
              :placeholder="$t('recharge.sdyhk.pla[2]')" 
            
                style="width:285px"
            ></el-autocomplete>
            </div>
           
            <div class="yhk-bd">
              <span class="card-title">{{$t('recharge.sdyhk.inputTitle[6]')}}:</span>
              <br>
              <el-date-picker
                      class="tzDate bankDate"
                      v-model="timeValue"
                      type="datetime"
                      @change="getStartTime"
                     :placeholder="$t('recharge.sdyhk.pla[3]')">
              </el-date-picker>
            </div>
            
             <div class="yhk-bd" v-if="!ismomo">
                <span class="card-title">{{$t('recharge.sdyhk.inputTitle[7]')}}:</span>
                <br>
                <!-- <span class="card-content"></span> -->
                <el-select @change="platformChanged" v-model="selectSort" filterable clearable :placeholder="$t('recharge.sdyhk.pla[4]')" >
                  <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                  ></el-option>
                </el-select>
              </div>

               <div class="yhk-bd">
                <span class="card-title">{{$t('recharge.sdyhk.inputTitle[8]')}}:</span>
                <br>
                <span class="card-content">{{sjCode}}</span>
                <span class="copy-btn copy-sjm" @click="copyLinkCard('copy-sjm')" data-clipboard-action="copy" :data-clipboard-text="sjCode">{{$t('copyText')}}</span>
              </div>

            <div>
              <el-button class="submit-bank-btn" style="display:block" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  @click="yhRecharge" :loading="btnLoading"> {{$t('recharge.sdyhk.text[8]')}}</el-button>
            </div>
          
          </div>
        

          <div class="total-pay-money clearfix"  v-if="!isYHK&&!isSdXnb&&!showWechat&&lanCode!=2" >
            <el-button class="custom-btn recharge-btn fr" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"  @click="goRecharge" :loading="btnLoading">{{$t('recharge.text[3]')}}</el-button>
          </div>
         
        </div>
        <div class="order-sending" v-if="sendLoading"></div>
      </div>
    </div>

     
    <!--银行卡常用账号-->
    <div v-if="isCyzh" class="cyzh-content pop-container">
      <div class="recharge-container">
        <div class="pop-container-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"><i class="back"  @click="isCyzh=false;isYHK=true;isDelete=false;isEdit=true; isAddZhBtn=true"></i> {{$t('recharge.sdyhk.cyk.text[0]')}} <i class="remove-btn" @click="isCyzh=false;isYHK=true;isDelete=false;isEdit=true; isAddZhBtn=true"></i></div>
        <div class="cyzh-cont">
            <p  v-if="!cardList.length&&isLoading"  style="height: 494px; font-size: 18px;color: #999; padding: 180px 0 0 300px">{{$t('recharge.xnb.cydz.text[2]')}}！</p>
            <ul class="card-list" v-if="cardList.length">
              <p >
                <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="cyzh-edit" v-if="isEdit"  @click="Edit">{{$t('recharge.sdyhk.cyk.text[1]')}}</button>
                <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="cyzh-edit" v-if="!isEdit" @click="done">{{$t('recharge.sdyhk.cyk.text[2]')}}</button>
                <!--<button class="cyzh-delete" v-if="!isEdit" @click="done">Xóa</button>-->
              </p>
              <li v-for="(v,i) in cardList" :key="i">
                <div class="fl name">
                  <span>{{$t('recharge.sdyhk.cyk.text[3]')}}: {{v.name}}</span>
                  <span>{{$t('recharge.sdyhk.cyk.text[4]')}}:{{v.no}}</span>
                </div>
                <div class="bank-name fl">{{v.remark}}</div>
                <button class="sy-btn fr" :class="currslectId == i?'active':''"  @click="useOne(v,i)">{{$t('recharge.sdyhk.cyk.text[5]')}}</button>
                <span class="del" v-if="isDelete" :data-index="i" :data-id="v.id" @click="deleteItem"></span>
              </li>
            </ul>
          <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="add-btn fr" v-if="isLoading==true && isAddZhBtn == true" @click="addZhBtn">{{$t('recharge.sdyhk.cyk.text[6]')}}</button>
        </div>
      </div>
    </div>
    <!--添加银行卡账号-->
    <div id="tjzh-content" v-if="isTjzh" class="tjzh-content pop-container">
      <div class="recharge-container">
        <div class="pop-container-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"><i class="back"  @click="isTjzh=false;isCyzh=true"></i> {{$t('recharge.sdyhk.cyk.add.text[0]')}} <i class="remove-btn" @click="isTjzh=false;isCyzh=true"></i></div>
        <div class="tjzh-cont">
          <div class="h-box">
            <p class="p-title">{{$t('recharge.sdyhk.cyk.add.text[0]')}}：</p>
            <div class="yhk-bd">
              <span class="card-title">{{$t('recharge.sdyhk.cyk.text[3]')}}：</span>
              <input type="text" :placeholder="$t('recharge.sdyhk.cyk.add.pla[0]')" v-model="cardData.name" ref="nameReg" maxlength="20">
            </div>
            <div class="yhk-bd">
              <span class="card-title">{{$t('recharge.sdyhk.cyk.add.text[2]')}}：</span>
              <input type="text" maxlength="50" ref="noReg" onkeyup="value=value.replace(/[\u4e00-\u9fa5]/g,'')" :placeholder="$t('recharge.sdyhk.cyk.add.pla[2]')" v-model="cardData.no">
            </div>
            <div class="yhk-bd">
              <span class="card-title">{{$t('recharge.sdyhk.cyk.add.text[3]')}}：</span>
              <input type="text" :placeholder="$t('recharge.sdyhk.cyk.add.pla[1]')" v-model="cardData.remark" maxlength="8">
            </div>
          </div>
          <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="confirm-btn fr"  :disabled="isdisable" @click="postCard">{{$t('recharge.sdyhk.cyk.add.text[4]')}}</button>
        </div>
      </div>
    </div>

    <!--添加手动虚拟币账号-->
    <div id="tjzh-content" v-if="showXnbAdress" class="tjzh-content pop-container xnb-address-container">
      <div class="recharge-container">
        <div class="pop-container-title" :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]"><i class="back"  @click="showXnbAdress=false;"></i> {{isUsdtList?$t('recharge.xnb.cydz.text[0]'):$t('recharge.xnb.cydz.text[1]')}} <i class="remove-btn" @click="showXnbAdress=false;"></i></div>
        <!-- 添加 -->
        <div class="tjzh-cont" v-if="isAddUsdtAdr">
          <div class="h-box">
            <div class="yhk-bd">
              <p class="card-title">{{$t('recharge.xnb.cydz.add.text[0]')}}:</p>
              <!-- <input type="text" placeholder="请输入代币地址" v-model="!czAdrArr.length&&czDz?czDz:xnbAdress.address" ref="nameReg"> -->
              <input type="text" :placeholder="$t('recharge.xnb.cydz.add.pla[0]')" v-model="xnbAdress.address" ref="nameReg">
            </div>
            <div class="yhk-bd">
              <p class="card-title">{{$t('recharge.xnb.cydz.add.text[1]')}}：</p>
              <input type="text" :placeholder="$t('recharge.xnb.cydz.add.pla[1]')" v-model="xnbAdress.remark" maxlength="5">
            </div>
          </div>
          <!-- <button class="confirm-btn fr"  :disabled="isdisable" @click="addOneAdr" isUsdtLoading></button> -->
          <el-button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="confirm-btnfr"  @click="addOneAdr" :loading="isUsdtLoading" style="background:linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);color:#fff">{{$t('recharge.xnb.cydz.add.text[2]')}}</el-button>
        </div>
        <!-- 手动常用虚拟币列表 -->
        <div class="cyzh-cont" v-if="isUsdtList">
            <p  v-if="!czAdrArr.length&&isLoading"  style="height: 494px; font-size: 18px;color: #999; padding: 180px 0 0 300px">{{$t('recharge.xnb.cydz.text[2]')}}！</p>
            <ul class="card-list" v-if="czAdrArr.length">
              <p >
                <button class="cyzh-edit" :class="[{'pink-color-border':skin==1},{'blue-color-border':skin==2},{'green-color-border':skin==3}]" v-if="isEdit"  @click="Edit">{{$t('recharge.sdyhk.cyk.text[1]')}}</button>
                <button class="cyzh-edit" :class="[{'pink-color-border':skin==1},{'blue-color-border':skin==2},{'green-color-border':skin==3}]" v-if="!isEdit" @click="done">{{$t('recharge.xnb.cydz.text[4]')}}</button>
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
          <button :class="[{'pink-bg':skin==1},{'blue-bg':skin==2},{'green-bg':skin==3}]" class="add-btn fr" v-if="(isLoading==true && isAddZhBtn == true)||!czAdrArr.length" @click="isAddUsdtAdr=true;isUsdtList=false">{{$t('recharge.xnb.cydz.text[5]')}}</button>
        </div>
      </div>
    </div>



<!-- moo支付-->
    <div class="moo-pay" v-if="rechargeHtml">
      <div v-html="rechargeHtml" v-if="rechargeHtml"></div>
    </div>

    <!-- 虚拟支付 -->
    <div class="virtual-recharge" v-if="virtualRechargeHtml">
       <div v-html="virtualRechargeHtml" v-if="virtualRechargeHtml"></div>
    </div>


    

  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
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
      // currType: 0,
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
      // tcBox: false, //弹窗
      ksList: [], //卡商列表
      // isCZList: false,
      // isCopy: false,
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
      currType:0,//充值类型
      currqd:-1,//充值渠道
      currTypeItem:{},//当前选中的充值数据
      bankCodeselectSort:'',
      optionsBankCode:[],//充值银行编码
      isBankCode:false,
      isInputError:false,
      ismomo:false
    };
  },
  filters:{
    filterRechargeName(n){
      // recharge_method  充值方式：0银行卡，1扫码，2虚拟币
      let name = n;
      if(n==0){
        name="Nạp thẻ ngân hàng";
      }else if(n==1){
        name="Quét mã để nạp tiền";
      }else if(n==2){
        name=" Nạp tiền ảo";
      }
      else if(n==3){
        name="YhPay Momo";
      }
      return name
    },
  },
  computed: {
    ...mapState(["skin","lanCode","oftenName","oftenCard"]),
  },
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

        if (
        this.rechargeData.amount - 0 < this.currTypeItem.low_money ||
        this.rechargeData.amount - 0 > this.currTypeItem.high_money
      ) {
        
        this.isInputError = true;
      }else{
        this.isInputError = false;
      }
    },
    currType: function (n, o) {
      this.rechargeData.amount = "";
      this.currQuit = -1;
        this.bankCodeselectSort = "";
        this.rechargeData.user_bank_id = "";
        this.isBankCode = false;
        this.currqd = -1;
        this.czMoney = '';
        this.isYHK = false;
        this.isSdXnb = false;
        this.isInputError = false;
        if(this.currType==2){
          this.isSdXnb = true;
          this.isYHK = false;
          this.currTypeItem = this.czlist[this.currType][0];
          // console.log(this.currTypeItem )
          // this.currqd=item.id;
        }
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
    if(this.lanCode==2){
      this.isSdXnb = true;
      // 
      this.xnProtocl = "TRC20";
    }else{
      this.isSdXnb = false
    }
    if (this.$store.state.userinfo.user_id > 0) {
      this.getCodeList();
      this.getRechargeType();
      this.getKSList();
      this.getCommonCard();
      this.getUsdtAdressList();
      this.getUserCardList();
      this.getSjm();
      //this.getWechatCode();
    }
  },
  methods: {
    ...mapMutations(["SETOFTENNAME","SETOFTENCARD"]),
    toMomo(){
    
    this.ismomo=true
     this.isYHK=true;
     this.getCard();
    },
    querySearch(queryString, cb) {
      let arr=[]
      for (let i = 0; i < this.oftenName.length; i++) {
        arr.push({
                label: this.oftenName[i],
                value: this.oftenName[i]
                })
            }
        cb(arr);
      },
      querySearch2(queryString, cb) {
      let arr=[]
      for (let i = 0; i < this.oftenCard.length; i++) {
        arr.push({
                label: this.oftenCard[i],
                value: this.oftenCard[i]
                })
            }
        cb(arr);
      },
    pickerConfirm(item){
      // console.log(item)
      this.rechargeData.user_bank_id = item;
    },
    platformChanged: function (i) {
      this.user_bank_id = i;
    },
    changeQd(item){
      console.log(item)
      this.isInputError = false;
      if(item.pay_type=="yhkcz"){
        this.ismomo=false
        this.isYHK = true;
        this.isSdXnb = false;
        this.getCard()
      }else if(item.pay_type=="vcsdcz"){
        this.isSdXnb = true;
        this.isYHK = false;
        this.currqd=item.id;
      }else{
        this.isYHK = false;
        this.isSdXnb = false;
        this.currqd=item.id;
        this.currTypeItem = item;
        this.rechargeData.channels_id = item.id;//
        this.rechargeData.user_bank_id = "";//
        this.bankCodeselectSort = "";
        this.czMoney = '';
         this.rechargeData.amount = "";//
        if(this.currTypeItem.bank_code==null||this.currTypeItem.bank_code=='null'||this.currTypeItem.bank_code==''){
          this.isBankCode = false;
        }else{
          this.isBankCode = true;
          this.getBankCode(this.currTypeItem.bank_code.split(','))
        }
       setTimeout(() => {
          this.$refs.rechargeScroll.scrollTop= this.$refs.rechargeScroll.scrollHeight
       }, 200);
      }
    },
    //获取用户卡列表
    async getBankCode(bank){
        let tdata = [];
        for (let i = 0; i < bank.length; i++) {
            tdata.push({
            label:bank[i],
            value:bank[i]
            })
        }
        this.optionsBankCode = tdata;
    },

   
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
            message: this.$t('recharge.xnb.warnText[0]'),
            offset: 0,
          });
        } else if (!this.hkID) {
          this.$message({
            type: "error",
            message: this.$t('recharge.xnb.warnText[1]'),
            offset: 0,
          });
        } else if (!this.hkTime) {
          this.$message({
            type: "error",
            message: this.$t('recharge.xnb.warnText[2]'),
            offset: 0,
          });
        } else if (!this.rechargeData.amount) {
          this.$message({
            type: "error",
            message: this.$t('recharge.xnb.warnText[3]'),
            offset: 0,
          });
        } else if (
          this.rechargeData.amount < parseInt(this.currTypeItem.low_money) ||
          this.rechargeData.amount > parseInt(this.currTypeItem.high_money)
        ) {
          this.$message({
            type: "error",
            message:
              this.$t('recharge.xnb.warnText[4]')+"(" +
              this.currTypeItem.low_money +
              "~" +
              this.currTypeItem.high_money +
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
        this.isAddZhBtn = true;
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
          message: this.$t('recharge.xnb.cydz.add.warnText[0]'),
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
          message: this.$t('recharge.sdyhk.warnText[1]'),
          offset: 0,
        });
        return;
      }
      if (this.cardNum == "") {
        this.$message({
          type: "error",
          message: this.$t('recharge.sdyhk.warnText[3]'),
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
          message: this.$t('recharge.sdyhk.warnText[4]'),
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
            this.$t('recharge.text[2]')+"(" +
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
          message: this.$t('recharge.sdyhk.warnText[5]'),
          offset: 0,
        });
        return;
      }
      if (this.user_bank_id == "") {
        if(this.ismomo){

        }else{
          this.$message({
          type: "error",
          message: this.$t('recharge.sdyhk.warnText[6]'),
          offset: 0,
        });
        return;
        }
       
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
      if(this.ismomo){
                d=this.globalPpproach.checkIsEncrypt({
                id: parseInt(this.czCardInfo.id),//用户选择的收款银行
                pay_user: this.userName,
                pay_no: this.cardNum,
                pay_amount: this.czMoney,
                random_code: this.sjCode,//随机码
                // user_bank_id: this.user_bank_id,//用户选择入款银行
                pay_time: parseInt(
            new Date(this.timeValue).getTime().toString().substr(0, 10)
          ),
            });
            }
      let czUrl=''
      if(this.ismomo){
          czUrl='Recharge/offline_third_recharge/'
      }else{
          czUrl='Recharge/bank_recharge/'
      }
      this.$http.post(this.versionLive2 + czUrl,d).then((res) => {
        let nameIdx= this.oftenName.findIndex((r,id)=>{
                return r==this.userName
             })
             let cardIdx= this.oftenCard.findIndex((r,id)=>{
                return r==this.cardNum
             })
             if(nameIdx>-1){
                this.oftenName.splice(nameIdx,1)
             }
             if(cardIdx>-1){
                this.oftenCard.splice(cardIdx,1)
            }
             this.oftenName.unshift(this.userName)
             this.oftenCard.unshift(this.cardNum)
            this.SETOFTENNAME(this.oftenName)
            this.SETOFTENCARD(this.oftenCard)
            // this.formatOften()
        if (res && res.data.code == 1) {
          alertComfirm(
            { msg: res.data.msg, conBtText: this.$t('qdText') },
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
          message: _this.$t('copySuccess'),
          offset: 0,
        });
      });
      clipboard.on("error", function () {
        _this.$message({
          type: "error",
          message: _this.$t('cypyError'),
          offset: 0,
        });
      });
    },
    //获取银行卡
    getCard() {
      let czUrl=''
      if(this.ismomo){
          czUrl='Recharge/thridAccoutList'
          
      }else{
          czUrl='Recharge/bankList/'
      }
      this.$http.post(this.versionLive2 +czUrl).then((res) => {
        if (res && res.data.code == 1) {
          if (res.data.data.length != 0) {
            this.isShowBank = true;
            this.czCardInfo = res.data.data[0];
            this.allBank = res.data.data;
          } else {
            this.isShowBank = false;
          }
        }else{
           this.$message({
            message:res.data.data.msg ,
            type: "warning",
          });
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
      this.rechargeData.user_bank_id = "";
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
      if (this.isXnb) {
        if (!this.rechargeData.amount) {
          this.$message({
            message: this.$t('recharge.warnText[1]'),
            type: "warning",
          });
          return;
        }
        this.rechargeData.user_id = JSON.parse(
          localStorage.getItem("userinfo")
        ).user_id;
      
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
      //判断金额   方式   临界值 银行卡编码
      if(this.currqd<1){
        this.$message({
          message: this.$t('recharge.warnText[0]'),
          type: "warning",
        });
        return
      }
      if (!this.rechargeData.amount) {
        this.$message({
          message: this.$t('recharge.warnText[1]'),
          type: "warning",
        });
        return;
      }
       if(this.currTypeItem.bank_code&&!this.rechargeData.user_bank_id){    
         this.$message({
          message: this.$t('recharge.sdyhk.warnText[6]'),
          type: "warning",
        });
        return
      }
     this.rechargeData.bank_code = this.rechargeData.user_bank_id;
      if (
        this.rechargeData.amount - 0 < this.currTypeItem.low_money ||
        this.rechargeData.amount - 0 > this.currTypeItem.high_money
      ) {
        this.$message({
          message:
            "Số tiền nạp là " +
            this.currTypeItem.low_money +
            "-" +
            this.currTypeItem.high_money,
          type: "warning",
        });
        this.isInputError = true;
        return;
      }
      if (!this.rechargeData.channels_id) {
        this.$message({
          message: this.$t('recharge.warnText[3]'),
          type: "warning",
        });
        return;
      }
      if (this.payType == "rgcz") {
        
      } else {
        ///新开个页面再请求 不然浏览器会拦截  或者用  location.href ！！！！
        window.open('/rechargePage?amount='+this.rechargeData.amount+'&channels_id='+this.currTypeItem.id+'&bank_code='+this.rechargeData.user_bank_id+'&currency_type='+this.currTypeItem.currency_type)
        
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
  
    quitMoney(n, m) {
      this.rechargeData.amount = n;
      this.currQuit = m;
    },
    getRechargeType() {
      if(this.$st.state.czTypeArr.length){
        this.czlist = this.do_data(this.$st.state.czTypeArr)
      }else{
        this.typeLoading = true;
      }
      this.$http.get(this.versionLive2 + "Recharge/getList").then((res) => {
        this.typeLoading = false;
        if (res && res.data.code == 1) {
          if(this.lanCode==2){
             let item = res.data.data.find((res) => {
              return res.pay_type == "vcsdcz";
           });
            this.currTypeItem = item;
          }
          this.czlist = this.do_data(res.data.data)
          this.$store.commit("SETCZTYPE", res.data.data);
          // this.czlist = res.data.data || [];
         
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

    // copyLink(className, name, num) {
    //   this.copyTxt = name.substring(0, name.length - 2);
    //   this.QQnum = num;
    //   let _this = this;
    //   let clipboard = new this.clipboard("." + className);
    //   clipboard.on("success", function () {
       
    //     _this.isCopy = true;
    //     _this.isCZList = false;
    //   });
    //   clipboard.on("error", function () {
      
    //   });
    // },
    // openQQ(num) {
    //   console.log(this.copyTxt);
    //   if (this.copyTxt == "QQ") {
    //     window.open(
    //       "http://wpa.qq.com/msgrd?v=3&uin=" +
    //         this.QQnum +
    //         "&site=" +
    //         this.QQnum +
    //         "&menu=yes"
    //     );
    //   } else {
    //     return;
    //   }
    // },
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
    do_data(data) {
        let items= {};
        if (data) {
            items = data;
        } else return;
        let item = {};
        for (let k in items) {
            let v = items[k];
            if (!item[v.recharge_method]) item[v.recharge_method] = [];
            item[v.recharge_method].push(v);
        }
        return item;
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
        this.isCyzh = false;
        this.isYHK = true;
        this.userName = obj.name;
        this.cardNum = obj.no;
      } else {
        this.$message({
          message: this.$t('recharge.sdyhk.warnText[0]'),
          type: "warning",
        });
      }
    },

    async postCard() {
      //添加账号确认按钮
      //非空
      if (!this.cardData.name) {
        this.$message({
          message: this.$t('recharge.sdyhk.cyk.add.pla[0]'),
          type: "warning",
        });
        this.$refs.nameReg.focus();
        return;
      }
      if (!this.cardData.no) {
        this.$message({
          message: this.$t('recharge.sdyhk.cyk.add.warnText[1]'),
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
    overflow: hidden;
    position: relative;
    .xnb-code {
      width: 250px;
      // background: #fff;
      // border-radius: 10px;
      // box-shadow: 0px 0px 15px #eee;
      // border: 1px solid #eee;
      // text-align: center;
      padding: 10px 10px;
      img {
        margin: 20px auto;
      }
      h3 {
        font-size: 16px;
      }
      img {
        width: 210px;
        height: 210px;
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
      background: #439CFF;
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
          width: 400px;
          height: 50px;
          line-height: 50px;
          // background: #f5f5f5;
          padding: 0 10px;
          border-radius: 4px;
          font-size: 14px;
          margin-right: 5px;
          border: 1px solid #eee;
          &.error-box{
            border: 1px solid #F94D4D;
          }
        }
        .tip{
          padding-top: 5px;
          // padding-left: 5px;
          color: #555;
        }
        .error-tip{
          color: #F94D4D;

        }

      }
      .quit-money {
        > span {
          display: inline-block;
          width: 140px;
          height: 38px;
          line-height: 38px;
          border-radius: 4px;
          // background: #f5f5f5;
          // background: #f6f7fb;
          text-align: center;
          margin: 0 20px 20px 0;
          font-size: 14px;
          cursor: pointer;
          color: #333;
          border: 1px solid #eee;
          &:hover,
          &.active {
            background: #1486ff;
            color: #fff;
          }
          &.ks-pink{
            &:hover,
            &.active {
              background: #FB7772;
              color: #fff;
            }
          }
          &.ks-green{
            &:hover,
            &.active {
              background: #09B584;
              color: #fff;
            }
          }
          &.ks-blue{
            &:hover,
            &.active {
              background: #00B4D8;
              color: #fff;
            }
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
          border: none;
         // padding-left: 28px;
          // margin-bottom: 20px;
          padding-bottom:0 ;
          padding-top:0 ;
        }
      }
      .recharge-value {
        h3 {
          vertical-align: middle;
          // background: url("../assets/imgaes/money_icon.png") no-repeat left
          //   center;
          // background-size: contain;
          padding: 20px 0;
          color: #555;
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
        .type-items,.qd-items{
          li{
            border: 1px solid #eee;
            border-radius: 6px;
            text-align: center;
            display: inline-block;
            cursor: pointer;
            overflow: hidden;
            margin-bottom: 20px;
            margin-right: 20px;
            img{
              height: 30px;
              margin: 15px auto;
            }
            p{
              border-top: 1px solid #eee;
              padding: 5px 15px;
            }
            //  &.active-blue,&.active-pink,&.active-green
            &.active,
            &:hover
            {
              border: 1px solid #439CFF;
              position: relative;
              p{
                background: #439CFF;
                color: #fff;
              }
              &::before{
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                width: 22px;
                height: 17px;
                background: url(../assets/imgaes/typeSelect.png) no-repeat;
                background-size: contain;
              }
            }
            // &.active-blue{
            //   border-color:#00B4D8 !important;
            //   p{
            //     background:#00B4D8 !important;
            //   }
            // }
            // &.active-pink{
            //   border-color:#FB7772 !important;
            //   p{
            //     background:#FB7772 !important;
            //   }
            // }
            // &.active-green{
            //   border-color:#09B584 !important;
            //   p{
            //     background:#09B584 !important;
            //   }
            // }
          }
          border-bottom: 1px solid #E2E9EF;
          padding: 20px 0 0 0;
        }
        .qd-items{
          border-bottom: none;
          li{
            padding: 10px 20px;
            &.active,
            &:hover
            {
              background: #439CFF;
              color: #fff;
              &::before{
                width: 0px;
              }
            }
            p{
              border-top: none;
              padding:0;
              color: #999;
            }
          }
        }
        .qd-items-blue{
          li{
              &.active,
              &:hover{
              border-color:#00B4D8 !important;
                p{
                  background:#00B4D8 !important;
                }
            }
          }
        }
        .qd-items-pink{
          li{
              &.active,
              &:hover{
              border-color:#FB7772 !important;
                p{
                  background:#FB7772 !important;
                }
            }
          }
        }
        .qd-items-green{
          li{
              &.active,
              &:hover{
              border-color:#09B584 !important;
                p{
                  background:#09B584 !important;
                }
            }
          }
        }
        .qdd-items-pink{
          li{
            border-color: #FB7772 !important;
            &.active,&:hover{
             background:#FB7772 !important; 
            }
          }
        }
        .qdd-items-green{
          li{
            &.active,&:hover{
             background:#09B584 !important; 
            }
          }
        }
        .qdd-items-blue{
          li{
            &.active,&:hover{
             background:#00B4D8 !important; 
            }
          }
        }
        // ul {
        //   overflow: hidden;
        //   li {
        //     padding-top: 5px;
        //     float: left;
        //     background: #f5f5f5;
        //     border-radius: 4px;
        //     padding: 0 20px;
        //     height: 50px;
        //     margin: 0 20px 20px 0;
        //     position: relative;
        //     cursor: pointer;
        //     border: 2px solid #fff;
        //     overflow: hidden;
        //     &.active {
        //       border: 2px solid #1486ff;
        //       background: #fff;
        //     }
        //     &.active:before {
        //       position: absolute;
        //       content: "";
        //       right: -2px;
        //       bottom: -2px;
        //       width: 33px;
        //       height: 25px;
        //       background: url("../assets/imgaes/select_on.png") no-repeat;
        //     }
        //     &:nth-of-type(3n) {
        //     }
        //     > div {
        //       display: inline-block;
        //       margin-right: 10px;
        //     }
        //     .type-msg {
        //       padding-left: 20px;
        //       padding-top: 5px;
        //     }
        //     img {
        //       position: absolute;
        //       left: 10px;
        //       top: 9px;
        //       width: 30px;
        //     }
        //     .long-text1 {
        //       padding-left: 30px;
        //     }
        //     .long-text2 {
        //       padding-left: 20px;
        //       padding-top: 5px;
        //     }
        //   }
        // }
        h3 {
          // background: url("../assets/imgaes/type_icon.png") no-repeat left
          //   center;
          // background-size: contain;
          font-size: 14px;
          color: #555;
        }
        // border-bottom: 1px dashed #eee;
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
        min-width: 160px;
        // width: 160px;
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
    background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%) ;
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
      border: none;
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
   
    .bank-qrcode{
          position: absolute;
          top: -20px;
          right: 88px;
          text-align: center;
    }
    span {
      display: inline-block;
      &.card-title {
        // width: 100px;
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
        width: 120px;
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
      font-size: 14px;
      color: #333;
      text-align: center;
      background: #fff;
      margin-bottom: 10px;
      margin-right: 10px;
      border: 1px solid #eee;
      cursor: pointer;
      border-radius: 4px;
      &.active {
        // background: url('../assets/imgaes/member/xuanzhong.png');
        border: 1px solid #1486ff;
        color: #fff;
        background: #439CFF;
      }
    }
  }
  .recharge-btn {
    background: linear-gradient(0deg, #1486ff 0%, #4ba1ff 100%);
    color: #fff;
    text-align: center;
    height: 42px;
    width: 180px;
    font-size: 16px;
    border-radius: 30px;
    margin:0 auto;
    cursor: pointer;
  }
}
.xnb-sd {
  overflow: hidden;
  .input-xnb-box {
    overflow: hidden;
    width: 410px;
    .xnb-box {
      position: relative;
      border: 1px solid #eee;
      width: 403px;
      margin-bottom: 15px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      .usdt-address{
        padding-left: 10px;
        color: #333;
      }
      .dw{
        position: absolute;
        right: 10px;
        cursor: pointer;
        top: 0px;
        color: #333;
        font-weight: bold;
      }
      .copy-fk-address{
        background: url(../assets/imgaes/copy-icon.png) no-repeat;
        background-size: contain;
         width: 25px;
        height: 25px;
        
        top: 5px;
      }
      input{
        width: 100%;
        padding:0 10px;
      }
      i {
        position: absolute;
        right: 0;
        color: #ff5251;
        cursor: pointer;
        &.cy-address {
          color: #4ba1f9;
          padding-right: 10px;
        }
      }

      &.xnb-time {
        // width: 690px;
      }
      p {
        font-weight: 500;
        color: #71819d;
        font-size: 14px;
        padding-bottom: 15px;
      }
      input {
        // padding-bottom: 10px;
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
.bank-code-select{
  .el-select{
    width: 400px;
  }
}
</style>
