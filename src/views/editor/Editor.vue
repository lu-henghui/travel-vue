<template>
  <div class="lin-container">
    <div class="lin-title">发布{{topName}}</div>
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
        <el-form-item label="封面图片" prop="img">
          <upload-imgs ref="uploadEle" :width="240" :height="160" fit="cover" :rules="imageRules" :max-num="1" />
        </el-form-item>
        <el-form-item label="关联旅游地" prop="arounds">
          <el-select
            v-model="ruleForm.arounds"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <tinymce v-model="ruleForm.text" @change="change" upload_url="http://dev.lin.colorful3.com/cms/file/" />
        <!-- <el-button type="primary" @click="saveForm('ruleForm')">存为云端草稿</el-button> -->
        <el-button type="primary" @click="post('ruleForm')">发布</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadImgs from '@/components/base/upload-imgs'
import Tinymce from "@/components/base/tinymce";
import Note from "@/models/note"
import Guide from "@/models/guide"
import Scenics from "@/models/scenics"

export default {
  data () {
    return {
      ruleForm: {
        title: '',
        img: '',
        arounds: '',
        text: ''
      },
      name: '',
      topName: '',
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
      },
      imageRules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5
      },
      options: [],
      value: [],
      list: [],
      loading: false,
    };
  },
  async created () {
    this.init();
    this.list = await Scenics.getAllScenics();
  },
  components: {
    UploadImgs,
    Tinymce
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.name
              .indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    init () {
      if (this.$route.query.type === "note") {
        this.name = 'note';
        this.topName = '游记';
      } else if  (this.$route.query.type === "guide") {
        this.name = 'guide';
        this.topName = '攻略';
      }
    },
    post (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res
          let list = await this.$refs.uploadEle.getValue()
          // console.log(list)
          this.ruleForm.img = list[0].src
          try {
            if( this.name === 'note'){
              res = await Note.addNote(this.ruleForm)
            }else if ( this.name === 'guide'){
              res = await Guide.addGuide(this.ruleForm)
            }
            console.log(res)
            this.$message.success(`${res.msg}`)
            setTimeout(() => {
              this.$router.push('/'+ this.name)
            }, 1000)
          } catch (error) {
            console.log(error)
            this.$message.error(error.data.msg);
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
