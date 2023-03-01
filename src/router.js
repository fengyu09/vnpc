import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
import store from './store/index'
import { alertComfirm } from './assets/js/public'
//主体部分
import Home from './views/main/home.vue'; //首页

const RechargePage = r => require.ensure([], () => r(require('./views/user/rechargePage.vue')), 'userCenter');
const Setting = r => require.ensure([], () => r(require('./views/user/setting/setting.vue')), 'userCenter'); //设置
const LoginPwd = r => require.ensure([], () => r(require('./views/user/setting/loginPwd.vue')), 'userCenter'); //修改登录密码
const PayPwd = r => require.ensure([], () => r(require('./views/user/setting/payPwd.vue')), 'userCenter'); //修改支付密码
const setPay = r => require.ensure([], () => r(require('./views/user/setting/setPayPsd.vue')), 'userCenter'); //设置支付密码
const DsRecord = r => require.ensure([], () => r(require('./views/user/dsRecord.vue')), 'userCenter'); //打赏记录
const FeedBack = r => require.ensure([], () => r(require('./views/user/feedBack.vue')), 'userCenter'); //意见反馈
const UserInforNew = r => require.ensure([], () => r(require('./views/user/userInfor.vue')), 'userCenter'); //用户资料
const WidthDraw = r => require.ensure([], () => r(require('./views/user/widthDraw.vue')), 'userCenter'); //提现
const videoCollect = r => require.ensure([], () => r(require('./views/user/videoCollect.vue')), 'userCenter'); //播放历史
const member = r => require.ensure([], () => r(require('./views/user/member.vue')), 'userCenter'); //用户中心
const news = r => require.ensure([], () => r(require('./views/user/news.vue')), 'userCenter'); //消息中心
const moneyCenter = r => require.ensure([], () => r(require('./views/user/moneyCenter.vue')), 'userCenter'); //资产中心
const gameReport = r => require.ensure([], () => r(require('./views/user/gameReport.vue')), 'userCenter'); //游戏报表
const extendReport = r => require.ensure([], () => r(require('./views/user/extendReport.vue')), 'userCenter'); //推广报表
const Introduction = r => require.ensure([], () => r(require('./views/user/virtual/Introduction.vue')), 'userCenter'); //虚拟币说明




const welcome = r => require.ensure([], () => r(require('./views/promotions/welcome.vue')), 'welcome');
const hdDetail = r => require.ensure([], () => r(require('./views/promotions/hdDetail.vue')), 'welcome');
const videoHome = r => require.ensure([], () => r(require('./views/video/videoHome.vue')), 'welcome'); //影片区
const videoMore = r => require.ensure([], () => r(require('./views/video/videoMore.vue')), 'welcome'); //影片区更多视频
const videoPlay = r => require.ensure([], () => r(require('./views/video/videoPlay.vue')), 'welcome'); //影视区播放页
const searchVideo = r => require.ensure([], () => r(require('./views/video/searchVideo.vue')), 'welcome'); //影视区搜索
const vipDetails = r => require.ensure([], () => r(require('./views/user/vipDetails.vue')), 'welcome'); //vip详情

const appDownload = r => require.ensure([], () => r(require('./views/appDownload.vue')), 'main');//app下载
const extendNew = r => require.ensure([], () => r(require('./views/extendNew.vue')), 'main');//热门代理

//游戏中心
const ToGame = r => require.ensure([], () => r(require('./views/game/toGame.vue')), 'game');
const gameCenter = r => require.ensure([], () => r(require('./views/game/gameCenter.vue')), 'game');//游戏中心
const lotteryGame = r => require.ensure([], () => r(require('./views/Lottery/LGNew.vue')), 'game');//投注页
const gameRule = r => require.ensure([], () => r(require('./views/second/gameRule.vue')), 'game');//游戏规则
const userAgreement = r => require.ensure([], () => r(require('./views/login/userAgreement.vue')), 'game');//协议

