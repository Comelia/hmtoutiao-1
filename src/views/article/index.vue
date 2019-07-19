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
          <el-select size="small" v-model="reqPramas.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：">
          <div class="block">
            <el-date-picker
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
          <el-button size="small" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card>
      <div slot="header">根据筛选条件同查询到 {{ total }} 条结果:</div>
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="date" label="封面" width="180">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="标题" width="180"></el-table-column>
        <el-table-column prop="date" label="状态" width="180"></el-table-column>
        <el-table-column prop="date" label="发布时间" width="180"></el-table-column>
        <el-table-column prop="date" label="操作" width="180"></el-table-column>
      </el-table>
      <div class="box">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 频道数据
      channelOptions: [{ name: 'java', id: 1 }],
      // 日期数据
      dataOptions: [],
      // 总条数
      total: 0,
      // 文章列表数据
      articles: []
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
