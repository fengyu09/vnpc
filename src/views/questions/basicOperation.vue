<template>
    <div class="basicOperation">
        <!-- 越南 -->
        <div v-if="$store.state.lanCode==1" class="vn-conent">
          <p class="title">
             Làm thế nào để đăng ký
        </p>
        Xin chào, chỉ mất 10 giây để mở tài khoản là bạn đã có thể có tài khoản K188. <br>
        [Đăng nhập / Đăng ký] → [Vui lòng nhập tài khoản người dùng] → [Nhập mật khẩu] → [Vui lòng xác nhận mật khẩu] → [Mã mời (không điền nếu không có)] → [Vui lòng nhập mã xác minh] → [Hoàn tất] → Bạn có thể trực tiếp đăng nhập thành công và nạp tiền vào game.<br>
        Nhắc nhở: Mật khẩu phải là sự kết hợp của 6-12 chữ cái + số, vui lòng không sử dụng các tổ hợp mật khẩu đơn giản để tránh mất tài khoản.<br>
         <p class="title">
            Làm thế nào để nạp tiền
        </p>
        Máy tính: Bên trái hình đại diện của thành viên → Nạp tiền → Chọn phương thức nạp tiền yêu thích của bạn, Sau khi thanh toán thành công, tiền của bạn sẽ vào tài khoản K188 của bạn;<br>

 APP: Sau khi mở APP, nhấp vào Tôi →  Ví để chọn phương thức gửi tiền yêu thích của bạn. Sau khi thanh toán thành công, tiền của bạn sẽ có trong tài khoản K188 của bạn.<br>
        <p class="title">
            Cách đặt cược
        </p>
       Sau khi nạp tiền, số tiền nạp vào ví trung tâm của bạn, bạn cần chuyển số tiền đó vào ví trò chơi trước khi đặt cược, ví dụ bạn muốn đặt cược vào AG Baccarat thì chỉ cần chuyển tiền từ ví trung tâm đến ví AG.

Bạn cũng có thể trực tiếp bật chuyển tự động mà không cần chuyển thủ công.
  <p class="title">
            Cách rút tiền
        </p>
       Vui lòng chọn [Ví] → Chọn [Thẻ ngân hàng] hoặc [USDT] → [Nhập số tiền rút] → [Nhập mật khẩu thanh toán] để thực hiện lệnh rút tiền. Sau khi lệnh rút tiền được thực hiện thành công, bộ phận tài vụ sẽ xử lý trong vòng 1-3 phút. Nếu quá 30 phút mà quý khách không nhận được tiền,vui lòng liên hệ bộ phận chăm sóc khách hàng kịp thời giải quyết. 
  <p class="title">
            Cách chuyển đổi ví
        </p>
        Máy tính: Nhấp vào trên cùng phía bên phải [Ảnh đại diện thành viên] → [Chuyển đổi ví] để chọn ví bạn muốn chuyển ra và ví bạn muốn chuyển vào.  Sau đó nhập số tiền chuyển để chuyển thành công.<br>

APP: Chọn [Của tôi] → [Chuyển đổi Ví] để chọn ví bạn muốn chuyển ra và ví bạn muốn chuyển vào.  Sau đó nhập số tiền chuyển để chuyển thành công.<br>

Bật [Chuyển khoản tự động] khi vào trò chơi, số tiền sẽ được tự động chuyển đổi<br>
  <p class="title">
            Cách chuyển tiền tự động
        </p>
        Chọn [Chuyển đổi ví] → [Tự động chuyển] để bật chuyển đổi hạn mức tự động. Sau khi bật chế độ chuyển tiền tự động, bạn có thể đặt cược trực tiếp mà không cần chuyển tiền sau khi nạp tiền. Khi rút tiền, bạn chỉ cần nhấp vào thu hồi toàn bộ. Hãy thử xem nhé.
  <p class="title">
            Cách thu hồi toàn bộ với một cú nhấp chuột
        </p>

       Thu hồi toàn bộ có nghĩa là bạn nhấp vào từ khóa thu hồi toàn bộ và sau đó tất cả tiền trong ví nhà cái của bạn sẽ được trả lại ví trung tâm.<br>

 Máy tính: Chọn [Tài khoản thành viên] → [Chuyển đổi ví] → [Thu hồi toàn bộ]<br>

