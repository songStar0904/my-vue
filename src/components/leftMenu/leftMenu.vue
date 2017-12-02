<template>
  <div class="left-side" :style="{overflowY:isCollapse ? 'visible' : 'auto'}">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <h1 class="title" v-show="!isCollapse">{{title}}</h1>
      </router-link>
      
      <el-menu 
        class="el-menu-vertical-demo"
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        text-color="#fff"
        active-text-color="#65cea7"
        background-color="#424f63">
        <el-submenu 
          v-for="(item, index) in nav_menu_data"
          :key="index"
          :index="item.path"
          class="menu-list"
          v-if="typeof item.child !== 'undefined'"
          >
          <template slot="title">
            <i class="icon fa" :class="item.icon"></i>
            <span slot="title" v-text="item.title" class="text"></span>
          </template>
          <el-menu-item-group>
            <!-- <span slot="title">分组一</span> -->
            <el-menu-item 
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index"
              v-text="sub_item.title"></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="item.path" v-else>
          <i class="icon fa" :class="item.icon"></i>
          <span slot="title" v-text="item.title" class="text"></span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default{
    name: 'slide',
    computed: {
      ...mapGetters({
        isCollapse: 'GET_COLLAPSE'
      })
    },
    data () {
      return {
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
