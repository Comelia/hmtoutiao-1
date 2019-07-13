// 配置axios
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
  // headers: {
  //   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm1-toutiao')).token
  // }
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 给头部加上认证信息
  const user = window.sessionStorage.getItem('hm1-toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
// 当token有效时间到期时,token码会失效 再请求会失败
instance.interceptors.response.use(response => response, error => {
  // 任何接口请求失败的时候 所以在 这里进行相关操作
  // 1.获取错误状态码 进行判断
  if (error.response.status === 401) {
    location.hash = '#login'
  }
  return Promise.reject(error)
})

export default instance
