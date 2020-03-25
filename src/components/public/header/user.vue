<template>
  <div class="m-user clearfix">
    <template v-if="isUser">
      <el-dropdown>
        <span class="el-dropdown-link clearfix">
          <div class="nav-avatar">
            <router-link :to="'/user/'+user.id">
              <img :src="user.avatar || defaultAvatar" alt="头像" />
            </router-link>
          </div>
          <router-link class="uname mr10" :to="'/user/'+user.id">{{ nickname }}</router-link>
        </span>
        <el-dropdown-menu slot="dropdown" class="user-box">
          <div class="user-info">
            <div class="avatar" title="点击修改头像">
              <img :src="user.avatar || defaultAvatar" alt="头像" />
              <label class="mask">
                <i class="iconfont iconeditor" style="font-size: 20px;"></i>
                <input ref="avatarInput" type="file" accept="image/*" @change="fileChange" />
              </label>
            </div>
            <div class="text">
              <router-link class="username" :to="'/user/'+user.id">{{ nickname }}</router-link>
            </div>
            <img src="../../../assets/img/user/corner.png" class="corner" />
            <div class="info">
              <div class="username">{{ user.email }}</div>
            </div>
          </div>
          <ul class="dropdown-box">
            <li class="basic" @click="toBasic">
              <i class="iconfont iconset"></i>
              <span>修改基本资料</span>
            </li>
            <li class="password" @click="toPassword">
              <i class="iconfont iconunlock"></i>
              <span>修改登录密码</span>
            </li>
            <li class="account" @click="outLogin">
              <i class="iconfont iconswitch"></i>
              <span>退出账户</span>
            </li>
          </ul>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 修改头像 -->
      <el-dialog
        title="裁剪"
        :visible.sync="cropVisible"
        width="300px"
        :append-to-body="true"
        :close-on-click-modal="false"
        custom-class="croppa-dialog"
        center
      >
        <div style="text-align: center;">
          <div class="avatar-croppa-container">
            <croppa
              ref="croppa"
              :width="cropRule.width"
              :height="cropRule.height"
              :placeholder="'loading'"
              :zoom-speed="30"
              :disable-drag-and-drop="false"
              :show-remove-button="false"
              :prevent-white-space="true"
              :disable-click-to-choose="false"
              :disable-scroll-to-zoom="false"
              :show-loading="true"
              :quality="quality"
              :initial-image="cropImg"
            >
            </croppa>
          </div>
          <div style="margin-top: 1em;">通过鼠标滚轮调节头像大小</div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cropVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="handleCrop" size="small">确 定</el-button>
        </div>
      </el-dialog>
    </template>
    <template v-else>
      <ul class="clearfix">
        <li>
          <router-link class="login" to="/login">登录</router-link>
        </li>
        <li>
          <router-link class="register" to="/register">注册</router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Vue from 'vue'
import Croppa from 'vue-croppa'
import User from "@/models/user";
import 'vue-croppa/dist/vue-croppa.css'
import defaultAvatar from "@/assets/img/user/user.png";

Vue.use(Croppa)

const width = 150
const height = 150

