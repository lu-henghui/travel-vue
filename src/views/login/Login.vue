<template>
  <div class="login">
    <el-button type="primary" icon="el-icon-s-home" @click="toMain">返回首页</el-button>
    <div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
      <div class="title">
        <h1>账号登录
          <el-button class="pull-right" @click="toRegister">注 册</el-button>
        </h1>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="70px" class="demo-ruleForm" autocomplete="off">
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
          <router-link class="pull-right" to="/forget"><i class="el-icon-question">忘记密码</i></router-link>
        </el-form-item>
      </el-form>
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
      loading: false,
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
    toRegister() {
      this.$router.push({path: '/register'})
    },
    toMain() {
      this.$router.push({path: '/main'})
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    toForget() {
      this.$router.push({path: '/forget'})
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
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login/login-ba.jpg') no-repeat center center fixed;
  background-size: cover;

  .form-box {
    position: fixed;
    left: 25%;
    top: 40%;
    background-color: #efefef;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 15px 35px 10px;

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
