<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <h1 class="title">{{title}}</h1>
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path"
        :collapse="isCollapse">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    name: 'slide',
    methods: {
    },
    data () {
      return {
        isCollapse: true,
        title: 'songstar',
        nav_menu_data: [{
          title: '主页',
          path: '/home',
          icon: 'fa-home'
        }, {
          title: '商品管理',
          path: '/goods',
          icon: 'fa-gift',
          child: [{
            title: '商品列表',
            path: '/goods/goodsList'
          }, {
            title: '添加商品',
            path: '/goods/goodsAdd'
          }, {
            title: '商品分类',
            path: '/goods/goodsType'
          }]
        }, {
          title: '新闻管理',
          path: '/news',
          icon: 'fa-newspaper-o',
          child: [{
            title: '新闻列表',
            path: '/news/newsList'
          }, {
            title: '添加新闻',
            path: '/news/newsAdd'
          }]
        }, {
          title: '首页轮播',
          path: '/slider',
          icon: 'fa-photo',
          child: [{
            title: '轮播列表',
            path: '/slider/sliderList'
          }, {
            title: '添加轮播',
            path: '/slider/sliderAdd'
          }]
        }, {
          title: '订单管理',
          path: '/order',
          icon: 'fa-credit-card-alt',
          child: [{
            title: '订单列表',
            path: '/order/orderList'
          }]
        }, {
          title: '留言管理',
          path: '/leaveMsg',
          icon: 'fa-comments',
          child: [{
            title: '留言列表',
            path: '/leaveMsg/leaveMsgList'
          }]
        }, {
          title: '友情链接',
          path: '/link',
          icon: 'fa-link',
          child: [{
            title: '友情链接列表',
            path: '/link/linkList'
          }, {
            title: '添加友情链接',
            path: '/link/linkAdd'
          }]
        }, {
          title: '日志管理',
          path: '/log',
          icon: 'fa-calendar-minus-o',
          child: [{
            title: '登录日志',
            path: '/log/loginLog'
          }, {
            title: '更新日志',
            path: '/log/update'
          }]
        }, {
          title: '其他设置',
          path: 'other',
          icon: 'fa-cog',
          child: [{
            title: '公司相册',
            path: '/other/photo'
          }]
        }]
      }
    }
  }
</script>
