<template>
<section>
<div class="menu-left">
  <i class="el-icon-close" @click="changeCollapse" :class="{collapse: isCollapse}"></i>
</div>
  <div class="menu-right" :class="{collapse: isCollapse}">
    <div class="notification-menu">
      <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">
          <img :src="userInfo.img"/>
          <span v-text="this.userInfo.nick"></span>
          <span class="icon"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <router-link class="dropdown-btn" :to="{ name: 'admin'}">
              <i class="icon fa fa-user"></i>
              <span>个人信息</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
          <router-link class="dropdown-btn" :to="{name: 'resetPassword', params: { nick: userInfo.username }}">
          <i class="icon fa fa-key"></i>
          <span>修改密码</span>
          </router-link>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn">
              <i class="icon fa fa-cog"></i>
              <span>设置</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_out">
              <i class="icon fa fa-sign-out"></i>
              <span>安全退出</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</section>
</template>
<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  export default{
    data () {
      return {
        userInfo: {}
      }
    },
    mounted () {
      this.$store.dispatch('GET_USER').then((res) => {
        this.userInfo = res
      })
    },
    computed: {
      ...mapGetters({
        isCollapse: 'GET_COLLAPSE'
      })
    },
    methods: {
      user_out () {
        this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('userInfo')
          this.$fetch.admin.loginOut()
            .then((res) => {
              this.$message.success(res.msg)
              localStorage.removeItem('token')
              this.$store.commit('SET_USER_INFO', null)
              this.$store.commit('SET_ISLOGIN', 0)
              setTimeout(this.$router.replace({name: 'login'}), 500)
            })
        }).catch(() => {

        })
      },
      get_user_info () {
        return sessionStorage.getItem('userInfo')
      },
      user_info () {
        this.$router.push({name: 'admin'})
      },
      user_setting () {
      },
      ...mapMutations({
        changeCollapse: 'SET_COLLAPSE'
      })
    }
  }
</script>