//问题中心
const QuCenter = r => require.ensure([], () => r(require('./views/questions/quCenter.vue')), 'QuCenter');
const contact = r => require.ensure([], () => r(require('./views/questions/contact.vue')), 'QuCenter');//联系我们
const ruleClause = r => require.ensure([], () => r(require('./views/questions/ruleClause.vue')), 'QuCenter');//规则条款
const statement = r => require.ensure([], () => r(require('./views/questions/statement.vue')), 'QuCenter');//责任声明
const privacy = r => require.ensure([], () => r(require('./views/questions/privacy.vue')), 'QuCenter');//隐私保护
const basicOperation = r => require.ensure([], () => r(require('./views/questions/basicOperation.vue')), 'QuCenter');//基本操作
const Tutorials = r => require.ensure([], () => r(require('./views/user/virtual/Tutorials.vue')), 'Tutorials');//充值教程


let router = new vueRouter({
  mode:'history',
  base:process.env.BASE_URL,
  routes: [{
    path: '/index',
    name: 'home',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    component: Home
  },
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    redirect: '/index'
  },
  
  {
    path: '/appDownload',
    name: 'appDownload',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    component: appDownload
  },

  {
    path: '/extend',
    name: 'extend',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    component: extendNew
  },
  
  
  {
    path: '/rechargePage',
    name: 'rechargePage',
    requireVirtural: false,
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    component: RechargePage
  },
  
  {
    path: '*',
    name: 'not_found',
    requireVirtural: false,
    component: Home
  },
  
  {
    path: '/ToGame/:type/:id',
    name: 'ToGame',
    meta: {
      requireAuth: true,
      requireVirtural: true,
      requirePure: false,
    },
    component: ToGame
  },
  
  {
    path: '/game',
    name: 'gameCenter',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
    },
    component: gameCenter
  },

  {
    path: '/member',
    name: 'member',
    meta: {
      requireAuth: true,
      requireVirtural: false,
      requirePure: false,
    },
    component: member,
    children: [{
      path: '/setting',
      name: 'setting',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: Setting
    },
    {
      path: '/loginPwd',
      name: 'loginPwd',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: LoginPwd
    },
    {
      path: '/payPwd',
      name: 'payPwd',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: PayPwd
    }, {
      path: '/setPay',
      name: 'setPay',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: setPay
    },
    {
      path: '/dsRecord',
      name: 'dsRecord',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: DsRecord
    },
    {
      path: '/feedBack',
      name: 'feedBack',
      meta: {
        requireAuth: true,
        requireVirtural: false,
        requirePure: false,
      },
      component: FeedBack
    },
    {
      path: '/userInfor',

      name: 'userInfor',
      meta: {
        requireAuth: true,
        requirePure: false,
        requireVirtural: false,
      },
      // component: UserInfor
      component: UserInforNew
    },
    {
      path: '/moneyCenter',

      name: 'moneyCenter',
      meta: {
        requireAuth: true,
        requirePure: false,
        requireVirtural: true,
      },
      // component: UserInfor
      component: moneyCenter
    },
    
    
    {
      path: '/widthDraw',
      name: 'widthDraw',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: WidthDraw
    },
    {
      path: '/videoCollect',
      name: 'videoCollect',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: videoCollect
    },

  
     {
      path: '/news',
      name: 'news',
      meta: {
        requireAuth: true,
        requireVirtural: true,
        requirePure: false,
      },
      component: news
    },
    {
      path: '/gameReport', //游戏报表
      name: 'gameReport',
      meta: {
        requireAuth: true,
        requirePure: false,
        requireVirtural: true,
      },
      component: gameReport
    },
    {
      path: '/extendReport/:id', //游戏报表
      name: 'extendReport',
      meta: {
        requireAuth: true,
        requirePure: false,
        requireVirtural: true,
      },
      component: extendReport
    },
    

    

    ]
  },

 
  {
    name: 'userAgreement',
    path: '/userAgreement',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
      title: '用户协议'
    },
    component: userAgreement
  },
  {
    path: '/Introduction', 
    name: 'Introduction',
    meta: {
      requireAuth: true,
      requirePure: false,
      requireVirtural: true,
    },
    component: Introduction
  },
  {
    name: 'gameRule',
    path: '/gameRule/:id',
    meta: {
      requireAuth: false,
      requireVirtural: false,
      requirePure: false,
      title: '游戏规则'
    },
    component: gameRule
  },
  {
    name: 'videoHome',
    path: '/movie',
    meta: {
      requireAuth: false,
      requireVirtural: true,
      requirePure: false,
      title: '影片区'
    },
    component: videoHome
  },
  {
    name: 'videoMore',
    path: '/videoMore/:typeId/:cid',
    meta: {
      requireAuth: false,
      requireVirtural: true,
      requirePure: false,
      title: '更多视频'
    },
    component: videoMore
  },
  {
    name: 'videoPlay',
    path: '/videoPlay/:id',
    meta: {
      requireAuth: false,
      requireVirtural: true,
      requirePure: false,
      title: '',
    },
    component: videoPlay
  },
  {
    name: 'searchVideo',
    path: '/searchVideo',
    meta: {
      requireAuth: false,
      requireVirtural: true,
      requirePure: false,
      title: '视频搜索',
    },
    component: searchVideo
  },
  
 
  {
    name: 'lotteryGame',
    path: '/lotteryGame/:id',
    meta: {
      requireAuth: false,
      requirePure: false,
      title: '投注页'
    },
    component: lotteryGame
  },


  {
    name: 'vipDetails',
    path: '/vipDetails',
    meta: { requireAuth: false, title: 'vip详情页', requirePure: false, },
    component: vipDetails
  },
  
  {
    name: 'welcome',
    path: '/welcome',
    meta: { requireAuth: false, title: '活动列表', requirePure: false, requirePure: false, },
    component: welcome
  },
  {
    name: 'hdDetail',
    path: '/hdDetail',
    meta: { requireAuth: false, title: '活动详情', requirePure: false, requirePure: false, },
    component: hdDetail
  },
  
  {
    name: 'Tutorials',
    path: '/Tutorials',
    meta: { requireAuth: false, title: '基本操作', requirePure: false, },
    component: Tutorials
  },
  {

    name: 'QuCenter',
    path: '/QuCenter',
    meta: { requireAuth: false, title: '问题页面', requirePure: false, },
    component: QuCenter,
    children: [
      {
        name: 'contact',
        path: '/contact',
        meta: { requireAuth: false, title: '联系我们', requirePure: false, },
        component: contact
      }, 
     
      {
        name: 'ruleClause',
        path: '/ruleClause',
        meta: { requireAuth: false, title: '规则条款', requirePure: false, },
        component: ruleClause
      }, {
        name: 'statement',
        path: '/statement',
        meta: { requireAuth: false, title: '责任声明', requirePure: false, },
        component: statement
      }, {
        name: 'privacy',
        path: '/privacy',
        meta: { requireAuth: false, title: '隐私保护', requirePure: false, },
        component: privacy
      },
    
      {
        name: 'basicOperation',
        path: '/basicOperation',
        meta: { requireAuth: false, title: '基本操作', requirePure: false, },
        component: basicOperation
      },
      
      
     
    ]

  }
  ]
})




