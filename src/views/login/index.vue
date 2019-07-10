<template>
  <div class="login-container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="黑马头条">
      <el-form class="form">
        <el-input class="phone" v-model="input" placeholder="请输入手机号"></el-input>
        <el-input class="yzm"></el-input>
        <el-button class="btn" plain>发送验证码</el-button>
        <el-checkbox class="deal">
          我已阅读并同意 <el-link type="primary" :underline="false">用户协议</el-link> 和 <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-checkbox>
        <el-button class="btn-login" type="primary">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// test
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="less">
  .login-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // cover 铺满容器 多余的裁剪 contain 在容器内容额安全显示图片
    // 背景图定位 / 背景尺寸  连写
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
    .box-card {
      width: 400px;
      height: 300px;
      position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%,-50%);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      img {
        display: block;
        width: 220px;
        margin: 4px auto 20px;
      }
      .form {
        .phone {
          margin-bottom: 16px;
        }
        .yzm {
          width: 230px;
        }
        .btn {
          float: right;
        }
        .deal {
          margin-top: 12px;
          .el-link--inner {
            margin-top: -4px;
          }
        }
        .el-checkbox__input.is-checked+.el-checkbox__label  {
          color: #999;
          .el-link--inner {
            margin-top: -4px;
          }
        }
        .btn-login {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
</style>
