<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="标题一:" prop="title">
              <el-input v-model="form.title" placeholder="请输入标题" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="标题二:" prop="subtitle">
              <el-input v-model="form.subtitle" placeholder="请输入内容" style="width: 250px;" ></el-input>
            </el-form-item>
            <el-form-item label="链接:" prop="link">
              <el-input v-model="form.link" placeholder="请输入内容" style="width: 250px;" ></el-input>
            </el-form-item>
            <el-form-item label="是否发布:">
              <el-switch
                v-model="form.status"
                on-color="#13ce66"
                off-color="#ff4949"
                :on-value="1"
                :off-value="0">
              </el-switch>
            </el-form-item>
            <el-form-item label="轮播图片:">
           <el-upload
  class="avatar-uploader"
  action="/api/tm/ifile/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :data="parms">
  <img v-if="form.img" :src="form.img" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
  import {panelTitle, vEditor} from '@/components'
  export default{
    data () {
      return {
        form: {
          title: null,
          subtitle: '',
          status: 1,
          img: null,
          link: ''
        },
        parms: {
          id: 0,
          type: 'slider'
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false
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
        this.$fetch.slider.get({
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
        this.$fetch.slider.add()
          .then((res) => {
            this.form.id = res.id
            this.parms.id = res.id
          })
          .catch(() => {
          })
      },
      //  时间选择改变时
      on_change_date (val) {
        this.$set(this.form, 'date', val)
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleAvatarSuccess (res, file) {
        console.log(res)
        this.form.img = res.info.url
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      //  提交
      on_submit_form () {
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          this.$fetch.slider.edit(this.form)
          .then((res) => {
            if (res.status) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push({ path: '/slider/sliderList' })
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
      panelTitle,
      vEditor
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