router.beforeEach((to, from, next) => {
  store.commit('clearToken')
  let token = store.state.codeToken;
  let pure = store.state.isPure;
  if (from.path == '/login' || from.path == '/Pwdlogin') {
    Vue.prototype.noticeShow2 = true
  }
  // requireAuth 耦控制是否可以登录就进入  是否是试玩
  if (to.meta.requireAuth) {
    //是否登录
    if (token) {
      // requireVirtural
      if (to.meta.requireVirtural && store.state.userinfo.user_id < 0) {

        return alertComfirm({
          msg:'Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức',
          title:'Nhắc nhở',
          conBtText: 'Đăng ký',
          cancelButtonText: 'đăng nhập',
          showCancelButton:true,
        },()=>{
          Vue.prototype.$st.commit('SETLOGIN', true);
          Vue.prototype.$st.commit('SETISLOGIN', false)
        },()=>{
          
        });  

       
      } else {
        next();
      }
      
    } else {
      Vue.prototype.$st.commit('SETLOGIN', true);
      next()
    }

  } else {
    if (token) {
      if (to.path == '/login' || to.path == '/register' || to.path == '/RegisterDl' || to.path == '/fPwdTel' || to.path == '/userAgreement') {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next();
      }
    } else {
      if (to.path == '/login' || to.path == '/register' || to.path == '/RegisterDl' || to.path == '/fPwdTel' || to.path == 'userAgreement') {
        store.commit('SETLOGIN', true);
        store.commit('SETISLOGIN', false);
        next({
          path: '/',
          query: {
            c: to.query.c
          }
        })
      } else {
        next();
      }

    }
   

  }





});



export default router;