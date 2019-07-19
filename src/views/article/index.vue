<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqPramas.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道名称：">
          <!-- 频道组件 -->
        <my-channel v-model="reqPramas.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="changeDate"
              size="small"
              v-model="dataOptions"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="search()" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 <b>{{ total }}</b> 条结果:</div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="date" label="封面">
          <!-- 自定义列模板 -->
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" style="width:150px;height:120px" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2"  type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4"  type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="edit(scope.row.id)" plain circle type="primary"></el-button>
            <el-button icon="el-icon-delete" @click="del(scope.row.id)" plain circle type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <!-- @current-change="pager"  改变页面触发的事件
          :current-page="reqPramas.page"  当前页码
          :page-size="reqPramas.per_page"  每一页多少条
          :total 一共多少条-->
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pager"
          :current-page="reqPramas.page"
          :page-size="reqPramas.per_page"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 发送请求准备的数据
      reqPramas: {
        page: 1,
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 日期数据
      dataOptions: [],
      // 总条数
      total: 0,
      // 文章列表数据
      articles: []
    }
  },
  created () {
    // 页面加载完成 先获取所有数据
    this.getArticles()
  },
  methods: {
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功  如果删除失败是不会执行下面两句代码
          this.$message('删除成功')
          // 更新列表
          this.getArticles()
        })
        .catch(() => {})
    },
    // 编辑
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    // 分页  默认有一个参数 改变的页码
    pager (newPage) {
      // 提交当前页码给后台 才能获取对应的数据
      this.reqPramas.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      this.reqPramas.page = 1
      this.getArticles()
    },
    // 选择时间处理函数
    changeDate (values) {
      this.reqPramas.begin_pubdate = values[0]
      this.reqPramas.end_pubdate = values[1]
    },
    // 获取文件列表数据
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqPramas })
      console.log(data)
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  text-align: center;
  margin-top: 20px;
}
</style>
