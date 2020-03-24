<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <router-link to="/login">
            <el-button type="primary" size="small">登录</el-button>
          </router-link>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" maxlength="4" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password" />
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('form')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
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
      form: {
        nickname: '',
        code: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      rules: {
        nickname: [
          {
            required: true,
            message: '昵称不能为空',
            trigger: ['blur', 'change'],
          }
        ],
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
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['form'].validateField('nickname', valid => {
        namePass = valid
      })
      if (namePass) {
        return false
      }
      this.$refs['form'].validateField('email', valid => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
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
            let res = await user.register(this.form)
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
    }
  }
}
</script>
<style lang="scss">
.page-register {
  .header {
    border-bottom: 2px solid #2bb8aa;
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .site-logo {
        display: inline-block;
        width: 128px;
        width: 54px;
        height: 36px;
        text-indent: -9999px;
        background-position: -669px -748px;
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
      }

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
      }
    }
  }

  >section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 550px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }
  }
}
</style>
