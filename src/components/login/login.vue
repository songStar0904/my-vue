<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="left" label-width="0px" class="demo-ruleForm card-box loginform"
                         :style="formOffset"
                         :model="userInfo"
                        :rules="rule_data"
                         v-loading="login_actions"
                        element-loading-text="正在登录..."
                        ref='userInfo'>
                        <h3 class="title">系统登录</h3>
                        <el-form-item
                            prop='username'>
                            <el-input type="text" auto-complete="off" placeholder="账号" 
                                v-model="userInfo.username"
                                @keyup.action.enter="login('userInfo')"
                                ></el-input>
                        </el-form-item>
                        <el-form-item
                            prop='password'>
                            <el-input type="password" auto-complete="off" placeholder="密码" 
                            v-model="userInfo.password"
                            @keyup.action.enter="login('userInfo')"></el-input>
                        </el-form-item>
                        <el-checkbox style="margin:0px 0px 35px 0px;" v-model="userInfo.remember">记住登录（7天）</el-checkbox>
                        <el-form-item style="width:100%;">
                            <el-button type="primary" @click="login('userInfo')">登录</el-button>
                            <el-button @click="resetForm('userInfo')" >重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 导入md5.js
import md5 from 'js-md5'
export default {
  name: 'login',
  data () {
    return {
      winSize: {
        width: '',
        height: ''
      },
      formOffset: {
        position: 'absolute',
        left: '',
        top: ''
      },
      userInfo: {
        password: '',
        username: '',
        remember: false
      },
      login_actions: false,
      remember: false,
      rule_data: {
        username: [{
          required: true,
          message: '用户名不能为空！',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空！',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    md5PassWord () {
      return md5(this.userInfo.password)
    }
  },
  mounted () {
    var _this = this
    this.setSize()
    window.onresize = () => {
      _this.setSize()
    }
  },
  methods: {
    setSize () {
      this.winSize.width = document.body.clientWidth + 'px'
      this.winSize.height = document.body.clientHeight + 'px'

      this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px'
      this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px'
    },
    login (ref) {
      this.login_actions = true
      this.userInfo.password = this.md5PassWord
      console.log(this.userInfo)
      this.$refs[ref].validate((valid) => {
        if (valid) {
          this.$fetch.admin.login(this.userInfo)
              .then((res) => {
                this.login_actions = false
                localStorage.setItem('token', JSON.stringify(res['data']))
                console.log(res)
                if (res.status) {
                  this.$store.commit('SET_USER_INFO', res['data'])
                  this.$store.commit('SET_ISLOGIN', 1)
                  this.$message.success(res.msg)
                  this.$router.push({path: '/home'})
                } else {
                  this.$message.error(res.msg)
                }
              })
              .catch(() => {
                this.login_actions = false
              })
        // sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        } else {
          this.$message({
            message: '请输入正确的账号密码',
            type: 'error'
          })
          this.login_actions = false
        }
      })
    },
    resetForm (ref) {
      this.$refs[ref].resetFields()
    }
  }
}
</script>

<style scoped >
    .login{
        height: 100%;
        background: #1F2D3D;      
    }
    .card-box {
            box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
            -webkit-border-radius: 5px;
            border-radius: 5px;
            -moz-border-radius: 5px;
            background-clip: padding-box;
            margin-bottom: 20px;
            background-color: #F9FAFC;
            border: 2px solid #8492A6;
        }

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

         .loginform {
            width: 350px;
            padding: 35px 35px 15px 35px;
        } 
</style>
