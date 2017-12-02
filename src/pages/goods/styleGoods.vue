<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="商品颜色:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="商品图片:">
           <el-upload
  class="upload-demo"
  action="/api/tm/ifile/upload"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="handleSuccess"
  :file-list="form.img"
  :data="parms"
  :before-upload="beforeAvatarUpload"
  list-type="picture-card">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
</el-upload>
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
          sid: this.$route.params.sid,
          name: null,
          img: []
        },
        route_id: this.$route.params.sid,
        load_data: false,
        on_submit_loading: false,
        parms: {
          sid: this.$route.params.sid,
          gid: this.$route.params.gid,
          type: 'style'
        },
        rules: {
          name: [{required: true, message: '商品颜色不能为空', trigger: 'blur'}]
        }
      }
    },
    mounted () {
      let form = this.$route.params.item
      if (form) {
        this.form = form
        this.get_form_data()
      } else {
        this.newStyle()
      }
    },
    methods: {
      //  获取数据
      get_form_data () {
        this.load_data = true
        this.$fetch.getPro.getStyle({
          id: this.form.gid
        })
          .then((res) => {
            this.form.name = res.data.name
            this.form.img = res.data.img
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      newStyle () {
        this.$fetch.getPro.newStyle()
        .then((res) => {
          this.form.sid = res.sid
        })
        .catch(() => {
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
        this.$fetch.upload.del({
          url: file.url,
          id: this.parms.id
        }).then((res) => {
          if (res.status) {
            this.$message.success(res.msg)
            this.form.img = fileList
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.$message.error('访问失败')
        })
      },
      handlePreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 上传成功时，添加img数列
      handleSuccess (response, file, fileList) {
        console.log(response, file, fileList)
        let newImg = {
          name: file.name,
          url: response.info.url // file.url
        }
        this.form.img.push(newImg)
      },
      // 设置上传要求
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!')
        }
        return isJPG && isLt1M
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
            this.$message({
              type: 'error',
              message: '404'
            })
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
