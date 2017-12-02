import fetch from './fetch/index.js'
// get gallery
export function get (params) {
  return fetch({
    url: 'service/gallery',
    method: 'get',
    params
  })
}
export function add (data) {
  return fetch({
    url: 'service/gallery/gnew',
    method: 'post',
    data
  })
}
export function edit (data) {
  return fetch({
    url: 'service/gallery/gmodify',
    method: 'post',
    data
  })
}
export function del (data) {
  return fetch({
    url: 'service/gallery/gdel',
    method: 'post',
    data
  })
}