App: Chọn【Của tôi】  → 【Chuyển đổi số tiền】 → 【Thu hồi toàn bộ】<br>

Nhắc nhở: Điều cần được nhắc nhở ở đây là nếu đã nhận được khuyến mãi của nhà cái và chưa hoàn thành quy trình được chỉ định thì không thể thu hồi toàn bộ. <br>
        </div>
        <!-- 英文 -->
        <div v-if="$store.state.lanCode==2||$store.state.lanCode==5" class="vn-conent">
          <p class="title">
             How to register
        </p>
       Hello, it only takes 10 seconds to open an account and you can have a k188 sports account. <br>
        【Login/Register】→【Please enter your mobile phone number】→【Please confirm the password】→【Invitation code (if you don’t have it, you can leave it out)】→【Complete】→You can deposit the game directly after successful login.

Tips: The password must be a combination of 6-12 letters + numbers. Do not use a simple password combination to avoid account loss.

<br>
         <p class="title">
            How to deposit
        </p>
        Computer: On the left side of the member account avatar → Deposit → Select your preferred deposit method, after the payment is successful, your money will be in your k188 sports account;
 <br>

 APP: After opening the APP, click My→Wallet to select your preferred deposit method. After the payment is successful, your money will be in your k188 sports account.
<br>
        <p class="title">
            How to bet
        </p>
      After depositing, your deposit amount will be in your central wallet. Before betting, you need to transfer the amount to the game wallet. For example, if you want to bet on AG baccarat, you can directly transfer the money from the central wallet to the AG wallet. . You can also directly enable automatic transfer without manual transfer.

  <p class="title">
            How to withdraw money
        </p>
      Please click [Wallet] → select [Bank Card] or [USDT] → [Enter Withdrawal Amount] → [Enter Payment Password] to initiate a withdrawal order. After the withdrawal order is successfully initiated, the finance department will process it within 1-3 minutes. Success, if you have not received the payment within 30 minutes, please contact customer service in time for processing

  <p class="title">
          How to Wallet Conversion
        </p>
        Computer: Click [Member Avatar] → [Wallet Conversion] on the upper right to select the wallet you want to transfer from and the wallet to which you want to transfer. Then enter the transfer amount and the transfer is successful.
<br>

APP: Click [My] → [Wallet Conversion] to select the wallet you want to transfer from and the wallet to which you want to transfer. Then enter the transfer amount and the transfer is successful.
<br>

Turn on [Auto Transfer] to automatically transfer the amount when entering the game<br>
  <p class="title">
            How to transfer money automatically
        </p>
        Click [Wallet Conversion] → [Auto Transfer] to turn on the automatic quota conversion. After the transfer-free mode is turned on, you can directly bet without transferring money after depositing. When you withdraw money after making a profit, you only need to click to recover it. Give it a try.

  <p class="title">
            How to recycle with one click
        </p>

       One-click recycling means that you click on this one-click recycling, then all the money in your venue wallet will be returned to the central wallet.
<br>

 Computer: Click [Member Account] → [Wallet Conversion] → [One-click Recovery]<br>

APP: Click [My] → [Quota Conversion] → [One-click Recycling]<br>

Reminder: What needs to be reminded here is that if the venue has received the discount and has not completed the designated flow, it cannot be recycled with one click. <br>
        </div>
    </div>
</template>
<script>
export default {
  name: 'basicOperation',
}
</script>

<style scoped lang="less">
.basicOperation{
  padding: 45px 40px;
   font-size: 14px;
    color: #71819d;
    line-height: 34px;
    span{
      color: #1486ff;
    }
  .title{
    font-size: 16px;
    color: #1486ff;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  .title:first-child{
      padding-top: 0px;
  }
  .con{
    font-size: 14px;
    color: #71819d;
    line-height: 34px;
    span{
      color: #1486ff;
    }
  }
  .pic{
      overflow: hidden;
      padding-top: 10px;
      img{
          width: 780px;
      }
  }
}
</style>