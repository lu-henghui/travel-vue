<template>
  <div class="lin-container" v-if="isNote">
    <div class="lin-title">发布游记</div>
    <span>正文长度可达6000个字</span>
    <el-button @click="goBack">返回</el-button>

    <div class="lin-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="image">
          <upload-imgs ref="uploadEle" :width="240" :height="160" fit="cover" :rules="imageRules" :max-num="1" />
        </el-form-item>
        <tinymce v-model="ruleForm.text" @change="change" upload_url="http://dev.lin.colorful3.com/cms/file/" />
        <el-button type="primary" @click="saveForm('ruleForm')">存为云端草稿</el-button>
        <el-button type="primary" @click="postNote('ruleForm')">发布</el-button>
      </el-form>
    </div>
  </div>
  <div class="lin-container" v-else>
    <div class="lin-title">发布攻略</div>
    <span>正文长度可达6000个字</span>
    <el-button @click="goBack">返回</el-button>

    <div class="lin-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="image">
          <upload-imgs ref="uploadEle" :width="240" :height="160" fit="cover" :rules="imageRules" :max-num="1" />
        </el-form-item>
        <tinymce v-model="ruleForm.text" upload_url="http://dev.lin.colorful3.com/cms/file/" />
        <el-button type="primary" @click="saveForm('ruleForm')">存为云端草稿</el-button>
        <el-button type="primary" @click="postGuide('ruleForm')">发布</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadImgs from '@/components/base/upload-imgs'
import Tinymce from "@/components/base/tinymce";
import Note from "@/models/note"

export default {
  data () {
    return {
      ruleForm: {
        title: '',
        img: '',
        text: ''
      },
      isNote: '',
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      },
      imageRules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5
      }
    };
  },
  created () {
    this.init();
  },
  components: {
    UploadImgs,
    Tinymce
  },
  methods: {
    init () {
      if (this.$route.query.type === "note") {
        this.isNote = true;
      } else {
        this.isNote = false;
      }
    },
    postNote (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const list = await this.$refs.uploadEle.getValue()
          // console.log(list)
          this.ruleForm.img = list[0].src
          const res = await Note.addNote(this.ruleForm)
          console.log(res)
          if (res.error_code === 0) {
            this.$message.success(`${res.msg}`)
            setTimeout(() => {
              this.$router.push('/note')
            }, 1000)
          }else {
            console.log('error!!')
            this.$message.error(`${res.msg}`)
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveForm (formName) {
      console.log("saveForm" + formName);
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    change(val) {
      this.ruleForm.text = val;
      // console.log(val)
    },
  }
};
</script>

<style scoped lang="scss"></style>
