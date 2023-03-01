const mutations = {
    //设置用户信息
    SETUSERINFO(state,data){
        state.userinfo = data;
        try {
            if(data)
                localStorage.setItem('userinfo',JSON.stringify(data));
            else
                localStorage.setItem('userinfo',"");

        } catch (e) {}
    },
    SETCHAT(state,data){
      state.chatShow = data;
    },
    SETUZJRECOED(state,data){
        state.zjRecord = data;
        try {
            if(data)
                localStorage.setItem('zjRecord',JSON.stringify(data));
            else
                localStorage.setItem('zjRecord',"");

        } catch (e) {}
    },
    //设置用户名
    SETUSERNAME (state,data) {
        state.username = data
        try {
            localStorage.setItem('username',data)
        } catch (e) {}
    },
  //设置用户名余额
  SETBALANCE (state,data) {
    state.balance = data
    try {
      localStorage.setItem('balance',data)
    } catch (e) {}
  },
  //设置三方平台余额
  SETVENDELBL (state,data) {
    state.vendor_bl = data
    try {
      localStorage.setItem('vendor_bl',data)
    } catch (e) {}
  },
  //设置三方余额列表
  SETALLVENDELBL (state,data) {
    state.all_vendor_bl = data
    // try {
    //   localStorage.setItem('all_vendor_bl',data)
    // } catch (e) {}
  },
  //设置用户名钻石
  SETDIAMOND (state,data) {
    state.diamond = data
    try {
      localStorage.setItem('diamond',data)
    } catch (e) {}
  },
    //设置用户头像
    SETPIC (state,data) {
     state.avatar = data
    try {
      localStorage.setItem('avatar',data)
    } catch (e) {}
  },

    //解决hash路由qq浏览器的bug
    SETROUTER(state,data){
        if(!data){
            // state.routerIndex =state.routerIndex--;
            state.routerArr = state.routerArr.splice(0,state.routerArr.length-2);
        }else{
          state.routerArr.push(data);
          // if(!state.routerIndex){
          //     state.routerIndex = state.routerArr.length;
          // }else{
          //     state.routerIndex  =  state.routerIndex++;
          // }


        }

    },

    //设置用户token
    SETUSERTOKEN (state,data) {
        state.codeToken = data
        try {
            localStorage.setItem('codeToken',data)
        } catch (e) {}
    },

    //设置用户user_id

    SETUSERUSERID(state,data){
        state.UserId = data;
        try {
            localStorage.setItem('UserId',data)
        } catch (e) {}
    },

    ROOTBOX(state,data){
       state.rootbox=data;
    },

  //是否设置取款密码
    SETSAFEPWD (state,data) {
      state.safePwd = data
      try {
        localStorage.setItem('safePwd',data)
      } catch (e) {

      }
    },


//   设置热门直播
    SETHOST_S(state,data){
        state.host = data
        try {
            localStorage.setItem('host',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('host','')
        }
    },
    //设置专家直播
    SETHOSTEXPERTS_S(state,data){
        state.hotexperts = data
        try {
            localStorage.setItem('hotexperts',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('hotexperts','')
        }
    },
    //设置专家红利
    SETPRORED_S(state,data){
        state.proRed = data
        try {
            localStorage.setItem('proRed',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('proRed');
        }
    },
    //设置直播预告
    SETLIVEPREVIEW_S(state,data){
        state.preview = data
        try {
            localStorage.setItem('preview',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('preview','');
        }
    },
    //设置banner
    SETBANNER_S(state,data){
        state.banners = data
        try {
            localStorage.setItem('banners',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('banners','');
        }
    },
    //设置公告
    SETNOTICE_S(state,data){
        state.notices = data
        try {
            localStorage.setItem('notices',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('notices','');
        }
    },
    //设置热门彩种
    SETGAME_S(state,data){
        state.games = data
        try {
            localStorage.setItem('games',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('games','');
        }
    },
    //设置广告图
    SETAD_S(state,data){
        state.ad = data
        try {
            localStorage.setItem('ad',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('ad','');
        }
    },
  //设置用户类型
  SETUSER_TYPE(state,data){
    state.userType = data
    try {
      localStorage.setItem('userType',data)
    } catch (e) {
    }
  },


  pushToken: (state, src) => {
    state.cancelTokenArr.push(src.cancelToken)
  },
  clearToken: ({cancelTokenArr}) => {
    cancelTokenArr.forEach(item => {
      item('路由跳转取消请求')
    })
    cancelTokenArr = []
  },
  //设置用户vip
  SETUSERVIP(state,data){
    state.vip = data;
    try {
        localStorage.setItem('vip',data)
    } catch (e){

    }
},
    //直播间首充
  SETFIRSTCHARGE(state,data){
      state.chatRecharge = !state.chatRecharge;
      try {
          localStorage.setItem('chatRecharge',data)
      } catch (e){

      }
  },


  //   设置我的关注
  SETFOCUS(state,data){
    state.focus = data
    try {
      localStorage.setItem('focus',JSON.stringify(data));
    } catch (e) {
      localStorage.setItem('focus','')
    }
  },
  //   屏蔽特效
  SPECIAL(state,data){
    state.special = data
    try {
      localStorage.setItem('special',JSON.stringify(data));
    } catch (e) {
      // localStorage.setItem('special','')
    }
  },
 //新消息
  SETNEWSNUM(state,data){
    state.newsNum = data
    try {
      localStorage.setItem('newsNum',JSON.stringify(data));
    } catch (e) {
      localStorage.setItem('newsNum','')
    }
  },
  //关注数量
  SETFELLOWS(state,data){
    state.fellows = data
    try {
      localStorage.setItem('fellows',JSON.stringify(data));
    } catch (e) {
      localStorage.setItem('fellows','')
    }
  },
  //设置秘钥
SETISDECIPHER (state,data) {
  state.decipher_str = data
  try {
    localStorage.setItem('decipher_str',data)
  } catch (e) {}
},
SETISMUSIC(state,data){
    state.musicState = data
    try {
        localStorage.setItem('musicState',data)
    } catch (e) {}
},
//客服
SETCUSTOMER(state,data){
    state.customer = data
    try {
        localStorage.setItem('customer',data)
    } catch (e) {}
},
//自动转账
SETOPENZDZZ(state,data){
  state.openZdzz = data
  try {
      localStorage.setItem('openZdzz',data)
  } catch (e) {}
},
//设置是否纯净版
SETPURE(state,data){
    state.isPure = data
    try {
        localStorage.setItem('isPure',data)
    } catch (e) {}
},
//纯净版悬浮开关
SETOPENPURE(state,data){
    state.openPure = data
    try {
        localStorage.setItem('openPure',data)
    } catch (e) {}
},
//悬浮开发
SETOPENPURE2(state,data){
    state.openPure2 = data
    try {
        localStorage.setItem('openPure2',data)
    } catch (e) {}
},
SETOPENNUM(state,data){
        state.isOpenNum = data
        try {
            localStorage.setItem('isOpenNum',data)
        } catch (e) {}
    },
    //设置封盘彩种
    SETCLOSEDATA(state,data){
        state.closeData = data;
        try {
            if(data)
                localStorage.setItem('closeData',JSON.stringify(data));
            else
                localStorage.setItem('closeData',"");

        } catch (e) {}
    },
     //设置头部导航
  SETHOMENAV(state,data){
    state.PchomeTabNav = data;
    try {
        if(data)
            localStorage.setItem('PchomeTabNav',JSON.stringify(data));
        else
            localStorage.setItem('PchomeTabNav',"");
    } catch (e) {}
  },
     //设置头部导航
  SETRIGHTLINK(state,data){
    state.rightLink = data;
    try {
        if(data)
            localStorage.setItem('rightLink',JSON.stringify(data));
        else
            localStorage.setItem('rightLink',"");
    } catch (e) {}
  },
     //设置平台广告
  SETPTGG(state,data){
    state.ptggImg = data;
    try {
      localStorage.setItem('ptggImg',JSON.stringify(data));
    } catch (e) {}
  },
//投注单独页换肤
  SETSKINCOLOR(state,data){
    state.skinColor = data;
    try {
      localStorage.setItem('skinColor',JSON.stringify(data));
    } catch (e) {}
  },
  //  //注册红包显示
  SETZCGIF (state,data) {
    state.zcGifShow = data
    try {
      localStorage.setItem('zcGifShow',data)
    } catch (e) {
      setToken('zcGifShow',data)
    }
  },
  //设置
  SETWEBDATA(state,data){
    state.webInitData = data;
    try {
        if(data&&window.localStorage)
            localStorage.setItem('webInitData',JSON.stringify(data));
        else
            localStorage.setItem('webInitData',"");
    } catch (e) {
      alert(data)
      if(data)
      setToken('webInitData',JSON.stringify(data));
      else
      setToken('webInitData',"");
      
    }
},
SETCLPK (state,data) {
  state.clPkData = data
  // try {
  //   localStorage.setItem('zcGifShow',data)
  // } catch (e) {
  //   setToken('zcGifShow',data)
  // }
},
//设置用户信息收货地址
SETADDRESSINFOR(state,data){
  state.addressInfor = data;
  try {
      if(data)
          localStorage.setItem('addressInfor',JSON.stringify(data));
      else
          localStorage.setItem('addressInfor',"");

  } catch (e) {}
},

SETHOMEGAME(state,data){
  state.HomeGame = data;
},
SETGAMECENTER(state,data){
  state.GameCenter = data;
},
//线路
SETXLLINKS(state,data){
  state.xLLink = data;
  try {
    localStorage.setItem('xLLink',JSON.stringify(data));
  } catch (e) {}
},
SETLOGINFORM(state,data){
  state.userLoginForm = data;
  try {
    localStorage.setItem('userLoginForm',JSON.stringify(data));
  } catch (e) {}
},
SETLOGIN(state,data){
  state.showLogin = data;
},
SETISLOGIN(state,data){
  state.isLogin = data;
},
SETHOMEBANNWERS(state,data){
  state.homeBanners = data;
},
SETNOTICE(state,data){
  state.noticeShow2 = data;
},
SETENCRYPT(state,data){
  state.isEncrypt = data;
  try {
      localStorage.setItem('isEncrypt',data)
  } catch (e){
    setToken('isEncrypt',data);
  }
},

SETCHECKCAPTCHA(state,data){
  state.isCaptcha = data;
  try {
      localStorage.setItem('isCaptcha',data)
  } catch (e){
    setToken('isCaptcha',data);
  }
},

SETCURRLAN(state,data){
  state.currLan = data;
  try {
      localStorage.setItem('currLan',data)
  } catch (e){
    setToken('currLan',data);
  }
},
// 设置皮肤列表
SETSKINDATA (state,data) {
  // console.log(33333,data)
  state.skin = data
  try {
    localStorage.setItem('skin',data)
  } catch (e) {
    setToken('skin',data)
  }
},
SETCZTYPE(state,data){
  state.czTypeArr = data;
},
SETALLLOTTERTGAME(state,data){
  state.allLotteryGame = data;
},
SETUSERIP(state,data){
  state.userIp = data;
  try {
      localStorage.setItem('userIp',data)
  } catch (e){
    setToken('userIp',data);
  }
},
SETUSERGG(state,data){
  state.userGG = data;
  try {
      localStorage.setItem('userGG',data)
  } catch (e){
    setToken('userGG',data);
  }
},
SETSJB(state,data){
  state.showSjb = data;
  try {
      localStorage.setItem('showSjb',data)
  } catch (e){
    setToken('showSjb',data);
  }
},
SETLANDCODE(state,data){
  state.lanCode = data;
  try {
      localStorage.setItem('lanCode',data)
  } catch (e){
    setToken('lanCode',data);
  }
},
SETDEFAULTLAN(state,data){
  state.defalutLan = data;
  try {
      localStorage.setItem('defalutLan',data)
  } catch (e){
    setToken('defalutLan',data);
  }
},
SETLANLIST(state,data){
  state.lanList = data;
  try {
    localStorage.setItem('lanList',JSON.stringify(data));
  } catch (e) {}
},
SETOFTENNAME(state,data){
  state.oftenName = data;
  try {
      if(data)
          localStorage.setItem('oftenName',JSON.stringify(data));
      else
          localStorage.setItem('oftenName',"");

  } catch (e) {}
},
SETOFTENCARD(state,data){
  state.oftenCard = data;
  try {
      if(data)
          localStorage.setItem('oftenCard',JSON.stringify(data));
      else
          localStorage.setItem('oftenCard',"");

  } catch (e) {}
},
}

export default mutations    

