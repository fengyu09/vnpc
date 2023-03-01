// 用户用户token
let codeToken = ''
try {
    if (localStorage.getItem('codeToken')) {
        codeToken = localStorage.getItem('codeToken')
    }
} catch (e) {
}

// 用户用户余额
let balance = ''
try {
  if (localStorage.getItem('balance')) {
    balance = localStorage.getItem('balance')
  }
} catch (e) {
}

let all_vendor_bl = [];
//三方平台余额
let vendor_bl = ''
try {
  if (localStorage.getItem('vendor_bl')) {
    vendor_bl = localStorage.getItem('vendor_bl')
  }
} catch (e) {
}
// 用户用户钻石
let diamond = ''
try {
  if (localStorage.getItem('diamond')) {
    diamond = localStorage.getItem('diamond')
  }
} catch (e) {
}

//用户id
let UserId  = ''
try {
    if (localStorage.getItem('UserId')) {
        UserId = localStorage.getItem('UserId')
    }
} catch (e) {
}


// 用户名
let username = ''
try {
    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username')
    }else{
    }
} catch (e) {
}

//safePwd
let safePwd = ''
try {
  if (localStorage.getItem('safePwd')) {
    safePwd = localStorage.getItem('safePwd')
  }else{
  }
} catch (e) {
}

//路由信息
let routerArr = [];
try{
    if(localStorage.getItem('routerArr')){
        routerArr = localStorage.getItem('routerArr')
    }else{

    }
} catch(e){

}

//路由索引
let routerIndex = 0;
try{
    if(localStorage.getItem('routerIndex')){
        routerArr = localStorage.getItem('routerIndex')
    }else{

    }
} catch(e){

}

// 用户头像
let avatar = ''
try {
  if (localStorage.getItem('avatar')) {
    avatar = localStorage.getItem('avatar')
  }else{
  }
} catch (e) {
}

//用户信息
let userinfo = {};
try {
    if (localStorage.getItem('userinfo')) {
        userinfo = JSON.parse(localStorage.getItem('userinfo'));
    } else {
        userinfo = {};
    }
} catch (e) {
}

//最近下注
let zjRecord = {}
try {
    if (localStorage.getItem('zjRecord')) {
        zjRecord = JSON.parse(localStorage.getItem('zjRecord'));
    } else {
        zjRecord = {};
    }
} catch (e) {
}

//热门直播
let host = [];
try {
    if (localStorage.getItem('host')) {
        host = JSON.parse(localStorage.getItem('host'));
    } else {
        host = [];
    }
} catch (e) {
}


//专家直播
let hotexperts = [];
try {
    if (localStorage.getItem('hotexperts')) {
        hotexperts = JSON.parse(localStorage.getItem('hotexperts'));
    } else {
        hotexperts = [];
    }
} catch (e) {
}

//专家红利
let proRed = [];
try {
    if (localStorage.getItem('proRed')) {
        proRed = JSON.parse(localStorage.getItem('proRed'));
    } else {
        proRed = [];
    }
} catch (e) {
}

//直播预告
let preview = [];
try {
    if (localStorage.getItem('preview')) {
        preview = JSON.parse(localStorage.getItem('preview'));
    } else {
        preview = [];
    }
} catch (e) {
}

//banners
let banners = [];
try {
    if (localStorage.getItem('banners')) {
        banners = JSON.parse(localStorage.getItem('banners'));
    } else {
        banners = [];
    }
} catch (e) {
}

//banners
let notices = [];
try {
    if (localStorage.getItem('notices')) {
        notices = JSON.parse(localStorage.getItem('notices'));
    } else {
        notices = [];
    }
} catch (e) {
}
// games
let games = [];
try {
    if (localStorage.getItem('games')) {
        games = JSON.parse(localStorage.getItem('games'));
    } else {
        games = [];
    }
} catch (e) {
}
//ad
let ad = [];
try {
    if (localStorage.getItem('ad')) {
        ad = JSON.parse(localStorage.getItem('ad'));
    } else {
        ad = [];
    }
} catch (e) {
}

let rootbox = {
  open: false
}


let userType = '';
try {
  if (localStorage.getItem('userType')) {
    userType = JSON.parse(localStorage.getItem('userType'));
  } else {
    userType = [];
  }
} catch (e) {
}
let cancelTokenArr = [];

// 用户vip等级
let vip = '';
try {
    if (localStorage.getItem('vip')) {
        vip = localStorage.getItem('vip')
    }
} catch (e) {
}

//直播间首充
let chatRecharge = '';
try{
    if(localStorage.getItem('chatRecharge')){
        chatRecharge = localStorage.getItem('chatRecharge')
    }
} catch(e){
    
}
//我的关注
let focus = [];
try {
  if (localStorage.getItem('focus')) {
    focus = JSON.parse(localStorage.getItem('focus'));
  } else {
    focus = [];
  }
} catch (e) {
}
//屏蔽特效
let special = false;
try {
  if (localStorage.getItem('special')) {
    special = JSON.parse(localStorage.getItem('special'));
  } else {
    special =false;
  }
} catch (e) {
}

