<template>
  <div class="main-content ofh" :class="{collapse: !isCollapse}">
    <el-row>
      <el-col :span="24">
        <h-section></h-section>
        <div class="wrapper">
          <div class="pageContent">
            <el-row>
              <el-col :span="24">
                <slot></slot>
              </el-col>
            </el-row>
          </div>
        </div>
        <v-footer></v-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import hSection from './headerSection'
  import vFooter from './footer'

  export default{
    name: 'content',
    computed: {
      ...mapGetters({
        isCollapse: 'GET_COLLAPSE'
      })
    },
    components: {
      hSection,
      vFooter
    }
  }
</script>
