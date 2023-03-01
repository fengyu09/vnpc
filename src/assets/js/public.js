import Vue from "vue";

/**
 * 清除所有的active
 * @param allA 数组
 */
export const removeAllactive = (allA) => {
  for (let i = 0, len = allA.length; i < len; i++) {
    allA[i].classList.remove("active");
  }
};
/**
 * 选择所有的兄弟元素
 * @param elm 当前元素
 * @returns {Array} 返回一个数组
 */
export const getSiblings = (elm) => {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) a.push(p[i]);
  }
  return a;
};
/**
 * 冻结弹窗
 */

export const alertServe = () => {
  Vue.prototype.$msgbox
    .alert(
      '<div style="padding:5px 0">Tài khoản của bạn đã bị đóng băng,<p style="font-weight:normal!important;font-size:14px;color: #999;margin-top: 5px;">若要进行提现兑换等操作，请联系客服</p></div>',
      {
        confirmButtonText: "联系客服",
        center: true,
        dangerouslyUseHTMLString: true,
        roundButton: true,
      }
    )
    .then(() => {
      window.open(localStorage.getItem("customer"));
    })
    .catch((action) => {});
};


/**
 * 只有一个按钮的弹窗
 * confirmFn 点击确认按钮的方法 可不传
 * cancelFn  点击叉的方法 可不传
 * showCancelButton 取消按钮 默认不显示 可不传
 * conBtText  确认按钮文本 可不传
 * cancelButtonText 取消按钮文本 可不传
 * roundButton 按钮是否圆角 默认圆角
 * msg 提示内容
 */
export const alertComfirm = (obj, confirmFn, cancelFn) => {
  obj = obj || {};
  confirmFn = confirmFn || function() {};
  cancelFn = cancelFn || function() {};
  obj.showClose = obj.showClose || true;
  obj.showCancelButton = obj.showCancelButton || false;
  obj.roundButton = obj.roundButton || false
  let msg = obj.msg || "Nội dung nhắc nhở";
  let skinclass = "";//皮肤
  if (Vue.prototype.$st.state.skin == 1) {
    skinclass = "pink-bth-color";
  } else if (Vue.prototype.$st.state.skin == 2) {
    skinclass = "blue-bth-color";
  } else if (Vue.prototype.$st.state.skin == 3) {
    skinclass = "green-bth-color";
  }
  Vue.prototype.$msgbox
    .alert('<div style="padding:20px 0">' + msg + "</div>", {
      title:obj.title,
      // confirmButtonText: obj.conBtText || "Xác nhận",
      customClass: skinclass,
      confirmButtonText:obj.conBtText,
      cancelButtonText:obj.cancelButtonText,
      center: true,
      dangerouslyUseHTMLString: true,
      roundButton: obj.roundButton,
      title: obj.title,
      showClose: obj.showClose, // 是否显示右上角关闭按钮
      showCancelButton:obj.showCancelButton
    })
    .then(() => {
      confirmFn();
    })
    .catch((action) => {
      cancelFn();
    });
};

/**
 * 账户异常
 */

export const alertyc = (confirmFn) => {
  confirmFn = confirmFn || function() {};
  Vue.prototype.$msgbox
    .alert(
      '<div style="padding:5px 0"> Nếu muốn tiến hành thao tác mời liên hệ với bộ phận Chăm sóc khách hàng,<p style="font-weight:normal!important;font-size:14px;color: #999;margin-top: 5px;">Tài khoản bất thường</p></div>',
      {
        confirmButtonText: "联系客服",
        center: true,
        dangerouslyUseHTMLString: true,
        roundButton: true,
      }
    )
    .then(() => {
      window.open(localStorage.getItem("customer"));
      confirmFn();
    })
    .catch((action) => {});
};

export const fun_date = (num) => {
  let date1 = new Date();
  //今天时间
  let time1 =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  let date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  let m =
    date2.getMonth() + 1 >= 10
      ? date2.getMonth() + 1
      : "0" + (date2.getMonth() + 1);
  let d = date2.getDate() >= 10 ? date2.getDate() : "0" + date2.getDate();
  let time2 = date2.getFullYear() + "-" + m + "-" + d;
  return time2;
};

export const getRank = (arr, num) => {
  var r = [];
  return (
    (function f(t, a, n) {
      if (0 == n) return r.push(t.join(","));
      for (var i = 0, l = a.length; i <= l - n; i++)
        f(t.concat(a[i]), a.slice(i + 1), n - 1);
    })([], arr, num),
    r
  );
};