export default {
  data() {
    return {
      cropRule: {
        width,
        height,
      },
      imgRule: {
        minWidth: width,
        minHeight: height,
      },
      nickname: "",
      isUser: false,
      defaultAvatar,
      cropVisible: false,
      cropImg: '',
      croppa: {},
      imgInfo: null,
      quality: 1, 
    };
  },
  methods: {
    ...mapActions(["loginOut", "setUserAndState"]),
    fileChange(evt) {
      if (evt.target.files.length !== 1) {
        return
      }
      const imgFile = evt.target.files[0]
      // 验证文件大小是否符合要求, 不大于 5M
      if (imgFile.size > 1024 * 1024 * 5) {
        this.$message.error('文件过大超过5M')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
        return
      }

      // 验证图像是否符合要求
      const imgSrc = window.URL.createObjectURL(imgFile)
      const image = new Image()
      image.src = imgSrc
      image.onload = () => {
        const w = image.width
        const h = image.height
        if (w < 50) {
          this.$message.error('图像宽度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        if (h < 50) {
          this.$message.error('图像高度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        // 验证通过, 打开裁剪框
        this.cropImg = imgSrc
        this.cropVisible = true
        if (this.$refs.croppa) {
          this.$refs.croppa.refresh()
        }
      }
      image.onerror = () => {
        this.$message.error('获取本地图片出现错误, 请重试')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
      }
    },
    async handleCrop() {
      // 获取裁剪数据
      const blob = await this.$refs.croppa.promisedBlob('image/jpeg', 0.8)
      // 构造为文件对象
      const file = new File([blob], 'avatar.jpg', {
        type: 'image/jpeg',
      })

      return this.$axios({
        method: 'post',
        url: '/v1/file',
        data: {
          file,
        },
      }).then(res => {
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
        if (!Array.isArray(res) || res.length !== 1) {
          this.$message.error('头像上传失败, 请重试')
          return false
        }
        // TODO: 错误码处理
        // if (res.error_code === 10110) {
        //   throw new Error('文件体积过大')
        // }
        return this.$axios({
          method: 'put',
          url: '/v1/user/avatar',
          data: {
            avatar: res[0].path,
          },
        })
          .then(putRes => {
            // eslint-disable-line
            if (putRes.error_code === 0) {
              this.$message({
                type: 'success',
                message: '更新头像成功',
              })
              this.cropVisible = false
              // 触发重新获取用户信息
              return User.getInformation()
            }
            return Promise.reject(new Error('更新头像失败'))
          })
          .then(infoRes => {
            // eslint-disable-line
            // 尝试获取当前用户信息
            const user = infoRes
            this.setUserAndState(user)
          })
      })
    },
    init() {
      const { user } = this.$store.state;
      if (user) {
        this.isUser = true;
        this.nickname = user.nickname ? user.nickname : "佚名";
      }
    },
    outLogin() {
      this.loginOut();
      window.location.reload(true);
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    toBasic() {
      this.$router.push({ path:'/setting?type=basic'});
    },
    toPassword() {
      this.$router.push({ path:'/setting?type=password'});
    },
    clearFileInput(ele) {
      // eslint-disable-next-line
      ele.value = ''
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["user"])
  },
  watch: {
    cropVisible(val) {
      if (!val) {
        this.$refs.croppa.remove()
        this.cropImg = ''
        this.imgInfo = null
      }
    },
  }
};
</script>
<style lang="scss">
.m-user {
  line-height: 60px;
  height: 60px;
  color: #fff;
  .el-dropdown-link {
    cursor: pointer;
    .nav-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      float: left;
      margin-top: 10px;
    }
    .uname {
      float: left;
      color: #fff;
      font-size: 16px;
    }
  }
  ul {
    height: 40px;
    > li {
      float: left;
      width: 60px;
      box-sizing: border-box;
      text-align: center;
      a {
        color: #fff;
      }
      &:hover {
        background-color: #6b9058;
      }
    }
  }
}

.user-box {
  width: 326px;
  background-color: none;
  background: transparent;
  margin-bottom: 0;
  padding-bottom: 0;
  border: none;

  .user-info {
    background-image: url("../../../assets/img/user/user-bg.png");
    background-size: 100% 100%;
    transform: translateY(-10px);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    display: flex;
    flex-direction: row;
    padding: 35px 20px 25px 30px;
    z-index: 100;
    position: relative;

    .corner {
      position: absolute;
      right: 18px;
      top: -9px;
      width: 27px;
      height: 10px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      position: relative;

      .mask {
        opacity: 0;
        transition: all 0.2s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: white;

        input {
          display: none;
        }
      }

      &:hover {
        .mask {
          opacity: 1;
        }
      }
    }

    .text {
      margin-left: 20px;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .username {
        margin-bottom: 10px;
        font-size: 16px;
        cursor: pointer;
      }

      .desc {
        font-size: 14px;
        color: rgba(222, 226, 230, 1);
      }
    }

    .info {
      position: absolute;
      bottom: 10px;
      right: 10px;
      display: flex;
      color: #fff;
      font-size: 14px;
      height: 20px;
      line-height: 20px;

      .mid {
        padding: 0 5px;
      }
    }
  }

  .dropdown-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 35px;
    height: 122px;
    color: #596c8e;
    font-size: 14px;
    background: white;
    margin-top: -10px;

    li {
      cursor: pointer;
      margin-bottom: 20px;

      &:nth-child(1) {
        margin-top: 20px;
      }

      i {
        margin-right: 10px;
      }

      &:hover {
        color: #3963bc !important;

        i {
          color: #3963bc !important;
        }
      }
    }
  }
}

.popper__arrow {
  display: none !important;
}

.avatar-croppa-container {
  display: inline-block;
  border-color: #3862bc;
  border-style: dashed;
  font-size: 0;
  border-width: 2px;
}
</style>
