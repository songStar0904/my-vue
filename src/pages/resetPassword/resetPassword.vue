<template>
<div class="panel">
  <panel-title :title="$route.meta.title">
    </panel-title>
    <div class="panel-body">
      <el-row>
        <el-col :span="20">
<el-form :model="form" :rules="rules2" ref="form" label-width="100px">
<el-form-item label="原密码" prop="pass">
    <el-input type="password" v-model="form.oldPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="form.newPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
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
<script>
// 导入md5.js
  import md5 from 'js-md5'
  import {panelTitle} from '@/components'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          oldPass: '',
          newPass: '',
          checkPass: '',
          nick: this.$route.params.nick
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      submitForm (formName) {
        console.log(this.form.oldPass)
        this.form.oldPass = this.md5PassWord(this.form.oldPass)
        this.form.newPass = this.md5PassWord(this.form.newPass)
        this.form.checkPass = this.md5PassWord(this.form.checkPass)
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
            this.$message.error('请填写正确的表单信息')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      md5PassWord (val) {
        return md5(val)
      }
    },
    components: {
      panelTitle
    }
  }
</script>
