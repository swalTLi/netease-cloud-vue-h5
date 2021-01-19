// Require dependencies
import Vue from 'vue'
import VueCookie from 'vue-cookie'
// Tell Vue to use the plugin
Vue.use(VueCookie)
const ItemOption = {
  /**
   * 缓存数据 并设置过期时间
   * @param name 数据名称
   * @param value 数据
   * @param expires 过期时间
   */
  setItem: (name, value, expires) => {
    const obj = {
      name: name, // 名称
      value: value, // 保存的文件
      startTime: new Date().getTime(), // 开始保存的时间
      expires: expires || 10000 // 设置 到期时间 , 默认到期时间 10秒 下次刷新请求数据
      // ldq: 'l'
    }
    // 将obj和传进来的params合并
    //     // const option = { ldq: 'd' }
    //     // const par = { ldq: 'q' }
    // Object.assign(option,obj, par)
    // console.log(obj)
    // return window.localStorage.setItem(name, JSON.stringify(value))
    // 是否设置了过期时间
    if (obj.expires) {
      // 以obj.name为key，obj为值放进去
      // console.log(obj.expires)
      window.localStorage.setItem(obj.name, JSON.stringify(obj))
    } else {
      // 如果obj.expires没有设置，就判断一下value的类型 默认30分钟过期
      const type = Object.prototype.toString.call(obj.value)
      if (type.indexOf(['[object Object]', '[object Array]'])) {
        obj.value = JSON.stringify(obj.value)
      }
      return window.localStorage.setItem(obj.name, obj.value)
    }
  },
  /**
   * 获取缓存
   * @param name 要获取的缓存名
   * @returns 返回结果
   */
  getItem: (name) => {
    // console.log(name)
    let item = window.localStorage.getItem(name)
    if (item === null) {
      return null
    }
    try {
      item = JSON.parse(item)
      // return item
    } catch (error) {
      // 如果不行就不是json的字符串，就直接返回
      return item
    }
    // 如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      // 获取当前时间
      const date = new Date().getTime()
      // console.log(date)
      // 何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        // 缓存过期，清除缓存，返回false
        window.localStorage.removeItem(name)
        console.log(name + '缓存已经过期,已被清理,重新加载')
        return false
      } else {
        return item.value
      }
    } else {
      // 如果没有设置失效时间，直接返回值
      return item
    }
  },
  // 移出缓存
  removeItem: (name) => {
    return window.localStorage.removeItem(name)
  },
  // 移除全部缓存
  clear: () => {
    return window.localStorage.clear()
  }
}
export function localStorage (type, name, value, expires = '') {
  return ItemOption[type](name, value, expires)
}
