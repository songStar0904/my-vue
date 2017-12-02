<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="相册标题:" prop="title">
              <el-input v-model="form.name" placeholder="请输入标题" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="轮播图片:">
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
    <el-dialog v-model="dialogVisible" size="tiny">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from '@/components'
  export default{
    data () {
      return {
        form: {
          id: this.$route.params.id,
          name: null,
          img: []
        },
        parms: {
          id: this.$route.params.id,
          type: 'gallery'
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created () {
      if (this.route_id) {
        this.get_form_data()
      } else {
        this.new()
      }
    },
    methods: {
      //  获取数据
      get_form_data () {
        this.load_data = true
        this.$fetch.photo.get({
          id: this.route_id
        })
          .then((res) => {
            this.form = res.data[0]
            this.parms.id = res.data[0].id
            this.$message(res.msg)
            this.load_data = false
          })
          .catch(() => {
            this.load_data = false
          })
      },
      new () {
        this.$fetch.photo.add()
          .then((res) => {
            this.form.id = res.gid
            this.parms.id = res.gid
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
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.photo.edit(this.form)
          .then((res) => {
            if (res.status) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/other/photo' })
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
<style>
</style>
