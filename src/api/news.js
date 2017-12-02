import fetch from './fetch/index.js'
// get news
export function get (params) {
  return fetch({
    url: 'get/article',
    method: 'get',
    params
  })
}
// del
export function del (data) {
  return fetch({
    url: 'get/article/adel',
    method: 'post',
    data
  })
}
// add edit
export function edit (data) {
  return fetch({
    url: 'get/article/amodify',
    method: 'post',
    data
  })
}
// new
export function add (data) {
  return fetch({
    url: 'get/article/anew',
    method: 'post',
    data
  })
}
