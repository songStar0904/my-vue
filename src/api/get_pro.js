/*
* @Author: Administrator
* @Date:   2017-06-30 23:30:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-01 13:23:47
*/

import fetch from './fetch/index.js'
// 数据列表
export function list (params) {
  return fetch({
    url: 'get/good',
    method: 'get',
    params
  })
}
// 修改商品
export function edit (data) {
  return fetch({
    url: 'get/good/modify',
    method: 'post',
    data
  })
}
// 添加商品
export function add () {
  return fetch({
    url: 'get/good/inew',
    method: 'post'
  })
}
// 删除商品
export function del (data) {
  return fetch({
    url: 'get/good/idelete',
    method: 'post',
    data
  })
}
//  添加修改子商品
export function cGoods (data) {
  return fetch({
    url: 'get/good/smodify',
    method: 'post',
    data
  })
}
//  删除子商品
export function sDel (data) {
  return fetch({
    url: 'get/good/sdel',
    method: 'post',
    data
  })
}
// 添加新style
export function newStyle (data) {
  return fetch({
    url: 'get/good/istnew',
    method: 'post',
    data
  })
}
// 获得style
export function getStyle (params) {
  return fetch({
    url: 'get/good/istnew',
    method: 'get',
    params
  })
}
