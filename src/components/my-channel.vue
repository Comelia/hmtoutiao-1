<template>
  <el-select size="small" :value="value" @change="fn" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 接收父组件传入的数据
  props: ['value'],
  data () {
    return {
      // 频道数据
      channelOptions: [{ name: 'java', id: 1 }]
    }
  },
  created () {
    // 获取频道数据
    this.getChannelOptions()
  },
  methods: {
    // 获取频道数据
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (value) {
      // value 你选中的值 传给父组件
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
