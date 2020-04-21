<template>
  <div class="page-index">
    <el-row class="main">
      <el-col :span="5">
        <el-menu :span="12">
          <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
            <el-menu-item index="basic" @click="goto('/setting?type=basic')">
              <i class="el-icon-setting"></i>
              <span slot="title">基本资料</span>
            </el-menu-item>
            <el-menu-item index="password" @click="goto('/setting?type=password')">
              <i class="el-icon-lock"></i>
              <span slot="title">修改密码</span>
            </el-menu-item>
          </el-menu>
        </el-menu>
      </el-col>
      <el-col :span="19">
        <div class="basic" v-if="isBasic">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            class="demo-ruleForm"
            label-width="80px"
            autocomplete="off"
          >
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="form.nickname"
                autocomplete="off"
                size="small"
                maxlength="10"
                show-word-limit
                placeholder="请填写昵称"
              />
            </el-form-item>
            <el-form-item label="居住地">
              <el-cascader
                size="large"
                :options="options"
                v-model="city"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="保密" value="保密"></el-option>
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                type="textarea"
                v-model="form.introduce"
                :autosize="{ minRows: 3, maxRows: 5}"
                maxlength="100"
                show-word-limit
                placeholder="请填写一段个人简介，长度可达100个字，简介将显示在你的个人页上。"
              ></el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="save()">保 存</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="password" v-else>
          <div style="text-align: center;">
            <el-form
              :model="passwordForm"
              status-icon
              :rules="passwordRules"
              label-position="left"
              ref="passwordForm"
              label-width="90px"
              @submit.native.prevent
            >
              <el-form-item label="原始密码" prop="old_password">
                <el-input type="password" v-model="passwordForm.old_password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="new_password">
                <el-input type="password" v-model="passwordForm.new_password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirm_password" label-position="top">
                <el-input type="password" v-model="passwordForm.confirm_password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('passwordForm')">保存</el-button>
                <el-button @click="resetForm('passwordForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { provinceAndCityData } from "element-china-area-data";
import {
  CodeToText,
  TextToCode
} from "element-china-area-data/dist/app.js";
import User from "@/models/user";
import defaultAvatar from "@/assets/img/user/user.png";

export default {
  data() {
    const oldPassword = (rule, value, callback) => {
      // eslint-disable-line
      if (!value) {
        return callback(new Error('原始密码不能为空'))
      }
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        if (this.passwordForm.checkPassword !== '') {
          this.$refs.passwordForm.validateField('confirm_password')
        }
        callback()
      }
    }
    const validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        nickname: '',
        city: '',
        sex: '',
        introduce: ''
      },
      city: '',
      rules: {
        nickname: [
          {
            required: true,
            message: "昵称不能为空",
            trigger: ["blur", "change"]
          }
        ]
      },
      passwordForm: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      passwordRules: {
        old_password: [{ validator: oldPassword, trigger: 'blur', required: true }],
        new_password: [{ validator: validatePassword, trigger: 'blur', required: true }],
        confirm_password: [{ validator: validatePassword2, trigger: 'blur', required: true }],
      },
      defaultAvatar,
      options: provinceAndCityData
    };
  },
  methods: {
    ...mapActions(["loginOut"]),
    goto(path) {
      this.$router.push({
        path
      });
    },
    handleChange(value) {
      this.form.city = CodeToText[value[0]] + ' ' + CodeToText[value[1]];
      // console.log(this.form.city);
    },
    async save() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            // 保存当前用户信息，并返回User实例
            await User.changeInformation(this.form);
            const user = await User.getInformation();
            // console.log(user);
            this.setUserAndState(user);
            this.$message.success("保存成功");
          } catch (error) {
            // console.log(error);
            this.$message.error(error.data.msg);
          }
        }
      });
    },
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.form.id = user.id;
        // this.avatar = user.avatar ? user.avatar : defaultAvatar;
        this.form.nickname = user.nickname;
        var arr = user.city.split(/[ ]+/);//以空格分开
        this.city = TextToCode[arr[0]][arr[1]].code;
        // console.log(this.city)
        this.form.sex = user.sex;
        this.form.introduce = user.introduce;
      }
    },
    submitForm(formName) {
      if (this.passwordForm.old_password === this.passwordForm.new_password) {
        this.$message.error('新密码不能与原始密码一样')
        return
      }
      this.$refs[formName].validate(async valid => {
        // eslint-disable-line
        if (valid) {
          try {
            const res = await User.updatePassword(this.passwordForm)
            this.$message.success(`${res.msg}`)
            this.resetForm(formName)
            setTimeout(() => {
              this.loginOut()
              const { origin } = window.location
              window.location.href = origin
            }, 1000)
          } catch (error) {
            // console.log('error!!')
            this.$message.error(error.data.msg)
          }
        } else {
          // console.log('error submit!!')
          this.$message.error('请填写正确的信息')
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    ...mapActions(["setUserAndState"])
  },
  computed: {
    ...mapGetters(["user"]),
    defaultActive() {
      return this.$route.query.type;
    },
    isBasic() {
      if (this.$route.query.type === "password") {
        return false;
      } else if (this.$route.query.type === "basic") {
        return true;
      } else {
        return true;
      }
    }
  },
  created() {
    this.init();
  },
  watch: {
    cropVisible(val) {
      if (!val) {
        this.$refs.croppa.remove();
        this.cropImg = "";
        this.imgInfo = null;
      }
    }
  }
};
</script>
<style lang="scss">
.page-index {
  position: relative;
  margin-top: 10px;
  .main {
    margin-top: 50px;
    .basic {
      width: 400px;
      margin-left: 100px;
    }
    .password {
      width: 400px;
      margin-left: 100px;
    }
  }
}
</style>