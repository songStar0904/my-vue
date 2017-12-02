<template>
<div class="panel">
	<panel-title :title="$route.meta.title">
      <p>么么哒</p>
    </panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20">
    <el-form ref="form" :rules="rules" :model="form" label-width="160px">
  <el-form-item label="管理员昵称:"  prop="nick">
    <el-input v-model="form.nick"></el-input>
  </el-form-item>
  <el-form-item label="管理员头像:">
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
    <el-button type="primary" @click="submitForm('form')">提交</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
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
      form: {},
      load_data: false,
      parms: {
        id: 0,
        type: 'admin'
      },
      rules: {
        nick: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 11, message: '长度在 2 到 11 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.form = this.$store.state.userInfo.user
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$fetch.admin.edit(this.form)
              .then((res) => {
                if (res.status) {
                  this.$message.success(res.msg)
                } else {
                  this.$message.error(res.msg)
                }
              })
        } else {
          this.$message.error('请填写正确表单')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
    }
  },
  components: {
    panelTitle
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
