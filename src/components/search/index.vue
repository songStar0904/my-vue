<template>
  <el-form :inline="true" :model="form" @submit.prevent="submit_form">
   <el-form-item>
    <el-input
      :placeholder="placeholder"
      v-model="form.value">
    </el-input>
    </el-form-item>
    <el-form-item>
    <el-select v-model="form.type" placeholder="类型">
      <el-option v-for="item in type.type" :key="item" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="submit_form">查询</el-button>
  </el-form-item>
  </el-form>
</template>
<script type="text/javascript">
  import {mapState} from 'vuex'
  export default{
    props: {
      placeholder: {
        type: String,
        default: 'Search here...'
      }
    },
    data () {
      return {
        form: {
          value: '',
          type: ''
        }
      }
    },
    computed: {
      valueIsNull () {
        return this.form.value.trim() === ''
      },
      ...mapState([
        'type'
      ])
    },
    methods: {
      submit_form () {
        this.$emit('search', this.form)
        return false
      }
    }
  }
</script>
