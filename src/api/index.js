/*
* @Author: Administrator
* @Date:   2017-06-30 23:28:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 19:52:49
*/

// 导入模块
import * as getPro from './get_pro.js'
import * as getType from './get_type.js'
import * as admin from './admin.js'
import * as search from './search.js'
import * as upload from './upload.js'
import * as order from './order.js'
import * as news from './news.js'
import * as leaveMsg from './leaveMsg.js'
import * as slider from './slider.js'
import * as link from './link.js'
import * as photo from './photo.js'
import * as statistic from './statistic.js'

const apiObj = {
  getPro,
  getType,
  admin,
  search,
  upload,
  order,
  news,
  slider,
  leaveMsg,
  link,
  photo,
  statistic
}
const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $fetch: {
      get () {
        return apiObj
      }
    }
  })
}

export default {
  install,
  apiObj
}
