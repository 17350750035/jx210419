<template>
  <div id="allDiv">
    <div id="contentDiv">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/selfInfor'}">个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="leftDiv">
      <div id="leftDivTop">
          <img src="../assets/selfInfor1.png"><br>
        <router-link to="">[羊羊羊]</router-link><router-link to="login">[退出登录]</router-link>
          </div>
      <div id="left1">
        <ul>
          <li><router-link to="" class="aTitle">我的交易</router-link>
            <ul id="myShop">
                <li><router-link to="goods">商品管理</router-link></li>
                <li><router-link to="" style="margin-left: 16px;">我的购物车</router-link></li>
                <li><router-link to="">我的订单</router-link></li>
                <li><router-link to="">评价晒单</router-link></li>
            </ul>
          <li><router-link to="" class="aTitle">个人中心</router-link></li>
            <ul id="myInfor">
                <li><router-link to="/selfInfor">我的中心</router-link></li>
                <li><router-link to="">地址管理</router-link></li>
            </ul>
          <li><router-link to="" class="aTitle">账户管理</router-link></li>
            <ul id="accManage">
                <li><router-link to="">个人中心</router-link></li>
                <li><router-link to="">个人信息</router-link></li>
                <li><router-link to="">修改密码</router-link></li>
            </ul>
        </ul>
      </div>
    </div>
    <div id="right">
      <div><h3>个人信息</h3><br><hr>
        <div id="selfImgDiv"><img src="../assets/selfInfor1.png"><br><a href="#">修改密码</a></div>
        <div id="selfInforDiv">
            <span class="aTitle" style="margin-left: 0px;">基础资料</span>
            <el-button type="text" style="margin-left: 270px" @click="updateInfor">修改</el-button><hr>
            姓名:<span>{{name}}</span><hr>
            生日:<span>{{birthday}}</span><hr>
            性别:<span>{{sex}}</span><hr>
            <h4>高级设置</h4><hr>
            账号地区:<span>{{addr}}</span><el-button type="text" @click="updateInfor" style="margin-left: 160px">修改</el-button><hr>
        </div>
      </div>
    </div>
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="420px" top="100px">
             <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
               <el-form-item label="昵称:" label-width="60px" prop="userName" style="display: none">
                 <el-input v-model="ruleForm.userName" auto-complete="off"></el-input>
               </el-form-item>
                 <el-form-item label="用户名:" label-width="60px" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="生日:" label-width="60px" prop="birthday">
                    <el-input v-model="ruleForm.birthday" auto-complete="off"></el-input>
                 </el-form-item>
                 <el-form-item label="性别:" label-width="60px" prop="sex">
                   <el-radio-group v-model="ruleForm.sex">
                     <el-radio label="男"></el-radio>
                     <el-radio label="女"></el-radio>
                   </el-radio-group>
                 </el-form-item>
                 <el-form-item label="地址:" label-width="60px" prop="addr">
                    <el-input v-model="ruleForm.addr" auto-complete="off"></el-input>
                 </el-form-item>
             </el-form>
           <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="reNewSelf('ruleForm')">更 新</el-button>
             <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
     </el-dialog>
    </div>
</template>

<script>
export default {
  // name: '',
  data () {
    return {
      name: sessionStorage.getItem('name'),
      birthday: sessionStorage.getItem('birthday'),
      sex: sessionStorage.getItem('sex'),
      addr: sessionStorage.getItem('addr'),

      dialogFormVisible: false,
      ruleForm: {
        name: '',
        birthday: '',
        sex: '',
        addr: '',
        userName: ''
      },
      titleMap: {
        updateInfor: '修改个人信息'
      },
      dialogStatus: '',

      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请输入生日日期', trigger: 'blur'},
          {min: 10, max: 10, message: '请输入正确的格式，例如：2021-02-30', trigger: 'blur'}
        ],
        addr: [
          {required: true, message: '请输入地址', trigger: 'blur'},
          {min: 2, max: 100, message: '至少要写出省份', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    updateInfor () {
      this.ruleForm.name = this.name
      this.ruleForm.userName = sessionStorage.getItem('userName')
      this.ruleForm.birthday = this.birthday
      this.ruleForm.sex = this.sex
      this.ruleForm.addr = this.addr
      this.dialogFormVisible = true
      this.dialogStatus = 'updateInfor'
    },
    reNewSelf (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/updateSelf', this.ruleForm).then(response => {
            if (response.data) {
              this.$message.success('修改成功!')
              this.name = this.ruleForm.name
              this.birthday = this.ruleForm.birthday
              this.sex = this.ruleForm.sex
              this.addr = this.ruleForm.addr
              sessionStorage.setItem('user', response.data.userList)
              this.dialogFormVisible = false
            } else {
              this.$message.error('修改失败!')
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
  #allDiv{
    width: 1528px;
    height: 850px;
    background-color: beige;
  }
  a{
    text-decoration: none;
    color: black;
  }
  a:hover{
    color: burlywood;
  }
  ul{
    list-style: none;
    margin-left: -42px;
  }
  #leftDiv{
    width: 190px;
    height: 640px;
    float: left;
    margin-top: 30px;
    margin-left: 180px;
    background-color: white;
  }
  #leftDivTop{
    width: 175px;
    height: 150px;
    margin-left: 2px;
    padding-top: 20px;
  }
  #leftDivTop img{
    margin-left: 9px;
    margin-bottom: 10px;
  }
  #left1{
    margin-top: 40px;
    line-height: 35px;
  }

  #contentDiv{
    height: 20px;
    padding: 28px 0px 0px 182px;
  }
  #selfImgDiv{
    width: 130px;
    height: 200px;
    float: left;
    margin: 140px;
    text-align: center;
  }
  #selfImgDiv img{
    margin-bottom: 10px;
  }
  #right{
    width: 853px;
    height: 640px;
    background-color: white;
    margin-left: 419px;
    padding-top: 1px;
    margin-top: 30px;
  }
  #selfInforDiv{
    width: 400px;
    height: 400px;
    margin-left: 390px;
    margin-top: 56px;
    line-height: 40px;
    text-align: left;
  }
  #selfInforDiv span{
    margin-left: 10px;
  }
  h3{
    margin: 25px 0px 0px 37px;
  }
  h4{
    margin: 25px 0px 0px 0px;
  }
  .aTitle{
    font-weight: bold;
  }
  hr{
    margin-top: 5px;
  }
</style>
