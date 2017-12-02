<template>
  <div class="view-page">
    <left-menu></left-menu>
    <main-content>
      <router-view></router-view>
    </main-content>
  </div>
</template>
<script type="text/javascript">
  import {mainContent, leftMenu} from '@/components'
  export default{
    name: 'page',
    mounted () {
      // 这个写到main.js router里面去了
      // console.log(this.$store.state.userInfo.islogin, 'asd')
      // if (!this.$store.state.userInfo.islogin) {
      //   this.$store.dispatch('IS_LOGIN')
      // }
    },
    components: {
      mainContent,
      leftMenu
    }
  }
</script>
