import fetch from './fetch/index.js'
// 查询商品
export function goods (params) {
  return fetch({
    url: 'get/good',
    method: 'get',
    params
  })
}
