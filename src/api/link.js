import fetch from './fetch/index.js'
// get link
export function get (params) {
  return fetch({
    url: 'service/friends',
    method: 'get',
    params
  })
}
export function add (data) {
  return fetch({
    url: 'service/friends/fnew',
    method: 'post',
    data
  })
}
export function edit (data) {
  return fetch({
    url: 'service/friends/fmodify',
    method: 'post',
    data
  })
}
export function del (data) {
  return fetch({
    url: 'service/friends/fdel',
    method: 'post',
    data
  })
}
