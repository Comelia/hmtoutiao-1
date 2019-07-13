<template>
  <el-container class="my-con">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse? '60px': '200px'" class="my-sidebar">
      <div class="logo" :class="{'m-logo':isCollapse }"></div>
      <el-menu
        router
        :collapse="isCollapse"
        :collapse-transition='false'
        style="border-right: 0px"
        default-active="/"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-star-off"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-s-tools"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 导航栏 -->
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="close" style="font-size:28px;vertical-align: middle;"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            <img
              src="../../assets/images/avatar.jpg"
              width="42px"
              style="vertical-align:middle;margin-right:6px;"
              alt
            />
            <span style="vertical-align:middle">hm-xiaohei</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    close () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.my-con {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-sidebar {
    background: #002033;
    .logo {
      height: 60px;
      background: #024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto;
    }
    .m-logo {
      background-image: url(../../assets/images/logo_admin_01.png);
      background-size: 36px auto;
    }
  }
  .my-header {
    line-height: 60px;
    .text {
      margin-left: 6px;
      vertical-align: middle;
    }
  }
}
</style>
