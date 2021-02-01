'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: 'http://h5sm.com:8088',
  // baseURL: 'http://www.lidaqing.plus:1901/',
  baseURL: 'http://localhost:1901',
  timeout: 10 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control,
  data: {
    cookie: window.localStorage.getItem('cookie')
  }
}

const _axios = axios.create(config)
const cache = {}
// eslint-disable-next-line no-unused-vars
const EXPIRE_TIME = 60000
// 利用axios的cancelToken来取消请求
// eslint-disable-next-line no-unused-vars
const CancelToken = axios.CancelToken
_axios.interceptors.request.use(
  // function (config) {
  //   // Do something before request is sent
  //   return config
  // },
  // function (error) {
  //   // Do something with request error
  //   return Promise.reject(error)
  // }
  config => {
    // 如果需要缓存--考虑到并不是所有接口都需要缓存的情况
    if (config.cache) {
      const source = CancelToken.source()
      config.cancelToken = source.token
      // 去缓存池获取缓存数据
      const data = cache[config.url]
      // 获取当前时间戳
      // eslint-disable-next-line camelcase
      const expire_time = getExpireTime()
      // 判断缓存池中是否存在已有数据 存在的话 再判断是否过期
      // 未过期 source.cancel会取消当前的请求 并将内容返回到拦截器的err中
      // eslint-disable-next-line camelcase
      if (data && expire_time - data.expire < EXPIRE_TIME) {
        source.cancel(data)
      }
    }
    return config
  })

// Add a response interceptor
_axios.interceptors.response.use(
  // function (response) {
  //   // Do something with response data
  //   return response
  // },
  // function (error) {
  //   // Do something with response error
  //   return Promise.reject(error)
  // }
  response => {
    // 只缓存get请求
    if (response.config.method === 'get' && response.config.cache) {
      // 缓存数据 并将当前时间存入 方便之后判断是否过期
      const data = {
        expire: getExpireTime(),
        data: response.data
      }
      cache[`${response.config.url}`] = data
    }
    return response
  },
  error => {
    // 请求拦截器中的source.cancel会将内容发送到error中
    // 通过axios.isCancel(error)来判断是否返回有数据 有的话直接返回给用户
    if (axios.isCancel(error)) return Promise.resolve(error.message.data)
    // 如果没有的话 则是正常的接口错误 直接返回错误信息给用户
    return Promise.reject(error)
  }
)
// 获取当前时间
function getExpireTime () {
  return new Date().getTime()
}
Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
