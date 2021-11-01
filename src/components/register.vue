<template>
  <div id="contentDiv">
    <div id="rightDiv">
      <div><img src="../assets/login1.png"><hr></div>
    <div id="registerDiv">
      <h4>用户注册</h4>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="width: 320px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
        </el-form-item>
        <el-form-item type="password" label="确认密码" prop="rePwd">
          <el-input v-model="ruleForm.rePwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idNumber">
          <el-input v-model="ruleForm.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-cascader :options="options" v-model="ruleForm.selectedOptions" @change="handleChange"></el-cascader>
        </el-form-item >
        <div class="login-code" @click="refreshCode">
          <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" style="margin:0px 10px 0px -30px">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div><span style="font-size: 14px">完成此注册,即表明您同意了我们的</span><el-link type="danger" style="margin-bottom: 11px;margin-top: 7px;">&nbsp;使用条款和隐私政策</el-link></div>
    <router-link to="/login" style="text-decoration: none;margin: 15px 0px 0px 230px">已有账号</router-link>
    </div>
  </div>
</template>

<script>
import SIdentify from './sidentify'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  // name: ''
  components: {SIdentify},
  data () {
    var accCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      }
      if (value.length < 2 && value.length > 20) {
        callback(new Error('账号必须为2-20个字符'))
      } else {
        callback()
      }
    }
    var pwdCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
        callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
      } else {
        callback()
      }
    }
    var rePwdCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入确认密码'))
      } else if (this.ruleForm.pwd !== value) {
        callback(new Error('确认密码错误'))
      } else {
        callback()
      }
    }
    var IDNumberCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证不能为空'))
      } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error('请输入正确的二代身份证号码'))
      } else {
        callback()
      }
    }
    var codeCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      } else if (this.identifyCode !== value) {
        callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    return {
      options: regionData,
      identifyCodes: '1234567890',
      identifyCode: '',
      ruleForm: {
        userName: '',
        pwd: '',
        rePwd: '',
        idNumber: '',
        selectedOptions: []
      },
      rules: {
        userName: [
          { validator: accCheck, trigger: 'blur' }
        ],
        pwd: [
          { validator: pwdCheck, trigger: 'blur' }
        ],
        rePwd: [
          { validator: rePwdCheck, trigger: 'blur' }
        ],
        idNumber: [
          { validator: IDNumberCheck, trigger: 'blur' }
        ],
        addr: [
          {}
        ],
        code: [
          {validator: codeCheck, trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  created () {
    this.refreshCode()
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        // eslint-disable-next-line standard/computed-property-even-spacing
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },

    handleChange (val) {
      // 将区域码转换成汉字
      this.ruleForm.addr = CodeToText[val[0]] + CodeToText[val[1]] + CodeToText[val[2]]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/register', this.ruleForm).then(response => {
            if (response.data) {
              this.$message.success('注册成功!')
              this.$router.push({path: '/login'})
            } else {
              this.$message.error('注册失败!')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .login-code{
    cursor: pointer;
    margin: -10px 0px 0px 30px;
  }
  #contentDiv{
    width: 1528px;
    height: 704px;
    background-image: url("../assets/register.png");
  }
  #rightDiv{
    width: 500px;
    height: 650px;
    margin-left: 950px;
    position: absolute;
    margin-top: 30px;
    background-color: white;
  }
  #registerDiv{
    margin: 50px 85px 10px 50px;
  }
  h4{
    margin: -32px 0px 19px 40px;
  }
  a:hover{
    background-color: aquamarine;
  }
</style>
