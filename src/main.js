import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from './api'
import Components from '@/components'

// 导入全局样式
import '@/styles/index.less'
Vue.prototype.$http = axios
Vue.use(Components)

Vue.use(Element)
Vue.config.productionTip = false

// 职责1.导入项目需要依赖的包( css/ 包 )
// 职责2.初始化跟市里 new Vue()
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
