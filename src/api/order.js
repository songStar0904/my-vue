import fetch from './fetch/index.js'
// get order
export function get (params) {
  return fetch({
    url: 'user/order',
    method: 'get',
    params
  })
}
export function del (data) {
  return fetch({
    url: 'user/order/del',
    method: 'post',
    data
  })
}
