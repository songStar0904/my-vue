/*
* @Author: Administrator
* @Date:   2017-07-01 19:53:02
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 19:53:41
*/

import fetch from './fetch/index.js'
// 数据列表 商品分类 订单类型 等 之后要加参数 判定获取哪个类型
export function list (params) {
  return fetch({
    url: 'get/type',
    method: 'get',
    params
  })
}
// 修改分类
export function edit (data) {
  return fetch({
    url: 'get/type/modify',
    method: 'post',
    data
  })
}
// 删除分类
export function del (data) {
  return fetch({
    url: 'get/type/tdelete',
    method: 'post',
    data
  })
}

