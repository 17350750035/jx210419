<template>
  <div>
    <div id="topDiv" style="background-color:white">
      <div id="leftImag"><img src="../assets/login1.png"></div>
      <div>
        <div id="loginArea">
          <div v-if="seen">
              <span>欢迎您，</span><router-link to="selfInfor">{{name}}</router-link>
              <el-divider direction="vertical"></el-divider>
              <el-link @click="cancelLogin">退出</el-link>
          </div>
          <div v-else>
              <router-link to="login">登录</router-link>
              <el-divider direction="vertical"></el-divider>
              <router-link to="register">注册</router-link>
          </div>
        </div>
        <div id="selectDiv">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="selectInput" style="width: 150px"></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div id="topIconDiv">
          <el-button type="text" icon="el-icon-user" class="iconClass1" @click="toSelfInfor()"></el-button>
          <el-button type="text" icon="el-icon-s-grid" class="iconClass1"></el-button>
          <el-button type="text" icon="el-icon-shopping-cart-2" class="iconClass1"></el-button>
        </div>
      </div>
      <div id="centerMenu">
        <el-menu class="el-menu-demo" mode="horizontal" text-color="#2c3e50" style="margin: 33px 0px 0px 450px;border-bottom: none">
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">所有商品</template>
            <el-menu-item index="2-1" style=" width: 1600px;height: 260px;padding-left: 100px;">
              <div class="img_float">
                <img src="../assets/menuImg.png"/><br>
                <span>布艺软饰</span>
              </div>
              <div class="img_noFloat">
                <img src="../assets/menuImg1.png"/><br>
                <span>墙饰壁挂</span>
              </div>
              <div class="img_noFloat">
                <img src="../assets/menuImg2.png"/><br>
                <span>墙饰壁挂</span>
              </div>
              <div class="img_noFloat">
                <img src="../assets/menuImg3.png"/><br>
                <span>墙饰壁挂</span>
              </div>
              <div class="img_noFloat">
                <img src="../assets/menuImg4.png"/><br>
                <span>墙饰壁挂</span>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3">装饰摆件</el-menu-item>
          <el-menu-item index="4">布艺软饰</el-menu-item>
          <el-menu-item index="5">墙饰壁挂</el-menu-item>
          <el-menu-item index="6">蜡艺香薰</el-menu-item>
          <el-menu-item index="7">创意家居</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div id="centerDiv">
      <div id="centerIcon">
        <el-button icon="el-icon-shopping-cart-2" class="iconClass"></el-button><br>
        <el-button icon="el-icon-mobile-phone" class="iconClass"></el-button><br>
        <el-button icon="el-icon-user"></el-button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectInput: '',
      name: sessionStorage.getItem('name'),
      seen: sessionStorage.getItem('ifLogin')
    }
  },
  methods: {
    toSelfInfor () {
      this.$router.push({path: 'selfInfor'})
    },
    cancelLogin () {
      window.sessionStorage.clear()
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
  .img_float{
    width: 180px;
    height: 240px;
    text-align: center;
    float: left;
    margin: 20px 10px 10px 300px;
  }
  .img_noFloat{
    width: 180px;
    height: 240px;
    text-align: center;
    float: left;
    border-left: 1px gainsboro solid;
    margin: 20px 10px 10px 10px;
  }
  .img_float img{
    width: 140px;
    height: 190px;
  }
  #topIconDiv{
    width: 122px;
    height: 30px;
    margin-left: 1270px;
    margin-top: -44px;
  }
  #topDiv{
    height: 150px;
  }
  #selectDiv{
    width: 500px;
    margin: 0px 0px 0px 780px;
    padding-top: 22px;
  }
  #loginArea{
    float: left ;
    width: 190px;
    margin-top: 32px;
    margin-left: 160px;
  }
  .iconClass1{
    font-size: 24px;
    color: red;
  }
  a{
    text-decoration: none
  }
  a:hover{
    color: aqua;
  }
  #leftImag{
    width: 50%;
    float: left;
    margin-top: 15px;
    margin-left: -90px;
  }
  #centerIcon{
    padding: 180px 0px 0px 1400px;
  }
  .iconClass{
    margin-bottom: 5px;
  }
  #centerDiv{
    height: 666px;
    background-image: url("../assets/index.png");
    margin-top: 5px;
  }
</style>
