<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="子商品名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="子商品价格:">
              <el-input-number
                placeholder="请输入内容"
                :value="20"
                :controls="false"
                v-model="form.price"
                style="width: 250px;">
              </el-input-number>
            </el-form-item> 
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
  
</template>
<script type="text/javascript">
  import {panelTitle} from '@/components'
  export default{
    data () {
      return {
        form: {
          gid: this.$route.params.gid,
          sid: null,
          name: null,
          price: null
        },
        route_id: this.$route.params.sid,
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '商品名称不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      if (this.route_id) {
        this.get_form_data()
      }
    },
    methods: {
      //  获取数据
      get_form_data () {
        this.load_data = true
        this.$fetch.getPro.list({
          id: this.form.gid
        })
          .then((res) => {
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      //  提交
      on_submit_form () {
        console.log(this.form)
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.getPro.cGoods(this.form)
          .then((res) => {
            if (res.status) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/goods/goodsList' })
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
            this.on_submit_loading = false
          })
          .catch(() => {
            this.on_submit_loading = false
          })
        })
      }
    },
    components: {
      panelTitle
    }
  }
</script>
