import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import Base from '@/components/base/base'
import noPageComponent from '@/pages/404/404'
import goodsList from '@/pages/goods/goodsList'
import addGoods from '@/pages/goods/addGoods'
import childGoods from '@/pages/goods/childGoods'
import viewChildGoods from '@/pages/goods/viewChildGoods'
import styleGoods from '@/pages/goods/styleGoods'
import viewStyleGoods from '@/pages/goods/viewStyleGoods'
import type from '@/pages/type/type'
import newsList from '@/pages/news/newsList'
import newsAdd from '@/pages/news/newsAdd'
import admin from '@/pages/admin/admin'
import resetPassword from '@/pages/resetPassword/resetPassword'
import orderList from '@/pages/order/orderList'
import sliderList from '@/pages/slider/sliderList'
import sliderAdd from '@/pages/slider/sliderAdd'
import leaveMsgList from '@/pages/leaveMessage/leaveMessageList'
import loginLog from '@/pages/log/loginLog'
import linkList from '@/pages/link/link'
import linkAdd from '@/pages/link/linkAdd'
import photoList from '@/pages/photo/photo'
import photoAdd from '@/pages/photo/photoAdd'

Vue.use(Router)

export default new Router({
  mode: 'hash', // default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [{
    path: '/404',
    name: 'notPage',
    component: noPageComponent
  }, {
    path: '*',
    redirect: '/404'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '/home',
      name: 'base',
      component: Base,
      meta: {
        title: '主页',
        auth: true
      }
    }, {
      path: '/goods/goodsList',
      name: 'goodsList',
      component: goodsList,
      meta: {
        title: '商品列表',
        auth: true
      }
    }, {
      path: '/goods/goodsAdd',
      name: 'goodsAdd',
      component: addGoods,
      meta: {
        title: '添加商品',
        auth: true
      }
    }, {
      path: '/goods/childGoods',
      name: 'childGoods',
      component: childGoods,
      meta: {
        title: '添加子商品',
        auth: true
      }
    }, {
      path: '/goods/viewChildGoods',
      name: 'viewChildGoods',
      component: viewChildGoods,
      meta: {
        title: '查看子商品',
        auth: true
      }
    }, {
      path: '/goods/viewStyleGoods',
      name: 'viewStyleGoods',
      component: viewStyleGoods,
      meta: {
        title: '查看商品颜色',
        auth: true
      }
    }, {
      path: '/goods/styleGoods',
      name: 'styleGoods',
      component: styleGoods,
      meta: {
        title: '查看商品颜色',
        auth: true
      }
    }, {
      path: '/goods/edit/:id',
      name: 'goodsEdit',
      component: addGoods,
      meta: {
        title: '修改商品',
        auth: true
      }
    }, {
      path: '/goods/goodsType',
      name: 'goodsType',
      component: type,
      meta: {
        title: '商品分类',
        auth: true
      }
    }, {
      path: '/news/newsList',
      name: 'newsList',
      component: newsList,
      meta: {
        title: '新闻列表',
        auth: true
      }
    }, {
      path: '/news/newsAdd',
      name: 'newsAdd',
      component: newsAdd,
      meta: {
        title: '添加新闻',
        auth: true
      }
    }, {
      path: '/news/newsAdd',
      name: 'newsEdit',
      component: newsAdd,
      meta: {
        title: '修改新闻',
        auth: true
      }
    }, {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta: {
        title: '个人信息',
        auth: true
      }
    }, {
      path: '/admin/resetPassword',
      name: 'resetPassword',
      component: resetPassword,
      meta: {
        title: '修改密码',
        auth: true
      }
    }, {
      path: '/order/orderList',
      name: 'orderList',
      component: orderList,
      meta: {
        title: '订单列表',
        auth: true
      }
    }, {
      path: '/slider/sliderList',
      name: 'sliderList',
      component: sliderList,
      meta: {
        title: '首页轮播列表',
        auth: true
      }
    }, {
      path: '/slider/sliderAdd',
      name: 'sliderAdd',
      component: sliderAdd,
      meta: {
        title: '添加轮播列表',
        auth: true
      }
    }, {
      path: '/slider/sliderEdit',
      name: 'sliderEdit',
      component: sliderAdd,
      meta: {
        title: '修改轮播列表',
        auth: true
      }
    }, {
      path: '/leaveMsg/leaveMsgList',
      name: 'leaveMsgList',
      component: leaveMsgList,
      meta: {
        title: '留言列表',
        auth: true
      }
    }, {
      path: '/log/loginLog',
      name: 'loginLog',
      component: loginLog,
      meta: {
        title: '登录日志',
        auth: true
      }
    }, {
      path: '/link/linkList',
      name: 'linkList',
      component: linkList,
      meta: {
        title: '友情链接列表',
        auth: true
      }
    }, {
      path: '/link/linkAdd',
      name: 'linkAdd',
      component: linkAdd,
      meta: {
        title: '添加友情链接',
        auth: true
      }
    }, {
      path: '/link/linkEdit',
      name: 'linkEdit',
      component: linkAdd,
      meta: {
        title: '修改友情链接',
        auth: true
      }
    }, {
      path: '/other/photo',
      name: 'photoList',
      component: photoList,
      meta: {
        title: '公司相册列表',
        auth: true
      }
    }, {
      path: '/other/photoAdd',
      name: 'photoAdd',
      component: photoAdd,
      meta: {
        title: '添加公司相册',
        auth: true
      }
    }, {
      path: '/other/photoEdit',
      name: 'photoEdit',
      component: photoAdd,
      meta: {
        title: '修改公司相册',
        auth: true
      }
    }]
  }]
})
