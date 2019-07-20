<template>
<div class="image-container">
<el-card v-loading="loading">
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <el-radio-group @change="search()" size="small" v-model="reqParams.collect">
      <el-radio-button :label="false">全部</el-radio-button>
      <el-radio-button :label="true">收藏</el-radio-button>
    </el-radio-group>
    <el-button type="success" size="small" @click="dialogVisible = true" style="float:right">上传素材</el-button>
    <ul class="pic-list">
      <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt="">
        <div v-if="!reqParams.collect" class="fot">
          <span class="el-icon-star-off" @click="toggleFav(item)" :class="{red:item.is_collected}"></span>
          <span class="el-icon-delete" @click="delImage(item.id)"></span>
        </div>
      </li>
    </ul>
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      @current-change="pager"
      :current-page="reqParams.page"
      :page-size="reqParams.per_page"
      :total="total"
    ></el-pagination>
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="500px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :headers="headers"
        :on-success="handleSuccess"
        name="image">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</div>

</template>

<script>
export default {
  data () {
    return {
      // 发送给后台的数据
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 总页数
      total: 0,
      // 图片列表
      images: [],
      // 加载效果
      loading: true,
      // 上传图片 相关数据
      // 上传对话框
      dialogVisible: false,
      imageUrl: null,
      // 请求头参数
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm1-toutiao')).token
      }
    }
  },
  methods: {
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // 获取图片列表信息
    async getImage () {
      const { data: { data } } = await this.$http.get(`user/images`, { params: this.reqParams })
      this.loading = false
      // 获取数据成功
      this.images = data.results
      this.total = data.total_count
      // console.log(data)
    },
    // 切换全部和收藏
    search () {
      // 切换时 要保证页码从第一页开始
      this.reqParams.page = 1
      // 当点击收藏 reqParams.collect 值为true 会获取到收藏的图片信息
      this.getImage()
    },
    // 星星收藏功能
    async toggleFav (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, { collect: !item.is_collected })
      // 提示用户操作成功
      if (item.is_collected === true) {
        this.$message.success('取消收藏成功')
      } else {
        this.$message.success('收藏成功')
      }
      // this.getImage()
      // 把当前的图片状态改成操作后后台给的状态
      item.is_collected = data.collect
    },
    // 添加素材成功
    handleSuccess (res) {
      // 预览2秒 提示上传成功
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 自动关闭对话框 更新列表数据
        this.dialogVisible = false
        this.getImage()
        // 再次打开对话框的时候 预览的是上传按钮不是之前的图片
        this.imageUrl = null
      }, 2000)
    },
    // 删除
    delImage (id) {
      // 先提示 再删除
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        // 删除成功
        this.$message.success('删除成功')
        this.getImage()
      }).catch(() => {})
    }
  },
  created () {
    this.getImage()
  }
}
</script>

<style lang="less" scoped>
.pic-list {
  list-style: none;
  overflow: hidden;
  li {
    float: left;
    width: 18%;
    height: 180px;
    margin: 0 20px 20px 0;
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      color: #fff;
      background: rgba(0,0,0,.5);
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
}
</style>