let newsNum = "";
try {
    if (localStorage.getItem('newsNum')) {
        vip = localStorage.getItem('newsNum')
    }
} catch (e) {
}



let fellows = "";
try {
    if (localStorage.getItem('fellows')) {
        vip = localStorage.getItem('fellows')
    }
} catch (e) {
}
// 设置秘钥
let decipher_str=''
try {
  if (localStorage.getItem('decipher_str')) {
    decipher_str = localStorage.getItem('decipher_str')
  }
} catch (error) {
  
}
// 设置客服
let customer=''
try {
  if (localStorage.getItem('customer')) {
    customer = localStorage.getItem('customer')
  }
} catch (error) {
  
}
// 自动转账
let openZdzz = false;
try {
    if (localStorage.getItem('openZdzz')) {
      openZdzz = JSON.parse(localStorage.getItem('openZdzz'))
    }else{
    }
} catch (e) {
}

//是否纯净版
let isPure = '';
try {
    if (localStorage.getItem('isPure')) {
        isPure = localStorage.getItem('isPure')
    }else{
    }
} catch (e) {
}
let openPure = '';
try {
    if (localStorage.getItem('openPure')) {
        openPure = localStorage.getItem('openPure')
    }else{
    }
} catch (e) {
}
let openPure2 = '';
try {
    if (localStorage.getItem('openPure2')) {
        openPure2 = localStorage.getItem('openPure2')
    }else{
    }
} catch (e) {
}

let isOpenNum = '';
try {
    if (localStorage.getItem('isOpenNum')) {
        isOpenNum = localStorage.getItem('isOpenNum')
    }else{
    }
} catch (e) {
}
//所有消息
let closeData = [];
try {
    if (localStorage.getItem('closeData')) {
        closeData = JSON.parse(localStorage.getItem('closeData'));
    } else {
        closeData = {};
    }
} catch (e) {
}


let PchomeTabNav=[];
try {
  if (localStorage.getItem('PchomeTabNav')) {
    PchomeTabNav = JSON.parse(localStorage.getItem('PchomeTabNav'));
  } else {
    PchomeTabNav =[];
  }
} catch (e) {
}
//侧边导航
let rightLink=[];
try {
  if (localStorage.getItem('rightLink')) {
    rightLink = JSON.parse(localStorage.getItem('rightLink'));
  } else {
    rightLink =[];
  }
} catch (e) {
}
//侧边导航
let ptggImg=[];
try {
  if (localStorage.getItem('ptggImg')) {
    ptggImg = JSON.parse(localStorage.getItem('ptggImg'));
  } else {
    ptggImg =[];
  }
} catch (e) {
}
//投注单独页换肤
let skinColor=[];
try {
  if (localStorage.getItem('skinColor')) {
    skinColor = JSON.parse(localStorage.getItem('skinColor'));
  } else {
    skinColor =[];
  }
} catch (e) {
}
//注册红包显示
let zcGifShow=0;
try {
  if (localStorage.getItem('zcGifShow')) {
    zcGifShow = localStorage.getItem('zcGifShow');
  } else {
  }
} catch (e) {
  zcGifShow = getToken('zcGifShow');
}

//网站初始化数据
let webInitData = {};
try {
    if (localStorage.getItem('webInitData')) {
        webInitData = JSON.parse(localStorage.getItem('webInitData'));
    } else {
        webInitData = {};
    }
} catch (e) {
  if (getToken('webInitData')) {
    webInitData = JSON.parse(getToken('webInitData'));
} else {
    webInitData = {};
}
}
let clPkData=[];
// try {
//   if (localStorage.getItem('zcGifShow')) {
//     zcGifShow = localStorage.getItem('zcGifShow');
//   } else {
//   }
// } catch (e) {
//   zcGifShow = getToken('zcGifShow');
// }
//设置用户信息收货地址
let addressInfor = {};
try {
    if (localStorage.getItem('addressInfor')) {
      addressInfor = JSON.parse(localStorage.getItem('addressInfor'));
    } else {
      addressInfor = {};
    }
} catch (e) {
}
let userLoginForm = {};
try {
    if (localStorage.getItem('userLoginForm')) {
      userLoginForm = JSON.parse(localStorage.getItem('userLoginForm'));
    } else {
      userLoginForm = '';
    }
} catch (e) {
}
//线路
let xLLink=[];
try {
  if (localStorage.getItem('xLLink')) {
    xLLink = JSON.parse(localStorage.getItem('xLLink'));
  } else {
    xLLink =[];
  }
} catch (e) {
}


