<template>
    <div id="contentDiv">
      <div id="rightDiv">
        <div><img src="../assets/login1.png"><hr></div>
        <div id="loginDiv">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" style="width: 250px">
                <el-form-item label="账号" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
                </el-form-item>
                <div class="login-code" @click="refreshCode">
                  <s-identify :identifyCode="identifyCode"></s-identify>
                </div>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="ruleForm.code"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
              </el-form>
          <router-link to="/register" style="margin-left: 150px">免费注册</router-link>
          <router-link to="">忘记密码</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import SIdentify from './sidentify'
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
      } else if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
        callback(new Error('请输入6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种'))
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
      identifyCodes: '1234567890',
      identifyCode: '',
      ruleForm: {
        userName: '',
        pwd: '',
        code: ''
      },
      rules: {
        userName: [
          {validator: accCheck, trigger: 'blur'}
        ],
        pwd: [
          {validator: pwdCheck, trigger: 'blur'}
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

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.ruleForm).then(response => {
            if (response.data.result) {
              this.$message.success('登录成功!')
              sessionStorage.setItem('userName', response.data.userList.userName)
              sessionStorage.setItem('name', response.data.userList.name)
              sessionStorage.setItem('sex', response.data.userList.sex)
              sessionStorage.setItem('addr', response.data.userList.addr)
              sessionStorage.setItem('birthday', response.data.userList.birthday)
              sessionStorage.setItem('ifLogin', true)
              this.$router.push({path: '/index'})
            } else {
              this.$message.error('登录失败!')
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  a:hover{
    background-color: antiquewhite;
  }
  .login-code{
    cursor: pointer;
    margin-top: -10px;
  }
  #contentDiv{
    width: 1528px;
    height: 704px;
    background-image: url("../assets/login.png");
  }
  #rightDiv{
    margin-left: 1040px;
    position: absolute;
    margin-top: 180px;
    background-color: white;
  }
  #loginDiv{
    width: 300px;
    height: 300px;
    margin: 20px 0px 0px 20px;
  }
  #loginDiv button{
    width: 120px;
    margin-left: -25px;
  }
</style>
