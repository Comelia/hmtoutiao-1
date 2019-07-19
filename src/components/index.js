// 封装一个vue的插件  完成当前文件夹在所有的组件全局注册
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'

export default {
  // 当导入这个模块 shiyongVUe.use(使用这个模块) VUe会调用install函数
  install (Vue) {
    // 使用Vue对象去做你的业务即可
    // 进行组件的注册
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
