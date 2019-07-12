<template>
  <div class="login-container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="黑马头条">
      <!-- el-form 表单容器 -->
      <!-- ref="form" 将来操作DOM -->
      <!--:model="form" 将来需要提交的数据对象 -->
      <el-form ref="ruleForm" :model="loginForm" class="form" :rules="loginRules">
        <!-- 表单每一项的容器 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input class="phone" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input class="yzm" v-model="loginForm.code"></el-input>
          <el-button class="btn" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox class="deal" :value="true">
            我已阅读并同意 <el-link type="primary" :underline="false">用户协议</el-link> 和 <el-link type="primary" :underline="false">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" @click="checkLogin" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// test
export default {
  data () {
    // 自定义校验规则
    const checkMobile = (rule, value, callback) => {
      // /^1[3-9]\d{9}$/
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确手机格式'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: ''
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入六位数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 对整个表单进行验证
    checkLogin () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 提交登录请求
          this.$http
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              if (res.status === 201) {
                this.$router.push('/')
              }
            })
        }
      })
    }
  }

}
</script>

<style scoped lang="less">
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
      width: 380px;
      height: 320px;
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
        width: 210px;
        margin: 0 auto 10px;
      }
      .form {
        .yzm {
          width: 210px;
        }
        .btn {
          float: right;
        }
        .deal {
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
        }
      }
    }
  }
</style>
