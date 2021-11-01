<template>
  <div id="allDiv">
    <div id="contentDiv">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/selfInfor'}">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
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
      <div><h3>商品管理</h3><br><hr>
        <el-input placeholder="请输入名称" v-model="nameInput" clearable style="width: 140px; margin: 10px 20px"></el-input>
        <el-button type="success" round @click="selectName">查询</el-button>
        <div id="goodsTable" style="margin:0px 20px 0px 20px">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column label="编号" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsId }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图片" width="140">
                <template slot-scope="scope">
                  <el-image style="width: 120px; height: 120px" :src="scope.row.goodsImg" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="130">
              <template slot-scope="scope">
                <span>{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="130">
              <template slot-scope="scope">
                <span>{{ scope.row.goodsType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" width="130">
              <template slot-scope="scope">
                <span>{{scope.row.goodsMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.goodsId)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
        </div>
        <div class="block" style="margin-top: 40px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5, 15, 25, 35]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total" background></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" center width="480px" top="100px">
      <div id="updateTable">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
          <el-form-item label="编号" prop="goodsId">
            <el-input v-model="ruleForm.goodsId" disabled></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="goodsImg">
            <el-upload class="upload-demo" ref="upload" action="api/upload" :on-success="success" :on-change="onChange" :file-list="fileList" list-type="picture" :show-file-list="true" :auto-upload="false" >
              <img :src="ruleForm.goodsImg" width="120px" height="120px">
            </el-upload>
          </el-form-item>
          <el-form-item label="名称" prop="goodsName">
            <el-input v-model="ruleForm.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="goodsType">
            <el-input v-model="ruleForm.goodsType"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="goodsMoney">
            <el-input v-model="ruleForm.goodsMoney"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
            <el-button @click="cancel()">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nameInput: '',
      tableData: [],
      page: 1,
      size: 5,
      total: 0,
      fileList: [],
      dialogFormVisible: false,
      ruleForm: {
        goodsId: '',
        goodsName: '',
        goodsType: '',
        goodsMoney: '',
        goodsImg: ''
      },
      titleMap: {
        updateInfor: '修改商品信息'
      },
      dialogStatus: '',
      formLabelWidth: '60px',

      rules: {
        goodsId: [],
        goodsName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        goodsType: [
          {required: true, message: '请输入商品类型', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        goodsMoney: [
          {required: true, message: '请输入商品价格', trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () { // 默认第一次加载
    goodsTable(this)
  },
  methods: {
    success (response, file, fileList) {
      console.log(response)
      console.log(response.data)
      // this.$refs.upload.submit() // 上传
    },
    // 点击图片后
    onChange (file, fileList) {
      // this.fileList = [file]
      // this.ruleForm.goodsImg = this.fileList[0].url
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
        this.ruleForm.goodsImg = this.fileList[0].url
      }
    },
    // 每页的数量
    handleSizeChange (val) {
      this.size = val
      if (ifSelect(this)) {
        goodsTableBy(this)
      } else {
        goodsTable(this)
      }
    },
    // 切换页码时，val等于当前页码
    handleCurrentChange (val) {
      this.page = val
      if (ifSelect(this)) {
        goodsTableBy(this)
      } else {
        goodsTable(this)
      }
    },
    // 查询
    selectName () {
      if (this.nameInput !== '') {
        goodsTableBy(this)
      }
    },
    // 修改按钮，弹出修改框
    handleEdit (row) {
      this.dialogFormVisible = true
      this.ruleForm.goodsId = row.goodsId
      this.ruleForm.goodsName = row.goodsName
      this.ruleForm.goodsType = row.goodsType
      this.ruleForm.goodsMoney = row.goodsMoney
      this.ruleForm.goodsImg = row.goodsImg
      this.dialogStatus = 'updateInfor'
    },
    // 删除按钮
    handleDelete (goodsId) {
      this.$confirm('确认要删除该商品信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.post('/deleteGoods', {
          goodsId: goodsId
        }).then(response => {
          if (response.data) {
            this.dialogFormVisible = false
            this.$message.success('删除成功!')
            goodsTable(this)
          } else {
            this.$message.error('删除失败!')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.dialogFormVisible = false
      })
    },
    // 修改按钮
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/updateGoods', this.ruleForm).then(response => {
            if (response.data) {
              this.$refs.upload.submit() // 上传
              this.$message.success('修改成功!')
              goodsTable(this)
              this.dialogFormVisible = false
              // this.fileList = []
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
    },
    cancel () {
      this.dialogFormVisible = false
    }
  }
}
// 商品列表
function goodsTable ($this) {
  $this.$axios.post('/goodsTable', {
    page: $this.page,
    limit: $this.size
  }).then(response => {
    if (response.data.goodsList.length > 0) {
      $this.tableData = response.data.goodsList
      $this.total = response.data.count
    } else {
      this.$message.error('数据为空!')
    }
  }).catch(err => {
    console.log(err)
  })
}
// 查询后的商品列表
function goodsTableBy ($this) {
  $this.$axios.post('/selectGoods', {
    goodsName: $this.nameInput,
    page: $this.page,
    limit: $this.size
  }).then(response => {
    if (response.data.goodsList.length > 0) {
      // $this.tableData = response.data.goodsList
      $this.total = response.data.count
    } else {
      this.$message.error('数据为空!')
    }
  }).catch(err => {
    console.log(err)
  })
}

// 是否在查询
function ifSelect ($this) {
  var goodsName = $this.nameInput
  if (goodsName === '' || goodsName === null) {
    return false
  } else {
    return true
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
  #selfImgDiv img{
    margin-bottom: 10px;
  }
  #right{
    width: 900px;
    height: 640px;
    background-color: white;
    margin-left: 419px;
    padding-top: 1px;
    margin-top: 30px;
  }
  #selfInforDiv span{
    margin-left: 10px;
  }
  h3{
    margin: 25px 0px 0px 0px;
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
  #updateTable{
    width: 350px;
  }
  #updateTable button{
    margin: 20px 20px 0px 15px;
    width: 90px;
  }
</style>