let isCaptcha ;
try {
    if (localStorage.getItem('isCaptcha')) {
      isCaptcha = localStorage.getItem('isCaptcha');
    } else {
      
    }
} catch (e) {
  isCaptcha = getToken('isCaptcha');
}

let isEncrypt ;
try {
    if (localStorage.getItem('isEncrypt')) {
      isEncrypt = localStorage.getItem('isEncrypt');
    } else {
      
    }
} catch (e) {
  isEncrypt = getToken('isEncrypt');
}

let currLan ;
try {
    if (localStorage.getItem('currLan')) {
      currLan = localStorage.getItem('currLan');
    } else {
      
    }
} catch (e) {
  currLan = getToken('currLan');
}

//皮肤状态
let skin = '';
try {
  if (localStorage.getItem('skin')) {
    skin = localStorage.getItem('skin')
  }else{
  }
} catch (e) {
  skin = getToken('skin')
}
let defalutLan = '';
try {
  if (localStorage.getItem('defalutLan')) {
    defalutLan = localStorage.getItem('defalutLan')
  }else{
  }
} catch (e) {
}
let lanCode = '';
try {
  if (localStorage.getItem('lanCode')) {
    lanCode = localStorage.getItem('lanCode')
  }else{
  }
} catch (e) {
}

let userIp = '';
try {
  if (localStorage.getItem('userIp')) {
    userIp = localStorage.getItem('userIp')
  }else{
  }
} catch (e) {
}
let userGG = '';
try {
  if (localStorage.getItem('userGG')) {
    userGG = localStorage.getItem('userGG')
  }else{
  }
} catch (e) {
}
let lanList=[];
try {
  if (localStorage.getItem('lanList')) {
    lanList = JSON.parse(localStorage.getItem('lanList'));
  } else {
    lanList =[];
  }
} catch (e) {
}
let showSjb = true;
try {
  if (localStorage.getItem('showSjb')) {
    showSjb = localStorage.getItem('showSjb')
  }else{
  }
} catch (e) {
}
let oftenName=[]
try {
  if (localStorage.getItem('oftenName')) {
    oftenName = JSON.parse(localStorage.getItem('oftenName'));
  } else {
    oftenName =[];
  }
} catch (e) {
}
let oftenCard=[]
try {
  if (localStorage.getItem('oftenCard')) {
    oftenCard = JSON.parse(localStorage.getItem('oftenCard'));
  } else {
    oftenCard =[];
  }
} catch (e) {
}



let chatShow= false;//聊天室显示
let czTypeArr = [];
let noticeShow2=false
let HomeGame = [];
let GameCenter = [];
let showLogin=false
let isLogin=true
let homeBanners = []
let allLotteryGame = []
const state = {
    fellows,//关注人数
    newsNum,//消息数量
    focus,//我的关注
    diamond,//钻石
    balance,//用户余额
    cancelTokenArr,
    userType,//用户类型
    safePwd,//是否设置取款密码
    avatar,
    rootbox,
    codeToken,// token
    userinfo,//用户信息
    UserId,//用户ID
    username,//用户名
    host,//热门直播
    hotexperts,//专家直播
    proRed,//专家红利
    preview,//直播预告
    banners,//banners
    notices,//公告
    games,//热门彩种
    ad,//广告图
    vip,//用户vip
    chatRecharge,
    routerArr,//路由信息
    routerIndex,//路由索引
    special,//特效,
    decipher_str,//秘钥
    customer,//客服链接
    openZdzz,//自动转账
    zjRecord,//最新下注
    isPure,//是否纯净版
    openPure,//纯净版设置悬浮
    openPure2,//是否显示悬浮辅助
    isOpenNum,//开奖提醒
    closeData,//封盘消息
    PchomeTabNav,//头部导航
    rightLink,//侧边导航
    ptggImg,//平台广告
    skinColor,//投注单独页换肤
    zcGifShow,//注册红包显示
    webInitData,//网站初始化数据
    clPkData,//长龙pk
    addressInfor,//设置用户信息收货地址
    HomeGame,//首页的热门游戏
    GameCenter,//游戏中心
    xLLink,//线路,
    showLogin,//登录
    isLogin,
    userLoginForm,
    homeBanners,//首页轮播图,
    noticeShow2,//公告弹窗
    isEncrypt,//是否加密
    isCaptcha,//验证码是否必填
    currLan,//当前语言
    skin,//皮肤
    czTypeArr,
    vendor_bl,//三方平台总额
    all_vendor_bl,//所有三方余额
    chatShow,
    allLotteryGame,
    userIp,//用户ip
    userGG,//网站维护提示文本
    defalutLan,
    lanCode,
    lanList,//多语言列表
    showSjb,//世界杯代理图标
    oftenName,//充值常用名字
    oftenCard,//充值常用卡号

}

export default state
