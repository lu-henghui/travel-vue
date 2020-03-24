<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
      </div>
      <div class="form">
        <h4>账号登录</h4>
        <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" autocomplete="off">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" autocomplete="off" placeholder="请填写邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              autocomplete="off"
              type="password"
              placeholder="请填写用户登录密码"
            />
          </el-form-item>
          <el-form-item class="submit">
            <el-button type="primary" @click="throttleLogin()">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
import User from "@/models/user";
import Utils from "@/lin/utils/util";

export default {
  data() {
    // 验证回调函数
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不能少于6位数"));
      } else {
        callback();
      }
    };
    return {
      wait: 3000, // 3000ms之内不能重复发起请求
      throttleLogin: null, // 节流登录
      form: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            validator: validatePassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    async login() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            await User.getToken(this.form);
            // 尝试获取当前用户信息
            const user = await User.getInformation(this.form);
            this.setUserAndState(user);
            this.$router.push("/");
            this.$message.success("登录成功");
          } catch (error) {
            this.$message.error(error.data.msg);
            console.log(error);
          }
        }
      });
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    ...mapActions(["setUserAndState"]),
    ...mapMutations({
      setUserAuths: "SET_USER_AUTHS"
    })
  },
  created() {
    // 节流登录
    this.throttleLogin = Utils.throttle(this.login, this.wait);
  }
};
</script>
<style lang="scss">
.page-login {
  .login-header {
    position: relative;
    width: 980px;
    height: auto;
    margin: 40px auto 30px;
    .logo {
      background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-retina.b95a7dd.png);
      background-position: 0 !important;
      background-size: contain !important;
      width: 82px;
      height: 54px;
      display: block;
    }
  }
  .login-panel {
    margin: 0 auto 70px;
    width: 980px;
    display: flex;
    .banner {
      margin-right: 115px;
    }
    .form {
      display: flex;
      flex-direction: column;
      width: 300px;
      h4 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 20px;
      }
    }
  }
}
</style>
