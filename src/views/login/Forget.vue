<template>
  <div class="login">
    <!-- <span class="logo">游乐记</span> -->
    <el-button type="primary" icon="el-icon-s-home" @click="toMain">返回首页</el-button>
    <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
      <div class="title"><h1 title="忘记密码">忘记密码</h1></div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('form')">修改密码</el-button>
          <el-button class="pull-right" @click="toLogin">登 录</el-button>
          <span class="pull-right">记得密码？</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import user from '@/models/user'

export default {
  data() {
    // 验证回调函数
    const validateCode = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入验证码'))
      }else if(value.length < 4){
        callback(new Error('验证码长度不能少于4位'))
      }else{
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        if (this.form.checkPassword !== '') {
          this.$refs.form.validateField('confirm_password')
        }
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      statusMsg: '',
      loading: '',
      form: {
        code: '',
        email: '',
        password: '',
        confirm_password: '',
        type: 2
      },
      rules: {
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          }
        ],
        code: [
          {
            required: true,
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: 'blur'
          }
        ],
        confirm_password: [
          {
            required: true,
            validator: validatePassword2,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async sendMsg() {
      const self = this
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['form'].validateField('email', valid => {
        emailPass = valid
      })
      if (!emailPass) {
        try {
          const res = await user.verify(this.form)
          // console.log(res)
          if(res.error_code===0){
            this.$message.success(`${res.msg}`)
            let count = 180
            self.statusMsg = `验证码已发送,剩余${count--}秒`
            self.timerid = setInterval(function() {
              self.statusMsg = `验证码已发送,剩余${count--}秒`
              if (count === 0) {
                clearInterval(self.timerid)
                self.timerid = ''
                self.statusMsg = '验证码已超时,请重新获取'
                this.$message.error('验证码已超时')
              }
            }, 1000)
          }
        } catch (error) {
          this.$message.error(error.data.msg)
        }
      }
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async valid =>{
        if(valid){
          try{
            let res = await user.forget(this.form)
            // console.log(res)
            if (res.error_code === 0) {
              this.$router.push('/login')
              this.$message.success(`${res.msg}`)
            }
          } catch (e){
            this.$message.error(e.data.msg)
            // console.log(e)
          }
        }
      })
    },
    toLogin() {
      this.$router.push({path: '/login'})
    },
    toMain() {
      this.$router.push({path: '/main'})
    },
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login/login-ba.jpg') no-repeat center center fixed;
  background-size: cover;

  .logo{
    font-size: 38px;
    color: #666;
    position: absolute;
    right: 80px;
    top: 50px;
  }

  .form-box {
    position: fixed;
    left: 25%;
    top: 50%;
    background-color: #efefef;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 15px 45px 10px 20px;

    .title {
      height: 37px;
      font-size: 30px;
      line-height: 37px;
      margin-top: 5%;
      margin-bottom: 7%;

      h1 {
        box-sizing: border-box;
        text-align: center;
        color: #8c98ae;
      }
    }
  }
}
</style>
