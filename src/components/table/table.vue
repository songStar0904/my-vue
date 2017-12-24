<template>
  <el-table :data="data"
            v-loading="loading"
            element-loading-text="拼命加载中"
            @selection-change="on_batch_select"
            border>
    <template v-for="colConfig in colConfigs">
      <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
      <component
        v-else-if="colConfig.component"
        :is="colConfig.component" 
        :col-config="colConfig">
       </component>
       <el-table-column v-else v-bind="colConfig"></el-table-column>
    </template>  
  </el-table>
</template>
<script type="text/javascript">
  export default{
    props: ['colConfigs', 'data', 'loading'],
    methods: {
      // 批量选择
      on_batch_select (val) {
        this.$emit('selectionChange', val)
      }
    }
  }
</script>
